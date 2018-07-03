import * as Home from './action-type';

let defaultState = {
  dataList: []
}
// 首页表单数据
export const otaData = (state = defaultState, action = {}) => {
  switch (action.type) {
    case Home.GETOTALIST:
      return { ...state, ...action };
    default:
      return state;
  }
}

