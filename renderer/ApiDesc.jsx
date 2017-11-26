/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/17.
 * chaorong@maichong.it
 */

import React from 'react';
import BaseInfo from './components/BaseInfo';

export default class ApiDesc extends React.Component {
  static defaultProps = {
    className: '',
    showRight: false
  };
  props: {
    className?: string;
    value: Object;
    showRight?: boolean;
  };

  render() {
    let { value } = this.props;
    let className = 'api-module-panel';
    if (this.props.className) {
      className = className + ' ' + this.props.className;
    }
    return (
      <div className={className} id={'description-' + value.id}>
        <BaseInfo className="panel-left" title={value.title} desc={value.desc} />
        <div className="panel-right text-center" />
      </div>
    );
  }
}
