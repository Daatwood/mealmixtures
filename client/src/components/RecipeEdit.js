import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeForm from './RecipeForm';
import { withRouter } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import * as actions from '../actions';

class RecipeEdit extends Component {
	componentWillMount() {
		this.props.fetchRecipe(this.props.match.params.id);
	}

	handleSubmit = (values) => {
		this.props.updateRecipe(values, this.props.history);
	};
	render() {
		return (
			<div>
				<Typography variant="display3">Edit Recipe</Typography>
				<RecipeForm initialValues={this.props.initialValues} onSubmit={this.handleSubmit} />
			</div>
		);
	}
}
function mapStateToProps(state) {
	return { initialValues: state.recipes.active };
}
export default connect(mapStateToProps, actions)(withRouter(RecipeEdit));
