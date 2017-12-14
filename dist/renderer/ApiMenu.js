'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactRouterDom = require('react-router-dom');

var _ApiSearch = require('./ApiSearch');

var _ApiSearch2 = _interopRequireDefault(_ApiSearch);

var _MenuItems = require('./components/MenuItems');

var _MenuItems2 = _interopRequireDefault(_MenuItems);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ApiMenu extends _react2.default.Component {

  constructor(props) {
    super(props);

    this.getUrl = (type, id) => {
      let { baseUrl, mode } = this.props;
      if (!id) {
        return mode === 'view' ? baseUrl + '#' + type : baseUrl + '/' + type;
      }
      return mode === 'view' ? baseUrl + '#' + type + '-' + id : baseUrl + '/' + type + '/' + id;
    };

    this.state = {
      mapGroup: this.getMapGroup(props)
    };
  }

  componentWillReceiveProps(props) {
    if (props.value && this.props.value && (!_lodash2.default.isEqual(this.props.value.groups, props.value.groups) || !_lodash2.default.isEqual(this.props.value.routes, props.value.routes))) {
      this.setState({ mapGroup: this.getMapGroup(props) });
    }
  }
  //获取路由

  //初始化分组
  getMapGroup(props) {
    // console.log('====getMapGroup');
    let { value } = props;
    let mapGroup = {};
    if (value.groups) {
      _lodash2.default.map(value.groups, group => {
        mapGroup[group.id] = {
          id: group.id,
          title: group.title,
          routes: []
        };
      });
      _lodash2.default.map(value.routes, route => {
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
    return _react2.default.createElement(
      'div',
      { className: className ? className + ' api-menu' : 'api-menu' },
      this.props.isDownload ? _react2.default.createElement(_ApiSearch2.default, null) : null,
      mode !== 'view' ? _react2.default.createElement(
        _reactRouterDom.Link,
        { to: `${baseUrl}/library`, className: 'group group-setting' },
        '\u8BBE\u7F6E'
      ) : null,
      _lodash2.default.map(value.descriptions, desc => mode !== 'view' ? _react2.default.createElement(
        _reactRouterDom.Link,
        {
          key: desc.id,
          to: this.getUrl('description', desc.id),
          className: 'group group-description'
        },
        desc.title
      ) : _react2.default.createElement(
        'a',
        {
          key: desc.id,
          href: this.getUrl('description', desc.id),
          className: 'group group-description'
        },
        desc.title
      )),
      _lodash2.default.map(mapGroup, group => _react2.default.createElement(_MenuItems2.default, {
        key: group.id,
        mode: this.props.mode,
        isDownload: this.props.isDownload,
        baseUrl: this.props.baseUrl,
        type: 'group',
        value: { title: group.title, id: group.id, items: group.routes }
      })),
      _react2.default.createElement(_MenuItems2.default, {
        mode: this.props.mode,
        isDownload: this.props.isDownload,
        baseUrl: this.props.baseUrl,
        type: 'object',
        value: { title: '对象', id: 'object', items: value.objects }
      }),
      _react2.default.createElement(_MenuItems2.default, {
        mode: this.props.mode,
        isDownload: this.props.isDownload,
        baseUrl: this.props.baseUrl,
        type: 'tuple',
        value: { title: '元组', id: 'tuple', items: value.tuples }
      }),
      value.codes && value.codes.length ? _react2.default.createElement(
        'div',
        { className: 'menu' },
        mode !== 'view' ? _react2.default.createElement(
          _reactRouterDom.Link,
          { to: this.getUrl('code'), className: 'group group-code' },
          '\u72B6\u6001\u7801'
        ) : _react2.default.createElement(
          'a',
          { href: this.getUrl('code'), className: 'group group-code' },
          '\u72B6\u6001\u7801'
        )
      ) : null
    );
  }
}
exports.default = ApiMenu; /**
                            * @copyright Maichong Software Ltd. 2017 http://maichong.it
                            * @date 2017-11-10
                            * @author Pang <pang@maichong.it>
                            */

ApiMenu.defaultProps = {
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