const merge = require('webpack-merge');

module.exports = env => {
  const common = require('./webpack.common.js')(env);
  return merge(common, {
    devtool: 'eval-source-map',
  });
};
