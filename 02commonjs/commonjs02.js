
const http = require('http');

//http://www.itying.com/api/plist

var tools = require('./module/tools');
console.log(tools)


http.createServer((req,res) => {

    res.writeHead(200,{"Content-type":"text/html;charset='utf-8'"});
    res.write("<head><meta charset='UTF-8'> </head>")   //解决乱码
    
    var api = tools.formatApi('api/focus')
    res.write(api);

    res.write("<h2>你好，this is nodejs</h2>");
    res.end();  //结束响应
}).listen(3000);