const http = require('http');
const fs = require('fs');
var qs = require('querystring');

function parseCookies(request) {
	var list = {},
		rc = request.headers.cookie;
	rc && rc.split(';').forEach(function (cookie) {
		var parts = cookie.split('=');
		list[parts.shift().trim()] = decodeURI(parts.join('='));
	});
	return list;
}

var server = http.createServer(function (req, res) {
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [login, password] = credentials.split(':');
    if(login === 'zaz' && password === 'jaimelespetitsponeys'){
      var cookies = parseCookies(req);;
      let img;
      res.writeHead(200, { 'Content-Type': 'image/png' });
      img = fs.readFileSync("../img/42.png");
      res.end(img, 'binary');
    }
    res.end();
}).listen(8100, err => {
  if (err) throw err;
console.log(`Server running on PORT ${server.address().port}`);
});
// https://jasonwatmore.com/post/2018/09/24/nodejs-basic-authentication-tutorial-with-example-api