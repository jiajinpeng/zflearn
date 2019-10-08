// let { SyncLoopHook } = require('tapable')

class SyncLoopHook{
    constructor(agrs){
        this.agrs = agrs
        this.tasks = []
    }
    tap(name,task){
        this.tasks.push(task)
    }
    call(...agrs){
        this.tasks.forEach(task=>{
            let state
            do {
                state = task(...agrs)
            } while (state);
        })
    }
}


let synchook = new SyncLoopHook(['name','age'])
let index = 1
synchook.tap('1', (name) => {
    console.log(name, '1');
    if(index++ < 3){
        return true
    }
});
synchook.tap('3', (name) => {
    console.log(name, '3');
});
synchook.call('kim')