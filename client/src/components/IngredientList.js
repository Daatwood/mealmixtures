import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { List, Paper, Typography } from '@material-ui/core';

import Ingredient from './Ingredient';
import checkedListStyle from '../styles/checkedListStyle';

class IngredientList extends Component {
	state = {
		checked: [ 0 ]
	};

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

	renderIngredients() {
		const { classes, ingredients } = this.props;
		return ingredients.map((value, index) => {
			const checked = this.state.checked.indexOf(value) !== -1;
			const itemStyle = checked ? classes.itemChecked : null;
			const textStyle = checked ? classes.textChecked : null;
			const boxStyle = checked ? classes.checkboxChecked : classes.checkbox;
			return (
				<Ingredient
					key={index}
					step={index + 1}
					text={value}
					checked={checked}
					boxStyle={boxStyle}
					itemStyle={itemStyle}
					textStyle={textStyle}
					onClick={this.handleToggle(value)}
				/>
			);
		});
	}

	render() {
		const { classes } = this.props;
		return (
			<Paper className={classes.paper}>
				<Typography variant="subheading" color="inherit">
					Ingredients
				</Typography>
				<List>{this.renderIngredients()}</List>
			</Paper>
		);
	}
}

export default withStyles(checkedListStyle)(IngredientList);
