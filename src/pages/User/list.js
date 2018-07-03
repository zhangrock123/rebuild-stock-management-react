import React from 'react';
import { connect } from 'react-redux';
import { getDepartmentList } from '@/store/Department/action';
import { getCustomerList, recoverCustomer,frozenCustomer,resetUserPassword } from '@/store/User/action';
import './list.less';

import { Select, Input, Button, Table, Pagination, Tag, Message, MessageBox } from 'element-react';

@connect(
  state => ({
    departmentData: state.departmentData,
    userData: state.userData
  }),
  {
    getDepartmentList,
    getCustomerList,
    recoverCustomer,
    frozenCustomer,
    resetUserPassword
  }
)
export default class UserList extends React.Component {
  state = {
    searchInfo: {
      department: [],
      status: 0,
      orderBy: 'desc',
      keyword: '',
      page: 1,
      limit: 15
    },
    pageCount: 1,
    tableColumns: [
      {
        label: '用户名',
        prop: 'name'
      },
      {
        label: '部门',
        prop: 'departmentName'
      },
      {
        label: '状态',
        prop: 'status',
        render(row, column, idx) {
          return (
            <Tag type={row.status == 1 ? 'success' : 'warning'}>
              {row.status == 1 ? '正常' : '删除或或冻结'}
            </Tag>
          );
        }
      },
      {
        label: '创建时间',
        prop: 'createStamp'
      },
      {
        label: '操作',
        width: '180',
        render:(row, column, idx) =>{
          return (
            <div>
              {row.status !=1 && <Button onClick={this.recoverCustomer.bind(this, row)} size="mini" type="success"><span className="font-12">解冻用户</span></Button>}
              {row.status ==1 && <Button onClick={this.frozenCustomer.bind(this, row)} size="mini" type="danger"><span className="font-12">冻结用户</span></Button>}
              <Button onClick={this.resetCustomerPassword.bind(this, row)} size="mini" type="info"><span className="font-12">重置密码</span></Button>
            </div>
          )
        }
      }
    ],
    customerList: []
  }

  componentWillMount() {
    this.props.getDepartmentList().then(() => {
      this.doSearch();
    });
  }

  onChange(key, val) {
    this.setState({
      searchInfo: {
        ...this.state.searchInfo,
        [key]: val
      }
    })
  }

  pageChange(n){
    this.state.searchInfo.page = n;
    this.doSearch();
  }

  doSearch() {
    this.props.getCustomerList({
      token: this.props.userData.userInfo.token,
      ...this.state.searchInfo
    }).then(res => {
      this.setState({
        customerList: res.data,
        searchInfo: {
          ...this.state.searchInfo
        },
        pageCount: 1 * res.totalPage
      })
    })
  }

  frozenCustomer(data){
    console.log('frozen', data)
    this.props.frozenCustomer({
      token: this.props.userData.userInfo.token,
      customerId: data.id
    }).then(res=>{
      Message({
        message: '冻结用户成功！',
        type: 'success'
      });
      this.doSearch();
    })
  }

  recoverCustomer(data){
    console.log('cover', data)
    this.props.recoverCustomer({
      token: this.props.userData.userInfo.token,
      customerId: data.id
    }).then(res=>{
      Message({
        message: '解冻用户成功！',
        type: 'success'
      });
      this.doSearch();
    })
  }

  resetCustomerPassword(data){
    MessageBox.confirm('是否确认重置该用户密码？密码将随机弹出提示给您。', '提示', {
      type: 'warning'
    }).then(() => {
      this.props.resetUserPassword({
        token: this.props.userData.userInfo.token,
        customerId: data.id
      }).then(res=>{
        MessageBox.alert(`新密码为：${res.data.password}`, '新密码');
      })
    }).catch(() => {});
  }

  render() {
    return (
      <div>
        <header>
          <Select className="marginR-5" size="small" value={this.state.searchInfo.department} onChange={this.onChange.bind(this, 'department')}>
            {
              this.props.departmentData.departmentList.map(el => {
                return <Select.Option key={el.departmentId} label={el.departmentName} value={el.departmentId} />
              })
            }
          </Select>
          <Select className="marginR-5" size="small" value={this.state.searchInfo.status} onChange={this.onChange.bind(this, 'status')}>
            <Select.Option label="全部" value={0}></Select.Option>
            <Select.Option label="正常" value={1}></Select.Option>
            <Select.Option label="冻结" value={2}></Select.Option>
          </Select>
          <Select className="marginR-5" size="small" value={this.state.searchInfo.orderBy} onChange={this.onChange.bind(this, 'orderBy')}>
            <Select.Option label="创建日期倒序" value="desc"></Select.Option>
            <Select.Option label="创建日期顺序" value="asc"></Select.Option>
          </Select>
          <Input className="marginR-5" size="small" placeholder="请输入内容" value={this.state.searchInfo.keyword} onChange={this.onChange.bind(this, 'keyword')} />
          <Button size="small" type="primary" onClick={this.doSearch.bind(this)}>搜索</Button>
        </header>
        <section className="marginT-10">
          <Table
            style={{ width: '100%' }}
            columns={this.state.tableColumns}
            data={this.state.customerList}
            border={true}
          />
          <Pagination className="app-pagination" layout=" prev, pager, next,jumper" onCurrentChange={this.pageChange.bind(this)} pageCount={this.state.pageCount} currentPage={this.state.searchInfo.page} />
        </section>
      </div>
    )
  }
}
