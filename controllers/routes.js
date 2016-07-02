var path = require('path');
var mysql = require('mysql');
var config = require('../config/config.js')
var connection = mysql.createConnection(config.jawsDB);

connection.connect(function(err){
    if(err){
        console.log('error!');
        return;
    }
    console.log('connected');
})



module.exports = function(app,passport) {


	app.get('/', function(req, res) {
		res.render(__dirname + '/../public/index.html');
	});

	app.get('/login', function(req, res) {
		res.sendFile(path.join(__dirname + '/../public/login.html'));
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/dash',
		failureRedirect : '/login',
		failureFlash : true
	}));

	app.get('/signup', function(req,res) {
		res.sendFile(path.join(__dirname + '/../public/signup.html'));
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/dash',
		failureRedirect : '/login',
		failureFlash : true
	}));

	app.post('/enter', function(req, res){
		
		var insertQuery = "INSERT INTO foodinfo ( mealtype, date, restaurant, cost, Fid) values (?,?,?,?,?)";
        
		var variables = [req.body.mealtype, req.body.date, req.body.restaurant, req.body.cost, req.user.username];

        connection.query(insertQuery,variables);
	});

	app.get('/dash', isLoggedIn, function(req,res) {


		
		res.render('index', {name: req.user.username});

	});

	// =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/dash',
            failureRedirect : '/',
        }));

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');

}
