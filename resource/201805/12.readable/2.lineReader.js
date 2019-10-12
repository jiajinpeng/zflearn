let fs = require('fs');
let EventEmitter = require('events');
class LineReader extends EventEmitter{
  constructor(path){
    super();
    this.rs = fs.createReadStream(path);
    // 监听readale事件
    const RETURN = 13;
    const LINE = 10;
    let arr = []; // 存放读取出来的内容
    this.rs.on('readable',()=>{
      // 一个个的拿出来碰到回车后 就把之前的内容发射出来 \r\n
      let char;
      while (char = this.rs.read(1)) { // 取出每一个
        switch (char[0]) {
          case RETURN:
            this.emit('newLine',Buffer.concat(arr).toString());
            arr = []; // 如果\r下一个不是\n的话 也放到数组中
            if(this.rs.read(1)[0]!==LINE){
              arr.push(char); 
            }
            break;
          case LINE: // mac下没有\r 只有\n
            this.emit('newLine', Buffer.concat(arr).toString());
            arr = []; // 如果\r下一个不是\n的话 也放到数组中
            break;
          default:
            arr.push(char); // 将读取出来的buffer放到数组中
        }
      }
    });
    this.rs.on('end',()=>{
      this.emit('newLine', Buffer.concat(arr).toString());
    })
  }
} 
let line = new LineReader('./3.txt');

line.on('newLine',function(data) {
    console.log(data);
});
// promise 事件环 (2)  流 

// 读流 on('data') on('readable')  写流  write end