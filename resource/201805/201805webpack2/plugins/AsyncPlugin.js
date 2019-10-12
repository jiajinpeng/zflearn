class AsyncPlugin {
    apply(compiler) {
        //先监听emit事件 在编译完成后，文件内容将要输出到硬盘上的时候要触发此事件
        compiler.hooks.emit.tapAsync('OptimizePlugin', (compilation, callback) => {
            setTimeout(() => {
                console.log('文件将要写入硬盘');
                callback();
            }, 3000);
        });
    }
}
module.exports = AsyncPlugin;