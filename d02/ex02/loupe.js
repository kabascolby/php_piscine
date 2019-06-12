#!/usr/bin/env node
//https://stackoverflow.com/questions/6142922/replace-a-regex-capture-group-with-uppercase-in-javascript
let fs = require('fs');

if (process.argv[2])
	fs.readFile(process.argv[2], 'utf8', (err, data) => {
		if (err) throw err;
		let regex2 = /<a(?:[^>]+)>([\w\s]+)(?:<[^>]+>)?<\/a>/g;
		let regex = /<a[^"]+"([^"]+)?">/g;

		data = data.replace(regex, (match, a) => {
			return match.replace(a, a.toUpperCase());
		});
		data = data.replace(regex2, (match, a) => match.replace(a, a.toUpperCase()));
		console.log(data.trim());
	});
