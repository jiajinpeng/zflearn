(function (modules) { // 启动函数
  // 模块的缓存
  var installedModules = {};

  //自己实现的require方法
  function __webpack_require__(moduleId) {

    // 先看看缓存中有没有此模块ID
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache) 如果没有，是创建一个新的模块，并且放置到缓存中
    var module = installedModules[moduleId] = {
      i: moduleId,//identify
      l: false,//loaded
      exports: {} //是此模块的导出对象
    };

    // Execute the module function 执行模块函数
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // Flag the module as loaded 把模块设置为已加载
    module.l = true;

    // Return the exports of the module 返回模块的导出对象
    return module.exports;
  }
  // Load entry module and return exports 加载入口模块并且返回
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
  ({

    "./src/index.js":
      (function (module, exports) {
        eval("alert(1);");
      })

  });