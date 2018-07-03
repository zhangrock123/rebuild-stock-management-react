import * as TYPE from './action-type';
import store from '@/utils/store';
import service from '@/service';

const STORE_USER = {
  userInfo: 'userInfo'
};

export const saveUserInfo = (data = {}) => {
  return {
    type: TYPE.SAVE_USER_INFO,
    userInfo: data
  }
}

export const clearUserInfo = () => {
  return {
    type: TYPE.CLEAR_USER_INFO
  }
}

export const getUserInfo = (callback) => {
  return async dispatch => {
    let userInfo = store.getStore(STORE_USER.userInfo) || {};
    !userInfo.id && (userInfo = null);
    await dispatch({
      type: TYPE.SAVE_USER_INFO,
      userInfo
    });
    callback && callback()
  }
}

export const getCustomerList = (params = {}) => {
  return async dispatch => {
    let res = await service.getCustomerList(params);
    return res.data;
  }
}


export const recoverCustomer = (params = {}) => {
  return async dispatch => {
    let res = await service.recoverCustomer(params);
    return res.data;
  }
}


export const frozenCustomer = (params = {}) => {
  return async dispatch => {
    let res = await service.frozenCustomer(params);
    return res.data;
  }
}


export const resetUserPassword = (params = {}) => {
  return async dispatch => {
    let res = await service.resetCustomerPassword(params);
    return res.data;
  }
}

export const createCustomer = (params = {}) => {
  return async dispatch => {
    let res = await service.createCustomer(params);
    return res.data;
  }
}


