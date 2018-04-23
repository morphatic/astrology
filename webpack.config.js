const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname + '/src/index.js'),
  output: {
    path: path.resolve(__dirname + '/lib/'),
    filename: 'astrology.js',
    libraryTarget: 'umd',
    library: 'astrology', // should this be @morphatic/astrology???
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /src/, // do I need to exclude __tests__ here?
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new uglify()
  ]
};
