$.ajaxSetup({
    type: "POST",
    headers: {
        "cache-control": "no-cache"
    }
});
$(document).on("mobileinit", function() {
    $.mobile.allowCrossDomainPages = true;
    $.mobile.defaultPageTransition = "none";
    $.mobile.defaultDialogTransition = "none";
    $.mobile.defaultDialogTransition = "none";
    $.mobile.buttonMarkup.hoverDelay = 0;
    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
    $.mobile.ignoreContentEnabled = true;
    $.mobile.transitionFallbacks.slide = "none";
    $.mobile.toolbar.prototype.options.addBackBtn = true;
    $.mobile.toolbar.prototype.options.backBtnTheme = "a"
});
$(document).on("pagebeforeshow", function(e, d) {
    var f = d.prevPage.attr("id");
    var c = $.mobile.activePage.attr("id");
    if (f === c) {
        d.prevPage.attr("id", "dummyID")
    }
    var b = "%mobileAdmin.backBtn".toLocaleString();
    if (b === "%mobileAdmin.backBtn") {
        b = "Back"
    }
    var a = $('a[data-rel="back"]');
    if (c !== "tcardactions") {
        a.html("&nbsp;")
    }
    if (c !== "Loading_aspx") {
        if ($("body").hasClass("binit")) {
            $("body").removeClass("binit").addClass("bnormal");
            $.mobile.loading("hide")
        }
    }
});
$(document).on("pagehide", function(a, b) {
    MobileAdminApp.ClearBindings(a.target.id);
    $(a.target).remove();
    $("body > div.ui-popup-container, body > div.ui-popup-screen").remove()
});