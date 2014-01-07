var _leaf_prevRandVal;

function _leaf__leaf_S() {}

function _leaf_GetStudentType() {
    if ($("#sf2").is(":checked")) {
        return "0X00"
    } else {
        return "ADULT"
    }
}

function _leaf_S(b1, bY, bV, bU, bX) {
    window.alert(b1);
}

function _leaf_bQ() {
    $.ajax({
        url: ctx + "confirmPassenger/confirmSingle",
        type: "post",
        data: {
            passengerTicketStr: getpassengerTicketsForAutoSubmit(),
            oldPassengerStr: getOldPassengersForAutoSubmit(),
            tour_flag: "dc",
            randCode: $("#randCode").val(),
            purpose_codes: _leaf_GetStudentType(),
            key_check_isChange: md5Str,
            train_location: location_code
        },
        dataType: "json",
        async: true,
        success: function (bR) {
            if (bR.status) {
                if (bR.data.submitStatus) {
                    otsRedirect("post", ctx + "payOrder/init?random=" + new Date().getTime(), {})
                    return;
                } else {
                    _leaf_S("出票失败!", false, "原因： " + bR.data.errMsg + '<a  id="xg_close_win_id">点击修改</a>', true, "lose");
                }
            } else {
                _leaf_S("订票失败!", true, "很抱歉！请关闭窗口重新预定车票", true, "lose")
            }
        },
        error: function (bR, bT, bS) {
            _leaf_S("订票失败!", true, "很抱歉！网络忙，请关闭窗口稍后再试。", true, "lose");
            return
        }
    })
}

function _leaf_n() {
    $.ajax({
        url: ctx + "confirmPassenger/confirmSingleForQueueAsys",
        type: "post",
        data: {
            passengerTicketStr: getpassengerTicketsForAutoSubmit(),
            oldPassengerStr: getOldPassengersForAutoSubmit(),
            randCode: $("#randCode").val(),
            purpose_codes: _leaf_GetStudentType(),
            key_check_isChange: md5Str,
            leftTicketStr: leftTicketStr,
            train_location: location_code
        },
        dataType: "json",
        async: true,
        success: function (bR) {
            $("#i-ok").css("display", "none");
            $("#i-ok2").css("display", "none");
            $("#c_error2").html("");
            $("#c_error2").removeClass("error");
            $("#randCode2").val("");
            if (bR.status) {
                if (!bR.data.submitStatus) {
                    _leaf_S("出票失败!", false, "原因： " + bR.data.errMsg + '<a id="xg_close_win_id" >点击修改</a>', true, "lose");
                } else {
                    otsRedirect("post", ctx + "payOrder/init?random=" + new Date().getTime(), {})
                }
            } else {
                _leaf_S("订票失败!", true, "很抱歉！请关闭窗口重新预定车票", true, "lose")
            }
        },
        error: function (bR, bT, bS) {
            _leaf_S("订票失败!", true, "很抱歉！网络忙，请关闭窗口稍后再试。", true, "lose");
            return
        }
    })
}

$("#randCode2").unbind('keyup');
$("#randCode2").on('keyup', function () {
    if ($("#randCode2").val().length == 4 && _leaf_prevRandVal != $("#randCode2").val()) {
        _leaf_prevRandVal = $("#randCode2").val();

        $("#back_edit").trigger("click");
        if (isAsync == ticket_submit_order.request_flag.isAsync) {
            _leaf_n();
        } else {
            _leaf_bQ();
        }
        $("#randCode2").removeClass("inptxt w100 error").addClass("inptxt w100");
        $("#i-ok2").css("display", "block");
        $("#c_error2").html("");
        $("#c_error2").removeClass("error");

        return;
    }
    _leaf_prevRandVal = $('#randCode2').val();
});
