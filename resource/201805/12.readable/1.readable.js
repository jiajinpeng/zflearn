let fs = require('fs');


let rs = fs.createReadStream('./2.txt',{
  highWaterMark:3
});
//  readable模式
rs.setEncoding('utf8');
// 默认监听readable后 会执行回调，装满highWaterMark这么多的内容
// 自己去读取，如果杯子是空的会继续读取highWaterMark这么多,直到没东西为止
rs.on('readable',()=>{
  let r = rs.read(1);
  console.log(rs._readableState.length);
  setTimeout(() => {
    console.log(rs._readableState.length);
  }, 1000);
});

// 行读取器 

