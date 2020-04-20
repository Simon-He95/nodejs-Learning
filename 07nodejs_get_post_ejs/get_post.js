
//引入http模块
const http = require('http');

//引入url模块
const url =require('url');

//引入ejs模块
const ejs = require('ejs');

//引入fs模块
const fs = require('fs');

//路由：指的就是针对不同请求的URL，处理不同的业务逻辑。
http.createServer((req,res) => {

    res.writeHead(200,{"Content-type":"text/html;charset='utf-8'"});

    var pathName = url.parse(req.url).pathname;

    var method = req.method.toLowerCase();

    if(pathName == '/login') {
        // res.end('login');

        ejs.renderFile('./views/form.ejs',{},(err,data) => {
            res.end(data);
        })

    }else if(pathName == '/dologin' && method =="get") {  //执行登录操作
        // res.end('register')
    console.log(url.parse(req.url,true).query);

        res.end('dologin')


    }else if(pathName == '/dologin' && method =="post") {  //执行登录操作
        // res.end('register')
        var postStr = "";
        req.on('data',(chunk) => {
            postStr += chunk;
        })
        req.on('end',() => {
            console.log(postStr);

            fs.appendFile('login.txt',postStr+'\n',(err) => {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log("写入成功");
            });

            res.end('<script>alert("登录成功！");history.back();</script>');

        })

    }else {

        ejs.renderFile('./views/index.ejs',{},(err,data) => {
            res.end(data);
        })

    }

}).listen(3000);