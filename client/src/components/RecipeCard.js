import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardActions, CardContent, Typography, Button } from '@material-ui/core';

import FavoriteButton from './FavoriteButton';
import ActionMenu from './ActionMenu';

const styles = (theme) => ({
	card: {
		width: 345
	},
	actions: {
		display: 'flex'
	},
	button: {
		margin: theme.spacing.unit
	}
});

class RecipeCard extends Component {
	handleFavorite = (value) => {
		const { _id } = this.props;
		value ? this.props.addFavorite(_id) : this.props.removeFavorite(_id);
	};

	render() {
		const { classes, _id, title, description, dateUpdated, isOwner, onDelete, onFavorite, isFavorite } = this.props;
		return (
			<Card className={classes.card}>
				<CardHeader
					action={<FavoriteButton isFavorite={isFavorite} onFavorite={this.handleFavorite} />}
					title={
						<Typography variant="headline" color="primary" component={Link} to={`/recipes/${_id}`}>
							{title}
						</Typography>
					}
					subheader={new Date(dateUpdated).toLocaleDateString('en-US', {
						month: 'long',
						day: 'numeric',
						year: 'numeric'
					})}
				/>
				<CardContent>
					<Typography variant="body1">{description}</Typography>
				</CardContent>
				<CardActions disableActionSpacing className={classes.actions}>
					<ActionMenu recipeId={_id} isOwner={isOwner} onDelete={onDelete} />
					<Button
						className={classes.button}
						variant="raised"
						color="secondary"
						component={Link}
						to={`/recipes/${_id}`}
						aria-label="View"
						style={{ marginLeft: 'auto', color: 'white' }}>
						Open
					</Button>
				</CardActions>
			</Card>
		);
	}
}

export default withStyles(styles)(RecipeCard);
