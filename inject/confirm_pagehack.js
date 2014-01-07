if (jQuery.validator.methods.checkRandCode ) {
	jQuery.validator.methods.checkRandCode = function (myc, leafb, leafd) {
		if (myc && myc.length == 4) {
			$("#i-ok").css("display", "block")
			return true;
		} else {
			return false;
		}
	};
}

var _leaf_prevRandCodeVal;

$("#randCode").unbind("keyup");
$("#randCode").on("keyup", function (an) {
    an = an || window.event;
    if ($("#randCode").val().length == 4 && _leaf_prevRandCodeVal != $("#randCode").val()) {
	    _leaf_prevRandCodeVal = $("#randCode").val()
	    submitOrderClickEvent();
	    $("#randCode").removeClass("error");
	    $("#randCodeErrorNotice_id").hide();
	    $("#i-ok").css("display", "block");
	    return;
    }
    _leaf_prevRandCodeVal = $("#randCode").val()
});


