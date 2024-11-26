package com.sunmartech.smtleadsender.ui.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunmartech.smtleadsender.ui.schema.ClientSmtdatasource;

public interface ClientSmtdatasourceRepo extends JpaRepository<ClientSmtdatasource, Long> {
	
}
