'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ApiMenu = require('./ApiMenu');

var _ApiMenu2 = _interopRequireDefault(_ApiMenu);

var _ApiInfoWrapper = require('./ApiInfoWrapper');

var _ApiInfoWrapper2 = _interopRequireDefault(_ApiInfoWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Index extends _react2.default.Component {

  render() {
    let className = 'api-view';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement(_ApiMenu2.default, {
        className: 'scrollbar-v-xs',
        mode: 'view',
        baseUrl: this.props.menuBaseUrl,
        value: this.props.value
      }),
      _react2.default.createElement(_ApiInfoWrapper2.default, { className: 'scrollbar-v-xs', value: this.props.value })
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
  menuBaseUrl: ''
};