// 发布订阅  on 订阅 emit 发布

let EventEmitter = require('events');
let util = require('util');
function Girl(){
    
}
util.inherits(Girl,EventEmitter);
let girl = new Girl;
function cry(){
    console.log('cry')
}
function eat(){
    console.log('eat')
}
function shopping(){
    console.log('shopping')
}
girl.on('失恋了',cry);
girl.on('失恋了',cry);
girl.on('失恋了',eat);
girl.on('失恋了',shopping);

girl.emit('失恋了');
