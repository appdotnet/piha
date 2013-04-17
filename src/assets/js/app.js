/* global URI: true */
(function () {

  var templates = window.JST;
  var short_name_to_template = {
    follow: 'src/assets/templates/follow.html',
    share: 'src/assets/templates/share.html'
  };

  var renderTemplate = function (template, ctx) {
    var template_name = short_name_to_template[template];
    return templates[template_name]({ctx: ctx});
  };

  var url = URI(window.location);
  var options = url.search(true);
  var body = $('body');
  body.html(renderTemplate(options.type, options));
  var button = $('a');
  body.on('click', function () {
    window.open(button.attr('href'), 'adn_popup', 'width=750,height=350,left=100,top=100,menubar=no,resizable=no,directories=no,location=no');
    return false;
  });
})();