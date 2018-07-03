import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
import 'element-theme-default';
import store from '@/store';
import '@styles/index.less';
import '@styles/reset.less';

ReactDOM.render((
  <Provider store={store}>
    <Routes />
  </Provider>
), document.getElementById('app'));

