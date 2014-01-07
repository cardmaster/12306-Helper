var _leaf_prevRandCodeVal;
var _leaf_passengerInfo = [];
var _leaf_inputFieldIds = ['passenger_name', 
	'passenger_id_type', 
	'passenger_id_no', 
	'phone_no', 
];

function _leaf_inputFieldById(idx, filedidx)
{
	return '#' + _leaf_inputFieldIds[filedidx] + '_' + idx;
}

function _leaf_collectPassengerInfo()
{
	var i = 0;
	var new_passengerInfo = [];
	while(true){
		i = i + 1;
		if (! $(_leaf_inputFieldById(i, 0)).length) break;
		var passengerRow = [];
		for (var j = 0; j < 4; ++j) {
			passengerRow[j] = $(_leaf_inputFieldById(i, j)).val();
		}
		new_passengerInfo[i - 1] = passengerRow;
	}
	_leaf_passengerInfo = new_passengerInfo;
	chrome.extension.sendRequest({what:"savePassengers", passengers: JSON.stringify(_leaf_passengerInfo)}, function() {
		//do nothing;
	});
}

function _leaf_loadPassengerInfo()
{
	chrome.extension.sendRequest({what:'passengers'}, function(resp) {
		var passList = JSON.parse(resp.passengers);
		for (var i = 1; i <= passList.length; ++i) {
			if (i > 1) {
				$('div.add-per span').click();
			}
			var passItem = passList[i - 1];
			for (var j = 0; j < passItem.length; ++j) {
				var targetInput = $(_leaf_inputFieldById(i, j));
				targetInput.val(passItem[j]);
			}
		}
	});
}

function pagehack()
{
	var randCodeInput = $("#randCode");
	randCodeInput.focus();

	var randimg = $("#img_rand_code");
	randimg.css("margin-top", "-40px");
	randimg.css("margin-left", "163px");
	randimg.css("height", "80px");
	randimg.css("width", "300px");

	injectJs('inject/confirm_pagehack.js');

	$("#randCode").keyup( function (an) {
	    an = an || window.event;
	    if ($("#randCode").val().length == 4 && _leaf_prevRandCodeVal != $("#randCode").val()) {
		    _leaf_prevRandCodeVal = $("#randCode").val()
		    _leaf_collectPassengerInfo();
		    return;
	    }
	    _leaf_prevRandCodeVal = $("#randCode").val()
	});

	_leaf_loadPassengerInfo();
}

pagehack();




