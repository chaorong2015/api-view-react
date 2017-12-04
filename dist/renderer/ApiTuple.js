'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BaseInfo = require('./components/BaseInfo');

var _BaseInfo2 = _interopRequireDefault(_BaseInfo);

var _FieldDisplay = require('./components/FieldDisplay');

var _FieldDisplay2 = _interopRequireDefault(_FieldDisplay);

var _ModelCase = require('./components/ModelCase');

var _ModelCase2 = _interopRequireDefault(_ModelCase);

var _fieldManage = require('./utils/field-manage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ApiTuple extends _react2.default.Component {

  render() {
    let { value, relation } = this.props;
    let className = 'api-module-panel';
    if (this.props.className) {
      className = className + ' ' + this.props.className;
    }
    let fields = (0, _fieldManage.getFieldsOfModel)(value, relation);
    return _react2.default.createElement(
      'div',
      {
        className: className,
        id: 'tuple-' + value.id
      },
      _react2.default.createElement(
        'div',
        { className: 'panel-left' },
        _react2.default.createElement(_BaseInfo2.default, {
          title: '[' + value.title + ']',
          isSub: !0,
          share: value.share,
          desc: value.desc
        }),
        fields && fields.length ? _react2.default.createElement(
          'div',
          { className: 'tuple' },
          _react2.default.createElement(
            'div',
            { className: 'padding-sm-v' },
            '\u5C5E\u6027'
          ),
          _react2.default.createElement(_FieldDisplay2.default, { baseUrl: this.props.baseUrl, value: fields })
        ) : null
      ),
      _react2.default.createElement(
        'div',
        { className: 'panel-right text-center' },
        _react2.default.createElement(_ModelCase2.default, { type: 'tuple', title: '\u793A\u4F8B\u5C55\u793A', value: fields })
      )
    );
  }
}
exports.default = ApiTuple; /**
                             * 脉冲软件
                             * http://maichong.it
                             * Created by Rong on 2017/11/17.
                             * chaorong@maichong.it
                             */

ApiTuple.defaultProps = {
  className: '',
  baseUrl: ''
};