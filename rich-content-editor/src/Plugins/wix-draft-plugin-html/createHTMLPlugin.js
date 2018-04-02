import get from 'lodash/get';
import createToolbar from './toolbar';
import createBasePlugin from '../base/basePlugin';
import { Component } from './html-component';
import { HTML_TYPE } from './types';

const createHTMLPlugin = (config = {}) => {
  const { decorator, helpers, theme, isMobile, t, anchorTarget } = config;
  const hiddenButtons = get(config, 'html.toolbar.hidden', []);

  return createBasePlugin({
    component: Component,
    decorator,
    theme,
    type: HTML_TYPE,
    toolbar: {
      ...createToolbar({
        helpers,
        t,
      }),
      hiddenButtons,
    },
    helpers,
    isMobile,
    anchorTarget,
    t,
  });
};

export { createHTMLPlugin, HTML_TYPE };
