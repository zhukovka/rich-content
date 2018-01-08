import createBasePlugin from '../base/basePlugin';
import createToolbar from './toolbar';
import Styles from './default-gallery-styles.scss';
import { Component } from './gallery-component';

const GALLERY_TYPE = 'wix-draft-plugin-gallery';

const createGalleryPlugin = (config = {}) => {
  const { decorator, helpers, theme } = config;

  return createBasePlugin({
    component: Component,
    decorator,
    theme: theme || Styles,
    type: GALLERY_TYPE,
    toolbar: createToolbar({
      helpers,
    }),
    helpers,
  });
};

export { createGalleryPlugin, GALLERY_TYPE };
