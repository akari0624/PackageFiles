'use strict';

const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const WEBPACK_Config_Base = require('./webpack.config.base');


let __LOADERS_ARR;
if(process.env.NODE_ENV === WEBPACK_Config_Base.NODE_ENV_Keywords.TRANSPILE_WITH_BABEL){

  __LOADERS_ARR = WEBPACK_Config_Base.JS_TRANSPILE_LOADER_ARR_OPTIONS.TS_THEN_BABEL

}else{
  __LOADERS_ARR = WEBPACK_Config_Base.JS_TRANSPILE_LOADER_ARR_OPTIONS.ONLY_TS_LOADER
}

const client_config = {
  entry: WEBPACK_Config_Base.ENTRY_POINT,
  output: {
    path: path.join(__dirname, '../', 'dist'),
    publicPath: '', // your webApp name(if has) on server put here.   eg:/MyWebApp
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
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
              publicPath: '/' // your webApp name(if has) on server put here.   eg:/MyWebApp
            }
          }
        ]
      }
    ]
  },
  plugins: [new HtmlWebPackPlugin({
    template: path.join(__dirname, '../', './client_side/index.html'),
    filename: './index.html'
  })],
  resolve: WEBPACK_Config_Base.RESOLVE_SETTING_CONFIG,
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimize:false
    // minimizer: [new UglifyJSPlugin({
    //   uglifyOptions: {
    //     compress: {
    //       drop_console: true
    //     }
    //   }
    // })]
  },
  node: {
    fs: 'empty'
}
}

const electron_config = {
  target: 'electron-main',
  entry: path.join(__dirname, '../', './electron_side/src/main.ts'),
  output: {
      path: path.join(__dirname, '../', 'dist'),
      filename: 'main.js'
  },
  // plugins: [
  //     new NodemonPlugin(),
  // ],
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
        { test: /\.tsx?$/, loader: WEBPACK_Config_Base.JS_TRANSPILE_LOADER_ARR_OPTIONS.ONLY_TS_LOADER },

        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
    ]
},
 //  externals: [nodeExternals()],
  node: {
      __dirname: false
  }
};

module.exports = [electron_config, client_config]