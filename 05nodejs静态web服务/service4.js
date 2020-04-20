//引入http模块
const http = require('http');

//引入fs模块
const fs = require('fs');

//引入path模块
var path =require('path');    //nodejs自带的模块
// console.log(path.extname('index.css'));    //得到后缀名    .html

//引入event模块
var events = require('events');
var EventEmitter = new events.EventEmitter();

//引入自己写的获取后缀名方法
var mimeFnc = require('./model/getMimefromjson01.js');
// console.log(mimeFuc.getMime(fs,'.jpg'));  //获取通过mime.json来的所有文件类型

//引入url模块   解析url中带传值的url
var url =require('url');


http.createServer((req,res) => {


    //http://localhost:3000/index.html          pathName:   /index.html     /favicon.ico
    var pathName = url.parse(req.url).pathname; //通过url把原本url：http://localhost:3000/json/all.json?4543389322744624转化为url：http://localhost:3000/json/all.json

    if(pathName =='/'){
        pathName = '/index.html';    //默认加载首页index.html
    }

    //获取文件的后缀名
    var extName = path.extname(pathName);

    if(pathName!== "/favicon.icon") {   //过滤无效请求/favicon.ico
        console.log(pathName);
        //文件操作获取  static下面的index.html

        fs.readFile('./static'+pathName,(err,data) => {
            if(err) {   //没有这个文件
                console.log('404');

                fs.readFile('./static/404.html',(err,data) => {  //读取404页面
                res.writeHead(404,{"Content-type":"text/html;charset='UTF8'"});
                res.write(data)
                res.end();
                }); 

            }else {
                var mime = mimeFnc.getMime(fs,EventEmitter,extName)     //通过events广播来接收数据，不需要再用callback

                    EventEmitter.on("mime",(mime) =>{
                        res.writeHead(200,{"Content-type":""+mime+";charset='UTF8'"});
                        // res.write(data); //write可能也是异步，data数据需要放入res.end中
                        res.end(data);
                    })

                  //获取文件类型

            }

        });
    }


}).listen(3000);