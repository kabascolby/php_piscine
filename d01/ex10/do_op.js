#!/usr/bin/env node

var av = process.argv;
// || isNaN(av[2]) || !/^\s*(\+|-|\*|\/|\%)\s*$/g.test(av[3]) || isNaN(av[4]) just to be conform with the subject

(() => {
	if (av.length !== 5) {
		console.log('Incorrect Parameters');
		process.exit();
	}
})();

function do_op(a, b, c) {
	switch (true) {
		case (b.charAt(0) === '+'):
			console.log(a + c);
			break;
		case (b.charAt(0) === '-'):
			console.log(a - c);
			break;
		case (b.charAt(0) === '*'):
			console.log(a * c);
			break;
		case (b.charAt(0) === '/'):
			if (c !== 0) {
				console.log(a / c);
				break;
			}
		case (b.charAt(0) === '%'):
			if (c !== 0) {
				console.log(a % c);
				break;
			}
		default:
			return;
	}
}

do_op(parseFloat(av[2]), av[3].trim(), parseFloat(av[4]));
