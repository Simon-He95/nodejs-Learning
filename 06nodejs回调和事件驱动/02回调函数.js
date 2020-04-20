
var fs = require('fs');



function getMime(callback) {
    fs.readFile('./mime.json',(err,data) => {   //因为函数内部是一个异步，所以return出来这个值拿到会是undefined
        callback(data.toString());
    })
}

// console.log(getMime());     //undefined


//1.回调函数来解决异步

getMime(function(aaa) {
    console.log(aaa);
})
