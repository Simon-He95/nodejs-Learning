//2.事件驱动来解决异步

const events = require('events');

// console.log(event);

var EventEmitter = new events.EventEmitter();

//广播和接收广播

EventEmitter.on('to_parent',() => {
    console.log("接收到了这个广播");
})


setTimeout(() => {
    console.log('开始广播了');
    
    //广播to_parent事件
    EventEmitter.emit('to_parent','发送数据')
},2000)