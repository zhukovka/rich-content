import createToolbar from './toolbar';
import { Component } from './video-component';
import { SANTA_VIDEO_TYPE } from './types';
import { createBasePlugin } from 'wix-rich-content-common';

const createSantaVideoPlugin = (config = {}) => {
  const { decorator, helpers, theme, t, isMobile, anchorTarget, relValue, video: settings } = config;

  return createBasePlugin({
    component: Component,
    decorator,
    settings,
    theme,
    type: SANTA_VIDEO_TYPE,
    toolbar: createToolbar({
      helpers,
      t,
    }),
    helpers,
    isMobile,
    anchorTarget,
    relValue,
    t,
  });
};

export { createSantaVideoPlugin };
