package com.sunmartech.smtleadsender.ui.dao;

import java.util.List;

import com.sunmartech.smtleadsender.ui.schema.ClientSmtdatasource;
import com.sunmartech.smtleadsender.ui.schema.ClientSmtleadsender;
import com.sunmartech.smtleadsender.ui.schema.ClientSmtrawdata;

public interface SmtleadsenderUiDao {

	public long saveIntegrationDetails(ClientSmtleadsender clientCRM);

	public long uploadFileData(ClientSmtrawdata crmRawData);

	public void sendDataToHttpClient(ClientSmtrawdata clientSmtrawdata, ClientSmtleadsender clientSmtleadsender, String connectionUrl);

	public long saveClientDataSource(ClientSmtdatasource crmDataSource);

	public void updateCRMRawDataList(List<ClientSmtrawdata> crmRawDataList);
	
}
