const passport = require('passport');

module.exports = (app) => {
	app.get('/api/auth/facebook', passport.authenticate('facebook'));

	app.get(
		'/api/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect: '/dashboard',
			failureRedirect: '/login'
		})
	);

	app.get(
		'/api/auth/google',
		passport.authenticate('google', {
			scope: [ 'profile', 'email' ]
		})
	);

	app.get('/api/auth/google/callback', passport.authenticate('google'), (req, res) => {
		res.redirect('/dashboard');
	});

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};
