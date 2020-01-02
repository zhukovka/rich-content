import { SelectionState, EditorState, Modifier } from 'draft-js';
import { getCurrentBlock, TrashIcon, replaceWithEmptyBlock } from 'wix-rich-content-editor-common';

const onDeletePreview = editorState => {
  // preserve url
  let currentBlock = getCurrentBlock(editorState);
  const entityKey = currentBlock.getEntityAt(0);
  const entityData = editorState
    .getCurrentContent()
    .getEntity(entityKey)
    ?.getData();
  const url = entityData?.url;

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
  if (nextBlock && nextBlock.text.length === 0) {
    const selectionRange = new SelectionState({
      anchorKey: currentBlock.key,
      anchorOffset: currentBlock.text.length,
      focusKey: nextBlock.key,
      focusOffset: 1,
    });
    contentState = Modifier.removeRange(contentState, selectionRange, 'forward');
  }
  newState = EditorState.push(newState, contentState, 'change-block-type');
  return EditorState.forceSelection(newState, contentState.getSelectionAfter());
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
