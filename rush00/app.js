// const http = require('http');
const fs = require('fs');
const express = require('express');
const session = require('express-session');
// const route = require('express').Router();
const path = require('path');
const app = express();
const bodyParser = require('body-parser'); // parsing the website body sending throug a form
var errorPage = require("./error");
app.use('/', express.static(path.join(__dirname, '.')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', require('./routes/api').route);

const SESS_HOURS = 1000 * 60 * 60 * 2;


//evironement configuraration
const {
	PORT = 8080,
	SESS_LIFETIME = SESS_HOURS,
	SESS_SECRET = "kfjekfdidke",
	SESS_NAME = 'sid',
} = process.env

const users = [
	{ id: 1, name: 'Alex', email : 'test@gmail.com', password: 'secret'},
	{ id: 2, name: 'Max', email : 'test02@gmail.com', password: 'secret'},
	{ id: 3, name: 'lkaba', email : 'test03@gmail.com', password: 'secret'},
]
app.use(bodyParser.urlencoded({
	extended: true
}));

// const User = [
// 	// lkaba{}
// ];


app.use(session({
	name: SESS_NAME,
	resave: false,
	secret: SESS_SECRET,
	saveUninitialized: true,
	cookie: {
		maxAge: SESS_LIFETIME,
		sameSite: true,
		// secure: 'production',
	},
}));

app.use('/signIn.html', (req, res, next) => {
	console.log(req.body);
	res.redirect('/basket.html');
});

app.use('/login.html', (req, res, next) => {
	console.log(req.body);
	res.redirect('/basket.html');
});


app.use((req, res, next) => {
	if (req.url === "/") {
		fs.readFile("index.html" , "utf8", (err, html) => {
				if (err){
					res.writeHead(404, { "Content-Type": "text/html" });
					res.send(errorPage)
				}
				res.send(html);
			});
	}
	else
		res.send(errorPage);

	// next(); //allow to continue to the next middleware
});

app.use((req, res, next) => {
	console.log('in another the middleware');
});

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/api', require('./routes/api').route);
// const server = http.createServer(app);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));