const mongoose = require('mongoose');
const { Schema } = mongoose;

const ratingSchema = new Schema({
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
	_recipe: { type: Schema.Types.ObjectId, ref: 'Recipe' },
	value: Number
});
