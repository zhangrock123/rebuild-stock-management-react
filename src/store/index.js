import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as Home from './Home/reducer';
import * as Login from './Login/reducer';
import * as User from './User/reducer';
import * as Department from './Department/reducer';
import * as StockType from './StockType/reducer';
import * as Stock from './Stock/reducer';
import thunk from 'redux-thunk';

let store = createStore(
  combineReducers({ ...Home, ...Login, ...User, ...Department, ...StockType, ...Stock }),
  applyMiddleware(thunk)
);

export default store;
