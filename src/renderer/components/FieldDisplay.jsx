/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/17.
 * chaorong@maichong.it
 */

// @flow

import React from 'react';
import _ from 'lodash';

type Props = {
  className?: string,
  baseUrl?: string,
  value: Array<Object>
  // 数组中为Field对象，同时在对象中增加了{children:{...model, fields: []}},
  // model为Object、Tuple、Scope的字段
};

export default class FieldDisplay extends React.Component<Props> {
  static defaultProps = {
    className: ''
  };

  getTypeDisplay = (f: Object): Object => {
    // if (!f.children || f.children.fields) return <span>{f.type}</span>;
    if (f.modelTitle && f.type !== 'union') {
      let { baseUrl } = this.props;
      let url = (baseUrl || '') + '#' + f.modelType + '-' + f.children.id;
      return <a key={f.id} href={url}>{f.type}</a>;
    }
    return <span>{f.type}</span>;
  };
  render() {
    let { className, value } = this.props;
    // console.log('======value:', value);
    if (!value || !value.length) return <div />;
    return (
      <div className={className ? className + ' field-display' : 'field-display'}>
        <div className="list">
          <div className="list-left-border" />
          <div className="list-items">
            {
              _.map((value || []), (field) => (
                <div className="item" key={field.id}>
                  {
                    field.title ? <div className="item-title">{field.title}</div> : null
                  }
                  <div className="item-options">
                    <div>
                      <span className="type">
                        {
                          this.getTypeDisplay(field)
                        }
                      </span>
                      <span className="text-danger">
                        {field.options && field.options.required ? '必须' : ''}
                      </span>
                    </div>
                    <div className="desc">{field.desc || ''}</div>
                    <div className="help-block">
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
