const express = require('express');
const bodyParser = require('body-parser');
const fallback = require('express-history-api-fallback');
const webpack = require('webpack');
const config = require('./webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const routes = require('./routes'); 
require('dotenv').config();

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
  clientID: FB_APP_ID,
  clientSecret: FB_APP_SECRET,
  callbackURL: 'callbackURLpathgoeshere'
}, function(accessToken, refreshToken, profile, done){
  process.nextTick(function() {
    return done(null, user);
  });
}));

// webpack watch setup
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  },
  noInfo: true
}));

app.use(webpackHotMiddleware(compiler, {
    log: console.log
}));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// webpack is okay with this static serving
app.use(express.static(root)); // static files
app.use(fallback('index.html', {root}));

routes.router(app);

app.listen(port, () =>{
	console.log(`Drunken Genius sippen on: ${port}`);
});

module.exports.app = app;
// https://github.com/tradersquare/tradersquare/blob/develop/server/server.js