var R = require('ramda'); //导入ramda 函数式编程模块

// 练习 1
//==============
// 通过部分应用（partial apply）移除所有参数

var words = function(str) {
    return R.split(' ', str);
};

var words2 = R.split(' ');

// 练习 1a
//==============
// 使用 `map` 创建一个新的 `words` 函数，使之能够操作字符串数组

var sentences = undefined;
sentences = R.map(words);


// 练习 2
//==============
// 通过部分应用（partial apply）移除所有参数

var filterQs = function(xs) {
    return filter(function(x){ return match(/q/i, x);  }, xs);
};

var filterQs2=R.filter(R.match(/q/i));


// 练习 3
//==============
// 使用帮助函数 `_keepHighest` 重构 `max` 使之成为 curry 函数

// 无须改动:
var _keepHighest = function(x,y){ return x >= y ? x : y; };

// 重构这段代码:
var max = function(xs) {
    return reduce(function(acc, x){
        return _keepHighest(acc, x);
    }, -Infinity, xs);
};

max = R.reduce(_keepHighest, -Infinity);


// 彩蛋 1:
// ============
// 包裹数组的 `slice` 函数使之成为 curry 函数
// //[1,2,3].slice(0, 2)
var slice = undefined;
slice = R.curry(function(start, end, xs){
    return xs.slice(start,end);
});


// 彩蛋 2:
// ============
// 借助 `slice` 定义一个 `take` curry 函数，该函数调用后可以取出字符串的前 n 个字符。
var take = undefined;
take = R.curry(function(n, xs){
    return xs.slice(0,n);
})