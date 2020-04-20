//引入http模块
var http = require('http');

/*
    request     获取url传递来得信息
    response    给浏览器响应信息
*/
http.createServer(function (request, response) {

    //设置响应头 200，编码  text
  response.writeHead(200, {'Content-Type': 'text/plain'});
    //给页面输出一句话，并且结束响应
  response.end('Hello World');
}).listen(8081);    //端口  8081

console.log('Server running at http://127.0.0.1:8081/');
