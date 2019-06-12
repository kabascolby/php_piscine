#!/usr/bin/env node
var fs = require('fs');
var av = process.argv;
if(av.length < 3 || av.length > 3 || !/^(moyenne|moyenne_user|ecart_moulinette)/.test(av[2]))
    process.exit();

const buffer = fs.readFileSync('/dev/stdin', 'UTF8').trim().split('\n');

let data = buffer.map(line => line.trim().split(';'))
.slice(1)
.filter(value => Object.keys(value).length !== 0) //delete an empty object in case of student havent a grade;
.reduce((Student, line) =>{ //transforming the array to an Object
    Student[line[0]] =  Student[line[0]] || []
    Student[line[0]].push({
        Note: parseInt(line[1]),
        Noteur: line[2],
        Feedback: line[3],
    })
    return Student
}, {})

let keys = Object.keys(data).sort(); // returning an array of key and sort with sort function

let averageCalculator = function(data){
    let tmp =  data.filter((x) => !isNaN(x.Note) && (x.Noteur !== 'moulinette'));
    return tmp.reduce( (a, b) => (a + b.Note), 0) / tmp.length;
}

let countDecimals = function (value) {
	if (Math.floor(value) === value) return 0;
	return value.toString().split(".")[1].length || 0;
}

function studentAverage() {
	let average = {};
	for (let i = 0; i < keys.length; i++) {
		average[keys[i]] = averageCalculator(data[keys[i]]);
	}
	for (let k in average) {
		let num = average[k];
		let value = countDecimals(num) > 12 ? num.toFixed(13) : num; //return 13 digit after the float if it exceed else return the original string.
		console.log(k + ':' + value);
	}
}

function moyenne() {
	let sum = 0;
	let count = 0;
	for (let i in keys) {
		let tmp = data[keys[i]].filter((x) => !isNaN(x.Note) && (x.Noteur !== 'moulinette'));
		for (let k in tmp) {
			sum += tmp[k].Note;
			count++;
		}
	}
	console.log((sum / count).toPrecision(14)); //toFixed(n) provides n length after the decimal point; toPrecision(x) provides x total length.
}

function moulinetteVariance() {
	for (let i in keys) {
		let tmp = data[keys[i]].filter(x => x.Noteur === 'moulinette').map((x) => x.Note)[0]; // filtering the object at index keys and apply the map function to return the array value at index 0;
		let num = (averageCalculator(data[keys[i]]) - tmp);
		console.log(keys[i] + ':' + (countDecimals(num) > 12 ? num.toFixed(13) : num));
	}
}

switch (true) {
	case av[2] === 'moyenne':
		moyenne();
		break;
	case av[2] === 'moyenne_user':
		studentAverage();
		break;
	case av[2] === 'ecart_moulinette':
		moulinetteVariance();
		break;
	default:
		process.exit();
}