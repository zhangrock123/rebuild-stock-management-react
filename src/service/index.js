import axios from 'axios';
import qs from 'qs';
import config from '@/config';

// axios 配置
axios.defaults.timeout = 15000;
axios.defaults.baseURL = config.apiHost;
// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';

let getDefaultParam = () => {
  return {};
}

// POST传参序列化
axios.interceptors.request.use(config => {
  let isPost = config.method === 'post';
  let configKey = isPost ? 'data' : 'params';
  config.params = { ...(config.params || {}), ...getDefaultParam() }
  config[configKey] = { ...(config[configKey] || {}) };
  // 当post提交时候，config 可配置 requestType => payload 或者 formData，默认 formData
  if (isPost) {
    if (config.requestType == 'payload') {
      config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    } else {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
      config.data = qs.stringify(config.data)
    }
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 返回状态判断
axios.interceptors.response.use(res => {
  return res;
}, error => {
  return Promise.reject(error);
});

import baseService from './baseService';

export default {
  ...baseService(axios, config)
};
