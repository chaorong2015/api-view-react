"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ApiSearch extends _react2.default.Component {
  render() {
    let { onChange } = this.props;
    // console.log('======ApiSearch');
    return _react2.default.createElement(
      "div",
      { className: "api-search" },
      onChange ? _react2.default.createElement("input", {
        type: "text",
        name: "search",
        className: "form-control input-search",
        placeholder: "\u5FEB\u901F\u68C0\u7D22",
        onChange: e => onChange(e.target.value)
      }) : _react2.default.createElement("input", {
        type: "text",
        name: "search",
        className: "form-control input-search",
        placeholder: "\u5FEB\u901F\u68C0\u7D22"
      })
    );
  }
}
exports.default = ApiSearch; /**
                              * 脉冲软件
                              * http://maichong.it
                              * Created by Rong on 2017/12/3.
                              * chaorong@maichong.it
                              */