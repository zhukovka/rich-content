/* eslint-disable */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const prodConfig = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new UglifyJsPlugin({
      parallel: true,
      uglifyOptions: {
        output: {
          beautify: false,
        },
      },
    }),
  ],
};

module.exports = function(env) {
  if (env && env.analyzeBundle) {
    prodConfig.plugins.push(new BundleAnalyzerPlugin());
  }
  return merge(common, prodConfig);
};
