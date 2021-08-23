/*responsável pelas interações que o usuário tiver com o carrinho de compras do sistema.
  adição, alteração e exclusão de ítens do carrinho de compras são processamentos tratados por "handleCart(product , qtd)"
*/
function handleCart(product /*Objeto Produto*/ , qtd /*Quantidade adicionada*/ , operation /*TIPO DE OPERAÇÃO: i (INSERT) | u (UPDATE)*/)
{
  let cart = null;
  let inCart = false;
  
  /*Verificação de dados armazenados no navegador.
	Se não houverem dados armazenados no navegador as variáveis cart e productsInCart são inicializadas como uma matriz.
  */
  if( localStorage.getItem('cart') == null )
  {
	  cart = []; // new Array()
  }
  else
  {
	  //Resgatando informações armazenadas no navegador.
	  cart = JSON.parse(localStorage.getItem('cart'));
  }	  
  
  //Realizando a leitura dos dados armazenados no carrinho de compras.
  for( let c = 0; c < cart.length; c++ )
  {
	  if(cart[c].id === product.id)
	  {
		  inCart = true;	  
		  if(qtd === "") //Validação se a quantidade informada é vazia
		  {
			  return "A Quantidade Informada é Nula";
		  }
		  else if(parseInt(qtd) < 0) //Validação se a quantidade informada possui valor negativo
		  {
			 return "A Quantidade informada é inválida pois o valor está negativo" ; 
		  }
		  
		  if(operation.toUpperCase() === "I") //Validação para verificar duplicidade de produto no carrinho
		  {
			  return "O produto "+product.name+" já estava no carrinho"; //interrupção do fluxo de processamento de dados.
		  }
		  
		  if(qtd === 0) // Se a quantidade do produto for igual a 0 então é realizada a exclusão do produto
		  {
			  cart.splice(c,1);
		  }
		  else if( cart[c].qtd !== qtd ) // Se a quantidade do produto tiver sido alterada então a nova quantidade é armazenada.
		  {
			  cart[c].qtd = qtd;
		  }
	  }
  }
  
  if(inCart === false) // se o produto não estava no carrinho neste momento ele é adicionado.
  {
	  cart.push({...product , qtd:1});
  }
  
  localStorage.setItem('cart' , JSON.stringify(cart)); // armazenando dados do carrinho
  return cart.length; 
}

export default handleCart;