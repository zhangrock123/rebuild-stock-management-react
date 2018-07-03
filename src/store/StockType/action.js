import * as TYPE from './action-type';
import service from '@/service';

export const stockTypes = () => {
  return async dispatch => {
    let res = await service.stockType();
    dispatch({
      type: TYPE.SAVE_STOCK_TYPE,
      stockType: res.data.data
    });
    return res.data.data;
  }
}

