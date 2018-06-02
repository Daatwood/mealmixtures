import React, { Component } from 'react';

import GoogleButton from 'react-google-button';

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
					<GridItem>
						<GoogleButton
							type="light"
							onClick={() => {
								window.location = '/auth/google';
							}}
						/>
					</GridItem>
				</GridContainer>
			</div>
		);
	}
}

export default Login;
