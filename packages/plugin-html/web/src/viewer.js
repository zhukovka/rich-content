import { typeMapper } from './typeMapper';
import { HTML_TYPE } from './types';
export { typeMapper as htmlTypeMapper, HTML_TYPE };

export const pluginHtml = (config = {}) => {
  return {
    config,
    type: HTML_TYPE,
    typeMapper,
    decorator: {},
  };
};
