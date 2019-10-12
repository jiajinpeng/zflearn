// 我们先访问自己的服务器 80
// 我们的服务器其实是想代理到3001的服务器上
// 80 不能直接访问3001
// 代理服务器可能需要加一个凭证才能访问3001

// 80 才能访问3000

let http = require('http');
let proxy = require('http-proxy');
let httpProxy = proxy.createProxyServer();
http.createServer(function (req,res) {
  httpProxy.on('proxyReq', function (proxyReq, req, res, options) {
    proxyReq.setHeader('key', 'zfpx');
  });
  httpProxy.web(req,res,{
    target:'http://localhost:3001'
  });
}).listen(80);
// 这个是我们的服务


// 压缩 防盗链 多语言 
// 进程 命令行工具 http-server

// 讲一下 xss csrf 