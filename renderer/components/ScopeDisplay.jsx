/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/23.
 * chaorong@maichong.it
 */

import _ from 'lodash';
import React from 'react';
import CheckBox from './CheckBox';

export default class extends React.Component {
  static defaultProps = {
    className: ''
  };

  props: {
    className?: string;
    value: {
      title: string;
      scopes: Array<Object>
    };
  };

  render() {
    let { value } = this.props;
    let className = this.props.className ?
      'object-scope-display ' + this.props.className : 'object-scope-display';
    return (
      <div className={className}>
        <div className="title">Scopes列表</div>
        <div className="scope-table-panel">
          <table>
            <thead>
              <tr>
                <th />
                <th>
                  {
                    value.title
                  }
                </th>
                {
                  value.scopes.map((scope) => (
                    <th key={scope.id}>
                      {scope.title}
                    </th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                value.fields && value.fields.map((field) => (
                  <tr key={field.id}>
                    <td className="text-left">
                      <span className="scope-title">{field.title}</span>
                    </td>
                    <td>
                      <CheckBox checked disabled />
                    </td>
                    {
                      value.scopes && value.scopes.map((scope) => (
                        <td key={scope.id}>
                          <CheckBox
                            checked={_.indexOf(scope.fields, field.title) < 0}
                            disabled
                          />
                        </td>
                      ))
                    }
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
