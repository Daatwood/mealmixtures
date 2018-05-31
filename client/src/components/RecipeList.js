import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
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
				<Grid>
					<Typography variant="display1">Loading Recipes...</Typography>
				</Grid>
			);
		} else if (recipes.length) {
			return recipes.map((recipe) => {
				return (
					<Grid key={recipe._id} item>
						<RecipeCard {...recipe} />
					</Grid>
				);
			});
		} else {
			return (
				<Grid>
					<Typography variant="display1">No Recipes found.</Typography>
				</Grid>
			);
		}
	}

	render() {
		const { classes, title } = this.props;
		return (
			<div>
				<Grid container className={classes.root} justify="space-around" spacing={16}>
					<Grid item xs={12}>
						<Typography variant="display1">{title}</Typography>
					</Grid>
					{this.renderRecipes()}
				</Grid>
			</div>
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
