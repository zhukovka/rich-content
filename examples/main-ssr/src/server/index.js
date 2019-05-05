import React from 'react';
import ReactDOMServer from 'react-dom/server';

import templateFn from './template';

import App from '../App.jsx';

export default (req, res) => {
    const html = ReactDOMServer.renderToString(
        <App />
    );

    const template = templateFn(html);

    res.send(template);
};
