import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import * as actions from '../actions';
import RecipeList from '../components/RecipeList';
import GridContainer from '../components/GridContainer';
import GridItem from '../components/GridItem';
import { Button } from '@material-ui/core';

class Dashboard extends Component {
	render() {
		const { fetchPrivateRecipes } = this.props;
		return (
			<GridContainer>
				<GridItem sm={9}>
					<Typography variant="display3">Dashboard</Typography>
				</GridItem>
				<GridItem sm={3}>
					<Button variant="raised" color="secondary" component={Link} to="/dashboard/favorites">
						View Favorites
					</Button>
				</GridItem>
				<GridItem>
					<RecipeList title="Your Recipes" recipesAction={fetchPrivateRecipes} />
				</GridItem>
			</GridContainer>
		);
	}
}

export default connect(null, actions)(Dashboard);
