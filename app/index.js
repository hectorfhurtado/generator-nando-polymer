
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
        name: 'customTag',
        message: 'Cuál va a ser el custom tag?, por ejemplo en <x-componente> la "x"',
        default: 'nando'
    }, {
        type: 'confirm',
        name: 'usoSass',
        message: 'Vas a usar Sass en tu proyecto',
        default: false
    }, {
        name: 'puerto',
        message: 'Si tu aplicación va a usar un servidor con socket.io, escribe el puerto del servidor'
    }];

    this.prompt(prompts, function (props) {
		this.nombreApp	= props.nombreApp;
        this.autor		= props.autor;
        this.puerto		= props.puerto;
        this.customTag  = props.customTag;
        this.usoSass    = props.usoSass;

        cb();
    }.bind(this));
};

NandoPolymerGenerator.prototype.app = function app() {
    this.componente           = this.nombreApp;
    this.componenteSlugish    = this.nombreApp.replace( /([A-Z])/g, '-$1' );
    this.componenteCapitalize = this.nombreApp[ 0 ].toUpperCase() + this.nombreApp.slice( 1 );
    this.hoy = new Date();

    this.mkdir('public');
    this.mkdir('public/html');
    this.mkdir('public/html/' + this.componente );
    this.mkdir('tareas');

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'public/bower.json');
    this.template('_config.js', 'config.js');
    this.template('Gruntfile.js', 'gruntfile.js');
    this.template('index.html', 'public/html/index.html');
    
    if ( this.puerto ) {
		this.template('app.js', 'app.js');
    }

    this.copy( 'tareas/polyconcat.js', 'tareas/polyconcat.js' );
    this.copy( 'tareas/specAPoly.js', 'tareas/specAPoly.js' );
    
    if ( this.usoSass ) {
        this.template('_config.rb', 'config.rb');
        this.template( 'archivo.scss', 'public/html/' + this.componente + '/' + this.componente + '.scss' );
    }
    
	this.template( 'archivo.spec.js', 'public/html/' + this.componente + '/' + this.componente + '.spec.js' );
    
    this.template( 'archivo.css', 'public/html/' + this.componente + '/' + this.componente + '.css' );
	this.template( 'archivo.js', 'public/html/' + this.componente + '/' + this.componente + '.js' );
    this.template( 'archivo.html', 'public/html/' + this.componente + '/' + this.componente + '.html' );

    exec( 'bower install', { cwd: path.join( this.env.cwd, '/public' )}, function ( error, stdout, stderr ) {
        console.log( 'stdout: ' + stdout );
        console.log( 'stderr: ' + stderr );

        if ( error !== null ) {
			console.log( 'exec error: ' + error );
        }
    });
};

NandoPolymerGenerator.prototype.projectfiles = function projectfiles() {
//    this.copy('editorconfig', '.editorconfig');
//    this.copy('jshintrc', '.jshintrc');
};
