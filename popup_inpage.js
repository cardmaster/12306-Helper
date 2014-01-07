	//load saved user && password
	chrome.extension.sendRequest ({what: "logins"}, function(logins) {
		$("#username").attr("value", logins.username);
		$("#password").attr("value", logins.password);
	});
	$("#saveLoginsButton").click(function(){
		var loginsToSave = {username: $("#username").attr("value"), password: $("#password").attr("value")};
		chrome.extension.sendRequest({what:"saveLogins", logins: loginsToSave}, function(resp){
			$("#passSaveText").attr("style", "color:#0F8;").text("Saved !");
			window.open("https://kyfw.12306.cn/otn/login/init");
		});
		return false;
	});

