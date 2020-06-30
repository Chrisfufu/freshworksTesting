import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import connect from 'redux-connect-decorator'
import { Form, Icon, Modal, Input, Button, DatePicker } from 'antd';
import AppLayout from '../../layout';
import { addInfo } from '../../actions/infoActions';
import {
  UserOutlined,
  FileTextOutlined
} from '@ant-design/icons';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
};
// connect to store.
@connect((store) => {
  return {
    error: store.info.error,
    info: store.info.info,
  };
})

// this is the second tab
// it is a form by using Ant Design.
// this tab creates a food object once at a time by clicking the submit button.
// shows success popup window when successfully upload the food.
class AddInfo extends React.Component {
  formRef = React.createRef();
  // these are state in the class
  state = { visible: false };

  // use: it is used for open the popup window.
  // in ant design, Modal is the term for popup window.
  // visible state is the state to control turn on or turn off the popup window
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  // customize the ok button when the Modal opens
  // after turn off the Modal, it calls onReset method.
  // it is a callback method for setState.
  // onReset will clear the form
  handleOk = e => {
    this.setState({
        visible: false,
      },()=>{ this.onReset() }
    );
  };

  // handleSubmit calls the API in the action.
  // pass three parameters to the addFood method,
  // it only pass all the values to the method
  handleSubmit = values  => {
    this.props.dispatch(addInfo(values))
  };

  // react lifecycle, when finished uploading the information of feeding the ducks,
  // then showModal
  UNSAFE_componentWillReceiveProps(nextProps) {
    if(this.props.info !== nextProps.info &&
      nextProps.info !== undefined && 
      nextProps.info.length !== 0
      )
    {
      this.showModal()
    }
  }

  // this method is used for reset the form.
  onReset = () => {
    this.formRef.current.resetFields();
  };

  render() {
    console.log(this.props);
    return (
      <AppLayout style={{overflow: "auto"}}>
        <br></br>
        {/* create a form */}
        <Form {...layout} ref={this.formRef} onFinish={this.handleSubmit} >

          {/* form item, this is the food name */}
          <Form.Item className="formSection" name="name" rules={[{ required: true }]}>
            <Input 
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }}/>}
              placeholder="Name"
            />
          </Form.Item>

          <Form.Item className="formSection" name="description" rules={[{ required: true }]}>
            <Input 
              prefix={<FileTextOutlined style={{ color: 'rgba(0,0,0,.25)' }}/>}
              placeholder="description"
            />
          </Form.Item>

          <Form.Item name="expiryTime" className="formSection" rules={[{ required: true }]}>
            <DatePicker  />
          </Form.Item>

          {/*
            these are buttons to submit the answers or reset the form
          */}
          <Form.Item
            style={{
              display: 'flex',
              justifyContent:'center',
              alignItems:'center'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent:'center',
                alignItems:'center'
              }}
              >
              <Button type="primary" htmlType="submit" >
                Submit
              </Button>

              <Button type="primary" htmlType="button" onClick={this.onReset}>
                Reset
              </Button>
            </div>

          </Form.Item>
        </Form>

        {/*
          this is the popup window: Modal
        */}
        <Modal
          title="Success"
          visible={this.state.visible}
          footer={[
            <Button key="back" onClick={this.handleOk}>
              OK
            </Button>
          ]}
        >
          <p>You have successfully created a key information</p>
        </Modal>
      </AppLayout>
    );
  }
}

export default AddInfo;
