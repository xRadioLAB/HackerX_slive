/**
 * @project love
 * @file    Gruntfile.js
 * @author  St. <st_sister@icloud.com>
 * @time    2016-06-15
 */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: ('/**\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> Xinhuanet Inc. All rights reserved.\n' +
            ' * <%= pkg.name %>\n' +
            ' * @time <%= grunt.template.today("yyyy-mm-dd-HH.MM.ss") %>\n' +
            ' */\n'),
        uglify: { // js混淆压缩
            options: {
                banner: '<%= banner %>'
            },
            execute: {
                files: {
                    'lib/resLoader.min.js': ['lib/resLoader.js'],
                    'lib/jquery.browser.min.js': ['lib/jquery.browser.js'],
                    'js/index.min.js': ['js/index.js']
                }
            }
        },
        cssmin: { // css压缩
            options: {
                //shorthandCompacting: false,
                //roundingPrecision: -1
            },
            execute: {
                files: {
                    'css/style.min.css': ['css/style.css'],
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
                    'css/style.min.css': ['css/style.min.css'],
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['uglify', 'cssmin', 'concat']);
    // grunt.registerTask('default', ['cssmin', 'concat']);
    // grunt.registerTask('default', ['uglify']);

    // grunt.registerTask('default', ['build']);

    // grunt.registerTask('test', ['jshint']);
    // grunt.registerTask('build', ['js', 'swf', 'css']);
    // grunt.registerTask('build', ['js'/*, 'css'*/]);
    // grunt.registerTask('js', ['concat:amp', 'uglify']);
    // grunt.registerTask('js', ['uglify']);
    // grunt.registerTask('swf', ['mxmlc']);
    // grunt.registerTask('css', ['cssmin', 'concat:cssAddBanner']);

};
