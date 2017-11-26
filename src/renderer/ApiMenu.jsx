/**
 * @copyright Maichong Software Ltd. 2017 http://maichong.it
 * @date 2017-11-10
 * @author Pang <pang@maichong.it>
 */

// @flow

import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import { getLocalStorage, setLocalStorage } from './utils/local-storage';

export default class ApiMenu extends React.Component {
  static defaultProps = {
    className: '',
    activeGroup: '',
    mode: 'view',
    baseUrl: '',
    value: {
      groups: [],
      routes: [], ///////路由
      descriptions: [],
      objects: [],
      tuples: [],
      schemas: []
    }
  };
  props: {
    className?:string,
    mode?:string,
    // activeGroup?:Array<string>, //groupId 或者 key: object、tuple、schema
    baseUrl:string, //基础路由 例如 /[projectId]/api/[libraryPath]/version/[version]
    value: {
      groups: Array<Object>,
      routes: Array<Object>,
      descriptions: Array<Object>,
      objects: Array<Object>,
      tuples: Array<Object>,
      schemas: Array<Object>
    }
  };

  state = {
    activeGroup: []
  };

  constructor(props: Object) {
    super(props);
    let localActive = getLocalStorage('api-menu-active-group');
    if (localActive && typeof localActive === 'string') {
      localActive = localActive.split(',');
    }
    this.state = {
      activeGroup: localActive || []
    };
  }

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
    setLocalStorage('api-menu-active-group', activeGroup);
  };
  //获取路由
  getUrl = (type: string, id?: string) => {
    let { baseUrl, mode } = this.props;
    if (!id) {
      return mode === 'view' ? baseUrl + '#' + type : baseUrl + '/' + type;
    }
    return mode === 'view' ? baseUrl + '#' + type + '-' + id : baseUrl + '/' + type + '/' + id;
  };
  //初始化分组
  getMapGroup(props:Object) {
    let { value } = props;
    let mapGroup = {};
    if (value.groups) {
      _.map(value.groups, (group) => {
        mapGroup[group.id] = {
          id: group.id,
          title: group.title,
          url: this.getUrl('group', group.id),
          routes: []
        };
      });
      _.map(value.routes, (route) => {
        if (route.group && mapGroup[route.group]) {
          mapGroup[route.group].routes.push(
            Object.assign({ url: this.getUrl('route', route.id) }, route)
          );
        }
      });
    }
    return mapGroup;
  }

  render() {
    let { value, className, mode, baseUrl } = this.props;
    let { activeGroup } = this.state;
    let mapGroup = this.getMapGroup(this.props);
    //console.log('======value', value);
    return (
      <div className={className ? className + ' api-menu' : 'api-menu'}>
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
              >{desc.title}</Link> :
              <a
                key={desc.id}
                href={this.getUrl('description', desc.id)}
                className="group group-description"
              >{desc.title}</a>
          ))
        }
        {
          _.map(mapGroup, (group) => (
            <div key={group.id} className={activeGroup.indexOf(group.id) >= 0 ? 'menu' : 'menu active'}>
              <div className="display-flex">
                {
                  mode !== 'view' ?
                    <Link
                      to={this.getUrl('group', group.id)}
                      className="group group-route flex"
                    >
                      {group.title}
                    </Link> :
                    <a
                      href={this.getUrl('group', group.id)}
                      className="group group-route flex"
                    >
                      {group.title}
                    </a>
                }
                {
                  group.routes && group.routes.length ?
                    <span
                      className="icon pull-right padding-h-sm"
                      onClick={() => this.openSub(group.id)}
                    >
                      <i className="fa fa-angle-right" />
                      <i className="fa fa-angle-down" />
                    </span> : null
                }
              </div>
              {
                _.map(group.routes, (route) => {
                  //console.log('======route', route);
                  if (mode !== 'view') {
                    return (
                      <Link
                        key={route.id}
                        to={this.getUrl('route', route.id)}
                        className="sub sub-route"
                      >{route.title}</Link>
                    );
                  }
                  return (
                    <a
                      key={route.id}
                      href={this.getUrl('route', route.id)}
                      className="sub sub-route"
                    >{route.title}</a>
                  );
                })
              }
            </div>
          ))
        }
        <div className={activeGroup.indexOf('object') >= 0 ? 'menu' : 'menu active'}>
          <div className="display-flex">
            <div className="group group-object flex">对象</div>
            {
              value.objects && value.objects.length ?
                <span
                  className="icon pull-right padding-h-sm"
                  onClick={() => this.openSub('object')}
                >
                  <i className="fa fa-angle-right" />
                  <i className="fa fa-angle-down" />
                </span> : null
            }
          </div>
          {
            _.map(value.objects, (o) => (
              mode !== 'view' ?
                <Link key={o.id} to={this.getUrl('object', o.id)} className="sub sub-object">
                  {o.title}
                  {
                    o.share ? <span className="v-required-icon text-danger">*</span> : null
                  }
                </Link> :
                <a key={o.id} href={this.getUrl('object', o.id)} className="sub sub-object">
                  {o.title}
                  {
                    o.share ? <span className="v-required-icon text-danger">*</span> : null
                  }
                </a>
            ))
          }
        </div>
        <div className={activeGroup.indexOf('tuple') >= 0 ? 'menu' : 'menu active'}>
          <div className="display-flex">
            <div className="group group-object flex">元组</div>
            {
              value.tuples && value.tuples.length ?
                <span
                  className="icon pull-right padding-h-sm"
                  onClick={() => this.openSub('tuple')}
                >
                  <i className="fa fa-angle-right" />
                  <i className="fa fa-angle-down" />
                </span> : null
            }
          </div>
          {
            _.map(value.tuples, (t) => (
              mode !== 'view' ?
                <Link key={t.id} to={this.getUrl('tuple', t.id)} className="sub sub-tuple">
                  [{t.title}]
                  {
                    t.share ? <span className="v-required-icon text-danger">*</span> : null
                  }
                </Link> :
                <a key={t.id} href={this.getUrl('tuple', t.id)} className="sub sub-tuple">
                  [{t.title}]
                  {
                    t.share ? <span className="v-required-icon text-danger">*</span> : null
                  }
                </a>
            ))
          }
        </div>
        <div className={activeGroup.indexOf('code') >= 0 ? 'menu' : 'menu active'}>
          {
            mode !== 'view' ?
              <Link to={this.getUrl('code')} className="group group-code" >状态码</Link> :
              <a href={this.getUrl('code')} className="group group-code" >状态码</a>
          }
        </div>
      </div>
    );
  }
}
