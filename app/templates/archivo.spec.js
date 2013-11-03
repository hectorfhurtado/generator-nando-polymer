/**
 * @author	<%= autor %>
 * @version <%= hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getDate() %>
 */

var <%= componenteCapitalize %>= {
	// TODO
};
    
describe( 'Componente ' <%= componente %>, function() {
    var <%= componente %>;
    
    beforeEach( function() {
    	<%= componente  %>= Object.create( <%= componenteCapitalize %> );
    });
    
    it( 'debería ...', function() {
    	expect( true ).toBe( true );
    });
});