// let { AsyncSeriesHook } = require('tapable');

class AsyncSeriesHook{
    constructor() {
        this.tasks = [];
    }
    tapPromise(name, task) {
        this.tasks.push(task);
    }
    promise(...args){
        let [first,...other] = this.tasks
        return other.reduce((promise,task)=>{
            return promise.then(()=>task(...args))
        },first(...args))
    }
}


let async = new AsyncSeriesHook(['name','age'])

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