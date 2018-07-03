import React from 'react';
import { connect } from 'react-redux';
import { stockTypes } from '@/store/StockType/action';
import { stockList } from '@/store/Stock/action';
import { hashHistory } from 'react-router';
import './list.less';

import { Select, Input, Button, Table, Pagination, Tag, Message, MessageBox } from 'element-react';

@connect(
  state => ({
    stockTypeData: state.stockTypeData,
    userData: state.userData
  }),
  {
    stockTypes,
    stockList,
  }
)
export default class StockList extends React.Component {

  state = {
    searchInfo: {
      token: this.props.userData.userInfo.token,
      page: 1,
      limit: 15,
      keyword: '',
      typeId: '',
      status: 0
    },
    pageCount: 1,
    stockTypes: [],
    stockList: [],
    tableColumns: [
      {
        label: '库存名称',
        render: (row) => {
          return (
            <div className="text-cut2">{row.stockName}</div>
          );
        }
      },
      {
        label: '类别',
        render: (row) => {
          return (
            <span>{this.stockTypeFilter(row.typeId)}</span>
          )
        }
      },
      {
        label: '状态',
        render(row, column, idx) {
          return (
            <Tag type={row.status == 1 ? 'success' : 'warning'}>
              {row.status == 1 ? '正常' : '删除或或冻结'}
            </Tag>
          );
        }
      },
      {
        label: '数量',
        prop: 'stock'
      },
      {
        label: '图片',
        render: (row, column, idx) => {
          return (
            <div
              className="coverImg stock-image"
              style={{ 'backgroundImage': `url(${row.url})` }}></div>
          )
        }
      },
      {
        label: '创建时间',
        prop: 'createTime'
      },
      {
        label: '操作',
        width: '180',
        render: (row, column, idx) => {
          return (
            <div>
              <Button onClick={this.editStock.bind(this, row)} size="mini" type="success"><span className="font-12">编辑</span></Button>
              <Button onClick={this.stockDetail.bind(this, row)} size="mini" type="info"><span className="font-12">详情</span></Button>
              <Button onClick={this.onlineOrOffline.bind(this, row)} size="mini" type="danger"><span className="font-12">下架</span></Button>
            </div>
          )
        }
      }
    ]
  }

  editStock(data) {
    console.log('editStock', data)
  }

  stockDetail(data) {
    hashHistory.push(`/stock/detail/${data.stockId}`);
  }

  onlineOrOffline(data) {
    console.log('onlineOrOffline', data)
  }

  componentWillMount() {
    this.props.stockTypes().then(res => {
      this.doSearch();
    })
  }

  componentDidMount() {
    // console.log('>>>', this.props.stockTypeReducer)
  }

  pageChange(n) {
    this.state.searchInfo.page = n;
    this.doSearch();
  }

  doSearch() {
    this.props.stockList({
      ...this.state.searchInfo
    }).then(res => {
      this.setState({
        stockList: res.data,
        searchInfo: {
          ...this.state.searchInfo
        },
        pageCount: 1 * res.totalPage
      })
    })
  }

  stockTypeFilter(id) {
    let filterRes = this.props.stockTypeData.stockType.filter(v => {
      return v.stockTypeId = id
    })[0] || {};
    return filterRes.stockTypeName;
  }

  onChange(key, val) {
    this.setState({
      searchInfo: {
        ...this.state.searchInfo,
        [key]: val
      }
    })
  }

  render() {
    return (
      <div>
        <header>
          <Select className="marginR-5" clearable={true} size="small" value={this.state.searchInfo.typeId} onChange={this.onChange.bind(this, 'typeId')}>
            {
              this.props.stockTypeData.stockType.map(el => {
                return <Select.Option key={el.stockTypeId} label={el.stockTypeName} value={el.stockTypeId} />
              })
            }
          </Select>
          <Select className="marginR-5" size="small" value={this.state.searchInfo.status} onChange={this.onChange.bind(this, 'status')}>
            <Select.Option label="全部" value={0}></Select.Option>
            <Select.Option label="上架" value={1}></Select.Option>
            <Select.Option label="下架" value={2}></Select.Option>
          </Select>
          <Input className="marginR-5" size="small" placeholder="请输入内容" value={this.state.searchInfo.keyword} onChange={this.onChange.bind(this, 'keyword')} />
          <Button size="small" type="primary" onClick={this.doSearch.bind(this)}>搜索</Button>
        </header>
        <section>
          <Table
            style={{ width: '100%' }}
            columns={this.state.tableColumns}
            data={this.state.stockList}
            border={true}
          />
          <Pagination className="app-pagination" layout=" prev, pager, next,jumper" onCurrentChange={this.pageChange.bind(this)} pageCount={this.state.pageCount} currentPage={this.state.searchInfo.page} />
        </section>
      </div>
    )
  }
}
