const http = require('http');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const { parse } = require('querystring'); //set querystring.parse methode to parse variable
// let createUser = require('./create');
// let modifyUserPass = require('./modif');
// let logUser = require('./login');
const PORT = 8095;

//building a routing
let i = 0;

const server = http.createServer( (req, res) => {
    // console.log("hello i'm here");
    res.writeHead(400, {"Content-Type" : "text/plain"})
	res.end("OK\n");	
})


.listen(process.env.PORT || PORT, (err) => {
	if(err) throw err;
	console.log(`server runnig on port ${PORT}`);
});
