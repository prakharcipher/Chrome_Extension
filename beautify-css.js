!(function() {
  function e(e, n) {
    var r,
      i = {};
    for (r in e) r !== n && (i[r] = e[r]);
    if (n in e) for (r in e[n]) i[r] = e[n][r];
    return i;
  }
  function n(t, s) {
    function a() {
      return (E = t.charAt(++O)), E || '';
    }
    function u(e) {
      var n = '',
        r = O;
      return e && c(), (n = t.charAt(O + 1) || ''), (O = r - 1), a(), n;
    }
    function p(e) {
      for (var n = O; a(); )
        if ('\\' === E) a();
        else {
          if (e.indexOf(E) !== -1) break;
          if ('\n' === E) break;
        }
      return t.substring(n, O + 1);
    }
    function o(e) {
      var n = O,
        r = p(e);
      return (O = n - 1), a(), r;
    }
    function c() {
      for (var e = ''; A.test(u()); ) a(), (e += E);
      return e;
    }
    function f() {
      var e = '';
      for (E && A.test(E) && (e = E); A.test(a()); ) e += E;
      return e;
    }
    function l(e) {
      var n = O;
      for (e = '/' === u(), a(); a(); ) {
        if (!e && '*' === E && '/' === u()) {
          a();
          break;
        }
        if (e && '\n' === E) return t.substring(n, O);
      }
      return t.substring(n, O) + E;
    }
    function h(e) {
      return t.substring(O - e.length, O).toLowerCase() === e;
    }
    function _() {
      for (var e = 0, n = O + 1; n < t.length; n++) {
        var r = t.charAt(n);
        if ('{' === r) return !0;
        if ('(' === r) e += 1;
        else if (')' === r) {
          if (0 === e) return !1;
          e -= 1;
        } else if (';' === r || '}' === r) return !1;
      }
      return !1;
    }
    function g() {
      T++, (C += N);
    }
    function d() {
      T--, (C = C.slice(0, -w));
    }
    (s = s || {}), (s = e(s, 'css')), (t = t || '');
    var w = s.indent_size ? parseInt(s.indent_size, 10) : 4,
      v = s.indent_char || ' ',
      S =
        void 0 === s.selector_separator_newline || s.selector_separator_newline,
      L = void 0 !== s.end_with_newline && s.end_with_newline,
      b = void 0 === s.newline_between_rules || s.newline_between_rules,
      m = void 0 !== s.space_around_combinator && s.space_around_combinator;
    m =
      m ||
      (void 0 !== s.space_around_selector_separator &&
        s.space_around_selector_separator);
    var y = s.eol ? s.eol : 'auto';
    s.indent_with_tabs && ((v = '\t'), (w = 1)),
      'auto' === y && ((y = '\n'), t && r.test(t || '') && (y = t.match(r)[0])),
      (y = y.replace(/\\r/, '\r').replace(/\\n/, '\n')),
      (t = t.replace(i, '\n'));
    var E,
      A = /^\s+$/,
      O = -1,
      R = 0,
      C = t.match(/^[\t ]*/)[0],
      N = new Array(w + 1).join(v),
      T = 0,
      U = 0,
      k = {};
    (k['{'] = function(e) {
      k.singleSpace(), x.push(e), k.newLine();
    }),
      (k['}'] = function(e) {
        k.newLine(), x.push(e), k.newLine();
      }),
      (k._lastCharWhitespace = function() {
        return A.test(x[x.length - 1]);
      }),
      (k.newLine = function(e) {
        x.length &&
          (e || '\n' === x[x.length - 1] || k.trim(),
          x.push('\n'),
          C && x.push(C));
      }),
      (k.singleSpace = function() {
        x.length && !k._lastCharWhitespace() && x.push(' ');
      }),
      (k.preserveSingleSpace = function() {
        G && k.singleSpace();
      }),
      (k.trim = function() {
        for (; k._lastCharWhitespace(); ) x.pop();
      });
    for (var x = [], I = !1, $ = !1, D = !1, W = '', j = ''; ; ) {
      var z = f(),
        G = '' !== z,
        P = z.indexOf('\n') !== -1;
      if (((j = W), (W = E), !E)) break;
      if ('/' === E && '*' === u()) {
        var q = 0 === T;
        (P || q) && k.newLine(), x.push(l()), k.newLine(), q && k.newLine(!0);
      } else if ('/' === E && '/' === u())
        P || '{' === j || k.trim(), k.singleSpace(), x.push(l()), k.newLine();
      else if ('@' === E)
        if ((k.preserveSingleSpace(), '{' === u())) x.push(p('}'));
        else {
          x.push(E);
          var B = o(': ,;{}()[]/=\'"');
          B.match(/[ :]$/) &&
            (a(), (B = p(': ').replace(/\s$/, '')), x.push(B), k.singleSpace()),
            (B = B.replace(/\s$/, '')),
            B in n.NESTED_AT_RULE &&
              ((U += 1), B in n.CONDITIONAL_GROUP_RULE && (D = !0));
        }
      else
        '#' === E && '{' === u()
          ? (k.preserveSingleSpace(), x.push(p('}')))
          : '{' === E
            ? '}' === u(!0)
              ? (c(),
                a(),
                k.singleSpace(),
                x.push('{}'),
                k.newLine(),
                b && 0 === T && k.newLine(!0))
              : (g(), k['{'](E), D ? ((D = !1), (I = T > U)) : (I = T >= U))
            : '}' === E
              ? (d(),
                k['}'](E),
                (I = !1),
                ($ = !1),
                U && U--,
                b && 0 === T && k.newLine(!0))
              : ':' === E
                ? (c(),
                  (!I && !D) || h('&') || _() || h('(')
                    ? (h(' ') && ' ' !== x[x.length - 1] && x.push(' '),
                      ':' === u() ? (a(), x.push('::')) : x.push(':'))
                    : (x.push(':'), $ || (($ = !0), k.singleSpace())))
                : '"' === E || "'" === E
                  ? (k.preserveSingleSpace(), x.push(p(E)))
                  : ';' === E
                    ? (($ = !1), x.push(E), k.newLine())
                    : '(' === E
                      ? h('url')
                        ? (x.push(E),
                          c(),
                          a() &&
                            (')' !== E && '"' !== E && "'" !== E
                              ? x.push(p(')'))
                              : O--))
                        : (R++, k.preserveSingleSpace(), x.push(E), c())
                      : ')' === E
                        ? (x.push(E), R--)
                        : ',' === E
                          ? (x.push(E),
                            c(),
                            S && !$ && R < 1 ? k.newLine() : k.singleSpace())
                          : ('>' === E || '+' === E || '~' === E) && !$ && R < 1
                            ? m
                              ? (k.singleSpace(), x.push(E), k.singleSpace())
                              : (x.push(E), c(), E && A.test(E) && (E = ''))
                            : ']' === E
                              ? x.push(E)
                              : '[' === E
                                ? (k.preserveSingleSpace(), x.push(E))
                                : '=' === E
                                  ? (c(), (E = '='), x.push(E))
                                  : (k.preserveSingleSpace(), x.push(E));
    }
    var F = '';
    return (
      C && (F += C),
      (F += x.join('').replace(/[\r\n\t ]+$/, '')),
      L && (F += '\n'),
      '\n' !== y && (F = F.replace(/[\n]/g, y)),
      F
    );
  }
  var r = /\r\n|[\n\r\u2028\u2029]/,
    i = new RegExp(r.source, 'g');
  (n.NESTED_AT_RULE = {
    '@page': !0,
    '@font-face': !0,
    '@keyframes': !0,
    '@media': !0,
    '@supports': !0,
    '@document': !0
  }),
    (n.CONDITIONAL_GROUP_RULE = {
      '@media': !0,
      '@supports': !0,
      '@document': !0
    }),
    'function' == typeof define && define.amd
      ? define([], function() {
          return { css_beautify: n };
        })
      : 'undefined' != typeof exports
        ? (exports.css_beautify = n)
        : 'undefined' != typeof window
          ? (window.css_beautify = n)
          : 'undefined' != typeof global && (global.css_beautify = n);
})();
//# sourceMappingURL=beautify-css.min.js.map
