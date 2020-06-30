/**
 * Navigation bar component.
 */
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Menu } from 'antd';
import { withRouter } from "react-router-dom";
import {
  UserAddOutlined,
  BarsOutlined,
  ReloadOutlined
} from '@ant-design/icons';

class AppNavigationBar extends React.Component {
  state = {
    current: '',
  };

  handleClick = e => {
    switch (e.key) {
      case "info":
        this.props.history.push('/')
        break;
      case "addInfo":
        this.props.history.push('/addInfo')
        break;
      case "refreshInfo":
        this.props.history.push('/refreshInfo')
        break;
      default:
        this.props.history.push('/')
        break;
    }
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <Menu onClick={this.handleClick} mode="horizontal">
        <Menu.Item key="info">
          <BarsOutlined />
            Keys Information
        </Menu.Item>
        <Menu.Item key="addInfo">
          <UserAddOutlined />
            Add Keys
        </Menu.Item>
        <Menu.Item key="refreshInfo">
          <ReloadOutlined />
            Refresh Keys
        </Menu.Item>
      </Menu>
    );
  }
}


export default withRouter(AppNavigationBar);
