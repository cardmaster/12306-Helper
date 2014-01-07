console.log ("Processing Login");
//do the login optimization
var qlUsername = "";
var qlPassword = "";

function notEmptyAndNotEqu(val1, oldval) {
	if (val1 && val1 != undefined) {
		return val1 != oldval;
	}
	return false;
}

function notEmptyVal (val) {
	if (val && val != undefined) {
		return val;
	} else {
		return false;
	}
}

function quickLogin()
{
	var inputName = notEmptyVal($("#username").attr("value"));
	var inputPass = notEmptyVal($("#password").attr("value"));
	if (inputName && inputPass) {//if both filed not empty, means user have some input, keep this
		if (inputName != qlUsername || inputPass != qlPassword) {
			var loginsToSave = {username: inputName, password: inputPass};
			chrome.extension.sendRequest({what:"saveLogins", logins: loginsToSave},
			function(){
				qlUsername = inputName;
				qlPassword = inputPass;
			});
		}
	} else {
		if (qlUsername) $("#username").attr("value", qlUsername);
		if (qlPassword) $("#username").attr("value", qlPassword);
	}
	injectJs('inject/login_dosubmit.js');
}

function pagehack()
{

	$("<div/>").attr("style", "position:fixed;left:0;top:0;z-index:999;text-align:center").append(
		$("<button/>").attr("id", "refreshButton")
		.attr("style", "height:40px; width:500px; font-size:24px;")
		.text("Quick Login (Press Enter)")
		.click(function() {
			quickLogin();
		})
	).appendTo(document.body);

	chrome.extension.sendRequest ({what:"logins"}, function(logins) {
	//in here, will load and set form values
		qlUsername = logins.username;
		qlPassword = logins.password;
		$("#username").attr("value", qlUsername);
		$("#password").attr("value", qlPassword);
	});

	var randCodeInput = $("#randCode");

	$("#randCode").keydown(function (keyevent) {
		if (keyevent.keyCode == 13) {
			var randCode = $("#randCode").val();
			if (randCode && randCode.length == 4) {
				quickLogin();
			}
			return false;
		}
	});

	$("#randCode").focus();
	randCodeInput.keyup(function(e) {
		//do nothing
		disabledEventPropagation(e); 
	});

	var randimg = $("#img_rand_code");
	randimg.css("margin-left", "100px");
	randimg.css("height", "80px");
	randimg.css("width", "300px");

	injectJs('inject/login_pagehack.js');
}

pagehack();



