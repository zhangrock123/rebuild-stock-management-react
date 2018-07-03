import React from 'react';
import { Router, Route, useRouterHistory, IndexRoute } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';

const history = useRouterHistory(createHashHistory)({})

import AppLayout from '@/components/AppLayout';
import Welcome from '@/pages/Welcome';
const Login = (lo, cb) => require.ensure([], () => cb(null, require('@/pages/Login').default), 'Login')
// const AppLayout = (lo, cb) => require.ensure([], () => cb(null, require('@/components/AppLayout').default), 'AppLayout')

const UserList = (lo, cb) => require.ensure([], () => cb(null, require('@/pages/User/list').default), 'UserList')
const UserCreate = (lo, cb) => require.ensure([], () => cb(null, require('@/pages/User/create').default), 'UserCreate')

const DepartmentList = (lo, cb) => require.ensure([], () => cb(null, require('@/pages/Department/list').default), 'DepartmentList')
const DepartmentCreate = (lo, cb) => require.ensure([], () => cb(null, require('@/pages/Department/create').default), 'DepartmentCreate')

const StockList = (lo, cb) => require.ensure([], () => cb(null, require('@/pages/Stock/list').default), 'StockList')
const StockCreate = (lo, cb) => require.ensure([], () => cb(null, require('@/pages/Stock/create').default), 'StockCreate')

const StockTypeList = (lo, cb) => require.ensure([], () => cb(null, require('@/pages/StockType/list').default), 'StockTypeList')
const StockTypeCreate = (lo, cb) => require.ensure([], () => cb(null, require('@/pages/StockType/create').default), 'StockTypeCreate')

const HistoryList = (lo, cb) => require.ensure([], () => cb(null, require('@/pages/History/index').default), 'HistoryList')

const AdminInfo = (lo, cb) => require.ensure([], () => cb(null, require('@/pages/Admin/index').default), 'AdminInfo')
const AdminCreate = (lo, cb) => require.ensure([], () => cb(null, require('@/pages/Admin/create').default), 'AdminCreate')
const AdminSignOut = (lo, cb) => require.ensure([], () => cb(null, require('@/pages/Admin/signOut').default), 'AdminSignOut')
const StockDetail = (lo, cb) => require.ensure([], () => cb(null, require('@/pages/Stock/detail').default), 'StockDetail')


const chkAuth = (nextState, replaceState) => {
  // console.log('nextState', nextState)
  // console.log('replaceState', replaceState)
}

export default () => (
  <Router history={history}>
    <Route path="/" component={AppLayout} onEnter={chkAuth}>
      <IndexRoute component={Welcome} />
      <Route path="user/list" getComponent={UserList} />
      <Route path="user/create" getComponent={UserCreate} />
      <Route path="department/list" getComponent={DepartmentList} />
      <Route path="department/update/:id/:name" getComponent={DepartmentCreate} />
      <Route path="department/create" getComponent={DepartmentCreate} />
      <Route path="stock/list" getComponent={StockList} />
      <Route path="stock/create" getComponent={StockCreate} />
      <Route path="stock/detail/:id" getComponent={StockDetail} />
      <Route path="stock-type/list" getComponent={StockTypeList} />
      <Route path="stock-type/create" getComponent={StockTypeCreate} />
      <Route path="history" getComponent={HistoryList} />
      <Route path="admin/index" getComponent={AdminInfo} />
      <Route path="admin/create" getComponent={AdminCreate} />
      <Route path="admin/loginout" getComponent={AdminSignOut} />
    </Route>
    <Route path="/login" getComponent={Login} />
  </Router>
);

