let {Duplex} = require('stream');
let fs = require('fs');
class MyStream extends Duplex{
  constructor(){
    super();
  }
  _read(){
    this.push('1');
  }
  _write(chunk,encoding,callback){
    console.log(chunk)
    callback();
  }
}
let myStream = new MyStream
myStream.write('ok');
// 压缩文件.pipe(压缩流).pipe(压缩好的文件)
// 转化流 (写流 -> 读流) socket res