'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _CaseDataDisplay = require('./CaseDataDisplay');

var _CaseDataDisplay2 = _interopRequireDefault(_CaseDataDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ResponseCase extends _react2.default.Component {

  constructor(props) {
    super(props);
    this.state = {
      response: props.value && props.value.length ? props.value[0] : {}
    };
  }

  render() {
    let { className, value, title } = this.props;
    let { response } = this.state;
    if (!value || !value.length) return _react2.default.createElement('div', null);
    // console.error('=======response', response);
    // console.log('======ResponseCase');
    return _react2.default.createElement(
      'div',
      { className: className ? className + ' response-case' : 'response-case' },
      _react2.default.createElement(
        'div',
        { className: 'model-case-title' },
        title
      ),
      _react2.default.createElement(
        'div',
        { className: 'tabs' },
        _lodash2.default.map(value, (r, index) => _react2.default.createElement(
          'div',
          {
            className: r.id === response.id ? 'tab active' : 'tab',
            key: index,
            onClick: () => this.setState({ response: r })
          },
          _react2.default.createElement('i', { className: _lodash2.default.isNumber(r.code) && r.code <= 400 && r.code >= 200 ? 'fa fa-circle text-success' : 'fa fa-circle text-danger'
          }),
          _react2.default.createElement(
            'span',
            { className: 'tab-code' },
            r.code
          ),
          _react2.default.createElement(
            'span',
            { className: 'tab-desc' },
            r.desc
          )
        ))
      ),
      _react2.default.createElement(
        'div',
        { className: 'case-data-panel' },
        _react2.default.createElement(_CaseDataDisplay2.default, {
          defaultJson: {},
          wrapType: response.fieldType,
          type: response.modelType,
          value: response.fields || []
        })
      )
    );
  }
}
exports.default = ResponseCase; /**
                                 * 脉冲软件
                                 * http://maichong.it
                                 * Created by Rong on 2017/11/17.
                                 * chaorong@maichong.it
                                 */

ResponseCase.defaultProps = {
  className: ''
};