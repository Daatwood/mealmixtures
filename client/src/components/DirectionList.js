import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { List, Paper, Typography } from '@material-ui/core';

import Direction from './Direction';

import checkedListStyle from '../styles/checkedListStyle';

class DirectionList extends Component {
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

	renderDirections() {
		const { directions } = this.props;
		return directions.map((value, index) => {
			return (
				<Direction
					key={index}
					step={index + 1}
					text={value}
					checked={this.state.checked.indexOf(value) !== -1}
					onClick={this.handleToggle(value)}
				/>
			);
		});
	}

	render() {
		const { classes } = this.props;
		return (
			<Paper className={classes.paper}>
				<Typography variant="title" color="inherit">
					Directions
				</Typography>
				<List>{this.renderDirections()}</List>
			</Paper>
		);
	}
}

export default withStyles(checkedListStyle)(DirectionList);
