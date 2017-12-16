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

    _initialiseProps.call(this);

    this.state = {
      objectType: ['object', 'scope', 'array', 'tuple', 'model'],
      value: this.initValue(props)
    };
  }

  componentWillReceiveProps(props) {
    if (props && this.props && !_lodash2.default.isEqual(this.props.value, props.value)) {
      // console.log('=======this.props.value', this.props.value);
      // console.log('=======props.value', props.value);
      this.setState({ value: this.initValue(props) });
    }
  }

  render() {
    let {
      className, type, wrapType, next
    } = this.props;
    let { objectType, value } = this.state;
    // console.log('======CaseDataDisplay');
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
          _lodash2.default.map(value, (f, i) => {
            if (f.children && f.children.fields && f.children.fields.length) {
              return _react2.default.createElement(
                'div',
                { key: f.id, className: 'field-children' },
                _react2.default.createElement('div', {
                  ref: ref => {
                    this.refIconMap[f.id] = ref;
                  },
                  className: 'icon icon-toggle-field toggle-hide',
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
                    ref: ref => {
                      this.refchildrenMap[f.id] = ref;
                    },
                    className: 'field-children-value'
                  },
                  _react2.default.createElement(
                    'div',
                    { className: 'property-show' },
                    this.props.index && this.props.index <= 2 ? _react2.default.createElement(CaseDataDisplay, {
                      index: this.props.index + 1,
                      value: f.children.fields,
                      wrapType: f.fieldType,
                      type: f.modelType,
                      next: parseInt(i) < value.length - 1
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
                    parseInt(i) < value.length - 1 ? _react2.default.createElement(
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
                f.caseValueEle || f.default
              ),
              parseInt(i) < value.length - 1 ? _react2.default.createElement(
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

var _initialiseProps = function () {
  this.refchildrenMap = {};
  this.refIconMap = {};

  this.initValue = props => {
    let { value } = props;
    return _lodash2.default.map(value, f => {
      if (f.children && f.children.fields && f.children.fields.length) {
        return f;
      }
      return Object.assign({}, f, {
        caseValueEle: this.getCaseValueEle(f) || f.mock || f.default || f.fieldType + '类型'
      });
    });
  };

  this.toggleField = f => {
    let refchildren = this.refchildrenMap[f.id];
    let refIcon = this.refIconMap[f.id];
    if (refchildren && refIcon) {
      let className = refchildren.className;
      if (className.indexOf('open') > -1) {
        refchildren.className = 'field-children-value';
        refIcon.className = 'icon icon-toggle-field toggle-hide';
        return;
      }
      refchildren.className = 'field-children-value open';
      refIcon.className = 'icon icon-toggle-field toggle-show';
    }
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
    let fieldValue = f.mockResult;
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
};