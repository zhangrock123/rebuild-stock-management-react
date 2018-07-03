import * as TYPE from './action-type';

let defaultState = {
  departmentList: []
}
// 首页表单数据
export const departmentData = (state = defaultState, action = {}) => {
  switch (action.type) {
    case TYPE.SAVE_DEPARTMENT_DATA:
      return { ...state, ...{ departmentList: action.departmentList } };
    default:
      return state;
  }
}

