package com.sunmartech.smtleadsender.ui.schema;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id; // Corrected import
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table(name = "clientsmtrawdata")
@Entity
public class ClientSmtrawdata implements Serializable {
    private static final long serialVersionUID = -1411353406740015095L;
    
    @Id  // This annotation is now from the jakarta.persistence package
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long clientsmtrawdataid;
    
    private String city;
    private String companyname;
    private String country;
    private String createdby;
    private Date createdon;
    private String customfield;
    private String deliverystatus;
    private String email;
    private String employees;
    private String errormessage;
    private String firstname;
    private String hqphone;
    private String industry;
    private Long clientcrmid;
    private String integrationname;
    private String jobfunction;
    private String lastname;
    private String mobilephone;
    private String revenue;
    private String senioritylevel;
    private Long sourceid;
    private String state;
    private String street;
    private String title;
    private String updatedby;
    private Date updatedon;
    private String validationstatus;
    private String website;
    private String zip;
    private String crmobjectid;
    private String companyid;
    private String sourcetype;
    private String staticliststatus;
    private String staticlistresponse;

    // Getters and setters for all fields
    public long getClientsmtrawdataid() {
        return clientsmtrawdataid;
    }
    public void setClientsmtrawdataid(long clientsmtrawdataid) {
        this.clientsmtrawdataid = clientsmtrawdataid;
    }
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }
    public String getCompanyname() {
        return companyname;
    }
    public void setCompanyname(String companyname) {
        this.companyname = companyname;
    }
    public String getCountry() {
        return country;
    }
    public void setCountry(String country) {
        this.country = country;
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
    public String getCustomfield() {
        return customfield;
    }
    public void setCustomfield(String customfield) {
        this.customfield = customfield;
    }
    public String getDeliverystatus() {
        return deliverystatus;
    }
    public void setDeliverystatus(String deliverystatus) {
        this.deliverystatus = deliverystatus;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getEmployees() {
        return employees;
    }
    public void setEmployees(String employees) {
        this.employees = employees;
    }
    public String getErrormessage() {
        return errormessage;
    }
    public void setErrormessage(String errormessage) {
        this.errormessage = errormessage;
    }
    public String getFirstname() {
        return firstname;
    }
    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }
    public String getHqphone() {
        return hqphone;
    }
    public void setHqphone(String hqphone) {
        this.hqphone = hqphone;
    }
    public String getIndustry() {
        return industry;
    }
    public void setIndustry(String industry) {
        this.industry = industry;
    }
    public long getClientcrmid() {
        return clientcrmid;
    }
    public void setClientcrmid(long clientcrmid) {
        this.clientcrmid = clientcrmid;
    }
    public String getIntegrationname() {
        return integrationname;
    }
    public void setIntegrationname(String integrationname) {
        this.integrationname = integrationname;
    }
    public String getJobfunction() {
        return jobfunction;
    }
    public void setJobfunction(String jobfunction) {
        this.jobfunction = jobfunction;
    }
    public String getLastname() {
        return lastname;
    }
    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
    public String getMobilephone() {
        return mobilephone;
    }
    public void setMobilephone(String mobilephone) {
        this.mobilephone = mobilephone;
    }
    public String getRevenue() {
        return revenue;
    }
    public void setRevenue(String revenue) {
        this.revenue = revenue;
    }
    public String getSenioritylevel() {
        return senioritylevel;
    }
    public void setSenioritylevel(String senioritylevel) {
        this.senioritylevel = senioritylevel;
    }
    public long getSourceid() {
        return sourceid;
    }
    public void setSourceid(long sourceid) {
        this.sourceid = sourceid;
    }
    public String getState() {
        return state;
    }
    public void setState(String state) {
        this.state = state;
    }
    public String getStreet() {
        return street;
    }
    public void setStreet(String street) {
        this.street = street;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
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
    public String getValidationstatus() {
        return validationstatus;
    }
    public void setValidationstatus(String validationstatus) {
        this.validationstatus = validationstatus;
    }
    public String getWebsite() {
        return website;
    }
    public void setWebsite(String website) {
        this.website = website;
    }
    public String getZip() {
        return zip;
    }
    public void setZip(String zip) {
        this.zip = zip;
    }
    public String getCrmobjectid() {
        return crmobjectid;
    }
    public void setCrmobjectid(String crmobjectid) {
        this.crmobjectid = crmobjectid;
    }
    public String getCompanyid() {
        return companyid;
    }
    public void setCompanyid(String companyid) {
        this.companyid = companyid;
    }
    public String getSourcetype() {
        return sourcetype;
    }
    public void setSourcetype(String sourcetype) {
        this.sourcetype = sourcetype;
    }
    public String getStaticliststatus() {
        return staticliststatus;
    }
    public void setStaticliststatus(String staticliststatus) {
        this.staticliststatus = staticliststatus;
    }
    public String getStaticlistresponse() {
        return staticlistresponse;
    }
    public void setStaticlistresponse(String staticlistresponse) {
        this.staticlistresponse = staticlistresponse;
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }
}
