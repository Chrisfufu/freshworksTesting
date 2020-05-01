
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Link, Redirect } from "react-router-dom";
import connect from 'redux-connect-decorator'
import { Form, Icon, Input, Button, Checkbox, Table } from 'antd';
import AppLayout from '../../layout';

@connect((store) => {
  return {

  };
})
class Home extends React.Component {
  state = {
  };

  componentDidMount(){
  }

  render() {
    return (
      <AppLayout style={{overflow: "auto"}} className="layout">
        <div>
          Home
        </div>
      </AppLayout>
    );
  }
}


export default Home;
