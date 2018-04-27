import React from 'react';
import { Avatar, Dropdown, Menu } from 'antd';

export default class UserEntry extends React.Component {
  constructor() {
		super();
		this.state = {
			userid: 0
		};
  };
  render() {
    const menu = (
      <Menu>
        <Menu.Item key="0">
          用户中心
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">切换用户</Menu.Item>
      </Menu>
    );
    return (
      <div className="userentry">
        <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" href="#">
            <Avatar style={{ backgroundColor: '#87d068'}} icon="user" size="large"/>
          </a>
        </Dropdown>

      </div>
    );
  }
}
