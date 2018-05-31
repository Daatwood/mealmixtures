import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import RecipeCard from './RecipeCard';
import { Typography } from '@material-ui/core';

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
		const { recipes } = this.props;
		if (!recipes) {
			return <p>Loading Recipes</p>;
		} else if (recipes.length) {
			return recipes.map((recipe) => {
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

RecipeList.propTypes = {
	classes: PropTypes.object.isRequired
};

function mapStateToProps({ recipes }) {
	return { recipes: recipes.list };
}

export default connect(mapStateToProps, null)(withStyles(styles)(RecipeList));
