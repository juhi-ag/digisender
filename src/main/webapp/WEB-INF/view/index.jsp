<%-- <jsp:include page="header.jsp"><jsp:param value="product" name="SRL"/></jsp:include> --%>
<title>SMT LeadSender Datapass</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/bootstrap4.min.css">
<!--  <link rel="stylesheet" type="text/css" href="resources/css/bootstrap.min.css" />-->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/main.css">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.12/css/dataTables.bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="resources/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="resources/css/select2.min.css">

<!-- <script src="resources/script/jquery-3.3.1.min.js"></script> -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script type="text/javascript" src="resources/script/jquery.confirm.js"></script>
<!--  <script type="text/javascript" src="resources/script/bootstrap.min.js"></script>-->
<!-- <script src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js"></script>-->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" ></script>
<script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/jquery.validate.min.js"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/additional-methods.min.js"></script>
<script type="text/javascript" src="resources/script/bootstrap-filestyle.js"></script>
<script src="resources/script/select2.min.js"></script>

<script src="${pageContext.request.contextPath}/resources/script/jquery.confirm.js"></script>
<script src="${pageContext.request.contextPath}/resources/script/jquery.confirm1.js"></script>

<script>
var sunmartechMandatoryFields = "${ldUiPropertyConfig.sunmartechMandatoryFields}";
var clientSpecificValidations = "${ldUiPropertyConfig.clientSpecificValidations}";
var customFieldLength = "${ldUiPropertyConfig.customFieldLength}";
var staticFieldLength = "${ldUiPropertyConfig.staticFieldLength}";
var headerFieldLength = "${ldUiPropertyConfig.headerFieldLength}";
var sunmartechMandatoryField='';
var sunmartechMandatoryFieldLength=0;
var validationObj;
var validationOptions = [];
var arrow= false;
var compCountForCustomField=0;
var compCountForStaicField=0;
var loginUserName = "${user}";
var validationValue='';
var csfValidationValue=0;
var validationJsonArray = [];
var isCustomField = false;
var lookupFieldsArray = [];
//var clientOthersLookup = '';
//var clientOthersLookupArray = [];
var lookupFieldsExactMatchArray = [];
var lookupFieldsPhraseMatchArray = [];
var role = "${role}";
var compCountForMyFreshWorksCustomField=0;
var isCustomFieldForMyFreshWorks = false;
var checkCustomTabEnable = false;
var compCountForHeaderFields=0;
var headerNameValueForAccept = '';
var headerNameValueForAcceptCharset = '';
var headerNameValueForUserAgent = '';
var headerNameValue = '';
var ssStaticFieldJsonArray = [];
var ssMultipleStaticFieldsValues='';
var headerNameValueForAcceptEncoding = '';
var lookupValueForMatch='';
var lookupValueForPhraseMatch='';
var lookupField=''
var callHeaderField = false;
var restOauthDefaultValue = "${ldUiPropertyConfig.restOauthDefaultValue}";
var endpointAccesstokenDefaultValue = "${ldUiPropertyConfig.endpointAccesstokenDefaultValue}";
var compCountForJsonField=0;
var jsonFieldValue = '';
var jsonFieldDataLength=0;
var sunmartechJsonFields = "${ldUiPropertyConfig.sunmartechJsonFields}";
var clinetNameValues = '';
var refreshPageTimer = "${ldUiPropertyConfig.refreshTimer}";
var exceedPageTimer = "${ldUiPropertyConfig.exceedTimer}";
var exceedInMin="${exceedInMin}";
var clientSpecificJsonMapping='';


if(sunmartechMandatoryFields != null && sunmartechMandatoryFields != "") {
	sunmartechMandatoryField = sunmartechMandatoryFields.split(",");
	sunmartechMandatoryFieldLength = sunmartechMandatoryField.length;
}

$(document).ready(function(){
	if(role != "") {
		$("#newIntegration").attr("style", "display:block");
		$("#updateIntegration").attr("style", "display:block");
		$("#fileUploadIntegration").attr("style", "display:block");
	}
	
	$("#clientName").select2();
	$('#integrationName').css('border-color','#cf1133');
	$('#integrationType').css('border-color','#cf1133');
	loadDistinctAccountNameBasedOnStage();
	loadIntegrationType();
	loadJsonFields();
	// For Multiple Modal popup
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
	 
	// Modal popup
	$('#newCustomerModal').on('shown.bs.modal', function () {
		document.title = 'Add New Datapass';
		$('#addNewIntegrationErrorMsg').html("");
		$("#clientName").html('');
		$("#clientName").html(clinetNameValues);
		$(".outputTab").hide();
		$(".contMappingTab").hide();
		$(".customFieldsTab").hide();
		$(".staticFieldsTab").hide();
		$('#saveAndnextBtn').show();
		$(".customFieldsTabForMyFreshWorks").hide();
		$("#sftp_client_div").hide();
		$(".customFieldsTabForHeaderFields").hide();
		$(".jsonFieldsTab").hide();
		$(".advanceLookupFieldsTab").hide();
		
		$("#nextBtn").hide();
		$('#clientName').focus();
		$('.modal .modal-body').css('overflow-y', 'auto'); 
		$('.modal .modal-body').css('max-height', $(window).height() * 0.7);
		
		//loadDistinctAccountNameBasedOnStage();
		loadMappingDetails();
		enableDatapassButton();
		
		compCountForCustomField=0;
		compCountForStaicField=0;
		validationValue='';
		csfValidationValue=0;
		validationJsonArray = [];
		lookupFieldsArray = [];
		lookupFieldsExactMatchArray = [];
		lookupFieldsPhraseMatchArray = [];
		compCountForMyFreshWorksCustomField=0;
		compCountForHeaderFields=0;
		ssStaticFieldJsonArray = [];
		ssMultipleStaticFieldsValues='';
		lookupValueForMatch='';
		lookupValueForPhraseMatch='';
		lookupField='';
		jsonFieldDataLength=0;
		clientSpecificJsonMapping='';
		
		
	});
	
	$('#newCustomerModal').on('hidden.bs.modal', function () {
	    $(this).find('form').trigger('reset');
	    $("#contMap tr:gt(0)").remove();
	    $("#tabMsgDiv").hide();
	    $("#msgAlert").hide();
	    
	    $("#outputFileDiv").slideDown('fast');
	    
	    $('a[href="#general"]').tab('show');
	})
	
	 $("#addMultipleHeaderFieldsDiv").on("click", ".delProgram", function(){
		 	$(this).closest(".input-group").remove();
		 	compCountForHeaderFields--;
	 });
	
	$('#nextBtn').click(function(){
		if(checkCustomTabEnable){
			if($('#endpointUrlOutput').val().indexOf("myfreshworks.com") != -1){
				$('.nav-item a.active').closest('li').next('li').find('a').trigger('click');
		     }else{
		    	 $('a[href="#staticFields"]').tab('show');
		     }
		}else{
			debugger;
			var activeTabName = $('.nav-item a.active')[0].innerText;
			if(activeTabName !=null && activeTabName !="" && activeTabName !="undefined" && activeTabName == "Output"){
				if($("#clientSpecificJson").val() != null && $("#clientSpecificJson").val() != "" && $("#clientSpecificJson").val() != "undefined"){
					debugger;
					$('#myTab a[href="#jsonFields"]').tab('show');
					$('#nextBtn').show();
					$('#completeIntegrationBtn').hide();
					$('#saveIntegrationBtn').hide();
					if($('#endpointUrlOutput').val().indexOf("myfreshworks.com") != -1){
						//$('.nav-item a.active').closest('li').next('li').find('a').trigger('click');
						$('#myTab a[href="#myFreshWorksCustomFields"]').tab('show');
					}
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
	$('#saveAndnextBtn').click(function(){
		alert("Ff");
		saveIntegration();
		//$('.nav-item a.active').closest('li').next('li').find('a').trigger('click');
	});
	
	$('a[href="#contMapping"]').on('shown.bs.tab', function (e) {
		checkCustomTabEnable = false;
		$('#nextBtn').show();
		$('#saveAndnextBtn').hide();
		$('#saveIntegrationBtn').hide();
		$('#completeIntegrationBtn').hide();
		$('#newCustomerModal .modal-dialog').addClass('modal-lg');
	});
	$('a[href="#staticFields"]').on('shown.bs.tab', function (e) {
		checkCustomTabEnable = false;
		$('#nextBtn').show();
		//$('#saveIntegrationBtn').hide();
		$('#saveIntegrationBtn').hide();
		$('#completeIntegrationBtn').hide();
	});
	$('a[href="#advanceLookupFields"]').on('shown.bs.tab', function (e) {
		checkCustomTabEnable = false;
		$('#nextBtn').hide();
		$('#saveAndnextBtn').hide();
		if($("#integrationType").val() == "http_client") {
			$('#saveIntegrationBtn').hide();
			$('#completeIntegrationBtn').hide();
			$('#nextBtn').show();
		}else{
			$('#saveIntegrationBtn').show();
			$('#completeIntegrationBtn').show();
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
		checkCustomTabEnable = true;
		$('#nextBtn').hide();
		$('#saveAndnextBtn').hide();
		$('#saveIntegrationBtn').show();
		$('#completeIntegrationBtn').show();
	});
	$('a[href="#customFields"]').on('shown.bs.tab', function (e) {
		checkCustomTabEnable = true;
		$('#nextBtn').show();
		$('#saveAndnextBtn').hide();
		$('#saveIntegrationBtn').hide();
		$('#completeIntegrationBtn').hide();
		//$('#newCustomerModal .modal-dialog').addClass('modal-lg');
	});
	
	$('a[href="#myFreshWorksCustomFields"]').on('shown.bs.tab', function (e) {
		//alert("Inside");
		checkCustomTabEnable = false;
		$('#nextBtn').show();
		//$('#saveIntegrationBtn').hide();
		$('#saveIntegrationBtn').hide();
		$('#completeIntegrationBtn').hide();
		//$('#newCustomerModal .modal-dialog').addClass('modal-lg');
	});
	
	$('a[href="#general"]').on('shown.bs.tab', function (e) {
		checkCustomTabEnable = false;
		$('#saveIntegrationBtn').hide();
		$('#completeIntegrationBtn').hide();
		$('#nextBtn').show();
		$('#newCustomerModal .modal-dialog').removeClass('modal-lg');
	});
	$('a[href="#output"]').on('shown.bs.tab', function (e) {
		//$("#postProcessType").val("entity");
		checkCustomTabEnable = false;
		$('#saveIntegrationBtn').hide();
		$('#completeIntegrationBtn').hide();
		$('#nextBtn').show();
		$('#saveAndnextBtn').hide();
		$('#newCustomerModal .modal-dialog').removeClass('modal-lg');
		
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
				if($("#integrationType").val() == "rest_client"){
					$("#clientSpecificJson_div").show();
				}else{
					$("#clientSpecificJson_div").hide();
				}
				$("#soap_client_div").hide();
				$("#rest_client_div").show();
				$("#sftp_client_div").hide();
				$("#record_time_delay_div").show();
				$('#endpointUrlOutput').css('border-color','#cf1133');
				
				if($("#restIdentityUrl").val()!= null && $("#restIdentityUrl").val()!= "" && $("#restIdentityUrl").val()!= "undefined" ){
					$("#rest_identity_div").show();
					$('#clientId').css('border-color','#cf1133');
					$('#clientSecret').css('border-color','#cf1133');
				}else{
					$("#rest_identity_div").hide();
					 $("#restIdentity_dev").addClass('col-md-12').removeClass('col-md-6 pr-1');
					 $("#oauth_div").addClass('col-md-12').removeClass('col-md-6');
					 $("#oauth").hide();
					 $("#endpoint_dev").addClass('col-md-12').removeClass('col-md-6 pr-1');
					 $("#accesstoken_div").addClass('col-md-12').removeClass('col-md-6');
					 $("#accessToken").hide();
				}
			}
			else if($("#integrationType").val() == "sftp_client") {
				$("#soap_client_div").hide();
				$("#rest_client_div").hide();
				$("#sftp_client_div").show();
				$("#record_time_delay_div").hide();
				$('#sftphost').css('border-color','#cf1133');
				$('#sftpport').css('border-color','#cf1133');
				$('#sftpuser').css('border-color','#cf1133');
				$('#sftppass').css('border-color','#cf1133');
				$('#sftpworkingdir').css('border-color','#cf1133');
				$("#clientSpecificJson_div").hide();
			}
			
			else {
				$("#rest_client_div").hide();
				$("#soap_client_div").hide();
				$("#sftp_client_div").hide();
				$("#record_time_delay_div").show();
				
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
	
	$('a[href="#jsonFields"]').on('shown.bs.tab', function (e) {
		checkCustomTabEnable = false;
		$('#nextBtn').show();
		$('#saveAndnextBtn').hide();
		$('#saveIntegrationBtn').hide();
		$('#completeIntegrationBtn').hide();
	});
	
	/* $('#contMapCsfModal').on('shown.bs.modal', function () {
		fetchCSVDetails();
		displayCSV();
		
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
		debugger;
		if($("#integrationType").val() != null) {
			if($("#integrationType").val() == "http_client") {
				if(callHeaderField){
					$('#addHeaderFieldsDiv').html('');
					$('#addMultipleHeaderFieldsDiv').html('');
					$(".customFieldsTabForHeaderFields").show();
					showHeaderFieldsTextBox();
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
			//$(".jsonFieldsTab").hide();
			//$(".contMappingTab").show();
			//$(".customFieldsTab").show();
			//$(".staticFieldsTab").show();
		}
	});
	
	$('body').click(function(evt) {
		if(arrow==false){
			if(evt.target.id != "validationMultiSelectParent" && evt.target.id != "validationMultiSelect"  && evt.target.id != "validationDropdownButton" &&  evt.target.id !="orderNameImage" && evt.target.id !="validationSearch" && evt.target.id !="selectedValidation"){
				$('#validationSearch').val('');
				$('#validationMultiSelectParent').hide();
			}
		}
		else{
			arrow=false;
		}
	});
	
	/* $('#fileUploadModal').on('shown.bs.modal', function () {
		fetchIntegrationName();
	}); */
	
});

function loadDistinctAccountNameBasedOnStage(){
	$.ajax({
		url		:	"loadDistinctAccountNameBasedOnStage.do",
		success	:	function(data) {
			if(data !=null && data !=""){
				clinetNameValues = data;
				$("#clientName").html(clinetNameValues);
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
				/*if(sunmartechMandatoryField[j] != null && sunmartechMandatoryField[j] != "") {
					columnData = columnData+"<td><label id='msorField_"+j+"' class='control-label'>"+sunmartechMandatoryField[j]+"</label></td>"+
					"<td><div class='input-group' style='width:100px'><input type='text' id='outputField_"+j+"' value='N/A' class='form-control' aria-label='...'>"+
					"<span class='input-group-addon'><input type='checkbox' id='outputFieldChk_"+j+"' aria-label='...'></span></div></td><td><button type='button' class='btn btn-info btn-sm' onclick='applyLookups("+j+", false)' title='Apply Lookups'>Lookup</button></td><td class='sep'></td>";
				}*/
			}
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
	var $addNew = $("<div class='input-group'><input type='text' placeholder='SMT LeadSender Name' id='sunmartechcustomfield_"+compCountForCustomField+"' onkeyup='checksunmartechField("+compCountForCustomField+")'><input type='text' placeholder='API Name' id='apicustomfield_"+compCountForCustomField+"'><input type='checkbox' id='chkboxcustomfield_"+compCountForCustomField+"' aria-label='...'><button type='button' id='functionButtoncustomfield_"+compCountForCustomField+"' class='btn btn-info btn-sm' onclick=callContactMapCsf("+compCountForCustomField+",true,'customField') title='Apply Functions' disabled>F(x)</button><button type='button' class='btn btn-info btn-sm' onclick=applyLookups("+compCountForCustomField+",true,'customField') title='Apply Lookups'>Lookup</button><button type='button' class='btn btn-info btn-sm' onclick=addStaticList("+compCountForCustomField+",true,'customField') title='Add Static List'>Add Static List</button><span class='input-group-append'><button id='addMultipleCustomFieldTextBox' onclick='callMultipleCustomFieldTextBox()' type='button' class='btn btn-info btn-sm' title='Add More Custom Fields'><span class='fa fa-plus' aria-hidden='true'></span></div>");
	
	//var $addNew = $("<div class='input-group'><input type='text' placeholder='SMT LeadSender Name' id='sunmartechcustomfield_"+compCountForCustomField+"' onkeyup='checksunmartechField("+compCountForCustomField+")'><input type='text' placeholder='API Name' id='apicustomfield_"+compCountForCustomField+"'><input type='checkbox' id='chkboxcustomfield_"+compCountForCustomField+"' aria-label='...'><button type='button' id='functionButtoncustomfield_"+compCountForCustomField+"' class='btn btn-info btn-sm' onclick=callContactMapCsf("+compCountForCustomField+",true,'customField') title='Apply Functions' disabled>F(x)</button><button type='button' class='btn btn-info btn-sm' onclick='applyLookups("+compCountForCustomField+", true)' title='Apply Lookups'>Lookup</button><span class='input-group-append'><button id='addMultipleCustomFieldTextBox' onclick='callMultipleCustomFieldTextBox()' type='button' class='btn btn-info btn-sm' title='Add More Custom Fields'><span class='fa fa-plus' aria-hidden='true'></span></div>");
///////var $addNew = $("<div class='input-group'><input type='text' placeholder='SMT LeadSender Name' id='sunmartechcustomfield_"+compCountForCustomField+"' onkeyup='checksunmartechField("+compCountForCustomField+")'><input type='text' placeholder='API Name' id='apicustomfield_"+compCountForCustomField+"'><input type='checkbox' id='chkboxcustomfield_"+compCountForCustomField+"' aria-label='...'><button type='button' class='btn btn-info btn-sm' onclick='applyLookups("+compCountForCustomField+", true)' title='Apply Lookups'>Lookup</button><span class='input-group-append'><button id='addMultipleCustomFieldTextBox' onclick='callMultipleCustomFieldTextBox()' type='button' class='btn btn-info btn-sm' title='Add More Custom Fields'><span class='fa fa-plus' aria-hidden='true'></span></div>");
	$("#addCustomFieldDiv").append($addNew);
	compCountForCustomField++;
}

function callMultipleCustomFieldTextBox(){
	if(compCountForCustomField < customFieldLength) {
		var $addNew = $("<div class='input-group'><input type='text' placeholder='SMT LeadSender Name' id='sunmartechcustomfield_"+compCountForCustomField+"' onkeyup='checksunmartechField("+compCountForCustomField+")'><input type='text' placeholder='API Name' id='apicustomfield_"+compCountForCustomField+"'><input type='checkbox' id='chkboxcustomfield_"+compCountForCustomField+"' aria-label='...'><button type='button' id='functionButtoncustomfield_"+compCountForCustomField+"' class='btn btn-info btn-sm' onclick=callContactMapCsf("+compCountForCustomField+",true,'customField') title='Apply Functions' disabled>F(x)</button><button type='button' class='btn btn-info btn-sm' onclick=applyLookups("+compCountForCustomField+",true,'customField') title='Apply Lookups'>Lookup</button><button type='button' class='btn btn-info btn-sm' onclick=addStaticList("+compCountForCustomField+",true,'customField') title='Add Static List'>Add Static List</button><span class='input-group-append'><button type='button' class='delProgram btn btn-danger btn-sm'><span class='fa fa-times' aria-hidden='true'></span></div>");
		//var $addNew = $("<div class='input-group'><input type='text' placeholder='SMT LeadSender Name' id='sunmartechcustomfield_"+compCountForCustomField+"' onkeyup='checksunmartechField("+compCountForCustomField+")'><input type='text' placeholder='API Name' id='apicustomfield_"+compCountForCustomField+"'><input type='checkbox' id='chkboxcustomfield_"+compCountForCustomField+"' aria-label='...'><button type='button' id='functionButtoncustomfield_"+compCountForCustomField+"' class='btn btn-info btn-sm' onclick=callContactMapCsf("+compCountForCustomField+",true,'customField') title='Apply Functions' disabled>F(x)</button><button type='button' class='btn btn-info btn-sm' onclick='applyLookups("+compCountForCustomField+", true)' title='Apply Lookups'>Lookup</button><span class='input-group-append'><button type='button' class='delProgram btn btn-danger btn-sm'><span class='fa fa-times' aria-hidden='true'></span></div>");
		//////////var $addNew = $("<div class='input-group'><input type='text' placeholder='SMT LeadSender Name' id='sunmartechcustomfield_"+compCountForCustomField+"' onkeyup='checksunmartechField("+compCountForCustomField+")'><input type='text' placeholder='API Name' id='apicustomfield_"+compCountForCustomField+"'><input type='checkbox' id='chkboxcustomfield_"+compCountForCustomField+"' aria-label='...'><button type='button' class='btn btn-info btn-sm' onclick='applyLookups("+compCountForCustomField+", true)' title='Apply Lookups'>Lookup</button><span class='input-group-append'><button type='button' class='delProgram btn btn-danger btn-sm'><span class='fa fa-times' aria-hidden='true'></span></div>");
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


function saveIntegrationDetails(){
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
	if(!$("#integrationName").val() !=null && !$("#integrationName").val() !="" && !$("#integrationName").val() !="undefiend"){
		$("#addNewIntegrationErrorMsg").html("* Kindly provide datapass name").show();
		setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
		return false;
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
	
	if(sunmartechMandatoryFieldLength > 0 && ($("#clientSpecificJson").val() == null || $("#clientSpecificJson").val() == "")) {
		for(var i=0; i<sunmartechMandatoryFieldLength; i++) {
			if(($("#msorField_"+i).text() != null && $("#msorField_"+i).text() != "" && $("#msorField_"+i).text() != "undefined") &&  
				($("#outputField_"+i).val() != null && $("#outputField_"+i).val() != "" && $("#outputField_"+i).val() != "undefined" && $("#outputField_"+i).val() != "N/A")) {
				
				ssFieldJsonObject.json[$("#msorField_"+i).text()] = $("#outputField_"+i).val();
				
				if($("#outputFieldChk_"+i).is(':checked')) {
					mandatoryFieldsArray.push($("#msorField_"+i).text()); 
				}
				
				deportFieldsArray.push($("#msorField_"+i).text());
			}
			
			if(($("#sunmartechcustomfield_"+i).val() != null && $("#sunmartechcustomfield_"+i).val() != "" && $("#sunmartechcustomfield_"+i).val() != "undefined") &&  
				($("#apicustomfield_"+i).val() != null && $("#apicustomfield_"+i).val() != "" && $("#apicustomfield_"+i).val() != "undefined")) {
					
				ssFieldJsonObject.json[$("#sunmartechcustomfield_"+i).val()] = $("#apicustomfield_"+i).val();
					
				if($("#chkboxcustomfield_"+i).is(':checked')) {
					mandatoryFieldsArray.push($("#sunmartechcustomfield_"+i).val()); 
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
			
			if(($("#sunmartechcustomfield_"+i).val() != null && $("#sunmartechcustomfield_"+i).val() != "" && $("#sunmartechcustomfield_"+i).val() != "undefined") &&  
				($("#apicustomfield_"+i).val() != null && $("#apicustomfield_"+i).val() != "" && $("#apicustomfield_"+i).val() != "undefined")) {
					
				ssFieldJsonObject.json[$("#sunmartechcustomfield_"+i).val()] = $("#apicustomfield_"+i).val();
					
				if($("#chkboxcustomfield_"+i).is(':checked')) {
					mandatoryFieldsArray.push($("#sunmartechcustomfield_"+i).val()); 
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
	
	if(Object.keys(headerFieldJsonObject).length > 0) {
		headerFieldJsonArray.push(headerFieldJsonObject);
	}
	
	if(headerFieldJsonArray.length > 0){
		//alert(JSON.stringify(headerFieldJsonArray));
		headerFieldsValues=JSON.stringify(headerFieldJsonArray);
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
	
	var tableRow = {integrationId:trimValue($("#hiddenIntegrationId").val()),clientName:trimValue($("#clientName").val()),integrationName:trimValue($("#integrationName").val()),integrationType:trimValue($("#integrationType").val()),
			endpointUrlOutput:trimValue($("#endpointUrlOutput").val()),restIdentityUrl:trimValue($("#restIdentityUrl").val()),
			usernameOutput:trimValue($("#usernameOutput").val()),passwordOutput:trimValue($("#passwordOutput").val()),username:loginUserName,ssFields:ssFieldsValues,
			mandatoryFields:mandatoryFieldsValue,deportFields:deportFieldsValue,staticFields:staticFieldsValues,validationFields:validationValue,successType:trimValue($("#successPhrase").val()),
			lookup_fields:trimValue($("#lookup_fields").val()),clientOthersLookupFields:trimValue($("#advanceLookup").val()),integrationStatus:"saved",ssFieldsForMyFreshWorks:ssFieldsValuesForMyFreshWorks,apiKey:trimValue($("#apikey").val()),
			sftpHost:trimValue($("#sftphost").val()),sftpPort:trimValue($("#sftpport").val()),sftpUser:trimValue($("#sftpuser").val()),sftpPass:trimValue($("#sftppass").val()),sftpWorkingDir:trimValue($("#sftpworkingdir").val()),
			headerFields:headerFieldsValues,staticListEndPointUrl:trimValue($("#staticListEndPointUrl").val()),multipleStaticFieldsValues:ssMultipleStaticFieldsValues,
			clientSpecificJson:trimValue($("#clientSpecificJson").val()),recordTimeDelay:$("#recordTimeDelay").val(),
			oauth:trimValue($("#oauth").val()),clientId:trimValue($("#clientId").val()),clientSecret:trimValue($("#clientSecret").val()),accessToken:trimValue($("#accessToken").val())};
	
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
					$('#addNewIntegrationSuccessMsg').html("");
					resetAddNewIntegrationModel();
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

function trimValue(value) {
	var trimValue='';
	if(value != null && value != "" && value != "undefined") {
		console.log(value);
		trimValue=value.trim();
	}
	return trimValue;
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
						toolTipValue = "*Enter prefix for any word.(CheckPrefix will validate the given prefix is avalible or not.)";
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
					/*if(key == "checkValueWithoutlookup") {
						placeholderValue = 'Expression (eg. [{"Key1":"Value1"},{"Key2":"Value2"}])';
						toolTipValue = '*Enter expression (eg. [{"Key1":"Value1"},{"Key2":"Value2"}]).(check value without lookup validate the given value without uploading the lookup.eg.([{"country":"United States,Australia","country_lead":"anth"}]))';
					}*/
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
/* function fetchIntegrationName() {
	$("#fileUploadLoader").show();
	$.ajax({
		url		:	"loadDistinctIntegrationName.do",
		success	:	function(data) {
			if(data !=null && data !=""){
				$("#fileUploadLoader").hide();
				$("#fileUpldIntgName").html(data);
			}
		}
	});
} */

/* function uploadFileData() {
	if($("#fileUpldIntgName").val() == "") {
		$("#uploadFileErrorMsg").html("* kindly select the Integration name.").show();
	   	setTimeout(function() {$("#uploadFileErrorMsg").hide()}, 5000);
	   	return false;
	}
	if($("#file_upload").val()==""){
	  	$("#uploadFileErrorMsg").html("* kindly select the file to upload.").show();
	   	setTimeout(function() {$("#uploadFileErrorMsg").hide()}, 5000);
	   	return false;
	}
	uploadFile();
}

function uploadFile(){
	$("#fileUploadLoader").show();
	var formData=new FormData();
	formData.append("file",$("#file_upload")[0].files[0]);
	
	var fileName = $('#file_upload').prop("files")[0]['name'];
	var integrationName = $('select[name=fileUpldIntgName]').find(':selected').text();
	if(fileName.lastIndexOf(".csv") != -1 || fileName.lastIndexOf(".xls") != -1 || fileName.lastIndexOf(".xlsx") != -1) {		
		$.ajax({
			url: "uploadFile.do?username="+loginUserName+"&integrationId="+$("#fileUpldIntgName").val()+"&integrationName="+integrationName,
			data:formData,
			contentType: false,
			cache:false,
			processData: false,
			type: "POST",
			success: function(data, textStatus, xhr)
			{ 
				$("#fileUploadLoader").hide();
				//alert(data);
				$("#uploadFileSuccessMsg").html("file uploaded successfully").show();
				setTimeout(function(){$('#uploadFileSuccessMsg').html("").hide();},5000);
			}
		});
	}else{
		$("#fileUploadLoader").hide();
		$("#uploadFileErrorMsg").html("only csv, xls and xlsx file are allowed").show();
		setTimeout(function(){$('#uploadFileErrorMsg').html("").hide();},5000);
  	} 
} */

function saveValidation() {
	var validationMatching = true;
	var validationJsonObject = {};
	var finalJson = {};
	var i = 0;
	var setValidationArr=[];
	var previousValidationJsonArray = [];
	
	if($('input[name="selectedValidationCheck"]:checked').length > 0) {
		if(validationObj !=null && validationObj != ""){
			$.each(validationObj,function(key,value){
				if($("#selectedValidationCheck_"+i).is(':checked')) {
					if(key == "checkBounds"){
						if($("#selectedMinExpression_"+i).val() != null && $("#selectedMinExpression_"+i).val() != "" && $("#selectedMinExpression_"+i).val() != "undefined" 
							|| $("#selectedMaxExpression_"+i).val() != null && $("#selectedMaxExpression_"+i).val() != "" && $("#selectedMaxExpression_"+i).val() != "undefined") {
							
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
							}else{
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
					else if(key == "checkPrefix") {
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
				
				
				if(Object.keys(validationJsonObject).length > 0) {
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
					/* if(Object.keys(finalJson).length > 0) {
						validationJsonArray.push(finalJson);
					} */
					if(Object.keys(finalJson).length > 0) {
						validationJsonArray.push(finalJson);
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

function callMultipleHeaderFields(){
	if(compCountForHeaderFields < headerFieldLength) {
		var $addNew = $("<div class='input-group'><select id='headername_"+compCountForHeaderFields+"' class='form-control form-control-sm' name='headername' onchange='checkHeaderName("+compCountForHeaderFields+")'></select><select placeholder='Value' id='headernamevalue_"+compCountForHeaderFields+"' class='form-control form-control-sm' name='headernamevalue'></select><span class='input-group-append'><button type='button' class='delProgram btn btn-danger btn-sm'><span class='fa fa-times' aria-hidden='true'></span></div>");
		
		$("#addMultipleHeaderFieldsDiv").append($addNew);
		$("#headername_"+compCountForHeaderFields).html(headerNameValue);
		compCountForHeaderFields++;
	}
}
function showHeaderFieldsTextBox() {
	debugger;
	var $addNew = $("<div class='input-group'><select id='headername_"+compCountForHeaderFields+"' class='form-control form-control-sm' name='headername' onchange='checkHeaderName("+compCountForHeaderFields+")'></select><select id='headernamevalue_"+compCountForHeaderFields+"' class='form-control form-control-sm' name='headernamevalue'></select><span class='input-group-append'><button id='addMultipleStaticFieldTextBox' onclick='callMultipleHeaderFields()' type='button' class='btn btn-info btn-sm' title='Add More Headers'><span class='fa fa-plus' aria-hidden='true'></span></div>");
	
	$("#addHeaderFieldsDiv").append($addNew);
	$("#headername_"+compCountForHeaderFields).html(headerNameValue);
	$("#headernamevalue_"+compCountForHeaderFields).html(headerNameValueForAccept);
	
	$('select option[value="Accept"]').attr("selected",true);
	$('select option[value="application/x-www-form-urlencoded"]').attr("selected",true);
	compCountForHeaderFields++;
}

function closeCSVModel(){
	//$('#checkValidationTable').dataTable().fnClearTable();
	$('#checkValidationTable tbody').empty();
}

function closeAddNewIntegrationModel(){
	if((lookupFieldsExactMatchArray != null && lookupFieldsExactMatchArray != "" && lookupFieldsExactMatchArray != "[]") || (lookupFieldsPhraseMatchArray != null && lookupFieldsPhraseMatchArray != "" && lookupFieldsPhraseMatchArray != "[]")){
		$("#addNewIntegrationErrorMsg").html("* Please update the datapass before close.").show();
		setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");},5000);
		return false;
	}else{
		$("#newCustomerModal").modal("hide");
		document.title = 'SMT LeadSender Datapass';
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
	}
}

function callContactMapCsf(value, customField, msorValue){
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
	$("#hiddenMsorValue").val(fields);
	$('#contMapCsfModal').modal('show');
	csfValidationValue = value;
	isCustomField = customField;
	fetchCSVDetails();
	displayCSV();
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
	
	if(sunmartechMandatoryFieldLength > 0 && ($("#clientSpecificJson").val() == null || $("#clientSpecificJson").val() == "")) {
		for(var i=0; i<sunmartechMandatoryFieldLength; i++) {
			if(($("#msorField_"+i).text() != null && $("#msorField_"+i).text() != "" && $("#msorField_"+i).text() != "undefined") &&  
				($("#outputField_"+i).val() != null && $("#outputField_"+i).val() != "" && $("#outputField_"+i).val() != "undefined" && $("#outputField_"+i).val() != "N/A")) {
				
				ssFieldJsonObject.json[$("#msorField_"+i).text()] = $("#outputField_"+i).val();
				
				if($("#outputFieldChk_"+i).is(':checked')) {
					mandatoryFieldsArray.push($("#msorField_"+i).text()); 
				}
				
				deportFieldsArray.push($("#msorField_"+i).text());
			}
			
			if(($("#sunmartechcustomfield_"+i).val() != null && $("#sunmartechcustomfield_"+i).val() != "" && $("#sunmartechcustomfield_"+i).val() != "undefined") &&  
				($("#apicustomfield_"+i).val() != null && $("#apicustomfield_"+i).val() != "" && $("#apicustomfield_"+i).val() != "undefined")) {
					
				ssFieldJsonObject.json[$("#sunmartechcustomfield_"+i).val()] = $("#apicustomfield_"+i).val();
					
				if($("#chkboxcustomfield_"+i).is(':checked')) {
					mandatoryFieldsArray.push($("#sunmartechcustomfield_"+i).val()); 
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
			
			if(($("#sunmartechcustomfield_"+i).val() != null && $("#sunmartechcustomfield_"+i).val() != "" && $("#sunmartechcustomfield_"+i).val() != "undefined") &&  
				($("#apicustomfield_"+i).val() != null && $("#apicustomfield_"+i).val() != "" && $("#apicustomfield_"+i).val() != "undefined")) {
					
				ssFieldJsonObject.json[$("#sunmartechcustomfield_"+i).val()] = $("#apicustomfield_"+i).val();
					
				if($("#chkboxcustomfield_"+i).is(':checked')) {
					mandatoryFieldsArray.push($("#sunmartechcustomfield_"+i).val()); 
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

	var tableRow = {integrationId:trimValue($("#hiddenIntegrationId").val()),clientName:trimValue($("#clientName").val()),integrationName:trimValue($("#integrationName").val()),integrationType:trimValue($("#integrationType").val()),
			endpointUrlOutput:trimValue($("#endpointUrlOutput").val()),restIdentityUrl:trimValue($("#restIdentityUrl").val()),
			usernameOutput:trimValue($("#usernameOutput").val()),passwordOutput:trimValue($("#passwordOutput").val()),username:loginUserName,ssFields:ssFieldsValues,
			mandatoryFields:mandatoryFieldsValue,deportFields:deportFieldsValue,staticFields:staticFieldsValues,validationFields:validationValue,successType:trimValue($("#successPhrase").val()),lookup_fields:trimValue($("#lookup_fields").val()),
			clientOthersLookupFields:trimValue($("#advanceLookup").val()),integrationStatus:"completed",ssFieldsForMyFreshWorks:ssFieldsValuesForMyFreshWorks,apiKey:trimValue($("#apikey").val()),
			sftpHost:trimValue($("#sftphost").val()),sftpPort:trimValue($("#sftpport").val()),sftpUser:trimValue($("#sftpuser").val()),sftpPass:trimValue($("#sftppass").val()),sftpWorkingDir:trimValue($("#sftpworkingdir").val()),
			headerFields:headerFieldsValues,staticListEndPointUrl:trimValue($("#staticListEndPointUrl").val()),multipleStaticFieldsValues:ssMultipleStaticFieldsValues,clientSpecificJson:trimValue($("#clientSpecificJson").val()),recordTimeDelay:$("#recordTimeDelay").val(),
			oauth:trimValue($("#oauth").val()),clientId:trimValue($("#clientId").val()),clientSecret:trimValue($("#clientSecret").val()),accessToken:trimValue($("#accessToken").val())};
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
					$('#addNewIntegrationSuccessMsg').html("");
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
	
	$('#addCustomFieldDiv').html('');
	$('#addMultipleCustomFieldDiv').html('');
	$('#addStaticFieldDiv').html('');
	$('#addMultipleStaticFieldDiv').html('');
	
	compCountForCustomField = 0;
	compCountForStaicField = 0;
	document.title = 'SMT LeadSender Datapass';
	
	validationValue='';
	$("#successPhrase").val("");
	$("#lookup_fields").val("");
	$("#advanceLookup").val("");
	$("#apikey").val("");
	$("#sftphost").val("");
	$("#sftpport").val("");
	$("#sftpuser").val("");
	$("#sftppass").val("");
	$("#sftpworkingdir").val("");
	$("#staticListEndPointUrl").val("");
	ssMultipleStaticFieldsValues='';
	$("#clientSpecificJson").val("");
	$("#recordTimeDelay").val("");
	$("#oauth").val("");
	$("#clientId").val("");
	$("#clientSecret").val("");
	$("#accessToken").val("");
}

function applyLookups(index, customField) {
	$('#lookup_checkbox').prop('checked', false);
	//$('#others_lookup_checkbox').prop('checked', false);
	//$("#selectedMatchingCriteria").css('border-color','#cf1133');
	
	document.getElementById('lookup_parent').style.display = 'none';
	//$("#others_client_lookup_div").hide();
	$("#lookup_parent").val("");
	//$("#others_client_lookup").val("");
	$("#selectedMatchingCriteria").val("");
	$('#lookupUploadErrorMsg').html("").hide();
	
	
	$('#lookupUploadModal').modal('show');
	
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
	
	if($("#lookup_upload").val() ==""){
		$("#lookupUploadErrorMsg").html("* kindly select the file to upload.").show();
		setTimeout(function(){$('#lookupUploadErrorMsg').html("").hide();},3000);
		return false;
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

/* function callUploadLookup(replace) {
	$("#lookupUploadLoader").show();
	
	var finalOthersLookup = '';
	
	if($("#others_client_lookup").val() != null && $("#others_client_lookup").val() != "" && $("#others_client_lookup").val() != "undefined") {
		if(IsJsonString($("#others_client_lookup").val())) {
			finalOthersLookup = $("#others_client_lookup").val();
			
			if(finalOthersLookup != '') {
				clientOthersLookupArray.push(finalOthersLookup);
			}
			
			if(clientOthersLookupArray.length > 0){
				clientOthersLookup = JSON.stringify(clientOthersLookupArray);
			}
		}
		else {
			validationMatching = false;
			$("#lookupUploadErrorMsg").html("* Value entered in checkOthersClientLookup is not in valid format.").show();
			setTimeout(function(){$('#lookupUploadErrorMsg').html("");},5000);
			return false;
		}
	}
	else {
		if($("#lookup_parent").val() != null && $("#lookup_parent").val() != "" && $("#lookup_parent").val() != "undefined") {
			lookupFieldsArray.push($("#lookup_parent").val()+"--"+$("#lookupType").val());
		}
		else {
			lookupFieldsArray.push($("#lookupType").val());
		}
	}
	
	if(lookupFieldsArray != null && lookupFieldsArray != "[]") {
		$("#lookup_fields").val(lookupFieldsArray.join(","));
	}
	
	//alert($("#lookup_fields").val());
	
	var lookupFormData=new FormData();
	if($("#lookup_upload").val() != "" && $("#lookup_upload").val() != undefined) {
		lookupFormData.append("file",$("#lookup_upload")[0].files[0]);
	}
	
	var fileName = $('#lookup_upload').prop("files")[0]['name'];
	if(fileName.lastIndexOf(".csv") != -1 || fileName.lastIndexOf(".xls") != -1 || fileName.lastIndexOf(".xlsx") != -1) {		
		$.ajax({
			url: "uploadLookup.do?username="+loginUserName+"&integrationId="+$("#hiddenIntegrationId").val()+"&type="+$("#lookupType").val()+"&replace="+replace,
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
							$("#lookupUploadModal").modal("hide");
							
						},5000);
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
} */

function callUploadLookup(replace) {
	$('#lookupUploadErrorMsg').html("").hide();
	$("#lookupUploadLoader").show();
	
	var finalOthersLookup = '';
	var lookupArray = [];
	var matchArr = [];
	var exactMatch = '';
	var phraseMatch = '';
	
	debugger;
	/* if($("#others_client_lookup").val() != null && $("#others_client_lookup").val() != "" && $("#others_client_lookup").val() != "undefined") {
		if(IsJsonString($("#others_client_lookup").val())) {
			finalOthersLookup = $("#others_client_lookup").val();
			
			if(finalOthersLookup != '') {
				clientOthersLookupArray.push(finalOthersLookup);
			}
			
			if(clientOthersLookupArray.length > 0){
				clientOthersLookup = JSON.stringify(clientOthersLookupArray);
			}
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
				if(lookupFieldsExactMatchArray !=null && lookupFieldsExactMatchArray !='' && lookupFieldsExactMatchArray != "[]"){
					if(lookupFieldsExactMatchArray.indexOf($("#lookup_parent").val()+"--"+$("#lookupType").val()) == -1){
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
				}else{
					lookupFieldsExactMatchArray.push($("#lookup_parent").val()+"--"+$("#lookupType").val());
				}
				if(matchArr != null && matchArr !="" && matchArr !="[]"){
					lookupFieldsExactMatchArray.push(matchArr);
				}
			}
			else {
				if(lookupFieldsPhraseMatchArray !=null && lookupFieldsPhraseMatchArray !='' && lookupFieldsPhraseMatchArray != "[]"){
					if(lookupFieldsPhraseMatchArray.indexOf($("#lookup_parent").val()+"--"+$("#lookupType").val()) == -1){
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
				}else{
					lookupFieldsPhraseMatchArray.push($("#lookup_parent").val()+"--"+$("#lookupType").val());
				}
			}
			if(matchArr != null && matchArr !="" && matchArr !="[]"){
				lookupFieldsPhraseMatchArray.push(matchArr);
			}
		}
	}
	else {
		if($("#selectedMatchingCriteria").val() != null && $("#selectedMatchingCriteria").val() != "") {
			if($("#selectedMatchingCriteria").val() == "exact_match") {
				if(lookupFieldsExactMatchArray !=null && lookupFieldsExactMatchArray !='' && lookupFieldsExactMatchArray != "[]"){
					if(lookupFieldsExactMatchArray.indexOf($("#lookupType").val()) == -1){
						lookupFieldsExactMatchArray.push($("#lookupType").val());
					}
				}else{
					lookupFieldsExactMatchArray.push($("#lookupType").val());
				}
			}
			else if($("#selectedMatchingCriteria").val() == "phrase_match") {
				if(lookupFieldsPhraseMatchArray !=null && lookupFieldsPhraseMatchArray !='' && lookupFieldsPhraseMatchArray != "[]"){
					if(lookupFieldsPhraseMatchArray.indexOf($("#lookupType").val()) == -1){
						lookupFieldsPhraseMatchArray.push($("#lookupType").val());
					}
				}else{
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
	
	if(lookupArray != null && lookupArray != "[]") {
		//alert("lookupArray:::"+lookupArray);
		$("#lookup_fields").val(JSON.stringify(lookupArray));
		
		lookupField = trimValue($("#lookup_fields").val());
	}
	
	//alert($("#lookup_fields").val());
	
	var lookupFormData=new FormData();
	if($("#lookup_upload").val() != "" && $("#lookup_upload").val() != undefined) {
		lookupFormData.append("file",$("#lookup_upload")[0].files[0]);
	}
	
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
					},5000);
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

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function saveIntegration(){
	debugger;
	disableDatapassButton();
	if(!$("#integrationName").val() !=null && !$("#integrationName").val() !="" && !$("#integrationName").val() !="undefiend"){
		$("#addNewIntegrationErrorMsg").html("* Kindly provide datapass name").show();
		setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
		return false;
	}
	/* if(!$("#clientName").val() !=null && !$("#clientName").val() !="" && !$("#clientName").val() !="undefiend"){
		$("#addNewIntegrationErrorMsg").html("* Kindly provide client name").show();
		setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");},4000);
		return false;
	} */
	if($("#integrationType").val() == ""){
		$("#addNewIntegrationErrorMsg").html("* Kindly provide datapass type").show();
		setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
		return false;
	}
	
	var tableRow = {clientName:trimValue($("#clientName").val()),integrationName:trimValue($("#integrationName").val()),integrationType:trimValue($("#integrationType").val()),username:"Juhi"};
	console.log(JSON.stringify(tableRow));
	alert(JSON.stringify(tableRow));
	debugger;
	$("#addNewCustomerLoader").show();
	$.ajax({
		url: "saveIntegration.do",
		type: "POST",
		data: encodeURIComponent(JSON.stringify(tableRow)),
		success : function(data) {
			//alert(result);
			$("#addNewCustomerLoader").hide();
			debugger;
			if(data != null && data != "" && data != "[]") {
				debugger;
				data = JSON.parse(data);
				if(data.message != null && data.message != "" && data.message !="undefined"){
					$("#addNewIntegrationErrorMsg").html("* Datapass name already exists.").show();
					setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},4000);
				}else{
					$("#hiddenIntegrationId").val(data.integrationId);
					//alert("hiddenIntegrationId::"+$("#hiddenIntegrationId").val());
					$("#addNewIntegrationSuccessMsg").html("* Datapass saved successfully").show();
					setTimeout(function(){
						$('#addNewIntegrationSuccessMsg').html("");
						$('#saveAndnextBtn').hide();
						callHeaderField = true;
						//resetAddNewIntegrationModel();
						$(".outputTab").show();
						$(".contMappingTab").show();
						$(".customFieldsTab").show();
						$(".staticFieldsTab").show();
						$(".advanceLookupFieldsTab").show();
						$('.nav-item a.active').closest('li').next('li').find('a').trigger('click');
						if($("#integrationType").val() == "http_client") {
							loadHeaderField();
						}
						if($("#integrationType").val() != "rest_client" || $("#integrationType").val() == "mkto_bulk_import") {
							$("#rest_identity_div").hide();
							$("#restIdentity_dev").addClass('col-md-12').removeClass('col-md-6 pr-1');
							$("#oauth_div").addClass('col-md-12').removeClass('col-md-6');
							$("#oauth").hide();
							$("#endpoint_dev").addClass('col-md-12').removeClass('col-md-6 pr-1');
							$("#accesstoken_div").addClass('col-md-12').removeClass('col-md-6');
							$("#accessToken").hide();
						}
						enableDatapassButton();
					},4000);
				}
				
			}else  {
				$("#addNewCustomerLoader").hide();
				$("#addNewIntegrationErrorMsg").html("* error occurred while inserting record in table, kindly check with development team.").show();
				setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");enableDatapassButton();},5000);
			}
			
			debugger;
			if($("#integrationType").val() == "http_client") {
				
			}
			
			/* $("#addNewCustomerLoader").hide();
			if(result == "success") {
				$("#addNewIntegrationSuccessMsg").html("* Integration inserted successfully").show();
				setTimeout(function(){
					$('#addNewIntegrationSuccessMsg').html("");
					resetAddNewIntegrationModel();
				},4000);
				
			}else if(result == "integrationNameExists"){
				$("#addNewIntegrationErrorMsg").html("* Integration name already exists.").show();
				setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");},4000);
			}
			else  {
				//$("#mergeLoader").hide();
				$("#addNewIntegrationErrorMsg").html("* error occurred while inserting record in table, kindly check with development team.").show();
				setTimeout(function(){$('#addNewIntegrationErrorMsg').html("");},5000);
			} */
		}
	});  
}

function loadHeaderField(){
	loadHeaderLookupValuesForAccept();
	loadHeaderLookupValues();
	loadHeaderLookupValuesForAcceptCharset();
	loadHeaderLookupValuesForUserAgent();
	loadHeaderLookupValuesForAcceptEncoding();
	$(".customFieldsTabForHeaderFields").show();
	$('#addHeaderFieldsDiv').html('');
	$('#addMultipleHeaderFieldsDiv').html('');
	compCountForHeaderFields=0;
	showHeaderFieldsTextBox();
}

function addLookupParent() {
    if (document.getElementById('lookup_checkbox').checked) {
        document.getElementById('lookup_parent').style.display = 'block';
    } else {
        document.getElementById('lookup_parent').style.display = 'none';
    }
}

/* function addClientOthersLookup() {
    if (document.getElementById('others_lookup_checkbox').checked) {
        $("#others_client_lookup_div").show();
    } else {
        $("#others_client_lookup_div").hide();
    }
} */

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    	return false;
    }
    return true;
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
	var integrationId = $("#hiddenIntegrationId").val();
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

function downloadLookupSampleHeader(){
	$("#lookupUploadLoader").show();
	document.location.href ='downloadLookupSampleHeader.do'
	$("#lookupUploadLoader").hide();
	$("#lookupUploadSuccessMsg").html("*sample lookup file downloaded successfully").show();
	setTimeout(function(){
		$('#lookupUploadSuccessMsg').html("");
	},2000);
}

function loadIntegrationType() {
	var finalURL = "loadIntegrationType.do";
	$.ajax({
		url : finalURL,
		async:false,
		success : function(result) {
			var resultValue = result.toString();
			$("#integrationType").html(result);
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

function showJsonFieldTextBox() {
	var $addNew = $("<tr><td><input type='text' class='form-control form-control-sm' id='sunmartechjsonfield_"+compCountForJsonField+"' onkeyup='checkJsonField("+compCountForJsonField+")' disabled></td><td><select id='jsonsunmartechnamevalue_"+compCountForJsonField+"' class='form-control form-control-sm' name='jsonsunmartechnamevalue'></select></td><td><input type='checkbox' id='chkboxjsonfield_"+compCountForJsonField+"' aria-label='...'></td><td><button type='button' id='functionButtonjsonfield_"+compCountForJsonField+"' class='btn btn-info btn-sm' onclick=callContactMapCsf("+compCountForJsonField+",false,'jsonField') title='Apply Functions' >F(x)</button></td><td><button type='button' class='btn btn-info btn-sm' onclick=applyLookups("+compCountForJsonField+",false,'jsonField') title='Apply Lookups'>Lookup</button></td></tr>");
	$("#addJsonFieldDiv").append($addNew);
	$("#jsonsunmartechnamevalue_"+compCountForJsonField).html(jsonFieldValue);
	compCountForJsonField++;
}

function disableDatapassButton(){
	document.getElementById('saveAndnextBtn').disabled = true;
	document.getElementById('saveIntegrationBtn').disabled = true;
	document.getElementById('completeIntegrationBtn').disabled = true;
}
function enableDatapassButton(){
	document.getElementById('saveAndnextBtn').disabled = false;
	document.getElementById('saveIntegrationBtn').disabled = false;
	document.getElementById('completeIntegrationBtn').disabled = false;
}

</script>
<!-- Header Starts -->
<header>
<input type="hidden" id="hiddenIntegrationId" name="hiddenIntegrationId" value="">
<input type="hidden" id="hiddenMsorValue" name="hiddenMsorValue" value="">
	<div class="container-fluid">
		<nav class="navbar navbar-expand-lg navbar-default fixed-top py-0 p-2">
		<!-- Logo and Mobile Toggle Icon Start -->
			<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 navbar-header px-2">
				<img src="${pageContext.request.contextPath}/resources/images/sunmartech.png" class="dcHdrLogo">
				<button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="sr-only">Toggle navigation</span>
					<span class="navbar-toggler-icon"></span>
				</button>
				<a class="navbar-brand nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<%-- <object type="image/svg+xml" data="${pageContext.request.contextPath}/resources/images/dc_logo_header.svg" class="dcHdrLogo">
						DemandCentr Logo
					</object> --%>
				</a>
				<div id="divDrpDownMenuItem">
				
				</div>
			</div>
			<!-- Logo and Mobile Toggle Icon Ends -->
			<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 text-center pgTitle">SMT LeadSender-DASHBOARD <span id="titleHeading"></span></div>
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
	<!--  <div class="row breadcrumbsDiv breadcrumbs-fixed box-shadow">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<ol class="breadcrumb">
						<li><i class="acq-icon fa fa-home home-icon"></i> <a href="#">Home</a></li>
						<li class="active">Dashboard</li>
					</ol>
				</div>
			</div>
		</div>
	</div>-->
	
	<div class="row">
		<div class="container">
			<div class="row">
				<div class="col-md-12 margB20 mt-3">
					<div class="page-header">
						<!-- <h1>Dashboard <small><i class="ace-icon fa fa-angle-double-right"></i> overview &amp; statistics</small></h1> -->
					</div>
					<div class="row">
						<div id="refreshTimerMsg" class="col-md-12 error_msg text-center"></div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="row margB10">
						<!-- Icons starts -->
						<div class="col-md-12 col-xs-12">
							<div class="row">
								<div class="col-md-4 col-sm-4 col-xs-6" style="display:none;" id="newIntegration">
									<div class="dashBlk text-center bg_lb">
									<!-- <a href="amusopportunity.do"><i class="fa fa-user-plus fa-3x" aria-hidden="true"></i> <span class="lnkTxt">New Customer</span></a> -->
										<a href="#" data-toggle="modal" data-target="#newCustomerModal"><i class="fa fa-user-plus fa-3x" aria-hidden="true"></i> <span class="lnkTxt">New Datapass</span></a>
									</div>
								</div>
								<div class="col-md-4 col-sm-4 col-xs-6" style="display:none;" id="updateIntegration">
									<div class="dashBlk text-center bg_lg">
										<a href="updateIntegration.do" target="_self"><i class="fa fa-address-card fa-3x" aria-hidden="true"></i> <span class="lnkTxt">Update Datapass</span></a>
									</div>
								</div>
								<!-- <div class="col-md-4 col-sm-4 col-xs-6">
									<div class="dashBlk text-center bg_lo">
										<a href="amusopportunity.do" onclick='return false' target="_blank"><i class="fa fa-tachometer fa-3x" aria-hidden="true"></i> <span class="lnkTxt">Monitoring</span></a>
									</div>
								</div> -->
								<div class="col-md-4 col-sm-4 col-xs-6" style="display:none;" id="fileUploadIntegration">
									<div class="dashBlk text-center bg_dp">
										<a href="fileupload.do" target="_self"><i class="fa fa-upload fa-3x" aria-hidden="true"></i> <span class="lnkTxt">File Upload</span></a>
									</div>
								</div>
							</div>
						</div>
						<!-- Icons Ends -->
						<!-- Bar Chart Starts -->
						<!-- <div class="col-md-6 col-xs-12 white">
							<div class="bdrGrey">
							<p class="h3 paddTB10 margTop margB10">Welcome to <strong>Lead<span class="greenTxt">MATCH SaaS</span></strong></p>
							<p class="margB20">It will allow to add new customer along with campaign details. The status of the existing customers can be analyzed here to do the forecasting along with analytic dashboard.</p>	
							<p class="h4">Benefits and Features :</p>
							<ul class="list-unstyled">
								<li><span class="ts-service-icon benefit-icon text-center"><i class="fa fa-level-up"></i></span> <strong>Reignite old leads</strong></li>
								<li><span class="ts-service-icon benefit-icon text-center"><i class="fa fa-envelope-o"></i></span> <strong>Save $$ by cleaning and enriching leads you already have</strong></li>
								<li><span class="ts-service-icon benefit-icon text-center"><i class="fa fa-laptop"></i></span> <strong>Removes non-viable leads so no more distractions or wasted time</strong></li>
								<li><span class="ts-service-icon benefit-icon text-center"><i class="fa fa-filter"></i></span> <strong>Accelerates the lead generation process</strong></li>
								<li><span class="ts-service-icon benefit-icon text-center"><i class="fa fa-magic"></i></span> <strong>Increase ROI from lead generation campaigns</strong></li>
							</ul>
							</div>
							
							div id="myBarchart" class="bar box-shadow"></div
						</div> -->
						<!-- Bar Chart Ends -->
								
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<%-- <jsp:include page="footer.jsp"></jsp:include> --%>

<!-- Modal Starts -->

<!-- Add New Customer Modal Starts -->
<div class="modal fade bs-example-modal-lg" id="newCustomerModal" tabindex="-1" role="dialog" aria-labelledby="newCutomerModalLabel" data-keyboard="false" data-backdrop="static">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<form id="addClient" class="form-horizontal mb-0">
			
				<div class="modal-header">
				<h4 class="modal-title" id="newCutomerModalLabel"><i class="fa fa-user-plus fa-lg" aria-hidden="true"></i> Add New Datapass</h4>
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
								<ul class="nav" id="myTab" role="tablist">
									<li role="presentation" class="nav-item generalTab"><a href="#general" aria-controls="general" role="tab" data-toggle="tab" class="nav-link active">General</a></li>
									<li role="presentation" class="nav-item outputTab"><a href="#output" aria-controls="output" role="tab" data-toggle="tab" class="nav-link">Output</a></li>
									<li role="presentation" class="nav-item contMappingTab"><a href="#contMapping" aria-controls="contMapping" role="tab" data-toggle="tab" class="nav-link">Mapping</a></li>
									<li role="presentation" class="nav-item customFieldsTab"><a href="#customFields" aria-controls="customFields" role="tab" data-toggle="tab" class="nav-link">Custom Fields</a></li>
									<li role="presentation" class="nav-item customFieldsTabForMyFreshWorks"><a href="#myFreshWorksCustomFields"  class="nav-link" aria-controls="myFreshWorksCustomFields" role="tab" data-toggle="tab">MyFreshWorks Custom Fields</a></li>
									<li role="presentation" class="nav-item staticFieldsTab"><a href="#staticFields" aria-controls="staticFields" role="tab" data-toggle="tab" class="nav-link">Hidden Fields</a></li>
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
											<div class="form-group">
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
															<textarea name="clientSpecificJson" class="form-control" id="clientSpecificJson" placeholder="Enter Client Specific JSON"></textarea>
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
								<div role="tabpanel" class="tab-pane" id="advanceLookupFields">
									<div class="row">
										<div class="col-md-9">
											<span class='text-muted custom-tooltip' data-animation='true' data-toggle='tooltip' data-placement='top'><i class='fa fa-question-circle-o' aria-hidden='true'><span class='tooltiptext'>*Apply lookup for specific conditions. eg.-  if we want country and state lookup is only applied when country value is United States. Then we must provide Json value on advance lookup [{"country":[{"United States":"country--state"}]}].</span></i></span>
											<textarea name="advanceLookup" class="form-control" id="advanceLookup" placeholder='Expression (eg. [{"key":[{"value":"parent--child lookup"}]},{"key":[{"value":"parent--child lookup"}]}] )' title='Expression (eg. [{"key":[{"value":"parent--child lookup"}]},{"key":[{"value":"parent--child lookup"}]}] )' rows="6"></textarea>
										</div>
									</div>
								</div>
								<div role="tabpanel" class="tab-pane" id="headerFields">
									<div class="row">
										<div class="col-md-12 margT10">
											<!-- <button type="button" id="addHeaderFields" onclick="showHeaderFieldsTextBox()" class="btn btn-primary btn-sm" style='margin-right: 10px'> Add Header Fields<span class="fa fa-plus"></span></button> -->	
										
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
					<button id="closeBtn" onclick="closeAddNewIntegrationModel()" type="button" class="btn btn-default bdRadNone smtleadsender-blue-btn mr-0">Close</button>
					<button id="saveAndnextBtn" type="button" class="btn btn-blue greenbtn mr-0">Save&Next <i class="fa fa-forward" aria-hidden="true"></i></button>
					<button id="nextBtn" type="button" class="btn btn-blue greenbtn mr-0">Next <i class="fa fa-forward" aria-hidden="true"></i></button>
					<button id="saveIntegrationBtn" onClick="saveIntegrationDetails()" type="button" class="btn btn-blue bluebtn mr-0">Save Datapass</button>
					<button id="completeIntegrationBtn" onClick="completeIntegration()" type="button" class="btn btn-blue yellowbtn mr-0">Complete Datapass</button>
				</div>
			</form>
		</div>
	</div>
</div>
<!-- Add New Customer Modal Ends -->

<!-- File Upload Modal Starts -->
<!-- <div class="modal fade bs-example-modal-lg" id="fileUploadModal" tabindex="-1" role="dialog" aria-labelledby="fileUploadModalLabel" data-keyboard="false" data-backdrop="static">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<form id="fileUpload" class="form-horizontal">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="closeFileUploadPopUp"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="fileUploadModalLabel"><i class="fa fa-upload fa-lg" aria-hidden="true"></i> File Upload</h4>
				</div>
				<div class="modal-body">
					<div class="row margB10" id="fileUploadLoader">
						<div class="col-md-12 text-center msgSuccess"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>
					</div>
					
					<div id="uploadLeadFileErrorMsg" class="col-md-12" style="color:#ff0000; text-align:center; font-size:12px"></div>
					
					<div class="row">
						<div id="uploadFileErrorMsg" class="col-md-12 error_msg text-center"></div>
					</div>
					<div class="row">
						<div id="uploadFileSuccessMsg" class="col-md-12 success_msg text-center"></div>
					</div>
				
					<div class="row">
						<div class="col-md-12 margTB10">
							<div class="form-group">
								<label for="fileUpldIntgName" class="col-md-3 control-label">Integration Name</label>
								<div class="col-md-9">
									<select id="fileUpldIntgName" name="fileUpldIntgName" class="form-control">
										
									</select>
								</div>
							</div>
							<div class="form-group">
								<label for="selectFile" class="col-md-3 control-label">File to upload</label>
								<div class="col-md-9">
									<input type="file" class="filestyle" data-size="sm" data-placeholder="No file Choosen" id="file_upload" accept=".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button id="closeBtn" type="button" class="btn btn-default bdRadNone" data-dismiss="modal" id="cancelFileUploadPopUp">Close</button>
					<button id="fileUploadBtn" type="button" class="btn btn-dpurple" onClick="uploadFileData()">Upload Now</button>
				</div>
			</form>
		</div>
	</div>
</div> -->
<!-- File Upload Modal Ends -->

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
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button id="closeBtn" type="button" class="btn btn-info bdRadNone smtleadsender-blue-btn" data-dismiss="modal" id="cancelFileUploadPopUp">Close</button>
					<button id="fileUploadBtn" type="button" class="btn btn-info bdRadNone greenbtn" onClick="uploadLookup()">Upload Now</button>
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

<!-- Modal Ends -->
<jsp:include page="footer.jsp"></jsp:include>
</body>
</html>