#!/usr/local/bin/node
'use strict';

const express = require('express');
const { json, urlencoded } = require('express');
const crypto = require('crypto');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const app = express();
const PORT = 8100;

function generatePasswordHash(req) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.passwd, salt, (err, hash) => {
                if(err)
                    return reject(err);
                req.body.passwd = hash;
                resolve(req);
            });
        });
    });
  };

  function generateNewPasswordHash(req) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.newpw, salt, (err, hash) => {
                if(err)
                    return reject(err);
                req.body.newpw = hash;
                resolve(req);
            });
        });
    });
  };

// curl  -d login=x -d passwd=21 -d submit=OK 'http://e1z3r4p22.42.us.org:8100/ex02/modif.js'
// curl  -d login=x -d passwd=21 -d newpw=42 -d submit=OK 'http://e1z3r4p22.42.us.org:8100/ex02/modif.js'
app.post('/ex02/modif.js', urlencoded({ extended: true }), (req, res) => {
    var arr = [];
    var unhashedpasswd = req.body.passwd;
    var data;
    fs.existsSync(`${__dirname}/private`) || fs.mkdirSync(`${__dirname}/private`);
    delete req.body.submit;
    if (!req.body.passwd.length) res.end("ERROR");

    generatePasswordHash(req)
    .then(() => {
        var json = [JSON.stringify(req.body)];
        if (!req.body.newpw) {
            data = fs.readFileSync(`${__dirname}/private/passwd`).toString();
            if (!data.length) {
                fs.writeFile(`${__dirname}/private/passwd`, json, 'utf8', function(err) {
                    if (err) {
                        res.end("ERROR");
                    }
                    res.end("OK");
                })
            } else {
                var obj = JSON.parse(data) ? JSON.parse(data) : [];
                for (let j = 0; j<obj.length; j++) {
                    arr.push(obj[j]);
                    if(arr[j].login==req.body.login) {
                        res.end("ERROR");
                        return ;
                    }
                }
                arr.push(JSON.parse(json[0]))
                arr = JSON.stringify(arr);
                fs.writeFile(`${__dirname}/private/passwd`, arr, 'utf8', function(err) {
                    if (err) {
                        res.end("ERROR");
                    }
                    res.end("OK");
                })
            }
        } else {
            generateNewPasswordHash(req)
                .then(() => {
                    data = fs.readFileSync(`${__dirname}/private/passwd`).toString();
                    if (!data.length) {
                        fs.writeFile(`${__dirname}/private/passwd`, json, 'utf8', function(err) {
                            if (err) {
                                res.end("ERROR");
                            }
                            res.end("ERROR");
                        })
                    } else {
                        var user_saved_hash;
                        var obj = JSON.parse(data) ? JSON.parse(data) : [];
                        for (let j = 0; j<obj.length; j++) {
                            arr.push(obj[j]);
                            if(arr[j].login == req.body.login) {
                                user_saved_hash = arr[j].passwd;
                                arr[j].passwd = req.body.newpw;
                            }
                        }
                        arr = JSON.stringify(arr);
                        if (!user_saved_hash) {
                            res.end("ERROR");
                        }
                        bcrypt.compare(unhashedpasswd, user_saved_hash).then(isMatch => {
                            if (isMatch) {
                                fs.writeFile(`${__dirname}/private/passwd`, arr, 'utf8', function(err) {
                                    if (err) {
                                        res.end("ERROR");
                                    }
                                    res.end("OK");
                                })
                            } else {
                                res.end("ERROR");
                            }
                        })
                }});
        }
    })
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));

// get hash -> if no new password i post, if new password, i find old and compare