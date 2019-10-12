// 流 水流 有方向 
// 读流 和 写流 ,双工流,转换流 

// (读流 写流) 文件 fs (fs.read,fs.write)

let fs = require('fs');
// 创建可读流 自己读取，或者等待发射 
// 返回的就是一个可读流
let rs = fs.createReadStream('1.txt', {
  flags: 'r', // 如何操作文件
  encoding: null, // 读取文件的编码格式 默认buffer
  autoClose: true, // 读取完毕后 是否自动关闭
  start: 0, // 开始读取的位置
  end: 15, // 结束位置( 包后 )
  highWaterMark: 4 // 64k每次默认读取64k
});
// 1.直接监听data事件 (newListener=> 内部会自动触发data事件) 
// 相当于流动模式,监听data方法后不停的触发 直到读取完毕为止
// let arrs = [];
// rs.setEncoding('utf8');
rs.on('data', (data) => {
  //arrs.push(data);
  rs.pause(); // 可以暂停data事件的触发
  setTimeout(() => {
    console.log('恢复')
    rs.resume(); // 恢复的也是data事件
  }, 1000);
});
rs.on('end', function () {
  // 拼接后将结果一起打印出来
  console.log(Buffer.concat(arrs).toString());
});
rs.on('error',function (err) {
  console.log(err);
});
// 需要掌握的方法 有 on('data') on('end') rs.pause rs.resume on('error');

// 2.流可以可以控制速率

