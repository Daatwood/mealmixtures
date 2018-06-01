import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Star, StarBorder } from '@material-ui/icons';
import { orange, grey } from '@material-ui/core/colors';

const styles = {
	disabled: {
		pointerEvents: 'none'
	},
	active: {
		color: orange[500]
	},
	inactive: {
		color: grey[300]
	}
};

class Rating extends Component {
	state = {
		hoverValue: this.props.value
	};

	renderStar(i) {
		const { classes } = this.props;
		const filled = i <= this.props.value;
		const hovered = i <= this.state.hoverValue;
		if (hovered) {
			return <Star className={classes.active} />;
		} else if (!filled) {
			return <StarBorder className={classes.inactive} />;
		} else {
			return <StarBorder className={classes.active} />;
		}
	}

	render() {
		const { max, value, disabled, onChange } = this.props;
		const rating = [];
		for (let i = 1; i <= max; i++) {
			rating.push(
				<IconButton
					key={i}
					disabled={disabled}
					disableRipple
					component="span"
					onMouseEnter={() => this.setState({ hoverValue: i })}
					onMouseLeave={() => this.setState({ hoverValue: value })}
					onClick={() => {
						if (!disabled && onChange) {
							onChange(i);
						}
					}}>
					{this.renderStar(i)}
				</IconButton>
			);
		}
		return <div style={disabled ? { ...styles.disabled } : null}>{rating}</div>;
	}
}

Rating.propTypes = {
	disabled: false,
	max: 5,
	value: 0
};

Rating.propTypes = {
	disabled: PropTypes.bool,
	classes: PropTypes.object.isRequired,
	max: PropTypes.number,
	value: PropTypes.number,
	onChange: PropTypes.func
};

export default withStyles(styles)(Rating);
