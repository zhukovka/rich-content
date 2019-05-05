/* eslint-disable */
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  target: 'node',
  mode: 'development',
  devtool: 'eval-source-map',
  externals: [nodeExternals()],
  entry: path.resolve(__dirname, '..', 'src/server/index.js'),
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/dist/',
    filename: 'server.js',
    library: 'app',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['css-loader/locals']
      },
      {
        test: /\.scss$/,
        use: ['css-loader/locals', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader?emitFile=false',
      },
      {
        test: /\.(woff|eot|ttf|svg|woff2)$/,
        loader: 'url-loader?emitFile=false',
      },
    ],
  },
  plugins: [],
};
