'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fieldManage = require('../utils/field-manage');

var _JsonArrayDisplay = require('./JsonArrayDisplay');

var _JsonArrayDisplay2 = _interopRequireDefault(_JsonArrayDisplay);

var _JsonObjectDisplay = require('./JsonObjectDisplay');

var _JsonObjectDisplay2 = _interopRequireDefault(_JsonObjectDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CaseDataDisplay extends _react2.default.Component {

  render() {
    // console.log('======CaseDataDisplay');
    let {
      className, type, wrapType, value, defaultJson
    } = this.props;
    let json = null;
    if (!value || !value.length) {
      if (defaultJson) {
        json = defaultJson;
      } else return _react2.default.createElement('div', null);
    } else {
      json = (0, _fieldManage.parseFieldJson)(value, type, wrapType || '');
    }
    // console.log('======json', json);
    if (_lodash2.default.isArray(json)) {
      if (value.length) {
        type = 'array';
      } else {
        type = 'array-empty';
      }
    } else if (_lodash2.default.isObject(json)) {
      if (_lodash2.default.isEmpty(value)) {
        type = 'object-empty';
      } else {
        type = 'object';
      }
    }
    return _react2.default.createElement(
      'div',
      { className: className ? className + ' case-data-display' : 'case-data-display' },
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
      type === 'object' ? _react2.default.createElement(
        'div',
        { className: 'symbol-object' },
        '{'
      ) : '',
      type === 'array' ? _react2.default.createElement(
        'div',
        { className: 'symbol-array' },
        '['
      ) : '',
      type === 'array' ? _react2.default.createElement(_JsonArrayDisplay2.default, { index: 1, jsonArray: json }) : '',
      type === 'object' ? _react2.default.createElement(_JsonObjectDisplay2.default, { index: 1, jsonObject: json }) : '',
      type === 'object' ? _react2.default.createElement(
        'div',
        { className: 'symbol-object' },
        '}'
      ) : '',
      type === 'array' ? _react2.default.createElement(
        'div',
        { className: 'symbol-array' },
        ']'
      ) : ''
    );
  }
}
exports.default = CaseDataDisplay; /**
                                    * 脉冲软件
                                    * http://maichong.it
                                    * Created by Rong on 2017/11/17.
                                    * chaorong@maichong.it
                                    */

CaseDataDisplay.defaultProps = {
  className: '',
  wrapType: '',
  defaultJson: null
};