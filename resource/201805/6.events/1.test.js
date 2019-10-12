let EventEmitter = require('./events');

let e = new EventEmitter();

let eat = function(){
    console.log('吃')
}
let cry = function(){
    console.log('哭')
}
// 可以监听用户新邦定的事件
// e.on('newListener',function(type){
//     process.nextTick(()=>{
//         e.emit(type)
//     })
// }); 
e.on('失恋',cry); // once this.on('失恋',one)
e.prependListener('失恋',eat);
// e.removeListener('失恋',cry);
e.emit('失恋'); // 触发完成后就将数组的once绑定的函数移除掉

console.log(EventEmitter.defaultMaxListeners)