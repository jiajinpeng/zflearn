import counter from './counter'; // 计数器的reducer {number:0}
import list from './list'; // 列表的reducer []
import todo from './todo'
// redux中有一个方法 合并reducer的 {counter:{number:0},list:[]}{counter:{number:0},list:[]}
// combineReducers
import {combineReducers} from '../../redux.js'

// store.getState() = >{counter:{number:0},list:[],todo:[]}
export default combineReducers({list,counter,todo})