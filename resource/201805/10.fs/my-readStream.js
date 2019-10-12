let EventEmitter = require('events');
let fs = require('fs');
class ReadStream extends EventEmitter{
  constructor(path,options = {}){
    super();
    this.path = path;
    this.flags = options.flags || 'r';
    this.encoding = options.encoding || null;
    this.autoClose = options.autoClose || true;
    // this.start = options.start || 0;
    // this.end = options.end|| null;
    this.highWaterMark = options.highWaterMark|| 64*1024;

    // 读取文件 1.打开文件
    this.open();
    // 当用户监听了on('data')事件的时候 就会触发这个事件
    this.on('newListener',(type)=>{
      if(type === 'data'){
        this.read(); // 读取文件内容 并发射出来
      }
    })
  }
  read(){ // 核心的读取方法
    if(typeof this.fd !== 'number'){
      return this.once('open',()=>this.read())
    }
    let buffer = Buffer.alloc(3);
    fs.read(this.fd, buffer,0,3,0,(err,byteRead)=>{
      this.emit('data', buffer);
    })
  }
  destroy(){
    if (typeof this.fd == 'number'){
      fs.close(this.fd,()=>{
        this.emit('close');
      })
    }else{
      this.emit('close');
    }
  }
  open(){
    fs.open(this.path,this.flags,(err,fd)=>{
      if(err){ // 打开文件出错
        this.emit('error',err);
        this.destroy(); // 写个通用的 因为读取完毕后也需要关闭文件
        return;
      }
      this.fd = fd; // 保存文件描述符 文件打开了
      this.emit('open'); // 触发开启事件
    });
  }
}

module.exports = ReadStream;