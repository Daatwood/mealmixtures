const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	// Setup oauth google strategy
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/api/auth/google/callback',
			proxy: true
		},
		// Callback function of oauth strategy
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id });

			if (existingUser) {
				// We already have a record with given profile ID
				return done(null, existingUser);
			}

			// Record with profile Id is not found, creating it
			const user = await new User({ 
				googleId: profile.id, 
				googleAccessToken: accessToken, 
				googleRefreshToken: refreshToken }).save();
			done(null, user);
		}
	)
);

passport.use(
	new FacebookStrategy(
		{
			clientID: keys.facebookAppID,
			clientSecret: keys.facebookAppSecret,
			callbackURL: '/api/auth/facebook/callback'
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ facebookId: profile.id });

			if (existingUser) {
				// We already have a record with given profile ID
				return done(null, existingUser);
			}

			// Record with profile Id is not found, creating it
			const user = await new User({ facebookId: profile.id }).save();
			done(null, user);

			//const existingUser = await User.findOne({ facebookId: })
		}
	)
);
