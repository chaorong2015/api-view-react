'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fieldManage = require('../utils/field-manage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FieldDisplay extends _react2.default.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.getTypeDisplay = f => {
      // if (!f.children || f.children.fields) return <span>{f.type}</span>;
      if (f.modelTitle && f.type !== 'union') {
        let { baseUrl } = this.props;
        let url = (baseUrl || '') + '#' + f.modelType + '-' + f.children.id;
        return _react2.default.createElement(
          'span',
          { className: 'type padding-right-xs' },
          _react2.default.createElement(
            'a',
            { href: url },
            f.type
          )
        );
      }
      return _react2.default.createElement(
        'span',
        { className: 'type padding-right-xs' },
        f.type
      );
    }, _temp;
  }

  render() {
    let {
      className, value, type, showType
    } = this.props;
    // console.log('======value:', value);
    if (!value || !value.length) return _react2.default.createElement('div', null);
    // console.log('======FieldDisplay');
    let model = null;
    let borderType = 'object';
    //通过类型获取一个简单模型
    if (type) {
      model = (0, _fieldManage.getSimpleModelByFieldType)(type);
      if (model && (model.fieldType === 'array' || model.modelType === 'tuple')) {
        borderType = 'array';
      }
    }
    return _react2.default.createElement(
      'div',
      { className: className ? className + ' field-display' : 'field-display' },
      _react2.default.createElement(
        'div',
        { className: 'list' },
        showType && model && model.modelTitle ? _react2.default.createElement(
          'div',
          { className: 'field-type' },
          type
        ) : null,
        _react2.default.createElement('div', { className: 'list-left-border ' + borderType }),
        _react2.default.createElement(
          'div',
          { className: 'list-items' },
          _lodash2.default.map(value || [], field => _react2.default.createElement(
            'div',
            { className: 'item', key: field.id },
            field.title ? _react2.default.createElement(
              'div',
              { className: 'item-title' },
              field.title
            ) : null,
            _react2.default.createElement(
              'div',
              { className: 'item-options' },
              _react2.default.createElement(
                'div',
                { className: 'options' },
                this.getTypeDisplay(field),
                field.options && field.options.required ? _react2.default.createElement(
                  'span',
                  { className: 'text-danger padding-right-xs' },
                  '\u5FC5\u987B'
                ) : '',
                field.default ? _react2.default.createElement(
                  'span',
                  { className: 'padding-right-xs' },
                  '默认值:' + field.default
                ) : '',
                field.options && field.options.max ? _react2.default.createElement(
                  'span',
                  { className: 'padding-right-xs' },
                  '长度:' + (field.options.mix || 0) + '~' + (field.options.max || 0)
                ) : '',
                field.options && field.options.format ? _react2.default.createElement(
                  'span',
                  { className: 'padding-right-xs' },
                  '格式:' + field.options.format
                ) : '',
                field.options && field.options.regular ? _react2.default.createElement(
                  'span',
                  { className: 'padding-right-xs' },
                  '正则:' + field.options.regular
                ) : '',
                field.type === 'enum' && field.options && field.options.enumValue ? _react2.default.createElement(
                  'span',
                  { className: 'padding-right-xs' },
                  '可选值:' + JSON.stringify(field.options.enumValue)
                ) : '',
                field.type === 'union' && field.options && field.options.unionType ? _react2.default.createElement(
                  'span',
                  { className: 'padding-right-xs' },
                  '可选类型:' + field.options.unionType.join(',')
                ) : ''
              ),
              _react2.default.createElement(
                'div',
                { className: 'desc' },
                field.desc || ''
              )
            )
          ))
        )
      )
    );
  }
}
exports.default = FieldDisplay; /**
                                 * 脉冲软件
                                 * http://maichong.it
                                 * Created by Rong on 2017/11/17.
                                 * chaorong@maichong.it
                                 */

FieldDisplay.defaultProps = {
  className: '',
  baseUrl: '',
  type: '',
  showType: true
};