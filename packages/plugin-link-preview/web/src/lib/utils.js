import { addAtomicBlock } from 'wix-rich-content-editor-common';
import { DEFAULTS } from '../consts';
import { LINK_PREVIEW_TYPE } from '../types';

export const addLinkPreview = (editorState, config, url) => {
  const { size, alignment } = { ...DEFAULTS, ...(config[LINK_PREVIEW_TYPE] || {}) };
  const data = { config: { size, alignment }, url };
  return addAtomicBlock(editorState, LINK_PREVIEW_TYPE, data);
};
