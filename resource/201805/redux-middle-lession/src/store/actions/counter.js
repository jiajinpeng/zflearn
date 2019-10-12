import * as types from '../action-types'


let actions = {
  add(count){ // thunk 中间件干了一件事 默认actionCreator返回的是一个对象，如果返回的是一个函数，把dispatch参数会传递到这个参数中，放弃派发的权利 将派发的权利交给了用户自己
    return {type:types.ADD,count}
    // return (dispatch,getState)=>{
    //   setTimeout(()=>{
    //     console.log(getState());
    //     dispatch({type:types.ADD,count});
    //   },1000)
    // }
  },
  minus(count){ // 希望这里面 支持promise写法
     return  {
       type:types.MINUS,
       payload:new Promise((resolve,reject)=>{
         reject({count:1000});
       }) // {type:'minus',payload:{count:1000}}
     }
    // return new Promise((resolve,reject)=>{
    //   setTimeout(()=>{
    //     reject({type:types.MINUS,count});
    //   },3000)
    // })
  }
}
export default actions;
// 1.保证用法 能会用
// 2.知道里面的逻辑 为啥这样写

// koa + vue + vuex + mint-ui + mongo