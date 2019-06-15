var http = require('http');
var url = require('url');

function parseCookies(request) {
	var list = {},
		rc = request.headers.cookie;
	rc && rc.split(';').forEach(function (cookie) {
		var parts = cookie.split('=');
		list[parts.shift().trim()] = decodeURI(parts.join('='));
	});
	return list;
}

const server = http.createServer(function (request, response) {
	var query = url.parse(request.url, true).query || {};
	switch (true) {
		case (query.action === 'set'):
			response.setHeader("Set-Cookie", [query.name + '=' + query.value]); //seting and array
			console.log('cookie set succesfully');
			break;
		case (query.action === 'get'):
			var cookies = parseCookies(request);
			console.log(cookies);
			cookies[query.name].length > 0 ? response.write(cookies[query.name] + "\n") : null; //check the coockies length before printing
			break;
		case (query.action === 'del'):
			response.setHeader("Set-Cookie", [query.name + '=' + ""]);
			console.log('cookie erase succesfully');
			break;
		case (['set', 'get', 'del'].indexOf(query.action) === -1):
			console.log('bad request check ', query);
			break;
	}
	response.end();
}).listen(8000, err => {
	if (err) throw err;
  console.log(`Server running at http://localhost:${server.address().port}`);
  });
// console.log('Server running at http://localhost:8000/');

// curl -c cook.txt 'http://localhost:8000/nfs/2017/l/lkaba/Desktop/kaba/piscine/42/php_piscine/d03/ex03/cookie_crisp.js?action=set&name=plat&value=choucroute'
// curl -b cook.txt 'http://localhost:8000/nfs/2017/l/lkaba/Desktop/kaba/piscine/42/php_piscine/d03/ex03/cookie_crisp.js?action=get&name=plat'
// curl -c cook.txt 'http://localhost:8000/nfs/2017/l/lkaba/Desktop/kaba/piscine/42/php_piscine/d03/ex03/cookie_crisp.js?action=del&name=plat'
/* 
	references 
	https://www.quirksmode.org/js/cookies.html
	https://www.w3schools.com/js/js_cookies.asp
	https://nodejs.org/api/querystring.html for querry
	books node js in action page 365
*/
