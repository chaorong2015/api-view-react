'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RouteMethodDisplay extends _react2.default.Component {

  render() {
    let { method, url } = this.props;
    let className = 'route-method-display';
    if (this.props.className) {
      className = className + ' ' + this.props.className;
    }
    if (!method) return _react2.default.createElement('div', null);
    // console.log('======RouteMethodDisplay');
    return _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement(
        'div',
        { className: 'method' },
        method
      ),
      _react2.default.createElement(
        'div',
        { className: 'path' },
        url
      )
    );
  }
}
exports.default = RouteMethodDisplay; /**
                                       * 脉冲软件
                                       * http://maichong.it
                                       * Created by Rong on 2017/11/26.
                                       * chaorong@maichong.it
                                       */

RouteMethodDisplay.defaultProps = {
  className: ''
};