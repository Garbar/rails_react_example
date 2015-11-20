'use strict';
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require("webpack");
var node_dir = __dirname + '/node_modules';
var vendor_dir = __dirname + '/vendor';
require('es6-promise').polyfill();

module.exports = {
  context: __dirname + "/app/react",
  entry: ['babel-polyfill', __dirname + "/app/react/index"],

  output: {
    filename: "react_index.js",
    path: __dirname + "/app/assets/javascripts/",
  },
  debug: true,
  module: {
    loaders: [
      {
        loader: "babel-loader",

        // Skip any files outside of your project's `src` directory
        include: [
          __dirname+"/app/react",
        ],
        exclude: [
          __dirname+"/node_modules",
        ],
        // Only run `.js` and `.jsx` files through Babel
        test: /\.jsx?$/,

        // Options to configure babel with
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0', 'react'],
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" },
      { test: /\.gif$/, loader: "url-loader?mimetype=image/png" },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
    ],
  },

  resolve: {
    alias: {
      //'react-forms': vendor_dir + '/react-forms/ReactForms.js',
    },
    extensions: ['', '.js', '.jsx', '.js.jsx'],
    modulesDirectories: ['node_modules']
  },

  plugins: [
    new ExtractTextPlugin('../stylesheets/react_bundle.css', {
      allChunks: true
    }),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        moment: "moment",

        React: "react",
        Router: node_dir + '/react-router/umd/ReactRouter.js'
    }),
  ]
}
