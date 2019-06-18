const fs = require('fs');
const crypto = require('crypto');

var sha512 = function(password, salt){
	var hash = crypto.createHmac('sha512', salt);
	hash.update(password);
	return hash.digest('hex');
}

let getUsers = () => { 
	let dbfiles = process.env.HOME + "/http/Piscines/j04/htdocs/private/passwd"
	if(fs.existsSync(dbfiles)){
		return  JSON.parse(fs.readFileSync(dbfiles, "UTF-8")); //parsing the json file.
	}
}

let auth = function auth(login, passwd){
	let obj = getUsers();
	if(obj[login]){
		if(sha512(passwd, obj[login].salt) === obj[login].passwd) return true;
	}
	return false;
}

// console.log(auth("lkaba2", "lamine"));
module.exports = auth;