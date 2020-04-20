//引入url模块
var url = require('url');

//引入fs模板
const fs = require('fs');

//封装方法改变res   绑定res.send()
function changeRes(res) {

    res.send = function(data) {

        res.writeHead(200,{'Content-type':'text/html;charset="utf-8"'});

        res.end(data);

    }

}


//暴露模块
var Server = function() {

    var G =this;        //全局变量
    
    //处理get和post请求
    G._get = {};
    G._post = {};

    var app = function(req,res) {
        
        changeRes(res); //使用封装的方法改变res.end

        //获取路由
        var pathName = url.parse(req.url).pathname.toString().replace("/","");

        //获取请求方式 get  post
        var method = req.method.toLowerCase();

        if(G['_'+method][pathName]) {
            
            if(method == "post") {  //执行post请求
                
                var postStr = "";
                req.on('data',(chunk) => {
                    postStr += chunk;
                })
                req.on('end',() => {
                    req.body = postStr; //表示拿到post的值
                    // console.log(postStr);

                    fs.appendFile('login.txt',postStr+'\n',(err) => {
                        if(err) {
                            console.log(err);
                            return;
                        }
                        console.log("写入成功");
                    });

                    G['_'+method][pathName](req,res);   //执行方法
                })

            }else { //执行get请求

                G['_'+method][pathName](req,res);

            }

        }else {
            res.end('no router');
        }

    }

    app.get = function(string,callback) {

        G._get[string] = callback;

    }

    app.post = function(string,callback) {

        G._post[string] = callback;

    }

    return app;

}



module.exports = Server();