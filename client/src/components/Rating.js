import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IconButton, Zoom } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Star, StarBorder } from '@material-ui/icons';
import { orange } from '@material-ui/core/colors';

const styles = (theme) => ({
	disabled: {
		pointerEvents: 'none'
	},
	active: {
		color: orange[500]
	},
	inactive: {
		color: theme.palette.text.secondary
	},
	icon: {
		fontSize: 60
	},
	control: {
		width: 60,
		height: 60
	}
});

class Rating extends Component {
	state = {
		hoverValue: this.props.value
	};

	renderStar(i) {
		const { classes } = this.props;
		const filled = i <= this.props.value;
		const hovered = i <= this.state.hoverValue;
		if (hovered) {
			return (
				<Zoom in={hovered} style={{ transitionDelay: i * 50 }}>
					<Star className={classNames(classes.active, classes.icon)} />
				</Zoom>
			);
		} else if (!filled) {
			return <StarBorder className={classNames(classes.inactive, classes.icon)} />;
		} else {
			return <StarBorder className={classNames(classes.active, classes.icon)} />;
		}
	}

	render() {
		const { classes, max, value, disabled, onChange } = this.props;
		const rating = [];
		for (let i = 1; i <= max; i++) {
			rating.push(
				<IconButton
					className={classes.control}
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

Rating.defaultProps = {
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
