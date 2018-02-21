$(document).ready(function() {
  var suggests = [
    '<html>\n<head>\n\n</head>\n<body>\n\n</body>\n</html>',
    '<head>\n\n</head>',
    '<title></title>',
    '<body>\n\n</body>',
    '<h1></h1>',
    '<h2></h2>',
    '<h3></h3>',
    '<h4></h4>',
    '<h5></h5>',
    '<h6></h6>',
    '<p></p>',
    '<br />',
    '<hr />',
    '<abbr title=""></abbr>',
    '<address></address>',
    '<b></b>',
    '<bdo dir=""></bdo>',
    '<blockquote cite=""></blockquote>',
    '<cite></cite>',
    '<code></code>',
    '<del></del>',
    '<em></em>',
    '<i></i>',
    '<ins></ins>',
    '<mark></mark>',
    '<pre></pre>',
    '<progress value="" max=""></progress',
    '<small></small>',
    '<strong></strong>',
    '<sub></sub>',
    '<sup></sup>',
    '<template></template>',
    '<form action="" method="" name="">\n\n</form>',
    '<input type="" name="" value="" />',
    '<textarea name=""></textarea>',
    '<button type=""></button>',
    '<select>\n\n</select>',
    '<option value=""></option>',
    '<label for=""></label>',
    '<fieldset>\n\n</fieldset>',
    '<legend></legend>',
    '<datalist></datalist>',
    '<iframe src=""></iframe>',
    '<img src="" alt="" />',
    '<map name="">\n\n</map>',
    '<area shape="" coords="" href="" alt="" />',
    '<canvas></canvas>',
    '<figure>\n\n</figure>',
    '<picture>\n\n</picture>',
    '<audio controls src="">\n\n</audio>',
    '<source src="" type="" />',
    '<video controls>\n\n</video>',
    '<a href=""></a>',
    '<link rel="stylesheet" type="text/css" href="" />',
    '<ul>\n\n</ul>',
    '<ol>\n\n</ol>',
    '<li></li>',
    '<table>\n\n</table>',
    '<caption></caption>',
    '<th></th>',
    '<tr>\n\n</tr>',
    '<td></td>',
    '<thead>\n\n</thead>',
    '<tbody>\n\n</tbody>',
    '<tfoot>\n\n</tfoot>',
    '<style type="text/css">\n\n</style>',
    '<div>\n\n</div>',
    '<span></span>',
    '<header>\n\n</header>',
    '<footer>\n\n</footer>',
    '<main>\n\n</main>',
    '<section>\n\n</section>',
    '<article>\n\n</article>',
    '<summary></summary>',
    '<script src=""></script>',
    '<noscript></noscript>',
    '<embed src="" />'
  ];
  $('#editor').asuggest(suggests);
});