<!DOCTYPE html>
<html>
<head>
    <noscript>
<meta http-equiv="refresh" content="0; URL=noscript.aspx" />
</noscript>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta charset="utf-8">
    <script type="b7b0fa9aac6351b820105084-text/javascript">
        window.NREUM || (NREUM = {});
        NREUM.info = {
            "beacon": "bam.nr-data.net",
            "errorBeacon": "bam.nr-data.net",
            "licenseKey": "0cedf0d3d6",
            "applicationID": "127913867",
            "transactionName": "YwEGYBYFDERRVERQXFpLJWc0SwZSVlZFVUcaBRdEHA==",
            "queueTime": 0,
            "applicationTime": 6,
            "agent": "",
            "atts": ""
        }
    </script>
    <script type="b7b0fa9aac6351b820105084-text/javascript">
        (window.NREUM || (NREUM = {})).loader_config = {
            licenseKey: "0cedf0d3d6",
            applicationID: "127913867"
        };
        window.NREUM || (NREUM = {}), __nr_require = function(e, n, t) {
            function r(t) {
                if (!n[t]) {
                    var i = n[t] = {
                        exports: {}
                    };
                    e[t][0].call(i.exports, function(n) {
                        var i = e[t][1][n];
                        return r(i || n)
                    }, i, i.exports)
                }
                return n[t].exports
            }
            if ("function" == typeof __nr_require) return __nr_require;
            for (var i = 0; i < t.length; i++) r(t[i]);
            return r
        }({
            1: [function(e, n, t) {
                function r() {}

                function i(e, n, t) {
                    return function() {
                        return o(e, [u.now()].concat(f(arguments)), n ? null : this, t), n ? void 0 : this
                    }
                }
                var o = e("handle"),
                    a = e(4),
                    f = e(5),
                    c = e("ee").get("tracer"),
                    u = e("loader"),
                    s = NREUM;
                "undefined" == typeof window.newrelic && (newrelic = s);
                var p = ["setPageViewName", "setCustomAttribute", "setErrorHandler", "finished", "addToTrace", "inlineHit", "addRelease"],
                    l = "api-",
                    d = l + "ixn-";
                a(p, function(e, n) {
                    s[n] = i(l + n, !0, "api")
                }), s.addPageAction = i(l + "addPageAction", !0), s.setCurrentRouteName = i(l + "routeName", !0), n.exports = newrelic, s.interaction = function() {
                    return (new r).get()
                };
                var m = r.prototype = {
                    createTracer: function(e, n) {
                        var t = {},
                            r = this,
                            i = "function" == typeof n;
                        return o(d + "tracer", [u.now(), e, t], r),
                            function() {
                                if (c.emit((i ? "" : "no-") + "fn-start", [u.now(), r, i], t), i) try {
                                    return n.apply(this, arguments)
                                } catch (e) {
                                    throw c.emit("fn-err", [arguments, this, e], t), e
                                } finally {
                                    c.emit("fn-end", [u.now()], t)
                                }
                            }
                    }
                };
                a("actionText,setName,setAttribute,save,ignore,onEnd,getContext,end,get".split(","), function(e, n) {
                    m[n] = i(d + n)
                }), newrelic.noticeError = function(e, n) {
                    "string" == typeof e && (e = new Error(e)), o("err", [e, u.now(), !1, n])
                }
            }, {}],
            2: [function(e, n, t) {
                function r(e, n) {
                    var t = e.getEntries();
                    t.forEach(function(e) {
                        "first-paint" === e.name ? c("timing", ["fp", Math.floor(e.startTime)]) : "first-contentful-paint" === e.name && c("timing", ["fcp", Math.floor(e.startTime)])
                    })
                }

                function i(e, n) {
                    var t = e.getEntries();
                    t.length > 0 && c("lcp", [t[t.length - 1]])
                }

                function o(e) {
                    if (e instanceof s && !l) {
                        var n, t = Math.round(e.timeStamp);
                        n = t > 1e12 ? Date.now() - t : u.now() - t, l = !0, c("timing", ["fi", t, {
                            type: e.type,
                            fid: n
                        }])
                    }
                }
                if (!("init" in NREUM && "page_view_timing" in NREUM.init && "enabled" in NREUM.init.page_view_timing && NREUM.init.page_view_timing.enabled === !1)) {
                    var a, f, c = e("handle"),
                        u = e("loader"),
                        s = NREUM.o.EV;
                    if ("PerformanceObserver" in window && "function" == typeof window.PerformanceObserver) {
                        a = new PerformanceObserver(r), f = new PerformanceObserver(i);
                        try {
                            a.observe({
                                entryTypes: ["paint"]
                            }), f.observe({
                                entryTypes: ["largest-contentful-paint"]
                            })
                        } catch (p) {}
                    }
                    if ("addEventListener" in document) {
                        var l = !1,
                            d = ["click", "keydown", "mousedown", "pointerdown", "touchstart"];
                        d.forEach(function(e) {
                            document.addEventListener(e, o, !1)
                        })
                    }
                }
            }, {}],
            3: [function(e, n, t) {
                function r(e, n) {
                    if (!i) return !1;
                    if (e !== i) return !1;
                    if (!n) return !0;
                    if (!o) return !1;
                    for (var t = o.split("."), r = n.split("."), a = 0; a < r.length; a++)
                        if (r[a] !== t[a]) return !1;
                    return !0
                }
                var i = null,
                    o = null,
                    a = /Version\/(\S+)\s+Safari/;
                if (navigator.userAgent) {
                    var f = navigator.userAgent,
                        c = f.match(a);
                    c && f.indexOf("Chrome") === -1 && f.indexOf("Chromium") === -1 && (i = "Safari", o = c[1])
                }
                n.exports = {
                    agent: i,
                    version: o,
                    match: r
                }
            }, {}],
            4: [function(e, n, t) {
                function r(e, n) {
                    var t = [],
                        r = "",
                        o = 0;
                    for (r in e) i.call(e, r) && (t[o] = n(r, e[r]), o += 1);
                    return t
                }
                var i = Object.prototype.hasOwnProperty;
                n.exports = r
            }, {}],
            5: [function(e, n, t) {
                function r(e, n, t) {
                    n || (n = 0), "undefined" == typeof t && (t = e ? e.length : 0);
                    for (var r = -1, i = t - n || 0, o = Array(i < 0 ? 0 : i); ++r < i;) o[r] = e[n + r];
                    return o
                }
                n.exports = r
            }, {}],
            6: [function(e, n, t) {
                n.exports = {
                    exists: "undefined" != typeof window.performance && window.performance.timing && "undefined" != typeof window.performance.timing.navigationStart
                }
            }, {}],
            ee: [function(e, n, t) {
                function r() {}

                function i(e) {
                    function n(e) {
                        return e && e instanceof r ? e : e ? c(e, f, o) : o()
                    }

                    function t(t, r, i, o) {
                        if (!l.aborted || o) {
                            e && e(t, r, i);
                            for (var a = n(i), f = v(t), c = f.length, u = 0; u < c; u++) f[u].apply(a, r);
                            var p = s[y[t]];
                            return p && p.push([b, t, r, a]), a
                        }
                    }

                    function d(e, n) {
                        h[e] = v(e).concat(n)
                    }

                    function m(e, n) {
                        var t = h[e];
                        if (t)
                            for (var r = 0; r < t.length; r++) t[r] === n && t.splice(r, 1)
                    }

                    function v(e) {
                        return h[e] || []
                    }

                    function g(e) {
                        return p[e] = p[e] || i(t)
                    }

                    function w(e, n) {
                        u(e, function(e, t) {
                            n = n || "feature", y[t] = n, n in s || (s[n] = [])
                        })
                    }
                    var h = {},
                        y = {},
                        b = {
                            on: d,
                            addEventListener: d,
                            removeEventListener: m,
                            emit: t,
                            get: g,
                            listeners: v,
                            context: n,
                            buffer: w,
                            abort: a,
                            aborted: !1
                        };
                    return b
                }

                function o() {
                    return new r
                }

                function a() {
                    (s.api || s.feature) && (l.aborted = !0, s = l.backlog = {})
                }
                var f = "nr@context",
                    c = e("gos"),
                    u = e(4),
                    s = {},
                    p = {},
                    l = n.exports = i();
                l.backlog = s
            }, {}],
            gos: [function(e, n, t) {
                function r(e, n, t) {
                    if (i.call(e, n)) return e[n];
                    var r = t();
                    if (Object.defineProperty && Object.keys) try {
                        return Object.defineProperty(e, n, {
                            value: r,
                            writable: !0,
                            enumerable: !1
                        }), r
                    } catch (o) {}
                    return e[n] = r, r
                }
                var i = Object.prototype.hasOwnProperty;
                n.exports = r
            }, {}],
            handle: [function(e, n, t) {
                function r(e, n, t, r) {
                    i.buffer([e], r), i.emit(e, n, t)
                }
                var i = e("ee").get("handle");
                n.exports = r, r.ee = i
            }, {}],
            id: [function(e, n, t) {
                function r(e) {
                    var n = typeof e;
                    return !e || "object" !== n && "function" !== n ? -1 : e === window ? 0 : a(e, o, function() {
                        return i++
                    })
                }
                var i = 1,
                    o = "nr@id",
                    a = e("gos");
                n.exports = r
            }, {}],
            loader: [function(e, n, t) {
                function r() {
                    if (!x++) {
                        var e = E.info = NREUM.info,
                            n = d.getElementsByTagName("script")[0];
                        if (setTimeout(s.abort, 3e4), !(e && e.licenseKey && e.applicationID && n)) return s.abort();
                        u(y, function(n, t) {
                            e[n] || (e[n] = t)
                        }), c("mark", ["onload", a() + E.offset], null, "api");
                        var t = d.createElement("script");
                        t.src = "https://" + e.agent, n.parentNode.insertBefore(t, n)
                    }
                }

                function i() {
                    "complete" === d.readyState && o()
                }

                function o() {
                    c("mark", ["domContent", a() + E.offset], null, "api")
                }

                function a() {
                    return O.exists && performance.now ? Math.round(performance.now()) : (f = Math.max((new Date).getTime(), f)) - E.offset
                }
                var f = (new Date).getTime(),
                    c = e("handle"),
                    u = e(4),
                    s = e("ee"),
                    p = e(3),
                    l = window,
                    d = l.document,
                    m = "addEventListener",
                    v = "attachEvent",
                    g = l.XMLHttpRequest,
                    w = g && g.prototype;
                NREUM.o = {
                    ST: setTimeout,
                    SI: l.setImmediate,
                    CT: clearTimeout,
                    XHR: g,
                    REQ: l.Request,
                    EV: l.Event,
                    PR: l.Promise,
                    MO: l.MutationObserver
                };
                var h = "" + location,
                    y = {
                        beacon: "bam.nr-data.net",
                        errorBeacon: "bam.nr-data.net",
                        agent: "js-agent.newrelic.com/nr-1167.min.js"
                    },
                    b = g && w && w[m] && !/CriOS/.test(navigator.userAgent),
                    E = n.exports = {
                        offset: f,
                        now: a,
                        origin: h,
                        features: {},
                        xhrWrappable: b,
                        userAgent: p
                    };
                e(1), e(2), d[m] ? (d[m]("DOMContentLoaded", o, !1), l[m]("load", r, !1)) : (d[v]("onreadystatechange", i), l[v]("onload", r)), c("mark", ["firstbyte", f], null, "api");
                var x = 0,
                    O = e(6)
            }, {}],
            "wrap-function": [function(e, n, t) {
                function r(e) {
                    return !(e && e instanceof Function && e.apply && !e[a])
                }
                var i = e("ee"),
                    o = e(5),
                    a = "nr@original",
                    f = Object.prototype.hasOwnProperty,
                    c = !1;
                n.exports = function(e, n) {
                    function t(e, n, t, i) {
                        function nrWrapper() {
                            var r, a, f, c;
                            try {
                                a = this, r = o(arguments), f = "function" == typeof t ? t(r, a) : t || {}
                            } catch (u) {
                                l([u, "", [r, a, i], f])
                            }
                            s(n + "start", [r, a, i], f);
                            try {
                                return c = e.apply(a, r)
                            } catch (p) {
                                throw s(n + "err", [r, a, p], f), p
                            } finally {
                                s(n + "end", [r, a, c], f)
                            }
                        }
                        return r(e) ? e : (n || (n = ""), nrWrapper[a] = e, p(e, nrWrapper), nrWrapper)
                    }

                    function u(e, n, i, o) {
                        i || (i = "");
                        var a, f, c, u = "-" === i.charAt(0);
                        for (c = 0; c < n.length; c++) f = n[c], a = e[f], r(a) || (e[f] = t(a, u ? f + i : i, o, f))
                    }

                    function s(t, r, i) {
                        if (!c || n) {
                            var o = c;
                            c = !0;
                            try {
                                e.emit(t, r, i, n)
                            } catch (a) {
                                l([a, t, r, i])
                            }
                            c = o
                        }
                    }

                    function p(e, n) {
                        if (Object.defineProperty && Object.keys) try {
                            var t = Object.keys(e);
                            return t.forEach(function(t) {
                                Object.defineProperty(n, t, {
                                    get: function() {
                                        return e[t]
                                    },
                                    set: function(n) {
                                        return e[t] = n, n
                                    }
                                })
                            }), n
                        } catch (r) {
                            l([r])
                        }
                        for (var i in e) f.call(e, i) && (n[i] = e[i]);
                        return n
                    }

                    function l(n) {
                        try {
                            e.emit("internal-error", n)
                        } catch (t) {}
                    }
                    return e || (e = i), t.inPlace = u, t.flag = a, t
                }
            }, {}]
        }, {}, ["loader"]);
    </script>
    <title>Mobile Admin</title>
    <meta name="robots" content="noindex,nofollow">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name='apple-mobile-web-app-capable' content='yes' />
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="Admin Mobile" />
    <meta content="telephone=no" name="format-detection" />
    <link id="ati" rel="apple-touch-icon" href="Content/images/other/ma-logo-touch.png"></link>
    <link rel="apple-touch-icon" sizes="76x76" href="Content/images/other/ma-logo-touch76.png">
    <link rel="apple-touch-icon" sizes="120x120" href="Content/images/other/ma-logo-touch120.png">
    <link rel="apple-touch-icon" sizes="152x152" href="Content/images/other/ma-logo-touch152.png">
    @if(strpos(Request::url(), 'takwira') !== FALSE)
    <link type="text/x-component" rel="Shortcut Icon" href="Content/images/takwira.ico" />
    @else
    <link type="text/x-component" rel="Shortcut Icon" href="Content/images/favicon.ico" />
    @endif
    <meta content="notranslate" name="google">
    <style type="text/css">
        #Loading_aspx,
        #Loading_aspx .ui-content {
            background: none repeat scroll 0 0 #333;
            height: 100%;
            margin: -40px 0 0 0;
            padding: 0;
        }

        #maLogoWrap {
            height: 64px;
            position: fixed;
            left: 0;
            bottom: 0;
            margin: 0 auto;
            right: 0;
            top: 25%;
            padding: 0;
            overflow: hidden;
            width: 64px;
        }

        #TakwiramaLogoWrap {
            height: 80px;
            position: fixed;
            left: 0;
            bottom: 0;
            right: 0;
            top: 35%;
            padding: 0;
            overflow: hidden;
            width: 200px;
            margin: 0 auto;
        }

        #maLogoWrap>img {
            height: 64px;
            width: 64px;
        }

        #initWrap,
        #tempErrorInfo {
            font-weight: bold;
            margin: 0;
            position: relative;
            top: 15%;
            z-index: 11;
        }
    </style>
    @if (strpos(Request::url(), 'liver1x2') !== FALSE)
    <link rel="stylesheet" type="text/css" href="app-static/jqm-styles.liver.css" />
    <link rel="stylesheet" type="text/css" href="app-static/app-styles.liver.css" />
    @elseif(strpos(Request::url(), 'takwira') !== FALSE)
    <link rel="stylesheet" type="text/css" href="app-static/jqm-styles.takwira.css" />
    <link rel="stylesheet" type="text/css" href="app-static/app-styles.takwira.css" />
    @else
    <link rel="stylesheet" type="text/css" href="app-static/jqm-styles.css" />
    <link rel="stylesheet" type="text/css" href="app-static/app-styles.css" />
    @endif
</head>

<body class='binit'>
    <input name="appInitializer" type="hidden" id="appInitializer" value="1" />
    <input name="pollInit" type="hidden" id="pollInit" value="-1" />
    <div data-role="page" id="Loading_aspx" tabindex="0" class="ui-page" style="min-height: 641px;">
        <div data-role="content" class="ui-content" role="main">
            <div id="twMainContentView">
                    @if (strpos(Request::url(), 'takwira') !== FALSE)
                    <div id="TakwiramaLogoWrap">
                    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="80" viewBox="0 0 218.403 36.384"> <g id="Logo" transform="translate(-588 -478)"> <g id="Group_3008" data-name="Group 3008" transform="translate(588 478)"> <path id="Path_9" data-name="Path 9" d="M2504.7-77.357h-7.382v19.05h-4.581v-19.05h-7.383v-4.318H2504.7Z" transform="translate(-2434.573 89.53)" fill="#fff"></path> <g id="Group_3007" data-name="Group 3007" transform="translate(0 0)"> <path id="Path_10" data-name="Path 10" d="M2545.374-46.675A4.322,4.322,0,0,1,2546.726-50a6.439,6.439,0,0,1,3.494-1.582l3.988-.593q1.219-.164,1.22-1.154a1.89,1.89,0,0,0-.709-1.516,3.078,3.078,0,0,0-2.027-.593,3.073,3.073,0,0,0-2.192.758,2.832,2.832,0,0,0-.906,1.879l-3.889-.824a5.7,5.7,0,0,1,2.076-3.724,7.141,7.141,0,0,1,4.878-1.615q3.625,0,5.339,1.73a6.035,6.035,0,0,1,1.714,4.433v7.976a14.962,14.962,0,0,0,.2,2.571h-4.021a9.111,9.111,0,0,1-.165-1.944,5.284,5.284,0,0,1-4.779,2.406,5.632,5.632,0,0,1-4.038-1.45,4.567,4.567,0,0,1-1.532-3.428m6.493,1.615a3.753,3.753,0,0,0,2.554-.874,3.64,3.64,0,0,0,1.005-2.884v-.725l-3.658.56q-2.01.3-2.01,2.043a1.786,1.786,0,0,0,.561,1.335,2.129,2.129,0,0,0,1.549.544" transform="translate(-2476.996 73.482)" fill="#fff"></path> <path id="Path_11" data-name="Path 11" d="M2622.241-75.714l-6.493,6.822,6.625,9.393H2617l-4.284-6.2-1.813,1.912V-59.5h-4.383V-83.361h4.383v13.678l5.6-6.032Z" transform="translate(-2520.213 90.722)" fill="#fff"></path> <path id="Path_12" data-name="Path 12" d="M2671.049-57.283h4.614l3.494,10.448,3-10.448h4.351l-5.076,16.216h-4.383l-3.79-11.074-3.724,11.074h-4.45l-5.174-16.216h4.614l3,10.415Z" transform="translate(-2557.948 72.291)" fill="#fff"></path> <path id="Path_13" data-name="Path 13" d="M2755.339-81.974a2.661,2.661,0,0,1,.791-1.928,2.58,2.58,0,0,1,1.912-.808,2.606,2.606,0,0,1,1.912.791,2.644,2.644,0,0,1,.791,1.945,2.567,2.567,0,0,1-.791,1.879,2.605,2.605,0,0,1-1.912.791,2.605,2.605,0,0,1-1.912-.791,2.566,2.566,0,0,1-.791-1.879m4.91,21.522h-4.383V-76.668h4.383Z" transform="translate(-2625.396 91.676)" fill="#fff"></path> <path id="Path_14" data-name="Path 14" d="M2795.125-57.667v4.417a6.729,6.729,0,0,0-1.318-.132,4.279,4.279,0,0,0-3.032,1.071,4.6,4.6,0,0,0-1.154,3.51v7.415h-4.384V-57.6h4.252v2.406q1.187-2.538,4.615-2.538.362,0,1.021.066" transform="translate(-2646.527 72.609)" fill="#fff"></path> <path id="Path_15" data-name="Path 15" d="M2823.677-46.675A4.32,4.32,0,0,1,2825.029-50a6.441,6.441,0,0,1,3.493-1.582l3.989-.593q1.219-.164,1.22-1.154a1.89,1.89,0,0,0-.709-1.516,3.078,3.078,0,0,0-2.027-.593,3.075,3.075,0,0,0-2.192.758,2.833,2.833,0,0,0-.906,1.879l-3.89-.824a5.7,5.7,0,0,1,2.077-3.724,7.143,7.143,0,0,1,4.878-1.615q3.625,0,5.338,1.73a6.033,6.033,0,0,1,1.714,4.433v7.976a14.855,14.855,0,0,0,.2,2.571h-4.021a9.093,9.093,0,0,1-.165-1.944,5.284,5.284,0,0,1-4.779,2.406,5.631,5.631,0,0,1-4.038-1.45,4.568,4.568,0,0,1-1.533-3.428m6.493,1.615a3.755,3.755,0,0,0,2.555-.874,3.641,3.641,0,0,0,1.005-2.884v-.725l-3.659.56q-2.01.3-2.01,2.043a1.784,1.784,0,0,0,.56,1.335,2.131,2.131,0,0,0,1.549.544" transform="translate(-2673.696 73.482)" fill="#fff"></path> <path id="Path_16" data-name="Path 16" d="M2885.325-63.033l-2.01-3.164,5.6-4.812h-9.361v-3.922h15.128v3.658l-5.537,4.614a6.391,6.391,0,0,1,4.367,1.9,6.206,6.206,0,0,1,1.829,4.631,6.6,6.6,0,0,1-2.242,4.993,8.385,8.385,0,0,1-5.965,2.093,8.446,8.446,0,0,1-5.834-1.994,6.911,6.911,0,0,1-2.439-4.828l4.384-.857a3.853,3.853,0,0,0,1.137,2.7,3.754,3.754,0,0,0,2.752,1.055,3.71,3.71,0,0,0,2.637-.923,3.023,3.023,0,0,0,.989-2.307,2.911,2.911,0,0,0-.972-2.324,3.72,3.72,0,0,0-2.521-.841,5.743,5.743,0,0,0-1.944.33" transform="translate(-2712.702 84.764)" fill="#3cb873"></path> <path id="Path_17" data-name="Path 17" d="M2956.474-75.628l-1.253,3.691a8.955,8.955,0,0,0-3.527-.758,7.3,7.3,0,0,0-4.763,1.6,6.626,6.626,0,0,0-2.323,4.532,5.193,5.193,0,0,1,1.994-1.681,6.6,6.6,0,0,1,3.081-.692,7.415,7.415,0,0,1,5.356,1.944,6.924,6.924,0,0,1,2.027,5.24,6.943,6.943,0,0,1-2.356,5.389,8.5,8.5,0,0,1-5.916,2.126,8.225,8.225,0,0,1-6.18-2.587,10.005,10.005,0,0,1-2.489-7.235,12.681,12.681,0,0,1,3.263-9.146,11.357,11.357,0,0,1,8.6-3.411,8.8,8.8,0,0,1,4.483.989M2945-61.654a3.34,3.34,0,0,0,1.1,2.587,3.8,3.8,0,0,0,2.653,1.005,3.867,3.867,0,0,0,2.7-.989,3.353,3.353,0,0,0,1.088-2.6,3.3,3.3,0,0,0-1.088-2.587,3.907,3.907,0,0,0-2.7-.972,3.861,3.861,0,0,0-2.669.972A3.3,3.3,0,0,0,2945-61.654" transform="translate(-2756 85.956)" fill="#3cb873"></path> <path id="Path_18" data-name="Path 18" d="M3001.27-59.539l4.252-.956a3.652,3.652,0,0,0,1.137,2.555,3.79,3.79,0,0,0,2.752,1.038,3.779,3.779,0,0,0,2.637-.956A3.261,3.261,0,0,0,3013.1-60.4a3.283,3.283,0,0,0-1.1-2.669,4.053,4.053,0,0,0-2.687-.923,4.206,4.206,0,0,0-3.3,1.45q-2.34-.89-4.153-1.417l2.538-10.975h12.062v3.922H3007.5l-1.055,4.713a5.44,5.44,0,0,1,3.856-1.318,7.421,7.421,0,0,1,5.306,1.9,6.875,6.875,0,0,1,2.011,5.257,7.076,7.076,0,0,1-2.241,5.273,8.2,8.2,0,0,1-5.966,2.175,8.431,8.431,0,0,1-5.652-1.945,6.526,6.526,0,0,1-2.489-4.581" transform="translate(-2799.215 84.764)" fill="#3cb873"></path> <path id="Path_19" data-name="Path 19" d="M2357.377-108.466a18.194,18.194,0,0,0-18.192,18.192,18.194,18.194,0,0,0,18.192,18.192,18.194,18.194,0,0,0,18.192-18.192,18.194,18.194,0,0,0-18.192-18.192m-.132,32.892a14.8,14.8,0,0,1-14.8-14.8,14.8,14.8,0,0,1,14.8-14.8,14.8,14.8,0,0,1,14.8,14.8,14.8,14.8,0,0,1-14.8,14.8" transform="translate(-2331.266 108.466)" fill="#fff"></path> <path id="Path_20" data-name="Path 20" d="M2336.411-76.606a12.044,12.044,0,0,1-12.117,11.971,12.045,12.045,0,0,1-12.117-11.971,12.045,12.045,0,0,1,12.117-11.971,12.044,12.044,0,0,1,12.117,11.971" transform="translate(-2312.176 94.409)" fill="#3cba74"></path> </g> </g> </g> </svg>
                    </div>
                    @else
                    <div id="maLogoWrap">
                    <img id='loading-image' src='Content/images/mobile-admin-logo-64.png' alt='Loading...' />
                    </div>
                    @endif
                </div>
            </div>
            <div id='twInfoContentView' class='fieldHide'></div>
        </div>
    </div>
    <script type="text/javascript" src="app-static/jquery.js"></script>
    <script type="text/javascript" src="app-static/app-config.js"></script>
    <script type="text/javascript" src="app-static/jqm-core.js"></script>
    <script type="text/javascript" src="app-static/app-tools.js"></script>
    <script type="text/javascript" src="app-static/app-helpers.js?v=6489789431321"></script>
    <script type="text/javascript" src="app-static/app-locales.js"></script>

</body>


</html>