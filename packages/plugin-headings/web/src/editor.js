import { createHeadingsPlugin } from './createHeadingsPlugin';
import { HEADINGS_TYPE } from './types';
import { ModalsMap } from './modals';
import { DEFAULTS } from './defaults';

export const pluginHeadings = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: HEADINGS_TYPE,
    createPlugin: createHeadingsPlugin,
    ModalsMap,
  };
};
