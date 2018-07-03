import * as TYPE from './action-type';
import service from '@/service';
import { getUserInfo } from '@/store/User/action';
getUserInfo();

export const getDepartmentList = () => {
  return async dispatch => {
    let res = await service.getDepartmentList();
    dispatch({
      type: TYPE.SAVE_DEPARTMENT_DATA,
      departmentList: res.data.data
    });
    return res.data.data;
  }
}

export const getAllDepartments = () => {
  return async dispatch => {
    let res = await service.getAllDepartmentList();
    return res.data.data;
  }
}

export const createDepartment = (settings = {}) => {
  return async dispatch => {
    let res = await service.createDepartment(settings);
    return res.data;
  }
}

export const updateDepartment = (settings = {}) => {
  return async dispatch => {
    let res = await service.updateDepartment(settings);
    return res.data;
  }
}

export const deleteDepartment = (settings = {}) => {
  return async dispatch => {
    let res = await service.deleteDepartment(settings);
    return res.data;
  }
}

export const recoverDepartment = (settings = {}) => {
  return async dispatch => {
    let res = await service.recoverDepartment(settings);
    return res.data;
  }
}
