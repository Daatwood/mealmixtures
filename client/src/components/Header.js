import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import GoogleButton from 'react-google-button';
import { Link } from 'react-router-dom';

const styles = {
	root: {
		flexGrow: 1
	},
	flex: {
		flex: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	}
};

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<GoogleButton
						type="light"
						onClick={() => {
							window.location = '/auth/google';
						}}
					/>
				);
			default:
				return [
					<Button key="1" component={Link} to="/recipe/new" color="inherit">
						Add Recipe
					</Button>,
					<Button key="2" component={Link} to="/dashboard" color="inherit">
						Your Recipes
					</Button>,
					<Button key="3" href="/api/logout" color="inherit">
						Logout
					</Button>
				];
		}
	}

	render() {
		return (
			<div className={this.props.classes.root}>
				<AppBar position="static">
					<Toolbar>
						<Typography
							component={Link}
							to="/"
							variant="title"
							color="inherit"
							className={this.props.classes.flex}>
							Meal Mixtures
						</Typography>
						{this.renderContent()}
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}
Header.propTypes = {
	classes: PropTypes.object.isRequired
};
// State is from reducer, auth is property on authReducer
function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(withStyles(styles)(Header));
