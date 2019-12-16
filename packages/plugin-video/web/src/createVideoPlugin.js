import createToolbar from './toolbar';
import { Component } from './video-component';
import { VIDEO_TYPE, VIDEO_TYPE_LEGACY } from './types';
import {
  createBasePlugin,
  pluginDecorationProps,
  componentWillReceiveDecorationProps,
} from 'wix-rich-content-editor-common';

const createVideoPlugin = (config = {}) => {
  const type = VIDEO_TYPE;
  const { helpers, t, [type]: settings = {}, isMobile, ...rest } = config;

  return createBasePlugin({
    component: Component,
    type: VIDEO_TYPE,
    legacyType: VIDEO_TYPE_LEGACY,
    pluginDecorationProps: (props, componentData) => {
      return pluginDecorationProps(props, componentData);
    },
    componentWillReceiveDecorationProps: (props, nextProps, onPropsChange) => {
      componentWillReceiveDecorationProps(props, nextProps, onPropsChange);
    },
    toolbar: createToolbar({
      helpers,
      t,
      settings,
      isMobile,
    }),
    helpers,
    settings,
    t,
    isMobile,
    disableRightClick: config?.uiSettings?.disableRightClick,
    ...rest,
  });
};

export { createVideoPlugin };
