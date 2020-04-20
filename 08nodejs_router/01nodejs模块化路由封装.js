
//引入http模块
const http = require('http');

//引入url模块
const url =require('url');

//引入ejs
const ejs = require('ejs');

//引入model，自己封装的模块
const model = require('./model/model.js');
// model['login']("111","222");    //获取login

//路由：指的就是针对不同请求的URL，处理不同的业务逻辑。
http.createServer((req,res) => {


    res.writeHead(200,{"Content-type":"text/html;charset='utf-8'"});

    var pathName = url.parse(req.url).pathname.replace("/","");

    if(pathName !== 'favicon.ico') {

        try{

            model[pathName](req,res);

        }catch{

            model['home'](req,res);

        }
    }






}).listen(3000);