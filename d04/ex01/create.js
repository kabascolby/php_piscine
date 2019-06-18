const http = require('http');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const { parse } = require('querystring'); //set querystring.parse methode to parse variable
let modifyUserPass = require('../ex02/modif');
let logUser = require('../ex03/login');
let whoami = require('../ex03/whoami');
const PORT = 8100;
'use strict';

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

let dbDir = process.env.HOME + "/http/Piscines/j04/htdocs/private"

// Using reduce we can verify if each path exists and create it if necessary
function createPath(pathToCreate){
	pathToCreate.split(path.sep)
	.reduce((prevPath, folder) => {
		const currentPath = path.join(prevPath, folder, path.sep);
		if (!fs.existsSync(currentPath)){
			fs.mkdirSync(currentPath);
		}
		return currentPath;
	}, '');
}

function getRequest(req, callback){
	let body = ''
	req.on('data', chunk => {
		body += chunk.toString();
	});
	req.on('end', () =>{
		console.log("getting data done");
		callback(body);
	});
	// https://itnext.io/how-to-handle-the-post-request-body-in-node-js-without-using-a-framework-cd2038b93190 Good to read
	// https://www.geeksforgeeks.org/node-js-password-hashing-crypto-module/
}

function createNewUser(obj) {
	let userInfos = JSON.parse(JSON.stringify(obj)); //function purity purpose creating a clone of obj
	delete userInfos.submit;
	delete userInfos.bisPasswd; //deleting the submit proprety in the user info
	userInfos.salt = genRandomString(16);
	userInfos.passwd = sha512(userInfos.passwd, userInfos.salt);
	return userInfos;
}

function sendError(res){
	res.writeHead(404, {"Content-Type" : "text/plain"})
	res.end("ERROR\n");
}

server = http.createServer( (req, res) => {
	console.log(req.url);
	if(req.url === "/j04/ex02/modif.js"){
		modifyUserPass(req, res);
	}
	if(req.url.includes("/login.js?login")){
		logUser(req, res);
	}
	if(req.url.includes("/j04/ex03/whoami.js")){
		whoami(req, res);
	}


	if(req.url === '/j04/ex01/create.js'){
		if (req.method === 'POST') {
			getRequest(req, (userData) => {
				var userInfos = parse(userData);
				if (userInfos.login.length && userInfos.passwd.length && userInfos.submit == 'OK') {
					if (fs.existsSync(dbDir + "/passwd")) {
						var data = JSON.parse(fs.readFileSync(dbDir + "/passwd", 'UTF-8')); // Parsing the json file
						if (data.hasOwnProperty(userInfos.login)) {
							console.log(`User ${userInfos.login} already exist`);
							sendError(res);
						}
						else {
							let newUserInfos = createNewUser(userInfos);
							data[newUserInfos.login] = newUserInfos;
							fs.writeFileSync(dbDir + "/passwd", JSON.stringify(data, null, '\t'));
						}
					}
					else {
						!fs.existsSync(dbDir) ? createPath(dbDir) : null;
						let newUserInfos = createNewUser(userInfos);
						//creating a new Object 
						let obj = {};							//assigning the user login as key and userInfos
						obj[newUserInfos.login] = newUserInfos;
						fs.writeFileSync(dbDir + "/passwd", JSON.stringify(obj));
					}
					res.end('OK\n', () => console.log(`new user ${userInfos.login} added to the DB`));
				} else sendError(res);
			});
		}
	}
})


server.listen(PORT, (err) => {
	if(err) throw err;
	console.log(`server runnig on port ${PORT}`);
});

// https://www.geeksforgeeks.org/node-js-password-hashing-crypto-module/
// https://www.youtube.com/watch?v=0k4NwimfszA
// https://stackoverflow.com/questions/31645738/how-to-create-full-path-with-nodes-fs-mkdirsyncaa

// curl -d login=toto1 -d passwd=titi1 -d submit=OK 'http://e1z3r3p12.42.us.org:8100/j04/ex01/create.js'
// curl -d login=toto1 -d passwd=titi1 -d submit=OK 'http://e1z3r3p12.42.us.org:8100/j04/ex01/create.js'
// curl -d login=toto2 -d passwd= -d submit=OK 'http://e1z3r3p12.42.us.org:8100/j04/ex01/create.js'