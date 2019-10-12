// 创建子进程的方法 靠我们的child_process 
// spawn 产卵 fork 叉子 exec execFile 执行
let {spawn} = require('child_process');
let path = require('path');
let child = spawn('node',['1.spawn.js'],{
    cwd:path.resolve(__dirname,'test'),
    // 所有的输出都和父进程共享，但是父进程无法拿到子进程的输出
    stdio:[0,1,2]
});
// 进程关闭掉
child.on('close',function(){
    console.log('关闭');
})
child.on('exit',function(){
    console.log('退出')
})
// 运行出错
child.on('error',function(err){
    console.log(err);
})