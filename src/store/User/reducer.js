import * as TYPE from './action-type';
import store from '@/utils/store';
import Immutable from 'immutable';

const STORE_USER = {
  userInfo: 'userInfo'
};

let defaultState = {
  userInfo: {}
};

export const userData = (state = defaultState, action = {}) => {
  switch (action.type) {
    case TYPE.SAVE_USER_INFO:
      store.setStore(STORE_USER.userInfo, action.userInfo || {});
      return { ...state, ...{ userInfo: action.userInfo } };
    case TYPE.CLEAR_USER_INFO:
      store.removeStore(STORE_USER.userInfo);
      return { ...state };
    default:
      return state;
  }
}

