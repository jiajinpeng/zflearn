import React, { Component } from 'react'

export default class Login extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <button onClick={()=>{
          // 通过参数识别 跳转是否正确
          localStorage.setItem('login','ok');
          if(this.props.location.state){
            this.props.history.push(this.props.location.state.from);
          }else{
            this.props.history.push('/');
          }
        }} className="btn btn-danger">登录</button>
         <button onClick={()=>{
          localStorage.clear('login');
        }} className="btn btn-danger">退出</button>
      </div>
    )
  }
}
