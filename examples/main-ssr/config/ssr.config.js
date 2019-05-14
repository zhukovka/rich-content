/* eslint-disable */
const nodeExternals = require('webpack-node-externals');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const LoadablePlugin = require('@loadable/webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const PATHS = {
  root: path.join(__dirname, '..'),
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
};

const production = process.env.NODE_ENV === 'production'
const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

const getConfig = target => ({
  name: target,
  mode: development ? 'development' : 'production',
  target,
  entry: `./src/client/main-${target}.js`,
  output: {
    path: path.join(PATHS.dist, target),
    filename: production ? '[name]-bundle-[chunkhash:8].js' : '[name].js',
    publicPath: `/dist/${target}/`,
    libraryTarget: target === 'node' ? 'commonjs2' : undefined,
  },
  externals:
    target === 'node' ? ['@loadable/component', nodeExternals()] : undefined,
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            compact: true,
            rootMode: 'upward',
            caller: target
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]',
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        issuer: /\.(css|sass|js|jsx)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: 'file-loader',
            },
          },
        ],
      },
      {
        test: /\.(woff|eot|ttf|svg|woff2)$/,
        issuer: /\.(s)?css$/,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        issuer: /\.js(x)?$/,
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          },
          {
            loader: 'react-svg-loader',
            query: JSON.stringify({
              jsx: true,
              svgo: {
                plugins: [
                  { cleanupIDs: false },
                  { removeViewBox: false },
                  { removeDimensions: true },
                ],
              },
            }),
          },
        ],
      },
    ],
  },
  plugins: [
    // new HtmlWebPackPlugin({
    //   title: 'Rich Content Editor',
    //   favicon: '../public/favicon.ico',
    //   template: '../public/index.html',
    //   meta: {
    //     charset: 'utf-8',
    //     viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no',
    //   },
    // }),
    new CopyWebpackPlugin([
      {
        from: 'node_modules/wix-rich-content-plugin-html/dist/statics/',
        to: 'static/',
      },
    ]),
    new DotenvWebpackPlugin({
      path: path.resolve(PATHS.root, '..', '..', '.env'),
    }),
    new LoadablePlugin(),
    new MiniCssExtractPlugin()
  ],
});

module.exports = [getConfig('web'), getConfig('node')];


