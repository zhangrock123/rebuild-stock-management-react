import React, { Component } from 'react';
import { hashHistory } from 'react-router'
import service from '@/service';
import { Table, Loading, Collapse, Button } from 'element-react';
import Title from './Title';


export default class List extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: false,
      roomTypeList: {},
      tableColumns: [
        {
          label: '本地房型',
          prop: 'omsRoomTypeName'
        },
        {
          label: '绑定房型',
          prop: 'otaRoomTypeName'
        },
      ]
    };
    this.toListPage = this.toListPage.bind(this);
    this.getRoomTypeList = this.getRoomTypeList.bind(this);
  }

  componentDidMount() {
    this.getRoomTypeList();
  }

  getRoomTypeList() {
    this.setState({
      loading: true,
      roomTypeList: {}
    });
    service.getRoomTypeList({
      from: '2018-06-20',
      to: '2018-07-09',
      token: 'eyJzY29wZSI6InF0ZXNfangBAba0YnVja2V0IiwiZGVhZGxpbmUiOjE1MDIzMzcyNTF9',
      authVendor: 'FangBaBa',
      supplierId: '1',
      pmsInnId: '75835',
      innId: '75835',
      pmsId: '58b67153e4b018c3d23c877a'
    }).then(res => {
      this.setState({
        loading: false,
        roomTypeList: res.data.list
      })
    })
  }

  toListPage() {
    console.log(hashHistory)
    hashHistory.go(-1);
  }

  render() {
    const activeName = '';
    return (
      <div>
        {
          this.state.loading && <Loading fullscreen={true} />
        }
        <Title title="主页" subTitle="列表页" />
        <Button icon="loading" type="info" onClick={this.getRoomTypeList} size="small">刷新</Button>
        <Button icon="information" type="success" size="small" onClick={this.toListPage}>返回主页</Button>
        <br />
        <br />

        <CollapseTableBox
          activeName={activeName}
          data={this.state.roomTypeList}
          tableColumns={this.state.tableColumns} />
      </div>
    );
  }
}

const CollapseTableBox = (props) => {
  return (
    <Collapse accordion value={props.activeName}>
      {
        Object.keys(props.data).map((key, $idx) =>
          <Collapse.Item key={$idx} title={props.data[key].omsRoomTypeName} name={`${$idx}`}>
            <Table
              style={{ width: '100%' }}
              columns={props.tableColumns}
              data={props.data[key][5]}
              border={true} />
          </Collapse.Item>
        )
      }
    </Collapse>
  )
}
