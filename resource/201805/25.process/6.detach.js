let { spawn } = require('child_process');
let path = require('path');
// 父进程什么都不干让儿子去干活
// 独立的
let child = spawn('node', ['3.write.js'], {
    stdio: 'ignore',
    detached:true, 
    cwd: path.resolve(__dirname, 'test')
})
child.unref();