let {Writable} = require('stream');
let fs = require('fs');
class MyStream extends Writable{
  constructor(){
    super();
    this.index = 9;
  }
  _write(chunk,encoding,callback){ // this.clearBuffer()
    console.log(chunk,encoding);
    // 可以借助可写流实现自己写入的逻辑
    callback(); // 不调用callback 后面的write就不会执行
  }
}
let myStream = new MyStream();
myStream.write('1','utf8');
myStream.write('1', 'utf8');