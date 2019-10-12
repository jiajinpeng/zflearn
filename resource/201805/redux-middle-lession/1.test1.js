// 重写dispatch方法 以前的dispatch调用后会把结果发给reducer
//let oldDispatch = store.dispatch;
// 中间件的原理 就是再dispatch派发之前干一些我想干的事情。重写了dispatch方法
// store.dispatch = function (action) {
//   console.log('before:'+store.getState().counter.number);
//   oldDispatch(action);
//   console.log('after:'+store.getState().counter.number);
// }
// 不能直接改写dispatch 只能实现某个功能，需要实现多个中间件