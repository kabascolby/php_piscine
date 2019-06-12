#!/user/bin/env node
var av = process.argv;
var len = av.length;

if(len > 3){
	let myObj = {};
	for(let i = 3; i < len; i++){
		let tab = av[i].split(':');
		myObj[tab[0]] = tab[1];	
	}
	myObj.hasOwnProperty(av[2]) == true ? console.log(myObj[av[2]]) : 0; 
	/* 
		myObj.hasOwnProperty('key') to check an object's own keys and 
		will only return true if key is available on myObj directly 
	*/
}