package com.sunmartech.smtleadsender.ui.utils;

import java.beans.PropertyDescriptor;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * This class is used for common utils methods.
 *
 */
public class CommonUtils {

	private static final Logger logger = LogManager.getLogger(CommonUtils.class);
	
	/**
	 * This class is used for check null.
	 * @param obj
	 * @return String
	 */
	public static String checkNull(Object obj) {
		String value="";
		if(obj!=null && !obj.equals("null")) {
			value=String.valueOf(obj).trim();
		}
		//logger.info(new StringBuffer("value:: ").append(value));
		return value;
	}

	/**
	 * This method is for makeMultiCRMObjectToDBFieldMapping
	 * @param integrationMapping
	 * @return hashMap
	 */
	public static Map<String,String> makeMultiCRMObjectToDBFieldMapping(String integrationMapping)
	{
		logger.info("inside makeMultiCRMObjectToDBFieldMapping");
		
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
					if(StringUtils.isNotBlank(key) && StringUtils.isNotBlank(CommonUtils.checkNull(jsonValue))) {
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
		}
		return hashMap;
	}
	
	/**
	 * This method is used for check null for integer.
	 * @param obj
	 * @return
	 */
	public static int checkNullForInt(Object obj) {
		Integer value=0;
		if(obj!=null && !obj.equals("") && !obj.equals("null") && StringUtils.isNotBlank(String.valueOf(obj).trim())) {
			value=Integer.valueOf(String.valueOf(obj).trim());
		}
		logger.info(new StringBuffer("value:: ").append(value));
		return value;
	}
	
	public static long checkNullForLong(Object obj) {
		long value=0;
		if(obj!=null && !obj.equals("") && !obj.equals("null") && StringUtils.isNotBlank(String.valueOf(obj).trim())) {
			value=Long.valueOf(String.valueOf(obj).trim());
		}
		return value;
	}
	
	public static final <T> Object getPropertyValue(T pojo, String fieldName) {
		try {
			return new PropertyDescriptor(fieldName, pojo.getClass()).getReadMethod().invoke(pojo);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}
	
	public static Map<String,String> makeCustomFieldMapping(String customFields)
	{
		HashMap<String,String> h=new HashMap<String,String>();
		
		JSONArray j=JSONArray.fromObject(customFields);
				  
		  for(Object job:j){
			  
			  JSONObject json=(JSONObject)job;
			  
			  // to fetch child json object
			  
			   JSONObject cjson=(JSONObject)json.values().iterator().next();
			  
			   // iterate through child json
			   Iterator itr=cjson.keys();
			  
			   while(itr.hasNext()){
				   String key=(String)itr.next();
				   Object jsonValue=cjson.get(key);
				   if(jsonValue instanceof JSONArray) {
					   JSONArray jsonArrayValue=(JSONArray)jsonValue;
					   for(int i=0;i<jsonArrayValue.size();i++){
						   h.put(jsonArrayValue.getString(i),key);
					   }
				   }
				   else {
					   h.put(key,cjson.get(key).toString());
				   }
			   }
		  }
		  return h;
	}
	
}
