import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

export default class SiderMenu extends React.Component {
  render() {
    return (
      <div>
        <Menu mode="inline" theme="light" defaultSelectedKeys={this.props.current}>
        <Menu.Item key="1">
          <Link to='/index'><Icon type="home" /><span>首页</span></Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to='/experimentnew'><Icon type="form" /><span>实验录入</span></Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to='/componentnew'><Icon type="tool" /><span>组件录入</span></Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to='/attributenew'><Icon type="credit-card" /><span>组件属性录入</span></Link>
        </Menu.Item>
        </Menu>
      </div>
    );
  }
}
