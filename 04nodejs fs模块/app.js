/*  
    1.fs.stat       检测是文件还是目录
    2.fs.mkdir      创建目录
    3.fs.writeFile  创建写入文件
    4.fs.appendFile 追加文件
    5.fs.readFile   读取文件
    6.fs.readdir    读取目录
    7.fs.rename     重命名
    8.fs.rmdir      删除目录
    9.fs.unlink     删除文件
*/

const fs = require('fs');

//检测是文件还是目录
fs.stat('./app.js',(err,data) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log(`是文件：${data.isFile()}`);
    console.log(`是目录：${data.isDirectory()}`);
})

//创建目录
// fs.mkdir('./css',(err) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log("创建成功");
// })

//创建写入文件
// fs.writeFile('./css/.html','你好nodejs',(err) => {
//     if(err) {
//         console.log(err);
//         return
//     }
//     console.log('写入成功');
// })

//追加文件
// fs.appendFile('./css/base.css','body{color:red}',(err) => {
//     if(err) {
//         console.log(err);
//         return;
//     }
//     console.log('追加成功')
// })

//读取文件
// fs.readFile('./css/base.css',(err,data) => {
//     if(err) {
//         console.log(err);
//         return;
//     }

//     console.log(data.toString());   //讲Buffer转换成string类型
// })

//读取
// fs.readdir('./css',(err,data) => {
//     if(err) {
//         console.log(err);
//         return;
//     }
//     console.log(data);
// })

//重命名
// fs.rename('./css/base.css','./css/style.css',(err) => {
//     if(err) {
//         console.log(err);
//         return;
//     }
//     console.log("重命名成功");
// })

//删除目录
// fs.rmdir('./css/html',(err) =>{
//     if(err) {
//         console.log(err);
//         return;
//     }
//     console.log("删除目录成功");
// })

//删除文件
// fs.unlink('./css/html/.html',(err) => {
//     if(err) {
//         console.log(err);
//         return;
//     }
//     console.log("删除文件成功");
// })
