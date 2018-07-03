import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Table, Button, Loading } from 'element-react';
import Title from './Title';
import { connect } from 'react-redux';
import { getOtaList } from '@/store/Home/action';
import PropTypes from 'prop-types';

class Home extends Component {
  static propTypes = {
    otaData: PropTypes.object.isRequired,
    getOtaList: PropTypes.func.isRequired
  }

  state = {
    loading: false,
    tableColumns: [
      {
        label: 'otaId',
        prop: 'otaId'
      },
      {
        label: 'name',
        prop: 'name'
      },
      {
        label: 'isOpen',
        prop: 'status',
        render(data) {
          return (
            <span>{data.status == 3 ? '开通' : '未开通'}</span>
          )
        }
      }
    ]
  };

  componentDidMount() {
    if (!this.props.otaData.dataList.length) {
      this.getOtaInfo();
    }
  }

  toListPage() {
    console.log(hashHistory)
    hashHistory.push({
      pathname: '/list',
      query: {
        a: 1
      }
    });
  }

  getOtaInfo() {
    this.setState({
      loading: true
    })
    this.props.getOtaList().then(res => {
      console.log(res);
      console.log(this.props)
      this.setState({
        loading: false
      });
    })
  }

  render() {
    return (
      <div>
        {
          this.state.loading && <Loading fullscreen={true} />
        }
        <Title title="主页" />
        <Button icon="loading" type="info" onClick={this.getOtaInfo} size="small">刷新</Button>
        <Button type="success" size="small" onClick={this.toListPage}>
          去往列表&nbsp;
          <i className="el-icon-arrow-right el-icon-right"></i>
        </Button>
        <br />
        <br />
        <Table
          style={{ width: '100%' }}
          columns={this.state.tableColumns}
          data={this.props.otaData.dataList}
          border={true} />

      </div>
    );
  }
}

export default connect(state => ({
  otaData: state.otaData
}), {
    getOtaList
  })(Home);
