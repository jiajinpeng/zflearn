import * as types from '../action-types';
let initState = [];

function todo(state=initState,action){
  switch(action.type){ // {type:'add_todo',text:'xxx'}
    case types.ADD_TODO:
      return [...state,action.text]
  }
  return initState;
}
export default todo