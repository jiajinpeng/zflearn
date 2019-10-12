let http = require('http');
let os = require('os');
console.log(os.cpus().length-1)

process.on('message',function(data,s){
    if(data === 'server'){
        for(let i = 0;i<os.cpus().length-1;i++){
            console.log('xxx')
            http.createServer(function(req,res){
                res.end('子:'+process.pid+'');
            }).listen(s);
        }
    }
})