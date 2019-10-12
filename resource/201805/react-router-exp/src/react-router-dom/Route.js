import React from 'react';
import {Consumer} from './context';
import pathToRegExp from 'path-to-regexp';
// 组件不是通过route渲染出来的是没有这三个属性的
export default class Route extends React.Component{
  render(){
    return <Consumer>
      {(value)=>{
        let {pathname} = value.location; // 请求来的路径
        let {path='/',component:Component,render,exact=false} = this.props; // Route上的路径
        let keys = []; // ['id']
        let reg = pathToRegExp(path,keys,{end:exact});
        // 看路径是否能匹配
        if(reg.test(pathname)){
            let result = pathname.match(reg); // 匹配结果
            let match = {}
            if(result){
              let [,...arr] = result;
              match.params = keys.reduce((memo,next,idx)=>{
                memo[keys[idx].name]=arr[idx]
                return memo;
              },{});
            }
            let props = {
                ...value,match
            }
            if(Component){
              return <Component {...props}></Component>
             }else if(render){
               return render(props);
             }else{

             }
          
        }else{
           return null
        }
        
      }}
    </Consumer>
  }
}