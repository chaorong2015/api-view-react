/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/17.
 * chaorong@maichong.it
 */

import React from 'react';
import _ from 'lodash';
import BaseInfo from './components/BaseInfo';
import FieldDisplay from './components/FieldDisplay';
import ResponseCase from './components/ResponseCase';
import RequestCase from './components/RequestCase';
import RouteMethodDisplay from './components/RouteMethodDisplay';
import { getFieldsOfModel, filterRouteFieldsByType, getFieldsOfBody, getFieldsOfResponse } from './utils/field-manage';

export default class ApiRoute extends React.Component {
  static defaultProps = {
    className: ''
  };
  props: {
    className?: string;
    value: Object;
    relation: {
      objects: Array<Object>;
      tuples: Array<Object>;
      schemas: Array<Object>;
      fields: Array<Object>;
      scopes: Array<Object>;
      responses: Array<Object>;
    }
  };

  getMarkEle() {
    let { value } = this.props;
    let stability = '';
    if (value.stability) {
      switch (value.stability) {
        case 'Stable': {
          stability = '稳定版';
          break;
        }
        case 'Deprecated': {
          stability = '过时版';
          break;
        }
        case 'Experimental': {
          stability = '实验版';
          break;
        }
        case 'Bata': {
          stability = 'Bata版';
          break;
        }
        case 'Alpha': {
          stability = 'Alpha版';
          break;
        }
        default: stability = '';
      }
    }
    return (<span>
      {
        stability ? <span className="stability"> {stability} </span> : null
      }
      {
        value.since ? <span className="since">Since&nbsp;&nbsp;{value.since} </span> : null
      }
      {
        value.state ? <span className="state">{value.state} </span> : null
      }
    </span>);
  }

  render() {
    let { value, relation } = this.props;
    let className = 'api-module-panel';
    if (this.props.className) {
      className = className + ' ' + this.props.className;
    }
    let markEle = this.getMarkEle();
    let fields = getFieldsOfModel(value, relation);
    let fieldsRoutePath = filterRouteFieldsByType('route:path', fields);
    let fieldsRouteQuery = filterRouteFieldsByType('route:query', fields);
    let fieldsRouteBody = getFieldsOfBody(value, relation);
    let responseArr = getFieldsOfResponse(value, relation);
    return (
      <div className={className} id={'route-' + value.id}>
        <div className="panel-left">
          <BaseInfo markEle={markEle} isSub={!0} title={value.title} desc={value.desc} />
          <div className="padding-top">
            <div className="title-left-border">接口地址</div>
            <div className="method-path">
              <span className="padding-sm-right">{value.method}</span>
              <span className="padding-sm">{value.path}</span>
            </div>
          </div>
          {
            fieldsRoutePath && fieldsRoutePath.length ?
              <div className="padding-top">
                <div className="title-left-border">路径参数</div>
                <FieldDisplay value={fieldsRoutePath} />
              </div> : null
          }
          {
            fieldsRouteQuery && fieldsRouteQuery.length ?
              <div className="padding-top">
                <div className="title-left-border">查询参数</div>
                <FieldDisplay value={fieldsRouteQuery} />
              </div> : null
          }
          {
            fieldsRouteBody && fieldsRouteBody.fields && fieldsRouteBody.fields.length ?
              <div className="padding-top">
                <div className="title-left-border">Body参数</div>
                {
                  fieldsRouteBody.desc ? <div className="desc padding-v-sm">描述:{fieldsRouteBody.desc}</div> : null
                }
                {
                  fieldsRouteBody.modelTitle ?
                    <div className="padding-v-sm">
                      <div className="desc">
                        返回结果为
                        { fieldsRouteBody.fieldType === 'object' || fieldsRouteBody.fieldType === 'scope' ?
                          fieldsRouteBody.modelTitle + ',类型为Object' : null}
                        { fieldsRouteBody.fieldType === 'tuple' ?
                          '[ ' + fieldsRouteBody.modelTitle + ' ],类型为Array' : null}
                        { fieldsRouteBody.fieldType === 'array' ? fieldsRouteBody.modelTitle + ' [ ],类型为Array' : null}
                        ,{fieldsRouteBody.fieldType === 'tuple' ? '[ ' + fieldsRouteBody.modelTitle + ' ]'
                          : fieldsRouteBody.modelTitle}属性信息如下
                      </div>
                      <FieldDisplay className="flex" value={fieldsRouteBody.fields} />
                    </div> :
                    <FieldDisplay className="flex" value={fieldsRouteBody.fields} />
                }
              </div> : null
          }
          {
            responseArr && responseArr.length ?
              <div>
                <div className="title-left-border">
                  返回结果
                </div>
                {
                  _.map(responseArr, (r) => (
                    <div className="padding-v" key={r.id}>
                      <div className="code-desc">
                        <span className="padding-right-sm">
                          {r.code}
                        </span>
                        <span className="desc">
                          {r.desc}
                        </span>
                      </div>
                      {
                        r.modelTitle ?
                          <div className="padding-v-sm">
                            <div className="desc">
                              返回结果为
                              { r.fieldType === 'object' || r.fieldType === 'scope' ?
                                r.modelTitle + ',类型为Object' : null
                              }
                              { r.fieldType === 'tuple' ? '[ ' + r.modelTitle + ' ],类型为Array' : null}
                              { r.fieldType === 'array' ? r.modelTitle + ' [ ],类型为Array' : null}
                              ,{r.fieldType === 'tuple' ? '[ ' + r.modelTitle + ' ]' : r.modelTitle}属性信息如下
                            </div>
                            <FieldDisplay className="flex" value={r.fields} />
                          </div> :
                          <FieldDisplay className="flex" value={r.fields} />
                      }
                    </div>
                  ))
                }
              </div> : null
          }
        </div>
        <div className="panel-right text-center">
          <RouteMethodDisplay method={value.method} url={value.path} />
          <RequestCase title="请求示例" value={fieldsRouteBody} />
          <ResponseCase title="响应示例" value={responseArr} />
        </div>
      </div>
    );
  }
}
