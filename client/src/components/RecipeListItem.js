import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeForm from './RecipeForm';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

class RecipeListItem extends Component {
	handleSubmit = (values) => {
		this.props.submitRecipe(values, this.props.history);
	};
	render() {
		return (
			<div>
				<h1>New Recipe</h1>
				<RecipeForm onSubmit={this.handleSubmit} />
			</div>
		);
	}
}
export default connect(null, actions)(withRouter(RecipeListItem));
