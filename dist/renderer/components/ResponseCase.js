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
    //测试
    // this.test = {
    //   value: [
    //     {
    //       code: 200, desc: '正确返回', value: [11]
    //     },
    //     { code: 400, desc: '错误返回', value: [222] }]
    // };
    // props = Object.assign({}, props, this.test);
    this.state = {
      response: props.value && props.value.length ? props.value[0] : {}
    };
  }

  render() {
    let { className, value, title } = this.props;
    let { response } = this.state;
    //测试
    // value = this.test.value;
    if (!value || !value.length) return _react2.default.createElement('div', null);
    // console.error('=======response', response);
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
          { className: 'tab', key: index, onClick: () => this.setState({ response: r }) },
          _react2.default.createElement('i', { className: r.code === 200 || r.code === '200' ? 'fa fa-circle text-success' : 'fa fa-circle text-danger'
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
      response.fields && response.fields.length ? _react2.default.createElement(
        'div',
        { className: 'case-data-panel' },
        _react2.default.createElement(_CaseDataDisplay2.default, { wrapType: response.fieldType, type: response.modelType, value: response.fields })
      ) : null
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