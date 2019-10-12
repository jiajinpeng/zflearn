import {createStore} from '../redux';
import * as types from './action-types';
import reducer from './reducers'
let store = createStore(reducer);
window.store = store;
export default store;