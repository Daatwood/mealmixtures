const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Recipe = mongoose.model('recipes');

module.exports = (app) => {
	// Index public recipes
	app.get('/api/recipes', async (req, res) => {
		const recipes = await Recipe.find({ private: false });

		res.send(recipes);
	});

	// Index current user recipes
	app.get('/api/recipes/private', requireLogin, async (req, res) => {
		const recipes = await Recipe.find({ _user: req.user.id });

		res.send(recipes);
	});

	// Show Recipe
	app.get('/api/recipes/:recipeId', async (req, res) => {
		const recipeId = req.params.recipeId;
		const recipe = await Recipe.findOneAndUpdate(
			{
				_id: recipeId
			},
			{
				$inc: { views: 1 }
			}
		).exec();

		if (recipe) {
			res.status(200).send(recipe);
		} else {
			res.status(404).send({ error: `recipe ${recipeId} not found.` });
		}
	});

	// Update Recipe
	app.put('/api/recipes/:recipeId', requireLogin, async (req, res) => {
		const recipeId = req.params.recipeId;
		const { title, description, ingredients, directions, private } = req.body;
		const recipe = await Recipe.findOneAndUpdate(
			{
				_id: recipeId,
				_user: req.user.id
			},
			{
				title,
				description,
				ingredients,
				directions,
				private,
				dateUpdated: Date.now()
			},
			{
				new: true
			}
		).exec();
		if (recipe) {
			res.status(200).send(recipe);
		} else {
			console.log('not found');
			res.status(404).send({ message: `recipe ${recipeId} not found.` });
		}
	});

	// Destroy Recipe
	app.delete('/api/recipes/:recipeId', requireLogin, async (req, res) => {
		const recipeId = req.params.recipeId;
		const recipe = await Recipe.findOneAndRemove({
			_id: recipeId,
			_user: req.user.id
		})
			.exec()
			.catch((error) => handleCatch(error, res));
		if (recipe) {
			res.status(200).send(recipe);
		} else {
			res.status(404).send({ error: `recipe ${recipeId} not found.` });
		}
	});

	// Create Receipe
	app.post('/api/recipes', requireLogin, async (req, res) => {
		const { title, description, ingredients, directions, private } = req.body;
		const newRecipe = new Recipe({
			title,
			description,
			ingredients,
			directions,
			private,
			_user: req.user.id,
			dateUpdated: Date.now()
		});

		try {
			const recipe = await newRecipe.save();
			res.send(recipe);
		} catch (err) {
			console.log(err);
			res.status(422).send(err);
		}
	});

	// Favorite Recipe
	app.get('/api/favorites/:recipeId/add', requireLogin, async (req, res) => {
		const recipeId = req.params.recipeId;
		const recipe = await Recipe.findOne({ _id: recipeId });
		// Ensure the recipe is real
		if (recipe) {
			// Check to make sure recipe is not already added
			if (req.user.favorites.indexOf(recipe.id) === -1) {
				req.user.favorites.push(recipe._id);
				const user = await req.user.save();
				res.send(user);
			} else {
				// It's already on the list, just send back the user
				res.send(req.user);
			}
		} else {
			res.status(404).send({ error: `recipe ${recipeId} not found.` });
		}
	});

	// Unfavorite Recipe
	app.get('/api/favorites/:recipeId/remove', requireLogin, async (req, res) => {
		const recipeId = req.params.recipeId;
		const recipe = await Recipe.findOne({ _id: recipeId });
		// Ensure the recipe is real
		if (recipe) {
			const index = req.user.favorites.indexOf(recipe.id);
			// Check to see if recipe is on the list
			if (index !== -1) {
				req.user.favorites.splice(index, 1);
				const user = await req.user.save();
				res.send(user);
			} else {
				res.status(404).send({ error: `recipe favorite not found.` });
			}
		} else {
			res.status(404).send({ error: `recipe ${recipeId} not found.` });
		}
	});

	function handleError(error, res) {
		console.log('ERR: ' + error + '|' + res);
	}
};
