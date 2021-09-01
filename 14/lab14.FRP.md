





# 2020-2021学年第2学期
# **实 验 报 告**
![zucc](.\img\zucc.png)

- 课程名称:跨平台脚本开发技术  
- 实验项目:  函数响应式程序设计
- 专业班级：计算机1801
- 学生学号：31801061
- 学生姓名：王灵霜
- 实验指导教师:郭鸣

## 实验内容

- FRP [Readings](15/frp.cyclejs)


- 函数式编程(F)

  - Pipe Compose
  
    函数式编程中有一种模式是通过组合多个函数的功能来实现一个组合函数。一般支持函数式编程的工具库都实现了这种模式，这种模式一般被称作compose与pipe。
  
    ```javascript
    const R = require('ramda');
    function inc (num) {
      return ++num;
    }
    const fun1 = R.compose(Math.abs, inc, Math.pow)
    const fun2 = R.pipe(Math.pow, Math.abs, inc)
    console.log(fun1(-2, 3)) // 7
    console.log(fun2(-2, 3)) // 9
    ```
  
    从上面的例子可以看出，假设`f`、`g`、`h`分别表示三个函数，则`compose(f,g,h)`返回的函数完成类似`(...args) => f(g(h(...args)))`的功能。即从右到左组合多个函数，前面函数的返回值作为下一个函数的参数;`pipe(f,g,h)`返回的函数完成类似`(...args) => h(g(f(...args)))`的功能，即从左到右组合多个函数，前面函数的返回值作为下一个函数的参数；预计最先执行的函数可以接受任意个参数，后面的函数预计只接受一个参数。把`compose`放在前面讲是因为其更加体现了数学含义上的从右到左的操作。`redux`中即有使`compose`函数的应用来增强`store`
  
    ```javascript
    import { createStore, applyMiddleware, compose } from 'redux'
    import thunk from 'redux-thunk'
    import DevTools from './containers/DevTools'
    import reducer from '../reducers'
    const store = createStore(
      reducer,
      compose(
        applyMiddleware(thunk),
        DevTools.instrument()
      )
    )
    ```
  
    总的来说，`compose`和`pipe`函数接收函数序列，并返回一个函数，使用数组的`reduce`方法可以很容易实现这两个函数，下面是`redux`源码中对`compose`方法的实现：
  
    ```javascript
    function compose(...funcs) {
      if (funcs.length === 0) {
        return arg => arg
      }
    
      if (funcs.length === 1) {
        return funcs[0]
      }
    
      return funcs.reduce((a, b) => (...args) => a(b(...args)))
    }
    ```
  
    符号结合律意味着不管你是把`g`和 `h`分到一组，还是把`f`和`g`分到一组都不重要。在实际开发过程中，我们可以尽可能的最小化函数的功能，这也符合单一原则，然后通过结合以及组合来完成较大的功能需求。
  
  - Curry
  
    在计算机科学中，柯里化（currying），又译为卡瑞化或加里化，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。这个技术由克里斯托弗·斯特雷奇以逻辑学家哈斯凯尔·加里命名的。
  
    再简洁一些就是：柯里化是把接受多个参数的函数变换成接受一个单一参数的函数，并且返回接受余下的参数而且返回结果的新函数的技术。
  
    由调用方式可知，add 函数每次执行后一定返回一个函数，以供后续调用，且返回的函数依然要返回自身，供多级调用；
    当最后一次调用结束，返回的是一个函数，为了满足题意，需要改写内部返回的函数 toString （代码中也解释）；
    为了进行求和，需要在 add 函数内部维护一个闭包变量 args，args 是个数组，存放了第一次调用 add 和 后续调用 fn 函数时传入的参数；
    在调用 fn 的 toString 方法时，意味着最后一次调用结束，返回函数，那么就计算 args 数组中的所有值得和即可求出结果
  
  - [函数式编程术语](http://10.66.27.234:3000/#/04/048.fp.jargon)
  
    1、纯函数
    定义：对于相同的输入，永远得到相同的输出，不依赖，不修改其作用域之外变量的函数
  
    2、偏函数
    定义：固定一个函数的一个或者多个参数，然后返回一个新函数，返回入参函数的剩余函数的接受应用
  
    3、节流
    定义：节流就是预定一个函数只有在大于等于周期时才执行，周期内调用不执行，就好像水滴积攒到一定重量后才会落下一样。
  
    4、防抖
     定义：函数需要频繁触发时，只有足够空闲的时间，才执行一次。
  
    5、扁平化   
    定义：把一个多维数组降维   
  
- 响应式程序设计（R）
  
	- 广义响应论 A General Theory of Reactivity (R)
	  
		- https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
		- https://bb.zucc.edu.cn/bbcswebdav/users/j04014/JavaScript/gtor.html.zip 
		
	- 参考资料
	
	    - http://reactivex.io/tutorials.html
	    
	    响应式网站设计
	    
	    响应式网站设计的理念是：页面的设计与开发应当根据用户行为以及设备环境(系统平台、屏幕尺寸、屏幕定向等)进行相应的响应和调整。具体的实践方式由多方面组成，包括弹性网格和布局、图片、CSS media query的使用等。无论用户正在使用笔记本还是iPad，我们的页面都应该能够自动切换分辨率、图片尺寸及相关脚本功能等，以适应不同设备；换句话说，页面应该有能力去自动响应用户的设备环境。响应式网页设计就是一个网站能够兼容多个终端——而不是为每个终端做一个特定的版本。这样，我们就可以不必为不断到来的新设备做专门的版本设计和开发了。
	    
	    响应式编程
	    
	    响应式编程是一种面向数据流和变化传播的编程范式。这意味着可以在编程语言中很方便地表达静态或动态的数据流，而相关的计算模型会自动将变化的值通过数据流进行传播。响应式编程最初是为了简化交互式用户界面的创建和实时系统动画的绘制而提出来的一种方法，但它本质上是一种通用的编程范式。


- FRP Practice & Framework

  函数式反应式编程(FRP) 是一种采用函数式编程的基础部件（如 map、reduce、filter 等）进行反应式编程（异步数据流编程）的编程范式。FRP 被用于GUI、机器人和音乐方面的编程，旨在通过明确时间模型来简化这些问题。

  普通的 FRP 模型，从输入到输出都不太适合交互式程序。在从输入映射到输出的过程中缺乏“运行”程序的能力可能意味着必须使用以下解决方案之一：

  创建一个用于输出的数据结构来表示活动。活动必须被一个外部的解释器或环境来运行。它继承了最初 Haskell 的流式 I/O 的全部难点。
  
  使用箭头化的 FRP 并嵌入能够处理动作的箭头。活动也必须要有ID，以便让它们分别维护不可变存储之类的东西。这就是 Fudgets 库采取的办法。
  
  最新颖的方法就是允许活动运行在（在 IO 单子中）但将它们结果的接收推迟到之后。它采用了事件 Event 和 IO 单子之间的交互，并与更加面向表达式的 FRP 兼容：
  
  ```javascript
  planNow :: Event (IO a) -> IO (Event a)
  ```
  
  存在两种类型的 FRP 系统，基于推送的和基于拉取的。基于推送的系统接收事件并将它们推过一个信号网络来达到某种结果。基于拉取的系统会等待结果请求，并逆向通过该网络来取回请求的结果。
  
  某些 FRP 系统例如 Yampa 使用采样。在一个定期内，采样被推过一个信号网络。这种方法有两个缺点：在一个定期内处理样本的计算量会非常大，而且网络必须在等待采样区间的间隔时找出输入的更改。采样就是个基于推送的 FRP 示例。

  - hyperapp  demo [hyperapp-realworld-example-app-master.zip](https://bb.zucc.edu.cn/bbcswebdav/users/j04014/JavaScript/final/hyperapp-realworld-example-app-master.zip)

- Cycle.js 
  	- [introduction of Cycle.js](http://lmatteis.github.io/cyclejs-slides/keynote/assets/player/KeynoteDHTMLPlayer.html#0)
  
	- [demo1](https://glebbahmutov.com/draw-cycle/)
- [demo2](http://slides.com/bahmutov/hyped#/)
- Rethinking reactivity

  - [视频](https://bb.zucc.edu.cn/bbcswebdav/users/j04014/JavaScript/video/Rich%20Harris%20-%20Rethinking%20reactivity.mp4)

  - [字幕](https://bb.zucc.edu.cn/bbcswebdav/users/j04014/JavaScript/video/Rich%20Harris%20-%20Rethinking%20reactivity.srt)


- Javascript-from-imperative-to-frp
	
	
	- http://slides.com/bahmutov/js-from-imperative-to-frp#/3/2
	- [github.com/bahmutov/javascript-journey](https://github.com/bahmutov/javascript-journey)
	
- 大作业参考： 
	
	- 使用 Functional programming : Ramda /.. Sancturay
	- 使用 FRP framwork : Cycle.js / hypperapp 
	
	

