import * as TYPE from './action-type';
import config from '@/config';

let defaultState = {
  token: '',
  imgUrl: ''
};

export const loginData = (state = defaultState, action = {}) => {
  switch (action.type) {
    case TYPE.GET_VERIFICATION_TOKEN:
      return { ...state, ...{ token: action.token, imgUrl: `${config.apiHost}/verify.asp?action=image&token=${action.token}` } };
    default:
      return state;
  }
}
