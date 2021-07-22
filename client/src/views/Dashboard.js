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
		const { fetchUserRecipes } = this.props;
		return (
			<GridContainer>
				<GridItem sm={12} md={6}>
					<Typography variant="display3">Dashboard</Typography>
				</GridItem>
				<GridItem sm={6} md={3}>
					<Button variant="raised" color="primary" component={Link} to="/recipe/new">
						New Recipe
					</Button>
				</GridItem>
				<GridItem sm={6} md={3}>
					<Button style={{float: 'right'}}variant="raised" color="secondary" component={Link} to="/favorites">
						View Favorites
					</Button>
				</GridItem>
				<GridItem>
					<RecipeList title="Your Recipes" recipesAction={fetchUserRecipes} />
				</GridItem>
			</GridContainer>
		);
	}
}

export default connect(null, actions)(Dashboard);
