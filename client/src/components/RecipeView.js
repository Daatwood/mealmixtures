import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import IconButton from '@material-ui/core/IconButton';
import Rating from './Rating';
import { green, grey } from '@material-ui/core/colors';

import deepOrange from '@material-ui/core/colors/deepOrange';
import * as actions from '../actions';

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		paddingTop: '20px'
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'left',
		color: theme.palette.text.secondary
	},
	checked: {
		textDecoration: 'line-through'
	},
	size: {
		padding: theme.spacing.unit * 2,
		width: 80,
		height: 80
	},
	sizeIcon: {
		fontSize: 40
	},
	ingredientCheck: {
		color: grey[300],
		'&$checked': {
			color: green[600]
		}
	}
});

class RecipeView extends Component {
	state = {
		checked: [ 0 ],
		rating: 3
	};

	componentWillMount() {
		this.props.fetchRecipe(this.props.match.params.id);
	}

	handleToggle = (value) => () => {
		const { checked } = this.state;
		const currentIndex = checked.indexOf(value);
		const newChecked = [ ...checked ];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		this.setState({
			checked: newChecked
		});
	};

	handleRating = (value) => {
		this.setState({ rating: value });
	};

	renderContent() {
		if (this.props.recipe) {
			console.log(this.props.recipe);
			const { classes } = this.props;
			return (
				<Grid container spacing={24}>
					<Grid item xs={10}>
						<Typography variant="display3">{this.props.recipe.title}</Typography>
						<Rating value={this.state.rating} max={5} onChange={(value) => this.handleRating(value)} />
					</Grid>
					<Grid item xs={2}>
						<FormControlLabel
							control={
								<Checkbox
									className={classes.size}
									icon={<FavoriteBorder className={classes.sizeIcon} />}
									checkedIcon={<Favorite className={classes.sizeIcon} />}
									value="checkedH"
								/>
							}
						/>
						<Typography variant="caption">123 Views</Typography>
						<Typography variant="caption">34 Ratings</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Paper className={classes.paper}>
							<Typography variant="caption">Description</Typography>
							<Typography variant="body1">{this.props.recipe.description}</Typography>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Paper className={classes.paper}>
							Ingredients
							<List>
								{this.props.recipe.ingredients.map((value, index) => (
									<ListItem
										key={index}
										role={undefined}
										dense
										button
										onClick={this.handleToggle(value)}>
										<Checkbox
											checked={this.state.checked.indexOf(value) !== -1}
											tabIndex={-1}
											style={{
												color: this.state.checked.indexOf(value) !== -1 ? green[600] : grey[400]
											}}
										/>
										<ListItemText
											className={
												this.state.checked.indexOf(value) !== -1 ? classes.checked : null
											}>
											{value}
										</ListItemText>
									</ListItem>
								))}
							</List>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={12}>
						<Paper className={classes.paper}>
							Directions
							<List className={classes.paper}>
								{this.props.recipe.directions.map((value, index) => (
									<ListItem key={index} role={undefined} button onClick={this.handleToggle(value)}>
										<Avatar
											style={{
												backgroundColor:
													this.state.checked.indexOf(value) !== -1
														? grey[400]
														: deepOrange[300]
											}}>
											{index + 1}.
										</Avatar>
										<ListItemText
											className={
												this.state.checked.indexOf(value) !== -1 ? classes.checked : null
											}>
											{value}
										</ListItemText>
									</ListItem>
								))}
							</List>
						</Paper>
					</Grid>
				</Grid>
			);
		} else {
			return <p>Loading</p>;
		}
	}

	render() {
		console.log(this.props.match.params.id);
		const { classes } = this.props;
		return <div className={classes.root}>{this.renderContent()}</div>;
	}
}

RecipeView.propTypes = {
	classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	console.log(state);
	return { recipe: state.recipes.active };
}

export default connect(mapStateToProps, actions)(withStyles(styles)(RecipeView));
