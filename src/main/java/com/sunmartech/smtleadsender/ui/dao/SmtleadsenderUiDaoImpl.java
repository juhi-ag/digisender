package com.sunmartech.smtleadsender.ui.dao;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Map.Entry;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.sunmartech.smtleadsender.ui.repository.ClientSmtdataauditRepo;
import com.sunmartech.smtleadsender.ui.repository.ClientSmtdatasourceRepo;
import com.sunmartech.smtleadsender.ui.repository.ClientSmtleadsenderRepo;
import com.sunmartech.smtleadsender.ui.repository.ClientSmtrawdataRepo;
import com.sunmartech.smtleadsender.ui.schema.ClientSmtdataaudit;
import com.sunmartech.smtleadsender.ui.schema.ClientSmtdatasource;
import com.sunmartech.smtleadsender.ui.schema.ClientSmtleadsender;
import com.sunmartech.smtleadsender.ui.schema.ClientSmtrawdata;
import com.sunmartech.smtleadsender.ui.utils.CommonUtils;
import com.sunmartech.smtleadsender.ui.utils.FieldsConstant;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * This class is used for select/insert/update records from database.
 *
 */
@Repository
public class SmtleadsenderUiDaoImpl implements SmtleadsenderUiDao{
	
	@Autowired
	ClientSmtleadsenderRepo clientCRMRepo;
	
	@Autowired
	ClientSmtrawdataRepo clientSmtRawDataRepo;
	
	@Autowired
	ClientSmtdataauditRepo clientSmtDataAuditRepo;
	
	@Autowired
	ClientSmtdatasourceRepo clientSmtdatasourceRepo;
	
	static final Logger logger = LogManager.getLogger(SmtleadsenderUiDaoImpl.class);

	@Override
	public long saveIntegrationDetails(ClientSmtleadsender clientSmtleadsender) {
		clientCRMRepo.save(clientSmtleadsender);
		return 0;
	}
	
	public long uploadFileData(ClientSmtrawdata crmRawData) {
		clientSmtRawDataRepo.save(crmRawData);
		return 0;
	}
	
	public void updateCRMRawDataList(List<ClientSmtrawdata> crmRawDataList) {
		clientSmtRawDataRepo.saveAll(crmRawDataList);
	}
	
	public long saveClientSmtDataAudit(ClientSmtdataaudit clientSmtdataaudit) {
		clientSmtDataAuditRepo.save(clientSmtdataaudit);
		return 0;
	}
	
	public long saveClientDataSource(ClientSmtdatasource clientSmtdatasource) {
		ClientSmtdatasource savedEntity = clientSmtdatasourceRepo.save(clientSmtdatasource);
		return savedEntity.getClientsmtdatasourceid();
	}
	
	public void sendDataToHttpClient(ClientSmtrawdata clientSmtrawdata, ClientSmtleadsender clientSmtleadsender, String connectionUrl) {
		
		String url = "";
		try {
			//StringBuilder fieldsToBeReplaced = new StringBuilder();
			if(StringUtils.isNotBlank(connectionUrl)){
				String queryString = "";
				Map<String,String> httpAndStaticClientFieldsMap=prepareHttpAndStaticClientFieldsMap(clientSmtrawdata, clientSmtleadsender);
				logger.info("httpAndStaticClientFieldsMap::" + httpAndStaticClientFieldsMap);
				if(httpAndStaticClientFieldsMap.size() > 0) {
					StringBuilder queryStringBuffer = new StringBuilder();
					if(connectionUrl.contains("?")) {
						queryStringBuffer.append("&");
					}
					else {
						queryStringBuffer.append("?");
					}
					
					for(Entry<String, String> entry : httpAndStaticClientFieldsMap.entrySet()) {
						queryStringBuffer.append(entry.getKey());
						queryStringBuffer.append("=");
						 
						queryStringBuffer.append(entry.getValue());
						queryStringBuffer.append("&");
					}
					queryString = queryStringBuffer.toString().substring(0, queryStringBuffer.toString().length() - 1);
					
					logger.info("encoded queryString:::" + queryString);
					
					url = connectionUrl + queryString;
					
					HttpHeaders headers = getHttpHeadersFromClientCrm(clientSmtleadsender);
					
					ResponseEntity<String> resEntity = processDataToHttpClient(clientSmtleadsender, httpAndStaticClientFieldsMap, connectionUrl, headers, url);
					if(resEntity != null) {
						addResponseForHttpClient(clientSmtleadsender, clientSmtrawdata, resEntity, clientSmtrawdata.getClientsmtrawdataid(), url);
					}
				}
			}
		}
		catch (Exception e) {
			logger.error("sendDataToHttpClient:::", e);
			e.printStackTrace();
		}
	}
	
	
	/**
	 * This method is used for prepare http and static client fields.
	 * @param map
	 * @param integrationDetails
	 * @return crmHttpClientFieldsMap
	 */
	private HashMap<String, String> prepareHttpAndStaticClientFieldsMap(ClientSmtrawdata clientSmtrawdata, ClientSmtleadsender clientSmtleadsender){
		HashMap<String, String> crmHttpClientFieldsMap=new HashMap<>();
	
		Map<String,String> dbToMultiCRMObjectMapping = CommonUtils.makeMultiCRMObjectToDBFieldMapping(clientSmtleadsender.getIntegrationmapping());
		if(dbToMultiCRMObjectMapping !=null && dbToMultiCRMObjectMapping.size() > 0)
		{	
			Iterator<String> itr=dbToMultiCRMObjectMapping.keySet().iterator();
			while(itr.hasNext())
			{
				String key=itr.next();
				if (FieldsConstant.getDeliveryFields().containsKey(key)) {
					if(StringUtils.isNotBlank(CommonUtils.getPropertyValue(clientSmtrawdata, key).toString())) {
						crmHttpClientFieldsMap.put(dbToMultiCRMObjectMapping.get(key), CommonUtils.getPropertyValue(clientSmtrawdata, key).toString());
					}
				}
				else {
					String customField = CommonUtils.checkNull(CommonUtils.getPropertyValue(clientSmtrawdata, "customfield"));
					if(StringUtils.isNotBlank(customField)) {
						JSONArray jsonArray = JSONArray.fromObject(customField);
						if(CollectionUtils.isNotEmpty(jsonArray)) {
							for(int j=0; j<jsonArray.size(); j++) {
								JSONObject jsonObject = jsonArray.getJSONObject(j);
								if(jsonObject != null && jsonObject.size() > 0 && jsonObject.containsKey(key) && StringUtils.isNotBlank(jsonObject.getString(key))) {
									//crmHttpClientFieldsMap.put(dbToMultiCRMObjectMapping.get(key),jsonObject.getString(dbToMultiCRMObjectMapping.get(key)));
									crmHttpClientFieldsMap.put(dbToMultiCRMObjectMapping.get(key),jsonObject.getString(key));
								}
							}
						}
					}
				}
			}
		}	
		
		if(StringUtils.isNotBlank(clientSmtleadsender.getStaticfields())) {
			JSONArray jsonArray = JSONArray.fromObject(clientSmtleadsender.getStaticfields());
			
			for(int i = 0; i < jsonArray.size(); i++) {
				JSONObject jsonObject = jsonArray.getJSONObject(i);
			    for (Iterator<String> iterator = jsonObject.keySet().iterator(); iterator.hasNext();) {
			    	String mapKey = iterator.next();
			    	if(jsonObject.get(mapKey) != null && !jsonObject.get(mapKey).equals("")) {
			    		crmHttpClientFieldsMap.put(mapKey,jsonObject.get(mapKey).toString());
			    	}
				}
			}	
		}
		return crmHttpClientFieldsMap;
	}
	
	public HttpHeaders getHttpHeadersFromClientCrm(ClientSmtleadsender clientSmtleadsender) {
		HttpHeaders headers = new HttpHeaders();
		if(StringUtils.isNotBlank(clientSmtleadsender.getHttpheaders())) {
			JSONArray jsonArray = JSONArray.fromObject(clientSmtleadsender.getHttpheaders());
			if(CollectionUtils.isNotEmpty(jsonArray)) {
				for(int i = 0; i < jsonArray.size(); i++) {
					JSONObject jsonObject = jsonArray.getJSONObject(i);
				    for (Iterator<String> iterator = jsonObject.keySet().iterator(); iterator.hasNext();) {
				    	String mapKey = iterator.next();
				    	if(jsonObject.get(mapKey) != null && !jsonObject.get(mapKey).equals("")) {
				    		if(mapKey.equalsIgnoreCase("Authorization")) {
				    			//byte[] encodedBytes = Base64.encodeBase64(jsonObject.get(mapKey).toString().getBytes()); 
								//String userPassword = "Basic "+new String(encodedBytes);
								//headers.add(mapKey,userPassword);
				    		}else {
				    			headers.add(mapKey,jsonObject.get(mapKey).toString());
				    		}
				    	}
					}
				}
			}
		}
		return headers;
	}
	
	private void addResponseForHttpClient(ClientSmtleadsender clientSmtleadsender, ClientSmtrawdata clientSmtrawdata, ResponseEntity<String> resEntity, Long rawDataId, String url) throws Exception {
		logger.info("resEntity:::" + resEntity + " for integration Name::" + clientSmtleadsender.getIntegrationname() + " with rawdataid::" + clientSmtrawdata.getClientsmtrawdataid());
		String response=resEntity.getBody();
		logger.info("response:::" + response + " for integration Name::" + clientSmtleadsender.getIntegrationname() + " with rawdataid::" + clientSmtrawdata.getClientsmtrawdataid());
		
		if(clientSmtleadsender.getIntegrationname().trim().equalsIgnoreCase(clientSmtrawdata.getIntegrationname().trim())) {
			if(resEntity.toString().contains("200") || resEntity.toString().contains("302")) {
				if(StringUtils.isNotBlank(response)) {
					String successDecisionPhraseResponse = clientSmtleadsender.getSuccessdecisionphrase();
					if(StringUtils.isNotBlank(successDecisionPhraseResponse)) {
						if(containsIgnoreCase(response, successDecisionPhraseResponse)) {
							updateDeliveryStatus(clientSmtrawdata, "Success", "");
							insertIntegrationDeliveryAudit(rawDataId, clientSmtleadsender.getClientsmtleadsenderid(), url, response);
							updateIntegrationStatusOrTotalProcessedRecord(clientSmtleadsender, clientSmtrawdata.getSourceid(), "Success","");
							logger.info(new StringBuffer("Successfully send the data to client:: ").append(clientSmtleadsender.getIntegrationname()));
						}
						else {
							updateDeliveryStatus(clientSmtrawdata, "Error", response);
							insertIntegrationDeliveryAudit(rawDataId, clientSmtleadsender.getClientsmtleadsenderid(), url, response);
							updateIntegrationStatusOrTotalProcessedRecord(clientSmtleadsender, clientSmtrawdata.getSourceid(), "Error",response);
							logger.info(new StringBuffer("Error while sending the data to client::").append(clientSmtleadsender.getIntegrationname()));
						}
					}
					else {
						updateDeliveryStatus(clientSmtrawdata, "Success", "");
						insertIntegrationDeliveryAudit(rawDataId, clientSmtleadsender.getClientsmtleadsenderid(), url, response);
						updateIntegrationStatusOrTotalProcessedRecord(clientSmtleadsender, clientSmtrawdata.getSourceid(), "Success","");
						logger.info(new StringBuffer("Successfully send the data to client::").append(clientSmtleadsender.getIntegrationname()));
					}
				}else {
						updateDeliveryStatus(clientSmtrawdata, "Success", "");
						insertIntegrationDeliveryAudit(rawDataId, clientSmtleadsender.getClientsmtleadsenderid(), url, response);
						updateIntegrationStatusOrTotalProcessedRecord(clientSmtleadsender, clientSmtrawdata.getSourceid(), "Success","");
						logger.info(new StringBuffer("Successfully send the data to client::").append(clientSmtleadsender.getIntegrationname()));
				}
			}
			else if(resEntity.toString().contains("204") || resEntity.toString().contains("no error")) {
				updateDeliveryStatus(clientSmtrawdata, "Success", "");
				insertIntegrationDeliveryAudit(rawDataId, clientSmtleadsender.getClientsmtleadsenderid(), url, response);
				updateIntegrationStatusOrTotalProcessedRecord(clientSmtleadsender, clientSmtrawdata.getSourceid(), "Success","");
				logger.info(new StringBuffer("Successfully send the data to client::").append(clientSmtleadsender.getIntegrationname()));
			}
			else if(!resEntity.toString().contains("no error") && resEntity.toString().contains("error")) {
				updateDeliveryStatus(clientSmtrawdata, "Error", response);
				insertIntegrationDeliveryAudit(rawDataId, clientSmtleadsender.getClientsmtleadsenderid(), url, response);
				updateIntegrationStatusOrTotalProcessedRecord(clientSmtleadsender, clientSmtrawdata.getSourceid(), "Error",response);
				logger.info("Error while sending the data to "+ clientSmtleadsender.getIntegrationname()+ " client" + response);
			}
			else {
				//mark error
				updateDeliveryStatus(clientSmtrawdata, "Error", response);
				insertIntegrationDeliveryAudit(rawDataId, clientSmtleadsender.getClientsmtleadsenderid(), url, response);
				updateIntegrationStatusOrTotalProcessedRecord(clientSmtleadsender, clientSmtrawdata.getSourceid(), "Error",response);
				logger.info("Error while sending the data to :::"+ clientSmtleadsender.getIntegrationname()+ " client" + response);
			}
		}
	}
	
	public static boolean containsIgnoreCase(String str, String subString) {
        return str.toLowerCase().contains(subString.toLowerCase());
    }
	
	public void updateDeliveryStatus(ClientSmtrawdata clientSmtrawdata, String status, String errorMessage) {
		clientSmtrawdata.setDeliverystatus(status);
		clientSmtrawdata.setErrormessage(errorMessage);
		//clientSmtrawdata.setUpdatedon(new Timestamp(new Date().getTime()));
		clientSmtrawdata.setUpdatedby("ClientSmt_System");
		
		uploadFileData(clientSmtrawdata);
	}
	
	
	public void insertIntegrationDeliveryAudit(long rawdataid, long clientcrmid, String request, String response) throws Exception {
		ClientSmtdataaudit clientSmtdataaudit = new ClientSmtdataaudit();
		clientSmtdataaudit.setClientsmtleadsenderid(clientcrmid);
		clientSmtdataaudit.setClientsmtrawdataid(rawdataid);
		clientSmtdataaudit.setRequest(request);
		clientSmtdataaudit.setResponse(response);
		//clientSmtdataaudit.setCreatedon(new Timestamp(new Date().getTime()));
		clientSmtdataaudit.setCreatedby("ClientSmt_System");
		//clientSmtdataaudit.setUpdatedon(new Timestamp(new Date().getTime()));
		clientSmtdataaudit.setUpdatedby("ClientSmt_System");
		//ldCommonDao.insertIntegrationDeliveryAudit(crmDataAudit);
		
		saveClientSmtDataAudit(clientSmtdataaudit);
	}
	
	private void updateIntegrationStatusOrTotalProcessedRecord(ClientSmtleadsender clientSmtleadsender, long sourceId, String status, String errorMessage) {
		logger.info("Inside updateIntegrationStatusOrTotalProcessedRecord method");
		logger.info("sourceId"+ sourceId);
		if(sourceId > 0) {
			updateCountInClientSmtDataSource(sourceId,status);
			updateStatusToIntegrationDetails(clientSmtleadsender, status, "ClientSmt_System", errorMessage);
		}
	}
	
	private void updateCountInClientSmtDataSource(long sourceId, String status) {
		ClientSmtdatasource clientSmtdatasource = new ClientSmtdatasource();
		Optional<ClientSmtdatasource> clientSmtdatasourceByElastic = clientSmtdatasourceRepo.findById(sourceId);
		if (clientSmtdatasourceByElastic.isPresent()) {
			clientSmtdatasource = clientSmtdatasourceByElastic.get();
			if(clientSmtdatasource != null) {
				if(StringUtils.isNotBlank(status)) {
					if(status.equalsIgnoreCase("success")) {
						int processedCount = clientSmtdatasource.getTotalprocessed();
						processedCount = processedCount + 1;
						clientSmtdatasource.setTotalprocessed(processedCount);
					}else {
						int errorCount = clientSmtdatasource.getTotalerror();
						errorCount = errorCount + 1;
						clientSmtdatasource.setTotalerror(errorCount);
					}
					saveClientDataSource(clientSmtdatasource);
				}
			}
		}
		
	}

	public void updateStatusToIntegrationDetails(ClientSmtleadsender clientSmtleadsender, String status, String username, String errorMessage) {
		clientSmtleadsender.setStatus(status);
		clientSmtleadsender.setErrormessage(errorMessage);
		//clientCRM.setUpdatedon(new Timestamp(new Date().getTime()));
		clientSmtleadsender.setUpdatedby(username);
		if(StringUtils.isNotBlank(status)) {
			if(status.equalsIgnoreCase("success")) {
				int processedCount = clientSmtleadsender.getTotalprocessed();
				processedCount = processedCount + 1;
				clientSmtleadsender.setTotalprocessed(processedCount);
			}else {
				int errorCount = clientSmtleadsender.getTotalerror();
				errorCount = errorCount + 1;
				clientSmtleadsender.setTotalerror(errorCount);
			}
		}
		saveIntegrationDetails(clientSmtleadsender);
	}
	
	public ResponseEntity<String> processDataToHttpClient(ClientSmtleadsender clientSmtleadsender, Map<String,String> httpAndStaticClientFieldsMap, 
			String connectionUrl, HttpHeaders headers, String url) {
		ResponseEntity<String> resEntity = null;
		RestTemplate restTemp=new RestTemplate();
		
		if(StringUtils.isNotBlank(clientSmtleadsender.getPostprocess())) {
			if(clientSmtleadsender.getPostprocess().equalsIgnoreCase("entity")) {
				try {
					MultiValueMap<String, String> multiValueMap = new LinkedMultiValueMap<>();
					for(Entry<String, String> entry : httpAndStaticClientFieldsMap.entrySet()) {
						multiValueMap.add(entry.getKey(), entry.getValue());
					}
					
					HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(multiValueMap, headers);
					resEntity=restTemp.postForEntity(connectionUrl, request, String.class);
				}
				catch(Exception e) {
					logger.info("Exception occurred while sending the data to "+ clientSmtleadsender.getIntegrationname()+ " client:::"+ e.getMessage());
					resEntity=restTemp.exchange(url, HttpMethod.POST, new HttpEntity<String>(headers), String.class);
				}
			}
			else if(clientSmtleadsender.getPostprocess().equalsIgnoreCase("url")) {
				resEntity=restTemp.exchange(url, HttpMethod.POST, new HttpEntity<String>(headers), String.class);
			}
		}
		else {
			resEntity=restTemp.exchange(url, HttpMethod.POST, new HttpEntity<String>(headers), String.class);
		}
		return resEntity;
	}

}
