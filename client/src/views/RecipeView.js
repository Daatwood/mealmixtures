import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import recipeViewStyle from '../styles/recipeViewStyle';

import Rating from '../components/Rating';
import IngredientList from '../components/IngredientList';
import DirectionList from '../components/DirectionList';
import Loading from '../components/Loading';
import FavoriteButton from '../components/FavoriteButton';
import ActionMenu from '../components/ActionMenu';
import GridContainer from '../components/GridContainer';
import GridItem from '../components/GridItem';

import isOwner from '../utils/isOwner';
import * as actions from '../actions';

class RecipeView extends Component {
	state = {
		checked: [ 0 ],
		rating: 3
	};

	componentWillMount() {
		this.props.fetchRecipe(this.props.match.params.id);
	}

	handleToggle = (value) => () => {
		const { checked } = this.state;
		const currentIndex = checked.indexOf(value);
		const newChecked = [ ...checked ];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		this.setState({
			checked: newChecked
		});
	};

	handleRating = (value) => {
		this.setState({ rating: value });
	};

	handleDelete = () => {
		this.props.deleteRecipe(this.props.recipe._id, this.props.history);
	};

	renderContent() {
		if (this.props.recipe) {
			const { classes } = this.props;
			return (
				<GridContainer>
					<GridItem xs={10} style={{ textAlign: 'center' }}>
						<Typography color="primary" variant="display3">
							{this.props.recipe.title}
						</Typography>
					</GridItem>
					<GridItem xs={2} style={{ textAlign: 'right' }}>
						<FavoriteButton />
					</GridItem>

					<GridItem xs={12} sm={10}>
						<Rating value={this.state.rating} max={5} onChange={(value) => this.handleRating(value)} />
					</GridItem>
					<GridItem xs={12} sm={2} style={{ textAlign: 'right' }}>
						<ActionMenu
							recipeId={this.props.recipe._id}
							isOwner={isOwner(this.props.user, this.props.recipe)}
							onDelete={this.handleDelete}
						/>
					</GridItem>

					<GridItem xs={6}>
						<Typography variant="caption">34 Ratings</Typography>
					</GridItem>
					<GridItem xs={6} style={{ textAlign: 'right' }}>
						<Typography variant="caption">123 Views</Typography>
					</GridItem>

					<GridItem xs={12} sm={6}>
						<Paper className={classes.paper}>
							<Typography variant="subheading" color="inherit">
								Description
							</Typography>
							<Typography variant="body1">{this.props.recipe.description}</Typography>
						</Paper>
					</GridItem>
					<GridItem xs={12} sm={6}>
						<IngredientList ingredients={this.props.recipe.ingredients} />
					</GridItem>
					<GridItem xs={12} sm={12}>
						<DirectionList directions={this.props.recipe.directions} />
					</GridItem>
				</GridContainer>
			);
		} else {
			return <Loading />;
		}
	}

	render() {
		const { classes } = this.props;
		return <div className={classes.root}>{this.renderContent()}</div>;
	}
}

function mapStateToProps({ auth, recipes }) {
	return {
		recipe: recipes.active,
		user: auth
	};
}

export default connect(mapStateToProps, actions)(withRouter(withStyles(recipeViewStyle)(RecipeView)));