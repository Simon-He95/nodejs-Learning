
//引入http模块
const http = require('http');

//引入url模块
const url =require('url');

//引入ejs
const ejs = require('ejs');

//路由：指的就是针对不同请求的URL，处理不同的业务逻辑。
http.createServer((req,res) => {

    res.writeHead(200,{"Content-type":"text/html;charset='utf-8'"});

    var pathName = url.parse(req.url).pathname;

    if(pathName == '/login') {
        // res.end('login');

        var data = "你好，我是后台数据";
        var list = [
            '111',
            '222',
            '333'
        ]

        //把数据库的数据渲染到模板上
        ejs.renderFile('./views/index.ejs',{
            msg:data,
            list:list
        },(err,data) => {
            res.end(data);
        })




    }else if(pathName =='/register') {
        // res.end('register')
        var data = "你好，我是后台数据-register";

        var h ='<h2>这是一个h2的标签需要通过-h来输出</h2>'

        ejs.renderFile('./views/register.ejs',{
            msg:data,
            h:h
        },(err,data) => {
            res.end(data);
        })

    }else if(pathName == '/order') {
        res.end('order');
    }else {
        res.end('index');
    }





}).listen(3000);