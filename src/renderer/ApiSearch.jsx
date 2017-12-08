/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/12/3.
 * chaorong@maichong.it
 */

import React from 'react';

type Props = {
  onChange?: Function
};

export default class ApiSearch extends React.Component<Props> {
  render() {
    let { onChange } = this.props;
    return (
      <div className="api-search">
        {
          onChange ?
            <input
              type="text"
              name="search"
              className="form-control input-search"
              placeholder="快速检索"
              onChange={(e) => onChange(e.target.value)}
            /> :
            <input
              type="text"
              name="search"
              className="form-control input-search"
              placeholder="快速检索"
            />
        }
      </div>
    );
  }
}
