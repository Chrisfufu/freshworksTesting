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
      case "contact":
        this.props.history.push('/contacts')
        break;
      default:
        this.props.history.push('/contacts')
        break;
    }
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <Menu onClick={this.handleClick} mode="horizontal">
        <Menu.Item key="contact">
          <ContactsOutlined />
            Contacts
        </Menu.Item>

      </Menu>
    );
  }
}


export default withRouter(AppNavigationBar);
