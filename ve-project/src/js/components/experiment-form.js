import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import ReactUmeditor from './react-umeditor';

class ExperForm extends React.Component {
  constructor () {
    super();//调用基类所有初始化方法
    this.state = {
      compolist: [],
      content: ""
    };
  }
  componentDidMount () {
    const myFetchOptions = {
      method: 'GET',
      mode : 'cors',
    };
    fetch("http://localhost:8100/component/list",myFetchOptions)
      .then(res=>res.json().then(json=>{
        for (var i = 0; i < json.length;i++) {
          this.state.compolist.push(<Option key={json[i]._id.toString()}>{json[i].name}</Option>)
        }
      }))
  }

  _handleChildValueChange (content) {
    this.setState({ content: content })
  }

  _handleReset () {
    this.props.form.resetFields();
  }

  _handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          id:values.experimentId,
          name:values.experimentName,
          introduction:values.experimentIntrod,
          components:values.experimentCompo,
          content:this.state.content
        }
        const myFetchOptions = {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          mode : 'cors',
          body: JSON.stringify(data)
        };
        console.log(data)
        if (this.state.content !== "") {
          fetch("http://localhost:8100/experiment/new",myFetchOptions)
            .then((res) => {
              if (res.ok) {
                 message.success('提交成功！');
              }else {
                 message.error('提交失败！');
              }
            })
        } else {
          message.warning('请为实验添加内容-_-!');
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      }
    };
    const submitLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: {
          span: 8,
          offset: 3
        }
      }
    };
    const richEditerLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };
    const tailFormItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };
    return (
      <div>
        <Form onSubmit={this._handleSubmit.bind(this)}>
          <FormItem {...formItemLayout}>
            {getFieldDecorator('experimentId')(
              <Input type="hidden" />
            )}
          </FormItem>
          <FormItem label="实验名称" {...formItemLayout}>
            {getFieldDecorator('experimentName', {
              rules: [{ required: true, message: '必填字段！' }],
            })(
              <Input placeholder="name" />
            )}
          </FormItem>
          <FormItem label="实验简介" {...formItemLayout}>
          {getFieldDecorator('experimentIntrod', {
            rules: [{ required: true, message: '必填字段！' }],
          })(
            <Input placeholder="introduction" />
          )}
          </FormItem>
          <FormItem label="组件" {...tailFormItemLayout}>
            {getFieldDecorator('experimentCompo', {
              rules: [{ required: true, message: '必填字段！' }],
            })(
              <Select mode="multiple" placeholder="请添加实验的必要的组件...">
                {this.state.compolist}
              </Select>
            )}
          </FormItem>
          <FormItem {...submitLayout}>
            <Button type="primary" htmlType="submit" style={{ width: 100 }}>提交</Button>
            <Button onClick={this._handleReset.bind(this)} style={{ marginLeft: 8 }}>重置</Button>
          </FormItem>
        </Form>
        <div style={{ marginBottom: 100 }}>
          <ReactUmeditor handleChildValueChange={this._handleChildValueChange.bind(this)} {...richEditerLayout}/>
        </div>
      </div>
    );
  }
}

const ExperimentForm = Form.create()(ExperForm);
export default ExperimentForm
