import React from 'react';
import { connect } from 'react-redux';
import { getDepartmentList, getAllDepartments, deleteDepartment, recoverDepartment } from '@/store/Department/action';
import { hashHistory } from 'react-router';

import { Select, Table, Tag, Button, MessageBox, Message } from 'element-react';

@connect(
  state => ({
    userData: state.userData,
  }),
  {
    getDepartmentList,
    getAllDepartments,
    deleteDepartment,
    recoverDepartment
  }
)
export default class DepartmentList extends React.Component {
  state = {
    searchType: 0,
    departmentList: [],
    tableColumns: [
      {
        label: '部门名称',
        prop: 'departmentName'
      },
      {
        label: '状态',
        render: (row) => {
          return (
            <Tag type={row.status == 1 ? 'success' : 'warning'}>
              {row.status == 1 ? '正常' : '删除或冻结'}
            </Tag>
          )
        }
      },
      {
        label: '操作',
        render: (row) => {
          return (
            <div>
              <Button size="mini" type="info" onClick={this.updateDepartment.bind(this, row)} ><span className="font-12">编辑</span></Button>
              <Button size="mini" type={row.status == 1 ? 'danger' : 'success'} onClick={this.confirmDepartmentAction.bind(this, row)}><span className="font-12">{row.status == 1 ? '删除' : '恢复'}</span></Button>
            </div>
          );
        }
      }
    ],

  }

  updateDepartment(data) {
    hashHistory.push(`/department/update/${data.departmentId}/${data.departmentName}`);
  }

  confirmDepartmentAction(data) {
    MessageBox.confirm(`是否确认${data.status == 1 ? '删除' : '还原'}该部门？`, '提示', {
      type: 'warning'
    }).then(res => {
      this.deleteOrFrozenDepartment(data);
    }).catch(() => { });
  }

  deleteOrFrozenDepartment(data) {
    console.log(data)
    this.props[data.status == 1 ? 'deleteDepartment' : 'recoverDepartment']({
      departmentId: data.departmentId,
      token: this.props.userData.userInfo.token,
    }).then(res => {
      data.status = data.status == 1 ? 2 : 1;
      this.setState({
        departmentList: [...this.state.departmentList]
      })
      Message({
        message: '信息编辑成功！',
        type: 'success'
      });
    })
  }

  filterData(val) {
    this.props[val ? 'getAllDepartments' : 'getDepartmentList']().then(res => {
      this.setState({
        departmentList: res
      })
    })
  }

  componentWillMount() {
    this.filterData(this.state.searchType);
  }

  render() {
    return (
      <div>
        <header>
          <Select className="marginR-5" size="small" value={this.state.searchType} onChange={this.filterData.bind(this)}>
            <Select.Option label="查询所有部门" value={0}></Select.Option>
            <Select.Option label="查询可用部门" value={1}></Select.Option>
          </Select>
        </header>
        <section className="marginT-10">
          <Table
            style={{ width: '100%' }}
            columns={this.state.tableColumns}
            data={this.state.departmentList}
            border={true}
          />
        </section>
      </div>
    )
  }
}
