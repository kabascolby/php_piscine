
var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
	if (req.method === "GET") {
		let img;
		res.writeHead(200, { 'Content-Type': 'image/png' });
		img = fs.readFileSync("../img/42.png");
		res.end(img, 'binary');
	}
}).listen(8100);