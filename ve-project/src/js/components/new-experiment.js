import React from 'react';
import { Layout, Menu, Icon, Row, Col, Spin } from 'antd';
import RightSider from './sider';
import MyHeader from './header';
import ExperimentForm from './experiment-form';
const { Header, Content, Footer, Sider } = Layout;

export default class NewExperiment extends React.Component {
  render() {
    const _style = {
      content: {
        padding: '24px',
        background: '#fff',
        minHeight: '280px'
      }
    }
    return (
      <Layout style={{background: '#C9C9C9'}}>
        <Header style={{background: '#001529',height: '140px'}}>
          <MyHeader/>
        </Header>
        <Layout style={{ padding:'10px 50px'}}>
            <Content><Row gutter={16}>
                <Col span={5}><RightSider current={['2']}/></Col>
                <Col span={19} style={_style.content}><ExperimentForm/></Col>
            </Row></Content>
        </Layout>
      </Layout>
    );
  }
}
