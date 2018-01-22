import createToolbar from './toolbar';
import Styles from './default-html-styles.scss';
import createBasePlugin from '../base/basePlugin';
import { Component } from './html-component';
import { HTML_TYPE } from './types';

const createHtmlPlugin = (config = {}) => {
  const { decorator, helpers, theme } = config;

  return createBasePlugin({
    component: Component,
    decorator,
    theme: theme || Styles,
    type: HTML_TYPE,
    toolbar: createToolbar({
      helpers,
    }),
    helpers,
  });
};

export { createHtmlPlugin, HTML_TYPE };
