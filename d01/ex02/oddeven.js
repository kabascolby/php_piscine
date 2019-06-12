#!/usr/bin/env node
function is_num(str){
    return !isNaN(str - parseFloat(str));
}

function oddeven(){
    process.stdout.write('Enter a number: ');
}

process.stdin.on('data', function(data){
    let arg = data.toString().trim();
    if(is_num(arg)){
        if(arg % 2 === 0){
            console.log('The number '+ arg + ' is even');
        }
        else{
            console.log('The number '+ arg +' is odd');
        }
    }
    else{
        console.log(`'${arg}' is not a number`);
    }
    oddeven();
})

oddeven();