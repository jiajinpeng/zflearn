// 服务端 监听一个特定的端口ip localhost
// node中的核心模块
// net模块 http模块是基于net模块 
let http = require('http');
let server = http.createServer();
// server.on('connection',function (socket) {
//   // 比希望你直接操作socket header
//   // 在内部会将请求来的结果进行处理 处理一个req.还会通过socket实现一个res
//   // this.emit('request',req,res);
// });
// req代表的是客户端（可读流 on('data')）  res.write end 可写流
server.on('request', (req, res)=>{
  // req是代表的客户端的请求，当客户端发过来数据后 才会触发on('data')事件
  console.log(req.method); // 请求的方法名 都是大写的GET
  console.log(req.url); // 请求的路径  https://xxxx.com:80/?a=1#top
  console.log(req.httpVersion); // 请求的版本号
  console.log(req.headers); // 所有的值都是小写的(node已经处理好了)
  req.on('data',function (data) {
      console.log(data);
  });
  req.on('end',function() {
    console.log('end');
    res.statusCode = 204;
    // res.setHeader('Content-Type','text/html');
    // res.sendDate = false;
    res.end();
  });
})
// req,res
server.listen(3000,()=>{
  console.log(`server start`);
}); 