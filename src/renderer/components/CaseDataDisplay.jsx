/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/17.
 * chaorong@maichong.it
 */

// @flow

import React from 'react';
import _ from 'lodash';
import type { ModelField } from '../types';
import { parseFieldJson } from '../utils/field-manage';
import JsonArrayDisplay from './JsonArrayDisplay';
import JsonObjectDisplay from './JsonObjectDisplay';

type Props = {
  defaultJson?: Object|null,
  className?: string,
  wrapType?: string, //包裹数据的外层类型
  type: string, //展示的数据类型
  value: Array<ModelField>
  // 数组中为Field对象，同时在对象中增加了{children:{...model, fields: []}},
  // model为Object、Tuple、Scope的字段
};
type State = {
  objectType: Array<string>,
  value: Array<Object>
};

export default class CaseDataDisplay extends React.Component<Props, State> {
  static defaultProps = {
    className: '',
    wrapType: '',
    defaultJson: null
  };

  render() {
    // console.log('======CaseDataDisplay');
    let {
      className, type, wrapType, value, defaultJson
    } = this.props;
    let json = null;
    if (!value || !value.length) {
      if (defaultJson) {
        json = defaultJson;
      } else return <div />;
    } else {
      json = parseFieldJson(value, type, wrapType || '');
    }
    // console.log('======json', json);
    if (_.isArray(json)) {
      if (value.length) {
        type = 'array';
      } else {
        type = 'array-empty';
      }
    } else if (_.isObject(json)) {
      if (_.isEmpty(value)) {
        type = 'object-empty';
      } else {
        type = 'object';
      }
    }
    return (
      <div className={className ? className + ' case-data-display' : 'case-data-display'}>
        {
          type === 'array-empty' ? <span className="array-empty">&#91;&nbsp;&#93;</span> : ''
        }
        {
          type === 'object-empty' ? <span className="object-empty">&#123;&nbsp;&#125;</span> : ''
        }
        {
          type === 'object' ? <div className="symbol-object">&#123;</div> : ''
        }
        {
          type === 'array' ? <div className="symbol-array">&#91;</div> : ''
        }
        {
          type === 'array' ? <JsonArrayDisplay index={1} jsonArray={json} /> : ''
        }
        {
          type === 'object' ? <JsonObjectDisplay index={1} jsonObject={json} /> : ''
        }
        {
          type === 'object' ? <div className="symbol-object">&#125;</div> : ''
        }
        {
          type === 'array' ? <div className="symbol-array">&#93;</div> : ''
        }
      </div>
    );
  }
}
