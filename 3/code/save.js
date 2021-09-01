let options = process.argv.splice(2);
let os=require('os');
let freemem=os.freemem()
let tmpdir=os.tmpdir()
let totalmem=os.totalmem()
const fs = require("fs");
fs.writeFile(options.toString(), "空闲内存字节"+freemem+"    CPU路径"+tmpdir+"   总内存"+totalmem, error => {
    if (error) return console.log("写入文件失败,原因是" + error.message);
    console.log("写入成功");
});