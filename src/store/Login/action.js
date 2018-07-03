import * as TYPE from './action-type';
import service from '@/service';

export const getVerificationToken = (params = {}) => {
  return async dispatch => {
    let res = await service.getVerifyImgToken(params);
    dispatch({
      type: TYPE.GET_VERIFICATION_TOKEN,
      token: res.data.data.token
    });
    return res;
  }
}

export const doLogin = (params = {}) => {
  return async dispatch => {
    let res = await service.userLogin(params);
    return res;
  }
}
