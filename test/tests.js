QUnit.test( "Testando a classe calc", function( assert ) {
	var calculadora = new calc(2, 3);
	assert.ok( calculadora.somar() == '5', "Soma deve retornar 5" );
	assert.ok( calculadora.mult() == '6', "Mult deve retornar 6" );
});