import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeForm from './RecipeForm';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';
import { Typography } from '@material-ui/core';

class RecipeListItem extends Component {
	handleSubmit = (values) => {
		this.props.submitRecipe(values, this.props.history);
	};
	render() {
		return (
			<div>
				<Typography variant="display3">New Recipe</Typography>
				<RecipeForm onSubmit={this.handleSubmit} />
			</div>
		);
	}
}
export default connect(null, actions)(withRouter(RecipeListItem));
