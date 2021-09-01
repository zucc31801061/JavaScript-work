# 2019-2020学年第2学期
# **实 验 报 告**
![zucc](./img/zucc.png)

- 课程名称:跨平台脚本开发技术  
- 实验项目:函数入门
- 专业班级:计算机1801
- 学生学号:31801061
- 学生姓名:王灵霜
- 实验指导教师:郭鸣

## 实验内容

1. 教材第三章 p38页 习题1,2,3

    1.写一个函数`min`，它接收两个参数并返回它们的最小值

    ```javascript
    function mymin(a, b) {
        return a > b ? a : b;
    }
    ```

    ![1](.\img\1.png)

    2.定义递归函数`isEven`。次函数应接受单个参数（正参数）并返回布尔值。用50和75测试它。看看它在-1上的表现。以及为什么？你能想出解决这个问题的方法吗？

    ```javascript
    function isEven(x) {
        if(x == 0)
            return true;
        else if(x == 1)
            return false;
        else
            return isEven(x - 2);
    }
    console.log(isEven(50));
    // → true
    console.log(isEven(75));
    // → false
    console.log(isEven(-1));
    // → Uncaught RangeError: Maximum call stack size exceeded
    ```

    ![2](.\img\2.png)

    -1将会一直进行递归，无法取得0或者是1。

    改进方法1：定义负值为无效数字

    ```javascript
    function isEven(x) {
        if(x < 0)
            return "invalid number";
        else if(x == 0)
            return true;
        else if(x == 1)
            return false;
        else
            return isEven(x - 2);
    }
    ```

    ![3](.\img\3.png)

    改进方法2：将负值转换为正值

    ```javascript
    function isEven(x) {
        if(x < 0)
            x = -x;
        if(x == 0)
            return true;
        else if(x == 1)
            return false;
        else
            return isEven(x - 2);
    }
    ```

    ![4](.\img\4.png)

    3.编写一个函数`countBs`，它将一个字符串作为唯一参数，并返回一个数字，表示字符串中有多少个大写"B"字符。

    ```javascript
    function countBs(str) {
        let sum = 0;
        for(const e of data){
            if (e == "B") {
                sum++;
            }
        }
        return sum;
    }
    ```

    ![5](.\img\5.png)

    编写一个名为`countChar`的函数，其行为类似于`countBs`，除了它需要第二个参数来指示要计数的字符（而不是仅计算大写的"B"字符）。使用这个新函数重写`countBs`。

    ```javascript
    function countChar(str, c) {
        let sum = 0;
        for (const e of str) {
            if (e == c) {
                sum++;
            }
        }
        countChar.countBs = (data) => {
            //console.log("i am called");
            return countChar(data, "B");
        };
        return sum;
    }
    ```

    ![6](.\img\6.png)

    ![7](.\img\7.png)

1. 阅读第三章 p.30 理解[调用栈](http://sigcc.gitee.io/eloquent-js-3e-zh/#/3?id=%e8%b0%83%e7%94%a8%e6%a0%88) 。按下面所述，修改`chichen egg` 函数。（有的对结果有影响，有的没有）
    - 请修改程序，记录并显示在溢出前最多可以相互调用次数  
    
      ![8](.\img\8.png)
    
    - 请给程序添加 不同个数，不同类型的参数
    
    - 参数个数的变化对调用次数的影响
    
    - 参数类型对调用次数的影响 
    
      推断参数类型对调用次数无影响。
    
      ![9](.\img\9.png)
    
      推断参数个数对调用次数有影响，参数个数越多，调用层数越少。
    
      ![10](.\img\10.png)
    
    - 假设一个 Number 占用 8 字节，请估计调用栈的大小

```js
        // 由于node 堆栈溢出时候会闪退
       // 用process.on函数监听程序退出的异常，并调用exitprog
    var called = 0   
    function exitprog(){
        console.log("stack overflow:"+called) ; process.exit(1);
    }
    process.on('uncaughtException', exitprog)

        //请如下例所示，自行调整egg的参数
        //egg(1,2,"asdf")
        //egg([1,2])
```

size = x * 15547

size = (x + 8) * 10365

x约为16

size = 16 * 15547 = 248752 Byte

约为243KB

3. 运行 [递归](http://sigcc.gitee.io/eloquent-js-3e-zh/#/3?id=递归) 一节中（p.33） `findSolution`程序

    - 请修改程序计算出 1-100内 调用深度最大的 数字

      ```javascript
      function findSolution(target){
          function find(current, history){
              if(current == target){
                  return history;
              }
              else if(current > target){
                  return null;
              }
              else{
                  return find(current + 5, `(${history} + 5)`) ||
                         find(current * 3, `(${history} * 3)`);
              }
          }
          return find(1, "1");
      }
      
      let max = 0;
      let line = "";
      let number = 0;
      for (let i = 1; i <= 100; i++) {
          let steps = findSolution(i) || "";
          let len = 0;
          for(const e of steps){
              if(e == '1' || e == '3' || e == '5'){
                  len++;
              }
          }
          if (len >= max) {
              max = len;
              line = steps;
              number = i;
          }
      }
      console.log(number + " = " + line);
      ```

      ![13](.\img\13.png)

    - 画出该数字 p.34 的 [调用图][callgraph]
      find(1, "1")

      ​	find(6, "(1 + 5)")

      ​		find(11, "((1 + 5) + 5)")

      ​		………………

      ​		find(96, "(((((((((((((((((((1 + 5) + 5) + 5) + 5) + 5) + 5) + 5) + 5) + 5) + 5) + 5) + 5) + 5) + 5) + 5) + 5) + 5) + 5) + 5)")

      ​			found!

4. 递归实现**考拉兹猜想** [Collatz conjecture][Collatz]

    任取一个自然数，如果它是偶数，我们就把它除以2，如果它是奇数，我们就把它乘3再加上1。在这样一个变换下，我们就得到了一个新的自然数。如果反复使用这个变换，我们就会得到一串自然数。
    比如说我们先取5，首先我们得到3*5+1=16，然后是16/2=8，接下去是4，2和1，由1我们又得到4，于是我们就陷在4→2→1这个循环中了。
    再举个例子，最开始的数取7，我们得到下面的序列：7→22→11→34→17→52→26→13→40→20→10→5→16→8→4→2→1这次复杂了一点，但是我们最终还是陷在4→2→1这个循环中。

    - 请编程 给出一个数字，输出考拉兹序列

      ```javascript
      function collatz(data) {
          function find(current, history) {
              if (current == 1) {
                  return history;
              }
              else if (current % 2 == 0) {
                  return find(current / 2, `${history} -> ` + (current / 2));
              }
              else {
                  return find(current * 3 + 1, `${history} -> ` + (current * 3 + 1));
              }
          }
          return find(data, data);
      }
      ```

      ![11](.\img\11.png)

    - 请输出 1-100间 考拉兹序列最长的数字

      ```javascript
      function collatz(data) {
          function find(current, history) {
              if (current == 1) {
                  return history;
              }
              else if (current % 2 == 0) {
                  let step = Math.floor(current / 2);
                  return find(step, `${history} -> ${step}`);
              }
              else {
                  let step = current * 3 + 1;
                  return find(step, `${history} -> ${step}`);
              }
          }
          return find(data, `${data}`);
      }
      
      let max = 0;
      let line = "";
      for (let i = 1; i <= 100; i++) {
          let steps = collatz(i) || "";
          let len = steps.split("->").length;
          if (len >= max) {
              max = len;
              line = steps;
          }
      }
      console.log(line);
      ```

      ![12](.\img\12.png)


5. 理解 [第一级对象 First Class Object](https://sigcc.gitee.io/xplatform/#/02/02.control.flow.function?id=第一级对象-first-class-object) 4条特点
   
	- 写出代码，在代码中用注释说明 是哪条特点
  
    ```javascript
    //可以赋值给变量
    let one = function(){
        return 1;
    }
    //可以放置于数据结构中（数组）
    let set = { "class": "1801", "name": () => { return "wang"; } };
    set.name();
    //可以作为参数传递给其他函数
    let test = function(a){
        return a();
    }
    console.log(test(one))
    //可以作为返回值
    let test2 = function(){
        return one;
    }
    console.log(test2()());
    ```
  
1. 理解 p.31  [闭包](http://sigcc.gitee.io/eloquent-js-3e-zh/#/3?id=闭包) 
    - 观看视频 2-7.函数简介.Closure.Object.ecm.mp4，学习使用DevTools 查看函数的代码与申明环境
    
    - 写一个 function makeAccount(n) 程序
    
        var account = makeAccount(100);
        account(10); //给帐号存钱
        account(-10); //给帐号扣钱
        account(); //显示当前账户余额

        ```javascript
        function makeAccount(m){
            return money => {
                if(money === undefined)
                    return m;
                else
                    m = m + money;
            }
        }
        ```
    
        ![14](.\img\14.png)
    
    - 在 DevTools  中找到闭包中n的值
    
        ![15](.\img\15.png)
    
    - 采用部分应用技术,支持多个币种 'RMB' 'EURO' '$'
    
        var rmbAccount = makeAccount('RMB'); 
        var account = rmbAccount(10);
        
        ```javascript
        function makeAccount(kind){
              return (m) =>{
                  return (money) => {
                      if(money===undefined)
                          return kind + " " + m;
                      else
                          m =  m + money;
                  }
              }
        }
        ```
    
1. 理解 **纯函数** [函数的副作用](http://sigcc.gitee.io/eloquent-js-3e-zh/#/3?id=函数及其副作用) 的区别,写出一个纯函数（数学函数）和 有副作用的函数（访问外面变量，修改外部变量，输入输出）
    
    ```javascript
const first=(a, b)=>{
         return a + b;
    }
    let c = 7;
    const second=(a, b)=>{
         c = c + a + b;
         console(c);
    }
    ```
    
    - 说明使用纯函数的好处
    
      纯函数的一个主要有点是可以直接测试。 如果传入参数相同，产生的结果也将相同，这对于测试的编写是非常友好的。同时纯函数还使得维护和重构代码变得更加容易。正确地使用纯函数可以产生更加高质量的代码，也是一种更加干净的编码方式。
    
    - 上面题目中 你写的 Collatz函数是纯函数吗？ 如果不是请写出一个纯函数版本的Collatz函数。
    
      我写的是纯函数。
    
8. 请举例说明 原始值类型 Number String Boolean 比较与
  复合类型 [] {} 比较的不同  == vs ===

  ```javascript
  "1" == 1;                            // ->  true
  "1" === 1;                           // ->  false
  [1, 2, 3] == [1, 2, 3];              // -> false
  let a = [1];
  let b = a;
  a === b;							 // ->  true
  { 1: 2, 3: 4 } == { 1: 2, 3: 4 };    // -> false
  ```

9. 学习[es6][es6] 函数部分

    - `ES6`使用`=`为函数的参数赋默认值。赋值之后已经被默认声明，故不能用`let`或`const`再次声明。参数默认值不是传值的，而是每次都重新计算默认值表达式的值。

    - 指定了默认值以后，函数的`length`属性，将返回没有指定默认值的参数个数。如果设置了默认值的参数不是尾参数，那么`length`属性也不再计入后面的参数了。

    - 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。

    - `ES6` 引入`rest`参数（形式为`...变量名`），用于获取函数的多余参数。rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。函数的`length`属性，不包括`rest`参数。

    - `ES6`规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。

    - 函数的`name`属性，返回该函数的函数名。如果将一个匿名函数赋值给一个变量，ES6 的`name`属性会返回实际的函数名。`Function`构造函数返回的函数实例，`name`属性的值为`anonymous`。`bind`返回的函数，`name`属性值会加上`bound`前缀。

    - `ES6` 允许使用“箭头”（`=>`）定义函数。如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用`return`语句返回。由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。

    - 箭头函数有几个使用注意点。

      （1）函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。

      （2）不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。

      （3）不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

      （4）不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数。

      上面四点中，第一点尤其值得注意。`this`对象的指向是可变的，但是在箭头函数中，它是固定的。

    - 由于箭头函数使得`this`从“动态”变成“静态”，下面两个场合不应该使用箭头函数。一个是定义对象的方法，且该方法内部包括`this`。第二个是需要动态`this`的时候，也不应使用箭头函数。另外，如果函数体很复杂，有许多行，或者函数内部有大量的读写操作，不单纯是为了计算值，这时也不应该使用箭头函数，而是要使用普通函数，这样可以提高代码可读性。

    - 尾调用是指某个函数的最后一步是调用另一个函数。尾调用不一定出现在函数尾部，只要是最后一步操作即可。

    - 只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”。目前只有 Safari 浏览器支持尾调用优化，Chrome 和 Firefox 都不支持。

    - 函数调用自身，称为递归。如果尾调用自身，就称为尾递归。递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。

    - 函数式编程有一个概念，叫做柯里化，意思是将多参数的函数转换成单参数的形式。

    - 递归本质上是一种循环操作。纯粹的函数式编程语言没有循环操作命令，所有的循环都用递归实现，这就是为什么尾递归对这些语言极其重要。对于其他支持“尾调用优化”的语言（比如 Lua，ES6），只需要知道循环可以用递归代替，而一旦使用递归，就最好使用尾递归。

    - ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。

      这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。

      - `func.arguments`：返回调用时函数的参数。
      - `func.caller`：返回调用当前函数的那个函数。

      尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。严格模式禁用这两个变量，所以尾调用模式仅在严格模式下生效。

    - `toString()`方法，将返回一模一样的原始代码。

10. 完成[CLOSURE PUZZLES](https://sigcc.gitee.io/xplatform/slides/Functions.html#/8)部分的练习，思考运行结果，并说明。(网站404)

11. 学习使用帮助手册[devdocs.io][devdocs]
     - 查找帮助，配置(enable) 帮助文件 

       ![16](.\img\16.png)

     - 将帮助文档下载到本地

       ![17](.\img\17.png)

12. (选) 思考一下，如何自己[实现闭包](https://cn.bing.com/search?q=%E9%97%AD%E5%8C%85%E5%AE%9E%E7%8E%B0&FORM=HDRSC1)

[Collatz]: http://www.equn.com/wiki/3x%2B1%E9%97%AE%E9%A2%98#.E4.B8.80.E4.B8.AA.E7.AE.80.E5.8D.95.E7.9A.84.E9.97.AE.E9.A2.98
[es6]: http://es6.ruanyifeng.com/#docs/function
[devdocs]:  https://devdocs.io/ "devdocs"
[callgraph]: https://cn.bing.com/images/search?q=call+graph&FORM=HDRSC2
```

```