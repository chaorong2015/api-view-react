/**
 * @copyright Maichong Software Ltd. 2017 http://maichong.it
 * @date 2017-11-10
 * @author Pang <pang@maichong.it>
 */

// @flow

import React from 'react';
import _ from 'lodash';
import ApiSearch from './ApiSearch';
import MenuItems from './components/MenuItems';
import type {
  Description,
  ObjectModel,
  Tuple,
  Code,
  MapGroup
} from './types';

type Props = {
  className?: string,
  mode?: string,
  isDownload?: boolean,
  baseUrl: string, //基础路由 例如 /[projectId]/api/[libraryPath]/[version]
  mapGroup: MapGroup,
  descriptions: Array<Description>,
  objects: Array<ObjectModel>,
  tuples: Array<Tuple>,
  codes: Array<Code>
};

export default class ApiMenu extends React.Component<Props> {
  static defaultProps = {
    className: '',
    activeGroup: '',
    mode: 'view',
    isDownload: false,
    baseUrl: '',
    mapGroup: {},
    descriptions: [],
    objects: [],
    tuples: [],
    codes: []
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
    let {
      mapGroup, descriptions, objects, tuples, codes, className, isDownload
    } = this.props;
    // console.log('======ApiMenu');
    return (
      <div className={className ? className + ' api-menu' : 'api-menu'}>
        {
          isDownload ? <ApiSearch /> : null
        }
        {
          _.map(descriptions, (desc) => (
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
              isDownload={this.props.isDownload}
              baseUrl={this.props.baseUrl}
              type="group"
              value={{ title: group.title, id: group.id, items: group.routes }}
            />
          ))
        }
        <MenuItems
          isDownload={this.props.isDownload}
          baseUrl={this.props.baseUrl}
          type="object"
          value={{ title: '对象', id: '', items: objects }}
        />
        <MenuItems
          isDownload={this.props.isDownload}
          baseUrl={this.props.baseUrl}
          type="tuple"
          value={{ title: '元组', id: '', items: tuples }}
        />
        {
          codes && codes.length ?
            <div className="menu">
              <a href={this.getUrl('code')} className="group group-code">状态码</a>
            </div> : null
        }
      </div>
    );
  }
}
