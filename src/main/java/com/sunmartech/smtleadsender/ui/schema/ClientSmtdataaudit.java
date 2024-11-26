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
@Table(name = "clientsmtdataaudit")
@Entity
public class ClientSmtdataaudit implements Serializable{
	
	private static final long serialVersionUID = -1411353406740015095L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	
	private Long clientsmtdataauditid;
	private Long clientsmtleadsenderid;
	private String createdby;
	private Date createdon;
	private Long clientsmtrawdataid;
	private String request;
	private String response;
	private String updatedby;
	private Date updatedon;
	
	
	public Long getClientsmtdataauditid() {
		return clientsmtdataauditid;
	}
	public void setClientsmtdataauditid(Long clientsmtdataauditid) {
		this.clientsmtdataauditid = clientsmtdataauditid;
	}
	public Long getClientsmtleadsenderid() {
		return clientsmtleadsenderid;
	}
	public void setClientsmtleadsenderid(Long clientsmtleadsenderid) {
		this.clientsmtleadsenderid = clientsmtleadsenderid;
	}
	public String getCreatedby() {
		return createdby;
	}
	public void setCreatedby(String createdby) {
		this.createdby = createdby;
	}
	public Date getCreatedon() {
		return createdon;
	}
	public void setCreatedon(Date createdon) {
		this.createdon = createdon;
	}
	public Long getClientsmtrawdataid() {
		return clientsmtrawdataid;
	}
	public void setClientsmtrawdataid(Long clientsmtrawdataid) {
		this.clientsmtrawdataid = clientsmtrawdataid;
	}
	public String getRequest() {
		return request;
	}
	public void setRequest(String request) {
		this.request = request;
	}
	public String getResponse() {
		return response;
	}
	public void setResponse(String response) {
		this.response = response;
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
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
	
}
