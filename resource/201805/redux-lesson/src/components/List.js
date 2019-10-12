import React, { Component } from 'react';
import actions from '../store/actions/list';
import {connect} from 'react-redux'
 class List extends Component {
  render(){
    return <div>
    {
      this.props.list.map((item,index)=>(
        <li key={item.id}>{item.content} <button onClick={()=>{
          this.props.remove(item.id)
        }}>-</button></li>
      ))
    }</div>
  }
}
// {counter:{number:0},list:[]}
// 两个方法会自动执行
export default connect((state)=>({...state}),actions)(List);