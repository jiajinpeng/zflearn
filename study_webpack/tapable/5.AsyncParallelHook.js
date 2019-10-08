// let { AsyncParallelHook } = require('tapable');

class AsyncParallelHook{
    constructor() {
        this.tasks = [];
    }
    tapAsync(name, task) {
        this.tasks.push(task);
    }
    callAsync(...args){
        let finalCallback = args.pop()
        let index = 0
        this.tasks.forEach(element => {
            element(...args,(res)=>{
                index++
                if(index == this.tasks.length){
                    finalCallback(res)
                }
            })
        });
    }
}


let async = new AsyncParallelHook(['name','age'])

async.tapAsync('1',(name,cb)=>{
    setTimeout(()=>{
        console.log(1);
        cb(11)
    },1000)
})
async.tapAsync('2',(name,cb)=>{
    setTimeout(()=>{
        console.log(2);
        cb(22)
    },1000)
})
async.tapAsync('3',(name,cb)=>{
    setTimeout(()=>{
        console.log(3);
        cb(33)
    },1000)
})

async.callAsync('kim',(res)=>{
    console.log(res);
})