

# 2020-2021学年第2学期
# **实 验 报 告**
![zucc](.\img\zucc.png)

- 课程名称:跨平台脚本开发技术  
- 实验项目:node 
- 专业班级:计算机1801
- 学生学号:31801061
- 学生姓名:王灵霜
- 实验指导教师:郭鸣

## 实验内容

1. 学习教材 node 部分内容
    - file_server.js 理解
    - https://eloquentjavascript.net/code/#20.3
    
1. 学习[node web开发](http://sigcc.gitee.io/xplatform/#/13/13.node.web)
    - 理解 node web服务器运行原理
    
      node：
    
      Node是一个服务器端JavaScript解释器，用于方便地搭建响应速度快、易于扩展的网络应用。Node使用事件驱动，非阻塞I/O 模型而得以轻量和高效，非常适合在分布式设备上运行数据密集型的实时应用。Node是一个可以让JavaScript运行在浏览器之外的平台。它实现了诸如文件系统、模块、包、操作系统 API、网络通信等Core JavaScript没有或者不完善的功能。历史上将JavaScript移植到浏览器外的计划不止一个，但Node.js 是最出色的一个。
    
      应用程序的请求过程可以分为俩个部分：CPU运算和I/O读写，CPU计算速度通常远高于磁盘读写速度，这就导致CPU运算已经完成，但是不得不等待磁盘I/O任务完成之后再继续接下来的业务。
    
      web：
    
      web服务器一般是指网站服务器，它是驻留在互联在上的一种计算机程序，主要作用是向浏览器等web客户端提供文档信息。同时，也可以将浏览器的文档信息进行持久化保存。
    
    - Nodejs收到事件之后的大概的处理流程
    
      首先是若干个Request，请求到Node.js 应用上来；拿到请求之后，会生成请求对应的事件，插入到事件队列LIBUV中 的 Event Queue中去，LIBUV中的Event Loop会不断循环， 读取Event Queue队头的事件进行处理；简单的事件则直接Callback，返回一个Response（如请求一个HTML简单页面的事件）；还有复杂一点的事件，可能需要调用数据库、做一些查询工作、做数据统计，最终展示页面，这个时候会从线程池Thread Pool取出一个线程Thread，执行对应的Function，最后Callback，返回一个Response；最后回收线程；以上两个步骤的Callback，如果是最终结果，自然是直接返回一个Response，如果只是中间结果，可能还需要再次生成事件，插入Event Queue，进行下一轮的事件处理
      
    - 用 chrome 查看 访问node web 服务器 浏览器发起的请求 和服务端的响应
    
      ![1](.\img\1.png)
    
1. 完成 p289 1 2 3
   
    习题1
    
    ```javascript
    const {statSync, readdirSync, readFileSync} = require("fs");
    
    let searchTerm = new RegExp(process.argv[2]);
    
    for (let arg of process.argv.slice(3)) {
    	search(arg);
    }
    
    function search(file) {
    	let stats = statSync(file);
    	if (stats.isDirectory()) {
    		for (let f of readdirSync(file)) {
    			search(file + "/" + f);
    		}
    	} else if (searchTerm.test(readFileSync(file, "utf8"))) {
    		console.log(file);
    	}
    }
    ```
    
    ![2](.\img\2.png)
    
    习题2
    
    ```javascript
    const {createServer} = require("http");
    const methods = Object.create(null);
    
    createServer((request, response) => {
    	let handler = methods[request.method] || notAllowed;
    	handler(request)
    		.catch(error => {
    			if (error.status != null) return error;
    			return {
    				body: String(error),
    				status: 500
    			};
    		})
    		.then(({
    			body,
    			status = 200,
    			type = "text/plain"
    		}) => {
    			response.writeHead(status, {
    				"Content-Type": type
    			});
    			if (body && body.pipe) body.pipe(response);
    			else response.end(body);
    		});
    }).listen(8000);
    
    async function notAllowed(request) {
    	return {
    		status: 405,
    		body: `Method ${request.method} not allowed.`
    	};
    }
    
    var {parse} = require("url");
    var {resolve, sep} = require("path");
    var baseDirectory = process.cwd();
    
    function urlPath(url) {
    	let {
    		pathname
    	} = parse(url);
    	let path = resolve(decodeURIComponent(pathname).slice(1));
    	if (path != baseDirectory &&
    		!path.startsWith(baseDirectory + sep)) {
    		throw {
    			status: 403,
    			body: "Forbidden"
    		};
    	}
    	return path;
    }
    
    const {createReadStream} = require("fs");
    const {stat, readdir} = require("fs").promises;
    const mime = require("mime");
    
    methods.GET = async function(request) {
    	let path = urlPath(request.url);
    	let stats;
    	try {
    		stats = await stat(path);
    	} catch (error) {
    		if (error.code != "ENOENT") throw error;
    		else return {
    			status: 404,
    			body: "File not found"
    		};
    	}
    	if (stats.isDirectory()) {
    		return {
    			body: (await readdir(path)).join("\n")
    		};
    	} else {
    		return {
    			body: createReadStream(path),
    			type: mime.getType(path)
    		};
    	}
    };
    
    const {rmdir, unlink} = require("fs").promises;
    
    methods.DELETE = async function(request) {
    	let path = urlPath(request.url);
    	let stats;
    	try {
    		stats = await stat(path);
    	} catch (error) {
    		if (error.code != "ENOENT") throw error;
    		else return {
    			status: 204
    		};
    	}
    	if (stats.isDirectory()) await rmdir(path);
    	else await unlink(path);
    	return {
    		status: 204
    	};
    };
    
    const {createWriteStream} = require("fs");
    
    function pipeStream(from, to) {
    	return new Promise((resolve, reject) => {
    		from.on("error", reject);
    		to.on("error", reject);
    		to.on("finish", resolve);
    		from.pipe(to);
    	});
    }
    
    methods.PUT = async function(request) {
    	let path = urlPath(request.url);
    	await pipeStream(request, createWriteStream(path));
    	return {
    		status: 204
    	};
    };
    
    const {mkdir} = require("fs").promises;
    
    methods.MKCOL = async function(request) {
    	let path = urlPath(request.url);
    	let stats;
    	try {
    		stats = await stat(path);
    	} catch (error) {
    		if (error.code != "ENOENT") throw error;
    		await mkdir(path);
    		return {
    			status: 204
    		};
    	}
    	if (stats.isDirectory()) return {
    		status: 204
    	};
    	else return {
    		status: 400,
    		body: "Not a directory"
    	};
    };
    
    const {createServer} = require("http");
    
    const methods = Object.create(null);
    
    createServer((request, response) => {
    	let handler = methods[request.method] || notAllowed;
    	handler(request)
    		.catch(error => {
    			if (error.status != null) return error;
    			return {
    				body: String(error),
    				status: 500
    			};
    		})
    		.then(({
    			body,
    			status = 200,
    			type = "text/plain"
    		}) => {
    			response.writeHead(status, {
    				"Content-Type": type
    			});
    			if (body && body.pipe) body.pipe(response);
    			else response.end(body);
    		});
    }).listen(8000);
    
    async function notAllowed(request) {
    	return {
    		status: 405,
    		body: `Method ${request.method} not allowed.`
    	};
    }
    
    var {parse} = require("url");
    var {resolve, sep} = require("path");
    var baseDirectory = process.cwd();
    
    function urlPath(url) {
    	let {pathname} = parse(url);
    	let path = resolve(decodeURIComponent(pathname).slice(1));
    	if (path != baseDirectory &&
    		!path.startsWith(baseDirectory + sep)) {
    		throw {
    			status: 403,
    			body: "Forbidden"
    		};
    	}
    	return path;
    }
    
    const {createReadStream} = require("fs");
    const {stat, readdir} = require("fs").promises;
    const mime = require("mime");
    
    methods.GET = async function(request) {
    	let path = urlPath(request.url);
    	let stats;
    	try {
    		stats = await stat(path);
    	} catch (error) {
    		if (error.code != "ENOENT") throw error;
    		else return {
    			status: 404,
    			body: "File not found"
    		};
    	}
    	if (stats.isDirectory()) {
    		return {
    			body: (await readdir(path)).join("\n")
    		};
    	} else {
    		return {
    			body: createReadStream(path),
    			type: mime.getType(path)
    		};
    	}
    };
    
    const {rmdir, unlink} = require("fs").promises;
    
    methods.DELETE = async function(request) {
    	let path = urlPath(request.url);
    	let stats;
    	try {
    		stats = await stat(path);
    	} catch (error) {
    		if (error.code != "ENOENT") throw error;
    		else return {
    			status: 204
    		};
    	}
    	if (stats.isDirectory()) await rmdir(path);
    	else await unlink(path);
    	return {
    		status: 204
    	};
    };
    
    const {createWriteStream} = require("fs");
    
    function pipeStream(from, to) {
    	return new Promise((resolve, reject) => {
    		from.on("error", reject);
    		to.on("error", reject);
    		to.on("finish", resolve);
    		from.pipe(to);
    	});
    }
    
    methods.PUT = async function(request) {
    	let path = urlPath(request.url);
    	await pipeStream(request, createWriteStream(path));
    	return {
    		status: 204
    	};
    };
    
    const {mkdir} = require("fs").promises;
    
    methods.MKCOL = async function(request) {
    	let path = urlPath(request.url);
    	let stats;
    	try {
    		stats = await stat(path);
    	} catch (error) {
    		if (error.code != "ENOENT") throw error;
    		await mkdir(path);
    		return {
    			status: 204
    		};
    	}
    	if (stats.isDirectory()) return {
    		status: 204
    	};
    	else return {
    		status: 400,
    		body: "Not a directory"
    	};
    };
    ```
    
    习题3
    
    ```javascript
    function request(options, callback) {
    	var req = new XMLHttpRequest();
    	req.open(options.method || "GET", options.pathname, true);
    	req.addEventListener("load", function() {
    		if (req.status < 400)
    			callback(null, req.responseText);
    		else
    			callback(new Error("Request failed: " + req.statusText));
    	});
    	req.addEventListener("error", function() {
    		callback(new Error("Network error"));
    	});
    	req.send(options.body || null);
    }
    
    
    var filelist = document.querySelector("#filelist");
    var textarea = document.querySelector("#file");
    
    
    request({
    	pathname: "../"
    }, function(error, files) {
    
    	if (error) throw error;
    	files.split("\n").forEach(function(file) {
    		var option = document.createElement("option");
    		option.textContent = file;
    		filelist.appendChild(option);
    	});
    	loadCurrentFile();
    });
    
    function loadCurrentFile() {
    	request({
    		pathname: filelist.value
    	}, function(error, file) {
    		if (error) throw error;
    		textarea.value = file;
    	});
    }
    
    filelist.addEventListener("change", loadCurrentFile);
    
    function saveFile() {
    	request({
    		pathname: filelist.value,
    		method: "PUT",
    		body: textarea.value
    	}, function(error) {
    		if (error) throw error;
    	});
    }
    ```
    
    - 将文件服务器改为 可以上传，下载文件。
    
      ```javascript
      const url = require('url');
      const fs = require('fs');
      const path = require('path');
      const mime = require('mime');
      const STATIC_FOLDER = 'test';
      const IS_OPEN_CACHE = false;
      const CACHE_TIME = 10;
      const server = http.createServer((req, res) => {
      	let reqUrl = decodeURIComponent(req.url);
      	const obj = url.parse(reqUrl);
      	let pathname = obj.pathname;
      	const realPath = path.join(__dirname, STATIC_FOLDER, pathname);
      	fs.stat(realPath, (err, stats) => {
      		let endFilePath = '',
      			contentType = '';;
      		if (err) {
      			res.writeHead(404, 'not found', {
      				'Content-Type': 'text/plain'
      			});
      			res.write(`the request ${pathname} is not found`);
      			res.end();
      		} else if (stats.isDirectory()) {
      			fs.readdir(realPath, {
      				encoding: 'utf8'
      			}, (err, files) => {
      				res.statusCode = 200;
      				res.setHeader('content-type', 'text/html');
      				let result = '';
      				for (let i = 0; i < files.length; i++) {
      					if (pathname === '/') {
      						pathname = '';
      					}
      					result += `<a href="${pathname}/${files[i]}">${files[i]}</a><br/>`;
      				}
      				let html = `
                <!doctype html>
                <html>
                  <head>
                    <meta charset='utf-8'/>
                  </head>
                  <body>
                    ${result}
                  </body>
                </html>`;
      				res.end(html);
      			});
      		} else {
      			let ext = path.extname(realPath).slice(1);
      			contentType = mime.getType(ext) || 'text/plain';
      			endFilePath = realPath;
      			res.setHeader('content-type', contentType);
      			if (!IS_OPEN_CACHE) {
      				let raw = fs.createReadStream(endFilePath);
      				res.writeHead(200, 'ok');
      				raw.pipe(res);
      			} else {
      				let lastModified = stats.mtime.toUTCString();
      				const ifModifiedSince = 'if-modified-since';
      				let expires = new Date();
      				expires.setTime(expires.getTime() + CACHE_TIME * 1000);
      				res.setHeader("Expires", expires.toUTCString());
      				res.setHeader('Cache-Control', 'max-age=' + CACHE_TIME);
      
      				if (req.headers[ifModifiedSince] && lastModified === req.headers[ifModifiedSince]) {
      					res.writeHead(304, 'Not Modified');
      					res.end();
      				} else {
      					res.setHeader('Last-Modified', lastModified);
      					let raw = fs.createReadStream(endFilePath, {
      						encoding: 'utf-8'
      					});
      					res.writeHead(200, 'ok');
      					raw.pipe(res);
      				}
      			}
      		}
      	});
      });
      server.listen(port);
      console.log(`server is running at http://localhost:${port}`);
      ```
    
1. 文件服务器实现 (选做，联系老师，单独提交)
    - 可以采用页面模版 https://github.com/pugjs/pug
    - 或者用 yoyo https://github.com/maxogden/yo-yo
    - 参考 [fs-explorer]( https://github.com/shama/fs-explorer),此项目尚未完成WIP。
    
1. 用[browserify](https://www.jianshu.com/p/8d8b8752d8a0) 试试 课件里面的`ascii-art`例子.理解将nodejs模块 web化的好处.

    ![4](.\img\4.png)

1. `npm install learnyounode -g`
   
    - 运行 `learnyounode`,完成其中的代码
    
      ![3](.\img\3.png)
    
1. （选）在你的大作业里面的程序中公共部分构造为npm module
    - 采用npm 发布,管理这些模块

