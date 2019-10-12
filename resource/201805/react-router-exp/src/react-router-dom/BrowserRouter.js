import React from 'react';
import {Provider} from './context';
// 需要存上当前的访问的路径
// 想染路径变化 刷新组件 路径定义在状态中 路径变化就更新状态
export default class BrowserRouter extends React.Component{
  state = {
    // 默认获取打开网页时的路径
    location:{
      pathname: window.location.pathname || '/',
    }
  }
  componentWillMount(){
    window.addEventListener('popstate',()=>{
      let pathname = window.location.pathname;
      this.handleChangeState(pathname);
    },false);
  }
  handleChangeState(pathname){
    this.setState({
      location:{
        ...this.state.location,
        pathname
      }
    })
  }
  render(){ // a
    let that = this;
    let value = {
      ...this.state,
      history:{
        push(pathname){
          window.history.pushState({},null,pathname);
          // 还要更新状态中的路径
          that.handleChangeState(pathname);
        }
      }
    }
    return <Provider value={value}>
      {this.props.children}
    </Provider>
  }
}