'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _JsonArrayDisplay = require('./JsonArrayDisplay');

var _JsonArrayDisplay2 = _interopRequireDefault(_JsonArrayDisplay);

var _JsonObjectDisplay = require('./JsonObjectDisplay');

var _JsonObjectDisplay2 = _interopRequireDefault(_JsonObjectDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/12/17.
 * chaorong@maichong.it
 */

class JsonPropertyDisplay extends _react2.default.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.toggleField = () => {
      let ref = this.ref;
      if (ref) {
        let className = ref.className;
        if (className.indexOf('collapsed') > -1) {
          ref.className = 'json-property';
          return;
        }
        ref.className = 'json-property collapsed';
      }
    }, _temp;
  }

  render() {
    let {
      property, value, next, level
    } = this.props;
    let type = '';
    if (_lodash2.default.isArray(value)) {
      if (value.length) {
        type = 'array';
      } else {
        type = 'array-empty';
      }
    } else if (_lodash2.default.isNull(value)) {
      type = 'null';
    } else if (_lodash2.default.isBoolean(value)) {
      type = 'boolean';
    } else if (_lodash2.default.isObject(value)) {
      if (_lodash2.default.isEmpty(value)) {
        type = 'object-empty';
      } else {
        type = 'object';
      }
    } else if (_lodash2.default.isString(value)) {
      type = 'string';
    } else if (_lodash2.default.isNumber(value)) {
      type = 'number';
    }
    let specificType = ['object-empty', 'object', 'array', 'array-empty', 'string', 'null'];
    let className = 'json-property';
    if (parseInt(level) > 1) className += ' collapsed';
    return _react2.default.createElement(
      'div',
      { className: className, ref: ref => {
          this.ref = ref;
        } },
      type === 'array' || type === 'object' ? _react2.default.createElement('div', {
        className: 'icon icon-toggle-property',
        onClick: () => this.toggleField()
      }) : null,
      _react2.default.createElement(
        'div',
        { className: 'line-property' },
        property ? _react2.default.createElement(
          'span',
          { className: 'property' },
          '"',
          property,
          '"',
          _react2.default.createElement(
            'span',
            { className: 'colon' },
            ':\xA0'
          )
        ) : '',
        type === 'array' ? _react2.default.createElement(
          'span',
          { className: 'symbol-array' },
          '['
        ) : '',
        type === 'object' ? _react2.default.createElement(
          'div',
          { className: 'symbol-object' },
          '{'
        ) : '',
        type === 'array-empty' ? _react2.default.createElement(
          'span',
          { className: 'array-empty' },
          '[\xA0]'
        ) : '',
        type === 'object-empty' ? _react2.default.createElement(
          'span',
          { className: 'object-empty' },
          '{\xA0}'
        ) : '',
        type === 'null' ? _react2.default.createElement(
          'div',
          { className: 'value null' },
          'null\xA0',
          _react2.default.createElement(
            'span',
            null,
            next ? ',' : ''
          )
        ) : '',
        type === 'string' ? _react2.default.createElement(
          'div',
          { className: 'value string' },
          '"',
          value,
          '"\xA0',
          _react2.default.createElement(
            'span',
            null,
            next ? ',' : ''
          )
        ) : '',
        specificType.indexOf(type) < 0 ? _react2.default.createElement(
          'div',
          { className: `value ${type}` },
          value,
          '\xA0',
          _react2.default.createElement(
            'span',
            null,
            next ? ',' : ''
          )
        ) : '',
        type === 'object' ? _react2.default.createElement(
          'div',
          { className: 'ellipsis symbol-object' },
          '\xA0...\xA0}\xA0',
          next ? ',' : ''
        ) : '',
        type === 'array' ? _react2.default.createElement(
          'div',
          { className: 'ellipsis symbol-array' },
          '\xA0...\xA0]\xA0',
          next ? ',' : ''
        ) : ''
      ),
      type === 'array' ? _react2.default.createElement(_JsonArrayDisplay2.default, { level: level + 1, jsonArray: value }) : '',
      type === 'object' ? _react2.default.createElement(_JsonObjectDisplay2.default, { level: level + 1, jsonObject: value }) : '',
      type === 'object' ? _react2.default.createElement(
        'div',
        { className: 'symbol-end symbol-object' },
        '}\xA0',
        next ? ',' : ''
      ) : '',
      type === 'array' ? _react2.default.createElement(
        'div',
        { className: 'symbol-end symbol-array' },
        ']\xA0',
        next ? ',' : ''
      ) : ''
    );
  }
}
exports.default = JsonPropertyDisplay;
JsonPropertyDisplay.defaultProps = {
  property: '',
  value: '',
  next: false,
  level: 1
};