'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BaseInfo = require('./components/BaseInfo');

var _BaseInfo2 = _interopRequireDefault(_BaseInfo);

var _FieldDisplay = require('./components/FieldDisplay');

var _FieldDisplay2 = _interopRequireDefault(_FieldDisplay);

var _ModelCase = require('./components/ModelCase');

var _ModelCase2 = _interopRequireDefault(_ModelCase);

var _ScopeDisplay = require('./components/ScopeDisplay');

var _ScopeDisplay2 = _interopRequireDefault(_ScopeDisplay);

var _fieldManage = require('./utils/field-manage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ApiObject extends _react2.default.Component {

  getScopes(props) {
    let { value, relation } = props;
    return _lodash2.default.filter(relation.scopes, s => s.object.toString() === value.id.toString());
  }

  render() {
    let { value, relation } = this.props;
    let className = 'api-module-panel';
    if (this.props.className) {
      className = className + ' ' + this.props.className;
    }
    let fields = (0, _fieldManage.getFieldsOfModel)(value, relation);
    let scopes = this.getScopes(this.props);
    return _react2.default.createElement(
      'div',
      { className: className, id: 'object-' + value.id },
      _react2.default.createElement(
        'div',
        { className: 'panel-left' },
        _react2.default.createElement(_BaseInfo2.default, { isSub: !0, title: value.title, share: value.share, desc: value.desc }),
        fields && fields.length ? _react2.default.createElement(
          'div',
          { className: 'object' },
          _react2.default.createElement(
            'div',
            { className: 'padding-sm-v' },
            '\u5C5E\u6027'
          ),
          _react2.default.createElement(_FieldDisplay2.default, { value: fields })
        ) : null,
        scopes && scopes.length ? _react2.default.createElement(_ScopeDisplay2.default, {
          value: Object.assign({}, value, { scopes, fields })
        }) : null
      ),
      _react2.default.createElement(
        'div',
        { className: 'panel-right text-center' },
        _react2.default.createElement(_ModelCase2.default, { title: '\u793A\u4F8B\u5C55\u793A', type: 'object', value: fields })
      )
    );
  }
}
exports.default = ApiObject; /**
                              * 脉冲软件
                              * http://maichong.it
                              * Created by Rong on 2017/11/17.
                              * chaorong@maichong.it
                              */

ApiObject.defaultProps = {
  className: ''
};