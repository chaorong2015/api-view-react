'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _JsonPropertyDisplay = require('./JsonPropertyDisplay');

var _JsonPropertyDisplay2 = _interopRequireDefault(_JsonPropertyDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class JsonArrayDisplay extends _react2.default.Component {

  render() {
    let { jsonArray, level } = this.props;
    let className = 'json-display json-Array';
    if (this.props.className) {
      className = className + ' ' + this.props.className;
    }
    return _react2.default.createElement(
      'div',
      { className: className },
      _lodash2.default.map(jsonArray, (item, i) => _react2.default.createElement(_JsonPropertyDisplay2.default, {
        level: level,
        next: parseInt(i) < jsonArray.length - 1,
        property: '',
        value: item
      }))
    );
  }
}
exports.default = JsonArrayDisplay; /**
                                     * 脉冲软件
                                     * http://maichong.it
                                     * Created by Rong on 2017/12/17.
                                     * chaorong@maichong.it
                                     */

JsonArrayDisplay.defaultProps = {
  className: '',
  level: 1,
  jsonArray: []
};