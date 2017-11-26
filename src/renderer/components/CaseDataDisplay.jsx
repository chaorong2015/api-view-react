/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/17.
 * chaorong@maichong.it
 */

import React from 'react';
import _ from 'lodash';

export default class CaseDataDisplay extends React.Component {
  static defaultProps = {
    className: '',
    wrapType: '',
    index: 1,
    next: false
  };
  props: {
    className?: string;
    index?: number;
    next?: boolean;
    wrapType: string; //包裹数据的外层类型
    type: string; //展示的数据类型
    value: Array<Object>;
    // 数组中为Field对象，同时在对象中增加了{children:{...model, fields: []}},
    // model为Object、Tuple、Scope的字段
  };
  state = {
    activeObj: []
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      objectType: ['object', 'scope', 'array', 'tuple', 'model'],
      // open: false
    };
  }

  toggleField = (f) => {
    let data = {};
    data[f.id] = !this.state[f.id];
    this.setState(data);
  };

  getLeftMark = (type) => {
    if (type === 'object' || type === 'scope') return '{';
    if (type === 'tuple') return '[';
    if (type === 'array') return '[';
    return '';
  };

  getRightMark = (type) => {
    if (type === 'object' || type === 'scope') return '}';
    if (type === 'tuple') return ']';
    if (type === 'array') return ']';
    return '';
  };

  render() {
    let { className, value, type, wrapType, next } = this.props;
    let { objectType } = this.state;
    return (
      <div className={className ? className + ' case-data-display' : 'case-data-display'}>
        {this.getLeftMark(wrapType)}
        {
          objectType.indexOf(type) > -1 ? null : <div>&quot;{type}&quot;</div>
        }
        {objectType.indexOf(type) > -1 ? this.getLeftMark(type) : ''}
        {
          objectType.indexOf(type) > -1 ?
            <div className="json-panel">
              <div className="obj">
                {
                  _.map(value, (f, index) => {
                    if (f.children && f.children.fields && f.children.fields.length) {
                      return (
                        <div key={f.id} className="field-children">
                          <div
                            className={this.state[f.id] ? 'toggle-show' : 'toggle-hide'}
                            onClick={() => this.toggleField(f)}
                          />
                          { type === 'object' || f.title ?
                            <span className="property">
                              {f.title}
                              <span className="colon">:</span>
                            </span> : null
                          }
                          <div className="field-children-value">
                            {
                              this.state[f.id] ?
                                <div>
                                  {
                                    this.props.index <= 2 ?
                                      <CaseDataDisplay
                                        index={this.props.index + 1}
                                        value={f.children.fields}
                                        wrapType={f.fieldType}
                                        type={f.modelType}
                                        next={index < value.length - 1}
                                      /> : <span>{'<' + f.type + '>'}</span>
                                  }
                                </div> :
                                <div>
                                  {this.getLeftMark(f.fieldType)}
                                  {this.getLeftMark(f.modelType)}
                                  ...
                                  {this.getRightMark(f.modelType)}
                                  {this.getRightMark(f.fieldType)}
                                  {
                                    index < value.length - 1 ? <span className="split">,</span> : null
                                  }
                                </div>
                            }
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div className="field" key={f.id}>
                        { type === 'object' || f.title ?
                          <span className="property">
                            {f.title}
                            <span className="colon">:</span>
                          </span> : null
                        }
                        <span className={f.fieldType ? 'value ' + f.fieldType : 'value'}>
                          {f.mock || f.default || f.fieldType + '类型'}
                        </span>
                        {
                          index < value.length - 1 ? <span className="split">,</span> : null
                        }
                      </div>);
                  })
                }
              </div>
            </div> : null
        }
        {objectType.indexOf(type) > -1 ? this.getRightMark(type) : ''}
        {this.getRightMark(wrapType)}
        {
          next ? <span className="split">,</span> : null
        }
      </div>
    );
  }
}
