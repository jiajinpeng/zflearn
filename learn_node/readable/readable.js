let fs = require('fs');
let EventEmmitter = require('events');

class  ReadStream extends EventEmmitter {
    constructor(path,options){
        super();
        this.path = path;
        this.flags = options.flags || 'r';
        this.autoClose = options.autoClose || true;
        this.encoding = options.encoding || 'utf8';
        this.highWaterMark = options.highWaterMark || 64 * 1024;
        this.start = options.start || 0;
        this.len = 0; // 当前缓存里多少水
        this.buffers = []; // 缓存区
        this.reading = false;// 如果正在读取时，就不要再去读取了
        this.emittedReadable = false; // 当缓存区长度为0时才会触发事件
        this.pos = this.start; // 位置
        this.open(); // 调用时还没有拿到fd
        this.on('newListener',(type)=>{
            if(type === 'readable'){
                this.read()
            }
        })
    }
    destroy() {
        if (typeof this.fd !== 'number') {
            return this.emit('close');
        }
        fs.close(this.fd, () => {
            this.emit('close');
        })
    }
    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) {
            this.emit('error', err);
            if (this.autoClose) {
                this.destroy();
            }
            return;
            }
            this.fd = fd;
            this.emit('open', this.fd);
        })
    }
    read(n){
        let buffer
        if(n > 0 && n <= this.len){
            buffer = Buffer.alloc(n)
            let buf
            let index = 0
            let flag =true
            while (flag && (buf = this.buffers.shift())){
                for(let i = 0; i < buf.length; i++){
                    buffer[index++] = buf[i]
                    if(index === n){
                        flag = false
                        this.len -= n
                        let r = buf.slice(i+1)
                        if(r.length){
                            this.buffers.unshift(r)
                        }
                        break
                    }
                }
            }
        }
        if (this.len === 0) {
          this.emittedReadable = true;
        }
        if(this.len < this.highWaterMark){
            if(!this.reading){
                this.reading = true
                this._read()
            }
        }
        return buffer;
    }
    _read(){
        if(typeof this.fd != 'number'){
            return this.once('open',()=>this._read())
        }
        let buf = Buffer.alloc(this.highWaterMark)
        fs.read(this.fd,buf,0,buf.length,this.pos,(err,byteRead)=>{
            this.reading = false
            if(byteRead > 0){
                this.len += byteRead
                this.pos += byteRead
                this.buffers.push(buf.slice(0,byteRead))
                if (this.emittedReadable) {
                    this.emittedReadable = false; //默认下一次不触发readable事件
                    this.emit('readable'); // 可以读取了，默认杯子填满了
                }
            }else{
                this.emit('end')
            }
        })
    }
}

let rs = new ReadStream(__dirname+'/1.txt',{
    highWaterMark:3
});
  
rs.on('readable',()=>{
    let r = rs.read(1);
    console.log(r);
    r = rs.read(1);
    console.log(r);
    setTimeout(()=>{
        console.log(r);
    })
});