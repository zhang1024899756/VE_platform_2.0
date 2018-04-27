import React from 'react';
import { Redirect } from 'react-router-dom';
import { message, Form, Icon, Input, Button, Checkbox, Select } from 'antd';

const FormItem = Form.Item;

class LoginForm extends React.Component {
  constructor () {
    super();//调用基类所有初始化方法
    this.state = {
      redirectToReferrer: false,
      identity: null,
      userId: null
    };
  }
  _handleSubmit (e) {
    e.preventDefault();//原生的阻止冒泡
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('表单接收到的值:', values);
        let myFetchOptions = {
          method: 'GET'
        };
        fetch("http://localhost:8100/user/signin?userName="+values.userName+"&password="+values.password+"&identity="+values.identity,myFetchOptions)
          .then(response=>response.json().then(json=>{
            console.log('返回值:', json);
            if (values.identity == "admin"&&json.key == "ok") {
              this.props.form.resetFields();
              this.setState({
                redirectToReferrer: true,
                identity: "admin",
                userId: json.userId
              });
            }if (values.identity == "teacher") {

            }if (values.identity == "student") {

            }if (json.key == "-1") {
              this.props.form.resetFields();
              message.error('用户名或密码错误！');
            }
          }))
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { redirectToReferrer } = this.state;
    const data = {userId: this.state.userId,identity:this.state.identity}
    const path = {
      pathname:'/index',
      state: data
    }
    if (redirectToReferrer) {
      return <Redirect push to={path} />;
    }
    return (
      <Form onSubmit={this._handleSubmit.bind(this)} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入你的用户名' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="学号/用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入你的密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('identity', {
            rules: [{ required: true, message: '请确认你的身份' }],
          })(
            <Select
              showSearch
              placeholder="选择一个身份..."
              optionFilterProp="children"
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                <Select.Option value="student">学生</Select.Option>
                <Select.Option value="teacher">教师</Select.Option>
                <Select.Option value="admin">管理员</Select.Option>
            </Select>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住密码</Checkbox>
          )}
          <a className="login-form-forgot" href="">忘记密码？</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登陆
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);
export default WrappedLoginForm
