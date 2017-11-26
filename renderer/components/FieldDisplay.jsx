/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/17.
 * chaorong@maichong.it
 */

import React from 'react';
import _ from 'lodash';

export default class FieldDisplay extends React.Component {
  static defaultProps = {
    className: ''
  };
  props: {
    className?: string;
    value: Array<Object>;
    // 数组中为Field对象，同时在对象中增加了{children:{...model, fields: []}},
    // model为Object、Tuple、Scope的字段
  };

  render() {
    let { className, value } = this.props;
    // console.log('======value:', value);
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
                          field.type
                        }
                      </span>
                      <span className="text-danger">
                        {field.options && field.options.required ? '必须' : ''}
                      </span>
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
