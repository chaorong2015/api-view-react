/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/12/17.
 * chaorong@maichong.it
 */

import React from 'react';
import _ from 'lodash';
import JsonArrayDisplay from './JsonArrayDisplay';
import JsonObjectDisplay from './JsonObjectDisplay';

type Props = {
  property: string,
  value: any,
  next?: boolean,
  level: number
};

export default class JsonPropertyDisplay extends React.Component<Props> {
  static defaultProps = {
    property: '',
    value: '',
    next: false,
    level: 1
  };

  toggleField = () => {
    let ref = this.ref;
    if (ref) {
      let className = ref.className;
      if (className.indexOf('collapsed') > -1) {
        ref.className = 'json-property';
        return;
      }
      ref.className = 'json-property collapsed';
    }
  };

  render() {
    let {
      property, value, next, level
    } = this.props;
    let type = '';
    if (_.isArray(value)) {
      if (value.length) {
        type = 'array';
      } else {
        type = 'array-empty';
      }
    } else if (_.isNull(value)) {
      type = 'null';
    } else if (_.isBoolean(value)) {
      type = 'boolean';
    } else if (_.isObject(value)) {
      if (_.isEmpty(value)) {
        type = 'object-empty';
      } else {
        type = 'object';
      }
    } else if (_.isString(value)) {
      type = 'string';
    } else if (_.isNumber(value)) {
      type = 'number';
    }
    let specificType = ['object-empty', 'object', 'array', 'array-empty', 'string', 'null'];
    let className = 'json-property';
    if (parseInt(level) > 1) className += ' collapsed';
    return (
      <div className={className} ref={(ref) => { this.ref = ref; }}>
        {
          type === 'array' || type === 'object' ?
            <div
              className="icon icon-toggle-property"
              onClick={() => this.toggleField()}
            /> : null
        }
        <div className="line-property">
          {
            property ?
              <span className="property">
                &quot;{property}&quot;<span className="colon">:&nbsp;</span>
              </span> : ''
          }
          {
            type === 'array' ? <span className="symbol-array">&#91;</span> : ''
          }
          {
            type === 'object' ? <div className="symbol-object">&#123;</div> : ''
          }
          {
            type === 'array-empty' ? <span className="array-empty">&#91;&nbsp;&#93;</span> : ''
          }
          {
            type === 'object-empty' ? <span className="object-empty">&#123;&nbsp;&#125;</span> : ''
          }
          {
            type === 'null' ?
              <div className="value null">
                null&nbsp;
                <span>{next ? ',' : ''}</span>
              </div> : ''
          }
          {
            type === 'string' ?
              <div className="value string">
                &quot;{value}&quot;&nbsp;
                <span>{next ? ',' : ''}</span>
              </div> : ''
          }
          {
            specificType.indexOf(type) < 0 ?
              <div className={`value ${type}`}>
                {value}&nbsp;
                <span>{next ? ',' : ''}</span>
              </div> : ''
          }
          {
            type === 'object' ?
              <div className="ellipsis symbol-object">
                &nbsp;...&nbsp;&#125;&nbsp;{next ? ',' : ''}
              </div> : ''
          }
          {
            type === 'array' ?
              <div className="ellipsis symbol-array">
                &nbsp;...&nbsp;&#93;&nbsp;{next ? ',' : ''}
              </div> : ''
          }
        </div>
        {
          type === 'array' ? <JsonArrayDisplay level={level + 1} jsonArray={value} /> : ''
        }
        {
          type === 'object' ? <JsonObjectDisplay level={level + 1} jsonObject={value} /> : ''
        }
        {
          type === 'object' ? <div className="symbol-end symbol-object">&#125;&nbsp;{next ? ',' : ''}</div> : ''
        }
        {
          type === 'array' ? <div className="symbol-end symbol-array">&#93;&nbsp;{next ? ',' : ''}</div> : ''
        }
      </div>
    );
  }
}
