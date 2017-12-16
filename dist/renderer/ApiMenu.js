'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ApiSearch = require('./ApiSearch');

var _ApiSearch2 = _interopRequireDefault(_ApiSearch);

var _MenuItems = require('./components/MenuItems');

var _MenuItems2 = _interopRequireDefault(_MenuItems);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright Maichong Software Ltd. 2017 http://maichong.it
 * @date 2017-11-10
 * @author Pang <pang@maichong.it>
 */

class ApiMenu extends _react2.default.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.getUrl = (type, id) => {
      let { baseUrl } = this.props;
      if (!id) {
        return baseUrl + '#' + type;
      }
      return baseUrl + '#' + type + '-' + id;
    }, _temp;
  }

  //获取路由


  render() {
    let {
      mapGroup, descriptions, objects, tuples, codes, className, isDownload
    } = this.props;
    // console.log('======ApiMenu');
    return _react2.default.createElement(
      'div',
      { className: className ? className + ' api-menu' : 'api-menu' },
      isDownload ? _react2.default.createElement(_ApiSearch2.default, null) : null,
      _lodash2.default.map(descriptions, desc => _react2.default.createElement(_MenuItems2.default, {
        key: desc.id,
        baseUrl: this.props.baseUrl,
        type: 'description',
        value: { title: desc.title, id: desc.id, items: [] }
      })),
      _lodash2.default.map(mapGroup, group => _react2.default.createElement(_MenuItems2.default, {
        key: group.id,
        baseUrl: this.props.baseUrl,
        type: 'group',
        value: { title: group.title, id: group.id, items: group.routes }
      })),
      _react2.default.createElement(_MenuItems2.default, {
        baseUrl: this.props.baseUrl,
        type: 'object',
        value: { title: '对象', id: '', items: objects }
      }),
      _react2.default.createElement(_MenuItems2.default, {
        baseUrl: this.props.baseUrl,
        type: 'tuple',
        value: { title: '元组', id: '', items: tuples }
      }),
      codes && codes.length ? _react2.default.createElement(_MenuItems2.default, {
        baseUrl: this.props.baseUrl,
        type: 'code',
        value: { title: '状态码', id: '', items: [] }
      }) : null
    );
  }
}
exports.default = ApiMenu;
ApiMenu.defaultProps = {
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