/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/17.
 * chaorong@maichong.it
 */

import React from 'react';
import _ from 'lodash';
import CaseDataDisplay from './CaseDataDisplay';

export default class ResponseCase extends React.Component {
  static defaultProps = {
    className: ''
  };
  props: {
    className?: string;
    title: string;
    value: Array<{
      code:string|number,
      desc:string,
      fields: Array<Object>;
      // 数组中为Field对象，同时在对象中增加了{children:{...model, fields: []}},
      // model为Object、Tuple、Scope的字段
    }>;
  };

  state: {
    response: Object;
  };
  constructor(props) {
    super(props);
    //测试
    // this.test = {
    //   value: [
    //     {
    //       code: 200, desc: '正确返回', value: [11]
    //     },
    //     { code: 400, desc: '错误返回', value: [222] }]
    // };
    // props = Object.assign({}, props, this.test);
    this.state = {
      response: props.value && props.value.length ? props.value[0] : {}
    };
  }

  render() {
    let { className, value, title } = this.props;
    let { response } = this.state;
    //测试
    // value = this.test.value;
    if (!value || !value.length) return <div />;
    // console.error('=======response', response);
    return (
      <div className={className ? className + ' response-case' : 'response-case'}>
        <div className="model-case-title">{title}</div>
        <div className="tabs">
          {
            _.map(value, (r, index) => (
              <div className="tab" key={index} onClick={() => this.setState({ response: r })}>
                <i className={
                  r.code === 200 || r.code === '200' ? 'fa fa-circle text-success' : 'fa fa-circle text-danger'
                }
                />
                <span className="tab-code">{r.code}</span>
                <span className="tab-desc">{r.desc}</span>
              </div>
            ))
          }
        </div>
        {
          response.fields && response.fields.length ?
            <div className="case-data-panel">
              <CaseDataDisplay wrapType={response.fieldType} type={response.modelType} value={response.fields} />
            </div> : null
        }
      </div>
    );
  }
}
