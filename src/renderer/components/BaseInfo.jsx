/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/17.
 * chaorong@maichong.it
 */

// @flow

import React from 'react';

type Props = {
  className?: string,
  markEle?: Object|null, //Element 对标题进行标记的html格式
  title: string,
  isSub?: boolean,
  share?: boolean,
  desc: string
};

export default class BaseInfo extends React.Component<Props> {
  static defaultProps = {
    className: '',
    isSub: false,
    share: false,
    markEle: null
  };

  render() {
    let {
      title, desc, share, markEle
    } = this.props;
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
            share ? <span className="text-danger">*</span> : null
          }
        </div>
        {
          markEle ? <div className="mark">{markEle}</div> : null
        }
        <div className="desc">{desc}</div>
      </div>
    );
  }
}
