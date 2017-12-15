'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFieldMaps = setFieldMaps;
exports.getFieldMaps = getFieldMaps;
exports.getSimpleModelByFieldType = getSimpleModelByFieldType;
exports.getFieldsOfModel = getFieldsOfModel;
exports.filterRouteFieldsByType = filterRouteFieldsByType;
exports.getFieldsOfBody = getFieldsOfBody;
exports.getFieldsOfResponse = getFieldsOfResponse;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fieldMaps = {};
/* 根据refId归类Field的Map图
 * fields 所有的字段数组
 * 返回数据 Field的Map图
 * */
/**
 * 脉冲软件
 * http://maichong.it
 * @Created by Rong on 2017/11/17.
 * @author Rong <chaorong@maichong.it>
 */

function setFieldMaps(fields) {
  if (!fields) {
    throw new Error('fields is required in getFieldMapsByRefId');
  }
  let map = {};
  _lodash2.default.map(fields, f => {
    if (f.refId) {
      if (!map[f.refId]) map[f.refId] = [];
      map[f.refId].push(f);
    }
  });
  fieldMaps = map;
  return fieldMaps;
}
/**返回数据 Field的Map图
* */
function getFieldMaps() {
  return fieldMaps;
}
/* 根据对象名获取Model
 * title model的title，例如 User$Base
 * type model的类型，例如 scope
 * params 要查找的model所对应的过滤条件，即所属项目，所属库，所属版本
 * relationData 相关联的所有数据
 * 返回数据  返回一个模型的所有数据，例如User$Base里的数据
 * */
function getModelByTitle(title, type, params, relationData) {
  if (!title) {
    throw new Error('title:string is required in getModelByTitle');
  }
  if (!params) {
    throw new Error('params:Object is required in getModelByTitle');
  }
  if (!params.project && !params.library) {
    throw new Error('project or library of params is required in getModelByTitle');
  }
  if (type !== 'object' && type !== 'scope' && type !== 'tuple') {
    throw new Error('type must be object or scope or tuple');
  }
  if (!relationData) {
    throw new Error('relationData is required in getModelByTitle');
  }
  let { project, library, version } = params;
  if (!project) project = library.split('/')[0];
  let result = null;
  let temp = null;
  switch (type) {
    case 'object':
      {
        temp = relationData.objects;
        break;
      }
    case 'scope':
      {
        temp = relationData.scopes;
        break;
      }
    case 'tuple':
      {
        temp = relationData.tuples;
        break;
      }
    default:
  }
  if (temp) {
    _lodash2.default.map(temp, o => {
      if (o.project === project && o.library === library && o.version === version && o.title === title && !o.share) {
        result = o;
      }
      if (!result && o.project === project && o.title === title && o.share) {
        result = o;
      }
    });
  }
  return result;
}

/* 通过字段类型获取一个简单的model
 * fieldType 字段里type里保存的类型，例如 User$Base[]
 * 返回数据  返回一个与类型相关的数据
 * 例如 {
 modelType: 'scope', //模型的类型
 modelTitle: 'User$Base', //模型的title
 fieldType: 'array', //字段的类型
 hasFields: true //是否有字段数组
 };
 * */
function getSimpleModelByFieldType(fieldType) {
  if (!fieldType) return {};
  if (typeof fieldType !== 'string') {
    throw new Error('param is string in getSimpleModelByFieldType');
  }
  let model = {
    modelType: '', //模型的类型
    modelTitle: '', //模型的title
    fieldType: '', //字段的类型
    hasFields: false //是否有字段数组
  };
  if (/^(.+)\[\]$/.test(fieldType)) {
    model.fieldType = 'array';
    let typeArr = fieldType.match(/^(.+)\[\]/);
    if (typeArr && typeArr[1] !== 'string' && typeArr[1] !== 'number' && typeArr[1] !== 'object') {
      model.hasFields = true;
      let temp = getSimpleModelByFieldType(typeArr[1]);
      model.modelType = temp.modelType;
      model.modelTitle = temp.modelTitle;
      return model;
    }
    model.modelType = typeArr ? typeArr[1] : '';
    return model;
  }
  if (/^\[(.+)\]$/.test(fieldType)) {
    let typeArr = fieldType.match(/^\[(.+)\]$/);
    model.fieldType = 'model';
    model.modelType = 'tuple';
    model.modelTitle = typeArr ? typeArr[1] : '';
    model.hasFields = true;
    return model;
  }
  if (/^(.+)\$(.+)$/.test(fieldType)) {
    model.fieldType = 'model';
    model.modelType = 'scope';
    model.modelTitle = fieldType;
    model.hasFields = true;
    return model;
  }
  if (/^&(.+)/.test(fieldType)) {
    model.fieldType = 'ref';
    model.modelType = 'object';
    model.modelTitle = fieldType.split('&')[1];
    return model;
  }
  if (/^[A-Z].*/.test(fieldType)) {
    model.fieldType = 'model';
    model.modelType = 'object';
    model.modelTitle = fieldType;
    model.hasFields = true;
    return model;
  }
  if (fieldType === '{}') {
    model.fieldType = 'object';
    model.hasFields = true;
    return model;
  }
  model.fieldType = fieldType;
  return model;
}

/* 获取字段类型中的模型，处理包含getSimpleModelByFieldType里的字段，好包含model在数据库里的数据
 * field 字段
 * relationData 相关联的所有数据
 * 返回数据 一个model所有数据，包括getSimpleModelByFieldType里的数据
 * */
function getModelOfFieldType(field, relationData) {
  if (!field) {
    throw new Error('field is required in getModelOfFieldType');
  }
  if (!relationData) {
    throw new Error('relationData is required in getModelOfFieldType');
  }
  let model = getSimpleModelByFieldType(field.type || '');
  let params = { project: field.project, library: field.library, version: field.version };
  let title = model.modelTitle;
  if (!model.hasFields && title && model.fieldType === 'ref') {
    return Object.assign({}, model, getModelByTitle(title, model.modelType, params, relationData) || {});
  }
  if (model.hasFields && title) {
    return Object.assign({}, model, getModelByTitle(title, model.modelType, params, relationData) || {});
  }
  return null;
}

//
/* 获取对象的字段
 * model model数据，例如 User$Base里所有数据
 * relationData 相关联的所有数据
 * 返回数据 返回一个整理后的field，其中增加了children对象，children里包含字段的子字段fields
 * */
function getFieldsOfModel(model, relationData, i) {
  if (!i) i = 0;
  let results = [];
  if (i > 3) return results; //循环只能为2次
  let modelType = '';
  //判断模型类型
  let s = getSimpleModelByFieldType(model.title);
  let list = [];
  //如果为scope，需要得到scope对应的object字段
  if (s.modelType === 'scope') {
    if (!model.object) return results;
    list = fieldMaps[model.object];
    modelType = s.modelType;
  } else {
    list = fieldMaps[model.id];
  }
  _lodash2.default.map(list, field => {
    let f = null;
    //共享资源
    if (model.share && !field.version && field.project === model.project) {
      f = field;
    }
    //非共享资源
    if (!model.share && field.version === model.version && field.library === model.library) {
      f = field;
    }
    //是为了判断资源数据是否正确的
    if (f) {
      //如果为scope，从object字段组里判断scope需要的字段
      if (modelType === 'scope') {
        if (model.fields && model.fields.indexOf(field.title) > -1) return;
      }
      //通过字段的type值来找到对应的model
      let modelOfField = getModelOfFieldType(field, relationData || []);
      //获取字段对应model的类型模型
      let simpleModel = getSimpleModelByFieldType(field.type || '');

      if (modelOfField) {
        //说明字段对应的为object、scope、tuple的对象或数字类型
        //引用类型&
        if (simpleModel.fieldType === 'ref') {
          let disableFields = f.options && f.options.disabledFields ? f.options.disabledFields : [];
          //引用类型&user只显示一层，内部引用不显示
          if (disableFields && !i) {
            //获取字段type中模型的字段
            let simpleModelFields = getFieldsOfModel(modelOfField, relationData, i + 1);
            if (simpleModelFields && simpleModelFields.length) {
              _lodash2.default.map(simpleModelFields, sf => {
                //判断引用所显示的字段
                if (disableFields.indexOf(sf.title) < 0) {
                  let temp = getSimpleModelByFieldType(sf.type || '');
                  //{ ref: f.ref } 引用的ref字段的ref应该为引用他的字段的ref 如route:body
                  if (f && f.ref) {
                    results.push(Object.assign({}, sf, temp, { ref: f.ref }));
                  } else {
                    results.push(Object.assign({}, sf, temp));
                  }
                }
              });
            }
          }
        } else {
          //不是引用&类型，直接获取
          let children = Object.assign({}, modelOfField, { fields: getFieldsOfModel(modelOfField, relationData, i + 1) });
          let temp = getSimpleModelByFieldType(f.type || '');
          f = Object.assign({}, f, { children }, temp);
          results.push(f);
        }
      } else if (f.type === 'union') {
        if (f.options && f.options.unionType && f.options.unionType.length) {
          let t = f.options.unionType[0];
          let imitateField = {
            project: field.project,
            library: field.library,
            version: field.version,
            type: t
          };
          let temp = getModelOfFieldType(imitateField, relationData || []);
          if (temp) {
            let children = Object.assign({}, temp, { fields: getFieldsOfModel(temp, relationData, i + 1) });
            let sm = getSimpleModelByFieldType(imitateField.type || '');
            f = Object.assign({}, f, { children }, sm);
            results.push(f);
          } else {
            let sm = getSimpleModelByFieldType(imitateField.type || '');
            results.push(Object.assign({}, f, sm));
          }
        } else {
          let sm = getSimpleModelByFieldType(f.type || '');
          results.push(Object.assign({}, f, sm));
        }
      } else {
        //其他类型字段
        let temp = getSimpleModelByFieldType(f.type || '');
        results.push(Object.assign({}, f, temp));
      }
    }
  });
  return results;
}
//-----------------------------end--------------------------------------------------

//通过类型过滤字段
/* 根据对象名获取Model
 * title model的title，例如 User$Base
 * type model的类型，例如 scope
 * params 要查找的model所对应的过滤条件，即所属项目，所属库，所属版本
 * relationData 相关联的所有数据
 * */
function filterRouteFieldsByType(type, fields) {
  switch (type) {
    case 'route:path':
      {
        return _lodash2.default.filter(fields, item => item.ref === 'route:path');
      }
    case 'route:query':
      {
        return _lodash2.default.filter(fields, item => item.ref === 'route:query');
      }
    case 'route:body':
      {
        return _lodash2.default.filter(fields, item => item.ref === 'route:body');
      }
    default:
      return fields;
  }
}
/* 根据对象名获取Model
 * title model的title，例如 User$Base
 * type model的类型，例如 scope
 * params 要查找的model所对应的过滤条件，即所属项目，所属库，所属版本
 * relationData 相关联的所有数据
 * */
function getFieldsOfBody(route, relationData) {
  if (!route.bodyType) return null;
  if (route.bodyType !== '{}') {
    let simpleModel = getSimpleModelByFieldType(route.bodyType);
    if (!simpleModel.modelTitle) return null;
    if (route.project) route.project = route.library.split('/')[0];
    let params = { project: route.project, library: route.library, version: route.version };
    let model = getModelByTitle(simpleModel.modelTitle, simpleModel.modelType, params, relationData);
    if (!model) return null;
    let fields = getFieldsOfModel(model, relationData);
    return Object.assign({}, model, simpleModel, { fields });
  }
  let fields = getFieldsOfModel(route, relationData);
  let bodyFields = filterRouteFieldsByType('route:body', fields);
  if (bodyFields && bodyFields.length) {
    return Object.assign({}, route, { fieldType: '', modelType: 'object', fields: bodyFields });
  }
  return null;
}
/* 根据对象名获取Model
 * title model的title，例如 User$Base
 * type model的类型，例如 scope
 * params 要查找的model所对应的过滤条件，即所属项目，所属库，所属版本
 * relationData 相关联的所有数据
 * */
function getFieldsOfResponse(route, relationData) {
  let responses = [];
  _lodash2.default.map(relationData.responses, response => {
    if (route.id && response.route && route.id.toString() === response.route.toString()) {
      if (!response.type) return;
      if (response.type !== '{}') {
        let simpleModel = getSimpleModelByFieldType(response.type);
        if (!simpleModel.modelTitle) return;
        if (response.project) response.project = response.library.split('/')[0];
        let params = { project: response.project, library: response.library, version: response.version };
        let model = getModelByTitle(simpleModel.modelTitle, simpleModel.modelType, params, relationData);
        if (!model) return;
        let fields = getFieldsOfModel(model, relationData);
        responses.push(Object.assign({}, response, simpleModel, { fields }));
        return;
      }
      let fields = getFieldsOfModel(response, relationData);
      responses.push(Object.assign({}, response, { fieldType: '', modelType: 'object', fields }));
    }
  });
  return responses;
}