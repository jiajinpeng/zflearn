import React from 'react';
import {Consumer} from './context';
export default class Link extends React.Component{
  render(){
    return <Consumer>
      {({history})=>{
          return <a onClick={()=>{
            history.push(this.props.to)
          }}>{this.props.children}</a>
      }}
    </Consumer>
  }
}