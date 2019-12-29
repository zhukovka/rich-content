import { EditorState, Modifier } from 'draft-js';
import {
  getCurrentBlock,
  TrashIcon,
  deleteBlock,
  replaceWithEmptyBlock,
} from 'wix-rich-content-editor-common';

const onDeletePreview = editorState => {
  const currentBlock = getCurrentBlock(editorState);
  const entityKey = currentBlock.getEntityAt(0);
  const entityData = editorState
    .getCurrentContent()
    .getEntity(entityKey)
    ?.getData();
  const url = entityData?.url;
  let newState = replaceWithEmptyBlock(editorState, currentBlock.key);
  const contentState = Modifier.insertText(
    newState.getCurrentContent(),
    newState.getSelection(),
    url
  );
  const nextBlock = contentState.getBlockAfter(currentBlock.key);
  if (nextBlock) {
    newState = deleteBlock(newState, nextBlock.key);
  }
  // const withoutBlocks = EditorState.push(editorState, newContentState, 'remove-range');
  return EditorState.push(newState, contentState, 'change-block-type');
};

export default (settings, setEditorState, getEditorState) => [
  {
    keyName: 'deletePreview',
    type: 'custom',
    icon: TrashIcon,
    onClick: () => {
      const editorState = getEditorState();
      setEditorState(onDeletePreview(editorState));
    },
    mobile: true,
    desktop: true,
  },
];
