import { createPollPlugin } from './createPollPlugin';
import { POLL_TYPE } from './types';
import { DEFAULT_COMPONENT_DATA, THEME as theme } from './constants';

export const pluginPoll = (config = {}) => {
  return {
    config: { ...DEFAULT_COMPONENT_DATA.config, ...config },
    type: POLL_TYPE,
    createPlugin: createPollPlugin,
    theme,
  };
};
