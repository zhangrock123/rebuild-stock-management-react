import * as TYPE from './action-type';

let defaultState = {
  stockDetail: {}
};

export const stockData = (state = defaultState, action = {}) => {
  switch (action.type) {
    case TYPE.SAVE_STOCK_DETAIL:
      return { ...state, ...{ stockDetail: action.stockDetail } };
    default:
      return state;
  }
}

