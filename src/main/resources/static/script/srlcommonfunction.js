function validateFieldsOnKeyUp() {
	
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
				$("#piplPemailHandleId").addClass("ehandle").attr("disabled", true);
		   	  	$('#privateEmailMsg').show().html('* Please enter a valid private email address.');
		   		return false;
		   	}
			else { 
				$("#piplPemailHandleId").removeClass("ehandle").attr("disabled", false);
				$('#privateEmailMsg').hide();
			}
		}
		else {
			$("#piplPemailHandleId").addClass("ehandle").attr("disabled", true);
			$('#privateEmailMsg').hide();
		}
	});
	$("#private_email2").keyup(function(){
		var privateEmail2 = document.getElementById("private_email2").value;
		if(privateEmail2 != null && privateEmail2 != "") {
			if (!IsValidEmail(privateEmail2)) {
				$("#pemailpiplHandleId1").addClass("ehandle").attr("disabled", true);
		   	  	$('#privateEmail2Msg').show().html('* Please enter a valid private email2 address.');
		   		return false;
		   	}
			else {
				$("#pemailpiplHandleId1").removeClass("ehandle").attr("disabled", false);
				$('#privateEmail2Msg').hide();
			}
		}else{
			$('#privateEmail2Msg').hide();
		}
	});
	$("#private_email3").keyup(function(){
		var privateEmail3 = document.getElementById("private_email3").value;
		if(privateEmail3 != null && privateEmail3 != "") {
			if (!IsValidEmail(privateEmail3)) {
				$("#pemailpiplHandleId2").addClass("ehandle").attr("disabled", true);
		   	  	$('#privateEmail3Msg').show().css('color','red').html('* Please enter a valid private email3 address.');
		   		return false;
		   	}
			else {
				$("#pemailpiplHandleId2").removeClass("ehandle").attr("disabled", false);
				$('#privateEmail3Msg').hide();
			}
		}else{
			$('#privateEmail3Msg').hide();
		}
	});
	$("#private_email4").keyup(function(){
		var privateEmail3 = document.getElementById("private_email4").value;
		if(privateEmail3 != null && privateEmail3 != "") {
			if (!IsValidEmail(privateEmail3)) {
				$("#pemailpiplHandleId3").addClass("ehandle").attr("disabled", true);
		   	  	$('#privateEmail4Msg').show().css('color','red').html('* Please enter a valid private email4 address.');
		   		return false;
		   	}
			else {
				$("#pemailpiplHandleId3").removeClass("ehandle").attr("disabled", false);
				$('#privateEmail4Msg').hide();
			}
		}else{
			$('#privateEmail4Msg').hide();
		}
	});
	$("#corporate_email").keyup(function(){
		var corporateEmail = document.getElementById("corporate_email").value;
		if(corporateEmail != null && corporateEmail != "") {
			if (!IsValidEmail(corporateEmail)) {
				//$("#piplCemailHandleId").addClass("ehandle").attr("disabled", true);
				$('#corporate_email-error').html('');
		   	  	$('#corporateEmailMsg').show().html('* Please enter a valid corporate email address.');
		   		return false;
		   	}
			else {
				//$("#piplCemailHandleId").removeClass("ehandle").attr("disabled", false);
				$('#corporate_email').removeClass('error');
				$('#corporate_email').addClass('valid');
				$('#corporateEmailMsg').hide();
			}
		}
		else {
			//$("#piplCemailHandleId").addClass("ehandle").attr("disabled", true);
		}
	});
	
	$("#linkedinhandle").keyup(function(e) {
		if($("#linkedinhandle").val() != null && $("#linkedinhandle").val() != "") {
			if(!isValidUrl($("#linkedinhandle").val())) {
				e.preventDefault();
				$("#piplLinkedInHandleId").addClass("ehandle").attr("disabled", true);
				$("#linkedinHandleId").addClass("ehandle").attr("disabled", true);
				$("#linkedinHandleMsg").html("* Please enter a valid Linkedin Handle.").show();
				return false;
			}
			else {
				$("#piplLinkedInHandleId").removeClass("ehandle").attr("disabled", false);
				$('#linkedinHandleMsg').hide();
				$("#linkedinHandleId").removeClass("ehandle").attr("disabled", false);
				if(($("#linkedinhandle").val().indexOf('http://') == 0) || $("#linkedinhandle").val().indexOf('https://') == 0) {
					linkedinhandle=$("#linkedinhandle").val();
				}
				else {
					linkedinhandle = "http://"+$("#linkedinhandle").val();
				}
				$("#linkedinHandleId").attr("href",linkedinhandle);
			}
		}
		else {
			$("#linkedinHandleId").addClass("ehandle").attr("disabled", true);
			$("#linkedinHandleMsg").hide();
		}
	});
	$("#xinghandle").keyup(function(e) {
		if($("#xinghandle").val() != null && $("#xinghandle").val() != "") {
			if(!isValidUrl($("#xinghandle").val())) {
				e.preventDefault();
				$("#xingHandleId").addClass("ehandle").attr("disabled", true);
				$("#xingHandleMsg").html("* Please enter a valid Xing Handle.").show();
				return false;
			}
			else {
				$('#xingHandleMsg').hide();
				$("#xingHandleId").removeClass("ehandle").attr("disabled", false);
				if(($("#xinghandle").val().indexOf('http://') == 0) || $("#xinghandle").val().indexOf('https://') == 0) {
					xinghandle=$("#xinghandle").val();
				}
				else {
					xinghandle = "http://"+$("#xinghandle").val();
				}
				$("#xingHandleId").attr("href",xinghandle);
			}
		}
		else {
			$("#xingHandleId").addClass("ehandle").attr("disabled", true);
			$("#xingHandleMsg").hide();
		}
	});
	$("#facebookhandle").keyup(function(e) {
		if($("#facebookhandle").val() != null && $("#facebookhandle").val() != "") {
			if(!isValidUrl($("#facebookhandle").val())) {
				e.preventDefault();
				$("#facebookHandleId").addClass("ehandle").attr("disabled", true);
				$("#facebookHandleMsg").html("* Please enter a valid Facebook Handle.").show();
				return false;
			}
			else {
				$('#facebookHandleMsg').hide();
				$("#facebookHandleId").removeClass("ehandle").attr("disabled", false);
				if(($("#facebookhandle").val().indexOf('http://') == 0) || $("#facebookhandle").val().indexOf('https://') == 0) {
					facebookhandle=$("#facebookhandle").val();
				}
				else {
					facebookhandle = "http://"+$("#facebookhandle").val();
				}
				$("#facebookHandleId").attr("href",facebookhandle);
			}
		}
		else {
			$("#facebookHandleId").addClass("ehandle").attr("disabled", true);
			$("#facebookHandleMsg").hide();
		}
	});
	$("#twitterhandle").keyup(function(e) {
		if($("#twitterhandle").val() != null && $("#twitterhandle").val() != "") {
			if(!isValidUrl($("#twitterhandle").val())) {
				e.preventDefault();
				//$("#facebookHandleId").addClass("ehandle").attr("disabled", true);
				$("#twitterhandleMsg").html("* Please enter a valid twitter Handle.").show();
				return false;
			}
			else {
				$('#twitterhandleMsg').hide();
				//$("#facebookHandleId").removeClass("ehandle").attr("disabled", false);
				if(($("#twitterhandle").val().indexOf('http://') == 0) || $("#twitterhandle").val().indexOf('https://') == 0) {
					facebookhandle=$("#twitterhandle").val();
				}
				else {
					facebookhandle = "http://"+$("#twitterhandle").val();
				}
				//$("#facebookHandleId").attr("href",facebookhandle);
			}
		}
		else {
			//$("#facebookHandleId").addClass("ehandle").attr("disabled", true);
			$('#twitterhandleMsg').hide();
		}
	});
	$("#twitterurl").keyup(function(e) {
		if($("#twitterurl").val() != null && $("#twitterurl").val() != "") {
			if(!isValidUrl($("#twitterurl").val())) {
				e.preventDefault();
				$("#twitterUrlId").addClass("ehandle").attr("disabled", true);
				$("#twitterUrlMsg").html("* Please enter a valid Twitter Url.").show();
				return false;
			}
			else {
				$('#twitterUrlMsg').hide();
				$("#twitterUrlId").removeClass("ehandle").attr("disabled", false);
				if(($("#twitterurl").val().indexOf('http://') == 0) || $("#twitterurl").val().indexOf('https://') == 0) {
					twitterurl=$("#twitterurl").val();
				}
				else {
					twitterurl = "http://"+$("#twitterurl").val();
				}
				$("#twitterUrlId").attr("href",twitterurl);
			}
		}
		else {
			$("#twitterUrlId").addClass("ehandle").attr("disabled", true);
			$("#twitterUrlMsg").hide();
		}
	});
	$("#miscurl").keyup(function(e) {
		if($("#miscurl").val() != null && $("#miscurl").val() != "") {
			if(!isValidUrl($("#miscurl").val())) {
				e.preventDefault();
				$("#miscUrlId").addClass("ehandle").attr("disabled", true);
				$("#miscUrlMsg").html("* Please enter a valid Misc Link.").show();
				return false;
			}
			else {
				$('#miscUrlMsg').hide();
				$("#miscUrlId").removeClass("ehandle").attr("disabled", false);
				if(($("#miscurl").val().indexOf('http://') == 0) || $("#miscurl").val().indexOf('https://') == 0) {
					miscurl=$("#miscurl").val();
				}
				else {
					miscurl = "http://"+$("#miscurl").val();
				}
				$("#miscUrlId").attr("href",miscurl);
			}
		}
		else {
			$("#miscUrlId").addClass("ehandle").attr("disabled", true);
			$('#miscUrlMsg').hide();
		}
	});
	
	$("#complinkedinhandle").keyup(function(e) {
		if($("#complinkedinhandle").val() != null && $("#complinkedinhandle").val() != "") {
			if(!isValidUrl($("#complinkedinhandle").val())) {
				e.preventDefault();
				$("#compLinkedinHandleId").addClass("ehandle").attr("disabled", true);
				$("#compLinkedinHandleMsg").html("* Please enter a valid Linkedin URL.").show();
				return false;
			}
			else {
				$('#compLinkedinHandleMsg').hide();
				$("#compLinkedinHandleId").removeClass("ehandle").attr("disabled", false);
				if(($("#complinkedinhandle").val().indexOf('http://') == 0) || $("#complinkedinhandle").val().indexOf('https://') == 0) {
					complinkedinhandle=$("#complinkedinhandle").val();
				}
				else {
					complinkedinhandle = "http://"+$("#complinkedinhandle").val();
				}
				$("#compLinkedinHandleId").attr("href",complinkedinhandle);
			}
		}
		else {
			$("#compLinkedinHandleId").addClass("ehandle").attr("disabled", true);
			$('#compLinkedinHandleMsg').hide();
		}
	});
	
	/*$("#mobilephone").keyup(function(){
		var mobilePhoneVal = document.getElementById("mobilephone").value;
		if(mobilePhoneVal != null && mobilePhoneVal != "") {
			$("#mobilePhoneMsg").hide();
			//$("#mobilephone").css('border-color', '#ccc');
		}
		else {
			$("#mobilePhoneMsg").html("* Please enter mobile phone.").show();
			//$("#mobilephone").css('border-color', 'red');
			setTimeout(function(){$('#mobilePhoneMsg').hide();},4000);
			//$("#mobilephone").css('border-color', '');
		}
	});
	$("#directphone").keyup(function(){
		var directPhoneVal = document.getElementById("directphone").value;
		if(directPhoneVal != null && directPhoneVal != "") {
			$("#directPhoneMsg").hide();
			//$("#directphone").css('border-color', '#ccc');
		}
		else {
			$("#directPhoneMsg").html("* Please enter direct phone.").show();
			//$("#directphone").css('border-color', 'red');
			setTimeout(function(){$('#directPhoneMsg').hide();},4000);
			//$("#directphone").css('border-color', '');
		}
	});
	$("#hq_phone").keyup(function(){
		var hqPhoneVal = document.getElementById("hq_phone").value;
		if(hqPhoneVal != null && hqPhoneVal != "") {
			$("#hqPhoneMsg").hide();
			//$("#hq_phone").css('border-color', '#ccc');
		}
		else {
			$("#hqPhoneMsg").html("* Please enter hq phone.").show();
			//$("#hq_phone").css('border-color', 'red');
			setTimeout(function(){$('#hqPhoneMsg').hide();},4000);
			//$("#hq_phone").css('border-color', '');
		}
	});*/
	
	$("#country").keyup(function(){
		var countryVal = document.getElementById("country").value;
		if(countryVal != null && countryVal != "") {
			if(countryVal.length>2){
				$("#countryMsg").css('color', 'red').html("* Please enter two characters for country code").show();
			}else{
				setTimeout(function(){$("#countryMsg").hide();},3000);
			}
		}
	});
	
	$("#hq_country").keyup(function(){
		var hqCountryVal = document.getElementById("hq_country").value;
		if(hqCountryVal != null && hqCountryVal != "") {
			if(hqCountryVal.length>2){
				$("#hqCountryMsg").css('color', 'red').html("* Please enter two characters for country code").show();
			}else{
				setTimeout(function(){$("#hqCountryMsg").hide();},3000);
			}
		}
	});
	
	/*$("#website").keyup(function(){
		var websiteVal = document.getElementById("website").value;
		if(websiteVal != null && websiteVal != "" && websiteVal!=undefined) {
			if(!isValidWebsiteUrl(website)) {
				$("#websiteMsg").html("* Please enter a valid website.").show();
				return false;
			}
			else {
				$("#websiteMsg").hide();
			} 
		}
	});*/
	
	$("#website").change(function(){ 
		var websiteVal = document.getElementById("website").value;
		if(websiteVal != null && websiteVal != "" && websiteVal!=undefined) {
			if(!isValidWebsiteUrl(websiteVal)) {
				document.getElementById('websiteButton').disabled = true;
				$("#websiteMsg").html("* Please enter a valid website.").show();
				return false;
			}
			else {
				document.getElementById('websiteButton').disabled = false;
				$("#websiteMsg").hide();
			} 
		}else{
			document.getElementById('websiteButton').disabled = true;
		}
    });
	
}

function validateFields() {
	if((($('#private_email').val()!=undefined) && ($('#private_email').val() == null || $('#private_email').val() == "")) && 
			(($('#private_email2').val()!=undefined) && ($('#private_email2').val() == null || $('#private_email2').val() == "")) && 
			(($('#private_email3').val()!=undefined) && ($('#private_email3').val() == null || $('#private_email3').val() == "")) && 
			(($('#corporate_email').val()!=undefined) && ($('#corporate_email').val() == null || $('#corporate_email').val() == ""))) {
		$('#msg').html("* Please enter atleast one of the private email or corporate email.");
   	   	setTimeout(function(){$('#msg').html("");},5000);
   		return false;
	}
	
	var privateEmail = $('#private_email').val();
	if(privateEmail!=undefined && privateEmail != null && privateEmail != "") {
		if (!IsValidEmail(privateEmail)) {
	   	  	$('#privateEmailMsg').show().html('* Please enter a valid private email address.');
	   		return false;
	   	}
		else {
			$('#privateEmailMsg').hide();
		}
	}
	var privateEmail2 = $('#private_email2').val();
	if(privateEmail2!=undefined && privateEmail2 != null && privateEmail2 != "") {
		if (!IsValidEmail(privateEmail2)) {
	   	  	$('#privateEmail2Msg').show().html('* Please enter a valid private email address.');
	   		return false;
	   	}
		else {
			$('#privateEmail2Msg').hide();
		}
	}
	var privateEmail3 = $('#private_email3').val();
	if(privateEmail3!=undefined && privateEmail3 != null && privateEmail3 != "") {
		if (!IsValidEmail(privateEmail3)) {
	   	  	$('#privateEmail3Msg').show().html('* Please enter a valid private email address.');
	   		return false;
	   	}
		else {
			$('#privateEmail3Msg').hide();
		}
	}
	var corporateEmail = $('#corporate_email').val();
	if(corporateEmail !=undefined && corporateEmail != null && corporateEmail != "") {
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
	if(linkedinhandle !=undefined){
		if(!isValidUrl(linkedinhandle)) {
			$("#linkedinHandleMsg").html("* Please enter a valid Linkedin Handle.").show();
			setTimeout(function(){$('#linkedinHandleMsg').html("");},4000);
			return false;
		}
	}
	var xinghandle = $("#xinghandle").val();
	if(xinghandle !=undefined){
		if(!isValidUrl(xinghandle)) {
			$("#xingHandleMsg").html("* Please enter a valid Xing Handle.").show();
			setTimeout(function(){$('#xingHandleMsg').html("");},4000);
			return false;
		}
	}
	var facebookhandle = $("#facebookhandle").val();
	if(facebookhandle !=undefined){
		if(!isValidUrl(facebookhandle)) {
			$("#facebookHandleMsg").html("* Please enter a valid Facebook Handle.").show();
			setTimeout(function(){$('#facebookHandleMsg').html("");},4000);
			return false;
		} 
	}
	var twitterurl = $("#twitterurl").val();
	if(twitterurl !=undefined){
		if(!isValidUrl(twitterurl)) {
			$("#twitterUrlMsg").html("* Please enter a valid Twitter Handle.").show();
			setTimeout(function(){$('#twitterUrlMsg').html("");},4000);
			return false;
		} 
	}
	var miscurl = $("#miscurl").val();
	if(miscurl !=undefined){
		if(!isValidUrl(miscurl)) {
			$("#miscUrlMsg").html("* Please enter a valid Misc. Link").show();
			setTimeout(function(){$('#miscUrlMsg').html("");},4000);
			return false;
		} 
	}
	var website = $("#website").val();
	if(website !=undefined){
		if(!isValidWebsiteUrl(website)) {
			$("#websiteMsg").html("* Please enter a valid website.").show();
			return false;
		}
		else {
			$("#websiteMsg").hide();
		} 
	}
	
	var complinkedinhandle = $("#complinkedinhandle").val();
	if(complinkedinhandle !=undefined){
		if(!isValidUrl(complinkedinhandle)) {
			$("#compLinkedinHandleMsg").html("* Please enter a valid Linkedin URL").show();
			setTimeout(function(){$('#compLinkedinHandleMsg').html("");},4000);
			return false;
		} 
	}
	
	if($('#dunsnumber').val()!=undefined && $('#dunsnumber').val()!='') {
		if(! $.isNumeric($('#dunsnumber').val()))
		{
			$("#dunsNoMsg").html("* Duns number can be numeric only.").show();
			setTimeout(function(){$('#dunsNoMsg').html("");},4000);
			return false;
		}
		if($.isNumeric($('#dunsnumber').val()) && ($('#dunsnumber').val().length > 9 || $('#dunsnumber').val().length < 9)) {
			$("#dunsNoMsg").html("* Duns number needs to be 9 characters only.").show();
			setTimeout(function(){$('#dunsNoMsg').html("");},4000);
			return false;
		}	
	}
	return true;
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

function IsValidEmail(email) {
	var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/;
    return expr.test(email);
}

function isValidWebsiteUrl(url){
	if(url != null && url != "") {
		//if(/^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/.test(url)) {
		if(/^((http(s)?:\/\/)?(www\.)[^\s\.]+\.[^\s]{2,})/.test(url)) {	
			return true;
		} else {
			return false;
		} 
	}
	else {
		return true;
	}
}

function getFieldName(id){
	if(id=='firstname')
		return 'first name';
	else  if(id=='lastname')
		return 'last name';
	else if(id=='jobtitle')
		return 'job title';
	else if(id=='country')
		return 'country';
	else if(id=='hq_country')
		return 'hq country';
	else if(id=='companyname')
		return 'company name';
	else
		return id;
}

/*function googlePhoneFormat(contry,phone,componentId,phoneMsgId) {
	var arrayJson='{"Country":"'+contry+'","PhoneNumber":"'+phone+'"}';
	$.ajax({
		url: 'formatphonenumber.do?phonedata='+encodeURIComponent(arrayJson),
		success: function(json, textStatus, xhr)
		{
			if(json != null)  {
				data = JSON.parse(json);
				if(data.isValid==true){
					$(phoneMsgId).hide();
					$(componentId).val(""+data.internationalFormat+"");
				}else{
					$(phoneMsgId).html("Entered phone number is not valid for country "+contry).show();
				}
			}
		},
		error: function(xhr, textStatus, errorThrow)
		{
			$("#errorMsg").html("* Unable to format Phone number.").show();
			setTimeout(function(){$('#errorMsg').html("");},5000);
			$(componentId).css('border-color', 'red');
		}
	}); 
}
*/

/*function googlePhoneFormat(contry,phone,componentId,phoneMsagId) {
	phone = trimValue(phone);
	var ArrayJosn='{"Country":"'+contry+'","PhoneNumber":"'+phone+'"}';
	//alert(contry);
	$.ajax({
		url: 'formatphonenumber.do?phonedata='+encodeURIComponent(ArrayJosn),
		success: function(json, textStatus, xhr)
		{
			//alert(data);
			if(json != null)  {
					data = JSON.parse(json);
					//alert(data.internationalFormat);
					if(data.isValid==true){
						if(contry=="US" || contry=="CA"){
							var rephNoVal = rearrangePhoneNumber(data.internationalFormat);
							//alert(rephNoVal);
							//validatePhone(rephNoVal, phoneMsagId, "Valid format is not found for country "+contry+". Please enter valid 10 digits number.", componentId);
							if(rephNoVal.length == 10) {
								rephNoVal = rephNoVal.substring(0, 3) + "-" + rephNoVal.substring(3, 6) + "-" + rephNoVal.substring(6, rephNoVal.length);
								//$(inputId).val(phoneNumber);
							}
							$(componentId).val(rephNoVal);
						}else{
							$(componentId).val(data.internationalFormat);
						}
						
					}else{
						$(phoneMsagId).html("Valid format is not found for country "+contry+". Please enter valid 10 digits number.").show();
						setTimeout(function(){$(phoneMsagId).html('').hide();},3000);
					}
			}
		},
		error: function(xhr, textStatus, errorThrow)
		{
			//alert(errorThrow);
			$(phoneMsagId).css('color','red').html("* Unable to format number.").show();
			setTimeout(function(){$(phoneMsagId).html("");},4000);
			//$(componentId).css('border-color', 'red');
		}
	}); 
}
*/

function stateCodeFormat(contry,state,componentId,MsagId) {
	//alert(state+"  "+contry);
	contry = trimValue(contry);
	state = trimValue(state);
	//alert(state+"  "+contry);
	if(state!="" && state.length!=2 && contry!="" && contry!=null){
		$.ajax({
			url: 'formatStateCode.do?cntry='+contry+'&state='+state,
			success: function(json, textStatus, xhr)
			{
				//alert(json);
				if(json != null)  {
						data = JSON.parse(json);
						//alert(data);
						
							if(data.Status=='MATCHED'){
								$(componentId).val(data.StateCode);
								//return true;
							}else{
								//alert("hi");
								if((contry=="US" || contry=="CA") && state.length!=2){
									$(MsagId).css('color','red').html("Please enter two valid characters for state.").show();
									setTimeout(function(){$(MsagId).html('').hide();},3000);
									//return false;
								}else{
									//alert(state);
									$(componentId).val(alwaysCamelCase(state));
								}
								//return true;
							}
						
				}
			},
			error: function(xhr, textStatus, errorThrow)
			{
				//alert(errorThrow);
				$(MsagId).css('color','red').html("* Unable to call state service.").show();
				setTimeout(function(){$(MsagId).html("");},5000);
				//$(componentId).css('border-color', 'red');
			}
		});
	}
	/*else{
		if(state!="" && state.length!=2){
			$(MsagId).css('color','red').html("Please enter two characters for state.").show();
			setTimeout(function(){$(MsagId).html('').hide();},3000);
			return false;
		}
	}*/
}



function rearrangePhoneNumber(phoneRearrange) {
    
	if(phoneRearrange.charAt(0)=="1" && phoneRearrange.charAt(1)=="."){
		phoneRearrange = phoneRearrange.replace("1.","");    
	}
	if(phoneRearrange.indexOf("+1")!=-1){
	      //alert("hi");
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




var recMSORArr=new Array();
var recMSOR='';

function updateCheckMSOR() {
	if($('#companyname').val()=='')
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
	$('#use_hq_phone').prop('disabled', true);
	$('#use_hq_address').prop('disabled', true);
	
	var arr = {ClientName:$('#clientName').val(),ProductName:"MSOR",TransactionId:1,CompanyName:$('#companyname').val().trim(),Country:$('#hq_country').val().trim(),
			City:'',State:'',Zip:'',dunsNumber:'',threshold:$("#msorThreshold").val()};
	
	queryString = "?payloadRequest="+encodeURIComponent(JSON.stringify(arr));
	finalURL= 'fetchMSORdata.do'+queryString;
	
	$("#msorMsg").show();
	
	$.ajax({
		url:finalURL,
		success: function(data, textStatus, xhr)
		{
			var row = $(this).closest('tr');
			var nRow = row[0];
			dataTableObj.fnDeleteRow(nRow);
			
			if(data != null && data != '' && data != '[]'){
				data=JSON.parse(data);
				
				if(data.MatchedFlag=='MATCHED' && data.CompanyData!='[]'){
					data=data.CompanyData;
					recMSORArr=data;
					if(data.length>0){
						for(i=0;i<data.length;i++){
							dataTableObj.fnAddData([data[i].DunsNumber,data[i].hq_Phone,data[i].hq_CompanyName,data[i].hq_Address1,data[i].hq_City,data[i].hq_State,data[i].hq_Zip,data[i].hq_Country,data[i].Company_status,"<input name='dunsNmbrSelect' type='radio' onClick='fillDunsNmbrForMSOR("+i+")'"+" style='box-shadow:none'"+"/>"]);
						}
					}
					else{
						$("#errorMsg").html("* no matched records found.");
						setTimeout(function(){$('#errorMsg').html("");},4000);
					}
			    }	
				else{
					//$("#errorMsg").html("* no records found.");
					//setTimeout(function(){$('#errorMsg').html("");},4000);
				}
				$("#msorMsg").hide();
				 
				enableButtons();
				$('#use_hq_phone').prop('disabled', false);
				$('#use_hq_address').prop('disabled', false);
			}
			else {
				$("#errorMsg").html("* no records found.");
				document.getElementById('checkHoovers').disabled = false;
				document.getElementById('loadHoovers').disabled = false;
				setTimeout(function(){$('#errorMsg').html("");},4000);
				
				$("#msorMsg").hide();
				 
				enableButtons();
				$('#use_hq_phone').prop('disabled', false);
				$('#use_hq_address').prop('disabled', false);
			}
		},
		error: function(xhr, textStatus, errorThrow)
		{
			var row = $(this).closest('tr');
			var nRow = row[0];
			dataTableObj.fnDeleteRow(nRow);
			
			$("#errorMsg").html("* error occurred while pulling duns numbers, kindly check with development team.").show();
			setTimeout(function(){$('#errorMsg').html("");},5000);
			$("#msorMsg").hide();
			
			enableButtons();
			$('#use_hq_phone').prop('disabled', false);
			$('#use_hq_address').prop('disabled', false);
		}
	})
}

function fillDunsNmbrForMSOR(index)
{
	recMSOR=recMSORArr[index];
	$("#dunsnumber").val(recMSOR.DunsNumber);
	$("#hidden_duns_number").val(recMSOR.DunsNumber);
	document.getElementById('loadMSOR').disabled = false;
}

function updateLoadMSOR(){
	
	if($('#dunsnumber').val()!=null && $('#dunsnumber').val()!='' && $('#hidden_duns_number').val()!=null && $('#hidden_duns_number').val()!='' && $('#dunsnumber').val() != $('#hidden_duns_number').val()) {
		if(confirm("Are you sure you want to load MSOR details with the new duns number?")) {
			loadMSORDetails();
		}
		else {
			//e.preventDefault();
		}
	}
	else {
		loadMSORDetails();
	}
}

function loadMSORDetails(){
	
	if($('#dunsnumber').val()!='') {
		
		if(! $.isNumeric($('#dunsnumber').val()))
		{
			$("#dunsNoMsg").html("* Duns number can be numeric only.").show();
			setTimeout(function(){$('#dunsNoMsg').html("");},4000);
			return false;
		}
		if($.isNumeric($('#dunsnumber').val()) && ($('#dunsnumber').val().length > 9 || $('#dunsnumber').val().length < 9)) {
			$("#dunsNoMsg").html("* Duns number needs to be 9 characters only.").show();
			setTimeout(function(){$('#dunsNoMsg').html("");},4000);
			return false;
		}
		
		createCorrelationId();
		var arr = {ClientName:$('#clientName').val(),ProductName:"MSOR",TransactionId:$('#correlationId').val(),CompanyName:'',Country:'',
				City:'',State:'',Zip:'',dunsNumber:$("#dunsnumber").val(),threshold:1};
		
		queryString = "?payloadRequest="+encodeURIComponent(JSON.stringify(arr));
		finalURL= 'fetchMSORdata.do'+queryString;
		
		$("#msorMsg").show();
		
		$.ajax({
			url:finalURL,
			success: function(data, textStatus, xhr)
			{
				
				//alert(data);
				//var row = $(this).closest('tr');
				//var nRow = row[0];
				//dataTableObj.fnDeleteRow(nRow);
				
				if(data != null && data != '' && data != '[]'){
					//alert(data);
					
					var html="";
					var tableData = '';
					data=JSON.parse(data);
					
					if(data.MatchedFlag=='MATCHED' && data.CompanyData!='[]'){
						data=data.CompanyData;
						//recArr=data;
						if(data.length>0){
							//for(i=0;i<data.length;i++){
							//recLoadMSOR = data[0];
								//dataTableObj.fnAddData([data[0].DunsNumber,data[0].hq_Phone,data[0].hq_CompanyName,data[0].hq_Address1,data[0].hq_City,data[0].hq_State,data[0].hq_Zip,data[0].hq_Country,data[0].Company_status,"<input name='dunsNmbrSelect' type='radio' onClick='fillDunsNmbrForMSOR("+i+")'"+" style='box-shadow:none'"+"/>"]);
							//}
							
							if(data[0]!=""){
								//alert('record got');
								if(data[0].hq_CompanyName != null && data[0].hq_CompanyName != "") {
									$("#companyname").val(data[0].hq_CompanyName.trim()); 
								}/*else{
									$("#companyname").val(""); 
								}*/
								if(data[0].hq_Address1 != null && data[0].hq_Address1 != "") {
									$("#hq_street").val(data[0].hq_Address1.trim()); 
								}/*else{
									$("#hq_street").val(""); 
								}*/
								if(data[0].hq_City != null && data[0].hq_City != "") {
									$("#hq_city").val(data[0].hq_City.trim()); 
								}/*else{
									$("#hq_city").val("");
								}*/
								if(data[0].hq_Zip != null && data[0].hq_Zip != "") {
									$("#hq_postalcode").val(data[0].hq_Zip.trim()); 
								}/*else{
									$("#hq_postalcode").val(""); 
								}*/
								if(data[0].hq_State != null && data[0].hq_State != "") {
									$("#hq_state").val(data[0].hq_State.trim()); 
								}/*else{
									$("#hq_state").val(""); 
								}*/
								if(data[0].hq_Country != null && data[0].hq_Country != "") {
									$("#hq_country").val(data[0].hq_Country.trim()); 
								}/*else{
									$("#hq_country").val("");
								}*/
								if(data[0].hq_Phone != null && data[0].hq_Phone != "") {
									$("#hq_phone").val(data[0].hq_Phone.trim()); 
								}/*else{
									$("#hq_phone").val("");
								}*/
								if(data[0].Revenue != null && data[0].Revenue != "") {
									$("#revenue").val(data[0].Revenue.trim()); 
								}/*else{
									$("#revenue").val("");
								}*/
								if(data[0].Industry != null && data[0].Industry != "") {
									$("#industry").val(data[0].Industry.trim()); 
								}/*else{
									$("#industry").val("");
								}*/
								if(data[0].EmployeeTotal != null && data[0].EmployeeTotal != "") {
									$("#employee").val(data[0].EmployeeTotal.trim()); 
								}/*else{
									$("#employee").val(""); 
								}*/
								if(data[0].DunsNumber != null && data[0].DunsNumber != "") {
									$("#dunsnumber").val(data[0].DunsNumber.trim()); 
								}/*else{
									$("#dunsnumber").val("");
								}*/
								if(data[0].Website != null && data[0].Website != "") {
									$("#website").val(data[0].Website.trim()); 
								}/*else{
									$("#website").val("");
								}*/
								if(data[0].hq_LinkedinUrl != null && data[0].hq_LinkedinUrl != "") {
									$("#complinkedinhandle").val(data[0].hq_LinkedinUrl.trim()); 
								}/*else{
									$("#complinkedinhandle").val("");
								}*/
								if(data[0].Technology != null && data[0].Technology != "") {
									$("#technology").val(data[0].Technology.trim()); 
								}/*else{
									$("#technology").val("");
								}*/
								if(data[0].Description != null && data[0].Description != "") {
									$("#description").val(data[0].Description.trim()); 
								}/*else{
									$("#description").val("");
								}*/
								if(data[0].Ownership != null && data[0].Ownership != "") {
									$("#hq_ownership").val(data[0].Ownership.trim()); 
								}/*else{
									$("#hq_ownership").val("");
								}*/
								if(data[0].Fax != null && data[0].Fax != "") {
									$("#fax").val(data[0].Fax.trim()); 
								}/*else{
									$("#fax").val("");
								}*/
								if(data[0].ParentCompany != null && data[0].ParentCompany != "") {
									$("#Parentcompany").val(data[0].ParentCompany.trim()); 
								}/*else{
									$("#Parentcompany").val("");
								}*/
								if(data[0].hq_Address2 != null && data[0].hq_Address2 != "") {
									$("#hq_address2").val(data[0].hq_Address2.trim()); 
								}/*else{
									$("#hq_address2").val("");
								}*/
								if(data[0].Longitude != null && data[0].Longitude != "") {
									$("#longitude").val(data[0].Longitude.trim()); 
								}/*else{
									$("#longitude").val("");
								}*/
								if(data[0].Latitude != null && data[0].Latitude != "") {
									$("#latitude").val(data[0].Latitude.trim()); 
								}/*else{
									$("#latitude").val("");
								}*/
								
								if(data[0].DNB_Date != null && data[0].DNB_Date != "") {
									$("#cmpDnbDate").val(data[0].DNB_Date.trim()); 
								}/*else{
									$("#DNB_DATE").val("");
								}*/
								if(data[0].DNB_Status != null && data[0].DNB_Status != "") {
									$("#cmpDnbStatus").val(data[0].DNB_Status.trim()); 
								}/*else{
									$("#DNB_STATUS").val("");
								}*/
								if(data[0].Region != null && data[0].Region != "") {
									$("#Region").val(data[0].Region.trim()); 
								}/*else{
									$("#region").val("");
								}*/
								
								
								if(data[0].National_RegNumber != null && data[0].National_RegNumber != "") {
									$("#NationalRegNumber").val(data[0].National_RegNumber.trim()); 
								}/*else{
									$("#NationalRegNumber").val("");
								}*/
								if(data[0].SIC != null && data[0].SIC != "") {
									$("#SIC").val(data[0].SIC.trim()); 
								}/*else{
									$("#SIC").val("");
								}*/
								if(data[0].NAICS != null && data[0].NAICS != "") {
									$("#NAICS").val(data[0].NAICS.trim()); 
								}/*else{
									$("#NAICS").val("");
								}*/
								if(data[0].LocationType != null && data[0].LocationType != "") {
									$("#locationtype").val(data[0].LocationType.trim()); 
								}/*else{
									$("#locationtype").val("");
								}*/
								if(data[0].CompanyType != null && data[0].CompanyType != "") {
									$("#companytype").val(data[0].CompanyType.trim()); 
								}/*else{
									$("#companytype").val("");
								}*/
								
								
								if($("#website").val() != null && $("#website").val() != "") {
									 document.getElementById('websiteButton').disabled = false;
								}
								else {
									 document.getElementById('websiteButton').disabled = true;
								}
							
							}
							
							
							
						}else{
							document.getElementById('loadMSOR').disabled = true;
							$("#errorMsg").html("* There are no company details corressponding to the dunsnumber : "+$("#dunsnumber").val()+", kindly recheck.").show();
							setTimeout(function(){$('#errorMsg').html("");},6000);
						}
				    }	
					else{
						document.getElementById('loadMSOR').disabled = true;
						$("#errorMsg").html("* There are no company details corressponding to the dunsnumber : "+$("#dunsnumber").val()+", kindly recheck.").show();
						setTimeout(function(){$('#errorMsg').html("");},6000);
						
					}
					$("#msorMsg").hide();
					
					if($("#website").val() != null && $("#website").val() != "") {
						 document.getElementById('websiteButton').disabled = false;
					}
					else {
						 document.getElementById('websiteButton').disabled = true;
					}
					
				}
				else {
					$("#errorMsg").html("* no records found.");
					setTimeout(function(){$('#errorMsg').html("");},4000);
					$("#msorMsg").hide(); 
					document.getElementById('checkMSOR').disabled = false;
					if($("#website").val() != null && $("#website").val() != "") {
						 document.getElementById('websiteButton').disabled = false;
					}
					else {
						 document.getElementById('websiteButton').disabled = true;
					}
				}
			},
			error: function(xhr, textStatus, errorThrow)
			{
				var row = $(this).closest('tr');
				var nRow = row[0];
				dataTableObj.fnDeleteRow(nRow);
				
				$("#errorMsg").html("* error occurred while pulling duns numbers, kindly check with development team.").show();
				setTimeout(function(){$('#errorMsg').html("");},5000);
				$("#msorMsg").hide();
				document.getElementById('checkMSOR').disabled = false;
				if($("#dunsnumber").val() != null && $("#dunsnumber").val() != "") {
					document.getElementById('loadMSOR').disabled = false;
				}
				else {
					document.getElementById('loadMSOR').disabled = true;
				}
				if($("#website").val() != null && $("#website").val() != "") {
					 document.getElementById('websiteButton').disabled = false;
				}
				else {
					 document.getElementById('websiteButton').disabled = true;
				}
			}
		})
		
		//disableEnableMapButton();
	}	
}

/*function updateLoadMSOR(){
	disableButtons();
	$('#use_hq_phone').prop('disabled', true);
	$('#use_hq_address').prop('disabled', true);
	
	if(recMSOR != '') {
		if(recMSOR.hq_CompanyName != null && recMSOR.hq_CompanyName != "") {
			$("#companyname").val(txtCamelCaseByVal(recMSOR.hq_CompanyName.trim())); 
		}else{
			$("#companyname").val(""); 
		}
		if(recMSOR.hq_State != null && recMSOR.hq_State != "") {
			$("#hq_state").val(recMSOR.hq_State.trim()); 
		}else{
			$("#hq_state").val(""); 
		}
		if(recMSOR.hq_Phone != null && recMSOR.hq_Phone != "") {
			$("#hq_phone").val(recMSOR.hq_Phone.trim()); 
		}else{
			$("#hq_phone").val("");
		}
		if(recMSOR.EmployeeTotal != null && recMSOR.EmployeeTotal != "") {
			$("#employee").val(recMSOR.EmployeeTotal.trim()); 
		}else{
			$("#employee").val(""); 
		}
		if(recMSOR.hq_LinkedinUrl != null && recMSOR.hq_LinkedinUrl != "") {
			$("#complinkedinhandle").val(recMSOR.hq_LinkedinUrl.trim()); 
		}else{
			$("#complinkedinhandle").val("");
		}
		if(recMSOR.hq_Address1 != null && recMSOR.hq_Address1 != "") {
			$("#hq_street").val(txtCamelCaseByVal(recMSOR.hq_Address1.trim())); 
		}else{
			$("#hq_street").val(""); 
		}
		if(recMSOR.hq_Zip != null && recMSOR.hq_Zip != "") {
			$("#hq_postalcode").val(recMSOR.hq_Zip.trim()); 
		}else{
			$("#hq_postalcode").val(""); 
		}
		if(recMSOR.Revenue != null && recMSOR.Revenue != "") {
			$("#revenue").val(recMSOR.Revenue.trim()); 
		}else{
			$("#revenue").val("");
		}
		if(recMSOR.DunsNumber != null && recMSOR.DunsNumber != "") {
			$("#dunsnumber").val(recMSOR.DunsNumber.trim()); 
		}else{
			$("#dunsnumber").val("");
		}
		if(recMSOR.Description != null && recMSOR.Description != "") {
			$("#description").val(txtCamelCaseByVal(recMSOR.Description.trim())); 
		}else{
			$("#description").val("");
		}
		if(recMSOR.hq_City != null && recMSOR.hq_City != "") {
			$("#hq_city").val(txtCamelCaseByVal(recMSOR.hq_City.trim())); 
		}else{
			$("#hq_city").val("");
		}
		if(recMSOR.hq_Country != null && recMSOR.hq_Country != "") {
			$("#hq_country").val(recMSOR.hq_Country.trim()); 
		}else{
			$("#hq_country").val("");
		}
		if(recMSOR.Industry != null && recMSOR.Industry != "") {
			$("#industry").val(txtCamelCaseByVal(recMSOR.Industry.trim())); 
		}else{
			$("#industry").val("");
		}
		if(recMSOR.Website != null && recMSOR.Website != "") {
			$("#website").val(recMSOR.Website.trim()); 
		}else{
			$("#website").val("");
		}
		if(recMSOR.Parent_DunsNumber != null && recMSOR.Parent_DunsNumber != "") {
			$("#parent_duns_no").val(recMSOR.Parent_DunsNumber.trim()); 
		}else{
			$("#parent_duns_no").val("");
		}
		if(recMSOR.CompanyType != null && recMSOR.CompanyType != "") {
			$("#companytype").val(txtCamelCaseByVal(recMSOR.CompanyType.trim())); 
		}else{
			$("#companytype").val("");
		}
		if(recMSOR.NAICS != null && recMSOR.NAICS != "") {
			$("#NAICS").val(recMSOR.NAICS.trim()); 
		}else{
			$("#NAICS").val("");
		}
		if(recMSOR.SIC != null && recMSOR.SIC != "") {
			$("#SIC").val(recMSOR.SIC.trim()); 
		}else{
			$("#SIC").val("");
		}
		if(recMSOR.Fax != null && recMSOR.Fax != "") {
			$("#fax").val(recMSOR.Fax.trim()); 
		}else{
			$("#fax").val("");
		}
		if(recMSOR.Longitude != null && recMSOR.Longitude != "") {
			$("#longitude").val(recMSOR.Longitude.trim()); 
		}else{
			$("#longitude").val("");
		}
		if(recMSOR.Latitude != null && recMSOR.Latitude != "") {
			$("#latitude").val(recMSOR.Latitude.trim()); 
		}else{
			$("#latitude").val("");
		}
		if(recMSOR.LocationType != null && recMSOR.LocationType != "") {
			$("#locationtype").val(txtCamelCaseByVal(recMSOR.LocationType.trim())); 
		}else{
			$("#locationtype").val("");
		}
		if(recMSOR.ParentCompany != null && recMSOR.ParentCompany != "") {
			$("#Parentcompany").val(recMSOR.ParentCompany.trim()); 
		}else{
			$("#Parentcompany").val("");
		}
		
		
		enableButtons();
		$('#use_hq_phone').prop('disabled', false);
		$('#use_hq_address').prop('disabled', false);
	}
	else {
		$("#errorMsg").html("* no records found while loading MSOR data against dunsnumber "+$("#dunsnumber").val());
		enableButtons();
		$('#use_hq_phone').prop('disabled', false);
		$('#use_hq_address').prop('disabled', false);
		setTimeout(function(){$('#errorMsg').html("");},4000);
	}
}*/

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
				data=JSON.parse(data);
				if(data.matched_flag == 'MATCHED'){
					SetPPLData(data);
				}else{
					//$("#pplMsg").hide();
					$("#errorMsg").html("* No matched data found from PPL Search").show();
					setTimeout(function(){$('#errorMsg').html("");},3000);
				}
			}else{
				//$("#pplMsg").hide();
			}	
		},
		error: function(xhr, textStatus, errorThrow)
		{
			$("#pplMsg").hide();
			$("#errorMsg").html("* exception occurred while fetching data from PPL service, kindly check with development team.").show();
			setTimeout(function(){$('#errorMsg').html("");},5000);
		}
	}) 
}

function SetPPLData(jsonObj){
	setRowValue("ppltable","pplTblFirstName",2,jsonObj.names.firstname);
	setRowValue("ppltable","pplTblLastName",2,jsonObj.names.lastname);
	
	if(jsonObj.emails.corporate_email!=undefined){
		setRowValue("ppltable","pplTblCemail",2,jsonObj.emails.corporate_email.address);
	}
	
	if(jsonObj.emails.private_email){
	setRowValue("ppltable","pplTblPemail",2,jsonObj.emails.private_email.address);
	}
	if(jsonObj.emails.email){
		if(jsonObj.emails.email[0]!=undefined){
			setRowValue("ppltable","pplTblP1email",2,jsonObj.emails.email[0].address);
		}
		if(jsonObj.emails.email[1]!=undefined){
			setRowValue("ppltable","pplTblP2email",2,jsonObj.emails.email[1].address);
		}
		if(jsonObj.emails.email[2]!=undefined){
			setRowValue("ppltable","pplTblP3email",2,jsonObj.emails.email[2].address);
		}
	}
	if(jsonObj.jobs!=undefined){
		setRowValue("ppltable","pplTblJobTitle",2,jsonObj.jobs[0].title);
	}
	if(jsonObj.latestjobs!=undefined){
		setRowValue("ppltable","pplTblCmpName",2,jsonObj.latestjobs.organization);
	}
	if(jsonObj.phones){
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
	if(jsonObj.addresses && jsonObj.addresses.home_address!=undefined){
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

function createCorrelationId(){
	var d = new Date();
    var corrId = $('#clientName').val()+"-"+"MSOR"+"-"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
    $('#correlationId').val(corrId);
}

function setRowValue(tableId, rowId, colNum, newValue)
{
    $('#'+tableId).find('tr#'+rowId).find('td:eq("'+colNum+'")').html(newValue);
}

function SetEmpData(){
	setRowValue("ppltable","pplTblFirstName",1,$("#firstname").val());
	setRowValue("ppltable","pplTblLastName",1,$("#lastname").val());
	setRowValue("ppltable","pplTblCemail",1,$("#corporate_email").val());
	setRowValue("ppltable","pplTblPemail",1,$("#private_email").val());
	setRowValue("ppltable","pplTblP1email",1,$("#private_email_2").val());
	setRowValue("ppltable","pplTblP2email",1,$("#private_email_3").val());
	setRowValue("ppltable","pplTblJobTitle",1,$("#jobtitle").val());
	setRowValue("ppltable","pplTblJobFunction",1,$("#jobfunction").val());
	setRowValue("ppltable","pplTblCmpName",1,$("#companyname").val());
	setRowValue("ppltable","pplTblDphone",1,$("#workphone").val());
	setRowValue("ppltable","pplTblMphone",1,$("#mobilephone").val());
	setRowValue("ppltable","pplTblAdd1",1,$("#street").val());
	setRowValue("ppltable","pplTblCity",1,$("#city").val());
	setRowValue("ppltable","pplTblState",1,$("#state").val());
	setRowValue("ppltable","pplTblPCode",1,$("#postalcode").val());
	setRowValue("ppltable","pplTblCntry",1,$("#country").val());
	setRowValue("ppltable","pplTblLinkedIn",1,$("#linkedin_url").val());
	setRowValue("ppltable","pplTblFacebook",1,$("#facebook_handle").val());
	setRowValue("ppltable","pplTblTwitter",1,$("#twitter_URL").val());
	setRowValue("ppltable","pplTblXing",1,$("#xing_handle").val());
	setRowValue("ppltable","pplTblMisc",1,$("#contact_misc_link").val());
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

function setRowValueToEmpDetails(tableId, rowId, componentId)
{
	if($('#'+tableId+' tbody tr#'+rowId).find('td:eq(3) input').is(':checked')){
		if(rowId=="pplTblFirstName" || rowId=="pplTblLastName"){
			$('#'+componentId).val(alwaysCamelCase($('#'+tableId).find('tr#'+rowId).find('td:eq(2)').text()));
		}
		else if(rowId=="pplTblLinkedIn" || rowId=="pplTblFacebook" || rowId=="pplTblTwitter" || rowId=="pplTblXing" || rowId=="pplTblMisc" ||
				 rowId=="pplTblCntry" || rowId=="pplTblPCode" || rowId=="pplTblState" || rowId=="pplTblCemail" ||
				 rowId=="pplTblPemail" ||  rowId=="pplTblP1email" || rowId=="pplTblP2email" || rowId=="pplTblP3email" || rowId=="pplTblDphone" || rowId=="pplTblMphone"){
			$('#'+componentId).val($('#'+tableId).find('tr#'+rowId).find('td:eq(2)').text());
		}else{
			$('#'+componentId).val($('#'+tableId).find('tr#'+rowId).find('td:eq(2)').text());
		}	
	}
}

function updatePIPLDataToEmpDetail(){
	setRowValueToEmpDetails("ppltable", "pplTblFirstName", "firstname");
	setRowValueToEmpDetails("ppltable", "pplTblLastName", "lastname");
	setRowValueToEmpDetails("ppltable", "pplTblCemail", "corporate_email");
	setRowValueToEmpDetails("ppltable", "pplTblPemail", "private_email");
	setRowValueToEmpDetails("ppltable", "pplTblP1email", "private_email_2");
	setRowValueToEmpDetails("ppltable", "pplTblP2email", "private_email_3");
	setRowValueToEmpDetails("ppltable", "pplTblJobTitle", "jobtitle");
	setRowValueToEmpDetails("ppltable", "pplTblJobFunction", "jobfunction");
	setRowValueToEmpDetails("ppltable", "pplTblCmpName", "companyname");
	setRowValueToEmpDetails("ppltable", "pplTblDphone", "workphone");
	setRowValueToEmpDetails("ppltable", "pplTblMphone", "mobilephone");
	setRowValueToEmpDetails("ppltable", "pplTblAdd1", "street");
	setRowValueToEmpDetails("ppltable", "pplTblCity", "city");
	setRowValueToEmpDetails("ppltable", "pplTblState", "state");
	setRowValueToEmpDetails("ppltable", "pplTblPCode", "postalcode");
	setRowValueToEmpDetails("ppltable", "pplTblCntry", "country");
	setRowValueToEmpDetails("ppltable", "pplTblLinkedIn", "linkedin_url");
	setRowValueToEmpDetails("ppltable", "pplTblFacebook", "facebook_handle");
	setRowValueToEmpDetails("ppltable", "pplTblTwitter", "twitter_URL");
	setRowValueToEmpDetails("ppltable", "pplTblXing", "xing_handle");
	setRowValueToEmpDetails("ppltable", "pplTblMisc", "contact_misc_link");
	
	if($('#ppltable tbody tr#pplTblFirstName').find('td:eq(3) input').is(':checked') && $('#ppltable tbody tr#pplTblLastName').find('td:eq(3) input').is(':checked')){
		var fname = $('#ppltable tbody tr#pplTblFirstName').find('td:eq(2)').text();
		var lname = $('#ppltable tbody tr#pplTblLastName').find('td:eq(2)').text();
		if(fname!=null && fname!="" && fname!=" " && fname!=undefined && lname!=null && lname!="" && lname!=" " && lname!=undefined){
			$('#fullname').val(fname+" "+lname);
		}
	}
	
	
	/*if($("#private_email").val() != null && $("#private_email").val() != "") {
		 $("#piplPemailHandleId").removeClass("ehandle").attr("disabled", false);
	}
	else {
		 $("#piplPemailHandleId").addClass("ehandle").attr("disabled", true);
	}
   if($("#private_email_2").val() != null && $("#private_email_2").val() != "" && $("#private_email_2").val() != " " && $("#private_email_2").val() != undefined) {
		 $("#pemailpiplHandleId1").removeClass("ehandle").attr("disabled", false);
	}
	else {
		 $("#pemailpiplHandleId1").removeClass("ehandle").attr("disabled", true);
	}
	if($("#private_email_3").val() != null && $("#private_email_3").val() != "" && $("#private_email_3").val() != " " && $("#private_email_3").val() != undefined) {
		 $("#pemailpiplHandleId2").removeClass("ehandle").attr("disabled", false);
	}
	else {
		 $("#pemailpiplHandleId2").removeClass("ehandle").attr("disabled", true);
	}
	
	if($("#linkedin_url").val() != null && $("#linkedin_url").val() != "") {
		if(!isValidUrl($("#linkedin_url").val())) {
			e.preventDefault();
			$("#piplLinkedInHandleId").addClass("ehandle").attr("disabled", true);
			$("#linkedinHandleId").addClass("ehandle").attr("disabled", true);
			$("#linkedinHandleMsg").html("* Please enter a valid Linkedin Handle.").show();
			return false;
		}
		else {
			$("#piplLinkedInHandleId").removeClass("ehandle").attr("disabled", false);
			$('#linkedinHandleMsg').hide();
			$("#linkedinHandleId").removeClass("ehandle").attr("disabled", false);
			if(($("#linkedin_url").val().indexOf('http://') == 0) || $("#linkedin_url").val().indexOf('https://') == 0) {
				linkedinhandle=$("#linkedin_url").val();
			}
			else {
				linkedinhandle = "http://"+$("#linkedin_url").val();
			}
			$("#linkedinHandleId").attr("href",linkedinhandle);
		}
	}
	if($("#xing_handle").val() != null && $("#xing_handle").val() != "") {
		if(!isValidUrl($("#xing_handle").val())) {
			e.preventDefault();
			$("#xingHandleId").addClass("ehandle").attr("disabled", true);
			$("#xingHandleMsg").html("* Please enter a valid Xing Handle.").show();
			return false;
		}
		else {
			$('#xingHandleMsg').hide();
			$("#xingHandleId").removeClass("ehandle").attr("disabled", false);
			if(($("#xing_handle").val().indexOf('http://') == 0) || $("#xing_handle").val().indexOf('https://') == 0) {
				xinghandle=$("#xing_handle").val();
			}
			else {
				xinghandle = "http://"+$("#xing_handle").val();
			}
			$("#xingHandleId").attr("href",xinghandle);
		}
	}
	if($("#facebook_handle").val() != null && $("#facebook_handle").val() != "") {
		if(!isValidUrl($("#facebook_handle").val())) {
			e.preventDefault();
			$("#facebookHandleId").addClass("ehandle").attr("disabled", true);
			$("#facebookHandleMsg").html("* Please enter a valid Facebook Handle.").show();
			return false;
		}
		else {
			$('#facebookHandleMsg').hide();
			$("#facebookHandleId").removeClass("ehandle").attr("disabled", false);
			if(($("#facebook_handle").val().indexOf('http://') == 0) || $("#facebook_handle").val().indexOf('https://') == 0) {
				facebookhandle=$("#facebook_handle").val();
			}
			else {
				facebookhandle = "http://"+$("#facebook_handle").val();
			}
			$("#facebookHandleId").attr("href",facebookhandle);
		}
	}
	if($("#twitter_URL").val() != null && $("#twitter_URL").val() != "") {
		if(!isValidUrl($("#twitter_URL").val())) {
			e.preventDefault();
			//$("#facebookHandleId").addClass("ehandle").attr("disabled", true);
			$("#twitterhandleMsg").html("* Please enter a valid twitter Handle.").show();
			return false;
		}
		else {
			$('#twitterhandleMsg').hide();
			//$("#facebookHandleId").removeClass("ehandle").attr("disabled", false);
			if(($("#twitter_URL").val().indexOf('http://') == 0) || $("#twitter_URL").val().indexOf('https://') == 0) {
				facebookhandle=$("#twitter_URL").val();
			}
			else {
				facebookhandle = "http://"+$("#twitter_URL").val();
			}
			//$("#facebookHandleId").attr("href",facebookhandle);
		}
	}

	if($("#contact_misc_link").val() != null && $("#contact_misc_link").val() != "") {
		if(!isValidUrl($("#contact_misc_link").val())) {
			e.preventDefault();
			$("#miscUrlId").addClass("ehandle").attr("disabled", true);
			$("#miscUrlMsg").html("* Please enter a valid Misc Link.").show();
			return false;
		}
		else {
			$('#miscUrlMsg').hide();
			$("#miscUrlId").removeClass("ehandle").attr("disabled", false);
			if(($("#contact_misc_link").val().indexOf('http://') == 0) || $("#contact_misc_link").val().indexOf('https://') == 0) {
				miscurl=$("#contact_misc_link").val();
			}
			else {
				miscurl = "http://"+$("#misccontact_misc_linkurl").val();
			}
			$("#miscUrlId").attr("href",miscurl);
		}
	}   */
	
}

function casingFormat(str){
	var finalStr="";
	if(str!=null && str!=""){
		var s = str.split(" ");
		if(s.length>0){
			for(var i=0;i<(s.length);i++){
				if(s[i].length<=3 && s[i]!='The' && s[i]!='the' && s[i]!='THE'){
					finalStr = finalStr+" "+s[i].toUpperCase();
				}else{
					finalStr = finalStr + " "+s[i].substring(0, 1).toUpperCase()+s[i].substring(1, s[i].length).toLowerCase() ;
				}
			}
		}
		finalStr=finalStr.trim();
	}
	return finalStr;
}

/*function txtCamelCase(componentId){
	var str = $(componentId).val();
	if(str!=null && str!="" && str!=" "){
			str = str.replace(/  +/g, ' ');
			//alert(str);
			str = str.trim();
			str = str.toLowerCase();
			var finalStr="";
			if(str!=null && str!=""){
				var s = str.split(" ");
				//alert(s);
				if(s.length>0){
					for(var i=0;i<(s.length);i++){
						//alert(casingWordAvoidArr.indexOf(s[i]));
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
			$(componentId).val(finalStr);
	}
}*/


/*function txtCamelCaseByVal(str){
	//var str = $(componentId).val();
	var finalStr="";

	if(str!=null && str!="" && str!=" "){
		str = str.replace(/  +/g, ' ');
		//alert(str);
		str = str.trim();
		str = str.toLowerCase();
		var finalStr="";
		if(str!=null && str!=""){
			var s = str.split(" ");
			//alert(s);
			if(s.length>0){
				for(var i=0;i<(s.length);i++){
					//alert(casingWordAvoidArr.indexOf(s[i]));
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
		//$(componentId).val(finalStr);
	}
	//alert("finalStr = "+finalStr);
	return finalStr;
}*/


function alwaysCamelCase(str){
	var finalStr="";

	if(str!=="NULL" && str!=null && str!="" && str!=" "){
		str = str.replace(/  +/g, ' ');
		//alert(str);
		str = str.trim();
		str = str.toLowerCase();
		var finalStr="";
		if(str!=null && str!=""){
			var s = str.split(" ");
			//alert(s);
			if(s.length>0){
				for(var i=0;i<(s.length);i++){
					//alert(casingWordAvoidArr.indexOf(s[i]));
						finalStr = finalStr + " "+s[i].substring(0, 1).toUpperCase()+s[i].substring(1, s[i].length).toLowerCase() ;	
				}
			}
			finalStr=finalStr.trim();
		}
		//$(componentId).val(finalStr);
	}
	//alert("finalStr = "+finalStr);
	return finalStr;
	
}



/*function storeCasingWordsInArray(casingwords,casingwordAlycamel){
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
	//alert("casingWordAvoidArr = "+casingWordAvoidArr);
}*/


function countryStateLengthChk(cntry,msgId,identifier){
	var regex = /^[A-Z a-z]{2}$/; 
	var result = regex.test(cntry);
	if (!result) {
		$(msgId).show().css('color', 'red').html('* '+identifier+' must be two characters only.');
	    setTimeout(function(){$(msgId).html("");},3000);
		return false;
	}
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
		$('#piplprivemail3Chk').prop('checked', true);
		$('#pipljobtitleChk').prop('checked', true);
		$('#pipljobfunctionChk').prop('checked', true);
		$('#piplcompnameChk').prop('checked', true);
		$('#pipldphoneChk').prop('checked', true);
		$('#piplmphoneChk').prop('checked', true);
		$('#pipladd1Chk').prop('checked', true);
		$('#pipladd2Chk').prop('checked', true);
		$('#piplcityChk').prop('checked', true);
		$('#piplstateChk').prop('checked', true);
		$('#piplpcodeChk').prop('checked', true);
		$('#piplcountryChk').prop('checked', true);
		$('#pipllinkedChk').prop('checked', true);
		$('#piplfacebookChk').prop('checked', true);
		$('#pipltwitterChk').prop('checked', true);
		$('#piplxingChk').prop('checked', true);
		$('#piplmiscChk').prop('checked', true);
		
	}else{
		
		$('#piplfnameChk').prop('checked', false);
		$('#pipllnameChk').prop('checked', false);
		$('#piplcorpemailChk').prop('checked', false);
		$('#piplprivemailChk').prop('checked', false);
		$('#piplprivemail1Chk').prop('checked', false);
		$('#piplprivemail2Chk').prop('checked', false);
		$('#piplprivemail3Chk').prop('checked', false);
		$('#pipljobtitleChk').prop('checked', false);
		$('#pipljobfunctionChk').prop('checked', false);
		$('#piplcompnameChk').prop('checked', false);
		$('#pipldphoneChk').prop('checked', false);
		$('#piplmphoneChk').prop('checked', false);
		$('#pipladd1Chk').prop('checked', false);
		$('#pipladd2Chk').prop('checked', false);
		$('#piplcityChk').prop('checked', false);
		$('#piplstateChk').prop('checked', false);
		$('#piplpcodeChk').prop('checked', false);
		$('#piplcountryChk').prop('checked', false);
		$('#pipllinkedChk').prop('checked', false);
		$('#piplfacebookChk').prop('checked', false);
		$('#pipltwitterChk').prop('checked', false);
		$('#piplxingChk').prop('checked', false);
		$('#piplmiscChk').prop('checked', false);
	}
}


function upperCaseVal(componentId){
	var val = $(componentId).val();
	if(val!=null && val!="" && val!=undefined){
		$(componentId).val(val.toUpperCase());
	}
}

function trimValue(value) {
	var trimValue='';
	if(value != null && value != "" && value != "undefined") {
		trimValue=value.trim();
	}
	return trimValue;
}

function onChangeCommonFunction(){
	
	$("#salutation").change(function(){ 
		$("#salutation").val(alwaysCamelCase($("#salutation").val()));
    });
	$("#firstname").change(function(){ 
        $('#hitgglscaper').val("Y");
        $("#firstname").val(alwaysCamelCase($("#firstname").val()));
        $("#fullname").val($("#firstname").val()+" "+$("#lastname").val());
    });
	$("#middlename").change(function(){ 
		 $("#middlename").val(alwaysCamelCase($("#middlename").val()));
    });
	$("#lastname").change(function(){
        $('#hitgglscaper').val("Y");
        $("#lastname").val(alwaysCamelCase($("#lastname").val()));
        $("#fullname").val($("#firstname").val()+" "+$("#lastname").val());
    });
	$("#country").change(function(){
		$('#hitgglscaper').val("Y");
		upperCaseVal("#country");
		
		var contactCountryVal = $('#country').val();
		var stateVal = $('#state').val();
		var mob = $("#mobilephone").val();
		var dphn = $("#directphone").val();
		
		stateCodeFormat(contactCountryVal,stateVal,"#state","#StateMsg");
		
		/*if(contactCountryVal!=null && contactCountryVal!="" && mob!=""){
			$("#mobilePhoneMsg").html('').hide();
			googlePhoneFormat(contactCountryVal,mob,"#mobilephone","#mobilePhoneMsg");
			//$("#mobPhValid").val("true");
		}
		if(contactCountryVal!=null && contactCountryVal!="" && dphn!=""){
			$("#directPhoneMsg").html('').hide();
			googlePhoneFormat(contactCountryVal,dphn,"#directphone","#directPhoneMsg");
			//$("#mobPhValid").val("true");
		}*/
		
		
	});
	$("#hq_country").change(function(){
		upperCaseVal("#hq_country");
		
		var contactCountryVal = $('#hq_country').val();
		var stateVal = $('#hq_state').val();
		var hqPhn = $("#hq_phone").val();
		var fax = $("#fax").val();
		
		stateCodeFormat(contactCountryVal,stateVal,"#hq_state","#hqStateMsg");
		
		/*if(contactCountryVal!=null && contactCountryVal!="" && hqPhn!=""){
			$("#hqPhoneMsg").html('').hide();
			googlePhoneFormat(contactCountryVal,hqPhn,"#hq_phone","#hqPhoneMsg");
			//$("#hqPhValid").val("true");
		}
		if(contactCountryVal!=null && contactCountryVal!="" && fax!=""){
			$("#hqFaxNoMsg").html('').hide();
			googlePhoneFormat(contactCountryVal,fax,"#fax","#hqFaxNoMsg");
			//$("#hqPhValid").val("true");
		}*/
		
		
	});
	
	/*$("#companyname").change(function(){
        $('#hitgglscaper').val("Y");
        //alert($('#company_company_id').val());
        //$("#companyname").val(casingFormat($("#companyname").val()));
        txtCamelCase("#companyname");
    });
	
	
	$("#jobtitle").change(function(){ 
        txtCamelCase("#jobtitle");
    });
	$("#jobfunction").change(function(){ 
        txtCamelCase("#jobfunction");
    });
	$("#street").change(function(){ 
        txtCamelCase("#street");
    });
	$("#address2").change(function(){ 
        txtCamelCase("#address2");
    });
	$("#city").change(function(){ 
        txtCamelCase("#city");
    });
	
	$("#locationtype").change(function(){ 
        txtCamelCase("#locationtype");
    });
	
	$("#hq_street").change(function(){ 
        txtCamelCase("#hq_street");
    });
	$("#hq_address2").change(function(){ 
        txtCamelCase("#hq_address2");
    });
	$("#hq_city").change(function(){ 
        txtCamelCase("#hq_city");
    });
	$("#description").change(function(){ 
        txtCamelCase("#description");
    });
	$("#companytype").change(function(){ 
        txtCamelCase("#companytype");
    });
	$("#industry").change(function(){ 
        txtCamelCase("#industry");
    });
	$("#hq_technology").change(function(){ 
        txtCamelCase("#hq_technology");
    });
	$("#hq_ownership").change(function(){ 
        txtCamelCase("#hq_ownership");
    });*/
	
	$("#state").change(function(){
		var contactCountryVal = $('#country').val();
		var stateVal = $('#state').val();
		/*if(contactCountryVal !=undefined && contactCountryVal != null && contactCountryVal != "" && (contactCountryVal == 'US' || contactCountryVal == 'CA')) {
			var stateVal = $('#state').val();
			var boolean_val= countryStateLengthChk(stateVal,"#StateMsg","State");
			if(boolean_val==false){
				return false;
			}
		}*/
		if(stateVal!="" && stateVal.length==2){
			$('#state').val(stateVal.toUpperCase());
			stateVal= $('#state').val();
		}
		
		stateCodeFormat(contactCountryVal,stateVal,"#state","#StateMsg");
		
    });
	
	$("#hq_state").change(function(){
		var contactCountryVal = $('#hq_country').val();
		var stateVal = $('#hq_state').val();
		/*if(contactCountryVal !=undefined && contactCountryVal != null && contactCountryVal != "" && (contactCountryVal == 'US' || contactCountryVal == 'CA')) {
			var stateVal = $('#hq_state').val();
			var boolean_val= countryStateLengthChk(stateVal,"#hqStateMsg","Company State");
			if(boolean_val==false){
				return false;
			}
		}*/
		if(stateVal!="" && stateVal.length==2){
			$('#hq_state').val(stateVal.toUpperCase());
			stateVal= $('#hq_state').val();
		}
		stateCodeFormat(contactCountryVal,stateVal,"#hq_state","#hqStateMsg");
		
    });
	
/*	 $("#mobilephone").change(function(){
		
		var cntry = $("#country").val();
		var mob = $("#mobilephone").val();
		
		if(mob==null || mob=="" || mob==" " || mob== undefined){
			$("#mobilePhoneMsg").css('color', 'red').html('Please enter mobile').show();
			setTimeout(function(){$('#mobilePhoneMsg').hide();},4000);
			return false;
		}
		
		if(cntry!=null && cntry!=""){
			$("#mobilePhoneMsg").html('').hide();
			googlePhoneFormat(cntry,mob,"#mobilephone","#mobilePhoneMsg");
			//$("#mobPhValid").val("true");
		}else{
			$('#country-error').hide();
			$('#countryMsg').show().css('color', 'red').html("* Please enter country");
			setTimeout(function(){$('#countryMsg').hide();},5000);
		}
		
	});
	$("#directphone").change(function(){
		
		var cntry = $("#country").val();
		var mob = $("#directphone").val();
		
		if(mob==null || mob=="" || mob==" " || mob== undefined){
			$("#directPhoneMsg").css('color', 'red').html('Please enter direct phone').show();
			setTimeout(function(){$('#directPhoneMsg').hide();},4000);
			return false;
		}
		
			if(cntry!=null && cntry!=""){
				$("#directPhoneMsg").html('').hide();
				googlePhoneFormat(cntry,mob,"#directphone","#directPhoneMsg");
				//$("#dirctPhValid").val("true");
			}else{
				$('#countryMsg').show().css('color', 'red').html("* Please enter country");
				setTimeout(function(){$('#countryMsg').hide();},5000);
			}
		
	});
	$("#hq_phone").change(function(){
		
		var cntry = $("#hq_country").val();
		var mob = $("#hq_phone").val();
		
		if(mob==null || mob=="" || mob==" " || mob== undefined){
			$("#hqPhoneMsg").css('color', 'red').html('Please enter hq phone').show();
			setTimeout(function(){$('#hqPhoneMsg').hide();},4000);
			return false;
		}
		
		if(cntry!=null && cntry!=""){
			$("#hqPhoneMsg").html('').hide();
			googlePhoneFormat(cntry,mob,"#hq_phone","#hqPhoneMsg");
			//$("#hqPhValid").val("true");
		}else{
			
			$("#hqCountryMsg").show().css('color', 'red').html("* Please enter country");
			setTimeout(function(){$('#hqCountryMsg').hide();},5000);
		}
	
	});
	
	
	$("#fax").change(function(){
		
		var cntry = $("#hq_country").val();
		var mob = $("#fax").val();
		
		if(mob==null || mob=="" || mob==" " || mob== undefined){
			$("#hqFaxNoMsg").css('color', 'red').html('Please enter fax number').show();
			setTimeout(function(){$('#hqFaxNoMsg').hide();},4000);
			return false;
		}
		
		if(cntry!=null && cntry!=""){
			$("#hqFaxNoMsg").html('').hide();
			googlePhoneFormat(cntry,mob,"#fax","#hqFaxNoMsg");
			//$("#hqPhValid").val("true");
		}else{
			
			$("#hqCountryMsg").show().css('color', 'red').html("* Please enter country");
			setTimeout(function(){$('#hqCountryMsg').hide();},5000);
		}
	
	});
*/	
	
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
		
	});
 
	$("#Parentcompany").change(function(){
	  if($('#Parentcompany').val()!=""){	
		if($.isNumeric($('#Parentcompany').val()) && ($('#Parentcompany').val().length > 9)) {
			$("#parentCmpMsg").html("* Please enter 9 characters dunsnumber for Parent Company Duns").show();
			setTimeout(function(){$('#parentCmpMsg').html("");},4000);
			return false;
		}
	  }
	});
	
	/*$("#seniority_level").change(function(){
			txtCamelCase("#seniority_level");
	});*/
	
	
	
}

function onSubmitValidation(){
	enableButtons();
	var flag = false;
	var contactCountryVal = $('#country').val();
	var stateVal = $('#state').val();
	var hqCountryVal = $('#hq_country').val();
	var hqstateVal = $('#hq_state').val();
	var mob = $("#mobilephone").val();
	var dPhone = $("#directphone").val();
	var hqPhone = $("#hq_phone").val();
	
	if($.isNumeric($('#dunsnumber').val()) && ($('#dunsnumber').val().length > 9)) {
		$("#dunsNoMsg").html("* Duns number up to 9 characters only.").show();
		setTimeout(function(){$('#dunsNoMsg').html("");},4000);
		return false;
	}
	
	if($('#Parentcompany').val()!=""){	
		if($.isNumeric($('#Parentcompany').val()) && ($('#Parentcompany').val().length > 9)) {
			$("#parentCmpMsg").html("* Please enter 9 characters dunsnumber for Parent Company Duns").show();
			setTimeout(function(){$('#parentCmpMsg').html("");},4000);
			return false;
		}
	}
	
	if(contactCountryVal != null && contactCountryVal != "") {
		if(contactCountryVal.length!=2){
			$("#countryMsg").css('color', 'red').html("* Please enter two characters for country code").show();
			setTimeout(function(){$("#countryMsg").hide();},3000);
			return false;
		}
	}
	if(hqCountryVal != null && hqCountryVal != "") {
		if(hqCountryVal.length!=2){
			$("#hqCountryMsg").css('color', 'red').html("* Please enter two characters for country code").show();
			setTimeout(function(){$("#hqCountryMsg").hide();},3000);
			return false;
		}
	}
	
	if(stateVal != null && stateVal != "") {
		if(contactCountryVal=="US" || contactCountryVal=="CA"){
			if(stateVal.length!=2){
				$("#StateMsg").css('color','red').html("* Please insert two characters code for state.").show();
				setTimeout(function(){$("#StateMsg").html("");},4000);
				return false;
			}
		}
		 stateCodeFormat(contactCountryVal,stateVal,"#state","#StateMsg");
	}
	if(hqstateVal != null && hqstateVal != "") {
		if(hqCountryVal=="US" || hqCountryVal=="CA"){
			if(hqstateVal.length!=2){
				$("#hqStateMsg").css('color','red').html("* Please insert two characters code for state.").show();
				setTimeout(function(){$("#hqStateMsg").html("");},4000);
				return false;
			}
		}
		stateCodeFormat(hqCountryVal,hqstateVal,"#hq_state","#hqStateMsg");
	}
	/*if(mob != null && mob != "") {
		googlePhoneFormat(contactCountryVal,mob,"#mobilephone","#mobilePhoneMsg");
	}
	if(dPhone != null && dPhone != "") {
		googlePhoneFormat(contactCountryVal,dPhone,"#directphone","#directPhoneMsg");
	}
	if(hqPhone != null && hqPhone != "") {
		googlePhoneFormat(contactCountryVal,hqPhone,"#hq_phone","#hqPhoneMsg");
	}*/
	
	removeHTTPFun("#website");
	
	
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
	
	return true;
	
}


function onloadPhoneFormat(contryVal,phoneComponentId){
	
	
	var contactCountryVal = contryVal;
	var workPhoneVal = $(phoneComponentId).val();
	if(contactCountryVal != null && contactCountryVal != "" && (contactCountryVal == 'US' || contactCountryVal == 'CA')) {
		
		if(workPhoneVal != null && workPhoneVal != "" && workPhoneVal != "NULL" && workPhoneVal != " ") {
			var workPhoneUpdated = workPhoneVal.replace(/[^0-9]/g, "");
			if(workPhoneUpdated.length == 10) {
				workPhoneVal = workPhoneUpdated.substring(0, 3) + "-" + workPhoneUpdated.substring(3, 6) + "-" + workPhoneUpdated.substring(6, workPhoneUpdated.length);
			}
			if(workPhoneUpdated.length == 11) {
				workPhoneVal = workPhoneUpdated.substring(1, 4) + "-" + workPhoneUpdated.substring(4, 7) + "-" + workPhoneUpdated.substring(7, workPhoneUpdated.length);
			}
			$(phoneComponentId).val(workPhoneVal);
		}
	}
	else {
		$(phoneComponentId).val(workPhoneVal); 
	}

}

function removeHTTPFun(componentId){
	var str ="";
	var strVal = $(componentId).val();
	if(strVal!=null && strVal!="" && strVal!=" "){
		strVal = strVal.trim();
	    if(strVal.indexOf("http://")>-1){
	        str = strVal.substring(7);
	       //alert(str);
	     }else if(strVal.indexOf("https://")>-1){
	          str = strVal.substring(8);
	       //alert(str);
	     }else{
	          str = strVal;
	     }
	   // alert(str);
	    $(componentId).val(str);
	}
	
}

function chkNegativeNumber(id,identifier, msgId){
	var val  = $(id).val();
	if(val<0){
		$(msgId).html("* " + identifier + " can't be negative").show();
		setTimeout(function(){$(msgId).hide();},4000);
		return false;
	}else{
		return true;
	}
}

function capLetter(val){
	if(val!="" && val!=" " && val!=null && val!=undefined){
		val = val.toUpperCase();
	}
	return val;
}
