/* jQuery Mobile 1.4.5 | Git HEADhash: 68e55e7 <> 2014-10-31T17:33:30Z | (c) 2010, 2014 jQuery Foundation, Inc. | jquery.org/license */ ! function(d, e, f) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return f(a, d, e), a.mobile
    }) : f(d.jQuery, d, e)
}(this, document, function(d, e, f) {
    ! function(b) {
        b.mobile = {}
    }(d),
    function(c, h) {
        function i(a, m) {
            var n, o, p, q = a.nodeName.toLowerCase();
            return "area" === q ? (n = a.parentNode, o = n.name, a.href && o && "map" === n.nodeName.toLowerCase() ? (p = c("img[usemap=#" + o + "]")[0], !!p && j(p)) : !1) : (/input|select|textarea|button|object/.test(q) ? !a.disabled : "a" === q ? a.href || m : m) && j(a)
        }

        function j(a) {
            return c.expr.filters.visible(a) && !c(a).parents().addBack().filter(function() {
                return "hidden" === c.css(this, "visibility")
            }).length
        }
        var k = 0,
            l = /^ui-id-\d+$/;
        c.ui = c.ui || {}, c.extend(c.ui, {
            version: "c0ab71056b936627e8a7821f03c044aec6280a40",
            keyCode: {
                BACKSPACE: 8,
                COMMA: 188,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                LEFT: 37,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SPACE: 32,
                TAB: 9,
                UP: 38
            }
        }), c.fn.extend({
            focus: function(a) {
                return function(b, g) {
                    return "number" == typeof b ? this.each(function() {
                        var m = this;
                        setTimeout(function() {
                            c(m).focus(), g && g.call(m)
                        }, b)
                    }) : a.apply(this, arguments)
                }
            }(c.fn.focus),
            scrollParent: function() {
                var a;
                return a = c.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                    return /(relative|absolute|fixed)/.test(c.css(this, "position")) && /(auto|scroll)/.test(c.css(this, "overflow") + c.css(this, "overflow-y") + c.css(this, "overflow-x"))
                }).eq(0) : this.parents().filter(function() {
                    return /(auto|scroll)/.test(c.css(this, "overflow") + c.css(this, "overflow-y") + c.css(this, "overflow-x"))
                }).eq(0), /fixed/.test(this.css("position")) || !a.length ? c(this[0].ownerDocument || f) : a
            },
            uniqueId: function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++k)
                })
            },
            removeUniqueId: function() {
                return this.each(function() {
                    l.test(this.id) && c(this).removeAttr("id")
                })
            }
        }), c.extend(c.expr[":"], {
            data: c.expr.createPseudo ? c.expr.createPseudo(function(a) {
                return function(b) {
                    return !!c.data(b, a)
                }
            }) : function(a, g, m) {
                return !!c.data(a, m[3])
            },
            focusable: function(a) {
                return i(a, !isNaN(c.attr(a, "tabindex")))
            },
            tabbable: function(a) {
                var g = c.attr(a, "tabindex"),
                    m = isNaN(g);
                return (m || g >= 0) && i(a, !m)
            }
        }), c("<a>").outerWidth(1).jquery || c.each(["Width", "Height"], function(a, b) {
            function m(g, q, r, s) {
                return c.each(n, function() {
                    q -= parseFloat(c.css(g, "padding" + this)) || 0, r && (q -= parseFloat(c.css(g, "border" + this + "Width")) || 0), s && (q -= parseFloat(c.css(g, "margin" + this)) || 0)
                }), q
            }
            var n = "Width" === b ? ["Left", "Right"] : ["Top", "Bottom"],
                o = b.toLowerCase(),
                p = {
                    innerWidth: c.fn.innerWidth,
                    innerHeight: c.fn.innerHeight,
                    outerWidth: c.fn.outerWidth,
                    outerHeight: c.fn.outerHeight
                };
            c.fn["inner" + b] = function(g) {
                return g === h ? p["inner" + b].call(this) : this.each(function() {
                    c(this).css(o, m(this, g) + "px")
                })
            }, c.fn["outer" + b] = function(g, q) {
                return "number" != typeof g ? p["outer" + b].call(this, g) : this.each(function() {
                    c(this).css(o, m(this, g, !0, q) + "px")
                })
            }
        }), c.fn.addBack || (c.fn.addBack = function(b) {
            return this.add(null == b ? this.prevObject : this.prevObject.filter(b))
        }), c("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (c.fn.removeData = function(a) {
            return function(b) {
                return arguments.length ? a.call(this, c.camelCase(b)) : a.call(this)
            }
        }(c.fn.removeData)), c.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), c.support.selectstart = "onselectstart" in f.createElement("div"), c.fn.extend({
            disableSelection: function() {
                return this.bind((c.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(b) {
                    b.preventDefault()
                })
            },
            enableSelection: function() {
                return this.unbind(".ui-disableSelection")
            },
            zIndex: function(a) {
                if (a !== h) {
                    return this.css("zIndex", a)
                }
                if (this.length) {
                    for (var b, m, n = c(this[0]); n.length && n[0] !== f;) {
                        if (b = n.css("position"), ("absolute" === b || "relative" === b || "fixed" === b) && (m = parseInt(n.css("zIndex"), 10), !isNaN(m) && 0 !== m)) {
                            return m
                        }
                        n = n.parent()
                    }
                }
                return 0
            }
        }), c.ui.plugin = {
            add: function(a, g, m) {
                var n, o = c.ui[a].prototype;
                for (n in m) {
                    o.plugins[n] = o.plugins[n] || [], o.plugins[n].push([g, m[n]])
                }
            },
            call: function(g, m, n, o) {
                var p, q = g.plugins[m];
                if (q && (o || g.element[0].parentNode && 11 !== g.element[0].parentNode.nodeType)) {
                    for (p = 0; p < q.length; p++) {
                        g.options[q[p][0]] && q[p][1].apply(g.element, n)
                    }
                }
            }
        }
    }(d),
    function(c, g) {
        var h = function(a, k) {
            var l = a.parent(),
                m = [],
                n = function() {
                    var i = c(this),
                        j = c.mobile.toolbar && i.data("mobile-toolbar") ? i.toolbar("option") : {
                            position: i.attr("data-" + c.mobile.ns + "position"),
                            updatePagePadding: i.attr("data-" + c.mobile.ns + "update-page-padding") !== !1
                        };
                    return !("fixed" === j.position && j.updatePagePadding === !0)
                },
                o = l.children(":jqmData(role='header')").filter(n),
                p = a.children(":jqmData(role='header')"),
                q = l.children(":jqmData(role='footer')").filter(n),
                r = a.children(":jqmData(role='footer')");
            return 0 === p.length && o.length > 0 && (m = m.concat(o.toArray())), 0 === r.length && q.length > 0 && (m = m.concat(q.toArray())), c.each(m, function(i, j) {
                k -= c(j).outerHeight()
            }), Math.max(0, k)
        };
        c.extend(c.mobile, {
            window: c(g),
            document: c(f),
            keyCode: c.ui.keyCode,
            behaviors: {},
            silentScroll: function(a) {
                "number" !== c.type(a) && (a = c.mobile.defaultHomeScroll), c.event.special.scrollstart.enabled = !1, setTimeout(function() {
                    g.scrollTo(0, a), c.mobile.document.trigger("silentscroll", {
                        x: 0,
                        y: a
                    })
                }, 20), setTimeout(function() {
                    c.event.special.scrollstart.enabled = !0
                }, 150)
            },
            getClosestBaseUrl: function(a) {
                var i = c(a).closest(".ui-page").jqmData("url"),
                    j = c.mobile.path.documentBase.hrefNoHash;
                return c.mobile.dynamicBaseEnabled && i && c.mobile.path.isPath(i) || (i = j), c.mobile.path.makeUrlAbsolute(i, j)
            },
            removeActiveLinkClass: function(a) {
                !c.mobile.activeClickedLink || c.mobile.activeClickedLink.closest("." + c.mobile.activePageClass).length && !a || c.mobile.activeClickedLink.removeClass(c.mobile.activeBtnClass), c.mobile.activeClickedLink = null
            },
            getInheritedTheme: function(i, j) {
                for (var k, l, m = i[0], n = "", o = /ui-(bar|body|overlay)-([a-z])\b/; m && (k = m.className || "", !(k && (l = o.exec(k)) && (n = l[2])));) {
                    m = m.parentNode
                }
                return n || j || "a"
            },
            enhanceable: function(b) {
                return this.haveParents(b, "enhance")
            },
            hijackable: function(b) {
                return this.haveParents(b, "ajax")
            },
            haveParents: function(a, k) {
                if (!c.mobile.ignoreContentEnabled) {
                    return a
                }
                var l, m, n, o, p, q = a.length,
                    r = c();
                for (o = 0; q > o; o++) {
                    for (m = a.eq(o), n = !1, l = a[o]; l;) {
                        if (p = l.getAttribute ? l.getAttribute("data-" + c.mobile.ns + k) : "", "false" === p) {
                            n = !0;
                            break
                        }
                        l = l.parentNode
                    }
                    n || (r = r.add(m))
                }
                return r
            },
            getScreenHeight: function() {
                return g.innerHeight || c.mobile.window.height()
            },
            resetActivePageHeight: function(a) {
                var i = c("." + c.mobile.activePageClass),
                    j = i.height(),
                    k = i.outerHeight(!0);
                a = h(i, "number" == typeof a ? a : c.mobile.getScreenHeight()), i.css("min-height", ""), i.height() < a && i.css("min-height", a - (k - j))
            },
            loading: function() {
                var a = this.loading._widget || c(c.mobile.loader.prototype.defaultHtml).loader(),
                    i = a.loader.apply(a, arguments);
                return this.loading._widget = a, i
            }
        }), c.addDependents = function(a, i) {
            var j = c(a),
                k = j.jqmData("dependents") || c();
            j.jqmData("dependents", c(k).add(i))
        }, c.fn.extend({
            removeWithDependents: function() {
                c.removeWithDependents(this)
            },
            enhanceWithin: function() {
                var a, i = {},
                    j = c.mobile.page.prototype.keepNativeSelector(),
                    k = this;
                c.mobile.nojs && c.mobile.nojs(this), c.mobile.links && c.mobile.links(this), c.mobile.degradeInputsWithin && c.mobile.degradeInputsWithin(this), c.fn.buttonMarkup && this.find(c.fn.buttonMarkup.initSelector).not(j).jqmEnhanceable().buttonMarkup(), c.fn.fieldcontain && this.find(":jqmData(role='fieldcontain')").not(j).jqmEnhanceable().fieldcontain(), c.each(c.mobile.widgets, function(l, m) {
                    if (m.initSelector) {
                        var n = c.mobile.enhanceable(k.find(m.initSelector));
                        n.length > 0 && (n = n.not(j)), n.length > 0 && (i[m.prototype.widgetName] = n)
                    }
                });
                for (a in i) {
                    i[a][a]()
                }
                return this
            },
            addDependents: function(a) {
                c.addDependents(this, a)
            },
            getEncodedText: function() {
                return c("<a>").text(this.text()).html()
            },
            jqmEnhanceable: function() {
                return c.mobile.enhanceable(this)
            },
            jqmHijackable: function() {
                return c.mobile.hijackable(this)
            }
        }), c.removeWithDependents = function(a) {
            var i = c(a);
            (i.jqmData("dependents") || c()).remove(), i.remove()
        }, c.addDependents = function(a, i) {
            var j = c(a),
                k = j.jqmData("dependents") || c();
            j.jqmData("dependents", c(k).add(i))
        }, c.find.matches = function(a, i) {
            return c.find(a, null, null, i)
        }, c.find.matchesSelector = function(a, i) {
            return c.find(i, null, null, [a]).length > 0
        }
    }(d, this),
    function(b) {
        b.extend(b.mobile, {
            version: "1.4.5",
            subPageUrlKey: "ui-page",
            hideUrlBar: !0,
            keepNative: ":jqmData(role='none'), :jqmData(role='nojs')",
            activePageClass: "ui-page-active",
            activeBtnClass: "ui-btn-active",
            focusClass: "ui-focus",
            ajaxEnabled: !0,
            hashListeningEnabled: !0,
            linkBindingEnabled: !0,
            defaultPageTransition: "fade",
            maxTransitionWidth: !1,
            minScrollBack: 0,
            defaultDialogTransition: "pop",
            pageLoadErrorMessage: "Error Loading Page",
            pageLoadErrorMessageTheme: "a",
            phonegapNavigationEnabled: !1,
            autoInitializePage: !0,
            pushStateEnabled: !0,
            ignoreContentEnabled: !1,
            buttonMarkup: {
                hoverDelay: 200
            },
            dynamicBaseEnabled: !0,
            pageContainer: b(),
            allowCrossDomainPages: !1,
            dialogHashKey: "&ui-state=dialog"
        })
    }(d, this),
    function(g, h) {
        var i = 0,
            j = Array.prototype.slice,
            k = g.cleanData;
        g.cleanData = function(a) {
            for (var l, m = 0; null != (l = a[m]); m++) {
                try {
                    g(l).triggerHandler("remove")
                } catch (n) {}
            }
            k(a)
        }, g.widget = function(a, l, m) {
            var n, o, p, q, r = {},
                s = a.split(".")[0];
            return a = a.split(".")[1], n = s + "-" + a, m || (m = l, l = g.Widget), g.expr[":"][n.toLowerCase()] = function(c) {
                return !!g.data(c, n)
            }, g[s] = g[s] || {}, o = g[s][a], p = g[s][a] = function(c, t) {
                return this._createWidget ? void(arguments.length && this._createWidget(c, t)) : new p(c, t)
            }, g.extend(p, o, {
                version: m.version,
                _proto: g.extend({}, m),
                _childConstructors: []
            }), q = new l, q.options = g.widget.extend({}, q.options), g.each(m, function(c, t) {
                return g.isFunction(t) ? void(r[c] = function() {
                    var b = function() {
                            return l.prototype[c].apply(this, arguments)
                        },
                        u = function(v) {
                            return l.prototype[c].apply(this, v)
                        };
                    return function() {
                        var v, w = this._super,
                            x = this._superApply;
                        return this._super = b, this._superApply = u, v = t.apply(this, arguments), this._super = w, this._superApply = x, v
                    }
                }()) : void(r[c] = t)
            }), p.prototype = g.widget.extend(q, {
                widgetEventPrefix: o ? q.widgetEventPrefix || a : a
            }, r, {
                constructor: p,
                namespace: s,
                widgetName: a,
                widgetFullName: n
            }), o ? (g.each(o._childConstructors, function(t, u) {
                var v = u.prototype;
                g.widget(v.namespace + "." + v.widgetName, p, u._proto)
            }), delete o._childConstructors) : l._childConstructors.push(p), g.widget.bridge(a, p), p
        }, g.widget.extend = function(a) {
            for (var b, l, m = j.call(arguments, 1), n = 0, o = m.length; o > n; n++) {
                for (b in m[n]) {
                    l = m[n][b], m[n].hasOwnProperty(b) && l !== h && (a[b] = g.isPlainObject(l) ? g.isPlainObject(a[b]) ? g.widget.extend({}, a[b], l) : g.widget.extend({}, l) : l)
                }
            }
            return a
        }, g.widget.bridge = function(a, b) {
            var l = b.prototype.widgetFullName || a;
            g.fn[a] = function(c) {
                var m = "string" == typeof c,
                    n = j.call(arguments, 1),
                    o = this;
                return c = !m && n.length ? g.widget.extend.apply(null, [c].concat(n)) : c, this.each(m ? function() {
                    var p, q = g.data(this, l);
                    return "instance" === c ? (o = q, !1) : q ? g.isFunction(q[c]) && "_" !== c.charAt(0) ? (p = q[c].apply(q, n), p !== q && p !== h ? (o = p && p.jquery ? o.pushStack(p.get()) : p, !1) : void 0) : g.error("no such method '" + c + "' for " + a + " widget instance") : g.error("cannot call methods on " + a + " prior to initialization; attempted to call method '" + c + "'")
                } : function() {
                    var p = g.data(this, l);
                    p ? p.option(c || {})._init() : g.data(this, l, new b(c, this))
                }), o
            }
        }, g.Widget = function() {}, g.Widget._childConstructors = [], g.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                disabled: !1,
                create: null
            },
            _createWidget: function(a, c) {
                c = g(c || this.defaultElement || this)[0], this.element = g(c), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = g.widget.extend({}, this.options, this._getCreateOptions(), a), this.bindings = g(), this.hoverable = g(), this.focusable = g(), c !== this && (g.data(c, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function(b) {
                        b.target === c && this.destroy()
                    }
                }), this.document = g(c.style ? c.ownerDocument : c.document || c), this.window = g(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
            },
            _getCreateOptions: g.noop,
            _getCreateEventData: g.noop,
            _create: g.noop,
            _init: g.noop,
            destroy: function() {
                this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(g.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
            },
            _destroy: g.noop,
            widget: function() {
                return this.element
            },
            option: function(a, b) {
                var l, m, n, o = a;
                if (0 === arguments.length) {
                    return g.widget.extend({}, this.options)
                }
                if ("string" == typeof a) {
                    if (o = {}, l = a.split("."), a = l.shift(), l.length) {
                        for (m = o[a] = g.widget.extend({}, this.options[a]), n = 0; n < l.length - 1; n++) {
                            m[l[n]] = m[l[n]] || {}, m = m[l[n]]
                        }
                        if (a = l.pop(), b === h) {
                            return m[a] === h ? null : m[a]
                        }
                        m[a] = b
                    } else {
                        if (b === h) {
                            return this.options[a] === h ? null : this.options[a]
                        }
                        o[a] = b
                    }
                }
                return this._setOptions(o), this
            },
            _setOptions: function(c) {
                var l;
                for (l in c) {
                    this._setOption(l, c[l])
                }
                return this
            },
            _setOption: function(c, l) {
                return this.options[c] = l, "disabled" === c && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!l), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
            },
            enable: function() {
                return this._setOptions({
                    disabled: !1
                })
            },
            disable: function() {
                return this._setOptions({
                    disabled: !0
                })
            },
            _on: function(a, l, m) {
                var n, o = this;
                "boolean" != typeof a && (m = l, l = a, a = !1), m ? (l = n = g(l), this.bindings = this.bindings.add(l)) : (m = l, l = this.element, n = this.widget()), g.each(m, function(b, c) {
                    function p() {
                        return a || o.options.disabled !== !0 && !g(this).hasClass("ui-state-disabled") ? ("string" == typeof c ? o[c] : c).apply(o, arguments) : void 0
                    }
                    "string" != typeof c && (p.guid = c.guid = c.guid || p.guid || g.guid++);
                    var q = b.match(/^(\w+)\s*(.*)$/),
                        r = q[1] + o.eventNamespace,
                        s = q[2];
                    s ? n.delegate(s, r, p) : l.bind(r, p)
                })
            },
            _off: function(c, l) {
                l = (l || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, c.unbind(l).undelegate(l)
            },
            _delay: function(l, m) {
                function n() {
                    return ("string" == typeof l ? o[l] : l).apply(o, arguments)
                }
                var o = this;
                return setTimeout(n, m || 0)
            },
            _hoverable: function(a) {
                this.hoverable = this.hoverable.add(a), this._on(a, {
                    mouseenter: function(c) {
                        g(c.currentTarget).addClass("ui-state-hover")
                    },
                    mouseleave: function(c) {
                        g(c.currentTarget).removeClass("ui-state-hover")
                    }
                })
            },
            _focusable: function(a) {
                this.focusable = this.focusable.add(a), this._on(a, {
                    focusin: function(c) {
                        g(c.currentTarget).addClass("ui-state-focus")
                    },
                    focusout: function(c) {
                        g(c.currentTarget).removeClass("ui-state-focus")
                    }
                })
            },
            _trigger: function(a, l, m) {
                var n, o, p = this.options[a];
                if (m = m || {}, l = g.Event(l), l.type = (a === this.widgetEventPrefix ? a : this.widgetEventPrefix + a).toLowerCase(), l.target = this.element[0], o = l.originalEvent) {
                    for (n in o) {
                        n in l || (l[n] = o[n])
                    }
                }
                return this.element.trigger(l, m), !(g.isFunction(p) && p.apply(this.element[0], [l].concat(m)) === !1 || l.isDefaultPrevented())
            }
        }, g.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function(a, l) {
            g.Widget.prototype["_" + a] = function(b, c, m) {
                "string" == typeof c && (c = {
                    effect: c
                });
                var n, o = c ? c === !0 || "number" == typeof c ? l : c.effect || l : a;
                c = c || {}, "number" == typeof c && (c = {
                    duration: c
                }), n = !g.isEmptyObject(c), c.complete = m, c.delay && b.delay(c.delay), n && g.effects && g.effects.effect[o] ? b[a](c) : o !== a && b[o] ? b[o](c.duration, c.easing, m) : b.queue(function(p) {
                    g(this)[a](), m && m.call(b[0]), p()
                })
            }
        })
    }(d),
    function(h, i, j) {
        var k = {},
            l = h.find,
            m = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
            n = /:jqmData\(([^)]*)\)/g;
        h.extend(h.mobile, {
            ns: "",
            getAttribute: function(a, g) {
                var o;
                a = a.jquery ? a[0] : a, a && a.getAttribute && (o = a.getAttribute("data-" + h.mobile.ns + g));
                try {
                    o = "true" === o ? !0 : "false" === o ? !1 : "null" === o ? null : +o + "" === o ? +o : m.test(o) ? JSON.parse(o) : o
                } catch (p) {}
                return o
            },
            nsNormalizeDict: k,
            nsNormalize: function(a) {
                return k[a] || (k[a] = h.camelCase(h.mobile.ns + a))
            },
            closestPageData: function(b) {
                return b.closest(":jqmData(role='page'), :jqmData(role='dialog')").data("mobile-page")
            }
        }), h.fn.jqmData = function(a, c) {
            var g;
            return "undefined" != typeof a && (a && (a = h.mobile.nsNormalize(a)), g = arguments.length < 2 || c === j ? this.data(a) : this.data(a, c)), g
        }, h.jqmData = function(a, g, o) {
            var p;
            return "undefined" != typeof g && (p = h.data(a, g ? h.mobile.nsNormalize(g) : g, o)), p
        }, h.fn.jqmRemoveData = function(a) {
            return this.removeData(h.mobile.nsNormalize(a))
        }, h.jqmRemoveData = function(a, g) {
            return h.removeData(a, h.mobile.nsNormalize(g))
        }, h.find = function(a, g, o, p) {
            return a.indexOf(":jqmData") > -1 && (a = a.replace(n, "[data-" + (h.mobile.ns || "") + "$1]")), l.call(this, a, g, o, p)
        }, h.extend(h.find, l)
    }(d, this),
    function(g) {
        var h = /[A-Z]/g,
            i = function(b) {
                return "-" + b.toLowerCase()
            };
        g.extend(g.Widget.prototype, {
            _getCreateOptions: function() {
                var a, b, c = this.element[0],
                    j = {};
                if (!g.mobile.getAttribute(c, "defaults")) {
                    for (a in this.options) {
                        b = g.mobile.getAttribute(c, a.replace(h, i)), null != b && (j[a] = b)
                    }
                }
                return j
            }
        }), g.mobile.widget = g.Widget
    }(d),
    function(g) {
        var h = "ui-loader",
            i = g("html");
        g.widget("mobile.loader", {
            options: {
                theme: "a",
                textVisible: !1,
                html: "",
                text: "loading"
            },
            defaultHtml: "<div class='" + h + "'><span class='ui-icon-loading'></span><h1></h1></div>",
            fakeFixLoader: function() {
                var a = g("." + g.mobile.activeBtnClass).first();
                this.element.css({
                    top: g.support.scrollTop && this.window.scrollTop() + this.window.height() / 2 || a.length && a.offset().top || 100
                })
            },
            checkLoaderPosition: function() {
                var a = this.element.offset(),
                    j = this.window.scrollTop(),
                    k = g.mobile.getScreenHeight();
                (a.top < j || a.top - j > k) && (this.element.addClass("ui-loader-fakefix"), this.fakeFixLoader(), this.window.unbind("scroll", this.checkLoaderPosition).bind("scroll", g.proxy(this.fakeFixLoader, this)))
            },
            resetHtml: function() {
                this.element.html(g(this.defaultHtml).html())
            },
            show: function(a, b, c) {
                var j, k, l;
                this.resetHtml(), "object" === g.type(a) ? (l = g.extend({}, this.options, a), a = l.theme) : (l = this.options, a = a || l.theme), k = b || (l.text === !1 ? "" : l.text), i.addClass("ui-loading"), j = l.textVisible, this.element.attr("class", h + " ui-corner-all ui-body-" + a + " ui-loader-" + (j || b || a.text ? "verbose" : "default") + (l.textonly || c ? " ui-loader-textonly" : "")), l.html ? this.element.html(l.html) : this.element.find("h1").text(k), this.element.appendTo(g(g.mobile.pagecontainer ? ":mobile-pagecontainer" : "body")), this.checkLoaderPosition(), this.window.bind("scroll", g.proxy(this.checkLoaderPosition, this))
            },
            hide: function() {
                i.removeClass("ui-loading"), this.options.text && this.element.removeClass("ui-loader-fakefix"), this.window.unbind("scroll", this.fakeFixLoader), this.window.unbind("scroll", this.checkLoaderPosition)
            }
        })
    }(d, this),
    function(c, l, m) {
        function n(b) {
            return b = b || location.href, "#" + b.replace(/^[^#]*#?(.*)$/, "$1")
        }
        var o, p = "hashchange",
            q = f,
            r = c.event.special,
            s = q.documentMode,
            t = "on" + p in l && (s === m || s > 7);
        c.fn[p] = function(b) {
            return b ? this.bind(p, b) : this.trigger(p)
        }, c.fn[p].delay = 50, r[p] = c.extend(r[p], {
            setup: function() {
                return t ? !1 : void c(o.start)
            },
            teardown: function() {
                return t ? !1 : void c(o.stop)
            }
        }), o = function() {
            function a() {
                var i = n(),
                    j = v(h);
                i !== h ? (u(h = i, j), c(l).trigger(p)) : j !== h && (location.href = location.href.replace(/#.*/, "") + j), b = setTimeout(a, c.fn[p].delay)
            }
            var b, g = {},
                h = n(),
                k = function(i) {
                    return i
                },
                u = k,
                v = k;
            return g.start = function() {
                b || a()
            }, g.stop = function() {
                b && clearTimeout(b), b = m
            }, l.attachEvent && !l.addEventListener && !t && function() {
                var i, j;
                g.start = function() {
                    i || (j = c.fn[p].src, j = j && j + n(), i = c('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() {
                        j || u(n()), a()
                    }).attr("src", j || "javascript:0").insertAfter("body")[0].contentWindow, q.onpropertychange = function() {
                        try {
                            "title" === event.propertyName && (i.document.title = q.title)
                        } catch (w) {}
                    })
                }, g.stop = k, v = function() {
                    return n(i.location.href)
                }, u = function(w, x) {
                    var y = i.document,
                        z = c.fn[p].domain;
                    w !== x && (y.title = q.title, y.open(), z && y.write('<script>document.domain="' + z + '"</script>'), y.close(), i.location.hash = w)
                }
            }(), g
        }()
    }(d, this),
    function(b) {
        e.matchMedia = e.matchMedia || function(g) {
            var h, i = g.documentElement,
                j = i.firstElementChild || i.firstChild,
                k = g.createElement("body"),
                l = g.createElement("div");
            return l.id = "mq-test-1", l.style.cssText = "position:absolute;top:-100em", k.style.background = "none", k.appendChild(l),
                function(c) {
                    return l.innerHTML = '&shy;<style media="' + c + '"> #mq-test-1 { width: 42px; }</style>', i.insertBefore(k, j), h = 42 === l.offsetWidth, i.removeChild(k), {
                        matches: h,
                        media: c
                    }
                }
        }(f), b.mobile.media = function(c) {
            return e.matchMedia(c).matches
        }
    }(d),
    function(c) {
        var g = {
            touch: "ontouchend" in f
        };
        c.mobile.support = c.mobile.support || {}, c.extend(c.support, g), c.extend(c.mobile.support, g)
    }(d),
    function(b) {
        b.extend(b.support, {
            orientation: "orientation" in e && "onorientationchange" in e
        })
    }(d),
    function(b, c) {
        function s(g) {
            var h, i = g.charAt(0).toUpperCase() + g.substr(1),
                j = (g + " " + C.join(i + " ") + i).split(" ");
            for (h in j) {
                if (B[j[h]] !== c) {
                    return !0
                }
            }
        }

        function t() {
            var a = e,
                g = !(!a.document.createElementNS || !a.document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect || a.opera && -1 === navigator.userAgent.indexOf("Chrome")),
                h = function(j) {
                    j && g || b("html").addClass("ui-nosvg")
                },
                i = new a.Image;
            i.onerror = function() {
                h(!1)
            }, i.onload = function() {
                h(1 === i.width && 1 === i.height)
            }, i.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
        }

        function u() {
            var a, j, k, l = "transform-3d",
                m = b.mobile.media("(-" + C.join("-" + l + "),(-") + "-" + l + "),(" + l + ")");
            if (m) {
                return !!m
            }
            a = f.createElement("div"), j = {
                MozTransform: "-moz-transform",
                transform: "transform"
            }, A.append(a);
            for (k in j) {
                a.style[k] !== c && (a.style[k] = "translate3d( 100px, 1px, 1px )", m = e.getComputedStyle(a).getPropertyValue(j[k]))
            }
            return !!m && "none" !== m
        }

        function v() {
            var a, h, i = location.protocol + "//" + location.host + location.pathname + "ui-dir/",
                j = b("head base"),
                k = null,
                l = "";
            return j.length ? l = j.attr("href") : j = k = b("<base>", {
                href: i
            }).appendTo("head"), a = b("<a href='testurl' />").prependTo(A), h = a[0].href, j[0].href = l || location.pathname, k && k.remove(), 0 === h.indexOf(i)
        }

        function w() {
            var g, h = f.createElement("x"),
                i = f.documentElement,
                j = e.getComputedStyle;
            return "pointerEvents" in h.style ? (h.style.pointerEvents = "auto", h.style.pointerEvents = "x", i.appendChild(h), g = j && "auto" === j(h, "").pointerEvents, i.removeChild(h), !!g) : !1
        }

        function x() {
            var g = f.createElement("div");
            return "undefined" != typeof g.getBoundingClientRect
        }

        function y() {
            var k = e,
                l = navigator.userAgent,
                m = navigator.platform,
                n = l.match(/AppleWebKit\/([0-9]+)/),
                o = !!n && n[1],
                p = l.match(/Fennec\/([0-9]+)/),
                q = !!p && p[1],
                r = l.match(/Opera Mobi\/([0-9]+)/),
                G = !!r && r[1];
            return (m.indexOf("iPhone") > -1 || m.indexOf("iPad") > -1 || m.indexOf("iPod") > -1) && o && 534 > o || k.operamini && "[object OperaMini]" === {}.toString.call(k.operamini) || r && 7458 > G || l.indexOf("Android") > -1 && o && 533 > o || q && 6 > q || "palmGetResource" in e && o && 534 > o || l.indexOf("MeeGo") > -1 && l.indexOf("NokiaBrowser/8.5.0") > -1 ? !1 : !0
        }
        var z, A = b("<body>").prependTo("html"),
            B = A[0].style,
            C = ["Webkit", "Moz", "O"],
            D = "palmGetResource" in e,
            E = e.operamini && "[object OperaMini]" === {}.toString.call(e.operamini),
            F = e.blackberry && !s("-webkit-transform");
        b.extend(b.mobile, {
            browser: {}
        }), b.mobile.browser.oldIE = function() {
            var g = 3,
                h = f.createElement("div"),
                i = h.all || [];
            do {
                h.innerHTML = "<!--[if gt IE " + ++g + "]><br><![endif]-->"
            } while (i[0]);
            return g > 4 ? g : !g
        }(), b.extend(b.support, {
            pushState: "pushState" in history && "replaceState" in history && !(e.navigator.userAgent.indexOf("Firefox") >= 0 && e.top !== e) && -1 === e.navigator.userAgent.search(/CriOS/),
            mediaquery: b.mobile.media("only all"),
            cssPseudoElement: !!s("content"),
            touchOverflow: !!s("overflowScrolling"),
            cssTransform3d: u(),
            boxShadow: !!s("boxShadow") && !F,
            fixedPosition: y(),
            scrollTop: ("pageXOffset" in e || "scrollTop" in f.documentElement || "scrollTop" in A[0]) && !D && !E,
            dynamicBaseTag: v(),
            cssPointerEvents: w(),
            boundingRect: x(),
            inlineSVG: t
        }), A.remove(), z = function() {
            var g = e.navigator.userAgent;
            return g.indexOf("Nokia") > -1 && (g.indexOf("Symbian/3") > -1 || g.indexOf("Series60/5") > -1) && g.indexOf("AppleWebKit") > -1 && g.match(/(BrowserNG|NokiaBrowser)\/7\.[0-3]/)
        }(), b.mobile.gradeA = function() {
            return (b.support.mediaquery && b.support.cssPseudoElement || b.mobile.browser.oldIE && b.mobile.browser.oldIE >= 8) && (b.support.boundingRect || null !== b.fn.jquery.match(/1\.[0-7+]\.[0-9+]?/))
        }, b.mobile.ajaxBlacklist = e.blackberry && !e.WebKitPoint || E || z, z && b(function() {
            b("head link[rel='stylesheet']").attr("rel", "alternate stylesheet").attr("rel", "stylesheet")
        }), b.support.boxShadow || b("html").addClass("ui-noboxshadow")
    }(d),
    function(g, h) {
        var i, j = g.mobile.window,
            k = function() {};
        g.event.special.beforenavigate = {
            setup: function() {
                j.on("navigate", k)
            },
            teardown: function() {
                j.off("navigate", k)
            }
        }, g.event.special.navigate = i = {
            bound: !1,
            pushStateEnabled: !0,
            originalEventName: h,
            isPushStateEnabled: function() {
                return g.support.pushState && g.mobile.pushStateEnabled === !0 && this.isHashChangeEnabled()
            },
            isHashChangeEnabled: function() {
                return g.mobile.hashListeningEnabled === !0
            },
            popstate: function(a) {
                var l = new g.Event("navigate"),
                    m = new g.Event("beforenavigate"),
                    n = a.originalEvent.state || {};
                m.originalEvent = a, j.trigger(m), m.isDefaultPrevented() || (a.historyState && g.extend(n, a.historyState), l.originalEvent = a, setTimeout(function() {
                    j.trigger(l, {
                        state: n
                    })
                }, 0))
            },
            hashchange: function(a) {
                var l = new g.Event("navigate"),
                    m = new g.Event("beforenavigate");
                m.originalEvent = a, j.trigger(m), m.isDefaultPrevented() || (l.originalEvent = a, j.trigger(l, {
                    state: a.hashchangeState || {}
                }))
            },
            setup: function() {
                i.bound || (i.bound = !0, i.isPushStateEnabled() ? (i.originalEventName = "popstate", j.bind("popstate.navigate", i.popstate)) : i.isHashChangeEnabled() && (i.originalEventName = "hashchange", j.bind("hashchange.navigate", i.hashchange)))
            }
        }
    }(d),
    function(b, g) {
        var h, i, j = "&ui-state=dialog";
        b.mobile.path = h = {
            uiStateKey: "&ui-state",
            urlParseRE: /^\s*(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,
            getLocation: function(k) {
                var l = this.parseUrl(k || location.href),
                    m = k ? l : location,
                    n = l.hash;
                return n = "#" === n ? "" : n, m.protocol + l.doubleSlash + m.host + ("" !== m.protocol && "/" !== m.pathname.substring(0, 1) ? "/" : "") + m.pathname + m.search + n
            },
            getDocumentUrl: function(a) {
                return a ? b.extend({}, h.documentUrl) : h.documentUrl.href
            },
            parseLocation: function() {
                return this.parseUrl(this.getLocation())
            },
            parseUrl: function(a) {
                if ("object" === b.type(a)) {
                    return a
                }
                var k = h.urlParseRE.exec(a || "") || [];
                return {
                    href: k[0] || "",
                    hrefNoHash: k[1] || "",
                    hrefNoSearch: k[2] || "",
                    domain: k[3] || "",
                    protocol: k[4] || "",
                    doubleSlash: k[5] || "",
                    authority: k[6] || "",
                    username: k[8] || "",
                    password: k[9] || "",
                    host: k[10] || "",
                    hostname: k[11] || "",
                    port: k[12] || "",
                    pathname: k[13] || "",
                    directory: k[14] || "",
                    filename: k[15] || "",
                    search: k[16] || "",
                    hash: k[17] || ""
                }
            },
            makePathAbsolute: function(k, l) {
                var m, n, o, p;
                if (k && "/" === k.charAt(0)) {
                    return k
                }
                for (k = k || "", l = l ? l.replace(/^\/|(\/[^\/]*|[^\/]+)$/g, "") : "", m = l ? l.split("/") : [], n = k.split("/"), o = 0; o < n.length; o++) {
                    switch (p = n[o]) {
                        case ".":
                            break;
                        case "..":
                            m.length && m.pop();
                            break;
                        default:
                            m.push(p)
                    }
                }
                return "/" + m.join("/")
            },
            isSameDomain: function(c, k) {
                return h.parseUrl(c).domain.toLowerCase() === h.parseUrl(k).domain.toLowerCase()
            },
            isRelativeUrl: function(c) {
                return "" === h.parseUrl(c).protocol
            },
            isAbsoluteUrl: function(c) {
                return "" !== h.parseUrl(c).protocol
            },
            makeUrlAbsolute: function(c, n) {
                if (!h.isRelativeUrl(c)) {
                    return c
                }
                n === g && (n = this.documentBase);
                var o = h.parseUrl(c),
                    p = h.parseUrl(n),
                    q = o.protocol || p.protocol,
                    r = o.protocol ? o.doubleSlash : o.doubleSlash || p.doubleSlash,
                    s = o.authority || p.authority,
                    t = "" !== o.pathname,
                    u = h.makePathAbsolute(o.pathname || p.filename, p.pathname),
                    v = o.search || !t && p.search || "",
                    w = o.hash;
                return q + r + s + u + v + w
            },
            addSearchParams: function(a, k) {
                var l = h.parseUrl(a),
                    m = "object" == typeof k ? b.param(k) : k,
                    n = l.search || "?";
                return l.hrefNoSearch + n + ("?" !== n.charAt(n.length - 1) ? "&" : "") + m + (l.hash || "")
            },
            convertUrlToDataUrl: function(k) {
                var l = k,
                    m = h.parseUrl(k);
                return h.isEmbeddedPage(m) ? l = m.hash.split(j)[0].replace(/^#/, "").replace(/\?.*$/, "") : h.isSameDomain(m, this.documentBase) && (l = m.hrefNoHash.replace(this.documentBase.domain, "").split(j)[0]), e.decodeURIComponent(l)
            },
            get: function(c) {
                return c === g && (c = h.parseLocation().hash), h.stripHash(c).replace(/[^\/]*\.[^\/*]+$/, "")
            },
            set: function(c) {
                location.hash = c
            },
            isPath: function(c) {
                return /\//.test(c)
            },
            clean: function(c) {
                return c.replace(this.documentBase.domain, "")
            },
            stripHash: function(c) {
                return c.replace(/^#/, "")
            },
            stripQueryParams: function(c) {
                return c.replace(/\?.*$/, "")
            },
            cleanHash: function(c) {
                return h.stripHash(c.replace(/\?.*$/, "").replace(j, ""))
            },
            isHashValid: function(c) {
                return /^#[^#]+$/.test(c)
            },
            isExternal: function(c) {
                var k = h.parseUrl(c);
                return !(!k.protocol || k.domain.toLowerCase() === this.documentUrl.domain.toLowerCase())
            },
            hasProtocol: function(c) {
                return /^(:?\w+:)/.test(c)
            },
            isEmbeddedPage: function(c) {
                var k = h.parseUrl(c);
                return "" !== k.protocol ? !this.isPath(k.hash) && k.hash && (k.hrefNoHash === this.documentUrl.hrefNoHash || this.documentBaseDiffers && k.hrefNoHash === this.documentBase.hrefNoHash) : /^#/.test(k.href)
            },
            squash: function(m, n) {
                var o, p, q, r, s, t = this.isPath(m),
                    u = this.parseUrl(m),
                    v = u.hash,
                    w = "";
                return n || (t ? n = h.getLocation() : (s = h.getDocumentUrl(!0), n = h.isPath(s.hash) ? h.squash(s.href) : s.href)), p = t ? h.stripHash(m) : m, p = h.isPath(u.hash) ? h.stripHash(u.hash) : p, r = p.indexOf(this.uiStateKey), r > -1 && (w = p.slice(r), p = p.slice(0, r)), o = h.makeUrlAbsolute(p, n), q = this.parseUrl(o).search, t ? ((h.isPath(v) || 0 === v.replace("#", "").indexOf(this.uiStateKey)) && (v = ""), w && -1 === v.indexOf(this.uiStateKey) && (v += w), -1 === v.indexOf("#") && "" !== v && (v = "#" + v), o = h.parseUrl(o), o = o.protocol + o.doubleSlash + o.host + o.pathname + q + v) : o += o.indexOf("#") > -1 ? w : "#" + w, o
            },
            isPreservableHash: function(c) {
                return 0 === c.replace("#", "").indexOf(this.uiStateKey)
            },
            hashToSelector: function(c) {
                var k = "#" === c.substring(0, 1);
                return k && (c = c.substring(1)), (k ? "#" : "") + c.replace(/([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g, "\\$1")
            },
            getFilePath: function(c) {
                return c && c.split(j)[0]
            },
            isFirstPageUrl: function(a) {
                var c = h.parseUrl(h.makeUrlAbsolute(a, this.documentBase)),
                    k = c.hrefNoHash === this.documentUrl.hrefNoHash || this.documentBaseDiffers && c.hrefNoHash === this.documentBase.hrefNoHash,
                    l = b.mobile.firstPage,
                    m = l && l[0] ? l[0].id : g;
                return k && (!c.hash || "#" === c.hash || m && c.hash.replace(/^#/, "") === m)
            },
            isPermittedCrossDomainRequest: function(a, k) {
                return b.mobile.allowCrossDomainPages && ("file:" === a.protocol || "content:" === a.protocol) && -1 !== k.search(/^https?:/)
            }
        }, h.documentUrl = h.parseLocation(), i = b("head").find("base"), h.documentBase = i.length ? h.parseUrl(h.makeUrlAbsolute(i.attr("href"), h.documentUrl.href)) : h.documentUrl, h.documentBaseDiffers = h.documentUrl.hrefNoHash !== h.documentBase.hrefNoHash, h.getDocumentBase = function(a) {
            return a ? b.extend({}, h.documentBase) : h.documentBase.href
        }, b.extend(b.mobile, {
            getDocumentUrl: h.getDocumentUrl,
            getDocumentBase: h.getDocumentBase
        })
    }(d),
    function(c, g) {
        c.mobile.History = function(h, i) {
            this.stack = h || [], this.activeIndex = i || 0
        }, c.extend(c.mobile.History.prototype, {
            getActive: function() {
                return this.stack[this.activeIndex]
            },
            getLast: function() {
                return this.stack[this.previousIndex]
            },
            getNext: function() {
                return this.stack[this.activeIndex + 1]
            },
            getPrev: function() {
                return this.stack[this.activeIndex - 1]
            },
            add: function(h, i) {
                i = i || {}, this.getNext() && this.clearForward(), i.hash && -1 === i.hash.indexOf("#") && (i.hash = "#" + i.hash), i.url = h, this.stack.push(i), this.activeIndex = this.stack.length - 1
            },
            clearForward: function() {
                this.stack = this.stack.slice(0, this.activeIndex + 1)
            },
            find: function(h, i, j) {
                i = i || this.stack;
                var k, l, m, n = i.length;
                for (l = 0; n > l; l++) {
                    if (k = i[l], (decodeURIComponent(h) === decodeURIComponent(k.url) || decodeURIComponent(h) === decodeURIComponent(k.hash)) && (m = l, j)) {
                        return m
                    }
                }
                return m
            },
            closest: function(b) {
                var h, i = this.activeIndex;
                return h = this.find(b, this.stack.slice(0, i)), h === g && (h = this.find(b, this.stack.slice(i), !0), h = h === g ? h : h + i), h
            },
            direct: function(a) {
                var b = this.closest(a.url),
                    h = this.activeIndex;
                b !== g && (this.activeIndex = b, this.previousIndex = h), h > b ? (a.present || a.back || c.noop)(this.getActive(), "back") : b > h ? (a.present || a.forward || c.noop)(this.getActive(), "forward") : b === g && a.missing && a.missing(this.getActive())
            }
        })
    }(d),
    function(b) {
        var c = b.mobile.path,
            g = location.href;
        b.mobile.Navigator = function(a) {
            this.history = a, this.ignoreInitialHashChange = !0, b.mobile.window.bind({
                "popstate.history": b.proxy(this.popstate, this),
                "hashchange.history": b.proxy(this.hashchange, this)
            })
        }, b.extend(b.mobile.Navigator.prototype, {
            squash: function(a, j) {
                var k, l, m = c.isPath(a) ? c.stripHash(a) : a;
                return l = c.squash(a), k = b.extend({
                    hash: m,
                    url: l
                }, j), e.history.replaceState(k, k.title || f.title, l), k
            },
            hash: function(h, i) {
                var j, k, l, m;
                return j = c.parseUrl(h), k = c.parseLocation(), k.pathname + k.search === j.pathname + j.search ? l = j.hash ? j.hash : j.pathname + j.search : c.isPath(h) ? (m = c.parseUrl(i), l = m.pathname + m.search + (c.isPreservableHash(m.hash) ? m.hash.replace("#", "") : "")) : l = h, l
            },
            go: function(a, m, n) {
                var o, p, q, r, s = b.event.special.navigate.isPushStateEnabled();
                p = c.squash(a), q = this.hash(a, p), n && q !== c.stripHash(c.parseLocation().hash) && (this.preventNextHashChange = n), this.preventHashAssignPopState = !0, e.location.hash = q, this.preventHashAssignPopState = !1, o = b.extend({
                    url: p,
                    hash: q,
                    title: f.title
                }, m), s && (r = new b.Event("popstate"), r.originalEvent = {
                    type: "popstate",
                    state: null
                }, this.squash(a, o), n || (this.ignorePopState = !0, b.mobile.window.trigger(r))), this.history.add(o.url, o)
            },
            popstate: function(a) {
                var h, i;
                if (b.event.special.navigate.isPushStateEnabled()) {
                    return this.preventHashAssignPopState ? (this.preventHashAssignPopState = !1, void a.stopImmediatePropagation()) : this.ignorePopState ? void(this.ignorePopState = !1) : !a.originalEvent.state && 1 === this.history.stack.length && this.ignoreInitialHashChange && (this.ignoreInitialHashChange = !1, location.href === g) ? void a.preventDefault() : (h = c.parseLocation().hash, !a.originalEvent.state && h ? (i = this.squash(h), this.history.add(i.url, i), void(a.historyState = i)) : void this.history.direct({
                        url: (a.originalEvent.state || {}).url || h,
                        present: function(j, k) {
                            a.historyState = b.extend({}, j), a.historyState.direction = k
                        }
                    }))
                }
            },
            hashchange: function(a) {
                var h, i;
                if (b.event.special.navigate.isHashChangeEnabled() && !b.event.special.navigate.isPushStateEnabled()) {
                    if (this.preventNextHashChange) {
                        return this.preventNextHashChange = !1, void a.stopImmediatePropagation()
                    }
                    h = this.history, i = c.parseLocation().hash, this.history.direct({
                        url: i,
                        present: function(j, k) {
                            a.hashchangeState = b.extend({}, j), a.hashchangeState.direction = k
                        },
                        missing: function() {
                            h.add(i, {
                                hash: i,
                                title: f.title
                            })
                        }
                    })
                }
            }
        })
    }(d),
    function(c) {
        c.mobile.navigate = function(a, h, i) {
            c.mobile.navigate.navigator.go(a, h, i)
        }, c.mobile.navigate.history = new c.mobile.History, c.mobile.navigate.navigator = new c.mobile.Navigator(c.mobile.navigate.history);
        var g = c.mobile.path.parseLocation();
        c.mobile.navigate.history.add(g.href, {
            hash: g.hash
        })
    }(d),
    function(c, g) {
        var h = {
                animation: {},
                transition: {}
            },
            i = f.createElement("a"),
            j = ["", "webkit-", "moz-", "o-"];
        c.each(["animation", "transition"], function(a, b) {
            var k = 0 === a ? b + "-name" : b;
            c.each(j, function(l, m) {
                return i.style[c.camelCase(m + k)] !== g ? (h[b].prefix = m, !1) : void 0
            }), h[b].duration = c.camelCase(h[b].prefix + b + "-duration"), h[b].event = c.camelCase(h[b].prefix + b + "-end"), "" === h[b].prefix && (h[b].event = h[b].event.toLowerCase())
        }), c.support.cssTransitions = h.transition.prefix !== g, c.support.cssAnimations = h.animation.prefix !== g, c(i).remove(), c.fn.animationComplete = function(a, b, m) {
            var n, o, p = this,
                q = function() {
                    clearTimeout(n), a.apply(this, arguments)
                },
                r = b && "animation" !== b ? "transition" : "animation";
            return c.support.cssTransitions && "transition" === r || c.support.cssAnimations && "animation" === r ? (m === g && (c(this).context !== f && (o = 3000 * parseFloat(c(this).css(h[r].duration))), (0 === o || o === g || isNaN(o)) && (o = c.fn.animationComplete.defaultDuration)), n = setTimeout(function() {
                c(p).off(h[r].event, q), a.apply(p)
            }, o), c(this).one(h[r].event, q)) : (setTimeout(c.proxy(a, this), 0), c(this))
        }, c.fn.animationComplete.defaultDuration = 1000
    }(d),
    function(R, T, V, X) {
        function Z(b) {
            for (; b && "undefined" != typeof b.originalEvent;) {
                b = b.originalEvent
            }
            return b
        }

        function ab(a, p) {
            var q, r, s, t, u, v, w, x, y, z = a.type;
            if (a = R.Event(a), a.type = p, q = a.originalEvent, r = R.event.props, z.search(/^(mouse|click)/) > -1 && (r = aa), q) {
                for (w = r.length, t; w;) {
                    t = r[--w], a[t] = q[t]
                }
            }
            if (z.search(/mouse(down|up)|click/) > -1 && !a.which && (a.which = 1), -1 !== z.search(/^touch/) && (s = Z(q), z = s.touches, u = s.changedTouches, v = z && z.length ? z[0] : u && u.length ? u[0] : X)) {
                for (x = 0, y = W.length; y > x; x++) {
                    t = W[x], a[t] = v[t]
                }
            }
            return a
        }

        function ad(a) {
            for (var g, h, i = {}; a;) {
                g = R.data(a, aI);
                for (h in g) {
                    g[h] && (i[h] = i.hasVirtualBinding = !0)
                }
                a = a.parentNode
            }
            return i
        }

        function af(a, g) {
            for (var h; a;) {
                if (h = R.data(a, aI), h && (!g || h[g])) {
                    return a
                }
                a = a.parentNode
            }
            return null
        }

        function ah() {
            aq = !1
        }

        function aj() {
            aq = !0
        }

        function al() {
            az = 0, am.length = 0, ao = !1, aj()
        }

        function an() {
            ah()
        }

        function ap() {
            ar(), ae = setTimeout(function() {
                ae = 0, al()
            }, R.vmouse.resetTimerDuration)
        }

        function ar() {
            ae && (clearTimeout(ae), ae = 0)
        }

        function au(a, g, h) {
            var i;
            return (h && h[a] || !h && af(g.target, a)) && (i = ab(g, a), R(g.target).trigger(i)), i
        }

        function aw(a) {
            var g, h = R.data(a.target, S);
            ao || az && az === h || (g = au("v" + a.type, a), g && (g.isDefaultPrevented() && a.preventDefault(), g.isPropagationStopped() && a.stopPropagation(), g.isImmediatePropagationStopped() && a.stopImmediatePropagation()))
        }

        function ay(a) {
            var g, i, j, k = Z(a).touches;
            k && 1 === k.length && (g = a.target, i = ad(g), i.hasVirtualBinding && (az = ax++, R.data(g, S, az), ar(), an(), ak = !1, j = Z(a).touches[0], ag = j.pageX, ai = j.pageY, au("vmouseover", a, i), au("vmousedown", a, i)))
        }

        function aA(b) {
            aq || (ak || au("vmousecancel", b, ad(b.target)), ak = !0, ap())
        }

        function aB(a) {
            if (!aq) {
                var g = Z(a).touches[0],
                    i = ak,
                    j = R.vmouse.moveDistanceThreshold,
                    k = ad(a.target);
                ak = ak || Math.abs(g.pageX - ag) > j || Math.abs(g.pageY - ai) > j, ak && !i && au("vmousecancel", a, k), au("vmousemove", a, k), ap()
            }
        }

        function aC(g) {
            if (!aq) {
                aj();
                var h, i, j = ad(g.target);
                au("vmouseup", g, j), ak || (h = au("vclick", g, j), h && h.isDefaultPrevented() && (i = Z(g).changedTouches[0], am.push({
                    touchID: az,
                    x: i.clientX,
                    y: i.clientY
                }), ao = !0)), au("vmouseout", g, j), ak = !1, ap()
            }
        }

        function aD(a) {
            var g, h = R.data(a, aI);
            if (h) {
                for (g in h) {
                    if (h[g]) {
                        return !0
                    }
                }
            }
            return !1
        }

        function aE() {}

        function aF(a) {
            var g = a.substr(1);
            return {
                setup: function() {
                    aD(this) || R.data(this, aI, {});
                    var b = R.data(this, aI);
                    b[a] = !0, ac[a] = (ac[a] || 0) + 1, 1 === ac[a] && av.bind(g, aw), R(this).bind(g, aE), at && (ac.touchstart = (ac.touchstart || 0) + 1, 1 === ac.touchstart && av.bind("touchstart", ay).bind("touchend", aC).bind("touchmove", aB).bind("scroll", aA))
                },
                teardown: function() {
                    --ac[a], ac[a] || av.unbind(g, aw), at && (--ac.touchstart, ac.touchstart || av.unbind("touchstart", ay).unbind("touchmove", aB).unbind("touchend", aC).unbind("scroll", aA));
                    var b = R(this),
                        c = R.data(this, aI);
                    c && (c[a] = !1), b.unbind(g, aE), aD(this) || b.removeData(aI)
                }
            }
        }
        var aG, aH, aI = "virtualMouseBindings",
            S = "virtualTouchID",
            U = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),
            W = "clientX clientY pageX pageY screenX screenY".split(" "),
            Y = R.event.mouseHooks ? R.event.mouseHooks.props : [],
            aa = R.event.props.concat(Y),
            ac = {},
            ae = 0,
            ag = 0,
            ai = 0,
            ak = !1,
            am = [],
            ao = !1,
            aq = !1,
            at = "addEventListener" in V,
            av = R(V),
            ax = 1,
            az = 0;
        for (R.vmouse = {
                moveDistanceThreshold: 10,
                clickDistanceThreshold: 10,
                resetTimerDuration: 1500
            }, aH = 0; aH < U.length; aH++) {
            R.event.special[U[aH]] = aF(U[aH])
        }
        at && V.addEventListener("click", function(a) {
            var k, l, m, n, o, p, q = am.length,
                r = a.target;
            if (q) {
                for (k = a.clientX, l = a.clientY, aG = R.vmouse.clickDistanceThreshold, m = r; m;) {
                    for (n = 0; q > n; n++) {
                        if (o = am[n], p = 0, m === r && Math.abs(o.x - k) < aG && Math.abs(o.y - l) < aG || R.data(m, S) === o.touchID) {
                            return a.preventDefault(), void a.stopPropagation()
                        }
                    }
                    m = m.parentNode
                }
            }
        }, !0)
    }(d, e, f),
    function(c, l, m) {
        function n(a, h, i, j) {
            var k = i.type;
            i.type = h, j ? c.event.trigger(i, m, a) : c.event.dispatch.call(a, i), i.type = k
        }
        var o = c(f),
            p = c.mobile.support.touch,
            q = "touchmove scroll",
            r = p ? "touchstart" : "mousedown",
            s = p ? "touchend" : "mouseup",
            t = p ? "touchmove" : "mousemove";
        c.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "), function(a, g) {
            c.fn[g] = function(b) {
                return b ? this.bind(g, b) : this.trigger(g)
            }, c.attrFn && (c.attrFn[g] = !0)
        }), c.event.special.scrollstart = {
            enabled: !0,
            setup: function() {
                function a(g, u) {
                    h = u, n(j, h ? "scrollstart" : "scrollstop", g)
                }
                var h, i, j = this,
                    k = c(j);
                k.bind(q, function(b) {
                    c.event.special.scrollstart.enabled && (h || a(b, !0), clearTimeout(i), i = setTimeout(function() {
                        a(b, !1)
                    }, 50))
                })
            },
            teardown: function() {
                c(this).unbind(q)
            }
        }, c.event.special.tap = {
            tapholdThreshold: 750,
            emitTapOnTaphold: !0,
            setup: function() {
                var a = this,
                    g = c(a),
                    h = !1;
                g.bind("vmousedown", function(b) {
                    function u() {
                        clearTimeout(x)
                    }

                    function v() {
                        u(), g.unbind("vclick", w).unbind("vmouseup", u), o.unbind("vmousecancel", v)
                    }

                    function w(i) {
                        v(), h || y !== i.target ? h && i.preventDefault() : n(a, "tap", i)
                    }
                    if (h = !1, b.which && 1 !== b.which) {
                        return !1
                    }
                    var x, y = b.target;
                    g.bind("vmouseup", u).bind("vclick", w), o.bind("vmousecancel", v), x = setTimeout(function() {
                        c.event.special.tap.emitTapOnTaphold || (h = !0), n(a, "taphold", c.Event("taphold", {
                            target: y
                        }))
                    }, c.event.special.tap.tapholdThreshold)
                })
            },
            teardown: function() {
                c(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup"), o.unbind("vmousecancel")
            }
        }, c.event.special.swipe = {
            scrollSupressionThreshold: 30,
            durationThreshold: 1000,
            horizontalDistanceThreshold: 30,
            verticalDistanceThreshold: 30,
            getLocation: function(b) {
                var g = l.pageXOffset,
                    h = l.pageYOffset,
                    i = b.clientX,
                    j = b.clientY;
                return 0 === b.pageY && Math.floor(j) > Math.floor(b.pageY) || 0 === b.pageX && Math.floor(i) > Math.floor(b.pageX) ? (i -= g, j -= h) : (j < b.pageY - h || i < b.pageX - g) && (i = b.pageX - g, j = b.pageY - h), {
                    x: i,
                    y: j
                }
            },
            start: function(a) {
                var g = a.originalEvent.touches ? a.originalEvent.touches[0] : a,
                    h = c.event.special.swipe.getLocation(g);
                return {
                    time: (new Date).getTime(),
                    coords: [h.x, h.y],
                    origin: c(a.target)
                }
            },
            stop: function(a) {
                var g = a.originalEvent.touches ? a.originalEvent.touches[0] : a,
                    h = c.event.special.swipe.getLocation(g);
                return {
                    time: (new Date).getTime(),
                    coords: [h.x, h.y]
                }
            },
            handleSwipe: function(a, h, i, j) {
                if (h.time - a.time < c.event.special.swipe.durationThreshold && Math.abs(a.coords[0] - h.coords[0]) > c.event.special.swipe.horizontalDistanceThreshold && Math.abs(a.coords[1] - h.coords[1]) < c.event.special.swipe.verticalDistanceThreshold) {
                    var k = a.coords[0] > h.coords[0] ? "swipeleft" : "swiperight";
                    return n(i, "swipe", c.Event("swipe", {
                        target: j,
                        swipestart: a,
                        swipestop: h
                    }), !0), n(i, k, c.Event(k, {
                        target: j,
                        swipestart: a,
                        swipestop: h
                    }), !0), !0
                }
                return !1
            },
            eventInProgress: !1,
            setup: function() {
                var a, g = this,
                    h = c(g),
                    i = {};
                a = c.data(this, "mobile-events"), a || (a = {
                    length: 0
                }, c.data(this, "mobile-events", a)), a.length++, a.swipe = i, i.start = function(j) {
                    if (!c.event.special.swipe.eventInProgress) {
                        c.event.special.swipe.eventInProgress = !0;
                        var k, u = c.event.special.swipe.start(j),
                            v = j.target,
                            w = !1;
                        i.move = function(x) {
                            u && !x.isDefaultPrevented() && (k = c.event.special.swipe.stop(x), w || (w = c.event.special.swipe.handleSwipe(u, k, g, v), w && (c.event.special.swipe.eventInProgress = !1)), Math.abs(u.coords[0] - k.coords[0]) > c.event.special.swipe.scrollSupressionThreshold && x.preventDefault())
                        }, i.stop = function() {
                            w = !0, c.event.special.swipe.eventInProgress = !1, o.off(t, i.move), i.move = null
                        }, o.on(t, i.move).one(s, i.stop)
                    }
                }, h.on(r, i.start)
            },
            teardown: function() {
                var a, g;
                a = c.data(this, "mobile-events"), a && (g = a.swipe, delete a.swipe, a.length--, 0 === a.length && c.removeData(this, "mobile-events")), g && (g.start && c(this).off(r, g.start), g.move && o.off(t, g.move), g.stop && o.off(s, g.stop))
            }
        }, c.each({
            scrollstop: "scrollstart",
            taphold: "tap",
            swipeleft: "swipe.left",
            swiperight: "swipe.right"
        }, function(a, g) {
            c.event.special[a] = {
                setup: function() {
                    c(this).bind(g, c.noop)
                },
                teardown: function() {
                    c(this).unbind(g)
                }
            }
        })
    }(d, this),
    function(h) {
        h.event.special.throttledresize = {
            setup: function() {
                h(this).bind("resize", m)
            },
            teardown: function() {
                h(this).unbind("resize", m)
            }
        };
        var i, j, k, l = 250,
            m = function() {
                j = (new Date).getTime(), k = j - n, k >= l ? (n = j, h(this).trigger("throttledresize")) : (i && clearTimeout(i), i = setTimeout(m, l - k))
            },
            n = 0
    }(d),
    function(c, o) {
        function p() {
            var b = q();
            b !== r && (r = b, x.trigger(y))
        }
        var q, r, s, t, u, v, w, x = c(o),
            y = "orientationchange",
            z = {
                0: !0,
                180: !0
            };
        c.support.orientation && (u = o.innerWidth || x.width(), v = o.innerHeight || x.height(), w = 50, s = u > v && u - v > w, t = z[o.orientation], (s && t || !s && !t) && (z = {
            "-90": !0,
            90: !0
        })), c.event.special.orientationchange = c.extend({}, c.event.special.orientationchange, {
            setup: function() {
                return c.support.orientation && !c.event.special.orientationchange.disabled ? !1 : (r = q(), void x.bind("throttledresize", p))
            },
            teardown: function() {
                return c.support.orientation && !c.event.special.orientationchange.disabled ? !1 : void x.unbind("throttledresize", p)
            },
            add: function(g) {
                var h = g.handler;
                g.handler = function(b) {
                    return b.orientation = q(), h.apply(this, arguments)
                }
            }
        }), c.event.special.orientationchange.orientation = q = function() {
            var a = !0,
                b = f.documentElement;
            return a = c.support.orientation ? z[o.orientation] : b && b.clientWidth / b.clientHeight < 1.1, a ? "portrait" : "landscape"
        }, c.fn[y] = function(b) {
            return b ? this.bind(y, b) : this.trigger(y)
        }, c.attrFn && (c.attrFn[y] = !0)
    }(d, this),
    function(g) {
        var h = g("head").children("base"),
            i = {
                element: h.length ? h : g("<base>", {
                    href: g.mobile.path.documentBase.hrefNoHash
                }).prependTo(g("head")),
                linkSelector: "[src], link[href], a[rel='external'], :jqmData(ajax='false'), a[target]",
                set: function(a) {
                    g.mobile.dynamicBaseEnabled && g.support.dynamicBaseTag && i.element.attr("href", g.mobile.path.makeUrlAbsolute(a, g.mobile.path.documentBase))
                },
                rewrite: function(a, c) {
                    var j = g.mobile.path.get(a);
                    c.find(i.linkSelector).each(function(k, l) {
                        var m = g(l).is("[href]") ? "href" : g(l).is("[src]") ? "src" : "action",
                            n = g.mobile.path.parseLocation(),
                            o = g(l).attr(m);
                        o = o.replace(n.protocol + n.doubleSlash + n.host + n.pathname, ""), /^(\w+:|#|\/)/.test(o) || g(l).attr(m, j + o)
                    })
                },
                reset: function() {
                    i.element.attr("href", g.mobile.path.documentBase.hrefNoSearch)
                }
            };
        g.mobile.base = i
    }(d),
    function(g, h) {
        g.mobile.widgets = {};
        var i = g.widget,
            j = g.mobile.keepNative;
        g.widget = function(a) {
            return function() {
                var b = a.apply(this, arguments),
                    c = b.prototype.widgetName;
                return b.initSelector = b.prototype.initSelector !== h ? b.prototype.initSelector : ":jqmData(role='" + c + "')", g.mobile.widgets[c] = b, b
            }
        }(g.widget), g.extend(g.widget, i), g.mobile.document.on("create", function(a) {
            g(a.target).enhanceWithin()
        }), g.widget("mobile.page", {
            options: {
                theme: "a",
                domCache: !1,
                keepNativeDefault: g.mobile.keepNative,
                contentTheme: null,
                enhanced: !1
            },
            _createWidget: function() {
                g.Widget.prototype._createWidget.apply(this, arguments), this._trigger("init")
            },
            _create: function() {
                return this._trigger("beforecreate") === !1 ? !1 : (this.options.enhanced || this._enhance(), this._on(this.element, {
                    pagebeforehide: "removeContainerBackground",
                    pagebeforeshow: "_handlePageBeforeShow"
                }), this.element.enhanceWithin(), void("dialog" === g.mobile.getAttribute(this.element[0], "role") && g.mobile.dialog && this.element.dialog()))
            },
            _enhance: function() {
                var a = "data-" + g.mobile.ns,
                    b = this;
                this.options.role && this.element.attr("data-" + g.mobile.ns + "role", this.options.role), this.element.attr("tabindex", "0").addClass("ui-page ui-page-theme-" + this.options.theme), this.element.find("[" + a + "role='content']").each(function() {
                    var c = g(this),
                        k = this.getAttribute(a + "theme") || h;
                    b.options.contentTheme = k || b.options.contentTheme || b.options.dialog && b.options.theme || "dialog" === b.element.jqmData("role") && b.options.theme, c.addClass("ui-content"), b.options.contentTheme && c.addClass("ui-body-" + b.options.contentTheme), c.attr("role", "main").addClass("ui-content")
                })
            },
            bindRemove: function(a) {
                var k = this.element;
                !k.data("mobile-page").options.domCache && k.is(":jqmData(external-page='true')") && k.bind("pagehide.remove", a || function(l, m) {
                    if (!m.samePage) {
                        var n = g(this),
                            o = new g.Event("pageremove");
                        n.trigger(o), o.isDefaultPrevented() || n.removeWithDependents()
                    }
                })
            },
            _setOptions: function(a) {
                a.theme !== h && this.element.removeClass("ui-page-theme-" + this.options.theme).addClass("ui-page-theme-" + a.theme), a.contentTheme !== h && this.element.find("[data-" + g.mobile.ns + "='content']").removeClass("ui-body-" + this.options.contentTheme).addClass("ui-body-" + a.contentTheme)
            },
            _handlePageBeforeShow: function() {
                this.setContainerBackground()
            },
            removeContainerBackground: function() {
                this.element.closest(":mobile-pagecontainer").pagecontainer({
                    theme: "none"
                })
            },
            setContainerBackground: function(b) {
                this.element.parent().pagecontainer({
                    theme: b || this.options.theme
                })
            },
            keepNativeSelector: function() {
                var a = this.options,
                    k = g.trim(a.keepNative || ""),
                    l = g.trim(g.mobile.keepNative),
                    m = g.trim(a.keepNativeDefault),
                    n = j === l ? "" : l,
                    o = "" === n ? m : "";
                return (k ? [k] : []).concat(n ? [n] : []).concat(o ? [o] : []).join(", ")
            }
        })
    }(d),
    function(b, c) {
        b.widget("mobile.pagecontainer", {
            options: {
                theme: "a"
            },
            initSelector: !1,
            _create: function() {
                this._trigger("beforecreate"), this.setLastScrollEnabled = !0, this._on(this.window, {
                    navigate: "_disableRecordScroll",
                    scrollstop: "_delayedRecordScroll"
                }), this._on(this.window, {
                    navigate: "_filterNavigateEvents"
                }), this._on({
                    pagechange: "_afterContentChange"
                }), this.window.one("navigate", b.proxy(function() {
                    this.setLastScrollEnabled = !0
                }, this))
            },
            _setOptions: function(i) {
                i.theme !== c && "none" !== i.theme ? this.element.removeClass("ui-overlay-" + this.options.theme).addClass("ui-overlay-" + i.theme) : i.theme !== c && this.element.removeClass("ui-overlay-" + this.options.theme), this._super(i)
            },
            _disableRecordScroll: function() {
                this.setLastScrollEnabled = !1
            },
            _enableRecordScroll: function() {
                this.setLastScrollEnabled = !0
            },
            _afterContentChange: function() {
                this.setLastScrollEnabled = !0, this._off(this.window, "scrollstop"), this._on(this.window, {
                    scrollstop: "_delayedRecordScroll"
                })
            },
            _recordScroll: function() {
                if (this.setLastScrollEnabled) {
                    var i, j, k, l = this._getActiveHistory();
                    l && (i = this._getScroll(), j = this._getMinScroll(), k = this._getDefaultScroll(), l.lastScroll = j > i ? k : i)
                }
            },
            _delayedRecordScroll: function() {
                setTimeout(b.proxy(this, "_recordScroll"), 100)
            },
            _getScroll: function() {
                return this.window.scrollTop()
            },
            _getMinScroll: function() {
                return b.mobile.minScrollBack
            },
            _getDefaultScroll: function() {
                return b.mobile.defaultHomeScroll
            },
            _filterNavigateEvents: function(a, i) {
                var j;
                a.originalEvent && a.originalEvent.isDefaultPrevented() || (j = a.originalEvent.type.indexOf("hashchange") > -1 ? i.state.hash : i.state.url, j || (j = this._getHash()), j && "#" !== j && 0 !== j.indexOf("#" + b.mobile.path.uiStateKey) || (j = location.href), this._handleNavigate(j, i.state))
            },
            _getHash: function() {
                return b.mobile.path.parseLocation().hash
            },
            getActivePage: function() {
                return this.activePage
            },
            _getInitialContent: function() {
                return b.mobile.firstPage
            },
            _getHistory: function() {
                return b.mobile.navigate.history
            },
            _getActiveHistory: function() {
                return this._getHistory().getActive()
            },
            _getDocumentBase: function() {
                return b.mobile.path.documentBase
            },
            back: function() {
                this.go(-1)
            },
            forward: function() {
                this.go(1)
            },
            go: function(a) {
                if (b.mobile.hashListeningEnabled) {
                    e.history.go(a)
                } else {
                    var i = b.mobile.navigate.history.activeIndex,
                        j = i + parseInt(a, 10),
                        k = b.mobile.navigate.history.stack[j].url,
                        l = a >= 1 ? "forward" : "back";
                    b.mobile.navigate.history.activeIndex = j, b.mobile.navigate.history.previousIndex = i, this.change(k, {
                        direction: l,
                        changeHash: !1,
                        fromHashChange: !0
                    })
                }
            },
            _handleDestination: function(a) {
                var i;
                return "string" === b.type(a) && (a = b.mobile.path.stripHash(a)), a && (i = this._getHistory(), a = b.mobile.path.isPath(a) ? a : b.mobile.path.makeUrlAbsolute("#" + a, this._getDocumentBase())), a || this._getInitialContent()
            },
            _transitionFromHistory: function(i, j) {
                var k = this._getHistory(),
                    l = "back" === i ? k.getLast() : k.getActive();
                return l && l.transition || j
            },
            _handleDialog: function(a, i) {
                var j, k, l = this.getActivePage();
                return l && !l.data("mobile-dialog") ? ("back" === i.direction ? this.back() : this.forward(), !1) : (j = i.pageUrl, k = this._getActiveHistory(), b.extend(a, {
                    role: k.role,
                    transition: this._transitionFromHistory(i.direction, a.transition),
                    reverse: "back" === i.direction
                }), j)
            },
            _handleNavigate: function(a, i) {
                var j = b.mobile.path.stripHash(a),
                    k = this._getHistory(),
                    l = 0 === k.stack.length ? "none" : this._transitionFromHistory(i.direction),
                    m = {
                        changeHash: !1,
                        fromHashChange: !0,
                        reverse: "back" === i.direction
                    };
                b.extend(m, i, {
                    transition: l
                }), k.activeIndex > 0 && j.indexOf(b.mobile.dialogHashKey) > -1 && (j = this._handleDialog(m, i), j === !1) || this._changeContent(this._handleDestination(j), m)
            },
            _changeContent: function(a, i) {
                b.mobile.changePage(a, i)
            },
            _getBase: function() {
                return b.mobile.base
            },
            _getNs: function() {
                return b.mobile.ns
            },
            _enhance: function(i, j) {
                return i.page({
                    role: j
                })
            },
            _include: function(i, j) {
                i.appendTo(this.element), this._enhance(i, j.role), i.page("bindRemove")
            },
            _find: function(a) {
                var i, j = this._createFileUrl(a),
                    k = this._createDataUrl(a),
                    l = this._getInitialContent();
                return i = this.element.children("[data-" + this._getNs() + "url='" + b.mobile.path.hashToSelector(k) + "']"), 0 === i.length && k && !b.mobile.path.isPath(k) && (i = this.element.children(b.mobile.path.hashToSelector("#" + k)).attr("data-" + this._getNs() + "url", k).jqmData("url", k)), 0 === i.length && b.mobile.path.isFirstPageUrl(j) && l && l.parent().length && (i = b(l)), i
            },
            _getLoader: function() {
                return b.mobile.loading()
            },
            _showLoading: function(a, i, j, k) {
                this._loadMsg || (this._loadMsg = setTimeout(b.proxy(function() {
                    this._getLoader().loader("show", i, j, k), this._loadMsg = 0
                }, this), a))
            },
            _hideLoading: function() {
                clearTimeout(this._loadMsg), this._loadMsg = 0, this._getLoader().loader("hide")
            },
            _showError: function() {
                this._hideLoading(), this._showLoading(0, b.mobile.pageLoadErrorMessageTheme, b.mobile.pageLoadErrorMessage, !0), setTimeout(b.proxy(this, "_hideLoading"), 1500)
            },
            _parse: function(a, i) {
                var j, k = b("<div></div>");
                return k.get(0).innerHTML = a, j = k.find(":jqmData(role='page'), :jqmData(role='dialog')").first(), j.length || (j = b("<div data-" + this._getNs() + "role='page'>" + (a.split(/<\/?body[^>]*>/gim)[1] || "") + "</div>")), j.attr("data-" + this._getNs() + "url", this._createDataUrl(i)).attr("data-" + this._getNs() + "external-page", !0), j
            },
            _setLoadedTitle: function(a, i) {
                var j = i.match(/<title[^>]*>([^<]*)/) && RegExp.$1;
                j && !a.jqmData("title") && (j = b("<div>" + j + "</div>").text(), a.jqmData("title", j))
            },
            _isRewritableBaseTag: function() {
                return b.mobile.dynamicBaseEnabled && !b.support.dynamicBaseTag
            },
            _createDataUrl: function(a) {
                return b.mobile.path.convertUrlToDataUrl(a)
            },
            _createFileUrl: function(a) {
                return b.mobile.path.getFilePath(a)
            },
            _triggerWithDeprecated: function(a, i, j) {
                var k = b.Event("page" + a),
                    l = b.Event(this.widgetName + a);
                return (j || this.element).trigger(k, i), this._trigger(a, l, i), {
                    deprecatedEvent: k,
                    event: l
                }
            },
            _loadSuccess: function(a, i, j, k) {
                var l = this._createFileUrl(a);
                return b.proxy(function(n, o, p) {
                    var q, r = new RegExp("(<[^>]+\\bdata-" + this._getNs() + "role=[\"']?page[\"']?[^>]*>)"),
                        s = new RegExp("\\bdata-" + this._getNs() + "url=[\"']?([^\"'>]*)[\"']?");
                    r.test(n) && RegExp.$1 && s.test(RegExp.$1) && RegExp.$1 && (l = b.mobile.path.getFilePath(b("<div>" + RegExp.$1 + "</div>").text()), l = this.window[0].encodeURIComponent(l)), j.prefetch === c && this._getBase().set(l), q = this._parse(n, l), this._setLoadedTitle(q, n), i.xhr = p, i.textStatus = o, i.page = q, i.content = q, i.toPage = q, this._triggerWithDeprecated("load", i).event.isDefaultPrevented() || (this._isRewritableBaseTag() && q && this._getBase().rewrite(l, q), this._include(q, j), j.showLoadMsg && this._hideLoading(), k.resolve(a, j, q))
                }, this)
            },
            _loadDefaults: {
                type: "get",
                data: c,
                reloadPage: !1,
                reload: !1,
                role: c,
                showLoadMsg: !1,
                loadMsgDelay: 50
            },
            load: function(a, n) {
                var o, p, q, r, s = n && n.deferred || b.Deferred(),
                    t = n && n.reload === c && n.reloadPage !== c ? {
                        reload: n.reloadPage
                    } : {},
                    u = b.extend({}, this._loadDefaults, n, t),
                    v = null,
                    w = b.mobile.path.makeUrlAbsolute(a, this._findBaseWithDefault());
                return u.data && "get" === u.type && (w = b.mobile.path.addSearchParams(w, u.data), u.data = c), u.data && "post" === u.type && (u.reload = !0), o = this._createFileUrl(w), p = this._createDataUrl(w), v = this._find(w), 0 === v.length && b.mobile.path.isEmbeddedPage(o) && !b.mobile.path.isFirstPageUrl(o) ? (s.reject(w, u), s.promise()) : (this._getBase().reset(), v.length && !u.reload ? (this._enhance(v, u.role), s.resolve(w, u, v), u.prefetch || this._getBase().set(a), s.promise()) : (r = {
                    url: a,
                    absUrl: w,
                    toPage: a,
                    prevPage: n ? n.fromPage : c,
                    dataUrl: p,
                    deferred: s,
                    options: u
                }, q = this._triggerWithDeprecated("beforeload", r), q.deprecatedEvent.isDefaultPrevented() || q.event.isDefaultPrevented() ? s.promise() : (u.showLoadMsg && this._showLoading(u.loadMsgDelay), u.prefetch === c && this._getBase().reset(), b.mobile.allowCrossDomainPages || b.mobile.path.isSameDomain(b.mobile.path.documentUrl, w) ? (b.ajax({
                    url: o,
                    type: u.type,
                    data: u.data,
                    contentType: u.contentType,
                    dataType: "html",
                    success: this._loadSuccess(w, r, u, s),
                    error: this._loadError(w, r, u, s)
                }), s.promise()) : (s.reject(w, u), s.promise()))))
            },
            _loadError: function(a, i, j, k) {
                return b.proxy(function(l, m, n) {
                    this._getBase().set(b.mobile.path.get()), i.xhr = l, i.textStatus = m, i.errorThrown = n;
                    var o = this._triggerWithDeprecated("loadfailed", i);
                    o.deprecatedEvent.isDefaultPrevented() || o.event.isDefaultPrevented() || (j.showLoadMsg && this._showError(), k.reject(a, j))
                }, this)
            },
            _getTransitionHandler: function(a) {
                return a = b.mobile._maybeDegradeTransition(a), b.mobile.transitionHandlers[a] || b.mobile.defaultTransitionHandler
            },
            _triggerCssTransitionEvents: function(a, i, j) {
                var k = !1;
                j = j || "", i && (a[0] === i[0] && (k = !0), this._triggerWithDeprecated(j + "hide", {
                    nextPage: a,
                    toPage: a,
                    prevPage: i,
                    samePage: k
                }, i)), this._triggerWithDeprecated(j + "show", {
                    prevPage: i || b(""),
                    toPage: a
                }, a)
            },
            _cssTransition: function(a, j, k) {
                var l, m, n = k.transition,
                    o = k.reverse,
                    p = k.deferred;
                this._triggerCssTransitionEvents(a, j, "before"), this._hideLoading(), l = this._getTransitionHandler(n), m = new l(n, o, a, j).transition(), m.done(b.proxy(function() {
                    this._triggerCssTransitionEvents(a, j)
                }, this)), m.done(function() {
                    p.resolve.apply(p, arguments)
                })
            },
            _releaseTransitionLock: function() {
                h = !1, g.length > 0 && b.mobile.changePage.apply(null, g.pop())
            },
            _removeActiveLinkClass: function(a) {
                b.mobile.removeActiveLinkClass(a)
            },
            _loadUrl: function(a, i, j) {
                j.target = a, j.deferred = b.Deferred(), this.load(a, j), j.deferred.done(b.proxy(function(k, l, m) {
                    h = !1, l.absUrl = i.absUrl, this.transition(m, i, l)
                }, this)), j.deferred.fail(b.proxy(function() {
                    this._removeActiveLinkClass(!0), this._releaseTransitionLock(), this._triggerWithDeprecated("changefailed", i)
                }, this))
            },
            _triggerPageBeforeChange: function(a, i, j) {
                var k;
                return i.prevPage = this.activePage, b.extend(i, {
                    toPage: a,
                    options: j
                }), i.absUrl = "string" === b.type(a) ? b.mobile.path.makeUrlAbsolute(a, this._findBaseWithDefault()) : j.absUrl, k = this._triggerWithDeprecated("beforechange", i), k.event.isDefaultPrevented() || k.deprecatedEvent.isDefaultPrevented() ? !1 : !0
            },
            change: function(a, i) {
                if (h) {
                    return void g.unshift(arguments)
                }
                var j = b.extend({}, b.mobile.changePage.defaults, i),
                    k = {};
                j.fromPage = j.fromPage || this.activePage, this._triggerPageBeforeChange(a, k, j) && (a = k.toPage, "string" === b.type(a) ? (h = !0, this._loadUrl(a, k, j)) : this.transition(a, k, j))
            },
            transition: function(a, x, y) {
                var z, A, B, C, D, E, F, G, H, I, J, K, L, M;
                if (h) {
                    return void g.unshift([a, y])
                }
                if (this._triggerPageBeforeChange(a, x, y) && (x.prevPage = y.fromPage, M = this._triggerWithDeprecated("beforetransition", x), !M.deprecatedEvent.isDefaultPrevented() && !M.event.isDefaultPrevented())) {
                    if (h = !0, a[0] !== b.mobile.firstPage[0] || y.dataUrl || (y.dataUrl = b.mobile.path.documentUrl.hrefNoHash), z = y.fromPage, A = y.dataUrl && b.mobile.path.convertUrlToDataUrl(y.dataUrl) || a.jqmData("url"), B = A, C = b.mobile.path.getFilePath(A), D = b.mobile.navigate.history.getActive(), E = 0 === b.mobile.navigate.history.activeIndex, F = 0, G = f.title, H = ("dialog" === y.role || "dialog" === a.jqmData("role")) && a.jqmData("dialog") !== !0, z && z[0] === a[0] && !y.allowSamePageTransition) {
                        return h = !1, this._triggerWithDeprecated("transition", x), this._triggerWithDeprecated("change", x), void(y.fromHashChange && b.mobile.navigate.history.direct({
                            url: A
                        }))
                    }
                    a.page({
                        role: y.role
                    }), y.fromHashChange && (F = "back" === y.direction ? -1 : 1);
                    try {
                        f.activeElement && "body" !== f.activeElement.nodeName.toLowerCase() ? b(f.activeElement).blur() : b("input:focus, textarea:focus, select:focus").blur()
                    } catch (N) {}
                    I = !1, H && D && (D.url && D.url.indexOf(b.mobile.dialogHashKey) > -1 && this.activePage && !this.activePage.hasClass("ui-dialog") && b.mobile.navigate.history.activeIndex > 0 && (y.changeHash = !1, I = !0), A = D.url || "", A += !I && A.indexOf("#") > -1 ? b.mobile.dialogHashKey : "#" + b.mobile.dialogHashKey), J = D ? a.jqmData("title") || a.children(":jqmData(role='header')").find(".ui-title").text() : G, J && G === f.title && (G = J), a.jqmData("title") || a.jqmData("title", G), y.transition = y.transition || (F && !E ? D.transition : c) || (H ? b.mobile.defaultDialogTransition : b.mobile.defaultPageTransition), !F && I && (b.mobile.navigate.history.getActive().pageUrl = B), A && !y.fromHashChange && (!b.mobile.path.isPath(A) && A.indexOf("#") < 0 && (A = "#" + A), K = {
                        transition: y.transition,
                        title: G,
                        pageUrl: B,
                        role: y.role
                    }, y.changeHash !== !1 && b.mobile.hashListeningEnabled ? b.mobile.navigate(this.window[0].encodeURI(A), K, !0) : a[0] !== b.mobile.firstPage[0] && b.mobile.navigate.history.add(A, K)), f.title = G, b.mobile.activePage = a, this.activePage = a, y.reverse = y.reverse || 0 > F, L = b.Deferred(), this._cssTransition(a, z, {
                        transition: y.transition,
                        reverse: y.reverse,
                        deferred: L
                    }), L.done(b.proxy(function(j, k, l, m, n) {
                        b.mobile.removeActiveLinkClass(), y.duplicateCachedPage && y.duplicateCachedPage.remove(), n || b.mobile.focusPage(a), this._releaseTransitionLock(), this._triggerWithDeprecated("transition", x), this._triggerWithDeprecated("change", x)
                    }, this))
                }
            },
            _findBaseWithDefault: function() {
                var a = this.activePage && b.mobile.getClosestBaseUrl(this.activePage);
                return a || b.mobile.path.documentBase.hrefNoHash
            }
        }), b.mobile.navreadyDeferred = b.Deferred();
        var g = [],
            h = !1
    }(d),
    function(b, c) {
        function k(g) {
            for (; g && ("string" != typeof g.nodeName || "a" !== g.nodeName.toLowerCase());) {
                g = g.parentNode
            }
            return g
        }
        var l = b.Deferred(),
            m = b.Deferred(),
            n = function() {
                m.resolve(), m = null
            },
            o = b.mobile.path.documentUrl,
            p = null;
        b.mobile.loadPage = function(a, g) {
            var h;
            return g = g || {}, h = g.pageContainer || b.mobile.pageContainer, g.deferred = b.Deferred(), h.pagecontainer("load", a, g), g.deferred.promise()
        }, b.mobile.back = function() {
            var a = e.navigator;
            this.phonegapNavigationEnabled && a && a.app && a.app.backHistory ? a.app.backHistory() : b.mobile.pageContainer.pagecontainer("back")
        }, b.mobile.focusPage = function(g) {
            var h = g.find("[autofocus]"),
                i = g.find(".ui-title:eq(0)");
            return h.length ? void h.focus() : void(i.length ? i.focus() : g.focus())
        }, b.mobile._maybeDegradeTransition = b.mobile._maybeDegradeTransition || function(g) {
            return g
        }, b.mobile.changePage = function(a, g) {
            b.mobile.pageContainer.pagecontainer("change", a, g)
        }, b.mobile.changePage.defaults = {
            transition: c,
            reverse: !1,
            changeHash: !0,
            fromHashChange: !1,
            role: c,
            duplicateCachedPage: c,
            pageContainer: c,
            showLoadMsg: !0,
            dataUrl: c,
            fromPage: c,
            allowSamePageTransition: !1
        }, b.mobile._registerInternalEvents = function() {
            var a = function(i, j) {
                var q, r, s, t, u = !0;
                return !b.mobile.ajaxEnabled || i.is(":jqmData(ajax='false')") || !i.jqmHijackable().length || i.attr("target") ? !1 : (q = p && p.attr("formaction") || i.attr("action"), t = (i.attr("method") || "get").toLowerCase(), q || (q = b.mobile.getClosestBaseUrl(i), "get" === t && (q = b.mobile.path.parseUrl(q).hrefNoSearch), q === b.mobile.path.documentBase.hrefNoHash && (q = o.hrefNoSearch)), q = b.mobile.path.makeUrlAbsolute(q, b.mobile.getClosestBaseUrl(i)), b.mobile.path.isExternal(q) && !b.mobile.path.isPermittedCrossDomainRequest(o, q) ? !1 : (j || (r = i.serializeArray(), p && p[0].form === i[0] && (s = p.attr("name"), s && (b.each(r, function(g, h) {
                    return h.name === s ? (s = "", !1) : void 0
                }), s && r.push({
                    name: s,
                    value: p.attr("value")
                }))), u = {
                    url: q,
                    options: {
                        type: t,
                        data: b.param(r),
                        transition: i.jqmData("transition"),
                        reverse: "reverse" === i.jqmData("direction"),
                        reloadPage: !0
                    }
                }), u))
            };
            b.mobile.document.delegate("form", "submit", function(g) {
                var h;
                g.isDefaultPrevented() || (h = a(b(this)), h && (b.mobile.changePage(h.url, h.options), g.preventDefault()))
            }), b.mobile.document.bind("vclick", function(i) {
                var j, q, r = i.target,
                    s = !1;
                if (!(i.which > 1) && b.mobile.linkBindingEnabled) {
                    if (p = b(r), b.data(r, "mobile-button")) {
                        if (!a(b(r).closest("form"), !0)) {
                            return
                        }
                        r.parentNode && (r = r.parentNode)
                    } else {
                        if (r = k(r), !r || "#" === b.mobile.path.parseUrl(r.getAttribute("href") || "#").hash) {
                            return
                        }
                        if (!b(r).jqmHijackable().length) {
                            return
                        }
                    }~r.className.indexOf("ui-link-inherit") ? r.parentNode && (q = b.data(r.parentNode, "buttonElements")) : q = b.data(r, "buttonElements"), q ? r = q.outer : s = !0, j = b(r), s && (j = j.closest(".ui-btn")), j.length > 0 && !j.hasClass("ui-state-disabled") && (b.mobile.removeActiveLinkClass(!0), b.mobile.activeClickedLink = j, b.mobile.activeClickedLink.addClass(b.mobile.activeBtnClass))
                }
            }), b.mobile.document.bind("click", function(i) {
                if (b.mobile.linkBindingEnabled && !i.isDefaultPrevented()) {
                    var q, r, s, t, u, v, w, x = k(i.target),
                        y = b(x),
                        z = function() {
                            e.setTimeout(function() {
                                b.mobile.removeActiveLinkClass(!0)
                            }, 200)
                        };
                    if (b.mobile.activeClickedLink && b.mobile.activeClickedLink[0] === i.target.parentNode && z(), x && !(i.which > 1) && y.jqmHijackable().length) {
                        if (y.is(":jqmData(rel='back')")) {
                            return b.mobile.back(), !1
                        }
                        if (q = b.mobile.getClosestBaseUrl(y), r = b.mobile.path.makeUrlAbsolute(y.attr("href") || "#", q), !b.mobile.ajaxEnabled && !b.mobile.path.isEmbeddedPage(r)) {
                            return void z()
                        }
                        if (!(-1 === r.search("#") || b.mobile.path.isExternal(r) && b.mobile.path.isAbsoluteUrl(r))) {
                            if (r = r.replace(/[^#]*#/, ""), !r) {
                                return void i.preventDefault()
                            }
                            r = b.mobile.path.isPath(r) ? b.mobile.path.makeUrlAbsolute(r, q) : b.mobile.path.makeUrlAbsolute("#" + r, o.hrefNoHash)
                        }
                        if (s = y.is("[rel='external']") || y.is(":jqmData(ajax='false')") || y.is("[target]"), t = s || b.mobile.path.isExternal(r) && !b.mobile.path.isPermittedCrossDomainRequest(o, r)) {
                            return void z()
                        }
                        u = y.jqmData("transition"), v = "reverse" === y.jqmData("direction") || y.jqmData("back"), w = y.attr("data-" + b.mobile.ns + "rel") || c, b.mobile.changePage(r, {
                            transition: u,
                            reverse: v,
                            role: w,
                            link: y
                        }), i.preventDefault()
                    }
                }
            }), b.mobile.document.delegate(".ui-page", "pageshow.prefetch", function() {
                var g = [];
                b(this).find("a:jqmData(prefetch)").each(function() {
                    var h = b(this),
                        i = h.attr("href");
                    i && -1 === b.inArray(i, g) && (g.push(i), b.mobile.loadPage(i, {
                        role: h.attr("data-" + b.mobile.ns + "rel"),
                        prefetch: !0
                    }))
                })
            }), b.mobile.pageContainer.pagecontainer(), b.mobile.document.bind("pageshow", function() {
                m ? m.done(b.mobile.resetActivePageHeight) : b.mobile.resetActivePageHeight()
            }), b.mobile.window.bind("throttledresize", b.mobile.resetActivePageHeight)
        }, b(function() {
            l.resolve()
        }), "complete" === f.readyState ? n() : b.mobile.window.load(n), b.when(l, b.mobile.navreadyDeferred).done(function() {
            b.mobile._registerInternalEvents()
        })
    }(d),
    function(c, g) {
        c.mobile.Transition = function() {
            this.init.apply(this, arguments)
        }, c.extend(c.mobile.Transition.prototype, {
            toPreClass: " ui-page-pre-in",
            init: function(a, h, i, j) {
                c.extend(this, {
                    name: a,
                    reverse: h,
                    $to: i,
                    $from: j,
                    deferred: new c.Deferred
                })
            },
            cleanFrom: function() {
                this.$from.removeClass(c.mobile.activePageClass + " out in reverse " + this.name).height("")
            },
            beforeDoneIn: function() {},
            beforeDoneOut: function() {},
            beforeStartOut: function() {},
            doneIn: function() {
                this.beforeDoneIn(), this.$to.removeClass("out in reverse " + this.name).height(""), this.toggleViewportClass(), c.mobile.window.scrollTop() !== this.toScroll && this.scrollPage(), this.sequential || this.$to.addClass(c.mobile.activePageClass), this.deferred.resolve(this.name, this.reverse, this.$to, this.$from, !0)
            },
            doneOut: function(h, i, j, k) {
                this.beforeDoneOut(), this.startIn(h, i, j, k)
            },
            hideIn: function(b) {
                this.$to.css("z-index", -10), b.call(this), this.$to.css("z-index", "")
            },
            scrollPage: function() {
                c.event.special.scrollstart.enabled = !1, (c.mobile.hideUrlBar || this.toScroll !== c.mobile.defaultHomeScroll) && g.scrollTo(0, this.toScroll), setTimeout(function() {
                    c.event.special.scrollstart.enabled = !0
                }, 150)
            },
            startIn: function(a, h, i, j) {
                this.hideIn(function() {
                    this.$to.addClass(c.mobile.activePageClass + this.toPreClass), j || c.mobile.focusPage(this.$to), this.$to.height(a + this.toScroll), i || this.scrollPage()
                }), this.$to.removeClass(this.toPreClass).addClass(this.name + " in " + h), i ? this.doneIn() : this.$to.animationComplete(c.proxy(function() {
                    this.doneIn()
                }, this))
            },
            startOut: function(a, h, i) {
                this.beforeStartOut(a, h, i), this.$from.height(a + c.mobile.window.scrollTop()).addClass(this.name + " out" + h)
            },
            toggleViewportClass: function() {
                c.mobile.pageContainer.toggleClass("ui-mobile-viewport-transitioning viewport-" + this.name)
            },
            transition: function() {
                var a, h = this.reverse ? " reverse" : "",
                    i = c.mobile.getScreenHeight(),
                    j = c.mobile.maxTransitionWidth !== !1 && c.mobile.window.width() > c.mobile.maxTransitionWidth;
                return this.toScroll = c.mobile.navigate.history.getActive().lastScroll || c.mobile.defaultHomeScroll, a = !c.support.cssTransitions || !c.support.cssAnimations || j || !this.name || "none" === this.name || Math.max(c.mobile.window.scrollTop(), this.toScroll) > c.mobile.getMaxScrollForTransition(), this.toggleViewportClass(), this.$from && !a ? this.startOut(i, h, a) : this.doneOut(i, h, a, !0), this.deferred.promise()
            }
        })
    }(d, this),
    function(b) {
        b.mobile.SerialTransition = function() {
            this.init.apply(this, arguments)
        }, b.extend(b.mobile.SerialTransition.prototype, b.mobile.Transition.prototype, {
            sequential: !0,
            beforeDoneOut: function() {
                this.$from && this.cleanFrom()
            },
            beforeStartOut: function(a, g, h) {
                this.$from.animationComplete(b.proxy(function() {
                    this.doneOut(a, g, h)
                }, this))
            }
        })
    }(d),
    function(b) {
        b.mobile.ConcurrentTransition = function() {
            this.init.apply(this, arguments)
        }, b.extend(b.mobile.ConcurrentTransition.prototype, b.mobile.Transition.prototype, {
            sequential: !1,
            beforeDoneIn: function() {
                this.$from && this.cleanFrom()
            },
            beforeStartOut: function(g, h, i) {
                this.doneOut(g, h, i)
            }
        })
    }(d),
    function(c) {
        var g = function() {
            return 3 * c.mobile.getScreenHeight()
        };
        c.mobile.transitionHandlers = {
            sequential: c.mobile.SerialTransition,
            simultaneous: c.mobile.ConcurrentTransition
        }, c.mobile.defaultTransitionHandler = c.mobile.transitionHandlers.sequential, c.mobile.transitionFallbacks = {}, c.mobile._maybeDegradeTransition = function(a) {
            return a && !c.support.cssTransform3d && c.mobile.transitionFallbacks[a] && (a = c.mobile.transitionFallbacks[a]), a
        }, c.mobile.getMaxScrollForTransition = c.mobile.getMaxScrollForTransition || g
    }(d),
    function(b) {
        b.mobile.transitionFallbacks.flip = "fade"
    }(d, this),
    function(b) {
        b.mobile.transitionFallbacks.flow = "fade"
    }(d, this),
    function(b) {
        b.mobile.transitionFallbacks.pop = "fade"
    }(d, this),
    function(b) {
        b.mobile.transitionHandlers.slide = b.mobile.transitionHandlers.simultaneous, b.mobile.transitionFallbacks.slide = "fade"
    }(d, this),
    function(b) {
        b.mobile.transitionFallbacks.slidedown = "fade"
    }(d, this),
    function(b) {
        b.mobile.transitionFallbacks.slidefade = "fade"
    }(d, this),
    function(b) {
        b.mobile.transitionFallbacks.slideup = "fade"
    }(d, this),
    function(b) {
        b.mobile.transitionFallbacks.turn = "fade"
    }(d, this),
    function(b) {
        b.mobile.degradeInputs = {
            color: !1,
            date: !1,
            datetime: !1,
            "datetime-local": !1,
            email: !1,
            month: !1,
            number: !1,
            range: "number",
            search: "text",
            tel: !1,
            time: !1,
            url: !1,
            week: !1
        }, b.mobile.page.prototype.options.degradeInputs = b.mobile.degradeInputs, b.mobile.degradeInputsWithin = function(a) {
            a = b(a), a.find("input").not(b.mobile.page.prototype.keepNativeSelector()).each(function() {
                var i, j, k, l, m = b(this),
                    n = this.getAttribute("type"),
                    o = b.mobile.degradeInputs[n] || "text";
                b.mobile.degradeInputs[n] && (i = b("<div>").html(m.clone()).html(), j = i.indexOf(" type=") > -1, k = j ? /\s+type=["']?\w+['"]?/ : /\/?>/, l = ' type="' + o + '" data-' + b.mobile.ns + 'type="' + n + '"' + (j ? "" : ">"), m.replaceWith(i.replace(k, l)))
            })
        }
    }(d),
    function(g, h, i) {
        g.widget("mobile.page", g.mobile.page, {
            options: {
                closeBtn: "left",
                closeBtnText: "Close",
                overlayTheme: "a",
                corners: !0,
                dialog: !1
            },
            _create: function() {
                this._super(), this.options.dialog && (g.extend(this, {
                    _inner: this.element.children(),
                    _headerCloseButton: null
                }), this.options.enhanced || this._setCloseBtn(this.options.closeBtn))
            },
            _enhance: function() {
                this._super(), this.options.dialog && this.element.addClass("ui-dialog").wrapInner(g("<div/>", {
                    role: "dialog",
                    "class": "ui-dialog-contain ui-overlay-shadow" + (this.options.corners ? " ui-corner-all" : "")
                }))
            },
            _setOptions: function(a) {
                var c, j, k = this.options;
                a.corners !== i && this._inner.toggleClass("ui-corner-all", !!a.corners), a.overlayTheme !== i && g.mobile.activePage[0] === this.element[0] && (k.overlayTheme = a.overlayTheme, this._handlePageBeforeShow()), a.closeBtnText !== i && (c = k.closeBtn, j = a.closeBtnText), a.closeBtn !== i && (c = a.closeBtn), c && this._setCloseBtn(c, j), this._super(a)
            },
            _handlePageBeforeShow: function() {
                this.options.overlayTheme && this.options.dialog ? (this.removeContainerBackground(), this.setContainerBackground(this.options.overlayTheme)) : this._super()
            },
            _setCloseBtn: function(a, j) {
                var k, l = this._headerCloseButton;
                a = "left" === a ? "left" : "right" === a ? "right" : "none", "none" === a ? l && (l.remove(), l = null) : l ? (l.removeClass("ui-btn-left ui-btn-right").addClass("ui-btn-" + a), j && l.text(j)) : (k = this._inner.find(":jqmData(role='header')").first(), l = g("<a></a>", {
                    href: "#",
                    "class": "ui-btn ui-corner-all ui-icon-delete ui-btn-icon-notext ui-btn-" + a
                }).attr("data-" + g.mobile.ns + "rel", "back").text(j || this.options.closeBtnText || "").prependTo(k)), this._headerCloseButton = l
            }
        })
    }(d, this),
    function(g, h, i) {
        g.widget("mobile.dialog", {
            options: {
                closeBtn: "left",
                closeBtnText: "Close",
                overlayTheme: "a",
                corners: !0
            },
            _handlePageBeforeShow: function() {
                this._isCloseable = !0, this.options.overlayTheme && this.element.page("removeContainerBackground").page("setContainerBackground", this.options.overlayTheme)
            },
            _handlePageBeforeHide: function() {
                this._isCloseable = !1
            },
            _handleVClickSubmit: function(a) {
                var j, k = g(a.target).closest("vclick" === a.type ? "a" : "form");
                k.length && !k.jqmData("transition") && (j = {}, j["data-" + g.mobile.ns + "transition"] = (g.mobile.navigate.history.getActive() || {}).transition || g.mobile.defaultDialogTransition, j["data-" + g.mobile.ns + "direction"] = "reverse", k.attr(j))
            },
            _create: function() {
                var a = this.element,
                    j = this.options;
                a.addClass("ui-dialog").wrapInner(g("<div/>", {
                    role: "dialog",
                    "class": "ui-dialog-contain ui-overlay-shadow" + (j.corners ? " ui-corner-all" : "")
                })), g.extend(this, {
                    _isCloseable: !1,
                    _inner: a.children(),
                    _headerCloseButton: null
                }), this._on(a, {
                    vclick: "_handleVClickSubmit",
                    submit: "_handleVClickSubmit",
                    pagebeforeshow: "_handlePageBeforeShow",
                    pagebeforehide: "_handlePageBeforeHide"
                }), this._setCloseBtn(j.closeBtn)
            },
            _setOptions: function(a) {
                var c, j, k = this.options;
                a.corners !== i && this._inner.toggleClass("ui-corner-all", !!a.corners), a.overlayTheme !== i && g.mobile.activePage[0] === this.element[0] && (k.overlayTheme = a.overlayTheme, this._handlePageBeforeShow()), a.closeBtnText !== i && (c = k.closeBtn, j = a.closeBtnText), a.closeBtn !== i && (c = a.closeBtn), c && this._setCloseBtn(c, j), this._super(a)
            },
            _setCloseBtn: function(a, j) {
                var k, l = this._headerCloseButton;
                a = "left" === a ? "left" : "right" === a ? "right" : "none", "none" === a ? l && (l.remove(), l = null) : l ? (l.removeClass("ui-btn-left ui-btn-right").addClass("ui-btn-" + a), j && l.text(j)) : (k = this._inner.find(":jqmData(role='header')").first(), l = g("<a></a>", {
                    role: "button",
                    href: "#",
                    "class": "ui-btn ui-corner-all ui-icon-delete ui-btn-icon-notext ui-btn-" + a
                }).text(j || this.options.closeBtnText || "").prependTo(k), this._on(l, {
                    click: "close"
                })), this._headerCloseButton = l
            },
            close: function() {
                var a = g.mobile.navigate.history;
                this._isCloseable && (this._isCloseable = !1, g.mobile.hashListeningEnabled && a.activeIndex > 0 ? g.mobile.back() : g.mobile.pageContainer.pagecontainer("back"))
            }
        })
    }(d, this),
    function(g, h) {
        var i = /([A-Z])/g,
            j = function(b) {
                return "ui-btn-icon-" + (null === b ? "left" : b)
            };
        g.widget("mobile.collapsible", {
            options: {
                enhanced: !1,
                expandCueText: null,
                collapseCueText: null,
                collapsed: !0,
                heading: "h1,h2,h3,h4,h5,h6,legend",
                collapsedIcon: null,
                expandedIcon: null,
                iconpos: null,
                theme: null,
                contentTheme: null,
                inset: null,
                corners: null,
                mini: null
            },
            _create: function() {
                var a = this.element,
                    k = {
                        accordion: a.closest(":jqmData(role='collapsible-set'),:jqmData(role='collapsibleset')" + (g.mobile.collapsibleset ? ", :mobile-collapsibleset" : "")).addClass("ui-collapsible-set")
                    };
                this._ui = k, this._renderedOptions = this._getOptions(this.options), this.options.enhanced ? (k.heading = this.element.children(".ui-collapsible-heading"), k.content = k.heading.next(), k.anchor = k.heading.children(), k.status = k.anchor.children(".ui-collapsible-heading-status")) : this._enhance(a, k), this._on(k.heading, {
                    tap: function() {
                        k.heading.find("a").first().addClass(g.mobile.activeBtnClass)
                    },
                    click: function(b) {
                        this._handleExpandCollapse(!k.heading.hasClass("ui-collapsible-heading-collapsed")), b.preventDefault(), b.stopPropagation()
                    }
                })
            },
            _getOptions: function(a) {
                var c, k = this._ui.accordion,
                    l = this._ui.accordionWidget;
                a = g.extend({}, a), k.length && !l && (this._ui.accordionWidget = l = k.data("mobile-collapsibleset"));
                for (c in a) {
                    a[c] = null != a[c] ? a[c] : l ? l.options[c] : k.length ? g.mobile.getAttribute(k[0], c.replace(i, "-$1").toLowerCase()) : null, null == a[c] && (a[c] = g.mobile.collapsible.defaults[c])
                }
                return a
            },
            _themeClassFromOption: function(c, k) {
                return k ? "none" === k ? "" : c + k : ""
            },
            _enhance: function(a, k) {
                var l, m = this._renderedOptions,
                    n = this._themeClassFromOption("ui-body-", m.contentTheme);
                return a.addClass("ui-collapsible " + (m.inset ? "ui-collapsible-inset " : "") + (m.inset && m.corners ? "ui-corner-all " : "") + (n ? "ui-collapsible-themed-content " : "")), k.originalHeading = a.children(this.options.heading).first(), k.content = a.wrapInner("<div class='ui-collapsible-content " + n + "'></div>").children(".ui-collapsible-content"), k.heading = k.originalHeading, k.heading.is("legend") && (k.heading = g("<div role='heading'>" + k.heading.html() + "</div>"), k.placeholder = g("<div><!-- placeholder for legend --></div>").insertBefore(k.originalHeading), k.originalHeading.remove()), l = m.collapsed ? m.collapsedIcon ? "ui-icon-" + m.collapsedIcon : "" : m.expandedIcon ? "ui-icon-" + m.expandedIcon : "", k.status = g("<span class='ui-collapsible-heading-status'></span>"), k.anchor = k.heading.detach().addClass("ui-collapsible-heading").append(k.status).wrapInner("<a href='#' class='ui-collapsible-heading-toggle'></a>").find("a").first().addClass("ui-btn " + (l ? l + " " : "") + (l ? j(m.iconpos) + " " : "") + this._themeClassFromOption("ui-btn-", m.theme) + " " + (m.mini ? "ui-mini " : "")), k.heading.insertBefore(k.content), this._handleExpandCollapse(this.options.collapsed), k
            },
            refresh: function() {
                this._applyOptions(this.options), this._renderedOptions = this._getOptions(this.options)
            },
            _applyOptions: function(b) {
                var o, p, q, r, s, t = this.element,
                    u = this._renderedOptions,
                    v = this._ui,
                    w = v.anchor,
                    x = v.status,
                    y = this._getOptions(b);
                b.collapsed !== h && this._handleExpandCollapse(b.collapsed), o = t.hasClass("ui-collapsible-collapsed"), o ? y.expandCueText !== h && x.text(y.expandCueText) : y.collapseCueText !== h && x.text(y.collapseCueText), s = y.collapsedIcon !== h ? y.collapsedIcon !== !1 : u.collapsedIcon !== !1, (y.iconpos !== h || y.collapsedIcon !== h || y.expandedIcon !== h) && (w.removeClass([j(u.iconpos)].concat(u.expandedIcon ? ["ui-icon-" + u.expandedIcon] : []).concat(u.collapsedIcon ? ["ui-icon-" + u.collapsedIcon] : []).join(" ")), s && w.addClass([j(y.iconpos !== h ? y.iconpos : u.iconpos)].concat(o ? ["ui-icon-" + (y.collapsedIcon !== h ? y.collapsedIcon : u.collapsedIcon)] : ["ui-icon-" + (y.expandedIcon !== h ? y.expandedIcon : u.expandedIcon)]).join(" "))), y.theme !== h && (q = this._themeClassFromOption("ui-btn-", u.theme), p = this._themeClassFromOption("ui-btn-", y.theme), w.removeClass(q).addClass(p)), y.contentTheme !== h && (q = this._themeClassFromOption("ui-body-", u.contentTheme), p = this._themeClassFromOption("ui-body-", y.contentTheme), v.content.removeClass(q).addClass(p)), y.inset !== h && (t.toggleClass("ui-collapsible-inset", y.inset), r = !(!y.inset || !y.corners && !u.corners)), y.corners !== h && (r = !(!y.corners || !y.inset && !u.inset)), r !== h && t.toggleClass("ui-corner-all", r), y.mini !== h && w.toggleClass("ui-mini", y.mini)
            },
            _setOptions: function(b) {
                this._applyOptions(b), this._super(b), this._renderedOptions = this._getOptions(this.options)
            },
            _handleExpandCollapse: function(a) {
                var k = this._renderedOptions,
                    l = this._ui;
                l.status.text(a ? k.expandCueText : k.collapseCueText), l.heading.toggleClass("ui-collapsible-heading-collapsed", a).find("a").first().toggleClass("ui-icon-" + k.expandedIcon, !a).toggleClass("ui-icon-" + k.collapsedIcon, a || k.expandedIcon === k.collapsedIcon).removeClass(g.mobile.activeBtnClass), this.element.toggleClass("ui-collapsible-collapsed", a), l.content.toggleClass("ui-collapsible-content-collapsed", a).attr("aria-hidden", a).trigger("updatelayout"), this.options.collapsed = a, this._trigger(a ? "collapse" : "expand")
            },
            expand: function() {
                this._handleExpandCollapse(!1)
            },
            collapse: function() {
                this._handleExpandCollapse(!0)
            },
            _destroy: function() {
                var c = this._ui,
                    k = this.options;
                k.enhanced || (c.placeholder ? (c.originalHeading.insertBefore(c.placeholder), c.placeholder.remove(), c.heading.remove()) : (c.status.remove(), c.heading.removeClass("ui-collapsible-heading ui-collapsible-heading-collapsed").children().contents().unwrap()), c.anchor.contents().unwrap(), c.content.contents().unwrap(), this.element.removeClass("ui-collapsible ui-collapsible-collapsed ui-collapsible-themed-content ui-collapsible-inset ui-corner-all"))
            }
        }), g.mobile.collapsible.defaults = {
            expandCueText: " click to expand contents",
            collapseCueText: " click to collapse contents",
            collapsedIcon: "plus",
            contentTheme: "inherit",
            expandedIcon: "minus",
            iconpos: "left",
            inset: !0,
            corners: !0,
            theme: "inherit",
            mini: !1
        }
    }(d),
    function(g) {
        function h(a) {
            var c, j = a.length,
                k = [];
            for (c = 0; j > c; c++) {
                a[c].className.match(i) || k.push(a[c])
            }
            return g(k)
        }
        var i = /\bui-screen-hidden\b/;
        g.mobile.behaviors.addFirstLastClasses = {
            _getVisibles: function(b, j) {
                var k;
                return j ? k = h(b) : (k = b.filter(":visible"), 0 === k.length && (k = h(b))), k
            },
            _addFirstLastClasses: function(j, k, l) {
                j.removeClass("ui-first-child ui-last-child"), k.eq(0).addClass("ui-first-child").end().last().addClass("ui-last-child"), l || this.element.trigger("updatelayout")
            },
            _removeFirstLastClasses: function(b) {
                b.removeClass("ui-first-child ui-last-child")
            }
        }
    }(d),
    function(g, h) {
        var i = ":mobile-collapsible, " + g.mobile.collapsible.initSelector;
        g.widget("mobile.collapsibleset", g.extend({
            initSelector: ":jqmData(role='collapsible-set'),:jqmData(role='collapsibleset')",
            options: g.extend({
                enhanced: !1
            }, g.mobile.collapsible.defaults),
            _handleCollapsibleExpand: function(a) {
                var j = g(a.target).closest(".ui-collapsible");
                j.parent().is(":mobile-collapsibleset, :jqmData(role='collapsible-set')") && j.siblings(".ui-collapsible:not(.ui-collapsible-collapsed)").collapsible("collapse")
            },
            _create: function() {
                var a = this.element,
                    j = this.options;
                g.extend(this, {
                    _classes: ""
                }), j.enhanced || (a.addClass("ui-collapsible-set " + this._themeClassFromOption("ui-group-theme-", j.theme) + " " + (j.corners && j.inset ? "ui-corner-all " : "")), this.element.find(g.mobile.collapsible.initSelector).collapsible()), this._on(a, {
                    collapsibleexpand: "_handleCollapsibleExpand"
                })
            },
            _themeClassFromOption: function(c, j) {
                return j ? "none" === j ? "" : c + j : ""
            },
            _init: function() {
                this._refresh(!0), this.element.children(i).filter(":jqmData(collapsed='false')").collapsible("expand")
            },
            _setOptions: function(b) {
                var j, k, l = this.element,
                    m = this._themeClassFromOption("ui-group-theme-", b.theme);
                return m && l.removeClass(this._themeClassFromOption("ui-group-theme-", this.options.theme)).addClass(m), b.inset !== h && (k = !(!b.inset || !b.corners && !this.options.corners)), b.corners !== h && (k = !(!b.corners || !b.inset && !this.options.inset)), k !== h && l.toggleClass("ui-corner-all", k), j = this._super(b), this.element.children(":mobile-collapsible").collapsible("refresh"), j
            },
            _destroy: function() {
                var b = this.element;
                this._removeFirstLastClasses(b.children(i)), b.removeClass("ui-collapsible-set ui-corner-all " + this._themeClassFromOption("ui-group-theme-", this.options.theme)).children(":mobile-collapsible").collapsible("destroy")
            },
            _refresh: function(a) {
                var c = this.element.children(i);
                this.element.find(g.mobile.collapsible.initSelector).not(".ui-collapsible").collapsible(), this._addFirstLastClasses(c, this._getVisibles(c, a), a)
            },
            refresh: function() {
                this._refresh(!1)
            }
        }, g.mobile.behaviors.addFirstLastClasses))
    }(d),
    function(b) {
        b.fn.fieldcontain = function() {
            return this.addClass("ui-field-contain")
        }
    }(d),
    function(b) {
        b.fn.grid = function(a) {
            return this.each(function() {
                var j, k, l = b(this),
                    m = b.extend({
                        grid: null
                    }, a),
                    n = l.children(),
                    o = {
                        solo: 1,
                        a: 2,
                        b: 3,
                        c: 4,
                        d: 5
                    },
                    p = m.grid;
                if (!p) {
                    if (n.length <= 5) {
                        for (k in o) {
                            o[k] === n.length && (p = k)
                        }
                    } else {
                        p = "a", l.addClass("ui-grid-duo")
                    }
                }
                j = o[p], l.addClass("ui-grid-" + p), n.filter(":nth-child(" + j + "n+1)").addClass("ui-block-a"), j > 1 && n.filter(":nth-child(" + j + "n+2)").addClass("ui-block-b"), j > 2 && n.filter(":nth-child(" + j + "n+3)").addClass("ui-block-c"), j > 3 && n.filter(":nth-child(" + j + "n+4)").addClass("ui-block-d"), j > 4 && n.filter(":nth-child(" + j + "n+5)").addClass("ui-block-e")
            })
        }
    }(d),
    function(c, g) {
        c.widget("mobile.navbar", {
            options: {
                iconpos: "top",
                grid: null
            },
            _create: function() {
                var a = this.element,
                    b = a.find("a, button"),
                    h = b.filter(":jqmData(icon)").length ? this.options.iconpos : g;
                a.addClass("ui-navbar").attr("role", "navigation").find("ul").jqmEnhanceable().grid({
                    grid: this.options.grid
                }), b.each(function() {
                    var i = c.mobile.getAttribute(this, "icon"),
                        j = c.mobile.getAttribute(this, "theme"),
                        k = "ui-btn";
                    j && (k += " ui-btn-" + j), i && (k += " ui-icon-" + i + " ui-btn-icon-" + h), c(this).addClass(k)
                }), a.delegate("a", "vclick", function() {
                    var i = c(this);
                    i.hasClass("ui-state-disabled") || i.hasClass("ui-disabled") || i.hasClass(c.mobile.activeBtnClass) || (b.removeClass(c.mobile.activeBtnClass), i.addClass(c.mobile.activeBtnClass), c(f).one("pagehide", function() {
                        i.removeClass(c.mobile.activeBtnClass)
                    }))
                }), a.closest(".ui-page").bind("pagebeforeshow", function() {
                    b.filter(".ui-state-persist").addClass(c.mobile.activeBtnClass)
                })
            }
        })
    }(d),
    function(c) {
        var g = c.mobile.getAttribute;
        c.widget("mobile.listview", c.extend({
            options: {
                theme: null,
                countTheme: null,
                dividerTheme: null,
                icon: "carat-r",
                splitIcon: "carat-r",
                splitTheme: null,
                corners: !0,
                shadow: !0,
                inset: !1
            },
            _create: function() {
                var h = this,
                    i = "";
                i += h.options.inset ? " ui-listview-inset" : "", h.options.inset && (i += h.options.corners ? " ui-corner-all" : "", i += h.options.shadow ? " ui-shadow" : ""), h.element.addClass(" ui-listview" + i), h.refresh(!0)
            },
            _findFirstElementByTagName: function(h, i, j, k) {
                var l = {};
                for (l[j] = l[k] = !0; h;) {
                    if (l[h.nodeName]) {
                        return h
                    }
                    h = h[i]
                }
                return null
            },
            _addThumbClasses: function(a) {
                var h, i, j = a.length;
                for (h = 0; j > h; h++) {
                    i = c(this._findFirstElementByTagName(a[h].firstChild, "nextSibling", "img", "IMG")), i.length && c(this._findFirstElementByTagName(i[0].parentNode, "parentNode", "li", "LI")).addClass(i.hasClass("ui-li-icon") ? "ui-li-has-icon" : "ui-li-has-thumb")
                }
            },
            _getChildrenByTagName: function(a, h, i) {
                var j = [],
                    k = {};
                for (k[h] = k[i] = !0, a = a.firstChild; a;) {
                    k[a.nodeName] && j.push(a), a = a.nextSibling
                }
                return c(j)
            },
            _beforeListviewRefresh: c.noop,
            _afterListviewRefresh: c.noop,
            refresh: function(F) {
                var H, J, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, aa, ab, ac, ad = this.options,
                    ae = this.element,
                    af = !!c.nodeName(ae[0], "ol"),
                    a = ae.attr("start"),
                    b = {},
                    G = ae.find(".ui-li-count"),
                    I = g(ae[0], "counttheme") || this.options.countTheme,
                    K = I ? "ui-body-" + I : "ui-body-inherit";
                for (ad.theme && ae.addClass("ui-group-theme-" + ad.theme), af && (a || 0 === a) && (T = parseInt(a, 10) - 1, ae.css("counter-reset", "listnumbering " + T)), this._beforeListviewRefresh(), ac = this._getChildrenByTagName(ae[0], "li", "LI"), J = 0, L = ac.length; L > J; J++) {
                    M = ac.eq(J), N = "", (F || M[0].className.search(/\bui-li-static\b|\bui-li-divider\b/) < 0) && (R = this._getChildrenByTagName(M[0], "a", "A"), S = "list-divider" === g(M[0], "role"), V = M.attr("value"), O = g(M[0], "theme"), R.length && R[0].className.search(/\bui-btn\b/) < 0 && !S ? (P = g(M[0], "icon"), Q = P === !1 ? !1 : P || ad.icon, R.removeClass("ui-link"), H = "ui-btn", O && (H += " ui-btn-" + O), R.length > 1 ? (N = "ui-li-has-alt", W = R.last(), X = g(W[0], "theme") || ad.splitTheme || g(M[0], "theme", !0), Y = X ? " ui-btn-" + X : "", Z = g(W[0], "icon") || g(M[0], "icon") || ad.splitIcon, aa = "ui-btn ui-btn-icon-notext ui-icon-" + Z + Y, W.attr("title", c.trim(W.getEncodedText())).addClass(aa).empty(), R = R.first()) : Q && (H += " ui-btn-icon-right ui-icon-" + Q), R.addClass(H)) : S ? (ab = g(M[0], "theme") || ad.dividerTheme || ad.theme, N = "ui-li-divider ui-bar-" + (ab ? ab : "inherit"), M.attr("role", "heading")) : R.length <= 0 && (N = "ui-li-static ui-body-" + (O ? O : "inherit")), af && V && (U = parseInt(V, 10) - 1, M.css("counter-reset", "listnumbering " + U))), b[N] || (b[N] = []), b[N].push(M[0])
                }
                for (N in b) {
                    c(b[N]).addClass(N)
                }
                G.each(function() {
                    c(this).closest("li").addClass("ui-li-has-count")
                }), K && G.not("[class*='ui-body-']").addClass(K), this._addThumbClasses(ac), this._addThumbClasses(ac.find(".ui-btn")), this._afterListviewRefresh(), this._addFirstLastClasses(ac, this._getVisibles(ac, F), F)
            }
        }, c.mobile.behaviors.addFirstLastClasses))
    }(d),
    function(c) {
        function g(a) {
            var h = c.trim(a.text()) || null;
            return h ? h = h.slice(0, 1).toUpperCase() : null
        }
        c.widget("mobile.listview", c.mobile.listview, {
            options: {
                autodividers: !1,
                autodividersSelector: g
            },
            _beforeListviewRefresh: function() {
                this.options.autodividers && (this._replaceDividers(), this._superApply(arguments))
            },
            _replaceDividers: function() {
                var a, j, k, l, m, n = null,
                    o = this.element;
                for (o.children("li:jqmData(role='list-divider')").remove(), j = o.children("li"), a = 0; a < j.length; a++) {
                    k = j[a], l = this.options.autodividersSelector(c(k)), l && n !== l && (m = f.createElement("li"), m.appendChild(f.createTextNode(l)), m.setAttribute("data-" + c.mobile.ns + "role", "list-divider"), k.parentNode.insertBefore(m, k)), n = l
                }
            }
        })
    }(d),
    function(g) {
        var h = /(^|\s)ui-li-divider($|\s)/,
            i = /(^|\s)ui-screen-hidden($|\s)/;
        g.widget("mobile.listview", g.mobile.listview, {
            options: {
                hideDividers: !1
            },
            _afterListviewRefresh: function() {
                var b, c, j, k = !0;
                if (this._superApply(arguments), this.options.hideDividers) {
                    for (b = this._getChildrenByTagName(this.element[0], "li", "LI"), c = b.length - 1; c > -1; c--) {
                        j = b[c], j.className.match(h) ? (k && (j.className = j.className + " ui-screen-hidden"), k = !0) : j.className.match(i) || (k = !1)
                    }
                }
            }
        })
    }(d),
    function(b) {
        b.mobile.nojs = function(a) {
            b(":jqmData(role='nojs')", a).addClass("ui-nojs")
        }
    }(d),
    function(b) {
        b.mobile.behaviors.formReset = {
            _handleFormReset: function() {
                this._on(this.element.closest("form"), {
                    reset: function() {
                        this._delay("_reset")
                    }
                })
            }
        }
    }(d),
    function(g, h) {
        var i = g.mobile.path.hashToSelector;
        g.widget("mobile.checkboxradio", g.extend({
            initSelector: "input:not( :jqmData(role='flipswitch' ) )[type='checkbox'],input[type='radio']:not( :jqmData(role='flipswitch' ))",
            options: {
                theme: "inherit",
                mini: !1,
                wrapperClass: null,
                enhanced: !1,
                iconpos: "left"
            },
            _create: function() {
                var a = this.element,
                    j = this.options,
                    k = function(c, p) {
                        return c.jqmData(p) || c.closest("form, fieldset").jqmData(p)
                    },
                    l = this.options.enhanced ? {
                        element: this.element.siblings("label"),
                        isParent: !1
                    } : this._findLabel(),
                    m = a[0].type,
                    n = "ui-" + m + "-on",
                    o = "ui-" + m + "-off";
                ("checkbox" === m || "radio" === m) && (this.element[0].disabled && (this.options.disabled = !0), j.iconpos = k(a, "iconpos") || l.element.attr("data-" + g.mobile.ns + "iconpos") || j.iconpos, j.mini = k(a, "mini") || j.mini, g.extend(this, {
                    input: a,
                    label: l.element,
                    labelIsParent: l.isParent,
                    inputtype: m,
                    checkedClass: n,
                    uncheckedClass: o
                }), this.options.enhanced || this._enhance(), this._on(l.element, {
                    vmouseover: "_handleLabelVMouseOver",
                    vclick: "_handleLabelVClick"
                }), this._on(a, {
                    vmousedown: "_cacheVals",
                    vclick: "_handleInputVClick",
                    focus: "_handleInputFocus",
                    blur: "_handleInputBlur"
                }), this._handleFormReset(), this.refresh())
            },
            _findLabel: function() {
                var a, c, j, k = this.element,
                    l = k[0].labels;
                return l && l.length > 0 ? (c = g(l[0]), j = g.contains(c[0], k[0])) : (a = k.closest("label"), j = a.length > 0, c = j ? a : g(this.document[0].getElementsByTagName("label")).filter("[for='" + i(k[0].id) + "']").first()), {
                    element: c,
                    isParent: j
                }
            },
            _enhance: function() {
                this.label.addClass("ui-btn ui-corner-all"), this.labelIsParent ? this.input.add(this.label).wrapAll(this._wrapper()) : (this.element.wrap(this._wrapper()), this.element.parent().prepend(this.label)), this._setOptions({
                    theme: this.options.theme,
                    iconpos: this.options.iconpos,
                    mini: this.options.mini
                })
            },
            _wrapper: function() {
                return g("<div class='" + (this.options.wrapperClass ? this.options.wrapperClass : "") + " ui-" + this.inputtype + (this.options.disabled ? " ui-state-disabled" : "") + "' ></div>")
            },
            _handleInputFocus: function() {
                this.label.addClass(g.mobile.focusClass)
            },
            _handleInputBlur: function() {
                this.label.removeClass(g.mobile.focusClass)
            },
            _handleInputVClick: function() {
                this.element.prop("checked", this.element.is(":checked")), this._getInputSet().not(this.element).prop("checked", !1), this._updateAll(!0)
            },
            _handleLabelVMouseOver: function(b) {
                this.label.parent().hasClass("ui-state-disabled") && b.stopPropagation()
            },
            _handleLabelVClick: function(c) {
                var j = this.element;
                return j.is(":disabled") ? void c.preventDefault() : (this._cacheVals(), j.prop("checked", "radio" === this.inputtype && !0 || !j.prop("checked")), j.triggerHandler("click"), this._getInputSet().not(j).prop("checked", !1), this._updateAll(), !1)
            },
            _cacheVals: function() {
                this._getInputSet().each(function() {
                    g(this).attr("data-" + g.mobile.ns + "cacheVal", this.checked)
                })
            },
            _getInputSet: function() {
                var a, c, j = this.element[0],
                    k = j.name,
                    l = j.form,
                    m = this.element.parents().last().get(0),
                    n = this.element;
                return k && "radio" === this.inputtype && m && (a = "input[type='radio'][name='" + i(k) + "']", l ? (c = l.getAttribute("id"), c && (n = g(a + "[form='" + i(c) + "']", m)), n = g(l).find(a).filter(function() {
                    return this.form === l
                }).add(n)) : n = g(a, m).filter(function() {
                    return !this.form
                })), n
            },
            _updateAll: function(a) {
                var j = this;
                this._getInputSet().each(function() {
                    var b = g(this);
                    !this.checked && "checkbox" !== j.inputtype || a || b.trigger("change")
                }).checkboxradio("refresh")
            },
            _reset: function() {
                this.refresh()
            },
            _hasIcon: function() {
                var a, j, k = g.mobile.controlgroup;
                return k && (a = this.element.closest(":mobile-controlgroup," + k.prototype.initSelector), a.length > 0) ? (j = g.data(a[0], "mobile-controlgroup"), "horizontal" !== (j ? j.options.type : a.attr("data-" + g.mobile.ns + "type"))) : !0
            },
            refresh: function() {
                var a = this.element[0].checked,
                    j = g.mobile.activeBtnClass,
                    k = "ui-btn-icon-" + this.options.iconpos,
                    l = [],
                    m = [];
                this._hasIcon() ? (m.push(j), l.push(k)) : (m.push(k), (a ? l : m).push(j)), a ? (l.push(this.checkedClass), m.push(this.uncheckedClass)) : (l.push(this.uncheckedClass), m.push(this.checkedClass)), this.widget().toggleClass("ui-state-disabled", this.element.prop("disabled")), this.label.addClass(l.join(" ")).removeClass(m.join(" "))
            },
            widget: function() {
                return this.label.parent()
            },
            _setOptions: function(b) {
                var j = this.label,
                    k = this.options,
                    l = this.widget(),
                    m = this._hasIcon();
                b.disabled !== h && (this.input.prop("disabled", !!b.disabled), l.toggleClass("ui-state-disabled", !!b.disabled)), b.mini !== h && l.toggleClass("ui-mini", !!b.mini), b.theme !== h && j.removeClass("ui-btn-" + k.theme).addClass("ui-btn-" + b.theme), b.wrapperClass !== h && l.removeClass(k.wrapperClass).addClass(b.wrapperClass), b.iconpos !== h && m ? j.removeClass("ui-btn-icon-" + k.iconpos).addClass("ui-btn-icon-" + b.iconpos) : m || j.removeClass("ui-btn-icon-" + k.iconpos), this._super(b)
            }
        }, g.mobile.behaviors.formReset))
    }(d),
    function(c, g) {
        c.widget("mobile.button", {
            initSelector: "input[type='button'], input[type='submit'], input[type='reset']",
            options: {
                theme: null,
                icon: null,
                iconpos: "left",
                iconshadow: !1,
                corners: !0,
                shadow: !0,
                inline: null,
                mini: null,
                wrapperClass: null,
                enhanced: !1
            },
            _create: function() {
                this.element.is(":disabled") && (this.options.disabled = !0), this.options.enhanced || this._enhance(), c.extend(this, {
                    wrapper: this.element.parent()
                }), this._on({
                    focus: function() {
                        this.widget().addClass(c.mobile.focusClass)
                    },
                    blur: function() {
                        this.widget().removeClass(c.mobile.focusClass)
                    }
                }), this.refresh(!0)
            },
            _enhance: function() {
                this.element.wrap(this._button())
            },
            _button: function() {
                var a = this.options,
                    h = this._getIconClasses(this.options);
                return c("<div class='ui-btn ui-input-btn" + (a.wrapperClass ? " " + a.wrapperClass : "") + (a.theme ? " ui-btn-" + a.theme : "") + (a.corners ? " ui-corner-all" : "") + (a.shadow ? " ui-shadow" : "") + (a.inline ? " ui-btn-inline" : "") + (a.mini ? " ui-mini" : "") + (a.disabled ? " ui-state-disabled" : "") + (h ? " " + h : "") + "' >" + this.element.val() + "</div>")
            },
            widget: function() {
                return this.wrapper
            },
            _destroy: function() {
                this.element.insertBefore(this.wrapper), this.wrapper.remove()
            },
            _getIconClasses: function(b) {
                return b.icon ? "ui-icon-" + b.icon + (b.iconshadow ? " ui-shadow-icon" : "") + " ui-btn-icon-" + b.iconpos : ""
            },
            _setOptions: function(a) {
                var b = this.widget();
                a.theme !== g && b.removeClass(this.options.theme).addClass("ui-btn-" + a.theme), a.corners !== g && b.toggleClass("ui-corner-all", a.corners), a.shadow !== g && b.toggleClass("ui-shadow", a.shadow), a.inline !== g && b.toggleClass("ui-btn-inline", a.inline), a.mini !== g && b.toggleClass("ui-mini", a.mini), a.disabled !== g && (this.element.prop("disabled", a.disabled), b.toggleClass("ui-state-disabled", a.disabled)), (a.icon !== g || a.iconshadow !== g || a.iconpos !== g) && b.removeClass(this._getIconClasses(this.options)).addClass(this._getIconClasses(c.extend({}, this.options, a))), this._super(a)
            },
            refresh: function(a) {
                var h, i = this.element.prop("disabled");
                this.options.icon && "notext" === this.options.iconpos && this.element.attr("title") && this.element.attr("title", this.element.val()), a || (h = this.element.detach(), c(this.wrapper).text(this.element.val()).append(h)), this.options.disabled !== i && this._setOptions({
                    disabled: i
                })
            }
        })
    }(d),
    function(g) {
        var h = g("meta[name=viewport]"),
            i = h.attr("content"),
            j = i + ",maximum-scale=1, user-scalable=no",
            k = i + ",maximum-scale=10, user-scalable=yes",
            l = /(user-scalable[\s]*=[\s]*no)|(maximum-scale[\s]*=[\s]*1)[$,\s]/.test(i);
        g.mobile.zoom = g.extend({}, {
            enabled: !l,
            locked: !1,
            disable: function(a) {
                l || g.mobile.zoom.locked || (h.attr("content", j), g.mobile.zoom.enabled = !1, g.mobile.zoom.locked = a || !1)
            },
            enable: function(a) {
                l || g.mobile.zoom.locked && a !== !0 || (h.attr("content", k), g.mobile.zoom.enabled = !0, g.mobile.zoom.locked = !1)
            },
            restore: function() {
                l || (h.attr("content", i), g.mobile.zoom.enabled = !0)
            }
        })
    }(d),
    function(c, g) {
        c.widget("mobile.textinput", {
            initSelector: "input[type='text'],input[type='search'],:jqmData(type='search'),input[type='number'],:jqmData(type='number'),input[type='password'],input[type='email'],input[type='url'],input[type='tel'],textarea,input[type='time'],input[type='date'],input[type='month'],input[type='week'],input[type='datetime'],input[type='datetime-local'],input[type='color'],input:not([type]),input[type='file']",
            options: {
                theme: null,
                corners: !0,
                mini: !1,
                preventFocusZoom: /iPhone|iPad|iPod/.test(navigator.platform) && navigator.userAgent.indexOf("AppleWebKit") > -1,
                wrapperClass: "",
                enhanced: !1
            },
            _create: function() {
                var a = this.options,
                    h = this.element.is("[type='search'], :jqmData(type='search')"),
                    i = "TEXTAREA" === this.element[0].tagName,
                    j = this.element.is("[data-" + (c.mobile.ns || "") + "type='range']"),
                    k = (this.element.is("input") || this.element.is("[data-" + (c.mobile.ns || "") + "type='search']")) && !j;
                this.element.prop("disabled") && (a.disabled = !0), c.extend(this, {
                    classes: this._classesFromOptions(),
                    isSearch: h,
                    isTextarea: i,
                    isRange: j,
                    inputNeedsWrap: k
                }), this._autoCorrect(), a.enhanced || this._enhance(), this._on({
                    focus: "_handleFocus",
                    blur: "_handleBlur"
                })
            },
            refresh: function() {
                this.setOptions({
                    disabled: this.element.is(":disabled")
                })
            },
            _enhance: function() {
                var b = [];
                this.isTextarea && b.push("ui-input-text"), (this.isTextarea || this.isRange) && b.push("ui-shadow-inset"), this.inputNeedsWrap ? this.element.wrap(this._wrap()) : b = b.concat(this.classes), this.element.addClass(b.join(" "))
            },
            widget: function() {
                return this.inputNeedsWrap ? this.element.parent() : this.element
            },
            _classesFromOptions: function() {
                var h = this.options,
                    i = [];
                return i.push("ui-body-" + (null === h.theme ? "inherit" : h.theme)), h.corners && i.push("ui-corner-all"), h.mini && i.push("ui-mini"), h.disabled && i.push("ui-state-disabled"), h.wrapperClass && i.push(h.wrapperClass), i
            },
            _wrap: function() {
                return c("<div class='" + (this.isSearch ? "ui-input-search " : "ui-input-text ") + this.classes.join(" ") + " ui-shadow-inset'></div>")
            },
            _autoCorrect: function() {
                "undefined" == typeof this.element[0].autocorrect || c.support.touchOverflow || (this.element[0].setAttribute("autocorrect", "off"), this.element[0].setAttribute("autocomplete", "off"))
            },
            _handleBlur: function() {
                this.widget().removeClass(c.mobile.focusClass), this.options.preventFocusZoom && c.mobile.zoom.enable(!0)
            },
            _handleFocus: function() {
                this.options.preventFocusZoom && c.mobile.zoom.disable(!0), this.widget().addClass(c.mobile.focusClass)
            },
            _setOptions: function(b) {
                var h = this.widget();
                this._super(b), (b.disabled !== g || b.mini !== g || b.corners !== g || b.theme !== g || b.wrapperClass !== g) && (h.removeClass(this.classes.join(" ")), this.classes = this._classesFromOptions(), h.addClass(this.classes.join(" "))), b.disabled !== g && this.element.prop("disabled", !!b.disabled)
            },
            _destroy: function() {
                this.options.enhanced || (this.inputNeedsWrap && this.element.unwrap(), this.element.removeClass("ui-input-text " + this.classes.join(" ")))
            }
        })
    }(d),
    function(b, c) {
        b.widget("mobile.slider", b.extend({
            initSelector: "input[type='range'], :jqmData(type='range'), :jqmData(role='slider')",
            widgetEventPrefix: "slide",
            options: {
                theme: null,
                trackTheme: null,
                corners: !0,
                mini: !1,
                highlight: !1
            },
            _create: function() {
                var M, O, Q, S, U, W, X, Y, Z, aa, ab = this,
                    ac = this.element,
                    ad = this.options.trackTheme || b.mobile.getAttribute(ac[0], "theme"),
                    ae = ad ? " ui-bar-" + ad : " ui-bar-inherit",
                    af = this.options.corners || ac.jqmData("corners") ? " ui-corner-all" : "",
                    ag = this.options.mini || ac.jqmData("mini") ? " ui-mini" : "",
                    ah = ac[0].nodeName.toLowerCase(),
                    ai = "select" === ah,
                    aj = ac.parent().is(":jqmData(role='rangeslider')"),
                    ak = ai ? "ui-slider-switch" : "",
                    al = ac.attr("id"),
                    am = b("[for='" + al + "']"),
                    a = am.attr("id") || al + "-label",
                    J = ai ? 0 : parseFloat(ac.attr("min")),
                    K = ai ? ac.find("option").length - 1 : parseFloat(ac.attr("max")),
                    L = e.parseFloat(ac.attr("step") || 1),
                    N = f.createElement("a"),
                    P = b(N),
                    R = f.createElement("div"),
                    T = b(R),
                    V = this.options.highlight && !ai ? function() {
                        var g = f.createElement("div");
                        return g.className = "ui-slider-bg " + b.mobile.activeBtnClass, b(g).prependTo(T)
                    }() : !1;
                if (am.attr("id", a), this.isToggleSwitch = ai, N.setAttribute("href", "#"), R.setAttribute("role", "application"), R.className = [this.isToggleSwitch ? "ui-slider ui-slider-track ui-shadow-inset " : "ui-slider-track ui-shadow-inset ", ak, ae, af, ag].join(""), N.className = "ui-slider-handle", R.appendChild(N), P.attr({
                        role: "slider",
                        "aria-valuemin": J,
                        "aria-valuemax": K,
                        "aria-valuenow": this._value(),
                        "aria-valuetext": this._value(),
                        title: this._value(),
                        "aria-labelledby": a
                    }), b.extend(this, {
                        slider: T,
                        handle: P,
                        control: ac,
                        type: ah,
                        step: L,
                        max: K,
                        min: J,
                        valuebg: V,
                        isRangeslider: aj,
                        dragging: !1,
                        beforeStart: null,
                        userModified: !1,
                        mouseMoved: !1
                    }), ai) {
                    for (X = ac.attr("tabindex"), X && P.attr("tabindex", X), ac.attr("tabindex", "-1").focus(function() {
                            b(this).blur(), P.focus()
                        }), O = f.createElement("div"), O.className = "ui-slider-inneroffset", Q = 0, S = R.childNodes.length; S > Q; Q++) {
                        O.appendChild(R.childNodes[Q])
                    }
                    for (R.appendChild(O), P.addClass("ui-slider-handle-snapping"), M = ac.find("option"), U = 0, W = M.length; W > U; U++) {
                        Y = U ? "a" : "b", Z = U ? " " + b.mobile.activeBtnClass : "", aa = f.createElement("span"), aa.className = ["ui-slider-label ui-slider-label-", Y, Z].join(""), aa.setAttribute("role", "img"), aa.appendChild(f.createTextNode(M[U].innerHTML)), b(aa).prependTo(T)
                    }
                    ab._labels = b(".ui-slider-label", T)
                }
                ac.addClass(ai ? "ui-slider-switch" : "ui-slider-input"), this._on(ac, {
                    change: "_controlChange",
                    keyup: "_controlKeyup",
                    blur: "_controlBlur",
                    vmouseup: "_controlVMouseUp"
                }), T.bind("vmousedown", b.proxy(this._sliderVMouseDown, this)).bind("vclick", !1), this._on(f, {
                    vmousemove: "_preventDocumentDrag"
                }), this._on(T.add(f), {
                    vmouseup: "_sliderVMouseUp"
                }), T.insertAfter(ac), ai || aj || (O = this.options.mini ? "<div class='ui-slider ui-mini'>" : "<div class='ui-slider'>", ac.add(T).wrapAll(O)), this._on(this.handle, {
                    vmousedown: "_handleVMouseDown",
                    keydown: "_handleKeydown",
                    keyup: "_handleKeyup"
                }), this.handle.bind("vclick", !1), this._handleFormReset(), this.refresh(c, c, !0)
            },
            _setOptions: function(g) {
                g.theme !== c && this._setTheme(g.theme), g.trackTheme !== c && this._setTrackTheme(g.trackTheme), g.corners !== c && this._setCorners(g.corners), g.mini !== c && this._setMini(g.mini), g.highlight !== c && this._setHighlight(g.highlight), g.disabled !== c && this._setDisabled(g.disabled), this._super(g)
            },
            _controlChange: function(g) {
                return this._trigger("controlchange", g) === !1 ? !1 : void(this.mouseMoved || this.refresh(this._value(), !0))
            },
            _controlKeyup: function() {
                this.refresh(this._value(), !0, !0)
            },
            _controlBlur: function() {
                this.refresh(this._value(), !0)
            },
            _controlVMouseUp: function() {
                this._checkedRefresh()
            },
            _handleVMouseDown: function() {
                this.handle.focus()
            },
            _handleKeydown: function(a) {
                var g = this._value();
                if (!this.options.disabled) {
                    switch (a.keyCode) {
                        case b.mobile.keyCode.HOME:
                        case b.mobile.keyCode.END:
                        case b.mobile.keyCode.PAGE_UP:
                        case b.mobile.keyCode.PAGE_DOWN:
                        case b.mobile.keyCode.UP:
                        case b.mobile.keyCode.RIGHT:
                        case b.mobile.keyCode.DOWN:
                        case b.mobile.keyCode.LEFT:
                            a.preventDefault(), this._keySliding || (this._keySliding = !0, this.handle.addClass("ui-state-active"))
                    }
                    switch (a.keyCode) {
                        case b.mobile.keyCode.HOME:
                            this.refresh(this.min);
                            break;
                        case b.mobile.keyCode.END:
                            this.refresh(this.max);
                            break;
                        case b.mobile.keyCode.PAGE_UP:
                        case b.mobile.keyCode.UP:
                        case b.mobile.keyCode.RIGHT:
                            this.refresh(g + this.step);
                            break;
                        case b.mobile.keyCode.PAGE_DOWN:
                        case b.mobile.keyCode.DOWN:
                        case b.mobile.keyCode.LEFT:
                            this.refresh(g - this.step)
                    }
                }
            },
            _handleKeyup: function() {
                this._keySliding && (this._keySliding = !1, this.handle.removeClass("ui-state-active"))
            },
            _sliderVMouseDown: function(g) {
                return this.options.disabled || 1 !== g.which && 0 !== g.which && g.which !== c ? !1 : this._trigger("beforestart", g) === !1 ? !1 : (this.dragging = !0, this.userModified = !1, this.mouseMoved = !1, this.isToggleSwitch && (this.beforeStart = this.element[0].selectedIndex), this.refresh(g), this._trigger("start"), !1)
            },
            _sliderVMouseUp: function() {
                return this.dragging ? (this.dragging = !1, this.isToggleSwitch && (this.handle.addClass("ui-slider-handle-snapping"), this.refresh(this.mouseMoved ? this.userModified ? 0 === this.beforeStart ? 1 : 0 : this.beforeStart : 0 === this.beforeStart ? 1 : 0)), this.mouseMoved = !1, this._trigger("stop"), !1) : void 0
            },
            _preventDocumentDrag: function(g) {
                return this._trigger("drag", g) === !1 ? !1 : this.dragging && !this.options.disabled ? (this.mouseMoved = !0, this.isToggleSwitch && this.handle.removeClass("ui-slider-handle-snapping"), this.refresh(g), this.userModified = this.beforeStart !== this.element[0].selectedIndex, !1) : void 0
            },
            _checkedRefresh: function() {
                this.value !== this._value() && this.refresh(this._value())
            },
            _value: function() {
                return this.isToggleSwitch ? this.element[0].selectedIndex : parseFloat(this.element.val())
            },
            _reset: function() {
                this.refresh(c, !1, !0)
            },
            refresh: function(H, K, M) {
                var O, Q, S, T, U, V, W, X, Y, Z, aa, ab, ac, ad, ae, af, ag, ah, ai, aj, ak = this,
                    a = b.mobile.getAttribute(this.element[0], "theme"),
                    I = this.options.theme || a,
                    J = I ? " ui-btn-" + I : "",
                    L = this.options.trackTheme || a,
                    N = L ? " ui-bar-" + L : " ui-bar-inherit",
                    P = this.options.corners ? " ui-corner-all" : "",
                    R = this.options.mini ? " ui-mini" : "";
                if (ak.slider[0].className = [this.isToggleSwitch ? "ui-slider ui-slider-switch ui-slider-track ui-shadow-inset" : "ui-slider-track ui-shadow-inset", N, P, R].join(""), (this.options.disabled || this.element.prop("disabled")) && this.disable(), this.value = this._value(), this.options.highlight && !this.isToggleSwitch && 0 === this.slider.find(".ui-slider-bg").length && (this.valuebg = function() {
                        var g = f.createElement("div");
                        return g.className = "ui-slider-bg " + b.mobile.activeBtnClass, b(g).prependTo(ak.slider)
                    }()), this.handle.addClass("ui-btn" + J + " ui-shadow"), W = this.element, X = !this.isToggleSwitch, Y = X ? [] : W.find("option"), Z = X ? parseFloat(W.attr("min")) : 0, aa = X ? parseFloat(W.attr("max")) : Y.length - 1, ab = X && parseFloat(W.attr("step")) > 0 ? parseFloat(W.attr("step")) : 1, "object" == typeof H) {
                    if (S = H, T = 8, O = this.slider.offset().left, Q = this.slider.width(), U = Q / ((aa - Z) / ab), !this.dragging || S.pageX < O - T || S.pageX > O + Q + T) {
                        return
                    }
                    V = U > 1 ? (S.pageX - O) / Q * 100 : Math.round((S.pageX - O) / Q * 100)
                } else {
                    null == H && (H = X ? parseFloat(W.val() || 0) : W[0].selectedIndex), V = (parseFloat(H) - Z) / (aa - Z) * 100
                }
                if (!isNaN(V) && (ac = V / 100 * (aa - Z) + Z, ad = (ac - Z) % ab, ae = ac - ad, 2 * Math.abs(ad) >= ab && (ae += ad > 0 ? ab : -ab), af = 100 / ((aa - Z) / ab), ac = parseFloat(ae.toFixed(5)), "undefined" == typeof U && (U = Q / ((aa - Z) / ab)), U > 1 && X && (V = (ac - Z) * af * (1 / ab)), 0 > V && (V = 0), V > 100 && (V = 100), Z > ac && (ac = Z), ac > aa && (ac = aa), this.handle.css("left", V + "%"), this.handle[0].setAttribute("aria-valuenow", X ? ac : Y.eq(ac).attr("value")), this.handle[0].setAttribute("aria-valuetext", X ? ac : Y.eq(ac).getEncodedText()), this.handle[0].setAttribute("title", X ? ac : Y.eq(ac).getEncodedText()), this.valuebg && this.valuebg.css("width", V + "%"), this._labels && (ag = this.handle.width() / this.slider.width() * 100, ah = V && ag + (100 - ag) * V / 100, ai = 100 === V ? 0 : Math.min(ag + 100 - ah, 100), this._labels.each(function() {
                        var g = b(this).hasClass("ui-slider-label-a");
                        b(this).width((g ? ah : ai) + "%")
                    })), !M)) {
                    if (aj = !1, X ? (aj = parseFloat(W.val()) !== ac, W.val(ac)) : (aj = W[0].selectedIndex !== ac, W[0].selectedIndex = ac), this._trigger("beforechange", H) === !1) {
                        return !1
                    }!K && aj && W.trigger("change")
                }
            },
            _setHighlight: function(g) {
                g = !!g, g ? (this.options.highlight = !!g, this.refresh()) : this.valuebg && (this.valuebg.remove(), this.valuebg = !1)
            },
            _setTheme: function(g) {
                this.handle.removeClass("ui-btn-" + this.options.theme).addClass("ui-btn-" + g);
                var h = this.options.theme ? this.options.theme : "inherit",
                    i = g ? g : "inherit";
                this.control.removeClass("ui-body-" + h).addClass("ui-body-" + i)
            },
            _setTrackTheme: function(g) {
                var h = this.options.trackTheme ? this.options.trackTheme : "inherit",
                    i = g ? g : "inherit";
                this.slider.removeClass("ui-body-" + h).addClass("ui-body-" + i)
            },
            _setMini: function(g) {
                g = !!g, this.isToggleSwitch || this.isRangeslider || (this.slider.parent().toggleClass("ui-mini", g), this.element.toggleClass("ui-mini", g)), this.slider.toggleClass("ui-mini", g)
            },
            _setCorners: function(g) {
                this.slider.toggleClass("ui-corner-all", g), this.isToggleSwitch || this.control.toggleClass("ui-corner-all", g)
            },
            _setDisabled: function(g) {
                g = !!g, this.element.prop("disabled", g), this.slider.toggleClass("ui-state-disabled", g).attr("aria-disabled", g), this.element.toggleClass("ui-state-disabled", g)
            }
        }, b.mobile.behaviors.formReset))
    }(d),
    function(g) {
        function h() {
            return i || (i = g("<div></div>", {
                "class": "ui-slider-popup ui-shadow ui-corner-all"
            })), i.clone()
        }
        var i;
        g.widget("mobile.slider", g.mobile.slider, {
            options: {
                popupEnabled: !1,
                showValue: !1
            },
            _create: function() {
                this._super(), g.extend(this, {
                    _currentValue: null,
                    _popup: null,
                    _popupVisible: !1
                }), this._setOption("popupEnabled", this.options.popupEnabled), this._on(this.handle, {
                    vmousedown: "_showPopup"
                }), this._on(this.slider.add(this.document), {
                    vmouseup: "_hidePopup"
                }), this._refresh()
            },
            _positionPopup: function() {
                var b = this.handle.offset();
                this._popup.offset({
                    left: b.left + (this.handle.width() - this._popup.width()) / 2,
                    top: b.top - this._popup.outerHeight() - 5
                })
            },
            _setOption: function(b, j) {
                this._super(b, j), "showValue" === b ? this.handle.html(j && !this.options.mini ? this._value() : "") : "popupEnabled" === b && j && !this._popup && (this._popup = h().addClass("ui-body-" + (this.options.theme || "a")).hide().insertBefore(this.element))
            },
            refresh: function() {
                this._super.apply(this, arguments), this._refresh()
            },
            _refresh: function() {
                var c, j = this.options;
                j.popupEnabled && this.handle.removeAttr("title"), c = this._value(), c !== this._currentValue && (this._currentValue = c, j.popupEnabled && this._popup && (this._positionPopup(), this._popup.html(c)), j.showValue && !this.options.mini && this.handle.html(c))
            },
            _showPopup: function() {
                this.options.popupEnabled && !this._popupVisible && (this.handle.html(""), this._popup.show(), this._positionPopup(), this._popupVisible = !0)
            },
            _hidePopup: function() {
                var b = this.options;
                b.popupEnabled && this._popupVisible && (b.showValue && !b.mini && this.handle.html(this._value()), this._popup.hide(), this._popupVisible = !1)
            }
        })
    }(d),
    function(c, g) {
        c.widget("mobile.flipswitch", c.extend({
            options: {
                onText: "On",
                offText: "Off",
                theme: null,
                enhanced: !1,
                wrapperClass: null,
                corners: !0,
                mini: !1
            },
            _create: function() {
                this.options.enhanced ? c.extend(this, {
                    flipswitch: this.element.parent(),
                    on: this.element.find(".ui-flipswitch-on").eq(0),
                    off: this.element.find(".ui-flipswitch-off").eq(0),
                    type: this.element.get(0).tagName
                }) : this._enhance(), this._handleFormReset(), this._originalTabIndex = this.element.attr("tabindex"), null != this._originalTabIndex && this.on.attr("tabindex", this._originalTabIndex), this.element.attr("tabindex", "-1"), this._on({
                    focus: "_handleInputFocus"
                }), this.element.is(":disabled") && this._setOptions({
                    disabled: !0
                }), this._on(this.flipswitch, {
                    click: "_toggle",
                    swipeleft: "_left",
                    swiperight: "_right"
                }), this._on(this.on, {
                    keydown: "_keydown"
                }), this._on({
                    change: "refresh"
                })
            },
            _handleInputFocus: function() {
                this.on.focus()
            },
            widget: function() {
                return this.flipswitch
            },
            _left: function() {
                this.flipswitch.removeClass("ui-flipswitch-active"), "SELECT" === this.type ? this.element.get(0).selectedIndex = 0 : this.element.prop("checked", !1), this.element.trigger("change")
            },
            _right: function() {
                this.flipswitch.addClass("ui-flipswitch-active"), "SELECT" === this.type ? this.element.get(0).selectedIndex = 1 : this.element.prop("checked", !0), this.element.trigger("change")
            },
            _enhance: function() {
                var a = c("<div>"),
                    k = this.options,
                    l = this.element,
                    m = k.theme ? k.theme : "inherit",
                    n = c("<a></a>", {
                        href: "#"
                    }),
                    o = c("<span></span>"),
                    p = l.get(0).tagName,
                    q = "INPUT" === p ? k.onText : l.find("option").eq(1).text(),
                    r = "INPUT" === p ? k.offText : l.find("option").eq(0).text();
                n.addClass("ui-flipswitch-on ui-btn ui-shadow ui-btn-inherit").text(q), o.addClass("ui-flipswitch-off").text(r), a.addClass("ui-flipswitch ui-shadow-inset ui-bar-" + m + " " + (k.wrapperClass ? k.wrapperClass : "") + " " + (l.is(":checked") || l.find("option").eq(1).is(":selected") ? "ui-flipswitch-active" : "") + (l.is(":disabled") ? " ui-state-disabled" : "") + (k.corners ? " ui-corner-all" : "") + (k.mini ? " ui-mini" : "")).append(n, o), l.addClass("ui-flipswitch-input").after(a).appendTo(a), c.extend(this, {
                    flipswitch: a,
                    on: n,
                    off: o,
                    type: p
                })
            },
            _reset: function() {
                this.refresh()
            },
            refresh: function() {
                var h, i = this.flipswitch.hasClass("ui-flipswitch-active") ? "_right" : "_left";
                h = "SELECT" === this.type ? this.element.get(0).selectedIndex > 0 ? "_right" : "_left" : this.element.prop("checked") ? "_right" : "_left", h !== i && this[h]()
            },
            _toggle: function() {
                var b = this.flipswitch.hasClass("ui-flipswitch-active") ? "_left" : "_right";
                this[b]()
            },
            _keydown: function(a) {
                a.which === c.mobile.keyCode.LEFT ? this._left() : a.which === c.mobile.keyCode.RIGHT ? this._right() : a.which === c.mobile.keyCode.SPACE && (this._toggle(), a.preventDefault())
            },
            _setOptions: function(b) {
                if (b.theme !== g) {
                    var h = b.theme ? b.theme : "inherit",
                        i = b.theme ? b.theme : "inherit";
                    this.widget().removeClass("ui-bar-" + h).addClass("ui-bar-" + i)
                }
                b.onText !== g && this.on.text(b.onText), b.offText !== g && this.off.text(b.offText), b.disabled !== g && this.widget().toggleClass("ui-state-disabled", b.disabled), b.mini !== g && this.widget().toggleClass("ui-mini", b.mini), b.corners !== g && this.widget().toggleClass("ui-corner-all", b.corners), this._super(b)
            },
            _destroy: function() {
                this.options.enhanced || (null != this._originalTabIndex ? this.element.attr("tabindex", this._originalTabIndex) : this.element.removeAttr("tabindex"), this.on.remove(), this.off.remove(), this.element.unwrap(), this.flipswitch.remove(), this.removeClass("ui-flipswitch-input"))
            }
        }, c.mobile.behaviors.formReset))
    }(d),
    function(c, g) {
        c.widget("mobile.rangeslider", c.extend({
            options: {
                theme: null,
                trackTheme: null,
                corners: !0,
                mini: !1,
                highlight: !0
            },
            _create: function() {
                var a = this.element,
                    m = this.options.mini ? "ui-rangeslider ui-mini" : "ui-rangeslider",
                    n = a.find("input").first(),
                    o = a.find("input").last(),
                    p = a.find("label").first(),
                    q = c.data(n.get(0), "mobile-slider") || c.data(n.slider().get(0), "mobile-slider"),
                    r = c.data(o.get(0), "mobile-slider") || c.data(o.slider().get(0), "mobile-slider"),
                    s = q.slider,
                    t = r.slider,
                    u = q.handle,
                    v = c("<div class='ui-rangeslider-sliders' />").appendTo(a);
                n.addClass("ui-rangeslider-first"), o.addClass("ui-rangeslider-last"), a.addClass(m), s.appendTo(v), t.appendTo(v), p.insertBefore(a), u.prependTo(t), c.extend(this, {
                    _inputFirst: n,
                    _inputLast: o,
                    _sliderFirst: s,
                    _sliderLast: t,
                    _label: p,
                    _targetVal: null,
                    _sliderTarget: !1,
                    _sliders: v,
                    _proxy: !1
                }), this.refresh(), this._on(this.element.find("input.ui-slider-input"), {
                    slidebeforestart: "_slidebeforestart",
                    slidestop: "_slidestop",
                    slidedrag: "_slidedrag",
                    slidebeforechange: "_change",
                    blur: "_change",
                    keyup: "_change"
                }), this._on({
                    mousedown: "_change"
                }), this._on(this.element.closest("form"), {
                    reset: "_handleReset"
                }), this._on(u, {
                    vmousedown: "_dragFirstHandle"
                })
            },
            _handleReset: function() {
                var b = this;
                setTimeout(function() {
                    b._updateHighlight()
                }, 0)
            },
            _dragFirstHandle: function(a) {
                return c.data(this._inputFirst.get(0), "mobile-slider").dragging = !0, c.data(this._inputFirst.get(0), "mobile-slider").refresh(a), c.data(this._inputFirst.get(0), "mobile-slider")._trigger("start"), !1
            },
            _slidedrag: function(a) {
                var h = c(a.target).is(this._inputFirst),
                    i = h ? this._inputLast : this._inputFirst;
                return this._sliderTarget = !1, "first" === this._proxy && h || "last" === this._proxy && !h ? (c.data(i.get(0), "mobile-slider").dragging = !0, c.data(i.get(0), "mobile-slider").refresh(a), !1) : void 0
            },
            _slidestop: function(a) {
                var h = c(a.target).is(this._inputFirst);
                this._proxy = !1, this.element.find("input").trigger("vmouseup"), this._sliderFirst.css("z-index", h ? 1 : "")
            },
            _slidebeforestart: function(a) {
                this._sliderTarget = !1, c(a.originalEvent.target).hasClass("ui-slider-track") && (this._sliderTarget = !0, this._targetVal = c(a.target).val())
            },
            _setOptions: function(b) {
                b.theme !== g && this._setTheme(b.theme), b.trackTheme !== g && this._setTrackTheme(b.trackTheme), b.mini !== g && this._setMini(b.mini), b.highlight !== g && this._setHighlight(b.highlight), b.disabled !== g && this._setDisabled(b.disabled), this._super(b), this.refresh()
            },
            refresh: function() {
                var h = this.element,
                    i = this.options;
                (this._inputFirst.is(":disabled") || this._inputLast.is(":disabled")) && (this.options.disabled = !0), h.find("input").slider({
                    theme: i.theme,
                    trackTheme: i.trackTheme,
                    disabled: i.disabled,
                    corners: i.corners,
                    mini: i.mini,
                    highlight: i.highlight
                }).slider("refresh"), this._updateHighlight()
            },
            _change: function(a) {
                if ("keyup" === a.type) {
                    return this._updateHighlight(), !1
                }
                var i = this,
                    j = parseFloat(this._inputFirst.val(), 10),
                    k = parseFloat(this._inputLast.val(), 10),
                    l = c(a.target).hasClass("ui-rangeslider-first"),
                    m = l ? this._inputFirst : this._inputLast,
                    n = l ? this._inputLast : this._inputFirst;
                if (this._inputFirst.val() > this._inputLast.val() && "mousedown" === a.type && !c(a.target).hasClass("ui-slider-handle")) {
                    m.blur()
                } else {
                    if ("mousedown" === a.type) {
                        return
                    }
                }
                return j > k && !this._sliderTarget ? (m.val(l ? k : j).slider("refresh"), this._trigger("normalize")) : j > k && (m.val(this._targetVal).slider("refresh"), setTimeout(function() {
                    n.val(l ? j : k).slider("refresh"), c.data(n.get(0), "mobile-slider").handle.focus(), i._sliderFirst.css("z-index", l ? "" : 1), i._trigger("normalize")
                }, 0), this._proxy = l ? "first" : "last"), j === k ? (c.data(m.get(0), "mobile-slider").handle.css("z-index", 1), c.data(n.get(0), "mobile-slider").handle.css("z-index", 0)) : (c.data(n.get(0), "mobile-slider").handle.css("z-index", ""), c.data(m.get(0), "mobile-slider").handle.css("z-index", "")), this._updateHighlight(), j >= k ? !1 : void 0
            },
            _updateHighlight: function() {
                var a = parseInt(c.data(this._inputFirst.get(0), "mobile-slider").handle.get(0).style.left, 10),
                    h = parseInt(c.data(this._inputLast.get(0), "mobile-slider").handle.get(0).style.left, 10),
                    i = h - a;
                this.element.find(".ui-slider-bg").css({
                    "margin-left": a + "%",
                    width: i + "%"
                })
            },
            _setTheme: function(b) {
                this._inputFirst.slider("option", "theme", b), this._inputLast.slider("option", "theme", b)
            },
            _setTrackTheme: function(b) {
                this._inputFirst.slider("option", "trackTheme", b), this._inputLast.slider("option", "trackTheme", b)
            },
            _setMini: function(b) {
                this._inputFirst.slider("option", "mini", b), this._inputLast.slider("option", "mini", b), this.element.toggleClass("ui-mini", !!b)
            },
            _setHighlight: function(b) {
                this._inputFirst.slider("option", "highlight", b), this._inputLast.slider("option", "highlight", b)
            },
            _setDisabled: function(b) {
                this._inputFirst.prop("disabled", b), this._inputLast.prop("disabled", b)
            },
            _destroy: function() {
                this._label.prependTo(this.element), this.element.removeClass("ui-rangeslider ui-mini"), this._inputFirst.after(this._sliderFirst), this._inputLast.after(this._sliderLast), this._sliders.remove(), this.element.find("input").removeClass("ui-rangeslider-first ui-rangeslider-last").slider("destroy")
            }
        }, c.mobile.behaviors.formReset))
    }(d),
    function(c, g) {
        c.widget("mobile.textinput", c.mobile.textinput, {
            options: {
                clearBtn: !1,
                clearBtnText: "Clear text"
            },
            _create: function() {
                this._super(), this.isSearch && (this.options.clearBtn = !0), this.options.clearBtn && this.inputNeedsWrap && this._addClearBtn()
            },
            clearButton: function() {
                return c("<a href='#' tabindex='-1' aria-hidden='true' class='ui-input-clear ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all'></a>").attr("title", this.options.clearBtnText).text(this.options.clearBtnText)
            },
            _clearBtnClick: function(b) {
                this.element.val("").focus().trigger("change"), this._clearBtn.addClass("ui-input-clear-hidden"), b.preventDefault()
            },
            _addClearBtn: function() {
                this.options.enhanced || this._enhanceClear(), c.extend(this, {
                    _clearBtn: this.widget().find("a.ui-input-clear")
                }), this._bindClearEvents(), this._toggleClear()
            },
            _enhanceClear: function() {
                this.clearButton().appendTo(this.widget()), this.widget().addClass("ui-input-has-clear")
            },
            _bindClearEvents: function() {
                this._on(this._clearBtn, {
                    click: "_clearBtnClick"
                }), this._on({
                    keyup: "_toggleClear",
                    change: "_toggleClear",
                    input: "_toggleClear",
                    focus: "_toggleClear",
                    blur: "_toggleClear",
                    cut: "_toggleClear",
                    paste: "_toggleClear"
                })
            },
            _unbindClear: function() {
                this._off(this._clearBtn, "click"), this._off(this.element, "keyup change input focus blur cut paste")
            },
            _setOptions: function(b) {
                this._super(b), b.clearBtn === g || this.element.is("textarea, :jqmData(type='range')") || (b.clearBtn ? this._addClearBtn() : this._destroyClear()), b.clearBtnText !== g && this._clearBtn !== g && this._clearBtn.text(b.clearBtnText).attr("title", b.clearBtnText)
            },
            _toggleClear: function() {
                this._delay("_toggleClearClass", 0)
            },
            _toggleClearClass: function() {
                this._clearBtn.toggleClass("ui-input-clear-hidden", !this.element.val())
            },
            _destroyClear: function() {
                this.widget().removeClass("ui-input-has-clear"), this._unbindClear(), this._clearBtn.remove()
            },
            _destroy: function() {
                this._super(), this.options.clearBtn && this._destroyClear()
            }
        })
    }(d),
    function(c, g) {
        c.widget("mobile.textinput", c.mobile.textinput, {
            options: {
                autogrow: !0,
                keyupTimeoutBuffer: 100
            },
            _create: function() {
                this._super(), this.options.autogrow && this.isTextarea && this._autogrow()
            },
            _autogrow: function() {
                this.element.addClass("ui-textinput-autogrow"), this._on({
                    keyup: "_timeout",
                    change: "_timeout",
                    input: "_timeout",
                    paste: "_timeout"
                }), this._on(!0, this.document, {
                    pageshow: "_handleShow",
                    popupbeforeposition: "_handleShow",
                    updatelayout: "_handleShow",
                    panelopen: "_handleShow"
                })
            },
            _handleShow: function(a) {
                c.contains(a.target, this.element[0]) && this.element.is(":visible") && ("popupbeforeposition" !== a.type && this.element.addClass("ui-textinput-autogrow-resize").animationComplete(c.proxy(function() {
                    this.element.removeClass("ui-textinput-autogrow-resize")
                }, this), "transition"), this._prepareHeightUpdate())
            },
            _unbindAutogrow: function() {
                this.element.removeClass("ui-textinput-autogrow"), this._off(this.element, "keyup change input paste"), this._off(this.document, "pageshow popupbeforeposition updatelayout panelopen")
            },
            keyupTimeout: null,
            _prepareHeightUpdate: function(b) {
                this.keyupTimeout && clearTimeout(this.keyupTimeout), b === g ? this._updateHeight() : this.keyupTimeout = this._delay("_updateHeight", b)
            },
            _timeout: function() {
                this._prepareHeightUpdate(this.options.keyupTimeoutBuffer)
            },
            _updateHeight: function() {
                var k, l, m, n, o, p, q, r, s, t = this.window.scrollTop();
                this.keyupTimeout = 0, "onpage" in this.element[0] || this.element.css({
                    height: 0,
                    "min-height": 0,
                    "max-height": 0
                }), n = this.element[0].scrollHeight, o = this.element[0].clientHeight, p = parseFloat(this.element.css("border-top-width")), q = parseFloat(this.element.css("border-bottom-width")), r = p + q, s = n + r + 15, 0 === o && (k = parseFloat(this.element.css("padding-top")), l = parseFloat(this.element.css("padding-bottom")), m = k + l, s += m), this.element.css({
                    height: s,
                    "min-height": "",
                    "max-height": ""
                }), this.window.scrollTop(t)
            },
            refresh: function() {
                this.options.autogrow && this.isTextarea && this._updateHeight()
            },
            _setOptions: function(b) {
                this._super(b), b.autogrow !== g && this.isTextarea && (b.autogrow ? this._autogrow() : this._unbindAutogrow())
            }
        })
    }(d),
    function(b) {
        b.widget("mobile.selectmenu", b.extend({
            initSelector: "select:not( :jqmData(role='slider')):not( :jqmData(role='flipswitch') )",
            options: {
                theme: null,
                icon: "carat-d",
                iconpos: "right",
                inline: !1,
                corners: !0,
                shadow: !0,
                iconshadow: !1,
                overlayTheme: null,
                dividerTheme: null,
                hidePlaceholderMenuItems: !0,
                closeText: "Close",
                nativeMenu: !0,
                preventFocusZoom: /iPhone|iPad|iPod/.test(navigator.platform) && navigator.userAgent.indexOf("AppleWebKit") > -1,
                mini: !1
            },
            _button: function() {
                return b("<div/>")
            },
            _setDisabled: function(c) {
                return this.element.attr("disabled", c), this.button.attr("aria-disabled", c), this._setOption("disabled", c)
            },
            _focusButton: function() {
                var c = this;
                setTimeout(function() {
                    c.button.focus()
                }, 40)
            },
            _selectOptions: function() {
                return this.select.find("option")
            },
            _preExtension: function() {
                var a = this.options.inline || this.element.jqmData("inline"),
                    g = this.options.mini || this.element.jqmData("mini"),
                    h = "";
                ~this.element[0].className.indexOf("ui-btn-left") && (h = " ui-btn-left"), ~this.element[0].className.indexOf("ui-btn-right") && (h = " ui-btn-right"), a && (h += " ui-btn-inline"), g && (h += " ui-mini"), this.select = this.element.removeClass("ui-btn-left ui-btn-right").wrap("<div class='ui-select" + h + "'>"), this.selectId = this.select.attr("id") || "select-" + this.uuid, this.buttonId = this.selectId + "-button", this.label = b("label[for='" + this.selectId + "']"), this.isMultiple = this.select[0].multiple
            },
            _destroy: function() {
                var c = this.element.parents(".ui-select");
                c.length > 0 && (c.is(".ui-btn-left, .ui-btn-right") && this.element.addClass(c.hasClass("ui-btn-left") ? "ui-btn-left" : "ui-btn-right"), this.element.insertAfter(c), c.remove())
            },
            _create: function() {
                this._preExtension(), this.button = this._button();
                var a = this,
                    g = this.options,
                    h = g.icon ? g.iconpos || this.select.jqmData("iconpos") : !1,
                    i = this.button.insertBefore(this.select).attr("id", this.buttonId).addClass("ui-btn" + (g.icon ? " ui-icon-" + g.icon + " ui-btn-icon-" + h + (g.iconshadow ? " ui-shadow-icon" : "") : "") + (g.theme ? " ui-btn-" + g.theme : "") + (g.corners ? " ui-corner-all" : "") + (g.shadow ? " ui-shadow" : ""));
                this.setButtonText(), g.nativeMenu && e.opera && e.opera.version && i.addClass("ui-select-nativeonly"), this.isMultiple && (this.buttonCount = b("<span>").addClass("ui-li-count ui-body-inherit").hide().appendTo(i.addClass("ui-li-has-count"))), (g.disabled || this.element.attr("disabled")) && this.disable(), this.select.change(function() {
                    a.refresh(), g.nativeMenu && a._delay(function() {
                        a.select.blur()
                    })
                }), this._handleFormReset(), this._on(this.button, {
                    keydown: "_handleKeydown"
                }), this.build()
            },
            build: function() {
                var a = this;
                this.select.appendTo(a.button).bind("vmousedown", function() {
                    a.button.addClass(b.mobile.activeBtnClass)
                }).bind("focus", function() {
                    a.button.addClass(b.mobile.focusClass)
                }).bind("blur", function() {
                    a.button.removeClass(b.mobile.focusClass)
                }).bind("focus vmouseover", function() {
                    a.button.trigger("vmouseover")
                }).bind("vmousemove", function() {
                    a.button.removeClass(b.mobile.activeBtnClass)
                }).bind("change blur vmouseout", function() {
                    a.button.trigger("vmouseout").removeClass(b.mobile.activeBtnClass)
                }), a.button.bind("vmousedown", function() {
                    a.options.preventFocusZoom && b.mobile.zoom.disable(!0)
                }), a.label.bind("click focus", function() {
                    a.options.preventFocusZoom && b.mobile.zoom.disable(!0)
                }), a.select.bind("focus", function() {
                    a.options.preventFocusZoom && b.mobile.zoom.disable(!0)
                }), a.button.bind("mouseup", function() {
                    a.options.preventFocusZoom && setTimeout(function() {
                        b.mobile.zoom.enable(!0)
                    }, 0)
                }), a.select.bind("blur", function() {
                    a.options.preventFocusZoom && b.mobile.zoom.enable(!0)
                })
            },
            selected: function() {
                return this._selectOptions().filter(":selected")
            },
            selectedIndices: function() {
                var c = this;
                return this.selected().map(function() {
                    return c._selectOptions().index(this)
                }).get()
            },
            setButtonText: function() {
                var a = this,
                    c = this.selected(),
                    g = this.placeholder,
                    h = b(f.createElement("span"));
                this.button.children("span").not(".ui-li-count").remove().end().end().prepend(function() {
                    return g = c.length ? c.map(function() {
                        return b(this).text()
                    }).get().join(", ") : a.placeholder, g ? h.text(g) : h.html("&#160;"), h.addClass(a.select.attr("class")).addClass(c.attr("class")).removeClass("ui-screen-hidden")
                }())
            },
            setButtonCount: function() {
                var c = this.selected();
                this.isMultiple && this.buttonCount[c.length > 1 ? "show" : "hide"]().text(c.length)
            },
            _handleKeydown: function() {
                this._delay("_refreshButton")
            },
            _reset: function() {
                this.refresh()
            },
            _refreshButton: function() {
                this.setButtonText(), this.setButtonCount()
            },
            refresh: function() {
                this._refreshButton()
            },
            open: b.noop,
            close: b.noop,
            disable: function() {
                this._setDisabled(!0), this.button.addClass("ui-state-disabled")
            },
            enable: function() {
                this._setDisabled(!1), this.button.removeClass("ui-state-disabled")
            }
        }, b.mobile.behaviors.formReset))
    }(d),
    function(b) {
        b.mobile.links = function(a) {
            b(a).find("a").jqmEnhanceable().filter(":jqmData(rel='popup')[href][href!='']").each(function() {
                var c = this,
                    g = c.getAttribute("href").substring(1);
                g && (c.setAttribute("aria-haspopup", !0), c.setAttribute("aria-owns", g), c.setAttribute("aria-expanded", !1))
            }).end().not(".ui-btn, :jqmData(role='none'), :jqmData(role='nojs')").addClass("ui-link")
        }
    }(d),
    function(b, g) {
        function h(j, k, l, m) {
            var n = m;
            return n = k > j ? l + (j - k) / 2 : Math.min(Math.max(l, m - k / 2), l + j - k)
        }

        function i(c) {
            return {
                x: c.scrollLeft(),
                y: c.scrollTop(),
                cx: c[0].innerWidth || c.width(),
                cy: c[0].innerHeight || c.height()
            }
        }
        b.widget("mobile.popup", {
            options: {
                wrapperClass: null,
                theme: null,
                overlayTheme: null,
                shadow: !0,
                corners: !0,
                transition: "none",
                positionTo: "origin",
                tolerance: null,
                closeLinkSelector: "a:jqmData(rel='back')",
                closeLinkEvents: "click.popup",
                navigateEvents: "navigate.popup",
                closeEvents: "navigate.popup pagebeforechange.popup",
                dismissible: !0,
                enhanced: !1,
                history: !b.mobile.browser.oldIE
            },
            _handleDocumentVmousedown: function(a) {
                this._isOpen && b.contains(this._ui.container[0], a.target) && this._ignoreResizeEvents()
            },
            _create: function() {
                var a = this.element,
                    j = a.attr("id"),
                    k = this.options;
                k.history = k.history && b.mobile.ajaxEnabled && b.mobile.hashListeningEnabled, this._on(this.document, {
                    vmousedown: "_handleDocumentVmousedown"
                }), b.extend(this, {
                    _scrollTop: 0,
                    _page: a.closest(".ui-page"),
                    _ui: null,
                    _fallbackTransition: "",
                    _currentTransition: !1,
                    _prerequisites: null,
                    _isOpen: !1,
                    _tolerance: null,
                    _resizeData: null,
                    _ignoreResizeTo: 0,
                    _orientationchangeInProgress: !1
                }), 0 === this._page.length && (this._page = b("body")), k.enhanced ? this._ui = {
                    container: a.parent(),
                    screen: a.parent().prev(),
                    placeholder: b(this.document[0].getElementById(j + "-placeholder"))
                } : (this._ui = this._enhance(a, j), this._applyTransition(k.transition)), this._setTolerance(k.tolerance)._ui.focusElement = this._ui.container, this._on(this._ui.screen, {
                    vclick: "_eatEventAndClose"
                }), this._on(this.window, {
                    orientationchange: b.proxy(this, "_handleWindowOrientationchange"),
                    resize: b.proxy(this, "_handleWindowResize"),
                    keyup: b.proxy(this, "_handleWindowKeyUp")
                }), this._on(this.document, {
                    focusin: "_handleDocumentFocusIn"
                })
            },
            _enhance: function(a, j) {
                var k = this.options,
                    l = k.wrapperClass,
                    m = {
                        screen: b("<div class='ui-screen-hidden ui-popup-screen " + this._themeClassFromOption("ui-overlay-", k.overlayTheme) + "'></div>"),
                        placeholder: b("<div style='display: none;'><!-- placeholder --></div>"),
                        container: b("<div class='ui-popup-container ui-popup-hidden ui-popup-truncate" + (l ? " " + l : "") + "'></div>")
                    },
                    n = this.document[0].createDocumentFragment();
                return n.appendChild(m.screen[0]), n.appendChild(m.container[0]), j && (m.screen.attr("id", j + "-screen"), m.container.attr("id", j + "-popup"), m.placeholder.attr("id", j + "-placeholder").html("<!-- placeholder for " + j + " -->")), this._page[0].appendChild(n), m.placeholder.insertAfter(a), a.detach().addClass("ui-popup " + this._themeClassFromOption("ui-body-", k.theme) + " " + (k.shadow ? "ui-overlay-shadow " : "") + (k.corners ? "ui-corner-all " : "")).appendTo(m.container), m
            },
            _eatEventAndClose: function(c) {
                return c.preventDefault(), c.stopImmediatePropagation(), this.options.dismissible && this.close(), !1
            },
            _resizeScreen: function() {
                var j = this._ui.screen,
                    k = this._ui.container.outerHeight(!0),
                    l = j.removeAttr("style").height(),
                    m = this.document.height() - 1;
                m > l ? j.height(m) : k > l && j.height(k)
            },
            _handleWindowKeyUp: function(a) {
                return this._isOpen && a.keyCode === b.mobile.keyCode.ESCAPE ? this._eatEventAndClose(a) : void 0
            },
            _expectResizeEvent: function() {
                var c = i(this.window);
                if (this._resizeData) {
                    if (c.x === this._resizeData.windowCoordinates.x && c.y === this._resizeData.windowCoordinates.y && c.cx === this._resizeData.windowCoordinates.cx && c.cy === this._resizeData.windowCoordinates.cy) {
                        return !1
                    }
                    clearTimeout(this._resizeData.timeoutId)
                }
                return this._resizeData = {
                    timeoutId: this._delay("_resizeTimeout", 200),
                    windowCoordinates: c
                }, !0
            },
            _resizeTimeout: function() {
                this._isOpen ? this._expectResizeEvent() || (this._ui.container.hasClass("ui-popup-hidden") && (this._ui.container.removeClass("ui-popup-hidden ui-popup-truncate"), this.reposition({
                    positionTo: "window"
                }), this._ignoreResizeEvents()), this._resizeScreen(), this._resizeData = null, this._orientationchangeInProgress = !1) : (this._resizeData = null, this._orientationchangeInProgress = !1)
            },
            _stopIgnoringResizeEvents: function() {
                this._ignoreResizeTo = 0
            },
            _ignoreResizeEvents: function() {
                this._ignoreResizeTo && clearTimeout(this._ignoreResizeTo), this._ignoreResizeTo = this._delay("_stopIgnoringResizeEvents", 1000)
            },
            _handleWindowResize: function() {
                this._isOpen && 0 === this._ignoreResizeTo && (!this._expectResizeEvent() && !this._orientationchangeInProgress || this._ui.container.hasClass("ui-popup-hidden") || this._ui.container.addClass("ui-popup-hidden ui-popup-truncate").removeAttr("style"))
            },
            _handleWindowOrientationchange: function() {
                !this._orientationchangeInProgress && this._isOpen && 0 === this._ignoreResizeTo && (this._expectResizeEvent(), this._orientationchangeInProgress = !0)
            },
            _handleDocumentFocusIn: function(a) {
                var j, k = a.target,
                    l = this._ui;
                if (this._isOpen) {
                    if (k !== l.container[0]) {
                        if (j = b(k), !b.contains(l.container[0], k)) {
                            return b(this.document[0].activeElement).one("focus", b.proxy(function() {
                                this._safelyBlur(k)
                            }, this)), l.focusElement.focus(), a.preventDefault(), a.stopImmediatePropagation(), !1
                        }
                        l.focusElement[0] === l.container[0] && (l.focusElement = j)
                    }
                    this._ignoreResizeEvents()
                }
            },
            _themeClassFromOption: function(c, j) {
                return j ? "none" === j ? "" : c + j : c + "inherit"
            },
            _applyTransition: function(a) {
                return a && (this._ui.container.removeClass(this._fallbackTransition), "none" !== a && (this._fallbackTransition = b.mobile._maybeDegradeTransition(a), "none" === this._fallbackTransition && (this._fallbackTransition = ""), this._ui.container.addClass(this._fallbackTransition))), this
            },
            _setOptions: function(c) {
                var j = this.options,
                    k = this.element,
                    l = this._ui.screen;
                return c.wrapperClass !== g && this._ui.container.removeClass(j.wrapperClass).addClass(c.wrapperClass), c.theme !== g && k.removeClass(this._themeClassFromOption("ui-body-", j.theme)).addClass(this._themeClassFromOption("ui-body-", c.theme)), c.overlayTheme !== g && (l.removeClass(this._themeClassFromOption("ui-overlay-", j.overlayTheme)).addClass(this._themeClassFromOption("ui-overlay-", c.overlayTheme)), this._isOpen && l.addClass("in")), c.shadow !== g && k.toggleClass("ui-overlay-shadow", c.shadow), c.corners !== g && k.toggleClass("ui-corner-all", c.corners), c.transition !== g && (this._currentTransition || this._applyTransition(c.transition)), c.tolerance !== g && this._setTolerance(c.tolerance), c.disabled !== g && c.disabled && this.close(), this._super(c)
            },
            _setTolerance: function(a) {
                var c, j = {
                    t: 30,
                    r: 15,
                    b: 30,
                    l: 15
                };
                if (a !== g) {
                    switch (c = String(a).split(","), b.each(c, function(k, l) {
                        c[k] = parseInt(l, 10)
                    }), c.length) {
                        case 1:
                            isNaN(c[0]) || (j.t = j.r = j.b = j.l = c[0]);
                            break;
                        case 2:
                            isNaN(c[0]) || (j.t = j.b = c[0]), isNaN(c[1]) || (j.l = j.r = c[1]);
                            break;
                        case 4:
                            isNaN(c[0]) || (j.t = c[0]), isNaN(c[1]) || (j.r = c[1]), isNaN(c[2]) || (j.b = c[2]), isNaN(c[3]) || (j.l = c[3])
                    }
                }
                return this._tolerance = j, this
            },
            _clampPopupWidth: function(j) {
                var k, l = i(this.window),
                    m = {
                        x: this._tolerance.l,
                        y: l.y + this._tolerance.t,
                        cx: l.cx - this._tolerance.l - this._tolerance.r,
                        cy: l.cy - this._tolerance.t - this._tolerance.b
                    };
                return j || this._ui.container.css("max-width", m.cx), k = {
                    cx: this._ui.container.outerWidth(!0),
                    cy: this._ui.container.outerHeight(!0)
                }, {
                    rc: m,
                    menuSize: k
                }
            },
            _calculateFinalLocation: function(j, k) {
                var l, m = k.rc,
                    n = k.menuSize;
                return l = {
                    left: h(m.cx, n.cx, m.x, j.x),
                    top: h(m.cy, n.cy, m.y, j.y)
                }, l.top = Math.max(0, l.top), l.top -= Math.min(l.top, Math.max(0, l.top + n.cy - this.document.height())), l
            },
            _placementCoords: function(c) {
                return this._calculateFinalLocation(c, this._clampPopupWidth())
            },
            _createPrerequisites: function(a, j, k) {
                var l, m = this;
                l = {
                    screen: b.Deferred(),
                    container: b.Deferred()
                }, l.screen.then(function() {
                    l === m._prerequisites && a()
                }), l.container.then(function() {
                    l === m._prerequisites && j()
                }), b.when(l.screen, l.container).done(function() {
                    l === m._prerequisites && (m._prerequisites = null, k())
                }), m._prerequisites = l
            },
            _animate: function(a) {
                return this._ui.screen.removeClass(a.classToRemove).addClass(a.screenClassToAdd), a.prerequisites.screen.resolve(), a.transition && "none" !== a.transition && (a.applyTransition && this._applyTransition(a.transition), this._fallbackTransition) ? void this._ui.container.addClass(a.containerClassToAdd).removeClass(a.classToRemove).animationComplete(b.proxy(a.prerequisites.container, "resolve")) : (this._ui.container.removeClass(a.classToRemove), void a.prerequisites.container.resolve())
            },
            _desiredCoords: function(a) {
                var k, l = null,
                    m = i(this.window),
                    n = a.x,
                    o = a.y,
                    p = a.positionTo;
                if (p && "origin" !== p) {
                    if ("window" === p) {
                        n = m.cx / 2 + m.x, o = m.cy / 2 + m.y
                    } else {
                        try {
                            l = b(p)
                        } catch (q) {
                            l = null
                        }
                        l && (l.filter(":visible"), 0 === l.length && (l = null))
                    }
                }
                return l && (k = l.offset(), n = k.left + l.outerWidth() / 2, o = k.top + l.outerHeight() / 2), ("number" !== b.type(n) || isNaN(n)) && (n = m.cx / 2 + m.x), ("number" !== b.type(o) || isNaN(o)) && (o = m.cy / 2 + m.y), {
                    x: n,
                    y: o
                }
            },
            _reposition: function(c) {
                c = {
                    x: c.x,
                    y: c.y,
                    positionTo: c.positionTo
                }, this._trigger("beforeposition", g, c), this._ui.container.offset(this._placementCoords(this._desiredCoords(c)))
            },
            reposition: function(c) {
                this._isOpen && this._reposition(c)
            },
            _safelyBlur: function(a) {
                a !== this.window[0] && "body" !== a.nodeName.toLowerCase() && b(a).blur()
            },
            _openPrerequisitesComplete: function() {
                var a = this.element.attr("id"),
                    j = this._ui.container.find(":focusable").first();
                this._ui.container.addClass("ui-popup-active"), this._isOpen = !0, this._resizeScreen(), b.contains(this._ui.container[0], this.document[0].activeElement) || this._safelyBlur(this.document[0].activeElement), j.length > 0 && (this._ui.focusElement = j), this._ignoreResizeEvents(), a && this.document.find("[aria-haspopup='true'][aria-owns='" + a + "']").attr("aria-expanded", !0), this._trigger("afteropen")
            },
            _open: function(a) {
                var j = b.extend({}, this.options, a),
                    k = function() {
                        var l = navigator.userAgent,
                            m = l.match(/AppleWebKit\/([0-9\.]+)/),
                            n = !!m && m[1],
                            o = l.match(/Android (\d+(?:\.\d+))/),
                            p = !!o && o[1],
                            q = l.indexOf("Chrome") > -1;
                        return null !== o && "4.0" === p && n && n > 534.13 && !q ? !0 : !1
                    }();
                this._createPrerequisites(b.noop, b.noop, b.proxy(this, "_openPrerequisitesComplete")), this._currentTransition = j.transition, this._applyTransition(j.transition), this._ui.screen.removeClass("ui-screen-hidden"), this._ui.container.removeClass("ui-popup-truncate"), this._reposition(j), this._ui.container.removeClass("ui-popup-hidden"), this.options.overlayTheme && k && this.element.closest(".ui-page").addClass("ui-popup-open"), this._animate({
                    additionalCondition: !0,
                    transition: j.transition,
                    classToRemove: "",
                    screenClassToAdd: "in",
                    containerClassToAdd: "in",
                    applyTransition: !1,
                    prerequisites: this._prerequisites
                })
            },
            _closePrerequisiteScreen: function() {
                this._ui.screen.removeClass("out").addClass("ui-screen-hidden")
            },
            _closePrerequisiteContainer: function() {
                this._ui.container.removeClass("reverse out").addClass("ui-popup-hidden ui-popup-truncate").removeAttr("style")
            },
            _closePrerequisitesDone: function() {
                var a = this._ui.container,
                    c = this.element.attr("id");
                b.mobile.popup.active = g, b(":focus", a[0]).add(a[0]).blur(), c && this.document.find("[aria-haspopup='true'][aria-owns='" + c + "']").attr("aria-expanded", !1), this._trigger("afterclose")
            },
            _close: function(a) {
                this._ui.container.removeClass("ui-popup-active"), this._page.removeClass("ui-popup-open"), this._isOpen = !1, this._createPrerequisites(b.proxy(this, "_closePrerequisiteScreen"), b.proxy(this, "_closePrerequisiteContainer"), b.proxy(this, "_closePrerequisitesDone")), this._animate({
                    additionalCondition: this._ui.screen.hasClass("in"),
                    transition: a ? "none" : this._currentTransition,
                    classToRemove: "in",
                    screenClassToAdd: "out",
                    containerClassToAdd: "reverse out",
                    applyTransition: !0,
                    prerequisites: this._prerequisites
                })
            },
            _unenhance: function() {
                this.options.enhanced || (this._setOptions({
                    theme: b.mobile.popup.prototype.options.theme
                }), this.element.detach().insertAfter(this._ui.placeholder).removeClass("ui-popup ui-overlay-shadow ui-corner-all ui-body-inherit"), this._ui.screen.remove(), this._ui.container.remove(), this._ui.placeholder.remove())
            },
            _destroy: function() {
                return b.mobile.popup.active === this ? (this.element.one("popupafterclose", b.proxy(this, "_unenhance")), this.close()) : this._unenhance(), this
            },
            _closePopup: function(a, j) {
                var k, l, m = this.options,
                    n = !1;
                a && a.isDefaultPrevented() || b.mobile.popup.active !== this || (e.scrollTo(0, this._scrollTop), a && "pagebeforechange" === a.type && j && (k = "string" == typeof j.toPage ? j.toPage : j.toPage.jqmData("url"), k = b.mobile.path.parseUrl(k), l = k.pathname + k.search + k.hash, this._myUrl !== b.mobile.path.makeUrlAbsolute(l) ? n = !0 : a.preventDefault()), this.window.off(m.closeEvents), this.element.undelegate(m.closeLinkSelector, m.closeLinkEvents), this._close(n))
            },
            _bindContainerClose: function() {
                this.window.on(this.options.closeEvents, b.proxy(this, "_closePopup"))
            },
            widget: function() {
                return this._ui.container
            },
            open: function(a) {
                var k, l, m, n, o, p, q = this,
                    r = this.options;
                return b.mobile.popup.active || r.disabled ? this : (b.mobile.popup.active = this, this._scrollTop = this.window.scrollTop(), r.history ? (p = b.mobile.navigate.history, l = b.mobile.dialogHashKey, m = b.mobile.activePage, n = m ? m.hasClass("ui-dialog") : !1, this._myUrl = k = p.getActive().url, (o = k.indexOf(l) > -1 && !n && p.activeIndex > 0) ? (q._open(a), q._bindContainerClose(), this) : (-1 !== k.indexOf(l) || n ? k = b.mobile.path.parseLocation().hash + l : k += k.indexOf("#") > -1 ? l : "#" + l, this.window.one("beforenavigate", function(c) {
                    c.preventDefault(), q._open(a), q._bindContainerClose()
                }), this.urlAltered = !0, b.mobile.navigate(k, {
                    role: "dialog"
                }), this)) : (q._open(a), q._bindContainerClose(), q.element.delegate(r.closeLinkSelector, r.closeLinkEvents, function(c) {
                    q.close(), c.preventDefault()
                }), this))
            },
            close: function() {
                return b.mobile.popup.active !== this ? this : (this._scrollTop = this.window.scrollTop(), this.options.history && this.urlAltered ? (b.mobile.back(), this.urlAltered = !1) : this._closePopup(), this)
            }
        }), b.mobile.popup.handleLink = function(a) {
            var j, k = b.mobile.path,
                l = b(k.hashToSelector(k.parseUrl(a.attr("href")).hash)).first();
            l.length > 0 && l.data("mobile-popup") && (j = a.offset(), l.popup("open", {
                x: j.left + a.outerWidth() / 2,
                y: j.top + a.outerHeight() / 2,
                transition: a.jqmData("transition"),
                positionTo: a.jqmData("position-to")
            })), setTimeout(function() {
                a.removeClass(b.mobile.activeBtnClass)
            }, 300)
        }, b.mobile.document.on("pagebeforechange", function(a, j) {
            "popup" === j.options.role && (b.mobile.popup.handleLink(j.options.link), a.preventDefault())
        })
    }(d),
    function(c, g) {
        var h = ".ui-disabled,.ui-state-disabled,.ui-li-divider,.ui-screen-hidden,:jqmData(role='placeholder')",
            i = function(j, k, l) {
                var m = j[l + "All"]().not(h).first();
                m.length && (k.blur().attr("tabindex", "-1"), m.find("a").first().focus())
            };
        c.widget("mobile.selectmenu", c.mobile.selectmenu, {
            _create: function() {
                var b = this.options;
                return b.nativeMenu = b.nativeMenu || this.element.parents(":jqmData(role='popup'),:mobile-popup").length > 0, this._super()
            },
            _handleSelectFocus: function() {
                this.element.blur(), this.button.focus()
            },
            _handleKeydown: function(b) {
                this._super(b), this._handleButtonVclickKeydown(b)
            },
            _handleButtonVclickKeydown: function(a) {
                this.options.disabled || this.isOpen || this.options.nativeMenu || ("vclick" === a.type || a.keyCode && (a.keyCode === c.mobile.keyCode.ENTER || a.keyCode === c.mobile.keyCode.SPACE)) && (this._decideFormat(), "overlay" === this.menuType ? this.button.attr("href", "#" + this.popupId).attr("data-" + (c.mobile.ns || "") + "rel", "popup") : this.button.attr("href", "#" + this.dialogId).attr("data-" + (c.mobile.ns || "") + "rel", "dialog"), this.isOpen = !0)
            },
            _handleListFocus: function(a) {
                var j = "focusin" === a.type ? {
                    tabindex: "0",
                    event: "vmouseover"
                } : {
                    tabindex: "-1",
                    event: "vmouseout"
                };
                c(a.target).attr("tabindex", j.tabindex).trigger(j.event)
            },
            _handleListKeydown: function(a) {
                var j = c(a.target),
                    k = j.closest("li");
                switch (a.keyCode) {
                    case 38:
                        return i(k, j, "prev"), !1;
                    case 40:
                        return i(k, j, "next"), !1;
                    case 13:
                    case 32:
                        return j.trigger("click"), !1
                }
            },
            _handleMenuPageHide: function() {
                this._delayedTrigger(), this.thisPage.page("bindRemove")
            },
            _handleHeaderCloseClick: function() {
                return "overlay" === this.menuType ? (this.close(), !1) : void 0
            },
            _handleListItemClick: function(a) {
                var j = c(a.target).closest("li"),
                    k = this.select[0].selectedIndex,
                    l = c.mobile.getAttribute(j, "option-index"),
                    m = this._selectOptions().eq(l)[0];
                m.selected = this.isMultiple ? !m.selected : !0, this.isMultiple && j.find("a").toggleClass("ui-checkbox-on", m.selected).toggleClass("ui-checkbox-off", !m.selected), this.isMultiple || k === l || (this._triggerChange = !0), this.isMultiple ? (this.select.trigger("change"), this.list.find("li:not(.ui-li-divider)").eq(l).find("a").first().focus()) : this.close(), a.preventDefault()
            },
            build: function() {
                var a, b, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = this.options;
                return N.nativeMenu ? this._super() : (a = this.selectId, b = a + "-listbox", w = a + "-dialog", x = this.label, y = this.element.closest(".ui-page"), z = this.element[0].multiple, A = a + "-menu", B = N.theme ? " data-" + c.mobile.ns + "theme='" + N.theme + "'" : "", C = N.overlayTheme || N.theme || null, D = C ? " data-" + c.mobile.ns + "overlay-theme='" + C + "'" : "", E = N.dividerTheme && z ? " data-" + c.mobile.ns + "divider-theme='" + N.dividerTheme + "'" : "", F = c("<div data-" + c.mobile.ns + "role='dialog' class='ui-selectmenu' id='" + w + "'" + B + D + "><div data-" + c.mobile.ns + "role='header'><div class='ui-title'></div></div><div data-" + c.mobile.ns + "role='content'></div></div>"), G = c("<div" + B + D + " id='" + b + "' class='ui-selectmenu'></div>").insertAfter(this.select).popup(), H = c("<ul class='ui-selectmenu-list' id='" + A + "' role='listbox' aria-labelledby='" + this.buttonId + "'" + B + E + "></ul>").appendTo(G), I = c("<div class='ui-header ui-bar-" + (N.theme ? N.theme : "inherit") + "'></div>").prependTo(G), J = c("<h1 class='ui-title'></h1>").appendTo(I), this.isMultiple && (M = c("<a>", {
                    role: "button",
                    text: N.closeText,
                    href: "#",
                    "class": "ui-btn ui-corner-all ui-btn-left ui-btn-icon-notext ui-icon-delete"
                }).appendTo(I)), c.extend(this, {
                    selectId: a,
                    menuId: A,
                    popupId: b,
                    dialogId: w,
                    thisPage: y,
                    menuPage: F,
                    label: x,
                    isMultiple: z,
                    theme: N.theme,
                    listbox: G,
                    list: H,
                    header: I,
                    headerTitle: J,
                    headerClose: M,
                    menuPageContent: K,
                    menuPageClose: L,
                    placeholder: ""
                }), this.refresh(), this._origTabIndex === g && (this._origTabIndex = null === this.select[0].getAttribute("tabindex") ? !1 : this.select.attr("tabindex")), this.select.attr("tabindex", "-1"), this._on(this.select, {
                    focus: "_handleSelectFocus"
                }), this._on(this.button, {
                    vclick: "_handleButtonVclickKeydown"
                }), this.list.attr("role", "listbox"), this._on(this.list, {
                    focusin: "_handleListFocus",
                    focusout: "_handleListFocus",
                    keydown: "_handleListKeydown",
                    "click li:not(.ui-disabled,.ui-state-disabled,.ui-li-divider)": "_handleListItemClick"
                }), this._on(this.menuPage, {
                    pagehide: "_handleMenuPageHide"
                }), this._on(this.listbox, {
                    popupafterclose: "_popupClosed"
                }), this.isMultiple && this._on(this.headerClose, {
                    click: "_handleHeaderCloseClick"
                }), this)
            },
            _popupClosed: function() {
                this.close(), this._delayedTrigger()
            },
            _delayedTrigger: function() {
                this._triggerChange && this.element.trigger("change"), this._triggerChange = !1
            },
            _isRebuildRequired: function() {
                var j = this.list.find("li"),
                    k = this._selectOptions().not(".ui-screen-hidden");
                return k.text() !== j.text()
            },
            selected: function() {
                return this._selectOptions().filter(":selected:not( :jqmData(placeholder='true') )")
            },
            refresh: function(a) {
                var j, k;
                return this.options.nativeMenu ? this._super(a) : (j = this, (a || this._isRebuildRequired()) && j._buildList(), k = this.selectedIndices(), j.setButtonText(), j.setButtonCount(), void j.list.find("li:not(.ui-li-divider)").find("a").removeClass(c.mobile.activeBtnClass).end().attr("aria-selected", !1).each(function(l) {
                    var m = c(this);
                    c.inArray(l, k) > -1 ? (m.attr("aria-selected", !0), j.isMultiple ? m.find("a").removeClass("ui-checkbox-off").addClass("ui-checkbox-on") : m.hasClass("ui-screen-hidden") ? m.next().find("a").addClass(c.mobile.activeBtnClass) : m.find("a").addClass(c.mobile.activeBtnClass)) : j.isMultiple && m.find("a").removeClass("ui-checkbox-on").addClass("ui-checkbox-off")
                }))
            },
            close: function() {
                if (!this.options.disabled && this.isOpen) {
                    var b = this;
                    "page" === b.menuType ? (b.menuPage.dialog("close"), b.list.appendTo(b.listbox)) : b.listbox.popup("close"), b._focusButton(), b.isOpen = !1
                }
            },
            open: function() {
                this.button.click()
            },
            _focusMenuItem: function() {
                var a = this.list.find("a." + c.mobile.activeBtnClass);
                0 === a.length && (a = this.list.find("li:not(" + h + ") a.ui-btn")), a.first().focus()
            },
            _decideFormat: function() {
                var a = this,
                    j = this.window,
                    k = a.list.parent(),
                    l = k.outerHeight(),
                    m = j.scrollTop(),
                    n = a.button.offset().top,
                    o = j.height();
                l > o - 80 || !c.support.scrollTop ? (a.menuPage.appendTo(c.mobile.pageContainer).page(), a.menuPageContent = a.menuPage.find(".ui-content"), a.menuPageClose = a.menuPage.find(".ui-header a"), a.thisPage.unbind("pagehide.remove"), 0 === m && n > o && a.thisPage.one("pagehide", function() {
                    c(this).jqmData("lastScroll", n)
                }), a.menuPage.one({
                    pageshow: c.proxy(this, "_focusMenuItem"),
                    pagehide: c.proxy(this, "close")
                }), a.menuType = "page", a.menuPageContent.append(a.list), a.menuPage.find("div .ui-title").text(a.label.getEncodedText() || a.placeholder)) : (a.menuType = "overlay", a.listbox.one({
                    popupafteropen: c.proxy(this, "_focusMenuItem")
                }))
            },
            _buildList: function() {
                var C, E, F, G, H, I, J, K, L, M, N, O, P, Q, R = this,
                    S = this.options,
                    T = this.placeholder,
                    U = !0,
                    V = "false",
                    W = "data-" + c.mobile.ns,
                    X = W + "option-index",
                    Y = W + "icon",
                    Z = W + "role",
                    aa = W + "placeholder",
                    a = f.createDocumentFragment(),
                    D = !1;
                for (R.list.empty().filter(".ui-listview").listview("destroy"), C = this._selectOptions(), E = C.length, F = this.select[0], H = 0; E > H; H++, D = !1) {
                    I = C[H], J = c(I), J.hasClass("ui-screen-hidden") || (K = I.parentNode, N = [], L = J.text(), M = f.createElement("a"), M.setAttribute("href", "#"), M.appendChild(f.createTextNode(L)), K !== F && "optgroup" === K.nodeName.toLowerCase() && (O = K.getAttribute("label"), O !== G && (P = f.createElement("li"), P.setAttribute(Z, "list-divider"), P.setAttribute("role", "option"), P.setAttribute("tabindex", "-1"), P.appendChild(f.createTextNode(O)), a.appendChild(P), G = O)), !U || I.getAttribute("value") && 0 !== L.length && !J.jqmData("placeholder") || (U = !1, D = !0, null === I.getAttribute(aa) && (this._removePlaceholderAttr = !0), I.setAttribute(aa, !0), S.hidePlaceholderMenuItems && N.push("ui-screen-hidden"), T !== L && (T = R.placeholder = L)), Q = f.createElement("li"), I.disabled && (N.push("ui-state-disabled"), Q.setAttribute("aria-disabled", !0)), Q.setAttribute(X, H), Q.setAttribute(Y, V), D && Q.setAttribute(aa, !0), Q.className = N.join(" "), Q.setAttribute("role", "option"), M.setAttribute("tabindex", "-1"), this.isMultiple && c(M).addClass("ui-btn ui-checkbox-off ui-btn-icon-right"), Q.appendChild(M), a.appendChild(Q))
                }
                R.list[0].appendChild(a), this.isMultiple || T.length ? this.headerTitle.text(this.placeholder) : this.header.addClass("ui-screen-hidden"), R.list.listview()
            },
            _button: function() {
                return this.options.nativeMenu ? this._super() : c("<a>", {
                    href: "#",
                    role: "button",
                    id: this.buttonId,
                    "aria-haspopup": "true",
                    "aria-owns": this.menuId
                })
            },
            _destroy: function() {
                this.options.nativeMenu || (this.close(), this._origTabIndex !== g && (this._origTabIndex !== !1 ? this.select.attr("tabindex", this._origTabIndex) : this.select.removeAttr("tabindex")), this._removePlaceholderAttr && this._selectOptions().removeAttr("data-" + c.mobile.ns + "placeholder"), this.listbox.remove(), this.menuPage.remove()), this._super()
            }
        })
    }(d),
    function(i, j) {
        function k(g, h) {
            var q = h ? h : [];
            return q.push("ui-btn"), g.theme && q.push("ui-btn-" + g.theme), g.icon && (q = q.concat(["ui-icon-" + g.icon, "ui-btn-icon-" + g.iconpos]), g.iconshadow && q.push("ui-shadow-icon")), g.inline && q.push("ui-btn-inline"), g.shadow && q.push("ui-shadow"), g.corners && q.push("ui-corner-all"), g.mini && q.push("ui-mini"), q
        }

        function l(b) {
            var q, r, s, t = !1,
                u = !0,
                v = {
                    icon: "",
                    inline: !1,
                    shadow: !1,
                    corners: !1,
                    iconshadow: !1,
                    mini: !1
                },
                w = [];
            for (b = b.split(" "), q = 0; q < b.length; q++) {
                s = !0, r = n[b[q]], r !== j ? (s = !1, v[r] = !0) : 0 === b[q].indexOf("ui-btn-icon-") ? (s = !1, u = !1, v.iconpos = b[q].substring(12)) : 0 === b[q].indexOf("ui-icon-") ? (s = !1, v.icon = b[q].substring(8)) : 0 === b[q].indexOf("ui-btn-") && 8 === b[q].length ? (s = !1, v.theme = b[q].substring(7)) : "ui-btn" === b[q] && (s = !1, t = !0), s && w.push(b[q])
            }
            return u && (v.icon = ""), {
                options: v,
                unknownClasses: w,
                alreadyEnhanced: t
            }
        }

        function m(b) {
            return "-" + b.toLowerCase()
        }
        var n = {
                "ui-shadow": "shadow",
                "ui-corner-all": "corners",
                "ui-btn-inline": "inline",
                "ui-shadow-icon": "iconshadow",
                "ui-mini": "mini"
            },
            o = function() {
                var a = i.mobile.getAttribute.apply(this, arguments);
                return null == a ? j : a
            },
            p = /[A-Z]/g;
        i.fn.buttonMarkup = function(a, b) {
            var c, g, h, q, r, s = i.fn.buttonMarkup.defaults;
            for (c = 0; c < this.length; c++) {
                if (h = this[c], g = b ? {
                        alreadyEnhanced: !1,
                        unknownClasses: []
                    } : l(h.className), q = i.extend({}, g.alreadyEnhanced ? g.options : {}, a), !g.alreadyEnhanced) {
                    for (r in s) {
                        q[r] === j && (q[r] = o(h, r.replace(p, m)))
                    }
                }
                h.className = k(i.extend({}, s, q), g.unknownClasses).join(" "), "button" !== h.tagName.toLowerCase() && h.setAttribute("role", "button")
            }
            return this
        }, i.fn.buttonMarkup.defaults = {
            icon: "",
            iconpos: "left",
            theme: null,
            inline: !1,
            shadow: !0,
            corners: !0,
            iconshadow: !1,
            mini: !1
        }, i.extend(i.fn.buttonMarkup, {
            initSelector: "a:jqmData(role='button'), .ui-bar > a, .ui-bar > :jqmData(role='controlgroup') > a, button:not(:jqmData(role='navbar') button)"
        })
    }(d),
    function(c, g) {
        c.widget("mobile.controlgroup", c.extend({
            options: {
                enhanced: !1,
                theme: null,
                shadow: !1,
                corners: !0,
                excludeInvisible: !0,
                type: "vertical",
                mini: !1
            },
            _create: function() {
                var a = this.element,
                    h = this.options,
                    i = c.mobile.page.prototype.keepNativeSelector();
                c.fn.buttonMarkup && this.element.find(c.fn.buttonMarkup.initSelector).not(i).buttonMarkup(), c.each(this._childWidgets, c.proxy(function(j, k) {
                    c.mobile[k] && this.element.find(c.mobile[k].initSelector).not(i)[k]()
                }, this)), c.extend(this, {
                    _ui: null,
                    _initialRefresh: !0
                }), this._ui = h.enhanced ? {
                    groupLegend: a.children(".ui-controlgroup-label").children(),
                    childWrapper: a.children(".ui-controlgroup-controls")
                } : this._enhance()
            },
            _childWidgets: ["checkboxradio", "selectmenu", "button"],
            _themeClassFromOption: function(b) {
                return b ? "none" === b ? "" : "ui-group-theme-" + b : ""
            },
            _enhance: function() {
                var a = this.element,
                    h = this.options,
                    i = {
                        groupLegend: a.children("legend"),
                        childWrapper: a.addClass("ui-controlgroup ui-controlgroup-" + ("horizontal" === h.type ? "horizontal" : "vertical") + " " + this._themeClassFromOption(h.theme) + " " + (h.corners ? "ui-corner-all " : "") + (h.mini ? "ui-mini " : "")).wrapInner("<div class='ui-controlgroup-controls " + (h.shadow === !0 ? "ui-shadow" : "") + "'></div>").children()
                    };
                return i.groupLegend.length > 0 && c("<div role='heading' class='ui-controlgroup-label'></div>").append(i.groupLegend).prependTo(a), i
            },
            _init: function() {
                this.refresh()
            },
            _setOptions: function(b) {
                var h, i, j = this.element;
                return b.type !== g && (j.removeClass("ui-controlgroup-horizontal ui-controlgroup-vertical").addClass("ui-controlgroup-" + ("horizontal" === b.type ? "horizontal" : "vertical")), h = !0), b.theme !== g && j.removeClass(this._themeClassFromOption(this.options.theme)).addClass(this._themeClassFromOption(b.theme)), b.corners !== g && j.toggleClass("ui-corner-all", b.corners), b.mini !== g && j.toggleClass("ui-mini", b.mini), b.shadow !== g && this._ui.childWrapper.toggleClass("ui-shadow", b.shadow), b.excludeInvisible !== g && (this.options.excludeInvisible = b.excludeInvisible, h = !0), i = this._super(b), h && this.refresh(), i
            },
            container: function() {
                return this._ui.childWrapper
            },
            refresh: function() {
                var a = this.container(),
                    h = a.find(".ui-btn").not(".ui-slider-handle"),
                    i = this._initialRefresh;
                c.mobile.checkboxradio && a.find(":mobile-checkboxradio").checkboxradio("refresh"), this._addFirstLastClasses(h, this.options.excludeInvisible ? this._getVisibles(h, i) : h, i), this._initialRefresh = !1
            },
            _destroy: function() {
                var h, i, j = this.options;
                return j.enhanced ? this : (h = this._ui, i = this.element.removeClass("ui-controlgroup ui-controlgroup-horizontal ui-controlgroup-vertical ui-corner-all ui-mini " + this._themeClassFromOption(j.theme)).find(".ui-btn").not(".ui-slider-handle"), this._removeFirstLastClasses(i), h.groupLegend.unwrap(), void h.childWrapper.children().unwrap())
            }
        }, c.mobile.behaviors.addFirstLastClasses))
    }(d),
    function(c, g) {
        c.widget("mobile.toolbar", {
            initSelector: ":jqmData(role='footer'), :jqmData(role='header')",
            options: {
                theme: null,
                addBackBtn: !1,
                backBtnTheme: null,
                backBtnText: "Back"
            },
            _create: function() {
                var a, h, i = this.element.is(":jqmData(role='header')") ? "header" : "footer",
                    j = this.element.closest(".ui-page");
                0 === j.length && (j = !1, this._on(this.document, {
                    pageshow: "refresh"
                })), c.extend(this, {
                    role: i,
                    page: j,
                    leftbtn: a,
                    rightbtn: h
                }), this.element.attr("role", "header" === i ? "banner" : "contentinfo").addClass("ui-" + i), this.refresh(), this._setOptions(this.options)
            },
            _setOptions: function(b) {
                if (b.addBackBtn !== g && this._updateBackButton(), null != b.backBtnTheme && this.element.find(".ui-toolbar-back-btn").addClass("ui-btn ui-btn-" + b.backBtnTheme), b.backBtnText !== g && this.element.find(".ui-toolbar-back-btn .ui-btn-text").text(b.backBtnText), b.theme !== g) {
                    var h = this.options.theme ? this.options.theme : "inherit",
                        i = b.theme ? b.theme : "inherit";
                    this.element.removeClass("ui-bar-" + h).addClass("ui-bar-" + i)
                }
                this._super(b)
            },
            refresh: function() {
                "header" === this.role && this._addHeaderButtonClasses(), this.page || (this._setRelative(), "footer" === this.role ? this.element.appendTo("body") : "header" === this.role && this._updateBackButton()), this._addHeadingClasses(), this._btnMarkup()
            },
            _setRelative: function() {
                c("[data-" + c.mobile.ns + "role='page']").css({
                    position: "relative"
                })
            },
            _btnMarkup: function() {
                this.element.children("a").filter(":not([data-" + c.mobile.ns + "role='none'])").attr("data-" + c.mobile.ns + "role", "button"), this.element.trigger("create")
            },
            _addHeaderButtonClasses: function() {
                var b = this.element.children("a, button");
                this.leftbtn = b.hasClass("ui-btn-left") && !b.hasClass("ui-toolbar-back-btn"), this.rightbtn = b.hasClass("ui-btn-right"), this.leftbtn = this.leftbtn || b.eq(0).not(".ui-btn-right,.ui-toolbar-back-btn").addClass("ui-btn-left").length, this.rightbtn = this.rightbtn || b.eq(1).addClass("ui-btn-right").length
            },
            _updateBackButton: function() {
                var a, h = this.options,
                    i = h.backBtnTheme || h.theme;
                a = this._backButton = this._backButton || {}, this.options.addBackBtn && "header" === this.role && c(".ui-page").length > 1 && (this.page ? this.page[0].getAttribute("data-" + c.mobile.ns + "url") !== c.mobile.path.stripHash(location.hash) : c.mobile.navigate && c.mobile.navigate.history && c.mobile.navigate.history.activeIndex > 0) && !this.leftbtn ? a.attached || (this.backButton = a.element = (a.element || c("<a role='button' href='javascript:void(0);' class='ui-btn ui-corner-all ui-shadow ui-btn-left " + (i ? "ui-btn-" + i + " " : "") + "ui-toolbar-back-btn ui-icon-carat-l ui-btn-icon-left' data-" + c.mobile.ns + "rel='back'>" + h.backBtnText + "</a>")).prependTo(this.element), a.attached = !0) : a.element && (a.element.detach(), a.attached = !1)
            },
            _addHeadingClasses: function() {
                this.element.children("h1, h2, h3, h4, h5, h6").addClass("ui-title").attr({
                    role: "heading",
                    "aria-level": "1"
                })
            },
            _destroy: function() {
                var b;
                this.element.children("h1, h2, h3, h4, h5, h6").removeClass("ui-title").removeAttr("role").removeAttr("aria-level"), "header" === this.role && (this.element.children("a, button").removeClass("ui-btn-left ui-btn-right ui-btn ui-shadow ui-corner-all"), this.backButton && this.backButton.remove()), b = this.options.theme ? this.options.theme : "inherit", this.element.removeClass("ui-bar-" + b), this.element.removeClass("ui-" + this.role).removeAttr("role")
            }
        })
    }(d),
    function(c, g) {
        c.widget("mobile.toolbar", c.mobile.toolbar, {
            options: {
                position: null,
                visibleOnPageShow: !0,
                disablePageZoom: !0,
                transition: "slide",
                fullscreen: !1,
                tapToggle: !0,
                tapToggleBlacklist: "a, button, input, select, textarea, .ui-header-fixed, .ui-footer-fixed, .ui-flipswitch, .ui-popup, .ui-panel, .ui-panel-dismiss-open",
                hideDuringFocus: "input, textarea, select",
                updatePagePadding: !0,
                trackPersistentToolbars: !0,
                supportBlacklist: function() {
                    return !c.support.fixedPosition
                }
            },
            _create: function() {
                this._super(), this.pagecontainer = c(":mobile-pagecontainer"), "fixed" !== this.options.position || this.options.supportBlacklist() || this._makeFixed()
            },
            _makeFixed: function() {
                this.element.addClass("ui-" + this.role + "-fixed"), this.updatePagePadding(), this._addTransitionClass(), this._bindPageEvents(), this._bindToggleHandlers()
            },
            _setOptions: function(a) {
                if ("fixed" === a.position && "fixed" !== this.options.position && this._makeFixed(), "fixed" === this.options.position && !this.options.supportBlacklist()) {
                    var b = this.page ? this.page : c(".ui-page-active").length > 0 ? c(".ui-page-active") : c(".ui-page").eq(0);
                    a.fullscreen !== g && (a.fullscreen ? (this.element.addClass("ui-" + this.role + "-fullscreen"), b.addClass("ui-page-" + this.role + "-fullscreen")) : (this.element.removeClass("ui-" + this.role + "-fullscreen"), b.removeClass("ui-page-" + this.role + "-fullscreen").addClass("ui-page-" + this.role + "-fixed")))
                }
                this._super(a)
            },
            _addTransitionClass: function() {
                var b = this.options.transition;
                b && "none" !== b && ("slide" === b && (b = this.element.hasClass("ui-header") ? "slidedown" : "slideup"), this.element.addClass(b))
            },
            _bindPageEvents: function() {
                var b = this.page ? this.element.closest(".ui-page") : this.document;
                this._on(b, {
                    pagebeforeshow: "_handlePageBeforeShow",
                    webkitAnimationStart: "_handleAnimationStart",
                    animationstart: "_handleAnimationStart",
                    updatelayout: "_handleAnimationStart",
                    pageshow: "_handlePageShow",
                    pagebeforehide: "_handlePageBeforeHide"
                })
            },
            _handlePageBeforeShow: function() {
                var a = this.options;
                a.disablePageZoom && c.mobile.zoom.disable(!0), a.visibleOnPageShow || this.hide(!0)
            },
            _handleAnimationStart: function() {
                this.options.updatePagePadding && this.updatePagePadding(this.page ? this.page : ".ui-page-active")
            },
            _handlePageShow: function() {
                this.updatePagePadding(this.page ? this.page : ".ui-page-active"), this.options.updatePagePadding && this._on(this.window, {
                    throttledresize: "updatePagePadding"
                })
            },
            _handlePageBeforeHide: function(a, i) {
                var j, k, l, m, n = this.options;
                n.disablePageZoom && c.mobile.zoom.enable(!0), n.updatePagePadding && this._off(this.window, "throttledresize"), n.trackPersistentToolbars && (j = c(".ui-footer-fixed:jqmData(id)", this.page), k = c(".ui-header-fixed:jqmData(id)", this.page), l = j.length && i.nextPage && c(".ui-footer-fixed:jqmData(id='" + j.jqmData("id") + "')", i.nextPage) || c(), m = k.length && i.nextPage && c(".ui-header-fixed:jqmData(id='" + k.jqmData("id") + "')", i.nextPage) || c(), (l.length || m.length) && (l.add(m).appendTo(c.mobile.pageContainer), i.nextPage.one("pageshow", function() {
                    m.prependTo(this), l.appendTo(this)
                })))
            },
            _visible: !0,
            updatePagePadding: function(a) {
                var b = this.element,
                    h = "header" === this.role,
                    i = parseFloat(b.css(h ? "top" : "bottom"));
                this.options.fullscreen || (a = a && a.type === g && a || this.page || b.closest(".ui-page"), a = this.page ? this.page : ".ui-page-active", c(a).css("padding-" + (h ? "top" : "bottom"), b.outerHeight() + i))
            },
            _useTransition: function(a) {
                var i = this.window,
                    j = this.element,
                    k = i.scrollTop(),
                    l = j.height(),
                    m = this.page ? j.closest(".ui-page").height() : c(".ui-page-active").height(),
                    n = c.mobile.getScreenHeight();
                return !a && (this.options.transition && "none" !== this.options.transition && ("header" === this.role && !this.options.fullscreen && k > l || "footer" === this.role && !this.options.fullscreen && m - l > k + n) || this.options.fullscreen)
            },
            show: function(h) {
                var i = "ui-fixed-hidden",
                    j = this.element;
                this._useTransition(h) ? j.removeClass("out " + i).addClass("in").animationComplete(function() {
                    j.removeClass("in")
                }) : j.removeClass(i), this._visible = !0
            },
            hide: function(h) {
                var i = "ui-fixed-hidden",
                    j = this.element,
                    k = "out" + ("slide" === this.options.transition ? " reverse" : "");
                this._useTransition(h) ? j.addClass(k).removeClass("in").animationComplete(function() {
                    j.addClass(i).removeClass(k)
                }) : j.addClass(i).removeClass(k), this._visible = !1
            },
            toggle: function() {
                this[this._visible ? "hide" : "show"]()
            },
            _bindToggleHandlers: function() {
                var a, h, i = this,
                    j = i.options,
                    k = !0,
                    l = this.page ? this.page : c(".ui-page");
                l.bind("vclick", function(m) {
                    j.tapToggle && !c(m.target).closest(j.tapToggleBlacklist).length && i.toggle()
                }).bind("focusin focusout", function(b) {
                    screen.width < 1025 && c(b.target).is(j.hideDuringFocus) && !c(b.target).closest(".ui-header-fixed, .ui-footer-fixed").length && ("focusout" !== b.type || k ? "focusin" === b.type && k && (clearTimeout(a), k = !1, h = setTimeout(function() {
                        i.hide()
                    }, 0)) : (k = !0, clearTimeout(h), a = setTimeout(function() {
                        i.show()
                    }, 0)))
                })
            },
            _setRelative: function() {
                "fixed" !== this.options.position && c("[data-" + c.mobile.ns + "role='page']").css({
                    position: "relative"
                })
            },
            _destroy: function() {
                var a, h, i, j, k, l = this.pagecontainer.pagecontainer("getActivePage");
                this._super(), "fixed" === this.options.position && (i = c("body>.ui-" + this.role + "-fixed").add(l.find(".ui-" + this.options.role + "-fixed")).not(this.element).length > 0, k = c("body>.ui-" + this.role + "-fixed").add(l.find(".ui-" + this.options.role + "-fullscreen")).not(this.element).length > 0, h = "ui-header-fixed ui-footer-fixed ui-header-fullscreen in out ui-footer-fullscreen fade slidedown slideup ui-fixed-hidden", this.element.removeClass(h), k || (a = "ui-page-" + this.role + "-fullscreen"), i || (j = "header" === this.role, a += " ui-page-" + this.role + "-fixed", l.css("padding-" + (j ? "top" : "bottom"), "")), l.removeClass(a))
            }
        })
    }(d),
    function(b) {
        b.widget("mobile.toolbar", b.mobile.toolbar, {
            _makeFixed: function() {
                this._super(), this._workarounds()
            },
            _workarounds: function() {
                var g = navigator.userAgent,
                    h = navigator.platform,
                    i = g.match(/AppleWebKit\/([0-9]+)/),
                    j = !!i && i[1],
                    k = null,
                    l = this;
                if (h.indexOf("iPhone") > -1 || h.indexOf("iPad") > -1 || h.indexOf("iPod") > -1) {
                    k = "ios"
                } else {
                    if (!(g.indexOf("Android") > -1)) {
                        return
                    }
                    k = "android"
                }
                if ("ios" === k) {
                    l._bindScrollWorkaround()
                } else {
                    if (!("android" === k && j && 534 > j)) {
                        return
                    }
                    l._bindScrollWorkaround(), l._bindListThumbWorkaround()
                }
            },
            _viewportOffset: function() {
                var g = this.element,
                    h = g.hasClass("ui-header"),
                    i = Math.abs(g.offset().top - this.window.scrollTop());
                return h || (i = Math.round(i - this.window.height() + g.outerHeight()) - 60), i
            },
            _bindScrollWorkaround: function() {
                var c = this;
                this._on(this.window, {
                    scrollstop: function() {
                        var a = c._viewportOffset();
                        a > 2 && c._visible && c._triggerRedraw()
                    }
                })
            },
            _bindListThumbWorkaround: function() {
                this.element.closest(".ui-page").addClass("ui-android-2x-fixed")
            },
            _triggerRedraw: function() {
                var a = parseFloat(b(".ui-page-active").css("padding-bottom"));
                b(".ui-page-active").css("padding-bottom", a + 1 + "px"), setTimeout(function() {
                    b(".ui-page-active").css("padding-bottom", a + "px")
                }, 0)
            },
            destroy: function() {
                this._super(), this.element.closest(".ui-page-active").removeClass("ui-android-2x-fix")
            }
        })
    }(d),
    function(g, h) {
        function i() {
            var l = k.clone(),
                m = l.eq(0),
                n = l.eq(1),
                o = n.children();
            return {
                arEls: n.add(m),
                gd: m,
                ct: n,
                ar: o
            }
        }
        var j = g.mobile.browser.oldIE && g.mobile.browser.oldIE <= 8,
            k = g("<div class='ui-popup-arrow-guide'></div><div class='ui-popup-arrow-container" + (j ? " ie" : "") + "'><div class='ui-popup-arrow'></div></div>");
        g.widget("mobile.popup", g.mobile.popup, {
            options: {
                arrow: ""
            },
            _create: function() {
                var c, l = this._super();
                return this.options.arrow && (this._ui.arrow = c = this._addArrow()), l
            },
            _addArrow: function() {
                var c, l = this.options,
                    m = i();
                return c = this._themeClassFromOption("ui-body-", l.theme), m.ar.addClass(c + (l.shadow ? " ui-overlay-shadow" : "")), m.arEls.hide().appendTo(this.element), m
            },
            _unenhance: function() {
                var b = this._ui.arrow;
                return b && b.arEls.remove(), this._super()
            },
            _tryAnArrow: function(l, m, n, o, p) {
                var q, r, s, t = {},
                    u = {};
                return o.arFull[l.dimKey] > o.guideDims[l.dimKey] ? p : (t[l.fst] = n[l.fst] + (o.arHalf[l.oDimKey] + o.menuHalf[l.oDimKey]) * l.offsetFactor - o.contentBox[l.fst] + (o.clampInfo.menuSize[l.oDimKey] - o.contentBox[l.oDimKey]) * l.arrowOffsetFactor, t[l.snd] = n[l.snd], q = o.result || this._calculateFinalLocation(t, o.clampInfo), r = {
                    x: q.left,
                    y: q.top
                }, u[l.fst] = r[l.fst] + o.contentBox[l.fst] + l.tipOffset, u[l.snd] = Math.max(q[l.prop] + o.guideOffset[l.prop] + o.arHalf[l.dimKey], Math.min(q[l.prop] + o.guideOffset[l.prop] + o.guideDims[l.dimKey] - o.arHalf[l.dimKey], n[l.snd])), s = Math.abs(n.x - u.x) + Math.abs(n.y - u.y), (!p || s < p.diff) && (u[l.snd] -= o.arHalf[l.dimKey] + q[l.prop] + o.contentBox[l.snd], p = {
                    dir: m,
                    diff: s,
                    result: q,
                    posProp: l.prop,
                    posVal: u[l.snd]
                }), p)
            },
            _getPlacementState: function(l) {
                var m, n, o = this._ui.arrow,
                    p = {
                        clampInfo: this._clampPopupWidth(!l),
                        arFull: {
                            cx: o.ct.width(),
                            cy: o.ct.height()
                        },
                        guideDims: {
                            cx: o.gd.width(),
                            cy: o.gd.height()
                        },
                        guideOffset: o.gd.offset()
                    };
                return m = this.element.offset(), o.gd.css({
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                }), n = o.gd.offset(), p.contentBox = {
                    x: n.left - m.left,
                    y: n.top - m.top,
                    cx: o.gd.width(),
                    cy: o.gd.height()
                }, o.gd.removeAttr("style"), p.guideOffset = {
                    left: p.guideOffset.left - m.left,
                    top: p.guideOffset.top - m.top
                }, p.arHalf = {
                    cx: p.arFull.cx / 2,
                    cy: p.arFull.cy / 2
                }, p.menuHalf = {
                    cx: p.clampInfo.menuSize.cx / 2,
                    cy: p.clampInfo.menuSize.cy / 2
                }, p
            },
            _placementCoords: function(a) {
                var l, m, n, o, p, q = this.options.arrow,
                    r = this._ui.arrow;
                return r ? (r.arEls.show(), p = {}, l = this._getPlacementState(!0), n = {
                    l: {
                        fst: "x",
                        snd: "y",
                        prop: "top",
                        dimKey: "cy",
                        oDimKey: "cx",
                        offsetFactor: 1,
                        tipOffset: -l.arHalf.cx,
                        arrowOffsetFactor: 0
                    },
                    r: {
                        fst: "x",
                        snd: "y",
                        prop: "top",
                        dimKey: "cy",
                        oDimKey: "cx",
                        offsetFactor: -1,
                        tipOffset: l.arHalf.cx + l.contentBox.cx,
                        arrowOffsetFactor: 1
                    },
                    b: {
                        fst: "y",
                        snd: "x",
                        prop: "left",
                        dimKey: "cx",
                        oDimKey: "cy",
                        offsetFactor: -1,
                        tipOffset: l.arHalf.cy + l.contentBox.cy,
                        arrowOffsetFactor: 1
                    },
                    t: {
                        fst: "y",
                        snd: "x",
                        prop: "left",
                        dimKey: "cx",
                        oDimKey: "cy",
                        offsetFactor: 1,
                        tipOffset: -l.arHalf.cy,
                        arrowOffsetFactor: 0
                    }
                }, g.each((q === !0 ? "l,t,r,b" : q).split(","), g.proxy(function(b, c) {
                    m = this._tryAnArrow(n[c], c, a, l, m)
                }, this)), m ? (r.ct.removeClass("ui-popup-arrow-l ui-popup-arrow-t ui-popup-arrow-r ui-popup-arrow-b").addClass("ui-popup-arrow-" + m.dir).removeAttr("style").css(m.posProp, m.posVal).show(), j || (o = this.element.offset(), p[n[m.dir].fst] = r.ct.offset(), p[n[m.dir].snd] = {
                    left: o.left + l.contentBox.x,
                    top: o.top + l.contentBox.y
                }), m.result) : (r.arEls.hide(), this._super(a))) : this._super(a)
            },
            _setOptions: function(b) {
                var l, m = this.options.theme,
                    n = this._ui.arrow,
                    o = this._super(b);
                if (b.arrow !== h) {
                    if (!n && b.arrow) {
                        return void(this._ui.arrow = this._addArrow())
                    }
                    n && !b.arrow && (n.arEls.remove(), this._ui.arrow = null)
                }
                return n = this._ui.arrow, n && (b.theme !== h && (m = this._themeClassFromOption("ui-body-", m), l = this._themeClassFromOption("ui-body-", b.theme), n.ar.removeClass(m).addClass(l)), b.shadow !== h && n.ar.toggleClass("ui-overlay-shadow", b.shadow)), o
            },
            _destroy: function() {
                var b = this._ui.arrow;
                return b && b.arEls.remove(), this._super()
            }
        })
    }(d),
    function(b, g) {
        b.widget("mobile.panel", {
            options: {
                classes: {
                    panel: "ui-panel",
                    panelOpen: "ui-panel-open",
                    panelClosed: "ui-panel-closed",
                    panelFixed: "ui-panel-fixed",
                    panelInner: "ui-panel-inner",
                    modal: "ui-panel-dismiss",
                    modalOpen: "ui-panel-dismiss-open",
                    pageContainer: "ui-panel-page-container",
                    pageWrapper: "ui-panel-wrapper",
                    pageFixedToolbar: "ui-panel-fixed-toolbar",
                    pageContentPrefix: "ui-panel-page-content",
                    animate: "ui-panel-animate"
                },
                animate: !0,
                theme: null,
                position: "left",
                dismissible: !0,
                display: "reveal",
                swipeClose: !0,
                positionFixed: !1
            },
            _closeLink: null,
            _parentPage: null,
            _page: null,
            _modal: null,
            _panelInner: null,
            _wrapper: null,
            _fixedToolbars: null,
            _create: function() {
                var a = this.element,
                    h = a.closest(".ui-page, :jqmData(role='page')");
                b.extend(this, {
                    _closeLink: a.find(":jqmData(rel='close')"),
                    _parentPage: h.length > 0 ? h : !1,
                    _openedPage: null,
                    _page: this._getPage,
                    _panelInner: this._getPanelInner(),
                    _fixedToolbars: this._getFixedToolbars
                }), "overlay" !== this.options.display && this._getWrapper(), this._addPanelClasses(), b.support.cssTransform3d && this.options.animate && this.element.addClass(this.options.classes.animate), this._bindUpdateLayout(), this._bindCloseEvents(), this._bindLinkListeners(), this._bindPageEvents(), this.options.dismissible && this._createModal(), this._bindSwipeEvents()
            },
            _getPanelInner: function() {
                var c = this.element.find("." + this.options.classes.panelInner);
                return 0 === c.length && (c = this.element.children().wrapAll("<div class='" + this.options.classes.panelInner + "' />").parent()), c
            },
            _createModal: function() {
                var a = this,
                    h = a._parentPage ? a._parentPage.parent() : a.element.parent();
                a._modal = b("<div class='" + a.options.classes.modal + "'></div>").on("mousedown", function() {
                    a.close()
                }).appendTo(h)
            },
            _getPage: function() {
                var a = this._openedPage || this._parentPage || b("." + b.mobile.activePageClass);
                return a
            },
            _getWrapper: function() {
                var c = this._page().find("." + this.options.classes.pageWrapper);
                0 === c.length && (c = this._page().children(".ui-header:not(.ui-header-fixed), .ui-content:not(.ui-popup), .ui-footer:not(.ui-footer-fixed)").wrapAll("<div class='" + this.options.classes.pageWrapper + "'></div>").parent()), this._wrapper = c
            },
            _getFixedToolbars: function() {
                var a = b("body").children(".ui-header-fixed, .ui-footer-fixed"),
                    h = this._page().find(".ui-header-fixed, .ui-footer-fixed"),
                    i = a.add(h).addClass(this.options.classes.pageFixedToolbar);
                return i
            },
            _getPosDisplayClasses: function(c) {
                return c + "-position-" + this.options.position + " " + c + "-display-" + this.options.display
            },
            _getPanelClasses: function() {
                var c = this.options.classes.panel + " " + this._getPosDisplayClasses(this.options.classes.panel) + " " + this.options.classes.panelClosed + " ui-body-" + (this.options.theme ? this.options.theme : "inherit");
                return this.options.positionFixed && (c += " " + this.options.classes.panelFixed), c
            },
            _addPanelClasses: function() {
                this.element.addClass(this._getPanelClasses())
            },
            _handleCloseClick: function(c) {
                c.isDefaultPrevented() || this.close()
            },
            _bindCloseEvents: function() {
                this._on(this._closeLink, {
                    click: "_handleCloseClick"
                }), this._on({
                    "click a:jqmData(ajax='false')": "_handleCloseClick"
                })
            },
            _positionPanel: function(a) {
                var h = this,
                    i = h._panelInner.outerHeight(),
                    j = i > b.mobile.getScreenHeight();
                j || !h.options.positionFixed ? (j && (h._unfixPanel(), b.mobile.resetActivePageHeight(i)), a && this.window[0].scrollTo(0, b.mobile.defaultHomeScroll)) : h._fixPanel()
            },
            _bindFixListener: function() {
                this._on(b(e), {
                    throttledresize: "_positionPanel"
                })
            },
            _unbindFixListener: function() {
                this._off(b(e), "throttledresize")
            },
            _unfixPanel: function() {
                this.options.positionFixed && b.support.fixedPosition && this.element.removeClass(this.options.classes.panelFixed)
            },
            _fixPanel: function() {
                this.options.positionFixed && b.support.fixedPosition && this.element.addClass(this.options.classes.panelFixed)
            },
            _bindUpdateLayout: function() {
                var c = this;
                c.element.on("updatelayout", function() {
                    c._open && c._positionPanel()
                })
            },
            _bindLinkListeners: function() {
                this._on("body", {
                    "click a": "_handleClick"
                })
            },
            _handleClick: function(a) {
                var c, h = this.element.attr("id");
                a.currentTarget.href.split("#")[1] === h && h !== g && (a.preventDefault(), c = b(a.target), c.hasClass("ui-btn") && (c.addClass(b.mobile.activeBtnClass), this.element.one("panelopen panelclose", function() {
                    c.removeClass(b.mobile.activeBtnClass)
                })), this.toggle())
            },
            _bindSwipeEvents: function() {
                var c = this,
                    h = c._modal ? c.element.add(c._modal) : c.element;
                c.options.swipeClose && ("left" === c.options.position ? h.on("swipeleft.panel", function() {
                    c.close()
                }) : h.on("swiperight.panel", function() {
                    c.close()
                }))
            },
            _bindPageEvents: function() {
                var c = this;
                this.document.on("panelbeforeopen", function(a) {
                    c._open && a.target !== c.element[0] && c.close()
                }).on("keyup.panel", function(a) {
                    27 === a.keyCode && c._open && c.close()
                }), this._parentPage || "overlay" === this.options.display || this._on(this.document, {
                    pageshow: function() {
                        this._openedPage = null, this._getWrapper()
                    }
                }), c._parentPage ? this.document.on("pagehide", ":jqmData(role='page')", function() {
                    c._open && c.close(!0)
                }) : this.document.on("pagebeforehide", function() {
                    c._open && c.close(!0)
                })
            },
            _open: !1,
            _pageContentOpenClasses: null,
            _modalOpenClasses: null,
            open: function(a) {
                if (!this._open) {
                    var h = this,
                        i = h.options,
                        j = function() {
                            h._off(h.document, "panelclose"), h._page().jqmData("panel", "open"), b.support.cssTransform3d && i.animate && "overlay" !== i.display && (h._wrapper.addClass(i.classes.animate), h._fixedToolbars().addClass(i.classes.animate)), !a && b.support.cssTransform3d && i.animate ? (h._wrapper || h.element).animationComplete(k, "transition") : setTimeout(k, 0), i.theme && "overlay" !== i.display && h._page().parent().addClass(i.classes.pageContainer + "-themed " + i.classes.pageContainer + "-" + i.theme), h.element.removeClass(i.classes.panelClosed).addClass(i.classes.panelOpen), h._positionPanel(!0), h._pageContentOpenClasses = h._getPosDisplayClasses(i.classes.pageContentPrefix), "overlay" !== i.display && (h._page().parent().addClass(i.classes.pageContainer), h._wrapper.addClass(h._pageContentOpenClasses), h._fixedToolbars().addClass(h._pageContentOpenClasses)), h._modalOpenClasses = h._getPosDisplayClasses(i.classes.modal) + " " + i.classes.modalOpen, h._modal && h._modal.addClass(h._modalOpenClasses).height(Math.max(h._modal.height(), h.document.height()))
                        },
                        k = function() {
                            h._open && ("overlay" !== i.display && (h._wrapper.addClass(i.classes.pageContentPrefix + "-open"), h._fixedToolbars().addClass(i.classes.pageContentPrefix + "-open")), h._bindFixListener(), h._trigger("open"), h._openedPage = h._page())
                        };
                    h._trigger("beforeopen"), "open" === h._page().jqmData("panel") ? h._on(h.document, {
                        panelclose: j
                    }) : j(), h._open = !0
                }
            },
            close: function(a) {
                if (this._open) {
                    var h = this,
                        i = this.options,
                        j = function() {
                            h.element.removeClass(i.classes.panelOpen), "overlay" !== i.display && (h._wrapper.removeClass(h._pageContentOpenClasses), h._fixedToolbars().removeClass(h._pageContentOpenClasses)), !a && b.support.cssTransform3d && i.animate ? (h._wrapper || h.element).animationComplete(k, "transition") : setTimeout(k, 0), h._modal && h._modal.removeClass(h._modalOpenClasses).height("")
                        },
                        k = function() {
                            i.theme && "overlay" !== i.display && h._page().parent().removeClass(i.classes.pageContainer + "-themed " + i.classes.pageContainer + "-" + i.theme), h.element.addClass(i.classes.panelClosed), "overlay" !== i.display && (h._page().parent().removeClass(i.classes.pageContainer), h._wrapper.removeClass(i.classes.pageContentPrefix + "-open"), h._fixedToolbars().removeClass(i.classes.pageContentPrefix + "-open")), b.support.cssTransform3d && i.animate && "overlay" !== i.display && (h._wrapper.removeClass(i.classes.animate), h._fixedToolbars().removeClass(i.classes.animate)), h._fixPanel(), h._unbindFixListener(), b.mobile.resetActivePageHeight(), h._page().jqmRemoveData("panel"), h._trigger("close"), h._openedPage = null
                        };
                    h._trigger("beforeclose"), j(), h._open = !1
                }
            },
            toggle: function() {
                this[this._open ? "close" : "open"]()
            },
            _destroy: function() {
                var a, h = this.options,
                    i = b("body > :mobile-panel").length + b.mobile.activePage.find(":mobile-panel").length > 1;
                "overlay" !== h.display && (a = b("body > :mobile-panel").add(b.mobile.activePage.find(":mobile-panel")), 0 === a.not(".ui-panel-display-overlay").not(this.element).length && this._wrapper.children().unwrap(), this._open && (this._fixedToolbars().removeClass(h.classes.pageContentPrefix + "-open"), b.support.cssTransform3d && h.animate && this._fixedToolbars().removeClass(h.classes.animate), this._page().parent().removeClass(h.classes.pageContainer), h.theme && this._page().parent().removeClass(h.classes.pageContainer + "-themed " + h.classes.pageContainer + "-" + h.theme))), i || this.document.off("panelopen panelclose"), this._open && this._page().jqmRemoveData("panel"), this._panelInner.children().unwrap(), this.element.removeClass([this._getPanelClasses(), h.classes.panelOpen, h.classes.animate].join(" ")).off("swipeleft.panel swiperight.panel").off("panelbeforeopen").off("panelhide").off("keyup.panel").off("updatelayout"), this._modal && this._modal.remove()
            }
        })
    }(d),
    function(c, g) {
        c.widget("mobile.table", {
            options: {
                classes: {
                    table: "ui-table"
                },
                enhanced: !1
            },
            _create: function() {
                this.options.enhanced || this.element.addClass(this.options.classes.table), c.extend(this, {
                    headers: g,
                    allHeaders: g
                }), this._refresh(!0)
            },
            _setHeaders: function() {
                var b = this.element.find("thead tr");
                this.headers = this.element.find("tr:eq(0)").children(), this.allHeaders = this.headers.add(b.children())
            },
            refresh: function() {
                this._refresh()
            },
            rebuild: c.noop,
            _refresh: function() {
                var a = this.element,
                    h = a.find("thead tr");
                this._setHeaders(), h.each(function() {
                    var b = 0;
                    c(this).children().each(function() {
                        var i, j = parseInt(this.getAttribute("colspan"), 10),
                            k = ":nth-child(" + (b + 1) + ")";
                        if (this.setAttribute("data-" + c.mobile.ns + "colstart", b + 1), j) {
                            for (i = 0; j - 1 > i; i++) {
                                b++, k += ", :nth-child(" + (b + 1) + ")"
                            }
                        }
                        c(this).jqmData("cells", a.find("tr").not(h.eq(0)).not(this).children(k)), b++
                    })
                })
            }
        })
    }(d),
    function(b) {
        b.widget("mobile.table", b.mobile.table, {
            options: {
                mode: "columntoggle",
                columnBtnTheme: null,
                columnPopupTheme: null,
                columnBtnText: "Columns...",
                classes: b.extend(b.mobile.table.prototype.options.classes, {
                    popup: "ui-table-columntoggle-popup",
                    columnBtn: "ui-table-columntoggle-btn",
                    priorityPrefix: "ui-table-priority-",
                    columnToggleTable: "ui-table-columntoggle"
                })
            },
            _create: function() {
                this._super(), "columntoggle" === this.options.mode && (b.extend(this, {
                    _menu: null
                }), this.options.enhanced ? (this._menu = b(this.document[0].getElementById(this._id() + "-popup")).children().first(), this._addToggles(this._menu, !0)) : (this._menu = this._enhanceColToggle(), this.element.addClass(this.options.classes.columnToggleTable)), this._setupEvents(), this._setToggleState())
            },
            _id: function() {
                return this.element.attr("id") || this.widgetName + this.uuid
            },
            _setupEvents: function() {
                this._on(this.window, {
                    throttledresize: "_setToggleState"
                }), this._on(this._menu, {
                    "change input": "_menuInputChange"
                })
            },
            _addToggles: function(a, h) {
                var i, j = 0,
                    k = this.options,
                    l = a.controlgroup("container");
                h ? i = a.find("input") : l.empty(), this.headers.not("td").each(function() {
                    var c, g, m = b(this),
                        n = b.mobile.getAttribute(this, "priority");
                    n && (g = m.add(m.jqmData("cells")), g.addClass(k.classes.priorityPrefix + n), c = (h ? i.eq(j++) : b("<label><input type='checkbox' checked />" + (m.children("abbr").first().attr("title") || m.text()) + "</label>").appendTo(l).children(0).checkboxradio({
                        theme: k.columnPopupTheme
                    })).jqmData("header", m).jqmData("cells", g), m.jqmData("input", c))
                }), h || a.controlgroup("refresh")
            },
            _menuInputChange: function(a) {
                var g = b(a.target),
                    h = g[0].checked;
                g.jqmData("cells").toggleClass("ui-table-cell-hidden", !h).toggleClass("ui-table-cell-visible", h)
            },
            _unlockCells: function(c) {
                c.removeClass("ui-table-cell-hidden ui-table-cell-visible")
            },
            _enhanceColToggle: function() {
                var a, j, k, l, m = this.element,
                    n = this.options,
                    o = b.mobile.ns,
                    p = this.document[0].createDocumentFragment();
                return a = this._id() + "-popup", j = b("<a href='#" + a + "' class='" + n.classes.columnBtn + " ui-btn ui-btn-" + (n.columnBtnTheme || "a") + " ui-corner-all ui-shadow ui-mini' data-" + o + "rel='popup'>" + n.columnBtnText + "</a>"), k = b("<div class='" + n.classes.popup + "' id='" + a + "'></div>"), l = b("<fieldset></fieldset>").controlgroup(), this._addToggles(l, !1), l.appendTo(k), p.appendChild(k[0]), p.appendChild(j[0]), m.before(p), k.popup(), l
            },
            rebuild: function() {
                this._super(), "columntoggle" === this.options.mode && this._refresh(!1)
            },
            _refresh: function(a) {
                var g, h, i;
                if (this._super(a), !a && "columntoggle" === this.options.mode) {
                    for (g = this.headers, h = [], this._menu.find("input").each(function() {
                            var c = b(this),
                                j = c.jqmData("header"),
                                k = g.index(j[0]);
                            k > -1 && !c.prop("checked") && h.push(k)
                        }), this._unlockCells(this.element.find(".ui-table-cell-hidden, .ui-table-cell-visible")), this._addToggles(this._menu, a), i = h.length - 1; i > -1; i--) {
                        g.eq(h[i]).jqmData("input").prop("checked", !1).checkboxradio("refresh").trigger("change")
                    }
                }
            },
            _setToggleState: function() {
                this._menu.find("input").each(function() {
                    var a = b(this);
                    this.checked = "table-cell" === a.jqmData("cells").eq(0).css("display"), a.checkboxradio("refresh")
                })
            },
            _destroy: function() {
                this._super()
            }
        })
    }(d),
    function(b) {
        b.widget("mobile.table", b.mobile.table, {
            options: {
                mode: "reflow",
                classes: b.extend(b.mobile.table.prototype.options.classes, {
                    reflowTable: "ui-table-reflow",
                    cellLabels: "ui-table-cell-label"
                })
            },
            _create: function() {
                this._super(), "reflow" === this.options.mode && (this.options.enhanced || (this.element.addClass(this.options.classes.reflowTable), this._updateReflow()))
            },
            rebuild: function() {
                this._super(), "reflow" === this.options.mode && this._refresh(!1)
            },
            _refresh: function(c) {
                this._super(c), c || "reflow" !== this.options.mode || this._updateReflow()
            },
            _updateReflow: function() {
                var a = this,
                    g = this.options;
                b(a.allHeaders.get().reverse()).each(function() {
                    var c, j, k = b(this).jqmData("cells"),
                        l = b.mobile.getAttribute(this, "colstart"),
                        m = k.not(this).filter("thead th").length && " ui-table-cell-label-top",
                        n = b(this).clone().contents();
                    n.length > 0 && (m ? (c = parseInt(this.getAttribute("colspan"), 10), j = "", c && (j = "td:nth-child(" + c + "n + " + l + ")"), a._addLabels(k.filter(j), g.classes.cellLabels + m, n)) : a._addLabels(k, g.classes.cellLabels, n))
                })
            },
            _addLabels: function(a, g, h) {
                1 === h.length && "abbr" === h[0].nodeName.toLowerCase() && (h = h.eq(0).attr("title")), a.not(":has(b." + g + ")").prepend(b("<b class='" + g + "'></b>").append(h))
            }
        })
    }(d),
    function(b, g) {
        var h = function(a, i) {
            return -1 === ("" + (b.mobile.getAttribute(this, "filtertext") || b(this).text())).toLowerCase().indexOf(i)
        };
        b.widget("mobile.filterable", {
            initSelector: ":jqmData(filter='true')",
            options: {
                filterReveal: !1,
                filterCallback: h,
                enhanced: !1,
                input: null,
                children: "> li, > option, > optgroup option, > tbody tr, > .ui-controlgroup-controls > .ui-btn, > .ui-controlgroup-controls > .ui-checkbox, > .ui-controlgroup-controls > .ui-radio"
            },
            _create: function() {
                var a = this.options;
                b.extend(this, {
                    _search: null,
                    _timer: 0
                }), this._setInput(a.input), a.enhanced || this._filterItems((this._search && this._search.val() || "").toLowerCase())
            },
            _onKeyUp: function() {
                var a, i, j = this._search;
                if (j) {
                    if (a = j.val().toLowerCase(), i = b.mobile.getAttribute(j[0], "lastval") + "", i && i === a) {
                        return
                    }
                    this._timer && (e.clearTimeout(this._timer), this._timer = 0), this._timer = this._delay(function() {
                        return this._trigger("beforefilter", null, {
                            input: j
                        }) === !1 ? !1 : (j[0].setAttribute("data-" + b.mobile.ns + "lastval", a), this._filterItems(a), void(this._timer = 0))
                    }, 250)
                }
            },
            _getFilterableItems: function() {
                var a = this.element,
                    i = this.options.children,
                    j = i ? b.isFunction(i) ? i() : i.nodeName ? b(i) : i.jquery ? i : this.element.find(i) : {
                        length: 0
                    };
                return 0 === j.length && (j = a.children()), j
            },
            _filterItems: function(a) {
                var l, m, n, o, p = [],
                    q = [],
                    r = this.options,
                    s = this._getFilterableItems();
                if (null != a) {
                    for (m = r.filterCallback || h, n = s.length, l = 0; n > l; l++) {
                        o = m.call(s[l], l, a) ? q : p, o.push(s[l])
                    }
                }
                0 === q.length ? s[r.filterReveal && 0 === a.length ? "addClass" : "removeClass"]("ui-screen-hidden") : (b(q).addClass("ui-screen-hidden"), b(p).removeClass("ui-screen-hidden")), this._refreshChildWidget(), this._trigger("filter", null, {
                    items: s
                })
            },
            _refreshChildWidget: function() {
                var a, i, j = ["collapsibleset", "selectmenu", "controlgroup", "listview"];
                for (i = j.length - 1; i > -1; i--) {
                    a = j[i], b.mobile[a] && (a = this.element.data("mobile-" + a), a && b.isFunction(a.refresh) && a.refresh())
                }
            },
            _setInput: function(a) {
                var i = this._search;
                this._timer && (e.clearTimeout(this._timer), this._timer = 0), i && (this._off(i, "keyup change input"), i = null), a && (i = a.jquery ? a : a.nodeName ? b(a) : this.document.find(a), this._on(i, {
                    keydown: "_onKeyDown",
                    keypress: "_onKeyPress",
                    keyup: "_onKeyUp",
                    change: "_onKeyUp",
                    input: "_onKeyUp"
                })), this._search = i
            },
            _onKeyDown: function(a) {
                a.keyCode === b.ui.keyCode.ENTER && (a.preventDefault(), this._preventKeyPress = !0)
            },
            _onKeyPress: function(c) {
                this._preventKeyPress && (c.preventDefault(), this._preventKeyPress = !1)
            },
            _setOptions: function(c) {
                var i = !(c.filterReveal === g && c.filterCallback === g && c.children === g);
                this._super(c), c.input !== g && (this._setInput(c.input), i = !0), i && this.refresh()
            },
            _destroy: function() {
                var c = this.options,
                    i = this._getFilterableItems();
                c.enhanced ? i.toggleClass("ui-screen-hidden", c.filterReveal) : i.removeClass("ui-screen-hidden")
            },
            refresh: function() {
                this._timer && (e.clearTimeout(this._timer), this._timer = 0), this._filterItems((this._search && this._search.val() || "").toLowerCase())
            }
        })
    }(d),
    function(g, h) {
        var i = function(c, l) {
                return function(a) {
                    l.call(this, a), c._syncTextInputOptions(a)
                }
            },
            j = /(^|\s)ui-li-divider(\s|$)/,
            k = g.mobile.filterable.prototype.options.filterCallback;
        g.mobile.filterable.prototype.options.filterCallback = function(c, l) {
            return !this.className.match(j) && k.call(this, c, l)
        }, g.widget("mobile.filterable", g.mobile.filterable, {
            options: {
                filterPlaceholder: "Filter items...",
                filterTheme: null
            },
            _create: function() {
                var a, l, m = this.element,
                    n = ["collapsibleset", "selectmenu", "controlgroup", "listview"],
                    o = {};
                for (this._super(), g.extend(this, {
                        _widget: null
                    }), a = n.length - 1; a > -1; a--) {
                    if (l = n[a], g.mobile[l]) {
                        if (this._setWidget(m.data("mobile-" + l))) {
                            break
                        }
                        o[l + "create"] = "_handleCreate"
                    }
                }
                this._widget || this._on(m, o)
            },
            _handleCreate: function(b) {
                this._setWidget(this.element.data("mobile-" + b.type.substring(0, b.type.length - 6)))
            },
            _trigger: function(l, m, n) {
                return this._widget && "mobile-listview" === this._widget.widgetFullName && "beforefilter" === l && this._widget._trigger("beforefilter", m, n), this._super(l, m, n)
            },
            _setWidget: function(b) {
                return !this._widget && b && (this._widget = b, this._widget._setOptions = i(this, this._widget._setOptions)), this._widget && (this._syncTextInputOptions(this._widget.options), "listview" === this._widget.widgetName && (this._widget.options.hideDividers = !0, this._widget.element.listview("refresh"))), !!this._widget
            },
            _isSearchInternal: function() {
                return this._search && this._search.jqmData("ui-filterable-" + this.uuid + "-internal")
            },
            _setInput: function(a) {
                var l = this.options,
                    m = !0,
                    n = {};
                if (!a) {
                    if (this._isSearchInternal()) {
                        return
                    }
                    m = !1, a = g("<input data-" + g.mobile.ns + "type='search' placeholder='" + l.filterPlaceholder + "'></input>").jqmData("ui-filterable-" + this.uuid + "-internal", !0), g("<form class='ui-filterable'></form>").append(a).submit(function(b) {
                        b.preventDefault(), a.blur()
                    }).insertBefore(this.element), g.mobile.textinput && (null != this.options.filterTheme && (n.theme = l.filterTheme), a.textinput(n))
                }
                this._super(a), this._isSearchInternal() && m && this._search.attr("placeholder", this.options.filterPlaceholder)
            },
            _setOptions: function(a) {
                var b = this._super(a);
                return a.filterPlaceholder !== h && this._isSearchInternal() && this._search.attr("placeholder", a.filterPlaceholder), a.filterTheme !== h && this._search && g.mobile.textinput && this._search.textinput("option", "theme", a.filterTheme), b
            },
            _refreshChildWidget: function() {
                this._refreshingChildWidget = !0, this._superApply(arguments), this._refreshingChildWidget = !1
            },
            refresh: function() {
                this._refreshingChildWidget || this._superApply(arguments)
            },
            _destroy: function() {
                this._isSearchInternal() && this._search.remove(), this._super()
            },
            _syncTextInputOptions: function(a) {
                var b, l = {};
                if (this._isSearchInternal() && g.mobile.textinput) {
                    for (b in g.mobile.textinput.prototype.options) {
                        a[b] !== h && (l[b] = "theme" === b && null != this.options.filterTheme ? this.options.filterTheme : a[b])
                    }
                    this._search.textinput("option", l)
                }
            }
        }), g.widget("mobile.listview", g.mobile.listview, {
            options: {
                filter: !1
            },
            _create: function() {
                return this.options.filter !== !0 || this.element.data("mobile-filterable") || this.element.filterable(), this._super()
            },
            refresh: function() {
                var b;
                this._superApply(arguments), this.options.filter === !0 && (b = this.element.data("mobile-filterable"), b && b.refresh())
            }
        })
    }(d),
    function(g, h) {
        function i() {
            return ++k
        }

        function j(b) {
            return b.hash.length > 1 && decodeURIComponent(b.href.replace(l, "")) === decodeURIComponent(location.href.replace(l, ""))
        }
        var k = 0,
            l = /#.*$/;
        g.widget("ui.tabs", {
            version: "fadf2b312a05040436451c64bbfaf4814bc62c56",
            delay: 300,
            options: {
                active: null,
                collapsible: !1,
                event: "click",
                heightStyle: "content",
                hide: null,
                show: null,
                activate: null,
                beforeActivate: null,
                beforeLoad: null,
                load: null
            },
            _create: function() {
                var a = this,
                    m = this.options;
                this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", m.collapsible).delegate(".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function(c) {
                    g(this).is(".ui-state-disabled") && c.preventDefault()
                }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
                    g(this).closest("li").is(".ui-state-disabled") && this.blur()
                }), this._processTabs(), m.active = this._initialActive(), g.isArray(m.disabled) && (m.disabled = g.unique(m.disabled.concat(g.map(this.tabs.filter(".ui-state-disabled"), function(b) {
                    return a.tabs.index(b)
                }))).sort()), this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(m.active) : g(), this._refresh(), this.active.length && this.load(m.active)
            },
            _initialActive: function() {
                var a = this.options.active,
                    m = this.options.collapsible,
                    n = location.hash.substring(1);
                return null === a && (n && this.tabs.each(function(b, o) {
                    return g(o).attr("aria-controls") === n ? (a = b, !1) : void 0
                }), null === a && (a = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === a || -1 === a) && (a = this.tabs.length ? 0 : !1)), a !== !1 && (a = this.tabs.index(this.tabs.eq(a)), -1 === a && (a = m ? !1 : 0)), !m && a === !1 && this.anchors.length && (a = 0), a
            },
            _getCreateEventData: function() {
                return {
                    tab: this.active,
                    panel: this.active.length ? this._getPanelForTab(this.active) : g()
                }
            },
            _tabKeydown: function(a) {
                var m = g(this.document[0].activeElement).closest("li"),
                    n = this.tabs.index(m),
                    o = !0;
                if (!this._handlePageNav(a)) {
                    switch (a.keyCode) {
                        case g.ui.keyCode.RIGHT:
                        case g.ui.keyCode.DOWN:
                            n++;
                            break;
                        case g.ui.keyCode.UP:
                        case g.ui.keyCode.LEFT:
                            o = !1, n--;
                            break;
                        case g.ui.keyCode.END:
                            n = this.anchors.length - 1;
                            break;
                        case g.ui.keyCode.HOME:
                            n = 0;
                            break;
                        case g.ui.keyCode.SPACE:
                            return a.preventDefault(), clearTimeout(this.activating), void this._activate(n);
                        case g.ui.keyCode.ENTER:
                            return a.preventDefault(), clearTimeout(this.activating), void this._activate(n === this.options.active ? !1 : n);
                        default:
                            return
                    }
                    a.preventDefault(), clearTimeout(this.activating), n = this._focusNextTab(n, o), a.ctrlKey || (m.attr("aria-selected", "false"), this.tabs.eq(n).attr("aria-selected", "true"), this.activating = this._delay(function() {
                        this.option("active", n)
                    }, this.delay))
                }
            },
            _panelKeydown: function(a) {
                this._handlePageNav(a) || a.ctrlKey && a.keyCode === g.ui.keyCode.UP && (a.preventDefault(), this.active.focus())
            },
            _handlePageNav: function(a) {
                return a.altKey && a.keyCode === g.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : a.altKey && a.keyCode === g.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
            },
            _findNextTab: function(a, m) {
                function n() {
                    return a > o && (a = 0), 0 > a && (a = o), a
                }
                for (var o = this.tabs.length - 1; - 1 !== g.inArray(n(), this.options.disabled);) {
                    a = m ? a + 1 : a - 1
                }
                return a
            },
            _focusNextTab: function(c, m) {
                return c = this._findNextTab(c, m), this.tabs.eq(c).focus(), c
            },
            _setOption: function(c, m) {
                return "active" === c ? void this._activate(m) : "disabled" === c ? void this._setupDisabled(m) : (this._super(c, m), "collapsible" === c && (this.element.toggleClass("ui-tabs-collapsible", m), m || this.options.active !== !1 || this._activate(0)), "event" === c && this._setupEvents(m), void("heightStyle" === c && this._setupHeightStyle(m)))
            },
            _tabId: function(b) {
                return b.attr("aria-controls") || "ui-tabs-" + i()
            },
            _sanitizeSelector: function(b) {
                return b ? b.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
            },
            refresh: function() {
                var a = this.options,
                    m = this.tablist.children(":has(a[href])");
                a.disabled = g.map(m.filter(".ui-state-disabled"), function(b) {
                    return m.index(b)
                }), this._processTabs(), a.active !== !1 && this.anchors.length ? this.active.length && !g.contains(this.tablist[0], this.active[0]) ? this.tabs.length === a.disabled.length ? (a.active = !1, this.active = g()) : this._activate(this._findNextTab(Math.max(0, a.active - 1), !1)) : a.active = this.tabs.index(this.active) : (a.active = !1, this.active = g()), this._refresh()
            },
            _refresh: function() {
                this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
                    "aria-selected": "false",
                    tabIndex: -1
                }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                    "aria-expanded": "false",
                    "aria-hidden": "true"
                }), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                    "aria-selected": "true",
                    tabIndex: 0
                }), this._getPanelForTab(this.active).show().attr({
                    "aria-expanded": "true",
                    "aria-hidden": "false"
                })) : this.tabs.eq(0).attr("tabIndex", 0)
            },
            _processTabs: function() {
                var a = this;
                this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist"), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                    role: "tab",
                    tabIndex: -1
                }), this.anchors = this.tabs.map(function() {
                    return g("a", this)[0]
                }).addClass("ui-tabs-anchor").attr({
                    role: "presentation",
                    tabIndex: -1
                }), this.panels = g(), this.anchors.each(function(b, m) {
                    var n, o, p, q = g(m).uniqueId().attr("id"),
                        r = g(m).closest("li"),
                        s = r.attr("aria-controls");
                    j(m) ? (n = m.hash, o = a.element.find(a._sanitizeSelector(n))) : (p = a._tabId(r), n = "#" + p, o = a.element.find(n), o.length || (o = a._createPanel(p), o.insertAfter(a.panels[b - 1] || a.tablist)), o.attr("aria-live", "polite")), o.length && (a.panels = a.panels.add(o)), s && r.data("ui-tabs-aria-controls", s), r.attr({
                        "aria-controls": n.substring(1),
                        "aria-labelledby": q
                    }), o.attr("aria-labelledby", q)
                }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel")
            },
            _getList: function() {
                return this.element.find("ol,ul").eq(0)
            },
            _createPanel: function(a) {
                return g("<div>").attr("id", a).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
            },
            _setupDisabled: function(a) {
                g.isArray(a) && (a.length ? a.length === this.anchors.length && (a = !0) : a = !1);
                for (var m, n = 0; m = this.tabs[n]; n++) {
                    a === !0 || -1 !== g.inArray(n, a) ? g(m).addClass("ui-state-disabled").attr("aria-disabled", "true") : g(m).removeClass("ui-state-disabled").removeAttr("aria-disabled")
                }
                this.options.disabled = a
            },
            _setupEvents: function(a) {
                var m = {
                    click: function(b) {
                        b.preventDefault()
                    }
                };
                a && g.each(a.split(" "), function(c, n) {
                    m[n] = "_eventHandler"
                }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(this.anchors, m), this._on(this.tabs, {
                    keydown: "_tabKeydown"
                }), this._on(this.panels, {
                    keydown: "_panelKeydown"
                }), this._focusable(this.tabs), this._hoverable(this.tabs)
            },
            _setupHeightStyle: function(a) {
                var m, n = this.element.parent();
                "fill" === a ? (m = n.height(), m -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
                    var c = g(this),
                        o = c.css("position");
                    "absolute" !== o && "fixed" !== o && (m -= c.outerHeight(!0))
                }), this.element.children().not(this.panels).each(function() {
                    m -= g(this).outerHeight(!0)
                }), this.panels.each(function() {
                    g(this).height(Math.max(0, m - g(this).innerHeight() + g(this).height()))
                }).css("overflow", "auto")) : "auto" === a && (m = 0, this.panels.each(function() {
                    m = Math.max(m, g(this).height("").height())
                }).height(m))
            },
            _eventHandler: function(a) {
                var m = this.options,
                    n = this.active,
                    o = g(a.currentTarget),
                    p = o.closest("li"),
                    q = p[0] === n[0],
                    r = q && m.collapsible,
                    s = r ? g() : this._getPanelForTab(p),
                    t = n.length ? this._getPanelForTab(n) : g(),
                    u = {
                        oldTab: n,
                        oldPanel: t,
                        newTab: r ? g() : p,
                        newPanel: s
                    };
                a.preventDefault(), p.hasClass("ui-state-disabled") || p.hasClass("ui-tabs-loading") || this.running || q && !m.collapsible || this._trigger("beforeActivate", a, u) === !1 || (m.active = r ? !1 : this.tabs.index(p), this.active = q ? g() : p, this.xhr && this.xhr.abort(), t.length || s.length || g.error("jQuery UI Tabs: Mismatching fragment identifier."), s.length && this.load(this.tabs.index(p), a), this._toggle(a, u))
            },
            _toggle: function(a, m) {
                function n() {
                    p.running = !1, p._trigger("activate", a, m)
                }

                function o() {
                    m.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), q.length && p.options.show ? p._show(q, p.options.show, n) : (q.show(), n())
                }
                var p = this,
                    q = m.newPanel,
                    r = m.oldPanel;
                this.running = !0, r.length && this.options.hide ? this._hide(r, this.options.hide, function() {
                    m.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), o()
                }) : (m.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), r.hide(), o()), r.attr({
                    "aria-expanded": "false",
                    "aria-hidden": "true"
                }), m.oldTab.attr("aria-selected", "false"), q.length && r.length ? m.oldTab.attr("tabIndex", -1) : q.length && this.tabs.filter(function() {
                    return 0 === g(this).attr("tabIndex")
                }).attr("tabIndex", -1), q.attr({
                    "aria-expanded": "true",
                    "aria-hidden": "false"
                }), m.newTab.attr({
                    "aria-selected": "true",
                    tabIndex: 0
                })
            },
            _activate: function(a) {
                var m, n = this._findActive(a);
                n[0] !== this.active[0] && (n.length || (n = this.active), m = n.find(".ui-tabs-anchor")[0], this._eventHandler({
                    target: m,
                    currentTarget: m,
                    preventDefault: g.noop
                }))
            },
            _findActive: function(a) {
                return a === !1 ? g() : this.tabs.eq(a)
            },
            _getIndex: function(b) {
                return "string" == typeof b && (b = this.anchors.index(this.anchors.filter("[href$='" + b + "']"))), b
            },
            _destroy: function() {
                this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), this.tabs.add(this.panels).each(function() {
                    g.data(this, "ui-tabs-destroy") ? g(this).remove() : g(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
                }), this.tabs.each(function() {
                    var a = g(this),
                        m = a.data("ui-tabs-aria-controls");
                    m ? a.attr("aria-controls", m).removeData("ui-tabs-aria-controls") : a.removeAttr("aria-controls")
                }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
            },
            enable: function(a) {
                var b = this.options.disabled;
                b !== !1 && (a === h ? b = !1 : (a = this._getIndex(a), b = g.isArray(b) ? g.map(b, function(c) {
                    return c !== a ? c : null
                }) : g.map(this.tabs, function(c, m) {
                    return m !== a ? m : null
                })), this._setupDisabled(b))
            },
            disable: function(a) {
                var b = this.options.disabled;
                if (b !== !0) {
                    if (a === h) {
                        b = !0
                    } else {
                        if (a = this._getIndex(a), -1 !== g.inArray(a, b)) {
                            return
                        }
                        b = g.isArray(b) ? g.merge([a], b).sort() : [a]
                    }
                    this._setupDisabled(b)
                }
            },
            load: function(a, m) {
                a = this._getIndex(a);
                var n = this,
                    o = this.tabs.eq(a),
                    p = o.find(".ui-tabs-anchor"),
                    q = this._getPanelForTab(o),
                    r = {
                        tab: o,
                        panel: q
                    };
                j(p[0]) || (this.xhr = g.ajax(this._ajaxSettings(p, m, r)), this.xhr && "canceled" !== this.xhr.statusText && (o.addClass("ui-tabs-loading"), q.attr("aria-busy", "true"), this.xhr.success(function(b) {
                    setTimeout(function() {
                        q.html(b), n._trigger("load", m, r)
                    }, 1)
                }).complete(function(c, s) {
                    setTimeout(function() {
                        "abort" === s && n.panels.stop(!1, !0), o.removeClass("ui-tabs-loading"), q.removeAttr("aria-busy"), c === n.xhr && delete n.xhr
                    }, 1)
                })))
            },
            _ajaxSettings: function(a, m, n) {
                var o = this;
                return {
                    url: a.attr("href"),
                    beforeSend: function(c, p) {
                        return o._trigger("beforeLoad", m, g.extend({
                            jqXHR: c,
                            ajaxSettings: p
                        }, n))
                    }
                }
            },
            _getPanelForTab: function(a) {
                var m = g(a).attr("aria-controls");
                return this.element.find(this._sanitizeSelector("#" + m))
            }
        })
    }(d),
    function() {}(d),
    function(k, l) {
        function m(b) {
            o = b.originalEvent, s = o.accelerationIncludingGravity, p = Math.abs(s.x), q = Math.abs(s.y), r = Math.abs(s.z), !l.orientation && (p > 7 || (r > 6 && 8 > q || 8 > r && q > 6) && p > 5) ? n.enabled && n.disable() : n.enabled || n.enable()
        }
        k.mobile.iosorientationfixEnabled = !0;
        var n, o, p, q, r, s, t = navigator.userAgent;
        return /iPhone|iPad|iPod/.test(navigator.platform) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(t) && t.indexOf("AppleWebKit") > -1 ? (n = k.mobile.zoom, void k.mobile.document.on("mobileinit", function() {
            k.mobile.iosorientationfixEnabled && k.mobile.window.bind("orientationchange.iosorientationfix", n.enable).bind("devicemotion.iosorientationfix", m)
        })) : void(k.mobile.iosorientationfixEnabled = !1)
    }(d, this),
    function(c, h, i) {
        function j() {
            k.removeClass("ui-mobile-rendering")
        }
        var k = c("html"),
            l = c.mobile.window;
        c(h.document).trigger("mobileinit"), c.mobile.gradeA() && (c.mobile.ajaxBlacklist && (c.mobile.ajaxEnabled = !1), k.addClass("ui-mobile ui-mobile-rendering"), setTimeout(j, 5000), c.extend(c.mobile, {
            initializePage: function() {
                var a = c.mobile.path,
                    g = c(":jqmData(role='page'), :jqmData(role='dialog')"),
                    m = a.stripHash(a.stripQueryParams(a.parseLocation().hash)),
                    n = c.mobile.path.parseLocation(),
                    o = m ? f.getElementById(m) : i;
                g.length || (g = c("body").wrapInner("<div data-" + c.mobile.ns + "role='page'></div>").children(0)), g.each(function() {
                    var b = c(this);
                    b[0].getAttribute("data-" + c.mobile.ns + "url") || b.attr("data-" + c.mobile.ns + "url", b.attr("id") || a.convertUrlToDataUrl(n.pathname + n.search))
                }), c.mobile.firstPage = g.first(), c.mobile.pageContainer = c.mobile.firstPage.parent().addClass("ui-mobile-viewport").pagecontainer(), c.mobile.navreadyDeferred.resolve(), l.trigger("pagecontainercreate"), c.mobile.loading("show"), j(), c.mobile.hashListeningEnabled && c.mobile.path.isHashValid(location.hash) && (c(o).is(":jqmData(role='page')") || c.mobile.path.isPath(m) || m === c.mobile.dialogHashKey) ? c.event.special.navigate.isPushStateEnabled() ? (c.mobile.navigate.history.stack = [], c.mobile.navigate(c.mobile.path.isPath(location.hash) ? location.hash : location.href)) : l.trigger("hashchange", [!0]) : (c.event.special.navigate.isPushStateEnabled() && c.mobile.navigate.navigator.squash(a.parseLocation().href), c.mobile.changePage(c.mobile.firstPage, {
                    transition: "none",
                    reverse: !0,
                    changeHash: !1,
                    fromHashChange: !0
                }))
            }
        }), c(function() {
            c.support.inlineSVG(), c.mobile.hideUrlBar && h.scrollTo(0, 1), c.mobile.defaultHomeScroll = c.support.scrollTop && 1 !== c.mobile.window.scrollTop() ? 1 : 0, c.mobile.autoInitializePage && c.mobile.initializePage(), c.mobile.hideUrlBar && l.load(c.mobile.silentScroll), c.support.cssPointerEvents || c.mobile.document.delegate(".ui-state-disabled,.ui-disabled", "vclick", function(b) {
                b.preventDefault(), b.stopImmediatePropagation()
            })
        }))
    }(d, this)
});
(function() {
    var M = this;
    var I = M._;
    var b = Array.prototype,
        G = Object.prototype,
        s = Function.prototype;
    var K = b.push,
        N = b.slice,
        O = G.toString,
        w = G.hasOwnProperty;
    var C = Array.isArray,
        D = Object.keys,
        A = s.bind,
        B = Object.create;
    var k = function() {};
    var a = function(Q) {
        if (Q instanceof a) {
            return Q
        }
        if (!(this instanceof a)) {
            return new a(Q)
        }
        this._wrapped = Q
    };
    if (typeof exports !== "undefined") {
        if (typeof module !== "undefined" && module.exports) {
            exports = module.exports = a
        }
        exports._ = a
    } else {
        M._ = a
    }
    a.VERSION = "1.8.3";
    var H = function(S, R, Q) {
        if (R === void 0) {
            return S
        }
        switch (Q == null ? 3 : Q) {
            case 1:
                return function(T) {
                    return S.call(R, T)
                };
            case 2:
                return function(U, T) {
                    return S.call(R, U, T)
                };
            case 3:
                return function(V, U, T) {
                    return S.call(R, V, U, T)
                };
            case 4:
                return function(T, W, V, U) {
                    return S.call(R, T, W, V, U)
                }
        }
        return function() {
            return S.apply(R, arguments)
        }
    };
    var d = function(S, R, Q) {
        if (S == null) {
            return a.identity
        }
        if (a.isFunction(S)) {
            return H(S, R, Q)
        }
        if (a.isObject(S)) {
            return a.matcher(S)
        }
        return a.property(S)
    };
    a.iteratee = function(R, Q) {
        return d(R, Q, Infinity)
    };
    var f = function(Q, R) {
        return function(Y) {
            var X = arguments.length;
            if (X < 2 || Y == null) {
                return Y
            }
            for (var T = 1; T < X; T++) {
                var Z = arguments[T],
                    V = Q(Z),
                    W = V.length;
                for (var S = 0; S < W; S++) {
                    var U = V[S];
                    if (!R || Y[U] === void 0) {
                        Y[U] = Z[U]
                    }
                }
            }
            return Y
        }
    };
    var c = function(Q) {
        if (!a.isObject(Q)) {
            return {}
        }
        if (B) {
            return B(Q)
        }
        k.prototype = Q;
        var R = new k;
        k.prototype = null;
        return R
    };
    var J = function(Q) {
        return function(R) {
            return R == null ? void 0 : R[Q]
        }
    };
    var z = Math.pow(2, 53) - 1;
    var t = J("length");
    var y = function(Q) {
        var R = t(Q);
        return typeof R == "number" && R >= 0 && R <= z
    };
    a.each = a.forEach = function(V, S, Q) {
        S = H(S, Q);
        var R, U;
        if (y(V)) {
            for (R = 0, U = V.length; R < U; R++) {
                S(V[R], R, V)
            }
        } else {
            var T = a.keys(V);
            for (R = 0, U = T.length; R < U; R++) {
                S(V[T[R]], T[R], V)
            }
        }
        return V
    };
    a.map = a.collect = function(W, T, Q) {
        T = d(T, Q);
        var U = !y(W) && a.keys(W),
            V = (U || W).length,
            X = Array(V);
        for (var S = 0; S < V; S++) {
            var R = U ? U[S] : S;
            X[S] = T(W[R], R, W)
        }
        return X
    };

    function j(Q) {
        function R(Y, U, X, V, T, W) {
            for (; T >= 0 && T < W; T += Q) {
                var S = V ? V[T] : T;
                X = U(X, Y[S], S, Y)
            }
            return X
        }
        return function(Y, U, X, S) {
            U = H(U, S, 4);
            var V = !y(Y) && a.keys(Y),
                W = (V || Y).length,
                T = Q > 0 ? 0 : W - 1;
            if (arguments.length < 3) {
                X = Y[V ? V[T] : T];
                T += Q
            }
            return R(Y, U, X, V, T, W)
        }
    }
    a.reduce = a.foldl = a.inject = j(1);
    a.reduceRight = a.foldr = j(-1);
    a.find = a.detect = function(S, T, Q) {
        var R;
        if (y(S)) {
            R = a.findIndex(S, T, Q)
        } else {
            R = a.findKey(S, T, Q)
        }
        if (R !== void 0 && R !== -1) {
            return S[R]
        }
    };
    a.filter = a.select = function(R, S, Q) {
        var T = [];
        S = d(S, Q);
        a.each(R, function(W, U, V) {
            if (S(W, U, V)) {
                T.push(W)
            }
        });
        return T
    };
    a.reject = function(R, S, Q) {
        return a.filter(R, a.negate(d(S)), Q)
    };
    a.every = a.all = function(V, W, Q) {
        W = d(W, Q);
        var T = !y(V) && a.keys(V),
            U = (T || V).length;
        for (var S = 0; S < U; S++) {
            var R = T ? T[S] : S;
            if (!W(V[R], R, V)) {
                return false
            }
        }
        return true
    };
    a.some = a.any = function(V, W, Q) {
        W = d(W, Q);
        var T = !y(V) && a.keys(V),
            U = (T || V).length;
        for (var S = 0; S < U; S++) {
            var R = T ? T[S] : S;
            if (W(V[R], R, V)) {
                return true
            }
        }
        return false
    };
    a.contains = a.includes = a.include = function(T, S, Q, R) {
        if (!y(T)) {
            T = a.values(T)
        }
        if (typeof Q != "number" || R) {
            Q = 0
        }
        return a.indexOf(T, S, Q) >= 0
    };
    a.invoke = function(T, S) {
        var Q = N.call(arguments, 2);
        var R = a.isFunction(S);
        return a.map(T, function(V) {
            var U = R ? S : V[S];
            return U == null ? U : U.apply(V, Q)
        })
    };
    a.pluck = function(R, Q) {
        return a.map(R, a.property(Q))
    };
    a.where = function(R, Q) {
        return a.filter(R, a.matcher(Q))
    };
    a.findWhere = function(R, Q) {
        return a.find(R, a.matcher(Q))
    };
    a.max = function(W, T, R) {
        var X = -Infinity,
            U = -Infinity,
            Y, Q;
        if (T == null && W != null) {
            W = y(W) ? W : a.values(W);
            for (var S = 0, V = W.length; S < V; S++) {
                Y = W[S];
                if (Y > X) {
                    X = Y
                }
            }
        } else {
            T = d(T, R);
            a.each(W, function(ab, Z, aa) {
                Q = T(ab, Z, aa);
                if (Q > U || Q === -Infinity && X === -Infinity) {
                    X = ab;
                    U = Q
                }
            })
        }
        return X
    };
    a.min = function(W, T, R) {
        var X = Infinity,
            U = Infinity,
            Y, Q;
        if (T == null && W != null) {
            W = y(W) ? W : a.values(W);
            for (var S = 0, V = W.length; S < V; S++) {
                Y = W[S];
                if (Y < X) {
                    X = Y
                }
            }
        } else {
            T = d(T, R);
            a.each(W, function(ab, Z, aa) {
                Q = T(ab, Z, aa);
                if (Q < U || Q === Infinity && X === Infinity) {
                    X = ab;
                    U = Q
                }
            })
        }
        return X
    };
    a.shuffle = function(S) {
        var U = y(S) ? S : a.values(S);
        var R = U.length;
        var V = Array(R);
        for (var Q = 0, T; Q < R; Q++) {
            T = a.random(0, Q);
            if (T !== Q) {
                V[Q] = V[T]
            }
            V[T] = U[Q]
        }
        return V
    };
    a.sample = function(S, R, Q) {
        if (R == null || Q) {
            if (!y(S)) {
                S = a.values(S)
            }
            return S[a.random(S.length - 1)]
        }
        return a.shuffle(S).slice(0, Math.max(0, R))
    };
    a.sortBy = function(S, R, Q) {
        R = d(R, Q);
        return a.pluck(a.map(S, function(V, T, U) {
            return {
                value: V,
                index: T,
                criteria: R(V, T, U)
            }
        }).sort(function(V, W) {
            var T = V.criteria;
            var U = W.criteria;
            if (T !== U) {
                if (T > U || T === void 0) {
                    return 1
                }
                if (T < U || U === void 0) {
                    return -1
                }
            }
            return V.index - W.index
        }), "value")
    };
    var u = function(Q) {
        return function(T, S, R) {
            var U = {};
            S = d(S, R);
            a.each(T, function(X, V) {
                var W = S(X, V, T);
                Q(U, X, W)
            });
            return U
        }
    };
    a.groupBy = u(function(R, S, Q) {
        if (a.has(R, Q)) {
            R[Q].push(S)
        } else {
            R[Q] = [S]
        }
    });
    a.indexBy = u(function(R, S, Q) {
        R[Q] = S
    });
    a.countBy = u(function(R, S, Q) {
        if (a.has(R, Q)) {
            R[Q]++
        } else {
            R[Q] = 1
        }
    });
    a.toArray = function(Q) {
        if (!Q) {
            return []
        }
        if (a.isArray(Q)) {
            return N.call(Q)
        }
        if (y(Q)) {
            return a.map(Q, a.identity)
        }
        return a.values(Q)
    };
    a.size = function(Q) {
        if (Q == null) {
            return 0
        }
        return y(Q) ? Q.length : a.keys(Q).length
    };
    a.partition = function(S, U, Q) {
        U = d(U, Q);
        var T = [],
            R = [];
        a.each(S, function(X, V, W) {
            (U(X, V, W) ? T : R).push(X)
        });
        return [T, R]
    };
    a.first = a.head = a.take = function(Q, S, R) {
        if (Q == null) {
            return void 0
        }
        if (S == null || R) {
            return Q[0]
        }
        return a.initial(Q, Q.length - S)
    };
    a.initial = function(Q, S, R) {
        return N.call(Q, 0, Math.max(0, Q.length - (S == null || R ? 1 : S)))
    };
    a.last = function(Q, S, R) {
        if (Q == null) {
            return void 0
        }
        if (S == null || R) {
            return Q[Q.length - 1]
        }
        return a.rest(Q, Math.max(0, Q.length - S))
    };
    a.rest = a.tail = a.drop = function(Q, S, R) {
        return N.call(Q, S == null || R ? 1 : S)
    };
    a.compact = function(Q) {
        return a.filter(Q, a.identity)
    };
    var r = function(S, X, Z, Y) {
        var W = [],
            R = 0;
        for (var Q = Y || 0, V = t(S); Q < V; Q++) {
            var aa = S[Q];
            if (y(aa) && (a.isArray(aa) || a.isArguments(aa))) {
                if (!X) {
                    aa = r(aa, X, Z)
                }
                var T = 0,
                    U = aa.length;
                W.length += U;
                while (T < U) {
                    W[R++] = aa[T++]
                }
            } else {
                if (!Z) {
                    W[R++] = aa
                }
            }
        }
        return W
    };
    a.flatten = function(Q, R) {
        return r(Q, R, false)
    };
    a.without = function(Q) {
        return a.difference(Q, N.call(arguments, 1))
    };
    a.uniq = a.unique = function(Q, U, V, S) {
        if (!a.isBoolean(U)) {
            S = V;
            V = U;
            U = false
        }
        if (V != null) {
            V = d(V, S)
        }
        var X = [];
        var Y = [];
        for (var T = 0, W = t(Q); T < W; T++) {
            var Z = Q[T],
                R = V ? V(Z, T, Q) : Z;
            if (U) {
                if (!T || Y !== R) {
                    X.push(Z)
                }
                Y = R
            } else {
                if (V) {
                    if (!a.contains(Y, R)) {
                        Y.push(R);
                        X.push(Z)
                    }
                } else {
                    if (!a.contains(X, Z)) {
                        X.push(Z)
                    }
                }
            }
        }
        return X
    };
    a.union = function() {
        return a.uniq(r(arguments, true, true))
    };
    a.intersection = function(R) {
        var W = [];
        var Q = arguments.length;
        for (var S = 0, V = t(R); S < V; S++) {
            var T = R[S];
            if (a.contains(W, T)) {
                continue
            }
            for (var U = 1; U < Q; U++) {
                if (!a.contains(arguments[U], T)) {
                    break
                }
            }
            if (U === Q) {
                W.push(T)
            }
        }
        return W
    };
    a.difference = function(Q) {
        var R = r(arguments, true, true, 1);
        return a.filter(Q, function(S) {
            return !a.contains(R, S)
        })
    };
    a.zip = function() {
        return a.unzip(arguments)
    };
    a.unzip = function(Q) {
        var S = Q && a.max(Q, t).length || 0;
        var T = Array(S);
        for (var R = 0; R < S; R++) {
            T[R] = a.pluck(Q, R)
        }
        return T
    };
    a.object = function(S, U) {
        var T = {};
        for (var Q = 0, R = t(S); Q < R; Q++) {
            if (U) {
                T[S[Q]] = U[Q]
            } else {
                T[S[Q][0]] = S[Q][1]
            }
        }
        return T
    };

    function i(Q) {
        return function(R, V, S) {
            V = d(V, S);
            var U = t(R);
            var T = Q > 0 ? 0 : U - 1;
            for (; T >= 0 && T < U; T += Q) {
                if (V(R[T], T, R)) {
                    return T
                }
            }
            return -1
        }
    }
    a.findIndex = i(1);
    a.findLastIndex = i(-1);
    a.sortedIndex = function(Q, W, T, R) {
        T = d(T, R, 1);
        var X = T(W);
        var U = 0,
            S = t(Q);
        while (U < S) {
            var V = Math.floor((U + S) / 2);
            if (T(Q[V]) < X) {
                U = V + 1
            } else {
                S = V
            }
        }
        return U
    };

    function h(Q, R, S) {
        return function(T, W, V) {
            var U = 0,
                X = t(T);
            if (typeof V == "number") {
                if (Q > 0) {
                    U = V >= 0 ? V : Math.max(V + X, U)
                } else {
                    X = V >= 0 ? Math.min(V + 1, X) : V + X + 1
                }
            } else {
                if (S && V && X) {
                    V = S(T, W);
                    return T[V] === W ? V : -1
                }
            }
            if (W !== W) {
                V = R(N.call(T, U, X), a.isNaN);
                return V >= 0 ? V + U : -1
            }
            for (V = Q > 0 ? U : X - 1; V >= 0 && V < X; V += Q) {
                if (T[V] === W) {
                    return V
                }
            }
            return -1
        }
    }
    a.indexOf = h(1, a.findIndex, a.sortedIndex);
    a.lastIndexOf = h(-1, a.findLastIndex);
    a.range = function(T, V, U) {
        if (V == null) {
            V = T || 0;
            T = 0
        }
        U = U || 1;
        var R = Math.max(Math.ceil((V - T) / U), 0);
        var S = Array(R);
        for (var Q = 0; Q < R; Q++, T += U) {
            S[Q] = T
        }
        return S
    };
    var q = function(W, R, T, S, Q) {
        if (!(S instanceof R)) {
            return W.apply(T, Q)
        }
        var V = c(W.prototype);
        var U = W.apply(V, Q);
        if (a.isObject(U)) {
            return U
        }
        return V
    };
    a.bind = function(T, S) {
        if (A && T.bind === A) {
            return A.apply(T, N.call(arguments, 1))
        }
        if (!a.isFunction(T)) {
            throw new TypeError("Bind must be called on a function")
        }
        var Q = N.call(arguments, 2);
        var R = function() {
            return q(T, R, S, this, Q.concat(N.call(arguments)))
        };
        return R
    };
    a.partial = function(S) {
        var R = N.call(arguments, 1);
        var Q = function() {
            var W = 0,
                V = R.length;
            var T = Array(V);
            for (var U = 0; U < V; U++) {
                T[U] = R[U] === a ? arguments[W++] : R[U]
            }
            while (W < arguments.length) {
                T.push(arguments[W++])
            }
            return q(S, Q, this, this, T)
        };
        return Q
    };
    a.bindAll = function(T) {
        var Q, S = arguments.length,
            R;
        if (S <= 1) {
            throw new Error("bindAll must be passed function names")
        }
        for (Q = 1; Q < S; Q++) {
            R = arguments[Q];
            T[R] = a.bind(T[R], T)
        }
        return T
    };
    a.memoize = function(Q, R) {
        var S = function(V) {
            var U = S.cache;
            var T = "" + (R ? R.apply(this, arguments) : V);
            if (!a.has(U, T)) {
                U[T] = Q.apply(this, arguments)
            }
            return U[T]
        };
        S.cache = {};
        return S
    };
    a.delay = function(R, S) {
        var Q = N.call(arguments, 2);
        return setTimeout(function() {
            return R.apply(null, Q)
        }, S)
    };
    a.defer = a.partial(a.delay, a, 1);
    a.throttle = function(S, Y, U) {
        var R, Q, W;
        var X = null;
        var V = 0;
        if (!U) {
            U = {}
        }
        var T = function() {
            V = U.leading === false ? 0 : a.now();
            X = null;
            W = S.apply(R, Q);
            if (!X) {
                R = Q = null
            }
        };
        return function() {
            var Z = a.now();
            if (!V && U.leading === false) {
                V = Z
            }
            var aa = Y - (Z - V);
            R = this;
            Q = arguments;
            if (aa <= 0 || aa > Y) {
                if (X) {
                    clearTimeout(X);
                    X = null
                }
                V = Z;
                W = S.apply(R, Q);
                if (!X) {
                    R = Q = null
                }
            } else {
                if (!X && U.trailing !== false) {
                    X = setTimeout(T, aa)
                }
            }
            return W
        }
    };
    a.debounce = function(S, Y, T) {
        var W, Q, R, X, V;
        var U = function() {
            var Z = a.now() - X;
            if (Z < Y && Z >= 0) {
                W = setTimeout(U, Y - Z)
            } else {
                W = null;
                if (!T) {
                    V = S.apply(R, Q);
                    if (!W) {
                        R = Q = null
                    }
                }
            }
        };
        return function() {
            R = this;
            Q = arguments;
            X = a.now();
            var Z = T && !W;
            if (!W) {
                W = setTimeout(U, Y)
            }
            if (Z) {
                V = S.apply(R, Q);
                R = Q = null
            }
            return V
        }
    };
    a.wrap = function(Q, R) {
        return a.partial(R, Q)
    };
    a.negate = function(Q) {
        return function() {
            return !Q.apply(this, arguments)
        }
    };
    a.compose = function() {
        var Q = arguments;
        var R = Q.length - 1;
        return function() {
            var S = R;
            var T = Q[R].apply(this, arguments);
            while (S--) {
                T = Q[S].call(this, T)
            }
            return T
        }
    };
    a.after = function(R, Q) {
        return function() {
            if (--R < 1) {
                return Q.apply(this, arguments)
            }
        }
    };
    a.before = function(S, Q) {
        var R;
        return function() {
            if (--S > 0) {
                R = Q.apply(this, arguments)
            }
            if (S <= 1) {
                Q = null
            }
            return R
        }
    };
    a.once = a.partial(a.before, 2);
    var v = !{
        toString: null
    }.propertyIsEnumerable("toString");
    var F = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];

    function e(T, R) {
        var S = F.length;
        var Q = T.constructor;
        var V = (a.isFunction(Q) && Q.prototype) || G;
        var U = "constructor";
        if (a.has(T, U) && !a.contains(R, U)) {
            R.push(U)
        }
        while (S--) {
            U = F[S];
            if (U in T && T[U] !== V[U] && !a.contains(R, U)) {
                R.push(U)
            }
        }
    }
    a.keys = function(S) {
        if (!a.isObject(S)) {
            return []
        }
        if (D) {
            return D(S)
        }
        var R = [];
        for (var Q in S) {
            if (a.has(S, Q)) {
                R.push(Q)
            }
        }
        if (v) {
            e(S, R)
        }
        return R
    };
    a.allKeys = function(S) {
        if (!a.isObject(S)) {
            return []
        }
        var R = [];
        for (var Q in S) {
            R.push(Q)
        }
        if (v) {
            e(S, R)
        }
        return R
    };
    a.values = function(T) {
        var R = a.keys(T);
        var S = R.length;
        var U = Array(S);
        for (var Q = 0; Q < S; Q++) {
            U[Q] = T[R[Q]]
        }
        return U
    };
    a.mapObject = function(W, T, Q) {
        T = d(T, Q);
        var U = a.keys(W),
            V = U.length,
            X = {},
            R;
        for (var S = 0; S < V; S++) {
            R = U[S];
            X[R] = T(W[R], R, W)
        }
        return X
    };
    a.pairs = function(T) {
        var R = a.keys(T);
        var S = R.length;
        var U = Array(S);
        for (var Q = 0; Q < S; Q++) {
            U[Q] = [R[Q], T[R[Q]]]
        }
        return U
    };
    a.invert = function(T) {
        var U = {};
        var R = a.keys(T);
        for (var Q = 0, S = R.length; Q < S; Q++) {
            U[T[R[Q]]] = R[Q]
        }
        return U
    };
    a.functions = a.methods = function(S) {
        var R = [];
        for (var Q in S) {
            if (a.isFunction(S[Q])) {
                R.push(Q)
            }
        }
        return R.sort()
    };
    a.extend = f(a.allKeys);
    a.extendOwn = a.assign = f(a.keys);
    a.findKey = function(V, W, Q) {
        W = d(W, Q);
        var T = a.keys(V),
            S;
        for (var R = 0, U = T.length; R < U; R++) {
            S = T[R];
            if (W(V[S], S, V)) {
                return S
            }
        }
    };
    a.pick = function(X, Y, Q) {
        var Z = {},
            W = X,
            S, U;
        if (W == null) {
            return Z
        }
        if (a.isFunction(Y)) {
            U = a.allKeys(W);
            S = H(Y, Q)
        } else {
            U = r(arguments, false, false, 1);
            S = function(ad, ab, ac) {
                return ab in ac
            };
            W = Object(W)
        }
        for (var R = 0, V = U.length; R < V; R++) {
            var T = U[R];
            var aa = W[T];
            if (S(aa, T, W)) {
                Z[T] = aa
            }
        }
        return Z
    };
    a.omit = function(T, R, Q) {
        if (a.isFunction(R)) {
            R = a.negate(R)
        } else {
            var S = a.map(r(arguments, false, false, 1), String);
            R = function(V, U) {
                return !a.contains(S, U)
            }
        }
        return a.pick(T, R, Q)
    };
    a.defaults = f(a.allKeys, true);
    a.create = function(R, Q) {
        var S = c(R);
        if (Q) {
            a.extendOwn(S, Q)
        }
        return S
    };
    a.clone = function(Q) {
        if (!a.isObject(Q)) {
            return Q
        }
        return a.isArray(Q) ? Q.slice() : a.extend({}, Q)
    };
    a.tap = function(R, Q) {
        Q(R);
        return R
    };
    a.isMatch = function(W, Q) {
        var T = a.keys(Q),
            U = T.length;
        if (W == null) {
            return !U
        }
        var V = Object(W);
        for (var R = 0; R < U; R++) {
            var S = T[R];
            if (Q[S] !== V[S] || !(S in V)) {
                return false
            }
        }
        return true
    };
    var l = function(Q, U, T, W) {
        if (Q === U) {
            return Q !== 0 || 1 / Q === 1 / U
        }
        if (Q == null || U == null) {
            return Q === U
        }
        if (Q instanceof a) {
            Q = Q._wrapped
        }
        if (U instanceof a) {
            U = U._wrapped
        }
        var X = O.call(Q);
        if (X !== O.call(U)) {
            return false
        }
        switch (X) {
            case "[object RegExp]":
            case "[object String]":
                return "" + Q === "" + U;
            case "[object Number]":
                if (+Q !== +Q) {
                    return +U !== +U
                }
                return +Q === 0 ? 1 / +Q === 1 / U : +Q === +U;
            case "[object Date]":
            case "[object Boolean]":
                return +Q === +U
        }
        var S = X === "[object Array]";
        if (!S) {
            if (typeof Q != "object" || typeof U != "object") {
                return false
            }
            var R = Q.constructor,
                V = U.constructor;
            if (R !== V && !(a.isFunction(R) && R instanceof R && a.isFunction(V) && V instanceof V) && ("constructor" in Q && "constructor" in U)) {
                return false
            }
        }
        T = T || [];
        W = W || [];
        var aa = T.length;
        while (aa--) {
            if (T[aa] === Q) {
                return W[aa] === U
            }
        }
        T.push(Q);
        W.push(U);
        if (S) {
            aa = Q.length;
            if (aa !== U.length) {
                return false
            }
            while (aa--) {
                if (!l(Q[aa], U[aa], T, W)) {
                    return false
                }
            }
        } else {
            var Z = a.keys(Q),
                Y;
            aa = Z.length;
            if (a.keys(U).length !== aa) {
                return false
            }
            while (aa--) {
                Y = Z[aa];
                if (!(a.has(U, Y) && l(Q[Y], U[Y], T, W))) {
                    return false
                }
            }
        }
        T.pop();
        W.pop();
        return true
    };
    a.isEqual = function(Q, R) {
        return l(Q, R)
    };
    a.isEmpty = function(Q) {
        if (Q == null) {
            return true
        }
        if (y(Q) && (a.isArray(Q) || a.isString(Q) || a.isArguments(Q))) {
            return Q.length === 0
        }
        return a.keys(Q).length === 0
    };
    a.isElement = function(Q) {
        return !!(Q && Q.nodeType === 1)
    };
    a.isArray = C || function(Q) {
        return O.call(Q) === "[object Array]"
    };
    a.isObject = function(Q) {
        var R = typeof Q;
        return R === "function" || R === "object" && !!Q
    };
    a.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(Q) {
        a["is" + Q] = function(R) {
            return O.call(R) === "[object " + Q + "]"
        }
    });
    if (!a.isArguments(arguments)) {
        a.isArguments = function(Q) {
            return a.has(Q, "callee")
        }
    }
    if (typeof /./ != "function" && typeof Int8Array != "object") {
        a.isFunction = function(Q) {
            return typeof Q == "function" || false
        }
    }
    a.isFinite = function(Q) {
        return isFinite(Q) && !isNaN(parseFloat(Q))
    };
    a.isNaN = function(Q) {
        return a.isNumber(Q) && Q !== +Q
    };
    a.isBoolean = function(Q) {
        return Q === true || Q === false || O.call(Q) === "[object Boolean]"
    };
    a.isNull = function(Q) {
        return Q === null
    };
    a.isUndefined = function(Q) {
        return Q === void 0
    };
    a.has = function(R, Q) {
        return R != null && w.call(R, Q)
    };
    a.noConflict = function() {
        M._ = I;
        return this
    };
    a.identity = function(Q) {
        return Q
    };
    a.constant = function(Q) {
        return function() {
            return Q
        }
    };
    a.noop = function() {};
    a.property = J;
    a.propertyOf = function(Q) {
        return Q == null ? function() {} : function(R) {
            return Q[R]
        }
    };
    a.matcher = a.matches = function(Q) {
        Q = a.extendOwn({}, Q);
        return function(R) {
            return a.isMatch(R, Q)
        }
    };
    a.times = function(U, T, R) {
        var Q = Array(Math.max(0, U));
        T = H(T, R, 1);
        for (var S = 0; S < U; S++) {
            Q[S] = T(S)
        }
        return Q
    };
    a.random = function(R, Q) {
        if (Q == null) {
            Q = R;
            R = 0
        }
        return R + Math.floor(Math.random() * (Q - R + 1))
    };
    a.now = Date.now || function() {
        return new Date().getTime()
    };
    var n = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    };
    var P = a.invert(n);
    var g = function(R) {
        var Q = function(V) {
            return R[V]
        };
        var T = "(?:" + a.keys(R).join("|") + ")";
        var U = RegExp(T);
        var S = RegExp(T, "g");
        return function(V) {
            V = V == null ? "" : "" + V;
            return U.test(V) ? V.replace(S, Q) : V
        }
    };
    a.escape = g(n);
    a.unescape = g(P);
    a.result = function(R, S, Q) {
        var T = R == null ? void 0 : R[S];
        if (T === void 0) {
            T = Q
        }
        return a.isFunction(T) ? T.call(R) : T
    };
    var x = 0;
    a.uniqueId = function(R) {
        var Q = ++x + "";
        return R ? R + Q : Q
    };
    a.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var E = /(.)^/;
    var p = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\u2028": "u2028",
        "\u2029": "u2029"
    };
    var o = /\\|'|\r|\n|\u2028|\u2029/g;
    var m = function(Q) {
        return "\\" + p[Q]
    };
    a.template = function(Z, W, U) {
        if (!W && U) {
            W = U
        }
        W = a.defaults({}, W, a.templateSettings);
        var T = RegExp([(W.escape || E).source, (W.interpolate || E).source, (W.evaluate || E).source].join("|") + "|$", "g");
        var S = 0;
        var X = "__p+='";
        Z.replace(T, function(ad, aa, ac, ab, ae) {
            X += Z.slice(S, ae).replace(o, m);
            S = ae + ad.length;
            if (aa) {
                X += "'+\n((__t=(" + aa + "))==null?'':_.escape(__t))+\n'"
            } else {
                if (ac) {
                    X += "'+\n((__t=(" + ac + "))==null?'':__t)+\n'"
                } else {
                    if (ab) {
                        X += "';\n" + ab + "\n__p+='"
                    }
                }
            }
            return ad
        });
        X += "';\n";
        if (!W.variable) {
            X = "with(obj||{}){\n" + X + "}\n"
        }
        X = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + X + "return __p;\n";
        try {
            var V = new Function(W.variable || "obj", "_", X)
        } catch (R) {
            R.source = X;
            throw R
        }
        var Y = function(aa) {
            return V.call(this, aa, a)
        };
        var Q = W.variable || "obj";
        Y.source = "function(" + Q + "){\n" + X + "}";
        return Y
    };
    a.chain = function(R) {
        var Q = a(R);
        Q._chain = true;
        return Q
    };
    var L = function(Q, R) {
        return Q._chain ? a(R).chain() : R
    };
    a.mixin = function(Q) {
        a.each(a.functions(Q), function(S) {
            var R = a[S] = Q[S];
            a.prototype[S] = function() {
                var T = [this._wrapped];
                K.apply(T, arguments);
                return L(this, R.apply(a, T))
            }
        })
    };
    a.mixin(a);
    a.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(R) {
        var Q = b[R];
        a.prototype[R] = function() {
            var S = this._wrapped;
            Q.apply(S, arguments);
            if ((R === "shift" || R === "splice") && S.length === 0) {
                delete S[0]
            }
            return L(this, S)
        }
    });
    a.each(["concat", "join", "slice"], function(R) {
        var Q = b[R];
        a.prototype[R] = function() {
            return L(this, Q.apply(this._wrapped, arguments))
        }
    });
    a.prototype.value = function() {
        return this._wrapped
    };
    a.prototype.valueOf = a.prototype.toJSON = a.prototype.value;
    a.prototype.toString = function() {
        return "" + this._wrapped
    };
    if (typeof define === "function" && define.amd) {
        define("underscore", [], function() {
            return a
        })
    }
}.call(this));
(function(d) {
    var f = (typeof self == "object" && self.self === self && self) || (typeof global == "object" && global.global === global && global);
    if (typeof define === "function" && define.amd) {
        define(["underscore", "jquery", "exports"], function(g, e, h) {
            f.Backbone = d(f, h, g, e)
        })
    } else {
        if (typeof exports !== "undefined") {
            var b = require("underscore"),
                a;
            try {
                a = require("jquery")
            } catch (c) {}
            d(f, exports, b, a)
        } else {
            f.Backbone = d(f, {}, f._, (f.jQuery || f.Zepto || f.ender || f.$))
        }
    }
})(function(C, f, b, a) {
    var B = C.Backbone;
    var H = Array.prototype.slice;
    f.VERSION = "1.3.3";
    f.$ = a;
    f.noConflict = function() {
        C.Backbone = B;
        return this
    };
    f.emulateHTTP = false;
    f.emulateJSON = false;
    var c = function(R, S, Q) {
        switch (R) {
            case 1:
                return function() {
                    return b[S](this[Q])
                };
            case 2:
                return function(T) {
                    return b[S](this[Q], T)
                };
            case 3:
                return function(U, T) {
                    return b[S](this[Q], g(U, this), T)
                };
            case 4:
                return function(V, U, T) {
                    return b[S](this[Q], g(V, this), U, T)
                };
            default:
                return function() {
                    var T = H.call(arguments);
                    T.unshift(this[Q]);
                    return b[S].apply(b, T)
                }
        }
    };
    var e = function(R, S, Q) {
        b.each(S, function(T, U) {
            if (b[U]) {
                R.prototype[U] = c(T, U, Q)
            }
        })
    };
    var g = function(R, Q) {
        if (b.isFunction(R)) {
            return R
        }
        if (b.isObject(R) && !Q._isModel(R)) {
            return t(R)
        }
        if (b.isString(R)) {
            return function(S) {
                return S.get(R)
            }
        }
        return R
    };
    var t = function(Q) {
        var R = b.matches(Q);
        return function(S) {
            return R(S.attributes)
        }
    };
    var l = f.Events = {};
    var n = /\s+/;
    var m = function(T, R, U, Q, W) {
        var S = 0,
            V;
        if (U && typeof U === "object") {
            if (Q !== void 0 && "context" in W && W.context === void 0) {
                W.context = Q
            }
            for (V = b.keys(U); S < V.length; S++) {
                R = m(T, R, V[S], U[V[S]], W)
            }
        } else {
            if (U && n.test(U)) {
                for (V = U.split(n); S < V.length; S++) {
                    R = T(R, V[S], Q, W)
                }
            } else {
                R = T(R, U, Q, W)
            }
        }
        return R
    };
    l.on = function(S, Q, R) {
        return q(this, S, Q, R)
    };
    var q = function(V, U, Q, R, T) {
        V._events = m(x, V._events || {}, U, Q, {
            context: R,
            ctx: V,
            listening: T
        });
        if (T) {
            var S = V._listeners || (V._listeners = {});
            S[T.id] = T
        }
        return V
    };
    l.listenTo = function(V, U, Q) {
        if (!V) {
            return this
        }
        var R = V._listenId || (V._listenId = b.uniqueId("l"));
        var T = this._listeningTo || (this._listeningTo = {});
        var S = T[R];
        if (!S) {
            var W = this._listenId || (this._listenId = b.uniqueId("l"));
            S = T[R] = {
                obj: V,
                objId: R,
                id: W,
                listeningTo: T,
                count: 0
            }
        }
        q(V, U, Q, this, S);
        return this
    };
    var x = function(T, W, Q, X) {
        if (Q) {
            var U = T[W] || (T[W] = []);
            var R = X.context,
                S = X.ctx,
                V = X.listening;
            if (V) {
                V.count++
            }
            U.push({
                callback: Q,
                context: R,
                ctx: R || S,
                listening: V
            })
        }
        return T
    };
    l.off = function(S, Q, R) {
        if (!this._events) {
            return this
        }
        this._events = m(w, this._events, S, Q, {
            context: R,
            listeners: this._listeners
        });
        return this
    };
    l.stopListening = function(W, V, Q) {
        var U = this._listeningTo;
        if (!U) {
            return this
        }
        var S = W ? [W._listenId] : b.keys(U);
        for (var R = 0; R < S.length; R++) {
            var T = U[S[R]];
            if (!T) {
                break
            }
            T.obj.off(V, Q, this)
        }
        return this
    };
    var w = function(S, aa, Q, ac) {
        if (!S) {
            return
        }
        var V = 0,
            Z;
        var R = ac.context,
            Y = ac.listeners;
        if (!aa && !Q && !R) {
            var W = b.keys(Y);
            for (; V < W.length; V++) {
                Z = Y[W[V]];
                delete Y[Z.id];
                delete Z.listeningTo[Z.objId]
            }
            return
        }
        var ab = aa ? [aa] : b.keys(S);
        for (; V < ab.length; V++) {
            aa = ab[V];
            var U = S[aa];
            if (!U) {
                break
            }
            var ad = [];
            for (var X = 0; X < U.length; X++) {
                var T = U[X];
                if (Q && Q !== T.callback && Q !== T.callback._callback || R && R !== T.context) {
                    ad.push(T)
                } else {
                    Z = T.listening;
                    if (Z && --Z.count === 0) {
                        delete Y[Z.id];
                        delete Z.listeningTo[Z.objId]
                    }
                }
            }
            if (ad.length) {
                S[aa] = ad
            } else {
                delete S[aa]
            }
        }
        return S
    };
    l.once = function(T, Q, R) {
        var S = m(y, {}, T, Q, b.bind(this.off, this));
        if (typeof T === "string" && R == null) {
            Q = void 0
        }
        return this.on(S, Q, R)
    };
    l.listenToOnce = function(T, S, Q) {
        var R = m(y, {}, S, Q, b.bind(this.stopListening, this, T));
        return this.listenTo(T, R)
    };
    var y = function(R, S, Q, T) {
        if (Q) {
            var U = R[S] = b.once(function() {
                T(S, U);
                Q.apply(this, arguments)
            });
            U._callback = Q
        }
        return R
    };
    l.trigger = function(T) {
        if (!this._events) {
            return this
        }
        var S = Math.max(0, arguments.length - 1);
        var Q = Array(S);
        for (var R = 0; R < S; R++) {
            Q[R] = arguments[R + 1]
        }
        m(K, this._events, T, void 0, Q);
        return this
    };
    var K = function(V, U, S, R) {
        if (V) {
            var T = V[U];
            var Q = V.all;
            if (T && Q) {
                Q = Q.slice()
            }
            if (T) {
                L(T, R)
            }
            if (Q) {
                L(Q, [U].concat(R))
            }
        }
        return V
    };
    var L = function(V, T) {
        var U, W = -1,
            X = V.length,
            Q = T[0],
            R = T[1],
            S = T[2];
        switch (T.length) {
            case 0:
                while (++W < X) {
                    (U = V[W]).callback.call(U.ctx)
                }
                return;
            case 1:
                while (++W < X) {
                    (U = V[W]).callback.call(U.ctx, Q)
                }
                return;
            case 2:
                while (++W < X) {
                    (U = V[W]).callback.call(U.ctx, Q, R)
                }
                return;
            case 3:
                while (++W < X) {
                    (U = V[W]).callback.call(U.ctx, Q, R, S)
                }
                return;
            default:
                while (++W < X) {
                    (U = V[W]).callback.apply(U.ctx, T)
                }
                return
        }
    };
    l.bind = l.on;
    l.unbind = l.off;
    b.extend(f, l);
    var s = f.Model = function(Q, T) {
        var R = Q || {};
        T || (T = {});
        this.cid = b.uniqueId(this.cidPrefix);
        this.attributes = {};
        if (T.collection) {
            this.collection = T.collection
        }
        if (T.parse) {
            R = this.parse(R, T) || {}
        }
        var S = b.result(this, "defaults");
        R = b.defaults(b.extend({}, S, R), S);
        this.set(R, T);
        this.changed = {};
        this.initialize.apply(this, arguments)
    };
    b.extend(s.prototype, l, {
        changed: null,
        validationError: null,
        idAttribute: "id",
        cidPrefix: "c",
        initialize: function() {},
        toJSON: function(Q) {
            return b.clone(this.attributes)
        },
        sync: function() {
            return f.sync.apply(this, arguments)
        },
        get: function(Q) {
            return this.attributes[Q]
        },
        escape: function(Q) {
            return b.escape(this.get(Q))
        },
        has: function(Q) {
            return this.get(Q) != null
        },
        matches: function(Q) {
            return !!b.iteratee(Q, this)(this.attributes)
        },
        set: function(X, ac, Y) {
            if (X == null) {
                return this
            }
            var R;
            if (typeof X === "object") {
                R = X;
                Y = ac
            } else {
                (R = {})[X] = ac
            }
            Y || (Y = {});
            if (!this._validate(R, Y)) {
                return false
            }
            var ab = Y.unset;
            var aa = Y.silent;
            var T = [];
            var U = this._changing;
            this._changing = true;
            if (!U) {
                this._previousAttributes = b.clone(this.attributes);
                this.changed = {}
            }
            var V = this.attributes;
            var S = this.changed;
            var Z = this._previousAttributes;
            for (var Q in R) {
                ac = R[Q];
                if (!b.isEqual(V[Q], ac)) {
                    T.push(Q)
                }
                if (!b.isEqual(Z[Q], ac)) {
                    S[Q] = ac
                } else {
                    delete S[Q]
                }
                ab ? delete V[Q] : V[Q] = ac
            }
            if (this.idAttribute in R) {
                this.id = this.get(this.idAttribute)
            }
            if (!aa) {
                if (T.length) {
                    this._pending = Y
                }
                for (var W = 0; W < T.length; W++) {
                    this.trigger("change:" + T[W], this, V[T[W]], Y)
                }
            }
            if (U) {
                return this
            }
            if (!aa) {
                while (this._pending) {
                    Y = this._pending;
                    this._pending = false;
                    this.trigger("change", this, Y)
                }
            }
            this._pending = false;
            this._changing = false;
            return this
        },
        unset: function(Q, R) {
            return this.set(Q, void 0, b.extend({}, R, {
                unset: true
            }))
        },
        clear: function(S) {
            var Q = {};
            for (var R in this.attributes) {
                Q[R] = void 0
            }
            return this.set(Q, b.extend({}, S, {
                unset: true
            }))
        },
        hasChanged: function(Q) {
            if (Q == null) {
                return !b.isEmpty(this.changed)
            }
            return b.has(this.changed, Q)
        },
        changedAttributes: function(S) {
            if (!S) {
                return this.hasChanged() ? b.clone(this.changed) : false
            }
            var T = this._changing ? this._previousAttributes : this.attributes;
            var R = {};
            for (var Q in S) {
                var U = S[Q];
                if (b.isEqual(T[Q], U)) {
                    continue
                }
                R[Q] = U
            }
            return b.size(R) ? R : false
        },
        previous: function(Q) {
            if (Q == null || !this._previousAttributes) {
                return null
            }
            return this._previousAttributes[Q]
        },
        previousAttributes: function() {
            return b.clone(this._previousAttributes)
        },
        fetch: function(R) {
            R = b.extend({
                parse: true
            }, R);
            var Q = this;
            var S = R.success;
            R.success = function(T) {
                var U = R.parse ? Q.parse(T, R) : T;
                if (!Q.set(U, R)) {
                    return false
                }
                if (S) {
                    S.call(R.context, Q, T, R)
                }
                Q.trigger("sync", Q, T, R)
            };
            P(this, R);
            return this.sync("read", this, R)
        },
        save: function(S, X, V) {
            var R;
            if (S == null || typeof S === "object") {
                R = S;
                V = X
            } else {
                (R = {})[S] = X
            }
            V = b.extend({
                validate: true,
                parse: true
            }, V);
            var Y = V.wait;
            if (R && !Y) {
                if (!this.set(R, V)) {
                    return false
                }
            } else {
                if (!this._validate(R, V)) {
                    return false
                }
            }
            var U = this;
            var W = V.success;
            var Q = this.attributes;
            V.success = function(aa) {
                U.attributes = Q;
                var ab = V.parse ? U.parse(aa, V) : aa;
                if (Y) {
                    ab = b.extend({}, R, ab)
                }
                if (ab && !U.set(ab, V)) {
                    return false
                }
                if (W) {
                    W.call(V.context, U, aa, V)
                }
                U.trigger("sync", U, aa, V)
            };
            P(this, V);
            if (R && Y) {
                this.attributes = b.extend({}, Q, R)
            }
            var T = this.isNew() ? "create" : (V.patch ? "patch" : "update");
            if (T === "patch" && !V.attrs) {
                V.attrs = R
            }
            var Z = this.sync(T, this, V);
            this.attributes = Q;
            return Z
        },
        destroy: function(S) {
            S = S ? b.clone(S) : {};
            var R = this;
            var T = S.success;
            var U = S.wait;
            var Q = function() {
                R.stopListening();
                R.trigger("destroy", R, R.collection, S)
            };
            S.success = function(W) {
                if (U) {
                    Q()
                }
                if (T) {
                    T.call(S.context, R, W, S)
                }
                if (!R.isNew()) {
                    R.trigger("sync", R, W, S)
                }
            };
            var V = false;
            if (this.isNew()) {
                b.defer(S.success)
            } else {
                P(this, S);
                V = this.sync("delete", this, S)
            }
            if (!U) {
                Q()
            }
            return V
        },
        url: function() {
            var Q = b.result(this, "urlRoot") || b.result(this.collection, "url") || M();
            if (this.isNew()) {
                return Q
            }
            var R = this.get(this.idAttribute);
            return Q.replace(/[^\/]$/, "$&/") + encodeURIComponent(R)
        },
        parse: function(R, Q) {
            return R
        },
        clone: function() {
            return new this.constructor(this.attributes)
        },
        isNew: function() {
            return !this.has(this.idAttribute)
        },
        isValid: function(Q) {
            return this._validate({}, b.extend({}, Q, {
                validate: true
            }))
        },
        _validate: function(Q, S) {
            if (!S.validate || !this.validate) {
                return true
            }
            Q = b.extend({}, this.attributes, Q);
            var R = this.validationError = this.validate(Q, S) || null;
            if (!R) {
                return true
            }
            this.trigger("invalid", this, R, b.extend(S, {
                validationError: R
            }));
            return false
        }
    });
    var u = {
        keys: 1,
        values: 1,
        pairs: 1,
        invert: 1,
        pick: 0,
        omit: 0,
        chain: 1,
        isEmpty: 1
    };
    e(s, u, "attributes");
    var h = f.Collection = function(Q, R) {
        R || (R = {});
        if (R.model) {
            this.model = R.model
        }
        if (R.comparator !== void 0) {
            this.comparator = R.comparator
        }
        this._reset();
        this.initialize.apply(this, arguments);
        if (Q) {
            this.reset(Q, b.extend({
                silent: true
            }, R))
        }
    };
    var G = {
        add: true,
        remove: true,
        merge: true
    };
    var d = {
        add: true,
        remove: false
    };
    var J = function(Q, T, R) {
        R = Math.min(Math.max(R, 0), Q.length);
        var V = Array(Q.length - R);
        var U = T.length;
        var S;
        for (S = 0; S < V.length; S++) {
            V[S] = Q[S + R]
        }
        for (S = 0; S < U; S++) {
            Q[S + R] = T[S]
        }
        for (S = 0; S < V.length; S++) {
            Q[S + U + R] = V[S]
        }
    };
    b.extend(h.prototype, l, {
        model: s,
        initialize: function() {},
        toJSON: function(Q) {
            return this.map(function(R) {
                return R.toJSON(Q)
            })
        },
        sync: function() {
            return f.sync.apply(this, arguments)
        },
        add: function(Q, R) {
            return this.set(Q, b.extend({
                merge: false
            }, R, d))
        },
        remove: function(Q, R) {
            R = b.extend({}, R);
            var T = !b.isArray(Q);
            Q = T ? [Q] : Q.slice();
            var S = this._removeModels(Q, R);
            if (!R.silent && S.length) {
                R.changes = {
                    added: [],
                    merged: [],
                    removed: S
                };
                this.trigger("update", this, R)
            }
            return T ? S[0] : S
        },
        set: function(Y, Z) {
            if (Y == null) {
                return
            }
            Z = b.extend({}, G, Z);
            if (Z.parse && !this._isModel(Y)) {
                Y = this.parse(Y, Z) || []
            }
            var ae = !b.isArray(Y);
            Y = ae ? [Y] : Y.slice();
            var R = Z.at;
            if (R != null) {
                R = +R
            }
            if (R > this.length) {
                R = this.length
            }
            if (R < 0) {
                R += this.length + 1
            }
            var ad = [];
            var ai = [];
            var aj = [];
            var ak = [];
            var X = {};
            var Q = Z.add;
            var V = Z.merge;
            var ab = Z.remove;
            var af = false;
            var ag = this.comparator && R == null && Z.sort !== false;
            var ah = b.isString(this.comparator) ? this.comparator : null;
            var W, U;
            for (U = 0; U < Y.length; U++) {
                W = Y[U];
                var T = this.get(W);
                if (T) {
                    if (V && W !== T) {
                        var S = this._isModel(W) ? W.attributes : W;
                        if (Z.parse) {
                            S = T.parse(S, Z)
                        }
                        T.set(S, Z);
                        aj.push(T);
                        if (ag && !af) {
                            af = T.hasChanged(ah)
                        }
                    }
                    if (!X[T.cid]) {
                        X[T.cid] = true;
                        ad.push(T)
                    }
                    Y[U] = T
                } else {
                    if (Q) {
                        W = Y[U] = this._prepareModel(W, Z);
                        if (W) {
                            ai.push(W);
                            this._addReference(W, Z);
                            X[W.cid] = true;
                            ad.push(W)
                        }
                    }
                }
            }
            if (ab) {
                for (U = 0; U < this.length; U++) {
                    W = this.models[U];
                    if (!X[W.cid]) {
                        ak.push(W)
                    }
                }
                if (ak.length) {
                    this._removeModels(ak, Z)
                }
            }
            var aa = false;
            var ac = !ag && Q && ab;
            if (ad.length && ac) {
                aa = this.length !== ad.length || b.some(this.models, function(am, al) {
                    return am !== ad[al]
                });
                this.models.length = 0;
                J(this.models, ad, 0);
                this.length = this.models.length
            } else {
                if (ai.length) {
                    if (ag) {
                        af = true
                    }
                    J(this.models, ai, R == null ? this.length : R);
                    this.length = this.models.length
                }
            }
            if (af) {
                this.sort({
                    silent: true
                })
            }
            if (!Z.silent) {
                for (U = 0; U < ai.length; U++) {
                    if (R != null) {
                        Z.index = R + U
                    }
                    W = ai[U];
                    W.trigger("add", W, this, Z)
                }
                if (af || aa) {
                    this.trigger("sort", this, Z)
                }
                if (ai.length || ak.length || aj.length) {
                    Z.changes = {
                        added: ai,
                        removed: ak,
                        merged: aj
                    };
                    this.trigger("update", this, Z)
                }
            }
            return ae ? Y[0] : Y
        },
        reset: function(R, S) {
            S = S ? b.clone(S) : {};
            for (var Q = 0; Q < this.models.length; Q++) {
                this._removeReference(this.models[Q], S)
            }
            S.previousModels = this.models;
            this._reset();
            R = this.add(R, b.extend({
                silent: true
            }, S));
            if (!S.silent) {
                this.trigger("reset", this, S)
            }
            return R
        },
        push: function(Q, R) {
            return this.add(Q, b.extend({
                at: this.length
            }, R))
        },
        pop: function(R) {
            var Q = this.at(this.length - 1);
            return this.remove(Q, R)
        },
        unshift: function(Q, R) {
            return this.add(Q, b.extend({
                at: 0
            }, R))
        },
        shift: function(R) {
            var Q = this.at(0);
            return this.remove(Q, R)
        },
        slice: function() {
            return H.apply(this.models, arguments)
        },
        get: function(Q) {
            if (Q == null) {
                return void 0
            }
            return this._byId[Q] || this._byId[this.modelId(Q.attributes || Q)] || Q.cid && this._byId[Q.cid]
        },
        has: function(Q) {
            return this.get(Q) != null
        },
        at: function(Q) {
            if (Q < 0) {
                Q += this.length
            }
            return this.models[Q]
        },
        where: function(Q, R) {
            return this[R ? "find" : "filter"](Q)
        },
        findWhere: function(Q) {
            return this.where(Q, true)
        },
        sort: function(S) {
            var Q = this.comparator;
            if (!Q) {
                throw new Error("Cannot sort a set without a comparator")
            }
            S || (S = {});
            var R = Q.length;
            if (b.isFunction(Q)) {
                Q = b.bind(Q, this)
            }
            if (R === 1 || b.isString(Q)) {
                this.models = this.sortBy(Q)
            } else {
                this.models.sort(Q)
            }
            if (!S.silent) {
                this.trigger("sort", this, S)
            }
            return this
        },
        pluck: function(Q) {
            return this.map(Q + "")
        },
        fetch: function(R) {
            R = b.extend({
                parse: true
            }, R);
            var S = R.success;
            var Q = this;
            R.success = function(U) {
                var T = R.reset ? "reset" : "set";
                Q[T](U, R);
                if (S) {
                    S.call(R.context, Q, U, R)
                }
                Q.trigger("sync", Q, U, R)
            };
            P(this, R);
            return this.sync("read", this, R)
        },
        create: function(R, S) {
            S = S ? b.clone(S) : {};
            var U = S.wait;
            R = this._prepareModel(R, S);
            if (!R) {
                return false
            }
            if (!U) {
                this.add(R, S)
            }
            var Q = this;
            var T = S.success;
            S.success = function(W, X, V) {
                if (U) {
                    Q.add(W, V)
                }
                if (T) {
                    T.call(V.context, W, X, V)
                }
            };
            R.save(null, S);
            return R
        },
        parse: function(R, Q) {
            return R
        },
        clone: function() {
            return new this.constructor(this.models, {
                model: this.model,
                comparator: this.comparator
            })
        },
        modelId: function(Q) {
            return Q[this.model.prototype.idAttribute || "id"]
        },
        _reset: function() {
            this.length = 0;
            this.models = [];
            this._byId = {}
        },
        _prepareModel: function(Q, S) {
            if (this._isModel(Q)) {
                if (!Q.collection) {
                    Q.collection = this
                }
                return Q
            }
            S = S ? b.clone(S) : {};
            S.collection = this;
            var R = new this.model(Q, S);
            if (!R.validationError) {
                return R
            }
            this.trigger("invalid", this, R.validationError, S);
            return false
        },
        _removeModels: function(U, V) {
            var W = [];
            for (var Q = 0; Q < U.length; Q++) {
                var T = this.get(U[Q]);
                if (!T) {
                    continue
                }
                var S = this.indexOf(T);
                this.models.splice(S, 1);
                this.length--;
                delete this._byId[T.cid];
                var R = this.modelId(T.attributes);
                if (R != null) {
                    delete this._byId[R]
                }
                if (!V.silent) {
                    V.index = S;
                    T.trigger("remove", T, this, V)
                }
                W.push(T);
                this._removeReference(T, V)
            }
            return W
        },
        _isModel: function(Q) {
            return Q instanceof s
        },
        _addReference: function(R, S) {
            this._byId[R.cid] = R;
            var Q = this.modelId(R.attributes);
            if (Q != null) {
                this._byId[Q] = R
            }
            R.on("all", this._onModelEvent, this)
        },
        _removeReference: function(R, S) {
            delete this._byId[R.cid];
            var Q = this.modelId(R.attributes);
            if (Q != null) {
                delete this._byId[Q]
            }
            if (this === R.collection) {
                delete R.collection
            }
            R.off("all", this._onModelEvent, this)
        },
        _onModelEvent: function(R, T, Q, U) {
            if (T) {
                if ((R === "add" || R === "remove") && Q !== this) {
                    return
                }
                if (R === "destroy") {
                    this.remove(T, U)
                }
                if (R === "change") {
                    var V = this.modelId(T.previousAttributes());
                    var S = this.modelId(T.attributes);
                    if (V !== S) {
                        if (V != null) {
                            delete this._byId[V]
                        }
                        if (S != null) {
                            this._byId[S] = T
                        }
                    }
                }
            }
            this.trigger.apply(this, arguments)
        }
    });
    var i = {
        forEach: 3,
        each: 3,
        map: 3,
        collect: 3,
        reduce: 0,
        foldl: 0,
        inject: 0,
        reduceRight: 0,
        foldr: 0,
        find: 3,
        detect: 3,
        filter: 3,
        select: 3,
        reject: 3,
        every: 3,
        all: 3,
        some: 3,
        any: 3,
        include: 3,
        includes: 3,
        contains: 3,
        invoke: 0,
        max: 3,
        min: 3,
        toArray: 1,
        size: 1,
        first: 3,
        head: 3,
        take: 3,
        initial: 3,
        rest: 3,
        tail: 3,
        drop: 3,
        last: 3,
        without: 0,
        difference: 0,
        indexOf: 3,
        shuffle: 1,
        lastIndexOf: 3,
        isEmpty: 1,
        chain: 1,
        sample: 3,
        partition: 3,
        groupBy: 3,
        countBy: 3,
        sortBy: 3,
        indexBy: 3,
        findIndex: 3,
        findLastIndex: 3
    };
    e(h, i, "models");
    var N = f.View = function(Q) {
        this.cid = b.uniqueId("view");
        b.extend(this, b.pick(Q, O));
        this._ensureElement();
        this.initialize.apply(this, arguments)
    };
    var j = /^(\S+)\s*(.*)$/;
    var O = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
    b.extend(N.prototype, l, {
        tagName: "div",
        $: function(Q) {
            return this.$el.find(Q)
        },
        initialize: function() {},
        render: function() {
            return this
        },
        remove: function() {
            this._removeElement();
            this.stopListening();
            return this
        },
        _removeElement: function() {
            this.$el.remove()
        },
        setElement: function(Q) {
            this.undelegateEvents();
            this._setElement(Q);
            this.delegateEvents();
            return this
        },
        _setElement: function(Q) {
            this.$el = Q instanceof f.$ ? Q : f.$(Q);
            this.el = this.$el[0]
        },
        delegateEvents: function(Q) {
            Q || (Q = b.result(this, "events"));
            if (!Q) {
                return this
            }
            this.undelegateEvents();
            for (var R in Q) {
                var T = Q[R];
                if (!b.isFunction(T)) {
                    T = this[T]
                }
                if (!T) {
                    continue
                }
                var S = R.match(j);
                this.delegate(S[1], S[2], b.bind(T, this))
            }
            return this
        },
        delegate: function(Q, S, R) {
            this.$el.on(Q + ".delegateEvents" + this.cid, S, R);
            return this
        },
        undelegateEvents: function() {
            if (this.$el) {
                this.$el.off(".delegateEvents" + this.cid)
            }
            return this
        },
        undelegate: function(Q, S, R) {
            this.$el.off(Q + ".delegateEvents" + this.cid, S, R);
            return this
        },
        _createElement: function(Q) {
            return document.createElement(Q)
        },
        _ensureElement: function() {
            if (!this.el) {
                var Q = b.extend({}, b.result(this, "attributes"));
                if (this.id) {
                    Q.id = b.result(this, "id")
                }
                if (this.className) {
                    Q["class"] = b.result(this, "className")
                }
                this.setElement(this._createElement(b.result(this, "tagName")));
                this._setAttributes(Q)
            } else {
                this.setElement(b.result(this, "el"))
            }
        },
        _setAttributes: function(Q) {
            this.$el.attr(Q)
        }
    });
    f.sync = function(S, T, U) {
        var W = r[S];
        b.defaults(U || (U = {}), {
            emulateHTTP: f.emulateHTTP,
            emulateJSON: f.emulateJSON
        });
        var V = {
            type: W,
            dataType: "json"
        };
        if (!U.url) {
            V.url = b.result(T, "url") || M()
        }
        if (U.data == null && T && (S === "create" || S === "update" || S === "patch")) {
            V.contentType = "application/json";
            V.data = JSON.stringify(U.attrs || T.toJSON(U))
        }
        if (U.emulateJSON) {
            V.contentType = "application/x-www-form-urlencoded";
            V.data = V.data ? {
                model: V.data
            } : {}
        }
        if (U.emulateHTTP && (W === "PUT" || W === "DELETE" || W === "PATCH")) {
            V.type = "POST";
            if (U.emulateJSON) {
                V.data._method = W
            }
            var Q = U.beforeSend;
            U.beforeSend = function(Y) {
                Y.setRequestHeader("X-HTTP-Method-Override", W);
                if (Q) {
                    return Q.apply(this, arguments)
                }
            }
        }
        if (V.type !== "GET" && !U.emulateJSON) {
            V.processData = false
        }
        var R = U.error;
        U.error = function(aa, Z, Y) {
            U.textStatus = Z;
            U.errorThrown = Y;
            if (R) {
                R.call(U.context, aa, Z, Y)
            }
        };
        var X = U.xhr = f.ajax(b.extend(V, U));
        T.trigger("request", T, X, U);
        return X
    };
    var r = {
        create: "POST",
        update: "PUT",
        patch: "PATCH",
        "delete": "DELETE",
        read: "GET"
    };
    f.ajax = function() {
        return f.$.ajax.apply(f.$, arguments)
    };
    var E = f.Router = function(Q) {
        Q || (Q = {});
        if (Q.routes) {
            this.routes = Q.routes
        }
        this._bindRoutes();
        this.initialize.apply(this, arguments)
    };
    var z = /\((.*?)\)/g;
    var v = /(\(\?)?:\w+/g;
    var I = /\*\w+/g;
    var k = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    b.extend(E.prototype, l, {
        initialize: function() {},
        route: function(S, R, Q) {
            if (!b.isRegExp(S)) {
                S = this._routeToRegExp(S)
            }
            if (b.isFunction(R)) {
                Q = R;
                R = ""
            }
            if (!Q) {
                Q = this[R]
            }
            var T = this;
            f.history.route(S, function(V) {
                var U = T._extractParameters(S, V);
                if (T.execute(Q, U, R) !== false) {
                    T.trigger.apply(T, ["route:" + R].concat(U));
                    T.trigger("route", R, U);
                    f.history.trigger("route", T, R, U)
                }
            });
            return this
        },
        execute: function(R, Q, S) {
            if (R) {
                R.apply(this, Q)
            }
        },
        navigate: function(Q, R) {
            f.history.navigate(Q, R);
            return this
        },
        _bindRoutes: function() {
            if (!this.routes) {
                return
            }
            this.routes = b.result(this, "routes");
            var Q, R = b.keys(this.routes);
            while ((Q = R.pop()) != null) {
                this.route(Q, this.routes[Q])
            }
        },
        _routeToRegExp: function(Q) {
            Q = Q.replace(k, "\\$&").replace(z, "(?:$1)?").replace(v, function(R, S) {
                return S ? R : "([^/?]+)"
            }).replace(I, "([^?]*?)");
            return new RegExp("^" + Q + "(?:\\?([\\s\\S]*))?$")
        },
        _extractParameters: function(S, Q) {
            var R = S.exec(Q).slice(1);
            return b.map(R, function(U, T) {
                if (T === R.length - 1) {
                    return U || null
                }
                return U ? decodeURIComponent(U) : null
            })
        }
    });
    var p = f.History = function() {
        this.handlers = [];
        this.checkUrl = b.bind(this.checkUrl, this);
        if (typeof window !== "undefined") {
            this.location = window.location;
            this.history = window.history
        }
    };
    var F = /^[#\/]|\s+$/g;
    var D = /^\/+|\/+$/g;
    var A = /#.*$/;
    p.started = false;
    b.extend(p.prototype, l, {
        interval: 50,
        atRoot: function() {
            var Q = this.location.pathname.replace(/[^\/]$/, "$&/");
            return Q === this.root && !this.getSearch()
        },
        matchRoot: function() {
            var Q = this.decodeFragment(this.location.pathname);
            var R = Q.slice(0, this.root.length - 1) + "/";
            return R === this.root
        },
        decodeFragment: function(Q) {
            return decodeURI(Q.replace(/%25/g, "%2525"))
        },
        getSearch: function() {
            var Q = this.location.href.replace(/#.*/, "").match(/\?.+/);
            return Q ? Q[0] : ""
        },
        getHash: function(R) {
            var Q = (R || this).location.href.match(/#(.*)$/);
            return Q ? Q[1] : ""
        },
        getPath: function() {
            var Q = this.decodeFragment(this.location.pathname + this.getSearch()).slice(this.root.length - 1);
            return Q.charAt(0) === "/" ? Q.slice(1) : Q
        },
        getFragment: function(Q) {
            if (Q == null) {
                if (this._usePushState || !this._wantsHashChange) {
                    Q = this.getPath()
                } else {
                    Q = this.getHash()
                }
            }
            return Q.replace(F, "")
        },
        start: function(T) {
            if (p.started) {
                throw new Error("Backbone.history has already been started")
            }
            p.started = true;
            this.options = b.extend({
                root: "/"
            }, this.options, T);
            this.root = this.options.root;
            this._wantsHashChange = this.options.hashChange !== false;
            this._hasHashChange = "onhashchange" in window && (document.documentMode === void 0 || document.documentMode > 7);
            this._useHashChange = this._wantsHashChange && this._hasHashChange;
            this._wantsPushState = !!this.options.pushState;
            this._hasPushState = !!(this.history && this.history.pushState);
            this._usePushState = this._wantsPushState && this._hasPushState;
            this.fragment = this.getFragment();
            this.root = ("/" + this.root + "/").replace(D, "/");
            if (this._wantsHashChange && this._wantsPushState) {
                if (!this._hasPushState && !this.atRoot()) {
                    var U = this.root.slice(0, -1) || "/";
                    this.location.replace(U + "#" + this.getPath());
                    return true
                } else {
                    if (this._hasPushState && this.atRoot()) {
                        this.navigate(this.getHash(), {
                            replace: true
                        })
                    }
                }
            }
            if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
                this.iframe = document.createElement("iframe");
                this.iframe.src = "javascript:0";
                this.iframe.style.display = "none";
                this.iframe.tabIndex = -1;
                var R = document.body;
                var S = R.insertBefore(this.iframe, R.firstChild).contentWindow;
                S.document.open();
                S.document.close();
                S.location.hash = "#" + this.fragment
            }
            var Q = window.addEventListener || function(V, W) {
                return attachEvent("on" + V, W)
            };
            if (this._usePushState) {
                Q("popstate", this.checkUrl, false)
            } else {
                if (this._useHashChange && !this.iframe) {
                    Q("hashchange", this.checkUrl, false)
                } else {
                    if (this._wantsHashChange) {
                        this._checkUrlInterval = setInterval(this.checkUrl, this.interval)
                    }
                }
            }
            if (!this.options.silent) {
                return this.loadUrl()
            }
        },
        stop: function() {
            var Q = window.removeEventListener || function(R, S) {
                return detachEvent("on" + R, S)
            };
            if (this._usePushState) {
                Q("popstate", this.checkUrl, false)
            } else {
                if (this._useHashChange && !this.iframe) {
                    Q("hashchange", this.checkUrl, false)
                }
            }
            if (this.iframe) {
                document.body.removeChild(this.iframe);
                this.iframe = null
            }
            if (this._checkUrlInterval) {
                clearInterval(this._checkUrlInterval)
            }
            p.started = false
        },
        route: function(R, Q) {
            this.handlers.unshift({
                route: R,
                callback: Q
            })
        },
        checkUrl: function(R) {
            var Q = this.getFragment();
            if (Q === this.fragment && this.iframe) {
                Q = this.getHash(this.iframe.contentWindow)
            }
            if (Q === this.fragment) {
                return false
            }
            if (this.iframe) {
                this.navigate(Q)
            }
            this.loadUrl()
        },
        loadUrl: function(Q) {
            if (!this.matchRoot()) {
                return false
            }
            Q = this.fragment = this.getFragment(Q);
            return b.some(this.handlers, function(R) {
                if (R.route.test(Q)) {
                    R.callback(Q);
                    return true
                }
            })
        },
        navigate: function(Q, S) {
            if (!p.started) {
                return false
            }
            if (!S || S === true) {
                S = {
                    trigger: !!S
                }
            }
            Q = this.getFragment(Q || "");
            var T = this.root;
            if (Q === "" || Q.charAt(0) === "?") {
                T = T.slice(0, -1) || "/"
            }
            var U = T + Q;
            Q = this.decodeFragment(Q.replace(A, ""));
            if (this.fragment === Q) {
                return
            }
            this.fragment = Q;
            if (this._usePushState) {
                this.history[S.replace ? "replaceState" : "pushState"]({}, document.title, U)
            } else {
                if (this._wantsHashChange) {
                    this._updateHash(this.location, Q, S.replace);
                    if (this.iframe && Q !== this.getHash(this.iframe.contentWindow)) {
                        var R = this.iframe.contentWindow;
                        if (!S.replace) {
                            R.document.open();
                            R.document.close()
                        }
                        this._updateHash(R.location, Q, S.replace)
                    }
                } else {
                    return this.location.assign(U)
                }
            }
            if (S.trigger) {
                return this.loadUrl(Q)
            }
        },
        _updateHash: function(S, Q, T) {
            if (T) {
                var R = S.href.replace(/(javascript:|#).*$/, "");
                S.replace(R + "#" + Q)
            } else {
                S.hash = "#" + Q
            }
        }
    });
    f.history = new p;
    var o = function(S, T) {
        var R = this;
        var Q;
        if (S && b.has(S, "constructor")) {
            Q = S.constructor
        } else {
            Q = function() {
                return R.apply(this, arguments)
            }
        }
        b.extend(Q, R, T);
        Q.prototype = b.create(R.prototype, S);
        Q.prototype.constructor = Q;
        Q.__super__ = R.prototype;
        return Q
    };
    s.extend = h.extend = E.extend = N.extend = p.extend = o;
    var M = function() {
        throw new Error('A "url" property or function must be specified')
    };
    var P = function(R, S) {
        var Q = S.error;
        S.error = function(T) {
            if (Q) {
                Q.call(S.context, R, T, S)
            }
            R.trigger("error", R, T, S)
        }
    };
    return f
});
(function(a) {
    if (typeof define === "function" && define.amd) {
        define(["backbone", "underscore"], a)
    } else {
        if (typeof exports === "object") {
            module.exports = a(require("backbone"), require("underscore"))
        } else {
            a(window.Backbone, window._)
        }
    }
})(function(b, a) {
    var d = b.Router.prototype.route;
    var c = function() {};
    a.extend(b.Router.prototype, {
        before: c,
        after: c,
        route: function(g, f, e) {
            if (!e) {
                e = this[f]
            }
            var h = a.bind(function() {
                var k = [g, a.toArray(arguments)];
                var j;
                if (a.isFunction(this.before)) {
                    j = this.before
                } else {
                    if (typeof this.before[g] !== "undefined") {
                        j = this.before[g]
                    } else {
                        j = c
                    }
                }
                if (j.apply(this, k) === false) {
                    return
                }
                if (e) {
                    e.apply(this, arguments)
                }
                var i;
                if (a.isFunction(this.after)) {
                    i = this.after
                } else {
                    if (typeof this.after[g] !== "undefined") {
                        i = this.after[g]
                    } else {
                        i = c
                    }
                }
                i.apply(this, k)
            }, this);
            return d.call(this, g, f, h)
        }
    })
});
(function(a) {
    a.widget("mobile.datebox", {
        initSelector: "input[data-role='datebox']",
        options: {
            version: "3-1.4.5-05",
            theme: false,
            themeDefault: "a",
            themeHeader: "a",
            themeSetButton: "a",
            themeCloseButton: false,
            mode: false,
            transition: "fade",
            useAnimation: true,
            hideInput: false,
            hideContainer: false,
            lockInput: true,
            zindex: "1100",
            clickEvent: "vclick",
            clickEventAlt: "click",
            defaultValue: false,
            showInitialValue: false,
            popupPosition: false,
            popupForceX: false,
            popupForceY: false,
            useModal: true,
            useModalTheme: "b",
            useInline: false,
            useInlineBlind: false,
            useHeader: true,
            useImmediate: false,
            useButton: true,
            buttonIcon: false,
            buttonIconDate: "calendar",
            buttonIconTime: "clock",
            useFocus: false,
            useClearButton: false,
            useCollapsedBut: false,
            usePlaceholder: false,
            beforeOpenCallback: false,
            beforeOpenCallbackArgs: [],
            openCallback: false,
            openCallbackArgs: [],
            closeCallback: false,
            closeCallbackArgs: [],
            startOffsetYears: false,
            startOffsetMonths: false,
            startOffsetDays: false,
            afterToday: false,
            beforeToday: false,
            notToday: false,
            maxDays: false,
            minDays: false,
            maxYear: false,
            minYear: false,
            blackDates: false,
            blackDatesRec: false,
            blackDays: false,
            whiteDates: true,
            minHour: false,
            maxHour: false,
            maxDur: false,
            minDur: false,
            minuteStep: 1,
            minuteStepRound: 0,
            rolloverMode: {
                m: true,
                d: true,
                h: true,
                i: true,
                s: true
            },
            useLang: "default",
            lang: {
                "default": {
                    setDateButtonLabel: "Set Date",
                    setTimeButtonLabel: "Set Time",
                    setDurationButtonLabel: "Set Duration",
                    calTodayButtonLabel: "Jump to Today",
                    calTomorrowButtonLabel: "Jump to Tomorrow",
                    titleDateDialogLabel: "Set Date",
                    titleTimeDialogLabel: "Set Time",
                    daysOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    daysOfWeekShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                    monthsOfYear: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    monthsOfYearShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    durationLabel: ["Days", "Hours", "Minutes", "Seconds"],
                    durationDays: ["Day", "Days"],
                    timeFormat: 24,
                    headerFormat: "%A, %B %-d, %Y",
                    tooltip: "Open Date Picker",
                    nextMonth: "Next Month",
                    prevMonth: "Previous Month",
                    dateFieldOrder: ["m", "d", "y"],
                    timeFieldOrder: ["h", "i", "a"],
                    slideFieldOrder: ["y", "m", "d"],
                    dateFormat: "%Y-%m-%d",
                    useArabicIndic: false,
                    isRTL: false,
                    calStartDay: 0,
                    clearButton: "Clear",
                    durationOrder: ["d", "h", "i", "s"],
                    meridiem: ["AM", "PM"],
                    timeOutput: "%k:%M",
                    durationFormat: "%Dd %DA, %Dl:%DM:%DS",
                    calDateListLabel: "Other Dates",
                    calHeaderFormat: "%B %Y"
                }
            }
        },
        _enhanceDate: function() {
            a.extend(this._date.prototype, {
                copy: function(b, c) {
                    b = a.extend([0, 0, 0, 0, 0, 0, 0], b);
                    c = a.extend([0, 0, 0, 0, 0, 0, 0], c);
                    return new Date(((c[0] > 0) ? c[0] : this.get(0) + b[0]), ((c[1] > 0) ? c[1] : this.get(1) + b[1]), ((c[2] > 0) ? c[2] : this.get(2) + b[2]), ((c[3] > 0) ? c[3] : this.get(3) + b[3]), ((c[4] > 0) ? c[4] : this.get(4) + b[4]), ((c[5] > 0) ? c[5] : this.get(5) + b[5]), ((c[6] > 0) ? c[5] : this.get(6) + b[6]))
                },
                adj: function(c, b) {
                    if (typeof b !== "number" || typeof c !== "number") {
                        throw new Error("Invalid Arguments")
                    }
                    switch (c) {
                        case 0:
                            this.setD(0, this.get(0) + b);
                            break;
                        case 1:
                            this.setD(1, this.get(1) + b);
                            break;
                        case 2:
                            this.setD(2, this.get(2) + b);
                            break;
                        case 3:
                            b *= 60;
                        case 4:
                            b *= 60;
                        case 5:
                            b *= 1000;
                        case 6:
                            this.setTime(this.getTime() + b);
                            break
                    }
                    return this
                },
                setD: function(c, b) {
                    switch (c) {
                        case 0:
                            this.setFullYear(b);
                            break;
                        case 1:
                            this.setMonth(b);
                            break;
                        case 2:
                            this.setDate(b);
                            break;
                        case 3:
                            this.setHours(b);
                            break;
                        case 4:
                            this.setMinutes(b);
                            break;
                        case 5:
                            this.setSeconds(b);
                            break;
                        case 6:
                            this.setMilliseconds(b);
                            break
                    }
                    return this
                },
                get: function(b) {
                    switch (b) {
                        case 0:
                            return this.getFullYear();
                        case 1:
                            return this.getMonth();
                        case 2:
                            return this.getDate();
                        case 3:
                            return this.getHours();
                        case 4:
                            return this.getMinutes();
                        case 5:
                            return this.getSeconds();
                        case 6:
                            return this.getMilliseconds()
                    }
                    return false
                },
                get12hr: function() {
                    if (this.get(3) === 0) {
                        return 12
                    }
                    if (this.get(3) < 13) {
                        return this.get(3)
                    }
                    return this.get(3) - 12
                },
                iso: function() {
                    var b = [0, 0, 0],
                        c = 0;
                    for (c = 0; c < 3; c++) {
                        b[c] = this.get(c);
                        if (c === 1) {
                            b[c]++
                        }
                        if (b[c] < 10) {
                            b[c] = "0" + String(b[c])
                        }
                    }
                    return b.join("-")
                },
                comp: function() {
                    return parseInt(this.iso().replace(/-/g, ""), 10)
                },
                getEpoch: function() {
                    return Math.floor(this.getTime() / 1000)
                },
                getArray: function() {
                    var b = [0, 0, 0, 0, 0, 0],
                        c = 0;
                    for (c = 0; c < 6; c++) {
                        b[c] = this.get(c)
                    }
                    return b
                },
                setFirstDay: function(b) {
                    this.setD(2, 1).adj(2, (b - this.getDay()));
                    if (this.get(2) > 10) {
                        this.adj(2, 7)
                    }
                    return this
                },
                setDWeek: function(c, b) {
                    if (c === 4) {
                        return this.setD(1, 0).setD(2, 1).setFirstDay(4).adj(2, -3).adj(2, (b - 1) * 7)
                    }
                    return this.setD(1, 0).setD(2, 1).setFirstDay(c).adj(2, (b - 1) * 7)
                },
                getDWeek: function(d) {
                    var b, c;
                    switch (d) {
                        case 0:
                            b = this.copy([0, -1 * this.getMonth()]).setFirstDay(0);
                            return Math.floor((this.getTime() - (b.getTime() + ((this.getTimezoneOffset() - b.getTimezoneOffset()) * 60000))) / 604800000) + 1;
                        case 1:
                            b = this.copy([0, -1 * this.getMonth()]).setFirstDay(1);
                            return Math.floor((this.getTime() - (b.getTime() + ((this.getTimezoneOffset() - b.getTimezoneOffset()) * 60000))) / 604800000) + 1;
                        case 4:
                            if (this.getMonth() === 11 && this.getDate() > 28) {
                                return 1
                            }
                            b = this.copy([0, -1 * this.getMonth()], true).setFirstDay(4).adj(2, -3);
                            c = Math.floor((this.getTime() - (b.getTime() + ((this.getTimezoneOffset() - b.getTimezoneOffset()) * 60000))) / 604800000) + 1;
                            if (c < 1) {
                                b = this.copy([-1, -1 * this.getMonth()]).setFirstDay(4).adj(2, -3);
                                return Math.floor((this.getTime() - b.getTime()) / 604800000) + 1
                            }
                            return c;
                        default:
                            return 0
                    }
                }
            })
        },
        _event: function(b, c) {
            var d, f = a(this).data("mobile-datebox");
            if (!b.isPropagationStopped()) {
                switch (c.method) {
                    case "close":
                        f.close();
                        break;
                    case "open":
                        f.open();
                        break;
                    case "set":
                        if (typeof c.value === "object") {
                            f.theDate = c.value;
                            f._t({
                                method: "doset"
                            })
                        } else {
                            a(this).val(c.value);
                            a(this).trigger("change")
                        }
                        break;
                    case "doset":
                        d = "_" + f.options.mode + "DoSet";
                        if (a.isFunction(f[d])) {
                            f[d].apply(f, [])
                        } else {
                            f._t({
                                method: "set",
                                value: f._formatter(f.__fmt(), f.theDate),
                                date: f.theDate
                            })
                        }
                        break;
                    case "dooffset":
                        if (c.type) {
                            f._offset(c.type, c.amount, true)
                        }
                        break;
                    case "dorefresh":
                        f.refresh();
                        break;
                    case "doclear":
                        a(this).val("").trigger("change");
                        break;
                    case "clear":
                        a(this).trigger("change");
                        break
                }
            }
        },
        _ord: {
            "default": function(c) {
                var b = c % 10;
                if ((c > 9 && c < 21) || b > 3) {
                    return "th"
                }
                return ["th", "st", "nd", "rd"][b]
            }
        },
        _dur: function(c) {
            var b = [c / (60 * 60 * 1000 * 24), c / (60 * 60 * 1000) % 24, c / (60 * 1000) % 60, c / (1000) % 60, ];
            a.each(b, function(d, e) {
                b[d] = parseInt(e, 10)
            });
            return b
        },
        _gridblk: {
            g: [0, 0, "a", "b", "c", "d", "e"],
            b: ["a", "b", "c", "d", "e", "f"]
        },
        __: function(f) {
            var d = this.options,
                b = d.lang[d.useLang],
                c = d[d.mode + "lang"],
                e = "override" + f.charAt(0).toUpperCase() + f.slice(1);
            if (typeof b === "undefined") {
                b = d.lang["default"]
            }
            if (typeof d[e] !== "undefined") {
                return d[e]
            }
            if (typeof b[f] !== "undefined") {
                return b[f]
            }
            if ((typeof c !== "undefined") && (typeof c[f] !== "undefined")) {
                return c[f]
            }
            return d.lang["default"][f]
        },
        __fmt: function() {
            var c = this,
                b = this.options;
            if (typeof c.fmtOver !== "undefined" && c.fmtOver !== false) {
                return c.fmtOver
            }
            switch (b.mode) {
                case "timebox":
                case "timeflipbox":
                    return c.__("timeOutput");
                case "durationbox":
                case "durationflipbox":
                    return c.__("durationFormat");
                default:
                    return c.__("dateFormat")
            }
        },
        _zPad: function(b, c) {
            if (typeof c !== "undefined" && c === "-") {
                return String(b)
            }
            return (b < 10 ? "0" : "") + String(b)
        },
        _dRep: function(h, d) {
            var c, f, j = 48,
                e = 57,
                b = 1584,
                g = "";
            if (d === -1) {
                j += b;
                e += b;
                b = -1584
            }
            for (f = 0; f < h.length; f++) {
                c = h.charCodeAt(f);
                if (c >= j && c <= e) {
                    g = g + String.fromCharCode(c + b)
                } else {
                    g = g + String.fromCharCode(c)
                }
            }
            return g
        },
        _doIndic: function() {
            var b = this;
            b.d.intHTML.find("*").each(function() {
                if (a(this).children().length < 1) {
                    a(this).text(b._dRep(a(this).text()))
                } else {
                    if (a(this).hasClass("ui-datebox-slideday")) {
                        a(this).html(b._dRep(a(this).html()))
                    }
                }
            });
            b.d.intHTML.find("input").each(function() {
                a(this).val(b._dRep(a(this).val()))
            })
        },
        _parser: {
            "default": function() {
                return false
            }
        },
        _n: function(c, b) {
            return (c < 0) ? b : c
        },
        _pa: function(b, c) {
            if (typeof c === "boolean") {
                return new this._date(b[0], b[1], b[2], 0, 0, 0, 0)
            }
            return new this._date(c.get(0), c.get(1), c.get(2), b[0], b[1], b[2], 0)
        },
        _makeDate: function(p) {
            var m, k, g, l, q = this,
                n = this.options,
                f = this.options.defaultValue,
                b = q.__fmt(),
                h = null,
                j = [],
                e = new q._date(),
                c = {
                    year: -1,
                    mont: -1,
                    date: -1,
                    hour: -1,
                    mins: -1,
                    secs: -1,
                    week: false,
                    wtyp: 4,
                    wday: false,
                    yday: false,
                    meri: 0
                };
            p = a.trim(((q.__("useArabicIndic") === true) ? q._dRep(p, -1) : p));
            if (typeof n.mode === "undefined") {
                return e
            }
            if (typeof q._parser[n.mode] !== "undefined") {
                return q._parser[n.mode].apply(q, [p])
            }
            if (n.mode === "durationbox" || n.mode === "durationflipbox") {
                b = b.replace(/%D([a-z])/gi, function(d, i) {
                    switch (i) {
                        case "d":
                        case "l":
                        case "M":
                        case "S":
                            return "(" + d + "|[0-9]+)";
                        default:
                            return ".+?"
                    }
                });
                b = new RegExp("^" + b + "$");
                h = b.exec(p);
                g = b.exec(q.__fmt());
                if (h === null || h.length !== g.length) {
                    if (typeof f === "number" && f > 0) {
                        return new q._date((q.initDate.getEpoch() + parseInt(f, 10)) * 1000)
                    }
                    return new q._date(q.initDate.getTime())
                }
                k = q.initDate.getEpoch();
                for (m = 1; m < h.length; m++) {
                    l = parseInt(h[m], 10);
                    if (g[m].match(/^%Dd$/i)) {
                        k = k + (l * 86400)
                    }
                    if (g[m].match(/^%Dl$/i)) {
                        k = k + (l * 3600)
                    }
                    if (g[m].match(/^%DM$/i)) {
                        k = k + (l * 60)
                    }
                    if (g[m].match(/^%DS$/i)) {
                        k = k + (l)
                    }
                }
                return new q._date(k * 1000)
            }
            b = b.replace(/%(0|-)*([a-z])/gi, function(d, o, i) {
                j.push(i);
                switch (i) {
                    case "p":
                    case "P":
                    case "b":
                    case "B":
                        return "(" + d + "|.+?)";
                    case "H":
                    case "k":
                    case "I":
                    case "l":
                    case "m":
                    case "M":
                    case "S":
                    case "V":
                    case "U":
                    case "u":
                    case "W":
                    case "d":
                        return "(" + d + "|[0-9]{" + ((o === "-") ? "1," : "") + "2})";
                    case "j":
                        return "(" + d + "|[0-9]{3})";
                    case "s":
                        return "(" + d + "|[0-9]+)";
                    case "g":
                    case "y":
                        return "(" + d + "|[0-9]{2})";
                    case "E":
                    case "G":
                    case "Y":
                        return "(" + d + "|[0-9]{1,4})";
                    default:
                        j.pop();
                        return ".+?"
                }
            });
            b = new RegExp("^" + b + "$");
            h = b.exec(p);
            g = b.exec(q.__fmt());
            if (h === null || h.length !== g.length) {
                if (f !== false) {
                    switch (typeof f) {
                        case "object":
                            if (a.isFunction(f.getDay)) {
                                e = f
                            } else {
                                if (f.length === 3) {
                                    e = q._pa(f, (n.mode.substr(0, 4) === "time" ? e : false))
                                }
                            }
                            break;
                        case "number":
                            e = new q._date(f * 1000);
                            break;
                        case "string":
                            if (n.mode.substr(0, 4) === "time") {
                                k = a.extend([0, 0, 0], f.split(":")).slice(0, 3);
                                e = q._pa(k, e)
                            } else {
                                k = a.extend([0, 0, 0], f.split("-")).slice(0, 3);
                                k[1]--;
                                e = q._pa(k, false)
                            }
                            break
                    }
                }
                if (isNaN(e.getDate())) {
                    e = new q._date()
                }
            } else {
                for (m = 1; m < h.length; m++) {
                    l = parseInt(h[m], 10);
                    switch (j[m - 1]) {
                        case "s":
                            return new q._date(parseInt(h[m], 10) * 1000);
                        case "Y":
                        case "G":
                            c.year = l;
                            break;
                        case "E":
                            c.year = l - 543;
                            break;
                        case "y":
                        case "g":
                            if (n.afterToday || l < 38) {
                                c.year = 2000 + l
                            } else {
                                c.year = 1900 + l
                            }
                            break;
                        case "m":
                            c.mont = l - 1;
                            break;
                        case "d":
                            c.date = l;
                            break;
                        case "H":
                        case "k":
                        case "I":
                        case "l":
                            c.hour = l;
                            break;
                        case "M":
                            c.mins = l;
                            break;
                        case "S":
                            c.secs = l;
                            break;
                        case "u":
                            c.wday = l - 1;
                            break;
                        case "w":
                            c.wday = l;
                            break;
                        case "j":
                            c.yday = l;
                            break;
                        case "V":
                            c.week = l;
                            c.wtyp = 4;
                            break;
                        case "U":
                            c.week = l;
                            c.wtyp = 0;
                            break;
                        case "W":
                            c.week = l;
                            c.wtyp = 1;
                            break;
                        case "p":
                        case "P":
                            l = new RegExp("^" + h[m] + "$", "i");
                            c.meri = (l.test(q.__("meridiem")[0]) ? -1 : 1);
                            break;
                        case "b":
                            k = a.inArray(h[m], q.__("monthsOfYearShort"));
                            if (k > -1) {
                                c.mont = k
                            }
                            break;
                        case "B":
                            k = a.inArray(h[m], q.__("monthsOfYear"));
                            if (k > -1) {
                                c.mont = k
                            }
                            break
                    }
                }
                if (c.meri !== 0) {
                    if (c.meri === -1 && c.hour === 12) {
                        c.hour = 0
                    }
                    if (c.meri === 1 && c.hour !== 12) {
                        c.hour = c.hour + 12
                    }
                }
                e = new q._date(q._n(c.year, 0), q._n(c.mont, 0), q._n(c.date, 1), q._n(c.hour, 0), q._n(c.mins, 0), q._n(c.secs, 0), 0);
                if (c.year < 100 && c.year !== -1) {
                    e.setFullYear(c.year)
                }
                if ((c.mont > -1 && c.date > -1) || (c.hour > -1 && c.mins > -1 && c.secs > -1)) {
                    return e
                }
                if (c.week !== false) {
                    e.setDWeek(c.wtyp, c.week);
                    if (c.date > -1) {
                        e.setDate(c.date)
                    }
                }
                if (c.yday !== false) {
                    e.setD(1, 0).setD(2, 1).adj(2, (c.yday - 1))
                }
                if (c.wday !== false) {
                    e.adj(2, (c.wday - e.getDay()))
                }
            }
            return e
        },
        _customformat: {
            "default": function() {
                return false
            }
        },
        _formatter: function(d, b) {
            var g = this,
                e = this.options,
                f, c = 0;
            if (e.mode.substr(0, 4) === "dura") {
                c = g._dur(this.theDate.getTime() - this.initDate.getTime());
                if (!d.match(/%Dd/)) {
                    c[1] += (c[0] * 24)
                }
                if (!d.match(/%Dl/)) {
                    c[2] += (c[1] * 60)
                }
                if (!d.match(/%DM/)) {
                    c[3] += (c[2] * 60)
                }
            }
            d = d.replace(/%(D|X|0|-)*([1-9a-zA-Z])/g, function(h, j, i) {
                if (j === "X") {
                    if (typeof g._customformat[e.mode] !== "undefined") {
                        return g._customformat[e.mode](i, b, e)
                    }
                    return h
                }
                if (j === "D") {
                    switch (i) {
                        case "d":
                            return c[0];
                        case "l":
                            return g._zPad(c[1]);
                        case "M":
                            return g._zPad(c[2]);
                        case "S":
                            return g._zPad(c[3]);
                        case "A":
                            return g.__("durationDays")[((c[0] === 1) ? 0 : 1)];
                        default:
                            return h
                    }
                }
                switch (i) {
                    case "a":
                        return g.__("daysOfWeekShort")[b.getDay()];
                    case "A":
                        return g.__("daysOfWeek")[b.getDay()];
                    case "b":
                        return g.__("monthsOfYearShort")[b.getMonth()];
                    case "B":
                        return g.__("monthsOfYear")[b.getMonth()];
                    case "C":
                        return parseInt(b.getFullYear() / 100);
                    case "d":
                        return g._zPad(b.getDate(), j);
                    case "H":
                    case "k":
                        return g._zPad(b.getHours(), j);
                    case "I":
                    case "l":
                        return g._zPad(b.get12hr(), j);
                    case "m":
                        return g._zPad(b.getMonth() + 1, j);
                    case "M":
                        return g._zPad(b.getMinutes(), j);
                    case "p":
                    case "P":
                        f = g.__("meridiem")[((b.get(3) < 12) ? 0 : 1)].toUpperCase();
                        return (i === "P" ? f.toLowerCase() : f);
                    case "s":
                        return b.getEpoch();
                    case "S":
                        return g._zPad(b.getSeconds(), j);
                    case "u":
                        return g._zPad(b.getDay() + 1, j);
                    case "w":
                        return b.getDay();
                    case "y":
                        return g._zPad(b.getFullYear() % 100);
                    case "Y":
                        return b.getFullYear();
                    case "E":
                        return b.getFullYear() + 543;
                    case "V":
                        return g._zPad(b.getDWeek(4), j);
                    case "U":
                        return g._zPad(b.getDWeek(0), j);
                    case "W":
                        return g._zPad(b.getDWeek(1), j);
                    case "o":
                        if (typeof g._ord[e.useLang] !== "undefined") {
                            return g._ord[e.useLang](b.getDate())
                        }
                        return g._ord["default"](b.getDate());
                    case "j":
                        f = new Date(b.getFullYear(), 0, 1);
                        f = "000" + String(Math.ceil((b - f) / 86400000) + 1);
                        return f.slice(-3);
                    case "G":
                        f = b.getFullYear();
                        if (b.getDWeek(4) === 1 && b.getMonth() > 0) {
                            return f + 1
                        }
                        if (b.getDWeek(4) > 51 && b.getMonth() < 11) {
                            return f - 1
                        }
                        return f;
                    case "g":
                        f = b.getFullYear % 100;
                        if (b.getDWeek(4) === 1 && b.getMonth() > 0) {
                            ++f
                        }
                        if (b.getDWeek(4) > 51 && b.getMonth() < 11) {
                            --f
                        }
                        return g._zpad(f);
                    default:
                        return h
                }
            });
            if (g.__("useArabicIndic") === true) {
                d = g._dRep(d)
            }
            return d
        },
        _btwn: function(d, c, b) {
            return (d > c && d < b)
        },
        _minStepFix: function() {
            var c = this.theDate.get(4),
                b = this.options.minuteStep,
                e = this.options.minStepRound,
                d = c % b;
            if (b > 1 && d > 0) {
                if (e < 0) {
                    c = c - d
                } else {
                    if (e > 0) {
                        c = c + (b - d)
                    } else {
                        if (c % b < b / 2) {
                            c = c - d
                        } else {
                            c = c + (b - d)
                        }
                    }
                }
                this.theDate.setMinutes(c)
            }
        },
        _offset: function(c, b, g) {
            var h = this,
                e = this.options,
                d = this.theDate,
                f = false;
            c = (c || "").toLowerCase();
            if (typeof g === "undefined") {
                g = true
            }
            if (c !== "a" && (typeof e.rolloverMode[c] === "undefined" || e.rolloverMode[c] === true)) {
                f = a.inArray(c, ["y", "m", "d", "h", "i", "s"])
            } else {
                switch (c) {
                    case "y":
                        f = 0;
                        break;
                    case "m":
                        if (h._btwn(d.get(1) + b, -1, 12)) {
                            f = 1
                        }
                        break;
                    case "d":
                        if (h._btwn(d.get(2) + b, 0, (32 - d.copy([0], [0, 0, 32, 13]).get(3) + 1))) {
                            f = 2
                        }
                        break;
                    case "h":
                        if (h._btwn(d.get(3) + b, -1, 24)) {
                            f = 3
                        }
                        break;
                    case "i":
                        if (h._btwn(d.get(4) + b, -1, 60)) {
                            f = 4
                        }
                        break;
                    case "s":
                        if (h._btwn(d.get(5) + b, -1, 60)) {
                            f = 5
                        }
                        break;
                    case "a":
                        h._offset("h", ((b > 0) ? 1 : -1) * 12, false);
                        break
                }
            }
            if (f !== false) {
                h.theDate.adj(f, b)
            }
            if (g === true) {
                h.refresh()
            }
            if (e.useImmediate) {
                h._t({
                    method: "doset"
                })
            }
            if (h.calBackDate !== false) {
                h._t({
                    method: "displayChange",
                    selectedDate: h.calBackDate,
                    shownDate: h.theDate,
                    thisChange: c,
                    thisChangeAmount: b,
                })
            }
            h._t({
                method: "offset",
                type: c,
                amount: b,
                newDate: h.theDate
            })
        },
        _startOffset: function(b) {
            var c = this.options;
            if (c.startOffsetYears !== false) {
                b.adj(0, c.startOffsetYears)
            }
            if (c.startOffsetMonths !== false) {
                b.adj(1, c.startOffsetMonths)
            }
            if (c.startOffsetDays !== false) {
                b.adj(2, c.startOffsetDays)
            }
            return b
        },
        _destroy: function() {
            var d = this,
                c = this.options,
                b = this.d.wrap.find("a");
            d.d.wrap.removeClass("ui-input-has-clear");
            b.remove();
            if (c.lockInput) {
                d.d.input.removeAttr("readonly")
            }
            d.d.input.off("datebox").off("focus.datebox").off("blur.datebox").off("change.datebox");
            a(document).off(d.drag.eMove).off(d.drag.eEnd).off(d.drag.eEndA)
        },
        _create: function() {
            a(document).trigger("dateboxcreate");
            var j = this,
                f = a.extend(this.options, this._getLongOptions(this.element), this.element.data("options")),
                g = ((f.theme === false) ? a.mobile.getInheritedTheme(this.element) : f.theme),
                i = f.useAnimation ? f.transition : "none",
                b = {
                    input: this.element,
                    wrap: this.element.parent(),
                    mainWrap: a("<div>", {
                        "class": "ui-datebox-container ui-overlay-shadow ui-corner-all ui-datebox-hidden " + i + " ui-body-" + g
                    }).css("zIndex", f.zindex),
                    intHTML: false
                },
                e = ".datebox" + this.uuid,
                h = (typeof window.ontouchstart !== "undefined"),
                c = {
                    eStart: (h ? "touchstart" : "mousedown") + e,
                    eMove: (h ? "touchmove" : "mousemove") + e,
                    eEnd: (h ? "touchend" : "mouseup") + e,
                    eEndA: (h ? (["mouseup", "touchend", "touchcanel", "touchmove"].join(e + " ") + e) : "mouseup" + e),
                    move: false,
                    start: false,
                    end: false,
                    pos: false,
                    target: false,
                    delta: false,
                    tmp: false
                };
            a.extend(j, {
                d: b,
                drag: c,
                touch: h
            });
            if (f.usePlaceholder !== false) {
                if (f.usePlaceholder === true && j._grabLabel() !== "") {
                    j.d.input.attr("placeholder", j._grabLabel())
                }
                if (typeof f.usePlaceholder === "string") {
                    j.d.input.attr("placeholder", f.usePlaceholder)
                }
            }
            f.theme = g;
            j.calBackDate = false;
            j.calDateVisible = true;
            j.disabled = false;
            j.runButton = false;
            j._date = window.Date;
            j._enhanceDate();
            j.baseID = j.d.input.attr("id");
            j.initDate = new j._date();
            j.initDate.setMilliseconds(0);
            j.theDate = (f.defaultValue) ? j._makeDate() : ((j.d.input.val() !== "") ? j._makeDate(j.d.input.val()) : new j._date());
            if (j.d.input.val() === "") {
                j._startOffset(j.theDate)
            }
            j.initDone = false;
            if (f.showInitialValue) {
                j.d.input.val(j._formatter(j.__fmt(), j.theDate))
            }
            if (f.useButton) {
                if (f.mode !== false) {
                    j.d.wrap.addClass("ui-input-has-clear");
                    if (f.buttonIcon === false) {
                        if (f.mode.substr(0, 4) === "time" || f.mode.substr(0, 3) === "dur") {
                            f.buttonIcon = f.buttonIconTime
                        } else {
                            f.buttonIcon = f.buttonIconDate
                        }
                    }
                    a("<a class='ui-input-clear ui-btn ui-icon-" + f.buttonIcon + " ui-btn-icon-notext ui-corner-all'></a>").attr("title", j.__("tooltip")).text(j.__("tooltip")).appendTo(j.d.wrap).on(f.clickEvent, function(d) {
                        d.preventDefault();
                        if (f.useFocus) {
                            j.d.input.focus()
                        } else {
                            if (!j.disabled) {
                                j._t({
                                    method: "open"
                                })
                            }
                        }
                    })
                }
            }
            if (f.hideInput) {
                j.d.wrap.hide()
            }
            if (f.hideContainer) {
                j.d.wrap.parent().hide()
            }
            j.d.input.on("focus.datebox", function() {
                j.d.input.addClass("ui-focus");
                if (j.disabled === false && f.useFocus) {
                    j._t({
                        method: "open"
                    })
                }
            }).on("blur.datebox", function() {
                j.d.input.removeClass("ui-focus")
            }).on("change.datebox", function() {
                j.theDate = j._makeDate(j.d.input.val());
                j.refresh()
            }).on("datebox", j._event);
            if (f.lockInput) {
                j.d.input.attr("readonly", "readonly")
            }
            if (typeof a.event.special.mousewheel !== "undefined") {
                j.wheelExists = true
            }
            if (j.d.input.is(":disabled")) {
                j.disable()
            }
            j.applyMinMax(false, false);
            if (f.useInline || f.useInlineBlind) {
                j.open()
            }
            a(document).trigger("dateboxaftercreate")
        },
        applyMinMax: function(h, g) {
            var j, c, d, b, k = this,
                f = this.options,
                i = new this._date(),
                e = 24 * 60 * 60 * 1000;
            j = k._pa([0, 0, 0], i);
            if (typeof h === "undefined") {
                h = true
            }
            if (typeof g === "undefined") {
                g = true
            }
            if ((g === true || f.minDays === false) && (typeof k.d.input.attr("min") !== "undefined")) {
                c = k.d.input.attr("min").split("-");
                d = new k._date(c[0], c[1] - 1, c[2], 0, 0, 0, 0);
                b = (d.getTime() - j.getTime()) / e;
                f.minDays = parseInt(b * -1, 10) + 0
            }
            if ((g === true || f.maxDays === false) && (typeof k.d.input.attr("max") !== "undefined")) {
                c = k.d.input.attr("max").split("-");
                d = new k._date(c[0], c[1] - 1, c[2], 0, 0, 0, 0);
                b = (d.getTime() - j.getTime()) / e;
                f.maxDays = parseInt(b, 10) - 1
            }
            if (h === true) {
                k._t({
                    method: "refresh"
                })
            }
        },
        _build: {
            "default": function() {
                this.d.headerText = "Error";
                if (this.d.intHTML !== false) {
                    this.d.intHTML.remove().empty()
                }
                this.d.intHTML = a("<div class='ui-body-b'><h2 style='text-align:center'>Unknown Mode</h2></div>")
            }
        },
        _drag: {
            "default": function() {
                return false
            }
        },
        open: function() {
            var e = this,
                c = this.options,
                d = {
                    transition: (c.useAnimation ? c.transition : "none")
                },
                b = {
                    history: false,
                    transition: (c.useAnimation ? c.transition : "none")
                };
            if (c.useFocus && e.fastReopen === true) {
                e.d.input.blur();
                return false
            }
            e.theDate = e._makeDate(e.d.input.val());
            e.calBackDate = false;
            if (e.d.input.val() === "") {
                e._startOffset(e.theDate)
            }
            e.d.input.blur();
            if (typeof e._build[c.mode] === "undefined") {
                e._build["default"].apply(e, [])
            } else {
                e._build[c.mode].apply(e, [])
            }
            if (typeof e._drag[c.mode] !== "undefined") {
                e._drag[c.mode].apply(e, [])
            }
            e._t({
                method: "refresh"
            });
            if (e.__("useArabicIndic") === true) {
                e._doIndic()
            }
            if ((c.useInline || c.useInlineBlind) && e.initDone === false) {
                e.d.mainWrap.append(e.d.intHTML);
                if (c.hideContainer) {
                    if (c.useHeader) {
                        e.d.mainWrap.prepend(a("<div class='ui-header ui-bar-" + c.themeHeader + "'><h1 class='ui-title'>" + e.d.headerText + "</h1></div>"))
                    }
                    e.d.wrap.parent().after(e.d.mainWrap)
                } else {
                    e.d.wrap.parent().append(e.d.mainWrap)
                }
                e.d.mainWrap.removeClass("ui-datebox-hidden ui-overlay-shadow");
                if (c.useInline) {
                    e.d.mainWrap.addClass("ui-datebox-inline").css("zIndex", "auto");
                    if (!c.hideInput && !c.hideContainer) {
                        e.d.mainWrap.addClass("ui-datebox-inline-has-input")
                    }
                    setTimeout((function(f) {
                        return function() {
                            f._t({
                                method: "postrefresh"
                            })
                        }
                    }(e)), 100);
                    return true
                } else {
                    e.d.mainWrap.addClass("ui-datebox-inline ui-datebox-inline-has-input").css("zIndex", "auto");
                    e.d.mainWrap.hide()
                }
                e.initDone = false;
                e._t({
                    method: "postrefresh"
                })
            }
            if (c.useInlineBlind) {
                if (e.initDone) {
                    e.refresh();
                    e.d.mainWrap.slideDown();
                    e._t({
                        method: "postrefresh"
                    })
                } else {
                    e.initDone = true
                }
                return true
            }
            if (e.d.intHTML.is(":visible")) {
                return false
            }
            e.d.mainWrap.empty();
            if (c.useHeader) {
                e.d.mainWrap.append(a("<a>Close</a>").addClass("ui-btn-left ui-link ui-btn ui-btn-" + ((c.themeCloseButton === false) ? c.themeHeader : c.themeCloseButton) + " ui-icon-delete ui-btn-icon-notext ui-shadow ui-corner-all").on(c.clickEventAlt, function(f) {
                    f.preventDefault();
                    e._t({
                        method: "close"
                    })
                }));
                e.d.mainWrap.append(a("<div class='ui-header ui-bar-" + c.themeHeader + "'><h1 class='ui-title'>" + e.d.headerText + "</h1></div>"))
            }
            e.d.mainWrap.append(e.d.intHTML).css("zIndex", c.zindex);
            e._t({
                method: "postrefresh"
            });
            if (c.popupPosition !== false) {
                d.positionTo = c.popupPosition
            } else {
                if (typeof e.baseID !== "undefined") {
                    d.positionTo = "#" + e.baseID
                } else {
                    d.positionTo = "window"
                }
            }
            if (c.popupForceX !== false && c.popupForceY !== false) {
                d.x = parseInt(c.popupForceX, 10);
                d.y = parseInt(c.popupForceY, 10);
                d.positionTo = "origin"
            }
            if (c.useModal) {
                b.overlayTheme = c.useModalTheme;
                b.dismissible = false
            }
            if (c.openCallback !== false) {
                if (!a.isFunction(c.openCallback)) {
                    if (typeof window[c.openCallback] === "function") {
                        c.openCallback = window[c.openCallback]
                    }
                }
                b.afteropen = function() {
                    e._t({
                        method: "postrefresh"
                    });
                    if (c.openCallback.apply(e, a.merge([{
                            custom: e.customCurrent,
                            initDate: e.initDate,
                            date: e.theDate,
                            duration: e.lastDuration
                        }], c.openCallbackArgs)) === false) {
                        e._t({
                            method: "close"
                        })
                    }
                }
            } else {
                b.afteropen = function() {
                    e._t({
                        method: "postrefresh"
                    })
                }
            }
            if (c.closeCallback !== false) {
                if (!a.isFunction(c.closeCallback)) {
                    if (typeof window[c.closeCallback] === "function") {
                        c.closeCallback = window[c.closeCallback]
                    }
                }
                b.afterclose = function() {
                    c.closeCallback.apply(e, a.merge([{
                        custom: e.customCurrent,
                        initDate: e.initDate,
                        date: e.theDate,
                        duration: e.lastDuration
                    }], c.closeCallbackArgs))
                }
            }
            if (c.beforeOpenCallback !== false) {
                if (!a.isFunction(c.beforeOpenCallback)) {
                    if (typeof window[c.beforeOpenCallback] === "function") {
                        c.beforeOpenCallback = window[c.beforeOpenCallback]
                    }
                }
                if (c.beforeOpenCallback.apply(e, a.merge([{
                        custom: e.customCurrent,
                        initDate: e.initDate,
                        date: e.theDate,
                        duration: e.lastDuration
                    }], c.beforeOpenCallbackArgs)) === false) {
                    return false
                }
            }
            e.d.mainWrap.removeClass("ui-datebox-hidden").popup(b).popup("open", d)
        },
        close: function() {
            var c = this,
                b = this.options;
            c.calBackDate = false;
            if (b.useInlineBlind) {
                c.d.mainWrap.slideUp();
                return true
            }
            if (b.useInline || c.d.intHTML === false) {
                return true
            }
            c.d.mainWrap.popup("close");
            a(document).off(c.drag.eMove).off(c.drag.eEnd).off(c.drag.eEndA);
            if (b.useFocus) {
                c.fastReopen = true;
                setTimeout((function(d) {
                    return function() {
                        d.fastReopen = false
                    }
                }(c)), 300)
            }
        },
        refresh: function() {
            var c = this,
                b = this.options;
            if (typeof c._build[b.mode] === "undefined") {
                c._build["default"].apply(c, [])
            } else {
                c._build[b.mode].apply(c, [])
            }
            if (c.__("useArabicIndic") === true) {
                c._doIndic()
            }
            c.d.mainWrap.append(c.d.intHTML);
            c._t({
                method: "postrefresh"
            })
        },
        _check: function() {
            var g, j, d, b, c, h = this,
                f = this.options,
                e = this.theDate;
            h.dateOK = true;
            if (typeof f.mode === "undefined") {
                return true
            }
            if (f.afterToday) {
                g = new h._date();
                if (e < g) {
                    e = g
                }
            }
            if (f.beforeToday) {
                g = new h._date();
                if (e > g) {
                    e = g
                }
            }
            if (f.maxDays !== false) {
                g = new h._date();
                g.adj(2, f.maxDays);
                if (e > g) {
                    e = g
                }
            }
            if (f.minDays !== false) {
                g = new h._date();
                g.adj(2, -1 * f.minDays);
                if (e < g) {
                    e = g
                }
            }
            if (f.minHour !== false) {
                if (e.get(3) < f.minHour) {
                    e.setD(3, f.minHour)
                }
            }
            if (f.maxHour !== false) {
                if (e.get(3) > f.maxHour) {
                    e.setD(3, f.maxHour)
                }
            }
            if (f.maxYear !== false) {
                g = new h._date(f.maxYear, 11, 31);
                if (e > g) {
                    e = g
                }
            }
            if (f.minYear !== false) {
                g = new h._date(f.minYear, 0, 1);
                if (e < g) {
                    e = g
                }
            }
            if (f.mode.substr(0, 4) === "time" || f.mode.substr(0, 3) === "dur") {
                if (f.mode === "timeflipbox" && f.validHours !== false) {
                    if (a.inArray(e.get(3), f.validHours) < 0) {
                        h.dateOK = false
                    }
                }
            } else {
                if (f.blackDatesRec !== false) {
                    j = e.get(0);
                    d = e.get(1);
                    b = e.get(2);
                    for (c = 0; c < f.blackDatesRec.length; c++) {
                        if ((f.blackDatesRec[c][0] === -1 || f.blackDatesRec[c][0] === j) && (f.blackDatesRec[c][1] === -1 || f.blackDatesRec[c][1] === d) && (f.blackDatesRec[c][2] === -1 || f.blackDatesRec[c][2] === b)) {
                            h.dateOK = false
                        }
                    }
                }
                if (f.blackDates !== false) {
                    if (a.inArray(e.iso(), f.blackDates) > -1) {
                        h.dateOK = false
                    }
                }
                if (f.blackDays !== false) {
                    if (a.inArray(e.getDay(), f.blackDays) > -1) {
                        h.dateOK = false
                    }
                }
                if (f.whiteDates !== false) {
                    if (a.inArray(e.iso(), f.whiteDates) > -1) {
                        h.dateOK = true
                    }
                }
            }
            h.theDate = e
        },
        _grabLabel: function() {
            var b, c, f = this,
                d = this.options,
                e = false;
            if (typeof d.overrideDialogLabel === "undefined") {
                b = f.d.input.attr("placeholder");
                c = f.d.input.attr("title");
                if (typeof b !== "undefined") {
                    return b
                }
                if (typeof c !== "undefined") {
                    return c
                }
                e = a(document).find("label[for='" + f.d.input.attr("id") + "']").text();
                return (e === "") ? false : e
            }
            return d.overrideDialogLabel
        },
        _stdBtn: {
            clear: function() {
                var c = this,
                    b = this.options;
                return a("<a role='button'>" + c.__("clearButton") + "</a>").addClass("ui-btn ui-btn-" + b.theme + " ui-icon-delete ui-btn-icon-left ui-shadow ui-corner-all").on(b.clickEventAlt, function(d) {
                    d.preventDefault();
                    c.d.input.val("");
                    c._t({
                        method: "clear"
                    });
                    c._t({
                        method: "close"
                    })
                })
            },
            close: function(c) {
                var d = this,
                    b = this.options;
                return a("<a role='button'>" + c + "</a>").addClass("ui-btn ui-btn-" + b.themeSetButton + " ui-icon-check ui-btn-icon-left ui-shadow ui-corner-all" + ((d.dateOK === true) ? "" : " ui-state-disabled")).on(b.clickEventAlt, function(f) {
                    f.preventDefault();
                    if (d.dateOK === true) {
                        d._t({
                            method: "set",
                            value: d._formatter(d.__fmt(), d.theDate),
                            date: d.theDate
                        });
                        d._t({
                            method: "close"
                        })
                    }
                })
            }
        },
        _makeEl: function(e, c) {
            var b = false,
                d = false;
            d = e.clone();
            if (typeof c.attr !== "undefined") {
                for (b in c.attr) {
                    if (c.attr.hasOwnProperty(b)) {
                        d.data(b, c.attr[b])
                    }
                }
            }
            return d
        },
        _getLongOptions: function(b) {
            var c, g, f = {},
                d = "datebox",
                e = 7;
            for (c in b.data()) {
                if (c.substr(0, e) === d && c.length > e) {
                    g = c.substr(e);
                    g = g.charAt(0).toLowerCase() + g.slice(1);
                    if (g !== "options") {
                        f[g] = b.data(c)
                    }
                }
            }
            return f
        },
        disable: function() {
            var b = this;
            b.d.input.attr("disabled", true);
            b.d.wrap.addClass("ui-state-disabled").blur();
            b.disabled = true;
            b.d.mainWrap.addClass("ui-state-disabled");
            b._t({
                method: "disable"
            })
        },
        enable: function() {
            var b = this;
            b.d.input.attr("disabled", false);
            b.d.wrap.removeClass("ui-state-disabled");
            b.disabled = false;
            b.d.mainWrap.removeClass("ui-state-disabled");
            b._t({
                method: "enable"
            })
        },
        _setOption: function() {
            a.Widget.prototype._setOption.apply(this, arguments);
            this.refresh()
        },
        getTheDate: function() {
            if (this.calBackDate !== false) {
                return this.calBackDate
            }
            return this.theDate
        },
        getLastDur: function() {
            return this.lastDuration
        },
        dateVisible: function() {
            return this.calDateVisible
        },
        setTheDate: function(b) {
            if (typeof(b) === "object") {
                this.theDate = b
            } else {
                this.theDate = this._makeDate(b)
            }
            this.refresh();
            this._t({
                method: "doset"
            })
        },
        parseDate: function(b, d) {
            var c, e = this;
            e.fmtOver = b;
            c = e._makeDate(d);
            e.fmtOver = false;
            return c
        },
        callFormat: function(c, b) {
            return this._formatter(c, b)
        },
        getOption: function(c) {
            var b = this.__(c);
            if (typeof b !== "undefined") {
                return b
            } else {
                return this.options[c]
            }
        },
        _t: function(b) {
            this.d.input.trigger("datebox", b)
        }
    })
})(jQuery);
/* CALBOX Mode */
(function(a) {
    a.extend(a.mobile.datebox.prototype.options, {
        themeDateToday: "b",
        themeDayHigh: "b",
        themeDatePick: "b",
        themeDateHigh: "b",
        themeDateHighAlt: "b",
        themeDateHighRec: "b",
        themeDate: "a",
        calNextMonthIcon: "plus",
        calPrevMonthIcon: "minus",
        calHighToday: true,
        calHighPick: true,
        calShowDays: true,
        calOnlyMonth: false,
        calWeekMode: false,
        calWeekModeDay: 1,
        calControlGroup: false,
        calShowWeek: false,
        calUsePickers: false,
        calNoHeader: false,
        calFormatter: false,
        calYearPickMin: -6,
        calYearPickMax: 6,
        useTodayButton: false,
        useTomorrowButton: false,
        useCollapsedBut: false,
        highDays: false,
        highDates: false,
        highDatesRec: false,
        highDatesAlt: false,
        enableDates: false,
        calDateList: false,
        calShowDateList: false
    });
    a.extend(a.mobile.datebox.prototype, {
        _cal_gen: function(l, i, e, h, f) {
            var j = 0,
                c = 0,
                d = 1,
                g = 1,
                b = [],
                k = [],
                m = false;
            for (j = 0; j <= 5; j++) {
                if (m === false) {
                    k = [];
                    for (c = 0; c <= 6; c++) {
                        if (j === 0 && c < l) {
                            if (h === true) {
                                k.push([i + (c - l) + 1, f - 1])
                            } else {
                                k.push(false)
                            }
                        } else {
                            if (j > 3 && d > e) {
                                if (h === true) {
                                    k.push([g, f + 1]);
                                    g++
                                } else {
                                    k.push(false)
                                }
                                m = true
                            } else {
                                k.push([d, f]);
                                d++;
                                if (d > e) {
                                    m = true
                                }
                            }
                        }
                    }
                    b.push(k)
                }
            }
            return b
        },
        _cal_check: function(c, s, l, d, f) {
            var r = this,
                h, m = this.options,
                j = f.x,
                k = f.i,
                q = f.t,
                n = f.p,
                e = new this._date(s, l, d, 0, 0, 0, 0).getDay(),
                b = m.blackDatesRec,
                g = m.highDatesRec,
                p = {
                    ok: true,
                    iso: s + "-" + r._zPad(l + 1) + "-" + r._zPad(d),
                    theme: m.themeDate,
                    force: false,
                    recok: true,
                    rectheme: false
                };
            if (l === 12) {
                p.iso = (s + 1) + "-01-" + r._zPad(d)
            }
            if (l === -1) {
                p.iso = (s - 1) + "-12-" + r._zPad(d)
            }
            p.comp = parseInt(p.iso.replace(/-/g, ""), 10);
            if (b !== false) {
                for (h = 0; h < b.length; h++) {
                    if ((b[h][0] === -1 || b[h][0] === s) && (b[h][1] === -1 || b[h][1] === l) && (b[h][2] === -1 || b[h][2] === d)) {
                        p.ok = false
                    }
                }
            }
            if (a.isArray(m.enableDates) && a.inArray(p.iso, m.enableDates) < 0) {
                p.ok = false
            } else {
                if (c) {
                    if ((p.recok !== true) || (m.afterToday && q.comp() > p.comp) || (m.beforeToday && q.comp() < p.comp) || (m.notToday && q.comp() === p.comp) || (m.maxDays !== false && j.comp() < p.comp) || (m.minDays !== false && k.comp() > p.comp) || (a.isArray(m.blackDays) && a.inArray(e, m.blackDays) > -1) || (a.isArray(m.blackDates) && a.inArray(p.iso, m.blackDates) > -1)) {
                        p.ok = false
                    }
                }
            }
            if (a.isArray(m.whiteDates) && a.inArray(p.iso, m.whiteDates) > -1) {
                p.ok = true
            }
            if (p.ok) {
                if (g !== false) {
                    for (h = 0; h < g.length; h++) {
                        if ((g[h][0] === -1 || g[h][0] === s) && (g[h][1] === -1 || g[h][1] === l) && (g[h][2] === -1 || g[h][2] === d)) {
                            p.rectheme = true
                        }
                    }
                }
                if (m.calHighPick && d === n && (r.d.input.val() !== "" || m.defaultValue !== false)) {
                    p.theme = m.themeDatePick
                } else {
                    if (m.calHighToday && p.comp === q.comp()) {
                        p.theme = m.themeDateToday
                    } else {
                        if (m.calHighPick && r.calDateVisible && r.calBackDate !== false && r.calBackDate.comp() === p.comp) {
                            p.theme = m.themeDatePick;
                            p.force = true
                        } else {
                            if (a.isArray(m.highDatesAlt) && (a.inArray(p.iso, m.highDatesAlt) > -1)) {
                                p.theme = m.themeDateHighAlt
                            } else {
                                if (a.isArray(m.highDates) && (a.inArray(p.iso, m.highDates) > -1)) {
                                    p.theme = m.themeDateHigh
                                } else {
                                    if (a.isArray(m.highDays) && (a.inArray(e, m.highDays) > -1)) {
                                        p.theme = m.themeDayHigh
                                    } else {
                                        if (a.isArray(m.highDatesRec) && p.rectheme === true) {
                                            p.theme = m.themeDateHighRec
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return p
        }
    });
    a.extend(a.mobile.datebox.prototype._build, {
        calbox: function() {
            var O, H, d, y, R, D, M, j, N, k, z, A, J, I, x, v, c, b, Q = this,
                G = this.options,
                u = G.calDateList,
                P = "ui-datebox-",
                q = ((Q.calBackDate !== false && Q.theDate.get(0) === Q.calBackDate.get(0) && Q.theDate.get(1) === Q.calBackDate.get(1)) ? new Q._date(Q.calBackDate.getTime()) : Q.theDate),
                g = false,
                f = {},
                F = Q.initDate.copy(),
                E = Q.initDate.copy(),
                m = (q.copy([0], [0, 0, 1]).getDay() - Q.__("calStartDay") + 7) % 7,
                s = q.get(1),
                t = q.get(0),
                r = q.getArray(),
                K = (Q.d.input.val() === "") ? Q._startOffset(Q._makeDate(Q.d.input.val())) : Q._makeDate(Q.d.input.val()),
                L = -1,
                n = new Q._date(),
                p = n.getArray(),
                T = q.copy([0], [0, 0, 1]).adj(2, (-1 * m) + (Q.__("calStartDay") === 0 ? 1 : 0)).getDWeek(4),
                S = 0,
                B = false,
                C = false,
                h = 32 - Q.theDate.copy([0], [0, 0, 32, 13]).getDate(),
                l = 32 - Q.theDate.copy([0, -1], [0, 0, 32, 13]).getDate(),
                e = (G.afterToday || G.beforeToday || G.notToday || G.maxDays || G.minDays || G.blackDays || G.blackDates) ? true : false;
            if (Q.calBackDate !== false) {
                if (Q.theDate.get(0) === Q.calBackDate.get(0) && Q.theDate.get(1) === Q.calBackDate.get(1)) {
                    Q.theDate = new Q._date(Q.calBackDate.getTime());
                    Q.calBackDate = false
                }
            }
            if (typeof Q.d.intHTML !== "boolean") {
                Q.d.intHTML.remove();
                Q.d.intHTML = null
            }
            Q.d.headerText = ((Q._grabLabel() !== false) ? Q._grabLabel() : Q.__("titleDateDialogLabel"));
            Q.d.intHTML = a("<span>");
            a("<div class='" + P + "gridheader'><div class='" + P + "gridlabel'><h4>" + Q._formatter(Q.__("calHeaderFormat"), Q.theDate) + "</h4></div></div>").appendTo(Q.d.intHTML);
            a("<div class='" + P + "gridplus" + (Q.__("isRTL") ? "-rtl" : "") + "'><a>" + Q.__("nextMonth") + "</a></div>").prependTo(Q.d.intHTML.find("." + P + "gridheader")).find("a").addClass("ui-btn-inline ui-link ui-btn ui-btn-" + G.themeDate + " ui-icon-" + G.calNextMonthIcon + " ui-btn-icon-notext ui-shadow ui-corner-all").on(G.clickEventAlt, function(i) {
                i.preventDefault();
                if (Q.calNext) {
                    if (Q.calBackDate === false) {
                        Q.calBackDate = new Date(Q.theDate.getTime())
                    }
                    if (Q.theDate.getDate() > 28) {
                        Q.theDate.setDate(1)
                    }
                    Q._offset("m", 1)
                }
            });
            a("<div class='" + P + "gridminus" + (Q.__("isRTL") ? "-rtl" : "") + "'><a>" + Q.__("prevMonth") + "</a></div>").prependTo(Q.d.intHTML.find("." + P + "gridheader")).find("a").addClass("ui-btn-inline ui-link ui-btn ui-btn-" + G.themeDate + " ui-icon-" + G.calPrevMonthIcon + " ui-btn-icon-notext ui-shadow ui-corner-all").on(G.clickEventAlt, function(i) {
                i.preventDefault();
                if (Q.calPrev) {
                    if (Q.calBackDate === false) {
                        Q.calBackDate = new Date(Q.theDate.getTime())
                    }
                    if (Q.theDate.getDate() > 28) {
                        Q.theDate.setDate(1)
                    }
                    Q._offset("m", -1)
                }
            });
            if (G.calNoHeader) {
                if (G.calUsePickersIcons) {
                    Q.d.intHTML.find("." + P + "gridlabel").hide()
                } else {
                    Q.d.intHTML.find("." + P + "gridheader").remove()
                }
            }
            Q.calNext = true;
            Q.calPrev = true;
            if (Math.floor(n.comp() / 100) === Math.floor(q.comp() / 100)) {
                B = true
            }
            if (Math.floor(n.comp() / 10000) === Math.floor(q.comp() / 10000)) {
                C = true
            }
            if (K.comp() === q.comp()) {
                L = K.get(2)
            }
            if (G.afterToday && (B || (C && p[1] >= r[1]))) {
                Q.calPrev = false
            }
            if (G.beforeToday && (B || (C && p[1] <= r[1]))) {
                Q.calNext = false
            }
            if (G.minDays !== false) {
                F.adj(2, G.minDays * -1);
                O = F.getArray();
                if (r[0] === O[0] && r[1] <= O[1]) {
                    Q.calPrev = false
                }
            }
            if (G.maxDays !== false) {
                E.adj(2, G.maxDays);
                O = F.getArray();
                if (r[0] === O[0] && r[1] >= O[1]) {
                    Q.calNext = false
                }
            }
            if (G.calUsePickers) {
                H = a("<div>");
                if (G.calNoHeader && G.calUsePickersIcons) {
                    H.addClass("ui-datebox-pickicon")
                }
                H.i = a("<fieldset>").appendTo(H);
                H.a = a("<select>").appendTo(H.i);
                H.b = a("<select>").appendTo(H.i);
                for (A = 0; A <= 11; A++) {
                    H.a.append(a("<option value='" + A + "'" + ((s === A) ? " selected='selected'" : "") + ">" + Q.__("monthsOfYear")[A] + "</option>"))
                }
                if (G.calYearPickMin < 1) {
                    J = t + G.calYearPickMin
                } else {
                    if (G.calYearPickMin < 1800) {
                        J = t - G.calYearPickMin
                    } else {
                        if (G.calYearPickMin === "NOW") {
                            J = p[0]
                        } else {
                            J = G.calYearPickMin
                        }
                    }
                }
                if (G.calYearPickMax < 1800) {
                    I = t + G.calYearPickMax
                } else {
                    if (G.calYearPickMax === "NOW") {
                        I = p[0]
                    } else {
                        I = G.calYearPickMax
                    }
                }
                for (A = J; A <= I; A++) {
                    H.b.append(a("<option value='" + A + "'" + ((t === A) ? " selected='selected'" : "") + ">" + A + "</option>"))
                }
                H.a.on("change", function() {
                    if (Q.calBackDate === false) {
                        Q.calBackDate = new Date(Q.theDate.getTime())
                    }
                    Q.theDate.setD(1, a(this).val());
                    if (Q.theDate.get(1) !== parseInt(a(this).val(), 10)) {
                        Q.theDate.setD(2, 0)
                    }
                    if (Q.calBackDate !== false) {
                        Q._t({
                            method: "displayChange",
                            selectedDate: Q.calBackDate,
                            shownDate: Q.theDate,
                            thisChange: "p",
                            thisChangeAmount: null
                        })
                    }
                    Q.refresh()
                });
                H.b.on("change", function() {
                    if (Q.calBackDate === false) {
                        Q.calBackDate = new Date(Q.theDate.getTime())
                    }
                    Q.theDate.setD(0, a(this).val());
                    if (Q.theDate.get(1) !== parseInt(H.a.val(), 10)) {
                        Q.theDate.setD(2, 0)
                    }
                    if (Q.calBackDate !== false) {
                        Q._t({
                            method: "displayChange",
                            selectedDate: Q.calBackDate,
                            shownDate: Q.theDate,
                            thisChange: "p",
                            thisChangeAmount: null
                        })
                    }
                    Q.refresh()
                });
                H.i.controlgroup({
                    mini: true,
                    type: "horizontal"
                });
                H.i.find("select").selectmenu({
                    nativeMenu: true
                });
                H.i.find(".ui-controlgroup-controls").css({
                    marginRight: "auto",
                    marginLeft: "auto",
                    width: "100%",
                    display: "table",
                });
                H.i.find(".ui-select").first().css({
                    width: "60%"
                }).end().last().css({
                    width: "40%"
                });
                if (G.calNoHeader && G.calUsePickersIcons) {
                    H.i.css({
                        padding: "0 10px 5px 10px"
                    })
                }
                H.appendTo(Q.d.intHTML)
            }
            d = a("<div class='" + P + "grid'>").appendTo(Q.d.intHTML);
            if (G.calShowDays) {
                Q._cal_days = Q.__("daysOfWeekShort").concat(Q.__("daysOfWeekShort"));
                R = a("<div>", {
                    "class": P + "gridrow"
                }).appendTo(d);
                if (G.calControlGroup) {
                    R.addClass(P + "gridrow-last")
                }
                if (Q.__("isRTL") === true) {
                    R.css("direction", "rtl")
                }
                if (G.calShowWeek) {
                    a("<div>").addClass(P + "griddate " + P + "griddate-label").appendTo(R)
                }
                for (A = 0; A <= 6; A++) {
                    a("<div>").text(Q._cal_days[(A + Q.__("calStartDay")) % 7]).addClass(P + "griddate " + P + "griddate-label").appendTo(R)
                }
            }
            f = {
                i: F,
                x: E,
                t: n,
                p: L
            };
            y = Q._cal_gen(m, l, h, !G.calOnlyMonth, q.get(1));
            if (!a.isFunction(G.calFormatter) && G.calFormatter !== false && a.isFunction(window[G.calFormatter])) {
                G.calFormatter = window[G.calFormatter]
            }
            c = new Date(Q.theDate.get(0), y[0][0][1], y[0][0][0], 0, 0, 0, 0);
            b = new Date(Q.theDate.get(0), y[y.length - 1][6][1], y[y.length - 1][6][0], 0, 0, 0, 0);
            if (Q.calBackDate === false) {
                Q.calDateVisible = true
            } else {
                if (G.calOnlyMonth) {
                    Q.calDateVisible = false
                } else {
                    if (Q.calBackDate.comp() < c.comp() || Q.calBackDate.comp() > b.comp()) {
                        Q.calDateVisible = false
                    } else {
                        Q.calDateVisible = true
                    }
                }
            }
            for (M = 0, N = y.length; M < N; M++) {
                z = a("<div>", {
                    "class": P + "gridrow"
                });
                if (Q.__("isRTL")) {
                    z.css("direction", "rtl")
                }
                if (G.calShowWeek) {
                    a("<div>", {
                        "class": P + "griddate " + P + "griddate-empty"
                    }).text("W" + T).css((G.calControlGroup ? {
                        "float": "left"
                    } : {})).appendTo(z);
                    T++;
                    if (T > 52 && typeof(y[M + 1]) !== "undefined") {
                        T = new Q._date(r[0], r[1], (Q.__("calStartDay") === 0) ? y[M + 1][1][0] : y[M + 1][0][0], 0, 0, 0, 0).getDWeek(4)
                    }
                }
                for (j = 0, k = y[M].length; j < k; j++) {
                    if (G.calWeekMode) {
                        S = y[M][G.calWeekModeDay][0]
                    }
                    if (typeof y[M][j] === "boolean") {
                        a("<div>", {
                            "class": P + "griddate " + P + "griddate-empty"
                        }).appendTo(z)
                    } else {
                        g = Q._cal_check(e, r[0], y[M][j][1], y[M][j][0], f);
                        if (y[M][j][0]) {
                            if (!a.isFunction(G.calFormatter)) {
                                x = {
                                    text: y[M][j][0],
                                    "class": ""
                                }
                            } else {
                                v = {
                                    Year: ((y[M][j][1] > 11) ? t + 1 : (y[M][j][1] < 0) ? t - 1 : t),
                                    Month: ((y[M][j][1] === 12) ? 0 : (y[M][j][1] === -1) ? 11 : y[M][j][1]),
                                    Date: y[M][j][0]
                                };
                                v.ISO = v.Year + "-" + Q._zPad(v.Month + 1) + "-" + Q._zPad(v.Date);
                                v.Comp = parseInt(v.ISO.replace(/-/g, ""), 10);
                                v.dateVisible = Q.calDateVisible;
                                O = G.calFormatter(v);
                                if (typeof O !== "object") {
                                    x = {
                                        text: O,
                                        "class": ""
                                    }
                                } else {
                                    x = {
                                        text: O.text,
                                        "class": O["class"]
                                    }
                                }
                            }
                            a("<div>").html(x.text).addClass(P + "griddate ui-corner-all ui-btn").addClass((s === y[M][j][1] || g.force) ? ("ui-btn-" + g.theme + (g.ok ? "" : " ui-state-disabled")) : (P + "griddate-empty")).addClass(x["class"]).css((s !== y[M][j][1] && !G.calOnlyMonth) ? {
                                cursor: "pointer"
                            } : {}).data("date", ((G.calWeekMode) ? S : y[M][j][0])).data("enabled", g.ok).data("month", y[M][((G.calWeekMode) ? G.calWeekModeDay : j)][1]).appendTo(z)
                        }
                    }
                }
                if (G.calControlGroup) {
                    z.controlgroup({
                        type: "horizontal"
                    })
                }
                if (M === N - 1) {
                    z.addClass(P + "gridrow-last")
                }
                z.appendTo(d)
            }
            if (G.calShowWeek) {
                d.find("." + P + "griddate").addClass(P + "griddate-week")
            }
            if (G.calShowDateList && u !== false) {
                D = a("<div>");
                D.a = a("<select name='pickdate'></select>").appendTo(D);
                D.a.append("<option value='false' selected='selected'>" + Q.__("calDateListLabel") + "</option>");
                for (A = 0; A < u.length; A++) {
                    D.a.append(a("<option value='" + u[A][0] + "'>" + u[A][1] + "</option>"))
                }
                D.a.on("change", function() {
                    O = a(this).val().split("-");
                    Q.theDate = new Q._date(O[0], O[1] - 1, O[2], 0, 0, 0, 0);
                    Q._t({
                        method: "doset"
                    })
                });
                D.find("select").selectmenu({
                    mini: true,
                    nativeMenu: true
                });
                D.appendTo(d)
            }
            if (G.useTodayButton || G.useTomorrowButton || G.useClearButton) {
                z = a("<div>", {
                    "class": P + "controls"
                });
                if (G.useTodayButton) {
                    a("<a role='button'>" + Q.__("calTodayButtonLabel") + "</a>").appendTo(z).addClass("ui-btn ui-btn-" + G.theme + " ui-icon-navigation ui-btn-icon-left ui-shadow ui-corner-all").on(G.clickEvent, function(i) {
                        i.preventDefault();
                        Q.theDate = Q._pa([0, 0, 0], new Q._date());
                        Q.calBackDate = false;
                        Q._t({
                            method: "doset"
                        })
                    })
                }
                if (G.useTomorrowButton) {
                    a("<a role='button'>" + Q.__("calTomorrowButtonLabel") + "</a>").appendTo(z).addClass("ui-btn ui-btn-" + G.theme + " ui-icon-navigation ui-btn-icon-left ui-shadow ui-corner-all").on(G.clickEvent, function(i) {
                        i.preventDefault();
                        Q.theDate = Q._pa([0, 0, 0], new Q._date()).adj(2, 1);
                        Q.calBackDate = false;
                        Q._t({
                            method: "doset"
                        })
                    })
                }
                if (G.useClearButton) {
                    z.append(Q._stdBtn.clear.apply(Q))
                }
                if (G.useCollapsedBut) {
                    z.controlgroup({
                        type: "horizontal"
                    });
                    z.addClass("ui-datebox-collapse")
                } else {
                    z.controlgroup()
                }
                z.appendTo(d)
            }
            Q.d.intHTML.on(G.clickEventAlt, "div." + P + "griddate", function(i) {
                i.preventDefault();
                if (a(this).data("enabled")) {
                    Q.calBackDate = false;
                    Q.theDate.setD(2, 1).setD(1, a(this).jqmData("month")).setD(2, a(this).data("date"));
                    Q._t({
                        method: "set",
                        value: Q._formatter(Q.__fmt(), Q.theDate),
                        date: Q.theDate
                    });
                    Q._t({
                        method: "close"
                    })
                }
            });
            Q.d.intHTML.on("swipeleft", function() {
                if (Q.calNext) {
                    if (Q.calBackDate === false) {
                        Q.calBackDate = new Date(Q.theDate.getTime())
                    }
                    Q._offset("m", 1)
                }
            }).on("swiperight", function() {
                if (Q.calPrev) {
                    if (Q.calBackDate === false) {
                        Q.calBackDate = new Date(Q.theDate.getTime())
                    }
                    Q._offset("m", -1)
                }
            });
            if (Q.wheelExists) {
                Q.d.intHTML.on("mousewheel", function(o, i) {
                    o.preventDefault();
                    if (i > 0 && Q.calNext) {
                        if (Q.calBackDate === false) {
                            Q.calBackDate = new Date(Q.theDate.getTime())
                        }
                        Q.theDate.setD(2, 1);
                        Q._offset("m", 1)
                    }
                    if (i < 0 && Q.calPrev) {
                        if (Q.calBackDate === false) {
                            Q.calBackDate = new Date(Q.theDate.getTime())
                        }
                        Q.theDate.setD(2, 1);
                        Q._offset("m", -1)
                    }
                })
            }
        }
    })
})(jQuery);
/* DATEBOX/TIMEBOX/DURATIONBOX modes */
(function(a) {
    a.extend(a.mobile.datebox.prototype.options, {
        themeButton: "a",
        themeInput: "a",
        useSetButton: true,
        validHours: false,
        repButton: true,
        durationStep: 1,
        durationSteppers: {
            d: 1,
            h: 1,
            i: 1,
            s: 1
        }
    });
    a.extend(a.mobile.datebox.prototype, {
        _dbox_run: function() {
            var d = this,
                b = this.drag,
                c = 150;
            if (b.cnt > 10) {
                c = 100
            }
            if (b.cnt > 30) {
                c = 50
            }
            if (b.cnt > 60) {
                c = 20
            }
            if (b.cnt > 120) {
                c = 10
            }
            if (b.cnt > 240) {
                c = 3
            }
            b.didRun = true;
            b.cnt++;
            d._offset(b.target[0], b.target[1], false);
            d._dbox_run_update();
            d.runButton = setTimeout(function() {
                d._dbox_run()
            }, c)
        },
        _dbox_fixstep: function(c) {
            var d = this.options.durationSteppers,
                b = this.options.durationStep;
            if (a.inArray("s", c) > -1) {
                d.i = 1;
                d.s = b
            }
            if (a.inArray("i", c) > -1) {
                d.h = 1;
                d.s = b
            }
            if (a.inArray("h", c) > -1) {
                d.d = 1;
                d.s = b
            }
        },
        _dbox_run_update: function(f) {
            var g = this,
                e = this.options,
                d = g.theDate.getTime() - g.initDate.getTime(),
                c = (e.mode === "durationbox" ? true : false),
                b = g._dur(d < 0 ? 0 : d);
            if (d < 0) {
                g.lastDuration = 0;
                if (c) {
                    g.theDate.setTime(g.initDate.getTime())
                }
            }
            if (c) {
                if (e.minDur !== false && (g.theDate.getEpoch() - g.initDate.getEpoch()) < e.minDur) {
                    g.theDate = new Date(g.initDate.getTime() + (e.minDur * 1000));
                    g.lastDuration = e.minDur;
                    b = g._dur(e.minDur * 1000)
                }
                if (e.maxDur !== false && (g.theDate.getEpoch() - g.initDate.getEpoch()) > e.maxDur) {
                    g.theDate = new Date(g.initDate.getTime() + (e.maxDur * 1000));
                    g.lastDuration = e.maxDur;
                    b = g._dur(e.maxDur * 1000)
                }
            }
            if (f !== true && c !== true) {
                g._check();
                if (e.mode === "datebox") {
                    g.d.intHTML.find(".ui-datebox-header").find("h4").text(g._formatter(g.__("headerFormat"), g.theDate))
                }
                if (e.useSetButton) {
                    if (g.dateOK === false) {
                        g.setBut.addClass("ui-state-disabled")
                    } else {
                        g.setBut.removeClass("ui-state-disabled")
                    }
                }
            }
            g.d.divIn.find("input").each(function() {
                switch (a(this).data("field")) {
                    case "y":
                        a(this).val(g.theDate.get(0));
                        break;
                    case "m":
                        a(this).val(g.theDate.get(1) + 1);
                        break;
                    case "d":
                        a(this).val((c ? b[0] : g.theDate.get(2)));
                        break;
                    case "h":
                        if (c) {
                            a(this).val(b[1])
                        } else {
                            if (g.__("timeFormat") === 12) {
                                a(this).val(g.theDate.get12hr())
                            } else {
                                a(this).val(g.theDate.get(3))
                            }
                        }
                        break;
                    case "i":
                        if (c) {
                            a(this).val(b[2])
                        } else {
                            a(this).val(g._zPad(g.theDate.get(4)))
                        }
                        break;
                    case "M":
                        a(this).val(g.__("monthsOfYearShort")[g.theDate.get(1)]);
                        break;
                    case "a":
                        a(this).val(g.__("meridiem")[(g.theDate.get(3) > 11) ? 1 : 0]);
                        break;
                    case "s":
                        a(this).val(b[3]);
                        break
                }
            });
            if (g.__("useArabicIndic") === true) {
                g._doIndic()
            }
        },
        _dbox_vhour: function(d) {
            var g = this,
                e = this.options,
                f, c = [25, 0],
                b = [25, 0];
            if (e.validHours === false) {
                return true
            }
            if (a.inArray(g.theDate.getHours(), e.validHours) > -1) {
                return true
            }
            f = g.theDate.getHours();
            a.each(e.validHours, function() {
                if (((f < this) ? 1 : -1) === d) {
                    if (c[0] > Math.abs(this - f)) {
                        c = [Math.abs(this - f), parseInt(this, 10)]
                    }
                } else {
                    if (b[0] > Math.abs(this - f)) {
                        b = [Math.abs(this - f), parseInt(this, 10)]
                    }
                }
            });
            if (c[1] !== 0) {
                g.theDate.setHours(c[1])
            } else {
                g.theDate.setHours(b[1])
            }
        },
        _dbox_enter: function(b) {
            var d, e = this,
                c = 0;
            if (b.data("field") === "M") {
                d = a.inArray(b.val(), e.__("monthsOfYearShort"));
                if (d > -1) {
                    e.theDate.setMonth(d)
                }
            }
            if (b.val() !== "" && b.val().toString().search(/^[0-9]+$/) === 0) {
                switch (b.data("field")) {
                    case "y":
                        e.theDate.setD(0, parseInt(b.val(), 10));
                        break;
                    case "m":
                        e.theDate.setD(1, parseInt(b.val(), 10) - 1);
                        break;
                    case "d":
                        e.theDate.setD(2, parseInt(b.val(), 10));
                        c += (60 * 60 * 24) * parseInt(b.val(), 10);
                        break;
                    case "h":
                        e.theDate.setD(3, parseInt(b.val(), 10));
                        c += (60 * 60) * parseInt(b.val(), 10);
                        break;
                    case "i":
                        e.theDate.setD(4, parseInt(b.val(), 10));
                        c += (60) * parseInt(b.val(), 10);
                        break;
                    case "s":
                        c += parseInt(b.val(), 10);
                        break
                }
            }
            if (this.options.mode === "durationbox") {
                e.theDate.setTime(e.initDate.getTime() + (c * 1000))
            }
            e.refresh()
        }
    });
    a.extend(a.mobile.datebox.prototype._build, {
        timebox: function() {
            this._build.datebox.apply(this, [])
        },
        durationbox: function() {
            this._build.datebox.apply(this, [])
        },
        datebox: function() {
            var s, p, x, t, v = this,
                n = this.drag,
                r = this.options,
                m = (r.mode === "durationbox" ? true : false),
                d = -2,
                e = ["d", "h", "i", "s"],
                u = "ui-datebox-",
                f = a("<div>"),
                l = a("<fieldset>"),
                h = f.clone(),
                k = l.clone(),
                j = f.clone(),
                q = a("<div><input type='text'></div>").addClass("ui-input-text ui-body-" + r.themeInput + " ui-corner-all ui-mini ui-shadow-inset"),
                b = a("<div></div>"),
                c = "ui-btn-inline ui-link ui-btn ui-btn-" + r.themeButton + " ui-btn-icon-notext ui-shadow ui-corner-all";
            if (typeof v.d.intHTML !== "boolean") {
                v.d.intHTML.empty().remove()
            }
            v.d.headerText = ((v._grabLabel() !== false) ? v._grabLabel() : ((r.mode === "datebox") ? v.__("titleDateDialogLabel") : v.__("titleTimeDialogLabel")));
            v.d.intHTML = a("<span>");
            v.fldOrder = ((r.mode === "datebox") ? v.__("dateFieldOrder") : ((m) ? v.__("durationOrder") : v.__("timeFieldOrder")));
            if (!m) {
                v._check();
                v._minStepFix();
                v._dbox_vhour(typeof v._dbox_delta !== "undefined" ? v._dbox_delta : 1)
            } else {
                v.dateOK = true;
                v._dbox_fixstep(v.fldOrder)
            }
            if (r.mode === "datebox") {
                a("<div class='" + u + "header'><h4>" + v._formatter(v.__("headerFormat"), v.theDate) + "</h4></div>").appendTo(v.d.intHTML)
            }
            for (p = 0; p < v.fldOrder.length; p++) {
                t = v._gridblk.b[p];
                if (m) {
                    s = r.durationSteppers[v.fldOrder[p]]
                } else {
                    if (v.fldOrder[p] === "i") {
                        s = r.minuteStep
                    } else {
                        s = 1
                    }
                }
                if (v.fldOrder[p] !== "a" || v.__("timeFormat") === 12) {
                    a("<div>").append((m) ? "<label>" + v.__("durationLabel")[a.inArray(v.fldOrder[p], e)] + "</label>" : "").addClass("ui-block-" + t).appendTo(j);
                    a("<div>").append(v._makeEl(q, {
                        attr: {
                            field: v.fldOrder[p],
                            amount: s
                        }
                    })).addClass("ui-block-" + t).appendTo(h).find("input").data({
                        field: v.fldOrder[p],
                        amount: s
                    });
                    v._makeEl(b, {
                        attr: {
                            field: v.fldOrder[p],
                            amount: s
                        }
                    }).addClass(u + "cbut ui-block-" + t + " ui-icon-plus " + c).appendTo(l).prepend((m) ? "<label>" + v.__("durationLabel")[p] + "</label>" : "");
                    v._makeEl(b, {
                        attr: {
                            field: v.fldOrder[p],
                            amount: s * -1
                        }
                    }).addClass(u + "cbut ui-block-" + t + " ui-icon-minus " + c).appendTo(k);
                    d++
                }
            }
            if (m) {
                j.addClass("ui-datebox-dboxlab ui-grid-" + v._gridblk.b[d]).appendTo(v.d.intHTML)
            }
            l.addClass("ui-grid-" + v._gridblk.b[d]).appendTo(v.d.intHTML);
            h.addClass("ui-datebox-dboxin ui-grid-" + v._gridblk.b[d]).appendTo(v.d.intHTML);
            k.addClass("ui-grid-" + v._gridblk.b[d]).appendTo(v.d.intHTML);
            v.d.divIn = h;
            v._dbox_run_update(true);
            if (v.dateOK !== true) {
                h.find("input").addClass("ui-state-disable")
            } else {
                h.find(".ui-state-disable").removeClass("ui-state-disable")
            }
            if (r.useSetButton || r.useClearButton) {
                x = a("<div>", {
                    "class": u + "controls"
                });
                if (r.useSetButton) {
                    v.setBut = v._stdBtn.close.apply(v, [(r.mode === "datebox") ? v.__("setDateButtonLabel") : (m) ? v.__("setDurationButtonLabel") : v.__("setTimeButtonLabel")]);
                    v.setBut.appendTo(x)
                }
                if (r.useClearButton) {
                    x.append(v._stdBtn.clear.apply(v))
                }
                if (r.useCollapsedBut) {
                    x.controlgroup({
                        type: "horizontal"
                    });
                    x.addClass("ui-datebox-collapse")
                } else {
                    x.controlgroup()
                }
                x.appendTo(v.d.intHTML)
            }
            if (!r.repButton) {
                v.d.intHTML.on(r.clickEvent, "." + u + "cbut", function(g) {
                    h.find(":focus").blur();
                    g.preventDefault();
                    v._dbox_delta = (a(this).data("amount") > 1) ? 1 : -1;
                    v._offset(a(this).data("field"), a(this).data("amount"))
                })
            }
            h.on("change", "input", function() {
                v._dbox_enter(a(this))
            });
            if (v.wheelExists) {
                h.on("mousewheel", "input", function(i, g) {
                    i.preventDefault();
                    v._dbox_delta = g < 0 ? -1 : 1;
                    v._offset(a(this).data("field"), ((g < 0) ? -1 : 1) * a(this).data("amount"))
                })
            }
            if (r.repButton) {
                v.d.intHTML.on(n.eStart, "." + u + "cbut", function() {
                    h.find(":focus").blur();
                    t = [a(this).data("field"), a(this).data("amount")];
                    n.move = true;
                    n.cnt = 0;
                    v._dbox_delta = (a(this).data("amount") > 1) ? 1 : -1;
                    v._offset(t[0], t[1], false);
                    v._dbox_run_update();
                    if (!v.runButton) {
                        n.target = t;
                        v.runButton = setTimeout(function() {
                            v._dbox_run()
                        }, 500)
                    }
                });
                v.d.intHTML.on(n.eEndA, "." + u + "cbut", function(g) {
                    if (n.move) {
                        g.preventDefault();
                        clearTimeout(v.runButton);
                        v.runButton = false;
                        n.move = false
                    }
                })
            }
        }
    })
})(jQuery);
jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
    en: {
        setDateButtonLabel: "Set Date",
        setTimeButtonLabel: "Set Time",
        setDurationButtonLabel: "Set Duration",
        calTodayButtonLabel: "Jump to Today",
        titleDateDialogLabel: "Choose Date",
        titleTimeDialogLabel: "Choose Time",
        daysOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        daysOfWeekShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        monthsOfYear: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthsOfYearShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        durationLabel: ["Days", "Hours", "Minutes", "Seconds"],
        durationDays: ["Day", "Days"],
        tooltip: "Open Date Picker",
        nextMonth: "Next Month",
        prevMonth: "Previous Month",
        timeFormat: 12,
        headerFormat: "%A, %B %-d, %Y",
        dateFieldOrder: ["m", "d", "y"],
        timeFieldOrder: ["h", "i", "a"],
        slideFieldOrder: ["y", "m", "d"],
        dateFormat: "%-m/%-d/%Y",
        useArabicIndic: false,
        isRTL: false,
        calStartDay: 0,
        clearButton: "Clear",
        durationOrder: ["d", "h", "i", "s"],
        meridiem: ["AM", "PM"],
        timeOutput: "%l:%M %p",
        durationFormat: "%Dd %DA, %Dl:%DM:%DS",
        calDateListLabel: "Other Dates",
        calHeaderFormat: "%B %Y",
        calTomorrowButtonLabel: "Jump to Tomorrow"
    }
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
    useLang: "en"
});
jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
    de: {
        setDateButtonLabel: "Datum einstellen",
        setTimeButtonLabel: "Zeit einstellen",
        setDurationButtonLabel: "Dauer einstellen",
        calTodayButtonLabel: "heute",
        titleDateDialogLabel: "Datum wählen",
        titleTimeDialogLabel: "Zeit wählen",
        daysOfWeek: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
        daysOfWeekShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        monthsOfYear: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
        monthsOfYearShort: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dez"],
        durationLabel: ["Tage", "Stunden", "Minuten", "Sekunden"],
        durationDays: ["Tag", "Tage"],
        tooltip: "Öffne Datumsauswahl",
        nextMonth: "Nächster Monat",
        prevMonth: "Vorheriger Monat",
        timeFormat: 24,
        headerFormat: "%A, %B %-d, %Y",
        dateFieldOrder: ["d", "m", "y"],
        timeFieldOrder: ["h", "i", "a"],
        slideFieldOrder: ["y", "m", "d"],
        dateFormat: "%d.%m.%Y",
        useArabicIndic: false,
        isRTL: false,
        calStartDay: 1,
        clearButton: "löschen",
        durationOrder: ["d", "h", "i", "s"],
        meridiem: ["AM", "PM"],
        timeOutput: "%l:%M %p",
        durationFormat: "%Dd %DA, %Dl:%DM:%DS",
        calDateListLabel: "Weitere Termine",
        calHeaderFormat: "%B %Y",
        calTomorrowButtonLabel: "Springen bis morgen"
    }
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
    useLang: "de"
});
jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
    fr: {
        setDateButtonLabel: "Date Fixée",
        setTimeButtonLabel: "Régler l'heure",
        setDurationButtonLabel: "Régler la durée",
        calTodayButtonLabel: "Aller à aujourd'hui",
        titleDateDialogLabel: "Choisir la Date",
        titleTimeDialogLabel: "Choisir le temps",
        daysOfWeek: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
        daysOfWeekShort: ["D", "L", "M", "M", "J", "V", "S"],
        monthsOfYear: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
        monthsOfYearShort: ["Janv", "Févr", "Mars", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"],
        durationLabel: ["Jours", "Heures", "Minutes", "Secondes"],
        durationDays: ["Jour", "Jours"],
        tooltip: "Ouvrir le sélecteur de date",
        nextMonth: "Mois Suiv.",
        prevMonth: "Mois Prec.",
        timeFormat: 24,
        headerFormat: "%A, %-d %B, %Y",
        dateFieldOrder: ["d", "m", "y"],
        timeFieldOrder: ["h", "i", "a"],
        slideFieldOrder: ["y", "m", "d"],
        dateFormat: "%d/%m/%Y",
        useArabicIndic: false,
        isRTL: false,
        calStartDay: 1,
        clearButton: "Effacer",
        durationOrder: ["d", "h", "i", "s"],
        meridiem: ["AM", "PM"],
        timeOutput: "%l:%M %p",
        durationFormat: "%Dd %DA, %Dl:%DM:%DS",
        calDateListLabel: "Autres Dates",
        calHeaderFormat: "%B %Y",
        calTomorrowButtonLabel: "Aller à demain"
    }
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
    useLang: "fr"
});
jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
    hr: {
        setDateButtonLabel: "Postavi Datum",
        setTimeButtonLabel: "Postavi Vrijeme",
        setDurationButtonLabel: "Postavi Trajanje",
        calTodayButtonLabel: "Današnji Datum",
        titleDateDialogLabel: "Odaberite datum",
        titleTimeDialogLabel: "Odaberite vrijeme",
        daysOfWeek: ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"],
        daysOfWeekShort: ["Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su"],
        monthsOfYear: ["Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"],
        monthsOfYearShort: ["Sij", "Vel", "Ožu", "Tra", "Svi", "Lip", "Srp", "Kol", "Ruj", "Lis", "Stu", "Pro"],
        durationLabel: ["Dani", "Sati", "Minute", "Sekunde"],
        durationDays: ["Dan", "Dani"],
        tooltip: "Otvorite kontrolu",
        nextMonth: "Sljedeći",
        prevMonth: "Prethodna",
        timeFormat: 12,
        headerFormat: "%A, %B %-d, %Y",
        dateFieldOrder: ["d", "m", "y"],
        timeFieldOrder: ["h", "i", "a"],
        slideFieldOrder: ["y", "m", "d"],
        dateFormat: "%d.%m.%Y",
        useArabicIndic: false,
        isRTL: false,
        calStartDay: 0,
        clearButton: "Izbriši",
        durationOrder: ["d", "h", "i", "s"],
        meridiem: ["AM", "PM"],
        timeOutput: "%l:%M %p",
        durationFormat: "%Dd %DA, %Dl:%DM:%DS",
        calDateListLabel: "Ostali datumi",
        calHeaderFormat: "%B %Y",
        calTomorrowButtonLabel: "Skoči sutra"
    }
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
    useLang: "hr"
});
jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
    it: {
        setDateButtonLabel: "Imposta data",
        setTimeButtonLabel: "Imposta ora",
        setDurationButtonLabel: "Setta Durata",
        calTodayButtonLabel: "Vai ad oggi",
        titleDateDialogLabel: "Scegli data",
        titleTimeDialogLabel: "Scegli ora",
        daysOfWeek: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
        daysOfWeekShort: ["Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa"],
        monthsOfYear: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
        monthsOfYearShort: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
        durationLabel: ["Giorni", "Ore", "Minuti", "Secondi"],
        durationDays: ["Giorno", "Giorni"],
        tooltip: "Apri Selettore Data",
        nextMonth: "Mese successivo",
        prevMonth: "Mese precedente",
        timeFormat: 12,
        headerFormat: "%A %-d %B %Y",
        dateFieldOrder: ["d", "m", "y"],
        timeFieldOrder: ["h", "i", "a"],
        slideFieldOrder: ["y", "m", "d"],
        dateFormat: "%d-%m-%Y",
        useArabicIndic: false,
        isRTL: false,
        calStartDay: 0,
        clearButton: "Pulisci",
        durationOrder: ["d", "h", "i", "s"],
        meridiem: ["AM", "PM"],
        timeOutput: "%l:%M %p",
        durationFormat: "%Dd %DA, %Dl:%DM:%DS",
        calDateListLabel: "Altre date",
        calHeaderFormat: "%B %Y",
        calTomorrowButtonLabel: "Vai a domani"
    }
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
    useLang: "it"
});
jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
    tr: {
        setDateButtonLabel: "Kapat",
        setTimeButtonLabel: "Saat ayarlama",
        setDurationButtonLabel: "Kapat",
        calTodayButtonLabel: "Bugün",
        titleDateDialogLabel: "Tarih seçin",
        titleTimeDialogLabel: "Süreyi belirleyin",
        daysOfWeek: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
        daysOfWeekShort: ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"],
        monthsOfYear: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
        monthsOfYearShort: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
        durationLabel: ["Gün", "Saat", "Dakika", "Saniye"],
        durationDays: ["Gün", "Gün"],
        tooltip: "Açık tarih seçici",
        nextMonth: "Ileri",
        prevMonth: "Geri",
        timeFormat: 24,
        headerFormat: "%A, %B %-d, %Y",
        dateFieldOrder: ["d", "m", "y"],
        timeFieldOrder: ["h", "i", "a"],
        slideFieldOrder: ["y", "m", "d"],
        dateFormat: "%d.%m.%Y",
        useArabicIndic: false,
        isRTL: false,
        calStartDay: 0,
        clearButton: "Açık",
        durationOrder: ["d", "h", "i", "s"],
        meridiem: ["AM", "PM"],
        timeOutput: "%l:%M %p",
        durationFormat: "%Dd %DA, %Dl:%DM:%DS",
        calDateListLabel: "Diğer tarihler",
        calHeaderFormat: "%B %Y",
        calTomorrowButtonLabel: "Yarın için atlama"
    }
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
    useLang: "tr"
});
(function(a, b) {
    a.widget("mobile.mdialog", a.mobile.widget, {
        options: {
            version: "1.4.3-201408010",
            useMenuMode: false,
            containerTheme: false,
            popOverlay: "b",
            popDismissable: true,
            popPosition: "window",
            popPosX: false,
            popPosY: false,
            popAutoPad: true,
            transition: "none",
            clickEvent: "click",
            content: false,
            closeButton: false,
            closeButtonTheme: "a",
            menuHeaderText: false,
            menuHeaderTheme: "a",
            menuMinWidth: false,
            menuSubtitle: false,
            menuButtonType: "list",
            menuButtonTheme: "a",
            menuInputList: false,
            callbackOpen: false,
            callbackOpenArgs: [],
            callbackClose: false,
            callbackCloseArgs: [],
            useCustomClose: false,
            customCloseClass: "",
            isSimpleBox: false,
            isMiniBox: false,
            maxWidth: 300
        },
        _create: function() {
            if (a("div.ui-popup-active").length > 0) {
                a("div.ui-popup-active").empty().remove()
            }
            var h = this,
                g = this.options,
                c = a('<div data-role="popup" style="max-width:' + g.maxWidth + 'px;" data-theme="a"></div>'),
                f, d = {},
                e = a('<div data-role="page"></div>');
            h.internalID = new Date().getTime();
            if (g.containerTheme !== false) {
                c.attr("data-theme", g.containerTheme)
            }
            if (g.popOverlay !== false) {
                c.attr("data-overlay-theme", g.popOverlay)
            }
            if (g.popAutoPad === true && g.content !== false) {
                if ((g.isSimpleBox === true) || (g.content.search("<") === -1)) {
                    c.attr("class", "ui-content");
                    if (g.isMiniBox === true) {
                        g.content = "<p style='font-size:0.9em;'>" + g.content + "</p>"
                    } else {
                        g.content = "<p>" + g.content + "</p>"
                    }
                }
            }
            if (g.popDismissable === false && g.closeButton === false && g.useCustomClose === false) {
                g.popDismissable = true
            }
            if (g.useMenuMode === false) {
                if (g.closeButton === "left") {
                    g.content = '<a href="#" data-rel="back" data-role="button" data-theme="' + g.closeButtonTheme + '" data-icon="delete" data-iconpos="notext" class="ui-btn-left">Close</a>' + g.content
                }
                if (g.closeButton === "right") {
                    g.content = '<a href="#" data-rel="back" data-role="button" data-theme="' + g.closeButtonTheme + '" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>' + g.content
                }
            } else {
                g.content = "";
                if (g.closeButton === "left") {
                    g.content = '<a href="#" data-rel="back" data-role="button" data-theme="' + g.closeButtonTheme + '" data-icon="delete" data-iconpos="notext" class="ui-btn-left">Close</a>'
                }
                if (g.closeButton === "right") {
                    g.content = '<a href="#" data-rel="back" data-role="button" data-theme="' + g.closeButtonTheme + '" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>'
                }
                if (g.menuHeaderText !== false) {
                    g.content = g.content + '<div data-role="header" data-theme="' + g.menuHeaderTheme + '"' + ((g.menuMinWidth !== false) ? ' style="min-width: ' + g.menuMinWidth + '"' : "") + "><h1>" + g.menuHeaderText + "</h1></div>"
                }
                g.content = g.content + '<div data-role="content">';
                if (g.menuSubtitle !== false && g.menuButtonType === "button") {
                    g.content = g.content + "<p>" + g.menuSubtitle + "</p>"
                }
                if (g.menuInputList !== false) {
                    g.content = g.content + '<div style="padding-bottom:1em;">';
                    d.inputs = [];
                    a.each(g.menuInputList, function(i, j) {
                        g.content = g.content + "<input " + (("value" in j) ? "value='" + j.value + "'" : "") + " type='" + (("type" in j) ? j.type : "text") + "' id='" + j.id + "' placeholder='" + j.title + "' />"
                    });
                    g.content = g.content + "</div>"
                }
                g.content = g.content + '<div class="popupbuttonshere"></div></div>'
            }
            a(g.content).appendTo(e);
            e.appendTo("body").page().trigger("create");
            c.append(e.children());
            e.remove();
            c.appendTo(a(".ui-page-active"));
            a.extend(h, {
                basePop: c
            });
            if (g.useMenuMode === true) {
                if (g.menuButtonType === "list") {
                    h._makeListButtons(c)
                } else {
                    h._makeButtonButtons(c)
                }
            }
            d.clean = function() {
                c.remove();
                h.destroy()
            };
            d.getinput = function() {
                if (g.menuInputList !== false && g.useMenuMode === true) {
                    a.each(g.menuInputList, function(i, j) {
                        g.callbackCloseArgs.push([j.id, a("#" + j.id).val()])
                    })
                }
            };
            if (a.isFunction(g.callbackOpen)) {
                d.open = function() {
                    g.callbackOpen.apply(h, g.callbackOpenArgs)
                }
            } else {
                d.open = false
            }
            if (a.isFunction(g.callbackClose)) {
                if (g.menuInputList !== false && g.useMenuMode === true) {
                    d.close = function() {
                        d.getinput.apply(h);
                        g.callbackClose.apply(h, g.callbackCloseArgs);
                        d.clean.apply(h)
                    }
                } else {
                    d.close = function() {
                        g.callbackClose.apply(h, g.callbackCloseArgs);
                        d.clean.apply(h)
                    }
                }
            } else {
                d.close = function() {
                    d.clean.apply(h)
                }
            }
            d.openext = {};
            if (g.popPosX !== false && g.popPosY !== false) {
                g.positionTo = "origin";
                d.openext.x = g.popPosX;
                d.openext.y = g.popPosY
            }
            c.popup({
                transition: g.transition,
                dismissible: g.popDismissable,
                positionTo: g.positionTo,
                afteropen: d.open,
                afterclose: d.close
            });
            if (g.useCustomClose === true && g.customCloseClass !== "") {
                g.customCloseClass = "." + g.customCloseClass;
                a(g.customCloseClass).unbind("vclick click").bind(g.clickEvent, function() {
                    c.popup("close")
                })
            }
            c.popup("open", d.openext)
        },
        _appendInput: function(e) {
            var d = this,
                c = this.options;
            if (c.menuInputList !== false && c.useMenuMode === true) {
                a.each(c.menuInputList, function(f, g) {
                    e.push([g.id, a("#" + g.id).val()])
                })
            }
            return e
        },
        _makeButtonButtons: function(c) {
            var e = this,
                d = e.options,
                f = c.find(".popupbuttonshere");
            e.butObj = [];
            a.each(d.buttons, function(g, h) {
                h = a.isFunction(h) ? {
                    click: h
                } : h;
                h = a.extend({
                    text: g,
                    id: g + e.internalID,
                    theme: d.menuButtonTheme,
                    icon: "check",
                    iconpos: "left",
                    corners: "true",
                    shadow: "true",
                    args: [],
                    close: true
                }, h);
                e.butObj.push(a("<a href='#'>" + h.text + "</a>").appendTo(f).attr("id", h.id).buttonMarkup({
                    theme: h.theme,
                    icon: h.icon,
                    iconpos: h.iconpos,
                    corners: h.corners,
                    shadow: h.shadow
                }).unbind("vclick click").bind(d.clickEvent, function() {
                    h.args = e._appendInput(h.args);
                    var i = h.click.apply(e, a.merge(arguments, h.args));
                    if (i !== false && h.close === true) {
                        c.popup("close")
                    }
                }))
            })
        },
        _makeListButtons: function(c) {
            var f = this,
                e = f.options,
                h = c.find(".popupbuttonshere"),
                g = a('<ul data-role="listview"></ul>'),
                d = a('<div data-role="page"><div id="tempcontent" data-role="content"></div></div>');
            f.butObj = [];
            if (e.subTitle !== false) {
                a("<li data-role='list-divider'>" + e.menuSubtitle + "</li>").appendTo(g)
            }
            a.each(e.buttons, function(i, j) {
                j = a.isFunction(j) ? {
                    click: j
                } : j;
                j = a.extend({
                    text: i,
                    id: i + f.internalID,
                    icon: "check",
                    args: [],
                    close: true
                }, j);
                f.butObj.push(a("<li id='" + j.id + "' data-icon='" + j.icon + "'><a href='#'>" + j.text + "</a></li>").appendTo(g).bind(e.clickEvent, function() {
                    j.args = f._appendInput(j.args);
                    var k = j.click.apply(f, a.merge(arguments, j.args));
                    if (k !== false && j.close === true) {
                        c.popup("close")
                    }
                }))
            });
            g.appendTo(d.find("#tempcontent"));
            d.appendTo("body").page().trigger("create");
            h.append(d.find("#tempcontent").children());
            d.remove()
        }
    })
})(jQuery);