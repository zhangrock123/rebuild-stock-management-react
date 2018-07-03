import React from 'react';
import { connect } from 'react-redux';
import { createDepartment, updateDepartment } from '@/store/Department/action';
import { hashHistory } from 'react-router';

import { Input, Button, Message } from 'element-react';

@connect(
  state => ({
    userData: state.userData,
  }),
  {
    createDepartment,
    updateDepartment,
  }
)
export default class DepartmentCreate extends React.Component {

  state = {
    default: {
      id: '',
      name: ''
    },
    departmentName: ''
  }

  doSubmit() {
    let param = {
      token: this.props.userData.userInfo.token,
      ...this.state
    }
    let defaultId = this.state.default.id;
    if (!this.state.departmentName) {
      return Message({
        message: '部门名称为空！',
        type: 'warning'
      });
    }
    this.props[defaultId ? 'updateDepartment' : 'createDepartment']({
      departmentId: this.state.default.id,
      token: this.props.userData.userInfo.token,
      ...this.state
    }).then(res => {
      Message({
        message: `部门${defaultId ? '更新' : '创建'}成功！`,
        type: 'success'
      });
      hashHistory.push({
        pathname: '/department/list',
      })
    })
  }

  onChange(key, val) {
    console.log(key, val)
    this.setState({
      [key]: val
    });
  }

  componentWillMount() {
    this.setState({
      default: { ...this.props.params },
      departmentName: this.props.params.name
    })
  }

  render() {
    return (
      <div>
        <Input placeholder="请输入内容" value={this.state.departmentName} onChange={this.onChange.bind(this, 'departmentName')} />
        <Button type="success" onClick={this.doSubmit.bind(this)}>创建</Button>
      </div>
    )
  }
}
