import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@material-ui/core';
import { MoreVert, Edit, DeleteForever as Delete } from '@material-ui/icons';

import largeIconStyle from '../styles/largeIconStyle';

class ActionMenu extends Component {
	state = {
		anchorEl: null
	};

	handleClick = (event) => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	handleDelete = () => {
		this.props.onDelete();
		this.handleClose();
	};
	render() {
		const { anchorEl } = this.state;
		const { recipeId, isOwner } = this.props;
		if (isOwner) {
			return (
				<div>
					<IconButton
						variant="raised"
						aria-label="Actions"
						aria-owns={anchorEl ? 'actions-menu' : null}
						aria-haspopup="true"
						onClick={this.handleClick}>
						<MoreVert />
					</IconButton>
					<Menu id="actions-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
						<MenuItem component={Link} to={`/recipes/${recipeId}/edit`}>
							<ListItemIcon>
								<Edit />
							</ListItemIcon>
							<ListItemText inset primary="Edit" />
						</MenuItem>,
						<MenuItem onClick={this.handleDelete}>
							<ListItemIcon>
								<Delete />
							</ListItemIcon>
							<ListItemText inset primary="Delete" />
						</MenuItem>
					</Menu>
				</div>
			);
		} else {
			return null;
		}
	}
}

ActionMenu.defaultProps = {
	isOwner: false
};

ActionMenu.propTypes = {
	isOwner: PropTypes.bool,
	recipeId: PropTypes.string.isRequired,
	onDelete: PropTypes.func.isRequired
};

export default withStyles(largeIconStyle)(ActionMenu);
