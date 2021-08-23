import React, { Component } from 'react';
import '../css/vitrine.css';
import Topo from './header.js';
import handleCart from '../component/handleCart.js';
import { BiCart } from "react-icons/bi";

class Display extends Component {
	constructor(){
		super();
		this.state = { //inicializando variáveis state
			totalItensInCart: localStorage.getItem('cart') == null ? 0 : JSON.parse(localStorage.getItem('cart')).length,
			// Corresponde ao BADGE no ícone do carrinho
			products:[]
			//Responsável por armazenar os produtos os quais retornaram da API.
		};
	}
	
	componentDidMount()
	{
		//RESGATANDO OS PRODUTOS ASSIM QUE O COMPONENT ESTÁ "MONTADO"
		fetch("https://5d6da1df777f670014036125.mockapi.io/api/v1/product", {method: 'get'})
		.then((response) => {
			if(response.status !== 200)
			{
				alert("Ocorreu um Erro ao obter os produtos.");
			}
			return response.json();
		}).then(response => {
			this.setState({products:response});
		});
	}
	
	_handleCart(product)
	{
		let result = handleCart(product,1,"I");
		if( isNaN(result) === true )
		{
			alert( result )
		}
		else
		{
			this.setState({totalItensInCart: result }); //Atualizando o Badge de acordo com a quantidade de ítens existentes no carrinho.
		}
	}
	
	// responsável pelo processamento do produto para quando houver o renderizamento na tela
	processProduct(product) 
	{
		return(
			<div className="col-lg-3 _block" key={product.id}>
				<img className="_image" alt="Imagem do Produto" src={product.image} />
				<p>{product.name}</p>
				<button onClick={ this._handleCart.bind(this,product) } className="btn btn-info">
					<BiCart size="25" style={{cursor: "pointer",color:"#FFF"}} />
				</button>
			</div>
		);
	}

	
	render() // renderização da vitrine na tela do usuário.
	{
		return(
			<>
				<Topo itensInCart={ this.state.totalItensInCart } />
				<div id="products" className="row">
				{
					this.state.products.map( product => (this.processProduct(product) ))
				}
				</div>
			</>
		);
	}
	
	
}
export default Display;