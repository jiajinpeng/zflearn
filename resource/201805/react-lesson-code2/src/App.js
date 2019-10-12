import React, { Component } from 'react'
import axios from './request'
import 'bootstrap/dist/css/bootstrap.css'
import Comment from './components/Comment';
import List from './components/List'
import {Provider} from './context';
// React API contextApi  实现跨组件传递 (不超过3 都可以传)
export default class App extends React.PureComponent {
  state = {
    users: [],
    count:0
  }
  increment = ()=>{
    this.setState({
      count:this.state.count+1
    });
  }
  addUser = (val)=>{
    // react 最好不要操作同一个对象
    // 每次更新状态都需要返回一个新的状态 PureComponent
    // PureComponent 优化了 shouldComponentUpdate方法，发现如果返回的是一个状态还是以前的引用地址不会更新
    // 必须返回新对象
    let users = [...this.state.users, { avatar: '', content: val, username: 'zfpx' }];
    this.setState({
      users
    });
  }
  removeById = (id) => {
    let users = this.state.users.filter(user => user.id !== id);
    this.setState({
      users
    })
  }
  async componentDidMount() {
    let users = await axios.get('/user.json');
    this.setState({
      users
    })
  }
  render() {
    return (
      <Provider value={{increment:this.increment,color:'red'}}>
        <div className="container">
          <div className="panel panel-danger">
            <div className="panel-heading">
              评论
            </div>
            <div className="panel-body">
              <List users={this.state.users} removeById={this.removeById}></List>
            </div>
            <div className="panel-footer">
              <Comment addUser={this.addUser}></Comment>
            </div>
            <div>{this.state.count}</div>
          </div>
        </div>
      </Provider>
     
    )
  }
}
