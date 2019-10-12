import {createStore,compose,applyMiddleware} from '../redux';
import reducer from './reducer'

let reduxLogger1 = (store)=>(next)=>(action)=>{
  console.log('1prev',store.getState());
  next(action)
  console.log('1next',store.getState());
}

let reduxLogger2 = (store)=>(dispatch)=>(action)=>{
  console.log('2prev',store.getState());
  dispatch(action)
  console.log('2next',store.getState());
}

// applyMiddleware(reduxLogger1,reduxLogger2)(createStore)(reducer);
export default createStore(reducer,applyMiddleware(reduxLogger1,reduxLogger2));

// compose 要把多个中间件组合起来
// function add(a,b){
//   return a+b;
// }
// function toUpperCase(str){
//   return str.toUpperCase();
// }
// function len(str){
//   return str.length
// }

// len   toUpperCase => (...args)=>len(toUpperCase(...args))
// (...args)=>len(toUpperCase(...args) add => 
// (...args)=>(...args)=>len(toUpperCase())   add(...args)
// (...args)=>len(toUpperCase(add(...args)))  
// (...args)=>len(toUpperCase(add(...args)))  "a","b"
// len(toUpperCase(add('a','b'))) 



// old --------------
// function compose(...fns){
//   return function(args){
//     return fns.reduceRight((prev,next)=>{
//        return next(prev);
//     },args)
//   }
// }
// let v = compose(toUpperCase,add)('a');
// console.log(v);


// let fn1 = (dispatch)=>(action)=>{
//   console.log('1prev',store.getState());
//   dispatch(action)
//   console.log('1next',store.getState());
// }
// let fn2 = (action)=>{
//   console.log('2prev',store.getState());
//   dispatch(action)
//   console.log('2next',store.getState());
// }