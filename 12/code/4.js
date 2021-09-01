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