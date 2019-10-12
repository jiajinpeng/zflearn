let fs = require('fs');
let WS = require('./writeStream');
let ws = fs.createWriteStream('2.txt',{
  highWaterMark:3
});
let i = 9;
function write() {
  let flag = true;
  while (i>0 && flag) {
    flag = ws.write(i--+'');
  }
}
write();
ws.end('hello'); // 结束了 会讲缓存区的内容全部清空,触发end后不会再触发drain事件

// ws.on('drain',()=>{
//   console.log('干了');
//   write();
// });

// ws.write() ws.end() ws.on('drain');
