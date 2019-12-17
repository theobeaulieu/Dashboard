var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var password = require('passport');
var flash = require('connect-flash');
var request = require('request');
var nodeWidget = require('node-widgets');
var fs = require('fs');

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var configDataBase = require('./config/mongo_database.js');
mongoose.connect(configDataBase.url, {
    useNewUrlParser: true
});
require('./config/password.js')(password);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(session({
    secret: 'string',
    saveUninitialized: true,
    resave: true
}));

app.use(password.initialize());
app.use(password.session());
app.use(flash());

app.use(express.static('.'));
app.use(express.static('Services'));
app.use(express.static('views'));
app.use(express.static('routes'));

var spotify = require('./routes/spotify.js');
app.use('/spotify', spotify);
var facebook = require('./routes/facebook.js');
app.use('/facebook', facebook);
var google = require('./routes/google.js');
app.use('/google', google);
var github = require('./routes/github.js');
app.use('/github', github);
var outlook = require('./routes/outlook.js');
app.use('/outlook', outlook);
require('./routes/login.js')(app, password, request, nodeWidget, fs);

app.listen(port);
console.log('Server running on port: ' + port);