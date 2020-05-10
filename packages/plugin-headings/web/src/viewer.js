import { HEADINGS_TYPE } from './types';
import { DEFAULTS } from './defaults';

export const pluginHeadings = (config = {}) => {
  return {
    config: { headersDropdown: true, ...DEFAULTS.config, ...config },
    type: HEADINGS_TYPE,
  };
};
