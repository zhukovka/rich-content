"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _server2 = require("@loadable/server");

var app = (0, _express.default)();
app.use(_express.default.static(_path.default.resolve(__dirname, '../..')));

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require, import/no-extraneous-dependencies */
  var webpackConfig = require('../../config/ssr.config');

  var webpackDevMiddleware = require('webpack-dev-middleware');

  var webpack = require('webpack');
  /* eslint-enable global-require, import/no-extraneous-dependencies */


  var compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    logLevel: 'info',
    publicPath: '/dist/web',
    writeToDisk: function writeToDisk(filePath) {
      return /dist\/node\//.test(filePath) || /loadable-stats/.test(filePath);
    }
  }));
}

var nodeStats = _path.default.resolve(__dirname, '../../dist/node/loadable-stats.json');

var webStats = _path.default.resolve(__dirname, '../../dist/web/loadable-stats.json');

app.get('*', function (req, res) {
  var nodeExtractor = new _server2.ChunkExtractor({
    statsFile: nodeStats
  });

  var _nodeExtractor$requir = nodeExtractor.requireEntrypoint(),
      App = _nodeExtractor$requir.default;

  var webExtractor = new _server2.ChunkExtractor({
    statsFile: webStats
  });
  var jsx = webExtractor.collectChunks(_react.default.createElement(App, null));
  var html = (0, _server.renderToString)(jsx);
  res.set('content-type', 'text/html');
  res.send("<!DOCTYPE html>\n    <html lang=\"en\">\n      <head>\n        <title>Wix Rich Content SSR Example</title>\n        <link href=\"https://fonts.googleapis.com/css?family=Roboto:300\" rel=\"stylesheet\" />\n        ".concat(webExtractor.getLinkTags(), "\n        ").concat(webExtractor.getStyleTags(), "\n      </head>\n\n      <body>\n        <noscript>\n          You need to enable JavaScript to run this app.\n        </noscript>\n        <div id=\"root\">").concat(html, "</div>\n        ").concat(webExtractor.getScriptTags(), "\n      </body>\n    </html>"));
}); // eslint-disable-next-line no-console

app.listen(3000, function () {
  return console.log('Server started http://localhost:3000');
});