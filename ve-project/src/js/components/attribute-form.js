import React from 'react';
import { Form, Input, Col, Button, Select, message  } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
//import Attributelimiter from './attr-limiter';


class AttrForm extends React.Component {

  _handleReset () {
    this.props.form.resetFields();
  }

  _handleSubmit (e) {
    e.preventDefault();//原生的阻止冒泡
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('表单接收到的值:', values);
        const data = {id:values.attrId,name:values.attrName,callname:values.attrCall,value:values.attrValue}
        const myFetchOptions = {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          mode : 'cors',
          body: JSON.stringify(data)
        };
        fetch("http://localhost:8100/attribute/new",myFetchOptions)
          .then((res) => {
            if (res.ok) {
               message.success('提交成功！');
            }else {
               message.error('提交失败！');
            }
          })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    return (
      <Form onSubmit={this._handleSubmit.bind(this)}>
        <FormItem {...formItemLayout}>
          {getFieldDecorator('attrId')(<Input type='hidden' />)}
        </FormItem>
        <FormItem label="属性名称" {...formItemLayout}>
          {getFieldDecorator('attrName', {
            rules: [{ required: true, message: '必填字段！' }],
          })(
            <Input placeholder="name" />
          )}
        </FormItem>
        <FormItem label="属性称呼" {...formItemLayout}>
          {getFieldDecorator('attrCall', {
            rules: [{ required: true, message: '必填字段！' }],
          })(
            <Input placeholder="你怎么称呼他？" />
          )}
        </FormItem>
        <FormItem label="属性值" {...formItemLayout}>
          {getFieldDecorator('attrValue', {
            rules: [{ required: true, message: '必填字段！' }],
          })(
            <Input placeholder="value" />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{ width: 100 }}>提交</Button>
          <Button onClick={this._handleReset.bind(this)} style={{ marginLeft: 8 }}>重置</Button>
        </FormItem>
      </Form>
    );
  }
}

const AttributeForm = Form.create()(AttrForm);
export default AttributeForm
