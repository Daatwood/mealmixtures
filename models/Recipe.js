const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipeSchema = new Schema({
	title: String,
	description: String,
	ingredients: [ String ],
	directions: [ String ],
	dateUpdated: Date,
	_user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('recipes', recipeSchema);
