const path = require('path');
const merge = require('webpack-merge');

module.exports = env => {
  const BASE_PATH = path.resolve(__dirname, '..');
  const common = require('../../../config/webpack.dev.js')(env);
  return merge(common, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: {
      viewer: path.resolve(BASE_PATH, 'src/gallery-viewer.jsx'),
      [env.FILE_NAME]: path.resolve(BASE_PATH, 'src/'),
    },
  });
};
