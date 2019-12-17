require('dotenv').config();

var express = require('express');
var passport = require('passport');
var Strategy = require('passport-github').Strategy;
const axios = require('axios')
var router = express.Router()
var access_token_github = "";
const clientID = 'd1430d2da1704905f74b';
const clientSecret = 'b1d57a6452cb69f3a7f31c0a6bc70532d6da8ca5';

passport.use(new Strategy({
    clientID: 'd1430d2da1704905f74b',
    clientSecret: 'b1d57a6452cb69f3a7f31c0a6bc70532d6da8ca5',
    callbackURL: 'http://localhost:8080/github/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

router.get('/', function(req, res) {
    res.render('home', { user: req.user });
  });

router.get('/login', function(req, res){
    res.render('login');
});

router.get('/login_github', passport.authenticate('github'));

router.get('/callback', function(req, res) {
    const code = req.query.code;
    console.log("github code :")
    console.log(code)
    axios({
      // make a POST request
      method: 'post',
      // to the Github authentication API, with the client ID, client secret
      // and request token
      url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`,
      // Set the content type header, so that we get the response in JSOn
      headers: {
        accept: 'application/json'
      }
    }).then((response) => {
      // Once we get the response, extract the access token from
      // the response body
      access_token_github = response.data.access_token
      console.log("acces token github: ")
      console.log(access_token_github)
      // redirect the user to the welcome page, along with the access token
      res.redirect('http://localhost:8080/dashboard')
    })
});

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    console.log(req.user);
    res.render('profile', { user: req.user });
});

router.get('/access_token', async (req, res) => {
  console.log("/Access_token/ access-token-github")
  console.log(access_token_github)
  res.send(access_token_github);
});

module.exports = router;