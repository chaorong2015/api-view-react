/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/25.
 * chaorong@maichong.it
 */

import React from 'react';
import ApiMenu from './ApiMenu';
import ApiInfoWrapper from './ApiInfoWrapper';

export default class Index extends React.Component {
  static defaultProps = {
    className: '',
    menuBaseUrl: '',
  };

  props: {
    value: Object;
    menuBaseUrl?: string;
    className: string;
  };

  render() {
    let className = 'api-view';
    if (this.props.className) {
      className += (' ' + this.props.className);
    }
    return (
      <div className={className}>
        <ApiMenu
          className="scrollbar-v-xs"
          mode="view"
          baseUrl={this.props.menuBaseUrl}
          value={this.props.value}
        />
        <ApiInfoWrapper className="scrollbar-v-xs" value={this.props.value} />
      </div>
    );
  }
}
