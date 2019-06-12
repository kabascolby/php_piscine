#!/usr/bin/env node
// https://stackoverflow.com/questions/16096872/how-to-sort-2-dimensional-array-by-column-value
/* 
	The localeCompare() method returns a number indicating whether a reference string comes before
	or after or is the same as the given string in sort order. 
*/
var fs = require('fs');

if(process.argv[2]){
	if (process.argv[2].indexOf('.srt') === -1)
		process.exit();
	
	var times = fs.readFileSync(process.argv[2], 'UTF8')
	.split('\n\n')
	.map(x => x.trim().split('\n'));
	times.sort(function (a, b) {
		if (a[1].localeCompare(b[1]) === 0) {
			return 0;
		}
		else if (a[1].localeCompare(b[1]) === 1) {
			let c = b[0];
			b[0] = a[0];
			a[0] = c;
			return 1
		}
		else
			return -1;
	});
	
	for(let i = 0; i < times.length; i++){
		for(j = 0; j < times[i].length; j++){
			console.log(times[i][j]);
		}
		if(i < times.length - 1)
			process.stdout.write('\n');
	}
}
