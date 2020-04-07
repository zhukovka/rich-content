import { HEADINGS_TYPE } from './types';
import { DEFAULTS } from './defaults';

export const pluginHeadings = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: HEADINGS_TYPE,
  };
};
