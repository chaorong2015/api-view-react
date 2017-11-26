/**
 * 脉冲软件
 * http://maichong.it
 * @Created by Rong on 2017/11/26.
 * @author Rong <chaorong@maichong.it>
 */

let alertCommand = 'ls';
let path = 'api-view-react/';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      base: {
        options: {
          paths: 'less',
          compress: false,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapBasepath: 'less',
          banner: ''
        },
        files: {
          'api-view-react/css/style.css': path + 'less/index.less',
        }
      }
    },
    cssmin: {
      options: {
        sourceMap: false,
        rebase: false,
        advanced: false
      },
      live: {
        files: {
          'api-view-react/css/style.min.css': ['api-view-react/css/style.css']
        }
      }
    },
    shell: {
      alert: {
        command: alertCommand
      }
    },
    watch: {
      less: {
        options: {},
        files: ['less/**/*.less'],
        tasks: ['less', 'shell:alert']
      }
    }
  });
  grunt.registerTask('default', ['less', 'cssmin']);
};
