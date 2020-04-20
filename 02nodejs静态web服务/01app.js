//1.判断服务器上面有没有upload目录。如果没有则创建该目录，如果有则不做操作。    （图片上传）
const fs = require('fs');
var path = './upload';

fs.stat(path,(err,data) => {
    if(err){
        //如果不存在，执行创建
        mkdir(path);
    }

    if(!data.isDirectory()){ //如果存在，判断如果不是目录，说明是文件，需要删除文件，再执行创建目录
        fs.unlink(path,(err) => {
            if(err) {
                console.log(err);
                return
            }
            mkdir(path);
        })
    }
});

function mkdir(dir) {
    fs.mkdir(dir,(err) => {
        if(err) {
            console.log(err);
            return;
        }
    })
}








//2.wwwroot文件夹下面有images   css     js以及index.html ,找出wwwroot目录下面的所有目录，然后放在一个数组中
