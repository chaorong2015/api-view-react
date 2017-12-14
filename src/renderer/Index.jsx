/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/25.
 * chaorong@maichong.it
 */

// @flow

import React from 'react';
import ApiMenu from './ApiMenu';
import ApiInfoWrapper from './ApiInfoWrapper';
import type {
  ApiDescription,
  ApiGroup,
  ApiRoute,
  ApiObject,
  ApiTuple,
  ApiCode,
  ApiField,
  ApiScope,
  ApiResponse
} from '../../../types';

type Props = {
  value: {
    groups: Array<ApiGroup>,
    routes: Array<ApiRoute>,
    descriptions: Array<ApiDescription>,
    objects: Array<ApiObject>,
    tuples: Array<ApiTuple>,
    codes: Array<ApiCode>,
    fields: Array<ApiField>,
    scopes: Array<ApiScope>,
    responses: Array<ApiResponse>
  },
  menuBaseUrl: string,
  className?: string,
  isDownload?: boolean
};

export default class Index extends React.Component<Props> {
  static defaultProps = {
    className: '',
    menuBaseUrl: '',
    isDownload: false
  };

  render() {
    const { value, isDownload } = this.props;
    let className = 'api-view';
    if (this.props.className) {
      className += (' ' + this.props.className);
    }
    return (
      <div className={className}>
        <ApiMenu
          className="scrollbar-v-xs"
          mode="view"
          isDownload={isDownload}
          baseUrl={this.props.menuBaseUrl}
          value={this.props.value}
        />
        <ApiInfoWrapper baseUrl={this.props.menuBaseUrl} value={value} />
      </div>
    );
  }
}
