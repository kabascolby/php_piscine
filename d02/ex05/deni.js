#!/usr/bin/env node

'use strict'
/* ------------- Object Creation && argumant validation --------- */
// https://www.youtube.com/watch?v=H0Tb_cMzbAs
var fs = require('fs');
var readline = require('readline');
var av = process.argv;

if (av.length === 4 || (av[2].indexOf("data.csv") !== -1)) {//checking if the array containt a string "data.csv" same fn as "indexOf"
	var buffer = fs.readFileSync(av[2], 'UTF8').trim().split('\n')
		.map(line => line.split(';'))
	var headers = buffer.shift();
	var index;

	if (av[3] !== 'surname' && (index = headers.indexOf(av[3])) === -1) // check if headers has the key and assign to index
		process.exit(); 
	buffer = buffer.slice(1)
	var [nom, prenom, mail, IP, pseudo] = [[], [], [], [], []];
	var [name, surname, last_name, first_name] = [nom, prenom, nom, prenom];
	
	if(av[3] === 'surname')
		index = 1;

	for (let line of buffer)
	{
		nom[line[index]] = line[0];
		prenom[line[index]] = line[1];
		mail[line[index]] = line[2];
		IP[line[index]] = line[3];
		pseudo[line[index]] = line[4];
	}
		
	var rl = readline.createInterface(process.stdin, process.stdout);
	rl.setPrompt('Entrez votre commande: ');
	rl.prompt();
	rl.on('line', function(cmd){
		eval(cmd.trim());
		rl.setPrompt('Entrez votre commande: ');
		rl.prompt();
	});
}

/* ******************** Test ***********************

key = pseudo
echo $name['miawallace']."\n";
process.stdout.write(name['miawallace'] + "\n");
console.log(JSON.stringify(IP['miawallace'].split("."), null, 2)); extra cmd

key = surname
echo $surname['Nestor']." ".$last_name['Nestor']." is a beautiful name\n";
process.stdout.write(surname['Nestor'] + " " + last_name['Nestor'] + " is a beautiful name\n");

echo $IP['Sarah']."\n";
process.stdout.write(IP['Sarah'] + '\n');

print_r(explode(".", $IP['Xavier'])); echo "\n";
console.log(JSON.stringify(IP['Xavier'].split('.'), null, 2)); process.stdout.write("\n");

*/