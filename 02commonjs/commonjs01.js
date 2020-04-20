
const http = require('http');

//http://www.itying.com/api/plist




http.createServer((req,res) => {

    res.writeHead(200,{"Content-type":"text/html;charset='utf-8'"});
    res.write("<head><meta charset='UTF-8'> </head>")   //解决乱码
    
    var api = formatApi('api/plist')
    res.write(api);

    res.write("<h2>你好，this is nodejs</h2>");
    res.end();  //结束响应
}).listen(3000);