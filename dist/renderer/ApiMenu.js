'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactRouterDom = require('react-router-dom');

var _localStorage = require('./utils/local-storage');

var _ApiSearch = require('./ApiSearch');

var _ApiSearch2 = _interopRequireDefault(_ApiSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ApiMenu extends _react2.default.Component {

  constructor(props) {
    super(props);

    this.openSub = id => {
      let { activeGroup } = this.state;
      let index = activeGroup.indexOf(id);
      if (index < 0) {
        activeGroup.push(id);
      } else {
        activeGroup.splice(index, 1);
      }
      // console.error('activeGroup:', activeGroup);
      this.setState({ activeGroup });
      if (!this.props.isDownload) (0, _localStorage.setLocalStorage)('api-menu-active-group', activeGroup);
    };

    this.getUrl = (type, id) => {
      let { baseUrl, mode } = this.props;
      if (!id) {
        return mode === 'view' ? baseUrl + '#' + type : baseUrl + '/' + type;
      }
      return mode === 'view' ? baseUrl + '#' + type + '-' + id : baseUrl + '/' + type + '/' + id;
    };

    let localActive = !this.props.isDownload ? (0, _localStorage.getLocalStorage)('api-menu-active-group') : '';
    if (localActive && typeof localActive === 'string') {
      localActive = localActive.split(',');
    }
    this.state = {
      activeGroup: localActive || []
    };
  }

  //打开子目录

  //获取路由

  //初始化分组
  getMapGroup(props) {
    let { value } = props;
    let mapGroup = {};
    if (value.groups) {
      _lodash2.default.map(value.groups, group => {
        mapGroup[group.id] = {
          id: group.id,
          title: group.title,
          url: this.getUrl('group', group.id),
          routes: []
        };
      });
      _lodash2.default.map(value.routes, route => {
        if (route.group && mapGroup[route.group]) {
          mapGroup[route.group].routes.push(Object.assign({ url: this.getUrl('route', route.id) }, route));
        }
      });
    }
    return mapGroup;
  }

  render() {
    let {
      value, className, mode, baseUrl
    } = this.props;
    let { activeGroup } = this.state;
    let mapGroup = this.getMapGroup(this.props);
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
      _lodash2.default.map(mapGroup, group => _react2.default.createElement(
        'div',
        { key: group.id, className: activeGroup.indexOf(group.id) < 0 ? 'menu' : 'menu active' },
        _react2.default.createElement(
          'div',
          { className: 'display-flex' },
          mode !== 'view' ? _react2.default.createElement(
            _reactRouterDom.Link,
            {
              to: this.getUrl('group', group.id),
              className: 'group group-route flex'
            },
            group.title
          ) : _react2.default.createElement(
            'a',
            {
              href: this.getUrl('group', group.id),
              className: 'group group-route flex'
            },
            group.title
          ),
          group.routes && group.routes.length ? _react2.default.createElement(
            'div',
            {
              className: 'icon icon-link pull-right padding-h-sm',
              onClick: () => this.openSub(group.id)
            },
            _react2.default.createElement('i', { className: 'fa fa-angle-right' }),
            _react2.default.createElement('i', { className: 'fa fa-angle-down' })
          ) : null
        ),
        _lodash2.default.map(group.routes, route => {
          //console.log('======route', route);
          if (mode !== 'view') {
            return _react2.default.createElement(
              _reactRouterDom.Link,
              {
                key: route.id,
                to: this.getUrl('route', route.id),
                className: 'sub sub-route'
              },
              route.title
            );
          }
          return _react2.default.createElement(
            'a',
            {
              key: route.id,
              href: this.getUrl('route', route.id),
              className: 'sub sub-route'
            },
            route.title
          );
        })
      )),
      _react2.default.createElement(
        'div',
        { className: activeGroup.indexOf('object') < 0 ? 'menu' : 'menu active' },
        _react2.default.createElement(
          'div',
          { className: 'display-flex' },
          _react2.default.createElement(
            'div',
            { className: 'group group-object flex' },
            '\u5BF9\u8C61'
          ),
          value.objects && value.objects.length ? _react2.default.createElement(
            'div',
            {
              className: 'icon icon-link pull-right padding-h-sm',
              onClick: () => this.openSub('object')
            },
            _react2.default.createElement('i', { className: 'fa fa-angle-right' }),
            _react2.default.createElement('i', { className: 'fa fa-angle-down' })
          ) : null
        ),
        _lodash2.default.map(value.objects, o => mode !== 'view' ? _react2.default.createElement(
          _reactRouterDom.Link,
          { key: o.id, to: this.getUrl('object', o.id), className: 'sub sub-object' },
          o.title,
          o.share ? _react2.default.createElement(
            'span',
            { className: 'v-required-icon text-danger' },
            '*'
          ) : null
        ) : _react2.default.createElement(
          'a',
          { key: o.id, href: this.getUrl('object', o.id), className: 'sub sub-object' },
          o.title,
          o.share ? _react2.default.createElement(
            'span',
            { className: 'v-required-icon text-danger' },
            '*'
          ) : null
        ))
      ),
      _react2.default.createElement(
        'div',
        { className: activeGroup.indexOf('tuple') < 0 ? 'menu' : 'menu active' },
        _react2.default.createElement(
          'div',
          { className: 'display-flex' },
          _react2.default.createElement(
            'div',
            { className: 'group group-object flex' },
            '\u5143\u7EC4'
          ),
          value.tuples && value.tuples.length ? _react2.default.createElement(
            'div',
            {
              className: 'icon icon-link pull-right padding-h-sm',
              onClick: () => this.openSub('tuple')
            },
            _react2.default.createElement('i', { className: 'fa fa-angle-right' }),
            _react2.default.createElement('i', { className: 'fa fa-angle-down' })
          ) : null
        ),
        _lodash2.default.map(value.tuples, t => mode !== 'view' ? _react2.default.createElement(
          _reactRouterDom.Link,
          { key: t.id, to: this.getUrl('tuple', t.id), className: 'sub sub-tuple' },
          '[',
          t.title,
          ']',
          t.share ? _react2.default.createElement(
            'span',
            { className: 'v-required-icon text-danger' },
            '*'
          ) : null
        ) : _react2.default.createElement(
          'a',
          { key: t.id, href: this.getUrl('tuple', t.id), className: 'sub sub-tuple' },
          '[',
          t.title,
          ']',
          t.share ? _react2.default.createElement(
            'span',
            { className: 'v-required-icon text-danger' },
            '*'
          ) : null
        ))
      ),
      _react2.default.createElement(
        'div',
        { className: activeGroup.indexOf('code') < 0 ? 'menu' : 'menu active' },
        mode !== 'view' ? _react2.default.createElement(
          _reactRouterDom.Link,
          { to: this.getUrl('code'), className: 'group group-code' },
          '\u72B6\u6001\u7801'
        ) : _react2.default.createElement(
          'a',
          { href: this.getUrl('code'), className: 'group group-code' },
          '\u72B6\u6001\u7801'
        )
      )
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
    schemas: []
  }
};