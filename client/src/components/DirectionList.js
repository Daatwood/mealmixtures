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
		const { classes, directions } = this.props;
		return directions.map((value, index) => {
			const checked = this.state.checked.indexOf(value) !== -1;
			const itemStyle = checked ? classes.itemChecked : null;
			const textStyle = checked ? classes.textChecked : null;
			const avatarStyle = checked ? classes.checkedAvatar : classes.avatar;
			return (
				<Direction
					key={index}
					step={index + 1}
					text={value}
					avatarStyle={avatarStyle}
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
				<Typography variant="title" color="inherit">
					Directions
				</Typography>
				<List>{this.renderDirections()}</List>
			</Paper>
		);
	}
}

export default withStyles(checkedListStyle)(DirectionList);
