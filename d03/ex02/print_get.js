#!/usr/dev/env node
var http = require('http');
var url  = require('url');

var server = http.createServer(function(req,res){
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query; //{Object}
    if (req.method === "GET"){
      res.writeHead(200, { 'Content-Type': 'text/plain', });
      for(let i in query){
        console.log(`${i} : ${query[i]}`);
        res.write(`${i} : ${query[i]}\n`);
    }
  }
    res.end()
})
server.listen(8100, err => {
  if (err) throw err;
console.log(`Server running on PORT ${server.address().port}`);
});

// curl 'http://localhost:8100/nfs/2017/l/lkaba/Desktop/kaba/piscine/42/php_piscine/d03/ex02/print_get.js?gdb=pied2biche&barry=barreamine'
// curl 'http://localhost:8100/nfs/2017/l/lkaba/Desktop/kaba/piscine/42/php_piscine/d03/ex02/print_get.js?login=mmontinet'