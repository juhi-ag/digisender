package com.sunmartech.smtleadsender.ui.schema;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table(name = "clientsmtleadsender")
@Entity
public class ClientSmtleadsender implements Serializable{

	private static final long serialVersionUID = -1411353406740015095L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long clientsmtleadsenderid;
	private String active;
	private String checkothersclientlookup;
	private String clientname;
	private String connectionurl;
	private Date created_on;
	private String createdby;
	private String deportfields;
	private String errormessage;
	private String integrationmapping;
	private String integrationname;
	private String integrationtype;
	private String login;
	private String lookupfields;
	private String mandatoryfields;
	private String password;
	private String postprocess;
	private String restidentityurl;
	private String staticfields;
	private String updatedby;
	private Date updatedon;
	private String status;
	private String integrationstatus;
	private Integer totalrecord;
	private String mandatorycheckcolumns;
	private String checkcountryspecificlookup;
	private String validationmapping;
	private String successdecisionphrase;
	private String customfields;
	private String apikey;
	private String sftpcredentials;
	private String httpheaders;
	private String staticlistmultipleendpointurl;
	private String staticlistendpointurl;
	private String clientspecificjson;
	private Integer totalprocessed;
	private Integer totalerror;
	private Integer recordtimedelay = 0;
	
	public Long getClientsmtleadsenderid() {
		return clientsmtleadsenderid;
	}
	public void setClientsmtleadsenderid(Long clientsmtleadsenderid) {
		this.clientsmtleadsenderid = clientsmtleadsenderid;
	}
	public String getActive() {
		return active;
	}
	public void setActive(String active) {
		this.active = active;
	}
	public String getCheckothersclientlookup() {
		return checkothersclientlookup;
	}
	public void setCheckothersclientlookup(String checkothersclientlookup) {
		this.checkothersclientlookup = checkothersclientlookup;
	}
	public String getClientname() {
		return clientname;
	}
	public void setClientname(String clientname) {
		this.clientname = clientname;
	}
	public String getConnectionurl() {
		return connectionurl;
	}
	public void setConnectionurl(String connectionurl) {
		this.connectionurl = connectionurl;
	}
	public Date getCreated_on() {
		return created_on;
	}
	public void setCreated_on(Date created_on) {
		this.created_on = created_on;
	}
	public String getCreatedby() {
		return createdby;
	}
	public void setCreatedby(String createdby) {
		this.createdby = createdby;
	}
	public String getDeportfields() {
		return deportfields;
	}
	public void setDeportfields(String deportfields) {
		this.deportfields = deportfields;
	}
	public String getErrormessage() {
		return errormessage;
	}
	public void setErrormessage(String errormessage) {
		this.errormessage = errormessage;
	}
	public String getIntegrationmapping() {
		return integrationmapping;
	}
	public void setIntegrationmapping(String integrationmapping) {
		this.integrationmapping = integrationmapping;
	}
	public String getIntegrationname() {
		return integrationname;
	}
	public void setIntegrationname(String integrationname) {
		this.integrationname = integrationname;
	}
	public String getIntegrationtype() {
		return integrationtype;
	}
	public void setIntegrationtype(String integrationtype) {
		this.integrationtype = integrationtype;
	}
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	public String getLookupfields() {
		return lookupfields;
	}
	public void setLookupfields(String lookupfields) {
		this.lookupfields = lookupfields;
	}
	public String getMandatoryfields() {
		return mandatoryfields;
	}
	public void setMandatoryfields(String mandatoryfields) {
		this.mandatoryfields = mandatoryfields;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPostprocess() {
		return postprocess;
	}
	public void setPostprocess(String postprocess) {
		this.postprocess = postprocess;
	}
	public String getRestidentityurl() {
		return restidentityurl;
	}
	public void setRestidentityurl(String restidentityurl) {
		this.restidentityurl = restidentityurl;
	}
	public String getStaticfields() {
		return staticfields;
	}
	public void setStaticfields(String staticfields) {
		this.staticfields = staticfields;
	}
	public String getUpdatedby() {
		return updatedby;
	}
	public void setUpdatedby(String updatedby) {
		this.updatedby = updatedby;
	}
	public Date getUpdatedon() {
		return updatedon;
	}
	public void setUpdatedon(Date updatedon) {
		this.updatedon = updatedon;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getIntegrationstatus() {
		return integrationstatus;
	}
	public void setIntegrationstatus(String integrationstatus) {
		this.integrationstatus = integrationstatus;
	}
	public Integer getTotalrecord() {
		return totalrecord;
	}
	public void setTotalrecord(Integer totalrecord) {
		this.totalrecord = totalrecord;
	}
	public String getMandatorycheckcolumns() {
		return mandatorycheckcolumns;
	}
	public void setMandatorycheckcolumns(String mandatorycheckcolumns) {
		this.mandatorycheckcolumns = mandatorycheckcolumns;
	}
	public String getCheckcountryspecificlookup() {
		return checkcountryspecificlookup;
	}
	public void setCheckcountryspecificlookup(String checkcountryspecificlookup) {
		this.checkcountryspecificlookup = checkcountryspecificlookup;
	}
	public String getValidationmapping() {
		return validationmapping;
	}
	public void setValidationmapping(String validationmapping) {
		this.validationmapping = validationmapping;
	}
	public String getSuccessdecisionphrase() {
		return successdecisionphrase;
	}
	public void setSuccessdecisionphrase(String successdecisionphrase) {
		this.successdecisionphrase = successdecisionphrase;
	}
	public String getCustomfields() {
		return customfields;
	}
	public void setCustomfields(String customfields) {
		this.customfields = customfields;
	}
	public String getApikey() {
		return apikey;
	}
	public void setApikey(String apikey) {
		this.apikey = apikey;
	}
	public String getSftpcredentials() {
		return sftpcredentials;
	}
	public void setSftpcredentials(String sftpcredentials) {
		this.sftpcredentials = sftpcredentials;
	}
	public String getHttpheaders() {
		return httpheaders;
	}
	public void setHttpheaders(String httpheaders) {
		this.httpheaders = httpheaders;
	}
	public String getStaticlistmultipleendpointurl() {
		return staticlistmultipleendpointurl;
	}
	public void setStaticlistmultipleendpointurl(String staticlistmultipleendpointurl) {
		this.staticlistmultipleendpointurl = staticlistmultipleendpointurl;
	}
	public String getStaticlistendpointurl() {
		return staticlistendpointurl;
	}
	public void setStaticlistendpointurl(String staticlistendpointurl) {
		this.staticlistendpointurl = staticlistendpointurl;
	}
	public String getClientspecificjson() {
		return clientspecificjson;
	}
	public void setClientspecificjson(String clientspecificjson) {
		this.clientspecificjson = clientspecificjson;
	}
	public Integer getTotalprocessed() {
		return totalprocessed;
	}
	public void setTotalprocessed(Integer totalprocessed) {
		this.totalprocessed = totalprocessed;
	}
	public Integer getTotalerror() {
		return totalerror;
	}
	public void setTotalerror(Integer totalerror) {
		this.totalerror = totalerror;
	}
	public Integer getRecordtimedelay() {
		return recordtimedelay;
	}
	public void setRecordtimedelay(Integer recordtimedelay) {
		this.recordtimedelay = recordtimedelay;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
