import React,{Component} from 'react';
import store from '../store'
import actions from '../store/actions/counter'
export default class Counter extends Component{
  state = {
    number:store.getState().counter.number
  }
  componentWillMount(){
    this.unsubcribe = store.subscribe(()=>{
      this.setState({
        number:store.getState().counter.number
      })
    })
  }
  componentWillUnmount(){
    this.unsubcribe();
  }
  render(){
    return (<div>
      <button onClick={()=>{
        store.dispatch(actions.add(1));
        
      }}>+</button>
        {this.state.number}
        <button  onClick={()=>{
        store.dispatch(actions.minus(2))
      }}>-</button>
    </div>)
 }
}