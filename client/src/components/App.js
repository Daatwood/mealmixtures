import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Header from './Header';
import routes from '../routes';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#48a999',
			main: '#00796b',
			dark: '#004c40',
			contrastText: '#fff'
		},
		secondary: {
			light: '#80d6ff',
			main: '#42a5f4',
			dark: '#0077c1',
			contrastText: '#1e1e1e'
		}
	}
});

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<MuiThemeProvider theme={theme}>
						<Header />
						<div className="container">
							{routes.map((prop, key) => {
								return <Route exact path={prop.path} key={key} component={prop.component} />;
							})}
						</div>
					</MuiThemeProvider>
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
