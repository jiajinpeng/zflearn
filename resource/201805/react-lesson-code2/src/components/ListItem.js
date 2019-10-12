import React, { Component } from 'react'
import {Consumer} from '../context.js';
export default class ListItem extends Component {
  handleClick = (id) => {
    this.props.removeById(id);
  }
  render() {
    let { avatar, username, content, id } = this.props;
    return (
      <Consumer>
      {(value)=>{
        return  <div className="media" >
        <div className="media-left">
          <img src={avatar} alt="" />
        </div>
        <div className="media-body">
          <h3>{username}</h3>
          <div>{content}</div>
          <button className="btn btn-danger" onClick={this.handleClick.bind(123,id)}>删除</button>
          <button onClick={()=>{
            value.increment();
          }}>点赞</button>
          {value.color}
        </div>
      </div>
      }}
      </Consumer>
    )
  }
}
// 写一篇reat的文章 入门级
// https://zhufengzhufeng.github.io/zhufengreact/
// https://juejin.im/post/5aee7bb4f265da0b7c072b73



// react 路由 (用法 / 原理)

// antd