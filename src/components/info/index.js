import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import connect from 'redux-connect-decorator'
import { Form, Icon, Modal, Input, Button, InputNumber, DatePicker, Select } from 'antd';
import AppLayout from '../../layout';
import { fetchFood } from '../../actions/foodActions'
import { addInfo } from '../../actions/infoActions'
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
};

const { Option } = Select;
@connect((store) => {
  return {
    foodsFetched: store.food.foodsFetched,
    posted: store.info.posted
  };
})
class InfoForm extends React.Component {
  state = {
    visible: false,
    startTime: null,
    endTime: null,
    foods:[]
  };
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
  onChange = (date, dateString)=> {
    console.log(date, dateString);
    this.setState({
        startTime: dateString[0],
        endTime: dateString[1]
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(addInfo(values, this.state.startTime, this.state.endTime))
      }
    });
  };

  componentDidMount(){
    this.props.dispatch(fetchFood())
  }

  UNSAFE_componentWillUpdate(nextProps) {
    if(this.props.foodsFetched !== nextProps.foodsFetched &&
      nextProps.foodsFetched !== undefined)
    {
      this.setState({
        foods: nextProps.foodsFetched,
      });
    }

    if(this.props.posted !== nextProps.posted &&
      nextProps.posted !== undefined)
      {
        this.showModal()
      }

  }

  onReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { foods } = this.state;
    return (
      <AppLayout style={{overflow: "auto"}}>
          <Form {...layout} onSubmit={this.handleSubmit} >
            <Form.Item className="formSection">
              {getFieldDecorator('time', {
                rules: [{ type: 'array', required: true }],
              })(
                <DatePicker.RangePicker
                  onChange={this.onChange}
                  style={{ width: '100%' }}
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder={['Start Time', 'End Time']}
                  />
              )}
            </Form.Item>
            <Form.Item className="formSection">
              {getFieldDecorator('location', {
                rules: [{ required: true, message: 'Please input the location!' }],
              })(
                <Input
                  prefix={<Icon type="pushpin" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Location"
                />,
              )}
            </Form.Item>
            <Form.Item className="formSection">
              {getFieldDecorator('numberOfDucks', {
                rules: [{ required: true, message: 'Please input number of ducks!' }],
              })(
                <InputNumber style={{ width: '100%' }} min={0} placeholder="Number of Ducks"/>
              )}
            </Form.Item>

            <Form.Item className="formSection">
              {getFieldDecorator('foodSelected', {
                rules: [{ required: true, message: 'Please select foods' }],
              })(
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="select foods"
                  optionLabelProp="label"
                >
                {foods.map(d => (
                  <Option
                    key={d.foodId}
                    value={d.foodId}
                    label={d.food +" Calories:"+ d.foodCalories}
                  >
                    {d.food +" Calories:"+ d.foodCalories}
                  </Option>
                ))}
                </Select>
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
            title="Success"
            visible={this.state.visible}
            footer={[
              <Button key="back" onClick={this.handleOk}>
                OK
              </Button>
            ]}
          >
            <p>You have successfully created feeding information</p>
          </Modal>
      </AppLayout>
    );
  }
}

const Info = Form.create({ name: 'infoform' })(InfoForm);
export default Info;
