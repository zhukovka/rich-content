import createToolbar from './toolbar';
import createBasePlugin from '../base/basePlugin';
import { Component } from './image-component';
import { IMAGE_TYPE, IMAGE_TYPE_LEGACY } from './types';

const createImagePlugin = (config = {}) => {
  const { decorator, helpers, t, theme, isMobile } = config;

  return createBasePlugin({
    component: Component,
    decorator,
    theme,
    type: IMAGE_TYPE,
    legacyType: IMAGE_TYPE_LEGACY,
    toolbar: createToolbar({
      t,
      helpers,
    }),
    helpers,
    isMobile,
    t,
  });
};

export { createImagePlugin, IMAGE_TYPE };
