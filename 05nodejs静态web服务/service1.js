//引入http模块
const http = require('http');

//引入fs模块
const fs = require('fs');

http.createServer((req,res) => {


    //http://localhost:3000/index.html          pathName:   /index.html     /favicon.ico
    var pathName = req.url;

    if(pathName =='/'){
        pathName = '/index.html';    //默认加载首页index.html
    }

    if(pathName!== "/favicon.icon") {   //过滤无效请求/favicon.ico
        console.log(pathName);
        //文件操作获取  static下面的index.html

        fs.readFile('./static'+pathName,(err,data) => {
            if(err) {   //没有这个文件
                console.log('404');
            }else {
                res.writeHead(200,{"Content-type":"text/html;charset='UTF8'"});
                res.write(data);
                res.end();
            }

        });
    }


}).listen(3000);