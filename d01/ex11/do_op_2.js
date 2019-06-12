#!/usr/bin/env node
(() => {
	let av = process.argv;
	let reg = /^\s*[-+]?[0-9]*\.?[0-9]+\s*(\+|-|\*|\/|\%)\s*[-+]?[0-9]*\.?[0-9]+\s*$/g

	if (av.length !== 3)
		return console.log('Incorrect Parameters');

	if (!reg.test(av[2]))
		return console.log('Syntax Error');
	
	let operation = av[2].replace(/\s+/g, '');
	console.log(eval(operation));
})();
