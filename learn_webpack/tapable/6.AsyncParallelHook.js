// let { AsyncParallelHook } = require('tapable');

class AsyncParallelHook{
    constructor() {
        this.tasks = [];
    }
    tapPromise(name, task) {
        this.tasks.push(task);
    }
    promise(...args){
        return Promise.all(this.tasks.map(el=>el(...args)))
    }
}


let async = new AsyncParallelHook(['name','age'])

async.tapPromise('1',(name,cb)=>{
    return new Promise((reslove,reject)=>{
        setTimeout(()=>{
            console.log(1);
            reslove(11)
        },1000)
    })
})
async.tapPromise('2',(name,cb)=>{
    return new Promise((reslove,reject)=>{
        setTimeout(()=>{
            console.log(2);
            reslove(22)
        },1000)
    })
})
async.tapPromise('3',(name,cb)=>{
    return new Promise((reslove,reject)=>{
        setTimeout(()=>{
            console.log(3);
            reslove(33)
        },1000)
    })
})

async.promise('kim').then((res)=>{
    console.log(res);
})