import * as types from '../action-types';
let initState = [{content:'吃饭',id:1},{content:'睡觉',id:2}];
function list(state=initState,action){
  switch(action.type){
    case types.REMOVE_LIST_BY_ID:
      return state.filter(item=>item.id!=action.id);
  }
  return state;
}
export default list;