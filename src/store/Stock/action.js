import * as TYPE from './action-type';
import service from '@/service';

export const stockList = (settings = {}) => {
  return async dispatch => {
    let res = await service.stockList(settings);
    return res.data;
  }
}

export const getStockDetail = (settings = {}) => {
  return async dispatch => {
    let data = {};
    let res;
    res = await service.stockDetail(settings);
    data = { ...res.data.data, imgList: [] };
    res = await service.stockImages(settings);
    data.imgList = [...res.data.data];
    dispatch({
      type: TYPE.SAVE_STOCK_DETAIL,
      stockDetail: data
    });
    return data;
  }
}
