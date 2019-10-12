let net = require('net');
let server = net.createServer();
// 每次链接都会产生一个新的socket
server.on('connection',function (socket) {
  socket.setEncoding('utf8');
  socket.on('data',function(data) {
    socket.write('hello');
  });
});
server.listen(3000);