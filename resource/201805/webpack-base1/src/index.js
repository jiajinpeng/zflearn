// 主模块 webpack 默认会识别js模块

import str from './a'
import './index.css'
import './less.less'
document.getElementById('app').innerHTML = str;


if(module.hot){
  module.hot.accept()
}