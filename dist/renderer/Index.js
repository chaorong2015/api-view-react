'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ApiMenu = require('./ApiMenu');

var _ApiMenu2 = _interopRequireDefault(_ApiMenu);

var _ApiInfoWrapper = require('./ApiInfoWrapper');

var _ApiInfoWrapper2 = _interopRequireDefault(_ApiInfoWrapper);

var _fieldManage = require('./utils/field-manage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Index extends _react2.default.Component {

  constructor(props) {
    super(props);
    this.state = {
      mapGroup: this.getMapGroup(props)
    };
    (0, _fieldManage.setFieldMaps)(props.fields);
  }

  componentWillReceiveProps(nextProps) {
    let { shouldComponentUpdate, callBackComponentUpdate } = nextProps;
    //父级控制更新
    if (typeof callBackComponentUpdate === 'function' && !callBackComponentUpdate && typeof shouldComponentUpdate !== 'undefined') {
      if (shouldComponentUpdate) {
        if (!_lodash2.default.isEqual(this.props.fields, nextProps.fields)) {
          (0, _fieldManage.setFieldMaps)(nextProps.fields);
        }
        if (!_lodash2.default.isEqual(this.props.groups, nextProps.groups) || !_lodash2.default.isEqual(this.props.routes, nextProps.routes)) {
          this.setState({ mapGroup: this.getMapGroup(nextProps) });
        }
      }
      return;
    }
    //父级没控制更新，自行判断更新
    if (!_lodash2.default.isEqual(this.props.fields, nextProps.fields)) {
      (0, _fieldManage.setFieldMaps)(nextProps.fields);
    }
    if (!_lodash2.default.isEqual(this.props.groups, nextProps.groups) || !_lodash2.default.isEqual(this.props.routes, nextProps.routes)) {
      this.setState({ mapGroup: this.getMapGroup(nextProps) });
    }
  }

  shouldComponentUpdate(nextProps) {
    let { shouldComponentUpdate, callBackComponentUpdate } = this.props;
    //父级控制更新
    if (typeof callBackComponentUpdate === 'function' && !callBackComponentUpdate && typeof shouldComponentUpdate !== 'undefined') {
      if (shouldComponentUpdate !== nextProps.shouldComponentUpdate) {
        //更新父级
        callBackComponentUpdate();
      }
      return shouldComponentUpdate;
    }
    //父级没控制更新，自行判断更新
    if (!_lodash2.default.isEqual(this.props.groups, nextProps.groups) || !_lodash2.default.isEqual(this.props.routes, nextProps.routes) || !_lodash2.default.isEqual(this.props.descriptions, nextProps.descriptions) || !_lodash2.default.isEqual(this.props.fields, nextProps.fields) || !_lodash2.default.isEqual(this.props.objects, nextProps.objects) || !_lodash2.default.isEqual(this.props.tuples, nextProps.tuples) || !_lodash2.default.isEqual(this.props.codes, nextProps.codes) || !_lodash2.default.isEqual(this.props.scopes, nextProps.scopes) || !_lodash2.default.isEqual(this.props.responses, nextProps.responses)) {
      return true;
    }
    return false;
  }

  //初始化分组
  getMapGroup(props) {
    let { groups, routes } = props;
    let mapGroup = {};
    if (groups) {
      _lodash2.default.map(groups, group => {
        mapGroup[group.id] = Object.assign({}, group, { routes: [] });
      });
      _lodash2.default.map(routes, route => {
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
      className += ' ' + this.props.className;
    }
    // console.log('======Index');
    return _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement(_ApiMenu2.default, {
        className: 'scrollbar-v-xs',
        mode: 'view',
        isDownload: this.props.isDownload,
        baseUrl: this.props.menuBaseUrl,
        mapGroup: this.state.mapGroup,
        descriptions: this.props.descriptions,
        codes: this.props.codes,
        tuples: this.props.tuples,
        objects: this.props.objects
      }),
      _react2.default.createElement(_ApiInfoWrapper2.default, {
        baseUrl: this.props.menuBaseUrl,
        mapGroup: this.state.mapGroup,
        descriptions: this.props.descriptions,
        codes: this.props.codes,
        tuples: this.props.tuples,
        objects: this.props.objects,
        scopes: this.props.scopes,
        fields: this.props.fields,
        responses: this.props.responses
      })
    );
  }
}
exports.default = Index; /**
                          * 脉冲软件
                          * http://maichong.it
                          * Created by Rong on 2017/11/25.
                          * chaorong@maichong.it
                          */

Index.defaultProps = {
  className: '',
  menuBaseUrl: '',
  isDownload: false,
  callBackComponentUpdate: null,
  shouldComponentUpdate: undefined //默认不定义，callBackComponentUpdate, shouldComponentUpdate同时存在才有效
};