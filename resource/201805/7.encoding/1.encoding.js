// 1个字节 最大255 一个汉字三个字节
// 0b 二进制  0o666  八进制  0x16 十六进制
// 进制的转化  任意进制 转 10进制
// 任意进制 转任意进制

let int10 = parseInt('1011',2);
console.log(int10);

let int10 = (22).toString(2);
console.log(int10);

// 编码的问题
// BOM头 gb2312 -> utf8 就会产生这样一个头
let fs = require('fs');
let str = fs.readFileSync('./1.txt','utf8');
let r = stripBom(str);
console.log(r);
function stripBom (str){ // 目前去除多余的文字
    if(str.charCodeAt(0)=== 0XFEFF){
        return str.slice(1);
    }
}
// 编码转化的问题
// unicode转化 utf8 需要先转化成2进制 之后依次按照规律补位即可
// unicode 编码 -> utf8
// 4f60  => utf8
// 11100100 10111101 10100000
console.log(0x4f60.toString(2))
// node里只支持 utf8
let str = Buffer.from([0b11100100,0b10111101,0b10100000]).toString();
console.log(str);

// bas64 不能发给客户端 base64 不是加密的手段 编码转化
// 11111111 00111111  
let base64 = Buffer.from('珠').toString('base64');
console.log(base64) // 54+g

let r = Buffer.from('珠');
console.log(r);
console.log(0xe7.toString(2));
console.log(0x8f.toString(2));
console.log(0xa0.toString(2));
// 11100111  10001111  10100000
// 00111001  00111000  00111110  00100000
console.log(parseInt('00111001',2))
console.log(parseInt('00111000',2))
console.log(parseInt('00111110',2))
console.log(parseInt('00100000',2))
// 57 56 62 32
// base64的编码 是定好的
let str = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
str += 'abcdefghijklmnopqrstuvwxyz'
str += '0123456789+/';
console.log(str[57]+str[56]+str[62]+str[32]);