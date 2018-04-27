import React from 'react';
import { Layout, Menu, Icon, Row, Col } from 'antd';

export default class MyHeader extends React.Component {

  render() {
    const _style = {
      header: {height: '140px',background:'#001529',marginBottom:'10px'},
      title: {color: '#fff',textAlign: 'center',marginTop: '30px'}
    }
    return (
      <Row style={_style.header}>
          <h1 style={_style.title}>虚拟实验平台</h1>
      </Row>
    );
  }
}
