import 'regenerator-runtime/runtime';
import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { wixAxiosConfig } from 'wix-axios-config';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/client-i18n';
import App from './components/App';

import { imageTypeMapper } from 'wix-rich-content-plugin-image/dist/esm/viewer';
import { videoTypeMapper } from 'wix-rich-content-plugin-video/dist/esm/viewer';
import { dividerTypeMapper } from 'wix-rich-content-plugin-divider/dist/esm/viewer';
import { htmlTypeMapper, HTML_TYPE } from 'wix-rich-content-plugin-html/dist/esm/viewer';
import {
  linkTypeMapper,
  LinkViewer,
  LinkParseStrategy,
} from 'wix-rich-content-plugin-link/dist/esm/viewer';
import { Strategy as HashTagStrategy, Component as HashTag } from 'wix-rich-content-plugin-hashtag';

const appImports = {
  imageTypeMapper,
  videoTypeMapper,
  dividerTypeMapper,
  linkTypeMapper,
  LinkViewer,
  LinkParseStrategy,
  htmlTypeMapper,
  HTML_TYPE,
  HashTagStrategy,
  HashTag,
};

const initialI18n = window.__INITIAL_I18N__;
const baseURL = window.__BASEURL__;

wixAxiosConfig(axios, { baseURL });

ReactDOM.render(
  <I18nextProvider i18n={i18n(initialI18n)}>
    <App {...appImports} />
  </I18nextProvider>,
  document.getElementById('root'),
);
