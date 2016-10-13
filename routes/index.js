var express = require('express');
var router = express.Router();
var passport = require('passport');



var loggedIn = false;

router.use(function(req, res, next){
	

	if(req.isAuthenticated())
		loggedIn = true;
	else
		loggedIn = false;

	console.log(loggedIn);
	next();
})



/* GET home page. */
router.get('/', function(req, res, next) {
	
  	res.render('index', { title: 'Home', loggedIn: loggedIn});
});



/* GET signup page*/
router.get('/signup', function(req, res, next) {
	
	res.render('signup', { message: req.flash('signupMessage'), loggedIn: loggedIn });
});

router.post('/signup', passport.authenticate('local', {
	successRedirect : '/dashboard',
	failureRedirect : '/signup',
	failureFlash : true
}));



/* GET dashboard. */
router.get('/dashboard', isLoggedIn, function(req, res) {
  res.render('dashboard', { user: req.user, loggedIn: loggedIn });
});

function isLoggedIn(req, res, next)
{
	if(req.isAuthenticated())
		return next();

	res.redirect('/');
}



/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login', message: req.flash('loginMessage'), loggedIn: loggedIn });
});

router.post('/login', passport.authenticate('local-login', {
	successRedirect : '/dashboard',
	failureRedirect : '/login',
	failureFlash : true
}));



/* Logout. */
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});




module.exports = router;

