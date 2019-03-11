'use strict'

const path = require('path');
const WEBPACK_Config_Base = require('./webpack.config.base');
const nodeExternals = require('webpack-node-externals');

const electron_config = {
  target: 'electron-main',
  entry: path.join(__dirname, '../', './electron_side/src/main.ts'),
  output: {
      path: path.join(__dirname, '../', 'dist'),
      globalObject:'this',
      filename: 'main.js'
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    modules: [
      path.join(__dirname, '../', 'node_modules'),
      'node_modules'
    ],
      extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        { test: /\.ts?$/, loader: WEBPACK_Config_Base.JS_TRANSPILE_LOADER_ARR_OPTIONS.TS_THEN_BABEL },

        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
    ]
},
 externals: [nodeExternals()],
  node: {
      __dirname: false
  }
};


module.exports = electron_config