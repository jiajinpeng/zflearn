import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import actions from '../store/actions/todo'
class Todo extends Component{
    text = React.createRef();
    constructor(){
        super();
   }
   render(){
      return (<div>
         <input type="text" ref={this.text}/> <button onClick={()=>{
           this.props.addTodo(this.text.current.value);
         }}>+</button>
         {this.props.todo.length}
         {this.props.todo.map((item,index)=><li key={index}>{item}</li>)}
     </div>)
 }
}
export default connect((state)=>({...state}),actions)(Todo);


// action-types
// reducer  combineReducer
// actions
// 组件中调用

// react-redux 怎么实现的 
// redux中的中间件 

// dva  mobx 后面写项目 dva

// 下午3点继续