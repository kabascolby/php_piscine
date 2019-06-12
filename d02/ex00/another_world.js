#!/usr/bin/env node

process.argv[2] ? console.log(process.argv[2].replace(/\s{2,}/g,' ').trim()) : 0;