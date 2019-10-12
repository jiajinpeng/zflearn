let app = {
  middlewares:[],
  use(fn){
    this.middlewares.push(fn);
  }
}
app.use(function (next) {
  console.log(1);
  next();
})
app.use(function (next) {
  console.log(2);
  next();
})
app.use(function (next) {
  console.log(3);
  console.log(next)
 // next();
});
// [fn1,fn2,fn3]
//  a =(...args)=>fn1(()=>fn2(...args))
//  b= fn3
// ()=>(...args)=>fn1(()=>fn2(() => fn3(...args)))
//  //next =
// let fn = app.middlewares.reduce(function(a,b){
//   return function (...args) {
//       return a(function(){
//         return b(...args);
//       })
//   }
// })
//  ()=>fn1(()=>fn2(()=>fn3()=>(fn4()=>())));
//                 funcs.reduce((a, b) => (...args) => a(b(...args)))
// let fn = app.middlewares.reduce((a, b) => (...args) => a(() => b(...args)));
// fn();
// let dispatch = 
// function dispatch(index) {
//   if(index === app.middlewares.length) return;
//   let middle = app.middlewares[index];
//   middle(()=>dispatch(index+1));
// }
// dispatch();