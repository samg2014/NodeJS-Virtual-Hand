// app/routes.js
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', isNotLoggedIn, function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', {
			message : req.flash('loginMessage')
		});
	});

	// process the login form
	app.post('/login', isNotLoggedIn, passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile
		// section
		failureRedirect : '/login', // redirect back to the signup page if there
		// is an error
		failureFlash : true
	// allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', isNotLoggedIn, function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', {
			message : req.flash('signupMessage')
		});
	});

	// process the signup form
	app.post('/signup', isNotLoggedIn, passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile
		// section
		failureRedirect : '/signup', // redirect back to the signup page if
		// there is an error
		failureFlash : true
	// allow flash messages
	}));

	app.get('/student_signup', isNotLoggedIn, function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('student_signup.ejs', isNotLoggedIn, {
			message : req.flash('signupMessage')
		});
	});

	app.post('/student_signup', isNotLoggedIn, passport.authenticate(
			'local-student-signup', {
				successRedirect : '/profile', // redirect to the secure
				// profile
				// section
				failureRedirect : '/student_signup', // redirect back to the
				// signup
				// page if there is an error
				failureFlash : true
			// allow flash messages
			}));

	app.get('/teacher_signup', isNotLoggedIn, function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('teacher_signup.ejs', isNotLoggedIn, {
			message : req.flash('signupMessage')
		});
	});

	app.post('/teacher_signup', isNotLoggedIn, passport.authenticate(
			'local-teacher-signup', {
				successRedirect : '/profile', // redirect to the secure
				// profile
				// section
				failureRedirect : '/teacher_signup', // redirect back to the
				// signup
				// page if there is an error
				failureFlash : true
			// allow flash messages
			}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user
		// get the user out of session and pass to template
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/auth/google', passport.authenticate('google-openidconnect'));

	app.get('/auth/google/callback', passport.authenticate(
			'google-openidconnect', {
				failureRedirect : '/login'
			}), function(req, res) {
		// Successful authentication, redirect home.
		res.redirect('/profile');
	});

};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

// route middleware to make sure
function isNotLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (!req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/profile');
}
