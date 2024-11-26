package com.sunmartech.smtleadsender.ui.service;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunmartech.smtleadsender.parser.FileParser;
import com.sunmartech.smtleadsender.parser.FileParserFactory;
import com.sunmartech.smtleadsender.ui.config.SmtLeadSenderUiPropertyConfig;
import com.sunmartech.smtleadsender.ui.dao.SmtleadsenderUiDao;
import com.sunmartech.smtleadsender.ui.repository.ClientSmtleadsenderRepo;
import com.sunmartech.smtleadsender.ui.schema.ClientSmtdatasource;
import com.sunmartech.smtleadsender.ui.schema.ClientSmtleadsender;
import com.sunmartech.smtleadsender.ui.schema.ClientSmtrawdata;
import com.sunmartech.smtleadsender.ui.utils.CommonUtils;
import com.sunmartech.smtleadsender.ui.utils.FieldsConstant;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * This service class is used for process data.
 *
 */
@Service
public class SmtleadsenderUiServiceImpl implements SmtleadsenderUiService{

	static final Logger logger = LogManager.getLogger(SmtleadsenderUiServiceImpl.class);
	
	@Autowired
	SmtleadsenderUiDao smtleadsenderUiDao;
	
	@Autowired
	SmtLeadSenderUiPropertyConfig smtLeadSenderUiPropertyConfig;
	
	@Autowired
	ClientSmtleadsenderRepo clientCRMRepo;
	
	public long saveIntegrationDetails(ClientSmtleadsender clientSmtleadsender) {
		return smtleadsenderUiDao.saveIntegrationDetails(clientSmtleadsender);
	}
	
	/**
	 * This method is used for insert test lead in database.
	 * @throws IntrospectionException 
	 * @throws InvocationTargetException 
	 * @throws IllegalArgumentException 
	 * @throws IllegalAccessException 
	 */
	public long insertTestLead(JSONObject jsonObject, String headers, long integrationId, String username, String integrationName, String sourceType) throws IntrospectionException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		ClientSmtrawdata crmRawData = new ClientSmtrawdata();
		logger.info("integrationId::"+integrationId);
		crmRawData.setCreatedby(username);
		crmRawData.setUpdatedby(username);
		//crmRawData.setCreatedon(new Timestamp(new Date().getTime()));
		//crmRawData.setUpdatedon(new Timestamp(new Date().getTime()));
		crmRawData.setClientcrmid(integrationId);
		crmRawData.setIntegrationname(integrationName);
		crmRawData.setSourceid(0);
		crmRawData.setDeliverystatus("None");
		crmRawData.setValidationstatus("Pending");
		crmRawData.setSourcetype(sourceType);	
		
		JSONArray jsonArray = new JSONArray();
		String[] str1 = headers.split(",");
		for(String columnName : str1) {
			if (FieldsConstant.getDeliveryFields().containsKey(columnName.trim())){
					PropertyDescriptor descriptor = new PropertyDescriptor(columnName, crmRawData.getClass());
					descriptor.getWriteMethod().setAccessible(true);
            
					descriptor.getWriteMethod().invoke(crmRawData, CommonUtils.checkNull(jsonObject.get(columnName)));
			}
			else {
					JSONObject customColumnjsonObject = new JSONObject();
					customColumnjsonObject.put(columnName, CommonUtils.checkNull(jsonObject.get(columnName)));
					jsonArray.add(customColumnjsonObject.toString());
			}
		}
		
		if(CollectionUtils.isNotEmpty(jsonArray)){
			crmRawData.setCustomfield(jsonArray.toString());
		}
		long rawDataId = 0L;
		rawDataId = smtleadsenderUiDao.uploadFileData(crmRawData);
		return rawDataId;
	}
	
	public void sendDataToHttpClient(ClientSmtrawdata clientSmtrawdata, ClientSmtleadsender clientSmtleadsender) {
		
		logger.info("indide sendDataToHttpClient");
		String connectionUrl = "";
		logger.info(new StringBuffer("connectionUrl::").append(clientSmtleadsender.getConnectionurl()));
		if(StringUtils.isNotBlank(clientSmtleadsender.getConnectionurl())) {
			JSONObject jsonObject = JSONObject.fromObject(clientSmtleadsender.getConnectionurl());
			if(!jsonObject.isEmpty()) {
				String endpointUrlOutput = CommonUtils.checkNull(jsonObject.get("endpointUrlOutput"));
				String accessToken = CommonUtils.checkNull(jsonObject.get("accessToken"));
				if(StringUtils.isNotBlank(accessToken)) {
					if(accessToken.startsWith("/")) {
						connectionUrl = endpointUrlOutput+accessToken;
					}else {
						connectionUrl = endpointUrlOutput+ "/" + accessToken;
					}
								
				}else {
					connectionUrl = endpointUrlOutput;
				}
			}
		}
		
		smtleadsenderUiDao.sendDataToHttpClient(clientSmtrawdata, clientSmtleadsender, connectionUrl);
	}
	
	@Override
	public String uploadFileData(FileItem fitem, String username, String fileSource ,long clientCrmId, String sftpFileName, String integrationName) throws Exception {
		String response = "success";
		FileParser fileParser = FileParserFactory.getFileParser(fitem.getName(), fitem.getInputStream());
		String[] fileColNams = null;
		try {
			fileColNams = fileParser.readFirstLine();
			logger.info(new StringBuffer("fileColNams==").append(fileColNams));
			if (fileColNams != null) {
				List<String[]> fileColValuesList = fileParser.readData(fileColNams);
				logger.info(new StringBuffer("fileColValuesList size==").append(fileColValuesList.size()));
				Integer fileUploadRecordLimit = CommonUtils.checkNullForInt(smtLeadSenderUiPropertyConfig.getLdFileUploadRecordsLimit());
				logger.info("fileUploadRecordLimit=="+fileUploadRecordLimit);
				if(fileUploadRecordLimit <= 0) {
					fileUploadRecordLimit = 1000;
				}
				if(CollectionUtils.isNotEmpty(fileColValuesList)) {
					if(fileColValuesList.size() <= fileUploadRecordLimit) {
						//check integration name drop down value and file value
						Integer fileColumnIntegratationNameCount = 0;
						for(String[] fileColValues : fileColValuesList) {
							for(int i=0; i<fileColValues.length; i++) {
								String columnName = fileColNams[i];
								if(StringUtils.isNotBlank(columnName) && columnName.equalsIgnoreCase("datapass_name") && integrationName.equalsIgnoreCase(CommonUtils.checkNull(fileColValues[i].trim()))) {
									fileColumnIntegratationNameCount++;
								}
							}
						}
						if(fileColumnIntegratationNameCount == fileColValuesList.size()) {
							Integer batchUpdateSize = smtLeadSenderUiPropertyConfig.getFileUploadSize();
							logger.info(new StringBuffer("batchUpdateSize==").append(batchUpdateSize));
							List<ClientSmtrawdata> crmRawDataList = new ArrayList<>();
							
							ClientSmtdatasource crmDataSource = new ClientSmtdatasource();
							crmDataSource.setFilesourcename(fileSource);
							crmDataSource.setClientsmtleadsenderid(clientCrmId);
							crmDataSource.setIntegrationname(integrationName);
							crmDataSource.setFilename(sftpFileName);
							crmDataSource.setFilesize(fileColValuesList.size());
							crmDataSource.setTotalprocessed(0);
							crmDataSource.setTotalerror(0);
							crmDataSource.setCreatedby(username);
							//crmDataSource.setCreatedon(new Timestamp(new Date().getTime()));
							crmDataSource.setUpdatedby(username);
							//crmDataSource.setUpdatedon(new Timestamp(new Date().getTime()));
							
							long sourceId=smtleadsenderUiDao.saveClientDataSource(crmDataSource);
							if(sourceId > 0){
								String sourceType = "";
								if(clientCrmId > 0) {
									Optional<ClientSmtleadsender> clientCrmByElastic = clientCRMRepo.findById(clientCrmId);
									if (clientCrmByElastic.isPresent()) {
										ClientSmtleadsender clientCrm = clientCrmByElastic.get();
										if(clientCrm != null) {
											sourceType = clientCrm.getIntegrationtype();
											Integer totalRecords = CommonUtils.checkNullForInt(clientCrm.getTotalrecord());
											totalRecords = totalRecords + fileColValuesList.size();
											clientCrm.setTotalrecord(totalRecords);
											//clientCrm.setUpdatedon(new Timestamp(new Date().getTime()));
											clientCrm.setUpdatedby(username);
											smtleadsenderUiDao.saveIntegrationDetails(clientCrm);
										}
									}
								}
								
								if(CollectionUtils.isNotEmpty(fileColValuesList)){
									for(String[] fileColValues : fileColValuesList) {
										JSONArray jsonArray = new JSONArray();
										ClientSmtrawdata crmRawData = new ClientSmtrawdata();
										
										for(int i=0; i<fileColValues.length; i++) {
											String columnName = fileColNams[i];
											if (FieldsConstant.getDeliveryFields().containsKey(columnName.trim()))
									        {
												PropertyDescriptor descriptor = new PropertyDescriptor(columnName, crmRawData.getClass());
									            descriptor.getWriteMethod().setAccessible(true);
									            
									            descriptor.getWriteMethod().invoke(crmRawData, CommonUtils.checkNull(fileColValues[i]));
									        }
											else {
												JSONObject jsonObject = new JSONObject();
												if(!columnName.contains("datapass_name")) {
													jsonObject.put(columnName, fileColValues[i]);
													jsonArray.add(jsonObject.toString());
												}
											}
										}
										if(CollectionUtils.isNotEmpty(jsonArray)) {
											crmRawData.setCustomfield(jsonArray.toString());
										}
										
										crmRawData.setCreatedby(username);
										crmRawData.setUpdatedby(username);
										//crmRawData.setCreatedon(new Timestamp(new Date().getTime()));
										//crmRawData.setUpdatedon(new Timestamp(new Date().getTime()));
										crmRawData.setSourceid(sourceId);
										crmRawData.setClientcrmid(clientCrmId);
										crmRawData.setDeliverystatus("None");
										crmRawData.setValidationstatus("Pending");
										crmRawData.setIntegrationname(integrationName);
										crmRawData.setSourcetype(sourceType);
										
										//Add in Array list
										crmRawDataList.add(crmRawData);
										if(batchUpdateSize != null && batchUpdateSize > 0 && crmRawDataList.size() == batchUpdateSize) {
											logger.info(new StringBuffer("batchUpdateSize is same as crmRawDataList size::").append(batchUpdateSize).append(crmRawDataList.size()));
											smtleadsenderUiDao.updateCRMRawDataList(crmRawDataList);
											crmRawDataList.clear();
										}
									}
									if(CollectionUtils.isNotEmpty(crmRawDataList)) {
										smtleadsenderUiDao.updateCRMRawDataList(crmRawDataList);
									}
									response = "success";
								}
							}
						}else {
							response = "integrationNameNotMatched";
						}
					}else {
						response = "fileSizeExceed";
					}
				}else {
					response = "dataNotExist";
				}
			}else {
				response = "columnNotExist";
			}
		}
		catch (Exception e) {
			e.printStackTrace();
			logger.info(new StringBuffer("exception occured in uploadFileData").append(e.toString()));
		}
		return response;
	}
	
}
