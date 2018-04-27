import React from 'react';
import { Layout } from 'antd';
const { Sider } = Layout;
import SiderMenu from './pla-menu';

export default class RightSider extends React.Component {
  render() {
    const _style = {
      lyout: {background: '#fff'}
    };
    return (
        <Sider style={_style.lyout}>
          <SiderMenu {...this.props}></SiderMenu>
        </Sider>
    );
  }
}
