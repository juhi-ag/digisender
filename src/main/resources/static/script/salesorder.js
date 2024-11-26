var salesOrderCount =0;
var salesOrderArray = [];
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
var rowIdAssetFile = [];
var assetFileCount = 0;
var prevAssetCount = 0;

function setID(obj)
{
	alreadySave=true;
	salesOrderCount =0;
	$("#csfmetadata").hide();
	loadPriceLeadMappingDataToSalesOrder();
	loadCapmaignManagerLookup();
	displayProductTypeRadio();
	prefilSalesOrderForm();
	loadLookupForCountries();
	loadCurrency();
	loadEmployee();
	loadRevenue();
	if(salesOrderCount != null && salesOrderCount >0) {
		openViewAllOrderPopup();
		createSalesOrderCount = 0;
	}else{
		priceLeadMapping = false;
		$('#viewAllOrderModal').modal("hide");
		$("#salesorderproductTypeLabel").html(productTypeForOpp);
		$("#listProductType").show();
		$("#fixProductType").hide();
		$("#programname").hide();
		$("#deliveryMethod").hide();
		$("#prevList").hide();
		$('#createSalesOrderModal').modal("show");
		$("#cpBlk").slideUp();
		$('#cp span').text('+');
		$('#createSalesOrderModal').find('.modal-body').removeClass('vScroll');
		$("#cloneButtonID").hide();
	}
}

function loadSelectedOrderDetails(index){
	populateSalesOrderData(salesOrderArray[index]);
	$("#listProductType").show();
	$("#fixProductType").hide();
	$("#programname").hide();
	$("#deliveryMethod").hide();
	$("#na").hide();
	$("#prevList").hide();
	$("#cpBlk").slideUp();
	$('#cp span').text('+');
	$('#createSalesOrderModal').find('.modal-body').removeClass('vScroll');
	$('#createSalesOrderModal').modal("show");
	$("#cloneButtonID").hide();
}

function openChildPopUp()
{
	$('#seeFileSuppression').modal("show");
	loadPopup();
}

function openViewAllOrderPopup()
{
	$('#viewAllOrderModal').modal("show");
	$("#viewAllOrderTbl").find("tbody").empty();
	if(salesOrderArray != null && salesOrderArray.length > 0) {
		index=1;
		for(i=0; i<salesOrderArray.length; i++) {
			var campaignName = '';
			var subscriptionPeriod = '';
			var amount = '';
			var productType='';
			var noOfLeads ='';
			var targetGeo='';
			var audienceType='';
			
			var data = salesOrderArray[i];
			if(salesOrderArray[i].subscriptionperiod != null && salesOrderArray[i].subscriptionperiod != "") {
				subscriptionPeriod = salesOrderArray[i].subscriptionperiod;
			}
			if(salesOrderArray[i].amount != null && salesOrderArray[i].amount != "") {
				amount =  salesOrderArray[i].amount;
			}
			if(salesOrderArray[i].product_type != null && salesOrderArray[i].product_type != "") {
				productType = salesOrderArray[i].product_type;
			}
			if(salesOrderArray[i].noleads != null && salesOrderArray[i].noleads != "") {
				noOfLeads = salesOrderArray[i].noleads;
			}
			if(salesOrderArray[i].targetgeo != null && salesOrderArray[i].targetgeo != "") {
				targetGeo = salesOrderArray[i].targetgeo;
			}
			if(salesOrderArray[i].audience_type != null && salesOrderArray[i].audience_type != "") {
				audienceType = salesOrderArray[i].audience_type;
			}
			campaignName = $("#opportunityname").val()+"_"+productType+"_"+noOfLeads+"_"+amount;
			var viewAllOrderData = "<tr id=row_"+i+"><td>"+campaignName+"</td><td>"+amount+"</td><td>"+subscriptionPeriod+"</td><td>"+targetGeo+"</td><td>"+audienceType+"</td><td><button type='button' class='btn btn-success btn-xs' onClick='loadSelectedOrderDetails("+i+")'>Create</i></button></td></tr>";
			$("#viewAllOrderTbl").find("tbody").append(viewAllOrderData);
		}
	}else{
		$('#viewAllOrderModal').modal("hide");
		$("#viewAllOrderTbl").find("tbody").empty();
	}
}

function loadCapmaignManagerLookup(){
	if(campaignManagerNames != null && campaignManagerNames != '') {
		var data = JSON.parse(campaignManagerNames);
		var result = '';
		for(var key in data) {
			
			if(key !="View All"){
				if(data[key] == userName) {
					result = result + '<option value="'+data[key]+'" selected>'+key+'</option>';
				}
				else {
					result = result + '<option value="'+data[key]+'">'+key+'</option>';
				}
			}
		}
		$("#campaignManager").html(result);
	}
}

function clearCampaignManager() {
	if($("#campaignManager").val() != null && $("#campaignManager").val() != "") {
		$("#campaignManager").removeClass("bdrRed");
	}
	else {
		$("#campaignManager").addClass("bdrRed");
	}
}


function loadPopup(){
	$.ajax({
		url:"checkSuppressionFileExist.do?opportunityId="+$("#opportunityID").val(),
		async: false,
		success: function(data, textStatus, xhr)
		{
			if(data == "nosuppressionfile") {
				$("#pcsuppressionfile_name").hide();
				$("#deleteSuppression").hide();
			}else{
				$("#pcsuppressionfile_name").show();
				$("#deleteSuppression").show();
				if(pendingSalesOrder)
					$("#deleteSuppression").attr('disabled', 'disabled');
			}
		}
	}) 
	
	$.ajax({
		url:"checkNALFileExist.do?opportunityId="+$("#opportunityID").val(),
		async: false,
		success: function(data, textStatus, xhr)
		{
			if(data == "nonalfile") {
				$("#suppressionList_name").hide();
				$("#deleteNAL").hide();
			}else{
				$("#suppressionList_name").show();
				$("#deleteNAL").show();
				if(pendingSalesOrder)
					$("#deleteNAL").attr('disabled', 'disabled');
			}
		}
	}) 
}


function loadDcattcahmentFiles() {
	var order_id=JSON.parse(selectedRecordData.workorder).workorder_id_text;
	$.ajax({
		url:'loadDcattcahmentFiles.do?order_id='+order_id,
		async: false,
		success: function(data, textStatus, xhr)
		{
			if(data != null && data.length > 0) {
				data = JSON.parse(data);
				var dcAttachment = JSON.parse(data[0].dcAttachment);
				if(dcAttachment !=null){
					if(dcAttachment.sowfileName != null && dcAttachment.sowfileName != "" && dcAttachment.sowfileName != "undefined") {
						$("#sow_name").html(dcAttachment.sowfileName);
					}
					else {
						$("#sow_name").html("");
					}
					if(dcAttachment.assetfileName != null && dcAttachment.assetfileName != "" && dcAttachment.assetfileName != "undefined") {
						$("#asset_name").html(dcAttachment.assetfileName);
					}
					else {
						$("#asset_name").html("");
					}
					if(dcAttachment.pdftemplatefilename != null && dcAttachment.pdftemplatefilename != "" && dcAttachment.pdftemplatefilename != "undefined") {
						$("#pdfTemplateName").html(dcAttachment.pdftemplatefilename);
					}
					else {
						$("#pdfTemplateName").html("");
					}
					if(dcAttachment.pdfmappingfilename != null && dcAttachment.pdfmappingfilename != "" && dcAttachment.pdfmappingfilename != "undefined") {
						$("#pdfMappingName").html(dcAttachment.pdfmappingfilename);
					}
					else {
						$("#pdfMappingName").html("");
					}
					if(dcAttachment.biginternalsowfilename != null && dcAttachment.biginternalsowfilename != "" && dcAttachment.biginternalsowfilename != "undefined") {
						$("#internalsow").html(dcAttachment.biginternalsowfilename);
					}
					else {
						$("#internalsow").html("");
					}
					
					if(dcAttachment.uploaded_asset_filename != null && dcAttachment.uploaded_asset_filename != "" && dcAttachment.uploaded_asset_filename != "undefined") {
						var uploadedAssetArray=dcAttachment.uploaded_asset_filename.split(",");
						var uploadedAsseet ="";
						assetFileCount = uploadedAssetArray.length;
						prevAssetCount = assetFileCount;
						$.each(uploadedAssetArray,function(i){
							var j =i+1;
							var file = 'uploaded_asset'+j;
							file = '"'+file+'"';
							var uploadedAssetValue = '"'+uploadedAssetArray[i]+'"';
							var assetFile = "<a href='#' onclick='return loadWorkOrderFileForAsset("+file+","+uploadedAssetValue+");' id='uploaded_asset"+j+"'>"+uploadedAssetArray[i]+"</a>"; 
							if(uploadedAsseet != ""){
								uploadedAsseet = uploadedAsseet+","+assetFile+"\n";
							}else{
								uploadedAsseet = assetFile+"\n";
							}
						});
						
						$("#uploaded_asset_name").html(uploadedAsseet);
					}
					else {
						$("#uploaded_asset_name").html("");
					}
				}
			}
		},
	}) 
	
}

function loadWorkOrderFile(file, obj)
{
	debugger;
	var filename=obj.innerHTML;
	var order_id=JSON.parse(selectedRecordData.workorder).workorder_id_text;
	var url=obj.origin+"/dc/amus.loadorderfile?order_id="+order_id+"&file="+file+"&filename="+filename;
	 
	window.open(url,'_blank');
}

function loadWorkOrderFileForAsset(file, fimename)
{
	var order_id=JSON.parse(selectedRecordData.workorder).workorder_id_text;
	document.location.href ='amus.loadorderfile?order_id='+order_id+"&file="+file+"&filename="+fimename;
}

function prefilSalesOrderForm()
{
	var sfAccount = $("#sales_lead_id").val();
	var account = $("#accountname").val();
	var ammount = $("#totalValue").val();
	var amount = $("#amount").val();
	var campaign=$("#opportunityname").val();
	var campaignNametemp = campaign+"_"+$("input[name='serviceType']:checked").val();+"_"+$("input[name='serviceType']:checked").val();
	oldProductType = $("input[name='serviceType']:checked").val();
	var stage = $("#stages").val();
	var price=$("#unitPrice").val();
	var quantity=$("#totalValue").val();
	var endcustomername = $("#endCustomerName").val();
	var bonusLeads = $("#bonusleads").val();
	var noofleads =$("#noofleads").val();
	var campaginvalue =$("#amount").val();
	var orderno= $("#sales_opportunity_id").val();
	
	
	debugger;

	
	// disabled the number of leads, rate and campaign value since it is populated automatically.
	if(quantity)
	{
		$("#salesordertotalLead").val(quantity);
		$("#salesordertotalLead").prop('disabled', true);
	}
	else {
		$("#salesordertotalLead").prop('disabled', false);
	}
	if(price)
	{
		$("#salesorderrate").val(price);
		$("#salesorderrate").prop('disabled', true);
	}
	else {
		$("#salesorderrate").prop('disabled', false);
	}
	
	$("#salesorderaccountName").val(account);
	$("#salesorderaccountName").prop('disabled', true);
	$("#salesordersfaccountID").val(sfAccount);
	$("#salesordertotalValue").prop('disabled', true);
	$("#salesordercampaignName").val(campaignNametemp);
	$("#salesorderendCustomerName").val(endcustomername);
	$("#salesorderiddisplay").html(campaign + "(" + orderno + ")");
	$(".partner, .divBox").hide();	
	$("#campaignManager").val(userName);
	document.getElementById("salesorderdirect").checked = true;
	
}

$(document).ready(function(){
	$(document).attr("title", "New /Edit SalesOrder View - Demandcentr Portal");
	$("#titleHeading").text("New Order View");
	// For Multiple Modal popup
	$(document).on('show.bs.modal', '.modal', function (event) {
			var zIndex = 1040 + (10 * $('.modal:visible').length);
			$(this).css('z-index', zIndex);
			setTimeout(function() {
				$('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
			}, 0);
	});
	$('.custom-control-inline input[type="radio"]').click(function(){
		if($(this).attr("value")=="partner"){
            $(".partner, .divBox").show();		
		}
		if($(this).attr("value")=="Direct"){
            $(".partner, .divBox").hide();		
		}
		else {
			$('.divBox2, .weekDiv,.timeDiv,.leadsDiv,.delMth').hide();
		}
	});
	
	$('#salesordercompletionDate').datepicker({
    	autoclose: true,
        format: 'yyyy-mm-dd'
    });
	
	$('input[type="radio"]').click(function(){
		if($(this).attr("value")=="weekly"){
			$(".weekDiv").show();
			$(".timeDiv").show();
			$(".leadsDiv").show();
		}
		if($(this).attr("value")=="semi-monthly"){
			$(".weekDiv").show();
			$(".timeDiv").show();
			$(".leadsDiv").show();
		}
		if($(this).attr("value")=="monthly"){
			$(".weekDiv").show();
			$(".timeDiv").show();
			$(".leadsDiv").show();
		}
		if($(this).attr("value")=="realtime" ||$(this).attr("value")=="daily"||$(this).attr("value")=="daily"){
			//$(".delMth").show();
			$(".weekDiv").hide();
			$(".timeDiv").hide();
			$(".leadsDiv").hide();
		}
		
	});
/*	$('.custom-control-input[type="radio"]').click(function(){
		var productType = $(this).attr("value");
		var campaignNameOld = $("#salesordercampaignName").val();
		
		var newstring =''
			if(oldProductType =='CPL' ||oldProductType =='CQL'){
				if(campaignNameOld.includes('CPL')){
					newstring = campaignNameOld.replace('CPL', productType); 
				}else if(campaignNameOld.includes('CQL')){
					newstring = campaignNameOld.replace('CQL', productType); 
				}else{
					newstring = campaignNameOld;
				}
			}else if(campaignNameOld.includes(oldProductType)){
				newstring = campaignNameOld.replace(oldProductType, productType); 
			}else{
				newstring = campaignNameOld;
			}
		
		//var newstring = campaignNameOld.replace(oldProductType, productType); 
		$("#salesordercampaignName").val(newstring);
		console.log($("#salesordercampaignName").val());
	});*/
	
	$( "#salesorderrate" ).blur(function() {
	    this.value = parseFloat(this.value).toFixed(2);
	});

 $("#salesordertotalLead").keypress(function() {
	// if($("#unitProductType").val() =='Programatic'){
	 if(oldProductType =='Programmatic' ||oldProductType =='Programatic'){
		return this.value.length < 8;
	 }else {
		 return this.value.length < 5;
	 }
 });
 
 /*$("#salesorderleadcommit").keypress(function() {
		 if(oldProductType =='Programatic'){
			return this.value.length < 9;
		 }else {
			 return this.value.length < 6;
		 }
	});*/
 
	
	
});		


function loadLookupsForRegions(selectedRecordData)
{
	$.ajax({
		url:"loadlookups.do",
		async: false,
		success: function(data, textStatus, xhr)
		{
			lookupData=jQuery.parseJSON(data);
			debugger;
			var selregion=data.region;
			//preparing user
			var userLookup=lookupData['user'];
			var userHtml="";
			for(var i=0; i<userLookup.length;i++)
			{
				var rec=userLookup[i];
				userHtml=userHtml+'<option value="'+rec['value']+'">'+rec['name']+'</option>';
			}
	
			// Preparing region//
			var region=lookupData['Region'];
			var regionsHTML='';
			var sel="selected";
			for(var i=0;i<region.length;i++)
			{
				var rec=region[i];	
				if(rec['name']==selregion)
				{
					sel="checked";
				}
				else
					sel="";
				
				regionsHTML=regionsHTML+'<div class="custom-control custom-radio custom-control-inline mr-2"><input type="radio" onclick="showCountry(this)" name="region" class="custom-control-input" id="'+rec['name']+'" value="'+rec['name']+'" '+sel+'><label class="custom-control-label col-form-label-sm pt-0" for="'+rec['name']+'">'+rec['name']+'</label></div>';
			}
			$("#regions").html(regionsHTML);
			$(".regBlk").hide();
			showCountry($("#undefined").id);
			
		},
		error: function(xhr, textStatus, errorThrow)
		{
			debugger; 
			console.log(xhr);
			console.log(textStatus);
			console.log(errorThrow);
			$("#dialog").dialog("close");
		}
	}) 
}

function populateSalesOrderData(salesOrderData){
	var opportunityPriceLeadId = '';
	var numberOfLeads = '';
	var rate = '';
	var currency = '';
	var amount = '';
	var productType = '';
	var bonusLeads = '';
	
	if(salesOrderData.opportunity_pricelead_mapping_id != null && salesOrderData.opportunity_pricelead_mapping_id != "") {
		opportunityPriceLeadId = salesOrderData.opportunity_pricelead_mapping_id_text;
	}
	if(salesOrderData.noleads != null && salesOrderData.noleads != "") {
		numberOfLeads = salesOrderData.noleads;
	}
	if(salesOrderData.rate != null && salesOrderData.rate != "") {
		rate =  salesOrderData.rate;
	}
	if(salesOrderData.currency != null && salesOrderData.currency != "") {
		currency = salesOrderData.currency;
	}
	if(salesOrderData.amount != null && salesOrderData.amount != "") {
		amount =  salesOrderData.amount;
	}
	if(salesOrderData.product_type != null && salesOrderData.product_type != "") {
		productType =  salesOrderData.product_type;
		oldProductType = productType;
	}
	if(salesOrderData.bonusleads != null && salesOrderData.bonusleads != "") {
		bonusLeads =  salesOrderData.bonusleads;
	}
	//var num1 = Math.round(numberOfLeads);
	//$("#salesorderleadcommit").val(num1*3);
	//$("#salesorderleadcommit").val(numberOfLeads*3);
	$("#opportunityPriceLeadId").val(opportunityPriceLeadId);
	$("#salesordercurrency").val(currency);
	$("#salesorderrate").val(rate);
	
	if(productType == 'CPL' || productType == 'CQL'){
		$('input:radio[value=CQL]').prop('checked',true);
	}else{
		$('input:radio[value="'+productType+'"]').prop('checked',true);
	}
	$("#salesordertotalValue").val(currency+" "+amount);
	$("#salesordercampaignName").val($("#opportunityname").val()+"_"+productType+"_"+numberOfLeads+"_"+amount);
	$("#salesordertotalLead").val(numberOfLeads);
	$("#salesorderbonus_leads").val(bonusLeads);
	$("#salesorderendCustomerName").val(salesOrderData.endcustomername);
	$("#targetGeo").val(salesOrderData.targetgeo);
	$("#audienceType").val(salesOrderData.audience_type);
	$(".partner, .divBox").hide();
	document.getElementById("salesorderdirect").checked = true;
	
}


	function loadPriceLeadMappingDataToSalesOrder() {
		$.ajax({
			url:'loadPriceLeadMappingData.do?salesOpportunityId='+$("#sales_opportunity_id").val(),
			type:"POST",
			async: false,
			success: function(data, textStatus, xhr)
			{
				if(data != null && data.length > 0) {
					salesOrderArray= [];
					index=0;
					for(i=0; i<data.length; i++) {
						var orderCreated = '';
						if(data[i].wocreated != null && data[i].wocreated == "Y") {
							orderCreated = data[i].wocreated;
							index++;
						}else{
							salesOrderArray.push(data[i]);
						}
					
					}
					workOrderCount = index;
					salesOrderCount = salesOrderArray.length;
				}
			},
		}) 
		
	}
	
	function addUpdateOrder(obj)
	{
		if($("#salesordercampaignName").val() == null || $("#salesordercampaignName").val() == "") {
			$("#salesordercampaignNameMsg").html("* Please enter campaign name.");
			setTimeout(function(){$("#salesordercampaignNameMsg").html('');},3000);
			return false;
		}
		if($('#salesordercampaignName').val()!=null && $('#salesordercampaignName').val()!='') {
			if($('#salesordercampaignName').val().indexOf(',') != -1) {
				$("#salesordercampaignNameMsg").html("* Comma is not allowed.").show();
				setTimeout(function(){$('#salesordercampaignNameMsg').html("");},4000);
				return false;
			}
		} 
		
		if(productTypeForOpp!="Data"){
			if(!$("#salesordertotalLead").is(':disabled') && ($("#salesordertotalLead").val()==null || ($("#salesordertotalLead").val()==""))){
				$("#salesOrderNoOfLeadsMsg").html("* Number of leads can't be empty.").show();
				setTimeout(function(){$("#salesOrderNoOfLeadsMsg").html('');},3000);
				return false;
			}
		}
		
		//loadCsfLookupData();
	    var message = "";
	    var csfLookupMatch = "";
	    if(csfLookupSelectList.length > 0){
			var lookupSelectList =csfLookupSelectList.split(",");
			$.each(lookupSelectList, function(i) {
				csfLookupMatch = csfLookupTypeList.indexOf(lookupSelectList[i]);
				if(csfLookupMatch > -1){
				
				}
				else{
					message = message+lookupSelectList[i]+", ";
				}
			});
			if(message != null && message != "") {
				message = message.substring(0,message.lastIndexOf(","));
				$("#csfMsg").addClass("error_msg").html("* kindly upload "+message+" lookup file").show();
				setTimeout(function(){
					$("#csfMsg").html("").hide();
				},4000);
				return false;	
			}
	    }
	   if(!alreadySave && !defaultFieldsFromOpportunity){
		   defaultCSFColumnSave();
	    	$("#saveMapFields").click();
	    }else if(!alreadySave && defaultFieldsFromOpportunity){
	    	$("#saveMapFields").click();
	    }
		
		var flowToCW=$("input[name='flowtocw']").is(":checked")?'Y':'N';
			
		if(isNaN($("#salesordertotalLead").val())){ 
			$("#salesOrderNoOfLeadsMsg").html("* Number of leads can be numeric only.").show();
			setTimeout(function(){$("#salesOrderNoOfLeadsMsg").html('');},3000);
			return false;
		}
		var serviceType = $("input[name='serviceType']:checked").val();
		
		 if((serviceType=='Programmatic' || serviceType=='Programatic')&&($("#salesordertotalLead").val() && parseInt($("#salesordertotalLead").val())>99999999)){
				$("#salesOrderNoOfLeadsMsg").html("* Please enter No of leads  max 99999999 ").show();
				setTimeout(function(){$('#salesOrderNoOfLeadsMsg').html("");},4000);
				return false;
		 }else if((serviceType!='Programmatic'|| serviceType!='Programatic') && ($("#salesordertotalLead").val() && parseInt($("#salesordertotalLead").val())>99999)){
				$("#salesOrderNoOfLeadsMsg").html("* Please enter No of leads  max 99999 ").show();
				setTimeout(function(){$('#salesOrderNoOfLeadsMsg').html("");},4000);
				return false;
		 }
			
			var numbers = /^[0-9]+$/;
			if($('#salesorderbonus_leads').val()!="" && $('#salesorderbonus_leads').val() >0 && !$('#salesorderbonus_leads').val().match(numbers)){
				$("#salesOrderNoOfLeadsMsg").html("Please enter only number in Bonus leads value .").show();
				setTimeout(function(){$('#salesOrderNoOfLeadsMsg').html("").hide();},3000);
				return ;
			}
		 
		 if($("#salesorderrate").val() ==null || $("#salesorderrate").val() == ""|| $("#salesorderrate").val() == undefined ||isNaN($("#salesorderrate").val())){
				$("#salesorderrateMsg").html("* Please enter Rate ").show();
				setTimeout(function(){$('#salesorderrateMsg').html("");},3000);
				return false;
			}	 
		 
		 if( /\,/.test( $('#salesorderrate').val() ) ) {
				$("#salesorderrateMsg").html("Please enter rate without comma .").show();
				setTimeout(function(){
					$('#salesorderrateMsg').html("").hide();
					},3000);
				return ;
			}
		// check if hybrid is selected then percentage allocated to india can't be null
		 if($("#Hybrid:checked").val() != "" && $("#Hybrid:checked").val() != undefined){
			if(($("#salesorderidcAllocation").val()==null || ($("#salesorderidcAllocation").val()==""))){
			$("#perMsg").html("* Percentage Allocated to India can't be empty.");
			setTimeout(function(){$("#perMsg").html('');},3000);
			return false;
			}
		 
		// check if percentage allocated to india is numeric only
		if(isNaN($("#salesorderidcAllocation").val())){ 
			$("#perMsg").html("* Percentage Allocated to India can be numeric only.");
			setTimeout(function(){$("#perMsg").html('');},3000);
			return false;
		}
		 }
		 
		if($("#salesorderasset").val() != "" && $("#salesorderasset").val() != undefined) {
			var fileName = $("#salesorderasset").prop("files")[0]['name'].toLowerCase();
			if(fileName.lastIndexOf(".pdf") != -1 || fileName.lastIndexOf(".csv") != -1 || fileName.lastIndexOf(".xls") != -1 || 
				fileName.lastIndexOf(".xlsx") != -1 || fileName.lastIndexOf(".doc") != -1 || fileName.lastIndexOf(".docx") != -1) {
        	}
        	else {
        		var extension = fileName.substring(fileName.lastIndexOf(".")+1, fileName.length);
        		$("#refDocsMsg").html("* Selected filetype ("+ extension +") not allowed in Upload Asset Links.").show();
        		setTimeout(function() {$("#refDocsMsg").hide()}, 5000);
        		return false;
        	}
    	}
		
		if($("#salesorderinternalsow").val() != "" && $("#salesorderinternalsow").val() != undefined) {
			var fileName = $("#salesorderinternalsow").prop("files")[0]['name'].toLowerCase();
			if(fileName.lastIndexOf(".pdf") != -1 || fileName.lastIndexOf(".doc") != -1 || fileName.lastIndexOf(".docx") != -1) {
        	}
        	else {
        		var extension = fileName.substring(fileName.lastIndexOf(".")+1, fileName.length);
        		$("#refDocsMsg").html("* Selected filetype ("+ extension +") not allowed in Internal SOW.").show();
        		setTimeout(function() {$("#refDocsMsg").hide()}, 5000);
        		return false;
        	}
    	}
		 if(isNaN($("#numberOfRecords").val())){ 
			 	$("#noOfRecordsPerDomainMsg").html("* Number of records per domain can be numeric only.");
			 	setTimeout(function(){$("#noOfRecordsPerDomainMsg").html('');},3000);
			 	return false;
			}
		 
		 if($("input[name='includeOrderFormatting']").is(":checked")) {
			if($("#order").val() == null || $("#order").val() == "") {
				$("#orderFormattingMsg").html("* Please select order for formatting.").show();
				 setTimeout(function(){$("#orderFormattingMsg").html('');},3000);
				return false;
			}
		 } 
		 if($("#salesordercompletionDate").val() == null || $("#salesordercompletionDate").val() == ""|| $("#salesordercompletionDate").val()== undefined) {
				$("#completionMsg").html("* Please select Completion Date.").show();
				setTimeout(function(){$("#completionMsg").html('');},3000);
				return false;
		 }
		 
		 if($("#campaignManager").val() == null || $("#campaignManager").val() == ""|| $("#campaignManager").val()== undefined) {
				$("#campaignManagerMsg").html("* Please select Campaign Manager.").show();
				setTimeout(function(){$("#campaignManagerMsg").html('');},3000);
				return false;
		 	}
		 
		 var revenueMin = 0;
		 var revenueMax = 0;
		 if($("#salesorderrevenue").val() && $("#salesorderrevenue").val().indexOf("+")!= -1 ){
				 revenueMin = $("#salesorderrevenue").val().split("+")[0].trim().substring(1,$("#salesorderrevenue").val().split("+")[0].length);
		 }else if($("#salesorderrevenue").val()){
				 revenueMin = $("#salesorderrevenue").val().trim().substring(1,$("#salesorderrevenue").val().length);
			 }
		 if($("#salesorderrevenueMax").val()){
			 revenueMax = $("#salesorderrevenueMax").val().trim().substring(1,$("#salesorderrevenueMax").val().length);
		 }
		 
		 if(revenueMin==10000000001 && revenueMax>0&& parseInt(revenueMin) > parseInt(revenueMax)){
				$("#salesorderRevenueMsg").html("* Revenue Min cannot be greater than Revenue max.").show();
				setTimeout(function(){$('#salesorderRevenueMsg').html("");},4000);
				document.getElementById('leadInfo').scrollIntoView();
				return false;
		 }
		 else if(revenueMin>=0 && revenueMin!=10000000001 && parseInt(revenueMin) > parseInt(revenueMax)){
				$("#salesorderRevenueMsg").html("* Revenue Min cannot be greater than Revenue max.").show();
				setTimeout(function(){$('#salesorderRevenueMsg').html("");},4000);
				document.getElementById('leadInfo').scrollIntoView();
				return false;
		 }
		 
		 var empSizeMin ='';
		 var empSizeMax = '';
		 if($("#salesorderempSize").val() && $("#salesorderempSize").val().indexOf("+")!= -1 ){
				 empSizeMin = $("#salesorderempSize").val().split("+")[0];
				 
		 }else if($("#salesorderempSize").val()){
				 empSizeMin = $("#salesorderempSize").val();
				
			 }
		 if($("#salesorderempSizeMax").val()){
			 empSizeMax = $("#salesorderempSizeMax").val();
		 }
		 
		 if(empSizeMin && empSizeMax && parseInt(empSizeMin.trim()) > parseInt(empSizeMax.trim())){
				$("#empSizeMsg").html("* Emp Size Min cannot be greater than Emp Size Max").show();
				setTimeout(function(){$('#empSizeMsg').html("");},4000);
				document.getElementById('leadInfo').scrollIntoView();
				return false;
		 }
		 
		 if((empSizeMax && parseInt(empSizeMax)>2147483647)|| (empSizeMin && parseInt(empSizeMin)>2147483647)){
				$("#empSizeMsg").html("* Emp Size cannot be greater than 2147483647").show();
				setTimeout(function(){$('#empSizeMsg').html("");},4000);
				document.getElementById('leadInfo').scrollIntoView();
				return false;
		 }
		 
				 
		debugger;
		var operation="add";
		var accountID=$("#salesordersfaccountID").val();
		var opportunityID=$("#sales_opportunity_id").val();
		if(selectedOrderData!=''){
			opportunityID = $("#opportunityID").val();
		}
			
		var salesOrdercompletionDate=$("#salesordercompletionDate").val();
		if(salesOrdercompletionDate!= "" && salesOrdercompletionDate != undefined) {
		salesOrdercompletionDate = salesOrdercompletionDate.replace(/-/g, '/')
		}else{
			salesOrdercompletionDate = null;
		}
		
			
		var excludednc=$("input[name='excludednc']").is(":checked")?'Y':'N';
		
		var yesOpportunity=$("input[name='yesOpportunity']").is(":checked")?'Y':'N';
		
		var suppressionList=$("input[name='SUPPRESSION_LIST']:checked").val()!=undefined?$("input[name='SUPPRESSION_LIST']:checked").val():'';
		
		var serviceType ='';
		
		
		serviceType = $("input[name='serviceType']:checked").val();
		
		if($("salesOrdercountry").val()!=''){
			var regionValue = "specificCountries";
		}else{
			var regionValue='';
		}
		
				
		var accountName ='';
		if($('#company_companyname').val() != undefined){
			accountName = $('#company_companyname').val();
		}else if(selectedOrderData!=''){
			accountName = JSON.parse(selectedRecordData.workorder).companyname;
		}
		
		var opprName ='';
		if($("#opportunityname").val() != undefined){
			opprName = $("#opportunityname").val();
		}else if(selectedOrderData!=''){
			opprName = JSON.parse(selectedOrderData.workorder).opportunity_name;
		}
		
		var clientBase = '';
		if($("#company_region").val() != undefined){
			clientBase = $("#company_region").val();
		}else if(selectedOrderData!=''){
			clientBase = JSON.parse(selectedOrderData.workorder).client_base;
		}
		var opportunityPriceLeadId = '';
		if($("#opportunityPriceLeadId").val() != undefined && priceLeadMapping){
			opportunityPriceLeadId = $("#opportunityPriceLeadId").val();
		}
		
		var includeOrderFormatting=$("input[name='includeOrderFormatting']").is(":checked")?'Y':'N';
		
		var relationship=$("input[name='relationship']:checked").val()!=undefined?$("input[name='relationship']:checked").val():'';
		var mobileMandatory=$("input[name='mobileMandatory']:checked").val()!=undefined?$("input[name='mobileMandatory']:checked").val():'';
		
		var unitPriceTableData = [];
		    var obj = {}
		    obj["ProductType"] = serviceType;
		    obj["Currency"] = $("#salesordercurrency").val();
		    obj["UnitPrice"] = $("#salesorderrate").val();
		    obj["NumberOfLeads"] = $("#salesordertotalLead").val();
		    obj["Amount"] = $("#salesordertotalValue").val();
		    obj["BonusLeads"] =$("#salesorderbonus_leads").val();
		    obj["SubscriptionPeriod"] = "";
		    obj["targetGeo"] = $("#targetGeo").val();
		    obj["audienceType"] =encodeURIComponent($("#audienceType").val())
		    obj["OrderCreated"] ='N';
		    unitPriceTableData.push(obj);
		    unitPriceTableJson = JSON.stringify(unitPriceTableData);
		
		
		    var bonusLeads = 0;  
		   if( $("#salesorderbonus_leads").val()){
			   bonusLeads = $("#salesorderbonus_leads").val();
		   }
		prefillFormatingOrders();
		prefillYesFromOppr();
		
		var fieldval="product_type="+serviceType+"&customer_type="+relationship+"&rate="+$("#salesorderrate").val()+"&campaign_value="+$("#salesordertotalValue").val()+"&currency="+$("#salesordercurrency").val()+"&delivery_region="+regionValue+"&account_id="+accountID+"&sf_opportunityid="+opportunityID+"&wostatus=verify"+"&opportunityPriceLeadId="+opportunityPriceLeadId+"&companyname="+encodeURIComponent(accountName)+"&opportunity_name="+encodeURIComponent(opprName)+"&client_base="+clientBase+"&campaign_manager="+$("#campaignManager").val()+"&unitPriceTableData="+unitPriceTableJson+"&mobile_mandatory="+mobileMandatory;
		var fieldval1="&revenue_min="+revenueMin+"&employee_size_min="+empSizeMin+"&delivery_day="+$("#salesorderdeliveryDay").val()+"&delivery_time="+$("#salesorderdeliveryTime").val()+"&delivery_number="+$("#salesorderdeliveryNumber").val()+"&frequency="+$("input[name='frequency']:checked").val()+"&delivery_method="+$("input[name='deliveryMethod']:checked").val()+"&idcAllocation="+$("#salesorderidcAllocation").val()+"&number_of_leads="+document.getElementById('salesordertotalLead').value+"&end_customer_name="+$("#salesorderendCustomerName").val()+"&suppression_list="+suppressionList+"&employee_size_max="+empSizeMax+"&revenue_max="+revenueMax+"&category_type="+$("#salesordercategory").find('option:selected').val()+"&category_name="+$("#categoryName").val()+"&additional_criteria="+$("#additionalCriteria").val()+"&programNameList="+programNameList+"&excludedncflag="+excludednc+"&suppression_opportunity="+yesOpportunity+"&bonus_leads="+bonusLeads+"&includeorderformatting="+includeOrderFormatting+"&formattingorderid="+$("#formattingOrderId").val()+"&targetgeo="+$("#targetGeo").val();
		var fieldval2="&custom_question="+encodeURIComponent($("#questions").val())+"&campaign_name="+encodeURIComponent($("#salesordercampaignName").val())+"&numberOfRecordsPerDomain="+$("#numberOfRecords").val()+"&target_titles="+encodeURIComponent($("#targetTitle").val())+"&industry="+encodeURIComponent($("#salesorderindustry").val())+"&jobfunction="+encodeURIComponent($("#salesOrderJobFunction").val())+"&seniority_level="+encodeURIComponent($("#salesOrderSeniorityLevel").val())+"&yesFromOppr="+encodeURIComponent($("#salesOrderYesFromOpportunityId").val());
		if(salesOrdercompletionDate != null){
			fieldval2 = fieldval2+"&completiondate="+encodeURIComponent(salesOrdercompletionDate)+"&audiencetype="+encodeURIComponent($("#audienceType").val());
		}
		
		if(selectedOrderData!='')
		{
			operation="update";
			fieldval=fieldval+"&workorder_id="+JSON.parse(selectedRecordData.workorder).workorder_id_text;
			fieldval=fieldval+"&workorder_id_text="+JSON.parse(selectedRecordData.workorder).workorder_id_text;
			fieldval1=fieldval1+"&order_stage="+JSON.parse(selectedRecordData.workorder).order_stage;	
		}
		
		
		var formData=new FormData();
		var query = (fieldval+fieldval1)+fieldval2;
		var queryString=encodeURI(fieldval+fieldval1)+fieldval2;
		
		
		var sowfile=$("#salesordersow")[0].files[0];
		if(sowfile)
			formData.append("sow", sowfile);
		
		
		var assetfile=$("#salesorderasset")[0].files[0];
		if(assetfile)
			formData.append("asset", assetfile);
		
		
		var pdfMapping=$("#salesorderpdfMapping")[0].files[0];
		
		if(pdfMapping)
			formData.append("pdfMapping", pdfMapping);
		
		
		var pdfTemplate=$("#salesorderpdfTemplate")[0].files[0];
		
		if(pdfTemplate)
			formData.append("pdfTemplate", pdfTemplate);
		
		
		for(var i=0; i<assetFileCount; i++) {
			if($("#assetFiles_"+i)[0] != undefined){
			 var assetFile=$("#assetFiles_"+i)[0].files[0];
			 formData.append("assetFile"+i, assetFile);
			}
		}
		
		for(var i=0; i<nalFileCount; i++) {
			if($("#salesordersuppressionList_"+i)[0] != undefined){
			 var suppressionFile=$("#salesordersuppressionList_"+i)[0].files[0];
			 formData.append("suppressionFile"+i, suppressionFile);
			}
			
		}
		
		for(var i=0; i<fileCount; i++) {
			if($("#salesorderpcsuppressionfile_"+i)[0] != undefined){
			 var pcsuppressionFile=$("#salesorderpcsuppressionfile_"+i)[0].files[0];
			 formData.append("pcsuppressionFile"+i, pcsuppressionFile);
			}
			
		}
		
		if(sowfile)
			formData.append("sow", sowfile);
		
		var internalSow=$("#salesorderinternalsow")[0].files[0];
		
		if(internalSow)
			formData.append("internalSow", internalSow);
		
		formData.append("stage",'SALES');
		if(regionValue =="specificCountries"){
			formData.append("volumeGeography",createSpecificCountryData());
		}else{
			formData.append("volumeGeography",createCountryStateData());
		}
		var loadUrl="";	
			loadUrl="addupdatesalesorder.do?"+queryString;
		$("#salesOrderLoader").show();
		$.ajax({
			url:loadUrl,
			data:formData,
			contentType:false,
			cache:false,
			processData:false,
			type:"POST",	
			success: function(data, textStatus, xhr)
			{
				debugger;
				if(data != null && data != "") {
					$("#salesOrderLoader").hide();
					data = JSON.parse(data);
					console.log(data);
					
					if(data.message=="campaignNameAlreadyExists") {
		        		$("#salesordercampaignName-error").html("CampaignName name already exists.").show();
		        		setTimeout(function(){$('#salesordercampaignName-error').hide();},5000);
		        	}else if(data.message=="suppressionListError") {
		        		$("#salesOrderSuppressionMsg").html("One of the columns from domain, accountname, dunsnumber and email is mandatory").show();
		        		setTimeout(function(){$('#salesOrderSuppressionMsg').hide();},5000);
		        	}else if(data.message=="NALError") {
		        		$("#salesOrderNALMsg").html("One of the columns from domain, accountname, dunsnumber and email is mandatory").show();
		        		setTimeout(function(){$('#salesOrderNALMsg').hide();},5000);
		        	}
					else{
					if(createSalesOrderCount < salesOrderCount-1){
						createSalesOrderCount++;
						loadPriceLeadMappingDataToSalesOrder();
						prefilSalesOrderForm();
						openViewAllOrderPopup();
						$('#createSalesOrderModal').modal("hide");
					}else{
						debugger;
						options = [];
						orderIdOptions = [];
						orderIdCampaignNameJsonArray = [];
						prefillFormattingOrderId = false;
						jobFunctionOptions = [];
						seniorityLevelOptions = [];
						specificCountryOptions = [];
						jobTitleOptions = [];
						industryOptions = [];
						yesFromOpprOptions = [];
						opprIdOptions = [];
						opprIdOpprNameJsonArray = [];
						prefillYesFromOpprId = false;
						var rowIdFile = [];
						var fileCount = 1;
						var rowIdNALFile = [];
						var nalFileCount = 1;
						$('#viewAllOrderModal').modal("hide");
						$('#createSalesOrderModal').modal("hide");
						$("#pbg, #pbg-error").modal("hide");
						$("#createNewOrderForm").trigger('reset');
						$(".weekDiv").hide();
						$(".timeDiv").hide();
						$(".leadsDiv").hide();
						
						$("#pbg").modal("show");
						if(selectedOrderData!=''){
							$("#pbg .modal-body p").text("Your Sales order has been updated successfully.");
							fetchTotalOrderCountForFilter();
							fetchOrderViewRecords();
						}else{
							$("#pbg .modal-body p").text("Your Sales order has been Created successfully.");
							enableButtons();
						}
						
						}
						$("#sales_opportunity_id").val(opportunityID);
					}
				}
			},
			error: function(xhr, textStatus, errorThrow)
			{
				debugger;
				$('#createSalesOrderModal').modal("hide");
				$("#pbg, #pbg-error").modal("hide");
				$("#salesOrderLoader").hide();
				$("#createNewOrderForm").trigger('reset');
				$(".weekDiv").hide();
				$(".timeDiv").hide();
				$(".leadsDiv").hide();
				$("#pbg-error").modal("show");
			}
			}) 
	}

	function closeNewOrderWin()
	{ 
		$('#createSalesOrderModal').modal("hide");
		$("#pbg, #pbg-error").modal("hide");
		$("#customQuestions .card-body").html("");
		$("#createNewOrderForm").trigger('reset');
		$("#salesorderprogramNameDiv").trigger('reset');
		$(".weekDiv").hide();
		$(".timeDiv").hide();
		$(".leadsDiv").hide();
		resetOpportunityDetailsFromSalesOrder();
		options = [];
		orderIdOptions = [];
		orderIdCampaignNameJsonArray = [];
		prefillFormattingOrderId = false;
		jobFunctionOptions = [];
		seniorityLevelOptions = [];
		specificCountryOptions = [];
		jobTitleOptions = [];
		industryOptions = [];
		prefilSalesOrderForm();
		yesFromOpprOptions = [];
		opprIdOptions = [];
		opprIdOpprNameJsonArray = [];
		prefillYesFromOpprId = false;
		rowIdFile = [];
		fileCount = 1;
		rowIdNALFile = [];
		nalFileCount = 1;
	}

	
	function calculateCountryPercent(obj)
	{
		debugger;
		var total = document.getElementById('salesordertotalLead').value;
		var inp=document.getElementsByName('countrycount');
		var per=document.getElementsByName('countryper');
		var sum=0;
		for(var i=0;i<inp.length;i++)
		{
			if(obj.name=='countryper')
			{
				if(per[i].value > 0)
				{				
					inp[i].value=eval(total)*per[i].value/100
					sum=eval(sum)+eval(inp[i].value);
				}
			}	
			else
			{
				if(inp[i].value > 0)
				{
					var decimal=(inp[i].value/total)*100;
					per[i].value=decimal.toFixed(2);
					sum=eval(sum)+eval(inp[i].value);
				}
			}
		}
		if(sum>total)
		{
			$("#regionMsg").addClass("alert-danger");
			$('#regionMsg').show().html('* The input number for this country is exceeding the total count. Kindly make sure that the sum of country numbers is less that total leads');
			setTimeout(function(){
				$('#regionMsg').hide();
			},2000); 
			obj.value=0;
			$(obj.parentElement.nextSibling.firstChild.firstChild).val(0);
		}
	}

	function calculateStatePercent(obj)
	{
		debugger;
		var id=obj.id;
		var stateCount=obj.value;
		var country=id.split("-")[0];
		var countrycount=$("#"+country+"-count").val();
		var statecounts=document.getElementsByName("statecount");
		var statepers=document.getElementsByName("stateper");
		var sum=0;
		for(var i=0;i<statecounts.length;i++)
		{
			var temp=statecounts[i];
			var per=statepers[i];
			if(temp.value > 0 && temp.id==obj.id)
			{
				sum=sum+eval(temp.value);
				var decimal=(temp.value/countrycount)*100;
				per.value=decimal;
			}
		}
		if(sum>(eval(countrycount)))
		{
			obj.value=0;
			$(obj.parentElement.nextSibling.firstChild.firstChild).val(0);
		}
	}

	function showCountry(obj)
	{
		debugger;
		var country=lookupData['Country'];
		var region="";
		if(obj != undefined){
			$('#specificCountries').prop("checked", false);
			$('#specificCountriesDiv').hide();
		}
		if(!obj)
		{
			region=$("input[name='region']:checked").val();
		}
		else
			region=obj.id;
		
		var volGeogJson;
		var volGeog;
		if(selectedRecordData != null && selectedRecordData != "" && selectedRecordData != undefined && selectedRecordData.workorder.delivery_volume != "")
		{
			volGeogJson=selectedRecordData.workorder.delivery_volume;
			volGeog=jQuery.parseJSON(volGeogJson);
		}
		
		//alert(volGeog);
		var countryHTML='';
		var inputid;
		var percentid;
		var statsTR;
		var conCount="";
		var conPer="";
		for(var i=0;i<country.length;i++)
		{
			var rec=country[i];	
			if(rec['parent']!=null && rec['parent']==region)
			{
				if(volGeog)
				{
					var countPer=checkCountryFields(rec['name'], volGeog.country, 0);
					if(countPer!="NA")
					{
						conCount=countPer.split("-")[0];
						conPer=countPer.split("-")[1];
					}
					else
					{
						conCount="";
						conPer="";
					}
				}
			
				inputid=rec['name']+'-count';
				percentid=rec['name']+'-per';
				statesTR=rec['name']+'-statesTR';
				countryHTML=countryHTML+ '<tr><td><a href="#" class="toggler" id="'+rec['name']+'" data-state-cat="1" onclick="showStates(this)"><span class="fa fa-plus" aria-hidden="true"></span></a> '+rec['value']+'</td><td><input type="hidden" name="country" value="'+rec['name']+'"><input type="number" class="form-control form-control-sm" id="'+inputid+'" name="countrycount" value="'+conCount+'" oninput="calculateCountryPercent(this)" onkeypress="return isNumberKey(event)"></td><td><div class="input-group input-group-sm"><input type="text" class="form-control form-control-sm" id="'+percentid+'" name="countryper" value="'+conPer+'" oninput="calculateCountryPercent(this)"><div class="input-group-append"><span class="input-group-text">%</span></div></div></td></tr><tr><td colspan="3"><div class="'+statesTR+'" style="display:none;"><table class="countTbl table table-sm table-bordered" id="'+statesTR+'"></table></div></td></tr>';
			}			
		}
		$("#countriesTR").html(countryHTML);
		if(role=='dain' || role=='dmin'){	
		$("#countriesTR").find('*').prop("disabled",true);
		}
		if(region != null && region != "" && region != "undefined") {
			$(".regBlk").show();
		}
	}


	var stateHTMLForCache='';
	var lastOpenedState;
	function showStates(obj)
	{	
		debugger;
		var volGeogJson;
		var volGeog;
		if(selectedRecordData != null && selectedRecordData != "" && selectedRecordData != undefined)
		{
			volGeogJson=selectedRecordData.volumeGeography;
			volGeog=jQuery.parseJSON(volGeogJson);
		}
		
		var innerhtml=obj.innerHTML;
		var country=obj.id;
		var statesTR=country+'-statesTR';
		var stateFromDB='';
		if(volGeogJson != null && volGeogJson != "" && volGeogJson != undefined) {
			stateFromDB=checkCountryFields(country, volGeog['country'], 1);
		}
		var loop=1;

		if(stateFromDB!='NA' && stateFromDB.length>1)
		{
			loop=stateFromDB.length;
		}
		// change image - to + and hide the opened states.
		if(innerhtml.indexOf("fa-minus")!=-1)
		{	
			$(obj).find("span").toggleClass("fa-plus fa-minus");
			$("."+statesTR+"").hide();
			return;
		}
		else if(lastOpenedState)
		{	// hiding the last opened state. and changing image from - to +
			var lastcountry=lastOpenedState.split("-")[0];
			$("#"+lastcountry).find("span").toggleClass("fa-plus fa-minus");
			$("."+lastOpenedState).hide();
		}
		lastOpenedState=statesTR;
		debugger;
		var state=lookupData['State'];
		var selectid=country+'-state';
		var inputid=country+'-statecount';
		var percentid=country+'-stateper';
		var toogleid=country+'-toogle';
		// creating one statehtml row for cache
			stateHTMLForCache='<tr><td width="34%"><div class="input-group"><div class="input-group-prepend"><button class="btn btn-outline-success btn-xs" type="button" id="'+toogleid+'" onclick="addNewState(this)" title="Add more states"><span class="fa fa-plus" aria-hidden="true"></span></button></div><select id="'+selectid+'" name="salesorderstate" class="form-control form-control-sm"> <option value="Select State">Select States</option>';
			var stateFound=false;
			for(var i=0;i<state.length;i++)
			{
				var rec=state[i];	
				if(rec['parent']!=null && rec['parent']==country)
				{				
					stateHTMLForCache=stateHTMLForCache+ '<option value="'+rec['name']+'">'+rec['name']+'</option>';
					stateFound=true;
				}
			}
			if(!stateFound)
			{
				return false;
			}
			stateHTMLForCache=stateHTMLForCache+ '</select></div></td><td width="33%"><input type="number" class="form-control form-control-sm" name="statecount" id="'+inputid+'" value="0" oninput="calculateStatePercent(this)" onkeypress="return isNumberKey(event)"></td><td width="33%"><div class="input-group input-group-sm"><input type="text" class="form-control form-control-sm" name="stateper" oninput="calculateStatePercent()" id="'+percentid+'" value="0"><div class="input-group-append"><span class="input-group-text">%</span></div></div></td></tr>';

		// cache state created.
		var stateHTML="";
		for(var j=0;j<loop;j++)
		{
			stateHTML=stateHTML+'<tr><td width="34%"><div class="input-group"><div class="input-group-prepend"><button class="btn btn-outline-success btn-xs" type="button" id="'+toogleid+'" onclick="addNewState(this)" title="Add more states"><span class="fa fa-plus" aria-hidden="true"></span></button></div><select id="'+selectid+'" name="salesorderstate" class="form-control form-control-sm"> <option value="Select State">Select States</option>';
			var stateFound=false;
			
			for(var i=0;i<state.length;i++)
			{
				var rec=state[i];	
				if(rec['parent']!=null && rec['parent']==country)
				{
					if(stateFromDB[j] != null && stateFromDB[j] != "" && rec['name']==(stateFromDB[j])['name'])
					{
						stateHTML=stateHTML+ '<option value="'+rec['name']+'" selected>'+rec['name']+'</option>';
					}
					else
						stateHTML=stateHTML+ '<option value="'+rec['name']+'">'+rec['name']+'</option>';
					stateFound=true;
				}
			}
			if(!stateFound)
			{
				return false;
			}
			
			var stateFromDBPercent = 0;
			var count=0;
			if(stateFromDB != 'NA' && stateFromDB[j] != null && stateFromDB[j] != "") {
				stateFromDBPercent = (stateFromDB[j])['percent'];
				count=(stateFromDB[j])['count'];
			}
			
			stateHTML=stateHTML+ '</select></div></td><td width="33%"><input type="number" class="form-control form-control-sm" name="statecount" id="'+inputid+'" value='+count+' oninput="calculateStatePercent(this)" onkeypress="return isNumberKey(event)"></td><td width="33%"><div class="input-group input-group-sm"><input type="text" class="form-control form-control-sm" name="stateper" oninput="calculateStatePercent()" id="'+percentid+'"  value='+stateFromDBPercent+'><div class="input-group-append"><span class="input-group-text">%</span></div></div></td></tr>';
		}
		var previousHTML=$("#"+statesTR).html();
		
		var finalhtml=previousHTML+stateHTML;
		if(previousHTML!=null && previousHTML.length>100)
		{
			$("."+statesTR).show();
			$(obj).find("span").toggleClass("fa-plus fa-minus");
			return;
		}
		else
		{
			finalhtml=stateHTML;
		}

		$("#"+statesTR).html(finalhtml);
		$(obj).find("span").toggleClass("fa-plus fa-minus");
		$("."+statesTR+"").show();
		
		if(role=='dain' || role=='dmin'){	
			$("#"+statesTR).find('*').prop("disabled",true);
			}
		
	}
	
	function showStatePercent() {}

		
	function addNewState(obj)
	{
		var innerSign=obj.innerHTML;
		var id=obj.id;
		var country=id.split("-")[0];
		if(innerSign.indexOf("fa-times")!=-1)
		{
			debugger;
			//var rowNode=(obj.parentNode).parentNode;
			var rowNode=$(obj).parents("tr").first();
			debugger;
			rowNode.remove();
			return false;
		}
		$(obj).toggleClass("btn-outline-success btn-outline-danger");
		$(obj).find("span").toggleClass("fa-plus fa-times");
		var currentHtml=$("#"+country+"-statesTR").html();
		debugger;
		$("#"+country+"-statesTR").append(stateHTMLForCache);
	}

	function createCountryStateData()
	{
		var countryNums=document.getElementsByName("countrycount");
		var countryPers=document.getElementsByName("countryper");
		var jsonData="";
		
		for(var i=0;i<countryNums.length;i++)
		{
			var inpf=countryNums[i];
			id=inpf.id;
			var country=id.split("-")[0].trim();
			var count=inpf.value;
			var inpPer=countryPers[i];
			if(count>0) {
				var countryCode = specificCountryObj[country];
				if(countryCode == undefined)
					countryCode = country;
				jsonData=jsonData+'{"name":"'+countryCode+'", "count":"'+count+'", "percent":"'+inpPer.value+'", "state":['+createStatePercent(country)+']},';
			}
			
		}
		jsonData=jsonData.substring(0, jsonData.length-1);
		jsonData='{"country":['+jsonData+']}';
		return jsonData;
	}
	
	function createStatePercent(country) {
		var states=document.getElementsByName("salesorderstate");
		var statecounts=document.getElementsByName("statecount");
		var statepers=document.getElementsByName("stateper");
		var stateJson="";
		if(states.length>0){
			for(var i=0;i<states.length;i++) {
					var statecountid=statecounts[i].id;
					var tempCountry=statecountid.split("-")[0];
					if(tempCountry==country && statecounts[i].value>0) {
							stateJson=stateJson+'{"name":"'+states[i].value+'","count":"'+statecounts[i].value+'","percent":"'+statepers[i].value+'"},';
					}
			}
			stateJson=createStateDataWithoutChange(country);
		}
		stateJson=stateJson.substring(0, stateJson.length-1);
		return stateJson;
}
	
	function createStateDataWithoutChange(country){
		var stateJson="";
		if(selectedRecordData != null && selectedRecordData != "" && selectedRecordData != undefined && selectedRecordData.volumeGeography != "")
		{
			var volGeogJson=selectedRecordData.volumeGeography;
			var volGeog=jQuery.parseJSON(volGeogJson);
			stateFromDB=checkCountryFields(country, volGeog['country'], 1);
			if(stateFromDB !='NA'){
				for(var i=0;i<stateFromDB.length;i++){
					stateJson=stateJson+'{"name":"'+stateFromDB[i].name+'","count":"'+stateFromDB[i].count+'","percent":"'+stateFromDB[i].percent+'"},';
				}
			}
		}
		return stateJson;
	}

	
	function checkCountryFields(country, volumeGeography, state)
	{
		var result="NA";
		if(volumeGeography.length>0)
		{
			for(var i=0; i<volumeGeography.length; i++)
			{
				var jsoncountry=volumeGeography[i];
				if(jsoncountry['name']==specificCountryObj[country.trim()] || jsoncountry['name']==country.trim() )
				{				
					if(state==1)
					{
						result=jsoncountry['state'];
					}
					else
						result=jsoncountry['count']+"-"+jsoncountry['percent'];
				}
			}
		}
		
		
		return result;
	}
	function isNumberKey(evt) {
	    var charCode = (evt.which) ? evt.which : event.keyCode;
	    if (charCode > 31 && (charCode < 48 || charCode > 57))
	        return false;

	    return true;
	}

	function isNumberKeyRevenue(evt) {
	    var charCode = (evt.which) ? evt.which : event.keyCode;
	    if (charCode != 46 && charCode != 45 && charCode > 31 && (charCode < 48 || charCode > 57))
	        return false;

	    return true;
	}

	function isValidateComma(evt) {
	    var charCode = (evt.which) ? evt.which : event.keyCode;
	    if (charCode == 44)
	        return false;

	    return true;
	}

	function isNumberAndDecimalKey(evt) {
	    var charCode = (evt.which) ? evt.which : event.keyCode;
	    if(charCode == 46) {
	    	return true;
	    }
	    else if (charCode > 31 && (charCode < 48 || charCode > 57)) {
	    	return false;
	    }
	    return true;
	}
	
	function selectedChange(obj)
	{
		$("select option:selected").each(function()
			{
				debugger;
				if($("#country").val()=="UK")
					{
						document.getElementById('statelabel').innerHTML="county";
					}
				else if($("#country").val()!="UK")
					{
						document.getElementById('statelabel').innerHTML="state";
					}
			});
	}

	/*
	function multiplySalesOrder()
	{
		var myBox1 = document.getElementById('salesordertotalLead').value;	
		var myBox2 = document.getElementById('salesorderrate').value;
		if( /\,/.test( $('#salesorderrate').val() ) ) {
			$("#salesorderrateMsg").html("Please enter rate without comma .").show();
			setTimeout(function(){$('#salesorderrateMsg').html("").hide();},3000);
			return ;
		}
		var result = document.getElementById('salesordertotalValue');
		var myResult = myBox1 * myBox2;
		result.value = myResult;
		result.value=document.getElementById("salesordercurrency").value+" "+result.value;
		calculateCountryPercent();
	}
	*/
	
	function multiplySalesOrder()
	{
			var myBox1 = document.getElementById('salesordertotalLead').value;	
			var myBox2 = document.getElementById('salesorderrate').value;
			if( /\,/.test( $('#salesordertotalLead').val() ) ) {
				$("#salesOrderNoOfLeadsMsg").html("Please enter Number of Leads without comma.").show();
				setTimeout(function(){$('#salesOrderNoOfLeadsMsg').html("").hide();},3000);
				//$('#unitNoOfLeads').val("");
				return ;
			}
			if( /\,/.test( $('#salesorderrate').val() ) ) {
				$("#salesorderrateMsg").html("Please enter Unit price without comma .").show();
				setTimeout(function(){$('#salesorderrateMsg').html("").hide();},3000);
				//$('#unitPrice').val("");
				return ;
			}
			var result = document.getElementById('salesordertotalValue');	
			var myResult = myBox1 * myBox2;
			var res= (myResult).toFixed(2);
			result.value = res;
			result.value=document.getElementById("salesordercurrency").value+" "+result.value;
	}
	
	
	function multiplySalesOrderAndLeadCommit()
	{
		/*if($('#salesorderleadcommit').val().indexOf('.') >=0 || /\,/.test( $('#unitNoOfLeads').val())) {
			$("#unitNoOfLeadsMsg").html("Please enter LeadCommit without decimal and comma.").show();
			setTimeout(function(){$('#unitNoOfLeadsMsg').html("").hide();},3000);
			//$('#unitNoOfLeads').val("");
			return ;
		}*/
		if($('#salesordertotalLead').val().indexOf('.') >=0 || /\,/.test( $('#salesordertotalLead').val())) {
			$("#salesOrderNoOfLeadsMsg").html("Please enter Number Of leads without decimal and comma.").show();
			setTimeout(function(){$('#salesOrderNoOfLeadsMsg').html("").hide();},3000);
			//$('#unitNoOfLeads').val("");
			return ;
		}
		var myBox1 = document.getElementById('salesordertotalLead').value;	
		var myBox2 = document.getElementById('salesorderrate').value;
		var result = document.getElementById('salesordertotalValue');	
		var myResult = myBox1 * myBox2;
		result.value = parseFloat(myResult).toFixed(2);
		//result.value = myResult;
		result.value=document.getElementById("salesordercurrency").value+" "+result.value;
		/*var num1 = Math.round(myBox1);
		$("#salesorderleadcommit").val(num1*3);*/
	}
	
	function prefilOrderForm(data)
	{
		debugger;
		
		console.log(data);
		assetFileCount = 0;
		prevAssetCount = 0;
		$("#cloneButton").removeAttr('disabled');
		$("#createButton").text('Update Sales Order');
		var workorder = JSON.parse(data.workorder);
		//var dcAttachment = JSON.parse(data.dcAttachment);
		selectedOrderData = data;
		var serviceTypeVal = workorder.product_type;
		serviceTypeVal= serviceTypeVal.trim();
		serviceTypeVal = serviceTypeVal.replace(/\//g, "/");
		if(serviceTypeVal!= null && serviceTypeVal != "" && serviceTypeVal != "undefined") {
			$("#fixProductType").hide();
			$("#listProductType").show();
		}
		if(serviceTypeVal == 'CPL' || serviceTypeVal == 'CQL'){
			$('input:radio[value=CQL]').prop('checked',true);
		}else{
			$('input:radio[value="'+serviceTypeVal+'"]').prop('checked',true);
		}
		oldProductType = serviceTypeVal;
		var excludeDNCFlag=workorder.excludedncflag;
		excludeDNCFlag=="Y"?$("input:checkbox[value='excludeDNCFlag']").prop('checked', true):$("input:checkbox[value='excludeDNCFlag']").prop('checked', false);
		
		var yesOpportunity=workorder.suppression_opportunity;
		yesOpportunity=="Y"?$("input:checkbox[value='yesOpportunityFlag']").prop('checked', true):$("input:checkbox[value='yesOpportunityFlag']").prop('checked', false);
		
		if(yesOpportunity=="Y")
		{
			$('#salesOrderYesFromOpprFunctionDiv').show();
		}
		else
		{
			$('#salesOrderYesFromOpprFunctionDiv').hide();
		}

		
		var updateButtonMsg = "Update "+$("input[name='serviceType']:checked").val()+" Job";
		$("#marketLeadersActivityNumber").val(workorder.marketleaders_activity_number);
		
		$("#salesordertotalLead").val(workorder.number_of_leads);
		$("#salesorderrate").val(workorder.rate);	
		$("#salesorderaccountName").val(workorder.companyname);	
		$("#salesorderaccountName").prop('disabled', true);
		$("#salesordersfaccountID").val(workorder.account_id);
		$("#salesordertotalValue").val(workorder.campaign_value);
		$("#salesorderbonus_leads").val(workorder.bonus_leads);
		//$("#salesorderleadcommit").val(workorder.lead_commit);
		$("#targetGeo").val(workorder.targetgeo);
		$("#audienceType").val(workorder.audiencetype);
		
		if($("#salesordertotalValue").val() != null && $("#salesordertotalValue").val() != "" && $("#salesordertotalValue").val() != "undefined") {
			var selectedCurrency = $("#salesordertotalValue").val().charAt(0);
			
			if(selectedCurrency.indexOf("$") != -1 || selectedCurrency.indexOf("Â£") != -1 || selectedCurrency.indexOf("â‚¬") != -1) {
				$("#salesordercurrency").val(selectedCurrency);
			} 
		}
		
		$("#salesordercurrency").val(workorder.currency);
		$("#salesordercampaignName").val(workorder.campaign_name);
	/*	
		if(data.workorder.input_type == 'CPL' || data.workorder.input_type == 'CQL'){
			$('input:radio[value=CQL]').prop('checked',true);
		}else{
			$('input:radio[value='+data.workorder.input_type+']').prop('checked',true);
		}*/
		$("#targetTitle").val(workorder.target_titles);
		
		if(workorder.employee_size_min!=null && (workorder.employee_size_max==undefined || workorder.employee_size_max==0)){
			var empsize = workorder.employee_size_min+"+";
		}else{
			var empsize = workorder.employee_size_min;
		}
		
		if(workorder.revenue_min!=null && (workorder.revenue_max==undefined ||workorder.revenue_max==0)){
			var revenue_min = workorder.revenue_min.toFixed();
			var revenue = "$"+revenue_min+"+";
		}else {
			if(workorder.revenue_min!=null && (workorder.revenue_min!=undefined || workorder.revenue_min!=0)){
				var revenue_min = workorder.revenue_min.toFixed();
				var revenue = "$"+revenue_min;
			} 
			if(workorder.revenue_max!=null && (workorder.revenue_max!=undefined || workorder.revenue_max!=0)){
				var revenue_max = workorder.revenue_max.toFixed();
				var revenueMax = "$"+revenue_max;
			}
		}
		
		$("#salesorderempSize").val(empsize);
		$("#salesorderempSizeMax").val(workorder.employee_size_max);
		$("#salesorderrevenue").val(revenue);
		$("#salesorderrevenueMax").val(revenueMax);
		$("#salesorderindustry").val(workorder.industry);
		
		if(workorder.completiondate != null && workorder.completiondate != "" && workorder.completiondate != undefined) {
			$("#salesordercompletionDate").val(data.completiondate);
		}
		
		
		$("#salesorderduration").val(workorder.duration);
		$('input:radio[value='+workorder.frequency+']').attr('checked',true);
		
		$("#pcsuppressionfile_name").html("SuppressionFileList");
		$("#suppressionList_name").html("NamedAccountListFile");
		if(data.uploaded_asset_filename != null && data.uploaded_asset_filename != "" && data.uploaded_asset_filename != "undefined") {
				var uploadedAssetArray=data.uploaded_asset_filename.split(",");
				var uploadedAsseet ="";
				assetFileCount = uploadedAssetArray.length;
				prevAssetCount = assetFileCount;
			}
			
		$("#salesorderdeliveryDay").val(workorder.delivery_day);
		$("#salesorderdeliveryTime").val(workorder.delivery_time);
		$("#salesorderdeliveryNumber").val(workorder.delivery_number);
		$("#deliveryMethod").val(workorder.delivery_method);
		if(workorder.delivery_method !=""){
		$('input:radio[value='+workorder.delivery_method+']').attr('checked',true);
		}
		
		if(workorder.frequency=="weekly" || workorder.frequency=="semi-monthly" ||workorder.frequency=="monthly")
		{
			$(".weekDiv").show();
			$(".timeDiv").show();
			$(".leadsDiv").show();
		}else{
			$(".weekDiv").hide();
			$(".timeDiv").hide();
			$(".leadsDiv").hide();
		}
		if(workorder.delivery_method=="Hybrid" || workorder.delivery_method=="hybrid")
		{
			$(".delMth").show();
			$("#salesorderidcAllocation").val(workorder.idcAllocation);
		}
		$("#salesordercategory").val(workorder.category_type);
		$("#categoryName").val(workorder.category_name);
		$('input:radio[value='+workorder.suppression_opportunity+']').attr('checked',true); 
		
		var regionValue = workorder.delivery_region;
		
		if(regionValue =='specificCountries'){
			$("input:radio[name='specificCountries']").prop('checked',true);
			$(".divBox").hide();
			$('#specificCountriesDiv').show();
			
			var volGeogJson=JSON.parse(workorder.delivery_volume);
			if(volGeogJson!=null && volGeogJson!='' && volGeogJson.country.length>0){
			//var	volGeog=jQuery.parseJSON(volGeogJson);
			
			var volumeGeographyList='';
				//if(volGeog.country.length>0) {
					
				for(var i= 0;i<volGeogJson.country.length;i++){
					volumeGeographyList =volumeGeographyList+ volGeogJson.country[i].name+",";
				}	
				if(volumeGeographyList != '') {
					volumeGeographyList = volumeGeographyList.substring(0,volumeGeographyList.lastIndexOf(","));
					$("#salesOrdercountry").val(volumeGeographyList);
					$("#salesOrdercountry").prop("title",volumeGeographyList);
				}
			//}
		}else{
			$("input:radio[value='"+regionValue+"']").attr('checked', true);
			$('#specificCountriesDiv').hide();
		}
		}else{
			$('#specificCountriesDiv').hide();
		}
		
		$('input:radio[value='+workorder.customer_type+']').prop('checked',true);
		
		
		if(workorder.customer_type == 'partner') {
			$(".partner, .divBox").show();	
		}
		if(workorder.customer_type == 'Direct') {
			$(".partner, .divBox").hide();	
		}
		/*else {
			$(".partner, .divBox").hide();
		}*/
		
		$("#salesorderendCustomerName").val(workorder.end_customer_name);
		$("#additionalCriteria").val(workorder.additional_criteria);
		
		var customQuestion=workorder.custom_question;
		var index=1;
		$("#custom_question").val('');
		if(customQuestion != null && customQuestion!='' && customQuestion!='undefined') {
			var customQuestionArray=customQuestion.split("||");
			$.each(customQuestionArray,function(i){
				var $addFile = $('<p id="q_'+index+'" class="mb-2" ondblclick="editCustomQuestion('+index+')"> </p>');
				$("#customQuestions").show();
				$("#customQuestions .card-body").append($addFile);
				$("#q_"+index).html(index+". " + customQuestionArray[i] +"\n");
				index++;
				
			});
			questionIndex=index;
			$("#questions").val(customQuestion);
		}
		
		$("#numberOfRecords").val(recordPerDomain);
		
		var csfLookupType="<option value=''>Please Select</option>";
		var csfLookupColumn = lookUpFields;
		if(csfLookupColumn != null && csfLookupColumn != "") {
			csfLookupSelectList = csfLookupColumn;
			var csfLookupColumnDataArray = csfLookupColumn.split(",");
			$.each(csfLookupColumnDataArray, function(i) {
				csfLookupType = csfLookupType+"<option value='"+csfLookupColumnDataArray[i]+"'>"+csfLookupColumnDataArray[i]+"</option>";
				$("#lookUpSelect").html(csfLookupType);
			});
		}
		else{
			$("#lookUpSelect").html(csfLookupType);
		}
		
		var includeOrderFormatting=workorder.includeorderformatting;
		includeOrderFormatting=="Y"?$("input:checkbox[name='includeOrderFormatting']").prop('checked', true):$("input:checkbox[name='includeOrderFormatting']").prop('checked', false);
		if(includeOrderFormatting=="Y")
		{
			$('#includeOrderFormattingDiv').show();
			$('#delTimeCheck').show();
			
		}
		else
		{
			$('#includeOrderFormattingDiv').hide();
			$('#delTimeCheck').hide();
		}
		
		var formattingOrderId=workorder.formattingorderid;
		var formattingOrderIdList='';
		var pvrDlvryDuration ='';
		if(formattingOrderId != null && formattingOrderId != "") {
			debugger;
			$("#formattingOrderIdCampaignName").val(JSON.stringify(formattingOrderId));
			prefillFormattingOrderId = true;
			
			$.each(formattingOrderId, function(key, value){
				for(name in value) {
					if(name!="pvrDlvryDuration"){
					formattingOrderIdList = formattingOrderIdList + value[name]+",";
					}else{
						pvrDlvryDuration = value[name];
					}
				}
			});
			if(formattingOrderIdList != '') {
				formattingOrderIdList = formattingOrderIdList.substring(0,formattingOrderIdList.lastIndexOf(","));
				$("#order").val(formattingOrderIdList);
				$("#order").prop("title",formattingOrderIdList);
			}
			$('input:radio[value='+pvrDlvryDuration+']').prop('checked',true);
		}
	
		$("#salesOrderJobFunction").val(workorder.jobfunction);
		$("#salesOrderSeniorityLevel").val(workorder.seniority_level);
		
		if(workorder.campaign_manager != "null"){
			if(workorder.campaign_manager != null && workorder.campaign_manager != "" && workorder.campaign_manager != "undefined") {
				$("#campaignManager").val(workorder.campaign_manager);
			}else{
				$("#campaignManager").val(userName);
			}
		}
		
		var formattingYesFromOppr = workorder.yesFromOppr;
		var formattingYesFromOpprList='';
		if(formattingYesFromOppr != null && formattingYesFromOppr != ""){
			$("#salesOrderYesFromOpportunityName").val(JSON.stringify(formattingYesFromOppr));
			prefillYesFromOpprId = true;
			
			//opprIdOpprNameJsonArray.push(formattingYesFromOppr);
			$.each(formattingYesFromOppr, function(key, value){
				for(name in value) {
					formattingYesFromOpprList = formattingYesFromOpprList + value[name]+"||";
				}
			});
			
			if(formattingYesFromOpprList != '') {
				formattingYesFromOpprList = formattingYesFromOpprList.substring(0,formattingYesFromOpprList.lastIndexOf("||"));
				$("#salesOrderYesFromOppr").val(formattingYesFromOpprList);
				$("#salesOrderYesFromOppr").prop("title",formattingYesFromOpprList);
			}
			
		}
		
		$('input:radio[value='+workorder.mobile_mandatory+']').prop('checked',true);
		
	}
	

	
	
	function loadProgramOrderData(orderId) {
		programNameList =[];
		progCount= 0;
		$("#fetchEmailTemplateDataLoader").show();
		$.ajax({
			url:'amus.loadProgramOrderData?orderId='+orderId, 
			type:"POST",
			success: function(data, textStatus, xhr)
			{
				$("#fetchEmailTemplateDataLoader").hide();
				$('#programTbl').dataTable().fnClearTable();
			
				if(data != null && data.length > 0) {
					index=1;
					for(i=0; i<data.length; i++) {
						recProgramOrderArr=data;
						
						var programName = '';

						if(data[i].program_name != null && data[i].program_name != "") {
							programName = data[i].program_name;
							programNameList.push(programName)
						}
						$('#programTbl').dataTable().fnAddData(["<tr><td>"+index+".</td>","<td>"+programName+"</td>","<td><button type='button' id='modifyProgram' class='btn btn-warning btn-xs margR10' onClick='modifyProgram("+i+")'><span class='fa fa-pencil-square-o' aria-hidden='true'></span> Modify</button><button type='button' id='deleteProgram' class='btn btn-danger btn-xs' onClick='deleteProgram("+i+")'><span class='fa fa-times' aria-hidden='true'></span>Delete</button></td></tr>"]);
						
						index++;
					}
				}
				else {
					$("#fetchEmailTemplateDataLoader").hide();
				}
			},
			error: function(xhr, textStatus, errorThrow)
			{
				var row = $(this).closest('tr');
				var nRow = row[0];
				$('#programTbl').dataTable().fnDeleteRow(nRow);
				
				$("#fetchEmailTemplateDataLoader").hide();
				$("#emailTemplateRecordsMsg").addClass("alert-danger");
				$("#emailTemplateRecordsMsg").show().html('* error occurred while fetching program names, kindly check with development team.');
				setTimeout(function(){
					$('#emailTemplateRecordsMsg').hide();
	    		},2000); 
			}
		}) 
	}

	$("#closeProgramModal").click(function() {
		$("#viewAssignedProgModal").modal("hide");
		$("#addProgramRow").slideUp('fast');
		$("#addNewProgramBtn").show();
	});
	
	
	function formatpageOnLoad()
	{
		
		debugger;
		if(document.order.serviceType.value=="CPL"){
	        $(".cplBlk").show();
	        $("#servicetitle").html("Account Information");
	        $("#completiondate").hide();
	        $("#schedule").show();
	        $("#salesordercustomqlabel").html("Custom Question<span class='reqMark'>*</span>");
	        $("#customqtr").show();
	        $("#salesordersuppressionprevious,#deliverymethod").show();
			//$(".apsBlk,.prfBlk,.dataBlk").hide();
		}
		if(document.order.serviceType.value=="appSetting"){
	        $(".cplBlk").show();
	        $("#servicetitle").html("Appointment Setting");
	        $("#completiondate").hide();
	        $("#schedule").hide();
	        $("#salesordercustomqlabel").html("Qualifying Question");
	        $("#customqtr").show();
	        $("#salesordersuppressionprevious,#deliverymethod").show();
		//	$(".cplBlk,.prfBlk,.dataBlk").hide();	
		}
		if(document.order.serviceType.value=="profiling"){
	        $(".cplBlk").show();
	        $("#servicetitle").html("Profiling");
	        $("#completiondate").hide();
	        $("#schedule").show();
	        $("#salesordercustomqlabel").html("Custom Question");
	        $("#customqtr").show();
	        $("#salesordersuppressionprevious,#deliverymethod").show();
		//	$(".apsBlk,.dataBlk,.cplBlk").hide();
		}
		if(document.order.serviceType.value=="data"){
	        $(".cplBlk").show();
	        $("#servicetitle").html("Data");
	        $("#schedule,#deliverymethod").hide();
	        $("#completiondate").show();
	        $("#customqtr").hide();
	        $("#salesordersuppressionprevious").hide();
		//	$(".prfBlk,.apsBlk,.cplBlk").hide();
		}
	}		 	

	//Used to disable editing in form based on role

	function disableFields()
	{
		if(role=='dmin'){
			$("#salesorderdirect").prop('disabled', true);
			$("#salesorderpartner").prop('disabled', true);
			//$("#clientBase").prop('disabled', true);
			$("#salesordertotalLead").prop('disabled', true);
			$("#salesordercurrency").prop('disabled', true);
			$("#salesorderrate").prop('disabled', true);
			$("#salesordertotalValue").prop('disabled', true);
			$("#targetTitle").prop('disabled', true);
			$("#salesorderempSize").prop('disabled', true);
			$("#salesorderempSizeMax").prop('disabled', true);
			$("#salesorderevenueMax").prop('disabled', true);
			$("#salesorderrevenue").prop('disabled', true);
			$("#salesorderindustry").prop('disabled', true);
			$("#salesorderyesClient").prop('disabled', true);
			$("#salesorderyesPd").prop('disabled', true);
			$("#salesorderslNo").prop('disabled', true);
			$("#salesorderduration").prop('disabled', true);
			$("#salesorderweekly").prop('disabled', true);
			$("#salesordersemi-monthly").prop('disabled', true);
			$("#salesordermonthly").prop('disabled', true);
			$("#salesorderIDC").prop('disabled', true);
			$("#salesorderEM").prop('disabled', true);
			$("#salesorderTPBenza").prop('disabled', true);
			$("#salesorderTPSalisfy").prop('disabled', true);
			$("#salesorderidcAllocation").prop('disabled', true);
			$("#salesordersow").prop('disabled', true);
			$("#salesordersuppressionList").prop('disabled', true);
			$("#salesorderasset").prop('disabled', true);
			$("#questions").prop('disabled', true);
			$("#NA").prop('disabled', true);
			$("#salesorderprevList").prop('disabled', true);
			//$("#salesorderleadcommit").prop('disabled', true);
			
		}else if(role=='dain'){		
			$("#salesorderdirect").prop('disabled', true);
			$("#salesorderpartner").prop('disabled', true);
			//$("#clientBase").prop('disabled', true);
			$("#salesordertotalLead").prop('disabled', true);
			$("#salesordercurrency").prop('disabled', true);
			$("#salesorderrate").prop('disabled', true);
			$("#salesordertotalValue").prop('disabled', true);
			$("#targetTitle").prop('disabled', true);
			$("#salesorderempSize").prop('disabled', true);
			$("#salesorderempSizeMax").prop('disabled', true);
			$("#salesorderrevenue").prop('disabled', true);
			$("#salesorderrevenueMax").prop('disabled', true);
			$("#salesorderindustry").prop('disabled', true);
			$("#note").prop('disabled', true);
			$("#salesorderyesClient").prop('disabled', true);
			$("#salesorderyesPd").prop('disabled', true);
			$("#salesorderslNo").prop('disabled', true);
			$("#salesorderduration").prop('disabled', true);
			$("#salesorderweekly").prop('disabled', true);
			$("#salesordersemi-monthly").prop('disabled', true);
			$("#salesordermonthly").prop('disabled', true);
			$("#salesorderIDC").prop('disabled', true);
			$("#salesorderEM").prop('disabled', true);
			$("#salesorderTPBenza").prop('disabled', true);
			$("#salesorderTPSalisfy").prop('disabled', true);
			$("#salesorderidcAllocation").prop('disabled', true);
			$("#salesordersow").prop('disabled', true);
			$("#salesordersuppressionList").prop('disabled', true);
			$("#salesorderasset").prop('disabled', true);
			$("#questions").prop('disabled', true);
			$("#NA").prop('disabled', true);
			$("#salesorderprevList").prop('disabled', true);
			$("#countryDiv input").prop('disabled', true);
			//$("#salesorderleadcommit").prop('disabled', true);
		}else{
			$("#salesordercurrency").prop('disabled', true);
			$("#salesordertotalValue").prop('disabled', true);
		
		}	
	}
	
	
	var i=1;
	var editIndex='';

	$(document).ready(function(){
		$("#addCustomQuestion").click(function() {
			if(questionIndex!='') {
				i=questionIndex;
				questionIndex='';
			}
			if($("#custom_question").val() != null && $("#custom_question").val() != "") {
				if(editIndex != '') {
					if ($("#decisionCustomQuestion").is(":checked")==true) {
						i=1;
						var hiddenCustomQuestion = $("#customQuestions .card-body").find('p').text();
						var duplicateQuestion = checkCustomQuestionAlreadyExists();
						
						if(duplicateQuestion > 0) {
							showDuplicateQuestionMsg('');
						}
						else {
							$("#q_"+i).text('');
							$("#q_"+i).text(i+". " + $("#custom_question").val() + "\n");
							$("#custom_question").val('');
							$('#decisionCustomQuestion').prop('checked', false);
							i++;
							
							if(hiddenCustomQuestion != null && hiddenCustomQuestion != "") {
								var hiddenCustomQuestionArray = [];
								hiddenCustomQuestionArray = hiddenCustomQuestion.split("\n");
								$(hiddenCustomQuestionArray).each(function(iIndex, sElement) {
									if(sElement != null && sElement != "") {
										$("#q_"+i).text(i+"." + sElement.substring(sElement.indexOf(".")+1, sElement.length) + "\n");
										$("#custom_question").val('');
										i++;	
									}
								});
							} 
						}
					}
					else {
						var duplicateQuestion = checkCustomQuestionAlreadyExists();
						if(duplicateQuestion > 0) {
							showDuplicateQuestionMsg(editIndex);
						}	
						else {
							$("#q_"+editIndex).text(editIndex+". " + $("#custom_question").val() + "\n");
							$("#custom_question").val('');
							editIndex='';
						}
					}
				}
				else {
					if(i<=20) {
						var $addFile = $("<p id='q_"+i+"' class='mb-2' ondblclick='editCustomQuestion("+i+")'></p>");
						$("#customQuestions").show();
						$("#customQuestions .card-body").append($addFile);
						if ($("#decisionCustomQuestion").is(":checked")==true) {
							i=1;
							var hiddenCustomQuestion = $("#customQuestions").find('p').text();
							var duplicateQuestion = checkCustomQuestionAlreadyExists();
							
							if(duplicateQuestion > 0) {
								showDuplicateQuestionMsg('');
							}
							else {
								$("#q_"+i).text('');
								$("#q_"+i).text(i+". " + $("#custom_question .card-body").val() + "\n");
								$("#custom_question .card-body").val('');
								$('#decisionCustomQuestion').prop('checked', false);
								i++;
								
								if(hiddenCustomQuestion != null && hiddenCustomQuestion != "") {
									var hiddenCustomQuestionArray = [];
									hiddenCustomQuestionArray = hiddenCustomQuestion.split("\n");
									$(hiddenCustomQuestionArray).each(function(iIndex, sElement) {
										if(sElement != null && sElement != "") {
											$("#q_"+i).text(i+"." + sElement.substring(sElement.indexOf(".")+1, sElement.length) + "\n");
											$("#custom_question").val('');
											i++;	
										}
									});
								} 
							}
						}
						else {
							var duplicateQuestion = checkCustomQuestionAlreadyExists();
							
							if(duplicateQuestion > 0) {
								showDuplicateQuestionMsg('');
							}
							else {
								$("#q_"+i).text(i+". " + $("#custom_question").val() + "\n");
								$("#custom_question").val('');
								i++;
							}
						} 
					}
					else {
						$("#successReasonDetailMsg").html("Maximum 20 custom questions are allowed.").show();
						setTimeout(function(){$('#successReasonDetailMsg').html("");},4000);
						return false;
						$("#custom_question").val('');
					}
				}
			}
			else {
				$("#successReasonDetailMsg").html("Kindly enter the custom question.").show();
				setTimeout(function(){$('#successReasonDetailMsg').html("");},4000);
				return false;
			}
		})
		
		$("#yesSuppression").click(function() {
				$.confirm({
					'message'	: 'Do you want to delete suppression list for this opportunity?',
					'buttons'	: {
						'<span class="fa fa-check fa-2x" aria-hidden="true"></span> Yes'	: {
							'class'	: 'yes',
							'action': function(){
								$("#deleteErrorMsgForSuppression").show();
								$.ajax({
									url : "deleteSuppressionForOpportunity.do?orderId="+selectedOrderData.workorder.workorder_id_text,
									type: "POST",
									success: function(data)
									{
										$("#deleteErrorMsgForSuppression").hide();
										if(data == "success"){
											fileCount = 0 ;
											loadPopup();
											$("#successMsg").html("* Record deleted successfully.").show();
											setTimeout(function(){$('#successMsg').html("");},3000);
										}
										else {
											$("#errorMsg").html("* exception occurred while deleting record in db, kindly check with development team.").show();
											setTimeout(function(){$('#errorMsg').html("");},3000);
										} 
									},
									error: function(xhr, textStatus, errorThrow)
									{
										$("#deleteErrorMsgForSuppression").hide();
										$("#errorMsg").html("* error occurred while deleting record in db, kindly check with development team.").show();
										setTimeout(function(){$('#errorMsg').html("");},3000);
									}		
								});
								
							}
						},
						'<span class="fa fa-times fa-2x" aria-hidden="true"></span>  No'	: {
							'class'	: 'no',
							'action': function(){
								$("#deleteErrorMsgForSuppression").show();
								$.ajax({
									url : "deleteSuppression.do?orderId="+selectedOrderData.workorder.workorder_id_text,
									type: "POST",
									success: function(data)
									{
										$("#deleteErrorMsgForSuppression").hide();
										if(data == "success"){
											fileCount=0;
											loadPopup();
											$("#successMsg").html("* Record deleted successfully.").show();
											setTimeout(function(){$('#successMsg').html("");},3000);
										}
										else {
											$("#errorMsg").html("* exception occurred while deleting record in db, kindly check with development team.").show();
											setTimeout(function(){$('#errorMsg').html("");},3000);
										} 
									},
									error: function(xhr, textStatus, errorThrow)
									{
										$("#deleteErrorMsgForSuppression").hide();
										$("#errorMsg").html("* error occurred while deleting record in db, kindly check with development team.").show();
										setTimeout(function(){$('#errorMsg').html("");},3000);
									}		
								});
								
							}
						}
					}
				});
		})
		
		$("#yesNAL").click(function(){
			$.confirm({
				'message'	: 'Are you sure you want to delete NAL list for this opportunity?',
				'buttons'	: {
					'<span class="fa fa-check fa-2x" aria-hidden="true"></span> Yes'	: {
						'class'	: 'yes',
						'action': function(){
							$("#deleteErrorMsgForSuppression").show();
							$.ajax({
								url : "deleteNALForOpportunity.do?orderId="+selectedOrderData.workorder.workorder_id_text,
								type: "POST",
								success: function(data)
								{
									$("#deleteErrorMsgForSuppression").hide();
									if(data == "success"){
										nalFileCount= 0;
										loadPopup();
										$("#successMsg").html("* Record deleted successfully.").show();
										setTimeout(function(){$('#successMsg').html("");},3000);
									}
									else {
										$("#errorMsg").html("* exception occurred while deleting record in db, kindly check with development team.").show();
										setTimeout(function(){$('#errorMsg').html("");},3000);
									} 
								},
								error: function(xhr, textStatus, errorThrow)
								{
									$("#deleteErrorMsgForSuppression").hide();
									$("#errorMsg").html("* error occurred while deleting record in db, kindly check with development team.").show();
									setTimeout(function(){$('#errorMsg').html("");},3000);
								}		
							});
							
						}
					},
					'<span class="fa fa-times fa-2x" aria-hidden="true"></span>  No'	: {
						'class'	: 'no',
						'action': function(){
							$("#deleteErrorMsgForSuppression").show();
							$.ajax({
								url : "deleteNAL.do?orderId="+selectedOrderData.workorder.workorder_id_text,
								type: "POST",
								success: function(data)
								{
									$("#deleteErrorMsgForSuppression").hide();
									if(data == "success"){
										nalFileCount=0;
										loadPopup();
										$("#successMsg").html("* Record deleted successfully.").show();
										setTimeout(function(){$('#successMsg').html("");},3000);
									}
									else {
										$("#errorMsg").html("* exception occurred while deleting record in db, kindly check with development team.").show();
										setTimeout(function(){$('#errorMsg').html("");},3000);
									} 
								},
								error: function(xhr, textStatus, errorThrow)
								{
									$("#deleteErrorMsgForSuppression").hide();
									$("#errorMsg").html("* error occurred while deleting record in db, kindly check with development team.").show();
									setTimeout(function(){$('#errorMsg').html("");},3000);
								}		
							});
							
						}
					}
				}
			});
			
		});
		
		
		
		$('#addSuppressionFiles').click(function(){
				/*rowIdFile = [];
				fileCount = 1;*/
				$('#suppressionFileUploadModal').show();
				$("#addSuppressionFileTable").find('tbody').empty();
				$("#addSuppressionFileTable").find('tbody').append("<tr><td><input type='file' class='form-control form-control-sm'"+
						"id='salesorderpcsuppressionfile_0' name='salesorderpcsuppressionfile'></td>" +
					    "<td><button id='addFile' type='button' class='btn btn-success btn-xs' onClick='addMoreFiles()'><i class='fa fa-plus fa-lg' "+
						"aria-hidden='true'></i> Add More</button></td></tr>");
				
		});
		
		$(document.body).delegate(".delFileField", "click", function(){
			rowIdFile.push($(this).closest("tr").attr('id').split("_")[1]);
			$(this).closest("tr").remove();
			fileCount--;
		});
		
		
		$("#submitSuppressionFiles").click(function() {
			for(var i=0; i<fileCount; i++) {
				var temp = "salesorderpcsuppressionfile_"+i;
				 var suppressionFile=$("#salesorderpcsuppressionfile_"+i)[0].files[0];
					if(suppressionFile){
						 var nalFileName=$("#salesorderpcsuppressionfile_"+i)[0].files[0]['name'];
						 if(nalFileName.lastIndexOf(".csv") == -1 && nalFileName.lastIndexOf(".xls") == -1 && nalFileName.lastIndexOf(".xlsx") == -1) {
							 $("#alertMsgFile").removeClass("text-success").addClass("text-danger").html("* Only .csv, .xls, .xlsx files are allowed.").show();
								setTimeout(function(){$("#alertMsgFile").html("");},4000);
								return false;
						 }
					}
			}
			
			fileHeaderValidateSuppression();
			
			
		});
		
		$('#addNALFiles').click(function(){
				/*rowIdNALFile = [];
				nalFileCount = 1;*/
				$('#nalFileUploadModal').show();
				$("#addNALFileTable").find('tbody').empty();
				$("#addNALFileTable").find('tbody').append("<tr><td><input type='file' class='form-control form-control-sm'"+
						"id='salesordersuppressionList_0' name='suppressionList'></td>" +
					    "<td><button id='addNALFile' type='button' class='btn btn-success btn-xs' onClick='addMoreNALFiles()'><i class='fa fa-plus fa-lg' "+
						"aria-hidden='true'></i> Add More</button></td></tr>");
				
		});
		
		$(document.body).delegate(".delFileField", "click", function(){
			rowIdNALFile.push($(this).closest("tr").attr('id').split("_")[1]);
			$(this).closest("tr").remove();
			nalFileCount--;
		});
		
		$('#addAssetFiles').click(function(){
			$('#assetFileUploadModal').show();
			$("#addAssetFileTable").find('tbody').empty();
			$("#addAssetFileTable").find('tbody').append("<tr><td><input type='file' class='form-control form-control-sm'"+
					"id='assetFiles_"+prevAssetCount+"' name='assetFiles'></td>" +
				    "<td><button id='addAssetFiles' type='button' class='btn btn-success btn-xs' onClick='addMoreAssetFiles()'><i class='fa fa-plus fa-lg' "+
					"aria-hidden='true'></i> Add More</button></td></tr>");
			assetFileCount= assetFileCount+1;
		});
		
		$("#closeAssetFiles").click(function() {
			assetFileCount = prevAssetCount;
			
		});
	
	$(document.body).delegate(".delFileField", "click", function(){
		rowIdNALFile.push($(this).closest("tr").attr('id').split("_")[1]);
		$(this).closest("tr").remove();
		nalFileCount--;
	});
		
		
		$("#submitNALFiles").click(function() {
			for(var i=0; i<nalFileCount; i++) {
				var temp = "salesordersuppressionList_"+i;
				 var suppressionFile=$("#salesordersuppressionList_"+i)[0].files[0];
					if(suppressionFile){
						 var nalFileName=$("#salesordersuppressionList_"+i)[0].files[0]['name'];
						 if(nalFileName.lastIndexOf(".csv") == -1 && nalFileName.lastIndexOf(".xls") == -1 && nalFileName.lastIndexOf(".xlsx") == -1 &&
								 nalFileName.lastIndexOf(".csv") == -1 && nalFileName.lastIndexOf(".xls") == -1 && nalFileName.lastIndexOf(".xlsx") == -1) {
							 $("#nalAlertMsg").removeClass("text-success").addClass("text-danger").html("* Only .csv, .xls, .xlsx files are allowed.").show();
								setTimeout(function(){$("#nalAlertMsg").html("");},4000);
								return false;
						 }
					}
			}
			
			fileHeaderValidateNAL();
			
			
		});
		
		$("#submitAssetFiles").click(function() {
			if(assetFileCount<=10){
			for(var i=prevAssetCount; i<assetFileCount; i++) {
				var temp = "assetFiles_"+i;
				 var assetFile=$("#assetFiles_"+i)[0].files[0];
					if(assetFile){
						 var assetName=$("#assetFiles_"+i)[0].files[0]['name'].toLowerCase();
						 if(assetName.lastIndexOf(".pdf") == -1 && assetName.lastIndexOf(".html") == -1 && assetName.lastIndexOf(".png") == -1 && assetName.lastIndexOf(".gif") == -1
								 && assetName.lastIndexOf(".jpeg") == -1 && assetName.lastIndexOf(".jpg") == -1 && assetName.lastIndexOf(".bmp") == -1) {
							 $("#assetAlertMsg").removeClass("text-success").addClass("text-danger").html("* Only .jpg, .jpeg, .png, .bmp, .gif ,html and pdf allowed.").show();
								setTimeout(function(){$("#assetAlertMsg").html("");},4000);
								return false;
						 }
					}
			}
			setTimeout(function(){
				$("#assetFileUploadModal").modal('hide');
			},1000);
			}else{
				$("#assetAlertMsg").removeClass("text-success").addClass("text-danger").html("*You can add maximum 10 files.").show();
				setTimeout(function(){$("#assetAlertMsg").hide();},4000);
				return false;
			 }
			
			
		});
		
		
		$('#addCustomQues').click(function(){
			if($(this).prop('checked')== true) {
				$('#customQuesFilelds').show();
				$("#customQuestionTable").find('tbody').empty();
				$("#customQuestionTable").find('tbody').append("<tr><td><input id='customQuefield_0' type='text' class='form-control'></td>" +
						"<td><select class='form-control' id='dcfieldque_0'></select></td>"+
					    "<td><input type='checkbox' id='mandatoryfieldQue_0' checked></td><td><input type='checkbox' id='lookupfieldQue_0'></td>" +
					    "<td><button id='addcustomQues' type='button' class='btn btn-success btn-xs' onClick='addMoreCustomQues()'><i class='fa fa-plus fa-lg' "+
						"aria-hidden='true'></i> Add More</button></td></tr>");
				if(csfDcFieldsList != null) {
					$("#dcfieldque_0").html(csfDcFieldsList);
				}
			}else{
				$('#customQuesFilelds').hide();
			}
		});
		
		$(document.body).delegate(".delQuesField", "click", function(){
			rowId.push($(this).closest("tr").attr('id').split("_")[1]);
			$(this).closest("tr").remove();
			customQueCount--;
		});
		
		
		$("#submitCustomQuestion").click(function() {
			setTimeout(function(){
				$("#customQuestionModal").modal('hide');
			},1000);	
			editIndex='';
			i = 1;
			var customQuestion = $("#customQuestions .card-body").find('p').text();
			$("#customQuestions .card-body").empty();
			
			if(customQuestion != null && customQuestion != "") {
				var customQuestionArray = [];
				customQuestionArray = customQuestion.split("\n");
				var tmp = [];
				$(customQuestionArray).each(function(iIndex, sElement) {
					if(sElement != null && sElement != "") {
						var $addFile = $("<p id='q_"+i+"' class='mb-2' ondblclick='editCustomQuestion("+i+")'></p>");
						$("#customQuestions").show();
						$("#customQuestions .card-body").append($addFile);
						$("#q_"+i).text(i+"." + sElement.substring(sElement.indexOf(".")+1, sElement.length) + "\n");
						i++;	
						
						tmp.push(sElement.substring(sElement.indexOf(".")+2, sElement.length));
						$("#questions").val(tmp.join("||"));
					}
				});
			} 
			else {
				$("#customQuestions").hide();
			}
		})
		//$(".ycSp").hide();
		
		
		$('#prevMapFields').click(function(){
			$('.nav-tabs .active').parent().prev('li').find('a').trigger('click');
		});
		$('#nextMapFields').click(function(){
			$('.nav-tabs .active').parent().next('li').find('a').trigger('click');
		});
		$('a[href="#mappFields"]').on('shown.bs.tab', function (e) {
			$('#prevMapFields, #saveMapFields').hide();
			$('#nextMapFields').show();
		});
		$('a[href="#staticFields"]').on('shown.bs.tab', function (e) {
			$('#nextMapFields').hide();
			$('#prevMapFields, #saveMapFields').show();
		});
		
		$(document.body).delegate(".delField", "click", function(){
			//$(this).closest(".form-group").remove();
			$(this).closest("tr").remove();
			staticFieldCount--;
		});
		
		$('#clientColumns').click(function(){
			$(this).val("");
		}) 
			
		$("#clientColumns").change(function(e){
			$('a[href="#mappFields"]').tab('show');
			
			$("#csfMappingTable1").find('tbody').empty();
			$("#csfMappingTable2").find('tbody').empty();
			$("#staticFieldTable").find('tbody').empty();
			customQueCount = 0;
			document.getElementById('saveMapFields').disabled = false;
			var formData=new FormData();
			var clientColumnFile = $("#clientColumns")[0].files[0];
			formData.append("file",clientColumnFile);
			    
			if(clientColumnFile != null && clientColumnFile != "" && clientColumnFile != 'undefined') {
				var fileName = $('#clientColumns').prop("files")[0]['name'];
				if(fileName.lastIndexOf(".csv") != -1) {
					if (e.target.files != undefined) {
						$("#csfMappingTable1").find('tbody').empty();
						$("#csfMappingTable2").find('tbody').empty();
						$('#customQuesFilelds').hide();
						$('#customeQuestions').hide();
						
						
						loadCsfDcFieldsColumns();
							
						var reader = new FileReader();
						reader.onload = function(e) {
							var csvval=e.target.result.split("\n");
							var csvvalue=csvval[0].split(",");
							csfColumnCount = csvvalue.length;
							var inputrad="";
							for(var i=0;i<csvvalue.length;i++)
							{
								 var fieldLabel = csvvalue[i].toLowerCase().trim();
							    if(i%2 == 0) {
							    	var temp=csvvalue[i];
								    var inputrad=inputrad+" "+temp;
									    $("#csfMappingTable1").find('tbody').append("<tr><td><label id='clientfield_"+i+"' class='control-label'>"+
										    ""+csvvalue[i]+"</label></td><td><select class='form-control' id='dcfield_"+i+"'></select></td>"+
										    "<td><input type='checkbox' id='mandatoryfield_"+i+"'></td><td><input type='checkbox' id='lookupfield_"+i+"'></td></tr>");
							    }
							    else {
							    		 $("#csfMappingTable2").find('tbody').append("<tr><td><label  id='clientfield_"+i+"' class='control-label'> "+
											""+csvvalue[i]+"</label></td><td><select class='form-control' id='dcfield_"+i+"'></select></td>"+
										    "<td><input type='checkbox' id='mandatoryfield_"+i+"'></td><td><input type='checkbox' id='lookupfield_"+i+"'></td></tr>");
							    }
							    if(csfDcFieldsList != null) {
									$("#dcfield_"+i).html(csfDcFieldsList);
								}
							}
							
							$("#staticFieldTable").find("tbody").append("<tr><td><input id='staticfield_0' type='text' class='form-control'></td> "+
								"<td><input id='staticvalue_0' type='text' class='form-control'></td>"+
								"<td><button id='addStaticFields' type='button' class='btn btn-success btn-xs' onClick='addCsfStaticFields()'><i class='fa fa-plus fa-lg' "+
								"aria-hidden='true'></i> Add More</button></td></tr>");
						};
						$("#csfMappingModal").modal('show');
						reader.readAsText(e.target.files.item(0));
					}
				}
				else {
					$("#csfMsg").removeClass("success_msg").addClass("error_msg").html("* only CSV files are allowed.").show();
					setTimeout(function(){
						$("#csfMsg").html("").hide();
					},4000);
				}
			} 
		});
		$("#saveMapFields").click(function() {
			var orderId=JSON.parse(selectedRecordData.workorder).workorder_id_text;
			if(orderId != null && orderId != undefined){
			var fieldMappingJsonArray = [];
			var fieldMappingJsonObject = {json:{}};
			var csfMandatoryFieldList=[];
			var requiredFieldsBlank = false;
			var csfLookupFieldList=[];
			var csfLookupType="<option value=''>Please Select</option>";
			var lookupFieldsArray =["jobtitle","jobfunction","seniority_level","hq_state","hq_country","industry"];	
			var noLookupUpdateCount =0;
			
			if(csfColumnCount>0) {
				var dcColumnCount=0;
				for(var i=0; i<csfColumnCount; i++) {
					if(($("#clientfield_"+i).text() != null && $("#clientfield_"+i).text() != "" && $("#clientfield_"+i).text() != "undefined") || 
						($("#dcfield_"+i).val() != null && $("#dcfield_"+i).val() != "" && $("#dcfield_"+i).val() != "undefined")) {
						
						if($("#mandatoryfield_"+i).is(':checked')) {
							csfMandatoryFieldList.push($("#dcfield_"+i).val());
							$("#csfmandatoryfields").val(csfMandatoryFieldList.join(","));
							
						}
						
						if($("#lookupfield_"+i).is(':checked')){
							if($("#dcfield_"+i).val() != null && $("#dcfield_"+i).val() != "" && $("#dcfield_"+i).val() != "undefined"){
								if(lookupFieldsArray.indexOf($("#dcfield_"+i).val())!=-1 || $("#dcfield_"+i).val().startsWith("CustomQues")){
									csfLookupFieldList.push($("#dcfield_"+i).val());
								    $("#csflookupfields").val(csfLookupFieldList.join(","));
									csfLookupType = csfLookupType+"<option value='"+$("#dcfield_"+i).val()+"'>"+$("#dcfield_"+i).val()+"</option>";
								}else{
									noLookupUpdateCount++;
								}
							}
						}
						
						if($("#dcfield_"+i).val() != null && $("#dcfield_"+i).val() != "" && $("#dcfield_"+i).val() != "undefined") {
							fieldMappingJsonObject.json[$("#dcfield_"+i).val()] = $("#clientfield_"+i).text();
						}
						else {
							dcColumnCount++;
						}
					}
				}
				
			}
			
			for(var i=0; i<customQueCount; i++) {
				if(($("#customQuefield_"+i).val() != null && $("#customQuefield_"+i).val() != "" && $("#customQuefield_"+i).val() != "undefined") || 
						($("#dcfieldque_"+i).val() != null && $("#dcfieldque_"+i).val() != "" && $("#dcfieldque_"+i).val() != "undefined")) {
						
						if($("#mandatoryfieldQue_"+i).is(':checked')) {
							csfMandatoryFieldList.push($("#dcfieldque_"+i).val());
							$("#csfmandatoryfields").val(csfMandatoryFieldList.join(","));
							
						}
						
						if($("#lookupfieldQue_"+i).is(':checked')){
							if($("#dcfieldque_"+i).val() != null && $("#dcfieldque_"+i).val() != "" && $("#dcfieldque_"+i).val() != "undefined"){
								if(lookupFieldsArray.indexOf($("#dcfieldque_"+i).val())!=-1 || $("#dcfieldque_"+i).val().startsWith("CustomQues")){
									csfLookupFieldList.push($("#dcfieldque_"+i).val());
								    $("#csflookupfields").val(csfLookupFieldList.join(","));
									csfLookupType = csfLookupType+"<option value='"+$("#dcfieldque_"+i).val()+"'>"+$("#dcfieldque_"+i).val()+"</option>";
								}else{
									noLookupUpdateCount++;
								}
							}
						}
						
						if($("#dcfieldque_"+i).val() != null && $("#dcfieldque_"+i).val() != "" && $("#dcfieldque_"+i).val() != "undefined") {
							fieldMappingJsonObject.json[$("#dcfieldque_"+i).val()] = $("#customQuefield_"+i).val();
						}
						else {
							dcColumnCount++;
						}
					}
			}

			csfLookupSelectList=$("#csflookupfields").val();
			$("#lookUpSelect").html(csfLookupType);
			
			
			var staticFieldValueJsonArray = [];
			var staticFieldValueJsonObject = {};
			
			for(var i=0; i<staticFieldCount; i++) {
				if(($("#staticfield_"+i).val() != null && $("#staticfield_"+i).val() != "" && $("#staticfield_"+i).val() != "undefined") ||
					($("#staticvalue_"+i).val() != null && $("#staticvalue_"+i).val() != "" && $("#staticvalue_"+i).val() != "undefined")) {
					
					if($("#staticfield_"+i).val() != null && $("#staticfield_"+i).val() != "" && $("#staticfield_"+i).val() != "undefined") {
						
					}
					else {
						$("#staticfield_"+i).addClass('bdrRed');
						requiredFieldsBlank = true;
					}
					if($("#staticvalue_"+i).val() != null && $("#staticvalue_"+i).val() != "" && $("#staticvalue_"+i).val() != "undefined") {
						
					}
					else {
						$("#staticvalue_"+i).addClass('bdrRed');
						requiredFieldsBlank = true;
					}
					staticFieldValueJsonObject[$("#staticfield_"+i).val()] = $("#staticvalue_"+i).val();
				}
			}
			
			
			if(csfColumnCount == dcColumnCount) {
				$("#tabMsgDiv").show();
        		$("#tabMsg").addClass("alert-danger");
        		$("#tabMsg").html("Please select atleast one DC field");
        		setTimeout(function(){
        			$("#tabMsgDiv").hide();	
        		},3000); 
			}
			else if(requiredFieldsBlank) {
				$("#tabMsgDiv").show();
        		$("#tabMsg").addClass("alert-danger");
        		$("#tabMsg").html("Please enter required fields");
        		
        		document.getElementById('prevMapFields').disabled = false;
    			document.getElementById('saveMapFields').disabled = false;
    			document.getElementById('cancelMapFields').disabled = false;
			}else if(noLookupUpdateCount>0){
				$("#tabMsgDiv").show();
        		$("#tabMsg").addClass("alert-danger");
        		$("#tabMsg").html("Please select lookup checkbox only for jobtitle,jobfunction,seniority_level,hq_state,hq_country,industry and CustomQues*");
        		setTimeout(function(){
        			$("#tabMsgDiv").hide();	
        		},3000);
			}
			else {
				if(Object.keys(fieldMappingJsonObject.json).length > 0) {
					fieldMappingJsonArray.push(fieldMappingJsonObject);
				}
				if(Object.keys(staticFieldValueJsonObject).length > 0) {
					staticFieldValueJsonArray.push(staticFieldValueJsonObject);
				}
				
				if(fieldMappingJsonArray.length > 0) {
					$("#csfmasterfields").val(JSON.stringify(fieldMappingJsonArray));
				}
				else {
					$("#csfmasterfields").val("");
				}
				if(staticFieldValueJsonArray.length > 0) {
					$("#csfstaticfields").val(JSON.stringify(staticFieldValueJsonArray));
				}
				else {
					$("#csfstaticfields").val("");
				}
				if(csfMandatoryFieldList.length > 0) {
				}
				else {
					$("#csfmandatoryfields").val("");
				}
				if(csfLookupFieldList.length > 0) {
				}
				else {
					$("#csflookupfields").val("");
				}
				
				var orderId=JSON.parse(selectedRecordData.workorder).workorder_id_text;
				var columnPreference=$("input[name='columnPreference']").is(":checked")?'Y':'N';
				$("#addCsfMappingLoader").show();

				$.ajax({
			    	url: "addCSFMappingColumn.do?orderId="+orderId+"&opportunityID="+$("#opportunityID").val()+"&username="+userName+"&columnPreference="+columnPreference,
			        data: $("#csfMappingForm").serialize(), 
			        type: "POST",
			        success : function(result) {
			        	if(result=="success") {
			        		alreadySave = true;
			        		$("#addCsfMappingLoader").hide();
			        		$("#tabMsgDiv").show();
			        		$("#tabMsg").removeClass("alert-danger");
			        		$("#tabMsg").addClass("alert-success");
			        		$("#tabMsg").html("CSF details saved successfully.");
			        		setTimeout(function(){
			        			$("#tabMsgDiv").hide();
			        			$("#csfMappingModal").modal('hide');
			        			document.getElementById('prevMapFields').disabled = false;
			        			document.getElementById('saveMapFields').disabled = false;
			        			document.getElementById('cancelMapFields').disabled = false;
			        		},3000); 
			        	}
			        	else {
			        		alreadySave = true;
			        		$("#addCsfMappingLoader").hide();
			        		$("#tabMsgDiv").show();
			        		$("#tabMsg").addClass("alert-danger");
			        		$("#tabMsg").html("Error occured while saving the CSF details.");
			        		setTimeout(function(){
			        			$("#tabMsgDiv").hide();
			        			$("#csfMappingModal").modal('hide');
			        		},3000);
			        		document.getElementById('prevMapFields').disabled = false;
		        			document.getElementById('saveMapFields').disabled = false;
		        			document.getElementById('cancelMapFields').disabled = false;
			        	}
			        }
				}); 
			}
			}
		});
		
		$("#viewColumnMappingBtn").click(function() {
			$('a[href="#mappFields"]').tab('show');
			$('#prevMapFields, #saveMapFields').hide(); 
			
			$("#csfMappingTable1").find('tbody').empty();
			$("#csfMappingTable2").find('tbody').empty();
			$("#staticFieldTable").find('tbody').empty();
			$('#customQuesFilelds').hide();
			$('#customeQuestions').show();
			$('#addCustomQues').prop('checked', false);
			customQueCount = 1;
			
			loadCsfDcFieldsColumns();
			loadColumnMappingData();
			$("#csfMappingModal").modal('show');
		});
		
		$("#viewlookUpBtn").click(function() {
			$("#viewlookUpModal").modal('show');
			loadCsfLookupData();
		});
		
		$("#clientColumnsButton").click(function(e){
			$('a[href="#mappFields"]').tab('show');
			$("#csfMappingTable1").find('tbody').empty();
			$("#csfMappingTable2").find('tbody').empty();
			$("#staticFieldTable").find('tbody').empty();
			
			document.getElementById('saveMapFields').disabled = false;
			
			var formData=new FormData();
			var clientColumnFile = $("#clientColumns")[0].files[0];
			formData.append("file",clientColumnFile);
						$("#csfMappingTable1").find('tbody').empty();
						$("#csfMappingTable2").find('tbody').empty();
						$('#customQuesFilelds').hide();
						$('#customeQuestions').show();
						$('#addCustomQues').prop('checked', false);
						customQueCount = 1;
						
						
						loadCsfDcFieldsColumns();
						loadCsfDcFieldsColumnsForNoPreference();
							
							var csvvalue=csfDcFieldsListWithNoPreferenece.split(",");
							csfColumnCount = csvvalue.length;
							var inputrad="";
							for(var i=0;i<csvvalue.length;i++)
							{
								 var fieldLabel = csvvalue[i].toLowerCase().trim();
							    if(i%2 == 0) {
							    	var temp=csvvalue[i];
								    var inputrad=inputrad+" "+temp;
								    if(fieldLabel=="jobtitle" || fieldLabel=="jobfunction" ||fieldLabel=="seniority_level"||fieldLabel=="hq_state"||fieldLabel=="hq_country"||fieldLabel=="industry"){	
									    $("#csfMappingTable1").find('tbody').append("<tr><td><label id='clientfield_"+i+"' class='control-label ' >"+
										    ""+csvvalue[i]+"</label></td><td><select class='form-control' id='dcfield_"+i+"'></select></td>"+
										    "<td><input type='checkbox' id='mandatoryfield_"+i+"' checked></td><td><input type='checkbox' id='lookupfield_"+i+"'></td></tr>");
								    }else{
								    	$("#csfMappingTable1").find('tbody').append("<tr><td><label id='clientfield_"+i+"' class='control-label' >"+
											  ""+csvvalue[i]+"</label></td><td><select class='form-control' id='dcfield_"+i+"'></select></td>"+
											  "<td><input type='checkbox' id='mandatoryfield_"+i+"' checked></td><td><input type='checkbox' id='lookupfield_"+i+"' disabled></td></tr>");
								    }
							    }
							    else {
								    if(fieldLabel=="jobtitle" || fieldLabel=="jobfunction" ||fieldLabel=="seniority_level"||fieldLabel=="hq_state"||fieldLabel=="hq_country"||fieldLabel=="industry"){	
								    	$("#csfMappingTable2").find('tbody').append("<tr><td><label id='clientfield_"+i+"' class='control-label'> "+
											""+csvvalue[i]+"</label></td><td><select class='form-control' id='dcfield_"+i+"'></select></td>"+
										    "<td><input type='checkbox' id='mandatoryfield_"+i+"' checked></td><td><input type='checkbox' id='lookupfield_"+i+"'></td></tr>");
								    }else{
								    	$("#csfMappingTable2").find('tbody').append("<tr><td><label id='clientfield_"+i+"' class='control-label'> "+
											""+csvvalue[i]+"</label></td><td><select class='form-control' id='dcfield_"+i+"'></select></td>"+
											  "<td><input type='checkbox' id='mandatoryfield_"+i+"' checked></td><td><input type='checkbox' id='lookupfield_"+i+"' disabled></td></tr>");	
								    }
							    }
							    if(csfDcFieldsList != null) {
									$("#dcfield_"+i).html(csfDcFieldsList);
									$("#dcfield_"+i).val(csvvalue[i]);
								}
							}
							$("#staticFieldTable").find("tbody").append("<tr><td><input id='staticfield_0' type='text' class='form-control'></td> "+
								"<td><input id='staticvalue_0' type='text' class='form-control'></td>"+
								"<td><button id='addStaticFields' type='button' class='btn btn-success btn-xs' onClick='addCsfStaticFields()'><i class='fa fa-plus fa-lg' "+
								"aria-hidden='true'></i> Add More</button></td></tr>");
						$("#csfMappingModal").modal('show');
		});
		
		$('#columnPreference').click(function(){
			 if($(this).prop('checked')== true)
			 	{
				 $('#clientColumnsButton').hide();
				 $('#clientColumnsFile').show();
				}
			else
				 {
				$('#clientColumnsButton').show();
				 $('#clientColumnsFile').hide();
				 }
		});
		
		$('#specificCountries').click(function(){
			if($(this).prop('checked')== true)
			{
				$("input:radio[name='region']").each(function(i) {
				       this.checked = false;
				});
				$('#specificCountriesDiv').show();
				$('#countryDiv').hide();
			}
			else
			{
				$('#specificCountriesDiv').hide();
				$('#countryDiv').show();
			}
		});
		
		$('#includeOrderFormatting').click(function(){
			$("#orderNameSpin").hide();
			if($(this).prop('checked')== true)
			{
				$('#includeOrderFormattingDiv').show();
				$('#delTimeCheck').show();
			}
			else
			{
				$('#includeOrderFormattingDiv').hide();
				$('#delTimeCheck').hide();
			}
		});
		
	
		$('body').click(function(evt){ 
			if(evt.target.id != "orderMultiSelectParent" && evt.target.id != "orderMultiSelect"  && evt.target.id != "orderDropdownButton" &&  evt.target.id !="orderImage" && evt.target.id !="orderSearch" && evt.target.id !="order"){
				$('#orderSearch').val('');
				$('#orderMultiSelectParent').hide();
		    }
			if(evt.target.id != "jobFunctionMultiSelectParent" && evt.target.id != "jobFunctionMultiSelect"  && evt.target.id != "jobFunctionDropdownButton" &&  evt.target.id !="orderImage" && evt.target.id !="jobFunctionSearch" && evt.target.id !="salesOrderJobFunction"){
				$('#jobFunctionSearch').val('');
				$('#jobFunctionMultiSelectParent').hide();
			}
			if(evt.target.id != "seniorityLevelMultiSelectParent" && evt.target.id != "seniorityLevelMultiSelect"  && evt.target.id != "seniorityLevelDropdownButton" &&  evt.target.id !="orderImage" && evt.target.id !="seniorityLevelSearch" && evt.target.id !="salesOrderSeniorityLevel"){
				$('#seniorityLevelSearch').val('');
				$('#seniorityLevelMultiSelectParent').hide();
			}
			if(evt.target.id != "countryMultiSelectParent" && evt.target.id != "countryMultiSelect"  && evt.target.id != "specificCountriesButton" &&  evt.target.id !="countryImage" && evt.target.id !="countrySearch" && evt.target.id !="country"){
				$('#countrySearch').val('');
				$('#countryMultiSelectParent').hide();
			}
			if(evt.target.id != "jobTitleMultiSelectParent" && evt.target.id != "jobTitleMultiSelect"  && evt.target.id != "jobTitleDropdownButton" &&  evt.target.id !="orderImage" && evt.target.id !="jobTitleSearch" && evt.target.id !="targetTitle"){
				$('#jobTitleSearch').val('');
				$('#jobTitleMultiSelectParent').hide();
			}
			
			if(evt.target.id != "industryMultiSelectParent" && evt.target.id != "industryMultiSelect"  && evt.target.id != "industryDropdownButton" &&  evt.target.id !="orderImage" && evt.target.id !="industrySearch" && evt.target.id !="salesorderindustry"){
				$('#industrySearch').val('');
				$('#industryMultiSelectParent').hide();
			}
			if(evt.target.id != "salesOrderYesFromOpprMultiSelectParent" && evt.target.id != "salesOrderYesFromOpprMultiSelect"  && evt.target.id != "salesOrderYesFromOpprDropdownButton" &&  evt.target.id !="orderImage" && evt.target.id !="salesOrderYesFromOpprSearch" && evt.target.id !="salesOrderYesFromOppr"){
				$('#salesOrderYesFromOpprSearch').val('');
				$('#salesOrderYesFromOpprMultiSelectParent').hide();
			}
		});

		$("#deleteSuppression").click(function(){
			$("#deleteSuppressionModal").modal('show');
			
		});
		
		$("#deleteNAL").click(function(){
			$("#deleteNALModal").modal('show');
			
		});
		
	});

	function loadCsfLookupData(){
		$("#viewLookupLoader").show();
		$("#viewLookupTbl").find('tbody').empty();
		$.ajax({
	    	url: "loadLookupTypes.do?opportunityId="+$("#opportunityID").val(),
	    	async:false,
	        success : function(data) {
	        	$("#viewLookupLoader").hide();
	        	if(data != null && data != "") {
	        		data = JSON.parse(data);
	        		csfLookupTypeList = data;
		        	$.each(data, function(i) {
		        		var lookupType = '"'+data[i]+'"';
		        		$("#viewLookupTbl").find("tbody").append("<tr id='rowlookup_"+i+"'><td>"+data[i]+"</td><td><a href='#' onClick='downloadLookupFile("+i+", "+lookupType+")' id='lookup_"+i+"'>"+data[i]+"</a></td><td><button type='button' class='btn btn-danger btn-xs' onClick='deleteLookupType("+i+", "+lookupType+")'><i class='fa fa-window-close' aria-hidden='true'></i></button></td></tr>");
		        	});
		        	
	        	}
	        	else {
	        		$("#viewLookupTbl").find("tbody").append("<tr><td colspan='3' class='text-danger text-center'>No data available.</td></tr>");
	        	}
	        }
		});
	} 

	function loadCsfDcFieldsColumns() {
		var finalURL = "loadCsfDcFieldsColumns.do";
		$.ajax({
			url : finalURL,
			async:false,
			success : function(result) {
				csfDcFieldsList = result.toString();
			}
		});
	}	
	
	function defaultCSFColumnSave(){
		loadCsfDcFieldsColumnsForNoPreference();
		var csvvalue=csfDcFieldsListWithNoPreferenece.split(",");
		csfColumnCount = csvvalue.length;
		var inputrad="";
		for(var i=0;i<csvvalue.length;i++)
		{
			 var fieldLabel = csvvalue[i].toLowerCase().trim();
		    if(i%2 == 0) {
		    	var temp=csvvalue[i];
			    var inputrad=inputrad+" "+temp;
			    if(fieldLabel=="jobtitle" || fieldLabel=="jobfunction" ||fieldLabel=="seniority_level"||fieldLabel=="hq_state"||fieldLabel=="hq_country"||fieldLabel=="industry"){	
				    $("#csfMappingTable1").find('tbody').append("<tr><td><label id='clientfield_"+i+"' class='control-label' >"+
					    ""+csvvalue[i]+"</label></td><td><select class='form-control' id='dcfield_"+i+"'></select></td>"+
					    "<td><input type='checkbox' id='mandatoryfield_"+i+"' checked></td><td><input type='checkbox' id='lookupfield_"+i+"'></td></tr>");
			    }else{
			    	$("#csfMappingTable1").find('tbody').append("<tr><td><label id='clientfield_"+i+"' class='control-label' >"+
						  ""+csvvalue[i]+"</label></td><td><select class='form-control' id='dcfield_"+i+"'></select></td>"+
						  "<td><input type='checkbox' id='mandatoryfield_"+i+"' checked></td><td><input type='checkbox' id='lookupfield_"+i+"' disabled></td></tr>");
			    }
		    }
		    else {
			    if(fieldLabel=="jobtitle" || fieldLabel=="jobfunction" ||fieldLabel=="seniority_level"||fieldLabel=="hq_state"||fieldLabel=="hq_country"||fieldLabel=="industry"){	
			    	$("#csfMappingTable2").find('tbody').append("<tr><td><label id='clientfield_"+i+"' class='control-label'> "+
						""+csvvalue[i]+"</label></td><td><select class='form-control' id='dcfield_"+i+"'></select></td>"+
					    "<td><input type='checkbox' id='mandatoryfield_"+i+"' checked></td><td><input type='checkbox' id='lookupfield_"+i+"'></td></tr>");
			    }else{
			    	$("#csfMappingTable2").find('tbody').append("<tr><td><label id='clientfield_"+i+"' class='control-label'> "+
						""+csvvalue[i]+"</label></td><td><select class='form-control' id='dcfield_"+i+"'></select></td>"+
						  "<td><input type='checkbox' id='mandatoryfield_"+i+"' checked></td><td><input type='checkbox' id='lookupfield_"+i+"' disabled></td></tr>");	
			    }
		    }
		    if(csfDcFieldsList != null) {
				$("#dcfield_"+i).html(csfDcFieldsList);
				$("#dcfield_"+i).val(csvvalue[i]);
			}
		}
	}

	function loadCsfDcFieldsColumnsForNoPreference() {
		var finalURL = "loadCsfDcFieldsColumnsForNoPreference.do";
		$.ajax({
			url : finalURL,
			async:false,
			success : function(result) {
				csfDcFieldsListWithNoPreferenece = result.toString();
			}
		});
		//csfDcFieldsListWithNoPreferenece = csfDcFieldsListWithNoPreferenece.toString();
	}
	
	function downloadLookupFile(index, lookupType) {
		document.getElementById('lookup_'+index).href="downloadLookupFile.do?lookuptype="+lookupType+"&opportunityid="+$("#opportunityID").val();
	}

	function deleteLookupType(index, lookupType) {
		$("#rowlookup_"+index).remove();
		$("#viewLookupLoader").show();
		
		$.ajax({
			url : "deleteLookupType.do?lookuptype="+lookupType+"&opportunityid="+$("#opportunityID").val(),
			success : function(result) {
				loadCsfLookupData();
			}
		});
	}
		
	function saveFile()
	{
		if(csfLookupSelectList != null && csfLookupSelectList != ""){
			//$("#clientColumns").removeClass();
			if($("#lookUpSelect").val()=="")
			{
				$("#lookUpSelect").addClass('bdrRed');
				$("#csfMsg").removeClass("success_msg").addClass("error_msg").html("* kindly select lookup type.").show();
				setTimeout(function(){
					$("#csfMsg").html("").hide();
				},4000);
				return false;
			}
			
			if($("#lookUpUpload").val()=="")
			{
				$("#csfMsg").removeClass("success_msg").addClass("error_msg").html("* kindly select the file to upload.").show();
				setTimeout(function(){
					$("#csfMsg").html("").hide();
				},4000);
				return false;
			}
			saveCsfLookupUpload();
		}
		else{
			//$("#clientColumns").addClass('bdrRed');
			$("#csfMsg").removeClass("success_msg").addClass("error_msg").html("* kindly upload client column first.").show();
			setTimeout(function(){
				$("#csfMsg").html("").hide();
			},4000);
			return false;
		}
	}
		
	function saveCsfLookupUpload(){
		// code to pick up file
		$("#csfLoader").show();
		document.getElementById('savefile').disabled = true;
		
		var formData=new FormData();
		formData.append("file",$("#lookUpUpload")[0].files[0]);
		
		var fileName = $('#lookUpUpload').prop("files")[0]['name'];
		if(fileName.lastIndexOf(".csv") != -1 || fileName.lastIndexOf(".xls") != -1 || fileName.lastIndexOf(".xlsx") != -1) {
			var orderId=JSON.parse(selectedRecordData.workorder).workorder_id_text;
			
			$.ajax({
				url: "saveCsfLookupUpload.do?lookuptype="+$("#lookUpSelect").val()+"&opportunityid="+$("#opportunityID").val()+"&orderid="+orderId+"&username="+userName,
				data:formData,
				contentType: false,
				processData: false,
				type: "POST",
				success: function(data, textStatus, xhr)
				{ 
					if(data == "lookupexists") {
						$.confirm({
							'message'	: 'Lookup value already exists agaist this type. Do you still want to continue?',
							'buttons'	: {
								'<span class="fa fa-check-circle" aria-hidden="true"></span> Yes'	: {
									'class'	: 'yes',
									'action': function(){
		                             $.ajax({
		                            	url: "deleteCsfLookupValue.do?lookuptype="+$("#lookUpSelect").val()+"&opportunityid="+$("#opportunityID").val()+"&orderid="+orderId+"&username="+userName,
		                         		data:formData,
		                      			contentType: false,
		                      			processData: false,
		                      			type: "POST",		 
		                         		success : function(data) {
		                         			$("#csfLoader").hide();
		                         			document.getElementById('savefile').disabled = false;
		                  					$("#csfMsg").removeClass("error_msg").addClass("success_msg").html("* Lookup file saved successfully.").show();
		                  					$("#lookUpSelect").val("");
		                  					$("#lookUpUpload").val("");
		                  					setTimeout(function(){
		                  						$("#csfMsg").html("");
		                  					},4000);
		                         	 	},
		                         	 	error: function(xhr, textStatus, errorThrow)
		                        		{
		                        			$("#csfLoader").hide();
		                        			document.getElementById('savefile').disabled = false;
		                        			$("#csfMsg").removeClass("success_msg").addClass("error_msg").html("* Oops ! error has occurred. File can't be uploaded. Plese try again.").show();
		                        			setTimeout(function(){
		                        				$("#csfMsg").html("").hide();
		                        			},4000);
		                        		}
		                             })
								 	}
								},
								'<span class="fa fa-times-circle" aria-hidden="true"></span>  No'	: {
									'class'	: 'no',
									'action': function(){
		                     			$("#csfLoader").hide();
		                     			document.getElementById('savefile').disabled = false;
		                     			$("#lookUpSelect").val("");
		              					$("#lookUpUpload").val("");
									}	// Nothing to do in this case. You can as well omit the action property.
								}
							}
						});
					}
					else if(data == "headernamemissing") {
						$("#csfLoader").hide();
						document.getElementById('savefile').disabled = false;
						$("#csfMsg").removeClass("success_msg").addClass("error_msg").html("* Column header should contain name in the uploaded file.").show();
						setTimeout(function(){
							$("#csfMsg").html("").hide();
						},4000);
					}
					else if(data == "success") {
						$("#csfLoader").hide();
						document.getElementById('savefile').disabled = false;
						$("#csfMsg").removeClass("error_msg").addClass("success_msg").html("* Lookup file saved successfully.").show();
						$("#lookUpSelect").val("");
						loadCsfLookupData();
						setTimeout(function(){
							$("#csfMsg").html("").hide();
						},4000);
					}
					else {
						$("#csfLoader").hide();
						document.getElementById('savefile').disabled = false;
						$("#csfMsg").removeClass("success_msg").addClass("error_msg").html("* exception occured while saving the lookup details.").show();
						setTimeout(function(){
							$("#csfMsg").html("").hide();
						},4000);
					}
				},
				error: function(xhr, textStatus, errorThrow)
				{
					$("#csfLoader").hide();
					document.getElementById('savefile').disabled = false;
					$("#csfMsg").removeClass("success_msg").addClass("error_msg").html("* Oops ! error has occurred. File can't be uploaded. Plese try again.").show();
					setTimeout(function(){
						$("#csfMsg").html("").hide();
					},4000);
				}
			});
		}
		else {
			$("#csfLoader").hide();
			document.getElementById('savefile').disabled = false;
			$("#csfMsg").removeClass("success_msg").addClass("error_msg").html("* Only .csv, .xls, .xlsx files are allowed.").show();
			setTimeout(function(){
				$("#csfMsg").html("").hide();
			},4000);
		}
	}
		
	function loadColumnMappingData() {
		$("#addCsfMappingLoader").show();
		defaultFieldsFromOpportunity = false;
		csfColumnCount=0;
		staticFieldCount = 1;
		lookUpFields ='';
		recordPerDomain = '';
		/*if(selectedRecordData.workorder == undefined){
			var workorder = JSON.parse(selectedRecordData.workorder);
		}else{
			var workorder = selectedRecordData.workorder;
		}*/
		var orderId=JSON.parse(selectedRecordData.workorder).workorder_id_text;
		var opportunityID=$("#opportunityID").val();
		var finalURL = "loadColumnMappingData.do?orderId="+orderId+"&opportunityID="+opportunityID;
		$.ajax({
			url : finalURL,
			async:false,
			success : function(data, textStatus, xhr) {
				if(data != null && data != "") {
					document.getElementById('saveMapFields').disabled = false;
					
					$("#csfMappingTable1").find('tbody').empty();
					$("#csfMappingTable2").find('tbody').empty();
						
					data = JSON.parse(data);
					data = data.csfMetaData;
					var fieldMapping = data.field_mapping;
					var mandatoryFields = data.mandatory_fields;
					var lookFields = data.lookup_fields;
					lookUpFields = lookFields;
					recordPerDomain = data.record_per_domain;
					if(fieldMapping != null && fieldMapping != "") {
						defaultFieldsFromOpportunity = true;
						$.each(JSON.parse(fieldMapping), function(key, obj){
							$.each(obj,function(k,v){
								csfColumnCount = Object.keys(v).length;
								var length = 0;
								$.each(v,function(key,value){
									if(key.startsWith("CustomQues")){
										customQueCount++;
									}
									if(length%2 == 0) {
										$("#csfMappingTable1").find('tbody').append("<tr><td><label  id='clientfield_"+length+"' class='control-label label-wrap'>"+
											""+value+"</label></td><td><select class='form-control' id='dcfield_"+length+"'></select></td>"+
											"<td><input type='checkbox' id='mandatoryfield_"+length+"'></td><td><input type='checkbox' id='lookupfield_"+length+"'></td></tr>");
									}
									else {
										$("#csfMappingTable2").find('tbody').append("<tr><td><label id='clientfield_"+length+"' class='control-label label-wrap'> "+
												""+value+"</label></td><td><select class='form-control' id='dcfield_"+length+"'></select></td>"+
											"<td><input type='checkbox' id='mandatoryfield_"+length+"'></td><td><input type='checkbox' id='lookupfield_"+length+"'></td></tr>");
									}
									if(csfDcFieldsList != null && csfDcFieldsList != "") {
										$("#dcfield_"+length).html(csfDcFieldsList);
										$("#dcfield_"+length).val(key);
									}
									if(mandatoryFields != null && mandatoryFields != "") {
										if(mandatoryFields.indexOf(key) > -1) {
											//mandatory field present
											$("#mandatoryfield_"+length).attr('checked', true);
										}
										else {
											$("#mandatoryfield_"+length).attr('checked', false);
										}
									}
									if(lookFields !=null && lookFields !=""){
										if(lookFields.indexOf(key) > -1){
											$("#lookupfield_"+length).attr('checked', true);
										}
										else{
											$("#lookupfield_"+length).attr('checked', false);
										}
									}
									length++;
								}); 
			                });
						});
					}
					var staticFields = data.static_fields;
					if(staticFields != null && staticFields != "") {
						$("#staticFieldTable").find("tbody").empty();
						$.each(JSON.parse(staticFields), function(key, value){
							var index=0;
							for(name in value) {
								if(index==0) {
									$("#staticFieldTable").find("tbody").append("<tr><td><input id='staticfield_"+index+"' type='text' class='form-control' "+
										"value='"+name+"'></td><td><input id='staticvalue_"+index+"' type='text' class='form-control' value='"+value[name]+"'></td>"+
										"<td><button id='addStaticFields' type='button' class='btn btn-success btn-xs' onClick='addCsfStaticFields()'><i class='fa fa-plus fa-lg' "+
										"aria-hidden='true'></i> Add More</button></td></tr>");
								}
								else {
									$("#staticFieldTable").find("tbody").append("<tr><td><input id='staticfield_"+index+"' type='text' class='form-control' "+
										"value='"+name+"'></td><td><input id='staticvalue_"+index+"' type='text' class='form-control' value='"+value[name]+"'></td>"+
										"<td><button type='button' class='delField btn btn-danger btn-xs'><span class='fa fa-times' "+
										"aria-hidden='true'></span> Remove</button></td></tr>");
								}
								index++;
							}
							staticFieldCount=index;
						});
					}
					else {
						$("#staticFieldTable").find("tbody").append("<tr><td><input id='staticfield_0' type='text' class='form-control'></td>"+
							"<td><input id='staticvalue_0' type='text' class='form-control'></td><td><button id='addStaticFields' type='button' "+
							"class='btn btn-success btn-xs' onClick='addCsfStaticFields()'><i class='fa fa-plus fa-lg' "+
							"aria-hidden='true'></i> Add More</button></td></tr>");
					}
					$("#addCsfMappingLoader").hide();
					
					var columnPreference=data.columnPreference;
					columnPreference=="Y"?$("input:checkbox[name='columnPreference']").prop('checked', true):$("input:checkbox[name='columnPreference']").prop('checked', false);
					 if(columnPreference=="Y")
					 	{
						 $('#clientColumnsButton').hide();
						 $('#clientColumnsFile').show();
						}
					else
						 {
						$('#clientColumnsButton').show();
						 $('#clientColumnsFile').hide();
						 }
				}
				else {
					$("#addCsfMappingLoader").hide();
					$("#tabMsgDiv").show();
	        		$("#tabMsg").addClass("alert-danger");
	        		$("#tabMsg").html("* No data present.");
	        		document.getElementById('saveMapFields').disabled = true;
	        		
	        		setTimeout(function(){
	        			$("#tabMsgDiv").hide();
	        		},3000); 
				}
			}
		});
	}

	function addCsfStaticFields() {
		if(staticFieldCount < 10) {
			var $addFile = $("<tr id='row_"+staticFieldCount+"'><td><input type='text' class='form-control' id='staticfield_"+staticFieldCount+"'></td><td><input type='text' class='form-control' id='staticvalue_"+staticFieldCount+"'></td><td><button type='button' class='delField btn btn-danger btn-xs'><span class='fa fa-times' aria-hidden='true'></span> Remove</button></td></tr>");
			$("#staticFieldDiv").append($addFile);
			staticFieldCount++;
		}else {
			$("#alertMsg").html("* You can add maximum 10 fields.").show();
			setTimeout(function() {
				$("#alertMsg").hide()
			}, 3000);
		}
	}
		
	
	function closeCSFMappingModal()
	{
		$("#clientColumns").val("");
		customQueCount = 1;
	}
	/* function loadCsfLookupColumns() {
		var finalURL = "loadCsfLookupColumns.do";
		$.ajax({
			url : finalURL,
			success : function(result) {
				var resultValue = result.toString();
				if(resultValue != "") {
					$("#lookUpSelect").html(result);
				}
			}
		});	
	} */

	function clearLookUpSelectClass() {
		if($("#lookUpSelect").val() != null && $("#lookUpSelect").val() != "") {
			$("#lookUpSelect").removeClass("bdrRed");
		}
		else {
			$("#lookUpSelect").addClass("bdrRed");
		}
	}
	
	function checkCustomQuestionAlreadyExists() {
		var duplicateQuestion = 0;	

		var customQuestion = $("#customQuestions").html();
		if(customQuestion != null && customQuestion != "") {
			var customQuestionArray = [];
			customQuestionArray = customQuestion.split("\n");
			$(customQuestionArray).each(function(iIndex, sElement) {
				if(sElement != null && sElement != "") {
					if(sElement.indexOf("<span") != -1) {
						sElement = sElement.substring(sElement.indexOf(".")+2, sElement.indexOf("<span"));
						if(sElement.trim().toLowerCase()==$("#custom_question").val().trim().toLowerCase()) {
							duplicateQuestion++;
						}
					}
				}
			});
		} 
		return duplicateQuestion;	
	}
	
	function editCustomQuestion(index) {
		if($("#custom_question").val() != null && $("#custom_question").val() != "") {
			$("#successReasonDetailMsg").html("Kindly save the previous custom question.").show();
			setTimeout(function(){$('#successReasonDetailMsg').html("");},4000);
			return false;
		}
		else {
			editIndex=index;
			var editQuestion = $("#q_"+index).text();
			editQuestion = editQuestion.substring(editQuestion.indexOf(".")+2, editQuestion.length);
			$("#custom_question").val(editQuestion);
			$("#q_"+index).text('');
		}
	}

	function showDuplicateQuestionMsg(editIndex) {
		$("#successReasonDetailMsg").html("The custom question '"+$("#custom_question").val()+"' already exists.").show();
		setTimeout(function(){$('#successReasonDetailMsg').html("");},4000);
		return false;
	}
	
	
	function saveBeforeCreateOrder(){
		var status = "false";
		if($("#lcdData").valid()) {
			if($("#stages").val() != null && $("#stages").val() != "" && $("#stages").val() == "8-closed-won") {
				if($("#unitPriceTbl").find("tbody").text().indexOf("No data") > -1) {
					$("#cplPriceMsg").html("Please add Unit price.").show();
					setTimeout(function(){$('#cplPriceMsg').html("").hide();},3000);
					return false;
				}
				if($("#closed_date").val() == null || $("#closed_date").val() == "") {
					$("#closedDateMsg").html("Please select closed date.").show();
					setTimeout(function(){$('#closedDateMsg').html("").hide();},3000);
					return false;
				}
			}
			if($("#stages").val() != null && $("#stages").val() != "" && $("#stages").val() != "0-closed-lost") {
				$('#campaignDuration, #campaignStart, #expected_closed_date').css('border-color','#cf1133');
				
				if($("#campaignDuration").val() == null || $("#campaignDuration").val() == "") {
					$("#campaignDurationMsg").html("Please select campaign duration.").show();
					setTimeout(function(){$('#campaignDurationMsg').html("").hide();},3000);
					return false;
				}
				if($("#campaignStart").val() == null || $("#campaignStart").val() == "") {
					$("#campaignStartMsg").html("Please select campaign start.").show();
					setTimeout(function(){$('#campaignStartMsg').html("").hide();},3000);
					return false;
				}
				if($("#expected_closed_date").val() == null || $("#expected_closed_date").val() == "") {
					$("#expectedClosedDateMsg").html("Please select expected close date.").show();
					setTimeout(function(){$('#expectedClosedDateMsg').html("").hide();},3000);
					return false;
				}
			}
	    	if($('#country').val() != null && $('#country').val() != "" && $('#hq_country').val() != null && $('#hq_country').val() != "" && $('#country').val() != $('#hq_country').val()) {
	    		$("#errorMsg").html("* value of country and hqCountry is not same. Kindly provide the same value.").show();
				setTimeout(function(){$('#errorMsg').html("");},5000);
				return false;
			}
			else {
				$('#campaignDuration, #campaignStart, #expected_closed_date').css('border-color','');
			}
			var loginuser = userName;
			if($("#unitPriceTbl").find("tbody").text().indexOf("No data") > -1) {
				unitPriceTableJson = '';
			}
			
			var aliasArray = $('#hidden_lead_source_alias').val(); //retrieve array
			
								
			var arr = {salesOpportunityId:$("#sales_opportunity_id").val(),modifiedby:loginuser,salesleadid:$("#sales_lead_id").val(),
				opportunityname:trimValue($('#opportunityname').val()),accountname:trimValue($('#accountname').val()),ordertype:trimValue($('#ordertype').val()),
				producttype:trimValue($('#producttype').val()),endcustomername:trimValue($('#endcustomername').val()),cplprice:trimValue($('#cplprice').val()),
				stages:trimValue($('#stages').val()),probability:trimValue($('#probability').val()),reasonforlost:trimValue($('#reasonforlost').val()),otherDescription:trimValue($('#other_description').val()),company_region:trimValue($('#company_region').val()),
				noofleads:trimValue($('#noofleads').val()),amount:trimValue($('#amount').val()),description:trimValue($('#order_description').val()),invoicedFrom:$('#invoicedFrom').val(),
				assigned_AM:$("#assign_AM").val(),ownername:"<%=userFullName%>",currency:$("#currency").val(),lead_source:$("#leadsource").val(),
				closedate:$("#closed_date").val(),clientReferenceNumber:$("#clientReferenceNumber").val(),internalReferenceNumber:$("#internalReferenceNumber").val(),contact_id:$("#contact_contact_id").val(),company_id:$("#company_company_id").val(),
				address_id:$("#address_id").val(),assigned_salesrep:$("#assigned_salesrep").val(),contact_region:$("#contact_region").val(),lead_status:$("#leadstatus").val(),
				last_activity:$("#lastactivity").val(),firstname:trimValue($('#firstname').val()),lastname:trimValue($('#lastname').val()),
				middlename:trimValue($('#middlename').val()),fullname:trimValue($('#fullname').val()),corporate_email:trimValue($('#corporate_email').val()),
				jobfunction:trimValue($('#jobfunction').val()),jobtitle:trimValue($('#jobtitle').val()),senioritylevel:trimValue($('#senioritylevel').val()),
				branchphone:trimValue($('#branchphone').val()),mobilephone:trimValue($('#mobilephone').val()),directphone:trimValue($('#directphone').val()),
				directphone_ext:trimValue($('#directphone_ext').val()),street:trimValue($('#street').val()),city:trimValue($('#city').val()),state:trimValue($('#state').val()),
				country:trimValue($('#country').val()),postalcode:trimValue($('#postalcode').val()),companyname:trimValue($('#company_companyname').val()),
				private_email:trimValue($('#private_email').val()),private_email2:trimValue($('#private_email2').val()),private_email3:trimValue($('#private_email3').val()),
				linkedinhandle:trimValue($('#linkedinhandle').val()),facebookhandle:trimValue($('#facebookhandle').val()),twitterhandle:trimValue($('#twitterhandle').val()),
				xinghandle:trimValue($('#xinghandle').val()),viadeolinkhandle:trimValue($('#viadeolinkhandle').val()),miscLinkHndleID:trimValue($('#miscLinkHndleID').val()),
				activityNotes:trimValue($("#activityNotes").val()),assign_inside_salesrep:$("#assign_inside_salesrep").val(),unitPriceTableData:unitPriceTableJson,
				campaignDuration:$("#campaignDuration").val(),campaignStart:$("#campaignStart").val(),
				expected_closed_date:$("#expected_closed_date").val(),subscriptionTerm:subscriptionTerm,
				firstnameNl:trimValue($('#firstnameNl').val()),lastnameNl:trimValue($('#lastnameNl').val()),middlenameNl:trimValue($('#middlenameNl').val()),fullnameNl:trimValue($('#fullnameNl').val()),
				streetNl:trimValue($('#streetNl').val()),cityNl:trimValue($('#cityNl').val()),stateNl:trimValue($('#stateNl').val()),jobtitleNl:trimValue($('#jobtitleNl').val()),leadSourceAlias:aliasArray,
				"company":{companyname:trimValue($('#company_companyname').val()),hq_street:trimValue($('#hq_street').val()),hq_city:trimValue($('#hq_city').val()),
				hq_postalcode:trimValue($('#hq_postalcode').val()),hq_state:trimValue($('#hq_state').val()),hq_country:trimValue($('#hq_country').val()),
				hq_phone:trimValue($('#hq_phone').val()),revenue:trimValue($('#revenue').val()),industry:trimValue($('#industry').val()),employee:trimValue($('#employee').val()),
				dunsnumber:trimValue($('#dunsnumber').val()),website:trimValue($('#website').val()),description:trimValue($('#description').val()),
				locationtype:$("#locationtype").val(),longitude:$("#longitude").val(),latitude:$("#latitude").val(),company_region:$("#company_region").val(),companytype:$("#companytype").val(),
				fax:$("#fax").val(),Parent_Duns_No:$("#Parent_Duns_No").val(),SIC:$("#SIC").val(),NAICS:$("#NAICS").val(),
				src_employeetotal:trimValue($('#src_employeetotal').val()),src_revenue:trimValue($('#src_revenue').val()),src_industry:trimValue($('#src_industry').val()),
				ultimate_duns:trimValue($('#ultimate_duns').val()),immediate_parent:trimValue($('#immediate_parent').val()),
				complinkedinhandle:trimValue($('#complinkedinhandle').val()),national_reg_number:trimValue($('#national_reg_number').val()),
				tradingcompanyname:trimValue($('#tradingcompanyname').val()),industrytext:trimValue($("#industrytext").val()),
				companynameNl:trimValue($('#company_companynameNl').val()),hq_streetNl:trimValue($('#hq_streetNl').val()),hq_cityNl:trimValue($('#hq_cityNl').val()),
				hq_stateNl:trimValue($('#hq_stateNl').val())}};
											
			$.ajax({
				url:"insertUpdateOpportunity.do",
				data: encodeURIComponent(JSON.stringify(arr)),	 
				type:'POST', 
				async:false,
				success: function(data, textStatus, xhr)
				{
					data = JSON.parse(data);
					
					$("#sales_opportunity_id").val(data.salesOpportunityId);
					console.log(data);
					if(data.message=="opportunityNameExists") {
						$("#opportunityname-error").html("Opportunity name already exists.").show();
						setTimeout(function(){$('#opportunityname-error').hide();},5000);
					}
					else if(data.message=="success" && data.salesOpportunityId!=null && data.salesOpportunityId != "" && data.salesOpportunityId != undefined ) {
					    status="true";
					}
					else {
						$("#opportunityDetailsLoader").hide();
						$("#errorMsg").html("* exception occurred while inserting record in queue, kindly check with development team.").show();
						setTimeout(function(){$('#errorMsg').html("");},5000);
					} 
					enableButtons();
				},
				error: function(xhr, textStatus, errorThrow)
				{
					$("#saveOpportunityMsg").hide();
					$("#opportunityDetailsLoader").hide();
					enableButtons();
					$("#errorMsg").html("* error occurred while inserting record in queue, kindly check with development team.").show();
					setTimeout(function(){$('#errorMsg').html("");},5000);
					status="false";
				}
			}) 	
		}
		return status;
	}
	
	function downloadSuppressionFile() {
		document.location.href ='downloadSuppressionFile.do?opportunityId='+$("#opportunityID").val()+"&orderId="+selectedOrderData.workorder.workorder_id_text;
	}
	
	function downloadNALFile() {
		document.location.href ='downloadNALFile.do?opportunityId='+$("#opportunityID").val()+"&orderId="+selectedOrderData.workorder.workorder_id_text;
	}
	
	function displayOrders(){
		$('#orderNameSpin').show();
		$.ajax({
			url : "getSalesOrders.do?accountId="+$("#salesordersfaccountID").val()+"&productType="+$("#salesorderproductTypeLabel").text(),
			success	:	function(data) {
				ordersObj=JSON.parse(data);
				var orderIdVal = $("#order").val().split(",");
				html = '';
				for(i=0;i<ordersObj.length;i++) {
					if(orderIdVal != null && orderIdVal != "" && orderIdVal.indexOf(ordersObj[i].campaign_name)>-1 && ordersObj[i].workorder_id_text!=selectedOrderData.workorder.workorder_id_text) {
						//html=html+'<li><a role="menuitem" href="#" onClick="selectOrders(event)" ><label><input type="checkbox" id=order'+i+' checked="true" value="'+ordersObj[i].order_id+'"> <span>'+ordersObj[i].campaign_name+'</span></input></label></a></li>';
						html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectOrders(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=order'+i+' value="'+ordersObj[i].workorder_id_text+'" checked><label class="form-check-label" for="order'+i+'">'+ordersObj[i].campaign_name+'</label></div></div>';
					}
					else if(ordersObj[i].workorder_id_text!=selectedOrderData.workorder.workorder_id_text){
						//html=html+'<li><a role="menuitem" href="#" onClick="selectOrders(event)" ><label><input type="checkbox" id=order'+i+' value="'+ordersObj[i].order_id+'"> <span>'+ordersObj[i].campaign_name+'</span></input></label></a></li>';
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectOrders(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=order'+i+' value="'+ordersObj[i].workorder_id_text+'"><label class="form-check-label" for="order'+i+'">'+ordersObj[i].campaign_name+'</label></div></div>';
					}
				}
				$("#orderMultiSelect").html(html);
				$("#orderMultiSelectParent").show().css("width", "100%");
				$('#orderNameSpin').hide();
			}
		});
	}

	function filterOrders() {
		html='';
		if(options == "" && orderIdOptions == ""  && prefillFormattingOrderId == true) {
			if($("#formattingOrderIdCampaignName").val() != null && $("#formattingOrderIdCampaignName").val() != "") {
				var data = JSON.parse($("#formattingOrderIdCampaignName").val());
				$.each(data, function(key, value){
					for(id in value) {
						options.push(value[id]);
					}
				});
			} 
		}
		
		for(i=0;i<ordersObj.length;i++) {
			try {
				var text=ordersObj[i].campaign_name;
				var code=ordersObj[i].order_id;
				var searchedText=$('#orderSearch').val();
				if(text.toLowerCase().indexOf(searchedText.toLowerCase())>-1){
					if(options.length>0) {
						if(options.indexOf(text)>-1) {
							html=html+'<div class="dropdown-item py-0 px-1" onClick="selectOrders(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=order'+i+' value="'+ordersObj[i].workorder_id_text+'" checked><label class="form-check-label" for="order'+i+'">'+ordersObj[i].campaign_name+'</label></div></div>';
						}
						else {
							html=html+'<div class="dropdown-item py-0 px-1" onClick="selectOrders(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=order'+i+' value="'+ordersObj[i].workorder_id_text+'"><label class="form-check-label" for="order'+i+'">'+ordersObj[i].campaign_name+'</label></div></div>';
						}
					}
					else {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectOrders(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=order'+i+' value="'+ordersObj[i].workorder_id_text+'"><label class="form-check-label" for="order'+i+'">'+ordersObj[i].campaign_name+'</label></div></div>';
					}
				}
			}
			catch(e) {
				console.log(e.message);
			}
		}
		$("#orderMultiSelect").html(html);
	}

	function selectOrders(event) {
		var orderIdCampaignNameJsonObject = {};
		var $target = $(event.currentTarget),
		val = $target.find('input[type="checkbox"]').next().text(),
		orderIdVal = $target.find('input[type="checkbox"]').attr('value'),
		$inp = $target.find('input[type="checkbox"]'),
		idx;
		
		if(options == "" && orderIdOptions == "" && prefillFormattingOrderId == true) {
			if($("#formattingOrderIdCampaignName").val() != null && $("#formattingOrderIdCampaignName").val() != "") {
				var data = JSON.parse($("#formattingOrderIdCampaignName").val());
				$.each(data, function(key, value){
					for(id in value) {
						if(id!="pvrDlvryDuration"){
							orderIdOptions.push(id);
							options.push(value[id]);
							if(orderIdVal == id) {
								
							}
							else {
								orderIdCampaignNameJsonObject[id] = value[id];
							}
						}
					}
				});
				prefillFormattingOrderId = false;
			} 
		}
		
		//if (($inp).prop('checked') == false && (idx = options.indexOf(val)) > -1) {
		if ((idx = options.indexOf(val)) > -1) {
			options.splice(idx, 1);
			orderIdOptions.splice(idx, 1);
			orderIdCampaignNameJsonArray.splice(idx,1);
			
			setTimeout(function() {$inp.prop('checked', false)}, 0);
			$inp.prop('checked', false).closest('.dropdown-item').removeClass("active");
		}
		else {
			if(options.indexOf(val) == -1) {
				options.push(val);
				orderIdOptions.push(orderIdVal);
			}
			orderIdCampaignNameJsonObject[orderIdVal] = val;
			setTimeout(function() {$inp.prop('checked', true)}, 0);
			$inp.prop('checked', true).closest('.dropdown-item').addClass("active");
		}
		$("#orderMultiSelectParent").dropdown('toggle');
		$("#order").val(options);
		
		if(Object.keys(orderIdCampaignNameJsonObject).length > 0) {
		orderIdCampaignNameJsonArray.push(orderIdCampaignNameJsonObject);
		}
		/*if(orderIdCampaignNameJsonArray.length > 0) {
			$("#formattingOrderId").val(JSON.stringify(orderIdCampaignNameJsonArray));
		}
		else {
			$("#formattingOrderId").val("");
		}*/
		return false;
	}
	
	function prefillFormatingOrders(){
		
		var pvrDlvryDurationObject = {};
		var orderIdCampaignNameJsonObject = {};
		pvrDlvryDurationObject["pvrDlvryDuration"]=$("input[name='deliveryTimeCheck']:checked").val();
		if(orderIdCampaignNameJsonArray.length == 0 && ($("#order").val() != null || $("#order").val() != "")){
			if(options == "" && orderIdOptions == "" && prefillFormattingOrderId == true) {
				if($("#formattingOrderIdCampaignName").val() != null && $("#formattingOrderIdCampaignName").val() != "") {
					debugger;
					var data = JSON.parse($("#formattingOrderIdCampaignName").val());
					$.each(data, function(key, value){
						for(id in value) {
							if(id!="pvrDlvryDuration"){
								orderIdOptions.push(id);
								options.push(value[id]);
								orderIdCampaignNameJsonObject[id] = value[id];
							}
						}
					});
					prefillFormattingOrderId = false;
				} 
			}
			if(Object.keys(orderIdCampaignNameJsonObject).length > 0) {
				orderIdCampaignNameJsonArray.push(orderIdCampaignNameJsonObject);
			}
		}
		
		if(orderIdCampaignNameJsonArray.length > 0) {
			orderIdCampaignNameJsonArray.push(pvrDlvryDurationObject);
		}
		if(orderIdCampaignNameJsonArray.length > 0 && $("input[name='includeOrderFormatting']").is(":checked")) {
			$("#formattingOrderId").val(JSON.stringify(orderIdCampaignNameJsonArray));
		}
		else if(($("#order").val() == null || $("#order").val() == "")){
			$("#formattingOrderId").val("");
		}
	}
	
	function displayJobFunction(){
		$('#jobFunctionSpin').show();
		data = jobfunctionList;
				if(data != "") {
					jobFunctionObj = JSON.parse(data);
					var jobFunctionVal = $("#salesOrderJobFunction").val().split(",");
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
			try {
				var searchedText=$('#jobFunctionSearch').val();
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
		var $target = $(event.currentTarget),
		val = $target.find('input[type="checkbox"]').attr('value'),
		$inp = $target.find('input[type="checkbox"]'),
		idx;
		
		if(jobFunctionOptions == "") {
			if($("#salesOrderJobFunction").val() != null && $("#salesOrderJobFunction").val() != "") {
				var jobFunctionArray = $("#salesOrderJobFunction").val().split(",");
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
		$("#salesOrderJobFunction").val(jobFunctionOptions);
		return false;
	}

	function displaySeniorityLevel(){
		$('#seniorityLevelSpin').show();
		var url='';
				data = senioritylevelList;
				if(data != "") {
					seniorityLevelObj = JSON.parse(data);
					var seniorityLevelVal = $("#salesOrderSeniorityLevel").val().split(",");
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
						if(seniorityLevelOptions.indexOf(text)>-1) {
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
			if($("#salesOrderSeniorityLevel").val() != null && $("#salesOrderSeniorityLevel").val() != "") {
				var seniorityLevelArray = $("#salesOrderSeniorityLevel").val().split(",");
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
		$("#salesOrderSeniorityLevel").val(seniorityLevelOptions);
		return false;
	}
	
	function addMoreCustomQues() {
		if(rowId.length>0){
			var $addQues = $("<tr id='row_"+rowId[0]+"'><td><input id='customQuefield_"+rowId[0]+"' type='text' class='form-control'></td>" +
					"<td><select class='form-control' id='dcfieldque_"+rowId[0]+"'></select></td>"+
				    "<td><input type='checkbox' id='mandatoryfieldQue_"+rowId[0]+"' checked></td><td><input type='checkbox' id='lookupfieldQue_"+rowId[0]+"'></td>" +
				    "<td><button type='button' class='delQuesField btn btn-danger btn-xs'><span class='fa fa-times' aria-hidden='true'></span> Remove</button></td></tr>");
					$("#customQuestionTable").append($addQues);
					if(csfDcFieldsList != null) {
						$("#dcfieldque_"+rowId[0]).html(csfDcFieldsList);
					}
					customQueCount++;
					rowId.splice(0,1);
		}else if(customQueCount < 20) {
			var $addQues = $("<tr id='row_"+customQueCount+"'><td><input id='customQuefield_"+customQueCount+"' type='text' class='form-control'></td>" +
			"<td><select class='form-control' id='dcfieldque_"+customQueCount+"'></select></td>"+
		    "<td><input type='checkbox' id='mandatoryfieldQue_"+customQueCount+"' checked></td><td><input type='checkbox' id='lookupfieldQue_"+customQueCount+"'></td>" +
		    "<td><button type='button' class='delQuesField btn btn-danger btn-xs'><span class='fa fa-times' aria-hidden='true'></span> Remove</button></td></tr>");
			$("#customQuestionTable").append($addQues);
			if(csfDcFieldsList != null) {
				$("#dcfieldque_"+customQueCount).html(csfDcFieldsList);
			}
			customQueCount++;
		}else {
			$("#alertMsgCustomQuestion").html("* You can add maximum 20 customQues.").show();
			setTimeout(function() {
				$("#alertMsgCustomQuestion").hide()
			}, 3000);
		}
	}
	
	function addMoreFiles() {
		if(rowIdFile.length>0){
			var $addFiles = $("<tr id='row_"+rowIdFile[0]+"'><td><input type='file' class='form-control form-control-sm'"+
			"id='salesorderpcsuppressionfile_"+rowIdFile[0]+"' name='salesorderpcsuppressionfile_"+rowIdFile[0]+"'></td>" +
		    "<td><button type='button' class='delFileField btn btn-danger btn-xs'><span class='fa fa-times' aria-hidden='true'></span> Remove</button></td></tr>");
		    $("#addSuppressionFileTable").append($addFiles);
			fileCount++;
			rowIdFile.splice(0,1);
			
		}else if(fileCount < 10) {
			var $addFiles = $("<tr id='row_"+fileCount+"'><td><input type='file' class='form-control form-control-sm'"+
			"id='salesorderpcsuppressionfile_"+fileCount+"' name='salesorderpcsuppressionfile_"+fileCount+"'></td>" +
		    "<td><button type='button' class='delFileField btn btn-danger btn-xs'><span class='fa fa-times' aria-hidden='true'></span> Remove</button></td></tr>");
		    $("#addSuppressionFileTable").append($addFiles);
			fileCount++;
		 }else{
			 $("#alertMsgFile").html("* You can add maximum 10 files.").show();
				setTimeout(function() {
					$("#alertMsgFile").hide()
				}, 3000);
			 
		 }
	}
	
	
	function addMoreNALFiles() {
		if(rowIdNALFile.length>0){
			var $addFiles = $("<tr id='row_"+rowIdNALFile[0]+"'><td><input type='file' class='form-control form-control-sm'"+
			"id='salesordersuppressionList_"+rowIdNALFile[0]+"' name='salesordersuppressionList_"+rowIdNALFile[0]+"'></td>" +
		    "<td><button type='button' class='delFileField btn btn-danger btn-xs'><span class='fa fa-times' aria-hidden='true'></span> Remove</button></td></tr>");
		    $("#addNALFileTable").append($addFiles);
			nalFileCount++;
			rowIdNALFile.splice(0,1);
			
		}else if(nalFileCount < 10) {
			var $addFiles = $("<tr id='row_"+nalFileCount+"'><td><input type='file' class='form-control form-control-sm'"+
			"id='salesordersuppressionList_"+nalFileCount+"' name='salesordersuppressionList_"+nalFileCount+"'></td>" +
		    "<td><button type='button' class='delFileField btn btn-danger btn-xs'><span class='fa fa-times' aria-hidden='true'></span> Remove</button></td></tr>");
		    $("#addNALFileTable").append($addFiles);
		    nalFileCount++;
		 }else{
			 $("#nalAlertMsg").html("* You can add maximum 10 files.").show();
				setTimeout(function() {
					$("#nalAlertMsg").hide()
				}, 3000);
			 
		 }
	}
	
	function addMoreAssetFiles() {
		if(rowIdAssetFile.length>0){
			var $addFiles = $("<tr id='row_"+rowIdAssetFile[0]+"'><td><input type='file' class='form-control form-control-sm'"+
			"id='assetFiles_"+rowIdAssetFile[0]+"' name='assetFiles_"+rowIdAssetFile[0]+"'></td>" +
		    "<td><button type='button' class='delFileField btn btn-danger btn-xs'><span class='fa fa-times' aria-hidden='true'></span> Remove</button></td></tr>");
		    $("#addAssetFileTable").append($addFiles);
			assetFileCount++;
			rowIdAssetFile.splice(0,1);
			
		}else if(assetFileCount < 10) {
			var $addFiles = $("<tr id='row_"+assetFileCount+"'><td><input type='file' class='form-control form-control-sm'"+
			"id='assetFiles_"+assetFileCount+"' name='assetFiles_"+assetFileCount+"'></td>" +
		    "<td><button type='button' class='delFileField btn btn-danger btn-xs'><span class='fa fa-times' aria-hidden='true'></span> Remove</button></td></tr>");
		    $("#addAssetFileTable").append($addFiles);
		    assetFileCount++;
		 }else{
			 $("#assetAlertMsg").html("* You can add maximum 10 files.").show();
				setTimeout(function() {
					$("#assetAlertMsg").hide()
				}, 3000);
			 
		 }
	}
	
	function cloneCampaignmodal(orderId,Campaign_Name){
		$('#cloneCampaignModal').modal();
		$("#cloneCampaignName").val('Clone_'+Campaign_Name);
		$("#cloneSuppressionNAL"). prop("checked", false);
		$("#cloneCampaign").attr("onclick","cloneWorkOrder('"+orderId+"')");
	}

	function cloneWorkOrder(orderId){
	var suppressionNALFlag=$("input[name='cloneSuppressionNAL']").is(":checked")?'Y':'N';
	var statusUpadteWithExisting = 'Y';
		$.ajax({
				url			:	'amusCloneOrder?user='+userName+"&order_id="+JSON.parse(selectedRecordData.workorder).workorder_id_text+"&campaign_name="+encodeURIComponent(document.getElementById('cloneCampaignName').value)+"&suppressionNALFlag="+suppressionNALFlag+"&statusUpadteWithExisting="+statusUpadteWithExisting, 
				contentType	:	"application/json",
				type		:	'POST',
				contentType :	false,
				processData :	false,
				crossDomain :	true,
				success		:	function(data, textStatus, xhr){
								if(data.message=="campaignNameAlreadyExists") {
										$("#msgClone").removeClass("text-success").addClass("text-danger").html("Campaign Name already exists.").show();
										setTimeout(function(){$('#msgClone').hide();},3000);
								}else{
										$('#msgClone').removeClass("text-danger").addClass("text-success").html("Campaign Cloned Successfully").show();
										setTimeout(function() {
												$('#cloneCampaignModal').modal('hide');
												$('#msgClone').hide();
												$('#createSalesOrderModal').modal("hide");
												$("#pbg, #pbg-error").modal("hide");
												$("#salesOrderLoader").hide();
												$("#createNewOrderForm").trigger('reset');
												$(".weekDiv").hide();
												$(".timeDiv").hide();
												$(".leadsDiv").hide();
										}, 3000);
								}
								},
				error		:	function(xhr, textStatus, errorThrow){
										$('#errorClone').html("Exception in Cloning Campaign").show();
										setTimeout(function() {
												$('#errorClone').hide();
										}, 5000);
										return false;
								}
		});
}
	
	
	function cloneOrder(){
		prefilOrderForm(selectedOrderData);
		oldOrderId = selectedOrderData.orderID;
		cloneOrderFlag = true;
		$("#cloneButton").attr('disabled', 'disabled');
		$("#createButton").text('Create Order');
	}
	
	function copySuppressionNAL(oldOrderId,cloneOrderId){
		$.ajax({
			url : "copySuppressionNAL.do?oldOrderId="+oldOrderId+"&cloneOrderId="+cloneOrderId,
			async:false,
			success : function(result) {
					if(result == "success"){
						
					}
					else {
						$("#errorMsg").html("* error occurred while Copying Suppression and NAL record in db, kindly check with development team.").show();
						setTimeout(function(){$('#errorMsg').html("");},3000);
					} 
				},
				error: function(xhr, textStatus, errorThrow)
				{
					$("#errorMsg").html("* error occurred while Copying Suppression and NAL record in db, kindly check with development team.").show();
					setTimeout(function(){$('#errorMsg').html("");},3000);
				}		
		});
	}
	
	function displayCountries(){
		$('#countryNameSpin').show();
					if(specificCountryObj != "") {
					var countryVal = $("#salesOrdercountry").val().split(",");
					html = '';
					var i=0;
					$.each(specificCountryObj, function(key, value){
						if(countryVal != null && countryVal != "" && countryVal.indexOf(value)>-1) {
							html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectCountries(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=country'+i+' value="'+value+'" checked><label class="form-check-label" for="country'+i+'">'+key+'</label></div></div>';
						}
						else {
							html=html+'<div class="dropdown-item py-0 px-1" onClick="selectCountries(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=country'+i+' value="'+value+'"><label class="form-check-label" for="country'+i+'">'+key+'</label></div></div>';
						}
						i++;
					});
					$("#countryMultiSelect").html(html);
					$("#countryMultiSelectParent").show().css("width", "100%");
					$('#countryNameSpin').hide(); 
				}
	}

	function filterCountries() {
		html='';
		var i=0;
		if(specificCountryOptions == "") {
			if($("#salesOrdercountry").val() != null && $("#salesOrdercountry").val() != "") {
				var countryArray = $("#salesOrdercountry").val().split(",");
				$.each(countryArray, function(i) {
					specificCountryOptions.push(countryArray[i]);
				});
			} 
		}
		
		$.each(specificCountryObj, function(key, value){
			try {
				var searchedText=$('#countrySearch').val();
				if(key.toLowerCase().indexOf(searchedText.toLowerCase())>-1){
					if(specificCountryOptions.length>0) {
						if(specificCountryOptions.indexOf(key)>-1) {
							html=html+'<div class="dropdown-item py-0 px-1" onClick="selectCountries(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=country'+i+' value="'+value+'" checked><label class="form-check-label" for="country'+i+'">'+key+'</label></div></div>';
						}
						else {
							html=html+'<div class="dropdown-item py-0 px-1" onClick="selectCountries(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=country'+i+' value="'+value+'"><label class="form-check-label" for="country'+i+'">'+key+'</label></div></div>';
						}
					}
					else {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectCountries(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=country'+i+' value="'+value+'"><label class="form-check-label" for="country'+i+'">'+key+'</label></div></div>';
					}
				}
			}
			catch(e) {
				console.log(e.message);
			}
			i++;
		});
		$("#countryMultiSelect").html(html);
	}

	function selectCountries(event) {
		var $target = $(event.currentTarget),
		val = $target.find('input[type="checkbox"]').attr('value'),
		$inp = $target.find('input[type="checkbox"]'),
		idx;
		
		if(specificCountryOptions == "") {
			if($("#salesOrdercountry").val() != null && $("#salesOrdercountry").val() != "") {
				var countryArray = $("#salesOrdercountry").val().split(",");
				$.each(countryArray, function(i) {
					specificCountryOptions.push(countryArray[i]);
				});
			} 
		}
		
		if ((idx = specificCountryOptions.indexOf(val)) > -1) {
			specificCountryOptions.splice(idx, 1);
			setTimeout(function() {$inp.prop('checked', false)}, 0);
			$inp.prop('checked', false).closest('.dropdown-item').removeClass("active");
		}
		else {
			if(specificCountryOptions.indexOf(val) == -1) {
				specificCountryOptions.push(val);
				setTimeout(function() {$inp.prop('checked', true)}, 0);
				$inp.prop('checked', true).closest('.dropdown-item').addClass("active");
			}
		}
		$("#countryMultiSelectParent").dropdown('toggle');
		$("#salesOrdercountry").val(specificCountryOptions);
		
		return false;
	}
	
	function createSpecificCountryData()
	{
		var jsonData="";
		if($("#salesOrdercountry").val() != null && $("#salesOrdercountry").val() != "") {
			var countryArray = $("#salesOrdercountry").val().split(",");
			$.each(countryArray, function(i) {
				if(countryArray[i]!='undefined')
				jsonData=jsonData+'{"name":"'+countryArray[i]+'", "count":"", "percent":"", "state":[]},';
			});
			jsonData=jsonData.substring(0, jsonData.length-1);
		} 
		jsonData='{"country":['+jsonData+']}';
		return jsonData;
		
	}
	
	function loadLookupForCountries(){
		
		$.ajax({
			url:"loadcountriesForOrder.do",
			async:false,
			success:function(data) {
				if(data != null && data != "") {
					debugger;
					specificCountryObj = JSON.parse(data);
					var countryHTML='<option value="">--select from list--</option>';
					$.each(specificCountryObj, function(key, value){
						countryHTML=countryHTML+'<option value="'+value+'">'+ key+ '</option>';
					});
				}
			}
		});
	}
	
	function loadSalesOrderCurrency(){
		var finalURL = "loadCurrency.do";
		$.ajax({
			url : finalURL,
			async:false,
			success : function(result) {
				var data = JSON.parse(result);
				var currency = '';
				for(var key in data) {
					if(key == "USD") {
						currency = currency + '<option value="'+data[key]+'" selected>'+data[key]+'</option>';
					}
					else {
						currency = currency + '<option value="'+data[key]+'">'+data[key]+'</option>';
					}
				}
					$("#salesordercurrency").html(currency);
			}
		});
	}
	
	
	function displayJobTitle (){
		$('#jobTitleSpin').show();
		$.ajax({
			url		:	"loadJobTitle.do",
			success	:	function(data) {
			if(data != null && data != "") {
				jobTitleObj = JSON.parse(data);
				var jobTitleVal = $("#targetTitle").val().split(",");
				html = '';
				var i=0;
				$.each(jobTitleObj, function(key, value){
					if(jobTitleVal != null && jobTitleVal != "" && jobTitleVal.indexOf(value)>-1) {
						html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectJobTitle(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=jobTitle'+i+' value="'+value+'" checked><label class="form-check-label" for="jobTitle'+i+'">'+key+'</label></div></div>';
					}
					else {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectJobTitle(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=jobTitle'+i+' value="'+value+'"><label class="form-check-label" for="jobTitle'+i+'">'+key+'</label></div></div>';
					}
					i++;
				});
				$("#jobTitleMultiSelect").html(html);
				$("#jobTitleMultiSelectParent").show().css("width", "100%");
				$('#jobTitleSpin').hide(); 
				}
			}
		});
	}

	function filterJobTitle() {
		html='';
		var i=0;
		if(jobTitleOptions == "") {
			if($("#jobTitle").val() != null && $("#jobTitle").val() != "") {
				var jobTitleArray = $("#jobTitle").val().split(",");
				$.each(jobTitleArray, function(i) {
					jobTitleOptions.push(jobTitleArray[i]);
				});
			} 
		}
		
		$.each(jobTitleObj, function(key, value){
			try {
				var searchedText=$('#jobTitleSearch').val();
				if(value.toLowerCase().indexOf(searchedText.toLowerCase())>-1){
					if(jobTitleOptions.length>0) {
						if(jobTitleOptions.indexOf(key)>-1) {
							html=html+'<div class="dropdown-item py-0 px-1" onClick="selectJobTitle(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=jobTitle'+i+' value="'+value+'" checked><label class="form-check-label" for="jobTitle'+i+'">'+key+'</label></div></div>';
						}
						else {
							html=html+'<div class="dropdown-item py-0 px-1" onClick="selectJobTitle(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=jobTitle'+i+' value="'+value+'"><label class="form-check-label" for="jobTitle'+i+'">'+key+'</label></div></div>';
						}
					}
					else {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectJobTitle(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=jobTitle'+i+' value="'+value+'"><label class="form-check-label" for="jobTitle'+i+'">'+key+'</label></div></div>';
					}
				}
			}
			catch(e) {
				console.log(e.message);
			}
			i++;
		});
		$("#jobTitleMultiSelect").html(html);
	}

	function selectJobTitle(event) {
		var $target = $(event.currentTarget),
		val = $target.find('input[type="checkbox"]').attr('value'),
		$inp = $target.find('input[type="checkbox"]'),
		idx;
		
		if(jobTitleOptions == "") {
			if($("#targetTitle").val() != null && $("#targetTitle").val() != "") {
				var jobTitleArray = $("#targetTitle").val().split(",");
				$.each(jobTitleArray, function(i) {
					jobTitleOptions.push(jobTitleArray[i]);
				});
			} 
		}
		
		if ((idx = jobTitleOptions.indexOf(val)) > -1) {
			jobTitleOptions.splice(idx, 1);
			setTimeout(function() {$inp.prop('checked', false)}, 0);
			$inp.prop('checked', false).closest('.dropdown-item').removeClass("active");
		}
		else {
			if(jobTitleOptions.indexOf(val) == -1) {
				jobTitleOptions.push(val);
				setTimeout(function() {$inp.prop('checked', true)}, 0);
				$inp.prop('checked', true).closest('.dropdown-item').addClass("active");
			}
		}
		$("#jobTitleMultiSelectParent").dropdown('toggle');
		$("#targetTitle").val(jobTitleOptions);
		return false;
	}

	function displayIndustry (){
		$('#industrySpin').show();
				data = industryList;
				if(data != "") {
					industryObj = JSON.parse(data);
					var industryVal = $("#salesorderindustry").val().split(",");
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
			if($("#salesorderindustry").val() != null && $("#salesorderindustry").val() != "") {
				var industryArray = $("#salesorderindustry").val().split(",");
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
		var $target = $(event.currentTarget),
		val = $target.find('input[type="checkbox"]').attr('value'),
		$inp = $target.find('input[type="checkbox"]'),
		idx;
		
		if(industryOptions == "") {
			if($("#salesorderindustry").val() != null && $("#salesorderindustry").val() != "") {
				var industryArray = $("#salesorderindustry").val().split(",");
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
		$("#salesorderindustry").val(industryOptions);
		return false;
	}
	
	function loadEmployee() {
				var data = employeeList;
				if(data != null && data != "") {
					var lookupData=jQuery.parseJSON(data);
					var resultMin ='<option value="">------select from list------</option>';
					var resultMax='<option value="">------select from list------</option>';
				
					$.each(lookupData, function(key, value){
						if(key.indexOf("+")== -1 && key != 1){
							resultMin=resultMin+'<option value="'+key+'">'+value + '</option>';
							resultMax=resultMax+'<option value="'+key+'">'+ value + '</option>';
						}else{
							resultMin=resultMin+'<option value="'+key+'">'+ value+ '</option>';
						}
					});
				
				
				$("#salesorderempSize").html(resultMin);
				$("#salesorderempSizeMax").html(resultMax);
				
			}
	}	
	
	function loadRevenue() {
				var data = revenueList;
				if(data != null && data != "") {
					var lookupData=jQuery.parseJSON(data);
					var resultMin ='<option value="">------select from list------</option>';
					var resultMax='<option value="">------select from list------</option>';
				
					$.each(lookupData, function(key, value){
						if(key.indexOf("+")== -1 && key != 1){
							resultMin=resultMin+'<option value="'+key+'">'+value + '</option>';
							resultMax=resultMax+'<option value="'+key+'">'+ value + '</option>';
						}else{
							resultMin=resultMin+'<option value="'+key+'">'+ value+ '</option>';
						}
					});
				
					$("#salesorderrevenue").html(resultMin);
					$("#salesorderrevenueMax").html(resultMax);
				
				}
	}	
	
	function displayYesFromOppr(){
		$('#salesOrderYesFromOpprSpin').show();
		$.ajax({
			url		:	"loadDistinctOpportunity.do",
			success	:	function(data) {
				yesFromOpprObj=JSON.parse(data);
				debugger;
				var yesFromOpprVal = $("#salesOrderYesFromOppr").val().split("||");
				html = '';
				for(i=0;i<yesFromOpprObj.length;i++) {
					if(yesFromOpprVal != null && yesFromOpprVal != "" && yesFromOpprVal.indexOf(yesFromOpprObj[i].opportunity_name)>-1 && yesFromOpprObj[i].sales_opportunity_id_text!=$("#opportunityID").val()) {
						html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectYesFromOppr(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=yesFromOppr'+i+' value="'+yesFromOpprObj[i].sales_opportunity_id_text+'" checked><label class="form-check-label" for="order'+i+'">'+yesFromOpprObj[i].opportunity_name+'</label></div></div>';
					}
					else if(yesFromOpprObj[i].sales_opportunity_id_text!=$("#opportunityID").val()){
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectYesFromOppr(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=yesFromOppr'+i+' value="'+yesFromOpprObj[i].sales_opportunity_id_text+'"><label class="form-check-label" for="order'+i+'">'+yesFromOpprObj[i].opportunity_name+'</label></div></div>';
					}
				}
				$("#salesOrderYesFromOpprMultiSelect").html(html);
				$("#salesOrderYesFromOpprMultiSelectParent").show().css("width", "100%");
				$('#salesOrderYesFromOpprSpin').hide();
			}
		});
	}

	function filterYesFromOppr() {
		html='';
		if(yesFromOpprOptions == "" && opprIdOptions == "" && prefillYesFromOpprId == true) {
			if($("#salesOrderYesFromOpportunityName").val() != null && $("#salesOrderYesFromOpportunityName").val() != "") {
				var data = JSON.parse($("#salesOrderYesFromOpportunityName").val());
				$.each(data, function(key, value){
					for(id in value) {
						yesFromOpprOptions.push(value[id]);
					}
				});
			} 
		}
		
		for(i=0;i<yesFromOpprObj.length;i++) {
			try {
				var text=yesFromOpprObj[i].opportunity_name;
				var code=yesFromOpprObj[i].sales_opportunity_id_text;
				var searchedText=$('#salesOrderYesFromOpprSearch').val();
				if(text.toLowerCase().indexOf(searchedText.toLowerCase())>-1){
					if(yesFromOpprOptions.length>0) {
						if(yesFromOpprOptions.indexOf(text)>-1) {
							html=html+'<div class="dropdown-item py-0 px-1" onClick="selectYesFromOppr(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=yesFromOppr'+i+' value="'+yesFromOpprObj[i].sales_opportunity_id_text+'" checked><label class="form-check-label" for="yesFromOppr'+i+'">'+yesFromOpprObj[i].opportunity_name+'</label></div></div>';
						}
						else {
							html=html+'<div class="dropdown-item py-0 px-1" onClick="selectYesFromOppr(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=yesFromOppr'+i+' value="'+yesFromOpprObj[i].sales_opportunity_id_text+'"><label class="form-check-label" for="yesFromOppr'+i+'">'+yesFromOpprObj[i].opportunity_name+'</label></div></div>';
						}
					}
					else {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectYesFromOppr(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=yesFromOppr'+i+' value="'+yesFromOpprObj[i].sales_opportunity_id_text+'"><label class="form-check-label" for="yesFromOppr'+i+'">'+yesFromOpprObj[i].opportunity_name+'</label></div></div>';
					}
				}
			}
			catch(e) {
				console.log(e.message);
			}
		}
		$("#salesOrderYesFromOpprMultiSelect").html(html);
		filterSearchYesFromOpprId = true;
	}


	function selectYesFromOppr(event) {
		debugger;
		var oppIdOppNameJsonObject = {};
		var $target = $(event.currentTarget),
		val = $target.find('input[type="checkbox"]').next().text(),
		opprIdVal = $target.find('input[type="checkbox"]').attr('value'),
		$inp = $target.find('input[type="checkbox"]'),
		idx;
		
		if(opprIdOptions == "" && yesFromOpprOptions == "" && prefillYesFromOpprId == true) {
			if($("#salesOrderYesFromOpportunityName").val() != null && $("#salesOrderYesFromOpportunityName").val() != "") {
				var data = JSON.parse($("#salesOrderYesFromOpportunityName").val());
				$.each(data, function(key, value){
					for(id in value) {
						opprIdOptions.push(id);
						yesFromOpprOptions.push(value[id]);
						if(opprIdVal == id) {
							
						}
						else {
							oppIdOppNameJsonObject[id] = value[id];
						}
					}
				});
				prefillYesFromOpprId = false;
			} 
		}
		else {
			if(filterSearchYesFromOpprId == true && prefillYesFromOpprId == true) {
				if($("#salesOrderYesFromOpportunityName").val() != null && $("#salesOrderYesFromOpportunityName").val() != "") {
					var data = JSON.parse($("#salesOrderYesFromOpportunityName").val());
					$.each(data, function(key, value){
						for(id in value) {
							if(opprIdVal == id) {
								
							}
							else {
								oppIdOppNameJsonObject[id] = value[id];
							}
						}
					});
					prefillYesFromOpprId = false;
				} 
			}
		}
		
		if ((idx = yesFromOpprOptions.indexOf(val)) > -1) {
			yesFromOpprOptions.splice(idx, 1);
			opprIdOptions.splice(idx, 1);
			opprIdOpprNameJsonArray.splice(idx,1);
			setTimeout(function() {$inp.prop('checked', false)}, 0);
			$inp.prop('checked', false).closest('.dropdown-item').removeClass("active");
			
		}
		else {
			if(yesFromOpprOptions.indexOf(val) == -1) {
				yesFromOpprOptions.push(val);
				opprIdOptions.push(opprIdVal);
			}
			oppIdOppNameJsonObject[opprIdVal] = val;
			setTimeout(function() {$inp.prop('checked', true)}, 0);
			$inp.prop('checked', true).closest('.dropdown-item').addClass("active");
		}
		$("#salesOrderYesFromOpprMultiSelectParent").dropdown('toggle');
		$("#salesOrderYesFromOppr").val(yesFromOpprOptions);
		$("#salesOrderYesFromOppr").prop("title",yesFromOpprOptions);
		//alert("opprIdOptions:: "+yesFromOpprOptions);
		
		if(Object.keys(oppIdOppNameJsonObject).length > 0) {
			if(Object.keys(oppIdOppNameJsonObject).length == 1) {
				opprIdOpprNameJsonArray.push(oppIdOppNameJsonObject);
			}
			else {
				$.each(oppIdOppNameJsonObject, function(key, value) {
					var oppJsonObject = {};
					oppJsonObject[key] = value;
					opprIdOpprNameJsonArray.push(oppJsonObject);
				});
			}
			//$("#yesFromOppr").val(JSON.stringify(opprIdOpprNameJsonArray));
		}
		return false;
	}

	function prefillYesFromOppr(){
		var yesFromOppJsonObject = {};
		if(opprIdOpprNameJsonArray.length == 0 && ($("#salesOrderYesFromOppr").val() != null || $("#salesOrderYesFromOppr").val() != "")){
			if(opprIdOptions == "" && yesFromOpprOptions == "" && prefillYesFromOpprId == true) {
				if($("#salesOrderYesFromOpportunityName").val() != null && $("#salesOrderYesFromOpportunityName").val() != "") {
					var data = JSON.parse($("#salesOrderYesFromOpportunityName").val());
					$.each(data, function(key, value){
						for(id in value) {
							opprIdOptions.push(id);
							yesFromOpprOptions.push(value[id]);
							yesFromOppJsonObject[id] = value[id];
						}
					});
					prefillYesFromOpprId = false;
				} 
			}
			if(Object.keys(yesFromOppJsonObject).length > 0) {
				opprIdOpprNameJsonArray.push(yesFromOppJsonObject);
			}
		}
		
		if(opprIdOpprNameJsonArray.length > 0 && $("input[name='yesOpportunity']").is(":checked")) {
			$("#salesOrderYesFromOpportunityId").val(JSON.stringify(opprIdOpprNameJsonArray));
		}
		else if(($("#salesOrderYesFromOppr").val() == null || $("#salesOrderYesFromOppr").val() == "")){
			$("#salesOrderYesFromOpportunityId").val("");
		}
	}
	

	function fileHeaderValidateSuppression() {
		
		var finalURL ="fileHeaderValidate.do";
		var formData=new FormData();
		for(var i=0; i<fileCount; i++) {
			var temp = "salesorderpcsuppressionfile_"+i;
			 var pcsuppressionFile=$("#salesorderpcsuppressionfile_"+i)[0].files[0];
			 formData.append("pcsuppressionFile"+i, pcsuppressionFile);
			
		}
		
		$.ajax({
			url:finalURL,
			data:formData,
			contentType:false,
			cache:false,
			processData:false,
			type:"POST",	
			success: function(data, textStatus, xhr)
			{
				data = JSON.parse(data);
				if(data.message!="" && data.message!=null ) {
					$("#alertMsgFile").removeClass("text-success").addClass("text-danger").html(data.message).show();
					setTimeout(function(){$('#alertMsgFile').hide();},5000);
				}else{
					setTimeout(function(){
						$("#suppressionFileUploadModal").modal('hide');
					},1000);
				}
			},
			error		:	function(xhr, textStatus, errorThrow) {
				$("#suppressionFileUploadModal").modal('show');
		}
		});
	}	
	
	
	function fileHeaderValidateNAL() {
		
		var finalURL="fileHeaderValidate.do";
		
		var formData=new FormData();
		for(var i=0; i<nalFileCount; i++) {
			 var pcsuppressionFile=$("#salesordersuppressionList_"+i)[0].files[0];
			 formData.append("salesordersuppressionList_"+i, pcsuppressionFile);
			
		}
		
		$.ajax({
			url:finalURL,
			data:formData,
			contentType:false,
			cache:false,
			processData:false,
			type:"POST",	
			success: function(data, textStatus, xhr)
			{
				data = JSON.parse(data);
				if(data.message!="" && data.message!=null ) {
					$("#nalAlertMsg").removeClass("text-success").addClass("text-danger").html(data.message).show();
					setTimeout(function(){$('#nalAlertMsg').hide();},5000);
				}else{
					setTimeout(function(){
						$("#nalFileUploadModal").modal('hide');
					},1000);
				}
			},
			error		:	function(xhr, textStatus, errorThrow) {
				$("#nalFileUploadModal").modal('show');
		}
		});
	}	
	
	
	function displayProductTypeRadio(){
		$('#listProductType').html("");
		
		$.ajax({
			url		:	"loadProductTypes.do",
			async: false,
			success	:	function(data) {
				if(data != "") {
					productTypeObj = JSON.parse(data);
					$.each(productTypeObj, function(key, value){
						if(value == "Brand Uplift"){
						$('#listProductType')
						.append(`<div class="custom-control custom-radio custom-control-inline"><input type="radio" onclick="updateCampaignName()" id="${value}_Chk" name="serviceType" value="${value}" class="custom-control-input" checked><label for="${value}_Chk" class="custom-control-label col-form-label-sm pt-0">${value}</label></div>`)
						}else{
							$('#listProductType')
							.append(`<div class="custom-control custom-radio custom-control-inline"><input type="radio"  onclick="updateCampaignName()" id="${value}_Chk" name="serviceType" value="${value}" class="custom-control-input" ><label for="${value}_Chk" class="custom-control-label col-form-label-sm pt-0">${value}</label></div>`)
							
						}
						
					});
				}
			}
		});
	}
	
	function updateCampaignName(){
		var productType = $("input[name='serviceType']:checked").val();
		var campaignNameOld = $("#salesordercampaignName").val();
		
		var newstring =''
			if(oldProductType =='CPL' ||oldProductType =='CQL'){
				if(campaignNameOld.includes('CPL')){
					newstring = campaignNameOld.replace('CPL', productType); 
				}else if(campaignNameOld.includes('CQL')){
					newstring = campaignNameOld.replace('CQL', productType); 
				}else{
					newstring = campaignNameOld;
				}
			}else if(campaignNameOld.includes(oldProductType)){
				newstring = campaignNameOld.replace(oldProductType, productType); 
			}else{
				newstring = campaignNameOld;
			}
		$("#salesordercampaignName").val(newstring);
		console.log($("#salesordercampaignName").val());
		oldProductType = productType;
	}

	