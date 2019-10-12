let RS = require('./readStream');
let WS = require('./writeStream');
let fs = require('fs');
let rs =fs.createReadStream('./2.txt',{
  highWaterMark:3
});
let ws = fs.createWriteStream('./3.txt',{
  highWaterMark:3
});
rs.pipe(ws);