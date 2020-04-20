

//引入fs模块
const fs = require('fs');

//引入path模块
var path =require('path');    //nodejs自带的模块
// console.log(path.extname('index.css'));    //得到后缀名    .html


//引入url模块   解析url中带传值的url
var url =require('url');

//获取文件类型的私有方法
function getMime(extname,callback) {    //通过外部传入fs模块，这里就不需要再引入fs

    fs.readFile('./mime.json',(err,data) => {       //因为异步的原因此处return出来的值会是undefined
        if(err) {
            console.log(err);
        }

        var Mimes = JSON.parse(data.toString());
        // console.log(Mimes[extname]);

        var result = Mimes[extname] || 'text.html';

        callback(result);
    })
}

exports.static = function(req,res,staticPath) {


    //http://localhost:3000/index.html          pathName:   /index.html     /favicon.ico
    var pathName = url.parse(req.url).pathname; //  获取url值

    if(pathName =='/'){
        pathName = '/index.html';    //默认加载首页index.html
    }

    //获取文件的后缀名
    var extName = path.extname(pathName);

    if(pathName!== "/favicon.icon") {   //过滤无效请求/favicon.ico
        console.log(pathName);
        //文件操作获取  static下面的index.html

        fs.readFile(staticPath+'/'+pathName,(err,data) => {
            if(err) {   //没有这个文件
                console.log('404');

                fs.readFile(staticPath+'/404.html',(err,data) => {  //读取404页面
                res.writeHead(404,{"Content-type":"text/html;charset='UTF8'"});
                res.write(data)
                res.end();
                }); 

            }else {
                getMime(extName,(mime) => {
                    res.writeHead(200,{"Content-type":""+mime+";charset='UTF8'"});
                    res.write(data);
                    res.end();
                });    //获取文件类型

            }

        });
    }
}