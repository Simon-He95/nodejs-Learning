const fs = require('fs');

//以流的方式来读取文件
var readStream = fs.createReadStream('./input.txt');

var str ='';
var count =0;
readStream.on('data',(data) => {
    str += data;
    count++;
})
readStream.on('end',() => {
    console.log(str);
    console.log(count);
})