import createToolbar from './toolbar';
import Styles from './default-video-styles.scss';
import createBasePlugin from '../base/basePlugin';
import { Component } from './video-component';

const VIDEO_TYPE = 'wix-draft-plugin-video';
const VIDEO_TYPE_LEGACY = 'VIDEO-EMBED';

const createVideoPlugin = (config = {}) => {
  const { decorator, helpers, theme } = config;

  return createBasePlugin({
    component: Component,
    decorator,
    theme: theme || Styles,
    type: VIDEO_TYPE,
    legacyType: VIDEO_TYPE_LEGACY,
    toolbar: createToolbar({
      helpers,
    }),
    helpers,
  });
};

export { createVideoPlugin, VIDEO_TYPE };
