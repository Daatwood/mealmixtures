import React, { Component } from 'react';
import { Menu, MenuItem, Button, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ShareIcon from '@material-ui/icons/Share';

const styles = (theme) => ({
	button: {
		margin: theme.spacing.unit
	},
	icon: {
		marginRight: theme.spacing.unit
	},
	iconSmall: {
		fontSize: 20
	}
});
class ShareMenu extends Component {
	state = {
		anchorEl: null
	};

	handleClick = (event) => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		const { anchorEl } = this.state;
		const { classes } = this.props;
		return (
			<div>
				<Tooltip id="tooltip-icon" title="Spread the word">
					<Button
						className={classes.button}
						variant="raised"
						aria-label="Share"
						aria-owns={anchorEl ? 'share-menu' : null}
						aria-haspopup="true"
						onClick={this.handleClick}
						color="secondary">
						<ShareIcon className={classes.icon} />
						Share
					</Button>
				</Tooltip>
				<Menu id="share-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
					<MenuItem onClick={this.handleClose}>Facebook</MenuItem>
					<MenuItem onClick={this.handleClose}>Twitter</MenuItem>
					<MenuItem onClick={this.handleClose}>Email</MenuItem>
				</Menu>
			</div>
		);
	}
}

export default withStyles(styles)(ShareMenu);
