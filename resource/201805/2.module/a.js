let path = require('path');
let fs = require('fs');
let vm = require('vm');
function Module(id) {
    this.id = id;
    this.exports = {}; // 模块导出的结果
}
// exports = module.exports
Module.wrapper = [
    "(function(exports,module,require){"
    ,
    "\n})"
]
Module.wrap = function(script){
    return Module.wrapper[0] + script + Module.wrapper[1] 
}
Module._extensions = {
    '.js': function (module) { 
        let str  = fs.readFileSync(module.id,'utf8');
        // 读取文件的内容 
        let fnStr = Module.wrap(str); // 返回的是函数字符串
        let fn = vm.runInThisContext(fnStr);
        // 让产生的函数执行
        fn.call(module.exports,module.exports,module,req); // 会在内部把结果赋值到exports属性上
    },
    '.json': function (module) {
        let str  = fs.readFileSync(module.id,'utf8');
        let json = JSON.parse(str);
        module.exports = json;
     }
}
Module._resolveFilename = function (relativePath) {
    // 是绝对路径
    let p = path.resolve(__dirname, relativePath);
    // 路径有 直接返回路径
    let exists = fs.existsSync(p);
    if(exists) return p;
    // 没有的话添加后缀
    let keys = Object.keys(Module._extensions);
    let r = false;
    for(let val of keys){ //  循环key
        let realPath = p + val; //拼接出文件路径
        let exists = fs.existsSync(realPath); // 找到后把路径抛出去
        if(exists){ r = realPath;break;}
    }
    if(!r){
        throw new Error('file not exists');
    }
    return r;
}
Module._cache = {};
Module.prototype.load = function(filename){ // c://xxx.js
    // 获取文件的扩展名
    let extension = path.extname(filename);
    Module._extensions[extension](this); // {id,exports}
}
function req(p) {
    // 解析出绝对路径
    try{
        let filename = Module._resolveFilename(p);
        // 去缓存中查询一下
        if(Module._cache[filename]){
            // 第一次肯定没缓存
            return Module._cache[filename].exports;
        }
        let module = new Module(filename); // {id,exports:{}}
        module.load(filename); // 加载自己 {exports:{xxxx}}
        Module._cache[filename] = module;
        return module.exports;
    }catch(e){
        console.log(e);
    }
}
// 第一步 要解析出一个绝对路径 
// 第二步 如果文件不存在 添加 .js .json .node
// 第三步 上缓存里通过名字查找一下有没有加载过
// 第四步 创建一个模块 模块里有有个this.exports的对象
// 第五步 把模块放到缓存中
// 第六步 记载这个模块 根据文件后缀加载
// 文件模块 都是相对路径
let a = require('./b'); // 会自动的去添加.js后缀 .json .node
a = req('./b');
console.log(a); // 缓存的机制