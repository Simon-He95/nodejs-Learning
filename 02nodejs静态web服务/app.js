const fs = require('fs');
var dirArr = [];
const path = './wwwroot';
fs.readdir(path,(err,data) => {
    if(err) {
        console.log(err);
        return;
    }

    (function getDir(i) {       //因为是异步执行，所以只能用递归的方式，在内部调用自己，在内部打印出这个dirArr数组
        if(i === data.length) { //执行完成
            console.log(dirArr);
            return;
        }
        fs.stat(path+'/'+data[i],(error,status) => {
            if(error) {
                console.log(error);
                return;
            }
            if(status.isDirectory()) {
                dirArr.push(data[i]);
            }
            getDir(i+1);
        })
        }
    )(0);

});

