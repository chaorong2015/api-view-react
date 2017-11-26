'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/17.
 * chaorong@maichong.it
 */

class CaseDataDisplay extends _react2.default.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeObj: []
    };

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

    this.state = {
      objectType: ['object', 'scope', 'array', 'tuple', 'model']
      // open: false
    };
  }

  render() {
    let { className, value, type, wrapType, next } = this.props;
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
                  className: !this.state[f.id] ? 'toggle-show' : 'toggle-hide',
                  onClick: () => this.toggleField(f)
                }),
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
                  'div',
                  { className: 'field-children-value' },
                  !this.state[f.id] ? _react2.default.createElement(
                    'div',
                    null,
                    this.props.index <= 2 ? _react2.default.createElement(CaseDataDisplay, {
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
                  ) : _react2.default.createElement(
                    'div',
                    null,
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
                { className: f.fieldType ? 'value ' + f.fieldType : 'value' },
                f.mock || f.default || f.fieldType + '类型'
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
exports.default = CaseDataDisplay;
CaseDataDisplay.defaultProps = {
  className: '',
  wrapType: '',
  index: 1,
  next: false
};