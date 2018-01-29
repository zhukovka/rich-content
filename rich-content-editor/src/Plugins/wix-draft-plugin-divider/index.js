import createBasePlugin from '../base/basePlugin';
import createToolbar from './toolbar';
import { Component } from './divider-component';
import { DIVIDER_TYPE } from './types';

const createDividerPlugin = (config = {}) => {
  const { decorator, helpers, theme } = config;

  return createBasePlugin({
    component: Component,
    decorator,
    theme,
    type: DIVIDER_TYPE,
    toolbar: createToolbar({
      helpers,
    }),
    helpers,
  });
};

export { createDividerPlugin, DIVIDER_TYPE };
