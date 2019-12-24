import { addAtomicBlock } from 'wix-rich-content-editor-common';
import { DEFAULTS } from '../consts';
import { LINK_PREVIEW_TYPE } from '../types';

export const addLinkPreview = (editorState, config, url, onPreviewDelete) => {
  const settings = config[LINK_PREVIEW_TYPE];
  settings.onDelete = setEditorState => setEditorState(onPreviewDelete());
  const { size, alignment } = { ...DEFAULTS, ...(settings || {}) };
  const data = { config: { size, alignment }, url };
  return addAtomicBlock(editorState, LINK_PREVIEW_TYPE, data);
};
