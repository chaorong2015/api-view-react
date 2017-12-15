'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
  return (0, _server.renderToStaticMarkup)(_react2.default.createElement(_Index2.default, _extends({}, data, { isDownload: true })));
}