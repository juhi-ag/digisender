var role="${role}";
var userName = "${user}";
var user = "${user}";
var buttonID="";
var lookupData;
var recEmailTemplateArr = new Array();
var recEmailTemplate = '';
var marketoInstanceArr = new Array();
var marketoInstance='';
var recProgramOrderArr = new Array();
var recProgramOrder = '';
var selectedRecordData = '';
var deliveryEmail='';
var countryvalues='';
var csfColumnCount=0;
var staticFieldCount = 1;
var csfDcFieldsList='';
var csfLookupTypeList= '';
var csfLookupSelectList = '';
var lookUpFields ='';
var recordPerDomain = '';
var alreadySave = false;
var csfDcFieldsListWithNoPreferenece='';
var stateHTMLForCache='';
var lastOpenedState;
var cqIndex=1;
var editIndex='';
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
var customQueCount = 1;
var rowId = [];
var specificCountryObj='';
var specificCountryOptions = [];
var jobTitleObj;
var jobTitleOptions = [];
var industryObj;
var industryOptions = [];
var totalNoOfLeadDel='';
var programId = '';
var yesFromOpprOptions = [];
var opprIdOptions = [];
var yesFromOpprObj;
var opprIdOpprNameJsonArray = [];
var prefillYesFromOpprId = false;
var filterSearchYesFromOpprId = false;
var filterSearchFormattingOrderId = false;
var createdByObj;
var createdByOptions = [];
var selectCreatedByChecked = false;
var rowIdFile = [];
var fileCount = 1;
var rowIdNALFile = [];
var nalFileCount = 1;
var oldProductType ='';
var recOrderViewArr = [];

var productTypeObj;
var productTypeOptions = [];
var selectProductTypeChecked = false;
var progCount=0;
var programNameList = [];
var programNames = '';
var rowIdAssetFile = [];
var assetFileCount = 0;
var prevAssetCount = 0;

$(document).keypress(function(event){
	var keycode = event.keyCode;
    if(keycode == '13'){
    	return false;
    }
});

function setID(index) {
	debugger;
	var orderId = recOrderViewArr[index].workorder.workorder_id_text;

	$("#createUpdateOrderForm").trigger('reset');
	$('#loadBg').show();
	
	loadCurrency();
	loadEmployee();
	loadRevenue();
	displayProductTypeRadio();
	document.getElementById('customQuestionButton').disabled = true;
	document.getElementById('emailTemplateButton').disabled = true;
	document.getElementById('archiveOrder').disabled = true;
	
	$.ajax({
			url		:	'loadSelectedOrderDetails.do?orderId='+orderId,
			success	:	function(data, textStatus, xhr) {
								$('#loadBg').hide();
								$("#neworderpopModal").modal("show");
								$("#cpBlk").slideUp();
								$('#cp_link span').removeClass("fa-minus").addClass("fa-plus");
								$('#neworderpopModalLabel').find('.modal-body').removeClass('vScroll');
								$("#orderiddisplay").text("");
								data = JSON.parse(data);
								selectedRecordData = data[0];
								$("#opportunityID").val(recOrderViewArr[index].salesOpportunity.sales_opportunity_id_text);
								$("#orderiddisplay").html(recOrderViewArr[index].salesOpportunity.opportunity_name + "(" + recOrderViewArr[index].salesOpportunity.sales_opportunity_id_text + ")");
								
								var serviceTypeVal = JSON.parse(selectedRecordData.workorder).product_type;
								serviceTypeVal = serviceTypeVal.trim();
								serviceTypeVal = serviceTypeVal.replace(/\//g, "/");
								if(serviceTypeVal == 'CPL' || serviceTypeVal == 'CQL'){
									$('input:radio[value=CQL]').prop('checked',true);
								}else{
									$('input:radio[value="'+serviceTypeVal+'"]').prop('checked',true);	
								}
								oldProductType = JSON.parse(selectedRecordData.workorder).product_type;
								loadCsfDcFieldsColumns();
								loadColumnMappingData();
								loadCsfLookupData();
								loadCapmaignManagerLookup();
								loadLookupForCountries();
								prefilOrderForm(selectedRecordData);
								//loadLookups(selectedRecordData);
								loadProgramOrderData(orderId);
								//loadProductTypes();
								//loadCreatedBy();
								document.getElementById('customQuestionButton').disabled = true;
								document.getElementById('emailTemplateButton').disabled = true;
								$("#cloneButtonID").attr("onclick","cloneCampaignmodal('"+orderId+"','"+document.getElementById('campaignName').value+"')");
								formatpageOnLoad();
						}
	});
	disableFields();
}


function loadCapmaignManagerLookup(){
	debugger;

if(campaignManagerNames != null) {
	var data = JSON.parse(campaignManagerNames);
	var result = 'select from list';
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

function cloneCampaignmodal(orderId,Campaign_Name){
	debugger;
	$('#cloneCampaignModal').modal();
	$("#cloneCampaignName").val('Clone_'+Campaign_Name);
	$("#cloneSuppressionNAL"). prop("checked", false);
	$("#cloneCampaign").attr("onclick","cloneWorkOrder('"+orderId+"')");
}

function cloneWorkOrder(orderId){
	debugger;
var suppressionNALFlag=$("input[name='cloneSuppressionNAL']").is(":checked")?'Y':'N';
var statusUpadteWithExisting = 'N';
	$.ajax({
			url			:	'amusCloneOrder?user='+userName+"&order_id="+orderId+"&campaign_name="+encodeURIComponent(document.getElementById('cloneCampaignName').value)+"&suppressionNALFlag="+suppressionNALFlag+"&statusUpadteWithExisting="+statusUpadteWithExisting, 
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
									$('#msgClone').html("Campaign Cloned Successfully").show();
									setTimeout(function() {
											$('#cloneCampaignModal').modal('hide');
											//document.getElementById('neworderpop').style.display = "none";
											$("#neworderpopModal").modal("hide");
											$('#msgClone').hide();
											fetchTotalOrderCountForFilter();
											loadData();
									}, 3000);
						}
							},
			error		:	function(xhr, textStatus, errorThrow){
									$('#errorClone').html("Exception in Cloning Campaign").show();
									setTimeout(function() {
											$('#errorClone').hide();
									}, validationMessageTimeout);
									return false;
							}
	});
}

//Used to disable editing in form based on role
function disableFields() {
	debugger;
if(role=='dmin'){
	$("#direct").prop('disabled', true);
	$("#partner").prop('disabled', true);
	$("#clientBase").prop('disabled', true);
	$("#totalLead").prop('disabled', true);
	$("#currency").prop('disabled', true);
	$("#rate").prop('disabled', true);
	$("#totalValue").prop('disabled', true);
	$("#targetTitle").prop('disabled', true);
	$("#empSize").prop('disabled', true);
	$("#empSizeMax").prop('disabled', true);
	$("#revenue").prop('disabled', true);
	$("#revenueMax").prop('disabled', true);
	$("#industry").prop('disabled', true);
	$("#yesClient").prop('disabled', true);
	$("#yesPd").prop('disabled', true);
	$("#slNo").prop('disabled', true);
	$("#duration").prop('disabled', true);
	$("#weekly").prop('disabled', true);
	$("#semi-monthly").prop('disabled', true);
	$("#monthly").prop('disabled', true);
	$("#IDC").prop('disabled', true);
	$("#EM").prop('disabled', true);
	$("#Hybrid").prop('disabled', true);
	$("#idcAllocation").prop('disabled', true);
	$("#sow").prop('disabled', true);
	$("#suppressionList").prop('disabled', true);
	$("#asset").prop('disabled', true);
	$("#questions").prop('disabled', true);
	//$("#leadCommit").prop('disabled', true);
	
}
else if(role=='dain'){		
	$("#direct").prop('disabled', true);
	$("#partner").prop('disabled', true);
	$("#clientBase").prop('disabled', true);
	$("#totalLead").prop('disabled', true);
	$("#currency").prop('disabled', true);
	$("#rate").prop('disabled', true);
	$("#totalValue").prop('disabled', true);
	$("#targetTitle").prop('disabled', true);
	$("#empSize").prop('disabled', true);
	$("#empSizeMax").prop('disabled', true);
	$("#revenue").prop('disabled', true);
	$("#revenueMax").prop('disabled', true);
	$("#industry").prop('disabled', true);
	$("#note").prop('disabled', true);
	$("#yesClient").prop('disabled', true);
	$("#yesPd").prop('disabled', true);
	$("#slNo").prop('disabled', true);
	$("#duration").prop('disabled', true);
	$("#weekly").prop('disabled', true);
	$("#semi-monthly").prop('disabled', true);
	$("#monthly").prop('disabled', true);
	$("#IDC").prop('disabled', true);
	$("#EM").prop('disabled', true);
	$("#Hybrid").prop('disabled', true);
	$("#idcAllocation").prop('disabled', true);
	$("#sow").prop('disabled', true);
	$("#suppressionList").prop('disabled', true);
	$("#asset").prop('disabled', true);
	$("#questions").prop('disabled', true);
	//$("#leadCommit").prop('disabled', true);
	$("#countryDiv input").prop('disabled', true);
}
else{
		$("#currency").prop('disabled', true);
		$("#totalValue").prop('disabled', true);
}	
}

function closeNewOrderWin() {
	debugger;
if($("#deliverymethodtable").data('vendorDeliveryOrder'))
$("#deliverymethodtable").vendorDeliveryOrder('destroy');
$("#neworderpopModal").modal("hide");
$("#pbg, #pbg-error").modal("hide");
$("#loadOrderRecordsLoader").hide();
$("#createUpdateOrderForm, #programOrderForm").trigger('reset');
$("#customQuestions .card-body, #deliveryEmails").html("");
$('input[name=deliveryMethod]').attr('checked',false);
$("#partnerRateDiv").hide();
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
rowIdFile = [];
fileCount = 1;
rowIdNALFile = [];
nalFileCount = 1;
}

function openChildPopUp() {
document.getElementById('seeFile').style.display = "block";
}

function closeChildPopUp() {
document.getElementById('seeFile').style.display = "none";
}


function openSuppressionPopUp() {
$('#seeFileSuppression').modal("show");
loadPopup();
}

function openLoadCampaignLimitModal() {
	$('#loadCampaignLimitModal').modal("show");
}

function loadDataForNewLimit() {
	$('#loadBg').show();
	$("body").addClass("p-0");
	setTimeout(function() {
		fetchTotalOrderCountForFilter();	
		loadData();
	}, 1000);
	$('#loadCampaignLimitModal').modal("hide");
}


function loadPopup(){
	debugger;
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
		}
	}
});

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
		}
	}
});
}


function uploadWhitepapers(obj, index) {
var orderId = recOrderViewArr[index].workorder.workorder_id_text;
modal="<div class='modal fade' id='whitepaper' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>"+"<div class='modal-dialog modal-lg modal-dialog-centered' role='document'><div class='modal-content'></div></div>"
$("#modalContainer").html(modal);
	$.ajax({
			url  		:	'amus.uploadWhitepaper?OrderID='+orderId,
			type 		:	'GET',
			contentType	:	false,
			processData	:	false,
			crossDomain	:	true,
			success		:	function(data, textStatus, xhr) {
				$('#modalContainer').find('.modal-content').html(data);		
					},
			error		:	function(xhr, textStatus, errorThrow) {
									return false;
			}
	}); 
}

function loadProductTypes() {
	var finalURL = "loadProductTypesProcessOrder.do";
	$.ajax({
		url : finalURL,
		async:false,
		success : function(result) {
			var resultValue = result.toString();
			$("#producttype").html(result);
		}
	});
}	

function loadData() {
	debugger;
	loadLookupForCountries();
	//loadCountriesLookup();
	var loginuser = userName;
	var selectedCreatedBy = $("#selectedCreatedBy").val();
	var selectedRegion = $("#selectedRegion").val();
	var selectedProductType = $("#producttype").val();
	var orderStatus = $("#statusType").val();
	//var orderStatus = "";
	//var status = "RUNNING";
	var dateRange = $("#reportrange span").text()

	var dateRangeVal = $('#dateFrom').val();
	var fromDate = '';
	var toDate = '';
	if(dateRangeVal != null && dateRangeVal != "") {
		fromDate = new Date(dateRangeVal.substring(0, dateRangeVal.indexOf("-")).trim());
		toDate = new Date(dateRangeVal.substring(dateRangeVal.indexOf("-")+1, dateRangeVal.length).trim());
	
		fromDate = fromDate.getMonth()+1+"/"+fromDate.getDate()+"/"+fromDate.getFullYear();
		toDate = toDate.getMonth()+1+"/"+toDate.getDate()+"/"+toDate.getFullYear();
	}
	var fetchSize = $("#setLimit").val();
	$('#usertable').dataTable().fnClearTable();

	var arr = {fromDate:fromDate,toDate:toDate,createdBy:selectedCreatedBy,region:selectedRegion,productType:selectedProductType,
			orderStatus:orderStatus,dateRange:dateRange,role:role,sequence:sequenceForQuery,fetchSize:fetchSize};
	var loadUrl=role+".loadorder?role="+role;
	$.ajax({
		url:loadUrl,
		data:arr,
		success:function(jsonData) {
			if(jsonData != null && jsonData != "" && jsonData != "[]") {
				debugger;
				jsonData = JSON.parse(jsonData);
				recOrderViewArr = jsonData;
				showSalesOrderViewRecord(jsonData,role);
				$('#loadBg').hide();
				$("body").removeClass("p-0");
				document.getElementById('loadNext').disabled = false;
			}else{
				$('#loadBg').hide();
				$("body").removeClass("p-0");
				document.getElementById('loadNext').disabled = true;
			}
			if(sequence == "0") {
				document.getElementById('loadPrev').disabled = true;
			}else{
				document.getElementById('loadPrev').disabled = false;
			}
			
		}
	})
}
function showSalesOrderViewRecord(jsonData ,role) {
	
if(role=='amus'||role=='salesadminamus'||role=='salesamus'||role=='insidesalesamus'||role=='amusmarketing') {
	var table=$('#usertable').DataTable({
		processing : true,
		scrollX:true,
		destroy: true,
	    searching: true,
		data: jsonData,
		"columns" : [
		    { data : "startRecord",title: "Start",defaultContent:""},
		    { data: "stopRecord", title: "Stop", defaultContent:""},
		    { data: "completeButton", title: "Complete", defaultContent:""},
			{ data : "workorder.campaign_name",title: "Order Name",defaultContent:""},
			{ data : "workorder.companyname",title: "Account Name",defaultContent:""},
			{ data : "workorder.campaign_value",title: "Amount",defaultContent:""},
			{ data : "workorder.product_type",title: "Product Type",defaultContent:""},
			{ data: "viewOrUpdateButton", title: "Order", defaultContent: ""},
			{
				title: "Data",
				data : "workorder.workorder_id_text",
				"render": function(data, type, row, meta){
					if(row.workorder.product_type.startsWith("CQL") || row.workorder.product_type == "CPL"|| row.workorder.product_type == "Visionayr"|| row.workorder.product_type == "SRL"|| row.workorder.product_type == "NRL") {
					var isFlowToCW='"'+row.workorder.isflowtocw+'"';
					var serviceType='"'+row.workorder.product_type+'"';
					var opportunityID='"'+row.workorder.sf_opportunityid+'"';
					return "<div><button type='button' id='"+meta.row+"' data-toggle='modal' data-target='#cplUploadData' onClick='uploadDataList("+meta.row+","+row.workorder.custom_question.length+","+opportunityID+","+serviceType+")' class='btn btn-outline-secondary btn-sm'><span class='fa fa-th-list' aria-hidden='true'></span> Upload</button>";
					} else return "<div><button id='"+meta.row+"' data-toggle='modal' class='btn btn-outline-success btn-sm' disabled><span class='fa fa-th-list' aria-hidden='true'></span> Upload</a></div>";
				}
			},
			//{ data: "uploadCallingList", title: "Data", defaultContent: ""},
			{ data: "uploadWhitePaper", title: "Asset", defaultContent:""},
			{ data: "clientReferenceNumber", title: "Client Ref No.", defaultContent:""},
			{ data: "internalReferenceNumber",title: "Internal Ref No.", defaultContent:""},
			{
				title: "Work Log",
				data : "workorder.workorder_id_text",
				"render": function(data, type, row, meta){
					return "<a href='#' id='workLogLink' data-toggle='modal' data-target='#workLogModal' onclick=openCommentBlock('"+meta.row+"') class='btn btn-warning btn-sm'><!--span class='badge-notify-sm' id='worklogcount_"+data+"'>0</span-->Logs</a>";
				}
			},
			{ data: "statusButton", title: "Status", defaultContent:""},
			{ data: "deleteUnprocessedLeads", title: "Delete", defaultContent:""},
			{ data: "arciveOrder", title: "Archive", defaultContent:""},
			
			{
				title: "Assign",
				data : "workorder.workorder_id_text",
				"render": function(data, type, row, meta){
					if(row.workorder.product_type.startsWith("CQL") || row.workorder.product_type == "CPL"|| row.workorder.product_type == "Visionayr"|| row.workorder.product_type == "SRL"|| row.workorder.product_type == "NRL") {
						var serviceType='"'+row.workorder.product_type+'"';
					return "<div><button type='button' onClick='loadCallingAgent("+meta.row+","+serviceType+")' class='btn btn-outline-primary btn-sm' title='Assignee' data-toggle='modal' data-target='#workOrderModal'><i class='fa fa-users fa-lg'></i></button></div>";
					} else return "<div><button type='button'  class='btn btn-outline-primary btn-sm' title='Assignee' data-toggle='modal' data-target='#workOrderModal' disabled ><i class='fa fa-users fa-lg'></i></button></div>";
				}
			},
			
			/*{ data: "callingAgentButton", title: "Assign", defaultContent:""},*/
			{ data: "holdButton", title: "Hold/Resume", defaultContent:""},
			{ data: "reworkButton", title: "Rework", defaultContent:""},
		],
	});
}else if(role=='dmin') {
	var table=$('#usertable').DataTable({
		processing : true,
		scrollX:true,
		destroy: true,
	    searching: true,
		data: jsonData,
		"columns" : [
		    { data : "startRecord",title: "Start",defaultContent:""},
		    { data: "stopRecord", title: "Stop", defaultContent:""},
		    { data: "completeButton", title: "Stop", defaultContent:""},
			{ data : "workorder.campaign_name",title: "Order Name",defaultContent:""},
			{ data : "workorder.companyname",title: "Account Name",defaultContent:""},
			{ data : "workorder.campaign_value",title: "Amount",defaultContent:""},
			{ data : "workorder.product_type",title: "Product Type",defaultContent:""},
			{
				title: "Work Log",
				data : "workorder.workorder_id_text",
				"render": function(data, type, row, meta){
					return "<a href='#' id='workLogLink' data-toggle='modal' data-target='#workLogModal' onclick=openCommentBlock('"+meta.row+"') class='btn btn-warning btn-sm'><!--span class='badge-notify-sm' id='worklogcount_"+data+"'>0</span-->Logs</a>";
				}
			},
			{ data: "statusButton", title: "Status", defaultContent:""},
			{ data: "callingAgentButton", title: "Assign", defaultContent:""},
			{ data: "reworkButton", title: "Rework", defaultContent:""},
		],
	});
}else{
	var table=$('#usertable').DataTable({
		processing : true,
		scrollX:true,
		destroy: true,
	    searching: true,
		data: jsonData,
		"columns" : [
		    { data: "completeButton", title: "Stop", defaultContent:""},
			{ data : "workorder.campaign_name",title: "Order Name",defaultContent:""},
			{ data : "workorder.companyname",title: "Account Name",defaultContent:""},
			{ data : "workorder.campaign_value",title: "Amount",defaultContent:""},
			{ data : "workorder.product_type",title: "Product Type",defaultContent:""},
			{ data: "viewOrUpdateButton", title: "Order", defaultContent: ""},
			{ data: "uploadCallingList", title: "Data", defaultContent: ""},
			{ data: "uploadWhitePaper", title: "Asset", defaultContent:""},
			{ data: "clientReferenceNumber", title: "Client Ref No.", defaultContent:""},
			{ data: "internalReferenceNumber",title: "Internal Ref No.", defaultContent:""},
			{
				title: "Work Log",
				data : "workorder.workorder_id_text",
				"render": function(data, type, row, meta){
					return "<a href='#' id='workLogLink' data-toggle='modal' data-target='#workLogModal' onclick=openCommentBlock('"+meta.row+"') class='btn btn-warning btn-sm'><!--span class='badge-notify-sm' id='worklogcount_"+data+"'>0</span-->Logs</a>";
				}
			},
			{ data: "statusButton", title: "Status", defaultContent:""},
			{ data: "callingAgentButton", title: "Assign", defaultContent:""},
			{ data: "holdButton", title: "Hold/Resume", defaultContent:""},
			{ data: "reworkButton", title: "Rework", defaultContent:""},
		],
	});
}
}

function loadDataOld() {
	debugger;
	loadLookupForCountries();
	//loadCountriesLookup();
	var loginuser = userName;
	var selectedCreatedBy = $("#selectedCreatedBy").val();
	var selectedRegion = $("#selectedRegion").val();
	var selectedProductType = $("#producttype").val();
	var orderStatus = $("#statusType").val();
	//var orderStatus = "";
	//var status = "RUNNING";
	var dateRange = $("#reportrange span").text()

	var dateRangeVal = $('#dateFrom').val();
	var fromDate = '';
	var toDate = '';
	if(dateRangeVal != null && dateRangeVal != "") {
		fromDate = new Date(dateRangeVal.substring(0, dateRangeVal.indexOf("-")).trim());
		toDate = new Date(dateRangeVal.substring(dateRangeVal.indexOf("-")+1, dateRangeVal.length).trim());
	
		fromDate = fromDate.getMonth()+1+"/"+fromDate.getDate()+"/"+fromDate.getFullYear();
		toDate = toDate.getMonth()+1+"/"+toDate.getDate()+"/"+toDate.getFullYear();
	}
	$('#usertable').dataTable().fnClearTable();

	var arr = {fromDate:fromDate,toDate:toDate,createdBy:selectedCreatedBy,region:selectedRegion,productType:selectedProductType,
			orderStatus:orderStatus,dateRange:dateRange,role:role,sequence:sequenceForQuery};

	var loadUrl=role+".loadorder";
	if(role=='amus'||role=='salesadminamus'||role=='salesamus'||role=='insidesalesamus'||role=='amusmarketing') {
		if(loadUrl.indexOf('?') >= 0) {
				loadUrl = loadUrl.substring(0, loadUrl.indexOf('?'));
		}
		//loadUrl=loadUrl+"?statusTypeValue="+$("#statusType").val()+"&dateRange="+$("#reportrange span").text()+"&region="+$("#selectedRegion").val()+"&productType="+$("#producttype").val()+"&createdBy="+$("#createdby").val();
		console.log(loadUrl);
	}
	$.ajax({
		url:loadUrl,
		data: encodeURIComponent(JSON.stringify(arr)),
		success: function(data, textStatus, xhr)
		{
			debugger;
			if(data !=null && data !="" && data !="[]"){
				data = JSON.parse(data);
				var shtml="";
				var length=data.length;
				var $dataTable=$('#usertable').dataTable();
				$dataTable.fnClearTable();
				var editOrderIndex = 0;
				recOrderViewArr = data ;
				for(var i=0;i<length;i++) {
						var rec=data[i];
						var orderID=rec.workorder.workorder_id_text;
						var customQuestion='"'+rec.workorder.custom_question+'"';
						var deliveryEmail='"'+rec.workorder.delivery_email+'"';
						var serviceType='"'+rec.workorder.product_type+'"';
						var opportunityID='"'+rec.workorder.sf_opportunityid+'"';
						var isFlowToCW='"'+rec.workorder.isflowtocw+'"';
						var customQuestionLength = 0;
						var deliveryEmailLength = 0;
						var clientReferenceNumber;
						var internalReferenceNumber;
						
						
					if(rec.salesOpportunity != null && rec.salesOpportunity != "" && rec.salesOpportunity != "undefined" && rec.salesOpportunity != undefined) {
						clientReferenceNumber = rec.salesOpportunity.client_reference_number;
						internalReferenceNumber = rec.salesOpportunity.internal_reference_number;
					}
					if(rec.workorder.custom_question != null && rec.workorder.custom_question != "" && rec.workorder.custom_question != "undefined") {
							customQuestionLength = rec.workorder.custom_question.length;
					}
					if(rec.workorder.delivery_email != null && rec.workorder.delivery_email != "" && rec.workorder.delivery_email != "undefined") {
							deliveryEmailLength = rec.workorder.delivery_email.length;
					}
					if((rec.workorder.product_type == "SRL" || rec.workorder.product_type == "NRL")) {
							if(rec.pendingStatus!= undefined && rec.pendingStatus.toLowerCase()=='pending') {
									startRecord="<button type='button' id='"+i+"' onClick='start("+editOrderIndex+","+deliveryEmailLength+", "+customQuestionLength+","+isFlowToCW+")' class='btn btn-outline-success btn-xs' disabled><span class='fa fa-play' aria-hidden='true'></span></button>";
							}
							else {
									startRecord="<button type='button' id='"+i+"' class='btn btn-outline-success btn-xs' disabled><span class='fa fa-play' aria-hidden='true'></span></button>";
							}
							if(rec.callingStatus!= undefined && rec.callingStatus.toLowerCase()=='calling') {
									stopRecord="<button type='button' id='"+i+"' onClick='stop("+editOrderIndex+")' class='btn btn-outline-danger btn-xs' disabled><span class='fa fa-stop' aria-hidden='true'></span></button>";
							}
							else {
									stopRecord="<button type='button' id='"+i+"' class='btn btn-outline-danger btn-xs' disabled><span class='fa fa-stop' aria-hidden='true'></span></button>";
							}
					}
					else {
							startRecord="<button type='button' id='"+i+"' class='btn btn-outline-success btn-xs' disabled><span class='fa fa-play' aria-hidden='true'></span></button>";
							stopRecord="<button type='button' id='"+i+"' class='btn btn-outline-danger btn-xs' disabled><span class='fa fa-stop' aria-hidden='true'></span></button>";
					}
												
					var viewOrUpdateButton="";
					// if condition is written to distinguish between agent and account/delivery manager. as agent can't update the order
					if(role=='dain'){
							viewOrUpdateButton= "<button type='button' id='"+i+"' onClick='setID("+editOrderIndex+")' class='btn btn-outline-dark btn-sm'><span class='fa fa-pencil-square-o' aria-hidden='true'></span> Edit</button>";
					}
					else {
							viewOrUpdateButton="<button type='button' id='"+i+"' onClick='setID("+editOrderIndex+")' class='btn btn-outline-dark btn-sm'><span class='fa fa-pencil-square-o' aria-hidden='true'></span> Edit</button>";
					}
					var uploadWhitePaper="";
					if(role=='amus'||role=='salesadminamus'||role=='salesamus'||role=='insidesalesamus'||role=='amusmarketing') {
							uploadWhitePaper="<button id='uploadWhitepaper' data-toggle='modal' data-target='#whitepaper' onClick='uploadWhitepapers(this,"+editOrderIndex+")' class='btn btn-outline-info btn-sm'><i class='fa fa-file-pdf-o' aria-hidden='true'></i> Upload</button>"
					}
					var uploadCallingList="";
					var deleteUnprocessedLeads="";
					if(rec.workorder.product_type  == "SRL" || rec.workorder.product_type  == "NRL") {
							uploadCallingList = "<button type='button' id='"+i+"' data-toggle='modal' data-target='#filelist' onClick='uploadFileList("+editOrderIndex+","+customQuestionLength+","+opportunityID+","+serviceType+")' class='btn btn-outline-secondary btn-sm'><span class='fa fa-th-list' aria-hidden='true'></span> Upload</button>";
							deleteUnprocessedLeads = "<button type='button' onClick='deleteUnprocessedLeads("+editOrderIndex+")' class='btn btn-outline-danger btn-sm' title='Clear Unprocessed Leads' disabled><i class='fa fa-trash-o fa-lg'></i></button>";
					}
					
					var statusButton ="";
					var holdButton="";
					var reworkButton = "";
					var completeButton="";
					var callingAgentButton="";
					if(rec.workorder.product_type.startsWith("CQL") || rec.workorder.product_type == "CPL"|| rec.workorder.product_type == "Visionayr"|| rec.workorder.product_type == "SRL"|| rec.workorder.product_type == "NRL") {
						uploadCallingList = "<button type='button' id='"+i+"' data-toggle='modal' data-target='#cplUploadData' onClick='uploadDataList("+editOrderIndex+","+customQuestionLength+","+opportunityID+","+serviceType+")' class='btn btn-outline-secondary btn-sm'><span class='fa fa-th-list' aria-hidden='true'></span> Upload</button>";
						deleteUnprocessedLeads = "<button type='button' onClick='deleteUnprocessedLeads("+editOrderIndex+")' class='btn btn-outline-danger btn-sm' title='Clear Unprocessed Leads' disabled><i class='fa fa-trash-o fa-lg'></i></button>";
						statusButton = "<button type='button' class='btn btn-outline-success btn-sm' data-toggle='modal' data-target='#leadStatusModalForCQL' onClick='calculateLeadStatusCountCQL("+editOrderIndex+")'><i class='fa fa-eye fa-lg' aria-hidden='true'></i></button>";
						callingAgentButton ="<button type='button' onClick='loadCallingAgent("+editOrderIndex+","+serviceType+")' class='btn btn-outline-primary btn-sm' title='Assignee' data-toggle='modal' data-target='#workOrderModal'><i class='fa fa-users fa-lg'></i></button>";

						if(rec.countofLead != null && rec.countofLead != "" && rec.countofLead != "undefined" && rec.countofLead>0){
							reworkButton = "<button type='button' id='rework' class='btn btn-danger btn-sm' data-toggle='modal' data-target='#workLogModal' title ='Rework' disabled>Rework <i class='fa fa-retweet' aria-hidden='true'></i></button>"

						}else{
							reworkButton = "<button type='button' id='rework' class='btn btn-danger btn-sm' data-toggle='modal' data-target='#workLogModal' title ='Rework' onclick='openCommentBlockForRework("+editOrderIndex+")'>Rework <i class='fa fa-retweet' aria-hidden='true'></i></button>"

						}
						if(rec.workorder.order_stage!= undefined && (rec.workorder.order_stage.toLowerCase()=='pending' || rec.workorder.order_stage.toLowerCase()=='active'|| rec.workorder.order_stage.toLowerCase()=='running')) {
							holdButton= "<button type='button' id='"+i+"' data-toggle='modal' data-target='#reasonForHoldModal'  onClick='openHoldReasonBlock("+editOrderIndex+")' class='btn btn-outline-dark btn-sm'><span class='fa fa-pencil-square-o' aria-hidden='true'></span> Hold</button>";
						}else if(rec.workorder.order_stage!= undefined && (rec.workorder.order_stage.toLowerCase()=='hold')) {
							holdButton= "<button type='button' id='"+i+"' onClick='restartOrder("+editOrderIndex+")' class='btn btn-outline-dark btn-sm'><span class='fa fa-pencil-square-o' aria-hidden='true'></span> Resume</button>";
						}else{
							holdButton= "<button type='button' id='"+i+"' class='btn btn-outline-dark btn-sm' disabled><span class='fa fa-pencil-square-o' aria-hidden='true'></span> Hold</button>";
						}
						
						if(rec.workorder.order_stage!= undefined && (rec.workorder.order_stage.toLowerCase()=='completed')){
							completeButton= "<button type='button' id='"+i+"'  class='btn btn-outline-dark btn-sm' disabled><span class='fa fa-pencil-square-o' aria-hidden='true'></span> Complete</button>";
							holdButton= "<button type='button' id='"+i+"' onClick='restartOrder("+editOrderIndex+")' class='btn btn-outline-dark btn-sm'><span class='fa fa-pencil-square-o' aria-hidden='true'></span> Restart</button>";
						}else{
							completeButton= "<button type='button' id='"+i+"' onClick='complete("+editOrderIndex+")' class='btn btn-outline-dark btn-sm'><span class='fa fa-pencil-square-o' aria-hidden='true'></span> Complete</button>";
						}
					}
					else {
						uploadCallingList = "<button id='"+i+"' data-toggle='modal' class='btn btn-outline-success btn-sm' disabled><span class='fa fa-th-list' aria-hidden='true'></span> Upload</a>";
						deleteUnprocessedLeads = "<button type='button' onClick='deleteUnprocessedLeads("+editOrderIndex+")' class='btn btn-outline-danger btn-sm' title='Clear Unprocessed Leads' disabled><i class='fa fa-trash-o fa-lg'></i></button>";
						statusButton = "<button type='button' class='btn btn-outline-success btn-sm' data-toggle='modal' data-target='#leadStatusModal' onClick='calculateLeadStatusCount("+editOrderIndex+")' disabled><i class='fa fa-eye fa-lg' aria-hidden='true'></i></button>";
						holdButton= "<button type='button' id='"+i+"' class='btn btn-outline-dark btn-sm' disabled><span class='fa fa-pencil-square-o' aria-hidden='true'></span> Hold</button>";
						completeButton= "<button type='button' id='"+i+"'  class='btn btn-outline-dark btn-sm' disabled><span class='fa fa-pencil-square-o' aria-hidden='true' ></span> Complete</button>";
						reworkButton = "<button type='button' id='rework' class='btn btn-danger btn-sm' data-toggle='modal' data-target='#workLogModal' title ='Rework' disabled>Rework <i class='fa fa-retweet' aria-hidden='true'></i></button>";
						callingAgentButton ="<button type='button'  class='btn btn-outline-primary btn-sm' title='Assignee' data-toggle='modal' data-target='#workOrderModal' disabled><i class='fa fa-users fa-lg'></i></button>";

					}
					
					
					
					
					//orderIDs.push(orderID);
					if(role=='amus'||role=='salesadminamus'||role=='salesamus'||role=='insidesalesamus'||role=='amusmarketing') {
							$dataTable.fnAddData([
											startRecord,
											stopRecord,
											completeButton,
											rec.workorder.campaign_name,
											rec.workorder.companyname || '',
											rec.workorder.campaign_value,
											rec.workorder.product_type,
											viewOrUpdateButton,
											uploadCallingList,
											uploadWhitePaper,
											clientReferenceNumber,
											internalReferenceNumber,
											"<a href='#' id='workLogLink' data-toggle='modal' data-target='#workLogModal' onclick='openCommentBlock("+editOrderIndex+")' class='btn btn-outline-warning btn-sm'><!--span class='badge-notify-sm' id='worklogcount_"+orderID+"'>0</span--><i class='fa fa-bars fa-lg' aria-hidden='true'></i></a>",
											statusButton,														
											deleteUnprocessedLeads,
											"<button type='button' onClick='archiveOrder("+editOrderIndex+")' class='btn btn-outline-info btn-sm' title='Archive Order' id ='archiveOrder' disabled><i class='fa fa-archive fa-lg'></i></a>",
											callingAgentButton,
											holdButton,
											reworkButton										]);
					}
					else if(role=='dmin') {
							$dataTable.fnAddData([
											startRecord,
											stopRecord,
											rec.workorder.campaign_name,
											rec.workorder.companyname,
											rec.workorder.campaign_value,
											rec.workorder.product_type,
											"<a href='#' id='workLogLink' data-toggle='modal' data-target='#workLogModal' onclick='openCommentBlock("+editOrderIndex+")' class='btn btn-outline-warning btn-sm'><!--span class='badge-notify-sm' id='worklogcount_"+orderID+"'>0</span--><i class='fa fa-bars fa-lg' aria-hidden='true'></i></a>",
											statusButton,														
											callingAgentButton,
											reworkButton
							]);
					}
					else {
							$dataTable.fnAddData([
											completeButton,
											rec.workorder.campaign_name,
											rec.workorder.companyname,
											rec.workorder.campaign_value,
											rec.workorder.product_type,
											viewOrUpdateButton,
											uploadCallingList,
											uploadWhitePaper,
											clientReferenceNumber,
											internalReferenceNumber,
											"<a href='#' id='workLogLink' data-toggle='modal' data-target='#workLogModal' onclick='openCommentBlock("+editOrderIndex+")' class='btn btn-outline-warning btn-sm'><!--span class='badge-notify-sm' id='worklogcount_"+orderID+"'>0</span--><i class='fa fa-bars fa-lg' aria-hidden='true'></i></a>",
											statusButton,														
											callingAgentButton,
											holdButton,
											reworkButton
							]);
					}
					editOrderIndex++;
				}
				$('#loadBg').hide();
				$("body").removeClass("p-0");
				document.getElementById('loadNext').disabled = false;
			}else{
				$('#loadBg').hide();
				$("body").removeClass("p-0");
				document.getElementById('loadNext').disabled = true;
			}
			if(sequence == "0") {
				document.getElementById('loadPrev').disabled = true;
			}else{
				document.getElementById('loadPrev').disabled = false;
			}
			
					},
			error :	function(xhr, textStatus, errorThrow) {
							$('#loadBg').hide();
							$("body").removeClass("p-0");
							console.log(xhr);
							console.log(textStatus);
							console.log(errorThrow);
					}
});  
}

function fetchOrdersBasedOnCampaignAccountNameFilter() {
	sequence = 0;
	sequenceForQuery = 0;
	pageCount = 1
	document.getElementById('pageValue').innerHTML = "P"+pageCount;
	fetchOrdersCountBasedOnCampaignAccountName();
	fetchOrdersBasedOnCampaignAccountName();
}

function fetchOrdersCountBasedOnCampaignAccountName(){
	var orderName='';
	var accountName='';
	var fieldValue = $("#selectedCampaignName").val();
	var dropdown=$("#selectCampaignAccount").val();
	if(dropdown=="campaign_name"){
		var	finalurl='loadSelectedOrderViewCountBasedOnCampaignAccountName.do';
		var arr = {orderName:fieldValue,accountName:accountName,sequence:sequenceForQuery};
	}
	else if(dropdown=="account_name"){
		var	finalurl='loadSelectedOrderViewCountBasedOnCampaignAccountName.do';
		var arr = {accountName:fieldValue,orderName:orderName,sequence:sequenceForQuery};
	}
	else if(dropdown=="program_name"){
		var	finalurl='loadSelectedOrderViewCountBasedOnCampaignAccountName.do';
		var arr = {programName:fieldValue,orderName:orderName,sequence:sequenceForQuery,accountName:accountName};
	}
	$.ajax({
		url:finalurl,
		data:arr,
		success:function(result) {
			document.getElementById('totalRecords').innerHTML = result;
		}
	});
	
	
}

function fetchOrdersBasedOnCampaignAccountName() {
	debugger;
	var loginuser = userName;
	var orderName='';
	var accountName='';
	var fieldValue = $("#selectedCampaignName").val();
	var dropdown=$("#selectCampaignAccount").val();
	var fetchSize = $("#setLimit").val();
	if(dropdown=="campaign_name"){
		var	finalurl='loadSelectedOrderViewRecordsBasedOnCampaignAccountName.do?role='+role;
		var arr = {orderName:fieldValue,accountName:accountName,sequence:sequenceForQuery,fetchSize:fetchSize};
	}
	else if(dropdown=="account_name"){
		var	finalurl='loadSelectedOrderViewRecordsBasedOnCampaignAccountName.do?role='+role;
		var arr = {accountName:fieldValue,orderName:orderName,sequence:sequenceForQuery,fetchSize:fetchSize};
	}
	else if(dropdown=="program_name"){
		var	finalurl='loadSelectedOrderViewRecordsBasedOnCampaignAccountName.do?role='+role;
		var arr = {programName:fieldValue,orderName:orderName,sequence:sequenceForQuery,accountName:accountName,fetchSize:fetchSize};
	}
	$('#loadBg').show();
	$('#usertable').dataTable().fnClearTable();
	$.ajax({
		url:finalurl,
		data:arr,
		success:function(jsonData) {
			if(jsonData != null && jsonData != "" && jsonData != "[]") {
				debugger;
				jsonData = JSON.parse(jsonData);
				recOrderViewArr = jsonData;
				showSalesOrderViewRecord(jsonData,role);
				$('#loadBg').hide();
				$("body").removeClass("p-0");
				document.getElementById('loadNext').disabled = false;
			}else{
				$('#loadBg').hide();
				$("body").removeClass("p-0");
				document.getElementById('loadNext').disabled = true;
			}
			if(sequence == "0") {
				document.getElementById('loadPrev').disabled = true;
			}else{
				document.getElementById('loadPrev').disabled = false;
			}
			
		}
	})
}

function fetchOrdersBasedOnCampaignAccountNameOld() {
	debugger;
	var loginuser = userName;
	var orderName='';
	var accountName='';
	var fieldValue = $("#selectedCampaignName").val();
	var dropdown=$("#selectCampaignAccount").val();
	if(dropdown=="campaign_name"){
		var	finalurl='loadSelectedOrderViewRecordsBasedOnCampaignAccountName.do';
		var arr = {orderName:fieldValue,accountName:accountName,sequence:sequenceForQuery};
	}
	else if(dropdown=="account_name"){
		var	finalurl='loadSelectedOrderViewRecordsBasedOnCampaignAccountName.do';
		var arr = {accountName:fieldValue,orderName:orderName,sequence:sequenceForQuery};
	}
	$('#loadBg').show();
	$('#usertable').dataTable().fnClearTable();

	$.ajax({
		url:finalurl,
		data: encodeURIComponent(JSON.stringify(arr)),
		success: function(data, textStatus, xhr)
		{
			debugger;
			if(data !=null && data !="" && data !="[]"){
				data = JSON.parse(data);
				var shtml="";
				var length=data.length;
				var $dataTable=$('#usertable').dataTable();
				$dataTable.fnClearTable();
				var editOrderIndex = 0;
				recOrderViewArr = data ;
				for(var i=0;i<length;i++) {
						var rec=data[i];
						var orderID=rec.workorder.workorder_id_text;
						var customQuestion='"'+rec.workorder.custom_question+'"';
						var deliveryEmail='"'+rec.workorder.delivery_email+'"';
						var serviceType='"'+rec.workorder.product_type+'"';
						var opportunityID='"'+rec.workorder.sf_opportunityid+'"';
						var isFlowToCW='"'+rec.workorder.isflowtocw+'"';
						var customQuestionLength = 0;
						var deliveryEmailLength = 0;
						
						var clientReferenceNumber;
						var internalReferenceNumber;
						
						
					if(rec.salesOpportunity != null && rec.salesOpportunity != "" && rec.salesOpportunity != "undefined" && rec.salesOpportunity != undefined) {
						clientReferenceNumber = rec.salesOpportunity.client_reference_number;
						internalReferenceNumber = rec.salesOpportunity.internal_reference_number;
					}
						
					if(rec.workorder.custom_question != null && rec.workorder.custom_question != "" && rec.workorder.custom_question != "undefined") {
							customQuestionLength = rec.workorder.custom_question.length;
					}
					if(rec.workorder.delivery_email != null && rec.workorder.delivery_email != "" && rec.workorder.delivery_email != "undefined") {
							deliveryEmailLength = rec.workorder.delivery_email.length;
					}
					if((rec.workorder.product_type == "SRL" || rec.workorder.product_type == "NRL")) {
							if(rec.pendingStatus!= undefined && rec.pendingStatus.toLowerCase()=='pending') {
									startRecord="<button type='button' id='"+i+"' onClick='start("+editOrderIndex+","+deliveryEmailLength+", "+customQuestionLength+","+isFlowToCW+")' class='btn btn-outline-success btn-xs' disabled><span class='fa fa-play' aria-hidden='true'></span></button>";
							}
							else {
									startRecord="<button type='button' id='"+i+"' class='btn btn-outline-success btn-xs' disabled><span class='fa fa-play' aria-hidden='true'></span></button>";
							}
							if(rec.callingStatus!= undefined && rec.callingStatus.toLowerCase()=='calling') {
									stopRecord="<button type='button' id='"+i+"' onClick='stop("+editOrderIndex+")' class='btn btn-outline-danger btn-xs' disabled><span class='fa fa-stop' aria-hidden='true'></span></button>";
							}
							else {
									stopRecord="<button type='button' id='"+i+"' class='btn btn-outline-danger btn-xs' disabled><span class='fa fa-stop' aria-hidden='true'></span></button>";
							}
					}
					else {
							startRecord="<button type='button' id='"+i+"' class='btn btn-outline-success btn-xs' disabled><span class='fa fa-play' aria-hidden='true'></span></button>";
							stopRecord="<button type='button' id='"+i+"' class='btn btn-outline-danger btn-xs' disabled><span class='fa fa-stop' aria-hidden='true'></span></button>";
					}
												
					var viewOrUpdateButton="";
					// if condition is written to distinguish between agent and account/delivery manager. as agent can't update the order
					if(role=='dain'){
							viewOrUpdateButton= "<button type='button' id='"+i+"' onClick='setID("+editOrderIndex+")' class='btn btn-outline-dark btn-sm'><span class='fa fa-pencil-square-o' aria-hidden='true'></span> Edit</button>";
					}
					else {
							viewOrUpdateButton="<button type='button' id='"+i+"' onClick='setID("+editOrderIndex+")' class='btn btn-outline-dark btn-sm'><span class='fa fa-pencil-square-o' aria-hidden='true'></span> Edit</button>";
					}
					var uploadWhitePaper="";
					if(role=='amus'||role=='salesadminamus'||role=='salesamus'||role=='insidesalesamus'||role=='amusmarketing') {
							uploadWhitePaper="<button id='uploadWhitepaper' data-toggle='modal' data-target='#whitepaper' onClick='uploadWhitepapers(this,"+editOrderIndex+")' class='btn btn-outline-info btn-sm'><i class='fa fa-file-pdf-o' aria-hidden='true'></i> Upload</button>"
					}
					var uploadCallingList="";
					var deleteUnprocessedLeads="";
					if(rec.workorder.product_type  == "SRL" || rec.workorder.product_type  == "NRL") {
							uploadCallingList = "<button type='button' id='"+i+"' data-toggle='modal' data-target='#filelist' onClick='uploadFileList("+editOrderIndex+","+customQuestionLength+","+opportunityID+","+serviceType+")' class='btn btn-outline-secondary btn-sm'><span class='fa fa-th-list' aria-hidden='true'></span> Upload</button>";
							deleteUnprocessedLeads = "<button type='button' onClick='deleteUnprocessedLeads("+editOrderIndex+")' class='btn btn-outline-danger btn-sm' title='Clear Unprocessed Leads' disabled><i class='fa fa-trash-o fa-lg'></i></button>";
					}
					
					var statusButton ="";
					var holdButton="";
					var reworkButton = "";
					var completeButton="";
					var callingAgentButton="";
					if(rec.workorder.product_type.startsWith("CQL") || rec.workorder.product_type == "CPL"|| rec.workorder.product_type == "Visionayr"|| rec.workorder.product_type == "SRL"|| rec.workorder.product_type == "NRL") {
						uploadCallingList = "<button type='button' id='"+i+"' data-toggle='modal' data-target='#cplUploadData' onClick='uploadDataList("+editOrderIndex+","+customQuestionLength+","+opportunityID+","+serviceType+")' class='btn btn-outline-secondary btn-sm'><span class='fa fa-th-list' aria-hidden='true'></span> Upload</button>";
						deleteUnprocessedLeads = "<button type='button' onClick='deleteUnprocessedLeads("+editOrderIndex+")' class='btn btn-outline-danger btn-sm' title='Clear Unprocessed Leads' disabled><i class='fa fa-trash-o fa-lg'></i></button>";
						statusButton = "<button type='button' class='btn btn-outline-success btn-sm' data-toggle='modal' data-target='#leadStatusModalForCQL' onClick='calculateLeadStatusCountCQL("+editOrderIndex+")'><i class='fa fa-eye fa-lg' aria-hidden='true'></i></button>";
						callingAgentButton ="<button type='button' onClick='loadCallingAgent("+editOrderIndex+","+serviceType+")' class='btn btn-outline-primary btn-sm' title='Assignee' data-toggle='modal' data-target='#workOrderModal'><i class='fa fa-users fa-lg'></i></button>";

						if(rec.countofLead != null && rec.countofLead != "" && rec.countofLead != "undefined" && rec.countofLead>0){
							reworkButton = "<button type='button' id='rework' class='btn btn-danger btn-sm' data-toggle='modal' data-target='#workLogModal' title ='Rework' disabled>Rework <i class='fa fa-retweet' aria-hidden='true'></i></button>"

						}else{
							reworkButton = "<button type='button' id='rework' class='btn btn-danger btn-sm' data-toggle='modal' data-target='#workLogModal' title ='Rework' onclick='openCommentBlockForRework("+editOrderIndex+")'>Rework <i class='fa fa-retweet' aria-hidden='true'></i></button>"

						}
						if(rec.workorder.order_stage!= undefined && (rec.workorder.order_stage.toLowerCase()=='pending' || rec.workorder.order_stage.toLowerCase()=='active'|| rec.workorder.order_stage.toLowerCase()=='running')) {
							holdButton= "<button type='button' id='"+i+"' data-toggle='modal' data-target='#reasonForHoldModal'  onClick='openHoldReasonBlock("+editOrderIndex+")' class='btn btn-outline-dark btn-sm'><span class='fa fa-pencil-square-o' aria-hidden='true'></span> Hold</button>";
						}else if(rec.workorder.order_stage!= undefined && (rec.workorder.order_stage.toLowerCase()=='hold')) {
							holdButton= "<button type='button' id='"+i+"' onClick='restartOrder("+editOrderIndex+")' class='btn btn-outline-dark btn-sm'><span class='fa fa-pencil-square-o' aria-hidden='true'></span> Resume</button>";
						}else{
							holdButton= "<button type='button' id='"+i+"' class='btn btn-outline-dark btn-sm' disabled><span class='fa fa-pencil-square-o' aria-hidden='true'></span> Hold</button>";
						}
						
						if(rec.workorder.order_stage!= undefined && (rec.workorder.order_stage.toLowerCase()=='completed')){
							completeButton= "<button type='button' id='"+i+"'  class='btn btn-outline-dark btn-sm' disabled><span class='fa fa-pencil-square-o' aria-hidden='true'></span> Complete</button>";
							holdButton= "<button type='button' id='"+i+"' onClick='restartOrder("+editOrderIndex+")' class='btn btn-outline-dark btn-sm'><span class='fa fa-pencil-square-o' aria-hidden='true'></span> Restart</button>";
						}else{
							completeButton= "<button type='button' id='"+i+"' onClick='complete("+editOrderIndex+")' class='btn btn-outline-dark btn-sm'><span class='fa fa-pencil-square-o' aria-hidden='true'></span> Complete</button>";
						}

						
					}
					else {
						uploadCallingList = "<button id='"+i+"' data-toggle='modal' class='btn btn-outline-success btn-sm' disabled><span class='fa fa-th-list' aria-hidden='true'></span> Upload</a>";
						deleteUnprocessedLeads = "<button type='button' onClick='deleteUnprocessedLeads("+editOrderIndex+")' class='btn btn-outline-danger btn-sm' title='Clear Unprocessed Leads' disabled><i class='fa fa-trash-o fa-lg'></i></button>";
						statusButton = "<button type='button' class='btn btn-outline-success btn-sm' data-toggle='modal' data-target='#leadStatusModal' onClick='calculateLeadStatusCount("+editOrderIndex+")' disabled><i class='fa fa-eye fa-lg' aria-hidden='true'></i></button>";
						holdButton= "<button type='button' id='"+i+"' class='btn btn-outline-dark btn-sm' disabled><span class='fa fa-pencil-square-o' aria-hidden='true'></span> Hold</button>";
						completeButton= "<button type='button' id='"+i+"'  class='btn btn-outline-dark btn-sm' disabled><span class='fa fa-pencil-square-o' aria-hidden='true' ></span> Complete</button>";
						reworkButton = "<button type='button' id='rework' class='btn btn-danger btn-sm' data-toggle='modal' data-target='#workLogModal' title ='Rework' disabled>Rework <i class='fa fa-retweet' aria-hidden='true'></i></button>";
						callingAgentButton ="<button type='button'  class='btn btn-outline-primary btn-sm' title='Assignee' data-toggle='modal' data-target='#workOrderModal' disabled><i class='fa fa-users fa-lg'></i></button>";

					}
					
					
					
					
					//orderIDs.push(orderID);
					if(role=='amus'||role=='salesadminamus'||role=='salesamus'||role=='insidesalesamus'||role=='amusmarketing') {
							$dataTable.fnAddData([
											startRecord,
											stopRecord,
											completeButton,
											rec.workorder.campaign_name,
											rec.workorder.companyname || '',
											rec.workorder.campaign_value,
											rec.workorder.product_type,
											viewOrUpdateButton,
											uploadCallingList,
											uploadWhitePaper,
											clientReferenceNumber,
											internalReferenceNumber,
											"<a href='#' id='workLogLink' data-toggle='modal' data-target='#workLogModal' onclick='openCommentBlock("+editOrderIndex+")' class='btn btn-outline-warning btn-sm'><!--span class='badge-notify-sm' id='worklogcount_"+orderID+"'>0</span--><i class='fa fa-bars fa-lg' aria-hidden='true'></i></a>",
											statusButton,														
											deleteUnprocessedLeads,
											"<button type='button' onClick='archiveOrder("+editOrderIndex+")' class='btn btn-outline-info btn-sm' title='Archive Order' id ='archiveOrder' disabled><i class='fa fa-archive fa-lg'></i></a>",
											callingAgentButton,
											holdButton,
											reworkButton										]);
					}
					else if(role=='dmin') {
							$dataTable.fnAddData([
											startRecord,
											stopRecord,
											rec.workorder.campaign_name,
											rec.workorder.companyname,
											rec.workorder.campaign_value,
											rec.workorder.product_type,
											"<a href='#' id='workLogLink' data-toggle='modal' data-target='#workLogModal' onclick='openCommentBlock("+editOrderIndex+")' class='btn btn-outline-warning btn-sm'><!--span class='badge-notify-sm' id='worklogcount_"+orderID+"'>0</span--><i class='fa fa-bars fa-lg' aria-hidden='true'></i></a>",
											statusButton,														
											callingAgentButton,
											reworkButton
							]);
					}
					else {
							$dataTable.fnAddData([
											completeButton,
											rec.workorder.campaign_name,
											rec.workorder.companyname,
											rec.workorder.campaign_value,
											rec.workorder.product_type,
											viewOrUpdateButton,
											uploadCallingList,
											uploadWhitePaper,
											clientReferenceNumber,
											internalReferenceNumber,
											"<a href='#' id='workLogLink' data-toggle='modal' data-target='#workLogModal' onclick='openCommentBlock("+editOrderIndex+")' class='btn btn-outline-warning btn-sm'><!--span class='badge-notify-sm' id='worklogcount_"+orderID+"'>0</span--><i class='fa fa-bars fa-lg' aria-hidden='true'></i></a>",
											statusButton,														
											callingAgentButton,
											holdButton,
											reworkButton
							]);
					}
					editOrderIndex++;
				}
				$('#loadBg').hide();
				$("body").removeClass("p-0");
				document.getElementById('loadNext').disabled = false;
			}else{
				$('#loadBg').hide();
				$("body").removeClass("p-0");
				
				document.getElementById('loadNext').disabled = true;
			}
			if(sequence == "0") {
				document.getElementById('loadPrev').disabled = true;
			}else{
				document.getElementById('loadPrev').disabled = false;
			}
			
					},
			error :	function(xhr, textStatus, errorThrow) {
							$('#loadBg').hide();
							$("body").removeClass("p-0");
							console.log(xhr);
							console.log(textStatus);
							console.log(errorThrow);
					}
});  
}

//selecting campaignName or accountName base for datatable to show.
function selectCampaignAccountName(){
	debugger;
	if($("#selectedCampaignName").val() != null && $("#selectedCampaignName").val() != ""){
		$("#selectedCampaignName").val("");
	}
	var dropdown=$("#selectCampaignAccount").val();
	if(dropdown=="campaign_name"){
		$('#selectedCampaignName').attr('placeholder', 'Enter Campaign Name');
		$('#selectedCampaignName').show();
	}
	else if(dropdown=="account_name"){
		$('#selectedCampaignName').attr('placeholder', 'Enter Account Name');
		$('#selectedCampaignName').show();
	}
	else if(dropdown=="program_name"){
		$('#selectedCampaignName').attr('placeholder', 'Enter Program Name');
		$('#selectedCampaignName').show();
	}
	else{
		$('#selectedCampaignName').hide();
	}
	
}






function start(index,deliveryEmailLength,customQuestionLength,isFlowToCW) {
var orderID = recOrderViewArr[index].workorder.workorder_id_text;
if(deliveryEmailLength <= 0){
		$("#errorMsg").html("* Please enter atleast one delivery email before starting.").show();
		setTimeout(function(){$('#errorMsg').html("");},3000);
		return false;
}
else if(customQuestionLength <= 0) {
	$("#errorMsg").html("* Please enter atleast one custom question before starting.").show();
	setTimeout(function(){$('#errorMsg').html("");},3000);
	return false;
}
else {
	$.confirm({
		'message'	: 'Are you sure you want to Start?',
		'buttons'	: {
						'<span class="fa fa-check fa-2x" aria-hidden="true"></span> Yes' : {
								'class'	: 'yes',
								'action': function() {
												callStartService(orderID);
											}
						},
						'<span class="fa fa-times fa-2x" aria-hidden="true"></span>  No' : {
								'class'	: 'no',
								'action': function(){}	// Nothing to do in this case. You can as well omit the action property.
						}
		}
	});
}
}
function callStartService(orderNo) {
	debugger;
	$('#loadBg').show();
	$("body").addClass("p-0");
	var serviceData=JSON.stringify({"username":user});
	$.ajax({
			url  		:	'amuscallStartService?user='+user+"&order_id="+orderNo, contentType:"application/json",
			type 		:	'GET',
			contentType	:	false,
			processData	:	false,
			crossDomain	:	true,
			success		:	function(data, textStatus, xhr) {
									var notes= 'Start Flow';
									sendWorkLogEmail(orderNo,notes);
									fetchTotalOrderCountForFilter();
									loadData();
							},
			error		:	function(xhr, textStatus, errorThrow) {
									$('#loadBg').hide();
									$("body").removeClass("p-0");
									$("#errorMsg").html("* Error occurred while starting the service.").show();
									setTimeout(function(){$("#errorMsg").html('');},validationMessageTimeout);
									return false;
							}
	});
}

function stop(index) {
	var orderID = recOrderViewArr[index].workorder.workorder_id_text;
	$.confirm({
		'message'	: 'Are you sure you want to Stop?',
		'buttons'	: {
						'<span class="fa fa-check fa-2x" aria-hidden="true"></span> Yes' : {
									'class'	: 'yes',
									'action': function(){
													callStopService(orderID);
												}
						},
						'<span class="fa fa-times fa-2x" aria-hidden="true"></span>  No' : {
									'class'	: 'no',
									'action': function(){}	// Nothing to do in this case. You can as well omit the action property.
						}
		}
	});
}

function callStopService(orderNo) {
	debugger;
		$('#loadBg').show();
		$("body").addClass("p-0");
		var serviceData=JSON.stringify({"username":user});
		$.ajax({
				url			:	'amuscallStopService?user='+user+"&order_id="+orderNo, contentType:"application/json",
				type		:	'DELETE',
				contentType :	false,
				processData	:	false,
				crossDomain	:	true,
				success		:	function(data, textStatus, xhr)	{
										var notes= 'Stop Flow';
										sendWorkLogEmail(orderNo,notes);
										fetchTotalOrderCountForFilter();
										loadData();
								},
				error		:	function(xhr, textStatus, errorThrow) {
										$('#loadBg').hide();
										$("body").removeClass("p-0");
										$("#errorMsg").html("* Error occurred while stoping the service.").show();
										setTimeout(function(){$("#errorMsg").html('');},validationMessageTimeout);
										return false;
								}
		});
}

function uploadFileList(orderNo, customQuestionLength, opportunityId, serviceType) {
	debugger;
		if(customQuestionLength <= 0) {
				$("#error").html("* Please enter atleast one custom question before uploading the file.").show();
				setTimeout(function(){$('#error').hide();},10000);
				return false;
		}
		else {
				$("#filelist_orderid").val(orderNo);
				$("#filelist_opportunityid").val(opportunityId);
				$("#filelist_serviceType").val(serviceType);
		}
}

function uploadFileListData() {
	debugger;
		if($("#filelist_orderid").val() == null || $("#filelist_orderid").val() =="") {
				$("#error").html("* Please enter atleast one custom question before uploading the file.").show();
				setTimeout(function(){$('#error').hide();},10000);
				return false;
		}
		var listFile=$("#list_file")[0].files[0];
		if(listFile != null && listFile != "" && listFile != 'undefined') {
				var fileName = $('#list_file').prop("files")[0]['name'];
				if(fileName.lastIndexOf(".csv") != -1) {
						$('#error').html("").hide();
						$("#uploadCallingLoader").show();
						var orderId=$("#filelist_orderid").val();
						var formData=new FormData();
						formData.append("file",$("#list_file")[0].files[0]);
						var finalURL ="amus.uploadFileListData?orderID="+orderId+"&opportunityId="+$("#filelist_opportunityid").val()+"&serviceType="+$("#filelist_serviceType").val();
						$.ajax({
								url			:	finalURL,
								data		:	formData,
								contentType	:	false,
								cache		:	false,
								processData	:	false,
								type		:	"POST",
								success		:	function(data, textStatus, xhr) {
														$("#uploadCallingLoader").hide();
														var jsonData = JSON.parse(data);
														var successMsg = jsonData.successMessage;
														var errorMsg = jsonData.errorMessage;
														if(successMsg != null && successMsg != "") {
																$("#msg").html(successMsg).show();
																setTimeout(function() {
																		$("#filelist").modal('hide');
																		window.location.href=serContext+"/amusorder.do";
																}, 3000);
														}
														else if(errorMsg != null && errorMsg != "") {
																$("#error").html(errorMsg).show();
																return false;
														}
												},
								error		:	function(xhr, textStatus, errorThrow) {
														console.log(xhr);
														console.log(textStatus);
														console.log(errorThrow);
														$("#dialog" ).dialog("close");
												}
						});
				}
				else {
						$("#uploadFileListErrorMsg").html("Only CSV files are allowed.").show();
						setTimeout(function(){$('#uploadFileListErrorMsg').html("").hide();},4000);
						return false;
				}
		}
		else {
				$("#uploadFileListErrorMsg").html("Kindly choose the file to upload.").show();
				setTimeout(function(){$('#uploadFileListErrorMsg').html("").hide();},4000);
				return false;
		}
}

function addComment() {
	debugger;
		//commentarea
		var notes= document.getElementById('commentarea').value;
		var orderID=$("#worklog_orderid").val();
		if(notes!='' && notes.length>0) {
				$.ajax({
						url			:	"addworklog?order_id="+orderID,
						crossDomain :	true,
						processData :	false,
						contentType	:	false,
						type		:	'POST',
						data:JSON.stringify({"es":notes,"es_type":"Communication","createdby":user}),
						success		:	function(json, textStatus, xhr) {
												sendWorkLogEmail(orderID,notes);
												openCommentBlock(null);
												document.getElementById('commentarea').value='';
												$('#commAddMsg').show();
												setTimeout(function() {$('#commAddMsg').fadeOut();}, 4000);
												//calculateWorkLogCount(orderID);
										},
						error		:	function(xhr, textStatus, errorThrow) {
												openCommentBlock(null);
												$('#commErrMsg').show().fadeOut(4000);
										}
				});
		}
		else {
				$('#commErrMsg').show().fadeOut(4000);
		}
}

function openCommentBlock(index) {
	if(index != null) {
		var orderId = recOrderViewArr[index].workorder.workorder_id_text;
		$("#worklog_orderid").val(orderId);
	}
		var commentsmodal = document.getElementById("commentsmodal");
		var modalHTML='';
		$.ajax({
				url			:	"getworklog?order_id="+$("#worklog_orderid").val(),
				crossDomain	:	true,
				type		:	'GET',
				success		:	function(data, textStatus, xhr) {
										console.log(data);
										for (var key in data.worklog) {
											var createdOn = new Date(data.worklog[key].createdon);
											var date = createdOn.getDate();
										    var month = createdOn.getMonth()+1;
										    var hours = createdOn.getHours();
										    var minutes = createdOn.getMinutes();
										    var seconds = createdOn.getSeconds();
										    createdOn = createdOn.getFullYear()+"-"+((month <= 9 ? '0'+month : month)+"-"+(date <= 9 ? '0'+date : date))+" "+(hours <= 9 ? '0'+hours : hours)+":"+(minutes <= 9 ? '0'+minutes : minutes)+":"+(seconds <= 9 ? '0'+seconds : seconds);
											
												modalHTML = modalHTML	+ '<div class="commentBlk"><div class="row"><div class="col-md-1"><div class="userBg"><i class="fa fa-user"></i></div></div><div class="col-md-11"><div class="userBlk"><span class="userTitle">'
																		+ data.worklog[key].createdby
																		+ '</span>, '
																		+ createdOn+' '+data.worklog[key].es_type
																		+ '</div></div></div><div class="row"><div class="col-md-11 offset-md-1">'
																		+ data.worklog[key].es
																		+ '</div></div></div>';
										}
										commentsmodal.innerHTML = modalHTML;
								},
				error		:	function(xhr, textStatus, errorThrow) {}
		});
}

function sendWorkLogEmail(orderId,notes) {
		$.ajax({
				url		:	"loadWorkLogEmailData.do?orderId="+orderId+"&notes="+notes+"&notes="+notes+"&userName="+userName,
				async	:	false,
				success	:	function(data, textStatus, xhr) {
									if(data != null && data != "") {
										data = jQuery.parseJSON(data);
									}
							}
		});
}

function calculateLeadStatusCount(index) {
		var orderId = recOrderViewArr[index].workorder.workorder_id_text;
		$("#worklog_orderid").val(orderId);
		$("#leadStatusLoader").show();
		$.ajax({
				url		:	'fetchLeadStatusCount.do?orderId='+orderId,
				success	:	function(data, textStatus, xhr){
									$("#leadStatusLoader").hide();
									if(data != null && data.length > 0) {
											for(i=0; i<data.length; i++) {
													if(data[i].ol_question_status != null && data[i].ol_question_status != "") {
															if((data[i].ol_question_status).toLowerCase() == "calling") {
																	$("#callingCount").html(data[i].countCalling);
															}
															else if((data[i].ol_question_status).toLowerCase() == "companyclean") {
																	$("#companyCleanCount").html(data[i].countCalling);
															}
															else if((data[i].ol_question_status).toLowerCase() == "callingqa") {
																	$("#callingQACount").html(data[i].countCalling);
															}
															else if((data[i].ol_question_status).toLowerCase() == "analyst") {
																	$("#analystCount").html(data[i].countCalling);
															}
															else if((data[i].ol_question_status).toLowerCase() == "qa") {
																	$("#qaCount").html(data[i].countCalling);
															}
															else if((data[i].ol_question_status).toLowerCase() == "delivered") {
																	$("#deliveredCount").html(data[i].countCalling);
															}
													}
											}
									}
									else {
											$("#callingCount").html(0);
											$("#companyCleanCount").html(0);
											$("#callingQACount").html(0);
											$("#analystCount").html(0);
											$("#qaCount").html(0);
											$("#deliveredCount").html(0);
									}
							},
				error	:	function(xhr, textStatus, errorThrow) {
									$("#leadStatusLoader").hide();
									$("#callingCount").html(0);
									$("#companyCleanCount").html(0);
									$("#callingQACount").html(0);
									$("#analystCount").html(0);
									$("#qaCount").html(0);
									$("#deliveredCount").html(0);
							}
		});
}

function commentAreaKeyPress() {
		var maxLength=1000;
		var length = document.getElementById('commentarea').value.length;	
		var warning= document.getElementById('leftchars');
		var remaininglength = maxLength-length;
		if(remaininglength<=0) {
				document.getElementById('commentarea').value=oldvalue;
				warning.innerHTML='<p class="text-danger">Characters left: <strong>0</strong> </p>';
		}
		else {
				warning.innerHTML='<p class="text-muted">Characters left: <strong>'+remaininglength+'</strong> </p>';
				oldvalue=document.getElementById('commentarea').value;
		}
}
	
function addUpdateData(obj) {
		if($('#campaignName').val()!=null && $('#campaignName').val()!='') {
				if($('#campaignName').val().indexOf(',') != -1) {
						$("#campaignNameMsg").html("* Comma is not allowed.").show();
						setTimeout(function(){$('#campaignNameMsg').html("");},4000);
						return false;
				}
		}
		var message = "";
		var csfLookupMatch = "";
		if(csfLookupSelectList.length > 0){
				var lookupSelectList =csfLookupSelectList.split(",");
				$.each(lookupSelectList, function(i) {
						csfLookupMatch = csfLookupTypeList.indexOf(lookupSelectList[i]);
						if(csfLookupMatch > -1){
							
						}
						else {
								message = message+lookupSelectList[i]+", ";
						}
				});
				if(message != null && message != "") {
						message = message.substring(0,message.lastIndexOf(","));
						$("#csfMsg").addClass("text-danger").html("* kindly upload "+message+" lookup files").show();
						setTimeout(function(){$("#csfMsg").html("").hide();},4000);
						return false;
				}
		}
		if(!alreadySave && !defaultFieldsFromOpportunity){
			   defaultCSFColumnSave();
		    	$("#saveMapFields").click();
		    }else if(!alreadySave && defaultFieldsFromOpportunity){
		    	$("#saveMapFields").click();
		    }
		//var serviceTypeSelected = $("#productTypeDisplay").text();
		var serviceTypeSelected =$("input[name='serviceType']:checked").val();
		/*if(serviceTypeSelected != null && serviceTypeSelected != "" && (serviceTypeSelected == "SRL" || serviceTypeSelected == "NRL")) {
				if($("#questions").val()==null || $("#questions").val()=="") {
						$("#customQuestionMsg").html("* Please enter atleast one custom question.");
						setTimeout(function(){$("#customQuestionMsg").html('');},3000);
						return false;
				}
		}*/
		// check if hybrid is selected then percentage allocated to india can't be null
		if($("#Hybrid:checked").val() != "" && $("#Hybrid:checked").val() != undefined){
				if(($("#idcAllocation").val()==null || ($("#idcAllocation").val()==""))){
					$("#perMsg").html("* Percentage Allocated to India can't be empty.");
					setTimeout(function(){$("#perMsg").html('');},3000);
					return false;
				}
				// check if percentage allocated to india is numeric only
				if(isNaN($("#idcAllocation").val())){
						$("#perMsg").html("* Percentage Allocated to India can be numeric only.");
						setTimeout(function(){$("#perMsg").html('');},3000);
						return false;
				}
		}
		if($("#asset").val() != "" && $("#asset").val() != undefined) {
				var fileName = $("#asset").prop("files")[0]['name'].toLowerCase();
				if(fileName.lastIndexOf(".pdf") != -1 || fileName.lastIndexOf(".csv") != -1 || fileName.lastIndexOf(".xls") != -1 || fileName.lastIndexOf(".xlsx") != -1 || fileName.lastIndexOf(".doc") != -1 || fileName.lastIndexOf(".docx") != -1) {
					
				}
				else {
						var extension = fileName.substring(fileName.lastIndexOf(".")+1, fileName.length);
						$("#refDocsMsg").html("* Selected filetype ("+ extension +") not allowed in Upload Asset Links.").show();
						setTimeout(function() {$("#refDocsMsg").hide()}, 5000);
						return false;
				}
 		}
		if($("#internalsow").val() != "" && $("#internalsow").val() != undefined) {
				var fileName = $("#internalsow").prop("files")[0]['name'].toLowerCase();
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
		if($("input[name='deliveryMethod']:checked").val() != null && $("input[name='deliveryMethod']:checked").val() != "") {
				if($("input[name='deliveryMethod']:checked").val() == "TP_Benza" || $("input[name='deliveryMethod']:checked").val() == "TP_Salesify" || $("input[name='deliveryMethod']:checked").val() == "TP_InternalResults") {
						if($("#rate_partner").val() == null || $("#rate_partner").val() == "") {
								$("#partnerRateMsg").html("* Please enter rate for partner.").show();
								setTimeout(function(){$("#partnerRateMsg").html('');},5000);
								return false;
						}
				}
		}
		if($("input[name='includeOrderFormatting']").is(":checked")) {
				if($("#order").val() == null || $("#order").val() == "") {
						$("#orderFormattingMsg").html("* Please select order for formatting.").show();
						setTimeout(function(){$("#orderFormattingMsg").html('');},3000);
						return false;
				}
		}
		if($("#completionDate").val() == null || $("#completionDate").val() == ""|| $("#completionDate").val()== undefined) {
			$("#completionMsg").html("* Please select Completion Date.").show();
			setTimeout(function(){$("#completionMsg").html('');},3000);
			return false;
	 	}
		
		if($("#campaignManager").val() == null || $("#campaignManager").val() == ""|| $("#campaignManager").val()== undefined) {
			$("#campaignManagerMsg").html("* Please select Campaign Manager.").show();
			setTimeout(function(){$("#campaignManagerMsg").html('');},3000);
			return false;
	 	}
		var serviceType=$("input[name='serviceType']:checked").val()!=undefined?$("input[name='serviceType']:checked").val():'';

		/*if(serviceType=='Programatic'&& ($("#leadcommit").val() && parseInt($("#leadcommit").val())>999999999)){
			$("#leadcommitMsg").html("* Please enter lead commit max 999999999 ").show();
			setTimeout(function(){$('#leadcommitMsg').html("");},3000);
			return false;
		}else if(serviceType!='Programatic' &&($("#leadcommit").val() && parseInt($("#leadcommit").val())>999999)){
			$("#leadcommitMsg").html("* Please enter lead commit max 999999 ").show();
			setTimeout(function(){$('#leadcommitMsg').html("");},3000);
			return false;
		}*/
		
		/*var numbers = /^[0-9]+$/;
		if(!$("#leadcommit").val().match(numbers)){
			$("#leadcommitMsg").html("Please enter only number in lead Commit value .").show();
			setTimeout(function(){$('#leadcommitMsg').html("").hide();},3000);
			return ;
		}*/
		
		var numbers = /^[0-9]+$/;
		if($('#bonus_leads').val()!="" && $('#bonus_leads').val() >0 && !$("#bonus_leads").val().match(numbers)){
			$("#salesOrderNoOfLeadsMsg").html("Please enter only number in Bonus leads value .").show();
			setTimeout(function(){$('#salesOrderNoOfLeadsMsg').html("").hide();},3000);
			return ;
		}
		
		if($("#rate").val() ==null || $("#rate").val() == ""|| $("#rate").val() == undefined){
			$("#salesorderrateMsg").html("* Please enter Rate ").show();
			setTimeout(function(){$('#salesorderrateMsg').html("");},3000);
			return false;
		}
		
		
		if( /\,/.test( $('#rate').val() ) ) {
			$("#salesorderrateMsg").html("Please enter rate without comma .").show();
			setTimeout(function(){$('#salesorderrateMsg').html("").hide();},3000);
			return ;
		}
		
		 var revenueMin = 0;
		 var revenueMax = 0;
		 if($("#revenue").val() && $("#revenue").val().indexOf("+")!= -1 ){
				 revenueMin = $("#revenue").val().split("+")[0].trim().substring(1,$("#revenue").val().split("+")[0].length);
		 }else if($("#revenue").val()){
				 revenueMin = $("#revenue").val().trim().substring(1,$("#revenue").val().length);
			 }
		 if($("#revenueMax").val()){
			 revenueMax = $("#revenueMax").val().trim().substring(1,$("#revenueMax").val().length);
		 }
		
		 if(revenueMin==10000000001 && revenueMax>0&& parseInt(revenueMin) > parseInt(revenueMax)){
				$("#revenueMsg").html("* Revenue Min cannot be greater than Revenue max.").show();
				setTimeout(function(){$('#revenueMsg').html("");},4000);
				document.getElementById('leadInfo').scrollIntoView();
				return false;
		 }
		 else if(revenueMin>=0 && revenueMin!=10000000001 && parseInt(revenueMin) > parseInt(revenueMax)){
				$("#revenueMsg").html("* Revenue Min cannot be greater than Revenue max.").show();
				setTimeout(function(){$('#revenueMsg').html("");},4000);
				document.getElementById('leadInfo').scrollIntoView();
				return false;
		 }
		
		 var empSizeMin ='';
		 var empSizeMax = '';
		 if($("#empSize").val() && $("#empSize").val().indexOf("+")!= -1 ){
				 empSizeMin = $("#empSize").val().split("+")[0];
				 
		 }else if($("#empSize").val()){
				 empSizeMin = $("#empSize").val();
				
			 }
		 if($("#empSizeMax").val()){
			 empSizeMax = $("#empSizeMax").val();
		 }
		 
		if(empSizeMin && empSizeMax && parseInt(empSizeMin) > parseInt(empSizeMax)){
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
		 
		$("#loadOrderRecordsLoader").show();
		var vendorOrderArr=[];
	/*	var vendorOrderArr=$("#deliverymethodtable").data('vendorDeliveryOrder').selectedVendorsList;
		vendorOrderArr=vendorOrderArr.filter(t => t.vendorId!=null);*/
	
		var operation="update";
		var accountID=$("#sfaccountID").val();
		var opportunityID=$("#opportunityID").val();
		
		var completionDate=$("#completionDate").val();
		if(completionDate!= "" && completionDate != undefined) {
			completionDate = completionDate.replace(/-/g, '/')
		}else{
			completionDate = null;
		}
		
		var date = document.getElementById("launchDate").value;
		var time = document.getElementById("launchTime").value;
		var datetokens=date.split("-");
	    day=datetokens[2];
	    month=datetokens[1]-1;
	    year=datetokens[0];	
		if(date!= "" && date != undefined && time!= "" && time != undefined) {
	    	var launchDate = date+" "+time;
	    	var launchDateTime = new Date(launchDate);
	    	
	    }else{
	    	var launchDateTime = null;
	    }
		if($("input[name='relationship']:checked").val()=="Direct") {
				$("#endCustomerName").val('');
		}
		
		var serviceData=JSON.stringify({"username":user});
		var excludednc=$("input[name='excludednc']").is(":checked")?'Y':'N';
		var flowToCW=$("input[id='flowtocw']").is(":checked")?'Y':'N';
		var yesOpportunity=$("input[name='yesOpportunity']").is(":checked")?'Y':'N';
		var includeOrderFormatting=$("input[name='includeOrderFormatting']").is(":checked")?'Y':'N';
		var deliveryMethod=$("input[name='deliveryMethod']:checked").val()!=undefined?$("input[name='deliveryMethod']:checked").val():'';
		var relationship=$("input[name='relationship']:checked").val()!=undefined?$("input[name='relationship']:checked").val():'';
		var serviceType=$("input[name='serviceType']:checked").val()!=undefined?$("input[name='serviceType']:checked").val():'';
		var mobileMandatory=$("input[name='mobileMandatory']:checked").val()!=undefined?$("input[name='mobileMandatory']:checked").val():'';
		if($("country").val()!=''){
			var region = "specificCountries";
		}else{
			var region='';
		}
		
		var suppressionList=$("input[name='SUPPRESSION_LIST']:checked").val()!=undefined?$("input[name='SUPPRESSION_LIST']:checked").val():'';
		prefillFormatingOrders();
		prefillYesFromOppr();
		
		var fieldval="product_type="+serviceType+"&customer_type="+relationship+"&companyname="+encodeURIComponent($("#accountName").val())+"&client_base="+$("#clientBase").val()+"&rate="+$("#rate").val()+"&campaign_value="+$("#totalValue").val()+"&currency="+$("#currency").val()+"&delivery_region="+region+"&account_id="+accountID+"&sf_opportunityid="+opportunityID+"&workorder_id="+JSON.parse(selectedRecordData.workorder).workorder_id_text+"&campaign_manager="+$("#campaignManager").val()+"&mobile_mandatory="+mobileMandatory+"&launchcountry="+$("#launchCountry").val();
		var fieldval1="&note="+$("#note").val()+"&revenue_min="+revenueMin+"&revenue_max="+revenueMax+"&employee_size_min="+empSizeMin+"&employee_size_max="+empSizeMax+"&delivery_day="+$("#deliveryDay").val()+"&delivery_time="+$("#deliveryTime").val()+"&delivery_number="+$("#deliveryNumber").val()+"&frequency="+$("input[name='frequency']:checked").val()+"&delivery_method="+deliveryMethod+"&idcAllocation="+$("#idcAllocation").val()+"&number_of_leads="+document.getElementById('totalLead').value+"&end_customer_name="+$("#endCustomerName").val()+"&suppression_list="+suppressionList+"&order_stage="+$("#statusType").val()+"&additional_criteria="+$("#additionalCriteria").val()+"&delivery_email="+deliveryEmail+"&programNameList="+programNames+"&excludedncflag="+excludednc+"&suppression_opportunity="+yesOpportunity+"&data="+serviceData+"&bonus_leads="+$("#bonus_leads").val()+"&includeorderformatting="+includeOrderFormatting+"&formattingorderid="+$("#formattingOrderId").val();
		var fieldval2="&vendorOrderRateList="+encodeURIComponent(JSON.stringify(vendorOrderArr))+"&custom_question="+encodeURIComponent($("#questions").val())+"&campaign_name="+encodeURIComponent($("#campaignName").val())+"&numberOfRecordsPerDomain="+$("#numberOfRecords").val()+"&rate_partner="+$("#rate_partner").val()+"&target_titles="+encodeURIComponent($("#targetTitle").val())+"&industry="+encodeURIComponent($("#industry").val())+"&jobfunction="+encodeURIComponent($("#jobFunction").val())+"&seniority_level="+encodeURIComponent($("#seniorityLevel").val())+"&yesFromOppr="+encodeURIComponent($("#yesFromOpportunityId").val());
		if(completionDate != null){
			fieldval2 = fieldval2+"&completiondate="+encodeURIComponent(completionDate);
		}
		if(launchDateTime != null){
			fieldval2 = fieldval2+"&launchdate="+encodeURIComponent(launchDateTime);
		}
		
		fieldval=fieldval+"&workorder_id_text="+JSON.parse(selectedRecordData.workorder).workorder_id_text;
		var formData=new FormData();
		var queryString=encodeURI(fieldval+fieldval1)+fieldval2;
		if(role=="dmin") {
				queryString="workorder_id="+JSON.parse(selectedRecordData.workorder).workorder_id_text+"&note="+$("#note").val();
				queryString=encodeURI(queryString);
		}
		else {
				var sowfile=$("#sow")[0].files[0];
				if(sowfile)
						formData.append("sow", sowfile);
				var assetfile=$("#asset")[0].files[0];
				if(assetfile)
						formData.append("asset", assetfile);
				var pdffile=$("#pdfTemplate")[0].files[0];
				if(pdffile)
						formData.append("pdfTemplate", pdffile);
				var pdfmappingfile=$("#pdfMapping")[0].files[0];
				if(pdfmappingfile)
						formData.append("pdfMapping", pdfmappingfile);
				
				for(var i=0; i<nalFileCount; i++) {
					if($("#suppressionList_"+i)[0] != undefined){
					 var suppressionFile=$("#suppressionList_"+i)[0].files[0];
					 formData.append("suppressionFile"+i, suppressionFile);
					}
					
				}
				for(var i=0; i<fileCount; i++) {
					if($("#pcsuppressionfile_"+i)[0] != undefined){
					 var pcsuppressionFile=$("#pcsuppressionfile_"+i)[0].files[0];
					 formData.append("pcsuppressionFile"+i, pcsuppressionFile);
					}
					
				}
				for(var i=0; i<assetFileCount; i++) {
					if($("#assetFiles_"+i)[0] != undefined){
					 var assetFile=$("#assetFiles_"+i)[0].files[0];
					 formData.append("assetFile"+i, assetFile);
					}
				}
				
				if(region =="specificCountries"){
					formData.append("volumeGeography",createSpecificCountryData());
				}else{
					formData.append("volumeGeography",createCountryStateData());
				}
				var internalSow=$("#internalsow")[0].files[0];
				if(internalSow)
						formData.append("internalSow", internalSow);
		}
		if(vendorOrderArr.length>0){
			$.confirm({
				'message'	: 'Order is already assigned to vendors. Do you want to notify vendors about the order update ?',
				'buttons'	: {
					'<span class="fa fa-check fa-2x" aria-hidden="true"></span> Yes'	: {
						'class'	: 'yes',
						'action': function(){
							queryString=queryString+"&notifyVendor="+true;
							update(queryString,formData);
						}
					},
					'<span class="fa fa-times fa-2x" aria-hidden="true"></span>  No'	: {
						'class'	: 'no',
						'action': function(){
							update(queryString,formData);
						}	// Nothing to do in this case. You can as well omit the action property.
					}
				}
			});
		}else{
			update(queryString,formData);
		}
		
}

function update(queryString,formData){
	debugger;
	$.ajax({
		url			:	"addupdatesalesorder.do?"+queryString,
		data		:	formData,
		contentType	:	false,
		cache		:	false,
		processData	:	false,
		type		:	"POST",
		success		:	function(data, textStatus, xhr) {
								$("#loadOrderRecordsLoader").hide();
								data = JSON.parse(data);
								if(data.message=="suppressionListError") {
										$("#salesOrderSuppressionMsg").removeClass("text-success").addClass("text-danger").html("One of the columns from domain,accountname,dunsnumber and email is mandatory").show();
										setTimeout(function(){$('#salesOrderSuppressionMsg').hide();},5000);
								}
								else if(data.message=="NALError") {
										$("#salesOrderNALMsg").removeClass("text-success").addClass("text-danger").html("One of the columns from domain,accountname,dunsnumber and email is mandatory").show();
										setTimeout(function(){$('#salesOrderNALMsg').hide();},5000);
								}
								else {
									$('#cp_link span').removeClass("fa-minus").addClass("fa-plus");
									$("#cpBlk").slideUp();
									//$("#deliverymethodtable").vendorDeliveryOrder('destroy')
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
									rowIdFile = [];
									fileCount = 1;
									rowIdNALFile = [];
									nalFileCount = 1;
									
									$("#loadOrderRecordsLoader").hide();
										$("#neworderpopModal").modal("hide");
										$("#pbg").modal("hide");
										$("#pbg-error").modal("hide");
										$("#pbg").modal("show");
										setTimeout(function() {
												$("#pbg").modal("hide");
												$('#loadBg').show();
												$("body").addClass("p-0");
												fetchTotalOrderCountForFilter();
												loadData();
										}, 3000);
								}
						},
		error		:	function(xhr, textStatus, errorThrow) {
								$("#loadOrderRecordsLoader").hide();
								closeNewOrderWin();
								$("#pbg-error").modal("show");
						}
	});
}


function loadLookups(selectedRecordData) {
	debugger;
		$.ajax({
				url			:	"loadlookups.do",
				async		:	false,
				success		:	function(data, textStatus, xhr) {
										llookupData=jQuery.parseJSON(data);
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
										for(var i=0;i<region.length;i++) {
												var rec=region[i];
												if(rec['name']==selregion) {
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
					error	:	function(xhr, textStatus, errorThrow) {
			 							console.log(xhr);
			 							console.log(textStatus);
			 							console.log(errorThrow);
			 							$("#dialog").dialog("close");
			 					}
		});
}



function showCountry(obj) {
	debugger;
		var country=lookupData['Country'];
		var region="";
		if(obj != undefined){
			$('#specificCountries').prop("checked", false);
			$('#specificCountriesDiv').hide();
		}
		if(!obj) {
				region=$("input[name='region']:checked").val();
		}
		else
				region=obj.id;
		var volGeogJson;
		var volGeog;
		if(selectedRecordData != null && selectedRecordData != "" && selectedRecordData != undefined && selectedRecordData.volumeGeography!= "") {
				volGeogJson=selectedRecordData.volumeGeography;
				volGeog=jQuery.parseJSON(volGeogJson);
		}
		var countryHTML='';
		var inputid;
		var percentid;
		var statsTR;
		var conCount="";
		var conPer="";
		for(var i=0;i<country.length;i++) {
				var rec=country[i];
				if(rec['parent']!=null && rec['parent']==region) {
						if(volGeog) {
								var countPer=checkCountryFields(rec['name'], volGeog.country, 0);
								if(countPer!="NA") {
										conCount=countPer.split("-")[0];
										conPer=countPer.split("-")[1];
								}
								else {
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
		if(role=='dain' || role=='dmin') {
				$("#countriesTR").find('*').prop("disabled",true);
		}
		if(region != null && region != "" && region != "undefined") {
				$(".regBlk").show();
		}
}

function isNumberKey(evt) {
		var charCode = (evt.which) ? evt.which : event.keyCode;
		if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
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

function checkCountryFields(country, volumeGeography, state) {
		var result="NA";
		if(volumeGeography.length>0) {
				for(var i=0; i<volumeGeography.length; i++) {
						var jsoncountry=volumeGeography[i];
						if(jsoncountry['name']==specificCountryObj[country.trim()] || jsoncountry['name']==country.trim()) {
								if(state==1) {
										result=jsoncountry['state'];
								}
								else
										result=jsoncountry['count']+"-"+jsoncountry['percent'];
						}
				}
		}
		return result;
}

function showStates(obj) {
	debugger;
		var volGeogJson;
		var volGeog;
		if(selectedRecordData != null && selectedRecordData != "" && selectedRecordData != undefined) {
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
		if(stateFromDB!='NA' && stateFromDB.length>1) {
				loop=stateFromDB.length;
		}
		// change image - to + and hide the opened states.
		if(innerhtml.indexOf("fa-minus")!=-1) {
				$(obj).find("span").toggleClass("fa-plus fa-minus");
				$("."+statesTR+"").hide();
				return;
		}
		else if(lastOpenedState) {
				// hiding the last opened state. and changing image from - to +
				var lastcountry=lastOpenedState.split("-")[0];
				$("#"+lastcountry).find("span").toggleClass("fa-plus fa-minus");
				$("."+lastOpenedState).hide();
		}
		lastOpenedState=statesTR;
		var state=lookupData['State'];
		var selectid=country+'-state';
		var inputid=country+'-statecount';
		var percentid=country+'-stateper';
		var toogleid=country+'-toogle';
		// creating one statehtml row for cache
		stateHTMLForCache='<tr><td width="34%"><div class="input-group"><div class="input-group-prepend"><button class="btn btn-outline-success btn-xs" type="button" id="'+toogleid+'" onclick="addNewState(this)" title="Add more states"><span class="fa fa-plus" aria-hidden="true"></span></button></div><select id="'+selectid+'" name="salesorderstate" class="form-control form-control-sm"> <option value="Select State">Select States</option>';
		var stateFound=false;
		for(var i=0;i<state.length;i++) {
				var rec=state[i];
				if(rec['parent']!=null && rec['parent']==country) {
						stateHTMLForCache=stateHTMLForCache+ '<option value="'+rec['name']+'">'+rec['name']+'</option>';
						stateFound=true;
				}
		}
		if(!stateFound) {
				return false;
		}
		stateHTMLForCache=stateHTMLForCache+ '</select></div></td><td width="33%"><input type="number" class="form-control form-control-sm" name="statecount" id="'+inputid+'" value="0" oninput="calculateStatePercent(this)" onkeypress="return isNumberKey(event)"></td><td width="33%"><div class="input-group input-group-sm"><input type="text" class="form-control form-control-sm" name="stateper" oninput="calculateStatePercent()" id="'+percentid+'" value="0"><div class="input-group-append"><span class="input-group-text">%</span></div></div></td></tr>';
		// cache state created.
		var stateHTML="";
		for(var j=0;j<loop;j++) {
				stateHTML=stateHTML+'<tr><td width="34%"><div class="input-group"><div class="input-group-prepend"><button class="btn btn-outline-success btn-xs" type="button" id="'+toogleid+'" onclick="addNewState(this)" title="Add more states"><span class="fa fa-plus" aria-hidden="true"></span></button></div><select id="'+selectid+'" name="salesorderstate" class="form-control form-control-sm"> <option value="Select State">Select States</option>';
				var stateFound=false;
				for(var i=0;i<state.length;i++) {
						var rec=state[i];
						if(rec['parent']!=null && rec['parent']==country) {
								if(stateFromDB[j] != null && stateFromDB[j] != "" && rec['name']==(stateFromDB[j])['name']) {
										stateHTML=stateHTML+ '<option value="'+rec['name']+'" selected>'+rec['name']+'</option>';
								}
								else
										stateHTML=stateHTML+ '<option value="'+rec['name']+'">'+rec['name']+'</option>';
								stateFound=true;
						}
				}
				if(!stateFound) {
						return false;
				}
				var stateFromDBPercent = 0;
				var count=0;
				if(stateFromDB != 'NA' && stateFromDB[j] != null && stateFromDB[j] != "") {
						stateFromDBPercent = (stateFromDB[j])['percent'];
						count=(stateFromDB[j])['count'];
				}
				stateHTML=stateHTML+ '</select></div></td><td width="33%"><input type="number" class="form-control form-control-sm" name="statecount" id="'+inputid+'" value='+count+' oninput="calculateStatePercent(this)" onkeypress="return isNumberKey(event)"></td><td width="33%"><div class="input-group input-group-sm"><input type="text" class="form-control form-control-sm" name="stateper" oninput="calculateStatePercent()" id="'+percentid+'" value='+stateFromDBPercent+'><div class="input-group-append"><span class="input-group-text">%</span></div></div></td></tr>';
		}
		var previousHTML=$("#"+statesTR).html();
		var finalhtml=previousHTML+stateHTML;
		if(previousHTML!=null && previousHTML.length>100) {
				$("."+statesTR).show();
				$(obj).find("span").toggleClass("fa-plus fa-minus");
				return;
		}
		else {
				finalhtml=stateHTML;
		}
		$("#"+statesTR).html(finalhtml);
		$(obj).find("span").toggleClass("fa-plus fa-minus");
		$("."+statesTR+"").show();
		if(role=='dain' || role=='dmin') {
			$("#"+statesTR).find('*').prop("disabled",true);
		}
}

function showStatePercent() {}

function addNewState(obj) {
		if(role=='amus'||role=='salesadminamus'||role=='salesamus'||role=='insidesalesamus'||role=='amusmarketing') {
				var innerSign=obj.innerHTML;
				var id=obj.id;
				var country=id.split("-")[0];
				if(innerSign.indexOf("fa-times")!=-1) {
						var rowNode=$(obj).parents("tr").first();
						rowNode.remove();
						return false;
				}
				$(obj).toggleClass("btn-outline-success btn-outline-danger");
				$(obj).find("span").toggleClass("fa-plus fa-times");
				var currentHtml=$("#"+country+"-statesTR").html();
				$("#"+country+"-statesTR").append(stateHTMLForCache);
		}
}

function createCountryStateData() {
	debugger;
		var countryNums=document.getElementsByName("countrycount");
		var countryPers=document.getElementsByName("countryper");
		var jsonData="";
		for(var i=0;i<countryNums.length;i++) {
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
		}else {
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

function openNoteHistory() {
		var orderNo=JSON.parse(selectedRecordData.workorder).workorder_id_text;
		$.ajax({
				url		:	"index.loadNoteHistory?orderID="+orderNo,
				success	:	function(result) {
									var resultValue = result.toString();
									if(resultValue != "") {
											$("#noteHistoryTable tbody").empty();
											$('#noteHistoryTable').find('tbody').append(result);
									}
							}
		});
}

function isNumberKey(evt) {
		var charCode = (evt.which) ? evt.which : event.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57))
				return false;
		return true;
}

function checkCustomQuestionAlreadyExists() {
	var duplicateQuestion = 0;
	var customQuestion = $("#customQuestions .card-body").html();
	if(customQuestion != null && customQuestion != "") {
			var customQuestionArray = [];
			customQuestionArray = customQuestion.split("\n");
			$(customQuestionArray).each(function(iIndex, sElement) {
					if(sElement != null && sElement != "") {
						if(sElement.indexOf("<p") != -1) {
									sElement = sElement.substring(sElement.indexOf(".")+2, sElement.length);
									if(sElement.trim().toLowerCase()==$("#custom_question").val().trim().toLowerCase()) {
											duplicateQuestion++;
									}
									
							}
					}
			});
	}
	return duplicateQuestion;
}

function showDuplicateQuestionMsg(editIndex) {
	$("#successReasonDetailMsg").html("The custom question '"+$("#custom_question").val()+"' already exists.").show();
	setTimeout(function(){$('#successReasonDetailMsg').html("");},4000);
	return false;
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



function loadCallingAgent(index,serviceType) {
	$('#LoadAgentList').show();
	//var ID=orderID;
	var ID = recOrderViewArr[index].workorder.workorder_id_text;
	var productType=serviceType;
	var DataAgentList = document.getElementById("DataAgentList");
	var ListmodalHTML='<input type="hidden" name="AgentOrderID" id="AgentOrderID" value="'+ID+'"><input type="hidden" name="assign_productType" id="assign_productType" value="'+productType+'">';;
	$.ajax({         
			url			:	"loadCallingAgentList?orderID="+ID,
			async		:	false,
			success		:	function(data) {
									$('#LoadAgentList').hide();
									var peopleList= jQuery.parseJSON(data);
									objData= sortJSON(peopleList, 'Checked');
									var array = [];
									if(objData.length > 0){
											for (var key in objData) {
													var emailPrefix=objData[key].mail.substr(0,objData[key].mail.lastIndexOf('@'));
													if(objData[key].Checked === true){
															ListmodalHTML = ListmodalHTML + '<div id="checkboxRow" class="row mt-2"><div id="checkboxCol" class="col-md-12"><div id="customCheckboxDiv" class="custom-control custom-checkbox"> <input type="checkbox" class="custom-control-input" id="'+ objData[key].mail +'" value="'+ objData[key].mail +'" checked onclick="toggleSelectBox(this);"><label class="custom-control-label" for="'+ objData[key].mail +'">' + objData[key].Name + ' - <small class="text-muted">'+objData[key].mail+'</small></label></div></div></div><div id="selectBoxRow" class="row my-2"><div id="selectBoxCol" class="col-md-12"><select name="'+emailPrefix+'[]" class="country-selectbox input-sm w-100" id="'+emailPrefix+'" tabindex="45" multiple></select></div></div>';
															
													}
													else {
														ListmodalHTML = ListmodalHTML + '<div id="checkboxRow" class="row mt-2"><div id="checkboxCol" class="col-md-12"><div id="customCheckboxDiv" class="custom-control custom-checkbox"> <input type="checkbox" class="custom-control-input" id="'+ objData[key].mail +'" value="'+ objData[key].mail +'" onclick="toggleSelectBox(this);"><label class="custom-control-label" for="'+ objData[key].mail +'">' + objData[key].Name + ' - <small class="text-muted">'+objData[key].mail+'</small></label></div></div></div><div id="selectBoxRow" class="row my-2"><div id="selectBoxCol" class="col-md-12"><select name="'+emailPrefix+'[]" class="country-selectbox input-sm w-100" id="'+emailPrefix+'" tabindex="45" multiple></select></div></div>';
													}
											}
									}
									else {
											ListmodalHTML = ListmodalHTML + '<div class="checkbox"> <label> No records Found, Please Try Again </label></div>';
									}
									DataAgentList.innerHTML = ListmodalHTML;
									/** Initializing select2js */
									$('.country-selectbox').select2({theme:'bootstrap4', containerCssClass:':all:', placeholder:"Select an option", allowClear:true});
									for (var i=0;i<objData.length;i++) {
											var emailPrefix=objData[i].mail.substr(0,objData[i].mail.lastIndexOf('@'));
											var id="#"+emailPrefix;
											$(id).html(countryvalues);
											if(objData[i].Checked === true){
													array.push(objData[i].country.split(","));
													$(id).val(array[i]).trigger('change');
											}
											else {
													$(id).next().hide();
											}
									}
							},
			statusCode	:	{
								400: function() {
										$("#errorAgent").html("* client error please try again.").show();
								},
								500: function() {
										$("#errorAgent").html("* Internal Server Error, Please Try Again").show();
								}
							},
			error		:	function(xhr, textStatus, errorThrow) {
									$('#LoadAgentList').hide();
									$("#errorAgent").html("Please Try Again").show();
									setTimeout(function() {
											$("#workOrderModal").modal('hide');
											window.location.href=serContext+"/amusorder.do";
									}, 4000);
							}
	});
}

function sortJSON(data, key) {
	return data.sort(function (a, b) {
			var x = a[key];
			var y = b[key];
			return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	});
}

function uncheckAllAgents() {
	$('input[type="checkbox"]:checked').prop('checked',false);
}


function AssignCallingAgent() {
	debugger;
	$('#LoadAgentList').show();
	var Assignee_orderid = $("#AgentOrderID").val();
	var productType=$("#assign_productType").val();
	var user = user;
	var countryName = $('#country').find(":selected").text();
	var checkValues = $('input[type="checkbox"]:checked').map(function(){return $(this).val();}).get();
	var emailCountryMap = new Object();
	for (var key in checkValues) {
			if(checkValues[key] !="on"){
			
			var idkey="#"+checkValues[key].substr(0,checkValues[key].lastIndexOf('@'));
			emailCountryMap[checkValues[key]] = $(idkey).find(":selected").text();
			/* extract multiple selected options */
			var countries = [];
			$.each($(""+idkey+" option:selected"), function() {
					countries.push($(this).val());
			});
			emailCountryMap[checkValues[key]]=countries.join(",");
			}
	}
	$.ajax({
			url				:	"amusassignagents?modifier="+userName+"&order_id="+Assignee_orderid+"&product_type="+encodeURIComponent(productType),
			crossDomain 	:	true,
			contentType		:	false,
			processData		:	false,
			type			:	'POST', data:JSON.stringify(emailCountryMap),
			success			:	function(json, textStatus, xhr) {
										$('#LoadAgentList').hide();
										$("#msgAgent").html("Agents Assigned Successfully For WorkOrder").show();
										setTimeout(function() {
												$("#workOrderModal").modal('hide');
												fetchTotalOrderCountForFilter();
												loadData();
										}, 3000);
								},
			error			:	function(json, textStatus, xhr) {
										$('#LoadAgentList').hide();
										$("#errorAgent").html("Please Submit Again").show();
								}
	});
}

function deleteUnprocessedLeads(index) {
	var orderId = recOrderViewArr[index].workorder.workorder_id_text;
	debugger;
	$.confirm({
				'message'	:	'Are you sure you want to delete unprocessed leads?',
				'buttons'	:	{
									'<span class="fa fa-check fa-2x" aria-hidden="true"></span> Yes' : {
										'class'		:	'yes',
										'action'	:	function() {
															var serviceData=JSON.stringify({"username":userName});
																$("#deleteUnprocessedRecordsLoader").show();
																$.ajax({
																		url			:	'amusDeleteUnprocessedLeads.do?order_id='+orderId+"&username="+userName,
																		success		:	function(data, textStatus, xhr) {
																								$("#deleteUnprocessedRecordsLoader").hide();
																								if(data != null) {
																										if(data == "success") {
																												$("#successMsg").html("* Unprocessed leads has been deleted successfully.").show();
																												setTimeout(function(){$("#successMsg").html('');},3000);
																												return false;
																										}
																										else if(data == "error") {
																												$("#errorMsg").html("* Exception occurred while deleting the unprocessed leads.").show();
																												setTimeout(function(){$("#errorMsg").html('');},validationMessageTimeout);
																												return false;
																										}
																								}
																						},
																		error		:	function(xhr, textStatus, errorThrow) {
																								$("#deleteUnprocessedRecordsLoader").hide();
																								$("#errorMsg").html("* Error occurred while deleting the unprocessed leads.").show();
																								setTimeout(function(){$("#errorMsg").html('');},validationMessageTimeout);
																								return false;
																						}
																});
														}
									},
									'<span class="fa fa-times fa-2x" aria-hidden="true"></span>  No' : {
										'class'		:	'no',
										'action'	:	function(){}	// Nothing to do in this case. You can as well omit the action property.
									}
								}
	});
}

function archiveOrder(orderId) {
	debugger;
	$.confirm({
			'message'	:	'Are you sure you want to Archive the Order?',
			'buttons'	:	{
								'<span class="fa fa-check fa-2x" aria-hidden="true"></span> Yes' : {
									'class'		:	'yes',
									'action'	:	function(){
														$("#deleteUnprocessedRecordsLoader").show();
														$.ajax({
															url			:	"amusarchiveOrder?order_id="+orderId+"&user="+user,
															type		:	'DELETE',
															contentType	:	false,
															processData	:	false,
															crossDomain	:	true,
															success		:	function(data, textStatus, xhr) {
																					$("#deleteUnprocessedRecordsLoader").hide();
																					fetchTotalOrderCountForFilter();
																					loadData();
																			},
															error		:	function(xhr, textStatus, errorThrow) {
																					$("#deleteUnprocessedRecordsLoader").hide();
																					$("#errorMsg").html("* Error occurred while Archiving Order.").show();
																					setTimeout(function(){$("#errorMsg").html('');},validationMessageTimeout);
																					return false;
																			}
														});
													}
								},
								'<span class="fa fa-times fa-2x" aria-hidden="true"></span>  No' : {
									'class'		:	'no',
									'action'	:	function(){}	// Nothing to do in this case. You can as well omit the action property.
								}
							}
	});
}

function fetchStatusTypeDataForFilter(){
	sequence = 0;
	sequenceForQuery = 0;
	pageCount = 1
	document.getElementById('pageValue').innerHTML = "P"+pageCount;
	//fetchTotalOrderCountForFilter();
	fetchStatusTypeData();
}

function fetchStatusTypeData() {
	selectCreatedByChecked = false;
	selectProductTypeChecked = false;
	$('#loadBg').show();
	$("body").addClass("p-0");
	setTimeout(function() {
		fetchTotalOrderCountForFilter();	
		loadData();
	}, 1000);
}

function isValidateComma(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode;
	if (charCode == 44)
			return false;
	return true;
}

function showRateForPartner() {
	if($("input[name='deliveryMethod']:checked").val() == "TP_Benza" || $("input[name='deliveryMethod']:checked").val() == "TP_Salesify" || $("input[name='deliveryMethod']:checked").val() == "TP_InternalResults") {
			$("#partnerRateDiv").show();
	}
	else {
			$("#partnerRateDiv").hide();
	}
}

function displayOrders(){
	debugger;
	$('#orderNameSpin').show();
	var productType = $("input[name='serviceType']:checked").val();
	$.ajax({
		url		:	"getSalesOrders.do?accountId="+$("#sfaccountID").val()+"&productType="+productType,
		success	:	function(data) {
			ordersObj=JSON.parse(data);
			var orderIdVal = $("#order").val().split(",");
			html = '';
			for(i=0;i<ordersObj.length;i++) {
				if(orderIdVal != null && orderIdVal != "" && orderIdVal.indexOf(ordersObj[i].campaign_name)>-1 && ordersObj[i].workorder_id_text!=JSON.parse(selectedRecordData.workorder).workorder_id_text) {
					html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectOrders(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=order'+i+' value="'+ordersObj[i].workorder_id_text+'" checked><label class="form-check-label" for="order'+i+'">'+ordersObj[i].campaign_name+'</label></div></div>';
				}
				else if(ordersObj[i].workorder_id_text!=JSON.parse(selectedRecordData.workorder).workorder_id_text){
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
			var code=ordersObj[i].workorder_id_text;
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
	filterSearchFormattingOrderId = true;
}

function selectOrders(event) {
	var orderIdCampaignNameJsonObject = {};
	var $target = $(event.currentTarget),
	val = $target.find('input[type="checkbox"]').next().text(),
	orderIdVal = $target.find('input[type="checkbox"]').attr('value'),
	$inp = $target.find('input[type="checkbox"]'),
	idx;
	
	if(options == "" && orderIdOptions == ""  && prefillFormattingOrderId == true) {
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
	else {
		if(filterSearchFormattingOrderId == true && prefillFormattingOrderId == true) {
			if($("#formattingOrderIdCampaignName").val() != null && $("#formattingOrderIdCampaignName").val() != "") {
				var data = JSON.parse($("#formattingOrderIdCampaignName").val());
				$.each(data, function(key, value){
					for(id in value) {
						if(id!="pvrDlvryDuration"){
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
	}
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
		if(Object.keys(orderIdCampaignNameJsonObject).length == 1) {
			orderIdCampaignNameJsonArray.push(orderIdCampaignNameJsonObject);
		}
		else {
			$.each(orderIdCampaignNameJsonObject, function(key, value) {
				var formattingOrderJsonObject = {};
				formattingOrderJsonObject[key] = value;
				orderIdCampaignNameJsonArray.push(formattingOrderJsonObject);
			});
		}
	}
	return false;
}
	
function prefillFormatingOrders(){
	var pvrDlvryDurationObject = {};
	var orderIdCampaignNameJsonObject = {};
	pvrDlvryDurationObject["pvrDlvryDuration"]=$("input[name='deliveryTimeCheck']:checked").val();
	if(orderIdCampaignNameJsonArray.length == 0 && ($("#order").val() != null || $("#order").val() != "")){
		if(options == "" && orderIdOptions == "" && prefillFormattingOrderId == true) {
			if($("#formattingOrderIdCampaignName").val() != null && $("#formattingOrderIdCampaignName").val() != "") {
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
	return false;
}

function selectedChange(obj) {
	$("select option:selected").each(function() {
			if($("#country").val()=="UK") {
					document.getElementById('statelabel').innerHTML="county";
			}
			else if($("#country").val()!="UK") {
					document.getElementById('statelabel').innerHTML="state";
			}
	});
}

function loadWorkOrderFile(file, obj){
	var filename=obj.innerHTML;
	var order_id=JSON.parse(selectedRecordData.workorder).workorder_id_text;
	var url=obj.origin+"/dc/amus.loadorderfile?order_id="+order_id+"&file="+file+"&filename="+filename;
	window.open(url,'_blank');
}


function loadWorkOrderFileForAsset(file, fimename){
	var order_id=JSON.parse(selectedRecordData.workorder).workorder_id_text;
	document.location.href ='amus.loadorderfile?order_id='+order_id+"&file="+file+"&filename="+fimename;
}

function calculateCountryPercent(obj){
	var total = document.getElementById('totalLead').value;
	var inp=document.getElementsByName('countrycount');
	var per=document.getElementsByName('countryper');
	var sum=0;
	for(var i=0;i<inp.length;i++) {
		if(obj.name=='countryper') {
			if(per[i].value > 0) {
				inp[i].value=eval(total)*per[i].value/100;
				sum=eval(sum)+eval(inp[i].value);
			}
		}	
		else {
			if(inp[i].value > 0) {
				var decimal=(inp[i].value/total)*100;
				per[i].value=decimal.toFixed(2);
				sum=eval(sum)+eval(inp[i].value);
			}
		}
	}
	if(sum>total) {
		$("#regionMsg").addClass("alert-danger");
		$('#regionMsg').show().html('* The input number for this country is exceeding the total count. Kindly make sure that the sum of country numbers is less that total leads');
		setTimeout(function(){
			$('#regionMsg').hide();
		},6000); 
		obj.value=0;
		$(obj.parentElement.nextSibling.firstChild.firstChild).val(0);
	}
}

function calculateStatePercent(obj) {
	var id=obj.id;
	var stateCount=obj.value;
	var country=id.split("-")[0];
	var countrycount=$("#"+country+"-count").val();
	var statecounts=document.getElementsByName("statecount");
	var statepers=document.getElementsByName("stateper");
	var sum=0;
	for(var i=0;i<statecounts.length;i++) {
		var temp=statecounts[i];
		var per=statepers[i];
		if(temp.value > 0 && temp.id==obj.id){
			sum=sum+eval(temp.value);
			var decimal=(temp.value/countrycount)*100;
			per.value=decimal;
		}
	}
	if(sum>(eval(countrycount))) {
		$("#regionMsg").addClass("alert-danger");
		$('#regionMsg').show().html('* Total state sum is going heigher than allocated country value.');
		setTimeout(function(){
			$('#regionMsg').hide();
		},5000); 	
		obj.value=0;
		$(obj.parentElement.nextSibling.firstChild.firstChild).val(0);
	}
}

//function to display Popup
function showChild(obj) { 
	document.getElementById('abc').style.display = "block"; 
	var fieldval="accountID="+obj.id;
	$.ajax({
			url		:	"index.loadcontact?"+fieldval,	
			success	:	function(data, textStatus, xhr){
								var sdata=jQuery.parseJSON(data);
								var shtml="<tr class='hd'><td class='hdTitle'>Name</td><td class='hdTitle'>Email</td><td class='hdTitle'>Workphone</td><td class='hdTitle'>Mobilephone</td><td class='hdTitle'>Title</td></tr>";
								for(var i=0;i<sdata.length;i++) {
										var rec=sdata[i];
										shtml=shtml+"<tr><td>"+rec.name+"</td><td>"+rec.email+"</td><td>"+rec.workPhone+"</td><td>"+rec.mobilePhone+"</td><td>"+rec.title+"</td></tr>";
								}
								$("#accountcontact").html(shtml);
						},
			error	:	function(xhr, textStatus, errorThrow) {
								console.log(xhr);
								console.log(textStatus);
								console.log(errorThrow);
								$("#dialog" ).dialog("close");
						}
	});
}

//function to hide Popup
function closeChild() { 
	document.getElementById('abc').style.display = "none";
}

function loadCountriesLookup(){
	/*var finalURL = "loadcountries.do";
	$.ajax({
			url		:	finalURL,
			success :	function(result) {
								countryvalues = result.toString();
						}
	});*/
	
	
	countryvalues=specificCountryObj;
}

function toggleSelectBox(eventCheckbox){
	var checkBoxId=eventCheckbox.id;
	var id="#"+checkBoxId.substr(0,checkBoxId.lastIndexOf('@'));
	if(eventCheckbox.checked) {
			$(id).next('span').show();
	}
	else{
			$(id).next('span').hide();
	}
}

function SuppressionFile() {
	document.location.href ='downloadSuppressionFile.do?opportunityId='+$("#opportunityID").val()+"&orderId="+JSON.parse(selectedRecordData.workorder).workorder_id_text;
}

function NALFile() {
	document.location.href ='downloadNALFile.do?opportunityId='+$("#opportunityID").val()+"&orderId="+JSON.parse(selectedRecordData.workorder).workorder_id_text;
}

function isNumberKeyRevenue(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 46 && charCode != 45 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}


$(document).ready(function(){
	debugger;
	console.log("load product type::");
	//loadProductTypes();
	console.log("load createdby::");
	//$("#createdby").select2();
	//loadCreatedBy();
		$('#whitepaper').on('hidden', function() {
				$(this).data('modal', null);
				$("#whitepaper").remove();
		});
		// For Multiple Modal popup
		$(document).on('show.bs.modal', '.modal', function (event) {
				var zIndex = 1040 + (10 * $('.modal:visible').length);
				$(this).css('z-index', zIndex);
				setTimeout(function() {
					$('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
				}, 0);
		});
		$("#programTbl").dataTable();
		$("#addNewProgramBtn").click(function() {
				$("#addProgramRow .panel").removeClass('panel-warning').addClass('panel-success');		
				$("#addProgramRow .panel-heading").html('<span class="fa fa-plus" aria-hidden="true"></span> Add New Program');
				$("#addProgramRow").slideDown('slow');
				$("#addNewProgramBtn, #saveProgramBtn").hide();
				$("#addProgramBtn").show();
				$("#addEditProgramName").val("");
		});
		$("#closeProgramBtn").click(function() {
				$("#addProgramRow").slideUp('fast');
				$("#addNewProgramBtn").show();
		});
		$("#addCustomQuestion").click(function() {
				if(questionIndex!='') {
						cqIndex=questionIndex;
						questionIndex='';
				}
				if($("#custom_question").val() != null && $("#custom_question").val() != "") {
						if(editIndex != '') {
								if ($("#decisionCustomQuestion").is(":checked")==true) {
										cqIndex=1;
										var hiddenCustomQuestion = $("#customQuestions .card-body").find('p').text();
										var duplicateQuestion = checkCustomQuestionAlreadyExists();
										if(duplicateQuestion > 0) {
												showDuplicateQuestionMsg('');
										}
										else {
												$("#q_"+cqIndex).text('');
												$("#q_"+cqIndex).text(cqIndex+". " + $("#custom_question").val() + "\n");
												$("#custom_question").val('');
												$('#decisionCustomQuestion').prop('checked', false);
												cqIndex++;
												if(hiddenCustomQuestion != null && hiddenCustomQuestion != "") {
														var hiddenCustomQuestionArray = [];
														hiddenCustomQuestionArray = hiddenCustomQuestion.split("\n");
														$(hiddenCustomQuestionArray).each(function(iIndex, sElement) {
																if(sElement != null && sElement != "") {
																		$("#q_"+cqIndex).text(cqIndex+"." + sElement.substring(sElement.indexOf(".")+1, sElement.length) + "\n");
																		$("#custom_question").val('');
																		cqIndex++;
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
								if(cqIndex<=20) {
										var $addFile = $("<p id='q_"+cqIndex+"' ondblclick='editCustomQuestion("+cqIndex+")'></p>");
										$("#customQuestions").show();
										$("#customQuestions .card-body").append($addFile);
										if ($("#decisionCustomQuestion").is(":checked")==true) {
												cqIndex=1;
												var hiddenCustomQuestion = $("#customQuestions .card-body").find('p').text();
												var duplicateQuestion = checkCustomQuestionAlreadyExists();
												if(duplicateQuestion > 0) {
														showDuplicateQuestionMsg('');
												}
												else {
														$("#q_"+cqIndex).text('');
														$("#q_"+cqIndex).text(cqIndex+". " + $("#custom_question").val() + "\n");
														$("#custom_question").val('');
														$('#decisionCustomQuestion').prop('checked', false);
														cqIndex++;
														if(hiddenCustomQuestion != null && hiddenCustomQuestion != "") {
																var hiddenCustomQuestionArray = [];
																hiddenCustomQuestionArray = hiddenCustomQuestion.split("\n");
																$(hiddenCustomQuestionArray).each(function(iIndex, sElement) {
																		if(sElement != null && sElement != "") {
																				$("#q_"+cqIndex).text(cqIndex+"." + sElement.substring(sElement.indexOf(".")+1, sElement.length) + "\n");
																				$("#custom_question").val('');
																				cqIndex++;
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
														$("#q_"+cqIndex).text(cqIndex+". " + $("#custom_question").val() + "\n");
														$("#custom_question").val('');
														cqIndex++;
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
		});
		
		$("#submitCustomQuestion").click(function() {
				setTimeout(function(){$("#customQuestionModal").modal('hide');},1000);
				editIndex='';
				cqIndex = 1;
				var customQuestion = $("#customQuestions .card-body").find('p').text();
				$("#customQuestions .card-body").empty();
				if(customQuestion != null && customQuestion != "") {
						var customQuestionArray = [];
						customQuestionArray = customQuestion.split("\n");
						var tmp = [];
						$(customQuestionArray).each(function(iIndex, sElement) {
								if(sElement != null && sElement != "") {
										var $addFile = $("<p id='q_"+cqIndex+"' ondblclick='editCustomQuestion("+cqIndex+")'></p>");
										$("#customQuestions").show();
										$("#customQuestions .card-body").append($addFile);
										$("#q_"+cqIndex).text(cqIndex+"." + sElement.substring(sElement.indexOf(".")+1, sElement.length) + "\n");
										cqIndex++;
										tmp.push(sElement.substring(sElement.indexOf(".")+2, sElement.length));
										$("#questions").val(tmp.join("||"));
								}
						});
				}
				else {
						$("#customQuestions").hide();
				}
		});

		$("#searchDirectory").on("keyup", function() {
				var g = $(this).val();
				$(".pre-scrollable #checkboxRow #checkboxCol label").each( function() {
						var s = $(this).text();
						if (s.indexOf(g)!=-1) {
								$(this).closest('.row').show();
								$('#selectBoxRow, #selectBoxCol').removeClass('HideDivSN');
						}
						else {
							$(this).closest('#checkboxRow, #selectBoxRow, #selectBoxCol').hide();
							
							$('#selectBoxRow, #selectBoxCol').addClass('HideDivSN');
						}
				});
		});
		$('#productTypeSpin').hide();
		$('body').click(function(evt) {
			if(evt.target.id != "orderMultiSelectParent" && evt.target.id != "orderMultiSelect"  && evt.target.id != "orderDropdownButton" &&  evt.target.id !="orderImage" && evt.target.id !="orderSearch" && evt.target.id !="order"){
				$('#orderSearch').val('');
				$('#orderMultiSelectParent').hide();
			}
			if(evt.target.id != "jobFunctionMultiSelectParent" && evt.target.id != "jobFunctionMultiSelect"  && evt.target.id != "jobFunctionDropdownButton" &&  evt.target.id !="orderImage" && evt.target.id !="jobFunctionSearch" && evt.target.id !="jobFunction"){
				$('#jobFunctionSearch').val('');
				$('#jobFunctionMultiSelectParent').hide();
			}
			if(evt.target.id != "seniorityLevelMultiSelectParent" && evt.target.id != "seniorityLevelMultiSelect"  && evt.target.id != "seniorityLevelDropdownButton" &&  evt.target.id !="orderImage" && evt.target.id !="seniorityLevelSearch" && evt.target.id !="seniorityLevel"){
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
			if(evt.target.id != "industryMultiSelectParent" && evt.target.id != "industryMultiSelect"  && evt.target.id != "industryDropdownButton" &&  evt.target.id !="orderImage" && evt.target.id !="industrySearch" && evt.target.id !="industry"){
				$('#industrySearch').val('');
				$('#industryMultiSelectParent').hide();
			}
			if(evt.target.id != "yesFromOpprMultiSelectParent" && evt.target.id != "yesFromOpprMultiSelect"  && evt.target.id != "yesFromOpprDropdownButton" &&  evt.target.id !="orderImage" && evt.target.id !="yesFromOpprSearch" && evt.target.id !="yesFromOppr"){
				$('#yesFromOpprSearch').val('');
				$('#yesFromOpprMultiSelectParent').hide();
			}
			if(evt.target.id != "createdByMultiSelectParent" && evt.target.id != "createdByMultiSelect"  && evt.target.id != "createdByDropdownButton" &&  evt.target.id !="orderImage" && evt.target.id !="createdBySearch" && evt.target.id !="createdby"){
				$('#createdBySearch').val('');
				$('#createdByMultiSelectParent').hide();
				
				if(selectCreatedByChecked == true) {
					sequence = 0;
					sequenceForQuery = 0;
					pageCount = 1
					document.getElementById('pageValue').innerHTML = "P"+pageCount;
					fetchTotalOrderCountForFilter();
					fetchStatusTypeData();
				}
			}
			if(evt.target.id != "productTypeMultiSelectParent" && evt.target.id != "productTypeMultiSelect"  && evt.target.id != "productTypeDropdownButton" &&  evt.target.id !="orderImage" && evt.target.id !="productTypeSearch" && evt.target.id !="producttype"){
				$('#productTypeSearch').val('');
				$('#productTypeMultiSelectParent').hide();
				
				if(selectProductTypeChecked == true) {
					sequence = 0;
					sequenceForQuery = 0;
					pageCount = 1
					document.getElementById('pageValue').innerHTML = "P"+pageCount;
					fetchTotalOrderCountForFilter();
					fetchStatusTypeData();
				}
			}
		});
		
		$("#countylabel").hide();
		
		$('#fileClose').click(function() {
				$('#seeFile').hide();
		});
		
		$('#completionDate').datepicker({
	    	autoclose: true,
	        format: 'yyyy-mm-dd'
	    });
		
		
		/*$('.custom-control-input[type="radio"]').click(function(){
			var productType = $(this).attr("value");
			var campaignNameOld = $("#campaignName").val();
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
				
			$("#campaignName").val(newstring);
			console.log($("#campaignName").val());
		});*/
		
		
		
		$("#yesSuppression").click(function() {
			$.confirm({
				'message'	: 'Do you want to delete suppression list for this opportunity?',
				'buttons'	: {
					'<span class="fa fa-check fa-2x" aria-hidden="true"></span> Yes'	: {
						'class'	: 'yes',
						'action': function(){
							$.ajax({
								url : "deleteSuppressionForOpportunity.do?orderId="+JSON.parse(selectedRecordData.workorder).workorder_id_text,
								type: "POST",
								success: function(data)
								{
									if(data == "success"){
										fileCount = 0;
										loadPopup();
										$("#successMsg").html("* Record deleted successfully.").show();
										setTimeout(function(){$('#successMsg').html("");},3000);
									}
									else {
										$("#errorMsg").html("* exception occurred while deleting record in db, kindly check with development team.").show();
										setTimeout(function(){$('#errorMsg').html("");},validationMessageTimeout);
									} 
								},
								error: function(xhr, textStatus, errorThrow)
								{
									$("#errorMsg").html("* error occurred while deleting record in db, kindly check with development team.").show();
									setTimeout(function(){$('#errorMsg').html("");},validationMessageTimeout);
								}		
							});
							
						}
					},
					'<span class="fa fa-times fa-2x" aria-hidden="true"></span>  No'	: {
						'class'	: 'no',
						'action': function(){
							$.ajax({
								url : "deleteSuppression.do?orderId="+JSON.parse(selectedRecordData.workorder).workorder_id_text,
								type: "POST",
								success: function(data)
								{
									if(data == "success"){
										fileCount = 0;
										loadPopup();
										$("#successMsg").html("* Record deleted successfully.").show();
										setTimeout(function(){$('#successMsg').html("");},3000);
									}
									else {
										$("#errorMsg").html("* exception occurred while deleting record in db, kindly check with development team.").show();
										setTimeout(function(){$('#errorMsg').html("");},validationMessageTimeout);
									} 
								},
								error: function(xhr, textStatus, errorThrow)
								{
									$("#errorMsg").html("* error occurred while deleting record in db, kindly check with development team.").show();
									setTimeout(function(){$('#errorMsg').html("");},validationMessageTimeout);
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
						$.ajax({
							url : "deleteNALForOpportunity.do?orderId="+JSON.parse(selectedRecordData.workorder).workorder_id_text,
							type: "POST",
							success: function(data)
							{
								if(data == "success"){
									nalFileCount = 0;
									loadPopup();
									$("#successMsg").html("* Record deleted successfully.").show();
									setTimeout(function(){$('#successMsg').html("");},3000);
								}
								else {
									$("#errorMsg").html("* exception occurred while deleting record in db, kindly check with development team.").show();
									setTimeout(function(){$('#errorMsg').html("");},validationMessageTimeout);
								} 
							},
							error: function(xhr, textStatus, errorThrow)
							{
								$("#errorMsg").html("* error occurred while deleting record in db, kindly check with development team.").show();
								setTimeout(function(){$('#errorMsg').html("");},validationMessageTimeout);
							}		
						});
						
					}
				},
				'<span class="fa fa-times fa-2x" aria-hidden="true"></span>  No'	: {
					'class'	: 'no',
					'action': function(){
						$.ajax({
							url : "deleteNAL.do?orderId="+JSON.parse(selectedRecordData.workorder).workorder_id_text,
							type: "POST",
							success: function(data)
							{
								if(data == "success"){
									nalFileCount = 0;
									loadPopup();
									$("#successMsg").html("* Record deleted successfully.").show();
									setTimeout(function(){$('#successMsg').html("");},3000);
								}
								else {
									$("#errorMsg").html("* exception occurred while deleting record in db, kindly check with development team.").show();
									setTimeout(function(){$('#errorMsg').html("");},validationMessageTimeout);
								} 
							},
							error: function(xhr, textStatus, errorThrow)
							{
								$("#errorMsg").html("* error occurred while deleting record in db, kindly check with development team.").show();
								setTimeout(function(){$('#errorMsg').html("");},validationMessageTimeout);
							}		
						});
						
					}
				}
			}
		});
		
	});
	

		$('#addSuppressionFiles').click(function(){
				$('#suppressionFileUploadModal').show();
				$("#addSuppressionFileTable").find('tbody').empty();
				$("#addSuppressionFileTable").find('tbody').append("<tr><td><input type='file' class='form-control form-control-sm'"+
						"id='pcsuppressionfile_0' name='pcsuppressionfile'></td>" +
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
				var temp = "pcsuppressionfile_"+i;
				 var suppressionFile=$("#pcsuppressionfile_"+i)[0].files[0];
					if(suppressionFile){
						 var nalFileName=$("#pcsuppressionfile_"+i)[0].files[0]['name'];
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
				$('#nalFileUploadModal').show();
				$("#addNALFileTable").find('tbody').empty();
				$("#addNALFileTable").find('tbody').append("<tr><td><input type='file' class='form-control form-control-sm'"+
						"id='suppressionList_0' name='suppressionList'></td>" +
					    "<td><button id='addNALFile' type='button' class='btn btn-success btn-xs' onClick='addMoreNALFiles()'><i class='fa fa-plus fa-lg' "+
						"aria-hidden='true'></i> Add More</button></td></tr>");
				
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
		
		$(document.body).delegate(".delFileField", "click", function(){
			rowIdNALFile.push($(this).closest("tr").attr('id').split("_")[1]);
			$(this).closest("tr").remove();
			nalFileCount--;
		});
		
		
		$("#submitNALFiles").click(function() {
			for(var i=0; i<nalFileCount; i++) {
				var temp = "suppressionList_"+i;
				 var suppressionFile=$("#suppressionList_"+i)[0].files[0];
					if(suppressionFile){
						 var nalFileName=$("#suppressionList_"+i)[0].files[0]['name'];
						 if(nalFileName.lastIndexOf(".csv") == -1 && nalFileName.lastIndexOf(".xls") == -1 && nalFileName.lastIndexOf(".xlsx") == -1) {
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
		
		$("#closeAssetFiles").click(function() {
			assetFileCount = prevAssetCount;
			
		});
		
	$( "#rate" ).blur(function() {
		    this.value = parseFloat(this.value).toFixed(2);
	 });
	
	 $("#totalLead").keypress(function() {
		 if(oldProductType =='Programmatic' || oldProductType =='Programatic'){
			return this.value.length < 8;
		 }else {
			 return this.value.length < 5;
		 }
	});
	 
	 /*$("#leadcommit").keypress(function() {
		 if(oldProductType =='Programatic'){
			return this.value.length < 9;
		 }else {
			 return this.value.length < 6;
		 }
	});*/
		

});



function addMoreFiles() {
	if(rowIdFile.length>0){
		var $addFiles = $("<tr id='row_"+rowIdFile[0]+"'><td><input type='file' class='form-control form-control-sm'"+
		"id='pcsuppressionfile_"+rowIdFile[0]+"' name='pcsuppressionfile_"+rowIdFile[0]+"'></td>" +
	    "<td><button type='button' class='delFileField btn btn-danger btn-xs'><span class='fa fa-times' aria-hidden='true'></span> Remove</button></td></tr>");
	    $("#addSuppressionFileTable").append($addFiles);
		fileCount++;
		rowIdFile.splice(0,1);
		
	}else if(fileCount < 10) {
		var $addFiles = $("<tr id='row_"+fileCount+"'><td><input type='file' class='form-control form-control-sm'"+
		"id='pcsuppressionfile_"+fileCount+"' name='pcsuppressionfile_"+fileCount+"'></td>" +
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
		"id='suppressionList_"+rowIdNALFile[0]+"' name='suppressionList_"+rowIdNALFile[0]+"'></td>" +
	    "<td><button type='button' class='delFileField btn btn-danger btn-xs'><span class='fa fa-times' aria-hidden='true'></span> Remove</button></td></tr>");
	    $("#addNALFileTable").append($addFiles);
		nalFileCount++;
		rowIdNALFile.splice(0,1);
		
	}else if(nalFileCount < 10) {
		var $addFiles = $("<tr id='row_"+nalFileCount+"'><td><input type='file' class='form-control form-control-sm'"+
		"id='suppressionList_"+nalFileCount+"' name='suppressionList_"+nalFileCount+"'></td>" +
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


function fileHeaderValidateSuppression() {
	
	var finalURL="fileHeaderValidate.do";
	
	var formData=new FormData();
	for(var i=0; i<fileCount; i++) {
		 var pcsuppressionFile=$("#pcsuppressionfile_"+i)[0].files[0];
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
				$("#nalAlertMsg").removeClass("text-success").addClass("text-danger").html(data.message).show();
				setTimeout(function(){$('#nalAlertMsg').hide();},5000);
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
		 var pcsuppressionFile=$("#suppressionList_"+i)[0].files[0];
		 formData.append("suppressionList_"+i, pcsuppressionFile);
		
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
					$("#nalFileUploadModal").modal('hide');
				},1000);
			}
		},
		error		:	function(xhr, textStatus, errorThrow) {
			$("#nalFileUploadModal").modal('show');
	}
	});
}	




//Date Range Picker Starts	
$(function() {
		/*var start = moment().subtract(29, 'days');
		var end = moment();*/
	var start ="";
	var end = "";
		function cb(start, end) {
			if(start._isValid && end._isValid)
	        {
				$('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
	        }
	        else
	        {
	        	$('#reportrange span').html("");
	        }
		}
		
		$('#reportrange').daterangepicker({
				startDate: start,
				endDate: end,
				ranges: {
							'Remove Date': ["",""],
							'Today': [moment(), moment()],
							'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
							'Last 7 Days': [moment().subtract(6, 'days'), moment()],
							'Last 15 Days': [moment().subtract(14, 'days'), moment()],
							'Last 30 Days': [moment().subtract(29, 'days'), moment()],
							'This Month': [moment().startOf('month'), moment().endOf('month')],	
							'3 Months': [moment().subtract(90, 'days'), moment()],
							'6 Months': [moment().subtract(180, 'days'), moment()],
							'9 Months': [moment().subtract(270, 'days'), moment()]
							//'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
						}
    	}, cb);
		
		cb(start, end);
		$('#reportrange').on('apply.daterangepicker', function(ev, picker) {
				$(this).val(picker.startDate.format('MMMM D, YYYY') + ' - ' + picker.endDate.format('MMMM D, YYYY'));
				$('#loadBg').show();
				$("body").addClass("p-0");
				setTimeout(function() {
					sequence = 0;
					sequenceForQuery = 0;
					pageCount = 1
					document.getElementById('pageValue').innerHTML = "P"+pageCount;
					fetchTotalOrderCountForFilter();
					loadData();
				}, 1000);
		});
		$('#reportrange').on('cancel.daterangepicker', function(ev, picker) {
				$(this).val('');
		});
});

// Date Range Picker Ends

function loadCurrency(){
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
				$("#currency").html(currency);
		}
	});
}





function loadCsfLookupData(){
	$("#viewLookupLoader").show();
	$("#viewLookupTbl").find('tbody').empty();
	$.ajax({
    	url: "loadLookupTypes.do?opportunityId="+$("#opportunityID").val(),
        success : function(data) {
        	$("#viewLookupLoader").hide();
        	if(data != null && data != "") {
        		data = JSON.parse(data);
        		csfLookupTypeList = data;
	        	$.each(data, function(i) {
	        		var lookupType = '"'+data[i]+'"';
	        		$("#viewLookupTbl").find("tbody").append("<tr id='rowlookup_"+i+"'><td>"+data[i]+"</td><td><a href='#' onClick='LookupFile("+i+", "+lookupType+")' id='lookup_"+i+"'>"+data[i]+"</a></td><td><button type='button' class='btn btn-danger btn-xs' onClick='deleteLookupType("+i+", "+lookupType+")'><i class='fa fa-window-close' aria-hidden='true'></i></button></td></tr>");
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
		success : function(result) {
			csfDcFieldsList = result.toString();
		}
	});
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

function LookupFile(index, lookupType) {
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
			$("#csfMsg").removeClass("text-success").addClass("text-danger").html("* kindly select lookup type.").show();
			setTimeout(function(){
				$("#csfMsg").html("").hide();
			},4000);
			return false;
		}
		
		if($("#lookUpUpload").val()=="")
		{
			$("#csfMsg").removeClass("text-success").addClass("text-danger").html("* kindly select the file to upload.").show();
			setTimeout(function(){
				$("#csfMsg").html("").hide();
			},4000);
			return false;
		}
		saveCsfLookupUpload();
	}
	else{
		//$("#clientColumns").addClass('bdrRed');
		$("#csfMsg").removeClass("text-success").addClass("text-danger").html("* kindly upload client column first.").show();
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
							'<span class="fa fa-check fa-2x" aria-hidden="true"></span> Yes'	: {
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
	                  					$("#csfMsg").removeClass("text-danger").addClass("text-success").html("* Lookup file saved successfully.").show();
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
	                        			$("#csfMsg").removeClass("text-success").addClass("text-danger").html("* Oops ! error has occurred. File can't be uploaded. Plese try again.").show();
	                        			setTimeout(function(){
	                        				$("#csfMsg").html("").hide();
	                        			},validationMessageTimeout);
	                        		}
	                             })
							 	}
							},
							'<span class="fa fa-times fa-2x" aria-hidden="true"></span>  No'	: {
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
					$("#csfMsg").removeClass("text-success").addClass("text-danger").html("* Column header should contain name in the uploaded file.").show();
					setTimeout(function(){
						$("#csfMsg").html("").hide();
					},4000);
				}
				else if(data == "success") {
					$("#csfLoader").hide();
					document.getElementById('savefile').disabled = false;
					$("#csfMsg").removeClass("text-danger").addClass("text-success").html("* Lookup file saved successfully.").show();
					$("#lookUpSelect").val("");
					loadCsfLookupData();
					setTimeout(function(){
						$("#csfMsg").html("").hide();
					},4000);
				}
				else {
					$("#csfLoader").hide();
					document.getElementById('savefile').disabled = false;
					$("#csfMsg").removeClass("text-success").addClass("text-danger").html("* exception occured while saving the lookup details.").show();
					setTimeout(function(){
						$("#csfMsg").html("").hide();
					},5000);
				}
			},
			error: function(xhr, textStatus, errorThrow)
			{
				$("#csfLoader").hide();
				document.getElementById('savefile').disabled = false;
				$("#csfMsg").removeClass("text-success").addClass("text-danger").html("* Oops ! error has occurred. File can't be uploaded. Plese try again.").show();
				setTimeout(function(){
					$("#csfMsg").html("").hide();
				},validationMessageTimeout);
			}
		});
	}
	else {
		$("#csfLoader").hide();
		document.getElementById('savefile').disabled = false;
		$("#csfMsg").removeClass("text-success").addClass("text-danger").html("* Only .csv, .xls, .xlsx files are allowed.").show();
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
									$("#csfMappingTable1").find('tbody').append("<tr><td><label id='clientfield_"+length+"' class='control-label label-wrap'>"+
										""+value+" </label></td><td><select class='form-control' id='dcfield_"+length+"'></select></td>"+
										"<td><input type='checkbox' id='mandatoryfield_"+length+"'></td><td><input type='checkbox' id='lookupfield_"+length+"'></td></tr>");
								}
								else {
									$("#csfMappingTable2").find('tbody').append("<tr><td><label id='clientfield_"+length+"' class='control-label label-wrap'>"+
										""+value+" </label></td><td><select class='form-control' id='dcfield_"+length+"'></select></td>"+
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
				//alert("Inside else condition");
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

function clearCampaignManager() {
	if($("#campaignManager").val() != null && $("#campaignManager").val() != "") {
		$("#campaignManager").removeClass("bdrRed");
	}
	else {
		$("#campaignManager").addClass("bdrRed");
	}
}
	
function loadMarketoInstanceDetails() {
	$.ajax({
		url:'amus.loadMarketoInstanceDetails', 
		success: function(data, textStatus, xhr)
		{
			var marketoInstanceNames = '<option value="">------select from list------</option>';
			if(data != null && data.length > 0) {
				marketoInstanceArr=data;
				for(i=0; i<data.length; i++) {
					marketoInstanceNames= marketoInstanceNames + "<option value='"+data[i].marketoinstanceid+"'>"+data[i].marketoinstancename+"</option>";
				} 
				$("#mktInstance").html(marketoInstanceNames);
			}
		}
	}) 
}

function fetchMarketoInstanceDetails() {
	if ($("#mktInstance").find('option:selected').val() != null && $("#mktInstance").find('option:selected').val() != "") {
		$("#mktInstance-error").hide();
		
		$.each(marketoInstanceArr, function (index, value) {
			marketoInstance = marketoInstanceArr[index];
			
			if(marketoInstance != '') {
				if(marketoInstance.marketoinstanceid != null && marketoInstance.marketoinstanceid != "" && marketoInstance.marketoinstanceid == $("#mktInstance").find('option:selected').val()) {
					if(marketoInstance.marketoinstanceid != null && marketoInstance.marketoinstanceid != "") {
						$("#emailMarketoInstanceId").val(marketoInstance.marketoinstanceid);
					}
					if(marketoInstance.marketoinstancename != null && marketoInstance.marketoinstancename != "") {
						$("#emailMarketoInstanceName").val(marketoInstance.marketoinstancename);
					}
					if(marketoInstance.emailfrom != null && marketoInstance.emailfrom != "") {
						$("#emailfrom").val(marketoInstance.emailfrom);
					}
					if(marketoInstance.replyto != null && marketoInstance.replyto != "") {
						$("#emailreplyTo").val(marketoInstance.replyto);
					}
					if(marketoInstance.bcc != null && marketoInstance.bcc != "") {
						$("#emailBcc").val(marketoInstance.bcc);
					}
					if(marketoInstance.server != null && marketoInstance.server != "") {
						$("#emailServer").val(marketoInstance.server);
					}
					if(marketoInstance.password != null && marketoInstance.password != "") {
						$("#emailPassword").val(marketoInstance.password);
					}
					if(marketoInstance.serverport != null && marketoInstance.serverport != "") {
						$("#emailServerPort").val(marketoInstance.serverport);
					}
				}
			}
		});
	} 
}

function sendTestMail()
{
	if ($("#mktInstance").find('option:selected').val() != null && $("#mktInstance").find('option:selected').val() != "") {
		document.getElementById('saveTemplate').disabled = true;
		document.getElementById('sendTestMail').disabled = true;
		document.getElementById('cancelEmailTemplateBtn').disabled = true;
		
		$("#testMailLoader").show();
		
		var mailData = {fromAddress:$("#emailfrom").val(),replyToAddress:$("#emailreplyTo").val(),subject:$("#emailSubject").val(),bccAddress:$("#emailBcc").val(),toAddress:$("#testEmail").val(), 
				emailPassword:$("#emailPassword").val(),emailServerHost:$("#emailServer").val(),emailServerPort:$("#emailServerPort").val(),testEmail:true,mailtemplate:$("#templateHtml").val()};
		$.ajax({
			url:"sendTestEmail.do", 
			data:mailData,
			type:"POST",
			success: function(data, textStatus, xhr)
			{
				$("#testMailLoader").hide();
				document.getElementById('saveTemplate').disabled = false;
				document.getElementById('sendTestMail').disabled = false;
				document.getElementById('cancelEmailTemplateBtn').disabled = false;
				if(data=="success") {
					$("#saveTemplateMsg").removeClass("alert-danger");
	        		$("#saveTemplateMsg").addClass("alert-success");
	        		$("#saveTemplateMsg").show().html("Test mail sent successfully.");
	        		setTimeout(function(){
	        			$("#saveTemplateMsg").hide();
	        		},3000); 
				}
				else {
					$("#saveTemplateMsg").addClass("alert-danger");
	        		$("#saveTemplateMsg").show().html("Exception occured while sending the test mail.");
	        		setTimeout(function(){
	        			$("#saveTemplateMsg").hide();
	        		},5000);
				}
			},
			error: function(xhr, textStatus, errorThrow)
			{
				$("#testMailLoader").hide();
				document.getElementById('saveTemplate').disabled = false;
				document.getElementById('sendTestMail').disabled = false;
				document.getElementById('cancelEmailTemplateBtn').disabled = false;
				$("#saveTemplateMsg").addClass("alert-danger");
	    		$("#saveTemplateMsg").show().html("Error occured while sending the test mail.");
	    		setTimeout(function(){
	    			$("#saveTemplateMsg").hide();
	    		},5000);
			}
		})  
	}
	else {
		$("#mktInstance-error").html("Please select Marketo Instance.").show();
	}
}


function loadEmailTemplateData(orderId) {
	$("#fetchEmailTemplateDataLoader").show();

	$.ajax({
		url:'amus.loadEmailTemplateData?orderId='+orderId, 
		success: function(data, textStatus, xhr)
		{
			$("#fetchEmailTemplateDataLoader").hide();
			$("#emailTemplateTbl tbody").empty();
		
			if(data != null && data.length > 0) {
				index=1;
				for(i=0; i<data.length; i++) {
					recEmailTemplateArr=data;
					
					var templateName = '';
					var templateDescription = '';

					if(data[i].templateName != null && data[i].templateName != "") {
						templateName = data[i].templateName;
					}
					if(data[i].templateDescription != null && data[i].templateDescription != "") {
						templateDescription = data[i].templateDescription;
					}
					var emailTemplateData = "<tr><td>"+index+".</td><td>"+templateName+"</td><td>"+templateDescription+"</td><td><button type='button' id='editTemplate' class='btn btn-warning btn-xs' onClick='callEditTemplate("+i+")'>Edit <span class='fa fa-pencil-square-o' aria-hidden='true'></span></button></td></tr>";
					$('#emailTemplateTbl').find('tbody').append(emailTemplateData);
					
					index++;
				}
			}
			else {
				$("#fetchEmailTemplateDataLoader").hide();
				$('#emailTemplateTbl').find('tbody').append("<tr><td colspan='4' class='text-danger'>No Email Template available.</td></tr>");
			}
		},
		error: function(xhr, textStatus, errorThrow)
		{
			$("#fetchEmailTemplateDataLoader").hide();
			$("#emailTemplateRecordsMsg").addClass("alert-danger");
			$("#emailTemplateRecordsMsg").show().html('* error occurred while fetching email template records, kindly check with development team.');
			setTimeout(function(){
				$('#emailTemplateRecordsMsg').hide();
    		},validationMessageTimeout); 
		}
	}) 
}

function callEditTemplate(index) {
	$("#addemailTemplateModal").modal("show");
	$("#testEmail").val(user);
	
	recEmailTemplate=recEmailTemplateArr[index];
	if(recEmailTemplate != '') {
		if(recEmailTemplate.orderMailTemplateId != null && recEmailTemplate.orderMailTemplateId != "" && recEmailTemplate.orderMailTemplateId != undefined) {
			$("#orderMailTemplateId").val(recEmailTemplate.orderMailTemplateId);
		}
		else {
			$("#orderMailTemplateId").val("");
		}
		if(recEmailTemplate.templateName != null && recEmailTemplate.templateName != "" && recEmailTemplate.templateName != undefined) {
			$("#templateName").val(recEmailTemplate.templateName);
			$("#oldTemplateName").val(recEmailTemplate.templateName);
		}
		else {
			$("#templateName").val("");
			$("#oldTemplateName").val("");
		}
		if(recEmailTemplate.from != null && recEmailTemplate.from != "" && recEmailTemplate.from != undefined) {
			$("#emailfrom").val(recEmailTemplate.from);
		}
		else {
			$("#emailfrom").val("");
		}
		if(recEmailTemplate.replyTo != null && recEmailTemplate.replyTo != "" && recEmailTemplate.replyTo != undefined) {
			$("#emailreplyTo").val(recEmailTemplate.replyTo);
		}
		else {
			$("#emailreplyTo").val("");
		}
		if(recEmailTemplate.bcc != null && recEmailTemplate.bcc != "" && recEmailTemplate.bcc != undefined) {
			$("#emailBcc").val(recEmailTemplate.bcc);
		}
		else {
			$("#emailBcc").val("");
		}
		if(recEmailTemplate.subject != null && recEmailTemplate.subject != "" && recEmailTemplate.subject != undefined) {
			$("#emailSubject").val(recEmailTemplate.subject);
		}
		else {
			$("#emailSubject").val("");
		}
		if(recEmailTemplate.templateDescription != null && recEmailTemplate.templateDescription != "" && recEmailTemplate.templateDescription != undefined) {
			$("#templateDescription").val(recEmailTemplate.templateDescription);
		}
		else {
			$("#templateDescription").val("");
		}
		if(recEmailTemplate.mailTemplate != null && recEmailTemplate.mailTemplate != "" && recEmailTemplate.mailTemplate != undefined) {
			$("#templateHtml").val(recEmailTemplate.mailTemplate);
		}
		else {
			$("#templateHtml").val("");
		}
		if(recEmailTemplate.marketoInstanceId != null && recEmailTemplate.marketoInstanceId != "" && recEmailTemplate.marketoInstanceId != undefined) {
			$("#emailMarketoInstanceId").val(recEmailTemplate.marketoInstanceId);
			$("#mktInstance option[value="+recEmailTemplate.marketoInstanceId+"]").prop("selected",true);
		}
		if(recEmailTemplate.server != null && recEmailTemplate.server != "" && recEmailTemplate.server != undefined) {
			$("#emailServer").val(recEmailTemplate.server);
		}
		if(recEmailTemplate.password != null && recEmailTemplate.password != "" && recEmailTemplate.password != undefined) {
			$("#emailPassword").val(recEmailTemplate.password);
		}
		if(recEmailTemplate.serverPort != null && recEmailTemplate.serverPort != "" && recEmailTemplate.serverPort != undefined) {
			$("#emailServerPort").val(recEmailTemplate.serverPort);
		}
	}
}

function loadProgramOrderData(orderId) {
	progCount = 0;
	programNameList = [];
	programNames ='';
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
						programNameList.push(programName);
					}
					
				
					$('#programTbl').dataTable().fnAddData(["<tr><td>"+index+".</td>","<td>"+programName+"</td>","<td><button type='button' id='modifyProgram' class='btn btn-warning btn-xs margR10' onClick='modifyProgram("+i+")'><span class='fa fa-pencil-square-o' aria-hidden='true'></span> Modify</button><button type='button' id='deleteProgram' class='btn btn-danger btn-xs' onClick='deleteProgram("+i+")'><span class='fa fa-times' aria-hidden='true'></span> Delete</button></td></tr>"]);
					
					index++;
					progCount++;
				}
				programNames=programNameList.join("|"); 
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
    		},validationMessageTimeout); 
		}
	}) 
}

$("#closeProgramModal").click(function() {
	$("#viewAssignedProgModal").modal("hide");
	$("#addProgramRow").slideUp('fast');
	$("#addNewProgramBtn").show();
});

function modifyProgram(index) {
	recProgramOrder=recProgramOrderArr[index];
	
	$("#addEditProgramName").val(recProgramOrder.program_name);

	$("#addProgramRow .panel").removeClass('panel-success').addClass('panel-warning');
	$("#addProgramRow .panel-heading").html('<span class="fa fa-pencil-square-o" aria-hidden="true"></span> Modify Program');
	$("#addProgramRow").slideDown('slow');
	$("#addProgramBtn, #addNewProgramBtn").hide();
	$("#saveProgramBtn").show();
}

function deleteProgram(index) {
	$.confirm({
		'message'	: 'Are you sure you want to delete the program?',
		'buttons'	: {
			'<span class="fa fa-check fa-2x" aria-hidden="true"></span> Yes'	: {
				'class'	: 'yes',
				'action': function(){
					recProgramOrder=recProgramOrderArr[index];
					deleteProgramOrder(recProgramOrder.id_text);
				}
			},
			'<span class="fa fa-times fa-2x" aria-hidden="true"></span>  No'	: {
				'class'	: 'no',
				'action': function(){}	// Nothing to do in this case. You can as well omit the action property.
			}
		}
	});
}

function deleteProgramOrder(id) {
	$("#programLoader").show();
	var orderNo=JSON.parse(selectedRecordData.workorder).workorder_id_text;
	$.ajax({
		url:"amus.deleteProgramName?id="+id+"&order_id="+orderNo,
		method:"POST",						
		success: function(data, textStatus, xhr)
		{
			$("#programLoader").hide();
			if(data=='success'){
				$("#programMsg").removeClass("alert-danger");
        		$("#programMsg").addClass("alert-success");
				$("#programMsg").show().html("Program name deleted Successfully.");
				setTimeout(function(){$("#programMsg").hide()},3000);
				
				var orderNo=JSON.parse(selectedRecordData.workorder).workorder_id_text;
				loadProgramOrderData(orderNo);
			}else{
				if(isJsonString(data)){
					dataObj=JSON.parse(data);
					if(dataObj.error !=null && dataObj.error !=""){
						$("#programMsg").addClass("alert-danger");
						$("#programMsg").show().html("error:"+dataObj.error);
						setTimeout(function(){$("#programMsg").hide()},5000);
						$("#addEditProgramName").val("");
					}
				}
			}
		},
		error: function(xhr, textStatus, errorThrow)
		{	
			$("#programLoader").hide();
			$("#programMsg").addClass("alert-danger");
			$("#programMsg").show().html("Ajax error occurred while adding campaign.");
			setTimeout(function(){$("#programMsg").hide()},validationMessageTimeout);
		}
	}) ;
}

function addNewProgram() {
	if($("#addEditProgramName").val() != null && $("#addEditProgramName").val() != "") {
		$("#programLoader").show();
		var orderNo=JSON.parse(selectedRecordData.workorder).workorder_id_text;
		var productType = $("input[name='serviceType']:checked").val();
		$.ajax({
			url:"amus.addNewProgramName?program_name="+$("#addEditProgramName").val()+"&product_name="+productType+"&opportunity_id="+$("#opportunityID").val()+
			"&order_id="+orderNo+"&serviceType="+productType+"&userName="+userName,
			method:"POST",						
			success: function(data, textStatus, xhr)
			{
				$("#programLoader").hide();
				if(data=='success'){
					$("#programMsg").removeClass("alert-danger");
	        		$("#programMsg").addClass("alert-success");
					$("#programMsg").show().html("Program name added Successfully.");
					setTimeout(function(){$("#programMsg").hide()},3000);
					$("#addEditProgramName").val("");
					
					$("#addProgramRow").slideUp('fast');
					$("#addNewProgramBtn").show();
					loadProgramOrderData(orderNo);
				}else if (data=='programExists'){
					$("#programMsg").addClass("alert-danger");
					$("#programMsg").show().html("Program name already exists.");
					setTimeout(function(){$("#programMsg").hide()},3000);
					$("#addEditProgramName").val("");
				}else{
					if(isJsonString(data)){
						dataObj=JSON.parse(data);
						if(dataObj.error !=null && dataObj.error !=""){
							$("#programMsg").addClass("alert-danger");
							$("#programMsg").show().html("error:"+dataObj.error);
							setTimeout(function(){$("#programMsg").hide()},5000);
							$("#addEditProgramName").val("");
						}
					}
				}
			},
			error: function(xhr, textStatus, errorThrow)
			{	
				$("#programLoader").hide();
				$("#programMsg").addClass("alert-danger");
				$("#programMsg").show().html("Ajax error occurred while adding campaign.");
				setTimeout(function(){$("#programMsg").hide()},validationMessageTimeout);
			}
		}) ;
	}
	else {
		$("#programMsg").addClass("alert-danger");
		$("#programMsg").show().html("Please enter program name.");
		setTimeout(function(){$("#programMsg").hide()},3000);
	}
}

function updateProgram() {
	if($("#addEditProgramName").val() != null && $("#addEditProgramName").val() != "") {
		$("#programLoader").show();
		var orderNo=JSON.parse(selectedRecordData.workorder).workorder_id_text;
		$.ajax({
			url:"amus.modifyProgramName?program_name="+$("#addEditProgramName").val()+"&order_id="+orderNo+"&id="+recProgramOrder.id_text+"&userName="+userName,
			method:"POST",						
			success: function(data, textStatus, xhr)
			{
				$("#programLoader").hide();
				if(data=='success'){
					$("#programMsg").removeClass("alert-danger");
	        		$("#programMsg").addClass("alert-success");
					$("#programMsg").show().html("Program name updated Successfully.");
					setTimeout(function(){$("#programMsg").hide()},3000);
					$("#addEditProgramName").val("");
					$("#addProgramRow").slideUp('fast');
					$("#addNewProgramBtn").show();
					loadProgramOrderData(orderNo);
				}else if (data=='programExists'){
					$("#programMsg").addClass("alert-danger");
					$("#programMsg").show().html("Program name already exists.");
					setTimeout(function(){$("#programMsg").hide()},3000);
					$("#addEditProgramName").val("");
				}else{
					if(isJsonString(data)){
						dataObj=JSON.parse(data);
						if(dataObj.error !=null && dataObj.error !=""){
							$("#programMsg").addClass("alert-danger");
							$("#programMsg").show().html("error:"+dataObj.error);
							setTimeout(function(){$("#programMsg").hide()},5000);
							$("#addEditProgramName").val("");
						}
					}
				}
			},
			error: function(xhr, textStatus, errorThrow)
			{	
				$("#programLoader").hide();
				$("#programMsg").addClass("alert-danger");
				$("#programMsg").show().html("Ajax error occurred while adding campaign.");
				setTimeout(function(){$("#programMsg").hide()},validationMessageTimeout);
			}
		}) ;
	}
	else {
		$("#programMsg").addClass("alert-danger");
		$("#programMsg").show().html("Please enter program name.");
		setTimeout(function(){$("#programMsg").hide()},3000);
	}
}



function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

var questionIndex='';
var deliveryMediumEmailIndex='';

/*function multiply() {
	var myBox1 = document.getElementById('totalLead').value;	
	//$("#deliverymethodtable").data('vendorDeliveryOrder').setTotalLeadsOfOrder(parseInt(myBox1));
	var myBox2 = document.getElementById('rate').value;
	if( /\,/.test( $('#rate').val() ) ) {
		$("#salesorderrateMsg").html("Please enter rate without comma .").show();
		setTimeout(function(){$('#salesorderrateMsg').html("").hide();},3000);
		return ;
	}
	var result = document.getElementById('totalValue');	
	var myResult = myBox1 * myBox2;
	result.value = myResult;
	result.value=document.getElementById("currency").value+" "+result.value;
	calculateCountryPercent();
}*/

function multiply()
{
	var myBox1 = document.getElementById('totalLead').value;	
	var myBox2 = document.getElementById('rate').value;
	if( /\,/.test( $('#totalLead').val() ) ) {
		$("#salesOrderNoOfLeadsMsg").html("Please enter Number of Leads without comma.").show();
		setTimeout(function(){$('#salesOrderNoOfLeadsMsg').html("").hide();},3000);
		return ;
	}
	if( /\,/.test( $('#rate').val() ) ) {
		$("#salesorderrateMsg").html("Please enter Unit price without comma .").show();
		setTimeout(function(){$('#salesorderrateMsg').html("").hide();},3000);
		return ;
	}
	var result = document.getElementById('totalValue');	
	var myResult = myBox1 * myBox2;
	var res= (myResult).toFixed(2);
	result.value = res;
	result.value=document.getElementById("currency").value+" "+result.value;
}


function multiplyLeadCommit() {
	var myBox1 = document.getElementById('totalLead').value;	
	//$("#deliverymethodtable").data('vendorDeliveryOrder').setTotalLeadsOfOrder(parseInt(myBox1));
	var myBox2 = document.getElementById('rate').value;
	var result = document.getElementById('totalValue');	
	var myResult = myBox1 * myBox2;
	result.value = parseFloat(myResult).toFixed(2);
	result.value=document.getElementById("currency").value+" "+result.value;
	calculateCountryPercent();
		
}

function prefilOrderForm(data) {
	console.log(data);
	var workorder = JSON.parse(data.workorder);
	//var dcAttachment = JSON.parse(data.dcAttachment);
	var serviceTypeVal = workorder.product_type;
	assetFileCount = 0;
	prevAssetCount = 0;
	serviceTypeVal = serviceTypeVal.replace(/\//g, "/");
	
	var excludeDNCFlag=workorder.excludedncflag;
	excludeDNCFlag=="Y"?$("input:checkbox[value='excludeDNCFlag']").prop('checked', true):$("input:checkbox[value='excludeDNCFlag']").prop('checked', false);

	var flowToCW=data.flowToCW;
	flowToCW=="Y"?$("input:checkbox[id='flowtocw']").prop('checked', true):$("input:checkbox[id='flowtocw']").prop('checked', false);
	
	var yesOpportunity=workorder.suppression_opportunity;
	yesOpportunity=="Y"?$("input:checkbox[value='yesOpportunityFlag']").prop('checked', true):$("input:checkbox[value='yesOpportunityFlag']").prop('checked', false);
	
	if(yesOpportunity=="Y")
	{
		$('#yesFromOpprFunctionDiv').show();
	}
	else
	{
		$('#yesFromOpprFunctionDiv').hide();
	}
//	var updateButtonMsg = "Update "+$("input[name='serviceType']:checked").val()+" Job";
//	$("#updateCloseButtonID").html(updateButtonMsg);
	//$("#opportunityID").val(rec['opportunityID']);
	//$("#marketLeadersActivityNumber").val(data.marketleaders_activity_number);
	
	$("#totalLead").val(workorder.number_of_leads);
	$("#rate").val(workorder.rate);	
	$("#accountName").val(workorder.companyname);	
	$("#accountName").prop('disabled', true);
	$("#sfaccountID").val(workorder.account_id);
	$("#totalValue").val(workorder.campaign_value);
	//$("#leadcommit").val(workorder.lead_commit);
	$("#targetGeo").val(workorder.targetgeo);
	$("#audienceType").val(workorder.audiencetype);
	if($("#totalValue").val() != null && $("#totalValue").val() != "" && $("#totalValue").val() != "undefined") {
		var selectedCurrency = $("#totalValue").val().charAt(0);
		
		if(selectedCurrency.indexOf("$") != -1 || selectedCurrency.indexOf("£") != -1 || selectedCurrency.indexOf("€") != -1) {
			$("#currency").val(selectedCurrency);
		} 
	}
	$("#currency").val(workorder.currency);
	$("#bonus_leads").val(workorder.bonus_leads);
	
	$("#campaignName").val(workorder.campaign_name);
	//$('input:radio[value='+data.inputType+']').prop('checked',true);
	//$("#campaignName").prop('disabled', true);
	$("#targetTitle").val(workorder.target_titles);
	
	if(workorder.employee_size_min!=null && (workorder.employee_size_max==undefined|| workorder.employee_size_max==0)){
		var empsize = workorder.employee_size_min+"+";
	}else{
		var empsize = workorder.employee_size_min;
	}
	
	if(workorder.revenue_min!=null && (workorder.revenue_max==undefined||workorder.revenue_max==0)){
		var revenue_min = workorder.revenue_min.toFixed();
		var revenue = "$"+revenue_min+"+";
	}else {
		if(workorder.revenue_min!=null && (workorder.revenue_min!=undefined|| workorder.revenue_min!=0)){
			var revenue_min = workorder.revenue_min.toFixed();
			var revenue = "$"+revenue_min;
		} 
		if(workorder.revenue_max!=null && (workorder.revenue_max!=undefined|| workorder.revenue_max!=0)){
			var revenue_max = workorder.revenue_max.toFixed();
			var revenueMax = "$"+revenue_max;
		}
	}
	
	$("#empSize").val(empsize);
	$("#empSizeMax").val(workorder.employee_size_max);
	$("#revenue").val(revenue);
	$("#revenueMax").val(revenueMax);
	$("#industry").val(workorder.industry);
	
	/*if(data.completiondate != null && data.completiondate != "" && data.completiondate != undefined) {
		var completionDate = new Date(data.completiondate);
		var month = completionDate.getMonth()+1;
		completionDate = completionDate.getFullYear()+"-"+(month <= 9 ? '0'+month : month)+"-"+completionDate.getDate();
		$("#completionDate").val(completionDate);
	}*/
	if(workorder.completiondate != null && workorder.completiondate != "" && workorder.completiondate != undefined) {
		$("#completionDate").val(data.completiondate);
	}
	
	$("#duration").val(workorder.duration);
	$('input:radio[value='+workorder.frequency+']').attr('checked',true);
	$("#deliveryDay").val(workorder.delivery_day);
	$("#deliveryTime").val(workorder.delivery_time);
	$("#deliveryNumber").val(workorder.delivery_number);
	
/* 	$("#deliveryMethod").val(data.deliveryMethod);
	$('input:radio[value='+data.deliveryMethod+']').attr('checked',true); */
	
	var orderDelivery={};
	orderDelivery.validVendorsList=data.validVendorsList;
	orderDelivery.selectedValidVendorsList=data.selectedValidVendorsList;
	orderDelivery.totalLeads=workorder.number_of_leads;
	orderDelivery.currencyMap=data.currencyMap.map;
	orderDelivery.statusList=data.statusList;
	//$("#deliverymethodtable").vendorDeliveryOrder(orderDelivery);
	
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
		$("#idcAllocation").val(workorder.idcAllocation);
	}
	
	if(workorder.delivery_method == "TP_Benza" || workorder.delivery_method == "TP_Salesify" || workorder.delivery_method == "TP_InternalResults") {
		$("#partnerRateDiv").show();
	}
	else {
		$("#partnerRateDiv").hide();
	}
	$("#rate_partner").val(workorder.rate_partner);
	//$("#wostatus").val(rec['wostatus']);	
	
	//$("#idc_user").val(rec['idcUser']);
	$("#clientBase").val(workorder.client_base);	
	$("#category").val(workorder.category_type);
	//$("#subCategory").remov
	//$("#subCategory").append('<option value='+rec['subCategory']+' selected>'+rec['subCategory']+'</option>');
	$("#subCategory").val(workorder.category_name);
	$('input:radio[value='+workorder.suppression_opportunity+']').attr('checked',true); 
	
	$("#pcsuppressionfile_name").html("SuppressionFileList");
	$("#suppressionList_name").html("NamedAccountListFile");
	
	if(data.uploaded_asset_filename != null && data.uploaded_asset_filename != "" && data.uploaded_asset_filename != "undefined") {
		var uploadedAssetArray=data.uploaded_asset_filename.split(",");
		var uploadedAsseet ="";
		assetFileCount = uploadedAssetArray.length;
		prevAssetCount = assetFileCount;
	}
	
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
				$("#country").val(volumeGeographyList);
				$("#country").prop("title",volumeGeographyList);
			}
		//}
	}else{
		$("input:radio[value='"+regionValue+"']").attr('checked', true);
		//$('#specificCountriesDiv').hide();
	}
	}else{
		$('#specificCountriesDiv').hide();
	}
	
	//$("#questions_name").html(rec['questionFileName']);
	
		
	/* $("#maStatus").val(rec['mAStatus']); */
	$('input:radio[value='+workorder.customer_type+']').prop('checked',true);
	if(workorder.customer_type == 'partner') {
		$(".partner").show();	
	}
	else {
		$(".partner").hide();	
	}
	
	$("#endCustomerName").val(workorder.end_customer_name);
	$("#note").val(workorder.note);
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
	
 	deliveryEmail=workorder.delivery_email;
 	
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
	
	if(workorder.campaign_manager != "null"){
		if(workorder.campaign_manager != null && workorder.campaign_manager != "" && workorder.campaign_manager != "undefined") {
			$("#campaignManager").val(workorder.campaign_manager);
		}else{
			$("#campaignManager").val(user);
		}
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
	
	$("#jobFunction").val(workorder.jobfunction);
	$("#seniorityLevel").val(workorder.seniority_level);
	
	var formattingYesFromOppr = workorder.yesFromOppr;
	var formattingYesFromOpprList='';
	if(formattingYesFromOppr != null && formattingYesFromOppr != ""){
		$("#yesFromOpportunityName").val(JSON.stringify(formattingYesFromOppr));
		prefillYesFromOpprId = true;
		
		//opprIdOpprNameJsonArray.push(formattingYesFromOppr);
		$.each(formattingYesFromOppr, function(key, value){
			for(name in value) {
				formattingYesFromOpprList = formattingYesFromOpprList + value[name]+"||";
			}
		});
		
		if(formattingYesFromOpprList != '') {
			formattingYesFromOpprList = formattingYesFromOpprList.substring(0,formattingYesFromOpprList.lastIndexOf("||"));
			$("#yesFromOppr").val(formattingYesFromOpprList);
			$("#yesFromOppr").prop("title",formattingYesFromOpprList);
		}
		
	}
	
	$('input:radio[value='+workorder.mobile_mandatory+']').prop('checked',true);
	
	var updatedon = "";
	if(data.launchdate != null && data.launchdate != "") {
		updatedon = data.launchdate;
		updatedon = new Date(updatedon);
		var date = updatedon.getDate();
	    var month = updatedon.getMonth()+1;
	    var hours = updatedon.getHours();
	    var minutes = updatedon.getMinutes();
	   var  launchDate = updatedon.getFullYear()+"-"+(month <= 9 ? '0'+month : month)+"-"+updatedon.getDate();
		//$("#launchDate").val(launchDate);
	   $("#launchDate").val(data.launchdate);
	    //updatedon = ((date <= 9 ? '0'+date : date)+"-"+(month <= 9 ? '0'+month : month))+"-"+updatedon.getFullYear()+" "+(hours <= 9 ? '0'+hours : hours)+":"+(minutes <= 9 ? '0'+minutes : minutes);
	    $("#launchTime").val((hours <= 9 ? '0'+hours : hours)+":"+(minutes <= 9 ? '0'+minutes : minutes));
	}  
	
	//$("#invoiceCountry").val(data.invoiceCountry);
	$("#launchCountry").val(workorder.launchcountry);
	$("#mountainTime").val(workorder.mountaintime);
}

function formatpageOnLoad() {
	//var productTypeDisplayValue =$("#productTypeDisplay").text();
	var productTypeDisplayValue = $("input[name='serviceType']:checked").val();
	if(productTypeDisplayValue=="CPL"){
			$(".cplBlk").show();
			$("#servicetitle").html("Account Information");
			$("#completiondate").hide();
			$("#schedule").show();
			$("#customqlabel").html("Custom Question<span class='reqMark'>*</span>");
			$("#customqtr").show();
			$("#suppressionprevious,#deliverymethod").show();
	}
	if(productTypeDisplayValue=="appSetting"){
        $(".cplBlk").show();
        $("#servicetitle").html("Appointment Setting");
        $("#completiondate").hide();
        $("#schedule").hide();
        $("#customqlabel").html("Qualifying Question");
        $("#customqtr").show();
        $("#suppressionprevious,#deliverymethod").show();
	}
	if(productTypeDisplayValue=="profiling"){
        $(".cplBlk").show();
        $("#servicetitle").html("Profiling");
        $("#completiondate").hide();
        $("#schedule").show();
        $("#customqlabel").html("Custom Question");
        $("#customqtr").show();
        $("#suppressionprevious,#deliverymethod").show();
	}
	if(productTypeDisplayValue=="data"){
        $(".cplBlk").show();
        $("#servicetitle").html("Data");
        $("#schedule,#deliverymethod").hide();
        $("#completiondate").show();
        $("#customqtr").hide();
        $("#suppressionprevious").hide();
	}
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


function displayCountries(){
	$('#countryNameSpin').show();
			if(specificCountryObj != "") {
				var countryVal = $("#country").val().split(",");
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
		if($("#country").val() != null && $("#country").val() != "") {
			var countryArray = $("#country").val().split(",");
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
		if($("#country").val() != null && $("#country").val() != "") {
			var countryArray = $("#country").val().split(",");
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
	$("#country").val(specificCountryOptions);
	
	return false;
}

function createSpecificCountryData()
{
	var jsonData="";
		if($("#country").val() != null && $("#country").val() != "") {
			var countryArray = $("#country").val().split(",");
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
		url		:	"loadcountriesForOrder.do",
		async	:	false,
		success	:	function(data) {
			if(data != null && data != "") {
				debugger;
				specificCountryObj = JSON.parse(data);
				var countryHTML='<option value="">--select from list--</option>';
				$.each(specificCountryObj, function(key, value){
					countryHTML=countryHTML+'<option value="'+value+'">'+ key+ '</option>';
				});
				$("#launchCountry").html(countryHTML);
				countryvalues = countryHTML;
			}
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
				var industryVal = $("#industry").val().split(",");
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
		if($("#industry").val() != null && $("#industry").val() != "") {
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
	var $target = $(event.currentTarget),
	val = $target.find('input[type="checkbox"]').attr('value'),
	$inp = $target.find('input[type="checkbox"]'),
	idx;
	
	if(industryOptions == "") {
		if($("#industry").val() != null && $("#industry").val() != "") {
			var industryArray = $("#industry").val().split(",");
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
	$("#industry").val(industryOptions);
	return false;
}

function complete(index) {
	var orderID = recOrderViewArr[index].workorder.workorder_id_text;
	$.confirm({
		'message'	: 'Are you sure you want to finish the campaign?',
		'buttons'	: {
						'<span class="fa fa-check fa-2x" aria-hidden="true"></span> Yes' : {
									'class'	: 'yes',
									'action': function(){
										
													completeOrder(orderID);
												}
						},
						'<span class="fa fa-times fa-2x" aria-hidden="true"></span>  No' : {
									'class'	: 'no',
									'action': function(){}	// Nothing to do in this case. You can as well omit the action property.
						}
		}
	});
}


function completeOrder(orderID){
	$('#loadBg').show();
	$("body").addClass("p-0");
	$.ajax({
		url : "completeOrder.do?orderId="+orderID,
		success : function(result) {
			fetchTotalOrderCountForFilter();
			loadData();
		},
		error		:	function(xhr, textStatus, errorThrow) {
			$('#loadBg').hide();
			$("body").removeClass("p-0");
			$("#errorMsg").html("* Error occurred while completing the order.").show();
			setTimeout(function(){$("#errorMsg").html('');},validationMessageTimeout);
			return false;
		}
	});
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
	
	
		$("#empSize").html(resultMin);
		$("#empSizeMax").html(resultMax);
	
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
	
		$("#revenue").html(resultMin);
		$("#revenueMax").html(resultMax);
	
	}
}	

function uploadDataList (index, customQuestionLength, opportunityId, serviceType) {
	var orderId = recOrderViewArr[index].workorder.workorder_id_text;
			$("#cpDatalist_orderid").val(orderId);
			$("#cpDatalist_opportunityid").val(opportunityId);
			$("#cpDatalist_serviceType").val(serviceType);
			$("#noOfLeadSent").val("");
			$.ajax({
				url : "getDeliveredLeads.do?orderId="+orderId,
				async:false,
				success : function(result) {
					debugger;
					if(result != null && result != "") {
						result = JSON.parse(result);
					$("#noOfLeadDel").val(result.count);
					$("#noOfLeadCPL").val(result.totalLeadCount);
					totalNoOfLeadDel = result.count;
					$("#cpDatalist_programId").val(result.programId);
					}
				}
			});
}


function uploadEcmLeadData() {
	var programId = $("#cpDatalist_programId").val();
	var noOfLeadsToBeSent = $("#noOfLeadSent").val();
	 if($("#noOfLeadSent").val() <=0){
		 $("#noOfLeadSentMsg").html("* No Of Leads To Be Uploaded cannot be blank or zero.").show();
			setTimeout(function(){$('#noOfLeadSentMsg').html("");},4000);
			return false; 
	 }
	 if(($("#noOfLeadSent").val() && parseInt($("#noOfLeadSent").val())>totalNoOfLeadDel)){
			$("#noOfLeadSentMsg").html("* No of sent leads cannot be greater than "+totalNoOfLeadDel).show();
			setTimeout(function(){$('#noOfLeadSentMsg').html("");},4000);
			return false;
	 }
	 $('#error').html("").hide();
	 $("#uploadCallingLoader").show();
	 
	 $.ajax({
			url : "uploadEcmLeadData.do?programId="+programId+"&leadsToBeSent="+noOfLeadsToBeSent,
			async:false,
			success		:	function(data, textStatus, xhr) {
				$("#uploadCallingLoader").hide();
				var jsonData = JSON.parse(data);
				var successMsg = jsonData.message;
				if(successMsg != null && successMsg != "") {
					$('#commAddMsg').show();
					setTimeout(function() {
				        $('#commAddMsg').fadeOut();}, 2000);
					$("#cplUploadData").modal('hide');
					fetchTotalOrderCountForFilter();
					loadData();
					//window.location.href=serContext+"/amusorder.do";
				}
				else {
					$('#commErrMsg').show().fadeOut('slow');
						return false;
				}
		},
			error		:	function(xhr, textStatus, errorThrow) {
				console.log(xhr);
				console.log(textStatus);
				console.log(errorThrow);
				$("#dialog" ).dialog("close");
			}
		});
}


function openCommentBlockForRework(index)
{
	rework = "true";
	if(index != null) {
		var orderId = recOrderViewArr[index].workorder.workorder_id_text;
		$("#worklog_orderid").val(orderId);
	}
	var commentsmodal = document.getElementById("commentsmodal");
	var modalHTML='';
	
	$.ajax({
		url:"getworklog?order_id="+$("#worklog_orderid").val(),
		crossDomain:true,
		type:'GET',
	
		success: function(data, textStatus, xhr)
		{
			console.log(data);
			for (var key in data.worklog) {
				var createdOn = new Date(data.worklog[key].createdon);
				var date = createdOn.getDate();
			    var month = createdOn.getMonth()+1;
			    var hours = createdOn.getHours();
			    var minutes = createdOn.getMinutes();
			    var seconds = createdOn.getSeconds();
			    createdOn = createdOn.getFullYear()+"-"+((month <= 9 ? '0'+month : month)+"-"+(date <= 9 ? '0'+date : date))+" "+(hours <= 9 ? '0'+hours : hours)+":"+(minutes <= 9 ? '0'+minutes : minutes)+":"+(seconds <= 9 ? '0'+seconds : seconds);
				modalHTML = modalHTML
					+ '<div class="commentBlk">  <div class="row"><div class="col-md-1"><div class="userBg"><i class="fa fa-user"></i></div></div><div class="col-md-11"><div class="userBlk"><span class="userTitle">'
					+ data.worklog[key].createdby
					+ '</span>,'
					+ createdOn+' '+data.worklog[key].es_type
					+ '</div></div></div><div class="row"><div class="col-md-11 offset-md-1">'
					+ data.worklog[key].es
					+ '</div></div></div>';
			}
			commentsmodal.innerHTML = modalHTML;
		},
		error : function(xhr, textStatus, errorThrow) {

		}
	});
}

function addComment() {
	//commentarea
	var notes= document.getElementById('commentarea').value;
	var orderID=$("#worklog_orderid").val();
	
	if(notes!='' && notes.length>0)
	{
		$.ajax({
			url:"addworklog?order_id="+orderID,
			crossDomain : true,
			processData : false,
			contentType:  false,
			type : 'POST',
			data:JSON.stringify({"es":notes,"es_type":"Communication","createdby":userName}),
			success : function(json, textStatus, xhr) {
				sendWorkLogEmail(orderID,notes);
				if(rework=="true"){
					$('#workLogModal').modal("hide");
					reworkOrder(orderID);
				}
				else{
				openCommentBlock(null);
				document.getElementById('commentarea').value='';
				$('#commAddMsg').show();
				setTimeout(function() {
			        $('#commAddMsg').fadeOut();}, 2000);
				}
				
			},
			error : function(xhr, textStatus, errorThrow) {
				openCommentBlock(null);
				$('#commErrMsg').show().fadeOut('slow');
			}
		});
	}
	else{
		$('#commErrMsg').show().fadeOut('slow');
	}
}

function reworkOrder(orderId){
	var status = "SALESREWORK"
		$.ajax({
			url : "updateStatus.do?orderId="+orderId+"&status="+status,
			success: function(data)
			{
				$("#loadOrderRecordsLoader").hide();
				
				if(data == "success"){
					$("#successMsg").html("* Record Updated successfully.").show();
					setTimeout(function(){
						$("#successMsg").html("");
						//fetchTotalOrderCount();
						fetchTotalOrderCountForFilter();
						loadData();
					},3000);
				}
				else {
					$("#loadOrderRecordsLoader").hide();
					$("#errorMsg").html("* exception occurred while deleting record in db, kindly check with development team.").show();
					setTimeout(function(){$('#errorMsg').html("");},validationMessageTimeout);
					fetchTotalOrderCountForFilter();
					loadData();
				} 
			},
			error: function(xhr, textStatus, errorThrow)
			{
				$("#salesOrderViewLoader").hide();
				$("#errorMsg").html("* error occurred while deleting record in db, kindly check with development team.").show();
				setTimeout(function(){$('#errorMsg').html("");},validationMessageTimeout);
			}		
		});
}

function sendWorkLogEmail(orderId,notes)
{
	$.ajax({
		url:"loadWorkLogEmailData.do?orderId="+orderId+"&notes="+notes+"&notes="+notes+"&userName="+userName,
		async:false,
		success: function(data, textStatus, xhr)
		{
			if(data != null && data != "") {
			data = jQuery.parseJSON(data);
			}
		}
	}); 
}

function calculateLeadStatusCountCQL(index) {
	var orderId = recOrderViewArr[index].workorder.workorder_id_text;
	$("#leadStatusLoader").show();
	$("#totalLeads").html(0);
	$("#totalQueuedCount").html(0);
	$("#totalDeliveredCount").html(0);
	$("#totalDicardedCount").html(0);
	$("#totalMismatchCount").html(0);
	//$("#totalOverageCount").html(0);
	$("#totalCompletedCount").html(0);
	$("#totalUnsubscribedCount").html(0);
	$("#totalNewCount").html(0);
	$("#totalDuplicateCount").html(0);
	$("#totalExceptionCount").html(0);
	$("#totalPickedCount").html(0);
	$("#totalPnewCount").html(0);
	$("#totalRunningQueueCount").html(0);
	$("#totalBouncedCount").html(0);
	$.ajax({
			url		:	'fetchLeadStatusCountCQL.do?orderId='+orderId,
			success	:	function(data, textStatus, xhr){
								$("#leadStatusLoader").hide();
								data = JSON.parse(data);
								if(data != null && data.length > 0) {
										for(i=0; i<data.length; i++) {
											if(data[i].totalLead != null && data[i].totalLead != "" && data[i].totalLead >0) {
												$("#totalLeads").html(data[i].totalLead);
												if(data[i].leadInQueue != null && data[i].leadInQueue != "") {
													$("#totalQueuedCount").html(data[i].leadInQueue);
												}
												if(data[i].leadDelivered != null && data[i].leadDelivered != "") {
													$("#totalDeliveredCount").html(data[i].leadDelivered);
												}
												if(data[i].leadDiscarded != null && data[i].leadDiscarded != "") {
													$("#totalDicardedCount").html(data[i].leadDiscarded);
												}
												if(data[i].leadNew != null && data[i].leadNew != "") {
													$("#totalNewCount").html(data[i].leadNew);
												}
												if(data[i].leadMismatched != null && data[i].leadMismatched != "") {
													$("#totalMismatchCount").html(data[i].leadMismatched);
												}
												/*if(data[i].leadOverage != null && data[i].leadOverage != "") {
													$("#totalOverageCount").html(data[i].leadOverage);
												}*/
												if(data[i].leadCompleted != null && data[i].leadCompleted != "") {
													$("#totalCompletedCount").html(data[i].leadCompleted);
												}
												if(data[i].leadUnsubscribed != null && data[i].leadUnsubscribed != "") {
													$("#totalUnsubscribedCount").html(data[i].leadUnsubscribed);
												}
												if(data[i].leadDuplicate != null && data[i].leadDuplicate != "") {
													$("#totalDuplicateCount").html(data[i].leadDuplicate);
												}
												if(data[i].leadException != null && data[i].leadException != "") {
													$("#totalExceptionCount").html(data[i].leadException);
												}
												if(data[i].leadPicked != null && data[i].leadPicked != "") {
													$("#totalPickedCount").html(data[i].leadPicked);
												}
												if(data[i].leadPnew != null && data[i].leadPnew != "") {
													$("#totalPnewCount").html(data[i].leadPnew);
												}
												if(data[i].totalRunningQueue != null && data[i].totalRunningQueue != "") {
													$("#totalRunningQueueCount").html(data[i].totalRunningQueue);
												}
												if(data[i].leadBounced != null && data[i].leadBounced != "") {
													$("#totalBouncedCount").html(data[i].leadBounced);
												}
												
											}else{
												$("#totalLeads").html(0);
												$("#totalQueuedCount").html(0);
												$("#totalDeliveredCount").html(0);
												$("#totalDicardedCount").html(0);
												$("#totalMismatchCount").html(0);
												//$("#totalOverageCount").html(0);
												$("#totalCompletedCount").html(0);
												$("#totalUnsubscribedCount").html(0);
												$("#totalNewCount").html(0);
												$("#totalDuplicateCount").html(0);
												$("#totalExceptionCount").html(0);
												$("#totalPickedCount").html(0);
												$("#totalPnewCount").html(0);
												$("#totalRunningQueueCount").html(0);
												$("#totalBouncedCount").html(0);
												checkProgramNameForOrder(orderId);
											}
														
											}
										}
								else {
										$("#totalLeads").html(0);
										$("#totalQueuedCount").html(0);
										$("#totalDeliveredCount").html(0);
										$("#totalDicardedCount").html(0);
										$("#totalMismatchCount").html(0);
										//$("#totalOverageCount").html(0);
										$("#totalCompletedCount").html(0);
										$("#totalUnsubscribedCount").html(0);
										$("#totalNewCount").html(0);
										$("#totalDuplicateCount").html(0);
										$("#totalExceptionCount").html(0);
										$("#totalPickedCount").html(0);
										$("#totalPnewCount").html(0);
										$("#totalRunningQueueCount").html(0);
										$("#totalBouncedCount").html(0);
								}
						},
			error	:	function(xhr, textStatus, errorThrow) {
							$("#totalLeads").html(0);
							$("#totalQueuedCount").html(0);
							$("#totalDeliveredCount").html(0);
							$("#totalDicardedCount").html(0);
							$("#totalMismatchCount").html(0);
							//$("#totalOverageCount").html(0);
							$("#totalCompletedCount").html(0);
							$("#totalUnsubscribedCount").html(0);
							$("#totalNewCount").html(0);
							$("#totalDuplicateCount").html(0);
							$("#totalExceptionCount").html(0);
							$("#totalPickedCount").html(0);
							$("#totalPnewCount").html(0);
							$("#totalRunningQueueCount").html(0);
							$("#totalBouncedCount").html(0);
						}
	});
}

function checkProgramNameForOrder(orderId) {
	$("#leadStatusLoader").show();
	$.ajax({
			url		:	'checkProgramNameForOrder.do?orderId='+orderId,
			success	:	function(data, textStatus, xhr){
				var jsonData = JSON.parse(data);
				var successMsg = jsonData.message;
				if(successMsg != null && successMsg != "") {
					$("#leadStatusLoader").hide();
					$("#leadStatusErrorMsg1").html(successMsg).show();
					setTimeout(function(){$('#leadStatusErrorMsg1').html("").hide();
					},5000);
					
					//$('#leadStatusModalForCQL').modal("hide");
				}
				else {
						$("#error").html("error while fetching the data").show();
						return false;
				}
			}
	});
}


function loadCreatedBy() {
	var finalURL = "loadCreatedBy.do";
	$.ajax({
		url : finalURL,
		async:false,
		success : function(result) {
			var resultValue = result.toString();
			$("#createdby").html(result);
		}
	});
}

function displayYesFromOppr(){
	$('#yesFromOpprSpin').show();
	$.ajax({
		url		:	"loadDistinctOpportunity.do",
		success	:	function(data) {
			yesFromOpprObj=JSON.parse(data);
			var yesFromOpprVal = $("#yesFromOppr").val().split("||");
			html = '';
			for(i=0;i<yesFromOpprObj.length;i++) {
				if(yesFromOpprVal != null && yesFromOpprVal != "" && yesFromOpprVal.indexOf(yesFromOpprObj[i].opportunity_name)>-1 && yesFromOpprObj[i].sales_opportunity_id_text!=selectedRecordData.opportunityID) {
					html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectYesFromOppr(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=yesFromOppr'+i+' value="'+yesFromOpprObj[i].sales_opportunity_id_text+'" checked><label class="form-check-label" for="order'+i+'">'+yesFromOpprObj[i].opportunity_name+'</label></div></div>';
				}
				else if(yesFromOpprObj[i].sales_opportunity_id_text!=JSON.parse(selectedRecordData.workorder).sf_opportunityid){
					html=html+'<div class="dropdown-item py-0 px-1" onClick="selectYesFromOppr(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=yesFromOppr'+i+' value="'+yesFromOpprObj[i].sales_opportunity_id_text+'"><label class="form-check-label" for="order'+i+'">'+yesFromOpprObj[i].opportunity_name+'</label></div></div>';
				}
			}
			$("#yesFromOpprMultiSelect").html(html);
			$("#yesFromOpprMultiSelectParent").show().css("width", "100%");
			$('#yesFromOpprSpin').hide();
		}
	});
}

function filterYesFromOppr() {
	html='';
	if(yesFromOpprOptions == "" && opprIdOptions == "" && prefillYesFromOpprId == true) {
		if($("#yesFromOpportunityName").val() != null && $("#yesFromOpportunityName").val() != "") {
			var data = JSON.parse($("#yesFromOpportunityName").val());
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
			var searchedText=$('#yesFromOpprSearch').val();
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
	$("#yesFromOpprMultiSelect").html(html);
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
		if($("#yesFromOpportunityName").val() != null && $("#yesFromOpportunityName").val() != "") {
			var data = JSON.parse($("#yesFromOpportunityName").val());
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
			if($("#yesFromOpportunityName").val() != null && $("#yesFromOpportunityName").val() != "") {
				var data = JSON.parse($("#yesFromOpportunityName").val());
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
	$("#yesFromOpprMultiSelectParent").dropdown('toggle');
	$("#yesFromOppr").val(yesFromOpprOptions);
	$("#yesFromOppr").prop("title",yesFromOpprOptions);
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
	if(opprIdOpprNameJsonArray.length == 0 && ($("#yesFromOppr").val() != null || $("#yesFromOppr").val() != "")){
		if(opprIdOptions == "" && yesFromOpprOptions == "" && prefillYesFromOpprId == true) {
			if($("#yesFromOpportunityName").val() != null && $("#yesFromOpportunityName").val() != "") {
				var data = JSON.parse($("#yesFromOpportunityName").val());
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
		$("#yesFromOpportunityId").val(JSON.stringify(opprIdOpprNameJsonArray));
	}
	else if(($("#yesFromOppr").val() == null || $("#yesFromOppr").val() == "")){
		$("#yesFromOpportunityId").val("");
	}
}

//for created by drop
function loadCreatedBy(){
	debugger;
	$.ajax({
		url		:	"loadAssignedSalesRepAndAMLookup.do",
		success	:	function(result)
		{
			debugger;
			if(result != null && result != "") 
			{
				$("#createdby").val(result);
				displayCreatedBy();
			}
		}
	});
}

function displayCreatedBy(){
	debugger;
	$('#createdBySpin').show();
	$('#productTypeSearch').val('');
	$('#productTypeMultiSelectParent').hide();
	var data=$("#createdby").val();
	
	debugger;
			if(data != null && data != "") {
				createdByObj = JSON.parse(data);
				var createdByVal = $("#selectedCreatedBy").val().split(",");
				createdByProbabilityMap  = new Map();
				html = '';
				var i=0;
				$.each(createdByObj, function(key, value){
					if(createdByVal != null && createdByVal != "" && createdByVal.indexOf(key)>-1) {
						html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectCreatedBy(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedCreatedBy'+i+' value="'+key+'" checked><text style="font-size: 0.8125rem;"  for="selectedCreatedBy'+i+'">'+value+'</label></div></div>';
					}
					else {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectCreatedBy(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedCreatedBy'+i+' value="'+key+'"><text  style="font-size: 0.8125rem;" for="selectedCreatedBy'+i+'">'+value+'</label></div></div>';
					}
					i++;
					
					createdByProbabilityMap.set(key,value);
				});
				$("#createdByMultiSelect").html(html);
				$("#createdByMultiSelectParent").show().css("width", "100%");
				$('#createdBySpin').hide();
				arrow=true;
			}else{
				loadCreatedBy();
			}
}
function filterCreatedBy() {
	html='';
	var i=0;
	if(createdByOptions == "") {
		if($("#selectedCreatedBy").val() != null && $("#selectedCreatedBy").val() != "") {
			var createdByArray = $("#selectedCreatedBy").val().split(",");
			$.each(createdByArray, function(i) {
				createdByOptions.push(createdByArray[i]);
			});
		} 
	}
	
	$.each(createdByObj, function(key, value){
		var searchedText=$('#createdBySearch').val();
		try {
			if(value.toLowerCase().indexOf(searchedText.toLowerCase())>-1){
				if(createdByOptions.length>0) {
					if(createdByOptions.indexOf(key)>-1) {
						html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectCreatedBy(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedCreatedBy'+i+' value="'+key+'" checked><text style="font-size: 0.8125rem;"  for="selectedCreatedBy'+i+'">'+value+'</label></div></div>';
					}
					else {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectCreatedBy(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedCreatedBy'+i+' value="'+key+'"><text  style="font-size: 0.8125rem;" for="selectedCreatedBy'+i+'">'+value+'</label></div></div>';
					}
				}
				else {
					html=html+'<div class="dropdown-item py-0 px-1" onClick="selectCreatedBy(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=selectedCreatedBy'+i+' value="'+key+'"><text  style="font-size: 0.8125rem;" for="selectedCreatedBy'+i+'">'+value+'</label></div></div>';
				}
			}
		}
		catch(e) {
			console.log(e.message);
		}
		i++;
	});
	$("#createdByMultiSelect").html(html);
	$("#createdByMultiSelectParent").show().css("width", "100%");
	$('#createdBySpin').hide();
}
function selectCreatedBy(event) {
	var $target = $(event.currentTarget),
	val = $target.find('input[type="checkbox"]').attr('value'),
	$inp = $target.find('input[type="checkbox"]'),
	idx;
	
	if(createdByOptions == "") {
		if($("#selectedCreatedBy").val() != null && $("#selectedCreatedBy").val() != "") {
			var createdByArray = $("#selectedCreatedBy").val().split(",");
			$.each(createdByArray, function(i) {
				createdByOptions.push(createdByArray[i]);
			});
		} 
	}
	
	if ((idx = createdByOptions.indexOf(val)) > -1) {
		createdByOptions.splice(idx, 1);
		setTimeout(function() {$inp.prop('checked', false)}, 0);
		$inp.prop('checked', false).closest('.dropdown-item').removeClass("active");
	}
	else {
		if(createdByOptions.indexOf(val) == -1) {
			createdByOptions.push(val);
			setTimeout(function() {$inp.prop('checked', true)}, 0);
			$inp.prop('checked', true).closest('.dropdown-item').addClass("active");
		}
	}
	$("#createdByMultiSelectParent").dropdown('toggle');
	//$("#createdByMultiSelectParent").show().css("width", "100%");
	$("#selectedCreatedBy").val(createdByOptions);
	selectCreatedByChecked = true;
	return false;
}

// for new product type
function displayProductType(){
	debugger;
	$('#productTypeSpin').show();
	$.ajax({
		url		:	"loadProductTypes.do",
		success	:	function(data) {
			if(data != "") {
				productTypeObj = JSON.parse(data);
				var productTypeVal = $("#producttype").val().split(",");
				html = '';
				var i=0;
				$.each(productTypeObj, function(key, value){
					if(productTypeVal != null && productTypeVal != "" && productTypeVal.indexOf(value)>-1) {
						html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectProductType(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=producttype'+i+' value="'+value+'" checked><label class="form-check-label" for="producttype'+i+'">'+value+'</label></div></div>';
					}
					else {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectProductType(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=producttype'+i+' value="'+value+'"><label class="form-check-label" for="producttype'+i+'">'+value+'</label></div></div>';
					}
					i++;
				});
				$("#productTypeMultiSelect").html(html);
				$("#productTypeMultiSelectParent").show().css("width", "100%");
				$('#productTypeSpin').hide();
			}
		}
	});
}

function filterproductType() {
	html='';
	var i=0;
	if(productTypeOptions == "") {
		if($("#producttype").val() != null && $("#producttype").val() != "") {
			var productTypeArray = $("#producttype").val().split(",");
			$.each(productTypeArray, function(i) {
				productTypeOptions.push(productTypeArray[i]);
			});
		} 
	}
	
	$.each(productTypeObj, function(key, value){
		var searchedText=$('#productTypeSearch').val();
		try {
			if(value.toLowerCase().indexOf(searchedText.toLowerCase())>-1){
				if(productTypeOptions.length>0) {
					if(productTypeOptions.indexOf(value)>-1) {
						html=html+'<div class="dropdown-item active py-0 px-1" onClick="selectProductType(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=producttype'+i+' value="'+value+'" checked><label class="form-check-label" for="producttype'+i+'">'+value+'</label></div></div>';
					}
					else {
						html=html+'<div class="dropdown-item py-0 px-1" onClick="selectProductType(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=producttype'+i+' value="'+value+'"><label class="form-check-label" for="producttype'+i+'">'+value+'</label></div></div>';
					}
				}
				else {
					html=html+'<div class="dropdown-item py-0 px-1" onClick="selectProductType(event)"><div class="form-check"><input class="form-check-input mt-0" type="checkbox" id=producttype'+i+' value="'+value+'"><label class="form-check-label" for="producttype'+i+'">'+value+'</label></div></div>';
				}
			}
		}
		catch(e) {
			console.log(e.message);
		}
		i++;
	});
	$("#productTypeMultiSelect").html(html);
}

function selectProductType(event) {
	var $target = $(event.currentTarget),
	val = $target.find('input[type="checkbox"]').attr('value'),
	$inp = $target.find('input[type="checkbox"]'),
	idx;
	
	if(productTypeOptions == "") {
		if($("#producttype").val() != null && $("#producttype").val() != "") {
			var productTypeArray = $("#producttype").val().split(",");
			$.each(productTypeArray, function(i) {
				productTypeOptions.push(productTypeArray[i]);
			});
		} 
	}
	if ((idx = productTypeOptions.indexOf(val)) > -1) {
		productTypeOptions.splice(idx, 1);
		setTimeout(function() {$inp.prop('checked', false)}, 0);
		$inp.prop('checked', false).closest('.dropdown-item').removeClass("active");
	}
	else {
		if(productTypeOptions.indexOf(val) == -1) {
			productTypeOptions.push(val); 
			setTimeout(function() {$inp.prop('checked', true)}, 0);
			$inp.prop('checked', true).closest('.dropdown-item').addClass("active");
		}
	}
	$("#productTypeMultiSelectParent").dropdown('toggle');
	$("#producttype").val(productTypeOptions);
	selectProductTypeChecked = true;
	return false;
}

function openHoldReasonBlock(index) {
	var orderId = recOrderViewArr[index].workorder.workorder_id_text;
	$("#holdReason_orderid").val(orderId);
}


function holdOrder() {
	var orderID = $("#holdReason_orderid").val();
	$.confirm({
		'message'	: 'Are you sure you want to hold the campaign?',
		'buttons'	: {
						'<span class="fa fa-check fa-2x" aria-hidden="true"></span> Yes' : {
									'class'	: 'yes',
									'action': function(){
													holdCampaign(orderID);
												}
						},
						'<span class="fa fa-times fa-2x" aria-hidden="true"></span>  No' : {
									'class'	: 'no',
									'action': function(){}	// Nothing to do in this case. You can as well omit the action property.
						}
		}
	});
}

function holdCampaign(orderID){
	var notes= document.getElementById('reasonarea').value;
	$('#loadBg').show();
	$("body").addClass("p-0");
	$.ajax({
		url : "holdOrder.do?orderId="+orderID+"&reason="+notes,
		success : function(result) {
			$("#reasonForHoldModal").modal("hide");
			fetchTotalOrderCountForFilter();
			loadData();
		},
		error		:	function(xhr, textStatus, errorThrow) {
			$('#loadBg').hide();
			$("body").removeClass("p-0");
			$("#errorMsg").html("* Error occurred while completing the order.").show();
			setTimeout(function(){$("#errorMsg").html('');},validationMessageTimeout);
			return false;
		}
	});
}

function restartOrder(index) {
	var orderID = recOrderViewArr[index].workorder.workorder_id_text;
	$.confirm({
		'message'	: 'Are you sure you want to restart the campaign?',
		'buttons'	: {
						'<span class="fa fa-check fa-2x" aria-hidden="true"></span> Yes' : {
									'class'	: 'yes',
									'action': function(){
										
													restartCampaign(orderID);
												}
						},
						'<span class="fa fa-times fa-2x" aria-hidden="true"></span>  No' : {
									'class'	: 'no',
									'action': function(){}	// Nothing to do in this case. You can as well omit the action property.
						}
		}
	});
}

function restartCampaign(orderID){
	$('#loadBg').show();
	$("body").addClass("p-0");
	$.ajax({
		url : "resumeOrder.do?orderId="+orderID,
		success : function(result) {
			fetchTotalOrderCountForFilter();
			loadData();
		},
		error		:	function(xhr, textStatus, errorThrow) {
			$('#loadBg').hide();
			$("body").removeClass("p-0");
			$("#errorMsg").html("* Error occurred while resatring the order.").show();
			setTimeout(function(){$("#errorMsg").html('');},validationMessageTimeout);
			return false;
		}
	});
}

function displayProductTypeRadio(){
	$('#productTypeDisplay').html("");
	
	$.ajax({
		url		:	"loadProductTypes.do",
		success	:	function(data) {
			if(data != "") {
				productTypeObj = JSON.parse(data);
				$.each(productTypeObj, function(key, value){
					$('#productTypeDisplay')
					.append(`<div class="custom-control custom-radio custom-control-inline"><input type="radio"  onclick="updateCampaignName()" id="${value}_Chk" name="serviceType" value="${value}" class="custom-control-input"><label for="${value}_Chk" class="custom-control-label col-form-label-sm pt-0">${value}</label></div>`)
				});
			}
		}
	});
}

function updateCampaignName(){
	//var productType = $(this).attr("value");
	var productType = $("input[name='serviceType']:checked").val();
	var campaignNameOld = $("#campaignName").val();
	
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
	$("#campaignName").val(newstring);
	console.log($("#campaignName").val());
	oldProductType = productType;
}


function resetFilter(){
	
	$("#orderViewFilter").trigger('reset');
	sequence = 0;
	sequenceForQuery = 0;
	pageCount = 1
	document.getElementById('pageValue').innerHTML = "P"+pageCount;
	$("#statusType").val("");
	$("#selectedRegion").val("");
	$("#producttype").val("");
	$("#selectedCreatedBy").val("");
	fetchTotalOrderCountForFilter();
	fetchStatusTypeData();
	recOrderViewArr = [];
	productTypeOptions = [];
	$("#selectCampaignAccount").val("");
	$("#selectedCampaignName").hide();
	
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

function goBackToPrevious() {
	window.history.back();
}