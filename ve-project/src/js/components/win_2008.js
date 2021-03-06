import React from 'react';
import { TitleBar } from 'react-desktop/windows';

// LuyouProcess子活动
class SetLuyouProcess extends React.Component {
  constructor() {
    super();
    this.state = {
      currentImg: null,
      img: null,
      index: 0,
      luyoulist: null,
      showForm: false
    }
  }
  componentWillMount () {
    const xiangdao = [
        {src:'../src/img/win2008/luyou_1.png',next:{left:'166',bottom:'344',width:'70',height:'20'},retur:{left:'696',bottom:'529',width:'20px',height:'20px'}},
        {src:'../src/img/win2008/new_luyou0.png',next:{left:'196',bottom:'325',width:'160',height:'24'},retur:{left:'698',bottom:'529',width:'20px',height:'20px'}},
        {src:'../src/img/win2008/new_luyou1.png',next:{left:'376',bottom:'388',width:'120',height:'20'},retur:{left:'504',bottom:'196',width:'75',height:'22'}},
      ]
    this.setState({img: xiangdao});
    this.setState({currentImg: xiangdao[0]});
    this.setState({luyoulist: this.props.luyoulist});
  }
  _returnBtn () {
    if (this.state.index == 0) {

    } else {
      this.setState({showForm: false});
      const index = parseInt(this.state.index - 1);
      this.setState({currentImg: this.state.img[index]});
      this.setState({index: index});
    }
  }
  _nextBtn () {
    if (this.state.index == 2) {
      this.setState({showForm: true});
    } else {
      const index = parseInt(this.state.index + 1);
      this.setState({currentImg: this.state.img[index]});
      this.setState({index: index});
    }
  }
  _listBtn () {
    //this.setState({currentImg: this.state.img[index]});
  }
  _submitBtn () {
    const target = document.getElementById('target').children;
    const networkmask = document.getElementById('networkmask').children;
    const gateway = document.getElementById('gateway').children;
    const jumppoints = document.getElementById('jumppoints').children[0];
    const luyouData = {target:[],networkmask:[],gateway:[],jumppoints:jumppoints.value};
    for (var i = 0; i < target.length; i++) {
      if (target[i].value !== "") {
        luyouData.target.push(target[i].value);
      } else {
        luyouData.target.push("0");
      }
    }
    for (var i = 0; i < networkmask.length; i++) {
      if (networkmask[i].value !== "") {
        luyouData.networkmask.push(networkmask[i].value);
      } else {
        luyouData.networkmask.push("0");
      }
    }
    for (var i = 0; i < gateway.length; i++) {
      if (gateway[i].value !== "") {
        luyouData.gateway.push(gateway[i].value);
      } else {
        luyouData.gateway.push("0");
      }
    }
    this.props.changestate(luyouData);
  }
  render () {
    const { showForm, index } = this.state;
    const _style = {
      ipform: {width:'24',height:'15',border:'none',marginRight:'6'},
      interface: {width:'800px',height:'600px',overflow:'hidden',margin:'0 auto'},
      retur: {
        position:'absolute',
        left: this.state.currentImg.retur.left || '54',
        bottom: this.state.currentImg.retur.bottom || '0',
        width: this.state.currentImg.retur.width || '50px',
        height: this.state.currentImg.retur.height || '40px',
        cursor:'pointer'
      },
      next: {
        position:'absolute',
        left: this.state.currentImg.next.left || '310',
        bottom: this.state.currentImg.next.bottom || '180',
        width: this.state.currentImg.next.width || '150',
        height: this.state.currentImg.next.height || '35',
        cursor:'pointer'
      },
      list: {position:'absolute',left:'196',bottom:'300',width:'160',height:'24',cursor:'pointer'},
      submit: {position:'absolute',left:'424',bottom:'196',width:'75',height:'22',cursor:'pointer'},
    }
    const form = (
      <div style={{position:'absolute',left:'380',top:'195'}}>
            <div id='target' style={{marginBottom:'12'}}>
              <input style={_style.ipform} maxLength={3}/>
              <input style={_style.ipform} maxLength={3}/>
              <input style={_style.ipform} maxLength={3}/>
              <input style={_style.ipform} maxLength={3}/>
            </div>

            <div id='networkmask' style={{marginBottom:'12'}}>
              <input style={_style.ipform} maxLength={3}/>
              <input style={_style.ipform} maxLength={3}/>
              <input style={_style.ipform} maxLength={3}/>
              <input style={_style.ipform} maxLength={3}/>
            </div>

            <div id='gateway' style={{marginBottom:'12'}}>
              <input style={_style.ipform} maxLength={3}/>
              <input style={_style.ipform} maxLength={3}/>
              <input style={_style.ipform} maxLength={3}/>
              <input style={_style.ipform} maxLength={3}/>
            </div>
            <div id='jumppoints' style={{marginBottom:'12'}}><input style={{width:'55',height:'15',border:'none'}} type="number" min="0" max="256" /></div>
      </div>
    );
    return(
      <div style={_style.interface}>
        <img src={this.state.currentImg.src} />
        <div onClick={this._returnBtn.bind(this)} style={_style.retur}></div>
        {!showForm && <div onClick={this._nextBtn.bind(this)} style={_style.next}></div>}
        { index == 1 && <div onClick={this._listBtn.bind(this)} style={_style.list}></div>}
        {showForm && <div>{form}</div>}
        {showForm && <div onClick={this._submitBtn.bind(this)} style={_style.submit}></div>}
      </div>
    );
  }
}

// ManageToolProcess子活动
class LuyouProcess extends React.Component {
  constructor() {
    super();
    this.state = {
      currentImg: null,
      img: null,
      index: 0,
      isServer: false
    }
  }
  componentWillMount () {
    const luyou = [
        {src:'../src/img/win2008/luyou_0.png',next:{left:'160',bottom:'428',width:'160px',height:'20px'},retur:{left:'748',bottom:'532',width:'20px',height:'20px'}},
        {src:'../src/img/win2008/luyou_xiangdao0.png',next:{left:'220',bottom:'416',width:'200px',height:'22px'},retur:{left:'746',bottom:'532',width:'20px',height:'20px'}},
        {src:'../src/img/win2008/luyou_xiangdao1.png',next:{left:'530',bottom:'150',width:'75px',height:'22px'},retur:{left:'615',bottom:'150',width:'75px',height:'22px'}},
        {src:'../src/img/win2008/luyou_xiangdao2.png',next:{left:'245',bottom:'237',width:'15px',height:'15px'},retur:{left:'615',bottom:'150',width:'75px',height:'22px'}},
        {src:'../src/img/win2008/luyou_xiangdao3.png',next:{left:'493',bottom:'148',width:'75px',height:'22px'},retur:{left:'578',bottom:'148',width:'75px',height:'22px'}},
        {src:'../src/img/win2008/luyou_xiangdao4.png',next:{left:'249',bottom:'298',width:'15px',height:'15px'},retur:{left:'615',bottom:'150',width:'75px',height:'22px'}},
        {src:'../src/img/win2008/luyou_xiangdao5.png',next:{left:'493',bottom:'148',width:'75px',height:'22px'},retur:{left:'578',bottom:'148',width:'75px',height:'22px'}},
        {src:'../src/img/win2008/luyou_xiangdao6.png',next:{left:'530',bottom:'150',width:'75px',height:'22px'},retur:{left:'615',bottom:'150',width:'75px',height:'22px'}},
        {src:'../src/img/win2008/luyou_xiangdao7.png',next:{left:'450',bottom:'268',width:'75px',height:'22px'},retur:{left:'535',bottom:'268',width:'75px',height:'22px'}}
      ]
    this.setState({img: luyou});
    if (this.props.luyouserver) {
      this.setState({isServer: true});
    } else {
      this.setState({currentImg: luyou[0]});
    }
  }
  _returnBtn () {
    if (this.state.index == 0) {

    } else {
      const index = parseInt(this.state.index - 1);
      this.setState({currentImg: this.state.img[index]});
      this.setState({index: index});
    }
  }
  _nextBtn () {
    if (this.state.index == 8) {
      this.setState({isServer: true});
      this.props.changestate(this.state.isServer);
    } else {
      const index = parseInt(this.state.index + 1);
      this.setState({currentImg: this.state.img[index]});
      this.setState({index: index});
    }
  }
  _changestate (luyouData) {
    this.props.changeluyoustate(luyouData);
  }
  render () {
    const { isTool, componentProcess, isServer } = this.state;
    const _style = {
      interface: {width:'800px',height:'600px',overflow:'hidden',margin:'0 auto'},
      btn: {
        position:'absolute',
        left: this.state.currentImg.retur.left || '54',
        bottom: this.state.currentImg.retur.bottom || '0',
        width: this.state.currentImg.retur.width || '50px',
        height: this.state.currentImg.retur.height || '40px',
        cursor:'pointer'
      },
      btn1: {
        position:'absolute',
        left: this.state.currentImg.next.left || '310',
        bottom: this.state.currentImg.next.bottom || '180',
        width: this.state.currentImg.next.width || '150',
        height: this.state.currentImg.next.height || '35',
        cursor:'pointer'
      },
    }
    if (isServer) {
      return(<SetLuyouProcess {...this.props} changestate={this._changestate.bind(this)}  />);
    }
    return(
      <div style={_style.interface}>
        <img src={this.state.currentImg.src} />
        <div onClick={this._returnBtn.bind(this)} style={_style.btn}></div>
        <div onClick={this._nextBtn.bind(this)} style={_style.btn1}></div>
      </div>
    );
  }
}

// ManageToolProcess子活动
class ComponentProcess extends React.Component {
  constructor() {
    super();
    this.state = {
      currentImg: null,
      img: null,
      index: 0,
      isScusese: false,
    }
  }
  componentWillMount () {
    const xiangdao = [
        {src:'../src/img/win2008/fuwuqiguanliqi.png',next:{left:'590',bottom:'365',width:'80px',height:'20px'},retur:{left:'810',bottom:'575',width:'20px',height:'20px'}},
        {src:'../src/img/win2008/xiangdao1.png',next:{left:'545',bottom:'45',width:'80px',height:'20px'},retur:{left:'800',bottom:'580',width:'20px',height:'20px'}},
        {src:'../src/img/win2008/xiangdao2.png',next:{left:'268',bottom:'230',width:'15px',height:'15px'},retur:{left:'460',bottom:'45',width:'80px',height:'20px'}},
        {src:'../src/img/win2008/xiangdao3.png',next:{left:'545',bottom:'45',width:'80px',height:'20px'},retur:{left:'460',bottom:'45',width:'80px',height:'20px'}},
        {src:'../src/img/win2008/xiangdao4.png',next:{left:'287',bottom:'422',width:'15px',height:'15px'},retur:{left:'460',bottom:'45',width:'80px',height:'20px'}},
        {src:'../src/img/win2008/xiangdao5.png',next:{left:'545',bottom:'45',width:'80px',height:'20px'},retur:{left:'460',bottom:'45',width:'80px',height:'20px'}},
        {src:'../src/img/win2008/xiangdao6.png',next:{left:'630',bottom:'45',width:'80px',height:'20px'},retur:{left:'810',bottom:'575',width:'20px',height:'20px'}}
      ]
    this.setState({img: xiangdao});
    this.setState({currentImg: xiangdao[0]});
  }
  _returnBtn () {
    if (this.state.index == 0) {

    } else {
      const index = parseInt(this.state.index - 1);
      this.setState({currentImg: this.state.img[index]});
      this.setState({index: index});
    }
  }
  _nextBtn () {
    if (this.state.index == 6) {
      this.setState({isScusese: true});
      this.props.changestate(this.state.isScusese)
    } else {
      const index = parseInt(this.state.index + 1);
      this.setState({currentImg: this.state.img[index]});
      this.setState({index: index});
    }
  }
  render () {
    const { isTool, componentProcess } = this.state;
    const _style = {
      interface: {width:'800px',height:'600px',overflow:'hidden',margin:'0 auto'},
      btn: {
        position:'absolute',
        left: this.state.currentImg.retur.left || '150',
        bottom: this.state.currentImg.retur.bottom || '180',
        width: this.state.currentImg.retur.width || '50px',
        height: this.state.currentImg.retur.height || '40px',
        cursor:'pointer'
      },
      btn1: {
        position:'absolute',
        left: this.state.currentImg.next.left || '300',
        bottom: this.state.currentImg.next.bottom || '180',
        width: this.state.currentImg.next.width || '150',
        height: this.state.currentImg.next.height || '35',
        cursor:'pointer'
      },
    }
    return(
      <div style={_style.interface}>
        <img src={this.state.currentImg.src}/>
        <div onClick={this._returnBtn.bind(this)} style={_style.btn}></div>
        <div onClick={this._nextBtn.bind(this)} style={_style.btn1}></div>
      </div>
    );
  }
}

// Windows2008子活动
class ManageToolProcess extends React.Component {
  constructor() {
    super();
    this.state = {
      currentImg: null,
      img: null,
      isTool: false,
      isLuyou: false,
      componentProcess: false,
      luyouProcess: false
    }
  }
  componentWillMount () {
    const imgObject = {
      startpanel: {src:'../src/img/win2008/starmianban.png'},
      manangetool: {src:'../src/img/win2008/guanligongju.png'},
      manangetool2: {src:'../src/img/win2008/guanligongju_2.png'}
    }
    this.setState({img: imgObject});
    this.setState({currentImg: imgObject.startpanel});
  }
  _returnBtn () {
    this.props.changestate({})
  }
  _toolBtn () {
    if (this.props.isLuyou) {
      this.setState({currentImg: this.state.img.manangetool2});
      this.setState({isLuyou: true});
    } else {
      this.setState({currentImg: this.state.img.manangetool});
      this.setState({isTool: true});
    }
  }
  _componentBtn () {
    this.setState({componentProcess: true});
  }
  _luyouBtn () {
    this.setState({luyouProcess: true});
  }
  _changestate1 (arg) {
    if (arg) {
      this.props.changestate({component:true})
    }
  }
  _changestate2 (arg) {
    if (arg) {
      this.props.changestate({luyouserver:true})
    }
  }
  _changeluyoustate (luyouData) {
    this.props.changeluyoustate(luyouData)
  }
  render () {
    const { isTool, isLuyou, componentProcess, luyouProcess } = this.state;
    const _style = {
      interface: {width:'800px',height:'600px',overflow:'hidden',margin:'0 auto'},
      btn: {position:'absolute',left:'34',bottom:'0',width:'50px',height:'40px',cursor:'pointer'},
      btn1: {position:'absolute',left:'290',bottom:'180',width:'140',height:'35',cursor:'pointer'},
      btn2: {position:'absolute',left:'435',bottom:'355',width:'205',height:'25',cursor:'pointer'},
      btn3: {position:'absolute',left:'435',bottom:'142',width:'205',height:'25',cursor:'pointer'},
    }
    if (componentProcess == true) {
      return(<ComponentProcess changestate={this._changestate1.bind(this)} />);
    }
    if (luyouProcess == true) {
      return(<LuyouProcess
        {...this.props}
        changestate={this._changestate2.bind(this)}
        changeluyoustate={this._changeluyoustate.bind(this)}
      />);
    }
    return(
      <div style={_style.interface}>
        <img src={this.state.currentImg.src} />
        <div onClick={this._returnBtn.bind(this)} style={_style.btn}></div>
        <div onClick={this._toolBtn.bind(this)} style={_style.btn1}></div>
        { isTool && <div onClick={this._componentBtn.bind(this)} style={_style.btn2}></div>}
        { isLuyou && <div onClick={this._luyouBtn.bind(this)} style={_style.btn3}></div>}
      </div>
    );
  }
}


class SetIpProcess extends React.Component {
  constructor() {
    super();
    this.state = {
      currentImg: null,
      img: null,
      index: 0,
      isScusese: false,
      showForm: false
    }
  }
  componentWillMount () {
    const xiangdao = [
        {src:'../src/img/win2008/internent_0.png',next:{left:'684',bottom:'21',width:'150',height:'20'},retur:{left:'34',bottom:'40',width:'790',height:'550'}},
        {src:'../src/img/win2008/internent_1.png',next:{left:'60',bottom:'480',width:'102',height:'20'},retur:{left:'813',bottom:'580',width:'20px',height:'20px'}},
        {src:'../src/img/win2008/internent_2.png',next:{left:'42',bottom:'451',width:'250',height:'60'},retur:{left:'813',bottom:'580',width:'20px',height:'20px'}},
        {src:'../src/img/win2008/internent_3.png',next:{left:'274',bottom:'147',width:'85',height:'20'},retur:{left:'593',bottom:'484',width:'20px',height:'20px'}},
        {src:'../src/img/win2008/internent_4.png',next:{left:'314',bottom:'253',width:'208',height:'20'},retur:{left:'610',bottom:'472',width:'20px',height:'20px'}},
        {src:'../src/img/win2008/internent_5.png',next:{left:'327',bottom:'313',width:'15',height:'15'},retur:{left:'676',bottom:'444',width:'20px',height:'20px'}},
        {src:'../src/img/win2008/internent_6.png',next:{left:'504',bottom:'290',width:'126',height:'20'},retur:{left:'615',bottom:'58',width:'78',height:'20px'}}
      ]
    this.setState({img: xiangdao});
    this.setState({currentImg: xiangdao[0]});
  }
  _returnBtn () {
    if (this.state.index == 0) {
      this.props.setIpData({});
    } else {
      this.setState({showForm: false});
      const index = parseInt(this.state.index - 1);
      this.setState({currentImg: this.state.img[index]});
      this.setState({index: index});
    }
  }
  _nextBtn () {
    if (this.state.index == 6) {
      this.setState({showForm: true});
    } else {
      const index = parseInt(this.state.index + 1);
      this.setState({currentImg: this.state.img[index]});
      this.setState({index: index});
    }
  }
  _submitBtn () {
    const ip = document.getElementById('ip').children;
    const networkmask = document.getElementById('networkmask').children;
    const gateway = document.getElementById('gateway').children;
    const firstnds = document.getElementById('firstnds').children;
    const seconddns = document.getElementById('seconddns').children;
    const ipData = {ip:[],networkmask:[],gateway:[],firstnds:[],seconddns:[]};
    for (var i = 0; i < ip.length; i++) {
      if (ip[i].value !== "") {
        ipData.ip.push(ip[i].value);
      } else {
        ipData.ip.push("0");
      }
    }
    for (var i = 0; i < networkmask.length; i++) {
      if (networkmask[i].value !== "") {
        ipData.networkmask.push(networkmask[i].value);
      } else {
        ipData.networkmask.push("0");
      }
    }
    for (var i = 0; i < gateway.length; i++) {
      if (gateway[i].value !== "") {
        ipData.gateway.push(gateway[i].value);
      } else {
        ipData.gateway.push("0");
      }
    }
    for (var i = 0; i < firstnds.length; i++) {
      if (firstnds[i].value !== "") {
        ipData.firstnds.push(firstnds[i].value);
      } else {
        ipData.firstnds.push("0");
      }
    }
    for (var i = 0; i < seconddns.length; i++) {
      if (seconddns[i].value !== "") {
        ipData.seconddns.push(seconddns[i].value);
      } else {
        ipData.seconddns.push("0");
      }
    }
    this.props.setIpData({ipData:ipData});
  }
  render () {
    const { showForm } = this.state;
    const _style = {
      ipform: {width:'23',height:'14',border:'none',marginRight:'8'},
      interface: {width:'800px',height:'600px',overflow:'hidden',margin:'0 auto'},
      retur: {
        position:'absolute',
        left: this.state.currentImg.retur.left || '54',
        bottom: this.state.currentImg.retur.bottom || '0',
        width: this.state.currentImg.retur.width || '50px',
        height: this.state.currentImg.retur.height || '40px',
        cursor:'pointer'
      },
      next: {
        position:'absolute',
        left: this.state.currentImg.next.left || '310',
        bottom: this.state.currentImg.next.bottom || '180',
        width: this.state.currentImg.next.width || '150',
        height: this.state.currentImg.next.height || '35',
        cursor:'pointer'
      },
      submit: {position:'absolute',left:'533',bottom:'58',width:'78',height:'20',cursor:'pointer'},
    }
    const form = (
      <div style={{position:'absolute',left:'511',top:'292'}}>
            <div id='ip' style={{marginBottom:'10'}}>
              <input style={_style.ipform} maxLength={3}/>
              <input style={_style.ipform} maxLength={3}/>
              <input style={_style.ipform} maxLength={3}/>
              <input style={_style.ipform} maxLength={3}/>
            </div>

            <div id='networkmask' style={{marginBottom:'10'}}>
              <input style={_style.ipform} maxLength={3}/>
              <input style={_style.ipform} maxLength={3}/>
              <input style={_style.ipform} maxLength={3}/>
              <input style={_style.ipform} maxLength={3}/>
            </div>

            <div id='gateway' style={{marginBottom:'63'}}>
              <input style={_style.ipform} maxLength={3}/>
              <input style={_style.ipform} maxLength={3}/>
              <input style={_style.ipform} maxLength={3}/>
              <input style={_style.ipform} maxLength={3}/>
            </div>
            <div id='firstnds' style={{marginBottom:'10'}}>
              <input style={_style.ipform} maxLength={3}/>
              <input style={_style.ipform} maxLength={3}/>
              <input style={_style.ipform} maxLength={3}/>
              <input style={_style.ipform} maxLength={3}/>
            </div>

            <div id='seconddns' style={{marginBottom:'10'}}>
              <input style={_style.ipform} maxLength={3}/>
              <input style={_style.ipform} maxLength={3}/>
              <input style={_style.ipform} maxLength={3}/>
              <input style={_style.ipform} maxLength={3}/>
            </div>
      </div>
    );
    return(
      <div style={_style.interface}>
        <img src={this.state.currentImg.src} />
        <div onClick={this._returnBtn.bind(this)} style={_style.retur}></div>
        {!showForm && <div onClick={this._nextBtn.bind(this)} style={_style.next}></div>}
        {showForm && <div>{form}</div>}
        {showForm && <div onClick={this._submitBtn.bind(this)} style={_style.submit}></div>}
      </div>
    );
  }
}

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
      let ipdata = this.props.mystate.ipData;
      if (e.target.value == "ipconfig") {
        if (ipdata.length !== 0) {
          this.state.output.splice(i,1);
          this.state.output.push(<div key={i.toString()} style={{color:'white'}}>
          <label style={{marginRight:'10px'}}> C:\Users\administrator> </label>
          <span>{e.target.value}</span></div>);
          for (var i = 0; i < ipdata.length; i++) {
              let data = ipdata[i]
              this.state.output.push(
                <div key={(i + 1).toString()} style={{color:'white',fontSize:'10px'}}>
                  <label>windows IP 配置</label><br/>
                  <label>以太网适配器  本地连接：··········：{}</label><br/>
                  <label>连接特定的DNS后缀：··············：{}</label><br/>
                  <label>本地连接IPv6地址：···············：</label><br/>
                  <label>IPv4地址：······················：{data.ip[0] + '.' + data.ip[1] + '.' + data.ip[2] + '.' + data.ip[3]}</label><br/>
                  <label>子网掩码：·······················：{data.networkmask[0] + '.' + data.networkmask[1] + '.' + data.networkmask[2] + '.' + data.networkmask[3]}</label><br/>
                  <label>默认网关：·························：{data.gateway[0] + '.' + data.gateway[1] + '.' + data.gateway[2] + '.' + data.gateway[3]}</label><br/>
                </div>
              );
            }
          this.state.output.push(<div key={(i + ipdata.length + 1).toString()} style={{color:'white'}}><label style={{marginRight:'10px'}}> C:\Users\administrator> </label>
            <input onKeyPress={this._keyEvent.bind(this)} style={_style.input}/></div>);
        } else {
          this.state.output.splice(i,1);
          this.state.output.push(<div key={i.toString()} style={{color:'white'}}>
          <label style={{marginRight:'10px'}}> C:\Users\administrator> </label>
          <span>{e.target.value}</span></div>);
          this.state.output.push(
            <div key={(i + 1).toString()} style={{color:'white',fontSize:'10px'}}>
              未进行IP配置，请配置后再进行查询！
            </div>
          );
          this.state.output.push(<div key={(i + 2).toString()} style={{color:'white'}}><label style={{marginRight:'10px'}}> C:\Users\administrator> </label>
            <input onKeyPress={this._keyEvent.bind(this)} style={_style.input}/></div>);
        }

      } else {
        this.state.output.splice(i,1);
        this.state.output.push(<div key={i.toString()} style={{color:'white'}}>
        <label style={{marginRight:'10px'}}> C:\Users\administrator> </label>
        <span>{e.target.value}</span></div>);
        this.state.output.push(
          <div key={(i + 1).toString()} style={{color:'white',fontSize:'10px'}}>
            不是内部或外部命令，也不是可运行的程序或批处理文件。
          </div>
        );
        this.state.output.push(<div key={(i + 2).toString()} style={{color:'white'}}><label style={{marginRight:'10px'}}> C:\Users\administrator> </label>
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
      <div key="0" style={{color:'white'}}><label style={{marginRight:'10px'}}> C:\Users\administrator> </label>
      <input onKeyPress={this._keyEvent.bind(this)} style={_style.input}/></div>
    )
  }

  render () {
    const _style = {
      pannel: {position:'absolute',left:this.state.left,top:this.state.top},
      myWindow: {width:'500px',height:'300px',border:'1px solid #d5d1c9',background:'#282828',overflow:'auto'},
      titlebar: {background:'#282828',position:'absolute',top:'0'}
    }
    return(
      <div style={_style.pannel}>
        <div style={_style.myWindow}>
          <TitleBar id="myTitleBar" background={'#d5d1c9'} theme={'light'} title="管理员:命令提示符" controls/>
          <div style={{padding:'10px'}}>{this.state.output}</div>
        </div>
      </div>
    );
  }
}

export default class Windows2008 extends React.Component {
  constructor() {
    super();
    this.state = {
      currentImg: null,
      img: null,
      isCmdWindow: false,
      luyouDatalist: [],
      ipData: [],
      isLuyou: false,
      luyouserver: false,
      manageToolProcess:false,
      ipProcess:false
    }
  }
  componentWillMount () {
    const imgObject = {
      desktop: {src:'../src/img/win2008/zhuomian.png'}
    }
    this.setState({img: imgObject});
    this.setState({currentImg: imgObject.desktop.src});
  }
  _startBtn () {
    this.setState({manageToolProcess: true});
  }
  _internentBtn () {
    this.setState({ipProcess: true});
  }
  _cmdBtn () {
    this.setState({isCmdWindow: true});
  }
  _changestate1 (arg) {
    if (arg.component) {
      this.setState({isLuyou: true});
    }
    if (arg.luyouserver) {
      this.setState({luyouserver: true});
    }
    this.setState({manageToolProcess: false});
    this.setState({isCmdWindow: false});
  }
  _changeluyoustate (luyouData) {
    this.state.luyouDatalist.push(luyouData);
    this.setState({manageToolProcess: false});
  }
  _setIpData (ipData) {
    if (ipData.ipData) {
      this.state.ipData.push(ipData.ipData);
    }
    this.setState({ipProcess:false});
  }
  render () {
    const { manageToolProcess, ipProcess, isCmdWindow } = this.state;
    const _style = {
      interface: {width:'800px',height:'600px',overflow:'hidden',margin:'0 auto'},
      btn: {position:'absolute',left:'34',bottom:'0',width:'50px',height:'40px',cursor:'pointer'},
      btn1: {position:'absolute',right:'140',bottom:'10',width:'25px',height:'20px',cursor:'pointer'},
      btn2: {position:'absolute',left:'40',top:'120',width:'70px',height:'80px',cursor:'pointer'}
    }
    if (manageToolProcess == true) {
      return(<ManageToolProcess
        luyoulist={this.state.luyouDatalist}
        isLuyou={this.state.isLuyou}
        luyouserver={this.state.luyouserver}
        changestate={this._changestate1.bind(this)}
        changeluyoustate={this._changeluyoustate.bind(this)}
      />);
    }
    if (ipProcess == true) {
      return(<SetIpProcess setIpData={this._setIpData.bind(this)}/>);
    }
    return(
      <div style={_style.interface}>
        <img src={this.state.currentImg}/>
        <div onClick={this._startBtn.bind(this)} style={_style.btn}></div>
        <div onClick={this._internentBtn.bind(this)} style={_style.btn1}></div>
        <div onClick={this._cmdBtn.bind(this)} style={_style.btn2}></div>
        {isCmdWindow && <CmdWindow mystate={this.state} />}
      </div>
    );
  }
}
