'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactRouterDom = require('react-router-dom');

var _localStorage = require('../utils/local-storage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/12/13.
 * chaorong@maichong.it
 */

class MenuItems extends _react2.default.Component {

  constructor(props) {
    super(props);

    _initialiseProps.call(this);

    let localActive = !this.props.isDownload ? (0, _localStorage.getLocalStorage)('api-menu-active-group') : '';
    if (localActive && typeof localActive === 'string') {
      localActive = localActive.split(',');
    }
    this.state = {
      activeGroup: localActive || [],
      menu: this.updateMenu(props)
    };
  }

  componentWillReceiveProps(props) {
    if (props && this.props && !_lodash2.default.isEqual(this.props.value, props.value)) {
      this.setState({ menu: this.updateMenu(props) });
    }
  }

  //更新菜单


  //打开子目录

  //获取路由


  render() {
    let { value, type } = this.props;
    let { activeGroup } = this.state;
    let className = 'menu';
    if (this.props.className) className = +' ' + this.props.className;
    if (!value) return _react2.default.createElement('div', null);
    if (type !== 'group' && (!value.items || !value.items.length)) return _react2.default.createElement('div', null);
    return _react2.default.createElement(
      'div',
      { className: activeGroup.indexOf(value.id) < 0 ? className : 'menu active' },
      this.state.menu
    );
  }
}
exports.default = MenuItems;
MenuItems.defaultProps = {
  className: '',
  mode: 'view',
  isDownload: false,
  baseUrl: ''
};

var _initialiseProps = function () {
  this.updateMenu = props => {
    // console.log('====type', props.type);
    let { type, value, mode } = props;
    let itemType = type === 'group' ? 'route' : type;
    return _react2.default.createElement(
      'div',
      { className: 'menu-group' },
      _react2.default.createElement(
        'div',
        { className: 'display-flex', onClick: () => this.openSub(value.id) },
        mode !== 'view' ? _react2.default.createElement(
          _reactRouterDom.Link,
          {
            to: this.getUrl(type, value.id),
            className: `group group-${itemType} flex`
          },
          value.title
        ) : _react2.default.createElement(
          'a',
          {
            href: this.getUrl(type, value.id),
            className: `group group-${itemType} flex`
          },
          value.title
        ),
        value.items && value.items.length ? _react2.default.createElement(
          'div',
          {
            className: 'icon icon-link pull-right padding-h-sm'
          },
          _react2.default.createElement('i', { className: 'fa fa-angle-right' }),
          _react2.default.createElement('i', { className: 'fa fa-angle-down' })
        ) : null
      ),
      _lodash2.default.map(value.items, item => {
        //console.log('======route', route);
        if (mode !== 'view') {
          return _react2.default.createElement(
            _reactRouterDom.Link,
            {
              key: item.id,
              to: this.getUrl(itemType, item.id),
              className: `sub sub-${itemType}`
            },
            item.title
          );
        }
        return _react2.default.createElement(
          'a',
          {
            key: item.id,
            href: this.getUrl(itemType, item.id),
            className: `sub sub-${itemType}`
          },
          item.title
        );
      })
    );
  };

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
};