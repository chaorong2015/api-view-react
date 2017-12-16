/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/12/13.
 * chaorong@maichong.it
 */

import React from 'react';
import _ from 'lodash';

type Props = {
  className?: string,
  baseUrl?: string, //基础路由 例如 /[projectId]/api/[libraryPath]/[version]
  type: string, //菜单类型 object、tuple、group
  value: {
    title: string,
    id: string,
    items: Array<Object>
  }
};

export default class MenuItems extends React.Component<Props> {
  static defaultProps = {
    className: '',
    mode: 'view',
    baseUrl: ''
  };

  ref = null;

  //打开子目录
  openSub = () => {
    if (this.ref) {
      let className = this.ref.className;
      if (className.indexOf('active') > -1) {
        this.ref.className = _.filter(this.ref.classList, (cls) => (cls !== 'active')).join(' ');
        return;
      }
      this.ref.className = className + ' active';
    }
  };
  //获取路由
  getUrl = (type: string, id?: string) => {
    let { baseUrl } = this.props;
    if (!id) {
      return baseUrl + '#' + type;
    }
    return baseUrl + '#' + type + '-' + id;
  };

  render() {
    let { value, type } = this.props;
    let itemType = type === 'group' ? 'route' : type;
    let className = 'menu';
    if (this.props.className) className = +' ' + this.props.className;
    if (!value) return <div />;
    if (!value.id && (!value.items || !value.items.length)) return <div />;
    // console.log('======MenuItems');
    return (
      <div ref={(ref) => { this.ref = ref; }} className={className}>
        <div className="display-flex menu-group" onClick={() => this.openSub()}>
          {
            value.id ?
              <a href={this.getUrl(type, value.id)} className={`group group-${itemType} flex`}>
                {value.title}
              </a> :
              <div className={`group group-${itemType} flex`}>
                {value.title}
              </div>
          }
          {
            value.items && value.items.length ?
              <div
                className="icon icon-link pull-right padding-h-sm"
              >
                <i className="fa fa-angle-right" />
                <i className="fa fa-angle-down" />
              </div> : null
          }
        </div>
        {
          _.map(value.items, (item) => (
            <a key={item.id} href={this.getUrl(itemType, item.id)} className={`sub sub-${itemType}`}>
              {item.title}
            </a>
          ))
        }
      </div>
    );
  }
}
