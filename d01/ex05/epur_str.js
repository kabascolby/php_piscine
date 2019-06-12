#!/usr/bin/env node

let str = process.argv[2];

console.log(str.replace(/\s{2,}/g,' ').trim());