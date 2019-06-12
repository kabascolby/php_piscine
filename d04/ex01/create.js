#!/usr/local/bin/node
'use strict';

var exec = require('child_process').execSync;

exec("npm i express", function (err, stdout) {
	if (err)
		process.exit();
	});

const express = require('express');
const { json, urlencoded } = require('express');
const crypto = require('crypto');
const fs = require('fs');
const app = express();
const PORT = 8100;

// curl  -d login=toto1 -d passwd=titi1 -d submit=OK 'http://e1z3r4p22.42.us.org:8100/ex01/create.js'
app.post('/ex01/create.js', urlencoded({ extended: true }), (req, res) => {
    fs.existsSync(`${__dirname}/private`) || fs.mkdirSync(`${__dirname}/private`);
    delete req.body.submit;
    if (!req.body.passwd.length) res.end("ERROR");
    req.body.passwd = crypto.randomBytes(128).toString('hex');
    var json = [JSON.stringify(req.body)];
    fs.readFile(`${__dirname}/private/passwd`, 'utf8', function(err, data){
        if (err && err.code === 'ENOENT'){
            fs.writeFile(`${__dirname}/private/passwd`, json, 'utf8', function(err) {
                if (err) {
                    res.end("ERROR");
                }
                res.end("OK");
            })
        } else {
            var arr = [];
            var obj = JSON.parse(data) ? JSON.parse(data) : []; //now it an object
            for (let j = 0; j<obj.length; j++) {
                arr.push(obj[j]);
                if(arr[j].login==req.body.login) {
                    res.end("ERROR");
                    return;
                }
            }
            if (arr.indexOf(req.body.login))
            arr.push(JSON.parse(json[0]))
            arr = JSON.stringify(arr);
            fs.writeFile(`${__dirname}/private/passwd`, arr, 'utf8', function(err) {
                if (err) {
                    res.end("ERROR");
                }
                res.end("OK");
            })
    }});
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));