import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
// React.Component 会把当前传递的属性挂载在当前的实例上
class Person extends Component {
  static defaultProps = {
    name: 'zfpx'
  }
  static propTypes = { // 用来校验的
    name: PropTypes.string.isRequired,
    gender: PropTypes.oneOf(['男', '女']),
    hobby: PropTypes.arrayOf(PropTypes.string),
    pos: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    salary(obj, key, p) { // 自己校验
      if (obj[key] <= 3000) {
        throw new Error('工资太低了');
      }
    }
  }
  render() {
    let { name, age, hobby, pos, salary } = this.props
    return (<div>
      {name} {age}
    </div>)
  }
}
// 属性校验
let obj = {
  age: 9,
  gender: '男',
  hobby: ['游泳', '跑步'],
  pos: { x: 433, y: 822 },
  salary: 6000
}
ReactDOM.render(<Person {...obj}></Person>, window.root)

