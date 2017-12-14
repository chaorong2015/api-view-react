/**
 * @copyright Maichong Software Ltd. 2017 http://maichong.it
 * @date 2017-11-10
 * @author Pang <pang@maichong.it>
 */

// @flow

import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import ApiSearch from './ApiSearch';
import MenuItems from './components/MenuItems';
import type {
  ApiDescription,
  ApiGroup,
  ApiObject,
  ApiTuple,
  ApiRoute,
  ApiCode
} from '../../../types';

type Props = {
  className?: string,
  mode?: string,
  isDownload?: boolean,
  baseUrl: string, //基础路由 例如 /[projectId]/api/[libraryPath]/[version]
  value: {
    groups: Array<ApiGroup>,
    routes: Array<ApiRoute>,
    descriptions: Array<ApiDescription>,
    objects: Array<ApiObject>,
    tuples: Array<ApiTuple>,
    codes: Array<ApiCode>
  }
};

type State = {
  mapGroup: Object
};

export default class ApiMenu extends React.Component<Props, State> {
  static defaultProps = {
    className: '',
    activeGroup: '',
    mode: 'view',
    isDownload: false,
    baseUrl: '',
    value: {
      groups: [],
      routes: [], ///////路由
      descriptions: [],
      objects: [],
      tuples: [],
      codes: []
    }
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      mapGroup: this.getMapGroup(props)
    };
  }

  componentWillReceiveProps(props: Props) {
    if (props.value && this.props.value && (!_.isEqual(this.props.value.groups, props.value.groups)
      || !_.isEqual(this.props.value.routes, props.value.routes))) {
      this.setState({ mapGroup: this.getMapGroup(props) });
    }
  }
  //获取路由
  getUrl = (type: string, id?: string) => {
    let { baseUrl, mode } = this.props;
    if (!id) {
      return mode === 'view' ? baseUrl + '#' + type : baseUrl + '/' + type;
    }
    return mode === 'view' ? baseUrl + '#' + type + '-' + id : baseUrl + '/' + type + '/' + id;
  };
  //初始化分组
  getMapGroup(props:Props):Object {
    // console.log('====getMapGroup');
    let { value } = props;
    let mapGroup = {};
    if (value.groups) {
      _.map(value.groups, (group) => {
        mapGroup[group.id] = {
          id: group.id,
          title: group.title,
          routes: []
        };
      });
      _.map(value.routes, (route) => {
        if (route.group && mapGroup[route.group]) {
          mapGroup[route.group].routes.push(route);
        }
      });
    }
    return mapGroup;
  }

  render() {
    let {
      value, className, mode, baseUrl
    } = this.props;
    let { mapGroup } = this.state;
    return (
      <div className={className ? className + ' api-menu' : 'api-menu'}>
        {
          this.props.isDownload ? <ApiSearch /> : null
        }
        {
          mode !== 'view' ?
            <Link to={`${baseUrl}/library`} className="group group-setting">设置</Link> : null
        }
        {
          _.map(value.descriptions, (desc) => (
            mode !== 'view' ?
              <Link
                key={desc.id}
                to={this.getUrl('description', desc.id)}
                className="group group-description"
              >
                {desc.title}
              </Link> :
              <a
                key={desc.id}
                href={this.getUrl('description', desc.id)}
                className="group group-description"
              >
                {desc.title}
              </a>
          ))
        }
        {
          _.map(mapGroup, (group) => (
            <MenuItems
              key={group.id}
              mode={this.props.mode}
              isDownload={this.props.isDownload}
              baseUrl={this.props.baseUrl}
              type="group"
              value={{ title: group.title, id: group.id, items: group.routes }}
            />
          ))
        }
        <MenuItems
          mode={this.props.mode}
          isDownload={this.props.isDownload}
          baseUrl={this.props.baseUrl}
          type="object"
          value={{ title: '对象', id: 'object', items: value.objects }}
        />
        <MenuItems
          mode={this.props.mode}
          isDownload={this.props.isDownload}
          baseUrl={this.props.baseUrl}
          type="tuple"
          value={{ title: '元组', id: 'tuple', items: value.tuples }}
        />
        {
          value.codes && value.codes.length ?
            <div className="menu">
              {
                mode !== 'view' ?
                  <Link to={this.getUrl('code')} className="group group-code">状态码</Link> :
                  <a href={this.getUrl('code')} className="group group-code">状态码</a>
              }
            </div> : null
        }
      </div>
    );
  }
}
