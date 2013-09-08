'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var exec = require('child_process').exec;

var NandoPolymerGenerator = module.exports = function NandoPolymerGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ bower: true, npm: true, skipInstall: false });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(NandoPolymerGenerator, yeoman.generators.Base);

NandoPolymerGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [{
        name: 'autor',
        message: 'Cómo te llamas?',
        default: 'Héctor Fernando Hurtado'
    }, {
        name: 'nombreApp',
        message: 'Cómo quieres llamar tu aplicación?'
    }, {
        name: 'puerto',
        message: 'Qué puerto usarás para la aplicación?'
    }];

    this.prompt(prompts, function (props) {
		this.nombreApp	= props.nombreApp;
        this.autor		= props.autor;
        this.puerto		= props.puerto;

        cb();
    }.bind(this));
};

NandoPolymerGenerator.prototype.app = function app() {
    var componente = this.nombreApp;
    var componenteSlugish = this.nombreApp.replace( /([A-Z])/g, '-$1' );
    var componenteCapitalize = this.nombreApp[ 0 ].toUpperCase() + this.nombreApp.slice( 1 );
    var hoy = new Date();

    this.mkdir('public');
    this.mkdir('public/html');
    this.mkdir('public/html/' + componente );
    this.mkdir('tareas');

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'public/bower.json');
    this.template('_config.rb', 'config.rb');
    this.template('_config.js', 'config.js');
    this.template('Gruntfile.js', 'gruntfile.js');
    this.template('index.html', 'public/html/index.html');
    this.template('app.js', 'app.js');

    this.copy('tareas/polyconcat.js', 'tareas/polyconcat.js');
    this.copy('tareas/specAPoly.js', 'tareas/specAPoly.js');

    this.write( 'public/html/' + componente + '/' + componente + '.spec.js', '/**\n * @author\t' + this.autor +
        '\n * @version\t' + hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getDate() + '\n */\n\n' +
        'var ' + componenteCapitalize + ' = {\n' +
            '\t// TODO\n' +
        '};\n\n' +

        'describe( \'Componente ' + componente + '\', function() {\n' +
            '\tvar ' + componente + ';\n\n' +

            '\tbeforeEach( function() {\n\t\t' +
                componente  + ' = Object.create( ' + componenteCapitalize + ' );\n' +
            '\t});\n\n' +

            '\tit( \'debería ...\', function() {\n' +
                '\t\texpect( true ).toBe( true );\n' +
            '\t});\n' +
        '});\n'
    );

    this.write( 'public/html/' + componente + '/' + componente + '.scss', '/**\n * @author\t' + this.autor +
        '\n * @version\t' + hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getDate() + '\n */\n\n' +
        '.' + componenteCapitalize + ' {\n\n' + '}');

    this.write( 'public/html/' + componente + '/' + componente + '.js', '/**\n * @author\t' + this.autor +
        '\n * @version\t' + hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getDate() + ' */\n\n' +
        'Polymer( \'nando-' + componenteSlugish + '\', {\n' +
            '\t//TODO\n' +
        '});'
    );

    this.write( 'public/html/' + componente + '/' + componente + '.html', '<!--\n/**\n * @author\t' + this.autor +
        '\n * @version\t' + hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getDate() + '\n */\n-->\n\n' +
        '<polymer-element name="nando-' + componenteSlugish + '">\n' +
            '\t<template>\n' +
                '\t\t<link href="' + componente + '.css" rel="stylesheet">\n\n' +

                '\t\t<section class="' + componenteCapitalize + '" >\n\n' +

                '\t\t</section>\n' +
            '\t</template>\n\n' +

            '\t<script type="text/javascript" src="' + componente + '.js" ></script>\n' +
        '</polymer-element>'
    );

    exec( 'bower install', { cwd: path.join( this.env.cwd, '/public' )}, function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);

        if (error !== null) {
          	console.log('exec error: ' + error);
        }
    });
};

NandoPolymerGenerator.prototype.projectfiles = function projectfiles() {
//    this.copy('editorconfig', '.editorconfig');
//    this.copy('jshintrc', '.jshintrc');
};
