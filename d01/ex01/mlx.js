#!/usr/bin/env node
let buffer = "";
 j = -1;
for(let i = 0; i < 1000; i++){
    if(++j < 100){
        buffer = buffer + 'X';
    }
    else{
        buffer = buffer + '\n';
        j = -1;
    }
}
console.log(buffer);