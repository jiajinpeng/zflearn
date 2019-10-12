import React from 'react';
import {Consumer} from './context';
import pathToRegExp from 'path-to-regexp';
// 把儿子拿出来 和路径比 只要比一个发现相等，直接返回即可
export default class Switch extends React.Component{
  render(){
    return <Consumer>
      {(value)=>{
        // 父级存放的
         let pathname = value.location.pathname;
        React.Children.forEach(this.props.children,(child)=>{
          let {path='/',exact=false} = child.props;
          let reg = pathToRegExp(path,[],{end:exact});
          if(reg.test(pathname)){
            return child    
          }
        })
      }}
    </Consumer>
  }
}