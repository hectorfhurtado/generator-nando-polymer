
var exec = require( 'spawn' );
var fs   = require( 'fs' );
var path = require( 'path' );

module.exports = function( grunt ) {
    
    grunt.register( 'vulcanize', 'Corre Vulcanizer', function() {
        
        var opciones = this.options({
            src: 'public/html/index.html',
            dest: 'public/dist/build.html',
            csp: false
        });
        
        var csp = csp ? '--csp ' : ''
        
        // Si es una chrome app debemos cambiar el path de socket.io ya que anexamos los archivos con Yeoman
        if ( csp ) {
            var ruta      = path.join( process.cwd(), opciones.src )
            var indexHtml = fs.readFileSync( ruta )
            
            indexHtml     = indexHtml.repalce( '/socket.io/socket.io.js', 'socket.io-client/dist/socket.io.js' )
            
            fs.writeFileSync( ruta, indexHtml )
        }
        
        exec( 'vulcanize ' + csp + '-o' + opciones.dest + ' ' + opciones.src )
        
        grunt.log.writeln( 'Terminé de vulcanizar' );
    })
}