// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var configAuth = require('./auth');

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var connection = mysql.createConnection({
    port: 3306,
    host     : 'q3vtafztappqbpzn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user     : 'xuo8t6hi3fcmh6hz',  
    password : 'r9iionzy6ttm6hib',
    database : 'qu6ai46bjrkxx06l'
})

connection.connect(function(err){
    if(err){
        console.log('error!');
        return;
    }
    console.log('connected');
})

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log('maike');
        console.log(user);
        // console.log(user[0]);
        // console.log(user[0].id);
        // console.log(done);

        if( user instanceof Array){
            console.log('its an array!');
            done(null, user[0].username);
        } else {
            done(null, user.username);
        }

        
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM dbconfig WHERE username = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });
// =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {
        console.log(profile);
        console.log("here1")

        // asynchronous
        process.nextTick(function() {
            console.log("here2")

            // find the user in the database based on their facebook id
            connection.query("SELECT * FROM dbconfig WHERE facebookId = ?",[profile.id], function(err, user) {
                console.log('length: ' + user.length);
                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err){
                    return done(err);
                }

                // if the user is found, then log them in
                if (user.length > 0) {
                    console.log('im here 2');
                    console.log(user);
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    
                    var newUserMysql = {
                        username: profile.displayName,
                        password: "",
                        facebookId: profile.id,
                        facebookToken: token,
                        facebookName: profile.displayName,
                        facebookEmail: ""
                        };

                    var insertQuery = "INSERT INTO dbconfig ( username, password, facebookId, facebookToken, facebookName, facebookEmail) values (?,?,?,?,?,?)";
                    console.log("profile: " + newUserMysql);
                    var variables = [newUserMysql.username, newUserMysql.password, newUserMysql.facebookId, newUserMysql.facebookToken, newUserMysql.facebookName, newUserMysql.facebookEmail];
                    connection.query(insertQuery, variables, function(err,rows){

                        return done(null, newUserMysql);
                    });
                    // connection.query(insertQuery,variables, function(err, rows) {
                    //     console.log(rows);
                    //     newUserMysql.id = rows.insertId;

                    //     return done(null, newUserMysql);
                    // });

                    
                }

            });
        });

    }));



    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            console.log('mf');
            connection.query("SELECT * FROM dbconfig WHERE username = ?",[username], function(err, rows) {
                console.log(rows);
                console.log(rows.length);
                console.log(err);
                if (err == true){
                    console.log('here 1');
                    return done(err);
                }
                if (rows.length > 0) {
                    console.log('heyo');
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));

                } else {
                    console.log('here again!');
                    console.log(username);
                    // if there is no user with that username
                    // create the user
                    var newUserMysql = {
                        username: username,
                        password: bcrypt.hashSync(password, null, null),  // use the generateHash function in our user model
                        facebookId: "",
                        facebookToken: "",
                        facebookName: "",
                        facebookEmail: ""
                    };

                    var insertQuery = "INSERT INTO dbconfig ( username, password, facebookId, facebookToken, facebookName, facebookEmail) values (?,?,?,?,?,?)";
                    var variables = [newUserMysql.username, newUserMysql.password, newUserMysql.facebookId, newUserMysql.facebookToken, newUserMysql.facebookName, newUserMysql.facebookEmail];
                    connection.query(insertQuery,variables,function(err, rows) {
                        newUserMysql.id = rows.insertId;

                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form
            console.log('hi1!')
            connection.query("SELECT * FROM dbconfig WHERE username = ?",[username], function(err, rows){
                console.log('hi!')
                console.log(rows);
                console.log(rows[0]);
                //console.log(rows[0].password);
                console.log(password);
                console.log(rows.length);
                if (err){
                    return done(err);
                }
                if (rows.length == 0) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );
};