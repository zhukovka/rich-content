import { createBasePlugin } from 'wix-rich-content-editor-common';
import { ANCHOR_TYPE } from './types';
import { DEFAULTS } from './constants';
import { Component } from './AnchorComponent';
import createAnchorToolbar from './toolbar/createAnchorToolbar';

const createAnchorPlugin = (config = {}) => {
  const type = ANCHOR_TYPE;
  const { theme, anchorTarget, relValue, [type]: settings = {}, ...rest } = config;
  const toolbar = createAnchorToolbar(config);

  return createBasePlugin({
    component: Component,
    theme,
    toolbar,
    type,
    anchorTarget,
    relValue,
    settings,
    defaultPluginData: DEFAULTS,
    ...rest,
  });
};

export { createAnchorPlugin };
