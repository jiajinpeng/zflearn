// let { SyncHook } = require('tapable')

class SyncHook{
    constructor(agrs){
        this.agrs = agrs
        this.tasks = []
    }
    tap(name,task){
        this.tasks.push(task)
    }
    call(...agrs){
        this.tasks.forEach(el=>{
            el(...agrs)
        })
    }
}


let synchook = new SyncHook(['name','age'])

synchook.tap('1',(name,age)=>{
    console.log('1',name,age);
})
synchook.tap('2',(name,age)=>{
    console.log('2',name,age);
})

synchook.call('kim',18)