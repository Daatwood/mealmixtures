import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import * as actions from '../actions';
import RecipeList from '../components/RecipeList';
import GridContainer from '../components/GridContainer';
import GridItem from '../components/GridItem';
import { Button } from '@material-ui/core';

class Favorites extends Component {
	render() {
		const { fetchFavoriteRecipes } = this.props;
		return (
			<GridContainer>
				<GridItem sm={9}>
					<Typography variant="display3">Favorites</Typography>
				</GridItem>
				<GridItem sm={3}>
					<Button variant="raised" color="secondary" component={Link} to="/dashboard">
						View your Recipes
					</Button>
				</GridItem>
				<GridItem>
					<RecipeList recipesAction={fetchFavoriteRecipes} />
				</GridItem>
			</GridContainer>
		);
	}
}

export default connect(null, actions)(Favorites);
