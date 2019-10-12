let fs = require('fs')

let ws = fs.createWriteStream('2.txt',{
  flags:'w', // 开启文件做什么操作
  encoding:'utf8', // 当前写入的编码
  autoClose:true, // 是否读取完毕后自动关闭
  start:0,// 从哪个位置写入
  mode:0o666, // 可读可写
  highWaterMark:3 // 最高水位线 (预计占用的字节数) 默认16*1024
});
// 写 write方法只能写入  字符串或者buffer
// 向一个文件里写入九个数 123456789
let flag = ws.write('211','utf8'); // 异步操作




//1.第一次调用write 会真的像文件里写入 ，之后写到缓存中[]
//2.写入时 会拿当前写入的内容的长度和highWaterMark比，如果小于hightWaterMark,会返回true >=会返回false
//3.如果当前写入的个数大于了highWaterMark会触发drain事件 
//4.当文件中的内容写完后 会清空缓存

ws.on('drain',function () {
  console.log('抽干')
})
