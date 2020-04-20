/* 
    mkdirp  :   npm install mkdirp --save
*/

const mkdirp = require('mkdirp');
mkdirp('./wwwroot/images').then(made =>
    console.log(`made directories, starting with ${made}`))
