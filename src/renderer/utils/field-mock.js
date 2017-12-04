/**
 * 脉冲软件
 * http://maichong.it
 * @Created by Rong on 2017/11/25.
 * @author Rong <chaorong@maichong.it>
 */

// @flow

import _ from 'lodash';
import Mock from 'mockjs';

export function getMockData(field:Object, index?:number|null):any {
  if (!index) index = 0;
  if (index > 2) return null; //防止死循环
  let obj = {};
  obj.name = field.title;
  let value = _.get(field, 'mock', '');
  let defaultValue = _.get(field, 'default', '');
  if (field.type === 'string') {
    obj.value = defaultValue || '';
    //判断是否有示例值
    if (!obj.value) {
      if (/^Mock.+\([^;]+\);?$/.test(value)) {
        try {
          //todo 替换eval方法
          obj.value = eval(value);
        } catch (err) {
          obj.value = '';
        }
      } else {
        obj.value = value;
      }
    }
    if (!obj.value) {
      let regular = _.get(field, 'options.regular', '');
      obj.value = Mock.mock(new RegExp(regular));
    }
    if (!obj.value) {
      let format = _.get(field, 'options.format', '');
      switch (format) {
        case 'date-time':
          obj.value = Mock.mock('@datetime');
          break;
        case 'email':
          obj.value = Mock.mock('@email');
          break;
        case 'hostname':
          obj.value = Mock.mock('@domain');
          break;
        case 'ipv4':
          obj.value = Mock.mock('@ip');
          break;
        case 'ipv6':
          obj.value = Mock.mock(/(\d{1,4}:){7}\d{1,4}/);
          break;
        case 'uri':
          obj.value = Mock.mock('@url');
          break;
        default:
          obj.value = '';
          break;
      }
    }
    if (!obj.value) {
      let min = _.get(field, 'options.min', 0);
      let max = _.get(field, 'options.max', 0);
      if (min <= max && max > 0) {
        obj.value = Mock.Random.string(min, max);
      } else {
        obj.value = Mock.Random.string();
      }
    }
  } else if (field.type === 'string[]') {
    obj.value = defaultValue || '';
    if (!obj.value) {
      if (/^\[?Mock.+\([^;]+\)\]?;?$/.test(value)) {
        try {
          //todo 替换eval方法
          let v = eval(value);
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
      let regular = _.get(field, 'options.regular', '');
      if (regular) {
        let arr = new Array(_.random(1, 5));
        obj.value = _.fill(arr, Mock.mock(new RegExp(regular)));
      }
    }
    if (!obj.value) {
      let format = _.get(field, 'options.format', '');
      let res;
      switch (format) {
        case 'date-time':
          res = Mock.mock({ 'array|1-5': ['@datetime'] });
          break;
        case 'email':
          res = Mock.mock({ 'array|1-5': ['@email'] });
          break;
        case 'hostname':
          res = Mock.mock({ 'array|1-5': ['@domain'] });
          break;
        case 'ipv4':
          res = Mock.mock({ 'array|1-5': ['@ip'] });
          break;
        case 'ipv6':
          res = Mock.mock({ 'array|1-5': [/(\d{1,4}:){7}\d{1,4}/] });
          break;
        case 'uri':
          res = Mock.mock({ 'array|1-5': ['@url'] });
          break;
        default:
          res = Mock.mock({ 'array|1-5': ['@string'] });
          break;
      }
      obj.value = res.array;
    }
    if (!obj.value) {
      let min = _.get(field, 'options.min', 0);
      let max = _.get(field, 'options.max', 0);
      let res;
      if (min <= max && max > 0) {
        res = Mock.mock({ 'array|1-5': [`@string(${min},${max})`] });
      } else {
        res = Mock.mock({ 'array|1-5': ['@string'] });
      }
      obj.value = res.array;
    }
  } else if (field.type === 'number') {
    //是否有默认值
    if (defaultValue) {
      obj.value = parseFloat(defaultValue) || 0;
      //是否有示例值
    } else if (value) {
      if (/^Mock.+\([^;]+\);?$/.test(value)) {
        try {
          //todo 替换eval方法
          let v = eval(value);
          if (typeof v === 'number') {
            obj.value = v;
          }
        } catch (err) {
          obj.value = 0;
        }
      }
      //是否有最小值最大值
    } else {
      let min = _.get(field, 'options.min', 0);
      let max = _.get(field, 'options.max', 0);
      if (min <= max && max > 0) {
        obj.value = Mock.mock(`@natural(${min},${max})`);
      } else {
        obj.value = Mock.mock('@natural');
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
      if (/^\[?Mock.+\([^;]+\)\]?;?$/.test(value)) {
        try {
          //todo 替换eval方法
          let v = eval(value);
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
      let min = _.get(field, 'options.min', 0);
      let max = _.get(field, 'options.max', 0);
      let res;
      if (min <= max && max > 0) {
        res = Mock.mock({
          'array|1-5': [
            `@natural(${min},${max})`
          ]
        });
      } else {
        res = Mock.mock({
          'array|1-5': [
            '@natural'
          ]
        });
      }
      obj.value = res.array;
    }
  } else if (field.type === 'boolean') {
    obj.value = true;
    if (defaultValue && defaultValue === 'false') {
      obj.value = false;
    } else if (value) {
      if (/^Mock.+\([^;]+\);?$/.test(value)) {
        try {
          let v = eval(value);
          obj.value = v;
        } catch (err) {
          obj.value = false;
        }
      }
    }
  } else if (field.type === 'boolean[]') {
    //是否有默认值
    if (defaultValue) {
      try {
        let v = JSON.parse(defaultValue);
        if (v instanceof Array) {
          obj.value = v;
        }
      } catch (err) {
        obj.value = [false];
      }
    } else if (value) {
      if (/^\[?Mock.+\([^;]+\)\]?;?$/.test(value)) {
        try {
          //todo 替换eval方法
          let v = eval(value);
          if (v instanceof Array) {
            obj.value = v;
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
            obj.value = v;
          } else {
            obj.value = [false];
          }
        } catch (err) {
          obj.value = [false];
        }
      }
    } else {
      let res = Mock.mock({
        'array|1-5': [
          '@boolean'
        ]
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
      if (/^Mock.+\([^;]+\);?$/.test(value)) {
        try {
          let v = eval(value);
          obj.value = v;
        } catch (err) {
          obj.value = 1;
        }
      } else {
        obj.value = value;
      }
    } else {
      obj.value = _.random(1, 5);
      let enumValue = _.get(field, 'options.enumValue', []);
      if (enumValue && enumValue.length > 0) {
        let v = _.random(0, enumValue.length - 1);
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
      if (/^\[?Mock.+\([^;]+\)\]?;?$/.test(value)) {
        try {
          //todo 替换eval方法
          obj.value = eval(value);
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
      let res = Mock.mock({ 'array|1-5': ['@string'] });
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

