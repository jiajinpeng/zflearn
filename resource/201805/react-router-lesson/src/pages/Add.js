import React, { Component } from 'react'

// 所有通过route渲染出来的都有三个属性 路由给你的
// 组件内部Route component 会在里面渲染你这个组件，并且把这三个属性传给这个组件
export default class Add extends Component {
  input = React.createRef();
  handleSubmit = (e) =>{
    e.preventDefault();
    let lists = localStorage.getItem('lists');
    lists =  JSON.parse(lists) || [];
    lists.push({id:lists.length+1,username:this.input.current.value});
    localStorage.setItem('lists',JSON.stringify(lists));
    this.props.history.push('/user/list');
  }
  render() {
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="control-label">用户名</label>
            <input type="text" id="username" className="form-control" ref={this.input}/>
          </div>
            <div className="form-group">
            <input type="submit"  className="btn btn-success"/>
          </div>
        </form>
      </div>
    )
  }
}
