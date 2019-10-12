// util 工具方法

let util = require('util');
// inherits (只继承公有方法 Object.setPrototypeof)  util.inspect == console.dir()
// promisify
console.log(util.inherits); 

let fs = require('fs')
let readFile = util.promisify(fs.readFile);
readFile('.gitignore').then(data=>{
    console.log(data)
});