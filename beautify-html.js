!(function() {
  function t(t) {
    return t.replace(/^\s+/g, '');
  }
  function e(t) {
    return t.replace(/\s+$/g, '');
  }
  function n(t, e) {
    var n,
      i = {};
    for (n in t) n !== e && (i[n] = t[n]);
    if (e in t) for (n in t[e]) i[n] = t[e][n];
    return i;
  }
  function i(i, a, h, o) {
    function _() {
      function n(t) {
        var e = '',
          n = function(n) {
            var i = e + n.toLowerCase();
            e =
              i.length <= t.length
                ? i
                : i.substr(i.length - t.length, t.length);
          },
          i = function() {
            return e.indexOf(t) === -1;
          };
        return { add: n, doesNotMatch: i };
      }
      return (
        (this.pos = 0),
        (this.token = ''),
        (this.current_mode = 'CONTENT'),
        (this.tags = { parent: 'parent1', parentcount: 1, parent1: '' }),
        (this.tag_type = ''),
        (this.token_text = this.last_token = this.last_text = this.token_type =
          ''),
        (this.newlines = 0),
        (this.indent_content = p),
        (this.indent_body_inner_html = l),
        (this.indent_head_inner_html = c),
        (this.Utils = {
          whitespace: '\n\r\t '.split(''),
          single_token: [
            'area',
            'base',
            'br',
            'col',
            'embed',
            'hr',
            'img',
            'input',
            'keygen',
            'link',
            'menuitem',
            'meta',
            'param',
            'source',
            'track',
            'wbr',
            '!doctype',
            '?xml',
            '?php',
            'basefont',
            'isindex'
          ],
          extra_liners: K,
          in_array: function(t, e) {
            for (var n = 0; n < e.length; n++) if (t === e[n]) return !0;
            return !1;
          }
        }),
        (this.is_whitespace = function(t) {
          for (var e = 0; e < t.length; e++)
            if (!this.Utils.in_array(t.charAt(e), this.Utils.whitespace))
              return !1;
          return !0;
        }),
        (this.traverse_whitespace = function() {
          var t = '';
          if (
            ((t = this.input.charAt(this.pos)),
            this.Utils.in_array(t, this.Utils.whitespace))
          ) {
            for (
              this.newlines = 0;
              this.Utils.in_array(t, this.Utils.whitespace);

            )
              w && '\n' === t && this.newlines <= y && (this.newlines += 1),
                this.pos++,
                (t = this.input.charAt(this.pos));
            return !0;
          }
          return !1;
        }),
        (this.space_or_wrap = function(t) {
          return this.line_char_count >= this.wrap_line_length
            ? (this.print_newline(!1, t), this.print_indentation(t), !0)
            : (this.line_char_count++, t.push(' '), !1);
        }),
        (this.get_content = function() {
          for (
            var t = '', e = [], n = 0;
            '<' !== this.input.charAt(this.pos) || 2 === n;

          ) {
            if (this.pos >= this.input.length)
              return e.length ? e.join('') : ['', 'TK_EOF'];
            if (this.traverse_whitespace()) this.space_or_wrap(e);
            else {
              if (((t = this.input.charAt(this.pos)), T)) {
                if (
                  ('{' === t ? (n += 1) : n < 2 && (n = 0),
                  '}' === t && n > 0 && 0 === n--)
                )
                  break;
                var i = this.input.substr(this.pos, 3);
                if ('{{#' === i || '{{/' === i) break;
                if ('{{!' === i)
                  return [this.get_tag(), 'TK_TAG_HANDLEBARS_COMMENT'];
                if (
                  '{{' === this.input.substr(this.pos, 2) &&
                  '{{else}}' === this.get_tag(!0)
                )
                  break;
              }
              this.pos++, this.line_char_count++, e.push(t);
            }
          }
          return e.length ? e.join('') : '';
        }),
        (this.get_contents_to = function(t) {
          if (this.pos === this.input.length) return ['', 'TK_EOF'];
          var e = '',
            n = new RegExp('</' + t + '\\s*>', 'igm');
          n.lastIndex = this.pos;
          var i = n.exec(this.input),
            s = i ? i.index : this.input.length;
          return (
            this.pos < s &&
              ((e = this.input.substring(this.pos, s)), (this.pos = s)),
            e
          );
        }),
        (this.record_tag = function(t) {
          this.tags[t + 'count']
            ? (this.tags[t + 'count']++,
              (this.tags[t + this.tags[t + 'count']] = this.indent_level))
            : ((this.tags[t + 'count'] = 1),
              (this.tags[t + this.tags[t + 'count']] = this.indent_level)),
            (this.tags[
              t + this.tags[t + 'count'] + 'parent'
            ] = this.tags.parent),
            (this.tags.parent = t + this.tags[t + 'count']);
        }),
        (this.retrieve_tag = function(t) {
          if (this.tags[t + 'count']) {
            for (
              var e = this.tags.parent;
              e && t + this.tags[t + 'count'] !== e;

            )
              e = this.tags[e + 'parent'];
            e &&
              ((this.indent_level = this.tags[t + this.tags[t + 'count']]),
              (this.tags.parent = this.tags[e + 'parent'])),
              delete this.tags[t + this.tags[t + 'count'] + 'parent'],
              delete this.tags[t + this.tags[t + 'count']],
              1 === this.tags[t + 'count']
                ? delete this.tags[t + 'count']
                : this.tags[t + 'count']--;
          }
        }),
        (this.indent_to_tag = function(t) {
          if (this.tags[t + 'count']) {
            for (
              var e = this.tags.parent;
              e && t + this.tags[t + 'count'] !== e;

            )
              e = this.tags[e + 'parent'];
            e && (this.indent_level = this.tags[t + this.tags[t + 'count']]);
          }
        }),
        (this.get_tag = function(t) {
          var e,
            n,
            i,
            s,
            r = '',
            a = [],
            h = '',
            o = !1,
            _ = !0,
            u = !1,
            p = this.pos,
            l = this.line_char_count,
            c = !1;
          t = void 0 !== t && t;
          do {
            if (this.pos >= this.input.length)
              return (
                t && ((this.pos = p), (this.line_char_count = l)),
                a.length ? a.join('') : ['', 'TK_EOF']
              );
            if (
              ((r = this.input.charAt(this.pos)),
              this.pos++,
              this.Utils.in_array(r, this.Utils.whitespace))
            )
              o = !0;
            else {
              if (
                (("'" !== r && '"' !== r) ||
                  ((r += this.get_unformatted(r)), (o = !0)),
                '=' === r && (o = !1),
                (s = this.input.substr(this.pos - 1)),
                !N ||
                  !u ||
                  c ||
                  ('>' !== r && '/' !== r) ||
                  (s.match(/^\/?\s*>/) &&
                    ((o = !1),
                    (c = !0),
                    this.print_newline(!1, a),
                    this.print_indentation(a))),
                a.length && '=' !== a[a.length - 1] && '>' !== r && o)
              ) {
                var d = this.space_or_wrap(a),
                  g = d && '/' !== r && !A;
                if (((o = !1), A && '/' !== r)) {
                  var b = !1;
                  if (N && _) {
                    var w = null !== s.match(/^\S*(="([^"]|\\")*")?\s*\/?\s*>/);
                    b = !w;
                  }
                  (_ && !b) ||
                    (this.print_newline(!1, a),
                    this.print_indentation(a),
                    (g = !0));
                }
                if (g) {
                  u = !0;
                  var y = x;
                  E && (y = a.indexOf(' ') + 1);
                  for (var k = 0; k < y; k++) a.push(f);
                }
                if (_)
                  for (var O = 0; O < a.length; O++)
                    if (' ' === a[O]) {
                      _ = !1;
                      break;
                    }
              }
              if (
                (T &&
                  '<' === i &&
                  r + this.input.charAt(this.pos) === '{{' &&
                  ((r += this.get_unformatted('}}')),
                  a.length &&
                    ' ' !== a[a.length - 1] &&
                    '<' !== a[a.length - 1] &&
                    (r = ' ' + r),
                  (o = !0)),
                '<' !== r || i || ((e = this.pos - 1), (i = '<')),
                T &&
                  !i &&
                  a.length >= 2 &&
                  '{' === a[a.length - 1] &&
                  '{' === a[a.length - 2] &&
                  ((e =
                    '#' === r || '/' === r || '!' === r
                      ? this.pos - 3
                      : this.pos - 2),
                  (i = '{')),
                this.line_char_count++,
                a.push(r),
                a[1] && ('!' === a[1] || '?' === a[1] || '%' === a[1]))
              ) {
                a = [this.get_comment(e)];
                break;
              }
              if (T && a[1] && '{' === a[1] && a[2] && '!' === a[2]) {
                a = [this.get_comment(e)];
                break;
              }
              if (
                T &&
                '{' === i &&
                a.length > 2 &&
                '}' === a[a.length - 2] &&
                '}' === a[a.length - 1]
              )
                break;
            }
          } while ('>' !== r);
          var K,
            S,
            C = a.join('');
          (K =
            C.indexOf('\n') !== -1
              ? C.indexOf('\n')
              : C.indexOf(' ') !== -1
                ? C.indexOf(' ')
                : '{' === C.charAt(0) ? C.indexOf('}') : C.indexOf('>')),
            (S = '<' !== C.charAt(0) && T ? ('#' === C.charAt(2) ? 3 : 2) : 1);
          var L = C.substring(S, K).toLowerCase();
          return (
            '/' === C.charAt(C.length - 2) ||
            this.Utils.in_array(L, this.Utils.single_token)
              ? t || (this.tag_type = 'SINGLE')
              : T && '{' === C.charAt(0) && 'else' === L
                ? t ||
                  (this.indent_to_tag('if'),
                  (this.tag_type = 'HANDLEBARS_ELSE'),
                  (this.indent_content = !0),
                  this.traverse_whitespace())
                : this.is_unformatted(L, m) || this.is_unformatted(L, v)
                  ? ((h = this.get_unformatted('</' + L + '>', C)),
                    a.push(h),
                    (n = this.pos - 1),
                    (this.tag_type = 'SINGLE'))
                  : 'script' === L &&
                    (C.search('type') === -1 ||
                      (C.search('type') > -1 &&
                        C.search(
                          /\b(text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect)/
                        ) > -1))
                    ? t || (this.record_tag(L), (this.tag_type = 'SCRIPT'))
                    : 'style' === L &&
                      (C.search('type') === -1 ||
                        (C.search('type') > -1 && C.search('text/css') > -1))
                      ? t || (this.record_tag(L), (this.tag_type = 'STYLE'))
                      : '!' === L.charAt(0)
                        ? t ||
                          ((this.tag_type = 'SINGLE'),
                          this.traverse_whitespace())
                        : t ||
                          ('/' === L.charAt(0)
                            ? (this.retrieve_tag(L.substring(1)),
                              (this.tag_type = 'END'))
                            : (this.record_tag(L),
                              'html' !== L.toLowerCase() &&
                                (this.indent_content = !0),
                              (this.tag_type = 'START')),
                          this.traverse_whitespace() && this.space_or_wrap(a),
                          this.Utils.in_array(L, this.Utils.extra_liners) &&
                            (this.print_newline(!1, this.output),
                            this.output.length &&
                              '\n' !== this.output[this.output.length - 2] &&
                              this.print_newline(!0, this.output))),
            t && ((this.pos = p), (this.line_char_count = l)),
            a.join('')
          );
        }),
        (this.get_comment = function(t) {
          var e = '',
            n = '>',
            i = !1;
          this.pos = t;
          var s = this.input.charAt(this.pos);
          for (
            this.pos++;
            this.pos <= this.input.length &&
            ((e += s),
            e.charAt(e.length - 1) !== n.charAt(n.length - 1) ||
              e.indexOf(n) === -1);

          )
            !i &&
              e.length < 10 &&
              (0 === e.indexOf('<![if')
                ? ((n = '<![endif]>'), (i = !0))
                : 0 === e.indexOf('<![cdata[')
                  ? ((n = ']]>'), (i = !0))
                  : 0 === e.indexOf('<![')
                    ? ((n = ']>'), (i = !0))
                    : 0 === e.indexOf('<!--')
                      ? ((n = '-->'), (i = !0))
                      : 0 === e.indexOf('{{!--')
                        ? ((n = '--}}'), (i = !0))
                        : 0 === e.indexOf('{{!')
                          ? 5 === e.length &&
                            e.indexOf('{{!--') === -1 &&
                            ((n = '}}'), (i = !0))
                          : 0 === e.indexOf('<?')
                            ? ((n = '?>'), (i = !0))
                            : 0 === e.indexOf('<%') && ((n = '%>'), (i = !0))),
              (s = this.input.charAt(this.pos)),
              this.pos++;
          return e;
        }),
        (this.get_unformatted = function(t, e) {
          if (e && e.toLowerCase().indexOf(t) !== -1) return '';
          var i = '',
            s = '',
            r = !0,
            a = n(t);
          do {
            if (this.pos >= this.input.length) return s;
            if (
              ((i = this.input.charAt(this.pos)),
              this.pos++,
              this.Utils.in_array(i, this.Utils.whitespace))
            ) {
              if (!r) {
                this.line_char_count--;
                continue;
              }
              if ('\n' === i || '\r' === i) {
                (s += '\n'), (this.line_char_count = 0);
                continue;
              }
            }
            (s += i),
              a.add(i),
              this.line_char_count++,
              (r = !0),
              T &&
                '{' === i &&
                s.length &&
                '{' === s.charAt(s.length - 2) &&
                (s += this.get_unformatted('}}'));
          } while (a.doesNotMatch());
          return s;
        }),
        (this.get_token = function() {
          var t;
          if (
            'TK_TAG_SCRIPT' === this.last_token ||
            'TK_TAG_STYLE' === this.last_token
          ) {
            var e = this.last_token.substr(7);
            return (
              (t = this.get_contents_to(e)),
              'string' != typeof t ? t : [t, 'TK_' + e]
            );
          }
          if ('CONTENT' === this.current_mode)
            return (
              (t = this.get_content()),
              'string' != typeof t ? t : [t, 'TK_CONTENT']
            );
          if ('TAG' === this.current_mode) {
            if (((t = this.get_tag()), 'string' != typeof t)) return t;
            var n = 'TK_TAG_' + this.tag_type;
            return [t, n];
          }
        }),
        (this.get_full_indent = function(t) {
          return (
            (t = this.indent_level + t || 0),
            t < 1 ? '' : Array(t + 1).join(this.indent_string)
          );
        }),
        (this.is_unformatted = function(t, e) {
          if (!this.Utils.in_array(t, e)) return !1;
          if ('a' !== t.toLowerCase() || !this.Utils.in_array('a', e))
            return !0;
          var n = this.get_tag(!0),
            i = (n || '').match(/^\s*<\s*\/?([a-z]*)\s*[^>]*>\s*$/);
          return !(i && !this.Utils.in_array(i, e));
        }),
        (this.printer = function(n, i, s, r, a) {
          (this.input = n || ''),
            (this.input = this.input.replace(/\r\n|[\r\u2028\u2029]/g, '\n')),
            (this.output = []),
            (this.indent_character = i),
            (this.indent_string = ''),
            (this.indent_size = s),
            (this.brace_style = a),
            (this.indent_level = 0),
            (this.wrap_line_length = r),
            (this.line_char_count = 0);
          for (var h = 0; h < this.indent_size; h++)
            this.indent_string += this.indent_character;
          (this.print_newline = function(t, n) {
            (this.line_char_count = 0),
              n &&
                n.length &&
                (t || '\n' !== n[n.length - 1]) &&
                ('\n' !== n[n.length - 1] &&
                  (n[n.length - 1] = e(n[n.length - 1])),
                n.push('\n'));
          }),
            (this.print_indentation = function(t) {
              for (var e = 0; e < this.indent_level; e++)
                t.push(this.indent_string),
                  (this.line_char_count += this.indent_string.length);
            }),
            (this.print_token = function(e) {
              (this.is_whitespace(e) && !this.output.length) ||
                ((e || '' !== e) &&
                  this.output.length &&
                  '\n' === this.output[this.output.length - 1] &&
                  (this.print_indentation(this.output), (e = t(e))),
                this.print_token_raw(e));
            }),
            (this.print_token_raw = function(t) {
              this.newlines > 0 && (t = e(t)),
                t &&
                  '' !== t &&
                  (t.length > 1 && '\n' === t.charAt(t.length - 1)
                    ? (this.output.push(t.slice(0, -1)),
                      this.print_newline(!1, this.output))
                    : this.output.push(t));
              for (var n = 0; n < this.newlines; n++)
                this.print_newline(n > 0, this.output);
              this.newlines = 0;
            }),
            (this.indent = function() {
              this.indent_level++;
            }),
            (this.unindent = function() {
              this.indent_level > 0 && this.indent_level--;
            });
        }),
        this
      );
    }
    var u, p, l, c, d, f, g, b, m, v, w, y, T, k, x, A, N, E, O, K, S;
    for (
      a = a || {},
        a = n(a, 'html'),
        (void 0 !== a.wrap_line_length &&
          0 !== parseInt(a.wrap_line_length, 10)) ||
          void 0 === a.max_char ||
          0 === parseInt(a.max_char, 10) ||
          (a.wrap_line_length = a.max_char),
        p = void 0 !== a.indent_inner_html && a.indent_inner_html,
        l = void 0 === a.indent_body_inner_html || a.indent_body_inner_html,
        c = void 0 === a.indent_head_inner_html || a.indent_head_inner_html,
        d = void 0 === a.indent_size ? 4 : parseInt(a.indent_size, 10),
        f = void 0 === a.indent_char ? ' ' : a.indent_char,
        b = void 0 === a.brace_style ? 'collapse' : a.brace_style,
        g =
          0 === parseInt(a.wrap_line_length, 10)
            ? 32786
            : parseInt(a.wrap_line_length || 250, 10),
        m = a.unformatted || [
          'a',
          'abbr',
          'area',
          'audio',
          'b',
          'bdi',
          'bdo',
          'br',
          'button',
          'canvas',
          'cite',
          'code',
          'data',
          'datalist',
          'del',
          'dfn',
          'em',
          'embed',
          'i',
          'iframe',
          'img',
          'input',
          'ins',
          'kbd',
          'keygen',
          'label',
          'map',
          'mark',
          'math',
          'meter',
          'noscript',
          'object',
          'output',
          'progress',
          'q',
          'ruby',
          's',
          'samp',
          'select',
          'small',
          'span',
          'strong',
          'sub',
          'sup',
          'svg',
          'template',
          'textarea',
          'time',
          'u',
          'var',
          'video',
          'wbr',
          'text',
          'acronym',
          'address',
          'big',
          'dt',
          'ins',
          'strike',
          'tt'
        ],
        v = a.content_unformatted || ['pre'],
        w = void 0 === a.preserve_newlines || a.preserve_newlines,
        y = w
          ? isNaN(parseInt(a.max_preserve_newlines, 10))
            ? 32786
            : parseInt(a.max_preserve_newlines, 10)
          : 0,
        T = void 0 !== a.indent_handlebars && a.indent_handlebars,
        k = void 0 === a.wrap_attributes ? 'auto' : a.wrap_attributes,
        x = isNaN(parseInt(a.wrap_attributes_indent_size, 10))
          ? d
          : parseInt(a.wrap_attributes_indent_size, 10),
        A = 'force' === k.substr(0, 'force'.length),
        N = 'force-expand-multiline' === k,
        E = 'force-aligned' === k,
        O = void 0 !== a.end_with_newline && a.end_with_newline,
        K =
          'object' == typeof a.extra_liners && a.extra_liners
            ? a.extra_liners.concat()
            : 'string' == typeof a.extra_liners
              ? a.extra_liners.split(',')
              : 'head,body,/html'.split(','),
        S = a.eol ? a.eol : 'auto',
        a.indent_with_tabs && ((f = '\t'), (d = 1)),
        'auto' === S &&
          ((S = '\n'), i && s.test(i || '') && (S = i.match(s)[0])),
        S = S.replace(/\\r/, '\r').replace(/\\n/, '\n'),
        i = i.replace(r, '\n'),
        u = new _(),
        u.printer(i, f, d, g, b);
      ;

    ) {
      var C = u.get_token();
      if (
        ((u.token_text = C[0]),
        (u.token_type = C[1]),
        'TK_EOF' === u.token_type)
      )
        break;
      switch (u.token_type) {
        case 'TK_TAG_START':
          u.print_newline(!1, u.output),
            u.print_token(u.token_text),
            u.indent_content &&
              ((!u.indent_body_inner_html &&
                u.token_text.match(/<body(?:.*)>/)) ||
                (!u.indent_head_inner_html &&
                  u.token_text.match(/<head(?:.*)>/)) ||
                u.indent(),
              (u.indent_content = !1)),
            (u.current_mode = 'CONTENT');
          break;
        case 'TK_TAG_STYLE':
        case 'TK_TAG_SCRIPT':
          u.print_newline(!1, u.output),
            u.print_token(u.token_text),
            (u.current_mode = 'CONTENT');
          break;
        case 'TK_TAG_END':
          if ('TK_CONTENT' === u.last_token && '' === u.last_text) {
            var L = (u.token_text.match(/\w+/) || [])[0],
              U = null;
            u.output.length &&
              (U = u.output[u.output.length - 1].match(/(?:<|{{#)\s*(\w+)/)),
              (null === U || (U[1] !== L && !u.Utils.in_array(U[1], m))) &&
                u.print_newline(!1, u.output);
          }
          u.print_token(u.token_text), (u.current_mode = 'CONTENT');
          break;
        case 'TK_TAG_SINGLE':
          var j = u.token_text.match(/^\s*<([a-z-]+)/i);
          (j && u.Utils.in_array(j[1], m)) || u.print_newline(!1, u.output),
            u.print_token(u.token_text),
            (u.current_mode = 'CONTENT');
          break;
        case 'TK_TAG_HANDLEBARS_ELSE':
          for (
            var G = !1, I = u.output.length - 1;
            I >= 0 && '\n' !== u.output[I];
            I--
          )
            if (u.output[I].match(/{{#if/)) {
              G = !0;
              break;
            }
          G || u.print_newline(!1, u.output),
            u.print_token(u.token_text),
            u.indent_content && (u.indent(), (u.indent_content = !1)),
            (u.current_mode = 'CONTENT');
          break;
        case 'TK_TAG_HANDLEBARS_COMMENT':
          u.print_token(u.token_text), (u.current_mode = 'TAG');
          break;
        case 'TK_CONTENT':
          u.print_token(u.token_text), (u.current_mode = 'TAG');
          break;
        case 'TK_STYLE':
        case 'TK_SCRIPT':
          if ('' !== u.token_text) {
            u.print_newline(!1, u.output);
            var R,
              z = u.token_text,
              D = 1;
            'TK_SCRIPT' === u.token_type
              ? (R = 'function' == typeof h && h)
              : 'TK_STYLE' === u.token_type &&
                (R = 'function' == typeof o && o),
              'keep' === a.indent_scripts
                ? (D = 0)
                : 'separate' === a.indent_scripts && (D = -u.indent_level);
            var M = u.get_full_indent(D);
            if (R) {
              var P = function() {
                this.eol = '\n';
              };
              P.prototype = a;
              var Y = new P();
              z = R(z.replace(/^\s*/, M), Y);
            } else {
              var $ = z.match(/^\s*/)[0],
                q = $.match(/[^\n\r]*$/)[0].split(u.indent_string).length - 1,
                B = u.get_full_indent(D - q);
              z = z
                .replace(/^\s*/, M)
                .replace(/\r\n|\r|\n/g, '\n' + B)
                .replace(/\s+$/, '');
            }
            z && (u.print_token_raw(z), u.print_newline(!0, u.output));
          }
          u.current_mode = 'TAG';
          break;
        default:
          '' !== u.token_text && u.print_token(u.token_text);
      }
      (u.last_token = u.token_type), (u.last_text = u.token_text);
    }
    var F = u.output.join('').replace(/[\r\n\t ]+$/, '');
    return O && (F += '\n'), '\n' !== S && (F = F.replace(/[\n]/g, S)), F;
  }
  var s = /\r\n|[\n\r\u2028\u2029]/,
    r = new RegExp(s.source, 'g');
  if ('function' == typeof define && define.amd)
    define(['require', './beautify', './beautify-css'], function(t) {
      var e = t('./beautify'),
        n = t('./beautify-css');
      return {
        html_beautify: function(t, s) {
          return i(t, s, e.js_beautify, n.css_beautify);
        }
      };
    });
  else if ('undefined' != typeof exports) {
    var a = require('./beautify.js'),
      h = require('./beautify-css.js');
    exports.html_beautify = function(t, e) {
      return i(t, e, a.js_beautify, h.css_beautify);
    };
  } else
    'undefined' != typeof window
      ? (window.html_beautify = function(t, e) {
          return i(t, e, window.js_beautify, window.css_beautify);
        })
      : 'undefined' != typeof global &&
        (global.html_beautify = function(t, e) {
          return i(t, e, global.js_beautify, global.css_beautify);
        });
})();
//# sourceMappingURL=beautify-html.min.js.map
