import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, Hidden } from '@material-ui/core';
import BrandIcon from '@material-ui/icons/Kitchen';

import { Link } from 'react-router-dom';

const styles = {
	root: {
		flexGrow: 1,
		marginBottom: '24px'
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
				return [];
			case false:
				return [
					<Button key="1" component={Link} to="/login" color="inherit">
						Login
					</Button>
				];
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
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<Hidden only="xs">
							<IconButton
								component={Link}
								to="/"
								className={classes.menuButton}
								color="inherit"
								aria-label="Menu">
								<BrandIcon />
							</IconButton>
						</Hidden>
						<Typography component={Link} to="/" variant="title" color="inherit" className={classes.flex}>
							Meal Mixtures
						</Typography>
						{this.renderContent()}
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

// State is from reducer, auth is property on authReducer
function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(withStyles(styles)(Header));
