'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMockData = getMockData;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mockjs = require('mockjs');

var _mockjs2 = _interopRequireDefault(_mockjs);

var _vm = require('vm2');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const nodeVm = new _vm.NodeVM({
  console: 'inherit',
  sandbox: {},
  require: {
    external: true
  }
}); /**
     * 脉冲软件
     * http://maichong.it
     * @Created by Rong on 2017/11/25.
     * @author Rong <chaorong@maichong.it>
     */

function sandBox(fn) {
  let functionInSandbox = nodeVm.run('var Mock = require("mockjs");' + `module.exports = function() { return ${fn} }`, 'vm.js');
  return functionInSandbox();
}

function getMockData(field, index) {
  if (!index) index = 0;
  if (index > 2) return null; //防止死循环
  let obj = {};
  obj.name = field.title;
  let value = _lodash2.default.get(field, 'mock', '');
  let defaultValue = _lodash2.default.get(field, 'default', '');
  if (field.type === 'string') {
    obj.value = defaultValue || '';
    //判断是否有示例值
    if (!obj.value) {
      if (/^Mock.+\([^;]*\);?$/.test(value)) {
        // console.log('=====value', value);
        try {
          obj.value = sandBox(value);
        } catch (err) {
          console.error('sandBox Error', err.message || err);
          obj.value = '';
        }
      } else {
        obj.value = value;
      }
    }
    if (!obj.value) {
      let regular = _lodash2.default.get(field, 'options.regular', '');
      obj.value = _mockjs2.default.mock(new RegExp(regular));
    }
    if (!obj.value) {
      let format = _lodash2.default.get(field, 'options.format', '');
      switch (format) {
        case 'date-time':
          obj.value = _mockjs2.default.mock('@datetime');
          break;
        case 'email':
          obj.value = _mockjs2.default.mock('@email');
          break;
        case 'hostname':
          obj.value = _mockjs2.default.mock('@domain');
          break;
        case 'ipv4':
          obj.value = _mockjs2.default.mock('@ip');
          break;
        case 'ipv6':
          obj.value = _mockjs2.default.mock(/(\d{1,4}:){7}\d{1,4}/);
          break;
        case 'uri':
          obj.value = _mockjs2.default.mock('@url');
          break;
        default:
          obj.value = '';
          break;
      }
    }
    if (!obj.value) {
      let min = _lodash2.default.get(field, 'options.min', 0);
      let max = _lodash2.default.get(field, 'options.max', 0);
      if (min <= max && max > 0) {
        obj.value = _mockjs2.default.Random.string(min, max);
      } else {
        obj.value = _mockjs2.default.Random.string();
      }
    }
  } else if (field.type === 'string[]') {
    obj.value = defaultValue || '';
    if (!obj.value) {
      if (/^\[?Mock.+\([^;]*\)\]?;?$/.test(value)) {
        try {
          let v = sandBox(value);
          if (v instanceof Array) {
            obj.value = v;
          }
        } catch (err) {
          obj.value = [];
        }
      } else if (value) {
        try {
          let v = JSON.parse(value);
          if (v instanceof Array) {
            obj.value = v;
          }
        } catch (err) {
          obj.value = [];
        }
      }
    }
    if (!obj.value) {
      let regular = _lodash2.default.get(field, 'options.regular', '');
      if (regular) {
        let arr = new Array(_lodash2.default.random(1, 5));
        obj.value = _lodash2.default.fill(arr, _mockjs2.default.mock(new RegExp(regular)));
      }
    }
    if (!obj.value) {
      let format = _lodash2.default.get(field, 'options.format', '');
      let res;
      switch (format) {
        case 'date-time':
          res = _mockjs2.default.mock({ 'array|1-5': ['@datetime'] });
          break;
        case 'email':
          res = _mockjs2.default.mock({ 'array|1-5': ['@email'] });
          break;
        case 'hostname':
          res = _mockjs2.default.mock({ 'array|1-5': ['@domain'] });
          break;
        case 'ipv4':
          res = _mockjs2.default.mock({ 'array|1-5': ['@ip'] });
          break;
        case 'ipv6':
          res = _mockjs2.default.mock({ 'array|1-5': [/(\d{1,4}:){7}\d{1,4}/] });
          break;
        case 'uri':
          res = _mockjs2.default.mock({ 'array|1-5': ['@url'] });
          break;
        default:
          res = _mockjs2.default.mock({ 'array|1-5': ['@string'] });
          break;
      }
      obj.value = res.array;
    }
    if (!obj.value) {
      let min = _lodash2.default.get(field, 'options.min', 0);
      let max = _lodash2.default.get(field, 'options.max', 0);
      let res;
      if (min <= max && max > 0) {
        res = _mockjs2.default.mock({ 'array|1-5': [`@string(${min},${max})`] });
      } else {
        res = _mockjs2.default.mock({ 'array|1-5': ['@string'] });
      }
      obj.value = res.array;
    }
  } else if (field.type === 'number') {
    //是否有默认值
    if (defaultValue) {
      obj.value = parseFloat(defaultValue) || 0;
      //是否有示例值
    } else if (value) {
      if (/^Mock.+\([^;]*\);?$/.test(value)) {
        try {
          let v = sandBox(value);
          if (typeof v === 'number') {
            obj.value = v;
          }
        } catch (err) {
          obj.value = 0;
        }
      } else {
        let v = parseFloat(value);
        obj.value = v || 0;
      }
      //是否有最小值最大值
    } else {
      let min = _lodash2.default.get(field, 'options.min', 0);
      let max = _lodash2.default.get(field, 'options.max', 0);
      if (min <= max && max > 0) {
        obj.value = _mockjs2.default.mock(`@natural(${min},${max})`);
      } else {
        obj.value = _mockjs2.default.mock('@natural');
      }
    }
  } else if (field.type === 'number[]') {
    //是否有默认值
    if (defaultValue) {
      try {
        let v = JSON.parse(defaultValue);
        if (v instanceof Array) {
          obj.value = v;
        }
      } catch (err) {
        obj.value = [];
      }
    } else if (value) {
      if (/^\[?Mock.+\([^;]*\)\]?;?$/.test(value)) {
        try {
          let v = sandBox(value);
          if (v instanceof Array) {
            obj.value = v;
          } else {
            obj.value = [];
          }
        } catch (err) {
          obj.value = 0;
        }
      } else {
        try {
          let v = JSON.parse(value);
          if (v instanceof Array) {
            obj.value = v;
          } else {
            obj.value = [];
          }
        } catch (err) {
          obj.value = [];
        }
      }
    } else {
      let min = _lodash2.default.get(field, 'options.min', 0);
      let max = _lodash2.default.get(field, 'options.max', 0);
      let res;
      if (min <= max && max > 0) {
        res = _mockjs2.default.mock({
          'array|1-5': [`@natural(${min},${max})`]
        });
      } else {
        res = _mockjs2.default.mock({
          'array|1-5': ['@natural']
        });
      }
      obj.value = res.array;
    }
  } else if (field.type === 'boolean') {
    obj.value = true;
    if (defaultValue && (defaultValue === 'false' || defaultValue === '0')) {
      obj.value = false;
    } else if (value) {
      if (/^Mock.+\([^;]*\);?$/.test(value)) {
        try {
          let v = sandBox(value);
          obj.value = v;
        } catch (err) {
          obj.value = false;
        }
      } else {
        let v = value !== 'false' && value !== '0';
        obj.value = v;
      }
    }
  } else if (field.type === 'boolean[]') {
    //是否有默认值
    if (defaultValue) {
      try {
        let v = JSON.parse(defaultValue);
        if (v instanceof Array) {
          obj.value = _lodash2.default.map(v, i => !!i);
        }
      } catch (err) {
        obj.value = [false];
      }
    } else if (value) {
      if (/^\[?Mock.+\([^;]*\)\]?;?$/.test(value)) {
        try {
          let v = sandBox(value);
          if (v instanceof Array) {
            obj.value = _lodash2.default.map(v, i => !!i);
          } else {
            obj.value = [false];
          }
        } catch (err) {
          obj.value = [false];
        }
      } else {
        try {
          let v = JSON.parse(value);
          if (v instanceof Array) {
            obj.value = _lodash2.default.map(v, i => !!i);
          } else {
            obj.value = [false];
          }
        } catch (err) {
          obj.value = [false];
        }
      }
    } else {
      let res = _mockjs2.default.mock({
        'array|1-5': ['@boolean']
      });
      obj.value = res.array;
    }
  } else if (field.type === 'object') {
    obj.value = {};
  } else if (field.type === 'object[]') {
    obj.value = [{}];
  } else if (field.type === 'null') {
    obj.value = null;
  } else if (field.type === 'enum') {
    if (defaultValue) {
      obj.value = defaultValue;
    } else if (value) {
      if (/^Mock.+\([^;]*\);?$/.test(value)) {
        try {
          let v = sandBox(value);
          obj.value = v;
        } catch (err) {
          obj.value = 1;
        }
      } else {
        obj.value = value;
      }
    } else {
      obj.value = _lodash2.default.random(1, 5);
      let enumValue = _lodash2.default.get(field, 'options.enumValue', []);
      if (enumValue && enumValue.length > 0) {
        let v = _lodash2.default.random(0, enumValue.length - 1);
        obj.value = enumValue[v];
      }
    }
  } else if (field.type === 'null') {
    obj.value = null;
  } else if (field.type === 'mix') {
    if (defaultValue) {
      try {
        obj.value = JSON.parse(defaultValue);
      } catch (err) {
        obj.value = {};
      }
    } else if (value) {
      if (/^\[?Mock.+\([^;]*\)\]?;?$/.test(value)) {
        try {
          obj.value = sandBox(value);
        } catch (err) {
          obj.value = 0;
        }
      } else {
        try {
          obj.value = JSON.parse(value);
        } catch (err) {
          obj.value = {};
        }
      }
    } else {
      let res = _mockjs2.default.mock({ 'array|1-5': ['@string'] });
      obj.value = res.array;
    }
  } else if (field.type === 'union' && !field.modelTitle) {
    //对数据类型进行简单处理
    let type = field.fieldType;
    if (field.fieldType === 'array') {
      type = field.modelType + '[]';
    }
    let temp = Object.assign({}, field, { type });
    obj.value = getMockData(temp, index + 1);
    // obj.value = 'union';
  } else {
    obj.value = null;
  }
  return obj.value;
}