/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/23.
 * chaorong@maichong.it
 */

// @flow

import _ from 'lodash';
import React from 'react';
import CheckBox from './CheckBox';

type Props = {
  className?: string,
  value: {
    title: string,
    scopes: Array<Object>,
    fields: Array<Object>
  }
};

export default class extends React.Component<Props> {
  static defaultProps = {
    className: ''
  };

  render() {
    let { value } = this.props;
    let className = this.props.className ?
      'object-scope-display ' + this.props.className : 'object-scope-display';
    return (
      <div className={className}>
        <div className="padding-v-sm">Scopes列表</div>
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
                      <CheckBox checked disabled onChange={() => {}} />
                    </td>
                    {
                      value.scopes && value.scopes.map((scope) => (
                        <td key={scope.id}>
                          <CheckBox
                            checked={_.indexOf(scope.fields, field.title) < 0}
                            disabled
                            onChange={() => {}}
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
