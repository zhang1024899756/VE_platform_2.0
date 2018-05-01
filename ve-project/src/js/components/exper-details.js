import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Layout, Menu, Icon, Row, Col } from 'antd';
import RightSider from './sider';
import MyHeader from './header';
import ExperContent from './exper-content';
const { Header, Content, Footer, Sider } = Layout;

export default class ExperDetails extends React.Component {
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
                <Col span={5}><RightSider current={['1']}/></Col>
                <QueueAnim delay={600} className="demo-content">
                <Col span={19} style={_style.content}>
                  <ExperContent experid={this.props.match.params.id}  className="demo-banner" key="demo1"/>
                </Col>
                </QueueAnim>
            </Row></Content>
        </Layout>
      </Layout>
    );
  }
}
