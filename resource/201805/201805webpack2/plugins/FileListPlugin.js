class FileListPlugin {
    apply(compiler) {
        compiler.hooks.emit.tap('FileListPlugin', (compilation) => {
            let content = '## 文件列表 \r\n';
            content = Object.keys(compilation.assets)
                .reduce((current, next) => current + "- " + next + ' \r\n',
                    content);
            //往输出列表里添加一个新的文件
            compilation.assets['README.md'] = {
                source() {//用来获取文件内容
                    return content;
                },
                size() {// 获取大小的
                    return content.length;
                }
            }
        });
    }
}
module.exports = FileListPlugin;