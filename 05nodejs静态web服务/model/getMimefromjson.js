//从mime.json中读取
//通过把异步改成同步的方法解决 : fs.readFileSync()


exports.getMime = function(fs,extname) {    //通过外部传入fs模块，这里就不需要再引入fs

    // fs.readFile('./mime.json',(err,data) => {       //因为异步的原因此处return出来的值会是undefined
    //     if(err) {
    //         console.log(err);
    //     }

    //     // console.log(data.toString());

    //     var Mimes = JSON.parse(data.toString());
    //     console.log(Mimes[extname]);

    //     return Mimes[extname] || 'text.html';
    // })

    //通过把异步改成同步的方法解决 : fs.readFileSync()
    var data = fs.readFileSync('./mime.json',(err,data) => {
        if(err) {
            console.log(err);
        }
    })

    var Mimes = JSON.parse(data.toString());    //先将data从buffer对象转化成json字符串，再将json字符串转化成json对象
    return Mimes[extname] || 'text.html';

}