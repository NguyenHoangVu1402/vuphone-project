/*! jQuery Migrate v3.3.2 | (c) OpenJS Foundation and other contributors | jquery.org/license */
function r(n, t) {
    for (var i, r = 0; r < t.length; r++) i = t[r], i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(n, i.key, i)
}

function Jt(n, t, i) {
    t && r(n.prototype, t);
    i && r(n, i);
    Object.defineProperty(n, "prototype", {
        writable: !1
    })
}

function OpenWindow(n, t, i, r) {
    var u = (screen.width - t) / 2,
        f = (screen.height - i) / 2,
        e;
    winprops = "resizable=0, height=" + i + ",width=" + t + ",top=" + f + ",left=" + u + "w";
    r && (winprops += ",scrollbars=1");
    e = window.open(n, "_blank", winprops)
}

function setLocation(n) {
    window.location.href = n
}

function displayAjaxLoading(n) {
    n ? ($(".ajax-loading-block-window").show(), $("body").addClass("loading-open")) : ($("body").removeClass("loading-open"), $(".ajax-loading-block-window").hide())
}

function displayPopupNotification(n, t, i) {
    var f, r, u, e;
    if (f = t == "success" ? $("#dialog-notifications-success") : t == "error" ? $("#dialog-notifications-error") : t == "warning" ? $("#dialog-notifications-warning") : $("#dialog-notifications-success"), r = "", typeof n == "string") r = "<p>" + n + "<\/p>";
    else
        for (u = 0; u < n.length; u++) r = r + "<p>" + n[u] + "<\/p>";
    f.html(r);
    e = i ? !0 : !1;
    f.dialog({
        modal: e,
        width: 350
    })
}

function displayJoinedPopupNotifications(n) {
    var u, f, i, e, r, t;
    if (Object.keys(n).length !== 0) {
        u = $("#dialog-notifications-success");
        f = document.createElement("div");
        for (i in n)
            if (n.hasOwnProperty(i))
                for (e = n[i], r = 0; r < e.length; ++r) t = document.createElement("div"), t.innerHTML = e[r], t.classList.add("popup-notification"), t.classList.add(i), f.append(t);
        u.html(f);
        u.dialog({
            width: 350,
            modal: !0
        })
    }
}

function displayPopupContentFromUrl(n, t, i, r) {
    var u = i ? !0 : !1,
        f = r ? r : 550,
        e = $(window).height() - 20;
    $("<div><\/div>").load(n).dialog({
        modal: u,
        width: f,
        maxHeight: e,
        title: t,
        close: function() {
            $(this).dialog("destroy").remove()
        }
    })
}

function displayBarNotification(n, t, i) {
    var c, o = typeof n == "string" ? [n] : n,
        s, r, u, f, e, h;
    if (o.length !== 0) {
        for (s = ["success", "error", "warning"].indexOf(t) !== -1 ? t : "success", $("#bar-notification").removeClass("success").removeClass("error").removeClass("warning"), $(".bar-notification").remove(), r = document.createElement("div"), r.classList.add("bar-notification", s), r.classList.add(s), u = document.createElement("span"), u.classList.add("close"), u.setAttribute("title", document.getElementById("bar-notification").dataset.close), f = 0; f < o.length; f++) e = document.createElement("p"), e.classList.add("content"), e.innerHTML = o[f], r.appendChild(e);
        r.appendChild(u);
        $("#bar-notification").append(r);
        $(r).fadeIn("slow").on("mouseenter", function() {
            clearTimeout(c)
        });
        h = function() {
            $(r).remove()
        };
        $(u).on("click", function() {
            $(r).fadeOut("slow", h)
        });
        i > 0 && (c = setTimeout(function() {
            $(r).fadeOut("slow", h)
        }, i))
    }
}

function htmlEncode(n) {
    return $("<div/>").text(n).html()
}

function htmlDecode(n) {
    return $("<div/>").html(n).text()
}

function addAntiForgeryToken(n) {
    n || (n = {});
    var t = $("input[name=__RequestVerificationToken]");
    return t.length && (n.__RequestVerificationToken = t.val()), n
}

function createProductsURLBuilder(n) {
    return {
        params: {
            basePath: n,
            query: {}
        },
        addBasePath: function(n) {
            return this.params.basePath = n, this
        },
        addParameter: function(n, t) {
            return this.params.query[n] = t, this
        },
        build: function() {
            var t = $.param(this.params.query),
                n = this.params.basePath;
            return n.indexOf("?") !== -1 ? n + "&" + t : n + "?" + t
        }
    }
}
var n, t, AjaxCart, CatalogProducts;
"undefined" == typeof jQuery.migrateMute && (jQuery.migrateMute = !0),
    function(n) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], function(t) {
            return n(t, window)
        }) : "object" == typeof module && module.exports ? module.exports = n(require("jquery"), window) : n(jQuery, window)
    }(function(n, t) {
        "use strict";

        function u(t) {
            return 0 <= function(n, t) {
                for (var r = /^(\d+)\.(\d+)\.(\d+)/, u = r.exec(n) || [], f = r.exec(t) || [], i = 1; i <= 3; i++) {
                    if (+f[i] < +u[i]) return 1;
                    if (+u[i] < +f[i]) return -1
                }
                return 0
            }(n.fn.jquery, t)
        }

        function i(i) {
            var r = t.console;
            n.migrateDeduplicateWarnings && e[i] || (e[i] = !0, n.migrateWarnings.push(i), r && r.warn && !n.migrateMute && (r.warn("JQMIGRATE: " + i), n.migrateTrace && r.trace && r.trace()))
        }

        function h(n, t, r, u) {
            Object.defineProperty(n, t, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return i(u), r
                },
                set: function(n) {
                    i(u);
                    r = n
                }
            })
        }

        function r(n, t, r, u) {
            n[t] = function() {
                return i(u), r.apply(this, arguments)
            }
        }

        function l(n) {
            return n.replace(/-([a-z])/g, function(n, t) {
                return t.toUpperCase()
            })
        }

        function tt(n) {
            var i = t.document.implementation.createHTMLDocument("");
            return i.body.innerHTML = n, i.body && i.body.innerHTML
        }

        function it(n) {
            var t = n.replace(p, "<$1><\/$2>");
            t !== n && tt(n) !== tt(t) && i("HTML tags must be properly nested and closed: " + n)
        }
        var e, v, y, g, nt, f, p, rt, ut, ft, w, et, ot;
        n.migrateVersion = "3.3.2";
        t.console && t.console.log && (n && u("3.0.0") || t.console.log("JQMIGRATE: jQuery 3.0.0+ REQUIRED"), n.migrateWarnings && t.console.log("JQMIGRATE: Migrate plugin loaded multiple times"), t.console.log("JQMIGRATE: Migrate is installed" + (n.migrateMute ? "" : " with logging active") + ", version " + n.migrateVersion));
        e = {};
        n.migrateDeduplicateWarnings = !0;
        n.migrateWarnings = [];
        void 0 === n.migrateTrace && (n.migrateTrace = !0);
        n.migrateReset = function() {
            e = {};
            n.migrateWarnings.length = 0
        };
        "BackCompat" === t.document.compatMode && i("jQuery is not compatible with Quirks Mode");
        var o, b, c, k = {},
            st = n.fn.init,
            s = n.find,
            ht = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,
            ct = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g,
            lt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        for (o in n.fn.init = function(n) {
                var t = Array.prototype.slice.call(arguments);
                return "string" == typeof n && "#" === n && (i("jQuery( '#' ) is not a valid selector"), t[0] = []), st.apply(this, t)
            }, n.fn.init.prototype = n.fn, n.find = function(n) {
                var r = Array.prototype.slice.call(arguments);
                if ("string" == typeof n && ht.test(n)) try {
                    t.document.querySelector(n)
                } catch (u) {
                    n = n.replace(ct, function(n, t, i, r) {
                        return "[" + t + i + '"' + r + '"]'
                    });
                    try {
                        t.document.querySelector(n);
                        i("Attribute selector with '#' must be quoted: " + r[0]);
                        r[0] = n
                    } catch (u) {
                        i("Attribute selector with '#' was not fixed: " + r[0])
                    }
                }
                return s.apply(this, r)
            }, s) Object.prototype.hasOwnProperty.call(s, o) && (n.find[o] = s[o]);
        r(n.fn, "size", function() {
            return this.length
        }, "jQuery.fn.size() is deprecated and removed; use the .length property");
        r(n, "parseJSON", function() {
            return JSON.parse.apply(null, arguments)
        }, "jQuery.parseJSON is deprecated; use JSON.parse");
        r(n, "holdReady", n.holdReady, "jQuery.holdReady is deprecated");
        r(n, "unique", n.uniqueSort, "jQuery.unique is deprecated; use jQuery.uniqueSort");
        h(n.expr, "filters", n.expr.pseudos, "jQuery.expr.filters is deprecated; use jQuery.expr.pseudos");
        h(n.expr, ":", n.expr.pseudos, "jQuery.expr[':'] is deprecated; use jQuery.expr.pseudos");
        u("3.1.1") && r(n, "trim", function(n) {
            return null == n ? "" : (n + "").replace(lt, "")
        }, "jQuery.trim is deprecated; use String.prototype.trim");
        u("3.2.0") && (r(n, "nodeName", function(n, t) {
            return n.nodeName && n.nodeName.toLowerCase() === t.toLowerCase()
        }, "jQuery.nodeName is deprecated"), r(n, "isArray", Array.isArray, "jQuery.isArray is deprecated; use Array.isArray"));
        u("3.3.0") && (r(n, "isNumeric", function(n) {
            var t = typeof n;
            return ("number" == t || "string" == t) && !isNaN(n - parseFloat(n))
        }, "jQuery.isNumeric() is deprecated"), n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(n, t) {
            k["[object " + t + "]"] = t.toLowerCase()
        }), r(n, "type", function(n) {
            return null == n ? n + "" : "object" == typeof n || "function" == typeof n ? k[Object.prototype.toString.call(n)] || "object" : typeof n
        }, "jQuery.type is deprecated"), r(n, "isFunction", function(n) {
            return "function" == typeof n
        }, "jQuery.isFunction() is deprecated"), r(n, "isWindow", function(n) {
            return null != n && n === n.window
        }, "jQuery.isWindow() is deprecated"));
        n.ajax && (b = n.ajax, c = /(=)\?(?=&|$)|\?\?/, n.ajax = function() {
            var n = b.apply(this, arguments);
            return n.promise && (r(n, "success", n.done, "jQXHR.success is deprecated and removed"), r(n, "error", n.fail, "jQXHR.error is deprecated and removed"), r(n, "complete", n.always, "jQXHR.complete is deprecated and removed")), n
        }, u("4.0.0") || n.ajaxPrefilter("+json", function(n) {
            !1 !== n.jsonp && (c.test(n.url) || "string" == typeof n.data && 0 === (n.contentType || "").indexOf("application/x-www-form-urlencoded") && c.test(n.data)) && i("JSON-to-JSONP auto-promotion is deprecated")
        }));
        var at = n.fn.removeAttr,
            vt = n.fn.toggleClass,
            yt = /\S+/g;
        n.fn.removeAttr = function(t) {
            var r = this;
            return n.each(t.match(yt), function(t, u) {
                n.expr.match.bool.test(u) && (i("jQuery.fn.removeAttr no longer sets boolean properties: " + u), r.prop(u, !1))
            }), at.apply(this, arguments)
        };
        var d, a = !(n.fn.toggleClass = function(t) {
                return void 0 !== t && "boolean" != typeof t ? vt.apply(this, arguments) : (i("jQuery.fn.toggleClass( boolean ) is deprecated"), this.each(function() {
                    var i = this.getAttribute && this.getAttribute("class") || "";
                    i && n.data(this, "__className__", i);
                    this.setAttribute && this.setAttribute("class", !i && !1 !== t && n.data(this, "__className__") || "")
                }))
            }),
            pt = /^[a-z]/,
            wt = /^(?:Border(?:Top|Right|Bottom|Left)?(?:Width|)|(?:Margin|Padding)?(?:Top|Right|Bottom|Left)?|(?:Min|Max)?(?:Width|Height))$/;
        n.swap && n.each(["height", "width", "reliableMarginRight"], function(t, i) {
            var r = n.cssHooks[i] && n.cssHooks[i].get;
            r && (n.cssHooks[i].get = function() {
                var n;
                return a = !0, n = r.apply(this, arguments), a = !1, n
            })
        });
        n.swap = function(n, t, r, u) {
            var e, f, o = {};
            for (f in a || i("jQuery.swap() is undocumented and deprecated"), t) o[f] = n.style[f], n.style[f] = t[f];
            for (f in e = r.apply(n, u || []), t) n.style[f] = o[f];
            return e
        };
        u("3.4.0") && "undefined" != typeof Proxy && (n.cssProps = new Proxy(n.cssProps || {}, {
            set: function() {
                return i("JQMIGRATE: jQuery.cssProps is deprecated"), Reflect.set.apply(this, arguments)
            }
        }));
        n.cssNumber || (n.cssNumber = {});
        d = n.fn.css;
        n.fn.css = function(t, r) {
            var f, u, e = this;
            return t && "object" == typeof t && !Array.isArray(t) ? (n.each(t, function(t, i) {
                n.fn.css.call(e, t, i)
            }), this) : ("number" == typeof r && (f = l(t), u = f, pt.test(u) && wt.test(u[0].toUpperCase() + u.slice(1)) || n.cssNumber[f] || i('Number-typed values are deprecated for jQuery.fn.css( "' + t + '", value )')), d.apply(this, arguments))
        };
        f = n.data;
        n.data = function(t, r, u) {
            var o, s, e;
            if (r && "object" == typeof r && 2 === arguments.length) {
                for (e in o = n.hasData(t) && f.call(this, t), s = {}, r) e !== l(e) ? (i("jQuery.data() always sets/gets camelCased names: " + e), o[e] = r[e]) : s[e] = r[e];
                return f.call(this, t, s), r
            }
            return r && "string" == typeof r && r !== l(r) && (o = n.hasData(t) && f.call(this, t)) && r in o ? (i("jQuery.data() always sets/gets camelCased names: " + r), 2 < arguments.length && (o[r] = u), o[r]) : f.apply(this, arguments)
        };
        n.fx && (g = n.Tween.prototype.run, nt = function(n) {
            return n
        }, n.Tween.prototype.run = function() {
            1 < n.easing[this.easing].length && (i("'jQuery.easing." + this.easing.toString() + "' should use only one argument"), n.easing[this.easing] = nt);
            g.apply(this, arguments)
        }, v = n.fx.interval || 13, y = "jQuery.fx.interval is deprecated", t.requestAnimationFrame && Object.defineProperty(n.fx, "interval", {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return t.document.hidden || i(y), v
            },
            set: function(n) {
                i(y);
                v = n
            }
        }));
        var bt = n.fn.load,
            kt = n.event.add,
            dt = n.event.fix;
        return n.event.props = [], n.event.fixHooks = {}, h(n.event.props, "concat", n.event.props.concat, "jQuery.event.props.concat() is deprecated and removed"), n.event.fix = function(t) {
            var f, e = t.type,
                u = this.fixHooks[e],
                r = n.event.props;
            if (r.length)
                for (i("jQuery.event.props are deprecated and removed: " + r.join()); r.length;) n.event.addProp(r.pop());
            if (u && !u._migrated_ && (u._migrated_ = !0, i("jQuery.event.fixHooks are deprecated and removed: " + e), (r = u.props) && r.length))
                while (r.length) n.event.addProp(r.pop());
            return f = dt.call(this, t), u && u.filter ? u.filter(f, t) : f
        }, n.event.add = function(n, r) {
            return n === t && "load" === r && "complete" === t.document.readyState && i("jQuery(window).on('load'...) called after load event occurred"), kt.apply(this, arguments)
        }, n.each(["load", "unload", "error"], function(t, r) {
            n.fn[r] = function() {
                var n = Array.prototype.slice.call(arguments, 0);
                return "load" === r && "string" == typeof n[0] ? bt.apply(this, n) : (i("jQuery.fn." + r + "() is deprecated"), n.splice(0, 0, r), arguments.length ? this.on.apply(this, n) : (this.triggerHandler.apply(this, n), this))
            }
        }), n.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(t, r) {
            n.fn[r] = function(n, t) {
                return i("jQuery.fn." + r + "() event shorthand is deprecated"), 0 < arguments.length ? this.on(r, null, n, t) : this.trigger(r)
            }
        }), n(function() {
            n(t.document).triggerHandler("ready")
        }), n.event.special.ready = {
            setup: function() {
                this === t.document && i("'ready' event is deprecated")
            }
        }, n.fn.extend({
            bind: function(n, t, r) {
                return i("jQuery.fn.bind() is deprecated"), this.on(n, null, t, r)
            },
            unbind: function(n, t) {
                return i("jQuery.fn.unbind() is deprecated"), this.off(n, null, t)
            },
            delegate: function(n, t, r, u) {
                return i("jQuery.fn.delegate() is deprecated"), this.on(t, n, r, u)
            },
            undelegate: function(n, t, r) {
                return i("jQuery.fn.undelegate() is deprecated"), 1 === arguments.length ? this.off(n, "**") : this.off(t, n || "**", r)
            },
            hover: function(n, t) {
                return i("jQuery.fn.hover() is deprecated"), this.on("mouseenter", n).on("mouseleave", t || n)
            }
        }), p = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi, rt = n.htmlPrefilter, n.UNSAFE_restoreLegacyHtmlPrefilter = function() {
            n.htmlPrefilter = function(n) {
                return it(n), n.replace(p, "<$1><\/$2>")
            }
        }, n.htmlPrefilter = function(n) {
            return it(n), rt(n)
        }, ft = n.fn.offset, n.fn.offset = function() {
            var n = this[0];
            return !n || n.nodeType && n.getBoundingClientRect ? ft.apply(this, arguments) : (i("jQuery.fn.offset() requires a valid DOM element"), arguments.length ? this : void 0)
        }, n.ajax && (ut = n.param, n.param = function(t, r) {
            var u = n.ajaxSettings && n.ajaxSettings.traditional;
            return void 0 === r && u && (i("jQuery.param() no longer uses jQuery.ajaxSettings.traditional"), r = u), ut.call(this, t, r)
        }), ot = n.fn.andSelf || n.fn.addBack, n.fn.andSelf = function() {
            return i("jQuery.fn.andSelf() is deprecated and removed, use jQuery.fn.addBack()"), ot.apply(this, arguments)
        }, n.Deferred && (w = n.Deferred, et = [
            ["resolve", "done", n.Callbacks("once memory"), n.Callbacks("once memory"), "resolved"],
            ["reject", "fail", n.Callbacks("once memory"), n.Callbacks("once memory"), "rejected"],
            ["notify", "progress", n.Callbacks("memory"), n.Callbacks("memory")]
        ], n.Deferred = function(t) {
            var r = w(),
                u = r.promise();
            return r.pipe = u.pipe = function() {
                var t = arguments;
                return i("deferred.pipe() is deprecated"), n.Deferred(function(i) {
                    n.each(et, function(n, f) {
                        var e = "function" == typeof t[n] && t[n];
                        r[f[1]](function() {
                            var n = e && e.apply(this, arguments);
                            n && "function" == typeof n.promise ? n.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[f[0] + "With"](this === u ? i.promise() : this, e ? [n] : arguments)
                        })
                    });
                    t = null
                }).promise()
            }, t && t.call(r, r), r
        }, n.Deferred.exceptionHook = w.exceptionHook), n
    });
/*!
 * Splide.js
 * Version  : 4.1.4
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
n = this;
t = function() {
    "use strict";

    function y(n) {
        n.length = 0
    }

    function d(n, t, i) {
        return Array.prototype.slice.call(n, t, i)
    }

    function t(n) {
        return n.bind.apply(n, [null].concat(d(arguments, 1)))
    }

    function sr() {}

    function vu(n) {
        return requestAnimationFrame(n)
    }

    function wi(n, t) {
        return typeof t === n
    }

    function dt(n) {
        return !cr(n) && wi("object", n)
    }

    function cr(n) {
        return null === n
    }

    function pu(n) {
        try {
            return n instanceof(n.ownerDocument.defaultView || window).HTMLElement
        } catch (n) {
            return !1
        }
    }

    function ni(n) {
        return hr(n) ? n : [n]
    }

    function o(n, t) {
        ni(n).forEach(t)
    }

    function lr(n, t) {
        return -1 < n.indexOf(t)
    }

    function bi(n, t) {
        return n.push.apply(n, ni(t)), n
    }

    function p(n, t, i) {
        n && o(t, function(t) {
            t && n.classList[i ? "add" : "remove"](t)
        })
    }

    function a(n, t) {
        p(n, g(t) ? t.split(" ") : t, !0)
    }

    function ti(n, t) {
        o(t, n.appendChild.bind(n))
    }

    function ar(n, t) {
        o(n, function(n) {
            var i = (t || n).parentNode;
            i && i.insertBefore(n, t)
        })
    }

    function ii(n, t) {
        return pu(n) && (n.msMatchesSelector || n.matches).call(n, t)
    }

    function wu(n, t) {
        return n = n ? d(n.children) : [], t ? n.filter(function(n) {
            return ii(n, t)
        }) : n
    }

    function ri(n, t) {
        return t ? wu(n, t)[0] : n.firstElementChild
    }

    function rt(n, t, i) {
        n && (i ? ui(n).reverse() : ui(n)).forEach(function(i) {
            "__proto__" !== i && t(n[i], i)
        })
    }

    function fi(n) {
        return d(arguments, 1).forEach(function(t) {
            rt(t, function(i, r) {
                n[r] = t[r]
            })
        }), n
    }

    function nt(n) {
        return d(arguments, 1).forEach(function(t) {
            rt(t, function(t, i) {
                n[i] = hr(t) ? t.slice() : dt(t) ? nt({}, dt(n[i]) ? n[i] : {}, t) : t
            })
        }), n
    }

    function bu(n, t) {
        o(t || ui(n), function(t) {
            delete n[t]
        })
    }

    function v(n, t) {
        o(n, function(n) {
            o(t, function(t) {
                n && n.removeAttribute(t)
            })
        })
    }

    function n(t, i, r) {
        dt(i) ? rt(i, function(i, r) {
            n(t, r, i)
        }) : o(t, function(n) {
            cr(r) || "" === r ? v(n, i) : n.setAttribute(i, String(r))
        })
    }

    function ht(t, i, r) {
        return t = document.createElement(t), i && (g(i) ? a : n)(t, i), r && ti(r, t), t
    }

    function c(n, t, i) {
        if (gt(i)) return getComputedStyle(n)[t];
        cr(i) || (n.style[t] = "" + i)
    }

    function ei(n, t) {
        c(n, "display", t)
    }

    function ku(n) {
        n.setActive && n.setActive() || n.focus({
            preventScroll: !0
        })
    }

    function l(n, t) {
        return n.getAttribute(t)
    }

    function du(n, t) {
        return n && n.classList.contains(t)
    }

    function s(n) {
        return n.getBoundingClientRect()
    }

    function ut(n) {
        o(n, function(n) {
            n && n.parentNode && n.parentNode.removeChild(n)
        })
    }

    function gu(n) {
        return ri((new DOMParser).parseFromString(n, "text/html").body)
    }

    function w(n, t) {
        n.preventDefault();
        t && (n.stopPropagation(), n.stopImmediatePropagation())
    }

    function nf(n, t) {
        return n && n.querySelector(t)
    }

    function vr(n, t) {
        return t ? d(n.querySelectorAll(t)) : []
    }

    function b(n, t) {
        p(n, t, !1)
    }

    function yr(n) {
        return n.timeStamp
    }

    function ft(n) {
        return g(n) ? n : n ? n + "px" : ""
    }

    function si(n, t) {
        if (!n) throw new Error("[" + oi + "] " + (t || ""));
    }

    function tf(n, t, i) {
        return f(n - t) < i
    }

    function gi(n, t, i, r) {
        var u = tt(t, i),
            t = ki(t, i);
        return r ? u < n && n < t : u <= n && n <= t
    }

    function ct(n, t, i) {
        var r = tt(t, i),
            t = ki(t, i);
        return tt(ki(r, n), t)
    }

    function wr(n) {
        return (0 < n) - (n < 0)
    }

    function br(n, t) {
        return o(t, function(t) {
            n = n.replace("%s", "" + t)
        }), n
    }

    function kr(n) {
        return n < 10 ? "0" + n : "" + n
    }

    function uf() {
        function t(n, t, i) {
            o(n, function(n) {
                n && o(t, function(t) {
                    t.split(" ").forEach(function(t) {
                        t = t.split(".");
                        i(n, t[0], t[1])
                    })
                })
            })
        }
        var n = [];
        return {
            bind: function(i, r, u, f) {
                t(i, r, function(t, i, r) {
                    var e = "addEventListener" in t,
                        o = e ? t.removeEventListener.bind(t, i, u, f) : t.removeListener.bind(t, u);
                    e ? t.addEventListener(i, u, f) : t.addListener(u);
                    n.push([t, i, r, u, o])
                })
            },
            unbind: function(i, r, u) {
                t(i, r, function(t, i, r) {
                    n = n.filter(function(n) {
                        return !!(n[0] !== t || n[1] !== i || n[2] !== r || u && n[3] !== u) || (n[4](), !1)
                    })
                })
            },
            dispatch: function(n, t, i) {
                var r;
                return "function" == typeof CustomEvent ? r = new CustomEvent(t, {
                    bubbles: !0,
                    detail: i
                }) : (r = document.createEvent("CustomEvent")).initCustomEvent(t, !0, !1, i), n.dispatchEvent(r), r
            },
            destroy: function() {
                n.forEach(function(n) {
                    n[4]()
                });
                y(n)
            }
        }
    }

    function i(n) {
        var r = n ? n.event.bus : document.createDocumentFragment(),
            i = uf();
        return n && n.event.on(ef, i.destroy), fi(i, {
            bus: r,
            on: function(n, t) {
                i.bind(r, ni(n).join(" "), function(n) {
                    t.apply(t, hr(n.detail) ? n.detail : [])
                })
            },
            off: t(i.unbind, r),
            emit: function(n) {
                i.dispatch(r, n, d(arguments, 1))
            }
        })
    }

    function nr(n, t, i, r) {
        function h() {
            if (!e) {
                if (u = n ? tt((s() - o) / n, 1) : 1, i && i(u), 1 <= u && (t(), o = s(), r && ++a >= r)) return c();
                f = vu(h)
            }
        }

        function c() {
            e = !0
        }

        function l() {
            f && cancelAnimationFrame(f);
            e = !(f = u = 0)
        }
        var o, f, s = Date.now,
            u = 0,
            e = !0,
            a = 0;
        return {
            start: function(t) {
                t || l();
                o = s() - (t ? u * n : 0);
                e = !1;
                f = vu(h)
            },
            rewind: function() {
                o = s();
                u = 0;
                i && i(u)
            },
            pause: c,
            cancel: l,
            set: function(t) {
                n = t
            },
            isPaused: function() {
                return e
            }
        }
    }

    function pe(n) {
        var t = n;
        return {
            set: function(n) {
                t = n
            },
            is: function(n) {
                return lr(ni(n), t)
            }
        }
    }

    function to(r, u, e, o) {
        function ui() {
            var t = r.splides.map(function(n) {
                return n = n.splide.Components.Slides.getAt(u), n ? n.slide.id : ""
            }).join(" ");
            n(o, h, br(ft.slideX, (y ? e : u) + 1));
            n(o, ai, t);
            n(o, k, et ? "button" : "");
            et && v(o, vi)
        }

        function fi() {
            nt || ht()
        }

        function ht() {
            var f, i, t;
            nt || (f = r.index, (t = ct()) !== du(o, ot) && (p(o, ot, t), n(o, yf, gt && t || ""), g(t ? le : ae, w)), t = function() {
                if (r.is(yi)) return ct();
                var n = s(ut.Elements.track),
                    t = s(o),
                    i = vt("left", !0),
                    u = vt("right", !0);
                return di(n[i]) <= hi(t[i]) && di(t[u]) <= hi(n[u])
            }(), i = !t && (!ct() || y), r.state.is([st, kt]) || n(o, wf, i || ""), n(vr(o, a.focusableNodes || ""), yt, i ? -1 : ""), et && n(o, yt, i ? -1 : 0), t !== du(o, eu) && (p(o, eu, t), g(t ? ve : ye, w)), t || document.activeElement !== o || (i = ut.Slides.getAt(r.index)) && ku(i.slide), p(o, ue, u === f - 1), p(o, fe, u === f + 1))
        }

        function ct() {
            var n = r.index;
            return n === u || a.cloneStatus && n === e
        }
        var nt, d = i(r),
            rt = d.on,
            g = d.emit,
            at = d.bind,
            ut = r.Components,
            dt = r.root,
            a = r.options,
            gt = a.isNavigation,
            ni = a.updateOnMove,
            ft = a.i18n,
            ti = a.pagination,
            et = a.slideFocus,
            vt = ut.Direction.resolve,
            ii = l(o, "style"),
            pt = l(o, h),
            y = -1 < e,
            bt = ri(o, "." + be),
            w = {
                index: u,
                slideIndex: e,
                slide: o,
                container: bt,
                isClone: y,
                mount: function() {
                    y || (o.id = dt.id + "-slide" + kr(u + 1), n(o, k, ti ? "tabpanel" : "group"), n(o, vi, ft.slide), n(o, h, pt || br(ft.slideLabel, [u + 1, r.length])));
                    at(o, "click", t(g, ff, w));
                    at(o, "keydown", t(g, af, w));
                    rt([ci, vf, lt], ht);
                    rt(sf, ui);
                    ni && rt(it, fi)
                },
                destroy: function() {
                    nt = !0;
                    d.destroy();
                    b(o, no);
                    v(o, ru);
                    n(o, "style", ii);
                    n(o, h, pt || "")
                },
                update: ht,
                style: function(n, t, i) {
                    c(i && bt || o, n, t)
                },
                isWithin: function(n, t) {
                    return n = f(n - u), (n = y || !a.rewind && !r.is(wt) ? n : tt(n, r.length - n)) <= t
                }
            };
        return w
    }

    function cu(n) {
        return n = g(n) ? n : n.key, ro[n] || n
    }

    function so(n, t, r) {
        function e() {
            f.forEach(function(n) {
                n.style("transform", "translateX(-" + 100 * n.index + "%)")
            })
        }
        var f = t.Slides;
        return {
            mount: function() {
                i(n).on([et, u], e)
            },
            start: function(n, t) {
                f.style("transition", "opacity " + r.speed + "ms " + r.easing);
                au(t)
            },
            cancel: sr
        }
    }

    function ho(n, r, u) {
        function v() {
            a("");
            l.cancel()
        }
        var o, e = r.Move,
            h = r.Controller,
            l = r.Scroll,
            s = r.Elements.list,
            a = t(c, s, "transition");
        return {
            mount: function() {
                i(n).bind(s, "transitionend", function(n) {
                    n.target === s && o && (v(), o())
                })
            },
            start: function(t, i) {
                var r = e.toPosition(t, !0),
                    c = e.getPosition(),
                    s = function(t) {
                        var f = u.rewindSpeed,
                            i, r;
                        return n.is(pt) && f && (i = h.getIndex(!0), r = h.getEnd(), 0 === i && r <= t || r <= i && 0 === t) ? f : u.speed
                    }(t);
                1 <= f(r - c) && 1 <= s ? u.useScroll ? l.scroll(r, s, !1, i) : (a("transform " + s + "ms " + u.easing), e.translate(r, !0), o = i) : (e.jump(t), i())
            },
            cancel: v
        }
    }
    var lu = "(prefers-reduced-motion: reduce)",
        st = 4,
        kt = 5,
        ce = {
            CREATED: 1,
            MOUNTED: 2,
            IDLE: 3,
            MOVING: st,
            SCROLLING: kt,
            DRAGGING: 6,
            DESTROYED: 7
        },
        au = setTimeout,
        hr = Array.isArray,
        yu = t(wi, "function"),
        g = t(wi, "string"),
        gt = t(wi, "undefined"),
        ui = Object.keys,
        oi = "splide",
        pr = "data-" + oi,
        tt = Math.min,
        ki = Math.max,
        di = Math.floor,
        hi = Math.ceil,
        f = Math.abs,
        rf = {},
        et = "mounted",
        it = "move",
        ci = "moved",
        ff = "click",
        le = "active",
        ae = "inactive",
        ve = "visible",
        ye = "hidden",
        u = "refresh",
        e = "updated",
        li = "resize",
        dr = "resized",
        gr = "scroll",
        lt = "scrolled",
        ef = "destroy",
        sf = "navigation:mounted",
        hf = "autoplay:play",
        cf = "autoplay:pause",
        lf = "lazyload:loaded",
        af = "sk",
        vf = "sh",
        at = "Arrow",
        tr = at + "Left",
        ir = at + "Right",
        vt = at + "Up",
        at = at + "Down",
        rr = "ttb",
        nu = {
            width: ["height"],
            left: ["top", "right"],
            right: ["bottom", "left"],
            x: ["y"],
            X: ["Y"],
            Y: ["X"],
            ArrowLeft: [vt, ir],
            ArrowRight: [at, tr]
        },
        k = "role",
        yt = "tabindex",
        r = "aria-",
        ai = r + "controls",
        yf = r + "current",
        pf = r + "selected",
        h = r + "label",
        tu = r + "labelledby",
        wf = r + "hidden",
        iu = r + "orientation",
        vi = r + "roledescription",
        bf = r + "live",
        kf = r + "busy",
        df = r + "atomic",
        ru = [k, yt, "disabled", ai, yf, h, tu, wf, iu, vi],
        r = oi + "__",
        uu = oi,
        gf = r + "track",
        we = r + "list",
        ur = r + "slide",
        ne = ur + "--clone",
        be = ur + "__container",
        fu = r + "arrows",
        fr = r + "arrow",
        te = fr + "--prev",
        ie = fr + "--next",
        er = r + "pagination",
        re = er + "__page",
        ke = r + "progress__bar",
        de = r + "toggle",
        ge = r + "sr",
        ot = "is-active",
        ue = "is-prev",
        fe = "is-next",
        eu = "is-visible",
        ou = "is-loading",
        ee = "is-focus-in",
        oe = "is-overflow",
        no = [ot, eu, ue, fe, ou, ee, oe],
        se = "touchstart mousedown",
        su = "touchmove mousemove",
        hu = "touchend touchcancel mouseup click",
        pt = "slide",
        wt = "loop",
        yi = "fade",
        io = pr + "-interval",
        bt = {
            passive: !1,
            capture: !0
        },
        ro = {
            Spacebar: " ",
            Right: ir,
            Left: tr,
            Up: vt,
            Down: at
        },
        he = "keydown",
        pi = pr + "-lazy",
        or = pi + "-srcset",
        uo = "[" + pi + "], [" + or + "]",
        fo = [" ", "Enter"],
        eo = Object.freeze({
            __proto__: null,
            Media: function(n, t, i) {
                function h(n) {
                    n && o.destroy()
                }

                function c(n, t) {
                    t = matchMedia(t);
                    o.bind(t, "change", l);
                    s.push([n, t])
                }

                function l() {
                    var t = u.is(7),
                        r = i.direction,
                        f = s.reduce(function(n, t) {
                            return nt(n, t[1].matches ? t[0] : {})
                        }, {});
                    bu(i);
                    a(f);
                    i.destroy ? n.destroy("completely" === i.destroy) : t ? (h(!0), n.mount()) : r !== i.direction && n.refresh()
                }

                function a(t, r, f) {
                    nt(i, t);
                    r && nt(Object.getPrototypeOf(i), t);
                    !f && u.is(1) || n.emit(e, i)
                }
                var u = n.state,
                    f = i.breakpoints || {},
                    r = i.reducedMotion || {},
                    o = uf(),
                    s = [];
                return {
                    setup: function() {
                        var n = "min" === i.mediaQuery;
                        ui(f).sort(function(t, i) {
                            return n ? +t - +i : +i - +t
                        }).forEach(function(t) {
                            c(f[t], "(" + (n ? "min" : "max") + "-width:" + t + "px)")
                        });
                        c(r, lu);
                        l()
                    },
                    destroy: h,
                    reduce: function(n) {
                        matchMedia(lu).matches && (n ? nt(i, r) : bu(i, ui(r)))
                    },
                    set: a
                }
            },
            Direction: function(n, t, i) {
                return {
                    resolve: function(n, t, r) {
                        var u = "rtl" !== (r = r || i.direction) || t ? r === rr ? 0 : -1 : 1;
                        return nu[n] && nu[n][u] || n.replace(/width|left|right/i, function(n, t) {
                            return n = nu[n.toLowerCase()][u] || n, 0 < t ? n.charAt(0).toUpperCase() + n.slice(1) : n
                        })
                    },
                    orient: function(n) {
                        return n * ("rtl" === i.direction ? 1 : -1)
                    }
                }
            },
            Elements: function(t, r, f) {
                function et() {
                    s = ct("." + gf);
                    c = ri(s, "." + we);
                    si(s && c, "A track/list element is missing.");
                    bi(tt, wu(c, "." + ur + ":not(." + ne + ")"));
                    rt({
                        arrows: fu,
                        pagination: er,
                        prev: te,
                        next: ie,
                        bar: ke,
                        toggle: de
                    }, function(n, t) {
                        nt[t] = ct("." + n)
                    });
                    fi(nt, {
                        root: o,
                        track: s,
                        list: c,
                        slides: tt
                    });
                    var t = o.id || function(n) {
                            return "" + n + kr(rf[n] = (rf[n] || 0) + 1)
                        }(oi),
                        i = f.role;
                    o.id = t;
                    s.id = s.id || t + "-track";
                    c.id = c.id || t + "-list";
                    !l(o, k) && "SECTION" !== o.tagName && i && n(o, k, i);
                    n(o, vi, at.carousel);
                    n(c, k, "presentation");
                    ht()
                }

                function st(n) {
                    var t = ru.concat("style");
                    y(tt);
                    b(o, w);
                    b(s, d);
                    v([s, c], t);
                    v(o, n ? t : ["style", vi])
                }

                function ht() {
                    b(o, w);
                    b(s, d);
                    w = lt(uu);
                    d = lt(gf);
                    a(o, w);
                    a(s, d);
                    n(o, h, f.label);
                    n(o, tu, f.labelledby)
                }

                function ct(n) {
                    return n = nf(o, n), n && function(n, t) {
                        if (yu(n.closest)) return n.closest(t);
                        for (var i = n; i && 1 === i.nodeType && !ii(i, t);) i = i.parentElement;
                        return i
                    }(n, "." + uu) === o ? n : void 0
                }

                function lt(n) {
                    return [n + "--" + f.type, n + "--" + f.direction, f.drag && n + "--draggable", f.isNavigation && n + "--nav", n === uu && ot]
                }
                var s, c, it, ut = i(t),
                    g = ut.on,
                    ft = ut.bind,
                    o = t.root,
                    at = f.i18n,
                    nt = {},
                    tt = [],
                    w = [],
                    d = [];
                return fi(nt, {
                    setup: et,
                    mount: function() {
                        g(u, st);
                        g(u, et);
                        g(e, ht);
                        ft(document, se + " keydown", function(n) {
                            it = "keydown" === n.type
                        }, {
                            capture: !0
                        });
                        ft(o, "focusin", function() {
                            p(o, ee, !!it)
                        })
                    },
                    destroy: st
                })
            },
            Slides: function(n, r, f) {
                function w() {
                    v.forEach(function(n, t) {
                        k(n, t, -1)
                    })
                }

                function b() {
                    c(function(n) {
                        n.destroy()
                    });
                    y(e)
                }

                function k(t, i, r) {
                    i = to(n, i, r, t);
                    i.mount();
                    e.push(i);
                    e.sort(function(n, t) {
                        return n.index - t.index
                    })
                }

                function d(n) {
                    return n ? h(function(n) {
                        return !n.isClone
                    }) : e
                }

                function c(n, t) {
                    d(t).forEach(n)
                }

                function h(n) {
                    return e.filter(yu(n) ? n : function(t) {
                        return g(n) ? ii(t.slide, n) : lr(ni(n), t.index)
                    })
                }
                var s = i(n),
                    p = s.on,
                    l = s.emit,
                    nt = s.bind,
                    v = (s = r.Elements).slides,
                    tt = s.list,
                    e = [];
                return {
                    mount: function() {
                        w();
                        p(u, b);
                        p(u, w)
                    },
                    destroy: b,
                    update: function() {
                        c(function(n) {
                            n.update()
                        })
                    },
                    register: k,
                    get: d,
                    getIn: function(n) {
                        var t = r.Controller,
                            i = t.toIndex(n),
                            u = t.hasFocus() ? 1 : f.perPage;
                        return h(function(n) {
                            return gi(n.index, i, i + u - 1)
                        })
                    },
                    getAt: function(n) {
                        return h(n)[0]
                    },
                    add: function(n, i) {
                        o(n, function(n) {
                            var r, u, e;
                            pu(n = g(n) ? gu(n) : n) && ((r = v[i]) ? ar(n, r) : ti(tt, n), a(n, f.classes.slide), r = n, u = t(l, li), r = vr(r, "img"), (e = r.length) ? r.forEach(function(n) {
                                nt(n, "load error", function() {
                                    --e || u()
                                })
                            }) : u())
                        });
                        l(u)
                    },
                    remove: function(n) {
                        ut(h(n).map(function(n) {
                            return n.slide
                        }));
                        l(u)
                    },
                    forEach: c,
                    filter: h,
                    style: function(n, t, i) {
                        c(function(r) {
                            r.style(n, t, i)
                        })
                    },
                    getLength: function(n) {
                        return (n ? v : e).length
                    },
                    isEnough: function() {
                        return e.length > f.perPage
                    }
                }
            },
            Layout: function(n, r, o) {
                function et() {
                    a = o.direction === rr;
                    c(d, "maxWidth", ft(o.width));
                    c(y, h("paddingLeft"), w(!1));
                    c(y, h("paddingRight"), w(!0));
                    it(!0)
                }

                function it(n) {
                    var t = s(d);
                    (n || b.width !== t.width || b.height !== t.height) && (c(y, "height", function() {
                        var n = "";
                        return a && (si(n = ot(), "height or heightRatio is missing."), n = "calc(" + n + " - " + w(!1) + " - " + w(!0) + ")"), n
                    }()), tt(h("marginRight"), ft(o.gap)), tt("width", o.autoWidth ? null : ft(o.fixedWidth) || (a ? "" : st())), tt("height", ft(o.fixedHeight) || (a ? o.autoHeight ? null : st() : ot()), !0), b = t, k(dr), v !== (v = vt()) && (p(d, oe, v), k("overflow", v)))
                }

                function w(n) {
                    var t = o.padding,
                        n = h(n ? "right" : "left");
                    return t && ft(t[n] || (dt(t) ? 0 : t)) || "0px"
                }

                function ot() {
                    return ft(o.height || s(g).width * o.heightRatio)
                }

                function st() {
                    var n = ft(o.gap);
                    return "calc((100%" + (n && " + " + n) + ")/" + (o.perPage || 1) + (n && " - " + n) + ")"
                }

                function ht() {
                    return s(g)[h("width")]
                }

                function ct(n, t) {
                    return n = nt(n || 0), n ? s(n.slide)[h("width")] + (t ? 0 : at()) : 0
                }

                function rt(n, t) {
                    var i, n = nt(n);
                    return n ? (n = s(n.slide)[h("right")], i = s(g)[h("left")], f(n - i) + (t ? 0 : at())) : 0
                }

                function lt(t) {
                    return rt(n.length - 1) - rt(0) + ct(0, t)
                }

                function at() {
                    var n = nt(0);
                    return n && parseFloat(c(n.slide, h("marginRight"))) || 0
                }

                function vt() {
                    return n.is(yi) || lt(!0) > ht()
                }
                var a, b, v, ut = (l = i(n)).on,
                    yt = l.bind,
                    k = l.emit,
                    l = r.Slides,
                    h = r.Direction.resolve,
                    d = (r = r.Elements).root,
                    y = r.track,
                    g = r.list,
                    nt = l.getAt,
                    tt = l.style;
                return {
                    mount: function() {
                        var i, r, n;
                        et();
                        yt(window, "resize load", (i = t(k, li), n = nr(r || 0, i, null, 1), function() {
                            n.isPaused() && n.start()
                        }));
                        ut([e, u], et);
                        ut(li, it)
                    },
                    resize: it,
                    listSize: ht,
                    slideSize: ct,
                    sliderSize: lt,
                    totalSize: rt,
                    getPadding: function(n) {
                        return parseFloat(c(y, h("padding" + (n ? "Right" : "Left")))) || 0
                    },
                    isOverflow: vt
                }
            },
            Clones: function(n, t, r) {
                function w() {
                    if (l(u, d), l([e, li], g), f = k()) {
                        var o = f,
                            i = p.get().slice(),
                            s = i.length;
                        if (s) {
                            for (; i.length < o;) bi(i, i);
                            bi(i.slice(-o), i.slice(0, o)).forEach(function(t, u) {
                                var e = u < o,
                                    f = function(t, i) {
                                        return t = t.cloneNode(!0), a(t, r.classes.clone), t.id = n.root.id + "-clone" + kr(i + 1), t
                                    }(t.slide, u);
                                e ? ar(f, i[0].slide) : ti(v.list, f);
                                bi(c, f);
                                p.register(f, u - o + (e ? 0 : s), t.index)
                            })
                        }
                        t.Layout.resize(!0)
                    }
                }

                function d() {
                    b();
                    w()
                }

                function b() {
                    ut(c);
                    y(c);
                    o.destroy()
                }

                function g() {
                    var n = k();
                    f !== n && (f < n || !n) && o.emit(u)
                }

                function k() {
                    var u, i = r.clones;
                    return n.is(wt) ? gt(i) && (i = (u = r[h("fixedWidth")] && t.Layout.slideSize(0)) && hi(s(v.track)[h("width")] / u) || r[h("autoWidth")] && n.length || 2 * r.perPage) : i = 0, i
                }
                var f, o = i(n),
                    l = o.on,
                    v = t.Elements,
                    p = t.Slides,
                    h = t.Direction.resolve,
                    c = [];
                return {
                    mount: w,
                    destroy: b
                }
            },
            Move: function(n, t, r) {
                function ft() {
                    t.Controller.isBusy() || (t.Scroll.cancel(), ot(n.index), t.Slides.update())
                }

                function ot(n) {
                    v(p(n, !0))
                }

                function v(i, r) {
                    n.is(yi) || (r = r ? i : function(i) {
                        var r, u;
                        return n.is(wt) && (r = lt(i), u = r > t.Controller.getEnd(), (r < 0 || u) && (i = y(i, u))), i
                    }(i), c(d, "transform", "translate" + a("X") + "(" + r + "px)"), i !== r && k(vf))
                }

                function y(n, t) {
                    var r = n - w(t),
                        i = rt();
                    return n - h(i * (hi(f(r) / i) || 1)) * (t ? 1 : -1)
                }

                function ht() {
                    v(l(), !0);
                    b.cancel()
                }

                function lt(n) {
                    for (var r, u, e = t.Slides.get(), o = 0, s = 1 / 0, i = 0; i < e.length; i++) {
                        if (r = e[i].index, u = f(p(r, !0) - n), !(u <= s)) break;
                        s = u;
                        o = r
                    }
                    return o
                }

                function p(t, i) {
                    var u = h(yt(t - 1) - (t = t, "center" === (u = r.focus) ? (tt() - nt(t, !0)) / 2 : +u * nt(t) || 0));
                    return i ? (t = u, t = r.trimSpace && n.is(pt) ? ct(t, 0, h(rt(!0) - tt())) : t) : u
                }

                function l() {
                    var n = a("left");
                    return s(d)[n] - s(ut)[n] + h(vt(!1))
                }

                function w(n) {
                    return p(n ? t.Controller.getEnd() : 0, !!r.trimSpace)
                }
                var b, o = i(n),
                    at = o.on,
                    k = o.emit,
                    g = n.state.set,
                    nt = (o = t.Layout).slideSize,
                    vt = o.getPadding,
                    yt = o.totalSize,
                    tt = o.listSize,
                    rt = o.sliderSize,
                    a = (o = t.Direction).resolve,
                    h = o.orient,
                    d = (o = t.Elements).list,
                    ut = o.track;
                return {
                    mount: function() {
                        b = t.Transition;
                        at([et, dr, e, u], ft)
                    },
                    move: function(n, t, i, r) {
                        var u, f;
                        n !== t && (u = i < n, f = h(y(l(), u)), u ? 0 <= f : f <= d[a("scrollWidth")] - s(ut)[a("width")]) && (ht(), v(y(l(), i < n), !0));
                        g(st);
                        k(it, t, i, n);
                        b.start(t, function() {
                            g(3);
                            k(ci, t, i, n);
                            r && r()
                        })
                    },
                    jump: ot,
                    translate: v,
                    shift: y,
                    cancel: ht,
                    toIndex: lt,
                    toPosition: p,
                    getPosition: l,
                    getLimit: w,
                    exceededLimit: function(n, t) {
                        t = gt(t) ? l() : t;
                        var i = !0 !== n && h(t) < h(w(!1)),
                            n = !1 !== n && h(t) > h(w(!0));
                        return i || n
                    },
                    reposition: ft
                }
            },
            Controller: function(n, r, f) {
                function vt() {
                    h = ii(!0);
                    v = f.perMove;
                    c = f.perPage;
                    s = ft();
                    var n = ct(o, 0, d ? s : h - 1);
                    n !== o && (o = n, l.reposition())
                }

                function ri() {
                    s !== ft() && dt("ei")
                }

                function rt(n, t) {
                    var i = v || (a() ? 1 : c),
                        i = yt(o + i * (n ? -1 : 1), o, !(v || a()));
                    return -1 === i && nt && !tf(b(), ni(!n), 1) ? n ? 0 : s : t ? i : ut(i)
                }

                function yt(t, i, r) {
                    var u;
                    return ti() || a() ? ((u = function(t) {
                        if (nt && "move" === f.trimSpace && t !== o)
                            for (var i = b(); i === k(t, !0) && gi(t, 0, n.length - 1, !f.rewind);) t < o ? --t : ++t;
                        return t
                    }(t)) !== t && (i = t, t = u, r = !1), t < 0 || s < t ? t = v || !gi(0, t, i, !0) && !gi(s, i, t, !0) ? p ? r ? t < 0 ? -(h % c || c) : h : t : f.rewind ? t < 0 ? s : 0 : -1 : w(et(t)) : r && t !== i && (t = w(et(i) + (t < i ? -1 : 1)))) : t = -1, t
                }

                function ut(n) {
                    return p ? (n + h) % h || 0 : n
                }

                function ft() {
                    for (var n = h - (a() || p && v ? 1 : c); d && 0 < n--;)
                        if (k(h - 1, !0) !== k(n, !0)) {
                            n++;
                            break
                        }
                    return ct(n, 0, h - 1)
                }

                function w(n) {
                    return ct(a() ? n : c * n, 0, s)
                }

                function et(n) {
                    return a() ? tt(n, s) : di((s <= n ? h - 1 : n) / c)
                }

                function ot(n) {
                    n !== o && (it = o, o = n)
                }

                function a() {
                    return !gt(f.focus) || f.isNavigation
                }

                function bt() {
                    return n.state.is([st, kt]) && !!f.waitForTransition
                }
                var s, h, v, c, y = i(n),
                    ht = y.on,
                    dt = y.emit,
                    l = r.Move,
                    b = l.getPosition,
                    ni = l.getLimit,
                    k = l.toPosition,
                    ti = (y = r.Slides).isEnough,
                    ii = y.getLength,
                    d = f.omitEnd,
                    p = n.is(wt),
                    nt = n.is(pt),
                    lt = t(rt, !1),
                    at = t(rt, !0),
                    o = f.start || 0,
                    it = o;
                return {
                    mount: function() {
                        vt();
                        ht([e, u, "ei"], vt);
                        ht(dr, ri)
                    },
                    go: function(n, t, i) {
                        var r;
                        bt() || -1 < (r = ut(n = function(n) {
                            var r = o,
                                i, t;
                            return g(n) ? (t = n.match(/([+\-<>])(\d+)?/) || [], i = t[1], t = t[2], "+" === i || "-" === i ? r = yt(o + +("" + i + (+t || 1)), o) : ">" === i ? r = t ? w(+t) : lt(!0) : "<" === i && (r = at(!0))) : r = p ? n : ct(n, 0, s), r
                        }(n))) && (t || r !== o) && (ot(r), l.move(n, r, it, i))
                    },
                    scroll: function(n, t, i, u) {
                        r.Scroll.scroll(n, t, i, function() {
                            var n = ut(l.toIndex(b()));
                            ot(d ? tt(n, s) : n);
                            u && u()
                        })
                    },
                    getNext: lt,
                    getPrev: at,
                    getAdjacent: rt,
                    getEnd: ft,
                    setIndex: ot,
                    getIndex: function(n) {
                        return n ? it : o
                    },
                    toIndex: w,
                    toPage: et,
                    toDest: function(n) {
                        return n = l.toIndex(n), nt ? ct(n, 0, s) : n
                    },
                    hasFocus: a,
                    isBusy: bt
                }
            },
            Arrows: function(r, f, o) {
                function at() {
                    var i = o.arrows;
                    !i || s && c || (l = d || ht("div", p.arrows), s = pt(!0), c = pt(!1), tt = !0, ti(l, [s, c]), d || ar(l, st));
                    s && c && (fi(ct, {
                        prev: s,
                        next: c
                    }), ei(l, i ? "" : "none"), a(l, it = fu + "--" + o.direction), i && (rt([et, ci, u, lt, "ei"], nt), ft(c, "click", t(yt, ">")), ft(s, "click", t(yt, "<")), nt(), n([s, c], ai, st.id), ot("arrows:mounted", s, c)));
                    rt(e, wt)
                }

                function wt() {
                    vt();
                    at()
                }

                function vt() {
                    y.destroy();
                    b(l, it);
                    tt ? (ut(d ? [s, c] : l), s = c = null) : v([s, c], ru)
                }

                function yt(n) {
                    g.go(n, !0)
                }

                function pt(n) {
                    return gu('<button class="' + p.arrow + " " + (n ? p.prev : p.next) + '" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40" focusable="false"><path d="' + (o.arrowPath || "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z") + '" />')
                }

                function nt() {
                    var t, i, f, u;
                    s && c && (u = r.index, t = g.getPrev(), i = g.getNext(), f = -1 < t && u < t ? w.last : w.prev, u = -1 < i && i < u ? w.first : w.next, s.disabled = t < 0, c.disabled = i < 0, n(s, h, f), n(c, h, u), ot("arrows:updated", s, c, t, i))
                }
                var tt, it, y = i(r),
                    rt = y.on,
                    ft = y.bind,
                    ot = y.emit,
                    p = o.classes,
                    w = o.i18n,
                    k = f.Elements,
                    g = f.Controller,
                    d = k.arrows,
                    st = k.track,
                    l = d,
                    s = k.prev,
                    c = k.next,
                    ct = {};
                return {
                    arrows: ct,
                    mount: at,
                    destroy: vt,
                    update: nt
                }
            },
            Autoplay: function(t, r, f) {
                function v() {
                    d() && r.Slides.isEnough() && (s.start(!f.resetProgress), w = y = o = !1, nt(), k(hf))
                }

                function g(n) {
                    o = !!(n = void 0 === n ? !0 : n);
                    nt();
                    d() || (s.pause(), k(cf))
                }

                function et() {
                    o || (y || w ? g(!1) : v())
                }

                function nt() {
                    e && (p(e, ot, !o), n(e, h, f.i18n[o ? "play" : "pause"]))
                }

                function st(n) {
                    n = r.Slides.getAt(n);
                    s.set(n && +l(n.slide, io) || f.interval)
                }
                var y, w, a = i(t),
                    tt = a.on,
                    b = a.bind,
                    k = a.emit,
                    s = nr(f.interval, t.go.bind(t, ">"), function(n) {
                        var t = rt.bar;
                        t && c(t, "width", 100 * n + "%");
                        k("autoplay:playing", n)
                    }),
                    d = s.isPaused,
                    rt = r.Elements,
                    ut = (a = r.Elements).root,
                    e = a.toggle,
                    ft = f.autoplay,
                    o = "pause" === ft;
                return {
                    mount: function() {
                        ft && (f.pauseOnHover && b(ut, "mouseenter mouseleave", function(n) {
                            y = "mouseenter" === n.type;
                            et()
                        }), f.pauseOnFocus && b(ut, "focusin focusout", function(n) {
                            w = "focusin" === n.type;
                            et()
                        }), e && b(e, "click", function() {
                            o ? v() : g(!0)
                        }), tt([it, gr, u], s.rewind), tt(it, st), e && n(e, ai, rt.track.id), o || v(), nt())
                    },
                    destroy: s.cancel,
                    play: v,
                    pause: g,
                    isPaused: d
                }
            },
            Cover: function(n, r, f) {
                function s(n) {
                    r.Slides.forEach(function(t) {
                        var i = ri(t.container || t.slide, "img");
                        i && i.src && h(n, i, t)
                    })
                }

                function h(n, t, i) {
                    i.style("background", n ? 'center/cover no-repeat url("' + t.src + '")' : "", !0);
                    ei(t, n ? "none" : "")
                }
                var o = i(n).on;
                return {
                    mount: function() {
                        f.cover && (o(lf, t(h, !0)), o([et, e, u], t(s, !0)))
                    },
                    destroy: t(s, !1)
                }
            },
            Scroll: function(n, r, o) {
                function g(n, i, u, e, o) {
                    var p, y = k(),
                        u = (l(), !u || d && a() || (u = r.Layout.sliderSize(), p = wr(n) * u * di(f(n) / u) || 0, n = h.toPosition(r.Controller.toDest(n % u)) + p), tf(y, n, 1));
                    v = 1;
                    i = u ? 0 : i || ki(f(n - y) / 1.5, 800);
                    c = e;
                    s = nr(i, nt, t(ft, y, n, o), 1);
                    b(kt);
                    w(gr);
                    s.start()
                }

                function nt() {
                    b(3);
                    c && c();
                    w(lt)
                }

                function ft(n, t, i, r) {
                    var u = k(),
                        r = (n + (t - n) * (t = r, (n = o.easingFunc) ? n(t) : 1 - Math.pow(1 - t, 4)) - u) * v;
                    ut(u + r);
                    d && !i && a() && (v *= .6, f(r) < 10 && g(rt(a(!0)), 600, !1, c, !0))
                }

                function l() {
                    s && s.cancel()
                }

                function tt() {
                    s && !s.isPaused() && (l(), nt())
                }
                var s, c, y = i(n),
                    p = y.on,
                    w = y.emit,
                    b = n.state.set,
                    h = r.Move,
                    k = h.getPosition,
                    rt = h.getLimit,
                    a = h.exceededLimit,
                    ut = h.translate,
                    d = n.is(pt),
                    v = 1;
                return {
                    mount: function() {
                        p(it, l);
                        p([e, u], tt)
                    },
                    destroy: l,
                    scroll: g,
                    cancel: tt
                }
            },
            Drag: function(n, t, r) {
                function oi() {
                    var n = r.drag;
                    ti(!n);
                    d = "free" === n
                }

                function si(n) {
                    var t, i, f;
                    g = !1;
                    nt || (t = rt(n), i = n.target, f = r.noDrag, ii(i, "." + re + ", ." + fr) || f && ii(i, f) || !t && n.button || (h.isBusy() ? w(n, !0) : (l = t ? c : window, o = a.is([st, kt]), k = null, u(l, su, lt, bt), u(l, hu, at, bt), b.cancel(), ui.cancel(), vt(n))))
                }

                function lt(t) {
                    var i, u, e, h, s;
                    a.is(6) || (a.set(6), it("drag"));
                    t.cancelable && (o ? (b.translate(ut + y(t) / (v && n.is(pt) ? 5 : 1)), s = 200 < yt(t), i = v !== (v = ct()), (s || i) && vt(t), g = !0, it("dragging"), w(t)) : f(y(s = t)) > f(y(s, !0)) && (i = t, u = r.dragMinThreshold, e = dt(u), h = e && u.mouse || 0, e = (e ? u.touch : +u) || 10, o = f(y(i)) > (rt(i) ? e : h), w(t)))
                }

                function at(i) {
                    var e, s, u;
                    a.is(6) && (a.set(3), it("dragged"));
                    o && (s = function(n) {
                        return ht() + wr(n) * tt(f(n) * (r.flickPower || 600), d ? 1 / 0 : t.Layout.listSize() * (r.flickMaxPages || 1))
                    }(e = function(t) {
                        if (n.is(wt) || !v) {
                            var i = yt(t);
                            if (i && i < 200) return y(t) / i
                        }
                        return 0
                    }(e = i)), u = r.rewind && r.rewindByDrag, ot(!1), d ? h.scroll(s, 0, r.snap) : n.is(yi) ? h.go(ei(wr(e)) < 0 ? u ? "<" : "-" : u ? ">" : "+") : n.is(pt) && v && u ? h.go(ct(!0) ? ">" : "<") : h.go(h.toDest(s), !0), ot(!0), w(i));
                    ft(l, su, lt);
                    ft(l, hu, at);
                    o = !1
                }

                function hi(n) {
                    !nt && g && w(n, !0)
                }

                function vt(n) {
                    k = p;
                    p = n;
                    ut = ht()
                }

                function y(n, t) {
                    return ni(n, t) - ni(gt(n), t)
                }

                function yt(n) {
                    return yr(n) - yr(gt(n))
                }

                function gt(n) {
                    return p === n && k || p
                }

                function ni(n, t) {
                    return (rt(n) ? n.changedTouches[0] : n)["page" + fi(t ? "Y" : "X")]
                }

                function rt(n) {
                    return "undefined" != typeof TouchEvent && n instanceof TouchEvent
                }

                function ti(n) {
                    nt = n
                }
                var ut, p, k, d, o, g, nt, l, s = i(n),
                    ri = s.on,
                    it = s.emit,
                    u = s.bind,
                    ft = s.unbind,
                    a = n.state,
                    b = t.Move,
                    ui = t.Scroll,
                    h = t.Controller,
                    c = t.Elements.track,
                    ot = t.Media.reduce,
                    fi = (s = t.Direction).resolve,
                    ei = s.orient,
                    ht = b.getPosition,
                    ct = b.exceededLimit,
                    v = !1;
                return {
                    mount: function() {
                        u(c, su, sr, bt);
                        u(c, hu, sr, bt);
                        u(c, se, si, bt);
                        u(c, "click", hi, {
                            capture: !0
                        });
                        u(c, "dragstart", w);
                        ri([et, e], oi)
                    },
                    disable: ti,
                    isDragging: function() {
                        return o
                    }
                }
            },
            Keyboard: function(n, t, r) {
                function c() {
                    var n = r.keyboard;
                    n && (f = "global" === n ? window : y, a(f, he, w))
                }

                function l() {
                    v(f, he)
                }

                function p() {
                    var n = u;
                    u = !0;
                    au(function() {
                        u = n
                    })
                }

                function w(t) {
                    u || ((t = cu(t)) === h(tr) ? n.go("<") : t === h(ir) && n.go(">"))
                }
                var f, u, o = i(n),
                    s = o.on,
                    a = o.bind,
                    v = o.unbind,
                    y = n.root,
                    h = t.Direction.resolve;
                return {
                    mount: function() {
                        c();
                        s(e, l);
                        s(e, c);
                        s(it, p)
                    },
                    destroy: l,
                    disable: function(n) {
                        u = n
                    }
                }
            },
            LazyLoad: function(r, f, e) {
                function g() {
                    y(o);
                    f.Slides.forEach(function(n) {
                        vr(n.slide, uo).forEach(function(t) {
                            var i = l(t, pi),
                                r = l(t, or);
                            i === t.src && r === t.srcset || (i = e.classes.spinner, i = ri(r = t.parentElement, "." + i) || ht("span", i, r), o.push([t, n, i]), t.src || ei(t, "none"))
                        })
                    });
                    (d ? tt : (w(h), p(h, c), c))()
                }

                function c() {
                    (o = o.filter(function(n) {
                        var t = e.perPage * ((e.preloadPages || 1) + 1) - 1;
                        return !n[1].isWithin(r.index, t) || nt(n)
                    })).length || w(h)
                }

                function nt(i) {
                    var r = i[0];
                    a(i[1].slide, ou);
                    it(r, "load error", t(rt, i));
                    n(r, "src", l(r, pi));
                    n(r, "srcset", l(r, or));
                    v(r, pi);
                    v(r, or)
                }

                function rt(n, t) {
                    var i = n[0],
                        r = n[1];
                    b(r.slide, ou);
                    "error" !== t.type && (ut(n[2]), ei(i, ""), k(lf, i, r), k(li));
                    d && tt()
                }

                function tt() {
                    o.length && nt(o.shift())
                }
                var s = i(r),
                    p = s.on,
                    w = s.off,
                    it = s.bind,
                    k = s.emit,
                    d = "sequential" === e.lazyLoad,
                    h = [ci, lt],
                    o = [];
                return {
                    mount: function() {
                        e.lazyLoad && (g(), p(u, g))
                    },
                    destroy: t(y, o),
                    check: c
                }
            },
            Pagination: function(r, f, o) {
                function kt() {
                    s && (ut(g ? d(s.children) : s), b(s, ft), y(c), s = null);
                    p.destroy()
                }

                function gt(n) {
                    wt(">" + n, !0)
                }

                function ni(n, t) {
                    var r = c.length,
                        u = cu(t),
                        f = tt(),
                        i = -1,
                        f = (u === bt(ir, !1, f) ? i = ++n % r : u === bt(tr, !1, f) ? i = (--n + r) % r : "Home" === u ? i = 0 : "End" === u && (i = r - 1), c[i]);
                    f && (ku(f.button), wt(">" + i), w(t, !0))
                }

                function tt() {
                    return o.paginationDirection || o.direction
                }

                function nt(n) {
                    return c[l.toPage(n)]
                }

                function rt() {
                    var t, i = nt(pt(!0)),
                        r = nt(pt());
                    i && (b(t = i.button, ot), v(t, pf), n(t, yt, -1));
                    r && (a(t = r.button, ot), n(t, pf, !0), n(t, yt, ""));
                    st("pagination:updated", {
                        list: s,
                        items: c
                    }, i, r)
                }
                var s, ft, p = i(r),
                    et = p.on,
                    st = p.emit,
                    ct = p.bind,
                    dt = f.Slides,
                    at = f.Elements,
                    l = f.Controller,
                    vt = l.hasFocus,
                    pt = l.getIndex,
                    wt = l.go,
                    bt = f.Direction.resolve,
                    g = at.pagination,
                    c = [];
                return {
                    items: c,
                    mount: function f() {
                        var y, i;
                        if (kt(), et([e, u, "ei"], f), y = o.pagination, g && ei(g, y ? "" : "none"), y) {
                            et([it, gr, lt], rt);
                            var y = r.length,
                                b = o.classes,
                                p = o.i18n,
                                d = o.perPage,
                                ut = vt() ? l.getEnd() + 1 : hi(y / d);
                            for (a(s = g || ht("ul", b.pagination, at.track.parentElement), ft = er + "--" + tt()), n(s, k, "tablist"), n(s, h, p.select), n(s, iu, tt() === rr ? "vertical" : ""), i = 0; i < ut; i++) {
                                var w = ht("li", null, s),
                                    v = ht("button", {
                                        "class": b.page,
                                        type: "button"
                                    }, w),
                                    ot = dt.getIn(i).map(function(n) {
                                        return n.slide.id
                                    }),
                                    pt = !vt() && 1 < d ? p.pageX : p.slideX;
                                ct(v, "click", t(gt, i));
                                o.paginationKeyboard && ct(v, "keydown", t(ni, i));
                                n(w, k, "presentation");
                                n(v, k, "tab");
                                n(v, ai, ot.join(" "));
                                n(v, h, br(pt, i + 1));
                                n(v, yt, -1);
                                c.push({
                                    li: w,
                                    button: v,
                                    page: i
                                })
                            }
                            rt();
                            st("pagination:mounted", {
                                list: s,
                                items: c
                            }, nt(r.index))
                        }
                    },
                    destroy: kt,
                    getAt: nt,
                    update: rt
                }
            },
            Sync: function(r, u, f) {
                function c() {
                    var n, t;
                    r.splides.forEach(function(n) {
                        n.isParent || (a(r, n.splide), a(n.splide, r))
                    });
                    s && (n = i(r), (t = n.on)(ff, v), t(af, b), t([et, e], p), o.push(n), n.emit(sf, r.splides))
                }

                function l() {
                    o.forEach(function(n) {
                        n.destroy()
                    });
                    y(o)
                }

                function a(n, t) {
                    n = i(n);
                    n.on(it, function(n, i, r) {
                        t.go(t.is(wt) ? r : n)
                    });
                    o.push(n)
                }

                function p() {
                    n(u.Elements.list, iu, f.direction === rr ? "vertical" : "")
                }

                function v(n) {
                    r.go(n.index)
                }

                function b(n, t) {
                    lr(fo, cu(t)) && (v(n), w(t))
                }
                var s = f.isNavigation,
                    h = f.slideFocus,
                    o = [];
                return {
                    setup: t(u.Media.set, {
                        slideFocus: gt(h) ? s : h
                    }, !0),
                    mount: c,
                    destroy: l,
                    remount: function() {
                        l();
                        c()
                    }
                }
            },
            Wheel: function(n, t, r) {
                function o(i) {
                    var o, s, h, c, e;
                    i.cancelable && (o = (e = i.deltaY) < 0, s = yr(i), h = r.wheelMinThreshold || 0, c = r.wheelSleep || 0, f(e) > h && c < s - u && (n.go(o ? "<" : ">"), u = s), e = o, r.releaseWheel && !n.state.is(st) && -1 === t.Controller.getAdjacent(e) || w(i))
                }
                var e = i(n).bind,
                    u = 0;
                return {
                    mount: function() {
                        r.wheel && e(t.Elements.track, "wheel", o, bt)
                    }
                }
            },
            Live: function(r, u, f) {
                function a(t) {
                    n(e, kf, t);
                    t ? (ti(e, o), l.start()) : (ut(o), l.cancel())
                }

                function s(t) {
                    c && n(e, bf, t ? "off" : "polite")
                }
                var h = i(r).on,
                    e = u.Elements.track,
                    c = f.live && !f.isNavigation,
                    o = ht("span", ge),
                    l = nr(90, t(a, !1));
                return {
                    mount: function() {
                        c && (s(!u.Autoplay.isPaused()), n(e, df, !0), o.textContent = "…", h(hf, t(s, !0)), h(cf, t(s, !1)), h([ci, lt], t(a, !0)))
                    },
                    disable: s,
                    destroy: function() {
                        v(e, [bf, df, kf]);
                        ut(o)
                    }
                }
            }
        }),
        oo = {
            type: "slide",
            role: "region",
            speed: 400,
            perPage: 1,
            cloneStatus: !0,
            arrows: !0,
            pagination: !0,
            paginationKeyboard: !0,
            interval: 5e3,
            pauseOnHover: !0,
            pauseOnFocus: !0,
            resetProgress: !0,
            easing: "cubic-bezier(0.25, 1, 0.5, 1)",
            drag: !0,
            direction: "ltr",
            trimSpace: !0,
            focusableNodes: "a, button, textarea, input, select, iframe",
            live: !0,
            classes: {
                slide: ur,
                clone: ne,
                arrows: fu,
                arrow: fr,
                prev: te,
                next: ie,
                pagination: er,
                page: re,
                spinner: r + "spinner"
            },
            i18n: {
                prev: "Previous slide",
                next: "Next slide",
                first: "Go to first slide",
                last: "Go to last slide",
                slideX: "Go to slide %s",
                pageX: "Go to page %s",
                play: "Start autoplay",
                pause: "Pause autoplay",
                carousel: "carousel",
                slide: "slide",
                select: "Select a slide to show",
                slideLabel: "%s of %s"
            },
            reducedMotion: {
                speed: 0,
                rewindSpeed: 0,
                autoplay: "pause"
            }
        };
    return vt = function() {
        function t(n, r) {
            this.event = i();
            this.Components = {};
            this.state = pe(1);
            this.splides = [];
            this.n = {};
            this.t = {};
            n = g(n) ? nf(document, n) : n;
            si(n, n + " is invalid.");
            r = nt({
                label: l(this.root = n, h) || "",
                labelledby: l(n, tu) || ""
            }, oo, t.defaults, r || {});
            try {
                nt(r, JSON.parse(l(n, pr)))
            } catch (n) {
                si(!1, "Invalid JSON")
            }
            this.n = Object.create(nt({}, r))
        }
        var n = t.prototype;
        return n.mount = function(n, t) {
            var u = this,
                r = this.state,
                i = this.Components;
            return si(r.is([1, 7]), "Already mounted!"), r.set(1), this.i = i, this.r = t || this.r || (this.is(yi) ? so : ho), this.t = n || this.t, rt(fi({}, eo, this.t, {
                Transition: this.r
            }), function(n, t) {
                n = n(u, i, u.n);
                (i[t] = n).setup && n.setup()
            }), rt(i, function(n) {
                n.mount && n.mount()
            }), this.emit(et), a(this.root, "is-initialized"), r.set(3), this.emit("ready"), this
        }, n.sync = function(n) {
            return this.splides.push({
                splide: n
            }), n.splides.push({
                splide: this,
                isParent: !0
            }), this.state.is(3) && (this.i.Sync.remount(), n.Components.Sync.remount()), this
        }, n.go = function(n) {
            return this.i.Controller.go(n), this
        }, n.on = function(n, t) {
            return this.event.on(n, t), this
        }, n.off = function(n) {
            return this.event.off(n), this
        }, n.emit = function(n) {
            var t;
            return (t = this.event).emit.apply(t, [n].concat(d(arguments, 1))), this
        }, n.add = function(n, t) {
            return this.i.Slides.add(n, t), this
        }, n.remove = function(n) {
            return this.i.Slides.remove(n), this
        }, n.is = function(n) {
            return this.n.type === n
        }, n.refresh = function() {
            return this.emit(u), this
        }, n.destroy = function(n) {
            void 0 === n && (n = !0);
            var t = this.event,
                r = this.state;
            return r.is(1) ? i(this).on("ready", this.destroy.bind(this, n)) : (rt(this.i, function(t) {
                t.destroy && t.destroy(n)
            }, !0), t.emit(ef), t.destroy(), n && y(this.splides), r.set(7)), this
        }, Jt(t, [{
            key: "options",
            get: function() {
                return this.n
            },
            set: function(n) {
                this.i.Media.set(n, !0, !0)
            }
        }, {
            key: "length",
            get: function() {
                return this.i.Slides.getLength(!0)
            }
        }, {
            key: "index",
            get: function() {
                return this.i.Controller.getIndex()
            }
        }]), t
    }(), vt.defaults = {}, vt.STATES = ce, vt
};
"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (n = "undefined" != typeof globalThis ? globalThis : n || self).Splide = t();
/*!
 * @splidejs/splide-extension-auto-scroll
 * Version  : 0.5.3
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
(function(n) {
    typeof define == "function" && define.amd ? define(n) : n()
})(function() {
    "use strict";

    function ct(n) {
        n.length = 0
    }

    function r(n, t, i) {
        return Array.prototype.slice.call(n, t, i)
    }

    function n(n) {
        return n.bind.apply(n, [null].concat(r(arguments, 1)))
    }

    function o(n) {
        return requestAnimationFrame(n)
    }

    function u(n, t) {
        return typeof t === n
    }

    function h(n) {
        return s(n) ? n : [n]
    }

    function c(n, t) {
        h(n).forEach(t)
    }

    function lt(n, t, i) {
        var r, u, f;
        if (n)
            for (r = l(n), r = i ? r.reverse() : r, u = 0; u < r.length; u++)
                if (f = r[u], f !== "__proto__" && t(n[f], f) === !1) break;
        return n
    }

    function at(n) {
        return r(arguments, 1).forEach(function(t) {
            lt(t, function(i, r) {
                n[r] = t[r]
            })
        }), n
    }

    function vt() {
        function i(i, r, u, f) {
            t(i, r, function(t, i, r) {
                var e = "addEventListener" in t,
                    o = e ? t.removeEventListener.bind(t, i, u, f) : t.removeListener.bind(t, u);
                e ? t.addEventListener(i, u, f) : t.addListener(u);
                n.push([t, i, r, u, o])
            })
        }

        function r(i, r, u) {
            t(i, r, function(t, i, r) {
                n = n.filter(function(n) {
                    return n[0] === t && n[1] === i && n[2] === r && (!u || n[3] === u) ? (n[4](), !1) : !0
                })
            })
        }

        function u(n, t, i) {
            var r, u = !0;
            return typeof CustomEvent == "function" ? r = new CustomEvent(t, {
                bubbles: u,
                detail: i
            }) : (r = document.createEvent("CustomEvent"), r.initCustomEvent(t, u, !1, i)), n.dispatchEvent(r), r
        }

        function t(n, t, i) {
            c(n, function(n) {
                n && c(t, function(t) {
                    t.split(" ").forEach(function(t) {
                        var r = t.split(".");
                        i(n, r[0], r[1])
                    })
                })
            })
        }

        function f() {
            n.forEach(function(n) {
                n[4]()
            });
            ct(n)
        }
        var n = [];
        return {
            bind: i,
            unbind: r,
            dispatch: u,
            destroy: f
        }
    }

    function bt(t) {
        function f(n, t) {
            i.bind(u, h(n).join(" "), function(n) {
                t.apply(t, s(n.detail) ? n.detail : [])
            })
        }

        function e(n) {
            i.dispatch(u, n, r(arguments, 1))
        }
        var u = t ? t.event.bus : document.createDocumentFragment(),
            i = vt();
        return t && t.event.on(wt, i.destroy), at(i, {
            bus: u,
            on: f,
            off: n(i.unbind, u),
            emit: e
        })
    }

    function k(n, t, i, r) {
        function c() {
            if (!f) {
                if (u = n ? a((e() - s) / n, 1) : 1, i && i(u), u >= 1 && (t(), s = e(), r && ++y >= r)) return l();
                o(c)
            }
        }

        function p(t) {
            t || v();
            s = e() - (t ? u * n : 0);
            f = !1;
            o(c)
        }

        function l() {
            f = !0
        }

        function w() {
            s = e();
            u = 0;
            i && i(u)
        }

        function v() {
            h && cancelAnimationFrame(h);
            u = 0;
            h = 0;
            f = !0
        }

        function b(t) {
            n = t
        }

        function k() {
            return f
        }
        var e = Date.now,
            s, u = 0,
            h, f = !0,
            y = 0;
        return {
            start: p,
            rewind: w,
            pause: l,
            cancel: v,
            set: b,
            isPaused: k
        }
    }

    function kt(n, t) {
        function r() {
            i || (i = k(t || 0, function() {
                n();
                i = null
            }, null, 1), i.start())
        }
        var i;
        return r
    }

    function d(n, t, i) {
        return Array.prototype.slice.call(n, t, i)
    }

    function f(n) {
        return n.bind.apply(n, [null].concat(d(arguments, 1)))
    }

    function t(n, t) {
        return typeof t === n
    }

    function e(n) {
        return !tt(n) && t("object", n)
    }

    function tt(n) {
        return n === null
    }

    function ti(n) {
        return g(n) ? n : [n]
    }

    function i(n, t) {
        ti(n).forEach(t)
    }

    function ii(n, t, r) {
        n && i(t, function(t) {
            t && n.classList[r ? "add" : "remove"](t)
        })
    }

    function rt(n, t, i) {
        var r, u, f;
        if (n)
            for (r = it(n), r = i ? r.reverse() : r, u = 0; u < r.length; u++)
                if (f = r[u], f !== "__proto__" && t(n[f], f) === !1) break;
        return n
    }

    function ut(n) {
        return d(arguments, 1).forEach(function(t) {
            rt(t, function(i, r) {
                n[r] = t[r]
            })
        }), n
    }

    function ri(n, t) {
        i(n, function(n) {
            i(t, function(t) {
                n && n.removeAttribute(t)
            })
        })
    }

    function ft(n, t, r) {
        e(t) ? rt(t, function(t, i) {
            ft(n, i, t)
        }) : i(n, function(n) {
            tt(r) || r === "" ? ri(n, t) : n.setAttribute(t, String(r))
        })
    }

    function ui(n, t, i) {
        var r = et(t, i),
            u = ot(t, i);
        return et(ot(r, n), u)
    }

    function fi(n, t, i) {
        function yi() {
            var n = i.autoScroll;
            r = ut({}, st, e(n) ? n : {})
        }

        function fi() {
            n.is(ni) || !u && i.autoScroll !== !1 && (u = k(0, ki), pi(), bi())
        }

        function ei() {
            u && (u.cancel(), u = null, d = void 0, si([v, p, w, y, b]), lt(tt, "mouseenter mouseleave focusin focusout"), lt(o, "click"))
        }

        function pi() {
            r.pauseOnHover && l(tt, "mouseenter mouseleave", function(n) {
                it = n.type === "mouseenter";
                ot()
            });
            r.pauseOnFocus && l(tt, "focusin focusout", function(n) {
                rt = n.type === "focusin";
                ot()
            });
            r.useToggleButton && l(o, "click", function() {
                f ? s() : h()
            });
            g(yt, wi);
            g([v, p, w], function() {
                et = !0;
                h(!1)
            });
            g([y, pt, b], function() {
                et = !1;
                ot()
            })
        }

        function wi() {
            var n = i.autoScroll;
            n !== !1 ? (r = ut({}, r, e(n) ? n : {}), fi()) : ei();
            u && !nt(d) && at(d)
        }

        function bi() {
            r.autoStart && (document.readyState === "complete" ? s() : l(window, "load", s))
        }

        function s() {
            ct() && (u.start(!0), ri.disable(!0), rt = it = f = !1, oi())
        }

        function h(n) {
            n === void 0 && (n = !0);
            f || (f = n, oi(), ct() || (u.pause(), ri.disable(!1)))
        }

        function ot() {
            f || (it || rt || et ? h(!1) : s())
        }

        function ki() {
            var i = vt(),
                u = di(i);
            i !== u ? (at(u), gi(d = vt())) : (h(!1), r.rewind && n.go(r.speed > 0 ? 0 : t.Controller.getEnd()));
            vi()
        }

        function di(t) {
            var i = r.speed || 1;
            return t += ai(i), n.is(gt) && (t = ui(t, wt(!1), wt(!0))), t
        }

        function gi(r) {
            var u = n.length,
                f = (hi(r) + u) % u;
            f !== li() && (ci(f), t.Slides.update(), t.Pagination.update(), i.lazyLoad === "nearby" && t.LazyLoad.check())
        }

        function oi() {
            if (o) {
                var n = f ? "startScroll" : "pauseScroll";
                ii(o, dt, !f);
                ft(o, "aria-label", i.i18n[n] || ht[n])
            }
        }

        function ct() {
            return !u || u.isPaused()
        }
        var c = bt(n),
            g = c.on,
            si = c.off,
            l = c.bind,
            lt = c.unbind,
            a = t.Move,
            at = a.translate,
            vt = a.getPosition,
            hi = a.toIndex,
            wt = a.getLimit,
            ti = t.Controller,
            ci = ti.setIndex,
            li = ti.getIndex,
            ai = t.Direction.orient,
            o = t.Elements.toggle,
            ri = t.Live,
            tt = n.root,
            vi = kt(t.Arrows.update, 500),
            r = {},
            u, f, it, rt, et, d;
        return {
            setup: yi,
            mount: fi,
            destroy: ei,
            play: s,
            pause: h,
            isPaused: ct
        }
    }
    var s = Array.isArray,
        l, a, g, nt, it, st, ht;
    n(u, "function");
    n(u, "string");
    n(u, "undefined");
    l = Object.keys;
    a = Math.min;
    var v = "move",
        y = "moved",
        yt = "updated",
        p = "drag",
        pt = "dragged",
        w = "scroll",
        b = "scrolled",
        wt = "destroy";
    var dt = "is-active",
        gt = "slide",
        ni = "fade";
    g = Array.isArray;
    f(t, "function");
    f(t, "string");
    nt = f(t, "undefined");
    it = Object.keys;
    var et = Math.min,
        ot = Math.max,
        ei = Math.floor,
        oi = Math.ceil,
        si = Math.abs;
    st = {
        speed: 1,
        autoStart: !0,
        pauseOnHover: !0,
        pauseOnFocus: !0
    };
    ht = {
        startScroll: "Start auto scroll",
        pauseScroll: "Pause auto scroll"
    };
    typeof window < "u" && (window.splide = window.splide || {}, window.splide.Extensions = window.splide.Extensions || {}, window.splide.Extensions.AutoScroll = fi)
});
window.FontAwesomeKitConfig = {
    asyncLoading: {
        enabled: !1
    },
    autoA11y: {
        enabled: !0
    },
    baseUrl: "https://ka-f.fontawesome.com",
    baseUrlKit: "https://kit.fontawesome.com",
    detectConflictsUntil: null,
    iconUploads: {},
    id: 6777800,
    license: "free",
    method: "css",
    minify: {
        enabled: !0
    },
    token: "5aaff2c23b",
    v4FontFaceShim: {
        enabled: !0
    },
    v4shim: {
        enabled: !0
    },
    v5FontFaceShim: {
        enabled: !0
    },
    version: "6.2.0"
};
! function(n) {
    "function" == typeof define && define.amd ? define("kit-loader", n) : n()
}(function() {
    "use strict";

    function u(n) {
        return (u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
            return typeof n
        } : function(n) {
            return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
        })(n)
    }

    function ut(n, t, i) {
        return t in n ? Object.defineProperty(n, t, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : n[t] = i, n
    }

    function y(n, t) {
        var r = Object.keys(n),
            i;
        return Object.getOwnPropertySymbols && (i = Object.getOwnPropertySymbols(n), t && (i = i.filter(function(t) {
            return Object.getOwnPropertyDescriptor(n, t).enumerable
        })), r.push.apply(r, i)), r
    }

    function i(n) {
        for (var i, t = 1; t < arguments.length; t++) i = null != arguments[t] ? arguments[t] : {}, t % 2 ? y(Object(i), !0).forEach(function(t) {
            ut(n, t, i[t])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(i)) : y(Object(i)).forEach(function(t) {
            Object.defineProperty(n, t, Object.getOwnPropertyDescriptor(i, t))
        });
        return n
    }

    function ft(n, t) {
        return function(n) {
            if (Array.isArray(n)) return n
        }(n) || function(n, t) {
            var o, i;
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(n)) {
                var r = [],
                    u = !0,
                    f = !1,
                    e = void 0;
                try {
                    for (i = n[Symbol.iterator](); !(u = (o = i.next()).done) && (r.push(o.value), !t || r.length !== t); u = !0);
                } catch (n) {
                    f = !0;
                    e = n
                } finally {
                    try {
                        u || null == i.return || i.return()
                    } finally {
                        if (f) throw e;
                    }
                }
                return r
            }
        }(n, t) || function(n, t) {
            if (n) {
                if ("string" == typeof n) return p(n, t);
                var i = Object.prototype.toString.call(n).slice(8, -1);
                return ("Object" === i && n.constructor && (i = n.constructor.name), "Map" === i || "Set" === i) ? Array.from(n) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? p(n, t) : void 0
            }
        }(n, t) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }()
    }

    function p(n, t) {
        (null == t || t > n.length) && (t = n.length);
        for (var i = 0, r = new Array(t); i < t; i++) r[i] = n[i];
        return r
    }

    function s(n, t) {
        var i = t && t.addOn || "",
            r = t && t.baseFilename || n.license + i,
            u = t && t.minify ? ".min" : "",
            f = t && t.fileSuffix || n.method,
            e = t && t.subdir || n.method;
        return n.baseUrl + "/releases/" + ("latest" === n.version ? "latest" : "v".concat(n.version)) + "/" + e + "/" + r + u + "." + f
    }

    function et(n) {
        return n.baseUrlKit + "/" + n.token + "/" + n.id + "/kit-upload.css"
    }

    function w(n, t) {
        var i = t || ["fa"],
            r = "." + Array.prototype.join.call(i, ",."),
            u = n.querySelectorAll(r);
        Array.prototype.forEach.call(u, function(t) {
            var r = t.getAttribute("title"),
                u, i;
            t.setAttribute("aria-hidden", "true");
            u = !t.nextElementSibling || !t.nextElementSibling.classList.contains("sr-only");
            r && u && (i = n.createElement("span"), i.innerHTML = r, i.classList.add("sr-only"), t.parentNode.insertBefore(i, t.nextSibling))
        })
    }

    function ht() {
        for (var n = 0; n < f.length; n++) f[n][0](f[n][1]);
        f = [];
        l = !1
    }

    function h(n, t) {
        f.push([n, t]);
        l || (l = !0, st(ht, 0))
    }

    function k(n) {
        var u = n.owner,
            i = u._state,
            t = u._data,
            f = n[i],
            r = n.then;
        if ("function" == typeof f) {
            i = "fulfilled";
            try {
                t = f(t)
            } catch (n) {
                e(r, n)
            }
        }
        d(r, t) || ("fulfilled" === i && a(r, t), "rejected" === i && e(r, t))
    }

    function d(n, t) {
        var i, r;
        try {
            if (n === t) throw new TypeError("A promises callback cannot return that same promise.");
            if (t && ("function" == typeof t || "object" === u(t)) && (r = t.then, "function" == typeof r)) return r.call(t, function(r) {
                i || (i = !0, t === r ? g(n, r) : a(n, r))
            }, function(t) {
                i || (i = !0, e(n, t))
            }), !0
        } catch (u) {
            return i || e(n, u), !0
        }
        return !1
    }

    function a(n, t) {
        n !== t && d(n, t) || g(n, t)
    }

    function g(n, t) {
        "pending" === n._state && (n._state = "settled", n._data = t, h(ct, n))
    }

    function e(n, t) {
        "pending" === n._state && (n._state = "settled", n._data = t, h(lt, n))
    }

    function nt(n) {
        n._then = n._then.forEach(k)
    }

    function ct(n) {
        n._state = "fulfilled";
        nt(n)
    }

    function lt(n) {
        n._state = "rejected";
        nt(n);
        !n._handled && b && global.process.emit("unhandledRejection", n._data, n)
    }

    function at(n) {
        global.process.emit("rejectionHandled", n)
    }

    function n(t) {
        if ("function" != typeof t) throw new TypeError("Promise resolver " + t + " is not a function");
        if (this instanceof n == !1) throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
        this._then = [],
            function(n, t) {
                function i(n) {
                    e(t, n)
                }
                try {
                    n(function(n) {
                        a(t, n)
                    }, i)
                } catch (n) {
                    i(n)
                }
            }(t, this)
    }

    function v(n, i) {
        var u = i.fetch,
            f = i.XMLHttpRequest,
            e = i.token,
            r = n;
        return "URLSearchParams" in window ? (r = new URL(n)).searchParams.set("token", e) : r = r + "?token=" + encodeURIComponent(e), r = r.toString(), new t(function(n, t) {
            if ("function" == typeof u) u(r, {
                mode: "cors",
                cache: "default"
            }).then(function(n) {
                if (n.ok) return n.text();
                throw new Error("");
            }).then(function(t) {
                n(t)
            }).catch(t);
            else if ("function" == typeof f) {
                var i = new f;
                i.addEventListener("loadend", function() {
                    this.responseText ? n(this.responseText) : t(new Error(""))
                });
                ["abort", "error", "timeout"].map(function(n) {
                    i.addEventListener(n, function() {
                        t(new Error(""))
                    })
                });
                i.open("GET", r);
                i.send()
            } else t(new Error(""))
        })
    }

    function vt(n, t, i) {
        var r = n;
        return [
            [/(url\("?)\.\.\/\.\.\/\.\./g, function(n, i) {
                return "".concat(i).concat(t)
            }],
            [/(url\("?)\.\.\/webfonts/g, function(n, r) {
                return "".concat(r).concat(t, "/releases/v").concat(i, "/webfonts")
            }],
            [/(url\("?)https:\/\/kit-free([^.])*\.fontawesome\.com/g, function(n, i) {
                return "".concat(i).concat(t)
            }]
        ].forEach(function(n) {
            var t = ft(n, 2),
                i = t[0],
                u = t[1];
            r = r.replace(i, u)
        }), r
    }

    function yt(n, r) {
        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {},
            f = r.document || f,
            h = w.bind(w, f, ["fa", "fab", "fas", "far", "fal", "fad", "fak"]),
            c = Object.keys(n.iconUploads || {}).length > 0,
            u, e;
        return n.autoA11y.enabled && o(h), u = [{
            id: "fa-main",
            addOn: void 0
        }], n.v4shim && n.v4shim.enabled && u.push({
            id: "fa-v4-shims",
            addOn: "-v4-shims"
        }), n.v5FontFaceShim && n.v5FontFaceShim.enabled && u.push({
            id: "fa-v5-font-face",
            addOn: "-v5-font-face"
        }), n.v4FontFaceShim && n.v4FontFaceShim.enabled && u.push({
            id: "fa-v4-font-face",
            addOn: "-v4-font-face"
        }), c && u.push({
            id: "fa-kit-upload",
            customCss: !0
        }), e = u.map(function(u) {
            return new t(function(t, f) {
                v(u.customCss ? et(n) : s(n, {
                    addOn: u.addOn,
                    minify: n.minify.enabled
                }), r).then(function(f) {
                    t(pt(f, i(i({}, r), {}, {
                        baseUrl: n.baseUrl,
                        version: n.version,
                        id: u.id,
                        contentFilter: function(n, t) {
                            return vt(n, t.baseUrl, t.version)
                        }
                    })))
                }).catch(f)
            })
        }), t.all(e)
    }

    function pt(n, t) {
        var r = t.contentFilter || function(n) {
                return n
            },
            i = document.createElement("style"),
            u = document.createTextNode(r(n, t));
        return i.appendChild(u), i.media = "all", t.id && i.setAttribute("id", t.id), t && t.detectingConflicts && t.detectionIgnoreAttr && i.setAttributeNode(document.createAttribute(t.detectionIgnoreAttr)), i
    }

    function wt(n, r) {
        r.autoA11y = n.autoA11y.enabled;
        "pro" === n.license && (r.autoFetchSvg = !0, r.fetchSvgFrom = n.baseUrl + "/releases/" + ("latest" === n.version ? "latest" : "v".concat(n.version)) + "/svgs", r.fetchUploadedSvgFrom = n.uploadsUrl);
        var u = [];
        return n.v4shim.enabled && u.push(new t(function(t, u) {
            v(s(n, {
                addOn: "-v4-shims",
                minify: n.minify.enabled
            }), r).then(function(n) {
                t(tt(n, i(i({}, r), {}, {
                    id: "fa-v4-shims"
                })))
            }).catch(u)
        })), u.push(new t(function(t, u) {
            v(s(n, {
                minify: n.minify.enabled
            }), r).then(function(n) {
                var u = tt(n, i(i({}, r), {}, {
                    id: "fa-main"
                }));
                t(function(n, t) {
                    var r = t && void 0 !== t.autoFetchSvg ? t.autoFetchSvg : void 0,
                        i = t && void 0 !== t.autoA11y ? t.autoA11y : void 0;
                    return void 0 !== i && n.setAttribute("data-auto-a11y", i ? "true" : "false"), r && (n.setAttributeNode(document.createAttribute("data-auto-fetch-svg")), n.setAttribute("data-fetch-svg-from", t.fetchSvgFrom), n.setAttribute("data-fetch-uploaded-svg-from", t.fetchUploadedSvgFrom)), n
                }(u, r))
            }).catch(u)
        })), t.all(u)
    }

    function tt(n, t) {
        var i = document.createElement("SCRIPT"),
            r = document.createTextNode(n);
        return i.appendChild(r), i.referrerPolicy = "strict-origin", t.id && i.setAttribute("id", t.id), t && t.detectingConflicts && t.detectionIgnoreAttr && i.setAttributeNode(document.createAttribute(t.detectionIgnoreAttr)), i
    }

    function it(n) {
        var t, u = [],
            i = document,
            f = i.documentElement.doScroll,
            r = (f ? /^loaded|^c/ : /^loaded|^i|^c/).test(i.readyState);
        r || i.addEventListener("DOMContentLoaded", t = function() {
            for (i.removeEventListener("DOMContentLoaded", t), r = 1; t = u.shift();) t()
        });
        r ? setTimeout(n, 0) : u.push(n)
    }

    function bt(n) {
        "undefined" != typeof MutationObserver && new MutationObserver(n).observe(document, {
            childList: !0,
            subtree: !0
        })
    }
    var l, ot = function() {},
        b = "undefined" != typeof global && void 0 !== global.process && "function" == typeof global.process.emit,
        st = "undefined" == typeof setImmediate ? setTimeout : setImmediate,
        f = [],
        t;
    n.prototype = {
        constructor: n,
        _state: "pending",
        _then: null,
        _data: void 0,
        _handled: !1,
        then: function(n, t) {
            var i = {
                owner: this,
                then: new this.constructor(ot),
                fulfilled: n,
                rejected: t
            };
            return !t && !n || this._handled || (this._handled = !0, "rejected" === this._state && b && h(at, this)), "fulfilled" === this._state || "rejected" === this._state ? h(k, i) : this._then.push(i), i.then
        },
        "catch": function(n) {
            return this.then(null, n)
        }
    };
    n.all = function(t) {
        if (!Array.isArray(t)) throw new TypeError("You must pass an array to Promise.all().");
        return new n(function(n, i) {
            function o(t) {
                return e++,
                    function(i) {
                        u[t] = i;
                        --e || n(u)
                    }
            }
            for (var u = [], e = 0, f, r = 0; r < t.length; r++)(f = t[r]) && "function" == typeof f.then ? f.then(o(r), i) : u[r] = f;
            e || n(u)
        })
    };
    n.race = function(t) {
        if (!Array.isArray(t)) throw new TypeError("You must pass an array to Promise.race().");
        return new n(function(n, i) {
            for (var r, u = 0; u < t.length; u++)(r = t[u]) && "function" == typeof r.then ? r.then(n, i) : n(r)
        })
    };
    n.resolve = function(t) {
        return t && "object" === u(t) && t.constructor === n ? t : new n(function(n) {
            n(t)
        })
    };
    n.reject = function(t) {
        return new n(function(n, i) {
            i(t)
        })
    };
    t = "function" == typeof Promise ? Promise : n;
    try {
        if (window.FontAwesomeKitConfig) {
            var o = window.FontAwesomeKitConfig,
                c = {
                    detectingConflicts: o.detectConflictsUntil && new Date <= new Date(o.detectConflictsUntil),
                    detectionIgnoreAttr: "data-fa-detection-ignore",
                    fetch: window.fetch,
                    token: o.token,
                    XMLHttpRequest: window.XMLHttpRequest,
                    document: document
                },
                r = document.currentScript,
                rt = r ? r.parentElement : document.head;
            (function() {
                var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return "js" === n.method ? wt(n, t) : "css" === n.method ? yt(n, t, function(n) {
                    it(n);
                    bt(n)
                }) : void 0
            })(o, c).then(function(n) {
                n.map(function(n) {
                    try {
                        rt.insertBefore(n, r ? r.nextSibling : null)
                    } catch (t) {
                        rt.appendChild(n)
                    }
                });
                c.detectingConflicts && r && it(function() {
                    r.setAttributeNode(document.createAttribute(c.detectionIgnoreAttr));
                    var n = function(n, t) {
                        var i = document.createElement("script");
                        return t && t.detectionIgnoreAttr && i.setAttributeNode(document.createAttribute(t.detectionIgnoreAttr)), i.src = s(n, {
                            baseFilename: "conflict-detection",
                            fileSuffix: "js",
                            subdir: "js",
                            minify: n.minify.enabled
                        }), i
                    }(o, c);
                    document.body.appendChild(n)
                })
            }).catch(function(n) {
                console.error("".concat("Font Awesome Kit:", " ").concat(n))
            })
        }
    } catch (u) {
        console.error("".concat("Font Awesome Kit:", " ").concat(u))
    }
});
/*! Magnific Popup - v1.1.0 - 2016-02-20
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2016 Dmitry Semenov; */
! function(n) {
    "function" == typeof define && define.amd ? define(["jquery"], n) : n("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function(n) {
    var t, it, f, p, o, pt, s = "Close",
        wt = "BeforeClose",
        ti = "AfterClose",
        ii = "BeforeAppend",
        rt = "MarkupParse",
        ut = "Open",
        bt = "Change",
        ft = "mfp",
        u = "." + ft,
        w = "mfp-ready",
        kt = "mfp-removing",
        et = "mfp-prevent-close",
        b = function() {},
        ot = !!window.jQuery,
        h = n(window),
        r = function(n, i) {
            t.ev.on(ft + n + u, i)
        },
        l = function(t, i, r, u) {
            var f = document.createElement("div");
            return f.className = "mfp-" + t, r && (f.innerHTML = r), u ? i && i.appendChild(f) : (f = n(f), i && f.appendTo(i)), f
        },
        i = function(i, r) {
            t.ev.triggerHandler(ft + i, r);
            t.st.callbacks && (i = i.charAt(0).toLowerCase() + i.slice(1), t.st.callbacks[i] && t.st.callbacks[i].apply(t, n.isArray(r) ? r : [r]))
        },
        st = function(i) {
            return i === pt && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = n(t.st.closeMarkup.replace("%title%", t.st.tClose)), pt = i), t.currTemplate.closeBtn
        },
        ht = function() {
            n.magnificPopup.instance || (t = new b, t.init(), n.magnificPopup.instance = t)
        },
        ri = function() {
            var n = document.createElement("p").style,
                t = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== n.transition) return !0;
            for (; t.length;)
                if (t.pop() + "Transition" in n) return !0;
            return !1
        },
        a, k, d, g, ct, e, gt, at, ni, nt, yt, tt;
    b.prototype = {
        constructor: b,
        init: function() {
            var i = navigator.appVersion;
            t.isLowIE = t.isIE8 = document.all && !document.addEventListener;
            t.isAndroid = /android/gi.test(i);
            t.isIOS = /iphone|ipad|ipod/gi.test(i);
            t.supportsTransition = ri();
            t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent);
            f = n(document);
            t.popupsCache = {}
        },
        open: function(e) {
            var s, c, p, b, a, k, v, d, y;
            if (e.isObj === !1) {
                for (t.items = e.items.toArray(), t.index = 0, p = e.items, s = 0; s < p.length; s++)
                    if (c = p[s], c.parsed && (c = c.el[0]), c === e.el[0]) {
                        t.index = s;
                        break
                    }
            } else t.items = n.isArray(e.items) ? e.items : [e.items], t.index = e.index || 0;
            if (t.isOpen) return void t.updateItemHTML();
            for (t.types = [], o = "", t.ev = e.mainEl && e.mainEl.length ? e.mainEl.eq(0) : f, e.key ? (t.popupsCache[e.key] || (t.popupsCache[e.key] = {}), t.currTemplate = t.popupsCache[e.key]) : t.currTemplate = {}, t.st = n.extend(!0, {}, n.magnificPopup.defaults, e), t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos, t.st.modal && (t.st.closeOnContentClick = !1, t.st.closeOnBgClick = !1, t.st.showCloseBtn = !1, t.st.enableEscapeKey = !1), t.bgOverlay || (t.bgOverlay = l("bg").on("click" + u, function() {
                    t.close()
                }), t.wrap = l("wrap").attr("tabindex", -1).on("click" + u, function(n) {
                    t._checkIfClose(n.target) && t.close()
                }), t.container = l("container", t.wrap)), t.contentContainer = l("content"), t.st.preloader && (t.preloader = l("preloader", t.container, t.st.tLoading)), b = n.magnificPopup.modules, s = 0; s < b.length; s++) a = b[s], a = a.charAt(0).toUpperCase() + a.slice(1), t["init" + a].call(t);
            return i("BeforeOpen"), t.st.showCloseBtn && (t.st.closeBtnInside ? (r(rt, function(n, t, i, r) {
                i.close_replaceWith = st(r.type)
            }), o += " mfp-close-btn-in") : t.wrap.append(st())), t.st.alignTop && (o += " mfp-align-top"), t.fixedContentPos ? t.wrap.css({
                overflow: t.st.overflowY,
                overflowX: "hidden",
                overflowY: t.st.overflowY
            }) : t.wrap.css({
                top: h.scrollTop(),
                position: "absolute"
            }), (t.st.fixedBgPos === !1 || "auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({
                height: f.height(),
                position: "absolute"
            }), t.st.enableEscapeKey && f.on("keyup" + u, function(n) {
                27 === n.keyCode && t.close()
            }), h.on("resize" + u, function() {
                t.updateSize()
            }), t.st.closeOnContentClick || (o += " mfp-auto-cursor"), o && t.wrap.addClass(o), k = t.wH = h.height(), v = {}, t.fixedContentPos && t._hasScrollBar(k) && (d = t._getScrollbarSize(), d && (v.marginRight = d)), t.fixedContentPos && (t.isIE7 ? n("body, html").css("overflow", "hidden") : v.overflow = "hidden"), y = t.st.mainClass, t.isIE7 && (y += " mfp-ie7"), y && t._addClassToMFP(y), t.updateItemHTML(), i("BuildControls"), n("html").css(v), t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || n(document.body)), t._lastFocusedEl = document.activeElement, setTimeout(function() {
                t.content ? (t._addClassToMFP(w), t._setFocus()) : t.bgOverlay.addClass(w);
                f.on("focusin" + u, t._onFocusIn)
            }, 16), t.isOpen = !0, t.updateSize(k), i(ut), e
        },
        close: function() {
            t.isOpen && (i(wt), t.isOpen = !1, t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(kt), setTimeout(function() {
                t._close()
            }, t.st.removalDelay)) : t._close())
        },
        _close: function() {
            var r, e;
            i(s);
            r = kt + " " + w + " ";
            (t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (r += t.st.mainClass + " "), t._removeClassFromMFP(r), t.fixedContentPos) && (e = {
                marginRight: ""
            }, t.isIE7 ? n("body, html").css("overflow", "") : e.overflow = "", n("html").css(e));
            f.off("keyup" + u + " focusin" + u);
            t.ev.off(u);
            t.wrap.attr("class", "mfp-wrap").removeAttr("style");
            t.bgOverlay.attr("class", "mfp-bg");
            t.container.attr("class", "mfp-container");
            !t.st.showCloseBtn || t.st.closeBtnInside && t.currTemplate[t.currItem.type] !== !0 || t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach();
            t.st.autoFocusLast && t._lastFocusedEl && n(t._lastFocusedEl).focus();
            t.currItem = null;
            t.content = null;
            t.currTemplate = null;
            t.prevHeight = 0;
            i(ti)
        },
        updateSize: function(n) {
            if (t.isIOS) {
                var u = document.documentElement.clientWidth / window.innerWidth,
                    r = window.innerHeight * u;
                t.wrap.css("height", r);
                t.wH = r
            } else t.wH = n || h.height();
            t.fixedContentPos || t.wrap.css("height", t.wH);
            i("Resize")
        },
        updateItemHTML: function() {
            var u = t.items[t.index],
                r, f, e;
            t.contentContainer.detach();
            t.content && t.content.detach();
            u.parsed || (u = t.parseEl(t.index));
            r = u.type;
            (i("BeforeChange", [t.currItem ? t.currItem.type : "", r]), t.currItem = u, t.currTemplate[r]) || (f = t.st[r] ? t.st[r].markup : !1, i("FirstMarkupParse", f), t.currTemplate[r] = f ? n(f) : !0);
            p && p !== u.type && t.container.removeClass("mfp-" + p + "-holder");
            e = t["get" + r.charAt(0).toUpperCase() + r.slice(1)](u, t.currTemplate[r]);
            t.appendContent(e, r);
            u.preloaded = !0;
            i(bt, u);
            p = u.type;
            t.container.prepend(t.contentContainer);
            i("AfterChange")
        },
        appendContent: function(n, r) {
            t.content = n;
            n ? t.st.showCloseBtn && t.st.closeBtnInside && t.currTemplate[r] === !0 ? t.content.find(".mfp-close").length || t.content.append(st()) : t.content = n : t.content = "";
            i(ii);
            t.container.addClass("mfp-" + r + "-holder");
            t.contentContainer.append(t.content)
        },
        parseEl: function(r) {
            var o, u = t.items[r],
                e, f;
            if (u.tagName ? u = {
                    el: n(u)
                } : (o = u.type, u = {
                    data: u,
                    src: u.src
                }), u.el) {
                for (e = t.types, f = 0; f < e.length; f++)
                    if (u.el.hasClass("mfp-" + e[f])) {
                        o = e[f];
                        break
                    }
                u.src = u.el.attr("data-mfp-src");
                u.src || (u.src = u.el.attr("href"))
            }
            return u.type = o || t.st.type || "inline", u.index = r, u.parsed = !0, t.items[r] = u, i("ElementParse", u), t.items[r]
        },
        addGroup: function(n, i) {
            var u = function(r) {
                    r.mfpEl = this;
                    t._openClick(r, n, i)
                },
                r;
            i || (i = {});
            r = "click.magnificPopup";
            i.mainEl = n;
            i.items ? (i.isObj = !0, n.off(r).on(r, u)) : (i.isObj = !1, i.delegate ? n.off(r).on(r, i.delegate, u) : (i.items = n, n.off(r).on(r, u)))
        },
        _openClick: function(i, r, u) {
            var e = void 0 !== u.midClick ? u.midClick : n.magnificPopup.defaults.midClick,
                f;
            if (e || !(2 === i.which || i.ctrlKey || i.metaKey || i.altKey || i.shiftKey)) {
                if (f = void 0 !== u.disableOn ? u.disableOn : n.magnificPopup.defaults.disableOn, f)
                    if (n.isFunction(f)) {
                        if (!f.call(t)) return !0
                    } else if (h.width() < f) return !0;
                i.type && (i.preventDefault(), t.isOpen && i.stopPropagation());
                u.el = n(i.mfpEl);
                u.delegate && (u.items = r.find(u.delegate));
                t.open(u)
            }
        },
        updateStatus: function(n, r) {
            if (t.preloader) {
                it !== n && t.container.removeClass("mfp-s-" + it);
                r || "loading" !== n || (r = t.st.tLoading);
                var u = {
                    status: n,
                    text: r
                };
                i("UpdateStatus", u);
                n = u.status;
                r = u.text;
                t.preloader.html(r);
                t.preloader.find("a").on("click", function(n) {
                    n.stopImmediatePropagation()
                });
                t.container.addClass("mfp-s-" + n);
                it = n
            }
        },
        _checkIfClose: function(i) {
            if (!n(i).hasClass(et)) {
                var r = t.st.closeOnContentClick,
                    u = t.st.closeOnBgClick;
                if (r && u || !t.content || n(i).hasClass("mfp-close") || t.preloader && i === t.preloader[0]) return !0;
                if (i === t.content[0] || n.contains(t.content[0], i)) {
                    if (r) return !0
                } else if (u && n.contains(document, i)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(n) {
            t.bgOverlay.addClass(n);
            t.wrap.addClass(n)
        },
        _removeClassFromMFP: function(n) {
            this.bgOverlay.removeClass(n);
            t.wrap.removeClass(n)
        },
        _hasScrollBar: function(n) {
            return (t.isIE7 ? f.height() : document.body.scrollHeight) > (n || h.height())
        },
        _setFocus: function() {
            (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
        },
        _onFocusIn: function(i) {
            if (i.target !== t.wrap[0] && !n.contains(t.wrap[0], i.target)) return (t._setFocus(), !1)
        },
        _parseMarkup: function(t, r, f) {
            var e;
            f.data && (r = n.extend(f.data, r));
            i(rt, [t, r, f]);
            n.each(r, function(i, r) {
                var f, o;
                if (void 0 === r || r === !1) return !0;
                (e = i.split("_"), e.length > 1) ? (f = t.find(u + "-" + e[0]), f.length > 0 && (o = e[1], "replaceWith" === o ? f[0] !== r[0] && f.replaceWith(r) : "img" === o ? f.is("img") ? f.attr("src", r) : f.replaceWith(n("<img>").attr("src", r).attr("class", f.attr("class"))) : f.attr(e[1], r))) : t.find(u + "-" + i).html(r)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === t.scrollbarSize) {
                var n = document.createElement("div");
                n.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;";
                document.body.appendChild(n);
                t.scrollbarSize = n.offsetWidth - n.clientWidth;
                document.body.removeChild(n)
            }
            return t.scrollbarSize
        }
    };
    n.magnificPopup = {
        instance: null,
        proto: b.prototype,
        modules: [],
        open: function(t, i) {
            return ht(), t = t ? n.extend(!0, {}, t) : {}, t.isObj = !0, t.index = i || 0, this.instance.open(t)
        },
        close: function() {
            return n.magnificPopup.instance && n.magnificPopup.instance.close()
        },
        registerModule: function(t, i) {
            i.options && (n.magnificPopup.defaults[t] = i.options);
            n.extend(this.proto, i.proto);
            this.modules.push(t)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;<\/button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    };
    n.fn.magnificPopup = function(i) {
        var r, u, f, e;
        return ht(), r = n(this), "string" == typeof i ? "open" === i ? (f = ot ? r.data("magnificPopup") : r[0].magnificPopup, e = parseInt(arguments[1], 10) || 0, f.items ? u = f.items[e] : (u = r, f.delegate && (u = u.find(f.delegate)), u = u.eq(e)), t._openClick({
            mfpEl: u
        }, r, f)) : t.isOpen && t[i].apply(t, Array.prototype.slice.call(arguments, 1)) : (i = n.extend(!0, {}, i), ot ? r.data("magnificPopup", i) : r[0].magnificPopup = i, t.addGroup(r, i)), r
    };
    g = "inline";
    ct = function() {
        d && (k.after(d.addClass(a)).detach(), d = null)
    };
    n.magnificPopup.registerModule(g, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                t.types.push(g);
                r(s + "." + g, function() {
                    ct()
                })
            },
            getInline: function(i, r) {
                var f, u, e;
                return (ct(), i.src) ? (f = t.st.inline, u = n(i.src), u.length ? (e = u[0].parentNode, e && e.tagName && (k || (a = f.hiddenClass, k = l(a), a = "mfp-" + a), d = u.after(k).detach().removeClass(a)), t.updateStatus("ready")) : (t.updateStatus("error", f.tNotFound), u = n("<div>")), i.inlineElement = u, u) : (t.updateStatus("ready"), t._parseMarkup(r, {}, i), r)
            }
        }
    });
    var v, y = "ajax",
        lt = function() {
            v && n(document.body).removeClass(v)
        },
        dt = function() {
            lt();
            t.req && t.req.abort()
        };
    n.magnificPopup.registerModule(y, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content<\/a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                t.types.push(y);
                v = t.st.ajax.cursor;
                r(s + "." + y, dt);
                r("BeforeChange." + y, dt)
            },
            getAjax: function(r) {
                v && n(document.body).addClass(v);
                t.updateStatus("loading");
                var u = n.extend({
                    url: r.src,
                    success: function(u, f, e) {
                        var o = {
                            data: u,
                            xhr: e
                        };
                        i("ParseAjax", o);
                        t.appendContent(n(o.data), y);
                        r.finished = !0;
                        lt();
                        t._setFocus();
                        setTimeout(function() {
                            t.wrap.addClass(w)
                        }, 16);
                        t.updateStatus("ready");
                        i("AjaxContentAdded")
                    },
                    error: function() {
                        lt();
                        r.finished = r.loadError = !0;
                        t.updateStatus("error", t.st.ajax.tError.replace("%url%", r.src))
                    }
                }, t.st.ajax.settings);
                return t.req = n.ajax(u), ""
            }
        }
    });
    gt = function(i) {
        if (i.data && void 0 !== i.data.title) return i.data.title;
        var r = t.st.image.titleSrc;
        if (r) {
            if (n.isFunction(r)) return r.call(t, i);
            if (i.el) return i.el.attr(r) || ""
        }
        return ""
    };
    n.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"><\/div><figure><div class="mfp-img"><\/div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"><\/div><div class="mfp-counter"><\/div><\/div><\/figcaption><\/figure><\/div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image<\/a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var i = t.st.image,
                    f = ".image";
                t.types.push("image");
                r(ut + f, function() {
                    "image" === t.currItem.type && i.cursor && n(document.body).addClass(i.cursor)
                });
                r(s + f, function() {
                    i.cursor && n(document.body).removeClass(i.cursor);
                    h.off("resize" + u)
                });
                r("Resize" + f, t.resizeImage);
                t.isLowIE && r("AfterChange", t.resizeImage)
            },
            resizeImage: function() {
                var n = t.currItem,
                    i;
                n && n.img && t.st.image.verticalFit && (i = 0, t.isLowIE && (i = parseInt(n.img.css("padding-top"), 10) + parseInt(n.img.css("padding-bottom"), 10)), n.img.css("max-height", t.wH - i))
            },
            _onImageHasSize: function(n) {
                n.img && (n.hasSize = !0, e && clearInterval(e), n.isCheckingImgSize = !1, i("ImageHasSize", n), n.imgHidden && (t.content && t.content.removeClass("mfp-loading"), n.imgHidden = !1))
            },
            findImageSize: function(n) {
                var i = 0,
                    u = n.img[0],
                    r = function(f) {
                        e && clearInterval(e);
                        e = setInterval(function() {
                            return u.naturalWidth > 0 ? void t._onImageHasSize(n) : (i > 200 && clearInterval(e), i++, void(3 === i ? r(10) : 40 === i ? r(50) : 100 === i && r(500)))
                        }, f)
                    };
                r(1)
            },
            getImage: function(r, u) {
                var o = 0,
                    s = function() {
                        r && (r.img[0].complete ? (r.img.off(".mfploader"), r === t.currItem && (t._onImageHasSize(r), t.updateStatus("ready")), r.hasSize = !0, r.loaded = !0, i("ImageLoadComplete")) : (o++, 200 > o ? setTimeout(s, 100) : h()))
                    },
                    h = function() {
                        r && (r.img.off(".mfploader"), r === t.currItem && (t._onImageHasSize(r), t.updateStatus("error", c.tError.replace("%url%", r.src))), r.hasSize = !0, r.loaded = !0, r.loadError = !0)
                    },
                    c = t.st.image,
                    l = u.find(".mfp-img"),
                    f;
                return l.length && (f = document.createElement("img"), f.className = "mfp-img", r.el && r.el.find("img").length && (f.alt = r.el.find("img").attr("alt")), r.img = n(f).on("load.mfploader", s).on("error.mfploader", h), f.src = r.src, l.is("img") && (r.img = r.img.clone()), f = r.img[0], f.naturalWidth > 0 ? r.hasSize = !0 : f.width || (r.hasSize = !1)), t._parseMarkup(u, {
                    title: gt(r),
                    img_replaceWith: r.img
                }, r), t.resizeImage(), r.hasSize ? (e && clearInterval(e), r.loadError ? (u.addClass("mfp-loading"), t.updateStatus("error", c.tError.replace("%url%", r.src))) : (u.removeClass("mfp-loading"), t.updateStatus("ready")), u) : (t.updateStatus("loading"), r.loading = !0, r.hasSize || (r.imgHidden = !0, u.addClass("mfp-loading"), t.findImageSize(r)), u)
            }
        }
    });
    ni = function() {
        return void 0 === at && (at = void 0 !== document.createElement("p").style.MozTransform), at
    };
    n.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(n) {
                return n.is("img") ? n : n.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var u, f = t.st.zoom,
                    o = ".zoom";
                if (f.enabled && t.supportsTransition) {
                    var e, n, c = f.duration,
                        l = function(n) {
                            var r = n.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                u = "all " + f.duration / 1e3 + "s " + f.easing,
                                t = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                i = "transition";
                            return t["-webkit-" + i] = t["-moz-" + i] = t["-o-" + i] = t[i] = u, r.css(t), r
                        },
                        h = function() {
                            t.content.css("visibility", "visible")
                        };
                    r("BuildControls" + o, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(e), t.content.css("visibility", "hidden"), u = t._getItemToZoom(), !u) return void h();
                            n = l(u);
                            n.css(t._getOffset());
                            t.wrap.append(n);
                            e = setTimeout(function() {
                                n.css(t._getOffset(!0));
                                e = setTimeout(function() {
                                    h();
                                    setTimeout(function() {
                                        n.remove();
                                        u = n = null;
                                        i("ZoomAnimationEnded")
                                    }, 16)
                                }, c)
                            }, 16)
                        }
                    });
                    r(wt + o, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(e), t.st.removalDelay = c, !u) {
                                if (u = t._getItemToZoom(), !u) return;
                                n = l(u)
                            }
                            n.css(t._getOffset(!0));
                            t.wrap.append(n);
                            t.content.css("visibility", "hidden");
                            setTimeout(function() {
                                n.css(t._getOffset())
                            }, 16)
                        }
                    });
                    r(s + o, function() {
                        t._allowZoom() && (h(), n && n.remove(), u = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === t.currItem.type
            },
            _getItemToZoom: function() {
                return t.currItem.hasSize ? t.currItem.img : !1
            },
            _getOffset: function(i) {
                var r, u;
                r = i ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem);
                var f = r.offset(),
                    e = parseInt(r.css("padding-top"), 10),
                    o = parseInt(r.css("padding-bottom"), 10);
                return f.top -= n(window).scrollTop() - e, u = {
                    width: r.width(),
                    height: (ot ? r.innerHeight() : r[0].offsetHeight) - o - e
                }, ni() ? u["-moz-transform"] = u.transform = "translate(" + f.left + "px," + f.top + "px)" : (u.left = f.left, u.top = f.top), u
            }
        }
    });
    var c = "iframe",
        ui = "//about:blank",
        vt = function(n) {
            if (t.currTemplate[c]) {
                var i = t.currTemplate[c].find("iframe");
                i.length && (n || (i[0].src = ui), t.isIE8 && i.css("display", n ? "block" : "none"))
            }
        };
    n.magnificPopup.registerModule(c, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"><\/div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen><\/iframe><\/div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                t.types.push(c);
                r("BeforeChange", function(n, t, i) {
                    t !== i && (t === c ? vt() : i === c && vt(!0))
                });
                r(s + "." + c, function() {
                    vt()
                })
            },
            getIframe: function(i, r) {
                var u = i.src,
                    f = t.st.iframe,
                    e;
                return n.each(f.patterns, function() {
                    if (u.indexOf(this.index) > -1) return (this.id && (u = "string" == typeof this.id ? u.substr(u.lastIndexOf(this.id) + this.id.length, u.length) : this.id.call(this, u)), u = this.src.replace("%id%", u), !1)
                }), e = {}, f.srcAction && (e[f.srcAction] = u), t._parseMarkup(r, e, i), t.updateStatus("ready"), r
            }
        }
    });
    nt = function(n) {
        var i = t.items.length;
        return n > i - 1 ? n - i : 0 > n ? i + n : n
    };
    yt = function(n, t, i) {
        return n.replace(/%curr%/gi, t + 1).replace(/%total%/gi, i)
    };
    n.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"><\/button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var u = t.st.gallery,
                    i = ".mfp-gallery";
                return t.direction = !0, u && u.enabled ? (o += " mfp-gallery", r(ut + i, function() {
                    u.navigateByImgClick && t.wrap.on("click" + i, ".mfp-img", function() {
                        if (t.items.length > 1) return (t.next(), !1)
                    });
                    f.on("keydown" + i, function(n) {
                        37 === n.keyCode ? t.prev() : 39 === n.keyCode && t.next()
                    })
                }), r("UpdateStatus" + i, function(n, i) {
                    i.text && (i.text = yt(i.text, t.currItem.index, t.items.length))
                }), r(rt + i, function(n, i, r, f) {
                    var e = t.items.length;
                    r.counter = e > 1 ? yt(u.tCounter, f.index, e) : ""
                }), r("BuildControls" + i, function() {
                    if (t.items.length > 1 && u.arrows && !t.arrowLeft) {
                        var i = u.arrowMarkup,
                            r = t.arrowLeft = n(i.replace(/%title%/gi, u.tPrev).replace(/%dir%/gi, "left")).addClass(et),
                            f = t.arrowRight = n(i.replace(/%title%/gi, u.tNext).replace(/%dir%/gi, "right")).addClass(et);
                        r.click(function() {
                            t.prev()
                        });
                        f.click(function() {
                            t.next()
                        });
                        t.container.append(r.add(f))
                    }
                }), r(bt + i, function() {
                    t._preloadTimeout && clearTimeout(t._preloadTimeout);
                    t._preloadTimeout = setTimeout(function() {
                        t.preloadNearbyImages();
                        t._preloadTimeout = null
                    }, 16)
                }), void r(s + i, function() {
                    f.off(i);
                    t.wrap.off("click" + i);
                    t.arrowRight = t.arrowLeft = null
                })) : !1
            },
            next: function() {
                t.direction = !0;
                t.index = nt(t.index + 1);
                t.updateItemHTML()
            },
            prev: function() {
                t.direction = !1;
                t.index = nt(t.index - 1);
                t.updateItemHTML()
            },
            goTo: function(n) {
                t.direction = n >= t.index;
                t.index = n;
                t.updateItemHTML()
            },
            preloadNearbyImages: function() {
                for (var i = t.st.gallery.preload, r = Math.min(i[0], t.items.length), u = Math.min(i[1], t.items.length), n = 1; n <= (t.direction ? u : r); n++) t._preloadItem(t.index + n);
                for (n = 1; n <= (t.direction ? r : u); n++) t._preloadItem(t.index - n)
            },
            _preloadItem: function(r) {
                if (r = nt(r), !t.items[r].preloaded) {
                    var u = t.items[r];
                    u.parsed || (u = t.parseEl(r));
                    i("LazyLoad", u);
                    "image" === u.type && (u.img = n('<img class="mfp-img" />').on("load.mfploader", function() {
                        u.hasSize = !0
                    }).on("error.mfploader", function() {
                        u.hasSize = !0;
                        u.loadError = !0;
                        i("LazyLoadError", u)
                    }).attr("src", u.src));
                    u.preloaded = !0
                }
            }
        }
    });
    tt = "retina";
    n.magnificPopup.registerModule(tt, {
        options: {
            replaceSrc: function(n) {
                return n.src.replace(/\.\w+$/, function(n) {
                    return "@2x" + n
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var i = t.st.retina,
                        n = i.ratio;
                    n = isNaN(n) ? n() : n;
                    n > 1 && (r("ImageHasSize." + tt, function(t, i) {
                        i.img.css({
                            "max-width": i.img[0].naturalWidth / n,
                            width: "100%"
                        })
                    }), r("ElementParse." + tt, function(t, r) {
                        r.src = i.replaceSrc(r, n)
                    }))
                }
            }
        }
    });
    ht()
}),
function(n) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], n) : "undefined" != typeof exports ? module.exports = n(require("jquery")) : n(jQuery)
}(function(n) {
    "use strict";
    var t = window.Slick || {};
    t = function() {
        function t(t, r) {
            var f, u = this;
            u.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: n(t),
                appendDots: n(t),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous<\/button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next<\/button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(t, i) {
                    return n('<button type="button" />').text(i + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            };
            u.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            };
            n.extend(u, u.initials);
            u.activeBreakpoint = null;
            u.animType = null;
            u.animProp = null;
            u.breakpoints = [];
            u.breakpointSettings = [];
            u.cssTransitions = !1;
            u.focussed = !1;
            u.interrupted = !1;
            u.hidden = "hidden";
            u.paused = !0;
            u.positionProp = null;
            u.respondTo = null;
            u.rowCount = 1;
            u.shouldClick = !0;
            u.$slider = n(t);
            u.$slidesCache = null;
            u.transformType = null;
            u.transitionType = null;
            u.visibilityChange = "visibilitychange";
            u.windowWidth = 0;
            u.windowTimer = null;
            f = n(t).data("slick") || {};
            u.options = n.extend({}, u.defaults, r, f);
            u.currentSlide = u.options.initialSlide;
            u.originalSettings = u.options;
            "undefined" != typeof document.mozHidden ? (u.hidden = "mozHidden", u.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (u.hidden = "webkitHidden", u.visibilityChange = "webkitvisibilitychange");
            u.autoPlay = n.proxy(u.autoPlay, u);
            u.autoPlayClear = n.proxy(u.autoPlayClear, u);
            u.autoPlayIterator = n.proxy(u.autoPlayIterator, u);
            u.changeSlide = n.proxy(u.changeSlide, u);
            u.clickHandler = n.proxy(u.clickHandler, u);
            u.selectHandler = n.proxy(u.selectHandler, u);
            u.setPosition = n.proxy(u.setPosition, u);
            u.swipeHandler = n.proxy(u.swipeHandler, u);
            u.dragHandler = n.proxy(u.dragHandler, u);
            u.keyHandler = n.proxy(u.keyHandler, u);
            u.instanceUid = i++;
            u.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
            u.registerBreakpoints();
            u.init(!0)
        }
        var i = 0;
        return t
    }();
    t.prototype.activateADA = function() {
        var n = this;
        n.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    };
    t.prototype.addSlide = t.prototype.slickAdd = function(t, i, r) {
        var u = this;
        if ("boolean" == typeof i) r = i, i = null;
        else if (i < 0 || i >= u.slideCount) return !1;
        u.unload();
        "number" == typeof i ? 0 === i && 0 === u.$slides.length ? n(t).appendTo(u.$slideTrack) : r ? n(t).insertBefore(u.$slides.eq(i)) : n(t).insertAfter(u.$slides.eq(i)) : r === !0 ? n(t).prependTo(u.$slideTrack) : n(t).appendTo(u.$slideTrack);
        u.$slides = u.$slideTrack.children(this.options.slide);
        u.$slideTrack.children(this.options.slide).detach();
        u.$slideTrack.append(u.$slides);
        u.$slides.each(function(t, i) {
            n(i).attr("data-slick-index", t)
        });
        u.$slidesCache = u.$slides;
        u.reinit()
    };
    t.prototype.animateHeight = function() {
        var n = this,
            t;
        1 === n.options.slidesToShow && n.options.adaptiveHeight === !0 && n.options.vertical === !1 && (t = n.$slides.eq(n.currentSlide).outerHeight(!0), n.$list.animate({
            height: t
        }, n.options.speed))
    };
    t.prototype.animateSlide = function(t, i) {
        var u = {},
            r = this;
        r.animateHeight();
        r.options.rtl === !0 && r.options.vertical === !1 && (t = -t);
        r.transformsEnabled === !1 ? r.options.vertical === !1 ? r.$slideTrack.animate({
            left: t
        }, r.options.speed, r.options.easing, i) : r.$slideTrack.animate({
            top: t
        }, r.options.speed, r.options.easing, i) : r.cssTransitions === !1 ? (r.options.rtl === !0 && (r.currentLeft = -r.currentLeft), n({
            animStart: r.currentLeft
        }).animate({
            animStart: t
        }, {
            duration: r.options.speed,
            easing: r.options.easing,
            step: function(n) {
                n = Math.ceil(n);
                r.options.vertical === !1 ? (u[r.animType] = "translate(" + n + "px, 0px)", r.$slideTrack.css(u)) : (u[r.animType] = "translate(0px," + n + "px)", r.$slideTrack.css(u))
            },
            complete: function() {
                i && i.call()
            }
        })) : (r.applyTransition(), t = Math.ceil(t), u[r.animType] = r.options.vertical === !1 ? "translate3d(" + t + "px, 0px, 0px)" : "translate3d(0px," + t + "px, 0px)", r.$slideTrack.css(u), i && setTimeout(function() {
            r.disableTransition();
            i.call()
        }, r.options.speed))
    };
    t.prototype.getNavTarget = function() {
        var i = this,
            t = i.options.asNavFor;
        return t && null !== t && (t = n(t).not(i.$slider)), t
    };
    t.prototype.asNavFor = function(t) {
        var r = this,
            i = r.getNavTarget();
        null !== i && "object" == typeof i && i.each(function() {
            var i = n(this).slick("getSlick");
            i.unslicked || i.slideHandler(t, !0)
        })
    };
    t.prototype.applyTransition = function(n) {
        var t = this,
            i = {};
        i[t.transitionType] = t.options.fade === !1 ? t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : "opacity " + t.options.speed + "ms " + t.options.cssEase;
        t.options.fade === !1 ? t.$slideTrack.css(i) : t.$slides.eq(n).css(i)
    };
    t.prototype.autoPlay = function() {
        var n = this;
        n.autoPlayClear();
        n.slideCount > n.options.slidesToShow && (n.autoPlayTimer = setInterval(n.autoPlayIterator, n.options.autoplaySpeed))
    };
    t.prototype.autoPlayClear = function() {
        var n = this;
        n.autoPlayTimer && clearInterval(n.autoPlayTimer)
    };
    t.prototype.autoPlayIterator = function() {
        var n = this,
            t = n.currentSlide + n.options.slidesToScroll;
        n.paused || n.interrupted || n.focussed || (n.options.infinite === !1 && (1 === n.direction && n.currentSlide + 1 === n.slideCount - 1 ? n.direction = 0 : 0 === n.direction && (t = n.currentSlide - n.options.slidesToScroll, n.currentSlide - 1 == 0 && (n.direction = 1))), n.slideHandler(t))
    };
    t.prototype.buildArrows = function() {
        var t = this;
        t.options.arrows === !0 && (t.$prevArrow = n(t.options.prevArrow).addClass("slick-arrow"), t.$nextArrow = n(t.options.nextArrow).addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), t.options.infinite !== !0 && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    };
    t.prototype.buildDots = function() {
        var i, r, t = this;
        if (t.options.dots === !0 && t.slideCount > t.options.slidesToShow) {
            for (t.$slider.addClass("slick-dotted"), r = n("<ul />").addClass(t.options.dotsClass), i = 0; i <= t.getDotCount(); i += 1) r.append(n("<li />").append(t.options.customPaging.call(this, t, i)));
            t.$dots = r.appendTo(t.options.appendDots);
            t.$dots.find("li").first().addClass("slick-active")
        }
    };
    t.prototype.buildOut = function() {
        var t = this;
        t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide");
        t.slideCount = t.$slides.length;
        t.$slides.each(function(t, i) {
            n(i).attr("data-slick-index", t).data("originalStyling", n(i).attr("style") || "")
        });
        t.$slider.addClass("slick-slider");
        t.$slideTrack = 0 === t.slideCount ? n('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent();
        t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent();
        t.$slideTrack.css("opacity", 0);
        t.options.centerMode !== !0 && t.options.swipeToSlide !== !0 || (t.options.slidesToScroll = 1);
        n("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading");
        t.setupInfinite();
        t.buildArrows();
        t.buildDots();
        t.updateDots();
        t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0);
        t.options.draggable === !0 && t.$list.addClass("draggable")
    };
    t.prototype.buildRows = function() {
        var t, i, r, f, c, u, e, n = this,
            o, s, h;
        if (f = document.createDocumentFragment(), u = n.$slider.children(), n.options.rows > 0) {
            for (e = n.options.slidesPerRow * n.options.rows, c = Math.ceil(u.length / e), t = 0; t < c; t++) {
                for (o = document.createElement("div"), i = 0; i < n.options.rows; i++) {
                    for (s = document.createElement("div"), r = 0; r < n.options.slidesPerRow; r++) h = t * e + (i * n.options.slidesPerRow + r), u.get(h) && s.appendChild(u.get(h));
                    o.appendChild(s)
                }
                f.appendChild(o)
            }
            n.$slider.empty().append(f);
            n.$slider.children().children().children().css({
                width: 100 / n.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    };
    t.prototype.checkResponsive = function(t, i) {
        var f, u, e, r = this,
            o = !1,
            s = r.$slider.width(),
            h = window.innerWidth || n(window).width();
        if ("window" === r.respondTo ? e = h : "slider" === r.respondTo ? e = s : "min" === r.respondTo && (e = Math.min(h, s)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            u = null;
            for (f in r.breakpoints) r.breakpoints.hasOwnProperty(f) && (r.originalSettings.mobileFirst === !1 ? e < r.breakpoints[f] && (u = r.breakpoints[f]) : e > r.breakpoints[f] && (u = r.breakpoints[f]));
            null !== u ? null !== r.activeBreakpoint ? (u !== r.activeBreakpoint || i) && (r.activeBreakpoint = u, "unslick" === r.breakpointSettings[u] ? r.unslick(u) : (r.options = n.extend({}, r.originalSettings, r.breakpointSettings[u]), t === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(t)), o = u) : (r.activeBreakpoint = u, "unslick" === r.breakpointSettings[u] ? r.unslick(u) : (r.options = n.extend({}, r.originalSettings, r.breakpointSettings[u]), t === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(t)), o = u) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, t === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(t), o = u);
            t || o === !1 || r.$slider.trigger("breakpoint", [r, o])
        }
    };
    t.prototype.changeSlide = function(t, i) {
        var f, e, o, r = this,
            u = n(t.currentTarget),
            s;
        switch (u.is("a") && t.preventDefault(), u.is("li") || (u = u.closest("li")), o = r.slideCount % r.options.slidesToScroll != 0, f = o ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, t.data.message) {
            case "previous":
                e = 0 === f ? r.options.slidesToScroll : r.options.slidesToShow - f;
                r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - e, !1, i);
                break;
            case "next":
                e = 0 === f ? r.options.slidesToScroll : f;
                r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + e, !1, i);
                break;
            case "index":
                s = 0 === t.data.index ? 0 : t.data.index || u.index() * r.options.slidesToScroll;
                r.slideHandler(r.checkNavigable(s), !1, i);
                u.children().trigger("focus");
                break;
            default:
                return
        }
    };
    t.prototype.checkNavigable = function(n) {
        var t, i, u = this,
            r;
        if (t = u.getNavigableIndexes(), i = 0, n > t[t.length - 1]) n = t[t.length - 1];
        else
            for (r in t) {
                if (n < t[r]) {
                    n = i;
                    break
                }
                i = t[r]
            }
        return n
    };
    t.prototype.cleanUpEvents = function() {
        var t = this;
        t.options.dots && null !== t.$dots && (n("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", n.proxy(t.interrupt, t, !0)).off("mouseleave.slick", n.proxy(t.interrupt, t, !1)), t.options.accessibility === !0 && t.$dots.off("keydown.slick", t.keyHandler));
        t.$slider.off("focus.slick blur.slick");
        t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide), t.options.accessibility === !0 && (t.$prevArrow && t.$prevArrow.off("keydown.slick", t.keyHandler), t.$nextArrow && t.$nextArrow.off("keydown.slick", t.keyHandler)));
        t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler);
        t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler);
        t.$list.off("touchend.slick mouseup.slick", t.swipeHandler);
        t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler);
        t.$list.off("click.slick", t.clickHandler);
        n(document).off(t.visibilityChange, t.visibility);
        t.cleanUpSlideEvents();
        t.options.accessibility === !0 && t.$list.off("keydown.slick", t.keyHandler);
        t.options.focusOnSelect === !0 && n(t.$slideTrack).children().off("click.slick", t.selectHandler);
        n(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange);
        n(window).off("resize.slick.slick-" + t.instanceUid, t.resize);
        n("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault);
        n(window).off("load.slick.slick-" + t.instanceUid, t.setPosition)
    };
    t.prototype.cleanUpSlideEvents = function() {
        var t = this;
        t.$list.off("mouseenter.slick", n.proxy(t.interrupt, t, !0));
        t.$list.off("mouseleave.slick", n.proxy(t.interrupt, t, !1))
    };
    t.prototype.cleanUpRows = function() {
        var n, t = this;
        t.options.rows > 0 && (n = t.$slides.children().children(), n.removeAttr("style"), t.$slider.empty().append(n))
    };
    t.prototype.clickHandler = function(n) {
        var t = this;
        t.shouldClick === !1 && (n.stopImmediatePropagation(), n.stopPropagation(), n.preventDefault())
    };
    t.prototype.destroy = function(t) {
        var i = this;
        i.autoPlayClear();
        i.touchObject = {};
        i.cleanUpEvents();
        n(".slick-cloned", i.$slider).detach();
        i.$dots && i.$dots.remove();
        i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove());
        i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove());
        i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            n(this).attr("style", n(this).data("originalStyling"))
        }), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.detach(), i.$list.detach(), i.$slider.append(i.$slides));
        i.cleanUpRows();
        i.$slider.removeClass("slick-slider");
        i.$slider.removeClass("slick-initialized");
        i.$slider.removeClass("slick-dotted");
        i.unslicked = !0;
        t || i.$slider.trigger("destroy", [i])
    };
    t.prototype.disableTransition = function(n) {
        var t = this,
            i = {};
        i[t.transitionType] = "";
        t.options.fade === !1 ? t.$slideTrack.css(i) : t.$slides.eq(n).css(i)
    };
    t.prototype.fadeSlide = function(n, t) {
        var i = this;
        i.cssTransitions === !1 ? (i.$slides.eq(n).css({
            zIndex: i.options.zIndex
        }), i.$slides.eq(n).animate({
            opacity: 1
        }, i.options.speed, i.options.easing, t)) : (i.applyTransition(n), i.$slides.eq(n).css({
            opacity: 1,
            zIndex: i.options.zIndex
        }), t && setTimeout(function() {
            i.disableTransition(n);
            t.call()
        }, i.options.speed))
    };
    t.prototype.fadeSlideOut = function(n) {
        var t = this;
        t.cssTransitions === !1 ? t.$slides.eq(n).animate({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }, t.options.speed, t.options.easing) : (t.applyTransition(n), t.$slides.eq(n).css({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }))
    };
    t.prototype.filterSlides = t.prototype.slickFilter = function(n) {
        var t = this;
        null !== n && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(n).appendTo(t.$slideTrack), t.reinit())
    };
    t.prototype.focusHandler = function() {
        var t = this;
        t.$slider.off("focus.slick blur.slick").on("focus.slick", "*", function() {
            var i = n(this);
            setTimeout(function() {
                t.options.pauseOnFocus && i.is(":focus") && (t.focussed = !0, t.autoPlay())
            }, 0)
        }).on("blur.slick", "*", function() {
            n(this);
            t.options.pauseOnFocus && (t.focussed = !1, t.autoPlay())
        })
    };
    t.prototype.getCurrent = t.prototype.slickCurrentSlide = function() {
        var n = this;
        return n.currentSlide
    };
    t.prototype.getDotCount = function() {
        var n = this,
            i = 0,
            r = 0,
            t = 0;
        if (n.options.infinite === !0)
            if (n.slideCount <= n.options.slidesToShow) ++t;
            else
                for (; i < n.slideCount;) ++t, i = r + n.options.slidesToScroll, r += n.options.slidesToScroll <= n.options.slidesToShow ? n.options.slidesToScroll : n.options.slidesToShow;
        else if (n.options.centerMode === !0) t = n.slideCount;
        else if (n.options.asNavFor)
            for (; i < n.slideCount;) ++t, i = r + n.options.slidesToScroll, r += n.options.slidesToScroll <= n.options.slidesToShow ? n.options.slidesToScroll : n.options.slidesToShow;
        else t = 1 + Math.ceil((n.slideCount - n.options.slidesToShow) / n.options.slidesToScroll);
        return t - 1
    };
    t.prototype.getLeft = function(n) {
        var f, r, i, e, t = this,
            u = 0;
        return t.slideOffset = 0, r = t.$slides.first().outerHeight(!0), t.options.infinite === !0 ? (t.slideCount > t.options.slidesToShow && (t.slideOffset = t.slideWidth * t.options.slidesToShow * -1, e = -1, t.options.vertical === !0 && t.options.centerMode === !0 && (2 === t.options.slidesToShow ? e = -1.5 : 1 === t.options.slidesToShow && (e = -2)), u = r * t.options.slidesToShow * e), t.slideCount % t.options.slidesToScroll != 0 && n + t.options.slidesToScroll > t.slideCount && t.slideCount > t.options.slidesToShow && (n > t.slideCount ? (t.slideOffset = (t.options.slidesToShow - (n - t.slideCount)) * t.slideWidth * -1, u = (t.options.slidesToShow - (n - t.slideCount)) * r * -1) : (t.slideOffset = t.slideCount % t.options.slidesToScroll * t.slideWidth * -1, u = t.slideCount % t.options.slidesToScroll * r * -1))) : n + t.options.slidesToShow > t.slideCount && (t.slideOffset = (n + t.options.slidesToShow - t.slideCount) * t.slideWidth, u = (n + t.options.slidesToShow - t.slideCount) * r), t.slideCount <= t.options.slidesToShow && (t.slideOffset = 0, u = 0), t.options.centerMode === !0 && t.slideCount <= t.options.slidesToShow ? t.slideOffset = t.slideWidth * Math.floor(t.options.slidesToShow) / 2 - t.slideWidth * t.slideCount / 2 : t.options.centerMode === !0 && t.options.infinite === !0 ? t.slideOffset += t.slideWidth * Math.floor(t.options.slidesToShow / 2) - t.slideWidth : t.options.centerMode === !0 && (t.slideOffset = 0, t.slideOffset += t.slideWidth * Math.floor(t.options.slidesToShow / 2)), f = t.options.vertical === !1 ? n * t.slideWidth * -1 + t.slideOffset : n * r * -1 + u, t.options.variableWidth === !0 && (i = t.slideCount <= t.options.slidesToShow || t.options.infinite === !1 ? t.$slideTrack.children(".slick-slide").eq(n) : t.$slideTrack.children(".slick-slide").eq(n + t.options.slidesToShow), f = t.options.rtl === !0 ? i[0] ? (t.$slideTrack.width() - i[0].offsetLeft - i.width()) * -1 : 0 : i[0] ? i[0].offsetLeft * -1 : 0, t.options.centerMode === !0 && (i = t.slideCount <= t.options.slidesToShow || t.options.infinite === !1 ? t.$slideTrack.children(".slick-slide").eq(n) : t.$slideTrack.children(".slick-slide").eq(n + t.options.slidesToShow + 1), f = t.options.rtl === !0 ? i[0] ? (t.$slideTrack.width() - i[0].offsetLeft - i.width()) * -1 : 0 : i[0] ? i[0].offsetLeft * -1 : 0, f += (t.$list.width() - i.outerWidth()) / 2)), f
    };
    t.prototype.getOption = t.prototype.slickGetOption = function(n) {
        var t = this;
        return t.options[n]
    };
    t.prototype.getNavigableIndexes = function() {
        var i, n = this,
            t = 0,
            r = 0,
            u = [];
        for (n.options.infinite === !1 ? i = n.slideCount : (t = n.options.slidesToScroll * -1, r = n.options.slidesToScroll * -1, i = 2 * n.slideCount); t < i;) u.push(t), t = r + n.options.slidesToScroll, r += n.options.slidesToScroll <= n.options.slidesToShow ? n.options.slidesToScroll : n.options.slidesToShow;
        return u
    };
    t.prototype.getSlick = function() {
        return this
    };
    t.prototype.getSlideCount = function() {
        var f, i, r, u, t = this;
        return u = t.options.centerMode === !0 ? Math.floor(t.$list.width() / 2) : 0, r = t.swipeLeft * -1 + u, t.options.swipeToSlide === !0 ? (t.$slideTrack.find(".slick-slide").each(function(u, f) {
            var e, o, s;
            if (e = n(f).outerWidth(), o = f.offsetLeft, t.options.centerMode !== !0 && (o += e / 2), s = o + e, r < s) return i = f, !1
        }), f = Math.abs(n(i).attr("data-slick-index") - t.currentSlide) || 1) : t.options.slidesToScroll
    };
    t.prototype.goTo = t.prototype.slickGoTo = function(n, t) {
        var i = this;
        i.changeSlide({
            data: {
                message: "index",
                index: parseInt(n)
            }
        }, t)
    };
    t.prototype.init = function(t) {
        var i = this;
        n(i.$slider).hasClass("slick-initialized") || (n(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots(), i.checkResponsive(!0), i.focusHandler());
        t && i.$slider.trigger("init", [i]);
        i.options.accessibility === !0 && i.initADA();
        i.options.autoplay && (i.paused = !1, i.autoPlay())
    };
    t.prototype.initADA = function() {
        var t = this,
            f = Math.ceil(t.slideCount / t.options.slidesToShow),
            r = t.getNavigableIndexes().filter(function(n) {
                return n >= 0 && n < t.slideCount
            }),
            i, u;
        for (t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
                "aria-hidden": "true",
                tabindex: "-1"
            }).find("a, input, button, select").attr({
                tabindex: "-1"
            }), null !== t.$dots && (t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function(i) {
                var f = r.indexOf(i),
                    u;
                (n(this).attr({
                    role: "tabpanel",
                    id: "slick-slide" + t.instanceUid + i,
                    tabindex: -1
                }), f !== -1) && (u = "slick-slide-control" + t.instanceUid + f, n("#" + u).length && n(this).attr({
                    "aria-describedby": u
                }))
            }), t.$dots.attr("role", "tablist").find("li").each(function(i) {
                var u = r[i];
                n(this).attr({
                    role: "presentation"
                });
                n(this).find("button").first().attr({
                    role: "tab",
                    id: "slick-slide-control" + t.instanceUid + i,
                    "aria-controls": "slick-slide" + t.instanceUid + u,
                    "aria-label": i + 1 + " of " + f,
                    "aria-selected": null,
                    tabindex: "-1"
                })
            }).eq(t.currentSlide).find("button").attr({
                "aria-selected": "true",
                tabindex: "0"
            }).end()), i = t.currentSlide, u = i + t.options.slidesToShow; i < u; i++) t.options.focusOnChange ? t.$slides.eq(i).attr({
            tabindex: "0"
        }) : t.$slides.eq(i).removeAttr("tabindex");
        t.activateADA()
    };
    t.prototype.initArrowEvents = function() {
        var n = this;
        n.options.arrows === !0 && n.slideCount > n.options.slidesToShow && (n.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, n.changeSlide), n.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, n.changeSlide), n.options.accessibility === !0 && (n.$prevArrow.on("keydown.slick", n.keyHandler), n.$nextArrow.on("keydown.slick", n.keyHandler)))
    };
    t.prototype.initDotEvents = function() {
        var t = this;
        t.options.dots === !0 && t.slideCount > t.options.slidesToShow && (n("li", t.$dots).on("click.slick", {
            message: "index"
        }, t.changeSlide), t.options.accessibility === !0 && t.$dots.on("keydown.slick", t.keyHandler));
        t.options.dots === !0 && t.options.pauseOnDotsHover === !0 && t.slideCount > t.options.slidesToShow && n("li", t.$dots).on("mouseenter.slick", n.proxy(t.interrupt, t, !0)).on("mouseleave.slick", n.proxy(t.interrupt, t, !1))
    };
    t.prototype.initSlideEvents = function() {
        var t = this;
        t.options.pauseOnHover && (t.$list.on("mouseenter.slick", n.proxy(t.interrupt, t, !0)), t.$list.on("mouseleave.slick", n.proxy(t.interrupt, t, !1)))
    };
    t.prototype.initializeEvents = function() {
        var t = this;
        t.initArrowEvents();
        t.initDotEvents();
        t.initSlideEvents();
        t.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, t.swipeHandler);
        t.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, t.swipeHandler);
        t.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, t.swipeHandler);
        t.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, t.swipeHandler);
        t.$list.on("click.slick", t.clickHandler);
        n(document).on(t.visibilityChange, n.proxy(t.visibility, t));
        t.options.accessibility === !0 && t.$list.on("keydown.slick", t.keyHandler);
        t.options.focusOnSelect === !0 && n(t.$slideTrack).children().on("click.slick", t.selectHandler);
        n(window).on("orientationchange.slick.slick-" + t.instanceUid, n.proxy(t.orientationChange, t));
        n(window).on("resize.slick.slick-" + t.instanceUid, n.proxy(t.resize, t));
        n("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault);
        n(window).on("load.slick.slick-" + t.instanceUid, t.setPosition);
        n(t.setPosition)
    };
    t.prototype.initUI = function() {
        var n = this;
        n.options.arrows === !0 && n.slideCount > n.options.slidesToShow && (n.$prevArrow.show(), n.$nextArrow.show());
        n.options.dots === !0 && n.slideCount > n.options.slidesToShow && n.$dots.show()
    };
    t.prototype.keyHandler = function(n) {
        var t = this;
        n.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === n.keyCode && t.options.accessibility === !0 ? t.changeSlide({
            data: {
                message: t.options.rtl === !0 ? "next" : "previous"
            }
        }) : 39 === n.keyCode && t.options.accessibility === !0 && t.changeSlide({
            data: {
                message: t.options.rtl === !0 ? "previous" : "next"
            }
        }))
    };
    t.prototype.lazyLoad = function() {
        function e(i) {
            n("img[data-lazy]", i).each(function() {
                var i = n(this),
                    r = n(this).attr("data-lazy"),
                    f = n(this).attr("data-srcset"),
                    e = n(this).attr("data-sizes") || t.$slider.attr("data-sizes"),
                    u = document.createElement("img");
                u.onload = function() {
                    i.animate({
                        opacity: 0
                    }, 100, function() {
                        f && (i.attr("srcset", f), e && i.attr("sizes", e));
                        i.attr("src", r).animate({
                            opacity: 1
                        }, 200, function() {
                            i.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        });
                        t.$slider.trigger("lazyLoaded", [t, i, r])
                    })
                };
                u.onerror = function() {
                    i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error");
                    t.$slider.trigger("lazyLoadError", [t, i, r])
                };
                u.src = r
            })
        }
        var u, f, i, r, t = this;
        if (t.options.centerMode === !0 ? t.options.infinite === !0 ? (i = t.currentSlide + (t.options.slidesToShow / 2 + 1), r = i + t.options.slidesToShow + 2) : (i = Math.max(0, t.currentSlide - (t.options.slidesToShow / 2 + 1)), r = 2 + (t.options.slidesToShow / 2 + 1) + t.currentSlide) : (i = t.options.infinite ? t.options.slidesToShow + t.currentSlide : t.currentSlide, r = Math.ceil(i + t.options.slidesToShow), t.options.fade === !0 && (i > 0 && i--, r <= t.slideCount && r++)), u = t.$slider.find(".slick-slide").slice(i, r), "anticipated" === t.options.lazyLoad)
            for (var o = i - 1, s = r, h = t.$slider.find(".slick-slide"), c = 0; c < t.options.slidesToScroll; c++) o < 0 && (o = t.slideCount - 1), u = u.add(h.eq(o)), u = u.add(h.eq(s)), o--, s++;
        e(u);
        t.slideCount <= t.options.slidesToShow ? (f = t.$slider.find(".slick-slide"), e(f)) : t.currentSlide >= t.slideCount - t.options.slidesToShow ? (f = t.$slider.find(".slick-cloned").slice(0, t.options.slidesToShow), e(f)) : 0 === t.currentSlide && (f = t.$slider.find(".slick-cloned").slice(t.options.slidesToShow * -1), e(f))
    };
    t.prototype.loadSlider = function() {
        var n = this;
        n.setPosition();
        n.$slideTrack.css({
            opacity: 1
        });
        n.$slider.removeClass("slick-loading");
        n.initUI();
        "progressive" === n.options.lazyLoad && n.progressiveLazyLoad()
    };
    t.prototype.next = t.prototype.slickNext = function() {
        var n = this;
        n.changeSlide({
            data: {
                message: "next"
            }
        })
    };
    t.prototype.orientationChange = function() {
        var n = this;
        n.checkResponsive();
        n.setPosition()
    };
    t.prototype.pause = t.prototype.slickPause = function() {
        var n = this;
        n.autoPlayClear();
        n.paused = !0
    };
    t.prototype.play = t.prototype.slickPlay = function() {
        var n = this;
        n.autoPlay();
        n.options.autoplay = !0;
        n.paused = !1;
        n.focussed = !1;
        n.interrupted = !1
    };
    t.prototype.postSlide = function(t) {
        var i = this,
            r;
        !i.unslicked && (i.$slider.trigger("afterChange", [i, t]), i.animating = !1, i.slideCount > i.options.slidesToShow && i.setPosition(), i.swipeLeft = null, i.options.autoplay && i.autoPlay(), i.options.accessibility === !0 && (i.initADA(), i.options.focusOnChange)) && (r = n(i.$slides.get(i.currentSlide)), r.attr("tabindex", 0).focus())
    };
    t.prototype.prev = t.prototype.slickPrev = function() {
        var n = this;
        n.changeSlide({
            data: {
                message: "previous"
            }
        })
    };
    t.prototype.preventDefault = function(n) {
        n.preventDefault()
    };
    t.prototype.progressiveLazyLoad = function(t) {
        t = t || 1;
        var r, u, e, o, f, i = this,
            s = n("img[data-lazy]", i.$slider);
        s.length ? (r = s.first(), u = r.attr("data-lazy"), e = r.attr("data-srcset"), o = r.attr("data-sizes") || i.$slider.attr("data-sizes"), f = document.createElement("img"), f.onload = function() {
            e && (r.attr("srcset", e), o && r.attr("sizes", o));
            r.attr("src", u).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
            i.options.adaptiveHeight === !0 && i.setPosition();
            i.$slider.trigger("lazyLoaded", [i, r, u]);
            i.progressiveLazyLoad()
        }, f.onerror = function() {
            t < 3 ? setTimeout(function() {
                i.progressiveLazyLoad(t + 1)
            }, 500) : (r.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), i.$slider.trigger("lazyLoadError", [i, r, u]), i.progressiveLazyLoad())
        }, f.src = u) : i.$slider.trigger("allImagesLoaded", [i])
    };
    t.prototype.refresh = function(t) {
        var r, u, i = this;
        u = i.slideCount - i.options.slidesToShow;
        !i.options.infinite && i.currentSlide > u && (i.currentSlide = u);
        i.slideCount <= i.options.slidesToShow && (i.currentSlide = 0);
        r = i.currentSlide;
        i.destroy(!0);
        n.extend(i, i.initials, {
            currentSlide: r
        });
        i.init();
        t || i.changeSlide({
            data: {
                message: "index",
                index: r
            }
        }, !1)
    };
    t.prototype.registerBreakpoints = function() {
        var u, f, i, t = this,
            r = t.options.responsive || null;
        if ("array" === n.type(r) && r.length) {
            t.respondTo = t.options.respondTo || "window";
            for (u in r)
                if (i = t.breakpoints.length - 1, r.hasOwnProperty(u)) {
                    for (f = r[u].breakpoint; i >= 0;) t.breakpoints[i] && t.breakpoints[i] === f && t.breakpoints.splice(i, 1), i--;
                    t.breakpoints.push(f);
                    t.breakpointSettings[f] = r[u].settings
                }
            t.breakpoints.sort(function(n, i) {
                return t.options.mobileFirst ? n - i : i - n
            })
        }
    };
    t.prototype.reinit = function() {
        var t = this;
        t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide");
        t.slideCount = t.$slides.length;
        t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll);
        t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0);
        t.registerBreakpoints();
        t.setProps();
        t.setupInfinite();
        t.buildArrows();
        t.updateArrows();
        t.initArrowEvents();
        t.buildDots();
        t.updateDots();
        t.initDotEvents();
        t.cleanUpSlideEvents();
        t.initSlideEvents();
        t.checkResponsive(!1, !0);
        t.options.focusOnSelect === !0 && n(t.$slideTrack).children().on("click.slick", t.selectHandler);
        t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0);
        t.setPosition();
        t.focusHandler();
        t.paused = !t.options.autoplay;
        t.autoPlay();
        t.$slider.trigger("reInit", [t])
    };
    t.prototype.resize = function() {
        var t = this;
        n(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function() {
            t.windowWidth = n(window).width();
            t.checkResponsive();
            t.unslicked || t.setPosition()
        }, 50))
    };
    t.prototype.removeSlide = t.prototype.slickRemove = function(n, t, i) {
        var r = this;
        return "boolean" == typeof n ? (t = n, n = t === !0 ? 0 : r.slideCount - 1) : n = t === !0 ? --n : n, !(r.slideCount < 1 || n < 0 || n > r.slideCount - 1) && (r.unload(), i === !0 ? r.$slideTrack.children().remove() : r.$slideTrack.children(this.options.slide).eq(n).remove(), r.$slides = r.$slideTrack.children(this.options.slide), r.$slideTrack.children(this.options.slide).detach(), r.$slideTrack.append(r.$slides), r.$slidesCache = r.$slides, void r.reinit())
    };
    t.prototype.setCSS = function(n) {
        var r, u, t = this,
            i = {};
        t.options.rtl === !0 && (n = -n);
        r = "left" == t.positionProp ? Math.ceil(n) + "px" : "0px";
        u = "top" == t.positionProp ? Math.ceil(n) + "px" : "0px";
        i[t.positionProp] = n;
        t.transformsEnabled === !1 ? t.$slideTrack.css(i) : (i = {}, t.cssTransitions === !1 ? (i[t.animType] = "translate(" + r + ", " + u + ")", t.$slideTrack.css(i)) : (i[t.animType] = "translate3d(" + r + ", " + u + ", 0px)", t.$slideTrack.css(i)))
    };
    t.prototype.setDimensions = function() {
        var n = this,
            t;
        n.options.vertical === !1 ? n.options.centerMode === !0 && n.$list.css({
            padding: "0px " + n.options.centerPadding
        }) : (n.$list.height(n.$slides.first().outerHeight(!0) * n.options.slidesToShow), n.options.centerMode === !0 && n.$list.css({
            padding: n.options.centerPadding + " 0px"
        }));
        n.listWidth = n.$list.width();
        n.listHeight = n.$list.height();
        n.options.vertical === !1 && n.options.variableWidth === !1 ? (n.slideWidth = Math.ceil(n.listWidth / n.options.slidesToShow), n.$slideTrack.width(Math.ceil(n.slideWidth * n.$slideTrack.children(".slick-slide").length))) : n.options.variableWidth === !0 ? n.$slideTrack.width(5e3 * n.slideCount) : (n.slideWidth = Math.ceil(n.listWidth), n.$slideTrack.height(Math.ceil(n.$slides.first().outerHeight(!0) * n.$slideTrack.children(".slick-slide").length)));
        t = n.$slides.first().outerWidth(!0) - n.$slides.first().width();
        n.options.variableWidth === !1 && n.$slideTrack.children(".slick-slide").width(n.slideWidth - t)
    };
    t.prototype.setFade = function() {
        var i, t = this;
        t.$slides.each(function(r, u) {
            i = t.slideWidth * r * -1;
            t.options.rtl === !0 ? n(u).css({
                position: "relative",
                right: i,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            }) : n(u).css({
                position: "relative",
                left: i,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            })
        });
        t.$slides.eq(t.currentSlide).css({
            zIndex: t.options.zIndex - 1,
            opacity: 1
        })
    };
    t.prototype.setHeight = function() {
        var n = this,
            t;
        1 === n.options.slidesToShow && n.options.adaptiveHeight === !0 && n.options.vertical === !1 && (t = n.$slides.eq(n.currentSlide).outerHeight(!0), n.$list.css("height", t))
    };
    t.prototype.setOption = t.prototype.slickSetOption = function() {
        var u, f, e, i, r, t = this,
            o = !1;
        if ("object" === n.type(arguments[0]) ? (e = arguments[0], o = arguments[1], r = "multiple") : "string" === n.type(arguments[0]) && (e = arguments[0], i = arguments[1], o = arguments[2], "responsive" === arguments[0] && "array" === n.type(arguments[1]) ? r = "responsive" : "undefined" != typeof arguments[1] && (r = "single")), "single" === r) t.options[e] = i;
        else if ("multiple" === r) n.each(e, function(n, i) {
            t.options[n] = i
        });
        else if ("responsive" === r)
            for (f in i)
                if ("array" !== n.type(t.options.responsive)) t.options.responsive = [i[f]];
                else {
                    for (u = t.options.responsive.length - 1; u >= 0;) t.options.responsive[u].breakpoint === i[f].breakpoint && t.options.responsive.splice(u, 1), u--;
                    t.options.responsive.push(i[f])
                }
        o && (t.unload(), t.reinit())
    };
    t.prototype.setPosition = function() {
        var n = this;
        n.setDimensions();
        n.setHeight();
        n.options.fade === !1 ? n.setCSS(n.getLeft(n.currentSlide)) : n.setFade();
        n.$slider.trigger("setPosition", [n])
    };
    t.prototype.setProps = function() {
        var n = this,
            t = document.body.style;
        n.positionProp = n.options.vertical === !0 ? "top" : "left";
        "top" === n.positionProp ? n.$slider.addClass("slick-vertical") : n.$slider.removeClass("slick-vertical");
        void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition || n.options.useCSS === !0 && (n.cssTransitions = !0);
        n.options.fade && ("number" == typeof n.options.zIndex ? n.options.zIndex < 3 && (n.options.zIndex = 3) : n.options.zIndex = n.defaults.zIndex);
        void 0 !== t.OTransform && (n.animType = "OTransform", n.transformType = "-o-transform", n.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (n.animType = !1));
        void 0 !== t.MozTransform && (n.animType = "MozTransform", n.transformType = "-moz-transform", n.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (n.animType = !1));
        void 0 !== t.webkitTransform && (n.animType = "webkitTransform", n.transformType = "-webkit-transform", n.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (n.animType = !1));
        void 0 !== t.msTransform && (n.animType = "msTransform", n.transformType = "-ms-transform", n.transitionType = "msTransition", void 0 === t.msTransform && (n.animType = !1));
        void 0 !== t.transform && n.animType !== !1 && (n.animType = "transform", n.transformType = "transform", n.transitionType = "transition");
        n.transformsEnabled = n.options.useTransform && null !== n.animType && n.animType !== !1
    };
    t.prototype.setSlideClasses = function(n) {
        var u, i, r, f, t = this,
            e;
        (i = t.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), t.$slides.eq(n).addClass("slick-current"), t.options.centerMode === !0) ? (e = t.options.slidesToShow % 2 == 0 ? 1 : 0, u = Math.floor(t.options.slidesToShow / 2), t.options.infinite === !0 && (n >= u && n <= t.slideCount - 1 - u ? t.$slides.slice(n - u + e, n + u + 1).addClass("slick-active").attr("aria-hidden", "false") : (r = t.options.slidesToShow + n, i.slice(r - u + 1 + e, r + u + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === n ? i.eq(i.length - 1 - t.options.slidesToShow).addClass("slick-center") : n === t.slideCount - 1 && i.eq(t.options.slidesToShow).addClass("slick-center")), t.$slides.eq(n).addClass("slick-center")) : n >= 0 && n <= t.slideCount - t.options.slidesToShow ? t.$slides.slice(n, n + t.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= t.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (f = t.slideCount % t.options.slidesToShow, r = t.options.infinite === !0 ? t.options.slidesToShow + n : n, t.options.slidesToShow == t.options.slidesToScroll && t.slideCount - n < t.options.slidesToShow ? i.slice(r - (t.options.slidesToShow - f), r + f).addClass("slick-active").attr("aria-hidden", "false") : i.slice(r, r + t.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== t.options.lazyLoad && "anticipated" !== t.options.lazyLoad || t.lazyLoad()
    };
    t.prototype.setupInfinite = function() {
        var i, r, u, t = this;
        if (t.options.fade === !0 && (t.options.centerMode = !1), t.options.infinite === !0 && t.options.fade === !1 && (r = null, t.slideCount > t.options.slidesToShow)) {
            for (u = t.options.centerMode === !0 ? t.options.slidesToShow + 1 : t.options.slidesToShow, i = t.slideCount; i > t.slideCount - u; i -= 1) r = i - 1, n(t.$slides[r]).clone(!0).attr("id", "").attr("data-slick-index", r - t.slideCount).prependTo(t.$slideTrack).addClass("slick-cloned");
            for (i = 0; i < u + t.slideCount; i += 1) r = i, n(t.$slides[r]).clone(!0).attr("id", "").attr("data-slick-index", r + t.slideCount).appendTo(t.$slideTrack).addClass("slick-cloned");
            t.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                n(this).attr("id", "")
            })
        }
    };
    t.prototype.interrupt = function(n) {
        var t = this;
        n || t.autoPlay();
        t.interrupted = n
    };
    t.prototype.selectHandler = function(t) {
        var i = this,
            u = n(t.target).is(".slick-slide") ? n(t.target) : n(t.target).parents(".slick-slide"),
            r = parseInt(u.attr("data-slick-index"));
        return r || (r = 0), i.slideCount <= i.options.slidesToShow ? void i.slideHandler(r, !1, !0) : void i.slideHandler(r)
    };
    t.prototype.slideHandler = function(n, t, i) {
        var u, f, s, o, e, h = null,
            r = this;
        if (t = t || !1, !(r.animating === !0 && r.options.waitForAnimate === !0 || r.options.fade === !0 && r.currentSlide === n)) return t === !1 && r.asNavFor(n), u = n, h = r.getLeft(u), o = r.getLeft(r.currentSlide), r.currentLeft = null === r.swipeLeft ? o : r.swipeLeft, r.options.infinite === !1 && r.options.centerMode === !1 && (n < 0 || n > r.getDotCount() * r.options.slidesToScroll) ? void(r.options.fade === !1 && (u = r.currentSlide, i !== !0 && r.slideCount > r.options.slidesToShow ? r.animateSlide(o, function() {
            r.postSlide(u)
        }) : r.postSlide(u))) : r.options.infinite === !1 && r.options.centerMode === !0 && (n < 0 || n > r.slideCount - r.options.slidesToScroll) ? void(r.options.fade === !1 && (u = r.currentSlide, i !== !0 && r.slideCount > r.options.slidesToShow ? r.animateSlide(o, function() {
            r.postSlide(u)
        }) : r.postSlide(u))) : (r.options.autoplay && clearInterval(r.autoPlayTimer), f = u < 0 ? r.slideCount % r.options.slidesToScroll != 0 ? r.slideCount - r.slideCount % r.options.slidesToScroll : r.slideCount + u : u >= r.slideCount ? r.slideCount % r.options.slidesToScroll != 0 ? 0 : u - r.slideCount : u, r.animating = !0, r.$slider.trigger("beforeChange", [r, r.currentSlide, f]), s = r.currentSlide, r.currentSlide = f, r.setSlideClasses(r.currentSlide), r.options.asNavFor && (e = r.getNavTarget(), e = e.slick("getSlick"), e.slideCount <= e.options.slidesToShow && e.setSlideClasses(r.currentSlide)), r.updateDots(), r.updateArrows(), r.options.fade === !0 ? (i !== !0 ? (r.fadeSlideOut(s), r.fadeSlide(f, function() {
            r.postSlide(f)
        })) : r.postSlide(f), void r.animateHeight()) : void(i !== !0 && r.slideCount > r.options.slidesToShow ? r.animateSlide(h, function() {
            r.postSlide(f)
        }) : r.postSlide(f)))
    };
    t.prototype.startLoad = function() {
        var n = this;
        n.options.arrows === !0 && n.slideCount > n.options.slidesToShow && (n.$prevArrow.hide(), n.$nextArrow.hide());
        n.options.dots === !0 && n.slideCount > n.options.slidesToShow && n.$dots.hide();
        n.$slider.addClass("slick-loading")
    };
    t.prototype.swipeDirection = function() {
        var i, r, u, n, t = this;
        return i = t.touchObject.startX - t.touchObject.curX, r = t.touchObject.startY - t.touchObject.curY, u = Math.atan2(r, i), n = Math.round(180 * u / Math.PI), n < 0 && (n = 360 - Math.abs(n)), n <= 45 && n >= 0 ? t.options.rtl === !1 ? "left" : "right" : n <= 360 && n >= 315 ? t.options.rtl === !1 ? "left" : "right" : n >= 135 && n <= 225 ? t.options.rtl === !1 ? "right" : "left" : t.options.verticalSwiping === !0 ? n >= 35 && n <= 135 ? "down" : "up" : "vertical"
    };
    t.prototype.swipeEnd = function() {
        var t, i, n = this;
        if (n.dragging = !1, n.swiping = !1, n.scrolling) return n.scrolling = !1, !1;
        if (n.interrupted = !1, n.shouldClick = !(n.touchObject.swipeLength > 10), void 0 === n.touchObject.curX) return !1;
        if (n.touchObject.edgeHit === !0 && n.$slider.trigger("edge", [n, n.swipeDirection()]), n.touchObject.swipeLength >= n.touchObject.minSwipe) {
            switch (i = n.swipeDirection()) {
                case "left":
                case "down":
                    t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide + n.getSlideCount()) : n.currentSlide + n.getSlideCount();
                    n.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide - n.getSlideCount()) : n.currentSlide - n.getSlideCount();
                    n.currentDirection = 1
            }
            "vertical" != i && (n.slideHandler(t), n.touchObject = {}, n.$slider.trigger("swipe", [n, i]))
        } else n.touchObject.startX !== n.touchObject.curX && (n.slideHandler(n.currentSlide), n.touchObject = {})
    };
    t.prototype.swipeHandler = function(n) {
        var t = this;
        if (!(t.options.swipe === !1 || "ontouchend" in document && t.options.swipe === !1 || t.options.draggable === !1 && n.type.indexOf("mouse") !== -1)) switch (t.touchObject.fingerCount = n.originalEvent && void 0 !== n.originalEvent.touches ? n.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, t.options.verticalSwiping === !0 && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), n.data.action) {
            case "start":
                t.swipeStart(n);
                break;
            case "move":
                t.swipeMove(n);
                break;
            case "end":
                t.swipeEnd(n)
        }
    };
    t.prototype.swipeMove = function(n) {
        var f, e, r, u, i, o, t = this;
        return i = void 0 !== n.originalEvent ? n.originalEvent.touches : null, !(!t.dragging || t.scrolling || i && 1 !== i.length) && (f = t.getLeft(t.currentSlide), t.touchObject.curX = void 0 !== i ? i[0].pageX : n.clientX, t.touchObject.curY = void 0 !== i ? i[0].pageY : n.clientY, t.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(t.touchObject.curX - t.touchObject.startX, 2))), o = Math.round(Math.sqrt(Math.pow(t.touchObject.curY - t.touchObject.startY, 2))), !t.options.verticalSwiping && !t.swiping && o > 4 ? (t.scrolling = !0, !1) : (t.options.verticalSwiping === !0 && (t.touchObject.swipeLength = o), e = t.swipeDirection(), void 0 !== n.originalEvent && t.touchObject.swipeLength > 4 && (t.swiping = !0, n.preventDefault()), u = (t.options.rtl === !1 ? 1 : -1) * (t.touchObject.curX > t.touchObject.startX ? 1 : -1), t.options.verticalSwiping === !0 && (u = t.touchObject.curY > t.touchObject.startY ? 1 : -1), r = t.touchObject.swipeLength, t.touchObject.edgeHit = !1, t.options.infinite === !1 && (0 === t.currentSlide && "right" === e || t.currentSlide >= t.getDotCount() && "left" === e) && (r = t.touchObject.swipeLength * t.options.edgeFriction, t.touchObject.edgeHit = !0), t.swipeLeft = t.options.vertical === !1 ? f + r * u : f + r * (t.$list.height() / t.listWidth) * u, t.options.verticalSwiping === !0 && (t.swipeLeft = f + r * u), t.options.fade !== !0 && t.options.touchMove !== !1 && (t.animating === !0 ? (t.swipeLeft = null, !1) : void t.setCSS(t.swipeLeft))))
    };
    t.prototype.swipeStart = function(n) {
        var i, t = this;
        return t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow ? (t.touchObject = {}, !1) : (void 0 !== n.originalEvent && void 0 !== n.originalEvent.touches && (i = n.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== i ? i.pageX : n.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== i ? i.pageY : n.clientY, void(t.dragging = !0))
    };
    t.prototype.unfilterSlides = t.prototype.slickUnfilter = function() {
        var n = this;
        null !== n.$slidesCache && (n.unload(), n.$slideTrack.children(this.options.slide).detach(), n.$slidesCache.appendTo(n.$slideTrack), n.reinit())
    };
    t.prototype.unload = function() {
        var t = this;
        n(".slick-cloned", t.$slider).remove();
        t.$dots && t.$dots.remove();
        t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove();
        t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove();
        t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    };
    t.prototype.unslick = function(n) {
        var t = this;
        t.$slider.trigger("unslick", [t, n]);
        t.destroy()
    };
    t.prototype.updateArrows = function() {
        var t, n = this;
        t = Math.floor(n.options.slidesToShow / 2);
        n.options.arrows === !0 && n.slideCount > n.options.slidesToShow && !n.options.infinite && (n.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), n.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === n.currentSlide ? (n.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), n.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : n.currentSlide >= n.slideCount - n.options.slidesToShow && n.options.centerMode === !1 ? (n.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), n.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : n.currentSlide >= n.slideCount - 1 && n.options.centerMode === !0 && (n.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), n.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    };
    t.prototype.updateDots = function() {
        var n = this;
        null !== n.$dots && (n.$dots.find("li").removeClass("slick-active").end(), n.$dots.find("li").eq(Math.floor(n.currentSlide / n.options.slidesToScroll)).addClass("slick-active"))
    };
    t.prototype.visibility = function() {
        var n = this;
        n.options.autoplay && (n.interrupted = document[n.hidden] ? !0 : !1)
    };
    n.fn.slick = function() {
        for (var u, i = this, r = arguments[0], f = Array.prototype.slice.call(arguments, 1), e = i.length, n = 0; n < e; n++)
            if ("object" == typeof r || "undefined" == typeof r ? i[n].slick = new t(i[n], r) : u = i[n].slick[r].apply(i[n].slick, f), "undefined" != typeof u) return u;
        return i
    }
}),
function(n, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : n.Popper = t()
}(this, function() {
    "use strict";

    function ut(n) {
        return n && "[object Function]" === {}.toString.call(n)
    }

    function r(n, t) {
        if (1 !== n.nodeType) return [];
        var i = getComputedStyle(n, null);
        return t ? i[t] : i
    }

    function y(n) {
        return "HTML" === n.nodeName ? n : n.parentNode || n.host
    }

    function s(n) {
        if (!n) return document.body;
        switch (n.nodeName) {
            case "HTML":
            case "BODY":
                return n.ownerDocument.body;
            case "#document":
                return n.body
        }
        var t = r(n),
            i = t.overflow,
            u = t.overflowX,
            f = t.overflowY;
        return /(auto|scroll)/.test(i + f + u) ? n : s(y(n))
    }

    function u(n) {
        var t = n && n.offsetParent,
            i = t && t.nodeName;
        return i && "BODY" !== i && "HTML" !== i ? -1 !== ["TD", "TABLE"].indexOf(t.nodeName) && "static" === r(t, "position") ? u(t) : t : n ? n.ownerDocument.documentElement : document.documentElement
    }

    function ui(n) {
        var t = n.nodeName;
        return "BODY" !== t && ("HTML" === t || u(n.firstElementChild) === n)
    }

    function p(n) {
        return null === n.parentNode ? n : p(n.parentNode)
    }

    function c(n, t) {
        var i, f;
        if (!n || !n.nodeType || !t || !t.nodeType) return document.documentElement;
        var e = n.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
            o = e ? n : t,
            s = e ? t : n,
            r = document.createRange();
        return (r.setStart(o, 0), r.setEnd(s, 0), i = r.commonAncestorContainer, n !== i && t !== i || o.contains(s)) ? ui(i) ? i : u(i) : (f = p(n), f.host ? c(f.host, t) : c(n, p(t).host))
    }

    function f(n) {
        var f = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top",
            t = "top" === f ? "scrollTop" : "scrollLeft",
            i = n.nodeName,
            r, u;
        return "BODY" === i || "HTML" === i ? (r = n.ownerDocument.documentElement, u = n.ownerDocument.scrollingElement || r, u[t]) : n[t]
    }

    function fi(n, t) {
        var e = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            r = f(t, "top"),
            u = f(t, "left"),
            i = e ? -1 : 1;
        return n.top += r * i, n.bottom += r * i, n.left += u * i, n.right += u * i, n
    }

    function ft(n, t) {
        var i = "x" === t ? "Left" : "Top",
            r = "Left" == i ? "Right" : "Bottom";
        return parseFloat(n["border" + i + "Width"], 10) + parseFloat(n["border" + r + "Width"], 10)
    }

    function et(n, t, r, u) {
        return i(t["offset" + n], t["scroll" + n], r["client" + n], r["offset" + n], r["scroll" + n], a() ? r["offset" + n] + u["margin" + ("Height" === n ? "Top" : "Left")] + u["margin" + ("Height" === n ? "Bottom" : "Right")] : 0)
    }

    function ot() {
        var t = document.body,
            n = document.documentElement,
            i = a() && getComputedStyle(n);
        return {
            height: et("Height", t, n, i),
            width: et("Width", t, n, i)
        }
    }

    function t(t) {
        return n({}, t, {
            right: t.left + t.width,
            bottom: t.top + t.height
        })
    }

    function w(n) {
        var i = {},
            e, o, c;
        if (a()) try {
            i = n.getBoundingClientRect();
            e = f(n, "top");
            o = f(n, "left");
            i.top += e;
            i.left += o;
            i.bottom += e;
            i.right += o
        } catch (n) {} else i = n.getBoundingClientRect();
        var u = {
                left: i.left,
                top: i.top,
                width: i.right - i.left,
                height: i.bottom - i.top
            },
            l = "HTML" === n.nodeName ? ot() : {},
            v = l.width || n.clientWidth || u.right - u.left,
            y = l.height || n.clientHeight || u.bottom - u.top,
            s = n.offsetWidth - v,
            h = n.offsetHeight - y;
        return (s || h) && (c = r(n), s -= ft(c, "x"), h -= ft(c, "y"), u.width -= s, u.height -= h), t(u)
    }

    function b(n, i) {
        var y = a(),
            b = "HTML" === i.nodeName,
            f = w(n),
            p = w(i),
            c = s(n),
            e = r(i),
            l = parseFloat(e.borderTopWidth, 10),
            v = parseFloat(e.borderLeftWidth, 10),
            u = t({
                top: f.top - p.top - l,
                left: f.left - p.left - v,
                width: f.width,
                height: f.height
            }),
            o, h;
        return (u.marginTop = 0, u.marginLeft = 0, !y && b) && (o = parseFloat(e.marginTop, 10), h = parseFloat(e.marginLeft, 10), u.top -= l - o, u.bottom -= l - o, u.left -= v - h, u.right -= v - h, u.marginTop = o, u.marginLeft = h), (y ? i.contains(c) : i === c && "BODY" !== c.nodeName) && (u = fi(u, i)), u
    }

    function ei(n) {
        var r = n.ownerDocument.documentElement,
            u = b(n, r),
            e = i(r.clientWidth, window.innerWidth || 0),
            o = i(r.clientHeight, window.innerHeight || 0),
            s = f(r),
            h = f(r, "left"),
            c = {
                top: s - u.top + u.marginTop,
                left: h - u.left + u.marginLeft,
                width: e,
                height: o
            };
        return t(c)
    }

    function st(n) {
        var t = n.nodeName;
        return "BODY" === t || "HTML" === t ? !1 : "fixed" === r(n, "position") || st(y(n))
    }

    function k(n, t, i, r) {
        var u = {
                top: 0,
                left: 0
            },
            o = c(n, t),
            e, f;
        if ("viewport" === r) u = ei(o);
        else if ("scrollParent" === r ? (e = s(y(t)), "BODY" === e.nodeName && (e = n.ownerDocument.documentElement)) : e = "window" === r ? n.ownerDocument.documentElement : r, f = b(e, o), "HTML" !== e.nodeName || st(o)) u = f;
        else {
            var h = ot(),
                l = h.height,
                a = h.width;
            u.top += f.top - f.marginTop;
            u.bottom = l + f.top;
            u.left += f.left - f.marginLeft;
            u.right = a + f.left
        }
        return u.left += i, u.top += i, u.right -= i, u.bottom -= i, u
    }

    function oi(n) {
        var t = n.width,
            i = n.height;
        return t * i
    }

    function ht(t, i, r, u, f) {
        var l = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === t.indexOf("auto")) return t;
        var e = k(r, u, l, f),
            o = {
                top: {
                    width: e.width,
                    height: i.top - e.top
                },
                right: {
                    width: e.right - i.right,
                    height: e.height
                },
                bottom: {
                    width: e.width,
                    height: e.bottom - i.bottom
                },
                left: {
                    width: i.left - e.left,
                    height: e.height
                }
            },
            s = Object.keys(o).map(function(t) {
                return n({
                    key: t
                }, o[t], {
                    area: oi(o[t])
                })
            }).sort(function(n, t) {
                return t.area - n.area
            }),
            h = s.filter(function(n) {
                var t = n.width,
                    i = n.height;
                return t >= r.clientWidth && i >= r.clientHeight
            }),
            a = 0 < h.length ? h[0].key : s[0].key,
            c = t.split("-")[1];
        return a + (c ? "-" + c : "")
    }

    function ct(n, t, i) {
        var r = c(t, i);
        return b(i, r)
    }

    function lt(n) {
        var t = getComputedStyle(n),
            i = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
            r = parseFloat(t.marginLeft) + parseFloat(t.marginRight);
        return {
            width: n.offsetWidth + r,
            height: n.offsetHeight + i
        }
    }

    function l(n) {
        var t = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        return n.replace(/left|right|bottom|top/g, function(n) {
            return t[n]
        })
    }

    function at(n, t, i) {
        i = i.split("-")[0];
        var r = lt(n),
            e = {
                width: r.width,
                height: r.height
            },
            u = -1 !== ["right", "left"].indexOf(i),
            o = u ? "top" : "left",
            f = u ? "left" : "top",
            s = u ? "height" : "width",
            h = u ? "width" : "height";
        return e[o] = t[o] + t[s] / 2 - r[s] / 2, e[f] = i === f ? t[f] - r[h] : t[l(f)], e
    }

    function h(n, t) {
        return Array.prototype.find ? n.find(t) : n.filter(t)[0]
    }

    function si(n, t, i) {
        if (Array.prototype.findIndex) return n.findIndex(function(n) {
            return n[t] === i
        });
        var r = h(n, function(n) {
            return n[t] === i
        });
        return n.indexOf(r)
    }

    function vt(n, i, r) {
        var u = void 0 === r ? n : n.slice(0, si(n, "name", r));
        return u.forEach(function(n) {
            n["function"] && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
            var r = n["function"] || n.fn;
            n.enabled && ut(r) && (i.offsets.popper = t(i.offsets.popper), i.offsets.reference = t(i.offsets.reference), i = r(i, n))
        }), i
    }

    function hi() {
        if (!this.state.isDestroyed) {
            var n = {
                instance: this,
                styles: {},
                arrowStyles: {},
                attributes: {},
                flipped: !1,
                offsets: {}
            };
            n.offsets.reference = ct(this.state, this.popper, this.reference);
            n.placement = ht(this.options.placement, n.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);
            n.originalPlacement = n.placement;
            n.offsets.popper = at(this.popper, n.offsets.reference, n.placement);
            n.offsets.popper.position = "absolute";
            n = vt(this.modifiers, n);
            this.state.isCreated ? this.options.onUpdate(n) : (this.state.isCreated = !0, this.options.onCreate(n))
        }
    }

    function yt(n, t) {
        return n.some(function(n) {
            var i = n.name,
                r = n.enabled;
            return r && i === t
        })
    }

    function pt(n) {
        for (var i, r, u = [!1, "ms", "Webkit", "Moz", "O"], f = n.charAt(0).toUpperCase() + n.slice(1), t = 0; t < u.length - 1; t++)
            if (i = u[t], r = i ? "" + i + f : n, "undefined" != typeof document.body.style[r]) return r;
        return null
    }

    function ci() {
        return this.state.isDestroyed = !0, yt(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.left = "", this.popper.style.position = "", this.popper.style.top = "", this.popper.style[pt("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
    }

    function wt(n) {
        var t = n.ownerDocument;
        return t ? t.defaultView : window
    }

    function bt(n, t, i, r) {
        var f = "BODY" === n.nodeName,
            u = f ? n.ownerDocument.defaultView : n;
        u.addEventListener(t, i, {
            passive: !0
        });
        f || bt(s(u.parentNode), t, i, r);
        r.push(u)
    }

    function li(n, t, i, r) {
        i.updateBound = r;
        wt(n).addEventListener("resize", i.updateBound, {
            passive: !0
        });
        var u = s(n);
        return bt(u, "scroll", i.updateBound, i.scrollParents), i.scrollElement = u, i.eventsEnabled = !0, i
    }

    function ai() {
        this.state.eventsEnabled || (this.state = li(this.reference, this.options, this.state, this.scheduleUpdate))
    }

    function vi(n, t) {
        return wt(n).removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function(n) {
            n.removeEventListener("scroll", t.updateBound)
        }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t
    }

    function yi() {
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = vi(this.reference, this.state))
    }

    function d(n) {
        return "" !== n && !isNaN(parseFloat(n)) && isFinite(n)
    }

    function g(n, t) {
        Object.keys(t).forEach(function(i) {
            var r = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(i) && d(t[i]) && (r = "px");
            n.style[i] = t[i] + r
        })
    }

    function pi(n, t) {
        Object.keys(t).forEach(function(i) {
            var r = t[i];
            !1 === r ? n.removeAttribute(i) : n.setAttribute(i, t[i])
        })
    }

    function kt(n, t, i) {
        var u = h(n, function(n) {
                var i = n.name;
                return i === t
            }),
            f = !!u && n.some(function(n) {
                return n.name === i && n.enabled && n.order < u.order
            }),
            r;
        return f || (r = "`" + t + "`", console.warn("`" + i + "` modifier is required by " + r + " modifier in order to work, be sure to include it before " + r + "!")), f
    }

    function wi(n) {
        return "end" === n ? "start" : "start" === n ? "end" : n
    }

    function dt(n) {
        var r = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            t = it.indexOf(n),
            i = it.slice(t + 1).concat(it.slice(0, t));
        return r ? i.reverse() : i
    }

    function bi(n, r, u, f) {
        var h = n.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
            o = +h[1],
            e = h[2],
            s, c, l;
        if (!o) return n;
        if (0 === e.indexOf("%")) {
            switch (e) {
                case "%p":
                    s = u;
                    break;
                case "%":
                case "%r":
                default:
                    s = f
            }
            return c = t(s), c[r] / 100 * o
        }
        return "vh" === e || "vw" === e ? (l = "vh" === e ? i(document.documentElement.clientHeight, window.innerHeight || 0) : i(document.documentElement.clientWidth, window.innerWidth || 0), l / 100 * o) : o
    }

    function ki(n, t, i, r) {
        var s = [0, 0],
            c = -1 !== ["right", "left"].indexOf(r),
            u = n.split(/(\+|\-)/).map(function(n) {
                return n.trim()
            }),
            f = u.indexOf(h(u, function(n) {
                return -1 !== n.search(/,|\s/)
            })),
            o, e;
        return u[f] && -1 === u[f].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead."), o = /\s*,\s*|\s+/, e = -1 === f ? [u] : [u.slice(0, f).concat([u[f].split(o)[0]]), [u[f].split(o)[1]].concat(u.slice(f + 1))], e = e.map(function(n, r) {
            var f = (1 === r ? !c : c) ? "height" : "width",
                u = !1;
            return n.reduce(function(n, t) {
                return "" === n[n.length - 1] && -1 !== ["+", "-"].indexOf(t) ? (n[n.length - 1] = t, u = !0, n) : u ? (n[n.length - 1] += t, u = !1, n) : n.concat(t)
            }, []).map(function(n) {
                return bi(n, f, t, i)
            })
        }), e.forEach(function(n, t) {
            n.forEach(function(i, r) {
                d(i) && (s[t] += i * ("-" === n[r - 1] ? -1 : 1))
            })
        }), s
    }

    function di(n, t) {
        var r, f = t.offset,
            o = n.placement,
            e = n.offsets,
            i = e.popper,
            s = e.reference,
            u = o.split("-")[0];
        return r = d(+f) ? [+f, 0] : ki(f, i, s, u), "left" === u ? (i.top += r[0], i.left -= r[1]) : "right" === u ? (i.top += r[0], i.left += r[1]) : "top" === u ? (i.left += r[0], i.top -= r[1]) : "bottom" === u && (i.left += r[0], i.top += r[1]), n.popper = i, n
    }
    for (var gt = Math.min, e = Math.floor, i = Math.max, ni = "undefined" != typeof window && "undefined" != typeof document, ti = ["Edge", "Trident", "Firefox"], ii = 0, nt = 0; nt < ti.length; nt += 1)
        if (ni && 0 <= navigator.userAgent.indexOf(ti[nt])) {
            ii = 1;
            break
        }
    var tt, gi = ni && window.Promise,
        nr = gi ? function(n) {
            var t = !1;
            return function() {
                t || (t = !0, window.Promise.resolve().then(function() {
                    t = !1;
                    n()
                }))
            }
        } : function(n) {
            var t = !1;
            return function() {
                t || (t = !0, setTimeout(function() {
                    t = !1;
                    n()
                }, ii))
            }
        },
        a = function() {
            return void 0 == tt && (tt = -1 !== navigator.appVersion.indexOf("MSIE 10")), tt
        },
        tr = function(n, t) {
            if (!(n instanceof t)) throw new TypeError("Cannot call a class as a function");
        },
        ir = function() {
            function n(n, t) {
                for (var i, r = 0; r < t.length; r++) i = t[r], i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(n, i.key, i)
            }
            return function(t, i, r) {
                return i && n(t.prototype, i), r && n(t, r), t
            }
        }(),
        o = function(n, t, i) {
            return t in n ? Object.defineProperty(n, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : n[t] = i, n
        },
        n = Object.assign || function(n) {
            for (var t, r, i = 1; i < arguments.length; i++)
                for (r in t = arguments[i], t) Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
            return n
        },
        ri = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
        it = ri.slice(3),
        rt = {
            FLIP: "flip",
            CLOCKWISE: "clockwise",
            COUNTERCLOCKWISE: "counterclockwise"
        },
        v = function() {
            function t(i, r) {
                var u = this,
                    f = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {},
                    e;
                tr(this, t);
                this.scheduleUpdate = function() {
                    return requestAnimationFrame(u.update)
                };
                this.update = nr(this.update.bind(this));
                this.options = n({}, t.Defaults, f);
                this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                };
                this.reference = i && i.jquery ? i[0] : i;
                this.popper = r && r.jquery ? r[0] : r;
                this.options.modifiers = {};
                Object.keys(n({}, t.Defaults.modifiers, f.modifiers)).forEach(function(i) {
                    u.options.modifiers[i] = n({}, t.Defaults.modifiers[i] || {}, f.modifiers ? f.modifiers[i] : {})
                });
                this.modifiers = Object.keys(this.options.modifiers).map(function(t) {
                    return n({
                        name: t
                    }, u.options.modifiers[t])
                }).sort(function(n, t) {
                    return n.order - t.order
                });
                this.modifiers.forEach(function(n) {
                    n.enabled && ut(n.onLoad) && n.onLoad(u.reference, u.popper, u.options, n, u.state)
                });
                this.update();
                e = this.options.eventsEnabled;
                e && this.enableEventListeners();
                this.state.eventsEnabled = e
            }
            return ir(t, [{
                key: "update",
                value: function() {
                    return hi.call(this)
                }
            }, {
                key: "destroy",
                value: function() {
                    return ci.call(this)
                }
            }, {
                key: "enableEventListeners",
                value: function() {
                    return ai.call(this)
                }
            }, {
                key: "disableEventListeners",
                value: function() {
                    return yi.call(this)
                }
            }]), t
        }();
    return v.Utils = ("undefined" == typeof window ? global : window).PopperUtils, v.placements = ri, v.Defaults = {
        placement: "bottom",
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function() {},
        onUpdate: function() {},
        modifiers: {
            shift: {
                order: 100,
                enabled: !0,
                fn: function(t) {
                    var u = t.placement,
                        l = u.split("-")[0],
                        f = u.split("-")[1];
                    if (f) {
                        var e = t.offsets,
                            r = e.reference,
                            s = e.popper,
                            h = -1 !== ["bottom", "top"].indexOf(l),
                            i = h ? "left" : "top",
                            c = h ? "width" : "height",
                            a = {
                                start: o({}, i, r[i]),
                                end: o({}, i, r[i] + r[c] - s[c])
                            };
                        t.offsets.popper = n({}, s, a[f])
                    }
                    return t
                }
            },
            offset: {
                order: 200,
                enabled: !0,
                fn: di,
                offset: 0
            },
            preventOverflow: {
                order: 300,
                enabled: !0,
                fn: function(t, r) {
                    var s = r.boundariesElement || u(t.instance.popper),
                        e;
                    t.instance.reference === s && (s = u(s));
                    e = k(t.instance.popper, t.instance.reference, r.padding, s);
                    r.boundaries = e;
                    var h = r.priority,
                        f = t.offsets.popper,
                        c = {
                            primary: function(n) {
                                var t = f[n];
                                return f[n] < e[n] && !r.escapeWithReference && (t = i(f[n], e[n])), o({}, n, t)
                            },
                            secondary: function(n) {
                                var t = "right" === n ? "left" : "top",
                                    i = f[t];
                                return f[n] > e[n] && !r.escapeWithReference && (i = gt(f[t], e[n] - ("right" === n ? f.width : f.height))), o({}, t, i)
                            }
                        };
                    return h.forEach(function(t) {
                        var i = -1 === ["left", "top"].indexOf(t) ? "secondary" : "primary";
                        f = n({}, f, c[i](t))
                    }), t.offsets.popper = f, t
                },
                priority: ["left", "right", "top", "bottom"],
                padding: 5,
                boundariesElement: "scrollParent"
            },
            keepTogether: {
                order: 400,
                enabled: !0,
                fn: function(n) {
                    var s = n.offsets,
                        u = s.popper,
                        i = s.reference,
                        h = n.placement.split("-")[0],
                        r = e,
                        f = -1 !== ["top", "bottom"].indexOf(h),
                        o = f ? "right" : "bottom",
                        t = f ? "left" : "top",
                        c = f ? "width" : "height";
                    return u[o] < r(i[t]) && (n.offsets.popper[t] = r(i[t]) - u[c]), u[t] > r(i[o]) && (n.offsets.popper[t] = r(i[o])), n
                }
            },
            arrow: {
                order: 500,
                enabled: !0,
                fn: function(n, u) {
                    var l, e;
                    if (!kt(n.instance.modifiers, "arrow", "keepTogether")) return n;
                    if (e = u.element, "string" == typeof e) {
                        if (e = n.instance.popper.querySelector(e), !e) return n
                    } else if (!n.instance.popper.contains(e)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), n;
                    var d = n.placement.split("-")[0],
                        b = n.offsets,
                        c = b.popper,
                        s = b.reference,
                        a = -1 !== ["left", "right"].indexOf(d),
                        y = a ? "height" : "width",
                        p = a ? "Top" : "Left",
                        f = p.toLowerCase(),
                        g = a ? "left" : "top",
                        v = a ? "bottom" : "right",
                        h = lt(e)[y];
                    s[v] - h < c[f] && (n.offsets.popper[f] -= c[f] - (s[v] - h));
                    s[f] + h > c[v] && (n.offsets.popper[f] += s[f] + h - c[v]);
                    n.offsets.popper = t(n.offsets.popper);
                    var nt = s[f] + s[y] / 2 - h / 2,
                        k = r(n.instance.popper),
                        tt = parseFloat(k["margin" + p], 10),
                        it = parseFloat(k["border" + p + "Width"], 10),
                        w = nt - n.offsets.popper[f] - tt - it;
                    return w = i(gt(c[y] - h, w), 0), n.arrowElement = e, n.offsets.arrow = (l = {}, o(l, f, Math.round(w)), o(l, g, ""), l), n
                },
                element: "[x-arrow]"
            },
            flip: {
                order: 600,
                enabled: !0,
                fn: function(t, i) {
                    if (yt(t.instance.modifiers, "inner") || t.flipped && t.placement === t.originalPlacement) return t;
                    var o = k(t.instance.popper, t.instance.reference, i.padding, i.boundariesElement),
                        r = t.placement.split("-")[0],
                        s = l(r),
                        u = t.placement.split("-")[1] || "",
                        f = [];
                    switch (i.behavior) {
                        case rt.FLIP:
                            f = [r, s];
                            break;
                        case rt.CLOCKWISE:
                            f = dt(r);
                            break;
                        case rt.COUNTERCLOCKWISE:
                            f = dt(r, !0);
                            break;
                        default:
                            f = i.behavior
                    }
                    return f.forEach(function(h, c) {
                        if (r !== h || f.length === c + 1) return t;
                        r = t.placement.split("-")[0];
                        s = l(r);
                        var v = t.offsets.popper,
                            y = t.offsets.reference,
                            a = e,
                            w = "left" === r && a(v.right) > a(y.left) || "right" === r && a(v.left) < a(y.right) || "top" === r && a(v.bottom) > a(y.top) || "bottom" === r && a(v.top) < a(y.bottom),
                            b = a(v.left) < a(o.left),
                            k = a(v.right) > a(o.right),
                            d = a(v.top) < a(o.top),
                            g = a(v.bottom) > a(o.bottom),
                            nt = "left" === r && b || "right" === r && k || "top" === r && d || "bottom" === r && g,
                            p = -1 !== ["top", "bottom"].indexOf(r),
                            tt = !!i.flipVariations && (p && "start" === u && b || p && "end" === u && k || !p && "start" === u && d || !p && "end" === u && g);
                        (w || nt || tt) && (t.flipped = !0, (w || nt) && (r = f[c + 1]), tt && (u = wi(u)), t.placement = r + (u ? "-" + u : ""), t.offsets.popper = n({}, t.offsets.popper, at(t.instance.popper, t.offsets.reference, t.placement)), t = vt(t.instance.modifiers, t, "flip"))
                    }), t
                },
                behavior: "flip",
                padding: 5,
                boundariesElement: "viewport"
            },
            inner: {
                order: 700,
                enabled: !1,
                fn: function(n) {
                    var u = n.placement,
                        i = u.split("-")[0],
                        f = n.offsets,
                        r = f.popper,
                        o = f.reference,
                        e = -1 !== ["left", "right"].indexOf(i),
                        s = -1 === ["top", "left"].indexOf(i);
                    return r[e ? "left" : "top"] = o[i] - (s ? r[e ? "width" : "height"] : 0), n.placement = l(u), n.offsets.popper = t(r), n
                }
            },
            hide: {
                order: 800,
                enabled: !0,
                fn: function(n) {
                    if (!kt(n.instance.modifiers, "hide", "preventOverflow")) return n;
                    var t = n.offsets.reference,
                        i = h(n.instance.modifiers, function(n) {
                            return "preventOverflow" === n.name
                        }).boundaries;
                    if (t.bottom < i.top || t.left > i.right || t.top > i.bottom || t.right < i.left) {
                        if (!0 === n.hide) return n;
                        n.hide = !0;
                        n.attributes["x-out-of-boundaries"] = ""
                    } else {
                        if (!1 === n.hide) return n;
                        n.hide = !1;
                        n.attributes["x-out-of-boundaries"] = !1
                    }
                    return n
                }
            },
            computeStyle: {
                order: 850,
                enabled: !0,
                fn: function(t, i) {
                    var g = i.x,
                        nt = i.y,
                        f = t.offsets.popper,
                        l = h(t.instance.modifiers, function(n) {
                            return "applyStyle" === n.name
                        }).gpuAcceleration,
                        b, k, d;
                    void 0 !== l && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                    var a, v, tt = void 0 === l ? i.gpuAcceleration : l,
                        it = u(t.instance.popper),
                        y = w(it),
                        r = {
                            position: f.position
                        },
                        c = {
                            left: e(f.left),
                            top: e(f.top),
                            bottom: e(f.bottom),
                            right: e(f.right)
                        },
                        o = "bottom" === g ? "top" : "bottom",
                        s = "right" === nt ? "left" : "right",
                        p = pt("transform");
                    return (v = "bottom" == o ? -y.height + c.bottom : c.top, a = "right" == s ? -y.width + c.right : c.left, tt && p) ? (r[p] = "translate3d(" + a + "px, " + v + "px, 0)", r[o] = 0, r[s] = 0, r.willChange = "transform") : (b = "bottom" == o ? -1 : 1, k = "right" == s ? -1 : 1, r[o] = v * b, r[s] = a * k, r.willChange = o + ", " + s), d = {
                        "x-placement": t.placement
                    }, t.attributes = n({}, d, t.attributes), t.styles = n({}, r, t.styles), t.arrowStyles = n({}, t.offsets.arrow, t.arrowStyles), t
                },
                gpuAcceleration: !0,
                x: "bottom",
                y: "right"
            },
            applyStyle: {
                order: 900,
                enabled: !0,
                fn: function(n) {
                    return g(n.instance.popper, n.styles), pi(n.instance.popper, n.attributes), n.arrowElement && Object.keys(n.arrowStyles).length && g(n.arrowElement, n.arrowStyles), n
                },
                onLoad: function(n, t, i, r, u) {
                    var f = ct(u, t, n),
                        e = ht(i.placement, f, t, n, i.modifiers.flip.boundariesElement, i.modifiers.flip.padding);
                    return t.setAttribute("x-placement", e), g(t, {
                        position: "absolute"
                    }), i
                },
                gpuAcceleration: void 0
            }
        }
    }, v
});
/*!
 * Bootstrap v4.6.0 (https://getbootstrap.com/)
 * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
! function(n, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], t) : t((n = "undefined" != typeof globalThis ? globalThis : n || self).bootstrap = {}, n.jQuery, n.Popper)
}(this, function(n, t, i) {
    "use strict";

    function st(n) {
        return n && "object" == typeof n && "default" in n ? n : {
            "default": n
        }
    }

    function ht(n, t) {
        for (var i, r = 0; r < t.length; r++) i = t[r], i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(n, i.key, i)
    }

    function e(n, t, i) {
        return t && ht(n.prototype, t), i && ht(n, i), n
    }

    function f() {
        return (f = Object.assign || function(n) {
            for (var i, r, t = 1; t < arguments.length; t++) {
                i = arguments[t];
                for (r in i) Object.prototype.hasOwnProperty.call(i, r) && (n[r] = i[r])
            }
            return n
        }).apply(this, arguments)
    }

    function wt(n) {
        var i = this,
            t = !1;
        return r.default(this).one(u.TRANSITION_END, function() {
            t = !0
        }), setTimeout(function() {
            t || u.triggerTransitionEnd(i)
        }, n), this
    }

    function at(n, t, i) {
        if (0 === n.length) return n;
        if (i && "function" == typeof i) return i(n);
        for (var u = (new window.DOMParser).parseFromString(n, "text/html"), e = Object.keys(t), f = [].slice.call(u.body.querySelectorAll("*")), o = function(n) {
                var i = f[n],
                    o = i.nodeName.toLowerCase(),
                    r, u;
                if (-1 === e.indexOf(i.nodeName.toLowerCase())) return i.parentNode.removeChild(i), "continue";
                r = [].slice.call(i.attributes);
                u = [].concat(t["*"] || [], t[o] || []);
                r.forEach(function(n) {
                    (function(n, t) {
                        var i = n.nodeName.toLowerCase();
                        if (-1 !== t.indexOf(i)) return -1 === si.indexOf(i) || Boolean(n.nodeValue.match(hi) || n.nodeValue.match(ci));
                        for (var u = t.filter(function(n) {
                                return n instanceof RegExp
                            }), r = 0, f = u.length; r < f; r++)
                            if (i.match(u[r])) return !0;
                        return !1
                    })(n, u) || i.removeAttribute(n.nodeName)
                })
            }, r = 0, s = f.length; r < s; r++) o(r);
        return u.body.innerHTML
    }
    var r = st(t),
        it = st(i),
        u = {
            TRANSITION_END: "bsTransitionEnd",
            getUID: function(n) {
                do n += ~~(1e6 * Math.random()); while (document.getElementById(n));
                return n
            },
            getSelectorFromElement: function(n) {
                var t = n.getAttribute("data-target"),
                    i;
                t && "#" !== t || (i = n.getAttribute("href"), t = i && "#" !== i ? i.trim() : "");
                try {
                    return document.querySelector(t) ? t : null
                } catch (n) {
                    return null
                }
            },
            getTransitionDurationFromElement: function(n) {
                if (!n) return 0;
                var t = r.default(n).css("transition-duration"),
                    i = r.default(n).css("transition-delay"),
                    u = parseFloat(t),
                    f = parseFloat(i);
                return u || f ? (t = t.split(",")[0], i = i.split(",")[0], 1e3 * (parseFloat(t) + parseFloat(i))) : 0
            },
            reflow: function(n) {
                return n.offsetHeight
            },
            triggerTransitionEnd: function(n) {
                r.default(n).trigger("transitionend")
            },
            supportsTransitionEnd: function() {
                return Boolean("transitionend")
            },
            isElement: function(n) {
                return (n[0] || n).nodeType
            },
            typeCheckConfig: function(n, t, i) {
                var r, f;
                for (r in i)
                    if (Object.prototype.hasOwnProperty.call(i, r)) {
                        var o = i[r],
                            e = t[r],
                            s = e && u.isElement(e) ? "element" : null === (f = e) || "undefined" == typeof f ? "" + f : {}.toString.call(f).match(/\s([a-z]+)/i)[1].toLowerCase();
                        if (!new RegExp(o).test(s)) throw new Error(n.toUpperCase() + ': Option "' + r + '" provided type "' + s + '" but expected type "' + o + '".');
                    }
            },
            findShadowRoot: function(n) {
                if (!document.documentElement.attachShadow) return null;
                if ("function" == typeof n.getRootNode) {
                    var t = n.getRootNode();
                    return t instanceof ShadowRoot ? t : null
                }
                return n instanceof ShadowRoot ? n : n.parentNode ? u.findShadowRoot(n.parentNode) : null
            },
            jQueryDetection: function() {
                if ("undefined" == typeof r.default) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
                var n = r.default.fn.jquery.split(" ")[0].split(".");
                if (n[0] < 2 && n[1] < 9 || 1 === n[0] && 9 === n[1] && n[2] < 1 || n[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0");
            }
        },
        ct, a, yt, k;
    u.jQueryDetection();
    r.default.fn.emulateTransitionEnd = wt;
    r.default.event.special[u.TRANSITION_END] = {
        bindType: "transitionend",
        delegateType: "transitionend",
        handle: function(n) {
            if (r.default(n.target).is(this)) return n.handleObj.handler.apply(this, arguments)
        }
    };
    var d = "alert",
        bt = r.default.fn[d],
        l = function() {
            function n(n) {
                this._element = n
            }
            var t = n.prototype;
            return t.close = function(n) {
                var t = this._element;
                n && (t = this._getRootElement(n));
                this._triggerCloseEvent(t).isDefaultPrevented() || this._removeElement(t)
            }, t.dispose = function() {
                r.default.removeData(this._element, "bs.alert");
                this._element = null
            }, t._getRootElement = function(n) {
                var i = u.getSelectorFromElement(n),
                    t = !1;
                return i && (t = document.querySelector(i)), t || (t = r.default(n).closest(".alert")[0]), t
            }, t._triggerCloseEvent = function(n) {
                var t = r.default.Event("close.bs.alert");
                return r.default(n).trigger(t), t
            }, t._removeElement = function(n) {
                var i = this,
                    t;
                (r.default(n).removeClass("show"), r.default(n).hasClass("fade")) ? (t = u.getTransitionDurationFromElement(n), r.default(n).one(u.TRANSITION_END, function(t) {
                    return i._destroyElement(n, t)
                }).emulateTransitionEnd(t)) : this._destroyElement(n)
            }, t._destroyElement = function(n) {
                r.default(n).detach().trigger("closed.bs.alert").remove()
            }, n._jQueryInterface = function(t) {
                return this.each(function() {
                    var u = r.default(this),
                        i = u.data("bs.alert");
                    i || (i = new n(this), u.data("bs.alert", i));
                    "close" === t && i[t](this)
                })
            }, n._handleDismiss = function(n) {
                return function(t) {
                    t && t.preventDefault();
                    n.close(this)
                }
            }, e(n, null, [{
                key: "VERSION",
                get: function() {
                    return "4.6.0"
                }
            }]), n
        }();
    r.default(document).on("click.bs.alert.data-api", '[data-dismiss="alert"]', l._handleDismiss(new l));
    r.default.fn[d] = l._jQueryInterface;
    r.default.fn[d].Constructor = l;
    r.default.fn[d].noConflict = function() {
        return r.default.fn[d] = bt, l._jQueryInterface
    };
    ct = r.default.fn.button;
    a = function() {
        function n(n) {
            this._element = n;
            this.shouldAvoidTriggerChange = !1
        }
        var t = n.prototype;
        return t.toggle = function() {
            var t = !0,
                u = !0,
                f = r.default(this._element).closest('[data-toggle="buttons"]')[0],
                n, i;
            f && (n = this._element.querySelector('input:not([type="hidden"])'), n && ("radio" === n.type && (n.checked && this._element.classList.contains("active") ? t = !1 : (i = f.querySelector(".active"), i && r.default(i).removeClass("active"))), t && ("checkbox" !== n.type && "radio" !== n.type || (n.checked = !this._element.classList.contains("active")), this.shouldAvoidTriggerChange || r.default(n).trigger("change")), n.focus(), u = !1));
            this._element.hasAttribute("disabled") || this._element.classList.contains("disabled") || (u && this._element.setAttribute("aria-pressed", !this._element.classList.contains("active")), t && r.default(this._element).toggleClass("active"))
        }, t.dispose = function() {
            r.default.removeData(this._element, "bs.button");
            this._element = null
        }, n._jQueryInterface = function(t, i) {
            return this.each(function() {
                var f = r.default(this),
                    u = f.data("bs.button");
                u || (u = new n(this), f.data("bs.button", u));
                u.shouldAvoidTriggerChange = i;
                "toggle" === t && u[t]()
            })
        }, e(n, null, [{
            key: "VERSION",
            get: function() {
                return "4.6.0"
            }
        }]), n
    }();
    r.default(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(n) {
        var t = n.target,
            u = t,
            i;
        if (r.default(t).hasClass("btn") || (t = r.default(t).closest(".btn")[0]), !t || t.hasAttribute("disabled") || t.classList.contains("disabled")) n.preventDefault();
        else {
            if (i = t.querySelector('input:not([type="hidden"])'), i && (i.hasAttribute("disabled") || i.classList.contains("disabled"))) return void n.preventDefault();
            "INPUT" !== u.tagName && "LABEL" === t.tagName || a._jQueryInterface.call(r.default(t), "toggle", "INPUT" === u.tagName)
        }
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(n) {
        var t = r.default(n.target).closest(".btn")[0];
        r.default(t).toggleClass("focus", /^focus(in)?$/.test(n.type))
    });
    r.default(window).on("load.bs.button.data-api", function() {
        for (var t, f, i, e, r, n = [].slice.call(document.querySelectorAll('[data-toggle="buttons"] .btn')), u = 0, o = n.length; u < o; u++) t = n[u], f = t.querySelector('input:not([type="hidden"])'), f.checked || f.hasAttribute("checked") ? t.classList.add("active") : t.classList.remove("active");
        for (i = 0, e = (n = [].slice.call(document.querySelectorAll('[data-toggle="button"]'))).length; i < e; i++) r = n[i], "true" === r.getAttribute("aria-pressed") ? r.classList.add("active") : r.classList.remove("active")
    });
    r.default.fn.button = a._jQueryInterface;
    r.default.fn.button.Constructor = a;
    r.default.fn.button.noConflict = function() {
        return r.default.fn.button = ct, a._jQueryInterface
    };
    var v = "carousel",
        kt = ".bs.carousel",
        dt = r.default.fn[v],
        ft = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0,
            touch: !0
        },
        gt = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean"
        },
        lt = {
            TOUCH: "touch",
            PEN: "pen"
        },
        y = function() {
            function t(n, t) {
                this._items = null;
                this._interval = null;
                this._activeElement = null;
                this._isPaused = !1;
                this._isSliding = !1;
                this.touchTimeout = null;
                this.touchStartX = 0;
                this.touchDeltaX = 0;
                this._config = this._getConfig(t);
                this._element = n;
                this._indicatorsElement = this._element.querySelector(".carousel-indicators");
                this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
                this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);
                this._addEventListeners()
            }
            var n = t.prototype;
            return n.next = function() {
                this._isSliding || this._slide("next")
            }, n.nextWhenVisible = function() {
                var n = r.default(this._element);
                !document.hidden && n.is(":visible") && "hidden" !== n.css("visibility") && this.next()
            }, n.prev = function() {
                this._isSliding || this._slide("prev")
            }, n.pause = function(n) {
                n || (this._isPaused = !0);
                this._element.querySelector(".carousel-item-next, .carousel-item-prev") && (u.triggerTransitionEnd(this._element), this.cycle(!0));
                clearInterval(this._interval);
                this._interval = null
            }, n.cycle = function(n) {
                n || (this._isPaused = !1);
                this._interval && (clearInterval(this._interval), this._interval = null);
                this._config.interval && !this._isPaused && (this._updateInterval(), this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
            }, n.to = function(n) {
                var u = this,
                    t, i;
                if (this._activeElement = this._element.querySelector(".active.carousel-item"), t = this._getItemIndex(this._activeElement), !(n > this._items.length - 1 || n < 0))
                    if (this._isSliding) r.default(this._element).one("slid.bs.carousel", function() {
                        return u.to(n)
                    });
                    else {
                        if (t === n) return this.pause(), void this.cycle();
                        i = n > t ? "next" : "prev";
                        this._slide(i, this._items[n])
                    }
            }, n.dispose = function() {
                r.default(this._element).off(kt);
                r.default.removeData(this._element, "bs.carousel");
                this._items = null;
                this._config = null;
                this._element = null;
                this._interval = null;
                this._isPaused = null;
                this._isSliding = null;
                this._activeElement = null;
                this._indicatorsElement = null
            }, n._getConfig = function(n) {
                return n = f({}, ft, n), u.typeCheckConfig(v, n, gt), n
            }, n._handleSwipe = function() {
                var t = Math.abs(this.touchDeltaX),
                    n;
                t <= 40 || (n = t / this.touchDeltaX, this.touchDeltaX = 0, n > 0 && this.prev(), n < 0 && this.next())
            }, n._addEventListeners = function() {
                var n = this;
                this._config.keyboard && r.default(this._element).on("keydown.bs.carousel", function(t) {
                    return n._keydown(t)
                });
                "hover" === this._config.pause && r.default(this._element).on("mouseenter.bs.carousel", function(t) {
                    return n.pause(t)
                }).on("mouseleave.bs.carousel", function(t) {
                    return n.cycle(t)
                });
                this._config.touch && this._addTouchEventListeners()
            }, n._addTouchEventListeners = function() {
                var n = this,
                    t, i;
                this._touchSupported && (t = function(t) {
                    n._pointerEvent && lt[t.originalEvent.pointerType.toUpperCase()] ? n.touchStartX = t.originalEvent.clientX : n._pointerEvent || (n.touchStartX = t.originalEvent.touches[0].clientX)
                }, i = function(t) {
                    n._pointerEvent && lt[t.originalEvent.pointerType.toUpperCase()] && (n.touchDeltaX = t.originalEvent.clientX - n.touchStartX);
                    n._handleSwipe();
                    "hover" === n._config.pause && (n.pause(), n.touchTimeout && clearTimeout(n.touchTimeout), n.touchTimeout = setTimeout(function(t) {
                        return n.cycle(t)
                    }, 500 + n._config.interval))
                }, r.default(this._element.querySelectorAll(".carousel-item img")).on("dragstart.bs.carousel", function(n) {
                    return n.preventDefault()
                }), this._pointerEvent ? (r.default(this._element).on("pointerdown.bs.carousel", function(n) {
                    return t(n)
                }), r.default(this._element).on("pointerup.bs.carousel", function(n) {
                    return i(n)
                }), this._element.classList.add("pointer-event")) : (r.default(this._element).on("touchstart.bs.carousel", function(n) {
                    return t(n)
                }), r.default(this._element).on("touchmove.bs.carousel", function(t) {
                    return function(t) {
                        n.touchDeltaX = t.originalEvent.touches && t.originalEvent.touches.length > 1 ? 0 : t.originalEvent.touches[0].clientX - n.touchStartX
                    }(t)
                }), r.default(this._element).on("touchend.bs.carousel", function(n) {
                    return i(n)
                })))
            }, n._keydown = function(n) {
                if (!/input|textarea/i.test(n.target.tagName)) switch (n.which) {
                    case 37:
                        n.preventDefault();
                        this.prev();
                        break;
                    case 39:
                        n.preventDefault();
                        this.next()
                }
            }, n._getItemIndex = function(n) {
                return this._items = n && n.parentNode ? [].slice.call(n.parentNode.querySelectorAll(".carousel-item")) : [], this._items.indexOf(n)
            }, n._getItemByDirection = function(n, t) {
                var u = "next" === n,
                    f = "prev" === n,
                    i = this._getItemIndex(t),
                    e = this._items.length - 1,
                    r;
                return (f && 0 === i || u && i === e) && !this._config.wrap ? t : (r = (i + ("prev" === n ? -1 : 1)) % this._items.length, -1 === r ? this._items[this._items.length - 1] : this._items[r])
            }, n._triggerSlideEvent = function(n, t) {
                var u = this._getItemIndex(n),
                    f = this._getItemIndex(this._element.querySelector(".active.carousel-item")),
                    i = r.default.Event("slide.bs.carousel", {
                        relatedTarget: n,
                        direction: t,
                        from: f,
                        to: u
                    });
                return r.default(this._element).trigger(i), i
            }, n._setActiveIndicatorElement = function(n) {
                var i, t;
                this._indicatorsElement && (i = [].slice.call(this._indicatorsElement.querySelectorAll(".active")), r.default(i).removeClass("active"), t = this._indicatorsElement.children[this._getItemIndex(n)], t && r.default(t).addClass("active"))
            }, n._updateInterval = function() {
                var t = this._activeElement || this._element.querySelector(".active.carousel-item"),
                    n;
                t && (n = parseInt(t.getAttribute("data-interval"), 10), n ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = n) : this._config.interval = this._config.defaultInterval || this._config.interval)
            }, n._slide = function(n, t) {
                var e, o, s, c = this,
                    f = this._element.querySelector(".active.carousel-item"),
                    v = this._getItemIndex(f),
                    i = t || f && this._getItemByDirection(n, f),
                    y = this._getItemIndex(i),
                    l = Boolean(this._interval),
                    h, a;
                ("next" === n ? (e = "carousel-item-left", o = "carousel-item-next", s = "left") : (e = "carousel-item-right", o = "carousel-item-prev", s = "right"), i && r.default(i).hasClass("active")) ? this._isSliding = !1: !this._triggerSlideEvent(i, s).isDefaultPrevented() && f && i && (this._isSliding = !0, l && this.pause(), this._setActiveIndicatorElement(i), this._activeElement = i, h = r.default.Event("slid.bs.carousel", {
                    relatedTarget: i,
                    direction: s,
                    from: v,
                    to: y
                }), r.default(this._element).hasClass("slide") ? (r.default(i).addClass(o), u.reflow(i), r.default(f).addClass(e), r.default(i).addClass(e), a = u.getTransitionDurationFromElement(f), r.default(f).one(u.TRANSITION_END, function() {
                    r.default(i).removeClass(e + " " + o).addClass("active");
                    r.default(f).removeClass("active " + o + " " + e);
                    c._isSliding = !1;
                    setTimeout(function() {
                        return r.default(c._element).trigger(h)
                    }, 0)
                }).emulateTransitionEnd(a)) : (r.default(f).removeClass("active"), r.default(i).addClass("active"), this._isSliding = !1, r.default(this._element).trigger(h)), l && this.cycle())
            }, t._jQueryInterface = function(n) {
                return this.each(function() {
                    var i = r.default(this).data("bs.carousel"),
                        u = f({}, ft, r.default(this).data()),
                        e;
                    if ("object" == typeof n && (u = f({}, u, n)), e = "string" == typeof n ? n : u.slide, i || (i = new t(this, u), r.default(this).data("bs.carousel", i)), "number" == typeof n) i.to(n);
                    else if ("string" == typeof e) {
                        if ("undefined" == typeof i[e]) throw new TypeError('No method named "' + e + '"');
                        i[e]()
                    } else u.interval && u.ride && (i.pause(), i.cycle())
                })
            }, t._dataApiClickHandler = function(n) {
                var s = u.getSelectorFromElement(this),
                    i, o, e;
                s && (i = r.default(s)[0], i && r.default(i).hasClass("carousel") && (o = f({}, r.default(i).data(), r.default(this).data()), e = this.getAttribute("data-slide-to"), e && (o.interval = !1), t._jQueryInterface.call(r.default(i), o), e && r.default(i).data("bs.carousel").to(e), n.preventDefault()))
            }, e(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.6.0"
                }
            }, {
                key: "Default",
                get: function() {
                    return ft
                }
            }]), t
        }();
    r.default(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", y._dataApiClickHandler);
    r.default(window).on("load.bs.carousel.data-api", function() {
        for (var t, i = [].slice.call(document.querySelectorAll('[data-ride="carousel"]')), n = 0, u = i.length; n < u; n++) t = r.default(i[n]), y._jQueryInterface.call(t, t.data())
    });
    r.default.fn[v] = y._jQueryInterface;
    r.default.fn[v].Constructor = y;
    r.default.fn[v].noConflict = function() {
        return r.default.fn[v] = dt, y._jQueryInterface
    };
    var p = "collapse",
        ni = r.default.fn[p],
        et = {
            toggle: !0,
            parent: ""
        },
        ti = {
            toggle: "boolean",
            parent: "(string|element)"
        },
        g = function() {
            function t(n, t) {
                this._isTransitioning = !1;
                this._element = n;
                this._config = this._getConfig(t);
                this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + n.id + '"],[data-toggle="collapse"][data-target="#' + n.id + '"]'));
                for (var f = [].slice.call(document.querySelectorAll('[data-toggle="collapse"]')), i = 0, o = f.length; i < o; i++) {
                    var e = f[i],
                        r = u.getSelectorFromElement(e),
                        s = [].slice.call(document.querySelectorAll(r)).filter(function(t) {
                            return t === n
                        });
                    null !== r && s.length > 0 && (this._selector = r, this._triggerArray.push(e))
                }
                this._parent = this._config.parent ? this._getParent() : null;
                this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray);
                this._config.toggle && this.toggle()
            }
            var n = t.prototype;
            return n.toggle = function() {
                r.default(this._element).hasClass("show") ? this.hide() : this.show()
            }, n.show = function() {
                var n, e, i = this,
                    o, f, s, h;
                this._isTransitioning || r.default(this._element).hasClass("show") || (this._parent && 0 === (n = [].slice.call(this._parent.querySelectorAll(".show, .collapsing")).filter(function(n) {
                    return "string" == typeof i._config.parent ? n.getAttribute("data-parent") === i._config.parent : n.classList.contains("collapse")
                })).length && (n = null), n && (e = r.default(n).not(this._selector).data("bs.collapse")) && e._isTransitioning) || (o = r.default.Event("show.bs.collapse"), (r.default(this._element).trigger(o), o.isDefaultPrevented()) || (n && (t._jQueryInterface.call(r.default(n).not(this._selector), "hide"), e || r.default(n).data("bs.collapse", null)), f = this._getDimension(), r.default(this._element).removeClass("collapse").addClass("collapsing"), this._element.style[f] = 0, this._triggerArray.length && r.default(this._triggerArray).removeClass("collapsed").attr("aria-expanded", !0), this.setTransitioning(!0), s = "scroll" + (f[0].toUpperCase() + f.slice(1)), h = u.getTransitionDurationFromElement(this._element), r.default(this._element).one(u.TRANSITION_END, function() {
                    r.default(i._element).removeClass("collapsing").addClass("collapse show");
                    i._element.style[f] = "";
                    i.setTransitioning(!1);
                    r.default(i._element).trigger("shown.bs.collapse")
                }).emulateTransitionEnd(h), this._element.style[f] = this._element[s] + "px"))
            }, n.hide = function() {
                var s = this,
                    i, n, f, t, e, o, h;
                if (!this._isTransitioning && r.default(this._element).hasClass("show") && (i = r.default.Event("hide.bs.collapse"), r.default(this._element).trigger(i), !i.isDefaultPrevented())) {
                    if (n = this._getDimension(), this._element.style[n] = this._element.getBoundingClientRect()[n] + "px", u.reflow(this._element), r.default(this._element).addClass("collapsing").removeClass("collapse show"), f = this._triggerArray.length, f > 0)
                        for (t = 0; t < f; t++) e = this._triggerArray[t], o = u.getSelectorFromElement(e), null !== o && (r.default([].slice.call(document.querySelectorAll(o))).hasClass("show") || r.default(e).addClass("collapsed").attr("aria-expanded", !1));
                    this.setTransitioning(!0);
                    this._element.style[n] = "";
                    h = u.getTransitionDurationFromElement(this._element);
                    r.default(this._element).one(u.TRANSITION_END, function() {
                        s.setTransitioning(!1);
                        r.default(s._element).removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                    }).emulateTransitionEnd(h)
                }
            }, n.setTransitioning = function(n) {
                this._isTransitioning = n
            }, n.dispose = function() {
                r.default.removeData(this._element, "bs.collapse");
                this._config = null;
                this._parent = null;
                this._element = null;
                this._triggerArray = null;
                this._isTransitioning = null
            }, n._getConfig = function(n) {
                return (n = f({}, et, n)).toggle = Boolean(n.toggle), u.typeCheckConfig(p, n, ti), n
            }, n._getDimension = function() {
                return r.default(this._element).hasClass("width") ? "width" : "height"
            }, n._getParent = function() {
                var n, e = this,
                    i, f;
                return u.isElement(this._config.parent) ? (n = this._config.parent, "undefined" != typeof this._config.parent.jquery && (n = this._config.parent[0])) : n = document.querySelector(this._config.parent), i = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]', f = [].slice.call(n.querySelectorAll(i)), r.default(f).each(function(n, i) {
                    e._addAriaAndCollapsedClass(t._getTargetFromElement(i), [i])
                }), n
            }, n._addAriaAndCollapsedClass = function(n, t) {
                var i = r.default(n).hasClass("show");
                t.length && r.default(t).toggleClass("collapsed", !i).attr("aria-expanded", i)
            }, t._getTargetFromElement = function(n) {
                var t = u.getSelectorFromElement(n);
                return t ? document.querySelector(t) : null
            }, t._jQueryInterface = function(n) {
                return this.each(function() {
                    var u = r.default(this),
                        i = u.data("bs.collapse"),
                        e = f({}, et, u.data(), "object" == typeof n && n ? n : {});
                    if (!i && e.toggle && "string" == typeof n && /show|hide/.test(n) && (e.toggle = !1), i || (i = new t(this, e), u.data("bs.collapse", i)), "string" == typeof n) {
                        if ("undefined" == typeof i[n]) throw new TypeError('No method named "' + n + '"');
                        i[n]()
                    }
                })
            }, e(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.6.0"
                }
            }, {
                key: "Default",
                get: function() {
                    return et
                }
            }]), t
        }();
    r.default(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(n) {
        "A" === n.currentTarget.tagName && n.preventDefault();
        var t = r.default(this),
            i = u.getSelectorFromElement(this),
            f = [].slice.call(document.querySelectorAll(i));
        r.default(f).each(function() {
            var n = r.default(this),
                i = n.data("bs.collapse") ? "toggle" : t.data();
            g._jQueryInterface.call(n, i)
        })
    });
    r.default.fn[p] = g._jQueryInterface;
    r.default.fn[p].Constructor = g;
    r.default.fn[p].noConflict = function() {
        return r.default.fn[p] = ni, g._jQueryInterface
    };
    var w = "dropdown",
        ii = r.default.fn[w],
        ri = new RegExp("38|40|27"),
        ui = {
            offset: 0,
            flip: !0,
            boundary: "scrollParent",
            reference: "toggle",
            display: "dynamic",
            popperConfig: null
        },
        fi = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)",
            display: "string",
            popperConfig: "(null|object)"
        },
        o = function() {
            function n(n, t) {
                this._element = n;
                this._popper = null;
                this._config = this._getConfig(t);
                this._menu = this._getMenuElement();
                this._inNavbar = this._detectNavbar();
                this._addEventListeners()
            }
            var t = n.prototype;
            return t.toggle = function() {
                if (!this._element.disabled && !r.default(this._element).hasClass("disabled")) {
                    var t = r.default(this._menu).hasClass("show");
                    n._clearMenus();
                    t || this.show(!0)
                }
            }, t.show = function(t) {
                var f;
                if (void 0 === t && (t = !1), !(this._element.disabled || r.default(this._element).hasClass("disabled") || r.default(this._menu).hasClass("show"))) {
                    var e = {
                            relatedTarget: this._element
                        },
                        o = r.default.Event("show.bs.dropdown", e),
                        i = n._getParentFromElement(this._element);
                    if (r.default(i).trigger(o), !o.isDefaultPrevented()) {
                        if (!this._inNavbar && t) {
                            if ("undefined" == typeof it.default) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
                            f = this._element;
                            "parent" === this._config.reference ? f = i : u.isElement(this._config.reference) && (f = this._config.reference, "undefined" != typeof this._config.reference.jquery && (f = this._config.reference[0]));
                            "scrollParent" !== this._config.boundary && r.default(i).addClass("position-static");
                            this._popper = new it.default(f, this._menu, this._getPopperConfig())
                        }
                        "ontouchstart" in document.documentElement && 0 === r.default(i).closest(".navbar-nav").length && r.default(document.body).children().on("mouseover", null, r.default.noop);
                        this._element.focus();
                        this._element.setAttribute("aria-expanded", !0);
                        r.default(this._menu).toggleClass("show");
                        r.default(i).toggleClass("show").trigger(r.default.Event("shown.bs.dropdown", e))
                    }
                }
            }, t.hide = function() {
                if (!this._element.disabled && !r.default(this._element).hasClass("disabled") && r.default(this._menu).hasClass("show")) {
                    var t = {
                            relatedTarget: this._element
                        },
                        i = r.default.Event("hide.bs.dropdown", t),
                        u = n._getParentFromElement(this._element);
                    r.default(u).trigger(i);
                    i.isDefaultPrevented() || (this._popper && this._popper.destroy(), r.default(this._menu).toggleClass("show"), r.default(u).toggleClass("show").trigger(r.default.Event("hidden.bs.dropdown", t)))
                }
            }, t.dispose = function() {
                r.default.removeData(this._element, "bs.dropdown");
                r.default(this._element).off(".bs.dropdown");
                this._element = null;
                this._menu = null;
                null !== this._popper && (this._popper.destroy(), this._popper = null)
            }, t.update = function() {
                this._inNavbar = this._detectNavbar();
                null !== this._popper && this._popper.scheduleUpdate()
            }, t._addEventListeners = function() {
                var n = this;
                r.default(this._element).on("click.bs.dropdown", function(t) {
                    t.preventDefault();
                    t.stopPropagation();
                    n.toggle()
                })
            }, t._getConfig = function(n) {
                return n = f({}, this.constructor.Default, r.default(this._element).data(), n), u.typeCheckConfig(w, n, this.constructor.DefaultType), n
            }, t._getMenuElement = function() {
                if (!this._menu) {
                    var t = n._getParentFromElement(this._element);
                    t && (this._menu = t.querySelector(".dropdown-menu"))
                }
                return this._menu
            }, t._getPlacement = function() {
                var t = r.default(this._element.parentNode),
                    n = "bottom-start";
                return t.hasClass("dropup") ? n = r.default(this._menu).hasClass("dropdown-menu-right") ? "top-end" : "top-start" : t.hasClass("dropright") ? n = "right-start" : t.hasClass("dropleft") ? n = "left-start" : r.default(this._menu).hasClass("dropdown-menu-right") && (n = "bottom-end"), n
            }, t._detectNavbar = function() {
                return r.default(this._element).closest(".navbar").length > 0
            }, t._getOffset = function() {
                var t = this,
                    n = {};
                return "function" == typeof this._config.offset ? n.fn = function(n) {
                    return n.offsets = f({}, n.offsets, t._config.offset(n.offsets, t._element) || {}), n
                } : n.offset = this._config.offset, n
            }, t._getPopperConfig = function() {
                var n = {
                    placement: this._getPlacement(),
                    modifiers: {
                        offset: this._getOffset(),
                        flip: {
                            enabled: this._config.flip
                        },
                        preventOverflow: {
                            boundariesElement: this._config.boundary
                        }
                    }
                };
                return "static" === this._config.display && (n.modifiers.applyStyle = {
                    enabled: !1
                }), f({}, n, this._config.popperConfig)
            }, n._jQueryInterface = function(t) {
                return this.each(function() {
                    var i = r.default(this).data("bs.dropdown");
                    if (i || (i = new n(this, "object" == typeof t ? t : null), r.default(this).data("bs.dropdown", i)), "string" == typeof t) {
                        if ("undefined" == typeof i[t]) throw new TypeError('No method named "' + t + '"');
                        i[t]()
                    }
                })
            }, n._clearMenus = function(t) {
                var h, s;
                if (!t || 3 !== t.which && ("keyup" !== t.type || 9 === t.which))
                    for (var u = [].slice.call(document.querySelectorAll('[data-toggle="dropdown"]')), i = 0, c = u.length; i < c; i++) {
                        var f = n._getParentFromElement(u[i]),
                            e = r.default(u[i]).data("bs.dropdown"),
                            o = {
                                relatedTarget: u[i]
                            };
                        (t && "click" === t.type && (o.clickEvent = t), e) && (h = e._menu, !r.default(f).hasClass("show") || t && ("click" === t.type && /input|textarea/i.test(t.target.tagName) || "keyup" === t.type && 9 === t.which) && r.default.contains(f, t.target) || (s = r.default.Event("hide.bs.dropdown", o), r.default(f).trigger(s), s.isDefaultPrevented() || ("ontouchstart" in document.documentElement && r.default(document.body).children().off("mouseover", null, r.default.noop), u[i].setAttribute("aria-expanded", "false"), e._popper && e._popper.destroy(), r.default(h).removeClass("show"), r.default(f).removeClass("show").trigger(r.default.Event("hidden.bs.dropdown", o)))))
                    }
            }, n._getParentFromElement = function(n) {
                var t, i = u.getSelectorFromElement(n);
                return i && (t = document.querySelector(i)), t || n.parentNode
            }, n._dataApiKeydownHandler = function(t) {
                var f, e, u, i;
                if (!(/input|textarea/i.test(t.target.tagName) ? 32 === t.which || 27 !== t.which && (40 !== t.which && 38 !== t.which || r.default(t.target).closest(".dropdown-menu").length) : !ri.test(t.which)) && !this.disabled && !r.default(this).hasClass("disabled") && (f = n._getParentFromElement(this), e = r.default(f).hasClass("show"), e || 27 !== t.which)) {
                    if (t.preventDefault(), t.stopPropagation(), !e || 27 === t.which || 32 === t.which) return 27 === t.which && r.default(f.querySelector('[data-toggle="dropdown"]')).trigger("focus"), void r.default(this).trigger("click");
                    u = [].slice.call(f.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)")).filter(function(n) {
                        return r.default(n).is(":visible")
                    });
                    0 !== u.length && (i = u.indexOf(t.target), 38 === t.which && i > 0 && i--, 40 === t.which && i < u.length - 1 && i++, i < 0 && (i = 0), u[i].focus())
                }
            }, e(n, null, [{
                key: "VERSION",
                get: function() {
                    return "4.6.0"
                }
            }, {
                key: "Default",
                get: function() {
                    return ui
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return fi
                }
            }]), n
        }();
    r.default(document).on("keydown.bs.dropdown.data-api", '[data-toggle="dropdown"]', o._dataApiKeydownHandler).on("keydown.bs.dropdown.data-api", ".dropdown-menu", o._dataApiKeydownHandler).on("click.bs.dropdown.data-api keyup.bs.dropdown.data-api", o._clearMenus).on("click.bs.dropdown.data-api", '[data-toggle="dropdown"]', function(n) {
        n.preventDefault();
        n.stopPropagation();
        o._jQueryInterface.call(r.default(this), "toggle")
    }).on("click.bs.dropdown.data-api", ".dropdown form", function(n) {
        n.stopPropagation()
    });
    r.default.fn[w] = o._jQueryInterface;
    r.default.fn[w].Constructor = o;
    r.default.fn[w].noConflict = function() {
        return r.default.fn[w] = ii, o._jQueryInterface
    };
    var ei = r.default.fn.modal,
        ot = {
            backdrop: !0,
            keyboard: !0,
            focus: !0,
            show: !0
        },
        oi = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
        },
        nt = function() {
            function t(n, t) {
                this._config = this._getConfig(t);
                this._element = n;
                this._dialog = n.querySelector(".modal-dialog");
                this._backdrop = null;
                this._isShown = !1;
                this._isBodyOverflowing = !1;
                this._ignoreBackdropClick = !1;
                this._isTransitioning = !1;
                this._scrollbarWidth = 0
            }
            var n = t.prototype;
            return n.toggle = function(n) {
                return this._isShown ? this.hide() : this.show(n)
            }, n.show = function(n) {
                var t = this,
                    i;
                this._isShown || this._isTransitioning || (r.default(this._element).hasClass("fade") && (this._isTransitioning = !0), i = r.default.Event("show.bs.modal", {
                    relatedTarget: n
                }), r.default(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), r.default(this._element).on("click.dismiss.bs.modal", '[data-dismiss="modal"]', function(n) {
                    return t.hide(n)
                }), r.default(this._dialog).on("mousedown.dismiss.bs.modal", function() {
                    r.default(t._element).one("mouseup.dismiss.bs.modal", function(n) {
                        r.default(n.target).is(t._element) && (t._ignoreBackdropClick = !0)
                    })
                }), this._showBackdrop(function() {
                    return t._showElement(n)
                })))
            }, n.hide = function(n) {
                var e = this,
                    t, i, f;
                (n && n.preventDefault(), this._isShown && !this._isTransitioning) && (t = r.default.Event("hide.bs.modal"), (r.default(this._element).trigger(t), this._isShown && !t.isDefaultPrevented()) && (this._isShown = !1, i = r.default(this._element).hasClass("fade"), (i && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), r.default(document).off("focusin.bs.modal"), r.default(this._element).removeClass("show"), r.default(this._element).off("click.dismiss.bs.modal"), r.default(this._dialog).off("mousedown.dismiss.bs.modal"), i) ? (f = u.getTransitionDurationFromElement(this._element), r.default(this._element).one(u.TRANSITION_END, function(n) {
                    return e._hideModal(n)
                }).emulateTransitionEnd(f)) : this._hideModal()))
            }, n.dispose = function() {
                [window, this._element, this._dialog].forEach(function(n) {
                    return r.default(n).off(".bs.modal")
                });
                r.default(document).off("focusin.bs.modal");
                r.default.removeData(this._element, "bs.modal");
                this._config = null;
                this._element = null;
                this._dialog = null;
                this._backdrop = null;
                this._isShown = null;
                this._isBodyOverflowing = null;
                this._ignoreBackdropClick = null;
                this._isTransitioning = null;
                this._scrollbarWidth = null
            }, n.handleUpdate = function() {
                this._adjustDialog()
            }, n._getConfig = function(n) {
                return n = f({}, ot, n), u.typeCheckConfig("modal", n, oi), n
            }, n._triggerBackdropTransition = function() {
                var n = this,
                    f = r.default.Event("hidePrevented.bs.modal"),
                    t, i;
                (r.default(this._element).trigger(f), f.isDefaultPrevented()) || (t = this._element.scrollHeight > document.documentElement.clientHeight, t || (this._element.style.overflowY = "hidden"), this._element.classList.add("modal-static"), i = u.getTransitionDurationFromElement(this._dialog), r.default(this._element).off(u.TRANSITION_END), r.default(this._element).one(u.TRANSITION_END, function() {
                    n._element.classList.remove("modal-static");
                    t || r.default(n._element).one(u.TRANSITION_END, function() {
                        n._element.style.overflowY = ""
                    }).emulateTransitionEnd(n._element, i)
                }).emulateTransitionEnd(i), this._element.focus())
            }, n._showElement = function(n) {
                var t = this,
                    f = r.default(this._element).hasClass("fade"),
                    e = this._dialog ? this._dialog.querySelector(".modal-body") : null,
                    o, i, s;
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element);
                this._element.style.display = "block";
                this._element.removeAttribute("aria-hidden");
                this._element.setAttribute("aria-modal", !0);
                this._element.setAttribute("role", "dialog");
                r.default(this._dialog).hasClass("modal-dialog-scrollable") && e ? e.scrollTop = 0 : this._element.scrollTop = 0;
                f && u.reflow(this._element);
                r.default(this._element).addClass("show");
                this._config.focus && this._enforceFocus();
                o = r.default.Event("shown.bs.modal", {
                    relatedTarget: n
                });
                i = function() {
                    t._config.focus && t._element.focus();
                    t._isTransitioning = !1;
                    r.default(t._element).trigger(o)
                };
                f ? (s = u.getTransitionDurationFromElement(this._dialog), r.default(this._dialog).one(u.TRANSITION_END, i).emulateTransitionEnd(s)) : i()
            }, n._enforceFocus = function() {
                var n = this;
                r.default(document).off("focusin.bs.modal").on("focusin.bs.modal", function(t) {
                    document !== t.target && n._element !== t.target && 0 === r.default(n._element).has(t.target).length && n._element.focus()
                })
            }, n._setEscapeEvent = function() {
                var n = this;
                this._isShown ? r.default(this._element).on("keydown.dismiss.bs.modal", function(t) {
                    n._config.keyboard && 27 === t.which ? (t.preventDefault(), n.hide()) : n._config.keyboard || 27 !== t.which || n._triggerBackdropTransition()
                }) : this._isShown || r.default(this._element).off("keydown.dismiss.bs.modal")
            }, n._setResizeEvent = function() {
                var n = this;
                this._isShown ? r.default(window).on("resize.bs.modal", function(t) {
                    return n.handleUpdate(t)
                }) : r.default(window).off("resize.bs.modal")
            }, n._hideModal = function() {
                var n = this;
                this._element.style.display = "none";
                this._element.setAttribute("aria-hidden", !0);
                this._element.removeAttribute("aria-modal");
                this._element.removeAttribute("role");
                this._isTransitioning = !1;
                this._showBackdrop(function() {
                    r.default(document.body).removeClass("modal-open");
                    n._resetAdjustments();
                    n._resetScrollbar();
                    r.default(n._element).trigger("hidden.bs.modal")
                })
            }, n._removeBackdrop = function() {
                this._backdrop && (r.default(this._backdrop).remove(), this._backdrop = null)
            }, n._showBackdrop = function(n) {
                var t = this,
                    i = r.default(this._element).hasClass("fade") ? "fade" : "",
                    e, f, o;
                if (this._isShown && this._config.backdrop) {
                    if (this._backdrop = document.createElement("div"), this._backdrop.className = "modal-backdrop", i && this._backdrop.classList.add(i), r.default(this._backdrop).appendTo(document.body), r.default(this._element).on("click.dismiss.bs.modal", function(n) {
                            t._ignoreBackdropClick ? t._ignoreBackdropClick = !1 : n.target === n.currentTarget && ("static" === t._config.backdrop ? t._triggerBackdropTransition() : t.hide())
                        }), i && u.reflow(this._backdrop), r.default(this._backdrop).addClass("show"), !n) return;
                    if (!i) return void n();
                    e = u.getTransitionDurationFromElement(this._backdrop);
                    r.default(this._backdrop).one(u.TRANSITION_END, n).emulateTransitionEnd(e)
                } else !this._isShown && this._backdrop ? (r.default(this._backdrop).removeClass("show"), f = function() {
                    t._removeBackdrop();
                    n && n()
                }, r.default(this._element).hasClass("fade") ? (o = u.getTransitionDurationFromElement(this._backdrop), r.default(this._backdrop).one(u.TRANSITION_END, f).emulateTransitionEnd(o)) : f()) : n && n()
            }, n._adjustDialog = function() {
                var n = this._element.scrollHeight > document.documentElement.clientHeight;
                !this._isBodyOverflowing && n && (this._element.style.paddingLeft = this._scrollbarWidth + "px");
                this._isBodyOverflowing && !n && (this._element.style.paddingRight = this._scrollbarWidth + "px")
            }, n._resetAdjustments = function() {
                this._element.style.paddingLeft = "";
                this._element.style.paddingRight = ""
            }, n._checkScrollbar = function() {
                var n = document.body.getBoundingClientRect();
                this._isBodyOverflowing = Math.round(n.left + n.right) < window.innerWidth;
                this._scrollbarWidth = this._getScrollbarWidth()
            }, n._setScrollbar = function() {
                var n = this,
                    t, i, u, f;
                this._isBodyOverflowing && (t = [].slice.call(document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")), i = [].slice.call(document.querySelectorAll(".sticky-top")), r.default(t).each(function(t, i) {
                    var u = i.style.paddingRight,
                        f = r.default(i).css("padding-right");
                    r.default(i).data("padding-right", u).css("padding-right", parseFloat(f) + n._scrollbarWidth + "px")
                }), r.default(i).each(function(t, i) {
                    var u = i.style.marginRight,
                        f = r.default(i).css("margin-right");
                    r.default(i).data("margin-right", u).css("margin-right", parseFloat(f) - n._scrollbarWidth + "px")
                }), u = document.body.style.paddingRight, f = r.default(document.body).css("padding-right"), r.default(document.body).data("padding-right", u).css("padding-right", parseFloat(f) + this._scrollbarWidth + "px"));
                r.default(document.body).addClass("modal-open")
            }, n._resetScrollbar = function() {
                var i = [].slice.call(document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")),
                    n, t;
                r.default(i).each(function(n, t) {
                    var i = r.default(t).data("padding-right");
                    r.default(t).removeData("padding-right");
                    t.style.paddingRight = i || ""
                });
                n = [].slice.call(document.querySelectorAll(".sticky-top"));
                r.default(n).each(function(n, t) {
                    var i = r.default(t).data("margin-right");
                    "undefined" != typeof i && r.default(t).css("margin-right", i).removeData("margin-right")
                });
                t = r.default(document.body).data("padding-right");
                r.default(document.body).removeData("padding-right");
                document.body.style.paddingRight = t || ""
            }, n._getScrollbarWidth = function() {
                var n = document.createElement("div"),
                    t;
                return n.className = "modal-scrollbar-measure", document.body.appendChild(n), t = n.getBoundingClientRect().width - n.clientWidth, document.body.removeChild(n), t
            }, t._jQueryInterface = function(n, i) {
                return this.each(function() {
                    var u = r.default(this).data("bs.modal"),
                        e = f({}, ot, r.default(this).data(), "object" == typeof n && n ? n : {});
                    if (u || (u = new t(this, e), r.default(this).data("bs.modal", u)), "string" == typeof n) {
                        if ("undefined" == typeof u[n]) throw new TypeError('No method named "' + n + '"');
                        u[n](i)
                    } else e.show && u.show(i)
                })
            }, e(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.6.0"
                }
            }, {
                key: "Default",
                get: function() {
                    return ot
                }
            }]), t
        }();
    r.default(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(n) {
        var t, i = this,
            e = u.getSelectorFromElement(this),
            o, s;
        e && (t = document.querySelector(e));
        o = r.default(t).data("bs.modal") ? "toggle" : f({}, r.default(t).data(), r.default(this).data());
        "A" !== this.tagName && "AREA" !== this.tagName || n.preventDefault();
        s = r.default(t).one("show.bs.modal", function(n) {
            n.isDefaultPrevented() || s.one("hidden.bs.modal", function() {
                r.default(i).is(":visible") && i.focus()
            })
        });
        nt._jQueryInterface.call(r.default(t), o, this)
    });
    r.default.fn.modal = nt._jQueryInterface;
    r.default.fn.modal.Constructor = nt;
    r.default.fn.modal.noConflict = function() {
        return r.default.fn.modal = ei, nt._jQueryInterface
    };
    var si = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
        hi = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,
        ci = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
    var s = "tooltip",
        li = r.default.fn[s],
        ai = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
        vi = ["sanitize", "whiteList", "sanitizeFn"],
        yi = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(number|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacement: "(string|array)",
            boundary: "(string|element)",
            customClass: "(string|function)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            whiteList: "object",
            popperConfig: "(null|object)"
        },
        pi = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: "right",
            BOTTOM: "bottom",
            LEFT: "left"
        },
        wi = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="arrow"><\/div><div class="tooltip-inner"><\/div><\/div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent",
            customClass: "",
            sanitize: !0,
            sanitizeFn: null,
            whiteList: {
                "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
                a: ["target", "href", "title", "rel"],
                area: [],
                b: [],
                br: [],
                col: [],
                code: [],
                div: [],
                em: [],
                hr: [],
                h1: [],
                h2: [],
                h3: [],
                h4: [],
                h5: [],
                h6: [],
                i: [],
                img: ["src", "srcset", "alt", "title", "width", "height"],
                li: [],
                ol: [],
                p: [],
                pre: [],
                s: [],
                small: [],
                span: [],
                sub: [],
                sup: [],
                strong: [],
                u: [],
                ul: []
            },
            popperConfig: null
        },
        bi = {
            HIDE: "hide.bs.tooltip",
            HIDDEN: "hidden.bs.tooltip",
            SHOW: "show.bs.tooltip",
            SHOWN: "shown.bs.tooltip",
            INSERTED: "inserted.bs.tooltip",
            CLICK: "click.bs.tooltip",
            FOCUSIN: "focusin.bs.tooltip",
            FOCUSOUT: "focusout.bs.tooltip",
            MOUSEENTER: "mouseenter.bs.tooltip",
            MOUSELEAVE: "mouseleave.bs.tooltip"
        },
        h = function() {
            function t(n, t) {
                if ("undefined" == typeof it.default) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
                this._isEnabled = !0;
                this._timeout = 0;
                this._hoverState = "";
                this._activeTrigger = {};
                this._popper = null;
                this.element = n;
                this.config = this._getConfig(t);
                this.tip = null;
                this._setListeners()
            }
            var n = t.prototype;
            return n.enable = function() {
                this._isEnabled = !0
            }, n.disable = function() {
                this._isEnabled = !1
            }, n.toggleEnabled = function() {
                this._isEnabled = !this._isEnabled
            }, n.toggle = function(n) {
                if (this._isEnabled)
                    if (n) {
                        var i = this.constructor.DATA_KEY,
                            t = r.default(n.currentTarget).data(i);
                        t || (t = new this.constructor(n.currentTarget, this._getDelegateConfig()), r.default(n.currentTarget).data(i, t));
                        t._activeTrigger.click = !t._activeTrigger.click;
                        t._isWithActiveTrigger() ? t._enter(null, t) : t._leave(null, t)
                    } else {
                        if (r.default(this.getTipElement()).hasClass("show")) return void this._leave(null, this);
                        this._enter(null, this)
                    }
            }, n.dispose = function() {
                clearTimeout(this._timeout);
                r.default.removeData(this.element, this.constructor.DATA_KEY);
                r.default(this.element).off(this.constructor.EVENT_KEY);
                r.default(this.element).closest(".modal").off("hide.bs.modal", this._hideModalHandler);
                this.tip && r.default(this.tip).remove();
                this._isEnabled = null;
                this._timeout = null;
                this._hoverState = null;
                this._activeTrigger = null;
                this._popper && this._popper.destroy();
                this._popper = null;
                this.element = null;
                this.config = null;
                this.tip = null
            }, n.show = function() {
                var t = this,
                    i, f, h, n, e, c, o, l, s, a;
                if ("none" === r.default(this.element).css("display")) throw new Error("Please use show on visible elements");
                if (i = r.default.Event(this.constructor.Event.SHOW), this.isWithContent() && this._isEnabled) {
                    if (r.default(this.element).trigger(i), f = u.findShadowRoot(this.element), h = r.default.contains(null !== f ? f : this.element.ownerDocument.documentElement, this.element), i.isDefaultPrevented() || !h) return;
                    n = this.getTipElement();
                    e = u.getUID(this.constructor.NAME);
                    n.setAttribute("id", e);
                    this.element.setAttribute("aria-describedby", e);
                    this.setContent();
                    this.config.animation && r.default(n).addClass("fade");
                    c = "function" == typeof this.config.placement ? this.config.placement.call(this, n, this.element) : this.config.placement;
                    o = this._getAttachment(c);
                    this.addAttachmentClass(o);
                    l = this._getContainer();
                    r.default(n).data(this.constructor.DATA_KEY, this);
                    r.default.contains(this.element.ownerDocument.documentElement, this.tip) || r.default(n).appendTo(l);
                    r.default(this.element).trigger(this.constructor.Event.INSERTED);
                    this._popper = new it.default(this.element, n, this._getPopperConfig(o));
                    r.default(n).addClass("show");
                    r.default(n).addClass(this.config.customClass);
                    "ontouchstart" in document.documentElement && r.default(document.body).children().on("mouseover", null, r.default.noop);
                    s = function() {
                        t.config.animation && t._fixTransition();
                        var n = t._hoverState;
                        t._hoverState = null;
                        r.default(t.element).trigger(t.constructor.Event.SHOWN);
                        "out" === n && t._leave(null, t)
                    };
                    r.default(this.tip).hasClass("fade") ? (a = u.getTransitionDurationFromElement(this.tip), r.default(this.tip).one(u.TRANSITION_END, s).emulateTransitionEnd(a)) : s()
                }
            }, n.hide = function(n) {
                var t = this,
                    i = this.getTipElement(),
                    f = r.default.Event(this.constructor.Event.HIDE),
                    e = function() {
                        "show" !== t._hoverState && i.parentNode && i.parentNode.removeChild(i);
                        t._cleanTipClass();
                        t.element.removeAttribute("aria-describedby");
                        r.default(t.element).trigger(t.constructor.Event.HIDDEN);
                        null !== t._popper && t._popper.destroy();
                        n && n()
                    },
                    o;
                (r.default(this.element).trigger(f), f.isDefaultPrevented()) || ((r.default(i).removeClass("show"), "ontouchstart" in document.documentElement && r.default(document.body).children().off("mouseover", null, r.default.noop), this._activeTrigger.click = !1, this._activeTrigger.focus = !1, this._activeTrigger.hover = !1, r.default(this.tip).hasClass("fade")) ? (o = u.getTransitionDurationFromElement(i), r.default(i).one(u.TRANSITION_END, e).emulateTransitionEnd(o)) : e(), this._hoverState = "")
            }, n.update = function() {
                null !== this._popper && this._popper.scheduleUpdate()
            }, n.isWithContent = function() {
                return Boolean(this.getTitle())
            }, n.addAttachmentClass = function(n) {
                r.default(this.getTipElement()).addClass("bs-tooltip-" + n)
            }, n.getTipElement = function() {
                return this.tip = this.tip || r.default(this.config.template)[0], this.tip
            }, n.setContent = function() {
                var n = this.getTipElement();
                this.setElementContent(r.default(n.querySelectorAll(".tooltip-inner")), this.getTitle());
                r.default(n).removeClass("fade show")
            }, n.setElementContent = function(n, t) {
                "object" != typeof t || !t.nodeType && !t.jquery ? this.config.html ? (this.config.sanitize && (t = at(t, this.config.whiteList, this.config.sanitizeFn)), n.html(t)) : n.text(t) : this.config.html ? r.default(t).parent().is(n) || n.empty().append(t) : n.text(r.default(t).text())
            }, n.getTitle = function() {
                var n = this.element.getAttribute("data-original-title");
                return n || (n = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), n
            }, n._getPopperConfig = function(n) {
                var t = this;
                return f({}, {
                    placement: n,
                    modifiers: {
                        offset: this._getOffset(),
                        flip: {
                            behavior: this.config.fallbackPlacement
                        },
                        arrow: {
                            element: ".arrow"
                        },
                        preventOverflow: {
                            boundariesElement: this.config.boundary
                        }
                    },
                    onCreate: function(n) {
                        n.originalPlacement !== n.placement && t._handlePopperPlacementChange(n)
                    },
                    onUpdate: function(n) {
                        return t._handlePopperPlacementChange(n)
                    }
                }, this.config.popperConfig)
            }, n._getOffset = function() {
                var t = this,
                    n = {};
                return "function" == typeof this.config.offset ? n.fn = function(n) {
                    return n.offsets = f({}, n.offsets, t.config.offset(n.offsets, t.element) || {}), n
                } : n.offset = this.config.offset, n
            }, n._getContainer = function() {
                return !1 === this.config.container ? document.body : u.isElement(this.config.container) ? r.default(this.config.container) : r.default(document).find(this.config.container)
            }, n._getAttachment = function(n) {
                return pi[n.toUpperCase()]
            }, n._setListeners = function() {
                var n = this;
                this.config.trigger.split(" ").forEach(function(t) {
                    if ("click" === t) r.default(n.element).on(n.constructor.Event.CLICK, n.config.selector, function(t) {
                        return n.toggle(t)
                    });
                    else if ("manual" !== t) {
                        var i = "hover" === t ? n.constructor.Event.MOUSEENTER : n.constructor.Event.FOCUSIN,
                            u = "hover" === t ? n.constructor.Event.MOUSELEAVE : n.constructor.Event.FOCUSOUT;
                        r.default(n.element).on(i, n.config.selector, function(t) {
                            return n._enter(t)
                        }).on(u, n.config.selector, function(t) {
                            return n._leave(t)
                        })
                    }
                });
                this._hideModalHandler = function() {
                    n.element && n.hide()
                };
                r.default(this.element).closest(".modal").on("hide.bs.modal", this._hideModalHandler);
                this.config.selector ? this.config = f({}, this.config, {
                    trigger: "manual",
                    selector: ""
                }) : this._fixTitle()
            }, n._fixTitle = function() {
                var n = typeof this.element.getAttribute("data-original-title");
                (this.element.getAttribute("title") || "string" !== n) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
            }, n._enter = function(n, t) {
                var i = this.constructor.DATA_KEY;
                (t = t || r.default(n.currentTarget).data(i)) || (t = new this.constructor(n.currentTarget, this._getDelegateConfig()), r.default(n.currentTarget).data(i, t));
                n && (t._activeTrigger["focusin" === n.type ? "focus" : "hover"] = !0);
                r.default(t.getTipElement()).hasClass("show") || "show" === t._hoverState ? t._hoverState = "show" : (clearTimeout(t._timeout), t._hoverState = "show", t.config.delay && t.config.delay.show ? t._timeout = setTimeout(function() {
                    "show" === t._hoverState && t.show()
                }, t.config.delay.show) : t.show())
            }, n._leave = function(n, t) {
                var i = this.constructor.DATA_KEY;
                (t = t || r.default(n.currentTarget).data(i)) || (t = new this.constructor(n.currentTarget, this._getDelegateConfig()), r.default(n.currentTarget).data(i, t));
                n && (t._activeTrigger["focusout" === n.type ? "focus" : "hover"] = !1);
                t._isWithActiveTrigger() || (clearTimeout(t._timeout), t._hoverState = "out", t.config.delay && t.config.delay.hide ? t._timeout = setTimeout(function() {
                    "out" === t._hoverState && t.hide()
                }, t.config.delay.hide) : t.hide())
            }, n._isWithActiveTrigger = function() {
                for (var n in this._activeTrigger)
                    if (this._activeTrigger[n]) return !0;
                return !1
            }, n._getConfig = function(n) {
                var t = r.default(this.element).data();
                return Object.keys(t).forEach(function(n) {
                    -1 !== vi.indexOf(n) && delete t[n]
                }), "number" == typeof(n = f({}, this.constructor.Default, t, "object" == typeof n && n ? n : {})).delay && (n.delay = {
                    show: n.delay,
                    hide: n.delay
                }), "number" == typeof n.title && (n.title = n.title.toString()), "number" == typeof n.content && (n.content = n.content.toString()), u.typeCheckConfig(s, n, this.constructor.DefaultType), n.sanitize && (n.template = at(n.template, n.whiteList, n.sanitizeFn)), n
            }, n._getDelegateConfig = function() {
                var t = {},
                    n;
                if (this.config)
                    for (n in this.config) this.constructor.Default[n] !== this.config[n] && (t[n] = this.config[n]);
                return t
            }, n._cleanTipClass = function() {
                var t = r.default(this.getTipElement()),
                    n = t.attr("class").match(ai);
                null !== n && n.length && t.removeClass(n.join(""))
            }, n._handlePopperPlacementChange = function(n) {
                this.tip = n.instance.popper;
                this._cleanTipClass();
                this.addAttachmentClass(this._getAttachment(n.placement))
            }, n._fixTransition = function() {
                var n = this.getTipElement(),
                    t = this.config.animation;
                null === n.getAttribute("x-placement") && (r.default(n).removeClass("fade"), this.config.animation = !1, this.hide(), this.show(), this.config.animation = t)
            }, t._jQueryInterface = function(n) {
                return this.each(function() {
                    var u = r.default(this),
                        i = u.data("bs.tooltip"),
                        f = "object" == typeof n && n;
                    if ((i || !/dispose|hide/.test(n)) && (i || (i = new t(this, f), u.data("bs.tooltip", i)), "string" == typeof n)) {
                        if ("undefined" == typeof i[n]) throw new TypeError('No method named "' + n + '"');
                        i[n]()
                    }
                })
            }, e(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.6.0"
                }
            }, {
                key: "Default",
                get: function() {
                    return wi
                }
            }, {
                key: "NAME",
                get: function() {
                    return s
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return "bs.tooltip"
                }
            }, {
                key: "Event",
                get: function() {
                    return bi
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return ".bs.tooltip"
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return yi
                }
            }]), t
        }();
    r.default.fn[s] = h._jQueryInterface;
    r.default.fn[s].Constructor = h;
    r.default.fn[s].noConflict = function() {
        return r.default.fn[s] = li, h._jQueryInterface
    };
    var b = "popover",
        ki = r.default.fn[b],
        di = new RegExp("(^|\\s)bs-popover\\S+", "g"),
        gi = f({}, h.Default, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"><\/div><h3 class="popover-header"><\/h3><div class="popover-body"><\/div><\/div>'
        }),
        nr = f({}, h.DefaultType, {
            content: "(string|element|function)"
        }),
        tr = {
            HIDE: "hide.bs.popover",
            HIDDEN: "hidden.bs.popover",
            SHOW: "show.bs.popover",
            SHOWN: "shown.bs.popover",
            INSERTED: "inserted.bs.popover",
            CLICK: "click.bs.popover",
            FOCUSIN: "focusin.bs.popover",
            FOCUSOUT: "focusout.bs.popover",
            MOUSEENTER: "mouseenter.bs.popover",
            MOUSELEAVE: "mouseleave.bs.popover"
        },
        rt = function(n) {
            function i() {
                return n.apply(this, arguments) || this
            }
            var u, f, t;
            return f = n, (u = i).prototype = Object.create(f.prototype), u.prototype.constructor = u, u.__proto__ = f, t = i.prototype, t.isWithContent = function() {
                return this.getTitle() || this._getContent()
            }, t.addAttachmentClass = function(n) {
                r.default(this.getTipElement()).addClass("bs-popover-" + n)
            }, t.getTipElement = function() {
                return this.tip = this.tip || r.default(this.config.template)[0], this.tip
            }, t.setContent = function() {
                var t = r.default(this.getTipElement()),
                    n;
                this.setElementContent(t.find(".popover-header"), this.getTitle());
                n = this._getContent();
                "function" == typeof n && (n = n.call(this.element));
                this.setElementContent(t.find(".popover-body"), n);
                t.removeClass("fade show")
            }, t._getContent = function() {
                return this.element.getAttribute("data-content") || this.config.content
            }, t._cleanTipClass = function() {
                var t = r.default(this.getTipElement()),
                    n = t.attr("class").match(di);
                null !== n && n.length > 0 && t.removeClass(n.join(""))
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = r.default(this).data("bs.popover"),
                        u = "object" == typeof n ? n : null;
                    if ((t || !/dispose|hide/.test(n)) && (t || (t = new i(this, u), r.default(this).data("bs.popover", t)), "string" == typeof n)) {
                        if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    }
                })
            }, e(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.6.0"
                }
            }, {
                key: "Default",
                get: function() {
                    return gi
                }
            }, {
                key: "NAME",
                get: function() {
                    return b
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return "bs.popover"
                }
            }, {
                key: "Event",
                get: function() {
                    return tr
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return ".bs.popover"
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return nr
                }
            }]), i
        }(h);
    r.default.fn[b] = rt._jQueryInterface;
    r.default.fn[b].Constructor = rt;
    r.default.fn[b].noConflict = function() {
        return r.default.fn[b] = ki, rt._jQueryInterface
    };
    var c = "scrollspy",
        ir = r.default.fn[c],
        vt = {
            offset: 10,
            method: "auto",
            target: ""
        },
        rr = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        },
        tt = function() {
            function t(n, t) {
                var i = this;
                this._element = n;
                this._scrollElement = "BODY" === n.tagName ? window : n;
                this._config = this._getConfig(t);
                this._selector = this._config.target + " .nav-link," + this._config.target + " .list-group-item," + this._config.target + " .dropdown-item";
                this._offsets = [];
                this._targets = [];
                this._activeTarget = null;
                this._scrollHeight = 0;
                r.default(this._scrollElement).on("scroll.bs.scrollspy", function(n) {
                    return i._process(n)
                });
                this.refresh();
                this._process()
            }
            var n = t.prototype;
            return n.refresh = function() {
                var n = this,
                    i = this._scrollElement === this._scrollElement.window ? "offset" : "position",
                    t = "auto" === this._config.method ? i : this._config.method,
                    f = "position" === t ? this._getScrollTop() : 0;
                this._offsets = [];
                this._targets = [];
                this._scrollHeight = this._getScrollHeight();
                [].slice.call(document.querySelectorAll(this._selector)).map(function(n) {
                    var i, e = u.getSelectorFromElement(n),
                        o;
                    return (e && (i = document.querySelector(e)), i) && (o = i.getBoundingClientRect(), o.width || o.height) ? [r.default(i)[t]().top + f, e] : null
                }).filter(function(n) {
                    return n
                }).sort(function(n, t) {
                    return n[0] - t[0]
                }).forEach(function(t) {
                    n._offsets.push(t[0]);
                    n._targets.push(t[1])
                })
            }, n.dispose = function() {
                r.default.removeData(this._element, "bs.scrollspy");
                r.default(this._scrollElement).off(".bs.scrollspy");
                this._element = null;
                this._scrollElement = null;
                this._config = null;
                this._selector = null;
                this._offsets = null;
                this._targets = null;
                this._activeTarget = null;
                this._scrollHeight = null
            }, n._getConfig = function(n) {
                if ("string" != typeof(n = f({}, vt, "object" == typeof n && n ? n : {})).target && u.isElement(n.target)) {
                    var t = r.default(n.target).attr("id");
                    t || (t = u.getUID(c), r.default(n.target).attr("id", t));
                    n.target = "#" + t
                }
                return u.typeCheckConfig(c, n, rr), n
            }, n._getScrollTop = function() {
                return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
            }, n._getScrollHeight = function() {
                return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            }, n._getOffsetHeight = function() {
                return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
            }, n._process = function() {
                var t = this._getScrollTop() + this._config.offset,
                    r = this._getScrollHeight(),
                    u = this._config.offset + r - this._getOffsetHeight(),
                    i, n;
                if (this._scrollHeight !== r && this.refresh(), t >= u) i = this._targets[this._targets.length - 1], this._activeTarget !== i && this._activate(i);
                else {
                    if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
                    for (n = this._offsets.length; n--;) this._activeTarget !== this._targets[n] && t >= this._offsets[n] && ("undefined" == typeof this._offsets[n + 1] || t < this._offsets[n + 1]) && this._activate(this._targets[n])
                }
            }, n._activate = function(n) {
                this._activeTarget = n;
                this._clear();
                var i = this._selector.split(",").map(function(t) {
                        return t + '[data-target="' + n + '"],' + t + '[href="' + n + '"]'
                    }),
                    t = r.default([].slice.call(document.querySelectorAll(i.join(","))));
                t.hasClass("dropdown-item") ? (t.closest(".dropdown").find(".dropdown-toggle").addClass("active"), t.addClass("active")) : (t.addClass("active"), t.parents(".nav, .list-group").prev(".nav-link, .list-group-item").addClass("active"), t.parents(".nav, .list-group").prev(".nav-item").children(".nav-link").addClass("active"));
                r.default(this._scrollElement).trigger("activate.bs.scrollspy", {
                    relatedTarget: n
                })
            }, n._clear = function() {
                [].slice.call(document.querySelectorAll(this._selector)).filter(function(n) {
                    return n.classList.contains("active")
                }).forEach(function(n) {
                    return n.classList.remove("active")
                })
            }, t._jQueryInterface = function(n) {
                return this.each(function() {
                    var i = r.default(this).data("bs.scrollspy");
                    if (i || (i = new t(this, "object" == typeof n && n), r.default(this).data("bs.scrollspy", i)), "string" == typeof n) {
                        if ("undefined" == typeof i[n]) throw new TypeError('No method named "' + n + '"');
                        i[n]()
                    }
                })
            }, e(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.6.0"
                }
            }, {
                key: "Default",
                get: function() {
                    return vt
                }
            }]), t
        }();
    r.default(window).on("load.bs.scrollspy.data-api", function() {
        for (var i, n = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')), t = n.length; t--;) i = r.default(n[t]), tt._jQueryInterface.call(i, i.data())
    });
    r.default.fn[c] = tt._jQueryInterface;
    r.default.fn[c].Constructor = tt;
    r.default.fn[c].noConflict = function() {
        return r.default.fn[c] = ir, tt._jQueryInterface
    };
    yt = r.default.fn.tab;
    k = function() {
        function n(n) {
            this._element = n
        }
        var t = n.prototype;
        return t.show = function() {
            var h = this,
                i, n, t, f, c, e, o, s;
            this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && r.default(this._element).hasClass("active") || r.default(this._element).hasClass("disabled") || (t = r.default(this._element).closest(".nav, .list-group")[0], f = u.getSelectorFromElement(this._element), t && (c = "UL" === t.nodeName || "OL" === t.nodeName ? "> li > .active" : ".active", n = (n = r.default.makeArray(r.default(t).find(c)))[n.length - 1]), e = r.default.Event("hide.bs.tab", {
                relatedTarget: this._element
            }), o = r.default.Event("show.bs.tab", {
                relatedTarget: n
            }), (n && r.default(n).trigger(e), r.default(this._element).trigger(o), o.isDefaultPrevented() || e.isDefaultPrevented()) || (f && (i = document.querySelector(f)), this._activate(this._element, t), s = function() {
                var t = r.default.Event("hidden.bs.tab", {
                        relatedTarget: h._element
                    }),
                    i = r.default.Event("shown.bs.tab", {
                        relatedTarget: n
                    });
                r.default(n).trigger(t);
                r.default(h._element).trigger(i)
            }, i ? this._activate(i, i.parentNode, s) : s()))
        }, t.dispose = function() {
            r.default.removeData(this._element, "bs.tab");
            this._element = null
        }, t._activate = function(n, t, i) {
            var s = this,
                f = (!t || "UL" !== t.nodeName && "OL" !== t.nodeName ? r.default(t).children(".active") : r.default(t).find("> li > .active"))[0],
                h = i && f && r.default(f).hasClass("fade"),
                e = function() {
                    return s._transitionComplete(n, f, i)
                },
                o;
            f && h ? (o = u.getTransitionDurationFromElement(f), r.default(f).removeClass("show").one(u.TRANSITION_END, e).emulateTransitionEnd(o)) : e()
        }, t._transitionComplete = function(n, t, i) {
            var f, e, o;
            t && (r.default(t).removeClass("active"), f = r.default(t.parentNode).find("> .dropdown-menu .active")[0], f && r.default(f).removeClass("active"), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !1));
            (r.default(n).addClass("active"), "tab" === n.getAttribute("role") && n.setAttribute("aria-selected", !0), u.reflow(n), n.classList.contains("fade") && n.classList.add("show"), n.parentNode && r.default(n.parentNode).hasClass("dropdown-menu")) && (e = r.default(n).closest(".dropdown")[0], e && (o = [].slice.call(e.querySelectorAll(".dropdown-toggle")), r.default(o).addClass("active")), n.setAttribute("aria-expanded", !0));
            i && i()
        }, n._jQueryInterface = function(t) {
            return this.each(function() {
                var u = r.default(this),
                    i = u.data("bs.tab");
                if (i || (i = new n(this), u.data("bs.tab", i)), "string" == typeof t) {
                    if ("undefined" == typeof i[t]) throw new TypeError('No method named "' + t + '"');
                    i[t]()
                }
            })
        }, e(n, null, [{
            key: "VERSION",
            get: function() {
                return "4.6.0"
            }
        }]), n
    }();
    r.default(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', function(n) {
        n.preventDefault();
        k._jQueryInterface.call(r.default(this), "show")
    });
    r.default.fn.tab = k._jQueryInterface;
    r.default.fn.tab.Constructor = k;
    r.default.fn.tab.noConflict = function() {
        return r.default.fn.tab = yt, k._jQueryInterface
    };
    var ur = r.default.fn.toast,
        fr = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        },
        pt = {
            animation: !0,
            autohide: !0,
            delay: 500
        },
        ut = function() {
            function t(n, t) {
                this._element = n;
                this._config = this._getConfig(t);
                this._timeout = null;
                this._setListeners()
            }
            var n = t.prototype;
            return n.show = function() {
                var n = this,
                    i = r.default.Event("show.bs.toast"),
                    t, f;
                (r.default(this._element).trigger(i), i.isDefaultPrevented()) || (this._clearTimeout(), this._config.animation && this._element.classList.add("fade"), t = function() {
                    n._element.classList.remove("showing");
                    n._element.classList.add("show");
                    r.default(n._element).trigger("shown.bs.toast");
                    n._config.autohide && (n._timeout = setTimeout(function() {
                        n.hide()
                    }, n._config.delay))
                }, (this._element.classList.remove("hide"), u.reflow(this._element), this._element.classList.add("showing"), this._config.animation) ? (f = u.getTransitionDurationFromElement(this._element), r.default(this._element).one(u.TRANSITION_END, t).emulateTransitionEnd(f)) : t())
            }, n.hide = function() {
                if (this._element.classList.contains("show")) {
                    var n = r.default.Event("hide.bs.toast");
                    r.default(this._element).trigger(n);
                    n.isDefaultPrevented() || this._close()
                }
            }, n.dispose = function() {
                this._clearTimeout();
                this._element.classList.contains("show") && this._element.classList.remove("show");
                r.default(this._element).off("click.dismiss.bs.toast");
                r.default.removeData(this._element, "bs.toast");
                this._element = null;
                this._config = null
            }, n._getConfig = function(n) {
                return n = f({}, pt, r.default(this._element).data(), "object" == typeof n && n ? n : {}), u.typeCheckConfig("toast", n, this.constructor.DefaultType), n
            }, n._setListeners = function() {
                var n = this;
                r.default(this._element).on("click.dismiss.bs.toast", '[data-dismiss="toast"]', function() {
                    return n.hide()
                })
            }, n._close = function() {
                var n = this,
                    t = function() {
                        n._element.classList.add("hide");
                        r.default(n._element).trigger("hidden.bs.toast")
                    },
                    i;
                (this._element.classList.remove("show"), this._config.animation) ? (i = u.getTransitionDurationFromElement(this._element), r.default(this._element).one(u.TRANSITION_END, t).emulateTransitionEnd(i)) : t()
            }, n._clearTimeout = function() {
                clearTimeout(this._timeout);
                this._timeout = null
            }, t._jQueryInterface = function(n) {
                return this.each(function() {
                    var u = r.default(this),
                        i = u.data("bs.toast");
                    if (i || (i = new t(this, "object" == typeof n && n), u.data("bs.toast", i)), "string" == typeof n) {
                        if ("undefined" == typeof i[n]) throw new TypeError('No method named "' + n + '"');
                        i[n](this)
                    }
                })
            }, e(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.6.0"
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return fr
                }
            }, {
                key: "Default",
                get: function() {
                    return pt
                }
            }]), t
        }();
    r.default.fn.toast = ut._jQueryInterface;
    r.default.fn.toast.Constructor = ut;
    r.default.fn.toast.noConflict = function() {
        return r.default.fn.toast = ur, ut._jQueryInterface
    };
    n.Alert = l;
    n.Button = a;
    n.Carousel = y;
    n.Collapse = g;
    n.Dropdown = o;
    n.Modal = nt;
    n.Popover = rt;
    n.Scrollspy = tt;
    n.Tab = k;
    n.Toast = ut;
    n.Tooltip = h;
    n.Util = u;
    Object.defineProperty(n, "__esModule", {
        value: !0
    })
});
/*! jQuery Validation Plugin - v1.19.3 - 1/9/2021
 * https://jqueryvalidation.org/
 * Copyright (c) 2021 Jörn Zaefferer; Licensed MIT */
! function(n) {
    "function" == typeof define && define.amd ? define(["jquery"], n) : "object" == typeof module && module.exports ? module.exports = n(require("jquery")) : n(jQuery)
}(function(n) {
    var i, r, t;
    return n.extend(n.fn, {
        validate: function(t) {
            if (!this.length) return void(t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var i = n.data(this[0], "validator");
            return i ? i : (this.attr("novalidate", "novalidate"), i = new n.validator(t, this[0]), n.data(this[0], "validator", i), i.settings.onsubmit && (this.on("click.validate", ":submit", function(t) {
                i.submitButton = t.currentTarget;
                n(this).hasClass("cancel") && (i.cancelSubmit = !0);
                void 0 !== n(this).attr("formnovalidate") && (i.cancelSubmit = !0)
            }), this.on("submit.validate", function(t) {
                function r() {
                    var r, u;
                    return i.submitButton && (i.settings.submitHandler || i.formSubmitted) && (r = n("<input type='hidden'/>").attr("name", i.submitButton.name).val(n(i.submitButton).val()).appendTo(i.currentForm)), !(i.settings.submitHandler && !i.settings.debug) || (u = i.settings.submitHandler.call(i, i.currentForm, t), r && r.remove(), void 0 !== u && u)
                }
                return i.settings.debug && t.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, r()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : r() : (i.focusInvalid(), !1)
            })), i)
        },
        valid: function() {
            var t, i, r;
            return n(this[0]).is("form") ? t = this.validate().form() : (r = [], t = !0, i = n(this[0].form).validate(), this.each(function() {
                t = i.element(this) && t;
                t || (r = r.concat(i.errorList))
            }), i.errorList = r), t
        },
        rules: function(t, i) {
            var e, s, f, u, o, h, r = this[0],
                c = "undefined" != typeof this.attr("contenteditable") && "false" !== this.attr("contenteditable");
            if (null != r && (!r.form && c && (r.form = this.closest("form")[0], r.name = this.attr("name")), null != r.form)) {
                if (t) switch (e = n.data(r.form, "validator").settings, s = e.rules, f = n.validator.staticRules(r), t) {
                    case "add":
                        n.extend(f, n.validator.normalizeRule(i));
                        delete f.messages;
                        s[r.name] = f;
                        i.messages && (e.messages[r.name] = n.extend(e.messages[r.name], i.messages));
                        break;
                    case "remove":
                        return i ? (h = {}, n.each(i.split(/\s/), function(n, t) {
                            h[t] = f[t];
                            delete f[t]
                        }), h) : (delete s[r.name], f)
                }
                return u = n.validator.normalizeRules(n.extend({}, n.validator.classRules(r), n.validator.attributeRules(r), n.validator.dataRules(r), n.validator.staticRules(r)), r), u.required && (o = u.required, delete u.required, u = n.extend({
                    required: o
                }, u)), u.remote && (o = u.remote, delete u.remote, u = n.extend(u, {
                    remote: o
                })), u
            }
        }
    }), i = function(n) {
        return n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
    }, n.extend(n.expr.pseudos || n.expr[":"], {
        blank: function(t) {
            return !i("" + n(t).val())
        },
        filled: function(t) {
            var r = n(t).val();
            return null !== r && !!i("" + r)
        },
        unchecked: function(t) {
            return !n(t).prop("checked")
        }
    }), n.validator = function(t, i) {
        this.settings = n.extend(!0, {}, n.validator.defaults, t);
        this.currentForm = i;
        this.init()
    }, n.validator.format = function(t, i) {
        return 1 === arguments.length ? function() {
            var i = n.makeArray(arguments);
            return i.unshift(t), n.validator.format.apply(this, i)
        } : void 0 === i ? t : (arguments.length > 2 && i.constructor !== Array && (i = n.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), n.each(i, function(n, i) {
            t = t.replace(new RegExp("\\{" + n + "\\}", "g"), function() {
                return i
            })
        }), t)
    }, n.extend(n.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            pendingClass: "pending",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: n([]),
            errorLabelContainer: n([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(n) {
                this.lastActive = n;
                this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, n, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(n)))
            },
            onfocusout: function(n) {
                !this.checkable(n) && (n.name in this.submitted || !this.optional(n)) && this.element(n)
            },
            onkeyup: function(t, i) {
                9 === i.which && "" === this.elementValue(t) || n.inArray(i.keyCode, [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225]) !== -1 || (t.name in this.submitted || t.name in this.invalid) && this.element(t)
            },
            onclick: function(n) {
                n.name in this.submitted ? this.element(n) : n.parentNode.name in this.submitted && this.element(n.parentNode)
            },
            highlight: function(t, i, r) {
                "radio" === t.type ? this.findByName(t.name).addClass(i).removeClass(r) : n(t).addClass(i).removeClass(r)
            },
            unhighlight: function(t, i, r) {
                "radio" === t.type ? this.findByName(t.name).removeClass(i).addClass(r) : n(t).removeClass(i).addClass(r)
            }
        },
        setDefaults: function(t) {
            n.extend(n.validator.defaults, t)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            equalTo: "Please enter the same value again.",
            maxlength: n.validator.format("Please enter no more than {0} characters."),
            minlength: n.validator.format("Please enter at least {0} characters."),
            rangelength: n.validator.format("Please enter a value between {0} and {1} characters long."),
            range: n.validator.format("Please enter a value between {0} and {1}."),
            max: n.validator.format("Please enter a value less than or equal to {0}."),
            min: n.validator.format("Please enter a value greater than or equal to {0}."),
            step: n.validator.format("Please enter a multiple of {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function i(t) {
                    var e = "undefined" != typeof n(this).attr("contenteditable") && "false" !== n(this).attr("contenteditable");
                    if (!this.form && e && (this.form = n(this).closest("form")[0], this.name = n(this).attr("name")), r === this.form) {
                        var u = n.data(this.form, "validator"),
                            f = "on" + t.type.replace(/^validate/, ""),
                            i = u.settings;
                        i[f] && !n(this).is(i.ignore) && i[f].call(u, this, t)
                    }
                }
                this.labelContainer = n(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || n(this.currentForm);
                this.containers = n(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();
                var t, r = this.currentForm,
                    u = this.groups = {};
                n.each(this.settings.groups, function(t, i) {
                    "string" == typeof i && (i = i.split(/\s/));
                    n.each(i, function(n, i) {
                        u[i] = t
                    })
                });
                t = this.settings.rules;
                n.each(t, function(i, r) {
                    t[i] = n.validator.normalizeRule(r)
                });
                n(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']", i).on("click.validate", "select, option, [type='radio'], [type='checkbox']", i);
                this.settings.invalidHandler && n(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler)
            },
            form: function() {
                return this.checkForm(), n.extend(this.submitted, this.errorMap), this.invalid = n.extend({}, this.errorMap), this.valid() || n(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var n = 0, t = this.currentElements = this.elements(); t[n]; n++) this.check(t[n]);
                return this.valid()
            },
            element: function(t) {
                var e, o, i = this.clean(t),
                    r = this.validationTargetFor(i),
                    u = this,
                    f = !0;
                return void 0 === r ? delete this.invalid[i.name] : (this.prepareElement(r), this.currentElements = n(r), o = this.groups[r.name], o && n.each(this.groups, function(n, t) {
                    t === o && n !== r.name && (i = u.validationTargetFor(u.clean(u.findByName(n))), i && i.name in u.invalid && (u.currentElements.push(i), f = u.check(i) && f))
                }), e = this.check(r) !== !1, f = f && e, this.invalid[r.name] = e ? !1 : !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), n(t).attr("aria-invalid", !e)), f
            },
            showErrors: function(t) {
                if (t) {
                    var i = this;
                    n.extend(this.errorMap, t);
                    this.errorList = n.map(this.errorMap, function(n, t) {
                        return {
                            message: n,
                            element: i.findByName(t)[0]
                        }
                    });
                    this.successList = n.grep(this.successList, function(n) {
                        return !(n.name in t)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                n.fn.resetForm && n(this.currentForm).resetForm();
                this.invalid = {};
                this.submitted = {};
                this.prepareForm();
                this.hideErrors();
                var t = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                this.resetElements(t)
            },
            resetElements: function(n) {
                var t;
                if (this.settings.unhighlight)
                    for (t = 0; n[t]; t++) this.settings.unhighlight.call(this, n[t], this.settings.errorClass, ""), this.findByName(n[t].name).removeClass(this.settings.validClass);
                else n.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(n) {
                var t, i = 0;
                for (t in n) void 0 !== n[t] && null !== n[t] && n[t] !== !1 && i++;
                return i
            },
            hideErrors: function() {
                this.hideThese(this.toHide)
            },
            hideThese: function(n) {
                n.not(this.containers).text("");
                this.addWrapper(n).hide()
            },
            valid: function() {
                return 0 === this.size()
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    n(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").trigger("focus").trigger("focusin")
                } catch (t) {}
            },
            findLastActive: function() {
                var t = this.lastActive;
                return t && 1 === n.grep(this.errorList, function(n) {
                    return n.element.name === t.name
                }).length && t
            },
            elements: function() {
                var t = this,
                    i = {};
                return n(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() {
                    var r = this.name || n(this).attr("name"),
                        u = "undefined" != typeof n(this).attr("contenteditable") && "false" !== n(this).attr("contenteditable");
                    return !r && t.settings.debug && window.console && console.error("%o has no name assigned", this), u && (this.form = n(this).closest("form")[0], this.name = r), this.form === t.currentForm && !(r in i || !t.objectLength(n(this).rules())) && (i[r] = !0, !0)
                })
            },
            clean: function(t) {
                return n(t)[0]
            },
            errors: function() {
                var t = this.settings.errorClass.split(" ").join(".");
                return n(this.settings.errorElement + "." + t, this.errorContext)
            },
            resetInternals: function() {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = n([]);
                this.toHide = n([])
            },
            reset: function() {
                this.resetInternals();
                this.currentElements = n([])
            },
            prepareForm: function() {
                this.reset();
                this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(n) {
                this.reset();
                this.toHide = this.errorsFor(n)
            },
            elementValue: function(t) {
                var i, r, u = n(t),
                    f = t.type,
                    e = "undefined" != typeof u.attr("contenteditable") && "false" !== u.attr("contenteditable");
                return "radio" === f || "checkbox" === f ? this.findByName(t.name).filter(":checked").val() : "number" === f && "undefined" != typeof t.validity ? t.validity.badInput ? "NaN" : u.val() : (i = e ? u.text() : u.val(), "file" === f ? "C:\\fakepath\\" === i.substr(0, 12) ? i.substr(12) : (r = i.lastIndexOf("/"), r >= 0 ? i.substr(r + 1) : (r = i.lastIndexOf("\\"), r >= 0 ? i.substr(r + 1) : i)) : "string" == typeof i ? i.replace(/\r/g, "") : i)
            },
            check: function(t) {
                t = this.validationTargetFor(this.clean(t));
                var u, f, r, e, i = n(t).rules(),
                    c = n.map(i, function(n, t) {
                        return t
                    }).length,
                    s = !1,
                    h = this.elementValue(t);
                "function" == typeof i.normalizer ? e = i.normalizer : "function" == typeof this.settings.normalizer && (e = this.settings.normalizer);
                e && (h = e.call(t, h), delete i.normalizer);
                for (f in i) {
                    r = {
                        method: f,
                        parameters: i[f]
                    };
                    try {
                        if (u = n.validator.methods[f].call(this, h, t, r.parameters), "dependency-mismatch" === u && 1 === c) {
                            s = !0;
                            continue
                        }
                        if (s = !1, "pending" === u) return void(this.toHide = this.toHide.not(this.errorsFor(t)));
                        if (!u) return this.formatAndAdd(t, r), !1
                    } catch (o) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + r.method + "' method.", o), o instanceof TypeError && (o.message += ".  Exception occurred when checking element " + t.id + ", check the '" + r.method + "' method."), o;
                    }
                }
                if (!s) return this.objectLength(i) && this.successList.push(t), !0
            },
            customDataMessage: function(t, i) {
                return n(t).data("msg" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()) || n(t).data("msg")
            },
            customMessage: function(n, t) {
                var i = this.settings.messages[n];
                return i && (i.constructor === String ? i : i[t])
            },
            findDefined: function() {
                for (var n = 0; n < arguments.length; n++)
                    if (void 0 !== arguments[n]) return arguments[n]
            },
            defaultMessage: function(t, i) {
                "string" == typeof i && (i = {
                    method: i
                });
                var r = this.findDefined(this.customMessage(t.name, i.method), this.customDataMessage(t, i.method), !this.settings.ignoreTitle && t.title || void 0, n.validator.messages[i.method], "<strong>Warning: No message defined for " + t.name + "<\/strong>"),
                    u = /\$?\{(\d+)\}/g;
                return "function" == typeof r ? r = r.call(this, i.parameters, t) : u.test(r) && (r = n.validator.format(r.replace(u, "{$1}"), i.parameters)), r
            },
            formatAndAdd: function(n, t) {
                var i = this.defaultMessage(n, t);
                this.errorList.push({
                    message: i,
                    element: n,
                    method: t.method
                });
                this.errorMap[n.name] = i;
                this.submitted[n.name] = i
            },
            addWrapper: function(n) {
                return this.settings.wrapper && (n = n.add(n.parent(this.settings.wrapper))), n
            },
            defaultShowErrors: function() {
                for (var i, t, n = 0; this.errorList[n]; n++) t = this.errorList[n], this.settings.highlight && this.settings.highlight.call(this, t.element, this.settings.errorClass, this.settings.validClass), this.showLabel(t.element, t.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (n = 0; this.successList[n]; n++) this.showLabel(this.successList[n]);
                if (this.settings.unhighlight)
                    for (n = 0, i = this.validElements(); i[n]; n++) this.settings.unhighlight.call(this, i[n], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return n(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(t, i) {
                var u, s, e, o, r = this.errorsFor(t),
                    h = this.idOrName(t),
                    f = n(t).attr("aria-describedby");
                r.length ? (r.removeClass(this.settings.validClass).addClass(this.settings.errorClass), r.html(i)) : (r = n("<" + this.settings.errorElement + ">").attr("id", h + "-error").addClass(this.settings.errorClass).html(i || ""), u = r, this.settings.wrapper && (u = r.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(u) : this.settings.errorPlacement ? this.settings.errorPlacement.call(this, u, n(t)) : u.insertAfter(t), r.is("label") ? r.attr("for", h) : 0 === r.parents("label[for='" + this.escapeCssMeta(h) + "']").length && (e = r.attr("id"), f ? f.match(new RegExp("\\b" + this.escapeCssMeta(e) + "\\b")) || (f += " " + e) : f = e, n(t).attr("aria-describedby", f), s = this.groups[t.name], s && (o = this, n.each(o.groups, function(t, i) {
                    i === s && n("[name='" + o.escapeCssMeta(t) + "']", o.currentForm).attr("aria-describedby", r.attr("id"))
                }))));
                !i && this.settings.success && (r.text(""), "string" == typeof this.settings.success ? r.addClass(this.settings.success) : this.settings.success(r, t));
                this.toShow = this.toShow.add(r)
            },
            errorsFor: function(t) {
                var r = this.escapeCssMeta(this.idOrName(t)),
                    u = n(t).attr("aria-describedby"),
                    i = "label[for='" + r + "'], label[for='" + r + "'] *";
                return u && (i = i + ", #" + this.escapeCssMeta(u).replace(/\s+/g, ", #")), this.errors().filter(i)
            },
            escapeCssMeta: function(n) {
                return n.replace(/([\\!"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~])/g, "\\$1")
            },
            idOrName: function(n) {
                return this.groups[n.name] || (this.checkable(n) ? n.name : n.id || n.name)
            },
            validationTargetFor: function(t) {
                return this.checkable(t) && (t = this.findByName(t.name)), n(t).not(this.settings.ignore)[0]
            },
            checkable: function(n) {
                return /radio|checkbox/i.test(n.type)
            },
            findByName: function(t) {
                return n(this.currentForm).find("[name='" + this.escapeCssMeta(t) + "']")
            },
            getLength: function(t, i) {
                switch (i.nodeName.toLowerCase()) {
                    case "select":
                        return n("option:selected", i).length;
                    case "input":
                        if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length
                }
                return t.length
            },
            depend: function(n, t) {
                return !this.dependTypes[typeof n] || this.dependTypes[typeof n](n, t)
            },
            dependTypes: {
                boolean: function(n) {
                    return n
                },
                string: function(t, i) {
                    return !!n(t, i.form).length
                },
                "function": function(n, t) {
                    return n(t)
                }
            },
            optional: function(t) {
                var i = this.elementValue(t);
                return !n.validator.methods.required.call(this, i, t) && "dependency-mismatch"
            },
            startRequest: function(t) {
                this.pending[t.name] || (this.pendingRequest++, n(t).addClass(this.settings.pendingClass), this.pending[t.name] = !0)
            },
            stopRequest: function(t, i) {
                this.pendingRequest--;
                this.pendingRequest < 0 && (this.pendingRequest = 0);
                delete this.pending[t.name];
                n(t).removeClass(this.settings.pendingClass);
                i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (n(this.currentForm).submit(), this.submitButton && n("input:hidden[name='" + this.submitButton.name + "']", this.currentForm).remove(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (n(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function(t, i) {
                return i = "string" == typeof i && i || "remote", n.data(t, "previousValue") || n.data(t, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(t, {
                        method: i
                    })
                })
            },
            destroy: function() {
                this.resetForm();
                n(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur").find(".validate-lessThan-blur").off(".validate-lessThan").removeClass("validate-lessThan-blur").find(".validate-lessThanEqual-blur").off(".validate-lessThanEqual").removeClass("validate-lessThanEqual-blur").find(".validate-greaterThanEqual-blur").off(".validate-greaterThanEqual").removeClass("validate-greaterThanEqual-blur").find(".validate-greaterThan-blur").off(".validate-greaterThan").removeClass("validate-greaterThan-blur")
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(t, i) {
            t.constructor === String ? this.classRuleSettings[t] = i : n.extend(this.classRuleSettings, t)
        },
        classRules: function(t) {
            var i = {},
                r = n(t).attr("class");
            return r && n.each(r.split(" "), function() {
                this in n.validator.classRuleSettings && n.extend(i, n.validator.classRuleSettings[this])
            }), i
        },
        normalizeAttributeRule: function(n, t, i, r) {
            /min|max|step/.test(i) && (null === t || /number|range|text/.test(t)) && (r = Number(r), isNaN(r) && (r = void 0));
            r || 0 === r ? n[i] = r : t === i && "range" !== t && (n[i] = !0)
        },
        attributeRules: function(t) {
            var r, i, u = {},
                f = n(t),
                e = t.getAttribute("type");
            for (r in n.validator.methods) "required" === r ? (i = t.getAttribute(r), "" === i && (i = !0), i = !!i) : i = f.attr(r), this.normalizeAttributeRule(u, e, r, i);
            return u.maxlength && /-1|2147483647|524288/.test(u.maxlength) && delete u.maxlength, u
        },
        dataRules: function(t) {
            var i, r, u = {},
                f = n(t),
                e = t.getAttribute("type");
            for (i in n.validator.methods) r = f.data("rule" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()), "" === r && (r = !0), this.normalizeAttributeRule(u, e, i, r);
            return u
        },
        staticRules: function(t) {
            var i = {},
                r = n.data(t.form, "validator");
            return r.settings.rules && (i = n.validator.normalizeRule(r.settings.rules[t.name]) || {}), i
        },
        normalizeRules: function(t, i) {
            return n.each(t, function(r, u) {
                if (u === !1) return void delete t[r];
                if (u.param || u.depends) {
                    var f = !0;
                    switch (typeof u.depends) {
                        case "string":
                            f = !!n(u.depends, i.form).length;
                            break;
                        case "function":
                            f = u.depends.call(i, i)
                    }
                    f ? t[r] = void 0 === u.param || u.param : (n.data(i.form, "validator").resetElements(n(i)), delete t[r])
                }
            }), n.each(t, function(n, r) {
                t[n] = "function" == typeof r && "normalizer" !== n ? r(i) : r
            }), n.each(["minlength", "maxlength"], function() {
                t[this] && (t[this] = Number(t[this]))
            }), n.each(["rangelength", "range"], function() {
                var n;
                t[this] && (Array.isArray(t[this]) ? t[this] = [Number(t[this][0]), Number(t[this][1])] : "string" == typeof t[this] && (n = t[this].replace(/[\[\]]/g, "").split(/[\s,]+/), t[this] = [Number(n[0]), Number(n[1])]))
            }), n.validator.autoCreateRanges && (null != t.min && null != t.max && (t.range = [t.min, t.max], delete t.min, delete t.max), null != t.minlength && null != t.maxlength && (t.rangelength = [t.minlength, t.maxlength], delete t.minlength, delete t.maxlength)), t
        },
        normalizeRule: function(t) {
            if ("string" == typeof t) {
                var i = {};
                n.each(t.split(/\s/), function() {
                    i[this] = !0
                });
                t = i
            }
            return t
        },
        addMethod: function(t, i, r) {
            n.validator.methods[t] = i;
            n.validator.messages[t] = void 0 !== r ? r : n.validator.messages[t];
            i.length < 3 && n.validator.addClassRules(t, n.validator.normalizeRule(t))
        },
        methods: {
            required: function(t, i, r) {
                if (!this.depend(r, i)) return "dependency-mismatch";
                if ("select" === i.nodeName.toLowerCase()) {
                    var u = n(i).val();
                    return u && u.length > 0
                }
                return this.checkable(i) ? this.getLength(t, i) > 0 : void 0 !== t && null !== t && t.length > 0
            },
            email: function(n, t) {
                return this.optional(t) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(n)
            },
            url: function(n, t) {
                return this.optional(t) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(n)
            },
            date: function() {
                var n = !1;
                return function(t, i) {
                    return n || (n = !0, this.settings.debug && window.console && console.warn("The `date` method is deprecated and will be removed in version '2.0.0'.\nPlease don't use it, since it relies on the Date constructor, which\nbehaves very differently across browsers and locales. Use `dateISO`\ninstead or one of the locale specific methods in `localizations/`\nand `additional-methods.js`.")), this.optional(i) || !/Invalid|NaN/.test(new Date(t).toString())
                }
            }(),
            dateISO: function(n, t) {
                return this.optional(t) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(n)
            },
            number: function(n, t) {
                return this.optional(t) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(n)
            },
            digits: function(n, t) {
                return this.optional(t) || /^\d+$/.test(n)
            },
            minlength: function(n, t, i) {
                var r = Array.isArray(n) ? n.length : this.getLength(n, t);
                return this.optional(t) || r >= i
            },
            maxlength: function(n, t, i) {
                var r = Array.isArray(n) ? n.length : this.getLength(n, t);
                return this.optional(t) || r <= i
            },
            rangelength: function(n, t, i) {
                var r = Array.isArray(n) ? n.length : this.getLength(n, t);
                return this.optional(t) || r >= i[0] && r <= i[1]
            },
            min: function(n, t, i) {
                return this.optional(t) || n >= i
            },
            max: function(n, t, i) {
                return this.optional(t) || n <= i
            },
            range: function(n, t, i) {
                return this.optional(t) || n >= i[0] && n <= i[1]
            },
            step: function(t, i, r) {
                var u, f = n(i).attr("type"),
                    h = "Step attribute on input type " + f + " is not supported.",
                    c = new RegExp("\\b" + f + "\\b"),
                    l = f && !c.test("text,number,range"),
                    e = function(n) {
                        var t = ("" + n).match(/(?:\.(\d+))?$/);
                        return t && t[1] ? t[1].length : 0
                    },
                    o = function(n) {
                        return Math.round(n * Math.pow(10, u))
                    },
                    s = !0;
                if (l) throw new Error(h);
                return u = e(r), (e(t) > u || o(t) % o(r) != 0) && (s = !1), this.optional(i) || s
            },
            equalTo: function(t, i, r) {
                var u = n(r);
                return this.settings.onfocusout && u.not(".validate-equalTo-blur").length && u.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function() {
                    n(i).valid()
                }), t === u.val()
            },
            remote: function(t, i, r, u) {
                if (this.optional(i)) return "dependency-mismatch";
                u = "string" == typeof u && u || "remote";
                var f, o, s, e = this.previousValue(i, u);
                return this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), e.originalMessage = e.originalMessage || this.settings.messages[i.name][u], this.settings.messages[i.name][u] = e.message, r = "string" == typeof r && {
                    url: r
                } || r, s = n.param(n.extend({
                    data: t
                }, r.data)), e.old === s ? e.valid : (e.old = s, f = this, this.startRequest(i), o = {}, o[i.name] = t, n.ajax(n.extend(!0, {
                    mode: "abort",
                    port: "validate" + i.name,
                    dataType: "json",
                    data: o,
                    context: f.currentForm,
                    success: function(n) {
                        var r, s, h, o = n === !0 || "true" === n;
                        f.settings.messages[i.name][u] = e.originalMessage;
                        o ? (h = f.formSubmitted, f.resetInternals(), f.toHide = f.errorsFor(i), f.formSubmitted = h, f.successList.push(i), f.invalid[i.name] = !1, f.showErrors()) : (r = {}, s = n || f.defaultMessage(i, {
                            method: u,
                            parameters: t
                        }), r[i.name] = e.message = s, f.invalid[i.name] = !0, f.showErrors(r));
                        e.valid = o;
                        f.stopRequest(i, o)
                    }
                }, r)), "pending")
            }
        }
    }), t = {}, n.ajaxPrefilter ? n.ajaxPrefilter(function(n, i, r) {
        var u = n.port;
        "abort" === n.mode && (t[u] && t[u].abort(), t[u] = r)
    }) : (r = n.ajax, n.ajax = function(i) {
        var f = ("mode" in i ? i : n.ajaxSettings).mode,
            u = ("port" in i ? i : n.ajaxSettings).port;
        return "abort" === f ? (t[u] && t[u].abort(), t[u] = r.apply(this, arguments), t[u]) : r.apply(this, arguments)
    }), n
});
/*! jQuery UI - v1.12.1 - 2016-09-14
 * http://jqueryui.com
 * Includes: widget.js, position.js, data.js, disable-selection.js, effect.js, effects/effect-blind.js, effects/effect-bounce.js, effects/effect-clip.js, effects/effect-drop.js, effects/effect-explode.js, effects/effect-fade.js, effects/effect-fold.js, effects/effect-highlight.js, effects/effect-puff.js, effects/effect-pulsate.js, effects/effect-scale.js, effects/effect-shake.js, effects/effect-size.js, effects/effect-slide.js, effects/effect-transfer.js, focusable.js, form-reset-mixin.js, jquery-1-7.js, keycode.js, labels.js, scroll-parent.js, tabbable.js, unique-id.js, widgets/accordion.js, widgets/autocomplete.js, widgets/button.js, widgets/checkboxradio.js, widgets/controlgroup.js, widgets/datepicker.js, widgets/dialog.js, widgets/draggable.js, widgets/droppable.js, widgets/menu.js, widgets/mouse.js, widgets/progressbar.js, widgets/resizable.js, widgets/selectable.js, widgets/selectmenu.js, widgets/slider.js, widgets/sortable.js, widgets/spinner.js, widgets/tabs.js, widgets/tooltip.js
 * Copyright jQuery Foundation and other contributors; Licensed MIT */
(function(n) {
    "function" == typeof define && define.amd ? define(["jquery"], n) : n(jQuery)
})(function(n) {
    function b(n) {
        for (var t = n.css("visibility");
            "inherit" === t;) n = n.parent(), t = n.css("visibility");
        return "hidden" !== t
    }

    function k(n) {
        for (var t, i; n.length && n[0] !== document;) {
            if (t = n.css("position"), ("absolute" === t || "relative" === t || "fixed" === t) && (i = parseInt(n.css("zIndex"), 10), !isNaN(i) && 0 !== i)) return i;
            n = n.parent()
        }
        return 0
    }

    function c() {
        this._curInst = null;
        this._keyEvent = !1;
        this._disabledInputs = [];
        this._datepickerShowing = !1;
        this._inDialog = !1;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        };
        n.extend(this._defaults, this.regional[""]);
        this.regional.en = n.extend(!0, {}, this.regional[""]);
        this.regional["en-US"] = n.extend(!0, {}, this.regional.en);
        this.dpDiv = l(n("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'><\/div>"))
    }

    function l(t) {
        var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return t.on("mouseout", i, function() {
            n(this).removeClass("ui-state-hover"); - 1 !== this.className.indexOf("ui-datepicker-prev") && n(this).removeClass("ui-datepicker-prev-hover"); - 1 !== this.className.indexOf("ui-datepicker-next") && n(this).removeClass("ui-datepicker-next-hover")
        }).on("mouseover", i, a)
    }

    function a() {
        n.datepicker._isDisabledDatepicker(i.inline ? i.dpDiv.parent()[0] : i.input[0]) || (n(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), n(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && n(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && n(this).addClass("ui-datepicker-next-hover"))
    }

    function u(t, i) {
        n.extend(t, i);
        for (var r in i) null == i[r] && (t[r] = i[r]);
        return t
    }

    function t(n) {
        return function() {
            var t = this.element.val();
            n.apply(this, arguments);
            this._refresh();
            t !== this.element.val() && this._trigger("change")
        }
    }
    var v, o, p, w, i, r, e;
    n.ui = n.ui || {};
    n.ui.version = "1.12.1";
    v = 0;
    o = Array.prototype.slice;
    n.cleanData = function(t) {
        return function(i) {
            for (var r, u, f = 0; null != (u = i[f]); f++) try {
                r = n._data(u, "events");
                r && r.remove && n(u).triggerHandler("remove")
            } catch (e) {}
            t(i)
        }
    }(n.cleanData);
    n.widget = function(t, i, r) {
        var f, u, o, h = {},
            e = t.split(".")[0],
            s;
        return t = t.split(".")[1], s = e + "-" + t, r || (r = i, i = n.Widget), n.isArray(r) && (r = n.extend.apply(null, [{}].concat(r))), n.expr[":"][s.toLowerCase()] = function(t) {
            return !!n.data(t, s)
        }, n[e] = n[e] || {}, f = n[e][t], u = n[e][t] = function(n, t) {
            return this._createWidget ? (arguments.length && this._createWidget(n, t), void 0) : new u(n, t)
        }, n.extend(u, f, {
            version: r.version,
            _proto: n.extend({}, r),
            _childConstructors: []
        }), o = new i, o.options = n.widget.extend({}, o.options), n.each(r, function(t, r) {
            return n.isFunction(r) ? (h[t] = function() {
                function n() {
                    return i.prototype[t].apply(this, arguments)
                }

                function u(n) {
                    return i.prototype[t].apply(this, n)
                }
                return function() {
                    var t, i = this._super,
                        f = this._superApply;
                    return this._super = n, this._superApply = u, t = r.apply(this, arguments), this._super = i, this._superApply = f, t
                }
            }(), void 0) : (h[t] = r, void 0)
        }), u.prototype = n.widget.extend(o, {
            widgetEventPrefix: f ? o.widgetEventPrefix || t : t
        }, h, {
            constructor: u,
            namespace: e,
            widgetName: t,
            widgetFullName: s
        }), f ? (n.each(f._childConstructors, function(t, i) {
            var r = i.prototype;
            n.widget(r.namespace + "." + r.widgetName, u, i._proto)
        }), delete f._childConstructors) : i._childConstructors.push(u), n.widget.bridge(t, u), u
    };
    n.widget.extend = function(t) {
        for (var i, r, f = o.call(arguments, 1), u = 0, e = f.length; e > u; u++)
            for (i in f[u]) r = f[u][i], f[u].hasOwnProperty(i) && void 0 !== r && (t[i] = n.isPlainObject(r) ? n.isPlainObject(t[i]) ? n.widget.extend({}, t[i], r) : n.widget.extend({}, r) : r);
        return t
    };
    n.widget.bridge = function(t, i) {
        var r = i.prototype.widgetFullName || t;
        n.fn[t] = function(u) {
            var s = "string" == typeof u,
                e = o.call(arguments, 1),
                f = this;
            return s ? this.length || "instance" !== u ? this.each(function() {
                var i, o = n.data(this, r);
                return "instance" === u ? (f = o, !1) : o ? n.isFunction(o[u]) && "_" !== u.charAt(0) ? (i = o[u].apply(o, e), i !== o && void 0 !== i ? (f = i && i.jquery ? f.pushStack(i.get()) : i, !1) : void 0) : n.error("no such method '" + u + "' for " + t + " widget instance") : n.error("cannot call methods on " + t + " prior to initialization; attempted to call method '" + u + "'")
            }) : f = void 0 : (e.length && (u = n.widget.extend.apply(null, [u].concat(e))), this.each(function() {
                var t = n.data(this, r);
                t ? (t.option(u || {}), t._init && t._init()) : n.data(this, r, new i(u, this))
            })), f
        }
    };
    n.Widget = function() {};
    n.Widget._childConstructors = [];
    n.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            classes: {},
            disabled: !1,
            create: null
        },
        _createWidget: function(t, i) {
            i = n(i || this.defaultElement || this)[0];
            this.element = n(i);
            this.uuid = v++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.bindings = n();
            this.hoverable = n();
            this.focusable = n();
            this.classesElementLookup = {};
            i !== this && (n.data(i, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(n) {
                    n.target === i && this.destroy()
                }
            }), this.document = n(i.style ? i.ownerDocument : i.document || i), this.window = n(this.document[0].defaultView || this.document[0].parentWindow));
            this.options = n.widget.extend({}, this.options, this._getCreateOptions(), t);
            this._create();
            this.options.disabled && this._setOptionDisabled(this.options.disabled);
            this._trigger("create", null, this._getCreateEventData());
            this._init()
        },
        _getCreateOptions: function() {
            return {}
        },
        _getCreateEventData: n.noop,
        _create: n.noop,
        _init: n.noop,
        destroy: function() {
            var t = this;
            this._destroy();
            n.each(this.classesElementLookup, function(n, i) {
                t._removeClass(i, n)
            });
            this.element.off(this.eventNamespace).removeData(this.widgetFullName);
            this.widget().off(this.eventNamespace).removeAttr("aria-disabled");
            this.bindings.off(this.eventNamespace)
        },
        _destroy: n.noop,
        widget: function() {
            return this.element
        },
        option: function(t, i) {
            var r, u, f, e = t;
            if (0 === arguments.length) return n.widget.extend({}, this.options);
            if ("string" == typeof t)
                if (e = {}, r = t.split("."), t = r.shift(), r.length) {
                    for (u = e[t] = n.widget.extend({}, this.options[t]), f = 0; r.length - 1 > f; f++) u[r[f]] = u[r[f]] || {}, u = u[r[f]];
                    if (t = r.pop(), 1 === arguments.length) return void 0 === u[t] ? null : u[t];
                    u[t] = i
                } else {
                    if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
                    e[t] = i
                }
            return this._setOptions(e), this
        },
        _setOptions: function(n) {
            for (var t in n) this._setOption(t, n[t]);
            return this
        },
        _setOption: function(n, t) {
            return "classes" === n && this._setOptionClasses(t), this.options[n] = t, "disabled" === n && this._setOptionDisabled(t), this
        },
        _setOptionClasses: function(t) {
            var i, u, r;
            for (i in t) r = this.classesElementLookup[i], t[i] !== this.options.classes[i] && r && r.length && (u = n(r.get()), this._removeClass(r, i), u.addClass(this._classes({
                element: u,
                keys: i,
                classes: t,
                add: !0
            })))
        },
        _setOptionDisabled: function(n) {
            this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!n);
            n && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"))
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
        _classes: function(t) {
            function r(r, f) {
                for (var o, e = 0; r.length > e; e++) o = u.classesElementLookup[r[e]] || n(), o = t.add ? n(n.unique(o.get().concat(t.element.get()))) : n(o.not(t.element).get()), u.classesElementLookup[r[e]] = o, i.push(r[e]), f && t.classes[r[e]] && i.push(t.classes[r[e]])
            }
            var i = [],
                u = this;
            return t = n.extend({
                element: this.element,
                classes: this.options.classes || {}
            }, t), this._on(t.element, {
                remove: "_untrackClassesElement"
            }), t.keys && r(t.keys.match(/\S+/g) || [], !0), t.extra && r(t.extra.match(/\S+/g) || []), i.join(" ")
        },
        _untrackClassesElement: function(t) {
            var i = this;
            n.each(i.classesElementLookup, function(r, u) {
                -1 !== n.inArray(t.target, u) && (i.classesElementLookup[r] = n(u.not(t.target).get()))
            })
        },
        _removeClass: function(n, t, i) {
            return this._toggleClass(n, t, i, !1)
        },
        _addClass: function(n, t, i) {
            return this._toggleClass(n, t, i, !0)
        },
        _toggleClass: function(n, t, i, r) {
            r = "boolean" == typeof r ? r : i;
            var u = "string" == typeof n || null === n,
                f = {
                    extra: u ? t : i,
                    keys: u ? n : t,
                    element: u ? this.element : n,
                    add: r
                };
            return f.element.toggleClass(this._classes(f), r), this
        },
        _on: function(t, i, r) {
            var f, u = this;
            "boolean" != typeof t && (r = i, i = t, t = !1);
            r ? (i = f = n(i), this.bindings = this.bindings.add(i)) : (r = i, i = this.element, f = this.widget());
            n.each(r, function(r, e) {
                function o() {
                    if (t || u.options.disabled !== !0 && !n(this).hasClass("ui-state-disabled")) return ("string" == typeof e ? u[e] : e).apply(u, arguments)
                }
                "string" != typeof e && (o.guid = e.guid = e.guid || o.guid || n.guid++);
                var s = r.match(/^([\w:-]*)\s*(.*)$/),
                    h = s[1] + u.eventNamespace,
                    c = s[2];
                c ? f.on(h, c, o) : i.on(h, o)
            })
        },
        _off: function(t, i) {
            i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            t.off(i).off(i);
            this.bindings = n(this.bindings.not(t).get());
            this.focusable = n(this.focusable.not(t).get());
            this.hoverable = n(this.hoverable.not(t).get())
        },
        _delay: function(n, t) {
            function r() {
                return ("string" == typeof n ? i[n] : n).apply(i, arguments)
            }
            var i = this;
            return setTimeout(r, t || 0)
        },
        _hoverable: function(t) {
            this.hoverable = this.hoverable.add(t);
            this._on(t, {
                mouseenter: function(t) {
                    this._addClass(n(t.currentTarget), null, "ui-state-hover")
                },
                mouseleave: function(t) {
                    this._removeClass(n(t.currentTarget), null, "ui-state-hover")
                }
            })
        },
        _focusable: function(t) {
            this.focusable = this.focusable.add(t);
            this._on(t, {
                focusin: function(t) {
                    this._addClass(n(t.currentTarget), null, "ui-state-focus")
                },
                focusout: function(t) {
                    this._removeClass(n(t.currentTarget), null, "ui-state-focus")
                }
            })
        },
        _trigger: function(t, i, r) {
            var u, f, e = this.options[t];
            if (r = r || {}, i = n.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], f = i.originalEvent)
                for (u in f) u in i || (i[u] = f[u]);
            return this.element.trigger(i, r), !(n.isFunction(e) && e.apply(this.element[0], [i].concat(r)) === !1 || i.isDefaultPrevented())
        }
    };
    n.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(t, i) {
        n.Widget.prototype["_" + t] = function(r, u, f) {
            "string" == typeof u && (u = {
                effect: u
            });
            var o, e = u ? u === !0 || "number" == typeof u ? i : u.effect || i : t;
            u = u || {};
            "number" == typeof u && (u = {
                duration: u
            });
            o = !n.isEmptyObject(u);
            u.complete = f;
            u.delay && r.delay(u.delay);
            o && n.effects && n.effects.effect[e] ? r[t](u) : e !== t && r[e] ? r[e](u.duration, u.easing, f) : r.queue(function(i) {
                n(this)[t]();
                f && f.call(r[0]);
                i()
            })
        }
    });
    n.widget,
        function() {
            function f(n, t, i) {
                return [parseFloat(n[0]) * (c.test(n[0]) ? t / 100 : 1), parseFloat(n[1]) * (c.test(n[1]) ? i / 100 : 1)]
            }

            function i(t, i) {
                return parseInt(n.css(t, i), 10) || 0
            }

            function l(t) {
                var i = t[0];
                return 9 === i.nodeType ? {
                    width: t.width(),
                    height: t.height(),
                    offset: {
                        top: 0,
                        left: 0
                    }
                } : n.isWindow(i) ? {
                    width: t.width(),
                    height: t.height(),
                    offset: {
                        top: t.scrollTop(),
                        left: t.scrollLeft()
                    }
                } : i.preventDefault ? {
                    width: 0,
                    height: 0,
                    offset: {
                        top: i.pageY,
                        left: i.pageX
                    }
                } : {
                    width: t.outerWidth(),
                    height: t.outerHeight(),
                    offset: t.offset()
                }
            }
            var u, r = Math.max,
                t = Math.abs,
                e = /left|center|right/,
                o = /top|center|bottom/,
                s = /[\+\-]\d+(\.[\d]+)?%?/,
                h = /^\w+/,
                c = /%$/,
                a = n.fn.position;
            n.position = {
                scrollbarWidth: function() {
                    if (void 0 !== u) return u;
                    var r, i, t = n("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'><\/div><\/div>"),
                        f = t.children()[0];
                    return n("body").append(t), r = f.offsetWidth, t.css("overflow", "scroll"), i = f.offsetWidth, r === i && (i = t[0].clientWidth), t.remove(), u = r - i
                },
                getScrollInfo: function(t) {
                    var i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
                        r = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
                        u = "scroll" === i || "auto" === i && t.width < t.element[0].scrollWidth,
                        f = "scroll" === r || "auto" === r && t.height < t.element[0].scrollHeight;
                    return {
                        width: f ? n.position.scrollbarWidth() : 0,
                        height: u ? n.position.scrollbarWidth() : 0
                    }
                },
                getWithinInfo: function(t) {
                    var i = n(t || window),
                        r = n.isWindow(i[0]),
                        u = !!i[0] && 9 === i[0].nodeType,
                        f = !r && !u;
                    return {
                        element: i,
                        isWindow: r,
                        isDocument: u,
                        offset: f ? n(t).offset() : {
                            left: 0,
                            top: 0
                        },
                        scrollLeft: i.scrollLeft(),
                        scrollTop: i.scrollTop(),
                        width: i.outerWidth(),
                        height: i.outerHeight()
                    }
                }
            };
            n.fn.position = function(u) {
                if (!u || !u.of) return a.apply(this, arguments);
                u = n.extend({}, u);
                var w, c, v, p, y, k, d = n(u.of),
                    nt = n.position.getWithinInfo(u.within),
                    tt = n.position.getScrollInfo(nt),
                    b = (u.collision || "flip").split(" "),
                    g = {};
                return k = l(d), d[0].preventDefault && (u.at = "left top"), c = k.width, v = k.height, p = k.offset, y = n.extend({}, p), n.each(["my", "at"], function() {
                    var t, i, n = (u[this] || "").split(" ");
                    1 === n.length && (n = e.test(n[0]) ? n.concat(["center"]) : o.test(n[0]) ? ["center"].concat(n) : ["center", "center"]);
                    n[0] = e.test(n[0]) ? n[0] : "center";
                    n[1] = o.test(n[1]) ? n[1] : "center";
                    t = s.exec(n[0]);
                    i = s.exec(n[1]);
                    g[this] = [t ? t[0] : 0, i ? i[0] : 0];
                    u[this] = [h.exec(n[0])[0], h.exec(n[1])[0]]
                }), 1 === b.length && (b[1] = b[0]), "right" === u.at[0] ? y.left += c : "center" === u.at[0] && (y.left += c / 2), "bottom" === u.at[1] ? y.top += v : "center" === u.at[1] && (y.top += v / 2), w = f(g.at, c, v), y.left += w[0], y.top += w[1], this.each(function() {
                    var a, k, o = n(this),
                        s = o.outerWidth(),
                        h = o.outerHeight(),
                        it = i(this, "marginLeft"),
                        rt = i(this, "marginTop"),
                        ut = s + it + i(this, "marginRight") + tt.width,
                        ft = h + rt + i(this, "marginBottom") + tt.height,
                        e = n.extend({}, y),
                        l = f(g.my, o.outerWidth(), o.outerHeight());
                    "right" === u.my[0] ? e.left -= s : "center" === u.my[0] && (e.left -= s / 2);
                    "bottom" === u.my[1] ? e.top -= h : "center" === u.my[1] && (e.top -= h / 2);
                    e.left += l[0];
                    e.top += l[1];
                    a = {
                        marginLeft: it,
                        marginTop: rt
                    };
                    n.each(["left", "top"], function(t, i) {
                        n.ui.position[b[t]] && n.ui.position[b[t]][i](e, {
                            targetWidth: c,
                            targetHeight: v,
                            elemWidth: s,
                            elemHeight: h,
                            collisionPosition: a,
                            collisionWidth: ut,
                            collisionHeight: ft,
                            offset: [w[0] + l[0], w[1] + l[1]],
                            my: u.my,
                            at: u.at,
                            within: nt,
                            elem: o
                        })
                    });
                    u.using && (k = function(n) {
                        var i = p.left - e.left,
                            a = i + c - s,
                            f = p.top - e.top,
                            y = f + v - h,
                            l = {
                                target: {
                                    element: d,
                                    left: p.left,
                                    top: p.top,
                                    width: c,
                                    height: v
                                },
                                element: {
                                    element: o,
                                    left: e.left,
                                    top: e.top,
                                    width: s,
                                    height: h
                                },
                                horizontal: 0 > a ? "left" : i > 0 ? "right" : "center",
                                vertical: 0 > y ? "top" : f > 0 ? "bottom" : "middle"
                            };
                        s > c && c > t(i + a) && (l.horizontal = "center");
                        h > v && v > t(f + y) && (l.vertical = "middle");
                        l.important = r(t(i), t(a)) > r(t(f), t(y)) ? "horizontal" : "vertical";
                        u.using.call(this, n, l)
                    });
                    o.offset(n.extend(e, {
                        using: k
                    }))
                })
            };
            n.ui.position = {
                fit: {
                    left: function(n, t) {
                        var h, e = t.within,
                            u = e.isWindow ? e.scrollLeft : e.offset.left,
                            o = e.width,
                            s = n.left - t.collisionPosition.marginLeft,
                            i = u - s,
                            f = s + t.collisionWidth - o - u;
                        t.collisionWidth > o ? i > 0 && 0 >= f ? (h = n.left + i + t.collisionWidth - o - u, n.left += i - h) : n.left = f > 0 && 0 >= i ? u : i > f ? u + o - t.collisionWidth : u : i > 0 ? n.left += i : f > 0 ? n.left -= f : n.left = r(n.left - s, n.left)
                    },
                    top: function(n, t) {
                        var h, o = t.within,
                            u = o.isWindow ? o.scrollTop : o.offset.top,
                            e = t.within.height,
                            s = n.top - t.collisionPosition.marginTop,
                            i = u - s,
                            f = s + t.collisionHeight - e - u;
                        t.collisionHeight > e ? i > 0 && 0 >= f ? (h = n.top + i + t.collisionHeight - e - u, n.top += i - h) : n.top = f > 0 && 0 >= i ? u : i > f ? u + e - t.collisionHeight : u : i > 0 ? n.top += i : f > 0 ? n.top -= f : n.top = r(n.top - s, n.top)
                    }
                },
                flip: {
                    left: function(n, i) {
                        var o, s, r = i.within,
                            y = r.offset.left + r.scrollLeft,
                            c = r.width,
                            h = r.isWindow ? r.scrollLeft : r.offset.left,
                            l = n.left - i.collisionPosition.marginLeft,
                            a = l - h,
                            v = l + i.collisionWidth - c - h,
                            u = "left" === i.my[0] ? -i.elemWidth : "right" === i.my[0] ? i.elemWidth : 0,
                            f = "left" === i.at[0] ? i.targetWidth : "right" === i.at[0] ? -i.targetWidth : 0,
                            e = -2 * i.offset[0];
                        0 > a ? (o = n.left + u + f + e + i.collisionWidth - c - y, (0 > o || t(a) > o) && (n.left += u + f + e)) : v > 0 && (s = n.left - i.collisionPosition.marginLeft + u + f + e - h, (s > 0 || v > t(s)) && (n.left += u + f + e))
                    },
                    top: function(n, i) {
                        var o, s, r = i.within,
                            y = r.offset.top + r.scrollTop,
                            c = r.height,
                            h = r.isWindow ? r.scrollTop : r.offset.top,
                            l = n.top - i.collisionPosition.marginTop,
                            a = l - h,
                            v = l + i.collisionHeight - c - h,
                            p = "top" === i.my[1],
                            u = p ? -i.elemHeight : "bottom" === i.my[1] ? i.elemHeight : 0,
                            f = "top" === i.at[1] ? i.targetHeight : "bottom" === i.at[1] ? -i.targetHeight : 0,
                            e = -2 * i.offset[1];
                        0 > a ? (s = n.top + u + f + e + i.collisionHeight - c - y, (0 > s || t(a) > s) && (n.top += u + f + e)) : v > 0 && (o = n.top - i.collisionPosition.marginTop + u + f + e - h, (o > 0 || v > t(o)) && (n.top += u + f + e))
                    }
                },
                flipfit: {
                    left: function() {
                        n.ui.position.flip.left.apply(this, arguments);
                        n.ui.position.fit.left.apply(this, arguments)
                    },
                    top: function() {
                        n.ui.position.flip.top.apply(this, arguments);
                        n.ui.position.fit.top.apply(this, arguments)
                    }
                }
            }
        }();
    n.ui.position;
    n.extend(n.expr[":"], {
        data: n.expr.createPseudo ? n.expr.createPseudo(function(t) {
            return function(i) {
                return !!n.data(i, t)
            }
        }) : function(t, i, r) {
            return !!n.data(t, r[3])
        }
    });
    n.fn.extend({
        disableSelection: function() {
            var n = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
            return function() {
                return this.on(n + ".ui-disableSelection", function(n) {
                    n.preventDefault()
                })
            }
        }(),
        enableSelection: function() {
            return this.off(".ui-disableSelection")
        }
    });
    var f = "ui-effects-",
        s = "ui-effects-style",
        h = "ui-effects-animated",
        y = n;
    n.effects = {
            effect: {}
        },
        function(n, t) {
            function f(n, t, i) {
                var r = h[t.type] || {};
                return null == n ? i || !t.def ? null : t.def : (n = r.floor ? ~~n : parseFloat(n), isNaN(n) ? t.def : r.mod ? (n + r.mod) % r.mod : 0 > n ? 0 : n > r.max ? r.max : n)
            }

            function s(f) {
                var o = i(),
                    s = o._rgba = [];
                return f = f.toLowerCase(), r(v, function(n, i) {
                    var r, h = i.re.exec(f),
                        c = h && i.parse(h),
                        e = i.space || "rgba";
                    return c ? (r = o[e](c), o[u[e].cache] = r[u[e].cache], s = o._rgba = r._rgba, !1) : t
                }), s.length ? ("0,0,0,0" === s.join() && n.extend(s, e.transparent), o) : e[f]
            }

            function o(n, t, i) {
                return i = (i + 1) % 1, 1 > 6 * i ? n + 6 * (t - n) * i : 1 > 2 * i ? t : 2 > 3 * i ? n + 6 * (t - n) * (2 / 3 - i) : n
            }
            var e, a = /^([\-+])=\s*(\d+\.?\d*)/,
                v = [{
                    re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    parse: function(n) {
                        return [n[1], n[2], n[3], n[4]]
                    }
                }, {
                    re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    parse: function(n) {
                        return [2.55 * n[1], 2.55 * n[2], 2.55 * n[3], n[4]]
                    }
                }, {
                    re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                    parse: function(n) {
                        return [parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16)]
                    }
                }, {
                    re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                    parse: function(n) {
                        return [parseInt(n[1] + n[1], 16), parseInt(n[2] + n[2], 16), parseInt(n[3] + n[3], 16)]
                    }
                }, {
                    re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    space: "hsla",
                    parse: function(n) {
                        return [n[1], n[2] / 100, n[3] / 100, n[4]]
                    }
                }],
                i = n.Color = function(t, i, r, u) {
                    return new n.Color.fn.parse(t, i, r, u)
                },
                u = {
                    rgba: {
                        props: {
                            red: {
                                idx: 0,
                                type: "byte"
                            },
                            green: {
                                idx: 1,
                                type: "byte"
                            },
                            blue: {
                                idx: 2,
                                type: "byte"
                            }
                        }
                    },
                    hsla: {
                        props: {
                            hue: {
                                idx: 0,
                                type: "degrees"
                            },
                            saturation: {
                                idx: 1,
                                type: "percent"
                            },
                            lightness: {
                                idx: 2,
                                type: "percent"
                            }
                        }
                    }
                },
                h = {
                    byte: {
                        floor: !0,
                        max: 255
                    },
                    percent: {
                        max: 1
                    },
                    degrees: {
                        mod: 360,
                        floor: !0
                    }
                },
                c = i.support = {},
                l = n("<p>")[0],
                r = n.each;
            l.style.cssText = "background-color:rgba(1,1,1,.5)";
            c.rgba = l.style.backgroundColor.indexOf("rgba") > -1;
            r(u, function(n, t) {
                t.cache = "_" + n;
                t.props.alpha = {
                    idx: 3,
                    type: "percent",
                    def: 1
                }
            });
            i.fn = n.extend(i.prototype, {
                parse: function(o, h, c, l) {
                    if (o === t) return this._rgba = [null, null, null, null], this;
                    (o.jquery || o.nodeType) && (o = n(o).css(h), h = t);
                    var a = this,
                        v = n.type(o),
                        y = this._rgba = [];
                    return h !== t && (o = [o, h, c, l], v = "array"), "string" === v ? this.parse(s(o) || e._default) : "array" === v ? (r(u.rgba.props, function(n, t) {
                        y[t.idx] = f(o[t.idx], t)
                    }), this) : "object" === v ? (o instanceof i ? r(u, function(n, t) {
                        o[t.cache] && (a[t.cache] = o[t.cache].slice())
                    }) : r(u, function(t, i) {
                        var u = i.cache;
                        r(i.props, function(n, t) {
                            if (!a[u] && i.to) {
                                if ("alpha" === n || null == o[n]) return;
                                a[u] = i.to(a._rgba)
                            }
                            a[u][t.idx] = f(o[n], t, !0)
                        });
                        a[u] && 0 > n.inArray(null, a[u].slice(0, 3)) && (a[u][3] = 1, i.from && (a._rgba = i.from(a[u])))
                    }), this) : t
                },
                is: function(n) {
                    var o = i(n),
                        f = !0,
                        e = this;
                    return r(u, function(n, i) {
                        var s, u = o[i.cache];
                        return u && (s = e[i.cache] || i.to && i.to(e._rgba) || [], r(i.props, function(n, i) {
                            return null != u[i.idx] ? f = u[i.idx] === s[i.idx] : t
                        })), f
                    }), f
                },
                _space: function() {
                    var n = [],
                        t = this;
                    return r(u, function(i, r) {
                        t[r.cache] && n.push(i)
                    }), n.pop()
                },
                transition: function(n, t) {
                    var e = i(n),
                        c = e._space(),
                        o = u[c],
                        l = 0 === this.alpha() ? i("transparent") : this,
                        a = l[o.cache] || o.to(l._rgba),
                        s = a.slice();
                    return e = e[o.cache], r(o.props, function(n, i) {
                        var c = i.idx,
                            r = a[c],
                            u = e[c],
                            o = h[i.type] || {};
                        null !== u && (null === r ? s[c] = u : (o.mod && (u - r > o.mod / 2 ? r += o.mod : r - u > o.mod / 2 && (r -= o.mod)), s[c] = f((u - r) * t + r, i)))
                    }), this[c](s)
                },
                blend: function(t) {
                    if (1 === this._rgba[3]) return this;
                    var r = this._rgba.slice(),
                        u = r.pop(),
                        f = i(t)._rgba;
                    return i(n.map(r, function(n, t) {
                        return (1 - u) * f[t] + u * n
                    }))
                },
                toRgbaString: function() {
                    var i = "rgba(",
                        t = n.map(this._rgba, function(n, t) {
                            return null == n ? t > 2 ? 1 : 0 : n
                        });
                    return 1 === t[3] && (t.pop(), i = "rgb("), i + t.join() + ")"
                },
                toHslaString: function() {
                    var i = "hsla(",
                        t = n.map(this.hsla(), function(n, t) {
                            return null == n && (n = t > 2 ? 1 : 0), t && 3 > t && (n = Math.round(100 * n) + "%"), n
                        });
                    return 1 === t[3] && (t.pop(), i = "hsl("), i + t.join() + ")"
                },
                toHexString: function(t) {
                    var i = this._rgba.slice(),
                        r = i.pop();
                    return t && i.push(~~(255 * r)), "#" + n.map(i, function(n) {
                        return n = (n || 0).toString(16), 1 === n.length ? "0" + n : n
                    }).join("")
                },
                toString: function() {
                    return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
                }
            });
            i.fn.parse.prototype = i.fn;
            u.hsla.to = function(n) {
                if (null == n[0] || null == n[1] || null == n[2]) return [null, null, null, n[3]];
                var s, h, i = n[0] / 255,
                    r = n[1] / 255,
                    f = n[2] / 255,
                    c = n[3],
                    u = Math.max(i, r, f),
                    e = Math.min(i, r, f),
                    t = u - e,
                    o = u + e,
                    l = .5 * o;
                return s = e === u ? 0 : i === u ? 60 * (r - f) / t + 360 : r === u ? 60 * (f - i) / t + 120 : 60 * (i - r) / t + 240, h = 0 === t ? 0 : .5 >= l ? t / o : t / (2 - o), [Math.round(s) % 360, h, l, null == c ? 1 : c]
            };
            u.hsla.from = function(n) {
                if (null == n[0] || null == n[1] || null == n[2]) return [null, null, null, n[3]];
                var r = n[0] / 360,
                    u = n[1],
                    t = n[2],
                    e = n[3],
                    i = .5 >= t ? t * (1 + u) : t + u - t * u,
                    f = 2 * t - i;
                return [Math.round(255 * o(f, i, r + 1 / 3)), Math.round(255 * o(f, i, r)), Math.round(255 * o(f, i, r - 1 / 3)), e]
            };
            r(u, function(u, e) {
                var s = e.props,
                    o = e.cache,
                    h = e.to,
                    c = e.from;
                i.fn[u] = function(u) {
                    if (h && !this[o] && (this[o] = h(this._rgba)), u === t) return this[o].slice();
                    var l, a = n.type(u),
                        v = "array" === a || "object" === a ? u : arguments,
                        e = this[o].slice();
                    return r(s, function(n, t) {
                        var i = v["object" === a ? n : t.idx];
                        null == i && (i = e[t.idx]);
                        e[t.idx] = f(i, t)
                    }), c ? (l = i(c(e)), l[o] = e, l) : i(e)
                };
                r(s, function(t, r) {
                    i.fn[t] || (i.fn[t] = function(i) {
                        var f, e = n.type(i),
                            h = "alpha" === t ? this._hsla ? "hsla" : "rgba" : u,
                            o = this[h](),
                            s = o[r.idx];
                        return "undefined" === e ? s : ("function" === e && (i = i.call(this, s), e = n.type(i)), null == i && r.empty ? this : ("string" === e && (f = a.exec(i), f && (i = s + parseFloat(f[2]) * ("+" === f[1] ? 1 : -1))), o[r.idx] = i, this[h](o)))
                    })
                })
            });
            i.hook = function(t) {
                var u = t.split(" ");
                r(u, function(t, r) {
                    n.cssHooks[r] = {
                        set: function(t, u) {
                            var o, f, e = "";
                            if ("transparent" !== u && ("string" !== n.type(u) || (o = s(u)))) {
                                if (u = i(o || u), !c.rgba && 1 !== u._rgba[3]) {
                                    for (f = "backgroundColor" === r ? t.parentNode : t;
                                        ("" === e || "transparent" === e) && f && f.style;) try {
                                        e = n.css(f, "backgroundColor");
                                        f = f.parentNode
                                    } catch (h) {}
                                    u = u.blend(e && "transparent" !== e ? e : "_default")
                                }
                                u = u.toRgbaString()
                            }
                            try {
                                t.style[r] = u
                            } catch (h) {}
                        }
                    };
                    n.fx.step[r] = function(t) {
                        t.colorInit || (t.start = i(t.elem, r), t.end = i(t.end), t.colorInit = !0);
                        n.cssHooks[r].set(t.elem, t.start.transition(t.end, t.pos))
                    }
                })
            };
            i.hook("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor");
            n.cssHooks.borderColor = {
                expand: function(n) {
                    var t = {};
                    return r(["Top", "Right", "Bottom", "Left"], function(i, r) {
                        t["border" + r + "Color"] = n
                    }), t
                }
            };
            e = n.Color.names = {
                aqua: "#00ffff",
                black: "#000000",
                blue: "#0000ff",
                fuchsia: "#ff00ff",
                gray: "#808080",
                green: "#008000",
                lime: "#00ff00",
                maroon: "#800000",
                navy: "#000080",
                olive: "#808000",
                purple: "#800080",
                red: "#ff0000",
                silver: "#c0c0c0",
                teal: "#008080",
                white: "#ffffff",
                yellow: "#ffff00",
                transparent: [null, null, null, 0],
                _default: "#ffffff"
            }
        }(y),
        function() {
            function t(t) {
                var r, u, i = t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle,
                    f = {};
                if (i && i.length && i[0] && i[i[0]])
                    for (u = i.length; u--;) r = i[u], "string" == typeof i[r] && (f[n.camelCase(r)] = i[r]);
                else
                    for (r in i) "string" == typeof i[r] && (f[r] = i[r]);
                return f
            }

            function i(t, i) {
                var r, f, e = {};
                for (r in i) f = i[r], t[r] !== f && (u[r] || (n.fx.step[r] || !isNaN(parseFloat(f))) && (e[r] = f));
                return e
            }
            var r = ["add", "remove", "toggle"],
                u = {
                    border: 1,
                    borderBottom: 1,
                    borderColor: 1,
                    borderLeft: 1,
                    borderRight: 1,
                    borderTop: 1,
                    borderWidth: 1,
                    margin: 1,
                    padding: 1
                };
            n.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(t, i) {
                n.fx.step[i] = function(n) {
                    ("none" === n.end || n.setAttr) && (1 !== n.pos || n.setAttr) || (y.style(n.elem, i, n.end), n.setAttr = !0)
                }
            });
            n.fn.addBack || (n.fn.addBack = function(n) {
                return this.add(null == n ? this.prevObject : this.prevObject.filter(n))
            });
            n.effects.animateClass = function(u, f, e, o) {
                var s = n.speed(f, e, o);
                return this.queue(function() {
                    var o, e = n(this),
                        h = e.attr("class") || "",
                        f = s.children ? e.find("*").addBack() : e;
                    f = f.map(function() {
                        var i = n(this);
                        return {
                            el: i,
                            start: t(this)
                        }
                    });
                    o = function() {
                        n.each(r, function(n, t) {
                            u[t] && e[t + "Class"](u[t])
                        })
                    };
                    o();
                    f = f.map(function() {
                        return this.end = t(this.el[0]), this.diff = i(this.start, this.end), this
                    });
                    e.attr("class", h);
                    f = f.map(function() {
                        var i = this,
                            t = n.Deferred(),
                            r = n.extend({}, s, {
                                queue: !1,
                                complete: function() {
                                    t.resolve(i)
                                }
                            });
                        return this.el.animate(this.diff, r), t.promise()
                    });
                    n.when.apply(n, f.get()).done(function() {
                        o();
                        n.each(arguments, function() {
                            var t = this.el;
                            n.each(this.diff, function(n) {
                                t.css(n, "")
                            })
                        });
                        s.complete.call(e[0])
                    })
                })
            };
            n.fn.extend({
                addClass: function(t) {
                    return function(i, r, u, f) {
                        return r ? n.effects.animateClass.call(this, {
                            add: i
                        }, r, u, f) : t.apply(this, arguments)
                    }
                }(n.fn.addClass),
                removeClass: function(t) {
                    return function(i, r, u, f) {
                        return arguments.length > 1 ? n.effects.animateClass.call(this, {
                            remove: i
                        }, r, u, f) : t.apply(this, arguments)
                    }
                }(n.fn.removeClass),
                toggleClass: function(t) {
                    return function(i, r, u, f, e) {
                        return "boolean" == typeof r || void 0 === r ? u ? n.effects.animateClass.call(this, r ? {
                            add: i
                        } : {
                            remove: i
                        }, u, f, e) : t.apply(this, arguments) : n.effects.animateClass.call(this, {
                            toggle: i
                        }, r, u, f)
                    }
                }(n.fn.toggleClass),
                switchClass: function(t, i, r, u, f) {
                    return n.effects.animateClass.call(this, {
                        add: i,
                        remove: t
                    }, r, u, f)
                }
            })
        }(),
        function() {
            function t(t, i, r, u) {
                return n.isPlainObject(t) && (i = t, t = t.effect), t = {
                    effect: t
                }, null == i && (i = {}), n.isFunction(i) && (u = i, r = null, i = {}), ("number" == typeof i || n.fx.speeds[i]) && (u = r, r = i, i = {}), n.isFunction(r) && (u = r, r = null), i && n.extend(t, i), r = r || i.duration, t.duration = n.fx.off ? 0 : "number" == typeof r ? r : r in n.fx.speeds ? n.fx.speeds[r] : n.fx.speeds._default, t.complete = u || i.complete, t
            }

            function i(t) {
                return !t || "number" == typeof t || n.fx.speeds[t] ? !0 : "string" != typeof t || n.effects.effect[t] ? n.isFunction(t) ? !0 : "object" != typeof t || t.effect ? !1 : !0 : !0
            }

            function r(n, t) {
                var r = t.outerWidth(),
                    u = t.outerHeight(),
                    i = /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/.exec(n) || ["", 0, r, u, 0];
                return {
                    top: parseFloat(i[1]) || 0,
                    right: "auto" === i[2] ? r : parseFloat(i[2]),
                    bottom: "auto" === i[3] ? u : parseFloat(i[3]),
                    left: parseFloat(i[4]) || 0
                }
            }
            n.expr && n.expr.filters && n.expr.filters.animated && (n.expr.filters.animated = function(t) {
                return function(i) {
                    return !!n(i).data(h) || t(i)
                }
            }(n.expr.filters.animated));
            n.uiBackCompat !== !1 && n.extend(n.effects, {
                save: function(n, t) {
                    for (var i = 0, r = t.length; r > i; i++) null !== t[i] && n.data(f + t[i], n[0].style[t[i]])
                },
                restore: function(n, t) {
                    for (var r, i = 0, u = t.length; u > i; i++) null !== t[i] && (r = n.data(f + t[i]), n.css(t[i], r))
                },
                setMode: function(n, t) {
                    return "toggle" === t && (t = n.is(":hidden") ? "show" : "hide"), t
                },
                createWrapper: function(t) {
                    if (t.parent().is(".ui-effects-wrapper")) return t.parent();
                    var i = {
                            width: t.outerWidth(!0),
                            height: t.outerHeight(!0),
                            float: t.css("float")
                        },
                        u = n("<div><\/div>").addClass("ui-effects-wrapper").css({
                            fontSize: "100%",
                            background: "transparent",
                            border: "none",
                            margin: 0,
                            padding: 0
                        }),
                        f = {
                            width: t.width(),
                            height: t.height()
                        },
                        r = document.activeElement;
                    try {
                        r.id
                    } catch (e) {
                        r = document.body
                    }
                    return t.wrap(u), (t[0] === r || n.contains(t[0], r)) && n(r).trigger("focus"), u = t.parent(), "static" === t.css("position") ? (u.css({
                        position: "relative"
                    }), t.css({
                        position: "relative"
                    })) : (n.extend(i, {
                        position: t.css("position"),
                        zIndex: t.css("z-index")
                    }), n.each(["top", "left", "bottom", "right"], function(n, r) {
                        i[r] = t.css(r);
                        isNaN(parseInt(i[r], 10)) && (i[r] = "auto")
                    }), t.css({
                        position: "relative",
                        top: 0,
                        left: 0,
                        right: "auto",
                        bottom: "auto"
                    })), t.css(f), u.css(i).show()
                },
                removeWrapper: function(t) {
                    var i = document.activeElement;
                    return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t), (t[0] === i || n.contains(t[0], i)) && n(i).trigger("focus")), t
                }
            });
            n.extend(n.effects, {
                version: "1.12.1",
                define: function(t, i, r) {
                    return r || (r = i, i = "effect"), n.effects.effect[t] = r, n.effects.effect[t].mode = i, r
                },
                scaledDimensions: function(n, t, i) {
                    if (0 === t) return {
                        height: 0,
                        width: 0,
                        outerHeight: 0,
                        outerWidth: 0
                    };
                    var r = "horizontal" !== i ? (t || 100) / 100 : 1,
                        u = "vertical" !== i ? (t || 100) / 100 : 1;
                    return {
                        height: n.height() * u,
                        width: n.width() * r,
                        outerHeight: n.outerHeight() * u,
                        outerWidth: n.outerWidth() * r
                    }
                },
                clipToBox: function(n) {
                    return {
                        width: n.clip.right - n.clip.left,
                        height: n.clip.bottom - n.clip.top,
                        left: n.clip.left,
                        top: n.clip.top
                    }
                },
                unshift: function(n, t, i) {
                    var r = n.queue();
                    t > 1 && r.splice.apply(r, [1, 0].concat(r.splice(t, i)));
                    n.dequeue()
                },
                saveStyle: function(n) {
                    n.data(s, n[0].style.cssText)
                },
                restoreStyle: function(n) {
                    n[0].style.cssText = n.data(s) || "";
                    n.removeData(s)
                },
                mode: function(n, t) {
                    var i = n.is(":hidden");
                    return "toggle" === t && (t = i ? "show" : "hide"), (i ? "hide" === t : "show" === t) && (t = "none"), t
                },
                getBaseline: function(n, t) {
                    var i, r;
                    switch (n[0]) {
                        case "top":
                            i = 0;
                            break;
                        case "middle":
                            i = .5;
                            break;
                        case "bottom":
                            i = 1;
                            break;
                        default:
                            i = n[0] / t.height
                    }
                    switch (n[1]) {
                        case "left":
                            r = 0;
                            break;
                        case "center":
                            r = .5;
                            break;
                        case "right":
                            r = 1;
                            break;
                        default:
                            r = n[1] / t.width
                    }
                    return {
                        x: r,
                        y: i
                    }
                },
                createPlaceholder: function(t) {
                    var i, r = t.css("position"),
                        u = t.position();
                    return t.css({
                        marginTop: t.css("marginTop"),
                        marginBottom: t.css("marginBottom"),
                        marginLeft: t.css("marginLeft"),
                        marginRight: t.css("marginRight")
                    }).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()), /^(static|relative)/.test(r) && (r = "absolute", i = n("<" + t[0].nodeName + ">").insertAfter(t).css({
                        display: /^(inline|ruby)/.test(t.css("display")) ? "inline-block" : "block",
                        visibility: "hidden",
                        marginTop: t.css("marginTop"),
                        marginBottom: t.css("marginBottom"),
                        marginLeft: t.css("marginLeft"),
                        marginRight: t.css("marginRight"),
                        float: t.css("float")
                    }).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).addClass("ui-effects-placeholder"), t.data(f + "placeholder", i)), t.css({
                        position: r,
                        left: u.left,
                        top: u.top
                    }), i
                },
                removePlaceholder: function(n) {
                    var t = f + "placeholder",
                        i = n.data(t);
                    i && (i.remove(), n.removeData(t))
                },
                cleanUp: function(t) {
                    n.effects.restoreStyle(t);
                    n.effects.removePlaceholder(t)
                },
                setTransition: function(t, i, r, u) {
                    return u = u || {}, n.each(i, function(n, i) {
                        var f = t.cssUnit(i);
                        f[0] > 0 && (u[i] = f[0] * r + f[1])
                    }), u
                }
            });
            n.fn.extend({
                effect: function() {
                    function o(t) {
                        function c() {
                            o.removeData(h);
                            n.effects.cleanUp(o);
                            "hide" === i.mode && o.hide();
                            s()
                        }

                        function s() {
                            n.isFunction(f) && f.call(o[0]);
                            n.isFunction(t) && t()
                        }
                        var o = n(this);
                        i.mode = l.shift();
                        n.uiBackCompat === !1 || u ? "none" === i.mode ? (o[r](), s()) : e.call(o[0], i, c) : (o.is(":hidden") ? "hide" === r : "show" === r) ? (o[r](), s()) : e.call(o[0], i, s)
                    }
                    var i = t.apply(this, arguments),
                        e = n.effects.effect[i.effect],
                        u = e.mode,
                        s = i.queue,
                        c = s || "fx",
                        f = i.complete,
                        r = i.mode,
                        l = [],
                        a = function(t) {
                            var f = n(this),
                                i = n.effects.mode(f, r) || u;
                            f.data(h, !0);
                            l.push(i);
                            u && ("show" === i || i === u && "hide" === i) && f.show();
                            u && "none" === i || n.effects.saveStyle(f);
                            n.isFunction(t) && t()
                        };
                    return n.fx.off || !e ? r ? this[r](i.duration, f) : this.each(function() {
                        f && f.call(this)
                    }) : s === !1 ? this.each(a).each(o) : this.queue(c, a).queue(c, o)
                },
                show: function(n) {
                    return function(r) {
                        if (i(r)) return n.apply(this, arguments);
                        var u = t.apply(this, arguments);
                        return u.mode = "show", this.effect.call(this, u)
                    }
                }(n.fn.show),
                hide: function(n) {
                    return function(r) {
                        if (i(r)) return n.apply(this, arguments);
                        var u = t.apply(this, arguments);
                        return u.mode = "hide", this.effect.call(this, u)
                    }
                }(n.fn.hide),
                toggle: function(n) {
                    return function(r) {
                        if (i(r) || "boolean" == typeof r) return n.apply(this, arguments);
                        var u = t.apply(this, arguments);
                        return u.mode = "toggle", this.effect.call(this, u)
                    }
                }(n.fn.toggle),
                cssUnit: function(t) {
                    var i = this.css(t),
                        r = [];
                    return n.each(["em", "px", "%", "pt"], function(n, t) {
                        i.indexOf(t) > 0 && (r = [parseFloat(i), t])
                    }), r
                },
                cssClip: function(n) {
                    return n ? this.css("clip", "rect(" + n.top + "px " + n.right + "px " + n.bottom + "px " + n.left + "px)") : r(this.css("clip"), this)
                },
                transfer: function(t, i) {
                    var u = n(this),
                        r = n(t.to),
                        f = "fixed" === r.css("position"),
                        e = n("body"),
                        o = f ? e.scrollTop() : 0,
                        s = f ? e.scrollLeft() : 0,
                        h = r.offset(),
                        l = {
                            top: h.top - o,
                            left: h.left - s,
                            height: r.innerHeight(),
                            width: r.innerWidth()
                        },
                        c = u.offset(),
                        a = n("<div class='ui-effects-transfer'><\/div>").appendTo("body").addClass(t.className).css({
                            top: c.top - o,
                            left: c.left - s,
                            height: u.innerHeight(),
                            width: u.innerWidth(),
                            position: f ? "fixed" : "absolute"
                        }).animate(l, t.duration, t.easing, function() {
                            a.remove();
                            n.isFunction(i) && i()
                        })
                }
            });
            n.fx.step.clip = function(t) {
                t.clipInit || (t.start = n(t.elem).cssClip(), "string" == typeof t.end && (t.end = r(t.end, t.elem)), t.clipInit = !0);
                n(t.elem).cssClip({
                    top: t.pos * (t.end.top - t.start.top) + t.start.top,
                    right: t.pos * (t.end.right - t.start.right) + t.start.right,
                    bottom: t.pos * (t.end.bottom - t.start.bottom) + t.start.bottom,
                    left: t.pos * (t.end.left - t.start.left) + t.start.left
                })
            }
        }(),
        function() {
            var t = {};
            n.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(n, i) {
                t[i] = function(t) {
                    return Math.pow(t, n + 2)
                }
            });
            n.extend(t, {
                Sine: function(n) {
                    return 1 - Math.cos(n * Math.PI / 2)
                },
                Circ: function(n) {
                    return 1 - Math.sqrt(1 - n * n)
                },
                Elastic: function(n) {
                    return 0 === n || 1 === n ? n : -Math.pow(2, 8 * (n - 1)) * Math.sin((80 * (n - 1) - 7.5) * Math.PI / 15)
                },
                Back: function(n) {
                    return n * n * (3 * n - 2)
                },
                Bounce: function(n) {
                    for (var t, i = 4;
                        ((t = Math.pow(2, --i)) - 1) / 11 > n;);
                    return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * t - 2) / 22 - n, 2)
                }
            });
            n.each(t, function(t, i) {
                n.easing["easeIn" + t] = i;
                n.easing["easeOut" + t] = function(n) {
                    return 1 - i(1 - n)
                };
                n.easing["easeInOut" + t] = function(n) {
                    return .5 > n ? i(2 * n) / 2 : 1 - i(-2 * n + 2) / 2
                }
            })
        }();
    p = n.effects;
    n.effects.define("blind", "hide", function(t, i) {
        var e = {
                up: ["bottom", "top"],
                vertical: ["bottom", "top"],
                down: ["top", "bottom"],
                left: ["right", "left"],
                horizontal: ["right", "left"],
                right: ["left", "right"]
            },
            u = n(this),
            o = t.direction || "up",
            s = u.cssClip(),
            r = {
                clip: n.extend({}, s)
            },
            f = n.effects.createPlaceholder(u);
        r.clip[e[o][0]] = r.clip[e[o][1]];
        "show" === t.mode && (u.cssClip(r.clip), f && f.css(n.effects.clipToBox(r)), r.clip = s);
        f && f.animate(n.effects.clipToBox(r), t.duration, t.easing);
        u.animate(r, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: i
        })
    });
    n.effects.define("bounce", function(t, i) {
        var e, o, a, u = n(this),
            p = t.mode,
            s = "hide" === p,
            w = "show" === p,
            h = t.direction || "up",
            r = t.distance,
            v = t.times || 5,
            b = 2 * v + (w || s ? 1 : 0),
            c = t.duration / b,
            l = t.easing,
            f = "up" === h || "down" === h ? "top" : "left",
            y = "up" === h || "left" === h,
            k = 0,
            d = u.queue().length;
        for (n.effects.createPlaceholder(u), a = u.css(f), r || (r = u["top" === f ? "outerHeight" : "outerWidth"]() / 3), w && (o = {
                opacity: 1
            }, o[f] = a, u.css("opacity", 0).css(f, y ? 2 * -r : 2 * r).animate(o, c, l)), s && (r /= Math.pow(2, v - 1)), o = {}, o[f] = a; v > k; k++) e = {}, e[f] = (y ? "-=" : "+=") + r, u.animate(e, c, l).animate(o, c, l), r = s ? 2 * r : r / 2;
        s && (e = {
            opacity: 0
        }, e[f] = (y ? "-=" : "+=") + r, u.animate(e, c, l));
        u.queue(i);
        n.effects.unshift(u, d, b + 1)
    });
    n.effects.define("clip", "hide", function(t, i) {
        var r, u = {},
            f = n(this),
            e = t.direction || "vertical",
            o = "both" === e,
            s = o || "horizontal" === e,
            h = o || "vertical" === e;
        r = f.cssClip();
        u.clip = {
            top: h ? (r.bottom - r.top) / 2 : r.top,
            right: s ? (r.right - r.left) / 2 : r.right,
            bottom: h ? (r.bottom - r.top) / 2 : r.bottom,
            left: s ? (r.right - r.left) / 2 : r.left
        };
        n.effects.createPlaceholder(f);
        "show" === t.mode && (f.cssClip(u.clip), u.clip = r);
        f.animate(u, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: i
        })
    });
    n.effects.define("drop", "hide", function(t, i) {
        var e, u = n(this),
            h = t.mode,
            c = "show" === h,
            f = t.direction || "left",
            o = "up" === f || "down" === f ? "top" : "left",
            s = "up" === f || "left" === f ? "-=" : "+=",
            l = "+=" === s ? "-=" : "+=",
            r = {
                opacity: 0
            };
        n.effects.createPlaceholder(u);
        e = t.distance || u["top" === o ? "outerHeight" : "outerWidth"](!0) / 2;
        r[o] = s + e;
        c && (u.css(r), r[o] = l + e, r.opacity = 1);
        u.animate(r, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: i
        })
    });
    n.effects.define("explode", "hide", function(t, i) {
        function b() {
            p.push(this);
            p.length === e * c && k()
        }

        function k() {
            o.css({
                visibility: "visible"
            });
            n(p).remove();
            i()
        }
        for (var u, l, a, v, y, e = t.pieces ? Math.round(Math.sqrt(t.pieces)) : 3, c = e, o = n(this), d = t.mode, f = "show" === d, w = o.show().css("visibility", "hidden").offset(), s = Math.ceil(o.outerWidth() / c), h = Math.ceil(o.outerHeight() / e), p = [], r = 0; e > r; r++)
            for (a = w.top + r * h, y = r - (e - 1) / 2, u = 0; c > u; u++) l = w.left + u * s, v = u - (c - 1) / 2, o.clone().appendTo("body").wrap("<div><\/div>").css({
                position: "absolute",
                visibility: "visible",
                left: -u * s,
                top: -r * h
            }).parent().addClass("ui-effects-explode").css({
                position: "absolute",
                overflow: "hidden",
                width: s,
                height: h,
                left: l + (f ? v * s : 0),
                top: a + (f ? y * h : 0),
                opacity: f ? 0 : 1
            }).animate({
                left: l + (f ? 0 : v * s),
                top: a + (f ? 0 : y * h),
                opacity: f ? 1 : 0
            }, t.duration || 500, t.easing, b)
    });
    n.effects.define("fade", "toggle", function(t, i) {
        var r = "show" === t.mode;
        n(this).css("opacity", r ? 0 : 1).animate({
            opacity: r ? 1 : 0
        }, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: i
        })
    });
    n.effects.define("fold", "hide", function(t, i) {
        var u = n(this),
            l = t.mode,
            v = "show" === l,
            y = "hide" === l,
            o = t.size || 15,
            a = /([0-9]+)%/.exec(o),
            p = !!t.horizFirst,
            f = p ? ["right", "bottom"] : ["bottom", "right"],
            s = t.duration / 2,
            h = n.effects.createPlaceholder(u),
            e = u.cssClip(),
            c = {
                clip: n.extend({}, e)
            },
            r = {
                clip: n.extend({}, e)
            },
            w = [e[f[0]], e[f[1]]],
            b = u.queue().length;
        a && (o = parseInt(a[1], 10) / 100 * w[y ? 0 : 1]);
        c.clip[f[0]] = o;
        r.clip[f[0]] = o;
        r.clip[f[1]] = 0;
        v && (u.cssClip(r.clip), h && h.css(n.effects.clipToBox(r)), r.clip = e);
        u.queue(function(i) {
            h && h.animate(n.effects.clipToBox(c), s, t.easing).animate(n.effects.clipToBox(r), s, t.easing);
            i()
        }).animate(c, s, t.easing).animate(r, s, t.easing).queue(i);
        n.effects.unshift(u, b, 4)
    });
    n.effects.define("highlight", "show", function(t, i) {
        var r = n(this),
            u = {
                backgroundColor: r.css("backgroundColor")
            };
        "hide" === t.mode && (u.opacity = 0);
        n.effects.saveStyle(r);
        r.css({
            backgroundImage: "none",
            backgroundColor: t.color || "#ffff99"
        }).animate(u, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: i
        })
    });
    n.effects.define("size", function(t, i) {
        var l, r, p, u = n(this),
            v = ["fontSize"],
            s = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
            h = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
            w = t.mode,
            y = "effect" !== w,
            c = t.scale || "both",
            b = t.origin || ["middle", "center"],
            k = u.css("position"),
            a = u.position(),
            o = n.effects.scaledDimensions(u),
            f = t.from || o,
            e = t.to || n.effects.scaledDimensions(u, 0);
        n.effects.createPlaceholder(u);
        "show" === w && (p = f, f = e, e = p);
        r = {
            from: {
                y: f.height / o.height,
                x: f.width / o.width
            },
            to: {
                y: e.height / o.height,
                x: e.width / o.width
            }
        };
        ("box" === c || "both" === c) && (r.from.y !== r.to.y && (f = n.effects.setTransition(u, s, r.from.y, f), e = n.effects.setTransition(u, s, r.to.y, e)), r.from.x !== r.to.x && (f = n.effects.setTransition(u, h, r.from.x, f), e = n.effects.setTransition(u, h, r.to.x, e)));
        ("content" === c || "both" === c) && r.from.y !== r.to.y && (f = n.effects.setTransition(u, v, r.from.y, f), e = n.effects.setTransition(u, v, r.to.y, e));
        b && (l = n.effects.getBaseline(b, o), f.top = (o.outerHeight - f.outerHeight) * l.y + a.top, f.left = (o.outerWidth - f.outerWidth) * l.x + a.left, e.top = (o.outerHeight - e.outerHeight) * l.y + a.top, e.left = (o.outerWidth - e.outerWidth) * l.x + a.left);
        u.css(f);
        ("content" === c || "both" === c) && (s = s.concat(["marginTop", "marginBottom"]).concat(v), h = h.concat(["marginLeft", "marginRight"]), u.find("*[width]").each(function() {
            var i = n(this),
                u = n.effects.scaledDimensions(i),
                f = {
                    height: u.height * r.from.y,
                    width: u.width * r.from.x,
                    outerHeight: u.outerHeight * r.from.y,
                    outerWidth: u.outerWidth * r.from.x
                },
                e = {
                    height: u.height * r.to.y,
                    width: u.width * r.to.x,
                    outerHeight: u.height * r.to.y,
                    outerWidth: u.width * r.to.x
                };
            r.from.y !== r.to.y && (f = n.effects.setTransition(i, s, r.from.y, f), e = n.effects.setTransition(i, s, r.to.y, e));
            r.from.x !== r.to.x && (f = n.effects.setTransition(i, h, r.from.x, f), e = n.effects.setTransition(i, h, r.to.x, e));
            y && n.effects.saveStyle(i);
            i.css(f);
            i.animate(e, t.duration, t.easing, function() {
                y && n.effects.restoreStyle(i)
            })
        }));
        u.animate(e, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: function() {
                var t = u.offset();
                0 === e.opacity && u.css("opacity", f.opacity);
                y || (u.css("position", "static" === k ? "relative" : k).offset(t), n.effects.saveStyle(u));
                i()
            }
        })
    });
    n.effects.define("scale", function(t, i) {
        var u = n(this),
            f = t.mode,
            e = parseInt(t.percent, 10) || (0 === parseInt(t.percent, 10) ? 0 : "effect" !== f ? 0 : 100),
            r = n.extend(!0, {
                from: n.effects.scaledDimensions(u),
                to: n.effects.scaledDimensions(u, e, t.direction || "both"),
                origin: t.origin || ["middle", "center"]
            }, t);
        t.fade && (r.from.opacity = 1, r.to.opacity = 0);
        n.effects.effect.size.call(this, r, i)
    });
    n.effects.define("puff", "hide", function(t, i) {
        var r = n.extend(!0, {}, t, {
            fade: !0,
            percent: parseInt(t.percent, 10) || 150
        });
        n.effects.effect.scale.call(this, r, i)
    });
    n.effects.define("pulsate", "show", function(t, i) {
        var r = n(this),
            e = t.mode,
            o = "show" === e,
            c = "hide" === e,
            l = o || c,
            f = 2 * (t.times || 5) + (l ? 1 : 0),
            s = t.duration / f,
            u = 0,
            h = 1,
            a = r.queue().length;
        for ((o || !r.is(":visible")) && (r.css("opacity", 0).show(), u = 1); f > h; h++) r.animate({
            opacity: u
        }, s, t.easing), u = 1 - u;
        r.animate({
            opacity: u
        }, s, t.easing);
        r.queue(i);
        n.effects.unshift(r, a, f + 1)
    });
    n.effects.define("shake", function(t, i) {
        var l = 1,
            r = n(this),
            f = t.direction || "left",
            e = t.distance || 20,
            a = t.times || 3,
            v = 2 * a + 1,
            u = Math.round(t.duration / v),
            o = "up" === f || "down" === f ? "top" : "left",
            s = "up" === f || "left" === f,
            h = {},
            c = {},
            y = {},
            p = r.queue().length;
        for (n.effects.createPlaceholder(r), h[o] = (s ? "-=" : "+=") + e, c[o] = (s ? "+=" : "-=") + 2 * e, y[o] = (s ? "-=" : "+=") + 2 * e, r.animate(h, u, t.easing); a > l; l++) r.animate(c, u, t.easing).animate(y, u, t.easing);
        r.animate(c, u, t.easing).animate(h, u / 2, t.easing).queue(i);
        n.effects.unshift(r, p, v + 1)
    });
    n.effects.define("slide", "show", function(t, i) {
        var s, o, u = n(this),
            h = {
                up: ["bottom", "top"],
                down: ["top", "bottom"],
                left: ["right", "left"],
                right: ["left", "right"]
            },
            c = t.mode,
            f = t.direction || "left",
            e = "up" === f || "down" === f ? "top" : "left",
            l = "up" === f || "left" === f,
            a = t.distance || u["top" === e ? "outerHeight" : "outerWidth"](!0),
            r = {};
        n.effects.createPlaceholder(u);
        s = u.cssClip();
        o = u.position()[e];
        r[e] = (l ? -1 : 1) * a + o;
        r.clip = u.cssClip();
        r.clip[h[f][1]] = r.clip[h[f][0]];
        "show" === c && (u.cssClip(r.clip), u.css(e, r[e]), r.clip = s, r[e] = o);
        u.animate(r, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: i
        })
    });
    n.uiBackCompat !== !1 && (p = n.effects.define("transfer", function(t, i) {
        n(this).transfer(t, i)
    }));
    n.ui.focusable = function(t, i) {
        var u, f, e, r, o, s = t.nodeName.toLowerCase();
        return "area" === s ? (u = t.parentNode, f = u.name, t.href && f && "map" === u.nodeName.toLowerCase() ? (e = n("img[usemap='#" + f + "']"), e.length > 0 && e.is(":visible")) : !1) : (/^(input|select|textarea|button|object)$/.test(s) ? (r = !t.disabled, r && (o = n(t).closest("fieldset")[0], o && (r = !o.disabled))) : r = "a" === s ? t.href || i : i, r && n(t).is(":visible") && b(n(t)))
    };
    n.extend(n.expr[":"], {
        focusable: function(t) {
            return n.ui.focusable(t, null != n.attr(t, "tabindex"))
        }
    });
    n.ui.focusable;
    n.fn.form = function() {
        return "string" == typeof this[0].form ? this.closest("form") : n(this[0].form)
    };
    n.ui.formResetMixin = {
        _formResetHandler: function() {
            var t = n(this);
            setTimeout(function() {
                var i = t.data("ui-form-reset-instances");
                n.each(i, function() {
                    this.refresh()
                })
            })
        },
        _bindFormResetHandler: function() {
            if (this.form = this.element.form(), this.form.length) {
                var n = this.form.data("ui-form-reset-instances") || [];
                n.length || this.form.on("reset.ui-form-reset", this._formResetHandler);
                n.push(this);
                this.form.data("ui-form-reset-instances", n)
            }
        },
        _unbindFormResetHandler: function() {
            if (this.form.length) {
                var t = this.form.data("ui-form-reset-instances");
                t.splice(n.inArray(this, t), 1);
                t.length ? this.form.data("ui-form-reset-instances", t) : this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset")
            }
        }
    };
    "1.7" === n.fn.jquery.substring(0, 3) && (n.each(["Width", "Height"], function(t, i) {
        function r(t, i, r, u) {
            return n.each(e, function() {
                i -= parseFloat(n.css(t, "padding" + this)) || 0;
                r && (i -= parseFloat(n.css(t, "border" + this + "Width")) || 0);
                u && (i -= parseFloat(n.css(t, "margin" + this)) || 0)
            }), i
        }
        var e = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
            u = i.toLowerCase(),
            f = {
                innerWidth: n.fn.innerWidth,
                innerHeight: n.fn.innerHeight,
                outerWidth: n.fn.outerWidth,
                outerHeight: n.fn.outerHeight
            };
        n.fn["inner" + i] = function(t) {
            return void 0 === t ? f["inner" + i].call(this) : this.each(function() {
                n(this).css(u, r(this, t) + "px")
            })
        };
        n.fn["outer" + i] = function(t, e) {
            return "number" != typeof t ? f["outer" + i].call(this, t) : this.each(function() {
                n(this).css(u, r(this, t, !0, e) + "px")
            })
        }
    }), n.fn.addBack = function(n) {
        return this.add(null == n ? this.prevObject : this.prevObject.filter(n))
    });
    n.ui.keyCode = {
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
    };
    n.ui.escapeSelector = function() {
        var n = /([!"#$%&'()*+,.\/:;<=>?@[\]^`{|}~])/g;
        return function(t) {
            return t.replace(n, "\\$1")
        }
    }();
    n.fn.labels = function() {
        var t, r, u, i, f;
        return this[0].labels && this[0].labels.length ? this.pushStack(this[0].labels) : (i = this.eq(0).parents("label"), u = this.attr("id"), u && (t = this.eq(0).parents().last(), f = t.add(t.length ? t.siblings() : this.siblings()), r = "label[for='" + n.ui.escapeSelector(u) + "']", i = i.add(f.find(r).addBack(r))), this.pushStack(i))
    };
    n.fn.scrollParent = function(t) {
        var i = this.css("position"),
            u = "absolute" === i,
            f = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
            r = this.parents().filter(function() {
                var t = n(this);
                return u && "static" === t.css("position") ? !1 : f.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"))
            }).eq(0);
        return "fixed" !== i && r.length ? r : n(this[0].ownerDocument || document)
    };
    n.extend(n.expr[":"], {
        tabbable: function(t) {
            var i = n.attr(t, "tabindex"),
                r = null != i;
            return (!r || i >= 0) && n.ui.focusable(t, r)
        }
    });
    n.fn.extend({
        uniqueId: function() {
            var n = 0;
            return function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++n)
                })
            }
        }(),
        removeUniqueId: function() {
            return this.each(function() {
                /^ui-id-\d+$/.test(this.id) && n(this).removeAttr("id")
            })
        }
    });
    n.widget("ui.accordion", {
        version: "1.12.1",
        options: {
            active: 0,
            animate: {},
            classes: {
                "ui-accordion-header": "ui-corner-top",
                "ui-accordion-header-collapsed": "ui-corner-all",
                "ui-accordion-content": "ui-corner-bottom"
            },
            collapsible: !1,
            event: "click",
            header: "> li > :first-child, > :not(li):even",
            heightStyle: "auto",
            icons: {
                activeHeader: "ui-icon-triangle-1-s",
                header: "ui-icon-triangle-1-e"
            },
            activate: null,
            beforeActivate: null
        },
        hideProps: {
            borderTopWidth: "hide",
            borderBottomWidth: "hide",
            paddingTop: "hide",
            paddingBottom: "hide",
            height: "hide"
        },
        showProps: {
            borderTopWidth: "show",
            borderBottomWidth: "show",
            paddingTop: "show",
            paddingBottom: "show",
            height: "show"
        },
        _create: function() {
            var t = this.options;
            this.prevShow = this.prevHide = n();
            this._addClass("ui-accordion", "ui-widget ui-helper-reset");
            this.element.attr("role", "tablist");
            t.collapsible || t.active !== !1 && null != t.active || (t.active = 0);
            this._processPanels();
            0 > t.active && (t.active += this.headers.length);
            this._refresh()
        },
        _getCreateEventData: function() {
            return {
                header: this.active,
                panel: this.active.length ? this.active.next() : n()
            }
        },
        _createIcons: function() {
            var i, r, t = this.options.icons;
            t && (i = n("<span>"), this._addClass(i, "ui-accordion-header-icon", "ui-icon " + t.header), i.prependTo(this.headers), r = this.active.children(".ui-accordion-header-icon"), this._removeClass(r, t.header)._addClass(r, null, t.activeHeader)._addClass(this.headers, "ui-accordion-icons"))
        },
        _destroyIcons: function() {
            this._removeClass(this.headers, "ui-accordion-icons");
            this.headers.children(".ui-accordion-header-icon").remove()
        },
        _destroy: function() {
            var n;
            this.element.removeAttr("role");
            this.headers.removeAttr("role aria-expanded aria-selected aria-controls tabIndex").removeUniqueId();
            this._destroyIcons();
            n = this.headers.next().css("display", "").removeAttr("role aria-hidden aria-labelledby").removeUniqueId();
            "content" !== this.options.heightStyle && n.css("height", "")
        },
        _setOption: function(n, t) {
            return "active" === n ? (this._activate(t), void 0) : ("event" === n && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(t)), this._super(n, t), "collapsible" !== n || t || this.options.active !== !1 || this._activate(0), "icons" === n && (this._destroyIcons(), t && this._createIcons()), void 0)
        },
        _setOptionDisabled: function(n) {
            this._super(n);
            this.element.attr("aria-disabled", n);
            this._toggleClass(null, "ui-state-disabled", !!n);
            this._toggleClass(this.headers.add(this.headers.next()), null, "ui-state-disabled", !!n)
        },
        _keydown: function(t) {
            if (!t.altKey && !t.ctrlKey) {
                var i = n.ui.keyCode,
                    u = this.headers.length,
                    f = this.headers.index(t.target),
                    r = !1;
                switch (t.keyCode) {
                    case i.RIGHT:
                    case i.DOWN:
                        r = this.headers[(f + 1) % u];
                        break;
                    case i.LEFT:
                    case i.UP:
                        r = this.headers[(f - 1 + u) % u];
                        break;
                    case i.SPACE:
                    case i.ENTER:
                        this._eventHandler(t);
                        break;
                    case i.HOME:
                        r = this.headers[0];
                        break;
                    case i.END:
                        r = this.headers[u - 1]
                }
                r && (n(t.target).attr("tabIndex", -1), n(r).attr("tabIndex", 0), n(r).trigger("focus"), t.preventDefault())
            }
        },
        _panelKeyDown: function(t) {
            t.keyCode === n.ui.keyCode.UP && t.ctrlKey && n(t.currentTarget).prev().trigger("focus")
        },
        refresh: function() {
            var t = this.options;
            this._processPanels();
            t.active === !1 && t.collapsible === !0 || !this.headers.length ? (t.active = !1, this.active = n()) : t.active === !1 ? this._activate(0) : this.active.length && !n.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (t.active = !1, this.active = n()) : this._activate(Math.max(0, t.active - 1)) : t.active = this.headers.index(this.active);
            this._destroyIcons();
            this._refresh()
        },
        _processPanels: function() {
            var t = this.headers,
                n = this.panels;
            this.headers = this.element.find(this.options.header);
            this._addClass(this.headers, "ui-accordion-header ui-accordion-header-collapsed", "ui-state-default");
            this.panels = this.headers.next().filter(":not(.ui-accordion-content-active)").hide();
            this._addClass(this.panels, "ui-accordion-content", "ui-helper-reset ui-widget-content");
            n && (this._off(t.not(this.headers)), this._off(n.not(this.panels)))
        },
        _refresh: function() {
            var t, i = this.options,
                r = i.heightStyle,
                u = this.element.parent();
            this.active = this._findActive(i.active);
            this._addClass(this.active, "ui-accordion-header-active", "ui-state-active")._removeClass(this.active, "ui-accordion-header-collapsed");
            this._addClass(this.active.next(), "ui-accordion-content-active");
            this.active.next().show();
            this.headers.attr("role", "tab").each(function() {
                var t = n(this),
                    r = t.uniqueId().attr("id"),
                    i = t.next(),
                    u = i.uniqueId().attr("id");
                t.attr("aria-controls", u);
                i.attr("aria-labelledby", r)
            }).next().attr("role", "tabpanel");
            this.headers.not(this.active).attr({
                "aria-selected": "false",
                "aria-expanded": "false",
                tabIndex: -1
            }).next().attr({
                "aria-hidden": "true"
            }).hide();
            this.active.length ? this.active.attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            }).next().attr({
                "aria-hidden": "false"
            }) : this.headers.eq(0).attr("tabIndex", 0);
            this._createIcons();
            this._setupEvents(i.event);
            "fill" === r ? (t = u.height(), this.element.siblings(":visible").each(function() {
                var i = n(this),
                    r = i.css("position");
                "absolute" !== r && "fixed" !== r && (t -= i.outerHeight(!0))
            }), this.headers.each(function() {
                t -= n(this).outerHeight(!0)
            }), this.headers.next().each(function() {
                n(this).height(Math.max(0, t - n(this).innerHeight() + n(this).height()))
            }).css("overflow", "auto")) : "auto" === r && (t = 0, this.headers.next().each(function() {
                var i = n(this).is(":visible");
                i || n(this).show();
                t = Math.max(t, n(this).css("height", "").height());
                i || n(this).hide()
            }).height(t))
        },
        _activate: function(t) {
            var i = this._findActive(t)[0];
            i !== this.active[0] && (i = i || this.active[0], this._eventHandler({
                target: i,
                currentTarget: i,
                preventDefault: n.noop
            }))
        },
        _findActive: function(t) {
            return "number" == typeof t ? this.headers.eq(t) : n()
        },
        _setupEvents: function(t) {
            var i = {
                keydown: "_keydown"
            };
            t && n.each(t.split(" "), function(n, t) {
                i[t] = "_eventHandler"
            });
            this._off(this.headers.add(this.headers.next()));
            this._on(this.headers, i);
            this._on(this.headers.next(), {
                keydown: "_panelKeyDown"
            });
            this._hoverable(this.headers);
            this._focusable(this.headers)
        },
        _eventHandler: function(t) {
            var e, o, i = this.options,
                u = this.active,
                r = n(t.currentTarget),
                f = r[0] === u[0],
                s = f && i.collapsible,
                c = s ? n() : r.next(),
                l = u.next(),
                h = {
                    oldHeader: u,
                    oldPanel: l,
                    newHeader: s ? n() : r,
                    newPanel: c
                };
            t.preventDefault();
            f && !i.collapsible || this._trigger("beforeActivate", t, h) === !1 || (i.active = s ? !1 : this.headers.index(r), this.active = f ? n() : r, this._toggle(h), this._removeClass(u, "ui-accordion-header-active", "ui-state-active"), i.icons && (e = u.children(".ui-accordion-header-icon"), this._removeClass(e, null, i.icons.activeHeader)._addClass(e, null, i.icons.header)), f || (this._removeClass(r, "ui-accordion-header-collapsed")._addClass(r, "ui-accordion-header-active", "ui-state-active"), i.icons && (o = r.children(".ui-accordion-header-icon"), this._removeClass(o, null, i.icons.header)._addClass(o, null, i.icons.activeHeader)), this._addClass(r.next(), "ui-accordion-content-active")))
        },
        _toggle: function(t) {
            var r = t.newPanel,
                i = this.prevShow.length ? this.prevShow : t.oldPanel;
            this.prevShow.add(this.prevHide).stop(!0, !0);
            this.prevShow = r;
            this.prevHide = i;
            this.options.animate ? this._animate(r, i, t) : (i.hide(), r.show(), this._toggleComplete(t));
            i.attr({
                "aria-hidden": "true"
            });
            i.prev().attr({
                "aria-selected": "false",
                "aria-expanded": "false"
            });
            r.length && i.length ? i.prev().attr({
                tabIndex: -1,
                "aria-expanded": "false"
            }) : r.length && this.headers.filter(function() {
                return 0 === parseInt(n(this).attr("tabIndex"), 10)
            }).attr("tabIndex", -1);
            r.attr("aria-hidden", "false").prev().attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            })
        },
        _animate: function(n, t, i) {
            var h, r, u, c = this,
                o = 0,
                l = n.css("box-sizing"),
                a = n.length && (!t.length || n.index() < t.index()),
                e = this.options.animate || {},
                f = a && e.down || e,
                s = function() {
                    c._toggleComplete(i)
                };
            return "number" == typeof f && (u = f), "string" == typeof f && (r = f), r = r || f.easing || e.easing, u = u || f.duration || e.duration, t.length ? n.length ? (h = n.show().outerHeight(), t.animate(this.hideProps, {
                duration: u,
                easing: r,
                step: function(n, t) {
                    t.now = Math.round(n)
                }
            }), n.hide().animate(this.showProps, {
                duration: u,
                easing: r,
                complete: s,
                step: function(n, i) {
                    i.now = Math.round(n);
                    "height" !== i.prop ? "content-box" === l && (o += i.now) : "content" !== c.options.heightStyle && (i.now = Math.round(h - t.outerHeight() - o), o = 0)
                }
            }), void 0) : t.animate(this.hideProps, u, r, s) : n.animate(this.showProps, u, r, s)
        },
        _toggleComplete: function(n) {
            var t = n.oldPanel,
                i = t.prev();
            this._removeClass(t, "ui-accordion-content-active");
            this._removeClass(i, "ui-accordion-header-active")._addClass(i, "ui-accordion-header-collapsed");
            t.length && (t.parent()[0].className = t.parent()[0].className);
            this._trigger("activate", null, n)
        }
    });
    n.ui.safeActiveElement = function(n) {
        var t;
        try {
            t = n.activeElement
        } catch (i) {
            t = n.body
        }
        return t || (t = n.body), t.nodeName || (t = n.body), t
    };
    n.widget("ui.menu", {
        version: "1.12.1",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-caret-1-e"
            },
            items: "> *",
            menus: "ul",
            position: {
                my: "left top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function() {
            this.activeMenu = this.element;
            this.mouseHandled = !1;
            this.element.uniqueId().attr({
                role: this.options.role,
                tabIndex: 0
            });
            this._addClass("ui-menu", "ui-widget ui-widget-content");
            this._on({
                "mousedown .ui-menu-item": function(n) {
                    n.preventDefault()
                },
                "click .ui-menu-item": function(t) {
                    var i = n(t.target),
                        r = n(n.ui.safeActiveElement(this.document[0]));
                    !this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(t), t.isPropagationStopped() || (this.mouseHandled = !0), i.has(".ui-menu").length ? this.expand(t) : !this.element.is(":focus") && r.closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                },
                "mouseenter .ui-menu-item": function(t) {
                    if (!this.previousFilter) {
                        var r = n(t.target).closest(".ui-menu-item"),
                            i = n(t.currentTarget);
                        r[0] === i[0] && (this._removeClass(i.siblings().children(".ui-state-active"), null, "ui-state-active"), this.focus(t, i))
                    }
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function(n, t) {
                    var i = this.active || this.element.find(this.options.items).eq(0);
                    t || this.focus(n, i)
                },
                blur: function(t) {
                    this._delay(function() {
                        var i = !n.contains(this.element[0], n.ui.safeActiveElement(this.document[0]));
                        i && this.collapseAll(t)
                    })
                },
                keydown: "_keydown"
            });
            this.refresh();
            this._on(this.document, {
                click: function(n) {
                    this._closeOnDocumentClick(n) && this.collapseAll(n);
                    this.mouseHandled = !1
                }
            })
        },
        _destroy: function() {
            var t = this.element.find(".ui-menu-item").removeAttr("role aria-disabled"),
                i = t.children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show();
            i.children().each(function() {
                var t = n(this);
                t.data("ui-menu-submenu-caret") && t.remove()
            })
        },
        _keydown: function(t) {
            var i, u, r, f, e = !0;
            switch (t.keyCode) {
                case n.ui.keyCode.PAGE_UP:
                    this.previousPage(t);
                    break;
                case n.ui.keyCode.PAGE_DOWN:
                    this.nextPage(t);
                    break;
                case n.ui.keyCode.HOME:
                    this._move("first", "first", t);
                    break;
                case n.ui.keyCode.END:
                    this._move("last", "last", t);
                    break;
                case n.ui.keyCode.UP:
                    this.previous(t);
                    break;
                case n.ui.keyCode.DOWN:
                    this.next(t);
                    break;
                case n.ui.keyCode.LEFT:
                    this.collapse(t);
                    break;
                case n.ui.keyCode.RIGHT:
                    this.active && !this.active.is(".ui-state-disabled") && this.expand(t);
                    break;
                case n.ui.keyCode.ENTER:
                case n.ui.keyCode.SPACE:
                    this._activate(t);
                    break;
                case n.ui.keyCode.ESCAPE:
                    this.collapse(t);
                    break;
                default:
                    e = !1;
                    u = this.previousFilter || "";
                    f = !1;
                    r = t.keyCode >= 96 && 105 >= t.keyCode ? "" + (t.keyCode - 96) : String.fromCharCode(t.keyCode);
                    clearTimeout(this.filterTimer);
                    r === u ? f = !0 : r = u + r;
                    i = this._filterMenuItems(r);
                    i = f && -1 !== i.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : i;
                    i.length || (r = String.fromCharCode(t.keyCode), i = this._filterMenuItems(r));
                    i.length ? (this.focus(t, i), this.previousFilter = r, this.filterTimer = this._delay(function() {
                        delete this.previousFilter
                    }, 1e3)) : delete this.previousFilter
            }
            e && t.preventDefault()
        },
        _activate: function(n) {
            this.active && !this.active.is(".ui-state-disabled") && (this.active.children("[aria-haspopup='true']").length ? this.expand(n) : this.select(n))
        },
        refresh: function() {
            var u, t, f, i, e, r = this,
                s = this.options.icons.submenu,
                o = this.element.find(this.options.menus);
            this._toggleClass("ui-menu-icons", null, !!this.element.find(".ui-icon").length);
            f = o.filter(":not(.ui-menu)").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function() {
                var t = n(this),
                    i = t.prev(),
                    u = n("<span>").data("ui-menu-submenu-caret", !0);
                r._addClass(u, "ui-menu-icon", "ui-icon " + s);
                i.attr("aria-haspopup", "true").prepend(u);
                t.attr("aria-labelledby", i.attr("id"))
            });
            this._addClass(f, "ui-menu", "ui-widget ui-widget-content ui-front");
            u = o.add(this.element);
            t = u.find(this.options.items);
            t.not(".ui-menu-item").each(function() {
                var t = n(this);
                r._isDivider(t) && r._addClass(t, "ui-menu-divider", "ui-widget-content")
            });
            i = t.not(".ui-menu-item, .ui-menu-divider");
            e = i.children().not(".ui-menu").uniqueId().attr({
                tabIndex: -1,
                role: this._itemRole()
            });
            this._addClass(i, "ui-menu-item")._addClass(e, "ui-menu-item-wrapper");
            t.filter(".ui-state-disabled").attr("aria-disabled", "true");
            this.active && !n.contains(this.element[0], this.active[0]) && this.blur()
        },
        _itemRole: function() {
            return {
                menu: "menuitem",
                listbox: "option"
            }[this.options.role]
        },
        _setOption: function(n, t) {
            if ("icons" === n) {
                var i = this.element.find(".ui-menu-icon");
                this._removeClass(i, null, this.options.icons.submenu)._addClass(i, null, t.submenu)
            }
            this._super(n, t)
        },
        _setOptionDisabled: function(n) {
            this._super(n);
            this.element.attr("aria-disabled", n + "");
            this._toggleClass(null, "ui-state-disabled", !!n)
        },
        focus: function(n, t) {
            var i, r, u;
            this.blur(n, n && "focus" === n.type);
            this._scrollIntoView(t);
            this.active = t.first();
            r = this.active.children(".ui-menu-item-wrapper");
            this._addClass(r, null, "ui-state-active");
            this.options.role && this.element.attr("aria-activedescendant", r.attr("id"));
            u = this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper");
            this._addClass(u, null, "ui-state-active");
            n && "keydown" === n.type ? this._close() : this.timer = this._delay(function() {
                this._close()
            }, this.delay);
            i = t.children(".ui-menu");
            i.length && n && /^mouse/.test(n.type) && this._startOpening(i);
            this.activeMenu = t.parent();
            this._trigger("focus", n, {
                item: t
            })
        },
        _scrollIntoView: function(t) {
            var e, o, i, r, u, f;
            this._hasScroll() && (e = parseFloat(n.css(this.activeMenu[0], "borderTopWidth")) || 0, o = parseFloat(n.css(this.activeMenu[0], "paddingTop")) || 0, i = t.offset().top - this.activeMenu.offset().top - e - o, r = this.activeMenu.scrollTop(), u = this.activeMenu.height(), f = t.outerHeight(), 0 > i ? this.activeMenu.scrollTop(r + i) : i + f > u && this.activeMenu.scrollTop(r + i - u + f))
        },
        blur: function(n, t) {
            t || clearTimeout(this.timer);
            this.active && (this._removeClass(this.active.children(".ui-menu-item-wrapper"), null, "ui-state-active"), this._trigger("blur", n, {
                item: this.active
            }), this.active = null)
        },
        _startOpening: function(n) {
            clearTimeout(this.timer);
            "true" === n.attr("aria-hidden") && (this.timer = this._delay(function() {
                this._close();
                this._open(n)
            }, this.delay))
        },
        _open: function(t) {
            var i = n.extend({
                "of": this.active
            }, this.options.position);
            clearTimeout(this.timer);
            this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true");
            t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
        },
        collapseAll: function(t, i) {
            clearTimeout(this.timer);
            this.timer = this._delay(function() {
                var r = i ? this.element : n(t && t.target).closest(this.element.find(".ui-menu"));
                r.length || (r = this.element);
                this._close(r);
                this.blur(t);
                this._removeClass(r.find(".ui-state-active"), null, "ui-state-active");
                this.activeMenu = r
            }, this.delay)
        },
        _close: function(n) {
            n || (n = this.active ? this.active.parent() : this.element);
            n.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false")
        },
        _closeOnDocumentClick: function(t) {
            return !n(t.target).closest(".ui-menu").length
        },
        _isDivider: function(n) {
            return !/[^\-\u2014\u2013\s]/.test(n.text())
        },
        collapse: function(n) {
            var t = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            t && t.length && (this._close(), this.focus(n, t))
        },
        expand: function(n) {
            var t = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
            t && t.length && (this._open(t.parent()), this._delay(function() {
                this.focus(n, t)
            }))
        },
        next: function(n) {
            this._move("next", "first", n)
        },
        previous: function(n) {
            this._move("prev", "last", n)
        },
        isFirstItem: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _move: function(n, t, i) {
            var r;
            this.active && (r = "first" === n || "last" === n ? this.active["first" === n ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[n + "All"](".ui-menu-item").eq(0));
            r && r.length && this.active || (r = this.activeMenu.find(this.options.items)[t]());
            this.focus(i, r)
        },
        nextPage: function(t) {
            var i, r, u;
            return this.active ? (this.isLastItem() || (this._hasScroll() ? (r = this.active.offset().top, u = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
                return i = n(this), 0 > i.offset().top - r - u
            }), this.focus(t, i)) : this.focus(t, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]())), void 0) : (this.next(t), void 0)
        },
        previousPage: function(t) {
            var i, r, u;
            return this.active ? (this.isFirstItem() || (this._hasScroll() ? (r = this.active.offset().top, u = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
                return i = n(this), i.offset().top - r + u > 0
            }), this.focus(t, i)) : this.focus(t, this.activeMenu.find(this.options.items).first())), void 0) : (this.next(t), void 0)
        },
        _hasScroll: function() {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function(t) {
            this.active = this.active || n(t.target).closest(".ui-menu-item");
            var i = {
                item: this.active
            };
            this.active.has(".ui-menu").length || this.collapseAll(t, !0);
            this._trigger("select", t, i)
        },
        _filterMenuItems: function(t) {
            var i = t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
                r = RegExp("^" + i, "i");
            return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function() {
                return r.test(n.trim(n(this).children(".ui-menu-item-wrapper").text()))
            })
        }
    });
    n.widget("ui.autocomplete", {
        version: "1.12.1",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        requestIndex: 0,
        pending: 0,
        _create: function() {
            var t, i, r, u = this.element[0].nodeName.toLowerCase(),
                f = "textarea" === u,
                e = "input" === u;
            this.isMultiLine = f || !e && this._isContentEditable(this.element);
            this.valueMethod = this.element[f || e ? "val" : "text"];
            this.isNewMenu = !0;
            this._addClass("ui-autocomplete-input");
            this.element.attr("autocomplete", "off");
            this._on(this.element, {
                keydown: function(u) {
                    if (this.element.prop("readOnly")) return t = !0, r = !0, i = !0, void 0;
                    t = !1;
                    r = !1;
                    i = !1;
                    var f = n.ui.keyCode;
                    switch (u.keyCode) {
                        case f.PAGE_UP:
                            t = !0;
                            this._move("previousPage", u);
                            break;
                        case f.PAGE_DOWN:
                            t = !0;
                            this._move("nextPage", u);
                            break;
                        case f.UP:
                            t = !0;
                            this._keyEvent("previous", u);
                            break;
                        case f.DOWN:
                            t = !0;
                            this._keyEvent("next", u);
                            break;
                        case f.ENTER:
                            this.menu.active && (t = !0, u.preventDefault(), this.menu.select(u));
                            break;
                        case f.TAB:
                            this.menu.active && this.menu.select(u);
                            break;
                        case f.ESCAPE:
                            this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(u), u.preventDefault());
                            break;
                        default:
                            i = !0;
                            this._searchTimeout(u)
                    }
                },
                keypress: function(r) {
                    if (t) return t = !1, (!this.isMultiLine || this.menu.element.is(":visible")) && r.preventDefault(), void 0;
                    if (!i) {
                        var u = n.ui.keyCode;
                        switch (r.keyCode) {
                            case u.PAGE_UP:
                                this._move("previousPage", r);
                                break;
                            case u.PAGE_DOWN:
                                this._move("nextPage", r);
                                break;
                            case u.UP:
                                this._keyEvent("previous", r);
                                break;
                            case u.DOWN:
                                this._keyEvent("next", r)
                        }
                    }
                },
                input: function(n) {
                    return r ? (r = !1, n.preventDefault(), void 0) : (this._searchTimeout(n), void 0)
                },
                focus: function() {
                    this.selectedItem = null;
                    this.previous = this._value()
                },
                blur: function(n) {
                    return this.cancelBlur ? (delete this.cancelBlur, void 0) : (clearTimeout(this.searching), this.close(n), this._change(n), void 0)
                }
            });
            this._initSource();
            this.menu = n("<ul>").appendTo(this._appendTo()).menu({
                role: null
            }).hide().menu("instance");
            this._addClass(this.menu.element, "ui-autocomplete", "ui-front");
            this._on(this.menu.element, {
                mousedown: function(t) {
                    t.preventDefault();
                    this.cancelBlur = !0;
                    this._delay(function() {
                        delete this.cancelBlur;
                        this.element[0] !== n.ui.safeActiveElement(this.document[0]) && this.element.trigger("focus")
                    })
                },
                menufocus: function(t, i) {
                    var r, u;
                    return this.isNewMenu && (this.isNewMenu = !1, t.originalEvent && /^mouse/.test(t.originalEvent.type)) ? (this.menu.blur(), this.document.one("mousemove", function() {
                        n(t.target).trigger(t.originalEvent)
                    }), void 0) : (u = i.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", t, {
                        item: u
                    }) && t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(u.value), r = i.item.attr("aria-label") || u.value, r && n.trim(r).length && (this.liveRegion.children().hide(), n("<div>").text(r).appendTo(this.liveRegion)), void 0)
                },
                menuselect: function(t, i) {
                    var r = i.item.data("ui-autocomplete-item"),
                        u = this.previous;
                    this.element[0] !== n.ui.safeActiveElement(this.document[0]) && (this.element.trigger("focus"), this.previous = u, this._delay(function() {
                        this.previous = u;
                        this.selectedItem = r
                    }));
                    !1 !== this._trigger("select", t, {
                        item: r
                    }) && this._value(r.value);
                    this.term = this._value();
                    this.close(t);
                    this.selectedItem = r
                }
            });
            this.liveRegion = n("<div>", {
                role: "status",
                "aria-live": "assertive",
                "aria-relevant": "additions"
            }).appendTo(this.document[0].body);
            this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible");
            this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _destroy: function() {
            clearTimeout(this.searching);
            this.element.removeAttr("autocomplete");
            this.menu.element.remove();
            this.liveRegion.remove()
        },
        _setOption: function(n, t) {
            this._super(n, t);
            "source" === n && this._initSource();
            "appendTo" === n && this.menu.element.appendTo(this._appendTo());
            "disabled" === n && t && this.xhr && this.xhr.abort()
        },
        _isEventTargetInWidget: function(t) {
            var i = this.menu.element[0];
            return t.target === this.element[0] || t.target === i || n.contains(i, t.target)
        },
        _closeOnClickOutside: function(n) {
            this._isEventTargetInWidget(n) || this.close()
        },
        _appendTo: function() {
            var t = this.options.appendTo;
            return t && (t = t.jquery || t.nodeType ? n(t) : this.document.find(t).eq(0)), t && t[0] || (t = this.element.closest(".ui-front, dialog")), t.length || (t = this.document[0].body), t
        },
        _initSource: function() {
            var i, r, t = this;
            n.isArray(this.options.source) ? (i = this.options.source, this.source = function(t, r) {
                r(n.ui.autocomplete.filter(i, t.term))
            }) : "string" == typeof this.options.source ? (r = this.options.source, this.source = function(i, u) {
                t.xhr && t.xhr.abort();
                t.xhr = n.ajax({
                    url: r,
                    data: i,
                    dataType: "json",
                    success: function(n) {
                        u(n)
                    },
                    error: function() {
                        u([])
                    }
                })
            }) : this.source = this.options.source
        },
        _searchTimeout: function(n) {
            clearTimeout(this.searching);
            this.searching = this._delay(function() {
                var t = this.term === this._value(),
                    i = this.menu.element.is(":visible"),
                    r = n.altKey || n.ctrlKey || n.metaKey || n.shiftKey;
                t && (!t || i || r) || (this.selectedItem = null, this.search(null, n))
            }, this.options.delay)
        },
        search: function(n, t) {
            return n = null != n ? n : this._value(), this.term = this._value(), n.length < this.options.minLength ? this.close(t) : this._trigger("search", t) !== !1 ? this._search(n) : void 0
        },
        _search: function(n) {
            this.pending++;
            this._addClass("ui-autocomplete-loading");
            this.cancelSearch = !1;
            this.source({
                term: n
            }, this._response())
        },
        _response: function() {
            var t = ++this.requestIndex;
            return n.proxy(function(n) {
                t === this.requestIndex && this.__response(n);
                this.pending--;
                this.pending || this._removeClass("ui-autocomplete-loading")
            }, this)
        },
        __response: function(n) {
            n && (n = this._normalize(n));
            this._trigger("response", null, {
                content: n
            });
            !this.options.disabled && n && n.length && !this.cancelSearch ? (this._suggest(n), this._trigger("open")) : this._close()
        },
        close: function(n) {
            this.cancelSearch = !0;
            this._close(n)
        },
        _close: function(n) {
            this._off(this.document, "mousedown");
            this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", n))
        },
        _change: function(n) {
            this.previous !== this._value() && this._trigger("change", n, {
                item: this.selectedItem
            })
        },
        _normalize: function(t) {
            return t.length && t[0].label && t[0].value ? t : n.map(t, function(t) {
                return "string" == typeof t ? {
                    label: t,
                    value: t
                } : n.extend({}, t, {
                    label: t.label || t.value,
                    value: t.value || t.label
                })
            })
        },
        _suggest: function(t) {
            var i = this.menu.element.empty();
            this._renderMenu(i, t);
            this.isNewMenu = !0;
            this.menu.refresh();
            i.show();
            this._resizeMenu();
            i.position(n.extend({
                "of": this.element
            }, this.options.position));
            this.options.autoFocus && this.menu.next();
            this._on(this.document, {
                mousedown: "_closeOnClickOutside"
            })
        },
        _resizeMenu: function() {
            var n = this.menu.element;
            n.outerWidth(Math.max(n.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function(t, i) {
            var r = this;
            n.each(i, function(n, i) {
                r._renderItemData(t, i)
            })
        },
        _renderItemData: function(n, t) {
            return this._renderItem(n, t).data("ui-autocomplete-item", t)
        },
        _renderItem: function(t, i) {
            return n("<li>").append(n("<div>").text(i.label)).appendTo(t)
        },
        _move: function(n, t) {
            return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(n) || this.menu.isLastItem() && /^next/.test(n) ? (this.isMultiLine || this._value(this.term), this.menu.blur(), void 0) : (this.menu[n](t), void 0) : (this.search(null, t), void 0)
        },
        widget: function() {
            return this.menu.element
        },
        _value: function() {
            return this.valueMethod.apply(this.element, arguments)
        },
        _keyEvent: function(n, t) {
            (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(n, t), t.preventDefault())
        },
        _isContentEditable: function(n) {
            if (!n.length) return !1;
            var t = n.prop("contentEditable");
            return "inherit" === t ? this._isContentEditable(n.parent()) : "true" === t
        }
    });
    n.extend(n.ui.autocomplete, {
        escapeRegex: function(n) {
            return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        },
        filter: function(t, i) {
            var r = RegExp(n.ui.autocomplete.escapeRegex(i), "i");
            return n.grep(t, function(n) {
                return r.test(n.label || n.value || n)
            })
        }
    });
    n.widget("ui.autocomplete", n.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function(n) {
                    return n + (n > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                }
            }
        },
        __response: function(t) {
            var i;
            this._superApply(arguments);
            this.options.disabled || this.cancelSearch || (i = t && t.length ? this.options.messages.results(t.length) : this.options.messages.noResults, this.liveRegion.children().hide(), n("<div>").text(i).appendTo(this.liveRegion))
        }
    });
    n.ui.autocomplete;
    w = /ui-corner-([a-z]){2,6}/g;
    n.widget("ui.controlgroup", {
        version: "1.12.1",
        defaultElement: "<div>",
        options: {
            direction: "horizontal",
            disabled: null,
            onlyVisible: !0,
            items: {
                button: "input[type=button], input[type=submit], input[type=reset], button, a",
                controlgroupLabel: ".ui-controlgroup-label",
                checkboxradio: "input[type='checkbox'], input[type='radio']",
                selectmenu: "select",
                spinner: ".ui-spinner-input"
            }
        },
        _create: function() {
            this._enhance()
        },
        _enhance: function() {
            this.element.attr("role", "toolbar");
            this.refresh()
        },
        _destroy: function() {
            this._callChildMethod("destroy");
            this.childWidgets.removeData("ui-controlgroup-data");
            this.element.removeAttr("role");
            this.options.items.controlgroupLabel && this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap()
        },
        _initWidgets: function() {
            var t = this,
                i = [];
            n.each(this.options.items, function(r, u) {
                var f, e = {};
                if (u) return "controlgroupLabel" === r ? (f = t.element.find(u), f.each(function() {
                    var t = n(this);
                    t.children(".ui-controlgroup-label-contents").length || t.contents().wrapAll("<span class='ui-controlgroup-label-contents'><\/span>")
                }), t._addClass(f, null, "ui-widget ui-widget-content ui-state-default"), i = i.concat(f.get()), void 0) : (n.fn[r] && (e = t["_" + r + "Options"] ? t["_" + r + "Options"]("middle") : {
                    classes: {}
                }, t.element.find(u).each(function() {
                    var u = n(this),
                        f = u[r]("instance"),
                        o = n.widget.extend({}, e),
                        s;
                    "button" === r && u.parent(".ui-spinner").length || (f || (f = u[r]()[r]("instance")), f && (o.classes = t._resolveClassesValues(o.classes, f)), u[r](o), s = u[r]("widget"), n.data(s[0], "ui-controlgroup-data", f ? f : u[r]("instance")), i.push(s[0]))
                })), void 0)
            });
            this.childWidgets = n(n.unique(i));
            this._addClass(this.childWidgets, "ui-controlgroup-item")
        },
        _callChildMethod: function(t) {
            this.childWidgets.each(function() {
                var r = n(this),
                    i = r.data("ui-controlgroup-data");
                i && i[t] && i[t]()
            })
        },
        _updateCornerClass: function(n, t) {
            var i = this._buildSimpleOptions(t, "label").classes.label;
            this._removeClass(n, null, "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all");
            this._addClass(n, null, i)
        },
        _buildSimpleOptions: function(n, t) {
            var i = "vertical" === this.options.direction,
                r = {
                    classes: {}
                };
            return r.classes[t] = {
                middle: "",
                first: "ui-corner-" + (i ? "top" : "left"),
                last: "ui-corner-" + (i ? "bottom" : "right"),
                only: "ui-corner-all"
            }[n], r
        },
        _spinnerOptions: function(n) {
            var t = this._buildSimpleOptions(n, "ui-spinner");
            return t.classes["ui-spinner-up"] = "", t.classes["ui-spinner-down"] = "", t
        },
        _buttonOptions: function(n) {
            return this._buildSimpleOptions(n, "ui-button")
        },
        _checkboxradioOptions: function(n) {
            return this._buildSimpleOptions(n, "ui-checkboxradio-label")
        },
        _selectmenuOptions: function(n) {
            var t = "vertical" === this.options.direction;
            return {
                width: t ? "auto" : !1,
                classes: {
                    middle: {
                        "ui-selectmenu-button-open": "",
                        "ui-selectmenu-button-closed": ""
                    },
                    first: {
                        "ui-selectmenu-button-open": "ui-corner-" + (t ? "top" : "tl"),
                        "ui-selectmenu-button-closed": "ui-corner-" + (t ? "top" : "left")
                    },
                    last: {
                        "ui-selectmenu-button-open": t ? "" : "ui-corner-tr",
                        "ui-selectmenu-button-closed": "ui-corner-" + (t ? "bottom" : "right")
                    },
                    only: {
                        "ui-selectmenu-button-open": "ui-corner-top",
                        "ui-selectmenu-button-closed": "ui-corner-all"
                    }
                }[n]
            }
        },
        _resolveClassesValues: function(t, i) {
            var r = {};
            return n.each(t, function(u) {
                var f = i.options.classes[u] || "";
                f = n.trim(f.replace(w, ""));
                r[u] = (f + " " + t[u]).replace(/\s+/g, " ")
            }), r
        },
        _setOption: function(n, t) {
            return "direction" === n && this._removeClass("ui-controlgroup-" + this.options.direction), this._super(n, t), "disabled" === n ? (this._callChildMethod(t ? "disable" : "enable"), void 0) : (this.refresh(), void 0)
        },
        refresh: function() {
            var t, i = this;
            this._addClass("ui-controlgroup ui-controlgroup-" + this.options.direction);
            "horizontal" === this.options.direction && this._addClass(null, "ui-helper-clearfix");
            this._initWidgets();
            t = this.childWidgets;
            this.options.onlyVisible && (t = t.filter(":visible"));
            t.length && (n.each(["first", "last"], function(n, r) {
                var u = t[r]().data("ui-controlgroup-data"),
                    f;
                u && i["_" + u.widgetName + "Options"] ? (f = i["_" + u.widgetName + "Options"](1 === t.length ? "only" : r), f.classes = i._resolveClassesValues(f.classes, u), u.element[u.widgetName](f)) : i._updateCornerClass(t[r](), r)
            }), this._callChildMethod("refresh"))
        }
    });
    n.widget("ui.checkboxradio", [n.ui.formResetMixin, {
        version: "1.12.1",
        options: {
            disabled: null,
            label: null,
            icon: !0,
            classes: {
                "ui-checkboxradio-label": "ui-corner-all",
                "ui-checkboxradio-icon": "ui-corner-all"
            }
        },
        _getCreateOptions: function() {
            var t, i, u = this,
                r = this._super() || {};
            return this._readType(), i = this.element.labels(), this.label = n(i[i.length - 1]), this.label.length || n.error("No label found for checkboxradio widget"), this.originalLabel = "", this.label.contents().not(this.element[0]).each(function() {
                u.originalLabel += 3 === this.nodeType ? n(this).text() : this.outerHTML
            }), this.originalLabel && (r.label = this.originalLabel), t = this.element[0].disabled, null != t && (r.disabled = t), r
        },
        _create: function() {
            var n = this.element[0].checked;
            this._bindFormResetHandler();
            null == this.options.disabled && (this.options.disabled = this.element[0].disabled);
            this._setOption("disabled", this.options.disabled);
            this._addClass("ui-checkboxradio", "ui-helper-hidden-accessible");
            this._addClass(this.label, "ui-checkboxradio-label", "ui-button ui-widget");
            "radio" === this.type && this._addClass(this.label, "ui-checkboxradio-radio-label");
            this.options.label && this.options.label !== this.originalLabel ? this._updateLabel() : this.originalLabel && (this.options.label = this.originalLabel);
            this._enhance();
            n && (this._addClass(this.label, "ui-checkboxradio-checked", "ui-state-active"), this.icon && this._addClass(this.icon, null, "ui-state-hover"));
            this._on({
                change: "_toggleClasses",
                focus: function() {
                    this._addClass(this.label, null, "ui-state-focus ui-visual-focus")
                },
                blur: function() {
                    this._removeClass(this.label, null, "ui-state-focus ui-visual-focus")
                }
            })
        },
        _readType: function() {
            var t = this.element[0].nodeName.toLowerCase();
            this.type = this.element[0].type;
            "input" === t && /radio|checkbox/.test(this.type) || n.error("Can't create checkboxradio on element.nodeName=" + t + " and element.type=" + this.type)
        },
        _enhance: function() {
            this._updateIcon(this.element[0].checked)
        },
        widget: function() {
            return this.label
        },
        _getRadioGroup: function() {
            var t, i = this.element[0].name,
                r = "input[name='" + n.ui.escapeSelector(i) + "']";
            return i ? (t = this.form.length ? n(this.form[0].elements).filter(r) : n(r).filter(function() {
                return 0 === n(this).form().length
            }), t.not(this.element)) : n([])
        },
        _toggleClasses: function() {
            var t = this.element[0].checked;
            this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", t);
            this.options.icon && "checkbox" === this.type && this._toggleClass(this.icon, null, "ui-icon-check ui-state-checked", t)._toggleClass(this.icon, null, "ui-icon-blank", !t);
            "radio" === this.type && this._getRadioGroup().each(function() {
                var t = n(this).checkboxradio("instance");
                t && t._removeClass(t.label, "ui-checkboxradio-checked", "ui-state-active")
            })
        },
        _destroy: function() {
            this._unbindFormResetHandler();
            this.icon && (this.icon.remove(), this.iconSpace.remove())
        },
        _setOption: function(n, t) {
            if ("label" !== n || t) return (this._super(n, t), "disabled" === n ? (this._toggleClass(this.label, null, "ui-state-disabled", t), this.element[0].disabled = t, void 0) : (this.refresh(), void 0))
        },
        _updateIcon: function(t) {
            var i = "ui-icon ui-icon-background ";
            this.options.icon ? (this.icon || (this.icon = n("<span>"), this.iconSpace = n("<span> <\/span>"), this._addClass(this.iconSpace, "ui-checkboxradio-icon-space")), "checkbox" === this.type ? (i += t ? "ui-icon-check ui-state-checked" : "ui-icon-blank", this._removeClass(this.icon, null, t ? "ui-icon-blank" : "ui-icon-check")) : i += "ui-icon-blank", this._addClass(this.icon, "ui-checkboxradio-icon", i), t || this._removeClass(this.icon, null, "ui-icon-check ui-state-checked"), this.icon.prependTo(this.label).after(this.iconSpace)) : void 0 !== this.icon && (this.icon.remove(), this.iconSpace.remove(), delete this.icon)
        },
        _updateLabel: function() {
            var n = this.label.contents().not(this.element[0]);
            this.icon && (n = n.not(this.icon[0]));
            this.iconSpace && (n = n.not(this.iconSpace[0]));
            n.remove();
            this.label.append(this.options.label)
        },
        refresh: function() {
            var n = this.element[0].checked,
                t = this.element[0].disabled;
            this._updateIcon(n);
            this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", n);
            null !== this.options.label && this._updateLabel();
            t !== this.options.disabled && this._setOptions({
                disabled: t
            })
        }
    }]);
    n.ui.checkboxradio;
    n.widget("ui.button", {
        version: "1.12.1",
        defaultElement: "<button>",
        options: {
            classes: {
                "ui-button": "ui-corner-all"
            },
            disabled: null,
            icon: null,
            iconPosition: "beginning",
            label: null,
            showLabel: !0
        },
        _getCreateOptions: function() {
            var n, t = this._super() || {};
            return this.isInput = this.element.is("input"), n = this.element[0].disabled, null != n && (t.disabled = n), this.originalLabel = this.isInput ? this.element.val() : this.element.html(), this.originalLabel && (t.label = this.originalLabel), t
        },
        _create: function() {
            !this.option.showLabel & !this.options.icon && (this.options.showLabel = !0);
            null == this.options.disabled && (this.options.disabled = this.element[0].disabled || !1);
            this.hasTitle = !!this.element.attr("title");
            this.options.label && this.options.label !== this.originalLabel && (this.isInput ? this.element.val(this.options.label) : this.element.html(this.options.label));
            this._addClass("ui-button", "ui-widget");
            this._setOption("disabled", this.options.disabled);
            this._enhance();
            this.element.is("a") && this._on({
                keyup: function(t) {
                    t.keyCode === n.ui.keyCode.SPACE && (t.preventDefault(), this.element[0].click ? this.element[0].click() : this.element.trigger("click"))
                }
            })
        },
        _enhance: function() {
            this.element.is("button") || this.element.attr("role", "button");
            this.options.icon && (this._updateIcon("icon", this.options.icon), this._updateTooltip())
        },
        _updateTooltip: function() {
            this.title = this.element.attr("title");
            this.options.showLabel || this.title || this.element.attr("title", this.options.label)
        },
        _updateIcon: function(t, i) {
            var u = "iconPosition" !== t,
                r = u ? this.options.iconPosition : i,
                f = "top" === r || "bottom" === r;
            this.icon ? u && this._removeClass(this.icon, null, this.options.icon) : (this.icon = n("<span>"), this._addClass(this.icon, "ui-button-icon", "ui-icon"), this.options.showLabel || this._addClass("ui-button-icon-only"));
            u && this._addClass(this.icon, null, i);
            this._attachIcon(r);
            f ? (this._addClass(this.icon, null, "ui-widget-icon-block"), this.iconSpace && this.iconSpace.remove()) : (this.iconSpace || (this.iconSpace = n("<span> <\/span>"), this._addClass(this.iconSpace, "ui-button-icon-space")), this._removeClass(this.icon, null, "ui-wiget-icon-block"), this._attachIconSpace(r))
        },
        _destroy: function() {
            this.element.removeAttr("role");
            this.icon && this.icon.remove();
            this.iconSpace && this.iconSpace.remove();
            this.hasTitle || this.element.removeAttr("title")
        },
        _attachIconSpace: function(n) {
            this.icon[/^(?:end|bottom)/.test(n) ? "before" : "after"](this.iconSpace)
        },
        _attachIcon: function(n) {
            this.element[/^(?:end|bottom)/.test(n) ? "append" : "prepend"](this.icon)
        },
        _setOptions: function(n) {
            var t = void 0 === n.showLabel ? this.options.showLabel : n.showLabel,
                i = void 0 === n.icon ? this.options.icon : n.icon;
            t || i || (n.showLabel = !0);
            this._super(n)
        },
        _setOption: function(n, t) {
            "icon" === n && (t ? this._updateIcon(n, t) : this.icon && (this.icon.remove(), this.iconSpace && this.iconSpace.remove()));
            "iconPosition" === n && this._updateIcon(n, t);
            "showLabel" === n && (this._toggleClass("ui-button-icon-only", null, !t), this._updateTooltip());
            "label" === n && (this.isInput ? this.element.val(t) : (this.element.html(t), this.icon && (this._attachIcon(this.options.iconPosition), this._attachIconSpace(this.options.iconPosition))));
            this._super(n, t);
            "disabled" === n && (this._toggleClass(null, "ui-state-disabled", t), this.element[0].disabled = t, t && this.element.blur())
        },
        refresh: function() {
            var n = this.element.is("input, button") ? this.element[0].disabled : this.element.hasClass("ui-button-disabled");
            n !== this.options.disabled && this._setOptions({
                disabled: n
            });
            this._updateTooltip()
        }
    });
    n.uiBackCompat !== !1 && (n.widget("ui.button", n.ui.button, {
        options: {
            text: !0,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function() {
            this.options.showLabel && !this.options.text && (this.options.showLabel = this.options.text);
            !this.options.showLabel && this.options.text && (this.options.text = this.options.showLabel);
            this.options.icon || !this.options.icons.primary && !this.options.icons.secondary ? this.options.icon && (this.options.icons.primary = this.options.icon) : this.options.icons.primary ? this.options.icon = this.options.icons.primary : (this.options.icon = this.options.icons.secondary, this.options.iconPosition = "end");
            this._super()
        },
        _setOption: function(n, t) {
            return "text" === n ? (this._super("showLabel", t), void 0) : ("showLabel" === n && (this.options.text = t), "icon" === n && (this.options.icons.primary = t), "icons" === n && (t.primary ? (this._super("icon", t.primary), this._super("iconPosition", "beginning")) : t.secondary && (this._super("icon", t.secondary), this._super("iconPosition", "end"))), this._superApply(arguments), void 0)
        }
    }), n.fn.button = function(t) {
        return function() {
            return !this.length || this.length && "INPUT" !== this[0].tagName || this.length && "INPUT" === this[0].tagName && "checkbox" !== this.attr("type") && "radio" !== this.attr("type") ? t.apply(this, arguments) : (n.ui.checkboxradio || n.error("Checkboxradio widget missing"), 0 === arguments.length ? this.checkboxradio({
                icon: !1
            }) : this.checkboxradio.apply(this, arguments))
        }
    }(n.fn.button), n.fn.buttonset = function() {
        return n.ui.controlgroup || n.error("Controlgroup widget missing"), "option" === arguments[0] && "items" === arguments[1] && arguments[2] ? this.controlgroup.apply(this, [arguments[0], "items.button", arguments[2]]) : "option" === arguments[0] && "items" === arguments[1] ? this.controlgroup.apply(this, [arguments[0], "items.button"]) : ("object" == typeof arguments[0] && arguments[0].items && (arguments[0].items = {
            button: arguments[0].items
        }), this.controlgroup.apply(this, arguments))
    });
    n.ui.button;
    n.extend(n.ui, {
        datepicker: {
            version: "1.12.1"
        }
    });
    n.extend(c.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(n) {
            return u(this._defaults, n || {}), this
        },
        _attachDatepicker: function(t, i) {
            var r, f, u;
            r = t.nodeName.toLowerCase();
            f = "div" === r || "span" === r;
            t.id || (this.uuid += 1, t.id = "dp" + this.uuid);
            u = this._newInst(n(t), f);
            u.settings = n.extend({}, i || {});
            "input" === r ? this._connectDatepicker(t, u) : f && this._inlineDatepicker(t, u)
        },
        _newInst: function(t, i) {
            var r = t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: r,
                input: t,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: i,
                dpDiv: i ? l(n("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'><\/div>")) : this.dpDiv
            }
        },
        _connectDatepicker: function(t, i) {
            var r = n(t);
            i.append = n([]);
            i.trigger = n([]);
            r.hasClass(this.markerClassName) || (this._attachments(r, i), r.addClass(this.markerClassName).on("keydown", this._doKeyDown).on("keypress", this._doKeyPress).on("keyup", this._doKeyUp), this._autoSize(i), n.data(t, "datepicker", i), i.settings.disabled && this._disableDatepicker(t))
        },
        _attachments: function(t, i) {
            var u, r, f, e = this._get(i, "appendText"),
                o = this._get(i, "isRTL");
            i.append && i.append.remove();
            e && (i.append = n("<span class='" + this._appendClass + "'>" + e + "<\/span>"), t[o ? "before" : "after"](i.append));
            t.off("focus", this._showDatepicker);
            i.trigger && i.trigger.remove();
            u = this._get(i, "showOn");
            ("focus" === u || "both" === u) && t.on("focus", this._showDatepicker);
            ("button" === u || "both" === u) && (r = this._get(i, "buttonText"), f = this._get(i, "buttonImage"), i.trigger = n(this._get(i, "buttonImageOnly") ? n("<img/>").addClass(this._triggerClass).attr({
                src: f,
                alt: r,
                title: r
            }) : n("<button type='button'><\/button>").addClass(this._triggerClass).html(f ? n("<img/>").attr({
                src: f,
                alt: r,
                title: r
            }) : r)), t[o ? "before" : "after"](i.trigger), i.trigger.on("click", function() {
                return n.datepicker._datepickerShowing && n.datepicker._lastInput === t[0] ? n.datepicker._hideDatepicker() : n.datepicker._datepickerShowing && n.datepicker._lastInput !== t[0] ? (n.datepicker._hideDatepicker(), n.datepicker._showDatepicker(t[0])) : n.datepicker._showDatepicker(t[0]), !1
            }))
        },
        _autoSize: function(n) {
            if (this._get(n, "autoSize") && !n.inline) {
                var r, u, f, t, i = new Date(2009, 11, 20),
                    e = this._get(n, "dateFormat");
                e.match(/[DM]/) && (r = function(n) {
                    for (u = 0, f = 0, t = 0; n.length > t; t++) n[t].length > u && (u = n[t].length, f = t);
                    return f
                }, i.setMonth(r(this._get(n, e.match(/MM/) ? "monthNames" : "monthNamesShort"))), i.setDate(r(this._get(n, e.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - i.getDay()));
                n.input.attr("size", this._formatDate(n, i).length)
            }
        },
        _inlineDatepicker: function(t, i) {
            var r = n(t);
            r.hasClass(this.markerClassName) || (r.addClass(this.markerClassName).append(i.dpDiv), n.data(t, "datepicker", i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(t), i.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function(t, i, r, f, e) {
            var s, h, c, l, a, o = this._dialogInst;
            return o || (this.uuid += 1, s = "dp" + this.uuid, this._dialogInput = n("<input type='text' id='" + s + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.on("keydown", this._doKeyDown), n("body").append(this._dialogInput), o = this._dialogInst = this._newInst(this._dialogInput, !1), o.settings = {}, n.data(this._dialogInput[0], "datepicker", o)), u(o.settings, f || {}), i = i && i.constructor === Date ? this._formatDate(o, i) : i, this._dialogInput.val(i), this._pos = e ? e.length ? e : [e.pageX, e.pageY] : null, this._pos || (h = document.documentElement.clientWidth, c = document.documentElement.clientHeight, l = document.documentElement.scrollLeft || document.body.scrollLeft, a = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [h / 2 - 100 + l, c / 2 - 150 + a]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), o.settings.onSelect = r, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), n.blockUI && n.blockUI(this.dpDiv), n.data(this._dialogInput[0], "datepicker", o), this
        },
        _destroyDatepicker: function(t) {
            var r, u = n(t),
                f = n.data(t, "datepicker");
            u.hasClass(this.markerClassName) && (r = t.nodeName.toLowerCase(), n.removeData(t, "datepicker"), "input" === r ? (f.append.remove(), f.trigger.remove(), u.removeClass(this.markerClassName).off("focus", this._showDatepicker).off("keydown", this._doKeyDown).off("keypress", this._doKeyPress).off("keyup", this._doKeyUp)) : ("div" === r || "span" === r) && u.removeClass(this.markerClassName).empty(), i === f && (i = null))
        },
        _enableDatepicker: function(t) {
            var i, r, u = n(t),
                f = n.data(t, "datepicker");
            u.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), "input" === i ? (t.disabled = !1, f.trigger.filter("button").each(function() {
                this.disabled = !1
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : ("div" === i || "span" === i) && (r = u.children("." + this._inlineClass), r.children().removeClass("ui-state-disabled"), r.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = n.map(this._disabledInputs, function(n) {
                return n === t ? null : n
            }))
        },
        _disableDatepicker: function(t) {
            var i, r, u = n(t),
                f = n.data(t, "datepicker");
            u.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), "input" === i ? (t.disabled = !0, f.trigger.filter("button").each(function() {
                this.disabled = !0
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : ("div" === i || "span" === i) && (r = u.children("." + this._inlineClass), r.children().addClass("ui-state-disabled"), r.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = n.map(this._disabledInputs, function(n) {
                return n === t ? null : n
            }), this._disabledInputs[this._disabledInputs.length] = t)
        },
        _isDisabledDatepicker: function(n) {
            if (!n) return !1;
            for (var t = 0; this._disabledInputs.length > t; t++)
                if (this._disabledInputs[t] === n) return !0;
            return !1
        },
        _getInst: function(t) {
            try {
                return n.data(t, "datepicker")
            } catch (i) {
                throw "Missing instance data for this datepicker";
            }
        },
        _optionDatepicker: function(t, i, r) {
            var e, h, o, s, f = this._getInst(t);
            return 2 === arguments.length && "string" == typeof i ? "defaults" === i ? n.extend({}, n.datepicker._defaults) : f ? "all" === i ? n.extend({}, f.settings) : this._get(f, i) : null : (e = i || {}, "string" == typeof i && (e = {}, e[i] = r), f && (this._curInst === f && this._hideDatepicker(), h = this._getDateDatepicker(t, !0), o = this._getMinMaxDate(f, "min"), s = this._getMinMaxDate(f, "max"), u(f.settings, e), null !== o && void 0 !== e.dateFormat && void 0 === e.minDate && (f.settings.minDate = this._formatDate(f, o)), null !== s && void 0 !== e.dateFormat && void 0 === e.maxDate && (f.settings.maxDate = this._formatDate(f, s)), "disabled" in e && (e.disabled ? this._disableDatepicker(t) : this._enableDatepicker(t)), this._attachments(n(t), f), this._autoSize(f), this._setDate(f, h), this._updateAlternate(f), this._updateDatepicker(f)), void 0)
        },
        _changeDatepicker: function(n, t, i) {
            this._optionDatepicker(n, t, i)
        },
        _refreshDatepicker: function(n) {
            var t = this._getInst(n);
            t && this._updateDatepicker(t)
        },
        _setDateDatepicker: function(n, t) {
            var i = this._getInst(n);
            i && (this._setDate(i, t), this._updateDatepicker(i), this._updateAlternate(i))
        },
        _getDateDatepicker: function(n, t) {
            var i = this._getInst(n);
            return i && !i.inline && this._setDateFromField(i, t), i ? this._getDate(i) : null
        },
        _doKeyDown: function(t) {
            var u, e, f, i = n.datepicker._getInst(t.target),
                r = !0,
                o = i.dpDiv.is(".ui-datepicker-rtl");
            if (i._keyEvent = !0, n.datepicker._datepickerShowing) switch (t.keyCode) {
                case 9:
                    n.datepicker._hideDatepicker();
                    r = !1;
                    break;
                case 13:
                    return f = n("td." + n.datepicker._dayOverClass + ":not(." + n.datepicker._currentClass + ")", i.dpDiv), f[0] && n.datepicker._selectDay(t.target, i.selectedMonth, i.selectedYear, f[0]), u = n.datepicker._get(i, "onSelect"), u ? (e = n.datepicker._formatDate(i), u.apply(i.input ? i.input[0] : null, [e, i])) : n.datepicker._hideDatepicker(), !1;
                case 27:
                    n.datepicker._hideDatepicker();
                    break;
                case 33:
                    n.datepicker._adjustDate(t.target, t.ctrlKey ? -n.datepicker._get(i, "stepBigMonths") : -n.datepicker._get(i, "stepMonths"), "M");
                    break;
                case 34:
                    n.datepicker._adjustDate(t.target, t.ctrlKey ? +n.datepicker._get(i, "stepBigMonths") : +n.datepicker._get(i, "stepMonths"), "M");
                    break;
                case 35:
                    (t.ctrlKey || t.metaKey) && n.datepicker._clearDate(t.target);
                    r = t.ctrlKey || t.metaKey;
                    break;
                case 36:
                    (t.ctrlKey || t.metaKey) && n.datepicker._gotoToday(t.target);
                    r = t.ctrlKey || t.metaKey;
                    break;
                case 37:
                    (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, o ? 1 : -1, "D");
                    r = t.ctrlKey || t.metaKey;
                    t.originalEvent.altKey && n.datepicker._adjustDate(t.target, t.ctrlKey ? -n.datepicker._get(i, "stepBigMonths") : -n.datepicker._get(i, "stepMonths"), "M");
                    break;
                case 38:
                    (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, -7, "D");
                    r = t.ctrlKey || t.metaKey;
                    break;
                case 39:
                    (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, o ? -1 : 1, "D");
                    r = t.ctrlKey || t.metaKey;
                    t.originalEvent.altKey && n.datepicker._adjustDate(t.target, t.ctrlKey ? +n.datepicker._get(i, "stepBigMonths") : +n.datepicker._get(i, "stepMonths"), "M");
                    break;
                case 40:
                    (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, 7, "D");
                    r = t.ctrlKey || t.metaKey;
                    break;
                default:
                    r = !1
            } else 36 === t.keyCode && t.ctrlKey ? n.datepicker._showDatepicker(this) : r = !1;
            r && (t.preventDefault(), t.stopPropagation())
        },
        _doKeyPress: function(t) {
            var i, r, u = n.datepicker._getInst(t.target);
            if (n.datepicker._get(u, "constrainInput")) return (i = n.datepicker._possibleChars(n.datepicker._get(u, "dateFormat")), r = String.fromCharCode(null == t.charCode ? t.keyCode : t.charCode), t.ctrlKey || t.metaKey || " " > r || !i || i.indexOf(r) > -1)
        },
        _doKeyUp: function(t) {
            var r, i = n.datepicker._getInst(t.target);
            if (i.input.val() !== i.lastVal) try {
                r = n.datepicker.parseDate(n.datepicker._get(i, "dateFormat"), i.input ? i.input.val() : null, n.datepicker._getFormatConfig(i));
                r && (n.datepicker._setDateFromField(i), n.datepicker._updateAlternate(i), n.datepicker._updateDatepicker(i))
            } catch (u) {}
            return !0
        },
        _showDatepicker: function(t) {
            if (t = t.target || t, "input" !== t.nodeName.toLowerCase() && (t = n("input", t.parentNode)[0]), !n.datepicker._isDisabledDatepicker(t) && n.datepicker._lastInput !== t) {
                var i, o, s, r, f, e, h;
                i = n.datepicker._getInst(t);
                n.datepicker._curInst && n.datepicker._curInst !== i && (n.datepicker._curInst.dpDiv.stop(!0, !0), i && n.datepicker._datepickerShowing && n.datepicker._hideDatepicker(n.datepicker._curInst.input[0]));
                o = n.datepicker._get(i, "beforeShow");
                s = o ? o.apply(t, [t, i]) : {};
                s !== !1 && (u(i.settings, s), i.lastVal = null, n.datepicker._lastInput = t, n.datepicker._setDateFromField(i), n.datepicker._inDialog && (t.value = ""), n.datepicker._pos || (n.datepicker._pos = n.datepicker._findPos(t), n.datepicker._pos[1] += t.offsetHeight), r = !1, n(t).parents().each(function() {
                    return r |= "fixed" === n(this).css("position"), !r
                }), f = {
                    left: n.datepicker._pos[0],
                    top: n.datepicker._pos[1]
                }, n.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                }), n.datepicker._updateDatepicker(i), f = n.datepicker._checkOffset(i, f, r), i.dpDiv.css({
                    position: n.datepicker._inDialog && n.blockUI ? "static" : r ? "fixed" : "absolute",
                    display: "none",
                    left: f.left + "px",
                    top: f.top + "px"
                }), i.inline || (e = n.datepicker._get(i, "showAnim"), h = n.datepicker._get(i, "duration"), i.dpDiv.css("z-index", k(n(t)) + 1), n.datepicker._datepickerShowing = !0, n.effects && n.effects.effect[e] ? i.dpDiv.show(e, n.datepicker._get(i, "showOptions"), h) : i.dpDiv[e || "show"](e ? h : null), n.datepicker._shouldFocusInput(i) && i.input.trigger("focus"), n.datepicker._curInst = i))
            }
        },
        _updateDatepicker: function(t) {
            this.maxRows = 4;
            i = t;
            t.dpDiv.empty().append(this._generateHTML(t));
            this._attachHandlers(t);
            var r, u = this._getNumberOfMonths(t),
                f = u[1],
                e = t.dpDiv.find("." + this._dayOverClass + " a");
            e.length > 0 && a.apply(e.get(0));
            t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
            f > 1 && t.dpDiv.addClass("ui-datepicker-multi-" + f).css("width", 17 * f + "em");
            t.dpDiv[(1 !== u[0] || 1 !== u[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi");
            t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
            t === n.datepicker._curInst && n.datepicker._datepickerShowing && n.datepicker._shouldFocusInput(t) && t.input.trigger("focus");
            t.yearshtml && (r = t.yearshtml, setTimeout(function() {
                r === t.yearshtml && t.yearshtml && t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml);
                r = t.yearshtml = null
            }, 0))
        },
        _shouldFocusInput: function(n) {
            return n.input && n.input.is(":visible") && !n.input.is(":disabled") && !n.input.is(":focus")
        },
        _checkOffset: function(t, i, r) {
            var u = t.dpDiv.outerWidth(),
                f = t.dpDiv.outerHeight(),
                h = t.input ? t.input.outerWidth() : 0,
                o = t.input ? t.input.outerHeight() : 0,
                e = document.documentElement.clientWidth + (r ? 0 : n(document).scrollLeft()),
                s = document.documentElement.clientHeight + (r ? 0 : n(document).scrollTop());
            return i.left -= this._get(t, "isRTL") ? u - h : 0, i.left -= r && i.left === t.input.offset().left ? n(document).scrollLeft() : 0, i.top -= r && i.top === t.input.offset().top + o ? n(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + u > e && e > u ? Math.abs(i.left + u - e) : 0), i.top -= Math.min(i.top, i.top + f > s && s > f ? Math.abs(f + o) : 0), i
        },
        _findPos: function(t) {
            for (var i, r = this._getInst(t), u = this._get(r, "isRTL"); t && ("hidden" === t.type || 1 !== t.nodeType || n.expr.filters.hidden(t));) t = t[u ? "previousSibling" : "nextSibling"];
            return i = n(t).offset(), [i.left, i.top]
        },
        _hideDatepicker: function(t) {
            var r, f, u, e, i = this._curInst;
            !i || t && i !== n.data(t, "datepicker") || this._datepickerShowing && (r = this._get(i, "showAnim"), f = this._get(i, "duration"), u = function() {
                n.datepicker._tidyDialog(i)
            }, n.effects && (n.effects.effect[r] || n.effects[r]) ? i.dpDiv.hide(r, n.datepicker._get(i, "showOptions"), f, u) : i.dpDiv["slideDown" === r ? "slideUp" : "fadeIn" === r ? "fadeOut" : "hide"](r ? f : null, u), r || u(), this._datepickerShowing = !1, e = this._get(i, "onClose"), e && e.apply(i.input ? i.input[0] : null, [i.input ? i.input.val() : "", i]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }), n.blockUI && (n.unblockUI(), n("body").append(this.dpDiv))), this._inDialog = !1)
        },
        _tidyDialog: function(n) {
            n.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(t) {
            if (n.datepicker._curInst) {
                var i = n(t.target),
                    r = n.datepicker._getInst(i[0]);
                (i[0].id === n.datepicker._mainDivId || 0 !== i.parents("#" + n.datepicker._mainDivId).length || i.hasClass(n.datepicker.markerClassName) || i.closest("." + n.datepicker._triggerClass).length || !n.datepicker._datepickerShowing || n.datepicker._inDialog && n.blockUI) && (!i.hasClass(n.datepicker.markerClassName) || n.datepicker._curInst === r) || n.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function(t, i, r) {
            var f = n(t),
                u = this._getInst(f[0]);
            this._isDisabledDatepicker(f[0]) || (this._adjustInstDate(u, i + ("M" === r ? this._get(u, "showCurrentAtPos") : 0), r), this._updateDatepicker(u))
        },
        _gotoToday: function(t) {
            var r, u = n(t),
                i = this._getInst(u[0]);
            this._get(i, "gotoCurrent") && i.currentDay ? (i.selectedDay = i.currentDay, i.drawMonth = i.selectedMonth = i.currentMonth, i.drawYear = i.selectedYear = i.currentYear) : (r = new Date, i.selectedDay = r.getDate(), i.drawMonth = i.selectedMonth = r.getMonth(), i.drawYear = i.selectedYear = r.getFullYear());
            this._notifyChange(i);
            this._adjustDate(u)
        },
        _selectMonthYear: function(t, i, r) {
            var f = n(t),
                u = this._getInst(f[0]);
            u["selected" + ("M" === r ? "Month" : "Year")] = u["draw" + ("M" === r ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10);
            this._notifyChange(u);
            this._adjustDate(f)
        },
        _selectDay: function(t, i, r, u) {
            var f, e = n(t);
            n(u).hasClass(this._unselectableClass) || this._isDisabledDatepicker(e[0]) || (f = this._getInst(e[0]), f.selectedDay = f.currentDay = n("a", u).html(), f.selectedMonth = f.currentMonth = i, f.selectedYear = f.currentYear = r, this._selectDate(t, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear)))
        },
        _clearDate: function(t) {
            var i = n(t);
            this._selectDate(i, "")
        },
        _selectDate: function(t, i) {
            var u, f = n(t),
                r = this._getInst(f[0]);
            i = null != i ? i : this._formatDate(r);
            r.input && r.input.val(i);
            this._updateAlternate(r);
            u = this._get(r, "onSelect");
            u ? u.apply(r.input ? r.input[0] : null, [i, r]) : r.input && r.input.trigger("change");
            r.inline ? this._updateDatepicker(r) : (this._hideDatepicker(), this._lastInput = r.input[0], "object" != typeof r.input[0] && r.input.trigger("focus"), this._lastInput = null)
        },
        _updateAlternate: function(t) {
            var i, r, u, f = this._get(t, "altField");
            f && (i = this._get(t, "altFormat") || this._get(t, "dateFormat"), r = this._getDate(t), u = this.formatDate(i, r, this._getFormatConfig(t)), n(f).val(u))
        },
        noWeekends: function(n) {
            var t = n.getDay();
            return [t > 0 && 6 > t, ""]
        },
        iso8601Week: function(n) {
            var i, t = new Date(n.getTime());
            return t.setDate(t.getDate() + 4 - (t.getDay() || 7)), i = t.getTime(), t.setMonth(0), t.setDate(1), Math.floor(Math.round((i - t) / 864e5) / 7) + 1
        },
        parseDate: function(t, i, r) {
            if (null == t || null == i) throw "Invalid arguments";
            if (i = "object" == typeof i ? "" + i : i + "", "" === i) return null;
            for (var a, v, u, f = 0, y = (r ? r.shortYearCutoff : null) || this._defaults.shortYearCutoff, d = "string" != typeof y ? y : (new Date).getFullYear() % 100 + parseInt(y, 10), g = (r ? r.dayNamesShort : null) || this._defaults.dayNamesShort, nt = (r ? r.dayNames : null) || this._defaults.dayNames, tt = (r ? r.monthNamesShort : null) || this._defaults.monthNamesShort, it = (r ? r.monthNames : null) || this._defaults.monthNames, e = -1, s = -1, h = -1, p = -1, w = !1, l = function(n) {
                    var i = t.length > o + 1 && t.charAt(o + 1) === n;
                    return i && o++, i
                }, c = function(n) {
                    var u = l(n),
                        r = "@" === n ? 14 : "!" === n ? 20 : "y" === n && u ? 4 : "o" === n ? 3 : 2,
                        e = "y" === n ? r : 1,
                        o = RegExp("^\\d{" + e + "," + r + "}"),
                        t = i.substring(f).match(o);
                    if (!t) throw "Missing number at position " + f;
                    return f += t[0].length, parseInt(t[0], 10)
                }, k = function(t, r, u) {
                    var e = -1,
                        o = n.map(l(t) ? u : r, function(n, t) {
                            return [
                                [t, n]
                            ]
                        }).sort(function(n, t) {
                            return -(n[1].length - t[1].length)
                        });
                    if (n.each(o, function(n, t) {
                            var r = t[1];
                            if (i.substr(f, r.length).toLowerCase() === r.toLowerCase()) return (e = t[0], f += r.length, !1)
                        }), -1 !== e) return e + 1;
                    throw "Unknown name at position " + f;
                }, b = function() {
                    if (i.charAt(f) !== t.charAt(o)) throw "Unexpected literal at position " + f;
                    f++
                }, o = 0; t.length > o; o++)
                if (w) "'" !== t.charAt(o) || l("'") ? b() : w = !1;
                else switch (t.charAt(o)) {
                    case "d":
                        h = c("d");
                        break;
                    case "D":
                        k("D", g, nt);
                        break;
                    case "o":
                        p = c("o");
                        break;
                    case "m":
                        s = c("m");
                        break;
                    case "M":
                        s = k("M", tt, it);
                        break;
                    case "y":
                        e = c("y");
                        break;
                    case "@":
                        u = new Date(c("@"));
                        e = u.getFullYear();
                        s = u.getMonth() + 1;
                        h = u.getDate();
                        break;
                    case "!":
                        u = new Date((c("!") - this._ticksTo1970) / 1e4);
                        e = u.getFullYear();
                        s = u.getMonth() + 1;
                        h = u.getDate();
                        break;
                    case "'":
                        l("'") ? b() : w = !0;
                        break;
                    default:
                        b()
                }
            if (i.length > f && (v = i.substr(f), !/^\s+/.test(v))) throw "Extra/unparsed characters found in date: " + v;
            if (-1 === e ? e = (new Date).getFullYear() : 100 > e && (e += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (d >= e ? 0 : -100)), p > -1)
                for (s = 1, h = p;;) {
                    if (a = this._getDaysInMonth(e, s - 1), a >= h) break;
                    s++;
                    h -= a
                }
            if (u = this._daylightSavingAdjust(new Date(e, s - 1, h)), u.getFullYear() !== e || u.getMonth() + 1 !== s || u.getDate() !== h) throw "Invalid date";
            return u
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 864e9 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
        formatDate: function(n, t, i) {
            if (!t) return "";
            var u, h = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                c = (i ? i.dayNames : null) || this._defaults.dayNames,
                l = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                a = (i ? i.monthNames : null) || this._defaults.monthNames,
                f = function(t) {
                    var i = n.length > u + 1 && n.charAt(u + 1) === t;
                    return i && u++, i
                },
                e = function(n, t, i) {
                    var r = "" + t;
                    if (f(n))
                        for (; i > r.length;) r = "0" + r;
                    return r
                },
                s = function(n, t, i, r) {
                    return f(n) ? r[t] : i[t]
                },
                r = "",
                o = !1;
            if (t)
                for (u = 0; n.length > u; u++)
                    if (o) "'" !== n.charAt(u) || f("'") ? r += n.charAt(u) : o = !1;
                    else switch (n.charAt(u)) {
                        case "d":
                            r += e("d", t.getDate(), 2);
                            break;
                        case "D":
                            r += s("D", t.getDay(), h, c);
                            break;
                        case "o":
                            r += e("o", Math.round((new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() - new Date(t.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                            break;
                        case "m":
                            r += e("m", t.getMonth() + 1, 2);
                            break;
                        case "M":
                            r += s("M", t.getMonth(), l, a);
                            break;
                        case "y":
                            r += f("y") ? t.getFullYear() : (10 > t.getFullYear() % 100 ? "0" : "") + t.getFullYear() % 100;
                            break;
                        case "@":
                            r += t.getTime();
                            break;
                        case "!":
                            r += 1e4 * t.getTime() + this._ticksTo1970;
                            break;
                        case "'":
                            f("'") ? r += "'" : o = !0;
                            break;
                        default:
                            r += n.charAt(u)
                    }
            return r
        },
        _possibleChars: function(n) {
            for (var i = "", r = !1, u = function(i) {
                    var r = n.length > t + 1 && n.charAt(t + 1) === i;
                    return r && t++, r
                }, t = 0; n.length > t; t++)
                if (r) "'" !== n.charAt(t) || u("'") ? i += n.charAt(t) : r = !1;
                else switch (n.charAt(t)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        i += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        u("'") ? i += "'" : r = !0;
                        break;
                    default:
                        i += n.charAt(t)
                }
            return i
        },
        _get: function(n, t) {
            return void 0 !== n.settings[t] ? n.settings[t] : this._defaults[t]
        },
        _setDateFromField: function(n, t) {
            if (n.input.val() !== n.lastVal) {
                var f = this._get(n, "dateFormat"),
                    r = n.lastVal = n.input ? n.input.val() : null,
                    u = this._getDefaultDate(n),
                    i = u,
                    e = this._getFormatConfig(n);
                try {
                    i = this.parseDate(f, r, e) || u
                } catch (o) {
                    r = t ? "" : r
                }
                n.selectedDay = i.getDate();
                n.drawMonth = n.selectedMonth = i.getMonth();
                n.drawYear = n.selectedYear = i.getFullYear();
                n.currentDay = r ? i.getDate() : 0;
                n.currentMonth = r ? i.getMonth() : 0;
                n.currentYear = r ? i.getFullYear() : 0;
                this._adjustInstDate(n)
            }
        },
        _getDefaultDate: function(n) {
            return this._restrictMinMax(n, this._determineDate(n, this._get(n, "defaultDate"), new Date))
        },
        _determineDate: function(t, i, r) {
            var f = function(n) {
                    var t = new Date;
                    return t.setDate(t.getDate() + n), t
                },
                e = function(i) {
                    try {
                        return n.datepicker.parseDate(n.datepicker._get(t, "dateFormat"), i, n.datepicker._getFormatConfig(t))
                    } catch (h) {}
                    for (var o = (i.toLowerCase().match(/^c/) ? n.datepicker._getDate(t) : null) || new Date, f = o.getFullYear(), e = o.getMonth(), r = o.getDate(), s = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, u = s.exec(i); u;) {
                        switch (u[2] || "d") {
                            case "d":
                            case "D":
                                r += parseInt(u[1], 10);
                                break;
                            case "w":
                            case "W":
                                r += 7 * parseInt(u[1], 10);
                                break;
                            case "m":
                            case "M":
                                e += parseInt(u[1], 10);
                                r = Math.min(r, n.datepicker._getDaysInMonth(f, e));
                                break;
                            case "y":
                            case "Y":
                                f += parseInt(u[1], 10);
                                r = Math.min(r, n.datepicker._getDaysInMonth(f, e))
                        }
                        u = s.exec(i)
                    }
                    return new Date(f, e, r)
                },
                u = null == i || "" === i ? r : "string" == typeof i ? e(i) : "number" == typeof i ? isNaN(i) ? r : f(i) : new Date(i.getTime());
            return u = u && "Invalid Date" == "" + u ? r : u, u && (u.setHours(0), u.setMinutes(0), u.setSeconds(0), u.setMilliseconds(0)), this._daylightSavingAdjust(u)
        },
        _daylightSavingAdjust: function(n) {
            return n ? (n.setHours(n.getHours() > 12 ? n.getHours() + 2 : 0), n) : null
        },
        _setDate: function(n, t, i) {
            var u = !t,
                f = n.selectedMonth,
                e = n.selectedYear,
                r = this._restrictMinMax(n, this._determineDate(n, t, new Date));
            n.selectedDay = n.currentDay = r.getDate();
            n.drawMonth = n.selectedMonth = n.currentMonth = r.getMonth();
            n.drawYear = n.selectedYear = n.currentYear = r.getFullYear();
            f === n.selectedMonth && e === n.selectedYear || i || this._notifyChange(n);
            this._adjustInstDate(n);
            n.input && n.input.val(u ? "" : this._formatDate(n))
        },
        _getDate: function(n) {
            return !n.currentYear || n.input && "" === n.input.val() ? null : this._daylightSavingAdjust(new Date(n.currentYear, n.currentMonth, n.currentDay))
        },
        _attachHandlers: function(t) {
            var r = this._get(t, "stepMonths"),
                i = "#" + t.id.replace(/\\\\/g, "\\");
            t.dpDiv.find("[data-handler]").map(function() {
                var t = {
                    prev: function() {
                        n.datepicker._adjustDate(i, -r, "M")
                    },
                    next: function() {
                        n.datepicker._adjustDate(i, +r, "M")
                    },
                    hide: function() {
                        n.datepicker._hideDatepicker()
                    },
                    today: function() {
                        n.datepicker._gotoToday(i)
                    },
                    selectDay: function() {
                        return n.datepicker._selectDay(i, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                    },
                    selectMonth: function() {
                        return n.datepicker._selectMonthYear(i, this, "M"), !1
                    },
                    selectYear: function() {
                        return n.datepicker._selectMonthYear(i, this, "Y"), !1
                    }
                };
                n(this).on(this.getAttribute("data-event"), t[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function(n) {
            var b, s, rt, h, ut, k, ft, et, ri, c, ot, ui, fi, ei, oi, st, g, si, ht, nt, o, y, ct, p, lt, l, u, at, vt, yt, pt, tt, wt, i, bt, kt, d, a, it, dt = new Date,
                gt = this._daylightSavingAdjust(new Date(dt.getFullYear(), dt.getMonth(), dt.getDate())),
                f = this._get(n, "isRTL"),
                li = this._get(n, "showButtonPanel"),
                hi = this._get(n, "hideIfNoPrevNext"),
                ni = this._get(n, "navigationAsDateFormat"),
                e = this._getNumberOfMonths(n),
                ai = this._get(n, "showCurrentAtPos"),
                ci = this._get(n, "stepMonths"),
                ti = 1 !== e[0] || 1 !== e[1],
                ii = this._daylightSavingAdjust(n.currentDay ? new Date(n.currentYear, n.currentMonth, n.currentDay) : new Date(9999, 9, 9)),
                w = this._getMinMaxDate(n, "min"),
                v = this._getMinMaxDate(n, "max"),
                t = n.drawMonth - ai,
                r = n.drawYear;
            if (0 > t && (t += 12, r--), v)
                for (b = this._daylightSavingAdjust(new Date(v.getFullYear(), v.getMonth() - e[0] * e[1] + 1, v.getDate())), b = w && w > b ? w : b; this._daylightSavingAdjust(new Date(r, t, 1)) > b;) t--, 0 > t && (t = 11, r--);
            for (n.drawMonth = t, n.drawYear = r, s = this._get(n, "prevText"), s = ni ? this.formatDate(s, this._daylightSavingAdjust(new Date(r, t - ci, 1)), this._getFormatConfig(n)) : s, rt = this._canAdjustMonth(n, -1, r, t) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "e" : "w") + "'>" + s + "<\/span><\/a>" : hi ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "e" : "w") + "'>" + s + "<\/span><\/a>", h = this._get(n, "nextText"), h = ni ? this.formatDate(h, this._daylightSavingAdjust(new Date(r, t + ci, 1)), this._getFormatConfig(n)) : h, ut = this._canAdjustMonth(n, 1, r, t) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + h + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "w" : "e") + "'>" + h + "<\/span><\/a>" : hi ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + h + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "w" : "e") + "'>" + h + "<\/span><\/a>", k = this._get(n, "currentText"), ft = this._get(n, "gotoCurrent") && n.currentDay ? ii : gt, k = ni ? this.formatDate(k, ft, this._getFormatConfig(n)) : k, et = n.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(n, "closeText") + "<\/button>", ri = li ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (f ? et : "") + (this._isInRange(n, ft) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + k + "<\/button>" : "") + (f ? "" : et) + "<\/div>" : "", c = parseInt(this._get(n, "firstDay"), 10), c = isNaN(c) ? 0 : c, ot = this._get(n, "showWeek"), ui = this._get(n, "dayNames"), fi = this._get(n, "dayNamesMin"), ei = this._get(n, "monthNames"), oi = this._get(n, "monthNamesShort"), st = this._get(n, "beforeShowDay"), g = this._get(n, "showOtherMonths"), si = this._get(n, "selectOtherMonths"), ht = this._getDefaultDate(n), nt = "", y = 0; e[0] > y; y++) {
                for (ct = "", this.maxRows = 4, p = 0; e[1] > p; p++) {
                    if (lt = this._daylightSavingAdjust(new Date(r, t, n.selectedDay)), l = " ui-corner-all", u = "", ti) {
                        if (u += "<div class='ui-datepicker-group", e[1] > 1) switch (p) {
                            case 0:
                                u += " ui-datepicker-group-first";
                                l = " ui-corner-" + (f ? "right" : "left");
                                break;
                            case e[1] - 1:
                                u += " ui-datepicker-group-last";
                                l = " ui-corner-" + (f ? "left" : "right");
                                break;
                            default:
                                u += " ui-datepicker-group-middle";
                                l = ""
                        }
                        u += "'>"
                    }
                    for (u += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + l + "'>" + (/all|left/.test(l) && 0 === y ? f ? ut : rt : "") + (/all|right/.test(l) && 0 === y ? f ? rt : ut : "") + this._generateMonthYearHeader(n, t, r, w, v, y > 0 || p > 0, ei, oi) + "<\/div><table class='ui-datepicker-calendar'><thead><tr>", at = ot ? "<th class='ui-datepicker-week-col'>" + this._get(n, "weekHeader") + "<\/th>" : "", o = 0; 7 > o; o++) vt = (o + c) % 7, at += "<th scope='col'" + ((o + c + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + ui[vt] + "'>" + fi[vt] + "<\/span><\/th>";
                    for (u += at + "<\/tr><\/thead><tbody>", yt = this._getDaysInMonth(r, t), r === n.selectedYear && t === n.selectedMonth && (n.selectedDay = Math.min(n.selectedDay, yt)), pt = (this._getFirstDayOfMonth(r, t) - c + 7) % 7, tt = Math.ceil((pt + yt) / 7), wt = ti ? this.maxRows > tt ? this.maxRows : tt : tt, this.maxRows = wt, i = this._daylightSavingAdjust(new Date(r, t, 1 - pt)), bt = 0; wt > bt; bt++) {
                        for (u += "<tr>", kt = ot ? "<td class='ui-datepicker-week-col'>" + this._get(n, "calculateWeek")(i) + "<\/td>" : "", o = 0; 7 > o; o++) d = st ? st.apply(n.input ? n.input[0] : null, [i]) : [!0, ""], a = i.getMonth() !== t, it = a && !si || !d[0] || w && w > i || v && i > v, kt += "<td class='" + ((o + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (a ? " ui-datepicker-other-month" : "") + (i.getTime() === lt.getTime() && t === n.selectedMonth && n._keyEvent || ht.getTime() === i.getTime() && ht.getTime() === lt.getTime() ? " " + this._dayOverClass : "") + (it ? " " + this._unselectableClass + " ui-state-disabled" : "") + (a && !g ? "" : " " + d[1] + (i.getTime() === ii.getTime() ? " " + this._currentClass : "") + (i.getTime() === gt.getTime() ? " ui-datepicker-today" : "")) + "'" + (a && !g || !d[2] ? "" : " title='" + d[2].replace(/'/g, "&#39;") + "'") + (it ? "" : " data-handler='selectDay' data-event='click' data-month='" + i.getMonth() + "' data-year='" + i.getFullYear() + "'") + ">" + (a && !g ? "&#xa0;" : it ? "<span class='ui-state-default'>" + i.getDate() + "<\/span>" : "<a class='ui-state-default" + (i.getTime() === gt.getTime() ? " ui-state-highlight" : "") + (i.getTime() === ii.getTime() ? " ui-state-active" : "") + (a ? " ui-priority-secondary" : "") + "' href='#'>" + i.getDate() + "<\/a>") + "<\/td>", i.setDate(i.getDate() + 1), i = this._daylightSavingAdjust(i);
                        u += kt + "<\/tr>"
                    }
                    t++;
                    t > 11 && (t = 0, r++);
                    u += "<\/tbody><\/table>" + (ti ? "<\/div>" + (e[0] > 0 && p === e[1] - 1 ? "<div class='ui-datepicker-row-break'><\/div>" : "") : "");
                    ct += u
                }
                nt += ct
            }
            return nt += ri, n._keyEvent = !1, nt
        },
        _generateMonthYearHeader: function(n, t, i, r, u, f, e, o) {
            var k, d, h, v, y, p, s, a, w = this._get(n, "changeMonth"),
                b = this._get(n, "changeYear"),
                g = this._get(n, "showMonthAfterYear"),
                c = "<div class='ui-datepicker-title'>",
                l = "";
            if (f || !w) l += "<span class='ui-datepicker-month'>" + e[t] + "<\/span>";
            else {
                for (k = r && r.getFullYear() === i, d = u && u.getFullYear() === i, l += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", h = 0; 12 > h; h++)(!k || h >= r.getMonth()) && (!d || u.getMonth() >= h) && (l += "<option value='" + h + "'" + (h === t ? " selected='selected'" : "") + ">" + o[h] + "<\/option>");
                l += "<\/select>"
            }
            if (g || (c += l + (!f && w && b ? "" : "&#xa0;")), !n.yearshtml)
                if (n.yearshtml = "", f || !b) c += "<span class='ui-datepicker-year'>" + i + "<\/span>";
                else {
                    for (v = this._get(n, "yearRange").split(":"), y = (new Date).getFullYear(), p = function(n) {
                            var t = n.match(/c[+\-].*/) ? i + parseInt(n.substring(1), 10) : n.match(/[+\-].*/) ? y + parseInt(n, 10) : parseInt(n, 10);
                            return isNaN(t) ? y : t
                        }, s = p(v[0]), a = Math.max(s, p(v[1] || "")), s = r ? Math.max(s, r.getFullYear()) : s, a = u ? Math.min(a, u.getFullYear()) : a, n.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; a >= s; s++) n.yearshtml += "<option value='" + s + "'" + (s === i ? " selected='selected'" : "") + ">" + s + "<\/option>";
                    n.yearshtml += "<\/select>";
                    c += n.yearshtml;
                    n.yearshtml = null
                }
            return c += this._get(n, "yearSuffix"), g && (c += (!f && w && b ? "" : "&#xa0;") + l), c + "<\/div>"
        },
        _adjustInstDate: function(n, t, i) {
            var u = n.selectedYear + ("Y" === i ? t : 0),
                f = n.selectedMonth + ("M" === i ? t : 0),
                e = Math.min(n.selectedDay, this._getDaysInMonth(u, f)) + ("D" === i ? t : 0),
                r = this._restrictMinMax(n, this._daylightSavingAdjust(new Date(u, f, e)));
            n.selectedDay = r.getDate();
            n.drawMonth = n.selectedMonth = r.getMonth();
            n.drawYear = n.selectedYear = r.getFullYear();
            ("M" === i || "Y" === i) && this._notifyChange(n)
        },
        _restrictMinMax: function(n, t) {
            var i = this._getMinMaxDate(n, "min"),
                r = this._getMinMaxDate(n, "max"),
                u = i && i > t ? i : t;
            return r && u > r ? r : u
        },
        _notifyChange: function(n) {
            var t = this._get(n, "onChangeMonthYear");
            t && t.apply(n.input ? n.input[0] : null, [n.selectedYear, n.selectedMonth + 1, n])
        },
        _getNumberOfMonths: function(n) {
            var t = this._get(n, "numberOfMonths");
            return null == t ? [1, 1] : "number" == typeof t ? [1, t] : t
        },
        _getMinMaxDate: function(n, t) {
            return this._determineDate(n, this._get(n, t + "Date"), null)
        },
        _getDaysInMonth: function(n, t) {
            return 32 - this._daylightSavingAdjust(new Date(n, t, 32)).getDate()
        },
        _getFirstDayOfMonth: function(n, t) {
            return new Date(n, t, 1).getDay()
        },
        _canAdjustMonth: function(n, t, i, r) {
            var f = this._getNumberOfMonths(n),
                u = this._daylightSavingAdjust(new Date(i, r + (0 > t ? t : f[0] * f[1]), 1));
            return 0 > t && u.setDate(this._getDaysInMonth(u.getFullYear(), u.getMonth())), this._isInRange(n, u)
        },
        _isInRange: function(n, t) {
            var i, f, e = this._getMinMaxDate(n, "min"),
                o = this._getMinMaxDate(n, "max"),
                r = null,
                u = null,
                s = this._get(n, "yearRange");
            return s && (i = s.split(":"), f = (new Date).getFullYear(), r = parseInt(i[0], 10), u = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (r += f), i[1].match(/[+\-].*/) && (u += f)), (!e || t.getTime() >= e.getTime()) && (!o || t.getTime() <= o.getTime()) && (!r || t.getFullYear() >= r) && (!u || u >= t.getFullYear())
        },
        _getFormatConfig: function(n) {
            var t = this._get(n, "shortYearCutoff");
            return t = "string" != typeof t ? t : (new Date).getFullYear() % 100 + parseInt(t, 10), {
                shortYearCutoff: t,
                dayNamesShort: this._get(n, "dayNamesShort"),
                dayNames: this._get(n, "dayNames"),
                monthNamesShort: this._get(n, "monthNamesShort"),
                monthNames: this._get(n, "monthNames")
            }
        },
        _formatDate: function(n, t, i, r) {
            t || (n.currentDay = n.selectedDay, n.currentMonth = n.selectedMonth, n.currentYear = n.selectedYear);
            var u = t ? "object" == typeof t ? t : this._daylightSavingAdjust(new Date(r, i, t)) : this._daylightSavingAdjust(new Date(n.currentYear, n.currentMonth, n.currentDay));
            return this.formatDate(this._get(n, "dateFormat"), u, this._getFormatConfig(n))
        }
    });
    n.fn.datepicker = function(t) {
        if (!this.length) return this;
        n.datepicker.initialized || (n(document).on("mousedown", n.datepicker._checkExternalClick), n.datepicker.initialized = !0);
        0 === n("#" + n.datepicker._mainDivId).length && n("body").append(n.datepicker.dpDiv);
        var i = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof t || "isDisabled" !== t && "getDate" !== t && "widget" !== t ? "option" === t && 2 === arguments.length && "string" == typeof arguments[1] ? n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this[0]].concat(i)) : this.each(function() {
            "string" == typeof t ? n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this].concat(i)) : n.datepicker._attachDatepicker(this, t)
        }) : n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this[0]].concat(i))
    };
    n.datepicker = new c;
    n.datepicker.initialized = !1;
    n.datepicker.uuid = (new Date).getTime();
    n.datepicker.version = "1.12.1";
    n.datepicker;
    n.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    r = !1;
    n(document).on("mouseup", function() {
        r = !1
    });
    n.widget("ui.mouse", {
        version: "1.12.1",
        options: {
            cancel: "input, textarea, button, select, option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var t = this;
            this.element.on("mousedown." + this.widgetName, function(n) {
                return t._mouseDown(n)
            }).on("click." + this.widgetName, function(i) {
                if (!0 === n.data(i.target, t.widgetName + ".preventClickEvent")) return (n.removeData(i.target, t.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1)
            });
            this.started = !1
        },
        _mouseDestroy: function() {
            this.element.off("." + this.widgetName);
            this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(t) {
            if (!r) {
                this._mouseMoved = !1;
                this._mouseStarted && this._mouseUp(t);
                this._mouseDownEvent = t;
                var i = this,
                    u = 1 === t.which,
                    f = "string" == typeof this.options.cancel && t.target.nodeName ? n(t.target).closest(this.options.cancel).length : !1;
                return u && !f && this._mouseCapture(t) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    i.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(t) !== !1, !this._mouseStarted) ? (t.preventDefault(), !0) : (!0 === n.data(t.target, this.widgetName + ".preventClickEvent") && n.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(n) {
                    return i._mouseMove(n)
                }, this._mouseUpDelegate = function(n) {
                    return i._mouseUp(n)
                }, this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), r = !0, !0)) : !0
            }
        },
        _mouseMove: function(t) {
            if (this._mouseMoved) {
                if (n.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button) return this._mouseUp(t);
                if (!t.which)
                    if (t.originalEvent.altKey || t.originalEvent.ctrlKey || t.originalEvent.metaKey || t.originalEvent.shiftKey) this.ignoreMissingWhich = !0;
                    else if (!this.ignoreMissingWhich) return this._mouseUp(t)
            }
            return (t.which || t.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted)
        },
        _mouseUp: function(t) {
            this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate);
            this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && n.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t));
            this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer);
            this.ignoreMissingWhich = !1;
            r = !1;
            t.preventDefault()
        },
        _mouseDistanceMet: function(n) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - n.pageX), Math.abs(this._mouseDownEvent.pageY - n.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0
        }
    });
    n.ui.plugin = {
        add: function(t, i, r) {
            var u, f = n.ui[t].prototype;
            for (u in r) f.plugins[u] = f.plugins[u] || [], f.plugins[u].push([i, r[u]])
        },
        call: function(n, t, i, r) {
            var u, f = n.plugins[t];
            if (f && (r || n.element[0].parentNode && 11 !== n.element[0].parentNode.nodeType))
                for (u = 0; f.length > u; u++) n.options[f[u][0]] && f[u][1].apply(n.element, i)
        }
    };
    n.ui.safeBlur = function(t) {
        t && "body" !== t.nodeName.toLowerCase() && n(t).trigger("blur")
    };
    n.widget("ui.draggable", n.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            "original" === this.options.helper && this._setPositionRelative();
            this.options.addClasses && this._addClass("ui-draggable");
            this._setHandleClassName();
            this._mouseInit()
        },
        _setOption: function(n, t) {
            this._super(n, t);
            "handle" === n && (this._removeHandleClassName(), this._setHandleClassName())
        },
        _destroy: function() {
            return (this.helper || this.element).is(".ui-draggable-dragging") ? (this.destroyOnClear = !0, void 0) : (this._removeHandleClassName(), this._mouseDestroy(), void 0)
        },
        _mouseCapture: function(t) {
            var i = this.options;
            return this.helper || i.disabled || n(t.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(t), this.handle ? (this._blurActiveElement(t), this._blockFrames(i.iframeFix === !0 ? "iframe" : i.iframeFix), !0) : !1)
        },
        _blockFrames: function(t) {
            this.iframeBlocks = this.document.find(t).map(function() {
                var t = n(this);
                return n("<div>").css("position", "absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0]
            })
        },
        _unblockFrames: function() {
            this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
        },
        _blurActiveElement: function(t) {
            var i = n.ui.safeActiveElement(this.document[0]),
                r = n(t.target);
            r.closest(i).length || n.ui.safeBlur(i)
        },
        _mouseStart: function(t) {
            var i = this.options;
            return this.helper = this._createHelper(t), this._addClass(this.helper, "ui-draggable-dragging"), this._cacheHelperProportions(), n.ui.ddmanager && (n.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function() {
                return "fixed" === n(this).css("position")
            }).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(t), this.originalPosition = this.position = this._generatePosition(t, !1), this.originalPageX = t.pageX, this.originalPageY = t.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), n.ui.ddmanager && !i.dropBehaviour && n.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), n.ui.ddmanager && n.ui.ddmanager.dragStart(this, t), !0)
        },
        _refreshOffsets: function(n) {
            this.offset = {
                top: this.positionAbs.top - this.margins.top,
                left: this.positionAbs.left - this.margins.left,
                scroll: !1,
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            };
            this.offset.click = {
                left: n.pageX - this.offset.left,
                top: n.pageY - this.offset.top
            }
        },
        _mouseDrag: function(t, i) {
            if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(t, !0), this.positionAbs = this._convertPositionTo("absolute"), !i) {
                var r = this._uiHash();
                if (this._trigger("drag", t, r) === !1) return this._mouseUp(new n.Event("mouseup", t)), !1;
                this.position = r.position
            }
            return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", n.ui.ddmanager && n.ui.ddmanager.drag(this, t), !1
        },
        _mouseStop: function(t) {
            var r = this,
                i = !1;
            return n.ui.ddmanager && !this.options.dropBehaviour && (i = n.ui.ddmanager.drop(this, t)), this.dropped && (i = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !i || "valid" === this.options.revert && i || this.options.revert === !0 || n.isFunction(this.options.revert) && this.options.revert.call(this.element, i) ? n(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                r._trigger("stop", t) !== !1 && r._clear()
            }) : this._trigger("stop", t) !== !1 && this._clear(), !1
        },
        _mouseUp: function(t) {
            return this._unblockFrames(), n.ui.ddmanager && n.ui.ddmanager.dragStop(this, t), this.handleElement.is(t.target) && this.element.trigger("focus"), n.ui.mouse.prototype._mouseUp.call(this, t)
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp(new n.Event("mouseup", {
                target: this.element[0]
            })) : this._clear(), this
        },
        _getHandle: function(t) {
            return this.options.handle ? !!n(t.target).closest(this.element.find(this.options.handle)).length : !0
        },
        _setHandleClassName: function() {
            this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element;
            this._addClass(this.handleElement, "ui-draggable-handle")
        },
        _removeHandleClassName: function() {
            this._removeClass(this.handleElement, "ui-draggable-handle")
        },
        _createHelper: function(t) {
            var r = this.options,
                u = n.isFunction(r.helper),
                i = u ? n(r.helper.apply(this.element[0], [t])) : "clone" === r.helper ? this.element.clone().removeAttr("id") : this.element;
            return i.parents("body").length || i.appendTo("parent" === r.appendTo ? this.element[0].parentNode : r.appendTo), u && i[0] === this.element[0] && this._setPositionRelative(), i[0] === this.element[0] || /(fixed|absolute)/.test(i.css("position")) || i.css("position", "absolute"), i
        },
        _setPositionRelative: function() {
            /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
        },
        _adjustOffsetFromHelper: function(t) {
            "string" == typeof t && (t = t.split(" "));
            n.isArray(t) && (t = {
                left: +t[0],
                top: +t[1] || 0
            });
            "left" in t && (this.offset.click.left = t.left + this.margins.left);
            "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left);
            "top" in t && (this.offset.click.top = t.top + this.margins.top);
            "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
        },
        _isRootNode: function(n) {
            return /(html|body)/i.test(n.tagName) || n === this.document[0]
        },
        _getParentOffset: function() {
            var t = this.offsetParent.offset(),
                i = this.document[0];
            return "absolute" === this.cssPosition && this.scrollParent[0] !== i && n.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (t = {
                top: 0,
                left: 0
            }), {
                top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" !== this.cssPosition) return {
                top: 0,
                left: 0
            };
            var n = this.element.position(),
                t = this._isRootNode(this.scrollParent[0]);
            return {
                top: n.top - (parseInt(this.helper.css("top"), 10) || 0) + (t ? 0 : this.scrollParent.scrollTop()),
                left: n.left - (parseInt(this.helper.css("left"), 10) || 0) + (t ? 0 : this.scrollParent.scrollLeft())
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var f, t, i, r = this.options,
                u = this.document[0];
            return this.relativeContainer = null, r.containment ? "window" === r.containment ? (this.containment = [n(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, n(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, n(window).scrollLeft() + n(window).width() - this.helperProportions.width - this.margins.left, n(window).scrollTop() + (n(window).height() || u.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : "document" === r.containment ? (this.containment = [0, 0, n(u).width() - this.helperProportions.width - this.margins.left, (n(u).height() || u.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : r.containment.constructor === Array ? (this.containment = r.containment, void 0) : ("parent" === r.containment && (r.containment = this.helper[0].parentNode), t = n(r.containment), i = t[0], i && (f = /(scroll|auto)/.test(t.css("overflow")), this.containment = [(parseInt(t.css("borderLeftWidth"), 10) || 0) + (parseInt(t.css("paddingLeft"), 10) || 0), (parseInt(t.css("borderTopWidth"), 10) || 0) + (parseInt(t.css("paddingTop"), 10) || 0), (f ? Math.max(i.scrollWidth, i.offsetWidth) : i.offsetWidth) - (parseInt(t.css("borderRightWidth"), 10) || 0) - (parseInt(t.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (f ? Math.max(i.scrollHeight, i.offsetHeight) : i.offsetHeight) - (parseInt(t.css("borderBottomWidth"), 10) || 0) - (parseInt(t.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = t), void 0) : (this.containment = null, void 0)
        },
        _convertPositionTo: function(n, t) {
            t || (t = this.position);
            var i = "absolute" === n ? 1 : -1,
                r = this._isRootNode(this.scrollParent[0]);
            return {
                top: t.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : r ? 0 : this.offset.scroll.top) * i,
                left: t.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : r ? 0 : this.offset.scroll.left) * i
            }
        },
        _generatePosition: function(n, t) {
            var i, s, u, f, r = this.options,
                h = this._isRootNode(this.scrollParent[0]),
                e = n.pageX,
                o = n.pageY;
            return h && this.offset.scroll || (this.offset.scroll = {
                top: this.scrollParent.scrollTop(),
                left: this.scrollParent.scrollLeft()
            }), t && (this.containment && (this.relativeContainer ? (s = this.relativeContainer.offset(), i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment, n.pageX - this.offset.click.left < i[0] && (e = i[0] + this.offset.click.left), n.pageY - this.offset.click.top < i[1] && (o = i[1] + this.offset.click.top), n.pageX - this.offset.click.left > i[2] && (e = i[2] + this.offset.click.left), n.pageY - this.offset.click.top > i[3] && (o = i[3] + this.offset.click.top)), r.grid && (u = r.grid[1] ? this.originalPageY + Math.round((o - this.originalPageY) / r.grid[1]) * r.grid[1] : this.originalPageY, o = i ? u - this.offset.click.top >= i[1] || u - this.offset.click.top > i[3] ? u : u - this.offset.click.top >= i[1] ? u - r.grid[1] : u + r.grid[1] : u, f = r.grid[0] ? this.originalPageX + Math.round((e - this.originalPageX) / r.grid[0]) * r.grid[0] : this.originalPageX, e = i ? f - this.offset.click.left >= i[0] || f - this.offset.click.left > i[2] ? f : f - this.offset.click.left >= i[0] ? f - r.grid[0] : f + r.grid[0] : f), "y" === r.axis && (e = this.originalPageX), "x" === r.axis && (o = this.originalPageY)), {
                top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : h ? 0 : this.offset.scroll.top),
                left: e - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : h ? 0 : this.offset.scroll.left)
            }
        },
        _clear: function() {
            this._removeClass(this.helper, "ui-draggable-dragging");
            this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove();
            this.helper = null;
            this.cancelHelperRemoval = !1;
            this.destroyOnClear && this.destroy()
        },
        _trigger: function(t, i, r) {
            return r = r || this._uiHash(), n.ui.plugin.call(this, t, [i, r, this], !0), /^(drag|start|stop)/.test(t) && (this.positionAbs = this._convertPositionTo("absolute"), r.offset = this.positionAbs), n.Widget.prototype._trigger.call(this, t, i, r)
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    });
    n.ui.plugin.add("draggable", "connectToSortable", {
        start: function(t, i, r) {
            var u = n.extend({}, i, {
                item: r.element
            });
            r.sortables = [];
            n(r.options.connectToSortable).each(function() {
                var i = n(this).sortable("instance");
                i && !i.options.disabled && (r.sortables.push(i), i.refreshPositions(), i._trigger("activate", t, u))
            })
        },
        stop: function(t, i, r) {
            var u = n.extend({}, i, {
                item: r.element
            });
            r.cancelHelperRemoval = !1;
            n.each(r.sortables, function() {
                var n = this;
                n.isOver ? (n.isOver = 0, r.cancelHelperRemoval = !0, n.cancelHelperRemoval = !1, n._storedCSS = {
                    position: n.placeholder.css("position"),
                    top: n.placeholder.css("top"),
                    left: n.placeholder.css("left")
                }, n._mouseStop(t), n.options.helper = n.options._helper) : (n.cancelHelperRemoval = !0, n._trigger("deactivate", t, u))
            })
        },
        drag: function(t, i, r) {
            n.each(r.sortables, function() {
                var f = !1,
                    u = this;
                u.positionAbs = r.positionAbs;
                u.helperProportions = r.helperProportions;
                u.offset.click = r.offset.click;
                u._intersectsWith(u.containerCache) && (f = !0, n.each(r.sortables, function() {
                    return this.positionAbs = r.positionAbs, this.helperProportions = r.helperProportions, this.offset.click = r.offset.click, this !== u && this._intersectsWith(this.containerCache) && n.contains(u.element[0], this.element[0]) && (f = !1), f
                }));
                f ? (u.isOver || (u.isOver = 1, r._parent = i.helper.parent(), u.currentItem = i.helper.appendTo(u.element).data("ui-sortable-item", !0), u.options._helper = u.options.helper, u.options.helper = function() {
                    return i.helper[0]
                }, t.target = u.currentItem[0], u._mouseCapture(t, !0), u._mouseStart(t, !0, !0), u.offset.click.top = r.offset.click.top, u.offset.click.left = r.offset.click.left, u.offset.parent.left -= r.offset.parent.left - u.offset.parent.left, u.offset.parent.top -= r.offset.parent.top - u.offset.parent.top, r._trigger("toSortable", t), r.dropped = u.element, n.each(r.sortables, function() {
                    this.refreshPositions()
                }), r.currentItem = r.element, u.fromOutside = r), u.currentItem && (u._mouseDrag(t), i.position = u.position)) : u.isOver && (u.isOver = 0, u.cancelHelperRemoval = !0, u.options._revert = u.options.revert, u.options.revert = !1, u._trigger("out", t, u._uiHash(u)), u._mouseStop(t, !0), u.options.revert = u.options._revert, u.options.helper = u.options._helper, u.placeholder && u.placeholder.remove(), i.helper.appendTo(r._parent), r._refreshOffsets(t), i.position = r._generatePosition(t, !0), r._trigger("fromSortable", t), r.dropped = !1, n.each(r.sortables, function() {
                    this.refreshPositions()
                }))
            })
        }
    });
    n.ui.plugin.add("draggable", "cursor", {
        start: function(t, i, r) {
            var u = n("body"),
                f = r.options;
            u.css("cursor") && (f._cursor = u.css("cursor"));
            u.css("cursor", f.cursor)
        },
        stop: function(t, i, r) {
            var u = r.options;
            u._cursor && n("body").css("cursor", u._cursor)
        }
    });
    n.ui.plugin.add("draggable", "opacity", {
        start: function(t, i, r) {
            var u = n(i.helper),
                f = r.options;
            u.css("opacity") && (f._opacity = u.css("opacity"));
            u.css("opacity", f.opacity)
        },
        stop: function(t, i, r) {
            var u = r.options;
            u._opacity && n(i.helper).css("opacity", u._opacity)
        }
    });
    n.ui.plugin.add("draggable", "scroll", {
        start: function(n, t, i) {
            i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1));
            i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset())
        },
        drag: function(t, i, r) {
            var u = r.options,
                o = !1,
                e = r.scrollParentNotHidden[0],
                f = r.document[0];
            e !== f && "HTML" !== e.tagName ? (u.axis && "x" === u.axis || (r.overflowOffset.top + e.offsetHeight - t.pageY < u.scrollSensitivity ? e.scrollTop = o = e.scrollTop + u.scrollSpeed : t.pageY - r.overflowOffset.top < u.scrollSensitivity && (e.scrollTop = o = e.scrollTop - u.scrollSpeed)), u.axis && "y" === u.axis || (r.overflowOffset.left + e.offsetWidth - t.pageX < u.scrollSensitivity ? e.scrollLeft = o = e.scrollLeft + u.scrollSpeed : t.pageX - r.overflowOffset.left < u.scrollSensitivity && (e.scrollLeft = o = e.scrollLeft - u.scrollSpeed))) : (u.axis && "x" === u.axis || (t.pageY - n(f).scrollTop() < u.scrollSensitivity ? o = n(f).scrollTop(n(f).scrollTop() - u.scrollSpeed) : n(window).height() - (t.pageY - n(f).scrollTop()) < u.scrollSensitivity && (o = n(f).scrollTop(n(f).scrollTop() + u.scrollSpeed))), u.axis && "y" === u.axis || (t.pageX - n(f).scrollLeft() < u.scrollSensitivity ? o = n(f).scrollLeft(n(f).scrollLeft() - u.scrollSpeed) : n(window).width() - (t.pageX - n(f).scrollLeft()) < u.scrollSensitivity && (o = n(f).scrollLeft(n(f).scrollLeft() + u.scrollSpeed))));
            o !== !1 && n.ui.ddmanager && !u.dropBehaviour && n.ui.ddmanager.prepareOffsets(r, t)
        }
    });
    n.ui.plugin.add("draggable", "snap", {
        start: function(t, i, r) {
            var u = r.options;
            r.snapElements = [];
            n(u.snap.constructor !== String ? u.snap.items || ":data(ui-draggable)" : u.snap).each(function() {
                var t = n(this),
                    i = t.offset();
                this !== r.element[0] && r.snapElements.push({
                    item: this,
                    width: t.outerWidth(),
                    height: t.outerHeight(),
                    top: i.top,
                    left: i.left
                })
            })
        },
        drag: function(t, i, r) {
            for (var e, o, s, h, c, a, l, v, w, b = r.options, f = b.snapTolerance, y = i.offset.left, k = y + r.helperProportions.width, p = i.offset.top, d = p + r.helperProportions.height, u = r.snapElements.length - 1; u >= 0; u--) c = r.snapElements[u].left - r.margins.left, a = c + r.snapElements[u].width, l = r.snapElements[u].top - r.margins.top, v = l + r.snapElements[u].height, c - f > k || y > a + f || l - f > d || p > v + f || !n.contains(r.snapElements[u].item.ownerDocument, r.snapElements[u].item) ? (r.snapElements[u].snapping && r.options.snap.release && r.options.snap.release.call(r.element, t, n.extend(r._uiHash(), {
                snapItem: r.snapElements[u].item
            })), r.snapElements[u].snapping = !1) : ("inner" !== b.snapMode && (e = f >= Math.abs(l - d), o = f >= Math.abs(v - p), s = f >= Math.abs(c - k), h = f >= Math.abs(a - y), e && (i.position.top = r._convertPositionTo("relative", {
                top: l - r.helperProportions.height,
                left: 0
            }).top), o && (i.position.top = r._convertPositionTo("relative", {
                top: v,
                left: 0
            }).top), s && (i.position.left = r._convertPositionTo("relative", {
                top: 0,
                left: c - r.helperProportions.width
            }).left), h && (i.position.left = r._convertPositionTo("relative", {
                top: 0,
                left: a
            }).left)), w = e || o || s || h, "outer" !== b.snapMode && (e = f >= Math.abs(l - p), o = f >= Math.abs(v - d), s = f >= Math.abs(c - y), h = f >= Math.abs(a - k), e && (i.position.top = r._convertPositionTo("relative", {
                top: l,
                left: 0
            }).top), o && (i.position.top = r._convertPositionTo("relative", {
                top: v - r.helperProportions.height,
                left: 0
            }).top), s && (i.position.left = r._convertPositionTo("relative", {
                top: 0,
                left: c
            }).left), h && (i.position.left = r._convertPositionTo("relative", {
                top: 0,
                left: a - r.helperProportions.width
            }).left)), !r.snapElements[u].snapping && (e || o || s || h || w) && r.options.snap.snap && r.options.snap.snap.call(r.element, t, n.extend(r._uiHash(), {
                snapItem: r.snapElements[u].item
            })), r.snapElements[u].snapping = e || o || s || h || w)
        }
    });
    n.ui.plugin.add("draggable", "stack", {
        start: function(t, i, r) {
            var f, e = r.options,
                u = n.makeArray(n(e.stack)).sort(function(t, i) {
                    return (parseInt(n(t).css("zIndex"), 10) || 0) - (parseInt(n(i).css("zIndex"), 10) || 0)
                });
            u.length && (f = parseInt(n(u[0]).css("zIndex"), 10) || 0, n(u).each(function(t) {
                n(this).css("zIndex", f + t)
            }), this.css("zIndex", f + u.length))
        }
    });
    n.ui.plugin.add("draggable", "zIndex", {
        start: function(t, i, r) {
            var u = n(i.helper),
                f = r.options;
            u.css("zIndex") && (f._zIndex = u.css("zIndex"));
            u.css("zIndex", f.zIndex)
        },
        stop: function(t, i, r) {
            var u = r.options;
            u._zIndex && n(i.helper).css("zIndex", u._zIndex)
        }
    });
    n.ui.draggable;
    n.widget("ui.resizable", n.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            classes: {
                "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se"
            },
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _num: function(n) {
            return parseFloat(n) || 0
        },
        _isNumber: function(n) {
            return !isNaN(parseFloat(n))
        },
        _hasScroll: function(t, i) {
            if ("hidden" === n(t).css("overflow")) return !1;
            var r = i && "left" === i ? "scrollLeft" : "scrollTop",
                u = !1;
            return t[r] > 0 ? !0 : (t[r] = 1, u = t[r] > 0, t[r] = 0, u)
        },
        _create: function() {
            var r, t = this.options,
                i = this;
            this._addClass("ui-resizable");
            n.extend(this, {
                _aspectRatio: !!t.aspectRatio,
                aspectRatio: t.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: t.helper || t.ghost || t.animate ? t.helper || "ui-resizable-helper" : null
            });
            this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(n("<div class='ui-wrapper' style='overflow: hidden;'><\/div>").css({
                position: this.element.css("position"),
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                top: this.element.css("top"),
                left: this.element.css("left")
            })), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, r = {
                marginTop: this.originalElement.css("marginTop"),
                marginRight: this.originalElement.css("marginRight"),
                marginBottom: this.originalElement.css("marginBottom"),
                marginLeft: this.originalElement.css("marginLeft")
            }, this.element.css(r), this.originalElement.css("margin", 0), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block"
            })), this.originalElement.css(r), this._proportionallyResize());
            this._setupHandles();
            t.autoHide && n(this.element).on("mouseenter", function() {
                t.disabled || (i._removeClass("ui-resizable-autohide"), i._handles.show())
            }).on("mouseleave", function() {
                t.disabled || i.resizing || (i._addClass("ui-resizable-autohide"), i._handles.hide())
            });
            this._mouseInit()
        },
        _destroy: function() {
            this._mouseDestroy();
            var t, i = function(t) {
                n(t).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove()
            };
            return this.elementIsWrapper && (i(this.element), t = this.element, this.originalElement.css({
                position: t.css("position"),
                width: t.outerWidth(),
                height: t.outerHeight(),
                top: t.css("top"),
                left: t.css("left")
            }).insertAfter(t), t.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
        },
        _setOption: function(n, t) {
            switch (this._super(n, t), n) {
                case "handles":
                    this._removeHandles();
                    this._setupHandles()
            }
        },
        _setupHandles: function() {
            var i, r, u, o, t, f = this.options,
                e = this;
            if (this.handles = f.handles || (n(".ui-resizable-handle", this.element).length ? {
                    n: ".ui-resizable-n",
                    e: ".ui-resizable-e",
                    s: ".ui-resizable-s",
                    w: ".ui-resizable-w",
                    se: ".ui-resizable-se",
                    sw: ".ui-resizable-sw",
                    ne: ".ui-resizable-ne",
                    nw: ".ui-resizable-nw"
                } : "e,s,se"), this._handles = n(), this.handles.constructor === String)
                for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), u = this.handles.split(","), this.handles = {}, r = 0; u.length > r; r++) i = n.trim(u[r]), o = "ui-resizable-" + i, t = n("<div>"), this._addClass(t, "ui-resizable-handle " + o), t.css({
                    zIndex: f.zIndex
                }), this.handles[i] = ".ui-resizable-" + i, this.element.append(t);
            this._renderAxis = function(t) {
                var i, r, u, f;
                t = t || this.element;
                for (i in this.handles) this.handles[i].constructor === String ? this.handles[i] = this.element.children(this.handles[i]).first().show() : (this.handles[i].jquery || this.handles[i].nodeType) && (this.handles[i] = n(this.handles[i]), this._on(this.handles[i], {
                    mousedown: e._mouseDown
                })), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (r = n(this.handles[i], this.element), f = /sw|ne|nw|se|n|s/.test(i) ? r.outerHeight() : r.outerWidth(), u = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), t.css(u, f), this._proportionallyResize()), this._handles = this._handles.add(this.handles[i])
            };
            this._renderAxis(this.element);
            this._handles = this._handles.add(this.element.find(".ui-resizable-handle"));
            this._handles.disableSelection();
            this._handles.on("mouseover", function() {
                e.resizing || (this.className && (t = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), e.axis = t && t[1] ? t[1] : "se")
            });
            f.autoHide && (this._handles.hide(), this._addClass("ui-resizable-autohide"))
        },
        _removeHandles: function() {
            this._handles.remove()
        },
        _mouseCapture: function(t) {
            var r, i, u = !1;
            for (r in this.handles) i = n(this.handles[r])[0], (i === t.target || n.contains(i, t.target)) && (u = !0);
            return !this.options.disabled && u
        },
        _mouseStart: function(t) {
            var u, f, e, r = this.options,
                i = this.element;
            return this.resizing = !0, this._renderProxy(), u = this._num(this.helper.css("left")), f = this._num(this.helper.css("top")), r.containment && (u += n(r.containment).scrollLeft() || 0, f += n(r.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                left: u,
                top: f
            }, this.size = this._helper ? {
                width: this.helper.width(),
                height: this.helper.height()
            } : {
                width: i.width(),
                height: i.height()
            }, this.originalSize = this._helper ? {
                width: i.outerWidth(),
                height: i.outerHeight()
            } : {
                width: i.width(),
                height: i.height()
            }, this.sizeDiff = {
                width: i.outerWidth() - i.width(),
                height: i.outerHeight() - i.height()
            }, this.originalPosition = {
                left: u,
                top: f
            }, this.originalMousePosition = {
                left: t.pageX,
                top: t.pageY
            }, this.aspectRatio = "number" == typeof r.aspectRatio ? r.aspectRatio : this.originalSize.width / this.originalSize.height || 1, e = n(".ui-resizable-" + this.axis).css("cursor"), n("body").css("cursor", "auto" === e ? this.axis + "-resize" : e), this._addClass("ui-resizable-resizing"), this._propagate("start", t), !0
        },
        _mouseDrag: function(t) {
            var i, r, u = this.originalMousePosition,
                e = this.axis,
                o = t.pageX - u.left || 0,
                s = t.pageY - u.top || 0,
                f = this._change[e];
            return this._updatePrevProperties(), f ? (i = f.apply(this, [t, o, s]), this._updateVirtualBoundaries(t.shiftKey), (this._aspectRatio || t.shiftKey) && (i = this._updateRatio(i, t)), i = this._respectSize(i, t), this._updateCache(i), this._propagate("resize", t), r = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), n.isEmptyObject(r) || (this._updatePrevProperties(), this._trigger("resize", t, this.ui()), this._applyChanges()), !1) : !1
        },
        _mouseStop: function(t) {
            this.resizing = !1;
            var r, u, f, e, o, s, h, c = this.options,
                i = this;
            return this._helper && (r = this._proportionallyResizeElements, u = r.length && /textarea/i.test(r[0].nodeName), f = u && this._hasScroll(r[0], "left") ? 0 : i.sizeDiff.height, e = u ? 0 : i.sizeDiff.width, o = {
                width: i.helper.width() - e,
                height: i.helper.height() - f
            }, s = parseFloat(i.element.css("left")) + (i.position.left - i.originalPosition.left) || null, h = parseFloat(i.element.css("top")) + (i.position.top - i.originalPosition.top) || null, c.animate || this.element.css(n.extend(o, {
                top: h,
                left: s
            })), i.helper.height(i.size.height), i.helper.width(i.size.width), this._helper && !c.animate && this._proportionallyResize()), n("body").css("cursor", "auto"), this._removeClass("ui-resizable-resizing"), this._propagate("stop", t), this._helper && this.helper.remove(), !1
        },
        _updatePrevProperties: function() {
            this.prevPosition = {
                top: this.position.top,
                left: this.position.left
            };
            this.prevSize = {
                width: this.size.width,
                height: this.size.height
            }
        },
        _applyChanges: function() {
            var n = {};
            return this.position.top !== this.prevPosition.top && (n.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (n.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (n.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (n.height = this.size.height + "px"), this.helper.css(n), n
        },
        _updateVirtualBoundaries: function(n) {
            var r, u, f, e, t, i = this.options;
            t = {
                minWidth: this._isNumber(i.minWidth) ? i.minWidth : 0,
                maxWidth: this._isNumber(i.maxWidth) ? i.maxWidth : 1 / 0,
                minHeight: this._isNumber(i.minHeight) ? i.minHeight : 0,
                maxHeight: this._isNumber(i.maxHeight) ? i.maxHeight : 1 / 0
            };
            (this._aspectRatio || n) && (r = t.minHeight * this.aspectRatio, f = t.minWidth / this.aspectRatio, u = t.maxHeight * this.aspectRatio, e = t.maxWidth / this.aspectRatio, r > t.minWidth && (t.minWidth = r), f > t.minHeight && (t.minHeight = f), t.maxWidth > u && (t.maxWidth = u), t.maxHeight > e && (t.maxHeight = e));
            this._vBoundaries = t
        },
        _updateCache: function(n) {
            this.offset = this.helper.offset();
            this._isNumber(n.left) && (this.position.left = n.left);
            this._isNumber(n.top) && (this.position.top = n.top);
            this._isNumber(n.height) && (this.size.height = n.height);
            this._isNumber(n.width) && (this.size.width = n.width)
        },
        _updateRatio: function(n) {
            var t = this.position,
                i = this.size,
                r = this.axis;
            return this._isNumber(n.height) ? n.width = n.height * this.aspectRatio : this._isNumber(n.width) && (n.height = n.width / this.aspectRatio), "sw" === r && (n.left = t.left + (i.width - n.width), n.top = null), "nw" === r && (n.top = t.top + (i.height - n.height), n.left = t.left + (i.width - n.width)), n
        },
        _respectSize: function(n) {
            var t = this._vBoundaries,
                i = this.axis,
                r = this._isNumber(n.width) && t.maxWidth && t.maxWidth < n.width,
                u = this._isNumber(n.height) && t.maxHeight && t.maxHeight < n.height,
                f = this._isNumber(n.width) && t.minWidth && t.minWidth > n.width,
                e = this._isNumber(n.height) && t.minHeight && t.minHeight > n.height,
                o = this.originalPosition.left + this.originalSize.width,
                s = this.originalPosition.top + this.originalSize.height,
                h = /sw|nw|w/.test(i),
                c = /nw|ne|n/.test(i);
            return f && (n.width = t.minWidth), e && (n.height = t.minHeight), r && (n.width = t.maxWidth), u && (n.height = t.maxHeight), f && h && (n.left = o - t.minWidth), r && h && (n.left = o - t.maxWidth), e && c && (n.top = s - t.minHeight), u && c && (n.top = s - t.maxHeight), n.width || n.height || n.left || !n.top ? n.width || n.height || n.top || !n.left || (n.left = null) : n.top = null, n
        },
        _getPaddingPlusBorderDimensions: function(n) {
            for (var t = 0, i = [], r = [n.css("borderTopWidth"), n.css("borderRightWidth"), n.css("borderBottomWidth"), n.css("borderLeftWidth")], u = [n.css("paddingTop"), n.css("paddingRight"), n.css("paddingBottom"), n.css("paddingLeft")]; 4 > t; t++) i[t] = parseFloat(r[t]) || 0, i[t] += parseFloat(u[t]) || 0;
            return {
                height: i[0] + i[2],
                width: i[1] + i[3]
            }
        },
        _proportionallyResize: function() {
            if (this._proportionallyResizeElements.length)
                for (var n, t = 0, i = this.helper || this.element; this._proportionallyResizeElements.length > t; t++) n = this._proportionallyResizeElements[t], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(n)), n.css({
                    height: i.height() - this.outerDimensions.height || 0,
                    width: i.width() - this.outerDimensions.width || 0
                })
        },
        _renderProxy: function() {
            var t = this.element,
                i = this.options;
            this.elementOffset = t.offset();
            this._helper ? (this.helper = this.helper || n("<div style='overflow:hidden;'><\/div>"), this._addClass(this.helper, this._helper), this.helper.css({
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++i.zIndex
            }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
        },
        _change: {
            e: function(n, t) {
                return {
                    width: this.originalSize.width + t
                }
            },
            w: function(n, t) {
                var i = this.originalSize,
                    r = this.originalPosition;
                return {
                    left: r.left + t,
                    width: i.width - t
                }
            },
            n: function(n, t, i) {
                var r = this.originalSize,
                    u = this.originalPosition;
                return {
                    top: u.top + i,
                    height: r.height - i
                }
            },
            s: function(n, t, i) {
                return {
                    height: this.originalSize.height + i
                }
            },
            se: function(t, i, r) {
                return n.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, i, r]))
            },
            sw: function(t, i, r) {
                return n.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, i, r]))
            },
            ne: function(t, i, r) {
                return n.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, i, r]))
            },
            nw: function(t, i, r) {
                return n.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, i, r]))
            }
        },
        _propagate: function(t, i) {
            n.ui.plugin.call(this, t, [i, this.ui()]);
            "resize" !== t && this._trigger(t, i, this.ui())
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    });
    n.ui.plugin.add("resizable", "animate", {
        stop: function(t) {
            var i = n(this).resizable("instance"),
                u = i.options,
                r = i._proportionallyResizeElements,
                f = r.length && /textarea/i.test(r[0].nodeName),
                s = f && i._hasScroll(r[0], "left") ? 0 : i.sizeDiff.height,
                h = f ? 0 : i.sizeDiff.width,
                c = {
                    width: i.size.width - h,
                    height: i.size.height - s
                },
                e = parseFloat(i.element.css("left")) + (i.position.left - i.originalPosition.left) || null,
                o = parseFloat(i.element.css("top")) + (i.position.top - i.originalPosition.top) || null;
            i.element.animate(n.extend(c, o && e ? {
                top: o,
                left: e
            } : {}), {
                duration: u.animateDuration,
                easing: u.animateEasing,
                step: function() {
                    var u = {
                        width: parseFloat(i.element.css("width")),
                        height: parseFloat(i.element.css("height")),
                        top: parseFloat(i.element.css("top")),
                        left: parseFloat(i.element.css("left"))
                    };
                    r && r.length && n(r[0]).css({
                        width: u.width,
                        height: u.height
                    });
                    i._updateCache(u);
                    i._propagate("resize", t)
                }
            })
        }
    });
    n.ui.plugin.add("resizable", "containment", {
        start: function() {
            var r, f, e, o, s, h, c, t = n(this).resizable("instance"),
                l = t.options,
                a = t.element,
                u = l.containment,
                i = u instanceof n ? u.get(0) : /parent/.test(u) ? a.parent().get(0) : u;
            i && (t.containerElement = n(i), /document/.test(u) || u === document ? (t.containerOffset = {
                left: 0,
                top: 0
            }, t.containerPosition = {
                left: 0,
                top: 0
            }, t.parentData = {
                element: n(document),
                left: 0,
                top: 0,
                width: n(document).width(),
                height: n(document).height() || document.body.parentNode.scrollHeight
            }) : (r = n(i), f = [], n(["Top", "Right", "Left", "Bottom"]).each(function(n, i) {
                f[n] = t._num(r.css("padding" + i))
            }), t.containerOffset = r.offset(), t.containerPosition = r.position(), t.containerSize = {
                height: r.innerHeight() - f[3],
                width: r.innerWidth() - f[1]
            }, e = t.containerOffset, o = t.containerSize.height, s = t.containerSize.width, h = t._hasScroll(i, "left") ? i.scrollWidth : s, c = t._hasScroll(i) ? i.scrollHeight : o, t.parentData = {
                element: i,
                left: e.left,
                top: e.top,
                width: h,
                height: c
            }))
        },
        resize: function(t) {
            var o, s, h, c, i = n(this).resizable("instance"),
                v = i.options,
                r = i.containerOffset,
                l = i.position,
                f = i._aspectRatio || t.shiftKey,
                e = {
                    top: 0,
                    left: 0
                },
                a = i.containerElement,
                u = !0;
            a[0] !== document && /static/.test(a.css("position")) && (e = r);
            l.left < (i._helper ? r.left : 0) && (i.size.width = i.size.width + (i._helper ? i.position.left - r.left : i.position.left - e.left), f && (i.size.height = i.size.width / i.aspectRatio, u = !1), i.position.left = v.helper ? r.left : 0);
            l.top < (i._helper ? r.top : 0) && (i.size.height = i.size.height + (i._helper ? i.position.top - r.top : i.position.top), f && (i.size.width = i.size.height * i.aspectRatio, u = !1), i.position.top = i._helper ? r.top : 0);
            h = i.containerElement.get(0) === i.element.parent().get(0);
            c = /relative|absolute/.test(i.containerElement.css("position"));
            h && c ? (i.offset.left = i.parentData.left + i.position.left, i.offset.top = i.parentData.top + i.position.top) : (i.offset.left = i.element.offset().left, i.offset.top = i.element.offset().top);
            o = Math.abs(i.sizeDiff.width + (i._helper ? i.offset.left - e.left : i.offset.left - r.left));
            s = Math.abs(i.sizeDiff.height + (i._helper ? i.offset.top - e.top : i.offset.top - r.top));
            o + i.size.width >= i.parentData.width && (i.size.width = i.parentData.width - o, f && (i.size.height = i.size.width / i.aspectRatio, u = !1));
            s + i.size.height >= i.parentData.height && (i.size.height = i.parentData.height - s, f && (i.size.width = i.size.height * i.aspectRatio, u = !1));
            u || (i.position.left = i.prevPosition.left, i.position.top = i.prevPosition.top, i.size.width = i.prevSize.width, i.size.height = i.prevSize.height)
        },
        stop: function() {
            var t = n(this).resizable("instance"),
                r = t.options,
                u = t.containerOffset,
                f = t.containerPosition,
                e = t.containerElement,
                i = n(t.helper),
                o = i.offset(),
                s = i.outerWidth() - t.sizeDiff.width,
                h = i.outerHeight() - t.sizeDiff.height;
            t._helper && !r.animate && /relative/.test(e.css("position")) && n(this).css({
                left: o.left - f.left - u.left,
                width: s,
                height: h
            });
            t._helper && !r.animate && /static/.test(e.css("position")) && n(this).css({
                left: o.left - f.left - u.left,
                width: s,
                height: h
            })
        }
    });
    n.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var t = n(this).resizable("instance"),
                i = t.options;
            n(i.alsoResize).each(function() {
                var t = n(this);
                t.data("ui-resizable-alsoresize", {
                    width: parseFloat(t.width()),
                    height: parseFloat(t.height()),
                    left: parseFloat(t.css("left")),
                    top: parseFloat(t.css("top"))
                })
            })
        },
        resize: function(t, i) {
            var r = n(this).resizable("instance"),
                e = r.options,
                u = r.originalSize,
                f = r.originalPosition,
                o = {
                    height: r.size.height - u.height || 0,
                    width: r.size.width - u.width || 0,
                    top: r.position.top - f.top || 0,
                    left: r.position.left - f.left || 0
                };
            n(e.alsoResize).each(function() {
                var t = n(this),
                    u = n(this).data("ui-resizable-alsoresize"),
                    r = {},
                    f = t.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                n.each(f, function(n, t) {
                    var i = (u[t] || 0) + (o[t] || 0);
                    i && i >= 0 && (r[t] = i || null)
                });
                t.css(r)
            })
        },
        stop: function() {
            n(this).removeData("ui-resizable-alsoresize")
        }
    });
    n.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var t = n(this).resizable("instance"),
                i = t.size;
            t.ghost = t.originalElement.clone();
            t.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: i.height,
                width: i.width,
                margin: 0,
                left: 0,
                top: 0
            });
            t._addClass(t.ghost, "ui-resizable-ghost");
            n.uiBackCompat !== !1 && "string" == typeof t.options.ghost && t.ghost.addClass(this.options.ghost);
            t.ghost.appendTo(t.helper)
        },
        resize: function() {
            var t = n(this).resizable("instance");
            t.ghost && t.ghost.css({
                position: "relative",
                height: t.size.height,
                width: t.size.width
            })
        },
        stop: function() {
            var t = n(this).resizable("instance");
            t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0))
        }
    });
    n.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var h, t = n(this).resizable("instance"),
                i = t.options,
                y = t.size,
                o = t.originalSize,
                s = t.originalPosition,
                c = t.axis,
                l = "number" == typeof i.grid ? [i.grid, i.grid] : i.grid,
                f = l[0] || 1,
                e = l[1] || 1,
                a = Math.round((y.width - o.width) / f) * f,
                v = Math.round((y.height - o.height) / e) * e,
                r = o.width + a,
                u = o.height + v,
                p = i.maxWidth && r > i.maxWidth,
                w = i.maxHeight && u > i.maxHeight,
                b = i.minWidth && i.minWidth > r,
                k = i.minHeight && i.minHeight > u;
            i.grid = l;
            b && (r += f);
            k && (u += e);
            p && (r -= f);
            w && (u -= e);
            /^(se|s|e)$/.test(c) ? (t.size.width = r, t.size.height = u) : /^(ne)$/.test(c) ? (t.size.width = r, t.size.height = u, t.position.top = s.top - v) : /^(sw)$/.test(c) ? (t.size.width = r, t.size.height = u, t.position.left = s.left - a) : ((0 >= u - e || 0 >= r - f) && (h = t._getPaddingPlusBorderDimensions(this)), u - e > 0 ? (t.size.height = u, t.position.top = s.top - v) : (u = e - h.height, t.size.height = u, t.position.top = s.top + o.height - u), r - f > 0 ? (t.size.width = r, t.position.left = s.left - a) : (r = f - h.width, t.size.width = r, t.position.left = s.left + o.width - r))
        }
    });
    n.ui.resizable;
    n.widget("ui.dialog", {
        version: "1.12.1",
        options: {
            appendTo: "body",
            autoOpen: !0,
            buttons: [],
            classes: {
                "ui-dialog": "ui-corner-all",
                "ui-dialog-titlebar": "ui-corner-all"
            },
            closeOnEscape: !0,
            closeText: "Close",
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: null,
            maxWidth: null,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: {
                my: "center",
                at: "center",
                "of": window,
                collision: "fit",
                using: function(t) {
                    var i = n(this).css(t).offset().top;
                    0 > i && n(this).css("top", t.top - i)
                }
            },
            resizable: !0,
            show: null,
            title: null,
            width: 300,
            beforeClose: null,
            close: null,
            drag: null,
            dragStart: null,
            dragStop: null,
            focus: null,
            open: null,
            resize: null,
            resizeStart: null,
            resizeStop: null
        },
        sizeRelatedOptions: {
            buttons: !0,
            height: !0,
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0,
            width: !0
        },
        resizableRelatedOptions: {
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0
        },
        _create: function() {
            this.originalCss = {
                display: this.element[0].style.display,
                width: this.element[0].style.width,
                minHeight: this.element[0].style.minHeight,
                maxHeight: this.element[0].style.maxHeight,
                height: this.element[0].style.height
            };
            this.originalPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            };
            this.originalTitle = this.element.attr("title");
            null == this.options.title && null != this.originalTitle && (this.options.title = this.originalTitle);
            this.options.disabled && (this.options.disabled = !1);
            this._createWrapper();
            this.element.show().removeAttr("title").appendTo(this.uiDialog);
            this._addClass("ui-dialog-content", "ui-widget-content");
            this._createTitlebar();
            this._createButtonPane();
            this.options.draggable && n.fn.draggable && this._makeDraggable();
            this.options.resizable && n.fn.resizable && this._makeResizable();
            this._isOpen = !1;
            this._trackFocus()
        },
        _init: function() {
            this.options.autoOpen && this.open()
        },
        _appendTo: function() {
            var t = this.options.appendTo;
            return t && (t.jquery || t.nodeType) ? n(t) : this.document.find(t || "body").eq(0)
        },
        _destroy: function() {
            var n, t = this.originalPosition;
            this._untrackInstance();
            this._destroyOverlay();
            this.element.removeUniqueId().css(this.originalCss).detach();
            this.uiDialog.remove();
            this.originalTitle && this.element.attr("title", this.originalTitle);
            n = t.parent.children().eq(t.index);
            n.length && n[0] !== this.element[0] ? n.before(this.element) : t.parent.append(this.element)
        },
        widget: function() {
            return this.uiDialog
        },
        disable: n.noop,
        enable: n.noop,
        close: function(t) {
            var i = this;
            this._isOpen && this._trigger("beforeClose", t) !== !1 && (this._isOpen = !1, this._focusedElement = null, this._destroyOverlay(), this._untrackInstance(), this.opener.filter(":focusable").trigger("focus").length || n.ui.safeBlur(n.ui.safeActiveElement(this.document[0])), this._hide(this.uiDialog, this.options.hide, function() {
                i._trigger("close", t)
            }))
        },
        isOpen: function() {
            return this._isOpen
        },
        moveToTop: function() {
            this._moveToTop()
        },
        _moveToTop: function(t, i) {
            var r = !1,
                f = this.uiDialog.siblings(".ui-front:visible").map(function() {
                    return +n(this).css("z-index")
                }).get(),
                u = Math.max.apply(null, f);
            return u >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", u + 1), r = !0), r && !i && this._trigger("focus", t), r
        },
        open: function() {
            var t = this;
            return this._isOpen ? (this._moveToTop() && this._focusTabbable(), void 0) : (this._isOpen = !0, this.opener = n(n.ui.safeActiveElement(this.document[0])), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1), this._show(this.uiDialog, this.options.show, function() {
                t._focusTabbable();
                t._trigger("focus")
            }), this._makeFocusTarget(), this._trigger("open"), void 0)
        },
        _focusTabbable: function() {
            var n = this._focusedElement;
            n || (n = this.element.find("[autofocus]"));
            n.length || (n = this.element.find(":tabbable"));
            n.length || (n = this.uiDialogButtonPane.find(":tabbable"));
            n.length || (n = this.uiDialogTitlebarClose.filter(":tabbable"));
            n.length || (n = this.uiDialog);
            n.eq(0).trigger("focus")
        },
        _keepFocus: function(t) {
            function i() {
                var t = n.ui.safeActiveElement(this.document[0]),
                    i = this.uiDialog[0] === t || n.contains(this.uiDialog[0], t);
                i || this._focusTabbable()
            }
            t.preventDefault();
            i.call(this);
            this._delay(i)
        },
        _createWrapper: function() {
            this.uiDialog = n("<div>").hide().attr({
                tabIndex: -1,
                role: "dialog"
            }).appendTo(this._appendTo());
            this._addClass(this.uiDialog, "ui-dialog", "ui-widget ui-widget-content ui-front");
            this._on(this.uiDialog, {
                keydown: function(t) {
                    if (this.options.closeOnEscape && !t.isDefaultPrevented() && t.keyCode && t.keyCode === n.ui.keyCode.ESCAPE) return t.preventDefault(), this.close(t), void 0;
                    if (t.keyCode === n.ui.keyCode.TAB && !t.isDefaultPrevented()) {
                        var i = this.uiDialog.find(":tabbable"),
                            r = i.filter(":first"),
                            u = i.filter(":last");
                        t.target !== u[0] && t.target !== this.uiDialog[0] || t.shiftKey ? t.target !== r[0] && t.target !== this.uiDialog[0] || !t.shiftKey || (this._delay(function() {
                            u.trigger("focus")
                        }), t.preventDefault()) : (this._delay(function() {
                            r.trigger("focus")
                        }), t.preventDefault())
                    }
                },
                mousedown: function(n) {
                    this._moveToTop(n) && this._focusTabbable()
                }
            });
            this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                "aria-describedby": this.element.uniqueId().attr("id")
            })
        },
        _createTitlebar: function() {
            var t;
            this.uiDialogTitlebar = n("<div>");
            this._addClass(this.uiDialogTitlebar, "ui-dialog-titlebar", "ui-widget-header ui-helper-clearfix");
            this._on(this.uiDialogTitlebar, {
                mousedown: function(t) {
                    n(t.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.trigger("focus")
                }
            });
            this.uiDialogTitlebarClose = n("<button type='button'><\/button>").button({
                label: n("<a>").text(this.options.closeText).html(),
                icon: "ui-icon-closethick",
                showLabel: !1
            }).appendTo(this.uiDialogTitlebar);
            this._addClass(this.uiDialogTitlebarClose, "ui-dialog-titlebar-close");
            this._on(this.uiDialogTitlebarClose, {
                click: function(n) {
                    n.preventDefault();
                    this.close(n)
                }
            });
            t = n("<span>").uniqueId().prependTo(this.uiDialogTitlebar);
            this._addClass(t, "ui-dialog-title");
            this._title(t);
            this.uiDialogTitlebar.prependTo(this.uiDialog);
            this.uiDialog.attr({
                "aria-labelledby": t.attr("id")
            })
        },
        _title: function(n) {
            this.options.title ? n.text(this.options.title) : n.html("&#160;")
        },
        _createButtonPane: function() {
            this.uiDialogButtonPane = n("<div>");
            this._addClass(this.uiDialogButtonPane, "ui-dialog-buttonpane", "ui-widget-content ui-helper-clearfix");
            this.uiButtonSet = n("<div>").appendTo(this.uiDialogButtonPane);
            this._addClass(this.uiButtonSet, "ui-dialog-buttonset");
            this._createButtons()
        },
        _createButtons: function() {
            var i = this,
                t = this.options.buttons;
            return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), n.isEmptyObject(t) || n.isArray(t) && !t.length ? (this._removeClass(this.uiDialog, "ui-dialog-buttons"), void 0) : (n.each(t, function(t, r) {
                var u, f;
                r = n.isFunction(r) ? {
                    click: r,
                    text: t
                } : r;
                r = n.extend({
                    type: "button"
                }, r);
                u = r.click;
                f = {
                    icon: r.icon,
                    iconPosition: r.iconPosition,
                    showLabel: r.showLabel,
                    icons: r.icons,
                    text: r.text
                };
                delete r.click;
                delete r.icon;
                delete r.iconPosition;
                delete r.showLabel;
                delete r.icons;
                "boolean" == typeof r.text && delete r.text;
                n("<button><\/button>", r).button(f).appendTo(i.uiButtonSet).on("click", function() {
                    u.apply(i.element[0], arguments)
                })
            }), this._addClass(this.uiDialog, "ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog), void 0)
        },
        _makeDraggable: function() {
            function i(n) {
                return {
                    position: n.position,
                    offset: n.offset
                }
            }
            var t = this,
                r = this.options;
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function(r, u) {
                    t._addClass(n(this), "ui-dialog-dragging");
                    t._blockFrames();
                    t._trigger("dragStart", r, i(u))
                },
                drag: function(n, r) {
                    t._trigger("drag", n, i(r))
                },
                stop: function(u, f) {
                    var e = f.offset.left - t.document.scrollLeft(),
                        o = f.offset.top - t.document.scrollTop();
                    r.position = {
                        my: "left top",
                        at: "left" + (e >= 0 ? "+" : "") + e + " top" + (o >= 0 ? "+" : "") + o,
                        "of": t.window
                    };
                    t._removeClass(n(this), "ui-dialog-dragging");
                    t._unblockFrames();
                    t._trigger("dragStop", u, i(f))
                }
            })
        },
        _makeResizable: function() {
            function r(n) {
                return {
                    originalPosition: n.originalPosition,
                    originalSize: n.originalSize,
                    position: n.position,
                    size: n.size
                }
            }
            var t = this,
                i = this.options,
                u = i.resizable,
                f = this.uiDialog.css("position"),
                e = "string" == typeof u ? u : "n,e,s,w,se,sw,ne,nw";
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: i.maxWidth,
                maxHeight: i.maxHeight,
                minWidth: i.minWidth,
                minHeight: this._minHeight(),
                handles: e,
                start: function(i, u) {
                    t._addClass(n(this), "ui-dialog-resizing");
                    t._blockFrames();
                    t._trigger("resizeStart", i, r(u))
                },
                resize: function(n, i) {
                    t._trigger("resize", n, r(i))
                },
                stop: function(u, f) {
                    var e = t.uiDialog.offset(),
                        o = e.left - t.document.scrollLeft(),
                        s = e.top - t.document.scrollTop();
                    i.height = t.uiDialog.height();
                    i.width = t.uiDialog.width();
                    i.position = {
                        my: "left top",
                        at: "left" + (o >= 0 ? "+" : "") + o + " top" + (s >= 0 ? "+" : "") + s,
                        "of": t.window
                    };
                    t._removeClass(n(this), "ui-dialog-resizing");
                    t._unblockFrames();
                    t._trigger("resizeStop", u, r(f))
                }
            }).css("position", f)
        },
        _trackFocus: function() {
            this._on(this.widget(), {
                focusin: function(t) {
                    this._makeFocusTarget();
                    this._focusedElement = n(t.target)
                }
            })
        },
        _makeFocusTarget: function() {
            this._untrackInstance();
            this._trackingInstances().unshift(this)
        },
        _untrackInstance: function() {
            var t = this._trackingInstances(),
                i = n.inArray(this, t); - 1 !== i && t.splice(i, 1)
        },
        _trackingInstances: function() {
            var n = this.document.data("ui-dialog-instances");
            return n || (n = [], this.document.data("ui-dialog-instances", n)), n
        },
        _minHeight: function() {
            var n = this.options;
            return "auto" === n.height ? n.minHeight : Math.min(n.minHeight, n.height)
        },
        _position: function() {
            var n = this.uiDialog.is(":visible");
            n || this.uiDialog.show();
            this.uiDialog.position(this.options.position);
            n || this.uiDialog.hide()
        },
        _setOptions: function(t) {
            var i = this,
                r = !1,
                u = {};
            n.each(t, function(n, t) {
                i._setOption(n, t);
                n in i.sizeRelatedOptions && (r = !0);
                n in i.resizableRelatedOptions && (u[n] = t)
            });
            r && (this._size(), this._position());
            this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", u)
        },
        _setOption: function(t, i) {
            var f, u, r = this.uiDialog;
            "disabled" !== t && (this._super(t, i), "appendTo" === t && this.uiDialog.appendTo(this._appendTo()), "buttons" === t && this._createButtons(), "closeText" === t && this.uiDialogTitlebarClose.button({
                label: n("<a>").text("" + this.options.closeText).html()
            }), "draggable" === t && (f = r.is(":data(ui-draggable)"), f && !i && r.draggable("destroy"), !f && i && this._makeDraggable()), "position" === t && this._position(), "resizable" === t && (u = r.is(":data(ui-resizable)"), u && !i && r.resizable("destroy"), u && "string" == typeof i && r.resizable("option", "handles", i), u || i === !1 || this._makeResizable()), "title" === t && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
        },
        _size: function() {
            var t, i, r, n = this.options;
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                maxHeight: "none",
                height: 0
            });
            n.minWidth > n.width && (n.width = n.minWidth);
            t = this.uiDialog.css({
                height: "auto",
                width: n.width
            }).outerHeight();
            i = Math.max(0, n.minHeight - t);
            r = "number" == typeof n.maxHeight ? Math.max(0, n.maxHeight - t) : "none";
            "auto" === n.height ? this.element.css({
                minHeight: i,
                maxHeight: r,
                height: "auto"
            }) : this.element.height(Math.max(0, n.height - t));
            this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        },
        _blockFrames: function() {
            this.iframeBlocks = this.document.find("iframe").map(function() {
                var t = n(this);
                return n("<div>").css({
                    position: "absolute",
                    width: t.outerWidth(),
                    height: t.outerHeight()
                }).appendTo(t.parent()).offset(t.offset())[0]
            })
        },
        _unblockFrames: function() {
            this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
        },
        _allowInteraction: function(t) {
            return n(t.target).closest(".ui-dialog").length ? !0 : !!n(t.target).closest(".ui-datepicker").length
        },
        _createOverlay: function() {
            if (this.options.modal) {
                var t = !0;
                this._delay(function() {
                    t = !1
                });
                this.document.data("ui-dialog-overlays") || this._on(this.document, {
                    focusin: function(n) {
                        t || this._allowInteraction(n) || (n.preventDefault(), this._trackingInstances()[0]._focusTabbable())
                    }
                });
                this.overlay = n("<div>").appendTo(this._appendTo());
                this._addClass(this.overlay, null, "ui-widget-overlay ui-front");
                this._on(this.overlay, {
                    mousedown: "_keepFocus"
                });
                this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1)
            }
        },
        _destroyOverlay: function() {
            if (this.options.modal && this.overlay) {
                var n = this.document.data("ui-dialog-overlays") - 1;
                n ? this.document.data("ui-dialog-overlays", n) : (this._off(this.document, "focusin"), this.document.removeData("ui-dialog-overlays"));
                this.overlay.remove();
                this.overlay = null
            }
        }
    });
    n.uiBackCompat !== !1 && n.widget("ui.dialog", n.ui.dialog, {
        options: {
            dialogClass: ""
        },
        _createWrapper: function() {
            this._super();
            this.uiDialog.addClass(this.options.dialogClass)
        },
        _setOption: function(n, t) {
            "dialogClass" === n && this.uiDialog.removeClass(this.options.dialogClass).addClass(t);
            this._superApply(arguments)
        }
    });
    n.ui.dialog;
    n.widget("ui.droppable", {
        version: "1.12.1",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            addClasses: !0,
            greedy: !1,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function() {
            var t, i = this.options,
                r = i.accept;
            this.isover = !1;
            this.isout = !0;
            this.accept = n.isFunction(r) ? r : function(n) {
                return n.is(r)
            };
            this.proportions = function() {
                return arguments.length ? (t = arguments[0], void 0) : t ? t : t = {
                    width: this.element[0].offsetWidth,
                    height: this.element[0].offsetHeight
                }
            };
            this._addToManager(i.scope);
            i.addClasses && this._addClass("ui-droppable")
        },
        _addToManager: function(t) {
            n.ui.ddmanager.droppables[t] = n.ui.ddmanager.droppables[t] || [];
            n.ui.ddmanager.droppables[t].push(this)
        },
        _splice: function(n) {
            for (var t = 0; n.length > t; t++) n[t] === this && n.splice(t, 1)
        },
        _destroy: function() {
            var t = n.ui.ddmanager.droppables[this.options.scope];
            this._splice(t)
        },
        _setOption: function(t, i) {
            if ("accept" === t) this.accept = n.isFunction(i) ? i : function(n) {
                return n.is(i)
            };
            else if ("scope" === t) {
                var r = n.ui.ddmanager.droppables[this.options.scope];
                this._splice(r);
                this._addToManager(i)
            }
            this._super(t, i)
        },
        _activate: function(t) {
            var i = n.ui.ddmanager.current;
            this._addActiveClass();
            i && this._trigger("activate", t, this.ui(i))
        },
        _deactivate: function(t) {
            var i = n.ui.ddmanager.current;
            this._removeActiveClass();
            i && this._trigger("deactivate", t, this.ui(i))
        },
        _over: function(t) {
            var i = n.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._addHoverClass(), this._trigger("over", t, this.ui(i)))
        },
        _out: function(t) {
            var i = n.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._removeHoverClass(), this._trigger("out", t, this.ui(i)))
        },
        _drop: function(t, i) {
            var r = i || n.ui.ddmanager.current,
                u = !1;
            return r && (r.currentItem || r.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                var i = n(this).droppable("instance");
                if (i.options.greedy && !i.options.disabled && i.options.scope === r.options.scope && i.accept.call(i.element[0], r.currentItem || r.element) && e(r, n.extend(i, {
                        offset: i.element.offset()
                    }), i.options.tolerance, t)) return (u = !0, !1)
            }), u ? !1 : this.accept.call(this.element[0], r.currentItem || r.element) ? (this._removeActiveClass(), this._removeHoverClass(), this._trigger("drop", t, this.ui(r)), this.element) : !1) : !1
        },
        ui: function(n) {
            return {
                draggable: n.currentItem || n.element,
                helper: n.helper,
                position: n.position,
                offset: n.positionAbs
            }
        },
        _addHoverClass: function() {
            this._addClass("ui-droppable-hover")
        },
        _removeHoverClass: function() {
            this._removeClass("ui-droppable-hover")
        },
        _addActiveClass: function() {
            this._addClass("ui-droppable-active")
        },
        _removeActiveClass: function() {
            this._removeClass("ui-droppable-active")
        }
    });
    e = n.ui.intersect = function() {
        function n(n, t, i) {
            return n >= t && t + i > n
        }
        return function(t, i, r, u) {
            if (!i.offset) return !1;
            var o = (t.positionAbs || t.position.absolute).left + t.margins.left,
                s = (t.positionAbs || t.position.absolute).top + t.margins.top,
                h = o + t.helperProportions.width,
                c = s + t.helperProportions.height,
                f = i.offset.left,
                e = i.offset.top,
                l = f + i.proportions().width,
                a = e + i.proportions().height;
            switch (r) {
                case "fit":
                    return o >= f && l >= h && s >= e && a >= c;
                case "intersect":
                    return o + t.helperProportions.width / 2 > f && l > h - t.helperProportions.width / 2 && s + t.helperProportions.height / 2 > e && a > c - t.helperProportions.height / 2;
                case "pointer":
                    return n(u.pageY, e, i.proportions().height) && n(u.pageX, f, i.proportions().width);
                case "touch":
                    return (s >= e && a >= s || c >= e && a >= c || e > s && c > a) && (o >= f && l >= o || h >= f && l >= h || f > o && h > l);
                default:
                    return !1
            }
        }
    }();
    n.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function(t, i) {
            var r, f, u = n.ui.ddmanager.droppables[t.options.scope] || [],
                o = i ? i.type : null,
                e = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();
            n: for (r = 0; u.length > r; r++)
                if (!(u[r].options.disabled || t && !u[r].accept.call(u[r].element[0], t.currentItem || t.element))) {
                    for (f = 0; e.length > f; f++)
                        if (e[f] === u[r].element[0]) {
                            u[r].proportions().height = 0;
                            continue n
                        }
                    u[r].visible = "none" !== u[r].element.css("display");
                    u[r].visible && ("mousedown" === o && u[r]._activate.call(u[r], i), u[r].offset = u[r].element.offset(), u[r].proportions({
                        width: u[r].element[0].offsetWidth,
                        height: u[r].element[0].offsetHeight
                    }))
                }
        },
        drop: function(t, i) {
            var r = !1;
            return n.each((n.ui.ddmanager.droppables[t.options.scope] || []).slice(), function() {
                this.options && (!this.options.disabled && this.visible && e(t, this, this.options.tolerance, i) && (r = this._drop.call(this, i) || r), !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
            }), r
        },
        dragStart: function(t, i) {
            t.element.parentsUntil("body").on("scroll.droppable", function() {
                t.options.refreshPositions || n.ui.ddmanager.prepareOffsets(t, i)
            })
        },
        drag: function(t, i) {
            t.options.refreshPositions && n.ui.ddmanager.prepareOffsets(t, i);
            n.each(n.ui.ddmanager.droppables[t.options.scope] || [], function() {
                if (!this.options.disabled && !this.greedyChild && this.visible) {
                    var r, o, f, s = e(t, this, this.options.tolerance, i),
                        u = !s && this.isover ? "isout" : s && !this.isover ? "isover" : null;
                    u && (this.options.greedy && (o = this.options.scope, f = this.element.parents(":data(ui-droppable)").filter(function() {
                        return n(this).droppable("instance").options.scope === o
                    }), f.length && (r = n(f[0]).droppable("instance"), r.greedyChild = "isover" === u)), r && "isover" === u && (r.isover = !1, r.isout = !0, r._out.call(r, i)), this[u] = !0, this["isout" === u ? "isover" : "isout"] = !1, this["isover" === u ? "_over" : "_out"].call(this, i), r && "isout" === u && (r.isout = !1, r.isover = !0, r._over.call(r, i)))
                }
            })
        },
        dragStop: function(t, i) {
            t.element.parentsUntil("body").off("scroll.droppable");
            t.options.refreshPositions || n.ui.ddmanager.prepareOffsets(t, i)
        }
    };
    n.uiBackCompat !== !1 && n.widget("ui.droppable", n.ui.droppable, {
        options: {
            hoverClass: !1,
            activeClass: !1
        },
        _addActiveClass: function() {
            this._super();
            this.options.activeClass && this.element.addClass(this.options.activeClass)
        },
        _removeActiveClass: function() {
            this._super();
            this.options.activeClass && this.element.removeClass(this.options.activeClass)
        },
        _addHoverClass: function() {
            this._super();
            this.options.hoverClass && this.element.addClass(this.options.hoverClass)
        },
        _removeHoverClass: function() {
            this._super();
            this.options.hoverClass && this.element.removeClass(this.options.hoverClass)
        }
    });
    n.ui.droppable;
    n.widget("ui.progressbar", {
        version: "1.12.1",
        options: {
            classes: {
                "ui-progressbar": "ui-corner-all",
                "ui-progressbar-value": "ui-corner-left",
                "ui-progressbar-complete": "ui-corner-right"
            },
            max: 100,
            value: 0,
            change: null,
            complete: null
        },
        min: 0,
        _create: function() {
            this.oldValue = this.options.value = this._constrainedValue();
            this.element.attr({
                role: "progressbar",
                "aria-valuemin": this.min
            });
            this._addClass("ui-progressbar", "ui-widget ui-widget-content");
            this.valueDiv = n("<div>").appendTo(this.element);
            this._addClass(this.valueDiv, "ui-progressbar-value", "ui-widget-header");
            this._refreshValue()
        },
        _destroy: function() {
            this.element.removeAttr("role aria-valuemin aria-valuemax aria-valuenow");
            this.valueDiv.remove()
        },
        value: function(n) {
            return void 0 === n ? this.options.value : (this.options.value = this._constrainedValue(n), this._refreshValue(), void 0)
        },
        _constrainedValue: function(n) {
            return void 0 === n && (n = this.options.value), this.indeterminate = n === !1, "number" != typeof n && (n = 0), this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, n))
        },
        _setOptions: function(n) {
            var t = n.value;
            delete n.value;
            this._super(n);
            this.options.value = this._constrainedValue(t);
            this._refreshValue()
        },
        _setOption: function(n, t) {
            "max" === n && (t = Math.max(this.min, t));
            this._super(n, t)
        },
        _setOptionDisabled: function(n) {
            this._super(n);
            this.element.attr("aria-disabled", n);
            this._toggleClass(null, "ui-state-disabled", !!n)
        },
        _percentage: function() {
            return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
        },
        _refreshValue: function() {
            var t = this.options.value,
                i = this._percentage();
            this.valueDiv.toggle(this.indeterminate || t > this.min).width(i.toFixed(0) + "%");
            this._toggleClass(this.valueDiv, "ui-progressbar-complete", null, t === this.options.max)._toggleClass("ui-progressbar-indeterminate", null, this.indeterminate);
            this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = n("<div>").appendTo(this.valueDiv), this._addClass(this.overlayDiv, "ui-progressbar-overlay"))) : (this.element.attr({
                "aria-valuemax": this.options.max,
                "aria-valuenow": t
            }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null));
            this.oldValue !== t && (this.oldValue = t, this._trigger("change"));
            t === this.options.max && this._trigger("complete")
        }
    });
    n.widget("ui.selectable", n.ui.mouse, {
        version: "1.12.1",
        options: {
            appendTo: "body",
            autoRefresh: !0,
            distance: 0,
            filter: "*",
            tolerance: "touch",
            selected: null,
            selecting: null,
            start: null,
            stop: null,
            unselected: null,
            unselecting: null
        },
        _create: function() {
            var t = this;
            this._addClass("ui-selectable");
            this.dragged = !1;
            this.refresh = function() {
                t.elementPos = n(t.element[0]).offset();
                t.selectees = n(t.options.filter, t.element[0]);
                t._addClass(t.selectees, "ui-selectee");
                t.selectees.each(function() {
                    var i = n(this),
                        u = i.offset(),
                        r = {
                            left: u.left - t.elementPos.left,
                            top: u.top - t.elementPos.top
                        };
                    n.data(this, "selectable-item", {
                        element: this,
                        $element: i,
                        left: r.left,
                        top: r.top,
                        right: r.left + i.outerWidth(),
                        bottom: r.top + i.outerHeight(),
                        startselected: !1,
                        selected: i.hasClass("ui-selected"),
                        selecting: i.hasClass("ui-selecting"),
                        unselecting: i.hasClass("ui-unselecting")
                    })
                })
            };
            this.refresh();
            this._mouseInit();
            this.helper = n("<div>");
            this._addClass(this.helper, "ui-selectable-helper")
        },
        _destroy: function() {
            this.selectees.removeData("selectable-item");
            this._mouseDestroy()
        },
        _mouseStart: function(t) {
            var i = this,
                r = this.options;
            this.opos = [t.pageX, t.pageY];
            this.elementPos = n(this.element[0]).offset();
            this.options.disabled || (this.selectees = n(r.filter, this.element[0]), this._trigger("start", t), n(r.appendTo).append(this.helper), this.helper.css({
                left: t.pageX,
                top: t.pageY,
                width: 0,
                height: 0
            }), r.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                var r = n.data(this, "selectable-item");
                r.startselected = !0;
                t.metaKey || t.ctrlKey || (i._removeClass(r.$element, "ui-selected"), r.selected = !1, i._addClass(r.$element, "ui-unselecting"), r.unselecting = !0, i._trigger("unselecting", t, {
                    unselecting: r.element
                }))
            }), n(t.target).parents().addBack().each(function() {
                var u, r = n.data(this, "selectable-item");
                if (r) return (u = !t.metaKey && !t.ctrlKey || !r.$element.hasClass("ui-selected"), i._removeClass(r.$element, u ? "ui-unselecting" : "ui-selected")._addClass(r.$element, u ? "ui-selecting" : "ui-unselecting"), r.unselecting = !u, r.selecting = u, r.selected = u, u ? i._trigger("selecting", t, {
                    selecting: r.element
                }) : i._trigger("unselecting", t, {
                    unselecting: r.element
                }), !1)
            }))
        },
        _mouseDrag: function(t) {
            if (this.dragged = !0, !this.options.disabled) {
                var o, i = this,
                    s = this.options,
                    r = this.opos[0],
                    u = this.opos[1],
                    f = t.pageX,
                    e = t.pageY;
                return r > f && (o = f, f = r, r = o), u > e && (o = e, e = u, u = o), this.helper.css({
                    left: r,
                    top: u,
                    width: f - r,
                    height: e - u
                }), this.selectees.each(function() {
                    var o = n.data(this, "selectable-item"),
                        c = !1,
                        h = {};
                    o && o.element !== i.element[0] && (h.left = o.left + i.elementPos.left, h.right = o.right + i.elementPos.left, h.top = o.top + i.elementPos.top, h.bottom = o.bottom + i.elementPos.top, "touch" === s.tolerance ? c = !(h.left > f || r > h.right || h.top > e || u > h.bottom) : "fit" === s.tolerance && (c = h.left > r && f > h.right && h.top > u && e > h.bottom), c ? (o.selected && (i._removeClass(o.$element, "ui-selected"), o.selected = !1), o.unselecting && (i._removeClass(o.$element, "ui-unselecting"), o.unselecting = !1), o.selecting || (i._addClass(o.$element, "ui-selecting"), o.selecting = !0, i._trigger("selecting", t, {
                        selecting: o.element
                    }))) : (o.selecting && ((t.metaKey || t.ctrlKey) && o.startselected ? (i._removeClass(o.$element, "ui-selecting"), o.selecting = !1, i._addClass(o.$element, "ui-selected"), o.selected = !0) : (i._removeClass(o.$element, "ui-selecting"), o.selecting = !1, o.startselected && (i._addClass(o.$element, "ui-unselecting"), o.unselecting = !0), i._trigger("unselecting", t, {
                        unselecting: o.element
                    }))), o.selected && (t.metaKey || t.ctrlKey || o.startselected || (i._removeClass(o.$element, "ui-selected"), o.selected = !1, i._addClass(o.$element, "ui-unselecting"), o.unselecting = !0, i._trigger("unselecting", t, {
                        unselecting: o.element
                    })))))
                }), !1
            }
        },
        _mouseStop: function(t) {
            var i = this;
            return this.dragged = !1, n(".ui-unselecting", this.element[0]).each(function() {
                var r = n.data(this, "selectable-item");
                i._removeClass(r.$element, "ui-unselecting");
                r.unselecting = !1;
                r.startselected = !1;
                i._trigger("unselected", t, {
                    unselected: r.element
                })
            }), n(".ui-selecting", this.element[0]).each(function() {
                var r = n.data(this, "selectable-item");
                i._removeClass(r.$element, "ui-selecting")._addClass(r.$element, "ui-selected");
                r.selecting = !1;
                r.selected = !0;
                r.startselected = !0;
                i._trigger("selected", t, {
                    selected: r.element
                })
            }), this._trigger("stop", t), this.helper.remove(), !1
        }
    });
    n.widget("ui.selectmenu", [n.ui.formResetMixin, {
        version: "1.12.1",
        defaultElement: "<select>",
        options: {
            appendTo: null,
            classes: {
                "ui-selectmenu-button-open": "ui-corner-top",
                "ui-selectmenu-button-closed": "ui-corner-all"
            },
            disabled: null,
            icons: {
                button: "ui-icon-triangle-1-s"
            },
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            width: !1,
            change: null,
            close: null,
            focus: null,
            open: null,
            select: null
        },
        _create: function() {
            var t = this.element.uniqueId().attr("id");
            this.ids = {
                element: t,
                button: t + "-button",
                menu: t + "-menu"
            };
            this._drawButton();
            this._drawMenu();
            this._bindFormResetHandler();
            this._rendered = !1;
            this.menuItems = n()
        },
        _drawButton: function() {
            var t, i = this,
                r = this._parseOption(this.element.find("option:selected"), this.element[0].selectedIndex);
            this.labels = this.element.labels().attr("for", this.ids.button);
            this._on(this.labels, {
                click: function(n) {
                    this.button.focus();
                    n.preventDefault()
                }
            });
            this.element.hide();
            this.button = n("<span>", {
                tabindex: this.options.disabled ? -1 : 0,
                id: this.ids.button,
                role: "combobox",
                "aria-expanded": "false",
                "aria-autocomplete": "list",
                "aria-owns": this.ids.menu,
                "aria-haspopup": "true",
                title: this.element.attr("title")
            }).insertAfter(this.element);
            this._addClass(this.button, "ui-selectmenu-button ui-selectmenu-button-closed", "ui-button ui-widget");
            t = n("<span>").appendTo(this.button);
            this._addClass(t, "ui-selectmenu-icon", "ui-icon " + this.options.icons.button);
            this.buttonItem = this._renderButtonItem(r).appendTo(this.button);
            this.options.width !== !1 && this._resizeButton();
            this._on(this.button, this._buttonEvents);
            this.button.one("focusin", function() {
                i._rendered || i._refreshMenu()
            })
        },
        _drawMenu: function() {
            var t = this;
            this.menu = n("<ul>", {
                "aria-hidden": "true",
                "aria-labelledby": this.ids.button,
                id: this.ids.menu
            });
            this.menuWrap = n("<div>").append(this.menu);
            this._addClass(this.menuWrap, "ui-selectmenu-menu", "ui-front");
            this.menuWrap.appendTo(this._appendTo());
            this.menuInstance = this.menu.menu({
                classes: {
                    "ui-menu": "ui-corner-bottom"
                },
                role: "listbox",
                select: function(n, i) {
                    n.preventDefault();
                    t._setSelection();
                    t._select(i.item.data("ui-selectmenu-item"), n)
                },
                focus: function(n, i) {
                    var r = i.item.data("ui-selectmenu-item");
                    null != t.focusIndex && r.index !== t.focusIndex && (t._trigger("focus", n, {
                        item: r
                    }), t.isOpen || t._select(r, n));
                    t.focusIndex = r.index;
                    t.button.attr("aria-activedescendant", t.menuItems.eq(r.index).attr("id"))
                }
            }).menu("instance");
            this.menuInstance._off(this.menu, "mouseleave");
            this.menuInstance._closeOnDocumentClick = function() {
                return !1
            };
            this.menuInstance._isDivider = function() {
                return !1
            }
        },
        refresh: function() {
            this._refreshMenu();
            this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(this._getSelectedItem().data("ui-selectmenu-item") || {}));
            null === this.options.width && this._resizeButton()
        },
        _refreshMenu: function() {
            var n, t = this.element.find("option");
            this.menu.empty();
            this._parseOptions(t);
            this._renderMenu(this.menu, this.items);
            this.menuInstance.refresh();
            this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup").find(".ui-menu-item-wrapper");
            this._rendered = !0;
            t.length && (n = this._getSelectedItem(), this.menuInstance.focus(null, n), this._setAria(n.data("ui-selectmenu-item")), this._setOption("disabled", this.element.prop("disabled")))
        },
        open: function(n) {
            this.options.disabled || (this._rendered ? (this._removeClass(this.menu.find(".ui-state-active"), null, "ui-state-active"), this.menuInstance.focus(null, this._getSelectedItem())) : this._refreshMenu(), this.menuItems.length && (this.isOpen = !0, this._toggleAttr(), this._resizeMenu(), this._position(), this._on(this.document, this._documentClick), this._trigger("open", n)))
        },
        _position: function() {
            this.menuWrap.position(n.extend({
                "of": this.button
            }, this.options.position))
        },
        close: function(n) {
            this.isOpen && (this.isOpen = !1, this._toggleAttr(), this.range = null, this._off(this.document), this._trigger("close", n))
        },
        widget: function() {
            return this.button
        },
        menuWidget: function() {
            return this.menu
        },
        _renderButtonItem: function(t) {
            var i = n("<span>");
            return this._setText(i, t.label), this._addClass(i, "ui-selectmenu-text"), i
        },
        _renderMenu: function(t, i) {
            var r = this,
                u = "";
            n.each(i, function(i, f) {
                var e;
                f.optgroup !== u && (e = n("<li>", {
                    text: f.optgroup
                }), r._addClass(e, "ui-selectmenu-optgroup", "ui-menu-divider" + (f.element.parent("optgroup").prop("disabled") ? " ui-state-disabled" : "")), e.appendTo(t), u = f.optgroup);
                r._renderItemData(t, f)
            })
        },
        _renderItemData: function(n, t) {
            return this._renderItem(n, t).data("ui-selectmenu-item", t)
        },
        _renderItem: function(t, i) {
            var r = n("<li>"),
                u = n("<div>", {
                    title: i.element.attr("title")
                });
            return i.disabled && this._addClass(r, null, "ui-state-disabled"), this._setText(u, i.label), r.append(u).appendTo(t)
        },
        _setText: function(n, t) {
            t ? n.text(t) : n.html("&#160;")
        },
        _move: function(n, t) {
            var i, r, u = ".ui-menu-item";
            this.isOpen ? i = this.menuItems.eq(this.focusIndex).parent("li") : (i = this.menuItems.eq(this.element[0].selectedIndex).parent("li"), u += ":not(.ui-state-disabled)");
            r = "first" === n || "last" === n ? i["first" === n ? "prevAll" : "nextAll"](u).eq(-1) : i[n + "All"](u).eq(0);
            r.length && this.menuInstance.focus(t, r)
        },
        _getSelectedItem: function() {
            return this.menuItems.eq(this.element[0].selectedIndex).parent("li")
        },
        _toggle: function(n) {
            this[this.isOpen ? "close" : "open"](n)
        },
        _setSelection: function() {
            var n;
            this.range && (window.getSelection ? (n = window.getSelection(), n.removeAllRanges(), n.addRange(this.range)) : this.range.select(), this.button.focus())
        },
        _documentClick: {
            mousedown: function(t) {
                this.isOpen && (n(t.target).closest(".ui-selectmenu-menu, #" + n.ui.escapeSelector(this.ids.button)).length || this.close(t))
            }
        },
        _buttonEvents: {
            mousedown: function() {
                var n;
                window.getSelection ? (n = window.getSelection(), n.rangeCount && (this.range = n.getRangeAt(0))) : this.range = document.selection.createRange()
            },
            click: function(n) {
                this._setSelection();
                this._toggle(n)
            },
            keydown: function(t) {
                var i = !0;
                switch (t.keyCode) {
                    case n.ui.keyCode.TAB:
                    case n.ui.keyCode.ESCAPE:
                        this.close(t);
                        i = !1;
                        break;
                    case n.ui.keyCode.ENTER:
                        this.isOpen && this._selectFocusedItem(t);
                        break;
                    case n.ui.keyCode.UP:
                        t.altKey ? this._toggle(t) : this._move("prev", t);
                        break;
                    case n.ui.keyCode.DOWN:
                        t.altKey ? this._toggle(t) : this._move("next", t);
                        break;
                    case n.ui.keyCode.SPACE:
                        this.isOpen ? this._selectFocusedItem(t) : this._toggle(t);
                        break;
                    case n.ui.keyCode.LEFT:
                        this._move("prev", t);
                        break;
                    case n.ui.keyCode.RIGHT:
                        this._move("next", t);
                        break;
                    case n.ui.keyCode.HOME:
                    case n.ui.keyCode.PAGE_UP:
                        this._move("first", t);
                        break;
                    case n.ui.keyCode.END:
                    case n.ui.keyCode.PAGE_DOWN:
                        this._move("last", t);
                        break;
                    default:
                        this.menu.trigger(t);
                        i = !1
                }
                i && t.preventDefault()
            }
        },
        _selectFocusedItem: function(n) {
            var t = this.menuItems.eq(this.focusIndex).parent("li");
            t.hasClass("ui-state-disabled") || this._select(t.data("ui-selectmenu-item"), n)
        },
        _select: function(n, t) {
            var i = this.element[0].selectedIndex;
            this.element[0].selectedIndex = n.index;
            this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(n));
            this._setAria(n);
            this._trigger("select", t, {
                item: n
            });
            n.index !== i && this._trigger("change", t, {
                item: n
            });
            this.close(t)
        },
        _setAria: function(n) {
            var t = this.menuItems.eq(n.index).attr("id");
            this.button.attr({
                "aria-labelledby": t,
                "aria-activedescendant": t
            });
            this.menu.attr("aria-activedescendant", t)
        },
        _setOption: function(n, t) {
            if ("icons" === n) {
                var i = this.button.find("span.ui-icon");
                this._removeClass(i, null, this.options.icons.button)._addClass(i, null, t.button)
            }
            this._super(n, t);
            "appendTo" === n && this.menuWrap.appendTo(this._appendTo());
            "width" === n && this._resizeButton()
        },
        _setOptionDisabled: function(n) {
            this._super(n);
            this.menuInstance.option("disabled", n);
            this.button.attr("aria-disabled", n);
            this._toggleClass(this.button, null, "ui-state-disabled", n);
            this.element.prop("disabled", n);
            n ? (this.button.attr("tabindex", -1), this.close()) : this.button.attr("tabindex", 0)
        },
        _appendTo: function() {
            var t = this.options.appendTo;
            return t && (t = t.jquery || t.nodeType ? n(t) : this.document.find(t).eq(0)), t && t[0] || (t = this.element.closest(".ui-front, dialog")), t.length || (t = this.document[0].body), t
        },
        _toggleAttr: function() {
            this.button.attr("aria-expanded", this.isOpen);
            this._removeClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "closed" : "open"))._addClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "open" : "closed"))._toggleClass(this.menuWrap, "ui-selectmenu-open", null, this.isOpen);
            this.menu.attr("aria-hidden", !this.isOpen)
        },
        _resizeButton: function() {
            var n = this.options.width;
            return n === !1 ? (this.button.css("width", ""), void 0) : (null === n && (n = this.element.show().outerWidth(), this.element.hide()), this.button.outerWidth(n), void 0)
        },
        _resizeMenu: function() {
            this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1))
        },
        _getCreateOptions: function() {
            var n = this._super();
            return n.disabled = this.element.prop("disabled"), n
        },
        _parseOptions: function(t) {
            var r = this,
                i = [];
            t.each(function(t, u) {
                i.push(r._parseOption(n(u), t))
            });
            this.items = i
        },
        _parseOption: function(n, t) {
            var i = n.parent("optgroup");
            return {
                element: n,
                index: t,
                value: n.val(),
                label: n.text(),
                optgroup: i.attr("label") || "",
                disabled: i.prop("disabled") || n.prop("disabled")
            }
        },
        _destroy: function() {
            this._unbindFormResetHandler();
            this.menuWrap.remove();
            this.button.remove();
            this.element.show();
            this.element.removeUniqueId();
            this.labels.attr("for", this.ids.element)
        }
    }]);
    n.widget("ui.slider", n.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            classes: {
                "ui-slider": "ui-corner-all",
                "ui-slider-handle": "ui-corner-all",
                "ui-slider-range": "ui-corner-all ui-widget-header"
            },
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        numPages: 5,
        _create: function() {
            this._keySliding = !1;
            this._mouseSliding = !1;
            this._animateOff = !0;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this._calculateNewMax();
            this._addClass("ui-slider ui-slider-" + this.orientation, "ui-widget ui-widget-content");
            this._refresh();
            this._animateOff = !1
        },
        _refresh: function() {
            this._createRange();
            this._createHandles();
            this._setupEvents();
            this._refreshValue()
        },
        _createHandles: function() {
            var r, i, u = this.options,
                t = this.element.find(".ui-slider-handle"),
                f = [];
            for (i = u.values && u.values.length || 1, t.length > i && (t.slice(i).remove(), t = t.slice(0, i)), r = t.length; i > r; r++) f.push("<span tabindex='0'><\/span>");
            this.handles = t.add(n(f.join("")).appendTo(this.element));
            this._addClass(this.handles, "ui-slider-handle", "ui-state-default");
            this.handle = this.handles.eq(0);
            this.handles.each(function(t) {
                n(this).data("ui-slider-handle-index", t).attr("tabIndex", 0)
            })
        },
        _createRange: function() {
            var t = this.options;
            t.range ? (t.range === !0 && (t.values ? t.values.length && 2 !== t.values.length ? t.values = [t.values[0], t.values[0]] : n.isArray(t.values) && (t.values = t.values.slice(0)) : t.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? (this._removeClass(this.range, "ui-slider-range-min ui-slider-range-max"), this.range.css({
                left: "",
                bottom: ""
            })) : (this.range = n("<div>").appendTo(this.element), this._addClass(this.range, "ui-slider-range")), ("min" === t.range || "max" === t.range) && this._addClass(this.range, "ui-slider-range-" + t.range)) : (this.range && this.range.remove(), this.range = null)
        },
        _setupEvents: function() {
            this._off(this.handles);
            this._on(this.handles, this._handleEvents);
            this._hoverable(this.handles);
            this._focusable(this.handles)
        },
        _destroy: function() {
            this.handles.remove();
            this.range && this.range.remove();
            this._mouseDestroy()
        },
        _mouseCapture: function(t) {
            var s, f, r, i, u, h, e, c, o = this,
                l = this.options;
            return l.disabled ? !1 : (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            }, this.elementOffset = this.element.offset(), s = {
                x: t.pageX,
                y: t.pageY
            }, f = this._normValueFromMouse(s), r = this._valueMax() - this._valueMin() + 1, this.handles.each(function(t) {
                var e = Math.abs(f - o.values(t));
                (r > e || r === e && (t === o._lastChangedValue || o.values(t) === l.min)) && (r = e, i = n(this), u = t)
            }), h = this._start(t, u), h === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = u, this._addClass(i, null, "ui-state-active"), i.trigger("focus"), e = i.offset(), c = !n(t.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = c ? {
                left: 0,
                top: 0
            } : {
                left: t.pageX - e.left - i.width() / 2,
                top: t.pageY - e.top - i.height() / 2 - (parseInt(i.css("borderTopWidth"), 10) || 0) - (parseInt(i.css("borderBottomWidth"), 10) || 0) + (parseInt(i.css("marginTop"), 10) || 0)
            }, this.handles.hasClass("ui-state-hover") || this._slide(t, u, f), this._animateOff = !0, !0))
        },
        _mouseStart: function() {
            return !0
        },
        _mouseDrag: function(n) {
            var t = {
                    x: n.pageX,
                    y: n.pageY
                },
                i = this._normValueFromMouse(t);
            return this._slide(n, this._handleIndex, i), !1
        },
        _mouseStop: function(n) {
            return this._removeClass(this.handles, null, "ui-state-active"), this._mouseSliding = !1, this._stop(n, this._handleIndex), this._change(n, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
        },
        _detectOrientation: function() {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function(n) {
            var i, r, t, u, f;
            return "horizontal" === this.orientation ? (i = this.elementSize.width, r = n.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (i = this.elementSize.height, r = n.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), t = r / i, t > 1 && (t = 1), 0 > t && (t = 0), "vertical" === this.orientation && (t = 1 - t), u = this._valueMax() - this._valueMin(), f = this._valueMin() + t * u, this._trimAlignValue(f)
        },
        _uiHash: function(n, t, i) {
            var r = {
                handle: this.handles[n],
                handleIndex: n,
                value: void 0 !== t ? t : this.value()
            };
            return this._hasMultipleValues() && (r.value = void 0 !== t ? t : this.values(n), r.values = i || this.values()), r
        },
        _hasMultipleValues: function() {
            return this.options.values && this.options.values.length
        },
        _start: function(n, t) {
            return this._trigger("start", n, this._uiHash(t))
        },
        _slide: function(n, t, i) {
            var u, r, f = this.value(),
                e = this.values();
            this._hasMultipleValues() && (r = this.values(t ? 0 : 1), f = this.values(t), 2 === this.options.values.length && this.options.range === !0 && (i = 0 === t ? Math.min(r, i) : Math.max(r, i)), e[t] = i);
            i !== f && (u = this._trigger("slide", n, this._uiHash(t, i, e)), u !== !1 && (this._hasMultipleValues() ? this.values(t, i) : this.value(i)))
        },
        _stop: function(n, t) {
            this._trigger("stop", n, this._uiHash(t))
        },
        _change: function(n, t) {
            this._keySliding || this._mouseSliding || (this._lastChangedValue = t, this._trigger("change", n, this._uiHash(t)))
        },
        value: function(n) {
            return arguments.length ? (this.options.value = this._trimAlignValue(n), this._refreshValue(), this._change(null, 0), void 0) : this._value()
        },
        values: function(t, i) {
            var u, f, r;
            if (arguments.length > 1) return this.options.values[t] = this._trimAlignValue(i), this._refreshValue(), this._change(null, t), void 0;
            if (!arguments.length) return this._values();
            if (!n.isArray(arguments[0])) return this._hasMultipleValues() ? this._values(t) : this.value();
            for (u = this.options.values, f = arguments[0], r = 0; u.length > r; r += 1) u[r] = this._trimAlignValue(f[r]), this._change(null, r);
            this._refreshValue()
        },
        _setOption: function(t, i) {
            var r, u = 0;
            switch ("range" === t && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), n.isArray(this.options.values) && (u = this.options.values.length), this._super(t, i), t) {
                case "orientation":
                    this._detectOrientation();
                    this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-" + this.orientation);
                    this._refreshValue();
                    this.options.range && this._refreshRange(i);
                    this.handles.css("horizontal" === i ? "bottom" : "left", "");
                    break;
                case "value":
                    this._animateOff = !0;
                    this._refreshValue();
                    this._change(null, 0);
                    this._animateOff = !1;
                    break;
                case "values":
                    for (this._animateOff = !0, this._refreshValue(), r = u - 1; r >= 0; r--) this._change(null, r);
                    this._animateOff = !1;
                    break;
                case "step":
                case "min":
                case "max":
                    this._animateOff = !0;
                    this._calculateNewMax();
                    this._refreshValue();
                    this._animateOff = !1;
                    break;
                case "range":
                    this._animateOff = !0;
                    this._refresh();
                    this._animateOff = !1
            }
        },
        _setOptionDisabled: function(n) {
            this._super(n);
            this._toggleClass(null, "ui-state-disabled", !!n)
        },
        _value: function() {
            var n = this.options.value;
            return this._trimAlignValue(n)
        },
        _values: function(n) {
            var r, t, i;
            if (arguments.length) return r = this.options.values[n], r = this._trimAlignValue(r);
            if (this._hasMultipleValues()) {
                for (t = this.options.values.slice(), i = 0; t.length > i; i += 1) t[i] = this._trimAlignValue(t[i]);
                return t
            }
            return []
        },
        _trimAlignValue: function(n) {
            if (this._valueMin() >= n) return this._valueMin();
            if (n >= this._valueMax()) return this._valueMax();
            var t = this.options.step > 0 ? this.options.step : 1,
                i = (n - this._valueMin()) % t,
                r = n - i;
            return 2 * Math.abs(i) >= t && (r += i > 0 ? t : -t), parseFloat(r.toFixed(5))
        },
        _calculateNewMax: function() {
            var n = this.options.max,
                i = this._valueMin(),
                t = this.options.step,
                r = Math.round((n - i) / t) * t;
            n = r + i;
            n > this.options.max && (n -= t);
            this.max = parseFloat(n.toFixed(this._precision()))
        },
        _precision: function() {
            var n = this._precisionOf(this.options.step);
            return null !== this.options.min && (n = Math.max(n, this._precisionOf(this.options.min))), n
        },
        _precisionOf: function(n) {
            var t = "" + n,
                i = t.indexOf(".");
            return -1 === i ? 0 : t.length - i - 1
        },
        _valueMin: function() {
            return this.options.min
        },
        _valueMax: function() {
            return this.max
        },
        _refreshRange: function(n) {
            "vertical" === n && this.range.css({
                width: "",
                left: ""
            });
            "horizontal" === n && this.range.css({
                height: "",
                bottom: ""
            })
        },
        _refreshValue: function() {
            var s, t, c, f, h, e = this.options.range,
                i = this.options,
                r = this,
                u = this._animateOff ? !1 : i.animate,
                o = {};
            this._hasMultipleValues() ? this.handles.each(function(f) {
                t = 100 * ((r.values(f) - r._valueMin()) / (r._valueMax() - r._valueMin()));
                o["horizontal" === r.orientation ? "left" : "bottom"] = t + "%";
                n(this).stop(1, 1)[u ? "animate" : "css"](o, i.animate);
                r.options.range === !0 && ("horizontal" === r.orientation ? (0 === f && r.range.stop(1, 1)[u ? "animate" : "css"]({
                    left: t + "%"
                }, i.animate), 1 === f && r.range[u ? "animate" : "css"]({
                    width: t - s + "%"
                }, {
                    queue: !1,
                    duration: i.animate
                })) : (0 === f && r.range.stop(1, 1)[u ? "animate" : "css"]({
                    bottom: t + "%"
                }, i.animate), 1 === f && r.range[u ? "animate" : "css"]({
                    height: t - s + "%"
                }, {
                    queue: !1,
                    duration: i.animate
                })));
                s = t
            }) : (c = this.value(), f = this._valueMin(), h = this._valueMax(), t = h !== f ? 100 * ((c - f) / (h - f)) : 0, o["horizontal" === this.orientation ? "left" : "bottom"] = t + "%", this.handle.stop(1, 1)[u ? "animate" : "css"](o, i.animate), "min" === e && "horizontal" === this.orientation && this.range.stop(1, 1)[u ? "animate" : "css"]({
                width: t + "%"
            }, i.animate), "max" === e && "horizontal" === this.orientation && this.range.stop(1, 1)[u ? "animate" : "css"]({
                width: 100 - t + "%"
            }, i.animate), "min" === e && "vertical" === this.orientation && this.range.stop(1, 1)[u ? "animate" : "css"]({
                height: t + "%"
            }, i.animate), "max" === e && "vertical" === this.orientation && this.range.stop(1, 1)[u ? "animate" : "css"]({
                height: 100 - t + "%"
            }, i.animate))
        },
        _handleEvents: {
            keydown: function(t) {
                var e, r, i, u, f = n(t.target).data("ui-slider-handle-index");
                switch (t.keyCode) {
                    case n.ui.keyCode.HOME:
                    case n.ui.keyCode.END:
                    case n.ui.keyCode.PAGE_UP:
                    case n.ui.keyCode.PAGE_DOWN:
                    case n.ui.keyCode.UP:
                    case n.ui.keyCode.RIGHT:
                    case n.ui.keyCode.DOWN:
                    case n.ui.keyCode.LEFT:
                        if (t.preventDefault(), !this._keySliding && (this._keySliding = !0, this._addClass(n(t.target), null, "ui-state-active"), e = this._start(t, f), e === !1)) return
                }
                switch (u = this.options.step, r = i = this._hasMultipleValues() ? this.values(f) : this.value(), t.keyCode) {
                    case n.ui.keyCode.HOME:
                        i = this._valueMin();
                        break;
                    case n.ui.keyCode.END:
                        i = this._valueMax();
                        break;
                    case n.ui.keyCode.PAGE_UP:
                        i = this._trimAlignValue(r + (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case n.ui.keyCode.PAGE_DOWN:
                        i = this._trimAlignValue(r - (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case n.ui.keyCode.UP:
                    case n.ui.keyCode.RIGHT:
                        if (r === this._valueMax()) return;
                        i = this._trimAlignValue(r + u);
                        break;
                    case n.ui.keyCode.DOWN:
                    case n.ui.keyCode.LEFT:
                        if (r === this._valueMin()) return;
                        i = this._trimAlignValue(r - u)
                }
                this._slide(t, f, i)
            },
            keyup: function(t) {
                var i = n(t.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1, this._stop(t, i), this._change(t, i), this._removeClass(n(t.target), null, "ui-state-active"))
            }
        }
    });
    n.widget("ui.sortable", n.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _isOverAxis: function(n, t, i) {
            return n >= t && t + i > n
        },
        _isFloating: function(n) {
            return /left|right/.test(n.css("float")) || /inline|table-cell/.test(n.css("display"))
        },
        _create: function() {
            this.containerCache = {};
            this._addClass("ui-sortable");
            this.refresh();
            this.offset = this.element.offset();
            this._mouseInit();
            this._setHandleClassName();
            this.ready = !0
        },
        _setOption: function(n, t) {
            this._super(n, t);
            "handle" === n && this._setHandleClassName()
        },
        _setHandleClassName: function() {
            var t = this;
            this._removeClass(this.element.find(".ui-sortable-handle"), "ui-sortable-handle");
            n.each(this.items, function() {
                t._addClass(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item, "ui-sortable-handle")
            })
        },
        _destroy: function() {
            this._mouseDestroy();
            for (var n = this.items.length - 1; n >= 0; n--) this.items[n].item.removeData(this.widgetName + "-item");
            return this
        },
        _mouseCapture: function(t, i) {
            var r = null,
                f = !1,
                u = this;
            return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(t), n(t.target).parents().each(function() {
                if (n.data(this, u.widgetName + "-item") === u) return (r = n(this), !1)
            }), n.data(t.target, u.widgetName + "-item") === u && (r = n(t.target)), r ? !this.options.handle || i || (n(this.options.handle, r).find("*").addBack().each(function() {
                this === t.target && (f = !0)
            }), f) ? (this.currentItem = r, this._removeCurrentsFromItems(), !0) : !1 : !1)
        },
        _mouseStart: function(t, i, r) {
            var f, e, u = this.options;
            if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(t), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                }, n.extend(this.offset, {
                    click: {
                        left: t.pageX - this.offset.left,
                        top: t.pageY - this.offset.top
                    },
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, u.cursorAt && this._adjustOffsetFromHelper(u.cursorAt), this.domPosition = {
                    prev: this.currentItem.prev()[0],
                    parent: this.currentItem.parent()[0]
                }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), u.containment && this._setContainment(), u.cursor && "auto" !== u.cursor && (e = this.document.find("body"), this.storedCursor = e.css("cursor"), e.css("cursor", u.cursor), this.storedStylesheet = n("<style>*{ cursor: " + u.cursor + " !important; }<\/style>").appendTo(e)), u.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", u.opacity)), u.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", u.zIndex)), this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", t, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !r)
                for (f = this.containers.length - 1; f >= 0; f--) this.containers[f]._trigger("activate", t, this._uiHash(this));
            return n.ui.ddmanager && (n.ui.ddmanager.current = this), n.ui.ddmanager && !u.dropBehaviour && n.ui.ddmanager.prepareOffsets(this, t), this.dragging = !0, this._addClass(this.helper, "ui-sortable-helper"), this._mouseDrag(t), !0
        },
        _mouseDrag: function(t) {
            var e, u, f, o, i = this.options,
                r = !1;
            for (this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < i.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + i.scrollSpeed : t.pageY - this.overflowOffset.top < i.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - i.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < i.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + i.scrollSpeed : t.pageX - this.overflowOffset.left < i.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - i.scrollSpeed)) : (t.pageY - this.document.scrollTop() < i.scrollSensitivity ? r = this.document.scrollTop(this.document.scrollTop() - i.scrollSpeed) : this.window.height() - (t.pageY - this.document.scrollTop()) < i.scrollSensitivity && (r = this.document.scrollTop(this.document.scrollTop() + i.scrollSpeed)), t.pageX - this.document.scrollLeft() < i.scrollSensitivity ? r = this.document.scrollLeft(this.document.scrollLeft() - i.scrollSpeed) : this.window.width() - (t.pageX - this.document.scrollLeft()) < i.scrollSensitivity && (r = this.document.scrollLeft(this.document.scrollLeft() + i.scrollSpeed))), r !== !1 && n.ui.ddmanager && !i.dropBehaviour && n.ui.ddmanager.prepareOffsets(this, t)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), e = this.items.length - 1; e >= 0; e--)
                if (u = this.items[e], f = u.item[0], o = this._intersectsWithPointer(u), o && u.instance === this.currentContainer && f !== this.currentItem[0] && this.placeholder[1 === o ? "next" : "prev"]()[0] !== f && !n.contains(this.placeholder[0], f) && ("semi-dynamic" === this.options.type ? !n.contains(this.element[0], f) : !0)) {
                    if (this.direction = 1 === o ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(u)) break;
                    this._rearrange(t, u);
                    this._trigger("change", t, this._uiHash());
                    break
                }
            return this._contactContainers(t), n.ui.ddmanager && n.ui.ddmanager.drag(this, t), this._trigger("sort", t, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
        },
        _mouseStop: function(t, i) {
            if (t) {
                if (n.ui.ddmanager && !this.options.dropBehaviour && n.ui.ddmanager.drop(this, t), this.options.revert) {
                    var e = this,
                        f = this.placeholder.offset(),
                        r = this.options.axis,
                        u = {};
                    r && "x" !== r || (u.left = f.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft));
                    r && "y" !== r || (u.top = f.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop));
                    this.reverting = !0;
                    n(this.helper).animate(u, parseInt(this.options.revert, 10) || 500, function() {
                        e._clear(t)
                    })
                } else this._clear(t, i);
                return !1
            }
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp(new n.Event("mouseup", {
                    target: null
                }));
                "original" === this.options.helper ? (this.currentItem.css(this._storedCSS), this._removeClass(this.currentItem, "ui-sortable-helper")) : this.currentItem.show();
                for (var t = this.containers.length - 1; t >= 0; t--) this.containers[t]._trigger("deactivate", null, this._uiHash(this)), this.containers[t].containerCache.over && (this.containers[t]._trigger("out", null, this._uiHash(this)), this.containers[t].containerCache.over = 0)
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), n.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }), this.domPosition.prev ? n(this.domPosition.prev).after(this.currentItem) : n(this.domPosition.parent).prepend(this.currentItem)), this
        },
        serialize: function(t) {
            var r = this._getItemsAsjQuery(t && t.connected),
                i = [];
            return t = t || {}, n(r).each(function() {
                var r = (n(t.item || this).attr(t.attribute || "id") || "").match(t.expression || /(.+)[\-=_](.+)/);
                r && i.push((t.key || r[1] + "[]") + "=" + (t.key && t.expression ? r[1] : r[2]))
            }), !i.length && t.key && i.push(t.key + "="), i.join("&")
        },
        toArray: function(t) {
            var r = this._getItemsAsjQuery(t && t.connected),
                i = [];
            return t = t || {}, r.each(function() {
                i.push(n(t.item || this).attr(t.attribute || "id") || "")
            }), i
        },
        _intersectsWith: function(n) {
            var t = this.positionAbs.left,
                h = t + this.helperProportions.width,
                i = this.positionAbs.top,
                c = i + this.helperProportions.height,
                r = n.left,
                f = r + n.width,
                u = n.top,
                e = u + n.height,
                o = this.offset.click.top,
                s = this.offset.click.left,
                l = "x" === this.options.axis || i + o > u && e > i + o,
                a = "y" === this.options.axis || t + s > r && f > t + s,
                v = l && a;
            return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > n[this.floating ? "width" : "height"] ? v : t + this.helperProportions.width / 2 > r && f > h - this.helperProportions.width / 2 && i + this.helperProportions.height / 2 > u && e > c - this.helperProportions.height / 2
        },
        _intersectsWithPointer: function(n) {
            var t, i, r = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, n.top, n.height),
                u = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, n.left, n.width),
                f = r && u;
            return f ? (t = this._getDragVerticalDirection(), i = this._getDragHorizontalDirection(), this.floating ? "right" === i || "down" === t ? 2 : 1 : t && ("down" === t ? 2 : 1)) : !1
        },
        _intersectsWithSides: function(n) {
            var r = this._isOverAxis(this.positionAbs.top + this.offset.click.top, n.top + n.height / 2, n.height),
                u = this._isOverAxis(this.positionAbs.left + this.offset.click.left, n.left + n.width / 2, n.width),
                t = this._getDragVerticalDirection(),
                i = this._getDragHorizontalDirection();
            return this.floating && i ? "right" === i && u || "left" === i && !u : t && ("down" === t && r || "up" === t && !r)
        },
        _getDragVerticalDirection: function() {
            var n = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 !== n && (n > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function() {
            var n = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 !== n && (n > 0 ? "right" : "left")
        },
        refresh: function(n) {
            return this._refreshItems(n), this._setHandleClassName(), this.refreshPositions(), this
        },
        _connectWith: function() {
            var n = this.options;
            return n.connectWith.constructor === String ? [n.connectWith] : n.connectWith
        },
        _getItemsAsjQuery: function(t) {
            function h() {
                s.push(this)
            }
            var r, u, e, i, s = [],
                f = [],
                o = this._connectWith();
            if (o && t)
                for (r = o.length - 1; r >= 0; r--)
                    for (e = n(o[r], this.document[0]), u = e.length - 1; u >= 0; u--) i = n.data(e[u], this.widgetFullName), i && i !== this && !i.options.disabled && f.push([n.isFunction(i.options.items) ? i.options.items.call(i.element) : n(i.options.items, i.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), i]);
            for (f.push([n.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                    options: this.options,
                    item: this.currentItem
                }) : n(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), r = f.length - 1; r >= 0; r--) f[r][0].each(h);
            return n(s)
        },
        _removeCurrentsFromItems: function() {
            var t = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = n.grep(this.items, function(n) {
                for (var i = 0; t.length > i; i++)
                    if (t[i] === n.item[0]) return !1;
                return !0
            })
        },
        _refreshItems: function(t) {
            this.items = [];
            this.containers = [this];
            var r, u, e, i, o, s, h, l, a = this.items,
                f = [
                    [n.isFunction(this.options.items) ? this.options.items.call(this.element[0], t, {
                        item: this.currentItem
                    }) : n(this.options.items, this.element), this]
                ],
                c = this._connectWith();
            if (c && this.ready)
                for (r = c.length - 1; r >= 0; r--)
                    for (e = n(c[r], this.document[0]), u = e.length - 1; u >= 0; u--) i = n.data(e[u], this.widgetFullName), i && i !== this && !i.options.disabled && (f.push([n.isFunction(i.options.items) ? i.options.items.call(i.element[0], t, {
                        item: this.currentItem
                    }) : n(i.options.items, i.element), i]), this.containers.push(i));
            for (r = f.length - 1; r >= 0; r--)
                for (o = f[r][1], s = f[r][0], u = 0, l = s.length; l > u; u++) h = n(s[u]), h.data(this.widgetName + "-item", o), a.push({
                    item: h,
                    instance: o,
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0
                })
        },
        refreshPositions: function(t) {
            this.floating = this.items.length ? "x" === this.options.axis || this._isFloating(this.items[0].item) : !1;
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            for (var r, f, u, i = this.items.length - 1; i >= 0; i--) r = this.items[i], r.instance !== this.currentContainer && this.currentContainer && r.item[0] !== this.currentItem[0] || (f = this.options.toleranceElement ? n(this.options.toleranceElement, r.item) : r.item, t || (r.width = f.outerWidth(), r.height = f.outerHeight()), u = f.offset(), r.left = u.left, r.top = u.top);
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
            else
                for (i = this.containers.length - 1; i >= 0; i--) u = this.containers[i].element.offset(), this.containers[i].containerCache.left = u.left, this.containers[i].containerCache.top = u.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
            return this
        },
        _createPlaceholder: function(t) {
            t = t || this;
            var r, i = t.options;
            i.placeholder && i.placeholder.constructor !== String || (r = i.placeholder, i.placeholder = {
                element: function() {
                    var u = t.currentItem[0].nodeName.toLowerCase(),
                        i = n("<" + u + ">", t.document[0]);
                    return t._addClass(i, "ui-sortable-placeholder", r || t.currentItem[0].className)._removeClass(i, "ui-sortable-helper"), "tbody" === u ? t._createTrPlaceholder(t.currentItem.find("tr").eq(0), n("<tr>", t.document[0]).appendTo(i)) : "tr" === u ? t._createTrPlaceholder(t.currentItem, i) : "img" === u && i.attr("src", t.currentItem.attr("src")), r || i.css("visibility", "hidden"), i
                },
                update: function(n, u) {
                    (!r || i.forcePlaceholderSize) && (u.height() || u.height(t.currentItem.innerHeight() - parseInt(t.currentItem.css("paddingTop") || 0, 10) - parseInt(t.currentItem.css("paddingBottom") || 0, 10)), u.width() || u.width(t.currentItem.innerWidth() - parseInt(t.currentItem.css("paddingLeft") || 0, 10) - parseInt(t.currentItem.css("paddingRight") || 0, 10)))
                }
            });
            t.placeholder = n(i.placeholder.element.call(t.element, t.currentItem));
            t.currentItem.after(t.placeholder);
            i.placeholder.update(t, t.placeholder)
        },
        _createTrPlaceholder: function(t, i) {
            var r = this;
            t.children().each(function() {
                n("<td>&#160;<\/td>", r.document[0]).attr("colspan", n(this).attr("colspan") || 1).appendTo(i)
            })
        },
        _contactContainers: function(t) {
            for (var u, c, f, a, v, o, l, s, h, e = null, i = null, r = this.containers.length - 1; r >= 0; r--)
                if (!n.contains(this.currentItem[0], this.containers[r].element[0]))
                    if (this._intersectsWith(this.containers[r].containerCache)) {
                        if (e && n.contains(this.containers[r].element[0], e.element[0])) continue;
                        e = this.containers[r];
                        i = r
                    } else this.containers[r].containerCache.over && (this.containers[r]._trigger("out", t, this._uiHash(this)), this.containers[r].containerCache.over = 0);
            if (e)
                if (1 === this.containers.length) this.containers[i].containerCache.over || (this.containers[i]._trigger("over", t, this._uiHash(this)), this.containers[i].containerCache.over = 1);
                else {
                    for (c = 1e4, f = null, s = e.floating || this._isFloating(this.currentItem), a = s ? "left" : "top", v = s ? "width" : "height", h = s ? "pageX" : "pageY", u = this.items.length - 1; u >= 0; u--) n.contains(this.containers[i].element[0], this.items[u].item[0]) && this.items[u].item[0] !== this.currentItem[0] && (o = this.items[u].item.offset()[a], l = !1, t[h] - o > this.items[u][v] / 2 && (l = !0), c > Math.abs(t[h] - o) && (c = Math.abs(t[h] - o), f = this.items[u], this.direction = l ? "up" : "down"));
                    if (!f && !this.options.dropOnEmpty) return;
                    if (this.currentContainer === this.containers[i]) return this.currentContainer.containerCache.over || (this.containers[i]._trigger("over", t, this._uiHash()), this.currentContainer.containerCache.over = 1), void 0;
                    f ? this._rearrange(t, f, null, !0) : this._rearrange(t, null, this.containers[i].element, !0);
                    this._trigger("change", t, this._uiHash());
                    this.containers[i]._trigger("change", t, this._uiHash(this));
                    this.currentContainer = this.containers[i];
                    this.options.placeholder.update(this.currentContainer, this.placeholder);
                    this.containers[i]._trigger("over", t, this._uiHash(this));
                    this.containers[i].containerCache.over = 1
                }
        },
        _createHelper: function(t) {
            var r = this.options,
                i = n.isFunction(r.helper) ? n(r.helper.apply(this.element[0], [t, this.currentItem])) : "clone" === r.helper ? this.currentItem.clone() : this.currentItem;
            return i.parents("body").length || n("parent" !== r.appendTo ? r.appendTo : this.currentItem[0].parentNode)[0].appendChild(i[0]), i[0] === this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }), (!i[0].style.width || r.forceHelperSize) && i.width(this.currentItem.width()), (!i[0].style.height || r.forceHelperSize) && i.height(this.currentItem.height()), i
        },
        _adjustOffsetFromHelper: function(t) {
            "string" == typeof t && (t = t.split(" "));
            n.isArray(t) && (t = {
                left: +t[0],
                top: +t[1] || 0
            });
            "left" in t && (this.offset.click.left = t.left + this.margins.left);
            "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left);
            "top" in t && (this.offset.click.top = t.top + this.margins.top);
            "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var t = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== this.document[0] && n.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && n.ui.ie) && (t = {
                top: 0,
                left: 0
            }), {
                top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" === this.cssPosition) {
                var n = this.currentItem.position();
                return {
                    top: n.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: n.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var t, r, u, i = this.options;
            "parent" === i.containment && (i.containment = this.helper[0].parentNode);
            ("document" === i.containment || "window" === i.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, "document" === i.containment ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, ("document" === i.containment ? this.document.height() || document.body.parentNode.scrollHeight : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]);
            /^(document|window|parent)$/.test(i.containment) || (t = n(i.containment)[0], r = n(i.containment).offset(), u = "hidden" !== n(t).css("overflow"), this.containment = [r.left + (parseInt(n(t).css("borderLeftWidth"), 10) || 0) + (parseInt(n(t).css("paddingLeft"), 10) || 0) - this.margins.left, r.top + (parseInt(n(t).css("borderTopWidth"), 10) || 0) + (parseInt(n(t).css("paddingTop"), 10) || 0) - this.margins.top, r.left + (u ? Math.max(t.scrollWidth, t.offsetWidth) : t.offsetWidth) - (parseInt(n(t).css("borderLeftWidth"), 10) || 0) - (parseInt(n(t).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, r.top + (u ? Math.max(t.scrollHeight, t.offsetHeight) : t.offsetHeight) - (parseInt(n(t).css("borderTopWidth"), 10) || 0) - (parseInt(n(t).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
        },
        _convertPositionTo: function(t, i) {
            i || (i = this.position);
            var r = "absolute" === t ? 1 : -1,
                u = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && n.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                f = /(html|body)/i.test(u[0].tagName);
            return {
                top: i.top + this.offset.relative.top * r + this.offset.parent.top * r - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : f ? 0 : u.scrollTop()) * r,
                left: i.left + this.offset.relative.left * r + this.offset.parent.left * r - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : f ? 0 : u.scrollLeft()) * r
            }
        },
        _generatePosition: function(t) {
            var r, u, i = this.options,
                f = t.pageX,
                e = t.pageY,
                o = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && n.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                s = /(html|body)/i.test(o[0].tagName);
            return "relative" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (t.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left), t.pageY - this.offset.click.top < this.containment[1] && (e = this.containment[1] + this.offset.click.top), t.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left), t.pageY - this.offset.click.top > this.containment[3] && (e = this.containment[3] + this.offset.click.top)), i.grid && (r = this.originalPageY + Math.round((e - this.originalPageY) / i.grid[1]) * i.grid[1], e = this.containment ? r - this.offset.click.top >= this.containment[1] && r - this.offset.click.top <= this.containment[3] ? r : r - this.offset.click.top >= this.containment[1] ? r - i.grid[1] : r + i.grid[1] : r, u = this.originalPageX + Math.round((f - this.originalPageX) / i.grid[0]) * i.grid[0], f = this.containment ? u - this.offset.click.left >= this.containment[0] && u - this.offset.click.left <= this.containment[2] ? u : u - this.offset.click.left >= this.containment[0] ? u - i.grid[0] : u + i.grid[0] : u)), {
                top: e - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : s ? 0 : o.scrollTop()),
                left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : s ? 0 : o.scrollLeft())
            }
        },
        _rearrange: function(n, t, i, r) {
            i ? i[0].appendChild(this.placeholder[0]) : t.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? t.item[0] : t.item[0].nextSibling);
            this.counter = this.counter ? ++this.counter : 1;
            var u = this.counter;
            this._delay(function() {
                u === this.counter && this.refreshPositions(!r)
            })
        },
        _clear: function(n, t) {
            function u(n, t, i) {
                return function(r) {
                    i._trigger(n, r, t._uiHash(t))
                }
            }
            this.reverting = !1;
            var i, r = [];
            if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                for (i in this._storedCSS)("auto" === this._storedCSS[i] || "static" === this._storedCSS[i]) && (this._storedCSS[i] = "");
                this.currentItem.css(this._storedCSS);
                this._removeClass(this.currentItem, "ui-sortable-helper")
            } else this.currentItem.show();
            for (this.fromOutside && !t && r.push(function(n) {
                    this._trigger("receive", n, this._uiHash(this.fromOutside))
                }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || t || r.push(function(n) {
                    this._trigger("update", n, this._uiHash())
                }), this !== this.currentContainer && (t || (r.push(function(n) {
                    this._trigger("remove", n, this._uiHash())
                }), r.push(function(n) {
                    return function(t) {
                        n._trigger("receive", t, this._uiHash(this))
                    }
                }.call(this, this.currentContainer)), r.push(function(n) {
                    return function(t) {
                        n._trigger("update", t, this._uiHash(this))
                    }
                }.call(this, this.currentContainer)))), i = this.containers.length - 1; i >= 0; i--) t || r.push(u("deactivate", this, this.containers[i])), this.containers[i].containerCache.over && (r.push(u("out", this, this.containers[i])), this.containers[i].containerCache.over = 0);
            if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, t || this._trigger("beforeStop", n, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null), !t) {
                for (i = 0; r.length > i; i++) r[i].call(this, n);
                this._trigger("stop", n, this._uiHash())
            }
            return this.fromOutside = !1, !this.cancelHelperRemoval
        },
        _trigger: function() {
            n.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
        },
        _uiHash: function(t) {
            var i = t || this;
            return {
                helper: i.helper,
                placeholder: i.placeholder || n([]),
                position: i.position,
                originalPosition: i.originalPosition,
                offset: i.positionAbs,
                item: i.currentItem,
                sender: t ? t.element : null
            }
        }
    });
    n.widget("ui.spinner", {
        version: "1.12.1",
        defaultElement: "<input>",
        widgetEventPrefix: "spin",
        options: {
            classes: {
                "ui-spinner": "ui-corner-all",
                "ui-spinner-down": "ui-corner-br",
                "ui-spinner-up": "ui-corner-tr"
            },
            culture: null,
            icons: {
                down: "ui-icon-triangle-1-s",
                up: "ui-icon-triangle-1-n"
            },
            incremental: !0,
            max: null,
            min: null,
            numberFormat: null,
            page: 10,
            step: 1,
            change: null,
            spin: null,
            start: null,
            stop: null
        },
        _create: function() {
            this._setOption("max", this.options.max);
            this._setOption("min", this.options.min);
            this._setOption("step", this.options.step);
            "" !== this.value() && this._value(this.element.val(), !0);
            this._draw();
            this._on(this._events);
            this._refresh();
            this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _getCreateOptions: function() {
            var t = this._super(),
                i = this.element;
            return n.each(["min", "max", "step"], function(n, r) {
                var u = i.attr(r);
                null != u && u.length && (t[r] = u)
            }), t
        },
        _events: {
            keydown: function(n) {
                this._start(n) && this._keydown(n) && n.preventDefault()
            },
            keyup: "_stop",
            focus: function() {
                this.previous = this.element.val()
            },
            blur: function(n) {
                return this.cancelBlur ? (delete this.cancelBlur, void 0) : (this._stop(), this._refresh(), this.previous !== this.element.val() && this._trigger("change", n), void 0)
            },
            mousewheel: function(n, t) {
                if (t) {
                    if (!this.spinning && !this._start(n)) return !1;
                    this._spin((t > 0 ? 1 : -1) * this.options.step, n);
                    clearTimeout(this.mousewheelTimer);
                    this.mousewheelTimer = this._delay(function() {
                        this.spinning && this._stop(n)
                    }, 100);
                    n.preventDefault()
                }
            },
            "mousedown .ui-spinner-button": function(t) {
                function r() {
                    var t = this.element[0] === n.ui.safeActiveElement(this.document[0]);
                    t || (this.element.trigger("focus"), this.previous = i, this._delay(function() {
                        this.previous = i
                    }))
                }
                var i;
                i = this.element[0] === n.ui.safeActiveElement(this.document[0]) ? this.previous : this.element.val();
                t.preventDefault();
                r.call(this);
                this.cancelBlur = !0;
                this._delay(function() {
                    delete this.cancelBlur;
                    r.call(this)
                });
                this._start(t) !== !1 && this._repeat(null, n(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, t)
            },
            "mouseup .ui-spinner-button": "_stop",
            "mouseenter .ui-spinner-button": function(t) {
                if (n(t.currentTarget).hasClass("ui-state-active")) return this._start(t) === !1 ? !1 : (this._repeat(null, n(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, t), void 0)
            },
            "mouseleave .ui-spinner-button": "_stop"
        },
        _enhance: function() {
            this.uiSpinner = this.element.attr("autocomplete", "off").wrap("<span>").parent().append("<a><\/a><a><\/a>")
        },
        _draw: function() {
            this._enhance();
            this._addClass(this.uiSpinner, "ui-spinner", "ui-widget ui-widget-content");
            this._addClass("ui-spinner-input");
            this.element.attr("role", "spinbutton");
            this.buttons = this.uiSpinner.children("a").attr("tabIndex", -1).attr("aria-hidden", !0).button({
                classes: {
                    "ui-button": ""
                }
            });
            this._removeClass(this.buttons, "ui-corner-all");
            this._addClass(this.buttons.first(), "ui-spinner-button ui-spinner-up");
            this._addClass(this.buttons.last(), "ui-spinner-button ui-spinner-down");
            this.buttons.first().button({
                icon: this.options.icons.up,
                showLabel: !1
            });
            this.buttons.last().button({
                icon: this.options.icons.down,
                showLabel: !1
            });
            this.buttons.height() > Math.ceil(.5 * this.uiSpinner.height()) && this.uiSpinner.height() > 0 && this.uiSpinner.height(this.uiSpinner.height())
        },
        _keydown: function(t) {
            var r = this.options,
                i = n.ui.keyCode;
            switch (t.keyCode) {
                case i.UP:
                    return this._repeat(null, 1, t), !0;
                case i.DOWN:
                    return this._repeat(null, -1, t), !0;
                case i.PAGE_UP:
                    return this._repeat(null, r.page, t), !0;
                case i.PAGE_DOWN:
                    return this._repeat(null, -r.page, t), !0
            }
            return !1
        },
        _start: function(n) {
            return this.spinning || this._trigger("start", n) !== !1 ? (this.counter || (this.counter = 1), this.spinning = !0, !0) : !1
        },
        _repeat: function(n, t, i) {
            n = n || 500;
            clearTimeout(this.timer);
            this.timer = this._delay(function() {
                this._repeat(40, t, i)
            }, n);
            this._spin(t * this.options.step, i)
        },
        _spin: function(n, t) {
            var i = this.value() || 0;
            this.counter || (this.counter = 1);
            i = this._adjustValue(i + n * this._increment(this.counter));
            this.spinning && this._trigger("spin", t, {
                value: i
            }) === !1 || (this._value(i), this.counter++)
        },
        _increment: function(t) {
            var i = this.options.incremental;
            return i ? n.isFunction(i) ? i(t) : Math.floor(t * t * t / 5e4 - t * t / 500 + 17 * t / 200 + 1) : 1
        },
        _precision: function() {
            var n = this._precisionOf(this.options.step);
            return null !== this.options.min && (n = Math.max(n, this._precisionOf(this.options.min))), n
        },
        _precisionOf: function(n) {
            var t = "" + n,
                i = t.indexOf(".");
            return -1 === i ? 0 : t.length - i - 1
        },
        _adjustValue: function(n) {
            var r, i, t = this.options;
            return r = null !== t.min ? t.min : 0, i = n - r, i = Math.round(i / t.step) * t.step, n = r + i, n = parseFloat(n.toFixed(this._precision())), null !== t.max && n > t.max ? t.max : null !== t.min && t.min > n ? t.min : n
        },
        _stop: function(n) {
            this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", n))
        },
        _setOption: function(n, t) {
            var u, i, r;
            return "culture" === n || "numberFormat" === n ? (u = this._parse(this.element.val()), this.options[n] = t, this.element.val(this._format(u)), void 0) : (("max" === n || "min" === n || "step" === n) && "string" == typeof t && (t = this._parse(t)), "icons" === n && (i = this.buttons.first().find(".ui-icon"), this._removeClass(i, null, this.options.icons.up), this._addClass(i, null, t.up), r = this.buttons.last().find(".ui-icon"), this._removeClass(r, null, this.options.icons.down), this._addClass(r, null, t.down)), this._super(n, t), void 0)
        },
        _setOptionDisabled: function(n) {
            this._super(n);
            this._toggleClass(this.uiSpinner, null, "ui-state-disabled", !!n);
            this.element.prop("disabled", !!n);
            this.buttons.button(n ? "disable" : "enable")
        },
        _setOptions: t(function(n) {
            this._super(n)
        }),
        _parse: function(n) {
            return "string" == typeof n && "" !== n && (n = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(n, 10, this.options.culture) : +n), "" === n || isNaN(n) ? null : n
        },
        _format: function(n) {
            return "" === n ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(n, this.options.numberFormat, this.options.culture) : n
        },
        _refresh: function() {
            this.element.attr({
                "aria-valuemin": this.options.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._parse(this.element.val())
            })
        },
        isValid: function() {
            var n = this.value();
            return null === n ? !1 : n === this._adjustValue(n)
        },
        _value: function(n, t) {
            var i;
            "" !== n && (i = this._parse(n), null !== i && (t || (i = this._adjustValue(i)), n = this._format(i)));
            this.element.val(n);
            this._refresh()
        },
        _destroy: function() {
            this.element.prop("disabled", !1).removeAttr("autocomplete role aria-valuemin aria-valuemax aria-valuenow");
            this.uiSpinner.replaceWith(this.element)
        },
        stepUp: t(function(n) {
            this._stepUp(n)
        }),
        _stepUp: function(n) {
            this._start() && (this._spin((n || 1) * this.options.step), this._stop())
        },
        stepDown: t(function(n) {
            this._stepDown(n)
        }),
        _stepDown: function(n) {
            this._start() && (this._spin((n || 1) * -this.options.step), this._stop())
        },
        pageUp: t(function(n) {
            this._stepUp((n || 1) * this.options.page)
        }),
        pageDown: t(function(n) {
            this._stepDown((n || 1) * this.options.page)
        }),
        value: function(n) {
            return arguments.length ? (t(this._value).call(this, n), void 0) : this._parse(this.element.val())
        },
        widget: function() {
            return this.uiSpinner
        }
    });
    n.uiBackCompat !== !1 && n.widget("ui.spinner", n.ui.spinner, {
        _enhance: function() {
            this.uiSpinner = this.element.attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml())
        },
        _uiSpinnerHtml: function() {
            return "<span>"
        },
        _buttonHtml: function() {
            return "<a><\/a><a><\/a>"
        }
    });
    n.ui.spinner;
    n.widget("ui.tabs", {
        version: "1.12.1",
        delay: 300,
        options: {
            active: null,
            classes: {
                "ui-tabs": "ui-corner-all",
                "ui-tabs-nav": "ui-corner-all",
                "ui-tabs-panel": "ui-corner-bottom",
                "ui-tabs-tab": "ui-corner-top"
            },
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
        _isLocal: function() {
            var n = /#.*$/;
            return function(t) {
                var i, r;
                i = t.href.replace(n, "");
                r = location.href.replace(n, "");
                try {
                    i = decodeURIComponent(i)
                } catch (u) {}
                try {
                    r = decodeURIComponent(r)
                } catch (u) {}
                return t.hash.length > 1 && i === r
            }
        }(),
        _create: function() {
            var i = this,
                t = this.options;
            this.running = !1;
            this._addClass("ui-tabs", "ui-widget ui-widget-content");
            this._toggleClass("ui-tabs-collapsible", null, t.collapsible);
            this._processTabs();
            t.active = this._initialActive();
            n.isArray(t.disabled) && (t.disabled = n.unique(t.disabled.concat(n.map(this.tabs.filter(".ui-state-disabled"), function(n) {
                return i.tabs.index(n)
            }))).sort());
            this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(t.active) : n();
            this._refresh();
            this.active.length && this.load(t.active)
        },
        _initialActive: function() {
            var t = this.options.active,
                i = this.options.collapsible,
                r = location.hash.substring(1);
            return null === t && (r && this.tabs.each(function(i, u) {
                if (n(u).attr("aria-controls") === r) return (t = i, !1)
            }), null === t && (t = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === t || -1 === t) && (t = this.tabs.length ? 0 : !1)), t !== !1 && (t = this.tabs.index(this.tabs.eq(t)), -1 === t && (t = i ? !1 : 0)), !i && t === !1 && this.anchors.length && (t = 0), t
        },
        _getCreateEventData: function() {
            return {
                tab: this.active,
                panel: this.active.length ? this._getPanelForTab(this.active) : n()
            }
        },
        _tabKeydown: function(t) {
            var r = n(n.ui.safeActiveElement(this.document[0])).closest("li"),
                i = this.tabs.index(r),
                u = !0;
            if (!this._handlePageNav(t)) {
                switch (t.keyCode) {
                    case n.ui.keyCode.RIGHT:
                    case n.ui.keyCode.DOWN:
                        i++;
                        break;
                    case n.ui.keyCode.UP:
                    case n.ui.keyCode.LEFT:
                        u = !1;
                        i--;
                        break;
                    case n.ui.keyCode.END:
                        i = this.anchors.length - 1;
                        break;
                    case n.ui.keyCode.HOME:
                        i = 0;
                        break;
                    case n.ui.keyCode.SPACE:
                        return t.preventDefault(), clearTimeout(this.activating), this._activate(i), void 0;
                    case n.ui.keyCode.ENTER:
                        return t.preventDefault(), clearTimeout(this.activating), this._activate(i === this.options.active ? !1 : i), void 0;
                    default:
                        return
                }
                t.preventDefault();
                clearTimeout(this.activating);
                i = this._focusNextTab(i, u);
                t.ctrlKey || t.metaKey || (r.attr("aria-selected", "false"), this.tabs.eq(i).attr("aria-selected", "true"), this.activating = this._delay(function() {
                    this.option("active", i)
                }, this.delay))
            }
        },
        _panelKeydown: function(t) {
            this._handlePageNav(t) || t.ctrlKey && t.keyCode === n.ui.keyCode.UP && (t.preventDefault(), this.active.trigger("focus"))
        },
        _handlePageNav: function(t) {
            return t.altKey && t.keyCode === n.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : t.altKey && t.keyCode === n.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
        },
        _findNextTab: function(t, i) {
            function u() {
                return t > r && (t = 0), 0 > t && (t = r), t
            }
            for (var r = this.tabs.length - 1; - 1 !== n.inArray(u(), this.options.disabled);) t = i ? t + 1 : t - 1;
            return t
        },
        _focusNextTab: function(n, t) {
            return n = this._findNextTab(n, t), this.tabs.eq(n).trigger("focus"), n
        },
        _setOption: function(n, t) {
            return "active" === n ? (this._activate(t), void 0) : (this._super(n, t), "collapsible" === n && (this._toggleClass("ui-tabs-collapsible", null, t), t || this.options.active !== !1 || this._activate(0)), "event" === n && this._setupEvents(t), "heightStyle" === n && this._setupHeightStyle(t), void 0)
        },
        _sanitizeSelector: function(n) {
            return n ? n.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
        },
        refresh: function() {
            var t = this.options,
                i = this.tablist.children(":has(a[href])");
            t.disabled = n.map(i.filter(".ui-state-disabled"), function(n) {
                return i.index(n)
            });
            this._processTabs();
            t.active !== !1 && this.anchors.length ? this.active.length && !n.contains(this.tablist[0], this.active[0]) ? this.tabs.length === t.disabled.length ? (t.active = !1, this.active = n()) : this._activate(this._findNextTab(Math.max(0, t.active - 1), !1)) : t.active = this.tabs.index(this.active) : (t.active = !1, this.active = n());
            this._refresh()
        },
        _refresh: function() {
            this._setOptionDisabled(this.options.disabled);
            this._setupEvents(this.options.event);
            this._setupHeightStyle(this.options.heightStyle);
            this.tabs.not(this.active).attr({
                "aria-selected": "false",
                "aria-expanded": "false",
                tabIndex: -1
            });
            this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                "aria-hidden": "true"
            });
            this.active.length ? (this.active.attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            }), this._addClass(this.active, "ui-tabs-active", "ui-state-active"), this._getPanelForTab(this.active).show().attr({
                "aria-hidden": "false"
            })) : this.tabs.eq(0).attr("tabIndex", 0)
        },
        _processTabs: function() {
            var t = this,
                i = this.tabs,
                r = this.anchors,
                u = this.panels;
            this.tablist = this._getList().attr("role", "tablist");
            this._addClass(this.tablist, "ui-tabs-nav", "ui-helper-reset ui-helper-clearfix ui-widget-header");
            this.tablist.on("mousedown" + this.eventNamespace, "> li", function(t) {
                n(this).is(".ui-state-disabled") && t.preventDefault()
            }).on("focus" + this.eventNamespace, ".ui-tabs-anchor", function() {
                n(this).closest("li").is(".ui-state-disabled") && this.blur()
            });
            this.tabs = this.tablist.find("> li:has(a[href])").attr({
                role: "tab",
                tabIndex: -1
            });
            this._addClass(this.tabs, "ui-tabs-tab", "ui-state-default");
            this.anchors = this.tabs.map(function() {
                return n("a", this)[0]
            }).attr({
                role: "presentation",
                tabIndex: -1
            });
            this._addClass(this.anchors, "ui-tabs-anchor");
            this.panels = n();
            this.anchors.each(function(i, r) {
                var f, u, e, s = n(r).uniqueId().attr("id"),
                    o = n(r).closest("li"),
                    h = o.attr("aria-controls");
                t._isLocal(r) ? (f = r.hash, e = f.substring(1), u = t.element.find(t._sanitizeSelector(f))) : (e = o.attr("aria-controls") || n({}).uniqueId()[0].id, f = "#" + e, u = t.element.find(f), u.length || (u = t._createPanel(e), u.insertAfter(t.panels[i - 1] || t.tablist)), u.attr("aria-live", "polite"));
                u.length && (t.panels = t.panels.add(u));
                h && o.data("ui-tabs-aria-controls", h);
                o.attr({
                    "aria-controls": e,
                    "aria-labelledby": s
                });
                u.attr("aria-labelledby", s)
            });
            this.panels.attr("role", "tabpanel");
            this._addClass(this.panels, "ui-tabs-panel", "ui-widget-content");
            i && (this._off(i.not(this.tabs)), this._off(r.not(this.anchors)), this._off(u.not(this.panels)))
        },
        _getList: function() {
            return this.tablist || this.element.find("ol, ul").eq(0)
        },
        _createPanel: function(t) {
            return n("<div>").attr("id", t).data("ui-tabs-destroy", !0)
        },
        _setOptionDisabled: function(t) {
            var i, u, r;
            for (n.isArray(t) && (t.length ? t.length === this.anchors.length && (t = !0) : t = !1), r = 0; u = this.tabs[r]; r++) i = n(u), t === !0 || -1 !== n.inArray(r, t) ? (i.attr("aria-disabled", "true"), this._addClass(i, null, "ui-state-disabled")) : (i.removeAttr("aria-disabled"), this._removeClass(i, null, "ui-state-disabled"));
            this.options.disabled = t;
            this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, t === !0)
        },
        _setupEvents: function(t) {
            var i = {};
            t && n.each(t.split(" "), function(n, t) {
                i[t] = "_eventHandler"
            });
            this._off(this.anchors.add(this.tabs).add(this.panels));
            this._on(!0, this.anchors, {
                click: function(n) {
                    n.preventDefault()
                }
            });
            this._on(this.anchors, i);
            this._on(this.tabs, {
                keydown: "_tabKeydown"
            });
            this._on(this.panels, {
                keydown: "_panelKeydown"
            });
            this._focusable(this.tabs);
            this._hoverable(this.tabs)
        },
        _setupHeightStyle: function(t) {
            var i, r = this.element.parent();
            "fill" === t ? (i = r.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
                var t = n(this),
                    r = t.css("position");
                "absolute" !== r && "fixed" !== r && (i -= t.outerHeight(!0))
            }), this.element.children().not(this.panels).each(function() {
                i -= n(this).outerHeight(!0)
            }), this.panels.each(function() {
                n(this).height(Math.max(0, i - n(this).innerHeight() + n(this).height()))
            }).css("overflow", "auto")) : "auto" === t && (i = 0, this.panels.each(function() {
                i = Math.max(i, n(this).height("").height())
            }).height(i))
        },
        _eventHandler: function(t) {
            var u = this.options,
                r = this.active,
                c = n(t.currentTarget),
                i = c.closest("li"),
                f = i[0] === r[0],
                e = f && u.collapsible,
                o = e ? n() : this._getPanelForTab(i),
                s = r.length ? this._getPanelForTab(r) : n(),
                h = {
                    oldTab: r,
                    oldPanel: s,
                    newTab: e ? n() : i,
                    newPanel: o
                };
            t.preventDefault();
            i.hasClass("ui-state-disabled") || i.hasClass("ui-tabs-loading") || this.running || f && !u.collapsible || this._trigger("beforeActivate", t, h) === !1 || (u.active = e ? !1 : this.tabs.index(i), this.active = f ? n() : i, this.xhr && this.xhr.abort(), s.length || o.length || n.error("jQuery UI Tabs: Mismatching fragment identifier."), o.length && this.load(this.tabs.index(i), t), this._toggle(t, h))
        },
        _toggle: function(t, i) {
            function e() {
                r.running = !1;
                r._trigger("activate", t, i)
            }

            function o() {
                r._addClass(i.newTab.closest("li"), "ui-tabs-active", "ui-state-active");
                u.length && r.options.show ? r._show(u, r.options.show, e) : (u.show(), e())
            }
            var r = this,
                u = i.newPanel,
                f = i.oldPanel;
            this.running = !0;
            f.length && this.options.hide ? this._hide(f, this.options.hide, function() {
                r._removeClass(i.oldTab.closest("li"), "ui-tabs-active", "ui-state-active");
                o()
            }) : (this._removeClass(i.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"), f.hide(), o());
            f.attr("aria-hidden", "true");
            i.oldTab.attr({
                "aria-selected": "false",
                "aria-expanded": "false"
            });
            u.length && f.length ? i.oldTab.attr("tabIndex", -1) : u.length && this.tabs.filter(function() {
                return 0 === n(this).attr("tabIndex")
            }).attr("tabIndex", -1);
            u.attr("aria-hidden", "false");
            i.newTab.attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            })
        },
        _activate: function(t) {
            var r, i = this._findActive(t);
            i[0] !== this.active[0] && (i.length || (i = this.active), r = i.find(".ui-tabs-anchor")[0], this._eventHandler({
                target: r,
                currentTarget: r,
                preventDefault: n.noop
            }))
        },
        _findActive: function(t) {
            return t === !1 ? n() : this.tabs.eq(t)
        },
        _getIndex: function(t) {
            return "string" == typeof t && (t = this.anchors.index(this.anchors.filter("[href$='" + n.ui.escapeSelector(t) + "']"))), t
        },
        _destroy: function() {
            this.xhr && this.xhr.abort();
            this.tablist.removeAttr("role").off(this.eventNamespace);
            this.anchors.removeAttr("role tabIndex").removeUniqueId();
            this.tabs.add(this.panels).each(function() {
                n.data(this, "ui-tabs-destroy") ? n(this).remove() : n(this).removeAttr("role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded")
            });
            this.tabs.each(function() {
                var t = n(this),
                    i = t.data("ui-tabs-aria-controls");
                i ? t.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : t.removeAttr("aria-controls")
            });
            this.panels.show();
            "content" !== this.options.heightStyle && this.panels.css("height", "")
        },
        enable: function(t) {
            var i = this.options.disabled;
            i !== !1 && (void 0 === t ? i = !1 : (t = this._getIndex(t), i = n.isArray(i) ? n.map(i, function(n) {
                return n !== t ? n : null
            }) : n.map(this.tabs, function(n, i) {
                return i !== t ? i : null
            })), this._setOptionDisabled(i))
        },
        disable: function(t) {
            var i = this.options.disabled;
            if (i !== !0) {
                if (void 0 === t) i = !0;
                else {
                    if (t = this._getIndex(t), -1 !== n.inArray(t, i)) return;
                    i = n.isArray(i) ? n.merge([t], i).sort() : [t]
                }
                this._setOptionDisabled(i)
            }
        },
        load: function(t, i) {
            t = this._getIndex(t);
            var r = this,
                u = this.tabs.eq(t),
                e = u.find(".ui-tabs-anchor"),
                f = this._getPanelForTab(u),
                o = {
                    tab: u,
                    panel: f
                },
                s = function(n, t) {
                    "abort" === t && r.panels.stop(!1, !0);
                    r._removeClass(u, "ui-tabs-loading");
                    f.removeAttr("aria-busy");
                    n === r.xhr && delete r.xhr
                };
            this._isLocal(e[0]) || (this.xhr = n.ajax(this._ajaxSettings(e, i, o)), this.xhr && "canceled" !== this.xhr.statusText && (this._addClass(u, "ui-tabs-loading"), f.attr("aria-busy", "true"), this.xhr.done(function(n, t, u) {
                setTimeout(function() {
                    f.html(n);
                    r._trigger("load", i, o);
                    s(u, t)
                }, 1)
            }).fail(function(n, t) {
                setTimeout(function() {
                    s(n, t)
                }, 1)
            })))
        },
        _ajaxSettings: function(t, i, r) {
            var u = this;
            return {
                url: t.attr("href").replace(/#.*$/, ""),
                beforeSend: function(t, f) {
                    return u._trigger("beforeLoad", i, n.extend({
                        jqXHR: t,
                        ajaxSettings: f
                    }, r))
                }
            }
        },
        _getPanelForTab: function(t) {
            var i = n(t).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + i))
        }
    });
    n.uiBackCompat !== !1 && n.widget("ui.tabs", n.ui.tabs, {
        _processTabs: function() {
            this._superApply(arguments);
            this._addClass(this.tabs, "ui-tab")
        }
    });
    n.ui.tabs;
    n.widget("ui.tooltip", {
        version: "1.12.1",
        options: {
            classes: {
                "ui-tooltip": "ui-corner-all ui-widget-shadow"
            },
            content: function() {
                var t = n(this).attr("title") || "";
                return n("<a>").text(t).html()
            },
            hide: !0,
            items: "[title]:not([disabled])",
            position: {
                my: "left top+15",
                at: "left bottom",
                collision: "flipfit flip"
            },
            show: !0,
            track: !1,
            close: null,
            open: null
        },
        _addDescribedBy: function(t, i) {
            var r = (t.attr("aria-describedby") || "").split(/\s+/);
            r.push(i);
            t.data("ui-tooltip-id", i).attr("aria-describedby", n.trim(r.join(" ")))
        },
        _removeDescribedBy: function(t) {
            var u = t.data("ui-tooltip-id"),
                i = (t.attr("aria-describedby") || "").split(/\s+/),
                r = n.inArray(u, i); - 1 !== r && i.splice(r, 1);
            t.removeData("ui-tooltip-id");
            i = n.trim(i.join(" "));
            i ? t.attr("aria-describedby", i) : t.removeAttr("aria-describedby")
        },
        _create: function() {
            this._on({
                mouseover: "open",
                focusin: "open"
            });
            this.tooltips = {};
            this.parents = {};
            this.liveRegion = n("<div>").attr({
                role: "log",
                "aria-live": "assertive",
                "aria-relevant": "additions"
            }).appendTo(this.document[0].body);
            this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible");
            this.disabledTitles = n([])
        },
        _setOption: function(t, i) {
            var r = this;
            this._super(t, i);
            "content" === t && n.each(this.tooltips, function(n, t) {
                r._updateContent(t.element)
            })
        },
        _setOptionDisabled: function(n) {
            this[n ? "_disable" : "_enable"]()
        },
        _disable: function() {
            var t = this;
            n.each(this.tooltips, function(i, r) {
                var u = n.Event("blur");
                u.target = u.currentTarget = r.element[0];
                t.close(u, !0)
            });
            this.disabledTitles = this.disabledTitles.add(this.element.find(this.options.items).addBack().filter(function() {
                var t = n(this);
                if (t.is("[title]")) return t.data("ui-tooltip-title", t.attr("title")).removeAttr("title")
            }))
        },
        _enable: function() {
            this.disabledTitles.each(function() {
                var t = n(this);
                t.data("ui-tooltip-title") && t.attr("title", t.data("ui-tooltip-title"))
            });
            this.disabledTitles = n([])
        },
        open: function(t) {
            var r = this,
                i = n(t ? t.target : this.element).closest(this.options.items);
            i.length && !i.data("ui-tooltip-id") && (i.attr("title") && i.data("ui-tooltip-title", i.attr("title")), i.data("ui-tooltip-open", !0), t && "mouseover" === t.type && i.parents().each(function() {
                var i, t = n(this);
                t.data("ui-tooltip-open") && (i = n.Event("blur"), i.target = i.currentTarget = this, r.close(i, !0));
                t.attr("title") && (t.uniqueId(), r.parents[this.id] = {
                    element: this,
                    title: t.attr("title")
                }, t.attr("title", ""))
            }), this._registerCloseHandlers(t, i), this._updateContent(i, t))
        },
        _updateContent: function(n, t) {
            var r, i = this.options.content,
                u = this,
                f = t ? t.type : null;
            return "string" == typeof i || i.nodeType || i.jquery ? this._open(t, n, i) : (r = i.call(n[0], function(i) {
                u._delay(function() {
                    n.data("ui-tooltip-open") && (t && (t.type = f), this._open(t, n, i))
                })
            }), r && this._open(t, n, r), void 0)
        },
        _open: function(t, i, r) {
            function o(n) {
                s.of = n;
                u.is(":hidden") || u.position(s)
            }
            var f, u, h, e, s = n.extend({}, this.options.position);
            if (r) {
                if (f = this._find(i)) return f.tooltip.find(".ui-tooltip-content").html(r), void 0;
                i.is("[title]") && (t && "mouseover" === t.type ? i.attr("title", "") : i.removeAttr("title"));
                f = this._tooltip(i);
                u = f.tooltip;
                this._addDescribedBy(i, u.attr("id"));
                u.find(".ui-tooltip-content").html(r);
                this.liveRegion.children().hide();
                e = n("<div>").html(u.find(".ui-tooltip-content").html());
                e.removeAttr("name").find("[name]").removeAttr("name");
                e.removeAttr("id").find("[id]").removeAttr("id");
                e.appendTo(this.liveRegion);
                this.options.track && t && /^mouse/.test(t.type) ? (this._on(this.document, {
                    mousemove: o
                }), o(t)) : u.position(n.extend({
                    "of": i
                }, this.options.position));
                u.hide();
                this._show(u, this.options.show);
                this.options.track && this.options.show && this.options.show.delay && (h = this.delayedShow = setInterval(function() {
                    u.is(":visible") && (o(s.of), clearInterval(h))
                }, n.fx.interval));
                this._trigger("open", t, {
                    tooltip: u
                })
            }
        },
        _registerCloseHandlers: function(t, i) {
            var r = {
                keyup: function(t) {
                    if (t.keyCode === n.ui.keyCode.ESCAPE) {
                        var r = n.Event(t);
                        r.currentTarget = i[0];
                        this.close(r, !0)
                    }
                }
            };
            i[0] !== this.element[0] && (r.remove = function() {
                this._removeTooltip(this._find(i).tooltip)
            });
            t && "mouseover" !== t.type || (r.mouseleave = "close");
            t && "focusin" !== t.type || (r.focusout = "close");
            this._on(!0, i, r)
        },
        close: function(t) {
            var u, f = this,
                i = n(t ? t.currentTarget : this.element),
                r = this._find(i);
            return r ? (u = r.tooltip, r.closing || (clearInterval(this.delayedShow), i.data("ui-tooltip-title") && !i.attr("title") && i.attr("title", i.data("ui-tooltip-title")), this._removeDescribedBy(i), r.hiding = !0, u.stop(!0), this._hide(u, this.options.hide, function() {
                f._removeTooltip(n(this))
            }), i.removeData("ui-tooltip-open"), this._off(i, "mouseleave focusout keyup"), i[0] !== this.element[0] && this._off(i, "remove"), this._off(this.document, "mousemove"), t && "mouseleave" === t.type && n.each(this.parents, function(t, i) {
                n(i.element).attr("title", i.title);
                delete f.parents[t]
            }), r.closing = !0, this._trigger("close", t, {
                tooltip: u
            }), r.hiding || (r.closing = !1)), void 0) : (i.removeData("ui-tooltip-open"), void 0)
        },
        _tooltip: function(t) {
            var i = n("<div>").attr("role", "tooltip"),
                r = n("<div>").appendTo(i),
                u = i.uniqueId().attr("id");
            return this._addClass(r, "ui-tooltip-content"), this._addClass(i, "ui-tooltip", "ui-widget ui-widget-content"), i.appendTo(this._appendTo(t)), this.tooltips[u] = {
                element: t,
                tooltip: i
            }
        },
        _find: function(n) {
            var t = n.data("ui-tooltip-id");
            return t ? this.tooltips[t] : null
        },
        _removeTooltip: function(n) {
            n.remove();
            delete this.tooltips[n.attr("id")]
        },
        _appendTo: function(n) {
            var t = n.closest(".ui-front, dialog");
            return t.length || (t = this.document[0].body), t
        },
        _destroy: function() {
            var t = this;
            n.each(this.tooltips, function(i, r) {
                var f = n.Event("blur"),
                    u = r.element;
                f.target = f.currentTarget = u[0];
                t.close(f, !0);
                n("#" + i).remove();
                u.data("ui-tooltip-title") && (u.attr("title") || u.attr("title", u.data("ui-tooltip-title")), u.removeData("ui-tooltip-title"))
            });
            this.liveRegion.remove()
        }
    });
    n.uiBackCompat !== !1 && n.widget("ui.tooltip", n.ui.tooltip, {
        options: {
            tooltipClass: null
        },
        _tooltip: function() {
            var n = this._superApply(arguments);
            return this.options.tooltipClass && n.tooltip.addClass(this.options.tooltipClass), n
        }
    });
    n.ui.tooltip
});
AjaxCart = {
    loadWaiting: !1,
    usepopupnotifications: !1,
    topcartselector: "",
    topwishlistselector: "",
    flyoutcartselector: "",
    localized_data: !1,
    init: function(n, t, i, r, u) {
        this.loadWaiting = !1;
        this.usepopupnotifications = n;
        this.topcartselector = t;
        this.topwishlistselector = i;
        this.flyoutcartselector = r;
        this.localized_data = u
    },
    setLoadWaiting: function(n) {
        displayAjaxLoading(n);
        this.loadWaiting = n
    },
    addproducttocart_catalog: function(n) {
        if (this.loadWaiting === !1) {
            this.setLoadWaiting(!0);
            var t = {};
            addAntiForgeryToken(t);
            $.ajax({
                cache: !1,
                url: n,
                type: "POST",
                data: t,
                success: this.success_process,
                complete: this.resetLoadWaiting,
                error: this.ajaxFailure
            })
        }
    },
    addproducttocart_details: function(n, t) {
        setGlobalLoading(!0);
        $.ajax({
            cache: !1,
            url: n,
            data: $(t).serialize(),
            type: "POST",
            success: this.success_process,
            error: this.ajaxFailure
        })
    },
    addproducttocomparelist: function(n) {
        if (this.loadWaiting === !1) {
            this.setLoadWaiting(!0);
            var t = {};
            addAntiForgeryToken(t);
            $.ajax({
                cache: !1,
                url: n,
                type: "POST",
                data: t,
                success: this.success_process,
                complete: this.resetLoadWaiting,
                error: this.ajaxFailure
            })
        }
    },
    success_process: function(n) {
        if (n.redirect) location.href = n.redirect;
        else if (n.success) location.reload();
        else {
            const t = document.querySelector(".message-flash-sale");
            t.classList.add("show");
            const i = document.querySelector(".message-error-sale");
            i.innerHTML = n.message;
            setTimeout(() => {
                t.classList.remove("show")
            }, 5e3)
        }
        setGlobalLoading(!1)
    },
    resetLoadWaiting: function() {
        setGlobalLoading(!1);
        AjaxCart.setLoadWaiting(!1)
    },
    ajaxFailure: function() {
        console.log("fail;lasdsadasdsadasdsadasd44556");
        setGlobalLoading(!1)
    }
}; + function(n) {
    "use strict";

    function t() {
        var t = n(this),
            u = t.val(),
            i = n(t.data("stateprovince")),
            r;
        i.length != 0 && (r = n(t.data("loading")), r.show(), n.ajax({
            cache: !1,
            type: "GET",
            url: t.data("url"),
            data: {
                countryId: u,
                addSelectStateItem: "true"
            },
            success: function(t) {
                i.html("");
                n.each(t, function(t, r) {
                    i.append(n("<option><\/option>").val(r.id).html(r.name))
                })
            },
            error: function() {
                alert("Failed to retrieve states.")
            },
            complete: function() {
                var t = typeof Billing != "undefined" ? Billing.selectedStateId : typeof CheckoutBilling != "undefined" ? CheckoutBilling.selectedStateId : 0;
                n("#" + i[0].id + " option[value=" + t + "]").prop("selected", !0);
                r.hide()
            }
        }))
    }

    function i() {
        var f = n(this),
            h = f.val(),
            t = n(f.data("county")),
            u, e, i, r, o, s;
        states && states.length != 0 && t.length != 0 && (u = states.find(n => n.id == h), u) && (e = u.bkcId, i = [], showrooms) && (n("#receive_home")[0].checked ? i = provinces : (r = [], n.each(showrooms, function(n, t) {
            r.indexOf(t.QuanHuyenId) < 0 && r.push(t.QuanHuyenId)
        }), i = provinces.filter(n => r.includes(n.QuanHuyenId))), i) && (o = i.filter(n => n.TinhThanhId == e), t.html(""), t.append(n("<option><\/option>").val(0).html("Mời bạn chọn quận/huyện")), n.each(o, function(i, r) {
            t.append(n("<option><\/option>").val(r.QuanHuyenId).html(r.Name))
        }), s = typeof Billing != "undefined" ? Billing.selectedCountyId : typeof CheckoutBilling != "undefined" ? CheckoutBilling.selectedCountyId : 0, n("#" + t[0].id + " option[value=" + s + "]").prop("selected", !0))
    }

    function r() {
        var r = n(this),
            u = r.val(),
            t = n("#js__apply_now"),
            i;
        t.length != 0 && showrooms && (i = showrooms.filter(n => n.QuanHuyenId == u), i) && (n("#show_more_button").hide(), t.html(""), n.each(i, function(i, r) {
            var u = n('<div class="store_item"><\/div>'),
                f = n('<input type="radio" id="store_@sr.ShowroomName" name="select_receive_store" value="@sr.ShowroomName"/>').val(r.ShowroomName).attr("id", "showroom_" + i),
                e = n("<label><\/label>").attr("for", "showroom_" + i).text(r.ShowroomName);
            u.append(f).append(e);
            t.append(u)
        }))
    }

    function u() {
        var r = n(this),
            u = r.val(),
            t = n("#js__apply_now"),
            i;
        t.length != 0 && showrooms && (i = showrooms.filter(n => n.QuanHuyenId == u), i) && (t.html(""), t.append(n("<option><\/option>").val("").html("Mời bạn chọn địa chỉ cửa hàng")), n.each(i, function(i, r) {
            t.append(n("<option><\/option>").val(r.ShowroomSeName).html(r.ShowroomName))
        }))
    }
    if ("undefined" == typeof jQuery) throw new Error("jQuery JS required");
    n(document).has('[data-trigger="country-select"]') && n('select[data-trigger="country-select"]').change(t);
    n.fn.countrySelect = function() {
        this.each(function() {
            n(this).change(t)
        })
    };
    n(document).has('[data-trigger="state-select"]') && n('select[data-trigger="state-select"]').change(i);
    n(document).has('[data-trigger="store-county-select"]') && n('select[data-trigger="store-county-select"]').change(u);
    n(document).has('[data-trigger="county-select"]') && n('select[data-trigger="county-select"]').change(r)
}(jQuery),
function(n) {
    n.fn.backTop = function() {
        var t = this,
            r = 1e3,
            i = 900;
        n(document).scroll(function() {
            var u = n(window).scrollTop();
            u >= r ? t.fadeIn(i) : t.fadeOut(i)
        });
        t.click(function() {
            n("html, body").animate({
                scrollTop: 0
            }, 900)
        })
    }
}(jQuery);
$(document).ready(function() {
    $(".container.result-tsh .item-box .details a").matchHeight();
    $(".mbti-page-container .item-box").matchHeight();
    $(".mbti-page-container .item-box .details .product-title a").matchHeight();
    $(".workshop-title").matchHeight();
    $(".workshop-info").matchHeight();
    $(".product-grid.cross-sells .item-box").matchHeight();
    $(".page.shopping-cart-page .cross-sells .item-box .product-item").matchHeight();
    $(".sub-content .group-item-deal").slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: !0,
        responsive: [{
            breakpoint: 1920,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        }, {
            breakpoint: 1100,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        }, {
            breakpoint: 769,
            infinite: !0,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        }]
    });
    $(".workshop-category-list").slick({
        slidesToShow: 6,
        slidesToScroll: 6,
        infinite: !1,
        responsive: [{
            breakpoint: 1920,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 6
            }
        }, {
            breakpoint: 1e3,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        }, {
            breakpoint: 769,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        }]
    });
    $(".mbti-page-container .item-grid").slick({
        slidesToShow: 6,
        slidesToScroll: 6,
        infinite: !1,
        responsive: [{
            breakpoint: 1920,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 6
            }
        }, {
            breakpoint: 1e3,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        }, {
            breakpoint: 769,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }]
    });
    $(".container.result-tsh .item-grid").slick({
        slidesToShow: 7,
        slidesToScroll: 7,
        infinite: !1,
        responsive: [{
            breakpoint: 1920,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 6
            }
        }, {
            breakpoint: 1e3,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        }, {
            breakpoint: 769,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }]
    });
    $(".register-join a").click(function(n) {
        n.preventDefault();
        var t = $("#form-dang-ky").offset().top - 120;
        $("html, body").animate({
            scrollTop: t
        }, 1e3)
    })
});
CatalogProducts = {
    settings: {
        ajax: !1,
        fetchUrl: !1,
        browserPath: !1
    },
    params: {
        jqXHR: !1
    },
    init: function(n) {
        this.settings = $.extend({}, this.settings, n)
    },
    getProducts: function(n, t) {
        var i, u, r;
        this.params.jqXHR && this.params.jqXHR.readyState !== 4 && this.params.jqXHR.abort();
        i = createProductsURLBuilder(this.settings.browserPath);
        n && i.addParameter("pagenumber", n);
        i.addParameter("ms", t);
        u = {
            urlBuilder: i
        };
        $(this).trigger({
            type: "before",
            payload: u
        });
        this.setBrowserHistory(i.build());
        this.settings.ajax ? (this.setLoadWaiting(1), r = this, this.params.jqXHR = $.ajax({
            cache: !1,
            url: i.addBasePath(this.settings.fetchUrl).build(),
            type: "GET",
            success: function(n) {
                $(".products-wrapper").html(n);
                $(r).trigger({
                    type: "loaded"
                })
            },
            error: function() {
                $(r).trigger({
                    type: "error"
                })
            },
            complete: function() {
                r.setLoadWaiting()
            }
        })) : setLocation(i.build())
    },
    setLoadWaiting(n) {
        var t = $(".ajax-products-busy");
        n ? t.show() : t.hide()
    },
    setBrowserHistory(n) {
        window.history.replaceState({
            path: n
        }, "", n)
    }
}