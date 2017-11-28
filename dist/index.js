'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseReact;

var _server = require('react-dom/server');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Index = require('./renderer/Index');

var _Index2 = _interopRequireDefault(_Index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseReact(data) {
  // let content = renderToString(<Index value={data} />);
  // let content = renderToStaticMarkup(<Index value={data} />);
  return (0, _server.renderToStaticMarkup)(_react2.default.createElement(_Index2.default, { value: data }));
}