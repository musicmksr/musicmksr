require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fallback = require('express-history-api-fallback');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const routes = require('./routes/routes');
const webpackMiddleWare = require('./serverConfig/webpackDevMiddleware');

const keys = require('./config');

const app = express();
const root = `${__dirname}/src/client/public`;
const port = process.env.NODE_DEV || process.env.NODE_PROD;

passport.serializeUser(function(id, done) {
  done(null, id);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new FacebookStrategy({
  clientID: keys.keys.clientID,
  clientSecret: keys.keys.clientSecret,
  callbackURL: keys.keys.callbackURL
}, function(accessToken, refreshToken, profile, done){
  process.nextTick(function() {
    return done(null, user);
  });
}));

// webpack watch setup
webpackMiddleWare(app);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(root)); // static files
app.use(fallback('index.html', {root}));

routes.router(app);

app.listen(port, () =>{
	console.log(`Drunken Genius sippen on: ${port}`);
});

module.exports = app;
