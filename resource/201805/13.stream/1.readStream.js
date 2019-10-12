// 自己实现流 fs.createReadStream

// 所有的流都基于这个模块
let {Readable} = require('stream');
// 默认fs.createReadStream自己实现了一个_read 调用的fs.read
class MyStream extends Readable{
  constructor(){
    super();
    this.index = 9;
  }
  _read() { // 如果想自己实现可读流 需要继承Readable，并且重写_read方法，方法中调用push 就是把结果传递给on('data')事件
    this.push(this.index--+'');
    if(this.index == 0){
      this.push(null);
    }
  }
}
let myStream = new MyStream();
myStream.on('data',(data)=>{
  console.log(data.toString());
});
myStream.on('end',function () {
  console.log('end');
})
// 判断流是不是流
// let rs = fs.createReadStream('./1.txt');
// console.log(rs instanceof stream);