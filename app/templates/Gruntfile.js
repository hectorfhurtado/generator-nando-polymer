
module.exports = function (grunt) {

    grunt.initConfig({
        watch: {<% if ( usoSass === true ) { %>
            css: {
                files: 'public/html/**/*.scss',
                tasks: [ 'newer:sass', 'sass' ],
                options: {
                    nospawn: true
                }
            },
            <% } %>
            componente: {
                files: 'public/html/**/*.spec.js',
                tasks: [ 'newer:specAPoly', 'specAPoly' ],
                options: {
                    nospawn: false
                }
            }
        },<% if ( usoSass === true ) { %>
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
        },<% } %>
        copy: {
            distribucion: {
                files: [
                    {
                        expand: true,
                        src: 'public/bower_components/platform/platform.js',
                        dest: 'dist/'
                    },
                    {
                        expand: true,
                        src: 'public/bower_components/polymer/polymer.js',
                        dest: 'dist/'
                    },
                    {
                        expand: true,
                        src: 'public/bower_components/polymer/polymer.html',
                        dest: 'dist/'
                    },
                    {
                        src: 'public/index.html',
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
                    'dist/public/html/**/*.map',<% if ( usoVulcanizer ) { %>
                    'dist/public/html/**/*.html',
                    'dist/public/index.html',<% } %>
                    'dist/**/*.txt'
                ]
            }
        },
<% if ( usoVulcanizer ) { %>
    	vulcanize: {
            build: {
                options: {
                    <% if ( esChromeApp ) { %>csp: true<% } %>
                    <% if ( esChromeApp === false ) { %>inline: true<% } %>
                },
                files: {
                    'dist/public/build.html': 'dist/public/index.html'
                }    
            }
        },
<% } %><% if ( esChromeApp && puerto ) { %>
        cambioString: {
            build: {
                src: 'dist/public/index.html'
            }
        },
<% } %>
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

    grunt.loadNpmTasks('grunt-contrib-watch');<% if ( usoSass === true ) { %>
    grunt.loadNpmTasks('grunt-contrib-sass');
    <% } %><% if ( usoVulcanizer ) { %>
    grunt.loadNpmTasks('grunt-vulcanize');
    <% } %>
    grunt.loadNpmTasks('grunt-newer');

    grunt.registerTask('default', [ 'watch' ]);

    grunt.registerTask('build', [
        'specAPoly:build',
        'clean:precopy',
        'copy',
        'clean:postcopy',
        'uglify:public',<% if ( usoSass === true ) { %>
        'sass',<% } %>
        'cssmin',
        'polyconcat',<% if ( esChromeApp && puerto ) { %>
        'cambioString',<% } %>
        'htmlmin',<% if ( usoVulcanizer === true ) { %>
        'vulcanize',<% } %>
        'clean:build'
    ]);
};
