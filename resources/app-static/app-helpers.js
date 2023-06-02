var AppRouter = Backbone.Router.extend({
    routes: {
        "": "tillHandler",
        "till(/:key)": "tillHandler",
        "admin/agency/create-agency(/)": "adminHandler",
        "admin/agency/agency-partner(/:key)": "adminHandler",
        "admin/agency/accounts(/:key)": "adminHandler",
        "admin/agency/edit-partner(/)": "adminHandler",
        "admin/agency/agent(/:key)": "adminHandler",
        "admin/agency/agency-payments(/)": "adminHandler",
        "admin/shop/create-shop(/)": "adminHandler",
        "admin/shop/shop-partner(/)": "adminHandler",
        "admin/shop/create-cashier(/)": "adminHandler",
        "admin/shop/accounts(/:key)": "adminHandler",
        "admin/shop/shop-payments(/)": "adminHandler",
        "admin/shop/shop(/:key)": "adminHandler",
        "admin/cashier/create-player(/)": "adminHandler",
        "admin/cashier/edit-player(/)": "adminHandler",
        "admin/cashier/cashier-payment(/)": "adminHandler",
        "admin/cashier/accounts(/:key)": "adminHandler",
        "admin/cashier/transactions(/)": "adminHandler",
        "admin/cashier/settlement(/)": "adminHandler",
        "admin/cashier/player(/:key)": "adminHandler",
        "admin/cashier/cashier-selection(/)": "adminHandler",
        "admin/finances/overview(/)": "adminHandler",
        "admin/bets/bets-overview(/)": "adminHandler",
        "admin/bets/details(/:key)": "adminHandler",
        "admin/bets/search(/)": "adminHandler",
        "admin/partners/partners-summary(/)": "adminHandler",
        "admin/partners/partner(/:key)": "adminHandler",
        "admin/partners/transaction-history(/)": "adminHandler",
        "admin/settings/language(/)": "adminHandler",
        "admin/notifications/messages": "adminHandler",
        "admin/notifications/messages/unread(/:key)": "adminHandler",
        "admin/notifications/messages/read(/:key)": "adminHandler",
        "admin/notifications/messages/create(/:key)": "adminHandler",
        "admin/notifications/payments": "adminHandler",
        "admin/notifications/payments/open(/:key)": "adminHandler",
        "admin/notifications/payments/closed(/:key)": "adminHandler",
        "admin/notifications/payments/finalize(/:key)": "adminHandler",
        cookiemsg: "cookie_msg",
        "*default": "default_route"
    },
    initialize: function() {
        $("body").on("click", 'a[data-rel="back"]', function(a) {
            window.history.back();
            return false
        });
        this.firstPage = true
    },
    tillHandler: function() {
        var a = this.current();
        Tw_AjaxTillUI.getView(a)
    },
    adminHandler: function() {
        var a = this.current();
        MobileAdmin.getView(a)
    },
    cookie_msg: function() {
        if (navigator.cookieEnabled === true) {
            window.location.href = "#";
            return
        }
        var a = $(TwCookie.pageCookieError());
        a.appendTo($.mobile.pageContainer);
        $.mobile.pageContainer.pagecontainer("change", a)
    },
    default_route: function() {
        var a = $(MobileAdminApp.PageNotFound());
        a.appendTo($.mobile.pageContainer);
        $.mobile.pageContainer.pagecontainer("change", a)
    },
    current: function() {
        var f = this,
            a = Backbone.history.fragment,
            g = _.pairs(f.routes),
            e = null,
            d = null,
            c;
        c = _.find(g, function(h) {
            e = _.isRegExp(h[0]) ? h[0] : f._routeToRegExp(h[0]);
            return e.test(a)
        });
        if (c) {
            d = f._extractParameters(e, a);
            if (d.length > 0) {
                for (var b = d.length - 1; b >= 0; b--) {
                    if (d[b] === null) {
                        d.splice(b, 1)
                    }
                }
            }
            e = c[1]
        }
        return {
            route: e,
            fragment: a,
            params: d
        }
    }
});
$(document).ready(function(b) {
    var a = $("#appInitializer");
    if (a.length > 0 && (parseInt(a.val()) === 1)) {
        $.mobile.loading("show");
        setTimeout(function() {
            twRouter = new AppRouter();
            if (TwCookie.isCookieEnabled() === false) {
                window.location.href = "#cookiemsg";
                twRouter.cookie_msg();
                return
            }
            Backbone.history.start();
            String.locale = TwCookie.getLang();
            setTimeout(TwDevice.CheckPrivateBrowsing, 500)
        }, 1000)
    }
});
String.prototype.twformat = function() {
    var a = arguments;
    return this.replace(/\{(\d+)\}/g, function(b, c) {
        return a[c]
    })
};
$(document).ajaxSend(function(a, b, c) {
    if (TwDevice.isIOSWebApp()) {
        c.url += (c.url.indexOf("?") > -1 ? "&" : "?") + "ioswac=1"
    }
});
var eInfoTypeMsg = {
    None: 0,
    Info: 1,
    Error: 2,
    Success: 3,
    ValidationError: 4,
    Confirmation: 5
};
var eTillCardAction = {
    Deposit: 1,
    Withdraw: 2,
    ResetPswd: 3,
    ActivateCard: 4
};
$(function() {
    $(document).on("change", "input[type='checkbox'].cb-shop", function(j) {
        var h = $(j.target);
        var d = h.closest("div.ui-controlgroup-controls");
        var g = d.find("input:checkbox:not(:disabled)");
        var k = g.length;
        var i = g.filter("input:checkbox:checked").length;
        var a = d.closest("div.ui-collapsible-content");
        var f = a.prev().find("span.shop-select");
        if (k === i) {
            f.addClass("level-selected")
        } else {
            f.removeClass("level-selected")
        }
        var b = a.closest("div.shop-level").parent();
        g = b.find("input:checkbox:not(:disabled)");
        k = g.length;
        i = g.filter("input:checkbox:checked").length;
        var c = b.prev().find("span.shop-select");
        if (k === i) {
            c.addClass("level-selected")
        } else {
            c.removeClass("level-selected")
        }
    });
    $(document).on("change", "input, textarea, select, input[type='checkbox']", function(a) {
        a.preventDefault();
        var c = $(this).data("valfunction");
        if (typeof(c) !== "undefined" && c !== null && c !== "") {
            if (typeof(window.TwValidation[c]) === "function") {
                var b = window.TwValidation[c](this)
            }
        }
    });
    $(document).on("keyup keypress", "form input[type='text']", function(c) {
        var a = $(c.target);
        if (!a.is("#searchTerm")) {
            var b = c.keyCode || c.which;
            if (b == 13) {
                c.preventDefault();
                return false
            }
        }
    });
    $(document).on("submit", "form", function(a) {
        var e = $(this);
        var b = false;
        if (e.data("submitted") === true) {
            a.preventDefault();
            b = true
        } else {
            e.data("submitted", true)
        }
        var d = e.find("input[type='submit'], button[type='submit']");
        d.prop("disabled", true);
        if (!b) {
            $.mobile.loading("show");
            var c = e.serializeFormToJSONObject();
            $.ajax({
                type: e.attr("method"),
                url: e.attr("action"),
                data: JSON.stringify(c),
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            }).then(function(i, q, t) {
                if ((t.status === 204) || ((t.status === 200) && (isUndefinedOrNull(i) || isUndefinedOrNull(i.d)))) {
                    return
                }
                var l = i.d;
                if (!isUndefinedOrNull(l.snp)) {
                    var m = (l.snp === -1);
                    NotificationPolling.initPolling(m)
                }
                if (!isUndefinedOrNull(l.csf) && l.csf === 1) {
                    var g = $("#companySelect");
                    if (g.length > 0) {
                        g.collapsible("collapse")
                    }
                }
                if (l.action === 11) {
                    if (!isUndefinedOrNull(l.ats)) {
                        if (!isUndefinedOrNull(l.ats)) {
                            $("#adminBalance").html(l.ats)
                        }
                    }
                    return
                }
                if (l.action === 12) {
                    resolveSearchResult(l.psc, l.html);
                    return
                }
                if (!isUndefinedOrNull(l.uas)) {
                    var f = $("#activity-switch");
                    if (f.length > 0) {
                        var n = f.val();
                        if (n !== l.uas) {
                            f.val(l.uas).flipswitch("refresh")
                        }
                        if (l.uas == "on") {
                            $(".account-holder").removeClass("user-inactive").addClass("user-active")
                        } else {
                            $(".account-holder").removeClass("user-active").addClass("user-inactive")
                        }
                    }
                }
                if (l.action === 2) {
                    twRouter.navigate(l.redirectUri, {
                        trigger: true
                    });
                    return
                }
                if (l.action === 8) {
                    window.location.replace(l.redirectUri);
                    return
                }
                if (l.action === 3) {
                    diplayInfoMessage(l.message, l.html, l.mode);
                    revalidateForm(l.validators);
                    return
                }
                if (l.action === 5) {
                    if (l.mode === 5) {
                        var j = (!isUndefinedOrNull(l.crf) && l.crf === 1);
                        var r = 0;
                        var k;
                        if (j) {
                            k = $("#shopSelector")
                        } else {
                            k = $(".tw-ul-overview")
                        }
                        if (k.length > 0) {
                            r = k.offset().top;
                            k.remove()
                        }
                        var p = $('<div data-role="page"></div>');
                        $(l.html).appendTo(p);
                        p.appendTo("body").page().trigger("create");
                        var o = $("<div></div>");
                        o.append(p.children());
                        p.remove();
                        if (!isUndefinedOrNull(l.crf) && l.crf === 1) {
                            $("#shopChecker").removeClass("shops-selected").parent("div.ui-btn").removeClass("ui-btn-f");
                            $("#shopSelectWrap").append(o);
                            var h = $("#companySelectPanel");
                            if (h.length > 0) {
                                h.panel("close")
                            }
                        } else {
                            $("form:not('.nested-form')").append(o)
                        }
                    } else {
                        var p = $(l.html);
                        p.appendTo($.mobile.pageContainer);
                        $.mobile.pageContainer.pagecontainer("change", p);
                        if (!isUndefinedOrNull(l.ppMsg)) {
                            MobileAdmin.displayPopup(l.ppMsg)
                        }
                    }
                    return
                }
                if (l.action === 1) {
                    if (!isUndefinedOrNull(l.mode) && l.mode === 6) {
                        if (!isUndefinedOrNull(l.newLocale)) {
                            String.locale = l.newLocale
                        }
                    }
                    if (!isUndefinedOrNull(l.html)) {
                        var p = $(l.html);
                        p.appendTo($.mobile.pageContainer);
                        $.mobile.pageContainer.pagecontainer("change", p);
                        twRouter.navigate(l.redirectUri)
                    }
                    if (!isUndefinedOrNull(l.uts)) {
                        $("#saldo-box").html(l.uts)
                    }
                    if (!isUndefinedOrNull(l.ats)) {
                        $("#adminBalance").html(l.ats)
                    }
                    if (!isUndefinedOrNull(l.ppMsg)) {
                        MobileAdmin.displayPopup(l.ppMsg)
                    }
                    if (!isUndefinedOrNull(l.rcf)) {
                        $("input[type='text']").val("0.00")
                    }
                }
                if (l.status === 101) {
                    var s = l.validators;
                    diplayInfoMessage(l.message, l.html);
                    revalidateForm(l.validators)
                } else {
                    if (l.status === 200) {
                        diplayInfoMessage(l.message, l.html)
                    } else {
                        if (l.status === 500) {
                            diplayInfoMessage(l.message, l.html)
                        }
                    }
                }
            }, function(h, g) {
                if (!isUndefinedOrNull(h.responseText)) {
                    var f = $.parseJSON(h.responseText);
                    if (h.status === 500) {
                        if (f.d.action === 1) {
                            var i = $(f.d.html);
                            i.appendTo($.mobile.pageContainer);
                            $.mobile.pageContainer.pagecontainer("change", i);
                            twRouter.navigate(f.d.redirectUri)
                        } else {
                            diplayInfoMessage("", f.d.html, f.d.mode)
                        }
                    } else {
                        if (h.status === 302 || h.status === 303 || h.status === 401 || h.status === 403) {
                            twRouter.navigate(f.d.redirectUri, {
                                trigger: true
                            })
                        }
                    }
                }
                return ($.Deferred().reject())
            }).always(function() {
                $.mobile.loading("hide");
                d.prop("disabled", false);
                e.data("submitted", false)
            })
        }
        a.preventDefault()
    });
    $(document).on("vclick", ".tw-btn-scan", function(a) {
        a.preventDefault();
        ScanCardUser()
    })
});
var TwCookie = (function() {
    var d = "userPrefs";
    var a = "ulang";
    var b = function() {
        var h = $.cookie(a);
        if (typeof h === "undefined" || h === null) {
            try {
                h = window.navigator.language
            } catch (f) {
                h = "en-US"
            }
        }
        var i = ["de-DE", "hr-HR", "fr-FR", "it-IT", "tr-TR", "sq-AL", "en-US"];
        var g = jQuery.inArray(h, i);
        if (g == -1) {
            h = "en-US"
        }
        return h
    };
    var c = function() {
        return (navigator.cookieEnabled || "cookie" in document && (document.cookie.length > 0 || (document.cookie = "test").indexOf.call(document.cookie, "test") > -1))
    };
    var e = function(h) {
        String.locale = TwCookie.getLang();
        var i = "Cookie error";
        var f = "Your web browser does not support cookies or cookies are disabled. Please enable cookies for total page functionality";
        var g = '<div data-role="page" id="page_not_found"><div data-role="header" data-theme="b"><h1>%TITLE%</h1></div><div data-role="content"><br /><div class="tw-page-not-found">%MSG%</div><br /><a href="javascript:void(0);" onclick="window.location.reload();" class="ui-link ui-btn ui-btn-a ui-icon-refresh ui-btn-icon-left ui-shadow ui-corner-all tw-white-space-normal">Reload</a></div></div>';
        g = g.replace("%TITLE%", i);
        g = g.replace("%MSG%", f);
        return g
    };
    return {
        getLang: b,
        isCookieEnabled: c,
        pageCookieError: e
    }
}());

function validateGroup(g) {
    if (g === "registerPlayerAuto") {
        $("#registerMode").val("1");
        return true
    }
    var t = $("input[data-valgroup='" + g + "'], textarea[data-valgroup='" + g + "'], select[data-valgroup='" + g + "']");
    if (typeof t === "undefined" || t == null) {
        return true
    }
    var s = t.length;
    var q = new Array(s);
    var r = "";
    var f;
    var m;
    for (var j = 0; j < s; j++) {
        q[j] = true;
        m = $(t[j]).data("skip");
        if (typeof(m) !== "undefined" && m === 1) {
            continue
        }
        r = $(t[j]).data("valfunction");
        if (typeof(r) !== "undefined" && r !== "") {
            f = window.TwValidation[r];
            if (typeof(f) === "function") {
                q[j] = f(t[j])
            }
        }
    }
    var l = true;
    if (q.length > 0) {
        for (var j = 0; j < q.length; j++) {
            if (q[j] === false) {
                l = false;
                break
            }
        }
    }
    if (l) {
        if (g === "createAgencyPartner" || g === "createShopPartner" || g === "createCashier") {
            var n = "";
            var c = [];
            var b = $("#agencyViewWrap").find("input[type='checkbox']:checked");
            if (b !== "undefined" && b.length > 0) {
                for (var j = 0; j < b.length; j++) {
                    c.push($(b[j]).val())
                }
                if (g === "createCashier") {
                    if (c.length > 1) {
                        n = getInfoMsgHtml(eInfoTypeMsg.Info, _maxOptionLimitExceeded, "Info", 4);
                        MobileAdmin.displayPopup(n);
                        return false
                    }
                    var a = MobileAdmin.getMailList();
                    if (a.length === 0) {
                        n = getInfoMsgHtml(eInfoTypeMsg.Info, _mailListEmptyInfo, "Info", 4);
                        MobileAdmin.displayPopup(n);
                        return false
                    }
                    $("#mailList").val(a.join(";"))
                }
                $("#levelList").val(c.join())
            } else {
                l = false;
                n = getInfoMsgHtml(eInfoTypeMsg.Info, _noOptionSelected, "Info", 4);
                MobileAdmin.displayPopup(n)
            }
        } else {
            if (g === "dFilterForms") {
                var p = [];
                var o = $("#shopSelector").find("input[type='checkbox']:checked");
                if (o !== "undefined" && o.length > 0) {
                    for (var j = 0; j < o.length; j++) {
                        p.push($(o[j]).val())
                    }
                }
                if (p.length === 0) {
                    var k = getInfoMsgHtml(eInfoTypeMsg.Info, _noOptionSelected, "Info", 4);
                    MobileAdmin.displayPopup(k);
                    return false
                }
                $("#levelList").val(p.join())
            } else {
                if (g === "registerPlayer") {
                    $("#registerMode").val("2")
                } else {
                    if (g === "login") {
                        if ($("#unameRemember").prop("checked")) {
                            $("#unameHidden").attr("disabled", true)
                        }
                    } else {
                        if (g === "activation") {
                            if ($("#terms").prop("checked")) {
                                $("#tacHidden").attr("disabled", true)
                            }
                        } else {
                            if (g === "transactions") {
                                $("#currentPage").val("1")
                            } else {
                                if (g === "dFilterForms") {
                                    if (t.length > 1) {
                                        if (TwValidation.isStartDateGreater(t[0], t[1]) == true) {
                                            l = false;
                                            var h = getInfoMsgHtml(eInfoTypeMsg.ValidationError, "%validation.sDateGreather".toLocaleString(), "Info", 1);
                                            diplayInfoMessage("Info", h, 1)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (!l && g === "registerPlayer") {
        var d = $("#collapsible_RegisterNewUser").find("input.input_textbox_error, div.input_textbox_error");
        var e = $("#collapsible_RegisterNewUser").find("input.input_textbox_error, div.input_textbox_error").eq(0).closest("div.ui-collapsible");
        e.collapsible("expand")
    }
    return l
}

function validatePaymentGroup(a, c) {
    var b = validateGroup(a);
    if (b) {
        $("#paymentMode").val(c)
    }
    return b
}
$.fn.serializeFormToJSONObject = function() {
    var c = {};
    var b = this.serializeArray();
    $.each(b, function() {
        if (c[this.name] !== undefined) {
            if (!c[this.name].push) {
                c[this.name] = [c[this.name]]
            }
            c[this.name].push(this.value || "")
        } else {
            c[this.name] = this.value || ""
        }
    });
    return c
};
var TwValidation = (function() {
    var aa = "input_textbox_error";
    var p = "error-red";

    function A(ad) {
        var af = V(ad.value);
        var ae = false;
        if (!v(af) && (/^[a-zA-Z0-9_-]{4,20}$/.test(af))) {
            ae = true
        }
        N($(ad), ae);
        return ae
    }

    function D(ad) {
        var ae = V(ad.value);
        var af = (!v(ae) && (/^[0-9]{1,20}$/.test(ae)));
        N($(ad), af);
        return af
    }

    function z(ad) {
        var af = V(ad.value);
        var ae = false;
        if (!v(af) && XRegExp("^[a-zA-Z0-9!#$()@?{}|*+,^./&=%_:;~-]{4,40}$").test(af)) {
            ae = true
        }
        N($(ad), ae);
        return ae
    }

    function e(ad) {
        var af = V(ad.value);
        var ae = false;
        if (!v(af)) {
            ae = XRegExp("^[\\p{L}0-9 ]{4,30}$").test(af)
        }
        N($(ad), ae);
        return ae
    }

    function f(ad) {
        var af = V(ad.value);
        var ae = true;
        if (!v(af)) {
            ae = XRegExp("^[\\p{L}0-9]{4,30}$").test(af)
        }
        N($(ad), ae);
        return ae
    }

    function k(ad) {
        var af = V(ad.value);
        var ae = u(af);
        N($(ad), ae);
        return ae
    }

    function o(ad) {
        var ae = true;
        var af = V(ad.value);
        if (!v(af)) {
            ae = u(af)
        }
        N($(ad), ae);
        return ae
    }

    function j(ag) {
        var ah = false;
        var ad = $(ag).val();
        var ae = $(ag).data("twperiod");
        ad = ad.split(".");
        if (ad.length > 2) {
            var ai = ad[1] + "-" + ad[0] + "-" + ad[2];
            var af = XRegExp("^(?:(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])-(19|20)[0-9]{2})$");
            if (af.test(ai)) {
                ah = true
            }
        }
        N($(ag), ah);
        return ah
    }

    function d(ad) {
        var af = $("#monthSelect").val();
        var ae = $("#daySelect").val();
        var ag = $("#year").val();
        var ah = s(af, ae, ag);
        O($(ad), ah, true);
        return ah
    }

    function Y(ad) {
        var af = V(ad.value);
        var ae = (!v(af) && /^[a-zA-Z0-9_-]{4,20}$/.test(af));
        N($(ad), ae);
        return ae
    }

    function T(ad) {
        var ae = ad.checked;
        O($(ad), ae, false);
        return ae
    }

    function P(ad) {
        var af = V(ad.value);
        var ae = false;
        if (!v(af)) {
            ae = XRegExp("^[\\p{L}0-9-. ]{4,30}$").test(af)
        }
        N($(ad), ae);
        return ae
    }

    function R(ad) {
        var af = V(ad.value);
        var ae = true;
        if (!v(af)) {
            ae = XRegExp("^[\\p{L}0-9 '-._]{1,80}$").test(af)
        }
        N($(ad), ae);
        return ae
    }

    function S(ad) {
        var af = V(ad.value);
        var ae = (!v(af)) && (XRegExp("^[\\p{L}0-9 '-.?]{1,80}$").test(af));
        N($(ad), ae);
        return ae
    }

    function B(ad) {
        var af = V(ad.value);
        var ae = (!v(af) && (XRegExp("^[\\p{L}0-9!#$()?{}|*+,^.-/+&=%_:;~\\s\\n'\"-]{2,255}$").test(af)));
        N($(ad), ae);
        return ae
    }

    function U(ad) {
        var af = $(ad);
        var ag = af.val();
        var ae = (ag === "0" || ag === "1");
        O(af, ae, false);
        return ae
    }

    function M(ad) {
        var af = $(ad);
        var ag = af.val();
        var ae = false;
        if (!v(ag) && (ag !== "-1") && (/^[a-zA-Z0-9_-]{1,20}$/.test(ag))) {
            ae = true
        }
        O(af, ae, false);
        return ae
    }

    function C(ad) {
        var af = V(ad.value);
        var ae = (!v(af) && (XRegExp("^[\\p{L}0-9 '-.]{1,60}$").test(af)));
        N($(ad), ae);
        return ae
    }

    function a(ae) {
        var ad = V(ae.value);
        var af = (!v(ad) && XRegExp("^[\\p{L}0-9 /'-.]{1,80}$").test(ad));
        N($(ae), af);
        return af
    }

    function E(ae) {
        var af = true;
        var ad = V(ae.value);
        if (!v(ad)) {
            if (!XRegExp("^[\\p{L}0-9 /'-.]{1,60}$").test(ad)) {
                af = false
            }
        }
        N($(ae), af);
        return af
    }

    function F(ae) {
        var af = true;
        var ad = V(ae.value);
        if (!v(ad)) {
            if (!XRegExp("^[a-zA-Z0-9!#$()@?{}|*+,^./&=%_:;~-]{4,20}$").test(ad)) {
                af = false
            }
        }
        N($(ae), af);
        return af
    }

    function i(ad) {
        var af = $(ad);
        var ag = af.val();
        var ae = (ag !== "-1");
        O(af, ae, false);
        return ae
    }

    function q(ae) {
        var ad = V(ae.value);
        var af = true;
        if (!v(ad)) {
            af = /^[a-zA-Z0-9 -]{1,20}$/.test(ad)
        }
        N($(ae), af);
        return af
    }

    function H(ad) {
        var af = V(ad.value);
        var ae = (!v(af) && (/^[a-zA-Z0-9-]{1,20}$/.test(af)));
        N($(ad), ae);
        return ae
    }

    function h(ae) {
        var ag = $(ae);
        var ad = parseInt(ag.val(), 10);
        var af = (!isUndefinedOrNull(ad) && (ad > 0));
        O(ag, af, false);
        return af
    }

    function g(ad) {
        var ag = $(ad);
        var af = parseInt(ag.val(), 10);
        var ae = (!isUndefinedOrNull(af) && (af > 0) && (af < 7));
        O(ag, ae, false);
        return ae
    }

    function G(ad) {
        var af = V(ad.value);
        var ae = true;
        if (!v(af)) {
            ae = (/^\+[1-9]{1}[0-9]{6,30}$/.test(af))
        }
        N($(ad), ae);
        return ae
    }

    function Z(ad) {
        var af = V(ad.value);
        var ae = (!v(af) && (/^[a-zA-Z0-9_-]{5,20}$/.test(af)));
        N($(ad), ae);
        return ae
    }

    function I(ad) {
        var ae = x(ad.value);
        N($(ad), ae);
        return ae
    }

    function L(ae) {
        var ag = ae.value;
        var ad = $("#pswd").val();
        var af = (!v(ag) && (ag === ad));
        N($(ae), af);
        return af
    }

    function J(ae) {
        var ag = $(ae).val();
        var ad = $("#pswdCurrent").val();
        var af = (ag !== ad && x(ag));
        N($(ae), af);
        var ah = document.getElementById("pswdRepeated");
        if (!v(ah.value)) {
            K(ah)
        }
        return af
    }

    function K(ae) {
        var ad = $("#pswdCurrent").val();
        var ag = $("#pswd").val();
        var af = ((ae.value === ag) && (ag !== ad) && x(ae.value));
        N($(ae), af);
        return af
    }

    function l(ad) {
        var af = V(ad.value);
        var ae = (af === ad.defaultValue);
        N($(ad), ae);
        return ae
    }

    function m(ae) {
        var ah = V(ae.value);
        var ad = V($("#currentMail").val());
        var af = (ah !== ad && u(ah));
        N($(ae), af);
        var ag = document.getElementById("emailRepeated");
        if (!v(ag.value)) {
            n(ag)
        }
        return af
    }

    function n(ad) {
        var af = V($("#currentMail").val());
        var ag = V($("#email").val());
        var ae = ((ad.value === ag) && (ag !== af) && u(ad.value));
        N($(ad), ae);
        return ae
    }

    function ac() {
        var ad = X($("#language").val(), 0);
        var ae = X($("#newLang").val());
        if (t(ad) && t(ae) && (ad !== ae)) {
            return true
        }
        return false
    }

    function c(ad) {
        var ag = ad.value.replace(",", ".");
        var ah = $(ad).data("twccaccount");
        var af;
        if (ah != 1) {
            af = (!v(ag) && /^\d+(\.\d{0,2})?$/.test(ag));
            if (af) {
                var ae = parseFloat(ag);
                if (ae <= 0 || isNaN(ae)) {
                    af = false
                }
            }
        } else {
            af = (!v(ag) && /^(\-|\+)?\d+(\.\d{0,4})?$/.test(ag));
            if (af) {
                var ae = parseFloat(ag);
                if (isNaN(ae)) {
                    af = false
                }
            }
        }
        N($(ad), af);
        return af
    }

    function b(ae) {
        var ag = ae.value;
        var ad = W(ag, -1);
        var af = (ad > 0);
        N($(ae), af);
        return af
    }

    function u(ad) {
        if (v(ad)) {
            return false
        }
        var ae = /^[a-zA-Z][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/;
        return ae.test(ad)
    }

    function s(am, al, ao, ah) {
        if (am === "-1" || al === "-1" || ao === "-1") {
            return false
        }
        var an = am + "-" + al + "-" + ao;
        var ak = XRegExp("^(?:(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])-(19|20)[0-9]{2})$");
        if (!ak.test(an)) {
            return false
        }
        var ad = parseInt(al, 10);
        var ae = parseInt(am, 10);
        var af = parseInt(ao, 10);
        var ag = new Date(af, ae - 1, ad, 0, 0, 0, 0);
        if (ag.getFullYear() == af && ag.getMonth() + 1 == ae && ag.getDate() == ad) {
            var ai = new Date((ag.getFullYear() + 18), ag.getMonth(), ag.getDate());
            var aj = new Date();
            if ((aj.getTime() - ai.getTime()) > 0) {
                return true
            }
        }
        return false
    }

    function y(ag, ad) {
        var ai = $(ag).val();
        var af = $(ad).val();
        ai = ai.split(".");
        af = af.split(".");
        if (ai.length > 2 && af.length > 2) {
            var ah = new Date(parseInt(ai[2], 10), parseInt(ai[1], 10) - 1, parseInt(ai[0], 10), 0, 0, 0, 0);
            var ae = new Date(parseInt(af[2], 10), parseInt(af[1], 10) - 1, parseInt(af[0], 10), 0, 0, 0, 0);
            if (ah.getTime() > ae.getTime()) {
                return true
            }
        }
        return false
    }

    function x(ae) {
        var ad = XRegExp("^[a-zA-Z0-9!#$()@?{}|*+,^./&=%_:;~-]{5,40}$");
        if (!v(ae) && ad.test(ae)) {
            return true
        }
        return false
    }

    function v(ad) {
        if (typeof(ad) === "number") {
            return false
        }
        if (typeof ad === "undefined" || ad == null) {
            return true
        }
        return ad.replace(/\s/g, "").length < 1
    }

    function X(ag, ae) {
        var ad = typeof(ag);
        if (ad === "number" && ag > 0) {
            return ag
        }
        var af = ae;
        if (ag !== null && typeof(ag) !== "undefined") {
            if (ag.length > 0) {
                if (!isNaN(ag) && isFinite(ag)) {
                    af = parseInt(ag, 10)
                }
            }
        }
        return af
    }

    function t(ad) {
        return ((ad > 0 && ad < 8) || ad === 9)
    }

    function N(ae, ad) {
        if (ad === true) {
            ae.removeClass(aa)
        } else {
            ae.addClass(aa)
        }
    }

    function O(ag, af, ae) {
        var ad;
        if (ae) {
            ad = ag.closest("div.ui-controlgroup-controls")
        } else {
            ad = ag.closest("div")
        }
        if (af === true) {
            ad.removeClass(aa)
        } else {
            ad.addClass(aa)
        }
    }

    function V(ad) {
        return $.trim(ad)
    }

    function w() {
        var ad = arguments.length;
        if (ad === 0) {
            return false
        }
        for (var ae = 0; ae < ad; ae++) {
            if (v(arguments[ae]) || !(/^[0-9]{1,20}$/.test(arguments[ae]))) {
                return false
            }
        }
        return true
    }

    function ab(ae) {
        if (isUndefinedOrNull(ae) || ae.length === 0) {
            return true
        }
        for (var ad = 0; ad < ae.length; ad++) {
            if (v(ae[ad]) || !(/^[0-9]{1,20}$/.test(ae[ad]))) {
                return false
            }
        }
        return true
    }

    function r(ae) {
        if (isUndefinedOrNull(ae) || ae.length === 0) {
            return false
        }
        if ((ae.length % 4) != 0) {
            return false
        }
        var ad = new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$");
        return ad.test(ae)
    }

    function W(ad, ae) {
        var ag = ae;
        if (!isUndefinedOrNull(ad) && ad.length > 0) {
            var ah = ad.replace(",", ".");
            if ((/^\d+(\.\d{0,2})?$/.test(ah)) && (ah.length > 0)) {
                if (!isNaN(ah) && isFinite(ah)) {
                    var af = parseFloat(ah);
                    if (af > 0) {
                        ag = af
                    }
                }
            }
        }
        return ag
    }

    function Q(ag) {
        var ah = $.trim(ag.value);
        var af = X($("#minSearchChars").val(), 0);
        if (!v(ah) && ah.length > 0 && ah.length >= af) {
            if (/^[a-zA-Z0-9 _-]{1,30}$/.test(ah)) {
                N($(ag), true);
                return true
            }
        }
        if (ah === "" || ah.length === 0) {
            var ad = $("#playersList");
            var ae = ad.children();
            ae.filter(function(ai, aj) {
                return $(this).hasClass("ui-screen-hidden")
            }).removeClass("ui-screen-hidden");
            ag.defaultValue = "";
            $("#searchInfo, #playersListSearch").addClass("fieldHide");
            $("#playersList").removeClass("fieldHide");
            N($(ag), true)
        } else {
            N($(ag), false)
        }
        return false
    }
    return {
        isNullOrWhitespace: v,
        loginUname: A,
        loginPswd: z,
        cardName: e,
        cardPswd: f,
        email: k,
        dateValid: j,
        birthdate: d,
        isStartDateGreater: y,
        sender: R,
        subject: S,
        message: B,
        title: U,
        name: C,
        address: a,
        houseNumber: q,
        postalCode: H,
        country: h,
        contactLanguage: g,
        phoneNumber: G,
        username: Z,
        pswd: I,
        pswdRepeated: L,
        resolveError: N,
        resolveSelectError: O,
        user: Y,
        pswdNew: J,
        pswdNewRepeated: K,
        validateSelectedLang: ac,
        emailCurrent: l,
        emailNew: m,
        emailNewRepeated: n,
        tryParseInt: X,
        tryParseFloat: W,
        validateNumbers: w,
        searchOffer: P,
        isNumericArrayValid: ab,
        isBase64: r,
        betLimitAmount: c,
        mailOptional: o,
        optionalField: E,
        optionalPin: F,
        currency: i,
        terms: T,
        amount: b,
        numeric: D,
        searchPlayer: Q,
        recipient: M
    }
})();
var Tw_AjaxTillUI = (function() {
    var d = "till/";
    var c = "GET";
    var a = "json";
    var b = function(e) {
        if (e.params.length < 1) {
            e.params[0] = "tmenu"
        }
        return $.ajax({
            type: c,
            dataType: a,
            url: d + e.params[0],
            data: {},
            cache: false,
            beforeSend: function(f) {
                $.mobile.loading("show")
            }
        }).then(function(f, i, j) {
            if ((j.status === 204) || ((j.status === 200) && (isUndefinedOrNull(f) || isUndefinedOrNull(f.d)))) {
                return ($.Deferred().reject())
            }
            var g = f.d;
            if (g.action === 2) {
                window.location.replace(g.redirectUri);
                return
            }
            if (!isUndefinedOrNull(g.action) && !isUndefinedOrNull(g.mode)) {
                if (g.action === 3) {
                    diplayInfoMessage("", g.html, g.mode)
                }
            } else {
                var h = $(g.html);
                h.appendTo($.mobile.pageContainer);
                $.mobile.pageContainer.pagecontainer("change", h);
                if (g.action === 1) {
                    twRouter.navigate(g.redirectUri)
                }
                return (f)
            }
        }, function(i, h) {
            try {
                if (!isUndefinedOrNull(i.responseText)) {
                    var g = $.parseJSON(i.responseText);
                    if (i.status === 500 || i.status === 404) {
                        if (g.d.action === 1) {
                            var j = $(g.d.html);
                            j.appendTo($.mobile.pageContainer);
                            $.mobile.pageContainer.pagecontainer("change", j);
                            twRouter.navigate(g.d.redirectUri)
                        } else {
                            diplayInfoMessage("", g.d.html, g.d.mode)
                        }
                    } else {
                        if (i.status === 302 || i.status === 303 || i.status === 401 || i.status === 403) {
                            twRouter.navigate(g.d.redirectUri, {
                                trigger: true
                            })
                        }
                    }
                }
            } catch (f) {}
            return ($.Deferred().reject())
        }).always(function() {
            $.mobile.loading("hide")
        })
    };
    return {
        getView: b
    }
}());
var TwDevice = (function() {
    var j = 0;
    var h = false;
    var g = function(k, l) {
        viewport = document.querySelector("meta[name=viewport]");
        viewport.setAttribute("content", "initial-scale=" + k + ", maximum-scale=" + l + ", user-scalable=no");
        viewport.setAttribute("width", "width=device-width")
    };
    var a = function() {
        var q = window,
            p = navigator.userAgent,
            o = navigator.platform,
            r = p.match(/AppleWebKit\/([0-9]+)/),
            s = !!r && r[1],
            k = p.match(/Fennec\/([0-9]+)/),
            l = !!k && k[1],
            n = p.match(/Opera Mobi\/([0-9]+)/),
            m = !!n && n[1];
        if (((o.indexOf("iPhone") > -1 || o.indexOf("iPad") > -1 || o.indexOf("iPod") > -1))) {
            if (s && s < 534) {
                return eIOS_Version.IOS_4_3Bellow
            } else {
                if (s && s >= 534 && s < 537) {
                    return eIOS_Version.IOS4_3_Till_7
                } else {
                    return eIOS_Version.IOS_7
                }
            }
        }
        return false
    };
    var c = function() {
        var m = window,
            l = navigator.userAgent,
            k = navigator.platform,
            n = l.match(/AppleWebKit\/([0-9]+)/),
            o = !!n && n[1];
        if ((l.indexOf("Android") > -1)) {
            return true
        }
        return false
    };
    var e = function() {
        var n = false;
        var l = window.navigator.userAgent;
        var k = window.navigator;
        var m = (/iphone|ipod|ipad/i).test(l);
        var o = l.indexOf("Safari") > -1 && l.indexOf("CriOS") < 0 && l.indexOf("Mercury") < 0;
        if (m == true) {
            n = true
        }
        return n
    };
    var d = function() {
        var m = false;
        var l = window.navigator.userAgent;
        var k = window.navigator;
        if (e() == true) {
            if (l.indexOf("iPad") > -1) {
                m = true;
                g(1.3, 1.3)
            }
        }
        return m
    };
    var f = function() {
        d();
        if (c() === true) {
            if (window.screen.availHeight >= 1000 || window.screen.availWidth >= 1000) {
                g(1.3, 1.3)
            }
        }
    };
    var b = function() {
        if (true === true) {
            var n = "sTest",
                m = window.sessionStorage;
            try {
                m.setItem(n, "test");
                m.removeItem(n)
            } catch (k) {
                if (k.code == DOMException.QUOTA_EXCEEDED_ERR && m.length == 0) {
                    String.locale = TwCookie.getLang();
                    var l = "%mobileAdmin.iPrivateBrowsing".toLocaleString()
                } else {
                    throw k
                }
            }
        }
    };
    var i = function() {
        if (j > 0) {
            return h
        }
        j = 1;
        var k = window.navigator.userAgent;
        if (typeof(k) !== "undefined" && k !== "") {
            if ((/iphone|ipad|ipod/i).test(k)) {
                if (("standalone" in window.navigator) && window.navigator.standalone) {
                    h = true
                }
            }
        }
        return h
    };
    return {
        CheckIOSAddHome: a,
        IsAndroid: c,
        IsIPhone: e,
        IsIPad: d,
        SetTabletViewPort: f,
        CheckPrivateBrowsing: b,
        isIOSWebApp: i
    }
}());
var MobileAdminApp = (function() {
    var c = function() {
        String.locale = TwCookie.getLang();
        var h = "%pageNotFound.title".toLocaleString();
        var f = "%pageNotFound.msg".toLocaleString();
        var e = "%pageNotFound.contact".toLocaleString();
        var d = "%pageNotFound.back".toLocaleString();
        var g = '<div data-role="page" id="page_not_found"><div data-role="header" data-theme="b"><h1>%TITLE%</h1></div><div data-role="content"><ul data-role="listview" data-inset="true"><li data-role="list-divider" data-theme="b" style="text-indent:1em;">' + h + '</li><li><div class="tw-info tw-msg-info2"></div><div class="tw-popup-box">%MSG%</div></li></ul><a class="ui-link ui-btn ui-btn-f ui-mini ui-icon-mail ui-btn-icon-left ui-shadow ui-corner-all tw-white-space-normal">%CONTACT_US%</a><a href="#till/tmenu" class="ui-link ui-btn ui-btn-c ui-icon-home ui-mini ui-btn-icon-left ui-shadow ui-corner-all tw-white-space-normal">%BACK_LINK%</a></div></div>';
        g = g.replace("%TITLE%", h);
        g = g.replace("%BACK_LINK%", d);
        g = g.replace("%MSG%", f);
        g = g.replace("%CONTACT_US%", e);
        return g
    };
    var b = function(f) {
        String.locale = TwCookie.getLang();
        var g = f.statusText;
        var d = f.statusHTML;
        var e = '<div data-role="page" id="page_not_found"><div data-role="header" data-theme="b"><h1>%TITLE%</h1></div><div data-role="content"><br /><div class="tw-page-not-found">%MSG%</div><br /><a href="javascript:void(0);" onclick="window.location.reload();" class="ui-link ui-btn ui-btn-a ui-icon-refresh ui-btn-icon-left ui-shadow ui-corner-all tw-white-space-normal">Reload</a></div></div>';
        e = e.replace("%TITLE%", g);
        e = e.replace("%MSG%", d);
        return e
    };
    var a = function(g) {
        var d = $("#" + g).find("input");
        var f = $("#" + g).find("textarea");
        var e = $("#" + g).find(".ui-input-text");
        $(d).each(function(h, i) {
            $(i).unbind()
        });
        $(f).each(function(h, i) {
            $(i).unbind()
        })
    };
    return {
        PageNotFound: c,
        PageCookieError: b,
        ClearBindings: a
    }
}());
var TwNavigation = (function() {
    var b = function() {
        var d = Backbone.history.getFragment($(this).attr("href"));
        Backbone.history.fragment = null;
        Backbone.history.navigate(d, true)
    };
    var a = function(d) {
        if (Backbone.history.fragment == d) {
            Backbone.history.fragment = null;
            Backbone.history.navigate(d, true)
        } else {
            Backbone.history.navigate(d, {
                trigger: true
            })
        }
    };
    var c = function() {
        window.scroll(0, 0)
    };
    return {
        ChangeRoute: a,
        PageTop: c,
        forceReload: b
    }
}());

function diplayInfoMessage(c, d, b) {
    if ($("div.ui-popup-active").length > 0) {
        $("input.tw-custom-close").click()
    }
    var a = $("div.ui-content");
    if (b === 1 || b === 2) {
        if (b === 1) {
            $("#twMainContentView").addClass("fieldHide")
        } else {
            $("#twMainContentView").remove();
            $("li.ui-li-admin-account").closest("ul").hide()
        }
        var f = $('<div data-role="page"></div>');
        $(d).appendTo(f);
        f.appendTo("body").page().trigger("create");
        var e = $("<div></div>");
        e.append(f.children());
        f.remove();
        if ($("#twInfoContentView").length > 0) {
            $("#twInfoContentView").empty().append(e).removeClass("fieldHide")
        } else {
            $("div.ui-page-active").empty().removeClass("ui-page ui-page-active").append(e)
        }
    } else {
        if (b === 3) {
            $("#twMainContentView").prepend(d)
        }
    }
}

function hideInfoView() {
    $("#twInfoContentView, #twInfoView").addClass("fieldHide");
    var c = $("#twMainContentView");
    var a = c.find(".input_textbox_error").eq(0);
    c.removeClass("fieldHide");
    var b = (a.data("ignorefocus") !== "undefined" && a.data("ignorefocus") === 1);
    if (!b) {
        a.focus().select()
    }
}

function getInfoMsgHtml(e, d, g, f) {
    var b = "tw-info tw-msg-info2";
    var a = "OK";
    var c = "";
    if (f == 4) {
        c = "<ul class='ui-listview' id='twInfoView' data-role='listview' data-inset='true'><li class='ui-li-divider ui-bar-inherit ui-first-child' data-role='list-divider' role='heading'>{0}</li><li class='ui-li-static ui-body-inherit'><div class='{1}'></div><div class='tw-popup-box'>{2}</div></li><li class='ui-li-static ui-body-inherit'><input type='button' data-iconpos='right' data-mini='true' data-theme='e' class='admin-popup-close' data-icon='check' value='{3}' /></li></ul>"
    } else {
        if (f == 2) {
            c = "<ul class='ui-listview' id='twInfoView' data-role='listview' data-inset='true'><li class='ui-li-divider ui-bar-inherit ui-first-child' data-role='list-divider' role='heading'>{0}</li><li class='ui-li-static ui-body-inherit'><div class='{1}'></div><div class='tw-popup-box'>{2}</div></li><li class='ui-li-static ui-body-inherit'><a style='text-align:center;' data-role='button' href='#till/tmenu' data-theme='b' data-iconpos='right' class='ui-link ui-btn ui-icon-check ui-btn-icon-right ui-shadow ui-corner-all' data-mini='true' data-icon='check'>{3}</a></li></ul>"
        } else {
            if (f == 3) {
                a = "%csButton.close".toLocaleString();
                c = "<ul class='ui-listview' id='twInfoView' data-role='listview' data-inset='true'><li class='ui-li-divider ui-bar-inherit ui-first-child' data-role='list-divider' role='heading'>{0}</li><li class='ui-li-static ui-body-inherit'><div class='{1}'></div><div class='tw-popup-box'>{2}</div></li><li class='ui-li-static ui-body-inherit'><input type='button' data-iconpos='right' data-icon='check' onclick='hideInfoView();' value='{3}' /></li></li></ul>"
            } else {
                c = "<ul class='ui-listview' id='twInfoView' data-role='listview' data-inset='true'><li class='ui-li-divider ui-bar-inherit ui-first-child' data-role='list-divider' role='heading'>{0}</li><li class='ui-li-static ui-body-inherit'><div class='{1}'></div><div class='tw-popup-box'>{2}</div></li><li class='ui-li-static ui-body-inherit'><input type='button' data-iconpos='right' data-icon='check' onclick='hideInfoView();' value='{3}' /></li></ul>"
            }
        }
    }
    switch (e) {
        case eInfoTypeMsg.Error:
            b = "tw-info tw-msg-warning";
            break;
        case eInfoTypeMsg.Success:
            b = "tw-info tw-msg-check-circle2";
            break;
        case eInfoTypeMsg.ValidationError:
            b = "tw-info tw-msg-warning3";
            break;
        case eInfoTypeMsg.Confirmation:
            b = "tw-info tw-msg-question-circle";
            break
    }
    c = c.replace("{0}", g);
    c = c.replace("{1}", b);
    c = c.replace("{2}", d);
    c = c.replace("{3}", a);
    return c
}

function revalidateForm(a) {
    var e = $("#twMainContentView").find(".input_textbox_error").removeClass("input_textbox_error");
    if (!isArrayEmpty(a)) {
        var d;
        var c;
        for (var b = 0; b < a.length; b++) {
            d = $("#" + a[b]);
            c = false;
            if (d.is("select") || d.is("input[type='checkbox']")) {
                if (d.closest(".ui-select").parent().hasClass("ui-controlgroup-controls")) {
                    c = true
                }
                TwValidation.resolveSelectError(d, false, c)
            } else {
                TwValidation.resolveError(d)
            }
            d.data("skip", 0)
        }
    }
}

function switchLanguage(c, a) {
    var d = $(c);
    if ((d).hasClass("ui-btn-c")) {
        return false
    }
    var b = $("#langList").find("a").removeClass("ui-btn-c");
    d.addClass("ui-btn-c");
    $("#newLang").val(a)
}

function isUndefinedOrNull(a) {
    if (typeof(a) === "undefined" || a === null) {
        return true
    }
    return false
}

function isArrayEmpty(a) {
    if (typeof(a) === "undefined" || a === null || a.length === 0) {
        return true
    }
    return false
}
var MobileAdmin = (function() {
    var j = "admin/";
    var c = "GET";
    var a = "json";
    var b = function(q) {
        return $.ajax({
            type: c,
            dataType: a,
            url: q.fragment,
            data: {},
            cache: false,
            beforeSend: function(r) {
                $.mobile.loading("show")
            }
        }).then(function(r, u, v) {
            if ((v.status === 204) || ((v.status === 200) && (isUndefinedOrNull(r) || isUndefinedOrNull(r.d)))) {
                return ($.Deferred().reject())
            }
            var s = r.d;
            if (s.action === 2) {
                window.location.replace(s.redirectUri);
                return
            }
            if (!isUndefinedOrNull(s.action) && !isUndefinedOrNull(s.mode)) {
                if (s.action === 3) {
                    diplayInfoMessage("", s.html, s.mode)
                }
            } else {
                var t = $(s.html);
                t.appendTo($.mobile.pageContainer);
                $.mobile.pageContainer.pagecontainer("change", t);
                if (s.action === 1) {
                    twRouter.navigate(s.redirectUri)
                }
                return (r)
            }
        }, function(u, t) {
            try {
                if (!isUndefinedOrNull(u.responseText)) {
                    var s = $.parseJSON(u.responseText);
                    if (u.status === 500 || u.status === 404) {
                        if (s.d.action === 1) {
                            var v = $(s.d.html);
                            v.appendTo($.mobile.pageContainer);
                            $.mobile.pageContainer.pagecontainer("change", v);
                            twRouter.navigate(s.d.redirectUri)
                        } else {
                            diplayInfoMessage("", s.d.html, s.d.mode)
                        }
                    } else {
                        if (u.status === 302 || u.status === 303 || u.status === 401 || u.status === 403) {
                            twRouter.navigate(s.d.redirectUri, {
                                trigger: true
                            })
                        }
                    }
                }
            } catch (r) {}
            return ($.Deferred().reject())
        }).always(function() {
            $.mobile.loading("hide")
        })
    };
    var n = function(q) {
        var s = $(q).data("cid");
        $("#levelCode").val(s);
        var t = $("#centrale-" + s).text();
        var r = $(q).data("aid");
        if (typeof(r) !== "undefined") {
            $("#agencyCode").val(r);
            t += " / " + $("#agency-" + r).text()
        }
        $("#centraleBox").text(t);
        $("#agencyViewWrap").addClass("fieldHide");
        $("#agencyForm").removeClass("fieldHide")
    };
    var f = function() {
        $("#centraleBox").text("");
        $("#instanceName, #address").removeClass("input_textbox_error").val("");
        $("#levelCode, #agencyCode").val("-1");
        $("#currency").parent("div").removeClass("input_textbox_error");
        $("#agencyForm").addClass("fieldHide");
        $("#agencyViewWrap").removeClass("fieldHide")
    };
    var i = function(q) {
        $('<div id="popupAdmin">').mdialog({
            useCustomClose: true,
            customCloseClass: "admin-popup-close",
            maxWidth: -1,
            content: q
        })
    };
    var d = function() {
        var q = $("#reportMail");
        var r = $("#reportMailList");
        r.removeClass("fieldHide");
        var v = TwValidation.email(q[0]);
        if (v) {
            var s = k();
            var x = $.trim(q.val());
            var u = false;
            if (s.length > 0) {
                for (var t = 0, w = s.length; t < w; t++) {
                    if (x === s[t]) {
                        u = true;
                        break
                    }
                }
            }
            if (!u) {
                r.prepend("<li class='ui-li-static ui-body-inherit'><div class='ui-grid-a'><div class='ui-block-a' style='width:80%;'><div class='mail-part'>" + x + "</div></div><div class='ui-block-b' style='width:20%;'><a onclick='MobileAdmin.removeMail(this);' class='ui-link ui-btn ui-mini ui-icon-delete ui-btn-icon-notext ui-shadow ui-corner-all ui-btn-text'>Delete</a></div></div></li>");
                q.val("")
            }
        }
    };
    var l = function(s) {
        var q = $(s);
        q.closest("li").remove();
        var r = $("#reportMailList").find("li");
        if (r.length === 0) {
            $mailList.addClass("fieldHide")
        }
    };
    var k = function() {
        var t = [];
        var r = $("#reportMailList").find("li");
        if (r.length > 0) {
            for (var s = 0; s < r.length; s++) {
                var q = $(r[s]).find("div.mail-part");
                if (q.length > 0) {
                    t.push(q.text())
                }
            }
        }
        return t
    };
    var m = function(u, w) {
        w.preventDefault();
        w.stopPropagation();
        var s = $(u);
        var A = s.data("level");
        var v = "level-selected";
        var y = s.hasClass(v);
        var r = s.closest("h3").next("div.ui-collapsible-content");
        var D;
        var C = y ? "input:checkbox:checked" : "input:checkbox:not(:checked)";
        D = r.find(C);
        if (D.length > 0) {
            for (var x = 0, z = D.length; x < z; x++) {
                $(D[x]).prop("checked", !y).checkboxradio("refresh")
            }
        }
        if (y) {
            s.removeClass(v);
            if (A === 1) {
                r.children().find("span." + v).removeClass(v)
            } else {
                s.closest("div.ui-collapsible-content").prev("h3").find("span." + v).removeClass(v)
            }
        } else {
            s.addClass(v);
            if (A === 1) {
                r.children().find("span.shop-select").addClass(v)
            } else {
                var q = r.closest("div.shop-level").parent();
                var t = q.children("div.shop-level").children(".ui-collapsible-heading").find("span.shop-select");
                var E = t.length;
                var B = t.filter("span.level-selected").length;
                if (E === B) {
                    q.prev().find("span.shop-select").addClass("level-selected")
                }
            }
        }
    };
    var p = function(w) {
        var q = $(w);
        var u = q.hasClass("shops-selected");
        var x = u ? "input:checkbox:checked" : "input:checkbox:not(:checked)";
        var r = $("#shopSelector");
        var s = r.find(x);
        if (s.length > 0) {
            for (var t = 0, v = s.length; t < v; t++) {
                $(s[t]).prop("checked", !u).checkboxradio("refresh")
            }
        }
        if (!u) {
            r.find(".shop-select").addClass("level-selected");
            q.addClass("shops-selected").parent("div.ui-btn").addClass("ui-btn-f")
        } else {
            r.find(".shop-select").removeClass("level-selected");
            q.removeClass("shops-selected").parent("div.ui-btn").removeClass("ui-btn-f")
        }
    };
    var g = function() {
        $("#masterDetailsBox").addClass("fieldHide");
        $("#twMainContentView").removeClass("fieldHide")
    };
    var e = function(r) {
        var s = TwValidation.tryParseInt(r.data("amount"), -1);
        if (s < 1) {
            return
        }
        var q = $(".amount-block");
        var t = TwValidation.tryParseFloat(q.val(), 0);
        t = t + s;
        q.val(t).change()
    };
    var h = function() {
        $("#alternatingBlock").addClass("fieldHide");
        $("#keypadWrapper").removeClass("fieldHide")
    };

    function o(t) {
        var A = $(t.target);
        if (!A.is("input[type='button']")) {
            return
        }
        var u = "input_textbox_error";
        var w = $("#keypadAmount");
        var q = $("#alternatingBlock");
        var x = w.data("tempamount").toString();
        var s = A.data("cmd");
        if (!TwValidation.isNullOrWhitespace(s)) {
            if (s === "resetAmount") {
                var y = 0;
                if (parseFloat(x) > 0) {
                    var r = x.substring(0, x.length - 1);
                    if (r.length > 0 && r !== "0.") {
                        y = parseFloat(r)
                    }
                }
                w.val(y.toFixed(2)).data("tempamount", y)
            } else {
                if (s === "setTotalInput") {
                    if (!TwValidation.betLimitAmount(w[0])) {
                        return
                    }
                    q.find("input[type='text'].amount-block").val(x).trigger("change")
                }
                $("#keypadWrapper").addClass("fieldHide");
                q.removeClass("fieldHide");
                if (w.hasClass("input_textbox_error")) {
                    w.removeClass("input_textbox_error")
                }
                w.val("0.00").data("defamount", 0).data("tempamount", "0")
            }
            return
        }
        var z = A.val();
        if (x === "0" && z === "0") {
            return
        }
        if (x === "0" && z !== ".") {
            x = z
        } else {
            x = x.concat(z)
        }
        if (x.length >= 12) {
            return
        }
        var v = /^\d+(\.\d{0,2})?$/.test(x);
        if (!v) {
            return
        }
        if (w.hasClass(u)) {
            w.removeClass(u)
        }
        w.data("tempamount", x).val((parseFloat(x)).toFixed(2))
    }
    return {
        getView: b,
        setAgencyForm: n,
        cancelAgency: f,
        displayPopup: i,
        addMail: d,
        removeMail: l,
        getMailList: k,
        selectShops: m,
        closeDetailedView: g,
        calculateAmount: e,
        displayKeypad: h,
        setTransferAmount: o,
        toggleShops: p
    }
}());

function switchPanel(b) {
    var a = ["#personalSection", "#contactSection", "#accountSection"];
    $(a[b]).collapsible("expand")
}
var getBetsDetails = function(a) {
    $(a).addClass("ui-disabled");
    $.mobile.loading("show");
    var b = $(a).data("sid");
    $.ajax({
        type: "POST",
        url: "admin/bets/details",
        data: JSON.stringify({
            routeAction: "bets/details",
            __RequestVerificationToken: $("input:hidden[name=__RequestVerificationToken]").val(),
            sid: b
        }),
        dataType: "json",
        contentType: "application/json; charset=utf-8"
    }).then(function(d, i, l) {
        if ((l.status === 204) || ((l.status === 200) && (isUndefinedOrNull(d) || isUndefinedOrNull(d.d)))) {
            return
        }
        var g = d.d;
        if (g.action === 2) {
            twRouter.navigate(g.redirectUri, {
                trigger: true
            });
            return
        }
        if (g.action === 8) {
            window.location.replace(g.redirectUri);
            return
        }
        if (g.action === 3) {
            diplayInfoMessage(g.message, g.html, g.mode);
            revalidateForm(g.validators);
            return
        }
        if (g.action === 5) {
            if (g.mode === 5) {
                var j = 0;
                var f = $("ul.tw-ul-overview");
                if (f.length > 0) {
                    j = f.offset().top;
                    f.remove()
                }
                var e = $(g.html).listview().listview("refresh");
                $("form:not('.nested-form')").append(e);
                if ((j - 10) > 0) {
                    $(document).scrollTop((j - 10))
                }
            } else {
                var h = $(g.html);
                h.appendTo($.mobile.pageContainer);
                $.mobile.pageContainer.pagecontainer("change", h)
            }
            return
        }
        if (g.action === 9) {
            var e = $(g.html).listview().listview("refresh");
            var c = $("#masterDetailsBox");
            c.empty().append(e);
            $("#twMainContentView").addClass("fieldHide");
            c.removeClass("fieldHide");
            $(document).scrollTop();
            return
        }
        if (g.action === 1) {
            if (!isUndefinedOrNull(g.mode) && g.mode === 6) {
                if (!isUndefinedOrNull(g.newLocale)) {
                    String.locale = g.newLocale
                }
            }
            var h = $(g.html);
            h.appendTo($.mobile.pageContainer);
            $.mobile.pageContainer.pagecontainer("change", h);
            twRouter.navigate(g.redirectUri);
            if (!isUndefinedOrNull(g.ppMsg)) {
                MobileAdmin.displayPopup(g.ppMsg)
            }
        }
        if (g.status === 101) {
            var k = g.validators;
            diplayInfoMessage(g.message, g.html);
            revalidateForm(g.validators)
        } else {
            if (g.status === 200) {
                diplayInfoMessage(g.message, g.html)
            } else {
                if (g.status === 500) {
                    diplayInfoMessage(g.message, g.html)
                }
            }
        }
    }, function(e, d) {
        if (!isUndefinedOrNull(e.responseText)) {
            var c = $.parseJSON(e.responseText);
            if (e.status === 500) {
                if (c.d.action === 1) {
                    var f = $(c.d.html);
                    f.appendTo($.mobile.pageContainer);
                    $.mobile.pageContainer.pagecontainer("change", f);
                    twRouter.navigate(c.d.redirectUri)
                } else {
                    diplayInfoMessage("", c.d.html, c.d.mode)
                }
            } else {
                if (e.status === 302 || e.status === 303 || e.status === 401 || e.status === 403) {
                    twRouter.navigate(c.d.redirectUri, {
                        trigger: true
                    })
                }
            }
        }
        return ($.Deferred().reject())
    }).always(function() {
        $.mobile.loading("hide");
        $(a).removeClass("ui-disabled")
    })
};
$(document).on("click", "button.payment-chip", function(b) {
    b.stopPropagation();
    var a = $(b.target);
    MobileAdmin.calculateAmount(a)
});
$(document).on("click", "a.ui-input-clear.ui-icon-delete, a.ui-flipswitch-on", function(a) {
    a.stopPropagation();
    if ($(a.target).is(".ui-flipswitch-on")) {
        a.preventDefault()
    }
});

function openHomeMenu() {
    $("#companySelectPanel").panel("open", {
        options: {
            position: "right",
            animate: false,
            dismissable: false
        }
    })
}
$(document).on("keyup", "#searchCardUserAuto", function(c) {
    var h = c.target;
    var g = $.trim(h.value);
    if (g.length > 20) {
        if (c.which == 8 || c.which == 46) {
            return
        }
    }
    if (h.defaultValue === g) {
        return
    }
    if (!(/^[a-zA-Z0-9 _-]{0,30}$/.test(g))) {
        h.value = h.defaultValue;
        return
    }
    var a = $("#playersList");
    var b = a.children();
    if (g === "" || g.length === 0) {
        b.filter(function(e, j) {
            return $(this).hasClass("ui-screen-hidden")
        }).removeClass("ui-screen-hidden");
        h.defaultValue = "";
        $("#searchInfo, #playersListSearch").addClass("fieldHide");
        $("#playersList").removeClass("fieldHide");
        return
    }
    g = g.toLowerCase();
    h.defaultValue = g;
    var d = 0;
    if (d === 0) {
        if (parseInt($("#searchMode").val()) === 1) {
            var f = parseInt($("#minSearchChars").val());
            if (g.length >= f) {
                if (!isUndefinedOrNull($.active) && $.active === 0) {
                    getUsers($(h))
                }
            }
        } else {
            $("#searchInfo").removeClass("fieldHide")
        }
    } else {
        $("#searchInfo").addClass("fieldHide")
    }
});
var getUsers = function(a) {
    try {
        a.addClass("ui-disabled");
        $.mobile.loading("show");
        var c = a.val();
        $.ajax({
            type: "POST",
            url: "admin/cashier/search",
            data: JSON.stringify({
                routeAction: "cashier/search",
                __RequestVerificationToken: $("input:hidden[name=__RequestVerificationToken]").val(),
                search: c
            }),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            timeout: 5000
        }).then(function(d, f, g) {
            if ((g.status === 204) || ((g.status === 200) && (isUndefinedOrNull(d) || isUndefinedOrNull(d.d)))) {
                return
            }
            var e = d.d;
            resolveSearchResult(e.psc, e.html)
        }, function(e, d) {
            return ($.Deferred().reject())
        }).always(function() {
            $.mobile.loading("hide");
            a.removeClass("ui-disabled")
        })
    } catch (b) {
        $.mobile.loading("hide");
        a.removeClass("ui-disabled")
    }
};

function switchPage(a) {
    twRouter.navigate($(a).val(), {
        trigger: true
    })
}

function setSimpleHintPopup(b) {
    if (isUndefinedOrNull(b) || (b < 1) || (b > 2)) {
        return
    }
    var a;
    if (b === 1) {
        a = "%inputHint.username".toLocaleString()
    } else {
        if (b === 2) {
            a = "%inputHint.pswd".toLocaleString()
        }
    }
    $("<div>").mdialog({
        closeButton: "right",
        isSimpleBox: true,
        isMiniBox: true,
        content: a
    })
}

function resetFormField(c) {
    var a = $(c).closest("li").find("input[type='text']");
    var b = a[0].defaultValue;
    if (a.val() !== b) {
        a.val(b)
    }
    if (a.hasClass("input_textbox_error")) {
        a.removeClass("input_textbox_error")
    }
}

function resetPlayersSearch() {
    $("#searchCardUserAuto, #searchCardUserManual").val("");
    $("#searchInfo").addClass("fieldHide");
    $("#playersList").removeClass("fieldHide")
}

function resolveSearchResult(f, e) {
    var a = $("#playersList");
    var c = $("#searchInfo");
    var b = $("#playersListSearch");
    if (b.length > 0) {
        b.remove()
    }
    if (!isUndefinedOrNull(f) && f <= 0) {
        a.addClass("fieldHide");
        c.removeClass("fieldHide");
        return
    }
    if (!isUndefinedOrNull(e)) {
        a.addClass("fieldHide");
        c.addClass("fieldHide");
        var d = $(e).listview().listview("refresh");
        a.after(d)
    }
}
var NotificationPolling = (function() {
    function d() {
        var f = false;
        return $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: notificatinsPollingConfig.route,
            timeout: notificatinsPollingConfig.timeout,
            data: null
        }).then(function(h, i, j) {
            if ((j.status === 200) && b(h) && b(h.d)) {
                var g = h.d;
                f = true;
                if (b(g.anc)) {
                    if (g.anc.npa === 1) {
                        if (b(g.anc.pc)) {
                            $("#payCount").html(g.anc.pc)
                        }
                        if (b(g.anc.mc)) {
                            $("#msgCount").html(g.anc.mc)
                        }
                    } else {
                        if (g.anc.npa === -1) {
                            f = false
                        }
                    }
                }
            }
        }, function(i, h, g) {
            f = true
        }).always(function() {
            if (f) {
                a()
            }
        })
    }

    function b(f) {
        if (typeof(f) !== "undefined" && f !== null) {
            return true
        }
        return false
    }
    var c = (function() {
        var f = 0;
        return function(g, h, i) {
            clearTimeout(f);
            if (!i) {
                f = setTimeout(g, h)
            }
        }
    })();

    function a(h) {
        var g = 10000;
        var f = b(h) ? h : false;
        if (b(notificatinsPollingConfig) && b(notificatinsPollingConfig.interval)) {
            g = notificatinsPollingConfig.interval
        }
        c(e, g, f)
    }

    function e() {
        d()
    }
    return {
        initPolling: a
    }
})();
var ConfirmationDialog = (function() {
    function g(h, j) {
        var i = typeof(h);
        if (i === "number" && h > 0) {
            return h
        }
        var k = j;
        if (h !== null && i !== "undefined") {
            if (h.length > 0) {
                if (!isNaN(h) && isFinite(h)) {
                    k = parseInt(h, 10)
                }
            }
        }
        return k
    }

    function b(h) {
        $("<div>").mdialog({
            content: "<ul id='appModalPopup' data-role='listview' class='popupContainer'><li data-role='list-divider'>" + notificationConfirmPopup.title + "</li><li class='tw-popup-li'><div class='tw-info tw-msg-question-circle'></div><div class='tw-popup-box'>" + h + "</div></li><li class='tw-popup-li'><input type='button' value='" + notificationConfirmPopup.yes + "' onclick='ConfirmationDialog.submitForm(this);' data-mini='true' data-icon='check' data-iconpos='right' data-theme='c' /></li><li class='tw-popup-li'><input type='button' class='tw-custom-close' value='" + notificationConfirmPopup.close + "' data-mini='true' data-icon='back' data-iconpos='right' data-theme='e' /></li></ul>",
            popDismissable: false,
            useCustomClose: true,
            customCloseClass: "tw-custom-close"
        })
    }

    function f() {
        $("#noficationForm").submit()
    }

    function e(j) {
        var i = $(j);
        var h = $("#resolveMode");
        h.val("-1");
        var l = g(i.data("mode"), 0);
        if (l <= 0) {
            return
        }
        h.val(l);
        var k = a(l);
        b(k)
    }

    function d() {
        b(notificationConfirmPopup.remove)
    }

    function a(i) {
        var h = "Confirm";
        if (i === c.Approve) {
            h = notificationConfirmPopup.approve
        } else {
            if (i === c.Decline) {
                h = notificationConfirmPopup.decline
            } else {
                if (i === c.Finalize) {
                    h = notificationConfirmPopup.finalize
                } else {
                    if (i === c.Delete) {
                        h = notificationConfirmPopup.remove
                    }
                }
            }
        }
        return h
    }
    var c = {
        None: 0,
        Approve: 1,
        Decline: 2,
        Finalize: 3,
        Delete: 4
    };
    return {
        setConfirmPopup: e,
        setMessagePopup: d,
        submitForm: f
    }
}());
$(function() {
    try {
        if (parseInt($("#pollInit").val()) === 1) {
            NotificationPolling.initPolling()
        }
    } catch (a) {}
});