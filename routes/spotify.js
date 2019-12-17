var express = require('express');
var router = express.Router();


var SpotifyWebApi = require('spotify-web-api-node');
scopes = ['user-read-private', 'user-read-email','playlist-modify-public','playlist-modify-private']

require('dotenv').config();

var spotifyApi = new SpotifyWebApi({
  clientId: '1ff9883f7ee14eeb842651196c0739ad',
  clientSecret: '866d045d11e242af92d97c5ad88f8b21',
  redirectUri: 'http://localhost:8080/spotify/callback',
});
var access_token_spotify;
var refresh_token_spotify;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login_spotify', (req,res) => {
  var html = spotifyApi.createAuthorizeURL(scopes)
  console.log(html)
  // res.send(html+"&show_dialog=true")
  res.redirect(html+"&show_dialog=true")
})

router.get('/callback', async (req,res) => {
  const { code } = req.query;
  console.log(code)
  try {
    var data = await spotifyApi.authorizationCodeGrant(code)
    const { access_token, refresh_token } = data.body;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);
    access_token_spotify = access_token
    refresh_token_spotify = refresh_token
    console.log("acces_token spotify:")
    console.log(access_token_spotify)
    res.redirect('http://localhost:8080/dashboard');
  } catch(err) {
    res.redirect('/#/error/invalid token');
  }
});

router.get('/access_token', async (req, res) => {
  console.log("/Access_token/ access-token-spotify")
  console.log(access_token_spotify)
  res.send(access_token_spotify);
});

module.exports = router;