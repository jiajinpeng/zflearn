let net  = require('net');

// 聊天室 
let server = net.createServer();
let client = [];
server.on('connection',function (socket) {
  client.push(socket);
  server.getConnections((err,count)=>{
    socket.write(`当前聊天室可以容纳${server.maxConnections},你是当前第${count}人\r\n`);
  })
  socket.setEncoding('utf8');
  socket.on('data', function (data) {
    data = data.replace("\r\n", '');
    client.forEach(s=>{
      if (s == socket) return;
      s.write(data);
    });
  });
  socket.on('end', () => {
    client = client.filter(s => s != socket);
  });
});
// 最大连接数
server.on('close',function () {
  console.log('close');
})
server.maxConnections = 3;
server.listen(3000);

// 服务器关闭
      // server.close(); //不允许新进来的链接 只有调用close时才会触发关闭
      // server.unref(); // 关闭 当饭店最后一个人离开了 就会关闭