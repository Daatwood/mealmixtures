import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import * as actions from '../actions';

import RecipeForm from '../components/RecipeForm';

class RecipeEdit extends Component {
	componentWillMount() {
		this.props.fetchRecipe(this.props.match.params.id);
	}

	handleSubmit = (values) => {
		this.props.updateRecipe(values, this.props.history);
	};

	renderContent() {
		const { initialValues } = this.props;
		return <RecipeForm initialValues={initialValues} onSubmit={this.handleSubmit} />;
	}

	render() {
		return (
			<div>
				<Typography variant="display3">Edit Recipe</Typography>
				{this.renderContent()}
			</div>
		);
	}
}
function mapStateToProps({ recipes }) {
	return { initialValues: recipes.active, loading: recipes.loading };
}
export default connect(mapStateToProps, actions)(withRouter(RecipeEdit));
