// let { SyncBailHook } = require('tapable')

class SyncBailHook{
    constructor(agrs){
        this.agrs = agrs
        this.tasks = []
    }
    tap(name,task){
        this.tasks.push(task)
    }
    call(...agrs){
        // let i = 0,state
        // do {
        //     state = this.tasks[i++](...agrs)
        // } while (state === undefined);
        for(let i=0;i<this.tasks.length;i++){
            let state = this.tasks[i](...agrs)
            if(state !== undefined) return
        }
    }
}


let synchook = new SyncBailHook(['name','age'])

synchook.tap('1',(name,age)=>{
    console.log('1',name,age);
    return 'error'
})
synchook.tap('2',(name,age)=>{
    console.log('2',name,age);
})

synchook.call('kim',18)