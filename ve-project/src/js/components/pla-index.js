import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Layout, Menu, Icon, Row, Col } from 'antd';
import RightSider from './sider';
import MyHeader from './header';
import ExperWaterfall from './exper-waterfall';
const { Header, Content, Footer, Sider } = Layout;

export default class PlaIndex extends React.Component {
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
        <QueueAnim delay={300} className="demo-content">
          <Header style={{background: '#001529',height: '140px'}}>
            <MyHeader/>
          </Header>
          <Layout style={{ padding:'10px 50px'}} className="demo-banner" key="demo1">
              <Content><Row gutter={16}>
                  <Col span={5} style={{height:'320'}}><RightSider current={['1']}/></Col>
                  <Col span={19} style={_style.content}><ExperWaterfall/></Col>
              </Row></Content>
          </Layout>
        </QueueAnim>
      </Layout>
    );
  }
}
