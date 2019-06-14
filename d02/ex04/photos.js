#!/usr/bin/env node
'use strict';
const https = require('https');
const fs = require('fs');

const myRegexp = /<(?:img[^"]+")([^"]+)(?:[^>]+)>/g;
const myRegexp2 = /[^\/]*(?:\.png|gif|jpg|svg|raw|TIFF|BMP)/gi;
if (process.argv[2]) {
	const link = process.argv[2];
	var dir = process.argv[2].split('https://')[1];
	dir = dir.split('/')[0];

	var get = https.get(link, (response) => {
		response.on('data', (buffer) => {
			buffer = buffer.toString();
			buffer = buffer.replace(myRegexp, (match, sub) => { // i'm using replace to get the match which is the full substring and sub is the captured group
				sub = sub.indexOf(link) === -1 && sub.indexOf('https://') === -1 ? link + sub : sub; //with searc i'm checking if the substing containg the link if not i'm appendding to it;
				if (myRegexp2.test(sub)) {
					console.log("-->",sub);
					let photoName = sub.match(myRegexp2)[0];
					if (!fs.existsSync(dir)) {
						fs.mkdirSync(dir);
					}
					var stream = fs.createWriteStream(dir + '/' + photoName);
					https.get(sub, (res) => {
						res.once("data", (chunk) => {
							console.log(`starting download ${photoName}`);
						});

						res.on('data', (chunk) => {
							console.log(chunk.toString().length);
							stream.write(chunk);
						});

						res.on('end', () => {
							console.log(`finishing downloading ${photoName}\n\n`);
						})
					});
				}
			});
		}).on('error', (e) => {
			console.error(e);
		});
	});
}

get.end();

/* 
	https://stackoverflow.com/questions/1789945/how-to-check-whether-a-string-contains-a-substring-in-javascript
	https://javascript.info/regexp-groups
	http://2ality.com/2017/05/regexp-named-capture-groups.html
	https://stackoverflow.com/questions/432493/how-do-you-access-the-matched-groups-in-a-javascript-regular-expresponsesion another methode different from
	https://sfbay.craigslist.org/d/cars-trucks/search/cta example of website
	https://www.journaldev.com/7821/node-fs-js-create-file-read-write//
*/