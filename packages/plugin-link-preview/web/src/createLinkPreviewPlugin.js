import { createBasePlugin, getCurrentBlock } from 'wix-rich-content-editor-common';
import { LINK_PREVIEW_TYPE } from './types';
import LinkPreviewComponent from './LinkPreviewComponent';
import createLinkPreviewToolbar from './toolbar/createLinkPreviewToolbar';
import { convertLinkPreviewToLink } from './lib/utils';

const createLinkPreviewPlugin = (config = {}) => {
  const type = LINK_PREVIEW_TYPE;
  if (!config[LINK_PREVIEW_TYPE]) {
    config[LINK_PREVIEW_TYPE] = {};
  }
  const { [type]: settings, setEditorState, getEditorState, ...rest } = config;
  const toolbar = createLinkPreviewToolbar(settings, setEditorState, getEditorState);

  const keyBindingFn = (event, { getEditorState }) => {
    const editorState = getEditorState();
    const currentBlock = getCurrentBlock(editorState);
    const entityKey = currentBlock.getEntityAt(0);
    const entityType = entityKey && editorState.getCurrentContent().getEntity(entityKey).type;
    if (entityType === 'LINK_PREVIEW') {
      if (event.key === 'Backspace') {
        return 'remove-link-preview';
      }
    }
  };

  const handleKeyCommand = (command, editorState, timestamp, { setEditorState }) => {
    if (command === 'remove-link-preview') {
      const newState = convertLinkPreviewToLink(editorState);
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  return createBasePlugin(
    {
      component: LinkPreviewComponent,
      toolbar,
      type,
      settings,
      ...rest,
    },
    { handleKeyCommand, keyBindingFn }
  );
};

export { createLinkPreviewPlugin };
