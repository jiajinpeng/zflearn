// console.log(this); // node为了实现模块化 外边有一个闭包
// 函数外边把this更改掉了 this != global this=module.exports

// console.log(global); // 可以通过直接取值的方式拿到结果 不需要声明

// console 输出

console.log('log');
console.info('info'); // 标准输出 1
process.stdout.write('hello')


console.error('错误');
console.warn('警告'); // 错误输出 2 
process.stderr.write('error');

// 监听用户的输入
process.stdin.on('data',function(data){ // 0 
    console.log(data)
});

// 代号都是文件描述符
// console.assert(1===1===1,'出错了'); // node中有一个现成的模块 assert
console.time('start');
Promise.resolve().then(()=>{
    console.timeEnd('start');
})
// console.dir(global,{showHidden:true}); // 显示隐藏的信息
