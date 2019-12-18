import { deleteBlock, addAtomicBlock, getLinkRangesInBlock } from 'wix-rich-content-editor-common';
import { LINK_PREVIEW_TYPE } from '../types';

// const resetAtomicBlock = (contentBlock, contentState) => {
//   const blockKey = contentBlock.getKey();
//   const blockRange = new SelectionState({
//     anchorKey: blockKey,
//     anchorOffset: 0,
//     focusKey: blockKey,
//     focusOffset: contentBlock.getLength(),
//   });
//   const withoutBlock = Modifier.removeRange(contentState, blockRange, 'backward');
//   return Modifier.setBlockType(withoutBlock, withoutBlock.getSelectionAfter(), 'atomic');
// };

export const addLinkPreview = (url, editorState) =>
  addAtomicBlock(editorState, LINK_PREVIEW_TYPE, { url });

// Validates that block contains only a single link
export const getBlockLinkUrl = (contentBlock, editorState) => {
  const contentState = editorState.getCurrentContent();
  const linkRanges = getLinkRangesInBlock(contentBlock, contentState);
  if (linkRanges.length !== 1) {
    return false;
  }
  const [offset, length] = linkRanges[0];
  if (offset !== 0 || length !== contentBlock.getLength()) {
    return false;
  }
  return contentBlock.getText();
};
