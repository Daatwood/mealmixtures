import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import RecipeNew from './RecipeNew';
import RecipeView from './RecipeView';
import RecipeEdit from './RecipeEdit';
import Dashboard from './Dashboard';
import Landing from './Landing';
import './App.css';

const Settings = () => <h2>Settings</h2>;

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
							<Route exact path="/dashboard" component={Dashboard} />
							<Route exact path="/recipes/:id" component={RecipeView} />
							<Route path="/recipes/:id/edit" component={RecipeEdit} />
							<Route path="/recipe/new" component={RecipeNew} />
							<Route path="/settings" component={Settings} />
						</div>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}
//TODO FIX on slow connections user will be redirected to '/'
const PrivateRoute = ({ auth, component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (!!auth ? <Component {...props} /> : <Redirect to="/" />)} />
);
// State is from reducer, auth is property on authReducer
function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps, actions)(App);
