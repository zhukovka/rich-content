const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StylablePlugin = require('stylable-integration/webpack-plugin');
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
      StylablePlugin.rule(),
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        include: [path.join(__dirname, 'node_modules/wix-style-react'), path.resolve(__dirname, 'src')],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'sass-loader'],
        }),
      },
      {
        test: /\.css$/,
        exclude: [path.join(__dirname, 'node_modules/stylable-components')],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
      },
      {
        test: /\.svg$/,
        include: [path.resolve(__dirname, 'src')],
        loaders: [
          {
            loader: 'babel-loader',
            query: 'presets=react',
          },
          {
            loader: 'react-svg-loader',
            query: JSON.stringify({
              jsx: true,
              svgo: {
                plugins: [
                  {
                    cleanupIDs: false,
                  },
                ],
              },
            }),
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    extensions: ['.js', '.json', '.jsx', '.css'],
    alias: {
      'draft-js': path.resolve(__dirname, 'node_modules', '@wix', 'draft-js'),
    },
  },
  performance: {
    maxAssetSize: 200000,
    maxEntrypointSize: 400000,
    assetFilter(assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    },
  },
  context: __dirname,
  target: 'web',
  externals: {
    'pro-gallery-renderer': 'pro-gallery-renderer',
    immutable: 'immutable',
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
  plugins: [new ExtractTextPlugin(`${FILE_NAME}.css`), new StylablePlugin({ injectBundleCss: true, filename: 'stylable.css', nsDelimiter: '--' })],
};
