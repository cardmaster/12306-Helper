    function n() {
        $.ajax({
            url: ctx + "confirmPassenger/confirmSingleForQueueAsys",
            type: "post",
            data: {
                passengerTicketStr: getpassengerTicketsForAutoSubmit(),
                oldPassengerStr: getOldPassengersForAutoSubmit(),
                randCode: bb,
                purpose_codes: bO(),
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
                        S("出票失败!", false, "原因： " + bR.data.errMsg + '<a id="xg_close_win_id" >点击修改</a>', true, "lose");
                        $("#xg_close_win_id").click(function () {
                            U("transforNotice_id", true)
                        })
                    } else {
                        var bS = new OrderQueueWaitTime("dc", aa, o);
                        bS.start()
                    }
                } else {
                    S("订票失败!", true, "很抱歉！请关闭窗口重新预定车票", true, "lose")
                }
            },
            error: function (bR, bT, bS) {
                S("订票失败!", true, "很抱歉！网络忙，请关闭窗口稍后再试。", true, "lose");
                return
            }
        })
    }