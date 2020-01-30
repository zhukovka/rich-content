import { DEFAULTS } from '../consts';
import { LINK_PREVIEW_TYPE } from '../types';
import { SelectionState, EditorState, Modifier } from 'draft-js';
import {
  getCurrentBlock,
  replaceWithEmptyBlock,
  insertLinkInPosition,
  createBlock,
} from 'wix-rich-content-editor-common';

export const addLinkPreview = (editorState, config, linkPreviewData) => {
  const settings = config[LINK_PREVIEW_TYPE];
  const { size, alignment } = { ...DEFAULTS, ...(settings || {}) };
  const { url, ...rest } = linkPreviewData;
  const data = { config: { size, alignment, link: { url } }, ...rest };
  const { newEditorState } = createBlock(editorState, data, LINK_PREVIEW_TYPE);
  return newEditorState;
};

export const convertLinkPreviewToLink = editorState => {
  // preserve url
  let currentBlock = getCurrentBlock(editorState);
  const blockKey = currentBlock.key;
  const entityKey = currentBlock.getEntityAt(0);
  const entityData = editorState
    .getCurrentContent()
    .getEntity(entityKey)
    ?.getData();
  const url = entityData?.config?.link?.url;

  // replace preview block with text block containing url
  let newState = replaceWithEmptyBlock(editorState, currentBlock.key);
  let contentState = Modifier.insertText(
    newState.getCurrentContent(),
    newState.getSelection(),
    url
  );
  // reread block after insertText
  currentBlock = contentState.getBlockForKey(currentBlock.key);
  const nextBlock = contentState.getBlockAfter(currentBlock.key);
  // delte empty block after preview
  const selectionRange = new SelectionState({
    anchorKey: currentBlock.key,
    anchorOffset: currentBlock.text.length,
    focusKey: nextBlock.key,
    focusOffset: 1,
  });
  if (nextBlock && nextBlock.text.length === 0) {
    contentState = Modifier.removeRange(contentState, selectionRange, 'forward');
  }
  newState = EditorState.push(newState, contentState, 'change-block-type');
  // change the url from plain text to a link
  const editorStateWithLink = insertLinkInPosition(
    EditorState.push(newState, newState.getCurrentContent(), 'change-block-type'),
    blockKey,
    0,
    url.length,
    {
      url,
    }
  );
  EditorState.push(
    editorStateWithLink,
    editorStateWithLink.getCurrentContent(),
    'change-block-type'
  );
  return EditorState.forceSelection(editorStateWithLink, selectionRange);
};
