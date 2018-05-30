import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { fetchRecipes } from '../actions';
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
		this.props.fetchRecipes();
	}

	renderRecipes() {
		if (this.props.recipes.length) {
			return this.props.recipes.reverse().map((recipe) => {
				return (
					<Grid key={recipe._id} item>
						<RecipeCard {...recipe} />
					</Grid>
				);
			});
		} else {
			return <p>No Recipes Found</p>;
		}
	}

	render() {
		const { classes } = this.props;
		return (
			<div>
				<h1>Recipes</h1>
				<Grid container className={classes.root} justify="space-around" spacing={16}>
					{this.renderRecipes()}
				</Grid>
			</div>
		);
	}
}

RecipeList.propTypes = {
	classes: PropTypes.object.isRequired
};

function mapStateToProps({ recipes }) {
	console.log(recipes);
	return { recipes: recipes.list };
}

export default connect(mapStateToProps, { fetchRecipes })(withStyles(styles)(RecipeList));
