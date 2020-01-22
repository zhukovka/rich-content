import { createBlock } from 'wix-rich-content-editor-common';
import { DEFAULTS } from '../consts';
import { LINK_PREVIEW_TYPE } from '../types';

export const addLinkPreview = (editorState, config, title, description, thumbnail_url, url) => {
  const settings = config[LINK_PREVIEW_TYPE];
  const { size, alignment } = { ...DEFAULTS, ...(settings || {}) };
  const data = { config: { size, alignment }, title, description, thumbnail_url, url };
  const { newEditorState } = createBlock(editorState, data, LINK_PREVIEW_TYPE);
  return newEditorState;
};
