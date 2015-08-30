QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});


QUnit.test( "a basic test example", function( assert ) {
	var calculadora = new calc(2, 3);
	console.log('aaa');
	assert.ok( calculadora.somar() == '5', "Teste deve retornar 4" );
});