import React from 'react';
import createToolbar from './toolbar';
import Styles from './default-image-styles.scss';
import createBasePlugin from '../base/basePlugin';
import { Component } from './image-component';

const IMAGE_TYPE = 'wix-draft-plugin-image';
const IMAGE_TYPE_LEGACY = 'IMAGE';

const createImagePlugin = (config = {}) => {
  const {
    decorator,
    helpers,
    theme
  } = config;

  return createBasePlugin({
    component: Component,
    decorator: decorator,
    theme: theme || Styles,
    type: IMAGE_TYPE,
    legacyType: IMAGE_TYPE_LEGACY,
    toolbar: createToolbar({ helpers }),
    helpers,
  });
};

export {
  createImagePlugin,
  IMAGE_TYPE
}
