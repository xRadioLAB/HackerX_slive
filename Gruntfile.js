/**
 * @project slive
 * @file    Gruntfile.js
 * @author  St. <st_sister@icloud.com>
 * @time    2016-07-05
 */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: ('/**\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> Team Quincopter\n' +
            ' * <%= pkg.name %>\n' +
            ' * @time <%= grunt.template.today("yyyy-mm-dd-HH.MM.ss") %>\n' +
            ' */\n'),
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            execute: {
                files: {
                    'static/js/goto.min.js': ['static/js/goto.js'],
                    'static/js/index.min.js': ['static/js/index.js']
                }
            }
        },
        cssmin: {
            execute: {
                files: {
                    'static/css/app.min.css': ['static/css/app.css'],
                }
            }
        },
        concat: { //给压缩后的css添加注释
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            cssAddBanner: {
                files: {
                    'static/css/app.min.css': ['static/css/app.min.css']
                }
            }
        }
    });
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['uglify', 'cssmin', 'concat']);
};
