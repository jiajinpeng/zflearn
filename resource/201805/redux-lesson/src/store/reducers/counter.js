import * as types from '../action-types';
let initState = {number:0};
function counter(state=initState,action) {
    switch (action.type) {
      case types.ADD:
      debugger;
        return {number:state.number+action.count};
      case types.MINUS:
        return {number:state.number-action.count};
    }
   return state
}
export default counter

// 单元测试 会先测试reducer