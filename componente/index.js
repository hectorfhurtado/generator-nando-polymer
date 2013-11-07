
var util	= require( 'util' );
var path	= require( 'path' );
var fs		= require( 'fs' );
var yeoman	= require('yeoman-generator');

var ComponenteGenerator = module.exports = function ComponenteGenerator( args, options, config ) {
    // By calling `NamedBase` here, we get the argument to the subgenerator call
    // as `this.name`.
    yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(ComponenteGenerator, yeoman.generators.NamedBase);

ComponenteGenerator.prototype.askFor = function askFor() {
    var cb = this.async();
    
    var prompts = [{
        type: 'confirm',
        name: 'import',
        message: 'Importar este a otro componente (N))?',
        default: false
    }, {
        type: 'input',
        name: 'pathComponente',
        message: 'Escribe el path del componente',
        when: function( respuestas ) {
            return respuestas.import === true ;
        }
    }];

    this.prompt(prompts, function (props) {
		this.pathComponente	= props.pathComponente || null;

        cb();
    }.bind(this));
};

ComponenteGenerator.prototype.files = function files() {
    this.componente = this.name;
    this.componenteSlugish = this.name.replace( /([A-Z])/g, '-$1' ).toLowerCase();
    this.componenteCapitalize = this.name[ 0 ].toUpperCase() + this.name.slice( 1 );
    this.hoy = new Date();
    
    var encontrado = false;
    var pathEsteDirectorio = this.destinationRoot();

    while( encontrado === false ) {
        
        if ( fs.existsSync( path.join( pathEsteDirectorio, '/config.js' ), { cwd: pathEsteDirectorio })) {
            encontrado = true;
        }
        else {
            pathEsteDirectorio = path.resolve( pathEsteDirectorio, './..' );
        }
    }
    
    var configParams = JSON.parse( this.read( path.join( pathEsteDirectorio, '/config.js' )));
    this.autor       = configParams.autor;
    this.customTag   = configParams.customTag;
    this.usoSass     = configParams.usoSass;
    
    this.mkdir( this.componente );

    if ( this.usoSass === true ) {
		this.template( 'archivo.scss',	this.componente + '/' + this.componente + '.scss' );
    }
	
	this.template( 'archivo.css',		this.componente + '/' + this.componente + '.css' );
	this.template( 'archivo.js',		this.componente + '/' + this.componente + '.js' );
    this.template( 'archivo.html',		this.componente + '/' + this.componente + '.html' );
    this.template( 'archivo.spec.js',	this.componente + '/' + this.componente + '.spec.js' );
    this.template( 'archivo.spec.html',	this.componente + '/' + this.componente + '.spec.html' );
    
    // si vamos a agregar el componente a otro, vamos mirando dónde lo agregamos
    if ( this.pathComponente ) {
        var esteDirectorio = this.destinationRoot();
        var pathArchivo = null;
        var contenidoArchivo = null;
        
        pathArchivo = path.resolve( esteDirectorio, './' + this.pathComponente );
        pathArchivo = fs.existsSync( pathArchivo ) ? pathArchivo : null;
        
        if ( pathArchivo ) {
            var pathRelativo = path.relative( path.dirname( pathArchivo ), path.join( esteDirectorio, '/' + this.componente + '/' + this.componente + '.html' ));
            
            contenidoArchivo = this.readFileAsString( pathArchivo );
            contenidoArchivo = contenidoArchivo.replace( /-->/, '-->\n<link href="' + pathRelativo + '" rel="import" >' );
            
            fs.writeFileSync( pathArchivo, contenidoArchivo );
        }
        else {
            console.log( 'No Encontré el archivo descrito en el path!' );
        }
    }
};
