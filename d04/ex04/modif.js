'use strict';
const fs = require('fs');
const http = require('http');
const { parse } = require('querystring'); //set querystring.parse methode to parse variable
const crypto = require('crypto');
const PORT = 8000;


var genRandomString = function(length){
	return crypto.randomBytes(Math.ceil(length/2))
	.toString('hex')
	.slice(0, length);
};

var sha512 = function(password, salt){
	var hash = crypto.createHmac('sha512', salt);
	hash.update(password);
	return hash.digest('hex');
}

function getRequest(req, callback){
	let body = ''
	req.on('data', chunk =>{
		body += chunk.toString();
	});
	req.on('end', () =>{
		console.log("getting user request");
		callback(body);
	});
};

function sendError(res){
	res.writeHead(404, {"Content-Type" : "text/plain"})
	res.end("ERROR\n");
};

let dbfiles = process.env.HOME + "/http/Piscines/j04/htdocs/private/passwd";
module.exports = (req, res) => {
	if (req.method === "POST") {
		getRequest(req, userData => {
			var uInfo = parse(userData);
			if (uInfo.login.length && uInfo.oldpw.length && uInfo.newpw.length && uInfo.submit == 'OK') {
				if (fs.existsSync(dbfiles)) {
					let obj = JSON.parse(fs.readFileSync(dbfiles, "UTF8"));
					if (obj[uInfo.login]) {
						let hash = sha512(uInfo.oldpw, obj[uInfo.login].salt);
						if (hash === obj[uInfo.login].passwd) {
							obj[uInfo.login].salt = genRandomString(20);
							obj[uInfo.login].passwd = sha512(uInfo.newpw, obj[uInfo.login].salt);
							fs.writeFileSync(dbfiles, JSON.stringify(obj, null, '\t'))
							console.log(`${uInfo.login} new password set with success`);
						} else {
							sendError(res);
							console.log("ERROR password doesn't match");
						}
					} else {
						sendError(res);
						console.log("Invalide login");
					}
				} else {
					console.log("error file path");
				}
				res.writeHead(303, {Location: '/index.html', "Content-Type" : "text/html"});
				res.end("OK\n", () => console.log("user"));
			} else console.log("Invalide keys or blank field(s)");
			sendError(res);
		});
	}
};

// https://ciphertrick.com/2016/01/18/salt-hash-passwords-using-nodejs-crypto/