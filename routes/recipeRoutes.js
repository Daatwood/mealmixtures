const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Recipe = mongoose.model('recipes');

module.exports = (app) => {
	app.get('/api/recipes', async (req, res) => {
		const recipes = await Recipe.find();

		res.send(recipes);
	});

	app.get('/api/recipes/:recipeId', async (req, res) => {
		const recipeId = req.params.recipeId;
		const recipe = await Recipe.findById(recipeId).exec();
		if (recipe) {
			res.status(200).send(recipe);
		} else {
			res.status(404).send({ error: `recipe ${recipeId} not found.` });
		}
	});

	app.get('/api/myrecipes', requireLogin, async (req, res) => {
		const recipes = await Recipe.find({ _user: req.user.id });

		res.send(recipes);
	});

	app.delete('/api/recipes/:recipeId', requireLogin, async (req, res) => {
		const recipeId = req.params.recipeId;
		const recipe = await Recipe.findByIdAndRemove(recipeId).exec();
		if (recipe) {
			res.status(200).send(recipe);
		} else {
			res.status(404).send({ error: `recipe ${recipeId} not found.` });
		}
	});

	app.post('/api/recipes', requireLogin, async (req, res) => {
		const { title, description, ingredients, directions } = req.body;
		console.log(req.body);
		const newRecipe = new Recipe({
			title,
			description,
			ingredients: ingredients.split(','),
			directions: directions.split(','),
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
};
