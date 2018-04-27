import React from 'react';
import { Layout, Menu, Icon, Row, Col, Button, List, Spin, Avatar } from 'antd';
//import Interface from './interface';
import Windows20008 from './win_2008';


export default class JtopoCanvas extends React.Component {
  constructor() {
		super();
		this.state = {
      scene: null,
      currentNode: null,
      beginNode: null,
      temp: {tempNodeA: null,tempNodeZ: null,link: null},
      showMenu: {ifShow: false,x: 0,y: 0},
      interface: false,
      nodes: []
		};
  };

  _handler (event) {
    if (event.button == 2) {
      this.setState({
        showMenu: {ifShow: true,x: event.pageX - 220,y: event.pageY - 140}
      })
    }
  }
  _clickMenu (e) {
    const btn = e.target.innerHTML;
    if (btn == '连接设备') {
      if (this.state.beginNode == null) {
        this.setState({beginNode:this.state.currentNode});
        this.state.scene.add(this.state.temp.link);
        this.state.temp.tempNodeA.setLocation(this.state.currentNode.x,this.state.currentNode.y);
        this.state.temp.tempNodeZ.setLocation(this.state.currentNode.x,this.state.currentNode.y);
      }
    }
    if (btn == '操作界面') {
      this.setState({interface: true});
    }
    if (btn == '删除设备') {
      this.state.nodes.splice(this.state.currentNode._id,1);
      this.state.scene.remove(this.state.currentNode);
      this.setState({currentNode: null});
    }
    this.setState({showMenu:{ifShow: false,x: 0,y: 0}});
  }

  componentDidMount () {

    const canvas = document.getElementById('canvas');
    const stage = new JTopo.Stage(canvas);
    const scene = new JTopo.Scene(stage);

    //定义两个临时节点，一条临时线段
    const tempNodeA = new JTopo.Node('tempA')
    tempNodeA.setSize(1, 1)
    const tempNodeZ = new JTopo.Node('tempZ')
    tempNodeZ.setSize(1, 1)
    const link = new JTopo.Link(tempNodeA, tempNodeZ)
    this.setState({temp: {tempNodeA: tempNodeA,tempNodeZ: tempNodeZ,link: link}})
    //在link原型上封装一个添加节点方法用来显示删除连线按钮
    JTopo.Link.prototype.addcenternode = (thisL) => {
        thisL.cnode = new JTopo.CircleNode('X')
        thisL.cnode.radius = 5
        thisL.cnode.fillColor = '0,0,0'
        thisL.cnode.textPosition = 'Middle_Center'
        scene.add(thisL.cnode);
        thisL.cnode.addEventListener('click',() => {
          scene.remove(thisL);
          scene.remove(thisL.cnode);
        })
    }

    stage.addEventListener('click',(event) => {
      if (event.button == 0) {
        this.setState({showMenu:{ifShow: false,x: 0,y: 0}})
      }
    })
    scene.addEventListener('mouseup',(event) => {
      if (event.button == 2) {
        this.state.scene.remove(this.state.temp.link);
        return;
      }
      if (event.target !== null && event.target instanceof JTopo.Node) {
        if (this.state.beginNode !== event.target) {
          let endNode = event.target;
          let l = new JTopo.Link(this.state.beginNode,endNode);
          this.state.scene.add(l);
          this.setState({beginNode: null});
          this.state.scene.remove(this.state.temp.link);
        } else {
          this.setState({beginNode: null});
        }
      } else {
        this.state.scene.remove(this.state.temp.link);
      }
    })
    scene.addEventListener('mousedown',(event) => {
      if (event.target == null || event.target == this.state.beginNode || event.target == this.state.temp.link) {
        this.state.scene.remove(this.state.temp.link);
      }
    })
    scene.addEventListener('mousemove',(event) => {
      this.state.temp.tempNodeZ.setLocation(event.x,event.y);
    })
    scene.addEventListener('dbclick',(event) => {
      const thisL = event.target;
      if (thisL.elementType == 'link') {
        thisL.addcenternode(thisL);
        thisL.paintPath = (a, b) => {
          if (thisL.cnode) {
              thisL.cnode.cx = thisL.nodeA.cx + (thisL.nodeZ.cx - thisL.nodeA.cx) / 2;
              thisL.cnode.cy = thisL.nodeA.cy + (thisL.nodeZ.cy - thisL.nodeA.cy) / 2;
          }
          if (thisL.nodeA === thisL.nodeZ) return void thisL.paintLoop(a);
          a.beginPath(),
          a.moveTo(b[0].x, b[0].y);
          for (let c = 1; c < b.length; c++) {
              null == thisL.dashedPattern ? (
                  (null == thisL.PointPathColor ? a.lineTo(b[c].x, b[c].y) : a.JtopoDrawPointPath(b[c - 1].x, b[c - 1].y, b[c].x, b[c].y, a.strokeStyle, thisL.PointPathColor))
              ) : a.JTopoDashedLineTo(b[c - 1].x, b[c - 1].y, b[c].x, b[c].y, thisL.dashedPattern)
          }
          if (a.stroke(), a.closePath(), null != thisL.arrowsRadius) {
              let d = b[b.length - 2];
              let e = b[b.length - 1];
              thisL.paintArrow(a, d, e)
          }
        }
        thisL.addEventListener('click',() => {
          if (thisL.cnode) {
              scene.remove(thisL.cnode);
          }
        })
      }
    })

    this.setState({scene:scene})
  }

  componentWillReceiveProps (nextProps) {
      if (nextProps.canvasNode !== null) {
        let newnode = nextProps.canvasNode
        let node = new JTopo.Node(newnode.name);
        node.setImage(newnode.images[0],true)
        node.setLocation(Math.random()*200 + 10,Math.random()*200 + 10);
        node.compProps = newnode;
        this.state.scene.add(node);
        this.state.nodes.push(node)
        node.addEventListener('mouseup',(event) => {
          this.setState({currentNode:node})
          this._handler(event)
        })
      }
  }
  render () {
    const _style = {
      canvas: {background: '#5F9EA0',margin:'0 auto'},
      menu: {
        width: '80px',
        padding: '5px',
        position: 'absolute',
        background: '#eee',
        listStyle: 'none',
        left: this.state.showMenu.x + 'px',
        top: this.state.showMenu.y + 'px'
      }
    }
    const menu = (
      <ul style={_style.menu} onClick={this._clickMenu.bind(this)}>
        <li>设备电源</li>
        <li>连接设备</li>
        <li>操作界面</li>
        <li>删除设备</li>
      </ul>
    );
    if (this.state.interface == true) {
      return(<Windows20008 />);
    }
    return(
      <div style={{textAlign:'center'}}>
        <canvas style={_style.canvas} id="canvas" width="800" height="500"></canvas>
        {this.state.showMenu.ifShow && menu}
      </div>
    );
  }
}
