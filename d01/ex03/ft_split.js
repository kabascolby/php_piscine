#!/usr/bin/env node

var ft_split = function (arg) {
	if (typeof arg === 'string'){
		let str = "";
		arg.match(/[^\s]+/g).sort()
		.forEach(x => str = str + x + "\n");
		return str.trim();
	}
	else
		process.exit();
}

module.exports = ft_split;
