import get from 'lodash/get';
import createToolbar from './toolbar';
import createBasePlugin from '../base/basePlugin';
import { Component } from './gallery-component';
import { GALLERY_TYPE } from './types';

const createGalleryPlugin = (config = {}) => {
  const { decorator, helpers, theme, isMobile, t, anchorTarget } = config;
  const hiddenButtons = get(config, 'gallery.toolbar.hidden', []);

  return createBasePlugin({
    component: Component,
    decorator,
    theme,
    t,
    type: GALLERY_TYPE,
    toolbar: {
      ...createToolbar({
        helpers,
        t
      }),
      hiddenButtons,
    },
    helpers,
    isMobile,
    anchorTarget,
  });
};

export { createGalleryPlugin, GALLERY_TYPE };
