
const http = require('http');
const url =require('url');

http.createServer((req,res) => {

    //获取url传过来的name和age ：'http://www.itying.com?name=zhangsan&age=20'

    //设置响应投头
    //状态码 200， 文件类型是 html， 字符集是 utf-8
    res.writeHead(200,{"Content-type":"text/html;charset='utf-8'"});
    res.write("<head><meta charset='UTF-8'> </head>")   //解决乱码
    console.log(req.url)
    if(req.url !== "/favicon.ico"){
        var userinfo = url.parse(req.url,true).query;
        console.log(`姓名:${userinfo.name}---年龄:${userinfo.age}`)
    }

    res.write("你好，this is nodejs1111");
    res.write("<h2>你好，this is nodejs</h2>");
    res.end();  //结束响应
}).listen(3000);