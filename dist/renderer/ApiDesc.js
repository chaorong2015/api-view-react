'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BaseInfo = require('./components/BaseInfo');

var _BaseInfo2 = _interopRequireDefault(_BaseInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/17.
 * chaorong@maichong.it
 */

class ApiDesc extends _react2.default.Component {

  render() {
    let { value } = this.props;
    let className = 'api-module-panel';
    if (this.props.className) {
      className = className + ' ' + this.props.className;
    }
    // console.log('======ApiDesc');
    return _react2.default.createElement(
      'div',
      { className: className, id: 'description-' + value.id },
      _react2.default.createElement(_BaseInfo2.default, { className: 'panel-left', title: value.title, desc: value.desc }),
      _react2.default.createElement('div', { className: 'panel-right text-center' })
    );
  }
}
exports.default = ApiDesc;
ApiDesc.defaultProps = {
  className: ''
};