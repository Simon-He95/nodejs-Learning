//引入http模板
const http = require('http');

//引入app模块
const app = require('./model/express-route');

//ejs模板
const ejs = require('ejs');

http.createServer(app).listen(3000);

app.get('',(req,res) => {
    var data ="首页数据"
    ejs.renderFile('./views/index.ejs',{data},(err,data) => {

        res.send(data);

    })
})

app.get('login',(req,res) => {
    ejs.renderFile('./views/form.ejs',{},(err,data) => {

        // res.end(data);  //end只能返回字符串，如果是汉字会有乱码，需要一个请求头，所以封装一个send方法

        res.send(data);

    })
})

app.get('register',(req,res) => {
    ejs.renderFile('./views/register.ejs',{},(err,data) => {
        res.send(data);
    })
})

app.post('dologin',(req,res) => {
   console.log(req.body);
   res.send('<script>alert("登录成功");history.back();</script>');
})
