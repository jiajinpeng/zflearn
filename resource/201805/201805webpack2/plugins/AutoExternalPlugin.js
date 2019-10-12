/*
1. 分析出来是否引用了特定的模块 jquery import语句 
2. 要自动往html中插入一个script标签 src就等于url
3. 在生成模块的时候，如果是配置的模块的话，就生成一个外部模块返回
*/
const ExternalModule = require("webpack/lib/ExternalModule");
class AutoExternalPlugin {
    constructor(options) {
        this.options = options;
        //用户来记录外部模块
        this.externalModules = {};
    }
    apply(compiler) {
        //normalModuleFactory普通模块工厂，
        compiler.hooks.normalModuleFactory.tap('AutoExternalPlugin', (normalModuleFactory) => {
            //当创建完解析器后会执行这此来
            normalModuleFactory.hooks.parser
                .for('javascript/auto')
                .tap('AutoExternalPlugin', parser => {
                    //当语法拿到会遍历语法树，当遍历到import节点的时候会
                    //statement就是 import语句 source 是import 的模块的名字 import $ from 'jquery';
                    parser.hooks.import.tap('AutoExternalPlugin', (statement, source) => {
                        //jquery模块要变成外部模块
                        if (this.options[source]) {
                            this.externalModules[source] = true;
                        }
                    });
                })
            //factory是一个工厂，是创建模块的工作
            normalModuleFactory.hooks.factory.tap('AutoExternalPlugin', factory => (data, callback) => {
                const dependency = data.dependencies[0];
                let value = dependency.request;//jquery 
                //如果是需要转成外部模块的话
                if (this.externalModules[value]) {
                    //let $ = window.jQuery;
                    callback(null, new ExternalModule(this.options[value].varName, 'window'));
                } else {
                    //老的正常的工厂方法，它默认会用来创建一个普通的模块
                    factory(data, callback);
                }
            });
        });
        compiler.hooks.compilation.tap('InlinePlugin', (compilation) => {
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('InlinePlugin', (htmlData, callback) => {
                Object.keys(this.externalModules).forEach(key => {//jquery
                    htmlData.body.unshift({
                        tagName: 'script',
                        closeTag: true,
                        attributes: { type: 'text/javascript', src: this.options[key].url }
                    });
                });
                callback(null, htmlData);
            });
        });
    }
}
module.exports = AutoExternalPlugin;