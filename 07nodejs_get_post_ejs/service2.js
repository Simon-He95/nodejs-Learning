
//引入http模块
const http = require('http');

//引入url模块
const url =require('url');
//路由：指的就是针对不同请求的URL，处理不同的业务逻辑。
http.createServer((req,res) => {

    var pathName = url.parse(req.url).pathname;

    if(pathName == '/login') {
        res.end('login');
    }else if(pathName =='/register') {
        res.end('register')
    }else if(pathName == '/order') {
        res.end('order');
    }else {
        res.end('index');
    }





}).listen(3000);