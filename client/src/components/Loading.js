import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, LinearProgress } from '@material-ui/core';

const styles = {
	root: {
		flexGrow: 1,
		textAlign: 'center'
	}
};

function Loading(props) {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<Typography variant="display1">Loading</Typography>
			<LinearProgress color="secondary" />
		</div>
	);
}

export default withStyles(styles)(Loading);
