const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Recipe = mongoose.model('recipes');

module.exports = (app) => {
	app.get('/api/recipes', async (req, res) => {
		const recipes = await Recipe.find();

		res.send(recipes);
	});

	app.get('/api/recipes/private', requireLogin, async (req, res) => {
		const recipes = await Recipe.find({ _user: req.user.id });

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

	app.put('/api/recipes/:recipeId', requireLogin, async (req, res) => {
		const recipeId = req.params.recipeId;
		const { title, description, ingredients, directions } = req.body;
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

	app.post('/api/recipes', requireLogin, async (req, res) => {
		const { title, description, ingredients, directions } = req.body;
		const newRecipe = new Recipe({
			title,
			description,
			ingredients,
			directions,
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

	function handleError(error, res) {
		console.log('ERR: ' + error + '|' + res);
	}
};
