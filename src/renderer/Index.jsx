/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/25.
 * chaorong@maichong.it
 */

// @flow

import React from 'react';
import _ from 'lodash';
import ApiMenu from './ApiMenu';
import ApiInfoWrapper from './ApiInfoWrapper';
import { setFieldMaps } from './utils/field-manage';
import type {
  Description,
  Group,
  Route,
  ObjectModel,
  Tuple,
  Code,
  Field,
  Scope,
  Response,
  MapGroup
} from './types';

type Props = {
  groups: Array<Group>,
  routes: Array<Route>,
  descriptions: Array<Description>,
  objects: Array<ObjectModel>,
  tuples: Array<Tuple>,
  codes: Array<Code>,
  fields: Array<Field>,
  scopes: Array<Scope>,
  responses: Array<Response>,
  menuBaseUrl: string,
  className?: string,
  isDownload?: boolean,
  callBackComponentUpdate?: Function|null, //报告父级组件已更新，等待父级判断是否还需要更新
  shouldComponentUpdate?: boolean //是否需要更新组件 shouldComponentUpdate
};

type State = {
  mapGroup: MapGroup
}

export default class Index extends React.Component<Props, State> {
  static defaultProps = {
    className: '',
    menuBaseUrl: '',
    isDownload: false,
    callBackComponentUpdate: null,
    shouldComponentUpdate: undefined //默认不定义，callBackComponentUpdate, shouldComponentUpdate同时存在才有效
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      mapGroup: this.getMapGroup(props)
    };
    setFieldMaps(props.fields);
  }

  componentWillReceiveProps(nextProps: Props) {
    let { shouldComponentUpdate, callBackComponentUpdate } = nextProps;
    //父级控制更新
    if (typeof callBackComponentUpdate === 'function' && !callBackComponentUpdate
      && typeof shouldComponentUpdate !== 'undefined') {
      if (shouldComponentUpdate) {
        if (!_.isEqual(this.props.fields, nextProps.fields)) {
          setFieldMaps(nextProps.fields);
        }
        if (!_.isEqual(this.props.groups, nextProps.groups) || !_.isEqual(this.props.routes, nextProps.routes)) {
          this.setState({ mapGroup: this.getMapGroup(nextProps) });
        }
      }
      return;
    }
    //父级没控制更新，自行判断更新
    if (!_.isEqual(this.props.fields, nextProps.fields)) {
      setFieldMaps(nextProps.fields);
    }
    if (!_.isEqual(this.props.groups, nextProps.groups) ||
      !_.isEqual(this.props.routes, nextProps.routes)) {
      this.setState({ mapGroup: this.getMapGroup(nextProps) });
    }
  }

  shouldComponentUpdate(nextProps: Props) {
    let { shouldComponentUpdate, callBackComponentUpdate } = this.props;
    //父级控制更新
    if (typeof callBackComponentUpdate === 'function' && !callBackComponentUpdate
      && typeof shouldComponentUpdate !== 'undefined') {
      if (shouldComponentUpdate !== nextProps.shouldComponentUpdate) {
        //更新父级
        callBackComponentUpdate();
      }
      return shouldComponentUpdate;
    }
    //父级没控制更新，自行判断更新
    if (!_.isEqual(this.props.groups, nextProps.groups) ||
      !_.isEqual(this.props.routes, nextProps.routes) ||
      !_.isEqual(this.props.descriptions, nextProps.descriptions) ||
      !_.isEqual(this.props.fields, nextProps.fields) ||
      !_.isEqual(this.props.objects, nextProps.objects) ||
      !_.isEqual(this.props.tuples, nextProps.tuples) ||
      !_.isEqual(this.props.codes, nextProps.codes) ||
      !_.isEqual(this.props.scopes, nextProps.scopes) ||
      !_.isEqual(this.props.responses, nextProps.responses)) {
      return true;
    }
    return false;
  }

  //初始化分组
  getMapGroup(props:Props):Object {
    let { groups, routes } = props;
    let mapGroup = {};
    if (groups) {
      _.map(groups, (group) => {
        mapGroup[group.id] = {
          id: group.id,
          title: group.title,
          routes: []
        };
      });
      _.map(routes, (route) => {
        if (route.group && mapGroup[route.group]) {
          mapGroup[route.group].routes.push(route);
        }
      });
    }
    return mapGroup;
  }

  render() {
    let className = 'api-view';
    if (this.props.className) {
      className += (' ' + this.props.className);
    }
    // console.log('======Index');
    return (
      <div className={className}>
        <ApiMenu
          className="scrollbar-v-xs"
          mode="view"
          isDownload={this.props.isDownload}
          baseUrl={this.props.menuBaseUrl}
          mapGroup={this.state.mapGroup}
          descriptions={this.props.descriptions}
          codes={this.props.codes}
          tuples={this.props.tuples}
          objects={this.props.objects}
        />
        <ApiInfoWrapper
          baseUrl={this.props.menuBaseUrl}
          mapGroup={this.state.mapGroup}
          descriptions={this.props.descriptions}
          codes={this.props.codes}
          tuples={this.props.tuples}
          objects={this.props.objects}
          scopes={this.props.scopes}
          fields={this.props.fields}
          responses={this.props.responses}
        />
      </div>
    );
  }
}
