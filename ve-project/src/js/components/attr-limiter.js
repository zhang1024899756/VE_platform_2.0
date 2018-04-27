import React from 'react';
import { Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class Attributelimiter extends React.Component {

  _onChange(e) {
    //console.log(`radio checked:${e.target.value}`);
  }

  render () {
    return (
      <div>
        <RadioGroup onChange={this._onChange.bind(this)}>
          <RadioButton value="clear">限值属性</RadioButton>
          <RadioButton value="any">泛值属性</RadioButton>
          <RadioButton value="array">组值属性</RadioButton>
        </RadioGroup>
      </div>
    );
  }
}
