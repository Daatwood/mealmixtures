import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const style = {
	grid: {
		minHeight: '1px'
	}
};

function GridItem({ ...props }) {
	const { classes, children, className, ...rest } = props;
	return (
		<Grid item {...rest} className={classes.grid + ' ' + className}>
			{children}
		</Grid>
	);
}

export default withStyles(style)(GridItem);
