import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const style = {
	grid: {
		marginRight: '-15px',
		marginLeft: '-15px',
		width: 'auto'
	}
};

function GridContainer({ ...props }) {
	const { classes, children, className, ...rest } = props;
	return (
		<Grid container {...rest}>
			{children}
		</Grid>
	);
}
GridContainer.defaultProps = {
	className: '',
	spacing: 16
};

export default withStyles(style)(GridContainer);
