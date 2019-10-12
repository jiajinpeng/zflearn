let fs = require('fs');
// open close
let RS = require('./readStream');
let rs =new RS ('./1.txt',{
  flags:'r',
  encoding:'utf8',
  mode:0o666,
  start:0,
  end:6,
  highWaterMark:3,
  autoClose:true
});
rs.on('open',function () {
  console.log('open')
});
rs.on('data', function (data) {
  console.log(data);
  rs.pause();
});
rs.on('end',function () {
  console.log('end')
});
rs.on('close', function () {
  console.log('close')
});
rs.on('error',function () {
  console.log('error')
});
