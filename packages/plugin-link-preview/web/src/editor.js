import { createLinkPreviewPlugin } from './createLinkPreviewPlugin';
import { LINK_PREVIEW_TYPE } from './types';
import { DEFAULTS } from './defaults';
import { linkPreviewUtil } from './linkPreviewUtil';

export const pluginLinkPreview = (config = {}) => {
  const fetchMetadata = linkPreviewUtil(config.authorization);

  return {
    config: { ...DEFAULTS.config, fetchMetadata, ...config },
    type: LINK_PREVIEW_TYPE,
    createPlugin: createLinkPreviewPlugin,
    ModalsMap: {},
  };
};
