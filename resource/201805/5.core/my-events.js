function EventEmitter() {
    this._events = {};
}
// {失恋:[fn,fn]}
EventEmitter.prototype.on = function (eventName, callback) {
    if (!this._events) this._events = Object.create(null);
    if (this._events[eventName]) {
        this._events[eventName].push(callback);
    } else {
        this._events[eventName] = [callback];
    }
}
EventEmitter.prototype.emit = function (eventName) {
    if (this._events[eventName]) {
        this._events[eventName].forEach(fn => {
            fn();
        });
    }
}

module.exports = EventEmitter;

// 周一：encoding fs用法
// 周三：fs模块 遍历算法
// 周五：流 流的应用
// 周日：流的源码
// tcp用法socket http 讲一周 http ... 
// koa的应用 express session cookie 
// react全家桶 webpack用法源码 三周
// redis mongodb mysql
// 项目 antd + eggjs + websocket crawl 
// 测试 nginx 项目部署 docker
// 性能优化 安全 算法

