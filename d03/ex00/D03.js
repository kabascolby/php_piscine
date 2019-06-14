#!/usr/bin/env node
var fs = require('fs')
const http = require("http");

var error404 = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>404 Not found</title>
  <style>
  body,
  h1,
  h2,
  h3,
  h4,
  p,
  a {
	color: #e0e2f4;
  }
  
  body,
  p {
	font: normal 20px/1.25rem "VT323", monospace;
  }
  
  h1 {
	font: normal 2.75rem/1.05em "VT323", monospace;
  }
  
  h2 {
	font: normal 2.25rem/1.25em "VT323", monospace;
  }
  
  h3 {
	font: lighter 1.5rem/1.25em "VT323", monospace;
  }
  
  h4 {
	font: lighter 1.125rem/1.2222222em "VT323", monospace;
  }
  
  body {
	background: #0414a7;
  }
  
  .container {
	width: 90%;
	margin: auto;
	max-width: 640px;
  }
  
  .bsod {
	padding-top: 10%;
  }
  .bsod .neg {
	text-align: center;
	color: #0414a7;
  }
  .bsod .neg .bg {
	background: #aaaaaa;
	padding: 0 15px 2px 13px;
  }
  .bsod .title {
	margin-bottom: 50px;
  }
  .bsod .nav {
	margin-top: 35px;
	text-align: center;
  }
  .bsod .nav .link {
	text-decoration: none;
	padding: 0 9px 2px 8px;
  }
  .bsod .nav .link:hover, .bsod .nav .link:focus {
	background: #aaaaaa;
	color: #0414a7;
  }
  </style>
</head>
<body>
<main class="bsod container">
<h1 class="neg title"><span class="bg">Error - 404</span></h1>
<p>An error has occured, to continue:</p>
<p>* Create or Put your index.html page in ~/http/MyWebSite/d03</p>
<p>* Return to our homepage.<br />
* Send us an e-mail about this error and try later.</p>
<nav class="nav">
  <a href="#" class="link">index</a>&nbsp;|&nbsp;<a href="#" class="link">@lkaba</a>
</nav>
</main>
<script></script>
</body>
</html>`

/*
  ressources
  https://stackoverflow.com/questions/31645738/how-to-create-full-path-with-nodes-fs-mkdirsync
 	https://medium.freecodecamp.org/microservice-8edfdb9be811
*/


let dir = process.env.HOME + "/http/MyWebSite/d03"

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
const requestHandler = (req, res) => {
  if (req.url === "/") {
		fs.readFile(dir + "/index.html" , "utf8", (err, html) => {
			if (err){
				res.writeHead(404, { "Content-Type": "text/html" });
				res.end(error404)
			}
			res.writeHead(200, { "Content-Type": "text/html" });
			res.end(html);
		});
	} 
	
};
const server = http.createServer(requestHandler);
server.listen(8100, err => {
  if (err) throw err;
console.log(`Server running on PORT ${server.address().port}`);
});