$(document).ready(function() {
  $('#editor').keyup(function(e) {
    var r = $(this)
      .val()
      .replace(/(\r\n|\n|\r)/gm, '');
    var data = html_beautify(r);

    if (e.which == 91) {
      $('#editor').val(
        $('#editor')
          .val()
          .replace($('#editor').val(), data)
      );
    }
  });
});
