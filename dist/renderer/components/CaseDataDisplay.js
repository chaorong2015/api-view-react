'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fieldMock = require('../utils/field-mock');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CaseDataDisplay extends _react2.default.Component {

  constructor(props) {
    super(props);

    this.toggleField = f => {
      let data = {};
      data[f.id] = !this.state[f.id];
      this.setState(data);
    };

    this.getLeftMark = type => {
      if (type === 'object' || type === 'scope') return '{';
      if (type === 'tuple') return '[';
      if (type === 'array') return '[';
      return '';
    };

    this.getRightMark = type => {
      if (type === 'object' || type === 'scope') return '}';
      if (type === 'tuple') return ']';
      if (type === 'array') return ']';
      return '';
    };

    this.getCaseValueEle = f => {
      let ele = null;
      let fieldValue = (0, _fieldMock.getMockData)(f);
      if (_lodash2.default.isArray(fieldValue)) {
        ele = _react2.default.createElement(
          'span',
          null,
          '[ \xA0',
          _lodash2.default.map(fieldValue || [], (v, index) => {
            if (_lodash2.default.isObject(fieldValue)) {
              return _react2.default.createElement(
                'span',
                { key: index },
                _react2.default.createElement(
                  'span',
                  { className: f.modelType },
                  JSON.stringify(v)
                ),
                index < fieldValue.length - 1 ? _react2.default.createElement(
                  'span',
                  null,
                  ',\xA0'
                ) : ''
              );
            }
            return _react2.default.createElement(
              'span',
              { key: index },
              _react2.default.createElement(
                'span',
                { className: f.modelType },
                v.toString()
              ),
              index < fieldValue.length - 1 ? _react2.default.createElement(
                'span',
                null,
                ',\xA0'
              ) : ''
            );
          }),
          '\xA0 ]'
        );
      } else if (_lodash2.default.isBoolean(fieldValue)) {
        ele = _react2.default.createElement(
          'span',
          { className: f.fieldType },
          fieldValue.toString()
        );
      } else if (_lodash2.default.isNull(fieldValue)) {
        ele = _react2.default.createElement(
          'span',
          { className: 'null' },
          'null'
        );
      } else if (_lodash2.default.isObject(fieldValue)) {
        if (_lodash2.default.isEmpty(fieldValue)) {
          ele = _react2.default.createElement(
            'span',
            { className: f.fieldType },
            '{\xA0\xA0}'
          );
        } else {
          ele = _react2.default.createElement(
            'span',
            { className: f.fieldType },
            JSON.stringify(fieldValue)
          );
        }
      } else {
        ele = _react2.default.createElement(
          'span',
          { className: f.fieldType },
          fieldValue ? fieldValue.toString() : ''
        );
      }
      return ele;
    };

    this.state = {
      objectType: ['object', 'scope', 'array', 'tuple', 'model'],
      activeObj: []
      // open: false
    };
  }

  render() {
    let {
      className, value, type, wrapType, next
    } = this.props;
    let { objectType } = this.state;
    return _react2.default.createElement(
      'div',
      { className: className ? className + ' case-data-display' : 'case-data-display' },
      this.getLeftMark(wrapType),
      objectType.indexOf(type) > -1 ? null : _react2.default.createElement(
        'div',
        null,
        '"',
        type,
        '"'
      ),
      objectType.indexOf(type) > -1 ? this.getLeftMark(type) : '',
      objectType.indexOf(type) > -1 ? _react2.default.createElement(
        'div',
        { className: 'json-panel' },
        _react2.default.createElement(
          'div',
          { className: 'obj' },
          _lodash2.default.map(value, (f, index) => {
            if (f.children && f.children.fields && f.children.fields.length) {
              return _react2.default.createElement(
                'div',
                { key: f.id, className: 'field-children' },
                _react2.default.createElement('div', {
                  className: this.state[f.id] ? 'icon icon-toggle-field toggle-show' : 'icon icon-toggle-field toggle-hide',
                  onClick: () => this.toggleField(f)
                }),
                type === 'object' || f.title ? _react2.default.createElement(
                  'div',
                  { className: 'property' },
                  f.title,
                  _react2.default.createElement(
                    'span',
                    { className: 'colon' },
                    ':'
                  )
                ) : null,
                _react2.default.createElement(
                  'div',
                  {
                    className: this.state[f.id] ? 'field-children-value open' : 'field-children-value'
                  },
                  _react2.default.createElement(
                    'div',
                    { className: 'property-show' },
                    this.props.index && this.props.index <= 2 ? _react2.default.createElement(CaseDataDisplay, {
                      index: this.props.index + 1,
                      value: f.children.fields,
                      wrapType: f.fieldType,
                      type: f.modelType,
                      next: index < value.length - 1
                    }) : _react2.default.createElement(
                      'span',
                      null,
                      '<' + f.type + '>'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'property-hide' },
                    this.getLeftMark(f.fieldType),
                    this.getLeftMark(f.modelType),
                    '...',
                    this.getRightMark(f.modelType),
                    this.getRightMark(f.fieldType),
                    index < value.length - 1 ? _react2.default.createElement(
                      'span',
                      { className: 'split' },
                      ','
                    ) : null
                  )
                )
              );
            }
            return _react2.default.createElement(
              'div',
              { className: 'field', key: f.id },
              type === 'object' || f.title ? _react2.default.createElement(
                'span',
                { className: 'property' },
                f.title,
                _react2.default.createElement(
                  'span',
                  { className: 'colon' },
                  ':'
                )
              ) : null,
              _react2.default.createElement(
                'span',
                { className: 'value' },
                this.getCaseValueEle(f) || f.mock || f.default || f.fieldType + '类型'
              ),
              index < value.length - 1 ? _react2.default.createElement(
                'span',
                { className: 'split' },
                ','
              ) : null
            );
          })
        )
      ) : null,
      objectType.indexOf(type) > -1 ? this.getRightMark(type) : '',
      this.getRightMark(wrapType),
      next ? _react2.default.createElement(
        'span',
        { className: 'split' },
        ','
      ) : null
    );
  }
}
exports.default = CaseDataDisplay; /**
                                    * 脉冲软件
                                    * http://maichong.it
                                    * Created by Rong on 2017/11/17.
                                    * chaorong@maichong.it
                                    */

CaseDataDisplay.defaultProps = {
  className: '',
  wrapType: '',
  index: 1,
  next: false
};