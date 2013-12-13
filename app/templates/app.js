
/*
 * Module dependencies.
 */

/* global require, __dirname */
var http            = require( 'http' ),
    express         = require( 'express' ),
    path            = require( 'path' ),

    app             = express();

// configuración
app.configure( function() {
    app.set( 'port', <%= puerto %> );
    app.set( 'views', __dirname + "/views" );
    // app.set( 'view engine', 'jade' );
    app.use( express.favicon() );
    app.use( express.logger( 'dev' ));
    app.use( express.bodyParser() );
    app.use( express.methodOverride() );
    app.use( app.router );
    app.use( express.static( path.join( __dirname, 'public' )));
});

app.configure( 'development', function() {
    app.use( express.errorHandler() );
});

// rutas
app.get( /^\/public(.*)$/, function( req, res ) {
    res.sendfile( path.join( __dirname + '/public' + req.params[ 0 ]))
})

// inicio de Express
app         = http.createServer( app ).listen( <%= puerto %> );

// inicio del WebSocket Server
var io          = require('socket.io').listen( app );

io.sockets.on( 'connection', function( cliente ) {
    console.log( 'si se conecto' );

    // Viene del brpwser 'listo'
    cliente.emit( 'listo' );

}); // io.sockets