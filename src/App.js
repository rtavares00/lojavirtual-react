import React, { Component } from 'react';
import Display from './layout/vitrine.js';
import Cart from './layout/carrinho.js';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
class App extends Component {
  
  render()
  {
	return(
	
		<Router>
			<Switch>
				
				<Route path="/cart">
					<Cart />
				</Route>
				
				<Route path="/">
					<Display />
				</Route>
				
			</Switch>
		</Router>
	
	);
  }
  
}

export default App;
