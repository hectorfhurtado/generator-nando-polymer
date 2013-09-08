'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var ComponenteGenerator = module.exports = function ComponenteGenerator(args, options, config) {
    // By calling `NamedBase` here, we get the argument to the subgenerator call
    // as `this.name`.
    yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(ComponenteGenerator, yeoman.generators.NamedBase);

ComponenteGenerator.prototype.files = function files() {
    var componente = this.name;
    var componenteSlugish = this.name.replace( /([A-Z])/g, "-$1" ).toLowerCase();
    var componenteCapitalize = this.name[ 0 ].toUpperCase() + this.name.slice( 1 );
    var hoy = new Date();

    this.mkdir( componente );

    this.write( componente + '/' + componente + '.spec.js', '/**\n * @author\t' + 'NOMBRE' +
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

    this.write( componente + '/' + componente + '.scss', '/**\n * @author\t' + 'NOMBRE' +
        '\n * @version\t' + hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getDate() + '\n */\n\n' +
        '.' + componenteCapitalize + ' {\n\n' + '}');

    this.write( componente + '/' + componente +  '.js', '/**\n * @author\t' + 'NOMBRE' +
        '\n * @version\t' + hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getDate() + '\n */\n\n' +
        'Polymer( \'nando-' + componenteSlugish + '\', {\n' +
            '\t//TODO\n' +
        '});'
    );

    this.write( componente + '/' + componente + '.html', '<!--\n/**\n * @author\t' + 'NOMBRE' +
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

    this.write( componente + '/' + componente + '.spec.html',
        '<!DOCTYPE html>\n' +
		'<html>\n' +
		    '\t<head>\n' +
    			'\t\t<script src="../../bower_components/polymer/polymer.min.js"></script>\n' +

    		'\t</head>\n' +
    		'\t<body>\n' +
                '\t\t<!--\n\t\t/**\n\t\t * @author\t' + 'NOMBRE' +
                '\n\t\t * @version\t' + hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getDate() + '\n\t\t */\n\t\t-->\n\n' +
                '\t\t<link href="' + componente + '.html" rel="import">\n' +
                '\t\t<polymer-element name="prueba-' + componenteSlugish + '">\n' +
                    '\t\t\t<template>\n' +
                        '\t\t\t\t<style>\n\n\t\t\t\t</style>\n\n' +

                        '\t\t\t\t<nando-' + componenteSlugish + '></nando-' + componenteSlugish + '>\n' +
                    '\t\t\t</template>\n\n' +

                    '\t\t\t<script>\n' +
                        '\t\t\t\tPolymer( \'prueba-' + componenteSlugish + '\', {\n\n' +
                        '\t\t\t\t});\n' +
                    '\t\t\t</script>\n' +
                '\t\t</polymer-element>\n\n' +
                '\t\t<prueba-' + componenteSlugish + '></prueba-' + componenteSlugish + '>\n' +
            '\t</body>\n' +
        '</html>\n'
    );
};
