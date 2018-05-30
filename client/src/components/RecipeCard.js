import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import PageviewIcon from '@material-ui/icons/ZoomOutMap';

import ShareMenu from './ShareMenu';

const styles = {
	card: {
		width: 345
	},
	actions: {
		display: 'flex'
	}
};

function RecipeCard(props) {
	const { classes, _id, title, description, dateUpdated } = props;
	return (
		<Card className={classes.card}>
			<CardHeader
				action={
					<FormControlLabel
						control={
							<Checkbox
								aria-label="Add to favorites"
								icon={<FavoriteBorder />}
								checkedIcon={<Favorite />}
								value="checkedH"
							/>
						}
					/>
				}
				title={title}
				subheader={new Date(dateUpdated).toLocaleDateString('en-US', {
					month: 'long',
					day: 'numeric',
					year: 'numeric'
				})}
			/>
			<CardContent>
				<Typography component="p">{description}</Typography>
			</CardContent>
			<CardActions disableActionSpacing className={classes.actions}>
				<ShareMenu />
				<IconButton
					color="primary"
					component={Link}
					to={`/recipes/${_id}`}
					aria-label="View"
					style={{ marginLeft: 'auto' }}>
					<PageviewIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
}

RecipeCard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecipeCard);
