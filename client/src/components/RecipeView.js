import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
class RecipeView extends Component {
	componentWillMount() {
		this.props.fetchRecipe(this.props.match.params.id);
	}

	renderContent() {
		if (this.props.recipe) {
			console.log(this.props.recipe);
			return (
				<div>
					<h1>{this.props.recipe.title}</h1>
					<p>{this.props.recipe.description}</p>
					<ul>
						{this.props.recipe.ingredients.map((val, index) => (
							<li key={index}>
								<p>{val}</p>
							</li>
						))}
					</ul>
					<ul>
						{this.props.recipe.directions.map((val, index) => (
							<li key={index}>
								<p>{val}</p>
							</li>
						))}
					</ul>
				</div>
			);
		} else {
			return <p>Loading</p>;
		}
	}

	render() {
		console.log(this.props.match.params.id);
		return <div>{this.renderContent()}</div>;
	}
}
function mapStateToProps(state) {
	console.log(state);
	return { recipe: state.recipes.active };
}

export default connect(mapStateToProps, actions)(RecipeView);
