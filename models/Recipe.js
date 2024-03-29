const mongoose = require('mongoose');
const { Schema } = mongoose;

const RatingSchema = require('./Rating');
const recipeSchema = new Schema({
	title: String,
	private: { type: Boolean, default: false },
	description: String,
	ingredients: [ String ],
	directions: [ String ],
	dateUpdated: Date,
	views: { type: Number, default: 0 },
	ratings: [ RatingSchema ],
	_user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('recipes', recipeSchema);
