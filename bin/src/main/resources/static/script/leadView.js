


function refreshLead(){
	$("#leadDetailsLoader").show();
	var corpEmail = $("#corporate_email").val();
	$.ajax({
		url:'fetchMsorCoidDetailsBasedOnCorpEmail.do?corpEmail='+corpEmail,
		success: function(data, textStatus, xhr)
		{
			$("#leadDetailsLoader").hide();
			enableButtons();
			debugger;
			if(data != null && data != "") {
				
				data=JSON.parse(data);
				
				prefillContactCompanyDetails(data);
			}
		},
		error: function(xhr, textStatus, errorThrow)
		{
			$("#leadDetailsLoader").hide();
			enableButtons();
			$("#errorMsg").html("* error occurred while fetching contact details corresponding to given corpEmail, kindly check with development team.").show();
			setTimeout(function(){$('#errorMsg').html("");},validationMessageTimeout);
		}		
	});	
	
}

function prefillContactCompanyDetails(data) {
	debugger;
	$("#firstname").val(data.contactdetails.contactname.firstname);
	replaceValueForAlwaysCamelCase("#firstname", $("#firstname").val());
	$("#lastname").val(data.contactdetails.contactname.lastname);
	replaceValueForAlwaysCamelCase("#lastname", $("#lastname").val());
	$("#middlename").val(data.contactdetails.contactname.middlename);
	replaceValueForAlwaysCamelCase("#middlename", $("#middlename").val());
	
	var fullNameVal = '';
	if($("#firstname").val() != null && $("#firstname").val() != "") {
		fullNameVal = $("#firstname").val();
	}
	if($("#lastname").val() != null && $("#lastname").val() != "") {
		fullNameVal = fullNameVal + " " + $("#lastname").val();
	}
	$("#fullname").val(fullNameVal);
	replaceValueForAlwaysCamelCase("#fullname", $("#fullname").val());
	$("#private_email").val(data.contactdetails.contactemail.privateemail);
	replaceValue("#private_email", $("#private_email").val());
	$("#corporate_email").val(data.contactdetails.contactemail.corpemail);
	old_corp_email = data.contactdetails.contactemail.corpemail;
	replaceValue("#corporate_email", $("#corporate_email").val());
	$("#street").val(data.contactdetails.contactaddress.address1);
	replaceValue("#street", $("#street").val());
	$("#city").val(data.contactdetails.contactaddress.city);
	replaceValue("#city", $("#city").val());
	$("#postalcode").val(data.contactdetails.contactaddress.zip);
	replaceValue("#postalcode", $("#postalcode").val());
	$("#state").val(data.contactdetails.contactaddress.state);
	replaceValue("#state", $("#state").val());
	$("#country").val(data.contactdetails.contactaddress.country);
	replaceValue("#country", $("#country").val());
	$("#jobtitle").val(data.contactdetails.jobtitle);
	replaceValue("#jobtitle", $("#jobtitle").val());
	
	var jobFunctionVal = "";
	var comboValues = $('#jobfunction option').map(function() {
		if($(this).text()==data.contactdetails.jobfunction) {
			jobFunctionVal = $(this).text();
		}
	});
	$("#jobfunction").val(jobFunctionVal);
	replaceValue("#jobfunction", $("#jobfunction").val());
	
	var seniorityLevelVal = "";
	var comboValues = $('#senioritylevel option').map(function() {
		if($(this).text()==data.contactdetails.senioritylevel) {
			seniorityLevelVal = $(this).text();
		}
	});
	//alert(seniorityLevelVal);
	$("#senioritylevel").val(seniorityLevelVal);
	replaceValue("#senioritylevel", $("#senioritylevel").val());
	/* $("#twitterurl").val(data.cntTwitterUrl);
	replaceValue("#twitterurl", $("#twitterurl").val()); */
	/* $("#contact_companyname").val(data.cntCompanyName);
	replaceValue("#contact_companyname", $("#contact_companyname").val());  */

	var contactCountryVal = $("#country").val();
	if(contactCountryVal != null && contactCountryVal != "" && (contactCountryVal == 'US' || contactCountryVal == 'CA')) {
		var directPhoneVal = data.cntDirectPhone;
		if(directPhoneVal != null && directPhoneVal != "") {
			/* var directPhoneUpdated = directPhoneVal.replace(/[^0-9]/g, "");
			if(directPhoneUpdated.length == 10) {
				directPhoneVal = directPhoneUpdated.substring(0, 3) + "-" + directPhoneUpdated.substring(3, 6) + "-" + directPhoneUpdated.substring(6, directPhoneUpdated.length);
			}
			if(directPhoneUpdated.length == 11) {
				directPhoneVal = directPhoneUpdated.substring(1, 4) + "-" + directPhoneUpdated.substring(4, 7) + "-" + directPhoneUpdated.substring(7, directPhoneUpdated.length);
			} */
			$("#directphone").val(directPhoneVal);
		}
		var mobilePhoneVal = data.contactdetails.contactphone.mobilephone;
		if(mobilePhoneVal != null && mobilePhoneVal != "") {
			/* var mobilePhoneUpdated = mobilePhoneVal.replace(/[^0-9]/g, "");
			if(mobilePhoneUpdated.length == 10) {
				mobilePhoneVal = mobilePhoneUpdated.substring(0, 3) + "-" + mobilePhoneUpdated.substring(3, 6) + "-" + mobilePhoneUpdated.substring(6, mobilePhoneUpdated.length);
			}
			if(mobilePhoneUpdated.length == 11) {
				mobilePhoneVal = mobilePhoneUpdated.substring(1, 4) + "-" + mobilePhoneUpdated.substring(4, 7) + "-" + mobilePhoneUpdated.substring(7, mobilePhoneUpdated.length);
			} */
			$("#mobilephone").val(mobilePhoneVal);
		}
	}
	else {
		$("#directphone").val(data.contactdetails.contactphone.directphone); 
		$("#mobilephone").val(data.contactdetails.contactphone.mobilephone);
	}
	
	replaceValue("#directphone", $("#directphone").val());
	
	$("#directphone_ext").val(data.contactdetails.contactphone.directphoneext);
	replaceValue("#directphone_ext", $("#directphone_ext").val());
	
	replaceValue("#mobilephone", $("#mobilephone").val());
	
	$("#linkedinhandle").val(data.contactdetails.linkedinhandle);
	replaceValue("#linkedinhandle", $("#linkedinhandle").val());
	$("#facebookhandle").val(data.contactdetails.facebookhandle);
	replaceValue("#facebookhandle", $("#facebookhandle").val());
	$("#twitterhandle").val(data.contactdetails.twitter_handle);
	replaceValue("#twitterhandle", $("#twitterhandle").val());  

	$("#company_companyname").val(data.companydetails.companyname);
	replaceValue("#company_companyname", $("#company_companyname").val());
	
	$("#tradingcompanyname").val(data.companydetails.tradingcompanyname);
	replaceValue("#tradingcompanyname", $("#tradingcompanyname").val());
	$("#hq_street").val(data.companydetails.companyaddress.address1);
	replaceValue("#hq_street", $("#hq_street").val());
	$("#hq_city").val(data.companydetails.companyaddress.city);
	replaceValue("#hq_city", $("#hq_city").val());
	$("#hq_postalcode").val(data.companydetails.companyaddress.zip);
	replaceValue("#hq_postalcode", $("#hq_postalcode").val());
	$("#hq_state").val(data.companydetails.companyaddress.state);
	replaceValue("#hq_state", $("#hq_state").val());
	$("#hq_country").val(data.companydetails.companyaddress.country);
	replaceValue("#hq_country", $("#hq_country").val());
	

	$("#company_companynameNl").val(data.companydetails.companynamenl);
	replaceValue("#company_companynameNl", $("#company_companynameNl").val());
	
	var countryVal = $("#hq_country").val();
	if(countryVal != null && countryVal != "" && (countryVal == 'US' || countryVal == 'CA')) {
		var hqPhoneVal = data.companydetails.hqphone;
		if(hqPhoneVal != null && hqPhoneVal != "") {
			/* var hqPhoneUpdated = hqPhoneVal.replace(/[^0-9]/g, "");
			if(hqPhoneUpdated.length == 10) {
				hqPhoneVal = hqPhoneUpdated.substring(0, 3) + "-" + hqPhoneUpdated.substring(3, 6) + "-" + hqPhoneUpdated.substring(6, hqPhoneUpdated.length);
			}
			if(hqPhoneUpdated.length == 11) {
				hqPhoneVal = hqPhoneUpdated.substring(1, 4) + "-" + hqPhoneUpdated.substring(4, 7) + "-" + hqPhoneUpdated.substring(7, hqPhoneUpdated.length);
			} */
			$("#hq_phone").val(hqPhoneVal);
		}
	}
	else {
		$("#hq_phone").val(data.companydetails.hqphone);
	}
	replaceValue("#hq_phone", $("#hq_phone").val());

	$("#revenue").val(data.companydetails.revenue);
	replaceValue("#revenue", $("#revenue").val());
/* 	$("#industry").val(data.cmpIndustry);
	replaceValue("#industry", $("#industry").val()); */
	
	if(data.companydetails.companyindustry.industry != null && data.companydetails.companyindustry.industry != "") {
		industry = data.companydetails.companyindustry.industry;
	}
	else {
		industry = data.companydetails.companyindustry.industrytext;
	}
	$("#industry").val(industry);
	replaceValue("#industry", $("#industry").val());

	var select2IndustryVal = "-----select from list-----";
	var industryTextVal = "";
	var comboValues = $('#industrytext option').map(function() {
		if(data.companydetails.companyindustry.industrytext != null && data.companydetails.companyindustry.industrytext != "" && data.companydetails.companyindustry.industrytext != "null") {
			if($(this).text().toLowerCase().trim()==data.companydetails.companyindustry.industrytext.toLowerCase().trim()) {
				industryTextVal = $(this).text();
				select2IndustryVal = $(this).text();
			}
		}
	}); 
	
	$("#select2-industrytext-container").html(select2IndustryVal);
	$("#select2-industrytext-container").prop("title",select2IndustryVal);
	
	$("#industrytext").val(industryTextVal);
	replaceValue("#industrytext", $("#industrytext").val());
	$("#employee").val(data.companydetails.employeetotal);
	replaceValue("#employee", $("#employee").val());
	$("#dunsnumber").val(data.companydetails.dunsnumber);
	replaceValue("#dunsnumber", $("#dunsnumber").val());
	
	$("#hidden_duns_number").val($("#dunsnumber").val());
	
	$("#website").val(data.companydetails.website);
	replaceValue("#website", $("#website").val());
	$("#description").val(data.companydetails.description);
	replaceValue("#description", $("#description").val());
	$("#locationtype").val(data.companydetails.locationtype);
	replaceValue("#locationtype", $("#locationtype").val()); 
	$("#longitude").val(data.companydetails.longitude);
	replaceValue("#longitude", $("#longitude").val()); 
	$("#latitude").val(data.companydetails.latitude);
	replaceValue("#latitude", $("#latitude").val()); 
	$("#region").val(data.companydetails.region);
	replaceValue("#region", $("#region").val()); 
	$("#companytype").val(data.companydetails.companytype);
	replaceValue("#companytype", $("#companytype").val()); 
	$("#fax").val(data.companydetails.fax);
	replaceValue("#fax", $("#fax").val());
	$("#Parent_Duns_No").val(data.companydetails.parentDuns);
	replaceValue("#Parent_Duns_No", $("#Parent_Duns_No").val()); 
	$("#SIC").val(data.companydetails.sic);
	replaceValue("#SIC", $("#SIC").val()); 
	$("#NAICS").val(data.companydetails.naics);
	replaceValue("#NAICS", $("#NAICS").val());
	$("#national_reg_number").val(data.companydetails.nationalregnumber);
	replaceValue("#national_reg_number", $("#national_reg_number").val()); 
	
    //$("#contact_company_id").val(data.conCompanyID);
    $("#contact_contact_id").val(data.contactdetails.contactid);
    $("#company_company_id").val(data.companydetails.companyid);
    
    $("#branchphone").val(data.contactdetails.contactphone.branchphone); 
	replaceValue("#branchphone", $("#branchphone").val());
	
	//alert(data.contactdetails.contactphone.branchphone);
	
	$("#private_email2").val(data.contactdetails.contactemail.privateemail2); 
	replaceValue("#private_email2", $("#private_email2").val());
	
	
	$("#private_email3").val(data.contactdetails.contactemail.privateemail3); 
	replaceValue("#private_email3", $("#private_email3").val());
	
	
	
	$("#xinghandle").val(data.contactdetails.xinghandle); 
	replaceValue("#xinghandle", $("#xinghandle").val());
	$("#miscLinkHndleID").val(data.contactdetails.misclink); 
	replaceValue("#miscLinkHndleID", $("#miscLinkHndleID").val());
	$("#complinkedinhandle").val(data.companydetails.hqlinkedinurl); 
	replaceValue("#complinkedinhandle", $("#complinkedinhandle").val());
	$("#src_revenue").val(data.companydetails.srcrevenue); 
	replaceValue("#src_revenue", $("#src_revenue").val());
	$("#src_employeetotal").val(data.companydetails.srcemployeetotal); 
	replaceValue("#src_employeetotal", $("#src_employeetotal").val());
	$("#src_industry").val(data.companydetails.companyindustry.srcindustry); 
	replaceValue("#src_industry", $("#src_industry").val());
	$("#ultimate_duns").val(data.companydetails.ultimateduns); 
	replaceValue("#ultimate_duns", $("#ultimate_duns").val());
	$("#immediate_parent").val(data.companydetails.immediateparent); 
	replaceValue("#immediate_parent", $("#immediate_parent").val());
	$("#viadeolinkhandle").val(data.contactdetails.viadeolinkhandle);
	replaceValue("#viadeolinkhandle", $("#viadeolinkhandle").val());
	
	/* if(data.cntCountry==null || $("#branchphone").val() == null || $("#branchphone").val() == "") {
		document.getElementById("branchphone_dialLink").className += " disabled";
	}
	if(data.cntCountry==null || $("#mobilephone").val() == null || $("#mobilephone").val() == "") {
		document.getElementById("mobilephone_dialLink").className += " disabled";
	}
	if(data.cntCountry==null || $("#directphone").val() == null || $("#directphone").val() == "") {
		document.getElementById("directphone_dialLink").className += " disabled";
	}
	
	if(data.cmpCountry==null || $("#hq_phone").val() == null || $("#hq_phone").val() == "")
	{
		document.getElementById("hqphone_dialLink").className += " disabled";
	} */
	
	/* if(UserExtn == "null" || UserExtn == null || UserExtn==''){
		$("#successMsg").html("Shortel dialer and communicator is required on this machine to use the auto-dialing facility. Please contact with shortel administrator.").show();//.fadeOut(4000);
		setTimeout(function(){
			$(".successMsg").hide();
		},15000);
	}else{ */
		$(".successMsg").hide();
	//}
    
    /* var comment = data.cntComment;
    if(comment != null && comment != "") {
    	if(comment.indexOf(":") != -1) {
    		$("#companyNameBlock").show();
    		$('select[name="statusList"]').val(comment.substring(0, comment.indexOf(":")));
    		$("#newCompanyName").val(comment.substring(comment.indexOf(":")+1, comment.length));
    	}
    	else {
    		$("#companyNameBlock").hide();
    		$('select[name="statusList"]').val(comment);
    	}
    } */
    
    if($("#linkedinhandle").val() != null && $("#linkedinhandle").val() != "") {
    	var linkedinhandle="";
		$("#linkedinHandleId").removeClass("ehandle").attr("disabled", false);
		$("#piplLinkedInHandleId").removeClass("ehandle").attr("disabled", false);
		if(($("#linkedinhandle").val().indexOf('http://') == 0) || $("#linkedinhandle").val().indexOf('https://') == 0) {
			linkedinhandle=$("#linkedinhandle").val();
		}
		else {
			linkedinhandle = "http://"+$("#linkedinhandle").val();
		}
		$("#linkedinHandleId").attr("href",linkedinhandle);
	}
	else {
		 $("#linkedinHandleId").addClass("ehandle").attr("disabled", true);
		 $("#piplLinkedInHandleId").addClass("ehandle").attr("disabled", true);
	}
	if($("#facebookhandle").val() != null && $("#facebookhandle").val() != "") {
		var facebookhandle="";
		$("#facebookHandleId").removeClass("ehandle").attr("disabled", false);
		if(($("#facebookhandle").val().indexOf('http://') == 0) || $("#facebookhandle").val().indexOf('https://') == 0) {
			facebookhandle=$("#facebookhandle").val();
		}
		else {
			facebookhandle = "http://"+$("#facebookhandle").val();
		}
		$("#facebookHandleId").attr("href",facebookhandle);
	}
	else {
		 $("#facebookHandleId").addClass("ehandle").attr("disabled", true);
	}
	if($("#twitterhandle").val() != null && $("#twitterhandle").val() != "") {
		var twitterhandle="";
		$("#twitterhandleId").removeClass("ehandle").attr("disabled", false);
		if(($("#twitterhandle").val().indexOf('http://') == 0) || $("#twitterhandle").val().indexOf('https://') == 0) {
			twitterhandle=$("#twitterhandle").val();
		}
		else {
			twitterhandle = "http://"+$("#twitterhandle").val();
		}
		$("#twitterhandleId").attr("href",twitterhandle);
	}
	else {
		 $("#twitterhandleId").addClass("ehandle").attr("disabled", true);
	}
	
	if($("#xinghandle").val() != null && $("#xinghandle").val() != "") {
		var xinghandle="";
		 $("#xingHandleId").removeClass("ehandle").attr("disabled", false);
		 
		 if(($("#xinghandle").val().indexOf('http://') == 0) || $("#xinghandle").val().indexOf('https://') == 0) {
			 xinghandle=$("#xinghandle").val();
		 }
		 else {
			 xinghandle = "http://"+$("#xinghandle").val();
		 }
		 $("#xingHandleId").attr("href",xinghandle);
	}
	else {
		 $("#xingHandleId").addClass("ehandle").attr("disabled", true);
	}
	
	if($("#miscLinkHndleID").val() != null && $("#miscLinkHndleID").val() != "") {
		var mischandle="";
		 $("#miscLinkId").removeClass("ehandle").attr("disabled", false);
		 
		 if(($("#miscLinkHndleID").val().indexOf('http://') == 0) || $("#miscLinkHndleID").val().indexOf('https://') == 0) {
			 mischandle=$("#miscLinkHndleID").val();
		 }
		 else {
			 mischandle = "http://"+$("#miscLinkHndleID").val();
		 }
		 $("#miscLinkId").attr("href",mischandle);
	}
	else {
		 $("#miscLinkId").addClass("ehandle").attr("disabled", true);
	}
	
	if($("#viadeolinkhandle").val() != null && $("#viadeolinkhandle").val() != "") {
		var viadeolinkhandle="";
		 $("#viadeoLinkHandleId").removeClass("ehandle").attr("disabled", false);
		 
		 if(($("#viadeolinkhandle").val().indexOf('http://') == 0) || $("#viadeolinkhandle").val().indexOf('https://') == 0) {
			 viadeolinkhandle=$("#viadeolinkhandle").val();
		 }
		 else {
			 viadeolinkhandle = "http://"+$("#viadeolinkhandle").val();
		 }
		 $("#viadeoLinkHandleId").attr("href",viadeolinkhandle);
	}
	else {
		 $("#viadeoLinkHandleId").addClass("ehandle").attr("disabled", true);
	}
	
	if($("#complinkedinhandle").val() != null && $("#complinkedinhandle").val() != "") {
		var cmpLinkedinhandle="";
		 $("#clinkedinHandleId").removeClass("ehandle").attr("disabled", false);
		 
		 if(($("#complinkedinhandle").val().indexOf('http://') == 0) || $("#complinkedinhandle").val().indexOf('https://') == 0) {
			 cmpLinkedinhandle=$("#complinkedinhandle").val();
		 }
		 else {
			 cmpLinkedinhandle = "http://"+$("#complinkedinhandle").val();
		 }
		 $("#clinkedinHandleId").attr("href",cmpLinkedinhandle);
	}
	else {
		 $("#clinkedinHandleId").addClass("ehandle").attr("disabled", true);
	}
	
	
	//NL related Fields
	$("#firstnameNl").val(data.contactdetails.contactname_nl.firstname);
	replaceValueForAlwaysCamelCase("#firstnameNl", $("#firstnameNl").val());
	$("#lastnameNl").val(data.contactdetails.contactname_nl.lastname);
	replaceValueForAlwaysCamelCase("#lastnameNl", $("#lastnameNl").val());
	
	 $("#middlenameNl").val(data.contactdetails.contactname_nl.middlename);
	replaceValueForAlwaysCamelCase("#middlenameNl", $("#middlenameNl").val());
	//alert("middle"+data.contactdetails.contactname_nl.middlename);
	var fullNameNlVal = '';
	if($("#firstnameNl").val() != null && $("#firstnameNl").val() != "") {
		fullNameNlVal = $("#firstnameNl").val();
	}
	if($("#lastnameNl").val() != null && $("#lastnameNl").val() != "") {
		fullNameNlVal = fullNameNlVal + " " + $("#lastnameNl").val();
	}
	$("#fullnameNl").val(fullNameNlVal);
	replaceValueForAlwaysCamelCase("#fullnameNl", $("#fullnameNl").val());
	$("#streetNl").val(data.contactdetails.contactaddressnl.address1);
	replaceValue("#streetNl", $("#streetNl").val());
	$("#cityNl").val(data.contactdetails.contactaddressnl.city);
	replaceValue("#cityNl", $("#cityNl").val());
	$("#stateNl").val(data.contactdetails.contactaddressnl.state);
	replaceValue("#stateNl", $("#stateNl").val());
	$("#jobtitleNl").val(data.contactdetails.jobtitle_nl);
	replaceValue("#jobtitleNl", $("#jobtitleNl").val());
	
	$("#companynameNl").val(data.companydetails.companynamenl);
	replaceValue("#companynameNl", $("#companynameNl").val());
	$("#hq_streetNl").val(data.companydetails.companyaddressnl.address1);
	replaceValue("#hq_streetNl", $("#hq_streetNl").val());
	$("#hq_cityNl").val(data.companydetails.companyaddressnl.city);
	replaceValue("#hq_cityNl", $("#hq_cityNl").val());
	$("#hq_stateNl").val(data.companydetails.companyaddressnl.state);
	replaceValue("#hq_stateNl", $("#hq_stateNl").val());
	
	enableButtons();

	item = {};
	item ["firstname"] = $("#firstname").val();
	item ["lastname"] = $("#lastname").val();
	item ["middlename"] = $("#middlename").val();
	item ["fullname"] = $("#fullname").val();
	item ["private_email"] = $("#private_email").val();
	item ["private_email2"] = $("#private_email2").val();
	item ["private_email3"] = $("#private_email3").val();
	item ["corporate_email"] = $("#corporate_email").val();
	item ["street"] = $("#street").val();
	item ["city"] = $("#city").val();
	item ["postalcode"] = $("#postalcode").val();
	item ["state"] = $("#state").val();
	item ["country"] = $("#country").val();
	item ["jobtitle"] = $("#jobtitle").val();
	item ["jobfunction"] = $("#jobfunction").val();
	item ["senioritylevel"] = $("#senioritylevel").val();
	item ["twitterhandle"] = $("#twitterhandle").val();
	//item ["contact_companyname"] = $("#contact_companyname").val();
	item ["directphone"] = $("#directphone").val();
	item ["mobilephone"] = $("#mobilephone").val();
	item ["directphone_ext"] = $("#directphone_ext").val();
	item ["linkedinhandle"] = $("#linkedinhandle").val();
	item ["facebookhandle"] = $("#facebookhandle").val();
	item ["twitterhandle"] = $("#twitterhandle").val();
	item ["xinghandle"] = $("#xinghandle").val();
	item ["miscLinkHndleID"] = $("#miscLinkHndleID").val();
	item ["viadeolinkhandle"] = $("#viadeolinkhandle").val();
	item ["branchphone"] = $("#branchphone").val();
	item ["leadstatus"] = $("#lead_status").val();
	item ["lastactivity"] = $("#last_activity").val();
	item ["assignAM"] = $("#assign_AM").val();
	item ["assigned_salesrep"] = $("#assigned_salesrep").val();
	item ["contact_region"] = $("#contact_region").val();
	item ["assign_inside_salesrep"] = $("#assign_inside_salesrep").val();
	item ["lead_source"] = $("#lead_source").val();
	
	item ["use_hq_address"] = $("#use_hq_address").prop('checked');
	// item ["use_hq_phone"] = $("#use_hq_phone").prop('checked');
	
    item ["company_companyname"] = $("#company_companyname").val();
    item ["hq_street"] = $("#hq_street").val();
    item ["hq_city"] = $("#hq_city").val();
    item ["hq_postalcode"] = $("#hq_postalcode").val();
    item ["hq_state"] = $("#hq_state").val();
    item ["hq_country"] = $("#hq_country").val();
    item ["hq_phone"] = $("#hq_phone").val();
    item ["revenue"] = $("#revenue").val();
    item ["industry"] = $("#industry").val();
    item ["employee"] = $("#employee").val();
    item ["dunsnumber"] = $("#dunsnumber").val();
    item ["website"] = $("#website").val();
    item ["description"] = $("#description").val();
    item ["complinkedinhandle"] = $("#complinkedinhandle").val();
    item ["src_employeetotal"] = $("#src_employeetotal").val();
    item ["src_revenue"] = $("#src_revenue").val();
    item ["src_industry"] = $("#src_industry").val();
    item ["ultimate_duns"] = $("#ultimate_duns").val();
    item ["immediate_parent"] = $("#immediate_parent").val();
    item ["national_reg_number"] = $("#national_reg_number").val();
    item ["fax"] = $("#fax").val();
    item ["tradingcompanyname"] = $("#tradingcompanyname").val();
    item ["industrytext"] = $("#industrytext").val();
    
    
    item ["firstnameNl"] = $("#firstnameNl").val();
    item ["lastnameNl"] = $("#lastnameNl").val();
    item ["fullnameNl"] = $("#fullnameNl").val();
    item ["streetNl"] = $("#streetNl").val();
    item ["cityNl"] = $("#cityNl").val();
    item ["stateNl"] = $("#stateNl").val();
    item ["jobtitleNl"] = $("#jobtitleNl").val();
    item ["company_companynameNl"] = $("#company_companynameNl").val();
    item ["hq_streetNl"] = $("#hq_streetNl").val();
    item ["hq_cityNl"] = $("#hq_cityNl").val();
    item ["hq_stateNl"] = $("#hq_stateNl").val();
    
    //arr.push(item);
    
    if($("#country").val() != null && $("#country").val()!=""){
    	countryStateLengthChk($("#country").val(),"#countryMsg","Country");
    }
    if($("#hq_country").val() != null && $("#hq_country").val()!=""){
    	countryStateLengthChk($("#hq_country").val(),"#hqCountryMsg","Company Country");
    }
    if($("#country").val() != null && $("#country").val() != "" && $("#state").val() != null && $("#state").val() != "") {
    	stateCodeFormat($("#country").val(),$("#state").val(),"#state","#StateMsg");
	}
    if($("#hq_country").val() != null && $("#hq_country").val() != "" && $("#hq_state").val() != null && $("#hq_state").val() != "") {
    	stateCodeFormat($("#hq_country").val(),$("#hq_state").val(),"#hq_state","#hqStateMsg");
	}
    
    var privateEmail = $("#private_email").val();
	if(privateEmail != null && privateEmail != "" && privateEmail!="NULL" && privateEmail!=" ") {
		if (!IsValidEmail(privateEmail)) {
	   	  	$('#privateEmailMsg').show().html('* Please enter a valid private email address.');
	   		return false;
	   	}
		else {
			$("#piplPemailHandleId").removeClass("ehandle").attr("disabled", false);
			$('#privateEmailMsg').hide();
		}
	}else{
		$("#piplPemailHandleId").addClass("ehandle").attr("disabled", true);
		$('#privateEmailMsg').hide();
	}
	
	privateEmail2 = $("#private_email2").val();
	if(privateEmail2 != null && privateEmail2 != "" && privateEmail2!="NULL" && privateEmail2!=" ") {
		if (!IsValidEmail(privateEmail)) {
	   	  	$('#privateEmai21Msg').show().html('* Please enter a valid private email 2 address.');
	   		return false;
	   	}
		else {
			$("#piplP2emailHandleId").removeClass("ehandle").attr("disabled", false);
			$('#privateEmail2Msg').hide();
		}
	}else{
		$("#piplP2emailHandleId").addClass("ehandle").attr("disabled", true);
		$('#privateEmail2Msg').hide();
	}
	
	var privateEmail3 = $("#private_email3").val();
	if(privateEmail3 != null && privateEmail3 != "" && privateEmail3!="NULL" && privateEmail3!=" ") {
		if (!IsValidEmail(privateEmail3)) {
	   	  	$('#privateEmail3Msg').show().html('* Please enter a valid private email 3 address.');
	   		return false;
	   	}
		else {
			$("#piplP3emailHandleId").removeClass("ehandle").attr("disabled", false);
			$('#privateEmail3Msg').hide();
		}
	}else{
		$("#piplP3emailHandleId").addClass("ehandle").attr("disabled", true);
		$('#privateEmail3Msg').hide();
	}
	
	var corporateEmail = $("#corporate_email").val();
	if(corporateEmail != null && corporateEmail != "" && corporateEmail!="NULL" && corporateEmail!=" ") {
		if (!IsValidEmail(corporateEmail)) {
	   	  	$('#corporateEmailMsg').show().html('* Please enter a valid corporate email address.');
	   		return false;
	   	}
		else {
			$("#piplCemailHandleId").removeClass("ehandle").attr("disabled", false);
			$('#corporateEmailMsg').hide();
		}
	}else{
		$("#piplCemailHandleId").addClass("ehandle").attr("disabled", true);
		$('#corporateEmailMsg').hide();
	}
	disableEnableMapButton();
}
function lastactivityDD() {
	
	var lastactivitydrop=leadactivityValues;
	var drop='<option value="">--- Lead Activity ---</option>';
	var list = lastactivitydrop.split(",");
	for(var i = 0; i< list.length; i++){
	  drop = drop +'<option value="'+list[i]+'">'+list[i]+'</option>';
	}
	$('#last_activity').html(drop);
}

function leadStatusDD() {
	
	if(role=="insidesales" || role=="insidesalesamus") {
		var leadStatusDrop = rolebasedleadstatusValues;
	}
	else {
		var leadStatusDrop = leadstatusValues;
	}
	
	var drop='<option value="">--- Lead Status ---</option>';
	var list = leadStatusDrop.split(",");
	for(var i = 0; i< list.length; i++){
	  drop = drop +'<option value="'+list[i]+'">'+list[i]+'</option>';
	}
	$('#lead_status').html(drop);
} 

function leadsourceDD() {
	
	var leadsourcedrop=leadSource;
	var drop='<option value="">------select from list------</option>';
	var list = leadsourcedrop.split(",");
	for(var i = 0; i< list.length; i++){
	  drop = drop +'<option value="'+list[i]+'">'+list[i]+'</option>';
	}
	$('#lead_source').html(drop);
	$('#selectedLeadSource').html(drop);
}




function prefillCompanyDetails(data) {
	//alert("prefillCompanyDetails");
	debugger;
	if(data.contactdetails != null && data.contactdetails != ""){
		if(data.contactdetails.contactname != null && data.contactdetails.contactname != ""){
			$("#firstname").val(data.contactdetails.contactname.firstname);
			replaceValueForAlwaysCamelCase("#firstname", $("#firstname").val());
			$("#lastname").val(data.contactdetails.contactname.lastname);
			replaceValueForAlwaysCamelCase("#lastname", $("#lastname").val());
			$("#middlename").val(data.contactdetails.contactname.middlename);
			replaceValueForAlwaysCamelCase("#middlename", $("#middlename").val());
			
			var fullNameVal = '';
			if($("#firstname").val() != null && $("#firstname").val() != "") {
				fullNameVal = $("#firstname").val();
			}
			if($("#lastname").val() != null && $("#lastname").val() != "") {
				fullNameVal = fullNameVal + " " + $("#lastname").val();
			}
			$("#fullname").val(fullNameVal);
			replaceValueForAlwaysCamelCase("#fullname", $("#fullname").val());
		}
		if(data.contactdetails.contactemail != null && data.contactdetails.contactemail != ""){
			$("#private_email").val(data.contactdetails.contactemail.privateemail);
			replaceValue("#private_email", $("#private_email").val());
			$("#corporate_email").val(data.contactdetails.contactemail.corpemail);
			old_corp_email = data.contactdetails.contactemail.corpemail;
			replaceValue("#corporate_email", $("#corporate_email").val());
			$("#private_email2").val(data.contactdetails.contactemail.privateemail2); 
			replaceValue("#private_email2", $("#private_email2").val());
			$("#private_email3").val(data.contactdetails.contactemail.privateemail3); 
			replaceValue("#private_email3", $("#private_email3").val());
		}
		if(data.contactdetails.contactaddress != null && data.contactdetails.contactaddress != ""){
			$("#street").val(data.contactdetails.contactaddress.address1);
			replaceValue("#street", $("#street").val());
			$("#city").val(data.contactdetails.contactaddress.city);
			replaceValue("#city", $("#city").val());
			$("#postalcode").val(data.contactdetails.contactaddress.zip);
			replaceValue("#postalcode", $("#postalcode").val());
			$("#state").val(data.contactdetails.contactaddress.state);
			replaceValue("#state", $("#state").val());
			$("#country").val(data.contactdetails.contactaddress.country);
			replaceValue("#country", $("#country").val());
		}
		
		$("#jobtitle").val(data.contactdetails.jobtitle);
		replaceValue("#jobtitle", $("#jobtitle").val());
		
		var jobFunctionVal = "";
		var comboValues = $('#jobfunction option').map(function() {
			if(data.contactdetails.jobfunction != null && data.contactdetails.jobfunction != "" && data.contactdetails.jobfunction != "null"){
				if($(this).text().toLowerCase().trim()==data.contactdetails.jobfunction.toLowerCase().trim()) {
					jobFunctionVal = $(this).text();
				}
			}
		});
		$("#jobfunction").val(jobFunctionVal);
		replaceValue("#jobfunction", $("#jobfunction").val());
		
		var seniorityLevelVal = "";
		var comboValues = $('#senioritylevel option').map(function() {
			if(data.contactdetails.senioritylevel != null && data.contactdetails.senioritylevel != "" && data.contactdetails.senioritylevel != "null"){
				if($(this).text().toLowerCase().trim()==data.contactdetails.senioritylevel.toLowerCase().trim()) {
					seniorityLevelVal = $(this).text();
				}	
			}
		});

		$("#senioritylevel").val(seniorityLevelVal);
		replaceValue("#senioritylevel", $("#senioritylevel").val());
		/* $("#twitterurl").val(data.cntTwitterUrl);
		replaceValue("#twitterurl", $("#twitterurl").val()); */
		/* $("#contact_companyname").val(data.cntCompanyName);
		replaceValue("#contact_companyname", $("#contact_companyname").val());  */
		
		$("#linkedinhandle").val(data.contactdetails.linkedinhandle);
		replaceValue("#linkedinhandle", $("#linkedinhandle").val());
		$("#facebookhandle").val(data.contactdetails.facebookhandle);
		replaceValue("#facebookhandle", $("#facebookhandle").val());
		$("#twitterhandle").val(data.contactdetails.twitter_handle);
		replaceValue("#twitterhandle", $("#twitterhandle").val());  
		

		if(data.contactdetails.contactphone != null && data.contactdetails.contactphone != ""){
			
			var contactCountryVal = $("#country").val();
			if(contactCountryVal != null && contactCountryVal != "" && (contactCountryVal == 'US' || contactCountryVal == 'CA')) {
				var directPhoneVal = data.contactdetails.contactphone.directphone;
				if(directPhoneVal != null && directPhoneVal != "") {
					/* var directPhoneUpdated = directPhoneVal.replace(/[^0-9]/g, "");
					if(directPhoneUpdated.length == 10) {
						directPhoneVal = directPhoneUpdated.substring(0, 3) + "-" + directPhoneUpdated.substring(3, 6) + "-" + directPhoneUpdated.substring(6, directPhoneUpdated.length);
					}
					if(directPhoneUpdated.length == 11) {
						directPhoneVal = directPhoneUpdated.substring(1, 4) + "-" + directPhoneUpdated.substring(4, 7) + "-" + directPhoneUpdated.substring(7, directPhoneUpdated.length);
					} */
					$("#directphone").val(directPhoneVal);
				}
				var mobilePhoneVal = data.contactdetails.contactphone.mobilephone;
				if(mobilePhoneVal != null && mobilePhoneVal != "") {
					/* var mobilePhoneUpdated = mobilePhoneVal.replace(/[^0-9]/g, "");
					if(mobilePhoneUpdated.length == 10) {
						mobilePhoneVal = mobilePhoneUpdated.substring(0, 3) + "-" + mobilePhoneUpdated.substring(3, 6) + "-" + mobilePhoneUpdated.substring(6, mobilePhoneUpdated.length);
					}
					if(mobilePhoneUpdated.length == 11) {
						mobilePhoneVal = mobilePhoneUpdated.substring(1, 4) + "-" + mobilePhoneUpdated.substring(4, 7) + "-" + mobilePhoneUpdated.substring(7, mobilePhoneUpdated.length);
					} */
					$("#mobilephone").val(mobilePhoneVal);
				}
			}
			else {
				$("#directphone").val(data.contactdetails.contactphone.directphone); 
				$("#mobilephone").val(data.contactdetails.contactphone.mobilephone);
			}
			
			replaceValue("#directphone", $("#directphone").val());
			
			$("#directphone_ext").val(data.contactdetails.contactphone.directphoneext);
			replaceValue("#directphone_ext", $("#directphone_ext").val());
			
			replaceValue("#mobilephone", $("#mobilephone").val());
			
		    
		    $("#branchphone").val(data.contactdetails.contactphone.branchphone); 
			replaceValue("#branchphone", $("#branchphone").val());
			
			$("#hidden_altphone").val(data.contactdetails.contactphone.altphone); 
			$("#hidden_altphone2").val(data.contactdetails.contactphone.altphone2);
			$("#hidden_altphone3").val(data.contactdetails.contactphone.altphone3);
		}	
		
	    //$("#contact_company_id").val(data.conCompanyID);
	    $("#contact_contact_id").val(data.contactdetails.contactid);
	    
		$("#xinghandle").val(data.contactdetails.xinghandle); 
		replaceValue("#xinghandle", $("#xinghandle").val());
		$("#miscLinkHndleID").val(data.contactdetails.misclink); 
		replaceValue("#miscLinkHndleID", $("#miscLinkHndleID").val());
		
		$("#viadeolinkhandle").val(data.contactdetails.viadeolinkhandle);
		replaceValue("#viadeolinkhandle", $("#viadeolinkhandle").val());
		
		//NL related Fields
		if(data.contactdetails.contactname_nl != null && data.contactdetails.contactname_nl != ""){
			$("#firstnameNl").val(data.contactdetails.contactname_nl.firstname);
			replaceValueForAlwaysCamelCase("#firstnameNl", $("#firstnameNl").val());
			$("#lastnameNl").val(data.contactdetails.contactname_nl.lastname);
			replaceValueForAlwaysCamelCase("#lastnameNl", $("#lastnameNl").val());
			
			 $("#middlenameNl").val(data.contactdetails.contactname_nl.middlename);
			replaceValueForAlwaysCamelCase("#middlenameNl", $("#middlenameNl").val());
			//alert("middle"+data.contactdetails.contactname_nl.middlename);
			var fullNameNlVal = '';
			if($("#firstnameNl").val() != null && $("#firstnameNl").val() != "") {
				fullNameNlVal = $("#firstnameNl").val();
			}
			if($("#lastnameNl").val() != null && $("#lastnameNl").val() != "") {
				fullNameNlVal = fullNameNlVal + " " + $("#lastnameNl").val();
			}
			$("#fullnameNl").val(fullNameNlVal);
			replaceValueForAlwaysCamelCase("#fullnameNl", $("#fullnameNl").val());
		}
		
		if(data.contactdetails.contactaddressnl !=null && data.contactdetails.contactaddressnl !=""){
			$("#streetNl").val(data.contactdetails.contactaddressnl.address1);
			replaceValue("#streetNl", $("#streetNl").val());
			$("#cityNl").val(data.contactdetails.contactaddressnl.city);
			replaceValue("#cityNl", $("#cityNl").val());
			$("#stateNl").val(data.contactdetails.contactaddressnl.state);
			replaceValue("#stateNl", $("#stateNl").val());
		}

		$("#jobtitleNl").val(data.contactdetails.jobtitle_nl);
		replaceValue("#jobtitleNl", $("#jobtitleNl").val());
		
	}
	
	if(data.companydetails != null && data.companydetails != ""){
		$("#company_companyname").val(data.companydetails.companyname);
		replaceValue("#company_companyname", $("#company_companyname").val());
		
		$("#tradingcompanyname").val(data.companydetails.tradingcompanyname);
		replaceValue("#tradingcompanyname", $("#tradingcompanyname").val());
		
		
		if(data.companydetails.companyaddress != null && data.companydetails.companyaddress != ""){
			
			$("#hq_street").val(data.companydetails.companyaddress.address1);
			replaceValue("#hq_street", $("#hq_street").val());
			$("#hq_city").val(data.companydetails.companyaddress.city);
			replaceValue("#hq_city", $("#hq_city").val());
			$("#hq_postalcode").val(data.companydetails.companyaddress.zip);
			replaceValue("#hq_postalcode", $("#hq_postalcode").val());
			$("#hq_state").val(data.companydetails.companyaddress.state);
			replaceValue("#hq_state", $("#hq_state").val());
			$("#hq_country").val(data.companydetails.companyaddress.country);
			replaceValue("#hq_country", $("#hq_country").val());
		}
		
		$("#company_companynameNl").val(data.companydetails.companynamenl);
		replaceValue("#company_companynameNl", $("#company_companynameNl").val());
		
		var countryVal = $("#hq_country").val();
		if(countryVal != null && countryVal != "" && (countryVal == 'US' || countryVal == 'CA')) {
			var hqPhoneVal = data.companydetails.hqphone;
			if(hqPhoneVal != null && hqPhoneVal != "") {
				/* var hqPhoneUpdated = hqPhoneVal.replace(/[^0-9]/g, "");
				if(hqPhoneUpdated.length == 10) {
					hqPhoneVal = hqPhoneUpdated.substring(0, 3) + "-" + hqPhoneUpdated.substring(3, 6) + "-" + hqPhoneUpdated.substring(6, hqPhoneUpdated.length);
				}
				if(hqPhoneUpdated.length == 11) {
					hqPhoneVal = hqPhoneUpdated.substring(1, 4) + "-" + hqPhoneUpdated.substring(4, 7) + "-" + hqPhoneUpdated.substring(7, hqPhoneUpdated.length);
				} */
				$("#hq_phone").val(hqPhoneVal);
			}
		}
		else {
			$("#hq_phone").val(data.companydetails.hqphone);
		}
		replaceValue("#hq_phone", $("#hq_phone").val());

		$("#revenue").val(data.companydetails.revenue);
		replaceValue("#revenue", $("#revenue").val());
		
		
		if(data.companydetails.companyindustry != null && data.companydetails.companyindustry != ""){
			if(data.companydetails.companyindustry.industry != null && data.companydetails.companyindustry.industry != "") {
				industry = data.companydetails.companyindustry.industry;
			}
			else {
				industry = data.companydetails.companyindustry.industrytext;
			}
			$("#industry").val(industry);
			replaceValue("#industry", $("#industry").val());

			var select2IndustryVal = "-----select from list-----";
			var industryTextVal = "";
			var comboValues = $('#industrytext option').map(function() {
				if(data.companydetails.companyindustry.industrytext != null && data.companydetails.companyindustry.industrytext != "" && data.companydetails.companyindustry.industrytext != "null") {
					if($(this).text().toLowerCase().trim()==data.companydetails.companyindustry.industrytext.toLowerCase().trim()) {
						industryTextVal = $(this).text();
						select2IndustryVal = $(this).text();
					}
				}
			}); 
			
			$("#select2-industrytext-container").html(select2IndustryVal);
			$("#select2-industrytext-container").prop("title",select2IndustryVal);
			
			$("#industrytext").val(industryTextVal);
			replaceValue("#industrytext", $("#industrytext").val());
			
			$("#src_industry").val(data.companydetails.companyindustry.srcindustry); 
			replaceValue("#src_industry", $("#src_industry").val());
			
		}
		
		$("#employee").val(data.companydetails.employeetotal);
		replaceValue("#employee", $("#employee").val());
		$("#dunsnumber").val(data.companydetails.dunsnumber);
		replaceValue("#dunsnumber", $("#dunsnumber").val());
		
		$("#hidden_duns_number").val($("#dunsnumber").val());
		
		$("#website").val(data.companydetails.website);
		replaceValue("#website", $("#website").val());
		$("#description").val(data.companydetails.description);
		replaceValue("#description", $("#description").val());
		$("#locationtype").val(data.companydetails.locationtype);
		replaceValue("#locationtype", $("#locationtype").val()); 
		$("#longitude").val(data.companydetails.longitude);
		replaceValue("#longitude", $("#longitude").val()); 
		$("#latitude").val(data.companydetails.latitude);
		replaceValue("#latitude", $("#latitude").val()); 
		$("#region").val(data.companydetails.region);
		replaceValue("#region", $("#region").val()); 
		$("#companytype").val(data.companydetails.companytype);
		replaceValue("#companytype", $("#companytype").val()); 
		$("#fax").val(data.companydetails.fax);
		replaceValue("#fax", $("#fax").val());
		$("#Parent_Duns_No").val(data.companydetails.parentDuns);
		replaceValue("#Parent_Duns_No", $("#Parent_Duns_No").val()); 
		$("#SIC").val(data.companydetails.sic);
		replaceValue("#SIC", $("#SIC").val()); 
		$("#NAICS").val(data.companydetails.naics);
		replaceValue("#NAICS", $("#NAICS").val());
		$("#national_reg_number").val(data.companydetails.nationalregnumber);
		replaceValue("#national_reg_number", $("#national_reg_number").val()); 
		
	    $("#company_company_id").val(data.companydetails.companyid);
		
		$("#complinkedinhandle").val(data.companydetails.hqlinkedinurl); 
		replaceValue("#complinkedinhandle", $("#complinkedinhandle").val());
		$("#src_revenue").val(data.companydetails.srcrevenue); 
		replaceValue("#src_revenue", $("#src_revenue").val());
		$("#src_employeetotal").val(data.companydetails.srcemployeetotal); 
		replaceValue("#src_employeetotal", $("#src_employeetotal").val());
		
		$("#ultimate_duns").val(data.companydetails.ultimateduns); 
		replaceValue("#ultimate_duns", $("#ultimate_duns").val());
		$("#immediate_parent").val(data.companydetails.immediateparent); 
		replaceValue("#immediate_parent", $("#immediate_parent").val());
		
		$("#companynameNl").val(data.companydetails.companynamenl);
		replaceValue("#companynameNl", $("#companynameNl").val());
		
		if(data.companydetails.companyaddressnl !=null && data.companydetails.companyaddressnl !=""){
			$("#hq_streetNl").val(data.companydetails.companyaddressnl.address1);
			replaceValue("#hq_streetNl", $("#hq_streetNl").val());
			$("#hq_cityNl").val(data.companydetails.companyaddressnl.city);
			replaceValue("#hq_cityNl", $("#hq_cityNl").val());
			$("#hq_stateNl").val(data.companydetails.companyaddressnl.state);
			replaceValue("#hq_stateNl", $("#hq_stateNl").val());
		}
	}

	$(".successMsg").hide();
    
    if($("#linkedinhandle").val() != null && $("#linkedinhandle").val() != "") {
    	var linkedinhandle="";
		$("#linkedinHandleId").removeClass("ehandle").attr("disabled", false);
		$("#piplLinkedInHandleId").removeClass("ehandle").attr("disabled", false);
		if(($("#linkedinhandle").val().indexOf('http://') == 0) || $("#linkedinhandle").val().indexOf('https://') == 0) {
			linkedinhandle=$("#linkedinhandle").val();
		}
		else {
			linkedinhandle = "http://"+$("#linkedinhandle").val();
		}
		$("#linkedinHandleId").attr("href",linkedinhandle);
	}
	else {
		 $("#linkedinHandleId").addClass("ehandle").attr("disabled", true);
		 $("#piplLinkedInHandleId").addClass("ehandle").attr("disabled", true);
	}
	if($("#facebookhandle").val() != null && $("#facebookhandle").val() != "") {
		var facebookhandle="";
		$("#facebookHandleId").removeClass("ehandle").attr("disabled", false);
		if(($("#facebookhandle").val().indexOf('http://') == 0) || $("#facebookhandle").val().indexOf('https://') == 0) {
			facebookhandle=$("#facebookhandle").val();
		}
		else {
			facebookhandle = "http://"+$("#facebookhandle").val();
		}
		$("#facebookHandleId").attr("href",facebookhandle);
	}
	else {
		 $("#facebookHandleId").addClass("ehandle").attr("disabled", true);
	}
	if($("#twitterhandle").val() != null && $("#twitterhandle").val() != "") {
		var twitterhandle="";
		$("#twitterhandleId").removeClass("ehandle").attr("disabled", false);
		if(($("#twitterhandle").val().indexOf('http://') == 0) || $("#twitterhandle").val().indexOf('https://') == 0) {
			twitterhandle=$("#twitterhandle").val();
		}
		else {
			twitterhandle = "http://"+$("#twitterhandle").val();
		}
		$("#twitterhandleId").attr("href",twitterhandle);
	}
	else {
		 $("#twitterhandleId").addClass("ehandle").attr("disabled", true);
	}
	
	if($("#xinghandle").val() != null && $("#xinghandle").val() != "") {
		var xinghandle="";
		 $("#xingHandleId").removeClass("ehandle").attr("disabled", false);
		 
		 if(($("#xinghandle").val().indexOf('http://') == 0) || $("#xinghandle").val().indexOf('https://') == 0) {
			 xinghandle=$("#xinghandle").val();
		 }
		 else {
			 xinghandle = "http://"+$("#xinghandle").val();
		 }
		 $("#xingHandleId").attr("href",xinghandle);
	}
	else {
		 $("#xingHandleId").addClass("ehandle").attr("disabled", true);
	}
	
	if($("#miscLinkHndleID").val() != null && $("#miscLinkHndleID").val() != "") {
		var mischandle="";
		 $("#miscLinkId").removeClass("ehandle").attr("disabled", false);
		 
		 if(($("#miscLinkHndleID").val().indexOf('http://') == 0) || $("#miscLinkHndleID").val().indexOf('https://') == 0) {
			 mischandle=$("#miscLinkHndleID").val();
		 }
		 else {
			 mischandle = "http://"+$("#miscLinkHndleID").val();
		 }
		 $("#miscLinkId").attr("href",mischandle);
	}
	else {
		 $("#miscLinkId").addClass("ehandle").attr("disabled", true);
	}
	
	if($("#viadeolinkhandle").val() != null && $("#viadeolinkhandle").val() != "") {
		var viadeolinkhandle="";
		 $("#viadeoLinkHandleId").removeClass("ehandle").attr("disabled", false);
		 
		 if(($("#viadeolinkhandle").val().indexOf('http://') == 0) || $("#viadeolinkhandle").val().indexOf('https://') == 0) {
			 viadeolinkhandle=$("#viadeolinkhandle").val();
		 }
		 else {
			 viadeolinkhandle = "http://"+$("#viadeolinkhandle").val();
		 }
		 $("#viadeoLinkHandleId").attr("href",viadeolinkhandle);
	}
	else {
		 $("#viadeoLinkHandleId").addClass("ehandle").attr("disabled", true);
	}
	
	if($("#complinkedinhandle").val() != null && $("#complinkedinhandle").val() != "") {
		var cmpLinkedinhandle="";
		 $("#clinkedinHandleId").removeClass("ehandle").attr("disabled", false);
		 
		 if(($("#complinkedinhandle").val().indexOf('http://') == 0) || $("#complinkedinhandle").val().indexOf('https://') == 0) {
			 cmpLinkedinhandle=$("#complinkedinhandle").val();
		 }
		 else {
			 cmpLinkedinhandle = "http://"+$("#complinkedinhandle").val();
		 }
		 $("#clinkedinHandleId").attr("href",cmpLinkedinhandle);
	}
	else {
		 $("#clinkedinHandleId").addClass("ehandle").attr("disabled", true);
	}
	
	enableButtons();

	item = {};
	item ["firstname"] = $("#firstname").val();
	item ["lastname"] = $("#lastname").val();
	item ["middlename"] = $("#middlename").val();
	item ["fullname"] = $("#fullname").val();
	item ["private_email"] = $("#private_email").val();
	item ["private_email2"] = $("#private_email2").val();
	item ["private_email3"] = $("#private_email3").val();
	item ["corporate_email"] = $("#corporate_email").val();
	item ["street"] = $("#street").val();
	item ["city"] = $("#city").val();
	item ["postalcode"] = $("#postalcode").val();
	item ["state"] = $("#state").val();
	item ["country"] = $("#country").val();
	item ["jobtitle"] = $("#jobtitle").val();
	item ["jobfunction"] = $("#jobfunction").val();
	item ["senioritylevel"] = $("#senioritylevel").val();
	item ["twitterhandle"] = $("#twitterhandle").val();
	//item ["contact_companyname"] = $("#contact_companyname").val();
	item ["directphone"] = $("#directphone").val();
	item ["mobilephone"] = $("#mobilephone").val();
	item ["directphone_ext"] = $("#directphone_ext").val();
	item ["linkedinhandle"] = $("#linkedinhandle").val();
	item ["facebookhandle"] = $("#facebookhandle").val();
	item ["twitterhandle"] = $("#twitterhandle").val();
	item ["xinghandle"] = $("#xinghandle").val();
	item ["miscLinkHndleID"] = $("#miscLinkHndleID").val();
	item ["viadeolinkhandle"] = $("#viadeolinkhandle").val();
	item ["branchphone"] = $("#branchphone").val();
	item ["leadstatus"] = $("#lead_status").val();
	item ["lastactivity"] = $("#last_activity").val();
	item ["assignAM"] = $("#assign_AM").val();
	item ["assigned_salesrep"] = $("#assigned_salesrep").val();
	item ["contact_region"] = $("#contact_region").val();
	item ["assign_inside_salesrep"] = $("#assign_inside_salesrep").val();
	item ["lead_source"] = $("#lead_source").val();
	
	item ["use_hq_address"] = $("#use_hq_address").prop('checked');
	/* item ["use_hq_phone"] = $("#use_hq_phone").prop('checked'); */
	
    item ["company_companyname"] = $("#company_companyname").val();
    item ["hq_street"] = $("#hq_street").val();
    item ["hq_city"] = $("#hq_city").val();
    item ["hq_postalcode"] = $("#hq_postalcode").val();
    item ["hq_state"] = $("#hq_state").val();
    item ["hq_country"] = $("#hq_country").val();
    item ["hq_phone"] = $("#hq_phone").val();
    item ["revenue"] = $("#revenue").val();
    item ["industry"] = $("#industry").val();
    item ["employee"] = $("#employee").val();
    item ["dunsnumber"] = $("#dunsnumber").val();
    item ["website"] = $("#website").val();
    item ["description"] = $("#description").val();
    item ["complinkedinhandle"] = $("#complinkedinhandle").val();
    item ["src_employeetotal"] = $("#src_employeetotal").val();
    item ["src_revenue"] = $("#src_revenue").val();
    item ["src_industry"] = $("#src_industry").val();
    item ["ultimate_duns"] = $("#ultimate_duns").val();
    item ["immediate_parent"] = $("#immediate_parent").val();
    item ["national_reg_number"] = $("#national_reg_number").val();
    item ["fax"] = $("#fax").val();
    item ["tradingcompanyname"] = $("#tradingcompanyname").val();
    item ["industrytext"] = $("#industrytext").val();
    
    
    item ["firstnameNl"] = $("#firstnameNl").val();
    item ["lastnameNl"] = $("#lastnameNl").val();
    item ["fullnameNl"] = $("#fullnameNl").val();
    item ["streetNl"] = $("#streetNl").val();
    item ["cityNl"] = $("#cityNl").val();
    item ["stateNl"] = $("#stateNl").val();
    item ["jobtitleNl"] = $("#jobtitleNl").val();
    item ["company_companynameNl"] = $("#company_companynameNl").val();
    item ["hq_streetNl"] = $("#hq_streetNl").val();
    item ["hq_cityNl"] = $("#hq_cityNl").val();
    item ["hq_stateNl"] = $("#hq_stateNl").val();
    
    arr.push(item);
    
    if($("#country").val() != null && $("#country").val()!=""){
    	countryStateLengthChk($("#country").val(),"#countryMsg","Country");
    }
    if($("#hq_country").val() != null && $("#hq_country").val()!=""){
    	countryStateLengthChk($("#hq_country").val(),"#hqCountryMsg","Company Country");
    }
    if($("#country").val() != null && $("#country").val() != "" && $("#state").val() != null && $("#state").val() != "") {
    	stateCodeFormat($("#country").val(),$("#state").val(),"#state","#StateMsg");
	}
    if($("#hq_country").val() != null && $("#hq_country").val() != "" && $("#hq_state").val() != null && $("#hq_state").val() != "") {
    	stateCodeFormat($("#hq_country").val(),$("#hq_state").val(),"#hq_state","#hqStateMsg");
	}
    
    var privateEmail = $("#private_email").val();
	if(privateEmail != null && privateEmail != "" && privateEmail!="NULL" && privateEmail!=" ") {
		if (!IsValidEmail(privateEmail)) {
	   	  	$('#privateEmailMsg').show().html('* Please enter a valid private email address.');
	   		return false;
	   	}
		else {
			$("#piplPemailHandleId").removeClass("ehandle").attr("disabled", false);
			$('#privateEmailMsg').hide();
		}
	}else{
		$("#piplPemailHandleId").addClass("ehandle").attr("disabled", true);
		$('#privateEmailMsg').hide();
	}
	
	privateEmail2 = $("#private_email2").val();
	if(privateEmail2 != null && privateEmail2 != "" && privateEmail2!="NULL" && privateEmail2!=" ") {
		if (!IsValidEmail(privateEmail)) {
	   	  	$('#privateEmai21Msg').show().html('* Please enter a valid private email 2 address.');
	   		return false;
	   	}
		else {
			$("#piplP2emailHandleId").removeClass("ehandle").attr("disabled", false);
			$('#privateEmail2Msg').hide();
		}
	}else{
		$("#piplP2emailHandleId").addClass("ehandle").attr("disabled", true);
		$('#privateEmail2Msg').hide();
	}
	
	var privateEmail3 = $("#private_email3").val();
	if(privateEmail3 != null && privateEmail3 != "" && privateEmail3!="NULL" && privateEmail3!=" ") {
		if (!IsValidEmail(privateEmail3)) {
	   	  	$('#privateEmail3Msg').show().html('* Please enter a valid private email 3 address.');
	   		return false;
	   	}
		else {
			$("#piplP3emailHandleId").removeClass("ehandle").attr("disabled", false);
			$('#privateEmail3Msg').hide();
		}
	}else{
		$("#piplP3emailHandleId").addClass("ehandle").attr("disabled", true);
		$('#privateEmail3Msg').hide();
	}
	
	var corporateEmail = $("#corporate_email").val();
	if(corporateEmail != null && corporateEmail != "" && corporateEmail!="NULL" && corporateEmail!=" ") {
		if (!IsValidEmail(corporateEmail)) {
	   	  	$('#corporateEmailMsg').show().html('* Please enter a valid corporate email address.');
	   		return false;
	   	}
		else {
			$("#piplCemailHandleId").removeClass("ehandle").attr("disabled", false);
			$('#corporateEmailMsg').hide();
		}
	}else{
		$("#piplCemailHandleId").addClass("ehandle").attr("disabled", true);
		$('#corporateEmailMsg').hide();
	}
	disableEnableMapButton();
}


function guessEmail(){
	//alert("guess email");
	if($('#corporate_email').val()!=null && $('#corporate_email').val().trim()!=''){
		$("#errorMsg").html("* corporate email is already available. Kindly remove it to use email guess feature.").show();
		setTimeout(function(){$('#errorMsg').html("");},5000);
		return;
	}
	
	website=$("#website").val();
	
	if((website.indexOf('.')==-1 || website=='.' || website.indexOf('..')>-1)){
		$("#errorMsg").html("* kindly provide valid website.").show();
		setTimeout(function(){$('#errorMsg').html("");},3000);
		return ;
	}
	
	if(( (website.startsWith('http://www.')==false) && (website.startsWith('https://www.')==false) && (website.startsWith('https://')==false) && (website.startsWith('http://')==false) 
		&& (website.startsWith('www.')==false) && (website.startsWith('www1.')==false)&& (website.startsWith('www2.')==false) && (website.startsWith('www3.')==false))){
			$("#errorMsg").html("* kindly provide valid website.").show();
			setTimeout(function(){$('#errorMsg').html("");},3000);
			return ;
	}
	
	var urlR = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
    website.match(urlR)
    
    if(website.match(urlR)==null){
    	$("#errorMsg").html("* kindly provide valid website.").show();
		setTimeout(function(){$('#errorMsg').html("");},3000);
		return ;
    }
	if($("#firstname").val().trim()==''){
		$("#errorMsg").html("* kindly provide first name.").show();
		setTimeout(function(){$('#errorMsg').html("");},3000);
		return;
	}
	if($("#lastname").val().trim()==''){
		$("#errorMsg").html("* kindly provide last name.").show();
		setTimeout(function(){$('#errorMsg').html("");},3000);
		return;
	}
	if($("#lastname").val().trim().indexOf(' ')>-1){
		$("#errorMsg").html("* last name can't have more than one word. kindly use one word.").show();
		setTimeout(function(){$('#errorMsg').html("");},3000);
		return;
	}

	$("#processor").show();
	
	var serviceData=JSON.stringify({"firstname":$("#firstname").val(),"lastname":$("#lastname").val(),"website":$("#website").val(),"duns_number":$("#dunsnumber").val(),"company_id":$("#contact_company_id").val(),"clientName":"MSOR","productName":"MSOR","defaultEmailNeeded": "Y"});
	$.ajax({
		url: 'guessEmail.do?data='+encodeURIComponent(serviceData),
		success: function(data, textStatus, xhr)
		{
			jsonObj=JSON.parse(data);
			email=jsonObj.email;
			if(email==null){
				idname=$("#firstname").val().substring(0,1)+$("#lastname").val();
				$('#corporate_email').val(idname+'@'+domain);
			}
			else{
				$('#corporate_email').val(email);
			}
			$("#processor").hide();
			$("#corporateEmailMsg").hide();
			$("#piplCemailHandleId").removeClass("ehandle").attr("disabled", false);
		},
		error: function(xhr, textStatus, errorThrow)
		{
			$("#errorMsg").html("* error occurred while updating record, kindly check with development team.").show();
			setTimeout(function(){$('#errorMsg').html("");},validationMessageTimeout);
		}
	}) 
}

function updatePIPLDataToEmpDetail(){
	setRowValueToEmpDetails("ppltable", "pplTblFirstName", "firstname");
	setRowValueToEmpDetails("ppltable", "pplTblLastName", "lastname");
	setRowValueToEmpDetails("ppltable", "pplTblCemail", "corporate_email");
	setRowValueToEmpDetails("ppltable", "pplTblPemail", "private_email");
	setRowValueToEmpDetails("ppltable", "pplTblP1email", "private_email2");
	setRowValueToEmpDetails("ppltable", "pplTblP2email", "private_email3");
	setRowValueToEmpDetails("ppltable", "pplTblJobTitle", "jobtitle");
	//setRowValueToEmpDetails("ppltable", "pplTblCmpName", "contact_companyname");
	setRowValueToEmpDetails("ppltable", "pplTblDphone", "directphone");
	setRowValueToEmpDetails("ppltable", "pplTblMphone", "mobilephone");
	setRowValueToEmpDetails("ppltable", "pplTblAdd1", "street");
	setRowValueToEmpDetails("ppltable", "pplTblCity", "city");
	setRowValueToEmpDetails("ppltable", "pplTblState", "state");
	setRowValueToEmpDetails("ppltable", "pplTblPCode", "postalcode");
	setRowValueToEmpDetails("ppltable", "pplTblCntry", "country");
	setRowValueToEmpDetails("ppltable", "pplTblLinkedIn", "linkedinhandle");
	setRowValueToEmpDetails("ppltable", "pplTblFacebook", "facebookhandle");
	setRowValueToEmpDetails("ppltable", "pplTblTwitter", "twitterhandle");
	setRowValueToEmpDetails("ppltable", "pplTblMisc", "miscLinkHndleID");
	
	if($('#ppltable tbody tr#pplTblFirstName').find('td:eq(3) input').is(':checked') && $('#ppltable tbody tr#pplTblLastName').find('td:eq(3) input').is(':checked')){
		$('#fullname').val($('#ppltable tbody tr#pplTblFirstName').find('td:eq(2)').text()+" "+$('#ppltable tbody tr#pplTblLastName').find('td:eq(2)').text());
	}
	if($("#private_email").val() != null && $("#private_email").val() != "") {
			$("#piplPemailHandleId").removeClass("ehandle").attr("disabled", false);
	}
	if($("#private_email2").val() != null && $("#private_email2").val() != "") {
		$("#piplP2emailHandleId").removeClass("ehandle").attr("disabled", false);
	}
	if($("#private_email3").val() != null && $("#private_email3").val() != "") {
		$("#piplP3emailHandleId").removeClass("ehandle").attr("disabled", false);
	}
	
	if($("#linkedinhandle").val() != null && $("#linkedinhandle").val() != "") {
		 $("#linkedinHandleId").removeClass("ehandle").attr("disabled", false);
		 $("#piplLinkedInHandleId").removeClass("ehandle").attr("disabled", false);
		 
		 if(($("#linkedinhandle").val().indexOf('http://') == 0) || $("#linkedinhandle").val().indexOf('https://') == 0) {
		 	linkedinhandle=$("#linkedinhandle").val();
		 }
		 else {
		 	linkedinhandle = "http://"+$("#linkedinhandle").val();
		 }
		 $("#linkedinHandleId").attr("href",linkedinhandle);
	}
	else {
		 $("#linkedinHandleId").addClass("ehandle").attr("disabled", true);
		 $("#piplLinkedInHandleId").addClass("ehandle").attr("disabled", true);
	}
	if($("#facebookhandle").val() != null && $("#facebookhandle").val() != "") {
		 $("#facebookHandleId").removeClass("ehandle").attr("disabled", false);
		 
		 if(($("#facebookhandle").val().indexOf('http://') == 0) || $("#facebookhandle").val().indexOf('https://') == 0) {
			facebookhandle=$("#facebookhandle").val();
		 }
		 else {
			facebookhandle = "http://"+$("#facebookhandle").val();
		 }
		 $("#facebookHandleId").attr("href",facebookhandle);
	}
	else {
		 $("#facebookHandleId").addClass("ehandle").attr("disabled", true);
	}
	if($("#twitterhandle").val() != null && $("#twitterhandle").val() != "") {
		 $("#twitterhandleId").removeClass("ehandle").attr("disabled", false);
		 
		 if(($("#twitterhandle").val().indexOf('http://') == 0) || $("#twitterhandle").val().indexOf('https://') == 0) {
		 	twitterhandle=$("#twitterhandle").val();
		 }
		 else {
			twitterhandle = "http://"+$("#twitterhandle").val();
		 }
		 $("#twitterhandleId").attr("href",twitterhandle);
	}
	else {
		 $("#twitterhandleId").addClass("ehandle").attr("disabled", true);
	}
	if($("#xinghandle").val() != null && $("#xinghandle").val() != "") {
		var xinghandle="";
		 $("#xingHandleId").removeClass("ehandle").attr("disabled", false);
		 
		 if(($("#xinghandle").val().indexOf('http://') == 0) || $("#xinghandle").val().indexOf('https://') == 0) {
			 xinghandle=$("#xinghandle").val();
		 }
		 else {
			 xinghandle = "http://"+$("#xinghandle").val();
		 }
		 $("#xingHandleId").attr("href",xinghandle);
	}
	else {
		 $("#xingHandleId").addClass("ehandle").attr("disabled", true);
	}
	
	if($("#miscLinkHndleID").val() != null && $("#miscLinkHndleID").val() != "") {
		var mischandle="";
		 $("#miscLinkId").removeClass("ehandle").attr("disabled", false);
		 
		 if(($("#miscLinkHndleID").val().indexOf('http://') == 0) || $("#miscLinkHndleID").val().indexOf('https://') == 0) {
			 mischandle=$("#miscLinkHndleID").val();
		 }
		 else {
			 mischandle = "http://"+$("#miscLinkHndleID").val();
		 }
		 $("#miscLinkId").attr("href",mischandle);
	}
	else {
		 $("#miscLinkId").addClass("ehandle").attr("disabled", true);
	}
	
	if($("#viadeolinkhandle").val() != null && $("#viadeolinkhandle").val() != "") {
		var viadeolinkhandle="";
		 $("#viadeoLinkHandleId").removeClass("ehandle").attr("disabled", false);
		 
		 if(($("#viadeolinkhandle").val().indexOf('http://') == 0) || $("#viadeolinkhandle").val().indexOf('https://') == 0) {
			 viadeolinkhandle=$("#viadeolinkhandle").val();
		 }
		 else {
			 viadeolinkhandle = "http://"+$("#viadeolinkhandle").val();
		 }
		 $("#viadeoLinkHandleId").attr("href",viadeolinkhandle);
	}
	else {
		 $("#viadeoLinkHandleId").addClass("ehandle").attr("disabled", true);
	}
	disableEnableMapButton();
}

function fetchPPLData(arrPIPL){
	queryString = "?pplPayloadRequest="+encodeURIComponent(JSON.stringify(arrPIPL));
	finalURL= 'fetchPPLSearchdata.do'+queryString;
	
	$("#pplMsg").show();
	$.ajax({
		url:finalURL,
		success: function(data, textStatus, xhr)
		{
			$("#pplMsg").hide();
			if(data != null && data != ''){
				//alert(data);
				data=JSON.parse(data);
				if(data.matched_flag == 'MATCHED'){
					
					selectDiselectAllCkeckBox(false);
					$("#pplSelectAllChkbox").prop('checked',false);
					SetEmpData();
					SetPPLData(data);
				}else{
					//$("#pplMsg").hide();
					SetEmpData();
					SetPPLDataBlank();
					selectDiselectAllCkeckBox(false);
					$("#pplSelectAllChkbox").prop('checked',false);
					$("#errorMsg").html("* No matched data found from Social Search").show();
					setTimeout(function(){$('#errorMsg').html("");},5000);
				}
			}else{
				SetEmpData();
				SetPPLDataBlank();
				selectDiselectAllCkeckBox(false);
				$("#pplSelectAllChkbox").prop('checked',false);
				//$("#pplMsg").hide();
			}	
		},
		error: function(xhr, textStatus, errorThrow)
		{
			SetEmpData();
			$("#pplMsg").hide();
			$("#errorMsg").html("* exception occurred while fetching data from Social service, kindly check with development team.").show();
			setTimeout(function(){$('#errorMsg').html("");},validationMessageTimeout);
		}
	}) 
}

function SetPPLData(jsonObj){
	//alert("SetPPLData");
	setRowValue("ppltable","pplTblFirstName",2,jsonObj.names.firstname);
	setRowValue("ppltable","pplTblLastName",2,jsonObj.names.lastname);
	if(jsonObj.emails.corporate_email!=undefined){
		setRowValue("ppltable","pplTblCemail",2,jsonObj.emails.corporate_email.address);
	}
	if(jsonObj.emails.private_email!=undefined){
		setRowValue("ppltable","pplTblPemail",2,jsonObj.emails.private_email.address);
	}
	if(jsonObj.emails.email!=undefined){
		if(jsonObj.emails.email[0]!=undefined){
			setRowValue("ppltable","pplTblP1email",2,jsonObj.emails.email[0].address);
		}
	}
	if(jsonObj.emails.email!=undefined){
		if(jsonObj.emails.email[1]!=undefined){
			setRowValue("ppltable","pplTblP2email",2,jsonObj.emails.email[1].address);
		}
	}	
	if(jsonObj.jobs!=undefined){
		if(jsonObj.jobs[0]!=undefined){
			setRowValue("ppltable","pplTblJobTitle",2,jsonObj.jobs[0].title);
		}
	}
	if(jsonObj.latestjobs!=undefined){
		setRowValue("ppltable","pplTblCmpName",2,jsonObj.latestjobs.organization);
	}
	
	if(jsonObj.phones!=undefined){
		if(jsonObj.phones.work_phone!=undefined){
			setRowValue("ppltable","pplTblDphone",2,jsonObj.phones.work_phone.number);
		}
		if(jsonObj.phones.mobile!=undefined){
			setRowValue("ppltable","pplTblMphone",2,jsonObj.phones.mobile.number);
		}
		if(jsonObj.phones.altphone!=undefined){
			$("#hidden_altphone").val(jsonObj.phones.altphone.number);
		}
		if(jsonObj.phones.altphone2!=undefined){
			$("#hidden_altphone2").val(jsonObj.phones.altphone2.number);
		}
		if(jsonObj.phones.altphone3!=undefined){
			$("#hidden_altphone3").val(jsonObj.phones.altphone3.number);
		}
	}
	if(jsonObj.addresses.home_address!=undefined){
		setRowValue("ppltable","pplTblAdd1",2,jsonObj.addresses.home_address.street);
		setRowValue("ppltable","pplTblCity",2,jsonObj.addresses.home_address.city);
		setRowValue("ppltable","pplTblState",2,jsonObj.addresses.home_address.state);
		setRowValue("ppltable","pplTblPCode",2,jsonObj.addresses.home_address.zip_code);
		setRowValue("ppltable","pplTblCntry",2,jsonObj.addresses.home_address.country);
	}
	if(jsonObj.linkedinhandle!=undefined){
		setRowValue("ppltable","pplTblLinkedIn",2,jsonObj.linkedinhandle);
	}
	if(jsonObj.facebookhandle!=undefined){
		setRowValue("ppltable","pplTblFacebook",2,jsonObj.facebookhandle);
	}
	if(jsonObj.twitterhandle!=undefined){
		setRowValue("ppltable","pplTblTwitter",2,jsonObj.twitterhandle);
	}
}

function setRowValue(tableId, rowId, colNum, newValue)
{
    $('#'+tableId).find('tr#'+rowId).find('td:eq("'+colNum+'")').html(newValue);
}

function SetEmpData(){
	//alert($("#company_companyname").val())
	setRowValue("ppltable","pplTblFirstName",1,$("#firstname").val());
	setRowValue("ppltable","pplTblLastName",1,$("#lastname").val());
	setRowValue("ppltable","pplTblCemail",1,$("#corporate_email").val());
	setRowValue("ppltable","pplTblPemail",1,$("#private_email").val());
	setRowValue("ppltable","pplTblP1email",1,$("#private_email2").val());
	setRowValue("ppltable","pplTblP2email",1,$("#private_email3").val());
	setRowValue("ppltable","pplTblJobTitle",1,$("#jobtitle").val());
	//setRowValue("ppltable","pplTblCmpName",1,$("#contact_companyname").val());
	setRowValue("ppltable","pplTblDphone",1,$("#directphone").val());
	setRowValue("ppltable","pplTblMphone",1,$("#mobilephone").val());
	setRowValue("ppltable","pplTblAdd1",1,$("#street").val());
	setRowValue("ppltable","pplTblCity",1,$("#city").val());
	setRowValue("ppltable","pplTblState",1,$("#state").val());
	setRowValue("ppltable","pplTblPCode",1,$("#postalcode").val());
	setRowValue("ppltable","pplTblCntry",1,$("#country").val());
	setRowValue("ppltable","pplTblLinkedIn",1,$("#linkedinhandle").val());
	setRowValue("ppltable","pplTblFacebook",1,$("#facebookhandle").val());
	setRowValue("ppltable","pplTblTwitter",1,$("#twitterhandle").val());
	setRowValue("ppltable","pplTblMisc",1,$("#miscLinkHndleID").val());
}

function SetPPLDataBlank(){
	setRowValue("ppltable","pplTblFirstName",2,"");
	setRowValue("ppltable","pplTblLastName",2,"");
	setRowValue("ppltable","pplTblCemail",2,"");
	setRowValue("ppltable","pplTblPemail",2,"");
	setRowValue("ppltable","pplTblP1email",2,"");
	setRowValue("ppltable","pplTblP2email",2,"");
	setRowValue("ppltable","pplTblJobTitle",2,"");
	setRowValue("ppltable","pplTblCmpName",2,"");
	setRowValue("ppltable","pplTblDphone",2,"");
	setRowValue("ppltable","pplTblMphone",2,"");
	setRowValue("ppltable","pplTblAdd1",2,"");
	setRowValue("ppltable","pplTblCity",2,"");
	setRowValue("ppltable","pplTblState",2,"");
	setRowValue("ppltable","pplTblPCode",2,"");
	setRowValue("ppltable","pplTblCntry",2,"");
	setRowValue("ppltable","pplTblLinkedIn",2,"");
	setRowValue("ppltable","pplTblFacebook",2,"");
	setRowValue("ppltable","pplTblTwitter",2,"");
}

function selectDiselectAllCkeckBox(isChk){
	//alert(isChk);
	if(isChk){
		$('#piplfnameChk').prop('checked', true);
		$('#pipllnameChk').prop('checked', true);
		$('#piplcorpemailChk').prop('checked', true);
		$('#piplprivemailChk').prop('checked', true);
		$('#piplprivemail1Chk').prop('checked', true);
		$('#piplprivemail2Chk').prop('checked', true);
		$('#pipljobtitleChk').prop('checked', true);
		$('#piplcompnameChk').prop('checked', true);
		$('#pipldphoneChk').prop('checked', true);
		$('#piplmphoneChk').prop('checked', true);
		$('#pipladd1Chk').prop('checked', true);
		$('#piplcityChk').prop('checked', true);
		$('#piplstateChk').prop('checked', true);
		$('#piplpcodeChk').prop('checked', true);
		$('#piplcountryChk').prop('checked', true);
		$('#pipllinkedChk').prop('checked', true);
		$('#piplfacebookChk').prop('checked', true);
		$('#pipltwitterChk').prop('checked', true);
		$('#piplmiscChk').prop('checked', true);
	}else{
		$('#piplfnameChk').prop('checked', false);
		$('#pipllnameChk').prop('checked', false);
		$('#piplcorpemailChk').prop('checked', false);
		$('#piplprivemailChk').prop('checked', false);
		$('#piplprivemail1Chk').prop('checked', false);
		$('#piplprivemail2Chk').prop('checked', false);
		$('#pipljobtitleChk').prop('checked', false);
		$('#piplcompnameChk').prop('checked', false);
		$('#pipldphoneChk').prop('checked', false);
		$('#piplmphoneChk').prop('checked', false);
		$('#pipladd1Chk').prop('checked', false);
		$('#piplcityChk').prop('checked', false);
		$('#piplstateChk').prop('checked', false);
		$('#piplpcodeChk').prop('checked', false);
		$('#piplcountryChk').prop('checked', false);
		$('#pipllinkedChk').prop('checked', false);
		$('#piplfacebookChk').prop('checked', false);
		$('#pipltwitterChk').prop('checked', false);
		$('#piplmiscChk').prop('checked', false);
	}
}



function openWebsite() {
	if($("#website").val() != null && $("#website").val() != "") {
		var website = '';
		
		if(!isValidUrl($("#website").val())) {
			$('#website-error').hide();
			$("#websiteMsg").html("* Please enter a valid website.").show();
			setTimeout(function(){$('#websiteMsg').html("");},3000);
			return false;
		}
		else {
			if(($("#website").val().indexOf('http://') == 0) || $("#website").val().indexOf('https://') == 0) {
				website=$("#website").val();
			}
			else {
				website = "http://"+$("#website").val();
			}
			var win=window.open(website, '_blank');
			win.focus();
		}
	}
} 


function resetContactDetails() {
	
	if(arr != null && arr != '' && arr != '[]') {
		$.each(arr, function (index, value) {
			$("#branchphone").val(value.branchphone);
			$("#firstname").val(value.firstname);
			$("#middlename").val(value.middlename);
			$("#lastname").val(value.lastname);
			$("#fullname").val(value.fullname);
			$("#corporate_email").val(value.corporate_email);
			$("#jobfunction").val(value.jobfunction);
			$("#jobtitle").val(value.jobtitle);
			$("#senioritylevel").val(value.senioritylevel);
			$("#mobilephone").val(value.mobilephone);
			$("#directphone").val(value.directphone);
			$("#directphone_ext").val(value.directphone_ext);
			$("#street").val(value.street);
			$("#city").val(value.city);
			$("#state").val(value.state);
			$("#country").val(value.country);
			$("#postalcode").val(value.postalcode);
			//$("#contact_companyname").val(value.contact_companyname);
			$("#private_email").val(value.private_email);
			$("#private_email2").val(value.private_email2);
			$("#private_email3").val(value.private_email3);
			$("#linkedinhandle").val(value.linkedinhandle);
			$("#facebookhandle").val(value.facebookhandle);
			$("#twitterhandle").val(value.twitterhandle);
			$("#xinghandle").val(value.xinghandle);
			$("#miscLinkHndleID").val(value.miscLinkHndleID);
			$("#viadeolinkhandle").val(value.viadeolinkhandle);
			$("#lead_status").val(value.leadstatus);
			$("#last_activity").val(value.lastactivity);
			$("#assign_AM").val(value.assignAM);
			$("#assigned_salesrep").val(value.assigned_salesrep);
			$("#assign_inside_salesrep").val(value.assign_inside_salesrep);
			$("#contact_region").val(value.contact_region);
			$("#lead_source").val(value.lead_source);
			
			$("#firstnameNl").val(value.firstnameNl);
			$("#middlenameNl").val(value.middlenameNl);
			$("#lastnameNl").val(value.lastnameNl);
			$("#fullnameNl").val(value.fullnameNl);
			$("#streetNl").val(value.streetNl);
			$("#cityNl").val(value.cityNl);
			$("#stateNl").val(value.stateNl);
			$("#jobtitleNl").val(value.jobtitleNl);
			
			$("#use_hq_address").prop('checked', value.use_hq_address);
			/* $("#use_hq_phone").prop('checked', value.use_hq_phone); */
			
			if($("#country").val() != null && $("#country").val()!=""){
				countryStateLengthChk($("#country").val(),"#countryMsg","Country");
			}
			    
		    if($("#country").val() != null && $("#country").val() != "" && $("#state").val() != null && $("#state").val() != "") {
		    	stateCodeFormat($("#country").val(),$("#state").val(),"#state","#StateMsg");
			}
		}); 
		$("#country, #firstname, #lastname, #jobtitle").removeClass("error");
		$("#privateEmailMsg, #privateEmail2Msg, #privateEmail3Msg, #corporateEmailMsg, #mobilePhoneMsg, #directPhoneMsg, #branchPhoneMsg, #directPhoneExtMsg, #facebookHandleMsg, #linkedinHandleMsg, #twitterHandleMsg, #xinghandleMsg, #miscLinkHndleIDMsg, #viadeoLinkHandleIdMsg, #country-error, #firstname-error, #lastname-error, #jobtitle-error, #corporate_email-error, #lead_status-error, #last_activity-error, #contact_region-error").hide();
		
		if($("#linkedinhandle").val() != null && $("#linkedinhandle").val() != "") {
			 $("#linkedinHandleId").removeClass("ehandle").attr("disabled", false);
			 $("#piplLinkedInHandleId").removeClass("ehandle").attr("disabled", false);
			 
			 if(($("#linkedinhandle").val().indexOf('http://') == 0) || $("#linkedinhandle").val().indexOf('https://') == 0) {
			 	linkedinhandle=$("#linkedinhandle").val();
			 }
			 else {
			 	linkedinhandle = "http://"+$("#linkedinhandle").val();
			 }
			 $("#linkedinHandleId").attr("href",linkedinhandle);
		}
		else {
			 $("#linkedinHandleId").addClass("ehandle").attr("disabled", true);
			 $("#piplLinkedInHandleId").addClass("ehandle").attr("disabled", true);
		}
		
		if($("#facebookhandle").val() != null && $("#facebookhandle").val() != "") {
			 $("#facebookHandleId").removeClass("ehandle").attr("disabled", false);
			 
			 if(($("#facebookhandle").val().indexOf('http://') == 0) || $("#facebookhandle").val().indexOf('https://') == 0) {
				facebookhandle=$("#facebookhandle").val();
			 }
			 else {
				facebookhandle = "http://"+$("#facebookhandle").val();
			 }
			 $("#facebookHandleId").attr("href",facebookhandle);
		}
		else {
			 $("#facebookHandleId").addClass("ehandle").attr("disabled", true);
		}
		if($("#twitterhandle").val() != null && $("#twitterhandle").val() != "") {
			 $("#twitterhandleId").removeClass("ehandle").attr("disabled", false);
			 
			 if(($("#twitterhandle").val().indexOf('http://') == 0) || $("#twitterhandle").val().indexOf('https://') == 0) {
			 	twitterhandle=$("#twitterhandle").val();
			 }
			 else {
				twitterhandle = "http://"+$("#twitterhandle").val();
			 }
			 $("#twitterhandleId").attr("href",twitterhandle);
		}
		else {
			 $("#twitterhandleId").addClass("ehandle").attr("disabled", true);
		}
		
		if($("#xinghandle").val() != null && $("#xinghandle").val() != "") {
			var xinghandle="";
			 $("#xingHandleId").removeClass("ehandle").attr("disabled", false);
			 
			 if(($("#xinghandle").val().indexOf('http://') == 0) || $("#xinghandle").val().indexOf('https://') == 0) {
				 xinghandle=$("#xinghandle").val();
			 }
			 else {
				 xinghandle = "http://"+$("#xinghandle").val();
			 }
			 $("#xingHandleId").attr("href",xinghandle);
		}
		else {
			 $("#xingHandleId").addClass("ehandle").attr("disabled", true);
		}
		
		if($("#miscLinkHndleID").val() != null && $("#miscLinkHndleID").val() != "") {
			var mischandle="";
			 $("#miscLinkId").removeClass("ehandle").attr("disabled", false);
			 
			 if(($("#miscLinkHndleID").val().indexOf('http://') == 0) || $("#miscLinkHndleID").val().indexOf('https://') == 0) {
				 mischandle=$("#miscLinkHndleID").val();
			 }
			 else {
				 mischandle = "http://"+$("#miscLinkHndleID").val();
			 }
			 $("#miscLinkId").attr("href",mischandle);
		}
		else {
			 $("#miscLinkId").addClass("ehandle").attr("disabled", true);
		}
		
		if($("#viadeolinkhandle").val() != null && $("#viadeolinkhandle").val() != "") {
			var viadeolinkhandle="";
			 $("#viadeoLinkHandleId").removeClass("ehandle").attr("disabled", false);
			 if(($("#viadeolinkhandle").val().indexOf('http://') == 0) || $("#viadeolinkhandle").val().indexOf('https://') == 0) {
				 viadeolinkhandle=$("#viadeolinkhandle").val();
			 }
			 else {
				 viadeolinkhandle = "http://"+$("#viadeolinkhandle").val();
			 }
			 $("#viadeoLinkHandleId").attr("href",viadeolinkhandle);
		}
		else {
			 $("#viadeoLinkHandleId").addClass("ehandle").attr("disabled", true);
		}
		
		var privateEmail = $("#private_email").val();
		if(privateEmail != null && privateEmail != "" && privateEmail!="NULL" && privateEmail!=" ") {
			if (!IsValidEmail(privateEmail)) {
		   	  	$('#privateEmailMsg').show().html('* Please enter a valid private email address.');
		   		return false;
		   	}
			else {
				$("#piplPemailHandleId").removeClass("ehandle").attr("disabled", false);
				$('#privateEmailMsg').hide();
			}
		}else{
			$("#pemailpiplHandleId").addClass("ehandle").attr("disabled", true);
			$('#privateEmailMsg').hide();
		}
		
		privateEmail = $("#private_email2").val();
		if(privateEmail != null && privateEmail != "" && privateEmail!="NULL" && privateEmail!=" ") {
			if (!IsValidEmail(privateEmail)) {
		   	  	$('#privateEmail2Msg').show().html('* Please enter a valid private email 2 address.');
		   		return false;
		   	}
			else {
				$("#piplP2emailHandleId").removeClass("ehandle").attr("disabled", false);
				$('#privateEmail2Msg').hide();
			}
		}else{
			$("#piplP2emailHandleId").addClass("ehandle").attr("disabled", true);
			$('#privateEmail2Msg').hide();
		}
		
		privateEmail = $("#private_email3").val();
		if(privateEmail != null && privateEmail != "" && privateEmail!="NULL" && privateEmail!=" ") {
			if (!IsValidEmail(privateEmail)) {
		   	  	$('#privateEmail3Msg').show().html('* Please enter a valid private email 3 address.');
		   		return false;
		   	}
			else {
				$("#piplP3emailHandleId").removeClass("ehandle").attr("disabled", false);
				$('#privateEmail3Msg').hide();
			}
		}else{
			$("#piplP3emailHandleId").addClass("ehandle").attr("disabled", true);
			$('#privateEmail3Msg').hide();
		}
		
		privateEmail = $("#corporate_email").val();
		if(privateEmail != null && privateEmail != "" && privateEmail!="NULL" && privateEmail!=" ") {
			if (!IsValidEmail(privateEmail)) {
		   	  	$('#corporateEmailMsg').show().html('* Please enter a valid corporate email address.');
		   		return false;
		   	}
			else {
				$("#piplCemailHandleId").removeClass("ehandle").attr("disabled", false);
				$('#corporateEmailMsg').hide();
			}
		}else{
			$("#piplCemailHandleId").addClass("ehandle").attr("disabled", true);
			$('#corporateEmailMsg').hide();
		}
		
	}
	else {
		$("#branchphone").val("");
		$("#firstname").val("");
		$("#middlename").val("");
		$("#lastname").val("");
		$("#fullname").val("");
		$("#corporate_email").val("");
		$("#jobfunction").val("");
		$("#jobtitle").val("");
		$("#senioritylevel").val("");
		$("#mobilephone").val("");
		$("#directphone").val("");
		$("#directphone_ext").val("");
		$("#street").val("");
		$("#city").val("");
		$("#state").val("");
		$("#country").val("");
		$("#postalcode").val("");
		//$("#contact_companyname").val("");
		$("#private_email").val("");
		$("#private_email2").val("");
		$("#private_email3").val("");
		$("#linkedinhandle").val("");
		$("#facebookhandle").val("");
		$("#twitterhandle").val("");
		$("#xinghandle").val("");
		$("#miscLinkHndleID").val("");
		$("#viadeolinkhandle").val("");
		$("#lead_status").val("");
		$("#last_activity").val("");
		$("#assign_AM").val("");
		$("#assigned_salesrep").val("");
		$("#assign_inside_salesrep").val("");
		$("#contact_region").val("");
		$("#lead_source").val("");
		
		$("#firstnameNl").val("");
		$("#lastnameNl").val("");
		$("#fullnameNl").val("");
		$("#streetNl").val("");
		$("#cityNl").val("");
		$("#stateNl").val("");
		$("#jobtitleNl").val("");
		$("#middlenameNl").val("");
		
		$("#country, #firstname, #lastname, #jobtitle").removeClass("error");
		$("#lead_status-error, #last_activity-error, #privateEmailMsg, #privateEmail2Msg, #privateEmail3Msg, #corporateEmailMsg, #mobilePhoneMsg, #directPhoneMsg, #branchPhoneMsg, #directPhoneExtMsg, #facebookHandleMsg, #linkedinHandleMsg, #twitterHandleMsg, #xinghandleMsg, #miscLinkHndleIDMsg, #viadeoLinkHandleIdMsg, #country-error, #firstname-error, #lastname-error, #jobtitle-error, #corporate_email-error, #contact_region-error").hide();
	}
}

function resetCompanyDetails() {
	if(arr != null && arr != '' && arr != '[]') {
		$.each(arr, function (index, value) {
			$("#company_companyname").val(value.company_companyname);
			$("#hq_phone").val(value.hq_phone);
			$("#employee").val(value.employee);
			$("#src_employeetotal").val(value.src_employeetotal);
			$("#revenue").val(value.revenue);
			$("#src_revenue").val(value.src_revenue);
			$("#complinkedinhandle").val(value.complinkedinhandle);
			$("#hq_street").val(value.hq_street);
			$("#hq_city").val(value.hq_city);
			$("#hq_state").val(value.hq_state);
			$("#hq_country").val(value.hq_country);
			$("#hq_postalcode").val(value.hq_postalcode);
			$("#dunsnumber").val(value.dunsnumber);
			$("#description").val(value.description);
			$("#industry").val(value.industry);
			$("#src_industry").val(value.src_industry);
			$("#website").val(value.website);
			$("#ultimate_duns").val(value.ultimate_duns);
			$("#immediate_parent").val(value.immediate_parent);
			$("#national_reg_number").val(value.national_reg_number);
			$("#fax").val(value.fax);
			//NL Fields
			$("#company_companynameNl").val(value.company_companynameNl);
			$("#hq_streetNl").val(value.hq_streetNl);
			$("#hq_cityNl").val(value.hq_cityNl);
			$("#hq_stateNl").val(value.hq_stateNl);
			
			$("#tradingcompanyname").val(value.tradingcompanyname);
			
			var select2IndustryVal = "-----select from list-----";
			var industryTextVal = "";
			var comboValues = $('#industrytext option').map(function() {
				if(value.industrytext != null && value.industrytext != "" && value.industrytext != "null") {
					if($(this).text()==value.industrytext) {
						industryTextVal = $(this).text();
						select2IndustryVal = $(this).text();
					}
				}
			}); 
			$("#select2-industrytext-container").html(select2IndustryVal);
			$("#select2-industrytext-container").prop("title",select2IndustryVal);
			
			$("#industrytext").val(industryTextVal);
			
			if($("#hq_country").val() != null && $("#hq_country").val()!=""){
				countryStateLengthChk($("#hq_country").val(),"#hqCountryMsg","Company Country");
			}
		    if($("#hq_country").val() != null && $("#hq_country").val() != "" && $("#hq_state").val() != null && $("#hq_state").val() != "") {
		    	stateCodeFormat($("#hq_country").val(),$("#hq_state").val(),"#hq_state","#hqStateMsg");
			}
		}); 
		$("#company_companyname, #hq_street, #hq_country, #website").removeClass("error");
		$("#companyNameMsg, #hqCountryMsg, #hqPhoneMsg, #dunsNoMsg, #websiteMsg, #clinkedinHandleMsg, #company_companyname-error, #hq_street-error, #hq_country-error, #website-error").hide();
		if($("#website").val() != null && $("#website").val() != "") {
			document.getElementById('websiteButton').disabled = false;
		}
		else {
			document.getElementById('websiteButton').disabled = true;
		}
		if($("#complinkedinhandle").val() != null && $("#complinkedinhandle").val() != "") {
			var cmpLinkedinhandle="";
			 $("#clinkedinHandleId").removeClass("ehandle").attr("disabled", false);
			 
			 if(($("#complinkedinhandle").val().indexOf('http://') == 0) || $("#complinkedinhandle").val().indexOf('https://') == 0) {
				 cmpLinkedinhandle=$("#complinkedinhandle").val();
			 }
			 else {
				 cmpLinkedinhandle = "http://"+$("#complinkedinhandle").val();
			 }
			 $("#clinkedinHandleId").attr("href",cmpLinkedinhandle);
		}
		else {
			 $("#clinkedinHandleId").addClass("ehandle").attr("disabled", true);
		}
		
		disableEnableMapButton();
	}
	else {
		$("#company_companyname").val("");
		$("#hq_phone").val("");
		$("#employee").val("");
		$("#src_employeetotal").val("");
		$("#revenue").val("");
		$("#src_revenue").val("");
		$("#complinkedinhandle").val("");
		$("#hq_street").val("");
		$("#hq_city").val("");
		$("#hq_state").val("");
		$("#hq_country").val("");
		$("#hq_postalcode").val("");
		$("#dunsnumber").val("");
		$("#description").val("");
		$("#industry").val("");
		$("#src_industry").val("");
		$("#website").val("");
		$("#ultimate_duns").val("");
		$("#immediate_parent").val("");
		$("#national_reg_number").val("");
		$("#fax").val("");
		$("#tradingcompanyname").val("");
		$("#industrytext").val("");
		
		$("#companyNameMsg, #hqCountryMsg, #hqPhoneMsg, #dunsNoMsg, #websiteMsg, #clinkedinHandleMsg, #company_companyname-error, #hq_street-error, #hq_country-error, #industry-error").hide();
		if($("#website").val() != null && $("#website").val() != "") {
			document.getElementById('websiteButton').disabled = false;
		}
		else {
			document.getElementById('websiteButton').disabled = true;
		}
		//Nlfields
		$("#company_companynameNl").val("");
		$("#hq_streetNl").val("");
		$("#hq_cityNl").val("");
		$("#hq_stateNl").val("");
		disableEnableMapButton();
	}
}


function callDeleteLead(){	
	
	$.ajax({
		url : "checkOpportunityExistsFromLeadIdForSalesLead.do?salesLeadId="+$("#sales_lead_id").val(),
		success : function(data){
			if(data == "opportunityexists") {
				$("#errorMsg").html("* Opportunity already exists against this lead.").show();
				setTimeout(function(){$('#errorMsg').html("");},5000);
			}
			else {
				$.confirm({
					'message'	: 'Are you sure you want to permanent delete this lead?',
					'buttons'	: {
						'<span class="fa fa-check fa-2x" aria-hidden="true"></span> Yes'	: {
							'class'	: 'yes',
							'action': function(){
								disableButtons();
								deleteLeadContactData();
							}
						},
						'<span class="fa fa-times fa-2x" aria-hidden="true"></span>  No'	: {
							'class'	: 'no',
							'action': function(){}	// Nothing to do in this case. You can as well omit the action property.
						}
					}
				});
			}
		}	
	});
}

function loadAssignSalesRep(){
	var assignAM = $("#assigned_salesrep").val();
	
	$("#assignSalesRepForm").trigger('reset');
	$('#salesRepLoadAgentList').show();
	var DataAgentList = document.getElementById("SalesRepDataAgentList");
	var ListmodalHTML='<input type="hidden" name="SalesRepAgentOrderID" id="SalesRepAgentOrderID"/>';
	$.ajax({
		url:"loadAssignAMList.do",
		success: function(data){	
			$('#salesRepLoadAgentList').hide();
			var peopleList= jQuery.parseJSON(data);
			//objData= sortJSON(peopleList, 'Checked');	 	
			if(peopleList.length > 0){
				for (var key in peopleList) {	
					if(peopleList[key].mail == assignAM){
						ListmodalHTML = ListmodalHTML + '<div class="checkbox"> <label id="salesrepassignname_'+key+'"><input type="radio" name="salesRepRadiobutton" value="'+ peopleList[key].mail +'"checked>' + peopleList[key].Name + ' - <small class="text-muted">'+peopleList[key].mail+'</small></label></div>';
					}else{
						ListmodalHTML = ListmodalHTML + '<div class="checkbox"> <label id="salesrepassignname_'+key+'"><input type="radio" name="salesRepRadiobutton" value="'+ peopleList[key].mail +'">' + peopleList[key].Name + ' - <small class="text-muted">'+peopleList[key].mail+'</small></label></div>';
					}
				}
			}else{
				ListmodalHTML = ListmodalHTML + '<div class="checkbox"> <label> No records Found, Please Try Again </label></div>';	
			}
			DataAgentList.innerHTML = ListmodalHTML; 
		},
		statusCode: {
		    400: function() {
				$("#salesRepErrorAgent").html("* client error please try again.").show();
		    },
		    500: function() {
				$("#salesRepErrorAgent").html("* Internal Server Error, Please Try Again").show();
		    }	  	
	    },
		error: function(xhr, textStatus, errorThrow){
			$("#assignSalesRepModal").hide();
			$("#salesRepErrorAgent").html("Please Try Again").show();
		}
	});	 		    
}

function assignSalesRep() {
	$("#assigned_salesrep").val($("input[name='salesRepRadiobutton']:checked").val());
	$("#assignSalesRepModal").modal("hide");
}

function loadAssignAM(){
	var assignAM = $("#assign_AM").val();
	
	$("#assignAMForm").trigger('reset');
	$('#LoadAgentList').show();
	var DataAgentList = document.getElementById("DataAgentList");
	var ListmodalHTML='<input type="hidden" name="AgentOrderID" id="AgentOrderID"/>';
	$.ajax({
		url:"loadAssignAMList.do",
		success: function(data){	
			$('#LoadAgentList').hide();
			var peopleList= jQuery.parseJSON(data);
			//objData= sortJSON(peopleList, 'Checked');	 	
			if(peopleList.length > 0){
				for (var key in peopleList) {	
					if(peopleList[key].mail == assignAM){
						ListmodalHTML = ListmodalHTML + '<div class="checkbox"> <label id="assignname_'+key+'"><input type="radio" name="radiobutton" value="'+ peopleList[key].mail +'"checked>' + peopleList[key].Name + ' - <small class="text-muted">'+peopleList[key].mail+'</small></label></div>';
					}else{
						ListmodalHTML = ListmodalHTML + '<div class="checkbox"> <label id="assignname_'+key+'"><input type="radio" name="radiobutton" value="'+ peopleList[key].mail +'">' + peopleList[key].Name + ' - <small class="text-muted">'+peopleList[key].mail+'</small></label></div>';
					}
				}
			}else{
				ListmodalHTML = ListmodalHTML + '<div class="checkbox"> <label> No records Found, Please Try Again </label></div>';	
			}
			DataAgentList.innerHTML = ListmodalHTML; 
		},
		statusCode: {
		    400: function() {
				$("#errorAgent").html("* client error please try again.").show();
		    },
		    500: function() {
				$("#errorAgent").html("* Internal Server Error, Please Try Again").show();
		    }	  	
	    },
		error: function(xhr, textStatus, errorThrow){
			$("#assignModal").hide();
			$("#errorAgent").html("Please Try Again").show();
		}
	});	 		    
}


function callBack() {
	if($("#callagentData").valid()) {	
		$("#callbackDetailsLoader").show();
		
		document.getElementById('saveCallBackBtn').disabled=true;
		
		var date = document.getElementById("callDate").value;
		var time = document.getElementById("callTime").value;
		var datetokens=date.split("-");
	    day=datetokens[2];
	    month=datetokens[1]-1;
	    year=datetokens[0];			
		var timetokens=time.split(":");
		var targetDate = new Date(year, month, day, timetokens[0], timetokens[1], 0, 0);		
		
		var now = new Date();
		now.setHours(0,0,0,0);
		
		if(targetDate<now){
			$("#callbackDetailsLoader").hide();
			$("#callDate").addClass("form-control error");
			document.getElementById("callDate").setAttribute('aria-required', 'false');
			$("#callDate-error").html("Select Valid Date").show();
			document.getElementById('saveCallBackBtn').disabled=false;
		}else{	
			var targetCallBackDateTime = year+"-"+datetokens[1]+"-"+day+" "+time;
			callBackDateTimeForRowUpdate = targetCallBackDateTime;
			//lastActivityDateForRowUpdate = now;
			var callBackData = {salesLeadId:$("#sales_lead_id").val(),callBackTime:targetCallBackDateTime,callBackReason:$("#callReason").val(),userName:loginUserName};
			$.ajax({
				url : "saveCallBackDetails.do",
				data:callBackData,
				type:'POST',
				success: function(data)
				{
					document.getElementById('saveCallBackBtn').disabled=false;
				     $("#callbackDetailsLoader").hide();
				     $('#callBackTable').dataTable().fnClearTable();
				     
				     var callbackDateTime = day+"/"+datetokens[1]+"/"+year+" - "+time;
				     $("#callbackdatetime_"+currentIndex).text(callbackDateTime);
				     
				     $("#callbackSuccessMsg").html("* Callback record saved successfully.").show();
				     setTimeout(function(){
				      $("#callbackSuccessMsg").html('');
				      $("#callBackModal").modal("hide");
				     },3000);
				     saveAppointment(targetDate);
				},
				error: function(xhr, textStatus, errorThrow)
				{
					$("#callbackDetailsLoader").hide();
					
					$('#callbackErrorMsg').html("* error occurred while inserting callback record in db, kindly check with development team.").show();
					setTimeout(function(){
						$('#callbackErrorMsg').html("");
						document.getElementById('saveCallBackBtn').disabled=false;
					},validationMessageTimeout);
				}		
			});
		}
	}
}

function loadCallBackRecords() {
	$("#callbackDetailsLoader").show();
	$.ajax({
		url:"loadCallBackRecords.do?salesLeadId="+$("#sales_lead_id").val(),
		success: function(data, textStatus, xhr)
		{
			$("#callbackDetailsLoader").hide();
			$('#callBackTable').dataTable().fnClearTable();
			
			var tabledata = [];
			for(var i=0;i<data.length;i++){
				var rec=data[i];
				var callBackDateTime = rec.callbacktimestamp;
				callBackDateTime = new Date(callBackDateTime);
				var date = callBackDateTime.getDate();
			    var month = callBackDateTime.getMonth()+1;
			    var hours = callBackDateTime.getHours();
			    var minutes = callBackDateTime.getMinutes();
			    var seconds = callBackDateTime.getSeconds();
			    callBackDateTime = ((date <= 9 ? '0'+date : date)+"/"+(month <= 9 ? '0'+month : month))+"/"+callBackDateTime.getFullYear()+" - "+(hours <= 9 ? '0'+hours : hours)+":"+(minutes <= 9 ? '0'+minutes : minutes)+":"+(seconds <= 9 ? '0'+seconds : seconds);
			    
				$('#callBackTable').dataTable().fnAddData([i+1, callBackDateTime, rec.callbackreason]);
			}	
		},
		error: function(xhr, textStatus, errorThrow)
		{
			$("#callbackDetailsLoader").hide();
			var row = $(this).closest('tr');
			var nRow = row[0];
			$('#callBackTable').dataTable().fnDeleteRow(nRow);
			
//			debugger; 
			console.log(xhr);
			console.log(textStatus);
			console.log(errorThrow);
		}
	}) 
}


//Transalte code

function prefillTranslateTabFields(){
	debugger;
	setRowValue("translatetable","translateTblfirstname",1,$("#firstname").val());
	setRowValue("translatetable","translateTblmiddlename",1,$("#middlename").val());
	setRowValue("translatetable","translateTbllastname",1,$("#lastname").val());
	setRowValue("translatetable","translateTblfullname",1,$("#fullname").val());
	setRowValue("translatetable","translateTbljobtitle",1,$("#jobtitle").val());
	setRowValue("translatetable","translateTblstreet",1,$("#street").val());
	setRowValue("translatetable","translateTblcity",1,$("#city").val());
	setRowValue("translatetable","translateTblstate",1,$("#state").val());
	setRowValue("translatetable","translateTblcompany_companyname",1,$("#company_companyname").val());
	setRowValue("translatetable","translateTblhq_street",1,$("#hq_street").val());
	setRowValue("translatetable","translateTblhq_city",1,$("#hq_city").val());
	setRowValue("translatetable","translateTblhq_state",1,$("#hq_state").val());
	
	setRowValue("translatetable","translateTblfirstname",2,$("#firstnameNl").val());
	setRowValue("translatetable","translateTblmiddlename",2,$("#middlenameNl").val());
	setRowValue("translatetable","translateTbllastname",2,$("#lastnameNl").val());
	setRowValue("translatetable","translateTblfullname",2,$("#fullnameNl").val());
	setRowValue("translatetable","translateTbljobtitle",2,$("#jobtitleNl").val());
	setRowValue("translatetable","translateTblstreet",2,$("#streetNl").val());
	setRowValue("translatetable","translateTblcity",2,$("#cityNl").val());
	setRowValue("translatetable","translateTblstate",2,$("#stateNl").val());
	setRowValue("translatetable","translateTblcompany_companyname",2,$("#company_companynameNl").val());
	setRowValue("translatetable","translateTblhq_street",2,$("#hq_streetNl").val());
	setRowValue("translatetable","translateTblhq_city",2,$("#hq_cityNl").val());
	setRowValue("translatetable","translateTblhq_state",2,$("#hq_stateNl").val());
}

function translateToEnglish(){
	$("#translateMsg").show();
	 var reqArr=[];
	$.each($("input[id^='translate'][id$='Chk']:checked"), function(){ 
		var checkboxId = $(this).attr('id');
		var trID=checkboxId.substr(0,checkboxId.length-3);
    var value = $('#translatetable').find('tr#'+trID).find('td:eq("2")').text();
    if(value!=""){
 	   var req="\""+trID+":"+value+"\"";
 	   reqArr.push(req);
    }
 });
	console.log("Arr : "+reqArr);
	if(reqArr.length>0){
		var country = $('#country').val();
		if(country!=""){
			var queryString = "?fieldsArray="+encodeURIComponent("["+reqArr+"]")+"&target=US&source="+country;
			var finalURL= 'translateFields.do'+queryString;
			console.log("url : "+finalURL);
			$.ajax({
				url:finalURL,
				success: function(data){
					$("#translateMsg").hide();
					console.log("data : "+data);
					populateTranslatedDataToEnglish(data);
				},
				error: function(xhr, textStatus, errorThrow){
					$("#translateMsg").hide();
					$("#errorMsg").html("* Unable to translate, kindly check with development team.").show();
					setTimeout(function(){$('#errorMsg').html("");},validationMessageTimeout);
				}
			});
		}else{
			$("#translateMsg").hide();
			$("#errorMsg").html("* Please enter country to translate.").show();
			setTimeout(function(){$('#errorMsg').html("");},5000);
		}
		
	}else{
		$("#translateMsg").hide();
		$("#errorMsg").html("* Please select field to translate.").show();
		setTimeout(function(){$('#errorMsg').html("");},5000);
	}
}
function populateTranslatedDataToEnglish(data){
	var arr = JSON.parse(data);
		for(var i=0;i<arr.length;i++){
			var val =arr[i].split(":");
			if(val.length>1){
				setRowValue("translatetable",val[0],1,val[1]);
				var fieldId=val[0];
				fieldId=fieldId.substr(12,fieldId.length-1);
				console.log("fieldId "+fieldId);
				$('#'+fieldId).val(val[1]);
			}
		}
	//}
	$("input[id^='translate'][id$='Chk']").prop('checked', false);
	$("#translateSelectAllChkbox").prop('checked', false);
	$('#myTab a[href="#empDetailsTab"]').tab('show');
}
function translateToNL(){
	debugger;
	$("#translateMsg").show();
	 var reqArr=[];
	$.each($("input[id^='translate'][id$='Chk']:checked"), function(){ 
		var checkboxId = $(this).attr('id');
		var trID=checkboxId.substr(0,checkboxId.length-3);
   var value = $('#translatetable').find('tr#'+trID).find('td:eq("1")').text();
   if(value!=""){
	   var req="\""+trID+":"+value+"\"";
	   reqArr.push(req);
   }
});
	console.log("Arr : "+reqArr);
	if(reqArr.length>0){
		var country = $('#country').val();
		if(country!=""){
			var queryString = "?fieldsArray="+encodeURIComponent("["+reqArr+"]")+"&target="+country+"&source=US";
			var finalURL= 'translateFields.do'+queryString;
			console.log("url : "+finalURL);
			$.ajax({
				url:finalURL,
				success: function(data){
					$("#translateMsg").hide();
					console.log("data : "+data);
					populateTranslatedDataToNL(data);
				},
				error: function(xhr, textStatus, errorThrow){
					$("#translateMsg").hide();
					$("#errorMsg").html("* Unable to translate, kindly check with development team.").show();
					setTimeout(function(){$('#errorMsg').html("");},validationMessageTimeout);
				}
			});
		}else{
			$("#translateMsg").hide();
			$("#errorMsg").html("* Please enter country to translate.").show();
			setTimeout(function(){$('#errorMsg').html("");},5000);
		}

	}else{
		$("#translateMsg").hide();
		$("#errorMsg").html("* Please select field to translate.").show();
		setTimeout(function(){$('#errorMsg').html("");},5000);
	}
}
function populateTranslatedDataToNL(data){
	debugger;
	var arr = JSON.parse(data);
		for(var i=0;i<arr.length;i++){
			var val =arr[i].split(":");
			if(val.length>1){
				setRowValue("translatetable",val[0],2,val[1]);
				var fieldId=val[0];
				fieldId=fieldId.substr(12,fieldId.length-1);
				console.log("fieldId "+fieldId);
				$('#'+fieldId+'Nl').val(val[1]);
			}
		}
	$("input[id^='translate'][id$='Chk']").prop('checked', false);
	$("#translateSelectAllChkbox").prop('checked', false);
	$('#myTab a[href="#empDetailsTab"]').tab('show');
}

function switchValue(){
	var reqArrEnglish=[];
	var reqArrNL=[];		
	$.each($("input[id^='translate'][id$='Chk']:checked"), function(){ 
		var checkboxId = $(this).attr('id');
		var trID=checkboxId.substr(0,checkboxId.length-3);
		var valueEng = $('#translatetable').find('tr#'+trID).find('td:eq("1")').text();
      var valueNL = $('#translatetable').find('tr#'+trID).find('td:eq("2")').text();
      
      $('#'+trID+' td:nth-child(3)').html(valueEng);
      $('#'+trID+' td:nth-child(2)').html(valueNL);
      

 });		
}

function cloneLead(){
	if(editView){
	$.confirm({
		'message'	: 'Do You want to save Company Details before cloning ?',
		'buttons'	: {
			'<span class="fa fa-check fa-2x" aria-hidden="true"></span> Yes'	: {
				'class'	: 'yes',
				'action': function(){
					submitSendContactDataClone();
				}
			},
			'<span class="fa fa-times fa-2x" aria-hidden="true"></span>  No'	: {
				'class'	: 'no',
				'action': function(){
					openCloneLead();
					prefillOnlyCompanyDetails(previousData);
				}
			}
		}
	});
	}else{
		openCloneLead();
	}
	
}

function openCloneLead(){

	editView = false;
	old_corp_email='';
	$('#leadDatatableBlk').slideUp('slow');
	$('#newLeadBlk').slideDown('slow');
	$('#leadBlkTitle').text('Add New Lead');
	
	$("#leadDetailsLoader").hide();
	
	$("#hooversCompanyTable, #hooversCompanyTable_wrapper").show();
	$('#hooversCompanyTable').dataTable();
	$("#loadContactTable, #loadContactTable_wrapper").hide();
	
	currentId = null;
	$("#sales_lead_id").val("");
	$("#assign_AM").val("");
	$("#assigned_salesrep").val("");
	$("#contact_company_id").val("");
	$("#contact_contact_id").val("");
	$("#company_company_id").val("");
	$("#select2-industrytext-container").html("-----select from list-----");
	$("#select2-industrytext-container").prop("title","-----select from list-----");		   
	$("#industrytext").val("");
	$("#lcdData").trigger('reset');
	document.getElementById('lead_status').disabled = false;
	/* if(role=="insidesales" || role=="insidesalesamus") {
		$("#lead_status").html("<option value=''>--- Lead Status ---</option><option value='Prospecting'>Prospecting</option><option value='Appointment Set'>Appointment Set</option>"+
			"<option value='Appointment Attended'>Appointment Attended</option><option value='No Longer With Company'>No Longer With Company</option>"+
			"<option value='Wrong Contact'>Wrong Contact</option><option value='Bad Fit'>Bad Fit</option><option value='Cold'>Cold</option>");
	}
	else {
		$("#lead_status").html("<option value=''>--- Lead Status ---</option><option value='Prospecting'>Prospecting</option><option value='Appointment Set'>Appointment Set</option>"+
			"<option value='Appointment Attended'>Appointment Attended</option><option value='No Longer With Company'>No Longer With Company</option>"+
			"<option value='Wrong Contact'>Wrong Contact</option><option value='Bad Fit'>Bad Fit</option><option value='Cold'>Cold</option><option value='Converted'>Converted</option>");
	} */
	leadStatusDD();
	
	$("#assign_inside_salesrep").val(loginUserName);
    enableButtons();
    
    document.getElementById('deleteLead').disabled=true;
    document.getElementById('callbackBtn').disabled=true;
    document.getElementById('lead_source').disabled = false;
	loadSeniorityLevelLookup();
	loadJobFunctionLookup();
	loadSrcLookupValues();
}

function prefillOnlyCompanyDetails(data) {
	
	$("#company_companyname").val(data.companydetails.companyname);
	replaceValue("#company_companyname", $("#company_companyname").val());
	
	$("#tradingcompanyname").val(data.companydetails.tradingcompanyname);
	replaceValue("#tradingcompanyname", $("#tradingcompanyname").val());
	$("#hq_street").val(data.companydetails.companyaddress.address1);
	replaceValue("#hq_street", $("#hq_street").val());
	$("#hq_city").val(data.companydetails.companyaddress.city);
	replaceValue("#hq_city", $("#hq_city").val());
	$("#hq_postalcode").val(data.companydetails.companyaddress.zip);
	replaceValue("#hq_postalcode", $("#hq_postalcode").val());
	$("#hq_state").val(data.companydetails.companyaddress.state);
	replaceValue("#hq_state", $("#hq_state").val());
	$("#hq_country").val(data.companydetails.companyaddress.country);
	replaceValue("#hq_country", $("#hq_country").val());
	

	$("#company_companynameNl").val(data.companydetails.companynamenl);
	replaceValue("#company_companynameNl", $("#company_companynameNl").val());
	
	var countryVal = $("#hq_country").val();
	if(countryVal != null && countryVal != "" && (countryVal == 'US' || countryVal == 'CA')) {
		var hqPhoneVal = data.companydetails.hqphone;
		if(hqPhoneVal != null && hqPhoneVal != "") {
			$("#hq_phone").val(hqPhoneVal);
		}
	}
	else {
		$("#hq_phone").val(data.companydetails.hqphone); 
	}
	replaceValue("#hq_phone", $("#hq_phone").val());

	$("#revenue").val(data.companydetails.revenue);
	replaceValue("#revenue", $("#revenue").val());
	if(data.companydetails.companyindustry.industry != null && data.companydetails.companyindustry.industry != "") {
		industry = data.companydetails.companyindustry.industry;
	}
	else {
		industry = data.companydetails.companyindustry.industrytext;
	}
	$("#industry").val(industry);
	replaceValue("#industry", $("#industry").val());

	var select2IndustryVal = "-----select from list-----";
	var industryTextVal = "";
	var comboValues = $('#industrytext option').map(function() {
		if(data.companydetails.companyindustry.industrytext != null && data.companydetails.companyindustry.industrytext != "" && data.companydetails.companyindustry.industrytext != "null") {
			if($(this).text().toLowerCase().trim()==data.companydetails.companyindustry.industrytext.toLowerCase().trim()) {
				industryTextVal = $(this).text();
				select2IndustryVal = $(this).text();
			}
		}
	}); 
	
	$("#select2-industrytext-container").html(select2IndustryVal);
	$("#select2-industrytext-container").prop("title",select2IndustryVal);
	
	$("#industrytext").val(industryTextVal);
	replaceValue("#industrytext", $("#industrytext").val());
	$("#employee").val(data.companydetails.employeetotal);
	replaceValue("#employee", $("#employee").val());
	$("#dunsnumber").val(data.companydetails.dunsnumber);
	replaceValue("#dunsnumber", $("#dunsnumber").val());
	
	$("#hidden_duns_number").val($("#dunsnumber").val());
	
	$("#website").val(data.companydetails.website);
	replaceValue("#website", $("#website").val());
	$("#description").val(data.companydetails.description);
	replaceValue("#description", $("#description").val());
	$("#locationtype").val(data.companydetails.locationtype);
	replaceValue("#locationtype", $("#locationtype").val()); 
	
	$("#longitude").val(data.companydetails.longitude);
	replaceValue("#longitude", $("#longitude").val()); 
	$("#latitude").val(data.companydetails.latitude);
	replaceValue("#latitude", $("#latitude").val()); 
	$("#region").val(data.companydetails.region);
	replaceValue("#region", $("#region").val()); 
	$("#companytype").val(data.companydetails.companytype);
	replaceValue("#companytype", $("#companytype").val()); 
	$("#fax").val(data.companydetails.fax);
	replaceValue("#fax", $("#fax").val());
	$("#Parent_Duns_No").val(data.companydetails.parentDuns);
	replaceValue("#Parent_Duns_No", $("#Parent_Duns_No").val()); 
	$("#SIC").val(data.companydetails.sic);
	replaceValue("#SIC", $("#SIC").val()); 
	$("#NAICS").val(data.companydetails.naics);
	replaceValue("#NAICS", $("#NAICS").val());
	$("#national_reg_number").val(data.companydetails.nationalregnumber);
	replaceValue("#national_reg_number", $("#national_reg_number").val()); 
	
	//$("#contact_company_id").val(data.conCompanyID);
    $("#contact_contact_id").val(data.contactdetails.contactid);
   
    $("#company_company_id").val(data.companydetails.companyid);
    
	$("#src_revenue").val(data.companydetails.srcrevenue);
	replaceValue("#src_revenue", $("#src_revenue").val());
	$("#src_employeetotal").val(data.companydetails.srcemployeetotal); 
	replaceValue("#src_employeetotal", $("#src_employeetotal").val());
	$("#src_industry").val(data.companydetails.companyindustry.srcindustry); 
	replaceValue("#src_industry", $("#src_industry").val());
	$("#ultimate_duns").val(data.companydetails.ultimateduns); 
	replaceValue("#ultimate_duns", $("#ultimate_duns").val());
	$("#immediate_parent").val(data.companydetails.immediateparent); 
	replaceValue("#immediate_parent", $("#immediate_parent").val());
	
	
	if($("#complinkedinhandle").val() != null && $("#complinkedinhandle").val() != "") {
		var cmpLinkedinhandle="";
		 $("#clinkedinHandleId").removeClass("ehandle").attr("disabled", false);
		 
		 if(($("#complinkedinhandle").val().indexOf('http://') == 0) || $("#complinkedinhandle").val().indexOf('https://') == 0) {
			 cmpLinkedinhandle=$("#complinkedinhandle").val();
		 }
		 else {
			 cmpLinkedinhandle = "http://"+$("#complinkedinhandle").val();
		 }
		 $("#clinkedinHandleId").attr("href",cmpLinkedinhandle);
	}
	else {
		 $("#clinkedinHandleId").addClass("ehandle").attr("disabled", true);
	}
	
	
	$("#companynameNl").val(data.companydetails.companynamenl);
	replaceValue("#companynameNl", $("#companynameNl").val());
	$("#hq_streetNl").val(data.companydetails.companyaddressnl.address1);
	replaceValue("#hq_streetNl", $("#hq_streetNl").val());
	$("#hq_cityNl").val(data.companydetails.companyaddressnl.city);
	replaceValue("#hq_cityNl", $("#hq_cityNl").val());
	$("#hq_stateNl").val(data.companydetails.companyaddressnl.state);
	replaceValue("#hq_stateNl", $("#hq_stateNl").val());
	
	enableButtons();

	item = {};
	
	item ["use_hq_address"] = $("#use_hq_address").prop('checked');
    item ["company_companyname"] = $("#company_companyname").val();
    item ["hq_street"] = $("#hq_street").val();
    item ["hq_city"] = $("#hq_city").val();
    item ["hq_postalcode"] = $("#hq_postalcode").val();
    item ["hq_state"] = $("#hq_state").val();
    item ["hq_country"] = $("#hq_country").val();
    item ["hq_phone"] = $("#hq_phone").val();
    item ["revenue"] = $("#revenue").val();
    item ["industry"] = $("#industry").val();
    item ["employee"] = $("#employee").val();
    item ["dunsnumber"] = $("#dunsnumber").val();
    item ["website"] = $("#website").val();
    item ["description"] = $("#description").val();
    item ["complinkedinhandle"] = $("#complinkedinhandle").val();
    item ["src_employeetotal"] = $("#src_employeetotal").val();
    item ["src_revenue"] = $("#src_revenue").val();
    item ["src_industry"] = $("#src_industry").val();
    item ["ultimate_duns"] = $("#ultimate_duns").val();
    item ["immediate_parent"] = $("#immediate_parent").val();
    item ["national_reg_number"] = $("#national_reg_number").val();
    item ["fax"] = $("#fax").val();
    item ["tradingcompanyname"] = $("#tradingcompanyname").val();
    item ["industrytext"] = $("#industrytext").val();
      
   
    item ["company_companynameNl"] = $("#company_companynameNl").val();
    item ["hq_streetNl"] = $("#hq_streetNl").val();
    item ["hq_cityNl"] = $("#hq_cityNl").val();
    item ["hq_stateNl"] = $("#hq_stateNl").val();
    
    arr.push(item);
    
   
    if($("#hq_country").val() != null && $("#hq_country").val()!=""){
    	countryStateLengthChk($("#hq_country").val(),"#hqCountryMsg","Company Country");
    }
    if($("#hq_country").val() != null && $("#hq_country").val() != "" && $("#hq_state").val() != null && $("#hq_state").val() != "") {
    	stateCodeFormat($("#hq_country").val(),$("#hq_state").val(),"#hq_state","#hqStateMsg");
	}
	disableEnableMapButton();
}


function submitSendContactDataClone() {

	$("#leadDetailsLoader").show();
	
	
	if($('#hooversCompanyTable').dataTable().fnGetData().length > 0) {
		$('#hooversCompanyTable').dataTable().fnClearTable();
	}
	if($('#loadContactTable').dataTable().fnGetData().length > 0) {
		$('#loadContactTable').dataTable().fnClearTable();
	}
	
	var arr = {firstname:trimValue($('#firstname').val()),lastname:trimValue($('#lastname').val()),middlename:trimValue($('#middlename').val()),fullname:trimValue($('#fullname').val()),
		private_email:trimValue($('#private_email').val()),corporate_email:trimValue($('#corporate_email').val()),street:trimValue($('#street').val()),city:trimValue($('#city').val()),
		postalcode:trimValue($('#postalcode').val()),state:trimValue($('#state').val()),country:trimValue($('#country').val()),jobtitle:trimValue($('#jobtitle').val()),
		jobfunction:trimValue($('#jobfunction').val()),senioritylevel:trimValue($('#senioritylevel').val()),
		companyname:trimValue($('#company_companyname').val()),directphone:trimValue($('#directphone').val()),directphone_ext:trimValue($('#directphone_ext').val()),
		mobilephone:trimValue($('#mobilephone').val()),altphone:trimValue($('#hidden_altphone').val()),altphone2:trimValue($('#hidden_altphone2').val()),altphone3:trimValue($('#hidden_altphone3').val()),
		linkedinhandle:trimValue($('#linkedinhandle').val()),facebookhandle:trimValue($('#facebookhandle').val()),
		twitterhandle:trimValue($('#twitterhandle').val()),company_id:$('#contact_company_id').val(),contact_id:$('#contact_contact_id').val(),
		modifiedby:loginUserName,suppress:"false",private_email2:trimValue($('#private_email2').val()),
		private_email3:trimValue($('#private_email3').val()),xinghandle:trimValue($('#xinghandle').val()),miscLinkHndleID:trimValue($('#miscLinkHndleID').val()),
		viadeolinkhandle:trimValue($('#viadeolinkhandle').val()),branchphone:trimValue($('#branchphone').val()),lead_status:$("#lead_status").val(),last_activity:$("#last_activity").val(),
		assigned_AM:$("#assign_AM").val(),salesLeadId:$("#sales_lead_id").val(),contact_region:$("#contact_region").val(),assigned_salesrep:$("#assigned_salesrep").val(),
		assign_inside_salesrep:$("#assign_inside_salesrep").val(),activityNotes:trimValue($("#activityNotes").val()),lead_source:trimValue($("#lead_source").val()),
		firstnameNl:trimValue($('#firstnameNl').val()),lastnameNl:trimValue($('#lastnameNl').val()),middlenameNl:trimValue($('#middlenameNl').val()),fullnameNl:trimValue($('#fullnameNl').val()),
		streetNl:trimValue($('#streetNl').val()),cityNl:trimValue($('#cityNl').val()),stateNl:trimValue($('#stateNl').val()),jobtitleNl:trimValue($('#jobtitleNl').val()),source:"SL",
		"company":{company_id:$('#company_company_id').val(),companyname:trimValue($('#company_companyname').val()),hq_street:trimValue($('#hq_street').val()),
		hq_city:trimValue($('#hq_city').val()),hq_postalcode:trimValue($('#hq_postalcode').val()),hq_state:trimValue($('#hq_state').val()),hq_country:trimValue($('#hq_country').val()),
		hq_phone:trimValue($('#hq_phone').val()),revenue:trimValue($('#revenue').val()),industry:trimValue($('#industry').val()),employee:trimValue($('#employee').val()),
		dunsnumber:trimValue($('#dunsnumber').val()),website:trimValue($('#website').val()),description:trimValue($('#description').val()),locationtype:$("#locationtype").val(),
		longitude:$("#longitude").val(),latitude:$("#latitude").val(),region:$("#region").val(),companytype:$("#companytype").val(),fax:$("#fax").val(),Parent_Duns_No:$("#Parent_Duns_No").val(),
		SIC:$("#SIC").val(),NAICS:$("#NAICS").val(),src_employeetotal:trimValue($('#src_employeetotal').val()),src_revenue:trimValue($('#src_revenue').val()),
		src_industry:trimValue($('#src_industry').val()),ultimate_duns:trimValue($('#ultimate_duns').val()),immediate_parent:trimValue($('#immediate_parent').val()),
		complinkedinhandle:trimValue($('#complinkedinhandle').val()),national_reg_number:trimValue($('#national_reg_number').val()),tradingcompanyname:trimValue($('#tradingcompanyname').val()),
		industrytext:trimValue($("#industrytext").val()),
		companynameNl:trimValue($('#company_companynameNl').val()),hq_streetNl:trimValue($('#hq_streetNl').val()),hq_cityNl:trimValue($('#hq_cityNl').val()),
		hq_stateNl:trimValue($('#hq_stateNl').val())}};
	 
	$.ajax({
		url:"updateMSORCompanyContactSendData.do",
		data: encodeURIComponent(JSON.stringify(arr)),	 
		type:'POST', 
		success: function(data, textStatus, xhr)
		{
			$("#leadDetailsLoader").hide();
			var origJSON= data.replace(/"salesLeadId":\s*([-+Ee0-9.]+)/g, '"salesLeadId": "$1"');
			data = JSON.parse(origJSON);
			console.log("salesLeadId==="+data.salesLeadId);
			previousData = data;
			if(data.salesLeadId != null && data.salesLeadId != "" && data.salesLeadId > 0){
				$("#successMsg").html("* Record saved successfully.").show();
				setTimeout(function(){
					$("#successMsg").html('');
					fetchSelectedLeadData(data.salesLeadId);
				},1000);
			}
			else {
				$("#leadDetailsLoader").hide();
				$("#errorMsg").html("* exception occurred while inserting record in db, kindly check with development team.").show();
				setTimeout(function(){$('#errorMsg').html("");},validationMessageTimeout);
				enableButtons();
			}
		},
		error: function(xhr, textStatus, errorThrow)
		{
			$("#leadDetailsLoader").hide();
			$("#errorMsg").html("* error occurred while inserting record in db, kindly check with development team.").show();
			setTimeout(function(){$('#errorMsg').html("");},validationMessageTimeout);
			enableButtons();
		}
	}) 	
}  

//leadstatus:
function displayLeadStatus(){
debugger;
	$('#leadStatusSpin').show();
	
	$('#hqCountryDropdownSearch').val('');
	$('#hqCountryDropdownMultiSelectParent').hide();
	$('#leadOwnerSearch').val('');
	$('#leadOwnerMultiSelectParent').hide();
	$('#assignedRepSearch').val('');
	$('#assignedRepMultiSelectParent').hide();
	$('#leadActivitySearch').val('');
	$('#leadActivityMultiSelectParent').hide(); 
	
	var leadstatusValues1=leadstatusValues;
	var LeadStatusArr = leadstatusValues1.split(',');
	var obj = {};
	for(var i=0; i<LeadStatusArr.length; i++) {
	var keyValue = LeadStatusArr[i].split("=");
	obj[keyValue[0]] = keyValue[0];
	} 
	//alert(JSON.stringify(obj));
	var data=JSON.stringify(obj);
	
		debugger;
		if(data != null && data != "") {
			leadStatusObj = JSON.parse(data);
			var leadStatusVal = $("#selectedLeadStatus").val().split(",");
			leadStatusProbabilityMap  = new Map();
			html = '';
			var i=0;
			$.each(leadStatusObj, function(key, value){
				if(leadStatusVal != null && leadStatusVal != "" && leadStatusVal.indexOf(value)>-1) {
					html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectLeadStatus(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedLeadStatus'+i+' value="'+value+'" checked><text style="font-size: 0.8125rem;"  for="selectedLeadStatus'+i+'">'+value+'</label></div></div>';
				}
				else {
					html=html+'<div class="dropdown-item py-0 px-1" onClick="selectLeadStatus(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedLeadStatus'+i+' value="'+value+'"><text  style="font-size: 0.8125rem;" for="selectedLeadStatus'+i+'">'+value+'</label></div></div>';
				}
				i++;
				
				leadStatusProbabilityMap.set(key,value);
			});
			$("#leadStatusMultiSelect").html(html);
			$("#leadStatusMultiSelectParent").show().css("width", "100%");
			$('#leadStatusSpin').hide();
			arrow=true;
		}
}
function filterLeadStatus() {
		html='';
		var i=0;
		if(leadStatusOptions == "") {
			if($("#selectedLeadStatus").val() != null && $("#selectedLeadStatus").val() != "") {
				var leadStatusArray = $("#selectedLeadStatus").val().split(",");
				$.each(leadStatusArray, function(i) {
					leadStatusOptions.push(leadStatusArray[i]);
				});
			} 
		}
		
		$.each(leadStatusObj, function(key, value){
			var searchedText=$('#leadStatusSearch').val();
			try {
				if(value.toLowerCase().indexOf(searchedText.toLowerCase())>-1){
					if(leadStatusOptions.length>0) {
						if(leadStatusOptions.indexOf(value)>-1) {
							html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectLeadStatus(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedLeadStatus'+i+' value="'+value+'" checked><text style="font-size: 0.8125rem;"  for="selectedLeadStatus'+i+'">'+value+'</label></div></div>';
						}
						else {
							html=html+'<div class="dropdown-item py-0 px-1" onClick="selectLeadStatus(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedLeadStatus'+i+' value="'+value+'"><text  style="font-size: 0.8125rem;" for="selectedLeadStatus'+i+'">'+value+'</label></div></div>';
						}
					}
					else {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectLeadStatus(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedLeadStatus'+i+' value="'+value+'"><text  style="font-size: 0.8125rem;" for="selectedLeadStatus'+i+'">'+value+'</label></div></div>';
					}
				}
			}
			catch(e) {
				console.log(e.message);
			}
			i++;
		});
		$("#leadStatusMultiSelect").html(html);
		$("#leadStatusMultiSelectParent").show().css("width", "100%");
		$('#leadStatusSpin').hide();
	}
function selectLeadStatus(event) {
		var $target = $(event.currentTarget),
		val = $target.find('input[type="checkbox"]').attr('value'),
		$inp = $target.find('input[type="checkbox"]'),
		idx;
		
		if(leadStatusOptions == "") {
			if($("#selecetdLeadStatus").val() != null && $("#selecetdLeadStatus").val() != "") {
				var leadStatusArray = $("#selecetdLeadStatus").val().split(",");
				$.each(leadStatusArray, function(i) {
					leadStatusOptions.push(leadStatusArray[i]);
				});
			} 
		}
		
		if ((idx = leadStatusOptions.indexOf(val)) > -1) {
			leadStatusOptions.splice(idx, 1);
			setTimeout(function() {$inp.prop('checked', false)}, 0);
			$inp.prop('checked', false).closest('.dropdown-item').removeClass("active");
		}
		else {
			if(leadStatusOptions.indexOf(val) == -1) {
				leadStatusOptions.push(val);
				setTimeout(function() {$inp.prop('checked', true)}, 0);
				$inp.prop('checked', true).closest('.dropdown-item').addClass("active");
			}
		}
		$("#leadStatusMultiSelectParent").dropdown('toggle');
		//$("#leadStatusMultiSelectParent").show().css("width", "100%");
		$("#selectedLeadStatus").val(leadStatusOptions);
		selectLeadStatusChecked = true;
		return false;
	}
//lead activity

function displayLeadActivity(){
$('#leadActivitySpin').show();

$('#hqCountryDropdownSearch').val('');
$('#hqCountryDropdownMultiSelectParent').hide();
$('#leadOwnerSearch').val('');
$('#leadOwnerMultiSelectParent').hide();
$('#assignedRepSearch').val('');
$('#assignedRepMultiSelectParent').hide();
$('#leadStatusSearch').val('');
$('#leadStatusMultiSelectParent').hide();

var leadactivityValues1=leadactivityValues;
var LeadActivityArr = leadactivityValues1.split(',');
var obj = {};
for(var i=0; i<LeadActivityArr.length; i++) {
var keyValue = LeadActivityArr[i].split("=");
obj[keyValue[0]] = keyValue[0];
} 
//alert(JSON.stringify(obj));
var data=JSON.stringify(obj);

		if(data != null && data != "") {
			leadActivityObj = JSON.parse(data);
			var leadActivityVal = $("#selectedLeadActivity").val().split(",");
			leadActivityProbabilityMap  = new Map();
			html = '';
			var i=0;
			$.each(leadActivityObj, function(key, value){
				if(leadActivityVal != null && leadActivityVal != "" && leadActivityVal.indexOf(value)>-1) {
					html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectLeadActivity(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedLeadActivity'+i+' value="'+value+'" checked><text style="font-size: 0.8125rem;"  for="selectedLeadActivity'+i+'">'+value+'</label></div></div>';
				}
				else {
					html=html+'<div class="dropdown-item py-0 px-1" onClick="selectLeadActivity(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedLeadActivity'+i+' value="'+value+'"><text  style="font-size: 0.8125rem;" for="selectedLeadActivity'+i+'">'+value+'</label></div></div>';
				}
				i++;
				
				leadActivityProbabilityMap.set(key,value);
			});
			$("#leadActivityMultiSelect").html(html);
			$("#leadActivityMultiSelectParent").show().css("width", "100%");
			$('#leadActivitySpin').hide();
			arrow=true;
		}
}
function filterLeadActivity() {
debugger;
html='';
var i=0;
if(leadActivityOptions == "") {
	if($("#selectedLeadActivity").val() != null && $("#selectedLeadActivity").val() != "") {
		var leadActivityArray = $("#selectedLeadActivity").val().split(",");
		$.each(leadActivityArray, function(i) {
			leadActivityOptions.push(leadActivityArray[i]);
		});
	} 
}

$.each(leadActivityObj, function(key, value){
	var searchedText=$('#leadActivitySearch').val();
	try {
		if(value.toLowerCase().indexOf(searchedText.toLowerCase())>-1){
			if(leadActivityOptions.length>0) {
				if(leadActivityOptions.indexOf(value)>-1) {
					html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectLeadActivity(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedLeadActivity'+i+' value="'+value+'" checked><text style="font-size: 0.8125rem;"  for="selectedLeadActivity'+i+'">'+value+'</label></div></div>';
				}
				else {
					html=html+'<div class="dropdown-item py-0 px-1" onClick="selectLeadActivity(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedLeadActivity'+i+' value="'+value+'"><text  style="font-size: 0.8125rem;" for="selectedLeadActivity'+i+'">'+value+'</label></div></div>';
				}
			}
			else {
				html=html+'<div class="dropdown-item py-0 px-1" onClick="selectLeadActivity(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedLeadActivity'+i+' value="'+value+'"><text  style="font-size: 0.8125rem;" for="selectedLeadActivity'+i+'">'+value+'</label></div></div>';
			}
		}
	}
	catch(e) {
		console.log(e.message);
	}
	i++;
});
$("#leadActivityMultiSelect").html(html);
$("#leadActivityMultiSelectParent").show().css("width", "100%");
$('#leadActivitySpin').hide();
}
function selectLeadActivity(event) {
debugger;
var $target = $(event.currentTarget),
val = $target.find('input[type="checkbox"]').attr('value'),
$inp = $target.find('input[type="checkbox"]'),
idx;

if(leadActivityOptions == "") {
	if($("#selecetdLeadActivity").val() != null && $("#selecetdLeadActivity").val() != "") {
		var leadActivityArray = $("#selecetdLeadActivity").val().split(",");
		$.each(leadActivityArray, function(i) {
			leadActivityOptions.push(leadActivityArray[i]);
		});
	} 
}

if ((idx = leadActivityOptions.indexOf(val)) > -1) {
	leadActivityOptions.splice(idx, 1);
	setTimeout(function() {$inp.prop('checked', false)}, 0);
	$inp.prop('checked', false).closest('.dropdown-item').removeClass("active");
}
else {
	if(leadActivityOptions.indexOf(val) == -1) {
		leadActivityOptions.push(val);
		setTimeout(function() {$inp.prop('checked', true)}, 0);
		$inp.prop('checked', true).closest('.dropdown-item').addClass("active");
	}
}
$("#leadActivityMultiSelectParent").dropdown('toggle');
//$("#leadActivityMultiSelectParent").show().css("width", "100%");
$("#selectedLeadActivity").val(leadActivityOptions);
selectLeadActivityChecked = true;
return false;
}

/* 
new code for hq country field: 
*/
function displayHqCountryDropdown(){
	$('#leadOwnerSearch').val('');
	$('#leadOwnerMultiSelectParent').hide();
	$('#assignedRepSearch').val('');
	$('#assignedRepMultiSelectParent').hide();
	$('#leadStatusSearch').val('');
	$('#leadStatusMultiSelectParent').hide();
	$('#leadActivitySearch').val('');
	$('#leadActivityMultiSelectParent').hide(); 
	
	debugger;
	$('#hqCountryDropdownSpin').show();
	
	$.ajax({
		url		:	"loadcountries.do",
		success	:	function(data) {
			if(data != null && data != "") {
				debugger;
				hqCountryDropdownObj = JSON.parse(data);
				var hqCountryDropdownVal = $("#selectedHqCountryDropdown").val().split(",");
				hqCountryDropdownProbabilityMap  = new Map();
				html = '';
				var i=0;
				$.each(hqCountryDropdownObj, function(key, value){
					if(hqCountryDropdownVal != null && hqCountryDropdownVal != "" && hqCountryDropdownVal.indexOf(value)>-1) {
						html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectHqCountryDropdown(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedHqCountryDropdown'+i+' value="'+value+'" checked><text style="font-size: 0.8125rem;"  for="selectedHqCountryDropdown'+i+'">'+key+'</label></div></div>';
					}
					else {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectHqCountryDropdown(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedHqCountryDropdown'+i+' value="'+value+'"><text  style="font-size: 0.8125rem;" for="selectedHqCountryDropdown'+i+'">'+key+'</label></div></div>';
					}
					i++;
					
					hqCountryDropdownProbabilityMap.set(key,value);
				});
				$("#hqCountryDropdownMultiSelect").html(html);
				$("#hqCountryDropdownMultiSelectParent").show().css("width", "100%");
				$('#hqCountryDropdownSpin').hide();
			}
		}
	});
}
	
function filterHqCountryDropdown() {
		html='';
		var i=0;
		if(hqCountryDropdownOptions == "") {
			if($("#selectedHqCountryDropdown").val() != null && $("#selectedHqCountryDropdown").val() != "") {
				var hqCountryDropdownArray = $("#selectedHqCountryDropdown").val().split(",");
				$.each(hqCountryDropdownArray, function(i) {
					hqCountryDropdownOptions.push(hqCountryDropdownArray[i]);
				});
			} 
		}
		
		$.each(hqCountryDropdownObj, function(key, value){
			var searchedText=$('#hqCountryDropdownSearch').val();
			try {
				if(key.toLowerCase().indexOf(searchedText.toLowerCase())>-1){
					if(hqCountryDropdownOptions.length>0) {
						if(hqCountryDropdownOptions.indexOf(key)>-1) {
							html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectHqCountryDropdown(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedHqCountryDropdown'+i+' value="'+value+'" checked><text style="font-size: 0.8125rem;"  for="selectedHqCountryDropdown'+i+'">'+key+'</label></div></div>';
						}
						else {
							html=html+'<div class="dropdown-item py-0 px-1" onClick="selectHqCountryDropdown(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedHqCountryDropdown'+i+' value="'+value+'"><text  style="font-size: 0.8125rem;" for="selectedHqCountryDropdown'+i+'">'+key+'</label></div></div>';
						}
					}
					else {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectHqCountryDropdown(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedHqCountryDropdown'+i+' value="'+value+'"><text  style="font-size: 0.8125rem;" for="selectedHqCountryDropdown'+i+'">'+key+'</label></div></div>';
					}
				}
			}
			catch(e) {
				console.log(e.message);
			}
			i++;
		});
		$("#hqCountryDropdownMultiSelect").html(html);
		$("#hqCountryDropdownMultiSelectParent").show().css("width", "100%");
		$('#hqCountryDropdownSpin').hide();
	}
function selectHqCountryDropdown(event) {
	 debugger;
		var $target = $(event.currentTarget),
		val = $target.find('input[type="checkbox"]').attr('value'),
		$inp = $target.find('input[type="checkbox"]'),
		idx;
		
		if(hqCountryDropdownOptions == "") {
			if($("#selecetdHqCountryDropdown").val() != null && $("#selecetdHqCountryDropdown").val() != "") {
				var hqCountryDropdownArray = $("#selecetdHqCountryDropdown").val().split(",");
				$.each(hqCountryDropdownArray, function(i) {
					hqCountryDropdownOptions.push(hqCountryDropdownArray[i]);
				});
			} 
		}
		
		if ((idx = hqCountryDropdownOptions.indexOf(val)) > -1) {
			hqCountryDropdownOptions.splice(idx, 1);
			setTimeout(function() {$inp.prop('checked', false)}, 0);
			$inp.prop('checked', false).closest('.dropdown-item').removeClass("active");
		}
		else {
			if(hqCountryDropdownOptions.indexOf(val) == -1) {
				hqCountryDropdownOptions.push(val);
				setTimeout(function() {$inp.prop('checked', true)}, 0);
				$inp.prop('checked', true).closest('.dropdown-item').addClass("active");
			}
		}
		$("#hqCountryDropdownMultiSelectParent").dropdown('toggle');
		//$("#hqCountryDropdownMultiSelectParent").show().css("width", "100%");
		$("#selectedHqCountryDropdown").val(hqCountryDropdownOptions);
		selectHqCountryDropdownChecked = true;
		return false;
	}
// for lead owner
function displayLeadOwner(){
	 $('#hqCountryDropdownSearch').val('');
		$('#hqCountryDropdownMultiSelectParent').hide();
		$('#assignedRepSearch').val('');
		$('#assignedRepMultiSelectParent').hide();
		$('#leadStatusSearch').val('');
		$('#leadStatusMultiSelectParent').hide();
		$('#leadActivitySearch').val('');
		$('#leadActivityMultiSelectParent').hide();
	 debugger;
	$('#leadOwnerSpin').show();
	
	var data= $("#leadownerhidden").val();
	
	if(data != null && data != "") {
		leadOwnerObj = JSON.parse(data);
		var leadOwnerVal = $("#selectedLeadOwner").val().split(",");
		leadOwnerProbabilityMap  = new Map();
		html = '';
		var i=0;
		$.each(leadOwnerObj, function(key, value){
			if(leadOwnerVal != null && leadOwnerVal != "" && leadOwnerVal.indexOf(key)>-1) {
				debugger;
				html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectLeadOwner(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedLeadOwner'+i+' value="'+key+'" checked><text style="font-size: 0.8125rem;"  for="selectedLeadOwner'+i+'">'+value+'</label></div></div>';
			}
			else {
				debugger;
				html=html+'<div class="dropdown-item py-0 px-1" onClick="selectLeadOwner(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedLeadOwner'+i+' value="'+key+'"><text  style="font-size: 0.8125rem;" for="selectedLeadOwner'+i+'">'+value+'</label></div></div>';
			}
			i++;
			
			leadOwnerProbabilityMap.set(key,value);
		});
		$("#leadOwnerMultiSelect").html(html);
		$("#leadOwnerMultiSelectParent").show().css("width", "100%");
		$('#leadOwnerSpin').hide();
		arrow=true;
	}
	
}
function filterLeadOwner() {
		html='';
		var i=0;
		if(leadOwnerOptions == "") {
			if($("#selectedSatge").val() != null && $("#selectedLeadOwner").val() != "") {
				var leadOwnerArray = $("#selectedLeadOwner").val().split(",");
				$.each(leadOwnerArray, function(i) {
					leadOwnerOptions.push(leadOwnerArray[i]);
				});
			} 
		}
		
		$.each(leadOwnerObj, function(key, value){
			var searchedText=$('#leadOwnerSearch').val();
			try {
				if(value.toLowerCase().indexOf(searchedText.toLowerCase())>-1){
					if(leadOwnerOptions.length>0) {
						if(leadOwnerOptions.indexOf(value)>-1) {
							html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectLeadOwner(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedLeadOwner'+i+' value="'+key+'" checked><text style="font-size: 0.8125rem;"  for="selectedLeadOwner'+i+'">'+value+'</label></div></div>';
						}
						else {
							html=html+'<div class="dropdown-item py-0 px-1" onClick="selectLeadOwner(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedLeadOwner'+i+' value="'+key+'"><text  style="font-size: 0.8125rem;" for="selectedLeadOwner'+i+'">'+value+'</label></div></div>';
						}
					}
					else {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectLeadOwner(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedLeadOwner'+i+' value="'+key+'"><text  style="font-size: 0.8125rem;" for="selectedLeadOwner'+i+'">'+value+'</label></div></div>';
					}
				}
			}
			catch(e) {
				console.log(e.message);
			}
			i++;
		});
		$("#leadOwnerMultiSelect").html(html);
		$("#leadOwnerMultiSelectParent").show().css("width", "100%");
		$('#leadOwnerSpin').hide();
	}
function selectLeadOwner(event) {
	 debugger;
		var $target = $(event.currentTarget),
		val = $target.find('input[type="checkbox"]').attr('value'),
		$inp = $target.find('input[type="checkbox"]'),
		idx;
		
		if(leadOwnerOptions == "") {
			if($("#selecetdLeadOwner").val() != null && $("#selecetdLeadOwner").val() != "") {
				var leadOwnerArray = $("#selecetdAssignedRep").val().split(",");
				$.each(leadOwnerArray, function(i) {
					leadOwnerOptions.push(leadOwnerArray[i]);
				});
			} 
		}
		
		if ((idx = leadOwnerOptions.indexOf(val)) > -1) {
			leadOwnerOptions.splice(idx, 1);
			setTimeout(function() {$inp.prop('checked', false)}, 0);
			$inp.prop('checked', false).closest('.dropdown-item').removeClass("active");
		}
		else {
			if(leadOwnerOptions.indexOf(val) == -1) {
				leadOwnerOptions.push(val);
				setTimeout(function() {$inp.prop('checked', true)}, 0);
				$inp.prop('checked', true).closest('.dropdown-item').addClass("active");
			}
		}
		$("#leadOwnerMultiSelectParent").dropdown('toggle');
		//$("#leadOwnerMultiSelectParent").show().css("width", "100%");
		$("#selectedLeadOwner").val(leadOwnerOptions);
		selectLeadOwnerChecked = true;
		return false;
	}
// assigned rep in search typ
function displayAssignedRep(){
	 $('#hqCountryDropdownSearch').val('');
	$('#hqCountryDropdownMultiSelectParent').hide();
	$('#leadOwnerSearch').val('');
	$('#leadOwnerMultiSelectParent').hide();
	$('#leadStatusSearch').val('');
	$('#leadStatusMultiSelectParent').hide();
	$('#leadActivitySearch').val('');
	$('#leadActivityMultiSelectParent').hide();
	 
	 debugger;
	$('#assignedRepSpin').show();
	var data= $("#assignedRephidden").val();
	if(data != null && data != "") {
		
		assignedRepObj = JSON.parse(data);
		var assignedRepVal = $("#selectedAssignedRep").val().split(",");
		assignedRepProbabilityMap  = new Map();
		html = '';
		var i=0;
		$.each(assignedRepObj, function(key, value){
			if(assignedRepVal != null && assignedRepVal != "" && assignedRepVal.indexOf(key)>-1) {
				html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectAssignedRep(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedAssignedRep'+i+' value="'+key+'" checked><text style="font-size: 0.8125rem;"  for="selectedAssignedRep'+i+'">'+value+'</label></div></div>';
			}
			else {
				html=html+'<div class="dropdown-item py-0 px-1" onClick="selectAssignedRep(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedAssignedRep'+i+' value="'+key+'"><text  style="font-size: 0.8125rem;" for="selectedAssignedRep'+i+'">'+value+'</label></div></div>';
			}
			i++;
			
			assignedRepProbabilityMap.set(key,value);
		});
		$("#assignedRepMultiSelect").html(html);
		$("#assignedRepMultiSelectParent").show().css("width", "100%");
		$('#assignedRepSpin').hide();
		arrow=true;
	}
	
}
function filterAssignedRep() {
		html='';
		var i=0;
		if(assignedRepOptions == "") {
			if($("#selectedAssignedRep").val() != null && $("#selectedAssignedRep").val() != "") {
				var assignedRepArray = $("#selectedAssignedRep").val().split(",");
				$.each(assignedRepArray, function(i) {
					assignedRepOptions.push(assignedRepArray[i]);
				});
			} 
		}
		
		$.each(assignedRepObj, function(key, value){
			var searchedText=$('#assignedRepSearch').val();
			try {
				if(value.toLowerCase().indexOf(searchedText.toLowerCase())>-1){
					if(assignedRepOptions.length>0) {
						if(assignedRepOptions.indexOf(value)>-1) {
							html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectAssignedRep(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedAssignedRep'+i+' value="'+key+'" checked><text style="font-size: 0.8125rem;"  for="selectedAssignedRep'+i+'">'+value+'</label></div></div>';
						}
						else {
							html=html+'<div class="dropdown-item py-0 px-1" onClick="selectAssignedRep(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedAssignedRep'+i+' value="'+key+'"><text  style="font-size: 0.8125rem;" for="selectedAssignedRep'+i+'">'+value+'</label></div></div>';
						}
					}
					else {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectAssignedRep(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedAssignedRep'+i+' value="'+key+'"><text  style="font-size: 0.8125rem;" for="selectedAssignedRep'+i+'">'+value+'</label></div></div>';
					}
				}
			}
			catch(e) {
				console.log(e.message);
			}
			i++;
		});
		$("#assignedRepMultiSelect").html(html);
		$("#assignedRepMultiSelectParent").show().css("width", "100%");
		$('#assignedRepSpin').hide();
	}
function selectAssignedRep(event) {
		var $target = $(event.currentTarget),
		val = $target.find('input[type="checkbox"]').attr('value'),
		$inp = $target.find('input[type="checkbox"]'),
		idx;
		
		if(assignedRepOptions == "") {
			if($("#selecetdAssignedRep").val() != null && $("#selecetdAssignedRep").val() != "") {
				var assignedRepArray = $("#selecetdAssignedRep").val().split(",");
				$.each(assignedRepArray, function(i) {
					assignedRepOptions.push(assignedRepArray[i]);
				});
			} 
		}
		
		if ((idx = assignedRepOptions.indexOf(val)) > -1) {
			assignedRepOptions.splice(idx, 1);
			setTimeout(function() {$inp.prop('checked', false)}, 0);
			$inp.prop('checked', false).closest('.dropdown-item').removeClass("active");
		}
		else {
			if(assignedRepOptions.indexOf(val) == -1) {
				assignedRepOptions.push(val);
				setTimeout(function() {$inp.prop('checked', true)}, 0);
				$inp.prop('checked', true).closest('.dropdown-item').addClass("active");
			}
		}
		$("#assignedRepMultiSelectParent").dropdown('toggle');
		//$("#assignedRepMultiSelectParent").show().css("width", "100%");
		$("#selectedAssignedRep").val(assignedRepOptions);
		selectAssignedRepChecked = true;
		return false;
	}

function deleteLeadContactData(){
	debugger;
	$("#leadDetailsLoader").show();
	$.ajax({
		url : "deleteLeadContactData.do?salesLeadId="+$("#sales_lead_id").val(),
		success: function(data)
		{
			$("#leadDetailsLoader").hide();
			
			if(data == "success"){
				$("#successMsg").html("* Record deleted successfully.").show();
				setTimeout(function(){
					$("#successMsg").html('');
					$('#newLeadBlk').slideUp('slow');
					$('#leadDatatableBlk').slideDown('slow');
					
					//$("#selectedRegion").val("");
					//$("#selectedLeadStatus").val("");
					//$("#selectedLeadActivity").val("");
					
					$('#leadViewTable').dataTable().fnClearTable();
					loadLeadViewRecords();
					if($("#selectedCompanyName").val() != null && $("#selectedCompanyName").val() != "") {
						debugger;
						fetchLeadViewRecordsBasedOnCompanyName();
					}
					else {
						fetchLeadViewRecords();
					}
				},3000);
			}
			else {
				$("#leadDetailsLoader").hide();
				$("#errorMsg").html("* exception occurred while deleting record in db, kindly check with development team.").show();
				setTimeout(function(){$('#errorMsg').html("");},validationMessageTimeout);
				enableButtons();
			} 
		},
		error: function(xhr, textStatus, errorThrow)
		{
			$("#leadDetailsLoader").hide();
			$("#errorMsg").html("* error occurred while deleting record in db, kindly check with development team.").show();
			setTimeout(function(){$('#errorMsg').html("");},validationMessageTimeout);
			enableButtons();
		}		
	});
}



function loadContacts() {
	
	$("#hooversCompanyTable, #hooversCompanyTable_wrapper").hide();
	$("#loadContactTable, #loadContactTable_wrapper").show();
	$("#loadContactTable").DataTable();
	$('#loadContactTable').dataTable().fnClearTable();
	
	if($("#company_company_id").val() != null && $("#company_company_id").val() != "" && $("#company_company_id").val() != 0) {
		$("#dunsMsg").show();
		
		var arr = {companyid:$("#company_company_id").val(),firstname:trimValue($('#firstname').val()),lastname:trimValue($('#lastname').val()),jobtitle:trimValue($('#jobtitle').val()),
				jobfunction:trimValue($('#jobfunction').val()),senioritylevel:trimValue($('#senioritylevel').val())};
		
		$.ajax({
			url:'loadContacts.do',
			data: encodeURIComponent(JSON.stringify(arr)),
			success: function(data, textStatus, xhr)
			{
				$("#dunsMsg").hide();
				$('#loadContactTable').dataTable().fnClearTable();
				if(data != null) {
					data = JSON.parse(data);

					for (var key in data){
						debugger;
						recLoadContactArr = data;
						if(data[key].corp_email=='test_alice.tertrais@airfrance.com'){
							console.log(data[key]);
						}
						var firstName = '';
						var lastName = '';
						var email = '';
						var companyName = '';
						var jobTitle = '';
						
						if(data[key].firstname != null && data[key].firstname != "" && data[key].firstname != undefined) {
							firstName = data[key].firstname;
						}
						if(data[key].lastname != null && data[key].lastname != "" && data[key].lastname != undefined) {
							lastName = data[key].lastname;
						}
						if(data[key].corp_email != null && data[key].corp_email != "" && data[key].corp_email != undefined) {
							email = data[key].corp_email;
						}
						if(data[key].companyname != null && data[key].companyname != "" && data[key].companyname != undefined) {
							companyName = data[key].companyname;
						}
						if(data[key].jobtitle != null && data[key].jobtitle != "" && data[key].jobtitle != undefined) {
							jobTitle = data[key].jobtitle;
						}
						
						$('#loadContactTable').dataTable().fnAddData([firstName,lastName,email,companyName,jobTitle,"<button name='dunsNmbrSelect' type='button' class='btn btn-warning btn-xs' onClick='loadSelectedContact("+key+")'"+""+">Load Contact</button>"]);
					}
				}
				else {
					
				}
			},
			error: function(xhr, textStatus, errorThrow)
			{
				$("#leadViewLoader").hide();
				var row = $(this).closest('tr');
				var nRow = row[0];
				$('#leadViewTable').dataTable().fnDeleteRow(nRow);
				
				$("#loadContactsMsg").html('* error occurred while fetching lead view records, kindly check with development team.').show();
				setTimeout(function(){$('#loadContactsMsg').html("").hide();},2000);
			}
		}) 
	}
	else {
		$("#loadContactsMsg").html('* Kindly first click on checkMSOR and then loadMSOR button.').show();
		setTimeout(function(){$('#loadContactsMsg').html("").hide();},2000);
	}
}

function loadSelectedContact(index) {
	
	recLoadContact=recLoadContactArr[index];
	
	if(recLoadContact != null && recLoadContact != '') {
		if(recLoadContact.firstname != null && recLoadContact.firstname != "") {
			$("#firstname").val(recLoadContact.firstname);
			$("#firstname").removeClass("error");
			$("#firstname-error").hide();
		}
		if(recLoadContact.middlename != null && recLoadContact.middlename != "") {
			$("#middlename").val(recLoadContact.middlename);
		}
		if(recLoadContact.lastname != null && recLoadContact.lastname != "") {
			$("#lastname").val(recLoadContact.lastname);
			$("#lastname").removeClass("error");
			$("#lastname-error").hide();
		}
		if(recLoadContact.fullname != null && recLoadContact.fullname != "") {
			$("#fullname").val(recLoadContact.fullname);
		}
		if(recLoadContact.corp_email != null && recLoadContact.corp_email != "") {
			$("#corporate_email").val(recLoadContact.corp_email);
			$("#piplCemailHandleId").removeClass("ehandle").attr("disabled", false);
			$("#corporate_email").removeClass("error");
			$("#corporate_email-error").hide();
		}
		else{
			$("#piplCemailHandleId").addClass("ehandle").attr("disabled", true);
		}
		
		if(recLoadContact.jobfunction != null && recLoadContact.jobfunction != "") {
			$("#jobfunction").val(recLoadContact.jobfunction);
		}
		if(recLoadContact.jobtitle != null && recLoadContact.jobtitle != "") {
			$("#jobtitle").val(recLoadContact.jobtitle);
			$("#jobtitle").removeClass("error");
			$("#jobtitle-error").hide();
		}
		if(recLoadContact.seniority_level != null && recLoadContact.seniority_level != "") {
			$("#senioritylevel").val(recLoadContact.seniority_level);
		}
		if(recLoadContact.branchphone != null && recLoadContact.branchphone != "") {
			$("#branchphone").val(recLoadContact.branchphone);
		}
		if(recLoadContact.mobilephone != null && recLoadContact.mobilephone != "") {
			$("#mobilephone").val(recLoadContact.mobilephone);
		}
		if(recLoadContact.directphone != null && recLoadContact.directphone != "") {
			$("#directphone").val(recLoadContact.directphone);
		}
		if(recLoadContact.directphone_ext != null && recLoadContact.directphone_ext != "") {
			$("#directphone_ext").val(recLoadContact.directphone_ext);
		}
		if(recLoadContact.address1 != null && recLoadContact.address1 != "") {
			$("#street").val(recLoadContact.address1);
		}
		if(recLoadContact.city != null && recLoadContact.city != "") {
			$("#city").val(recLoadContact.city);
		}
		if(recLoadContact.state != null && recLoadContact.state != "") {
			$("#state").val(recLoadContact.state);
		}
		if(recLoadContact.country != null && recLoadContact.country != "") {
			$("#country").val(recLoadContact.country);
			$("#country").removeClass("error");
			$("#country-error").hide();
		}
		if(recLoadContact.zip != null && recLoadContact.zip != "") {
			$("#postalcode").val(recLoadContact.zip);
		}
		/* if(recLoadContact.companyname != null && recLoadContact.companyname != "") {
			$("#contact_companyname").val(recLoadContact.companyname);
		} */
		if(recLoadContact.private_email != null && recLoadContact.private_email != "") {
			$("#private_email").val(recLoadContact.private_email);
			$("#piplPemailHandleId").removeClass("ehandle").attr("disabled", false);
		}
		else {
			$("#piplPemailHandleId").addClass("ehandle").attr("disabled", true);
		}
		if(recLoadContact.private_email2 != null && recLoadContact.private_email2 != "") {
			$("#private_email2").val(recLoadContact.private_email2);
			$("#piplP2emailHandleId").removeClass("ehandle").attr("disabled", false);
		}
		else {
			$("#piplP2emailHandleId").addClass("ehandle").attr("disabled", true);
		}
		if(recLoadContact.private_email3 != null && recLoadContact.private_email3 != "") {
			$("#private_email3").val(recLoadContact.private_email3);
			$("#piplP3emailHandleId").removeClass("ehandle").attr("disabled", false);
		}
		else {
			$("#piplP3emailHandleId").addClass("ehandle").attr("disabled", true);
		}
		if(recLoadContact.linkedinhandle != null && recLoadContact.linkedinhandle != "") {
			$("#linkedinhandle").val(recLoadContact.linkedinhandle);
			$("#linkedinHandleId").removeClass("ehandle").attr("disabled", false);
			$("#piplLinkedInHandleId").removeClass("ehandle").attr("disabled", false);
		}
		else {
			$("#linkedinHandleId").addClass("ehandle").attr("disabled", true);
			$("#piplLinkedInHandleId").addClass("ehandle").attr("disabled", true);
		}
		if(recLoadContact.facebookhandle != null && recLoadContact.facebookhandle != "") {
			$("#facebookhandle").val(recLoadContact.facebookhandle);
			$("#facebookHandleId").removeClass("ehandle").attr("disabled", false);
		}
		else {
			$("#facebookHandleId").addClass("ehandle").attr("disabled", true);
		}
		if(recLoadContact.twitter_handle != null && recLoadContact.twitter_handle != "") {
			$("#twitterhandle").val(recLoadContact.twitter_handle);
			$("#twitterhandleId").removeClass("ehandle").attr("disabled", false);
		}
		else {
			$("#twitterhandleId").addClass("ehandle").attr("disabled", true);
		}
		if(recLoadContact.xingHandle != null && recLoadContact.xingHandle != "") {
			$("#xinghandle").val(recLoadContact.xingHandle);
			$("#xingHandleId").removeClass("ehandle").attr("disabled", false);
		}
		else {
			$("#xingHandleId").addClass("ehandle").attr("disabled", true);
		}
		if(recLoadContact.viadeolinkhandle != null && recLoadContact.viadeolinkhandle != "") {
			$("#viadeolinkhandle").val(recLoadContact.viadeolinkhandle);
			$("#viadeoLinkHandleId").removeClass("ehandle").attr("disabled", false);
		}
		else {
			$("#viadeoLinkHandleId").addClass("ehandle").attr("disabled", true);
		}
		if(recLoadContact.miscLink != null && recLoadContact.miscLink != "") {
			$("#miscLinkHndleID").val(recLoadContact.miscLink);
			$("#miscLinkId").removeClass("ehandle").attr("disabled", false);
		}
		else {
			$("#miscLinkId").addClass("ehandle").attr("disabled", true);
		}
	}
} 


function updateRowInDataTable(){
	debugger;
	var index=$("#indexOfRow").val();
	var indexint= parseInt(index , 10);
	var d = new Date();
	var h=d.getHours(); 
	var m=d.getMinutes(); 
	var s=d.getSeconds();
	var time="-"+h+":"+m+":"+s;
		
	var firstName = trimValue($('#firstname').val());
	var lastname=trimValue($('#lastname').val());
	var region=$("#contact_region").val();
	var companyname=trimValue($('#company_companyname').val());
	var state=trimValue($('#hq_state').val())
	var country=trimValue($('#country').val());
	var assigned_salesrep=$("#assigned_salesrep").val();
	var lead_status=$("#lead_status").val();
	var last_activity=$("#last_activity").val();
	var assign_inside_salesrep=$("#assign_inside_salesrep").val();
	
	var lastActivityDate = "";
	var callBackDateTime ="";
	lastActivityDateForRowUpdate =d;
	
	if(lastActivityDateForRowUpdate != null && lastActivityDateForRowUpdate != "" && lastActivityDateForRowUpdate != undefined) {
		lastActivityDate = lastActivityDateForRowUpdate;
		lastActivityDate = new Date(lastActivityDate);
		var date = lastActivityDate.getDate();
	    var month = lastActivityDate.getMonth()+1;
	    var hours = lastActivityDate.getHours();
	    var minutes = lastActivityDate.getMinutes();
	    var seconds = lastActivityDate.getSeconds();
	    lastActivityDate = ((date <= 9 ? '0'+date : date)+"/"+(month <= 9 ? '0'+month : month))+"/"+lastActivityDate.getFullYear()+" - "+(hours <= 9 ? '0'+hours : hours)+":"+(minutes <= 9 ? '0'+minutes : minutes)+":"+(seconds <= 9 ? '0'+seconds : seconds);
	    lastActivityDate= "<label>"+lastActivityDate+"</label>";
	}else if(recLeadView.LastActivityDate !=null && recLeadView.LastActivityDate !=""){
		lastActivityDate = recLeadView.LastActivityDate;
	}
	
	if(callBackDateTimeForRowUpdate != null && callBackDateTimeForRowUpdate != "" && callBackDateTimeForRowUpdate != undefined) {
		callBackDateTime = callBackDateTimeForRowUpdate;
		callBackDateTime = new Date(callBackDateTime);
		var date = callBackDateTime.getDate();
	    var month = callBackDateTime.getMonth()+1;
	    var hours = callBackDateTime.getHours();
	    var minutes = callBackDateTime.getMinutes();
	    var seconds = callBackDateTime.getSeconds();
	    callBackDateTime = ((date <= 9 ? '0'+date : date)+"/"+(month <= 9 ? '0'+month : month))+"/"+callBackDateTime.getFullYear()+" - "+(hours <= 9 ? '0'+hours : hours)+":"+(minutes <= 9 ? '0'+minutes : minutes)+":"+(seconds <= 9 ? '0'+seconds : seconds);
	    callBackDateTime ="<label>"+callBackDateTime+"</label>";
	}else if(recLeadView.callBackDateTime !=null && recLeadView.callBackDateTime !=""){
		callBackDateTime = recLeadView.callBackDateTime;
	}
		
			
	debugger;

	var table = $('#leadViewTable').DataTable();
	
	var leadSourceAlias = "";
	var leadSource = $("#hidden_lead_source_alias").val();
	if(leadSource != null && leadSourceAlias !="") {
		leadSource = JSON.parse(leadSource);
		leadSource = leadSource.join();
		var strarray = leadSource.split(",");
		
		for (var i = 0; i < strarray.length; i++) {
			leadSourceAlias = leadSourceAlias + strarray[i]+"|";
		}
		if(leadSourceAlias != null && leadSourceAlias != "") {
			leadSourceAlias = leadSourceAlias.substring(0, leadSourceAlias.lastIndexOf("|"));
		}
	}
	
	table.cell({row: indexint, column:2}).data(firstName); 
	table.cell({row: indexint, column:3}).data(lastname);
	table.cell({row: indexint, column:4}).data(region);
	table.cell({row: indexint, column:5}).data(companyname);
	table.cell({row: indexint, column:6}).data(state);
	table.cell({row: indexint, column:7}).data(country);
	table.cell({row: indexint, column:8}).data(assigned_salesrep);
	table.cell({row: indexint, column:9}).data(assign_inside_salesrep);
	table.cell({row: indexint, column:10}).data(lead_status);
	table.cell({row: indexint, column:11}).data(last_activity);
	table.cell({row: indexint, column:12}).data(lastActivityDate);
	table.cell({row: indexint, column:13}).data(callBackDateTime);
	table.cell({row: indexint, column:14}).data(leadSourceAlias);
	
	$('#container').css('display','block');
	table.columns.adjust().draw();
	
	$("#indexOfRow").val("");
}

function updateCheckMSOR() {
	if($('#company_companyname').val()=='')
	{
		$("#companyNameMsg").html("* Kindly provide Company name").show();
		setTimeout(function(){$('#companyNameMsg').html("");},4000);
		return false;
	}
	if($('#hq_country').val()=='')
	{
		$("#hqCountryMsg").html("* Kindly provide Country").show();
		setTimeout(function(){$('#hqCountryMsg').html("");},4000);
		return false;
	}
	else {
		var regex = /^[A-Z a-z]{2}$/; 
		var result = regex.test($('#hq_country').val().trim());
		if (!result) {
			$('#hqCountryMsg').show().html('* country must be two characters only.');
		    setTimeout(function(){$('#hqCountryMsg').html("");},3000);
			return false;
		}
	}
	
	disableButtons();
	$('#use_hq_address').prop('disabled', true);
	
	$("#msorMsg").show();
	
	$("#hooversCompanyTable, #hooversCompanyTable_wrapper").show();
	$('#hooversCompanyTable').dataTable().fnClearTable();
	$("#loadContactTable, #loadContactTable_wrapper").hide();
	
	$.ajax({
		url : "fetchMSORdata.do?companyName="+encodeURIComponent($("#company_companyname").val())+"&country="+$("#hq_country").val(),
		success : function(result, textStatus, xhr) {
			onchangeDone = true;
			var jsonData=JSON.parse(result);
			$("#msorMsg").hide();
			if(jsonData.result == "success") {	
				$('#hooversCompanyTable').dataTable().fnClearTable();

				var jsonArray = jsonData.jsonArray;
				var jsonArrayLength = jsonData.jsonArray.length;
				recMsorArray=jsonArray;
				
				if(jsonArrayLength > 0) {
					for(var i=0; i<jsonArrayLength; i++) {
						$('#hooversCompanyTable').dataTable().fnAddData([jsonArray[i].dunsnumber,jsonArray[i].hqphone,jsonArray[i].companyname,jsonArray[i].hqaddress1,jsonArray[i].hqcity,jsonArray[i].hq_state,jsonArray[i].hqzip,jsonArray[i].hqcountry,"<input name='dunsNmbrSelect' type='radio' onClick='fillDunsNmbrForMSOR("+i+")'"+" style='box-shadow:none'"+"/>"]);
					}
				}
				enableButtons();
				$('#use_hq_address').prop('disabled', false);
			}
			else {
				enableButtons();
				
        		$("#errorMsg").addClass("alert-danger");
				$('#errorMsg').show().html('* Exception occurred while fetching records from elastic search.');
				setTimeout(function(){
					$('#errorMsg').hide();
        		},2000);  
			}
		},
		error: function(xhr, textStatus, errorThrow)
		{
			var row = $(this).closest('tr');
			var nRow = row[0];
			$('#hooversCompanyTable').dataTable().fnDeleteRow(nRow);
			
			enableButtons();
			
			$("#errorMsg").html("* Error occurred while fetching records from elastic search.").show();
			setTimeout(function(){$('#errorMsg').html("");},validationMessageTimeout);
			$("#msorMsg").hide();
			
			enableButtons();
			$('#use_hq_address').prop('disabled', false);
		}
	});
}

function fillDunsNmbrForMSOR(index)
{
	
	recMSOR=recMsorArray[index];
	$("#company_company_id").val(recMSOR.companyid);
	//$("#dunsnumber").val(recMSOR.dunsnumber);
	$("#hidden_duns_number").val(recMSOR.dunsnumber);
	
	document.getElementById('loadMSOR').disabled = false;
}

function callLoadMSOR() {
	if($('#dunsnumber').val()!='') {
		document.getElementById('loadMSOR').disabled = false;
	}
	else {
		document.getElementById('loadMSOR').disabled = true;
	}
}

function updateLoadMSOR(){
	if($('#dunsnumber').val()!=null && $('#dunsnumber').val()!='' && $('#hidden_duns_number').val()!=null && $('#hidden_duns_number').val()!='' && $('#dunsnumber').val() != $('#hidden_duns_number').val()) {
		$.confirm({
			'message'	: 'Are you sure you want to load msor details with the new duns number?',
			'buttons'	: {
				'<span class="fa fa-check fa-2x" aria-hidden="true"></span> Yes'	: {
					'class'	: 'yes',
					'action': function(){
						loadMSORDetails();
					}
				},
				'<span class="fa fa-times fa-2x" aria-hidden="true"></span>  No'	: {
					'class'	: 'no',
					'action': function(){
						//$("#dunsnumber").val($('#hidden_duns_number').val());
					}	// Nothing to do in this case. You can as well omit the action property.
				}
			}
		});
	}
	else {
		loadMSORDetails();
	}
}

function loadMSORDetails(){
	
	if($('#hidden_duns_number').val()!='') {
		if(! $.isNumeric($('#hidden_duns_number').val()))
		{
			$("#dunsNoMsg").html("* Duns number can be numeric only.").show();
			setTimeout(function(){$('#dunsNoMsg').html("");},4000);
			return false;
		}
		if($.isNumeric($('#hidden_duns_number').val()) && ($('#hidden_duns_number').val().length > 9 || $('#hidden_duns_number').val().length < 9)) {
			$("#dunsNoMsg").html("* Duns number needs to be 9 characters only.").show();
			setTimeout(function(){$('#dunsNoMsg').html("");},4000);
			return false;
		}	
		
		queryString = "?dunsnumber="+$('#hidden_duns_number').val();
		finalURL= 'fetchMsorDataBasedOnDunsNumber.do'+queryString;
	}
	else {
		
		queryString = "?companyid="+$('#company_company_id').val();
		finalURL= 'fetchMsorDataBasedOnCompanyId.do'+queryString;
	}
		disableButtons();
		
		$("#msorMsg").show();
		
		$.ajax({
			url:finalURL,
			success: function(data, textStatus, xhr)
			{
				$("#msorMsg").hide();
				var jsonData=JSON.parse(data);
				if(jsonData.result == true) {				
					var recMSOR = jsonData.companyJson;

					if(recMSOR.companyname != null && recMSOR.companyname != "") {
						$("#company_companyname").val(recMSOR.companyname);
					}
					if(recMSOR.hq_phone != null && recMSOR.hq_phone != "") {
						if(recMSOR.fax != null && recMSOR.fax != "") {
							$("#hq_phone").val(recMSOR.hq_phone.trim()); 
							$("#fax").val(recMSOR.fax.trim());
						}
						else {
							$("#hq_phone").val(recMSOR.hq_phone.trim()); 
							$("#fax").val("");
						}
					}else{
						if(recMSOR.fax != null && recMSOR.fax != "") {
							$("#hq_phone").val(recMSOR.fax.trim());
							$("#fax").val(recMSOR.fax.trim());
						}
						else {
							$("#hq_phone").val("");
							$("#fax").val("");
						}
					}
					if(recMSOR.employeetotal != null && recMSOR.employeetotal != "") {
						$("#employee").val(recMSOR.employeetotal);
					}
					if($("#revenue").val() != null && $("#revenue").val() != "" && $("#revenue").val() > 0) {
						if(recMSOR.revenue != null && recMSOR.revenue != "") {
							if($("#src_revenue").val() != null && $("#src_revenue").val() != "") {
								if($("#src_revenue").val() == "0" || $("#src_revenue").val().trim().toLowerCase() == "hoovers" || $("#src_revenue").val().trim().toLowerCase() == "dnb") {
									$("#revenue").val(recMSOR.revenue.trim());
								}
							}
							else {
								$("#revenue").val(recMSOR.revenue.trim());
							}
						}
					}
					else {
						if(recMSOR.revenue != null && recMSOR.revenue != "") {
							$("#revenue").val(recMSOR.revenue.trim()); 
						}else{
							$("#revenue").val("");
						}
					}
					if(recMSOR.address1 != null && recMSOR.address1 != "") {
						$("#hq_street").val(recMSOR.address1);
						$("#hq_street").removeClass("error");
						$("#hq_street-error").hide();
					}
					if(recMSOR.city != null && recMSOR.city != "") {
						$("#hq_city").val(recMSOR.city);
					}
					if(recMSOR.state != null && recMSOR.state != "") {
						$("#hq_state").val(recMSOR.state);
					}
					if(recMSOR.country != null && recMSOR.country != "") {
						$("#hq_country").val(recMSOR.country);
					}
					if(recMSOR.zip != null && recMSOR.zip != "") {
						$("#hq_postalcode").val(recMSOR.zip);
					}
					//if(recMSOR.dunsnumber != null && recMSOR.dunsnumber != "") {
						$("#dunsnumber").val(recMSOR.dunsnumber);
					//}
					if(recMSOR.industry != null && recMSOR.industry != "") {
						$("#industry").val(recMSOR.industry);
					}
					if(recMSOR.website != null && recMSOR.website != "") {
						$("#website").val(recMSOR.website);
						$("#website").removeClass("error");
						$("#website-error").hide();
					}
					if(recMSOR.ultimate_duns != null && recMSOR.ultimate_duns != "") {
						$("#ultimate_duns").val(recMSOR.ultimate_duns);
					}
					if(recMSOR.locationtype != null && recMSOR.locationtype != "") {
						$("#locationtype").val(recMSOR.locationtype);
					}
					if(recMSOR.SIC != null && recMSOR.SIC != "") {
						$("#SIC").val(recMSOR.SIC);
					}
					if(recMSOR.NAICS != null && recMSOR.NAICS != "") {
						$("#NAICS").val(recMSOR.NAICS);
					}
					if(recMSOR.description != null && recMSOR.description != "") {
						$("#description").val(recMSOR.description);
					}
					if(recMSOR.longitude != null && recMSOR.longitude != "") {
						$("#longitude").val(recMSOR.longitude);
					}
					if(recMSOR.latitude != null && recMSOR.latitude != "") {
						$("#latitude").val(recMSOR.latitude);
					}
					if(recMSOR.region != null && recMSOR.region != "") {
						$("#region").val(recMSOR.region);
					}
					if(recMSOR.companytype != null && recMSOR.companytype != "") {
						$("#companytype").val(recMSOR.companytype);
					}
					if(recMSOR.Parent_Duns_No != null && recMSOR.Parent_Duns_No != "") {
						$("#Parent_Duns_No").val(recMSOR.Parent_Duns_No);
					}
					if(recMSOR.src_employeetotal != null && recMSOR.src_employeetotal != "") {
						$("#src_employeetotal").val(recMSOR.src_employeetotal);
					}
					if(recMSOR.src_revenue != null && recMSOR.src_revenue != "") {
						$("#src_revenue").val(recMSOR.src_revenue);
					}
					if(recMSOR.src_industry != null && recMSOR.src_industry != "") {
						$("#src_industry").val(recMSOR.src_industry);
					}
					if(recMSOR.immediate_parent != null && recMSOR.immediate_parent != "") {
						$("#immediate_parent").val(recMSOR.immediate_parent);
					}
					if(recMSOR.hq_linkedinurl != null && recMSOR.hq_linkedinurl != "") {
						$("#complinkedinhandle").val(recMSOR.hq_linkedinurl);
					}
					if(recMSOR.NationalRegNumber != null && recMSOR.NationalRegNumber != "") {
						$("#national_reg_number").val(recMSOR.NationalRegNumber);
					}	
					
					if(recMSOR.tradingCompanyName != null && recMSOR.tradingCompanyName != "") {
						$("#tradingcompanyname").val(recMSOR.tradingCompanyName);
					}
					
					document.getElementById('googleAPI').disabled = false;
					document.getElementById('sendContact').disabled = false;
					document.getElementById('resetContact').disabled = false;
					document.getElementById('deleteLead').disabled = false;
					document.getElementById('callbackBtn').disabled=false;
					document.getElementById('checkMSOR').disabled = false;
					document.getElementById('loadMSOR').disabled = true;
					document.getElementById('loadContact').disabled = false;
					document.getElementById('resetCompanyData').disabled = false;
					document.getElementById('mapButton').disabled = false;
					if($("#website").val() != null && $("#website").val() != "") {
						document.getElementById('websiteButton').disabled = false;
					}
					else {
						document.getElementById('websiteButton').disabled = true;
					}
				    $('#use_hq_address').prop('disabled', false);
				}
				else {
					$("#msorMsg").hide();
					document.getElementById('googleAPI').disabled = false;
					document.getElementById('sendContact').disabled = false;
					document.getElementById('resetContact').disabled = false;
					document.getElementById('deleteLead').disabled = false;
					document.getElementById('callbackBtn').disabled=false;
					document.getElementById('checkMSOR').disabled = false;
					document.getElementById('loadMSOR').disabled = true;
					document.getElementById('loadContact').disabled = false;
					document.getElementById('resetCompanyData').disabled = false;
					document.getElementById('mapButton').disabled = false;
					if($("#website").val() != null && $("#website").val() != "") {
						document.getElementById('websiteButton').disabled = false;
					}
					else {
						document.getElementById('websiteButton').disabled = true;
					}
				    $('#use_hq_address').prop('disabled', false);
				    
	        		$("#errorMsg").addClass("alert-danger");
					$('#errorMsg').show().html('* There are no company details corressponding to this duns number, kindly recheck.');
					setTimeout(function(){
						$('#errorMsg').hide();
	        		},2000);  
				}
			},
			error: function(xhr, textStatus, errorThrow)
			{
				document.getElementById('googleAPI').disabled = false;
				document.getElementById('sendContact').disabled = false;
				document.getElementById('resetContact').disabled = false;
				document.getElementById('deleteLead').disabled = false;
				document.getElementById('callbackBtn').disabled=false;
				document.getElementById('checkMSOR').disabled = false;
				document.getElementById('loadMSOR').disabled = true;
				document.getElementById('loadContact').disabled = false;
				document.getElementById('resetCompanyData').disabled = false;
				document.getElementById('mapButton').disabled = false;
				if($("#website").val() != null && $("#website").val() != "") {
					document.getElementById('websiteButton').disabled = false;
				}
				else {
					document.getElementById('websiteButton').disabled = true;
				}
			    $('#use_hq_address').prop('disabled', false);
			    
				$("#errorMsg").html("* Error occurred while loading records from msor.").show();
				setTimeout(function(){$('#errorMsg').html("");},validationMessageTimeout);
			}
		});
	/* }
	else{
		document.getElementById('loadMSOR').disabled = true;
		$("#errorMsg").html("* Duns number is blank.").show();
		setTimeout(function(){$('#errorMsg').html("");},6000);
		
	} */
	if($("#website").val() != null && $("#website").val() != "") {
		 document.getElementById('websiteButton').disabled = false;
	}
	else {
		 document.getElementById('websiteButton').disabled = true;
	}
}

//selecting companyname or contactname base for datatable to show.
function selectCompanyContactName(){
	debugger;
	if($("#selectedCompanyName").val() != null && $("#selectedCompanyName").val() != ""){
		$("#selectedCompanyName").val("");
	}
	var dropdown=$("#selectCompanyContact").val();
	if(dropdown=="company_name"){
		$('#selectedCompanyName').attr('placeholder', 'Enter Company Name');
		$('#selectedCompanyName').show();
		//fetchLeadViewRecordsBasedOnCompanyName();
	}
	else if(dropdown=="contact_name"){
		$('#selectedCompanyName').attr('placeholder', 'Enter Contact Name');
		$('#selectedCompanyName').show();
		//fetchLeadViewRecordsBasedOnCompanyName();
	}
	else{
		$('#selectedCompanyName').hide();
	}
	
}


function saveAppointment(targetDate) {
	if($("#outlookApp").is(':checked')) {
		var callBackData = {companyName:$("#company_companyname").val(),reason:$("#callReason").val(),startDate:targetDate.getTime(),
			hqPhone:$("#hq_phone").val(),mobilePhone:$("#mobilephone").val(),directPhone:$("#directphone").val(),branchPhone:$("#branchphone").val(),
			corporateEmail:$("#corporate_email").val(),firstname:$("#firstname").val(),lastname:$("#lastname").val(),userName:loginUserName};
		
		$.ajax({	
			url:"saveAppointment.do",
			data:callBackData,
			type:'POST',
			success: function(json, textStatus, xhr)
			{
				console.log("appointment saved successfully");
			},
			error: function(xhr, textStatus, errorThrow){
				console.log("error occurred while saving the appointment");
			}
		});
	}
}

function fetchSelectedLeadData(salesLeadId){
	currentId = salesLeadId;
	$.ajax({
		url:'fetchMsorCoidDetails.do?salesLeadId='+currentId,
		success: function(data, textStatus, xhr)
		{
			$("#leadDetailsLoader").hide();
			enableButtons();
			
			if(data != null && data != "") {
				data=JSON.parse(data);
				previousData = data ;
				loadAssignSalesRep();
				loadAssignAM();
				loadAssignInsideSalesRep();
				openCloneLead();
				prefillOnlyCompanyDetails(data);
			}
				else {
					$("#errorMsg").html("* There is no record corresponding to this contact id, kindly check with development team.").show();
					setTimeout(function(){$('#errorMsg').html("");},validationMessageTimeout);
				}
		},
		error: function(xhr, textStatus, errorThrow)
		{
			$("#leadDetailsLoader").hide();
			enableButtons();
			$("#errorMsg").html("* error occurred while fetching contact details corresponding to given coid, kindly check with development team.").show();
			setTimeout(function(){$('#errorMsg').html("");},validationMessageTimeout);
		}		
	});
}

function loadAssignInsideSalesRep(){
	debugger;
	var assignAM = $("#assign_inside_salesrep").val();
	
	$("#assignInsideSalesRepForm").trigger('reset');
	$('#insideSalesRepLoadAgentList').show();
	var DataAgentList = document.getElementById("insideSalesRepDataAgentList");
	var ListmodalHTML='<input type="hidden" name="InsideSalesRepAgentOrderID" id="InsideSalesRepAgentOrderID"/>';
	DataAgentList.innerHTML = '';
	$.ajax({
		url:"loadAssignInsideSalesRepList.do",
		success: function(data){	
			$('#insideSalesRepLoadAgentList').hide();
			var peopleList= jQuery.parseJSON(data);
			//objData= sortJSON(peopleList, 'Checked');	 	
			if(peopleList.length > 0){
				for (var key in peopleList) {	
					if(peopleList[key].mail == assignAM){
						ListmodalHTML = ListmodalHTML + '<div class="checkbox"> <label id="insidesalesrepassignname_'+key+'"><input type="radio" name="insideSalesRepRadiobutton" value="'+ peopleList[key].mail +'"checked>' + peopleList[key].Name + ' - <small class="text-muted">'+peopleList[key].mail+'</small></label></div>';
					}else{
						ListmodalHTML = ListmodalHTML + '<div class="checkbox"> <label id="insidesalesrepassignname_'+key+'"><input type="radio" name="insideSalesRepRadiobutton" value="'+ peopleList[key].mail +'">' + peopleList[key].Name + ' - <small class="text-muted">'+peopleList[key].mail+'</small></label></div>';
					}
				}
			}else{
				ListmodalHTML = ListmodalHTML + '<div class="checkbox"> <label> No records Found, Please Try Again </label></div>';	
			}
			DataAgentList.innerHTML = ListmodalHTML; 
		},
		statusCode: {
		    400: function() {
				$("#insideSalesRepErrorAgent").html("* client error please try again.").show();
		    },
		    500: function() {
				$("#insideSalesRepErrorAgent").html("* Internal Server Error, Please Try Again").show();
		    }	  	
	    },
		error: function(xhr, textStatus, errorThrow){
			$("#assignInsideSalesRepModal").hide();
			$("#insideSalesRepErrorAgent").html("Please Try Again").show();
		}
	});	 		    
}

function loadPreviousActivityHistoryRecord(){
	$("#previousActivityHistory").html("");
	console.log(seconds_with_leading_zeros(new Date()));
	
	var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	//var timezone = seconds_with_leading_zeros(new Date());
	$.ajax({
		url : "loadPreviousActivityHistoryRecord.do?salesLeadId="+$("#sales_lead_id").val(),
		success : function(data){
			$("#activityHistoryLoader").hide();
        	if(data != null && data != "") {
        		
        		var uniqueArray = removeDuplicates(data, "activitynotes", "last_activity");
        		//console.log("uniqueArray is: " + JSON.stringify(uniqueArray));
        		
        		for(var key in uniqueArray) {
        			var updatedon = "";
        			if(uniqueArray[key].activitynotestime != null && uniqueArray[key].activitynotestime != "") {
        				updatedon = uniqueArray[key].activitynotestime;
        				updatedon = new Date(updatedon);
        				var date = updatedon.getDate();
        			    var month = updatedon.getMonth()+1;
        			    var hours = updatedon.getHours();
        			    var minutes = updatedon.getMinutes();
        			    updatedon = ((date <= 9 ? '0'+date : date)+"/"+(month <= 9 ? '0'+month : month))+"/"+updatedon.getFullYear()+" - "+(hours <= 9 ? '0'+hours : hours)+":"+(minutes <= 9 ? '0'+minutes : minutes);
        			} 
					
        			if(uniqueArray[key].last_activity != null && uniqueArray[key].last_activity != "") {
        				$("#previousActivityHistory").append("<p class='activityTime'>"+updatedon+"<span>"+uniqueArray[key].last_activity+"</span> ("+uniqueArray[key].updatedby+")</p><p class='activityNotes'>"+uniqueArray[key].activitynotes+"</p>");
        			}
        		}
        	}
		}
	});
}

function removeDuplicates(originalArray, key1, key2) {
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
    	debugger;
       lookupObject[originalArray[i][key1]+"_"+originalArray[i][key2]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
}

function enableButtons() {
	document.getElementById('sendContact').disabled = false;
	document.getElementById('resetContact').disabled = false;
	document.getElementById('deleteLead').disabled = false;
	document.getElementById('callbackBtn').disabled=false;
	document.getElementById('checkMSOR').disabled = false;
	document.getElementById('loadContact').disabled = false;
	document.getElementById('resetCompanyData').disabled = false;
	document.getElementById('mapButton').disabled = false;
	document.getElementById('googleAPI').disabled = false;
	if($("#website").val() != null && $("#website").val() != "") {
		document.getElementById('websiteButton').disabled = false;
	}
	else {
		document.getElementById('websiteButton').disabled = true;
	}
	if($("#dunsnumber").val() != null && $("#dunsnumber").val() != "") {
		document.getElementById('loadMSOR').disabled = false;
	}
	else {
		document.getElementById('loadMSOR').disabled = true;
	}
    $('#use_hq_address').prop('disabled', false);
}

function disableButtons() {
	document.getElementById('sendContact').disabled = true;
	document.getElementById('resetContact').disabled = true;
	document.getElementById('deleteLead').disabled = true;
	document.getElementById('callbackBtn').disabled=true;
	document.getElementById('checkMSOR').disabled = true;
	document.getElementById('loadMSOR').disabled = true;
	document.getElementById('loadContact').disabled = true;
	document.getElementById('resetCompanyData').disabled = true;
	document.getElementById('mapButton').disabled = true;
	document.getElementById('googleAPI').disabled = true;
	if($("#website").val() != null && $("#website").val() != "") {
		document.getElementById('websiteButton').disabled = false;
	}
	else {
		document.getElementById('websiteButton').disabled = true;
	}
    $('#use_hq_address').prop('disabled', true);
}



function validateFields() {
	/* if($('#company_companyname').val()!=null && $('#company_companyname').val()!='') {
		if($('#company_companyname').val().indexOf(',') != -1) {
			$("#companyNameMsg").html("* Comma is not allowed.").show();
			setTimeout(function(){$('#companyNameMsg').html("");},4000);
			return false;
		}
	} */
	var privateEmail = $('#private_email').val();
	if(privateEmail != null && privateEmail != "") {
		if (!IsValidEmail(privateEmail)) {
	   	  	$('#privateEmailMsg').show().html('* Please enter a valid private email address.');
	   		return false;
	   	}
		else {
			$('#privateEmailMsg').hide();
		}
	}
	var corporateEmail = $('#corporate_email').val();
	if(corporateEmail != null && corporateEmail != "") {
		if (!IsValidEmail(corporateEmail)) {
			$('#corporate_email-error').html('');
	   	  	$('#corporateEmailMsg').show().html('* Please enter a valid corporate email address.');
	   		return false;
	   	}
		else {
			$('#corporate_email').removeClass('error');
			$('#corporate_email').addClass('valid');
			$('#corporateEmailMsg').hide();
		}
	}
	
	var linkedinhandle = $("#linkedinhandle").val();
	if(linkedinhandle != null && linkedinhandle != "" && linkedinhandle !=undefined){
		if(!isValidUrl(linkedinhandle)) {
			$("#linkedinHandleMsg").html("* Please enter a valid LinkedIn Handle.").show();
			setTimeout(function(){$('#linkedinHandleMsg').html("");},4000);
			return false;
		}
	}
	var facebookhandle = $("#facebookhandle").val();
	if(facebookhandle != null && facebookhandle != "" && facebookhandle !=undefined){
		if(!isValidUrl(facebookhandle)) {
			$("#facebookHandleMsg").html("* Please enter a valid Facebook Handle.").show();
			setTimeout(function(){$('#facebookHandleMsg').html("");},4000);
			return false;
		} 
	}
	var twitterHandle = $("#twitterhandle").val();
	if(twitterHandle != null && twitterHandle != "" && twitterHandle !=undefined){
		if(!isValidUrl(twitterHandle)) {
			$("#twitterHandleMsg").html("* Please enter a valid Twitter Handle.").show();
			setTimeout(function(){$('#twitterHandleMsg').html("");},4000);
			return false;
		} 
	}
	var xingHandle = $("#xinghandle").val();
	if(xingHandle != null && xingHandle != "" && xingHandle !=undefined){
		if(!isValidUrl(xingHandle)) {
			$("#xinghandleMsg").html("* Please enter a valid Xing Handle.").show();
			setTimeout(function(){$('#xinghandleMsg').html("");},4000);
			return false;
		} 
	}
	var viadeoHandle = $("#viadeolinkhandle").val();
	if(viadeoHandle != null && viadeoHandle != "" && viadeoHandle !=undefined){
		if(!isValidUrl(viadeoHandle)) {
			$("#viadeoLinkHandleIdMsg").html("* Please enter a valid Viadeo Handle.").show();
			setTimeout(function(){$('#viadeoLinkHandleIdMsg').html("");},4000);
			return false;
		} 
	}
	var miscHandle = $("#miscLinkHndleID").val();
	if(miscHandle != null && miscHandle != "" && miscHandle !=undefined){
		if(!isValidUrl(miscHandle)) {
			$("#miscLinkHndleIDMsg").html("* Please enter a valid Misc Link.").show();
			setTimeout(function(){$('#miscLinkHndleIDMsg').html("");},4000);
			return false;
		} 
	}
	
	var website = $("#website").val();
	if(!isValidUrl(website)) {
		$('#website-error').hide();
		$("#websiteMsg").html("* Please enter a valid website.").show();
		setTimeout(function(){$('#websiteMsg').html("");},4000);
		return false;
	} 
	
	if($('#country').val() != null && $('#country').val() != "" && $('#hq_country').val() != null && $('#hq_country').val() != "" && $('#country').val() != $('#hq_country').val()) {
		$("#errorMsg").html("* value of country and hqCountry is not same. Kindly provide the same value.").show();
		setTimeout(function(){$('#errorMsg').html("");},5000);
		return false;
	}
	
	var contactCountryVal = $('#country').val();
	var stateVal = $('#state').val();
	var hqCountryVal = $('#hq_country').val();
	var hqstateVal = $('#hq_state').val();
	
	if(contactCountryVal != null && contactCountryVal != "") {
		if(contactCountryVal.length!=2){
			$("#countryMsg").css('color', 'cf1133').html("* Please enter two characters for country code").show();
			setTimeout(function(){$("#countryMsg").hide();},3000);
			return false;
		}
	}
	if(hqCountryVal != null && hqCountryVal != "") {
		if(hqCountryVal.length!=2){
			$("#hqCountryMsg").css('color', 'cf1133').html("* Please enter two characters for country code").show();
			setTimeout(function(){$("#hqCountryMsg").hide();},3000);
			return false;
		}
	}
	if(stateVal != null && stateVal != "") {
		if(contactCountryVal=="US" || contactCountryVal=="CA"){
			if(stateVal.length!=2){
				$("#StateMsg").css('color','cf1133').html("* Please insert two characters code for state.").show();
				setTimeout(function(){$("#StateMsg").html("");},4000);
				return false;
			}
		}
		if(stateVal.length==2 && (contactCountryVal=="US" || contactCountryVal=="CA")){
			 var s = stateByCodeFormatOnSubmit(contactCountryVal,stateVal,"#state","#StateMsg");
			 if(s==false){
				 return false;
			 }
		}else{
			stateCodeFormat(contactCountryVal,stateVal,"#state","#StateMsg");
		}
	}
	if(hqstateVal != null && hqstateVal != "") {
		if(hqCountryVal=="US" || hqCountryVal=="CA"){
			if(hqstateVal.length!=2){
				$("#hqStateMsg").css('color','cf1133').html("* Please insert two characters code for state.").show();
				setTimeout(function(){$("#hqStateMsg").html("");},4000);
				return false;
			}
		}
		if(hqstateVal.length==2 && (hqCountryVal=="US" || hqCountryVal=="CA")){
			 var shq = stateByCodeFormatOnSubmit(hqCountryVal,hqstateVal,"#hq_state","#hqStateMsg");
			 if(shq==false){
				 return false;
			 }
		}else{
			stateCodeFormat(hqCountryVal,hqstateVal,"#hq_state","#hqStateMsg");
		}
	}
	
	var employee = document.getElementById("employee").value;
	if(employee != null && employee != "") {
		var val = chkNegativeNumber("#employee","Employee Total", "#employeeMsg");
		if(val==false){
			return false;
		}
	}
	
	var revenue = document.getElementById("revenue").value;
	if(revenue != null && revenue != "") {
		var val =chkNegativeNumber("#revenue","Annual Revenue", "#revenueMsg");
		if(val==false){
			return false;
		}
	}
	var faxNumber = $("#fax").val();
	if(faxNumber!=null && faxNumber!="" && faxNumber!= undefined){
		if(validateContactPhone(faxNumber)) {
			$("#hqFaxNoMsg").html('').hide();
		}
		else {
			$('#hqFaxNoMsg').show().html("Please enter valid fax number");
			setTimeout(function(){$('#hqFaxNoMsg').html("");},4000);
			return false;
		}
	}
	return true;
}


function storeCasingWordsInArray(casingwords,casingwordAlycamel){
	var cArray=casingwords.split(',');
	var alwayscArray=casingwordAlycamel.split(',');
	for(i=0;i<cArray.length;i++)
	{
		casingWordAvoidArr.push(cArray[i]);
	}
	
	for(i=0;i<alwayscArray.length;i++)
	{
		casingWordAlwayCamelArr.push(alwayscArray[i]);
	}
}

function getFieldName(id){
	if(id=='firstname')
		return 'first name';
	else if(id=='corporate_email')
		return 'corporate email';
	else if(id=='jobtitle')
		return 'job title';
	else if(id=='hq_country')
		return 'hq country';
	else  if(id=='lastname')
		return 'last name';
	else if(id=='company_companyname')
		return 'company name';
	else if(id=='hq_street')
		return 'hq street';
	else if(id=='lead_status')
		return 'lead status';
	else if(id=='last_activity')
		return 'lead activity';
	else if(id=='contact_region')
		return 'contact region';
	else
		return id;
}

function checkWebsite() {
	 if($("#website").val() != null && $("#website").val() != "") {
		 document.getElementById('websiteButton').disabled = false;
	 }
	 else {
		 document.getElementById('websiteButton').disabled = true;
	 }
}

function IsValidEmail(email) {
	email=email.trim();
	var expr = /^([\w-\.']+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,6}|[0-9]{1,3})(\]?)$/;
    return expr.test(email);
}

function isValidUrl(url){
	if(url != null && url != "") {
		if(/^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/.test(url)) {
			return true;
		} else {
			return false;
		} 
	}
	else {
		return true;
	}
}

function trimValue(value) {
	var trimValue='';
	if(value != null && value != "" && value != "undefined") {
		trimValue=value.trim();
	}
	return trimValue;
}
 
function replaceValue(id, value){
	if($(id).val() == "NULL") {
		$(id).val("");
	}
}

function onChangeAndKeyupCommonFunction(){
	
	$("#firstname").keyup(function(){
		var fullNameVal = '';
		var firstName = document.getElementById("firstname").value;
		if(firstName != null && firstName != "") {
			fullNameVal = firstName;
		}
		var lastName = document.getElementById("lastname").value;
		if(lastName != null && lastName != "") {
			fullNameVal = fullNameVal + " " + lastName;
		}
		$("#fullname").val(fullNameVal);
	});
	
	$("#lastname").keyup(function(){
		var fullNameVal = '';
		if($("#firstname").val() != null && $("#firstname").val() != "") {
			fullNameVal = $("#firstname").val();
		}
		var lastName = document.getElementById("lastname").value;
		if(lastName != null && lastName != "") {
			fullNameVal = fullNameVal + " " + lastName;
		}
		$("#fullname").val(fullNameVal);
	});
	
	$("#private_email").keyup(function(){
		var privateEmail = document.getElementById("private_email").value;
		if(privateEmail != null && privateEmail != "") {
			if (!IsValidEmail(privateEmail)) {
		   	  	$('#privateEmailMsg').show().html('* Please enter a valid private email address.');
		   		return false;
		   	}
			else {
				$("#piplPemailHandleId").removeClass("ehandle").attr("disabled", false);
				$('#privateEmailMsg').hide();
			}
		}else{
			$("#piplPemailHandleId").addClass("ehandle").attr("disabled", true);
			$('#privateEmailMsg').hide();
		}
	});
	$("#private_email2").keyup(function(){
		var privateEmail = document.getElementById("private_email2").value;
		if(privateEmail != null && privateEmail != "") {
			if (!IsValidEmail(privateEmail)) {
		   	  	$('#privateEmail2Msg').show().html('* Please enter a valid private email 2 address.');
		   		return false;
		   	}
			else {
				$("#piplP2emailHandleId").removeClass("ehandle").attr("disabled", false);
				$('#privateEmail2Msg').hide();
			}
		}else{
			$("#piplP2emailHandleId").addClass("ehandle").attr("disabled", true);
			$('#privateEmail2Msg').hide();
		}
	});
	$("#private_email3").keyup(function(){
		var privateEmail = document.getElementById("private_email3").value;
		if(privateEmail != null && privateEmail != "") {
			if (!IsValidEmail(privateEmail)) {
		   	  	$('#privateEmail3Msg').show().html('* Please enter a valid private email 3 address.');
		   		return false;
		   	}
			else {
				$("#piplP3emailHandleId").removeClass("ehandle").attr("disabled", false);
				$('#privateEmail3Msg').hide();
			}
		}else{
			$("#piplP3emailHandleId").addClass("ehandle").attr("disabled", true);
			$('#privateEmail3Msg').hide();
		}
	});
	$("#corporate_email").keyup(function(){
		var corporateEmail = document.getElementById("corporate_email").value;
		if(corporateEmail != null && corporateEmail != "") {
			if (!IsValidEmail(corporateEmail)) {
				$('#corporate_email-error').html('');
		   	  	$('#corporateEmailMsg').show().html('* Please enter a valid corporate email address.');
		   		return false;
		   	}
			else {
				$("#piplCemailHandleId").removeClass("ehandle").attr("disabled", false);
				$('#corporate_email').removeClass('error');
				$('#corporate_email').addClass('valid');
				$('#corporateEmailMsg').hide();
			}
		}else{
			$("#corporateEmailMsg").hide();
			$("#piplCemailHandleId").addClass("ehandle").attr("disabled", true);
		}
	});
	
	$("#branchphone").change(function(){
		var cntry = $("#country").val();
		var mob = $("#branchphone").val();
		
		if(mob!=null && mob!="" && mob!=" " && mob!= undefined){
			if(cntry!=null && cntry!=""){
				if(validateContactPhone(mob)) {
					$("#branchPhoneMsg").html('').hide();
					//googlePhoneFormat(cntry,mob,"#branchphone","#branchPhoneMsg");
				}
				else {
					$('#branchPhoneMsg').show().html("Please enter valid branch phone");
					setTimeout(function(){$('#branchPhoneMsg').html("");},3000);
					return false;
				}
				//$("#mobPhValid").val("true");
			}else{
				$('#country-error').hide();
				$('#countryMsg').show().css('color', '#cf1133').html("* Please enter country");
				setTimeout(function(){$('#countryMsg').hide();},5000);
				return false;
			}
		}
	});
	$("#mobilephone").change(function(){
		var cntry = $("#country").val();
		var mob = $("#mobilephone").val();
		
		if(mob!=null && mob!="" && mob!=" " && mob!= undefined){
			if(cntry!=null && cntry!=""){
				if(validateContactPhone(mob)) {
					$("#mobilePhoneMsg").html('').hide();
					//googlePhoneFormat(cntry,mob,"#mobilephone","#mobilePhoneMsg");
				}
				else {
					$('#mobilePhoneMsg').show().html("Please enter valid mobile phone");
					setTimeout(function(){$('#mobilePhoneMsg').html("");},3000);
					return false;
				}
				//$("#mobPhValid").val("true");
			}else{
				$('#country-error').hide();
				$('#countryMsg').show().css('color', '#cf1133').html("* Please enter country");
				setTimeout(function(){$('#countryMsg').hide();},5000);
				return false;
			}
		}
	});
	$("#directphone").change(function(){
		var cntry = $("#country").val();
		var mob = $("#directphone").val();
		
		if(mob!=null && mob!="" && mob!=" " && mob!= undefined){
			if(cntry!=null && cntry!=""){
				if(validateContactPhone(mob)) {
					$("#directPhoneMsg").html('').hide();
					//googlePhoneFormat(cntry,mob,"#directphone","#directPhoneMsg");
				}
				else {
					$('#directPhoneMsg').show().html("Please enter valid direct phone");
					setTimeout(function(){$('#directPhoneMsg').html("");},3000);
					return false;
				}
				//$("#dirctPhValid").val("true");
			}else{
				$('#countryMsg').show().css('color', '#cf1133').html("* Please enter country");
				setTimeout(function(){$('#countryMsg').hide();},5000);
				return false;
			}
		}
	});
	
	$("#hq_phone").change(function(){
		var cntry = $("#hq_country").val();
		var mob = $("#hq_phone").val();
		
		if(mob!=null && mob!="" && mob!=" " && mob!= undefined){
			if(cntry!=null && cntry!=""){
				if(validateContactPhone(mob)) {
					$("#hqPhoneMsg").html('').hide();
					//googlePhoneFormat(cntry,mob,"#hq_phone","#hqPhoneMsg");
				}
				else {
					$('#hqPhoneMsg').show().html("Please enter valid hq phone");
					setTimeout(function(){$('#hqPhoneMsg').html("");},3000);
					return false;
				}
				//$("#hqPhValid").val("true");
			}else{
				$("#hqCountryMsg").show().css('color', '#cf1133').html("* Please enter country");
				setTimeout(function(){$('#hqCountryMsg').hide();},5000);
				return false;
			}
		}
	});
	
	$("#website").keyup(function() {
		if($('#website').val() != null && $('#website').val() != "" && $('#website').val().startsWith('www')==false){
			$('#website-error').hide();
			$("#websiteMsg").html("* kindly provide valid website.").show();
			setTimeout(function(){$('#websiteMsg').html("");},3000);
			return false;
		}
	});
	
	$("#country").change(function(){
		var contactCountryVal = $('#country').val();
		var boolean_val= countryStateLengthChk(contactCountryVal,"#countryMsg","Country");
		if(boolean_val==false){
			return false;
		}
		upperCaseVal("#country");
		
		var stateVal = $('#state').val();
		var mob = $("#mobilephone").val();
		var dphn = $("#directphone").val();
		var branchphone = $("#branchphone").val();
		
		stateCodeFormat(contactCountryVal,stateVal,"#state","#StateMsg");
	});
	$("#hq_country").change(function(){
		var contactCountryVal = $('#hq_country').val();
		var stateVal = $('#hq_state').val();
		var hqPhn = $("#hq_phone").val();
		var fax = $("#fax").val();
		
		var boolean_val= countryStateLengthChk(contactCountryVal,"#hqCountryMsg","Company Country");
		if(boolean_val==false){
			return false;
		}
		upperCaseVal("#hq_country");
		
		stateCodeFormat(contactCountryVal,stateVal,"#hq_state","#hqStateMsg");
	});
	
	$("#state").change(function(){
		var contactCountryVal = $('#country').val();
		var stateVal = $('#state').val();
		if(stateVal!="" && stateVal.length==2){
			$('#state').val(stateVal.toUpperCase());
			stateVal= $('#state').val();
		}
		if(stateVal.length==2 && (contactCountryVal=="US" || contactCountryVal=="CA")){
			 stateByCodeFormatOnSubmit(contactCountryVal,stateVal,"#state","#StateMsg");
		}else{
			stateCodeFormat(contactCountryVal,stateVal,"#state","#StateMsg");
		}
		
    });
	
	$("#hq_state").change(function(){
		var contactCountryVal = $('#hq_country').val();
		var stateVal = $('#hq_state').val();
		if(stateVal!="" && stateVal.length==2){
			$('#hq_state').val(stateVal.toUpperCase());
			stateVal= $('#hq_state').val();
		}
		if(stateVal.length==2 && (contactCountryVal=="US" || contactCountryVal=="CA")){
			 stateByCodeFormatOnSubmit(contactCountryVal,stateVal,"#hq_state","#hqStateMsg");
		}else{
			stateCodeFormat(contactCountryVal,stateVal,"#hq_state","#hqStateMsg");
		}
    });
	
	$("#fax").change(function(){
		var cntry = $("#hq_country").val();
		var mob = $("#fax").val();
		
		if(mob!=null && mob!="" && mob!= undefined){
			if(validateContactPhone(mob)) {
				$("#hqFaxNoMsg").html('').hide();
			}
			else {
				$('#hqFaxNoMsg').show().html("Please enter valid fax number");
				setTimeout(function(){$('#hqFaxNoMsg').html("");},4000);
				return false;
			}
		}
	});
	$("#employee").change(function(){
		var employee = $("#employee").val();
		if(employee <  0) {
			chkNegativeNumber("#employee","Employee Total", "#employeeMsg");
		}
	});
	$("#revenue").change(function(){
		var revenue = $("#revenue").val();
		if(revenue <  0) {
			chkNegativeNumber("#revenue","Annual Revenue", "#revenueMsg");
		}
	})
}

function replaceValueForAlwaysCamelCase(id, value){
	if($(id).val() == "NULL" || $(id).val() == "Null" || $(id).val() == "null" || $(id).val()==null  || $(id).val()==undefined) {
		$(id).val("");
	}else{
		$(id).val(alwaysCamelCase($(id).val()));
	}
}

function alwaysCamelCase(str){
	var finalStr="";

	if(str!=="NULL" && str!=null && str!="" && str!=" "){
		str = str.replace(/  +/g, ' ');
		str = str.trim();
		str = str.toLowerCase();
		var finalStr="";
		if(str!=null && str!=""){
			var s = str.split(" ");
			if(s.length>0){
				for(var i=0;i<(s.length);i++){
					finalStr = finalStr + " "+s[i].substring(0, 1).toUpperCase()+s[i].substring(1, s[i].length).toLowerCase() ;	
				}
			}
			finalStr=finalStr.trim();
		}
	}
	return finalStr;
}

function countryStateLengthChk(cntry,msgId,identifier){
	var regex = /^[A-Z a-z]{2}$/; 
	var result = regex.test(cntry);
	if (!result) {
		$(msgId).show().css('color', '#cf1133').html('* '+identifier+' must be two characters only.');
	    setTimeout(function(){$(msgId).html("");},4000);
		return false;
	}
	return true;
}

function stateCodeFormat(contry,state,componentId,MsagId) {
	contry = trimValue(contry);
	state = trimValue(state);
	if(state!="" && state.length!=2 && contry!="" && contry!=null){
		$.ajax({
			url: 'formatStateCode.do?cntry='+contry+'&state='+state,
			async: false,
			success: function(json, textStatus, xhr)
			{
				if(json != null && json != "")  {
					data = JSON.parse(json);
					if(data.Status=='MATCHED'){
						$(componentId).val(data.StateCode);
						return true;
					}else{
						if((contry=="US" || contry=="CA") && state.length!=2){
							$(MsagId).css('color','#cf1133').html("Please enter two valid characters for state.").show();
							setTimeout(function(){$(MsagId).html('').hide();},3000);
							return false;
						}else{
							$(componentId).val(alwaysCamelCase(state));
							return true;
						}
					}
				}
			},
			error: function(xhr, textStatus, errorThrow)
			{
				$(MsagId).css('color','#cf1133').html("* Unable to call state service.").show();
				setTimeout(function(){$(MsagId).html("");},5000);
				$(componentId).css('border-color', 'red');
				return false;
			}
		});
	}
	return true;
}


function disableEnableMapButton(){
	if($('#company_companyname').val()!=null && $('#company_companyname').val()!="" && $('#hq_country').val()!=null && $('#hq_country').val()!=""){
		document.getElementById('mapButton').disabled = false;
	}else if(($('#company_companyname').val()!=null && $('#company_companyname').val()!="") && ($('#hq_country').val()==null || $('#hq_country').val()=="")){
		document.getElementById('mapButton').disabled = false;
	}else{
		document.getElementById('mapButton').disabled = true;
	}
}

function googlePhoneFormat(contry,phone,componentId,phoneMsagId) {
	phone = trimValue(phone);
	if(contry!=""){
		contry = contry.toUpperCase();
	}
	var ArrayJosn='{"Country":"'+contry+'","PhoneNumber":"'+phone+'"}';
	$.ajax({
		url: 'formatphonenumber.do?Phonedata='+encodeURIComponent(ArrayJosn),
		async: false,
		success: function(json, textStatus, xhr)
		{
			if(json != null)  {
					data = JSON.parse(json);
					if(data.isValid==true && data.isValidForRegion==true){
						if(contry=="US" || contry=="CA"){
							$(componentId).val(data.internationalFormat);
						}else{
							$(componentId).val(data.internationalFormat);
						}	
					}else{
						$(phoneMsagId).html("Valid format is not found for country "+contry+". Please enter valid number.").show();
						setTimeout(function(){$(phoneMsagId).html('').hide();},5000);
					}
			}
		},
		error: function(xhr, textStatus, errorThrow)
		{
			$("#errorMsg").html("* Unable to format Phone number.").show();
			setTimeout(function(){$('#errorMsg').html("");},4000);
			$(componentId).css('border-color', 'red');
		}
	}); 
}

function rearrangePhoneNumber(phoneRearrange) {
	if(phoneRearrange.charAt(0)=="1" && phoneRearrange.charAt(1)=="."){
		phoneRearrange = phoneRearrange.replace("1.","");    
	}
	if(phoneRearrange.indexOf("+1")!=-1){
		phoneRearrange = phoneRearrange.replace("+1","");
	 }
	phoneRearrange = phoneRearrange.replace(".","");
	phoneRearrange = phoneRearrange.replace(".","");
	phoneRearrange = phoneRearrange.replace(/-/g, "");
	phoneRearrange = phoneRearrange.replace(")", "");
    phoneRearrange = phoneRearrange.replace(" ", "");
    phoneRearrange = phoneRearrange.replace(" ", "");
    phoneRearrange = phoneRearrange.replace(" ", "");
    phoneRearrange = phoneRearrange.replace("(", "");
    
    //get last 10 digits
    var finalStr = phoneRearrange.substr(phoneRearrange.length - 10);
    
   return finalStr;
}

function chkNegativeNumber(id,identifier, msgId){
	var val  = $(id).val();
	if(val<0 ){
		$(msgId).html("* " + identifier + " can't be negative").show();
		setTimeout(function(){$(msgId).hide();},4000);
		return false;
	}else{
		return true;
	}
}

function stateByCodeFormatOnSubmit(contry,state,componentId,MsagId) {
	contry = trimValue(contry);
	state = trimValue(state);
	if(state!="" && state.length==2 && contry!="" && contry!=null){
		$.ajax({
			url: 'formatByStateCode.do?cntry='+contry+'&state='+state,
			async: false,
			success: function(json, textStatus, xhr)
			{
				if(json != null)  {
					data = JSON.parse(json);
					if(data.Status=='MATCHED'){
						
					}else{
						if((contry=="US" || contry=="CA") && state.length!=2){
							$(MsagId).css('color','#cf1133').html("Please enter valid two digit characters for state.").show();
							setTimeout(function(){$(MsagId).html('').hide();},3000);
							return false;
						}else{
									
							}
					}
				}
			},
			error: function(xhr, textStatus, errorThrow)
			{
				$(MsagId).css('color','#cf1133').html("* Unable to call state service.").show();
				setTimeout(function(){$(MsagId).html("");},5000);
				$(componentId).css('border-color', 'red');
				return false;
			}
		});
	}
	return true;
}

function validateContactPhone(phoneNo) {
	var expr = /^(?=.*[0-9])[- +0-9]+$/;
	return expr.test(phoneNo);
}

function populateContactAddress() {
	if ($("#use_hq_address").is(":checked")) {
		var hqStreet = $('#hq_street').val();
		if(hqStreet != null && hqStreet != "") {
			$("#hidden_street").val($('#street').val());
			$('#street').val(hqStreet);
		}
		var hqCity = $('#hq_city').val();
		if(hqCity != null && hqCity != "") {
			$("#hidden_city").val($('#city').val());
			$('#city').val(hqCity);
		}
		var hqPostalCode = $('#hq_postalcode').val();
		if(hqPostalCode != null && hqPostalCode != "") {
			$("#hidden_postalcode").val($('#postalcode').val());
			$('#postalcode').val(hqPostalCode);
		}
		var hqState = $('#hq_state').val();
		if(hqState != null && hqState != "") {
			$("#hidden_state").val($('#state').val());
			$('#state').val(hqState);
		}
		var hqCountry = $('#hq_country').val();
		if(hqCountry != null && hqCountry != "") {
			$("#hidden_country").val($('#country').val());
			$('#country').val(hqCountry);
		}
	}
	else {
		$('#street').val($("#hidden_street").val());
		$('#city').val($("#hidden_city").val());
		$('#postalcode').val($("#hidden_postalcode").val());
		$('#state').val($("#hidden_state").val());
		$('#country').val($("#hidden_country").val());
	}
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}

function setRowValueToEmpDetails(tableId, rowId, componentId)
{
	if($('#'+tableId+' tbody tr#'+rowId).find('td:eq(3) input').is(':checked')){
		var val = $('#'+tableId).find('tr#'+rowId).find('td:eq(2)').text();
		if(rowId=="pplTblFirstName" || rowId=="pplTblLastName"){
			$('#'+componentId).val(alwaysCamelCase($('#'+tableId).find('tr#'+rowId).find('td:eq(2)').text()));
		}
		else if(rowId=="pplTblLinkedIn" || rowId=="pplTblFacebook" || rowId=="pplTblTwitter" || rowId=="pplTblXing" || rowId=="pplTblMisc" ||
			rowId=="pplTblCntry" || rowId=="pplTblPCode" || rowId=="pplTblState" || rowId=="pplTblCemail" ||
			rowId=="pplTblPemail" ||  rowId=="pplTblP1email" || rowId=="pplTblP2email" || rowId=="pplTblDphone" || rowId=="pplTblMphone"){
			
			$('#'+componentId).val($('#'+tableId).find('tr#'+rowId).find('td:eq(2)').text());
		}else if(rowId=="pplTblCmpName"){
			$('#'+componentId).val(txtCamelCaseByVal($('#'+tableId).find('tr#'+rowId).find('td:eq(2)').text()));
		}
		else{
			$('#'+componentId).val(alwaysCamelCase($('#'+tableId).find('tr#'+rowId).find('td:eq(2)').text()));
		}	
	}
}

function txtCamelCaseByVal(str){
	var finalStr="";

	if(str!=null && str!="" && str!=" "){
		str = str.replace(/  +/g, ' ');
		str = str.trim();
		str = str.toLowerCase();
		var finalStr="";
		if(str!=null && str!=""){
			var s = str.split(" ");
			if(s.length>0){
				for(var i=0;i<(s.length);i++){
					if(s[i].length>3){
						finalStr = finalStr + " "+s[i].substring(0, 1).toUpperCase()+s[i].substring(1, s[i].length).toLowerCase() ;
					}else if(casingWordAlwayCamelArr.indexOf(s[i])>-1){
						finalStr = finalStr + " "+s[i].substring(0, 1).toUpperCase()+s[i].substring(1, s[i].length).toLowerCase() ;
					}
					else if(s[i].length<=3 && i==0 && casingWordAvoidArr.indexOf(s[i])>-1){
						finalStr = finalStr + " "+s[i].substring(0, 1).toUpperCase()+s[i].substring(1, s[i].length).toLowerCase() ;
					}else if(s[i].length<=3 && i!=0 && casingWordAvoidArr.indexOf(s[i])>-1){
						finalStr = finalStr + " "+s[i].toLowerCase() ;
					}else {
						finalStr = finalStr + " "+s[i].toUpperCase() ;
					}
					
				}
			}
			finalStr=finalStr.trim();
		}
	}
	return finalStr;
}


function createCorrelationId(){
	var d = new Date();
    var corrId = "MSOR"+"-"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
    $('#correlationId').val(corrId);
}




function upperCaseVal(componentId){
	var val = $(componentId).val();
	if(val!=null && val!="" && val!=undefined){
		$(componentId).val(val.toUpperCase());
	}
}



function sortJSON(data, key) {
    return data.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}

function seconds_with_leading_zeros(dt) 
{ 
  return /\((.*)\)/.exec(new Date().toString())[1];
}


function resetFilter(){
	$("#leadViewFilter").trigger('reset');
	$("#selectedCompanyName").val("");
	$("#selectedCompanyName").hide();
	sequence =	0;
	sequenceForQuery = 0;
	loadLeadViewRecordsCount();
	loadLeadViewRecords();
	$("#selectedLeadStatus").val("");
	$("#selectedLeadActivity").val("");
	$("#selectedLeadOwner").val("");
	$("#selectedAssignedRep").val("");
	$("#selectedHqCountryDropdown").val("");
	$("#selectedPhone").val("");
		hqCountryDropdownOptions = [];
		leadOwnerOptions = [];
		assignedRepOptions = [];
		leadStatusOptions = [];
		leadActivityOptions = [];
	
}
