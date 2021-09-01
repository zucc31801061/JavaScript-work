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
