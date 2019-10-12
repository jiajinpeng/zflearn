import * as types from '../action-types';
// 要将 redux中的状态 映射成组件的状态
// 一般情况 action是个对象 我可以用个函数来创建action 这个函数叫做actionCreator
let actions = {
  add(count){
    return {type:types.ADD,count}
  },
  minus(count){
     return {type:types.MINUS,count}
  }
}
export default actions