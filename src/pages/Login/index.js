import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'element-react';
import './index.less';

import { getVerificationToken, doLogin } from '@/store/Login/action';
import { saveUserInfo, getUserInfo } from '@/store/User/action';


@connect(
  (state, props) => ({
    loginData: state.loginData,
    userData: state.userData
  }),
  {
    getVerificationToken,
    doLogin,
    saveUserInfo,
    getUserInfo
  }
)
export default class Login extends React.Component {
  static propTypes = {
    loginData: PropTypes.object.isRequired,
    getVerificationToken: PropTypes.func.isRequired,
    doLogin: PropTypes.func.isRequired,
    saveUserInfo: PropTypes.func.isRequired,
    getUserInfo: PropTypes.func.isRequired
  }

  state = {
    loginForm: {
      name: '',
      password: '',
      code: ''
    },
    imgUrl: ''
  }

  // 登录操作
  doLogin(e) {
    e.preventDefault();
    console.log(this.state.loginForm)
    this.refs.loginForm.validate((valid) => {
      if (valid) {
        this.props.doLogin({
          ...this.state.loginForm,
          token: this.props.loginData.token
        }).then(res => {
          this.props.saveUserInfo(res.data.data);
          hashHistory.push({
            pathname: '/',
          })
        })
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }

  // 表单输入项数据绑定
  onChange(key, val) {
    this.setState({
      loginForm: { ...this.state.loginForm, ...{ [key]: val } }
    })
  }

  // 表单验证
  loginFormRules = {
    name: [
      { required: true, message: '请输入帐号', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    code: [
      { required: true, message: '请输入验证码', trigger: 'blur' }
    ]
  }

  componentWillMount() {
    this.props.getUserInfo((() => {
      console.log(this.props.userData)
    }))
  }

  componentDidMount() {
    this.props.getVerificationToken().then(() => {
      this.refreshImgUrl();
    });
  }

  refreshImgUrl() {
    this.setState({
      imgUrl: `${this.props.loginData.imgUrl}&unix=${new Date().getTime()}`
    })
  }

  render() {
    return (
      <div className="login-box">
        <header className="login-header text-center">用户登录</header>
        <section>
          <Form className="hide-red-star" ref="loginForm" labelWidth="80" model={this.state.loginForm} rules={this.loginFormRules}>
            <Form.Item label="用户名：" prop="name">
              <Input value={this.state.loginForm.name} onChange={this.onChange.bind(this, 'name')} placeholder="用户名" size="small" />
            </Form.Item>
            <Form.Item label="密码：" prop="password">
              <Input value={this.state.loginForm.password} onChange={this.onChange.bind(this, 'password')} placeholder="密码" type="password" size="small" />
            </Form.Item>
            <Form.Item label="验证码：" prop="code">
              <Input value={this.state.loginForm.code} onChange={this.onChange.bind(this, 'code')} className="inline-input" placeholder="验证码" size="small" />
              <img onClick={this.refreshImgUrl.bind(this)} className="verify-img pointer" src={this.state.imgUrl} alt="" />
            </Form.Item>
            <Form.Item className="text-center" labelWidth="0">
              <Button size="small" type="success" onClick={this.doLogin.bind(this)}>登录</Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}




