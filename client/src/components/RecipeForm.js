import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import formFields from './formFields';
import RecipeField from './RecipeField';
import RecipeFieldArray from './RecipeFieldArray';

// class RecipeForm extends Component {
// 	renderFields() {
// 		return formFields.map(({ label, name }) => {
// 			return <Field key={name} component={RecipeField} type="text" label={label} name={name} />;
// 		});
// 	}

// 	render() {
// 		return (
// 			<form onSubmit={() => console.log(this.props)}>
// 				{this.renderFields()}
// 				<button type="submit">Submit</button>
// 			</form>
// 		);
// 	}
// }

// export default reduxForm({ form: 'recipeForm' })(RecipeForm);

class RecipeForm extends Component {
	renderFields() {
		return formFields.map(({ label, name, isArray }) => {
			if (isArray) {
				return <FieldArray key={name} name={name} label={label} component={RecipeFieldArray} />;
			} else {
				return <Field key={name} component={RecipeField} type="text" label={label} name={name} />;
			}
		});
	}
	render() {
		const { handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit}>
				{this.renderFields()}
				<button type="submit">Submit</button>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};
	formFields.forEach(({ name, required, isArray }) => {
		if (isArray) {
			if (!values[name] || !values[name].length)
				errors[name] = isArray ? { _error: 'At least one item must be entered' } : 'Required';
			else if (values[name].length) {
				errors[name] = [];
				values[name].forEach((val, index) => {
					if (!values[name][index]) errors[name][index] = 'Required';
				});
			}
		} else if (!values[name]) {
			errors[name] = 'Required';
		}
	});

	return errors;
}

export default reduxForm({ form: 'recipe', validate })(RecipeForm);
