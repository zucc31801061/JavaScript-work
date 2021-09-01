//在app.js中输入如下内容：
//app.js

console.log(module.paths);

// require函数包装之后的app.js将会封装为以下形式:
// 参数由Node系统提供 在 app.js可以直接使用

(function (exports, require, module, __filename, __dirname) {
    console.log(module.paths);
});