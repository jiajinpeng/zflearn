## 模块
- 方便维护 方便管理 代码统一
- 前端模块 (网络的问题)
- cmd seajs amd requirejs umd 统一模块规范
- 自己实现模块化 let obj = {} 单例
- 闭包 let fn = (function(){return {}});
- esModule es6的模块化 
- commonjs规范 node (原理 闭包的形式)
    - 把文件读出来,套一个函数，安装规范来写，把需要导出的结果放到指定的地方
    - 别人可以拿到这个函数执行，拿到你导出的东西而已
    - 引用的过程是同步的

- node模块分类 核心模块/内置模块 、 第三方模块 bluebird 、文件模块、自己写的模块  (fs,path);

```
let a = require('./xxx');
(function(){
    var a = 1;
    module.exports = a;
    return module.exports
})()
```

## 实现commonjs规范
- 如何导入模块 require  
- 导出模块  module.exports =  this
- 如何定义模块1个文件就是一个模块

### 1.核心模块
- 可以直接引入，不需要下载没有路径
## npm

## Buffer
