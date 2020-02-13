import { createHtmlPlugin } from './createHtmlPlugin';
import { HTML_TYPE } from './types';

const defaultConfig = {
  minWidth: 35,
  maxWidth: 740,
  width: 350,
  minHeight: 50,
  maxHeight: 1200,
};

export const pluginHtml = (config = {}) => {
  return {
    config: { ...defaultConfig, ...config },
    type: HTML_TYPE,
    createPlugin: createHtmlPlugin,
    ModalsMap: {},
  };
};
