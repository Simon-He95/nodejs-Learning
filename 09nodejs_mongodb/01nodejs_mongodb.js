// 安装mongodb npm install mongodb --save-dev

// 引入数据库 MongoClient
const MongoClient = require('mongodb').MongoClient

var DBurl = 'mongodb://127.0.0.1:27017/itying'    // people表示数据库的名称

// 引入http模板
const http = require('http');

// 引入app模块
const app = require('./model/express-route');

// ejs模板
const ejs = require('ejs');

// 引入url模块
var url = require('url')

http.createServer(app).listen(3000);

app.get('',(req,res) => {
    var data ="首页数据"
    ejs.renderFile('./views/index.ejs',{data},(err,data) => {

        res.send(data);

    })
})

app.get('/add', (req, res) => {
    // 增加数据
    // 连接数据库
    MongoClient.connect( DBurl, { useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.log(err)
            console.log("数据库连接失败")
            return
        }
        //连接成功，开始增加数据
        const db = client.db('itying')
        db.collection('user').insertOne({
            "name": "何健",
            "age": 25
        }, (error, data) => {
            if (error) {
                console.log("增加数据失败", error)
                return
            }
            res.send('增加数据成功',data)
            client.close()  // 关闭数据库
        })
    })
})

app.get('/edit', (req, res) => {
    //修改数据
    //连接数据库
    MongoClient.connect(DBurl, { useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.log("数据库连接失败",err)
            return
        }
        const db = client.db('itying')
        db.collection('user').updateOne({"name": "何健"},{$set: {
            "age": 40
        }}, (error, data) => {
            if (error) {
                console.log("修改数据失败",error)
                return
            }
            console.log(data)
            res.send("修改数据成功")
            client.close()
        })
    })
})

app.get('/delete', (req, res) => {
    //删除数据
    //http://localhost:3000/delete?name=何健 通过url后面传入的name值来删除数据
    const query = url.parse(req.url, true).query    //拿到url的query { name: '何健' }
    const name = query.name
    //连接数据库
    MongoClient.connect(DBurl, { useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.log("数据库连接出错", err)
            return
        }
        const db = client.db("itying")
        db.collection('user').deleteOne({"name": name}, (error, data) => {
            if (error) {
                console.log("删除数据出错", error)
            }
            console.log(data)
            if (!data.deletedCount) {
                res.send("数据库中未有此数据")
                client.close()
            }
            res.send("删除成功")
            client.close()
        })
    })

})

// app.get('/login',(req,res) => {
//     ejs.renderFile('./views/form.ejs',{},(err,data) => {

//         // res.end(data);  //end只能返回字符串，如果是汉字会有乱码，需要一个请求头，所以封装一个send方法

//         res.send(data);

//     })
// })

// app.get('/register',(req,res) => {
//     ejs.renderFile('./views/register.ejs',{},(err,data) => {
//         res.send(data);
//     })
// })

// app.post('dologin',(req,res) => {
//    console.log(req.body);
//    res.send('<script>alert("登录成功");history.back();</script>');
// })
