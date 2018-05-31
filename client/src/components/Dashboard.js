import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Add as AddIcon } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';

import * as actions from '../actions';
import RecipeList from './RecipeList';

const styles = (theme) => ({
	fab: {
		position: 'absolute',
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2,
		color: theme.palette.common.white,
		backgroundColor: green[500]
	}
});

class Dashboard extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div>
				<Typography variant="display3">Dashboard</Typography>
				<RecipeList title="Your Recipes" recipesAction={this.props.fetchPrivateRecipes} />
				<Button variant="fab" className={classes.fab} component={Link} to="/recipe/new">
					<AddIcon />
				</Button>
			</div>
		);
	}
}

export default connect(null, actions)(withStyles(styles)(Dashboard));
