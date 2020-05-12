import { createHeadingsPlugin } from './createHeadingsPlugin';
import { HEADINGS_TYPE } from './types';
import { ModalsMap } from './modals';

export const pluginHeadings = (config = {}) => {
  return {
    config: {
      useDropdownMenu: true,
      ...config,
    },
    type: HEADINGS_TYPE,
    createPlugin: createHeadingsPlugin,
    ModalsMap,
  };
};
