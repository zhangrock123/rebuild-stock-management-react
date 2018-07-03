import * as TYPE from './action-type';

let defaultState = {
  stockType: []
};

export const stockTypeData = (state = defaultState, action = {}) => {
  switch (action.type) {
    case TYPE.SAVE_STOCK_TYPE:
      return { ...state, ...{ stockType: action.stockType } };
    default:
      return state;
  }
}

