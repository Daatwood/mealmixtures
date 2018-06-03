const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	facebookId: String,
	favorites: [ { type: Schema.Types.ObjectId, ref: 'Recipe' } ]
});

mongoose.model('users', userSchema);
