
//引入http模块
const http = require('http');
var router = require('./model/router.js');

http.createServer((req,res) => {

    router.static(req,res,'./static');


}).listen(3000);