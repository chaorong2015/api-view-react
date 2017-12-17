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
  jsonArray: Array<any>
};

export default class JsonArrayDisplay extends React.Component<Props> {
  static defaultProps = {
    className: '',
    level: 1,
    jsonArray: []
  };

  render() {
    let { jsonArray, level } = this.props;
    let className = 'json-display json-Array';
    if (this.props.className) {
      className = className + ' ' + this.props.className;
    }
    return (
      <div className={className}>
        {
          _.map(jsonArray, (item, i) => (
            <JsonPropertyDisplay
              level={level}
              next={parseInt(i) < jsonArray.length - 1}
              property=""
              value={item}
            />
          ))
        }
      </div>
    );
  }
}
