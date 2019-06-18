var auth = require('./auth');
const fs = require('fs');

let dbfiles = process.env.HOME + "/http/Piscines/j04/htdocs/private/passwd"
function parseCookies(request) {
	var list = {},
		rc = request.headers.cookie;
	rc && rc.split(';').forEach(function (cookie) {
		var parts = cookie.split('=');
		list[parts.shift().trim()] = decodeURI(parts.join('='));
	});
	return list;
}

let getUsers = () => { 
	let dbfiles = process.env.HOME + "/http/Piscines/j04/htdocs/private/passwd"
	if(fs.existsSync(dbfiles)){
		return  JSON.parse(fs.readFileSync(dbfiles, "UTF-8")); //parsing the json file.
	}
}

module.exports = (req, res) => {
	let id = parseCookies(req);
	let users = getUsers();
	for(let i in users)
		if()
	
	console.log(id, ' who im I');
	res.end();
}



//  curl -b cook.txt 'http://e1z3r3p12.42.us.org:8100/j04/ex03/whoami.js'