setTimeout(() => {
    console.log('timeout1');
    process.nextTick(()=>{
        console.log('nextTick1');
    })
}, 1000);
// 虽然都写1000毫秒 是有误差
process.nextTick(function(){ // nextTick执行的时候用了0.8ms
    setTimeout(() => {
        console.log('timeout2'); 
    }, 1000); // 1000.02ms
    console.log('nextTick2');
})
// nextTick2


setImmediate(function(){
    console.log('setImmediate')
});
setTimeout(function(){
    console.log('setTimeout')
},0); // ->4

let fs = require('fs');
fs.readFile('./gitignore',function(){ // io的下一个事件队列是check阶段
    setImmediate(function(){
        console.log('setImmediate')
    });
    setTimeout(function(){
        console.log('setTimeout')
    },0); // ->4
})

let fs = require('fs');
setTimeout(function(){
    Promise.resolve().then(()=>{
        console.log('then2');
    })
},0);
Promise.resolve().then(()=>{
    console.log('then1');
});
fs.readFile('./gitigore',function(){
    process.nextTick(function(){
        console.log('nextTick')
    })
    setImmediate(()=>{
        console.log('setImmediate')
    });
});
// 写一篇事件环相关的内容

// node调试  node命令行调试 