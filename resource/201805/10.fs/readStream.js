let fs = require('fs');
let ReadStream = require('./my-readStream')
let rs = new ReadStream('1.txt', {
  flags: 'r', 
  encoding: null, 
  autoClose: true,
  start: 0,
  end: 15, 
  highWaterMark: 4 
});
rs.on('open',()=>{
  console.log('文件打开')
})
rs.on('data', (data) => {
  console.log(data);
});
rs.on('end', function () {
  console.log(Buffer.concat(arrs).toString());
});
rs.on('error',function (err) {
  console.log(err);
});
rs.on('close',function() {
  console.log('关闭')
});

// 周日 把流讲完 手写一套 tcp用法 net模块 http
// 4期 koa源码 + react-router-dom
