#!/usr/bin/env node
if(process.argv[2]){
	let tab = process.argv[2].split(/\s/g);
	let reg = [];
	reg[0] = /\b(Lundi|Mardi|Mercredi|Jeudi|Vendredi|Samedi|Dimanche)\b/i;
	reg[1] = /\b(0[0-9]|1[0-9]|2[0-9]|3[0-1])\b/;
	reg[2] = /\b(janvier|fevrier|mars|avril|mai|juin|juillet|aout|septembre|octobre|novembre|decembre)\b/i;
	reg[3] = /\b(19|2[0-9])\d{2}\b/;
	reg[4] = /\b([0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]\b/;
	
	process.env.TZ = 'Europe/Paris';
	if (tab.length === 5 && tab.every((v, i) => reg[i].test(v))) { // v is the value of the pointed array and i is the index
		let str = new Date(process.argv[2]).getTime() / 1000;
		console.log(str);
	}
	else
	console.log('Wrong Format');
}
// https://stackoverflow.com/questions/8083410/how-can-i-set-the-default-timezone-in-node-js helper