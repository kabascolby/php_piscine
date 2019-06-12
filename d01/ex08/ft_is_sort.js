#!/usr/bin/env node

function ft_is_sort(tab){
	if(Array.isArray(tab))	
		for(let i = 0; i < tab.length - 1; i++){
			if(tab[i] > tab[i + 1])
				return false;
		}
	return true;
};

// let tab = ["Et qu’est-ce qu’on fait maintenant ?"];
// let tab = ["!/@#;^", "abcd", "42", "Hello World", "salut", "zZzZzZz"];
	let tab = ["123", "123b", "#123à"];
	if(ft_is_sort(tab))
		console.log("the array is sorted")
	else
		console.log("The array is not sorted");
	// console.log(tab.sort())