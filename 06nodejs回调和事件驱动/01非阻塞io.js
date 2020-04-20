
var fs = require('fs');



// console.log("1");

// fs.readFile('./mime.json',(err,data) => {
//     // console.log(data);
//     console.log("2");
// })


// console.log("3");

function getMime() {
    fs.readFile('./mime.json',(err,data) => {   //因为函数内部是一个异步，所以return出来这个值拿到会是undefined
        return data.toString();   
    })
}

console.log(getMime());     //undefined
