'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
const basicEntry = [
  'babel-polyfill',
];

module.exports = {
  entry: {
    user: basicEntry.concat(['./user/client.js']),
    admin: basicEntry.concat(['./admin/client.js']),
  },
  output: {
    path: path.resolve(__dirname, './public/js'),
    filename: '[name]-main.js',
    publicPath: '/public/js',
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
    }),
    new ExtractTextPlugin({ filename: 'style.css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
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
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
      },
      {
        test: /\.scss$/,
        loader:
        ExtractTextPlugin.extract({ fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => {
                  return [autoprefixer({ browsers: ['> 1%', 'last 10 versions'] })];
                },
              },
            },
            'sass-loader'],
        }),
      },
    ],
  },
};

