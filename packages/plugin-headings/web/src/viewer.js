import { HEADINGS_TYPE } from './types';

export const pluginHeadings = (config = {}) => {
  return {
    config: { useDropdownMenu: true, ...config },
    type: HEADINGS_TYPE,
  };
};
