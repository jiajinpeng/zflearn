import React, { Component } from 'react'
import {connect} from '../react-redux'
import actions from '../store/actions/counter'
class Counter extends Component {
  render() {
    return (
      <div>
          <button onClick={()=>{
            this.props.add(1);
          }}>+</button>
          {this.props.counter.number}
          <button onClick={()=>{
            this.props.minus(1);
          }}>-</button>
      </div>
    )
  }
}

export default connect((state)=>({...state}),actions)(Counter)