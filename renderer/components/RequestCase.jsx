/**
 * 脉冲软件
 * http://maichong.it
 * @Created by Rong on 2017/11/17.
 * @author Rong <chaorong@maichong.it>
 */

import React from 'react';
import CaseDataDisplay from './CaseDataDisplay';

export default class RequestCase extends React.Component {
  static defaultProps = {
    className: ''
  };
  props: {
    className?: string;
    title: string;
    value: {
      //...parent数据
      fields:Array<Object>
      // 数组中为Field对象，同时在对象中增加了{children:{...model, fields: []}},
      // model为Object、Tuple、Scope的字段
    };
  };

  render() {
    let { className, value, title } = this.props;
    if (!value || !value.fields || !value.fields.length) return <div />;
    return (
      <div className={className ? className + ' request-case' : 'request-case'}>
        <div className="model-case-title">{title}</div>
        <div className="case-data-panel">
          <CaseDataDisplay wrapType={value.fieldType} type={value.modelType} value={value.fields} />
        </div>
      </div>
    );
  }
}
