import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import RecipeList from '../components/RecipeList';
import * as actions from '../actions';
import { Typography } from '@material-ui/core';

class Landing extends Component {
	renderContent() {
		const { user } = this.props;
		switch (user) {
			case null:
				return [];
			case false:
				return (
					<Typography variant="subheading">
						Let's get started <Link to="/login">Login</Link> to get started.
					</Typography>
				);
			default:
				return (
					<Typography variant="subheading">
						Go to the <Link to="/dashboard">Dashboard</Link> to get started.
					</Typography>
				);
		}
	}

	render() {
		return (
			<div style={{ textAlign: 'center' }}>
				<Typography variant="display3" style={{ letterSpacing: '.5rem' }}>
					Meal Mixtures
				</Typography>
				<Typography variant="headline">Your personal recipe manager.</Typography>
				{this.renderContent()}

				{/* <RecipeList title="Popular Recipes" recipesAction={this.props.fetchRecipes} /> */}
			</div>
		);
	}
}

function mapStateToProps({ auth }) {
	return {
		user: auth
	};
}

export default connect(mapStateToProps, actions)(Landing);
