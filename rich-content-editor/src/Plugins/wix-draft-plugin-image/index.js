import createToolbar from './toolbar';
import Styles from './default-image-styles.scss';
import createBasePlugin from '../base/basePlugin';
import { Component } from './image-component';
import { IMAGE_TYPE, IMAGE_TYPE_LEGACY } from './types';

const createImagePlugin = (config = {}) => {
  const { decorator, helpers, theme } = config;

  return createBasePlugin({
    component: Component,
    decorator,
    theme: theme || Styles,
    type: IMAGE_TYPE,
    legacyType: IMAGE_TYPE_LEGACY,
    toolbar: createToolbar({
      helpers,
    }),
    helpers,
  });
};

export { createImagePlugin, IMAGE_TYPE };
