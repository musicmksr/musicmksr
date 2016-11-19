const webpack = require('webpack');
const path = require('path');
const BUILD_DIR = path.resolve(__dirname, 'src/client/public');
const APP_DIR = path.resolve(__dirname, 'src/client/app');

const config = {
  devtool: 'source-map',
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    APP_DIR + '/Routes.jsx'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    port: 3000,
    hot: true
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loaders : ['babel']
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  externals: {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
};
module.exports = config;
