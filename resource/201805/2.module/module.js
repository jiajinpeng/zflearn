let str = 'zfpx';
// exports =  module.exports  = {a:zfpx}
// exports.a = 'zfpx'
// return module.exports
exports.a = str;
module.exports = str;
// exports 和module.exports是同一个东西,如果导出的就一个 module.exports 如果导出多个属性 exports

global.zfpx = 'hello'; // 全局的属性，除非这个属性非常重要


// 第三方模块
// js以前的痛点  无法记录依赖
let mime = require('mime'); // 用法和核心模块一样 不需要./ ../ 
console.log(mime.getType('.css'));


// 模块加载的顺序
console.log(module.paths);