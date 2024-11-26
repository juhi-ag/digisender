<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>File Upload</title>
<link rel="apple-touch-icon" sizes="180x180" href="${pageContext.request.contextPath}/resources/images/fav/apple-touch-icon.png">
<%-- <link rel="icon" type="image/png" sizes="32x32" href="${pageContext.request.contextPath}/resources/images/fav/favicon-foundry.png"> --%>
<%-- <link rel="icon" type="image/png" sizes="16x16" href="${pageContext.request.contextPath}/resources/images/fav/favicon-16x16.png"> --%>
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
<style type="text/css">.dropzone-desc .fa-upload{position:absolute; top: 0px; left:-40px; font-size:42px}
/* table.dataTable.table-sm>thead>tr>th:first-child {
    width:31px !important;
    padding-right:5px !important;
    text-align:center;
    
} */
</style>



<script>
var loginUserName = "${user}";
var clientCrmIdValue = "";
var statusValue = "";
var recArr=new Array();
var sequence = 0;
var sequenceForQuery = 0;
var pageCount = 1;
var file_upload_table ='';
var crmRawDataTable ='';
var hiddenIntegrationId='';
var child_table='';
var jsonDataForChildTable ='';
var myTable ='';
var prevEditId='';
var queryForIntegration='';
var sourceIdValue='';
var searchFlag = true;
var role = "${role}";
var fileUploadRecordLimit = "${ldUiPropertyConfig.ldFileUploadRecordsLimit}";
var fileUploadSizeLimit = "${ldUiPropertyConfig.ldFileUploadSizeLimit}";
var refreshPageTimer = "${ldUiPropertyConfig.refreshTimer}";
var exceedPageTimer = "${ldUiPropertyConfig.exceedTimer}";
var exceedInMin="${exceedInMin}";

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
	if(role != "") {
		$("#divDrpDownMenuItem").html("<div class='dropdown-menu' aria-labelledby='dLabel'><a class='dropdown-item' href='index' title='Go to Home'><i class='fa fa-home fa-lg' aria-hidden='true'></i> &nbsp; Home</a><div class='dropdown-divider'></div>"
			+"<a class='dropdown-item' onclick='goBackToPrevious()' title='Go Back'> &nbsp; Go Back</a>"
			+"<a class='dropdown-item' href='updateIntegration.do' title='Update Datapass'> &nbsp; Update Datapass</a>");
	}
	
	//fetchIntegrationName();
	$("#childTableDiv").hide();
	loadIntegrationType();
	//loadDataLimit();
	loadIntegrationName();
	fetchFileUploadDataFromClientCRM();
	document.getElementById('loadNext').disabled = true;
	
	debugger;
	if(fileUploadRecordLimit != null && fileUploadRecordLimit != "" && fileUploadRecordLimit != "undefined"){
		
	}else{
		fileUploadRecordLimit = "1000";
	}
	if(fileUploadSizeLimit != null && fileUploadSizeLimit != "" && fileUploadSizeLimit != "undefined"){
		
	}else{
		fileUploadSizeLimit = "1MB";
	}
	var uploadFileHeading = "("+fileUploadRecordLimit+" records, "+fileUploadSizeLimit+" Maximum)";
	$("#filelimit").html(uploadFileHeading);
	
	$('body').on('change', '#checkViewAll', function() {
		var rows, checked;
		rows = $('#crmRawDataFileUploadTable').find('tbody tr');
		checked = $(this).prop('checked');
		$.each(rows, function() {
		 var checkbox = $($(this).find('td').eq(0)).find('input').prop('checked', checked);
			 if(checked){
				 $(this).closest('tr').addClass('selected');
		      } else {
		    	  $(this).closest('tr').removeClass('selected');
		      }  
		  
		});
	});
	
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
		fetchFileUploadDataFromClientCRM();
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
		fetchFileUploadDataFromClientCRM();
	});
	
	$('#fileUploadTable tbody').on('click', 'td.dt-control', function () {
		var rowIndex = file_upload_table.cell( this ).index().row;
		hiddenIntegrationId = recArr[rowIndex].integrationId;
		var tr = $(this).closest('tr');
		   var row = file_upload_table.row(tr);
		   if ( row.child.isShown() ) {
		    // This row is already open - close it
		    row.child.hide();
		    tr.removeClass('shown');
		   }
		   else {
		    // Open this row
		    row.child( format(row.data()) ).show();
		    tr.addClass('shown');
		   }
	});
});
	
function uploadFileData() {
	/* if($("#fileUpldIntgName").val() == "") {
		$("#uploadFileErrorMsg").html("* kindly select the Integration name.").show();
		$('#fileUpldIntgName').css('border-color','#cf1133');
	   	setTimeout(function() {$("#uploadFileErrorMsg").hide()}, 5000);
	   	return false;
	} */
	if($("#file_upload").val()==""){
	  	$("#integrationFileUploadErrorMsg").html("* kindly select the file to upload.").show();
	   	setTimeout(function() {$("#integrationFileUploadErrorMsg").hide()}, 5000);
	   	return false;
	}
	uploadFile();
}

function uploadFile(){
	$("#integrationFileUploadLoader").show();
	document.getElementById('fileUploadBtn').disabled = true;
	debugger;
	var formData=new FormData();
	formData.append("file",$("#file_upload")[0].files[0]);
	var fileSize = $("#file_upload")[0].files[0].size;
	var fileSizeValue='';
	if(fileUploadSizeLimit != null && fileUploadSizeLimit != "" && fileUploadSizeLimit !="undefined"){
		if(fileUploadSizeLimit.indexOf("KB") != -1){
			fileSizeValue = fileUploadSizeLimit.replace("KB",'');
		    console.log("fileSizeValue in KB::"+fileSizeValue);
		}else if(fileUploadSizeLimit.indexOf("MB") != -1){
			fileSizeValue = fileUploadSizeLimit.replace("MB",'');
			fileSizeValue = fileSizeValue * (1024*1024);
		    console.log("fileSizeValue from MB To KB::"+fileSizeValue);
		}else if(fileUploadSizeLimit.indexOf("GB") != -1){
			fileSizeValue = fileUploadSizeLimit.replace("GB",'');
			fileSizeValue = fileSizeValue * (1024*1024*1024);
		    console.log("fileSizeValue from GB To KB::"+fileSizeValue);
		}else{
			$("#integrationFileUploadErrorMsg").html("File size is not in correct format.").show();
			$("#integrationFileUploadLoader").hide();
			$("#uploadedFileName").html("");
			$("#file_upload").attr("title", "");
			$("#file_upload").val("");
			document.getElementById('fileUploadBtn').disabled = false;
			setTimeout(function(){
				$('#integrationFileUploadErrorMsg').html("").hide();
			},5000);
			return false;
		}
	}
	
	var fileName = $('#file_upload').prop("files")[0]['name'];
	//var integrationName = $('select[name=fileUpldIntgName]').find(':selected').text();
	//var integrationId = recArr[]
	
	if(fileName.lastIndexOf(".csv") != -1 || fileName.lastIndexOf(".xls") != -1 || fileName.lastIndexOf(".xlsx") != -1) {		
		console.log("fileSize in byte::"+fileSize);
		fileSize = fileSize / 1000;
		console.log("fileSize in KB::"+fileSize);
		if(fileSize >= fileSizeValue){
			$("#integrationFileUploadLoader").hide();
			$("#uploadedFileName").html("");
			$("#file_upload").attr("title", "");
			$("#file_upload").val("");
			$("#integrationFileUploadErrorMsg").html("File size exceeded "+fileUploadSizeLimit+".").show();
			document.getElementById('fileUploadBtn').disabled = false;
			setTimeout(function(){
				$('#integrationFileUploadErrorMsg').html("").hide();
			},5000);
		}else{
			$.ajax({
				url: "uploadFile.do?username="+loginUserName+"&integrationId="+$("#hiddenCrmId").val()+"&integrationName="+$("#hiddenIntegrationName").val(),
				data:formData,
				contentType: false,
				cache:false,
				processData: false,
				type: "POST",
				success: function(data, textStatus, xhr)
				{ 
					$("#integrationFileUploadLoader").hide();
					document.getElementById('fileUploadBtn').disabled = false;
					//alert(data);
					if(data !=null && data !="" && data !="undefined"){
						if(data == "success"){
							$("#uploadedFileName").html("");
							$("#file_upload").val("");
							//$("#fileUpldIntgName").val("");
							$("#integrationFileUploadSuccessMsg").html("File uploaded successfully").show();
							setTimeout(function(){
								//$('#fileUpldIntgName').css('border-color','#ced4da');
								$("#integrationFileUpload").hide();
								fetchFileUploadDataFromClientCRM();
								$('#integrationFileUploadSuccessMsg').html("").hide();
							},3000);
						}else if(data == "dataNotExist"){
							$("#uploadedFileName").html("");
							$("#file_upload").val("");
							//$("#fileUpldIntgName").val("");
							$("#integrationFileUploadErrorMsg").html("No data present in file, kindly upload file with data.").show();
							setTimeout(function(){
								//$('#fileUpldIntgName').css('border-color','#ced4da');
								$('#integrationFileUploadErrorMsg').html("").hide();
							},5000);
						}else if(data == "columnNotExist"){
							$("#uploadedFileName").html("");
							$("#file_upload").val("");
							//$("#fileUpldIntgName").val("");
							$("#integrationFileUploadErrorMsg").html("No column is present in file, kindly upload file with column name and data.").show();
							setTimeout(function(){
								//$('#fileUpldIntgName').css('border-color','#ced4da');
								$('#integrationFileUploadErrorMsg').html("").hide();
							},5000);
						}else if(data == "integrationNameNotMatched"){
							$("#uploadedFileName").html("");
							$("#file_upload").val("");
							//$("#fileUpldIntgName").val("");
							$("#integrationFileUploadErrorMsg").html("Datapass name or header not matched with selected dropdown value and file data.").show();
							setTimeout(function(){
								//$('#fileUpldIntgName').css('border-color','#ced4da');
								$('#integrationFileUploadErrorMsg').html("").hide();
							},5000);
						}else if(data == "fileSizeExceed") {
							$("#uploadedFileName").html("");
							$("#file_upload").attr("title", "");
							$("#file_upload").val("");
							$("#integrationFileUploadErrorMsg").html("Number of records in file exceeded "+fileUploadRecordLimit+".").show();
							setTimeout(function(){
								$('#integrationFileUploadErrorMsg').html("").hide();
							},5000);
						}else{
							$("#uploadedFileName").html("");
							$("#file_upload").val("");
							//$("#fileUpldIntgName").val("");
							$("#integrationFileUploadErrorMsg").html("Error occured while uploading the file. kindly check with development team.").show();
							setTimeout(function(){
								//$('#fileUpldIntgName').css('border-color','#ced4da');
								$('#integrationFileUploadErrorMsg').html("").hide();
							},5000);
						}
					}
				}
			});
		}
	}else{
		$("#integrationFileUploadLoader").hide();
		document.getElementById('fileUploadBtn').disabled = false;
		$("#uploadedFileName").html("");
		$("#file_upload").val("");
		$("#integrationFileUploadErrorMsg").html("Only csv, xls and xlsx file are allowed.").show();
		setTimeout(function(){$('#integrationFileUploadErrorMsg').html("").hide();},5000);
  	} 
}
function isNotEmpty(val){
	 return val && val!=null && val!='' && val.trim()!='';
}



function fetchFileUploadDataFromClientCRM(){
	$("#fileUploadLoader").show();
	//var integrationName = $("#fileUpldIntgName").val();
	$('#fileUploadTable').dataTable().fnClearTable();
	var fetchSize = $("#setLimit").val();
	debugger;
	var integrationId = '';
	var selectedIntegrationType = $("#selectedIntegrationType").val();
	/* var integrationName = '';
	if(searchFlag){
		integrationName = $("#integrationnamedrop").val();
	}else{
		integrationId = $("#integrationnamedrop").val();
	} */
	
	var integrationId = $("#integrationnamedrop").val();
	var integrationName = '';
	
	var arr = {userName:loginUserName,integrationId:integrationId,fetchSize:fetchSize,sequence:sequenceForQuery,integrationName:integrationName,integrationType:selectedIntegrationType};
	console.log(JSON.stringify(arr));
	
	$.ajax({
		url:'fetchFileUploadDataFromClientCRM.do',
		//data: encodeURIComponent(JSON.stringify(arr)),
		data: arr,
		success:function(jsonData) {
			debugger;
			if(jsonData != null && jsonData != "" && jsonData != "[]") {
				jsonData = JSON.parse(jsonData);
				$("#totalRecords").html(jsonData.length);
				recArr = jsonData;
				showFileUploadDataFromClientCRM(jsonData);
				$("#fileUploadLoader").hide();
				if($("#setLimit").val() != "" && $("#setLimit").val()!= null && $("#setLimit").val() != undefined){
					if(jsonData.length >= $("#setLimit").val()){
						document.getElementById('loadNext').disabled = false;
					}else{
						document.getElementById('loadNext').disabled = true;
					}
				}
				else{
					if(jsonData.length >= elasticSearchFetchSize){
						document.getElementById('loadNext').disabled = false;
					}else{
						document.getElementById('loadNext').disabled = true;
					}
				}
				//document.getElementById('loadNext').disabled = false;
			}else{
				$("#fileUploadLoader").hide();
				$("#totalRecords").html(0);
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
function showFileUploadDataFromClientCRM(jsonData) {
	debugger;
		file_upload_table=$('#fileUploadTable').DataTable({
		processing : true,
		scrollX:true,
		destroy: true,
	    searching: true,
		data: jsonData,
		"columns" : [
			{ data : "serialNo",title: "S No.",defaultContent:""},
			{  "targets": 0,
		    	   className: 'dt-control',
		    	   data: null,
		    	   defaultContent: '',
		    	    orderable:false,


		    	  'render': function (data, type, full, meta){
		    	   return data.AddRemoveSign;
		    	   
		    	  }

		    	  },
		/* { data : "serialNo",title: "S No.",defaultContent:""}, */
		{ data : "integrationName",title: "Datapass Name",defaultContent:""},
		{ data : "dataPassType",title: "Datapass Type",defaultContent:""},
		{ data : "total",title: "Total Records",defaultContent:""},
		{ data: "totalRecordProcessed", title: "Record Processed", defaultContent: ""},
		{ data : "totalRecordError",title: "Total Error",defaultContent:""},
		{ data : "uploadFile",title: "Upload",defaultContent:""},
		/* { data : "updatedBy",title: "Updated By",defaultContent:""}, */
		
		],
	});
}
function format(d) {
	// `d` is the original data object for the row
	$("#dwnldLeadsLoader").show();
	var arr = {userName:loginUserName,integrationId:hiddenIntegrationId};
	console.log(JSON.stringify(arr));
	$.ajax({
		url:'fetchFileUploadData.do',
		//data: encodeURIComponent(JSON.stringify(arr)),
		data: arr,
		async:false,
		success:function(jsonData) {
			debugger;
			jsonDataForChildTable=jsonData;
		}
	});
	if(jsonDataForChildTable != null && jsonDataForChildTable != "" && jsonDataForChildTable != "[]") {
		debugger;
		jsonDataForChildTable = JSON.parse(jsonDataForChildTable);
		$("#dwnldLeadsLoader").hide();
		var childTableDataValue = loadChildTableData(jsonDataForChildTable); 
		return (
			    '<table id="childTable" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px; width:100%">' +
			    '<thead>' +
			    '<tr>' +
			     '<th>File Name</th>' +
			     '<th>Total Records</th>' +
			     '<th>Record Processed</th>' +
			     '<th>Total Error</th>' +
			     '<th>Uploaded By</th>' +
			    '</tr>' +
			    '</thead>' +
			    '<tbody>' +
			    ''+childTableDataValue+''+
			    '<tbody>' +
			    '</table>'
		);
	}else{
		$("#fileUploadLoader").hide();
	}
}
 
 function loadChildTableData(jsonDataForChildTable) {
	 var childTableData ='';
	 for(var i=0;i<jsonDataForChildTable.length;i++){
	 	if(childTableData != null && childTableData != '' && childTableData !='undefined'){
	 		var tableData = '<tr><td><div class="file_name ellipsis_cell"><div><span>'+jsonDataForChildTable[i].fileName+'</span></div></div></td><td>'+jsonDataForChildTable[i].fileSize+'</td><td>'+jsonDataForChildTable[i].totalRecordProcessed+'</td><td>'+jsonDataForChildTable[i].totalRecordError+'</td><td>'+jsonDataForChildTable[i].createdBy+'</td></tr>';
	 		childTableData = childTableData.concat(tableData);
	 	}else{
	 		childTableData = '<tr><td><div class="file_name ellipsis_cell"><div><span>'+jsonDataForChildTable[i].fileName+'</span></div></div></td><td>'+jsonDataForChildTable[i].fileSize+'</td><td>'+jsonDataForChildTable[i].totalRecordProcessed+'</td><td>'+jsonDataForChildTable[i].totalRecordError+'</td><td>'+jsonDataForChildTable[i].createdBy+'</td></tr>';
	 	}
	 }
	 return childTableData;
 }

function resetFilterForFileUpload(){
	searchFlag = false;
	$("#fileUpldIntgName").val("");
	$("#integrationnamedrop").empty().trigger('change');
	$("#selectedIntegrationType").val("");
	fetchFileUploadDataFromClientCRM();
	searchFlag = true;
}

function refreshFileUpload(){
	fetchFileUploadDataFromClientCRM();
}

function loadFileRecords(clientCrmId,status,sourceId){
	document.getElementById('downloadSelected').disabled = true;
	document.getElementById('downloadAll').disabled = true;
	document.getElementById('closeDownloadModelCrossButton').disabled = true;
	document.getElementById('closeDownloadModelButton').disabled = true;
	clientCrmIdValue = clientCrmId;
	statusValue = status;
	sourceIdValue = sourceId;
	$("#dwnldLeadsLoader").show();
	//$('#crmRawDataFileUploadTable tbody').empty();
	$('#checkViewAll').prop("checked", false);
	var rows_selected = [];
	$.ajax({
		url : 'loadFileRecords.do?clientCrmId='+clientCrmId+"&status="+status+"&sourceId="+sourceId,
		dataType:'json',
		"type" : 'POST',
		"dataSrc": "",
		success:function(dataSet) {
			debugger;
			$("#dwnldLeadsLoader").hide();
			if(dataSet != null && dataSet != "" && dataSet != "[]") {
				var columns = [];
				$.each( dataSet[0], function( key, value ) {
						debugger;
						var item = {};
						if(key == "rawdataid" || key =="deportfields"){
							item.visible= false;
						}
				        item.data = key;
				        item.title = key;
				        columns.push(item);
				});
				columns[0].orderable = false;
				var myTable = $('#crmRawDataFileUploadTable').DataTable({
					data: dataSet,
					scrollX : true,
					//order: [[0, 'false']],
					//"orderable" : false,
				    "columns": columns,
				});
				document.getElementById('downloadSelected').disabled = false;
				document.getElementById('downloadAll').disabled = false;
				document.getElementById('closeDownloadModelCrossButton').disabled = false;
				document.getElementById('closeDownloadModelButton').disabled = false;
			}
		}
	});
	debugger;
	if(myTable !=null && myTable!="" && myTable!="undefined"){
		$("#dwnldLeadsModal").on('shown.bs.modal', function () {myTable.columns.adjust().draw();});
	}
}

function test(row){
	$(row).closest('tr').toggleClass('selected');
	
}

 function downloadAll(){
	$("#dwnldLeadsLoader").show();
	var crmRawDataIds='';
	if($('#crmRawDataFileUploadTable').DataTable().rows( { filter : 'applied'} ).nodes().length > 0 ){
		document.location.href ='downloadFileRecords.do?clientCrmId='+clientCrmIdValue+"&sourceId="+sourceIdValue+"&status="+statusValue+"&crmRawDataIds="+crmRawDataIds;
		setTimeout(function(){
			$("#dwnldLeadsLoader").hide();
		},3000); 
	}
	else{
		$("#dwnldLeadsLoader").hide();
		$("#downloadErrorMsg").html("No data available to download").show();
		setTimeout(function(){
			$("#downloadErrorMsg").html("").hide();
		},3000);
	} 
	
}

function downloadSelected(){
	$("#dwnldLeadsLoader").show();
	debugger;
	var table=$('#crmRawDataFileUploadTable').DataTable();
	var selectedIndices=table.rows('.selected')[0];
	if(selectedIndices !=null && selectedIndices !=""){
		var crmRawDataIds=[];
		var selectedIndecesLength=selectedIndices.length;
		for(var i=0;i<selectedIndecesLength;i++){
			var index=selectedIndices[i];
			crmRawDataIds.push(table.data()[index].rawdataid);
		}
		var crmRawDataIds=(crmRawDataIds.join(","));
		document.location.href ='downloadFileRecords.do?clientCrmId='+clientCrmIdValue+"&sourceId="+sourceIdValue+"&status="+statusValue+"&crmRawDataIds="+crmRawDataIds;
		setTimeout(function(){
			$("#dwnldLeadsLoader").hide();
		},3000);
	}
	else{
		$("#dwnldLeadsLoader").hide();
		$("#downloadErrorMsg").html("Please select alteast one row").show();
		setTimeout(function(){
			$("#downloadErrorMsg").html("").hide();
		},4000);
	} 
}

function closeDownloadModal() {
	$('#crmRawDataFileUploadTable').DataTable().destroy();
	$('#crmRawDataFileUploadTable thead').empty();
	$('#crmRawDataFileUploadTable tbody').empty();
	$("#dwnldLeadsModal").modal("hide");
}

function reviewTestResponse(crmRawDataId){
	$('#reviewTestResponse').modal('show');
	$("#testRequest").val("");
	$("#testResponse").val("");
	$("#reviewTestResponseLoader").show();
	$.ajax({
		url:'reviewTestResponseForFileUpload.do?crmRawDataId='+crmRawDataId,
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

function loadIntegrationName() {
    debugger;
    $("#integrationnamedrop").select2({
    	//tags: true,
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
	    		searchPage: 'upload'
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

function closeFileUploadModel(){
	$("#integrationFileUpload").hide();
}

function callUploadFile(index){
	debugger;
	$("#uploadedFileName").html("");
	$("#file_upload").val("");
	$("#integrationFileUpload").show();
	$("#hiddenCrmId").val(recArr[index].integrationId);
	$("#hiddenIntegrationName").val(recArr[index].integrationName);
}

function openLoadCampaignLimitModal() {
	$('#loadCampaignLimitModal').modal("show");
}

function loadDataForNewLimit() {
	$("#leadViewLoader").show();
	setTimeout(function() {
		fetchFileUploadDataFromClientCRM();
	}, 1000);
	$('#loadCampaignLimitModal').modal("hide");
	$("#leadViewLoader").hide();
}

/* function loadDataLimit() {
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
 */function callRowEditable(rowEditableId){
	if(prevEditId != null && prevEditId != ''){
		$("#"+prevEditId).addClass("editColumn");
	}
	$("#"+rowEditableId).removeClass("editColumn");
	prevEditId = rowEditableId;
	//alert($("#"+rowEditableId).val());
}

function callRetry(index,rawDataId){
	debugger;
	//document.getElementById('retry_'+index).disabled = true;
	$('.enableOnInput').prop('disabled', true);
	var table = $('#crmRawDataFileUploadTable').DataTable();
	var data = table.row( index ).data();
	var deportFieldArr = data.deportfields.split(",");
	var editFieldJsonObject={json:{}};
	var editFieldJsonArray = [];
	var editFieldsValues='';
	$.each(deportFieldArr,function(i){
		if(deportFieldArr[i] != "integration_name"){
			editFieldJsonObject.json[deportFieldArr[i]] = $("#"+deportFieldArr[i]+"_"+index).val();
		}
	});
	if(Object.keys(editFieldJsonObject.json).length > 0) {
		debugger;
		editFieldJsonArray.push(editFieldJsonObject);
	}
	if(editFieldJsonArray.length > 0){
		//alert(JSON.stringify(editFieldJsonArray));
		editFieldsValues=JSON.stringify(editFieldJsonArray);
	}
	var tableRow = {rawDataId:rawDataId,userName:loginUserName,editFields:editFieldsValues};
	console.log(JSON.stringify(tableRow));
	$("#dwnldLeadsLoader").show();
	$.ajax({
		url: "updateEditRecords.do",
		type: "POST",
		data: encodeURIComponent(JSON.stringify(tableRow)),
		success : function(result) {
			$("#dwnldLeadsLoader").hide();
			if(result == "success") {
				$("#downloadSelectedMsg").html("* record updated successfully").show();
				setTimeout(function(){
					$('#downloadSelectedMsg').html("");
					$("#dwnldLeadsModal").modal("hide");
					$('#crmRawDataFileUploadTable').DataTable().destroy();
					$('#crmRawDataFileUploadTable thead').empty();
					$('#crmRawDataFileUploadTable tbody').empty();
					$('.enableOnInput').prop('disabled', false);
					fetchFileUploadDataFromClientCRM();
				},2000);
			}
			else{
				$("#downloadErrorMsg").html("* error occurred while updating record in table, kindly check with development team.").show();
				setTimeout(function(){
					$('#downloadErrorMsg').html("");
					$('.enableOnInput').prop('disabled', false);
					},5000);
			}
		}
	});
}

function searchFileUploadData(){
	searchFlag = false;
	$("#integrationnamedrop").empty().trigger('change');
	var integrationName = queryForIntegration.integrationName;
	var newOption = new Option(integrationName, integrationName, false, false);
	$('#integrationnamedrop').append(newOption).trigger('change');
	
	if(integrationName != null && integrationName != '' && integrationName !='undefined'){
		searchFileUploadDataFromClientCRM(integrationName);
	}
	searchFlag = true;
}

function searchData(){
	if(searchFlag){
		fetchFileUploadDataFromClientCRM();
	}
}

function searchFileUploadDataFromClientCRM(integrationName){
	$("#fileUploadLoader").show();
	//var integrationName = $("#fileUpldIntgName").val();
	$('#fileUploadTable').dataTable().fnClearTable();
	var fetchSize = $("#setLimit").val();
	var selectedIntegrationType = $("#selectedIntegrationType").val();
	debugger;
	var integrationId = "";
	var arr = {userName:loginUserName,integrationId:integrationId,fetchSize:fetchSize,sequence:sequenceForQuery,integrationName:integrationName,integrationType:selectedIntegrationType};
	console.log(JSON.stringify(arr));
	
	$.ajax({
		url:'fetchFileUploadDataFromClientCRM.do',
		//data: encodeURIComponent(JSON.stringify(arr)),
		data: arr,
		success:function(jsonData) {
			debugger;
			if(jsonData != null && jsonData != "" && jsonData != "[]") {
				jsonData = JSON.parse(jsonData);
				$("#totalRecords").html(jsonData.length);
				recArr = jsonData;
				showFileUploadDataFromClientCRM(jsonData);
				$("#fileUploadLoader").hide();
				document.getElementById('loadNext').disabled = false;
			}else{
				$("#fileUploadLoader").hide();
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

function goBackToPrevious() {
	  window.history.back();
}

function loadIntegrationType() {
	var finalURL = "loadIntegrationType.do";
	$.ajax({
		url : finalURL,
		async:false,
		success : function(result) {
			var resultValue = result.toString();
			$("#selectedIntegrationType").html(result);
		}
	});
}
	
</script>
<style type="text/css">
.dropzone-desc.width50{width:50%}	
</style>
</head>

<body>
<!-- Header Starts -->
<header>
 <input type=hidden name="hiddenCrmId" id="hiddenCrmId">
 <input type=hidden name="hiddenIntegrationName" id="hiddenIntegrationName">
	<div class="container-fluid">
		<nav class="navbar navbar-expand-lg navbar-default fixed-top py-0 p-2">
		<!-- Logo and Mobile Toggle Icon Start -->
			<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 navbar-header px-2">
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
			<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 text-center pgTitle">CRM-File Upload <span id="titleHeading"></span></div>
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
						 <div class="col-md-12">
						 	<span id="refreshFilterbtnRow" class="refreshTable"><button id="refreshFilterBtn" type="button" class="btn btn-primary btn-sm" onClick="refreshFileUpload()"><i class="fa fa-refresh" aria-hidden="true"></i> Refresh</button></span>
							<span id="filterbtnRow"><button id="resetFilterBtn" type="button" class="btn greenbtn btn-sm" onClick="resetFilterForFileUpload()"><i class="fa fa-refresh" aria-hidden="true"></i> Reset Filters</button></span>
							<button type="button" class="btn btn-info btn-sm mx-1" id="loadPrev" title="Load Previous Records"><span class="fa fa-angle-double-left fa-lg" aria-hidden="true"></span> Load Prev</button>
							<button type="button" class="btn btn-info btn-sm ml-1" id="loadNext" title="Load Next Records">Load Next <span class="fa fa-angle-double-right fa-lg" aria-hidden="true"></span></button>
							<a href="#"  id="pageValue" class="badge" onclick="openLoadCampaignLimitModal()">P1</a>
							<span class="totalBadge">Total <span class="badge" id="totalRecords">0</span></span>
						</div>
					</div>
					<!-- Filter Buttons Row Ends -->
					<!-- Loader and Message Row Starts -->
					<div class="row mb-2" id="fileUploadLoader">
						<div class="col-md-12 d-flex align-items-center justify-content-center text-success my-2">
							<i class="fa fa-spinner fa-pulse fa-2x fa-fw mr-1"></i> Please Wait...
						</div>
					</div>
					<div class="row">
						<div id="uploadFileErrorMsg" class="col-md-12 msgError text-center"></div>
					</div>
					<div class="row">
					<div id="uploadFileSuccessMsg" class="col-md-12 success_msg text-center"></div>
					</div>

			<div class="row">
				<div class="col-md-6">
					<div class="form-group row head-filter" style="padding-left: 50px">
						<label for="fileUpldIntgName" style="font-weight: 700">Datapass Name : </label>
						<div class="col-md-6">
							<div id="integrationNameDiv" class="col-md-12">
							<div class="input-group input-group-sm">
                               <select id="integrationnamedrop" class="form-control" onchange="searchData()" style="width:600px;" >
								</select>
								<span class="fa fa-search dpn-search-icon1" aria-hidden="true" onclick="searchFileUploadData()"></span>
							
								</div>
							</div> 
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group row head-filter">
						<label for="selectedIntegrationType" style="font-weight: 700">Datapass Type : </label>
						<div class="col-md-6">
							
							<div class="input-group input-group-sm">
								<select id="selectedIntegrationType" name="selectedIntegrationType" class="form-control form-control-sm" onchange="fetchFileUploadDataFromClientCRM()">
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>
			</div>
			<!-- fileUploadTable Row Starts -->
					<div class="row">
						<div class="table-responsive col-md-12 p-4">
							<table id="fileUploadTable" data-page-length="100" class="display nowrap darkTable table table-striped table-bordered table-sm box-shadow">
								<thead>
									<tr>
										<th>S No.</th>
										<th>Action</th>
										<th>Datapass Name</th>
										<th>Datapass Type</th>
										<th>Total Records</th>
										<th>Record Processed</th>
										<th>Total Error</th>
										<th>Upload</th>
										<!-- <th>Created By</th> -->
									</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
					</div>
					<!-- fileUploadTable Row Ends -->
				</div>
			</fieldset>
		</div>
	</div>
	<!-- Datatable Block Ends-->

<!-- Modal and Popup Start-->
<!-- Download Modal Starts -->
<div class="modal fade" id="dwnldLeadsModal" tabindex="-1" role="dialog" aria-labelledby="dwnldLeadsModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 1800px;">
		<div class="modal-content">
			<div class="modal-header head-success">
				<h5 class="modal-title" id="dwnldLeadsModalLabel">Download Records</h5>
				<button type="button" class="close" id="closeDownloadModelCrossButton" data-dismiss="modal" aria-label="Close" onclick="closeDownloadModal()">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body formField" style="width:1800px;">
				<div class="row mb-4" id="dwnldLeadsLoader">
					<div class="col-md-12 d-flex align-items-center justify-content-center text-success">
						<i class="fa fa-spinner fa-pulse fa-2x fa-fw mr-1"></i> Please Wait...
					</div>
				</div>
				<div class="row">
					<div id="downloadSelectedMsg" class="col-md-12 success_msg text-center"></div>
				</div>
				<div class="row">
					<div id="downloadErrorMsg" class="col-md-12 msgError text-center"></div>
				</div>
				<table id="crmRawDataFileUploadTable" class="display nowrap darkTable table table-striped table-bordered table-sm box-shadow" cellspacing="0" width="100%"></table>
				
 			</div>
			<div class="modal-footer">
				<button type="button" class="btn bluebtn" onclick="downloadSelected()" id ="downloadSelected"><div class="faa-parent animated-hover"><i class="fa fa-angle-double-down fa-lg faa-falling" aria-hidden="true"></i> Download Selected</div></button>
				<button type="button" class="btn btn-success" onclick="downloadAll()" id ="downloadAll"><div class="faa-parent animated-hover"><i class="fa fa-angle-double-down fa-lg faa-falling" aria-hidden="true"></i> Download All</div></button>
				<button type="button" class="btn btn-default foundry-blue-btn" id="closeDownloadModelButton" onclick="closeDownloadModal()" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>
<!-- Download Modal Ends -->
<!-- Review Test Model Starts -->
<div class="modal fade bs-example-modal-lg" id="reviewTestResponse" tabindex="-1" role="dialog" aria-labelledby="reviewTestResponseModelLabel" data-keyboard="false" data-backdrop="static">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<form id="reviewTestResponseForm" class="form-horizontal">
				<div class="modal-header test-head">
					<h4 class="modal-title" id="reviewTestResponseLabel">Review Response</h4>
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

<!-- File Upload Model Starts -->
<div class="modal bs-example-modal-lg" id="integrationFileUpload" tabindex="-1" role="dialog" aria-labelledby="integrationFileUploadModelLabel" data-keyboard="false" data-backdrop="static">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<form action="" method="POST" id="integrationFileUploadForm" class="form-horizontal" enctype="multipart/form-data">
				<div class="modal-header test-head">
					<h4 class="modal-title" id="integrationFileUploadLabel">File Upload</h4>
					<button type="button" onClick="closeFileUploadModel()" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				</div>
				<div class="row mb-2" id="integrationFileUploadLoader">
					<div class="col-md-12 d-flex align-items-center justify-content-center text-success my-2">
						<i class="fa fa-spinner fa-pulse fa-2x fa-fw mr-1"></i> Please Wait...
					</div>
				</div>
					<div class="row body-bg-color m-0">
						<div id="integrationFileUploadErrorMsg" class="col-md-12 msgError text-center"></div>
					</div>
					<div class="row body-bg-color m-0">
					<div id="integrationFileUploadSuccessMsg" class="col-md-12 success_msg text-center"></div>
					</div>
				<div class="modal-body body-bg-color">
			 		<div class="row">
			 		<div class="col-md-12 text-center">
                      <div class="pr-3">
                        <div class=" drag-bg mb-2 shadow">
                          <div class="drag-bg-border">
                            <div class="drag-area">
                              <div class="form-input">
                                <!-- <input name="file" id="entry_value" class="csv_file" ref="fileInput" accept=".xlsx, .xls, .csv" type="file" onchange="getFileName(this)"> -->
                                <input type="file" id="file_upload" name="file_upload" title="" class="dropzone" accept=".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                                <div class="drp_text"> 
                                  <img src="${pageContext.request.contextPath}/resources/images/upload.svg" alt="upload" class="uploadimg"> 
                                  <p id="filetxt">
                                  <span class="text_browse fw-bold">Drag and drop .xsl .xlsx .csv or </span><button class="upload-img">choose file</button><br><br> 
                                  <span id ="uploadedFileName" style="color:#dc3545"></span><span style="display:block"><i id="filelimit"></i></span>  </p>
                                  <!-- <span class="browse_text">(500 records, 2 MB file Maximum )</span>  -->
                                  </p>
                                  <p id="fileName" class="upload-img2"> </p>
                                </div> 
                              </div>
                            </div>
                          </div>
                        </div>
                        <button type="button" id="fileUploadBtn" class="btn btn-primary btn_reset fw-bold btn-md" onClick="uploadFileData()">Upload</button>
                        <button type="button" class="btn btn-danger fw-bold btn-md" onClick="closeFileUploadModel()">Close</button>
                      </div>
                    </div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
<!-- File Upload Model Ends -->

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



<!-- Modal and Popup Ends-->
<jsp:include page="footer.jsp"></jsp:include>
<script type="text/javascript">
 document.getElementById('file_upload').onchange = function (el) {
	$("#uploadedFileName").html( el.target.files.item(0).name);
	$("#file_upload").attr( "title", el.target.files.item(0).name);
	
}
</script>
</body>
</html>