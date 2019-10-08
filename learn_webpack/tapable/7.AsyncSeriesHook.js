// let { AsyncSeriesHook } = require('tapable');

class AsyncSeriesHook{
    constructor() {
        this.tasks = [];
    }
    tapAsync(name, task) {
        this.tasks.push(task);
    }
    callAsync(...args){
        let finalCallback = args.pop()
        let index = 0
        let next = (e) => {
            let task = this.tasks[index++]
            if(!task || e){
                finalCallback(e)
            }else{
                task(...args,next)
            }
        }
        next()
    }
}


let async = new AsyncSeriesHook(['name'])

async.tapAsync('1',(name,next)=>{
    setTimeout(()=>{
        console.log(1);
        next(11)
    },1000)
})
async.tapAsync('2',(name,next)=>{
    setTimeout(()=>{
        console.log(2);
        next()
    },1000)
})
async.tapAsync('3',(name,next)=>{
    setTimeout(()=>{
        console.log(3);
        next(33)
    },1000)
})

async.callAsync('kim',(res)=>{
    console.log(res);
})