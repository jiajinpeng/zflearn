let fs = require('fs')
let path = require('path')
let EventEmitter = require('events')

class LineReader extends EventEmitter{
    constructor(path){
        super()
        this.rs = fs.createReadStream(path)
        let RETURN = 0x0d;
        let LINE = 0x0a;
        this.lineArr = []
        this.on('newListener',(type)=>{
            if(type == 'newLine'){
                this.rs.on('readable',()=>{
                    let chat
                    while (chat = this.rs.read(1)) {
                        switch(chat[0]){
                            case RETURN:
                                let a = this.rs.read(1) 
                                if(a && a[0] != LINE){
                                    this.lineArr.push(a[0])
                                }else{
                                    let r = Buffer.from(this.lineArr).toString()
                                    this.lineArr.length = 0
                                    this.emit('newLine',r)
                                }
                                break
                            case LINE:
                                let r = Buffer.from(this.lineArr).toString()
                                this.lineArr.length = 0
                                this.emit('newLine',r)
                                break 
                            default:
                                this.lineArr.push(chat[0])
                        }
                    }
                })
                this.rs.on('end',()=>{
                    let r = Buffer.from(this.lineArr).toString()
                    this.emit('newLine',r)
                })
            }
        })
    }
}

let lineRead = new LineReader(path.join(__dirname,'1.txt'))
lineRead.on('newLine',(data)=>{
    console.log(data)
})