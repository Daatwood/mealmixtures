import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import * as actions from '../actions';
import RecipeList from '../components/RecipeList';

class Dashboard extends Component {
	render() {
		const { fetchPrivateRecipes } = this.props;
		return (
			<div>
				<Typography variant="display3">Dashboard</Typography>
				<RecipeList title="Your Recipes" recipesAction={fetchPrivateRecipes} />
			</div>
		);
	}
}

export default connect(null, actions)(Dashboard);
