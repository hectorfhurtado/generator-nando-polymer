/**
 * @author Héctor Fernando Hurtado
 * @version 2013-11-03
 */
/* global module */

module.exports = function( grunt ) {

    var htmlPorCss  = /.*\/(\w+\.css)$/,
        htmlPorJs   = /.*\/(\w+\.js)$/;

    grunt.registerMultiTask( 'polyconcat', 'Unifica los archivos minificados de un componente', function() {

        /**
         * Tomamos todos los archivos y priemro verificamos que existan y tengamos archivos sobre los cuales
         * trabajar.
         */
        this.files.forEach( function( archivo ) {

            var src = archivo.src.filter( function( rutaArchivo ) {

                if ( !grunt.file.exists( rutaArchivo )) {
                    grunt.log.warn('Archivo "' + rutaArchivo + '" no encontrado.');
                    return false;
                } else {
                    return true;
                }
            });

            if ( src.length === 0 ) {
                grunt.log.warn('No hay qué procesar, está vacía la propedad src.');
                return;
            }

            /**
             * Leemos el contenido del archivo.
             * Reemplazamos el path del archivo que termina en '.html', por '.css' y por '.js'
             */
            var html = grunt.file.read( src, { encondig: 'utf8' }),
                escss     = String( src ).replace( /\.html$/, '.css' ), // es un String larguísimo, ej: dist/path/prueba.css
                esjs      = String( src ).replace( /\.html$/, '.js' );  // es un String larguísimo, ej: dist/path/prueba.js

            /**
             * Si existe el archivo .css, leemos el contenido de este y reemplazamos el tag <link rel...> con el contenido
             * de este archivo.
             * Usamos RegExps para eliminar el path del archivo que es largo por el nombre de este para armar el RegExp
             */
            if ( grunt.file.exists( escss )) {
                var cssContenido        = grunt.file.read( escss ),
                    hrefPorCssContenido = new RegExp( "<link.*href=[\\\"']" + escss.replace( htmlPorCss, '$1' ) + "[\\\"'].*>\\\s" );

                html                    = html.replace( hrefPorCssContenido, '<style>' + cssContenido + '</style>' );
            }

            /**
             * Si existe el archivo .js, leemos el contenido de este y reemplazamos el tag <script src=...> con el contenido
             * de este archivo.
             * Usamos RegExps para eliminar el path del archivo que es largo por el nombre de este para armar el RegExp
             */
            if ( grunt.file.exists( esjs )) {
                var jsContenido         = grunt.file.read( esjs ),
                    scriptPorJsContenido = new RegExp( "<script.*src=[\\\"']" + esjs.replace( htmlPorJs, '$1' ) + ".*>\\\s*<\\\/script>" );

                html = html.replace( scriptPorJsContenido, '<script>' + jsContenido + '</script>');
            }

            // Guardamos todo y documentamos
            grunt.file.write( archivo.dest, html );
            grunt.log.writeln( 'Terminé con el archivo ' + src );
        });
    });
};
