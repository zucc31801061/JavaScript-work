

# 2020-2021学年第2学期
# **实 验 报 告**
![zucc](.\img\zucc.png)

- 课程名称:跨平台脚本开发技术  
- 实验项目:错误正则表达式
- 专业班级:计算机1801
- 学生学号:31801061
- 学生姓名:王灵霜
- 实验指导教师:郭鸣

## 实验内容

1. 阅读课本[第8章](http://sigcc.gitee.io/eloquent-js-3e-zh/#/8) 回答理解以下问题 
    - 8.2 如何声明严格模式
    
      将字符串"use strict"放在文件或函数体的开头。
    
    - 8.4 调试代码的方法有哪几种
    
      - 查看错误说明和该行代码
      - 用console.log查看程序行为
      - 使用浏览器的调试器功能设置断点
      - 在程序中包含一个debugger(调试器)语句(仅包含该关键字)
    
    - 8.6 try catch throw 的作用 
    
      throw关键字用于引发异常。捕获异常是通过在try块中包装一段代码，然后在try块之后加上关键字catch来完成的。当try块中的代码引发异常时，将计算catch块，并把括号中的名称绑定到异常值。在catch块完成之后，或者如果try块完成而没有问题，程序将在整个try/catch语句下继续执行。
    
    - 8.6 new Error() 构造函数 创建的错误对象有哪几个属性
    
      name ——设置或返回错误名称。具体来说，它返回错误所属的构造函数的名称。
      message——设置或返回错误消息
    
    - 说明何时会产生**SyntaxError**,**ReferenceError**, **RangeError**,**TypeError**
    
      **SyntaxError**：解析代码时发生的语法错误
    
      **ReferenceError**：引用一个不存在的变量时发生的错误，是一种语义错误。另一种触发场景是，将一个值分配给无法分配的对象，比如对函数的运行结果或者this赋值。
    
      **RangeError**：当一个值超出有效范围时发生的错误。主要有几种情况，一是数组长度为负数，二是Number对象的方法参数超出范围，以及函数堆栈超过最大值。
    
      **TypeError**：变量或参数不是预期类型时发生的错误。比如，对字符串、布尔值、数值等原始类型的值使用new命令，就会抛出这种错误，因为new命令的参数应该是一个构造函数。除此之外，调用对象根本不存在的方法也会抛出TypeError错误。
2.  阅读[正则表达式原理](http://sigcc.gitee.io/xplatform/#/06/063.regexp?id=原理)，请思考下面的问题
  - 基本规则，复合规则 如何理解

    原子规则：任意单个字符都是正则表达式匹配单个字符 /a/ --> a /b/ -->b

    复合规则：可以用顺序 ab, 分支 a|b, 循环 (ab)* , a* 对原子加以复合得到复合的表达式。 ()表示作用范围

  - 与编程语言的对应关系如何理解

    其他所有的规则是在上面规则的组合，正则表达式与编程语言的基本构造相同，这其实是计算的本质所决定的。
3. 阅读课本[第9章](http://sigcc.gitee.io/eloquent-js-3e-zh/#/9) 正则表达式
    - 字面量的写法与构造函数写法的不同

      1. 虽然函数字面量是一个匿名函数，但语法允许为其指定任意一个函数名，当写递归函数时可以调用它自己，使用构造函数则不行。
      2. 构造函数允许运行时JavaScript代码动态的创建和编译。在这个方式上它类似全局函数eval_r()。
      3. 构造函数每次执行时都解析函数主体，并创建一个新的函数对象。所以当在一个循环或者频繁执行的函数中调用构造函数的效率是非常低的。相反，函数字面量却不是每次遇到都重新编译的。
      4. 用构造函数创建一个函数时并不遵循典型的作用域，它一直把它当作是顶级函数来执行。

    - 9.5，9.6 请说明 [匹配和分组](http://sigcc.gitee.io/eloquent-js-3e-zh/#/9?id=匹配和分组)的用法 ，用分组在 `Wed Apr 06 2016 09:21:39 GMT+0900` 匹配出年月日 

      匹配：test方法是匹配正则表达式最简单的方法。该方法只负责判断字符串是否与某个模式匹配。正则表达式还有一个exec（执行，execute）方法，如果无法匹配模式则返回null，否则返回一个表示匹配字符串信息的对象。
      分组：分组是提取部分字符串的实用特性。如果我们不只是想验证字符串中是否包含日期，还想将字符串中的日期字符串提取出来，并将其转换成等价的日期对象，那么我们可以使用圆括号包围那些匹配数字的模式字符串，并直接将日期从exec的结果中提取出来。若分组最后没有匹配任何字符串（例如在元组后加上一个问号），结果数组中与该分组对应的元素将是`undefined`。类似的，若分组匹配了多个元素，则数组中只包含最后一个匹配项。

      ![1](.\img\1.png)

    - 9.7 如何获得当前的 “Unix时间” 

      ![2](.\img\2.png)

    - 9.8 请解释 “单词边界”的含义

      所谓单词边界，指的是起始和结束位置都是单词字符（也就是`\w`代表的字符集合），而起始位置的前一个字符以及结束位置的后一个字符不是单词字符。

    - 9.13 请举例说明 `贪婪模式` 与 `非贪婪模式`的区别

      - 贪婪模式： 根据匹配字符串以及表达式尽可能多的进行匹配能匹配的字符，并进行回溯，称为贪婪匹配模式

      - 非贪婪模式： 根据匹配字符串以及表达式尽可能少的进行匹配。使用的方法就是在修饰匹配次数的特殊符号后再加上一个?号进行限制 如"*?","+?","{n,}?","{n,m}?"

        ![3](.\img\3.png)

    - 9.12 请说明  "THIS is a word".replace(/^(\w+)\s((\s?\w+)+?)/,"$2 $1")的结果，如果 去掉最后的`?` 结果是什么？说明原因。

      结果：is THIS a word

      去掉？后：is a word THIS

      原因：+?为非贪婪模式，所以第一次完成匹配时即视为完成匹配。去掉'?'后，切换为贪婪模式，就会尽量多地匹配它们可以匹配的字符，一直执行到字符串结束。

    - 9.14  lastIndex属性起什么作用，请问  Regexp#exec() 方法有副作用吗？是否是纯函数？

      `lastIndex`是当正则表达式启用了全局（`g`）或者粘性（`y`），并且使用`exec`匹配模式时开始下一次查找的索引位置。第一次的时候总是为0的，第一次查找完了的时候会把`lastIndex`的值设为匹配到得字符串的最后一个字符的索引位置加1，第二次查找的时候会从`lastIndex`这个位置开始，后面的以此类推。如果没有找到，则会把`lastIndex`重置为0。全局和粘性选项之间的区别在于，启用粘性时，仅当匹配直接从`lastIndex`开始时，搜索才会成功，而全局搜索中，它会搜索匹配可能起始的所有位置。

      `RegExp.exec()`有副作用，不是纯函数，会改变 `RegExpObject` 的 `lastIndex` 等属性。

    - 9.16 全局选项，请说明 `/y/g`  中`g` 的含义

      正则表达式拥有选项，这些选项写在闭合斜线后面。`i`选项使匹配不区分大小写。`g`选项使表达式成为全局的，除此之外，它使`replace`方法替换所有实例，而不是第一个。`y`选项使它变为粘性，这意味着它在搜索匹配时不会向前搜索并跳过部分字符串。

    - 请自己学习理解 9.19 的正则表达式，用例子测试下。

      ![4](.\img\4.png)

1. 正则表达式，对于同一个问题可以有多种写法
    - [回溯](http://sigcc.gitee.io/eloquent-js-3e-zh/#/9?id=回溯)是正则表达式需要注意的问题
    
    - 请给出二进制数字的正则表达式的其他写法
    
      ^[01]+$
    
    - 思考回溯与编程中循环的联系
    
1.  理解先行断言
    
    - [先行断言](http://sigcc.gitee.io/xplatform/#/06/063.regexp?id=%ef%bc%883%ef%bc%89%e5%85%88%e8%a1%8c%e6%96%ad%e8%a8%80)
    
6. 完成第8章 p115 练习 2 题

    1.重试

    假设你有一个函数`primitiveMultiply`，它在20%的情况下做两个数字的惩罚，而另外80%的情况下引发了`MultiplicatorUnitFailure`类型的异常。写一个包裹这个笨重的函数的函数，它会一直尝试下去，直到调用成功，然后返回结果。

    确保只处理你尝试处理的异常。

    ```javascript
    class MultiplicatorUnitFailure extends Error {}
    
    function primitiveMultiply(a, b) {
    	if (Math.random() < 0.2) {
    		return a * b;
    	} else {
    		throw new MultiplicatorUnitFailure();
    	}
    }
    
    function reliableMultiply(a, b) {
    	try {
    		return primitiveMultiply(a, b);
    	} catch (e) {
    		if (e instanceof MultiplicatorUnitFailure) {
    			return reliableMultiply(a, b);
    		}
    	}
    
    }
    
    console.log(reliableMultiply(8, 8));
    ```

    ![6](.\img\6.png)

    2.锁上的盒子

    考虑以下对象：

    ```javascript
    const box = {
        locked: true,
        unlock() {
            this.locked = false;
        },
        lock() {
            this.locked = true;
        },
        _content: [],
        get content() {
            if (this.locked) throw new Error("Locked!");
            return this._content;
        }
    };
    ```

    这是一个带锁的盒子。盒子里有一个数组，但只有当盒子解锁时你才能看到它。禁止直接访问私有_content（内容）属性。

    编写一个名为`withBoxUnlocked`的函数，它将函数值作为参数，解锁盒子，运行函数，然后确保在返回之前再次锁上盒子，无论参数函数正常返回还是引发异常。

    ```javascript
    const box = {
        locked: true,
        unlock() {
            this.locked = false;
        },
        lock() {
            this.locked = true;
        },
        _content: [],
        get content() {
            if (this.locked) throw new Error("Locked!");
            return this._content;
        }
    };
    
    function withBoxUnlocked(body) {
        //Your code here.
    }
    
    withBoxUnlocked(function() {
        box.content.push("gold piece");
    });
    
    try {
        withBoxUnlocked(function() {
            throw new Error("Pirates on the horizon! Abort!");
        });
    } catch (e) {
        console.log("Error raised:", e);
    }
    
    console.log(box.locked);
    // → true
    ```

    对于额外的要求，请确保如果你在已解锁的情况下调用withBoxUnlocked，则该盒子保持解锁状态。

    ```javascript
    const box = {
        locked: true,
        unlock() {
            this.locked = false;
        },
        lock() {
            this.locked = true;
        },
        _content: [],
        get content() {
            if (this.locked) throw new Error("Locked!");
            return this._content;
        }
    };
    
    function withBoxUnlocked(body) {
        try {
            body()
        } catch (e) {
            console.log(e)
        } finally {
            box.lock()
        }
    }
    
    withBoxUnlocked(function() {
        box.content.push("gold piece");
    });
    
    console.log(box._content);
    
    try {
        withBoxUnlocked(function() {
            throw new Error("Pirates on the horizon! Abort!");
        });
    } catch (e) {
        console.log("Error raised:", e);
    }
    
    console.log(box.locked);
    // → true
    ```

    ![5](.\img\5.png)

7. 完成第9章 p133  练习1 2 3 题

1.正则表达式高尔夫

代码高尔夫是尝试以尽可能少的字符来描述特定程序的游戏中的术语。类似地，正则表达式高尔夫是一种用尽可能端的正则表达式来匹配给定模式，而且只能匹配那种模式的练习。

对于以下每个条目，编写正则表达式以测试给定的子串是否在字符串中出现。正则表达式匹配的字符串，应该只包含以下描述的子串之一。除非明显提到单词边界，否则千万不要担心边界问题。当你的表达式有效时，请检查一下能否让正则表达式更短小。

1. `car`和`cat`
2. `pop`和`prop`
3. `ferret`、`ferry`和`ferrari`
4. 以`ious`结尾的单词
5. 句号、冒号、分号之前的空白字符
6. 多于六个字母的单词
7. 不包含`e`（或者`E`）的单词

```javascript
verify(/ca[rt]/,
	["my car", "bad cats"],
	["camper", "high art"]);

verify(/p(r)?op/,
	["pop culture", "mad props"],
	["plop", "prrrop"]);

verify(/ferr(et|y|ari)/,
	["ferret", "ferry", "ferrari"],
	["ferrum", "transfer A"]);

verify(/(ious)\b/,
	["how delicious", "spacious room"],
	["ruinous", "consciousness"]);

verify(/\s[,:.]/,
	["bad punctuation ."],
	["escape the period"]);

verify(/\w{7}/,
	["hottentottententen"],
	["no", "hotten totten tenten"]);

verify(/\b(?![\w]*e)[\w]+\b/i,
	["red platypus", "wobbling nest"],
	["earth bed", "learning ape", "BEET"]);


function verify(regexp, yes, no) {
	// Ignore unfinished exercises
	if (regexp.source == "...") return;
	for (let str of yes)
		if (!regexp.test(str)) {
			console.log(`Failure to match '${str}'`);
		}
	for (let str of no)
		if (regexp.test(str)) {
			console.log(`Unexpected match for '${str}'`);
		}
}
```

2.引用的样式

想象一下，你编写了一个故事，自始至终都使用单引号来标记对话。现在你想要将对话的引号替换成双引号，但不能替换在缩略形式中使用的单引号。

思考一下可以区分这两种引号用法的模式，并手动调用`replace`方法进行正确替换。

```javascript
let text = "'I'm the cook,' he said, 'it's my job.'";
// Change this call.

console.log(text.replace(/((?<=[^\w])\')|^\'/g,"\""))
// → "I'm the cook," he said, "it's my job."
```

![7](.\img\7.png)

3.再次匹配数字

编写一个表达式，只匹配 JavaScript 风格的数字。支持数字前可选的正号与负号、十进制小数点、指数计数法（`5e-3`或`1E10`，指数前也需要支持可选的符号）。也请注意小数点前或小数点后的数字也是不必要的，但数字不能只有小数点。例如`.5`和`5.`都是合法的 JavaScript 数字，但单个点则不是。

```javascript
let number = /^((\+|\-)?([\d]+)?((\.[\d]+|(e[\d]+))?(e(\+|\-)?[\d]+)?)|([\d]+\.))$/i;
// Tests:
for (let str of ["1", "-1", "+15", "1.55", ".5", "5.",
		"1.3e2", "1E-4", "1e+12"
	]) {
	if (!number.test(str)) {
		console.log(`Failed to match '${str}'`);
	}
}
for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5",
		".5.", "1f5", "."
	]) {
	if (number.test(str)) {
		console.log(`Incorrectly accepted '${str}'`);
	}
}
```

