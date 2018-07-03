import React from 'react';
import { connect } from 'react-redux';
import { getStockDetail } from '@/store/Stock/action';

import { Layout, Tag } from 'element-react';
import './list.less';

@connect(
  state => ({
    stockData: state.stockData,
    userData: state.userData
  }),
  {
    getStockDetail,
  }
)
export default class StockDetail extends React.Component {

  state = {
    stockData: {}
  };

  componentWillMount() {
    this.props.getStockDetail({
      token: this.props.userData.userInfo.token,
      stockId: this.props.params.id
    }).then(res => {

    });
  }

  render() {
    return (
      <div className="detail-box">
        <Layout.Row gutter="20">
          <Layout.Col span="4">
            库存名称
          </Layout.Col>
          <Layout.Col span="20">
            {this.props.stockData.stockDetail.stockName}
          </Layout.Col>
        </Layout.Row>
        <Layout.Row gutter="20" className="marginT-10">
          <Layout.Col span="4">
            库存描述
          </Layout.Col>
          <Layout.Col span="20">
            {this.props.stockData.stockDetail.stockDescrib}
          </Layout.Col>
        </Layout.Row>
        <Layout.Row gutter="20" className="marginT-10">
          <Layout.Col span="4">
            库存类型
          </Layout.Col>
          <Layout.Col span="20">
            {this.props.stockData.stockDetail.typeName}
          </Layout.Col>
        </Layout.Row>
        <Layout.Row gutter="20" className="marginT-10">
          <Layout.Col span="4">
            库存数量
          </Layout.Col>
          <Layout.Col span="20">
            {this.props.stockData.stockDetail.stock}
          </Layout.Col>
        </Layout.Row>
        <Layout.Row gutter="20" className="marginT-10">
          <Layout.Col span="4">
            图片
          </Layout.Col>
          <Layout.Col span="20">
            <div className="stock-inner-list">
              {
                this.props.stockData.stockDetail.imgList && this.props.stockData.stockDetail.imgList.map((v, idx) => {
                  return (
                    <div
                      key={idx}
                      className="coverImg stock-image"
                      style={{ 'backgroundImage': `url(${v.url})` }}></div>
                  );
                })
              }
            </div>
          </Layout.Col>
        </Layout.Row>
        <Layout.Row gutter="20" className="marginT-10">
          <Layout.Col span="4">
            状态
          </Layout.Col>
          <Layout.Col span="20">
            <Tag type={this.props.stockData.stockDetail.status == 1 ? 'success' : 'warning'}>
              {this.props.stockData.stockDetail.status == 1 ? '正常' : '删除或或冻结'}
            </Tag>
          </Layout.Col>
        </Layout.Row>
      </div>
    )
  }
}
