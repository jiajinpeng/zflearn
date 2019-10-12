// net 核心模块 tcp服务
// http继承了net模块
// websocket net模块

// 用法都类似 netnet, 
// http 头 响应码 Content-Type
let net = require('net'); // 应用net模块
// 一个完整的http事务 由请求和响应
let server = net.createServer();
// socket 套接字 req,res
// socket是一个双工流
server.on('connection',function (socket) {
  socket.setEncoding('utf8');
  socket.on('data',function(data) {
    console.log(data);
  });
  socket.write(`
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 2

ok
  `);
});

server.listen(3000);

// 端口占用 可以重启新的端口号
// server.on('error', function (err) {
//   if (err.code === 'EADDRINUSE') {
//     server.listen(3001);
//   }
// })