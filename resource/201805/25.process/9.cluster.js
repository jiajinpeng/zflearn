// 子进程 父进程 cluster 可以把子继承和父进程写到一个文件里

let cluster = require('cluster'); // 帮我们开启多个进程
let http  =require('http');
let os = require('os');
let path = require('path')
cluster.setupMaster({
    exec: path.join(__dirname,'worker.js'),
})
for(let i = 0; i<os.cpus().length;i++){
    cluster.fork(); // 就是会开一个新的子进程
}

// if(cluster.isMaster){
//     // 在主进程中fork子进程
//     // 主进程的内容
//     console.log(cluster.isMaster)
//     for(let i = 0; i<os.cpus().length;i++){
//         cluster.fork(); // 就是会开一个新的子进程
//     }
// }else{
//     // 子进程的内容
//     http.createServer(function(req,res){
//         res.end(process.pid+':child')
//     }).listen(3000);
// }