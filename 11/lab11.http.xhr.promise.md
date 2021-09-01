
# 2020-2021学年第2学期

# **实 验 报 告**

![zucc](.\img\zucc.png)

- 课程名称:跨平台脚本开发技术
- 实验项目:Http JavaScript异步Http请求XHR Promise
- 专业班级:计算机1801
- 学生学号:31801061
- 学生姓名:王灵霜
- 实验指导教师:郭鸣

## 实验内容

1. 阅读课本相关内容 回答理解以下问题
    - 18.1 理解Http请求与响应的格式

        Http请求（三部分）：

        1.请求行request（方法、路径、协议版本）

        2.头部headers（支持协议工作的名称值对（k，v）pairs name：value）

        3.消息体body（From Data、上传文件）

        Http响应（三部分）：

        1.响应行（协议、状态码、状态短语）
        2.头部
        3.信息体

    - 18.2 请在DevTools/F12中 , Network面板中，查看 GET POST 方式提交的数据 ，请求，响应的内容,请求行,状态码,状态短语,头部的内容
      
    - ```bash
        //在12.form.html 所在的目录，运行下面的命令，启动 http server
        npm i -g http-server 
        hs
        ```
        
        - 连接URL地址 http://127.0.0.1:8080/12.form.html
        
        - 给出 hs命令的 结果，是web server 的连接日志，对结果加以说明
        
          ![1](.\img\1.png)
        
        - ```bash
          [2020-05-12T03:06:17.434Z]  "GET /12.form.html" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.4100.0 Iron Safari/537.36"
          [2020-05-12T03:06:17.596Z]  "GET /favicon.ico" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.4100.0 Iron Safari/537.36"
          ```
        
          1.请求行："GET /12.form.html"是方法+路径，"?name=1111&message=1111"是传递的参数
          2.头部："Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"是浏览器标识
        
    - 18.4/5 请访问http://127.0.0.1:8080/ 在DevTools中, Console面板中，写出请求的返回结果

        ![2](.\img\2.png)
    ```js
    //同步请求
    var req = new XMLHttpRequest();
    req.open("GET", "/12.form.html", false); //sync request
    req.send(null);
    console.log(req.status, req.statusText);
    // → 200 OK
    console.log(req.getResponseHeader("content-type"));
    // → text/plain
    //
    //异步请求
    var req = new XMLHttpRequest();
    req.open("GET", "/12.form.html", true); //async request
    req.addEventListener("load", function() {
    console.log("Done:", req.status);
    });
    req.send(null);
    ```
    - 请说明 异步请求与同步请求的区别。

      1. 同步请求：顺序处理，即当我们向服务器发出一个请求时，在服务器没返回结果给客户端之前，我们要一直处于等待状态直至服务器将结果返回到客户端，我们才能执行下一步操作。例如普通的B/S模式就是同步请求（注：B/S模式 也即服务器与浏览器通信主要采用HTTP协议；通信方式为“请求——响应”，浏览器发出请求；服务器做出响应。
      2. 异步请求：并行处理，当我们向服务器发出一个请求时，在服务器没返回结果之前，我们还是可以执行其他操作。例如AJAX技术就是异步请求。

    - 18.8 请结合代码 说明使用抽象的好处

      从功能上来讲，抽象类定义了一个接口，即方法调用规约，派生类实现具体的规约。这实际上可以将具体的实现和接口分离开来，从而达到底层细节变化而高层框架不变的需求，通俗一点就是解耦。

    - 18.8 请理解在XHR中为何无法捕获回调函数的异常

      try...catch只能捕获同步代码里面的异常，异步调用里面的异常无法捕获。在XHR中使用的是异步请求，调用的callback代码在得到返回值时运行，try catch 已经结束，故无法捕获异常。

    - 18.9 请理解Promise对象的作用

      Promise 对象是一个代理对象（一个值），被代理的值在Promise对象创建时可能是未知的。它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。 这让异步方法可以像同步方法那样返回值，但并不是立即返回最终执行结果，而是一个能代表未来出现的结果的promise。

    - 18.9 Promise对象 then方法返回的对象类型是什么.

      then()方法返回的依然是一个Promise对象、
      
      - 请用 Fetch API 完成 12.form.html 提交
      
        ```html
        <div>GET</div>
        <p>Name: <input type="text" name="name"></p>
        <p>Message:<br><textarea name="message"></textarea></p>
        <p><button onclick="fetch1()">Send via GET </button></p>
        
        <div>POST</div>
        <p>Name: <input type="text" name="name"></p>
        <p>Message:<br><textarea name="message"></textarea></p>
        <p><button onclick="fetch2()">Send via POST </button></p>
        
        
        <script>
        	var fetch1 = function() {
        		fetch("http://127.0.0.1:8080/12.form.html?name=" + document.getElementsByName("name")[0].innerText +
        			"&message=" + document.getElementsByName("message")[0].innerText, {
        				method: "GET",
        				headers: {
        					"Content-Type": "application/x-www-form-urlencoded"
        				},
        
        			}).then(function(res) {
        			if (res.ok) {
        				console.log("Perfect! Your settings are saved.");
        			} else if (res.status == 401) {
        				console.log("Oops! You are not authorized.");
        			}
        		}, function(e) {
        			console.log("Error submitting form!");
        		});
        	}
        
        	var fetch2 = function() {
        		fetch("http://127.0.0.1:8080/12.form.html", {
        			method: "POST",
        
        			headers: {
        				"Content-Type": "application/x-www-form-urlencoded"
        			},
        			body: "name=" + document.getElementsByName("name")[1].innerText + "&message=" + document
        				.getElementsByName("message")[1].innerText,
        		}).then(function(res) {
        			if (res.ok) {
        				console.log("Perfect! Your settings are saved.");
        			} else if (res.status == 401) {
        				console.log("Oops! You are not authorized.");
        			}
        		}, function(e) {
        			console.log("Error submitting form!");
        		});
        	}
        </script>
        ```
      
        ![3](.\img\3.png)

1. 完成 18.17  1  题

    ```javascript
    const url = "https://eloquentjavascript.net/author";
    const types = ["text/plain",
    	"text/html",
    	"application/json",
    	"application/rainbows+unicorns"
    ];
    
    async function showTypes() {
    	for (let type of types) {
    		let resp = await fetch(url, {
    			headers: {
    				accept: type
    			}
    		});
    		console.log(`${type}: ${await resp.text()}\n`);
    	}
    }
    
    showTypes();
    ```

    ![4](.\img\4.png)

1. 学习[Fiddler教程](https://www.jianshu.com/p/99b6b4cd273c) 在实验中使用该软件 分析 `http请求与响应`的数据

    ![5](.\img\5.png)

1. 请查看类似于   https://api.github.com
    - 用 XHR 或 Fetch API
    
    - 获取一个项目的描述,项目最新的提交记录等信息.
    
      ```javascript
      fetch("https://api.github.com/repos/zucc31801061/31801061subway", {
          method: "GET",
      }).then(function(res) {
        	console.log(res);
          return res.json()
      }).then(function(json) {
          console.log( json)
      });
      ```
    
      ![6](.\img\6.png)
    
    - 将内容显示在网页上
    
      ```html
      <p>描述：</p>
      <p id="myp"></p>
      <p>最近一次提交：</p>
      <p id="mydate"></p>
      <script>
      	fetch("https://api.github.com/repos/zucc31801061/31801061subway", {
      		method: "GET",
      	}).then(function(res) {
      		console.log(res);
      		return res.json()
      	}).then(function(json) {
      		document.getElementById("myp").innerHTML = json.description;
      		document.getElementById("mydate").innerHTML = json.pushed_at;
      	})
      </script>
      ```
    
      ![7](.\img\7.png)
    
    - 找找 天气接口 或地理位置接口 显示天气预报,或 你当前的ip 地址信息
    
      ```html
      <p>天气：</p>
      <p id="myp"></p>
      <script>
      	fetch("http://wthrcdn.etouch.cn/weather_mini?city=杭州", {
      		method: "GET",
      	}).then(function(res) {
      		console.log(res);
      		return res.json()
      	}).then(function(json) {
      		document.getElementById("myp").innerHTML = JSON.stringify(json.data);
      	})
      </script>
      ```
    
      ![8](.\img\8.png)
    
1. 阅读文章[Promise](https://sigcc.gitee.io/xplatform/#/11/11.promise)相关文章

    - [https://bb.zucc.edu.cn/bbcswebdav/users/j04014/JavaScript/homework/11.Tasks%2C%20microtasks%2C%20queues%20and%20schedules.pdf](https://bb.zucc.edu.cn/bbcswebdav/users/j04014/JavaScript/homework/11.Tasks%2C microtasks%2C queues and schedules.pdf)

    - 什么是任务，什么是微任务

      |                    | 宏任务（macrotask）                                          | 微任务（microtask）                                          |
      | ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
      | 谁发起的           | 宿主（Node、浏览器）                                         | JS引擎                                                       |
      | 具体事件           | 1. script (可以理解为外层同步代码) 2. setTimeout/setInterval 3. UI rendering/UI事件 4. postMessage，MessageChannel 5. setImmediate，I/O（Node.js） | 1. Promise 2. MutaionObserver 3. Object.observe（已废弃；`Proxy` 对象替代） 4. process.nextTick（Node.js） |
      | 谁先运行           | 后运行                                                       | 先运行                                                       |
      | 会触发新一轮Tick吗 | 会                                                           | 不会                                                         |

1. `npm install -g json-server`  `npm install faker` 

    - 参考[文章](https://segmentfault.com/a/1190000008574028)

    - 请写出 GET/POST/PUT/DELETE的请求fetch api调用代码

      ![9](.\img\9.png)

      ```javascript
      //GET
      fetch('http://localhost:3000/wls/')
      .then(function(response) {
      return response.json()
      }).then(function(json) {
      console.log('parsed json: ', json)
      }).catch(function(ex) {
      console.log('parsing failed: ', ex)
      });
      
      //POST
      fetch('http://localhost:3000/wls/', {
      method: 'post',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      "id": 2,"name": "zuccwls","number": "31801061"
      })
      }).then(function(response) {
      return response.json()
      }).then(function(json) {
      console.log('parsed json: ', json)
      }).catch(function(ex) {
      console.log('parsing failed: ', ex)
      });
      
      //PUT
      fetch('http://localhost:3000/wls/1', { //在url后面指定下id就好
      method: 'put',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      "done": true
      })
      }).then(function(response) {
      return response.json()
      }).then(function(json) {
      console.log('parsed json: ', json)
      }).catch(function(ex) {
      console.log('parsing failed: ', ex)
      });
      
      //DELETE
      fetch('http://localhost:3000/wls/1', {
      method: 'delete'
      }).then(function(response) {
      return response.json()
      }).then(function(json) {
      console.log('parsed json: ', json)
      }).catch(function(ex) {
      console.log('parsing failed: ', ex)
      });
      ```

    ![10](.\img\10.png)

    ![11](.\img\11.png)

    ![12](.\img\12.png)

    ![13](.\img\13.png)

1. 理解跨域资源访问CORS，请给出例子，查看服务器返回的关于CORS头部信息

    - https://enable-cors.org/

    - https://enable-cors.org/resources.html

      ![14](.\img\14.png)

1. 查看 https://httpie.org/doc#installation 命令行工具  http://httpbin.org/ 服务信息

    - 用 XHR 或 Fetch API 使用POST方法提交信息到 /post 查看返回的信息

      ![15](.\img\15.png)

    - 访问 http://httpbin.org/headers 查看返回的信息
    
      ![16](.\img\16.png)
    
    - 安装httpie https://httpie.org/doc#installation