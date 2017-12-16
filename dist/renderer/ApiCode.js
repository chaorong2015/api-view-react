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
 * Created by Rong on 2017/11/17.
 * chaorong@maichong.it
 */

class ApiCode extends _react2.default.Component {
  render() {
    let { value } = this.props;
    let className = 'api-module-panel';
    if (this.props.className) {
      className = className + ' ' + this.props.className;
    }
    // console.log('======ApiCode');
    return _react2.default.createElement(
      'div',
      { className: className, id: 'code' },
      _react2.default.createElement(
        'div',
        { className: 'panel-left' },
        _react2.default.createElement(
          'div',
          { className: 'title' },
          '\u72B6\u6001\u7801'
        ),
        _react2.default.createElement(
          'table',
          { className: 'table table-bordered', responsive: true },
          _react2.default.createElement(
            'tbody',
            { className: 'desc' },
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { className: 'text-center', width: '100' },
                '\u72B6\u6001\u7801'
              ),
              _react2.default.createElement(
                'td',
                { className: 'text-center', width: '200' },
                '\u63CF\u8FF0'
              )
            ),
            _lodash2.default.map(value, v => _react2.default.createElement(
              'tr',
              { key: v.id },
              _react2.default.createElement(
                'td',
                { className: 'text-center' },
                _react2.default.createElement(
                  'span',
                  { className: 'code-title' },
                  v.code
                )
              ),
              _react2.default.createElement(
                'td',
                null,
                v.desc
              )
            ))
          )
        )
      ),
      _react2.default.createElement('div', { className: 'panel-right text-center' })
    );
  }
}
exports.default = ApiCode;
ApiCode.defaultProps = {
  className: ''
};