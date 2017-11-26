'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BaseInfo extends _react2.default.Component {

  render() {
    let { title, desc } = this.props;
    let className = 'base-info';
    if (this.props.className) {
      className = className + ' ' + this.props.className;
    }
    if (this.props.isSub) {
      className += ' sub-info';
    }
    return _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement(
        'div',
        { className: 'title' },
        title,
        this.props.share ? _react2.default.createElement(
          'span',
          { className: 'text-danger' },
          '*'
        ) : null
      ),
      this.props.markEle ? _react2.default.createElement(
        'div',
        { className: 'mark' },
        this.props.markEle
      ) : null,
      _react2.default.createElement(
        'div',
        { className: 'desc' },
        desc
      )
    );
  }
}
exports.default = BaseInfo; /**
                             * 脉冲软件
                             * http://maichong.it
                             * Created by Rong on 2017/11/17.
                             * chaorong@maichong.it
                             */

BaseInfo.defaultProps = {
  className: '',
  isSub: false,
  share: false,
  markEle: null
};