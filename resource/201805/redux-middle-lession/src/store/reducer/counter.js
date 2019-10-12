import * as types from '../action-types'
function counter(state={number:0},action) {
    switch (action.type) {
        case types.ADD:
          return {number:state.number+action.count}
        case types.MINUS:
          return {number:state.number-action.payload.count}
    }
    return state;
}

export default counter