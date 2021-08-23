import React, { Component } from 'react';
import '../css/header.css';
import { BiCart } from "react-icons/bi";

class Topo extends Component {
	
	render()
	{
		return(
			<header>
				<div className="row bar">
					<div className="col-lg-10 logo" >
						<a href="/" style={ {textDecoration:"none"} }>
						<h1>Loja de Produtos</h1>
						</a>
					</div>
					<div className="col-lg-2" style={ {marginTop:"2%"} } >
						
						<a href="/cart" style={ {textDecoration:"none"} } ><BiCart size="36" style={{cursor: "pointer" , color:"#FFF"}} /></a>
						{
							(this.props.itensInCart === 0)
							?(<></>)
							:(<div className="badge" style={ {backgroundColor:"red",padding:"4px",marginLeft:"2px"} } >{this.props.itensInCart}</div>)
						}
					</div>
				</div>
			</header>
		);
	}
}
export default Topo;