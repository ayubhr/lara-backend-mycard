! function(c, d) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = c.document ? d(c, !0) : function(b) {
        if (!b.document) {
            throw new Error("jQuery requires a window with a document")
        }
        return d(b)
    } : d(c)
}("undefined" != typeof window ? window : this, function(ag, am) {
    var at = [],
        az = ag.document,
        aF = at.slice,
        aL = at.concat,
        aR = at.push,
        aX = at.indexOf,
        a3 = {},
        a9 = a3.toString,
        bh = a3.hasOwnProperty,
        bn = {},
        bt = "2.2.3",
        bz = function(c, d) {
            return new bz.fn.init(c, d)
        },
        bF = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        bL = /^-ms-/,
        bQ = /-([\da-z])/gi,
        bV = function(c, d) {
            return d.toUpperCase()
        };
    bz.fn = bz.prototype = {
        jquery: bt,
        constructor: bz,
        selector: "",
        length: 0,
        toArray: function() {
            return aF.call(this)
        },
        get: function(b) {
            return null != b ? 0 > b ? this[b + this.length] : this[b] : aF.call(this)
        },
        pushStack: function(c) {
            var d = bz.merge(this.constructor(), c);
            return d.prevObject = this, d.context = this.context, d
        },
        each: function(b) {
            return bz.each(this, b)
        },
        map: function(b) {
            return this.pushStack(bz.map(this, function(a, d) {
                return b.call(a, d, a)
            }))
        },
        slice: function() {
            return this.pushStack(aF.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(d) {
            var e = this.length,
                f = +d + (0 > d ? e : 0);
            return this.pushStack(f >= 0 && e > f ? [this[f]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: aR,
        sort: at.sort,
        splice: at.splice
    }, bz.extend = bz.fn.extend = function() {
        var k, l, m, n, o, p, q = arguments[0] || {},
            r = 1,
            s = arguments.length,
            t = !1;
        for ("boolean" == typeof q && (t = q, q = arguments[r] || {}, r++), "object" == typeof q || bz.isFunction(q) || (q = {}), r === s && (q = this, r--); s > r; r++) {
            if (null != (k = arguments[r])) {
                for (l in k) {
                    m = q[l], n = k[l], q !== n && (t && n && (bz.isPlainObject(n) || (o = bz.isArray(n))) ? (o ? (o = !1, p = m && bz.isArray(m) ? m : []) : p = m && bz.isPlainObject(m) ? m : {}, q[l] = bz.extend(t, p, n)) : void 0 !== n && (q[l] = n))
                }
            }
        }
        return q
    }, bz.extend({
        expando: "jQuery" + (bt + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(b) {
            throw new Error(b)
        },
        noop: function() {},
        isFunction: function(b) {
            return "function" === bz.type(b)
        },
        isArray: Array.isArray,
        isWindow: function(b) {
            return null != b && b === b.window
        },
        isNumeric: function(c) {
            var d = c && c.toString();
            return !bz.isArray(c) && d - parseFloat(d) + 1 >= 0
        },
        isPlainObject: function(c) {
            var d;
            if ("object" !== bz.type(c) || c.nodeType || bz.isWindow(c)) {
                return !1
            }
            if (c.constructor && !bh.call(c, "constructor") && !bh.call(c.constructor.prototype || {}, "isPrototypeOf")) {
                return !1
            }
            for (d in c) {}
            return void 0 === d || bh.call(c, d)
        },
        isEmptyObject: function(c) {
            var d;
            for (d in c) {
                return !1
            }
            return !0
        },
        type: function(b) {
            return null == b ? b + "" : "object" == typeof b || "function" == typeof b ? a3[a9.call(b)] || "object" : typeof b
        },
        globalEval: function(d) {
            var e, f = eval;
            d = bz.trim(d), d && (1 === d.indexOf("use strict") ? (e = az.createElement("script"), e.text = d, az.head.appendChild(e).parentNode.removeChild(e)) : f(d))
        },
        camelCase: function(b) {
            return b.replace(bL, "ms-").replace(bQ, bV)
        },
        nodeName: function(c, d) {
            return c.nodeName && c.nodeName.toLowerCase() === d.toLowerCase()
        },
        each: function(e, f) {
            var g, h = 0;
            if (b0(e)) {
                for (g = e.length; g > h; h++) {
                    if (f.call(e[h], h, e[h]) === !1) {
                        break
                    }
                }
            } else {
                for (h in e) {
                    if (f.call(e[h], h, e[h]) === !1) {
                        break
                    }
                }
            }
            return e
        },
        trim: function(b) {
            return null == b ? "" : (b + "").replace(bF, "")
        },
        makeArray: function(d, e) {
            var f = e || [];
            return null != d && (b0(Object(d)) ? bz.merge(f, "string" == typeof d ? [d] : d) : aR.call(f, d)), f
        },
        inArray: function(d, e, f) {
            return null == e ? -1 : aX.call(e, d, f)
        },
        merge: function(f, g) {
            for (var h = +g.length, i = 0, j = f.length; h > i; i++) {
                f[j++] = g[i]
            }
            return f.length = j, f
        },
        grep: function(i, j, k) {
            for (var l, m = [], n = 0, o = i.length, p = !k; o > n; n++) {
                l = !j(i[n], n), l !== p && m.push(i[n])
            }
            return m
        },
        map: function(f, i, j) {
            var k, l, m = 0,
                n = [];
            if (b0(f)) {
                for (k = f.length; k > m; m++) {
                    l = i(f[m], m, j), null != l && n.push(l)
                }
            } else {
                for (m in f) {
                    l = i(f[m], m, j), null != l && n.push(l)
                }
            }
            return aL.apply([], n)
        },
        guid: 1,
        proxy: function(e, g) {
            var h, i, j;
            return "string" == typeof g && (h = e[g], g = e, e = h), bz.isFunction(e) ? (i = aF.call(arguments, 2), j = function() {
                return e.apply(g || this, i.concat(aF.call(arguments)))
            }, j.guid = e.guid = e.guid || bz.guid++, j) : void 0
        },
        now: Date.now,
        support: bn
    }), "function" == typeof Symbol && (bz.fn[Symbol.iterator] = at[Symbol.iterator]), bz.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(c, d) {
        a3["[object " + d + "]"] = d.toLowerCase()
    });

    function b0(d) {
        var e = !!d && "length" in d && d.length,
            f = bz.type(d);
        return "function" === f || bz.isWindow(d) ? !1 : "array" === f || 0 === e || "number" == typeof e && e > 0 && e - 1 in d
    }
    var b5 = function(cb) {
        var cI, cL, cO, cR, cU, cX, c0, c3, c6, c9, dd, dg, dj, dm, dq, dt, dw, dz, dC, dF = "sizzle" + 1 * new Date,
            dI = cb.document,
            dL = 0,
            dO = 0,
            dR = cZ(),
            dT = cZ(),
            cG = cZ(),
            cJ = function(c, d) {
                return c === d && (dd = !0), 0
            },
            cM = 1 << 31,
            cP = {}.hasOwnProperty,
            cS = [],
            cV = cS.pop,
            cY = cS.push,
            c1 = cS.push,
            c4 = cS.slice,
            c7 = function(e, f) {
                for (var g = 0, h = e.length; h > g; g++) {
                    if (e[g] === f) {
                        return g
                    }
                }
                return -1
            },
            db = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            de = "[\\x20\\t\\r\\n\\f]",
            dh = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            dk = "\\[" + de + "*(" + dh + ")(?:" + de + "*([*^$|!~]?=)" + de + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + dh + "))|)" + de + "*\\]",
            dn = ":(" + dh + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + dk + ")*)|.*)\\)|)",
            dr = new RegExp(de + "+", "g"),
            du = new RegExp("^" + de + "+|((?:^|[^\\\\])(?:\\\\.)*)" + de + "+$", "g"),
            dx = new RegExp("^" + de + "*," + de + "*"),
            dA = new RegExp("^" + de + "*([>+~]|" + de + ")" + de + "*"),
            dD = new RegExp("=" + de + "*([^\\]'\"]*?)" + de + "*\\]", "g"),
            dG = new RegExp(dn),
            dJ = new RegExp("^" + dh + "$"),
            dM = {
                ID: new RegExp("^#(" + dh + ")"),
                CLASS: new RegExp("^\\.(" + dh + ")"),
                TAG: new RegExp("^(" + dh + "|[*])"),
                ATTR: new RegExp("^" + dk),
                PSEUDO: new RegExp("^" + dn),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + de + "*(even|odd|(([+-]|)(\\d*)n|)" + de + "*(?:([+-]|)" + de + "*(\\d+)|))" + de + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + db + ")$", "i"),
                needsContext: new RegExp("^" + de + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + de + "*((?:-\\d)?\\d*)" + de + "*\\)|)(?=[^-]|$)", "i")
            },
            dP = /^(?:input|select|textarea|button)$/i,
            dS = /^h\d$/i,
            dU = /^[^{]+\{\s*\[native \w/,
            ab = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            bb = /[+~]/,
            cH = /'|\\/g,
            cK = new RegExp("\\\\([\\da-f]{1,6}" + de + "?|(" + de + ")|.)", "ig"),
            cN = function(e, f, g) {
                var h = "0x" + f - 65536;
                return h !== h || g ? f : 0 > h ? String.fromCharCode(h + 65536) : String.fromCharCode(h >> 10 | 55296, 1023 & h | 56320)
            },
            cQ = function() {
                dg()
            };
        try {
            c1.apply(cS = c4.call(dI.childNodes), dI.childNodes), cS[dI.childNodes.length].nodeType
        } catch (cT) {
            c1 = {
                apply: cS.length ? function(c, d) {
                    cY.apply(c, c4.call(d))
                } : function(e, f) {
                    var g = e.length,
                        h = 0;
                    while (e[g++] = f[h++]) {}
                    e.length = g - 1
                }
            }
        }

        function cW(c, g, i, m) {
            var n, p, q, t, u, v, z, A, B = g && g.ownerDocument,
                C = g ? g.nodeType : 9;
            if (i = i || [], "string" != typeof c || !c || 1 !== C && 9 !== C && 11 !== C) {
                return i
            }
            if (!m && ((g ? g.ownerDocument || g : dI) !== dj && dg(g), g = g || dj, dq)) {
                if (11 !== C && (v = ab.exec(c))) {
                    if (n = v[1]) {
                        if (9 === C) {
                            if (!(q = g.getElementById(n))) {
                                return i
                            }
                            if (q.id === n) {
                                return i.push(q), i
                            }
                        } else {
                            if (B && (q = B.getElementById(n)) && dC(g, q) && q.id === n) {
                                return i.push(q), i
                            }
                        }
                    } else {
                        if (v[2]) {
                            return c1.apply(i, g.getElementsByTagName(c)), i
                        }
                        if ((n = v[3]) && cL.getElementsByClassName && g.getElementsByClassName) {
                            return c1.apply(i, g.getElementsByClassName(n)), i
                        }
                    }
                }
                if (cL.qsa && !cG[c + " "] && (!dt || !dt.test(c))) {
                    if (1 !== C) {
                        B = g, A = c
                    } else {
                        if ("object" !== g.nodeName.toLowerCase()) {
                            (t = g.getAttribute("id")) ? t = t.replace(cH, "\\$&"): g.setAttribute("id", t = dF), z = cX(c), p = z.length, u = dJ.test(t) ? "#" + t : "[id='" + t + "']";
                            while (p--) {
                                z[p] = u + " " + dv(z[p])
                            }
                            A = z.join(","), B = bb.test(c) && dp(g.parentNode) || g
                        }
                    }
                    if (A) {
                        try {
                            return c1.apply(i, B.querySelectorAll(A)), i
                        } catch (D) {} finally {
                            t === dF && g.removeAttribute("id")
                        }
                    }
                }
            }
            return c3(c.replace(du, "$1"), g, i, m)
        }

        function cZ() {
            var c = [];

            function d(a, b) {
                return c.push(a + " ") > cO.cacheLength && delete d[c.shift()], d[a + " "] = b
            }
            return d
        }

        function c2(b) {
            return b[dF] = !0, b
        }

        function c5(d) {
            var e = dj.createElement("div");
            try {
                return !!d(e)
            } catch (f) {
                return !1
            } finally {
                e.parentNode && e.parentNode.removeChild(e), e = null
            }
        }

        function c8(d, f) {
            var g = d.split("|"),
                h = g.length;
            while (h--) {
                cO.attrHandle[g[h]] = f
            }
        }

        function dc(e, f) {
            var g = f && e,
                h = g && 1 === e.nodeType && 1 === f.nodeType && (~f.sourceIndex || cM) - (~e.sourceIndex || cM);
            if (h) {
                return h
            }
            if (g) {
                while (g = g.nextSibling) {
                    if (g === f) {
                        return -1
                    }
                }
            }
            return e ? 1 : -1
        }

        function df(b) {
            return function(a) {
                var d = a.nodeName.toLowerCase();
                return "input" === d && a.type === b
            }
        }

        function di(b) {
            return function(a) {
                var d = a.nodeName.toLowerCase();
                return ("input" === d || "button" === d) && a.type === b
            }
        }

        function dl(b) {
            return c2(function(a) {
                return a = +a, c2(function(h, i) {
                    var j, k = b([], h.length, a),
                        l = k.length;
                    while (l--) {
                        h[j = k[l]] && (h[j] = !(i[j] = h[j]))
                    }
                })
            })
        }

        function dp(b) {
            return b && "undefined" != typeof b.getElementsByTagName && b
        }
        cL = cW.support = {}, cU = cW.isXML = function(c) {
            var d = c && (c.ownerDocument || c).documentElement;
            return d ? "HTML" !== d.nodeName : !1
        }, dg = cW.setDocument = function(c) {
            var d, f, h = c ? c.ownerDocument || c : dI;
            return h !== dj && 9 === h.nodeType && h.documentElement ? (dj = h, dm = dj.documentElement, dq = !cU(dj), (f = dj.defaultView) && f.top !== f && (f.addEventListener ? f.addEventListener("unload", cQ, !1) : f.attachEvent && f.attachEvent("onunload", cQ)), cL.attributes = c5(function(b) {
                return b.className = "i", !b.getAttribute("className")
            }), cL.getElementsByTagName = c5(function(b) {
                return b.appendChild(dj.createComment("")), !b.getElementsByTagName("*").length
            }), cL.getElementsByClassName = dU.test(dj.getElementsByClassName), cL.getById = c5(function(b) {
                return dm.appendChild(b).id = dF, !dj.getElementsByName || !dj.getElementsByName(dF).length
            }), cL.getById ? (cO.find.ID = function(e, g) {
                if ("undefined" != typeof g.getElementById && dq) {
                    var i = g.getElementById(e);
                    return i ? [i] : []
                }
            }, cO.filter.ID = function(e) {
                var g = e.replace(cK, cN);
                return function(b) {
                    return b.getAttribute("id") === g
                }
            }) : (delete cO.find.ID, cO.filter.ID = function(e) {
                var g = e.replace(cK, cN);
                return function(b) {
                    var i = "undefined" != typeof b.getAttributeNode && b.getAttributeNode("id");
                    return i && i.value === g
                }
            }), cO.find.TAG = cL.getElementsByTagName ? function(e, g) {
                return "undefined" != typeof g.getElementsByTagName ? g.getElementsByTagName(e) : cL.qsa ? g.querySelectorAll(e) : void 0
            } : function(g, i) {
                var j, k = [],
                    l = 0,
                    m = i.getElementsByTagName(g);
                if ("*" === g) {
                    while (j = m[l++]) {
                        1 === j.nodeType && k.push(j)
                    }
                    return k
                }
                return m
            }, cO.find.CLASS = cL.getElementsByClassName && function(e, g) {
                return "undefined" != typeof g.getElementsByClassName && dq ? g.getElementsByClassName(e) : void 0
            }, dw = [], dt = [], (cL.qsa = dU.test(dj.querySelectorAll)) && (c5(function(b) {
                dm.appendChild(b).innerHTML = "<a id='" + dF + "'></a><select id='" + dF + "-\r\\' msallowcapture=''><option selected=''></option></select>", b.querySelectorAll("[msallowcapture^='']").length && dt.push("[*^$]=" + de + "*(?:''|\"\")"), b.querySelectorAll("[selected]").length || dt.push("\\[" + de + "*(?:value|" + db + ")"), b.querySelectorAll("[id~=" + dF + "-]").length || dt.push("~="), b.querySelectorAll(":checked").length || dt.push(":checked"), b.querySelectorAll("a#" + dF + "+*").length || dt.push(".#.+[+~]")
            }), c5(function(e) {
                var g = dj.createElement("input");
                g.setAttribute("type", "hidden"), e.appendChild(g).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && dt.push("name" + de + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || dt.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), dt.push(",.*:")
            })), (cL.matchesSelector = dU.test(dz = dm.matches || dm.webkitMatchesSelector || dm.mozMatchesSelector || dm.oMatchesSelector || dm.msMatchesSelector)) && c5(function(b) {
                cL.disconnectedMatch = dz.call(b, "div"), dz.call(b, "[s!='']:x"), dw.push("!=", dn)
            }), dt = dt.length && new RegExp(dt.join("|")), dw = dw.length && new RegExp(dw.join("|")), d = dU.test(dm.compareDocumentPosition), dC = d || dU.test(dm.contains) ? function(e, g) {
                var i = 9 === e.nodeType ? e.documentElement : e,
                    j = g && g.parentNode;
                return e === j || !(!j || 1 !== j.nodeType || !(i.contains ? i.contains(j) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(j)))
            } : function(e, g) {
                if (g) {
                    while (g = g.parentNode) {
                        if (g === e) {
                            return !0
                        }
                    }
                }
                return !1
            }, cJ = d ? function(e, g) {
                if (e === g) {
                    return dd = !0, 0
                }
                var i = !e.compareDocumentPosition - !g.compareDocumentPosition;
                return i ? i : (i = (e.ownerDocument || e) === (g.ownerDocument || g) ? e.compareDocumentPosition(g) : 1, 1 & i || !cL.sortDetached && g.compareDocumentPosition(e) === i ? e === dj || e.ownerDocument === dI && dC(dI, e) ? -1 : g === dj || g.ownerDocument === dI && dC(dI, g) ? 1 : c9 ? c7(c9, e) - c7(c9, g) : 0 : 4 & i ? -1 : 1)
            } : function(i, j) {
                if (i === j) {
                    return dd = !0, 0
                }
                var k, l = 0,
                    m = i.parentNode,
                    n = j.parentNode,
                    o = [i],
                    p = [j];
                if (!m || !n) {
                    return i === dj ? -1 : j === dj ? 1 : m ? -1 : n ? 1 : c9 ? c7(c9, i) - c7(c9, j) : 0
                }
                if (m === n) {
                    return dc(i, j)
                }
                k = i;
                while (k = k.parentNode) {
                    o.unshift(k)
                }
                k = j;
                while (k = k.parentNode) {
                    p.unshift(k)
                }
                while (o[l] === p[l]) {
                    l++
                }
                return l ? dc(o[l], p[l]) : o[l] === dI ? -1 : p[l] === dI ? 1 : 0
            }, dj) : dj
        }, cW.matches = function(c, d) {
            return cW(c, null, null, d)
        }, cW.matchesSelector = function(c, f) {
            if ((c.ownerDocument || c) !== dj && dg(c), f = f.replace(dD, "='$1']"), cL.matchesSelector && dq && !cG[f + " "] && (!dw || !dw.test(f)) && (!dt || !dt.test(f))) {
                try {
                    var g = dz.call(c, f);
                    if (g || cL.disconnectedMatch || c.document && 11 !== c.document.nodeType) {
                        return g
                    }
                } catch (h) {}
            }
            return cW(f, dj, null, [c]).length > 0
        }, cW.contains = function(c, d) {
            return (c.ownerDocument || c) !== dj && dg(c), dC(c, d)
        }, cW.attr = function(c, d) {
            (c.ownerDocument || c) !== dj && dg(c);
            var g = cO.attrHandle[d.toLowerCase()],
                h = g && cP.call(cO.attrHandle, d.toLowerCase()) ? g(c, d, !dq) : void 0;
            return void 0 !== h ? h : cL.attributes || !dq ? c.getAttribute(d) : (h = c.getAttributeNode(d)) && h.specified ? h.value : null
        }, cW.error = function(b) {
            throw new Error("Syntax error, unrecognized expression: " + b)
        }, cW.uniqueSort = function(c) {
            var g, h = [],
                i = 0,
                j = 0;
            if (dd = !cL.detectDuplicates, c9 = !cL.sortStable && c.slice(0), c.sort(cJ), dd) {
                while (g = c[j++]) {
                    g === c[j] && (i = h.push(j))
                }
                while (i--) {
                    c.splice(h[i], 1)
                }
            }
            return c9 = null, c
        }, cR = cW.getText = function(e) {
            var g, h = "",
                i = 0,
                j = e.nodeType;
            if (j) {
                if (1 === j || 9 === j || 11 === j) {
                    if ("string" == typeof e.textContent) {
                        return e.textContent
                    }
                    for (e = e.firstChild; e; e = e.nextSibling) {
                        h += cR(e)
                    }
                } else {
                    if (3 === j || 4 === j) {
                        return e.nodeValue
                    }
                }
            } else {
                while (g = e[i++]) {
                    h += cR(g)
                }
            }
            return h
        }, cO = cW.selectors = {
            cacheLength: 50,
            createPseudo: c2,
            match: dM,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(b) {
                    return b[1] = b[1].replace(cK, cN), b[3] = (b[3] || b[4] || b[5] || "").replace(cK, cN), "~=" === b[2] && (b[3] = " " + b[3] + " "), b.slice(0, 4)
                },
                CHILD: function(b) {
                    return b[1] = b[1].toLowerCase(), "nth" === b[1].slice(0, 3) ? (b[3] || cW.error(b[0]), b[4] = +(b[4] ? b[5] + (b[6] || 1) : 2 * ("even" === b[3] || "odd" === b[3])), b[5] = +(b[7] + b[8] || "odd" === b[3])) : b[3] && cW.error(b[0]), b
                },
                PSEUDO: function(d) {
                    var e, f = !d[6] && d[2];
                    return dM.CHILD.test(d[0]) ? null : (d[3] ? d[2] = d[4] || d[5] || "" : f && dG.test(f) && (e = cX(f, !0)) && (e = f.indexOf(")", f.length - e) - f.length) && (d[0] = d[0].slice(0, e), d[2] = f.slice(0, e)), d.slice(0, 3))
                }
            },
            filter: {
                TAG: function(c) {
                    var d = c.replace(cK, cN).toLowerCase();
                    return "*" === c ? function() {
                        return !0
                    } : function(b) {
                        return b.nodeName && b.nodeName.toLowerCase() === d
                    }
                },
                CLASS: function(c) {
                    var d = dR[c + " "];
                    return d || (d = new RegExp("(^|" + de + ")" + c + "(" + de + "|$)")) && dR(c, function(b) {
                        return d.test("string" == typeof b.className && b.className || "undefined" != typeof b.getAttribute && b.getAttribute("class") || "")
                    })
                },
                ATTR: function(d, e, f) {
                    return function(a) {
                        var b = cW.attr(a, d);
                        return null == b ? "!=" === e : e ? (b += "", "=" === e ? b === f : "!=" === e ? b !== f : "^=" === e ? f && 0 === b.indexOf(f) : "*=" === e ? f && b.indexOf(f) > -1 : "$=" === e ? f && b.slice(-f.length) === f : "~=" === e ? (" " + b.replace(dr, " ") + " ").indexOf(f) > -1 : "|=" === e ? b === f || b.slice(0, f.length + 1) === f + "-" : !1) : !0
                    }
                },
                CHILD: function(i, j, k, l, m) {
                    var n = "nth" !== i.slice(0, 3),
                        o = "last" !== i.slice(-4),
                        p = "of-type" === j;
                    return 1 === l && 0 === m ? function(b) {
                        return !!b.parentNode
                    } : function(a, d, e) {
                        var f, g, h, u, v, w, x = n !== o ? "nextSibling" : "previousSibling",
                            y = a.parentNode,
                            z = p && a.nodeName.toLowerCase(),
                            A = !e && !p,
                            B = !1;
                        if (y) {
                            if (n) {
                                while (x) {
                                    u = a;
                                    while (u = u[x]) {
                                        if (p ? u.nodeName.toLowerCase() === z : 1 === u.nodeType) {
                                            return !1
                                        }
                                    }
                                    w = x = "only" === i && !w && "nextSibling"
                                }
                                return !0
                            }
                            if (w = [o ? y.firstChild : y.lastChild], o && A) {
                                u = y, h = u[dF] || (u[dF] = {}), g = h[u.uniqueID] || (h[u.uniqueID] = {}), f = g[i] || [], v = f[0] === dL && f[1], B = v && f[2], u = v && y.childNodes[v];
                                while (u = ++v && u && u[x] || (B = v = 0) || w.pop()) {
                                    if (1 === u.nodeType && ++B && u === a) {
                                        g[i] = [dL, v, B];
                                        break
                                    }
                                }
                            } else {
                                if (A && (u = a, h = u[dF] || (u[dF] = {}), g = h[u.uniqueID] || (h[u.uniqueID] = {}), f = g[i] || [], v = f[0] === dL && f[1], B = v), B === !1) {
                                    while (u = ++v && u && u[x] || (B = v = 0) || w.pop()) {
                                        if ((p ? u.nodeName.toLowerCase() === z : 1 === u.nodeType) && ++B && (A && (h = u[dF] || (u[dF] = {}), g = h[u.uniqueID] || (h[u.uniqueID] = {}), g[i] = [dL, B]), u === a)) {
                                            break
                                        }
                                    }
                                }
                            }
                            return B -= m, B === l || B % l === 0 && B / l >= 0
                        }
                    }
                },
                PSEUDO: function(d, f) {
                    var g, h = cO.pseudos[d] || cO.setFilters[d.toLowerCase()] || cW.error("unsupported pseudo: " + d);
                    return h[dF] ? h(f) : h.length > 1 ? (g = [d, d, "", f], cO.setFilters.hasOwnProperty(d.toLowerCase()) ? c2(function(b, e) {
                        var i, j = h(b, f),
                            k = j.length;
                        while (k--) {
                            i = c7(b, j[k]), b[i] = !(e[i] = j[k])
                        }
                    }) : function(b) {
                        return h(b, 0, g)
                    }) : h
                }
            },
            pseudos: {
                not: c2(function(e) {
                    var f = [],
                        g = [],
                        h = c0(e.replace(du, "$1"));
                    return h[dF] ? c2(function(d, i, j, k) {
                        var l, m = h(d, null, k, []),
                            n = d.length;
                        while (n--) {
                            (l = m[n]) && (d[n] = !(i[n] = l))
                        }
                    }) : function(b, c, d) {
                        return f[0] = b, h(f, null, d, g), f[0] = null, !g.pop()
                    }
                }),
                has: c2(function(b) {
                    return function(a) {
                        return cW(b, a).length > 0
                    }
                }),
                contains: c2(function(b) {
                    return b = b.replace(cK, cN),
                        function(a) {
                            return (a.textContent || a.innerText || cR(a)).indexOf(b) > -1
                        }
                }),
                lang: c2(function(b) {
                    return dJ.test(b || "") || cW.error("unsupported lang: " + b), b = b.replace(cK, cN).toLowerCase(),
                        function(a) {
                            var d;
                            do {
                                if (d = dq ? a.lang : a.getAttribute("xml:lang") || a.getAttribute("lang")) {
                                    return d = d.toLowerCase(), d === b || 0 === d.indexOf(b + "-")
                                }
                            } while ((a = a.parentNode) && 1 === a.nodeType);
                            return !1
                        }
                }),
                target: function(a) {
                    var d = cb.location && cb.location.hash;
                    return d && d.slice(1) === a.id
                },
                root: function(b) {
                    return b === dm
                },
                focus: function(b) {
                    return b === dj.activeElement && (!dj.hasFocus || dj.hasFocus()) && !!(b.type || b.href || ~b.tabIndex)
                },
                enabled: function(b) {
                    return b.disabled === !1
                },
                disabled: function(b) {
                    return b.disabled === !0
                },
                checked: function(c) {
                    var d = c.nodeName.toLowerCase();
                    return "input" === d && !!c.checked || "option" === d && !!c.selected
                },
                selected: function(b) {
                    return b.parentNode && b.parentNode.selectedIndex, b.selected === !0
                },
                empty: function(b) {
                    for (b = b.firstChild; b; b = b.nextSibling) {
                        if (b.nodeType < 6) {
                            return !1
                        }
                    }
                    return !0
                },
                parent: function(b) {
                    return !cO.pseudos.empty(b)
                },
                header: function(b) {
                    return dS.test(b.nodeName)
                },
                input: function(b) {
                    return dP.test(b.nodeName)
                },
                button: function(c) {
                    var d = c.nodeName.toLowerCase();
                    return "input" === d && "button" === c.type || "button" === d
                },
                text: function(c) {
                    var d;
                    return "input" === c.nodeName.toLowerCase() && "text" === c.type && (null == (d = c.getAttribute("type")) || "text" === d.toLowerCase())
                },
                first: dl(function() {
                    return [0]
                }),
                last: dl(function(c, d) {
                    return [d - 1]
                }),
                eq: dl(function(d, e, f) {
                    return [0 > f ? f + e : f]
                }),
                even: dl(function(d, e) {
                    for (var f = 0; e > f; f += 2) {
                        d.push(f)
                    }
                    return d
                }),
                odd: dl(function(d, e) {
                    for (var f = 1; e > f; f += 2) {
                        d.push(f)
                    }
                    return d
                }),
                lt: dl(function(e, f, g) {
                    for (var h = 0 > g ? g + f : g; --h >= 0;) {
                        e.push(h)
                    }
                    return e
                }),
                gt: dl(function(e, f, g) {
                    for (var h = 0 > g ? g + f : g; ++h < f;) {
                        e.push(h)
                    }
                    return e
                })
            }
        }, cO.pseudos.nth = cO.pseudos.eq;
        for (cI in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) {
            cO.pseudos[cI] = df(cI)
        }
        for (cI in {
                submit: !0,
                reset: !0
            }) {
            cO.pseudos[cI] = di(cI)
        }

        function ds() {}
        ds.prototype = cO.filters = cO.pseudos, cO.setFilters = new ds, cX = cW.tokenize = function(d, l) {
            var m, n, o, p, q, r, s, t = dT[d + " "];
            if (t) {
                return l ? 0 : t.slice(0)
            }
            q = d, r = [], s = cO.preFilter;
            while (q) {
                m && !(n = dx.exec(q)) || (n && (q = q.slice(n[0].length) || q), r.push(o = [])), m = !1, (n = dA.exec(q)) && (m = n.shift(), o.push({
                    value: m,
                    type: n[0].replace(du, " ")
                }), q = q.slice(m.length));
                for (p in cO.filter) {
                    !(n = dM[p].exec(q)) || s[p] && !(n = s[p](n)) || (m = n.shift(), o.push({
                        value: m,
                        type: p,
                        matches: n
                    }), q = q.slice(m.length))
                }
                if (!m) {
                    break
                }
            }
            return l ? q.length : q ? cW.error(d) : dT(d, r).slice(0)
        };

        function dv(e) {
            for (var f = 0, g = e.length, h = ""; g > f; f++) {
                h += e[f].value
            }
            return h
        }

        function dy(g, h, i) {
            var j = h.dir,
                k = i && "parentNode" === j,
                l = dO++;
            return h.first ? function(a, d, e) {
                while (a = a[j]) {
                    if (1 === a.nodeType || k) {
                        return g(a, d, e)
                    }
                }
            } : function(a, d, e) {
                var f, m, n, o = [dL, l];
                if (e) {
                    while (a = a[j]) {
                        if ((1 === a.nodeType || k) && g(a, d, e)) {
                            return !0
                        }
                    }
                } else {
                    while (a = a[j]) {
                        if (1 === a.nodeType || k) {
                            if (n = a[dF] || (a[dF] = {}), m = n[a.uniqueID] || (n[a.uniqueID] = {}), (f = m[j]) && f[0] === dL && f[1] === l) {
                                return o[2] = f[2]
                            }
                            if (m[j] = o, o[2] = g(a, d, e)) {
                                return !0
                            }
                        }
                    }
                }
            }
        }

        function dB(b) {
            return b.length > 1 ? function(a, f, g) {
                var h = b.length;
                while (h--) {
                    if (!b[h](a, f, g)) {
                        return !1
                    }
                }
                return !0
            } : b[0]
        }

        function dE(f, g, h) {
            for (var i = 0, j = g.length; j > i; i++) {
                cW(f, g[i], h)
            }
            return h
        }

        function dH(k, l, m, n, o) {
            for (var p, q = [], r = 0, s = k.length, t = null != l; s > r; r++) {
                (p = k[r]) && (m && !m(p, n, o) || (q.push(p), t && l.push(r)))
            }
            return q
        }

        function dK(g, h, i, j, k, l) {
            return j && !j[dF] && (j = dK(j)), k && !k[dF] && (k = dK(k, l)), c2(function(a, b, c, d) {
                var e, s, t, u = [],
                    v = [],
                    w = b.length,
                    x = a || dE(h || "*", c.nodeType ? [c] : c, []),
                    y = !g || !a && h ? x : dH(x, u, g, c, d),
                    z = i ? k || (a ? g : w || j) ? [] : b : y;
                if (i && i(y, z, c, d), j) {
                    e = dH(z, v), j(e, [], c, d), s = e.length;
                    while (s--) {
                        (t = e[s]) && (z[v[s]] = !(y[v[s]] = t))
                    }
                }
                if (a) {
                    if (k || g) {
                        if (k) {
                            e = [], s = z.length;
                            while (s--) {
                                (t = z[s]) && e.push(y[s] = t)
                            }
                            k(null, z = [], e, d)
                        }
                        s = z.length;
                        while (s--) {
                            (t = z[s]) && (e = k ? c7(a, t) : u[s]) > -1 && (a[e] = !(b[e] = t))
                        }
                    }
                } else {
                    z = dH(z === b ? z.splice(w, z.length) : z), k ? k(null, b, z, d) : c1.apply(b, z)
                }
            })
        }

        function dN(d) {
            for (var j, n, o, p = d.length, q = cO.relative[d[0].type], r = q || cO.relative[" "], s = q ? 1 : 0, t = dy(function(b) {
                    return b === j
                }, r, !0), u = dy(function(b) {
                    return c7(j, b) > -1
                }, r, !0), v = [function(b, f, g) {
                    var h = !q && (g || f !== c6) || ((j = f).nodeType ? t(b, f, g) : u(b, f, g));
                    return j = null, h
                }]; p > s; s++) {
                if (n = cO.relative[d[s].type]) {
                    v = [dy(dB(v), n)]
                } else {
                    if (n = cO.filter[d[s].type].apply(null, d[s].matches), n[dF]) {
                        for (o = ++s; p > o; o++) {
                            if (cO.relative[d[o].type]) {
                                break
                            }
                        }
                        return dK(s > 1 && dB(v), s > 1 && dv(d.slice(0, s - 1).concat({
                            value: " " === d[s - 2].type ? "*" : ""
                        })).replace(du, "$1"), n, o > s && dN(d.slice(s, o)), p > o && dN(d = d.slice(o)), p > o && dv(d))
                    }
                    v.push(n)
                }
            }
            return dB(v)
        }

        function dQ(d, g) {
            var h = g.length > 0,
                i = d.length > 0,
                j = function(a, b, c, e, m) {
                    var n, p, w, A = 0,
                        B = "0",
                        C = a && [],
                        D = [],
                        E = c6,
                        F = a || i && cO.find.TAG("*", m),
                        G = dL += null == E ? 1 : Math.random() || 0.1,
                        H = F.length;
                    for (m && (c6 = b === dj || b || m); B !== H && null != (n = F[B]); B++) {
                        if (i && n) {
                            p = 0, b || n.ownerDocument === dj || (dg(n), c = !dq);
                            while (w = d[p++]) {
                                if (w(n, b || dj, c)) {
                                    e.push(n);
                                    break
                                }
                            }
                            m && (dL = G)
                        }
                        h && ((n = !w && n) && A--, a && C.push(n))
                    }
                    if (A += B, h && B !== A) {
                        p = 0;
                        while (w = g[p++]) {
                            w(C, D, b, c)
                        }
                        if (a) {
                            if (A > 0) {
                                while (B--) {
                                    C[B] || D[B] || (D[B] = cV.call(e))
                                }
                            }
                            D = dH(D)
                        }
                        c1.apply(e, D), m && !a && D.length > 0 && A + g.length > 1 && cW.uniqueSort(e)
                    }
                    return m && (dL = G, c6 = E), C
                };
            return h ? c2(j) : j
        }
        return c0 = cW.compile = function(g, h) {
            var i, j = [],
                k = [],
                l = cG[g + " "];
            if (!l) {
                h || (h = cX(g)), i = h.length;
                while (i--) {
                    l = dN(h[i]), l[dF] ? j.push(l) : k.push(l)
                }
                l = cG(g, dQ(k, j)), l.selector = g
            }
            return l
        }, c3 = cW.select = function(c, d, g, h) {
            var p, q, r, s, t, u = "function" == typeof c && c,
                v = !h && cX(c = u.selector || c);
            if (g = g || [], 1 === v.length) {
                if (q = v[0] = v[0].slice(0), q.length > 2 && "ID" === (r = q[0]).type && cL.getById && 9 === d.nodeType && dq && cO.relative[q[1].type]) {
                    if (d = (cO.find.ID(r.matches[0].replace(cK, cN), d) || [])[0], !d) {
                        return g
                    }
                    u && (d = d.parentNode), c = c.slice(q.shift().value.length)
                }
                p = dM.needsContext.test(c) ? 0 : q.length;
                while (p--) {
                    if (r = q[p], cO.relative[s = r.type]) {
                        break
                    }
                    if ((t = cO.find[s]) && (h = t(r.matches[0].replace(cK, cN), bb.test(q[0].type) && dp(d.parentNode) || d))) {
                        if (q.splice(p, 1), c = h.length && dv(q), !c) {
                            return c1.apply(g, h), g
                        }
                        break
                    }
                }
            }
            return (u || c0(c, v))(h, d, !dq, g, !d || bb.test(c) && dp(d.parentNode) || d), g
        }, cL.sortStable = dF.split("").sort(cJ).join("") === dF, cL.detectDuplicates = !!dd, dg(), cL.sortDetached = c5(function(b) {
            return 1 & b.compareDocumentPosition(dj.createElement("div"))
        }), c5(function(b) {
            return b.innerHTML = "<a href='#'></a>", "#" === b.firstChild.getAttribute("href")
        }) || c8("type|href|height|width", function(d, e, f) {
            return f ? void 0 : d.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
        }), cL.attributes && c5(function(b) {
            return b.innerHTML = "<input/>", b.firstChild.setAttribute("value", ""), "" === b.firstChild.getAttribute("value")
        }) || c8("value", function(d, e, f) {
            return f || "input" !== d.nodeName.toLowerCase() ? void 0 : d.defaultValue
        }), c5(function(b) {
            return null == b.getAttribute("disabled")
        }) || c8(db, function(e, f, g) {
            var h;
            return g ? void 0 : e[f] === !0 ? f.toLowerCase() : (h = e.getAttributeNode(f)) && h.specified ? h.value : null
        }), cW
    }(ag);
    bz.find = b5, bz.expr = b5.selectors, bz.expr[":"] = bz.expr.pseudos, bz.uniqueSort = bz.unique = b5.uniqueSort, bz.text = b5.getText, bz.isXMLDoc = b5.isXML, bz.contains = b5.contains;
    var cc = function(f, g, h) {
            var i = [],
                j = void 0 !== h;
            while ((f = f[g]) && 9 !== f.nodeType) {
                if (1 === f.nodeType) {
                    if (j && bz(f).is(h)) {
                        break
                    }
                    i.push(f)
                }
            }
            return i
        },
        ch = function(d, e) {
            for (var f = []; d; d = d.nextSibling) {
                1 === d.nodeType && d !== e && f.push(d)
            }
            return f
        },
        cm = bz.expr.match.needsContext,
        cr = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
        cw = /^.[^:#\[\.,]*$/;

    function cB(d, e, f) {
        if (bz.isFunction(e)) {
            return bz.grep(d, function(b, c) {
                return !!e.call(b, c, b) !== f
            })
        }
        if (e.nodeType) {
            return bz.grep(d, function(b) {
                return b === e !== f
            })
        }
        if ("string" == typeof e) {
            if (cw.test(e)) {
                return bz.filter(e, d, f)
            }
            e = bz.filter(e, d)
        }
        return bz.grep(d, function(b) {
            return aX.call(e, b) > -1 !== f
        })
    }
    bz.filter = function(e, f, g) {
        var h = f[0];
        return g && (e = ":not(" + e + ")"), 1 === f.length && 1 === h.nodeType ? bz.find.matchesSelector(h, e) ? [h] : [] : bz.find.matches(e, bz.grep(f, function(b) {
            return 1 === b.nodeType
        }))
    }, bz.fn.extend({
        find: function(f) {
            var g, h = this.length,
                i = [],
                j = this;
            if ("string" != typeof f) {
                return this.pushStack(bz(f).filter(function() {
                    for (g = 0; h > g; g++) {
                        if (bz.contains(j[g], this)) {
                            return !0
                        }
                    }
                }))
            }
            for (g = 0; h > g; g++) {
                bz.find(f, j[g], i)
            }
            return i = this.pushStack(h > 1 ? bz.unique(i) : i), i.selector = this.selector ? this.selector + " " + f : f, i
        },
        filter: function(b) {
            return this.pushStack(cB(this, b || [], !1))
        },
        not: function(b) {
            return this.pushStack(cB(this, b || [], !0))
        },
        is: function(b) {
            return !!cB(this, "string" == typeof b && cm.test(b) ? bz(b) : b || [], !1).length
        }
    });
    var ah, an = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        au = bz.fn.init = function(d, g, h) {
            var i, j;
            if (!d) {
                return this
            }
            if (h = h || ah, "string" == typeof d) {
                if (i = "<" === d[0] && ">" === d[d.length - 1] && d.length >= 3 ? [null, d, null] : an.exec(d), !i || !i[1] && g) {
                    return !g || g.jquery ? (g || h).find(d) : this.constructor(g).find(d)
                }
                if (i[1]) {
                    if (g = g instanceof bz ? g[0] : g, bz.merge(this, bz.parseHTML(i[1], g && g.nodeType ? g.ownerDocument || g : az, !0)), cr.test(i[1]) && bz.isPlainObject(g)) {
                        for (i in g) {
                            bz.isFunction(this[i]) ? this[i](g[i]) : this.attr(i, g[i])
                        }
                    }
                    return this
                }
                return j = az.getElementById(i[2]), j && j.parentNode && (this.length = 1, this[0] = j), this.context = az, this.selector = d, this
            }
            return d.nodeType ? (this.context = this[0] = d, this.length = 1, this) : bz.isFunction(d) ? void 0 !== h.ready ? h.ready(d) : d(bz) : (void 0 !== d.selector && (this.selector = d.selector, this.context = d.context), bz.makeArray(d, this))
        };
    au.prototype = bz.fn, ah = bz(az);
    var aA = /^(?:parents|prev(?:Until|All))/,
        aG = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    bz.fn.extend({
        has: function(d) {
            var e = bz(d, this),
                f = e.length;
            return this.filter(function() {
                for (var b = 0; f > b; b++) {
                    if (bz.contains(this, e[b])) {
                        return !0
                    }
                }
            })
        },
        closest: function(h, i) {
            for (var j, k = 0, l = this.length, m = [], n = cm.test(h) || "string" != typeof h ? bz(h, i || this.context) : 0; l > k; k++) {
                for (j = this[k]; j && j !== i; j = j.parentNode) {
                    if (j.nodeType < 11 && (n ? n.index(j) > -1 : 1 === j.nodeType && bz.find.matchesSelector(j, h))) {
                        m.push(j);
                        break
                    }
                }
            }
            return this.pushStack(m.length > 1 ? bz.uniqueSort(m) : m)
        },
        index: function(b) {
            return b ? "string" == typeof b ? aX.call(bz(b), this[0]) : aX.call(this, b.jquery ? b[0] : b) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(c, d) {
            return this.pushStack(bz.uniqueSort(bz.merge(this.get(), bz(c, d))))
        },
        addBack: function(b) {
            return this.add(null == b ? this.prevObject : this.prevObject.filter(b))
        }
    });

    function aM(c, d) {
        while ((c = c[d]) && 1 !== c.nodeType) {}
        return c
    }
    bz.each({
        parent: function(c) {
            var d = c.parentNode;
            return d && 11 !== d.nodeType ? d : null
        },
        parents: function(b) {
            return cc(b, "parentNode")
        },
        parentsUntil: function(d, e, f) {
            return cc(d, "parentNode", f)
        },
        next: function(b) {
            return aM(b, "nextSibling")
        },
        prev: function(b) {
            return aM(b, "previousSibling")
        },
        nextAll: function(b) {
            return cc(b, "nextSibling")
        },
        prevAll: function(b) {
            return cc(b, "previousSibling")
        },
        nextUntil: function(d, e, f) {
            return cc(d, "nextSibling", f)
        },
        prevUntil: function(d, e, f) {
            return cc(d, "previousSibling", f)
        },
        siblings: function(b) {
            return ch((b.parentNode || {}).firstChild, b)
        },
        children: function(b) {
            return ch(b.firstChild)
        },
        contents: function(b) {
            return b.contentDocument || bz.merge([], b.childNodes)
        }
    }, function(c, d) {
        bz.fn[c] = function(a, b) {
            var f = bz.map(this, d, a);
            return "Until" !== c.slice(-5) && (b = a), b && "string" == typeof b && (f = bz.filter(b, f)), this.length > 1 && (aG[c] || bz.uniqueSort(f), aA.test(c) && f.reverse()), this.pushStack(f)
        }
    });
    var aS = /\S+/g;

    function aY(c) {
        var d = {};
        return bz.each(c.match(aS) || [], function(b, e) {
            d[e] = !0
        }), d
    }
    bz.Callbacks = function(k) {
        k = "string" == typeof k ? aY(k) : bz.extend({}, k);
        var l, m, n, o, p = [],
            q = [],
            r = -1,
            s = function() {
                for (o = k.once, n = l = !0; q.length; r = -1) {
                    m = q.shift();
                    while (++r < p.length) {
                        p[r].apply(m[0], m[1]) === !1 && k.stopOnFalse && (r = p.length, m = !1)
                    }
                }
                k.memory || (m = !1), l = !1, o && (p = m ? [] : "")
            },
            t = {
                add: function() {
                    return p && (m && !l && (r = p.length - 1, q.push(m)), function a(c) {
                        bz.each(c, function(d, e) {
                            bz.isFunction(e) ? k.unique && t.has(e) || p.push(e) : e && e.length && "string" !== bz.type(e) && a(e)
                        })
                    }(arguments), m && !l && s()), this
                },
                remove: function() {
                    return bz.each(arguments, function(d, e) {
                        var f;
                        while ((f = bz.inArray(e, p, f)) > -1) {
                            p.splice(f, 1), r >= f && r--
                        }
                    }), this
                },
                has: function(b) {
                    return b ? bz.inArray(b, p) > -1 : p.length > 0
                },
                empty: function() {
                    return p && (p = []), this
                },
                disable: function() {
                    return o = q = [], p = m = "", this
                },
                disabled: function() {
                    return !p
                },
                lock: function() {
                    return o = q = [], m || (p = m = ""), this
                },
                locked: function() {
                    return !!o
                },
                fireWith: function(b, d) {
                    return o || (d = d || [], d = [b, d.slice ? d.slice() : d], q.push(d), l || s()), this
                },
                fire: function() {
                    return t.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!n
                }
            };
        return t
    }, bz.extend({
        Deferred: function(f) {
            var g = [
                    ["resolve", "done", bz.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", bz.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", bz.Callbacks("memory")]
                ],
                h = "pending",
                i = {
                    state: function() {
                        return h
                    },
                    always: function() {
                        return j.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var b = arguments;
                        return bz.Deferred(function(a) {
                            bz.each(g, function(c, d) {
                                var e = bz.isFunction(b[c]) && b[c];
                                j[d[1]](function() {
                                    var k = e && e.apply(this, arguments);
                                    k && bz.isFunction(k.promise) ? k.promise().progress(a.notify).done(a.resolve).fail(a.reject) : a[d[0] + "With"](this === i ? a.promise() : this, e ? [k] : arguments)
                                })
                            }), b = null
                        }).promise()
                    },
                    promise: function(b) {
                        return null != b ? bz.extend(b, i) : i
                    }
                },
                j = {};
            return i.pipe = i.then, bz.each(g, function(b, c) {
                var d = c[2],
                    e = c[3];
                i[c[1]] = d.add, e && d.add(function() {
                    h = e
                }, g[1 ^ b][2].disable, g[2][2].lock), j[c[0]] = function() {
                    return j[c[0] + "With"](this === j ? i : this, arguments), this
                }, j[c[0] + "With"] = d.fireWith
            }), i.promise(j), f && f.call(j, j), j
        },
        when: function(e) {
            var l = 0,
                m = aF.call(arguments),
                n = m.length,
                o = 1 !== n || e && bz.isFunction(e.promise) ? n : 0,
                p = 1 === o ? e : bz.Deferred(),
                q = function(d, f, g) {
                    return function(a) {
                        f[d] = this, g[d] = arguments.length > 1 ? aF.call(arguments) : a, g === r ? p.notifyWith(f, g) : --o || p.resolveWith(f, g)
                    }
                },
                r, s, t;
            if (n > 1) {
                for (r = new Array(n), s = new Array(n), t = new Array(n); n > l; l++) {
                    m[l] && bz.isFunction(m[l].promise) ? m[l].promise().progress(q(l, s, r)).done(q(l, t, m)).fail(p.reject) : --o
                }
            }
            return o || p.resolveWith(t, m), p.promise()
        }
    });
    var a4;
    bz.fn.ready = function(b) {
        return bz.ready.promise().done(b), this
    }, bz.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(b) {
            b ? bz.readyWait++ : bz.ready(!0)
        },
        ready: function(b) {
            (b === !0 ? --bz.readyWait : bz.isReady) || (bz.isReady = !0, b !== !0 && --bz.readyWait > 0 || (a4.resolveWith(az, [bz]), bz.fn.triggerHandler && (bz(az).triggerHandler("ready"), bz(az).off("ready"))))
        }
    });

    function bc() {
        az.removeEventListener("DOMContentLoaded", bc), ag.removeEventListener("load", bc), bz.ready()
    }
    bz.ready.promise = function(a) {
        return a4 || (a4 = bz.Deferred(), "complete" === az.readyState || "loading" !== az.readyState && !az.documentElement.doScroll ? ag.setTimeout(bz.ready) : (az.addEventListener("DOMContentLoaded", bc), ag.addEventListener("load", bc))), a4.promise(a)
    }, bz.ready.promise();
    var bi = function(k, l, m, n, o, p, q) {
            var r = 0,
                s = k.length,
                t = null == m;
            if ("object" === bz.type(m)) {
                o = !0;
                for (r in m) {
                    bi(k, l, r, m[r], !0, p, q)
                }
            } else {
                if (void 0 !== n && (o = !0, bz.isFunction(n) || (q = !0), t && (q ? (l.call(k, n), l = null) : (t = l, l = function(d, e, f) {
                        return t.call(bz(d), f)
                    })), l)) {
                    for (; s > r; r++) {
                        l(k[r], m, q ? n : n.call(k[r], r, l(k[r], m)))
                    }
                }
            }
            return o ? k : t ? l.call(k) : s ? l(k[0], m) : p
        },
        bo = function(b) {
            return 1 === b.nodeType || 9 === b.nodeType || !+b.nodeType
        };

    function bu() {
        this.expando = bz.expando + bu.uid++
    }
    bu.uid = 1, bu.prototype = {
        register: function(d, e) {
            var f = e || {};
            return d.nodeType ? d[this.expando] = f : Object.defineProperty(d, this.expando, {
                value: f,
                writable: !0,
                configurable: !0
            }), d[this.expando]
        },
        cache: function(c) {
            if (!bo(c)) {
                return {}
            }
            var d = c[this.expando];
            return d || (d = {}, bo(c) && (c.nodeType ? c[this.expando] = d : Object.defineProperty(c, this.expando, {
                value: d,
                configurable: !0
            }))), d
        },
        set: function(f, g, h) {
            var i, j = this.cache(f);
            if ("string" == typeof g) {
                j[g] = h
            } else {
                for (i in g) {
                    j[i] = g[i]
                }
            }
            return j
        },
        get: function(c, d) {
            return void 0 === d ? this.cache(c) : c[this.expando] && c[this.expando][d]
        },
        access: function(e, f, g) {
            var h;
            return void 0 === f || f && "string" == typeof f && void 0 === g ? (h = this.get(e, f), void 0 !== h ? h : this.get(e, bz.camelCase(f))) : (this.set(e, f, g), void 0 !== g ? g : f)
        },
        remove: function(g, h) {
            var i, j, k, l = g[this.expando];
            if (void 0 !== l) {
                if (void 0 === h) {
                    this.register(g)
                } else {
                    bz.isArray(h) ? j = h.concat(h.map(bz.camelCase)) : (k = bz.camelCase(h), h in l ? j = [h, k] : (j = k, j = j in l ? [j] : j.match(aS) || [])), i = j.length;
                    while (i--) {
                        delete l[j[i]]
                    }
                }(void 0 === h || bz.isEmptyObject(l)) && (g.nodeType ? g[this.expando] = void 0 : delete g[this.expando])
            }
        },
        hasData: function(c) {
            var d = c[this.expando];
            return void 0 !== d && !bz.isEmptyObject(d)
        }
    };
    var bA = new bu,
        bG = new bu,
        bM = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        bR = /[A-Z]/g;

    function bW(f, g, h) {
        var i;
        if (void 0 === h && 1 === f.nodeType) {
            if (i = "data-" + g.replace(bR, "-$&").toLowerCase(), h = f.getAttribute(i), "string" == typeof h) {
                try {
                    h = "true" === h ? !0 : "false" === h ? !1 : "null" === h ? null : +h + "" === h ? +h : bM.test(h) ? bz.parseJSON(h) : h
                } catch (j) {}
                bG.set(f, g, h)
            } else {
                h = void 0
            }
        }
        return h
    }
    bz.extend({
        hasData: function(b) {
            return bG.hasData(b) || bA.hasData(b)
        },
        data: function(d, e, f) {
            return bG.access(d, e, f)
        },
        removeData: function(c, d) {
            bG.remove(c, d)
        },
        _data: function(d, e, f) {
            return bA.access(d, e, f)
        },
        _removeData: function(c, d) {
            bA.remove(c, d)
        }
    }), bz.fn.extend({
        data: function(h, i) {
            var j, k, l, m = this[0],
                n = m && m.attributes;
            if (void 0 === h) {
                if (this.length && (l = bG.get(m), 1 === m.nodeType && !bA.get(m, "hasDataAttrs"))) {
                    j = n.length;
                    while (j--) {
                        n[j] && (k = n[j].name, 0 === k.indexOf("data-") && (k = bz.camelCase(k.slice(5)), bW(m, k, l[k])))
                    }
                    bA.set(m, "hasDataAttrs", !0)
                }
                return l
            }
            return "object" == typeof h ? this.each(function() {
                bG.set(this, h)
            }) : bi(this, function(a) {
                var e, f;
                if (m && void 0 === a) {
                    if (e = bG.get(m, h) || bG.get(m, h.replace(bR, "-$&").toLowerCase()), void 0 !== e) {
                        return e
                    }
                    if (f = bz.camelCase(h), e = bG.get(m, f), void 0 !== e) {
                        return e
                    }
                    if (e = bW(m, f, void 0), void 0 !== e) {
                        return e
                    }
                } else {
                    f = bz.camelCase(h), this.each(function() {
                        var b = bG.get(this, f);
                        bG.set(this, f, a), h.indexOf("-") > -1 && void 0 !== b && bG.set(this, h, a)
                    })
                }
            }, null, i, arguments.length > 1, null, !0)
        },
        removeData: function(b) {
            return this.each(function() {
                bG.remove(this, b)
            })
        }
    }), bz.extend({
        queue: function(e, f, g) {
            var h;
            return e ? (f = (f || "fx") + "queue", h = bA.get(e, f), g && (!h || bz.isArray(g) ? h = bA.access(e, f, bz.makeArray(g)) : h.push(g)), h || []) : void 0
        },
        dequeue: function(h, i) {
            i = i || "fx";
            var j = bz.queue(h, i),
                k = j.length,
                l = j.shift(),
                m = bz._queueHooks(h, i),
                n = function() {
                    bz.dequeue(h, i)
                };
            "inprogress" === l && (l = j.shift(), k--), l && ("fx" === i && j.unshift("inprogress"), delete m.stop, l.call(h, n, m)), !k && m && m.empty.fire()
        },
        _queueHooks: function(d, e) {
            var f = e + "queueHooks";
            return bA.get(d, f) || bA.access(d, f, {
                empty: bz.Callbacks("once memory").add(function() {
                    bA.remove(d, [e + "queue", f])
                })
            })
        }
    }), bz.fn.extend({
        queue: function(d, e) {
            var f = 2;
            return "string" != typeof d && (e = d, d = "fx", f--), arguments.length < f ? bz.queue(this[0], d) : void 0 === e ? this : this.each(function() {
                var a = bz.queue(this, d, e);
                bz._queueHooks(this, d), "fx" === d && "inprogress" !== a[0] && bz.dequeue(this, d)
            })
        },
        dequeue: function(b) {
            return this.each(function() {
                bz.dequeue(this, b)
            })
        },
        clearQueue: function(b) {
            return this.queue(b || "fx", [])
        },
        promise: function(i, j) {
            var k, l = 1,
                m = bz.Deferred(),
                n = this,
                o = this.length,
                p = function() {
                    --l || m.resolveWith(n, [n])
                };
            "string" != typeof i && (j = i, i = void 0), i = i || "fx";
            while (o--) {
                k = bA.get(n[o], i + "queueHooks"), k && k.empty && (l++, k.empty.add(p))
            }
            return p(), m.promise(j)
        }
    });
    var b1 = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        b6 = new RegExp("^(?:([+-])=|)(" + b1 + ")([a-z%]*)$", "i"),
        cd = ["Top", "Right", "Bottom", "Left"],
        ci = function(c, d) {
            return c = d || c, "none" === bz.css(c, "display") || !bz.contains(c.ownerDocument, c)
        };

    function cn(l, m, n, o) {
        var p, q = 1,
            r = 20,
            s = o ? function() {
                return o.cur()
            } : function() {
                return bz.css(l, m, "")
            },
            t = s(),
            u = n && n[3] || (bz.cssNumber[m] ? "" : "px"),
            v = (bz.cssNumber[m] || "px" !== u && +t) && b6.exec(bz.css(l, m));
        if (v && v[3] !== u) {
            u = u || v[3], n = n || [], v = +t || 1;
            do {
                q = q || ".5", v /= q, bz.style(l, m, v + u)
            } while (q !== (q = s() / t) && 1 !== q && --r)
        }
        return n && (v = +v || +t || 0, p = n[1] ? v + (n[1] + 1) * n[2] : +n[2], o && (o.unit = u, o.start = v, o.end = p)), p
    }
    var cs = /^(?:checkbox|radio)$/i,
        cx = /<([\w:-]+)/,
        cC = /^$|\/(?:java|ecma)script/i,
        ac = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    ac.optgroup = ac.option, ac.tbody = ac.tfoot = ac.colgroup = ac.caption = ac.thead, ac.th = ac.td;

    function ae(d, e) {
        var f = "undefined" != typeof d.getElementsByTagName ? d.getElementsByTagName(e || "*") : "undefined" != typeof d.querySelectorAll ? d.querySelectorAll(e || "*") : [];
        return void 0 === e || e && bz.nodeName(d, e) ? bz.merge([d], f) : f
    }

    function ai(e, f) {
        for (var g = 0, h = e.length; h > g; g++) {
            bA.set(e[g], "globalEval", !f || bA.get(f[g], "globalEval"))
        }
    }
    var ao = /<|&#?\w+;/;

    function av(n, q, r, s, t) {
        for (var u, v, w, x, y, z, A = q.createDocumentFragment(), B = [], C = 0, D = n.length; D > C; C++) {
            if (u = n[C], u || 0 === u) {
                if ("object" === bz.type(u)) {
                    bz.merge(B, u.nodeType ? [u] : u)
                } else {
                    if (ao.test(u)) {
                        v = v || A.appendChild(q.createElement("div")), w = (cx.exec(u) || ["", ""])[1].toLowerCase(), x = ac[w] || ac._default, v.innerHTML = x[1] + bz.htmlPrefilter(u) + x[2], z = x[0];
                        while (z--) {
                            v = v.lastChild
                        }
                        bz.merge(B, v.childNodes), v = A.firstChild, v.textContent = ""
                    } else {
                        B.push(q.createTextNode(u))
                    }
                }
            }
        }
        A.textContent = "", C = 0;
        while (u = B[C++]) {
            if (s && bz.inArray(u, s) > -1) {
                t && t.push(u)
            } else {
                if (y = bz.contains(u.ownerDocument, u), v = ae(A.appendChild(u), "script"), y && ai(v), r) {
                    z = 0;
                    while (u = v[z++]) {
                        cC.test(u.type || "") && r.push(u)
                    }
                }
            }
        }
        return A
    }! function() {
        var d = az.createDocumentFragment(),
            e = d.appendChild(az.createElement("div")),
            f = az.createElement("input");
        f.setAttribute("type", "radio"), f.setAttribute("checked", "checked"), f.setAttribute("name", "t"), e.appendChild(f), bn.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, e.innerHTML = "<textarea>x</textarea>", bn.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue
    }();
    var aB = /^key/,
        aH = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        aN = /^([^.]*)(?:\.(.+)|)/;

    function aT() {
        return !0
    }

    function aZ() {
        return !1
    }

    function a5() {
        try {
            return az.activeElement
        } catch (b) {}
    }

    function bd(i, j, k, l, m, n) {
        var o, p;
        if ("object" == typeof j) {
            "string" != typeof k && (l = l || k, k = void 0);
            for (p in j) {
                bd(i, p, k, l, j[p], n)
            }
            return i
        }
        if (null == l && null == m ? (m = k, l = k = void 0) : null == m && ("string" == typeof k ? (m = l, l = void 0) : (m = l, l = k, k = void 0)), m === !1) {
            m = aZ
        } else {
            if (!m) {
                return i
            }
        }
        return 1 === n && (o = m, m = function(b) {
            return bz().off(b), o.apply(this, arguments)
        }, m.guid = o.guid || (o.guid = bz.guid++)), i.each(function() {
            bz.event.add(this, j, m, l, k)
        })
    }
    bz.event = {
        global: {},
        add: function(n, s, t, u, v) {
            var w, x, y, z, A, B, C, D, E, F, G, H = bA.get(n);
            if (H) {
                t.handler && (w = t, t = w.handler, v = w.selector), t.guid || (t.guid = bz.guid++), (z = H.events) || (z = H.events = {}), (x = H.handle) || (x = H.handle = function(a) {
                    return "undefined" != typeof bz && bz.event.triggered !== a.type ? bz.event.dispatch.apply(n, arguments) : void 0
                }), s = (s || "").match(aS) || [""], A = s.length;
                while (A--) {
                    y = aN.exec(s[A]) || [], E = G = y[1], F = (y[2] || "").split(".").sort(), E && (C = bz.event.special[E] || {}, E = (v ? C.delegateType : C.bindType) || E, C = bz.event.special[E] || {}, B = bz.extend({
                        type: E,
                        origType: G,
                        data: u,
                        handler: t,
                        guid: t.guid,
                        selector: v,
                        needsContext: v && bz.expr.match.needsContext.test(v),
                        namespace: F.join(".")
                    }, w), (D = z[E]) || (D = z[E] = [], D.delegateCount = 0, C.setup && C.setup.call(n, u, F, x) !== !1 || n.addEventListener && n.addEventListener(E, x)), C.add && (C.add.call(n, B), B.handler.guid || (B.handler.guid = t.guid)), v ? D.splice(D.delegateCount++, 0, B) : D.push(B), bz.event.global[E] = !0)
                }
            }
        },
        remove: function(n, s, t, u, v) {
            var w, x, y, z, A, B, C, D, E, F, G, H = bA.hasData(n) && bA.get(n);
            if (H && (z = H.events)) {
                s = (s || "").match(aS) || [""], A = s.length;
                while (A--) {
                    if (y = aN.exec(s[A]) || [], E = G = y[1], F = (y[2] || "").split(".").sort(), E) {
                        C = bz.event.special[E] || {}, E = (u ? C.delegateType : C.bindType) || E, D = z[E] || [], y = y[2] && new RegExp("(^|\\.)" + F.join("\\.(?:.*\\.|)") + "(\\.|$)"), x = w = D.length;
                        while (w--) {
                            B = D[w], !v && G !== B.origType || t && t.guid !== B.guid || y && !y.test(B.namespace) || u && u !== B.selector && ("**" !== u || !B.selector) || (D.splice(w, 1), B.selector && D.delegateCount--, C.remove && C.remove.call(n, B))
                        }
                        x && !D.length && (C.teardown && C.teardown.call(n, F, H.handle) !== !1 || bz.removeEvent(n, E, H.handle), delete z[E])
                    } else {
                        for (E in z) {
                            bz.event.remove(n, E + s[A], t, u, !0)
                        }
                    }
                }
                bz.isEmptyObject(z) && bA.remove(n, "handle events")
            }
        },
        dispatch: function(e) {
            e = bz.event.fix(e);
            var l, m, n, o, p, q = [],
                r = aF.call(arguments),
                s = (bA.get(this, "events") || {})[e.type] || [],
                t = bz.event.special[e.type] || {};
            if (r[0] = e, e.delegateTarget = this, !t.preDispatch || t.preDispatch.call(this, e) !== !1) {
                q = bz.event.handlers.call(this, e, s), l = 0;
                while ((o = q[l++]) && !e.isPropagationStopped()) {
                    e.currentTarget = o.elem, m = 0;
                    while ((p = o.handlers[m++]) && !e.isImmediatePropagationStopped()) {
                        e.rnamespace && !e.rnamespace.test(p.namespace) || (e.handleObj = p, e.data = p.data, n = ((bz.event.special[p.origType] || {}).handle || p.handler).apply(o.elem, r), void 0 !== n && (e.result = n) === !1 && (e.preventDefault(), e.stopPropagation()))
                    }
                }
                return t.postDispatch && t.postDispatch.call(this, e), e.result
            }
        },
        handlers: function(j, k) {
            var l, m, n, o, p = [],
                q = k.delegateCount,
                r = j.target;
            if (q && r.nodeType && ("click" !== j.type || isNaN(j.button) || j.button < 1)) {
                for (; r !== this; r = r.parentNode || this) {
                    if (1 === r.nodeType && (r.disabled !== !0 || "click" !== j.type)) {
                        for (m = [], l = 0; q > l; l++) {
                            o = k[l], n = o.selector + " ", void 0 === m[n] && (m[n] = o.needsContext ? bz(n, this).index(r) > -1 : bz.find(n, this, null, [r]).length), m[n] && m.push(o)
                        }
                        m.length && p.push({
                            elem: r,
                            handlers: m
                        })
                    }
                }
            }
            return q < k.length && p.push({
                elem: this,
                handlers: k.slice(q)
            }), p
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(c, d) {
                return null == c.which && (c.which = null != d.charCode ? d.charCode : d.keyCode), c
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(d, h) {
                var i, j, k, l = h.button;
                return null == d.pageX && null != h.clientX && (i = d.target.ownerDocument || az, j = i.documentElement, k = i.body, d.pageX = h.clientX + (j && j.scrollLeft || k && k.scrollLeft || 0) - (j && j.clientLeft || k && k.clientLeft || 0), d.pageY = h.clientY + (j && j.scrollTop || k && k.scrollTop || 0) - (j && j.clientTop || k && k.clientTop || 0)), d.which || void 0 === l || (d.which = 1 & l ? 1 : 2 & l ? 3 : 4 & l ? 2 : 0), d
            }
        },
        fix: function(d) {
            if (d[bz.expando]) {
                return d
            }
            var i, j, k, l = d.type,
                m = d,
                n = this.fixHooks[l];
            n || (this.fixHooks[l] = n = aH.test(l) ? this.mouseHooks : aB.test(l) ? this.keyHooks : {}), k = n.props ? this.props.concat(n.props) : this.props, d = new bz.Event(m), i = k.length;
            while (i--) {
                j = k[i], d[j] = m[j]
            }
            return d.target || (d.target = az), 3 === d.target.nodeType && (d.target = d.target.parentNode), n.filter ? n.filter(d, m) : d
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== a5() && this.focus ? (this.focus(), !1) : void 0
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === a5() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click && bz.nodeName(this, "input") ? (this.click(), !1) : void 0
                },
                _default: function(b) {
                    return bz.nodeName(b.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(b) {
                    void 0 !== b.result && b.originalEvent && (b.originalEvent.returnValue = b.result)
                }
            }
        }
    }, bz.removeEvent = function(d, e, f) {
        d.removeEventListener && d.removeEventListener(e, f)
    }, bz.Event = function(c, d) {
        return this instanceof bz.Event ? (c && c.type ? (this.originalEvent = c, this.type = c.type, this.isDefaultPrevented = c.defaultPrevented || void 0 === c.defaultPrevented && c.returnValue === !1 ? aT : aZ) : this.type = c, d && bz.extend(this, d), this.timeStamp = c && c.timeStamp || bz.now(), void(this[bz.expando] = !0)) : new bz.Event(c, d)
    }, bz.Event.prototype = {
        constructor: bz.Event,
        isDefaultPrevented: aZ,
        isPropagationStopped: aZ,
        isImmediatePropagationStopped: aZ,
        preventDefault: function() {
            var b = this.originalEvent;
            this.isDefaultPrevented = aT, b && b.preventDefault()
        },
        stopPropagation: function() {
            var b = this.originalEvent;
            this.isPropagationStopped = aT, b && b.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var b = this.originalEvent;
            this.isImmediatePropagationStopped = aT, b && b.stopImmediatePropagation(), this.stopPropagation()
        }
    }, bz.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(c, d) {
        bz.event.special[c] = {
            delegateType: d,
            bindType: d,
            handle: function(b) {
                var g, h = this,
                    i = b.relatedTarget,
                    j = b.handleObj;
                return i && (i === h || bz.contains(h, i)) || (b.type = j.origType, g = j.handler.apply(this, arguments), b.type = d), g
            }
        }
    }), bz.fn.extend({
        on: function(e, f, g, h) {
            return bd(this, e, f, g, h)
        },
        one: function(e, f, g, h) {
            return bd(this, e, f, g, h, 1)
        },
        off: function(f, g, h) {
            var i, j;
            if (f && f.preventDefault && f.handleObj) {
                return i = f.handleObj, bz(f.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this
            }
            if ("object" == typeof f) {
                for (j in f) {
                    this.off(j, g, f[j])
                }
                return this
            }
            return g !== !1 && "function" != typeof g || (h = g, g = void 0), h === !1 && (h = aZ), this.each(function() {
                bz.event.remove(this, f, h, g)
            })
        }
    });
    var bj = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
        bp = /<script|<style|<link/i,
        bv = /checked\s*(?:[^=]|=\s*.checked.)/i,
        bB = /^true\/(.*)/,
        bH = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

    function bN(c, d) {
        return bz.nodeName(c, "table") && bz.nodeName(11 !== d.nodeType ? d : d.firstChild, "tr") ? c.getElementsByTagName("tbody")[0] || c.appendChild(c.ownerDocument.createElement("tbody")) : c
    }

    function bS(b) {
        return b.type = (null !== b.getAttribute("type")) + "/" + b.type, b
    }

    function bX(c) {
        var d = bB.exec(c.type);
        return d ? c.type = d[1] : c.removeAttribute("type"), c
    }

    function b2(k, l) {
        var m, n, o, p, q, r, s, t;
        if (1 === l.nodeType) {
            if (bA.hasData(k) && (p = bA.access(k), q = bA.set(l, p), t = p.events)) {
                delete q.handle, q.events = {};
                for (o in t) {
                    for (m = 0, n = t[o].length; n > m; m++) {
                        bz.event.add(l, o, t[o][m])
                    }
                }
            }
            bG.hasData(k) && (r = bG.access(k), s = bz.extend({}, r), bG.set(l, s))
        }
    }

    function b7(d, e) {
        var f = e.nodeName.toLowerCase();
        "input" === f && cs.test(d.type) ? e.checked = d.checked : "input" !== f && "textarea" !== f || (e.defaultValue = d.defaultValue)
    }

    function ce(f, l, n, s) {
        l = aL.apply([], l);
        var t, u, v, w, x, y, z = 0,
            A = f.length,
            B = A - 1,
            C = l[0],
            D = bz.isFunction(C);
        if (D || A > 1 && "string" == typeof C && !bn.checkClone && bv.test(C)) {
            return f.each(function(a) {
                var b = f.eq(a);
                D && (l[0] = C.call(this, a, b.html())), ce(b, l, n, s)
            })
        }
        if (A && (t = av(l, f[0].ownerDocument, !1, f, s), u = t.firstChild, 1 === t.childNodes.length && (t = u), u || s)) {
            for (v = bz.map(ae(t, "script"), bS), w = v.length; A > z; z++) {
                x = t, z !== B && (x = bz.clone(x, !0, !0), w && bz.merge(v, ae(x, "script"))), n.call(f[z], x, z)
            }
            if (w) {
                for (y = v[v.length - 1].ownerDocument, bz.map(v, bX), z = 0; w > z; z++) {
                    x = v[z], cC.test(x.type || "") && !bA.access(x, "globalEval") && bz.contains(y, x) && (x.src ? bz._evalUrl && bz._evalUrl(x.src) : bz.globalEval(x.textContent.replace(bH, "")))
                }
            }
        }
        return f
    }

    function cj(g, h, i) {
        for (var j, k = h ? bz.filter(h, g) : g, l = 0; null != (j = k[l]); l++) {
            i || 1 !== j.nodeType || bz.cleanData(ae(j)), j.parentNode && (i && bz.contains(j.ownerDocument, j) && ai(ae(j, "script")), j.parentNode.removeChild(j))
        }
        return g
    }
    bz.extend({
        htmlPrefilter: function(b) {
            return b.replace(bj, "<$1></$2>")
        },
        clone: function(j, k, l) {
            var m, n, o, p, q = j.cloneNode(!0),
                r = bz.contains(j.ownerDocument, j);
            if (!(bn.noCloneChecked || 1 !== j.nodeType && 11 !== j.nodeType || bz.isXMLDoc(j))) {
                for (p = ae(q), o = ae(j), m = 0, n = o.length; n > m; m++) {
                    b7(o[m], p[m])
                }
            }
            if (k) {
                if (l) {
                    for (o = o || ae(j), p = p || ae(q), m = 0, n = o.length; n > m; m++) {
                        b2(o[m], p[m])
                    }
                } else {
                    b2(j, q)
                }
            }
            return p = ae(q, "script"), p.length > 0 && ai(p, !r && ae(j, "script")), q
        },
        cleanData: function(g) {
            for (var h, i, j, k = bz.event.special, l = 0; void 0 !== (i = g[l]); l++) {
                if (bo(i)) {
                    if (h = i[bA.expando]) {
                        if (h.events) {
                            for (j in h.events) {
                                k[j] ? bz.event.remove(i, j) : bz.removeEvent(i, j, h.handle)
                            }
                        }
                        i[bA.expando] = void 0
                    }
                    i[bG.expando] && (i[bG.expando] = void 0)
                }
            }
        }
    }), bz.fn.extend({
        domManip: ce,
        detach: function(b) {
            return cj(this, b, !0)
        },
        remove: function(b) {
            return cj(this, b)
        },
        text: function(b) {
            return bi(this, function(c) {
                return void 0 === c ? bz.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = c)
                })
            }, null, b, arguments.length)
        },
        append: function() {
            return ce(this, arguments, function(c) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var d = bN(this, c);
                    d.appendChild(c)
                }
            })
        },
        prepend: function() {
            return ce(this, arguments, function(c) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var d = bN(this, c);
                    d.insertBefore(c, d.firstChild)
                }
            })
        },
        before: function() {
            return ce(this, arguments, function(b) {
                this.parentNode && this.parentNode.insertBefore(b, this)
            })
        },
        after: function() {
            return ce(this, arguments, function(b) {
                this.parentNode && this.parentNode.insertBefore(b, this.nextSibling)
            })
        },
        empty: function() {
            for (var c, d = 0; null != (c = this[d]); d++) {
                1 === c.nodeType && (bz.cleanData(ae(c, !1)), c.textContent = "")
            }
            return this
        },
        clone: function(c, d) {
            return c = null == c ? !1 : c, d = null == d ? c : d, this.map(function() {
                return bz.clone(this, c, d)
            })
        },
        html: function(b) {
            return bi(this, function(f) {
                var g = this[0] || {},
                    h = 0,
                    i = this.length;
                if (void 0 === f && 1 === g.nodeType) {
                    return g.innerHTML
                }
                if ("string" == typeof f && !bp.test(f) && !ac[(cx.exec(f) || ["", ""])[1].toLowerCase()]) {
                    f = bz.htmlPrefilter(f);
                    try {
                        for (; i > h; h++) {
                            g = this[h] || {}, 1 === g.nodeType && (bz.cleanData(ae(g, !1)), g.innerHTML = f)
                        }
                        g = 0
                    } catch (j) {}
                }
                g && this.empty().append(f)
            }, null, b, arguments.length)
        },
        replaceWith: function() {
            var b = [];
            return ce(this, arguments, function(a) {
                var d = this.parentNode;
                bz.inArray(this, b) < 0 && (bz.cleanData(ae(this)), d && d.replaceChild(a, this))
            }, b)
        }
    }), bz.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(c, d) {
        bz.fn[c] = function(b) {
            for (var g, i = [], j = bz(b), k = j.length - 1, l = 0; k >= l; l++) {
                g = l === k ? this : this.clone(!0), bz(j[l])[d](g), aR.apply(i, g.get())
            }
            return this.pushStack(i)
        }
    });
    var co, ct = {
        HTML: "block",
        BODY: "block"
    };

    function cy(e, f) {
        var g = bz(f.createElement(e)).appendTo(f.body),
            h = bz.css(g[0], "display");
        return g.detach(), h
    }

    function cD(d) {
        var e = az,
            f = ct[d];
        return f || (f = cy(d, e), "none" !== f && f || (co = (co || bz("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement), e = co[0].contentDocument, e.write(), e.close(), f = cy(d, e), co.detach()), ct[d] = f), f
    }
    var aj = /^margin/,
        ap = new RegExp("^(" + b1 + ")(?!px)[a-z%]+$", "i"),
        aw = function(a) {
            var d = a.ownerDocument.defaultView;
            return d && d.opener || (d = ag), d.getComputedStyle(a)
        },
        aC = function(h, i, j, k) {
            var l, m, n = {};
            for (m in i) {
                n[m] = h.style[m], h.style[m] = i[m]
            }
            l = j.apply(h, k || []);
            for (m in i) {
                h.style[m] = n[m]
            }
            return l
        },
        aI = az.documentElement;
    ! function() {
        var a, d, j, k, l = az.createElement("div"),
            m = az.createElement("div");
        if (m.style) {
            m.style.backgroundClip = "content-box", m.cloneNode(!0).style.backgroundClip = "", bn.clearCloneStyle = "content-box" === m.style.backgroundClip, l.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", l.appendChild(m);

            function n() {
                m.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", m.innerHTML = "", aI.appendChild(l);
                var b = ag.getComputedStyle(m);
                a = "1%" !== b.top, k = "2px" === b.marginLeft, d = "4px" === b.width, m.style.marginRight = "50%", j = "4px" === b.marginRight, aI.removeChild(l)
            }
            bz.extend(bn, {
                pixelPosition: function() {
                    return n(), a
                },
                boxSizingReliable: function() {
                    return null == d && n(), d
                },
                pixelMarginRight: function() {
                    return null == d && n(), j
                },
                reliableMarginLeft: function() {
                    return null == d && n(), k
                },
                reliableMarginRight: function() {
                    var e, f = m.appendChild(az.createElement("div"));
                    return f.style.cssText = m.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", f.style.marginRight = f.style.width = "0", m.style.width = "1px", aI.appendChild(l), e = !parseFloat(ag.getComputedStyle(f).marginRight), aI.removeChild(l), m.removeChild(f), e
                }
            })
        }
    }();

    function aO(i, j, k) {
        var l, m, n, o, p = i.style;
        return k = k || aw(i), o = k ? k.getPropertyValue(j) || k[j] : void 0, "" !== o && void 0 !== o || bz.contains(i.ownerDocument, i) || (o = bz.style(i, j)), k && !bn.pixelMarginRight() && ap.test(o) && aj.test(j) && (l = p.width, m = p.minWidth, n = p.maxWidth, p.minWidth = p.maxWidth = p.width = o, o = k.width, p.width = l, p.minWidth = m, p.maxWidth = n), void 0 !== o ? o + "" : o
    }

    function aU(c, d) {
        return {
            get: function() {
                return c() ? void delete this.get : (this.get = d).apply(this, arguments)
            }
        }
    }
    var a0 = /^(none|table(?!-c[ea]).+)/,
        a6 = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        be = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        bk = ["Webkit", "O", "Moz", "ms"],
        bq = az.createElement("div").style;

    function bw(d) {
        if (d in bq) {
            return d
        }
        var e = d[0].toUpperCase() + d.slice(1),
            f = bk.length;
        while (f--) {
            if (d = bk[f] + e, d in bq) {
                return d
            }
        }
    }

    function bC(e, f, g) {
        var h = b6.exec(f);
        return h ? Math.max(0, h[2] - (g || 0)) + (h[3] || "px") : f
    }

    function bI(h, i, j, k, l) {
        for (var m = j === (k ? "border" : "content") ? 4 : "width" === i ? 1 : 0, n = 0; 4 > m; m += 2) {
            "margin" === j && (n += bz.css(h, j + cd[m], !0, l)), k ? ("content" === j && (n -= bz.css(h, "padding" + cd[m], !0, l)), "margin" !== j && (n -= bz.css(h, "border" + cd[m] + "Width", !0, l))) : (n += bz.css(h, "padding" + cd[m], !0, l), "padding" !== j && (n += bz.css(h, "border" + cd[m] + "Width", !0, l)))
        }
        return n
    }

    function bO(a, d, j) {
        var k = !0,
            l = "width" === d ? a.offsetWidth : a.offsetHeight,
            m = aw(a),
            n = "border-box" === bz.css(a, "boxSizing", !1, m);
        if (az.msFullscreenElement && ag.top !== ag && a.getClientRects().length && (l = Math.round(100 * a.getBoundingClientRect()[d])), 0 >= l || null == l) {
            if (l = aO(a, d, m), (0 > l || null == l) && (l = a.style[d]), ap.test(l)) {
                return l
            }
            k = n && (bn.boxSizingReliable() || l === a.style[d]), l = parseFloat(l) || 0
        }
        return l + bI(a, d, j || (n ? "border" : "content"), k, m) + "px"
    }

    function bT(i, j) {
        for (var k, l, m, n = [], o = 0, p = i.length; p > o; o++) {
            l = i[o], l.style && (n[o] = bA.get(l, "olddisplay"), k = l.style.display, j ? (n[o] || "none" !== k || (l.style.display = ""), "" === l.style.display && ci(l) && (n[o] = bA.access(l, "olddisplay", cD(l.nodeName)))) : (m = ci(l), "none" === k && m || bA.set(l, "olddisplay", m ? k : bz.css(l, "display"))))
        }
        for (o = 0; p > o; o++) {
            l = i[o], l.style && (j && "none" !== l.style.display && "" !== l.style.display || (l.style.display = j ? n[o] || "" : "none"))
        }
        return i
    }
    bz.extend({
        cssHooks: {
            opacity: {
                get: function(d, e) {
                    if (e) {
                        var f = aO(d, "opacity");
                        return "" === f ? "1" : f
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(j, k, l, m) {
            if (j && 3 !== j.nodeType && 8 !== j.nodeType && j.style) {
                var n, o, p, q = bz.camelCase(k),
                    r = j.style;
                return k = bz.cssProps[q] || (bz.cssProps[q] = bw(q) || q), p = bz.cssHooks[k] || bz.cssHooks[q], void 0 === l ? p && "get" in p && void 0 !== (n = p.get(j, !1, m)) ? n : r[k] : (o = typeof l, "string" === o && (n = b6.exec(l)) && n[1] && (l = cn(j, k, n), o = "number"), null != l && l === l && ("number" === o && (l += n && n[3] || (bz.cssNumber[q] ? "" : "px")), bn.clearCloneStyle || "" !== l || 0 !== k.indexOf("background") || (r[k] = "inherit"), p && "set" in p && void 0 === (l = p.set(j, l, m)) || (r[k] = l)), void 0)
            }
        },
        css: function(i, j, k, l) {
            var m, n, o, p = bz.camelCase(j);
            return j = bz.cssProps[p] || (bz.cssProps[p] = bw(p) || p), o = bz.cssHooks[j] || bz.cssHooks[p], o && "get" in o && (m = o.get(i, !0, k)), void 0 === m && (m = aO(i, j, l)), "normal" === m && j in be && (m = be[j]), "" === k || k ? (n = parseFloat(m), k === !0 || isFinite(n) ? n || 0 : m) : m
        }
    }), bz.each(["height", "width"], function(c, d) {
        bz.cssHooks[d] = {
            get: function(b, e, f) {
                return e ? a0.test(bz.css(b, "display")) && 0 === b.offsetWidth ? aC(b, a6, function() {
                    return bO(b, d, f)
                }) : bO(b, d, f) : void 0
            },
            set: function(b, h, i) {
                var j, k = i && aw(b),
                    l = i && bI(b, d, i, "border-box" === bz.css(b, "boxSizing", !1, k), k);
                return l && (j = b6.exec(h)) && "px" !== (j[3] || "px") && (b.style[d] = h, h = bz.css(b, d)), bC(b, h, l)
            }
        }
    }), bz.cssHooks.marginLeft = aU(bn.reliableMarginLeft, function(c, d) {
        return d ? (parseFloat(aO(c, "marginLeft")) || c.getBoundingClientRect().left - aC(c, {
            marginLeft: 0
        }, function() {
            return c.getBoundingClientRect().left
        })) + "px" : void 0
    }), bz.cssHooks.marginRight = aU(bn.reliableMarginRight, function(c, d) {
        return d ? aC(c, {
            display: "inline-block"
        }, aO, [c, "marginRight"]) : void 0
    }), bz.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(c, d) {
        bz.cssHooks[c + d] = {
            expand: function(a) {
                for (var b = 0, g = {}, h = "string" == typeof a ? a.split(" ") : [a]; 4 > b; b++) {
                    g[c + cd[b] + d] = h[b] || h[b - 2] || h[0]
                }
                return g
            }
        }, aj.test(c) || (bz.cssHooks[c + d].set = bC)
    }), bz.fn.extend({
        css: function(c, d) {
            return bi(this, function(h, i, j) {
                var k, l, m = {},
                    n = 0;
                if (bz.isArray(i)) {
                    for (k = aw(h), l = i.length; l > n; n++) {
                        m[i[n]] = bz.css(h, i[n], !1, k)
                    }
                    return m
                }
                return void 0 !== j ? bz.style(h, i, j) : bz.css(h, i)
            }, c, d, arguments.length > 1)
        },
        show: function() {
            return bT(this, !0)
        },
        hide: function() {
            return bT(this)
        },
        toggle: function(b) {
            return "boolean" == typeof b ? b ? this.show() : this.hide() : this.each(function() {
                ci(this) ? bz(this).show() : bz(this).hide()
            })
        }
    });

    function bY(f, g, h, i, j) {
        return new bY.prototype.init(f, g, h, i, j)
    }
    bz.Tween = bY, bY.prototype = {
        constructor: bY,
        init: function(g, h, i, j, k, l) {
            this.elem = g, this.prop = i, this.easing = k || bz.easing._default, this.options = h, this.start = this.now = this.cur(), this.end = j, this.unit = l || (bz.cssNumber[i] ? "" : "px")
        },
        cur: function() {
            var b = bY.propHooks[this.prop];
            return b && b.get ? b.get(this) : bY.propHooks._default.get(this)
        },
        run: function(d) {
            var e, f = bY.propHooks[this.prop];
            return this.options.duration ? this.pos = e = bz.easing[this.easing](d, this.options.duration * d, 0, 1, this.options.duration) : this.pos = e = d, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), f && f.set ? f.set(this) : bY.propHooks._default.set(this), this
        }
    }, bY.prototype.init.prototype = bY.prototype, bY.propHooks = {
        _default: {
            get: function(c) {
                var d;
                return 1 !== c.elem.nodeType || null != c.elem[c.prop] && null == c.elem.style[c.prop] ? c.elem[c.prop] : (d = bz.css(c.elem, c.prop, ""), d && "auto" !== d ? d : 0)
            },
            set: function(b) {
                bz.fx.step[b.prop] ? bz.fx.step[b.prop](b) : 1 !== b.elem.nodeType || null == b.elem.style[bz.cssProps[b.prop]] && !bz.cssHooks[b.prop] ? b.elem[b.prop] = b.now : bz.style(b.elem, b.prop, b.now + b.unit)
            }
        }
    }, bY.propHooks.scrollTop = bY.propHooks.scrollLeft = {
        set: function(b) {
            b.elem.nodeType && b.elem.parentNode && (b.elem[b.prop] = b.now)
        }
    }, bz.easing = {
        linear: function(b) {
            return b
        },
        swing: function(b) {
            return 0.5 - Math.cos(b * Math.PI) / 2
        },
        _default: "swing"
    }, bz.fx = bY.prototype.init, bz.fx.step = {};
    var b3, b8, cf = /^(?:toggle|show|hide)$/,
        ck = /queueHooks$/;

    function cp() {
        return ag.setTimeout(function() {
            b3 = void 0
        }), b3 = bz.now()
    }

    function cu(f, g) {
        var h, i = 0,
            j = {
                height: f
            };
        for (g = g ? 1 : 0; 4 > i; i += 2 - g) {
            h = cd[i], j["margin" + h] = j["padding" + h] = f
        }
        return g && (j.opacity = j.width = f), j
    }

    function cz(h, i, j) {
        for (var k, l = (af.tweeners[i] || []).concat(af.tweeners["*"]), m = 0, n = l.length; n > m; m++) {
            if (k = l[m].call(j, i, h)) {
                return k
            }
        }
    }

    function cE(n, r, s) {
        var t, u, v, w, x, y, z, A, B = this,
            C = {},
            D = n.style,
            E = n.nodeType && ci(n),
            F = bA.get(n, "fxshow");
        s.queue || (x = bz._queueHooks(n, "fx"), null == x.unqueued && (x.unqueued = 0, y = x.empty.fire, x.empty.fire = function() {
            x.unqueued || y()
        }), x.unqueued++, B.always(function() {
            B.always(function() {
                x.unqueued--, bz.queue(n, "fx").length || x.empty.fire()
            })
        })), 1 === n.nodeType && ("height" in r || "width" in r) && (s.overflow = [D.overflow, D.overflowX, D.overflowY], z = bz.css(n, "display"), A = "none" === z ? bA.get(n, "olddisplay") || cD(n.nodeName) : z, "inline" === A && "none" === bz.css(n, "float") && (D.display = "inline-block")), s.overflow && (D.overflow = "hidden", B.always(function() {
            D.overflow = s.overflow[0], D.overflowX = s.overflow[1], D.overflowY = s.overflow[2]
        }));
        for (t in r) {
            if (u = r[t], cf.exec(u)) {
                if (delete r[t], v = v || "toggle" === u, u === (E ? "hide" : "show")) {
                    if ("show" !== u || !F || void 0 === F[t]) {
                        continue
                    }
                    E = !0
                }
                C[t] = F && F[t] || bz.style(n, t)
            } else {
                z = void 0
            }
        }
        if (bz.isEmptyObject(C)) {
            "inline" === ("none" === z ? cD(n.nodeName) : z) && (D.display = z)
        } else {
            F ? "hidden" in F && (E = F.hidden) : F = bA.access(n, "fxshow", {}), v && (F.hidden = !E), E ? bz(n).show() : B.done(function() {
                bz(n).hide()
            }), B.done(function() {
                var a;
                bA.remove(n, "fxshow");
                for (a in C) {
                    bz.style(n, a, C[a])
                }
            });
            for (t in C) {
                w = cz(E ? F[t] : 0, t, B), t in F || (F[t] = w.start, E && (w.end = w.start, w.start = "width" === t || "height" === t ? 1 : 0))
            }
        }
    }

    function ad(h, i) {
        var j, k, l, m, n;
        for (j in h) {
            if (k = bz.camelCase(j), l = i[k], m = h[j], bz.isArray(m) && (l = m[1], m = h[j] = m[0]), j !== k && (h[k] = m, delete h[j]), n = bz.cssHooks[k], n && "expand" in n) {
                m = n.expand(m), delete h[k];
                for (j in m) {
                    j in h || (h[j] = m[j], i[j] = l)
                }
            } else {
                i[k] = l
            }
        }
    }

    function af(l, m, n) {
        var o, p, q = 0,
            r = af.prefilters.length,
            s = bz.Deferred().always(function() {
                delete t.elem
            }),
            t = function() {
                if (p) {
                    return !1
                }
                for (var a = b3 || cp(), e = Math.max(0, u.startTime + u.duration - a), h = e / u.duration || 0, j = 1 - h, k = 0, w = u.tweens.length; w > k; k++) {
                    u.tweens[k].run(j)
                }
                return s.notifyWith(l, [u, j, e]), 1 > j && w ? e : (s.resolveWith(l, [u]), !1)
            },
            u = s.promise({
                elem: l,
                props: bz.extend({}, m),
                opts: bz.extend(!0, {
                    specialEasing: {},
                    easing: bz.easing._default
                }, n),
                originalProperties: m,
                originalOptions: n,
                startTime: b3 || cp(),
                duration: n.duration,
                tweens: [],
                createTween: function(a, e) {
                    var f = bz.Tween(l, u.opts, a, e, u.opts.specialEasing[a] || u.opts.easing);
                    return u.tweens.push(f), f
                },
                stop: function(a) {
                    var e = 0,
                        f = a ? u.tweens.length : 0;
                    if (p) {
                        return this
                    }
                    for (p = !0; f > e; e++) {
                        u.tweens[e].run(1)
                    }
                    return a ? (s.notifyWith(l, [u, 1, 0]), s.resolveWith(l, [u, a])) : s.rejectWith(l, [u, a]), this
                }
            }),
            v = u.props;
        for (ad(v, u.opts.specialEasing); r > q; q++) {
            if (o = af.prefilters[q].call(u, l, v, u.opts)) {
                return bz.isFunction(o.stop) && (bz._queueHooks(u.elem, u.opts.queue).stop = bz.proxy(o.stop, o)), o
            }
        }
        return bz.map(v, cz, u), bz.isFunction(u.opts.start) && u.opts.start.call(l, u), bz.fx.timer(bz.extend(t, {
            elem: l,
            anim: u,
            queue: u.opts.queue
        })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }
    bz.Animation = bz.extend(af, {
            tweeners: {
                "*": [function(d, e) {
                    var f = this.createTween(d, e);
                    return cn(f.elem, d, b6.exec(e), f), f
                }]
            },
            tweener: function(f, g) {
                bz.isFunction(f) ? (g = f, f = ["*"]) : f = f.match(aS);
                for (var h, i = 0, j = f.length; j > i; i++) {
                    h = f[i], af.tweeners[h] = af.tweeners[h] || [], af.tweeners[h].unshift(g)
                }
            },
            prefilters: [cE],
            prefilter: function(c, d) {
                d ? af.prefilters.unshift(c) : af.prefilters.push(c)
            }
        }), bz.speed = function(e, f, g) {
            var h = e && "object" == typeof e ? bz.extend({}, e) : {
                complete: g || !g && f || bz.isFunction(e) && e,
                duration: e,
                easing: g && f || f && !bz.isFunction(f) && f
            };
            return h.duration = bz.fx.off ? 0 : "number" == typeof h.duration ? h.duration : h.duration in bz.fx.speeds ? bz.fx.speeds[h.duration] : bz.fx.speeds._default, null != h.queue && h.queue !== !0 || (h.queue = "fx"), h.old = h.complete, h.complete = function() {
                bz.isFunction(h.old) && h.old.call(this), h.queue && bz.dequeue(this, h.queue)
            }, h
        }, bz.fn.extend({
            fadeTo: function(e, f, g, h) {
                return this.filter(ci).css("opacity", 0).show().end().animate({
                    opacity: f
                }, e, g, h)
            },
            animate: function(h, i, j, k) {
                var l = bz.isEmptyObject(h),
                    m = bz.speed(i, j, k),
                    n = function() {
                        var a = af(this, bz.extend({}, h), m);
                        (l || bA.get(this, "finish")) && a.stop(!0)
                    };
                return n.finish = n, l || m.queue === !1 ? this.each(n) : this.queue(m.queue, n)
            },
            stop: function(e, f, g) {
                var h = function(c) {
                    var d = c.stop;
                    delete c.stop, d(g)
                };
                return "string" != typeof e && (g = f, f = e, e = void 0), f && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                    var a = !0,
                        c = null != e && e + "queueHooks",
                        d = bz.timers,
                        i = bA.get(this);
                    if (c) {
                        i[c] && i[c].stop && h(i[c])
                    } else {
                        for (c in i) {
                            i[c] && i[c].stop && ck.test(c) && h(i[c])
                        }
                    }
                    for (c = d.length; c--;) {
                        d[c].elem !== this || null != e && d[c].queue !== e || (d[c].anim.stop(g), a = !1, d.splice(c, 1))
                    }!a && g || bz.dequeue(this, e)
                })
            },
            finish: function(b) {
                return b !== !1 && (b = b || "fx"), this.each(function() {
                    var a, h = bA.get(this),
                        i = h[b + "queue"],
                        j = h[b + "queueHooks"],
                        k = bz.timers,
                        l = i ? i.length : 0;
                    for (h.finish = !0, bz.queue(this, b, []), j && j.stop && j.stop.call(this, !0), a = k.length; a--;) {
                        k[a].elem === this && k[a].queue === b && (k[a].anim.stop(!0), k.splice(a, 1))
                    }
                    for (a = 0; l > a; a++) {
                        i[a] && i[a].finish && i[a].finish.call(this)
                    }
                    delete h.finish
                })
            }
        }), bz.each(["toggle", "show", "hide"], function(d, e) {
            var f = bz.fn[e];
            bz.fn[e] = function(b, c, g) {
                return null == b || "boolean" == typeof b ? f.apply(this, arguments) : this.animate(cu(e, !0), b, c, g)
            }
        }), bz.each({
            slideDown: cu("show"),
            slideUp: cu("hide"),
            slideToggle: cu("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(c, d) {
            bz.fn[c] = function(b, e, f) {
                return this.animate(d, b, e, f)
            }
        }), bz.timers = [], bz.fx.tick = function() {
            var d, e = 0,
                f = bz.timers;
            for (b3 = bz.now(); e < f.length; e++) {
                d = f[e], d() || f[e] !== d || f.splice(e--, 1)
            }
            f.length || bz.fx.stop(), b3 = void 0
        }, bz.fx.timer = function(b) {
            bz.timers.push(b), b() ? bz.fx.start() : bz.timers.pop()
        }, bz.fx.interval = 13, bz.fx.start = function() {
            b8 || (b8 = ag.setInterval(bz.fx.tick, bz.fx.interval))
        }, bz.fx.stop = function() {
            ag.clearInterval(b8), b8 = null
        }, bz.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, bz.fn.delay = function(a, d) {
            return a = bz.fx ? bz.fx.speeds[a] || a : a, d = d || "fx", this.queue(d, function(b, f) {
                var g = ag.setTimeout(b, a);
                f.stop = function() {
                    ag.clearTimeout(g)
                }
            })
        },
        function() {
            var d = az.createElement("input"),
                e = az.createElement("select"),
                f = e.appendChild(az.createElement("option"));
            d.type = "checkbox", bn.checkOn = "" !== d.value, bn.optSelected = f.selected, e.disabled = !0, bn.optDisabled = !f.disabled, d = az.createElement("input"), d.value = "t", d.type = "radio", bn.radioValue = "t" === d.value
        }();
    var ak, aq = bz.expr.attrHandle;
    bz.fn.extend({
        attr: function(c, d) {
            return bi(this, bz.attr, c, d, arguments.length > 1)
        },
        removeAttr: function(b) {
            return this.each(function() {
                bz.removeAttr(this, b)
            })
        }
    }), bz.extend({
        attr: function(g, h, i) {
            var j, k, l = g.nodeType;
            if (3 !== l && 8 !== l && 2 !== l) {
                return "undefined" == typeof g.getAttribute ? bz.prop(g, h, i) : (1 === l && bz.isXMLDoc(g) || (h = h.toLowerCase(), k = bz.attrHooks[h] || (bz.expr.match.bool.test(h) ? ak : void 0)), void 0 !== i ? null === i ? void bz.removeAttr(g, h) : k && "set" in k && void 0 !== (j = k.set(g, i, h)) ? j : (g.setAttribute(h, i + ""), i) : k && "get" in k && null !== (j = k.get(g, h)) ? j : (j = bz.find.attr(g, h), null == j ? void 0 : j))
            }
        },
        attrHooks: {
            type: {
                set: function(d, e) {
                    if (!bn.radioValue && "radio" === e && bz.nodeName(d, "input")) {
                        var f = d.value;
                        return d.setAttribute("type", e), f && (d.value = f), e
                    }
                }
            }
        },
        removeAttr: function(g, h) {
            var i, j, k = 0,
                l = h && h.match(aS);
            if (l && 1 === g.nodeType) {
                while (i = l[k++]) {
                    j = bz.propFix[i] || i, bz.expr.match.bool.test(i) && (g[j] = !1), g.removeAttribute(i)
                }
            }
        }
    }), ak = {
        set: function(d, e, f) {
            return e === !1 ? bz.removeAttr(d, f) : d.setAttribute(f, f), f
        }
    }, bz.each(bz.expr.match.bool.source.match(/\w+/g), function(d, e) {
        var f = aq[e] || bz.find.attr;
        aq[e] = function(c, g, h) {
            var i, j;
            return h || (j = aq[g], aq[g] = i, i = null != f(c, g, h) ? g.toLowerCase() : null, aq[g] = j), i
        }
    });
    var ax = /^(?:input|select|textarea|button)$/i,
        aD = /^(?:a|area)$/i;
    bz.fn.extend({
        prop: function(c, d) {
            return bi(this, bz.prop, c, d, arguments.length > 1)
        },
        removeProp: function(b) {
            return this.each(function() {
                delete this[bz.propFix[b] || b]
            })
        }
    }), bz.extend({
        prop: function(g, h, i) {
            var j, k, l = g.nodeType;
            if (3 !== l && 8 !== l && 2 !== l) {
                return 1 === l && bz.isXMLDoc(g) || (h = bz.propFix[h] || h, k = bz.propHooks[h]), void 0 !== i ? k && "set" in k && void 0 !== (j = k.set(g, i, h)) ? j : g[h] = i : k && "get" in k && null !== (j = k.get(g, h)) ? j : g[h]
            }
        },
        propHooks: {
            tabIndex: {
                get: function(c) {
                    var d = bz.find.attr(c, "tabindex");
                    return d ? parseInt(d, 10) : ax.test(c.nodeName) || aD.test(c.nodeName) && c.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }), bn.optSelected || (bz.propHooks.selected = {
        get: function(c) {
            var d = c.parentNode;
            return d && d.parentNode && d.parentNode.selectedIndex, null
        },
        set: function(c) {
            var d = c.parentNode;
            d && (d.selectedIndex, d.parentNode && d.parentNode.selectedIndex)
        }
    }), bz.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        bz.propFix[this.toLowerCase()] = this
    });
    var aJ = /[\t\r\n\f]/g;

    function aP(b) {
        return b.getAttribute && b.getAttribute("class") || ""
    }
    bz.fn.extend({
        addClass: function(j) {
            var k, l, m, n, o, p, q, r = 0;
            if (bz.isFunction(j)) {
                return this.each(function(a) {
                    bz(this).addClass(j.call(this, a, aP(this)))
                })
            }
            if ("string" == typeof j && j) {
                k = j.match(aS) || [];
                while (l = this[r++]) {
                    if (n = aP(l), m = 1 === l.nodeType && (" " + n + " ").replace(aJ, " ")) {
                        p = 0;
                        while (o = k[p++]) {
                            m.indexOf(" " + o + " ") < 0 && (m += o + " ")
                        }
                        q = bz.trim(m), n !== q && l.setAttribute("class", q)
                    }
                }
            }
            return this
        },
        removeClass: function(j) {
            var k, l, m, n, o, p, q, r = 0;
            if (bz.isFunction(j)) {
                return this.each(function(a) {
                    bz(this).removeClass(j.call(this, a, aP(this)))
                })
            }
            if (!arguments.length) {
                return this.attr("class", "")
            }
            if ("string" == typeof j && j) {
                k = j.match(aS) || [];
                while (l = this[r++]) {
                    if (n = aP(l), m = 1 === l.nodeType && (" " + n + " ").replace(aJ, " ")) {
                        p = 0;
                        while (o = k[p++]) {
                            while (m.indexOf(" " + o + " ") > -1) {
                                m = m.replace(" " + o + " ", " ")
                            }
                        }
                        q = bz.trim(m), n !== q && l.setAttribute("class", q)
                    }
                }
            }
            return this
        },
        toggleClass: function(d, e) {
            var f = typeof d;
            return "boolean" == typeof e && "string" === f ? e ? this.addClass(d) : this.removeClass(d) : bz.isFunction(d) ? this.each(function(a) {
                bz(this).toggleClass(d.call(this, a, aP(this), e), e)
            }) : this.each(function() {
                var a, c, g, h;
                if ("string" === f) {
                    c = 0, g = bz(this), h = d.match(aS) || [];
                    while (a = h[c++]) {
                        g.hasClass(a) ? g.removeClass(a) : g.addClass(a)
                    }
                } else {
                    void 0 !== d && "boolean" !== f || (a = aP(this), a && bA.set(this, "__className__", a), this.setAttribute && this.setAttribute("class", a || d === !1 ? "" : bA.get(this, "__className__") || ""))
                }
            })
        },
        hasClass: function(e) {
            var f, g, h = 0;
            f = " " + e + " ";
            while (g = this[h++]) {
                if (1 === g.nodeType && (" " + aP(g) + " ").replace(aJ, " ").indexOf(f) > -1) {
                    return !0
                }
            }
            return !1
        }
    });
    var aV = /\r/g,
        a1 = /[\x20\t\r\n\f]+/g;
    bz.fn.extend({
        val: function(f) {
            var g, h, i, j = this[0];
            if (arguments.length) {
                return i = bz.isFunction(f), this.each(function(a) {
                    var b;
                    1 === this.nodeType && (b = i ? f.call(this, a, bz(this).val()) : f, null == b ? b = "" : "number" == typeof b ? b += "" : bz.isArray(b) && (b = bz.map(b, function(c) {
                        return null == c ? "" : c + ""
                    })), g = bz.valHooks[this.type] || bz.valHooks[this.nodeName.toLowerCase()], g && "set" in g && void 0 !== g.set(this, b, "value") || (this.value = b))
                })
            }
            if (j) {
                return g = bz.valHooks[j.type] || bz.valHooks[j.nodeName.toLowerCase()], g && "get" in g && void 0 !== (h = g.get(j, "value")) ? h : (h = j.value, "string" == typeof h ? h.replace(aV, "") : null == h ? "" : h)
            }
        }
    }), bz.extend({
        valHooks: {
            option: {
                get: function(c) {
                    var d = bz.find.attr(c, "value");
                    return null != d ? d : bz.trim(bz.text(c)).replace(a1, " ")
                }
            },
            select: {
                get: function(j) {
                    for (var k, l, m = j.options, n = j.selectedIndex, o = "select-one" === j.type || 0 > n, p = o ? null : [], q = o ? n + 1 : m.length, r = 0 > n ? q : o ? n : 0; q > r; r++) {
                        if (l = m[r], (l.selected || r === n) && (bn.optDisabled ? !l.disabled : null === l.getAttribute("disabled")) && (!l.parentNode.disabled || !bz.nodeName(l.parentNode, "optgroup"))) {
                            if (k = bz(l).val(), o) {
                                return k
                            }
                            p.push(k)
                        }
                    }
                    return p
                },
                set: function(h, i) {
                    var j, k, l = h.options,
                        m = bz.makeArray(i),
                        n = l.length;
                    while (n--) {
                        k = l[n], (k.selected = bz.inArray(bz.valHooks.option.get(k), m) > -1) && (j = !0)
                    }
                    return j || (h.selectedIndex = -1), m
                }
            }
        }
    }), bz.each(["radio", "checkbox"], function() {
        bz.valHooks[this] = {
            set: function(c, d) {
                return bz.isArray(d) ? c.checked = bz.inArray(bz(c).val(), d) > -1 : void 0
            }
        }, bn.checkOn || (bz.valHooks[this].get = function(b) {
            return null === b.getAttribute("value") ? "on" : b.value
        })
    });
    var a7 = /^(?:focusinfocus|focusoutblur)$/;
    bz.extend(bz.event, {
        trigger: function(a, d, k, n) {
            var s, t, u, v, w, x, y, z = [k || az],
                A = bh.call(a, "type") ? a.type : a,
                B = bh.call(a, "namespace") ? a.namespace.split(".") : [];
            if (t = u = k = k || az, 3 !== k.nodeType && 8 !== k.nodeType && !a7.test(A + bz.event.triggered) && (A.indexOf(".") > -1 && (B = A.split("."), A = B.shift(), B.sort()), w = A.indexOf(":") < 0 && "on" + A, a = a[bz.expando] ? a : new bz.Event(A, "object" == typeof a && a), a.isTrigger = n ? 2 : 3, a.namespace = B.join("."), a.rnamespace = a.namespace ? new RegExp("(^|\\.)" + B.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, a.result = void 0, a.target || (a.target = k), d = null == d ? [a] : bz.makeArray(d, [a]), y = bz.event.special[A] || {}, n || !y.trigger || y.trigger.apply(k, d) !== !1)) {
                if (!n && !y.noBubble && !bz.isWindow(k)) {
                    for (v = y.delegateType || A, a7.test(v + A) || (t = t.parentNode); t; t = t.parentNode) {
                        z.push(t), u = t
                    }
                    u === (k.ownerDocument || az) && z.push(u.defaultView || u.parentWindow || ag)
                }
                s = 0;
                while ((t = z[s++]) && !a.isPropagationStopped()) {
                    a.type = s > 1 ? v : y.bindType || A, x = (bA.get(t, "events") || {})[a.type] && bA.get(t, "handle"), x && x.apply(t, d), x = w && t[w], x && x.apply && bo(t) && (a.result = x.apply(t, d), a.result === !1 && a.preventDefault())
                }
                return a.type = A, n || a.isDefaultPrevented() || y._default && y._default.apply(z.pop(), d) !== !1 || !bo(k) || w && bz.isFunction(k[A]) && !bz.isWindow(k) && (u = k[w], u && (k[w] = null), bz.event.triggered = A, k[A](), bz.event.triggered = void 0, u && (k[w] = u)), a.result
            }
        },
        simulate: function(e, f, g) {
            var h = bz.extend(new bz.Event, g, {
                type: e,
                isSimulated: !0
            });
            bz.event.trigger(h, null, f), h.isDefaultPrevented() && g.preventDefault()
        }
    }), bz.fn.extend({
        trigger: function(c, d) {
            return this.each(function() {
                bz.event.trigger(c, d, this)
            })
        },
        triggerHandler: function(d, e) {
            var f = this[0];
            return f ? bz.event.trigger(d, e, f, !0) : void 0
        }
    }), bz.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(c, d) {
        bz.fn[d] = function(b, e) {
            return arguments.length > 0 ? this.on(d, null, b, e) : this.trigger(d)
        }
    }), bz.fn.extend({
        hover: function(c, d) {
            return this.mouseenter(c).mouseleave(d || c)
        }
    }), bn.focusin = "onfocusin" in ag, bn.focusin || bz.each({
        focus: "focusin",
        blur: "focusout"
    }, function(d, e) {
        var f = function(b) {
            bz.event.simulate(e, b.target, bz.event.fix(b))
        };
        bz.event.special[e] = {
            setup: function() {
                var a = this.ownerDocument || this,
                    b = bA.access(a, e);
                b || a.addEventListener(d, f, !0), bA.access(a, e, (b || 0) + 1)
            },
            teardown: function() {
                var a = this.ownerDocument || this,
                    b = bA.access(a, e) - 1;
                b ? bA.access(a, e, b) : (a.removeEventListener(d, f, !0), bA.remove(a, e))
            }
        }
    });
    var bf = ag.location,
        bl = bz.now(),
        br = /\?/;
    bz.parseJSON = function(b) {
        return JSON.parse(b + "")
    }, bz.parseXML = function(a) {
        var e;
        if (!a || "string" != typeof a) {
            return null
        }
        try {
            e = (new ag.DOMParser).parseFromString(a, "text/xml")
        } catch (f) {
            e = void 0
        }
        return e && !e.getElementsByTagName("parsererror").length || bz.error("Invalid XML: " + a), e
    };
    var bx = /#.*$/,
        bD = /([?&])_=[^&]*/,
        bJ = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        bP = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        bU = /^(?:GET|HEAD)$/,
        bZ = /^\/\//,
        b4 = {},
        b9 = {},
        cg = "*/".concat("*"),
        cl = az.createElement("a");
    cl.href = bf.href;

    function cq(b) {
        return function(a, g) {
            "string" != typeof a && (g = a, a = "*");
            var h, i = 0,
                j = a.toLowerCase().match(aS) || [];
            if (bz.isFunction(g)) {
                while (h = j[i++]) {
                    "+" === h[0] ? (h = h.slice(1) || "*", (b[h] = b[h] || []).unshift(g)) : (b[h] = b[h] || []).push(g)
                }
            }
        }
    }

    function cv(h, i, j, k) {
        var l = {},
            m = h === b9;

        function n(a) {
            var b;
            return l[a] = !0, bz.each(h[a] || [], function(c, d) {
                var e = d(i, j, k);
                return "string" != typeof e || m || l[e] ? m ? !(b = e) : void 0 : (i.dataTypes.unshift(e), n(e), !1)
            }), b
        }
        return n(i.dataTypes[0]) || !l["*"] && n("*")
    }

    function cA(f, g) {
        var h, i, j = bz.ajaxSettings.flatOptions || {};
        for (h in g) {
            void 0 !== g[h] && ((j[h] ? f : i || (i = {}))[h] = g[h])
        }
        return i && bz.extend(!0, f, i), f
    }

    function cF(j, k, l) {
        var m, n, o, p, q = j.contents,
            r = j.dataTypes;
        while ("*" === r[0]) {
            r.shift(), void 0 === m && (m = j.mimeType || k.getResponseHeader("Content-Type"))
        }
        if (m) {
            for (n in q) {
                if (q[n] && q[n].test(m)) {
                    r.unshift(n);
                    break
                }
            }
        }
        if (r[0] in l) {
            o = r[0]
        } else {
            for (n in l) {
                if (!r[0] || j.converters[n + " " + r[0]]) {
                    o = n;
                    break
                }
                p || (p = n)
            }
            o = o || p
        }
        return o ? (o !== r[0] && r.unshift(o), l[o]) : void 0
    }

    function al(m, n, o, p) {
        var q, r, s, t, u, v = {},
            w = m.dataTypes.slice();
        if (w[1]) {
            for (s in m.converters) {
                v[s.toLowerCase()] = m.converters[s]
            }
        }
        r = w.shift();
        while (r) {
            if (m.responseFields[r] && (o[m.responseFields[r]] = n), !u && p && m.dataFilter && (n = m.dataFilter(n, m.dataType)), u = r, r = w.shift()) {
                if ("*" === r) {
                    r = u
                } else {
                    if ("*" !== u && u !== r) {
                        if (s = v[u + " " + r] || v["* " + r], !s) {
                            for (q in v) {
                                if (t = q.split(" "), t[1] === r && (s = v[u + " " + t[0]] || v["* " + t[0]])) {
                                    s === !0 ? s = v[q] : v[q] !== !0 && (r = t[0], w.unshift(t[1]));
                                    break
                                }
                            }
                        }
                        if (s !== !0) {
                            if (s && m["throws"]) {
                                n = s(n)
                            } else {
                                try {
                                    n = s(n)
                                } catch (x) {
                                    return {
                                        state: "parsererror",
                                        error: s ? x : "No conversion from " + u + " to " + r
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return {
            state: "success",
            data: n
        }
    }
    bz.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: bf.href,
            type: "GET",
            isLocal: bP.test(bf.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": cg,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": bz.parseJSON,
                "text xml": bz.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(c, d) {
            return d ? cA(cA(c, bz.ajaxSettings), d) : cA(bz.ajaxSettings, c)
        },
        ajaxPrefilter: cq(b4),
        ajaxTransport: cq(b9),
        ajax: function(a, d) {
            "object" == typeof a && (d = a, a = void 0), d = d || {};
            var n, A, B, C, D, E, F, G, H = bz.ajaxSetup({}, d),
                I = H.context || H,
                J = H.context && (I.nodeType || I.jquery) ? bz(I) : bz.event,
                K = bz.Deferred(),
                L = bz.Callbacks("once memory"),
                M = H.statusCode || {},
                N = {},
                O = {},
                P = 0,
                Q = "canceled",
                R = {
                    readyState: 0,
                    getResponseHeader: function(c) {
                        var e;
                        if (2 === P) {
                            if (!C) {
                                C = {};
                                while (e = bJ.exec(B)) {
                                    C[e[1].toLowerCase()] = e[2]
                                }
                            }
                            e = C[c.toLowerCase()]
                        }
                        return null == e ? null : e
                    },
                    getAllResponseHeaders: function() {
                        return 2 === P ? B : null
                    },
                    setRequestHeader: function(e, f) {
                        var g = e.toLowerCase();
                        return P || (e = O[g] = O[g] || e, N[e] = f), this
                    },
                    overrideMimeType: function(b) {
                        return P || (H.mimeType = b), this
                    },
                    statusCode: function(c) {
                        var e;
                        if (c) {
                            if (2 > P) {
                                for (e in c) {
                                    M[e] = [M[e], c[e]]
                                }
                            } else {
                                R.always(c[R.status])
                            }
                        }
                        return this
                    },
                    abort: function(c) {
                        var e = c || Q;
                        return n && n.abort(e), T(0, e), this
                    }
                };
            if (K.promise(R).complete = L.add, R.success = R.done, R.error = R.fail, H.url = ((a || H.url || bf.href) + "").replace(bx, "").replace(bZ, bf.protocol + "//"), H.type = d.method || d.type || H.method || H.type, H.dataTypes = bz.trim(H.dataType || "*").toLowerCase().match(aS) || [""], null == H.crossDomain) {
                E = az.createElement("a");
                try {
                    E.href = H.url, E.href = E.href, H.crossDomain = cl.protocol + "//" + cl.host != E.protocol + "//" + E.host
                } catch (S) {
                    H.crossDomain = !0
                }
            }
            if (H.data && H.processData && "string" != typeof H.data && (H.data = bz.param(H.data, H.traditional)), cv(b4, H, d, R), 2 === P) {
                return R
            }
            F = bz.event && H.global, F && 0 === bz.active++ && bz.event.trigger("ajaxStart"), H.type = H.type.toUpperCase(), H.hasContent = !bU.test(H.type), A = H.url, H.hasContent || (H.data && (A = H.url += (br.test(A) ? "&" : "?") + H.data, delete H.data), H.cache === !1 && (H.url = bD.test(A) ? A.replace(bD, "" + bl++) : A + (br.test(A) ? "&" : "") + "")), H.ifModified && (bz.lastModified[A] && R.setRequestHeader("If-Modified-Since", bz.lastModified[A]), bz.etag[A] && R.setRequestHeader("If-None-Match", bz.etag[A])), (H.data && H.hasContent && H.contentType !== !1 || d.contentType) && R.setRequestHeader("Content-Type", H.contentType), R.setRequestHeader("Accept", H.dataTypes[0] && H.accepts[H.dataTypes[0]] ? H.accepts[H.dataTypes[0]] + ("*" !== H.dataTypes[0] ? ", " + cg + "; q=0.01" : "") : H.accepts["*"]);
            for (G in H.headers) {
                R.setRequestHeader(G, H.headers[G])
            }
            if (H.beforeSend && (H.beforeSend.call(I, R, H) === !1 || 2 === P)) {
                return R.abort()
            }
            Q = "abort";
            for (G in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) {
                R[G](H[G])
            }
            if (n = cv(b9, H, d, R)) {
                if (R.readyState = 1, F && J.trigger("ajaxSend", [R, H]), 2 === P) {
                    return R
                }
                H.async && H.timeout > 0 && (D = ag.setTimeout(function() {
                    R.abort("timeout")
                }, H.timeout));
                try {
                    P = 1, n.send(N, T)
                } catch (S) {
                    if (!(2 > P)) {
                        throw S
                    }
                    T(-1, S)
                }
            } else {
                T(-1, "No Transport")
            }

            function T(e, f, g, i) {
                var k, m, o, p, q, r = f;
                2 !== P && (P = 2, D && ag.clearTimeout(D), n = void 0, B = i || "", R.readyState = e > 0 ? 4 : 0, k = e >= 200 && 300 > e || 304 === e, g && (p = cF(H, R, g)), p = al(H, p, R, k), k ? (H.ifModified && (q = R.getResponseHeader("Last-Modified"), q && (bz.lastModified[A] = q), q = R.getResponseHeader("etag"), q && (bz.etag[A] = q)), 204 === e || "HEAD" === H.type ? r = "nocontent" : 304 === e ? r = "notmodified" : (r = p.state, m = p.data, o = p.error, k = !o)) : (o = r, !e && r || (r = "error", 0 > e && (e = 0))), R.status = e, R.statusText = (f || r) + "", k ? K.resolveWith(I, [m, r, R]) : K.rejectWith(I, [R, r, o]), R.statusCode(M), M = void 0, F && J.trigger(k ? "ajaxSuccess" : "ajaxError", [R, H, k ? m : o]), L.fireWith(I, [R, r]), F && (J.trigger("ajaxComplete", [R, H]), --bz.active || bz.event.trigger("ajaxStop")))
            }
            return R
        },
        getJSON: function(d, e, f) {
            return bz.get(d, e, f, "json")
        },
        getScript: function(c, d) {
            return bz.get(c, void 0, d, "script")
        }
    }), bz.each(["get", "post"], function(c, d) {
        bz[d] = function(b, f, g, h) {
            return bz.isFunction(f) && (h = h || g, g = f, f = void 0), bz.ajax(bz.extend({
                url: b,
                type: d,
                dataType: h,
                data: f,
                success: g
            }, bz.isPlainObject(b) && b))
        }
    }), bz._evalUrl = function(b) {
        return bz.ajax({
            url: b,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }, bz.fn.extend({
        wrapAll: function(c) {
            var d;
            return bz.isFunction(c) ? this.each(function(a) {
                bz(this).wrapAll(c.call(this, a))
            }) : (this[0] && (d = bz(c, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && d.insertBefore(this[0]), d.map(function() {
                var b = this;
                while (b.firstElementChild) {
                    b = b.firstElementChild
                }
                return b
            }).append(this)), this)
        },
        wrapInner: function(b) {
            return bz.isFunction(b) ? this.each(function(a) {
                bz(this).wrapInner(b.call(this, a))
            }) : this.each(function() {
                var a = bz(this),
                    d = a.contents();
                d.length ? d.wrapAll(b) : a.append(b)
            })
        },
        wrap: function(c) {
            var d = bz.isFunction(c);
            return this.each(function(a) {
                bz(this).wrapAll(d ? c.call(this, a) : c)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                bz.nodeName(this, "body") || bz(this).replaceWith(this.childNodes)
            }).end()
        }
    }), bz.expr.filters.hidden = function(b) {
        return !bz.expr.filters.visible(b)
    }, bz.expr.filters.visible = function(b) {
        return b.offsetWidth > 0 || b.offsetHeight > 0 || b.getClientRects().length > 0
    };
    var ar = /%20/g,
        ay = /\[\]$/,
        aE = /\r?\n/g,
        aK = /^(?:submit|button|image|reset|file)$/i,
        aQ = /^(?:input|select|textarea|keygen)/i;

    function aW(f, g, h, i) {
        var j;
        if (bz.isArray(g)) {
            bz.each(g, function(a, c) {
                h || ay.test(f) ? i(f, c) : aW(f + "[" + ("object" == typeof c && null != c ? a : "") + "]", c, h, i)
            })
        } else {
            if (h || "object" !== bz.type(g)) {
                i(f, g)
            } else {
                for (j in g) {
                    aW(f + "[" + j + "]", g[j], h, i)
                }
            }
        }
    }
    bz.param = function(f, g) {
        var h, i = [],
            j = function(c, d) {
                d = bz.isFunction(d) ? d() : null == d ? "" : d, i[i.length] = encodeURIComponent(c) + "=" + encodeURIComponent(d)
            };
        if (void 0 === g && (g = bz.ajaxSettings && bz.ajaxSettings.traditional), bz.isArray(f) || f.jquery && !bz.isPlainObject(f)) {
            bz.each(f, function() {
                j(this.name, this.value)
            })
        } else {
            for (h in f) {
                aW(h, f[h], g, j)
            }
        }
        return i.join("&").replace(ar, "+")
    }, bz.fn.extend({
        serialize: function() {
            return bz.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var b = bz.prop(this, "elements");
                return b ? bz.makeArray(b) : this
            }).filter(function() {
                var b = this.type;
                return this.name && !bz(this).is(":disabled") && aQ.test(this.nodeName) && !aK.test(b) && (this.checked || !cs.test(b))
            }).map(function(d, e) {
                var f = bz(this).val();
                return null == f ? null : bz.isArray(f) ? bz.map(f, function(b) {
                    return {
                        name: e.name,
                        value: b.replace(aE, "\r\n")
                    }
                }) : {
                    name: e.name,
                    value: f.replace(aE, "\r\n")
                }
            }).get()
        }
    }), bz.ajaxSettings.xhr = function() {
        try {
            return new ag.XMLHttpRequest
        } catch (a) {}
    };
    var a2 = {
            0: 200,
            1223: 204
        },
        a8 = bz.ajaxSettings.xhr();
    bn.cors = !!a8 && "withCredentials" in a8, bn.ajax = a8 = !!a8, bz.ajaxTransport(function(a) {
        var e, f;
        return bn.cors || a8 && !a.crossDomain ? {
            send: function(b, c) {
                var d, j = a.xhr();
                if (j.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields) {
                    for (d in a.xhrFields) {
                        j[d] = a.xhrFields[d]
                    }
                }
                a.mimeType && j.overrideMimeType && j.overrideMimeType(a.mimeType), a.crossDomain || b["X-Requested-With"] || (b["X-Requested-With"] = "XMLHttpRequest");
                for (d in b) {
                    j.setRequestHeader(d, b[d])
                }
                e = function(g) {
                    return function() {
                        e && (e = f = j.onload = j.onerror = j.onabort = j.onreadystatechange = null, "abort" === g ? j.abort() : "error" === g ? "number" != typeof j.status ? c(0, "error") : c(j.status, j.statusText) : c(a2[j.status] || j.status, j.statusText, "text" !== (j.responseType || "text") || "string" != typeof j.responseText ? {
                            binary: j.response
                        } : {
                            text: j.responseText
                        }, j.getAllResponseHeaders()))
                    }
                }, j.onload = e(), f = j.onerror = e("error"), void 0 !== j.onabort ? j.onabort = f : j.onreadystatechange = function() {
                    4 === j.readyState && ag.setTimeout(function() {
                        e && f()
                    })
                }, e = e("abort");
                try {
                    j.send(a.hasContent && a.data || null)
                } catch (k) {
                    if (e) {
                        throw k
                    }
                }
            },
            abort: function() {
                e && e()
            }
        } : void 0
    }), bz.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(b) {
                return bz.globalEval(b), b
            }
        }
    }), bz.ajaxPrefilter("script", function(b) {
        void 0 === b.cache && (b.cache = !1), b.crossDomain && (b.type = "GET")
    }), bz.ajaxTransport("script", function(d) {
        if (d.crossDomain) {
            var e, f;
            return {
                send: function(a, b) {
                    e = bz("<script>").prop({
                        charset: d.scriptCharset,
                        src: d.url
                    }).on("load error", f = function(c) {
                        e.remove(), f = null, c && b("error" === c.type ? 404 : 200, c.type)
                    }), az.head.appendChild(e[0])
                },
                abort: function() {
                    f && f()
                }
            }
        }
    });
    var bg = [],
        bm = /(=)\?(?=&|$)|\?\?/;
    bz.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var b = bg.pop() || bz.expando + "_" + bl++;
            return this[b] = !0, b
        }
    }), bz.ajaxPrefilter("json jsonp", function(a, i, j) {
        var k, l, m, n = a.jsonp !== !1 && (bm.test(a.url) ? "url" : "string" == typeof a.data && 0 === (a.contentType || "").indexOf("application/x-www-form-urlencoded") && bm.test(a.data) && "data");
        return n || "jsonp" === a.dataTypes[0] ? (k = a.jsonpCallback = bz.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback, n ? a[n] = a[n].replace(bm, "$1" + k) : a.jsonp !== !1 && (a.url += (br.test(a.url) ? "&" : "?") + a.jsonp + "=" + k), a.converters["script json"] = function() {
            return m || bz.error(k + " was not called"), m[0]
        }, a.dataTypes[0] = "json", l = ag[k], ag[k] = function() {
            m = arguments
        }, j.always(function() {
            void 0 === l ? bz(ag).removeProp(k) : ag[k] = l, a[k] && (a.jsonpCallback = i.jsonpCallback, bg.push(k)), m && bz.isFunction(l) && l(m[0]), m = l = void 0
        }), "script") : void 0
    }), bz.parseHTML = function(d, g, h) {
        if (!d || "string" != typeof d) {
            return null
        }
        "boolean" == typeof g && (h = g, g = !1), g = g || az;
        var i = cr.exec(d),
            j = !h && [];
        return i ? [g.createElement(i[1])] : (i = av([d], g, j), j && j.length && bz(j).remove(), bz.merge([], i.childNodes))
    };
    var bs = bz.fn.load;
    bz.fn.load = function(i, j, k) {
        if ("string" != typeof i && bs) {
            return bs.apply(this, arguments)
        }
        var l, m, n, o = this,
            p = i.indexOf(" ");
        return p > -1 && (l = bz.trim(i.slice(p)), i = i.slice(0, p)), bz.isFunction(j) ? (k = j, j = void 0) : j && "object" == typeof j && (m = "POST"), o.length > 0 && bz.ajax({
            url: i,
            type: m || "GET",
            dataType: "html",
            data: j
        }).done(function(b) {
            n = arguments, o.html(l ? bz("<div>").append(bz.parseHTML(b)).find(l) : b)
        }).always(k && function(c, d) {
            o.each(function() {
                k.apply(this, n || [c.responseText, d, c])
            })
        }), this
    }, bz.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(c, d) {
        bz.fn[d] = function(b) {
            return this.on(d, b)
        }
    }), bz.expr.filters.animated = function(b) {
        return bz.grep(bz.timers, function(a) {
            return b === a.elem
        }).length
    };

    function by(b) {
        return bz.isWindow(b) ? b : 9 === b.nodeType && b.defaultView
    }
    bz.offset = {
        setOffset: function(n, o, p) {
            var q, r, s, t, u, v, w, x = bz.css(n, "position"),
                y = bz(n),
                z = {};
            "static" === x && (n.style.position = "relative"), u = y.offset(), s = bz.css(n, "top"), v = bz.css(n, "left"), w = ("absolute" === x || "fixed" === x) && (s + v).indexOf("auto") > -1, w ? (q = y.position(), t = q.top, r = q.left) : (t = parseFloat(s) || 0, r = parseFloat(v) || 0), bz.isFunction(o) && (o = o.call(n, p, bz.extend({}, u))), null != o.top && (z.top = o.top - u.top + t), null != o.left && (z.left = o.left - u.left + r), "using" in o ? o.using.call(n, z) : y.css(z)
        }
    }, bz.fn.extend({
        offset: function(g) {
            if (arguments.length) {
                return void 0 === g ? this : this.each(function(a) {
                    bz.offset.setOffset(this, g, a)
                })
            }
            var h, i, j = this[0],
                k = {
                    top: 0,
                    left: 0
                },
                l = j && j.ownerDocument;
            if (l) {
                return h = l.documentElement, bz.contains(h, j) ? (k = j.getBoundingClientRect(), i = by(l), {
                    top: k.top + i.pageYOffset - h.clientTop,
                    left: k.left + i.pageXOffset - h.clientLeft
                }) : k
            }
        },
        position: function() {
            if (this[0]) {
                var e, f, g = this[0],
                    h = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === bz.css(g, "position") ? f = g.getBoundingClientRect() : (e = this.offsetParent(), f = this.offset(), bz.nodeName(e[0], "html") || (h = e.offset()), h.top += bz.css(e[0], "borderTopWidth", !0), h.left += bz.css(e[0], "borderLeftWidth", !0)), {
                    top: f.top - h.top - bz.css(g, "marginTop", !0),
                    left: f.left - h.left - bz.css(g, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var b = this.offsetParent;
                while (b && "static" === bz.css(b, "position")) {
                    b = b.offsetParent
                }
                return b || aI
            })
        }
    }), bz.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(d, e) {
        var f = "pageYOffset" === e;
        bz.fn[d] = function(a) {
            return bi(this, function(b, c, g) {
                var h = by(b);
                return void 0 === g ? h ? h[e] : b[c] : void(h ? h.scrollTo(f ? h.pageXOffset : g, f ? g : h.pageYOffset) : b[c] = g)
            }, d, a, arguments.length)
        }
    }), bz.each(["top", "left"], function(c, d) {
        bz.cssHooks[d] = aU(bn.pixelPosition, function(b, e) {
            return e ? (e = aO(b, d), ap.test(e) ? bz(b).position()[d] + "px" : e) : void 0
        })
    }), bz.each({
        Height: "height",
        Width: "width"
    }, function(c, d) {
        bz.each({
            padding: "inner" + c,
            content: d,
            "": "outer" + c
        }, function(a, b) {
            bz.fn[b] = function(h, i) {
                var j = arguments.length && (a || "boolean" != typeof h),
                    k = a || (h === !0 || i === !0 ? "margin" : "border");
                return bi(this, function(f, g, l) {
                    var m;
                    return bz.isWindow(f) ? f.document.documentElement["client" + c] : 9 === f.nodeType ? (m = f.documentElement, Math.max(f.body["scroll" + c], m["scroll" + c], f.body["offset" + c], m["offset" + c], m["client" + c])) : void 0 === l ? bz.css(f, g, k) : bz.style(f, g, l, k)
                }, d, j ? h : void 0, j, null)
            }
        })
    }), bz.fn.extend({
        bind: function(d, e, f) {
            return this.on(d, null, e, f)
        },
        unbind: function(c, d) {
            return this.off(c, null, d)
        },
        delegate: function(e, f, g, h) {
            return this.on(f, e, g, h)
        },
        undelegate: function(d, e, f) {
            return 1 === arguments.length ? this.off(d, "**") : this.off(e, d || "**", f)
        },
        size: function() {
            return this.length
        }
    }), bz.fn.andSelf = bz.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return bz
    });
    var bE = ag.jQuery,
        bK = ag.$;
    return bz.noConflict = function(a) {
        return ag.$ === bz && (ag.$ = bK), a && ag.jQuery === bz && (ag.jQuery = bE), bz
    }, am || (ag.jQuery = ag.$ = bz), bz
});