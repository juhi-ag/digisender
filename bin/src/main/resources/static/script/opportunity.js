var salesOrderCount =0;
var createSalesOrderCount = 0;
var workOrderCount = 0;
var salesOrderId = '';
var lookupData;

var selectedRecordData='';
var selectedOrderData='';
var questionIndex='';
var csfColumnCount=0;
var staticFieldCount = 1;
var csfDcFieldsList='';
var csfLookupTypeList= '';
var csfLookupSelectList = '';
var lookUpFields ='';
var recordPerDomain = '';
var alreadySave = false;
var csfDcFieldsListWithNoPreferenece='';
var ordersObj;
var options = [];
var orderIdOptions = [];
var orderIdCampaignNameJsonArray = [];
var prefillFormattingOrderId = false;
var jobFunctionObj;
var jobFunctionOptions = [];
var seniorityLevelObj;
var seniorityLevelOptions = [];
var defaultFieldsFromOpportunity = false;
var pendingSalesOrder = false;
var customQueCount = 1;
var rowId = []
var specificCountryObj='';
var specificCountryOptions = [];
var jobTitleObj;
var jobTitleOptions = [];
var industryObj;
var industryOptions = [];
var yesFromOpprOptions = [];
var opprIdOptions = [];
var yesFromOpprObj;
var opprIdOpprNameJsonArray = [];
var prefillYesFromOpprId = false;
var filterSearchYesFromOpprId = false;
var rowIdFile = [];
var fileCount = 1;
var rowIdNALFile = [];
var nalFileCount = 1;
var oldProductType = '';
var programNameList = [];
var progCount= 0;
var priceLeadMapping = true;
//var audienceJobFunctionOptions = [];
//var specificCountryObj='';
//var specificCountryOptions = [];
var hqCountryDropdownObj;
var hqCountryDropdownOptions = [];
//var selectHqCountryDropdownChecked = false;
var companySizeDropdownObj;
var companySizeDropdownOptions = [];
//var selectcompanySizeDropdownChecked = false;

function prefillCompanyDetails(data) {
	console.log("data::"+data);
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
		//alert(seniorityLevelVal);
		$("#senioritylevel").val(seniorityLevelVal);
		replaceValue("#senioritylevel", $("#senioritylevel").val());
		/* $("#twitterurl").val(data.cntTwitterUrl);
		replaceValue("#twitterurl", $("#twitterurl").val()); */
		/* $("#contact_companyname").val(data.cntCompanyName);
		replaceValue("#contact_companyname", $("#contact_companyname").val());  */
		
		
		if(data.contactdetails.contactphone != null && data.contactdetails.contactphone != ""){
			
			var contactCountryVal = $("#country").val();
			if(contactCountryVal != null && contactCountryVal != "" && (contactCountryVal == 'US' || contactCountryVal == 'CA')) {
				var directPhoneVal = data.contactdetails.contactphone.directphone;
				if(directPhoneVal != null && directPhoneVal != "") {
					$("#directphone").val(directPhoneVal);
				}
				var mobilePhoneVal = data.contactdetails.contactphone.mobilephone;
				if(mobilePhoneVal != null && mobilePhoneVal != "") {
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
		
		$("#linkedinhandle").val(data.contactdetails.linkedinhandle);
		replaceValue("#linkedinhandle", $("#linkedinhandle").val());
		$("#facebookhandle").val(data.contactdetails.facebookhandle);
		replaceValue("#facebookhandle", $("#facebookhandle").val());
		$("#twitterhandle").val(data.contactdetails.twitter_handle);
		replaceValue("#twitterhandle", $("#twitterhandle").val());
		
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


function updateRowInDataTable(){
	debugger;
	var index=$("#indexOfRow").val();
	var indexint= parseInt(index , 10);
	var d = new Date();
	var h=d.getHours(); 
	var m=d.getMinutes(); 
	var s=d.getSeconds();
	var time="-"+h+":"+m+":"+s;
	
	var opportunityView = $("#opportunityname").val();
	var accountName = $("#accountname").val();
	var orderType = $("#ordertype").val();
	var productType = $('#producttype').val();
	var stage = $("#stages").val();
	var amount = $('#amount').val();
	var assignedSalesRep = $('#assigned_salesrep').val();
	var assignAM = $('#assign_AM').val();
	var hqCountry = $('#hq_country').val();
	
	
	
	var lastActivityDate = "";
	var callBackDateTime ="";
	lastActivityDateForRowUpdate=d;
	
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
	}else if(recOpportunityView.LastActivityDate !=null && recOpportunityView.LastActivityDate !=""){
		lastActivityDate = recOpportunityView.LastActivityDate;
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
	}else if(recOpportunityView.callBackDateTime !=null && recOpportunityView.callBackDateTime !=""){
		callBackDateTime = recOpportunityView.callBackDateTime;
	}
	
	if($("#closed_date").val() !=null && $("#closed_date").val() !=""){
		var closeDate = $("#closed_date").val() + time;
	}else{
		var closeDate = $("#closed_date").val();
	}
	
	debugger;

	var table = $('#opportunityViewTable').DataTable();
	
	table.cell({row: indexint, column:1}).data(opportunityView); 
	table.cell({row: indexint, column:2}).data(accountName);
	table.cell({row: indexint, column:3}).data(hqCountry);
	table.cell({row: indexint, column:4}).data(orderType);
	table.cell({row: indexint, column:5}).data(productType);
	table.cell({row: indexint, column:6}).data(assignedSalesRep);
	table.cell({row: indexint, column:7}).data(assignAM);
	table.cell({row: indexint, column:8}).data(stage);
	table.cell({row: indexint, column:9}).data(amount);
	table.cell({row: indexint, column:10}).data(closeDate);
	table.cell({row: indexint, column:11}).data(callBackDateTime);
	table.cell({row: indexint, column:12}).data(lastActivityDate);
	
	$('#container').css('display','block');
	table.columns.adjust().draw();
	
	$("#indexOfRow").val("");
}	

function loadProductTypes(){
	debugger;
	$('#productSpin').show();
	$.ajax({
		url		:	"loadProductTypes.do",
		success	:	function(data) {
			debugger;
			if(data != null && data != "") {
				productObj = JSON.parse(data);
				//productObj=data;
				var productVal = $("#selectedProductType").val().split(",");
				productProbabilityMap  = new Map();
				html = '';
				var i=0;
				$.each(productObj, function(key, value){
					if(productVal != null && productVal != "" && productVal.indexOf(value)>-1) {
						html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectProductType(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedProductType'+i+' value="'+value+'" checked><text style="font-size: 0.8125rem;"  for="selectedProductType'+i+'">'+value+'</label></div></div>';
					}
					else {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectProductType(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedProductType'+i+' value="'+value+'"><text  style="font-size: 0.8125rem;" for="selectedProductType'+i+'">'+value+'</label></div></div>';
					}
					i++;
					
					productProbabilityMap.set(key,value);
				});
				$("#productMultiSelect").html(html);
				$("#productMultiSelectParent").show().css("width", "100%");
				$('#productSpin').hide();
			}
		}
	});
}


function selectProductType(event) {
	debugger;
	var $target = $(event.currentTarget),
	val = $target.find('input[type="checkbox"]').attr('value'),
	$inp = $target.find('input[type="checkbox"]'),
	idx;
	
	if(productOptions == "") {
		if($("#selecetdProduct").val() != null && $("#selecetdProduct").val() != "") {
			var productArray = $("#selecetdProduct").val().split(",");
			$.each(productArray, function(i) {
				productOptions.push(productArray[i]);
			});
		} 
	}
	
	if ((idx = productOptions.indexOf(val)) > -1) {
		productOptions.splice(idx, 1);
		setTimeout(function() {$inp.prop('checked', false)}, 0);
		$inp.prop('checked', false).closest('.dropdown-item').removeClass("active");
	}
	else {
		if(productOptions.indexOf(val) == -1) {
			productOptions.push(val);
			setTimeout(function() {$inp.prop('checked', true)}, 0);
			$inp.prop('checked', true).closest('.dropdown-item').addClass("active");
		}
	}
	$("#productMultiSelectParent").dropdown('toggle');
	$("#selectedProductType").val(productOptions);
	selectProductChecked = true;
	return false;
}

function filterProduct() {
	debugger;
	html='';
	var i=0;
	if(productOptions == "") {
		if($("#selectedProductType").val() != null && $("#selectedProductType").val() != "") {
			debugger;
			var productArray = $("#selectedProductType").val().split(",");
			$.each(productArray, function(i) {
				productOptions.push(productArray[i]);
			});
		} 
	}
	
	$.each(productObj, function(key, value){
		var searchedText=$('#productSearch').val();
		try {
			if(value.toLowerCase().indexOf(searchedText.toLowerCase())>-1){
				if(productOptions.length>0) {
					if(productOptions.indexOf(value)>-1) {
						html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectProductType(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedProductType'+i+' value="'+value+'" checked><text  style="font-size: 0.8125rem;" for="selectedProductType'+i+'">'+value+'</label></div></div>';
					}
					else {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectProductType(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedProductType'+i+' value="'+value+'"><text  style="font-size: 0.8125rem;" for="selectedProductType'+i+'">'+value+'</label></div></div>';
					}
				}
				else {
					html=html+'<div class="dropdown-item py-0 px-1" onClick="selectProductType(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedProductType'+i+' value="'+value+'"><text  style="font-size: 0.8125rem;" for="selectedProductType'+i+'">'+value+'</label></div></div>';
				}
			}
		}
		catch(e) {
			console.log(e.message);
		}
		i++;
	});
	$("#productMultiSelect").html(html);
}
//producttype ends----------------------------------

/* Assigned am and rep */

function loadAssignedSalesRepLookup(){
	debugger;
	$('#assignedAMSearch').val('');
	$('#assignedAMMultiSelectParent').hide();
	$('#stageSearch').val('');
	$('#stageMultiSelectParent').hide();
	$('#productSearch').val('');
	$('#productMultiSelectParent').hide();
	
	$('#assignedRepSpin').show();
	
			var data=$("#assignedlookup").val();
			debugger;
			if(data != null && data != "") {
				assignedRepObj = JSON.parse(data);
				var assignedRepVal = $("#selectedAssignedRep").val().split(",");
				assignedRepProbabilityMap  = new Map();
				html = '';
				var i=0;
				$.each(assignedRepObj, function(key, value){
					if(assignedRepVal != null && assignedRepVal != "" && assignedRepVal.indexOf(key)>-1) {
						html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectAssignedRep(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectAssignedRep'+i+' value="'+key+'" checked><text  style="font-size: 0.8125rem;" for="selectAssignedRep'+i+'">'+value+'</label></div></div>';
					}
					else {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectAssignedRep(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectAssignedRep'+i+' value="'+key+'"><text  style="font-size: 0.8125rem;" for="selectAssignedRep'+i+'">'+value+'</label></div></div>';
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

function loadAssignedSalesAMLookup(){
	debugger;
	$('#assignedAMSpin').show();
	$('#assignedRepSearch').val('');
	$('#assignedRepMultiSelectParent').hide();
	$('#stageSearch').val('');
	$('#stageMultiSelectParent').hide();
	$('#productSearch').val('');
	$('#productMultiSelectParent').hide();
	
	var data=$("#assignedlookup").val();
	debugger;
	if(data != null && data != "") {
		assignedAMObj = JSON.parse(data);
		var assignedAMVal = $("#selectedAssignedAM").val().split(",");
		assignedAMProbabilityMap  = new Map();
		html = '';
		var i=0;
		$.each(assignedAMObj, function(key, value){
			if(assignedAMVal != null && assignedAMVal != "" && assignedAMVal.indexOf(key)>-1) {
				html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectAssignedAM(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectAssignedAM'+i+' value="'+key+'" checked><text  style="font-size: 0.8125rem;" for="selectAssignedAM'+i+'">'+value+'</label></div></div>';
			}
			else {
				html=html+'<div class="dropdown-item py-0 px-1" onClick="selectAssignedAM(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectAssignedAM'+i+' value="'+key+'"><text  style="font-size: 0.8125rem;" for="selectAssignedAM'+i+'">'+value+'</label></div></div>';
			}
			i++;		
			assignedAMProbabilityMap.set(key,value);
		});
		$("#assignedAMMultiSelect").html(html);
		$("#assignedAMMultiSelectParent").show().css("width", "100%");
		$('#assignedAMSpin').hide();
		arrow=true;
	}	
}

function selectAssignedAM(event) {
	debugger;
	var $target = $(event.currentTarget),
	val = $target.find('input[type="checkbox"]').attr('value'),
	$inp = $target.find('input[type="checkbox"]'),
	idx;
	
	if(assignedAMOptions == "") {
		if($("#selecetdAssignedAM").val() != null && $("#selecetdAssignedAM").val() != "") {
			var assignedAMArray = $("#selecetdAssignedAM").val().split(",");
			$.each(assignedAMArray, function(i) {
				assignedAMOptions.push(assignedAMArray[i]);
			});
		} 
	}
	
	if ((idx = assignedAMOptions.indexOf(val)) > -1) {
		assignedAMOptions.splice(idx, 1);
		setTimeout(function() {$inp.prop('checked', false)}, 0);
		$inp.prop('checked', false).closest('.dropdown-item').removeClass("active");
	}
	else {
		if(assignedAMOptions.indexOf(val) == -1) {
			assignedAMOptions.push(val);
			setTimeout(function() {$inp.prop('checked', true)}, 0);
			$inp.prop('checked', true).closest('.dropdown-item').addClass("active");
		}
	}
	$("#assignedAMMultiSelectParent").dropdown('toggle');
	$("#selectedAssignedAM").val(assignedAMOptions);
	selectAssignedAMChecked = true;
	return false;
}

function selectAssignedRep(event) {
	debugger;
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
	$("#selectedAssignedRep").val(assignedRepOptions);
	selectAssignedRepChecked = true;
	return false;
}

function filterAssignedRep() {
	debugger;
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
					if(assignedRepOptions.indexOf(key)>-1) {
						html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectAssignedRep(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedAssignedRep'+i+' value="'+key+'" checked><text  style="font-size: 0.8125rem;" for="selectedAssignedRep'+i+'">'+value+'</label></div></div>';
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
}

function filterAssignedAM() {
	debugger;
	html='';
	var i=0;
	if(assignedAMOptions == "") {
		if($("#selectedAssignedAM").val() != null && $("#selectedAssignedAM").val() != "") {
			var assignedAMArray = $("#selectedAssignedAM").val().split(",");
			$.each(assignedAMArray, function(i) {
				assignedAMOptions.push(assignedAMArray[i]);
			});
		} 
	}
	
	$.each(assignedAMObj, function(key, value){
		var searchedText=$('#assignedAMSearch').val();
		try {
			if(value.toLowerCase().indexOf(searchedText.toLowerCase())>-1){
				if(assignedAMOptions.length>0) {
					if(assignedAMOptions.indexOf(key)>-1) {
						
						html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectAssignedAM(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedAssignedAM'+i+' value="'+key+'" checked><text  style="font-size: 0.8125rem;" for="selectedAssignedAM'+i+'">'+value+'</label></div></div>';
					}
					else {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectAssignedAM(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedAssignedAM'+i+' value="'+key+'"><text  style="font-size: 0.8125rem;" for="selectedAssignedAM'+i+'">'+value+'</label></div></div>';
					}
				}
				else {
					html=html+'<div class="dropdown-item py-0 px-1" onClick="selectAssignedAM(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedAssignedAM'+i+' value="'+key+'"><text  style="font-size: 0.8125rem;" for="selectedAssignedAM'+i+'">'+value+'</label></div></div>';
				}
			}
		}
		catch(e) {
			console.log(e.message);
		}
		i++;
	});
	$("#assignedAMMultiSelect").html(html);
}

function loadSelectedCurrentLeadFromSalesLead(index){
	$("#companyDetailsMsg").show();
	document.getElementById('showCurrentLeads').disabled = true;
	document.getElementById('showMSORContacts').disabled = true;
	debugger;
	currentIndex = index;
	var table = $('#loadCurrentLeadsTable').DataTable();
	recShowCurrentRecords=showCurrentRecordsArr[index];
  	console.log(recShowCurrentRecords);
  	currentId = recShowCurrentRecords.salesLead.sales_lead_id_text;
  	console.log("currentId ====="+currentId);
  	$("#sales_lead_id").val(currentId);
	
	$.ajax({
		url:'loadSelectedCurrentLeadFromSalesLeadForOppr.do?salesLeadId='+$("#sales_lead_id").val(),
		success: function(data, textStatus, xhr)
		{
			$("#companyDetailsMsg").hide();
			if(data != null && data != "") {
				debugger;
				console.log("data:: "+data);
				data=jQuery.parseJSON(data);
				debugger;
				prefillCompanyDetails(data);
			}
			else {
				$("#loadContactsErrorMsg").html("* There is no record corresponding to this contact id, kindly check with development team.").show();
				setTimeout(function(){$('#loadContactsErrorMsg').html("");},validationMessageTimeout);
			}
			document.getElementById('showCurrentLeads').disabled = false;
			document.getElementById('showMSORContacts').disabled = false;
		},
		error: function(xhr, textStatus, errorThrow)
		{
			$("#companyDetailsMsg").hide();
			document.getElementById('showCurrentLeads').disabled = false;
			document.getElementById('showMSORContacts').disabled = false;
			$("#loadContactsErrorMsg").html("* error occurred while fetching contact details corresponding to given contactId, kindly check with development team.").show();
			setTimeout(function(){$('#loadContactsErrorMsg').html("");},validationMessageTimeout);
		}		
	});
}

function refreshLead(){
	$("#opportunityDetailsLoader").show();
	disableButtons();
	var corpEmail = $("#corporate_email").val();
	$.ajax({
		//url:'fetchMsorCoidDetailsBasedOnCorpEmailFromAccount.do?corpEmail='+corpEmail,
		url:'fetchMsorCoidDetailsBasedOnCorpEmail.do?corpEmail='+corpEmail,
		success: function(data, textStatus, xhr)
		{
			$("#opportunityDetailsLoader").hide();
			enableButtons();
			debugger;
			if(data != null && data != "") {
				
				data=JSON.parse(data);
				//data = data[0];
				prefillCompanyDetails(data);
			}
		},
		error: function(xhr, textStatus, errorThrow)
		{
			$("#opportunityDetailsLoader").hide();
			enableButtons();
			$("#errorMsg").html("* error occurred while fetching contact details corresponding to given corpEmail, kindly check with development team.").show();
			setTimeout(function(){$('#errorMsg').html("");},validationMessageTimeout);
		}		
	});	
	
}


function resetContactCompanyDetails(){
	$("#opportunityDetailsLoader").show();
	debugger;
	//recLeadView=recOpportunityView[0];
	//console.log("recLeadView ::"+recLeadView);
	prefillCompanyDetails(recOpportunityViewForReset);
	$("#opportunityDetailsLoader").hide();

}

function loadleadSourceAliasRecords() {
	debugger;
	var rowCount = $('#leadSourceAliasTable tr').length;
	if(rowCount !=null && rowCount !="" && rowCount > 2){
		if($('#hidden_lead_source_alias').val() != null && $('#hidden_lead_source_alias').val() != "") {
			$("#leadSourceAliasTable").find("tbody").empty();
			
			$.each(JSON.parse($('#hidden_lead_source_alias').val()), function(i, val) {
				var aliasData = "<tr id=row_"+i+"><td>"+(i+1)+"</td>,<td>"+val+"</td><td><button type='button' class='btn btn-danger btn-xs' onClick='deleteLeadSourceAliasFromDB("+i+")'><i class='fa fa-window-close' aria-hidden='true'></i></button></td></tr>";
				$("#leadSourceAliasTable").find("tbody").append(aliasData);
			})
		}
	}else{
		$("#leadSourceAliasDetailsLoader").show();
		$.ajax({
			url:"loadleadSourceAliasRecordsForOppr.do?salesOpprId="+$("#sales_opportunity_id").val(),
			success: function(data, textStatus, xhr)
			{
				$("#leadSourceAliasDetailsLoader").hide();
				if(data != null && data != "") {
					$("#leadSourceAliasTable").find("tbody").empty();
					//$('#leadSourceAliasTable').dataTable().fnClearTable();
					var tabledata = [];
					var aliasData ='';
					for(var i=0;i<data.length;i++){
						debugger;
						var rec=data[i];
						console.log("rec ::"+rec);
					    
						aliasData = "<tr id=row_"+i+"><td>"+(i+1)+"</td>,<td>"+rec+"</td><td><button type='button' class='btn btn-danger btn-xs' onClick='deleteLeadSourceAliasFromDB("+i+")'><i class='fa fa-window-close' aria-hidden='true'></i></button></td></tr>";
						$("#leadSourceAliasTable").find("tbody").append(aliasData);
					}
					//leadSourceAliasTableDataValue = data;
					//alert("leadSourceAliasTableDataValue load::"+leadSourceAliasTableDataValue);
					 $('#hidden_lead_source_alias').val(JSON.stringify(data));
					//alert("Alias data::"+$('#hidden_lead_source_alias').val());
				}
			},
			error: function(xhr, textStatus, errorThrow)
			{
				$("#leadSourceAliasDetailsLoader").hide();
				var row = $(this).closest('tr');
				var nRow = row[0];
				$('#leadSourceAliasTable').dataTable().fnDeleteRow(nRow);
				
//				debugger; 
				console.log(xhr);
				console.log(textStatus);
				console.log(errorThrow);
			}
		})
	
	}
	

}

function loadleadSourceAliasRecordsFromLead() {
	debugger;
	var rowCount = $('#leadSourceAliasTable tr').length;
	if(rowCount !=null && rowCount !="" && rowCount > 2){
		if($('#hidden_lead_source_alias').val() != null && $('#hidden_lead_source_alias').val() != "") {
			$("#leadSourceAliasTable").find("tbody").empty();
			
			$.each(JSON.parse($('#hidden_lead_source_alias').val()), function(i, val) {
				var aliasData = "<tr id=row_"+i+"><td>"+(i+1)+"</td>,<td>"+val+"</td><td><button type='button' class='btn btn-danger btn-xs' onClick='deleteLeadSourceAliasFromDB("+i+")'><i class='fa fa-window-close' aria-hidden='true'></i></button></td></tr>";
				$("#leadSourceAliasTable").find("tbody").append(aliasData);
			})
		}
	}else{
		$("#leadSourceAliasDetailsLoader").show();
		$.ajax({
			url:"loadleadSourceAliasRecords.do?salesLeadId="+$("#sales_lead_id").val(),
			success: function(data, textStatus, xhr)
			{
				$("#leadSourceAliasDetailsLoader").hide();
				if(data != null && data != "") {
					$("#leadSourceAliasTable").find("tbody").empty();
					//$('#leadSourceAliasTable').dataTable().fnClearTable();
					var tabledata = [];
					var aliasData ='';
					for(var i=0;i<data.length;i++){
						debugger;
						var rec=data[i];
						console.log("rec ::"+rec);
					    
						aliasData = "<tr id=row_"+i+"><td>"+(i+1)+"</td>,<td>"+rec+"</td><td><button type='button' class='btn btn-danger btn-xs' onClick='deleteLeadSourceAliasFromDB("+i+")'><i class='fa fa-window-close' aria-hidden='true'></i></button></td></tr>";
						$("#leadSourceAliasTable").find("tbody").append(aliasData);
					}
					//leadSourceAliasTableDataValue = data;
					//alert("leadSourceAliasTableDataValue load::"+leadSourceAliasTableDataValue);
					 $('#hidden_lead_source_alias').val(JSON.stringify(data));
					//alert("Alias data::"+$('#hidden_lead_source_alias').val());
				}
			},
			error: function(xhr, textStatus, errorThrow)
			{
				$("#leadSourceAliasDetailsLoader").hide();
				var row = $(this).closest('tr');
				var nRow = row[0];
				$('#leadSourceAliasTable').dataTable().fnDeleteRow(nRow);
				
//				debugger; 
				console.log(xhr);
				console.log(textStatus);
				console.log(errorThrow);
			}
		})
	
	}
	

}

function deleteLeadSourceAliasFromDB(index){
	$("#row_"+index).remove();
	var leadSourceAliasTableData = [];
	var $th = $("#leadSourceAliasTable thead th");
	$("#leadSourceAliasTable").find('tbody').find('tr').each(function(i, tr){
		var obj = {}, $tds = $(tr).find('td');
		leadSourceAliasTableData.push($tds.eq(1).text());
	});
	//leadSourceAliasTableDataValue.push(leadSourceAliasTableData);
	//alert("leadSourceAliasTableDataValue delete::"+leadSourceAliasTableDataValue);
	$('#hidden_lead_source_alias').val(JSON.stringify(leadSourceAliasTableData));
	rowCountTableData--;
}

function fetchOpportunityViewRecordsForFilter(){
	sequence = 0;
	sequenceForQuery = 0;
	pageCount = 1
	document.getElementById('pageValue').innerHTML = "P"+pageCount;
	fetchTotalOpportunityCountBasedOnFilter();
	fetchOpportunityViewRecords();
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
	}
	else if(dropdown=="contact_name"){
		$('#selectedCompanyName').attr('placeholder', 'Enter Contact Name');
		$('#selectedCompanyName').show();
	}
	else{
		$('#selectedCompanyName').hide();
	}
	
}


function fetchLeadViewRecordsBasedOnCompanyNameForFilter() {
	sequenceForNewOppr = 0;
	sequenceForQueryForNewOppr = 0;
	pageCountForNewOppr = 1;
	document.getElementById('pageValueForNewOppr').innerHTML = "P"+pageCountForNewOppr;
	totalLeadCountBasedOnCompanyContact();
	fetchLeadViewRecordsBasedOnCompanyName();
}

function fetchLeadViewRecordsBasedOnCompanyName() {
	debugger;
	$("#opportunityViewLoader").show();
	var fieldValue = $("#selectedCompanyName").val();
	$('#leadViewTable').dataTable().fnClearTable();
	var fetchSize = $("#setLimit").val();
	var dropdown=$("#selectCompanyContact").val();
	if(dropdown=="company_name"){
		var	finalurl='loadSelectedLeadViewRecordsBasedOnCompanyName.do?role='+role+"&username="+userName+"&leadStatus="+"O";
		var arr = {companyName:fieldValue,sequence:sequenceForQueryForNewOppr,fetchSize:fetchSize};
	}
	else if(dropdown=="contact_name"){
		var	finalurl='loadSelectedLeadViewRecordsBasedOnContactName.do?role='+role+"&username="+userName+"&leadStatus="+"O";
		var arr = {contactName:fieldValue,sequence:sequenceForQueryForNewOppr,fetchSize:fetchSize};
	}
	
	$.ajax({
		url:finalurl,
		data:arr,
		success:function(jsonData) {
			$("#opportunityViewLoader").hide();
			if(jsonData != null && jsonData != "" && jsonData != "[]") {
				jsonData = JSON.parse(jsonData);
				
				recLeadViewArr = jsonData;
				oldRecLeadViewArr = jsonData;
				showLeadViewRecord(jsonData);
				document.getElementById('loadNextForNewOppr').disabled = false;
				
				//document.getElementById('loadPrevForNewOppr').disabled = false;
			}else{
				//$("#opportunityNewTable").find("tbody").empty();
				$('#opportunityNewTable').dataTable().fnClearTable();
				document.getElementById('loadNextForNewOppr').disabled = true;
			}
			if(sequenceForNewOppr == "0") {
				document.getElementById('loadPrevForNewOppr').disabled = true;
			}else{
				document.getElementById('loadPrevForNewOppr').disabled = false;
			}
		}
	});
}

function resetFilterForNewOppr(){
	$("#selectCompanyContact").val("");
	$("#selectedCompanyName").val("");
	$("#selectedCompanyName").hide();
	sequenceForNewOppr = 0;
	sequenceForQueryForNewOppr = 0;
	pageCountForNewOppr = 1;
	document.getElementById('pageValueForNewOppr').innerHTML = "P"+pageCountForNewOppr;
	$('#opportunityNewTable').dataTable().fnClearTable();
	fetchOpportunityLeadViewCount();
	loadLeadViewRecords();
	
}

function fetchOpportunityLeadViewCount(){
	$.ajax({
		url : 'fetchOpportunityLeadViewCount.do?role='+role+"&userName="+userName,
		async: false,
		success : function(result) {
			document.getElementById('totalSalesLeadRecords').innerHTML = result;
		}
	});
}

/* function fetchTotalOpportunityCount(){
	$.ajax({
		url : "fetchTotalOpportunityCount.do",
		async: false,
		success : function(result) {
			document.getElementById('totalRecords').innerHTML = result;
			totalNoOfRecords = result;
			//alert("totalNoOfRecords=="+totalNoOfRecords);
		}
	}); 
} */

function fetchTotalOpportunityCount() {
	var dateRange = $("#reportrange span").text();	
	var arr = {role:role,sequence:sequenceForQuery,dateRange:dateRange,username:userName};
	$.ajax({
		url:'fetchTotalOpportunityCount.do',
		data: encodeURIComponent(JSON.stringify(arr)),
		success:function(result) {
			document.getElementById('totalRecords').innerHTML = result;
			totalNoOfRecords = result;
		}
	});
}

function fetchTotalOpportunityCountBasedOnFilter() {
	
	var selectedAssignedRep = $("#selectedAssignedRep").val();
	var selectedAssignedAM = $("#selectedAssignedAM").val();
	var selectedRegion = $("#selectedRegion").val();
	var selectedAccount = $("#selectedAccount").val();
	var selectedOrderType = $("#selectedOrderType").val();
	var selectedProductType = $("#selectedProductType").val();
	var selectedStage = $("#selectedStage").val();
	var dateRange = $("#reportrange span").text();
	
	if ($("#pendingOpp").is(":checked")) {
		fetchTotalOpportunityCountBasedOnPendingRows();
	}else{
		var arr = {assignedRep:selectedAssignedRep,assignedAM:selectedAssignedAM,region:selectedRegion,accountName:selectedAccount,orderType:selectedOrderType,productType:selectedProductType,
				stage:selectedStage,sequence:sequenceForQuery,dateRange:dateRange};
		
		$.ajax({
			url:'fetchTotalOpportunityCountBasedOnFilter.do',
			data:arr,
			success:function(result) {
				document.getElementById('totalRecords').innerHTML = result;
			}
		});
	}
}

function totalLeadCountBasedOnCompanyContact(){
	var fieldValue = $("#selectedCompanyName").val();
	var dropdown=$("#selectCompanyContact").val();
	if(dropdown=="company_name"){
		var	finalurl='loadSelectedLeadViewCountsBasedOnCompanyName.do?leadStatus='+"O";
		var arr = {companyName:fieldValue};
	}
	else if(dropdown=="contact_name"){
		var	finalurl='loadSelectedLeadViewCountsBasedOnContactName.do?leadStatus='+"O";
		var arr = {contactName:fieldValue};
	}
	$.ajax({
		url:finalurl,
		data:arr,
		success:function(result) {
			document.getElementById('totalSalesLeadRecords').innerHTML = result;
		}
	});
}


function fetchOpportunityViewCountBasedOnOpportunityName() {
	
	var loginuser = userName;
	var selectedOpportunityName = $("#selectedOpportunityName").val();
	var arr = {opportunityName:selectedOpportunityName};
	if ($("#pendingOpp").is(":checked")) {
		fetchTotalOpportunityCountBasedOnPendingRows();
	}else{
		$.ajax({
			url:'fetchOpportunityViewCountBasedOnOpportunityName.do',
			data:arr,
			success : function(result) {
				document.getElementById('totalRecords').innerHTML = result;
			}
		});
	}
}


function fetchTotalOpportunityCountBasedOnPendingRows() {
	
	var selectedAssignedRep = $("#selectedAssignedRep").val();
	var selectedAssignedAM = $("#selectedAssignedAM").val();
	var selectedRegion = $("#selectedRegion").val();
	var selectedAccount = $("#selectedAccount").val();
	var selectedOrderType = $("#selectedOrderType").val();
	var selectedProductType = $("#selectedProductType").val();
	var selectedStage = "8-closed-won";
	var dateRange = $("#reportrange span").text();
	var selectedOpportunityName = $("#selectedOpportunityName").val();
	
	var arr = {assignedRep:selectedAssignedRep,assignedAM:selectedAssignedAM,region:selectedRegion,accountName:selectedAccount,orderType:selectedOrderType,productType:selectedProductType,
			stage:selectedStage,sequence:sequenceForQuery,dateRange:dateRange,opportunityName:selectedOpportunityName};
	
	$.ajax({
		url:'fetchTotalOpportunityCountBasedOnPendingRows.do',
		data:arr,
		async:false,
		success:function(result) {
			document.getElementById('totalRecords').innerHTML = result;
		}
	});
}

function fetchOpportunityBasedOnPendingRows() {
	debugger;
	selectStageChecked = false;
	selectProductChecked = false;
	selectAssignedAMChecked=false;
	selectAssignedRepChecked=false;
	
	$("#opportunityViewLoader").show();
	
	var loginuser =userName;
	var selectedAssignedRep = $("#selectedAssignedRep").val();
	var selectedAssignedAM = $("#selectedAssignedAM").val();
	var selectedRegion = $("#selectedRegion").val();
	var selectedAccount = $("#selectedAccount").val();
	var selectedOrderType = $("#selectedOrderType").val();
	var selectedProductType = $("#selectedProductType").val();
	var selectedStage = $("#selectedStage").val();
	var dateRange = $("#reportrange span").text();
	var fetchSize = $("#setLimit").val();
	var selectedOpportunityName = $("#selectedOpportunityName").val();
	$('#opportunityViewTable').dataTable().fnClearTable();
	
	var arr = {assignedRep:selectedAssignedRep,assignedAM:selectedAssignedAM,region:selectedRegion,accountName:selectedAccount,orderType:selectedOrderType,productType:selectedProductType,
			stage:selectedStage,sequence:sequenceForQuery,dateRange:dateRange,fetchSize:fetchSize,opportunityName:selectedOpportunityName};
	
	$.ajax({
		url:'fetchOpportunityBasedOnPendingRows.do?role='+role+"&username="+userName,
		data:arr,
		success:function(jsonData) {
			$("#opportunityViewLoader").hide();
			if(jsonData != null && jsonData != "" && jsonData != "[]") {
				var origJSON= jsonData.replace(/"sales_lead_id":\s*([-+Ee0-9.]+)/g, '"sales_lead_id": "$1"'); 
				jsonData = JSON.parse(origJSON);
				
				recOpportunityViewArr = jsonData;
				oldRecOpportunityViewArr = jsonData;
				showOpportunityViewRecord(jsonData);
				document.getElementById('loadNext').disabled = false;
			}else{
				document.getElementById('loadNext').disabled = true;
			}
			if(sequence == "0") {
				document.getElementById('loadPrev').disabled = true;
			}else{
				document.getElementById('loadPrev').disabled = false;
			}
		}
	});
}


function openLoadCampaignLimitModal() {
	$('#loadCampaignLimitModal').modal("show");
}

function loadDataForNewLimit() {
	$("#opportunityViewLoader").show();
	setTimeout(function() {
		fetchTotalOpportunityCount();	
		loadOpportunityViewRecords();
	}, 1000);
	$('#loadCampaignLimitModal').modal("hide");
	$("#opportunityViewLoader").hide();
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

function goBackToPrevious() {
	window.history.back();
}	

function saveAudienceData(){
	if($("#audience_request_date").val() == null || $("#audience_request_date").val() == "") {
		$("#audience_request_date_msg").html("Please select date.").show();
		setTimeout(function(){$('#audience_request_date_msg').html("").hide();},6000);
		return false;
	}
	if($("#audienceClientName").val() == null || $("#audienceClientName").val() == "") {
		$("#audienceClientName_msg").html("Please enter client Name.").show();
		setTimeout(function(){$('#audienceClientName_msg').html("").hide();},6000);
		return false;
	}
	if($("#audienceSalesRepName").val() == null || $("#audienceSalesRepName").val() == "") {
		$("#audienceSalesRepName_msg").html("Please enter sales rep name.").show();
		setTimeout(function(){$('#audienceSalesRepName_msg').html("").hide();},6000);
		return false;
	}
	if($("#audienceEmailId").val() == null || $("#audienceEmailId").val() == "") {
		$("#audienceEmailId_msg").html("Please enter email.").show();
		setTimeout(function(){$('#audienceEmailId_msg').html("").hide();},6000);
		return false;
	}
	debugger;
	var maxContact = $("#audienceMaxContacts").val();
	if(maxContact != null && maxContact != ""){
		var maxContactPerCompany = parseInt(maxContact);
		if(!maxContactPerCompany >=1) {
			$("#audienceMaxContacts_msg").html("minimum 1 contact per company required").show();
			setTimeout(function(){$('#audienceMaxContacts_msg').html("").hide();},6000);
			return false;
		}
	}
	
	
	var audienceClientName = $("#audienceClientName").val();
	var audienceSalesRepName = $("#audienceSalesRepName").val();
	var audienceEmailId = $("#audienceEmailId").val();
	var audienceIndustry = $("#audienceIndustry").val();
	var audienceJobFunction = $("#jobFunction").val();
	var audienceSeniorityLevel = $("#seniorityLevel").val();
	var audienceBudget = $("#audienceBudget").val();
	var audienceTimeline = $("#audienceTimeline").val();
	var audienceMaxContacts = $("#audienceMaxContacts").val();
	var audienceNote = $("#audienceNote").val();
	var audienceDate = $("#audience_request_date").val();
	var audienceCountry = $("#selectedHqCountryDropdown").val();
	var audienceCompanySize = $("#selectedCompanySizeDropdown").val();
	var audienceRequestId = $("#hidden_audience_request_id").val();
	var abmFileId = $("#hidden_abm_file_id").val();
	var exclutionFileId = $("#hidden_exclution_file_id").val();
	var competitorFileId = $("#hidden_competitor_file_id").val();
	var salesOpportunityId = $("#sales_opportunity_id").val();
	var salesleadid = $("#sales_lead_id").val();
	var region = $("#company_region").val();
	var opportunityname = $("#opportunityname").val();
	debugger;
	
	var queryString="audienceClientName="+encodeURIComponent(audienceClientName)+"&audienceSalesRepName="+audienceSalesRepName+"&audienceEmailId="+audienceEmailId+"&audienceDate="+audienceDate+"&audienceCountry="+audienceCountry+"&audienceCompanySize="+audienceCompanySize+"&audienceIndustry="+encodeURIComponent(audienceIndustry)+"&audienceJobFunction="+encodeURIComponent(audienceJobFunction)+"&audienceSeniorityLevel="+encodeURIComponent(audienceSeniorityLevel)+"&audienceBudget="+audienceBudget+"&audienceTimeline="+audienceTimeline+"&audienceMaxContacts="+audienceMaxContacts+"&audienceNote="+encodeURIComponent(audienceNote)+"&salesOpportunityId="+salesOpportunityId+"&salesleadid="+salesleadid+"&region="+region+"&opportunityname="+encodeURIComponent(opportunityname)+"&audienceRequestId="+audienceRequestId+"&abmFileId="+abmFileId+"&exclutionFileId="+exclutionFileId+"&competitorFileId="+competitorFileId;
	console.log("queryString::"+queryString);
	var formData=new FormData();
	formData.append("abmFile",$("#abmFile")[0].files[0]);
	formData.append("exclusionFile",$("#exclusionFile")[0].files[0]);
	formData.append("competitorFile",$("#competitorFile")[0].files[0]);
	debugger;
	
	if($('#abmFile').prop("files")[0] !=null && $('#abmFile').prop("files")[0] !="" && $('#abmFile').prop("files")[0] !="undefined"){
		var abmFileName = $('#abmFile').prop("files")[0]['name'];
		if(abmFileName != null && abmFileName !="" && abmFileName !="undefined"){
			if(abmFileName.lastIndexOf(".jpg") != -1 || abmFileName.lastIndexOf(".jpeg") != -1 || abmFileName.lastIndexOf(".pdf") != -1 || abmFileName.lastIndexOf(".doc") != -1 || abmFileName.lastIndexOf(".csv") != -1 || abmFileName.lastIndexOf(".xls") != -1 || abmFileName.lastIndexOf(".xlsx") != -1) {
				
			}else{
				$("#abmFile_msg").html("*only .jpg,.jpeg,.pdf,.img,.doc,.docx,.csv,.xls,.xlsx file are allowed").show();
				setTimeout(function(){$('#abmFile_msg').html("").hide();},validationMessageTimeout);
				return false;
			}
		}
	}
	debugger;
	if($('#exclusionFile').prop("files")[0] !=null && $('#exclusionFile').prop("files")[0] !="" && $('#exclusionFile').prop("files")[0] !="undefined"){
		var exclusionFileName = $('#exclusionFile').prop("files")[0]['name'];
		if(exclusionFileName != null && exclusionFileName !="" && exclusionFileName !="undefined"){
			if(exclusionFileName.lastIndexOf(".jpg") != -1 || exclusionFileName.lastIndexOf(".jpeg") != -1 || exclusionFileName.lastIndexOf(".pdf") != -1 || exclusionFileName.lastIndexOf(".doc") != -1 || exclusionFileName.lastIndexOf(".csv") != -1 || exclusionFileName.lastIndexOf(".xls") != -1 || exclusionFileName.lastIndexOf(".xlsx") != -1) {
				
			}else{
				$("#exclusionFile_msg").html("*only .jpg,.jpeg,.pdf,.doc,.docx,.csv,.xls,.xlsx file are allowed").show();
				setTimeout(function(){$('#exclusionFile_msg').html("").hide();},validationMessageTimeout);
				return false;
			}
		}
	}
	debugger;
	if($('#competitorFile').prop("files")[0] !=null && $('#competitorFile').prop("files")[0] !="" && $('#competitorFile').prop("files")[0] !="undefined"){
		var competitorFileName = $('#competitorFile').prop("files")[0]['name'];
		if(competitorFileName != null && competitorFileName !="" && competitorFileName !="undefined"){
			if(competitorFileName.lastIndexOf(".jpg") != -1 || competitorFileName.lastIndexOf(".jpeg") != -1 ||competitorFileName.lastIndexOf(".pdf") != -1 || competitorFileName.lastIndexOf(".doc") != -1 || competitorFileName.lastIndexOf(".csv") != -1 || competitorFileName.lastIndexOf(".xls") != -1 || competitorFileName.lastIndexOf(".xlsx") != -1) {
				
			}else{
				$("#competitorFile_msg").html("*only .jpg,.jpeg,.pdf,.doc,.docx,.csv,.xls,.xlsx file are allowed").show();
				setTimeout(function(){$('#competitorFile_msg').html("").hide();},validationMessageTimeout);
				return false;
			}
		}
	}
	$("#audienceLoader").show();
	document.getElementById('submitAudienceData').disabled = true;
	document.documentElement.scrollTop = 0;
	$.ajax({
		url			:	"saveAudienceData.do?"+queryString,
		data		:	formData,
		contentType	:	false,
		cache		:	false,
		processData	:	false,
		type		:	"POST",
		success		:	function(data, textStatus, xhr) {
			$("#audienceLoader").hide();
			document.getElementById('submitAudienceData').disabled = false;
			if(data != null && data !="" && data !="undefined"){
				if(data=="insertAudienceRequest") {
					$("#audienceSuccessMsg").html("Audience data inserted successfully").show();
	        		setTimeout(function(){
	        			$('#audienceSuccessMsg').hide();
	        			$('#myTab a[href="#empDetailsTab"]').tab('show');
	        		},3000);
	        	}else if(data=="updateAudienceRequest") {
					$("#audienceSuccessMsg").html("Audience data updated successfully").show();
	        		setTimeout(function(){
	        			$('#audienceSuccessMsg').hide();
	        			$('#myTab a[href="#empDetailsTab"]').tab('show');
	        		},3000);
	        	}
				else{
	        		$("#audienceErrorMsg").html("error occured while inserting the audience request data").show();
	        		setTimeout(function(){$('#audienceErrorMsg').hide();},5000);
	        	}
			}else{
        		$("#audienceErrorMsg").html("**error occured while inserting the audience request data").show();
        		setTimeout(function(){$('#audienceErrorMsg').hide();},5000);
        	}
			
		},
		error		:	function(xhr, textStatus, errorThrow) {
			$("#audienceLoader").hide();
			document.getElementById('submitAudienceData').disabled = false;
			$("#audienceErrorMsg").html("error occured while inserting the audience request data").show();
    		setTimeout(function(){$('#audienceErrorMsg').hide();},5000);
		}
	});
	
}

function prefillAudienceData() {
	debugger;
	//$("#audienceLoader").hide();
	var opp_id=$("#sales_opportunity_id").val();
	if(opp_id != null && opp_id !="" && opp_id !="undefined"){
		$("#audienceLoader").show();
		$("#audienceErrorMsg").html('');
		document.getElementById('submitAudienceData').disabled = false;
		$("#audienceClientName").val($("#accountname").val());
		$("#audienceSalesRepName").val($("#assigned_salesrep").val());
		$("#audienceEmailId").val($("#corporate_email").val());
		
		$.ajax({
			url:'prefillAudienceData.do?opp_id='+opp_id,
			async: false,
			success: function(data, textStatus, xhr)
			{
				debugger;
				$("#audienceLoader").hide();
				if(data != null && data != "" && data.length > 0) {
					data = JSON.parse(data);
					var audienceRequest = JSON.parse(data[0].audienceRequest);
					//var audienceRequestListFile = JSON.parse(data[0].audienceRequestListFile);
					debugger;
					if(audienceRequest !=null && audienceRequest !="" && audienceRequest !="undefined"){
						$("#hidden_audience_request_id").val(audienceRequest.audience_request_id_text);
						//$("#audienceClientName").val(audienceRequest.client_name);
						//$("#audienceSalesRepName").val(audienceRequest.sales_rep);
						//$("#audienceEmailId").val(audienceRequest.email);
						$("#audienceIndustry").val(audienceRequest.industry);
						$("#jobFunction").val(audienceRequest.job_function);
						$("#seniorityLevel").val(audienceRequest.seniority);
						$("#audienceBudget").val(audienceRequest.budget);
						$("#audienceTimeline").val(audienceRequest.timeline);
						$("#audienceMaxContacts").val(audienceRequest.contacts_per_company);
						$("#audienceNote").val(audienceRequest.note);
						$("#selectedHqCountryDropdown").val(audienceRequest.country);
						$("#selectedCompanySizeDropdown").val(audienceRequest.company_size);
						
						$("#audienceIndustry").prop("title",$("#audienceIndustry").val());
						$("#jobFunction").prop("title",$("#jobFunction").val());
						$("#seniorityLevel").prop("title",$("#seniorityLevel").val());
						$("#selectedHqCountryDropdown").prop("title",$("#selectedHqCountryDropdown").val());
						$("#selectedCompanySizeDropdown").prop("title",$("#selectedCompanySizeDropdown").val());
						
						if(audienceRequest.date != null && audienceRequest.date != "") {
							var audienceRequestDate = new Date(audienceRequest.date);
							var month = audienceRequestDate.getMonth()+1;
							audienceRequestDate = audienceRequestDate.getFullYear()+"-"+(month <= 9 ? '0'+month : month)+"-"+audienceRequestDate.getDate();
							$("#audience_request_date").val(audienceRequestDate);
						}
					}else{
						$("#audienceClientName").val($("#accountname").val());
						$("#audienceSalesRepName").val($("#assigned_salesrep").val());
						$("#audienceEmailId").val($("#corporate_email").val());
					}
					debugger;
					if("audienceRequestAbmFile" in data[0]){
						var audienceRequestAbmFile = JSON.parse(data[0].audienceRequestAbmFile);
						if(audienceRequestAbmFile !=null && audienceRequestAbmFile !="" && audienceRequestAbmFile !="undefined"){
							if(audienceRequestAbmFile.file_name != null && audienceRequestAbmFile.file_name != "" && audienceRequestAbmFile.file_name != "undefined") {
								$("#abmFileOutput").html('<span style="font-weight:bold"></span><a href="#" onClick=loadAudienceRequestFile("'+audienceRequestAbmFile.file_id_text+'") >'+audienceRequestAbmFile.file_name+'</a><br>');
								$("#hidden_abm_file_id").val(audienceRequestAbmFile.file_id_text);
							}
						}
					}
					
					if("audienceRequestExclusionFile" in data[0]){
						var audienceRequestExclusionFile = JSON.parse(data[0].audienceRequestExclusionFile);
						if(audienceRequestExclusionFile !=null && audienceRequestExclusionFile !="" && audienceRequestExclusionFile !="undefined"){
							if(audienceRequestExclusionFile.file_name != null && audienceRequestExclusionFile.file_name != "" && audienceRequestExclusionFile.file_name != "undefined") {
								$("#exclusionFileOutput").html('<span style="font-weight:bold"></span><a href="#" onClick=loadAudienceRequestFile("'+audienceRequestExclusionFile.file_id_text+'") >'+audienceRequestExclusionFile.file_name+'</a><br>');
								$("#hidden_exclution_file_id").val(audienceRequestExclusionFile.file_id_text);
							}
						}
					}
					if("audienceRequestExclusionFile" in data[0]){
						var audienceRequestCompetitorFile = JSON.parse(data[0].audienceRequestCompetitorFile);
						if(audienceRequestCompetitorFile !=null && audienceRequestCompetitorFile !="" && audienceRequestCompetitorFile !="undefined"){
							if(audienceRequestCompetitorFile.file_name != null && audienceRequestCompetitorFile.file_name != "" && audienceRequestCompetitorFile.file_name != "undefined") {
								$("#competitorFileOutput").html('<span style="font-weight:bold"></span><a href="#" onClick=loadAudienceRequestFile("'+audienceRequestCompetitorFile.file_id_text+'") >'+audienceRequestCompetitorFile.file_name+'</a><br>');
								$("#hidden_competitor_file_id").val(audienceRequestCompetitorFile.file_id_text);
							}
						}
					}
				}else{
					$("#audienceClientName").val($("#accountname").val());
					$("#audienceSalesRepName").val($("#assigned_salesrep").val());
					$("#audienceEmailId").val($("#corporate_email").val());
					
					$("#audienceIndustry").prop("title",$("#audienceIndustry").val());
					$("#jobFunction").prop("title",$("#jobFunction").val());
					$("#seniorityLevel").prop("title",$("#seniorityLevel").val());
					$("#selectedHqCountryDropdown").prop("title",$("#selectedHqCountryDropdown").val());
					$("#selectedCompanySizeDropdown").prop("title",$("#selectedCompanySizeDropdown").val());
				}
			},
			error		:	function(xhr, textStatus, errorThrow) {
				$("#audienceLoader").hide();
				$("#audienceErrorMsg").html("error occured while featching the audience record").show();
	    		setTimeout(function(){$('#audienceErrorMsg').hide();},5000);
			}
			
		})
	
	}else{
		$("#audienceErrorMsg").html("*create the opportunity first for submit audience data.").show();
		document.getElementById('submitAudienceData').disabled = true;
	}
	 
	
}

function loadAudienceRequestFile(fileId){
	if(fileId !=null && fileId !="" && fileId !="undefined"){
		document.location.href ='amus.loadAudienceRequestFile?fileId='+fileId;
	}else{
		$("#audienceErrorMsg").html("**error occured while downloading the audience request file.").show();
		setTimeout(function(){$('#audienceErrorMsg').hide();},5000);
	}
}

function displayHqCountryDropdown(){	
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
			if($("#selectedHqCountryDropdown").val() != null && $("#selectedHqCountryDropdown").val() != "") {
				var hqCountryDropdownArray = $("#selectedHqCountryDropdown").val().split(",");
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
		$("#selectedHqCountryDropdown").prop("title",$("#selectedHqCountryDropdown").val());
		//selectHqCountryDropdownChecked = true;
		return false;
}

function displayCompanySizeDropdown(){	
	debugger;
	$('#companySizeDropdownSpin').show();
	
	$.ajax({
		url		:	"loadCompanySize.do",
		success	:	function(data) {
			if(data != null && data != "") {
				debugger;
				companySizeDropdownObj = JSON.parse(data);
				var companySizeDropdownVal = $("#selectedCompanySizeDropdown").val().split(",");
				companySizeDropdownProbabilityMap  = new Map();
				html = '';
				var i=0;
				$.each(companySizeDropdownObj, function(key, value){
					if(companySizeDropdownVal != null && companySizeDropdownVal != "" && companySizeDropdownVal.indexOf(value)>-1) {
						html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectCompanySizeDropdown(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=audienceCompanySize'+i+' value="'+value+'" checked><text style="font-size: 0.8125rem;"  for="audienceCompanySize'+i+'">'+key+'</label></div></div>';
					}
					else {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectCompanySizeDropdown(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=audienceCompanySize'+i+' value="'+value+'"><text  style="font-size: 0.8125rem;" for="audienceCompanySize'+i+'">'+key+'</label></div></div>';
					}
					i++;
					
					companySizeDropdownProbabilityMap.set(key,value);
				});
				$("#companySizeDropdownMultiSelect").html(html);
				$("#companySizeDropdownMultiSelectParent").show().css("width", "100%");
				$('#companySizeDropdownSpin').hide();
			}
		}
	});
}
	
function filterCompanySizeDropdown() {
	debugger;	
	html='';
		var i=0;
		if(companySizeDropdownOptions == "") {
			if($("#selectedCompanySizeDropdown").val() != null && $("#selectedCompanySizeDropdown").val() != "") {
				var companySizeDropdownArray = $("#selectedCompanySizeDropdown").val().split(",");
				$.each(companySizeDropdownArray, function(i) {
					companySizeDropdownOptions.push(companySizeDropdownArray[i]);
				});
			} 
		}
		
		$.each(companySizeDropdownObj, function(key, value){
			var searchedText=$('#companySizeDropdownSearch').val();
			try {
				if(key.toLowerCase().indexOf(searchedText.toLowerCase())>-1){
					if(companySizeDropdownOptions.length>0) {
						if(companySizeDropdownOptions.indexOf(key)>-1) {
							html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectCompanySizeDropdown(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedCompanySizeDropdown'+i+' value="'+value+'" checked><text style="font-size: 0.8125rem;"  for="selectedCompanySizeDropdown'+i+'">'+key+'</label></div></div>';
						}
						else {
							html=html+'<div class="dropdown-item py-0 px-1" onClick="selectCompanySizeDropdown(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedCompanySizeDropdown'+i+' value="'+value+'"><text  style="font-size: 0.8125rem;" for="selectedCompanySizeDropdown'+i+'">'+key+'</label></div></div>';
						}
					}
					else {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectCompanySizeDropdown(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedCompanySizeDropdown'+i+' value="'+value+'"><text  style="font-size: 0.8125rem;" for="selectedCompanySizeDropdown'+i+'">'+key+'</label></div></div>';
					}
				}
			}
			catch(e) {
				console.log(e.message);
			}
			i++;
		});
		$("#companySizeDropdownMultiSelect").html(html);
		$("#companySizeDropdownMultiSelectParent").show().css("width", "100%");
		$('#companySizeDropdownSpin').hide();
	}
function selectCompanySizeDropdown(event) {
	 debugger;
	 	var $target = $(event.currentTarget),
		val = $target.find('input[type="checkbox"]').attr('value'),
		$inp = $target.find('input[type="checkbox"]'),
		idx;
		
		if(companySizeDropdownOptions == "") {
			if($("#selectedCompanySizeDropdown").val() != null && $("#selectedCompanySizeDropdown").val() != "") {
				var companySizeDropdownArray = $("#selectedCompanySizeDropdown").val().split(",");
				$.each(companySizeDropdownArray, function(i) {
					companySizeDropdownOptions.push(companySizeDropdownArray[i]);
				});
			} 
		}
		
		if ((idx = companySizeDropdownOptions.indexOf(val)) > -1) {
			companySizeDropdownOptions.splice(idx, 1);
			setTimeout(function() {$inp.prop('checked', false)}, 0);
			$inp.prop('checked', false).closest('.dropdown-item').removeClass("active");
		}
		else {
			if(companySizeDropdownOptions.indexOf(val) == -1) {
				companySizeDropdownOptions.push(val);
				setTimeout(function() {$inp.prop('checked', true)}, 0);
				$inp.prop('checked', true).closest('.dropdown-item').addClass("active");
			}
		}
		$("#companySizeDropdownMultiSelectParent").dropdown('toggle');
		//$("#companySizeDropdownMultiSelectParent").show().css("width", "100%");
		$("#selectedCompanySizeDropdown").val(companySizeDropdownOptions);
		$("#selectedCompanySizeDropdown").prop("title",$("#selectedCompanySizeDropdown").val());
		//selectCompanySizeDropdownChecked = true;
		return false;
}


function displayIndustry (){
	debugger;
	$('#industrySpin').show();
			data = industryList;
			if(data != "") {
				industryObj = JSON.parse(data);
				var industryVal = $("#audienceIndustry").val().split(",");
				html = '';
				var i=0;
				$.each(industryObj, function(key, value){
					if(industryVal != null && industryVal != "" && industryVal.indexOf(value)>-1) {
						html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectIndustry(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=salesorderindustry'+i+' value="'+value+'" checked><label class="form-check-label" for="salesorderindustry'+i+'">'+key+'</label></div></div>';
					}
					else {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectIndustry(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=salesorderindustry'+i+' value="'+value+'"><label class="form-check-label" for="salesorderindustry'+i+'">'+key+'</label></div></div>';
					}
					i++;
				});
				$("#industryMultiSelect").html(html);
				$("#industryMultiSelectParent").show().css("width", "100%");
				$('#industrySpin').hide(); 
			}
}


function filterIndustry() {
	html='';
	var i=0;
	if(industryOptions == "") {
		if($("#audienceIndustry").val() != null && $("#audienceIndustry").val() != "") {
			var industryArray = $("#industry").val().split(",");
			$.each(industryArray, function(i) {
				industryOptions.push(industryArray[i]);
			});
		} 
	}
	
	$.each(industryObj, function(key, value){
		try {
			var searchedText=$('#industrySearch').val();
			if(value.toLowerCase().indexOf(searchedText.toLowerCase())>-1){
				if(industryOptions.length>0) {
					if(industryOptions.indexOf(key)>-1) {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectIndustry(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=industry'+i+' value="'+value+'" checked><label class="form-check-label" for="industry'+i+'">'+key+'</label></div></div>';
					}
					else {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectIndustry(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=industry'+i+' value="'+value+'"><label class="form-check-label" for="industry'+i+'">'+key+'</label></div></div>';
					}
				}
				else {
					html=html+'<div class="dropdown-item py-0 px-1" onClick="selectIndustry(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=industry'+i+' value="'+value+'"><label class="form-check-label" for="industry'+i+'">'+key+'</label></div></div>';
				}
			}
		}
		catch(e) {
			console.log(e.message);
		}
		i++;
	});
	$("#industryMultiSelect").html(html);
}

function selectIndustry(event) {
	debugger;
	var $target = $(event.currentTarget),
	val = $target.find('input[type="checkbox"]').attr('value'),
	$inp = $target.find('input[type="checkbox"]'),
	idx;
	
	if(industryOptions == "") {
		if($("#audienceIndustry").val() != null && $("#audienceIndustry").val() != "") {
			var industryArray = $("#audienceIndustry").val().split(",");
			$.each(industryArray, function(i) {
				industryOptions.push(industryArray[i]);
			});
		} 
	}
	
	if ((idx = industryOptions.indexOf(val)) > -1) {
		industryOptions.splice(idx, 1);
		setTimeout(function() {$inp.prop('checked', false)}, 0);
		$inp.prop('checked', false).closest('.dropdown-item').removeClass("active");
	}
	else {
		if(industryOptions.indexOf(val) == -1) {
			industryOptions.push(val);
			setTimeout(function() {$inp.prop('checked', true)}, 0);
			$inp.prop('checked', true).closest('.dropdown-item').addClass("active");
		}
	}
	$("#industryMultiSelectParent").dropdown('toggle');
	$("#audienceIndustry").val(industryOptions);
	$("#audienceIndustry").prop("title",$("#audienceIndustry").val());
	return false;
}

function displayJobFunction(){
	$('#jobFunctionSpin').show();
	data = jobfunctionList;
			if(data != "") {
				jobFunctionObj = JSON.parse(data);
				var jobFunctionVal = $("#jobFunction").val().split(",");
				html = '';
				var i=0;
				$.each(jobFunctionObj, function(key, value){
					if(jobFunctionVal != null && jobFunctionVal != "" && jobFunctionVal.indexOf(value)>-1) {
						html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectJobFunction(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=jobFunction'+i+' value="'+value+'" checked><label class="form-check-label" for="jobFunction'+i+'">'+key+'</label></div></div>';
					}
					else {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectJobFunction(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=jobFunction'+i+' value="'+value+'"><label class="form-check-label" for="jobFunction'+i+'">'+key+'</label></div></div>';
					}
					i++;
				});
				$("#jobFunctionMultiSelect").html(html);
				$("#jobFunctionMultiSelectParent").show().css("width", "100%");
				$('#jobFunctionSpin').hide(); 
			}
}

function filterJobFunction() {
	html='';
	var i=0;
	if(jobFunctionOptions == "") {
		if($("#jobFunction").val() != null && $("#jobFunction").val() != "") {
			var jobFunctionArray = $("#jobFunction").val().split(",");
			$.each(jobFunctionArray, function(i) {
				jobFunctionOptions.push(jobFunctionArray[i]);
			});
		} 
	}
	
	$.each(jobFunctionObj, function(key, value){
		var searchedText=$('#jobFunctionSearch').val();
		try {
			if(value.toLowerCase().indexOf(searchedText.toLowerCase())>-1){
				if(jobFunctionOptions.length>0) {
					if(jobFunctionOptions.indexOf(key)>-1) {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectJobFunction(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=jobFunction'+i+' value="'+value+'" checked><label class="form-check-label" for="jobFunction'+i+'">'+key+'</label></div></div>';
					}
					else {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectJobFunction(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=jobFunction'+i+' value="'+value+'"><label class="form-check-label" for="jobFunction'+i+'">'+key+'</label></div></div>';
					}
				}
				else {
					html=html+'<div class="dropdown-item py-0 px-1" onClick="selectJobFunction(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=jobFunction'+i+' value="'+value+'"><label class="form-check-label" for="jobFunction'+i+'">'+key+'</label></div></div>';
				}
			}
		}
		catch(e) {
			console.log(e.message);
		}
		i++;
	});
	$("#jobFunctionMultiSelect").html(html);
}

function selectJobFunction(event) {
	debugger;
	var $target = $(event.currentTarget),
	val = $target.find('input[type="checkbox"]').attr('value'),
	$inp = $target.find('input[type="checkbox"]'),
	idx;
	
	if(jobFunctionOptions == "") {
		if($("#jobFunction").val() != null && $("#jobFunction").val() != "") {
			var jobFunctionArray = $("#jobFunction").val().split(",");
			$.each(jobFunctionArray, function(i) {
				jobFunctionOptions.push(jobFunctionArray[i]);
			});
		} 
	}
	if ((idx = jobFunctionOptions.indexOf(val)) > -1) {
		jobFunctionOptions.splice(idx, 1);
		setTimeout(function() {$inp.prop('checked', false)}, 0);
		$inp.prop('checked', false).closest('.dropdown-item').removeClass("active");
	}
	else {
		if(jobFunctionOptions.indexOf(val) == -1) {
			jobFunctionOptions.push(val); 
			setTimeout(function() {$inp.prop('checked', true)}, 0);
			$inp.prop('checked', true).closest('.dropdown-item').addClass("active");
		}
	}
	$("#jobFunctionMultiSelectParent").dropdown('toggle');
	$("#jobFunction").val(jobFunctionOptions);
	$("#jobFunction").prop("title",$("#jobFunction").val());
	return false;
}

function displaySeniorityLevel(){
	$('#seniorityLevelSpin').show();
	var url='';
			data = senioritylevelList;
			if(data != "") {
				seniorityLevelObj = JSON.parse(data);
				var seniorityLevelVal = $("#seniorityLevel").val().split(",");
				html = '';
				var i=0;
				$.each(seniorityLevelObj, function(key, value){
					if(seniorityLevelVal != null && seniorityLevelVal != "" && seniorityLevelVal.indexOf(value)>-1) {
						html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectSeniorityLevel(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=seniorityLevel'+i+' value="'+value+'" checked><label class="form-check-label" for="seniorityLevel'+i+'">'+key+'</label></div></div>';
					}
					else {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectSeniorityLevel(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=seniorityLevel'+i+' value="'+value+'"><label class="form-check-label" for="seniorityLevel'+i+'">'+key+'</label></div></div>';
					}
					i++;
				});
				$("#seniorityLevelMultiSelect").html(html);
				$("#seniorityLevelMultiSelectParent").show().css("width", "100%");
				$('#seniorityLevelSpin').hide(); 
			}
}

function filterSeniorityLevel() {
	html='';
	var i=0;
	if(seniorityLevelOptions == "") {
		if($("#seniorityLevel").val() != null && $("#seniorityLevel").val() != "") {
			var seniorityLevelArray = $("#seniorityLevel").val().split(",");
			$.each(seniorityLevelArray, function(i) {
				seniorityLevelOptions.push(seniorityLevelArray[i]);
			});
		} 
	}
	
	$.each(seniorityLevelObj, function(key, value){
		try {
			var searchedText=$('#seniorityLevelSearch').val();
			if(value.toLowerCase().indexOf(searchedText.toLowerCase())>-1){
				if(seniorityLevelOptions.length>0) {
					if(seniorityLevelOptions.indexOf(key)>-1) {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectSeniorityLevel(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=seniorityLevel'+i+' value="'+value+'" checked><label class="form-check-label" for="seniorityLevel'+i+'">'+key+'</label></div></div>';
					}
					else {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectSeniorityLevel(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=seniorityLevel'+i+' value="'+value+'"><label class="form-check-label" for="seniorityLevel'+i+'">'+key+'</label></div></div>';
					}
				}
				else {
					html=html+'<div class="dropdown-item py-0 px-1" onClick="selectSeniorityLevel(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=seniorityLevel'+i+' value="'+value+'"><label class="form-check-label" for="seniorityLevel'+i+'">'+key+'</label></div></div>';
				}
			}
		}
		catch(e) {
			console.log(e.message);
		}
		i++;
	});
	$("#seniorityLevelMultiSelect").html(html);
}

function selectSeniorityLevel(event) {
	var $target = $(event.currentTarget),
	val = $target.find('input[type="checkbox"]').attr('value'),
	$inp = $target.find('input[type="checkbox"]'),
	idx;
	
	if(seniorityLevelOptions == "") {
		if($("#seniorityLevel").val() != null && $("#seniorityLevel").val() != "") {
			var seniorityLevelArray = $("#seniorityLevel").val().split(",");
			$.each(seniorityLevelArray, function(i) {
				seniorityLevelOptions.push(seniorityLevelArray[i]);
			});
		} 
	}
	
	if ((idx = seniorityLevelOptions.indexOf(val)) > -1) {
		seniorityLevelOptions.splice(idx, 1);
		setTimeout(function() {$inp.prop('checked', false)}, 0);
		$inp.prop('checked', false).closest('.dropdown-item').removeClass("active");
	}
	else {
		if(seniorityLevelOptions.indexOf(val) == -1) {
			seniorityLevelOptions.push(val);
			setTimeout(function() {$inp.prop('checked', true)}, 0);
			$inp.prop('checked', true).closest('.dropdown-item').addClass("active");
		}
	}
	$("#seniorityLevelMultiSelectParent").dropdown('toggle');
	$("#seniorityLevel").val(seniorityLevelOptions);
	$("#seniorityLevel").prop("title",$("#seniorityLevel").val());
	return false;
}



