

# 2020-2021学年第2学期
# **实 验 报 告**
![zucc](.\img\zucc.png)

- 课程名称:跨平台脚本开发技术  
- 实验项目:DOM 事件
- 专业班级:计算机1801
- 学生学号:31801061
- 学生姓名:王灵霜
- 实验指导教师:郭鸣

## 实验内容

1. 阅读[课本](http://sigcc.gitee.io/eloquent-js-3e-zh/#/15?id=%e5%8d%81%e4%ba%94%e3%80%81%e5%a4%84%e7%90%86%e4%ba%8b%e4%bb%b6)相关内容 回答理解以下问题 (网站是15章，教材是14章，以下以教材为准)
    - 15.1 请说明`addEventListener("click",function(){} )` 两个参数的作用
    
      第一个参数：字符串，指定事件名。
    
      第二个参数：指定要事件触发时执行的函数。当事件对象会作为第一个参数传入函数。 事件对象的类型取决于特定的事件。
    
    - 15.2 如何反注册事件处理函数。
    
      `removeEventListener`方法将删除一个处理器，使用类似于`addEventListener`的参数调用。赋予`removeEventListener`的函数必须是赋予`addEventListener`的完全相同的函数值。 因此，要注销一个处理其，您需要为该函数提供一个名称，以便能够将相同的函数值传递给这两个方法。
    
    - 15.3 事件 `Event Object event.which envent.type`的作用
    
      Event Object:定义一个事件
    
      event.which：which属性用于返回onkeypress事件触发的键的值的字符代码，或者 onkeydown或onkeyup事件的键的代码。
    
      event.type：type属性代表事件的类型，如onlick中的click；
    
    - 15.4 请说明事件捕获的过程
        
        对于大多数事件类型，在具有子节点的节点上注册的处理器，也将接收发生在子节点中的事件。若点击一个段落中的按钮，段落的事件处理器也会收到点击事件。但若段落和按钮都有事件处理器，则先执行最特殊的事件处理器（按钮的事件处理器）。也就是说事件向外传播，从触发事件的节点到其父节点，最后直到文档根节点。最后，当某个特定节点上注册的所有事件处理器按其顺序全部执行完毕后，窗口对象的事件处理器才有机会响应事件。
        
        - 如果父节点和子节点的同名事件，那个先被处理
        
          外部元素的事件会先被触发，然后才会触发内部元素的事件，即： <div> 元素的点击事件先触发 ，然后再触发 <p> 元素的点击事件。父节点。
        
        - `event.stopPropagation()`函数的作用
        
          事件处理器任何时候都可以调用事件对象的stopPropagation方法，阻止事件进一步传播。
        
        - `event.target`属性的作用
        
          大多数事件对象都有target属性，指的是事件来源节点。你可以根据该属性防止无意中处理了传播自其他节点的事件。我们也可以使用target属性来创建出特定类型事件的处理网络。
        
    - 15.5 举例说明`event.preventDefault()`函数的作用
    
      大多数事件都有与其关联的默认动作。若点击链接，就会跳转到链接目标。若点击向下的箭头，浏览器会向下翻页。若右击鼠标，可以得到一个上下文菜单等。
    
      对于大多数类型的事件，JavaScript 事件处理器会在默认行为发生之前调用。若事件处理器不希望执行默认行为（通常是因为已经处理了该事件），会调用`preventDefault`事件对象的方法。
    
      你可以实现你自己的键盘快捷键或交互式菜单。你也可以干扰用户期望的行为。例如，这里实现一个无法跳转的链接。
    
      event.preventDefault()是通知浏览器不要执行与事件关联的默认动作。
    
      例如，下述代码跳转功能失效。
    
      ![1](.\img\1.png)
    
    - 15.6 `keydown,keyup,keypress`事件的区别在哪里，event对象上的 `event.keyCode event.ctrlKey event.charCode`属性有哪些作用
    
      keydown：按下键盘时触发该事件。
      keypress：只要按下的键并非Ctrl、Alt、Shift和Meta，就接着触发keypress事件。
      keyup：松开键盘时触发该事件。
      event.keyCode：获取按下的键盘按键Unicode值
      event.ctrlKey：ctrl键，表示是否按下对应的键，返回的是一个boolean值
      event.charCode：charCode属性返回一个数值，表示keypress事件按键的Unicode值
    
    - 15.7 `mousedown, mouseup,click`事件的区别在哪里?
    
      click：click事件当用户在Element节点、document节点、window对象上，单击鼠标（或者按下回车键）时触发。“鼠标单击”定义为，用户在同一个位置完成一次mousedown动作和mouseup动作。
      mousedown：mousedown事件在按下鼠标键时触发。
      mouseup：mouseup事件在释放按下的鼠标键时触发
    
    - 15.7   运行课本案例，演示拖拉控件的效果。
    
      ![2](.\img\2.png)
    
    - 15. 8请学的例子。给段落中的文本实现滚动条效果。
      
        - [效果参考codemirror] [codemirror]
      
        - ![codemirror](.\img\codemirror.png)
      
          ```html
          <style>
          	#progress {
          		width: 470px;
          		height: 195px;
          	}
          
          	.CodeMirror-scroll {
          		overflow: auto;
          		height: 360px;
          		width: 860px;
          	}
          </style>
          <textarea id="progress">
            <html style="color: green">
              <!-- this is a comment -->
              <head>
                <title>Mixed HTML Example</title>
                <style>
                  h1 {font-family: comic sans; color: #f0f;}
                  div {background: yellow !important;}
                  body {
                    max-width: 50em;
                    margin: 1em 2em 1em 5em;
                  }
                </style>
              </head>
              <body>
                <h1>Mixed HTML Example</h1>
                <script>
                  function jsFunc(arg1, arg2) {
                    if (arg1 && arg2) document.body.innerHTML = "achoo";
                  }
                </script>
              </body>
            </html>
          </textarea>
          <link rel="stylesheet" href="./codemirror-5.61.0/lib/codemirror.css" />
          <script type="text/javascript" src="./codemirror-5.61.0/lib/codemirror.js"></script>
          <script type="text/javascript" src="./codemirror-5.61.0/mode/xml/xml.js"></script>
          <script>
          	editor_req = CodeMirror.fromTextArea(document.getElementById("progress"), {
          		mode: "xml",
          		lineNumbers: true,
          		scrollbarStyle: null
          	});
          </script>
          ```
      
          ![3](.\img\3.png)
      
    - 15.9-10请说明 `focus blur load beforeunload`事件。
    
      focus(): 该对象获得焦点
    
      blur(): 该对象失去焦点
    
      load(): 当界面结束装载时，会触发窗口对象和文档body对象的"load"事件。该事件通常用于在当整个文档构建完成时，进行初始化。
    
      beforeunload(): 当页面关闭或跳转（比如跳转到一个链接）时，会触发beforeunload事件。该事件用于防止用户突然关闭文档而丢失工作结果。
    
    - 15.11 为什么需要使用`Worker ，postMessage`有何作用
    
      postMessage: 该方法会发送一条消息，触发接收方的message事件。安全地实现了Window对象之间的跨域通信。
      Worker: 创建工作单元的脚本通过Worker对象收发消息，而worker则直接向其全局作用域发送消息，或监听其消息。
    
    - 15.13 请运行 降频的例子。修改参数，显示结果。
    
      ![4](.\img\4.png)
    
1. 运行[Worker](/worker.zip),请修改你的`worker`,实现`worker`线程 计算`fibonacci`数.计算完毕后返回结果给主线程.
    - 安装 `npm i -g http-server` , 用`hs`运行本地的 测试服务器

      ![5](.\img\5.png)
    
    - 注意 修改 `work.js`后 需要 按 `ctrl+f5`强制刷新浏览器对` js `文件的缓存.否则`js`更改不会起作用.
    
      用递归有点问题，会显示超出最大堆栈，所以用了非递归方法
    
      ```javascript
      //work.js
      // self 是当前worker的global对象
      
      //监听 父线程的消息
      
      self.addEventListener('message', function(e) {
      	self.postMessage('You said: ' + e.data);
      }, false)
      
      self.onmessage = function(event) {
      	var method = event.data.method;
      	var args = event.data.args;
      
      	function doSomething(args) {
      		return Fibonacci(args);
      	}
      
      	function Fibonacci(args) {
      		if (args == 1 || args == 2) {
      			return 1;
      		} 
      		else {
      			var arr = [];
      			arr[0] = 1, arr[1] = 1;
      			for (var i = 2; i < args; i++) {
      				var temp = arr[0] + arr[1];
      				arr[1] = arr[0];
      				arr[0] = temp;
      			}
      
      			return arr[0];
      		}
      	}
      	var reply = doSomething(args);
      
      	self.postMessage({
      		method: method,
      		reply: reply
      	});
      }
      ```
    
      ![6](.\img\6.png)


3. 请利用[codemirror][codemirror] 写一个简单的JavaScript 文本编辑器。 
    - [参考](https://www.phodal.com/blog/lumia-editor-diy-yourself-editor/)
    - 实现如下功能
        - 打开，保存，关闭文件
        - 自动对焦到输入区域
        - 退出前提示保存
        - 定时保存 30s
        - 右键上下文菜单
        - 快捷键 Ctrl+O Ctrl+S Ctrl+N等功能
        - 固定菜单 (position: fixed)
        - 采用[awesome-javascript-cn][awesome-javascript-cn]的其他改进

1. (选做)查看[awesome-javascript-cn][awesome-javascript-cn]
[microjs][microjs] 学习查找JavaScript库
  - 在上题中使用 [mousetrap][mousetrap] 库 给你的编辑器添加快捷键功能
    - JavaScript语言的一大特点是, 实际应用开发需要大量的第三方库, 可以通过 比较相关的库[libhunt][libhunt]
  - 如果上题的程序 需要支持 手机/平板 的 touch 操作,请你比较并选择相关的js库来实现此功能.


5. 完成 15.15  1 2 3 题

   习题1：

   ```html
   <p style="font-size: 10px;">🎈</p>
   <script>
   	// Your code here
   	let p = document.querySelector("p");
   	let fontsize = 15;
   	p.style.fontSize = fontsize + "px";
   	
   	function addFontSize(event) {
   		if (event.key == "ArrowUp") {
   			fontsize *= 1.1;
   			p.style.fontSize = fontsize + "px";
   			if (fontsize > 100) {
   				p.textContent = "💥";
   				document.body.removeEventListener("keydown", addFontSize);
   			}
   			event.preventDefault();
   		} else if (event.key == "ArrowDown") {
   			fontsize *= 0.9;
   			if (fontsize > 10) {
   				p.style.fontSize = fontsize + "px";
   			}
   			event.preventDefault();
   		}
   	}
   	document.body.addEventListener("keydown", addFontSize);
   </script>
   ```

   ![7](.\img\7.png)

   习题2：

   ```html
   <style>
   	.trail {
   		/* className for the trail elements */
   		position: absolute;
   		height: 6px;
   		width: 6px;
   		border-radius: 3px;
   		background: teal;
   	}
   
   	body {
   		height: 300px;
   	}
   </style>
   
   <script>
   	// Your code here.
   	window.addEventListener("mousemove", event => {
   		let trail = document.createElement("div");
   		trail.className = "trail";
   		trail.style.left = (event.pageX - 4) + "px";
   		trail.style.top = (event.pageY - 4) + "px";
   		document.body.appendChild(trail);
   	});
   </script>
   ```

   ![8](.\img\8.png)

   习题3：

   ```html
   <tab-panel>
   	<div data-tabname="one">Tab one</div>
   	<div data-tabname="two">Tab two</div>
   	<div data-tabname="three">Tab three</div>
   </tab-panel>
   <script>
   	function asTabs(node) {
   		let tabs = Array.from(node.children).map(node => {
   			let button = document.createElement("button");
   			button.textContent = node.getAttribute("data-tabname");
   			let tab = {
   				node,
   				button
   			};
   			button.addEventListener("click", () => selectTab(tab));
   			return tab;
   		});
   
   		let tabList = document.createElement("div");
   		for (let {
   				button
   			} of tabs) tabList.appendChild(button);
   		node.insertBefore(tabList, node.firstChild);
   
   		function selectTab(selectedTab) {
   			for (let tab of tabs) {
   				let selected = tab == selectedTab;
   				if (tab == selectedTab) {
   					tab.node.style.display = "";
   					tab.button.style.color = "blue";
   				} else {
   					tab.node.style.display = "none";
   					tab.button.style.color = "";
   				}
   			}
   		}
   		selectTab(tabs[0]);
   	}
   	asTabs(document.querySelector("tab-panel"));
   </script>
   ```

   ![9](.\img\9.png)

[codemirror]:     http://codemirror.net/mode/htmlmixed/index.html
[microjs]: http://microjs.com
[awesome-javascript-cn]: https://github.com/jobbole/awesome-javascript-cn
[mousetrap]: https://github.com/ccampbell/mousetrap
[libhunt]: https://js.libhunt.com/
