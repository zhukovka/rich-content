import React from 'react';
import createToolbar from './toolbar';
import Styles from './default-html-styles.scss';
import createBasePlugin from '../base/basePlugin';
import { Component } from './html-component';

const HTML_TYPE = 'wix-draft-plugin-html';

const createHtmlPlugin = (config = {}) => {
  const {
    decorator,
    helpers,
    theme
  } = config;

  return createBasePlugin({
    component: Component,
    decorator: decorator,
    theme: theme || Styles,
    type: HTML_TYPE,
    toolbar: createToolbar({ helpers }),
    helpers,
  });
};

export {
  createHtmlPlugin,
  HTML_TYPE
}
