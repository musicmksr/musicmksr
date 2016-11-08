'use strict';
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fallback = require('express-history-api-fallback');
const passport = require('passport');
const session = require('express-session');
const FacebookStrategy = require('passport-facebook').Strategy;
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');
const webpackMiddleWare = require('./serverConfig/webpackDevMiddleware');

const keys = require('./config');

const app = express();
const root = `${__dirname}/src/client/public`;
const port = process.env.NODE_DEV || process.env.NODE_PROD;

app.use(cookieParser());

passport.serializeUser(function(id, done) {
  done(null, id);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new FacebookStrategy({
  clientID: keys.keys.clientID,
  clientSecret: keys.keys.clientSecret,
  callbackURL: keys.keys.callbackURL,
  enableProof: true,
  profileFields: ['id', 'displayName', 'email']
}, function(accessToken, refreshToken, profile, done){
  process.nextTick(function() {
    return done(null, profile);
  });
}));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 10000} //10 seconds
}));

app.use(passport.initialize());
app.use(passport.session());

// webpack watch setup
webpackMiddleWare(app);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(root)); // static files

routes(app);
app.use(fallback('index.html', {root}));

app.listen(port, () =>{
	console.log(`Drunken Genius sippen on: ${port}`);
});

module.exports = app;
