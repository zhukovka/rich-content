import path from 'path';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
//require('jsdom-global')();

const app = express();

app.use(express.static(path.resolve(__dirname, '../..')));

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require, import/no-extraneous-dependencies */
  const webpackConfig = require('../../config/ssr.config');

  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  /* eslint-enable global-require, import/no-extraneous-dependencies */

  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      logLevel: 'info',
      publicPath: '/dist/web',
      writeToDisk(filePath) {
        return /dist\/node\//.test(filePath) || /loadable-stats/.test(filePath)
      },
    }),
  );
}

const nodeStats = path.resolve(
  __dirname,
  '../../dist/node/loadable-stats.json',
);

const webStats = path.resolve(
  __dirname,
  '../../dist/web/loadable-stats.json',
);

app.get(
  '*',
  (req, res) => {
    const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats });
    const { default: App } = nodeExtractor.requireEntrypoint();

    const webExtractor = new ChunkExtractor({ statsFile: webStats });
    const jsx = webExtractor.collectChunks(<App />);

    const html = renderToString(jsx);

    res.set('content-type', 'text/html');
    res.send(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Wix Rich Content SSR Example</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto:300" rel="stylesheet" />
        ${webExtractor.getLinkTags()}
        ${webExtractor.getStyleTags()}
      </head>

      <body>
        <noscript>
          You need to enable JavaScript to run this app.
        </noscript>
        <div id="root">${html}</div>
        ${webExtractor.getScriptTags()}
      </body>
    </html>`);
  },
);

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('Server started http://localhost:3000'));
