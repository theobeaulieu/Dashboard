require('dotenv').config();

var express = require('express');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var router = express.Router();
var access_token_facebook = "";

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

passport.use('facebook', new Strategy({
    clientID: '435612516992086',
    clientSecret: '57b7945e688f591a11de9a113f822b21',
    callbackURL: 'http://localhost:8080/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'emails']
  },
  function(accessToken, refreshToken, profile, cb) {
    access_token_facebook = accessToken
    console.log("access Token Facebook:");
    console.log(access_token_facebook)
    return cb(null)
  }
));

router.get('/', function(req, res) {
    res.render('home', { user: req.user });
  });

router.get('/login', function(req, res){
    res.render('login');
  });

router.get('/login/facebook', passport.authenticate('facebook', { scope : ['email', 'user_events'] }));

router.get('/callback',  passport.authenticate('facebook', {failureRedirect: 'http://localhost:8080/dashboard'}), (req, res) => {
    console.log("redirect to dashboard after facebook auth")
    console.log(access_token_facebook)
    res.redirect('http://localhost:8080/dashboard');
});

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

router.get('/access_token', async (req, res) => {
  console.log("/Access_token/ access-token-facebook")
  console.log(access_token_facebook)
  res.send(access_token_facebook);
});

module.exports = router;