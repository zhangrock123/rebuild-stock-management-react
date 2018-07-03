export default (axios, config) => {
  return {
    getVerifyImgToken(data = {}) {
      return axios.get(`${config.apiHost}/verify.asp?action=token`, { params: data });
    },
    userLogin(data = {}) {
      return axios.post(`${config.apiHost}/admin.asp?action=login`, data);
    },
    getDepartmentList(data = {}) {
      return axios.get(`${config.apiHost}/department.asp?action=departments`, { params: data });
    },
    getAllDepartmentList(data = {}) {
      return axios.get(`${config.apiHost}/department.asp?action=alldepartments`, { params: data });
    },
    getCustomerList(data = {}) {
      return axios.get(`${config.apiHost}/customer.asp?action=customers`, { params: data });
    },
    recoverCustomer(data={}){
      return axios.post(`${config.apiHost}/customer.asp?action=recover`,data);
    },
    frozenCustomer(data={}){
      return axios.post(`${config.apiHost}/customer.asp?action=delete`,data);
    },
    resetCustomerPassword(data={}){
      return axios.post(`${config.apiHost}/customer.asp?action=resetpassword`, data);
    },
    createCustomer(data={}){
      return axios.post(`${config.apiHost}/customer.asp?action=create`, data)
    },
    createDepartment(data={}){
      return axios.post(`${config.apiHost}/department.asp?action=add`, data)
    },
    updateDepartment(data = {}) {
      return axios.post(`${config.apiHost}/department.asp?action=update`, data)
    },
    deleteDepartment(data = {}) {
      return axios.post(`${config.apiHost}/department.asp?action=delete`, data)
    },
    recoverDepartment(data = {}) {
      return axios.post(`${config.apiHost}/department.asp?action=recover`, data)
    },
    stockList(data = {}) {
      return axios.get(`${config.apiHost}/stock.asp?action=list`, { params: data });
    },
    stockType(data = {}){
      return axios.get(`${config.apiHost}/stocktype.asp?action=stocktypes`, { params: data });
    },
    stockHistory(data = {}){
      return axios.get(`${config.apiHost}/stockhistory.asp?action=list`, { params: data });
    },
    stockDetail(data={}){
      return axios.get(`${config.apiHost}/stock.asp?action=detail`, { params: data });
    },
    stockImages(data = {}) {
      return axios.get(`${config.apiHost}/stock.asp?action=stockimages`, { params: data });
    },
  };
};
