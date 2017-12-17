/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/12/17.
 * chaorong@maichong.it
 */

import React from 'react';
import _ from 'lodash';
import JsonPropertyDisplay from './JsonPropertyDisplay';

type Props = {
  className?: string,
  level: number,
  jsonObject: Object
};

export default class JsonObjectDisplay extends React.Component<Props> {
  static defaultProps = {
    className: '',
    level: 1,
    jsonObject: {}
  };

  render() {
    let { jsonObject, level } = this.props;
    let className = 'json-display json-Object';
    if (this.props.className) {
      className = className + ' ' + this.props.className;
    }
    let length = Object.keys(jsonObject).length;
    return (
      <div className={className}>
        {
          _.map(jsonObject, (value, key) => {
            length -= 1;
            return (<JsonPropertyDisplay level={level} next={length > 0} property={key} value={value} />);
          })
        }
      </div>
    );
  }
}
