'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (props) {
  return layout(props || {});
};

var _server = require('react-dom/server');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _Index = require('./renderer/Index');

var _Index2 = _interopRequireDefault(_Index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function layout(data) {
  let style = _fs2.default.readFileSync(__dirname + '/css/style.min.css');
  // let content = renderToString(<Index value={data} />);
  let content = (0, _server.renderToStaticMarkup)(_react2.default.createElement(_Index2.default, { value: data }));
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link href="http://cdn.bootcss.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet">
      <style type="text/css">${style}</style>
    </head>
    <body>
      <div id="app">
          ${content}
      </div>
    </body>
    </html>
  `;
}