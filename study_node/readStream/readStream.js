let fs = require('fs')
let EventEmitter = require('events')

class ReadStream extends EventEmitter {
    constructor(path,options = {}){
        super()
        this.path = path
        this.flags = options.flags || 'r'
        this.highWaterMark = options.highWaterMark || 64 * 1024
        this.autoClose = options.autoClose || true
        this.start = options.start || 0
        this.position = this.start //position是读取的位置
        this.end = options.end || null
        this.encoding = options.encoding || null
        this.flowing = null//非流动模式
        this.buffer = Buffer.alloc(this.highWaterMark)
        this.open()
        this.on('newListener',(type)=>{
            if(type == 'data'){//当用户监听data事件时，触发read
                this.flowing = true
                this.read()
            }
        })
    }
    open(){//打开文件
        fs.open(this.path,this.flags,(err,fd)=>{
            if(err){
                if(this.autoClose){
                    this.destroy()
                }
                this.emit('error',err)
                return
            }
            this.fd = fd
            this.emit('open',this.fd)
        })
    }
    destroy(){//关闭文件
        if(typeof this.fd != 'number'){
            this.emit('close')
            return
        }
        fs.close(this.fd,()=>{
            this.emit('close')
        })
    }
    read(){//读取文件
        if(typeof this.fd != 'number'){
            this.once('open',()=>{//第一次读取没有获取到fd，监听一下open，open之后执行read
                this.read()
            })
            return
        }
        //当end不为空时，read方法的length参数不一定是用户传的highWaterMark，每次读取都需要重新计算
        let howMuchToRead = this.end?Math.min(this.end-this.position+1,this.highWaterMark):this.highWaterMark
        fs.read(this.fd,this.buffer,0,howMuchToRead,this.position,(err,byteRead)=>{
            this.position += byteRead//byteRead为真是读取的位数
            let b = this.encoding == 'utf8' ? this.buffer.slice(0,byteRead).toString() : this.buffer//截取真实读到的数据
            this.emit('data',b)
            //未读完并且处于流动模式时，再次调用read
            if(byteRead == this.highWaterMark && this.flowing){
                return this.read()
            }
            if(byteRead < this.highWaterMark){
                this.emit('end')
                this.destroy()
            }
        })
    }
    pause(){//暂停
        this.flowing = false
    }
    resume(){//继续
        this.flowing = true 
        this.read()
    }
    pipe(ws){
        this.on('data',(data)=>{
            let flag = ws.write(data)
            if(!flag){
                this.pause()
            }
        })
        ws.on('drain',()=>{
            this.resume()
        })
    }
}
module.exports = ReadStream