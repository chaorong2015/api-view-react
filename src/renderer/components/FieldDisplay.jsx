/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/17.
 * chaorong@maichong.it
 */

// @flow

import React from 'react';
import _ from 'lodash';
import { getSimpleModelByFieldType } from '../utils/field-manage';

type Props = {
  className?: string,
  baseUrl?: string,
  type?: string,
  showType?: boolean,
  value: Array<Object>
  // 数组中为Field对象，同时在对象中增加了{children:{...model, fields: []}},
  // model为Object、Tuple、Scope的字段
};

export default class FieldDisplay extends React.Component<Props> {
  static defaultProps = {
    className: '',
    baseUrl: '',
    type: '',
    showType: true
  };

  getTypeDisplay = (f: Object): Object => {
    // if (!f.children || f.children.fields) return <span>{f.type}</span>;
    if (f.modelTitle && f.type !== 'union') {
      let { baseUrl } = this.props;
      let url = (baseUrl || '') + '#' + f.modelType + '-' + f.children.id;
      return <span className="type padding-right-xs"><a href={url}>{f.type}</a></span>;
    }
    return <span className="type padding-right-xs">{f.type}</span>;
  };
  render() {
    let {
      className, value, type, showType
    } = this.props;
    // console.log('======value:', value);
    if (!value || !value.length) return <div />;
    // console.log('======FieldDisplay');
    let model = null;
    let borderType = 'object';
    //通过类型获取一个简单模型
    if (type) {
      model = getSimpleModelByFieldType(type);
      if (model && (model.fieldType === 'array' || model.modelType === 'tuple')) {
        borderType = 'array';
      }
    }
    return (
      <div className={className ? className + ' field-display' : 'field-display'}>
        <div className="list">
          {
            showType && model && model.modelTitle ?
              <div className="field-type">{type}</div> : null
          }
          <div className={'list-left-border ' + borderType} />
          <div className="list-items">
            {
              _.map((value || []), (field) => (
                <div className="item" key={field.id}>
                  {
                    field.title ? <div className="item-title">{field.title}</div> : null
                  }
                  <div className="item-options">
                    <div className="options">
                      {
                        this.getTypeDisplay(field)
                      }
                      {field.options && field.options.required ?
                        <span className="text-danger padding-right-xs">
                          必须
                        </span> : ''
                      }
                      {field.default ?
                        <span className="padding-right-xs">
                          {'默认值:' + field.default}
                        </span>
                        : ''
                      }
                      {field.options && field.options.max ?
                        <span className="padding-right-xs">
                          {'长度:' + (field.options.mix || 0) + '~' + (field.options.max || 0)}
                        </span> : ''
                      }
                      {field.options && field.options.format ?
                        <span className="padding-right-xs">
                          {'格式:' + field.options.format }
                        </span> : ''
                      }
                      {field.options && field.options.regular ?
                        <span className="padding-right-xs">
                          {'正则:' + field.options.regular }
                        </span> : ''
                      }
                      {field.type === 'enum' && field.options && field.options.enumValue ?
                        <span className="padding-right-xs">
                          {'可选值:' + JSON.stringify(field.options.enumValue) }
                        </span> : ''
                      }
                      {field.type === 'union' && field.options && field.options.unionType ?
                        <span className="padding-right-xs">
                          {'可选类型:' + field.options.unionType.join(',') }
                        </span> : ''
                      }
                    </div>
                    <div className="desc">{field.desc || ''}</div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}
