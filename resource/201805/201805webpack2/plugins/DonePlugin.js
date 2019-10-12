class DonePlugin {
    apply(compiler) {
        compiler.hooks.done.tap('DonePlugin', function () {
            console.log('全部编译完成');
        });
    }
}
module.exports = DonePlugin;