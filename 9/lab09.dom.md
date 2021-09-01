

# 2020-2021学年第2学期
# **实 验 报 告**
![zucc](.\img\zucc.png)

- 课程名称:跨平台脚本开发技术  
- 实验项目:DOM 
- 专业班级:计算机1801
- 学生学号:31801061
- 学生姓名:王灵霜
- 实验指导教师:郭鸣

## 实验内容

1. 阅读 [十三、浏览器中的 JavaScript](http://sigcc.gitee.io/eloquent-js-3e-zh/#/13?id=十三、浏览器中的-javascript)相关内容 回答理解以下问题 
    - 13.2 请给出如下URL 各个部分的含义
        - `http://10.66.27.234/lab/lab07.uc.fsm/#_2?name=desk`
        
          `http://`:  协议
        
          `10.66.27.234`: 域名部分
        
          `/lab/`: 虚拟目录部分
        
          `lab07.uc.fsm/#_2?`: 文件名部分
        
          `name=desk`: 参数部分
        
    - 13.3 什么是 **[HTML 实体](https://www.w3school.com.cn/html/html_entities.asp)**，请举例，实体的作用是什么,如何用实体表示  **版权符号** copyright ， **人民币符号** 
    
        在 HTML 中，某些字符是预留的。
    
        在 HTML 中不能使用小于号（<）和大于号（>），这是因为浏览器会误认为它们是标签。
    
        实体的作用: 能够正确的显示预留字符，防止浏览器将其误认为标签。
    
        人民币符号: 实体名称: &yen;实体编号: &#165;
    
        版权符号: 实体名称: &copy;实体编号: &#169;
    
    - 13.4 JavaScript 加载过程
    
        正常的网页加载流程如下:
    
        1.浏览器一边下载HTML网页，一边开始解析网页
    
        2.解析过程中，发现<script>标签
    
        ​	1.暂停解析网页，网页渲染的控制权转交给JavaScript引擎
    
        ​	2.如果script标签引用了外部脚本，就下载该脚本，否则就直接执行
    
        3.执行完毕，控制权交还渲染引擎，恢复往下解析HTML网页
    
        加载外部脚本时，浏览器会暂停页面渲染，等待脚本下载并执行完成后，再继续渲染。
    
1. 阅读[十四、文档对象模型](http://sigcc.gitee.io/eloquent-js-3e-zh/#/14?id=十四、文档对象模型)相关内容 回答理解以下问题
   
    - 14.2 写出下面HTML代码的DOM tree
        
        - [code](code.html)
        
          ```javascript
          var element = {
          	tagName: 'div', 
          	children: [ 
          		{tagName: 'p', children: [
          			{tagName: 'a', props: {href: '../dom.html'}, children: ["浏览器打开代码"]},
          			{tagName: 'code', children: ["ctrl+shift+i"]},
          			{"进入控制台"}
          		]},
          		{tagName: 'p', children: ["其结构如下"]},
          		{tagName: 'p', children: [
          			{tagName: 'img', props: {src: '../images/html_boxes.png',alt:''}}
          		]},
          	]
          }
          ```
        
    - 14.6  [修改文档](http://sigcc.gitee.io/eloquent-js-3e-zh/#/14?id=修改文档) 请编程将p175 p元素 `one two three` 复制一份 并逆次序排列。
    
        ```html
        <p>One</p>
        <p>Two</p>
        <p>Three</p>
        
        <script>
        	let paragraphs = document.body.getElementsByTagName("p");
        	document.body.insertBefore(paragraphs[2], paragraphs[0]);
        	document.body.insertBefore(paragraphs[2], paragraphs[1]);
        </script>
        ```
    
        ![1](.\img\1.png)
    
    - 14.9 [布局](http://sigcc.gitee.io/eloquent-js-3e-zh/#/14?id=布局)请在浏览器查看元素的getBoundingClientRect()返回的对象，请说明其含义。
    
        ![2](.\img\2.png)
    
        `getBoundingClientRect`方法是获取屏幕中某个元素精确位置的最有效方法。该方法返回一个对象，包含`top`、`bottom`、`left`和`right`四个属性。
    
        top: 元素上边到视窗上边的距离;
    
        right: 元素右边到视窗左边的距离;
    
        bottom: 元素下边到视窗上边的距离;
    
        left: 元素左边到视窗左边的距离;
    
        width: 是元素自身的宽
    
        height是元素自身的高
    
        X: x轴上的坐标
    
        y: y轴上的坐标
    
    - 14.9 14.10 [样式](http://sigcc.gitee.io/eloquent-js-3e-zh/#/14?id=样式)请说明 display:block display:inline的区别,display:none的作用
    
        display: block——元素显示为块元素
    
        display: inline——元素显示为内联元素
    
        display: none——元素不显示
    
    - 14.13 请[位置与动画](http://sigcc.gitee.io/eloquent-js-3e-zh/#/14?id=位置与动画)明 CSS中 position: static,relative,absolute的区别，请调整定位方式的值，使图像分别显示在，屏幕正中，屏幕右下，屏幕左下。
    
        position: static——表示元素处于文档中的默认位置
    
        position: relative——元素在文档中依然占据空间，但此时其top和left样式属性则是相对于常规位置的偏移。
    
        position: absolute——元素从默认文档流中移除，该元素将不再占据空间，而会与其他元素重叠。其top和left属性则是相对其最近的闭合元素的偏移，其中position属性的值不是static。如果没有任何闭合元素存在，则是相对于整个文档的偏移。
    
        屏幕正中
    
        ![3](.\img\3.png)
    
        屏幕右下
    
        ![4](.\img\4.png)
    
        屏幕左下
    
        ![5](.\img\5.png)
    
    - 14.13 [位置与动画](http://sigcc.gitee.io/eloquent-js-3e-zh/#/14?id=位置与动画)请运行p179的例子，修改代码，比较没有采用requestAminmationFrame()方法的运行结果，说明requestAminmationFrame的作用
    
        不采用`requestAminmationFrame()`: 没有动画效果，猫不动了
    
        `requestAminmationFrame`的作用:脚本使用`requestAnimationFrame`在每次浏览器准备重绘屏幕时调用animate函数。animate函数再次调用`requestAnimationFrame`以准备下一次更新。当浏览器窗口（或标签）激活时，更新频率大概为 60 次每秒，这种频率可以生成美观的动画。若我们只是在循环中更新 DOM，页面会静止不动，页面上也不会显示任何东西。浏览器不会在执行 JavaScript 程序时刷新显示内容，也不允许页面上的任何交互。这就是我们需要`requestAnimationFrame`的原因，该函数用于告知浏览器 JavaScript 程序目前已经完成工作，因此浏览器可以继续执行其他任务，比如刷新屏幕，响应用户动作。我们将动画生成函数作为参数传递给`requestAnimationFrame`。为了确保每一毫秒猫的移动是稳定的，而且动画是圆滑的，它基于一个速度，角度以这个速度改变这一次与上一次函数运行的差。
    
        `requestAnimationFrame`不需要使用者指定循环间隔时间，浏览器会基于当前页面是否可见、CPU的负荷情况等来自行决定最佳的帧速率，从而更合理地使用CPU。
    
    - 学习常用的[CSS 选择器参考手册](http://www.w3school.com.cn/cssref/css_selectors.asp)  
        - 按F12 进入 DevTools  进入 Elements 面板，选择 DOM tree 上的元素。参考上面的文档，理解 copy selector 的值
        
          body > p > img
        
        - 查看 copy outerHtml的值
        
          ```html
          <img src="../img/cat.png" style="position: relative">
          ```
        
        - 用document.querySelector() 定位页面的 p 元素 查看该 元素的  textContent  innerHtml outerHtml属性的值
        
          ![6](.\img\6.png)
    
1. 完成 [习题](http://sigcc.gitee.io/eloquent-js-3e-zh/#/14?id=习题) 14.15 1 2 3 题

    习题1：

    ```html
    <h1>Mountains</h1>
    
    <div id="mountains"></div>
    
    <script>
    	const MOUNTAINS = [{
    			name: "Kilimanjaro",
    			height: 5895,
    			place: "Tanzania"
    		},
    		{
    			name: "Everest",
    			height: 8848,
    			place: "Nepal"
    		},
    		{
    			name: "Mount Fuji",
    			height: 3776,
    			place: "Japan"
    		},
    		{
    			name: "Vaalserberg",
    			height: 323,
    			place: "Netherlands"
    		},
    		{
    			name: "Denali",
    			height: 6168,
    			place: "United States"
    		},
    		{
    			name: "Popocatepetl",
    			height: 5465,
    			place: "Mexico"
    		},
    		{
    			name: "Mont Blanc",
    			height: 4808,
    			place: "Italy/France"
    		}
    	];
    
    	function table(str) {
    		let form = document.getElementById("mountains");
    		let tr = document.createElement("tr");
    		tr.style.fontSize = "20px";
    		tr.style.fontWeight = "600";
    		for (x in str[0]) {
    			let th = document.createElement("th");
    			th.style.width = "150px"
    			th.appendChild(document.createTextNode(x + " "));
    			tr.appendChild(th)
    		}
    
    		form.appendChild(tr);
    		for (var i = 0; i < str.length; i++) {
    			let tb = document.createElement("tb");
    			for (var x in str[i]) {
    				let td = document.createElement("td");
    				td.appendChild(document.createTextNode(str[i][x]));
    				td.style.textAlign = "center";
    				td.style.width = "150px";
    				tb.appendChild(td);
    			}
    			form.appendChild(tb);
    			form.appendChild(document.createElement("br"));
    		}
    	}
    	table(MOUNTAINS);
    </script>
    ```

    ![7](.\img\7.png)

    习题2：

    ```html
    <h1>Heading with a <span>span</span> element.</h1>
    <p>A paragraph with <span>one</span>, <span>two</span>spans.</p>
    
    <script>
    	function byTagName(node, tagName) {
    		var str = [];
    		tagName = tagName.toUpperCase();
    
    		function find(node) {
    			for (let i = 0; i < node.childNodes.length; i++) {
    				let child = node.childNodes[i];
    				if (node.childNodes[i].nodeType == document.ELEMENT_NODE) {
    					if (node.childNodes[i].nodeName == tagName) {
    						str.push(node.childNodes[i]);
    					}
    					find(node.childNodes[i]);
    				}
    			}
    		}
    		find(node);
    		return str;
    	}
    
    	console.log(byTagName(document.body, "h1").length);
    	// → 1
    	console.log(byTagName(document.body, "span").length);
    	// → 3
    	let para = document.querySelector("p");
    	console.log(byTagName(para, "span").length);
    	// → 2
    </script>
    ```

    ![8](.\img\8.png)

    习题3：

    ```html
    <style>
    	body {
    		min-height: 200px
    	}
    </style>
    <img src="../img/cat.png" id="cat" style="position: absolute">
    <img src="../img/hat.png" id="hat" style="position: absolute">
    
    <script>
    	let cat = document.querySelector("#cat");
    	let hat = document.querySelector("#hat");
    
    	let angle = 0;
    	let lastTime = null;
    
    	function animate(time) {
    		if (lastTime != null) angle += (time - lastTime) * 0.001;
    		lastTime = time;
    		cat.style.top = (Math.sin(angle) * 40 + 200) + "px";
    		cat.style.left = (Math.cos(angle) * 200 + 230) + "px";
    
    		hat.style.left = (Math.sin(angle + Math.PI) * 40 + 230) + "px";
    		hat.style.top = (Math.cos(angle + Math.PI) * 200 + 230) + "px";
    
    		requestAnimationFrame(animate);
    	}
    	requestAnimationFrame(animate);
    </script>
    ```

    猫水平旋转，帽子垂直旋转。

    ![9](.\img\9.png)

1. 阅读[浏览器工作原理详解](http://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/)

1. （选）学习[vdom](http://sigcc.gitee.io/xplatform/#/09/09.vdom)自己实现一个Vdom算法

1. （选 ）请准备一个Javascript 技术的小专题

 