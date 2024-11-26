<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Demandcentr Portal</title>
<link rel="apple-touch-icon" sizes="180x180" href="resources/images/fav/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="resources/images/fav/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="resources/images/fav/favicon-16x16.png">
<link rel="manifest" href="resources/images/fav/site.webmanifest">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#ffffff">

<!-- Bootstrap styles -->
<link rel="stylesheet" href="resources/css/bootstrap4.min.css">
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="resources/css/jquery-ui.min.css">
<link rel="stylesheet" href="resources/css/hxv7cob.css">
<link rel="stylesheet" href="resources/css/main.css">
<link rel="stylesheet" href="resources/css/dc_main.css">

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->

<script src="resources/script/jquery-3.3.1.min.js"></script>
<script src="resources/script/jquery-migrate-3.0.1.min.js"></script>
<script src="resources/script/jquery-ui.min.js"></script>
<script src="resources/script/bootstrap.bundle.min.js"></script>
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js"></script>
<script src="resources/script/jquery.popupoverlay.js"></script>
<script src="https://tympanus.net/Tutorials/LoadingAnimations/js/modernizr.custom.63321.js"></script>

<script>

function goBack() {
	window.history.back();
}
</script> 

<style type="text/css">
.navbar {margin-bottom:0px!important;}
</style>
</head>

<body>
<div id="loadBg"><div class="loadSpin"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div></div>
<!-- Header Starts -->
<header>
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
				</a>
				<div id="divDrpDownMenuItem">
				
				</div>
			</div>
			<!-- Logo and Mobile Toggle Icon Ends -->
			<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 text-center pgTitle"><span id="centrName"></span> <span id="titleHeading"></span></div>
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