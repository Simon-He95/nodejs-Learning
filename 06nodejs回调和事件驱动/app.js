
var fs = require('fs');

//引入events对象
var events = require('events');
var EventEmitter = new events.EventEmitter();

function getMime() {
    fs.readFile('./mime.json',(err,data) => {   //因为函数内部是一个异步，所以return出来这个值拿到会是undefined

        EventEmitter.emit('data',data);

    })
}


getMime();

EventEmitter.on('data',(mime) => {
    console.log(mime.toString());
})