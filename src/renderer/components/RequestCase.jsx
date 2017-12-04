/**
 * 脉冲软件
 * http://maichong.it
 * @Created by Rong on 2017/11/17.
 * @author Rong <chaorong@maichong.it>
 */

// @flow

import React from 'react';
import CaseDataDisplay from './CaseDataDisplay';

type Props = {
  className?: string,
  title: string,
  value: {
    //...parent数据
    fieldType: string, //字段类型如User[],为array类型
    modelType: string, //字段里的模型类型 如User[],为object类型
    fields:Array<Object>
    // 数组中为Field对象，同时在对象中增加了{children:{...model, fields: []}},
    // model为Object、Tuple、Scope的字段
  };
};

export default class RequestCase extends React.Component<Props> {
  static defaultProps = {
    className: ''
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
