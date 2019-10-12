// 我们希望在主进程中运行子进程，在子进程中获取执行时传递过来的数据
// 发给主进程 主进程接到后 发给另一个进程 ，另一个进程接到内容后写入到文件中 (流的方式)
let {spawn} = require('child_process');
let path = require('path');
let fs = require('fs')
let fd = fs.openSync(path.join(__dirname,'1.txt'),"w"); // 3
let child  = spawn('node',['1.spawn.js','port','xxx'],{
    cwd: path.join(__dirname,'test'),
    //  0/1/2 pipe process.xxx
    stdio:['ignore','pipe',fd,'ipc']
});
let other = spawn('node',['2.write.js'],{
    cwd: path.join(__dirname,'test'),
    stdio:['ignore','pipe',fd]
});
// 监听第一个进程的运行将数据传给另一个进程

// child.on('message',(data)=>{ // port xxx close
//     // 我们的主进程监听着子进程的数据 ，但是不知道他什么时候发完
//     if(data.toString() === 'close'){
//         fs.fsyncSync(fd);
//         //process.exit();
//     }else{
//         other.stdout.write(data);
//     }
// });


// detach 让父亲挂了 儿子可以继续执行