/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/17.
 * chaorong@maichong.it
 */

// @flow

import React from 'react';
import _ from 'lodash';
import CaseDataDisplay from './CaseDataDisplay';

type Props = {
  className?: string;
  title: string;
  value: Array<{
    code:number,
    desc:string,
    fields: Array<Object>;
    // 数组中为Field对象，同时在对象中增加了{children:{...model, fields: []}},
    // model为Object、Tuple、Scope的字段
  }>;
};

type State = {
  response: Object;
};

export default class ResponseCase extends React.Component<Props, State> {
  static defaultProps = {
    className: ''
  };

  constructor(props:Object) {
    super(props);
    this.state = {
      response: props.value && props.value.length ? props.value[0] : {}
    };
  }

  render() {
    let { className, value, title } = this.props;
    let { response } = this.state;
    if (!value || !value.length) return <div />;
    // console.error('=======response', response);
    // console.log('======ResponseCase');
    return (
      <div className={className ? className + ' response-case' : 'response-case'}>
        <div className="model-case-title">{title}</div>
        <div className="tabs">
          {
            _.map(value, (r, index) => (
              <div
                className={r.id === response.id ? 'tab active' : 'tab'}
                key={index}
                onClick={() => this.setState({ response: r })}
              >
                <i className={
                  _.isNumber(r.code) && r.code <= 400 && r.code >= 200 ?
                  'fa fa-circle text-success' : 'fa fa-circle text-danger'
                }
                />
                <span className="tab-code">{r.code}</span>
                <span className="tab-desc">{r.desc}</span>
              </div>
            ))
          }
        </div>
        <div className="case-data-panel">
          <CaseDataDisplay
            defaultJson={{}}
            wrapType={response.fieldType}
            type={response.modelType}
            value={response.fields || []}
          />
        </div>
      </div>
    );
  }
}
