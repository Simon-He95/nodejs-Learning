// 安装mongodb npm install mongodb --save-dev
//引入mongodb下的MongoClient
const MongoClient = require('mongodb').MongoClient

//引入DBurl => 命令行mongo的地址+数据库名
const DBurl = 'mongodb://127.0.0.1:27017/itying'

//引入url模块
const url = require('url')

//引入http
const http = require('http')

//引入ejs
const ejs = require('ejs')

//引入app模板
const app = require('./model/express-route')

http.createServer(app).listen(3000)

app.get('', ( req, res ) => {
    // var msg = "这是数据库的数据02"
    // ejs.renderFile('./views/index.ejs', { data: msg }, ( err, data ) => {
    //     res.send(data)
    // })

    MongoClient.connect(DBurl, { useUnifiedTopology: true }, ( err, client ) => {
        if (err) {
            console.log("数据库连接失败", err)
            return
        }
        const db = client.db('itying')
    //查询数据
        const result = db.collection('user').find() //这个result是放着数据库的数据，但是格式还不是想要的
        const list = [] //新建一个空数组用来存放处理完的数据
        result.each(( error, doc) => {
            if (error) {
                console.log(error)
            } else {
                if (doc !== null) {
                    list.push(doc)
                } else {    //doc==null表示数据循环完成
                    //获取数据以后
                    console.log(list)
                    ejs.renderFile('./views/index.ejs', {list}, ( err, data ) => {
                        if (err) {
                            console.log(err)
                        }
                        res.send(data)
                    })
                }
            }

        })

    })
})

app.get('/add', ( req, res ) => {
    //通过query来添加数据
    const query = url.parse(req.url, true).query
    const name = query.name || null
    const age = query.age || null
    //连接数据库
    MongoClient.connect( DBurl, { useUnifiedTopology: true }, ( err, client ) => {
        if (err) {
            console.log("数据库连接失败", err)
            return
        }
        const db = client.db('itying')
        if ( !name && !age ) {
            res.send("添加失败，数据为空")
            return
        }
        db.collection('user').insertOne({"name": name, "age": age}, ( error, data ) => {
            if (error) {
                console.log("添加数据失败", error)
                return
            }
            console.log(data)
            res.send("添加成功")
            client.close()
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
                res.send("删除失败，数据库中未有此数据")
                client.close()
            }
            res.send("删除成功")
            client.close()
        })
    })

})

app.get('/login',(req,res) => {
    ejs.renderFile('./views/form.ejs',{},(err,data) => {

        // res.end(data);  //end只能返回字符串，如果是汉字会有乱码，需要一个请求头，所以封装一个send方法

        res.send(data);

    })
})

app.get('/register',(req,res) => {
    ejs.renderFile('./views/register.ejs',{},(err,data) => {
        res.send(data);
    })
})

app.post('dologin',(req,res) => {
   console.log(req.body);
   res.send('<script>alert("登录成功");history.back();</script>');
})
