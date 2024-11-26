package com.sunmartech.smtleadsender.ui.service;

import java.beans.IntrospectionException;
import java.lang.reflect.InvocationTargetException;

import org.apache.commons.fileupload.FileItem;

import com.sunmartech.smtleadsender.ui.schema.ClientSmtleadsender;
import com.sunmartech.smtleadsender.ui.schema.ClientSmtrawdata;

import net.sf.json.JSONObject;

public interface SmtleadsenderUiService {

	public long saveIntegrationDetails(ClientSmtleadsender clientSmtleadsender);

	public long insertTestLead(JSONObject jsonObject, String headers, long integrationId, String username, String integrationName, String sourceType)  throws IntrospectionException, IllegalAccessException, IllegalArgumentException, InvocationTargetException;

	public void sendDataToHttpClient(ClientSmtrawdata clientSmtrawdata, ClientSmtleadsender clientSmtleadsender);

	public String uploadFileData(FileItem fitem, String username, String fileSource, long clientCrmId, String sftpFileName, String integrationName) throws Exception;

}
