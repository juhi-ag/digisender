package com.sunmartech.smtleadsender.ui.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunmartech.smtleadsender.ui.schema.ClientSmtrawdata;

public interface ClientSmtrawdataRepo extends JpaRepository<ClientSmtrawdata, Long> {

	List<ClientSmtrawdata> findByValidationstatusAndDeliverystatus(String validationstatus, String deliverystatus);
}
