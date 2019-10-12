let {spawn} = require('child_process');
let path = require('path');
// 我在主进程中运行了1.spawn.js
let child = spawn('node',['1.spawn.js','port','3000'],{
    cwd:path.resolve(__dirname,'test'),
    stdio:['pipe','pipe','pipe']
});
// 通过流的方式获取子进程的输出, ipc 进程间的通信 （用法和webworker是一样的）
child.stderr.on('data',function(data){
    console.log(data.toString());
});
// 监听结束
child.stderr.on('end',function(){
    console.log('end')
});
child.on('close',function(){
    console.log('关闭');
})
child.on('exit',function(){
    console.log('退出')
})
child.on('error',function(err){
    console.log(err);
})