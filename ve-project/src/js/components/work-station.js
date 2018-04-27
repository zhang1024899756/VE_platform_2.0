import React from 'react';
import { Layout, Menu, Icon, Row, Col, Button, List, Spin, Avatar } from 'antd';
import JtopoCanvas from './jtopo-canvas';

export default class ExperContent extends React.Component {
  constructor() {
		super();
		this.state = {
      componentData: [],
      jtopoNode: null,
      scrolLoading: true
		};
  };

  _fetchComponent (callback) {
    const myFetchOptions = {
      method: 'GET',
      mode : 'cors',
    };
    fetch("http://localhost:8100/component/list",myFetchOptions)
      .then(res=>res.json().then(json=>{
        console.log(json)
        callback(json);
      }))
  }

  _addNode (item) {
    this.setState({jtopoNode: item});
  }

  componentWillMount () {
    this._fetchComponent((json) => {
      this.setState({
        componentData: json,
        scrolLoading: false
      });
    })
  }
  render () {
    const _style = {
      spin: {position: 'absolute',bottom: '-30px',left: '42%'},
      header: {height: '140px',background:'#001529',marginBottom:'10px'},
      title: {color: '#fff',textAlign: 'center',marginTop: '30px'},
      list: {
        hideWrap: {width: '200px',height: '480px',margin: '10px',overflow: 'hidden'},
        modal: {width: '218px',height: '100%',padding: '10px',overflow: 'auto'},
        item: {borderRadius: '5px',background: '#001529',marginBottom: '5px',color: '#fff',cursor: 'pointer'}
      },
      controBtn: {
        layout: {padding: '10px'},
        btn: {marginBottom: '20px',width: '120px',background:'#001529',border:'none'}
      },
      layout: {background: '#fff'}
    }
    return(
      <Layout style={_style.layout}>
        <Row style={_style.header}>
            <h1 style={_style.title}>虚拟实验平台</h1>
        </Row>
        <Row gutter={16}>
          <Col span={4}>
            <div style={_style.list.hideWrap}>
              <div style={_style.list.modal}>
                    <List
                      size="small" split={false}
                      dataSource={this.state.componentData}
                      renderItem={item => (<List.Item onClick={this._addNode.bind(this,item)} style={_style.list.item}><div style={{width:'100%',textAlign:'center'}}>{item.name}</div></List.Item>)}
                    >
                      {this.state.scrolLoading && <Spin style={_style.spin}/>}
                    </List>
              </div>
            </div>
          </Col>
          <Col span={16}>
            <JtopoCanvas canvasNode={this.state.jtopoNode}/>
          </Col>
          <Col span={3} style={_style.controBtn.layout}>
            <Row>
               <Col><Button style={_style.controBtn.btn} type="primary" icon="bars">组件列表</Button></Col>
            </Row>
            <Row>
               <Col><Button style={_style.controBtn.btn} type="primary" icon="question-circle">实验手册</Button></Col>
            </Row>
            <Row>
               <Col><Button style={_style.controBtn.btn} type="primary" icon="check">提交实验</Button></Col>
            </Row>
            <Row>
               <Col><Button style={_style.controBtn.btn} type="primary" icon="close">退出实验</Button></Col>
            </Row>
          </Col>
        </Row>
      </Layout>
    );
  }
}
