import createBasePlugin from '../base/basePlugin';
import createToolbar from './toolbar';
import { Component } from './divider-component';
import { DIVIDER_TYPE } from './types';

const createDividerPlugin = (config = {}) => {
  const { decorator, helpers, theme, isMobile, t, anchorTarget } = config;

  return createBasePlugin({
    component: Component,
    decorator,
    theme,
    type: DIVIDER_TYPE,
    toolbar: createToolbar({
      helpers,
      t
    }),
    helpers,
    isMobile,
    anchorTarget,
    t,
  });
};

export { createDividerPlugin, DIVIDER_TYPE };
