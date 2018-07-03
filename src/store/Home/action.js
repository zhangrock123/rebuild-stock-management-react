import * as Home from './action-type';
import service from '@/service';

export const getOtaList = (settings = {}) => {
  return async dispatch => {
    let res = await service.queryOta({
      token: 'eyJzY29wZSI6InF0ZXNfangBAba0YnVja2V0IiwiZGVhZGxpbmUiOjE1MDIzMzcyNTF9',
      authVendor: 'FangBaBa',
      supplierId: 1,
      innId: 75835,
      ...settings
    })
    dispatch({
      type: Home.GETOTALIST,
      dataList: res.data.otaList
    });
    return res;
  }
}
