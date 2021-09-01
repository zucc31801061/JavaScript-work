

# 2020-2021学年第2学期
# **实 验 报 告**
![zucc](.\img\zucc.png)

- 课程名称:跨平台脚本开发技术  
- 实验项目:模块
- 专业班级:计算机1801
- 学生学号:31801061
- 学生姓名:王灵霜
- 实验指导教师:郭鸣

## 实验内容

1. 阅读课本相关内容 回答理解以下问题 
    - 10.1 模块的好处在哪里
    
      - 可以通过模块，得到组织良好的代码结构，可以清晰发现代码的逻辑结构
      - 通过模块，方便关注特定功能的代码内容
    
    - 10.2 为什么 JavaScript中函数可以作为名称空间

      js中名称空间通过对象来提供，函数有作用域，所以可以用函数模拟一个命名空间
    
    - 10.3 如何使用对象作为接口
    
      ```javascript
      var weekDay = function() {
      	var names = ["Sunday", "Monday", "Tuesday", "Wednesday",
      		"Thursday", "Friday", "Saturday"];
      	// return 返回的是对象
      	return {
      		name: function(number) {
      			return names[number];
      		},
      		number: function(name) {
      			return names.indexOf(name);
      		}
      	};
      }();
      
      //使用 weekDay 模块
      console.log(weekDay.name(weekDay.number("Sunday")));
      // → Sunday
      ```
    
      定义对象，通过return对象.函数或对象.属性返回内容。
    
    - 10.4 解释代码 `new Function("a,b"," console.log(arguments); return arguments[0];")`
    
      new Function()构造函数，a,b是参数，作为模块接口传递。执行方法是打印参数数组，并且返回第一个参数。
    
    - 10.6 参考书上实现 `require()`，在`node`中加载模块`weekDay`。
    
      ```javascript
      const fs = require('fs');
      function myrequire(name){
          var code = new Function("exports", fs.readFileSync(name).toString());
          var exports = {};
          code(exports);
          return exports;
      }
      
      console.log(myrequire("./weekDay.js").name(1));
      ```
    
    ![1](.\img\1.png)
    
    - (选) 参考课件 [requirejs](/07/07.requirejs.md),在浏览器中加载模块`weekDay`。
    
1.  阅读 [nodejs中 require 方法的加载规则](http://sigcc.gitee.io/xplatform/#/07/07.require.order?id=nodejs中-require-方法的加载规则)理解模块的4种类型，说明下面分别是那种
    - `var fs = require('fs')`
    
      原生模块
    
    - `var R = require('ramda')`
    
      第三方模块
    
    - `var test = require('/test.js')`
    
      绝对路径的文件模块
    
    - `var mod = require('../mod')`
    
      相对路径的文件模块
    
    - `require.resolve()` 可以查看解析模块的路径 
    
    ```js
    //在app.js中输入如下内容：
    //app.js
    
    console.log(module.paths);
    
    // require函数包装之后的app.js将会封装为以下形式:
    // 参数由Node系统提供 在 app.js可以直接使用
    
    (function (exports, require, module, __filename, __dirname) {
        console.log(module.paths);
    });
    ```
    
    ![2](.\img\2.png)
    
1.  学习[require命令](http://sigcc.gitee.io/xplatform/#/07/07.require?id=require命令) `require` 的本质

    - 文件作为模块，输入如下代码
    
    - 修改`example.js` 输出 该模块 module.paths 的值
    
      ```javascript
      var figlet = require("figlet");
      var invisible = function() {
      	console.log("invisible");
      }
      
      // exports 上绑定的对象将被返回 
      exports.message = "hi";
      
      exports.say = function() {
      	console.log(message);
      }
      console.log(module.paths);
      ```
    
      ![3](.\img\3.png)
    
    - 在`example.js`中 用 require 导入 `figlet` 模块，查看   module.children 的值
    
      ![4](.\img\4.png)

```js
// example.js
var invisible = function () {
  console.log("invisible");
}

// exports 对象将被返回，注意只给exports可附加属性，不应覆盖exports对象
// 因为 exports 是 require函数的送给模块example.js的参数，是一个引用对象
exports.message = "hi";

exports.say = function () {
  console.log(message);
}
```

- 查看当前`REPL`中 `module module.id module.path module.children`

  ![5](.\img\5.png)

- 理解 require 前后 module.children module.

  ![6](.\img\6.png)

```js
//node REPL 
var example = require('./example.js');
example
```

4.  理解 es6 module   与 es5 module 的关系

    - 查看 `es5.js  es6.mjs`  学习 `es5  es6` 模块的写法
      
      es6中的模块写法：
      模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。
      一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。
      es5中的模块写法：
      1.逐个对api 和字段导出.
      2.调用模块的时候,直接调用
      3.使用require函数
      
      - 注意 es6 后缀 `mjs`
      
    - 查看 mod_es5.js mod_es6.mjs  
      
      ![7](.\img\7.png)
      
      ![8](.\img\8.png)
      
      - 理解 require 函数 与 import export 关键字的联系
      - 在 VS Code 中查看 
        - es5 模块  module module.exports  module.children的值
        
          ![9](.\img\9.png)
        
        - es6 模块中 有这些值吗？ 思考一下为什么？
        
          没有，es5的模块是一个对象，而es6的模块不是一个对象。es6中，使用export 命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。ES6 模块输出的是值的引用，输出接口动态绑定，ES6 模块编译时执行。
    
1. 思考 程序设计语言的演变过程 

    - 外置的require 函数（第三方库） 是如何 成为语言内置的功能 （关键字）
    
      使用export 命令用于规定模块的对外接口，import命令用于输人其他模块提供的功能。
    
    - 这种现象在 Javascript很常见
      - 原型继承 Function.prototype属性  ==>  class 关键字
      -  异步编程 async co 第三方库 ，promise 语言库 ==>   async  await 语言关键字
    
1. 自学阅读[模块设计原则](07/07.package.principle.md)

    - 理解内聚性原则与耦合性原则     
    
      内聚性原则：
      内聚性原则是开发者决定如何把类划分到不同包中的指导，它是一种“自底向上”的思想。内聚性不单单是指一个模块执行一项且仅单独一项功能，它还需要考虑到可重用性（reusability）和可开发性（developability），及其之间的相互作用力和需求之间的平衡关系。
      1.重用的粒度就是发布的粒度。
      2.一个包中的所有类应该是共同重用的。如果重用了包中的一个类，那么就要重用包中所有类。
      3.包中所有类对于同一种性质的变化应该是共同封闭的。一个变化若对一个封闭的包产生影响，则将对该包中的所有类产生影响，而对于其他包则不造成任何影响。
      耦合性原则：
      耦合性反映不同包之间的依赖关系。其受影响的因素有很多，如可开发性、逻辑设计、技术路线和行政力量等。我们可以通过依赖性管理度量去测试和判断一个设计的依赖性与抽象结构模式间的匹配程度。
      1.在包的依赖关系图中不允许存在环。
      2.朝着稳定的方向进行依赖。
      3.包的抽象程度应该与其稳定程度一致。
    
7. 完成[模块](http://sigcc.gitee.io/eloquent-js-3e-zh/#/10?id=十、模块)p145  1 2 3 题

    1.

    要创建的模块：graph模块，roads模块，state模块，runRobot模块，Robots模块
    其中graph模块依赖于dijkstrajs模块，导出函数buildGraph，buildGraph在road模块中，接受一个二元素数组

    roads模块依赖于./graph，返回路线图
    state模块依赖于./roads模块以及NPM中的random-item包，导出VillageState函数和runRobot函数
    runRobot模块依赖于VillageState模块，返回其当前地点
    Robots模块，依赖于./roads导出机器人的函数，为了goalOrientedRobots能够进行路径查找，还依赖于dijkstrajs.

    2.

    ```javascript
    const {buildGraph} = require("./graph");
    
    const roads = [
      "Alice's House-Bob's House",   "Alice's House-Cabin",
      "Alice's House-Post Office",   "Bob's House-Town Hall",
      "Daria's House-Ernie's House", "Daria's House-Town Hall",
      "Ernie's House-Grete's House", "Grete's House-Farm",
      "Grete's House-Shop",          "Marketplace-Farm",
      "Marketplace-Post Office",     "Marketplace-Shop",
      "Marketplace-Town Hall",       "Shop-Town Hall"
    ];
    
    exports.roadGraph = buildGraph(roads.map(r => r.split("-")));
    ```

    3.

    在开始加载模块之前用require函数将模块添加到其缓存中，如果在程序运行时做出任何require尝试调用加载某一个模块，此模块是已知的，并且返回当前接口，而不是再次加载模块。

    如果模块覆盖其module.exports值，则在完成加载之前已接收到其接口值的任何其他模块将保持默认接口模块，而不是预期接口值.

8. npm 使用 npm 建立一个 js 模块 并 导入使用

    - https://my.oschina.net/dkvirus/blog/1068813

      ![10](.\img\10.png)

      ![11](.\img\11.png)

9. 扩展阅读 John Conway’s Game of Life
    - [John Conway’s Game of Life](https://bitstorm.org/gameoflife/)
    - [uc.ch7.通用性无处不在.pdf](https://bb.zucc.edu.cn/bbcswebdav/users/j04014/books/Understanding.Computation/uc.ch7.通用性无处不在.pdf)
