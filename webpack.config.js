/**
 * 脉冲软件
 * http://maichong.it
 * @Created by Rong on 2017/11/26.
 * @author Rong <chaorong@maichong.it>
 */

var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: {
    app: './index.jsx',
    vendor: ['react', 'react-dom']
  },
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '/dist')
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        loaders: ['babel?presets[]=react,presets[]=es2015'],
        query: {
          babelrc: false,
          presets: ['react', 'stage-0'],
          plugins: [
            "transform-decorators-legacy",
            "syntax-export-extensions",
            "syntax-flow",
            'syntax-class-properties',
            'transform-class-properties',
            "transform-flow-strip-types",
            'transform-es2015-destructuring',
            'transform-es2015-arrow-functions',
            'transform-es2015-parameters',
            'transform-es2015-for-of',
            'transform-es2015-shorthand-properties',
            'transform-es2015-spread',
            'transform-es2015-classes',
            'transform-es2015-block-scoping',
            'transform-es2015-template-literals',
            ['transform-runtime', {
              "helpers": false,
              "polyfill": false,
              "regenerator": true,
              "moduleName": "babel-runtime"
            }]
          ]
        }
      }
    ]
  }
};

