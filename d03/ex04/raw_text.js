#!/usr/bin/env node
var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
	if (req.method === "GET") {
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.write("<html><body>Hello</body></html>\n");
		res.end();
	}
}).listen(8000);