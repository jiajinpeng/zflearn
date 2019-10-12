let a = 1;
let b = 2;
function sum(a,b){
    return function(){
        return a+b;
    }
}
let total = sum(a,b);
let c = total();
console.log(c);

// webstorm 