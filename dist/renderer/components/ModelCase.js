'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CaseDataDisplay = require('./CaseDataDisplay');

var _CaseDataDisplay2 = _interopRequireDefault(_CaseDataDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/18.
 * chaorong@maichong.it
 */

class ModelCase extends _react2.default.Component {

  render() {
    let {
      className, value, title, type
    } = this.props;
    if (!value || !value.length) return _react2.default.createElement('div', null);
    // console.log('======ModelCase');
    return _react2.default.createElement(
      'div',
      { className: className ? className + ' model-case' : 'model-case' },
      _react2.default.createElement(
        'div',
        { className: 'model-case-title' },
        title
      ),
      _react2.default.createElement(
        'div',
        { className: 'case-data-panel' },
        _react2.default.createElement(_CaseDataDisplay2.default, { type: type || '', value: value })
      )
    );
  }
}
exports.default = ModelCase;
ModelCase.defaultProps = {
  className: '',
  type: 'object'
};