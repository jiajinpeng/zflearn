
// process 进程
// console.log(process);
console.log(process.platform === 'win32');
console.log(process.argv); //运行的参数 前两个不用管
let argvs = process.argv.slice(2);
//  把argvs变成对象 {color:red,port:3000}
// [--color,'red','--port',3000];
let obj = {}
argvs.forEach((element, index) => {
    if (element.includes('--')) {
        obj[element.slice(2)] = argvs[index + 1]
    }
});
console.log(obj); // 解析用户传递的参数


console.log(process.env.DEBUG); // 环境 变量
if (process.env.NODE_ENV === 'development') {
    console.log('当前是开发环境 ')
} else {
    console.log('上线环境 ')
}
// console.log(process.pid);  
// 在哪里运行的
console.log(process.chdir('1.node')); //改变工作目录
console.log(process.cwd()); // 当前工作目录 读取文件默认从跟文件夹下读取 (注意的点)
//  console.log(process.nextTick());
// nextTick > then
Promise.resolve().then(() => {
    console.log('then')
})
process.nextTick(() => {
    console.log('nextTick')
});

// class A {
//     constructor() {
//         this.arr = [];
//         process.nextTick(()=>{
//             console.log(this.arr);
//         })
//     }
//     add(val) {
//         this.arr.push(val);
//     }
// }
// let a = new A();
// a.add('123');
// a.add('456');



// node的事件环

// Buffer 缓存区 二进制 /  16进制
// clearImmediate / setImmediate node实现的
