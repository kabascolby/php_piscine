var http = require('http');
var url = require('url');
const crypto = require('crypto');

var userInfo = { login: '', passwd: '' };
var session = crypto.randomBytes(26).toString('hex');
function parseCookies(req) {
	var list = {},
	rc = req.headers.cookie;
	rc && rc.split(';').forEach(function (cookie) {
		var parts = cookie.split('=');
		list[parts.shift().trim()] = decodeURI(parts.join('='));
	});
	return list;
}

function printTemplate(login, passwd){
	return `<html><body>
	<form method="GET" id='userSession'>
	Username: <input type='text' name='login' value="${login}">
<br/>
Password: <input type='text' name ='passwd' value="${passwd}">
<input type='submit' value='OK'/></form>
</body></html>`;
}

const server = http.createServer(function (req, res) {
	console.log(req.method);
	var query = url.parse(req.url, true).query || {};
	if(Object.keys(query).length === 0){
		if(!req.headers.cookie){
			session = req.headers.cookie || session;
			res.setHeader('Set-Cookie', ["PHPSESSID="+ session, "path=/", "domain="]);
			userInfo.login = '';
			userInfo.passwd = '';
		}
		res.writeHead(200, { 'Content-Type': 'text/html', });
		res.write(printTemplate(userInfo.login, userInfo.passwd));
	}
	else if (parseCookies(req).PHPSESSID === session && query.submit==='OK') {
		userInfo.login = query.login;
		userInfo.passwd = query.passwd;
		res.write(printTemplate(userInfo.login, userInfo.passwd));
    }
	res.end();
}).listen(8100, err => {
	if (err) throw err;
  console.log(`Server running at http://localhost:${server.address().port}`);
  });
/* 
	https://stackoverflow.com/questions/5878682/node-js-hash-string
	curl -v -c cook.txt 'http://e1z3r3p12.42.us.org:8100/ex00/index.js'
	curl -v -b cook.txt 'http://e1z3r3p12.42.us.org:8100/ex00/index.js?login=sb&passwd=beeone&submit=OK'
	curl -v -b cook.txt 'http://e1z3r3p12.42.us.org:8100/ex00/index.js'
	curl -v 'http://e1z3r3p12.42.us.org:8100/ex00/index.js'
 */
