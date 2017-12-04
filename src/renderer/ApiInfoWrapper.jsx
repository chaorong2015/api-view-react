/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/17.
 * chaorong@maichong.it
 */

// @flow

import React from 'react';
import _ from 'lodash';
import ApiDesc from './ApiDesc';
import ApiGroup from './ApiGroup';
import ApiRoute from './ApiRoute';
import ApiObject from './ApiObject';
import ApiTuple from './ApiTuple';
import ApiCode from './ApiCode';

type Props = {
  className?: string,
  baseUrl?: string,
  value: {
    groups: Array<Object>,
    routes: Array<Object>,
    descriptions: Array<Object>,
    objects: Array<Object>,
    tuples: Array<Object>,
    codes: Array<Object>,
    fields: Array<Object>,
    scopes: Array<Object>,
    responses: Array<Object>
  }
};
type State = {
  mapGroup: Object
};

export default class ApiInfoWrapper extends React.Component<Props, State> {
  static defaultProps = {
    className: '',
    baseUrl: ''
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      mapGroup: {}
    };
  }

  //初始化分组
  getMapGroup(props:Object) {
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
          mapGroup[route.group].routes.push(
            Object.assign(route)
          );
        }
      });
    }
    return mapGroup;
  }

  render() {
    let { value, className } = this.props;
    let mapGroup = this.getMapGroup(this.props);
    let relationData = {
      objects: value.objects,
      tuples: value.tuples,
      schemas: value.schemas,
      fields: value.fields,
      scopes: value.scopes,
      responses: value.responses
    };
    return (
      <div className={className ? className + ' api-info-wrapper' : 'api-info-wrapper'}>
        {
          value.descriptions && value.descriptions.length ? _.map(value.descriptions, (d) => (
              <div key={d.id}>
                <ApiDesc className="api-description" value={d} />
              </div>
            )) : null
        }
        {
          _.map(mapGroup, (group) => (
            <div key={group.id}>
              <ApiGroup className="api-group" value={group} />
              {
                _.map(group.routes, (route) => (
                  <ApiRoute
                    baseUrl={this.props.baseUrl || ''}
                    className="api-route"
                    key={route.id}
                    relation={relationData}
                    value={route}
                  />
                ))
              }
            </div>
          ))
        }
        {
          value.objects && value.objects.length ?
            <div>
              <div className="api-title-panel">
                <div className="title panel-left">对象</div>
                <div className="panel-right text-center" />
              </div>
              {
                _.map(value.objects, (o) => (
                  <ApiObject
                    key={o.id}
                    relation={relationData}
                    className="api-object"
                    value={o}
                    baseUrl={this.props.baseUrl || ''}
                  />
                ))
              }
            </div> : null
        }
        {
          value.tuples && value.tuples.length ?
            <div>
              <div className="api-title-panel">
                <div className="title panel-left">元组</div>
                <div className="panel-right text-center" />
              </div>
              {
                _.map(value.tuples, (t) => (
                  <ApiTuple
                    key={t.id}
                    relation={relationData}
                    className="api-tuple"
                    value={t}
                    baseUrl={this.props.baseUrl || ''}
                  />
                ))
              }
            </div> : null
        }
        {
          value.codes && value.codes.length ?
            <div>
              <ApiCode className="codes-panel api-codes" value={value.codes} />
            </div> : null
        }
        <div className="api-module-panel empty-panel">
          <div className="panel-left" />
          <div className="panel-right text-center" />
        </div>
      </div>
    );
  }
}
