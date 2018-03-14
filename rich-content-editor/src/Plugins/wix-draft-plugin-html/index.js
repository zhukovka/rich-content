import createToolbar from './toolbar';
import createBasePlugin from '../base/basePlugin';
import { Component } from './html-component';
import { HTML_TYPE } from './types';

const createHtmlPlugin = (config = {}) => {
  const { decorator, helpers, theme, isMobile, t, anchorTarget } = config;

  return createBasePlugin({
    component: Component,
    decorator,
    theme,
    type: HTML_TYPE,
    toolbar: createToolbar({
      helpers,
      t,
    }),
    helpers,
    isMobile,
    anchorTarget,
    t,
  });
};

export { createHtmlPlugin, HTML_TYPE };
