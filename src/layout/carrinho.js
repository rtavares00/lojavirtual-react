import React, { Component } from 'react';
import '../css/cart.css';
import Topo from './header.js';
import handleCart from '../component/handleCart.js';
import { BiCart , BiTrash } from "react-icons/bi";

class Cart extends Component {
	constructor(){
		super();
		this.state = { //inicializando variáveis state
			totalItensInCart: localStorage.getItem('cart') == null ? 0 : JSON.parse(localStorage.getItem('cart')).length,
			cart: localStorage.getItem('cart') == null ? [] : JSON.parse(localStorage.getItem('cart'))
		};
	}
	
	componentDidMount()
	{
		//RESGATANDO OS PRODUTOS ASSIM QUE O COMPONENT ESTÁ "MONTADO"
	}
	
	emptyCart()
	{
		return(
			<div style={ {textAlign:"center"} }>
				<BiCart size="300" className="cart" />
				<p>O carrinho está vazio.</p>
			</div>
		);
	}
	
	processProduct(product) 
	{
		return(
			<div className="row" style={ {marginTop: "5%"} } key={product.id}>
				<div className="col-lg-4" style={{textAlign:"center"}}>
					<img alt="Miniatura de Imagem" className="mini" src={product.image} />
				</div>
				<div className="col-lg-4 spacing" >
					<p>{product.name}</p>
				</div>
				<div className="col-lg-4 spacing" >
					<input onFocus={ (e) => e.target.select() } onKeyPress={ (e) => this.keyPressed(e) } onChange={ (e)=> this._handleCart(product,e.target.value) } type="number" value={product.qtd} min={0} max={product.stock} />
					<BiTrash onClick={ this._handleCart.bind(this,product,0) } size="28" color="red" className="trashIcon" />
				</div>
				
			</div>
		);
	}
	
	cartItens()
	{
		return(
			<div className="row">
				<div className="col-lg-12 text-center">
				{
					this.state.cart.map( product => ( this.processProduct(product) ) )					
				}
				</div>
			</div>
		);
	}
	
	keyPressed(_event)
	{
		if( isNaN(_event.key) === true )
		{
			alert("Informe somente valores numéricos e positivos para a quantidade");
			return false;
		}
	}
	
	_handleCart(product,qtd)
	{	
		if(qtd === "")
		{
			return false;
		}
		
		qtd = parseInt(qtd);
		
		let totalItensInCart = handleCart(product,qtd,"U");
		
		if(isNaN(totalItensInCart) === false)
		{
			this.setState(
				{
					totalItensInCart: totalItensInCart,
					cart:JSON.parse(localStorage.getItem('cart')) 
				}
			); //Atualizando o Badge de acordo com a quantidade de ítens existentes no carrinho.
		}
	}
	
	render()
	{
		return(
			<>
				<Topo itensInCart={ this.state.totalItensInCart } />
				{ this.state.totalItensInCart === 0 ? this.emptyCart() : this.cartItens() }
			</>
		);
	}
	
}
export default Cart;