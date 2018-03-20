var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs
  .readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  target: 'node',
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: true,
    __dirname: true,
  },
  entry: './index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  externals: nodeModules,
  plugins: [],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
