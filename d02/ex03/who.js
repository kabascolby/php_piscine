var fs = require('fs');
var exec = require('child_process').exec;

exec("finger -l", function (err, buffer) {
	buffer = buffer.trim().split('\n');
	let id = (/Login: (\S+)/g).exec(buffer.shift())[1];
	let reg = /On since .{0,4}(:?.*?)\(PST\) on (:?.*),/;
	let tab = [];
	for (let i = 1; i < buffer.length - 1; i++)
		tab.push(buffer[i].match(reg));
		tab = tab.filter(x => x != null);
	tab.sort();
	for (let i = 0; i < tab.length; i++)
		console.log(`${id}    ${tab[i][2]}  ${tab[i][1].trim()}`);
});