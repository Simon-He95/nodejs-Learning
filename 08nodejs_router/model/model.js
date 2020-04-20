
//引入ejs
const ejs = require('ejs');

//引入fs
const fs =require('fs');

var app = {
    
    login:function(req,res) {

        ejs.renderFile('./views/form.ejs',{},(err,data) => {
            res.end(data);
        })
    },
    dologin:function(req,res) {

        var postStr = "";
        req.on('data',(chunk) => {
            postStr += chunk;
        })
        req.on('end',(err,chunk) => {
            console.log(postStr);
            fs.appendFile('./login.txt',postStr+'\n',(err) => {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log("写入数据成功");
            })

            res.end("<script>alert('登录成功');history.back();</script>");
        })
    },
    register:function(req,res) {

        ejs.renderFile('./views/register.ejs',{},(err,data) => {
            res.end(data);
        })

    },
    home:function(req,res) {

        ejs.renderFile('./views/index.ejs',{},(err,data) => {
            res.end(data);
        })

    },
}

module.exports = app;