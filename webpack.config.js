/* eslint-disable prefer-template*/
const webpack = require('webpack');

const webpackConfig = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8000',
    'webpack/hot/only-dev-server',
    './client.js',
  ],
  output: {
    path: __dirname + '/build/js',
    publicPath: '/build/js',
    filename: 'main.js',
  },
  module: {
    loaders: [
      {
        test: /\.(|js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          require.resolve('react-hot-loader'),
          require.resolve('babel-loader'),
        ],
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.ttf$/, loader: 'file-loader' },
      { test: /\.woff$/, loader: 'file-loader' },
      { test: /\.eot$/, loader: 'file-loader' },
      { test: /\.svg$/, loader: 'file-loader' },
      { test: /\.png$/, loader: 'url-loader' },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass',
      },
    ],
  },
  node: {
    setImmediate: false,
    console: true,
    fs: 'empty',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
  devtool: 'sourcemap',
};

module.exports = webpackConfig;
