// var mod = require('./es6.mjs') // es6模块无法用 require加载  
var mod = require('./es5.js')  
var {val,read} = require('./es5.js')

console.log(mod)  

console.log(val) 

exports
module.exports
