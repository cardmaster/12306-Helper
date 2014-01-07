(function (x) {
    jQuery.extend({
        ht_getcookie: function (O) {
            var N = document.cookie.indexOf(O);
            var M = document.cookie.indexOf(";", N);
            return N == -1 ? "" : unescape(document.cookie.substring(N + O.length + 1, (M > N ? M : document.cookie.length)))
        },
        ht_setcookie: function (S, R, Q, P, N, O) {
            var M = new Date();
            M.setTime(M.getTime() + Q * 1000);
            document.cookie = escape(S) + "=" + escape(R) + (M ? "; expires=" + M.toGMTString() : "") + (P ? "; path=" + P : "; path=/") + (N ? "; domain=" + N : "") + (O ? "; secure" : "")
        },
        textFocus: function (O) {
            var N, M, O = O === undefined ? 0 : parseInt(O);
            this.each(function () {
                if (!this.setSelectionRange) {
                    N = this.createTextRange();
                    O === 0 ? N.collapse(false) : N.move("character", O);
                    N.select()
                } else {
                    M = this.value.length;
                    O === 0 ? this.setSelectionRange(M, M) : this.setSelectionRange(O, O)
                }
                this.focus()
            });
            return this
        }
    });
    var s = [];
    var y = [];
    var z = [];
    var A = [];
    var r = 0;
    var t = 0;
    var v = 0;
    var J = 0;
    var K = false;
    var f = false;
    var B = false;
    var u = 0;
    var C = null;
    var i = -1;
    var e = [];
    var d = [];
    var c = [];
    var b = [];
    var L = [];
    var p = [];
    var o = [];
    var m = [];
    var l = [];
    var k = [];
    var E = [];
    var a = false;
    var F = true;
    var q = 30;
    var g = "简码/汉字";
    var j = "简码/汉字";
    var n = "inp-txt_select";
    var h = "inp-txt";
    var w = false;
    var D = null;
    var I = null;
    var G = false;
    var H = x.ht_getcookie("hj_favcity");
    x.stationFor12306 = {
        bindInputs: [],
        get_initInputValue: function () {
            return g
        },
        get_initTopInputValue: function () {
            return j
        },
        city_Bind: function (N) {
            if (N.length == 0) {
                return
            }
            var M = "";
            x.each(N, function (O) {
                if (H == N[O][2]) {
                    M += "<div class='cityline' id='citem_" + O + "' cturn='" + N[O][6] + "'><span class='ralign'><b>" + N[O][1] + "</b></span></div>\n"
                } else {
                    M += "<div class='cityline' id='citem_" + O + "' cturn='" + N[O][6] + "'><span class='ralign'>" + N[O][1] + "</span></div>\n"
                }
            });
            x("#panel_cities").html(M);
            x(".cityline").mouseover(function () {
                x.stationFor12306.city_shiftSelect(this)
            }).click(function () {
                x.stationFor12306.city_confirmSelect();
                z = x.stationFor12306.filterCity("");
                x.stationFor12306.city_showlist(0)
            });
            x.stationFor12306.city_shiftSelect(x("#citem_0"))
        },
        city_changeSelectIndex: function (M) {
            var N = v + M;
            if (N == -1) {
                x.stationFor12306.city_showlist(u - 1);
                x.stationFor12306.city_shiftSelect(x("#citem_" + (A.length - 1)))
            } else {
                if (N == A.length) {
                    x.stationFor12306.city_showlist(u + 1);
                    x.stationFor12306.city_shiftSelect(x("#citem_0"))
                } else {
                    x.stationFor12306.city_shiftSelect(x("#citem_" + N))
                }
            }
        },
        city_confirmSelect: function () {
            C.val(J[1]);
            curObjCode.val(J[2]);
            if (w) {
                x.stationFor12306.setStationInCookies(J[1], J[2])
            }
            x("#form_cities").css("display", "none");
            x("#form_cities2").css("display", "none");
            x("#form_cities3").css("display", "none");
            i = -1;
            t = 0;
            x.stationFor12306.setStationStyle();
            if (F) {
                x.stationFor12306.LoadJS(J[2])
            }
            if (D) {
                D(C, curObjCode)
            }
        },
        city_shiftSelect: function (N) {
            if (r != N) {
                if (r != 0) {
                    x(r).removeClass("citylineover").addClass("cityline").css("backgroundColor", "white")
                }
                if (N != 0) {
                    try {
                        r = N;
                        var M = x(r).removeClass("cityline").addClass("citylineover").css("backgroundColor", "#c8e3fc");
                        v = Number(M.attr("id").split("_")[1]);
                        J = s[Number(M.attr("cturn"))];
                        x("#cityid").val(J[2])
                    } catch (O) {}
                }
            }
        },
        city_shiftSelectInLi: function (M) {
            if (t != M) {
                if (t != 0) {
                    x(t).removeClass("ac_over").addClass("ac_odd")
                }
                if (M != 0) {
                    try {
                        t = M;
                        x(t).removeClass("ac_odd").addClass("ac_over")
                    } catch (N) {}
                }
            }
        },
        js: function (N) {
            var M;
            for (M = 1; M <= 7; M++) {
                if (M == N) {
                    x("#ul_list" + M).css("display", "block");
                    x("#nav_list" + M).addClass("action");
                    if (M == 1 || M == 7) {
                        x("#flip_cities2").css("display", "none")
                    }
                    if (M > 1 && M < 7) {
                        var P = x.stationFor12306.tHtmlGetCityName(N - 1, -1, 0);
                        if (P > q) {
                            var O = Math.ceil((P + 1) / q);
                            if (O > 1) {
                                x.stationFor12306.pageDesigh(O, 0, M)
                            }
                            x("#flip_cities2").css("display", "block")
                        } else {
                            x("#flip_cities2").css("display", "none")
                        }
                    } else {
                        C.focus()
                    }
                } else {
                    x("#ul_list" + M).css("display", "none");
                    x("#nav_list" + M).removeClass("action")
                }
            }
            if (1 != N) {
                x(".ac_even").on("mouseover", function () {
                    x.stationFor12306.city_shiftSelectInLi(this)
                }).on("click", function () {
                    C.val(x(this).text());
                    curObjCode.val(x(this).attr("data"));
                    if (w) {
                        x.stationFor12306.setStationInCookies(x(this).text(), x(this).attr("data"))
                    }
                    x("#form_cities2").css("display", "none");
                    i = -1;
                    t = 0;
                    x.stationFor12306.setStationStyle();
                    if (F) {
                        x.stationFor12306.LoadJS(x(this).attr("data"))
                    }
                    if (D) {
                        D(C, curObjCode)
                    }
                })
            }
        },
        tHtmlGetCityName: function (N, M, P) {
            switch (N) {
            case 0:
                if (M == -1) {
                    return y.length
                }
                if (M == -2) {
                    return y
                }
                return y[M];
                break;
            case 1:
                if (M == -1) {
                    return e.length
                }
                if (M == -2) {
                    return e
                }
                if (e.length > q) {
                    var O = Math.ceil((e.length + 1) / q);
                    if (O > 1) {
                        p = e.slice(q * (P), Math.min(q * (P + 1), e.length));
                        return p[M]
                    }
                }
                return e[M];
                break;
            case 2:
                if (M == -1) {
                    return d.length
                }
                if (M == -2) {
                    return d
                }
                if (d.length > q) {
                    var O = Math.ceil((d.length + 1) / q);
                    if (O > 1) {
                        o = d.slice(q * (P), Math.min(q * (P + 1), d.length));
                        return o[M]
                    }
                }
                return d[M];
                break;
            case 3:
                if (M == -1) {
                    return c.length
                }
                if (M == -2) {
                    return c
                }
                if (c.length > q) {
                    var O = Math.ceil((c.length + 1) / q);
                    if (O > 1) {
                        m = c.slice(q * (P), Math.min(q * (P + 1), c.length));
                        return m[M]
                    }
                }
                return c[M];
                break;
            case 4:
                if (M == -1) {
                    return b.length
                }
                if (M == -2) {
                    return b
                }
                if (b.length > q) {
                    var O = Math.ceil((b.length + 1) / q);
                    if (O > 1) {
                        l = b.slice(q * (P), Math.min(q * (P + 1), b.length));
                        return l[M]
                    }
                }
                return b[M];
                break;
            case 5:
                if (M == -1) {
                    return L.length
                }
                if (M == -2) {
                    return L
                }
                if (L.length > q) {
                    var O = Math.ceil((L.length + 1) / q);
                    if (O > 1) {
                        k = L.slice(q * (P), Math.min(q * (P + 1), L.length));
                        return k[M]
                    }
                }
                return L[M];
                break;
            default:
                return "error";
                break
            }
        },
        closeShowCity: function () {
            x("#form_cities2").css("display", "none");
            i = -1;
            t = 0;
            x.each(x.stationFor12306.bindInputs, function (Q, P) {
                var O = "#" + P;
                var N = "#" + P + "Text";
                var M = x(N).val();
                if ("" == M) {
                    x(N).val(g);
                    x.stationFor12306.from_to_station_class_gray(x(N));
                    x(O).val("")
                }
            })
        },
        showAllCity: function () {
            var T = "";
            var N = "342px";
            if (w) {
                N = "400px"
            }
            T = '<div class="com_hotresults" id="thetable" style="width:' + N + '"><div style="width:100%;"><div class="ac_title"><span>拼音支持首字母输入</span><a class="ac_close" style="cursor:pointer" title="关闭" onclick="$.stationFor12306.closeShowCity()"></a></div><ul class="AbcSearch clx" id="abc">';
            if (w) {
                T = T + '<li class="action" index="7" method="liHotTab"  onclick="$.stationFor12306.js(7)" id="nav_list7">常用</li>'
            }
            T = T + '<li index="1" method="liHotTab"  onclick="$.stationFor12306.js(1)" id="nav_list1">热门</li><li index="2" method="liHotTab"  onclick="$.stationFor12306.js(2)" id="nav_list2">A－E</li><li index="3" method="liHotTab"  onclick="$.stationFor12306.js(3)" id="nav_list3">F－J</li><li index="4" method="liHotTab"  onclick="$.stationFor12306.js(4)" id="nav_list4">K－O</li><li index="5" method="liHotTab"  onclick="$.stationFor12306.js(5)" id="nav_list5">P－T</li><li index="6" method="liHotTab"  onclick="$.stationFor12306.js(6)" id="nav_list6">U－Z</li></ul>';
            if (w) {
                T += '<ul class="popcitylist" style="overflow: auto;max-height: 280px;height: 191px;" method="hotData" id="ul_list7">';
                var U = x.stationFor12306.getStationInCookies();
                var Q = U.length;
                if (Q > 2) {
                    G = true;
                    for (var V = 0; V < Q; V++) {
                        T += '<li class="ac_even"   title="' + U[V][0] + '" data="' + U[V][1] + '">' + U[V][0] + "</li>"
                    }
                }
                T += "</ul>"
            }
            T += '<ul class="popcitylist" style="overflow: auto;max-height: 280px;height: 191px;display:none;" method="hotData" id="ul_list1">';
            var P = x.stationFor12306.tHtmlGetCityName(0, -1, 0);
            var S = "";
            if (!w) {
                S = " openLi"
            }
            for (var V = 0; V < P; V++) {
                T += '<li class="ac_even' + S + '"   title="' + x.stationFor12306.tHtmlGetCityName(0, V, 0)[1] + '" data="' + x.stationFor12306.tHtmlGetCityName(0, V, 0)[2] + '">' + x.stationFor12306.tHtmlGetCityName(0, V, 0)[1] + "</li>"
            }
            T += "</ul>";
            for (var W = 2; W <= 6; W++) {
                var R = W - 1;
                var M = x.stationFor12306.tHtmlGetCityName(R, -1, 0);
                if (M > q) {
                    var O = Math.ceil((M + 1) / q);
                    if (O > 1) {
                        T += '<ul  class="popcitylist" style="overflow: auto; max-height: 260px; height: 170px;display:none;" id="ul_list' + W + '">';
                        x.stationFor12306.pageDesigh(O, 0, W)
                    }
                    x("#flip_cities2").css("display", "block")
                } else {
                    T += '<ul  class="popcitylist" style="overflow: auto; max-height: 260px; height: 191px;display:none;" id="ul_list' + W + '">';
                    x("#flip_cities2").css("display", "none");
                    var S = "";
                    if (!w) {
                        S = " openLi"
                    }
                    for (var V = 0; V < x.stationFor12306.tHtmlGetCityName(R, -1, 0); V++) {
                        T += '<li class="ac_even' + S + '"   title="' + x.stationFor12306.tHtmlGetCityName(R, V, 0)[1] + '" data="' + x.stationFor12306.tHtmlGetCityName(R, V, 0)[2] + '">' + x.stationFor12306.tHtmlGetCityName(R, V, 0)[1] + "</li>"
                    }
                }
                T += "</ul>"
            }
            T += '<div id="flip_cities2"> 翻页控制区</div>';
            T += "</div>";
            x("#panel_cities2").html(T);
            x("#thetable").on("click", function () {
                if (x("#form_cities2").css("display") == "block") {
                    if (i == 1 | i == 0) {
                        i == -1
                    }
                    C.select()
                }
            });
            x("#form_cities").on("click", function () {
                if (x("#form_cities").css("display") == "block") {
                    if (i == 1 | i == 0) {
                        i == -1
                    }
                    C.select()
                }
            });
            x(".ac_even").on("mouseover", function () {
                x.stationFor12306.city_shiftSelectInLi(this)
            }).on("click", function () {
                C.val(x(this).text());
                curObjCode.val(x(this).attr("data"));
                if (w) {
                    x.stationFor12306.setStationInCookies(x(this).text(), x(this).attr("data"))
                }
                x("#form_cities2").css("display", "none");
                i = -1;
                t = 0;
                x.stationFor12306.setStationStyle();
                if (F) {
                    x.stationFor12306.LoadJS(x(this).attr("data"))
                }
                if (D) {
                    D(C, curObjCode)
                }
            });
            x("#flip_cities2").css("display", "none");
            return s
        },
        LoadJS: function (O) {
            if (((typeof (mm_addjs) != "undefined")) && ("" != mm_addjs) && (mm_addjs == 1)) {
                var N = document.getElementsByTagName("HEAD").item(0);
                var M = document.createElement("SCRIPT");
                M.src = mm_srcjs + O + ".js";
                M.type = "text/javascript";
                N.appendChild(M)
            }
        },
        pageDesigh: function (R, T, S) {
            var P = "";
            if (R > 1) {
                if (T == -1) {
                    T = (R - 1)
                } else {
                    if (T == R) {
                        T = 0
                    }
                }
                E = x.stationFor12306.tHtmlGetCityName(S - 1, -2, 0).slice(q * (T), Math.min(q * (T + 1), x.stationFor12306.tHtmlGetCityName(S - 1, -2, 0).length));
                var Q = "";
                if (!w) {
                    Q = " openLi"
                }
                for (var N = 0; N < E.length; N++) {
                    var O = E[N];
                    P += '<li class="ac_even' + Q + '"   title="' + O[1] + '" data="' + O[2] + '">' + O[1] + "</li>"
                }
                x("#ul_list" + S).html(P);
                var M = (T == 0) ? "&laquo;&nbsp;上一页" : "<a style='cursor:pointer'    class='cityflip' onclick='$.stationFor12306.pageDesigh(" + R + "," + (T - 1) + "," + S + ");return false;'>&laquo;&nbsp;上一页</a>";
                M += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;";
                M += (T == R - 1) ? "下一页&nbsp;&raquo;" : "<a style='cursor:pointer' class='cityflip'  onclick='$.stationFor12306.pageDesigh(" + R + "," + (T + 1) + "," + S + ")'>下一页&nbsp;&raquo;</a>";
                x("#flip_cities2").html(M);
                if (i == 1 | i == 0 | i == 2) {
                    i == -1
                }
                if (C) {
                    C.select()
                }
            } else {}
            x(".ac_even").on("mouseover", function () {
                x.stationFor12306.city_shiftSelectInLi(this)
            }).on("click", function () {
                C.val(x(this).text());
                curObjCode.val(x(this).attr("data"));
                if (w) {
                    x.stationFor12306.setStationInCookies(x(this).text(), x(this).attr("data"))
                }
                x("#form_cities2").css("display", "none");
                i = -1;
                t = 0;
                x.stationFor12306.setStationStyle();
                if (F) {
                    x.stationFor12306.LoadJS(x(this).attr("data"))
                }
                if (D) {
                    D(C, curObjCode)
                }
            })
        },
        filterCity: function (P) {
            if (P.length == 0) {
                x("#top_cities").html(j);
                return s
            }
            var N = [];
            var M = /[^A-z]/.test(P);
            for (var O = 0; O < s.length; O++) {
                if (x.stationFor12306.isMatchCity(s[O], P, M)) {
                    N.push(s[O])
                }
            }
            if (N.length > 0) {
                x("#top_cities").html('按"<font color=red>' + P + '</font>"检索：');
                return N
            } else {
                x("#top_cities").html("无法匹配:<font color=red>" + P + "</font>");
                return []
            }
        },
        replaceChar: function (M, O, N) {
            return M.substr(0, O) + N + M.substr(O + 1, M.length - 1)
        },
        isMatchCity: function (R, U, O) {
            var U = U.toLowerCase();
            var N = [R[4].toLowerCase(), R[1], R[3].toLowerCase()];
            var T = -1;
            var Q = -1;
            if (O) {
                U = U.split("");
                for (var P = 0; P < U.length; P++) {
                    var W = N[1].indexOf(U[P]);
                    if (W > T && W <= P) {
                        N[1] = x.stationFor12306.replaceChar(N[1], W, "-");
                        T = W
                    } else {
                        return false
                    }
                }
            } else {
                U = U.split("");
                var M = true;
                var S = true;
                for (var P = 0; P < U.length; P++) {
                    var W = N[0].indexOf(U[P]);
                    if (W > T && W <= P) {
                        N[0] = x.stationFor12306.replaceChar(N[0], W, "-");
                        T = W
                    } else {
                        M = false;
                        break
                    }
                }
                for (var P = 0; P < U.length; P++) {
                    var V = N[2].indexOf(U[P]);
                    if (V > Q && V <= P) {
                        N[2] = x.stationFor12306.replaceChar(N[2], V, "-");
                        Q = V
                    } else {
                        S = false;
                        break
                    }
                }
                if ((M == false) && (S == false)) {
                    return false
                }
            }
            return true
        },
        city_showlist: function (O) {
            if (z.length > 6) {
                var N = Math.ceil((z.length + 1) / 6);
                if (O == -1) {
                    O = (N - 1)
                } else {
                    if (O == N) {
                        O = 0
                    }
                }
                A = z.slice(6 * (O), Math.min(6 * (O + 1), z.length));
                x.stationFor12306.city_Bind(A);
                var M = (O == 0) ? "<span style='float:left;'>&laquo;&nbsp;向前</span>" : "<a style='float:left;cursor:pointer' href='' class='cityflip' onclick='$.stationFor12306.city_showlist(" + (O - 1) + ");return false;'>&laquo;&nbsp;向前</a>";
                M += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                M += (O == N - 1) ? "<span style='float:right;'>向后&nbsp;&raquo;</span>" : "<a style='float:right;cursor:pointer' href='' class='cityflip' onclick='$.stationFor12306.city_showlist(" + (O + 1) + ");return false;'>向后&nbsp;&raquo;</a>";
                x("#flip_cities").html(M);
                x("#flip_cities").css("display", "block")
            } else {
                O = 0;
                A = z;
                x.stationFor12306.city_Bind(A);
                x("#flip_cities").css("display", "none")
            }
            u = O;
            if (x("#form_cities").css("display") == "block") {
                a = true;
                C.focus()
            }
        },
        fixDivBugInIE6: function (M) {
            try {
                M.bgiframe();
                if (M.width() > x("> ul", M).width()) {
                    M.css("overflow", "hidden")
                } else {
                    x("> iframe.bgiframe", M).width(x("> ul", M).width());
                    M.css("overflow", "scroll")
                } if (M.height() > x("> ul", M).height()) {
                    M.css("overflow", "hidden")
                } else {
                    x("> iframe.bgiframe", M).height(x("> ul", M).height());
                    M.css("overflow", "scroll")
                }
            } catch (N) {}
        },
        clearStation: function (M) {
            i = -1;
            var O = C.val();
            var P = curObjCode.val();
            if (O == "" || P == "") {
                C.val("");
                curObjCode.val("")
            } else {
                var N = O + "|" + P;
                if (typeof (station_names) != "undefined") {
                    if (station_names.indexOf(N) == -1) {
                        C.val("");
                        curObjCode.val("")
                    } else {
                        if ("click" == M) {
                            C.select();
                            if (x("#form_cities").is(":hidden")) {
                                x("#form_cities2").css("display", "block")
                            }
                        }
                    }
                } else {
                    C.val("");
                    curObjCode.val("")
                }
            }
        },
        MapCityID: function (N) {
            for (var M = 0; M < s.length; M++) {
                if (s[M][1] == N) {
                    return s[M][2]
                }
            }
            return 0
        },
        MapCityName: function (M) {
            for (var N = 0; N < s.length; N++) {
                if (s[N][2] == M) {
                    return s[N][1]
                }
            }
            return ""
        },
        SetISPos: function (Q) {
            if (I) {
                I(x("#form_cities"), x("#form_cities2"))
            } else {
                x("#form_cities").css("left", Q.position().left);
                x("#form_cities").css("top", Q.position().top + Q.height() + 12);
                x("#form_cities2").css("left", Q.position().left);
                x("#form_cities2").css("top", Q.position().top + Q.height() + 12)
            }
            var P = Q.offset().top;
            var M = x("#search_div");
            var N = x("#choice_div");
            M.css("top", P);
            N.css("top", P);
            var O = Q.offset().left;
            M.css("left", O);
            N.css("left", O)
        },
        myHandlerFg: function (M) {
            if (M == null) {
                M.keyCode = 9
            } else {
                if (!M.which && M.which == 13) {
                    M.preventDefault()
                } else {
                    if (M.which && M.keyCode == 13) {
                        M.which = 9
                    }
                }
            }
        },
        myHandler2: function (M) {
            if (M == null) {
                M = window.event;
                M.returnValue = false
            } else {
                if (M.which && M.which == 13) {
                    var O = document.getElementById("Upload_Data3");
                    if (document.createEvent) {
                        var N = document.createEvent("MouseEvents");
                        N.initEvent("click", true, false);
                        O.dispatchEvent(N)
                    } else {
                        if (document.createEventObject) {
                            O.fireEvent("onclick")
                        }
                    }
                } else {
                    if (!M.which && M.which == 13) {
                        M.preventDefault()
                    }
                }
            }
        },
        from_to_station_class_plain: function (M) {
            if (h && h != "") {
                M.removeClass(h)
            }
            if (n && n != "") {
                M.addClass(n)
            }
        },
        from_to_station_class_gray: function (M) {
            if (n && n != "") {
                M.removeClass(n)
            }
            if (h && h != "") {
                M.addClass(h)
            }
        },
        setStationStyle: function () {
            var M = C.val();
            if (M == "") {
                C.val(g);
                x.stationFor12306.from_to_station_class_gray(C);
                curObjCode.val("")
            } else {
                x.stationFor12306.from_to_station_class_plain(C)
            }
        },
        setCurValue: function () {
            C.val(J[1]);
            curObjCode.val(J[2])
        },
        bindEvent: function (M) {
            var O = "#" + M;
            var N = "#" + M + "Text";
            x(N).keydown(function (Q) {
                C = x(N);
                curObjCode = x(O);
                i = 0;
                a = true;
                F = true;
                x("#form_cities2").css("display", "none");
                t = 0;
                var P = x(N).width();
                if (-[1, ]) {
                    P = P - 4
                }
                x("#form_cities").css("width", P);
                x("#form_cities").css("display", "block");
                x(".AbcSearch li").removeClass("action");
                x(".popcitylist").css("display", "none");
                if (G && w) {
                    x("#ul_list7").css("display", "block");
                    x("#nav_list7").addClass("action")
                } else {
                    x("#nav_list1").addClass("action");
                    x("#ul_list1").css("display", "block")
                }
                x("#flip_cities2").css("display", "none");
                x(".ac_even").removeClass("ac_over").addClass("ac_odd");
                Q = Q || window.event;
                if (Q.keyCode == 40) {
                    x.stationFor12306.city_changeSelectIndex(1);
                    x("#form_cities").css("display", "block");
                    x.stationFor12306.SetISPos(C);
                    x.stationFor12306.setCurValue()
                } else {
                    if (Q.keyCode == 38) {
                        x.stationFor12306.city_changeSelectIndex(-1);
                        x.stationFor12306.setCurValue();
                        x("#form_cities").css("display", "block");
                        x.stationFor12306.SetISPos(C)
                    } else {
                        if (Q.keyCode == 13) {
                            x.stationFor12306.city_confirmSelect();
                            if (document.addEventListener) {
                                document.addEventListener("keypress", x.stationFor12306.myHandlerFg, true)
                            } else {
                                evt = window.event;
                                evt.keyCode = 9
                            }
                        }
                    }
                }
            }).focus(function () {
                F = true;
                if (a) {
                    x("#form_cities2").css("display", "none");
                    t = 0;
                    a = false;
                    i = -1
                } else {
                    if (i == -1) {
                        x(".AbcSearch li").removeClass("action");
                        x(".popcitylist").css("display", "none");
                        x("#flip_cities2").css("display", "none");
                        if (G && w) {
                            x("#ul_list7").css("display", "block");
                            x("#nav_list7").addClass("action")
                        } else {
                            x("#nav_list1").addClass("action");
                            x("#ul_list1").css("display", "block")
                        }
                        x(".ac_even").removeClass("ac_over").addClass("ac_odd");
                        x("#form_cities2").css("display", "block")
                    }
                }
                C = x(N);
                curObjCode = x(O);
                i = 0;
                K = true;
                x.stationFor12306.SetISPos(C)
            }).blur(function () {
                C = x(N);
                curObjCode = x(O);
                i = 0;
                a = false;
                F = true;
                if (!f && !B) {
                    x.stationFor12306.clearStation("blur");
                    K = false;
                    x("#form_cities").css("display", "none");
                    x("#form_cities2").css("display", "none");
                    i = -1;
                    t = 0;
                    z = x.stationFor12306.filterCity("");
                    x.stationFor12306.city_showlist(0);
                    x.stationFor12306.setStationStyle()
                }
            }).keyup(function (P) {
                C = x(N);
                curObjCode = x(O);
                i = 0;
                a = true;
                P = P || window.event;
                if (P.keyCode != 40 && P.keyCode != 38 && P.keyCode != 37 && P.keyCode != 39 && P.keyCode != 13 && P.keyCode != 9) {
                    z = x.stationFor12306.filterCity(C.val());
                    x.stationFor12306.city_showlist(0)
                }
            }).click(function () {
                x.stationFor12306.clearStation("click")
            });
            x.stationFor12306.bindInputs.push(M)
        },
        getStationInCookies: function () {
            var O = [];
            var N = x.ht_getcookie("_city_name_save_station");
            if (N) {
                var M = N.split(",");
                if (M && M.length > 0) {
                    x.each(M, function (S, R) {
                        var P = R.split("#");
                        var Q = [];
                        Q[0] = P[0];
                        Q[1] = P[1];
                        O[S] = Q
                    })
                }
            }
            return O
        },
        setStationInCookies: function (W, N) {
            var T = x.stationFor12306.getStationInCookies();
            var Q = [];
            var X = T.length;
            var P = true;
            var Y = 10;
            for (var R = 0; R < X; R++) {
                if (T[R][0] == W && T[R][1] == N) {
                    P = false
                }
                Q.push(T[R])
            }
            if (P) {
                Q.push([W, N])
            }
            var S = Q;
            var O = "";
            var U = S.length;
            var R = 0;
            if (U > Y) {
                R = 1
            }
            var M = R;
            if (U > 1) {
                x("#ul_list7").html("");
                G = true
            }
            var V = "";
            for (; R < U; R++) {
                if (R > M) {
                    O += ","
                }
                O += S[R][0] + "#" + S[R][1];
                if (G && w) {
                    V += '<li class="ac_even" onmouseover="$.stationFor12306.city_shiftSelectInLi(this);" onclick="$.stationFor12306.li_click(this);"   title="' + S[R][0] + '" data="' + S[R][1] + '">' + S[R][0] + "</li>"
                }
            }
            if (G && w) {
                x("#ul_list7").html(V)
            }
            x.ht_setcookie("_city_name_save_station", O, 365 * 24 * 60 * 60)
        },
        li_click: function (M) {
            C.val(x(M).text());
            curObjCode.val(x(M).attr("data"));
            if (w) {
                x.stationFor12306.setStationInCookies(x(M).text(), x(M).attr("data"))
            }
            x("#form_cities2").css("display", "none");
            i = -1;
            t = 0;
            x.stationFor12306.setStationStyle();
            if (F) {
                x.stationFor12306.LoadJS(x(M).attr("data"))
            }
            if (D) {
                D(C, curObjCode)
            }
        },
        init: function (R, S) {
            if (typeof (S) != "undefined") {
                if (typeof (S._init_input) != "undefined") {
                    g = S._init_input
                }
                if (typeof (S._top_4_initInput) != "undefined") {
                    j = S._top_4_initInput
                }
                if (typeof (S.confirmCallBack) != "undefined") {
                    D = S.confirmCallBack
                }
                if (typeof (S._selected_class) != "undefined") {
                    n = S._selected_class
                }
                if (typeof (S._unselected_class) != "undefined") {
                    h = S._unselected_class
                }
                if (typeof (S._12306_openFavorite) != "undefined") {
                    w = S._12306_openFavorite
                }
                if (typeof (S.position) != "undefined") {
                    I = S.position
                }
            }
            if (typeof (station_names) != "undefined") {
                var O = station_names.split("@");
                for (var N = 0; N < O.length; N++) {
                    var Q = O[N];
                    var P = Q.toString().charAt(0);
                    if (P == "a" || P == "b" || P == "c" || P == "d" || P == "e") {
                        e.push(Q.split("|"))
                    }
                    if (P == "f" || P == "g" || P == "h" || P == "i" || P == "j") {
                        d.push(Q.split("|"))
                    }
                    if (P == "k" || P == "l" || P == "m" || P == "n" || P == "o") {
                        c.push(Q.split("|"))
                    }
                    if (P == "p" || P == "q" || P == "r" || P == "s" || P == "t") {
                        b.push(Q.split("|"))
                    }
                    if (P == "u" || P == "v" || P == "w" || P == "x" || P == "y" || P == "z") {
                        L.push(Q.split("|"))
                    }
                    if (Q.length > 0) {
                        Q = Q.split("|");
                        if (H != "" && Q[2] == H) {
                            favcity = Q;
                            s.unshift(Q);
                            if (N > 6) {
                                s.push(Q)
                            }
                        } else {
                            s.push(Q)
                        }
                    }
                }
                for (var N = 0; N < s.length; N++) {
                    s[N].push(N)
                }
            }
            if (typeof (favorite_names) != "undefined") {
                var M = favorite_names.split("@");
                for (var N = 0; N < M.length; N++) {
                    var Q = M[N];
                    if (Q.length > 0) {
                        Q = Q.split("|");
                        y.push(Q)
                    }
                }
                for (var N = 0; N < y.length; N++) {
                    y[N].push(N)
                }
            }
            z = x.stationFor12306.filterCity("");
            x.stationFor12306.city_showlist(0);
            x.stationFor12306.showAllCity();
            a = false;
            x.stationFor12306.fixDivBugInIE6(x("#form_cities"));
            x.stationFor12306.fixDivBugInIE6(x("#form_cities2"));
            if (R && R.length > 0) {
                x.each(R, function (U, T) {
                    x.stationFor12306.bindEvent(T)
                })
            }
            x("#form_cities").mousedown(function () {
                f = true
            }).mouseup(function () {
                f = false
            });
            x("#form_cities2").mousedown(function () {
                B = true
            }).mouseup(function () {
                B = false
            })
        }
    }
})(jQuery);
(function () {
    $.stopStation = function (a) {
        var b = this;
        b.init = function () {
            b.options = $.extend({}, $.stopStation.defaultOptions, a);
            if (null == b.options.url || null == b.options.getSearchDate) {
                throw "error options,url can not be null"
            }
            b.options.mouseOnPanel = 0;
            if (!$("#" + b.options.showDivId)[0]) {
                var d = [];
                var c = -1;
                d[++c] = '<div class="station" style="display:none;" id="' + b.options.showDivId + '"><b></b>';
                d[++c] = '<div class="station-info" id="' + b.options.showTitleId + '"></div>';
                d[++c] = '<div class="station-hd"><span class="zx">站序</span><span class="zm">站名</span><span class="dzsj">到站时间</span>';
                d[++c] = '<span class="cfsj">出发时间</span><span class="tlsj">停留时间</span>';
                d[++c] = '<a id="_stopStation_close_id" class="close" title="关闭" href="javascript:" </a></div>';
                d[++c] = '<div class="station-bd"><table><tbody id="' + b.options.showTableId + '"></tbody></table></div></div>';
                $(d.join("")).appendTo($("body:eq(0)"));
                $("#_stopStation_close_id").on("click", b.close)
            }
            $("#" + b.options.showDivId).css("z-index", "20001");
            if (b.options.mouseOutClose) {
                $("#" + b.options.showDivId).on("mouseenter", function (e) {
                    b.options.mouseOnPanel = 1
                }).on("mouseleave", function () {
                    b.options.mouseOnPanel = 0;
                    $("#" + b.options.showDivId).hide().appendTo($("body:eq(0)"));
                    $("#" + b.options.showTableId).html("")
                })
            }
        };
        b.close = function () {
            $("#" + $.stopStation.defaultOptions.showDivId).closest("tr").removeAttr("style");
            $("#" + $.stopStation.defaultOptions.showDivId).removeAttr("style");
            b.options.mouseOnPanel = 0;
            $("#" + $.stopStation.defaultOptions.showDivId).hide().appendTo($("body:eq(0)"));
            $("#" + $.stopStation.defaultOptions.showTableId).html("")
        };
        b.open = function (f, j, h, e, i, c) {
            $("#" + $.stopStation.defaultOptions.showDivId).attr("style", "z-index:20001");
            if (a.timer) {
                clearTimeout(a.timer)
            }
            var g = a.getSearchDate();
            if (i && "" != i && null != i) {
                var d = formatDate(i);
                if ("-" != d) {
                    g = formatDate(i)
                } else {
                    g = a.getSearchDate()
                }
            } else {
                g = a.getSearchDate()
            }
            $.ajax({
                url: a.url,
                type: "get",
                isTakeParam: false,
                beforeSend: function (k) {
                    k.setRequestHeader("If-Modified-Since", "0");
                    k.setRequestHeader("Cache-Control", "no-cache")
                },
                data: {
                    train_no: j,
                    from_station_telecode: h,
                    to_station_telecode: e,
                    depart_date: g
                },
                success: function (p) {
                    var s = p.data.data;
                    if (s && s.length > 0) {
                        var r = [];
                        var t = -1;
                        for (var q = 0; q < s.length; q++) {
                            var l = s[q];
                            if (q == 0) {
                                var n = null;
                                n = l.train_class_name;
                                if ("0" == c || "2" == c || "4" == c) {
                                    c = "无空调"
                                } else {
                                    c = "有空调"
                                } if (!n) {
                                    n = "&nbsp;&nbsp;"
                                }
                                $("#" + $.stopStation.defaultOptions.showTitleId).html('<span class="item1">' + l.station_train_code + '次      </span><span class="item2">' + l.start_station_name + "<em>--></em>" + l.end_station_name + '</span><span class="item3">' + n + '</span><span class="item4">' + c + "</span>").find("span").css("color", "#333")
                            }
                            var m = "";
                            if (!l.isEnabled) {
                                m = " style='color: #999;' "
                            }
                            r[++t] = '<tr><td width="50" class="tc" ' + m + ">" + l.station_no + "</td>";
                            r[++t] = '<td width="75" ' + m + ">" + l.station_name + "</td>";
                            r[++t] = '<td width="75" ' + m + ">" + l.arrive_time + "</td>";
                            r[++t] = '<td width="75" ' + m + ">" + l.start_time + "</td>";
                            r[++t] = "<td " + m + ">" + l.stopover_time + "</td></tr>"
                        }
                        $("#" + $.stopStation.defaultOptions.showTableId).html(r.join(""));
                        var o = $("#" + $.stopStation.defaultOptions.appendTo + f);
                        $("#" + $.stopStation.defaultOptions.showDivId).appendTo(o).show();
                        $(".ticket-info").filter("div").attr("style", "");
                        o[0].style["z-index"] = 19999;
                        if (!(navigator.appVersion.indexOf("MSIE 6") > -1)) {} else {}
                    }
                }
            })
        };
        b.init();
        myStopStation = b;
        return b
    };
    $.fn.stopStation = function () {
        return (new $.stopStation(Array.prototype.slice.call(arguments)[0]))
    };
    $.stopStation.defaultOptions = {
        url: null,
        mouseOutClose: false,
        showDivId: "train_div_",
        showTableId: "train_table_",
        showTitleId: "train_span_",
        appendTo: "train_num_",
        getSearchDate: null
    }
})();
var myStopStation = function () {};
var formatDate = function (b) {
    if (b && (b.length == 8)) {
        var c = b.substring(0, 4);
        var d = b.substring(4, 6);
        var a = b.substring(6, 8);
        return c + "-" + d + "-" + a
    } else {
        return "-"
    }
};
var checkusermdId;
var showTrainStop;
var hideTrainStop;
var showTicketPrice;
var isInitQueryInput = false;
var isInitStationDiv = false;
var isInitJsrenderTemplate = false;
var isInitDateRange = false;
var tickets_info;
var location_code;
var md5Str;
var leftTicketStr;
var isAsync;
var box;
var countDown = null;
var ischeckAutoSubmitCode = true;
(function () {
    var a;
    var aH = null;
    var be;
    var a3;
    var G;
    var U;
    var bG;
    var bt;
    var m = false;
    var bz = 0;
    var aj;
    var aR;
    var r;
    var S;
    var bL;
    var aO = new Array();
    var bq = new Array();
    var by = new Array();
    var N = new Array();
    var bl = new Array();
    var D;
    var ao = new Array();
    tickets_info = new Array();
    var aI = true,
        bA = true,
        aD = true,
        ak = "starttime";
    var an = true;
    var ba = [];
    var aU = [];
    var bs = [];
    var aw;
    var A = [];
    var br = "";
    var bE = "";
    var aM = "";
    var f = "";
    var y = "";
    $(document).ready(function () {
        $.init_ul4li();
        e();
        O();
        t();
        R();
        z();
        al();
        aK();
        a8();
        clickCheckBoxName();
        bd();
        bv();
        ae();
        V();
        bB();
        u();
        aC();
        aB();
        bh();
        $("#float").headerFloat();
        $(window).scroll(function () {
            if (aH != null && (!aH.isHidden())) {
                $("#floatTable").hide();
                $(window).scrollTop(a)
            }
        });
        $.stopStation({
            url: ctx + "czxx/queryByTrainNo",
            getSearchDate: function () {
                return train_tour_flag == "fc" ? $.trim($("#back_train_date").val()) : $.trim($("#train_date").val())
            }
        });
        aQ();
        bP();
        bC();
        l();
        K();
        T();
        br = $("#fromStationText").val();
        bE = $("#toStationText").val();
        $("#showOnlyTicA").bind("click", function () {
            $("#filterTic").attr("checked", "checked");
            aV();
            $jpopup.startOrHiden()
        });
        aw = $.autoSubmit();
        var bS = $("#train_date").val();
        var bR = $("#back_train_date").val();
        if (bR == "") {
            $("#back_train_date").val(bS)
        } else {
            $("#back_train_date").val(bR)
        }
    });

    function T() {
        if (rqChecked.length == 0) {
            if (train_tour_flag == "fc") {
                rqChecked.push($("#back_train_date").val())
            } else {
                rqChecked.push($("#train_date").val())
            }
        }
    }

    function bC() {
        if (ClickWho == "0X00") {
            $("#sf1").attr("disabled", "true");
            $("#sf1_label").addClass("color999");
            $("#sf2").attr("checked", "true");
            $("#query_ticket").removeClass().addClass("btn92s")
        } else {
            if (ClickWho == "00" || ClickWho == "ADULT") {
                $("#sf2").attr("disabled", "true");
                $("#sf2_label").addClass("color999");
                $("#query_ticket").removeClass().addClass("btn92s")
            } else {
                $("#query_ticket").removeClass().addClass("btn92s")
            }
        } if (isstudentDate) {
            $("#sf2").attr("disabled", "true");
            $("#sf2_label").addClass("color999");
            $("#query_ticket").removeClass().addClass("btn92s")
        }
    }

    function W() {
        if (!isInitStationDiv) {
            c();
            isInitStationDiv = true
        }
        if (!isInitJsrenderTemplate) {
            af();
            isInitJsrenderTemplate = true
        }
    }

    function aQ() {
        $("#fromStationText").mouseover(W);
        $("#toStationText").mouseover(W);
        $("#dc").mouseover(W);
        $("#wf").mouseover(W);
        $("#dc_label").mouseover(W);
        $("#wf_label").mouseover(W);
        $("#train_date").mouseover(W);
        $("#back_train_date").mouseover(W);
        $("#date_range").mouseover(W)
    }

    function am(bR) {
        au();
        var bV = bl.length;
        if ($("#query_ticket").html() == "停止查询") {
            if (bV > 0 && ax) {
                $("#auto_query").removeAttr("disabled");
                if ($("#dc").is(":checked")) {
                    $("#autoSubmit").removeAttr("disabled");
                    $("#partSubmit").removeAttr("disabled")
                }
                $("#query_ticket").html("查询");
                $("#query_ticket").unbind("click");
                bm();
                if (countDown) {
                    clearInterval(countDown)
                }
                $("#filterTicDiv").html("<strong><label for='filterTic' style='cursor: pointer;'>仅显示选定车次</label></strong>");
                if (!$("#autoSubmit").is(":checked")) {
                    clearInterval(aF);
                    if (ccSelected.length > 0 || rqChecked.length > 0 || xbChecked.length > 0) {
                        myJpopup.startOrHiden();
                        if (train_tour_flag == "fc") {
                            var bS = "成功查到" + $("#back_train_date").val() + "的" + bl[0]["queryLeftNewDTO"]["station_train_code"] + "次"
                        } else {
                            var bS = "成功查到" + $("#train_date").val() + "的" + bl[0]["queryLeftNewDTO"]["station_train_code"] + "次"
                        } if (bV == 1) {
                            bS = bS + "车。"
                        } else {
                            bS = bS + "等" + bV + "趟车。"
                        }
                        $("#filterRes").html(bS)
                    }
                }
                jPlayer("play")
            } else {
                if (countDown) {
                    clearInterval(countDown)
                }
                var bW = autoSearchTime / 1000;
                $("#filterTicDiv").html("<strong>离下次刷新时间<font class='colorA' style='font-size: 16px;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + bW + "</font>秒<strong>");
                countDown = window.setInterval(function () {
                    var bX = "<strong>离下次刷新时间<font class='colorA' style='font-size: 16px;'>";
                    if (bW == 0) {
                        bW = autoSearchTime / 1000
                    }
                    bW = bW - 1;
                    if (bW == 4) {
                        bX = bX + "&nbsp;&nbsp;&nbsp;&nbsp;"
                    }
                    if (bW == 3) {
                        bX = bX + "&nbsp;&nbsp;&nbsp;"
                    }
                    if (bW == 2) {
                        bX = bX + "&nbsp;&nbsp;"
                    }
                    if (bW == 1) {
                        bX = bX + "&nbsp;"
                    }
                    bX = bX + bW;
                    bX += "</font>秒<strong>";
                    $("#filterTicDiv").html(bX)
                }, 1000);
                $("#filterTic").hide()
            }
        }
        var bU = new Array();
        bU.push('<tbody id="queryLeftTable">');
        for (var bT = 0; bT < bR.length; bT++) {
            bU.push('<tr id="ticket_');
            bU.push(bR[bT].queryLeftNewDTO.train_no);
            bU.push('" class="');
            bU.push(bT % 2 ? '">' : 'bgc">');
            bU.push('<td colspan="4" width="370">');
            bU.push('<div class="ticket-info clearfix" id="train_num_');
            bU.push(bT);
            bU.push('">');
            bU.push('<div class="train" id="ticket_');
            bU.push(bR[bT].queryLeftNewDTO.train_no);
            bU.push('_train">');
            bU.push('<div><a title="点击查看停靠站信息" href="javascript:" id="');
            bU.push(bR[bT].queryLeftNewDTO.train_no);
            bU.push("_");
            bU.push(bR[bT].queryLeftNewDTO.from_station_telecode);
            bU.push("_");
            bU.push(bR[bT].queryLeftNewDTO.to_station_telecode);
            bU.push('" class="number"  onclick="myStopStation.open(\'');
            bU.push(bT);
            bU.push("','");
            bU.push(bR[bT].queryLeftNewDTO.train_no);
            bU.push("','");
            bU.push(bR[bT].queryLeftNewDTO.from_station_telecode);
            bU.push("','");
            bU.push(bR[bT].queryLeftNewDTO.to_station_telecode);
            bU.push("','");
            bU.push(bR[bT].queryLeftNewDTO.start_train_date);
            bU.push("','");
            bU.push(bR[bT].queryLeftNewDTO.train_seat_feature);
            bU.push("');\">");
            bU.push(bR[bT].queryLeftNewDTO.station_train_code);
            bU.push("</a>");
            if (bR[bT].queryLeftNewDTO.is_support_card != 0) {
                bU.push(' <span class="i-card" title="可凭二代身份证直接进出站"></span>')
            }
            bU.push("</div>");
            bU.push('<span id="');
            bU.push(bR[bT].queryLeftNewDTO.train_no);
            bU.push("_");
            bU.push(bR[bT].queryLeftNewDTO.from_station_no);
            bU.push("_");
            bU.push(bR[bT].queryLeftNewDTO.to_station_no);
            bU.push("_");
            bU.push(bR[bT].queryLeftNewDTO.yp_info);
            bU.push("_");
            bU.push(bR[bT].queryLeftNewDTO.seat_types);
            bU.push('" class="lookup" onclick="showTicketPrice(this)"><span style="display:none;">查看票价</span><b title="查看票价"></b></span>');
            bU.push("</div>");
            bU.push('<div class="cdz">');
            if (bR[bT].queryLeftNewDTO.from_station_telecode != null && bR[bT].queryLeftNewDTO.from_station_telecode == bR[bT].queryLeftNewDTO.start_station_telecode) {
                bU.push('<strong class="start-s">');
                bU.push(bR[bT].queryLeftNewDTO.from_station_name);
                bU.push("</strong>")
            } else {
                bU.push("<strong>");
                bU.push(bR[bT].queryLeftNewDTO.from_station_name);
                bU.push("</strong>")
            } if (bR[bT].queryLeftNewDTO.to_station_telecode != null && bR[bT].queryLeftNewDTO.to_station_telecode == bR[bT].queryLeftNewDTO.end_station_telecode) {
                bU.push('<strong class="end-s">');
                bU.push(bR[bT].queryLeftNewDTO.to_station_name);
                bU.push("</strong>")
            } else {
                bU.push("<strong>");
                bU.push(bR[bT].queryLeftNewDTO.to_station_name);
                bU.push("</strong>")
            }
            bU.push("</div>");
            bU.push('<div class="cds">');
            bU.push('<strong class="start-t">');
            bU.push(bR[bT].queryLeftNewDTO.start_time);
            bU.push("</strong>");
            bU.push('<strong class="color999">');
            bU.push(bR[bT].queryLeftNewDTO.arrive_time);
            bU.push("</strong>");
            bU.push("</div>");
            bU.push('<div  class="ls" ');
            bU.push('id="');
            bU.push(bR[bT].queryLeftNewDTO.train_no);
            bU.push('_ls">');
            bU.push("<strong>");
            bU.push(bR[bT].queryLeftNewDTO.lishi);
            bU.push("</strong>");
            bU.push("<span>");
            bU.push(changeArriveDate(bR[bT].queryLeftNewDTO.start_time, bR[bT].queryLeftNewDTO.lishi));
            bU.push("到达</span>");
            bU.push("</div>");
            bU.push("</div>");
            bU.push("</td>");
            bD(bU, bR[bT].queryLeftNewDTO.swz_num, "SWZ_", bR[bT].queryLeftNewDTO.train_no, bR[bT].queryLeftNewDTO.yp_ex, "91");
            bD(bU, bR[bT].queryLeftNewDTO.tz_num, "TZ_", bR[bT].queryLeftNewDTO.train_no, bR[bT].queryLeftNewDTO.yp_ex, "P1");
            bD(bU, bR[bT].queryLeftNewDTO.zy_num, "ZY_", bR[bT].queryLeftNewDTO.train_no, bR[bT].queryLeftNewDTO.yp_ex, "M1");
            bD(bU, bR[bT].queryLeftNewDTO.ze_num, "ZE_", bR[bT].queryLeftNewDTO.train_no, bR[bT].queryLeftNewDTO.yp_ex, "O1");
            bD(bU, bR[bT].queryLeftNewDTO.gr_num, "GR_", bR[bT].queryLeftNewDTO.train_no, bR[bT].queryLeftNewDTO.yp_ex, "61");
            bD(bU, bR[bT].queryLeftNewDTO.rw_num, "RW_", bR[bT].queryLeftNewDTO.train_no, bR[bT].queryLeftNewDTO.yp_ex, "41");
            bD(bU, bR[bT].queryLeftNewDTO.yw_num, "YW_", bR[bT].queryLeftNewDTO.train_no, bR[bT].queryLeftNewDTO.yp_ex, "31");
            bD(bU, bR[bT].queryLeftNewDTO.rz_num, "RZ_", bR[bT].queryLeftNewDTO.train_no, bR[bT].queryLeftNewDTO.yp_ex, "21");
            bD(bU, bR[bT].queryLeftNewDTO.yz_num, "YZ_", bR[bT].queryLeftNewDTO.train_no, bR[bT].queryLeftNewDTO.yp_ex, "11");
            bD(bU, bR[bT].queryLeftNewDTO.wz_num, "WZ_", bR[bT].queryLeftNewDTO.train_no, bR[bT].queryLeftNewDTO.yp_ex, "W1");
            bD(bU, bR[bT].queryLeftNewDTO.qt_num, "QT_", bR[bT].queryLeftNewDTO.train_no, bR[bT].queryLeftNewDTO.yp_ex, "");
            if ("Y" == bR[bT].queryLeftNewDTO.canWebBuy) {
                bU.push(' <td align="center" width="80" class="no-br"><a href="javascript:" class="btn72" onclick="submitOrderRequest(\'');
                bU.push(bR[bT].secretStr);
                bU.push("','");
                bU.push(bR[bT].queryLeftNewDTO.start_time);
                bU.push("')\">");
                bU.push(buttonText());
                bU.push("</a>");
                bU.push("</td>")
            } else {
                bU.push('<td align="center" width="80" class="no-br">');
                bU.push(bR[bT].buttonTextInfo);
                bU.push("</td>")
            }
            bU.push("</tr>");
            bU.push('<tr id="price_');
            bU.push(bR[bT].queryLeftNewDTO.train_no);
            bU.push('" style="display:none;"></tr>')
        }
        bU.push("</tbody>");
        $("#queryLeftTable").replaceWith(bU.join(""))
    }

    function bD(bW, bV, bU, bT, bX, bS) {
        var bY = bX ? bX.indexOf(bS) : -1;
        var bR = false;
        if (bY > -1 && (bY % 2) == 0) {
            bR = true
        }
        if ("有" == bV) {
            if (bU == "SWZ_" || bU == "TZ_") {
                bW.push('<td width="46" align="center" class="yes" onclick="showTicketPrice(this)"　style="cursor: pointer;" id="');
                bW.push(bU);
                bW.push(bT);
                bW.push('">');
                if (bR) {
                    bW.push('<div class="sale" title="本席别票价打折">' + bV + '<span class="i-mark">折</span></div>')
                } else {
                    bW.push(bV)
                }
                bW.push("</td>")
            } else {
                if (bU == "ZY_" || bU == "ZE_") {
                    bW.push('<td width="46" align="center" class="yes" style="cursor: pointer;" onclick="showTicketPrice(this)" id="');
                    bW.push(bU);
                    bW.push(bT);
                    bW.push('">');
                    if (bR) {
                        bW.push('<div class="sale" title="本席别票价打折">' + bV + '<span class="i-mark">折</span></div>')
                    } else {
                        bW.push(bV)
                    }
                    bW.push("</td>")
                } else {
                    bW.push('<td width="46" align="center" style="cursor: pointer;" class="yes" onclick="showTicketPrice(this)" id="');
                    bW.push(bU);
                    bW.push(bT);
                    bW.push('">');
                    if (bR) {
                        bW.push('<div class="sale" title="本席别票价打折">' + bV + '<span class="i-mark">折</span></div>')
                    } else {
                        bW.push(bV)
                    }
                    bW.push("</td>")
                }
            }
        } else {
            if (isNum(bV) > 0) {
                if (bU == "SWZ_" || bU == "TZ_" || bU == "ZY_" || bU == "ZE_") {
                    bW.push('<td width="46" align="center" style="cursor: pointer;" class="t-num" onclick="showTicketPrice(this)" id="');
                    bW.push(bU);
                    bW.push(bT);
                    bW.push('">');
                    bW.push("<div>");
                    if (bR) {
                        bW.push('<div class="sale" title="本席别票价打折">' + bV + '<span class="i-mark">折</span></div>')
                    } else {
                        bW.push(bV)
                    }
                    bW.push("</td>")
                } else {
                    bW.push('<td width="46" align="center" style="cursor: pointer;" class="t-num" onclick="showTicketPrice(this)" id="');
                    bW.push(bU);
                    bW.push(bT);
                    bW.push('">');
                    if (bR) {
                        bW.push('<div class="sale" title="本席别票价打折">' + bV + '<span class="i-mark">折</span></div>')
                    } else {
                        bW.push(bV)
                    }
                    bW.push("</td>")
                }
            } else {
                bW.push(' <td width="46" align="center" style="cursor: pointer;" onclick="showTicketPrice(this)"  id="');
                bW.push(bU);
                bW.push(bT);
                bW.push('">');
                bW.push(bV);
                bW.push("</td>")
            }
        }
    }

    function h(bS, bR) {
        ishaveCheckId = false;
        for (i = 0; i < bS.length; i++) {
            if (bS[i][0] == bR) {
                bS[i][1] = $("#".concat($("#".concat(bR)).attr("for"))).is(":checked");
                ishaveCheckId = true
            }
        }
        if (!ishaveCheckId) {
            bS[bS.length] = [bR, true]
        }
    }

    function bo() {
        d(be);
        d(a3);
        d(G)
    }

    function d(bR) {
        for (i = 0; i < bR.length; i++) {
            if (bR[i][1]) {
                $("#".concat(bR[i][0]).concat("_check")).attr("checked", true)
            }
        }
    }

    function v(bS) {
        var bR = new Date();
        var bT = bS.split("-");
        bR.setFullYear(parseInt(bT[0]), parseInt(bT[1] - 1, 10), parseInt(bT[2], 10));
        if (bT.length >= 6) {
            bR.setHours(bT[3], bT[4], bT[5])
        }
        return bR
    }
    Date.prototype.format = function (bS) {
        var bT = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            S: this.getMilliseconds()
        };
        if (/(y+)/.test(bS)) {
            bS = bS.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
        }
        for (var bR in bT) {
            if (new RegExp("(" + bR + ")").test(bS)) {
                bS = bS.replace(RegExp.$1, RegExp.$1.length == 1 ? bT[bR] : ("00" + bT[bR]).substr(("" + bT[bR]).length))
            }
        }
        return bS
    };

    function at(bT, bS) {
        var bR = new Date(Date.parse(bT.replace(/-/g, "/")));
        bR.setDate(bR.getDate() + bS);
        return I(bR)
    }

    function I(bS) {
        var bT = bS.getFullYear();
        var bV = bS.getMonth() + 1;
        var bU = bS.getDate();
        var bR = bT + "-" + bV + "-" + bU;
        return bR
    }

    function bg() {
        var bT = $("#train_date").val();
        var bS = $("#back_train_date").val();
        var bR = false;
        if ($("#wf").is(":checked")) {
            if (v(bT) <= v(bS)) {
                bR = true
            }
        } else {
            return true
        }
        return bR
    }

    function bJ() {
        var bU = $.jc_getFromStation();
        if (bU) {
            var bT = bU.split(",");
            if (bT && bT.length == 2) {
                $("#fromStationText").val(bT[0]);
                $("#fromStation").val(bT[1])
            }
        }
        var bS = $.jc_getToStation();
        if (bS) {
            var bT = bS.split(",");
            if (bT && bT.length == 2) {
                $("#toStationText").val(bT[0]);
                $("#toStation").val(bT[1])
            }
        }
        var bV = [];
        bV = stu_buy_date.split("&");
        var bR = $.jc_getFromDate();
        if (bR) {
            if (bR >= bV[0] && bR <= bV[1]) {
                $("#train_date").val(bR)
            }
        }
        var bW = $.jc_getWfOrDc();
        if (bW && "wf" == bW) {
            $("#wf").click();
            var bX = $.jc_getToDate();
            if (bX) {
                if (bX >= bV[0] && bX <= bV[1]) {
                    $("#back_train_date").val(bX)
                }
            }
        } else {
            $("#dc").click()
        }
    }

    function aG() {
        $("#train_stop").on("mouseover", function (bR) {
            if (checkHover(bR, this)) {
                bz = 1
            }
        }).on("mouseleave", function () {
            bz = 0;
            $("#train_stop").hide();
            $("#train_table_").html("")
        })
    }

    function e() {
        fromStation = from_station;
        fromStationName = from_station_name;
        toStation = to_station;
        toStationName = to_station_name;
        trainDate = trainDate;
        backTrainDate = backTrainDate;
        be = new Array();
        a3 = new Array();
        G = new Array()
    }

    function l() {
        $("#fromStation").val(fromStation);
        $("#fromStationText").val(fromStationName);
        $("#toStation").val(toStation);
        $("#toStationText").val(toStationName);
        $("#train_date").val(trainDate);
        if (isInMaintenanceHours) {
            $("#autoSubmit").prop("checked", false);
            $("#autoSubmit").attr("disabled", true);
            $("#autoSubmit").siblings("label").css("color", "#999");
            $("#autoSubmitTxt").attr("title", "系统维护时间下不允许自动提交");
            $("#partSubmit").prop("checked", false);
            $("#partSubmit").attr("disabled", true);
            $("#partSubmit").siblings("label").css("color", "#999");
            $("#partSubmitTxt").attr("title", "系统维护时间下不允许自动提交");
            $("#auto_query").prop("checked", false);
            $("#auto_query").attr("disabled", true);
            $("#auto_query").siblings("label").css("color", "#999");
            $("#autoQueryTxt").attr("title", "系统维护时间下不允许自动查询")
        }
        if (backTrainDate != null && backTrainDate != "") {
            $("#back_train_date").val(backTrainDate)
        }
        if ($("#fromStationText").val() == "") {
            $("#fromStationText").val("简拼/全拼/汉字")
        }
        if ($("#toStationText").val() == "") {
            $("#toStationText").val("简拼/全拼/汉字")
        }
        if (page_show_flag == null) {
            aB();
            bJ()
        } else {
            if (page_show_flag == "index") {
                a2()
            } else {
                if (page_show_flag == "preStep") {
                    bF()
                } else {
                    if (page_show_flag == "fcInit") {
                        p();
                        $("#autoSubmit").attr("disabled", true);
                        $("#autoSubmit").siblings("label").css("color", "#999");
                        $("#partSubmit").attr("disabled", true);
                        $("#partSubmit").siblings("label").css("color", "#999")
                    } else {
                        if (page_show_flag == "gcInit") {
                            a4();
                            $("#autoSubmit").attr("disabled", true);
                            $("#autoSubmit").siblings("label").css("color", "#999");
                            $("#partSubmit").attr("disabled", true);
                            $("#partSubmit").siblings("label").css("color", "#999")
                        }
                    }
                }
            }
        }
    }

    function a2() {
        if (tour_flag == "wf") {
            $("#wf").click()
        } else {
            if (tour_flag == "dc") {
                $("#dc").click()
            }
        } if (purposeCodeFromIndex == "0X00") {
            $("#sf2").click()
        } else {
            if (purposeCodeFromIndex == "ADULT") {
                $("#sf1").click()
            }
        }
        var bR = [];
        $("#date_range>ul>li").each(function () {
            var bS = $(this).children("span:first-child").html();
            bR.push(bS)
        });
        $("#query_ticket").click()
    }

    function bF() {
        $("#fromStationText").removeClass().addClass("inp_selected");
        $("#toStationText").removeClass().addClass("inp_selected");
        if (train_tour_flag == "dc") {
            ad(trainDate);
            $("#dc").click()
        }
        if (train_tour_flag == "wc") {
            ad(trainDate);
            $("#wf").click()
        }
        if (train_tour_flag == "fc") {
            ad(backTrainDate);
            $("#wf").click();
            $("#wf").attr("disabled", "true");
            $("#dc").attr("disabled", "true");
            $("#change_station").removeClass().addClass("i-change i-change2");
            $("#change_station").attr("style", "");
            $("#fromStationText").attr("title", "返程时不得变更出发地或不能变更到达地");
            $("#toStationText").attr("title", "返程时不得变更出发地或不能变更到达地");
            $("#toStationText").unbind("focus").unbind("click").attr("readonly", "true");
            $("#fromStationText").unbind("focus").unbind("click").attr("readonly", "true");
            $("#dfc>ul>li:nth-child(2)").children("label:first").removeClass().addClass("color999");
            $("#dfc>ul>li:nth-child(1)").children("label:first").removeClass().addClass("color999");
            $("#place_area>ul>li:nth-child(1)").addClass("no-change");
            $("#place_area>ul>li:nth-child(3)").addClass("no-change");
            $("#place_area>ul>li:nth-child(4)").addClass("no-change");
            $("#fromStationText").removeClass().addClass("inp-txt");
            $("#toStationText").removeClass().addClass("inp-txt");
            $("#change_station").unbind();
            $("#train_date").val(trainDate);
            $("#train_date").attr("readonly", "true");
            $("#train_date").removeClass().addClass("inp-txt");
            $("#train_date").unbind("click");
            $("#date_icon_1").unbind("click");
            $("#date_area>ul>li:nth-child(1)>span>label").addClass("color999");
            $("#back_train_date").val(backTrainDate);
            $("#back_train_date").removeAttr("disabled");
            $("#date_area>ul>li:nth-child(2)>span>label").removeClass("color999");
            $("#back_train_date").removeClass().addClass("inp_selected");
            $("#autoSubmit").attr("disabled", true);
            $("#autoSubmit").siblings("label").css("color", "#999");
            $("#partSubmit").attr("disabled", true);
            $("#partSubmit").siblings("label").css("color", "#999")
        }
        if (train_tour_flag == "gc") {
            ad(trainDate);
            a4();
            $("#autoSubmit").attr("disabled", true);
            $("#autoSubmit").siblings("label").css("color", "#999");
            $("#partSubmit").attr("disabled", true);
            $("#partSubmit").siblings("label").css("color", "#999")
        }
    }

    function ad(bT) {
        for (var bR = 1; bR <= 20; bR++) {
            var bS = $("#date_range>ul>li:nth-child(" + bR + ")").children("span:first-child").text();
            bS = "2013-" + bS;
            if (bT == bS) {
                $("#date_range>ul>li").removeClass("sel");
                $("#date_range>ul>li").removeAttr("alt");
                $("#date_range>ul>li:nth-child(" + bR + ")").addClass("sel");
                $("#date_range>ul>li:nth-child(" + bR + ")").attr("alt", "show");
                $("#date_range>ul>li:nth-child(20)").addClass("end");
                $("#date_range>ul>li:nth-child(" + bR + ")").children("span:first-child").removeClass();
                $("#date_range>ul>li:nth-child(" + bR + ")").children("span:last-child").removeClass();
                $("#date_range>ul>li:nth-child(" + bR + ")").children("span:first-child").addClass("hide");
                $("#date_range>ul>li:nth-child(1)").children().addClass("first");
                bt = $("#date_range>ul>li:nth-child(" + bR + ")").children("span:first-child").text();
                break
            }
        }
    }

    function a4() {
        $("#fromStationText").attr("title", "改签时不得变更出发地或不能变更到达地");
        $("#toStationText").attr("title", "改签时不得变更出发地或不能变更到达地");
        $("#dc").click();
        $("#wf").attr("disabled", "true");
        $("#dc").attr("disabled", "true");
        $("#place_area>ul>li:nth-child(1)").addClass("no-change");
        $("#place_area>ul>li:nth-child(3)").addClass("no-change");
        $("#place_area>ul>li:nth-child(5)").addClass("no-change");
        $("#dfc>ul>li:nth-child(1)").children("label:first").removeClass().addClass("color999");
        $("#dfc>ul>li:nth-child(2)").children("label:first").removeClass().addClass("color999");
        $("#fromStationText").unbind("focus").unbind("click").attr("readonly", "true");
        $("#toStationText").unbind("focus").unbind("click").attr("readonly", "true");
        $("#fromStationText").removeClass().addClass("inp-txt");
        $("#toStationText").removeClass().addClass("inp-txt");
        $("#change_station").unbind();
        $("#change_station").removeClass().addClass("i-change i-change2");
        $("#change_station").attr("style", "");
        $("#fromStationText_label").addClass("color999");
        $("#toStationText_label").addClass("color999")
    }

    function p() {
        $("#fromStationText").attr("title", "订返程票时不得变更出发地或不能变更到达地");
        $("#toStationText").attr("title", "订返程票时不得变更出发地或不能变更到达地");
        ad(backTrainDate);
        $("#wf").click();
        $("#dc").attr("disabled", "true");
        $("#wf").attr("disabled", "true");
        $("#place_area>ul>li:nth-child(1)").addClass("no-change");
        $("#place_area>ul>li:nth-child(3)").addClass("no-change");
        $("#place_area>ul>li:nth-child(4)").addClass("no-change");
        $("#dfc>ul>li:nth-child(1)").children("label:first").removeClass().addClass("color999");
        $("#dfc>ul>li:nth-child(2)").children("label:first").removeClass().addClass("color999");
        $("#train_date").attr("readonly", "true");
        $("#train_date").addClass("color999");
        $("#train_date").attr("disabled", true);
        $("#train_date").unbind("click");
        $("#date_icon_1").unbind("click");
        $("#date_area>ul>li:nth-child(1)>span>label").addClass("color999");
        $("#back_train_date").removeAttr("disabled");
        $("#date_area>ul>li:nth-child(2)>span>label").removeClass("color999");
        $("#train_date").removeClass().addClass("inp-txt");
        $("#back_train_date").removeClass().addClass("inp_selected");
        $("#fromStationText").unbind("focus").unbind("unfocus").unbind("click").attr("readonly", "true");
        $("#toStationText").unbind("focus").unbind("unfocus").unbind("click").attr("readonly", "true");
        $("#fromStationText").removeClass().addClass("inp-txt");
        $("#toStationText").removeClass().addClass("inp-txt");
        $("#change_station").unbind();
        $("#change_station").removeClass().addClass("i-change i-change2");
        $("#change_station").attr("style", "")
    }

    function O() {
        initPageTitle(1);
        $("#train_type_btn_all").css("cursor", "pointer");
        $("#start_time_btn_all").css("cursor", "pointer");
        $("#arrive_time_btn_all").css("cursor", "pointer");
        $("#seat_type_btn_all").css("cursor", "pointer");
        $("#from_station_name_all").css("cursor", "pointer");
        $("#to_station_name_all").css("cursor", "pointer");
        $("#change_station").css("cursor", "pointer");
        $("#show_more").css("cursor", "pointer");
        $("#date_normal").css("cursor", "pointer");
        $("#lookup").css("cursor", "pointer");
        $("#s_time").css("cursor", "pointer");
        $("#r_time").css("cursor", "pointer");
        $("#l_s").css("cursor", "pointer");
        $("#other_span_starttime").css("cursor", "pointer");
        $("#other_span_endtime").css("cursor", "pointer");
        $("#other_span_lishi").css("cursor", "pointer");
        $("#date_range>ul>li").children("span:nth-child(1)").css("cursor", "pointer");
        $("#cc_seat_type_btn_all>ul>li").hide();
        $("#train_date").removeClass().addClass("inp_selected");
        if ($("#fromStationText").val() != "" && $("#fromStationText").val() != "简拼/全拼/汉字" || $("#toStationText").val() != "" && $("#toStationText").val() != "简拼/全拼/汉字") {
            $("#fromStationText").removeClass().addClass("inp_selected");
            $("#toStationText").removeClass().addClass("inp_selected")
        }
        var bR = stu_start_train_date.split("&");
        var bS = stu_end_tain_date.split("&")
    }

    function bH(bS) {
        var bR = ("00" + (bS.getMonth() + 1)).slice(-2) + "-";
        bR += ("00" + bS.getDate()).slice(-2) + " 00:00:00";
        return bR
    }

    function t() {
        $("#dc").click(function () {
            $("#wf").attr("checked", false);
            $("#dc").attr("checked", "true");
            $("#place_area>ul>li:nth-child(5)").addClass("no-change");
            $("#back_train_date").removeClass().addClass("inp-txt");
            $("#back_train_date").attr("disabled", true)
        });
        $("#wf").click(function () {
            $("#dc").attr("checked", false);
            $("#wf").attr("checked", true);
            $("#back_train_date").removeAttr("disabled");
            $("#place_area>ul>li:nth-child(5)").removeClass();
            $("#train_date").removeClass().addClass("inp_selected");
            $("#back_train_date").removeClass().addClass("inp_selected");
            isbigdate = bg();
            if (!isbigdate) {
                train = $("#train_date").val();
                $("#back_train_date").val(train)
            }
            var bR = $("#train_date").val()
        })
    }

    function aK() {
        $("#avail_ticket").click(function () {
            $("#filterTic").attr("checked", false);
            aq()
        });
        $("#train_type_btn_all").click(function () {
            var bR = true;
            $("#sear-sel-bd input[name='cc_type']").each(function () {
                if (!this.checked) {
                    bR = false
                }
            });
            if (bR) {
                $("#sear-sel-bd input[name='cc_type']").each(function () {
                    this.checked = false
                });
                $("#train_type_btn_all").removeClass().addClass("btn-all")
            } else {
                $("#sear-sel-bd input[name='cc_type']").each(function () {
                    if (!this.checked) {
                        this.checked = true
                    }
                });
                $("#train_type_btn_all").removeClass().addClass("btn-all")
            }
            aq()
        });
        $("#start_time_btn_all").click(function () {
            var bR = true;
            $("#sear-sel-bd input[name='cc_start_time']").each(function () {
                if (!this.checked) {
                    bR = false
                }
            });
            if (bR) {
                $("#sear-sel-bd input[name='cc_start_time']").each(function () {
                    this.checked = false
                });
                $("#start_time_btn_all").removeClass().addClass("btn-all")
            } else {
                $("#sear-sel-bd input[name='cc_start_time']").each(function () {
                    if (!this.checked) {
                        this.checked = true
                    }
                });
                $("#start_time_btn_all").removeClass().addClass("btn-all")
            }
            aq()
        });
        $("#from_station_name_all").click(function () {
            var bR = true;
            $("#sear-sel-bd input[name='cc_from_station']").each(function () {
                if (!this.checked) {
                    bR = false
                }
            });
            if (bR) {
                $("#sear-sel-bd input[name='cc_from_station']").each(function () {
                    this.checked = false;
                    h(be, "cc_from_station_" + $(this).val())
                });
                $("#from_station_name_all").removeClass().addClass("btn-all")
            } else {
                $("#sear-sel-bd input[name='cc_from_station']").each(function () {
                    if (!this.checked) {
                        this.checked = true;
                        h(be, "cc_from_station_" + $(this).val())
                    }
                });
                $("#from_station_name_all").removeClass().addClass("btn-all")
            }
            aq()
        });
        $("#to_station_name_all").click(function () {
            var bR = true;
            $("#sear-sel-bd input[name='cc_to_station']").each(function () {
                if (!this.checked) {
                    bR = false
                }
            });
            if (bR) {
                $("#sear-sel-bd input[name='cc_to_station']").each(function () {
                    this.checked = false;
                    h(a3, "cc_to_station_" + $(this).val())
                });
                $("#to_station_name_all").removeClass().addClass("btn-all")
            } else {
                $("#sear-sel-bd input[name='cc_to_station']").each(function () {
                    if (!this.checked) {
                        this.checked = true;
                        h(a3, "cc_to_station_" + $(this).val())
                    }
                });
                $("#to_station_name_all").removeClass().addClass("btn-all")
            }
            aq()
        })
    }

    function bv() {
        $("#change_station").bind("click", function () {
            var bV = $("#fromStationText").val();
            var bX = $("#fromStation").val();
            var bW = $("#toStationText").val();
            var bR = $("#toStation").val();
            if ((bV != "" && bV != "简拼/全拼/汉字") && (bW != "" && bW != "简拼/全拼/汉字")) {
                $("#fromStationText").val(bW);
                $("#toStationText").val(bV);
                $("#fromStation").val(bR);
                $("#toStation").val(bX);
                $("#fromStationText").removeClass().addClass("inp_selected");
                $("#toStationText").removeClass().addClass("inp_selected")
            } else {
                aR.checkForm();
                aR.hideErrors();
                var bU = aR.errorList;
                for (var bT = 0; bT < bU.length; bT++) {
                    var bS = bU[bT];
                    $(bS.element).next().addClass("error")
                }
                aR.checkForm()
            }
            bn()
        })
    }

    function bn() {
        if ($("#fromStationText").val() == "简拼/全拼/汉字") {
            $.stationFor12306.from_to_station_class_gray($("#fromStationText"))
        } else {
            $.stationFor12306.from_to_station_class_plain($("#fromStationText"))
        } if ($("#toStationText").val() == "简拼/全拼/汉字") {
            $.stationFor12306.from_to_station_class_gray($("#toStationText"))
        } else {
            $.stationFor12306.from_to_station_class_plain($("#toStationText"))
        }
    }

    function bd() {
        $("#show_more").click(function () {
            if ($("#sear-sel-bd").height() == 17) {
                ag();
                $("#show_more").attr("class", "up")
            } else {
                document.getElementById("sear-sel-bd").style.height = "17px";
                $("#show_more").attr("class", "down");
                $("#show_more").parent().css("top", "59px")
            }
        })
    }

    function k() {
        if ($("#sear-sel-bd").height() != 17) {
            ag()
        }
    }

    function ag() {
        var bT = "17px";
        var bV = 179;
        var bU = 28;
        var bR = $("#sear-sel-bd input[name='cc_from_station']").length;
        var bW = $("#sear-sel-bd input[name='cc_to_station']").length;
        var bS = $("#sear-sel-bd input[name='cc_seat_type']").length;
        if (bR > 7 && bR <= 14) {
            bT = (bV + bU) + "px"
        } else {
            if (bW > 7 && bR <= 14) {
                bT = (bV + bU * 2) + "px"
            } else {
                if (bS > 7) {
                    bT = (bV + bU) + "px"
                } else {
                    bT = bV + "px"
                }
            }
        }
        document.getElementById("sear-sel-bd").style.height = bT;
        $("#show_more").parent().css("top", "221px")
    }

    function c() {
        if (train_tour_flag == "fc" || train_tour_flag == "gc") {
            return
        }
        $.stationFor12306.init(["fromStation", "toStation"], {
            _init_input: "简拼/全拼/汉字",
            _top_4_initInput: "简拼/全拼/汉字或↑↓",
            _unselected_class: "inpt_unselected",
            _selected_class: "inp_selected",
            confirmCallBack: function (bR, bS) {
                bR.removeClass("error");
                if (bR.attr("id") == "fromStationText") {
                    if (ccSelected.length > 0) {
                        if (bR.val() != br) {
                            $("#prior_train span:gt(0)").remove();
                            $("#inp-train").css("color", "#999");
                            $("#inp-train").val("  请输入");
                            ccSelected = [];
                            $("#prior_seat span:gt(0)").remove();
                            $("#seat-list input").prop("checked", false);
                            xbChecked = []
                        }
                    }
                    br = bR.val()
                }
                if (bR.attr("id") == "toStationText") {
                    if (ccSelected.length > 0) {
                        if (bR.val() != bE) {
                            $("#prior_train span:gt(0)").remove();
                            $("#inp-train").css("color", "#999");
                            $("#inp-train").val("  请输入");
                            ccSelected = [];
                            $("#prior_seat span:gt(0)").remove();
                            $("#seat-list input").prop("checked", false);
                            xbChecked = []
                        }
                    }
                    bE = bR.val()
                }
            }
        });
        $("#fromStation_icon_image").css("cursor", "pointer");
        $("#toStation_icon_image").css("cursor", "pointer");
        $("#fromStationText_label").click(function () {
            $("#fromStationText").focus()
        });
        $("#toStationText_label").click(function () {
            $("#toStationText").focus()
        });
        $("#fromStation_icon_image").click(function () {
            $("#fromStationText").focus()
        });
        $("#toStation_icon_image").click(function () {
            $("#toStationText").focus()
        })
    }

    function bP() {
        aR = $("#queryLeftForm").validate({
            rules: {
                "leftTicketDTO.from_station": {
                    required: true
                },
                "leftTicketDTO.to_station": {
                    required: true
                },
                "leftTicketDTO.train_date": {
                    required: true
                },
                back_train_date: {
                    required: true
                }
            },
            ignore: "",
            onsubmit: false,
            onfocusout: function () {},
            onkeyup: function () {},
            onclick: function () {},
            highlight: function () {},
            unhighlight: function () {}
        });
        bm()
    }

    function b(bR) {
        dhtmlx.alert({
            title: "提示",
            ok: messages["button.ok"],
            text: bR,
            type: "alert-error",
            callback: function () {}
        })
    }

    function bk(bS, bY) {
        var bR = aR.checkForm();
        aR.hideErrors();
        if (bR) {
            var bX = "";
            if ($.trim($("#fromStation").val()) == $.trim($("#toStation").val()) || $.trim($("#fromStationText").val()) == $.trim($("#toStationText").val())) {
                bX = "出发地和目的地不能相同";
                b(bX);
                return false
            }
            if (!bg()) {
                bX = "返回日期不得早于出发日期";
                b(bX);
                return false
            }
            var bV = [];
            if (bY) {
                bV = stu_buy_date.split("&")
            } else {
                bV = other_buy_date.split("&")
            } if (bV.length > 0) {
                if (bS < bV[0] || bS > bV[1]) {
                    bX = "您选择的日期不在预售期范围内！";
                    b(bX);
                    return false
                }
            }
        } else {
            var bW = aR.errorList;
            for (var bU = 0; bU < bW.length; bU++) {
                var bT = bW[bU];
                $(bT.element).next().addClass("error")
            }
            return false
        }
        bI();
        return true
    }

    function bI() {
        $.jc_setFromStation($("#fromStationText").val(), $("#fromStation").val());
        $.jc_setToStation($("#toStationText").val(), $("#toStation").val());
        $.jc_setFromDate($("#train_date").val());
        $.jc_setToDate($("#back_train_date").val());
        $.jc_setWfOrDc($("#wf").is(":checked") ? "wf" : "dc")
    }

    function bm() {
        $("#query_ticket").click(function (bV) {
            if ($jpopup.isShow()) {
                $jpopup.quickHide()
            }
            if (myStopStation) {
                myStopStation.close()
            }
            if ($("#auto_query").is(":checked")) {
                var bU = $.trim($("#inp-train").val()).toUpperCase();
                if (bU.length != 0 && bU != "请输入") {
                    dhtmlx.alert({
                        title: "输入车次",
                        ok: "确定",
                        text: "您输入的优先车次未添加，请点击车次输入框后的添加按钮，或者取消车次输入框中的内容！",
                        type: "alert-error",
                        callback: function () {
                            ccInputSelected = true;
                            $("#inp-train").select()
                        }
                    });
                    return
                }
            }
            W();
            if (document.getElementById("autoSubmit").checked) {
                if (passengerChecked.length == 0) {
                    dhtmlx.alert({
                        title: "选择乘车人",
                        ok: "确定",
                        text: "请选择乘车人",
                        type: "alert-error",
                        callback: function () {
                            return
                        }
                    });
                    return
                }
            }
            r = bO();
            var bW = r == "0X00" ? true : false;
            var bS = train_tour_flag == "fc" ? $.trim($("#back_train_date").val()) : $.trim($("#train_date").val());
            var bR = bk(bS, bW);
            if (!bR) {
                return
            }
            var bT = {
                "leftTicketDTO.train_date": bS,
                "leftTicketDTO.from_station": $("#fromStation").val(),
                "leftTicketDTO.to_station": $("#toStation").val(),
                purpose_codes: r
            };
            aB();
            X(bT)
        })
    }
    var aV = function () {
        if ($("#filterTic").is(":checked")) {
            $("#avail_ticket").attr("checked", false);
            au();
            if (bl.length != 0 && bl.length < aO.length) {
                $("#trainum").html(bl.length);
                am(bl)
            }
        } else {
            bq = aS();
            if (bl.length != 0 && bl.length < bq.length) {
                $("#trainum").html(bq.length);
                am(bq)
            }
        }
    };

    function X(bR) {
        $("#cc_seat_type_btn_all>ul>li").css("display", "none");
        if ($("#auto_query").is(":checked")) {
            $("#query_ticket").html("停止查询");
            $("#auto_query").attr("disabled", "true");
            $("#autoSubmit").attr("disabled", "true");
            $("#partSubmit").attr("disabled", "true");
            $("#query_ticket").unbind("click");
            $("#query_ticket").bind("click", function () {
                $("#filterTic").hide();
                clearInterval(aF);
                if (countDown) {
                    clearInterval(countDown)
                }
                $("#filterTicDiv").html("");
                $("#query_ticket").unbind("click");
                $("#query_ticket").html("查询");
                if ($("#dc").is(":checked")) {
                    $("#autoSubmit").removeAttr("disabled");
                    $("#partSubmit").removeAttr("disabled")
                }
                $("#auto_query").removeAttr("disabled");
                bm()
            })
        } else {
            if (countDown) {
                clearInterval(countDown)
            }
            $("#filterTicDiv").html("");
            bp()
        }
        var bS = dhtmlx.modalbox({
            targSrc: '<div><img src="' + ctx + 'resources/images/loading.gif"></img></div>',
            callback: function () {}
        });
        if ($jpopup.isShow()) {
            $jpopup.quickHide()
        }
        if (aF) {
            clearInterval(aF)
        }
        $.ajax({
            type: "get",
            isTakeParam: false,
            beforeSend: function (bT) {
                bT.setRequestHeader("If-Modified-Since", "0");
                bT.setRequestHeader("Cache-Control", "no-cache")
            },
            url: ctx + "leftTicket/query",
            data: bR,
            timeout: 10000,
            error: function (bT, bV, bU) {
                dhtmlx.modalbox.hide(bS);
                if ("timeout" == bV || "No Transport" == bV || "abort" == bV) {
                    X(bR)
                }
            },
            success: function (bV) {
                dhtmlx.modalbox.hide(bS);
                if (bV.status) {
                    if (bV.data == null || bV.data.length == 0) {
                        $("#sear-sel").hide();
                        $("#sear-result").hide();
                        $("#t-list").hide();
                        $("#no_filter_ticket_fromstation").html($("#fromStationText").val());
                        $("#no_filter_ticket_tostation").html($("#toStationText").val());
                        $("#no_filter_ticket_2").show();
                        $(".content").css("min-height", "344px");
                        return
                    }
                    $("#sear-sel").show();
                    $("#sear-result").show();
                    $("#t-list").show();
                    $("#no_filter_ticket_2").hide();
                    if (train_tour_flag != null && train_tour_flag == "fc") {
                        var bU = "<strong>".concat($("#fromStationText").val()).concat(" --> ").concat($("#toStationText").val()).concat("（").concat(ap($("#back_train_date").val())).concat('）</strong>共计<strong id="trainum">').concat(bV.data.length).concat("</strong>个车次");
                        if ($("#auto_query").is(":checked")) {
                            var bT = "";
                            for (var bW = 0; bW < 55; bW++) {
                                bT = bT + "&nbsp;"
                            }
                            bU = bU.concat(bT + "<input type='checkbox' class='check' id='filterTic' /><div id='filterTicDiv' style='display:inline'><strong><label for='filterTic' style='cursor: pointer;'>仅查看刷到车次</label></strong></div>")
                        }
                        $("#sear-result>p").html(bU);
                        if ($("#auto_query").is(":checked")) {
                            $("#filterTic").bind("click", aV)
                        }
                    } else {
                        var bU = "<strong>".concat($("#fromStationText").val()).concat(" --> ").concat($("#toStationText").val()).concat("（").concat(ap($("#train_date").val())).concat('）</strong>共计<strong id="trainum">').concat(bV.data.length).concat("</strong>个车次");
                        if ($("#auto_query").is(":checked")) {
                            var bT = "";
                            for (var bW = 0; bW < 55; bW++) {
                                bT = bT + "&nbsp;"
                            }
                            bU = bU.concat(bT + "<input type='checkbox' class='check' id='filterTic' /><div id='filterTicDiv' style='display:inline'><strong><label for='filterTic' style='cursor: pointer;'>仅查看刷到车次</label></strong></div>")
                        }
                        $("#sear-result>p").html(bU);
                        if ($("#auto_query").is(":checked")) {
                            $("#filterTic").bind("click", aV)
                        }
                    }
                    aO = bV.data;
                    a1(aO);
                    k();
                    bi(aO);
                    bo();
                    E()
                }
            }
        });
        aE()
    }

    function R() {
        $("#date_range>ul>li").each(function (bU) {
            var bS = fullDateArr[bU];
            var bR = new Date(Date.parse(bS.replace(/-/g, "/")));
            var bT = $("#date_range>ul>li:nth-child(" + (bU + 1) + ")>span[class=hide]").text().substring(0, 5) + aZ(bR);
            $("#date_range>ul>li:nth-child(" + (bU + 1) + ")>span[class=hide]").text(bT)
        });
        if (index_train_date == null) {
            $("#date_range>ul>li:nth-child(1)").addClass("sel");
            $("#date_range>ul>li:nth-child(1)").attr("alt", "show");
            $("#date_range>ul>li:nth-child(20)").addClass("end");
            $("#date_range>ul>li:nth-child(1)").children("span:first-child").removeClass();
            $("#date_range>ul>li:nth-child(1)").children("span:last-child").removeClass();
            $("#date_range>ul>li:nth-child(1)").children().addClass("first");
            $("#date_range>ul>li:nth-child(1)").children("span:first-child").addClass("hide");
            bt = $("#date_range>ul>li:nth-child(1)").children("span:first-child").text()
        }
        aX()
    }

    function aZ(bS) {
        var bV = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        var bU = 0;
        for (var bT = 0; bT < bV.length; bT++) {
            if (bS.toString().indexOf(bV[bT]) > -1) {
                bU = bT + 1;
                break
            }
        }
        var bR = "";
        switch (bU) {
        case 1:
            bR = " 周一";
            break;
        case 2:
            bR = " 周二";
            break;
        case 3:
            bR = " 周三";
            break;
        case 4:
            bR = " 周四";
            break;
        case 5:
            bR = " 周五";
            break;
        case 6:
            bR = " 周六";
            break;
        case 7:
            bR = " 周日";
            break
        }
        return bR
    }

    function a0() {
        $("#date_range>ul>li").unbind("mouseover");
        $("#date_range>ul>li").unbind("mouseout");
        $("#date_range").unbind("mouseleave");
        $("#date_range>ul>li").unbind("click")
    }

    function aX() {
        $("#date_range>ul>li").bind("mouseover", function () {
            $("#date_range>ul>li").removeClass("sel");
            $("#date_range>ul>li").removeAttr("alt");
            $(this).addClass("sel");
            $(this).attr("alt", "show");
            $("#date_range>ul>li:nth-child(20)").addClass("end");
            $(this).children("span:first-child").removeClass();
            $(this).children("span:last-child").removeClass();
            $("#date_range>ul>li:nth-child(1)").children().addClass("first");
            $(this).children("span:first-child").addClass("hide")
        });
        $("#date_range>ul>li").bind("mouseout", function () {
            $("#date_range>ul>li").each(function (bR) {
                $(this).children("span:first").removeClass();
                $("#date_range>ul>li:nth-child(1)").children().addClass("first");
                $(this).children("span:last").addClass("hide")
            })
        });
        $("#date_range").bind("mouseleave", function () {
            for (var bR = 1; bR <= 20; bR++) {
                var bS = $("#date_range>ul>li:nth-child(" + bR + ")").children("span:first-child").text();
                if (bt == bS) {
                    $("#date_range>ul>li").removeClass("sel");
                    $("#date_range>ul>li").removeAttr("alt");
                    $("#date_range>ul>li:nth-child(" + bR + ")").addClass("sel");
                    $("#date_range>ul>li:nth-child(" + bR + ")").attr("alt", "show");
                    $("#date_range>ul>li:nth-child(20)").addClass("end");
                    $("#date_range>ul>li:nth-child(" + bR + ")").children("span:first-child").removeClass();
                    $("#date_range>ul>li:nth-child(" + bR + ")").children("span:last-child").removeClass();
                    $("#date_range>ul>li:nth-child(1)").children().addClass("first");
                    $("#date_range>ul>li:nth-child(" + bR + ")").children("span:first-child").addClass("hide");
                    break
                }
            }
        });
        $("#date_range>ul>li").bind("click", function () {
            var bS = new Date();
            var bV = "";
            if (train_tour_flag != null && train_tour_flag == "fc") {
                nowDate = $("#back_train_date").val();
                var bX = $(this).children("span:first-child").text();
                var bR = Number(bX.substring(0, 2));
                var bZ = new Date().getMonth();
                var bU = bS.getFullYear();
                if (bZ > bR) {
                    bU = bU + 1
                }
                $("#back_train_date").val(bU + "-" + bX);
                backTrainDate = bU + "-" + bX;
                bV = backTrainDate;
                if (!bg()) {
                    $("#back_train_date").val(nowDate);
                    b("返程日期不得小于出发日期.");
                    return
                }
            } else {
                nowDate = $("#train_date").val();
                var bX = $(this).children("span:first-child").text();
                var bR = Number(bX.substring(0, 2));
                var bZ = new Date().getMonth();
                var bU = bS.getFullYear();
                if (bZ > bR) {
                    bU = bU + 1
                }
                $("#train_date").val(bU + "-" + bX);
                trainDate = bU + "-" + bX;
                bV = trainDate;
                if (!bg()) {
                    $("#back_train_date").val($("#train_date").val())
                }
            }
            r = bO();
            var bW = r == "0X00" ? true : false;
            var bY = bk(bV, bW);
            if (!bY) {
                return
            }
            $("#date_range>ul>li").removeClass("sel");
            $("#date_range>ul>li").removeAttr("alt");
            $(this).addClass("sel");
            $(this).attr("alt", "show");
            $("#date_range>ul>li:nth-child(20)").addClass("end");
            $(this).children("span:first-child").removeClass();
            $(this).children("span:last-child").removeClass();
            $("#date_range>ul>li:nth-child(1)").children().addClass("first");
            $(this).children("span:first-child").addClass("hide");
            bt = $(this).children("span:first-child").text();
            var bT = {
                "leftTicketDTO.train_date": bV,
                "leftTicketDTO.from_station": $("#fromStation").val(),
                "leftTicketDTO.to_station": $("#toStation").val(),
                purpose_codes: bO()
            };
            X(bT)
        })
    }

    function a8() {
        $("#sear-sel-bd input[name='cc_type']").click(function () {
            var bR = $("input[name='cc_type']");
            var bS = $("input[name='cc_type']:checked");
            if ($(this).is(":checked")) {
                if (bR && bS && bS.length == bR.length) {
                    $("#train_type_btn_all").removeClass().addClass("btn-all")
                } else {
                    $("#train_type_btn_all").removeClass().addClass("btn-all btn-all-sel")
                }
            } else {
                if (bR && bS && bS.length == 0) {
                    $("#train_type_btn_all").removeClass().addClass("btn-all")
                } else {
                    $("#train_type_btn_all").removeClass().addClass("btn-all btn-all-sel")
                }
            }
            aq()
        });
        $("#sear-sel-bd input[name='cc_start_time']").click(function () {
            var bR = $("input[name='cc_start_time']");
            var bS = $("input[name='cc_start_time']:checked");
            if ($(this).is(":checked")) {
                if (bR && bS && bS.length == bR.length) {
                    $("#start_time_btn_all").removeClass().addClass("btn-all")
                } else {
                    $("#start_time_btn_all").removeClass().addClass("btn-all btn-all-sel")
                }
            } else {
                if (bR && bS && bS.length == 0) {
                    $("#start_time_btn_all").removeClass().addClass("btn-all")
                } else {
                    $("#start_time_btn_all").removeClass().addClass("btn-all btn-all-sel")
                }
            }
            aq()
        });
        $("#sear-sel-bd input[name='cc_arrive_time']").click(function () {
            var bR = $("input[name='cc_arrive_time']");
            var bS = $("input[name='cc_arrive_time']:checked");
            if ($(this).is(":checked")) {
                if (bR && bS && bS.length == bR.length) {
                    $("#arrive_time_btn_all").removeClass().addClass("btn-all")
                } else {
                    $("#arrive_time_btn_all").removeClass().addClass("btn-all btn-all-sel")
                }
            } else {
                if (bR && bS && bS.length == 0) {
                    $("#arrive_time_btn_all").removeClass().addClass("btn-all")
                } else {
                    $("#arrive_time_btn_all").removeClass().addClass("btn-all btn-all-sel")
                }
            }
            aq()
        });
        $("#cc_start_time").change(function () {
            aq()
        })
    }

    function J(bT, bS) {
        if (bS.length == 0) {
            return true
        }
        for (var bR = 0; bR < bS.length; bR++) {
            if (bT.queryLeftNewDTO.station_train_code.substring(0, 1) == bS[bR]) {
                return true
            }
            if (bS[bR] == "QT") {
                if (bT.queryLeftNewDTO.station_train_code.substring(0, 1) != "G" && bT.queryLeftNewDTO.station_train_code.substring(0, 1) != "D" && bT.queryLeftNewDTO.station_train_code.substring(0, 1) != "C" && bT.queryLeftNewDTO.station_train_code.substring(0, 1) != "T" && bT.queryLeftNewDTO.station_train_code.substring(0, 1) != "K" && bT.queryLeftNewDTO.station_train_code.substring(0, 1) != "Z") {
                    return true
                }
            }
            if (bS[bR] == "G") {
                if (bT.queryLeftNewDTO.station_train_code.substring(0, 1) == "C" || bT.queryLeftNewDTO.station_train_code.substring(0, 1) == "G") {
                    return true
                }
            }
        }
        return false
    }

    function ar(bU, bW) {
        if (bW.length == 0) {
            return true
        }
        for (var bR = 0; bR < bW.length; bR++) {
            var bV = (bU.queryLeftNewDTO.start_time.replace(":", ""));
            var bS = Number(bW[bR].substring(0, 4));
            var bT = Number(bW[bR].substring(4, 8));
            if (bV >= bS && bV <= bT) {
                return true
            }
        }
        return false
    }

    function az(bT, bR) {
        if (bR.length == 0) {
            return true
        }
        for (var bS = 0; bS < bR.length; bS++) {
            if (bR[bS] == "SWZ") {
                if (bT.queryLeftNewDTO.swz_num != "--" && bT.queryLeftNewDTO.swz_num != "无") {
                    ao.push("SWZ");
                    return true
                }
            }
            if (bR[bS] == "TZ") {
                if (bT.queryLeftNewDTO.tz_num != "--" && bT.queryLeftNewDTO.tz_num != "无") {
                    ao.push("TZ");
                    return true
                }
            }
            if (bR[bS] == "ZY") {
                if (bT.queryLeftNewDTO.zy_num != "--" && bT.queryLeftNewDTO.zy_num != "无") {
                    ao.push("ZY");
                    return true
                }
            }
            if (bR[bS] == "ZE") {
                if (bT.queryLeftNewDTO.ze_num != "--" && bT.queryLeftNewDTO.ze_num != "无") {
                    ao.push("ZE");
                    return true
                }
            }
            if (bR[bS] == "GR") {
                if (bT.queryLeftNewDTO.gr_num != "--" && bT.queryLeftNewDTO.gr_num != "无") {
                    ao.push("GR");
                    return true
                }
            }
            if (bR[bS] == "RW") {
                if (bT.queryLeftNewDTO.rw_num != "--" && bT.queryLeftNewDTO.rw_num != "无") {
                    ao.push("RW");
                    return true
                }
            }
            if (bR[bS] == "YW") {
                if (bT.queryLeftNewDTO.yw_num != "--" && bT.queryLeftNewDTO.yw_num != "无") {
                    ao.push("YW");
                    return true
                }
            }
            if (bR[bS] == "RZ") {
                if (bT.queryLeftNewDTO.rz_num != "--" && bT.queryLeftNewDTO.rz_num != "无") {
                    ao.push("RZ");
                    return true
                }
            }
            if (bR[bS] == "YZ") {
                if (bT.queryLeftNewDTO.yz_num != "--" && bT.queryLeftNewDTO.yz_num != "无") {
                    ao.push("YZ");
                    return true
                }
            }
            if (bR[bS] == "WZ") {
                if (bT.queryLeftNewDTO.wz_num != "--" && bT.queryLeftNewDTO.wz_num != "无") {
                    ao.push("WZ");
                    return true
                }
            }
        }
        return false
    }

    function aN(bS, bR) {
        if (bR.length == 0) {
            return true
        }
        for (var bT = 0; bT < bR.length; bT++) {
            if (bR[bT] == bS.queryLeftNewDTO.from_station_name) {
                return true
            }
        }
        return false
    }

    function M(bR, bS) {
        if (bS.length == 0) {
            return true
        }
        for (var bT = 0; bT < bS.length; bT++) {
            if (bS[bT] == bR.queryLeftNewDTO.to_station_name) {
                return true
            }
        }
        return false
    }

    function q(bS, bR) {
        if (bR.length == 0) {
            return true
        }
        for (var bT = 0; bT < bR.length; bT++) {
            if (bR[bT].toLowerCase() == bS.queryLeftNewDTO.station_train_code.toLowerCase()) {
                return true
            }
        }
        return false
    }

    function aS() {
        var bS = [];
        var bY = [];
        var bU = [];
        var bW = [];
        $("#sear-sel-bd input[name='cc_type']").each(function () {
            if (this.checked == true) {
                bS.push($(this).val())
            }
        });
        bY.push($("#cc_start_time option:selected").val());
        $("#sear-sel-bd input[name='cc_from_station']").each(function () {
            if (this.checked == true) {
                bU.push($(this).val())
            }
        });
        $("#sear-sel-bd input[name='cc_to_station']").each(function () {
            if (this.checked == true) {
                bW.push($(this).val())
            }
        });
        var bT = aO;
        var bX = [];
        if (bS.length > 0 || bY.length > 0 || filteredTrainArriveTime.length > 0 || bs.length > 0 || bU.length > 0 || bW.length > 0 || aj.getComboText() != "" || $("#avail_ticket")[0].checked) {
            for (var bR = 0; bR < bT.length; bR++) {
                var bV = bT[bR];
                if (!J(bV, bS)) {
                    continue
                }
                if (!ar(bV, bY)) {
                    continue
                }
                if (!aN(bV, bU)) {
                    continue
                }
                if (!M(bV, bW)) {
                    continue
                }
                if ($("#avail_ticket")[0].checked) {
                    if (bV.queryLeftNewDTO.canWebBuy == "Y") {
                        bX.push(bV)
                    }
                } else {
                    bX.push(bV)
                }
            }
            bT = bX
        }
        return bT
    }

    function B(bR, bS) {
        if (bS == null || bS == "" || bR.length == 0 || bS.length > bR.length) {
            return false
        }
        if (bR.substr(0, bS.length) == bS) {
            return true
        } else {
            return false
        }
        return true
    }

    function aL(bR) {
        aU = ccSelected;
        bs = xbChecked;
        if (q(bR, aU) && az(bR, bs)) {
            return true
        } else {
            return false
        }
    }

    function au() {
        bl = [];
        bq = aS();
        by = bu(bq);
        for (var bR = 0; bR < by.length; bR++) {
            var bS = by[bR];
            if (!aL(bS)) {
                continue
            }
            if (bS.queryLeftNewDTO.canWebBuy == "Y") {
                bl.push(bS)
            }
        }
    }
    var bb;

    function bh() {
        if (ischeckAutoSubmitCode) {
            $("#randCode2").on("keyup", function (bR) {
                if ($("#randCode2").val().length == 4 && bb != $("#randCode2").val()) {
                    $.ajax({
                        url: ctx + "passcodeNew/checkRandCodeAnsyn",
                        type: "post",
                        data: {
                            randCode: $("#randCode2").val(),
                            rand: "sjrand"
                        },
                        async: false,
                        success: function (bS) {
                            if (bS.data == "N") {
                                $("#randCode2").removeClass("inptxt w100").addClass("inptxt w100 error");
                                $("#c_error2").html("验证码不合法");
                                $("#randCode2").val("");
                                $("#c_error2").addClass("error");
                                $("#i-ok2").css("display", "none");
                                $("#c_error2").css("margin-left", "15px")
                            } else {
                                bb = $("#randCode2").val();
                                $("#back_edit").trigger("click");
                                if (isAsync == ticket_submit_order.request_flag.isAsync) {
                                    n()
                                } else {
                                    bQ()
                                }
                                $("#randCode2").removeClass("inptxt w100 error").addClass("inptxt w100");
                                $("#i-ok2").css("display", "block");
                                $("#c_error2").html("");
                                $("#c_error2").removeClass("error");
                                return
                            }
                        }
                    })
                } else {
                    if ($("#randCode2").val().length != 4) {
                        $("#randCode2").removeClass("inptxt w100").addClass("inptxt w100 error");
                        $("#c_error2").html("请输入四位长度验证码");
                        $("#c_error2").addClass("error");
                        $("#i-ok2").css("display", "none");
                        $("#c_error2").css("margin-left", "15px")
                    }
                }
                bb = $("#randCode2").val()
            })
        }
    }

    function Y(bR) {
        return aw.autoSubmit(bl, passengerChecked, xbChecked, ccSelected)
    }
    var ax = false;

    function E() {
        $("#queryLeftTable").html("");
        $("#trainum").html("");
        au();
        if ($("#auto_query").is(":checked")) {
            if (by.length < 0) {
                $("#no_filter_ticket").show();
                $("#trainum").html("0");
                ax = true
            } else {
                if (bl.length > 0) {
                    $("#no_filter_ticket").hide();
                    if (document.getElementById("autoSubmit").checked) {
                        var bV = [];
                        for (var b1 = 0; b1 < passengerChecked.length; b1++) {
                            var bU = false;
                            var bY = passengerChecked[b1];
                            for (var b2 = 0; b2 < bV.length; b2++) {
                                var bS = bV[b2];
                                if (bY.passenger_name == bS.passenger_name && bY.passenger_id_type_code == bS.passenger_id_type_code && bY.passenger_id_no == bS.passenger_id_no) {
                                    bU = true;
                                    break
                                }
                            }
                            if (!bU) {
                                bV.push(bY)
                            }
                        }
                        passengerChecked = bV;
                        var b7 = Y(true);
                        if (b7[0] == 1 || b7[0] == 2) {
                            ax = true;
                            D = b7[1];
                            var b0 = bO();
                            var b4 = D.secretStr;
                            j(b7);
                            var b3 = checkusermdId != undefined ? "&_json_att=" + encodeURIComponent(checkusermdId) : "";
                            var bR = "";
                            if ($("#dc").is(":checked")) {
                                bR = "dc"
                            } else {
                                bR = "wc"
                            } if ("undefined" == typeof (submitForm)) {
                                var b8 = "secretStr=" + b4 + "&train_date=" + $("#train_date").val() + "&tour_flag=" + bR + "&purpose_codes=" + b0 + "&query_from_station_name=" + $("#fromStationText").val() + "&query_to_station_name=" + $("#toStationText").val() + "&" + b3 + "&cancel_flag=2&bed_level_order_num=000000000000000000000000000000&passengerTicketStr=" + getpassengerTicketsForAutoSubmit() + "&oldPassengerStr=" + getOldPassengersForAutoSubmit()
                            } else {
                                var bT = submitForm();
                                var bZ = bT.split(":::");
                                var b6 = bZ[0].split(",-,")[0];
                                var bX = bZ[0].split(",-,")[1];
                                var b5 = bZ[1].split(",-,")[0];
                                var bW = bZ[1].split(",-,")[1];
                                var b8 = escape(b6) + "=" + escape(bX) + "&" + b5 + "=" + bW + "&secretStr=" + b4 + "&train_date=" + $("#train_date").val() + "&tour_flag=" + bR + "&purpose_codes=" + b0 + "&query_from_station_name=" + $("#fromStationText").val() + "&query_to_station_name=" + $("#toStationText").val() + "&" + b3 + "&cancel_flag=2&bed_level_order_num=000000000000000000000000000000&passengerTicketStr=" + getpassengerTicketsForAutoSubmit() + "&oldPassengerStr=" + getOldPassengersForAutoSubmit()
                            }
                            $.ajax({
                                type: "post",
                                url: ctx + "confirmPassenger/autoSubmitOrderRequest",
                                async: false,
                                data: b8,
                                success: function (ca) {
                                    if (ca.status) {
                                        if (!ca.data.submitStatus) {
                                            if (ca.data.isRelogin) {
                                                window.location.href = ctx + "login/init?random=" + new Date().getTime()
                                            } else {
                                                if (ca.data.isNoActive) {
                                                    S(ca.data.errMsg, true, "", true, "warn")
                                                } else {
                                                    S("车票信息不合法!", true, "原因： " + ca.data.errMsg, true, "warn")
                                                }
                                            }
                                            return
                                        }
                                        if (ca.data && undefined != ca.data.result && typeof (ca.data.result) != "undefined") {
                                            var cb = ca.data.get608Msg;
                                            if (undefined != cb && typeof (cb) != "undefined" && "" != cb) {
                                                dhtmlx.alert({
                                                    title: "警告",
                                                    ok: "确定",
                                                    text: cb,
                                                    type: "alert-error",
                                                    callback: function () {
                                                        var cc = ca.data.result;
                                                        location_code = cc.split("#")[0];
                                                        md5Str = cc.split("#")[1];
                                                        leftTicketStr = cc.split("#")[2];
                                                        isAsync = cc.split("#")[3];
                                                        a5(b0, ca.data.isCheckOrderInfo, ca.data.doneHMD)
                                                    }
                                                })
                                            } else {
                                                var b9 = ca.data.result;
                                                location_code = b9.split("#")[0];
                                                md5Str = b9.split("#")[1];
                                                leftTicketStr = b9.split("#")[2];
                                                isAsync = b9.split("#")[3];
                                                a5(b0, ca.data.isCheckOrderInfo, ca.data.doneHMD)
                                            }
                                        }
                                    }
                                }
                            })
                        } else {
                            ax = false;
                            F()
                        }
                    } else {
                        ax = true
                    }
                } else {
                    ax = false;
                    F()
                }
                $("#trainum").html(by.length);
                am(by)
            }
        } else {
            if (by.length < 0) {
                ax = true;
                $("#no_filter_ticket").show();
                $("#no_filter_ticket_msg_1").show();
                $("#no_filter_ticket_msg_2").hide();
                $("#trainum").html("0");
                return
            } else {
                ax = true;
                $("#trainum").html(by.length);
                am(by)
            }
        }
    }
    var H = 0;
    var aF;

    function F() {
        var bR;
        if (rqChecked.length > 1) {
            if (H >= rqChecked.length) {
                H = 0
            }
            bR = rqChecked[H++]
        } else {
            if (train_tour_flag == "fc") {
                bR = $.trim($("#back_train_date").val())
            } else {
                bR = $.trim($("#train_date").val())
            }
        }
        clearInterval(aF);
        aF = window.setInterval(function () {
            if (train_tour_flag == "fc") {
                $("#back_train_date").val(bR)
            } else {
                $("#train_date").val(bR)
            }
            var bS = {
                "leftTicketDTO.train_date": bR,
                "leftTicketDTO.from_station": $("#fromStation").val(),
                "leftTicketDTO.to_station": $("#toStation").val(),
                purpose_codes: bO()
            };
            aB();
            X(bS)
        }, autoSearchTime)
    }

    function bw() {
        ai();
        bM(tickets_info);
        $("#i-ok2").hide();
        refreshImg("login", "sjrand", "img_rand_code2");
        $("#randCode2").val("");
        $("#c_error2").val("");
        $("#c_error2").removeClass("error");
        box = dhtmlx.createWin({
            winId: "autosubmitcheckticketinfo",
            closeWinId: ["back_edit"],
            callback: function () {
                jPlayer("stop")
            },
            okId: "qr_submit",
            okCallBack: function () {
                jPlayer("stop");
                if (isAsync == ticket_submit_order.request_flag.isAsync) {
                    n()
                } else {
                    bQ()
                }
            },
            checkConfirm: function () {
                if (!ischeckAutoSubmitCode) {
                    return true
                }
                randCode = $("#randCode2").val();
                var bR = true;
                if ("" == randCode) {
                    bR = false;
                    $("#randCode2").removeClass("inptxt w100").addClass("inptxt w100 error");
                    $("#c_error2").html(login_messages.randCodeEmpty).attr("class", "error").css("margin-left", "60px");
                    $("#randCode2").focus()
                } else {
                    if (!/^[a-zA-Z0-9]+$/.test(randCode)) {
                        bR = false;
                        $("#randCode2").removeClass("inptxt w100").addClass("inptxt w100 error");
                        $("#c_error2").html(login_messages.randCodeFormat).attr("class", "error").css("margin-left", "60px");
                        $("#randCode2").focus()
                    } else {
                        if (randCode.length != 4) {
                            bR = false;
                            $("#randCode2").removeClass("inptxt w100").addClass("inptxt w100 error");
                            $("#c_error2").html(login_messages.randCodeLentgh).attr("class", "error").css("margin-left", "60px");
                            $("#randCode2").focus()
                        }
                    }
                }
                $.ajax({
                    url: ctx + "passcodeNew/checkRandCodeAnsyn",
                    type: "post",
                    data: {
                        randCode: randCode,
                        rand: "sjrand"
                    },
                    async: false,
                    success: function (bS) {
                        if (bS.data == "N") {
                            bR = false;
                            $("#randCode2").removeClass("inptxt w100").addClass("inptxt w100 error");
                            $("#c_error2").html("验证码不合法");
                            $("#randCode2").val("");
                            $("#c_error2").addClass("error");
                            $("#i-ok2").css("display", "none")
                        } else {
                            bR = true;
                            $("#randCode2").removeClass("inptxt w100 error").addClass("inptxt w100");
                            $("#i-ok2").css("display", "block");
                            $("#c_error2").html("");
                            $("#c_error2").removeClass("error")
                        }
                    }
                });
                if (!bR) {
                    refreshImg("login", "sjrand", "img_rand_code2");
                    $("#randCode2").focus();
                    $("#c_error2").css("margin-left", "15px")
                }
                return bR
            }
        });
        $("#autosubmitcheckticketinfo").css("top", "100px");
        $(".dhx_modal_cover").css("background-color", "#EEEEEE");
        $("#randCode2").focus()
    }

    function aq() {
        if (aO.length == 0) {
            return
        }
        var bR = aS();
        var bS = bu(bR);
        $("#train_stop").appendTo($("body")).hide();
        $("#queryLeftTable").html("");
        $("#trainum").html("");
        if (bS.length > 0) {
            $("#no_filter_ticket").hide();
            $("#trainum").html(bS.length)
        } else {
            $("#no_filter_ticket").show();
            $("#no_filter_ticket_msg_1").show();
            $("#no_filter_ticket_msg_2").hide();
            $("#trainum").html("0");
            return
        }
        am(bS)
    }

    function a9(bS) {
        var bR = bG.createWindow(bS + "_", 0, 0, 660, 100);
        bR.attachObject(bS);
        bR.clearIcon();
        bR.denyResize();
        bR.setModal(true);
        bR.center();
        bR.button("park").hide();
        bR.button("minmax1").hide();
        bR.hideHeader();
        return bR
    }

    function ai() {
        var bW = new Array();
        $("#autosubmit_check_ticket_tit").html("");
        var bU = $("#train_date").val();
        var bR = aZ(new Date(Date.parse(bU.replace(/-/g, "/"))));
        var bS = D.queryLeftNewDTO.station_train_code;
        var b1 = null;
        var b2 = D.queryLeftNewDTO.from_station_name;
        var bV = D.queryLeftNewDTO.to_station_name;
        var bX = D.queryLeftNewDTO.start_time;
        var b0 = D.queryLeftNewDTO.arrive_time;
        var bZ = function (b4, b6, b3, b8, b5, b7, ca, b9) {
            this.date = b4;
            this.week = b6;
            this.station_train_code = b3;
            this.train_headers = b8;
            this.from_station = b5;
            this.start_time = b7;
            this.to_station = ca;
            this.arrive_time = b9
        };
        var bT = new bZ(bU, bR, bS, b1, b2, bX, bV, b0);
        bW.push(bT);
        var bY = $("#autoSubTicketTitTemplate").html();
        $.templates({
            leftTableTemplate: bY
        });
        $("#autosubmit_check_ticket_tit").html($.render.leftTableTemplate(bW))
    }

    function j(b2) {
        if (aF) {
            clearInterval(aF)
        }
        var bR = "";
        var bS = "";
        var bX = "";
        var bT = "";
        if ($("#sf2").is(":checked")) {
            bX = "3";
            bT = "学生票"
        }
        tickets_info = new Array();
        var b3 = b2[1];
        var bW = b2[2];
        var bV = 0;
        var bU = passengerChecked.length;
        for (var bY = 0; bY < bW.length; bY++) {
            var b0 = b3.queryLeftNewDTO[bW[bY].toLowerCase() + "_num"];
            if (b0 == "--" || b0 == "无") {
                b0 = 0
            } else {
                if (b0 == "有") {
                    b0 = 20
                } else {
                    b0 = Number(b0)
                }
            } if (bV >= bU) {
                break
            }
            var b1 = bW[bY];
            bR = ah(b1);
            bS = C(b1);
            for (var bZ = 0; bZ < b0; bZ++) {
                if (bV >= bU) {
                    break
                }
                bX = passengerChecked[bZ].passenger_type;
                if (!bX || "" == bX) {
                    bX = "1"
                }
                if (bX == "1") {
                    bT = "成人票"
                } else {
                    if (bX == "2") {
                        bT = "儿童票"
                    } else {
                        if (bX == "3") {
                            bT = "学生票"
                        } else {
                            if (bX == "4") {
                                bT = "残军票"
                            }
                        }
                    }
                }
                tickets_info.push(new aP("sdAdd_" + Z(), bR, bS, bX, bT, passengerChecked[bV].passenger_name, passengerChecked[bV].passenger_id_type_code, passengerChecked[bV].passenger_id_type_name, passengerChecked[bV].passenger_id_no, passengerChecked[bV].mobile_no));
                bV++
            }
        }
    }

    function bM(bS) {
        var bR = $("#autoSubCheckTicketInfoTemplate").html();
        $.templates({
            leftTableTemplate: bR
        });
        $("#autosubmit_check_ticketInfo").html($.render.leftTableTemplate(bS))
    }

    function g() {
        var bU = D.queryLeftNewDTO.yz_num;
        var bR = D.queryLeftNewDTO.rz_num;
        var bY = D.queryLeftNewDTO.yw_num;
        var bW = D.queryLeftNewDTO.rw_num;
        var bX = D.queryLeftNewDTO.gr_num;
        var bV = D.queryLeftNewDTO.ze_num;
        var b0 = D.queryLeftNewDTO.zy_num;
        var b1 = D.queryLeftNewDTO.tz_num;
        var bS = D.queryLeftNewDTO.swz_num;
        var bZ = D.queryLeftNewDTO.wz_num;
        var bT = "";
        if (bU != "--") {
            bT = "YZ";
            return bT
        }
        if (bV != "--") {
            bT = "ZE";
            return bT
        }
        if (bY != "--") {
            bT = "YW";
            return bT
        }
        if (b0 != "--") {
            bT = "ZY";
            return bT
        }
        if (bR != "--") {
            bT = "RZ";
            return bT
        }
        if (bW != "--") {
            bT = "RW";
            return bT
        }
        if (b1 != "--") {
            bT = "TZ";
            return bT
        }
        if (bX != "--") {
            bT = "GR";
            return bT
        }
        if (bS != "--") {
            bT = "SWZ";
            return bT
        }
        if (bZ != "--") {
            bT = "WZ";
            return bT
        }
    }

    function C(bS) {
        var bR = "";
        if (bS == "ZY") {
            bR = "一等座"
        }
        if (bS == "ZE") {
            bR = "二等座"
        }
        if (bS == "SWZ") {
            bR = "商务座"
        }
        if (bS == "TZ") {
            bR = "特等座"
        }
        if (bS == "YZ") {
            bR = "硬座"
        }
        if (bS == "RZ") {
            bR = "软座"
        }
        if (bS == "YW") {
            bR = "硬卧"
        }
        if (bS == "RW") {
            bR = "软卧"
        }
        if (bS == "GR") {
            bR = "高级软卧"
        }
        if (bS == "WZ") {
            bR = "无座"
        }
        return bR
    }

    function ah(bS) {
        var bR = "";
        if (bS == "ZY") {
            bR = "M"
        }
        if (bS == "ZE") {
            bR = "O"
        }
        if (bS == "SWZ") {
            bR = "9"
        }
        if (bS == "TZ") {
            bR = "P"
        }
        if (bS == "YZ") {
            bR = "1"
        }
        if (bS == "RZ") {
            bR = "2"
        }
        if (bS == "YW") {
            bR = "3"
        }
        if (bS == "RW") {
            bR = "4"
        }
        if (bS == "GR") {
            bR = "6"
        }
        if (bS == "WZ") {
            bR = "WZ"
        }
        return bR
    }

    function aP(bY, bT, bU, bW, bV, bS, b0, bZ, bX, bR) {
        this.only_id = bY, this.seat_type = bT;
        this.seat_type_name = bU;
        this.ticket_type = bW, this.ticket_type_name = bV;
        this.name = bS;
        this.id_type = b0;
        this.id_type_name = bZ;
        this.id_no = bX;
        this.phone_no = bR;
        this.toString = function () {
            return this.name + "_" + this.id_type + "_" + this.id_no + "_" + this.phone_no
        }
    }

    function Z() {
        if (tickets_info.length < 1) {
            return tickets_info.length
        } else {
            var bT = 0;
            for (var bS = 0; bS < tickets_info.length; bS++) {
                var bR = Number(tickets_info[bS].only_id.split("_")[1]);
                if (bR > bT) {
                    bT = bR
                }
            }
            return bT + 1
        }
    }

    function aE() {
        bl = [];
        N = [];
        ao = [];
        tickets_info = [];
        bq = [];
        by = [];
        D = "";
        isAsync = "";
        location_code = "";
        md5Str = "";
        leftTicketStr = ""
    }
    getpassengerTicketsForAutoSubmit = function () {
        var bR = "";
        for (var bS = 0; bS < tickets_info.length; bS++) {
            var bT = "";
            if ("WZ" == tickets_info[bS].seat_type) {
                bT = ah(g())
            } else {
                bT = tickets_info[bS].seat_type
            }
            var bU = bT + ",0," + tickets_info[bS].ticket_type + "," + tickets_info[bS].name + "," + tickets_info[bS].id_type + "," + tickets_info[bS].id_no + "," + (tickets_info[bS].phone_no == null ? "" : tickets_info[bS].phone_no) + ",N";
            bR += bU + "_"
        }
        return bR.substring(0, bR.length - 1)
    };
    getOldPassengersForAutoSubmit = function () {
        var bT = "";
        for (var bS = 0; bS < passengerChecked.length; bS++) {
            var bR = passengerChecked[bS].passenger_name + "," + passengerChecked[bS].passenger_id_type_code + "," + passengerChecked[bS].passenger_id_no + "," + passengerChecked[bS].passenger_type;
            bT += bR + "_"
        }
        return bT
    };
    var av = false;

    function a5(bR, bS) {
        var bW = "";
        var bT = $("#train_date").val().split("-");
        var bU = new Date();
        bU.setFullYear(bT[0], bT[1] - 1, bT[2]);
        if (isAsync == ticket_submit_order.request_flag.isAsync && leftTicketStr != "") {
            var bV = null;
            if (tickets_info[0].seat_type == "WZ") {
                if (D.queryLeftNewDTO.yz_num != "--") {
                    tickets_info[0].seat_type = "1";
                    av = true;
                    tickets_info[0].seat_type_name = "硬座"
                } else {
                    if (D.queryLeftNewDTO.ze_num != "--") {
                        tickets_info[0].seat_type = "O";
                        av = true;
                        tickets_info[0].seat_type_name = "二等座"
                    }
                }
            }
            $.ajax({
                url: ctx + "confirmPassenger/getQueueCount",
                type: "post",
                async: false,
                data: {
                    train_date: bU.toString(),
                    train_no: D.queryLeftNewDTO.train_no,
                    stationTrainCode: D.queryLeftNewDTO.station_train_code,
                    seatType: tickets_info[0].seat_type,
                    fromStationTelecode: D.queryLeftNewDTO.from_station_telecode,
                    toStationTelecode: D.queryLeftNewDTO.to_station_telecode,
                    leftTicket: leftTicketStr,
                    purpose_codes: bR,
                    isCheckOrderInfo: bS
                },
                dataType: "json",
                success: function (bZ) {
                    if (bZ.status) {
                        if (bZ.data.isRelogin == "Y") {
                            window.location.href = ctx + "login/init?random=" + new Date().getTime()
                        }
                        var b0 = null;
                        var bY = tickets_info[0].seat_type;
                        b0 = a6(bZ.data.ticket, tickets_info[0].seat_type).split(",");
                        bW = "本次列车，剩余" + (tickets_info[0].seat_type_name).split("（")[0] + "<strong>" + b0[0] + "</strong>张";
                        var bX = false;
                        if (b0.length > 1) {
                            bW += ",无座<strong>" + b0[1] + "</strong>张";
                            bX = true
                        }
                        bW += "。";
                        if (bZ.data.op_2 == "true") {
                            if ((av && !bX) || !av) {
                                ax = false;
                                F();
                                return
                            }
                            bW += "目前排队人数已经超过余票张数，请您选择其他席别或车次。"
                        } else {
                            if (bZ.data.countT > 0) {
                                bW += '目前排队人数<font color="red">' + bZ.data.countT + "</font>人，"
                            }
                        }
                        bW += "<br/>请确认以上信息是否正确，点击“确认”后，系统将为您分配席位。";
                        var b1 = $("#sy_ticket_num_id");
                        if (b1 != null) {
                            b1.html(bW)
                        }
                        $("#randCode2").focus();
                        bw()
                    }
                },
                error: function (bX, bZ, bY) {
                    return
                }
            })
        } else {
            bw()
        }
    }

    function a6(bS, bR) {
        rt = "";
        seat_1 = -1;
        seat_2 = -1;
        i = 0;
        while (i < bS.length) {
            s = bS.substr(i, 10);
            c_seat = s.substr(0, 1);
            if (c_seat == bR) {
                count = s.substr(6, 4);
                while (count.length > 1 && count.substr(0, 1) == "0") {
                    count = count.substr(1, count.length)
                }
                count = parseInt(count);
                if (count < 3000) {
                    seat_1 = count
                } else {
                    seat_2 = (count - 3000)
                }
            }
            i = i + 10
        }
        if (seat_1 > -1) {
            rt += seat_1
        }
        if (seat_2 > -1) {
            rt += "," + seat_2
        }
        return rt
    }

    function bQ() {
        $.ajax({
            url: ctx + "confirmPassenger/confirmSingle",
            type: "post",
            data: {
                passengerTicketStr: getpassengerTicketsForAutoSubmit(),
                oldPassengerStr: getOldPassengersForAutoSubmit(),
                tour_flag: "dc",
                randCode: $("#randCode").val(),
                purpose_codes: bO(),
                key_check_isChange: md5Str,
                train_location: location_code
            },
            dataType: "json",
            async: true,
            success: function (bR) {
                if (bR.status) {
                    if (bR.data.submitStatus) {
                        otsRedirect("post", ctx + "payOrder/init?random=" + new Date().getTime(), {})
                    } else {
                        S("出票失败!", false, "原因： " + bR.data.errMsg + '<a  id="xg_close_win_id">点击修改</a>', true, "lose");
                        $("#xg_close_win_id").click(function () {
                            U("transforNotice_id", true);
                            $("#i-ok").css("display", "none")
                        })
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

    function aa(bR, bT, bS) {
        if (bT <= 5) {
            S("订单已经提交，系统正在处理中，请稍等。", false, "", false, "work")
        } else {
            if (bT > 30 * 60) {
                S("订单已经提交，预计等待时间超过30分钟，请耐心等待。", false, "", false, "queue")
            } else {
                S("订单已经提交，最新预估等待时间" + bS + "，请耐心等待。", false, "", false, "queue")
            }
        }
    }

    function o(bR, bT, bS) {
        if (bT == -1) {
            $.ajax({
                url: ctx + "confirmPassenger/resultOrderForDcQueue",
                data: {
                    orderSequence_no: bS.orderId
                },
                type: "POST",
                dataType: "json",
                success: function (bU) {
                    if (bU.status) {
                        if (bU.data.submitStatus) {
                            otsRedirect("post", ctx + "/payOrder/init?random=" + new Date().getTime(), {})
                        } else {
                            S("下单成功", false, "", false, "win")
                        }
                    } else {
                        S("下单成功。", false, "", false, "win")
                    }
                },
                error: function (bU, bW, bV) {
                    S("下单成功。", false, "", false, "win")
                }
            })
        } else {
            bj(bT, bS)
        }
    }

    function bj(bR, bS) {
        if (bR == -1) {
            return
        } else {
            if (bR == -2) {
                if (bS.errorcode == 0) {
                    S("订票失败!", true, "原因： " + bS.msg, true, "lose")
                } else {
                    S("订票失败!", true, "原因： " + bS.msg, true, "lose")
                }
            } else {
                if (bR == -3) {
                    S("哎呀,订票失败!", true, "订单已撤销", true, "lose")
                } else {
                    window.location.href = ctx + "queryOrder/initNoComplete?random=" + new Date().getTime()
                }
            }
        }
    }

    function K() {
        bL = new dhtmlXWindows();
        bL.enableAutoViewport(true);
        bL.setSkin("dhx_terrace");
        bL.setImagePath(ctx + "resources/js/rich/windows/imgs/");
        U = function (bV, bU) {
            unLoadGrayBackground();
            if (bL.isWindow(bV + "_")) {
                bL.window(bV + "_").setModal(false);
                bL.window(bV + "_").hide()
            }
        };
        S = function (b1, bY, bV, bU, bX) {
            var b0 = '<div class="tit">' + (bY ? '<span class="colorC">' + b1 + "</span>" : b1) + "</div>";
            var bW = "<P>" + bV + "</p>";
            var bZ = bY ? '<p>请点击[<a href="' + ctx + 'queryOrder/init"><strong>我的12306</strong></a>]办理其他业务。您也可以点击[<a href="' + ctx + 'leftTicket/init"><strong>预订车票</strong></a>]，重新规划您的旅程。</p>' : '<P>查看订单处理情况，请点击“<a href="' + ctx + 'queryOrder/initNoComplete">未完成订单</a>”</P>';
            $("#iamge_status_id").removeClass().addClass("icon i-" + bX);
            if (bU) {
                $("#up-box-hd_id").html("提示<a id='closeTranforDialog_id' href='#nogo'>关闭</a>");
                bZ = "";
                $("#lay-btn_id").html("<a href='#nogo' id='qr_closeTranforDialog_id'  class='btn92s'>确认</a>")
            } else {
                $("#up-box-hd_id").html("提示");
                $("#lay-btn_id").html("")
            }
            $("#orderResultInfo_id").html(b0 + (bV == "" || bV == null || bV == "undefined" || bV == undefined ? "" : bW) + bZ);
            bR("transforNotice_id");
            if (bU) {
                $("#closeTranforDialog_id").click(function () {
                    U("transforNotice_id", true)
                });
                $("#qr_closeTranforDialog_id").click(function () {
                    U("transforNotice_id", true);
                    $("#i-ok").css("display", "none")
                })
            }
        };

        function bR(bY) {
            U(bY, false);
            if ("checkticketinfo_id" == bY) {
                var bW = ticketInfoForPassengerForm.queryLeftNewDetailDTO;
                if (bW.to_station_telecode == ticket_submit_order.special_areas.lso || bW.to_station_telecode == ticket_submit_order.special_areas.dao || bW.to_station_telecode == ticket_submit_order.special_areas.ado || bW.to_station_telecode == ticket_submit_order.special_areas.nqo || bW.to_station_telecode == ticket_submit_order.special_areas.tho) {
                    if (bS()) {
                        $("#notice_1_id").html("1.系统将随机为您申请席位，暂不支持自选席位。");
                        $("#notice_2_id").html("2.根据现行规定，外国人在购买进西藏火车票时，须出示西藏自治区外事办公室或旅游局、商务厅的批准函（电），或者出示中国内地司局级接待单位出具的、已征得自治区上述部门同意的证明信函。台湾同胞赴藏从事旅游、商务活动，须事先向西藏自治区旅游局或商务厅提出申请，购买进藏火车票时须出示有关批准函。");
                        if (bT()) {
                            $("#notice_3_id").html("3.按现行规定，学生票购票区间必须与学生证上的乘车区间一致，否则车站将不予换票。")
                        } else {
                            $("#notice_3_id").html("")
                        }
                    }
                } else {
                    $("#notice_1_id").html("1.系统将随机为您申请席位，暂不支持自选席位。");
                    if (bT()) {
                        $("#notice_3_id").html("2.按现行规定，学生票购票区间必须与学生证上的乘车区间一致，否则车站将不予换票。")
                    } else {
                        $("#notice_3_id").html("")
                    }
                }
            }
            var bV = aJ(bY);
            var bU = $(window).width() / 2 - 300;
            var bX = bK() + ($(window).height() / 2 - 200);
            bV.setDimension($("#content_" + bY).width(), $("#content_" + bY).height() + 10);
            $(".dhtmlx_window_active").height($("#content_" + bY).height());
            $(".dhtmlx_window_active").css({
                left: bU + "px",
                top: bX + "px"
            })
        }

        function bT() {
            for (var bV = 0; bV < limit_tickets.length; bV++) {
                var bU = limit_tickets[bV];
                if (bU.ticket_type == ticket_submit_order.ticket_type.student) {
                    return true
                }
            }
            return false
        }

        function bS() {
            for (var bV = 0; bV < limit_tickets.length; bV++) {
                var bU = limit_tickets[bV];
                if ((ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.fc || ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.gc) && bU.save_status != "" && bU.id_type == ticket_submit_order.passenger_card_type.passport) {
                    return true
                } else {
                    if ((ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.wc || ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.dc) && bU.id_type == ticket_submit_order.passenger_card_type.passport) {
                        return true
                    }
                }
            }
            return false
        }
    }

    function aJ(bS) {
        var bR = bL.createWindow(bS + "_", 0, 0, 660, 100);
        bR.attachObject(bS);
        bR.clearIcon();
        bR.denyResize();
        bR.setModal(true);
        bR.center();
        bR.button("park").hide();
        bR.button("minmax1").hide();
        bR.hideHeader();
        return bR
    }

    function v(bS) {
        var bR = new Date();
        var bT = bS.split("-");
        bR.setFullYear(parseInt(bT[0]), parseInt(bT[1] - 1, 10), parseInt(bT[2], 10));
        if (bT.length >= 6) {
            bR.setHours(bT[3], bT[4], bT[5])
        }
        return bR
    }

    function ap(bR) {
        var bU = "",
            bT = "";
        var bW = bR.replace(/-/g, "");
        if (bW.substring(4, 5) == "0") {
            bU = bW.substring(5, 6) + "月"
        } else {
            bU = bW.substring(4, 6) + "月"
        } if (bW.substring(6, 7) == "0") {
            bT = bW.substring(7, 8) + "日"
        } else {
            bT = bW.substring(6, 8) + "日"
        }
        var bS = new Date(Date.parse(bR.replace(/-/g, "/")));
        var bV = "日一二三四五六";
        return bU.concat(bT).concat("&nbsp;&nbsp;").concat("周").concat(bV.charAt(bS.getDay()))
    }
    showTicketPrice = function (bV) {
        var bY = $(bV).parent("tr").children("td").children("div").children("div").children("span").attr("id");
        if (undefined == bY || bY == null || "undefined" == typeof (bY)) {
            bY = $(bV).attr("id")
        }
        $("#price_" + bW).hide();
        $("#tp-list-price").hide();
        $("#sleeper-price>span").css("cursor", "pointer");
        var bW = bY.split("_")[0];
        var bX = bY.split("_")[1];
        var bU = bY.split("_")[2];
        var bZ = bY.split("_")[3];
        var bT = bY.split("_")[4];
        var bR = $("#WZ_" + bW).html();
        var bS = $("#QT_" + bW).html();
        if ($("#ticket_" + bW + "_train>span>span").text() == "查看票价") {
            if ($("#ticket_" + bW).attr("class") == "bgc") {
                $("#price_" + bW).addClass("bgc")
            }
            $.ajax({
                type: "get",
                isTakeParam: false,
                beforeSend: function (b0) {
                    b0.setRequestHeader("If-Modified-Since", "0");
                    b0.setRequestHeader("Cache-Control", "no-cache")
                },
                url: ctx + "leftTicket/queryTicketPrice",
                data: {
                    train_no: bW,
                    from_station_no: bX,
                    to_station_no: bU,
                    seat_types: bT,
                    train_date: train_tour_flag == "fc" ? $.trim($("#back_train_date").val()) : $.trim($("#train_date").val())
                },
                success: function (b0) {
                    if (b0.status) {
                        $("#ticket_" + bW + "_train>span>span").html("收起票价");
                        $("#ticket_" + bW + "_train>span>b").addClass("open");
                        $("#ticket_" + bW + "_train>span>b").attr("title", "收起票价");
                        if (bS == "--") {
                            b0.data.MIN = ""
                        }
                        if (bR == "--") {
                            b0.data.WZ = ""
                        }
                        $("#price_" + bW).html($.render.priceTableTemplate(b0.data));
                        $("#price_" + bW).show();
                        if (b0.data.PM != "--") {
                            $("#sleeper-price_" + bW).mouseover(function () {
                                $("#tp-list-price_" + bW).show()
                            });
                            $("#sleeper-price_" + bW).mouseout(function () {
                                $("#tp-list-price_" + bW).hide()
                            })
                        }
                    }
                }
            })
        } else {
            $("#ticket_" + bW + "_train>span>span").html("查看票价");
            $("#ticket_" + bW + "_train>span>b").attr("title", "查看票价");
            $("#ticket_" + bW + "_train>span>b").removeClass();
            $("#price_" + bW).html("");
            $("#price_" + bW).hide()
        }
    };

    function bu(bR) {
        if (ak == "starttime") {
            return bR.sort(function (bT, bS) {
                var bV = Number(bT.queryLeftNewDTO.start_time.replace(":", ""));
                var bU = Number(bS.queryLeftNewDTO.start_time.replace(":", ""));
                if (bV > bU) {
                    return aI ? 1 : -1
                } else {
                    return aI ? -1 : 1
                }
            })
        } else {
            if (ak == "arrivedtime") {
                return bR.sort(function (bT, bS) {
                    var bV = Number(bT.queryLeftNewDTO.arrive_time.replace(":", ""));
                    var bU = Number(bS.queryLeftNewDTO.arrive_time.replace(":", ""));
                    if (bV > bU) {
                        return bA ? 1 : -1
                    } else {
                        return bA ? -1 : 1
                    }
                })
            } else {
                if (ak == "lishi") {
                    return bR.sort(function (bT, bS) {
                        var bV = Number(bT.queryLeftNewDTO.lishi.replace(":", ""));
                        var bU = Number(bS.queryLeftNewDTO.lishi.replace(":", ""));
                        if (bV > bU) {
                            return aD ? 1 : -1
                        } else {
                            return aD ? -1 : 1
                        }
                    })
                }
            }
        }
        return bR
    }

    function al() {
        $("#s_time").click(function () {
            if (aI) {
                $("#s_time").removeClass().addClass("b4");
                if ($("#r_time").attr("class") == "b4") {
                    $("#r_time").removeClass().addClass("b2")
                } else {
                    if ($("#r_time").attr("class") == "b3") {
                        $("#r_time").removeClass().addClass("b1")
                    }
                } if ($("#l_s").attr("class") == "b4") {
                    $("#l_s").removeClass().addClass("b2")
                } else {
                    if ($("#l_s").attr("class") == "b3") {
                        $("#l_s").removeClass().addClass("b1")
                    }
                }
                aI = false;
                $("#other_span_starttime").removeClass().addClass("b4");
                if ($("#other_span_endtime").attr("class") == "b4") {
                    $("#other_span_endtime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_endtime").attr("class") == "b3") {
                        $("#other_span_endtime").removeClass().addClass("b1")
                    }
                } if ($("#other_span_lishi").attr("class") == "b4") {
                    $("#other_span_lishi").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_lishi").attr("class") == "b3") {
                        $("#other_span_lishi").removeClass().addClass("b1")
                    }
                }
            } else {
                $("#s_time").removeClass().addClass("b3");
                if ($("#r_time").attr("class") == "b4") {
                    $("#r_time").removeClass().addClass("b2")
                } else {
                    if ($("#r_time").attr("class") == "b3") {
                        $("#r_time").removeClass().addClass("b1")
                    }
                } if ($("#l_s").attr("class") == "b4") {
                    $("#l_s").removeClass().addClass("b2")
                } else {
                    if ($("#l_s").attr("class") == "b3") {
                        $("#l_s").removeClass().addClass("b1")
                    }
                }
                aI = true;
                $("#other_span_starttime").removeClass().addClass("b3");
                if ($("#other_span_endtime").attr("class") == "b4") {
                    $("#other_span_endtime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_endtime").attr("class") == "b3") {
                        $("#other_span_endtime").removeClass().addClass("b1")
                    }
                } if ($("#other_span_lishi").attr("class") == "b4") {
                    $("#other_span_lishi").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_lishi").attr("class") == "b3") {
                        $("#other_span_lishi").removeClass().addClass("b1")
                    }
                }
            }
            ak = "starttime";
            aq()
        });
        $("#other_span_starttime").click(function () {
            if (aI) {
                $("#s_time").removeClass().addClass("b4");
                if ($("#r_time").attr("class") == "b4") {
                    $("#r_time").removeClass().addClass("b2")
                } else {
                    if ($("#r_time").attr("class") == "b3") {
                        $("#r_time").removeClass().addClass("b1")
                    }
                } if ($("#l_s").attr("class") == "b4") {
                    $("#l_s").removeClass().addClass("b2")
                } else {
                    if ($("#l_s").attr("class") == "b3") {
                        $("#l_s").removeClass().addClass("b1")
                    }
                }
                aI = false;
                $("#other_span_starttime").removeClass().addClass("b4");
                if ($("#other_span_endtime").attr("class") == "b4") {
                    $("#other_span_endtime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_endtime").attr("class") == "b3") {
                        $("#other_span_endtime").removeClass().addClass("b1")
                    }
                } if ($("#other_span_lishi").attr("class") == "b4") {
                    $("#other_span_lishi").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_lishi").attr("class") == "b3") {
                        $("#other_span_lishi").removeClass().addClass("b1")
                    }
                }
            } else {
                $("#s_time").removeClass().addClass("b3");
                if ($("#r_time").attr("class") == "b4") {
                    $("#r_time").removeClass().addClass("b2")
                } else {
                    if ($("#r_time").attr("class") == "b3") {
                        $("#r_time").removeClass().addClass("b1")
                    }
                } if ($("#l_s").attr("class") == "b4") {
                    $("#l_s").removeClass().addClass("b2")
                } else {
                    if ($("#l_s").attr("class") == "b3") {
                        $("#l_s").removeClass().addClass("b1")
                    }
                }
                aI = true;
                $("#other_span_starttime").removeClass().addClass("b3");
                if ($("#other_span_endtime").attr("class") == "b4") {
                    $("#other_span_endtime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_endtime").attr("class") == "b3") {
                        $("#other_span_endtime").removeClass().addClass("b1")
                    }
                } if ($("#other_span_lishi").attr("class") == "b4") {
                    $("#other_span_lishi").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_lishi").attr("class") == "b3") {
                        $("#other_span_lishi").removeClass().addClass("b1")
                    }
                }
            }
            ak = "starttime";
            aq()
        });
        $("#r_time").click(function () {
            if (bA) {
                $("#r_time").removeClass().addClass("b4");
                if ($("#s_time").attr("class") == "b4") {
                    $("#s_time").removeClass().addClass("b2")
                } else {
                    if ($("#s_time").attr("class") == "b3") {
                        $("#s_time").removeClass().addClass("b1")
                    }
                } if ($("#l_s").attr("class") == "b4") {
                    $("#l_s").removeClass().addClass("b2")
                } else {
                    if ($("#l_s").attr("class") == "b3") {
                        $("#l_s").removeClass().addClass("b1")
                    }
                }
                bA = false;
                $("#other_span_starttime").removeClass().addClass("b4");
                $("#other_span_endtime").removeClass().addClass("b2");
                $("#other_span_lishi").removeClass().addClass("b2")
            } else {
                $("#r_time").removeClass().addClass("b3");
                if ($("#s_time").attr("class") == "b4") {
                    $("#s_time").removeClass().addClass("b2")
                } else {
                    if ($("#s_time").attr("class") == "b3") {
                        $("#s_time").removeClass().addClass("b1")
                    }
                } if ($("#l_s").attr("class") == "b4") {
                    $("#l_s").removeClass().addClass("b2")
                } else {
                    if ($("#l_s").attr("class") == "b3") {
                        $("#l_s").removeClass().addClass("b1")
                    }
                }
                bA = true;
                $("#other_span_endtime").removeClass().addClass("b2");
                if ($("#other_span_starttime").attr("class") == "b4") {
                    $("#other_span_starttime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_starttime").attr("class") == "b3") {
                        $("#other_span_starttime").removeClass().addClass("b1")
                    }
                } if ($("#other_span_lishi").attr("class") == "b4") {
                    $("#other_span_lishi").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_lishi").attr("class") == "b3") {
                        $("#other_span_lishi").removeClass().addClass("b1")
                    }
                }
            }
            ak = "arrivedtime";
            aq()
        });
        $("#other_span_endtime").click(function () {
            if (bA) {
                $("#r_time").removeClass().addClass("b4");
                if ($("#s_time").attr("class") == "b4") {
                    $("#s_time").removeClass().addClass("b2")
                } else {
                    if ($("#s_time").attr("class") == "b3") {
                        $("#s_time").removeClass().addClass("b1")
                    }
                } if ($("#l_s").attr("class") == "b4") {
                    $("#l_s").removeClass().addClass("b2")
                } else {
                    if ($("#l_s").attr("class") == "b3") {
                        $("#l_s").removeClass().addClass("b1")
                    }
                }
                bA = false;
                $("#other_span_endtime").removeClass().addClass("b4");
                if ($("#other_span_starttime").attr("class") == "b4") {
                    $("#other_span_starttime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_starttime").attr("class") == "b3") {
                        $("#other_span_starttime").removeClass().addClass("b1")
                    }
                } if ($("#other_span_lishi").attr("class") == "b4") {
                    $("#other_span_lishi").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_lishi").attr("class") == "b3") {
                        $("#other_span_lishi").removeClass().addClass("b1")
                    }
                }
            } else {
                $("#r_time").removeClass().addClass("b3");
                if ($("#s_time").attr("class") == "b4") {
                    $("#s_time").removeClass().addClass("b2")
                } else {
                    if ($("#s_time").attr("class") == "b3") {
                        $("#s_time").removeClass().addClass("b1")
                    }
                } if ($("#l_s").attr("class") == "b4") {
                    $("#l_s").removeClass().addClass("b2")
                } else {
                    if ($("#l_s").attr("class") == "b3") {
                        $("#l_s").removeClass().addClass("b1")
                    }
                }
                bA = true;
                $("#other_span_endtime").removeClass().addClass("b3");
                if ($("#other_span_starttime").attr("class") == "b4") {
                    $("#other_span_starttime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_starttime").attr("class") == "b3") {
                        $("#other_span_starttime").removeClass().addClass("b1")
                    }
                } if ($("#other_span_lishi").attr("class") == "b4") {
                    $("#other_span_lishi").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_lishi").attr("class") == "b3") {
                        $("#other_span_lishi").removeClass().addClass("b1")
                    }
                }
            }
            ak = "arrivedtime";
            aq()
        });
        $("#l_s").click(function () {
            if (aD) {
                $("#l_s").removeClass().addClass("b4");
                if ($("#r_time").attr("class") == "b4") {
                    $("#r_time").removeClass().addClass("b2")
                } else {
                    if ($("#r_time").attr("class") == "b3") {
                        $("#r_time").removeClass().addClass("b1")
                    }
                } if ($("#s_time").attr("class") == "b4") {
                    $("#s_time").removeClass().addClass("b2")
                } else {
                    if ($("#s_time").attr("class") == "b3") {
                        $("#s_time").removeClass().addClass("b1")
                    }
                }
                aD = false;
                $("#other_span_lishi").removeClass().addClass("b4");
                if ($("#other_span_endtime").attr("class") == "b4") {
                    $("#other_span_endtime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_endtime").attr("class") == "b3") {
                        $("#other_span_endtime").removeClass().addClass("b1")
                    }
                } if ($("#other_span_starttime").attr("class") == "b4") {
                    $("#other_span_starttime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_starttime").attr("class") == "b3") {
                        $("#other_span_starttime").removeClass().addClass("b1")
                    }
                }
            } else {
                $("#l_s").removeClass().addClass("b3");
                if ($("#r_time").attr("class") == "b4") {
                    $("#r_time").removeClass().addClass("b2")
                } else {
                    if ($("#r_time").attr("class") == "b3") {
                        $("#r_time").removeClass().addClass("b1")
                    }
                } if ($("#s_time").attr("class") == "b4") {
                    $("#s_time").removeClass().addClass("b2")
                } else {
                    if ($("#s_time").attr("class") == "b3") {
                        $("#s_time").removeClass().addClass("b1")
                    }
                }
                aD = true;
                $("#other_span_lishi").removeClass().addClass("b3");
                if ($("#other_span_endtime").attr("class") == "b4") {
                    $("#other_span_endtime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_endtime").attr("class") == "b3") {
                        $("#other_span_endtime").removeClass().addClass("b1")
                    }
                } if ($("#other_span_starttime").attr("class") == "b4") {
                    $("#other_span_starttime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_starttime").attr("class") == "b3") {
                        $("#other_span_starttime").removeClass().addClass("b1")
                    }
                }
            }
            ak = "lishi";
            aq()
        });
        $("#other_span_lishi").click(function () {
            if (aD) {
                $("#l_s").removeClass().addClass("b4");
                if ($("#r_time").attr("class") == "b4") {
                    $("#r_time").removeClass().addClass("b2")
                } else {
                    if ($("#r_time").attr("class") == "b3") {
                        $("#r_time").removeClass().addClass("b1")
                    }
                } if ($("#s_time").attr("class") == "b4") {
                    $("#s_time").removeClass().addClass("b2")
                } else {
                    if ($("#s_time").attr("class") == "b3") {
                        $("#s_time").removeClass().addClass("b1")
                    }
                }
                aD = false;
                $("#other_span_lishi").removeClass().addClass("b4");
                if ($("#other_span_endtime").attr("class") == "b4") {
                    $("#other_span_endtime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_endtime").attr("class") == "b3") {
                        $("#other_span_endtime").removeClass().addClass("b1")
                    }
                } if ($("#other_span_starttime").attr("class") == "b4") {
                    $("#other_span_starttime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_starttime").attr("class") == "b3") {
                        $("#other_span_starttime").removeClass().addClass("b1")
                    }
                }
            } else {
                $("#l_s").removeClass().addClass("b3");
                if ($("#r_time").attr("class") == "b4") {
                    $("#r_time").removeClass().addClass("b2")
                } else {
                    if ($("#r_time").attr("class") == "b3") {
                        $("#r_time").removeClass().addClass("b1")
                    }
                } if ($("#s_time").attr("class") == "b4") {
                    $("#s_time").removeClass().addClass("b2")
                } else {
                    if ($("#s_time").attr("class") == "b3") {
                        $("#s_time").removeClass().addClass("b1")
                    }
                }
                aD = true;
                $("#other_span_lishi").removeClass().addClass("b3");
                if ($("#other_span_endtime").attr("class") == "b4") {
                    $("#other_span_endtime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_endtime").attr("class") == "b3") {
                        $("#other_span_endtime").removeClass().addClass("b1")
                    }
                } if ($("#other_span_starttime").attr("class") == "b4") {
                    $("#other_span_starttime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_starttime").attr("class") == "b3") {
                        $("#other_span_starttime").removeClass().addClass("b1")
                    }
                }
            }
            ak = "lishi";
            aq()
        })
    }
    closeTrainStop = function () {
        over_flag = false;
        bz = 0;
        $("#train_stop").hide();
        $("#train_table").html("")
    };
    hideTrainStop = function (bR) {
        over_flag = false;
        if (m) {
            clearTimeout(m)
        }
        m = window.setTimeout(function () {
            if (bz != 1) {
                bz = 0;
                $("#train_stop").hide();
                $("#train_table").html("")
            }
        }, 130)
    };
    checkHover = function (bS, bR) {
        if (getEvent(bS).type == "mouseover") {
            return !$.contains(bR, getEvent(bS).relatedTarget || getEvent(bS).fromElement) && !((getEvent(bS).relatedTarget || getEvent(bS).fromElement) === bR)
        } else {
            return !$.contains(bR, getEvent(bS).relatedTarget || getEvent(bS).toElement) && !((getEvent(bS).relatedTarget || getEvent(bS).toElement) === bR)
        }
    };
    getEvent = function (bR) {
        return bR || window.event
    };
    checkHover = function (bS, bR) {
        if (getEvent(bS).type == "mouseover") {
            return !$.contains(bR, getEvent(bS).relatedTarget || getEvent(bS).fromElement) && !((getEvent(bS).relatedTarget || getEvent(bS).fromElement) === bR)
        } else {
            return !$.contains(bR, getEvent(bS).relatedTarget || getEvent(bS).toElement) && !((getEvent(bS).relatedTarget || getEvent(bS).toElement) === bR)
        }
    };
    getEvent = function (bR) {
        return bR || window.event
    };

    function bf(bT, bR) {
        for (var bS = 0; bS < bR.length; bS++) {
            if (bR[bS].key == bT) {
                return true
            }
        }
        return false
    }

    function a1(bV) {
        var b0 = function (b1) {
            this.value = b1
        };
        var bW = new Array();
        var bS = new Array();
        var bU = {};
        var bR = {};
        $("#cc_from_station_name_all>ul").html("");
        $("#cc_to_station_name_all>ul").html("");
        var bT;
        var bZ;
        var bY;
        for (var bX = 0; bX < bV.length; bX++) {
            bT = bV[bX].queryLeftNewDTO.from_station_name;
            bZ = bV[bX].queryLeftNewDTO.to_station_name;
            bY = bV[bX];
            if (!bU[bT]) {
                bW.push(new b0(bT));
                bU[bT] = true
            }
            if (!bR[bZ]) {
                bS.push(new b0(bZ));
                bR[bZ] = true
            }
        }
        $("#to_station_ul").html($.render.toStationNameTableTemplate(bS));
        $("#from_station_ul").html($.render.stationNameTableTemplate(bW));
        $("#sear-sel-bd input[name='cc_from_station']").click(function () {
            h(be, "cc_from_station_" + $(this).val());
            var b1 = $("input[name='cc_from_station']");
            var b2 = $("input[name='cc_from_station']:checked");
            if ($(this).is(":checked")) {
                if (b1 && b2 && b2.length == b1.length) {
                    $("#from_station_name_all").removeClass().addClass("btn-all")
                } else {
                    $("#from_station_name_all").removeClass().addClass("btn-all btn-all-sel")
                }
            } else {
                if (b1 && b2 && b2.length == 0) {
                    $("#from_station_name_all").removeClass().addClass("btn-all")
                } else {
                    $("#from_station_name_all").removeClass().addClass("btn-all btn-all-sel")
                }
            }
            aq()
        });
        $("#sear-sel-bd input[name='cc_to_station']").click(function () {
            h(a3, "cc_to_station_" + $(this).val());
            var b1 = $("input[name='cc_to_station']");
            var b2 = $("input[name='cc_to_station']:checked");
            if ($(this).is(":checked")) {
                if (b1 && b2 && b2.length == b1.length) {
                    $("#to_station_name_all").removeClass().addClass("btn-all")
                } else {
                    $("#to_station_name_all").removeClass().addClass("btn-all btn-all-sel")
                }
            } else {
                if (b1 && b2 && b2.length == 0) {
                    $("#to_station_name_all").removeClass().addClass("btn-all")
                } else {
                    $("#to_station_name_all").removeClass().addClass("btn-all btn-all-sel")
                }
            }
            aq()
        })
    }
    submitOrderRequest = function (bS, bR) {
        $.ajax({
            type: "post",
            url: ctx + "login/checkUser",
            data: {},
            beforeSend: function (bT) {
                bT.setRequestHeader("If-Modified-Since", "0");
                bT.setRequestHeader("Cache-Control", "no-cache")
            },
            success: function (bT) {
                var bV;
                checkusermdId = bT.attributes;
                if (bT.data.flag) {
                    if (train_tour_flag == "fc") {
                        bV = $("#back_train_date").val()
                    } else {
                        bV = $("#train_date").val()
                    } if (r == "0X00") {
                        var bU = false;
                        for (i = (studentComPerArr.length - 1); i >= 0; i = i - 2) {
                            if (v(studentComPerArr[i - 1]) <= v(bV) && v(studentComPerArr[i]) >= v(bV)) {
                                bU = true;
                                break
                            }
                        }
                        if (!bU) {
                            b("学生票的乘车时间为每年的暑假6月1日至9月30日、寒假12月1日至3月31日，目前不办理学生票业务。");
                            return
                        }
                    }
                    L(bS, bR)
                } else {
                    a9();
                    $("#floatTable").hide();
                    a = $(window).scrollTop();
                    Q(bS, bR)
                }
            }
        })
    };

    function L(b4, bX) {
        var bR = "";
        if ($("#dc").is(":checked")) {
            bR = "dc"
        } else {
            bR = "wc"
        } if (train_tour_flag == "fc") {
            bR = "fc";
            var bU = bX.split(":");
            var bT = $("#back_train_date").val() + "-" + bU[0] + "-" + bU[1] + "-00";
            try {
                if (roundReferTime) {
                    if (v(roundReferTime) >= v(bT)) {
                        b("您预订的往程车票到站时间为" + v(roundReferTime).format("yyyy年MM月dd日 hh时mm分") + "，返回日期不能早于此时间");
                        return
                    }
                }
            } catch (bZ) {}
        }
        if (train_tour_flag == "gc") {
            bR = "gc"
        }
        if ("undefined" == typeof (submitForm)) {
            var bV = "secretStr=" + b4 + "&train_date=" + $("#train_date").val() + "&back_train_date=" + $("#back_train_date").val() + "&tour_flag=" + bR + "&purpose_codes=" + bO() + "&query_from_station_name=" + $("#fromStationText").val() + "&query_to_station_name=" + $("#toStationText").val() + "&" + b2
        } else {
            var bS = submitForm();
            var b3 = bS.split(":::");
            var bY = b3[0].split(",-,")[0];
            var b1 = b3[0].split(",-,")[1];
            var bW = b3[1].split(",-,")[0];
            var b0 = b3[1].split(",-,")[1];
            var bV = escape(bY) + "=" + escape(b1) + "&" + bW + "=" + b0 + "&secretStr=" + b4 + "&train_date=" + $("#train_date").val() + "&back_train_date=" + $("#back_train_date").val() + "&tour_flag=" + bR + "&purpose_codes=" + bO() + "&query_from_station_name=" + $("#fromStationText").val() + "&query_to_station_name=" + $("#toStationText").val() + "&" + b2
        }
        var b2 = checkusermdId != undefined ? "&_json_att=" + encodeURIComponent(checkusermdId) : "";
        $.ajax({
            type: "post",
            url: ctx + "leftTicket/submitOrderRequest",
            data: bV,
            async: false,
            success: function (b5) {
                if (b5.status) {
                    if (train_tour_flag != null) {
                        if (train_tour_flag == "fc") {
                            otsRedirect("post", ctx + "confirmPassenger/initFc", {});
                            return
                        }
                        if (train_tour_flag == "gc") {
                            otsRedirect("post", ctx + "confirmPassenger/initGc", {});
                            return
                        }
                    }
                    if (bR == "dc") {
                        otsRedirect("post", ctx + "confirmPassenger/initDc", {});
                        return
                    } else {
                        otsRedirect("post", ctx + "confirmPassenger/initWc", {})
                    }
                }
            }
        })
    }
    var bN = $("#fromStation").val();
    var aT = $("#toStation").val();
    var bx = $.trim($("#train_date").val());
    aM = bN + aT + bx;
    $("#add-train").click(function () {
        if ($("#fromStationText").val() == "简拼/全拼/汉字") {
            dhtmlx.alert({
                title: "输入车次",
                ok: "确定",
                text: "请填写出发地！",
                type: "alert-error"
            });
            return
        }
        if ($("#toStationText").val() == "简拼/全拼/汉字") {
            dhtmlx.alert({
                title: "输入车次",
                ok: "确定",
                text: "请填写目的地！",
                type: "alert-error"
            });
            return
        }
        var bT = $("#prior_train span").length;
        var b0 = $.trim($("#inp-train").val()).toUpperCase();
        if (b0.length == 0 || b0 == "请输入") {
            dhtmlx.alert({
                title: "输入车次",
                ok: "确定",
                text: "请输入车次",
                type: "alert-error",
                callback: function () {
                    $("#inp-train").val("");
                    $("#inp-train").focus()
                }
            })
        } else {
            if (bT < 6) {
                var bU = /^[a-zA-Z0-9]+$/;
                var bW = /^[0-9]+$/;
                if (!bU.test(b0)) {
                    dhtmlx.alert({
                        title: "输入车次",
                        ok: "确定",
                        text: "车次格式输入错误！",
                        type: "alert-error",
                        callback: function () {
                            ccInputSelected = true;
                            $("#inp-train").select()
                        }
                    })
                } else {
                    if (bW.test(b0) && b0.length > 4) {
                        dhtmlx.alert({
                            title: "输入车次",
                            ok: "确定",
                            text: "车次格式输入错误！",
                            type: "alert-error",
                            callback: function () {
                                ccInputSelected = true;
                                $("#inp-train").select()
                            }
                        })
                    } else {
                        if (b0.length < 2) {
                            dhtmlx.alert({
                                title: "输入车次",
                                ok: "确定",
                                text: "车次格式输入错误！",
                                type: "alert-error",
                                callback: function () {
                                    ccInputSelected = true;
                                    $("#inp-train").select()
                                }
                            })
                        } else {
                            var bV = $("#fromStation").val();
                            var bY = $("#toStation").val();
                            var b8 = $.trim($("#train_date").val());
                            var b4 = bV + bY + b8;
                            var b5 = b8.split("-");
                            var b1 = new Date();
                            b1.setFullYear(b5[0], b5[1] - 1, b5[2]);
                            b1.setHours(8, 0, 0);
                            var bX = new Date();
                            var b7 = "";
                            b7 = $.parseDateFormat(bX);
                            var bR = "";
                            if (b7 == b8) {
                                var b6 = new Date(b1.getTime() + 1000 * 60 * 60 * 24);
                                bR = $.parseDateFormat(b6)
                            } else {
                                bR = b8
                            }
                            var b9 = {
                                "leftTicketDTO.train_date": bR,
                                "leftTicketDTO.from_station": bV,
                                "leftTicketDTO.to_station": bY,
                                purpose_codes: bO()
                            };
                            if (b4 != aM) {
                                aM = b4;
                                $("#prior_train span:gt(0)").remove();
                                ccSelected = [];
                                var bS = [];
                                $.ajax({
                                    type: "get",
                                    async: false,
                                    isTakeParam: false,
                                    beforeSend: function (ca) {
                                        ca.setRequestHeader("If-Modified-Since", "0");
                                        ca.setRequestHeader("Cache-Control", "no-cache")
                                    },
                                    url: ctx + "leftTicket/query",
                                    data: b9,
                                    timeout: 10000,
                                    success: function (ca) {
                                        if (ca.status) {
                                            if (ca.data == null || ca.data.length == 0) {
                                                dhtmlx.alert({
                                                    title: "错误信息",
                                                    ok: "确定",
                                                    text: "您输入的车次与出发地目的地不符！",
                                                    type: "alert-error",
                                                    callback: function () {}
                                                })
                                            } else {
                                                var cc = ca.data;
                                                for (var cb = 0; cb < cc.length; cb++) {
                                                    bS.push(cc[cb].queryLeftNewDTO.station_train_code.toUpperCase())
                                                }
                                                A = bS
                                            }
                                        }
                                    }
                                })
                            } else {
                                if (A.length == 0) {
                                    $.ajax({
                                        type: "get",
                                        async: false,
                                        isTakeParam: false,
                                        beforeSend: function (ca) {
                                            ca.setRequestHeader("If-Modified-Since", "0");
                                            ca.setRequestHeader("Cache-Control", "no-cache")
                                        },
                                        url: ctx + "leftTicket/query",
                                        data: b9,
                                        timeout: 10000,
                                        success: function (ca) {
                                            if (ca.status) {
                                                if (ca.data == null || ca.data.length == 0) {
                                                    dhtmlx.alert({
                                                        title: "错误信息",
                                                        ok: "确定",
                                                        text: "您输入的车次与出发地目的地不符！",
                                                        type: "alert-error",
                                                        callback: function () {}
                                                    })
                                                } else {
                                                    var cc = ca.data;
                                                    for (var cb = 0; cb < cc.length; cb++) {
                                                        A.push(cc[cb].queryLeftNewDTO.station_train_code.toUpperCase())
                                                    }
                                                }
                                            }
                                        }
                                    })
                                }
                            }
                            var bZ = false;
                            for (var b3 = 0; b3 < A.length; b3++) {
                                if (b0 == A[b3]) {
                                    bZ = true;
                                    break
                                }
                            }
                            if (!bZ) {
                                dhtmlx.alert({
                                    title: "错误信息",
                                    ok: "确定",
                                    text: "您输入的车次与出发地目的地不符！",
                                    type: "alert-error",
                                    callback: function () {
                                        $("#inp-train").val("")
                                    }
                                })
                            } else {
                                if ($.inArray(b0, ccSelected) < 0) {
                                    var b2 = "<span class='sel-box w80'>" + b0 + "<a class='close' href='javascript:' onclick='$.removeSel(this,\"" + b0 + "\",4)'></a></span>";
                                    $("#prior_train").append(b2);
                                    ccSelected.push(b0);
                                    $("#inp-train").val("")
                                } else {
                                    dhtmlx.alert({
                                        title: "输入车次",
                                        ok: "确定",
                                        text: "此车次已经添加过！",
                                        type: "alert-error",
                                        callback: function () {
                                            ccInputSelected = true;
                                            $("#inp-train").select()
                                        }
                                    })
                                }
                            }
                        }
                    }
                }
            } else {
                dhtmlx.alert({
                    title: "输入车次",
                    ok: "确定",
                    text: "最多添加5个优先车次",
                    type: "alert-error"
                });
                $("#inp-train").val("")
            }
        }
    });

    function bO() {
        if ($("#sf2").is(":checked")) {
            return "0X00"
        } else {
            return "ADULT"
        }
    }
    jQuery.extend({
        init_ul4li: function () {
            var bR = [];
            var bS = 0;
            bR[bS++] = '<li><input name="cc_type" value="G" type="checkbox" class="check" /><label for="">GC-高铁/城际</label></li>';
            bR[bS++] = '<li><input name="cc_type" value="D" type="checkbox" class="check" /><label for="">D-动车</label></li>';
            bR[bS++] = '<li><input name="cc_type" value="Z" type="checkbox" class="check" /><label for="">Z-直达</label></li>';
            bR[bS++] = '<li><input name="cc_type" value="T" type="checkbox" class="check" /><label for="">T-特快</label></li>';
            bR[bS++] = '<li><input name="cc_type" value="K" type="checkbox" class="check" /><label for="">K-快速</label></li>';
            bR[bS++] = '<li><input name="cc_type" value="QT" type="checkbox" class="check" /><label for="">其他</label></li>';
            $("#_ul_station_train_code").html(bR.join(""));
            $("#startendtime").html('<span class="b1" id="s_time">出发时间</span><br /><span class="b2" id="r_time">到达时间</span>');
            $("#floatstartendtime").html('<span class="b1" id="other_span_starttime">出发时间</span><br /><span class="b2" id="other_span_endtime">到达时间</span>')
        },
        parseDateFormat: function (bV) {
            var bR = "";
            var bS = bV.getFullYear();
            var bU = bV.getMonth() + 1;
            var bT = bV.getDate();
            if (bU < 10) {
                bU = "0" + bU
            }
            if (bT < 10) {
                bT = "0" + bT
            }
            bR = bS + "-" + bU + "-" + bT;
            return bR
        },
        renderPassenger: function () {
            if (passengerAll) {
                var b2 = passengerAll.length;
                var bZ = [];
                var bX = 0;
                var bS = $("#searchPassenger").val();
                for (var bV = 0; bV < b2; bV++) {
                    var bT = passengerAll[bV];
                    var bR = bT.passenger_type_name;
                    if (!bR) {
                        bR = ""
                    }
                    var bW = "";
                    var bY = "";
                    if ($("#sf2").is(":checked")) {
                        if (bT.passenger_type != "3") {
                            bW = " disabled='true' ";
                            bY = " class='color999' "
                        }
                    }
                    if (bS != "" && bS != "输入乘客姓名") {
                        if (bT.passenger_name.indexOf(bS) > -1 || (bT.first_letter && bT.first_letter.toUpperCase().indexOf(bS.toUpperCase()) > -1)) {
                            bX++;
                            var bU = "";
                            if ($.pHasInSelected(bT)) {
                                bU = " checked='checked' "
                            }
                            bZ[bV] = "<li " + bY + "><input " + bU + " type='checkbox' " + bW + " name='" + bT.passenger_type + "' class='check' />" + bT.passenger_name + "(" + bR + ")(" + bT.passenger_id_no + ")</li>"
                        }
                    } else {
                        bX++;
                        var bU = "";
                        if ($.pHasInSelected(bT)) {
                            bU = " checked='checked' "
                        }
                        bZ[bV] = "<li " + bY + "><input  " + bU + " type='checkbox' " + bW + " name='" + bT.passenger_type + "' class='check' />" + bT.passenger_name + "(" + bR + ")(" + bT.passenger_id_no + ")</li>"
                    }
                }
                var b1 = 100;
                var b0 = 0;
                if (bX / 3 > 11) {
                    b1 = 310;
                    b0 = 258
                } else {
                    b1 = 100 + parseInt((bX / 3) * 25);
                    b0 = b1 - 48
                }
                $("#sel-buyer").css("height", b1);
                $("#pContent").css("height", b0);
                $("#buyer-list").html(bZ.join(""))
            }
            $("#buyer-list input").click(function () {
                var b4 = $("#setion_postion span").length;
                var b5 = this.nextSibling.nodeValue;
                if (this.checked) {
                    if (b4 < 6) {
                        var b3 = "<span name='" + b5 + "' class='sel-box w80'>" + b5 + "<a class='close' href='javascript:' onclick='$.removeSel(this,\"" + b5 + "\",1)'></a></span>";
                        $("#setion_postion").append(b3);
                        $.checkedPasseanger(b5)
                    } else {
                        dhtmlx.alert({
                            title: "添加常用联系人",
                            ok: "确定",
                            text: "最多添加5位联系人",
                            type: "alert-error"
                        });
                        this.checked = false
                    }
                } else {
                    $.each($("#setion_postion span"), function (b6, b7) {
                        if (b5 == $(b7).attr("name")) {
                            $(b7).remove();
                            $.removePasseanger(b5);
                            return
                        }
                    })
                }
            })
        },
        reloadPassenger: function () {
            var bR = dhtmlx.modalbox({
                targSrc: '<div><img src="' + ctx + 'resources/images/loading.gif"></img></div>',
                callback: function () {}
            });
            $.ajax({
                type: "post",
                isTakeParam: false,
                cache: false,
                async: false,
                url: ctx + "confirmPassenger/getPassengerDTOs",
                timeout: 10000,
                error: function (bS, bU, bT) {
                    dhtmlx.modalbox.hide(bR)
                },
                success: function (bS) {
                    dhtmlx.modalbox.hide(bR);
                    if (bS.status) {
                        if (bS.data.noLogin == "true") {
                            a9();
                            $("#floatTable").hide();
                            a = $(window).scrollTop();
                            P()
                        } else {
                            passengerAll = bS.data.normal_passengers;
                            $("#sel-buyer").css("left", $("#sear-sel").position().left + 80);
                            $("#sel-buyer").show();
                            $("#sel-seat").hide();
                            $("#sel-date").hide();
                            $("#sel-buyer").css("left", $("#sear-sel").position().left + 80);
                            $("#sel-buyer").css("top", $("#sear-sel").position().top + 4 * 28 + 16);
                            $.renderPassenger()
                        }
                    }
                }
            })
        },
        pHasInSelected: function (bU) {
            var bS = passengerChecked.length;
            if (bS > 0) {
                for (var bR = 0; bR < bS; bR++) {
                    var bT = passengerChecked[bR];
                    if (bT.passenger_name == bU.passenger_name && bT.passenger_id_type_code == bU.passenger_id_type_code && bT.passenger_id_no == bU.passenger_id_no) {
                        return true
                    }
                }
            }
            return false
        },
        showSelectBuyer: function () {
            if (!passengerAll) {
                $.reloadPassenger()
            } else {
                var bR = $("#buyer-list input");
                for (var bS = 0; bS < bR.length; bS++) {
                    var bT = $(bR[bS]).attr("name");
                    if ($("#sf2").is(":checked")) {
                        if (bT != "3") {
                            $(bR[bS]).attr("disabled", "true");
                            $(bR[bS]).parent().addClass("color999")
                        } else {
                            $(bR[bS]).removeAttr("disabled");
                            $(bR[bS]).parent().removeClass("color999")
                        }
                    } else {
                        $(bR[bS]).removeAttr("disabled");
                        $(bR[bS]).parent().removeClass("color999")
                    }
                }
                $("#sel-buyer").show();
                $("#sel-seat").hide();
                $("#sel-date").hide();
                $("#sel-buyer").css("left", $("#sear-sel").position().left + 80);
                $("#sel-buyer").css("top", $("#sear-sel").position().top + 4 * 28 + 16)
            }
        },
        getMindateForCal: function () {
            if ($("#sf2").is(":checked")) {
                f = studentMindate
            } else {
                f = otherMindate
            }
            return f
        },
        getMaxdateForCal: function () {
            if ($("#sf2").is(":checked")) {
                y = studentMaxdate
            } else {
                y = otherMaxdate
            }
            return y
        }
    });

    function z() {
        $("#show_all_query_result").click(function () {
            be = new Array();
            a3 = new Array();
            G = new Array();
            $("#train_type_btn_all").removeClass().addClass("btn-all");
            $("#start_time_btn_all").removeClass().addClass("btn-all");
            $("#arrive_time_btn_all").removeClass().addClass("btn-all");
            $("#seat_type_btn_all").removeClass().addClass("btn-all");
            $("#from_station_name_all").removeClass().addClass("btn-all");
            $("#to_station_name_all").removeClass().addClass("btn-all");
            $("#sear-sel-bd input").each(function () {
                if (this.checked) {
                    this.checked = false
                }
            });
            if (aj) {
                aj.setComboText("")
            }
            $("#avail_ticket").attr("checked", false);
            aq()
        })
    }

    function af() {
        var bR = $("#queryPriceTemplate").html().replace("<!--", "").replace("-->", "");
        $.templates({
            priceTableTemplate: bR
        });
        var bR = $("#fromStationNameTemplate").html().replace("<!--", "").replace("-->", "");
        $.templates({
            stationNameTableTemplate: bR
        });
        var bR = $("#toStationNameTemplate").html().replace("<!--", "").replace("-->", "");
        $.templates({
            toStationNameTableTemplate: bR
        });
        var bR = $("#seatTypeTemplate").html().replace("<!--", "").replace("-->", "");
        $.templates({
            seatTypeTemplate: bR
        });
        var bR = $("#stationinfoTemplate").html().replace("<!--", "").replace("-->", "");
        $.templates({
            stationinfoTemplate: bR
        })
    }

    function bi(bS) {
        dhtmlXCombo_defaultOption.prototype._DrawHeaderButton = function () {};
        $("#train_combo_box").hide();
        var bR = [];
        if (!aj) {
            aj = new dhtmlXCombo("train_combo_box_div", "cc", 90)
        } else {
            aj.setComboText("")
        }
        aj.clearAll();
        $(bS).each(function () {
            bR.push([this.queryLeftNewDTO.station_train_code, this.queryLeftNewDTO.station_train_code])
        });
        aj.addOption(bR);
        aj.enableFilteringMode(true);
        aj.attachEvent("onChange", function () {
            if (aj.getComboText() != "") {
                if ($("#iLcear").is(":hidden")) {
                    $("#iLcear").show()
                }
            }
            aq()
        });
        if (!$("#iLcear")[0]) {
            $(".dhx_combo_box ").append($('<span style="display: none;" class="i-clear dhx_combo_img_iClear" id="iLcear"></span>'));
            $("#iLcear").on("click", function () {
                if (aj) {
                    aj.setComboText("");
                    $(this).hide()
                }
            })
        }
        $(".dhx_combo_input").on("keyup", function () {
            if ($(this).val() == "") {
                $("#iLcear").hide()
            } else {
                if ($("#iLcear").is(":hidden")) {
                    $("#iLcear").show()
                }
            }
        })
    }

    function ae() {
        if (!bG) {
            bG = new dhtmlXWindows();
            bG.enableAutoViewport(true);
            bG.setSkin("dhx_terrace");
            bG.attachViewportTo("winVP");
            bG.setImagePath(ctx + "resources/js/rich/windows/imgs/")
        }
    }

    function a7() {
        bG.window("login").hide();
        bG.window("login").setModal(false)
    }

    function a9() {
        if (bG.window("login")) {
            bG.window("login").setModal(false);
            bG.window("login").hide()
        }
        aH = bG.createWindow("login", 0, 0, 400, 350);
        var bR = $(window).width() / 2 - 140;
        var bS = bK() + ($(window).height() / 2 - 205);
        aH.attachObject("relogin");
        aH.setDimension($("#content").width(), $("#content").height() + 10);
        $(".dhtmlx_window_active").height($("#content").height());
        $(".dhtmlx_window_active").css({
            left: bR,
            top: bS
        });
        aH.bringToTop();
        bG.window("login").clearIcon();
        bG.window("login").denyResize();
        aH.button("park").hide();
        aH.button("minmax1").hide();
        aH.hideHeader();
        refreshImg("login", "sjrand");
        aH.setModal(true);
        $("#relogin_close").click(function () {
            aY();
            var bT = $(window).scrollTop();
            var bU = $("#float").position().top;
            if (bT > bU + 30) {
                $("#floatTable").show()
            }
            a7()
        })
    }

    function aY() {
        ay();
        $("#c_error").html("");
        $("#c_error").removeClass("error");
        $("#username").val("");
        $("#password").val("");
        $("#randCode").val("");
        $("#i-ok").hide();
        bB()
    }

    function bK() {
        if ("pageYOffset" in window) {
            return window.pageYOffset
        } else {
            if (document.compatMode == "BackCompat") {
                return document.body.scrollTop
            } else {
                return document.documentElement.scrollTop
            }
        }
    }

    function ay() {
        $("#username").removeClass("inptxt w200 error").addClass("inptxt w200");
        $("#password").removeClass("inptxt w200 error").addClass("inptxt w200");
        $("#randCode").removeClass("inptxt w100 error").addClass("inptxt w100");
        $("#randCode2").removeClass("inptxt w100 error").addClass("inptxt w100")
    }

    function w(bU) {
        var bR = true;
        var bS = /^[A-Za-z]{1}([A-Za-z0-9]|[_]){0,29}$/;
        var bT = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
        if ("" == bU || bU == null || bU == "用户名／邮箱" || bU == "admin") {
            bR = false;
            ay();
            $("#username").removeClass("inptxt w200").addClass("inptxt w200 error");
            $("#c_error").html(login_messages.userNameEmpty).attr("class", "error").css("margin-left", "60px")
        } else {
            if (!bS.test(bU) && !bT.test(bU)) {
                bR = false;
                ay();
                $("#username").removeClass("inptxt w200").addClass("inptxt w200 error");
                $("#c_error").html(login_messages.userNameFormat).attr("class", "error").css("margin-left", "60px")
            }
        } if (bR) {
            ay();
            $("#c_error").html("");
            $("#c_error").removeClass("error")
        }
        return bR
    }

    function bc(bS) {
        var bR = true;
        if ("" == bS || bS == null) {
            bR = false;
            ay();
            $("#password").removeClass("inptxt w200").addClass("inptxt w200 error");
            $("#c_error").html(login_messages.passwordEmpty).attr("class", "error").css("margin-left", "60px")
        } else {
            if (bS.length < 6) {
                bR = false;
                ay();
                $("#password").removeClass("inptxt w200").addClass("inptxt w200 error");
                $("#c_error").html(login_messages.passwordLength).attr("class", "error").css("margin-left", "60px")
            }
        } if (bR) {
            ay();
            $("#c_error").html("");
            $("#c_error").removeClass("error")
        }
        return bR
    }

    function aW(bS) {
        var bR = true;
        if ("" == bS) {
            bR = false;
            ay();
            $("#randCode").removeClass("inptxt w100").addClass("inptxt w100 error");
            $("#c_error").html(login_messages.randCodeEmpty).attr("class", "error").css("margin-left", "60px")
        } else {
            if (!/^[a-zA-Z0-9]+$/.test(bS)) {
                bR = false;
                ay();
                $("#randCode").removeClass("inptxt w100").addClass("inptxt w100 error");
                $("#c_error").html(login_messages.randCodeFormat).attr("class", "error").css("margin-left", "60px")
            } else {
                if (bS.length != 4) {
                    bR = false;
                    ay();
                    $("#randCode").removeClass("inptxt w100").addClass("inptxt w100 error");
                    $("#c_error").html(login_messages.randCodeLentgh).attr("class", "error").css("margin-left", "60px")
                } else {
                    if (!x(bS)) {
                        bR = false;
                        ay();
                        $("#randCode").removeClass("inptxt w100").addClass("inptxt w100 error");
                        $("#c_error").html(login_messages.randCodeError).attr("class", "error").css("margin-left", "60px")
                    }
                }
            }
        } if (bR) {
            ay();
            $("#c_error").html("");
            $("#c_error").removeClass("error")
        }
        return bR
    }

    function aA() {
        var bT = $.trim($("#username").val());
        var bS = $.trim($("#password").val());
        var bR = $.trim($("#randCode").val());
        if (!w(bT)) {
            return false
        }
        if (!bc(bS)) {
            return false
        }
        if (!aW(bR)) {
            return false
        }
        return true
    }

    function x(bS) {
        var bR = true;
        if (bS != "" && bS.length == 4) {
            $.ajax({
                url: ctx + "passcodeNew/checkRandCodeAnsyn",
                type: "post",
                data: {
                    randCode: bS,
                    rand: "sjrand"
                },
                async: false,
                success: function (bT) {
                    if (bT.data == "N") {
                        bR = false;
                        $("#i-ok").css("display", "none")
                    } else {
                        bR = true;
                        $("#i-ok").css("display", "block");
                        $("#c_error").html("");
                        $("#c_error").removeClass("error");
                        ay()
                    }
                }
            })
        } else {
            bR = false;
            $("#i-ok").css("display", "none")
        }
        return bR
    }

    function u() {
        var bS = false;
        var bR = false;
        $("#username").on("keyup", function () {
            an = true;
            var bT = $.trim($("#username").val());
            bS = w(bT)
        }).blur(function () {
            if (an) {
                var bT = $.trim($("#username").val());
                bS = w(bT)
            }
        });
        $("#password").blur(function () {
            if (an) {
                if (bS) {
                    var bT = $.trim($("#password").val());
                    bR = bc(bT)
                }
            }
        });
        $("#randCode").on("keyup", function () {
            if ($.trim($("#password").val()) != "" && $.trim($("#password").val()) != null) {
                if (bR) {
                    var bT = $.trim($("#randCode").val());
                    x(bT)
                }
            }
        }).blur(function () {
            if ($.trim($("#password").val()) != "" && $.trim($("#password").val()) != null) {
                if (bR) {
                    var bT = $.trim($("#randCode").val());
                    aW(bT)
                }
            }
        })
    }

    function Q(bS, bR) {
        $("#loginSubAsyn").unbind("click");
        $("#loginSubAsyn").click(function () {
            var bT = aA();
            if (bT) {
                $("#loginForm").ajaxSubmit({
                    url: ctx + "login/loginUserAsyn?random=" + new Date().getTime(),
                    type: "post",
                    dataType: "json",
                    async: false,
                    success: function (bU) {
                        if (bU.data.status) {
                            if (bU.data.username != null) {
                                a7();
                                loginAsyn(bU.data.username);
                                L(bS, bR)
                            }
                        } else {
                            $("#i-ok").hide();
                            refreshImg("login", "sjrand");
                            $("#password").val("");
                            $("#randCode").val("");
                            if (bU.data.loginFail != null) {
                                if (bU.data.loginFail == "登录名不存在!") {
                                    an = false;
                                    ay();
                                    $("#username").removeClass("inptxt w200").addClass("inptxt w200 error");
                                    $("#c_error").html(bU.data.loginFail).attr("class", "error").css("margin-left", "60px")
                                } else {
                                    if (bU.data.loginFail == "验证码不正确！" && bU.data.loginFail != "登录名不存在!") {
                                        ay();
                                        $("#randCode").removeClass("inptxt w100").addClass("inptxt w200 error");
                                        $("#c_error").html(bU.data.loginFail).attr("class", "error").css("margin-left", "60px");
                                        $("#randCode").focus()
                                    } else {
                                        if (bU.data.loginFail != "验证码不正确！" && bU.data.loginFail != "登录名不存在!") {
                                            ay();
                                            $("#password").removeClass("inptxt w200").addClass("inptxt w200 error");
                                            $("#c_error").html(bU.data.loginFail).attr("class", "error").css("margin-left", "60px");
                                            $("#password").focus()
                                        }
                                    }
                                }
                            }
                        }
                    }
                })
            } else {
                a9()
            }
        })
    }

    function P() {
        var bR = false;
        $("#loginSubAsyn").unbind("click");
        $("#loginSubAsyn").click(function () {
            if (!bR) {
                var bS = aA();
                bR = true;
                if (bS) {
                    $("#loginForm").ajaxSubmit({
                        url: ctx + "login/loginUserAsyn?random=" + new Date().getTime(),
                        type: "post",
                        dataType: "json",
                        async: false,
                        success: function (bT) {
                            if (bT.data.status) {
                                if (bT.data.username != null) {
                                    a7();
                                    loginAsyn(bT.data.username)
                                }
                            } else {
                                $("#i-ok").hide();
                                refreshImg("login", "sjrand");
                                $("#password").val("");
                                $("#randCode").val("");
                                if (bT.data.loginFail != null) {
                                    if (bT.data.loginFail == "登录名不存在!") {
                                        an = false;
                                        ay();
                                        $("#username").removeClass("inptxt w200").addClass("inptxt w200 error");
                                        $("#c_error").html(bT.data.loginFail).attr("class", "error").css("margin-left", "60px");
                                        $("#username").focus()
                                    } else {
                                        if (bT.data.loginFail == "验证码不正确！" && bT.data.loginFail != "登录名不存在!") {
                                            ay();
                                            $("#randCode").removeClass("inptxt w100").addClass("inptxt w200 error");
                                            $("#c_error").html(bT.data.loginFail).attr("class", "error").css("margin-left", "60px");
                                            $("#randCode").focus()
                                        } else {
                                            if (bT.data.loginFail != "验证码不正确！" && bT.data.loginFail != "登录名不存在!") {
                                                ay();
                                                $("#password").removeClass("inptxt w200").addClass("inptxt w200 error");
                                                $("#c_error").html(bT.data.loginFail).attr("class", "error").css("margin-left", "60px");
                                                $("#password").focus()
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        complete: function () {
                            bR = false
                        }
                    })
                } else {
                    bR = false;
                    a9()
                }
            }
        })
    }

    function aC() {
        $("#randCode").keydown(function (bR) {
            bR = bR || window.event;
            if (bR.keyCode == 13 || bR.keyCode == 9) {
                $("#loginSubAsyn").click()
            }
        })
    }

    function bB() {
        $("#username").css("color", "#333");
        $("#password").css("color", "#333");
        $("#randCode").css("color", "#333");
        if ($("#username").val() == "" || $("#username").val() == "用户名／邮箱" || $("#username").val() == null || $("#username").val() == "admin") {
            $("#username").css("color", "#999");
            $("#username").val("用户名／邮箱");
            $("#password").val("")
        }
        $("#username").focus(function () {
            var bR = $("#username").val();
            if (bR == "用户名／邮箱") {
                $("#username").css("color", "#333");
                $("#username").val("");
                $("#password").val("")
            }
        }).blur(function () {
            var bR = $("#username").val();
            if (bR == "") {
                $("#username").css("color", "#999");
                $("#username").val("用户名／邮箱")
            }
        })
    }

    function V() {
        $("#forget_my_password_id").on("click", function (bR) {
            otsRedirect("post", ctx + "forgetPassword/initforgetMyPassword")
        })
    }

    function aB() {
        var bR = [];
        $("#date_range>ul>li").each(function () {
            var bT = $(this).children("span:first-child").html();
            bR.push(bT)
        });
        var bS;
        if (train_tour_flag != null && train_tour_flag != "" && train_tour_flag == "fc") {
            bS = jQuery.inArray($("#back_train_date").val().substring(5, 10), bR)
        } else {
            bS = jQuery.inArray($("#train_date").val().substring(5, 10), bR)
        } if (bS != "-1") {
            bS = bS + 1;
            $("#date_range>ul>li").removeClass("sel");
            $("#date_range>ul>li:nth-child(1)").children("span:first").addClass("first");
            $("#date_range>ul>li:nth-child(1)").children("span:last").addClass("first");
            $("#date_range>ul>li:nth-child(" + bS + ")").addClass("sel");
            $("#date_range>ul>li:nth-child(" + bS + ")").children("span:last-child").removeClass();
            $("#date_range>ul>li:nth-child(1)").children().addClass("first");
            $("#date_range>ul>li:nth-child(" + bS + ")").children("span:first-child").addClass("hide");
            $("#date_range>ul>li:nth-child(20)").addClass("end");
            bt = $("#date_range>ul>li:nth-child(" + bS + ")").children("span:first-child").text()
        }
    }

    function bp() {
        $("#query_ticket").unbind("click");
        $("#query_ticket_stu").unbind("click");
        $("#query_ticket").removeClass().addClass("btn92s btn-disabled");
        $("#query_ticket_stu").removeClass().addClass("btn92s btn-disabled");
        a0();
        setTimeout(function () {
            bP();
            aX();
            $("#query_ticket").removeClass().addClass("btn92s");
            $("#query_ticket_stu").removeClass().addClass("btn92s");
            if (train_tour_flag != "gc" && train_tour_flag != "fc") {
                if (ClickWho == "0X00") {
                    $("#query_ticket").unbind();
                    $("#query_ticket").removeClass().addClass("btn92s btn-disabled");
                    $("#query_ticket_stu").removeClass().addClass("btn92s")
                }
                if (ClickWho == "00") {
                    $("#query_ticket_stu").unbind();
                    $("#query_ticket_stu").removeClass().addClass("btn92s btn-disabled");
                    $("#query_ticket").removeClass().addClass("btn92s")
                }
            }
            if (isstudentDate) {
                $("#query_ticket_stu").unbind();
                $("#query_ticket_stu").removeClass().addClass("btn92s btn-disabled");
                $("#query_ticket").removeClass().addClass("btn92s")
            }
            ab()
        }, 5000)
    }
    changeArriveDate = function (bS, bR) {
        bS = bS.replace(":", "");
        bR = bR.replace(":", "");
        hour_value = Number(bS.substring(0, 2)) + Number(bR.substring(0, 2));
        min_value = Number(bS.substring(2, 4)) + Number(bR.substring(2, 4));
        if (min_value >= 60) {
            hour_value = hour_value + 1
        }
        if (hour_value >= 24 && hour_value < 48) {
            return "次日"
        } else {
            if (hour_value >= 48 && hour_value < 72) {
                return "两日"
            } else {
                if (hour_value >= 72) {
                    return "三日"
                } else {
                    return "当日"
                }
            }
        }
    };
    changeLiShi = function (bR) {
        if (bR.substring(0, 1) == "0") {
            if (bR.substring(1, 2) == "0") {
                if (bR.substring(3, 4) == "0") {
                    bR = bR.substring(4, 5) + "分"
                } else {
                    bR = bR.substring(3, 5) + "分"
                }
            } else {
                bR = bR.substring(1, 2) + "小时" + bR.substring(3, 5) + "分"
            }
        } else {
            if (bR.substring(3, 5) == "00") {
                bR = bR.substring(0, 2) + "小时"
            } else {
                bR = bR.substring(0, 2) + "小时" + bR.substring(3, 5) + "分"
            }
        }
        return bR
    };
    isNum = function (bR) {
        return parseInt(bR)
    };
    buttonText = function () {
        return "预订"
    };

    function ab() {
        if ($("#sf2").is(":checked")) {
            if (v($("#train_date").val()) > v(init_maxPeriod) - 24 * 60 * 60 * 1000) {
                a0()
            } else {
                aX()
            }
        }
    }

    function ac() {
        if (train_tour_flag == "fc") {
            var bR = $("#back_train_date").val()
        } else {
            var bR = $("#train_date").val()
        } if (rqChecked.length == 0) {
            rqChecked.push(bR)
        }
        var bS = false;
        if (bR != rqChecked[0]) {
            for (var bT = 0; bT < rqChecked.length; bT++) {
                if (bR == rqChecked[bT]) {
                    bS = true;
                    rqChecked.splice(bT, 1);
                    $("#date-list input[value=" + rqChecked[0] + "]").prop("checked", false);
                    rqChecked.splice(0, 1, bR);
                    $("#prior_date span[name=" + bR + "]").remove();
                    break
                }
            }
            if (!bS) {
                $("#date-list input[value=" + rqChecked[0] + "]").prop("checked", false);
                rqChecked.splice(0, 1, bR);
                $("#date-list input[value=" + rqChecked[0] + "]").prop("checked", true)
            }
        }
    }
    $("#train_date").focus(function () {
        WdatePicker({
            doubleCalendar: true,
            minDate: $.getMindateForCal(),
            maxDate: $.getMaxdateForCal(),
            isShowClear: false,
            readOnly: true,
            qsEnabled: false,
            onpicked: function () {
                ac();
                $("#train_date").blur();
                var bR = $("#train_date").val();
                var bS = $("#back_train_date").val();
                if ($("#wf").is(":checked")) {
                    if (!bS | v(bR) > v(bS)) {
                        $("#back_train_date").val(bR)
                    }
                }
            }
        })
    });
    $("#date_icon_1").click(function () {
        $("#train_date").focus()
    });
    $("#back_train_date").focus(function () {
        WdatePicker({
            doubleCalendar: true,
            minDate: $("#train_date").val(),
            maxDate: $.getMaxdateForCal(),
            isShowClear: false,
            readOnly: true,
            qsEnabled: false,
            onpicked: function () {
                ac();
                $("#back_train_date").blur()
            }
        })
    });
    $("#date_icon_2").click(function () {
        $("#back_train_date").focus()
    })
})();
var left_ticket_messages = {
    "leftTicketDTO.from_station": "出发站",
    "leftTicketDTO.to_station": "目的站",
    "leftTicketDTO.train_no": "车次",
    "leftTicketDTO.train_date": "出发日",
    back_train_date: "返程日"
};
jQuery.validator.addMethod("checkLoginUserName", function (e, c) {
    var a = false;
    var b = /^[A-Za-z]{1}([A-Za-z0-9]|[_]){0,29}$/;
    var d = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
    if (b.test(e) || d.test(e)) {
        a = true
    }
    return this.optional(c) || a
}, "wrong username.");
jQuery.validator.addMethod("requiredUserName", function (b, a) {
    if ("用户名／邮箱" == b) {
        return false
    }
    if (b == null || "" == b) {
        return false
    }
    return true
}, "wrong username.");
jQuery.validator.addMethod("requiredSchoolName", function (b, a) {
    if ("简码／汉字" == b) {
        return false
    }
    if (b == null || "" == b) {
        return false
    }
    return true
}, "wrong schoolname.");
jQuery.validator.addMethod("randCodeRequired", function (b, a) {
    $("#i-ok").css("display", "none");
    return b.length > 0
}, "验证码错误!");
jQuery.validator.addMethod("randCodeFormat", function (c, b) {
    $("#i-ok").css("display", "none");
    var a = /^[a-zA-Z0-9]+$/;
    return this.optional(b) || a.test(c)
}, "验证码错误!");
jQuery.validator.addMethod("randCodeLength", function (b, a) {
    $("#i-ok").css("display", "none");
    return b.length == 4
}, "验证码错误!.");
jQuery.validator.addMethod("integrationCheck", function (b, a) {
    var c = /^\d{6}$/;
    return this.optional(a) || c.test(b)
}, "wrong integrationpassword");
jQuery.validator.addMethod("integrationPwdCheck", function (b, a, c) {
    if ($("#" + c[0]).val() == $("#" + c[1]).val()) {
        return true
    }
    return false
}, "两次输入密码不一致!.");
jQuery.validator.addMethod("checkRandCode", function (c, b, d) {
    var a = true;
    if (c && c.length == 4) {
        $.ajax({
            url: ctx + "passcodeNew/checkRandCodeAnsyn",
            type: "post",
            data: {
                randCode: c,
                rand: d
            },
            async: false,
            success: function (e) {
                if (e.data == "N") {
                    a = false;
                    $("#i-ok").css("display", "none")
                } else {
                    a = true;
                    $("#i-ok").css("display", "block")
                }
            }
        })
    } else {
        a = false;
        $("#i-ok").css("display", "none")
    }
    return a
}, "验证码错误!.");
jQuery.validator.addMethod("validateUsersName", function (b, a) {
    return this.optional(a) || /^[A-Za-z]{1}([A-Za-z0-9]|[_]){0,29}$/.test(b)
}, "用户名只能由字母、数字或_组成");
jQuery.validator.addMethod("checkWriteSpace", function (c, b) {
    for (var a = 0; a < c.length; a++) {
        if (c.charCodeAt(a) == 32) {
            return false
        }
    }
    return true
}, "contain writespace");
jQuery.validator.addMethod("validateRandCode", function (b, a) {
    return this.optional(a) || /^[a-zA-Z0-9]+$/.test(b)
}, "验证码错误!.");
jQuery.validator.addMethod("checkPassward", function (c, b, e) {
    var d = true;
    for (var a = 0; a < c.length; a++) {
        if (c.charCodeAt(a) == 39 || c.charCodeAt(a) == 60 || c.charCodeAt(a) == 62) {
            d = false
        }
        if (!d) {
            break
        }
    }
    return this.optional(b) || d
}, "Passward wrong");

function validateSecIdCard(g) {
    var f = 0;
    var a = g;
    var e = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙",
        21: "辽宁",
        22: "吉林",
        23: "黑龙",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
    };
    if (!/^\d{17}(\d|x)$/i.test(a)) {
        return false
    }
    a = a.replace(/x$/i, "a");
    if (e[parseInt(a.substr(0, 2))] == null) {
        return false
    }
    var c = a.substr(6, 4) + "-" + Number(a.substr(10, 2)) + "-" + Number(a.substr(12, 2));
    var h = new Date(c.replace(/-/g, "/"));
    if (c != (h.getFullYear() + "-" + (h.getMonth() + 1) + "-" + h.getDate())) {
        return false
    }
    for (var b = 17; b >= 0; b--) {
        f += (Math.pow(2, b) % 11) * parseInt(a.charAt(17 - b), 11)
    }
    if (f % 11 != 1) {
        return false
    }
    return true
}

function validateFirIdCard(g) {
    var f = 0;
    var a;
    var e = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙",
        21: "辽宁",
        22: "吉林",
        23: "黑龙",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
    };
    if (g.length == 15) {
        a = idCardUpdate(g)
    } else {
        a = g
    } if (!/^\d{17}(\d|x)$/i.test(a)) {
        return false
    }
    a = a.replace(/x$/i, "a");
    if (e[parseInt(a.substr(0, 2))] == null) {
        return false
    }
    var c = a.substr(6, 4) + "-" + Number(a.substr(10, 2)) + "-" + Number(a.substr(12, 2));
    var h = new Date(c.replace(/-/g, "/"));
    if (c != (h.getFullYear() + "-" + (h.getMonth() + 1) + "-" + h.getDate())) {
        return false
    }
    for (var b = 17; b >= 0; b--) {
        f += (Math.pow(2, b) % 11) * parseInt(a.charAt(17 - b), 11)
    }
    if (f % 11 != 1) {
        return false
    }
    return true
}

function idCardUpdate(g) {
    var b;
    var f = /^(\d){15}$/;
    if (f.test(g)) {
        var e = 0;
        var a = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var d = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
        g = g.substr(0, 6) + "19" + g.substr(6, g.length - 6);
        for (var c = 0; c < g.length; c++) {
            e += parseInt(g.substr(c, 1)) * a[c]
        }
        g += d[e % 11];
        b = g
    } else {
        b = "#"
    }
    return b
}
jQuery.validator.addMethod("checkBorth", function (e, c) {
    var b = e;
    if (b == "") {
        return true
    } else {
        var a = b.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (a == null) {
            return false
        }
        var f = new Date(a[1], a[3] - 1, a[4]);
        return (f.getFullYear() == a[1] && (f.getMonth() + 1) == a[3] && f.getDate() == a[4])
    }
}, "日期格式不合法");
jQuery.validator.addMethod("byteRangeLength", function (d, b, e) {
    var c = d.length;
    for (var a = 0; a < d.length; a++) {
        if (d.charCodeAt(a) > 127) {
            c++
        }
    }
    return this.optional(b) || (c >= e[0] && c <= e[1])
}, "length wrong");
jQuery.validator.addMethod("checkNameCharBlank", function (c, b, d) {
    var a = d.split("@");
    if ($("#" + a[1]).val() == "") {
        return true
    } else {
        if ($("#" + a[0]).val() == "1" || $("#" + a[0]).val() == "2") {
            return this.optional(b) || /^[a-zA-Z·.．\u4E00-\u9FA5]+$/.test(c)
        } else {
            return this.optional(b) || /^[a-z A-Z·.．\u4E00-\u9FA5]+$/.test(c)
        }
    }
}, "wrong name.");
jQuery.validator.addMethod("checkIdValidStr", function (c, b) {
    var a = /^[a-zA-Z0-9\_\-\(\)]+$/;
    return this.optional(b) || (a.test(c))
}, "wrong id");
jQuery.validator.addMethod("isSecIDCard", function (b, a, c) {
    if (!checkIfSecIdCard($(c).val())) {
        return true
    }
    return validateSecIdCard(b)
}, "wrong");

function checkIfSecIdCard(a) {
    if (a == "1") {
        return true
    }
    return false
}

function checkIfFirIdCard(a) {
    if (a == "2") {
        return true
    }
    return false
}

function checkCardForHKorTW(a) {
    if (a == "C" || a == "G") {
        return true
    }
    return false
}
jQuery.validator.addMethod("isFirIDCard", function (b, a, c) {
    if (!checkIfFirIdCard($(c).val())) {
        return true
    }
    return validateFirIdCard(b)
}, "wrong");
jQuery.validator.addMethod("checkHkongMacao", function (c, b, d) {
    if ($(d).val() == "C") {
        var a = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/;
        return this.optional(b) || (a.test(c))
    } else {
        return true
    }
}, "wrong format.");
jQuery.validator.addMethod("checkTaiw", function (c, a, e) {
    if ($(e).val() == "G") {
        var d = /^[0-9]{8}$/;
        var b = /^[0-9]{10}$/;
        return this.optional(a) || (d.test(c)) || (b.test(c))
    } else {
        return true
    }
}, "wrong format.");
jQuery.validator.addMethod("checkPassport", function (d, b, e) {
    if ($(e).val() == "B") {
        var c = /^[a-zA-Z]*$/;
        if (c.test(d)) {
            return false
        }
        var a = /^[a-zA-Z0-9]{5,17}$/;
        return this.optional(b) || (a.test(d))
    } else {
        return true
    }
}, "wrong format.");
jQuery.validator.addMethod("isMobile", function (c, a) {
    var b = c.length;
    return this.optional(a) || (b == 11 && /^[0-9]+$/.test(c))
}, "wrong mobile phone ");
jQuery.validator.addMethod("isTelePhone", function (b, a) {
    var c = /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^[0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}#)/;
    return this.optional(a) || (c.test(b))
}, "wrong telePhone ");
jQuery.validator.addMethod("illegalChar", function (c, b, e) {
    var d = true;
    for (var a = 0; a < c.length; a++) {
        if (c.charCodeAt(a) == 39 || c.charCodeAt(a) == 60 || c.charCodeAt(a) == 62 || c.charCodeAt(a) == 34 || c.charCodeAt(a) == 63) {
            d = false
        }
        if (!d) {
            break
        }
    }
    return this.optional(b) || d
}, "Illegal char wrong");
jQuery.validator.addMethod("isZipCode", function (c, b) {
    var a = /^[0-9]{6}$/;
    return this.optional(b) || (a.test(c))
}, "wrong zipcode");
jQuery.validator.addMethod("isEmail", function (c, a) {
    var b = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return this.optional(a) || (b.test(trim(c)))
}, "wrong email");

function replaceChar(b) {
    var a = b.value.replace(/['"<> ?]/g, "");
    b.value = a
}

function checkNameChar1(a) {
    return /^[a-zA-Z0-9\u4E00-\u9FA5]+$/.test(a)
}

function trim(a) {
    return a.replace(/(^\s*)|(\s*$)/g, "")
}

function ltrim(a) {
    return a.replace(/(^\s*)/g, "")
}

function rtrim(a) {
    return a.replace(/(\s*$)/g, "")
}
jQuery.validator.addMethod("validateName", function (b, a) {
    return this.optional(a) || /^[a-zA-Z\u4E00-\u9FA50-9\_]+$/.test(b)
}, "wrong username.");
jQuery.validator.addMethod("studentRequired", function (b, a, c) {
    if ($(c).val() == "3") {
        return b && trim(b) != ""
    }
    return true
}, "wrong studentRequired.");
jQuery.validator.addMethod("studentStationRequired", function (b, a, c) {
    if ($(c).val() == "3") {
        return b && trim(b) != "简拼/全拼/汉字" && trim(b) != ""
    }
    return true
}, "wrong studentStationRequired.");
jQuery.validator.addMethod("studentValidateName", function (b, a, c) {
    if ($(c).val() == "3") {
        return this.optional(a) || /^[a-zA-Z\u4E00-\u9FA50-9\_]+$/.test(b)
    }
    return true
}, "wrong username.");
jQuery.validator.addMethod("checkStudentName", function (b, a, c) {
    if ($(c).val() == "3") {
        if ((!b || trim(b) == "" || trim(b) == "简拼/全拼/汉字")) {
            return false
        }
    }
    return true
}, "wrong username.");
jQuery.validator.addMethod("isQuestionNull", function (b, a, c) {
    if (jQuery.trim(b) != "") {
        if (jQuery.trim($(c[0]).val()) == "customQuestion" && jQuery.trim($(c[1]).val()) == "" || jQuery.trim($(c[0]).val()) == "") {
            return false
        }
    }
    return true
}, "you should input the question");
jQuery.validator.addMethod("isAnswerNull", function (b, a, c) {
    if ((jQuery.trim($(c[0]).val()) == "customQuestion" && jQuery.trim($(c[1]).val()) != "") || (jQuery.trim($(c[0]).val()) != "")) {
        if (jQuery.trim(b) == "") {
            return false
        }
    }
    return true
}, "you should input the answer");

function checkSex(c, b, a) {
    if (!checkSexByCardId(c, b, a)) {
        if (!confirm("性别与身份证中的性别不符，是否继续?")) {
            return false
        } else {
            return true
        }
    } else {
        return true
    }
}

function checkSexByCardId(c, e, a) {
    function b(h, i) {
        var g = null;
        if (i.length == 15) {
            g = i.substring(14, 15)
        } else {
            if (i.length == 18) {
                g = i.substring(16, 17)
            } else {
                return true
            }
        } if (g == "x" || g == "X") {
            g = "10"
        }
        var f = parseInt(g);
        var j = f % 2;
        if (j === 0 && h === "F") {
            return true
        } else {
            if (j === 1 && h === "M") {
                return true
            } else {
                return false
            }
        }
    }
    var d = $(a).val();
    if (checkIfSecIdCard($(e).val()) && validateSecIdCard(d)) {
        if (d !== "") {
            return b(c, d)
        } else {
            return true
        }
    } else {
        if (checkIfFirIdCard($(e).val()) && validateFirIdCard(d)) {
            if (d !== "") {
                return b(c, d)
            } else {
                return true
            }
        } else {
            return true
        }
    }
}

function checkBirdDateByCardId(c, e, b) {
    var a = null;
    var d = $(b).val();
    if (checkIfSecIdCard($(e).val()) && d !== "" && validateSecIdCard(d)) {
        a = d.substring(6, 14)
    } else {
        if (checkIfFirIdCard($(e).val()) && d !== "" && validateFirIdCard(d)) {
            if (d.length == 15) {
                a = "19" + d.substring(6, 12)
            } else {
                if (d.length == 18) {
                    a = d.substring(6, 14)
                }
            }
        } else {
            return true
        }
    } if (c !== "") {
        c = c.replace(/-/g, "");
        if (c != a) {
            return false
        } else {
            return true
        }
    } else {
        return true
    }
}

function checkBirdate(c, b, a) {
    if (!checkBirdDateByCardId(c, b, a)) {
        if (!confirm("出生日期与身份证中的出生日期不符，是否继续?")) {
            return false
        } else {
            return true
        }
    } else {
        return true
    }
}
jQuery.validator.addMethod("checkPwdValidate", function (b, a) {
    return this.optional(a) || /(?![a-z]+$|[0-9]+$|_+$)^[a-zA-Z0-9_]{6,}$/.test(b)
}, "contain writespace");
jQuery.validator.addMethod("checkConfirmPassWard", function (b, a, c) {
    if ($(c).val() != null) {
        return $(c).val() == b
    }
    return true
}, "contain writespace");
jQuery.validator.addMethod("IVR_passwd_format", function (b, a) {
    var c = /^[0-9]{6}$/;
    return this.optional(a) || c.test(b)
}, "验证码错误!.");
jQuery.validator.addMethod("checkStation", function (b, a) {
    if ((!b || trim(b) == "" || trim(b) == "简拼/全拼/汉字" || trim(b) == "简拼/全拼/汉字或↑↓")) {
        return false
    }
    return true
}, "wrong username.");
jQuery.validator.addMethod("checkAnsyUserName", function (e, c, f) {
    var b = f[0];
    var d = $("#" + f[1]).val();
    var a = true;
    $.ajax({
        url: b + "?user_name=" + e,
        type: "get",
        async: false,
        success: function (g, h) {
            if (g.data == true) {
                a = false
            } else {
                a = true
            }
        },
        error: function (g, i, h) {
            a = false
        }
    });
    return a
}, "wrong cardNo");

function checkPwdRank(e, a, d) {
    var b = $(e);
    var c = b.val();
    if (c.length <= 6 || new RegExp("^[a-zA-Z]{6,}$").test(c) || new RegExp("^[0-9]{6,}$").test(c) || new RegExp("^[_]{6,}$").test(c)) {
        $("#" + a).attr("title", "危险");
        $("#" + d).html("危险");
        $("#" + a).removeClass("rank-a");
        $("#" + a).removeClass("rank-b");
        $("#" + a).removeClass("rank-c");
        $("#" + a).addClass("rank-a")
    } else {
        if (c.length > 6 && new RegExp("[a-zA-Z]").test(c) && new RegExp("[0-9]").test(c) && new RegExp("[_]").test(c)) {
            $("#" + a).attr("title", "安全");
            $("#" + d).html("安全");
            $("#" + a).removeClass("rank-a");
            $("#" + a).removeClass("rank-b");
            $("#" + a).removeClass("rank-c");
            $("#" + a).addClass("rank-c")
        } else {
            $("#" + a).attr("title", "一般");
            $("#" + d).html("一般");
            $("#" + a).removeClass("rank-a");
            $("#" + a).removeClass("rank-b");
            $("#" + a).removeClass("rank-c");
            $("#" + a).addClass("rank-b")
        }
    }
}
Array.prototype.unique = function () {
    var b = {}, a = this.length;
    for (var c = 0; c < a; c++) {
        if (typeof b[this[c]] == "undefined") {
            b[this[c]] = 1
        }
    }
    this.length = 0;
    a = 0;
    for (var c in b) {
        this[a++] = c
    }
    return this
};

function checkSearchPwdRank(h, c, g) {
    var e = $(h);
    var f = e.val();
    if (f.length < 6) {
        $("#" + c).attr("title", "危险");
        $("#" + g).html("危险");
        $("#" + c).removeClass("rank-a");
        $("#" + c).removeClass("rank-b");
        $("#" + c).removeClass("rank-c");
        $("#" + c).addClass("rank-a")
    } else {
        var a = [];
        for (var b = 0; b < 6; b++) {
            a.push(f.charAt(b))
        }
        a = a.unique();
        var d = a.length;
        if (d == 1) {
            $("#" + c).attr("title", "危险");
            $("#" + g).html("危险");
            $("#" + c).removeClass("rank-a");
            $("#" + c).removeClass("rank-b");
            $("#" + c).removeClass("rank-c");
            $("#" + c).addClass("rank-a")
        } else {
            if (d > 1 && d < 5) {
                $("#" + c).attr("title", "一般");
                $("#" + g).html("一般");
                $("#" + c).removeClass("rank-a");
                $("#" + c).removeClass("rank-b");
                $("#" + c).removeClass("rank-c");
                $("#" + c).addClass("rank-b")
            } else {
                $("#" + c).attr("title", "安全");
                $("#" + g).html("安全");
                $("#" + c).removeClass("rank-a");
                $("#" + c).removeClass("rank-b");
                $("#" + c).removeClass("rank-c");
                $("#" + c).addClass("rank-c")
            }
        }
    }
};
var login_messages = {
    randCodeError: "验证码错误!",
    randCodeLentgh: "验证码长度为4位!",
    randCodeFormat: "验证码只能由数字或字母组成!",
    randCodeEmpty: "验证码不能为空!",
    userNameEmpty: "登录名必须填写!",
    userNameFormat: "登录名格式不正确，请重新输入!",
    passwordEmpty: "密码必须填写,且不少于6位!",
    passwordLength: "密码长度不能少于6位!",
    loginError: "当前访问用户过多,请稍候重试!"
};