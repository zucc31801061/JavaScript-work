

# 2020-2021学年第2学期
# **实 验 报 告**
![zucc](./img/zucc.png)

- 课程名称:跨平台脚本开发技术  
- 实验项目:函数式编程
- 专业班级:计算机1801
- 学生学号:31801061
- 学生姓名:王灵霜
- 实验指导教师:郭鸣

## 实验内容

1. 阅读课本相关内容

1. 实现 `fibonacci` 数列  1 1 2 3 5 ....
   
    - 测试对比 采用/没有采用 `memorize`技术运行时间 `fibo(10),fibo(100),fibo(1000),`
    
      `fibo(10000) 50,500,5000,50000`次 所需要的时间.

```js
var memoize = function(f) {
    var cache = {};
    return function() {
        //JSON是JS提供的一个工具对象 (Utility)
        var arg_str = JSON.stringify(arguments);
        cache[arg_str] = cache[arg_str] || f.apply(f, arguments);
        return cache[arg_str];
    };
};

function fibo(n){
    if(n == 1 || n == 2){
        return 1;
    }
    return fibo(n - 1) + fibo(n - 2);
}

function testfibo(n,times){
    console.time();
    for(let i = 1; i < times; i++){
        fibo(n);
    }
    console.timeEnd();
}

var execFibo = memoize(testfibo);
```

![1](.\img\1.png)

100,50已经跑不出来了，就看这个出结论吧。采用`memorize`技术运行时间比没有采用`memorize`技术运行时间快一些。

3. 完成讲义 04 函数式编程-->柯里化函数`curry function` 最后面的练习 

    - 在Node中使用ramda 库，在当前目录，`npm install ramda`
    - 浏览器里面使用`ramda`,请自行参考 [应用例子](http://sigcc.gitee.io/xplatform/#/04/044.function.demo)一节中, `requirejs`的写法.


    完成下面的代码，练习柯里化函数 `curry function`

```js
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
```

![2](.\img\2.png)


4. 完成讲义 04 函数式编程-->[函数组合](http://sigcc.gitee.io/xplatform/#/04/043.function.compose)最后面的练习 

    ```javascript
    // 在当前目录 npm install ramda accounting
    // require('../../support');
    
    var _ = require('ramda');
    var accounting = require('accounting');
    
    // 示例数据
    var CARS = [
        {name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true},
        {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
        {name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false},
        {name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false},
        {name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true},
        {name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false}
      ];
    
    // 练习 1:
    // ============
    // 使用 _.compose() 重写下面这个函数。提示：_.prop() 是 curry 函数
    var isLastInStock = function(cars) {
      var last_car = _.last(cars);
      return _.prop('in_stock', last_car);
    };
    
    isLastInStock2 = _.compose(_.prop('in_stock'), _.last);
    
    // 练习 2:
    // ============
    // 使用 _.compose()、_.prop() 和 _.head() 获取第一个 car 的 name
    var nameOfFirstCar = undefined;
    nameOfFirstCar = _.compose( _.prop('name'), _.head);
    
    
    // 练习 3:
    // ============
    // 使用帮助函数 _average 重构 averageDollarValue 使之成为一个组合
    var _average = function(xs) {
        return reduce(add, 0, xs) / xs.length;
    }; // <- 无须改动
    
    var averageDollarValue = function(cars) {
        var dollar_values = map(function(c) {
            return c.dollar_value; 
        }, cars);
        return _average(dollar_values);
    };
    
    _average = function(xs) {
        return _.reduce(_.add, 0, xs) / xs.length;
    };
    
    averageDollarValue = function(cars) {
        var dollar_values = _.map(function(c) {
            return c.dollar_value;
        }, cars);
        return _average(dollar_values);
    };
    
    // 练习 4:
    // ============
    // 使用 compose 写一个 sanitizeNames() 函数，返回一个下划线连接的小写字符串：例如：sanitizeNames(["Hello World"]) //=> ["hello_world"]。
    
    var _underscore = _.replace(/\W+/g, '_'); //<-- 无须改动，并在 sanitizeNames 中使用它
    var sanitizeNames = undefined;
    sanitizeNames = _.compose(_underscore, _.toLower);
    
    // 彩蛋 1:
    // ============
    // 使用 compose 重构 availablePrices
    
    var availablePrices = function(cars) {
      var available_cars = _.filter(_.prop('in_stock'), cars);
      return available_cars.map(function(x){
        return accounting.formatMoney(x.dollar_value);
      }).join(', ');
    };
    
    var format = _.compose(accounting.formatMoney,_.prop('dollar_value'));
    
    availablePrices = _.compose(_.join(', '), _.map(format), _.filter(_.prop('in_stock')));
    
    
    // 彩蛋 2:
    // ============
    // 重构使之成为 pointfree 函数。提示：可以使用 _.flip()
    
    var fastestCar = function(cars) {
      var sorted = _.sortBy(function(car){ return car.horsepower }, cars);
      var fastest = _.last(sorted);
      return fastest.name + ' is the fastest';
    };
    
    var append = _.flip(_.concat);
    
    fastestCar = _.compose(append(' is the fastest') , _.prop('name'), _.last, _.sortBy(_.prop(' horsepower')));
    ```

    ![3](.\img\3.png)

5. 完成讲义 04 函数式编程--> [应用例子](http://sigcc.gitee.io/xplatform/#/04/044.function.demo)中获取图片的的练习
    服务器请改为 baidu 163 等国内可以访问的地址

  ```javascript
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
  ```

  ![4](.\img\4.png)

6. 教材 p 71 页 [习题][ejs5] 1，2，3，4

    1）联合使用`reduce`方法和`concat`方法，将一个数组的数组“展开”成一个单个数组，包含原始数组的所有元素。

    ```javascript
    const _ = require('ramda');
    let arrays = [[1, 2, 3], [4, 5], [6]];
    
    function ques1(x){
        return  _.reduce((prev,c) => 
        Array.isArray(c)? prev.concat(ques1(c)):prev.concat(c)
        , [], x);
    }
    
    console.log(ques1(arrays));
    ```

    ![5](.\img\5.png)

    2）编写一个高阶函数`loop`，提供类似`for`循环语句的东西。 它接受一个值，一个测试函数，一个更新函数和一个主体函数。 每次迭代中，它首先在当前循环值上运行测试函数，并在返回`false`时停止。 然后它调用主体函数，向其提供当前值。 最后，它调用`update`函数来创建一个新的值，并从头开始。

    定义函数时，可以使用常规循环来执行实际循环。

    ```javascript
    function loop(val, judge, update, main) {
        for (let i = val; judge(i); i = update(i))
            main(i);
    }
    
    loop(3, n => n > 0, n => n - 1, console.log);
    ```

    ![6](.\img\6.png)

    3）类似于`some`方法，数组也有`every`方法。 当给定函数对数组中的每个元素返回`true`时，此函数返回`true`。 在某种程度上，`some`是作用于数组的`||`运算符的一个版本，`every`就像`&&`运算符。

    将`every`实现为一个函数，接受一个数组和一个谓词函数作为参数。编写两个版本，一个使用循环，另一个使用`some`方法。

    ```javascript
    function every(array, test) {
        if(_.reject( test,array).length===0)
            return true;
        else
            return false;
    }
    
    console.log(every([1, 3, 5], n => n < 10));
    console.log(every([2, 4, 16], n => n < 10));
    console.log(every([], n => n < 10));
    
    function everysome(array, test) {
        let mytest=(n) => {
            if(test(n))
                return false;
            else
                return true;
        }
        if( array.some(mytest) )
            return false;
        else
            return true;
    }
    
    console.log(everysome([1, 3, 5], n => n < 10));
    console.log(everysome([2, 4, 16], n => n < 10));
    console.log(everysome([], n => n < 10));
    ```

    ![7](.\img\7.png)

    ![8](.\img\8.png)

    4）编写一个函数来计算文本字符串中的主要书写方向。请记住，每个语言字符集对象都有一个direction（方向）属性，可以是“ltr”（从左到右）、“rtl”（从右到左）或“ttb”（从上到下）。

    主要方向是具有与之关联的语言字符集的大多数字符的方向。在这里可以利用本章前面定义的characterScript和countBy函数。

    ```javascript
    function characterScript(code) {
        for (let script of SCRIPTS) {
            if (script.ranges.some(([from, to]) => {
                return code >= from && code < to;
            })) {
                return script;
            }
        }
        return null;
    }
      
    function countBy(items, groupName) {
        let counts = [];
        for (let item of items) {
            let direction = groupName(item);
            let known = counts.findIndex(c => c.direction == direction);
            if (known == -1) {
                counts.push({direction, count: 1});
            } else {
                counts[known].count++;
            }
        }
        return counts;
    }  
      
    function textScripts(text) {
        let scripts = countBy(text, char => {
            let script = characterScript(char.codePointAt(0));
            return script ? script.direction : "none";
        }).filter(({direction}) => direction != "none");
      
        let total = scripts.reduce((n, {count}) => n + count, 0);
        if (total == 0) return "No scripts found";
      
        return "语言方向是"+_.sortBy(_.prop("direction"),scripts)[0].direction;
    }
    
    console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));
    ```

    ![9](.\img\9.png)

    - `[[1,2],3,4] ---> [1,2,3,4]` 从高维数组降到 1 维数组
    - 要求 使用 `map reduce filter curry`等函数式编程的技巧，使用`ramda`等函数式编程库 
      - [Ramda Pipe Compose](http://sigcc.gitee.io/xplatform/#/15/thinking.ramda1)
      - [Ramda Curry](http://sigcc.gitee.io/xplatform/#/15/thinking.ramda2)
      - [Ramda Lens](http://sigcc.gitee.io/xplatform/#/15/thinking.ramda3)

7. 请写出 p 71 页 [习题][ejs5]  1，2，3，4 的函数的`Hindley-Milner` 类型签名    

    ```javascript
    // ques1 :: [[Number],[Number]...] -> [Number] 
    const _ = require('ramda');
    let arrays = [[1, 2, 3], [4, 5], [6]];
    
    function ques1(x){
        // reduce::[Number] -> [Number] -> [Number]
        return  _.reduce((prev,c) => 
        Array.isArray(c)? prev.concat(ques1(c)):prev.concat(c)
        , [], x);
    }
    
    console.log(ques1(arrays))
    // → [1, 2, 3, 4, 5, 6]
    
    // loop:: undefined -> (Number -> undefined) -> Number
    function loop(val, judge, update, main) {
        for (let i = val; judge(i); i = update(i))
            main(i);
    }
    
    loop(3, n => n > 0, n => n - 1, console.log);
    // → 3
    // → 2
    // → 1
    
    // every::[String] -> (Number -> Boolean) -> Boolean
    function every(array, test) {
        // reject::[String] -> (Number -> Boolean) -> [String]
        if(_.reject( test,array).length===0)
            return true;
        else
            return false;
    }
    
    console.log(every([1, 3, 5], n => n < 10));
    // → true
    console.log(every([2, 4, 16], n => n < 10));
    // → false
    console.log(every([], n => n < 10));
    // → true
    
    function everysome(array, test) {
        let mytest=(n) => {
            if(test(n))
                return false;
            else
                return true;
        }
        if( array.some(mytest) )
            return false;
        else
            return true;
    }
    
    console.log(everysome([1, 3, 5], n => n < 10));
    // → true
    console.log(everysome([2, 4, 16], n => n < 10));
    // → false
    console.log(everysome([], n => n < 10));
    // → true
    
    // String -> [Object] 
    function characterScript(code) {
        for (let script of SCRIPTS) {
            if (script.ranges.some(([from, to]) => {
                return code >= from && code < to;
            })) {
                return script;
            }
        }
        return null;
    }
      
    // [Object] -> (Object -> String) -> [Object]
    function countBy(items, groupName) {
        let counts = [];
        for (let item of items) {
            let direction = groupName(item);
            let known = counts.findIndex(c => c.direction == direction);
            if (known == -1) {
                counts.push({direction, count: 1});
            } else {
                counts[known].count++;
            }
        }
        return counts;
    }  
      
    // String -> String
    function textScripts(text) {
        let scripts = countBy(text, char => {
            let script = characterScript(char.codePointAt(0));
            return script ? script.direction : "none";
        }).filter(({direction}) => direction != "none");
      
        let total = scripts.reduce((n, {count}) => n + count, 0);
        if (total == 0) return "No scripts found";
      
        return "语言方向是"+_.sortBy(_.prop("direction"),scripts)[0].direction;
    }
    ```

    

8. 扩展阅读 [函数式编程][most] 理解 `Maybe Ether Functor Monad`等概念
   自己学习使用 `npm install ramda-repl`


[most]: https://gitee.com/sigcc/mostly-adequate-guide-chinese
[ejs5]: http://sigcc.gitee.io/eloquent-js-3e-zh/#/5?id=%e4%b9%a0%e9%a2%98

