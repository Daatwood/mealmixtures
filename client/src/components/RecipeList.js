import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import GridContainer from './GridContainer';
import GridItem from './GridItem';

import RecipeCard from './RecipeCard';

const styles = (theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		height: 140,
		width: 100
	},
	card: {
		maxWidth: 345
	},
	control: {
		padding: theme.spacing.unit * 2
	}
});

class RecipeList extends Component {
	componentDidMount() {
		this.props.recipesAction();
	}

	renderRecipes() {
		const { recipes, loading, error } = this.props;
		if (loading) {
			return (
				<GridItem>
					<Typography variant="display1">Loading Recipes...</Typography>
				</GridItem>
			);
		} else if (error) {
			return <h1>Error: {error}</h1>;
		} else if (recipes.length) {
			return recipes.map((recipe) => {
				return (
					<GridItem key={recipe._id}>
						<RecipeCard {...recipe} />
					</GridItem>
				);
			});
		} else {
			return (
				<GridItem>
					<Typography variant="display1">No Recipes found.</Typography>
				</GridItem>
			);
		}
	}

	render() {
		const { classes, title } = this.props;
		return (
			<GridContainer className={classes.root} justify="space-around">
				<GridItem xs={12}>
					<Typography variant="display1">{title}</Typography>
				</GridItem>
				{this.renderRecipes()}
			</GridContainer>
		);
	}
}

function mapStateToProps({ recipes }) {
	console.log(recipes);
	return {
		recipes: recipes.list,
		loading: recipes.loading,
		error: recipes.error
	};
}

export default connect(mapStateToProps, null)(withStyles(styles)(RecipeList));
