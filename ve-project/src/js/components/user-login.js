import React from 'react';
import { Icon, Layout, Row, Col, Divider  } from 'antd';
import WrappedLoginForm from './log-form';
const { Header, Content } = Layout;

export default class PlaLogin extends React.Component {
  render() {
    return (
      <Layout className="logbgd">
      <Header className="login_head">
        <h1>欢迎登陆虚拟实验平台</h1>
      </Header>
      <Content>
        <Row>
          <Col span={9}/>
          <Col span={6}>
            <div className="logdiv">
              <WrappedLoginForm/>
            </div>
          </Col>
          <Col span={9}/>
        </Row>
      </Content>
      </Layout>
    );
  }
}
