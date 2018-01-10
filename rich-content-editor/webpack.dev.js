const merge = require('webpack-merge');
const common = require('./webpack.common.js');
//const Visualizer = require('webpack-visualizer-plugin');

module.exports = merge(common, {
  devtool: 'eval-source-map',
  //plugins: [new Visualizer()],
});
