import React from 'react';
import { Redirect } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Col, Button, List, Card, Spin } from 'antd';

export default class ExperContent extends React.Component {
  constructor () {
    super();//调用基类所有初始化方法
    this.state = {
      redirectToReferrer: false,
      loading: true,
      content: null,
      components: [],
      list: []
    };
  }
  componentDidMount () {
    const myFetchOptions = {
      method: 'GET'
    };
    if (this.props.experid) {
      fetch("http://localhost:8100/component/detail?id=" + this.props.experid,myFetchOptions)
      .then(res=>res.json().then(json=>{
        console.log(json)
          this.setState({
            content: json.experiment,
            components: json.components,
            loading: false
           })
        }))
    }
  }

  _startBtn () {
    this.setState({redirectToReferrer: true})
  }
  render () {
    const { redirectToReferrer } = this.state;
    const _style = {
      img1: {width: '28px',height: '28px'},
      img2: {
        width: '100px',
        height: '50px',
        textAlign: 'center',
        fontSize:'12px'
      },
      rowmargin: {paddingBottom:'10px'},
      content1: {
        marginbottom: '24px',
        padding: '24px',
        background: '#fff',
        minHeight: '200px'
      },
      content2: {
        margin: '24px 16px',
        padding: '24px',
        background: '#fff',
        minHeight: '280px'
      },
      spin: {position: 'absolute',top: '20px',left: '50%'}
    }
    const path = {pathname:'/workstation'}
    if (redirectToReferrer) {
      return <Redirect push to={path} />;
    }
    if (this.state.loading) {
      return(<Spin  style={_style.spin}/>);
    }
    return(
      <Layout style={{background: '#fff'}}>
        <Row style={_style.content1}>
          <Row style={_style.rowmargin}>
            <Col span={1}></Col>
            <Col span={18}><h2>{this.state.content.name}</h2></Col>
          </Row>
          <Row style={{paddingBottom:'30px'}}>
            <Col span={2} offset={1}>实验简介：</Col>
            <Col span={18}>{this.state.content.introduction}</Col>
          </Row>
          <Row style={{paddingBottom:'30px'}}>
            <Col span={2} offset={1}>实验组件：</Col>
            <Col span={18}>
              <List
                grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
                dataSource={this.state.components}
                renderItem={item => (
                  <List.Item>
                    <div style={_style.img2}>
                    <img alt="example" src={item.images[0]} />
                    <p style={{position:'absolute',bottom:'0',width:'100px'}}>{item.name}</p>
                    </div>
                  </List.Item>
                )}
              />
            </Col>
          </Row>
          <Row style={_style.rowmargin}>
            <Col span={18} offset={1}>
              <Button onClick={this._startBtn.bind(this)} type="primary" icon="play-circle" style={{width:'100px'}}>开始</Button>
            </Col>
          </Row>
        </Row>
        <Row style={_style.content2}>
        <Col>
          <div dangerouslySetInnerHTML={{__html: this.state.content.content}} />
        </Col>
        </Row>
      </Layout>
    );
  }
}
