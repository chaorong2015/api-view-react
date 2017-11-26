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

class FieldDisplay extends _react2.default.Component {

  render() {
    let { className, value } = this.props;
    // console.log('======value:', value);
    return _react2.default.createElement(
      'div',
      { className: className ? className + ' field-display' : 'field-display' },
      _react2.default.createElement(
        'div',
        { className: 'list' },
        _react2.default.createElement('div', { className: 'list-left-border' }),
        _react2.default.createElement(
          'div',
          { className: 'list-items' },
          _lodash2.default.map(value || [], field => _react2.default.createElement(
            'div',
            { className: 'item', key: field.id },
            field.title ? _react2.default.createElement(
              'div',
              { className: 'item-title' },
              field.title
            ) : null,
            _react2.default.createElement(
              'div',
              { className: 'item-options' },
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  'span',
                  { className: 'type' },
                  field.type
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'text-danger' },
                  field.options && field.options.required ? '必须' : ''
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'desc' },
                field.desc || ''
              )
            )
          ))
        )
      )
    );
  }
}
exports.default = FieldDisplay;
FieldDisplay.defaultProps = {
  className: ''
};