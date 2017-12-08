/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/17.
 * chaorong@maichong.it
 */

// @flow

import React from 'react';
import _ from 'lodash';
import { getMockData } from '../utils/field-mock';

type Props = {
  className?: string,
  index?: number,
  next?: boolean,
  wrapType: string, //包裹数据的外层类型
  type: string, //展示的数据类型
  value: Array<Object>
  // 数组中为Field对象，同时在对象中增加了{children:{...model, fields: []}},
  // model为Object、Tuple、Scope的字段
};
type State = {
  activeObj: Array<string>,
  objectType: Array<string>
};

export default class CaseDataDisplay extends React.Component<Props, State> {
  static defaultProps = {
    className: '',
    wrapType: '',
    index: 1,
    next: false
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      objectType: ['object', 'scope', 'array', 'tuple', 'model'],
      activeObj: []
      // open: false
    };
  }

  toggleField = (f: Object) => {
    let data = {};
    data[f.id] = !this.state[f.id];
    this.setState(data);
  };

  getLeftMark = (type: string) => {
    if (type === 'object' || type === 'scope') return '{';
    if (type === 'tuple') return '[';
    if (type === 'array') return '[';
    return '';
  };

  getRightMark = (type: string) => {
    if (type === 'object' || type === 'scope') return '}';
    if (type === 'tuple') return ']';
    if (type === 'array') return ']';
    return '';
  };

  getCaseValueEle = (f: Object): Object|null => {
    let ele = null;
    let fieldValue: Array<any> = getMockData(f);
    if (_.isArray(fieldValue)) {
      ele =
        <span>
          &#91;
          &nbsp;
          {
            _.map(fieldValue || [], (v, index) => {
              if (_.isObject(fieldValue)) {
                return (
                  <span key={index}>
                    <span className={f.modelType}>{JSON.stringify(v)}</span>
                    {index < (fieldValue.length - 1) ? <span>,&nbsp;</span> : ''}
                  </span>
                );
              }
              return (
                <span key={index}>
                  <span className={f.modelType}>{v.toString()}</span>
                  {index < (fieldValue.length - 1) ? <span>,&nbsp;</span> : ''}
                </span>
              );
            })
          }
          &nbsp;
          &#93;
        </span>;
    } else if (_.isBoolean(fieldValue)) {
      ele = <span className={f.fieldType}>{fieldValue.toString()}</span>;
    } else if (_.isNull(fieldValue)) {
      ele = <span className="null">null</span>;
    } else if (_.isObject(fieldValue)) {
      if (_.isEmpty(fieldValue)) {
        ele = <span className={f.fieldType}>&#123;&nbsp;&nbsp;&#125;</span>;
      } else {
        ele = <span className={f.fieldType}>{JSON.stringify(fieldValue)}</span>;
      }
    } else {
      ele = <span className={f.fieldType}>{fieldValue ? fieldValue.toString() : ''}</span>;
    }
    return ele;
  };

  render() {
    let {
      className, value, type, wrapType, next
    } = this.props;
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
                            className={
                              this.state[f.id] ? 'icon icon-toggle-field toggle-show'
                                : 'icon icon-toggle-field toggle-hide'}
                            onClick={() => this.toggleField(f)}
                          />
                          { type === 'object' || f.title ?
                            <div className="property">
                              {f.title}
                              <span className="colon">:</span>
                            </div> : null
                          }
                          <div
                            className={
                            this.state[f.id] ? 'field-children-value open' : 'field-children-value'
                            }
                          >
                            <div className="property-show">
                              {
                                this.props.index && this.props.index <= 2 ?
                                  <CaseDataDisplay
                                    index={this.props.index + 1}
                                    value={f.children.fields}
                                    wrapType={f.fieldType}
                                    type={f.modelType}
                                    next={index < value.length - 1}
                                  /> : <span>{'<' + f.type + '>'}</span>
                              }
                            </div>
                            <div className="property-hide">
                              {this.getLeftMark(f.fieldType)}
                              {this.getLeftMark(f.modelType)}
                              ...
                              {this.getRightMark(f.modelType)}
                              {this.getRightMark(f.fieldType)}
                              {
                                index < value.length - 1 ? <span className="split">,</span> : null
                              }
                            </div>
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
                        <span className="value">
                          {this.getCaseValueEle(f) || f.mock || f.default || f.fieldType + '类型'}
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
