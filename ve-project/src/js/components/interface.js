import React from 'react';
import { Icon, Form, Input, Col, Button } from 'antd';
import { TitleBar } from 'react-desktop/windows';
const InputGroup = Input.Group;
const FormItem = Form.Item;


class InterProtocolForm extends React.Component {
  constructor () {
    super();
    this.state = {
      internent:null
    };
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    const formItemLayout = {
      labelCol: {xs: { span: 24 },sm: { span: 6 }},
      wrapperCol: {xs: { span: 24 },sm: {span: 14,offset: 4}}
    };
    const formBtnLayout = {
      wrapperCol: {xs: { span: 24 },sm: {span: 8,offset: 14}}
    }
    return(
      <Form>
        <FormItem label="IP 地址" {...formItemLayout}>
          {getFieldDecorator('ipAddress',{rules: [{ pattern: reg}]})(
            <InputGroup size="small" compact>
              <Input style={{width:'40px',marginTop:'10px'}}/>
              <Input style={{width:'40px',marginTop:'10px'}}/>
              <Input style={{width:'40px',marginTop:'10px'}}/>
              <Input style={{width:'40px',marginTop:'10px'}}/>
            </InputGroup>
          )}
        </FormItem>
        <FormItem label="子网掩码" {...formItemLayout}>
          {getFieldDecorator('subnetMask',{rules: [{ pattern: reg}]})(
            <InputGroup size="small" compact>
              <Input style={{width:'40px',marginTop:'10px'}}/>
              <Input style={{width:'40px',marginTop:'10px'}}/>
              <Input style={{width:'40px',marginTop:'10px'}}/>
              <Input style={{width:'40px',marginTop:'10px'}}/>
            </InputGroup>
          )}
        </FormItem>
        <FormItem label="默认网关" {...formItemLayout}>
          {getFieldDecorator('defaultGateway',{rules: [{ pattern: reg}]})(
            <InputGroup size="small" compact>
              <Input style={{width:'40px',marginTop:'10px'}}/>
              <Input style={{width:'40px',marginTop:'10px'}}/>
              <Input style={{width:'40px',marginTop:'10px'}}/>
              <Input style={{width:'40px',marginTop:'10px'}}/>
            </InputGroup>
          )}
        </FormItem>
        <FormItem {...formBtnLayout}>
          <Button type="primary" htmlType="submit" style={{ width: 100 }}>确认</Button>
        </FormItem>
      </Form>
    );
  }
}
const IpForm = Form.create()(InterProtocolForm);

class CmdWindow extends React.Component {
  constructor() {
    super();
    this.state = {
      output:[],
      top: 80,
      left: 150,
      relativeX: null,
      relativeY: null,
      isDragging: false
    }
  };
  _keyEvent (e) {
    const _style = {
      input: {width:'300px',height:'20px',border:'none',outline:'none',background:'#282828',color:'white'}
    }
    if (e.which == 13) {
      let i = this.state.output.length - 1;
      if (e.target.value == "ipconfig") {
        this.state.output.splice(i,1);
        this.state.output.push(<div key={i.toString()} style={{color:'white'}}>
        <label style={{marginRight:'10px'}}>管理员@/:</label>
        <span>{e.target.value}</span></div>);
        this.state.output.push(
          <div key={(i + 1).toString()} style={{color:'white',fontSize:'10px'}}>
            <label>windows IP 配置</label><br/>
            <label>以太网适配器  本地连接：··········： </label><br/>
            <label>连接特定的DNS后缀：··············：  </label><br/>
            <label>本地连接IPv6地址：···············：  </label><br/>
            <label>IPv4地址：······················：'127.0.0.1'</label><br/>
            <label>子网掩码：·······················：  </label><br/>
            <label>默认网关：·························：</label><br/>
          </div>
        );
        this.state.output.push(<div key={(i + 2).toString()} style={{color:'white'}}><label style={{marginRight:'10px'}}>管理员@/:</label>
          <input onKeyPress={this._keyEvent.bind(this)} style={_style.input}/></div>);
      } else {
        this.state.output.splice(i,1);
        this.state.output.push(<div key={i.toString()} style={{color:'white'}}>
        <label style={{marginRight:'10px'}}>管理员@/:</label>
        <span>{e.target.value}</span></div>);
        this.state.output.push(
          <div key={(i + 1).toString()} style={{color:'white',fontSize:'10px'}}>
            不是内部或外部命令，也不是可运行的程序或批处理文件。
          </div>
        );
        this.state.output.push(<div key={(i + 2).toString()} style={{color:'white'}}><label style={{marginRight:'10px'}}>管理员@/:</label>
          <input onKeyPress={this._keyEvent.bind(this)} style={_style.input}/></div>);
      }
    }
  }

  componentDidMount () {
    const _style = {
      input: {width:'200px',height:'20px',border:'none',outline:'none',background:'#282828',color:'white'}
    }
    myTitleBar.onmousedown = (e) => {
      this.setState({
         relativeX: e.pageX - this.state.left,
         relativeY: e.pageY - this.state.top,
         isDragging:true
     });
    }
    myTitleBar.onmousemove = (e) => {
      if(this.state.isDragging === true){
          const moveX = e.pageX - this.state.relativeX;
          const moveY = e.pageY - this.state.relativeY;
          if ((moveX >= 10 && moveY >= 10) && (moveX <= 400 && moveY <= 200)) {
            this.setState({left: moveX,top: moveY});
          } else {
            this.setState({isDragging:false});
          }

      }else{
          return false;
      }
    }
    myTitleBar.onmouseup = (e) => {
      e.preventDefault();
      this.setState({
          isDragging:false,
          clientx:null,
          clienty:null
      });
    }
    myTitleBar.onmouseleave = () => {
      this.setState({isDragging:false});
    }
    this.state.output.push(
      <div key="0" style={{color:'white'}}><label style={{marginRight:'10px'}}>管理员@/:</label>
      <input onKeyPress={this._keyEvent.bind(this)} style={_style.input}/></div>
    )
  }

  render () {
    const _style = {
      pannel: {position:'absolute',left:this.state.left,top:this.state.top},
      myWindow: {width:'500px',height:'300px',border:'1px solid #fff',background:'#282828',overflow:'auto'},
      titlebar: {background:'#282828',position:'absolute',top:'0'}
    }
    return(
      <div style={_style.pannel}>
        <div style={_style.myWindow}>
          <TitleBar id="myTitleBar" background={'white'} theme={'light'} title="管理员:命令提示符" controls/>
          <div style={{padding:'10px'}}>{this.state.output}</div>
        </div>
      </div>
    );
  }
}

class InterWindow extends React.Component {
  constructor() {
    super();
    this.state = {
      isConnect:false,
      top: 80,
      left: 150,
      relativeX: null,
      relativeY: null,
      isDragging: false
    }
  };
  _openIpWin () {
    this.props.childOpenIp()
  }

  componentDidMount () {
    myTitleBar.onmousedown = (e) => {
      this.setState({
         relativeX: e.pageX - this.state.left,
         relativeY: e.pageY - this.state.top,
         isDragging:true
     });
    }
    myTitleBar.onmousemove = (e) => {
      if(this.state.isDragging === true){
          const moveX = e.pageX - this.state.relativeX;
          const moveY = e.pageY - this.state.relativeY;
          if ((moveX >= 10 && moveY >= 10) && (moveX <= 400 && moveY <= 200)) {
            this.setState({left: moveX,top: moveY});
          } else {
            this.setState({isDragging:false});
          }

      }else{
          return false;
      }
    }
    myTitleBar.onmouseup = (e) => {
      e.preventDefault();
      this.setState({
          isDragging:false,
          clientx:null,
          clienty:null
      });
    }
    myTitleBar.onmouseleave = () => {
      this.setState({isDragging:false});
    }
  }

  render () {
    const _style = {
      pannel: {position:'absolute',left:this.state.left,top:this.state.top},
      myWindow: {width:'500px',height:'300px',border:'1px solid #fff',background:'white',overflow:'auto',},
      titlebar: {background:'#282828',position:'absolute',top:'0'}
    }
    return(
      <div style={_style.pannel}>
        <div style={_style.myWindow}>
          <TitleBar id="myTitleBar" background={'white'} theme={'light'} title="网络连接" controls/>
          <img src="../src/img/windows_tool_0001.png" />
          <div style={{padding:'10px'}}>
          {this.state.isConnect ? <img src="../src/img/wlan_internent_00001_select.png" onDoubleClick={this._openIpWin.bind(this)} /> : <img src="../src/img/wlan_internent_0001_off.png" onDoubleClick={this._openIpWin.bind(this)} />}
          </div>
        </div>
      </div>
    );
  }
}

class IpWindow extends React.Component {
  constructor() {
    super();
    this.state = {
      top: 20,
      left: 350,
      relativeX: null,
      relativeY: null,
      isDragging: false
    }
  };

  componentDidMount () {
    myTitleBar.onmousedown = (e) => {
      this.setState({
         relativeX: e.pageX - this.state.left,
         relativeY: e.pageY - this.state.top,
         isDragging:true
     });
    }
    myTitleBar.onmousemove = (e) => {
      if(this.state.isDragging === true){
          const moveX = e.pageX - this.state.relativeX;
          const moveY = e.pageY - this.state.relativeY;
          if ((moveX >= 10 && moveY >= 10) && (moveX <= 400 && moveY <= 200)) {
            this.setState({left: moveX,top: moveY});
          } else {
            this.setState({isDragging:false});
          }

      }else{
          return false;
      }
    }
    myTitleBar.onmouseup = (e) => {
      e.preventDefault();
      this.setState({
          isDragging:false,
          clientx:null,
          clienty:null
      });
    }
    myTitleBar.onmouseleave = () => {
      this.setState({isDragging:false});
    }
  }

  render () {
    const _style = {
      pannel: {position:'absolute',left:this.state.left,top:this.state.top},
      myWindow: {width:'300px',height:'380px',border:'1px solid #fff',background:'white',overflow:'auto',},
      titlebar: {background:'#282828',position:'absolute',top:'0'}
    }
    return(
      <div style={_style.pannel}>
        <div style={_style.myWindow}>
          <TitleBar id="myTitleBar" background={'white'} theme={'light'} title="Internent（TCP/IPv4）属性" controls/>
          <div style={{padding:'10px'}}>
            <p>由于基于浏览器的简洁windows模拟系统，不具有自动指派IP功能，你需要自行适当的IP设置。</p>
            <IpForm />
          </div>
        </div>
      </div>
    );
  }
}


export default class Interface extends React.Component {
  constructor() {
    super();
    this.state = {
      tollbarList: [],
      isConnect: false,
      isHover: false,
      isCmdWindow: false,
      isInterWindow: false,
      isIpWindow: false,
      nowtTime: null
    }
  };

  _toggleHover () {
    this.setState({isHover: !this.state.isHover})
  }
  _childOpenIp () {
    this.setState({
      isCmdWindow: false,
      isInterWindow: false,
      isIpWindow: true
    })
  }

  componentWillMount () {
    this.interval = setInterval(() => {
        let time = new Date().getHours() + ':' + new Date().getMinutes();
        this.setState({nowtTime: time});
    },1000);
  }
  componentDidMount () {
    const canvas = document.getElementById('win-canvas');
    const stage = new JTopo.Stage(canvas);
    const scene = new JTopo.Scene(stage);
    scene.setBackground('../src/img/win10bianpinghuabizhi_hd.jpg');

    const recycle = new JTopo.Node("回收站");
    recycle.setImage('../src/img/imageres_55.ico', false);
    recycle.setLocation(20, 30);
    scene.add(recycle);

    const computer = new JTopo.Node("网络");
    computer.setImage('../src/img/imageres_25.ico', false);
    computer.setLocation(20, 30+72);
    scene.add(computer);
    computer.addEventListener('dbclick',() => {
      this.setState({isCmdWindow: false,
      isInterWindow: true,
      isIpWindow: false})
    })

    const adminrun = new JTopo.Node("命令符");
    adminrun.setImage('../src/img/imageres_5324.ico', false);
    adminrun.setLocation(20, 30+72*2);
    scene.add(adminrun);
    adminrun.addEventListener('dbclick',() => {
      this.setState({isCmdWindow: true,
      isInterWindow: false,
      isIpWindow: false})
    })
  }
  componentWillUnmount() {
      clearInterval(this.interval);
  }
  render () {
    const _style = {
      interface: {width:'900px',height:'500px',border: '1px solid #444',overflow:'hidden'},
      toolbar:{width:'899px',height:'30px',background:'#282828',position:'absolute',bottom:'0'},
      starBtn: {width:'34px',height:'30px',float:'left',marginRight:'10px',background: this.state.isHover ? '#5B5B5B' : '#282828'},
      toolUl: {float:'left',height:'30px',listStyle:'none',display:'inline'},
      toolR: {height:'30px',float:'right',marginRight:'10px',lineHeight:'30px',color:'#fff',fontSize:'12px'}
    }
    return(
      <div style={_style.interface}>
        <canvas id="win-canvas" width="900" height="470"></canvas>
          {this.state.isCmdWindow && <CmdWindow />}
          {this.state.isInterWindow && <InterWindow childOpenIp={this._childOpenIp.bind(this)} />}
          {this.state.isIpWindow && <IpWindow />}
        <div style={_style.toolbar}>
          <div style={_style.starBtn} onMouseEnter={this._toggleHover.bind(this)} onMouseLeave={this._toggleHover.bind(this)}>
            <Icon type="windows" style={{color: '#fff',margin:'8px 10px'}}/>
          </div>
          <ul style={_style.toolUl}>{this.state.tollbarList}</ul>
          <div style={_style.toolR}>{this.state.nowtTime}</div>
          <div style={_style.toolR}><img src={ this.state.isConnect ? '../src/img/imageres_6200.ico' : '../src/img/imageres_6202.ico'} height="15" width="15" style={{marginTop:'7px'}}/></div>
        </div>
      </div>
    );
  }
}
