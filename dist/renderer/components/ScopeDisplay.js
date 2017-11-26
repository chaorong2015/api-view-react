'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CheckBox = require('./CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class _class extends _react2.default.Component {

  render() {
    let { value } = this.props;
    let className = this.props.className ? 'object-scope-display ' + this.props.className : 'object-scope-display';
    return _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement(
        'div',
        { className: 'title' },
        'Scopes\u5217\u8868'
      ),
      _react2.default.createElement(
        'div',
        { className: 'scope-table-panel' },
        _react2.default.createElement(
          'table',
          null,
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement('th', null),
              _react2.default.createElement(
                'th',
                null,
                value.title
              ),
              value.scopes.map(scope => _react2.default.createElement(
                'th',
                { key: scope.id },
                scope.title
              ))
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            value.fields && value.fields.map(field => _react2.default.createElement(
              'tr',
              { key: field.id },
              _react2.default.createElement(
                'td',
                { className: 'text-left' },
                _react2.default.createElement(
                  'span',
                  { className: 'scope-title' },
                  field.title
                )
              ),
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement(_CheckBox2.default, { checked: true, disabled: true })
              ),
              value.scopes && value.scopes.map(scope => _react2.default.createElement(
                'td',
                { key: scope.id },
                _react2.default.createElement(_CheckBox2.default, {
                  checked: _lodash2.default.indexOf(scope.fields, field.title) < 0,
                  disabled: true
                })
              ))
            ))
          )
        )
      )
    );
  }
}
exports.default = _class; /**
                           * 脉冲软件
                           * http://maichong.it
                           * Created by Rong on 2017/11/23.
                           * chaorong@maichong.it
                           */

_class.defaultProps = {
  className: ''
};