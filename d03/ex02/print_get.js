#!/usr/dev/env node
var http = require('http');
var url  = require('url');

var server = http.createServer(function(req,res){
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query; //{Object}
	for(let i in query)
		console.log(`${i} : ${query[i]}`);
    res.end("End")
})
server.listen('8000');

// curl 'http://localhost:8000/nfs/2017/l/lkaba/Desktop/kaba/piscine/42/php_piscine/d03/ex02/print_get.js?gdb=pied2biche&barry=barreamine'
// curl 'http://localhost:8000/nfs/2017/l/lkaba/Desktop/kaba/piscine/42/php_piscine/d03/ex02/print_get.js?login=mmontinet'