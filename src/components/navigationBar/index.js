/**
 * Navigation bar component.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Menu, Icon } from 'antd';
import { Link, Redirect, useHistory, withRouter } from "react-router-dom";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  ContactsOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux';

const { SubMenu } = Menu;

class AppNavigationBar extends React.Component {
  state = {
    current: 'mail',
  };

  handleClick = e => {
    console.log('click ', e.key);
    switch (e.key) {
      case "feedInfo":
        this.props.history.push('/')
        break;
      case "food":
        this.props.history.push('/food')
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
        <Menu.Item key="feedInfo">
          <ContactsOutlined />
            Feed Information
        </Menu.Item>
        <Menu.Item key="food">
          <ContactsOutlined />
            Add Foods
        </Menu.Item>

      </Menu>
    );
  }
}


export default withRouter(AppNavigationBar);
