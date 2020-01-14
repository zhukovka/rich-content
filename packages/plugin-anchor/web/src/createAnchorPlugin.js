import { createBasePlugin } from 'wix-rich-content-editor-common';
import { ANCHOR_TYPE } from './types';
import { Component } from './AnchorComponent';
import { anchorEntityStrategy } from './strategy';
import createAnchorToolbar from './toolbar/createAnchorToolbar';

const createAnchorPlugin = (config = {}) => {
  const type = ANCHOR_TYPE;
  const { theme, anchorTarget, relValue, [type]: settings = {}, ...rest } = config;
  settings.minLinkifyLength = settings.minLinkifyLength || 6;
  const toolbar = createAnchorToolbar(config);

  const decorators = [{ strategy: anchorEntityStrategy, component: Component }];

  return createBasePlugin(
    {
      theme,
      toolbar,
      type,
      anchorTarget,
      relValue,
      settings,
      ...rest,
    },
    { decorators }
  );
};

export { createAnchorPlugin };
