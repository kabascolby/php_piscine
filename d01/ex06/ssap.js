#!/usr/bin/env node
let tab = [];
for (let i = 2; i < process.argv.length; i++){
    tab = tab.concat(process.argv[i].trim().split(/[\s/]+/));
}

tab.sort();
for(let i = -1; ++i < tab.length; ){
    console.log(tab[i]);
}
