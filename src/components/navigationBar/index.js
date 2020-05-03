/**
 * Navigation bar component.
 */
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Menu } from 'antd';
import { withRouter } from "react-router-dom";
import {
  ContactsOutlined
} from '@ant-design/icons';

class AppNavigationBar extends React.Component {
  state = {
    current: 'mail',
  };

  handleClick = e => {
    switch (e.key) {
      case "feedInfo":
        this.props.history.push('/info')
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
