const fs = require('fs');
function myrequire(name){
    var code = new Function("exports", fs.readFileSync(name).toString());
    var exports = {};
    code(exports);
    return exports;
}

console.log(myrequire("./weekDay.js").name(1));