'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ApiDesc = require('./ApiDesc');

var _ApiDesc2 = _interopRequireDefault(_ApiDesc);

var _ApiGroup = require('./ApiGroup');

var _ApiGroup2 = _interopRequireDefault(_ApiGroup);

var _ApiRoute = require('./ApiRoute');

var _ApiRoute2 = _interopRequireDefault(_ApiRoute);

var _ApiObject = require('./ApiObject');

var _ApiObject2 = _interopRequireDefault(_ApiObject);

var _ApiTuple = require('./ApiTuple');

var _ApiTuple2 = _interopRequireDefault(_ApiTuple);

var _ApiCode = require('./ApiCode');

var _ApiCode2 = _interopRequireDefault(_ApiCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 2017/11/17.
 * chaorong@maichong.it
 */

class ApiInfoWrapper extends _react2.default.Component {

  render() {
    let {
      mapGroup, descriptions, objects, tuples, codes, fields, scopes, responses, className
    } = this.props;
    let relationData = {
      objects,
      tuples,
      fields,
      scopes,
      responses
    };
    // console.log('======ApiInfoWrapper');
    return _react2.default.createElement(
      'div',
      { className: className ? className + ' api-info-wrapper' : 'api-info-wrapper' },
      descriptions && descriptions.length ? _lodash2.default.map(descriptions, d => _react2.default.createElement(
        'div',
        { key: d.id },
        _react2.default.createElement(_ApiDesc2.default, { className: 'api-description', value: d })
      )) : null,
      _lodash2.default.map(mapGroup, group => _react2.default.createElement(
        'div',
        { key: group.id },
        _react2.default.createElement(_ApiGroup2.default, { className: 'api-group', value: group }),
        _lodash2.default.map(group.routes, route => _react2.default.createElement(_ApiRoute2.default, {
          baseUrl: this.props.baseUrl || '',
          className: 'api-route',
          key: route.id,
          relation: relationData,
          value: route
        }))
      )),
      objects && objects.length ? _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'api-title-panel' },
          _react2.default.createElement(
            'div',
            { className: 'title panel-left' },
            '\u5BF9\u8C61'
          ),
          _react2.default.createElement('div', { className: 'panel-right text-center' })
        ),
        _lodash2.default.map(objects, o => _react2.default.createElement(_ApiObject2.default, {
          key: o.id,
          relation: relationData,
          className: 'api-object',
          value: o,
          baseUrl: this.props.baseUrl || ''
        }))
      ) : null,
      tuples && tuples.length ? _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'api-title-panel' },
          _react2.default.createElement(
            'div',
            { className: 'title panel-left' },
            '\u5143\u7EC4'
          ),
          _react2.default.createElement('div', { className: 'panel-right text-center' })
        ),
        _lodash2.default.map(tuples, t => _react2.default.createElement(_ApiTuple2.default, {
          key: t.id,
          relation: relationData,
          className: 'api-tuple',
          value: t,
          baseUrl: this.props.baseUrl || ''
        }))
      ) : null,
      codes && codes.length ? _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_ApiCode2.default, { className: 'codes-panel api-codes', value: codes })
      ) : null,
      _react2.default.createElement(
        'div',
        { className: 'api-module-panel empty-panel' },
        _react2.default.createElement('div', { className: 'panel-left' }),
        _react2.default.createElement('div', { className: 'panel-right text-center' })
      )
    );
  }
}
exports.default = ApiInfoWrapper;
ApiInfoWrapper.defaultProps = {
  className: '',
  baseUrl: ''
};