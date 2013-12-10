/**
 * @author Héctor Fernando Hurtado
 * @version 2013-11-03
 */
/* global module */

module.exports = function( grunt ) {

    grunt.registerMultiTask( 'specAPoly', 'Copia el contenido de un spec de Jasmine en el contenido de un componente de Polymer', function() {
        var opciones = this.options({
            author: 'Héctor Fernando Hurtado'
        });

        var specRegexp = /\.spec\.js$/;
        var delimitadorInferior = 'DDDDDDD';
        var delimitadorSuperior = 'BBBBBBB';

        // Le agrega un '0' al número ingresado en caso de que sea menor a 10. Se espera un entero positivo
        function formatearNumero( numero ) {
            return ( numero < 10 ) ? '0' + numero : numero;
        }

        /**
         * Para cada archivo, primero miramos que exista y que haya sobre lo cual trabajar.
         * Cambiamos la IP del servidor de trabajo por la del servidor de producción.
         * Recorremos todos los archivos del servidor cambiando esta IP.
         */
        this.files.forEach( function( archivo ) {

            var src = archivo.src.filter( function( rutaArchivo ) {

                if ( !grunt.file.exists( rutaArchivo )) {
                    grunt.log.warn( 'Archivo "' + rutaArchivo + '" no encontrado.' );
                    return false;
                } else {
                    return true;
                }
            });

            if ( src.length === 0 ) {
                grunt.log.warn('No hay qué procesar, está vacía la propedad src.');
                return;
            }

            // Leemos el contenido del archivo que contiene el spec
            var contenidoFuente = grunt.file.read( src, { encondig: 'utf8' });

            // Si no tiene la terminación .spec.js no lo revisamos
            if ( !specRegexp.test( String( src ))) {
                grunt.log.warn( 'Archivo "' + src + '" no es un spec de Jasmine.' );
                return;
            }

            // Del spec tomamos únicamente el contenido del objeto que estamos probando en el spec. Para ello,
            // delimitamos el comienzo y el fin de este contenido
            var extraidoFuente = contenidoFuente
                .replace( /^.*var\s?.*\s?=\s?{/m, delimitadorSuperior )
                .replace( /\}\;\s+describe\(.*$/m, delimitadorInferior );

            // Habiendo delimitado inicio y fin del contenido, tomamos esta información
            extraidoFuente = extraidoFuente
                .slice( 0, extraidoFuente.indexOf( delimitadorInferior))
                .slice( extraidoFuente.indexOf( delimitadorSuperior ) + delimitadorInferior.length + 1 );

            // El destino es simplemente el archivo sin el .spec en su terminación y leemos el contenido de este archivo
            var destino             = String( src ).replace( specRegexp, '.js' );
            var contenidoDestino    = grunt.file.read( destino );

            // del archivo de destino, tomamos solamente el nombre del componente
            var extraidoDestino     = /Polymer\((?:\s+)?["'](.*)["'],/.exec( contenidoDestino )[ 1 ];
            var hoy                 = new Date();

            // Armamos el contenido final y lo escribimos informando como siempre qué fue lo que modificamos
            var total = "/**\n" +
                " * @author\t" + opciones.author + "\n" +
                " * @version\t" + hoy.getFullYear() + "-" + formatearNumero( hoy.getMonth() + 1 ) + "-" + formatearNumero( hoy.getDate() ) + "\n" +
                " */\n\n" +
                "/* global Polymer */\n\n" +
                "( function() {\n" + 
                "\tPolymer( '" + extraidoDestino + "', {\n" +
                "\t" + extraidoFuente + "\n" +
                "\t});" + 
                "})()";

            grunt.file.write( destino, total );
            grunt.log.writeln( 'Modificado el archivo: ' + src + '\nResultado en ' + destino );
        });
    });
};
