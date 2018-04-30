const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {
  const FILE_NAME = env.FILE_NAME;
  const BASE_PATH = path.resolve(__dirname, '..', FILE_NAME.replace('wix-', ''));

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(BASE_PATH, 'dist'),
      filename: `${FILE_NAME}.js`,
      library: FILE_NAME,
      libraryTarget: 'umd',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [path.resolve(BASE_PATH, 'src')],
          loader: 'babel-loader',
        },
        {
          test: /\.scss$/,
          include: [
            path.resolve(BASE_PATH, 'src'),
          ],
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'sass-loader'],
          }),
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader'],
          }),
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          issuer: /\.(s)?css$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
              },
            },
          ],
        },
        {
          test: /\.(woff|eot|ttf|woff2)$/,
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
          include: [
            path.resolve(BASE_PATH, 'src'),
          ],
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
    resolve: {
      modules: ['node_modules', path.resolve(BASE_PATH, 'src')],
      extensions: ['.js', '.json', '.jsx', '.css'],
    },
    context: BASE_PATH,
    target: 'web',
    externals: [
      {
        lodash: '_',
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
        '@wix/draft-js': {
          root: 'Draft',
          commonjs2: '@wix/draft-js',
          commonjs: '@wix/draft-js',
          amd: '@wix/draft-js',
          umd: '@wix/draft-js',
        },
        //TODO: externalize all common plugin dependencies
        // classnames: {
        //   root: 'classNames',
        //   commonjs: 'classnames',
        //   commonjs2: 'classnames',
        //   amd: 'classnames',
        //   umd: 'classnames',
        // },
        // 'decorate-component-with-props': {
        //   root: 'decorateComponentWithProps',
        //   commonjs: 'decorate-component-with-props',
        //   commonjs2: 'decorate-component-with-props',
        //   amd: 'decorate-component-with-props',
        //   umd: 'decorate-component-with-props',
        // }
      }
    ],
    stats: 'errors-only',
    plugins: [new ExtractTextPlugin('styles.css')],
  };
};
