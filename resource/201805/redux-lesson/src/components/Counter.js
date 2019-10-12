import React,{Component} from 'react';
import actions from '../store/actions/counter';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
class Counter extends Component{
  render(){
    return (<div>
      <button onClick={()=>{
         this.props.add(2);
      }}>+</button>
        {this.props.number}
        <button  onClick={()=>{
          this.props.minus(2);
      }}>-</button>
    </div>)
 }
}
// connect 说明是一个高阶函数 最后返回的是一个包装后的组件
let mapStateToProps = (state)=>{ // store.getState()
  return {number:state.counter.number}
}
// let mapDispatchToProps = (dispatch)=>{ // store.dispatch
//   return {
//     add:(count)=>dispatch(actions.add(count)),
//     minus:(count)=>{
//       // {type:minus,count:2}
//       dispatch(actions.minus(count));
//     }
//   }
// }

// let mapDispatchToProps = (dispatch)=>bindActionCreators(actions,dispatch)
// 把两个函数运行完毕后会传递给Counter作为他的属性

// 可以不使用bindActionCreators  react-redux 会自动判断 如果你传递过来的不是方法是对象，会把这个对象 自动用bindActionCreators帮你包装好
export default connect(mapStateToProps,actions)(Counter);