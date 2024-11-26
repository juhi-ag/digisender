WorkLog = {

//removed workloghost and port from arguments.
		'calculateWorkLogCount':function(document1,order_id)
		{
			
			//alert('http://'+workloghostname+':'+worklogportnum+'/worklogcount/'+order_id);
			$.ajax({
				
				/*url:'http://'+workloghostname+':'+worklogportnum+'/worklogcount/'+order_id,*/				
				url:"getworklogcount?order_id="+order_id,
				type:'GET',


				success : function(json, textStatus, xhr) {
					document1.getElementById('worklogcount').innerHTML = json;
					
				},

				error : function(xhr, textStatus, errorThrow) {
					document1.getElementById('worklogcount').innerHTML = 0;
				}

			});

		},
// removed the arguments :'openCommentBlock':function (workloghostname,worklogportnum,document,order_id) 
		'openCommentBlock':function (document,order_id)
		{
			 var commentsmodal = document.getElementById("commentsmodal");
			 var modalHTML='';
			
			$.ajax({
				/*url: "http://"+workloghostname+":"+worklogportnum+"/worklog/"+order_id,*/
				url:"getworklog?order_id="+order_id,
				crossDomain:true,
				type:'GET',
			
				success: function(data, textStatus, xhr)
				{
					console.log(data);
					for (var key in data.worklog) {
			
			modalHTML = modalHTML
											+ '<div class="commentBlk"><div class="row"><div class="col-md-1"><div class="userBg"><i class="fa fa-user"></i></div></div><div class="col-md-11"><div class="userBlk"><span class="userTitle">'
											+ data.worklog[key].created_by
											+ '</span>,'
											+ data.worklog[key].created_on+' '+data.worklog[key].notes_type
											+ '</div></div></div><div class="row"><div class="col-md-11 offset-md-1">'
											+ data.worklog[key].notes
											+ '</div></div></div>';

								}
								commentsmodal.innerHTML = modalHTML;

							},
							error : function(xhr, textStatus, errorThrow) {

							}

						});
			
		},
		
		
		'addComment':function (document,order_id,user) {
			var notes= document.getElementById('commentarea').value;
			
			if(notes!='' && notes.length>0)
			{
			$.ajax({
				/*url : "http://" + workloghostname + ":"+worklogportnum+"/worklog/" + order_id,*/
				url:"addworklog?order_id="+order_id,
				crossDomain : true,
				processData : false,
				contentType:  false,
				type : 'POST',
				data:JSON.stringify({"notes":notes,"notes_type":"Communication","created_by":user}),
				success : function(json, textStatus, xhr) {
					
					WorkLog.openCommentBlock(document,order_id);
					document.getElementById('commentarea').value='';
					$('#commAddMsg').show();
					setTimeout(function() {
				        $('#commAddMsg').fadeOut();}, 2000);
					WorkLog.calculateWorkLogCount(document,order_id);
					
				},
				error : function(xhr, textStatus, errorThrow) {
					WorkLog.openCommentBlock(document,order_id);
					$('#commErrMsg').show().fadeOut('slow');
				}
			});
			}
			
			else{
				$('#commErrMsg').show().fadeOut('slow');
			}
			
		}
		

}