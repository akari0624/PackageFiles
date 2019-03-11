'use strict';

const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const WEBPACK_Config_Base = require('./webpack.config.base');
const WriteFileWebpackPlugin = require('write-file-webpack-plugin')
const nodeExternals = require('webpack-node-externals');


let __LOADERS_ARR;
if(process.env.NODE_ENV === WEBPACK_Config_Base.NODE_ENV_Keywords.TRANSPILE_WITH_BABEL){

  __LOADERS_ARR = WEBPACK_Config_Base.JS_TRANSPILE_LOADER_ARR_OPTIONS.TS_THEN_BABEL

}else{
  __LOADERS_ARR = WEBPACK_Config_Base.JS_TRANSPILE_LOADER_ARR_OPTIONS.ONLY_TS_LOADER
}

const client_config = {
  entry: WEBPACK_Config_Base.ENTRY_POINT,
  devtool: 'source-map',
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: __LOADERS_ARR,
        exclude: /node_modules/
      },
      WEBPACK_Config_Base.ENFORCE_SOURCE_MAP_LOADER,
      WEBPACK_Config_Base.CSS_LOADER_CONFIG,
      {
        use: 'url-loader?limit=8192',
        test: /\.(svg)$/
      }, {
        test: /\.(png|jpg|gif|mp4|ogg|svg|css|ttf|woff|woff2|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              publicPath: '/'
            }
          }
        ]

      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, '../', './client_side/index.html'),
      filename: './index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: WEBPACK_Config_Base.RESOLVE_SETTING_CONFIG,
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, '../client_side/'),
    port: 9999
  }
};


const electron_config = {
  target: 'electron-main',
  entry: path.join(__dirname, '../', './electron_side/src/main.ts'),
  output: {
      path: path.join(__dirname, '../', 'dist'),
      globalObject:'this',
      filename: 'main.js'
  },
  // plugins: [
  //     new NodemonPlugin(),
  // ],
  plugins: [
    new WriteFileWebpackPlugin()
  ],
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

module.exports = [client_config, electron_config]