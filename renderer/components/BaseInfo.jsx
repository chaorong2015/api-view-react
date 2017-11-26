/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/17.
 * chaorong@maichong.it
 */

import React from 'react';

export default class BaseInfo extends React.Component {
  static defaultProps = {
    className: '',
    isSub: false,
    share: false,
    markEle: null
  };
  props: {
    className?: string;
    markEle?: Element;//对标题进行标记的html格式
    title: string;
    isSub?: boolean;
    share?: boolean;
    desc: string;
  };

  render() {
    let { title, desc } = this.props;
    let className = 'base-info';
    if (this.props.className) {
      className = className + ' ' + this.props.className;
    }
    if (this.props.isSub) {
      className += ' sub-info';
    }
    return (
      <div className={className}>
        <div className="title">
          {title}
          {
            this.props.share ? <span className="text-danger">*</span> : null
          }
        </div>
        {
          this.props.markEle ? <div className="mark">{this.props.markEle}</div> : null
        }
        <div className="desc">{desc}</div>
      </div>
    );
  }
}
