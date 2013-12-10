/**
 * @author	<%= autor %>
 * @version	<%= hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getDate() %>
 */

<% if ( puerto ) { %>
var ws = io.connect( 'http://localhost:<%= puerto %>/' );

ws.on( 'listo', function() {
    document.querySelector( 'body' ).insertAdjacentHTML( 'beforeend', '<p>Conectado con el WebSocket!</p>');
    document.querySelector( 'body' ).insertAdjacentHTML( 'beforeend', '<p>Connected to WebSocket!</p>');
    
    ws.emit( 'enviarmensaje' )
});
<% } %>