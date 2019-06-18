const fs = require('fs');
const http = require('http');
const { parse } = require('querystring');
const url = require('url');
const crypto = require('crypto');
var auth = require('./auth');

function userState(id, state){
	let dbfiles = process.env.HOME + "/http/Piscines/j04/htdocs/private/passwd"
	if(fs.existsSync(dbfiles)){
		let obj = JSON.parse(fs.readFileSync(dbfiles, "UTF-8")); //parsing the json file.
		obj[id].loggued = state;
		fs.writeFileSync(dbfiles, JSON.stringify(obj));
	}
}

function getRequest(req, callback) {
	let body = ''
	req.on('data', chunk => {
		body += chunk.toString();
	});
	req.on('end', () => {
		console.log("getting user request");
		callback(body);
	});
};

module.exports = (req, res) => {
	console.log(req.headers.cookie);
	let session = crypto.randomBytes(12).toString('hex');
	getRequest(req, userData => {
		query = parse(userData);
		if(auth(query.login, query.passwd) === true){
			console.log('req------------------');
			userState(query.login, true);
			res.setHeader('Set-Cookie', ["PHPSESSID="+ session, "loggued_on_user="+query.login, "path=/", "domain=e1z3r4p20.42.us.org"]);
			res.end('OK\n');
		} else { //doing that because of asynchronous call
			res.setHeader('Set-Cookie', ["PHPSESSID="+ session, "loggued_on_user=", "path=/", "domain=e1z3r4p20.42.us.org"]);
			res.end('ERROR\n');
		}
		// res.writeHead(200, {"Content-Type" : "text/plain"})
	})
};
// curl -c cook.txt 'http://e1z3r4p20.42.us.org:8000/login.js?login=lkaba2&passwd=lamine'