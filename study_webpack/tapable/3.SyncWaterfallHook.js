// let { SyncWaterfallHook } = require('tapable')

class SyncWaterfallHook{
    constructor(agrs){
        this.agrs = agrs
        this.tasks = []
    }
    tap(name,task){
        this.tasks.push(task)
    }
    call(...agrs){
        // let first = this.tasks.shift()
        // this.tasks.reduce(function(val,task){
        //     return task(val)
        // },first(...agrs))
        let [...prev] = [...agrs]
        this.tasks.forEach(el=>{
            prev = el(...prev)
        })
    }
}


let synchook = new SyncWaterfallHook(['name','age'])

synchook.tap('1', (name, age) => {
    console.log(name, age, '1');
    return '一';
});
synchook.tap('2', (name,data) => {
    console.log(name, '2');
    return '二';
});
synchook.tap('3', (name,data) => {
    console.log(name, '3');
});
synchook.call('kim',18)