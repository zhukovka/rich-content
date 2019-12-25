import { EditorState, Modifier } from 'draft-js';
import { replaceWithEmptyBlock, getCurrentBlock, TrashIcon } from 'wix-rich-content-editor-common';

const onDeletePreview = editorState => {
  const currentBlock = getCurrentBlock(editorState);
  const entityKey = currentBlock.getEntityAt(0);
  const entityData = editorState
    .getCurrentContent()
    .getEntity(entityKey)
    ?.getData();
  const url = entityData?.url;
  const withEmptyBlock = replaceWithEmptyBlock(editorState, currentBlock.key);
  const contentState = withEmptyBlock.getCurrentContent();
  const newContentState = Modifier.insertText(contentState, withEmptyBlock.getSelection(), url);
  return EditorState.push(withEmptyBlock, newContentState, 'change-block-type');
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
