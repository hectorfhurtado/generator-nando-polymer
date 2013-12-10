/**
 * @author	<%= autor %>
 * @version	<%= hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getDate() %>
 */
 
/* global chrome */

var app = null;

chrome.app.runtime.onLaunched.addListener( function() {
    chrome.app.window.create( 'build.html', {
        id   : '<%= nombreApp %>',
        state: 'maximized'
    }, function( win ) {
        app = win
    })
})