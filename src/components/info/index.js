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

// connect to store.
@connect((store) => {
  return {
    foodsFetched: store.food.foodsFetched,
    posted: store.info.posted,
    info: store.info.info,
  };
})
// this is the first tab
// it is a form by using Ant Design.
// this tab creates a feeding information object once at a time
// by clicking the submit button.
// shows success popup window when successfully upload the information.
class InfoForm extends React.Component {
  // these are state in the class
  state = {
    visible: false,
    startTime: null,
    endTime: null
  };

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

  // onChange is used for catching the changes for the DatePicker
  // and then pass the date String to start time and end time.
  // the requirements said that we need to have a duriation for
  // the date, so, this DatePicker allows users to select a range of date.
  // and pick time.
  onChange = (date, dateString)=> {
    this.setState({
        startTime: dateString[0],
        endTime: dateString[1]
      });
  }

  // handleSubmit calls the API in the action.
  // pass three parameters to the addInfo method,
  // 1. values in the form,
  // 2. startTime in the dateString
  // 3. endTime in the dateString
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(addInfo(values, this.state.startTime, this.state.endTime))
      }
    });
  };

  // react lifecycle, this is to fetch all the foods in the database,
  // then it can display all food in the selection options.
  componentDidMount(){
    this.props.dispatch(fetchFood())
  }

  // react lifecycle, when finished uploading the information of feeding the ducks,
  // then showModal
  UNSAFE_componentWillReceiveProps(nextProps) {
    if(this.props.info !== nextProps.info &&
      nextProps.info !== undefined)
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
    const { foodsFetched } = this.props;
    return (

      <AppLayout style={{overflow: "auto"}}>
      {/* AppLayout, includes header, navigation bar, content, footer */}
          {/*
            create a form
          */}
          <Form {...layout} onSubmit={this.handleSubmit} >

            {/*
              DatePicker, this is used to pick a date and time,

              meet the requirement:
              Nice to have: the ability for a little old lady who feeds the ducks
              every day in the same way to set a repeating schedule
              so she doesn’t have to use the application every day
            */}
            <Form.Item help="Pick a range to start feeding ducks"
              className="formSection">
              {getFieldDecorator('time', {
                rules: [{
                  type: 'array',
                  required: true,
                  message: 'Please input the Time Period!'
                }],
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

            {/*
              where the ducks are fed
            */}
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

            {/*
              collect how many ducks are fed
            */}
            <Form.Item className="formSection">
              {getFieldDecorator('numberOfDucks', {
                rules: [{ required: true, message: 'Please input number of ducks!' }],
              })(
                <InputNumber style={{ width: '100%' }} min={0} placeholder="Number of Ducks"/>
              )}
            </Form.Item>

            {/*
              select foods that are used to feed the ducks,
              the food already contains how much are fed (calories, or we could understand it as kg)

              foods are being fetched from backend (database), then
              shows all the foods to here.
              users could search by food names.
            */}
            <Form.Item className="formSection">
              {getFieldDecorator('foodSelected', {
                rules: [{ required: true, message: 'Please select foods' }],
              })(
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Select foods"
                  optionFilterProp="label"
                >
                {foodsFetched.map(d => (
                  <Option
                    key={d.foodId}
                    value={d.foodId}
                    label={d.food +", Calories:"+ d.foodCalories}
                  >
                    {d.food +", Calories:"+ d.foodCalories}
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
