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

@connect((store) => {
  return {
    error: store.food.error,
    food: store.food.foods,
  };
})
class FoodForm extends React.Component {
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
        visible: false,
      },()=>{ this.onReset() }
    );

  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // this.props.dispatch(login(values))
        console.log(values);
        this.props.dispatch(addFood(values))
      }
    });
  };

  componentWillReceiveProps(nextProps) {
    if(this.props.food !== nextProps.food &&
      nextProps.food !== undefined)
    {
      this.showModal()
    }

  }

  onReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <AppLayout style={{overflow: "auto"}}>
          <Form {...layout} onSubmit={this.handleSubmit} >
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
            <Form.Item
              className="buttonCenter"
              wrapperCol={{ ...layout.wrapperCol, offset: 4 }}
            >
              <Button type="primary" htmlType="submit" >
                Submit
              </Button>

              <Button type="primary" htmlType="button" onClick={this.onReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            footer={[
              <Button key="back" onClick={this.handleOk}>
                OK
              </Button>
            ]}
          >
            <p>You have created a food</p>
          </Modal>
      </AppLayout>
    );
  }
}

const Food = Form.create({ name: 'foodform' })(FoodForm);
export default Food;
