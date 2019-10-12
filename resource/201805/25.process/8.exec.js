let {exec,execFile} = require('child_process');


exec('node -v',function(err,data){
    console.log(data);
})
execFile('node',['-v'],function(err,data){
    console.log(data);
})