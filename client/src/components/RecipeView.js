import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Button, Paper } from '@material-ui/core';
import { Grid, List, ListItem, ListItemText, Checkbox, FormControlLabel, Typography, Avatar } from '@material-ui/core';
import { Favorite, FavoriteBorder, Edit, Delete } from '@material-ui/icons';
import { green, yellow, red, grey, deepOrange } from '@material-ui/core/colors';
import Rating from './Rating';
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
	button: {
		margin: theme.spacing.unit
	},
	editButton: {
		color: theme.palette.getContrastText(yellow[500]),
		backgroundColor: yellow[500],
		'&:hover': {
			backgroundColor: yellow[700]
		}
	},
	deleteButton: {
		color: theme.palette.getContrastText(red[500]),
		backgroundColor: red[500],
		'&:hover': {
			backgroundColor: red[700]
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

	handleDelete = () => {
		this.props.deleteRecipe(this.props.recipe._id, this.props.history);
	};

	renderOwnerActions() {
		if (!this.props.user) return;
		const { classes, recipe: { _user, _id } } = this.props;
		const user_id = this.props.user._id;

		if (_user === user_id)
			return [
				<Button
					key="1"
					variant="fab"
					aria-label="edit"
					color="primary"
					className={classes.button}
					component={Link}
					to={`/recipes/${_id}/edit`}>
					<Edit />
				</Button>,
				<Button
					key="2"
					variant="fab"
					aria-label="delete"
					className={classNames(classes.button, classes.deleteButton)}
					onClick={this.handleDelete}>
					<Delete />
				</Button>
			];
	}

	renderContent() {
		if (this.props.recipe) {
			const { classes } = this.props;
			return (
				<Grid container spacing={16}>
					<Grid item xs={10} sm={8}>
						<Typography variant="display3">{this.props.recipe.title}</Typography>
					</Grid>
					<Grid item xs={2} sm={4}>
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
						{this.renderOwnerActions()}
					</Grid>
					<Grid item xs={10}>
						<Rating value={this.state.rating} max={5} onChange={(value) => this.handleRating(value)} />
					</Grid>
					<Grid item xs={2}>
						<Typography variant="caption">123 Views</Typography>
						<Typography variant="caption">34 Ratings</Typography>
					</Grid>

					<Grid item xs={12} sm={6}>
						<Paper className={classes.paper}>
							<Typography variant="subheading" color="inherit">
								Description
							</Typography>
							<Typography variant="body1">{this.props.recipe.description}</Typography>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Paper className={classes.paper}>
							<Typography variant="subheading" color="inherit">
								Ingredients
							</Typography>
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
							<Typography variant="subheading" color="inherit">
								Directions
							</Typography>
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
		const { classes } = this.props;
		return <div className={classes.root}>{this.renderContent()}</div>;
	}
}

RecipeView.propTypes = {
	classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		recipe: state.recipes.active,
		user: state.auth
	};
}

export default connect(mapStateToProps, actions)(withRouter(withStyles(styles)(RecipeView)));
