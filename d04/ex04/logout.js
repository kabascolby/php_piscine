const fs = require('fs');
const http = require('http');
const PORT = 8100;

function parseCookies(req) {
	var list = {},
	rc = req.headers.cookie;
	rc && rc.split(';').forEach(function (cookie) {
		var parts = cookie.split('=');
		list[parts.shift().trim()] = decodeURI(parts.join('='));
	});
	return list;
}

function userState(id, state){
	let dbfiles = process.env.HOME + "/http/Piscines/j04/htdocs/private/passwd"
	if(fs.existsSync(dbfiles)){
		let obj = JSON.parse(fs.readFileSync(dbfiles, "UTF-8")); //parsing the json file.
		obj[id].loggued = state;
		fs.writeFileSync(dbfiles, JSON.stringify(obj));
		// console.log(obj[id]);
	}
}

module.exports = (req, res) => {
		let userLoggued = parseCookies(req);
		// console.log(userLoggued)
		if(userLoggued.loggued_on_user !== ''){
			userState(userLoggued.loggued_on_user, false);
		}
		// res.setHeader('Set-Cookie', ["PHPSESSID="+ userLoggued.session, "loggued_on_user=", "path=/", "domain=e1z3r4p20.42.us.org"]);
		res.end();
};

// curl -b cook.txt 'http://e1z3r4p20.42.us.org:8100/logout.js'