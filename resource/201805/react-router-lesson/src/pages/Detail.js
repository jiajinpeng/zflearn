import React, { Component } from 'react'

export default class Detail extends Component {
  state = {
    user:{}
  }
  componentWillMount(){
    let s = this.props.location.state;
    if(s){ // 用户点过来的
      this.setState({user:s});
    }else{
      let users = JSON.parse(localStorage.getItem('lists'));
      // this.props.match.params.id 取出来的结果是字符串类型
      let user = users.find(user=>user.id == this.props.match.params.id) || {};
      this.setState({
        user
      });
    }
  }
  render() {
    console.log(this.state.user)
    return (
      <div>
        {this.state.user.id ? <div>{this.state.user.id} {this.state.user.username}</div>:null}
      </div>
    )
  }
}
