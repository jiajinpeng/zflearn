import React from 'react';

import ReactDOM,{render} from 'react-dom';
import Counter from './components/Counter';
import List from './components/List';
import Todo from './components/Todo';
import {Provider} from  'react-redux'
import store from './store';
// Provider 需要注入一个store属性 store就是redux中的store
render(<Provider store={store}>
  <React.Fragment>
    <Counter/>
    <List/>
    <Todo/>
  </React.Fragment>
</Provider>,window.root);