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
                    },
                    {
                        expand: true,
                        src: [ 'routes/**', 'views/**' ],
                        dest: 'dist/'
                    },
                    {
                        espand: true,
                        src: 'app.js',
                        dest: 'dist/'
                    }
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
            build: {
                expand: true,
                src: [
                    'dist/public/html/**/*.js',
                    'dist/public/html/**/*.css',
                    'dist/public/html/**/*.scss',
                    'dist/public/html/**/*.map',
                    'dist/public/html/**/*.test.html',
                    'dist/public/html/**/*.spec.html',
                    'dist/**/*.spec.js',
                    'dist/**/*.spec/*.*',
                    'dist/**/*.spec/',
                    'dist/**/*.txt'
                ]
            }
        },

        cambioString: {
            ip: {
                options: {
                    strActual: '10.30.2.84',
                    strNuevo: '10.30.4.169'
                },
                expand: true,
                src: 'dist/servidor/**/*.js'
            },
            plink: {
                options: {
                    strActual: 'algunString',
                    strNuevo: 'otroString'
                },
                expand: true,
                src: 'dist/servidor/**/*.js'
            }
        },

        specAPoly: {
            build: {
                expand: true,
                src: 'public/html/**/*.spec.js'
            }
        },

        karma: {
            test: {
                options: {
                    configFile: 'karma.conf.js',
                    background: true
                }
            },
            build: {
                options: {
                    configFile: 'karma.conf.js',
                    singleRun: true
                }
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
        'copy',
        'uglify:public',
        'sass',
        'cssmin',
        'polyconcat',
        'htmlmin',
        'clean',
        // 'cambioString'
    ]);
};
