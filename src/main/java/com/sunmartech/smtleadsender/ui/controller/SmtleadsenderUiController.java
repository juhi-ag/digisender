package com.sunmartech.smtleadsender.ui.controller;

import java.io.IOException;
import java.net.URL;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.Base64.Encoder;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.sunmartech.smtleadsender.ui.config.SmtLeadSenderUiPropertyConfig;
import com.sunmartech.smtleadsender.ui.constants.SmtleadsenderConstants;
import com.sunmartech.smtleadsender.ui.repository.ClientSmtleadsenderRepo;
import com.sunmartech.smtleadsender.ui.schema.ClientSmtleadsender;
import com.sunmartech.smtleadsender.ui.service.SmtleadsenderUiService;
import com.sunmartech.smtleadsender.ui.utils.CommonUtils;
import com.sunmartech.smtleadsender.ui.utils.FieldsConstant;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * This controller class is used for UI.
 *
 */
@Controller
public class SmtleadsenderUiController {
	
	static final Logger logger = LogManager.getLogger(SmtleadsenderUiController.class);
	
	@Autowired
	SmtleadsenderUiService smtleadsenderUiService;
	
	@Autowired
	ClientSmtleadsenderRepo clientSmtleadsenderRepo;
	
	@Autowired
	SmtLeadSenderUiPropertyConfig smtLeadSenderUiPropertyConfig;
	
	@RequestMapping("/")
	public String index() {
		return "redirect:/index";
	}
	
	/**
	 * This method is used for login details.
	 * @return ModelAndView
	 */
	@RequestMapping("/index")
	public ModelAndView loginAnalysisPage() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("index");
		
		mv.addObject("user", "");
		mv.addObject("fullName", "Juhi Agrawal");
		mv.addObject("ldUiPropertyConfig", smtLeadSenderUiPropertyConfig);
		
		mv.addObject("role", "APP-CRM-ADMIN");
		
	    return mv;
	}
	
	/**
	 * This method is used for load distinct account name from account table based on stage.
	 * @param request
	 * @param response
	 * @throws IOException
	 * @throws SQLException
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	@RequestMapping("/loadDistinctAccountNameBasedOnStage.do")
	public void loadDistinctAccountNameBasedOnStage(HttpServletRequest request, HttpServletResponse response) throws IOException, SQLException, InterruptedException, ExecutionException{
		logger.info("Inside loadDistinctAccountNameBasedOnStage");
		List<String> salesOpportunityList = new ArrayList<String>();
		salesOpportunityList.add("DemoClient1");
		salesOpportunityList.add("DemoClient2");
		salesOpportunityList.add("DemoClient3");
		salesOpportunityList.add("DemoClient4");
		salesOpportunityList.add("DemoClient5");
		logger.info("====salesOpportunityList=="+salesOpportunityList.size());
		if(CollectionUtils.isNotEmpty(salesOpportunityList)) {
			String strResponse = "";
			for(String salesOpportunity : salesOpportunityList) {
				strResponse = strResponse + "<option value=\""+ salesOpportunity + "\">"+ salesOpportunity + "</option>";
			}
			response.setContentType("text/html; charset=UTF-8");
			response.getWriter().write("<option value=\"\">Select Client Name</option>"+ strResponse);
		}
	}
	
	/**
	 * This method is used for convert the request data to JSON format.
	 * @param request
	 * @return String
	 */
	private String requestToJSONConverter(HttpServletRequest request){
		Enumeration<String> enm=request.getParameterNames();
		JSONObject jObj=new JSONObject();
		
			while(enm.hasMoreElements())
			{
				String key=enm.nextElement();
				
				try {
					JSONObject jsonObject = JSONObject.fromObject(key);
					for (Iterator<String> iterator = jsonObject.keySet().iterator(); iterator.hasNext();) {
						String mapKey = iterator.next();
						jObj.put(mapKey, jsonObject.get(mapKey).toString());
					}
				}
				catch(Exception e) {
					return "error";
				}
			}
			return jObj.toString();
	}
	
	/**
	 * This method is used for update integration details from UI.
	 * @param request
	 * @param response
	 * @return ModelAndView
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/updateIntegration.do")
	public ModelAndView updateIntegration(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView mv = new ModelAndView("updateIntegration");
		
		mv.addObject("user", "");
		mv.addObject("fullName", "Juhi Agrawal");
		mv.addObject("ldUiPropertyConfig", smtLeadSenderUiPropertyConfig);
		
		return mv;
	}
	
	/**
	 * This method is used for fetch integration details.
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/fetchIntegrationDetails.do")
	public void fetchIntegrationDetails(HttpServletRequest request, HttpServletResponse response) throws IOException {
		logger.info("Inside fetchIntegrationDetails Method");
		JSONArray jsonArr=new JSONArray();
		try {
			JSONObject jObj = new JSONObject();
			request.getParameterMap().entrySet().forEach(t->jObj.put(t.getKey(),t.getValue()));
			String requestData = jObj.toString();
			logger.info("requestData = "+requestData);
			if(StringUtils.isNotBlank(requestData)) {
				JSONObject jsonObject = JSONObject.fromObject(requestData);
				if (jsonObject != null && jsonObject.size() > 0) {
					String fetchSize =CommonUtils.checkNull(jsonObject.getJSONArray("fetchSize").get(0));
					List<ClientSmtleadsender> clientCrmList = clientSmtleadsenderRepo.findAll();
					//List<ClientCRM> clientCrmList = clientCrmElasticService.fetchIntegrationDetails(requestData, Integer.valueOf(fetchSize));
					logger.info("listSize::"+clientCrmList.size());
					if(CollectionUtils.isNotEmpty(clientCrmList)) {
						
						jsonArr = generateIntegrationDetailsRecords(clientCrmList);
						
						response.setContentType("text/html; charset=UTF-8");
						response.getWriter().write(jsonArr.toString());
					}
				}
			}
		}catch(Exception e) {
			logger.info("------------exception occured in fetchIntegrationDetails-----" + e.getMessage());
		}
	}
	
	/**
	 * This method is used for load client name to UI.
	 * @param request
	 * @param response
	 * @throws IOException
	 * @throws SQLException
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	@RequestMapping("/loadClientName.do")
	public void loadClientName(HttpServletRequest request, HttpServletResponse response) throws IOException, SQLException, InterruptedException, ExecutionException{
		logger.info("Inside loadClientName");
		List<Map<String, Object>> list = new ArrayList<>();
		String clientName="";
		List<String> salesOpportunityList = new ArrayList<String>();
		logger.info("====salesOpportunityList=="+salesOpportunityList.size());
		if(CollectionUtils.isNotEmpty(salesOpportunityList)) {
			for(String salesOpportunity : salesOpportunityList) {
				Map<String,Object> map = new HashMap<>();
				map.put("client_name",salesOpportunity);
				list.add(map);
			}
			clientName=prepareJSONString(list);
			
			response.setContentType("text/html; charset=UTF-8");
			response.getWriter().write(clientName);
		}
	}
	/**
	 * This method is used for fetch string value from list.
	 * @param list
	 * @return String
	 */
	public static String prepareJSONString(List<Map<String,Object>> list){
		JSONArray array=new JSONArray();
		for(Map<String,Object> map:list){
			JSONObject jObj=new JSONObject();
			Iterator itr=map.keySet().iterator();
				while(itr.hasNext()){
					String key=(String)itr.next();
					jObj.put(key, map.get(key));					
				}
				array.add(jObj);
		}
		return array.toString();
	}
	
	/**
	 * This method is used for load integration name to UI.
	 * @param request
	 * @param response
	 * @throws IOException
	 * @throws SQLException
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	@RequestMapping("/loadIntegrationName.do")
	public void loadIntegrationName(HttpServletRequest request, HttpServletResponse response) throws IOException{
		logger.info("Inside loadIntegrationName");
		try {
			List<Map<String, Object>> list = new ArrayList<>();
			String clientCrmName="";
			List<String> clientCrmList = new ArrayList<String>();
			logger.info("====clientCrmList=="+clientCrmList.size());
			if(CollectionUtils.isNotEmpty(clientCrmList)) {
				for(String clientCrm : clientCrmList) {
					Map<String,Object> map = new HashMap<>();
					map.put("integration_name",clientCrm);
					list.add(map);
				}
				clientCrmName=prepareJSONString(list);
				
				response.setContentType("text/html; charset=UTF-8");
				response.getWriter().write(clientCrmName);
			}
		}catch(Exception e) {
			logger.error(e.getMessage());
			logger.info("error while writing the response in loadIntegrationName method::::" + e.getMessage());
		}
	}
	
	/**
	 * This method is used for generate integration details records.
	 * @param woList
	 * @return JSONArray
	 */
	private JSONArray generateIntegrationDetailsRecords(List<ClientSmtleadsender> clientSmtleadsenderList) {
		JSONArray jsonArr=new JSONArray();
		int i=0;
		JSONObject jsonObjectForDataPassType = JSONObject.fromObject(smtLeadSenderUiPropertyConfig.getCrmIntegrationTypeValues());
		logger.info("jsonObjectForDataPassType::"+jsonObjectForDataPassType);
		for(ClientSmtleadsender clientSmtleadsender :clientSmtleadsenderList) {
			JSONArray jsonArrayForMapping = new JSONArray();
			JSONArray jsonArrayForCustom = new JSONArray();
			JSONArray jsonArrayForStatic = new JSONArray();
			JSONArray jsonArrayForMyFreshWorks = new JSONArray();
			JSONArray jsonArrayForHttpHeaders = new JSONArray();
			JSONObject jsonObject = new JSONObject();
			JSONArray jsonArrayForAllMapping = new JSONArray();
			String viewOrUpdateButton = "";
			String discardIntegration = "";
			String exportHeader = "";
			String sendTestLead = "";
			String deploy = "";
			String cloneIntegration = "";
			String reviewTestResponse = "";
			String status = "";
			int serialNo = i+1;
			viewOrUpdateButton="<div><button type=\"button\" id=editIntegration_"+i+" onClick=\"openIntegrationModel("+i+")\" class=\"btn btn-outline-dark btn-sm\"><span class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></span> Edit</button>&nbsp;</div>";
			
			if(StringUtils.isNotBlank(clientSmtleadsender.getStatus()) && (clientSmtleadsender.getStatus().equalsIgnoreCase("Inprogress") || (clientSmtleadsender.getStatus().equalsIgnoreCase("Error"))) && StringUtils.isNotBlank(clientSmtleadsender.getIntegrationstatus()) && clientSmtleadsender.getIntegrationstatus().equalsIgnoreCase("completed")){
				sendTestLead="<div><button type=\"button\" id=sendTestLead_"+i+" onClick=\"callSendTestLead("+i+")\" class=\"btn btn-info btn-sm\">Send Test Lead <span class=\"fa fa-paper-plane\" aria-hidden=\"true\"></span></button>&nbsp;</div>";
			}else {
				sendTestLead="<div><button type=\"button\" id=sendTestLead_"+i+" onClick=\"callSendTestLead("+i+")\" class=\"btn btn-info btn-sm\">Send Test Lead <span class=\"fa fa-paper-plane\" aria-hidden=\"true\"></span></button>&nbsp;</div>";
			}
			
			if(StringUtils.isNotBlank(clientSmtleadsender.getStatus()) && clientSmtleadsender.getStatus().equalsIgnoreCase("Success")){
				deploy="<div><button type=\"button\" id=deploy_"+i+" onClick=\"deployIntegration("+i+")\" class=\"btn btn-success btn-sm\">Deploy <span class=\"fa fa-share\" aria-hidden=\"true\"></span></button>&nbsp;</div>";
			}else {
				deploy="<div><button type=\"button\" id=deploy_"+i+" class=\"btn btn-success btn-sm\" disabled>Deploy <span class=\"fa fa-share\" aria-hidden=\"true\"></span></button>&nbsp;</div>";
			}
			if(StringUtils.isNotBlank(clientSmtleadsender.getActive()) && clientSmtleadsender.getActive().equalsIgnoreCase("Y")){
				discardIntegration="<div><button type=\"button\" id=discardIntegration_"+i+" onClick=\"confirmDiscardIntegration("+i+")\" class=\"btn btn-danger btn-sm\">Deactivate <span class=\"fa fa-trash\" aria-hidden=\"true\"></span></button>&nbsp;</div>";
			}else {
				discardIntegration="<div><button type=\"button\" id=activateIntegration_"+i+" onClick=\"activateIntegration("+i+")\" class=\"btn btn-success btn-sm\">Activate</button>&nbsp;</div>";
			}
			if(StringUtils.isNotBlank(clientSmtleadsender.getDeportfields())) {
				exportHeader="<div><button type=\"button\" id=exportHeader_"+i+" onClick=\"exportHeader("+i+")\" class=\"btn btn-primary btn-sm\">Export Header <span class=\"fa fa-download\" aria-hidden=\"true\"></span></button>&nbsp;</div>";
			}else {
				exportHeader="<div><button type=\"button\" id=exportHeader_"+i+" class=\"btn btn-primary btn-sm\" disabled>Export Header <span class=\"fa fa-download\" aria-hidden=\"true\"></span></button>&nbsp;</div>";
			}
			cloneIntegration="<div><button type=\"button\" id=cloneIntegration_"+i+" onClick=\"cloneIntegration("+i+")\" class=\"btn btn-warning btn-sm\">Clone <span class=\"fa fa-clone\" aria-hidden=\"true\"></span></button>&nbsp;</div>";
			if(StringUtils.isNotBlank(clientSmtleadsender.getStatus()) && (clientSmtleadsender.getStatus().equalsIgnoreCase("Success") || clientSmtleadsender.getStatus().equalsIgnoreCase("Error") || clientSmtleadsender.getStatus().equalsIgnoreCase("Active"))) {
				reviewTestResponse="<div><button type=\"button\" id=reviewTestResponse_"+i+" onClick=\"reviewTestResponse("+i+")\" class=\"btn btn-info btn-sm\">Review <span class=\"fa fa-search\" aria-hidden=\"true\"></span></button>&nbsp;</div>";
			}else {
				reviewTestResponse="<div><button type=\"button\" id=reviewTestResponse_"+i+" class=\"btn btn-info btn-sm\" disabled>Review <span class=\"fa fa-search\" aria-hidden=\"true\"></span></button>&nbsp;</div>";
			}
			
			if(StringUtils.isNotBlank(clientSmtleadsender.getStatus()) && clientSmtleadsender.getStatus().equalsIgnoreCase("Error")) {
				status = "<div><label id=selectedValidation_"+i+" class='control-label'> "+clientSmtleadsender.getStatus()+"</label>&nbsp<span class='text-muted custom-tooltip' data-animation='true' data-toggle='tooltip' data-placement='top'><i class='fa fa-question-circle-o' aria-hidden='true'><span class='tooltiptext'>"+clientSmtleadsender.getErrormessage()+"</span></i></span></div>";
			}else {
				status = clientSmtleadsender.getStatus();
			}
			
			String sftpCredentials = clientSmtleadsender.getSftpcredentials();
			String decodedUsername="";
			String decodedPassword="";
			if(StringUtils.isNotBlank(sftpCredentials)) {
				Decoder decoder = Base64.getDecoder();
				JSONObject jsonObjectForSftp = JSONObject.fromObject(sftpCredentials);
				
				if(StringUtils.isNotBlank(CommonUtils.checkNull(jsonObjectForSftp.get("sftpUser")))){
					String username = CommonUtils.checkNull(jsonObjectForSftp.get("sftpUser"));
					decodedUsername = new String(decoder.decode(username.getBytes()));
					
				}
				if(StringUtils.isNotBlank(CommonUtils.checkNull(jsonObjectForSftp.get("sftpPass")))){
					String password = CommonUtils.checkNull(jsonObjectForSftp.get("sftpPass"));
					decodedPassword = new String(decoder.decode(password.getBytes()));
				}
			}
			
			jsonObject.put("serialNo",serialNo);
			jsonObject.put("integrationDetailList", clientSmtleadsender);
			jsonObject.put("viewOrUpdateButton",viewOrUpdateButton);
			jsonObject.put("discardIntegration",discardIntegration);
			jsonObject.put("exportHeader",exportHeader);
			jsonObject.put("sendTestLead",sendTestLead);
			jsonObject.put("deploy",deploy);
			jsonObject.put("cloneIntegration",cloneIntegration);
			jsonObject.put("reviewTestResponse",reviewTestResponse);
			jsonObject.put("integrationId", String.valueOf(clientSmtleadsender.getClientsmtleadsenderid()));
			jsonObject.put("status",status);
			jsonObject.put("decodedUsername",decodedUsername);
			jsonObject.put("decodedPassword",decodedPassword);
			
			Map<String, String> mapKey = makeMultiCRMObjectToDBFieldMappingForFetch(CommonUtils.checkNull(clientSmtleadsender.getIntegrationmapping()));
			if(mapKey != null && mapKey.size() > 0) {
				for (String key : mapKey.keySet()) {
			        if (FieldsConstant.getDeliveryFields().containsKey(key.trim())) {
			        	JSONObject jsonObjectForMapping = new JSONObject();
			        	jsonObjectForMapping.put(key, mapKey.get(key));
						jsonArrayForMapping.add(jsonObjectForMapping.toString());
						jsonArrayForAllMapping.add(jsonObjectForMapping.toString());
			        	
					}else {
						JSONObject jsonObjectForCustom = new JSONObject();
						jsonObjectForCustom.put(key, mapKey.get(key));
						jsonArrayForCustom.add(jsonObjectForCustom.toString());
						jsonArrayForAllMapping.add(jsonObjectForCustom.toString());
					}
			    }
			}
			
			if(CollectionUtils.isNotEmpty(jsonArrayForMapping)) {
				jsonObject.put("integrationMapping", jsonArrayForMapping.toString());
			}else {
				jsonObject.put("integrationMapping", "");
			}
			
			
			if(CollectionUtils.isNotEmpty(jsonArrayForCustom)) {
				jsonObject.put("customMapping", jsonArrayForCustom.toString());
			}else {
				jsonObject.put("customMapping", "");
			}
			if(CollectionUtils.isNotEmpty(jsonArrayForAllMapping)) {
				jsonObject.put("jsonArrayForAllMapping", jsonArrayForAllMapping.toString());
			}else {
				jsonObject.put("jsonArrayForAllMapping", "");
			}
			
			Map<String, String> mapKeyForMyFreshWorks = makeMultiCRMObjectToDBFieldMappingForFetch(CommonUtils.checkNull(clientSmtleadsender.getCustomfields()));
			if(mapKeyForMyFreshWorks != null && mapKeyForMyFreshWorks.size() > 0) {
				for (String key : mapKeyForMyFreshWorks.keySet()) {
					JSONObject jsonObjectForMapping = new JSONObject();
		        	jsonObjectForMapping.put(key, mapKeyForMyFreshWorks.get(key));
		        	jsonArrayForMyFreshWorks.add(jsonObjectForMapping.toString());
			    }
			}
			if(CollectionUtils.isNotEmpty(jsonArrayForMyFreshWorks)) {
				jsonObject.put("customMappingForMyFreshWorks", jsonArrayForMyFreshWorks.toString());
			}else {
				jsonObject.put("customMappingForMyFreshWorks", "");
			}
			
			String staticFields = clientSmtleadsender.getStaticfields();
			if(StringUtils.isNotBlank(staticFields)) {
				JSONArray staticFieldsArr = JSONArray.fromObject(staticFields);
				if(CollectionUtils.isNotEmpty(staticFieldsArr)) {
					JSONObject jsonObject2 = staticFieldsArr.getJSONObject(0);
					if(jsonObject2 != null && jsonObject2.size() > 0) {
						for (Iterator<String> iterator = jsonObject2.keySet().iterator(); iterator.hasNext();) {
							String key = iterator.next();
							JSONObject jsonObjectForStatic = new JSONObject();
							jsonObjectForStatic.put(key, jsonObject2.getString(key));
							jsonArrayForStatic.add(jsonObjectForStatic.toString());
							
						}
					}
				}
			}
			
			if(CollectionUtils.isNotEmpty(jsonArrayForStatic)) {
				jsonObject.put("staticFields", jsonArrayForStatic.toString());
			}else {
				jsonObject.put("staticFields", "");
			}
			
			JSONArray validationFieldsArr = new JSONArray();
			String validationFields = clientSmtleadsender.getValidationmapping();
			if(StringUtils.isNotBlank(validationFields)) {
				validationFieldsArr = JSONArray.fromObject(validationFields);
			}
			
			if(CollectionUtils.isNotEmpty(validationFieldsArr)) {
				jsonObject.put("validationMapping", validationFieldsArr.toString());
			}else {
				jsonObject.put("validationMapping", "");
			}
			String httpHeadersFields = clientSmtleadsender.getHttpheaders();
			if(StringUtils.isNotBlank(httpHeadersFields)) {
				JSONArray httpHeadersFieldsArr = JSONArray.fromObject(httpHeadersFields);
				if(CollectionUtils.isNotEmpty(httpHeadersFieldsArr)) {
					JSONObject jsonObject2 = httpHeadersFieldsArr.getJSONObject(0);
					if(jsonObject2 != null && jsonObject2.size() > 0) {
						for (Iterator<String> iterator = jsonObject2.keySet().iterator(); iterator.hasNext();) {
							String key = iterator.next();
							JSONObject jsonObjectForhttpHeaders = new JSONObject();
							jsonObjectForhttpHeaders.put(key, jsonObject2.getString(key));
							jsonArrayForHttpHeaders.add(jsonObjectForhttpHeaders.toString());
							
						}
					}
				}
			}
			
			if(CollectionUtils.isNotEmpty(jsonArrayForHttpHeaders)) {
				jsonObject.put("httpHeaders", jsonArrayForHttpHeaders.toString());
			}else {
				jsonObject.put("httpHeaders", "");
			}
			String dataPassTypeValue = "";
			if(jsonObjectForDataPassType != null) {
				for (Object key : jsonObjectForDataPassType.keySet()) {
			        String keyStr = (String)key;
			        String value = CommonUtils.checkNull(jsonObjectForDataPassType.get(keyStr));
			        if(StringUtils.isNotBlank(value) && value.equalsIgnoreCase(clientSmtleadsender.getIntegrationtype())){
			        	dataPassTypeValue = CommonUtils.checkNull(keyStr);
			        	break;
			        }
				}
			}
			if(StringUtils.isNotBlank(dataPassTypeValue)){
				jsonObject.put("dataPassType", dataPassTypeValue);
			}else {
				jsonObject.put("dataPassType", "");
			}
			
			jsonArr.add(jsonObject);
			i++;
		}
		
		return jsonArr;
	}

	private void updateLookupFieldsValueBasedOnAdvanceLookup(JSONObject jsonObject, ClientSmtleadsender clientCrm) {
		String clientOtherLookup = CommonUtils.checkNull(jsonObject.get("clientOthersLookupFields"));
		logger.info("clientOtherLookup::"+clientOtherLookup);
		String clientOtherLookupKey = "";
		String clientOtherLookupParentKey = "";
		String lookupValueForExactAndPhraseMatch = "";
		if(StringUtils.isNotBlank(clientOtherLookup)) {
			//clientCrm.setCheckothersclientlookup(clientOtherLookup);
			JSONArray jsonArray = JSONArray.fromObject(clientOtherLookup);
			if(CollectionUtils.isNotEmpty(jsonArray)) {
				for(int l=0; l<jsonArray.size(); l++) {
					JSONObject checkOthersClientLookupJsonObject = jsonArray.getJSONObject(l);
					if(checkOthersClientLookupJsonObject != null && checkOthersClientLookupJsonObject.size() > 0) {
						for (Iterator<String> iterator = checkOthersClientLookupJsonObject.keySet().iterator(); iterator.hasNext();) {
							String mapKey = iterator.next();
							logger.info("mapKey::"+mapKey);
							if(StringUtils.isNotBlank(mapKey)) {
								if(StringUtils.isNotBlank(clientOtherLookupParentKey)) {
									clientOtherLookupParentKey = clientOtherLookupParentKey+","+mapKey;
								}else {
									clientOtherLookupParentKey = mapKey;
								}
							}
							String mapValue = checkOthersClientLookupJsonObject.getString(mapKey);
							if(StringUtils.isNotBlank(mapValue)) {
								JSONArray checkOthersClientLookupJsonArray = JSONArray.fromObject(mapValue);
								if(CollectionUtils.isNotEmpty(checkOthersClientLookupJsonArray)) {
									for(int k=0; k<checkOthersClientLookupJsonArray.size(); k++) {
										JSONObject jsonObject111 = checkOthersClientLookupJsonArray.getJSONObject(k);
										if(jsonObject111 != null && jsonObject111.size() > 0) {
											for (Iterator<String> iterator1 = jsonObject111.keySet().iterator(); iterator1.hasNext();) {
												String jsonKey = iterator1.next();
												logger.info("jsonKey::"+jsonKey);
												String jsonValue = jsonObject111.getString(jsonKey);
												logger.info("jsonValue::"+jsonValue);
												if(StringUtils.isNotBlank(jsonValue)) {
													if(StringUtils.isNotBlank(clientOtherLookupKey)) {
														clientOtherLookupKey = clientOtherLookupKey+","+jsonValue;
													}else {
														clientOtherLookupKey = jsonValue;
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			logger.info("clientOtherLookupKey::"+clientOtherLookupKey);
			if(StringUtils.isNotBlank(clientOtherLookupKey)) {
				JSONArray jsonArrayValueForLookupFields = new JSONArray();
				String lookupFielsForExactMatch= "";
				String lookupFielsForPhraseMatch= "";
				String lookupFields = clientCrm.getLookupfields();
				if(StringUtils.isNotBlank(lookupFields)){
					JSONArray jsonArrayForLookupFields=JSONArray.fromObject(lookupFields);
					for(int l=0; l<jsonArrayForLookupFields.size(); l++) {
						JSONObject jsonObjectForLookupFields = jsonArrayForLookupFields.getJSONObject(l);
						for (Iterator<String> iterator = jsonObjectForLookupFields.keySet().iterator(); iterator.hasNext();) {
							String mapKey = iterator.next();
							if(StringUtils.isNotBlank(mapKey)) {
								if(mapKey.equalsIgnoreCase("exact_match")) {
									String mapValueForExactMatch = jsonObjectForLookupFields.getString(mapKey);
									logger.info("mapValueForExactMatch::"+mapValueForExactMatch);
									if(StringUtils.isNotBlank(lookupValueForExactAndPhraseMatch)) {
										lookupValueForExactAndPhraseMatch = lookupValueForExactAndPhraseMatch+","+mapValueForExactMatch;
									}else {
										lookupValueForExactAndPhraseMatch = mapValueForExactMatch;
									}
									if(StringUtils.isNotBlank(mapValueForExactMatch)) {
										String[] clientOtherLookupKeyArr = clientOtherLookupKey.split(",");
										for(int p=0;p<clientOtherLookupKeyArr.length;p++){
											if(mapValueForExactMatch.contains(clientOtherLookupKeyArr[p])) {
												mapValueForExactMatch = mapValueForExactMatch.replace(clientOtherLookupKeyArr[p], "");
												lookupFielsForExactMatch = mapValueForExactMatch;
											}else {
												if(StringUtils.isNotBlank(lookupFielsForExactMatch)) {
													lookupFielsForExactMatch = lookupFielsForExactMatch+","+mapValueForExactMatch;
												}else {
													lookupFielsForExactMatch = mapValueForExactMatch;
												}
											}
										}
									}
								}else if(mapKey.equalsIgnoreCase("phrase_match")) {
									String mapValueForPhraseMatch = jsonObjectForLookupFields.getString(mapKey);
									logger.info("mapValueForPhraseMatch::"+mapValueForPhraseMatch);
									if(StringUtils.isNotBlank(lookupValueForExactAndPhraseMatch)) {
										lookupValueForExactAndPhraseMatch = lookupValueForExactAndPhraseMatch+","+mapValueForPhraseMatch;
									}else {
										lookupValueForExactAndPhraseMatch = mapValueForPhraseMatch;
									}
									if(StringUtils.isNotBlank(mapValueForPhraseMatch)){
										String[] clientOtherLookupKeyArr = clientOtherLookupKey.split(",");
										for(int p=0;p<clientOtherLookupKeyArr.length;p++){
											if(mapValueForPhraseMatch.contains(clientOtherLookupKeyArr[p])) {
												mapValueForPhraseMatch = mapValueForPhraseMatch.replace(clientOtherLookupKeyArr[p], "");
												lookupFielsForPhraseMatch = mapValueForPhraseMatch;
											}else {
												if(StringUtils.isNotBlank(lookupFielsForPhraseMatch)) {
													lookupFielsForPhraseMatch = lookupFielsForPhraseMatch+","+mapValueForPhraseMatch;
												}else {
													lookupFielsForPhraseMatch = mapValueForPhraseMatch;
												}
											}
										}
									}
								}
							}
						}
					}
				}
				logger.info("lookupFielsForExactMatch::"+lookupFielsForExactMatch);
				if(StringUtils.isNotBlank(lookupFielsForExactMatch)) {
					String lookupFielsForExactMatchValue ="";
					String[] lookupFielsForExactMatchArr = lookupFielsForExactMatch.split(",");
					if(lookupFielsForExactMatchArr.length > 0) {
						for(int i=0;i<lookupFielsForExactMatchArr.length;i++) {
							if(StringUtils.isNotBlank(lookupFielsForExactMatchArr[i])) {
								if(StringUtils.isNotBlank(lookupFielsForExactMatchValue)) {
									lookupFielsForExactMatchValue = lookupFielsForExactMatchValue+","+lookupFielsForExactMatchArr[i];
								}else {
									lookupFielsForExactMatchValue = lookupFielsForExactMatchArr[i];
								} 
							}
						}
					}
					if(StringUtils.isNotBlank(lookupFielsForExactMatchValue)) {
						lookupFielsForExactMatchValue = String.join(",",Arrays.asList(lookupFielsForExactMatchValue.split(",")).stream().distinct().collect(Collectors.toList()));
						JSONObject jsonObjectForExactMatch = new JSONObject();
						jsonObjectForExactMatch.put("exact_match", lookupFielsForExactMatchValue);
						jsonArrayValueForLookupFields.add(jsonObjectForExactMatch);	
					}
				}
				logger.info("lookupFielsForPhraseMatch::"+lookupFielsForPhraseMatch);
				if(StringUtils.isNotBlank(lookupFielsForPhraseMatch)) {
					String lookupFielsForPhraseMatchValue ="";
					String[] lookupFielsForPhraseMatchArr = lookupFielsForPhraseMatch.split(",");
					if(lookupFielsForPhraseMatchArr.length > 0) {
						for(int i=0;i<lookupFielsForPhraseMatchArr.length;i++) {
							if(StringUtils.isNotBlank(lookupFielsForPhraseMatchArr[i])) {
								if(StringUtils.isNotBlank(lookupFielsForPhraseMatchArr[i])) {
									lookupFielsForPhraseMatchValue = lookupFielsForPhraseMatchValue+","+lookupFielsForPhraseMatchArr[i];
								}else {
									lookupFielsForPhraseMatchValue = lookupFielsForPhraseMatchArr[i];
								} 
							}
						}
					}
					if(StringUtils.isNotBlank(lookupFielsForPhraseMatchValue)) {
						lookupFielsForPhraseMatchValue = String.join(",",Arrays.asList(lookupFielsForPhraseMatchValue.split(",")).stream().distinct().collect(Collectors.toList()));
						JSONObject jsonObjectForPhraseMatch = new JSONObject();
						jsonObjectForPhraseMatch.put("phrase_match", lookupFielsForPhraseMatchValue);
						jsonArrayValueForLookupFields.add(jsonObjectForPhraseMatch);
					}
				}
				logger.info("jsonArrayValueForLookupFields::"+jsonArrayValueForLookupFields);
				if(CollectionUtils.isNotEmpty(jsonArrayValueForLookupFields)) {
					clientCrm.setLookupfields(jsonArrayValueForLookupFields.toString());				} /*
					 * else { clientCrm.setLookupfields(""); }
					 */
			}
			if(StringUtils.isNotBlank(clientOtherLookupParentKey)) {
				String addToMandatoryField="";
				String[] clientOtherLookupParentKeyArr = clientOtherLookupParentKey.split(",");
				for(int r=0;r<clientOtherLookupParentKeyArr.length;r++){
					if(StringUtils.isNotBlank(lookupValueForExactAndPhraseMatch)) {
						String value = clientOtherLookupParentKeyArr[r];
						String[] lookupValueForExactAndPhraseMatchArr = lookupValueForExactAndPhraseMatch.split(",");
						boolean isValueMatched= Arrays.stream(lookupValueForExactAndPhraseMatchArr).anyMatch(x -> x.equalsIgnoreCase(value));
						if(isValueMatched) {
							if(StringUtils.isNotBlank(addToMandatoryField)) {
								addToMandatoryField = addToMandatoryField+","+value;
							}else {
								addToMandatoryField = value;
							}
						}
					}
				}
				if(StringUtils.isNotBlank(addToMandatoryField)) {
					String mandatoryFieldValue="";
					String[] addToMandatoryFieldArr = addToMandatoryField.split(",");
					for(int r=0;r<addToMandatoryFieldArr.length;r++){
						if(StringUtils.isNotBlank(addToMandatoryFieldArr[r])) {
							String value = addToMandatoryFieldArr[r];
							String mandatoryFields = CommonUtils.checkNull(clientCrm.getMandatoryfields());
							String[] mandatoryFieldsArr = mandatoryFields.split(",");
							boolean isValueMatched= Arrays.stream(mandatoryFieldsArr).anyMatch(x -> x.equalsIgnoreCase(value));
							if(!isValueMatched) {
								if(StringUtils.isNotBlank(mandatoryFieldValue)) {
									mandatoryFieldValue = mandatoryFieldValue+","+value;
								}else {
									mandatoryFieldValue = value;
								}
							}
							
						}
					}
					if(StringUtils.isNotBlank(mandatoryFieldValue)) {
						String mandatoryFields = CommonUtils.checkNull(clientCrm.getMandatoryfields());
						if(StringUtils.isNotBlank(mandatoryFields)) {
							mandatoryFields = mandatoryFields+","+mandatoryFieldValue;
							clientCrm.setMandatoryfields(mandatoryFields);	
						}else {
							clientCrm.setMandatoryfields(mandatoryFieldValue);					
						}
					}
					
				}
			}
			
		}else {
			//clientCrm.setCheckothersclientlookup("");
		}
	}
	
	@RequestMapping("/loadHeaderLookupValues.do")
	public void loadHeaderLookupValues(HttpServletRequest request, HttpServletResponse response) throws IOException {

		String strResponse = "";

		String reasonListData = smtLeadSenderUiPropertyConfig.getHeaderFieldValues();
		String[] reasonListArray = reasonListData.split(",");
		for (String reasonList : reasonListArray) {
			strResponse = strResponse + "<option value='" + reasonList + "'>" + reasonList + "</option>";
		}
		response.getWriter().write("<option value=\"\">-----select from list-----</option>" + strResponse);
	}
	
	@RequestMapping("/loadHeaderLookupValuesForAccept.do")
	public void loadHeaderLookupValuesForAccept(HttpServletRequest request, HttpServletResponse response) throws IOException {

		String strResponse = "";

		String reasonListData = smtLeadSenderUiPropertyConfig.getHeaderFieldValuesForAccept();
		String[] reasonListArray = reasonListData.split(",");
		for (String reasonList : reasonListArray) {
			strResponse = strResponse + "<option value='" + reasonList + "'>" + reasonList + "</option>";
		}
		response.getWriter().write("<option value=\"\">-----select from list-----</option>" + strResponse);
	}
	
	@RequestMapping("/loadHeaderLookupValuesForAcceptCharset.do")
	public void loadHeaderLookupValuesForAcceptCharset(HttpServletRequest request, HttpServletResponse response) throws IOException {

		String strResponse = "";

		String reasonListData = smtLeadSenderUiPropertyConfig.getHeaderFieldValuesForAcceptCharset();
		String[] reasonListArray = reasonListData.split(",");
		for (String reasonList : reasonListArray) {
			strResponse = strResponse + "<option value='" + reasonList + "'>" + reasonList + "</option>";
		}
		response.getWriter().write("<option value=\"\">-----select from list-----</option>" + strResponse);
	}
	
	@RequestMapping("/loadHeaderLookupValuesForUserAgent.do")
	public void loadHeaderLookupValuesForUserAgent(HttpServletRequest request, HttpServletResponse response) throws IOException {

		String strResponse = "";

		String reasonListData = smtLeadSenderUiPropertyConfig.getHeaderFieldValuesForUseragent();
		String[] reasonListArray = reasonListData.split(",");
		for (String reasonList : reasonListArray) {
			strResponse = strResponse + "<option value='" + reasonList + "'>" + reasonList + "</option>";
		}
		response.getWriter().write("<option value=\"\">-----select from list-----</option>" + strResponse);
	}
	
	@RequestMapping("/loadHeaderLookupValuesForAcceptEncoding.do")
	public void loadHeaderLookupValuesForAcceptEncoding(HttpServletRequest request, HttpServletResponse response) throws IOException {

		String strResponse = "";

		String reasonListData = smtLeadSenderUiPropertyConfig.getHeaderFieldValuesForAcceptEncoding();
		strResponse = strResponse + "<option value='" + reasonListData + "'>" + reasonListData + "</option>";
		response.getWriter().write("<option value=\"\">-----select from list-----</option>" + strResponse);
	}
	
	public static Map<String,String> makeMultiCRMObjectToDBFieldMappingForFetch(String integrationMapping)
	{
		//logger.info("inside makeMultiCRMObjectToDBFieldMappingForFetch");
		
		HashMap<String,String> hashMap = new HashMap<>();
		
		if(StringUtils.isNotBlank(integrationMapping)) {
			JSONArray jsonArray=JSONArray.fromObject(integrationMapping);
			for(Object job:jsonArray){
				JSONObject json=(JSONObject)job;
				JSONObject cjson=(JSONObject)json.values().iterator().next();
				
				// iterate through child json
				Iterator itr=cjson.keys();
				  
				while(itr.hasNext()){
					String key=(String)itr.next();
					Object jsonValue=cjson.get(key);
					if(jsonValue instanceof JSONArray) {
						JSONArray jsonArrayValue=(JSONArray)jsonValue;
						for(int i=0;i<jsonArrayValue.size();i++){
							hashMap.put(jsonArrayValue.getString(i),key);
						}
					}
					else {
						hashMap.put(key,cjson.get(key).toString());
					}
				}
			}
		}
		return hashMap;
	}
	
	@RequestMapping("/loadStatus.do")
	public void loadStatus(HttpServletRequest request, HttpServletResponse response) throws IOException {
		logger.info("Inside loadStatus");
		String strResponse = "";
		String productTypes = smtLeadSenderUiPropertyConfig.getCrmStatusValues();
		String[] productTypesArray = productTypes.split(",");
		for (String productType : productTypesArray) {
			strResponse = strResponse + "<option value='" + productType + "'>" + productType + "</option>";
		}
		response.getWriter().write("<option value=\"\">-----Select from list-----</option>" + strResponse);
	}
	
	@RequestMapping("/loadIntegrationType.do")
	public void loadIntegrationType(HttpServletRequest request, HttpServletResponse response) throws IOException {
		logger.info("Inside loadIntegrationType");
		String strResponse = "";
		JSONObject jsonObject = JSONObject.fromObject(smtLeadSenderUiPropertyConfig.getCrmIntegrationTypeValues());
		logger.info("jsonObject::"+jsonObject);
		if(jsonObject != null) {
			for (Object key : jsonObject.keySet()) {
		        String keyStr = (String)key;
		        Object keyvalue = jsonObject.get(keyStr);
		        strResponse = strResponse + "<option value='" + keyvalue + "'>" + keyStr + "</option>";
			}
		}
		response.getWriter().write("<option value=\"\">-----Select Datapass Type-----</option>" + strResponse);

	}
	
	@RequestMapping("/loadJsonFields.do")
	public void loadJsonFields(HttpServletRequest request, HttpServletResponse response) throws IOException {

		String strResponse = "";

		String reasonListData = smtLeadSenderUiPropertyConfig.getSunmartechJsonFields();
		String[] reasonListArray = reasonListData.split(",");
		for (String reasonList : reasonListArray) {
			strResponse = strResponse + "<option value='" + reasonList + "'>" + reasonList + "</option>";
		}
		response.getWriter().write("<option value=\"\">-----select smtleadsender field-----</option>" + strResponse);
	}
	
	@RequestMapping("/fetchClientSpecificJsonName.do")
	public void fetchClientSpecificJsonName(HttpServletRequest request, HttpServletResponse response) throws IOException {
		logger.info("Inside fetchClientSpecificJsonName Method");
		StringBuilder fieldsName = new StringBuilder();
		try {
			JSONObject jObj = new JSONObject();
			request.getParameterMap().entrySet().forEach(t->jObj.put(t.getKey(),t.getValue()));
			String requestData = jObj.toString();
			logger.info("requestData = "+requestData);
			if(StringUtils.isNotBlank(requestData)) {
				JSONObject jsonObject = JSONObject.fromObject(requestData);
				if (jsonObject != null && jsonObject.size() > 0) {
					String clientSpecificJson =CommonUtils.checkNull(jsonObject.getJSONArray("clientSpecificJson").get(0));
					if(StringUtils.isNotBlank(clientSpecificJson)) {
						String[] clientSpecificJsonArr = clientSpecificJson.split(",");
						for(String clientSpecificJsonStr : clientSpecificJsonArr) {
							String result = StringUtils.substringBetween(clientSpecificJsonStr,"|!","!|");
							if(StringUtils.isNotBlank(result)) {
								if(StringUtils.isNotBlank(fieldsName.toString())) {
									fieldsName.append("," + result);
								}else {
									fieldsName.append(result);
								}
							}
						}
						logger.info("fieldsName are: "+fieldsName.toString());	
					}
				}
			}
		}catch(Exception e) {
			logger.info("------------exception occured in fetchClientSpecificJsonName method-----" + e.getMessage());
		}
		response.setContentType("text/html; charset=UTF-8");
		response.getWriter().write(fieldsName.toString());
	}
	
	@RequestMapping("/checkEndPointUrlOutput.do")
	public void checkEndPointUrlOutput(HttpServletRequest request, HttpServletResponse response) throws IOException {
		logger.info("Inside checkEndPointUrlOutput Method");
		String message = "error";
		try {
			JSONObject jObj = new JSONObject();
			request.getParameterMap().entrySet().forEach(t->jObj.put(t.getKey(),t.getValue()));
			String requestData = jObj.toString();
			logger.info("requestData = "+requestData);
			if(StringUtils.isNotBlank(requestData)) {
				JSONObject jsonObject = JSONObject.fromObject(requestData);
				if (jsonObject != null && jsonObject.size() > 0) {
					String endpointUrl =CommonUtils.checkNull(jsonObject.getJSONArray("endpointUrl").get(0));
					logger.info("endpointUrl = "+endpointUrl);
					if(StringUtils.isNotBlank(endpointUrl)) {
						 if (isValidUrl(endpointUrl)) {
							 message = "success";
						 }else {
							 message = "error";
						 }
					}
				}
			}
		}catch(Exception e) {
			logger.info("------------exception occured in fetchClientSpecificJsonName method-----" + e.getMessage());
		}
		response.setContentType("text/html; charset=UTF-8");
		response.getWriter().write(message);
	}
	
	public static boolean isValidUrl(String url) 
    { 
		logger.info("Inside isValidUrl Method");
		/* Try creating a valid URL */
        try { 
            new URL(url).toURI(); 
            logger.info("url is valid");
            return true; 
        } 
        // If there was an Exception 
        // while creating URL object 
        catch (Exception e) { 
        	logger.info("------------exception occured in isValid method-----" + e.getMessage());
        	return false; 
        } 
    }
	
	@RequestMapping("/fileupload.do")
	public ModelAndView fileupload(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		ModelAndView mv = new ModelAndView("fileupload");
		
		mv.addObject("role", "APP-CRM-ADMIN");
		
		mv.addObject("user", "");
		mv.addObject("fullName", "Juhi Agrawal");
		mv.addObject("ldUiPropertyConfig", smtLeadSenderUiPropertyConfig);
		return mv;
	}
	
	/**
	 * This method is used for save integration details from UI.
	 * @param request
	 * @param response
	 */
	@RequestMapping("/saveIntegration.do")
	public void saveIntegration(HttpServletRequest request, HttpServletResponse response) {
		String tableData=requestToJSONConverter(request);
		logger.info("incoming request in saveIntegration::::" + tableData);
		JSONObject jsonObjectResponse = new JSONObject();
		try {
			JSONObject jsonObject = JSONObject.fromObject(tableData);
			if(jsonObject != null) {
				logger.info("checking integration name exists or not");
				
				 if (StringUtils.isNotBlank(String.valueOf(jsonObject.get("integrationName")))) { 
					 List<ClientSmtleadsender> clientCrmList = new ArrayList<ClientSmtleadsender>();
					 if(CollectionUtils.isNotEmpty(clientCrmList)) {
						 jsonObjectResponse.put("message","integrationNameExists");
					 }else {
						 	ClientSmtleadsender clientCRM = new ClientSmtleadsender();
							
							//Long clientCRMId = sequenceGenerator.nextId();
							//clientCRM.setClientcrmid(clientCRMId);
							clientCRM.setClientname(String.valueOf(jsonObject.get("clientName")));
							clientCRM.setIntegrationname(String.valueOf(jsonObject.get("integrationName")));
							clientCRM.setIntegrationtype(String.valueOf(jsonObject.get("integrationType")));
							clientCRM.setCreated_on(new Timestamp(new Date().getTime()));
							clientCRM.setCreatedby(String.valueOf(jsonObject.get("username")));
							clientCRM.setUpdatedon(new Timestamp(new Date().getTime()));
							clientCRM.setUpdatedby(String.valueOf(jsonObject.get("username")));
							clientCRM.setActive("Y");
							clientCRM.setIntegrationstatus(String.valueOf(jsonObject.get("status")));
							clientCRM.setStatus("Inprogress");
							long crmId = smtleadsenderUiService.saveIntegrationDetails(clientCRM);
							if(crmId > 0) {
								jsonObject.put("status", "saved");
								//jsonObjectResponse.put("integrationId", String.valueOf(clientCRMId));
								jsonObjectResponse.put("message", "");
							}
					 }
				 }
			}
		}
		catch (Exception e) {
			logger.info("Exception occured in saveIntegration::" + e);
		}
		try {
			logger.info("jsonObjectResponse::"+jsonObjectResponse);
			response.getWriter().write(jsonObjectResponse.toString());
		} catch (IOException e) {
			logger.error(e.getMessage());
			logger.info("error while writing the response in saveIntegration method::::" + e.getMessage());
		}
	}
	
	/**
	 * This method is used for fetch file upload data.
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/fetchFileUploadDataFromClientCRM.do")
	public void fetchFileUploadDataFromClientCRM(HttpServletRequest request, HttpServletResponse response) throws IOException {
		logger.info("Inside fetchFileUploadDataFromClientCRM Method");
		JSONArray jsonArr=new JSONArray();
		JSONObject jsonObjectForDataPassType = JSONObject.fromObject(smtLeadSenderUiPropertyConfig.getCrmIntegrationTypeValues());
		logger.info("jsonObjectForDataPassType::"+jsonObjectForDataPassType);
		
		try {
			JSONObject jObj = new JSONObject();
			request.getParameterMap().entrySet().forEach(t->jObj.put(t.getKey(),t.getValue()));
			String requestData = jObj.toString();
			logger.info("requestData = "+requestData);
			if(StringUtils.isNotBlank(requestData)) {
				JSONObject jsonObjectValue = JSONObject.fromObject(requestData);
				if(jsonObjectValue !=null) {
					String fetchSize =CommonUtils.checkNull(jsonObjectValue.getJSONArray("fetchSize").get(0));
					List<ClientSmtleadsender> clientSmtleadsenderList = clientSmtleadsenderRepo.findAll();
					logger.info("list size::"+clientSmtleadsenderList.size());
					int i=0;
					String totalRecordProcessed = "";
					String totalRecordError = "";
					String uploadFile="";
					String totalRecords="";
					if(CollectionUtils.isNotEmpty(clientSmtleadsenderList)) {
						for(ClientSmtleadsender clientSmtleadsender :clientSmtleadsenderList) {
							
							JSONObject jsonObject = new JSONObject();
							int serialNo = i+1;
							
							String clientCrmId = String.valueOf(clientSmtleadsender.getClientsmtleadsenderid());
							if(StringUtils.isNotBlank(clientCrmId)) {
								clientCrmId = "'"+clientCrmId+"'";
							}
							if(clientSmtleadsender.getTotalprocessed() != null && clientSmtleadsender.getTotalprocessed() > 0 ) {
								Integer totalProcessedRecord = clientSmtleadsender.getTotalprocessed();
								if(totalProcessedRecord > 0) {
									totalRecordProcessed = "<a href='#' data-toggle='modal' data-target='#dwnldLeadsModal' onClick =loadFileRecords("+clientCrmId+",'Success','')>"+clientSmtleadsender.getTotalprocessed()+"</a>";
								}else {
									totalRecordProcessed = "0";
									
								}
							}else {
								totalRecordProcessed = "0";
							}
							
							if(clientSmtleadsender.getTotalerror() != null && clientSmtleadsender.getTotalerror() > 0) {
								Integer totalErrorRecord = clientSmtleadsender.getTotalerror();
								if(totalErrorRecord > 0) {
									totalRecordError = "<a href='#' data-toggle='modal' data-target='#dwnldLeadsModal' onClick =loadFileRecords("+clientCrmId+",'Error','')>"+clientSmtleadsender.getTotalerror()+"</a>";
								}else {
									totalRecordError = "0";
								}
							}else {
								totalRecordError = "0";
							}
							uploadFile="<div><button type=\"button\" id=uploadfile_"+i+" onClick=\"callUploadFile("+i+")\" class=\"btn btn-info btn-sm\">Upload <span class=\"fa fa-upload\" aria-hidden=\"true\"></span></button>&nbsp;</div>";
							
							if(clientSmtleadsender.getTotalrecord() != null && clientSmtleadsender.getTotalrecord() > 0) {
								totalRecords = CommonUtils.checkNull(clientSmtleadsender.getTotalrecord());
								jsonObject.put("AddRemoveSign", "<span class=\"ml-sm-2 editbtn\"><span><i class=\"fa fa-plus\" ></i></span><span><i class=\"fa fa-minus\"></i></span></span>");
							}else {
								totalRecords = "0";
								jsonObject.put("AddRemoveSign", "");
							}
							String dataPassTypeValue = "";
							if(jsonObjectForDataPassType != null) {
								for (Object key : jsonObjectForDataPassType.keySet()) {
							        String keyStr = (String)key;
							        String value = CommonUtils.checkNull(jsonObjectForDataPassType.get(keyStr));
							        if(StringUtils.isNotBlank(value) && value.equalsIgnoreCase(clientSmtleadsender.getIntegrationtype())){
							        	dataPassTypeValue = CommonUtils.checkNull(keyStr);
							        	break;
							        }
								}
							}
							
							if(StringUtils.isNotBlank(dataPassTypeValue)){
								jsonObject.put("dataPassType", dataPassTypeValue);
							}else {
								jsonObject.put("dataPassType", "");
							}
							
							jsonObject.put("serialNo",serialNo);
							jsonObject.put("totalRecordProcessed", totalRecordProcessed);
							jsonObject.put("totalRecordError", totalRecordError);
							jsonObject.put("integrationName", clientSmtleadsender.getIntegrationname());
							jsonObject.put("total", totalRecords);
							jsonObject.put("uploadFile", uploadFile);
							jsonObject.put("updatedBy", clientSmtleadsender.getUpdatedby());
							jsonObject.put("integrationId", String.valueOf(clientSmtleadsender.getClientsmtleadsenderid()));
							//jsonObject.put("clientCrmId", clientCrmId);
							
							jsonArr.add(jsonObject);
							i++;
						}
						response.setContentType("text/html; charset=UTF-8");
						response.getWriter().write(jsonArr.toString());
					}
				}
			}
		}catch(Exception e) {
			logger.info("------------exception-----" + e.getMessage());
		}
	}
	
	/**
	 * This method is used for update integration details.
	 * @param request
	 * @param response
	 */
	@RequestMapping("/updateIntegrationDetails.do")
	public void updateIntegrationDetails(HttpServletRequest request, HttpServletResponse response) {
		String tableData=requestToJSONConverter(request);
		logger.info("incoming request in updateIntegrationDetails::::" + tableData);
		String message = "error";
		try {
			JSONObject jsonObject = JSONObject.fromObject(tableData);
			if(jsonObject != null) {
				logger.info("checking integration name exists or not");
				Long integrationId = CommonUtils.checkNullForLong(jsonObject.get("integrationId"));
				/*if(integrationId > 0) {
					List<ClientCRM> clientCrmList = clientCrmElasticService.checkIfIntegrationNameExistsBasedOnIntegrationId(integrationId, String.valueOf(jsonObject.get("integrationName")));
					if(CollectionUtils.isNotEmpty(clientCrmList)) {
						message = "integrationNameExists";
						logger.info(message);
					}else {
						ClientSmtleadsender clientSmtleadsender = setDataForUpdateInClientCRM(jsonObject);
						logger.info("clientSmtleadsender::"+clientSmtleadsender);
						if(clientSmtleadsender !=null) {
							ldUiService.updateClientCrm(clientSmtleadsender);
							message = "success";
							logger.info(message);
						}
					}
				}*/
				
				ClientSmtleadsender clientSmtleadsender = setDataForUpdateInclientSmtleadsender(jsonObject);
				logger.info("clientSmtleadsender::"+clientSmtleadsender);
				if(clientSmtleadsender !=null) {
					//ldUiService.updateClientCrm(clientSmtleadsender);
					clientSmtleadsender.setUpdatedby("Juhi");
					smtleadsenderUiService.saveIntegrationDetails(clientSmtleadsender);
					message = "success";
					logger.info(message);
				}
			}
		}
		catch (Exception e) {
			logger.info("Exception occured in updateIntegrationDetails::" + e.getMessage());
		}
		try {
			response.getWriter().write(message);
		} catch (IOException e) {
			logger.error(e.getMessage());
			logger.info("error while writing the response in updateIntegrationDetails method::::" + e.getMessage());
		}
	}
	
	public ClientSmtleadsender setDataForUpdateInclientSmtleadsender(JSONObject jsonObject) {
		ClientSmtleadsender clientSmtleadsender = new ClientSmtleadsender();
		if(jsonObject != null) {
			Long integrationId = CommonUtils.checkNullForLong(jsonObject.get("integrationId"));
			if(integrationId > 0) {
				clientSmtleadsender.setClientsmtleadsenderid(integrationId);
				clientSmtleadsender.setClientname(CommonUtils.checkNull(jsonObject.get("clientName")));
				clientSmtleadsender.setIntegrationname(CommonUtils.checkNull(jsonObject.get("integrationName")));
				clientSmtleadsender.setIntegrationtype(CommonUtils.checkNull(jsonObject.get("integrationType")));
				clientSmtleadsender.setLogin(CommonUtils.checkNull(jsonObject.get("usernameOutput")));
				clientSmtleadsender.setPassword(CommonUtils.checkNull(jsonObject.get("passwordOutput")));
				clientSmtleadsender.setUpdatedon(new Timestamp(new Date().getTime()));
				clientSmtleadsender.setUpdatedby(CommonUtils.checkNull(jsonObject.get("username")));
				clientSmtleadsender.setIntegrationmapping(CommonUtils.checkNull(jsonObject.get("ssFields")));
				clientSmtleadsender.setMandatoryfields(CommonUtils.checkNull(jsonObject.get("mandatoryFields")));
				clientSmtleadsender.setDeportfields(CommonUtils.checkNull(jsonObject.get("deportFields")));
				clientSmtleadsender.setStaticfields(CommonUtils.checkNull(jsonObject.get("staticFields")));
				clientSmtleadsender.setPostprocess("entity");
				clientSmtleadsender.setLookupfields(CommonUtils.checkNull(jsonObject.get("lookup_fields")));
				clientSmtleadsender.setValidationmapping(CommonUtils.checkNull(jsonObject.get("validationFields")));
				clientSmtleadsender.setSuccessdecisionphrase(CommonUtils.checkNull(jsonObject.get("successType")));
				clientSmtleadsender.setIntegrationstatus(CommonUtils.checkNull(jsonObject.get("integrationStatus")));
				//clientSmtleadsender.setCheckothersclientlookup(CommonUtils.checkNull(jsonObject.get("clientOthersLookupFields")));
				clientSmtleadsender.setCustomfields(CommonUtils.checkNull(jsonObject.get("ssFieldsForMyFreshWorks")));
				clientSmtleadsender.setStaticlistendpointurl(CommonUtils.checkNull(jsonObject.get("staticListEndPointUrl")));
				clientSmtleadsender.setStaticlistmultipleendpointurl(CommonUtils.checkNull(jsonObject.get("multipleStaticFieldsValues")));
				clientSmtleadsender.setApikey(CommonUtils.checkNull(jsonObject.get("apiKey")));
				
				if(StringUtils.isNotBlank(clientSmtleadsender.getIntegrationtype()) && clientSmtleadsender.getIntegrationtype().equalsIgnoreCase("http_client")){
					clientSmtleadsender.setHttpheaders(CommonUtils.checkNull(jsonObject.get("headerFields")));
				}
				
				if(StringUtils.isNotBlank(clientSmtleadsender.getIntegrationtype()) && clientSmtleadsender.getIntegrationtype().equalsIgnoreCase("sftp_client")) {
					JSONObject jsonObjectForSftp = new JSONObject();
					jsonObjectForSftp.put("sftpHost", CommonUtils.checkNull(jsonObject.get("sftpHost")));
					jsonObjectForSftp.put("sftpPort", CommonUtils.checkNull(jsonObject.get("sftpPort")));
					Encoder encoder = Base64.getEncoder();
					if(StringUtils.isNotBlank(CommonUtils.checkNull(jsonObject.get("sftpUser")))){
						String username = CommonUtils.checkNull(jsonObject.get("sftpUser"));
						String encodedUsername = new String(encoder.encode(username.getBytes()));
						jsonObjectForSftp.put("sftpUser", CommonUtils.checkNull(encodedUsername));
					}
					if(StringUtils.isNotBlank(CommonUtils.checkNull(jsonObject.get("sftpPass")))){
						String password = CommonUtils.checkNull(jsonObject.get("sftpPass"));
						String encodedPassword = new String(encoder.encode(password.getBytes()));
						jsonObjectForSftp.put("sftpPass", CommonUtils.checkNull(encodedPassword));
					}
					jsonObjectForSftp.put("sftpWorkingDir", CommonUtils.checkNull(jsonObject.get("sftpWorkingDir")));
					String sftpCredential = jsonObjectForSftp.toString();
					clientSmtleadsender.setSftpcredentials(sftpCredential);
				}
				clientSmtleadsender.setRecordtimedelay(CommonUtils.checkNullForInt(jsonObject.get("recordTimeDelay")));
				
				if(StringUtils.isNotBlank(clientSmtleadsender.getIntegrationtype()) && (clientSmtleadsender.getIntegrationtype().equalsIgnoreCase("rest_client") || clientSmtleadsender.getIntegrationtype().equalsIgnoreCase("mkto_bulk_import"))) {
					if(StringUtils.isNotBlank(CommonUtils.checkNull(jsonObject.get("restIdentityUrl")))) {
						JSONObject jsonObjectForRest = new JSONObject();
						jsonObjectForRest.put("restIdentityUrl", CommonUtils.checkNull(jsonObject.get("restIdentityUrl")));
						jsonObjectForRest.put("oauth", CommonUtils.checkNull(jsonObject.get("oauth")));
						jsonObjectForRest.put("clientId", CommonUtils.checkNull(jsonObject.get("clientId")));
						jsonObjectForRest.put("clientSecret", CommonUtils.checkNull(jsonObject.get("clientSecret")));
						
						String restIdentityCredential = jsonObjectForRest.toString();
						clientSmtleadsender.setRestidentityurl(restIdentityCredential);
						if(StringUtils.isNotBlank(CommonUtils.checkNull(jsonObject.get("endpointUrlOutput")))) {
							JSONObject jsonObjectForEndPointUrl = new JSONObject();
							jsonObjectForEndPointUrl.put("endpointUrlOutput", CommonUtils.checkNull(jsonObject.get("endpointUrlOutput")));
							jsonObjectForEndPointUrl.put("accessToken", CommonUtils.checkNull(jsonObject.get("accessToken")));
							
							String connectionUrl = jsonObjectForEndPointUrl.toString();
							clientSmtleadsender.setConnectionurl(connectionUrl);
						}
					}else {
						if(StringUtils.isNotBlank(CommonUtils.checkNull(jsonObject.get("endpointUrlOutput")))) {
							JSONObject jsonObjectForEndPointUrl = new JSONObject();
							jsonObjectForEndPointUrl.put("endpointUrlOutput", CommonUtils.checkNull(jsonObject.get("endpointUrlOutput")));
							
							String connectionUrl = jsonObjectForEndPointUrl.toString();
							clientSmtleadsender.setConnectionurl(connectionUrl);
						}
					}
				}else {
					if(StringUtils.isNotBlank(CommonUtils.checkNull(jsonObject.get("endpointUrlOutput")))) {
						JSONObject jsonObjectForEndPointUrl = new JSONObject();
						jsonObjectForEndPointUrl.put("endpointUrlOutput", CommonUtils.checkNull(jsonObject.get("endpointUrlOutput")));
						
						String connectionUrl = jsonObjectForEndPointUrl.toString();
						clientSmtleadsender.setConnectionurl(connectionUrl);
					}
				}
				
				if(StringUtils.isNotBlank(CommonUtils.checkNull(jsonObject.get("clientSpecificJson")))) {
					clientSmtleadsender.setClientspecificjson(CommonUtils.checkNull(jsonObject.get("clientSpecificJson")));
				}
				updateLookupFieldsValueBasedOnAdvanceLookup(jsonObject, clientSmtleadsender);
			}
		}
		return clientSmtleadsender;
	}
	
	@RequestMapping("/sendTestLead.do")
	public void sendTestLead(HttpServletRequest request, HttpServletResponse response){
		Long integrationId = CommonUtils.checkNullForLong(request.getParameter(SmtleadsenderConstants.INTEGRATIONID));
		logger.info("integrationId:::::"+integrationId);
		String username = CommonUtils.checkNull(request.getParameter(SmtleadsenderConstants.USERNAME));
		logger.info("username::"+username);
		String integrationName = CommonUtils.checkNull(request.getParameter(SmtleadsenderConstants.INTEGRATIONNAME));
		logger.info("integrationName::"+integrationName);
		JSONObject jsonObject = new JSONObject();
		String headers="";
		String message = "failure";
		
		try {
			Map<String, String[]> map = request.getParameterMap();
			for (String colName : map.keySet()) {
				if(!colName.equalsIgnoreCase(SmtleadsenderConstants.INTEGRATIONID) && !colName.equalsIgnoreCase(SmtleadsenderConstants.USERNAME) && !colName.equalsIgnoreCase(SmtleadsenderConstants.INTEGRATIONNAME)) {
					jsonObject.put(colName, Arrays.toString(map.get(colName)).replaceAll("[\\[\\]]", ""));
					if(StringUtils.isNotBlank(headers)) {
						headers = headers+","+colName;
					}else {
						headers = colName;
					}
					
				}
			}
			logger.info("jsonObject::"+jsonObject);
			if(jsonObject != null) {
				String sourceType = "";
				ClientSmtleadsender clientSmtleadsender = null;
				if(integrationId > 0) {
					Optional<ClientSmtleadsender> clientCrmByElastic = clientSmtleadsenderRepo.findById(integrationId);
					if (clientCrmByElastic.isPresent()) {
						clientSmtleadsender = clientCrmByElastic.get();
						if(clientSmtleadsender != null) {
							sourceType = clientSmtleadsender.getIntegrationtype();
						}
					}
				} 
				Long rawDataId = smtleadsenderUiService.insertTestLead(jsonObject,headers,integrationId,username,integrationName,sourceType);
				logger.info("rawDataId::"+rawDataId);
				if(rawDataId >= 0 && clientSmtleadsender != null) {
					clientSmtleadsender.setStatus("Test");
					clientSmtleadsender.setErrormessage("");
					clientSmtleadsender.setUpdatedon(new Timestamp(new Date().getTime()));
					clientSmtleadsender.setUpdatedby(username);
					//ldUiService.updateClientCrm(clientSmtleadsender);
					clientSmtleadsender.setUpdatedby("Juhi");
					smtleadsenderUiService.saveIntegrationDetails(clientSmtleadsender);
					message = SmtleadsenderConstants.SUCCESS;
					logger.info(message);
				}
			}
			
		}catch(Exception e) {
			logger.info("exception occured in sendTestLead method"+e.getMessage());
		}
		
		try {
			response.getWriter().write(message);
		} catch (IOException e) {
			logger.error(e.getMessage());
			logger.info("error while writing the response in sendTestLead method::::" + e.getMessage());
		}
	}
	
	/**
	 * This method is used for upload file data to database from file upload page from UI.
	 * @param request
	 * @param response
	 */
	@RequestMapping("/uploadFile.do")
	public void uploadFile(HttpServletRequest request, HttpServletResponse response) {
		String result = "error";
		String username = request.getParameter("username");
		Long clientCrmId = CommonUtils.checkNullForLong(request.getParameter("integrationId"));
		String integrationName = request.getParameter("integrationName");
		
		logger.info("username inside uploadFile=="+username);
		logger.info("clientCrmId inside uploadFile=="+clientCrmId);
		try {
			List<FileItem> items = new ServletFileUpload(new DiskFileItemFactory()).parseRequest((javax.servlet.http.HttpServletRequest) request);
			if (items != null) {
				FileItem fitem = (FileItem) items.get(0);
				String fileName = fitem.getName();
				try {
					String extension = fileName.substring(fileName.lastIndexOf("."),fileName.length());
					Date date = new Date();
				    String dateFormat = "MMddyy";
				    SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
				    
				    String sftpFileName = fileName.substring(0, fileName.lastIndexOf(".")) + "_" + sdf.format(date)+extension;
				    
				    String timeStamp = new Timestamp(new Date().getTime()).toString().replace(" ", "_");
					String fileSource = fileName + "_" + timeStamp;

					long startTime = System.currentTimeMillis();
					result = smtleadsenderUiService.uploadFileData(fitem, username, fileSource, clientCrmId, sftpFileName, integrationName);
					long stopTime = System.currentTimeMillis();

					logger.info("time taken to upload file : " + (stopTime - startTime));
				} catch (IOException e) {
					logger.info("exception occured : " + e);
				} catch (Exception e) {
					logger.info("exception occured :: " + e);
				}
			}
		} catch (FileUploadException e1) {
			logger.info("file upload exception occured :: " + e1);
		}
		try {
			response.getWriter().write(result);
		} catch (IOException e) {
			logger.error(e.getMessage());
			logger.error("error while uploading file::::" + e.getMessage());
		}
	}
	
	

}
