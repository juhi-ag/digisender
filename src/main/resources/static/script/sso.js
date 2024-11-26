function ssoRedirectAuth(caller , url ,chkrole) {
	console.log("callind SSO for "+caller+" with url : "+ url)
	//url = url+"/sso.auth"
	$("#dcInternalLoader").show();
		$.ajax({
			url : "JWTHandlerAuth.do",
			headers: {"appname": caller ,"chkrole":chkrole},
			success : function(result) {
				if(result != null && result != "") {
					console.log("result :: "+result)
					if(result == "error") {
						console.log("error  returned")
						$("#dcInternalLoader").hide();
						$("#dcInternalErroMsg").html("*Connection refused error occured while Connecting.").show();
						setTimeout(function(){
							$("#dcInternalErroMsg").html("").hide();
						},2000);
					}else if(result == "usr_auth_err") {
						console.log("usr_auth_err")
						$("#dcInternalLoader").hide();
						$("#dcInternalErroMsg").html("*User is not authorized.").show();
						setTimeout(function(){
							$("#dcInternalErroMsg").html("").hide();
						},2000);
					}
					else{
						console.log("opening app in new window");
						window.open(url+"?n="+result,"_blank");
						$("#dcInternalLoader").hide();
					}
				}
			},
			error: function(xhr, textStatus, errorThrow)
			{
				$("#dcInternalLoader").hide();
				$("#dcInternalErroMsg").html("*Error occured while calling SSO.").show();
				
				setTimeout(function(){
					$("#dcInternalErroMsg").html("").hide();
				},2000);
				console.log(xhr);
				console.log(textStatus);
				console.log(errorThrow);
			}
		}); 
}