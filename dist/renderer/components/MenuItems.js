'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/12/13.
 * chaorong@maichong.it
 */

class MenuItems extends _react2.default.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.ref = null, this.openSub = () => {
      if (this.ref) {
        let className = this.ref.className;
        if (className.indexOf('active') > -1) {
          this.ref.className = _lodash2.default.filter(this.ref.classList, cls => cls !== 'active').join(' ');
          return;
        }
        this.ref.className = className + ' active';
      }
    }, this.getUrl = (type, id) => {
      let { baseUrl } = this.props;
      if (!id) {
        return baseUrl + '#' + type;
      }
      return baseUrl + '#' + type + '-' + id;
    }, _temp;
  }

  //打开子目录

  //获取路由


  render() {
    let { value, type } = this.props;
    let itemType = type === 'group' ? 'route' : type;
    let className = 'menu';
    if (this.props.className) className = +' ' + this.props.className;
    if (!value) return _react2.default.createElement('div', null);
    if (type !== 'group' && (!value.items || !value.items.length)) return _react2.default.createElement('div', null);
    // console.log('======MenuItems');
    return _react2.default.createElement(
      'div',
      { ref: ref => {
          this.ref = ref;
        }, className: className },
      _react2.default.createElement(
        'div',
        { className: 'menu-group' },
        _react2.default.createElement(
          'div',
          { className: 'display-flex', onClick: () => this.openSub() },
          value.id ? _react2.default.createElement(
            'a',
            { href: this.getUrl(type, value.id), className: `group group-${itemType} flex` },
            value.title
          ) : _react2.default.createElement(
            'div',
            { className: `group group-${itemType} flex` },
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
        _lodash2.default.map(value.items, item => _react2.default.createElement(
          'a',
          { key: item.id, href: this.getUrl(itemType, item.id), className: `sub sub-${itemType}` },
          item.title
        ))
      )
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