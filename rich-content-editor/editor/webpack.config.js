const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const FILE_NAME = 'wix-rich-content-editor';

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${FILE_NAME}.js`,
    publicPath: '/assets/',
    library: 'WixDraftJs',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'babel-loader',
        options: {
          presets: ['env', 'stage-0', 'react'],
          plugins: ['transform-class-properties']
        },
      },
      {
        test: /\.scss$/,
        include: [
          path.join(__dirname, 'node_modules/wix-style-react'),
          fs.realpathSync('./node_modules/pro-gallery-renderer'), //must use realpath to resolve symlink directory
          path.resolve(__dirname, 'src')
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
            'sass-loader'
          ],
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        })
      },
      {
        test: /\.svg$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loaders: [
          {
            loader: 'babel-loader',
            query: 'presets=react'
          },
          {
            loader: 'react-svg-loader',
            query: JSON.stringify({
              jsx: true,
              svgo: {
                plugins: [{
                  cleanupIDs: false
                }],
              },
            }),
          }
        ]
      },
      {
        test: /\.(svg|woff|woff2|ttf|eot)$/,
        include: [
          fs.realpathSync('./node_modules/pro-gallery-renderer'), //must use realpath to resolve symlink directory
        ],
        loaders: [
          'url-loader'
        ]
      },
    ],
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ],
    extensions: ['.js', '.json', '.jsx', '.css'],
    alias: {
      '~': path.resolve(__dirname, 'src/'),
    }
  },
  performance: {
    maxAssetSize: 200000,
    maxEntrypointSize: 400000,
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  devtool: 'eval-source-map',
  context: __dirname,
  target: 'web',
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'reactDOM',
      umd: 'react-dom',
    },
  },
  stats: 'errors-only',
  plugins: [
    new ExtractTextPlugin(`${FILE_NAME}.css`),
  ]
};
