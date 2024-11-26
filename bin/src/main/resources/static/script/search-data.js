// JavaScript Document

$(document).ready(function() {
    

	//var aCleanData = ['accounting','usa','finance','fff','ffb','fgh','mmm','maa'];
	var aCleanData = ['vp','usa','accounting','london','animation1','animation2','entry','manager','director','operations','sales','finance','supoort','information technology'];
		//var aCleanData1 = ['vp','usa','accounting','london','animation1','animation2','entry','manager','director','operations','sales','finance','supoort','information technology'];

$('.my-input').autocomplete({
    source: aCleanData,
    minLength: 2,
    search: function(oEvent, oUi) {
        // get current input value
        var sValue = $(oEvent.target).val();
        // init new search array
        var aSearch = [];
        // for each element in the main array ...
        $(aCleanData).each(function(iIndex, sElement) {
            // ... if element starts with input value
            if (sElement.substr(0, sValue.length) == sValue) {
                // add element
                aSearch.push(sElement);
            }
        });
        // change search array
        $(this).autocomplete('option', 'source', aSearch);
    }
});

});