

# 2020-2021学年第2学期
# **实 验 报 告**
![zucc](.\img\zucc.png)

- 课程名称:跨平台脚本开发技术  
- 实验项目:项目实战-Egg语言解释器
- 专业班级:计算机1801
- 学生学号:31801061
- 学生姓名:王灵霜
- 实验指导教师:郭鸣

## 实验内容

1. 阅读课本[十二、项目：编程语言](http://sigcc.gitee.io/eloquent-js-3e-zh/#/12?id=十二、项目：编程语言)相关内容 回答理解以下问题
    - 画出p159 12. 4 页代码的 语法树AST图
    
      ![1](.\img\1.jpg)
    
    - 12.2 请说明 apply 的求值过程
    
      求解器程序具有处理某种表达式类型的代码。文字值表达式产生其值。对于绑定，我们必须检查它是否存在作用域内实际定义，如果是，则获取绑定的值。
    
      应用涉及更多事项，如果它们是特殊形式，比如if，我们不计算任何内容并将参数表达式范围一起传递给处理此种形式的函数。如果是正常调用，我们将对运算符进行评估，验证它是否为函数，并使用求值的参数调用它。
    
      我们使用一般的 JavaScript 函数来表示 Egg 的函数。在定义特殊格式`fun`时，我们再回过头来看这个问题。
    
      `evaluate`的递归结构类似于解析器的结构。两者都反映了语言自身的结构。我们也可以将解析器和求值器集成到一起，在解析的同时求解表达式，但将其分离为两个阶段使得程序更易于理解。
    
1. 在浏览器打开代码中 index.html

    在浏览器打开代码中 index.html

    ![2](.\img\2.png)

    - 查看教材 p155 的egg 代码 使用 parse, parseExpression,parseApply函数 运行 返回的结果

      ![3](.\img\3.png)

      ![4](.\img\4.png)

    - 自己写一段 egg 代码,看看parse函数返回的 抽象语法树对象

      ![5](.\img\5.png)

    - 提示:用 JSON.stringify(ast_obj) 将抽象语法树对象ast_obj转换为字符串

      ![6](.\img\6.png)

1. 完成[习题](http://sigcc.gitee.io/eloquent-js-3e-zh/#/12?id=习题)  12.8 1 2 3 4 题

   1.数组

   通过向顶级作用域添加一下三个函数，将对数组的支持添加到Egg中: array(...values)构造包含参数值的数组，使用length(array)获取数组的长度，以及element(array,n)从数组中获取第n个元素。

   ![7](.\img\7.png)

   2.闭包

   我们定义fun的方式允许Egg中的函数引用包含它的作用域，允许函数的函数体使用在定义函数时可见的局部值，就像JavaScript函数一样。

   下面的程序说明了这一点 : 函数f返回一个函数，此函数将其参数添加到f的参数中，这意味着它需要访问f中的局部作用域才能使用绑定a。

   ```javascript
   run(`
   do(define(f, fun(a, fun(b, +(a, b)))),
      print(f(4)(5)))
   `);
   // → 9
   ```

   回到fun形式的定义，并解释哪种机制导致它起作用。

   fun返回的函数可以访问为其封闭函数赋予的scope参数，并在调用函数时使用它来创建函数的局部作用域。这意味着局部作用域的原型将是创建函数的作用域，这使得可以从函数访问此作用域中的绑定。

   3.注释

   如果我们能在 Egg 中写注释会很不错。例如，每当我们找到一个井号(#)时，我们就可以将该行的其余部分视为注释并忽略它，类似于JavaScript中的//。

   我们不必对解析器进行任何重大修改来支持它。我们可以简单地更改skipSpace以跳过注释，就像它们是空格一样，以便调用skipSpace的所有地方现在也将跳过注释。进行更改。

   ![8](.\img\8.png)

   4.修复作用域

   目前绑定赋值的唯一方法是`define`。该语言构造可以同时实现定义绑定和将一个新的值赋予已存在的绑定。

   这种歧义性引发了一个问题。当你尝试为一个非局部绑定赋予新值时，你最后会定义一个局部绑定并替换掉原来的同名绑定。一些语言的工作方式正和这种设计一样，但是我总是认为这是一种笨拙的作用域处理方式。

   添加一个类似于`define`的特殊形式`set`，该语句会赋予一个绑定新值，若绑定不存在于内部作用域，则更新其外部作用域相应绑定的值。若绑定没有定义，则抛出`ReferenceError`（另一个标准错误类型）。

   我们目前采取的技术是使用简单的对象来表示作用域对象，处理目前的任务非常方便，此时我们需要更进一步。你可以使用`Object.getPrototypeOf`函数来获取对象原型。同时也要记住，我们的作用域对象并未继承`Object.prototype`，因此若想调用`hasOwnProperty`，需要使用下面这个略显复杂的表达式。

   ```js
   Object.prototype.hasOwnProperty.call(scope, name);
   ```

   ![9](.\img\9.png)

1. [Scheme](scheme)有很多实现，其中一个是 JavaScript的 `npm i -g biwascheme` 运行`biwas`

1. - 学习简单的[Scheme](scheme)
    - 将 p155 `Egg` 代码改为`scheme`后 在`biwascheme`中运行

```js
run(`
do(define(plusOne, fun(a, +(a, 1))),
   print(plusOne(10)))
`);
// → 11

run(`
do(define(pow, fun(base, exp,
     if(==(exp, 0),
        1,
        *(base, pow(base, -(exp, 1)))))),
   print(pow(2, 10)))
`);
// → 1024
```

![10](.\img\10.png)


6. 请说明函数的求值过程

   plusOne：接受一个参数，与1相加然后返回

   pow：接受一个基准值和一个次方，如果一个次方为0则返回1，否则将基准乘以一个 传入基准和次方减一以后的pow函数  进行递归

- 查看代码 定义的add函数

  ![11](D:\计算机科学\study2021上\跨平台脚本开发技术\实验\8\img\11.png)

- 查看 topScope中创建的 add 函数

  ![12](.\img\12.png)

- 理解 add函数调用时候 对函数body求值的过程
  - 理解add的参数是如何 ，扩展原有的环境的。
  
    定义一个newEnv对象，将参数绑定到对象上，然后将对象和函数的求值语句传入evaluate函数，求值结果并返回。

```js
//定义第一个 egg 函数
fun(a,b, +(a,b)) 

define: func(a,b) { body}

//调用 egg 函数
call: func(xx,yy)  -->  
            newEnv{..., a:xx ,b:yy} -- evaluate(body,newEnv)

   topScope{...}  
```

7. 请将`Egg`的语法改为 `Scheme`
    - `(if (> a 10) 5 false )`
    - `fun` 改为 `lambda` 表达式 `((lambda (x y) (* x y) ) 2 3)  =>6`

1. 选做
   - 参考 https://github.com/franciscop/human-error
   - 能为egg 提供比较人性化的出错提示吗?
   - 参考 biwascheme ,是否可以实现类似的 终端求值 console repl
   - 是否可以实现为 [oneline repl](https://repl.it/languages/scheme)

1. 自学阅读[程序的含义](08/08.uc.semantic.md)
    - 请说明 小步语义和 大步语义的区别
    
      小步语义定义了一种在一个计算步骤中一次评估表达式的方法。从形式上来说，表达语言的一个小步语义是一个关系称为归约关系。小步语义详细描述了表达式所发生的事情。它可以给出无限链的精确描述，甚至是非终止程序。
      大步语义在中间。表达式语言和一组值上的一大步语义是关系。它将表达式与它的值相关（如果语言是不确定的，则可能有多个值）。通常，特殊值用于非终止表达式。
    
    - 请说明什么是 指称语义
    
      指称语义（英语：Denotational semantics）是通过构造表达其语义的(叫做指称(denotation)或意义的)数学对象来形式化计算机系统的语义的一种方法。编程语言的形式语义的其他方法包括公理语义和操作语义。指称语义方式最初开发来处理一个单一计算机程序定义的系统。
    
1. 选做
    - 参考[程序的含义](08/08.uc.semantic.md)中**指称语义**，实现`Egg`编译到`JavaScript`   //transpiler, compiler
    - 12.8.4
    - 如何支持模块
    - 如何支持 repl
    - 给出错误时候的 行号 与位置信息
    - 结合 上题,请思考,你对egg 的改进 哪些是属于 语法方面的改进,哪些是属于语义方面的改进.
    - 参考[forth](https://leanpub.com/readevalprintlove003/read) 和 **Jeforth** 将 Egg 编译到 stack base language 

1. 选做
    - 实现egg列表数据结构与操作,[1,2]表示列表, cons,car,cdr功能如下
        - cons(1,[]) => [1]
        - cons(1,[2]) => [1,2]
        - car([1,2]) => 1
        - cdr([1,2]) => [2]

1. 选做
    - 参考课件中给出的[forth](/08/08.egg.interpreter?id=forth)资料
    - 实现一个 [forth](http://sigcc.gitee.io/easyforth) 解释器

