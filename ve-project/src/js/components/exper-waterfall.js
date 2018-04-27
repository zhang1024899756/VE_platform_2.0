import React from 'react';
import { Link } from 'react-router-dom';
import { List, Card, Icon } from 'antd';
const { Meta } = Card;

export default class ExperWaterfall extends React.Component {
  constructor () {
    super();//调用基类所有初始化方法
    this.state = {
      waterfall: []
    };
  }
  componentDidMount () {
    const myFetchOptions = {
      method: 'GET',
      mode : 'cors',
    };
    fetch("http://localhost:8100/experiment/list",myFetchOptions)
      .then(res=>res.json().then(json=>{
        this.setState({waterfall: json})
      }))
  }

  _randombg () {
    const r = Math.floor(Math.random()*200 + 56);
    const g = Math.floor(Math.random()*200 + 56);
    const b = Math.floor(Math.random()*200 + 56);
    return "rgb(" + r + ',' + g + ',' + b + ")";
  }

  render() {
    const _style = {
      layout: {background: this._randombg()},
      item: {width: 200,height: 200},
      introduction: {width: '180px',overflow: 'hidden',whiteSpace:'nowrap',textOverflow: 'ellipsis'},
      color: {color: '#fff'}
    }
    return(
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={this.state.waterfall}
          renderItem={item => (
            <List.Item style={_style.item}>
              <Link to={'/experdetails/' + item._id}>
                <Card hoverable
                  style={_style.layout}
                  actions={[<Icon type="setting" />,<Icon type="eye" />]}
                >
                  <Meta
                    style={_style.color}
                    title={item.name}
                    description={<p style={_style.introduction}>{item.introduction}</p>}
                  />
                </Card>
              </Link>
            </List.Item>
          )}
        />
    );
  }
}
