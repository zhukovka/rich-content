import { AtomicBlockUtils } from 'draft-js';
import { getBlockLinkRanges, deleteBlock } from 'wix-rich-content-common';
import { LINK_PREVIEW_TYPE } from './types';

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

const replaceAtomicBlock = (contentBlock, editorState, entityProviderFn) => {
  const contentState = editorState.getCurrentContent();
  const entityKey = contentBlock.getEntityAt(0);
  const currentEntity = contentState.getEntity(entityKey);
  const { type, mutability, data } = entityProviderFn(currentEntity.data);
  const withoutBlock = deleteBlock(editorState, contentBlock.getKey());
  const contentStateWithEntity = contentState.createEntity(type, mutability, data);
  const newEntityKey = contentStateWithEntity.getLastCreatedEntityKey();
  return AtomicBlockUtils.insertAtomicBlock(withoutBlock, newEntityKey, ' ');
};

const getPreviewEntity = (linkData, siteMetadata) => ({
  type: LINK_PREVIEW_TYPE,
  mutability: 'IMMUTABLE',
  data: {
    ...siteMetadata,
    ...linkData,
  },
});

const getLinkEntity = previewData => ({
  type: 'LINK',
  mutability: 'MUTABLE',
  data: {
    url: previewData.url,
    target: previewData.target,
    rel: previewData.rel,
  },
});

export const replaceLinkWithPreview = (contentBlock, editorState, siteMetadata) =>
  replaceAtomicBlock(contentBlock, editorState, entity =>
    getPreviewEntity(entity.data, siteMetadata)
  );

export const replacePreviewWithLink = (contentBlock, editorState) =>
  replaceAtomicBlock(contentBlock, editorState, entity => getLinkEntity(entity.data));

// Validates that block contains only a single link
export const isLinkBlock = (contentBlock, editorState) => {
  const contentState = editorState.getCurrentContent();
  const linkRanges = getBlockLinkRanges(contentBlock, contentState);
  if (linkRanges.length !== 1) {
    return false;
  }
  const [offset, length] = linkRanges[0];
  return offset === 0 && length === contentBlock.getLength();
};
