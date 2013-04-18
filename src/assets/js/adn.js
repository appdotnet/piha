(function (win, doc) {
  var iframe_base = win.ADN_IFRAME_BASE || 'https://d2zh9g63fcvyrq.cloudfront.net/button.html?';
  var nativeForEach = Array.prototype.forEach;
  var breaker = {};
  var each = function (obj, iterator, context) {
    if (obj === null) {
      return;
    }
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        iterator.call(context, obj[i], i, obj);
      }
    } else {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    }
  };

  each(doc.querySelectorAll('.adn-button'), function (button) {
    var properties = {};
    var prop_query = [];
    each(button.attributes, function (attr) {
      var prop_name = attr.name;
      if (prop_name.indexOf('data-') === 0) {
        prop_name = prop_name.split('-').slice(1).join('_');
        properties[prop_name] = attr.value;
        prop_query.push(prop_name + '=' + encodeURIComponent(attr.value));
      }
    });

    var iframe = document.createElement('iframe');

    var iframe_props = {
      width: properties.width || 250,
      height: properties.height || 50,
      src: iframe_base + prop_query.join('&'),
      scrolling: 'no',
      marginwidth: 0,
      marginheight: 0,
      frameborder: 0,
      style: 'border: 0px;'
    };

    each(iframe_props, function (value, key) {
      iframe.setAttribute(key, value);
    });

    button.parentNode.replaceChild(iframe, button);
  });

}(window, document));