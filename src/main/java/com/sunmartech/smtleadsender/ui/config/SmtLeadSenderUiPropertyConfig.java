package com.sunmartech.smtleadsender.ui.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
public class SmtLeadSenderUiPropertyConfig {

	@Value("${sunmartech.mandatory.fields}")
	private String sunmartechMandatoryFields;
	
	@Value("${client.specific.validations}")
	private String clientSpecificValidations;
	
	@Value("${custom.field.length}")
	private String customFieldLength;
	
	@Value("${static.field.length}")
	private String staticFieldLength;
	
	@Value("${header.field.length}")
	private String headerFieldLength;
	
	@Value("${header.field.values}")
	private String headerFieldValues;
	
	@Value("${header.field.values.for.accept}")
	private String headerFieldValuesForAccept;
	
	@Value("${header.field.values.for.acceptcharset}")
	private String headerFieldValuesForAcceptCharset;

	@Value("${header.field.values.for.useragent}")
	private String headerFieldValuesForUseragent;
	
	@Value("${file.upload.size}")
	private Integer fileUploadSize;
	
	@Value("${header.field.values.for.acceptencoding}")
	private String headerFieldValuesForAcceptEncoding;
	
	@Value("${crm.status.values}")
	private String crmStatusValues;
	
	@Value("${crm.integration.type.values}")
	private String crmIntegrationTypeValues;
	
	@Value("${data_load_limit}")
	private String dataLoadLimit;
	
	@Value("${rest.oauth.default.value}")
	private String restOauthDefaultValue;
	
	@Value("${endpoint.accesstoken.default.value}")
	private String endpointAccesstokenDefaultValue;
	
	@Value("${smtleadsender.fileupload.records.limit}")
	private String smtleadsenderFileUploadRecordsLimit;
	
	@Value("${sunmartech.json.fields}")
	private String sunmartechJsonFields;
	
	@Value("${smtleadsender.fileupload.size.limit}")
	private String smtleadsenderFileUploadSizeLimit;
	
	@Value("${refresh_timer_ms}")
	private String refreshTimer;
	
	@Value("${exceed_timer_ms}")
	private String exceedTimer;
	
	@Value("${scheduleDataForDelivery}")
	private String scheduleDataForDelivery;
	
	@Value("${scheduleDataForDeliverySleepTime}")
	private String scheduleDataForDeliverySleepTime;
	
	@Value("${ld.fileupload.records.limit}")
	private String ldFileUploadRecordsLimit;
	
	@Value("${ld.fileupload.size.limit}")
	private String ldFileUploadSizeLimit;

	public String getSunmartechMandatoryFields() {
		return sunmartechMandatoryFields;
	}

	public void setSunmartechMandatoryFields(String sunmartechMandatoryFields) {
		this.sunmartechMandatoryFields = sunmartechMandatoryFields;
	}

	public String getClientSpecificValidations() {
		return clientSpecificValidations;
	}

	public void setClientSpecificValidations(String clientSpecificValidations) {
		this.clientSpecificValidations = clientSpecificValidations;
	}

	public String getCustomFieldLength() {
		return customFieldLength;
	}

	public void setCustomFieldLength(String customFieldLength) {
		this.customFieldLength = customFieldLength;
	}

	public String getStaticFieldLength() {
		return staticFieldLength;
	}

	public void setStaticFieldLength(String staticFieldLength) {
		this.staticFieldLength = staticFieldLength;
	}

	public String getHeaderFieldLength() {
		return headerFieldLength;
	}

	public void setHeaderFieldLength(String headerFieldLength) {
		this.headerFieldLength = headerFieldLength;
	}

	public String getHeaderFieldValues() {
		return headerFieldValues;
	}

	public void setHeaderFieldValues(String headerFieldValues) {
		this.headerFieldValues = headerFieldValues;
	}

	public String getHeaderFieldValuesForAccept() {
		return headerFieldValuesForAccept;
	}

	public void setHeaderFieldValuesForAccept(String headerFieldValuesForAccept) {
		this.headerFieldValuesForAccept = headerFieldValuesForAccept;
	}

	public String getHeaderFieldValuesForAcceptCharset() {
		return headerFieldValuesForAcceptCharset;
	}

	public void setHeaderFieldValuesForAcceptCharset(String headerFieldValuesForAcceptCharset) {
		this.headerFieldValuesForAcceptCharset = headerFieldValuesForAcceptCharset;
	}

	public String getHeaderFieldValuesForUseragent() {
		return headerFieldValuesForUseragent;
	}

	public void setHeaderFieldValuesForUseragent(String headerFieldValuesForUseragent) {
		this.headerFieldValuesForUseragent = headerFieldValuesForUseragent;
	}

	public Integer getFileUploadSize() {
		return fileUploadSize;
	}

	public void setFileUploadSize(Integer fileUploadSize) {
		this.fileUploadSize = fileUploadSize;
	}

	public String getHeaderFieldValuesForAcceptEncoding() {
		return headerFieldValuesForAcceptEncoding;
	}

	public void setHeaderFieldValuesForAcceptEncoding(String headerFieldValuesForAcceptEncoding) {
		this.headerFieldValuesForAcceptEncoding = headerFieldValuesForAcceptEncoding;
	}

	public String getCrmStatusValues() {
		return crmStatusValues;
	}

	public void setCrmStatusValues(String crmStatusValues) {
		this.crmStatusValues = crmStatusValues;
	}

	public String getCrmIntegrationTypeValues() {
		return crmIntegrationTypeValues;
	}

	public void setCrmIntegrationTypeValues(String crmIntegrationTypeValues) {
		this.crmIntegrationTypeValues = crmIntegrationTypeValues;
	}

	public String getDataLoadLimit() {
		return dataLoadLimit;
	}

	public void setDataLoadLimit(String dataLoadLimit) {
		this.dataLoadLimit = dataLoadLimit;
	}

	public String getRestOauthDefaultValue() {
		return restOauthDefaultValue;
	}

	public void setRestOauthDefaultValue(String restOauthDefaultValue) {
		this.restOauthDefaultValue = restOauthDefaultValue;
	}

	public String getEndpointAccesstokenDefaultValue() {
		return endpointAccesstokenDefaultValue;
	}

	public void setEndpointAccesstokenDefaultValue(String endpointAccesstokenDefaultValue) {
		this.endpointAccesstokenDefaultValue = endpointAccesstokenDefaultValue;
	}

	public String getSmtleadsenderFileUploadRecordsLimit() {
		return smtleadsenderFileUploadRecordsLimit;
	}

	public void setSmtleadsenderFileUploadRecordsLimit(String smtleadsenderFileUploadRecordsLimit) {
		this.smtleadsenderFileUploadRecordsLimit = smtleadsenderFileUploadRecordsLimit;
	}

	public String getSunmartechJsonFields() {
		return sunmartechJsonFields;
	}

	public void setSunmartechJsonFields(String sunmartechJsonFields) {
		this.sunmartechJsonFields = sunmartechJsonFields;
	}

	public String getSmtleadsenderFileUploadSizeLimit() {
		return smtleadsenderFileUploadSizeLimit;
	}

	public void setSmtleadsenderFileUploadSizeLimit(String smtleadsenderFileUploadSizeLimit) {
		this.smtleadsenderFileUploadSizeLimit = smtleadsenderFileUploadSizeLimit;
	}

	public String getRefreshTimer() {
		return refreshTimer;
	}

	public void setRefreshTimer(String refreshTimer) {
		this.refreshTimer = refreshTimer;
	}

	public String getExceedTimer() {
		return exceedTimer;
	}

	public void setExceedTimer(String exceedTimer) {
		this.exceedTimer = exceedTimer;
	}

	public String getScheduleDataForDelivery() {
		return scheduleDataForDelivery;
	}

	public void setScheduleDataForDelivery(String scheduleDataForDelivery) {
		this.scheduleDataForDelivery = scheduleDataForDelivery;
	}

	public String getScheduleDataForDeliverySleepTime() {
		return scheduleDataForDeliverySleepTime;
	}

	public void setScheduleDataForDeliverySleepTime(String scheduleDataForDeliverySleepTime) {
		this.scheduleDataForDeliverySleepTime = scheduleDataForDeliverySleepTime;
	}

	public String getLdFileUploadRecordsLimit() {
		return ldFileUploadRecordsLimit;
	}

	public void setLdFileUploadRecordsLimit(String ldFileUploadRecordsLimit) {
		this.ldFileUploadRecordsLimit = ldFileUploadRecordsLimit;
	}

	public String getLdFileUploadSizeLimit() {
		return ldFileUploadSizeLimit;
	}

	public void setLdFileUploadSizeLimit(String ldFileUploadSizeLimit) {
		this.ldFileUploadSizeLimit = ldFileUploadSizeLimit;
	}
	
	
}

