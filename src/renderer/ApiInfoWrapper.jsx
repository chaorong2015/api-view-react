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
import type {
  Description,
  ObjectModel,
  Tuple,
  Code,
  Field,
  Scope,
  Response,
  MapGroup
} from './types';

type Props = {
  className?: string,
  baseUrl?: string,
  descriptions: Array<Description>,
  objects: Array<ObjectModel>,
  tuples: Array<Tuple>,
  codes: Array<Code>,
  fields: Array<Field>,
  scopes: Array<Scope>,
  responses: Array<Response>,
  mapGroup: MapGroup
};

export default class ApiInfoWrapper extends React.Component<Props> {
  static defaultProps = {
    className: '',
    baseUrl: ''
  };

  render() {
    let {
      mapGroup, descriptions, objects, tuples, codes, fields, scopes, responses, className
    } = this.props;
    let relationData = {
      objects,
      tuples,
      fields,
      scopes,
      responses
    };
    // console.log('======ApiInfoWrapper');
    return (
      <div className={className ? className + ' api-info-wrapper' : 'api-info-wrapper'}>
        {
          descriptions && descriptions.length ? _.map(descriptions, (d) => (
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
          objects && objects.length ?
            <div>
              <div className="api-title-panel">
                <div className="title panel-left">对象</div>
                <div className="panel-right text-center" />
              </div>
              {
                _.map(objects, (o) => (
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
          tuples && tuples.length ?
            <div>
              <div className="api-title-panel">
                <div className="title panel-left">元组</div>
                <div className="panel-right text-center" />
              </div>
              {
                _.map(tuples, (t) => (
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
          codes && codes.length ?
            <div>
              <ApiCode className="codes-panel api-codes" value={codes} />
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
