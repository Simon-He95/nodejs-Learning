const fs = require('fs');

//以流的方式来写入文件
var str ='';
var data = '我是从数据库里来的数据，写入到文件output.txt中\n'
for(var i=0;i<500;i++){
    str+=data;
}
var writeStream = fs.createWriteStream('./output.txt');
writeStream.write(str,'UTF8');
writeStream.end();
writeStream.on('finish',() => {
    console.log("写入完成");
})
writeStream.on('error',(err) => {
    console.log(err.stack);
})