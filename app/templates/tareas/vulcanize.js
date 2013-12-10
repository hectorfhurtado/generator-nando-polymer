
var exec = require( 'spawn' );

module.exports = function( grunt ) {
    
    grunt.register( 'vulcanize', 'Corre Vulcanizer', function() {
        
        var opciones = this.options({
            src: 'public/html/index.html',
            dest: 'public/dist/build.html',
            csp: false
        });
        
        var csp = csp ? '--csp ' : ''
        
        exec( 'vulcanize ' + csp + '-o' + opciones.dest + ' ' + opciones.src )
        
        grunt.log.writeln( 'Terminé de vulcanizar' );
    })
}