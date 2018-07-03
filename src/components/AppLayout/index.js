import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'element-react';
import './index.less';
import { getUserInfo } from '@/store/User/action';
import { hashHistory } from 'react-router';

@connect(state => ({}), { getUserInfo })
export default class AppLayout extends React.Component {
  state = {
    menuList: [
      {
        title: '用户管理',
        icon: '',
        active: false,
        sub: [
          {
            title: '用户列表',
            active: false,
            path: '/user/list'
          },
          {
            title: '创建用户',
            active: false,
            path: '/user/create'
          }
        ]
      },
      {
        title: '部门管理',
        icon: '',
        active: false,
        sub: [
          {
            title: '部门列表',
            active: false,
            path: '/department/list'
          },
          {
            title: '部门创建',
            active: false,
            path: '/department/create'
          }
        ]
      },
      {
        title: '库存管理',
        icon: '',
        active: false,
        sub: [
          {
            title: '库存列表',
            active: false,
            path: '/stock/list'
          },
          {
            title: '库存添加',
            active: false,
            path: '/stock/create'
          }
        ]
      },
      {
        title: '库存类别管理',
        icon: '',
        active: false,
        sub: [
          {
            title: '库存类别列表',
            active: false,
            path: '/stock-type/list'
          },
          {
            title: '添加库存类别',
            active: false,
            path: '/stock-type/create'
          }
        ]
      },
      {
        title: '领用历史管理',
        icon: '',
        active: false,
        sub: [
          {
            title: '领用历史',
            active: false,
            path: '/history'
          }
        ]
      },
      {
        title: '管理员',
        icon: '',
        active: false,
        sub: [
          {
            title: '我的信息',
            active: false,
            path: '/admin/index'
          },
          {
            title: '创建管理员',
            active: false,
            path: '/admin/create'
          },
          {
            title: '退出登录',
            active: false,
            path: '/admin/loginout'
          }
        ]
      }
    ],
    defaultActive: '1'
  }
  onOpen(a) {
    // console.log('open', a)
  }

  onClose(a) {
    // console.log('close', a)

  }


  componentWillMount() {
    this.props.getUserInfo();
  }

  toPath(path) {
    this.setState({
      defaultActive: path
    })
    hashHistory.push(path);
  }

  render() {
    return (
      <div className="app-flex app-flex-full">
        <div className="app-nav">
          <Menu defaultActive={this.state.defaultActive} className="app-nav-menu-box" onSelect={this.toPath.bind(this)} onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)} theme="dark">
            {
              this.state.menuList.map((menu, index) => {
                return <Menu.SubMenu key={index} index={`${index}`} title={menu.title}>
                  {menu.sub.map((sub, subIdx) => {
                    return <Menu.Item key={subIdx} index={sub.path}>{sub.title}</Menu.Item>
                  })
                  }
                </Menu.SubMenu>
              })
            }
          </Menu>
        </div>
        <div className="col-1 app-body">
          <div>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

