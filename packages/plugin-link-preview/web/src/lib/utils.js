import { createBlock } from 'wix-rich-content-editor-common';
import { DEFAULTS } from '../consts';
import { LINK_PREVIEW_TYPE } from '../types';

export const addLinkPreview = (editorState, config, linkPreviewData) => {
  const settings = config[LINK_PREVIEW_TYPE];
  const { size, alignment } = { ...DEFAULTS, ...(settings || {}) };
  const { url, ...rest } = linkPreviewData;
  const data = { config: { size, alignment, link: { url } }, ...rest };
  const { newEditorState } = createBlock(editorState, data, LINK_PREVIEW_TYPE);
  return newEditorState;
};
