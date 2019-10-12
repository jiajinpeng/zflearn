let fs = require('fs');
// 方法都是 异步没有sync / 同步 Sync
// 返回值可以获取同步的结果
let path = require('path');
// 读取文件默认的结果类型 encoding:null 默认是buffer
// 如果文件不存在则会报错
// 读取的时候会把内容整体读取到内存中(读小的文件)，大的文件流操作
let r = fs.readFileSync(path.join(__dirname,'note.md'),{encoding:'utf8',flag:'r'});
console.log(r);

// error-first
fs.readFile(path.join(__dirname,'note.md'),'utf8',function(err,data){ // 回调中的第一个参数 永远是错误
    console.log(data);
});
console.log(r);