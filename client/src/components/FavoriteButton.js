import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Checkbox, FormControlLabel, Zoom } from '@material-ui/core';
import { Favorite as FavoriteIcon, FavoriteBorder } from '@material-ui/icons';

import largeIconStyle from '../styles/largeIconStyle';

class FavoriteButton extends Component {
	state = {
		checked: !!this.props.favorited
	};

	handleChange = () => {
		this.setState({ checked: !this.state.checked });
		this.props.onFavorite(!this.state.checked);
	};

	render() {
		const { checked } = this.state;
		const { classes, favorited } = this.props;
		return (
			<FormControlLabel
				onChange={this.handleChange}
				className={classes.control}
				control={
					<Checkbox
						checked={!!favorited}
						icon={<FavoriteBorder className={classes.icon} />}
						checkedIcon={
							<Zoom in={checked}>
								<FavoriteIcon color="error" className={classes.icon} />
							</Zoom>
						}
						value="checkedH"
					/>
				}
			/>
		);
	}
}
export default withStyles(largeIconStyle)(FavoriteButton);
