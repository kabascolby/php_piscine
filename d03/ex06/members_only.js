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


  if (req.method == 'GET') {
    console.log('-------------------------here-------------')
          var body = '';

          req.on('data', function (data) {
              body += data;

              // Too much POST data, kill the connection!
              // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
              if (body.length > 1e6)
                  request.connection.destroy();
          });

          req.on('end', function () {
              var post = qs.parse(body);
              console.log(post);
              // use post['blah'], etc.
          });
      }
	if (req.method === "GET") {
    var cookies = parseCookies(req);;
		console.log(cookies);
    let img;
		res.writeHead(200, { 'Content-Type': 'image/png' });
		img = fs.readFileSync("../img/42.png");
		res.end(img, 'binary');
  }
  else
    res.end();
}).listen(8100, err => {
  if (err) throw err;
console.log(`Server running on PORT ${server.address().port}`);
});


/* http.createServer((request, response) => {
  const { headers, method, url } = request;
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
	// BEGINNING OF NEW STUFF
	console.log(body);
    response.on('error', (err) => {
      console.error(err);
    });

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    // Note: the 2 lines above could be replaced with this next one:
    // response.writeHead(200, {'Content-Type': 'application/json'})

    const responseBody = { headers, method, url, body };

    response.write(JSON.stringify(responseBody.headers));
    response.end();
    // Note: the 2 lines above could be replaced with this next one:
    // response.end(JSON.stringify(responseBody))

    // END OF NEW STUFF
  });
}) */