requirejs.config({
    paths: {
      ramda: 'https://cdnjs.cloudflare.com/ajax/libs/ramda/0.13.0/ramda.min',
      jquery: 'https://ajax.loli.net/ajax/libs/jquery/2.1.1/jquery.min'
    }
});
  
require([
    'ramda',
    'jquery'
],
function (_, $) {
    //var trace = _.curry(function(tag, x) {
    //    console.log(tag, x);
    //    return x;
    //});
    //console.log(trace("test","hello"));
    var Impure = {
        getJSON: _.curry(function(callback, url) {
          $.getJSON(url, callback);
        }),
      
        setHtml: _.curry(function(sel, html) {
          $(sel).html(html);
        })
    };

    var img = function (url) {
        return $("<img />", { src: url });
    };
    
    var trace = _.curry(function (tag, x) {
        console.log(tag, x);
        return x;
    });

    var url = function (term) {
        return 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + term + '&format=json&jsoncallback=?';
    };

    var mediaUrl = _.compose(_.prop("m"), _.prop("media"));
    var srcs = _.compose(_.map(mediaUrl), _.prop("items"));
    var images = _.compose(_.map(img), srcs);
    var renderImages = _.compose(Impure.setHtml("body"), images);
    
    //var app = _.compose(Impure.getJSON(trace("response")), url);
    var app = _.compose(Impure.getJSON(renderImages), url);
    
    app("cats");
});