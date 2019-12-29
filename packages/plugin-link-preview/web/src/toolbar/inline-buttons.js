import { SelectionState, EditorState, Modifier } from 'draft-js';
import { getCurrentBlock, TrashIcon } from 'wix-rich-content-editor-common';

const onDeletePreview = editorState => {
  const currentBlock = getCurrentBlock(editorState);
  const entityKey = currentBlock.getEntityAt(0);
  const entityData = editorState
    .getCurrentContent()
    .getEntity(entityKey)
    ?.getData();
  const url = entityData?.url;
  const contentState = editorState.getCurrentContent();
  const nextBlock = contentState.getBlockAfter(currentBlock.key) || currentBlock;
  const focusOffset = currentBlock.key === nextBlock.key ? 0 : nextBlock.text.length;
  const selectionRange = new SelectionState({
    anchorKey: currentBlock.key,
    anchorOffset: 0,
    focusKey: nextBlock.key,
    focusOffset,
  });
  const newContentState = Modifier.replaceText(contentState, selectionRange, url);
  const newEditorState = EditorState.push(editorState, newContentState, 'change-block-type');
  return EditorState.forceSelection(newEditorState, newContentState.getSelectionAfter());
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
