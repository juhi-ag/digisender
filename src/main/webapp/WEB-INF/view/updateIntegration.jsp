<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Update Datapass</title>
<link rel="apple-touch-icon" sizes="180x180" href="${pageContext.request.contextPath}/resources/images/fav/apple-touch-icon.png">
<link rel="manifest" href="${pageContext.request.contextPath}/resources/images/fav/site.webmanifest">

<meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#ffffff">

<!-- Bootstrap -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/bootstrap4.min.css">
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/hxv7cob.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/main.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/dc_main.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/select2.min.css">
	
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="${pageContext.request.contextPath}/resources/script/jquery-3.3.1.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/script/jquery-migrate-3.0.1.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/script/bootstrap.bundle.min.js"></script>
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/script/select2.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/script/jquery.confirm.js"></script>
<script src="${pageContext.request.contextPath}/resources/script/jquery.confirm1.js"></script>


<style type="text/css">.ic-para1{width: 100%;float: left;}</style>


<script>
var sunmartechMandatoryFields = "${ldUiPropertyConfig.sunmartechMandatoryFields}";
var clientSpecificValidations = "${ldUiPropertyConfig.clientSpecificValidations}";
var customFieldLength = "${ldUiPropertyConfig.customFieldLength}";
var staticFieldLength = "${ldUiPropertyConfig.staticFieldLength}";
var headerFieldLength = "${ldUiPropertyConfig.headerFieldLength}";
var sunmartechMandatoryField='';
var sunmartechMandatoryFieldLength=0;
var loginUserName = "${user}";
var clientNameDropdownObj;
var clientNameDropdownOptions = [];
var selectClientNameDropdownChecked = false;
var integrationNameDropdownObj;
var integrationNameDropdownOptions = [];
var selectIntegrationNameDropdownChecked = false;
var arrow= false;
var recArr=new Array();
var compCountForCustomField=0;
var compCountForStaicField=0;
var validationValue='';
var csfValidationValue=0;
var validationJsonArray = [];
var isCustomField = false;
var editIndexValue = 0;
var sendTestLeadIndexValue=0;
var defaultValidationValue='';
var lookupFieldsExactMatchArray = [];
var lookupFieldsPhraseMatchArray = [];
//var clientOthersLookup = '';
//var clientOthersLookupArray = [];
var lookupFileUoloadTableCheck = false;
//var previousValidationJsonArray = [];
//var defaultClientOthersLookup='';
var showHideButton=false;
var defaultLookupField='';
var lookupField='';
var compCountForMyFreshWorksCustomField=0;
var isCustomFieldForMyFreshWorks = false;
var checkCustomTabEnable = false;
var compCountForHeaderFields=0;
var headerNameValue = '';
var headerNameValueForAccept = '';
var headerNameValueForAcceptCharset = '';
var headerNameValueForUserAgent = '';
var callHeaderField = true;
var dataArrForSave = [];
var ssStaticFieldJsonArray = [];
var ssMultipleStaticFieldsValues='';
var headerNameValueForAcceptEncoding = '';
var lookupValueForMatch='';
var lookupValueForPhraseMatch='';
var sequence = 0;
var sequenceForQuery = 0;
var pageCount = 1;
var indexForDiscard = 0;
var lookupValues = '';
var queryForIntegration='';
var searchFlag = true;
var compCountForJsonField=0;
var jsonFieldValue = '';
var jsonFieldDataLength=0;
var restOauthDefaultValue = "${ldUiPropertyConfig.restOauthDefaultValue}";
var endpointAccesstokenDefaultValue = "${ldUiPropertyConfig.endpointAccesstokenDefaultValue}";
var sunmartechJsonFields = "${ldUiPropertyConfig.sunmartechJsonFields}";
var refreshPageTimer = "${ldUiPropertyConfig.refreshTimer}";
var exceedPageTimer = "${ldUiPropertyConfig.exceedTimer}";
var exceedInMin="${exceedInMin}";
var clientSpecificJsonMapping='';

debugger;
if(sunmartechMandatoryFields != null && sunmartechMandatoryFields != "") {
	sunmartechMandatoryField = sunmartechMandatoryFields.split(",");
	sunmartechMandatoryFieldLength = sunmartechMandatoryField.length;
}

</script>
<style> 
.dropdown-menu.show 
{
    display: block;
    transform: translate3d(0px, 0px, 0px) !important;
}
</style> 
<script>

$(document).ready(function(){
	$("#divDrpDownMenuItem").html("<div class='dropdown-menu' aria-labelledby='dLabel'><a class='dropdown-item' href='index' title='Go to Home'><i class='fa fa-home fa-lg' aria-hidden='true'></i> &nbsp; Home</a><div class='dropdown-divider'></div>"
			+"<a class='dropdown-item' onclick='goBackToPrevious()' title='Go Back'> &nbsp; Go Back</a>"
			+"<a class='dropdown-item' href='fileupload.do' title='File Upload'> &nbsp; File Upload</a>");
	
	$('#completeIntegrationBtn').hide();
	//loadIntegrationName();
	searchintegrationName();
	loadStatus();
	loadIntegrationType();
	loadDataLimit();
	fetchIntegrationDetailsCount();
	fetchIntegrationDetails();
	loadDistinctAccountNameBasedOnStage();
	loadHeaderLookupValues();
	loadHeaderLookupValuesForAccept();
	loadHeaderLookupValuesForAcceptCharset();
	loadHeaderLookupValuesForUserAgent();
	loadHeaderLookupValuesForAcceptEncoding();
	loadJsonFields();
	document.getElementById('loadNext').disabled = true;
	
	$('#integrationName').css('border-color','#cf1133');
	$('#integrationType').css('border-color','#cf1133');
	
	$(document).on('show.bs.modal', '.modal', function (event) {
        var zIndex = 1040 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
        setTimeout(function() {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    });
	
	 $("#addMultipleStaticFieldDiv").on("click", ".delProgram", function(){
		 	$(this).closest(".input-group").remove();
			compCountForStaicField--;
	 });
	 
	 $("#addMultipleCustomFieldDiv").on("click", ".delProgram", function(){
		 	$(this).closest(".input-group").remove();
		 	compCountForCustomField--;
	 });
	 $("#addMultipleCustomFieldDivForMyFreshWorks").on("click", ".delProgram", function(){
		 	$(this).closest(".input-group").remove();
		 	compCountForMyFreshWorksCustomField--;
	 });
	 
	 $("#addMultipleHeaderFieldsDiv").on("click", ".delProgram", function(){
		 	$(this).closest(".input-group").remove();
		 	compCountForHeaderFields--;
	 });
	
	$('#nextBtn').click(function(){
		//$('.nav-tabs > .active').next('li').find('a').trigger('click');
		debugger;
		if(checkCustomTabEnable){
			if($('#endpointUrlOutput').val().indexOf("myfreshworks.com") != -1){
				$('.nav-item a.active').closest('li').next('li').find('a').trigger('click');
		     }else{
		    	 $('#myTab a[href="#staticFields"]').tab('show');
		     }
		}else{
			var activeTabName = $('.nav-item a.active')[0].innerText;
			if(activeTabName !=null && activeTabName !="" && activeTabName !="undefined" && activeTabName == "Output"){
				if($("#clientSpecificJson").val() != null && $("#clientSpecificJson").val() != "" && $("#clientSpecificJson").val() != "undefined"){
					debugger;
					$('#myTab a[href="#jsonFields"]').tab('show');
					$(".jsonFieldsTab").show();
					$(".contMappingTab").hide();
					$(".customFieldsTab").hide();
					$(".staticFieldsTab").hide();
					if($('#endpointUrlOutput').val().indexOf("myfreshworks.com") != -1){
						//$('.nav-item a.active').closest('li').next('li').find('a').trigger('click');
						$('#myTab a[href="#myFreshWorksCustomFields"]').tab('show');
					}
					/* if($("#integrationType").val() != "http_client") {
						$('#nextBtn').hide();
						$('#completeIntegrationBtn').show();
					}else{
						$('#nextBtn').show();
						$('#completeIntegrationBtn').hide();
					} */
				}else{
					$('.nav-item a.active').closest('li').next('li').find('a').trigger('click');
				}
			}else if(activeTabName !=null && activeTabName !="" && activeTabName !="undefined" && activeTabName == "Hidden Fields"){
				$('#myTab a[href="#advanceLookupFields"]').tab('show');
				
			}else if(activeTabName !=null && activeTabName !="" && activeTabName !="undefined" && activeTabName == "MyFreshWorks Custom Fields"){
				if($("#clientSpecificJson").val() != null && $("#clientSpecificJson").val() != "" && $("#clientSpecificJson").val() != "undefined"){
					$('#myTab a[href="#jsonFields"]').tab('show');
				}else{
					$('.nav-item a.active').closest('li').next('li').find('a').trigger('click');
				}
				
			}else{
				$('.nav-item a.active').closest('li').next('li').find('a').trigger('click');
			}
		}
		
	});
	
	$('a[href="#contMapping"]').on('shown.bs.tab', function (e) {
		checkCustomTabEnable = false;
		$('#nextBtn').show();
		//$('#saveIntegrationBtn').hide();
		$('#updateIntegrationBtn').hide();
		$('#completeIntegrationBtn').hide();
		$('#newCustomerModal .modal-dialog').addClass('modal-lg');
	});
	$('a[href="#staticFields"]').on('shown.bs.tab', function (e) {
		checkCustomTabEnable = false;
		$('#nextBtn').show();
		//$('#saveIntegrationBtn').hide();
		$('#updateIntegrationBtn').hide();
		$('#completeIntegrationBtn').hide();
		//$('#newCustomerModal .modal-dialog').addClass('modal-lg');
	});
	$('a[href="#customFields"]').on('shown.bs.tab', function (e) {
		checkCustomTabEnable = true;
		$('#nextBtn').show();
		//$('#saveIntegrationBtn').hide();
		$('#updateIntegrationBtn').hide();
		$('#completeIntegrationBtn').hide();
		//$('#newCustomerModal .modal-dialog').addClass('modal-lg');
	});
	$('a[href="#myFreshWorksCustomFields"]').on('shown.bs.tab', function (e) {
		//alert("Inside");
		checkCustomTabEnable = false;
		$('#nextBtn').show();
		//$('#saveIntegrationBtn').hide();
		$('#updateIntegrationBtn').hide();
		$('#completeIntegrationBtn').hide();
		//$('#newCustomerModal .modal-dialog').addClass('modal-lg');
	});
	$('a[href="#advanceLookupFields"]').on('shown.bs.tab', function (e) {
		checkCustomTabEnable = false;
		//$('#saveIntegrationBtn').show();
		//alert("showHideButton::"+showHideButton);
		if(showHideButton){
			if($("#integrationType").val() == "http_client") {
				$('#completeIntegrationBtn').hide();
				$('#nextBtn').show();
			}else{
				$('#completeIntegrationBtn').show();
				$('#nextBtn').hide();
			}
		}else{
			if($("#integrationType").val() == "http_client") {
				$('#updateIntegrationBtn').hide();
				$('#nextBtn').show();
			}else{
				$('#updateIntegrationBtn').show();
				$('#nextBtn').hide();
			}
		}
		$('#newCustomerModal .modal-dialog').addClass('modal-lg');
	});
	
	$('a[href="#general"]').on('shown.bs.tab', function (e) {
		//$('#saveIntegrationBtn').hide();
		checkCustomTabEnable = false;
		$('#updateIntegrationBtn').hide();
		$('#completeIntegrationBtn').hide();
		$('#nextBtn').show();
		$('#newCustomerModal .modal-dialog').removeClass('modal-lg');
	});
	$('a[href="#output"]').on('shown.bs.tab', function (e) {
		//$('#saveIntegrationBtn').hide();
		checkCustomTabEnable = false;
		$('#updateIntegrationBtn').hide();
		$('#completeIntegrationBtn').hide();
		$('#nextBtn').show();
		$('#newCustomerModal .modal-dialog').removeClass('modal-lg');
		$("#myfreshwork_div").hide();
		$("#rest_identity_div").hide();
		
		if($('#endpointUrlOutput').val().indexOf("myfreshworks.com") != -1){
	    	 $("#myfreshwork_div").show();
	    	 $(".customFieldsTabForMyFreshWorks").show();
	    	 $('#apikey').css('border-color','#cf1133');
	    	 
	    	 $("#rest_identity_div").hide();
			 $("#restIdentity_dev").addClass('col-md-12').removeClass('col-md-6 pr-1');
			 $("#oauth_div").addClass('col-md-12').removeClass('col-md-6');
			 $("#oauth").hide();
			 $("#endpoint_dev").addClass('col-md-12').removeClass('col-md-6 pr-1');
			 $("#accesstoken_div").addClass('col-md-12').removeClass('col-md-6');
			 $("#accessToken").hide();
	     }else{
	    	 $("#myfreshwork_div").hide();
	    	 $(".customFieldsTabForMyFreshWorks").hide();
	    	 $('#apikey').css('border-color','#ccc');
	     }
		
		if($("#integrationType").val() != null) {
			if($("#integrationType").val() == "http_client") {
				$("#rest_client_div").hide();
				//$("#soap_client_div").show();
				$("#sftp_client_div").hide();
				$("#record_time_delay_div").show();
				$('#endpointUrlOutput').css('border-color','#cf1133');
				$("#rest_identity_div").hide();
				$("#clientSpecificJson_div").show();
			}
			else if($("#integrationType").val() == "rest_client" || $("#integrationType").val() == "mkto_bulk_import") {
				//$("#soap_client_div").hide();
				if($("#integrationType").val() == "rest_client"){
					$("#clientSpecificJson_div").show();
				}else{
					$("#clientSpecificJson_div").hide();
				}
				$("#rest_client_div").show();
				$("#sftp_client_div").hide();
				$("#record_time_delay_div").show();
				$('#endpointUrlOutput').css('border-color','#cf1133');
				
				if($("#restIdentityUrl").val()!= null && $("#restIdentityUrl").val()!= "" && $("#restIdentityUrl").val()!= "undefined" ){
					$("#rest_identity_div").show();
					$('#clientId').css('border-color','#cf1133');
					$('#clientSecret').css('border-color','#cf1133');
				}
			}
			else if($("#integrationType").val() == "sftp_client") {
				//$("#soap_client_div").hide();
				$("#rest_client_div").hide();
				$("#sftp_client_div").show();
				$("#record_time_delay_div").hide();
				$("#rest_identity_div").hide();
				
				$('#sftphost').css('border-color','#cf1133');
				$('#sftpport').css('border-color','#cf1133');
				$('#sftpuser').css('border-color','#cf1133');
				$('#sftppass').css('border-color','#cf1133');
				$('#sftpworkingdir').css('border-color','#cf1133');
				$("#clientSpecificJson_div").hide();
			}
			else {
				$("#rest_client_div").hide();
				//$("#soap_client_div").hide();
				$("#sftp_client_div").hide();
				$("#record_time_delay_div").show();
				$("#rest_identity_div").hide();
				
				$('#endpointUrlOutput').css('border-color','#ccc');
				$('#apikey').css('border-color','#ccc');
				$('#sftphost').css('border-color','#ccc');
				$('#sftpport').css('border-color','#ccc');
				$('#sftpuser').css('border-color','#ccc');
				$('#sftppass').css('border-color','#ccc');
				$('#sftpworkingdir').css('border-color','#ccc');
				$("#clientSpecificJson_div").hide();
				
			}
		}
	});

	/* $('a[href="#jsonFields"]').on('shown.bs.tab', function (e) {
		$(".jsonFieldsTab").show();
		$(".contMappingTab").hide();
		$(".customFieldsTab").hide();
		$(".staticFieldsTab").hide();
		checkCustomTabEnable = false;
		$('#updateIntegrationBtn').hide();
		$('#completeIntegrationBtn').hide();
		$('#nextBtn').show();
		$('#newCustomerModal .modal-dialog').removeClass('modal-lg');
	}); */
	
	
	$('#endpointUrlOutput').change(function () {
	      //console.log($(this).val());
	      //alert($('#endpointUrlOutput').val());
	     
	     if($('#endpointUrlOutput').val().indexOf("myfreshworks.com") != -1){
	    	 $("#myfreshwork_div").show();
	    	 $(".customFieldsTabForMyFreshWorks").show();
	    	 $('#apikey').css('border-color','#cf1133');
	    	 $("#rest_identity_div").hide();
			 $("#restIdentity_dev").addClass('col-md-12').removeClass('col-md-6 pr-1');
			 $("#oauth_div").addClass('col-md-12').removeClass('col-md-6');
			 $("#oauth").hide();
			 $("#endpoint_dev").addClass('col-md-12').removeClass('col-md-6 pr-1');
			 $("#accesstoken_div").addClass('col-md-12').removeClass('col-md-6');
			 $("#accessToken").hide();
	     }else{
	    	 $("#myfreshwork_div").hide();
	    	 $(".customFieldsTabForMyFreshWorks").hide();
	    	 $('#apikey').css('border-color','#ccc');
	    	 //$("#rest_identity_div").show();
			 //$('#clientId').css('border-color','#cf1133');
			 //$('#clientSecret').css('border-color','#cf1133');
	     }
	     
	     if($("#endpointUrlOutput").val() != null && $("#endpointUrlOutput").val() != "" && $("#endpointUrlOutput").val() != "undefined"){
				var arr = {endpointUrl:$("#endpointUrlOutput").val()};
				console.log("endpointUrl::"+JSON.stringify(arr));
				$.ajax({
					url:'checkEndPointUrlOutput.do',
					data:arr,
					async:false,
					success:function(data) {
						debugger;
						if(data != null && data != "" && data != "undefined" && data != "success") {
							$("#addNewIntegrationErrorMsg").html("* Endpoint url is not valid. Kindly provide valid endpoint url.").show();
						}else{
							$("#addNewIntegrationErrorMsg").html("");
						}
					}
				});
		}
	});
	$('#restIdentityUrl').change(function () {
		if($("#restIdentityUrl").val()!= null && $("#restIdentityUrl").val()!= "" && $("#restIdentityUrl").val()!= "undefined" ){
			$.ajax({
				url:'fetchRestIdentityCredentials.do?restIdentityUrl='+$("#restIdentityUrl").val(),
				success: function(data, textStatus, xhr)
				{
					if(data != "") {
						$("#rest_identity_div").show();
						$("#restIdentity_dev").removeClass('col-md-12').addClass('col-md-6 pr-1');
						$("#oauth_div").removeClass('col-md-12').addClass('col-md-6');
						$("#oauth").show();
						$("#endpoint_dev").removeClass('col-md-12').addClass('col-md-6 pr-1');
						$("#accesstoken_div").removeClass('col-md-12').addClass('col-md-6');
						$("#accessToken").show();
						$('#clientId').css('border-color','#cf1133');
						$('#clientSecret').css('border-color','#cf1133');
						
						data = JSON.parse(data);
						$("#oauth").val(data.rest_append_url);
						$("#accessToken").val(data.endpoint_append_url);
					}
					else {
						$("#rest_identity_div").show();
						$("#restIdentity_dev").removeClass('col-md-12').addClass('col-md-6 pr-1');
						$("#oauth_div").removeClass('col-md-12').addClass('col-md-6');
						$("#oauth").show();
						$("#endpoint_dev").removeClass('col-md-12').addClass('col-md-6 pr-1');
						$("#accesstoken_div").removeClass('col-md-12').addClass('col-md-6');
						$("#accessToken").show();
						$('#clientId').css('border-color','#cf1133');
						$('#clientSecret').css('border-color','#cf1133');
						
						$("#oauth").val(restOauthDefaultValue);
						$("#accessToken").val(endpointAccesstokenDefaultValue);
					}
				},
				error: function(xhr, textStatus, errorThrow){
					$("#addNewCustomerLoader").hide();
					$("#addNewIntegrationErrorMsg").html("* error occured. kindly check with development team.").show();
					setTimeout(function(){
						$('#addNewIntegrationErrorMsg').html("");
					},3000);
				}
			});
		}else{
			$("#rest_identity_div").hide();
			$("#restIdentity_dev").addClass('col-md-12').removeClass('col-md-6 pr-1');
			$("#oauth_div").addClass('col-md-12').removeClass('col-md-6');
			$("#oauth").hide();
			$("#endpoint_dev").addClass('col-md-12').removeClass('col-md-6 pr-1');
			$("#accesstoken_div").addClass('col-md-12').removeClass('col-md-6');
			$("#accessToken").hide();
		}
	});
	
	$('#integrationType').change(function () {
		if($("#integrationType").val() != null) {
			if($("#integrationType").val() == "http_client") {
				$(".customFieldsTabForHeaderFields").show();
				if(callHeaderField){
					$('#addHeaderFieldsDiv').html('');
					$('#addMultipleHeaderFieldsDiv').html('');
					showHeaderFieldsTextBox();
					callHeaderField = false;
				}
				$('#endpointUrlOutput').css('border-color','#cf1133');
				$("#clientSpecificJson_div").show();
			}else if($("#integrationType").val() == "rest_client" || $("#integrationType").val() == "mkto_bulk_import"){
				$(".customFieldsTabForHeaderFields").hide();
				$('#endpointUrlOutput').css('border-color','#cf1133');
				if($("#integrationType").val() == "rest_client"){
					$("#clientSpecificJson_div").show();
				}else{
					$("#clientSpecificJson_div").hide();
				}
			}else if($("#integrationType").val() == "sftp_client"){
				$('#endpointUrlOutput').css('border-color','#ccc');
				$(".customFieldsTabForHeaderFields").hide();
				$("#clientSpecificJson_div").hide();
			}else{
				$(".customFieldsTabForHeaderFields").hide();
				$('#endpointUrlOutput').css('border-color','#ccc');
				$("#clientSpecificJson_div").hide();
			}
			$(".jsonFieldsTab").hide();
			$(".contMappingTab").show();
			$(".customFieldsTab").show();
			$(".staticFieldsTab").show();
		}
	});
	
	$('#clientSpecificJson').change(function () {
		debugger;
		if($("#clientSpecificJson").val() != null && $("#clientSpecificJson").val() !="" && $("#clientSpecificJson").val() !="[]"){
			if(!IsJsonString($("#clientSpecificJson").val())) {
				$("#addNewIntegrationErrorMsg").html("* Client specific json is not in valid format.").show();
				//setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
				//return false;
			}else{
				$('#addNewIntegrationErrorMsg').html("");
				fetchClientSpecificJsonName();
			}
		}else{
			$('#addNewIntegrationErrorMsg').html("");
			$(".jsonFieldsTab").hide();
			$(".contMappingTab").show();
			$(".customFieldsTab").show();
			$(".staticFieldsTab").show();
		}
	});
	
	$('a[href="#headerFields"]').on('shown.bs.tab', function (e) {
		checkCustomTabEnable = false;
		$('#nextBtn').hide();
		if(showHideButton){
			$('#completeIntegrationBtn').show();
		}else{
			$('#updateIntegrationBtn').show();
		}
		$('#newCustomerModal .modal-dialog').addClass('modal-lg');
	});
	
	
	$('body').click(function(evt) {
		if(arrow==false){
		
		if(evt.target.id != "clientNameDropdownMultiSelectParent" && evt.target.id != "clientNameDropdownMultiSelect"  && evt.target.id != "clientNameDropdownButton" &&  evt.target.id !="orderNameImage" && evt.target.id !="clientNameDropdownSearch" && evt.target.id !="selectedClientNameDropdown"){
			$('#clientNameDropdownSearch').val('');
			$('#clientNameDropdownMultiSelectParent').hide();
			
			if(selectClientNameDropdownChecked == true) {
				fetchIntegrationDetailsCount();
				fetchIntegrationDetails();
			}
		}
		
		if(evt.target.id != "integrationNameDropdownMultiSelectParent" && evt.target.id != "integrationNameDropdownMultiSelect"  && evt.target.id != "integrationNameDropdownButton" &&  evt.target.id !="orderNameImage" && evt.target.id !="integrationNameDropdownSearch" && evt.target.id !="selectedIntegrationNameDropdown"){
			$('#integrationNameDropdownSearch').val('');
			$('#integrationNameDropdownMultiSelectParent').hide();
			
			if(selectIntegrationNameDropdownChecked == true) {
				fetchIntegrationDetailsCount();
				fetchIntegrationDetails();
			}
		}
		
		}else{
			arrow=false;
			
		}
		
	});
	$(document).attr("title", "Update Datapass - SMT LeadSender");
	$("#titleHeading").text("Update Datapass");
	$('#clientNameDropdownSpin').hide();
	$('#integrationNameDropdownSpin').hide();
	
	$('#loadNext').click(function() {
		sequence = sequence+1;
		if($("#setLimit").val() != "" && $("#setLimit").val()!= null && $("#setLimit").val() != undefined){
			sequenceForQuery = sequence*$("#setLimit").val();
		}
		else{
			sequenceForQuery = sequence*elasticSearchFetchSize;
		}
		pageCount = pageCount+1;
		document.getElementById('pageValue').innerHTML = "P"+pageCount;
		fetchIntegrationDetails();
	});
	
	$('#loadPrev').click(function() {
		sequence = sequence-1;
		if($("#setLimit").val() != "" && $("#setLimit").val()!= null && $("#setLimit").val() != undefined){
			sequenceForQuery = sequence*$("#setLimit").val();
		}
		else{
			sequenceForQuery = sequence*elasticSearchFetchSize;
		}
		pageCount = pageCount-1;
		document.getElementById('pageValue').innerHTML = "P"+pageCount;
		fetchIntegrationDetails();
	});
});

function fetchIntegrationDetailsCount(){
	debugger;
	selectIntegrationNameDropdownChecked = false;
	selectClientNameDropdownChecked = false;
	//$("#updateInterationLoader").show();
	var fetchSize = $("#setLimit").val();
	var selectedClientName = $("#selectedClientNameDropdown").val();
	//var selectedIntegrationName = $("#selectedIntegrationNameDropdown").val();
	//var selectedIntegrationName = "";
	var selectedStatus = $("#selectedStatus").val();
	var selectedIntegrationType = $("#selectedIntegrationType").val();
	//$('#updateIntegrationTable').dataTable().fnClearTable();
	var integrationId = $("#integrationnamedrop").val();
	var integrationName = '';
	
	var arr = {clientName:selectedClientName,status:selectedStatus,integrationType:selectedIntegrationType,fetchSize:fetchSize,sequence:sequenceForQuery,integrationId:integrationId,integrationName:integrationName};
	console.log("fetchIntegrationDetailsCount::"+JSON.stringify(arr));
	
	$.ajax({
		url:'fetchIntegrationDetailsCount.do',
		data:arr,
		success:function(result) {
			debugger;
			document.getElementById('totalRecords').innerHTML = result;
		}
	});
}

function fetchIntegrationDetails(){
	selectIntegrationNameDropdownChecked = false;
	selectClientNameDropdownChecked = false;
	$("#updateInterationLoader").show();
	var fetchSize = $("#setLimit").val();
	var selectedClientName = $("#selectedClientNameDropdown").val();
	//var selectedIntegrationName = $("#selectedIntegrationNameDropdown").val();
	//var selectedIntegrationName = "";
	var selectedStatus = $("#selectedStatus").val();
	var selectedIntegrationType = $("#selectedIntegrationType").val();
	var integrationId = $("#integrationnamedrop").val();
	var integrationName = '';
	$('#updateIntegrationTable').dataTable().fnClearTable();
	
	var arr = {clientName:selectedClientName,status:selectedStatus,integrationType:selectedIntegrationType,fetchSize:fetchSize,sequence:sequenceForQuery,integrationId:integrationId,integrationName:integrationName};
	console.log("fetchIntegrationDetails::"+JSON.stringify(arr));
	
	$.ajax({
		url:'fetchIntegrationDetails.do',
		//data: encodeURIComponent(JSON.stringify(arr)),
		data:arr,
		success:function(jsonData) {
			//$("#leadViewLoader").hide();
			debugger;
			$("#updateInterationLoader").hide();
			if(jsonData != null && jsonData != "" && jsonData != "[]") {
				jsonData = JSON.parse(jsonData);
				//$("#totalRecords").html(jsonData.length);
				recArr = jsonData;
				//data = jsonData.integrationDetailList;
				showIntegrationDetails(jsonData);
				debugger;
				if($("#setLimit").val() != "" && $("#setLimit").val()!= null && $("#setLimit").val() != undefined){
					if(jsonData.length >= $("#setLimit").val()){
						document.getElementById('loadNext').disabled = false;
					}else{
						document.getElementById('loadNext').disabled = true;
					}
				}
				else{
					/*if(jsonData.length >= elasticSearchFetchSize){
						document.getElementById('loadNext').disabled = false;
					}else{
						document.getElementById('loadNext').disabled = true;
					}*/
				}
				
				//document.getElementById('loadNext').disabled = false;
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

function showIntegrationDetails(jsonData) {
	debugger;
	var table=$('#updateIntegrationTable').DataTable({
		processing : true,
		scrollX:true,
		destroy: true,
	    searching: true,
		data: jsonData,
		"columns" : [
		{ data : "serialNo",title: "S No.",defaultContent:""},
		{ data : "integrationDetailList.clientname",title: "Client Name",defaultContent:""},
		{ data : "integrationDetailList.integrationname",title: "Datapass Name",defaultContent:""},
		{ data : "dataPassType",title: "Datapass Type",defaultContent:""},
		{ data: "viewOrUpdateButton", title: "Edit", defaultContent: ""},
		{ data : "status",title: "Status",defaultContent:""},
		{ data : "sendTestLead",title: "Send Test Lead",defaultContent:""},
		{ data : "deploy",title: "Deploy",defaultContent:""},
		{ data : "exportHeader",title: "Export Header",defaultContent:""},
		{ data : "cloneIntegration",title: "Clone",defaultContent:""},
		{ data : "discardIntegration",title: "Action",defaultContent:""},
		{ data : "reviewTestResponse",title: "Review Test Response",defaultContent:""},
		
		
		],
	});
	
}

function displayClientNameDropdown(){
	$('#clientNameDropdownSearch').val('');
	$('#clientNameDropdownMultiSelectParent').hide();
	$('#integrationNameDropdownSearch').val('');
	$('#integrationNameDropdownMultiSelectParent').hide();
	
	debugger;
	$('#clientNameDropdownSpin').show();
	
	$.ajax({
		url		:	"loadClientName.do",
		success	:	function(data) {
			if(data != null && data != "") {
				debugger;
				clientNameDropdownObj = JSON.parse(data);
				var clientNameDropdownVal = $("#selectedClientNameDropdown").val().split(",");
				clientNameDropdownProbabilityMap  = new Map();
				html = '';
				var i=0;
				for(i=0;i<clientNameDropdownObj.length;i++) {
					if(clientNameDropdownVal != null && clientNameDropdownVal != "" && clientNameDropdownVal.indexOf(clientNameDropdownObj[i].client_name)>-1) {
						html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectClientNameDropdown(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedClientNameDropdown'+i+' value="'+clientNameDropdownObj[i].client_name+'" checked><label class="form-check-label" for="selectedClientNameDropdown'+i+'">'+clientNameDropdownObj[i].client_name+'</label></div></div>';
					}
					else{
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectClientNameDropdown(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedClientNameDropdown'+i+' value="'+clientNameDropdownObj[i].client_name+'"><label class="form-check-label" for="selectedClientNameDropdown'+i+'">'+clientNameDropdownObj[i].client_name+'</label></div></div>';
					}
				}
				$("#clientNameDropdownMultiSelect").html(html);
				$("#clientNameDropdownMultiSelectParent").show().css("width", "100%");
				$('#clientNameDropdownSpin').hide();
			}
		}
	});
}
	
function filterClientNameDropdown() {
	debugger;	
	html='';
		var i=0;
		if(clientNameDropdownOptions == "") {
			if($("#selectedClientNameDropdown").val() != null && $("#selectedClientNameDropdown").val() != "") {
				var clientNameDropdownArray = $("#selectedClientNameDropdown").val().split(",");
				$.each(clientNameDropdownArray, function(i) {
					clientNameDropdownOptions.push(clientNameDropdownArray[i]);
				});
			} 
		}
		
		for(i=0;i<clientNameDropdownObj.length;i++) {
			debugger;
			try {
				var text=clientNameDropdownObj[i].client_name;
				var searchedText=$('#clientNameDropdownSearch').val();
				
				if(text.toLowerCase().indexOf(searchedText.toLowerCase())>-1){
					if(clientNameDropdownOptions.length>0) {
						if(clientNameDropdownOptions.indexOf(text)>-1) {
							html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectClientNameDropdown(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedClientNameDropdown'+i+' value="'+clientNameDropdownObj[i].client_name+'" checked><text style="font-size: 0.8125rem;"  for="selectedClientNameDropdown'+i+'">'+clientNameDropdownObj[i].client_name+'</label></div></div>';
						}
						else {
							html=html+'<div class="dropdown-item py-0 px-1" onClick="selectClientNameDropdown(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedClientNameDropdown'+i+' value="'+clientNameDropdownObj[i].client_name+'"><text  style="font-size: 0.8125rem;" for="selectedClientNameDropdown'+i+'">'+clientNameDropdownObj[i].client_name+'</label></div></div>';
						}
					}
					else {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectClientNameDropdown(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedClientNameDropdown'+i+' value="'+clientNameDropdownObj[i].client_name+'"><text  style="font-size: 0.8125rem;" for="selectedClientNameDropdown'+i+'">'+clientNameDropdownObj[i].client_name+'</label></div></div>';
					}
				}
			}
			catch(e) {
				console.log(e.message);
			}
		}

		
		$("#clientNameDropdownMultiSelect").html(html);
		$("#clientNameDropdownMultiSelectParent").show().css("width", "100%");
		$('#clientNameDropdownSpin').hide();
	}
  function selectClientNameDropdown(event) {
	 debugger;
		var $target = $(event.currentTarget),
		val = $target.find('input[type="checkbox"]').attr('value'),
		$inp = $target.find('input[type="checkbox"]'),
		idx;
		
		if(clientNameDropdownOptions == "") {
			if($("#selecetdClientNameDropdown").val() != null && $("#selecetdClientNameDropdown").val() != "") {
				var clientNameDropdownArray = $("#selecetdClientNameDropdown").val().split(",");
				$.each(clientNameDropdownArray, function(i) {
					clientNameDropdownOptions.push(clientNameDropdownArray[i]);
				});
			} 
		}
		
		if ((idx = clientNameDropdownOptions.indexOf(val)) > -1) {
			clientNameDropdownOptions.splice(idx, 1);
			setTimeout(function() {$inp.prop('checked', false)}, 0);
			$inp.prop('checked', false).closest('.dropdown-item').removeClass("active");
		}
		else {
			if(clientNameDropdownOptions.indexOf(val) == -1) {
				clientNameDropdownOptions.push(val);
				setTimeout(function() {$inp.prop('checked', true)}, 0);
				$inp.prop('checked', true).closest('.dropdown-item').addClass("active");
			}
		}
		$("#clientNameDropdownMultiSelectParent").dropdown('toggle');
		//$("#hqCountryDropdownMultiSelectParent").show().css("width", "100%");
		$("#selectedClientNameDropdown").val(clientNameDropdownOptions);
		selectClientNameDropdownChecked = true;
		return false;
	}
  
  
  function displayIntegrationNameDropdown(){
		$('#clientNameDropdownSearch').val('');
		$('#clientNameDropdownMultiSelectParent').hide();
		$('#integrationNameDropdownSearch').val('');
		$('#integrationNameDropdownMultiSelectParent').hide();
		debugger;
		$('#integrationNameDropdownSpin').show();
		$.ajax({
			url		:	"loadIntegrationName.do",
			success	:	function(data) {
				if(data != null && data != "") {
					debugger;
					integrationNameDropdownObj = JSON.parse(data);
					var integrationNameDropdownVal = $("#selectedIntegrationNameDropdown").val().split(",");
					integrationNameDropdownProbabilityMap  = new Map();
					html = '';
					var i=0;
					for(i=0;i<integrationNameDropdownObj.length;i++) {
						debugger;
						if(integrationNameDropdownVal != null && integrationNameDropdownVal != "" && integrationNameDropdownVal.indexOf(integrationNameDropdownObj[i].integration_name)>-1) {
							html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectIntegrationNameDropdown(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedIntegrationNameDropdown'+i+' value="'+integrationNameDropdownObj[i].integration_name+'" checked><label class="form-check-label" for="selectedIntegrationNameDropdown'+i+'">'+integrationNameDropdownObj[i].integration_name+'</label></div></div>';
						}
						else{
							html=html+'<div class="dropdown-item py-0 px-1" onClick="selectIntegrationNameDropdown(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedIntegrationNameDropdown'+i+' value="'+integrationNameDropdownObj[i].integration_name+'"><label class="form-check-label" for="selectedIntegrationNameDropdown'+i+'">'+integrationNameDropdownObj[i].integration_name+'</label></div></div>';
						}
					}
					$("#integrationNameDropdownMultiSelect").html(html);
					$("#integrationNameDropdownMultiSelectParent").show().css("width", "100%");
					$('#integrationNameDropdownSpin').hide();
				}
			}
		});
	}
		
	function filterIntegrationNameDropdown() {
		debugger;	
		html='';
			var i=0;
			if(integrationNameDropdownOptions == "") {
				if($("#selectedIntegrationNameDropdown").val() != null && $("#selectedIntegrationNameDropdown").val() != "") {
					var integrationNameDropdownArray = $("#selectedIntegrationNameDropdown").val().split(",");
					$.each(integrationNameDropdownArray, function(i) {
						integrationNameDropdownOptions.push(integrationNameDropdownArray[i]);
					});
				} 
			}
			
			for(i=0;i<integrationNameDropdownObj.length;i++) {
				debugger;
				try {
					var text=integrationNameDropdownObj[i].integration_name;
					var searchedText=$('#integrationNameDropdownSearch').val();
					
					if(text.toLowerCase().indexOf(searchedText.toLowerCase())>-1){
						if(integrationNameDropdownOptions.length>0) {
							if(integrationNameDropdownOptions.indexOf(text)>-1) {
								html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectIntegrationNameDropdown(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedIntegrationNameDropdown'+i+' value="'+integrationNameDropdownObj[i].integration_name+'" checked><text style="font-size: 0.8125rem;"  for="selectedIntegrationNameDropdown'+i+'">'+integrationNameDropdownObj[i].integration_name+'</label></div></div>';
							}
							else {
								html=html+'<div class="dropdown-item py-0 px-1" onClick="selectIntegrationNameDropdown(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedIntegrationNameDropdown'+i+' value="'+integrationNameDropdownObj[i].integration_name+'"><text  style="font-size: 0.8125rem;" for="selectedIntegrationNameDropdown'+i+'">'+integrationNameDropdownObj[i].integration_name+'</label></div></div>';
							}
						}
						else {
							html=html+'<div class="dropdown-item py-0 px-1" onClick="selectIntegrationNameDropdown(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedIntegrationNameDropdown'+i+' value="'+integrationNameDropdownObj[i].integration_name+'"><text  style="font-size: 0.8125rem;" for="selectedIntegrationNameDropdown'+i+'">'+integrationNameDropdownObj[i].integration_name+'</label></div></div>';
						}
					}
				}
				catch(e) {
					console.log(e.message);
				}
			}

			
			$("#integrationNameDropdownMultiSelect").html(html);
			$("#integrationNameDropdownMultiSelectParent").show().css("width", "100%");
			$('#integrationNameDropdownSpin').hide();
		}
  function selectIntegrationNameDropdown(event) {
		 debugger;
			var $target = $(event.currentTarget),
			val = $target.find('input[type="checkbox"]').attr('value'),
			$inp = $target.find('input[type="checkbox"]'),
			idx;
			
			if(integrationNameDropdownOptions == "") {
				if($("#selecetdIntegrationNameDropdown").val() != null && $("#selecetdIntegrationNameDropdown").val() != "") {
					var integrationNameDropdownArray = $("#selecetdIntegrationNameDropdown").val().split(",");
					$.each(integrationNameDropdownArray, function(i) {
						integrationNameDropdownOptions.push(integrationNameDropdownArray[i]);
					});
				} 
			}
			
			if ((idx = integrationNameDropdownOptions.indexOf(val)) > -1) {
				integrationNameDropdownOptions.splice(idx, 1);
				setTimeout(function() {$inp.prop('checked', false)}, 0);
				$inp.prop('checked', false).closest('.dropdown-item').removeClass("active");
			}
			else {
				if(integrationNameDropdownOptions.indexOf(val) == -1) {
					integrationNameDropdownOptions.push(val);
					setTimeout(function() {$inp.prop('checked', true)}, 0);
					$inp.prop('checked', true).closest('.dropdown-item').addClass("active");
				}
			}
			$("#integrationNameDropdownMultiSelectParent").dropdown('toggle');
			//$("#hqCountryDropdownMultiSelectParent").show().css("width", "100%");
			$("#selectedIntegrationNameDropdown").val(integrationNameDropdownOptions);
			selectIntegrationNameDropdownChecked = true;
			return false;
	}
  
  function openIntegrationModel(index){
	// alert("Index::"+index);
	  //document.getElementById('editIntegration_'+index).disabled = true;
	  $('#addNewIntegrationErrorMsg').html("");
	  resetFieldValues();
	  enableDatapassButton();
	  showHideButton = false;
	  $('#newCustomerModal').modal('show');
	  $('#updateIntegrationBtn').hide();
	  $('#clientName').focus();
	  $('.modal .modal-body').css('overflow-y', 'auto'); 
	  $('.modal .modal-body').css('max-height', $(window).height() * 0.7);
	  
	  $('#myTab a[href="#general"]').tab('show');
		
		//loadDistinctAccountNameBasedOnStage();
		loadMappingDetails();
	  
	  editIndexValue = index;
	  prefillInregrationDetails(index);
  }
  function prefillInregrationDetails(index){
	 debugger; 
	 $("#hiddenIntegrationId").val(recArr[index].integrationId);
	 $("#clientName").val(recArr[index].integrationDetailList.clientname);
	 $("#integrationName").val(recArr[index].integrationDetailList.integrationname);
	 $("#integrationType").val(recArr[index].integrationDetailList.integrationtype);

	 var endPointUrlJson = recArr[index].integrationDetailList.connectionurl;
	 if(endPointUrlJson !=null && endPointUrlJson !="" && endPointUrlJson.endpointUrlOutput.indexOf("myfreshworks.com") != -1){
		 $("#endpointUrlOutput").val(endPointUrlJson.endpointUrlOutput);
		 $("#myfreshwork_div").show();
    	 $(".customFieldsTabForMyFreshWorks").show();
	 }else{
		 $("#endpointUrlOutput").val(endPointUrlJson.endpointUrlOutput);
		 $("#myfreshwork_div").hide();
    	 $(".customFieldsTabForMyFreshWorks").hide();
	 }
	 var restIdentityJson = recArr[index].integrationDetailList.restidentityurl;
	 if(restIdentityJson !=null && restIdentityJson !=""){
		 $("#restIdentity_dev").removeClass('col-md-12').addClass('col-md-6 pr-1');
		 $("#oauth_div").removeClass('col-md-12').addClass('col-md-6');
		 $("#oauth").show();
		 $("#endpoint_dev").removeClass('col-md-12').addClass('col-md-6 pr-1');
		 $("#accesstoken_div").removeClass('col-md-12').addClass('col-md-6');
		 $("#accessToken").show();
		 
		 $("#restIdentityUrl").val(restIdentityJson.restIdentityUrl);
		 $("#oauth").val(restIdentityJson.oauth);
		 $("#clientId").val(restIdentityJson.clientId);
		 $("#clientSecret").val(restIdentityJson.clientSecret);
		 $("#accessToken").val(endPointUrlJson.accessToken);
	 }else{
		 $("#restIdentity_dev").addClass('col-md-12').removeClass('col-md-6 pr-1');
		 $("#oauth_div").addClass('col-md-12').removeClass('col-md-6');
		 $("#oauth").hide();
		 $("#endpoint_dev").addClass('col-md-12').removeClass('col-md-6 pr-1');
		 $("#accesstoken_div").addClass('col-md-12').removeClass('col-md-6');
		 $("#accessToken").hide();
		 
		 $("#restIdentityUrl").val("");
		 $("#oauth").val("");
		 $("#clientId").val("");
		 $("#clientSecret").val("");
		 $("#accessToken").val("");
	 }
	 
	 //$("#postProcessType").val(recArr[index].integrationDetailList.postprocess);
	 //$("#postProcessType").val("entity");
	 $("#successPhrase").val(recArr[index].integrationDetailList.successdecisionphrase);
	 $("#usernameOutput").val(recArr[index].integrationDetailList.login);
	 $("#passwordOutput").val(recArr[index].integrationDetailList.password);
	 $("#staticListEndPointUrl").val(recArr[index].integrationDetailList.staticlistendpointurl);
	 $("#apikey").val(recArr[index].integrationDetailList.apikey);
	 defaultValidationValue = "";
	 defaultValidationValue = recArr[index].integrationDetailList.validationmapping;
	 validationValue = defaultValidationValue;
	 validationJsonArray = defaultValidationValue;
	 //alert("validationValue::"+recArr[index].integrationDetailList.validation_mapping);
	 var advanceLookup = recArr[index].integrationDetailList.checkothersclientlookup;
	 if(advanceLookup !=null && advanceLookup !="" && advanceLookup !="undefined"){
		 $("#advanceLookup").val(JSON.stringify(advanceLookup));
	 }else{
		 $("#advanceLookup").val("");
	 }
	 
	 defaultLookupField = recArr[index].integrationDetailList.lookupfields;
	 
	 if($("#integrationType").val() !=null && $("#integrationType").val() !="" && $("#integrationType").val() !="undefined" && ($("#integrationType").val() == "http_client" || $("#integrationType").val() == "rest_client")){
		 if(recArr[index].integrationDetailList.clientspecificjson !=null && recArr[index].integrationDetailList.clientspecificjson !="" && recArr[index].integrationDetailList.clientspecificjson !=""){
			 $("#clientSpecificJson_div").show();
			 var clientSpecificJson = JSON.stringify(recArr[index].integrationDetailList.clientspecificjson);
			 $("#clientSpecificJson").val(clientSpecificJson);
		 }else{
			 $("#clientSpecificJson_div").show();
			 $("#clientSpecificJson").val("");
		 }
	 }else{
		 $("#clientSpecificJson_div").hide();
		 $("#clientSpecificJson").val("");
	 }
	 
	 $("#recordTimeDelay").val(recArr[index].integrationDetailList.recordtimedelay);
	 
	 if($("#clientSpecificJson").val() !=null && $("#clientSpecificJson").val() !="" && $("#clientSpecificJson").val() != "undefined"){
		 fetchClientSpecificJsonName();
		 debugger;
		 for(var i=0;i<jsonFieldDataLength;i++){
			 var integrationMappingArr = recArr[index].jsonArrayForAllMapping;
				if(integrationMappingArr != null && integrationMappingArr != "" && integrationMappingArr.length > 0){
					for(var a=0;a<=integrationMappingArr.length;a++){
						if(integrationMappingArr[a] != null && integrationMappingArr[a] != "" && integrationMappingArr[a] !="undefined"){
							if(Object.keys(integrationMappingArr[a]) != null && Object.keys(integrationMappingArr[a]) !="" && Object.keys(integrationMappingArr[a]) !="undefined"){
								if($("#sunmartechjsonfield_"+i).val() == Object.keys(integrationMappingArr[a])){
									if(sunmartechJsonFields.indexOf(Object.keys(integrationMappingArr[a])) != -1){
										$("#jsonsunmartechnamevalue_"+i).val(Object.keys(integrationMappingArr[a]));
										var mendatoryFields = recArr[index].integrationDetailList.mandatoryfields;
										if(mendatoryFields.indexOf(Object.keys(integrationMappingArr[a])) != -1){
											$("#chkboxjsonfield_"+i).prop('checked', true);
										}
										//document.getElementById('functionButtonjsonfield_'+a).disabled = false;
										break;
									}
								}
							}
						}
					}
				}
		 }
		 
	 }else{
		 $(".jsonFieldsTab").hide();
		 $(".contMappingTab").show();
		 $(".customFieldsTab").show();
		 $(".staticFieldsTab").show();
		 if(recArr[index].integrationDetailList.mandatoryfields !=null && recArr[index].integrationDetailList.mandatoryfields !="" && recArr[index].integrationDetailList.mandatoryfields !="undefined"){
			 var mendatoryFields = recArr[index].integrationDetailList.mandatoryfields;
			 var mendatoryFieldsArr = mendatoryFields.split(',');
			 
			 for(var i=0;i<mendatoryFieldsArr.length;i++){
				 if(sunmartechMandatoryFieldLength > 0) {
						for(var j=0; j<sunmartechMandatoryFieldLength; j++) {
							if($("#msorField_"+j).text() == mendatoryFieldsArr[i]){
								$("#outputFieldChk_"+j).prop('checked', true);
							}
							
							var integrationMappingArr = recArr[index].integrationMapping;
							if(integrationMappingArr != null && integrationMappingArr != "" && integrationMappingArr.length > 0){
								for(var a=0;a<=integrationMappingArr.length;a++){
									if(integrationMappingArr[a] != null && integrationMappingArr[a] != "" && integrationMappingArr[a] !="undefined"){
										if(Object.keys(integrationMappingArr[a]) != null && Object.keys(integrationMappingArr[a]) !="" && Object.keys(integrationMappingArr[a]) !="undefined"){
											if($("#msorField_"+j).text() == Object.keys(integrationMappingArr[a])){
												$("#outputField_"+j).val(Object.values(integrationMappingArr[a]));
											}
										}
									}
								}
							}
						}
					}
			 }
			 
			 debugger;
			 var customMappingArr = recArr[index].customMapping;
			 console.log("customMappingArr:::::"+customMappingArr);
				if(customMappingArr != null && customMappingArr != "" && customMappingArr.length > 0){
					for(var a=0;a<=customMappingArr.length;a++){
						if(customMappingArr[a] != null && customMappingArr[a] != "" && customMappingArr[a] !="undefined"){
							if(Object.keys(customMappingArr[a]) != null && Object.keys(customMappingArr[a]) !="" && Object.keys(customMappingArr[a]) !="undefined"){
								if(a==0){
									showCustomFieldTextBox();
									$("#sunmartechcustomfield_"+a).val(Object.keys(customMappingArr[a]));
									$("#apicustomfield_"+a).val(Object.values(customMappingArr[a]));
									document.getElementById('functionButtoncustomfield_'+a).disabled = false;
									for(var i=0;i<mendatoryFieldsArr.length;i++){
										if($("#sunmartechcustomfield_"+a).val() == mendatoryFieldsArr[i]){
											$("#chkboxcustomfield_"+a).prop('checked', true);
										}
									}
									
								}else{
									callMultipleCustomFieldTextBox();
									$("#sunmartechcustomfield_"+a).val(Object.keys(customMappingArr[a]));
									$("#apicustomfield_"+a).val(Object.values(customMappingArr[a]));
									document.getElementById('functionButtoncustomfield_'+a).disabled = false;
									for(var i=0;i<mendatoryFieldsArr.length;i++){
										if($("#sunmartechcustomfield_"+a).val() == mendatoryFieldsArr[i]){
											$("#chkboxcustomfield_"+a).prop('checked', true);
										}
									}
								}
							}
						}
					}
				}
				debugger;
				var customMappingForMyFreshWorksArr = recArr[index].customMappingForMyFreshWorks;
				 console.log("customMappingForMyFreshWorksArr:::::"+customMappingForMyFreshWorksArr);
					if(customMappingForMyFreshWorksArr != null && customMappingForMyFreshWorksArr != "" && customMappingForMyFreshWorksArr.length > 0){
						for(var a=0;a<=customMappingForMyFreshWorksArr.length;a++){
							if(customMappingForMyFreshWorksArr[a] != null && customMappingForMyFreshWorksArr[a] != "" && customMappingForMyFreshWorksArr[a] !="undefined"){
								if(Object.keys(customMappingForMyFreshWorksArr[a]) != null && Object.keys(customMappingForMyFreshWorksArr[a]) !="" && Object.keys(customMappingForMyFreshWorksArr[a]) !="undefined"){
									if(a==0){
										showCustomFieldTextBoxForMyFreshWorks();
										$("#sunmartechcustomfieldformyfreshworks_"+a).val(Object.keys(customMappingForMyFreshWorksArr[a]));
										$("#apicustomfieldformyfreshworks_"+a).val(Object.values(customMappingForMyFreshWorksArr[a]));
										document.getElementById('functionButtoncustomfieldformyfreshworks_'+a).disabled = false;
										for(var i=0;i<mendatoryFieldsArr.length;i++){
											if($("#sunmartechcustomfieldformyfreshworks_"+a).val() == mendatoryFieldsArr[i]){
												$("#chkboxcustomfieldformyfreshworks_"+a).prop('checked', true);
											}
										}
										
									}else{
										callMultipleCustomFieldTextBoxForMyFreshWorks();
										$("#sunmartechcustomfieldformyfreshworks_"+a).val(Object.keys(customMappingForMyFreshWorksArr[a]));
										$("#apicustomfieldformyfreshworks_"+a).val(Object.values(customMappingForMyFreshWorksArr[a]));
										document.getElementById('functionButtoncustomfieldformyfreshworks_'+a).disabled = false;
										for(var i=0;i<mendatoryFieldsArr.length;i++){
											if($("#sunmartechcustomfieldformyfreshworks_"+a).val() == mendatoryFieldsArr[i]){
												$("#chkboxcustomfieldformyfreshworks_"+a).prop('checked', true);
											}
										}
									}
								}
							}
						}
				}
				
				var staticFieldsArr = recArr[index].staticFields;
				if(staticFieldsArr != null && staticFieldsArr != "" && staticFieldsArr.length > 0){
					for(var a=0;a<=staticFieldsArr.length;a++){
						if(staticFieldsArr[a] != null && staticFieldsArr[a] != "" && staticFieldsArr[a] !="undefined"){
							if(Object.keys(staticFieldsArr[a]) != null && Object.keys(staticFieldsArr[a]) !="" && Object.keys(staticFieldsArr[a]) !="undefined"){
								if(a==0){
									showStaticFieldTextBox();
									$("#apistaticfieldname_"+a).val(Object.keys(staticFieldsArr[a]));
									$("#apistaticfieldvalue_"+a).val(Object.values(staticFieldsArr[a]));
								}else{
									callMultipleStaticFieldTextBox();
									$("#apistaticfieldname_"+a).val(Object.keys(staticFieldsArr[a]));
									$("#apistaticfieldvalue_"+a).val(Object.values(staticFieldsArr[a]));
								}
							}
						}
					}
				}
				
				
		 }else{
			debugger;
			 if(sunmartechMandatoryFieldLength > 0) {
					for(var j=0; j<sunmartechMandatoryFieldLength; j++) {
						var integrationMappingArr = recArr[index].integrationMapping;
						if(integrationMappingArr != null && integrationMappingArr != "" && integrationMappingArr.length > 0){
							for(var a=0;a<=integrationMappingArr.length;a++){
								if(integrationMappingArr[a] != null && integrationMappingArr[a] != "" && integrationMappingArr[a] !="undefined"){
									if(Object.keys(integrationMappingArr[a]) != null && Object.keys(integrationMappingArr[a]) !="" && Object.keys(integrationMappingArr[a]) !="undefined"){
										if($("#msorField_"+j).text() == Object.keys(integrationMappingArr[a])){
											$("#outputField_"+j).val(Object.values(integrationMappingArr[a]));
										}
									}
								}
							}
						}
					}
			 }
			 debugger;
			 var customMappingArr = recArr[index].customMapping;
			 console.log("customMappingArr:::::"+customMappingArr);
				if(customMappingArr != null && customMappingArr != "" && customMappingArr.length > 0){
					for(var a=0;a<=customMappingArr.length;a++){
						if(customMappingArr[a] != null && customMappingArr[a] != "" && customMappingArr[a] !="undefined"){
							if(Object.keys(customMappingArr[a]) != null && Object.keys(customMappingArr[a]) !="" && Object.keys(customMappingArr[a]) !="undefined"){
								if(a==0){
									showCustomFieldTextBox();
									$("#sunmartechcustomfield_"+a).val(Object.keys(customMappingArr[a]));
									$("#apicustomfield_"+a).val(Object.values(customMappingArr[a]));
									document.getElementById('functionButtoncustomfield_'+a).disabled = false;
									
								}else{
									callMultipleCustomFieldTextBox();
									$("#sunmartechcustomfield_"+a).val(Object.keys(customMappingArr[a]));
									$("#apicustomfield_"+a).val(Object.values(customMappingArr[a]));
									document.getElementById('functionButtoncustomfield_'+a).disabled = false;
								}
							}
						}
					}
				}
				debugger;
				var customMappingForMyFreshWorksArr = recArr[index].customMappingForMyFreshWorks;
				 console.log("customMappingForMyFreshWorksArr:::::"+customMappingForMyFreshWorksArr);
					if(customMappingForMyFreshWorksArr != null && customMappingForMyFreshWorksArr != "" && customMappingForMyFreshWorksArr.length > 0){
						for(var a=0;a<=customMappingForMyFreshWorksArr.length;a++){
							if(customMappingForMyFreshWorksArr[a] != null && customMappingForMyFreshWorksArr[a] != "" && customMappingForMyFreshWorksArr[a] !="undefined"){
								if(Object.keys(customMappingForMyFreshWorksArr[a]) != null && Object.keys(customMappingForMyFreshWorksArr[a]) !="" && Object.keys(customMappingForMyFreshWorksArr[a]) !="undefined"){
									if(a==0){
										showCustomFieldTextBoxForMyFreshWorks();
										$("#sunmartechcustomfieldformyfreshworks_"+a).val(Object.keys(customMappingForMyFreshWorksArr[a]));
										$("#apicustomfieldformyfreshworks_"+a).val(Object.values(customMappingForMyFreshWorksArr[a]));
										document.getElementById('functionButtoncustomfieldformyfreshworks_'+a).disabled = false;
									}else{
										callMultipleCustomFieldTextBoxForMyFreshWorks();
										$("#sunmartechcustomfieldformyfreshworks_"+a).val(Object.keys(customMappingForMyFreshWorksArr[a]));
										$("#apicustomfieldformyfreshworks_"+a).val(Object.values(customMappingForMyFreshWorksArr[a]));
										document.getElementById('functionButtoncustomfieldformyfreshworks_'+a).disabled = false;
									}
								}
							}
						}
					}
					var staticFieldsArr = recArr[index].staticFields;
					if(staticFieldsArr != null && staticFieldsArr != "" && staticFieldsArr.length > 0){
						for(var a=0;a<=staticFieldsArr.length;a++){
							if(staticFieldsArr[a] != null && staticFieldsArr[a] != "" && staticFieldsArr[a] !="undefined"){
								if(Object.keys(staticFieldsArr[a]) != null && Object.keys(staticFieldsArr[a]) !="" && Object.keys(staticFieldsArr[a]) !="undefined"){
									if(a==0){
										showStaticFieldTextBox();
										$("#apistaticfieldname_"+a).val(Object.keys(staticFieldsArr[a]));
										$("#apistaticfieldvalue_"+a).val(Object.values(staticFieldsArr[a]));
									}else{
										callMultipleStaticFieldTextBox();
										$("#apistaticfieldname_"+a).val(Object.keys(staticFieldsArr[a]));
										$("#apistaticfieldvalue_"+a).val(Object.values(staticFieldsArr[a]));
									}
								}
							}
						}
					}
		 }
	 }
	 
	 if(recArr[index].integrationDetailList.integrationtype != null && recArr[index].integrationDetailList.integrationtype != "" && recArr[index].integrationDetailList.integrationtype == "sftp_client"){
		 var sftpCredentials = recArr[index].integrationDetailList.sftpcredentials;
		 if(sftpCredentials != null && sftpCredentials != ""){
			 $("#sftphost").val(sftpCredentials.sftpHost);
			 $("#sftpport").val(sftpCredentials.sftpPort);
			 $("#sftpuser").val(recArr[index].decodedUsername);
			 $("#sftppass").val(recArr[index].decodedPassword);
			 $("#sftpworkingdir").val(sftpCredentials.sftpWorkingDir);
		 }
	 }else{
		 $("#sftphost").val("");
		 $("#sftpport").val("");
		 $("#sftpuser").val("");
		 $("#sftppass").val("");
		 $("#sftpworkingdir").val("");
	 }
	 debugger;
	 if(recArr[index].integrationDetailList.integrationtype != null && recArr[index].integrationDetailList.integrationtype != "" && recArr[index].integrationDetailList.integrationtype == "http_client"){
		 $(".customFieldsTabForHeaderFields").show();
		 compCountForHeaderFields=0;
		 var httpHeadersFieldsArr = recArr[index].httpHeaders;
			if(httpHeadersFieldsArr != null && httpHeadersFieldsArr != "" && httpHeadersFieldsArr.length > 0){
				for(var a=0;a<=httpHeadersFieldsArr.length;a++){
					if(httpHeadersFieldsArr[a] != null && httpHeadersFieldsArr[a] != "" && httpHeadersFieldsArr[a] !="undefined"){
						if(Object.keys(httpHeadersFieldsArr[a]) != null && Object.keys(httpHeadersFieldsArr[a]) !="" && Object.keys(httpHeadersFieldsArr[a]) !="undefined"){
							if(a==0){
								showHeaderFieldsTextBox();
								if(Object.keys(httpHeadersFieldsArr[a]) !=null){
									if(Object.keys(httpHeadersFieldsArr[a]) == "Accept"){
										$("#headername_"+a).val(Object.keys(httpHeadersFieldsArr[a]));
										$("#headernamevalue_"+a).html(headerNameValueForAccept);
										$("#headernamevalue_"+a).val(Object.values(httpHeadersFieldsArr[a]));
									}else if(Object.keys(httpHeadersFieldsArr[a]) == "AcceptCharset"){
										$("#headername_"+a).val(Object.keys(httpHeadersFieldsArr[a]));
										$("#headernamevalue_"+a).html(headerNameValueForAcceptCharset);
										$("#headernamevalue_"+a).val(Object.values(httpHeadersFieldsArr[a]));
									}else if(Object.keys(httpHeadersFieldsArr[a]) == "Accept-Encoding"){
										$("#headername_"+a).val(Object.keys(httpHeadersFieldsArr[a]));
										$("#headernamevalue_"+a).html(headerNameValueForAcceptEncoding);
										$("#headernamevalue_"+a).val(Object.values(httpHeadersFieldsArr[a]));
									}else if(Object.keys(httpHeadersFieldsArr[a]) == "user-agent"){
										$("#headername_"+a).val(Object.keys(httpHeadersFieldsArr[a]));
										$("#headernamevalue_"+a).html(headerNameValueForUserAgent);
										$("#headernamevalue_"+a).val(Object.values(httpHeadersFieldsArr[a]));
									}else if(Object.keys(httpHeadersFieldsArr[a]) == "Authorization"){
										$("#headername_"+a).val(Object.keys(httpHeadersFieldsArr[a]));
										var $addNew = $("<input type='text' placeholder='username' id='autharazationusername_"+a+"' class='form-control form-control-sm' name='headernamevalue'><input type='password' placeholder='password' id='autharazationpassword_"+a+"' class='form-control form-control-sm' name='headernamevalue'><span class='input-group-append'></span>");
										$("#headernamevalue_"+a).replaceWith($addNew);
										if(Object.values(httpHeadersFieldsArr[a]) !=null && Object.values(httpHeadersFieldsArr[a]) != ''){
											var authorizationArray = Object.values(httpHeadersFieldsArr[a]).toString().split(":");
											
											if(authorizationArray.length > 0){
												$("#autharazationusername_"+a).val(authorizationArray[0]);
												$("#autharazationpassword_"+a).val(authorizationArray[1]);
											}
										}
										
									}else if(Object.keys(httpHeadersFieldsArr[a]) == "ContentType"){
										$("#headername_"+a).val(Object.keys(httpHeadersFieldsArr[a]));
										$("#headernamevalue_"+a).html(headerNameValueForAccept);
										$("#headernamevalue_"+a).val(Object.values(httpHeadersFieldsArr[a]));
									}
								}
							}else{
								callMultipleHeaderFields();
								if(Object.keys(httpHeadersFieldsArr[a]) !=null){
									if(Object.keys(httpHeadersFieldsArr[a]) == "Accept"){
										$("#headername_"+a).val(Object.keys(httpHeadersFieldsArr[a]));
										$("#headernamevalue_"+a).html(headerNameValueForAccept);
										$("#headernamevalue_"+a).val(Object.values(httpHeadersFieldsArr[a]));
									}else if(Object.keys(httpHeadersFieldsArr[a]) == "AcceptCharset"){
										$("#headername_"+a).val(Object.keys(httpHeadersFieldsArr[a]));
										$("#headernamevalue_"+a).html(headerNameValueForAcceptCharset);
										$("#headernamevalue_"+a).val(Object.values(httpHeadersFieldsArr[a]));
									}else if(Object.keys(httpHeadersFieldsArr[a]) == "Accept-Encoding"){
										$("#headername_"+a).val(Object.keys(httpHeadersFieldsArr[a]));
										$("#headernamevalue_"+a).html(headerNameValueForAcceptEncoding);
										$("#headernamevalue_"+a).val(Object.values(httpHeadersFieldsArr[a]));
									}else if(Object.keys(httpHeadersFieldsArr[a]) == "user-agent"){
										$("#headername_"+a).val(Object.keys(httpHeadersFieldsArr[a]));
										$("#headernamevalue_"+a).html(headerNameValueForUserAgent);
										$("#headernamevalue_"+a).val(Object.values(httpHeadersFieldsArr[a]));
									}else if(Object.keys(httpHeadersFieldsArr[a]) == "Authorization"){
										debugger;
										$("#headername_"+a).val(Object.keys(httpHeadersFieldsArr[a]));
										var $addNew = $("<input type='text' placeholder='username' id='autharazationusername_"+a+"' class='form-control form-control-sm' name='headernamevalue'><input type='password' placeholder='password' id='autharazationpassword_"+a+"' class='form-control form-control-sm' name='headernamevalue'><span class='input-group-append'></span>");
										$("#headernamevalue_"+a).replaceWith($addNew);
										if(Object.values(httpHeadersFieldsArr[a]) !=null && Object.values(httpHeadersFieldsArr[a]) != ''){
											var authorizationArray = Object.values(httpHeadersFieldsArr[a]).toString().split(":");
											
											if(authorizationArray.length > 0){
												$("#autharazationusername_"+a).val(authorizationArray[0]);
												$("#autharazationpassword_"+a).val(authorizationArray[1]);
											}
										}
										
									}else if(Object.keys(httpHeadersFieldsArr[a]) == "ContentType"){
										$("#headername_"+a).val(Object.keys(httpHeadersFieldsArr[a]));
										$("#headernamevalue_"+a).html(headerNameValueForAccept);
										$("#headernamevalue_"+a).val(Object.values(httpHeadersFieldsArr[a]));
									}
								}
							}
						}
					}
				}
			}else{
				showHeaderFieldsTextBox();
			}
	 }else{
		 $(".customFieldsTabForHeaderFields").hide();
	 }
  }
  
  function loadDistinctAccountNameBasedOnStage(){
		$.ajax({
			url		:	"loadDistinctAccountNameBasedOnStage.do",
			success	:	function(data) {
				debugger;
				if(data !=null && data !=""){
					$("#clientName").html(data);
				}
			}
		});
  }
  
  function loadMappingDetails() {
		debugger;
		$('#contMap').find('tbody').empty();
		if(sunmartechMandatoryFieldLength > 0) {
			var remainder = sunmartechMandatoryFieldLength % 2;
			
			var rowsToAdd = 0;
			if(remainder > 0) {
				rowsToAdd = 1;
			}
			var numberOfRows = Math.floor(sunmartechMandatoryFieldLength / 2) + rowsToAdd;
			
			var index=0;
			for (var i=1;i<=numberOfRows;i++) {
				var columnData = '';
				
				for(var j=index;j<index+2;j++) {
					if(sunmartechMandatoryField[j] != null && sunmartechMandatoryField[j] != "") {
						columnData = columnData+"<td><label id='msorField_"+j+"' class='control-label'>"+sunmartechMandatoryField[j]+"</label></td>"+
						"<td><div class='input-group' style='width:100px'><input type='text' id='outputField_"+j+"' placeholder='N/A' class='form-control' aria-label='...'></div>"+
						"<td><span class='input-group-addon'><input type='checkbox' id='outputFieldChk_"+j+"' aria-label='...'></span></td></td><td><button type='button' class='btn btn-info btn-sm' onclick=callContactMapCsf("+j+",false,'sunmartechField') title='Apply Functions'>F(x)</button></td><td><button type='button' class='btn btn-info btn-sm' onclick=applyLookups("+j+",false,'sunmartechField') title='Apply Lookups'>Lookup</button></td><td class='sep'></td>";
					}
				}
				/*for(var j=index;j<index+2;j++) {
					if(sunmartechMandatoryField[j] != null && sunmartechMandatoryField[j] != "") {
						columnData = columnData+"<td><label id='msorField_"+j+"' class='control-label'>"+sunmartechMandatoryField[j]+"</label></td>"+
						"<td><div class='input-group' style='width:100px'><input type='text' id='outputField_"+j+"' value='N/A' class='form-control' aria-label='...'>"+
						"<span class='input-group-addon'><input type='checkbox' id='outputFieldChk_"+j+"' aria-label='...'></span></div></td><td><button type='button' class='btn btn-info btn-sm' onclick=applyLookups("+j+",false,'sunmartechField') title='Apply Lookups'>Lookup</button></td><td class='sep'></td>";
					}
				}*/
				var contactMappingData = "<tr>"+columnData+"</tr>";
				$('#contMap').find('tbody').append(contactMappingData);
				$('#contMap').find('td,th').last().remove();
				index=index+2;
			}
		}
	}

	function showCustomFieldTextBox() {
		document.getElementById("addCustomField").style.display='none';
		//var $addNew = $("<div class='input-group'><input type='text' placeholder='SMT LeadSender Name' id='sunmartechcustomfield_"+compCountForCustomField+"'><input type='text' placeholder='API Name' id='apicustomfield_"+compCountForCustomField+"'><input type='checkbox' id='chkboxcustomfield_"+compCountForCustomField+"' aria-label='...'><span class='input-group-append'><button id='addMultipleCustomFieldTextBox' onclick='callMultipleCustomFieldTextBox()' type='button' class='btn btn-info btn-sm' title='Add More Custom Fields'><span class='fa fa-plus' aria-hidden='true'></span></div>");
		//var abc = $('#sunmartechcustomfield_'+compCountForCustomField).val();
		var $addNew = $("<div class='input-group'><input type='text' placeholder='SMT LeadSender Name' id='sunmartechcustomfield_"+compCountForCustomField+"' onkeyup='checksunmartechField("+compCountForCustomField+")'><input type='text' placeholder='API Name' id='apicustomfield_"+compCountForCustomField+"'><input type='checkbox' id='chkboxcustomfield_"+compCountForCustomField+"' aria-label='...'><button type='button' id='functionButtoncustomfield_"+compCountForCustomField+"' class='btn btn-info btn-sm' onclick=callContactMapCsf("+compCountForCustomField+",true,'customField') title='Apply Functions' disabled>F(x)</button><button type='button' class='btn btn-info btn-sm' onclick=applyLookups("+compCountForCustomField+",true,'customField') title='Apply Lookups'>Lookup</button><button type='button' class='btn btn-info btn-sm' onclick=addStaticList("+compCountForCustomField+",true,'customField') title='Add Static List'>Add Static List</button><span class='input-group-append'><button id='addMultipleCustomFieldTextBox' onclick='callMultipleCustomFieldTextBox()' type='button' class='btn btn-info btn-sm' title='Add More Custom Fields'><span class='fa fa-plus' aria-hidden='true'></span></div>");
		/////////var $addNew = $("<div class='input-group'><input type='text' placeholder='SMT LeadSender Name' id='sunmartechcustomfield_"+compCountForCustomField+"' onkeyup='checksunmartechField("+compCountForCustomField+")'><input type='text' placeholder='API Name' id='apicustomfield_"+compCountForCustomField+"'><input type='checkbox' id='chkboxcustomfield_"+compCountForCustomField+"' aria-label='...'><button type='button' class='btn btn-info btn-sm' onclick=applyLookups("+compCountForCustomField+",true,'customField') title='Apply Lookups'>Lookup</button><span class='input-group-append'><button id='addMultipleCustomFieldTextBox' onclick='callMultipleCustomFieldTextBox()' type='button' class='btn btn-info btn-sm' title='Add More Custom Fields'><span class='fa fa-plus' aria-hidden='true'></span></div>");
		
		//var $addNew = $("<div class='input-group'><input type='text' placeholder='SMT LeadSender Name' id='sunmartechcustomfield_"+compCountForCustomField+"' onkeyup='checksunmartechField("+compCountForCustomField+")'><input type='text' placeholder='API Name' id='apicustomfield_"+compCountForCustomField+"'><input type='checkbox' id='chkboxcustomfield_"+compCountForCustomField+"' aria-label='...'><button type='button' id='functionButtoncustomfield_"+compCountForCustomField+"' class='btn btn-info btn-sm' onclick='callContactMapCsf("+compCountForCustomField+",true, 'sunmartechcustomfield_"+compCountForCustomField+"')' title='Apply Functions' disabled>F(x)</button><span class='input-group-append'><button id='addMultipleCustomFieldTextBox' onclick='callMultipleCustomFieldTextBox()' type='button' class='btn btn-info btn-sm' title='Add More Custom Fields'><span class='fa fa-plus' aria-hidden='true'></span></div>");
		$("#addCustomFieldDiv").append($addNew);
		compCountForCustomField++;
	}

	function callMultipleCustomFieldTextBox(){
		if(compCountForCustomField < customFieldLength) {
			var $addNew = $("<div class='input-group'><input type='text' placeholder='SMT LeadSender Name' id='sunmartechcustomfield_"+compCountForCustomField+"' onkeyup='checksunmartechField("+compCountForCustomField+")'><input type='text' placeholder='API Name' id='apicustomfield_"+compCountForCustomField+"'><input type='checkbox' id='chkboxcustomfield_"+compCountForCustomField+"' aria-label='...'><button type='button' id='functionButtoncustomfield_"+compCountForCustomField+"' class='btn btn-info btn-sm' onclick=callContactMapCsf("+compCountForCustomField+",true,'customField') title='Apply Functions' disabled>F(x)</button><button type='button' class='btn btn-info btn-sm' onclick=applyLookups("+compCountForCustomField+",true,'customField') title='Apply Lookups'>Lookup</button><button type='button' class='btn btn-info btn-sm' onclick=addStaticList("+compCountForCustomField+",true,'customField') title='Add Static List'>Add Static List</button><span class='input-group-append'><button type='button' class='delProgram btn btn-danger btn-sm'><span class='fa fa-times' aria-hidden='true'></span></div>");
			//////////////var $addNew = $("<div class='input-group'><input type='text' placeholder='SMT LeadSender Name' id='sunmartechcustomfield_"+compCountForCustomField+"' onkeyup='checksunmartechField("+compCountForCustomField+")'><input type='text' placeholder='API Name' id='apicustomfield_"+compCountForCustomField+"'><input type='checkbox' id='chkboxcustomfield_"+compCountForCustomField+"' aria-label='...'><button type='button' class='btn btn-info btn-sm' onclick=applyLookups("+compCountForCustomField+",true,'customField') title='Apply Lookups'>Lookup</button><span class='input-group-append'><button type='button' class='delProgram btn btn-danger btn-sm'><span class='fa fa-times' aria-hidden='true'></span></div>");
			
			//var $addNew = $("<div class='input-group'><input type='text' placeholder='SMT LeadSender Name' id='sunmartechcustomfield_"+compCountForCustomField+"' onkeyup='checksunmartechField("+compCountForCustomField+")'><input type='text' placeholder='API Name' id='apicustomfield_"+compCountForCustomField+"'><input type='checkbox' id='chkboxcustomfield_"+compCountForCustomField+"' aria-label='...'><button type='button' id='functionButtoncustomfield_"+compCountForCustomField+"' class='btn btn-info btn-sm' onclick='callContactMapCsf("+compCountForCustomField+",true, 'sunmartechcustomfield_"+compCountForCustomField+"')' title='Apply Functions' disabled>F(x)</button><span class='input-group-append'><button type='button' class='delProgram btn btn-danger btn-sm'><span class='fa fa-times' aria-hidden='true'></span></div>");
			$("#addMultipleCustomFieldDiv").append($addNew);
			compCountForCustomField++;
		}
	}
	
	function showCustomFieldTextBoxForMyFreshWorks() {
		document.getElementById("addCustomFieldForMyFreshWorks").style.display='none';
		var $addNew = $("<div class='input-group'><input type='text' placeholder='SMT LeadSender Name' id='sunmartechcustomfieldformyfreshworks_"+compCountForMyFreshWorksCustomField+"' onkeyup='checksunmartechFieldForMyFreshWorks("+compCountForMyFreshWorksCustomField+")'><input type='text' placeholder='API Name' id='apicustomfieldformyfreshworks_"+compCountForMyFreshWorksCustomField+"'><input type='checkbox' id='chkboxcustomfieldformyfreshworks_"+compCountForMyFreshWorksCustomField+"' aria-label='...'><button type='button' id='functionButtoncustomfieldformyfreshworks_"+compCountForMyFreshWorksCustomField+"' class='btn btn-info btn-sm' onclick=callContactMapCsf("+compCountForMyFreshWorksCustomField+",true,'customFieldForMyFreshWorks') title='Apply Functions' disabled>F(x)</button><button type='button' class='btn btn-info btn-sm' onclick=applyLookups("+compCountForMyFreshWorksCustomField+",true,'customFieldForMyFreshWorks') title='Apply Lookups'>Lookup</button><span class='input-group-append'><button id='addMultipleCustomFieldTextBoxForMyFreshWorks' onclick='callMultipleCustomFieldTextBoxForMyFreshWorks()' type='button' class='btn btn-info btn-sm' title='Add More Custom Fields'><span class='fa fa-plus' aria-hidden='true'></span></div>");
		$("#addCustomFieldDivForMyFreshWorks").append($addNew);
		compCountForMyFreshWorksCustomField++;
	}

	function callMultipleCustomFieldTextBoxForMyFreshWorks(){
		if(compCountForMyFreshWorksCustomField < customFieldLength) {
			var $addNew = $("<div class='input-group'><input type='text' placeholder='SMT LeadSender Name' id='sunmartechcustomfieldformyfreshworks_"+compCountForMyFreshWorksCustomField+"' onkeyup='checksunmartechFieldForMyFreshWorks("+compCountForMyFreshWorksCustomField+")'><input type='text' placeholder='API Name' id='apicustomfieldformyfreshworks_"+compCountForMyFreshWorksCustomField+"'><input type='checkbox' id='chkboxcustomfieldformyfreshworks_"+compCountForMyFreshWorksCustomField+"' aria-label='...'><button type='button' id='functionButtoncustomfieldformyfreshworks_"+compCountForMyFreshWorksCustomField+"' class='btn btn-info btn-sm' onclick=callContactMapCsf("+compCountForMyFreshWorksCustomField+",true,'customFieldForMyFreshWorks') title='Apply Functions' disabled>F(x)</button><button type='button' class='btn btn-info btn-sm' onclick=applyLookups("+compCountForMyFreshWorksCustomField+",true,'customFieldForMyFreshWorks') title='Apply Lookups'>Lookup</button><span class='input-group-append'><button type='button' class='delProgram btn btn-danger btn-sm'><span class='fa fa-times' aria-hidden='true'></span></div>");
			$("#addMultipleCustomFieldDivForMyFreshWorks").append($addNew);
			compCountForMyFreshWorksCustomField++;
		}
	}


	function showStaticFieldTextBox() {
		document.getElementById("addStaticField").style.display='none';
		var $addNew = $("<div class='input-group'><input type='text' placeholder='API Name' id='apistaticfieldname_"+compCountForStaicField+"'><input type='text' placeholder='Value' id='apistaticfieldvalue_"+compCountForStaicField+"'><span class='input-group-append'><button id='addMultipleStaticFieldTextBox' onclick='callMultipleStaticFieldTextBox()' type='button' class='btn btn-info btn-sm' title='Add More Hidden Fields'><span class='fa fa-plus' aria-hidden='true'></span></div>");
		$("#addStaticFieldDiv").append($addNew);
		compCountForStaicField++;
	}

	function callMultipleStaticFieldTextBox(){
		if(compCountForStaicField < staticFieldLength) {
			var $addNew = $("<div class='input-group'><input type='text' placeholder='API Name' id='apistaticfieldname_"+compCountForStaicField+"'><input type='text' placeholder='Value' id='apistaticfieldvalue_"+compCountForStaicField+"'><span class='input-group-append'><button type='button' class='delProgram btn btn-danger btn-sm'><span class='fa fa-times' aria-hidden='true'></span></div>");
			$("#addMultipleStaticFieldDiv").append($addNew);
			compCountForStaicField++;
		}
	}
	
	function showHeaderFieldsTextBox() {
		debugger;
		//document.getElementById("addHeaderFields").style.display='none';
		var $addNew = $("<div class='input-group'><select id='headername_"+compCountForHeaderFields+"' class='form-control form-control-sm' name='headername' onchange='checkHeaderName("+compCountForHeaderFields+")'></select><select id='headernamevalue_"+compCountForHeaderFields+"' class='form-control form-control-sm' name='headernamevalue'></select><span class='input-group-append'><button id='addMultipleStaticFieldTextBox' onclick='callMultipleHeaderFields()' type='button' class='btn btn-info btn-sm' title='Add More Headers'><span class='fa fa-plus' aria-hidden='true'></span></div>");
		
		$("#addHeaderFieldsDiv").append($addNew);
		$("#headername_"+compCountForHeaderFields).html(headerNameValue);
		$("#headernamevalue_"+compCountForHeaderFields).html(headerNameValueForAccept);
		
		$('select option[value="Accept"]').attr("selected",true);
		$('select option[value="application/x-www-form-urlencoded"]').attr("selected",true);
		compCountForHeaderFields++;
	}
	
	function callMultipleHeaderFields(){
		debugger;
		if(compCountForHeaderFields < headerFieldLength) {
			var $addNew = $("<div class='input-group'><select id='headername_"+compCountForHeaderFields+"' class='form-control form-control-sm' name='headername' onchange='checkHeaderName("+compCountForHeaderFields+")'></select><select placeholder='Value' id='headernamevalue_"+compCountForHeaderFields+"' class='form-control form-control-sm' name='headernamevalue'></select><span class='input-group-append'><button type='button' class='delProgram btn btn-danger btn-sm'><span class='fa fa-times' aria-hidden='true'></span></div>");
			
			$("#addMultipleHeaderFieldsDiv").append($addNew);
			/* var index = headerNameValue.indexOf("Accept");
			if(index >= 0) {
				headerNameValue.split(",").splice(index, 1);
			} */
			//$("#headername_1 option[value='Accept']").remove();
			$("#headername_"+compCountForHeaderFields).html(headerNameValue);
			compCountForHeaderFields++;
		}
	}
	
	function showJsonFieldTextBox() {
		var $addNew = $("<tr><td><input type='text' class='form-control form-control-sm' id='sunmartechjsonfield_"+compCountForJsonField+"' onkeyup='checkJsonField("+compCountForJsonField+")' disabled></td><td><select id='jsonsunmartechnamevalue_"+compCountForJsonField+"' class='form-control form-control-sm' name='jsonsunmartechnamevalue'></select></td><td><input type='checkbox' id='chkboxjsonfield_"+compCountForJsonField+"' aria-label='...'></td><td><button type='button' id='functionButtonjsonfield_"+compCountForJsonField+"' class='btn btn-info btn-sm' onclick=callContactMapCsf("+compCountForJsonField+",false,'jsonField') title='Apply Functions' >F(x)</button></td><td><button type='button' class='btn btn-info btn-sm' onclick=applyLookups("+compCountForJsonField+",false,'jsonField') title='Apply Lookups'>Lookup</button></td></tr>");
		$("#addJsonFieldDiv").append($addNew);
		$("#jsonsunmartechnamevalue_"+compCountForJsonField).html(jsonFieldValue);
		compCountForJsonField++;
	}
	
	function closeAddNewIntegrationModel(){
		if((lookupFieldsExactMatchArray != null && lookupFieldsExactMatchArray != "" && lookupFieldsExactMatchArray != "[]") || (lookupFieldsPhraseMatchArray != null && lookupFieldsPhraseMatchArray != "" && lookupFieldsPhraseMatchArray != "[]")){
			$("#addNewIntegrationErrorMsg").html("* Please update the datapass before close.").show();
			setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");},5000);
			return false;
		}else{
			$("#newCustomerModal").modal("hide");
			document.getElementById("addStaticField").style.display='block';
			document.getElementById("addCustomField").style.display='block';
			document.getElementById("addCustomFieldForMyFreshWorks").style.display='block';
			
			$('#addCustomFieldDiv').html('');
			$('#addMultipleCustomFieldDiv').html('');
			$('#addStaticFieldDiv').html('');
			$('#addMultipleStaticFieldDiv').html('');
			$('#addCustomFieldDivForMyFreshWorks').html('');
			$('#addMultipleCustomFieldDivForMyFreshWorks').html('');
			$('#addHeaderFieldsDiv').html('');
			$('#addMultipleHeaderFieldsDiv').html('');
			
			compCountForCustomField = 0;
			compCountForStaicField = 0;
			compCountForMyFreshWorksCustomField = 0;
			compCountForHeaderFields = 0;
		}
	}
	
	function updateIntegration(){
		disableDatapassButton();
		var ssFieldJsonArray = [];
		var ssFieldJsonObject = {json:{}};
		var mandatoryFieldsArray = [];
		var deportFieldsArray = [];
		var ssFieldsValues='';
		var mandatoryFieldsValue='';
		var deportFieldsValue='';
		var staticFieldsValues='';
		var staticFieldJsonObject = {};
		var staticFieldJsonArray = [];
		var ssFieldJsonArrayForMyFreshWorks = [];
		var ssFieldJsonObjectForMyFreshWorks = {json:{}};
		var ssFieldsValuesForMyFreshWorks='';
		var headerFieldJsonObject = {};
		var headerFieldJsonArray = [];
		var headerFieldsValues='';
		
		/* if($("#clientName").val() == ""){
			$("#addNewIntegrationErrorMsg").html("* Kindly provide client name").show();
			setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");},4000);
			return false;
		} */
		if($("#integrationName").val() == ""){
			$("#addNewIntegrationErrorMsg").html("* Kindly provide Datapass name").show();
			setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
			return false;
		}
		if($("#integrationType").val() == ""){
			$("#addNewIntegrationErrorMsg").html("* Kindly provide datapass type").show();
			setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
			return false;
		}else{
			if($("#integrationType").val() != "sftp_client"){
				if($("#endpointUrlOutput").val() == ""){
					$("#addNewIntegrationErrorMsg").html("* Kindly provide endpoint url").show();
					setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
					return false;
				}
				if($('#endpointUrlOutput').val().indexOf("myfreshworks.com") != -1){
					if($("#apikey").val() == ""){
						$("#addNewIntegrationErrorMsg").html("* Kindly provide api key").show();
						setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
						return false;
					}
				}
			}
			
			/* if($("#postProcessType").val() == ""){
				$("#addNewIntegrationErrorMsg").html("* Kindly provide post process type").show();
				setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");},4000);
				return false;
			} */
			/* if($("#integrationType").val() == "SOAP_client" || $("#integrationType").val() == "soap_client"){
				if($("#usernameOutput").val() == ""){
					$("#addNewIntegrationErrorMsg").html("* Kindly provide username").show();
					setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");},4000);
					return false;
				}
				if($("#passwordOutput").val() == ""){
					$("#addNewIntegrationErrorMsg").html("* Kindly provide password").show();
					setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");},4000);
					return false;
				}
			} */
			
			if($("#integrationType").val() == "SFTP_client" || $("#integrationType").val() == "sftp_client"){
				if($("#sftphost").val() == ""){
					$("#addNewIntegrationErrorMsg").html("* Kindly provide host name").show();
					setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
					return false;
				}
				if($("#sftpport").val() == ""){
					$("#addNewIntegrationErrorMsg").html("* Kindly provide port name").show();
					setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
					return false;
				}
				if($("#sftpuser").val() == ""){
					$("#addNewIntegrationErrorMsg").html("* Kindly provide username").show();
					setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
					return false;
				}
				if($("#sftppass").val() == ""){
					$("#addNewIntegrationErrorMsg").html("* Kindly provide password").show();
					setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
					return false;
				}
				if($("#sftpworkingdir").val() == ""){
					$("#addNewIntegrationErrorMsg").html("* Kindly provide directory").show();
					setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
					return false;
				}
			}
			if($("#integrationType").val() == "REST_client" || $("#integrationType").val() == "rest_client" || $("#integrationType").val() == "mkto_bulk_import"){
				if($("#restIdentityUrl").val()!= null && $("#restIdentityUrl").val()!= "" && $("#restIdentityUrl").val()!= "undefined" ){
						if($("#clientId").val() == ""){
							$("#addNewIntegrationErrorMsg").html("* Kindly provide client id.").show();
							setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
							return false;
						}
						if($("#clientSecret").val() == ""){
							$("#addNewIntegrationErrorMsg").html("* Kindly provide client secret.").show();
							setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
							return false;
						}
				}
			}
			/* if($("#integrationType").val() == "REST_client" || $("#integrationType").val() == "rest_client"){
				if($("#restIdentityUrl").val() == ""){
					$("#addNewIntegrationErrorMsg").html("* Kindly provide rest identity url").show();
					setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");},4000);
					return false;
				}
			} */
		}
		
		if($("#advanceLookup").val() != null && $("#advanceLookup").val() !="" && $("#advanceLookup").val() !="[]"){
			if(!IsJsonString($("#advanceLookup").val())) {
				$("#addNewIntegrationErrorMsg").html("* Value entered in advance lookup is not in valid format.").show();
				setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
				return false;
			}
		}
		debugger;
		if($("#clientSpecificJson").val() != null && $("#clientSpecificJson").val() !="" && $("#clientSpecificJson").val() !="[]"){
			if(!IsJsonString($("#clientSpecificJson").val())) {
				$("#addNewIntegrationErrorMsg").html("* Client specific json is not in valid format.").show();
				setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
				return false;
			}
		}
		debugger;
		if(sunmartechMandatoryFieldLength > 0 && ($("#clientSpecificJson").val() == null || $("#clientSpecificJson").val() == "")) {
			for(var i=0; i<sunmartechMandatoryFieldLength; i++) {
				if(($("#msorField_"+i).text() != null && $("#msorField_"+i).text() != "" && $("#msorField_"+i).text() != "undefined") &&  
					($("#outputField_"+i).val() != null && $("#outputField_"+i).val() != "" && $("#outputField_"+i).val() != "undefined" && $("#outputField_"+i).val() != "N/A")) {
					debugger;
					ssFieldJsonObject.json[$("#msorField_"+i).text()] = $("#outputField_"+i).val();
					
					if($("#outputFieldChk_"+i).is(':checked')) {
						mandatoryFieldsArray.push($("#msorField_"+i).text()); 
					}
					
					deportFieldsArray.push($("#msorField_"+i).text());
				}
				
				if($("#sunmartechcustomfield_"+i).val() != null && $("#sunmartechcustomfield_"+i).val() != "" && $("#sunmartechcustomfield_"+i).val() != "undefined") {
					ssFieldJsonObject.json[$("#sunmartechcustomfield_"+i).val()] = $("#apicustomfield_"+i).val();
					if($("#apicustomfield_"+i).val() != null && $("#apicustomfield_"+i).val() != "" && $("#apicustomfield_"+i).val() != "undefined"){
						if($("#chkboxcustomfield_"+i).is(':checked')) {
							mandatoryFieldsArray.push($("#sunmartechcustomfield_"+i).val()); 
						}
					}
					deportFieldsArray.push($("#sunmartechcustomfield_"+i).val());
				}
				
				if(($("#sunmartechcustomfieldformyfreshworks_"+i).val() != null && $("#sunmartechcustomfieldformyfreshworks_"+i).val() != "" && $("#sunmartechcustomfieldformyfreshworks_"+i).val() != "undefined") &&  
						($("#apicustomfieldformyfreshworks_"+i).val() != null && $("#apicustomfieldformyfreshworks_"+i).val() != "" && $("#apicustomfieldformyfreshworks_"+i).val() != "undefined")) {
							
						ssFieldJsonObjectForMyFreshWorks.json[$("#sunmartechcustomfieldformyfreshworks_"+i).val()] = $("#apicustomfieldformyfreshworks_"+i).val();
							
						if($("#chkboxcustomfieldformyfreshworks_"+i).is(':checked')) {
							mandatoryFieldsArray.push($("#sunmartechcustomfieldformyfreshworks_"+i).val()); 
						}
						deportFieldsArray.push($("#sunmartechcustomfieldformyfreshworks_"+i).val());
				}
				
				if(($("#apistaticfieldname_"+i).val() != null && $("#apistaticfieldname_"+i).val() != "" && $("#apistaticfieldname_"+i).val() != "undefined") &&  
						($("#apistaticfieldvalue_"+i).val() != null && $("#apistaticfieldvalue_"+i).val() != "" && $("#apistaticfieldvalue_"+i).val() != "undefined")) {
							
						staticFieldJsonObject[$("#apistaticfieldname_"+i).val()] = $("#apistaticfieldvalue_"+i).val();
				}
				
				if($("#headername_"+i).val() != null && $("#headername_"+i).val() != "" && $("#headername_"+i).val() != "undefined") {
					
					if($("#headernamevalue_"+i).val() != null && $("#headernamevalue_"+i).val() != "" && $("#headernamevalue_"+i).val() != "undefined"){
						headerFieldJsonObject[$("#headername_"+i).val()] = $("#headernamevalue_"+i).val();
					}
					
					if(($("#autharazationusername_"+i).val() != null && $("#autharazationusername_"+i).val() != "" && $("#autharazationusername_"+i).val() != "undefined") &&  
							($("#autharazationpassword_"+i).val() != null && $("#autharazationpassword_"+i).val() != "" && $("#autharazationpassword_"+i).val() != "undefined")) {
						headerFieldJsonObject[$("#headername_"+i).val()] = $("#autharazationusername_"+i).val() + ":" + $("#autharazationpassword_"+i).val();
					}
				}
			}
		}else if(sunmartechMandatoryFieldLength > 0 && ($("#clientSpecificJson").val() != null || $("#clientSpecificJson").val() != "") && ($("#integrationType").val() == "sftp_client" || $("#integrationType").val() == "mkto_bulk_import")) {
			$("#clientSpecificJson").val("");
			for(var i=0; i<sunmartechMandatoryFieldLength; i++) {
				if(($("#msorField_"+i).text() != null && $("#msorField_"+i).text() != "" && $("#msorField_"+i).text() != "undefined") &&  
					($("#outputField_"+i).val() != null && $("#outputField_"+i).val() != "" && $("#outputField_"+i).val() != "undefined" && $("#outputField_"+i).val() != "N/A")) {
					debugger;
					ssFieldJsonObject.json[$("#msorField_"+i).text()] = $("#outputField_"+i).val();
					
					if($("#outputFieldChk_"+i).is(':checked')) {
						mandatoryFieldsArray.push($("#msorField_"+i).text()); 
					}
					
					deportFieldsArray.push($("#msorField_"+i).text());
				}
				
				if($("#sunmartechcustomfield_"+i).val() != null && $("#sunmartechcustomfield_"+i).val() != "" && $("#sunmartechcustomfield_"+i).val() != "undefined") {
					ssFieldJsonObject.json[$("#sunmartechcustomfield_"+i).val()] = $("#apicustomfield_"+i).val();
					if($("#apicustomfield_"+i).val() != null && $("#apicustomfield_"+i).val() != "" && $("#apicustomfield_"+i).val() != "undefined"){
						if($("#chkboxcustomfield_"+i).is(':checked')) {
							mandatoryFieldsArray.push($("#sunmartechcustomfield_"+i).val()); 
						}
					}
					deportFieldsArray.push($("#sunmartechcustomfield_"+i).val());
				}
				
				if(($("#sunmartechcustomfieldformyfreshworks_"+i).val() != null && $("#sunmartechcustomfieldformyfreshworks_"+i).val() != "" && $("#sunmartechcustomfieldformyfreshworks_"+i).val() != "undefined") &&  
						($("#apicustomfieldformyfreshworks_"+i).val() != null && $("#apicustomfieldformyfreshworks_"+i).val() != "" && $("#apicustomfieldformyfreshworks_"+i).val() != "undefined")) {
							
						ssFieldJsonObjectForMyFreshWorks.json[$("#sunmartechcustomfieldformyfreshworks_"+i).val()] = $("#apicustomfieldformyfreshworks_"+i).val();
							
						if($("#chkboxcustomfieldformyfreshworks_"+i).is(':checked')) {
							mandatoryFieldsArray.push($("#sunmartechcustomfieldformyfreshworks_"+i).val()); 
						}
						deportFieldsArray.push($("#sunmartechcustomfieldformyfreshworks_"+i).val());
				}
				
				if(($("#apistaticfieldname_"+i).val() != null && $("#apistaticfieldname_"+i).val() != "" && $("#apistaticfieldname_"+i).val() != "undefined") &&  
						($("#apistaticfieldvalue_"+i).val() != null && $("#apistaticfieldvalue_"+i).val() != "" && $("#apistaticfieldvalue_"+i).val() != "undefined")) {
							
						staticFieldJsonObject[$("#apistaticfieldname_"+i).val()] = $("#apistaticfieldvalue_"+i).val();
				}
				
				if($("#headername_"+i).val() != null && $("#headername_"+i).val() != "" && $("#headername_"+i).val() != "undefined") {
					
					if($("#headernamevalue_"+i).val() != null && $("#headernamevalue_"+i).val() != "" && $("#headernamevalue_"+i).val() != "undefined"){
						headerFieldJsonObject[$("#headername_"+i).val()] = $("#headernamevalue_"+i).val();
					}
					
					if(($("#autharazationusername_"+i).val() != null && $("#autharazationusername_"+i).val() != "" && $("#autharazationusername_"+i).val() != "undefined") &&  
							($("#autharazationpassword_"+i).val() != null && $("#autharazationpassword_"+i).val() != "" && $("#autharazationpassword_"+i).val() != "undefined")) {
						headerFieldJsonObject[$("#headername_"+i).val()] = $("#autharazationusername_"+i).val() + ":" + $("#autharazationpassword_"+i).val();
					}
				}
			}
		}
		else{
			if(jsonFieldDataLength > 0){
				clientSpecificJsonMapping = $("#clientSpecificJson").val();
				for(var i=0; i<jsonFieldDataLength; i++) {
					if($("#sunmartechjsonfield_"+i).val() != null && $("#sunmartechjsonfield_"+i).val() != "" && $("#sunmartechjsonfield_"+i).val() != "undefined") {
						if($("#jsonsunmartechnamevalue_"+i).val() != null && $("#jsonsunmartechnamevalue_"+i).val() != "" && $("#jsonsunmartechnamevalue_"+i).val() !="undefined"){
							ssFieldJsonObject.json[$("#jsonsunmartechnamevalue_"+i).val()] = $("#sunmartechjsonfield_"+i).val();
							clientSpecificJsonMapping = clientSpecificJsonMapping.replace("|!"+$("#sunmartechjsonfield_"+i).val()+"!|","|!"+$("#jsonsunmartechnamevalue_"+i).val()+"!|");
							if($("#chkboxjsonfield_"+i).is(':checked')) {
								mandatoryFieldsArray.push($("#jsonsunmartechnamevalue_"+i).val());
							}
							deportFieldsArray.push($("#jsonsunmartechnamevalue_"+i).val());
							
						}else{
							ssFieldJsonObject.json[$("#sunmartechjsonfield_"+i).val()] = $("#sunmartechjsonfield_"+i).val();
							if($("#chkboxjsonfield_"+i).is(':checked')) {
								mandatoryFieldsArray.push($("#sunmartechjsonfield_"+i).val()); 
							}
							deportFieldsArray.push($("#sunmartechjsonfield_"+i).val());
						}
					}
				}
				$("#clientSpecificJson").val(clientSpecificJsonMapping);
			}
		}
		debugger;
		if(Object.keys(ssFieldJsonObject.json).length > 0) {
			ssFieldJsonArray.push(ssFieldJsonObject);
		}
		
		if(ssFieldJsonArray.length > 0){
			//alert(JSON.stringify(ssFieldJsonArray));
			ssFieldsValues=JSON.stringify(ssFieldJsonArray);
		}
		
		if(Object.keys(ssFieldJsonObjectForMyFreshWorks.json).length > 0) {
			ssFieldJsonArrayForMyFreshWorks.push(ssFieldJsonObjectForMyFreshWorks);
		}
		
		if(ssFieldJsonArrayForMyFreshWorks.length > 0){
			//alert(JSON.stringify(ssFieldJsonArray));
			ssFieldsValuesForMyFreshWorks=JSON.stringify(ssFieldJsonArrayForMyFreshWorks);
		}
		
		
		if(mandatoryFieldsArray.length > 0){
			//alert(mandatoryFieldsArray.join(","));
			mandatoryFieldsValue = mandatoryFieldsArray.join(",");
		}
		
		if(deportFieldsArray.length > 0) {
			deportFieldsArray.push("integration_name");
			//alert(deportFieldsArray.join(","));	
			deportFieldsValue = deportFieldsArray.join(",");
		}
		
		if(Object.keys(staticFieldJsonObject).length > 0) {
			staticFieldJsonArray.push(staticFieldJsonObject);
		}
		
		if(staticFieldJsonArray.length > 0){
			//alert(JSON.stringify(staticFieldJsonArray));
			staticFieldsValues=JSON.stringify(staticFieldJsonArray);
		}
		if(Object.keys(headerFieldJsonObject).length > 0) {
			headerFieldJsonArray.push(headerFieldJsonObject);
		}
		
		if(headerFieldJsonArray.length > 0){
			//alert(JSON.stringify(headerFieldJsonArray));
			headerFieldsValues=JSON.stringify(headerFieldJsonArray);
		}
		
		if(ssFieldsValues == ""){
			$("#addNewIntegrationErrorMsg").html("* Kindly select any mapping field.").show();
			setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
			return false;
		}
		debugger;
		if(validationValue != null && validationValue !="" && validationValue !="undefined"){
			//do nothing
			var setValidationArr=[];
			var previousValidationArr = validationValue;
			for(var a=0;a<=previousValidationArr.length;a++){
				if(previousValidationArr[a] != null && previousValidationArr[a] != "" && previousValidationArr[a] !="undefined"){
					if(Object.keys(previousValidationArr[a]) != null && Object.keys(previousValidationArr[a]) !="" && Object.keys(previousValidationArr[a]) !="undefined"){
						var msorKey = Object.keys(previousValidationArr[a]);
						if(deportFieldsValue.indexOf(msorKey) != -1){
						    setValidationArr.push(previousValidationArr[a]);
						}
					}
				}
			}
			debugger;
			if(setValidationArr != null && setValidationArr !="" && setValidationArr !="undefined" && setValidationArr.length > 0){
				validationValue = setValidationArr;
				validationValue = JSON.stringify(validationValue);
			}else{
				validationValue = '';
			}
			
		}else{
			//validationValue = defaultValidationValue;
		}
		
		/* if(clientOthersLookup != null && clientOthersLookup !="" && clientOthersLookup !="undefined"){
			//do nothing
		}else{
			clientOthersLookup = defaultClientOthersLookup;
		} */
		var setLookupValueExactMatchArray = [];
		var setLookupValuePhraseMatchArray = [];
		var lookupArray = [];
		
		if(lookupField != null && lookupField !="" && lookupField !="undefined"){
			if(defaultLookupField != null && defaultLookupField !="" && defaultLookupField !="undefined"){
				var exactMatch = '';
				var phraseMatch = '';
				$(defaultLookupField).each(function (index, item) {
					if(item.exact_match != null && item.exact_match != "" && item.exact_match !="undefined"){
						exactMatch = item.exact_match;
					}
					if(item.phrase_match != null && item.phrase_match != "" && item.phrase_match !="undefined"){
						phraseMatch = item.phrase_match;
					}
				});
				if(exactMatch != null && exactMatch != "" && exactMatch !="undefined"){
	            	   if(JSON.stringify(lookupFieldsPhraseMatchArray).indexOf($("#lookupType").val()) == -1) {
	            		   setLookupValueExactMatchArray.push(exactMatch);
	            	   }else{
	            		   if(exactMatch.indexOf($("#lookupType").val()) == -1) {
	            			   setLookupValueExactMatchArray.push(exactMatch);
	            		   }else{
	            			   var exactMatchValue='';
	            			   var exactMatchArr = exactMatch.split(",");
	            			   if(exactMatchArr != null && exactMatchArr !="" && exactMatchArr !="[]"){
	            				   for(var e=0;e<exactMatchArr.length;e++){
	            					   if(exactMatchArr[e] !=null && exactMatchArr[e] !="" && exactMatchArr[e] !="undefined"){
	            						   if(exactMatchArr[e].indexOf("--") != -1){
	            							   if(JSON.stringify(lookupFieldsPhraseMatchArray).indexOf(exactMatchArr[e]) != -1){
	            								   exactMatch = exactMatch.replace(exactMatchArr[e], '');
	  	         							  }
	            						   }else{
	            							   if(exactMatchArr[e].indexOf($("#lookupType").val()) != -1){
	            								   exactMatch = exactMatch.replace($("#lookupType").val(), '');
	            							   }
		         						   }
	            					   }
	            				   }
	            				   var exactMatchValueArr = exactMatch.split(",");
	    							 if(exactMatchValueArr != null && exactMatchValueArr !="" && exactMatchValueArr !="[]"){
	    								for(var f=0;f<exactMatchValueArr.length;f++){
	    									if(exactMatchValueArr[f] !=null && exactMatchValueArr[f] !="" && exactMatchValueArr[f] !="undefined"){
	  	            						   if(exactMatchValue != null && exactMatchValue !=""){
	  	            							 exactMatchValue = exactMatchValue+","+exactMatchValueArr[f];
	  	            						   }else{
	  	            							 exactMatchValue = exactMatchValueArr[f];
	  	            						   }
	  	            					   }
	    								}
	    							}
	            			   }
	            			   if(exactMatchValue != null && exactMatchValue !=""){
	            				   setLookupValueExactMatchArray.push(exactMatchValue);
	            			   }
	            	   }
	            }
			}
				if(phraseMatch != null && phraseMatch != "" && phraseMatch !="undefined"){
	            	   if(JSON.stringify(lookupFieldsExactMatchArray).indexOf($("#lookupType").val()) == -1) {
	            		   setLookupValuePhraseMatchArray.push(phraseMatch);
	            	   }else{
	            		   if(phraseMatch.indexOf($("#lookupType").val()) == -1) {
	            			   setLookupValuePhraseMatchArray.push(phraseMatch);
	            		   }else{
	            			   var phraseMatchValue='';
	            			   var phraseMatchArr = phraseMatch.split(",");
		            		   if(phraseMatchArr != null && phraseMatchArr !="" && phraseMatchArr !="[]"){
	         				   for(var e=0;e<phraseMatchArr.length;e++){
	         					   debugger;
	         					   if(phraseMatchArr[e] !=null && phraseMatchArr[e] !="" && phraseMatchArr[e] !="undefined"){
	         						   if(phraseMatchArr[e].indexOf("--") != -1){
	         							  if(JSON.stringify(lookupFieldsExactMatchArray).indexOf(phraseMatchArr[e]) != -1){
	         								 phraseMatch = phraseMatch.replace(phraseMatchArr[e], '');
	         							  }
	         						   }else{
	         							  if(phraseMatchArr[e].indexOf($("#lookupType").val()) != -1){
	         								 phraseMatch = phraseMatch.replace($("#lookupType").val(), '');
	         							  }
	         						   }
	         					   }
	         				   }
	         				   
	         				 var phraseMatchValueArr = phraseMatch.split(",");
  							 if(phraseMatchValueArr != null && phraseMatchValueArr !="" && phraseMatchValueArr !="[]"){
  								for(var f=0;f<phraseMatchValueArr.length;f++){
  									if(phraseMatchValueArr[f] !=null && phraseMatchValueArr[f] !="" && phraseMatchValueArr[f] !="undefined"){
	            						   if(phraseMatchValue != null && phraseMatchValue !=""){
	            							   phraseMatchValue = phraseMatchValue+","+phraseMatchValueArr[f];
	            						   }else{
	            							   phraseMatchValue = phraseMatchValueArr[f];
	            						   }
	            					   }
  								}
  							}
	            		   }
		            		   if(phraseMatchValue != null && phraseMatchValue !=""){
	            				   setLookupValuePhraseMatchArray.push(phraseMatchValue);
	            			   }
         			   }
	            		   
	            	   }
	               }
			}
			
	        if(lookupFieldsExactMatchArray != null && lookupFieldsExactMatchArray != "" && lookupFieldsExactMatchArray != "[]") {
	        	setLookupValueExactMatchArray.push(lookupFieldsExactMatchArray);
	   		}
	        if(setLookupValueExactMatchArray != null && setLookupValueExactMatchArray != "" && setLookupValueExactMatchArray != "[]") {
	        	var setExactMatchLookupArray = setLookupValueExactMatchArray.join(",").split(",");
	        	var uniqueLookupFieldsExactMatchArray = setExactMatchLookupArray.filter(function(itm, i, setExactMatchLookupArray) {
	        	    return i == setExactMatchLookupArray.indexOf(itm);
	        	});
	        	lookupArray.push({"exact_match":uniqueLookupFieldsExactMatchArray.join(",")});
	        }
	        if(lookupFieldsPhraseMatchArray != null && lookupFieldsPhraseMatchArray != "" && lookupFieldsPhraseMatchArray != "[]") {
	        	setLookupValuePhraseMatchArray.push(lookupFieldsPhraseMatchArray);
			}
	        if(setLookupValuePhraseMatchArray != null && setLookupValuePhraseMatchArray != "" && setLookupValuePhraseMatchArray != "[]") {
	        	var setPhraseMatchLookupArray = setLookupValuePhraseMatchArray.join(",").split(",");
	        	var uniqueLookupFieldsPhraseMatchArray = setPhraseMatchLookupArray.filter(function(itm, i, setPhraseMatchLookupArray) {
	        	    return i == setPhraseMatchLookupArray.indexOf(itm);
	        	});
	        	lookupArray.push({"phrase_match":uniqueLookupFieldsPhraseMatchArray.join(",")});
	        }
	        if(lookupArray != null && lookupArray != "[]" && lookupArray.length > 0) {
				$("#lookup_fields").val(JSON.stringify(lookupArray));
				
				lookupField = trimValue($("#lookup_fields").val());
			}
			
		}else{
			lookupField = defaultLookupField;
		}
		
		var tableRow = {integrationId:$("#hiddenIntegrationId").val(),clientName:trimValue($("#clientName").val()),integrationName:trimValue($("#integrationName").val()),integrationType:trimValue($("#integrationType").val()),
				endpointUrlOutput:trimValue($("#endpointUrlOutput").val()),restIdentityUrl:trimValue($("#restIdentityUrl").val()),
				usernameOutput:trimValue($("#usernameOutput").val()),passwordOutput:trimValue($("#passwordOutput").val()),username:loginUserName,ssFields:ssFieldsValues,
				mandatoryFields:mandatoryFieldsValue,deportFields:deportFieldsValue,staticFields:staticFieldsValues,validationFields:validationValue,successType:trimValue($("#successPhrase").val()),lookup_fields:lookupField,
				clientOthersLookupFields:trimValue($("#advanceLookup").val()),integrationStatus:"completed",ssFieldsForMyFreshWorks:ssFieldsValuesForMyFreshWorks,apiKey:trimValue($("#apikey").val()),
				sftpHost:trimValue($("#sftphost").val()),sftpPort:trimValue($("#sftpport").val()),sftpUser:trimValue($("#sftpuser").val()),sftpPass:trimValue($("#sftppass").val()),sftpWorkingDir:trimValue($("#sftpworkingdir").val()),
				headerFields:headerFieldsValues,staticListEndPointUrl:trimValue($("#staticListEndPointUrl").val()),multipleStaticFieldsValues:ssMultipleStaticFieldsValues,clientSpecificJson:trimValue($("#clientSpecificJson").val()),
				recordTimeDelay:$("#recordTimeDelay").val(),oauth:trimValue($("#oauth").val()),clientId:trimValue($("#clientId").val()),clientSecret:trimValue($("#clientSecret").val()),accessToken:trimValue($("#accessToken").val())};
		console.log(JSON.stringify(tableRow));
		$("#addNewCustomerLoader").show();
		$.ajax({
			url: "updateIntegrationDetails.do",
			type: "POST",
			data: encodeURIComponent(JSON.stringify(tableRow)),
			success : function(result) {
				//alert(result);
				$("#addNewCustomerLoader").hide();
				if(result == "success") {
					$("#addNewIntegrationSuccessMsg").html("* Datapass updated successfully").show();
					setTimeout(function(){
						resetAddNewIntegrationModel();
						lookupFieldsExactMatchArray = [];
						lookupFieldsPhraseMatchArray = [];
						fetchIntegrationDetails();
						$('#addNewIntegrationSuccessMsg').html("");
						},1000);
				}else if(result == "integrationNameExists"){
					$("#addNewIntegrationErrorMsg").html("* Datapass name already exists.").show();
					setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
				}
				else  {
					//$("#mergeLoader").hide();
					$("#addNewIntegrationErrorMsg").html("* error occurred while updating record in table, kindly check with development team.").show();
					setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},5000);
				}
			}
		});  
	}
	
	function trimValue(value) {
		var trimValue='';
		if(value != null && value != "" && value != "undefined") {
			console.log(value);
			trimValue=value.trim();
		}
		return trimValue;
	}
	
	function resetAddNewIntegrationModel(){
		$('#newCustomerModal').modal('hide');
		
		var select2ClientNameVal = "Select Client Name";
		$("#select2-clientName-container").html(select2ClientNameVal);
		$("#select2-clientName-container").prop("title",select2ClientNameVal);
			
		$("#clientName").val("");
		$("#integrationName").val("");
		$("#integrationType").val("");
		$("#endpointUrlOutput").val("");
		$("#restIdentityUrl").val("");
		//$("#postProcessType").val("");
		$("#usernameOutput").val("");
		$("#passwordOutput").val("");
		$("#successPhrase").val("");
		
		document.getElementById("addStaticField").style.display='block';
		document.getElementById("addCustomField").style.display='block';
		document.getElementById("addCustomFieldForMyFreshWorks").style.display='block';
		
		
		$('#addCustomFieldDiv').html('');
		$('#addMultipleCustomFieldDiv').html('');
		$('#addStaticFieldDiv').html('');
		$('#addMultipleStaticFieldDiv').html('');
		$('#addCustomFieldDivForMyFreshWorks').html('');
		$('#addMultipleCustomFieldDivForMyFreshWorks').html('');
		$('#addHeaderFieldsDiv').html('');
		$('#addMultipleHeaderFieldsDiv').html('');
		
		compCountForCustomField = 0;
		compCountForStaicField = 0;
		compCountForMyFreshWorksCustomField = 0;
		compCountForHeaderFields = 0;
		$("#clientSpecificJson").val("");
	}
	
	function callContactMapCsf(value, customField, msorValue){
		debugger;
		var fields="";
		if(msorValue =="sunmartechField"){
			fields = $('#msorField_'+value).text();
			isCustomFieldForMyFreshWorks = false;
		}else if(msorValue =="customFieldForMyFreshWorks"){
			fields = $('#sunmartechcustomfieldformyfreshworks_'+value).val();
			isCustomFieldForMyFreshWorks = true;
		}else if(msorValue =="jsonField"){
			fields = $('#jsonsunmartechnamevalue_'+value).val();
			isCustomFieldForMyFreshWorks = false;
		}else{
			fields = $('#sunmartechcustomfield_'+value).val();
			isCustomFieldForMyFreshWorks = false;
		}
		
		//var abc = $('#sunmartechcustomfield_'+value).val();
		//alert("fields::"+fields);
		$("#hiddenMsorValue").val(fields);
		$('#contMapCsfModal').modal('show');
		csfValidationValue = value;
		isCustomField = customField;
		
		fetchCSVDetails();
		displayCSV();
	}
	
	function displayCSV(){
		$('#validationSpin').show();
		var data= $("#validationhidden").val();
		if(data != null && data != "") {
			debugger;
			validationObj = JSON.parse(data);
			i=0;
			if(validationObj !=null && validationObj != ""){
				//$('#checkValidationTable').DataTable();
				//$('#checkValidationTable').dataTable().fnClearTable();
				$.each(validationObj,function(key,value){
					debugger;
					if(key == "checkBounds"){
						var html="<td><input type='checkbox' name='selectedValidationCheck' id='selectedValidationCheck_"+i+"'></td>"+
						/* "<td><label id='selectedValidation_"+i+"' class='control-label'>"+value+"</label>&nbsp<span class='text-muted' data-animation='true' data-toggle='tooltip' data-placement='top' title='(*check min and max value only numeric)'><i class='fa fa-question-circle-o' aria-hidden='true'></i></span></td>"+ */
						"<td><label id='selectedValidation_"+i+"' class='control-label'>"+value+"</label>&nbsp<span class='text-muted custom-tooltip' data-animation='true' data-toggle='tooltip' data-placement='top'><i class='fa fa-question-circle-o' aria-hidden='true'><span class='tooltiptext'>*Enter min or max value. only numeric values are allowed.(CheckBounds will validate minimum or maximum length of given value.)</span></i></span></td>"+
						"<td><input type='text' class='mr-2' placeholder='Min' id='selectedMinExpression_"+i+"' onkeypress='return isNumberKey(event)'><input type='text' placeholder='Max' id='selectedMaxExpression_"+i+"' onkeypress='return isNumberKey(event)'></td>";
						
						var contactMappingData = "<tr>"+html+"</tr>";
						$('#checkValidationTable').find('tbody').append(contactMappingData);
						
						//i++;
					}else{
						var placeholderValue ="";
						var toolTipValue = "";
						if(key == "checkPrefix"){
							placeholderValue = "Prefix";
							toolTipValue = "*Enter prefix for any word.(CheckPrefix will validate the given prefix is available or not.)";
						}
						if(key == "mandatoryForCountry"){
							placeholderValue = "Country";
							toolTipValue = "*Enter comma seprated country values.(eg. US,AU)(mandatoryForCountry validates lookup is mandatory for only specified country.)";
						}
						if(key == "isValidTimestampFormat"){
							placeholderValue = "timestamp format.(eg. MM/dd/yyyy HH:mm:ss)";
							toolTipValue = "*Enter timestamp format.(eg. MM/dd/yyyy HH:mm:ss).(timestamp format validates date to given format.MM(month-of-year),dd(day-of-month),yyyy(year-of-era),HH(hour-of-day),mm(minute-of-hour),ss(second-of-minute))";
						}
						if(key == "validateSpecialCharacters") {
							placeholderValue = 'special character';
							toolTipValue = "*Enter special character for validate like &,* etc.(special character validates the fields with given special characters.)";
						}
						if(key == "mandatoryIf") {
							placeholderValue = 'Expression (eg. [{"Key1":"Values1 comma separated","Key2":"Values2 comma separated"}])';
							toolTipValue = '*Enter expression (eg. [{"Key1":"Values1 comma separated","Key2":"Values2 comma separated"}]).(mandatoryIf makes the field mandatory for the given key value.eg.([{"country":"United States,Australia"}]))';
						}
						/* if(key == "checkValueWithoutlookup") {
							placeholderValue = 'Expression (eg. [{"Key1":"Value1"},{"Key2":"Value2"}])';
							toolTipValue = '*Enter expression (eg. [{"Key1":"Value1"},{"Key2":"Value2"}]).(check value without lookup validate the given value without uploading the lookup.eg.([{"country":"United States,Australia","country_lead":"anth"}]))';
						} */
						/* if(key == "checkOthersClientLookup") {
							placeholderValue = 'Expression (eg. [{"Key1":"parent--child lookup","Key2":"parent--child lookup"}])';
						} */
						var html="";
						if(key == "validateAlphaCharacters" || key == "validateAlphaNumeric" || key == "validateEmail" || key == "validateNumeric" || key == "validatePhoneNumber") {
							if(key == "validateAlphaCharacters"){
								toolTipValue = "*validates only character should be present.";
							}else if(key == "validateAlphaNumeric"){
								toolTipValue = "*validates character and  numeric value should be present.";
							}else if(key == "validateEmail"){
								toolTipValue = "*validates given email is in proper email format.";
							}else if(key == "validateNumeric"){
								toolTipValue = "*validates only numeric value should be present.";
							}else if(key == "validatePhoneNumber"){
								toolTipValue = "*check phone number should be in proper format";
							}
							
							html="<td><input type='checkbox' name='selectedValidationCheck' id='selectedValidationCheck_"+i+"'></td>"+
							"<td><label id='selectedValidation_"+i+"' class='control-label'>"+value+"</label>&nbsp<span class='text-muted custom-tooltip' data-animation='true' data-toggle='tooltip' data-placement='top'><i class='fa fa-question-circle-o' aria-hidden='true'><span class='tooltiptext'>"+toolTipValue+"</span></i></span></td>"+
							"<td></td>";
						}else{
							html="<td><input type='checkbox' name='selectedValidationCheck' id='selectedValidationCheck_"+i+"'></td>"+
							"<td><label id='selectedValidation_"+i+"' class='control-label'>"+value+"</label>&nbsp<span class='text-muted custom-tooltip' data-animation='true' data-toggle='tooltip' data-placement='top'><i class='fa fa-question-circle-o' aria-hidden='true'><span class='tooltiptext'>"+toolTipValue+"</span></i></span></td>"+
							"<td><input type='text' placeholder='Enter "+placeholderValue+"' id='selectedExpression_"+i+"' title='Enter "+placeholderValue+"'></td>";
						}
						
						var contactMappingData = "<tr>"+html+"</tr>";
						$('#checkValidationTable').find('tbody').append(contactMappingData);
						//i++;
					}
					debugger;
					var validationFieldsArr = validationJsonArray;
					if(validationFieldsArr !=null && validationFieldsArr != "" && validationFieldsArr.length > 0){
						for(var a=0;a<=validationFieldsArr.length;a++){
							if(validationFieldsArr[a] != null && validationFieldsArr[a] != "" && validationFieldsArr[a] !="undefined"){
								if(Object.keys(validationFieldsArr[a]) != null && Object.keys(validationFieldsArr[a]) !="" && Object.keys(validationFieldsArr[a]) !="undefined"){
									var msorKey = Object.keys(validationFieldsArr[a]);
									
									if($("#hiddenMsorValue").val() == msorKey){
										var valueArr = Object.values(validationFieldsArr[a]);
										 if(valueArr != null && valueArr != "" && valueArr !="undefined" && valueArr.length > 0){
											 for(var b=0;b<=valueArr.length;b++){
												if(valueArr[b] != null && valueArr[b] != "" && valueArr[b] !="undefined"){
													Object.keys(valueArr[b]).forEach(function(mappingKey) {
														
														if(mappingKey == value){
															$("#selectedValidationCheck_"+i).prop('checked', true);
															
															var mappingValue = valueArr[b][mappingKey];
															if(mappingValue != null && mappingValue != "" && mappingValue !="undefined"){
																if(mappingKey == "checkBounds"){
																	Object.keys(mappingValue).forEach(function(checkBoundsKey) {
																		if(checkBoundsKey == "min"){
																			$("#selectedMinExpression_"+b).val(mappingValue[checkBoundsKey]);
																		}else{
																			$("#selectedMaxExpression_"+b).val(mappingValue[checkBoundsKey]);
																		}
																	});
																}
																/* else if(mappingKey == "mandatoryIf" || mappingKey == "checkValueWithoutlookup" || mappingKey == "checkOthersClientLookup") {
																	$("#selectedExpression_"+i).val(JSON.stringify(mappingValue));
																	$("#selectedExpression_"+i).attr("title",JSON.stringify(mappingValue));
																} */
																else if(mappingKey == "mandatoryIf" || mappingKey == "checkOthersClientLookup") {
																	$("#selectedExpression_"+i).val(JSON.stringify(mappingValue));
																	$("#selectedExpression_"+i).attr("title",JSON.stringify(mappingValue));
																}
																else{
																	//alert("mappingValue::"+mappingValue);
																	$("#selectedExpression_"+i).val(mappingValue);
																}
															}
														}
													});
												}
											}
										}
									}
								}
							}
						}
					}
					i++;
					
				});
				
				
				
			}
				//validationProbabilityMap.set(key,value);
		}
		$('#validationSpin').hide();
			//$("#validationMultiSelect").html(html);
			//$("#validationMultiSelectParent").show().css("width", "100%");
			//$('#validationSpin').hide();
			//arrow=true;
	}

	function fetchCSVDetails() {
		debugger;
		var json = {};
		var clientSpecificValidation = clientSpecificValidations.split(",");
		if(clientSpecificValidation != null && clientSpecificValidation != "") {
			for(var i=0; i<clientSpecificValidation.length; i++) {
				//response = response + "<option value='"+clientSpecificValidation[i]+"'>"+clientSpecificValidation[i]+"</option>";
				json[clientSpecificValidation[i]] = clientSpecificValidation[i];
			}
			$("#validationhidden").val(JSON.stringify(json));
		}
	}
	
	function closeCSVModel(){
		//$('#checkValidationTable').dataTable().fnClearTable();
		$('#checkValidationTable tbody').empty();
	}
	
	function saveValidation() {
		debugger;
		var validationMatching = true;
		var validationJsonObject = {};
		var finalJson = {};
		var i = 0;
		var setValidationArr=[];
		//validationJsonArray=[];
		var previousValidationJsonArray = [];
		
		document.getElementById("outputFieldChk_"+csfValidationValue).disabled = false;
		if($('input[name="selectedValidationCheck"]:checked').length > 0) {
			debugger;
			if(validationObj !=null && validationObj != ""){
				$.each(validationObj,function(key,value){
					if($("#selectedValidationCheck_"+i).is(':checked')) {
						if(key == "checkBounds"){
							if($("#selectedMinExpression_"+i).val() != null && $("#selectedMinExpression_"+i).val() != "" && $("#selectedMinExpression_"+i).val() != "undefined" 
								|| $("#selectedMaxExpression_"+i).val() != null && $("#selectedMaxExpression_"+i).val() != "" && $("#selectedMaxExpression_"+i).val() != "undefined") {
								debugger;
								var min = Number($("#selectedMinExpression_"+i).val());
								var max = Number($("#selectedMaxExpression_"+i).val());
								
								if(max > min){
									var minMaxExpressionJson = {};
									minMaxExpressionJson["min"] = $("#selectedMinExpression_"+i).val();
									minMaxExpressionJson["max"] = $("#selectedMaxExpression_"+i).val();
								
									validationJsonObject[key] = minMaxExpressionJson;
								}else if(min > 0 && max == 0){
									var minMaxExpressionJson = {};
									minMaxExpressionJson["min"] = $("#selectedMinExpression_"+i).val();
									minMaxExpressionJson["max"] = $("#selectedMaxExpression_"+i).val();
								
									validationJsonObject[key] = minMaxExpressionJson;
								}
								else{
									validationMatching = false;
									$("#csvErrorMsg").html("* min value can not be greater then max value.").show();
									setTimeout(function(){$('#csvErrorMsg').html("");},5000);
									return false;
								}
							}
							else {
								validationMatching = false;
								$("#csvErrorMsg").html("* Kindly enter either min or max or both for checkBounds.").show();
								setTimeout(function(){$('#csvErrorMsg').html("");},5000);
								return false;
							}
						}
						else if(key == "mandatoryIf") {
							var mandatoryIfExpression = $("#selectedExpression_"+i).val();
							if(mandatoryIfExpression != null && mandatoryIfExpression !="" && mandatoryIfExpression !="undefined"){
								if(IsJsonString(mandatoryIfExpression)) {
									validationJsonObject[key] = $("#selectedExpression_"+i).val();
									$("#outputFieldChk_"+csfValidationValue).prop('checked', false);
									document.getElementById("outputFieldChk_"+csfValidationValue).disabled = true;
								}
								else {
									validationMatching = false;
									$("#csvErrorMsg").html("* Value entered in mandatoryIf is not in valid format.").show();
									setTimeout(function(){$('#csvErrorMsg').html("");},5000);
									return false;
								}
							}else {
								validationMatching = false;
								$("#csvErrorMsg").html("* Please enter value in mandatoryIf column.").show();
								setTimeout(function(){$('#csvErrorMsg').html("");},5000);
								return false;
							}
							
						}
						/* else if(key == "checkValueWithoutlookup") {
							debugger;
							var mandatoryIfExpression = $("#selectedExpression_"+i).val();
							if(IsJsonString(mandatoryIfExpression)) {
								validationJsonObject[key] = $("#selectedExpression_"+i).val();
							}
							else {
								validationMatching = false;
								$("#csvErrorMsg").html("* Value entered in checkValueWithoutlookup is not in valid format.").show();
								setTimeout(function(){$('#csvErrorMsg').html("");},5000);
								return false;
							}
						} */
						/* else if(key == "checkOthersClientLookup") {
							var mandatoryIfExpression = $("#selectedExpression_"+i).val();
							if(IsJsonString(mandatoryIfExpression)) {
								validationJsonObject[$("#selectedValidation_"+i).text()] = $("#selectedExpression_"+i).val();
							}
							else {
								validationMatching = false;
								$("#csvErrorMsg").html("* Value entered in checkOthersClientLookup is not in valid format.").show();
								setTimeout(function(){$('#csvErrorMsg').html("");},5000);
								return false;
							}
						} */
						else if(key == "checkPrefix") {
							debugger;
							var checkPrefixValue = $("#selectedExpression_"+i).val();
							if(checkPrefixValue != null && checkPrefixValue != "" && checkPrefixValue !="undefined") {
								validationJsonObject[key] = $("#selectedExpression_"+i).val();
							}
							else {
								validationMatching = false;
								$("#csvErrorMsg").html("* Please enter checkPrefixValue").show();
								setTimeout(function(){$('#csvErrorMsg').html("");},5000);
								return false;
							}
						}
						else if(key == "mandatoryForCountry") {
							debugger;
							var mandatoryForCountryValue = $("#selectedExpression_"+i).val();
							if(mandatoryForCountryValue != null && mandatoryForCountryValue != "" && mandatoryForCountryValue !="undefined") {
								validationJsonObject[key] = $("#selectedExpression_"+i).val();
							}
							else {
								validationMatching = false;
								$("#csvErrorMsg").html("* Please enter mandatoryForCountryValue").show();
								setTimeout(function(){$('#csvErrorMsg').html("");},5000);
								return false;
							}
						}
						else if(key == "isValidTimestampFormat") {
							debugger;
							var isValidTimestampFormatValue = $("#selectedExpression_"+i).val();
							if(isValidTimestampFormatValue != null && isValidTimestampFormatValue != "" && isValidTimestampFormatValue !="undefined") {
								validationJsonObject[key] = $("#selectedExpression_"+i).val();
							}
							else {
								validationMatching = false;
								$("#csvErrorMsg").html("* Please enter isValidTimestampFormatValue").show();
								setTimeout(function(){$('#csvErrorMsg').html("");},5000);
								return false;
							}
						}
						else if(key == "validateSpecialCharacters") {
							debugger;
							var validateSpecialCharacters = $("#selectedExpression_"+i).val();
							if(validateSpecialCharacters != null && validateSpecialCharacters != "" && validateSpecialCharacters !="undefined") {
								validationJsonObject[key] = $("#selectedExpression_"+i).val();
							}
							else {
								validationMatching = false;
								$("#csvErrorMsg").html("* Please enter validateSpecialCharacters").show();
								setTimeout(function(){$('#csvErrorMsg').html("");},5000);
								return false;
							}
						}
						else if(key == "validateAlphaCharacters" || key == "validateAlphaNumeric" || key == "validateEmail" || key == "validateNumeric" || key == "validatePhoneNumber") {
							validationJsonObject[key] = "";
						}
						else {
							validationJsonObject[key] = $("#selectedExpression_"+i).val();
						}
					}
					i++;
				});
				
				debugger;
				if(validationMatching == true) {
					var previousValidationArr = "";
					//alert("validationValue before::"+ JSON.stringify(validationValue));
					if(validationValue != null && validationValue != "" && validationValue != "[]") {
						previousValidationArr = validationValue;
					}
					else {
						previousValidationArr = validationJsonArray;
					}
					if(previousValidationArr !=null && previousValidationArr != "" && previousValidationArr.length > 0){
						//previousValidationArr = JSON.parse(previousValidationArr);
						for(var a=0;a<=previousValidationArr.length;a++){
							if(previousValidationArr[a] != null && previousValidationArr[a] != "" && previousValidationArr[a] !="undefined"){
								if(Object.keys(previousValidationArr[a]) != null && Object.keys(previousValidationArr[a]) !="" && Object.keys(previousValidationArr[a]) !="undefined"){
									var msorKey = Object.keys(previousValidationArr[a]);
									
									/* alert(Object.keys(previousValidationArr[a]));
									alert(JSON.stringify(Object.values(previousValidationArr[a]))); */
									
									if($("#hiddenMsorValue").val() != msorKey){
										setValidationArr.push(previousValidationArr[a]);
										//finalJson[Object.keys(previousValidationArr[a])] = Object.values(previousValidationArr[a]);
									}
								}
							}
						}
						/* alert("setValidationArr::"+JSON.stringify(setValidationArr));
						previousValidationJsonArray.push(setValidationArr); */
					} 
					
					//alert("setValidationArr::"+JSON.stringify(setValidationArr));
					
					if(Object.keys(validationJsonObject).length > 0) {
						debugger;
						if($("#clientSpecificJson").val() !=null && $("#clientSpecificJson").val() !="" && $("#clientSpecificJson").val() !="undefined"){
							if($("#jsonsunmartechnamevalue_"+csfValidationValue).val() != null && $("#jsonsunmartechnamevalue_"+csfValidationValue).val() != "" && 
									$("#jsonsunmartechnamevalue_"+csfValidationValue).val() != "undefined") {
								finalJson[$("#jsonsunmartechnamevalue_"+csfValidationValue).val()] = validationJsonObject;
							}
						}else{
							if($("#msorField_"+csfValidationValue).text() != null && $("#msorField_"+csfValidationValue).text() != "" && 
									$("#msorField_"+csfValidationValue).text() != "undefined" && !isCustomField) {
									
									finalJson[$("#msorField_"+csfValidationValue).text()] = validationJsonObject;
								}
								if($("#sunmartechcustomfield_"+csfValidationValue).val() != null && $("#sunmartechcustomfield_"+csfValidationValue).val() != "" && 
									$("#sunmartechcustomfield_"+csfValidationValue).val() != "undefined" && isCustomField && !isCustomFieldForMyFreshWorks) {
									
									finalJson[$("#sunmartechcustomfield_"+csfValidationValue).val()] = validationJsonObject;
								}
								if($("#sunmartechcustomfieldformyfreshworks_"+csfValidationValue).val() != null && $("#sunmartechcustomfieldformyfreshworks_"+csfValidationValue).val() != "" && 
										$("#sunmartechcustomfieldformyfreshworks_"+csfValidationValue).val() != "undefined" && isCustomField && isCustomFieldForMyFreshWorks) {
										
										finalJson[$("#sunmartechcustomfieldformyfreshworks_"+csfValidationValue).val()] = validationJsonObject;
								}
						}
						debugger;
						if(Object.keys(finalJson).length > 0) {
							if(validationJsonArray != null && validationJsonArray !="" && validationJsonArray !="undefined"){
								validationJsonArray.push(finalJson);
							}else{
								validationJsonArray = [];
								validationJsonArray.push(finalJson);
							}
							
							previousValidationJsonArray.push(finalJson);
							
							previousValidationJsonArray = $.merge(setValidationArr,previousValidationJsonArray);
						}
					}
					if(validationJsonArray.length > 0){
						//alert("validationJsonArray:"+JSON.stringify(validationJsonArray));
						//alert("previousValidationJsonArray:"+JSON.stringify(previousValidationJsonArray));
						//validationValue = JSON.stringify(previousValidationJsonArray);
						validationValue = previousValidationJsonArray;
						validationJsonArray = validationValue;
					}
					
					$('#contMapCsfModal').modal('hide');
					$('#checkValidationTable tbody').empty();
				}
				//closeCSVModel();
			}
		}
		else {
			/* validationMatching = false;
			$("#csvErrorMsg").html("* Kindly select atleast one function.").show();
			setTimeout(function(){$('#csvErrorMsg').html("");},5000);
			return false; */
			debugger;
			if(validationMatching == true) {
				var previousValidationArr = "";
				//alert("validationValue before::"+ JSON.stringify(validationValue));
				if(validationValue != null && validationValue != "" && validationValue != "[]") {
					previousValidationArr = validationValue;
				}
				else {
					previousValidationArr = validationJsonArray;
				}
				if(previousValidationArr !=null && previousValidationArr != "" && previousValidationArr.length > 0){
					//previousValidationArr = JSON.parse(previousValidationArr);
					for(var a=0;a<=previousValidationArr.length;a++){
						if(previousValidationArr[a] != null && previousValidationArr[a] != "" && previousValidationArr[a] !="undefined"){
							if(Object.keys(previousValidationArr[a]) != null && Object.keys(previousValidationArr[a]) !="" && Object.keys(previousValidationArr[a]) !="undefined"){
								var msorKey = Object.keys(previousValidationArr[a]);
								
								/* alert(Object.keys(previousValidationArr[a]));
								alert(JSON.stringify(Object.values(previousValidationArr[a]))); */
								
								if($("#hiddenMsorValue").val() != msorKey){
									setValidationArr.push(previousValidationArr[a]);
									//finalJson[Object.keys(previousValidationArr[a])] = Object.values(previousValidationArr[a]);
								}
							}
						}
					}
					/* alert("setValidationArr::"+JSON.stringify(setValidationArr));
					previousValidationJsonArray.push(setValidationArr); */
				} 
				
				//alert("setValidationArr::"+JSON.stringify(setValidationArr));
				
				if(validationValue != null && validationValue != "" && validationValue != "[]") {
					validationValue = setValidationArr;
					validationJsonArray = validationValue;
				}else{
					validationValue = setValidationArr;
					validationValue = [];
				}
				
				$('#contMapCsfModal').modal('hide');
				$('#checkValidationTable tbody').empty();
			}
		}
	}
	
	function confirmDiscardIntegration(index){
		indexForDiscard = index;
		$('#confirmOverlay').show();
		$.confirm({
			'message'	: 'Are you sure you want to discard the datapass?',
			'buttons'	: {
				'<span class="fa fa-check fa-2x" aria-hidden="true"></span> Yes'	: {
					'class'	: 'yes',
					'action': function(){
						closeConfirmation();
						discardIntegration();
					}
				},
				'<span class="fa fa-times fa-2x" aria-hidden="true"></span>  No'	: {
					'class'	: 'no',
					'action': function(){
						closeConfirmation();
					}	// Nothing to do in this case. You can as well omit the action property.
				}
			}
		});
	}
	
	function closeConfirmation(){
		$('#confirmOverlay').hide();
	}
	
	function discardIntegration(){
		$("#updateInterationLoader").show();
		var integrationId = recArr[indexForDiscard].integrationId;
	  	
		$.ajax({
			url:'discardIntegration.do?integrationId='+integrationId+"&username="+loginUserName+"&isDeactivate="+'Y',
			success: function(data, textStatus, xhr)
			{
				$("#updateInterationLoader").hide();
				$("#updateIntegrationSuccessMsg").html("*Datapass deactivated successfully").show();
				setTimeout(function(){
					$('#updateIntegrationSuccessMsg').html("");
					fetchIntegrationDetailsCount();
					fetchIntegrationDetails();
				},3000);
			},
				error: function(xhr, textStatus, errorThrow){
				$("#updateInterationLoader").hide();
				$("#updateIntegrationErrorMsg").html("* error occured while deactivated the data. kindly check with development team.").show();
				setTimeout(function(){
					$('#updateIntegrationErrorMsg').html("");
				},3000);
			}
		});
	}
	
	function activateIntegration(indexForActivate){
		$("#updateInterationLoader").show();
		var integrationId = recArr[indexForActivate].integrationId;
	  	
		$.ajax({
			url:'discardIntegration.do?integrationId='+integrationId+"&username="+loginUserName+"&isDeactivate="+'N',
			success: function(data, textStatus, xhr)
			{
				$("#updateInterationLoader").hide();
				$("#updateIntegrationSuccessMsg").html("*Datapass activated successfully").show();
				setTimeout(function(){
					$('#updateIntegrationSuccessMsg').html("");
					fetchIntegrationDetailsCount();
					fetchIntegrationDetails();
				},3000);
			},
				error: function(xhr, textStatus, errorThrow){
				$("#updateInterationLoader").hide();
				$("#updateIntegrationErrorMsg").html("* error occured while activated the data. kindly check with development team.").show();
				setTimeout(function(){
					$('#updateIntegrationErrorMsg').html("");
				},3000);
			}
		});
	}
	
	function exportHeader(index){
		$("#updateInterationLoader").show();
		var integrationId = recArr[index].integrationId;
		
		if(integrationId != null && integrationId != "" && integrationId > 0){
			document.location.href ='downloadIntegrationHeader.do?integrationId='+integrationId;
			$("#updateInterationLoader").hide();
			$("#updateIntegrationSuccessMsg").html("*export header file downloaded successfully").show();
			setTimeout(function(){
				$('#updateIntegrationSuccessMsg').html("");
			},2000);
		}else{
			$("#updateInterationLoader").hide();
			$("#updateIntegrationErrorMsg").html("* error occured while export header. kindly check with development team.").show();
			setTimeout(function(){
				$('#updateIntegrationErrorMsg').html("");
			},3000);
		}
	}
	
	function closeSendTestLeadModel(){
		$('#sendTestLeadDiv').html('');	
	}
	
	function callSendTestLead(index){
		$('#sendTestLeadDiv').html('');
		$('#addsendTestLead').trigger("reset");
		$('#sendtestlead').modal('show');
		addRowToSendTestLeadData(index);
		//prefillSendTestLeadData(index);
		document.getElementById('saveTestLeadBtn').disabled = false;
		document.getElementById('submitTestLeadBtn').disabled = false;
	}
		  
	function addRowToSendTestLeadData(index){
			  debugger;
			  lookupValues="";
			  sendTestLeadIndexValue=index;
			  var integrationName = recArr[index].integrationDetailList.integrationname;
			  var deportFields = recArr[index].integrationDetailList.deportfields;
			  var staticFieldsArr = recArr[index].staticFields;
			  var lookupFields = recArr[index].integrationDetailList.lookupfields;
			  if(lookupFields != null && lookupFields !="" && lookupFields !="undefined"){
				  $(lookupFields).each(function (index, item) {
						debugger;
			            var exactMatch = item.exact_match;
			            var phraseMatch = item.phrase_match;
			            if(exactMatch != null && exactMatch != "" && exactMatch !="undefined"){
			            	lookupValues = lookupValues + exactMatch;
			            }
			            if(phraseMatch != null && phraseMatch != "" && phraseMatch !="undefined"){
			            	if(lookupValues != null && lookupValues != "" && lookupValues !="undefined"){
			            		lookupValues = lookupValues +","+ phraseMatch;
			            	}else{
			            		lookupValues = lookupValues + phraseMatch;
			            	}
			            }
			       });
			  }else{
				  lookupValues = '';
			  }
			  if(integrationName != null && integrationName != "" && integrationName !="undefined"){
				  var $addNew = $("<div class='form-group'><div class='row'><label for='integrationName' class='col-md-5 control-label'>Datapass Name</label><div class='col-md-7'><input type='text' name='firstName' id='firstName' value= '"+integrationName+"' disabled class='form-control'></div></div></div>");
					$("#sendTestLeadDiv").append($addNew);
			  }
			  
			  if(deportFields != null && deportFields != "" && deportFields !="undefined"){
				  var deportFieldsArr = deportFields.split(',');
					 for(var i=0;i<deportFieldsArr.length;i++){
						 if(deportFieldsArr[i] !="integration_name"){
							 if(lookupValues != null && lookupValues != '' && lookupValues != 'undefined' ){
								 var lookupValuesArr = lookupValues.split(',');
								 var match = lookupValuesArr.some(function(el) {
									    return el === deportFieldsArr[i];
								 });
								 if(match){
									 var $addNew = $("<div class='form-group'><div class='row'><label for='"+deportFieldsArr[i]+"' class='col-md-5 control-label'>"+deportFieldsArr[i]+"</label><div class='col-md-7'><select name='"+deportFieldsArr[i]+"' id='"+deportFieldsArr[i]+"' class='form-control'></select></div></div></div>");
									 $("#sendTestLeadDiv").append($addNew);
								 }else{
									 var $addNew = $("<div class='form-group'><div class='row'><label for='"+deportFieldsArr[i]+"' class='col-md-5 control-label'>"+deportFieldsArr[i]+"</label><div class='col-md-7'><input type='text' name='"+deportFieldsArr[i]+"' id='"+deportFieldsArr[i]+"' class='form-control'placeholder='Enter "+deportFieldsArr[i]+"'></div></div></div>");
									 $("#sendTestLeadDiv").append($addNew);
								 }
							 }else{
								 var $addNew = $("<div class='form-group'><div class='row'><label for='"+deportFieldsArr[i]+"' class='col-md-5 control-label'>"+deportFieldsArr[i]+"</label><div class='col-md-7'><input type='text' name='"+deportFieldsArr[i]+"' id='"+deportFieldsArr[i]+"' class='form-control'placeholder='Enter "+deportFieldsArr[i]+"'></div></div></div>");
								 $("#sendTestLeadDiv").append($addNew);
							 }
						 }
					 }
			  }
			  if(staticFieldsArr != null && staticFieldsArr != "" && staticFieldsArr.length > 0){
					for(var a=0;a<=staticFieldsArr.length;a++){
						if(staticFieldsArr[a] != null && staticFieldsArr[a] != "" && staticFieldsArr[a] !="undefined"){
							if(Object.keys(staticFieldsArr[a]) != null && Object.keys(staticFieldsArr[a]) !="" && Object.keys(staticFieldsArr[a]) !="undefined"){
								debugger;
								var $addNew = $("<div class='form-group'><div class='row'><label for='"+Object.keys(staticFieldsArr[a])+"' class='col-md-5 control-label'>"+Object.keys(staticFieldsArr[a])+"</label><div class='col-md-7'><input type='text' name='"+Object.keys(staticFieldsArr[a])+"' id='"+Object.keys(staticFieldsArr[a])+"' value= "+Object.values(staticFieldsArr[a])+" disabled class='form-control'></div></div></div>");
								 $("#sendTestLeadDiv").append($addNew);
							}
						}
					}
			 }
			 
			 if(recArr[sendTestLeadIndexValue].integrationDetailList.mandatoryfields !=null && recArr[sendTestLeadIndexValue].integrationDetailList.mandatoryfields !="" && recArr[sendTestLeadIndexValue].integrationDetailList.mandatoryfields !="undefined"){
				 var mendatoryFields = recArr[sendTestLeadIndexValue].integrationDetailList.mandatoryfields;
				 var mendatoryFieldsArr = mendatoryFields.split(',');
				 for(var i=0;i<mendatoryFieldsArr.length;i++){
					 if(mendatoryFieldsArr[i] != null && mendatoryFieldsArr[i] !="" && mendatoryFieldsArr[i] !="undefined"){
						 $('#'+mendatoryFieldsArr[i]).css('border-color','#cf1133');
					 }
					
				 }
			 }
    }
	
	function callSendTestLeadData(){
		debugger;
		if(recArr[sendTestLeadIndexValue].integrationDetailList.mandatoryfields !=null && recArr[sendTestLeadIndexValue].integrationDetailList.mandatoryfields !="" && recArr[sendTestLeadIndexValue].integrationDetailList.mandatoryfields !="undefined"){
			 var mendatoryFields = recArr[sendTestLeadIndexValue].integrationDetailList.mandatoryfields;
			 var mendatoryFieldsArr = mendatoryFields.split(',');
			 for(var i=0;i<mendatoryFieldsArr.length;i++){
				 if(mendatoryFieldsArr[i] != null && mendatoryFieldsArr[i] !="" && mendatoryFieldsArr[i] !="undefined"){
					 if($("#"+mendatoryFieldsArr[i]).val() != null && $("#"+mendatoryFieldsArr[i]).val() !="" && $("#"+mendatoryFieldsArr[i]).val() !="undefined"){
						// alert("value not null"); 
					 }else{
						 $("#sendTestLeadErrorMsg").html("* Kindly provide "+mendatoryFieldsArr[i]+"").show();
							setTimeout(function(){$('#sendTestLeadErrorMsg').html("");},3000);
							return false;
					 }
				 }
			 }
		}
		$("#sendTestLeadLoader").show();
		document.getElementById('saveTestLeadBtn').disabled = true;
		document.getElementById('submitTestLeadBtn').disabled = true;
		var integrationId = recArr[sendTestLeadIndexValue].integrationId;
		var integrationName = recArr[sendTestLeadIndexValue].integrationDetailList.integrationname;
		$.ajax({
			url: 'sendTestLead.do?integrationId='+integrationId+"&username="+loginUserName+"&integrationName="+integrationName,
			type: "POST",
			data: $("#addsendTestLead").serialize(),
			success: function(data)
			{
				if(data == "success"){
					$("#sendTestLeadLoader").hide();
					$("#sendTestLeadSuccessMsg").html("*Test lead inserted successfully").show();
					setTimeout(function(){
						$('#sendTestLeadSuccessMsg').html("");
						$('#sendtestlead').modal('hide');
						fetchIntegrationDetails();
					},3000);
				}else{
					$("#sendTestLeadLoader").hide();
					$("#sendTestLeadErrorMsg").html("* error occured while inserting the test lead..").show();
					setTimeout(function(){
						$('#sendTestLeadErrorMsg').html("");
						document.getElementById('saveTestLeadBtn').disabled = false;
						document.getElementById('submitTestLeadBtn').disabled = false;
					},3000);
				}
			}
		});
	}
	
	function resetSendTestLeadData(){
		$('#addsendTestLead').trigger("reset");
	}

	function IsJsonString(str) {
	    try {
	        JSON.parse(str);
	    } catch (e) {
	        return false;
	    }
	    return true;
	}
	
	function deployIntegration(index){
		$("#updateInterationLoader").show();
		document.getElementById("deploy_"+index).disabled = true;
		var integrationId = recArr[index].integrationId;
	  	
		$.ajax({
			url:'deployIntegration.do?integrationId='+integrationId+"&username="+loginUserName,
			success: function(data, textStatus, xhr)
			{
				$("#updateInterationLoader").hide();
				$("#updateIntegrationSuccessMsg").html("*Datapass deployed successfully").show();
				setTimeout(function(){
					$('#updateIntegrationSuccessMsg').html("");
					fetchIntegrationDetails();
				},3000);
			},
				error: function(xhr, textStatus, errorThrow){
				$("#updateInterationLoader").hide();
				$("#updateIntegrationErrorMsg").html("* error occured in deploy datapass. kindly check with development team.").show();
				setTimeout(function(){
					$('#updateIntegrationErrorMsg').html("");
				},3000);
			}
		});
	}
	function cloneIntegration(index){
		openIntegrationModel(index);
		showHideButton = true;
		$("#integrationName").val("");
		$('#updateIntegrationBtn').hide();
		//$('#completeIntegrationBtn').show();
	}
	
	function completeIntegration(){
		disableDatapassButton();
		var ssFieldJsonArray = [];
		var ssFieldJsonObject = {json:{}};
		var mandatoryFieldsArray = [];
		var deportFieldsArray = [];
		var ssFieldsValues='';
		var mandatoryFieldsValue='';
		var deportFieldsValue='';
		var staticFieldsValues='';
		var staticFieldJsonObject = {};
		var staticFieldJsonArray = [];
		var ssFieldJsonArrayForMyFreshWorks = [];
		var ssFieldJsonObjectForMyFreshWorks = {json:{}};
		var ssFieldsValuesForMyFreshWorks='';
		var headerFieldJsonObject = {};
		var headerFieldJsonArray = [];
		var headerFieldsValues='';
		
		/* if($("#clientName").val() == ""){
			$("#addNewIntegrationErrorMsg").html("* Kindly provide client name").show();
			setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");},4000);
			return false;
		} */
		if($("#integrationName").val() == ""){
			$("#addNewIntegrationErrorMsg").html("* Kindly provide datapass name").show();
			setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
			return false;
		}
		if($("#integrationType").val() == ""){
			$("#addNewIntegrationErrorMsg").html("* Kindly provide datapass type").show();
			setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
			return false;
		}else{
			if($("#integrationType").val() != "sftp_client"){
				if($("#endpointUrlOutput").val() == ""){
					$("#addNewIntegrationErrorMsg").html("* Kindly provide endpoint url").show();
					setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
					return false;
				}
				if($('#endpointUrlOutput').val().indexOf("myfreshworks.com") != -1){
					if($("#apikey").val() == ""){
						$("#addNewIntegrationErrorMsg").html("* Kindly provide api key").show();
						setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
						return false;
					}
				}
			}
			/* if($("#postProcessType").val() == ""){
				$("#addNewIntegrationErrorMsg").html("* Kindly provide post process type").show();
				setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");},4000);
				return false;
			} */
			if($("#integrationType").val() == "SOAP_client" || $("#integrationType").val() == "soap_client"){
				if($("#usernameOutput").val() == ""){
					$("#addNewIntegrationErrorMsg").html("* Kindly provide username").show();
					setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
					return false;
				}
				if($("#passwordOutput").val() == ""){
					$("#addNewIntegrationErrorMsg").html("* Kindly provide password").show();
					setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
					return false;
				}
			}
			/* if($("#integrationType").val() == "REST_client" || $("#integrationType").val() == "rest_client"){
				if($("#restIdentityUrl").val() == ""){
					$("#addNewIntegrationErrorMsg").html("* Kindly provide rest identity url").show();
					setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");},4000);
					return false;
				}
			} */
			
			if($("#integrationType").val() == "SFTP_client" || $("#integrationType").val() == "sftp_client"){
				if($("#sftphost").val() == ""){
					$("#addNewIntegrationErrorMsg").html("* Kindly provide host name").show();
					setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
					return false;
				}
				if($("#sftpport").val() == ""){
					$("#addNewIntegrationErrorMsg").html("* Kindly provide port name").show();
					setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
					return false;
				}
				if($("#sftpuser").val() == ""){
					$("#addNewIntegrationErrorMsg").html("* Kindly provide username").show();
					setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
					return false;
				}
				if($("#sftppass").val() == ""){
					$("#addNewIntegrationErrorMsg").html("* Kindly provide password").show();
					setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
					return false;
				}
				if($("#sftpworkingdir").val() == ""){
					$("#addNewIntegrationErrorMsg").html("* Kindly provide directory").show();
					setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
					return false;
				}
			}
			if($("#integrationType").val() == "REST_client" || $("#integrationType").val() == "rest_client" || $("#integrationType").val() == "mkto_bulk_import"){
				if($("#restIdentityUrl").val()!= null && $("#restIdentityUrl").val()!= "" && $("#restIdentityUrl").val()!= "undefined" ){
						if($("#clientId").val() == ""){
							$("#addNewIntegrationErrorMsg").html("* Kindly provide client id.").show();
							setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
							return false;
						}
						if($("#clientSecret").val() == ""){
							$("#addNewIntegrationErrorMsg").html("* Kindly provide client secret.").show();
							setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
							return false;
						}
				}
			}
		}
		if($("#advanceLookup").val() != null && $("#advanceLookup").val() !="" && $("#advanceLookup").val() !="[]"){
			if(!IsJsonString($("#advanceLookup").val())) {
				$("#addNewIntegrationErrorMsg").html("* Value entered in advance lookup is not in valid format.").show();
				setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
				return false;
			}
		}
		if($("#clientSpecificJson").val() != null && $("#clientSpecificJson").val() !="" && $("#clientSpecificJson").val() !="[]"){
			if(!IsJsonString($("#clientSpecificJson").val())) {
				$("#addNewIntegrationErrorMsg").html("* Client specific json is not in valid format.").show();
				setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
				return false;
			}
		}
		if(sunmartechMandatoryFieldLength > 0  && ($("#clientSpecificJson").val() == null || $("#clientSpecificJson").val() == "")) {
			for(var i=0; i<sunmartechMandatoryFieldLength; i++) {
				if(($("#msorField_"+i).text() != null && $("#msorField_"+i).text() != "" && $("#msorField_"+i).text() != "undefined") &&  
					($("#outputField_"+i).val() != null && $("#outputField_"+i).val() != "" && $("#outputField_"+i).val() != "undefined" && $("#outputField_"+i).val() != "N/A")) {
					
					ssFieldJsonObject.json[$("#msorField_"+i).text()] = $("#outputField_"+i).val();
					
					if($("#outputFieldChk_"+i).is(':checked')) {
						mandatoryFieldsArray.push($("#msorField_"+i).text()); 
					}
					
					deportFieldsArray.push($("#msorField_"+i).text());
				}
				
				if($("#sunmartechcustomfield_"+i).val() != null && $("#sunmartechcustomfield_"+i).val() != "" && $("#sunmartechcustomfield_"+i).val() != "undefined") {
					ssFieldJsonObject.json[$("#sunmartechcustomfield_"+i).val()] = $("#apicustomfield_"+i).val();
					if($("#apicustomfield_"+i).val() != null && $("#apicustomfield_"+i).val() != "" && $("#apicustomfield_"+i).val() != "undefined"){
						if($("#chkboxcustomfield_"+i).is(':checked')) {
							mandatoryFieldsArray.push($("#sunmartechcustomfield_"+i).val()); 
						}
					}
					deportFieldsArray.push($("#sunmartechcustomfield_"+i).val());
				}
				
				if(($("#sunmartechcustomfieldformyfreshworks_"+i).val() != null && $("#sunmartechcustomfieldformyfreshworks_"+i).val() != "" && $("#sunmartechcustomfieldformyfreshworks_"+i).val() != "undefined") &&  
						($("#apicustomfieldformyfreshworks_"+i).val() != null && $("#apicustomfieldformyfreshworks_"+i).val() != "" && $("#apicustomfieldformyfreshworks_"+i).val() != "undefined")) {
							
						ssFieldJsonObjectForMyFreshWorks.json[$("#sunmartechcustomfieldformyfreshworks_"+i).val()] = $("#apicustomfieldformyfreshworks_"+i).val();
							
						if($("#chkboxcustomfieldformyfreshworks_"+i).is(':checked')) {
							mandatoryFieldsArray.push($("#sunmartechcustomfieldformyfreshworks_"+i).val()); 
						}
						deportFieldsArray.push($("#sunmartechcustomfieldformyfreshworks_"+i).val());
				}
				if(($("#apistaticfieldname_"+i).val() != null && $("#apistaticfieldname_"+i).val() != "" && $("#apistaticfieldname_"+i).val() != "undefined") &&  
						($("#apistaticfieldvalue_"+i).val() != null && $("#apistaticfieldvalue_"+i).val() != "" && $("#apistaticfieldvalue_"+i).val() != "undefined")) {
							
						staticFieldJsonObject[$("#apistaticfieldname_"+i).val()] = $("#apistaticfieldvalue_"+i).val();
				}
				
				if($("#headername_"+i).val() != null && $("#headername_"+i).val() != "" && $("#headername_"+i).val() != "undefined") {
					
					if($("#headernamevalue_"+i).val() != null && $("#headernamevalue_"+i).val() != "" && $("#headernamevalue_"+i).val() != "undefined"){
						headerFieldJsonObject[$("#headername_"+i).val()] = $("#headernamevalue_"+i).val();
					}
					
					if(($("#autharazationusername_"+i).val() != null && $("#autharazationusername_"+i).val() != "" && $("#autharazationusername_"+i).val() != "undefined") &&  
							($("#autharazationpassword_"+i).val() != null && $("#autharazationpassword_"+i).val() != "" && $("#autharazationpassword_"+i).val() != "undefined")) {
						headerFieldJsonObject[$("#headername_"+i).val()] = $("#autharazationusername_"+i).val() + ":" + $("#autharazationpassword_"+i).val();
					}
				}
				
			}
		}else if(sunmartechMandatoryFieldLength > 0 && ($("#clientSpecificJson").val() != null || $("#clientSpecificJson").val() != "") && ($("#integrationType").val() == "sftp_client" || $("#integrationType").val() == "mkto_bulk_import")) {
			$("#clientSpecificJson").val("");
			for(var i=0; i<sunmartechMandatoryFieldLength; i++) {
				if(($("#msorField_"+i).text() != null && $("#msorField_"+i).text() != "" && $("#msorField_"+i).text() != "undefined") &&  
					($("#outputField_"+i).val() != null && $("#outputField_"+i).val() != "" && $("#outputField_"+i).val() != "undefined" && $("#outputField_"+i).val() != "N/A")) {
					
					ssFieldJsonObject.json[$("#msorField_"+i).text()] = $("#outputField_"+i).val();
					
					if($("#outputFieldChk_"+i).is(':checked')) {
						mandatoryFieldsArray.push($("#msorField_"+i).text()); 
					}
				
					deportFieldsArray.push($("#msorField_"+i).text());
				}
				
				if($("#sunmartechcustomfield_"+i).val() != null && $("#sunmartechcustomfield_"+i).val() != "" && $("#sunmartechcustomfield_"+i).val() != "undefined") {
					ssFieldJsonObject.json[$("#sunmartechcustomfield_"+i).val()] = $("#apicustomfield_"+i).val();
					if($("#apicustomfield_"+i).val() != null && $("#apicustomfield_"+i).val() != "" && $("#apicustomfield_"+i).val() != "undefined"){
						if($("#chkboxcustomfield_"+i).is(':checked')) {
							mandatoryFieldsArray.push($("#sunmartechcustomfield_"+i).val()); 
						}
					}
					deportFieldsArray.push($("#sunmartechcustomfield_"+i).val());
				}
				
				if(($("#sunmartechcustomfieldformyfreshworks_"+i).val() != null && $("#sunmartechcustomfieldformyfreshworks_"+i).val() != "" && $("#sunmartechcustomfieldformyfreshworks_"+i).val() != "undefined") &&  
						($("#apicustomfieldformyfreshworks_"+i).val() != null && $("#apicustomfieldformyfreshworks_"+i).val() != "" && $("#apicustomfieldformyfreshworks_"+i).val() != "undefined")) {
							
						ssFieldJsonObjectForMyFreshWorks.json[$("#sunmartechcustomfieldformyfreshworks_"+i).val()] = $("#apicustomfieldformyfreshworks_"+i).val();
							
						if($("#chkboxcustomfieldformyfreshworks_"+i).is(':checked')) {
							mandatoryFieldsArray.push($("#sunmartechcustomfieldformyfreshworks_"+i).val()); 
						}
						deportFieldsArray.push($("#sunmartechcustomfieldformyfreshworks_"+i).val());
				}
				if(($("#apistaticfieldname_"+i).val() != null && $("#apistaticfieldname_"+i).val() != "" && $("#apistaticfieldname_"+i).val() != "undefined") &&  
						($("#apistaticfieldvalue_"+i).val() != null && $("#apistaticfieldvalue_"+i).val() != "" && $("#apistaticfieldvalue_"+i).val() != "undefined")) {
							
						staticFieldJsonObject[$("#apistaticfieldname_"+i).val()] = $("#apistaticfieldvalue_"+i).val();
				}
				
				if($("#headername_"+i).val() != null && $("#headername_"+i).val() != "" && $("#headername_"+i).val() != "undefined") {
					
					if($("#headernamevalue_"+i).val() != null && $("#headernamevalue_"+i).val() != "" && $("#headernamevalue_"+i).val() != "undefined"){
						headerFieldJsonObject[$("#headername_"+i).val()] = $("#headernamevalue_"+i).val();
					}
					
					if(($("#autharazationusername_"+i).val() != null && $("#autharazationusername_"+i).val() != "" && $("#autharazationusername_"+i).val() != "undefined") &&  
							($("#autharazationpassword_"+i).val() != null && $("#autharazationpassword_"+i).val() != "" && $("#autharazationpassword_"+i).val() != "undefined")) {
						headerFieldJsonObject[$("#headername_"+i).val()] = $("#autharazationusername_"+i).val() + ":" + $("#autharazationpassword_"+i).val();
					}
				}
			}
			
		}else{
			if(jsonFieldDataLength > 0){
				clientSpecificJsonMapping = $("#clientSpecificJson").val();
				for(var i=0; i<jsonFieldDataLength; i++) {
					if($("#sunmartechjsonfield_"+i).val() != null && $("#sunmartechjsonfield_"+i).val() != "" && $("#sunmartechjsonfield_"+i).val() != "undefined") {
						if($("#jsonsunmartechnamevalue_"+i).val() != null && $("#jsonsunmartechnamevalue_"+i).val() != "" && $("#jsonsunmartechnamevalue_"+i).val() !="undefined"){
							ssFieldJsonObject.json[$("#jsonsunmartechnamevalue_"+i).val()] = $("#sunmartechjsonfield_"+i).val();
							clientSpecificJsonMapping = clientSpecificJsonMapping.replace("|!"+$("#sunmartechjsonfield_"+i).val()+"!|","|!"+$("#jsonsunmartechnamevalue_"+i).val()+"!|");
							if($("#chkboxjsonfield_"+i).is(':checked')) {
								mandatoryFieldsArray.push($("#jsonsunmartechnamevalue_"+i).val());
							}
							deportFieldsArray.push($("#jsonsunmartechnamevalue_"+i).val());
							
						}else{
							ssFieldJsonObject.json[$("#sunmartechjsonfield_"+i).val()] = $("#sunmartechjsonfield_"+i).val();
							if($("#chkboxjsonfield_"+i).is(':checked')) {
								mandatoryFieldsArray.push($("#sunmartechjsonfield_"+i).val()); 
							}
							deportFieldsArray.push($("#sunmartechjsonfield_"+i).val());
						}
					}
				}
				$("#clientSpecificJson").val(clientSpecificJsonMapping);
			}
		}
		
		if(Object.keys(ssFieldJsonObject.json).length > 0) {
			ssFieldJsonArray.push(ssFieldJsonObject);
		}
		
		if(ssFieldJsonArray.length > 0){
			//alert(JSON.stringify(ssFieldJsonArray));
			ssFieldsValues=JSON.stringify(ssFieldJsonArray);
		}
		
		if(Object.keys(ssFieldJsonObjectForMyFreshWorks.json).length > 0) {
			ssFieldJsonArrayForMyFreshWorks.push(ssFieldJsonObjectForMyFreshWorks);
		}
		
		if(ssFieldJsonArrayForMyFreshWorks.length > 0){
			//alert(JSON.stringify(ssFieldJsonArray));
			ssFieldsValuesForMyFreshWorks=JSON.stringify(ssFieldJsonArrayForMyFreshWorks);
		}
		
		if(mandatoryFieldsArray.length > 0){
			//alert(mandatoryFieldsArray.join(","));
			mandatoryFieldsValue = mandatoryFieldsArray.join(",");
		}
		
		if(deportFieldsArray.length > 0) {
			deportFieldsArray.push("integration_name");
			//alert(deportFieldsArray.join(","));	
			deportFieldsValue = deportFieldsArray.join(",");
		}
		
		if(Object.keys(staticFieldJsonObject).length > 0) {
			staticFieldJsonArray.push(staticFieldJsonObject);
		}
		
		if(staticFieldJsonArray.length > 0){
			//alert(JSON.stringify(staticFieldJsonArray));
			staticFieldsValues=JSON.stringify(staticFieldJsonArray);
		}
		
		if(Object.keys(headerFieldJsonObject).length > 0) {
			headerFieldJsonArray.push(headerFieldJsonObject);
		}
		
		if(headerFieldJsonArray.length > 0){
			//alert(JSON.stringify(headerFieldJsonArray));
			headerFieldsValues=JSON.stringify(headerFieldJsonArray);
		}
		
		if(ssFieldsValues == ""){
			$("#addNewIntegrationErrorMsg").html("* Kindly select any mapping field.").show();
			setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
			return false;
		}
		
		if(validationValue != null && validationValue !="" && validationValue !="undefined"){
			//do nothing
			var setValidationArr=[];
			var previousValidationArr = validationValue;
			for(var a=0;a<=previousValidationArr.length;a++){
				if(previousValidationArr[a] != null && previousValidationArr[a] != "" && previousValidationArr[a] !="undefined"){
					if(Object.keys(previousValidationArr[a]) != null && Object.keys(previousValidationArr[a]) !="" && Object.keys(previousValidationArr[a]) !="undefined"){
						var msorKey = Object.keys(previousValidationArr[a]);
						if(deportFieldsValue.indexOf(msorKey) != -1){
						    setValidationArr.push(previousValidationArr[a]);
						}
					}
				}
			}
			debugger;
			if(setValidationArr != null && setValidationArr !="" && setValidationArr !="undefined" && setValidationArr.length > 0){
				validationValue = setValidationArr;
				validationValue = JSON.stringify(validationValue);
			}else{
				validationValue = '';
			}
			
		}else{
			//validationValue = defaultValidationValue;
		}
		
		/* if(clientOthersLookup != null && clientOthersLookup !="" && clientOthersLookup !="undefined"){
			//do nothing
		}else{
			clientOthersLookup = defaultClientOthersLookup;
		} */
		var setLookupValueExactMatchArray = [];
		var setLookupValuePhraseMatchArray = [];
		var lookupArray = [];
		if(lookupField != null && lookupField !="" && lookupField !="undefined"){
			if(defaultLookupField != null && defaultLookupField !="" && defaultLookupField !="undefined"){
				var exactMatch = '';
				var phraseMatch = '';
				$(defaultLookupField).each(function (index, item) {
					if(item.exact_match != null && item.exact_match != "" && item.exact_match !="undefined"){
						exactMatch = item.exact_match;
					}
					if(item.phrase_match != null && item.phrase_match != "" && item.phrase_match !="undefined"){
						phraseMatch = item.phrase_match;
					}
				});
				if(exactMatch != null && exactMatch != "" && exactMatch !="undefined"){
	            	   if(JSON.stringify(lookupFieldsPhraseMatchArray).indexOf($("#lookupType").val()) == -1) {
	            		   setLookupValueExactMatchArray.push(exactMatch);
	            	   }else{
	            		   if(exactMatch.indexOf($("#lookupType").val()) == -1) {
	            			   setLookupValueExactMatchArray.push(exactMatch);
	            		   }else{
	            			   var exactMatchValue='';
	            			   var exactMatchArr = exactMatch.split(",");
	            			   if(exactMatchArr != null && exactMatchArr !="" && exactMatchArr !="[]"){
	            				   for(var e=0;e<exactMatchArr.length;e++){
	            					   if(exactMatchArr[e] !=null && exactMatchArr[e] !="" && exactMatchArr[e] !="undefined"){
	            						   if(exactMatchArr[e].indexOf("--") != -1){
	            							   if(JSON.stringify(lookupFieldsPhraseMatchArray).indexOf(exactMatchArr[e]) != -1){
	            								   exactMatch = exactMatch.replace(exactMatchArr[e], '');
	  	         							  }
	            						   }else{
	            							   if(exactMatchArr[e].indexOf($("#lookupType").val()) != -1){
	            								   exactMatch = exactMatch.replace($("#lookupType").val(), '');
	            							   }
		         						   }
	            					   }
	            				   }
	            				   var exactMatchValueArr = exactMatch.split(",");
	    							 if(exactMatchValueArr != null && exactMatchValueArr !="" && exactMatchValueArr !="[]"){
	    								for(var f=0;f<exactMatchValueArr.length;f++){
	    									if(exactMatchValueArr[f] !=null && exactMatchValueArr[f] !="" && exactMatchValueArr[f] !="undefined"){
	  	            						   if(exactMatchValue != null && exactMatchValue !=""){
	  	            							 exactMatchValue = exactMatchValue+","+exactMatchValueArr[f];
	  	            						   }else{
	  	            							 exactMatchValue = exactMatchValueArr[f];
	  	            						   }
	  	            					   }
	    								}
	    							}
	            			   }
	            			   if(exactMatchValue != null && exactMatchValue !=""){
	            				   setLookupValueExactMatchArray.push(exactMatchValue);
	            			   }
	            	   }
	            }
			}
				if(phraseMatch != null && phraseMatch != "" && phraseMatch !="undefined"){
	            	   if(JSON.stringify(lookupFieldsExactMatchArray).indexOf($("#lookupType").val()) == -1) {
	            		   setLookupValuePhraseMatchArray.push(phraseMatch);
	            	   }else{
	            		   if(phraseMatch.indexOf($("#lookupType").val()) == -1) {
	            			   setLookupValuePhraseMatchArray.push(phraseMatch);
	            		   }else{
	            			   var phraseMatchValue='';
	            			   var phraseMatchArr = phraseMatch.split(",");
		            		   if(phraseMatchArr != null && phraseMatchArr !="" && phraseMatchArr !="[]"){
	         				   for(var e=0;e<phraseMatchArr.length;e++){
	         					   debugger;
	         					   if(phraseMatchArr[e] !=null && phraseMatchArr[e] !="" && phraseMatchArr[e] !="undefined"){
	         						   if(phraseMatchArr[e].indexOf("--") != -1){
	         							  if(JSON.stringify(lookupFieldsExactMatchArray).indexOf(phraseMatchArr[e]) != -1){
	         								 phraseMatch = phraseMatch.replace(phraseMatchArr[e], '');
	         							  }
	         						   }else{
	         							  if(phraseMatchArr[e].indexOf($("#lookupType").val()) != -1){
	         								 phraseMatch = phraseMatch.replace($("#lookupType").val(), '');
	         							  }
	         						   }
	         					   }
	         				   }
	         				   
	         				 var phraseMatchValueArr = phraseMatch.split(",");
  							 if(phraseMatchValueArr != null && phraseMatchValueArr !="" && phraseMatchValueArr !="[]"){
  								for(var f=0;f<phraseMatchValueArr.length;f++){
  									if(phraseMatchValueArr[f] !=null && phraseMatchValueArr[f] !="" && phraseMatchValueArr[f] !="undefined"){
	            						   if(phraseMatchValue != null && phraseMatchValue !=""){
	            							   phraseMatchValue = phraseMatchValue+","+phraseMatchValueArr[f];
	            						   }else{
	            							   phraseMatchValue = phraseMatchValueArr[f];
	            						   }
	            					   }
  								}
  							}
	            		   }
		            		   if(phraseMatchValue != null && phraseMatchValue !=""){
	            				   setLookupValuePhraseMatchArray.push(phraseMatchValue);
	            			   }
         			   }
	            		   
	            	   }
	               }
			}
			
	        if(lookupFieldsExactMatchArray != null && lookupFieldsExactMatchArray != "" && lookupFieldsExactMatchArray != "[]") {
	        	setLookupValueExactMatchArray.push(lookupFieldsExactMatchArray);
	   		}
	        if(setLookupValueExactMatchArray != null && setLookupValueExactMatchArray != "" && setLookupValueExactMatchArray != "[]") {
	        	var setExactMatchLookupArray = setLookupValueExactMatchArray.join(",").split(",");
	        	var uniqueLookupFieldsExactMatchArray = setExactMatchLookupArray.filter(function(itm, i, setExactMatchLookupArray) {
	        	    return i == setExactMatchLookupArray.indexOf(itm);
	        	});
	        	lookupArray.push({"exact_match":uniqueLookupFieldsExactMatchArray.join(",")});
	        }
	        if(lookupFieldsPhraseMatchArray != null && lookupFieldsPhraseMatchArray != "" && lookupFieldsPhraseMatchArray != "[]") {
	        	setLookupValuePhraseMatchArray.push(lookupFieldsPhraseMatchArray);
			}
	        if(setLookupValuePhraseMatchArray != null && setLookupValuePhraseMatchArray != "" && setLookupValuePhraseMatchArray != "[]") {
	        	var setPhraseMatchLookupArray = setLookupValuePhraseMatchArray.join(",").split(",");
	        	var uniqueLookupFieldsPhraseMatchArray = setPhraseMatchLookupArray.filter(function(itm, i, setPhraseMatchLookupArray) {
	        	    return i == setPhraseMatchLookupArray.indexOf(itm);
	        	});
	        	lookupArray.push({"phrase_match":uniqueLookupFieldsPhraseMatchArray.join(",")});
	        }
	        if(lookupArray != null && lookupArray != "[]" && lookupArray.length > 0) {
				$("#lookup_fields").val(JSON.stringify(lookupArray));
				
				lookupField = trimValue($("#lookup_fields").val());
			}
			
		}else{
			lookupField = defaultLookupField;
		}
		
		var tableRow = {integrationIdForLookupUpload:$("#hiddenIntegrationId").val(),clientName:trimValue($("#clientName").val()),integrationName:trimValue($("#integrationName").val()),integrationType:trimValue($("#integrationType").val()),
				endpointUrlOutput:trimValue($("#endpointUrlOutput").val()),restIdentityUrl:trimValue($("#restIdentityUrl").val()),
				usernameOutput:trimValue($("#usernameOutput").val()),passwordOutput:trimValue($("#passwordOutput").val()),username:loginUserName,ssFields:ssFieldsValues,
				mandatoryFields:mandatoryFieldsValue,deportFields:deportFieldsValue,staticFields:staticFieldsValues,validationFields:validationValue,successType:trimValue($("#successPhrase").val()),
				lookup_fields:lookupField,clientOthersLookupFields:trimValue($("#advanceLookup").val()),integrationStatus:"completed",ssFieldsForMyFreshWorks:ssFieldsValuesForMyFreshWorks,apiKey:trimValue($("#apikey").val()),
				sftpHost:trimValue($("#sftphost").val()),sftpPort:trimValue($("#sftpport").val()),sftpUser:trimValue($("#sftpuser").val()),sftpPass:trimValue($("#sftppass").val()),sftpWorkingDir:trimValue($("#sftpworkingdir").val()),
				headerFields:headerFieldsValues,staticListEndPointUrl:trimValue($("#staticListEndPointUrl").val()),clientSpecificJson:trimValue($("#clientSpecificJson").val()),recordTimeDelay:$("#recordTimeDelay").val(),
				oauth:trimValue($("#oauth").val()),clientId:trimValue($("#clientId").val()),clientSecret:trimValue($("#clientSecret").val()),accessToken:trimValue($("#accessToken").val())};
		console.log(JSON.stringify(tableRow));
		$("#addNewCustomerLoader").show();
		$.ajax({
			url: "completeIntegrationDetailsForClone.do",
			type: "POST",
			data: encodeURIComponent(JSON.stringify(tableRow)),
			success : function(result) {
				//alert(result);
				$("#addNewCustomerLoader").hide();
				if(result == "success") {
					$("#addNewIntegrationSuccessMsg").html("* Datapass inserted successfully").show();
					setTimeout(function(){
						resetAddNewIntegrationModel();
						$('#addNewIntegrationSuccessMsg').html("");
						fetchIntegrationDetailsCount();
						fetchIntegrationDetails();
						},4000);
				}else if(result == "integrationNameExists"){
					$("#addNewIntegrationErrorMsg").html("* Datapass name already exists.").show();
					setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
				}
				else  {
					//$("#mergeLoader").hide();
					$("#addNewIntegrationErrorMsg").html("* error occurred while inserting record in table, kindly check with development team.").show();
					setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},5000);
				}
			}
		});  
	}
	
	function reviewTestResponse(index){
		$('#reviewTestResponse').modal('show');
		$("#testRequest").val("");
		$("#testResponse").val("");
		var integrationId = recArr[index].integrationId;
		$("#reviewTestResponseLoader").show();
		$.ajax({
			url:'reviewTestResponse.do?integrationId='+integrationId,
			success: function(data, textStatus, xhr)
			{
				$("#reviewTestResponseLoader").hide();
				if(data != null && data != "" && data != "[]") {
					data = JSON.parse(data);
					if(data.testResponse != null && data.testResponse != "" && data.testResponse !="undefined"){
						$("#testRequest").val(data.testResponse.request);
						$("#testResponse").val(data.testResponse.response);
					
					}else{
						$("#reviewTestResponseErrorMsg").html("*no response found.").show().css('padding-top', '5px');
						setTimeout(function(){
							$('#reviewTestResponseErrorMsg').html("");
						},3000);
					}

				}else{
					$("#reviewTestResponseErrorMsg").html("*no response found..").show();
					setTimeout(function(){
						$('#reviewTestResponseErrorMsg').html("");
					},3000);
				}
			},
				error: function(xhr, textStatus, errorThrow){
				$("#reviewTestResponseLoader").hide();
				$("#reviewTestResponseErrorMsg").html("* error occured while fetch the response. kindly check with development team.").show();
				setTimeout(function(){
					$('#reviewTestResponseErrorMsg').html("");
				},3000);
			}
		});
		
	
	}
	
	
	function applyLookups(index, customField, msorValue) {
		$('#lookup_checkbox').prop('checked', false);
		//$('#others_lookup_checkbox').prop('checked', false);
		//$("#selectedMatchingCriteria").css('border-color','#cf1133');
		
		document.getElementById('lookup_parent').style.display = 'none';
		//$("#others_client_lookup_div").hide();
		
		$("#lookup_parent").val("");
		//$("#others_client_lookup").val("");
		$("#selectedMatchingCriteria").val("");
		$('#lookupUploadErrorMsg').html("").hide();
		
		debugger;
		var fields="";
		if(msorValue =="sunmartechField"){
			fields = $('#msorField_'+index).text();
			isCustomFieldForMyFreshWorks = false;
		}else if(msorValue =="customFieldForMyFreshWorks"){
			fields = $('#sunmartechcustomfieldformyfreshworks_'+index).val();
			isCustomFieldForMyFreshWorks = true;
		}else if(msorValue =="jsonField"){
			fields = $('#jsonsunmartechnamevalue_'+index).val();
			isCustomFieldForMyFreshWorks = false;
		}else{
			fields = $('#sunmartechcustomfield_'+index).val();
			isCustomFieldForMyFreshWorks = false;
		}
		
		$("#hiddenMsorValue").val(fields);
		$('#lookupUploadModal').modal('show');
		
		isCustomField = customField;
		debugger;
		if(customField) {
			if(isCustomFieldForMyFreshWorks){
				$("#lookupType").val($("#sunmartechcustomfieldformyfreshworks_"+index).val());
			}else{
				$("#lookupType").val($("#sunmartechcustomfield_"+index).val());
			}
		}
		else {
			if($("#clientSpecificJson").val() !=null && $("#clientSpecificJson").val() !="" && $("#clientSpecificJson").val() !="undefined"){
				if($("#jsonsunmartechnamevalue_"+index).val() != null && $("#jsonsunmartechnamevalue_"+index).val() != "" && 
						$("#jsonsunmartechnamevalue_"+index).val() != "undefined") {
					$("#lookupType").val($("#jsonsunmartechnamevalue_"+index).val());
				}
			}else{
				$("#lookupType").val($("#msorField_"+index).text());
			}
		}
		//$('#lookup_upload').attr("id","lookup_upload_"+newId);
		csfValidationValue = index;
		fetchLookupUploadedFile();
	}

	function uploadLookup() {
		 /* if($("#selectedMatchingCriteria").val() != null && $("#selectedMatchingCriteria").val() !="" && $("#selectedMatchingCriteria").val() !="undefined"){
			//do nothing
		}else{
			if($("#others_client_lookup").val() != null && $("#others_client_lookup").val() != "" && $("#others_client_lookup").val() !="undefined"){
				
			}else{
				$("#lookupUploadErrorMsg").html("* kindly select the matching criteria.").show();
				setTimeout(function(){$('#lookupUploadErrorMsg').html("").hide();},3000);
				return false;
			}
		} */
		
		 if(!lookupFileUoloadTableCheck){
			if($("#lookup_upload").val() ==""){
				$("#lookupUploadErrorMsg").html("* kindly choose the file to upload.").show();
				setTimeout(function(){$('#lookupUploadErrorMsg').html("").hide();},3000);
				return false;
			}
		}
		$.confirm1({
			'message'	: 'Are you sure you want to append or replace the existing lookup?',
			'buttons'	: {
				'<span class="fa fa-check fa-2x" aria-hidden="true"></span> Append'	: {
					'class'	: 'yes green',
					'action': function(){
						callUploadLookup('false');
					}
				},
				'<span class="fa fa-times fa-2x" aria-hidden="true"></span>  Replace'	: {
					'class'	: 'no blue',
					'action': function(){
						callUploadLookup('true');
					}	
				},
				'<span class="fa fa-times fa-2x" aria-hidden="true"></span>  Cancel'	: {
					'class'	: 'no',
					'action': function(){}	
				}
			}
		});
	}

	function callUploadLookup(replace) {
		$('#lookupUploadErrorMsg').html("").hide();
		$("#lookupUploadLoader").show();
		
		var finalOthersLookup = '';
		var finalOthersLookupJson = {};
		var lookupArray = [];
		var matchArr = [];
		var exactMatch = '';
		var phraseMatch = '';
		
		debugger;
		/* if($("#others_client_lookup").val() != null && $("#others_client_lookup").val() != "" && $("#others_client_lookup").val() != "undefined") {
			if(IsJsonString($("#others_client_lookup").val())) {
				finalOthersLookup = $("#others_client_lookup").val();
				if($("#clientSpecificJson").val() !=null && $("#clientSpecificJson").val() !="" && $("#clientSpecificJson").val() !="undefined"){
					if($("#jsonsunmartechnamevalue_"+csfValidationValue).val() != null && $("#jsonsunmartechnamevalue_"+csfValidationValue).val() != "" && 
							$("#jsonsunmartechnamevalue_"+csfValidationValue).val() != "undefined") {
						finalOthersLookupJson[$("#lookup_parent").val()] = finalOthersLookup;
					}
				}else{
					if($("#msorField_"+csfValidationValue).text() != null && $("#msorField_"+csfValidationValue).text() != "" && 
							$("#msorField_"+csfValidationValue).text() != "undefined" && !isCustomField) {
								
								//finalOthersLookupJson[$("#msorField_"+csfValidationValue).text()] = finalOthersLookup;
								finalOthersLookupJson[$("#lookup_parent").val()] = finalOthersLookup;
						}
						
						if($("#sunmartechcustomfield_"+csfValidationValue).val() != null && $("#sunmartechcustomfield_"+csfValidationValue).val() != "" && 
								$("#sunmartechcustomfield_"+csfValidationValue).val() != "undefined" && isCustomField && !isCustomFieldForMyFreshWorks) {
								
								//finalOthersLookupJson[$("#sunmartechcustomfield_"+csfValidationValue).val()] = finalOthersLookup;
								finalOthersLookupJson[$("#lookup_parent").val()] = finalOthersLookup;
						}
						if($("#sunmartechcustomfieldformyfreshworks_"+csfValidationValue).val() != null && $("#sunmartechcustomfieldformyfreshworks_"+csfValidationValue).val() != "" && 
								$("#sunmartechcustomfieldformyfreshworks_"+csfValidationValue).val() != "undefined" && isCustomField && isCustomFieldForMyFreshWorks) {
								
								//finalOthersLookupJson[$("#sunmartechcustomfieldformyfreshworks_"+csfValidationValue).val()] = finalOthersLookup;
								finalOthersLookupJson[$("#lookup_parent").val()] = finalOthersLookup;
						}
				}
				debugger;
				if(finalOthersLookupJson != '') {
					clientOthersLookupArray.push(finalOthersLookupJson);
				}
				
				if(clientOthersLookupArray.length > 0){
					if(defaultClientOthersLookup != null && defaultClientOthersLookup != "") {
						clientOthersLookup = JSON.stringify(defaultClientOthersLookup) + JSON.stringify(clientOthersLookupArray);
					}
					else {
						clientOthersLookup = JSON.stringify(clientOthersLookupArray);
					}
				}
				console.log("clientOthersLookup::"+clientOthersLookup);
			}
			else {
				$("#lookupUploadLoader").hide();
				validationMatching = false;
				$("#lookupUploadErrorMsg").html("* Value entered in checkOthersClientLookup is not in valid format.").show();
				setTimeout(function(){$('#lookupUploadErrorMsg').html("");},5000);
				return false;
			}
		}
		else {
			
		} */
		if($("#lookup_parent").val() != null && $("#lookup_parent").val() != "" && $("#lookup_parent").val() != "undefined") {
			if($("#selectedMatchingCriteria").val() != null && $("#selectedMatchingCriteria").val() != "") {
				if($("#selectedMatchingCriteria").val() == "exact_match") {
					if(defaultLookupField != null && defaultLookupField != "") {
						if(JSON.stringify(defaultLookupField).indexOf($("#lookup_parent").val()+"--"+$("#lookupType").val()) == -1) {
							if(JSON.stringify(lookupField).indexOf($("#lookup_parent").val()+"--"+$("#lookupType").val()) == -1) {
								lookupFieldsExactMatchArray.push($("#lookup_parent").val()+"--"+$("#lookupType").val());
								$(defaultLookupField).each(function (index, item) {
									debugger;
						               // each iteration
						               exactMatch = item.exact_match;
						        });
								for(var i=0;i<lookupFieldsExactMatchArray.length;i++){
									var value = lookupFieldsExactMatchArray[i];
									console.log("value::"+value);
									if(value.indexOf("--") != -1){
										if(exactMatch != null && exactMatch != "" && exactMatch != "undefined"){
											var exactMatchArr = exactMatch.split(",");
											if(exactMatchArr !=null && exactMatchArr != "" && exactMatchArr !="[]"){
												for(var j=0;j<exactMatchArr.length;j++){
													if(exactMatchArr[j].indexOf("--") != -1){
														if(exactMatch.indexOf(value) == -1){
															var lookupValueForMatchArr = exactMatchArr[j].split("--");
															for(var index = 0; index < lookupValueForMatchArr.length; index++) {
																if(value.indexOf(lookupValueForMatchArr[index]) != -1){
															    	 var valueArr = value.split("--");
															    	// matchArr.push(lookupValueForMatchArr[0]+"--"+valueArr[index]);
															    	 if(lookupValueForMatchArr[0] == valueArr[index+1]){
															    		 matchArr.push(lookupValueForMatchArr[0]+"--"+valueArr[index]);
															    	 }else{
															    		 matchArr.push(lookupValueForMatchArr[0]+"--"+valueArr[index+1]);
															    	 }
															    	 break;
															     }
															}
														}
													}else{
														if(lookupValueForMatch != null && lookupValueForMatch != "" && lookupValueForMatch != "undefined"){
															if(lookupValueForMatch.indexOf(value) == -1){
																var lookupValueForMatchArr = lookupValueForMatch.split("--");
																for(var index = 0; index < lookupValueForMatchArr.length; index++) {
																	if(lookupValueForMatch.indexOf(lookupValueForMatchArr[index]) != -1){
																    	 //lookupValueForMatch = value + "--" +lookupValueForMatchArr[index+1];
																    	 lookupValueForMatch = lookupValueForMatch +"," + value;
																    	 //lookupValueForMatch = value;
																    	 var valueArr = value.split("--");
																    	 if(lookupValueForMatchArr[0] == valueArr[index+1]){
																    		 matchArr.push(lookupValueForMatchArr[0]+"--"+valueArr[index]);
																    	 }else{
																    		 matchArr.push(lookupValueForMatchArr[0]+"--"+valueArr[index+1]);
																    	 }
																    	 break;
																     }
																}
															}
														}else{
															lookupValueForMatch = value;
														}
													}
												}
											}
										}
									}
								}
							}
						}else{
							$(defaultLookupField).each(function (index, item) {
								debugger;
					               // each iteration
					               var exactMatch = item.exact_match;
					               var phraseMatch = item.phrase_match;
					               if(exactMatch != null && exactMatch != "" && exactMatch !="undefined"){
					            	   if(exactMatch.indexOf($("#lookup_parent").val()+"--"+$("#lookupType").val()) != -1) {
					            		   lookupFieldsExactMatchArray.push($("#lookup_parent").val()+"--"+$("#lookupType").val());
					            	   }
					               }
					               if(phraseMatch != null && phraseMatch != "" && phraseMatch !="undefined"){
										if(phraseMatch.indexOf($("#lookup_parent").val()+"--"+$("#lookupType").val()) != -1) {
											lookupFieldsExactMatchArray.push($("#lookup_parent").val()+"--"+$("#lookupType").val());
					            	   }
					               }
					           });
						}
					}
					else {
						if(JSON.stringify(lookupField).indexOf($("#lookup_parent").val()+"--"+$("#lookupType").val()) == -1) {
							lookupFieldsExactMatchArray.push($("#lookup_parent").val()+"--"+$("#lookupType").val());
							for(var i=0;i<lookupFieldsExactMatchArray.length;i++){
								var value = lookupFieldsExactMatchArray[i];
								console.log("value::"+value);
								if(value.indexOf("--") != -1){
									if(lookupValueForMatch != null && lookupValueForMatch != "" && lookupValueForMatch != "undefined"){
										if(lookupValueForMatch.indexOf(value) == -1){
											var lookupValueForMatchArr = lookupValueForMatch.split("--");
											for(var index = 0; index < lookupValueForMatchArr.length; index++) {
												if(lookupValueForMatch.indexOf(lookupValueForMatchArr[index]) != -1){
											    	 //lookupValueForMatch = value + "--" +lookupValueForMatchArr[index+1];
											    	 lookupValueForMatch = lookupValueForMatch +"," + value;
											    	 //lookupValueForMatch = value;
											    	 var valueArr = value.split("--");
											    	 //matchArr.push(valueArr[0]+"--"+lookupValueForMatchArr[index+1]);
											    	 if(lookupValueForMatchArr[0] == valueArr[index+1]){
											    		 matchArr.push(lookupValueForMatchArr[0]+"--"+valueArr[index]);
											    	 }else{
											    		 matchArr.push(lookupValueForMatchArr[0]+"--"+valueArr[index+1]);
											    	 }
											    	 break;
											     }
											}
										}
									}else{
										lookupValueForMatch = value;
									}
								}
							}
						}
					}
					if(matchArr != null && matchArr !="" && matchArr !="[]"){
						lookupFieldsExactMatchArray.push(matchArr);
					}
				}
				else {
					if(defaultLookupField != null && defaultLookupField != "") {
						if(JSON.stringify(defaultLookupField).indexOf($("#lookup_parent").val()+"--"+$("#lookupType").val()) == -1) {
							//lookupFieldsPhraseMatchArray.push($("#lookup_parent").val()+"--"+$("#lookupType").val());
							if(JSON.stringify(lookupField).indexOf($("#lookup_parent").val()+"--"+$("#lookupType").val()) == -1) {
								lookupFieldsPhraseMatchArray.push($("#lookup_parent").val()+"--"+$("#lookupType").val());
								$(defaultLookupField).each(function (index, item) {
									debugger;
						               // each iteration
						               phraseMatch = item.phrase_match;
						        });
								for(var i=0;i<lookupFieldsPhraseMatchArray.length;i++){
									var value = lookupFieldsPhraseMatchArray[i];
									console.log("value for phrase match::"+value);
									if(value.indexOf("--") != -1){
										if(phraseMatch != null && phraseMatch != "" && phraseMatch != "undefined"){
											var phraseMatchArr = phraseMatch.split(",");
											if(phraseMatchArr !=null && phraseMatchArr != "" && phraseMatchArr !="[]"){
												for(var j=0;j<phraseMatchArr.length;j++){
													if(phraseMatchArr[j].indexOf("--") != -1){
														if(phraseMatch.indexOf(value) == -1){
															var lookupValueForMatchArr = phraseMatchArr[j].split("--");
															for(var index = 0; index < lookupValueForMatchArr.length; index++) {
																if(value.indexOf(lookupValueForMatchArr[index]) != -1){
															    	 var valueArr = value.split("--");
															    	 matchArr.push(lookupValueForMatchArr[0]+"--"+valueArr[index]);
															    	 if(lookupValueForMatchArr[0] == valueArr[index+1]){
															    		 matchArr.push(lookupValueForMatchArr[0]+"--"+valueArr[index]);
															    	 }else{
															    		 matchArr.push(lookupValueForMatchArr[0]+"--"+valueArr[index+1]);
															    	 }
															    	 break;
															     }
															}
														}
													}else{
														if(lookupValueForPhraseMatch != null && lookupValueForPhraseMatch != "" && lookupValueForPhraseMatch != "undefined"){
															if(lookupValueForPhraseMatch.indexOf(value) == -1){
																var lookupValueForMatchArr = lookupValueForPhraseMatch.split("--");
																for(var index = 0; index < lookupValueForMatchArr.length; index++) {
																	if(lookupValueForPhraseMatch.indexOf(lookupValueForMatchArr[index]) != -1){
																    	 //lookupValueForMatch = value + "--" +lookupValueForMatchArr[index+1];
																    	 lookupValueForPhraseMatch = lookupValueForPhraseMatch +"," + value;
																    	 //lookupValueForMatch = value;
																    	 var valueArr = value.split("--");
																    	 if(lookupValueForMatchArr[0] == valueArr[index+1]){
																    		 matchArr.push(lookupValueForMatchArr[0]+"--"+valueArr[index]);
																    	 }else{
																    		 matchArr.push(lookupValueForMatchArr[0]+"--"+valueArr[index+1]);
																    	 }
																    	 break;
																     }
																}
															}
														}else{
															lookupValueForPhraseMatch = value;
														}
													}
												}
											}
										}
									}
								}
							}
						}else{
							$(defaultLookupField).each(function (index, item) {
								debugger;
					               // each iteration
					               var exactMatch = item.exact_match;
					               var phraseMatch = item.phrase_match;
					               if(exactMatch != null && exactMatch != "" && exactMatch !="undefined"){
					            	   if(exactMatch.indexOf($("#lookup_parent").val()+"--"+$("#lookupType").val()) != -1) {
					            		   lookupFieldsPhraseMatchArray.push($("#lookup_parent").val()+"--"+$("#lookupType").val());
					            	   }
					               }
					               if(phraseMatch != null && phraseMatch != "" && phraseMatch !="undefined"){
										if(phraseMatch.indexOf($("#lookup_parent").val()+"--"+$("#lookupType").val()) != -1) {
											lookupFieldsPhraseMatchArray.push($("#lookup_parent").val()+"--"+$("#lookupType").val());
					            	   }
					               }
					           });
						}
					}
					else {
						//lookupFieldsPhraseMatchArray.push($("#lookup_parent").val()+"--"+$("#lookupType").val());
						
						if(JSON.stringify(lookupField).indexOf($("#lookup_parent").val()+"--"+$("#lookupType").val()) == -1) {
							lookupFieldsPhraseMatchArray.push($("#lookup_parent").val()+"--"+$("#lookupType").val());
							for(var i=0;i<lookupFieldsPhraseMatchArray.length;i++){
								var value = lookupFieldsPhraseMatchArray[i];
								console.log("value for phrase match::"+value);
								if(value.indexOf("--") != -1){
									if(lookupValueForPhraseMatch != null && lookupValueForPhraseMatch != "" && lookupValueForPhraseMatch != "undefined"){
										if(lookupValueForPhraseMatch.indexOf(value) == -1){
											var lookupValueForMatchArr = lookupValueForPhraseMatch.split("--");
											for(var index = 0; index < lookupValueForMatchArr.length; index++) {
												if(lookupValueForPhraseMatch.indexOf(lookupValueForMatchArr[index]) != -1){
											    	 //lookupValueForMatch = value + "--" +lookupValueForMatchArr[index+1];
											    	 lookupValueForPhraseMatch = lookupValueForPhraseMatch +"," + value;
											    	 //lookupValueForMatch = value;
											    	 var valueArr = value.split("--");
											    	 //matchArr.push(valueArr[0]+"--"+lookupValueForMatchArr[index+1]);
											    	 if(lookupValueForMatchArr[0] == valueArr[index+1]){
											    		 matchArr.push(lookupValueForMatchArr[0]+"--"+valueArr[index]);
											    	 }else{
											    		 matchArr.push(lookupValueForMatchArr[0]+"--"+valueArr[index+1]);
											    	 }
											    	 break;
											     }
											}
										}
									}else{
										lookupValueForPhraseMatch = value;
									}
								}
							}
						}
						
					}
					if(matchArr != null && matchArr !="" && matchArr !="[]"){
						lookupFieldsPhraseMatchArray.push(matchArr);
					}
				}
			}
		}
		else {
			if($("#selectedMatchingCriteria").val() != null && $("#selectedMatchingCriteria").val() != "") {
				if($("#selectedMatchingCriteria").val() == "exact_match") {
					debugger;
					if(defaultLookupField != null && defaultLookupField != "") {
						if(JSON.stringify(defaultLookupField).indexOf($("#lookupType").val()) == -1) {
							lookupFieldsExactMatchArray.push($("#lookupType").val());
						}else{
							$(defaultLookupField).each(function (index, item) {
								debugger;
					               // each iteration
					               var exactMatch = item.exact_match;
					               var phraseMatch = item.phrase_match;
					               if(exactMatch != null && exactMatch != "" && exactMatch !="undefined"){
					            	   if(exactMatch.indexOf($("#lookupType").val()) != -1){
					            		   lookupFieldsExactMatchArray.push($("#lookupType").val());
					            	   }
					               }
					               if(phraseMatch != null && phraseMatch != "" && phraseMatch !="undefined"){
										if(phraseMatch.indexOf($("#lookupType").val()) != -1){
											lookupFieldsExactMatchArray.push($("#lookupType").val());
					            	   }
					               }
					           });
						}
					}
					else {
						lookupFieldsExactMatchArray.push($("#lookupType").val());
					}
				}
				else if($("#selectedMatchingCriteria").val() == "phrase_match") {
					if(defaultLookupField != null && defaultLookupField != "") {
						if(JSON.stringify(defaultLookupField).indexOf($("#lookupType").val()) == -1) {
							lookupFieldsPhraseMatchArray.push($("#lookupType").val());
						}else{
							$(defaultLookupField).each(function (index, item) {
								debugger;
					               // each iteration
					               var exactMatch = item.exact_match;
					               var phraseMatch = item.phrase_match;
					               if(exactMatch != null && exactMatch != "" && exactMatch !="undefined"){
					            	   if(exactMatch.indexOf($("#lookupType").val()) != -1){
					            		   lookupFieldsPhraseMatchArray.push($("#lookupType").val());
					            	   }
					               }
					               if(phraseMatch != null && phraseMatch != "" && phraseMatch !="undefined"){
										if(phraseMatch.indexOf($("#lookupType").val()) != -1){
											lookupFieldsPhraseMatchArray.push($("#lookupType").val());
					            	   }
					               }
					           });
						}
					}
					else {
						lookupFieldsPhraseMatchArray.push($("#lookupType").val());
					}
				}
			}
		}
		
		
		//alert("lookupFieldsExactMatchArray::"+lookupFieldsExactMatchArray);
		//alert("lookupFieldsPhraseMatchArray::"+lookupFieldsPhraseMatchArray);
		
		if(lookupFieldsExactMatchArray != null && lookupFieldsExactMatchArray != "" && lookupFieldsExactMatchArray != "[]") {
			lookupArray.push({"exact_match":lookupFieldsExactMatchArray.join(",")});
		}
		if(lookupFieldsPhraseMatchArray != null && lookupFieldsPhraseMatchArray != "" && lookupFieldsPhraseMatchArray != "[]") {
			lookupArray.push({"phrase_match":lookupFieldsPhraseMatchArray.join(",")});
		}
		
		if(lookupArray != null && lookupArray != "[]" && lookupArray.length > 0) {
			$("#lookup_fields").val(JSON.stringify(lookupArray));
			
			lookupField = trimValue($("#lookup_fields").val());
		}
		
		//alert($("#lookup_fields").val());
		
		var lookupFormData=new FormData();
		if($("#lookup_upload").val() != "" && $("#lookup_upload").val() != undefined) {
			lookupFormData.append("file",$("#lookup_upload")[0].files[0]);
			
			var fileName = $('#lookup_upload').prop("files")[0]['name'];
			if(fileName.lastIndexOf(".csv") != -1 || fileName.lastIndexOf(".xls") != -1 || fileName.lastIndexOf(".xlsx") != -1) {		
				$.ajax({
					url: "uploadLookup.do?username="+loginUserName+"&integrationId="+$("#hiddenIntegrationId").val()+"&type="+$("#lookupType").val()+"&lookupParent="+$("#lookup_parent").val()+"&replace="+replace,
					data:lookupFormData,
					contentType: false,
					cache:false,
					processData: false,
					type: "POST",
					success: function(data, textStatus, xhr)
					{ 
						debugger;
						if(data =="success"){
							$("#lookup_upload").val("");
							$("#lookupUploadLoader").hide();
							$("#lookupUploadSuccessMsg").html("*lookup file uploaded successfully.").show();
							setTimeout(function(){
								$('#lookupUploadSuccessMsg').html("").hide();
								//$("#lookupUploadModal").modal("hide");
							},3000);
							if(matchArr != null && matchArr !="" && matchArr !="[]"){
								$('#lookupUploadSuccessMsg').html("").hide();
								var fileUploadMessage = '';
								for(var i=0;i<matchArr.length;i++){
									if(fileUploadMessage != null && fileUploadMessage !=""){
										fileUploadMessage = fileUploadMessage +"  and "+matchArr[i]+"";
									}else{
										fileUploadMessage = "*Kindly upload lookup for ::"+matchArr[i]+"";
									}
								}
								$("#lookupUploadErrorMsg").html(fileUploadMessage).show();
								if(matchArr.length == 1){
									$("#lookup_parent").val(matchArr[0].substring(0, matchArr[0].indexOf("--")));
								}
							}else{
								$("#lookupUploadModal").modal("hide");
							}
							
						}else if(data == "error"){
							$("#lookup_upload").val("");
							$("#lookupUploadLoader").hide();
							$("#lookupUploadErrorMsg").html("*error occured while uploading the file.").show();
							setTimeout(function(){
								$('#lookupUploadErrorMsg').html("").hide();
								//$("#lookupUploadModal").modal("hide");
								
							},5000);
						}else{
							$("#lookup_upload").val("");
							$("#lookupUploadLoader").hide();
							$("#lookupUploadErrorMsg").html(data).show();
							setTimeout(function(){
								$('#lookupUploadErrorMsg').html("").hide();
								//$("#lookupUploadModal").modal("hide");
							},5000);
						}
					}
				});
			}else{
				//$("#lookupUploadModal").hide();
				$("#lookupUploadLoader").hide();
				$("#lookupUploadErrorMsg").html("only csv, xls and xlsx file are allowed").show();
				setTimeout(function(){$('#lookupUploadErrorMsg').html("").hide();},5000);
		  	} 

		}
		else {
			$("#lookupUploadLoader").hide();
			$("#lookupUploadModal").modal("hide");
		}
	}
	
	function fetchLookupUploadedFile(){
		lookupFileUoloadTableCheck=false;
		var integrationId = recArr[editIndexValue].integrationId;
		$("#lookupUploadLoader").show();
		//$('#lookupFileUoloadTable').dataTable().fnClearTable();
		$("#tbodyid").empty();
		
		debugger;
		/* var othersValueMatched = false;
		var validationFieldsArr = defaultClientOthersLookup;
		if(validationFieldsArr !=null && validationFieldsArr != "" && validationFieldsArr.length > 0){
			for(var a=0;a<=validationFieldsArr.length;a++){
				if(validationFieldsArr[a] != null && validationFieldsArr[a] != "" && validationFieldsArr[a] !="undefined"){
					if(Object.keys(validationFieldsArr[a]) != null && Object.keys(validationFieldsArr[a]) !="" && Object.keys(validationFieldsArr[a]) !="undefined"){
						var msorKey = Object.keys(validationFieldsArr[a]);
						
						if(!othersValueMatched) {
							if($("#hiddenMsorValue").val() == msorKey){
								othersValueMatched = true;
								var valueArr = Object.values(validationFieldsArr[a]);
								if(valueArr != null && valueArr != "" && valueArr !="undefined" && valueArr.length > 0){
									$("#others_client_lookup").val(JSON.stringify(valueArr));
									$("#others_client_lookup").attr("title",JSON.stringify(valueArr));		
									
									clientOthersLookup = $("#others_client_lookup").val();
								}
							}
							else {
								$("#others_client_lookup").val("");
								$("#others_client_lookup").attr("title", "");		
								
								clientOthersLookup = $("#others_client_lookup").val();
							}
						}
					}
				}
			}
		} */
		
		$.ajax({
			url:'fetchLookupUploadedFile.do?integrationId='+integrationId+"&type="+$("#lookupType").val(),
			success: function(data, textStatus, xhr)
			{
				debugger;
				$("#lookupUploadLoader").hide();
				if(data != null && data != "" && data != "[]") {
					data = JSON.parse(data);
					if(data.lookupSourceId != null && data.lookupSourceId != "" && data.lookupSourceId !="undefined"){
						debugger;
						//$('#lookupFileUoloadTable').find(".dataTables_empty").parents('tbody').empty();
						
						/* var othersClientLookup = '';
						if(othersValueMatched){
							othersClientLookup = $("#others_client_lookup").val();
							$('#others_lookup_checkbox').prop('checked', true);
							addClientOthersLookup();
						}
						else {
							othersClientLookup = "";
							$('#others_lookup_checkbox').prop('checked', false);
							addClientOthersLookup();
						} */
						var clientCrmId = '"'+data.clientCrmId+'"';
						var lookupType = '"'+$("#lookupType").val()+'"';
						//var columnData = "<td><a href='#' onClick =downloadLookupData("+clientCrmId+","+lookupType+")>"+data.fileName+"</a></td><td>"+data.createdBy+"</td><td>"+othersClientLookup+"</td>"
						var columnData = "<td><a href='#' onClick =downloadLookupData("+clientCrmId+","+lookupType+")>"+data.fileName+"</a></td><td>"+data.createdBy+"</td>";
						//var columnData = "<td><a href='#' onClick =downloadLookupData("+clientCrmId+","+lookupType+")>"+data.fileName+"</a></td><td>"+data.createdBy+"</td><td><button type='button' id='deleteLookup' onClick =confirmDeleteLookup("+clientCrmId+","+lookupType+") class='btn btn-danger btn-sm'>Delete <span class='fa fa-trash' aria-hidden='true'></span></button></td>";	
						var fileUploadData = "<tr>"+columnData+"</tr>";
						$('#lookupFileUoloadTable').find('tbody').append(fileUploadData);
						lookupFileUoloadTableCheck=true;
					}else{
						/* $("#lookupUploadErrorMsg").html("*no file found.").show();
						setTimeout(function(){
							$('#lookupUploadErrorMsg').html("");
						},3000); */
						console.log("no data found.");
					}

				}else{
					/* $("#lookupUploadErrorMsg").html("*no file found..").show();
					setTimeout(function(){
						$('#lookupUploadErrorMsg').html("");
					},2000); */
					console.log("no data found..");
				}
			},
				error: function(xhr, textStatus, errorThrow){
				$("#lookupUploadLoader").hide();
				//$("#lookupUploadErrorMsg").html("* error occured while fetch the response. kindly check with development team.").show();
				setTimeout(function(){
					$('#lookupUploadErrorMsg').html("");
				},3000);
			}
		});
		
	
	}
	
	function addLookupParent() {
	    if (document.getElementById('lookup_checkbox').checked) {
	        document.getElementById('lookup_parent').style.display = 'block';
	    } else {
	        document.getElementById('lookup_parent').style.display = 'none';
	    }
	}
	
	function resetFilterForUpdateIntegration(){
		searchFlag = false;
		$("#selectedClientNameDropdown").val("");
		$("#selectedIntegrationNameDropdown").val("");
		$("#selectedStatus").val("");
		$("#selectedIntegrationType").val("");
		$("#integrationnamedrop").empty().trigger('change');
		integrationNameForSearch = '';
		fetchIntegrationDetailsCount();
		fetchIntegrationDetails();
		searchFlag = true;
	}
	
	/* function addClientOthersLookup() {
	    if (document.getElementById('others_lookup_checkbox').checked) {
	        $("#others_client_lookup_div").show();
	    } else {
	        $("#others_client_lookup_div").hide();
	    }
	} */
	
	function downloadLookupData(clientCrmId,lookupType){
		$("#lookupUploadLoader").show();
		debugger;
		if(clientCrmId != null && clientCrmId != "" && clientCrmId !="undefined" && lookupType != null && lookupType != "" && lookupType !="undefined"){
			document.location.href ='downloadLookupData.do?clientCrmId='+clientCrmId+'&lookupType='+lookupType;
			$("#lookupUploadLoader").hide();
			$("#lookupUploadSuccessMsg").html("*lookup value downloaded successfully").show();
			setTimeout(function(){
				$('#lookupUploadSuccessMsg').html("");
			},2000);
		}else{
			$("#lookupUploadLoader").hide();
			$("#lookupUploadErrorMsg").html("* error occured while download the data. kindly check with development team.").show();
			setTimeout(function(){
				$('#lookupUploadErrorMsg').html("");
			},3000);
		}
		
	}
	
	function isNumberKey(evt) {
	    var charCode = (evt.which) ? evt.which : event.keyCode;
	    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
	    	return false;
	    }
	    return true;
	}
	
	function checksunmartechField(value){
		if($("#sunmartechcustomfield_"+value).val() != null && $("#sunmartechcustomfield_"+value).val() != "" && $("#sunmartechcustomfield_"+value).val() != "undefined") {
			document.getElementById('functionButtoncustomfield_'+value).disabled = false;
		}else{
			document.getElementById('functionButtoncustomfield_'+value).disabled = true;
		}
	}
	
	function checksunmartechFieldForMyFreshWorks(value){
		if($("#sunmartechcustomfieldformyfreshworks_"+value).val() != null && $("#sunmartechcustomfieldformyfreshworks_"+value).val() != "" && $("#sunmartechcustomfieldformyfreshworks_"+value).val() != "undefined") {
			document.getElementById('functionButtoncustomfieldformyfreshworks_'+value).disabled = false;
		}else{
			document.getElementById('functionButtoncustomfieldformyfreshworks_'+value).disabled = true;
		}
	}
	
	function goBackToPrevious() {
		  window.history.back();
	}
	
	function refreshUpdateIntegration(){
		fetchIntegrationDetailsCount();
		fetchIntegrationDetails();
	}
	
	
	
	function loadHeaderLookupValues() {
		var finalURL = "loadHeaderLookupValues.do";
		$.ajax({
			url : finalURL,
			async : false,
			success : function(result) {
				var resultValue = result.toString();
				if(resultValue != "") {
					//$("#headername").html(result);
					headerNameValue = resultValue;
				}
			}
		});
	}
	
	function loadHeaderLookupValuesForAccept() {
		var finalURL = "loadHeaderLookupValuesForAccept.do";
		$.ajax({
			url : finalURL,
			async : false,
			success : function(result) {
				var resultValue = result.toString();
				if(resultValue != "") {
					//$("#headernamevalue").html(resultValue);
					headerNameValueForAccept = resultValue;
				}
			}
		});
	}
	function loadHeaderLookupValuesForAcceptCharset() {
		var finalURL = "loadHeaderLookupValuesForAcceptCharset.do";
		$.ajax({
			url : finalURL,
			success : function(result) {
				var resultValue = result.toString();
				if(resultValue != "") {
					headerNameValueForAcceptCharset = resultValue;
				}
			}
		});
	}
	function loadHeaderLookupValuesForUserAgent() {
		var finalURL = "loadHeaderLookupValuesForUserAgent.do";
		$.ajax({
			url : finalURL,
			success : function(result) {
				var resultValue = result.toString();
				if(resultValue != "") {
					headerNameValueForUserAgent = resultValue;
				}
			}
		});
	}
	function loadHeaderLookupValuesForAcceptEncoding() {
		var finalURL = "loadHeaderLookupValuesForAcceptEncoding.do";
		$.ajax({
			url : finalURL,
			success : function(result) {
				var resultValue = result.toString();
				if(resultValue != "") {
					headerNameValueForAcceptEncoding = resultValue;
				}
			}
		});
	}
	
	
	function downloadLookupSampleHeader(){
		$("#lookupUploadLoader").show();
		document.location.href ='downloadLookupSampleHeader.do'
		$("#lookupUploadLoader").hide();
		$("#lookupUploadSuccessMsg").html("*sample lookup file downloaded successfully").show();
		setTimeout(function(){
			$('#lookupUploadSuccessMsg').html("");
		},2000);
	}
	
	function checkHeaderName(index){
		debugger;
		if($("#headername_"+index).val() == 'Accept'){
			//var $addNew = $("<div class='input-group'><select id='headername_"+compCountForHeaderFields+"' class='form-control form-control-sm' name='headername' onchange='checkHeaderName("+compCountForHeaderFields+")'></select><select id='headernamevalue_"+compCountForHeaderFields+"' class='form-control form-control-sm' name='headernamevalue'></select><span class='input-group-append'><button id='addMultipleStaticFieldTextBox' onclick='callMultipleHeaderFields()' type='button' class='btn btn-info btn-sm' title='Add More Headers'><span class='fa fa-plus' aria-hidden='true'></span></div>");
			var $addNew = $("<select id='headernamevalue_"+index+"' class='form-control form-control-sm' name='headernamevalue'></select><span class='input-group-append'></span>");
			$("#autharazationusername_"+index).replaceWith($addNew);
			$("#autharazationpassword_"+index).replaceWith('');
			$("#headernamevalue_"+index).html(headerNameValueForAccept);
		}else if($("#headername_"+index).val() == 'AcceptCharset'){
			var $addNew = $("<select id='headernamevalue_"+index+"' class='form-control form-control-sm' name='headernamevalue'></select><span class='input-group-append'></span>");
			$("#autharazationusername_"+index).replaceWith($addNew);
			$("#autharazationpassword_"+index).replaceWith('');
			
			$("#headernamevalue_"+index).html(headerNameValueForAcceptCharset);
		}else if($("#headername_"+index).val() == 'Accept-Encoding'){
			var $addNew = $("<select id='headernamevalue_"+index+"' class='form-control form-control-sm' name='headernamevalue'></select><span class='input-group-append'></span>");
			$("#autharazationusername_"+index).replaceWith($addNew);
			$("#autharazationpassword_"+index).replaceWith('');
			
			$("#headernamevalue_"+index).html(headerNameValueForAcceptEncoding);
		}else if($("#headername_"+index).val() == 'user-agent'){
			var $addNew = $("<select id='headernamevalue_"+index+"' class='form-control form-control-sm' name='headernamevalue'></select><span class='input-group-append'></span>");
			$("#autharazationusername_"+index).replaceWith($addNew);
			$("#autharazationpassword_"+index).replaceWith('');
			
			$("#headernamevalue_"+index).html(headerNameValueForUserAgent);
		}else if($("#headername_"+index).val() == 'Authorization'){
			var $addNew = $("<input type='text' placeholder='username' id='autharazationusername_"+index+"' class='form-control form-control-sm' name='headernamevalue'><input type='password' placeholder='password' id='autharazationpassword_"+index+"' class='form-control form-control-sm' name='headernamevalue'><span class='input-group-append'></span>");
			$("#headernamevalue_"+index).replaceWith($addNew);
			
		}else if($("#headername_"+index).val() == 'ContentType'){
			var $addNew = $("<select id='headernamevalue_"+index+"' class='form-control form-control-sm' name='headernamevalue'></select><span class='input-group-append'></span>");
			$("#autharazationusername_"+index).replaceWith($addNew);
			$("#autharazationpassword_"+index).replaceWith('');
			$("#headernamevalue_"+index).html(headerNameValueForAccept);
		}
	}
	
	function addStaticList(index, customField, msorValue) {
		$('#addStaticListColumns').html('');
		var type ='';
		if(customField){
			type = $("#sunmartechcustomfield_"+index).val();
			$("#staticListType").val(type);
			
		}else{
			//type = $("#msorField_"+index).val();
		}
		//$('#staticListModal').modal('show');
		var integrationId = recArr[editIndexValue].integrationId;
		//$("#staticListLoader").show();
		$.ajax({
			url:'fetchLookupUploadedForStaticList.do?integrationId='+integrationId+"&type="+type,
			success: function(data, textStatus, xhr)
			{
				debugger;
				//$("#staticListLoader").hide();
				if(data != null && data != "" && data != "[]") {
					showStaticListData(data);
				}else{
					//$('#staticListModal').modal('hide');
					$("#addNewIntegrationErrorMsg").html("* no data found..").show();
					setTimeout(function(){
						$('#addNewIntegrationErrorMsg').html("");
					},4000);
				}
			},
				error: function(xhr, textStatus, errorThrow){
				//$("#staticListLoader").hide();
				$("#addNewIntegrationErrorMsg").html("* error occured while fetch the response. kindly check with development team.").show();
				setTimeout(function(){
					$('#addNewIntegrationErrorMsg').html("");
				},3000);
			}
		});
	}
	
	function showStaticListData(data) {
		$('#staticListModal').modal('show');
		//$("#staticListLoader").show();
		if(data != null && data != "" && data != "undefined") {
			var dataArr = data.split(",");
			dataArrForSave = dataArr;
			if(dataArr.length > 0){
				for(var i=0;i<dataArr.length;i++){
					var $addNew = $("<div class='input-group'><input type='text' placeholder='Name' id='sunmartechaddStaticList_"+i+"' disabled ><input type='text' placeholder='Value' id='apiaddStaticList_"+i+"'></div>");
					$("#addStaticListColumns").append($addNew);
					$("#sunmartechaddStaticList_"+i).val(dataArr[i]);
				}
			}
		}
	}
	
	function saveStaticList(){
		debugger;
		//var sunmartechKey = $("#staticListType").val();
		var ssStaticFieldJsonObject = {};
		var staticFieldJsonObject = {};
		if(dataArrForSave.length > 0){
			for(var i=0;i<dataArrForSave.length;i++){
				if($("#apiaddStaticList_"+i).val() == ""){
					$("#staticListErrorMsg").html("* Kindly provide value for "+$("#sunmartechaddStaticList_"+i).val()).show();
					setTimeout(function(){$('#staticListErrorMsg').html("");},4000);
					return false;
				}
				staticFieldJsonObject[$("#sunmartechaddStaticList_"+i).val()] = $("#apiaddStaticList_"+i).val();
			}
		}
		ssStaticFieldJsonObject[$("#staticListType").val()] = JSON.stringify(staticFieldJsonObject);
		
		if(Object.keys(ssStaticFieldJsonObject).length > 0) {
			ssStaticFieldJsonArray.push(ssStaticFieldJsonObject);
		}
		if(ssStaticFieldJsonArray.length > 0){
			//alert(JSON.stringify(ssStaticFieldJsonArray));
			ssMultipleStaticFieldsValues=JSON.stringify(ssStaticFieldJsonArray);
		}
		$('#staticListModal').modal('hide');
	}
	
	function loadStatus() {
		var finalURL = "loadStatus.do";
		$.ajax({
			url : finalURL,
			async:false,
			success : function(result) {
				var resultValue = result.toString();
				$("#selectedStatus").html(result);
			}
		});
	}
	function loadIntegrationType() {
		var finalURL = "loadIntegrationType.do";
		$.ajax({
			url : finalURL,
			async:false,
			success : function(result) {
				var resultValue = result.toString();
				$("#selectedIntegrationType").html(result);
				$("#integrationType").html(result);
			}
		});
	}
	
	function callSaveTestLeadData(){
		debugger;
		$("#sendTestLeadLoader").show();
		document.getElementById('saveTestLeadBtn').disabled = true;
		document.getElementById('submitTestLeadBtn').disabled = true;
		var integrationId = recArr[sendTestLeadIndexValue].integrationId;
		var integrationName = recArr[sendTestLeadIndexValue].integrationDetailList.integrationname;
		$.ajax({
			url: 'saveTestLead.do?integrationId='+integrationId+"&username="+loginUserName+"&integrationName="+integrationName,
			type: "POST",
			data: $("#addsendTestLead").serialize(),
			success: function(data)
			{
				if(data == "success"){
					$("#sendTestLeadLoader").hide();
					$("#sendTestLeadSuccessMsg").html("*Test lead saved successfully").show();
					setTimeout(function(){
						$('#sendTestLeadSuccessMsg').html("");
						$('#sendtestlead').modal('hide');
						fetchIntegrationDetails();
					},3000);
				}else{
					$("#sendTestLeadLoader").hide();
					$("#sendTestLeadErrorMsg").html("* error occured while saving the test lead..").show();
					setTimeout(function(){
						$('#sendTestLeadErrorMsg').html("");
						document.getElementById('saveTestLeadBtn').disabled = false;
						document.getElementById('submitTestLeadBtn').disabled = false;
					},3000);
				}
			}
		});
	}
	
	function prefillSendTestLeadData(index){
		$("#sendTestLeadLoader").show();
		var integrationId = recArr[index].integrationId;
		var integrationName = recArr[index].integrationDetailList.integrationname;
		var deportFields = recArr[index].integrationDetailList.deportfields;
		var lookupFields = recArr[index].integrationDetailList.lookupfields;
		var staticFieldsArr = recArr[index].staticFields;
		var tableRow = {integrationId:integrationId,lookupFields:lookupFields};
		console.log(JSON.stringify(tableRow));
		
		$.ajax({
			url: 'prefillSendTestLeadData.do',
			type: "POST",
			data: encodeURIComponent(JSON.stringify(tableRow)),
			success:function(jsonData) {
				//$("#leadViewLoader").hide();
				debugger;
				$("#sendTestLeadLoader").hide();
				if(jsonData != null && jsonData != "" && jsonData != "[]") {
					jsonData = JSON.parse(jsonData);
					for(var a=0;a<jsonData.length;a++){
						if (jsonData[a].hasOwnProperty('crmRawData')) {
							var crmRawDataValues = jsonData[a].crmRawData;
						}
					}
					//alert("jsonData::"+jsonData.crmRawData.integrationname);
					//alert("jsonData::"+jsonData.crmRawData.hqphone);
					if(deportFields != null && deportFields != "" && deportFields !="undefined"){
						var deportFieldsArr = deportFields.split(',');
							 for(var i=0;i<deportFieldsArr.length;i++){
								 var fieldname = deportFieldsArr[i];
								 if(lookupValues != null && lookupValues != '' && lookupValues != 'undefined' ){
									 debugger;
									 var lookupValuesArr = lookupValues.split(',');
									 var match = lookupValuesArr.some(function(el) {
										    return el === deportFieldsArr[i];
									 });
									 if(match){
										 for(var a=0;a<jsonData.length;a++){
											 debugger;
											 if (jsonData[a].hasOwnProperty(fieldname)) {
												$("#"+fieldname+"").html(jsonData[a][fieldname]);
											}
										 }
									 }else{
										 $("#"+fieldname+"").val(crmRawDataValues[fieldname]);
									 }
								 }else{
									 $("#"+fieldname+"").val(crmRawDataValues[fieldname]);
								 }
							 }
					}
					var customfields = crmRawDataValues.customfield;
					debugger;
					if(customfields != null && customfields != "" && customfields !="undefined"){
						//var customFieldArr = JSON.parse(customfields);
						debugger;
						for(var i=0;i<customfields.length;i++){
							debugger;
							var resultJSON = customfields[i];
							$.each(resultJSON, function(k, v) {
							    //display the key and value pair
							    //alert(k + ' is ' + v);
							    $("#"+k+"").val(v);
							});
						}
					}
				}
			}
		});
	}
	
	function openLoadCampaignLimitModal() {
		$('#loadCampaignLimitModal').modal("show");
	}
	
	function loadDataForNewLimit() {
		$("#leadViewLoader").show();
		setTimeout(function() {
			fetchIntegrationDetails();
		}, 1000);
		$('#loadCampaignLimitModal').modal("hide");
		$("#leadViewLoader").hide();
	}
	
	function loadDataLimit() {
		var finalURL = "loadDataLimit.do";
		$.ajax({
			url : finalURL,
			async:false,
			success : function(result) {
				var resultValue = result.toString();
				$("#setLimit").html(result);
				
			}
		});
	}
	function fetchIntegrationDetailsForFilter(){
		fetchIntegrationDetailsCount();
		fetchIntegrationDetails();
	}
	function callFilters(){
		//console.log("triggered");
		$('#filterhandle i').toggleClass("fa-plus-circle");
		$('#filterhandle i').toggleClass("fa-minus-circle");
	}
	
	function searchintegrationName() {
	    debugger;
	    $("#integrationnamedrop").select2({
	    	ajax: {
		      delay: 1000,
		      url: 'searchintegrationName.do',
		      processResults: function (data) {
		    	  return {
		    		  results: data
			      };
			    },
		      data: function (params) {
		    	  debugger;
		    	  queryForIntegration = {
		    		integrationName: params.term,
		    		searchPage: 'update'
		        }
		    	  return queryForIntegration;
		      }
		    },
		    minimumInputLength: 3,
		    language: {
		        searching: function() {
		            return "Searching...";
		        }
		    },
		    placeholder: 'Search for datapass name',
		  });
	}
	
	function searchIntegrationData(){
		debugger;
		searchFlag = false;
		$("#integrationnamedrop").empty().trigger('change');
		var integrationName = queryForIntegration.integrationName;
		var newOption = new Option(integrationName, integrationName, false, false);
		$('#integrationnamedrop').append(newOption).trigger('change');
		if(integrationName != null && integrationName != '' && integrationName !='undefined'){
			searchIntegrationDetailsCount(integrationName);
			searchIntegrationDetails(integrationName);
		}
		searchFlag = true;
	}
	
	function searchData(){
		if(searchFlag){
			fetchIntegrationDetailsCount();
			fetchIntegrationDetails();
		}
	}
	
	function searchIntegrationDetailsCount(integrationName){
		debugger;
		selectIntegrationNameDropdownChecked = false;
		selectClientNameDropdownChecked = false;
		var fetchSize = $("#setLimit").val();
		var selectedClientName = $("#selectedClientNameDropdown").val();
		var selectedStatus = $("#selectedStatus").val();
		var selectedIntegrationType = $("#selectedIntegrationType").val();
		var integrationId = '';
		
		var arr = {clientName:selectedClientName,status:selectedStatus,integrationType:selectedIntegrationType,fetchSize:fetchSize,sequence:sequenceForQuery,integrationId:integrationId,integrationName:integrationName};
		console.log("searchIntegrationDetailsCount::"+JSON.stringify(arr));
		
		$.ajax({
			url:'fetchIntegrationDetailsCount.do',
			data:arr,
			success:function(result) {
				debugger;
				document.getElementById('totalRecords').innerHTML = result;
			}
		});
	}

	function searchIntegrationDetails(integrationName){
		selectIntegrationNameDropdownChecked = false;
		selectClientNameDropdownChecked = false;
		$("#updateInterationLoader").show();
		var fetchSize = $("#setLimit").val();
		var selectedClientName = $("#selectedClientNameDropdown").val();
		var selectedStatus = $("#selectedStatus").val();
		var selectedIntegrationType = $("#selectedIntegrationType").val();
		var integrationId = '';
		$('#updateIntegrationTable').dataTable().fnClearTable();
		
		var arr = {clientName:selectedClientName,status:selectedStatus,integrationType:selectedIntegrationType,fetchSize:fetchSize,sequence:sequenceForQuery,integrationId:integrationId,integrationName:integrationName};
		console.log("searchIntegrationDetails::"+JSON.stringify(arr));
		
		$.ajax({
			url:'fetchIntegrationDetails.do',
			data:arr,
			success:function(jsonData) {
				debugger;
				$("#updateInterationLoader").hide();
				if(jsonData != null && jsonData != "" && jsonData != "[]") {
					jsonData = JSON.parse(jsonData);
					recArr = jsonData;
					showIntegrationDetails(jsonData);
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
	
	function loadJsonFields() {
		var finalURL = "loadJsonFields.do";
		$.ajax({
			url : finalURL,
			async : false,
			success : function(result) {
				var resultValue = result.toString();
				if(resultValue != "") {
					//$("#headername").html(result);
					jsonFieldValue = resultValue;
				}
			}
		});
	}
	
	function fetchClientSpecificJsonName(){
		if($("#clientSpecificJson").val() != null && $("#clientSpecificJson").val() != "" && $("#clientSpecificJson").val() != "undefined"){
			$(".jsonFieldsTab").show();
			$(".contMappingTab").hide();
			$(".customFieldsTab").hide();
			$(".staticFieldsTab").hide();
			
			var arr = {clientSpecificJson:$("#clientSpecificJson").val()};
			console.log("clientSpecificJson::"+JSON.stringify(arr));
			$.ajax({
				url:'fetchClientSpecificJsonName.do',
				//data: encodeURIComponent(JSON.stringify(arr)),
				data:arr,
				async:false,
				success:function(data) {
					debugger;
					//$("#updateInterationLoader").hide();
					if(data != null && data != "" && data != "undefined") {
						//$('#jsonMapTable').find('tbody').empty();
						//$('#jsonMapTable').dataTable().fnClearTable();
						$("#addJsonFieldDiv").empty();
						prefillJsonFieldData(data);
					}
				}
			});
		}else{
			$(".jsonFieldsTab").hide();
			$(".contMappingTab").show();
			$(".customFieldsTab").show();
			$(".staticFieldsTab").show();
		}
	}
	
	function prefillJsonFieldData(data){
		debugger;
		if(data != null && data != "" && data != "undefined") {
			$(".jsonFieldsTab").show();
			 compCountForJsonField=0;
			 var jsonFieldsArr = data.split(",");
			 jsonFieldDataLength = jsonFieldsArr.length;
				if(jsonFieldsArr != null && jsonFieldsArr != "" && jsonFieldsArr.length > 0){
					for(var a=0;a<=jsonFieldsArr.length;a++){
						if(jsonFieldsArr[a] != null && jsonFieldsArr[a] != "" && jsonFieldsArr[a] !="undefined"){
							showJsonFieldTextBox();
							var checkMatchFound = false;
							$("#sunmartechjsonfield_"+a).val(jsonFieldsArr[a]);
							if(sunmartechJsonFields != null && sunmartechJsonFields != "") {
								var sunmartechJsonFieldArr = sunmartechMandatoryFields.split(",");
								for(var x=0;x<=sunmartechJsonFieldArr.length;x++){
									if(jsonFieldsArr[a] == sunmartechJsonFieldArr[x]){
										$("#jsonsunmartechnamevalue_"+a).val(jsonFieldsArr[a]);
										//document.getElementById('functionButtonjsonfield_'+a).disabled = false;
										checkMatchFound = true;
									}
								}
							}
							if(!checkMatchFound){
								$("#jsonsunmartechnamevalue_"+a).html(jsonFieldValue);
							}
						}
					}
				}
		 }else{
			 $(".jsonFieldsTab").hide();
		 }
	}
	
	function disableDatapassButton(){
		document.getElementById('updateIntegrationBtn').disabled = true;
		document.getElementById('completeIntegrationBtn').disabled = true;
	}
	function enableDatapassButton(){
		document.getElementById('updateIntegrationBtn').disabled = false;
		document.getElementById('completeIntegrationBtn').disabled = false;
	}
	
	function resetFieldValues(){
		compCountForCustomField=0;
		compCountForStaicField=0;
		validationValue='';
		csfValidationValue=0;
		validationJsonArray = [];
		isCustomField = false;
		editIndexValue = 0;
		sendTestLeadIndexValue=0;
		defaultValidationValue='';
		lookupFieldsExactMatchArray = [];
		lookupFieldsPhraseMatchArray = [];
		lookupFileUoloadTableCheck = false;
		showHideButton=false;
		defaultLookupField='';
		lookupField='';
		compCountForMyFreshWorksCustomField=0;
		isCustomFieldForMyFreshWorks = false;
		checkCustomTabEnable = false;
		compCountForHeaderFields=0;
		callHeaderField = true;
		dataArrForSave = [];
		ssStaticFieldJsonArray = [];
		ssMultipleStaticFieldsValues='';
		lookupValueForMatch='';
		lookupValueForPhraseMatch='';
		indexForDiscard = 0;
		lookupValues = '';
		compCountForJsonField=0;
		jsonFieldDataLength=0;
		clientSpecificJsonMapping='';
	}

</script>

</head>

<body>
<!-- Header Starts -->
<header>

<input type="hidden" id="hiddenIntegrationId" name="hiddenIntegrationId" value="">
<input type="hidden" id="hiddenMsorValue" name="hiddenMsorValue" value="">
<div class="container-fluid">
		<nav class="navbar navbar-expand-lg navbar-default fixed-top py-0 p-2">
		<!-- Logo and Mobile Toggle Icon Start -->
			<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 navbar-header px-2">
				<button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="sr-only">Toggle navigation</span>
					<span class="navbar-toggler-icon"></span>
				</button>
				<a href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<img src="${pageContext.request.contextPath}/resources/images/sunmartech.png" class="dcHdrLogo">
				</a>
				<%-- <a class="navbar-brand nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					 <object type="image/svg+xml" data="${pageContext.request.contextPath}/resources/images/dc_logo_header.svg" class="dcHdrLogo">
						DemandCentr Logo
					</object>
				</a> --%>
				<div id="divDrpDownMenuItem">
				
				</div>
			</div>
			<!-- Logo and Mobile Toggle Icon Ends -->
			<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 text-center pgTitle">SMT LeadSender <span id="titleHeading"></span></div>
			<!-- Right Nav and other content for toggling -->
			<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 paddLR0">
				<div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
					<div class="logNameIn text-right">
	    				Welcome, <span id="userName">${fullName}</span>&nbsp; | <a href="${pageContext.request.contextPath}/logout.do" class="signOut" title="logout" id="logout">Log out</a><br><span class="dateTime"><%java.text.DateFormat df = new java.text.SimpleDateFormat("EEEEE, MMMMM dd yyyy | hh:mma z"); %><%= df.format(new java.util.Date()) %></span>
			    	</div>
				</div>
			</div>
		</nav>
	</div>
</header>
<!-- Header Ends -->

<div class="container-fluid">
<div class="row">
	<div id="refreshTimerMsg" class="col-md-12 error_msg text-center"></div>
</div>
	<!-- Datatable Block Starts-->
	<div id="leadDatatableBlk" class="row mt-4">
		<div class="col-md-12">
			<fieldset class="fieldset shadow-sm">
				<div class="col-md-12">
					<!-- Filter Buttons Row Starts -->
					<div class="row">
						<div class="col-md-3 text-left">
									    <a id="filterhandle" class="btn btn-info btn-sm btn-expand" data-toggle="collapse" role="button" aria-expanded="false" href="#collapse-filters-crm" onclick="callFilters()">
									      Filters &nbsp; <i class="fa fa-plus-circle" aria-hidden="true"></i> 
									    </a>
						</div>
						 <div class="col-md-9">
						  	<span id="refreshFilterbtnRow" class="refreshTable"><button id="refreshFilterBtn" type="button" class="btn greenbtn btn-sm" onClick="refreshUpdateIntegration()"><i class="fa fa-refresh" aria-hidden="true"></i> Refresh</button></span>
							<span id="filterbtnRow"><button id="resetFilterBtn" type="button" class="btn btn-primary btn-sm" onClick="resetFilterForUpdateIntegration()"><i class="fa fa-refresh" aria-hidden="true"></i> Reset Filters</button></span>
							<button type="button" class="btn btn-info btn-sm mx-1" id="loadPrev" title="Load Previous Records"><span class="fa fa-angle-double-left fa-lg" aria-hidden="true"></span> Load Prev</button>
							<button type="button" class="btn btn-info btn-sm ml-1" id="loadNext" title="Load Next Records">Load Next <span class="fa fa-angle-double-right fa-lg" aria-hidden="true"></span></button>
							<a href="#"  id="pageValue" class="badge"  onclick="openLoadCampaignLimitModal()">P1</a>
							<span class="totalBadge">Total <span class="badge" id="totalRecords">0</span></span>
						</div>
					</div>
					<!-- Filter Buttons Row Ends -->
					<!-- Loader and Message Row Starts -->
					<div class="row mb-2" id="updateInterationLoader">
						<div class="col-md-12 d-flex align-items-center justify-content-center text-success my-2">
							<i class="fa fa-spinner fa-pulse fa-2x fa-fw mr-1"></i> Please Wait...
						</div>
					</div>
					<div class="row">
						<div id="updateIntegrationErrorMsg" class="col-md-12 msgError text-center"></div>
					</div>
					
					<div class="row">
						<div id="updateIntegrationSuccessMsg" class="col-md-12 success_msg text-center"></div>
					</div>
					
					<!-- Loader and Message Row Ends -->
					<!-- Level Filter Row Starts -->
					<div class="row topFilter mt-2">
						<div class="col-md-12 shadow-sm">
							<form id="updateIntegrationFilter">
								
								<div id="collapse-filters-crm" class="collapse row mb-2 mt-2">
									<div class="col-md-3">
										<div class="form-group mb-0">
											<label for="clientNameDropdown">Client Name</label>
												<div class="row">
													<div id="clientNameDropdownDiv" class="col-md-10 pr-0">
														<div class="input-group input-group-sm">
															<input type="text" name="selectedClientName" class="form-control" id="selectedClientNameDropdown" placeholder="Select Client Name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="10,20" readonly>
															<div class="input-group-append">
																<button type="button" class="btn btn-outline-success" id="clientNameDropdownButton" onClick="displayClientNameDropdown()"><span id="orderImage" class="fa fa-arrow-circle-down" aria-hidden="true"></span></button>
																<div id="clientNameDropdownMultiSelectParent" class="dropdown-menu dropdown-menu-right p-0">
																	<div class="dropdown-item p-0"><input type="text" class="form-control form-control-sm" placeholder="Type Client Name To Search" id="clientNameDropdownSearch" onkeyUp="filterClientNameDropdown()"><span class="fa fa-search errspan"></span></div>
																	<div role="separator" class="dropdown-divider"></div>
																	<div id="clientNameDropdownMultiSelect" class="pre-scrollable"></div>
																</div>
															</div>
														</div>
													</div>
													<div class="col-md-1">
														<span id="clientNameDropdownSpin" class="text-success"><i class="fa fa-spinner fa-pulse fa-lg fa-fw"></i></span>
													</div>
												</div>
										</div>
									</div>
									<div class="col-md-3">
										<div class="form-group mb-0">
											<label for="integrationNameDropdown">Datapass Name</label>
												<div class="row">
													<!-- <div id="integrationNameDropdownDiv" class="col-md-10 pr-0">
														<div class="input-group input-group-sm">
															<input type="text" name="selectedIntegrationName" class="form-control" id="selectedIntegrationNameDropdown" placeholder="Select Datapass Name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="10,20" readonly>
															<div class="input-group-append">
																<button type="button" class="btn btn-outline-success" id="integrationNameDropdownButton" onClick="displayIntegrationNameDropdown()"><span id="orderImage" class="fa fa-arrow-circle-down" aria-hidden="true"></span></button>
																<div id="integrationNameDropdownMultiSelectParent" class="dropdown-menu dropdown-menu-right p-0">
																	<div class="dropdown-item p-0"><input type="text" class="form-control form-control-sm" placeholder="Type Datapass Name To Search" id="integrationNameDropdownSearch" onkeyUp="filterIntegrationNameDropdown()"><span class="fa fa-search errspan"></span></div>
																	<div role="separator" class="dropdown-divider"></div>
																	<div id="integrationNameDropdownMultiSelect" class="pre-scrollable"></div>
																</div>
															</div>
														</div>
													</div> -->
													
													<div class="col-md-12">
														<!-- <select id="fileUpldIntgName" name="fileUpldIntgName" class="form-control">
																	
														</select> -->
														
														<div id="integrationNameDiv" class="col-md-12">
														<div class="input-group input-group-sm">
							                               <select id="integrationnamedrop" class="form-control" onchange="searchData()" style="width:600px;" >
															</select>
															<span class="fa fa-search dpn-search-icon2" aria-hidden="true" onclick="searchIntegrationData()"></span>
														
															</div>
														</div> 
													</div>
													
												</div>
										</div>
									</div>
										<div class="col-md-3">
										<div class="form-group">
											<label for="selectedStatus">Status</label>
											<select id="selectedStatus" name="selectedStatus" class="form-control form-control-sm" onchange="fetchIntegrationDetailsForFilter()">
											</select>
										</div>
									</div>
									<div class="col-md-3">
										<div class="form-group">
											<label for="selectedIntegrationType">Datapass Type</label>
											<select id="selectedIntegrationType" name="selectedIntegrationType" class="form-control form-control-sm" onchange="fetchIntegrationDetailsForFilter()">
											</select>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
			<!-- Level Filter Row Ends -->

			<!-- Update Integration Table Row Starts -->
					
					<div class="row">
						<div class="table-responsive col-md-12 mt-3">
							<table id="updateIntegrationTable" data-page-length="10" class="display nowrap darkTable table table-striped table-bordered table-sm box-shadow">
								<thead>
									<tr>
										<th>S No.</th>
										<th>Client Name</th>
										<th>Datapass Name</th>
										<th>Datapass Type</th>
										<th>Edit</th>
										<th>Status</th>
										<th>Send Test Lead</th>
										<th>Deploy</th>
										<th>Export Header</th>
										<th>Clone</th>
										<th>Action</th>
										<th>Review Test Response</th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
					</div>
					<!-- Update Integration Table Row Ends -->
				</div>
			</fieldset>
		</div>
	</div>
	<!-- Datatable Block Ends-->
</div>

<!-- Add New Customer Modal Starts -->
<div class="modal fade bs-example-modal-lg" id="newCustomerModal" tabindex="-1" role="dialog" aria-labelledby="newCutomerModalLabel" data-keyboard="false" data-backdrop="static">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<form id="addClient" class="form-horizontal">
			
				<div class="modal-header">
				<h4 class="modal-title" id="newCutomerModalLabel"><i class="fa fa-user-plus fa-lg" aria-hidden="true"></i> Update Datapass</h4>
					<button type="button" onclick="closeAddNewIntegrationModel()" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					
				</div>
				<div class="modal-body">
					<div class="row margB10" id="addNewCustomerLoader">
						<div class="col-md-12 text-center msgSuccess"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>
					</div>
					<div class="row">
						<div id="addNewIntegrationErrorMsg" class="col-md-12 error_msg text-center"></div>
					</div>
					<div class="row">
						<div id="addNewIntegrationSuccessMsg" class="col-md-12 success_msg text-center"></div>
					</div>
					
					<input type="hidden" id="lookup_fields" name="lookup_fields">
					<input type="hidden" id="source_mapping" name="source_mapping">
					<input type="hidden" id="msor_fields" name="msor_fields">
					<input type="hidden" id="destination_mapping" name="destination_mapping">
					<input type="hidden" id="acquiro_source_mapping" name="acquiro_source_mapping">
					<input type="hidden" id="acquiro_destination_mapping" name="acquiro_destination_mapping">
					
					<div class="row" id="tabMsgDiv">
						<div class="col-md-12">
							<div id="tabMsg" class="alert"></div>
						</div>
					</div>
			 		<div class="row">
						<div class="col-md-12">
							<!-- Nav tabs -->
							<ul class="nav " id="myTab" role="tablist">
								<li role="presentation" class="nav-item"><a href="#general" class="nav-link active" aria-controls="general" role="tab" data-toggle="tab">General</a></li>
								<li role="presentation" class="nav-item"><a href="#output" class="nav-link" aria-controls="output" role="tab" data-toggle="tab">Output</a></li>
								<li role="presentation" class="nav-item contMappingTab"><a href="#contMapping" class="nav-link" aria-controls="contMapping" role="tab" data-toggle="tab">Mapping</a></li>
								<li role="presentation" class="nav-item customFieldsTab"><a href="#customFields"  class="nav-link" aria-controls="customFields" role="tab" data-toggle="tab">Custom Fields</a></li>
								<li role="presentation" class="nav-item customFieldsTabForMyFreshWorks"><a href="#myFreshWorksCustomFields"  class="nav-link" aria-controls="myFreshWorksCustomFields" role="tab" data-toggle="tab">MyFreshWorks Custom Fields</a></li>
								<li role="presentation" class="nav-item staticFieldsTab"><a href="#staticFields" class="nav-link"  aria-controls="staticFields" role="tab" data-toggle="tab">Hidden Fields</a></li>
								<li role="presentation" class="nav-item jsonFieldsTab"><a href="#jsonFields" class="nav-link"  aria-controls="jsonFields" role="tab" data-toggle="tab">JSON Fields</a></li>
								<li role="presentation" class="nav-item advanceLookupFieldsTab"><a href="#advanceLookupFields"  class="nav-link" aria-controls="advanceLookupFields" role="tab" data-toggle="tab">Advance Lookup</a></li>
								<li role="presentation" class="nav-item customFieldsTabForHeaderFields"><a href="#headerFields" class="nav-link"  aria-controls="headerFields" role="tab" data-toggle="tab">Header Fields</a></li>
							</ul>
							<!-- Tab panes -->
							<div class="tab-content">
								<div role="tabpanel" class="tab-pane active" id="general">
									<div class="row">
										<div class="col-md-12 margT10">
											<div class="form-group">
												<div class="row">
													<label for="clientName" class="col-md-3 control-label">Client Name</label>
												<div class="col-md-9 selCombo">
               										<select name="clientName" id="clientName" class="form-control">
               											 <option value="">Select Client Name</option>
               										</select>
               									</div>
												</div>
											</div>
											<div class="form-group" style="margin-bottom: 0;">
											<div class="row">
												<label for="integrationName" class="col-md-3 control-label">Datapass Name</label>
												<div class="col-md-9">
													<input type="text" class="form-control" id="integrationName" name="alias" placeholder="Enter Datapass Name">
													<label id="alias-error" class="error" for="alias"></label>
												</div>
											</div>	
											</div>
											<div class="form-group">
												<div class="row">
												<label for="integrationType" class="col-md-3 control-label">Datapass Type</label>
												<div class="col-md-9">
													<select id="integrationType" name="type" class="form-control">
													</select>
												</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div role="tabpanel" class="tab-pane" id="output">
									<div class="row">
										<div class="col-md-12 margT10">
											<div id="soap_client_div">
												<div class="form-group">
												<div class="row">
													<label for="usernameOutput" class="col-md-3 control-label">Username</label>
													<div class="col-md-9">
														<input type="text" class="form-control" id="usernameOutput" name="destination_login" placeholder="Enter User Name">
													</div>
													</div>
												</div>
												<div class="form-group">
												<div class="row">
													<label for="passwordOutput" class="col-md-3 control-label">Password</label>
													<div class="col-md-9">
														<input type="password" class="form-control" id="passwordOutput" name="destination_password" placeholder="Enter Password">
													</div>
													</div>
												</div>
											</div>
											
											<div id="rest_client_div">
												<div class="form-group">
												<div class="row">
													<label for="descriptionInput" class="col-md-3 control-label">Rest Identity URL</label>
													<div class="col-md-9">
													<div class="row">
														<div class="col-sm-12 col-md-12" id="restIdentity_dev">
														<input type="text" class="form-control" id="restIdentityUrl" name="destination_restidentity_url" placeholder="Enter Rest Identity URL">
														</div>
														<div class="col-sm-12 col-md-12 pl-1" id="oauth_div">
														<input type="text" class="form-control" id="oauth" name="oauth">
														</div>
														</div>
													</div>
												</div>	
												</div>
												<div id="rest_identity_div">
												<div class="form-group">
												<div class="row">
													<label for="clientId" class="col-md-3 control-label">Client Id</label>
													<div class="col-md-9">
														<input type="text" class="form-control" id="clientId" name="clientId" placeholder="Enter Client Id">
													</div>
													</div>
												</div>
												<div class="form-group">
												<div class="row">
													<label for="clientSecret" class="col-md-3 control-label">Client Secret</label>
													<div class="col-md-9">
														<input type="text" class="form-control" id="clientSecret" name="clientSecret" placeholder="Enter Client Secret">
													</div>
													</div>
												</div>
											</div>
											</div>
											<div class="form-group">
											<div class="row">
												<label for="endpointUrlOutput" class="col-md-3 control-label">Endpoint URL</label>
												<div class="col-md-9">
													<div class="row">
														<div class="col-sm-12 col-md-12" id="endpoint_dev">
															<input type="text" class="form-control" id="endpointUrlOutput" name="destination_endpoint_url" placeholder="Enter Endpoint URL">
														</div>
														<div class="col-sm-12 col-md-12 pl-1" id="accesstoken_div">
															<input type="text" class="form-control" id="accessToken" name="accessToken">
														</div>
													</div>
												</div>
											</div>
										</div>
										<div id="myfreshwork_div">
												<div class="form-group">
												<div class="row">
													<label for="apikey" class="col-md-3 control-label">Api Key</label>
													<div class="col-md-9">
														<input type="text" class="form-control" id="apikey" name="apikey" placeholder="Enter Api Key">
													</div>
													</div>
												</div>
										</div>
										<div class="form-group">
												<div class="row">
													<label for="staticListEndPointUrl" class="col-md-3 control-label">Static List End Point URL</label>
													<div class="col-md-9">
														<input type="text" class="form-control" id="staticListEndPointUrl" name="staticListEndPointUrl" placeholder="Enter Static List End Point URL">
													</div>
												</div>	
									   </div>
											<div id="sftp_client_div">
												<div class="form-group">
												<div class="row">
													<label for="sftphost" class="col-md-3 control-label">Host</label>
													<div class="col-md-9">
														<input type="text" class="form-control" id="sftphost" name="sftphost" placeholder="Enter Sftp Host Name">
													</div>
													</div>
												</div>
												<div class="form-group">
												<div class="row">
													<label for="sftpport" class="col-md-3 control-label">Port</label>
													<div class="col-md-9">
														<input type="text" class="form-control" id="sftpport" name="sftpport" placeholder="Enter Sftp Port Name">
													</div>
													</div>
												</div>
												<div class="form-group">
												<div class="row">
													<label for="sftpuser" class="col-md-3 control-label">Username</label>
													<div class="col-md-9">
														<input type="text" class="form-control" id="sftpuser" name="sftpuser" placeholder="Enter Sftp UserName">
													</div>
													</div>
												</div>
												<div class="form-group">
												<div class="row">
													<label for="sftppass" class="col-md-3 control-label">Password</label>
													<div class="col-md-9">
														<input type="password" class="form-control" id="sftppass" name="sftppass" placeholder="Enter Sftp Password">
													</div>
													</div>
												</div>
												<div class="form-group">
												<div class="row">
													<label for="sftpworkingdir" class="col-md-3 control-label">Directory</label>
													<div class="col-md-9">
														<input type="text" class="form-control" id="sftpworkingdir" name="sftpworkingdir" placeholder="Enter Sftp Directory">
													</div>
													</div>
												</div>
											</div>	
																						
											<!-- <div class="form-group">
											<div class="row">
												<label for="postProcessType" class="col-md-3 control-label">Post Process Type</label>
												<div class="col-md-9">
													<input type="text" class="form-control" id="postProcessType" name="postProcessType" disabled>
												</div>
												</div>
											</div> -->
											<div class="form-group">
												<div class="row">
													<label for="successPhrase" class="col-md-3 control-label">Success Phrase</label>
													<div class="col-md-9">
														<textarea name="comment" class="form-control" id="successPhrase" placeholder="Enter Success Phrase"></textarea>
													</div>
													</div>
											</div>
											<div id="clientSpecificJson_div">
												<div class="form-group">
													<div class="row">
														<label for="clientSpecificJson" class="col-md-3 control-label">Client Specific JSON</label>
														<div class="col-md-9">
															<textarea name="clientSpecificJson" class="form-control" id="clientSpecificJson" placeholder="Enter Client Specific JSON" rows="5"></textarea>
														</div>
														</div>
												</div>
											</div>
											<div id="record_time_delay_div">
												<div class="form-group">
												<div class="row">
													<label for="recordTimeDelay" class="col-md-3 control-label">Record Time Delay(Milliseconds)</label>
													<div class="col-md-9">
														<input type="number" class="form-control" id="recordTimeDelay" name="recordTimeDelay" placeholder="Enter Record Time Delay In Milliseconds">
													</div>
													</div>
											</div>
											</div>
										</div>
									</div>
								</div>
								<div role="tabpanel" class="tab-pane" id="contMapping">
									<div class="row">
										<div class="col-md-12 margT10">
											<div class="table-responsive">
												<table id="contMap" class="margBNone table table-bordered table-condensed table-striped">
													<thead>
														<tr>
															<th class="tHeadBlue">SMT LeadSender Fields</th>
															<th class="tHeadBlue">Output</th>
															<th class="tHeadBlue">Mandatory</th>
															<th class="tHeadBlue">Formatting</th>
															<th class="tHeadBlue">Lookups</th>
															<th class="sep"></th>
															<th class="tHeadBlue">SMT LeadSender Fields</th>
															<th class="tHeadBlue">Output</th>
															<th class="tHeadBlue">Mandatory</th>
															<th class="tHeadBlue">Formatting</th>
															<th class="tHeadBlue">Lookups</th>
															<th class="sep"></th>
														</tr>
													</thead>
													<tbody>
														
													</tbody>
												</table>
											</div>	
										</div>
									</div>
								</div>
								<div role="tabpanel" class="tab-pane" id="customFields">
									<div class="row">
										<div class="col-md-12 margT10">
											<button type="button" id="addCustomField" onclick="showCustomFieldTextBox()" class="btn btn-primary btn-sm" style='margin-right: 10px'> Add Custom Fields <span class="fa fa-plus"></span></button>	
										
											<div id="addCustomFieldDiv"></div>
											<div id="addMultipleCustomFieldDiv"></div>
										</div>
									</div>
								</div>
								<div role="tabpanel" class="tab-pane" id="myFreshWorksCustomFields">
									<div class="row">
										<div class="col-md-12 margT10">
											<button type="button" id="addCustomFieldForMyFreshWorks" onclick="showCustomFieldTextBoxForMyFreshWorks()" class="btn btn-primary btn-sm" style='margin-right: 10px'> Add Custom Fields For MyFreshWorks<span class="fa fa-plus"></span></button>	
										
											<div id="addCustomFieldDivForMyFreshWorks"></div>
											<div id="addMultipleCustomFieldDivForMyFreshWorks"></div>
										</div>
									</div>
								</div>
								<div role="tabpanel" class="tab-pane" id="staticFields">
									<div class="row">
										<div class="col-md-12 margT10">
											<button type="button" id="addStaticField" onclick="showStaticFieldTextBox()" class="btn btn-primary btn-sm" style='margin-right: 10px'> Add Hidden Fields <span class="fa fa-plus"></span></button>	
											
											<div id="addStaticFieldDiv"></div>
											<div id="addMultipleStaticFieldDiv"></div>
										</div>
									</div>
								</div>
								<div role="tabpanel" class="tab-pane" id="advanceLookupFields">
									<div class="row">
										<div class="col-md-9">
											<span class='text-muted custom-tooltip' data-animation='true' data-toggle='tooltip' data-placement='top'><i class='fa fa-question-circle-o' aria-hidden='true'><span class='tooltiptext'>*Apply lookup for specific conditions. eg.-  if we want country and state lookup is only applied when country value is United States. Then we must provide Json value on advance lookup [{"country":[{"United States":"country--state"}]}].</span></i></span>
											<textarea name="advanceLookup" class="form-control" id="advanceLookup" placeholder='Expression (eg. [{"key":[{"value":"parent--child lookup"}]},{"key":[{"value":"parent--child lookup"}]}] )' title='Expression (eg. [{"key":[{"value":"parent--child lookup"}]},{"key":[{"value":"parent--child lookup"}]}] )' rows="6"></textarea>
										</div>
									</div>
								</div>
								<div role="tabpanel" class="tab-pane" id="jsonFields">
									<div class="row">
										<div class="col-md-12 margT10">
											<table id="jsonMapTable" class="margBNone table table-bordered table-condensed table-striped">
													<tr>
													<th width="300px">Json Fields</th>
													<th width="300px">SMT LeadSender Fields</th>
													<th width="50px">Mandatory</th>
													<th width="100px">Formatting</th>
													<th width="100px">Lookups</th>
													</tr>
													<tbody id="addJsonFieldDiv">
													
													</tbody>
												</table>
										</div>
									</div>
								</div>
								<div role="tabpanel" class="tab-pane" id="headerFields">
									<div class="row">
										<div class="col-md-12 margT10">
											<div id="addHeaderFieldsDiv"></div>
											<div id="addMultipleHeaderFieldsDiv"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button id="closeBtn" onclick="closeAddNewIntegrationModel()" type="button" class="btn btn-default bdRadNone smtleadsender-blue-btn mr-0" >Close</button>
					<button id="nextBtn" type="button" class="btn btn-blue greenbtn mr-0">Next <i class="fa fa-forward" aria-hidden="true"></i></button>
					<button id="updateIntegrationBtn" onClick="updateIntegration()" type="button" class="btn btn-blue bluebtn mr-0">Update Datapass</button>
					<button id="completeIntegrationBtn" onClick="completeIntegration()" type="button" class="btn btn-blue yellowbtn mr-0">Complete Datapass</button>
				</div>
			</form>
		</div>
	</div>
</div>
<!-- Add New Customer Modal Ends -->

<!-- Add sendtestlead Starts -->
<div class="modal fade bs-example-modal-lg" id="sendtestlead" tabindex="-1" role="dialog" aria-labelledby="newCutomerModalLabel" data-keyboard="false" data-backdrop="static">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<form id="addsendTestLead" class="form-horizontal">
				<div class="modal-header test-head">
					<h4 class="modal-title" id="newCutomerModalLabel">Send Test Lead</h4>
					<button type="button" onclick="closeSendTestLeadModel()" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				</div>
				<div class="row margB10" id="sendTestLeadLoader">
						<div class="col-md-12 text-center msgSuccess"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>
					</div>
					<div class="row">
						<div id="sendTestLeadErrorMsg" class="col-md-12 error_msg text-center"></div>
					</div>
					<div class="row">
						<div id="sendTestLeadSuccessMsg" class="col-md-12 success_msg text-center"></div>
					</div>
				<div class="modal-body">
			 		<div class="row">
						<div class="col-md-12">
							<!-- Nav tabs -->
							
							<!-- Tab panes -->
							<div class="tab-content">
								<div role="tabpanel" class="tab-pane active" id="general">
									<div class="row">
										<div class="col-md-12 margT10">
											<div id="sendTestLeadDiv"></div>
											
										</div>
									</div>
								</div>	
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button id="closeBtn" onclick="closeSendTestLeadModel()" type="button" class="btn btn-default bdRadNone btn-c smtleadsender-blue-btn" data-dismiss="modal">Close</button>
					<button id="saveTestLeadBtn"  onclick="callSaveTestLeadData()" type="button" class="btn btn-blue btn-s yellowbtn">Save </button>
					<button id="submitTestLeadBtn"  onclick="callSendTestLeadData()" type="button" class="btn btn-blue btn-s greenbtn">Submit </button>
					<button id="resetbtn" onClick="resetSendTestLeadData()" type="button" class="btn btn-blue btn-r yellowbtn">Reset</button>
				</div>
			</form>
		</div>
	</div>
</div>
<!-- Add sendtestlead Modal Ends -->
<!-- Review Test Model Starts -->
<div class="modal fade bs-example-modal-lg" id="reviewTestResponse" tabindex="-1" role="dialog" aria-labelledby="reviewTestResponseModelLabel" data-keyboard="false" data-backdrop="static">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<form id="reviewTestResponseForm" class="form-horizontal">
				<div class="modal-header test-head">
					<h4 class="modal-title" id="reviewTestResponseLabel">Review Test Response</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				</div>
				<div class="row margB10" id="reviewTestResponseLoader">
						<div class="col-md-12 text-center msgSuccess"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>
					</div>
					<div class="row">
						<div id="reviewTestResponseErrorMsg" class="col-md-12 error_msg text-center"></div>
					</div>
					<div class="row">
						<div id="reviewTestResponseSuccessMsg" class="col-md-12 success_msg text-center"></div>
					</div>
				<div class="modal-body">
			 		<div class="row">
						<div class="col-md-12">
							<!-- Nav tabs -->
							
							<!-- Tab panes -->
							<div class="tab-content">
								<div role="tabpanel" class="tab-pane active" id="general">
									<div class="row">
										<div class="col-md-12 margT10">
											<div class="form-group">
												<div class="row">
													<label for="testRequest" class="col-md-3 control-label">Request</label>
													<div class="col-md-9 selCombo">
	               										<textarea id="testRequest" name="testRequest" class="form-control form-control-sm" rows="4" cols="50" disabled>
	               										</textarea>
	               									</div>
               									</div>
											</div>
											<div class="form-group">
												<div class="row">
												<label for="testResponse" class="col-md-3 control-label">Response</label>
												<div class="col-md-9">
													<textarea id="testResponse" name="testResponse" class="form-control form-control-sm" rows="4" cols="50" disabled>
	               									</textarea>
													
												</div>
												</div>
											</div>
											
										</div>
									</div>
								</div>	
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
<!-- Review Test Model Ends -->

<!-- Contact CLS Modal Starts -->
<div class="modal fade bs-example-modal-lg" id="contMapCsfModal" tabindex="-1" role="dialog" aria-labelledby="contMapCsfModalLabel" data-keyboard="false" data-backdrop="static">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<form id="fileUpload" class="form-horizontal">
				<input type="hidden" id="validationhidden" name="validationhidden" value="">
				
				<div class="modal-header modal-header-info">
					<h4 class="modal-title" id="contMapCsfModalLabel"><i class="fa fa-address-book fa-lg" aria-hidden="true"></i> Client Specific Validation</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="closeClientValidationPopUp" onclick="closeCSVModel()"><span aria-hidden="true">&times;</span></button>
				</div>
				<div class="modal-body">
					<div class="row margB10" id="validationLoader">
						<div class="col-md-12 text-center msgSuccess"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>
					</div>
					<div class="row">
						<div id="csvErrorMsg" class="col-md-12 error_msg text-center"></div>
					</div>
					<div class="row">
						<div id="csvSuccessMsg" class="col-md-12 success_msg text-center"></div>
					</div>
					
					<div class="row">
						<div class="col-md-12 margTB10">
							<!-- <div class="form-group">
								<label for="funcFormat" class="col-md-4 control-label">Functional Validation</label>
								<div class="col-md-8">
									<select id="funcFormat" name="funcFormat" class="form-control">
										
									</select>
									<div id="validationDiv" class="col-md-10 pr-0">
										<div class="input-group input-group-sm">
											<input type="text" name="selectedValidation" class="form-control" id="selectedValidation" placeholder="Select Functional Validation" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="10,20" readonly>
											<div class="input-group-append">
												<button type="button" class="btn btn-outline-success" id="validationDropdownButton" onClick="displayCSV()"><span id="orderImage" class="fa fa-arrow-circle-down" aria-hidden="true"></span></button>
												<div id="validationMultiSelectParent" class="dropdown-menu dropdown-menu-right p-0">
													<div class="dropdown-item p-0"><input type="text" class="form-control form-control-sm" placeholder="Type Validation To Search" id="validationSearch" onkeyUp="filterCSV()"><span class="fa fa-search errspan"></span></div>
													<div role="separator" class="dropdown-divider"></div>
													<div id="validationMultiSelect" class="pre-scrollable"></div>
												</div>
											</div>
										</div>
									</div>
									<div class="col-md-1">
										<span id="validationSpin" class="text-success" style="display:none;"><i class="fa fa-spinner fa-pulse fa-lg fa-fw"></i></span>
									</div> 
								</div>
							</div> -->
							<div class="form-group">
								<!-- <label for="selectFile" class="col-md-4 control-label">Expression</label>
								<div class="col-md-8">
									<textarea class="form-control" rows="5" placeholder="Enter Expression" id="expession"></textarea>
								</div> -->
								<div class="col-md-12 margT10">
											<div class="table-responsive">
												<table id="checkValidationTable" class="margBNone table table-bordered table-condensed table-striped">
													<thead>
														<tr>
															<th class="tHeadBlue">Select</th>
															<th class="tHeadBlue">Function</th>
															<th class="tHeadBlue">Expression</th>
														</tr>
													</thead>
													<tbody>
														
													</tbody>
												</table>
											</div>	
								</div>
								
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button id="closeClientValidationBtn" type="button" onclick="closeCSVModel()" class="btn btn-default bdRadNone smtleadsender-blue-btn" data-dismiss="modal">Close</button>
					<button id="fileUploadBtn" type="button" class="btn btn-info bdRadNone greenbtn" onclick="saveValidation()">Save Validation</button>
				</div>
			</form>
		</div>
	</div>
</div>

<div class="modal fade bs-example-modal-lg" id="lookupUploadModal" tabindex="-1" role="dialog" aria-labelledby="lookupUploadModalLabel" data-keyboard="false" data-backdrop="static">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<form id="lookupFileUpload" class="form-horizontal">
				<input type="hidden" name="lookupType" id="lookupType" />
				<!-- <input type="hidden" name="lookup_fields" id="lookup_fields" /> -->
			
				<div class="modal-header">
					<h4 class="modal-title" id="lookupUploadModalLabel"><i class="fa fa-upload fa-lg" aria-hidden="true"></i> Apply Lookup</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="closeFileUploadPopUp"><span aria-hidden="true">&times;</span></button>
				</div>
				<div class="modal-body">
					<div class="row margB10" id="lookupUploadLoader">
						<div class="col-md-12 text-center msgSuccess"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>
					</div>
					<div class="row">
						<div id="lookupUploadErrorMsg" class="col-md-12 error_msg text-center"></div>
					</div>
					<div class="row">
						<div id="lookupUploadSuccessMsg" class="col-md-12 success_msg text-center"></div>
					</div>
				
					<div class="row">
						<div class="col-md-12 margTB10">
							<div class="form-group">
								<label for="matchingCriteria">Matching Criteria</label>
								<select id="selectedMatchingCriteria" name="selectedMatchingCriteria">
									<option value="">------select from list------</option>
									<option value="exact_match">Exact Match</option>
									<option value="phrase_match">Phrase Match</option>
								</select>
							</div>
							<div class="form-group">
								
								<label for="checkParentForLookupUpload"><input type="checkbox" id="lookup_checkbox" onClick="addLookupParent()" name="lookup_checkbox"> Please check to Enter Parent</label>
								<div>
									
									<input type="text" id="lookup_parent" name="lookup_parent" placeholder="Enter Parent">
								</div>
							</div>
							<div class="form-group">
								<div>
									<button type="button" id=lookupSampleHeader onClick="downloadLookupSampleHeader()" class="btn btn-primary btn-sm">Export Sample Lookup Header <span class="fa fa-download" aria-hidden="true"></span></button>
								</div>
							</div>
							
							<div class="form-group">
								<label for="lookup_upload">File to upload</label>
								<div class="">
									<input type="file"  data-placeholder="No file Choosen" name="lookup_upload" id="lookup_upload" accept=".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
								</div>
							</div>
							<!-- <div class="form-group">
								<label for="others_client_lookup"><input type="checkbox" id="others_lookup_checkbox" onClick="addClientOthersLookup()" name="others_lookup_checkbox"> Please check to Enter Client Others Lookup</label>
								<div id="others_client_lookup_div">
									<input type="text" id="others_client_lookup" name="others_client_lookup" placeholder='Expression (eg. [{"Key1":"parent--child lookup","Key2":"parent--child lookup"}])' title='Expression (eg. [{"Key1":"parent--child lookup","Key2":"parent--child lookup"}])'>
									<span class='text-muted custom-tooltip' data-animation='true' data-toggle='tooltip' data-placement='top'><i class='fa fa-question-circle-o' aria-hidden='true'><span class='tooltiptext'>*Apply lookup for specific conditions. eg.-  if we want country and state lookup is only applied when country value is United States and Canada. Then we must provide Json on state client other lookup [{"United States":"country--state"},{"Canada":"country--state"}].</span></i></span>
								</div>
							</div> -->
							
							<div class="form-group">
								<div class="table-responsive">
									<table id="lookupFileUoloadTable" class="display nowrap darkTable table table-striped table-bordered table-sm box-shadow">
											<thead>
												<tr>
													<th class="tHeadBlue">File Name</th>
													<th class="tHeadBlue">Uploaded By</th>
													<!-- <th class="tHeadBlue">Delete Lookup</th> -->
													<!-- <th class="tHeadBlue">Client Others Lookup</th> -->
												</tr>
											</thead>
											<tbody id="tbodyid">
														
											</tbody>
									</table>
								</div>
								
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button id="closeBtn" type="button" class="btn btn-default bdRadNone smtleadsender-blue-btn" data-dismiss="modal" id="cancelFileUploadPopUp">Close</button>
					<button id="fileUploadBtn" type="button" class="btn btn-dpurple greenbtn" onClick="uploadLookup()">Upload Now</button>
				</div>
			</form>
		</div>
	</div>
</div>

<div class="modal fade bs-example-modal-lg" id="staticListModal" tabindex="-1" role="dialog" aria-labelledby="staticListModalLabel" data-keyboard="false" data-backdrop="static">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<form id="staticListUpload" class="form-horizontal">
				<input type="hidden" name="staticListType" id="staticListType">
				<div class="modal-header">
					<h4 class="modal-title" id="staticListModalLabel"><i class="fa fa-upload fa-lg" aria-hidden="true"></i> Add Static List</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="closeStaticListPopUp"><span aria-hidden="true">&times;</span></button>
				</div>
				<div class="modal-body">
					<div class="row margB10" id="staticListLoader">
						<div class="col-md-12 text-center msgSuccess"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>
					</div>
					<div class="row">
						<div id="staticListErrorMsg" class="col-md-12 error_msg text-center"></div>
					</div>
					<div class="row">
						<div id="staticListSuccessMsg" class="col-md-12 success_msg text-center"></div>
					</div>
				
					<div class="row">
						<div class="col-md-12 margTB10">
							<div class="form-group">
								<div id="addStaticListColumns">
									
								</div>
								
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button id="closeBtn" type="button" class="btn btn-default bdRadNone" data-dismiss="modal" id="cancelFileUploadPopUp">Close</button>
					<button id="saveStaticListBtn" type="button" class="btn btn-dpurple" onClick="saveStaticList()">Save</button>
				</div>
			</form>
		</div>
	</div>
</div>
<!-- Load Fetch Record Limit  Starts-->
<div class="modal fade" id="loadCampaignLimitModal" tabindex="-1"
	role="dialog" aria-labelledby="loadCampaignLimitLabel"
	data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered modal-sm" role="document">
		<div class="modal-content">
			<div class="modal-header head-primary">
				<h5 class="modal-title" id="assetFileUploadModalLabel">Set Fetch Record Limit</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="cbtn">&times;</span></button>
			</div>
				<div class="modal-body">
					<!-- Message and Loader Row Starts -->
					<div class="row">
						<div id="msgClone"
							class="col-md-12 succMsg alert alert-success text-center"></div>
					</div>
					<!-- Message and Loader Row Ends -->
					<div class="row">
							<label class="col-md-4 col-form-label col-form-label-sm" for="setLimit">Record Limit</label>
							<div class="col-md-8">
								<div class="input-group input-group-sm param">
									<select id="setLimit" name="setLimit" class="form-control form-control-sm"></select>
								</div>
							</div>
					</div>
				</div>
				<div class="modal-footer">
					<div class="row">
						<div class="col-md-12 chkDetails text-center">
							<button type="button" id="loadCampaignLimit" onclick="loadDataForNewLimit()"
								class="btn btn-purple btn-sm" tabindex="14">Apply </button>
							<button type="button" id="cancelloadCampaignLimit"
								data-dismiss="modal" aria-label="Close"
								class="btn btn-default btn-sm" tabindex="13">Cancel</button>
						</div>
					</div>
				</div>
		</div>
	</div>
</div>
<!-- Load Fetch Record Limit  Ends -->

<jsp:include page="footer.jsp"></jsp:include>
</body>
</html>