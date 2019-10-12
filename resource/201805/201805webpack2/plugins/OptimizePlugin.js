class OptimizePlugin {
    apply(compiler) {
        //先监听compilcation事件
        compiler.hooks.compilation.tap('OptimizePlugin', (compilation) => {
            compilation.hooks.optimize.tap('OptimizePlugin', () => {
                console.log('已经编译完成，正在优化，准备输出');
            });
        });
    }
}
module.exports = OptimizePlugin;