import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';

import formFields from './formFields';
import RecipeField from './RecipeField';
import RecipeFieldArray from './RecipeFieldArray';

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		paddingTop: '20px'
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'left',
		color: theme.palette.text.secondary
	},
	size: {
		padding: theme.spacing.unit * 2,
		width: 80,
		height: 80
	},
	sizeIcon: {
		fontSize: 40
	}
});

class RecipeForm extends Component {
	renderFields() {
		return formFields.map(({ label, name, isArray, required }) => {
			if (isArray) {
				return <FieldArray key={name} name={name} label={label} component={RecipeFieldArray} />;
			} else {
				return <Field key={name} component={RecipeField} type="text" label={label} name={name} required />;
			}
		});
	}

	renderForm() {
		const { classes, handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit} autoComplete="off">
				<Grid container spacing={24}>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<Field key="title" component={RecipeField} type="text" label="Recipe Name" name="title" />
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Paper className={classes.paper}>
							<Field
								key="description"
								component={RecipeField}
								type="text"
								label="Recipe Description"
								name="description"
								multiline
							/>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Paper>
							<FieldArray
								key="ingredients"
								name="ingredients"
								label="Ingredient"
								component={RecipeFieldArray}
							/>
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper>
							<FieldArray
								key="directions"
								name="directions"
								label="Direction"
								component={RecipeFieldArray}
							/>
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Button
							variant="outlined"
							component={Link}
							to="/dashboard"
							color="secondary"
							size="large"
							style={{
								color: red[600]
							}}>
							Back
						</Button>
						<Button
							variant="raised"
							type="submit"
							size="large"
							style={{
								backgroundColor: green[600],
								color: 'white',
								float: 'right'
							}}>
							{!this.props.initialValues ? 'Save' : 'Create'}
						</Button>
					</Grid>
				</Grid>
			</form>
		);
	}

	render() {
		const { classes } = this.props;
		return <div className={classes.root}>{this.renderForm()}</div>;
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

export default reduxForm({ form: 'recipe', validate })(withStyles(styles)(RecipeForm));
