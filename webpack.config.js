const webpack = require('webpack');
const path = require('path');
const BUILD_DIR = path.resolve(__dirname, 'src/client/public');
const APP_DIR = path.resolve(__dirname, 'src/client/app');
const config = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    APP_DIR + '/Routes.jsx'
  ],
  output: {
    path: BUILD_DIR,
    publicPath: 'http://localhost:3000/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
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
  }
};
module.exports = config;
