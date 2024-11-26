(function(window, $) {
	var pluginName = 'vendorDeliveryOrder';

	function Plugin(element, options) {
		var self = this;
		var $table = $(element);
		var $tbody=$(element).find('tbody');
		var validVendorsList = options.validVendorsList;
		var currencyCodeMap=options.currencyMap;
		if(options.totalLeads)
			self.totalLeadsOfOrder=parseInt(options.totalLeads);
		var validStatusList=options.statusList;

		self.setTotalLeadsOfOrder=function(totalLeads){
			self.totalLeadsOfOrder=totalLeads;
		};
		self.selectedValidVendorsList = options.selectedValidVendorsList;
		self.selectedVendorsList=[];

		options = $.extend({}, $.fn[pluginName].defaults, options);

		function VendorOrder(obj) {
			this.id = obj ? obj.id : null, 
			this.vendorOrderStage = obj ? obj.vendorOrderStage : null,
			this.orderId = obj ? obj.orderId : null, 
			this.vendorId = obj ? obj.vendorId : null,
			this.costPerLead = obj ? obj.costPerLead :  null, 
			this.assignedCurrency= obj ? obj.assignedCurrency:null,
			this.noOfLead = obj ? obj.noOfLead : null ,
			this.createdOn=obj?obj.createdOn:null,
			this.iSclass='fa fa-plus';
			this.verifyEmail=obj?obj.verifyEmail:false;
			this.processCurrentLead=null;
			this.btnSclass='btn btn-xs btn-success';
			this.status = this.id ? 'NO_CHANGE': 'NEW'             	/*NEW(0), UPDATED(1), DELETED(2), NO_CHANGE(3);*/
		}

		self.destroy=function() {
			$table.each(function() {
				var el = this;
				$table.removeData(pluginName);
				$table.find("*").off();
				$tbody.children().remove()
			});
			self.selectedVendorsList=null;
			validVendorsList=null;
			self.selectedValidVendorsList=null;
			self.totalLeadsOfOrder=null;
			delete self;
		}

		function init() {
			var dataList = self.selectedValidVendorsList;
			for(var i=0;i<dataList.length;i++){
				var vendorOrder= new VendorOrder(dataList[i]);
				vendorOrder.iSclass='fa fa-trash';
				vendorOrder.btnSclass='btn btn-xs btn-danger';
				self.selectedVendorsList.push(vendorOrder);
			}

			var vendorOrder = new VendorOrder();
			vendorOrder.iSclass='fa fa-plus';
			vendorOrder.btnSclass='btn btn-xs btn-success ';
			self.selectedVendorsList.push(vendorOrder);

			populate();
		}

		function httpGet(theUrl)
		{
			var xmlHttp = new XMLHttpRequest();
			xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
			xmlHttp.send( null );
			return xmlHttp.responseText;
		}

		function populate() {
			$tbody.children().remove();
			if (self.selectedVendorsList && self.selectedVendorsList.length > 0) {
				var length = self.selectedVendorsList.length;
				for (var i = 0; i < length; i++) {
					var vendorOrder = self.selectedVendorsList[i];
					createNewRow(vendorOrder);
				}
			}
		}

		function createNewRow(vendorOrder){
			var tr=populateTr(vendorOrder);
			if(tr!=null)
				$tbody.append(tr);

		}

		function calcluatePendingLeads(selectedOption){
			var totalVendorsLeadSum=0;
			var excludedIndex=[];
			excludedIndex.push(self.selectedVendorsList.indexOf(selectedOption));
			var completedVendors=self.selectedVendorsList.filter(t=>t.vendorOrderStage=='VENDOR_UNASSIGNED');

			for (var i = 0; i < completedVendors.length; i++) {
				excludedIndex.push(self.selectedVendorsList.indexOf(completedVendors[i]));
			}
			for(var i=0;i<self.selectedVendorsList.length;i++){
				if(excludedIndex.indexOf(i)==-1)
					totalVendorsLeadSum+=self.selectedVendorsList[i].noOfLead;
			}
			var t= self.totalLeadsOfOrder - totalVendorsLeadSum;
			return t <  0 ? self.totalLeadsOfOrder: t;
		}

		function populateTr(selectedOption) {

			var tr = document.createElement("tr");

			var noOfLeadTd=initializeNoOfLeadTd(selectedOption);
			var deliveryMethodTd=initializeDeliveryMethodTd(selectedOption,$(noOfLeadTd).find('input')[0]);
			var costPerLeadTd=initializeCostPerLeadTd(selectedOption);
			var statusTd=initializeStatusTd(selectedOption);
			var ecmTd=initializeEcmTd(selectedOption);
			var optionTd=initializeOptionTd(selectedOption);

			tr.appendChild(deliveryMethodTd);
			tr.appendChild(noOfLeadTd);
			tr.appendChild(costPerLeadTd);
			tr.appendChild(statusTd);
			tr.appendChild(ecmTd);
			tr.appendChild(optionTd);

			$(tr).attr('data-orderId', selectedOption.order_id);

			return tr;
		}
		
		function initializeEcmTd(selectedOption){
			var ecmTd = document.createElement("td");
			var checkBox = document.createElement("input");
			checkBox.type =  "checkbox";
			checkBox.className = "form-control form-control-sm";
			checkBox.style.height='23px';
			checkBox.checked=selectedOption.verifyEmail;
			$(checkBox).on('change', function(e) {
				selectedOption.verifyEmail=this.checked;
				if (selectedOption.status != 'NEW') {
					selectedOption.status = 'UPDATED';
					confirmprocessing(selectedOption);
				}
			});
			ecmTd.appendChild(checkBox);
			return ecmTd;
		}
		
		function confirmprocessing(selectedOption){
			$.confirm({
				'message'	: 'Changing the value will reprocess all client uploaded leads as per the current workorder criteria. Do you want to reprocess ?',
				'buttons'	: {
					'<span class="fa fa-check fa-2x" aria-hidden="true"></span> Yes reprocess now.'	: {
						'class'	: 'yes',
						'action': function(){
							selectedOption.processCurrentLead=true;
						}
					},
					'<span class="fa fa-times fa-2x" aria-hidden="true"></span>  No wait for future uploads.'	: {
						'class'	: 'no',
						'action': function(){
							selectedOption.processCurrentLead=false;
						}
					}
				}
			});
		}


		function initializeCurrencyOptionElem(selectedOption){
			
			var dropdownDiv= document.createElement("div");
			dropdownDiv.className='dropdown';

			var btn= document.createElement("button");
			btn.className='btn btn-xs btn-default dropdown-toggle';
			btn.setAttribute('data-toggle','dropdown');
			btn.setAttribute('data-flip','false');
			var span= document.createElement("span");
			span.className='caret';
			span.innerHTML=currencyCodeMap[selectedOption.assignedCurrency] ? currencyCodeMap[selectedOption.assignedCurrency]:'';

			btn.appendChild(span);
			btn.style.height='100%';
			btn.style.minWidth='37px';
			dropdownDiv.appendChild(btn);
			
			
			var dropdownMenuDiv= document.createElement("ul");
			dropdownMenuDiv.className='dropdown-menu';
			dropdownMenuDiv.style.minWidth='1rem';
			
			Object.keys(currencyCodeMap).forEach(function(entry) {
				var a=document.createElement('a');
				a.setAttribute('data-currency-code',entry);
				a.className='dropdown-item';
				a.innerHTML=currencyCodeMap[entry]+'-'+entry;
				a.addEventListener("click", function(){
					selectedOption.assignedCurrency=this.getAttribute('data-currency-code');
					span.innerHTML=this.innerText.replace("-"+this.getAttribute('data-currency-code'), "");
					if (selectedOption.status != 'NEW') {
						selectedOption.status = 'UPDATED';
					}
				});
				dropdownMenuDiv.appendChild(a);
			});
			
			dropdownDiv.appendChild(dropdownMenuDiv);
			return dropdownDiv;
			
			
			/*

			var selectElem = document.createElement('select');
			selectElem.className = "form-control form-control-sm";

			Object.keys(currencyCodeMap).forEach(function(entry) {
				var optionElem = document.createElement('option');
				optionElem.value = entry
				optionElem.textContent = currencyCodeMap[entry];
				selectElem.appendChild(optionElem);
			});
			
			if(selectedOption.vendorId){
				selectElem.value=selectedOption.assignedCurrency;
			}
			
			$(selectElem).on('change', function(e) {
				var before_change = $(this).data('pre');
				if(!selectedOption.vendorId){
					this.value=before_change;
					showMessage("Choose delivery method",this);
				}else {
					var optionSelected = $("option:selected", this);
					selectedOption.assignedCurrency=optionSelected.val();
					if (selectedOption.status != 'NEW') {
						selectedOption.status = 'UPDATED';
					}
				}
			});

			return selectElem;*/
		}

		function initializeDeliveryMethodTd(selectedOption,leadinput){

			var selectTd = document.createElement("td");
			var selectElem = document.createElement('select');
			selectElem.className = "form-control form-control-sm";
			if(selectedOption.vendorOrderStage)
				selectElem.disabled=true;
			var optionElem = document.createElement('option');
			optionElem.value = optionElem.textContent = '';
			selectElem.appendChild(optionElem);
			var vendorIds = self.selectedVendorsList.map( t=> t.vendorId);

			var tempList=[];

			for(var i=0;i<validVendorsList.length;i++){
				if(vendorIds.indexOf(validVendorsList[i].vendorId) > -1 &&  selectedOption.vendorId==validVendorsList[i].vendorId){
					tempList.push(validVendorsList[i]);
				}
				if(vendorIds.indexOf(validVendorsList[i].vendorId) == -1){
					tempList.push(validVendorsList[i]);
				}
			}

			for (var j = 0; j < tempList.length; j++) {
				optionElem = document.createElement('option');
				$(optionElem).attr('data-vendorId',	tempList[j].vendorId);
				var option = tempList[j].vendorName;
				optionElem.value = optionElem.textContent = option;
				selectElem.appendChild(optionElem);
				if (selectedOption
						&& selectedOption.vendorId == tempList[j].vendorId) {
					selectElem.value = tempList[j].vendorName;
				}
			}

			$(selectElem).on('change', function(e) {

				var optionSelected = $("option:selected", this);
				var noOfLeadPending=calcluatePendingLeads(selectedOption);
				//if(!selectedOption.noOfLead){
				leadinput.value=noOfLeadPending
				selectedOption.noOfLead=noOfLeadPending;
				//}
				var valueSelected = this.value;
				if (selectedOption.status != 'NEW') {
					selectedOption.status = 'UPDATED';
				}
				selectedOption.vendorId = parseInt(optionSelected.attr('data-vendorid'));
				if(self.selectedVendorsList.indexOf(selectedOption) == -1 && leadinput.value > 0 && leadinput.value <= noOfLeadPending)
					self.selectedVendorsList.push(selectedOption);

			});

			selectTd.appendChild(selectElem);

			return selectTd;

		}

		function initializeNoOfLeadTd(selectedOption){

			var noOfLeadtd = document.createElement("td");
			var leadinput = document.createElement("input");
			leadinput.className = "form-control form-control-sm";
			leadinput.type =  "number";
			leadinput.min="1";
			leadinput.step="1";
			leadinput.onkeypress= function (){
				return event.charCode >= 48 && event.charCode <= 57;
			};
			if(selectedOption.vendorOrderStage=='VENDOR_UNASSIGNED'){
				$(leadinput).attr('disabled',true);
			}
			leadinput.value = selectedOption ? selectedOption.noOfLead : null;
			$(leadinput).on('change', function(e) {
				var valueSelected =  parseInt(this.value);
				selectedOption.noOfLead = valueSelected;
				var noOfLeadPending=calcluatePendingLeads(selectedOption);
				if(	valueSelected > noOfLeadPending){
					valueSelected = noOfLeadPending
					this.value=valueSelected;
					selectedOption.noOfLead = parseInt(valueSelected);
				}
				if (selectedOption.status != 'NEW') {
					selectedOption.status = 'UPDATED';
				}
			});
			noOfLeadtd.appendChild(leadinput);

			return noOfLeadtd;
		}

		function initializeCostPerLeadTd(selectedOption){

			var costOfLeadtd = document.createElement("td");
			costOfLeadtd.className='popup centre';

			var divCost = document.createElement("div");
			divCost.className = "input-group input-group-sm";


			var currencyOptionElem = initializeCurrencyOptionElem(selectedOption);
			divCost.appendChild(currencyOptionElem);


			var costinput = document.createElement("input");
			costinput.type = "number";
			costinput.step="0.01";
			costinput.min="0.00" ; costinput.max="10000.00" 
				costinput.className = 'form-control';
			costinput.value = selectedOption ? selectedOption.costPerLead
					: null;
			if(selectedOption.vendorOrderStage=='VENDOR_UNASSIGNED'){
				$(costinput).attr('disabled',true);
			}
			$(costinput).on('change', function(e) {
				var valueSelected = this.value;
				if (selectedOption.status != 'NEW') {
					selectedOption.status = 'UPDATED';
				}
				selectedOption.costPerLead = valueSelected;
			});
			divCost.appendChild(costinput);

			costOfLeadtd.appendChild(divCost);

			return costOfLeadtd;
		}

		function initializeStatusTd(selectedOption){

			var statusTd = document.createElement("td");

			var dropdownDiv= document.createElement("div");
			dropdownDiv.className='dropdown';

			var btn= document.createElement("button");
			if(!selectedOption.vendorOrderStage){
				btn.disabled=true;
			}
			btn.className='btn btn-xs btn-primary dropdown-toggle';
			btn.setAttribute('data-toggle','dropdown');
			btn.setAttribute('data-flip','false');
			var span= document.createElement("span");
			span.className='caret';
			span.innerHTML=validStatusList[selectedOption.vendorOrderStage] ? validStatusList[selectedOption.vendorOrderStage] : 'New';

			btn.appendChild(span);

			dropdownDiv.appendChild(btn);

			var dropdownMenuDiv= document.createElement("ul");
			dropdownMenuDiv.className='dropdown-menu';
			var keys=Object.keys(validStatusList);
			for(var i=0;i<keys.length;i++){
				if(keys[i]=='VENDOR_PENDING' || keys[i]=='VENDOR_UNASSIGNED' || keys[i]==selectedOption.vendorOrderStage){
					var a=document.createElement('a');
					var val=keys[i];
					a.setAttribute('data-key',val);
					a.setAttribute('href','#');
					a.className=(val==selectedOption.vendorOrderStage ? 'dropdown-item disabled' : 'dropdown-item');
					a.innerHTML=validStatusList[val];
					a.addEventListener("click", function(){
						span.innerHTML=this.innerText;
						selectedOption.vendorOrderStage=this.getAttribute('data-key');
						if (selectedOption.status != 'NEW') {
							selectedOption.status = 'UPDATED';
						}
						if(selectedOption.vendorOrderStage!='VENDOR_UNASSIGNED')
							$(dropdownDiv).parent().parent().find('select').trigger('change');
						if(this.getAttribute('data-key')=='VENDOR_UNASSIGNED'){
							$(dropdownDiv).parent().parent().find('input').attr('disabled',true);
						}else{
							$(dropdownDiv).parent().parent().find('input').removeAttr('disabled');
						}
					});
					dropdownMenuDiv.appendChild(a);
				}
			}

			dropdownDiv.appendChild(dropdownMenuDiv);
			statusTd.appendChild(dropdownDiv);

			return statusTd;
		}

		function initializeOptionTd(selectedOption){

			var optionTd = document.createElement("td");
			optionTd.className="popup centre" ;
			var button = document.createElement("button");
			var i = document.createElement("i");

			button.className = selectedOption.btnSclass;
			i.className = selectedOption.iSclass;
			if(selectedOption.vendorOrderStage)
				button.disabled=true;

			button.addEventListener("click", function(event) {
				if ($(i).hasClass('fa fa-plus')) {
					if(validate(selectedOption,this)){
						selectedOption.iSclass='fa fa-trash';
						selectedOption.btnSclass='btn btn-xs btn-danger';
						var vendorOrder = new VendorOrder();
						vendorOrder.iSclass='fa fa-plus';
						vendorOrder.btnSclass='btn btn-xs btn-success ';
						self.selectedVendorsList.push(vendorOrder);
						populate() ;
					}
				} else {
					self.selectedVendorsList.splice(self.selectedVendorsList.indexOf(selectedOption), 1);
					populate() ;
				}

				event.stopPropagation();
				event.preventDefault();
			});

			button.appendChild(i);
			optionTd.appendChild(button);
			return optionTd;
		}

		function validate(selectedOption,btn){
			if(!selectedOption.vendorId){
				showMessage("Choose delivery method",btn);
				return false;
			}

			if(!selectedOption.noOfLead){
				showMessage("No of lead is empty",btn);
				return false;
			}

			if(!selectedOption.costPerLead){
				showMessage("Cost per lead is empty",btn);
				return false;
			}

			if(calcluatePendingLeads(null)==0){
				showMessage("All leads assigned.",btn);
				return false;
			}

			return true;
		}

		function showMessage(msg,btn){
			var span=document.createElement("span");
			span.className='popuptext show';
			span.innerHTML=msg;
			$(btn).after(span);
			setTimeout(function(){ $(span).hide('slow', function(){ $(span).remove(); }); }, 2500);

		}

		function option(key, val) {
			if (val) {
				options[key] = val;
			} else {
				return options[key];
			}
		}


		init();


		return self;
	}

	$.fn[pluginName] = function(options) {
		if (typeof arguments[0] === 'string') {
			var methodName = arguments[0];
			var args = Array.prototype.slice.call(arguments, 1);
			var returnVal;
			this.each(function() {
				if ($.data(this, pluginName) && typeof $.data(this, pluginName)[methodName] === 'function') {
					returnVal = $.data(this, pluginName)[methodName].apply(this, args);
				} else {
					throw new Error('Method ' + methodName	+ ' does not exist on jQuery.' + pluginName);
				}
			});
			if (returnVal !== undefined) {
				return returnVal;
			} else {
				return this;
			}
		} else if (typeof options === "object" || !options) {
			return this.each(function() {
				if (!$.data(this, pluginName)) {
					$.data(this, pluginName, new Plugin(this, options));
				}
			});
		}
	};

	$.fn[pluginName].defaults = {
			onInit : function() {},
			onDestroy : function() {}
	};

})(window, jQuery);