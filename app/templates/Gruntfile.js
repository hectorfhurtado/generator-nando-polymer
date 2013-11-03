'use strict';
/* global module */

module.exports = function (grunt) {

    grunt.initConfig({
        watch: {
            css: {
                files: 'public/html/**/*.scss',
                tasks: [ 'sass' ],
                options: {
                    nospawn: true
                }
            },
            componente: {
                files: 'public/html/**/*.spec.js',
                tasks: [ 'specAPoly' ],
                options: {
                    nospawn: false
                }
            }
        },
        sass: {
            desarrollo: {
                options: {
                    compass: true,
                    style: 'compressed'
                },
                expand: true,
                src: 'public/html/**/*.scss',
                ext: '.css'
            }
        },
        copy: {
            distribucion: {
                files: [
                    {
                        expand: true,
                        src: 'public/bower_components/polymer/polymer.min.js',
                        dest: 'dist/'
                    },
                    {
                        expand: true,
                        src: 'public/html/**',
                        dest: 'dist/'
                    }<% if ( puerto ) {%>,
                    {
                        expand: true,
                        src: [ 'routes/**', 'views/**' ],
                        dest: 'dist/'
                    },
                    {
                        espand: true,
                        src: 'app.js',
                        dest: 'dist/'
                    }<% } %>
                ]
            }
        },

        uglify: {
            public: {
                options: {
                    mangle: {
                        except: [ 'Polymer' ]
                    }
                },
                expand: true,
                src: 'dist/public/**/*.js'
            }
        },

        cssmin: {
            minify : {
                options: {
                    verbose: true
                },
                expand  : true,
                src     : 'dist/public/html/**/*.css'
            }
        },

        polyconcat: {
            unity: {
                expand  : true,
                src     : 'dist/public/html/**/*.html'
            }
        },

        htmlmin : {
            build: {
                options : {
                    removeComments          : true,
                    collapseWhitespace      : true,
                    removeCommentsFromCDATA : true
                },
                expand  : true,
                src     : 'dist/public/html/**/*.html'
            }
        },

        clean: {
            precopy: {
                expand: true,
                src: [
                    'public/**/*.spec/*.*',
                    'public/**/*.spec/'
                ]
            },
            postcopy: {
                expand: true,
                src: [
                    'dist/public/html/**/*.test.html',
                    'dist/public/html/**/*.spec.html',
                    'dist/**/*.spec.js'
                ]
            },
            build: {
                expand: true,
                src: [
                    'dist/public/html/**/*.test.html',
                    'dist/public/html/**/*.spec.html',
                    'dist/**/*.spec.js',
                    'dist/public/html/**/*.js',
                    'dist/public/html/**/*.css',
                    'dist/public/html/**/*.scss',
                    'dist/public/html/**/*.map',
                    'dist/**/*.txt'
                ]
            }
        },

        specAPoly: {
            build: {
                expand: true,
                src: 'public/html/**/*.spec.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadTasks('tareas/');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['watch' ]);

    grunt.registerTask('build', [
        'specAPoly:build',
        'clean:precopy',
        'copy',
        'clean:postcopy',
        'uglify:public',
        'sass',
        'cssmin',
        'polyconcat',
        'htmlmin',
        'clean:build',
        'cambioString'
    ]);
};
