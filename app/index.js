
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
        name   : 'autor',
        message: 'Cómo te llamas?',
        default: 'Héctor Fernando Hurtado'
    }, {
        name   : 'nombreApp',
        message: 'Cómo quieres llamar tu aplicación?'
    }, {
        name   : 'customTag',
        message: 'Cuál va a ser el custom tag?, por ejemplo en <x-componente> la "x"',
        default: 'nando'
    }, {
        type   : 'confirm',
        name   : 'usoSass',
        message: 'Vas a usar Sass en tu proyecto',
        default: false
    }, {
        type   : 'confirm',
        name   : 'usoVulcanizer',
        message: 'Vas a usar vulcanizer para crear un sólo archivo?',
        default: false
    }, {
        type   : 'confirm',
        name   : 'esChromeApp',
        message: 'Creas una Chrome App?',
        when   : function( respuestas ) {
            return respuestas.usoVulcanizer === true
        },
        default: false
    }, {
        name   : 'puerto',
        message: 'Si tu aplicación va a usar un servidor con socket.io, escribe el puerto del servidor'
    }];

    this.prompt(prompts, function (props) {
		this.nombreApp	    = props.nombreApp;
        this.autor		    = props.autor;
        this.puerto		    = props.puerto;
        this.customTag      = props.customTag;
        this.usoSass        = props.usoSass;
        this.usoVulcanizer  = props.usoVulcanizer;
        this.esChromeApp    = props.esChromeApp || false;

        cb();
    }.bind(this));
};

NandoPolymerGenerator.prototype.app = function app() {
    this.componente           = this.nombreApp;
    this.componenteSlugish    = this.nombreApp.replace( /([A-Z])/g, '-$1' ).toLowerCase();
    this.componenteCapitalize = this.nombreApp[ 0 ].toUpperCase() + this.nombreApp.slice( 1 );
    this.hoy                  = new Date();

    this.mkdir('public');
    this.mkdir('public/html');
    this.mkdir('public/html/' + this.componente );
    this.mkdir('tareas');

    this.template('_package.json', 'package.json');
    this.template('_bower.json',   'public/bower.json');
    this.template('_config.js',    'config.js');
    this.template('Gruntfile.js',  'gruntfile.js');
    
    if ( this.puerto ) {
		this.template('app.js', 'app.js');
    }

    if ( this.esChromeApp && this.puerto ) {
		this.copy( 'tareas/cambioString.js', 'tareas/cambioString.js' );
    }
    
    this.copy( 'tareas/polyconcat.js', 'tareas/polyconcat.js' );
    this.copy( 'tareas/specAPoly.js',  'tareas/specAPoly.js' );
    
    if ( this.puerto && this.esChromeApp ) {
        this.mkdir( 'dist/public/socket.io-client' )
        this.mkdir( 'dist/public/socket.io-client/dist' )
        this.mkdir( 'dist/public/socket.io-client/lib' )
        this.mkdir( 'dist/public/socket.io-client/lib/transports' )
        
        this.copy( 'socket.io-client/dist/socket.io.min.js',          'dist/public/socket.io-client/dist/socket.io.min.js' )
        this.copy( 'socket.io-client/dist/WebSocketMain.swf',         'dist/public/socket.io-client/dist/WebSocketMain.swf' )
        this.copy( 'socket.io-client/dist/WebSocketMainInsecure.swf', 'dist/public/socket.io-client/dist/WebSocketMainInsecure.swf' )
        this.copy( 'socket.io-client/lib/events.js',                  'dist/public/socket.io-client/lib/events.js' )
        this.copy( 'socket.io-client/lib/io.js',                      'dist/public/socket.io-client/lib/io.js' )
        this.copy( 'socket.io-client/lib/json.js',                    'dist/public/socket.io-client/lib/json.js' )
        this.copy( 'socket.io-client/lib/namespace.js',               'dist/public/socket.io-client/lib/namespace.js' )
        this.copy( 'socket.io-client/lib/parser.js',                  'dist/public/socket.io-client/lib/parser.js' )
        this.copy( 'socket.io-client/lib/socket.js',                  'dist/public/socket.io-client/lib/socket.js' )
        this.copy( 'socket.io-client/lib/transport.js',               'dist/public/socket.io-client/lib/transport.js' )
        this.copy( 'socket.io-client/lib/util.js',                    'dist/public/socket.io-client/lib/util.js' )
        this.copy( 'socket.io-client/lib/transports/flashsocket.js',  'dist/public/socket.io-client/lib/transports/flashsocket.js' )
        this.copy( 'socket.io-client/lib/transports/htmlfile.js',     'dist/public/socket.io-client/lib/transports/htmlfile.js' )
        this.copy( 'socket.io-client/lib/transports/jsonp-polling.js','dist/public/socket.io-client/lib/transports/jsonp-polling.js' )
        this.copy( 'socket.io-client/lib/transports/websocket.js',    'dist/public/socket.io-client/lib/transports/websocket.js' )
        this.copy( 'socket.io-client/lib/transports/xhr.js',          'dist/public/socket.io-client/lib/transports/xhr.js' )
        this.copy( 'socket.io-client/lib/transports/xhr-polling.js',  'dist/public/socket.io-client/lib/transports/xhr-polling.js' )
    }
    
    if ( this.esChromeApp ) {
        this.template( 'manifest.json', 'dist/public/manifest.json' )
        this.template( 'background.js', 'dist/public/background.js' )
        this.template( 'build.js',      'dist/public/build.js' )
        this.template( 'build.js',      'dist/public/index.js' )
        this.template( 'build.html',    'dist/public/build.html' )
    }
    
	this.template('index.html', 'public/index.html');
    
    if ( this.usoSass ) {
        this.template('_config.rb',    'config.rb');
        this.template( 'archivo.scss', 'public/html/' + this.componente + '/' + this.componente + '.scss' );
    }
    
	this.template( 'archivo.spec.js', 'public/html/' + this.componente + '/' + this.componente + '.spec.js' );
    
    this.template( 'archivo.css',     'public/html/' + this.componente + '/' + this.componente + '.css' );
	this.template( 'archivo.js',      'public/html/' + this.componente + '/' + this.componente + '.js' );
    this.template( 'archivo.html',    'public/html/' + this.componente + '/' + this.componente + '.html' );

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
