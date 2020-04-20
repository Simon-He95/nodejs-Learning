//express方式封装路由


var G = {};

//引入url模块
const url = require('url')

var app = function(req,res) {

    var pathName = url.parse(req.url).pathname.replace("/","");
    if(pathName !== 'favicon.ico') {
        if(G[pathName]) {
            G[pathName](req,res);    //执行注册方法
        }else {
            res.end('no router')
        }
    }
};


app.get = function(string,callback) {
    //定义一个get方法
    G[string] = callback;
    //注册方法
    // G['login'] = function(req,res) {

    // }

};
//执行get方法
// app.get('login',(req,res) => {
//     console.log('login');
// })

// setTimeout(() => {
//     app('req','res');
// },1000)

//引入http模块
const http = require('http');

//只要有请求，就会触发app这个方法
http.createServer(app).listen(3000);

//注册这个login这个路由（方法）
app.get('login',(req,res) => {
    res.end('login')
})
app.get('register',(req,res) => {
    res.end('register')
})