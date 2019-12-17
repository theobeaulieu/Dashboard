require('dotenv').config();

var express = require('express');
var passport = require('passport');
var OutlookStrategy = require('passport-outlook').Strategy;
var router = express.Router();
var access_token_outlook = "";
var cookieParser = require('cookie-parser');
router.use(cookieParser());

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (id, done) {
    done(null, user);
});

passport.use(new OutlookStrategy({
        clientID: "7f836b2a-31db-4f78-ba89-a1aa045f3c39",
        clientSecret: "KkiCaPtvW/6E?baafcxLcCFDOTp5?=75",
        callbackURL: "http://localhost:8080/outlook/callback"
    },
    function (accessToken, refreshToken, profile, done) {
        access_token_outlook = accessToken;
        console.log("access Token Outlook:");
        console.log(access_token_outlook)
        return done(null)
    }
));

router.get('/login_outlook', passport.authenticate('windowslive', {
    scope: [
        'openid',
        'profile',
        'offline_access',
        'https://outlook.office.com/Calendars.Read'
    ]
}));

router.get('/callback', passport.authenticate('windowslive', {
    failureRedirect: 'http://localhost:8080/dashboard'
}), (req, res) => {
    console.log("redirect to dashboard after outlook auth")
    console.log(access_token_outlook)
    res.redirect('http://localhost:8080/dashboard');
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/access_token', async (req, res) => {
    console.log("/Access_token/ access-token-outlook")
    console.log(access_token_outlook)
    res.send(access_token_outlook);
});

router.get('/cookieset', function (req, res) {
    var cookie = req.query
    res.cookie(cookie.name, {name: cookie.type, value: cookie.value})
    res.send(req.cookies[cookie.name]);
});

router.get('/cookieget', function (req, res) {
    res.send(req.cookies);
});

module.exports = router;