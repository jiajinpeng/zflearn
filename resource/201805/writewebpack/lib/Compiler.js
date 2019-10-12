let { join, resolve, relative, dirname } = require('path');
let fs = require('fs');
//yarn add babylon babel-types babel-generator babel-traverse ejs
//babylon把源码转成语法树
let babylon = require('babylon');
//用来生成节点或者判断 节点类型 t.isCallExpress();
let t = require('babel-types');
//遍历语法树，捕获指定的节点
let traverse = require('babel-traverse').default;
//把语法树重新生成代码
let generator = require('babel-generator').default;
let ejs = require('ejs');
let { SyncHook } = require('tapable');
class Compiler {
    constructor(options) {
        this.options = options;
        this.hooks = {
            entryOptions: new SyncHook(),
            afterPlugins: new SyncHook(),
            run: new SyncHook(),
            beforeCompile: new SyncHook(),
            afterCompile: new SyncHook(),
            emit: new SyncHook(),
            afterEmit: new SyncHook(),
            done: new SyncHook(),
        }
    }
    run() {
        let compiler = this;
        compiler.hooks.run.call();
        let that = this;
        //确定入口：根据配置中的 entry 找出所有的入口文件；
        let { entry } = that.options;// ./src/index.js
        //获取当前的工作目录  D:\vipcode\project\201805\usewebpack>
        that.root = process.cwd();
        //缓存this=Compiler实例

        //需要一个对象，记录有哪些模块，以及这些模块源码
        that.modules = {};// key模块的ID ，值是模块代码
        compiler.hooks.beforeCompile.call();
        that.buildModule(join(that.root, entry), true);//true代表入口模块的意思
        compiler.hooks.afterCompile.call();
        //所有的模块都已经放置到this.modules里去了
        //console.log('this.modules', that.modules);
        compiler.hooks.emit.call();
        this.emitFile();
        compiler.hooks.afterEmit.call();
        compiler.hooks.done.call();
    }
    //把收集到的modules写入文件系统
    emitFile() {
        //读取模板的内容
        let entryTemplate = fs.readFileSync(join(__dirname, 'entry.ejs'), 'utf8');
        let { entryId, modules } = this;
        let source = ejs.compile(entryTemplate)({
            entryId,
            modules
        });
        //找到目标路径
        let target = join(this.options.output.path, this.options.output.filename);
        //然后写入对应的文件
        fs.writeFileSync(target, source);
    }
    getSource(modulePath) {
        let that = this;
        let source = fs.readFileSync(modulePath, 'utf8');
        //loader写在此
        let rules = that.options.module.rules;
        for (let i = 0; i < rules.length; i++) {
            let rule = rules[i];
            if (rule.test.test(modulePath)) {
                let loaders = rule.use;
                let length = loaders.length;//loader的数量 
                let loaderIndex = length - 1;// 往右向左执行
                function iterateLoader() {
                    let loaderName = loaders[loaderIndex--];
                    //去当前的工作目录下找loader，而非在当前工具项目中找loader
                    let loader = require(join(that.root, 'node_modules', loaderName));//loader只是一个包名
                    source = loader(source);
                    if (loaderIndex >= 0) {
                        iterateLoader();
                    }
                }
                iterateLoader();
                break;
            }
        }
        return source;
    }
    //1参数是模块的绝对路径 isEntry当前模块是否是入口模块
    buildModule(modulePath, isEntry) {
        let that = this;
        console.log('modulePath', modulePath);
        //得到了源文件的内容
        let source = that.getSource(modulePath);
        //relative是得到相对路径
        //D:\vipcode\project\201805\usewebpack D:\vipcode\project\201805\usewebpack/src/index.js
        //path.relative(this.root, modulePath); = src/index.js
        let moduleId = './' + relative(that.root, modulePath);// ./src/index.js
        if (isEntry) {
            that.entryId = moduleId;//this.entryId就是入口模块的ID
        }
        //对模块进行编译成AST并找到它依赖的模块
        //1 参数是模块的内容 第二个参数是当前模块所在目录,是用来解析依赖的路径的
        let { sourcecode, dependencies } = that.parse(source, dirname(modulePath));
        //记录一下模块的ID和它对应的源码
        that.modules[moduleId] = sourcecode;
        //循环当前模块的依赖，然后递归编译 dependency放着模块ID，相对根目录 的路径
        dependencies.forEach(dependency => that.buildModule(join(that.root, dependency)));
    }
    //解析源代码，得到AST抽象语法树，然后后找它依赖的模块，进行递归编译
    parse(source, parentPath) {
        let that = this;
        let ast = babylon.parse(source);//源码转语法树
        let dependencies = [];
        traverse(ast, {
            CallExpression(p) {//p path 当前路径
                if (p.node.callee.name == 'require') {
                    let node = p.node;
                    node.callee.name = '__webpack_require__';//修改方法名
                    //得到依赖的模块名注意此模块名是相对于当前模块而言的路径，我们转成相对根目录的路径的ID
                    let moduleName = node.arguments[0].value;
                    //如果需要的话，添加.js后缀 
                    moduleName += (moduleName.lastIndexOf('.') > 0 ? '' : '.js');
                    //得到依赖模块的ID
                    let moduleId = './' + relative(that.root, join(parentPath, moduleName));
                    //把参数改了，改成依赖的模块的ID，也就是把相对于当前模块相对路径，改为相对于根目录的相对路径
                    node.arguments = [t.stringLiteral(moduleId)];
                    //把模块ID放置到当前模块的依赖列表里
                    dependencies.push(moduleId);
                }
            }
        });
        //把改后的语法树重新生成代码
        let sourcecode = generator(ast).code;
        return { sourcecode, dependencies };
    }
}
module.exports = Compiler;