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
@Table(name = "clientsmtdatasource")
@Entity
public class ClientSmtdatasource implements Serializable{

	
	private static final long serialVersionUID = -1411353406740015095L;

	@Id  // This annotation is now from the jakarta.persistence package
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long clientsmtdatasourceid;
	private String createdby;
	private Date createdon;
	private String filename;
	private Integer filesize;
	private String filesourcename;
	private Long clientsmtleadsenderid;
	private Integer totalerror;
	private Integer totalprocessed;
	private String updatedby;
	private Date updatedon;
	private String integrationname;
	private String processingstatus="N";

	
	public Long getClientsmtdatasourceid() {
		return clientsmtdatasourceid;
	}
	public void setClientsmtdatasourceid(Long clientsmtdatasourceid) {
		this.clientsmtdatasourceid = clientsmtdatasourceid;
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
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public Integer getFilesize() {
		return filesize;
	}
	public void setFilesize(Integer filesize) {
		this.filesize = filesize;
	}
	public String getFilesourcename() {
		return filesourcename;
	}
	public void setFilesourcename(String filesourcename) {
		this.filesourcename = filesourcename;
	}
	public Long getClientsmtleadsenderid() {
		return clientsmtleadsenderid;
	}
	public void setClientsmtleadsenderid(Long clientsmtleadsenderid) {
		this.clientsmtleadsenderid = clientsmtleadsenderid;
	}
	public Integer getTotalerror() {
		return totalerror;
	}
	public void setTotalerror(Integer totalerror) {
		this.totalerror = totalerror;
	}
	public Integer getTotalprocessed() {
		return totalprocessed;
	}
	public void setTotalprocessed(Integer totalprocessed) {
		this.totalprocessed = totalprocessed;
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
	public String getIntegrationname() {
		return integrationname;
	}
	public void setIntegrationname(String integrationname) {
		this.integrationname = integrationname;
	}
	public String getProcessingstatus() {
		return processingstatus;
	}
	public void setProcessingstatus(String processingstatus) {
		this.processingstatus = processingstatus;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
