require('dotenv').config();

var express = require('express');
var router = express.Router();
var passport = require('passport');
var axios = require('axios');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var access_token_google = "";
var refresh_token_google = "";
var user_id = "";
const { google } = require('googleapis');
var clientID = '19762856856-fe2k0006r43i45r9kqg73gjl5abn2ien.apps.googleusercontent.com';
var clientSecret = '2ELjnlOce6QQflM5tNtxotGY';

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (id, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: '19762856856-fe2k0006r43i45r9kqg73gjl5abn2ien.apps.googleusercontent.com',
    clientSecret: '2ELjnlOce6QQflM5tNtxotGY',
    callbackURL: "http://localhost:8080/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    access_token_google = accessToken
    refresh_token_google = refreshToken
    user_id = profile.id
    console.log("access Token Google:");
    console.log(access_token_google)
    return done(null)
  }
));

const oauth2Client = new google.auth.OAuth2(
  clientID,
  clientSecret,
  'http://localhost:8080/google/callback'
);

router.get('/login_google',
  passport.authenticate('google', { scope: ['profile', 'email', 'https://mail.google.com/', 'https://www.googleapis.com/auth/gmail.readonly'],
  accessType: 'offline',
  prompt: 'consent' }));

router.get('/callback', passport.authenticate('google', {failureRedirect: 'http://localhost:8080/dashboard'}), (req, res) => {
    console.log("redirect to dashboard after google auth")
    console.log(access_token_google)
    res.redirect('http://localhost:8080/dashboard')
});

router.get('/access_token', async (req, res) => {
    console.log("/Access_token/ access-token-google")
    console.log(access_token_google)
    res.send(access_token_google);
});

router.get('/user_id', async (req, res) => {
  console.log("/user_id user-id-google")
  console.log(user_id)
  res.send(user_id);
});


module.exports = router;