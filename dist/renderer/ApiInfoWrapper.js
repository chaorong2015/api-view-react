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

  constructor(props) {
    super(props);
    this.state = {
      mapGroup: {}
    };
  }

  //初始化分组
  getMapGroup(props) {
    let { value } = props;
    let mapGroup = {};
    if (value.groups) {
      _lodash2.default.map(value.groups, group => {
        mapGroup[group.id] = {
          id: group.id,
          title: group.title,
          routes: []
        };
      });
      _lodash2.default.map(value.routes, route => {
        if (route.group && mapGroup[route.group]) {
          mapGroup[route.group].routes.push(Object.assign(route));
        }
      });
    }
    return mapGroup;
  }

  render() {
    let { value, className } = this.props;
    let mapGroup = this.getMapGroup(this.props);
    let relationData = {
      objects: value.objects,
      tuples: value.tuples,
      schemas: value.schemas,
      fields: value.fields,
      scopes: value.scopes,
      responses: value.responses
    };
    return _react2.default.createElement(
      'div',
      { className: className ? className + ' api-info-wrapper' : 'api-info-wrapper' },
      value.descriptions && value.descriptions.length ? _lodash2.default.map(value.descriptions, d => _react2.default.createElement(
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
      value.objects && value.objects.length ? _react2.default.createElement(
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
        _lodash2.default.map(value.objects, o => _react2.default.createElement(_ApiObject2.default, {
          key: o.id,
          relation: relationData,
          className: 'api-object',
          value: o,
          baseUrl: this.props.baseUrl || ''
        }))
      ) : null,
      value.tuples && value.tuples.length ? _react2.default.createElement(
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
        _lodash2.default.map(value.tuples, t => _react2.default.createElement(_ApiTuple2.default, {
          key: t.id,
          relation: relationData,
          className: 'api-tuple',
          value: t,
          baseUrl: this.props.baseUrl || ''
        }))
      ) : null,
      value.codes && value.codes.length ? _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_ApiCode2.default, { className: 'codes-panel api-codes', value: value.codes })
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