import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';

import routes from '../routes';

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
							{routes.map((prop, key) => {
								return <Route exact path={prop.path} key={key} component={prop.component} />;
							})}
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
