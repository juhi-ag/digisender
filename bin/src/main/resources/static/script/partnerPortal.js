$(document).ready(function(){
	var tablePartner;
	var tablePartnerLead;
	var opportunityid;
	var orderID;
	var campaign_name;
	var LeadId;
	var vendorId;
	
	$("#partner-tab").click(function(){
		$('#partnersViewTable').DataTable().clear().destroy();
		tablePartner=$('#partnersViewTable').DataTable({
	        "processing" : true,
	        "retrieve": true,
	        "ajax" : {
	            "url" : "getAllPartnerOrders?campaignManager="+$("#campaignManager").val(),
	            "type" : "POST",
	            dataSrc : ''
	        },
	        "columns" : [  
						{ "data": "Actions", title: "Actions" },
	                    { "data": "campaign_name",title: "Campaign" },
	       	            { "data": "companyname",title: "Account" },
	    	            { "data": "campaign_value",title: "Amount" },
	    	            { "data": "services",title: "Product" },
	    	            { "data": "UploadDiscard",title: "Upload Discard" },
	    	            { "data": "vendor_name",title: "Delivery Method","defaultContent":"" },
	    	            { "data": "order_stage",title: "Status","defaultContent":""  },
	    	            { "data": "Worklog",title: "Worklog" },
	    	            {"data":"vendor_id",visible:false}]
	    });
	}); 
	
	$( "#campaignManager" ).change(function() {
		$('#partnersViewTable').DataTable().clear().destroy();
		tablePartner=$('#partnersViewTable').DataTable({
	        "processing" : true,
	        "retrieve": true,
	        "ajax" : {
	            "url" : "getAllPartnerOrders?campaignManager="+$("#campaignManager").val(),
	            "type" : "POST",
	            dataSrc : ''
	        },
	        "columns" : [  
						{ "data": "Actions", title: "Actions" },
	                    { "data": "campaign_name",title: "Campaign" },
	       	            { "data": "companyname",title: "Account" },
	    	            { "data": "campaign_value",title: "Amount" },
	    	            { "data": "services",title: "Product" },
	    	            { "data": "UploadDiscard",title: "Upload Discard" },
	    	            { "data": "vendor_name",title: "Delivery Method","defaultContent":"" },
	    	            { "data": "order_stage",title: "Status","defaultContent":""  },
	    	            { "data": "Worklog",title: "Worklog" },
	    	            {"data":"vendor_id",visible:false}
	    	            ]
	    });
	});
	
	$('#partnersViewTable tbody').on( 'click', '.btn-outline-success', function () {
		orderID = tablePartner.row( $(this).parents('tr') ).data()['order_id'];
		campaign_name = tablePartner.row( $(this).parents('tr') ).data()['campaign_name'];
		vendorId=tablePartner.row( $(this).parents('tr') ).data()['vendor_id'];
		loadpartnerLeadtable('New',orderID,vendorId);
    });
	
	$('#partnersViewTable tbody').on( 'click', '.btn-outline-secondary', function () {
		$('#uploadpartnerDiscardFile').val('');
		opportunityid = tablePartner.row( $(this).parents('tr') ).data()['sf_opportunityid'];
		orderID = tablePartner.row( $(this).parents('tr') ).data()['order_id'];
    });
	
	$('#partnersViewTable tbody').on( 'click', '.btn-outline-warning', function () {
        openCommentBlock(tablePartner.row( $(this).parents('tr') ).data()['order_id']);
    });
		
	$('#dwnldPartLeadsTable tbody').on( 'click', '.btn-danger, .btn-success', function () {
		LeadId=this.id;
    });
	
	$('#addCommentpartner').click(function(){
		addComment();
	});
	
	$('#patnerDiscardUploadFile').click(function(){
		$("#partFileDiscardFileLoader").show();
		var listFile=$("#uploadpartnerDiscardFile")[0].files[0];
		if(listFile != null && listFile != "" && listFile != 'undefined') {
			var fileName = $('#uploadpartnerDiscardFile').prop("files")[0]['name'];
			if(fileName.lastIndexOf(".csv") != -1) {
			var formData=new FormData();
			formData.append("file",$("#uploadpartnerDiscardFile")[0].files[0]);
			var finalURL ="uploadPartnerDiscardLeadFile?opportunityId="+opportunityid+"&username="+userName+"&order_id="+orderID;
			$.ajax({
				url :	finalURL,
				data :	formData,
				contentType	: false,
				cache :	false,
				processData	: false,
				type : "POST",
				success : function(data, textStatus, xhr) {
					$("#partFileDiscardFileLoader").hide();
					$("#partFileDiscardSuccessMsg").html("* Discard File uploaded successfully.").show();
					setTimeout(function() {
				  	 	$("#partFileDiscardSuccessMsg").hide();
				  	 	$("#partDiscardList").modal("hide");
					}, 3000); 
				},
				error : function(xhr, textStatus, errorThrow) {
					$("#partFileDiscardFileLoader").hide();
					$("#partFileDiscardErrorMsg").html("Error in File upload. Plese try again.").show();
					setTimeout(function() {$("#partFileDiscardErrorMsg").hide()}, 3000);
				}
			});
		  }	else{
			  $("#partFileDiscardFileLoader").hide();
			  $("#partFileDiscardErrorMsg").html("Please upload CSV File").show();
			  setTimeout(function() {$("#partFileDiscardErrorMsg").hide()}, 3000);
		  }
		}		
	});
	
	$('#dwnldpartnerLeadsModal').on('hidden.bs.modal', function (e) {
		$('#dwnldPartLeadsTable').DataTable().clear().destroy();
		$('#statusNewRadio').prop("checked", true);
	});
	
	$('body').on('change', '#checkViewAll', function() {
		var rows, checked;
		rows = $('#dwnldPartLeadsTable').find('tbody tr');
		checked = $(this).prop('checked');
		$.each(rows, function() {
		   var checkbox = $($(this).find('td').eq(0)).find('input').prop('checked', checked);
		});
	});	
   
	$('#partnerDownloadSelected').click(function(){
		
		var checkedVals = $('.checkClass:checkbox:checked').map(function() {
		    return this.value;
		}).get();
		if(checkedVals.length<1){
			$("#errorMsg").removeClass("text-success").addClass("text-danger").html("* No record selected.").show();
			setTimeout(function(){$("#errorMsg").html('');},3000);
			  return;
		}
		$.ajax({
			url : 'updateDownloadedLeads',
			data :	JSON.stringify({"Leads":""+checkedVals.join(",")+""}),
			contentType	: false,
			cache :	false,
			processData	: false,
			type : "POST",
			success : function(data, textStatus, xhr) {
			var radioval=$('input[type=radio][name=deliveryStatusRadio]:checked').attr('id');
			var type=null;
				if(radioval!== null){
					if(radioval=='statusNewRadio'){
						type='NEW';
					}else if(radioval=='statusRejectedRadio'){
						type='REJECTED';
					}
				}
				
				
				document.location.href ='downloadSelectedLeads?order_id='+orderID+'&Leads='+checkedVals+'&campaign_name='+campaign_name+'&type='+type+'&vendorId='+vendorId;
			},
			error : function(xhr, textStatus, errorThrow) {
			}
		});
	});
	
	$('#statusNewRadio').click(function(){
		loadpartnerLeadtable('New',orderID,vendorId);
	});
	
	$('#statusDownloadedRadio').click(function(){
		loadpartnerLeadtable('Downloaded',orderID,vendorId);
	});
	
	$('#statusRejectedRadio').click(function(){
		loadpartnerLeadtable('Rejected',orderID,vendorId);
	});
	
	$('#statusAllRadio').click(function(){
		$('#dwnldPartLeadsTable').DataTable().clear().destroy();
		document.location.href ='downloadSelectedLeads?order_id='+orderID+'&campaign_name='+campaign_name+'&vendorId='+vendorId;
	});
	
	$('#discardLeadsRecord').click(function(){
		var DiscardLeadsReason=$("#discardLeadsReason").val();
		if(DiscardLeadsReason==null || (DiscardLeadsReason=="") || DiscardLeadsReason.trim() == ""){
			$("#discardLeadsReasonMsg").html("* Please enter reason to discard.");
			setTimeout(function(){$("#discardLeadsReasonMsg").html('');},5000);
			return false;		 
		}
		
		$.ajax({
			url : 'actionOnSingleLead',
			data :	JSON.stringify({"reason":""+DiscardLeadsReason+"","id":""+LeadId+"","action":""+$('#discardLeadsRecord').val()+"","user":""+userName}),
			contentType	: false,
			cache :	false,
			processData	: false,
			type : "POST",
			success : function(data, textStatus, xhr) {
				$('#discardLeadsModal').modal('hide');
				var radioval=$('input[type=radio][name=deliveryStatusRadio]:checked').attr('id');
				if(radioval!== null){
					if(radioval=='statusNewRadio'){
						loadpartnerLeadtable('New',orderID,vendorId);						
					}else if(radioval=='statusDownloadedRadio'){
						loadpartnerLeadtable('Downloaded',orderID,vendorId);
					}else{
						loadpartnerLeadtable('Rejected',orderID,vendorId);
					}
				}
			},
			error : function(xhr, textStatus, errorThrow) {
				$("#discardLeadsReasonMsg").html("* Please try again.");
				setTimeout(function(){$("#discardLeadsReasonMsg").html('');},5000);
			}
		});		
	});
	
});

function loadpartnerLeadtable(type,order_id,vendorId){
	$('#dwnldPartLeadsTable').DataTable().clear().destroy();
	$('#checkViewAll').prop("checked", false);
	tablePartnerLead=$('#dwnldPartLeadsTable').DataTable({
        "processing" : true,
        "retrieve": true,
        "pageLength": 50,
        "ajax" : {
            "url" : "getPartnerOrdersLeads?type="+type+"&order_id="+order_id+"&vendorId="+vendorId,
            "type" : "POST",
            dataSrc : ''
        },
        "columns" : [
					{ "data": "All", targets: 0, defaultContent: '',orderable: false },
					{ "data": "corp_email", title: "Corporate Email","defaultContent":"" },
                    { "data": "companyname",title: "Company Name","defaultContent":"" },
       	            { "data": "firstname",title: "First Name","defaultContent":"" },
    	            { "data": "lastname",title: "Last Name","defaultContent":"" },
    	            { "data": "jobtitle",title: "Job Title","defaultContent":"" },
    	            { "data": "employeetotal",title: "Employee Total","defaultContent":"" },
    	            { "data": "hq_country",title: "Country","defaultContent":"" },
    	            { "data": "reason",title: "Reason","defaultContent":"" },
    	            { "data": "action",title: "Action","defaultContent":"" }]
    });	
	
	$("#dwnldpartLeadsLoader").hide();
}

$(document).on("click", ".open-modal", function () {
    var buttonText = $(this).get(0).innerText;
    
    $("#discardCompanyForm .modal-footer .action").text(buttonText);
    $("#discardLeadsReason").val('');
    
    if(buttonText.includes('Accept')){
    $("#discardLeadsRecord").removeClass("btn-danger").addClass("btn-success");
    $("#discardCompanyForm .modal-header").removeClass("head-danger").addClass("head-success");
    $("#discardCompanyForm .modal-body .col-md-4").text('Reason to Accept Lead')
    $("#discardCompanyForm .modal-header #discardLeadsModalLabel").text('Accept Lead Reason');
    //status to be persist in partner lead table
    $("#discardCompanyForm .modal-footer .action").val('ACCEPTED');
    }else{
    $("#discardLeadsRecord").removeClass("btn-success").addClass("btn-danger");
    $("#discardCompanyForm .modal-header").removeClass("head-success").addClass("head-danger");
    $("#discardCompanyForm .modal-body .col-md-4").text('Reason to Reject Lead')
    $("#discardCompanyForm .modal-header #discardLeadsModalLabel").text('Reject Lead Reason');
    //status to be persist in partner lead table
    $("#discardCompanyForm .modal-footer .action").val('REJECTED');
    }
});