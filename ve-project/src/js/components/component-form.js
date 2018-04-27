import React from 'react';
import { Form, Input, Col, Button, Select, message  } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import ComponePictures from './comp-pictur';


class CompForm extends React.Component {
  constructor () {
    super();//调用基类所有初始化方法
    this.state = {
      attrlist: [],
      imageIdList: []
    };
  }
  componentDidMount () {
    const myFetchOptions = {
      method: 'GET',
      mode : 'cors',
    };
    fetch("http://localhost:8100/attribute/list",myFetchOptions)
      .then(res=>res.json().then(json=>{
        console.log('返回值:', json);
        for (var i = 0; i < json.length;i++) {
          this.state.attrlist.push(<Option key={json[i]._id.toString()}>{json[i].callname}</Option>)
        }
      }))
  }

  _handleChildValueChange (fileIdList) {
    this.setState({ imageIdList: fileIdList })
    console.log('fileIdList:', fileIdList);
  }

  _handleReset () {
    this.props.form.resetFields();
  }

  _handleSubmit (e) {
    e.preventDefault();//原生的阻止冒泡
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          id:values.componentId,
          name:values.componentName,
          describe:values.componentDescribe,
          attribute:values.componentAttr,
          images:this.state.imageIdList
        }
        const myFetchOptions = {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          mode : 'cors',
          body: JSON.stringify(data)
        };
        if (this.state.imageIdList.length >= 1 ) {
          fetch("http://localhost:8100/component/new",myFetchOptions)
            .then((res) => {
              if (res.ok) {
                 message.success('提交成功！');
              }else {
                 message.error('提交失败！');
              }
            })
        } else {
          message.warning('组件需要实体图像！');
        }
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
        sm: { span: 8 }
      }
    };
    const richEditerLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
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
          {getFieldDecorator('componentId')(
            <Input type="hidden" />
          )}
        </FormItem>
        <FormItem label="组件名称" {...formItemLayout}>
          {getFieldDecorator('componentName', {
            rules: [{ required: true, message: '必填字段！' }],
          })(
            <Input placeholder="name" />
          )}
        </FormItem>
        <FormItem label="组件描述" {...formItemLayout}>
          {getFieldDecorator('componentDescribe', {
            rules: [{ required: true, message: '必填字段！' }],
          })(
            <Input placeholder="describe" />
          )}
        </FormItem>
        <FormItem label="组件属性" {...richEditerLayout}>
          {getFieldDecorator('componentAttr', {
            rules: [{ required: true, message: '必填字段！' }],
          })(
            <Select mode="multiple" placeholder="请请为组件添加必要属性...">
              {this.state.attrlist}
            </Select>
          )}
        </FormItem>
        <FormItem label="组件图片" {...formItemLayout}>
          <ComponePictures handleChildValueChange={this._handleChildValueChange.bind(this)}/>
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{ width: 100 }}>提交</Button>
          <Button onClick={this._handleReset.bind(this)} style={{ marginLeft: 8 }}>重置</Button>
        </FormItem>
      </Form>
    );
  }
}

const ComponentForm = Form.create()(CompForm);
export default ComponentForm
