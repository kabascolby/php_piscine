#!usr/bin/env node
if(process.argv[2]){
	let args = process.argv[2].match(/[^\s]+/g);

	let len = args.length;
	if(len === 1){
		console.log(args[0]);
		process.exit();
	}

	for(let i = 1; i < args.length; i++){
		process.stdout.write(args[i]);
		if(i < len)
			process.stdout.write(' ');
	}
	console.log(args[0])

}