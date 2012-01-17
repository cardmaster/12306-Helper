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
	var inputName = notEmptyVal($("#UserName").attr("value"));
	var inputPass = notEmptyVal($("#password").attr("value"));
	if (inputName && inputPass) {//if both filed not empty, means user have some input, keep this
		if (inputName != qlUsername || inputPass != qlPassword) {
			var loginsToSave = {username: inputName, password: inputPass};
			chrome.extension.sendResponse({what:"saveLogins", logins: loginsToSave},
			function(){
				qlUsername = inputName;
				qlPassword = inputPass;
			});
		}
	} else {
		if (qlUsername) $("#UserName").attr("value", qlUsername);
		if (qlPassword) $("#UserName").attr("value", qlPassword);
	}
	document.getElementById("loginForm").submit();
}

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
	$("#UserName").attr("value", qlUsername);
	$("#password").attr("value", qlPassword);
});

$("#randCode").keydown(function (keyevent) {
	if (keyevent.keyCode == 13) {
		var randCode = $("#randCode").val();
		if (randCode && randCode.length == 4) {
			quickLogin();
		} else {
			//refresh random code
			console.log ("refresh random code when input is empty");
			$("#img_rrand_code").attr("src","/otsweb/passCodeAction.do?rand=randp"+'&'+Math.random());
		}
		return false;
	}
});

$("#randCode").focus();

