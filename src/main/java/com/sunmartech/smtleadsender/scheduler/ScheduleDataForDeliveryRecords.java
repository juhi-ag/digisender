package com.sunmartech.smtleadsender.scheduler;

import java.util.List;
import java.util.Optional;

import org.apache.commons.collections.CollectionUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.sunmartech.smtleadsender.ui.repository.ClientSmtleadsenderRepo;
import com.sunmartech.smtleadsender.ui.repository.ClientSmtrawdataRepo;
import com.sunmartech.smtleadsender.ui.schema.ClientSmtleadsender;
import com.sunmartech.smtleadsender.ui.schema.ClientSmtrawdata;
import com.sunmartech.smtleadsender.ui.service.SmtleadsenderUiService;

@Component
public class ScheduleDataForDeliveryRecords {

	
	@Autowired
	ClientSmtrawdataRepo clientSmtRawDataRepo;
	
	@Autowired
	ClientSmtleadsenderRepo clientCRMRepo;
	
	@Autowired
	SmtleadsenderUiService smtleadsenderUiService;
	
	static final Logger logger = LogManager.getLogger(ScheduleDataForDeliveryRecords.class);
	
	//@Scheduled(fixedDelayString = "#{@getScheduledDataDeliveryIntervalFromDb}")
	@Scheduled(fixedDelay = 5000000)
	public void scheduleDataForDelivery() {
		System.out.println("Inside thread start");
		try {
			//fetch rawData Records
			List<ClientSmtrawdata> rawDataList = clientSmtRawDataRepo.findByValidationstatusAndDeliverystatus("Pending","None");
			logger.info(rawDataList.size());
			if(CollectionUtils.isNotEmpty(rawDataList)) {
				for(ClientSmtrawdata clientSmtrawdata : rawDataList) {
					if(clientSmtrawdata != null) {
						Long clientsmtleadsenderid = clientSmtrawdata.getClientcrmid();
						if(clientsmtleadsenderid > 0) {
							ClientSmtleadsender clientSmtleadsender = null;
							Optional<ClientSmtleadsender> clientCrmByElastic = clientCRMRepo.findById(clientsmtleadsenderid);
							if (clientCrmByElastic.isPresent()) {
								clientSmtleadsender = clientCrmByElastic.get();
								if(clientSmtleadsender != null) {
									smtleadsenderUiService.sendDataToHttpClient(clientSmtrawdata, clientSmtleadsender);
								}
							}
						} 
					}
				}
			}
		}catch(Exception e) {
			logger.error(e.getMessage());
			logger.info("error in scheduleDataForDelivery::::" + e.getMessage());
		}
		
	}
}
