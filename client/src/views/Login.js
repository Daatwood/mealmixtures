import React, { Component } from 'react';

import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';

import { Typography } from '@material-ui/core';

import GridContainer from '../components/GridContainer';
import GridItem from '../components/GridItem';

class Login extends Component {
	render() {
		return (
			<div style={{ textAlign: 'center', paddingBottom: 20 }}>
				<GridContainer justify="center" spacing={40}>
					<GridItem xs={12}>
						<Typography variant="display3">Login</Typography>
					</GridItem>
					<GridItem xs={12} style={{ maxWidth: '345px' }}>
						<GoogleLoginButton
							onClick={() => {
								window.location = '/api/auth/google';
							}}
						/>
					</GridItem>
					{/* WIP Not fully implemented yet*/}
					{/* <GridItem xs={12} style={{ maxWidth: '345px' }}>
						<FacebookLoginButton
							text="Login with Facebook"
							onClick={() => {
								window.location = '/auth/facebook';
							}}
						/>
					</GridItem> */}
				</GridContainer>
			</div>
		);
	}
}

export default Login;
