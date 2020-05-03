import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import connect from 'redux-connect-decorator'
import { Form, Icon, Modal, Input, Button } from 'antd';
import AppLayout from '../../layout';
import { addFood } from '../../actions/foodActions'
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
    error: store.food.error,
    food: store.food.foods,
  };
})

// this is the second tab
// it is a form by using Ant Design.
// this tab creates a food object once at a time by clicking the submit button.
// shows success popup window when successfully upload the food.
class FoodForm extends React.Component {
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
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(addFood(values))
      }
    });
  };

  // react lifecycle, when finished uploading the information of feeding the ducks,
  // then showModal
  UNSAFE_componentWillReceiveProps(nextProps) {
    if(this.props.food !== nextProps.food &&
      nextProps.food !== undefined)
    {
      this.showModal()
    }

  }

  // this method is used for reset the form.
  onReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <AppLayout style={{overflow: "auto"}}>
        {/* create a form */}
        <Form {...layout} onSubmit={this.handleSubmit} >

          {/* form item, this is the food name */}
          <Form.Item className="formSection">
            {getFieldDecorator('food', {
              rules: [{ required: true, message: 'Please input the food name!' }],
            })(
              <Input
                prefix={<Icon type="apple" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Food Name"
              />,
            )}
          </Form.Item>

          {/*
            get the food type from users
          */}
          <Form.Item className="formSection">
            {getFieldDecorator('foodType', {
              rules: [{ required: true, message: 'Please input food type!' }],
            })(
              <Input
                prefix={<Icon type="tags" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="foodType"
                placeholder="Food Type"
              />,
            )}
          </Form.Item>

          {/*
            get How much food the ducks are fed
            it has to be a number/float
          */}
          <Form.Item className="formSection">
            {getFieldDecorator('foodCalories', {
              rules: [
                {
                  required: true,
                  message: 'Please input food calories!'
                },
                {
                  type: 'number',
                  Message: 'Please enter a number/float',
                  transform:(value)=> {return Number(value)}
                },
              ],
            })(
              <Input
                prefix={<Icon type="calculator" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="foodCalories"
                placeholder="Food Calories"
              />,
            )}
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
          <p>You have successfully created a food</p>
        </Modal>
      </AppLayout>
    );
  }
}

const Food = Form.create({ name: 'foodform' })(FoodForm);
export default Food;
