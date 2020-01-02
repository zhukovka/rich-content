import { SelectionState, EditorState, Modifier } from 'draft-js';
import { getCurrentBlock, TrashIcon, replaceWithEmptyBlock } from 'wix-rich-content-editor-common';

const onDeletePreview = editorState => {
  let currentBlock = getCurrentBlock(editorState);
  const entityKey = currentBlock.getEntityAt(0);
  const entityData = editorState
    .getCurrentContent()
    .getEntity(entityKey)
    ?.getData();
  const url = entityData?.url;
  let newState = replaceWithEmptyBlock(editorState, currentBlock.key);
  let contentState = Modifier.insertText(
    newState.getCurrentContent(),
    newState.getSelection(),
    url
  );
  currentBlock = contentState.getBlockForKey(currentBlock.key);
  const nextBlock = contentState.getBlockAfter(currentBlock.key);
  if (nextBlock) {
    const selectionRange = new SelectionState({
      anchorKey: currentBlock.key,
      anchorOffset: currentBlock.text.length,
      focusKey: nextBlock.key,
      focusOffset: Math.max(nextBlock.text.length, 1),
    });
    contentState = Modifier.removeRange(contentState, selectionRange, 'forward');
    newState = EditorState.push(newState, contentState, 'remove-range');
  }
  newState = EditorState.push(newState, contentState, 'change-block-type');
  return EditorState.forceSelection(newState, newState.getSelectionAfter());
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
