function EventEmitter() {
    this._events = {};
    this.count = 0;
}
// {失恋:[fn,fn]}
EventEmitter.prototype.addListener = EventEmitter.prototype.on;
EventEmitter.prototype.eventNames = function () {
    return Object.keys(this._events);
}
EventEmitter.prototype.listeners = function (eventName) {
    return this._events[eventName]
}
EventEmitter.prototype.on = function (eventName, callback, flag) {
    if (!this._events) this._events = Object.create(null);
    if (eventName !== 'newListener') {
        (this._events['newListener'] || []).forEach(fn => fn(eventName))
    }
    if (this._events[eventName] === this.count) {
        console.log('MaxListenersExceededWarning');
    }
    if (this._events[eventName]) {
        if (flag) {
            this._events[eventName].unshift(callback);
        } else {
            this._events[eventName].push(callback);
        }
    } else {
        this._events[eventName] = [callback];
    }
}
EventEmitter.prototype.once = function (eventName, callback,flag) {
    function one() {
        callback();
        this.removeListener(eventName, one);
    }
    one.g = callback;
    // {失恋:[one]}
    this.on(eventName, one,flag);
}
EventEmitter.prototype.removeListener = function (eventName, listener) {
    this._events[eventName] = this._events[eventName].filter((fn) => {
        return fn != listener && fn.g !== listener;
    })
}
EventEmitter.prototype.prependListener = function (eventName, callback) {
    this.on(eventName, callback, true);
}
EventEmitter.prototype.prependOnceListener = function(eventName, listener){
    this.once(eventName,call,true);
}
EventEmitter.defaultMaxListeners = 10;
EventEmitter.prototype.getMaxListeners = function () {
    return this.count && EventEmitter.defaultMaxListeners;
}
EventEmitter.prototype.setMaxListeners = function (n) {
    return this.count = n;
}
EventEmitter.prototype.emit = function (eventName) {
    if (this._events[eventName]) {
        this._events[eventName].forEach(fn => {
            fn.call(this);
        });
    }
}

module.exports = EventEmitter;
