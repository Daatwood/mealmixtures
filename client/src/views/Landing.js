import React, { Component } from 'react';
import { connect } from 'react-redux';

import RecipeList from '../components/RecipeList';
import * as actions from '../actions';

class Landing extends Component {
	render() {
		return (
			<div>
				<RecipeList title="Popular Recipes" recipesAction={this.props.fetchRecipes} />
			</div>
		);
	}
}

export default connect(null, actions)(Landing);
