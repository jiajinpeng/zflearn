let {spawn} = require('child_process');
let path = require('path');
// 我在主进程中运行了1.spawn.js
let child = spawn('node',['1.spawn.js','port','3000'],{
    cwd:path.resolve(__dirname,'test'),
    // 不想通过管道通信 / 不想通过父进程和子进程共享process来实现
    stdio:['ignore','ignore','ignore','ipc']
});
// 桌面应用electron 
child.on('message',(data)=>{
    console.log(data);
})

child.on('close',function(){
    console.log('关闭');
})
child.on('exit',function(){
    console.log('退出')
})
child.on('error',function(err){
    console.log(err);
})