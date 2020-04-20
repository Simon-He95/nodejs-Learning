const fs = require('fs');

//管道流    主要用于复制文件
var readStream = fs.createReadStream('./IMG_2556.JPG');

var writeStream = fs.createWriteStream('./data/IMG_2556.JPG');

readStream.pipe(writeStream);
