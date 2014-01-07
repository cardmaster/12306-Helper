

function _leaf_doLogin_full()
{
    $("#error_msg").removeClass("error");
    $("#error_msg").html("");
    var h = dhtmlx.modalbox({
	targSrc: '<div style="z-index: 20000; position: fixed; left: 750.5px; top: 237px;"><img src="' + ctx + 'resources/images/loading.gif"></img></div>'
    });
 
    $("#loginForm").ajaxSubmit({
	url: ctx + "login/loginAysnSuggest",
	type: "post",
	async: false,
	success: function (e) {
	    if (e.status) {
		if (e.data.loginCheck == "Y") {
                    window.location.href = ( ctx + "leftTicket/init");
//		    $.submitLogin();
		} else {
		    if ("Y" == openRandCodeCheck) {
			refreshImg("login", "sjrand");
			$("#randCode").val("")
		    }
		    dhtmlx.modalbox.hide(h);
		    $("#password").val("");
		    return false;
		}
	    }
	}
    })
}
 

jQuery.extend({
        checkRandCode: function () {
		return true;	
	},

        loginClick: function () {
		var loginBtn = $("#loginSub");
            	loginBtn.unbind('click');
            	loginBtn.on("click", function (g) {
			_leaf_doLogin_full();
		});

	}
});


$.loginClick();

