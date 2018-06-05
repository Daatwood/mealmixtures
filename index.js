require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const keys = require('./config/keys');

// Load classes
require('./models/User');
require('./models/Recipe');

// Load passport
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 Days
		keys: [ keys.cookieKey ] // Encypt cookie with key
	})
);

app.use(passport.initialize());
app.use(passport.session());

// Require and pass app into route
require('./routes/authRoutes')(app);
require('./routes/recipeRoutes')(app);

// Serve Production build of React
if (process.env.NODE_ENV === 'production') {
	// Express will serve up production assets like main.js, or main.css
	app.use(express.static('client/build'));
	// Express will serve index.html file if route is not recognized
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5005;
app
	.listen(PORT, function() {
		console.log('Successfully started on ' + PORT);
	})
	.on('error', function(err) {
		if (err.errno === 'EADDRINUSE') {
			console.log(PORT + ' is busy.');
		} else {
			console.log(err);
		}
	});
