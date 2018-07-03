import React from 'react';
import { connect } from 'react-redux';
import { getDepartmentList } from '@/store/Department/action';
import { createCustomer } from '@/store/User/action';
import { hashHistory } from 'react-router';


import { Select, Input, Button, Form,Message } from 'element-react';

@connect(
  state => ({
    userData: state.userData,
    departmentData: state.departmentData
  }),
  {
    getDepartmentList,
    createCustomer
  }
)
export default class UserCreate extends React.Component {
  state = {
    form: {
      departmentId: '',
      name: '',
      password: '',
      repeatPassword: ''
    },
  }

  formRules={
    name:[{ required: true, message: '请输入登录帐号！', trigger: 'blur' }],
    password: [{ required: true, message: '请输入登录密码！', trigger: 'blur' }],
    repeatPassword: [
      { required: true, message: '请输入重复密码！', trigger: 'blur' },
      { validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.state.form.password) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        } }
    ]
  }

  onChange(key, val){
    this.setState({
      form: {
        ...this.state.form,
        [key]:val
      }
    })
  }

  doSubmit(e){
    e.preventDefault();
    this.refs.form.validate((valid) => {
      if (valid) {
       this.props.createCustomer({
         token: this.props.userData.userInfo.token,
        departmentId: this.state.form.departmentId,
        name: this.state.form.name,
        password: this.state.form.password
       }).then(res=>{
         Message({
            message: '用户创建成功！',
            type: 'success'
          });
         hashHistory.push({
            pathname: '/user/list',
          })
       })
      } else {
        console.log('error submit!!');
        return false;
      }
    });
    console.log(this.state)
  }

  componentWillMount() {
    this.props.getDepartmentList().then(() => {
    });
  }


  render() {
    return (
      <div>
        <Form ref="form" className="hide-red-star" model={this.state.form} rules={this.formRules} labelWidth="100">
          <Form.Item label="部门" prop="departmentId">
            <Select size="small" value={this.state.form.departmentId} onChange={this.onChange.bind(this, 'departmentId')}>
              {
                this.props.departmentData.departmentList.map(el => {
                  return <Select.Option key={el.departmentId} label={el.departmentName} value={el.departmentId} />
                })
              }
            </Select>
          </Form.Item>
          <Form.Item label="登录帐号" prop="name">
            <Input size="small" placeholder="请输入内容" value={this.state.form.name} onChange={this.onChange.bind(this, 'name')} />
          </Form.Item>
          <Form.Item label="登录密码" prop="password">
            <Input size="small" type="password" placeholder="请输入内容" value={this.state.form.password} onChange={this.onChange.bind(this, 'password')} />
          </Form.Item>
          <Form.Item label="重复密码" prop="repeatPassword">
            <Input size="small" type="password" placeholder="请输入内容" value={this.state.form.repeatPassword} onChange={this.onChange.bind(this, 'repeatPassword')} />
          </Form.Item>
          <Form.Item className="text-center" labelWidth="0">
            <Button size="small" type="success" onClick={this.doSubmit.bind(this)}>创建</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
