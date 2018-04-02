import get from 'lodash/get';
import createToolbar from './toolbar';
import createBasePlugin from '../base/basePlugin';
import { Component } from './video-component';
import { VIDEO_TYPE, VIDEO_TYPE_LEGACY } from './types';

const createVideoPlugin = (config = {}) => {
  const { decorator, helpers, theme, t, isMobile, anchorTarget } = config;
  const hiddenButtons = get(config, 'video.toolbar.hidden', []);

  return createBasePlugin({
    component: Component,
    decorator,
    theme,
    type: VIDEO_TYPE,
    legacyType: VIDEO_TYPE_LEGACY,
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

export { createVideoPlugin, VIDEO_TYPE };
