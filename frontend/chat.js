const http = require('http');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const { parse } = require('querystring'); //set querystring.parse methode to parse variable
let createUser = require('./create');
let modifyUserPass = require('./modif');
let logUser = require('./login');
const PORT = 8080;

//building a routing
let i = 0;

http.createServer( (req, res) => {
	if(!i++) res.writeHead(302, {Location: '/index.html', "Content-Type" : "text/html"});
	console.log(req.url);
	console.log(req.method);
	if(req.url === "/index.html"){
		if(req.method === "GET"){
			console.log('im here-222222--------------->')
			let loginPage = fs.createReadStream(__dirname + '/index.html');
			res.writeHead(200, {"Content-Type" : "text/html"});
			loginPage.pipe(res);
		}
		else if(req.method === "POST"){
			// console.log('im here---------------->')
			logUser(req, res);
		}
	}
	else if (req.url === "/create.html"){
		if(req.method === "GET"){
			res.writeHead(200, {"Content-Type" : "text/html"});
			let createAcc = fs.createReadStream(__dirname + '/create.html', 'UTF-8');
			createAcc.pipe(res);
		}
		else if(req.method === 'POST'){
			createUser(req, res);
		}
	}
	else if (req.url === "/modif.html"){
		if(req.method === "GET"){
			res.writeHead(200, {"Content-Type" : "text/html"});
			let modifAcc = fs.createReadStream(__dirname + '/modif.html', 'UTF-8');
			modifAcc.pipe(res);
		}
		else if(req.method === 'POST'){
			modifyUserPass(req, res);
		}
	} else res.end();
}).listen(PORT, (err) => {
	if(err) throw err;
	console.log(`server runnig on port ${PORT}`);
});
