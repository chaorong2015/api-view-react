/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/12/13.
 * chaorong@maichong.it
 */

import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { getLocalStorage, setLocalStorage } from '../utils/local-storage';

type Props = {
  className?: string,
  mode?: string,
  isDownload?: boolean,
  baseUrl?: string, //基础路由 例如 /[projectId]/api/[libraryPath]/[version]
  type: string, //菜单类型 object、tuple、group
  value: {
    title: string,
    id: string,
    items: Array<Object>
  }
};

type State = {
  activeGroup: Array<string>,
  menu: Object
};

export default class MenuItems extends React.Component<Props, State> {
  static defaultProps = {
    className: '',
    mode: 'view',
    isDownload: false,
    baseUrl: ''
  };

  constructor(props: Props) {
    super(props);
    let localActive = !this.props.isDownload ? getLocalStorage('api-menu-active-group') : '';
    if (localActive && typeof localActive === 'string') {
      localActive = localActive.split(',');
    }
    this.state = {
      activeGroup: localActive || [],
      menu: this.updateMenu(props)
    };
  }

  componentWillReceiveProps(props: Props) {
    if (props && this.props && !_.isEqual(this.props.value, props.value)) {
      this.setState({ menu: this.updateMenu(props) });
    }
  }

  //更新菜单
  updateMenu = (props: Props):Object => {
    // console.log('====type', props.type);
    let { type, value, mode } = props;
    let itemType = type === 'group' ? 'route' : type;
    return (
      <div className="menu-group">
        <div className="display-flex" onClick={() => this.openSub(value.id)}>
          {
            mode !== 'view' ?
              <Link
                to={this.getUrl(type, value.id)}
                className={`group group-${itemType} flex`}
              >
                {value.title}
              </Link> :
              <a
                href={this.getUrl(type, value.id)}
                className={`group group-${itemType} flex`}
              >
                {value.title}
              </a>
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
          _.map(value.items, (item) => {
            //console.log('======route', route);
            if (mode !== 'view') {
              return (
                <Link
                  key={item.id}
                  to={this.getUrl(itemType, item.id)}
                  className={`sub sub-${itemType}`}
                >
                  {item.title}
                </Link>
              );
            }
            return (
              <a
                key={item.id}
                href={this.getUrl(itemType, item.id)}
                className={`sub sub-${itemType}`}
              >
                {item.title}
              </a>
            );
          })
        }
      </div>
    );
  };

  //打开子目录
  openSub = (id: string) => {
    let { activeGroup } = this.state;
    let index = activeGroup.indexOf(id);
    if (index < 0) {
      activeGroup.push(id);
    } else {
      activeGroup.splice(index, 1);
    }
    // console.error('activeGroup:', activeGroup);
    this.setState({ activeGroup });
    if (!this.props.isDownload) setLocalStorage('api-menu-active-group', activeGroup);
  };
  //获取路由
  getUrl = (type: string, id?: string) => {
    let { baseUrl, mode } = this.props;
    if (!id) {
      return mode === 'view' ? baseUrl + '#' + type : baseUrl + '/' + type;
    }
    return mode === 'view' ? baseUrl + '#' + type + '-' + id : baseUrl + '/' + type + '/' + id;
  };

  render() {
    let { value, type } = this.props;
    let { activeGroup } = this.state;
    let className = 'menu';
    if (this.props.className) className = +' ' + this.props.className;
    if (!value) return <div />;
    if (type !== 'group' && (!value.items || !value.items.length)) return <div />;
    return (
      <div className={activeGroup.indexOf(value.id) < 0 ? className : 'menu active'}>
        {
          this.state.menu
        }
      </div>
    );
  }
}
