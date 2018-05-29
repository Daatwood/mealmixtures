import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import RecipeList from './RecipeList';
import RecipeListItem from './RecipeListItem';
import RecipeView from './RecipeView';
import './App.css';

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
							<Route exact path="/dashboard" component={RecipeList} />
							<Route path="/recipes/:id" component={RecipeView} />
							<Route path="/recipe/new" component={RecipeListItem} />
							<Route path="/settings" component={Settings} />
						</div>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default connect(null, actions)(App);
