import React, { Component } from 'react';
import store from '../store'
import actions from '../store/actions/list';
export default class List extends Component {
  state = {
    lists:store.getState().list
  }
  componentWillMount(){
    store.subscribe(()=>{
      this.setState({lists:store.getState().list})
    })
  }
  render(){
    return <div>
    {
      this.state.lists.map((item,index)=>(
        <li key={item.id}>{item.content} <button onClick={()=>{
          store.dispatch(actions.remove(item.id));
        }}>-</button></li>
      ))
    }</div>
  }
}