require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fallback = require('express-history-api-fallback');
const webpack = require('webpack');
const config = require('./webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const root = `${__dirname}/src/client/public`;
const port = process.env.NODE_DEV || process.env.NODE_PROD;

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

app.listen(port, () =>{
	console.log(`Drunken Genius sippen on: ${port}`);
});


// https://github.com/tradersquare/tradersquare/blob/develop/server/server.js