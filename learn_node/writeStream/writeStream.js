let fs = require('fs')
let EventEmitter = require('events')

class WriteStream extends EventEmitter {
    constructor(path,options = {}){
        super()
        this.path = path
        this.flags = options.flags || 'w'
        this.encoding = options.encoding || 'utf8'
        this.start = options.start || 0
        this.pos = this.start //写入的偏移量
        this.mode = options.mode || 0o666
        this.autoClose = options.autoClose || true
        this.highWaterMark = options.highWaterMark || 16*1024
        this.open()
        this.writing = false; // 默认第一次就不是正在写入
        this.cache = [];// 缓存我用简单的数组来模拟一下
        this.len = 0;// 表示缓存的长度
        this.needDrain = false;// 是否触发drain事件
    }
    open(){//打开文件
        fs.open(this.path,this.flags,this.mode,(err,fd)=>{
            if(err){
                this.emit('error',err)
                if(this.autoClose){
                    this.destroy()
                }
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
    write(chunk,encoding=this.encoding){//写入
        chunk = Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk,encoding)//计算写入数据的长度，以buffer类型为准
        this.len += chunk.length
        let state = this.len < this.highWaterMark//计算write返回的状态
        if(!state){
            this.needDrain = true
        }
        if(this.writing){//判断是否正在写入的状态
            this.cache.push({//将等待写入的数据插入到缓存区，此处用数组模拟缓存区
                chunk,
                encoding
            })
        }else{
            this.writing = true
            this._write(chunk,encoding)//如果现在是非写入状态，则调用写入方法
        }
        return state
    }
    _write(chunk,encoding){//写入数据的方法
        if(typeof this.fd != 'number'){//如果没有拿到fd对象，则等到文件打开后再次调用写入方法
            return this.once('open',()=>this._write(chunk,encoding))
        }
        fs.write(this.fd,chunk,0,chunk.length,this.pos,(err,byteWrite)=>{//开始写入
            if(err){
                this.emit('error',err)
                if(this.autoClose){
                    this.destroy()
                }
                return
            }
            this.pos += byteWrite//根据实际写入长度增加偏移量
            this.len -= byteWrite//根据实际写入长度减少len
            this.clearBuffer()
        })
    }
    clearBuffer(){
        let bf = this.cache.shift()//删除缓存区第一组数据
        if(bf){//如果缓存区还有数据，继续调用写入方法
            this._write(bf.chunk,bf.encoding)
        }else{//如果缓存区没有数据了，触发drain方法
            if(this.needDrain){
                this.needDrain = false
                this.writing = false
                this.emit('drain')
            }
        }
    }
}
module.exports = WriteStream