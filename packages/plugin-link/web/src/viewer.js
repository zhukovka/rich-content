import { LINK_TYPE } from './types';
import { typeMapper } from './typeMapper';
import DEFAULTS from './defaults';

export { default as LinkViewer } from './LinkViewer';
export { typeMapper as linkTypeMapper, LINK_TYPE };

export const pluginLink = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: LINK_TYPE,
    typeMapper,
    decorator: {},
  };
};
