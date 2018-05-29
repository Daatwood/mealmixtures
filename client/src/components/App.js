import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import './App.css';

const Header = () => <h2>Header</h2>;
const RecipeNew = () => <h2>Recipe New</h2>;
const RecipeView = () => <h2>Recipe View</h2>;
const RecipeList = () => <h2>Recipes List</h2>;
const Settings = () => <h2>Settings</h2>;
const Landing = () => <h2>Landing</h2>;

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<div>
						<Header />
						<div className="container">
							<Route exact path="/" component={Landing} />
							<Route exact path="/recipes" component={RecipeList} />
							<Route path="/recipes/:id" component={RecipeView} />
							<Route path="/recipe/new" component={RecipeNew} />
							<Route path="/settings" component={Settings} />
						</div>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default connect(null, actions)(App);
