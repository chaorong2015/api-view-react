/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/26.
 * chaorong@maichong.it
 */

import React from 'react';

export default class RouteMethodDisplay extends React.Component {
  static defaultProps = {
    className: ''
  };
  props: {
    className?: string;
    method: string;
    url: string;
  };

  render() {
    let { method, url } = this.props;
    let className = 'route-method-display';
    if (this.props.className) {
      className = className + ' ' + this.props.className;
    }
    if (!method) return <div />;
    return (
      <div className={className}>
        <div className="method">{method}</div>
        <div className="path">{url}</div>
      </div>
    );
  }
}
