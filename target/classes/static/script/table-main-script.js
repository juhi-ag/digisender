// JavaScript Document
$(document).ready(function() {
	//Only needed for the filename of export files.
	//Normally set in the title tag of your page.
	document.title='Marketing Center Lead Manager';
	// DataTable initialisation
	/*$('#info').DataTable({
			responsive: true,
			"dom": '<"dt-buttons"Bf><"clear">lirtp',
			"pagingType": "simple_numbers",
			searching: true,
			"autoWidth": true,
			 "ordering": false,
			"scrollY": "290px",
			//"oLanguage": {"sLengthMenu": "Showing _MENU_ entries"},
			"language": {search: '<span class="ic-ma"><i class="fa fa-search"></i></span>',
            searchPlaceholder: 'Search',
                  },
				columnDefs: [
					{ "width": "2%", "targets": [0] },
					{ "width": "9%", "targets": [1] },
					{ "width": "9%", "targets": [2] },
					{ "width": "9%", "targets": [3] },
					{ "width": "9%", "targets": [4] },
				    { "width": "9%", "targets": [5] },
					{ "width": "9%", "targets": [6] },
					{ "width": "9%", "targets": [7] },
					{ "width": "9%", "targets": [8] },
					{ "width": "9%", "targets": [9] },
					{ "width": "7%", "targets": [10] },
					{ "width": "10%", "targets": [11] }
				]
			//'columnDefs': [{ 'orderable': false, 'targets': 0 }], // hide sort icon on header of first column
		});*/
	
	//Edit row buttons
	/*$('.dt-edit').each(function () {
		$(this).on('click', function(evt){
			$this = $(this);
			var dtRow = $this.parents('tr');
			$('div.modal-body').innerHTML='';
			$('div.modal-body').append('Row index: '+dtRow[0].rowIndex+'<br/>');
			$('div.modal-body').append('Number of columns: '+dtRow[0].cells.length+'<br/>');
			for(var i=0; i < dtRow[0].cells.length; i++){
				$('div.modal-body').append(''+dtRow[0].cells[i]._DT_CellIndex.column+', '+dtRow[0].cells[i]._DT_CellIndex.row+' => innerHTML : '+dtRow[0].cells[i].innerHTML+'<br/>');
			}
			$('#Marketcenter').modal('show');
		});
	});*/
	//Modal
	
	/*$('#Marketcenter').on('hidden.bs.modal', function (evt) {
		$('.modal .modal-body').empty();
	});*/
});

///file input js//

document.querySelector("#fileUpload").onchange = function(){
  document.querySelector("#file-name").textContent = this.files[0].name;
}
/*-----drag drop js---*/


