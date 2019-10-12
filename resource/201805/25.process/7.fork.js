// 基于spawn 封装的
let {fork} = require('child_process');
let path  =require('path');
let child = fork('4.fork.js',['a','b'],{
    cwd:path.resolve(__dirname,'test'),
    silent:false
});

// 主进程
let http = require('http');
let server = http.createServer(function(req,res){
    res.end('父'+process.pid+'');
});
server.listen(3000);

child.send('server',server)


// 集群