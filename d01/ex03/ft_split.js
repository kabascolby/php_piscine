#!/usr/bin/env node

var ft_split = function (arg) {
	if (typeof arg === 'string')
		return arg.match(/[^\s]+/g).sort();
	else
		process.exit();
}

module.exports = ft_split;
