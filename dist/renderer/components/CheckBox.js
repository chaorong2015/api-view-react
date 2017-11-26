'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CheckBox extends _react2.default.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.handleCheck = () => {
      const { onChange, checked } = this.props;
      if (onChange) {
        onChange(!checked);
      }
    }, _temp;
  }

  render() {
    const {
      radio, checked, disabled, label
    } = this.props;

    let className = 'checkbox';
    if (disabled) {
      className += ' disabled';
    }
    if (checked) {
      className += ' checked';
    }

    let icon = 'square-o';
    if (radio) {
      if (checked) {
        icon = 'check-circle';
      } else {
        icon = 'circle-o';
      }
    } else if (checked) {
      icon = 'check-square';
    } else {
      //icon = 'square-o';
    }

    return _react2.default.createElement(
      'label',
      { className: className, onClick: disabled ? null : this.handleCheck },
      _react2.default.createElement('i', { className: 'fa fa-' + icon }),
      label
    );
  }
}
exports.default = CheckBox; /**
                             * @copyright Maichong Software Ltd. 2016 http://maichong.it
                             * @date 2016-12-23
                             * @author Li <li@maichong.it>
                             */

CheckBox.defaultProps = {
  radio: false,
  checked: false,
  label: '',
  disabled: false
};