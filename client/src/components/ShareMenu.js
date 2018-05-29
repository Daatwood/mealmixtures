import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';
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

		return (
			<div>
				<IconButton
					aria-label="Share"
					aria-owns={anchorEl ? 'share-menu' : null}
					aria-haspopup="true"
					onClick={this.handleClick}>
					<ShareIcon />
				</IconButton>
				<Menu id="share-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
					<MenuItem onClick={this.handleClose}>Facebook</MenuItem>
					<MenuItem onClick={this.handleClose}>Twitter</MenuItem>
					<MenuItem onClick={this.handleClose}>Email</MenuItem>
				</Menu>
			</div>
		);
	}
}

export default ShareMenu;
