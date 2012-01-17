
/*+ hidden data generator*/

// serialize all passenger information into a single string
function generatePassengerData(id) {
	var value = $("#" + id + "_seat").val();

	/* We default use not save contacts, so just skip this
	if ($("#" + id + "_isSave")[0].checked) {
		//不改签的不用验证"改签时，必须选择相同席别"
		_seat_codes.push( $("#" + id + "_seat").val());
	}
	*/
	
	//some fancy information
	value += "," + $("#" + id + "_ticket").val(); //ticket count
	value += "," + $("#" + id + "_name").val(); //passenger name
	value += "," + $("#" + id + "_cardtype").val(); //passenger id card type
	value += "," + $("#" + id + "_cardno").val(); //passenger id card number (ID)
	value += "," + $("#" + id + "_mobileno").val(); //phone
	//check if save person info for future use, I think 'N' will save some time for server
	value += ",N";
	/* original code: get from form
	if ($("#" + id + "_isSave")[0].checked) {
		value += "," + $("#" + id + "_isSave").val();
	} else {
		value += ",N";
	}
	*/
	$("#" + id + "_p").val(value);
}

//Fill some god damn hidden areas
function toPassengerStringSplit(passenger) {
	var pValue = passenger.passenger_name + ","
		+ passenger.passenger_id_type_code + ","
		+ passenger.passenger_id_no;
	return pValue;
};

//it seems this hidden field is for back-capbility, we provide it either
function generateOldPassengerData(id) {
	var passenger = $("#" + id).data("passenger");
	if (passenger) {
		$("#" + id + "_old").val(toPassengerStringSplit(passenger));
	}
}

function generateHiddenDataForPassenger(id){
	generatePassengerData(id);
	generateOldPassengerData(id);
}

/*- hidden data generator*/

//there are some hidden areas needs to be fixed, e.g. #seat_type_code
function quickSubmitOrder()
{
	$(".passenger_class").each(function() {
		var id = $(this).attr("id");
		generateHiddenDataForPassenger(id);
	});
	$("#confirmPassenger").target = "_self";
	$("#confirmPassenger").submit();
}

//add the on-board-date by 1, this may be useful for rob the ticket by a accurate clock
//param add is the number of days you want to add
//this will modify all visible and hidden field of the order form
function incOrderDate(add)
{
	alert ("This is not ready!!!");
}

//$("input:checkbox", $("#showPassengerFilter")).click();

var buttonStyle="height: 30px; background: none; background-color: #9EF; border: 4px solid #BBB; line-height: 22px; font-size: 14px; padding-left:3px; padding-right:3px; margin-right: 10px; cursor:pointer;";

$("<div/>").attr("style", "margin-right:20px; height:30px; padding:4px; float:right; width:500px; background-color:#EF9").append(
	$("<button/>", {text:"Quick Submit", style: buttonStyle}).click(function(){
		quickSubmitOrder();
	})
).append(
	$("<button/>", {text: "Hack: Order Next Day", style:buttonStyle}).click(function(){
		incOrderDate(1);
		quickSubmitOrder();
	})
).appendTo( $("#rand").parent() );

function refreshCapachaImage() {
	$("#img_rrand_code").attr("src","/otsweb/passCodeAction.do?rand=randp"+'&'+Math.random());
}
$("#rand").keydown(function (keyevent) {
	if (keyevent.keyCode == 13) {
		var randCode = $("#rand").val();
		if (randCode && randCode.length == 4) {
			quickSubmitOrder();
		} else {
			//refresh random code
			console.log ("refresh random code when input is empty");
			refreshCapachaImage();
		}
		return false;
	}
});

$("#img_rrand_code").attr("src", chrome.extension.getURL("loading.gif"));
window.setTimeout(refreshCapachaImage, 1);
$("#rand").val("");
$("#rand").focus();



