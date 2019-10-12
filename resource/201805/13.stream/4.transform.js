let {Transform} = require('stream');
let fs = require('fs');
class MyStream extends Transform{
  _transform(chunk,encoding,callback){
    this.push(chunk.toString().toUpperCase());
    callback();
  }
}
let myStream = new MyStream
// 转化流 就是再可读流和可写流之间 做转化操作
process.stdin.pipe(myStream).pipe(process.stdout);
