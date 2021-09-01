console.log("curry2")

var curry = require('ramda').curry;

var match = curry(function(what, str) {
      return str.match(what);

});

var replace = curry(function(what, replacement, str) {
      return str.replace(what, replacement);

});

var filter = curry(function(f, ary) {
      return ary.filter(f);

});

var map = curry(function(f, ary) {
      return ary.map(f);

});

//  join :: String -> [String] -> String
var join = curry(function(what, xs){
  return xs.join(what);
});

exports.join = join
