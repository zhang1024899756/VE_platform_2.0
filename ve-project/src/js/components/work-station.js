import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Redirect } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Col, Button, List, Spin, Avatar, Modal } from 'antd';
import JtopoCanvas from './jtopo-canvas';

export default class ExperContent extends React.Component {
  constructor() {
		super();
		this.state = {
      experimentContent: null,
      isShowModal: false,
      componentData: [],
      jtopoNode: null,
      scrolLoading: true,
      redirectToIndex: false,
      redirectToExper: false
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

  _showModal () {
    this.setState({isShowModal: true});
  }

  _exitBtn () {
    this.setState({redirectToExper: true});
  }

  _finishBtn () {
    this.setState({redirectToIndex: true});
  }

  _handleCancel () {this.setState({ isShowModal: false })}

  componentWillMount () {
    if (this.props.location.state) {
      this.setState({experimentContent: this.props.location.state});
    }
    this._fetchComponent((json) => {
      this.setState({
        componentData: json,
        scrolLoading: false
      });
    })
  }
  render () {
    const { redirectToIndex, redirectToExper, experimentContent, isShowModal } = this.state;
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
    const indexPath = {pathname:'/index'};
    const experPath = {pathname:'/experdetails/' + experimentContent._id};
    if (redirectToIndex == true) {
      return <Redirect push to={indexPath} />;
    }
    if (redirectToExper == true) {
      return <Redirect push to={experPath} />;
    }
    return(
      <Layout style={_style.layout}  className="queue-demo">
        <QueueAnim className="demo-content"
          animConfig={[
            { opacity: [1, 0], translateY: [0, 100] },
            { opacity: [1, 0], translateY: [0, -100] }
        ]}>
          <Row style={_style.header}>
              <h1 style={_style.title}>虚拟实验 - {experimentContent.name}</h1>
          </Row>
          <Row gutter={16}>
            <Col span={4}  className="demo-tbody" key="b">
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
            <Col span={16}  className="demo-thead" key="a">
              <JtopoCanvas canvasNode={this.state.jtopoNode}/>
            </Col>
            <Col span={3} style={_style.controBtn.layout}  className="demo-tbody" key="c">
              <Row>
                 <Col><Button onClick={this._showModal.bind(this)} style={_style.controBtn.btn} type="primary" icon="question-circle">实验手册</Button></Col>
                 <Modal
                    title="实验手册"
                    style={{ top: 20 }}
                    width='870'
                    visible={isShowModal}
                    footer={null}
                    onCancel={this._handleCancel.bind(this)}
                  >
                    <div dangerouslySetInnerHTML={{__html: this.state.experimentContent.content}} />
                  </Modal>
              </Row>
              <Row>
                 <Col><Button  onClick={this._finishBtn.bind(this)} style={_style.controBtn.btn} type="primary" icon="check">提交实验</Button></Col>
              </Row>
              <Row>
                 <Col><Button onClick={this._exitBtn.bind(this)} style={_style.controBtn.btn} type="primary" icon="close">退出实验</Button></Col>
              </Row>
            </Col>
          </Row>
        </QueueAnim>
      </Layout>
    );
  }
}
