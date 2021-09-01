var figlet = require("figlet");
var invisible = function() {
	console.log("invisible");
}

// exports 上绑定的对象将被返回 
exports.message = "hi";

exports.say = function() {
	console.log(message);
}
//console.log(module.paths);
//console.log(module.children);