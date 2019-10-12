let fs = require('fs');
let path = require('path');
// fs.readFile 在node中操作的api  同步的(返回值) 异步的(callback)

// 把路径转化成绝对路径
// __dirname 不是global上的属性 __filename
console.log(__dirname);
console.log(__filename)
let r = fs.readFileSync(path.join(__dirname,'1.core.js'),'utf8');
console.log(r);
let exists =  fs.existsSync(path.join(__dirname,'1.core.js')); // boolean
console.log(exists)

// ------==
// path模块 专门用来处理路径 后缀名 路径的信息
console.log(path.join(__dirname,'1.core.js','a','/','..'));
console.log(path.resolve(__dirname,'1.core.js','a','/','..'));
console.log(path.basename('1.min.aa.js','.min.aa.js')); // 去基本名字
console.log(path.extname('1.min.aa.js')); // 取后缀名
console.log(path.dirname(__dirname)); // 父路径
console.log(__dirname);

// vm 核心模块
// 1)让字符串执行
let a = 100; // 不干净的执行
eval('console.log(a)'); // 沙箱

// 2)让字符串执行
let str = 'console.log(a)'
let fn = new Function('a',str); // 模板引擎
fn(1);

// 3) node执行字符串
let vm = require('vm');
let str = 'console.log(a)';
vm.runInThisContext(str);

// runInThisContext fs.readFileSync fs.existsSync path.join resolve extname basename