import createToolbar from './toolbar';
import { createBasePlugin } from 'wix-rich-content-editor-common';
import { Component, DEFAULTS } from './gallery-component';
import { GALLERY_TYPE } from './types';

const createGalleryPlugin = (config = {}) => {
  const type = GALLERY_TYPE;
  const { helpers, theme, t, anchorTarget, relValue, [type]: settings = {}, ...rest } = config;
  const _settings = { ...settings, accept: 'image/* || video/*' };
  return createBasePlugin({
    component: Component,
    settings: _settings,
    theme,
    t,
    type,
    toolbar: createToolbar({
      settings: _settings,
      helpers,
      t,
      anchorTarget,
      relValue,
    }),
    helpers,
    anchorTarget,
    relValue,
    disableRightClick: config?.uiSettings?.disableRightClick,
    defaultPluginData: DEFAULTS,
    ...rest,
  });
};

export { createGalleryPlugin };
